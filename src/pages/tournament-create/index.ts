import { lazy } from 'react';
import { currentRoute } from './model';

export const TournamentCreateRoute = {
  view: lazy(() => import('./tournament-create-page')),
  route: currentRoute,
};
