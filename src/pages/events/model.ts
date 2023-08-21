import { sample } from 'effector';

import { getEventsFx } from '@drag/entities/event';
import { appRoutes } from '@drag/shared/routes';

sample({
  clock: appRoutes.events.opened,
  target: getEventsFx,
});
