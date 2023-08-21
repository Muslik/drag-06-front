import { attach, combine, createEvent, createStore, sample } from 'effector';

import { internalApi } from '@drag/shared/api';
import { SessionUserDto } from '@drag/shared/api/internal';

export const requestSession = createEvent();
export const setSession = createEvent<SessionUserDto | null>();

const getSessionFx = attach({ effect: internalApi.authGetSessionUserFx });

export const $session = createStore<SessionUserDto | null>(null);
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
