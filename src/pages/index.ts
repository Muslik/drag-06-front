import { createRoutesView } from 'atomic-router-react';

import { HomeRoute } from './home';
import { TournamentCreateRoute } from './tournament-create';
import { TournamentsRoute } from './tournaments';

export const Pages = createRoutesView({
  routes: [HomeRoute, TournamentsRoute, TournamentCreateRoute],
});

