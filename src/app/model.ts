import { sample } from 'effector';

import { appStarted } from '@drag/shared/config/init';
import { sessionRequestQuery } from '@drag/shared/session';

sample({
  clock: appStarted,
  target: sessionRequestQuery.start,
});
