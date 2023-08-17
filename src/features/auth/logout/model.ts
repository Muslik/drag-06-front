import { attach, createEvent, sample } from 'effector';

import { setSession } from '@drag/entities/session';
import { api } from '@drag/shared/api';

export const logout = createEvent();

const deleteSessionFx = attach({ effect: api.deleteSessionApiFx });

sample({
  clock: logout,
  target: deleteSessionFx,
});

sample({
  clock: deleteSessionFx.done,
  fn: () => null,
  target: setSession,
});
