import { sample } from 'effector';

import { tournamentModel } from '@drag/entities/tournament';
import { routes } from '@drag/shared/routing';

export const currentRoute = routes.home;

sample({
  clock: currentRoute.opened,
  fn: () => ({
    query: {
      'take': 1,
      'order[field]': 'createdAt',
      'order[direction]': 'desc',
      'where[status]': 'REGISTRATION',
    } as const,
  }),
  target: tournamentModel.tournamentsQuery.start,
});
