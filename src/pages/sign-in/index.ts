import { createRouteView } from 'atomic-router-react';
import { lazy } from 'react';

import { PageLoader } from '@drag/shared/ui';

import { currentRoute, anonymousRoute } from './model';

export const SignInRoute = {
  view: createRouteView({
    route: anonymousRoute,
    view: lazy(() => import('./sign-in-page')),
    otherwise: PageLoader,
  }),
  route: currentRoute,
};
