import { createRoutesView } from 'atomic-router-react';

import { HomeRoute } from './home';
import { TournamentCreateRoute } from './tournament-create';
import { TournamentsRoute } from './tournaments';
import { TournamentRoute } from './tournament';

export const Pages = createRoutesView({
  routes: [HomeRoute, TournamentRoute, TournamentsRoute, TournamentCreateRoute],
});

