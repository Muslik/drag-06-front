import { lazy } from 'react';
import { currentRoute } from './model';

export const TournamentsRoute = {
  route: currentRoute,
  view: lazy(() => import('./tournaments-page')),
}
