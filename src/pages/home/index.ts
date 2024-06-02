import { currentRoute } from './model';
import { lazy } from 'react';

export const HomeRoute = {
  view: lazy(() => import('./home-page')),
  route: currentRoute
}
