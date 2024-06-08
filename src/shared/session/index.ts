import { createQuery } from '@farfetched/core';
import {
  NavigateParams,
  RouteInstance,
  RouteParams,
  RouteParamsAndQuery,
  chainRoute,
} from 'atomic-router';
import { createStore, createEvent, sample, UnitTargetable } from 'effector';

import { internalApi } from '../api';

export type Role = internalApi.UserAuthDto['role'];

const CHILD_ROLES: Record<Role, Role[]> = {
  CREATOR: ['CREATOR', 'ADMIN', 'MODERATOR', 'USER'],
  ADMIN: ['ADMIN', 'MODERATOR', 'USER'],
  MODERATOR: ['MODERATOR', 'USER'],
  USER: ['USER'],
};

export const checkRole = (role: Role, requiredRole?: Role) => {
  if (!requiredRole) {
    return true;
  }
  const requiredChildRoles = CHILD_ROLES[role];

  return requiredChildRoles.includes(requiredRole);
};

enum AuthStatus {
  Initial = 0,
  Pending,
  Anonymous,
  Authenticated,
}

export const sessionRequestQuery = createQuery({
  effect: internalApi.authMeFx,
});

export const $user = createStore<internalApi.UserAuthDto | null>(null);
const $authenticationStatus = createStore(AuthStatus.Initial);

$authenticationStatus.on(sessionRequestQuery.started, (status) => {
  if (status === AuthStatus.Initial) {
    return AuthStatus.Pending;
  }

  return status;
});

$user.on(sessionRequestQuery.finished.success, (_, { result }) => result);
$authenticationStatus.on(sessionRequestQuery.finished.success, () => AuthStatus.Authenticated);

$authenticationStatus.on(sessionRequestQuery.finished.failure, () => AuthStatus.Anonymous);

type ChainParams<Params extends RouteParams> = {
  role?: internalApi.UserAuthDto['role'];
  otherwise?: UnitTargetable<NavigateParams<Params>>;
};

export function chainAuthorized<Params extends RouteParams>(
  route: RouteInstance<any>,
  { otherwise, role = 'USER' }: ChainParams<Params> = {},
): RouteInstance<Params> {
  const sessionCheckStarted = createEvent<NavigateParams<Params>>();
  const sessionReceivedAnonymous = createEvent<NavigateParams<Params>>();

  const alreadyAuthenticated = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Authenticated,
  });

  const alreadyAnonymous = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Anonymous,
  });

  const authenticatedWithRoles = sample({
    clock: [alreadyAuthenticated, sessionRequestQuery.finished.success],
    source: $user,
    filter: (user) => Boolean(user && checkRole(user.role, role)),
  });

  const notAuthenticatedWithRoles = sample({
    clock: [alreadyAuthenticated, sessionRequestQuery.finished.success],
    source: $user,
    filter: (user) => !user || !checkRole(user.role, role),
  });

  sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Initial,
    target: sessionRequestQuery.start,
  });

  sample({
    clock: [notAuthenticatedWithRoles, alreadyAnonymous, sessionRequestQuery.finished.failure],
    source: { params: route.$params, query: route.$query },
    filter: route.$isOpened,
    target: sessionReceivedAnonymous,
  });

  if (otherwise) {
    sample({
      clock: sessionReceivedAnonymous,
      target: otherwise,
    });
  }

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: authenticatedWithRoles,
    cancelOn: sessionReceivedAnonymous,
  });
}

export function chainAnonymous<Params extends RouteParams>(
  route: RouteInstance<Params>,
  { otherwise }: ChainParams<Params> = {},
): RouteInstance<Params> {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
  const sessionReceivedAuthenticated = createEvent<RouteParamsAndQuery<Params>>();

  const alreadyAuthenticated = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Authenticated,
  });

  const alreadyAnonymous = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Anonymous,
  });

  sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Initial,
    target: sessionRequestQuery.start,
  });

  sample({
    clock: [alreadyAuthenticated, sessionRequestQuery.finished.success],
    source: { params: route.$params, query: route.$query },
    filter: route.$isOpened,
    target: sessionReceivedAuthenticated,
  });

  if (otherwise) {
    sample({
      clock: sessionReceivedAuthenticated,
      target: otherwise,
    });
  }

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAnonymous, sessionRequestQuery.finished.failure],
    cancelOn: sessionReceivedAuthenticated,
  });
}
