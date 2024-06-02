import { sample } from 'effector';

import { tournamentModel } from '@drag/entities/tournament';
import { internalApi } from '@drag/shared/api';
import { routes } from '@drag/shared/routing';

export const currentRoute = routes.home;

sample({
  clock: routes.home.opened,
  fn: (): internalApi.TournamentGetTournamentsParams => ({
    query: {
      'take': 1,
      'where[status]': 'REGISTRATION',
      'order[field]': 'createdAt',
    },
  }),
  target: tournamentModel.tournamentsQuery.start,
});
