import { lazy } from 'react';
import { currentRoute } from './model';

export const TournamentRoute = {
  route: currentRoute,
  view: lazy(() => import('./tournament-page')),
}

