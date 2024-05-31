import { attach, combine, createEvent, createStore, sample } from 'effector';

import { internalApi } from '@drag/shared/api';

export const requestSession = createEvent();
export const setSession = createEvent<internalApi.UserAuthDto | null>();

const getSessionFx = attach({ effect: internalApi.authMeFx });

export const $session = createStore<internalApi.UserAuthDto | null>(null);
export const $isAuthenticated = $session.map((user) => user !== null);

export const $isSessionPending = combine(
  [$session, getSessionFx.pending],
  ([session, pending]) => !session && pending,
);

$session.on([setSession, getSessionFx.doneData], (_, data) => data);

sample({
  clock: requestSession,
  target: getSessionFx,
});
