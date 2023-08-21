import { attach, createEvent, sample } from 'effector';

import { setSession } from '@drag/entities/session';
import { internalApi } from '@drag/shared/api';

export const logout = createEvent();

const logoutFx = attach({ effect: internalApi.authLogoutFx });

sample({
  clock: logout,
  target: logoutFx,
});

sample({
  clock: logoutFx.done,
  fn: () => null,
  target: setSession,
});
