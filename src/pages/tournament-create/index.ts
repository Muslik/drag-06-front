import { createRouteView } from 'atomic-router-react';
import { lazy } from 'react';

import { PageLoader } from '@drag/shared/ui';

import { authorizedRoute } from './model';

export const TournamentCreateRoute = {
  view: createRouteView({
    route: authorizedRoute,
    view: lazy(() => import('./tournament-create-page')),
    otherwise: PageLoader,
  }),
  route: authorizedRoute,
};
