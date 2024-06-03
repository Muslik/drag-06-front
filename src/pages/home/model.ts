import { createEffect, sample } from 'effector';

import { tournamentModel } from '@drag/entities/tournament';
import { routes } from '@drag/shared/routing';

export const currentRoute = routes.home;

const getActiveTournament = createEffect({
  handler: async () =>
    tournamentModel.tournamentsQuery.start({
      query: {
        'take': 1,
        'order[field]': 'createdAt',
        'order[direction]': 'desc',
        'where[status]': 'REGISTRATION',
      },
    }),
});

sample({
  clock: routes.home.opened,
  target: getActiveTournament,
});
