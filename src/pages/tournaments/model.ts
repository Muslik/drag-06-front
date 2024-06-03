import { chainRoute } from 'atomic-router';

import { tournamentModel } from '@drag/entities/tournament';
import { wrapEventToFx } from '@drag/shared/lib/wrapEventToEffect';
import { routes } from '@drag/shared/routing';

export const currentRoute = routes.tournament.all;

chainRoute({
  route: currentRoute,
  beforeOpen: {
    effect: wrapEventToFx(tournamentModel.tournamentsQuery.start),
    mapParams: () => ({
      query: {
        'order[field]': 'startDate',
        'order[direction]': 'desc',
      } as const,
    }),
  },
});
