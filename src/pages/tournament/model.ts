import { chainRoute } from 'atomic-router';

import { tournamentModel } from '@drag/entities/tournament';
import { wrapEventToFx } from '@drag/shared/lib/wrapEventToEffect';
import { routes } from '@drag/shared/routing';

export const currentRoute = routes.tournament.current;

chainRoute({
  route: currentRoute,
  beforeOpen: {
    effect: wrapEventToFx(tournamentModel.tournamentQuery.start),
    mapParams: ({ params }) => ({ id: params.tournamentId }),
  },
});
