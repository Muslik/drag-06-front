import { createRoutesView } from 'atomic-router-react';

import { HomeRoute } from './home';
import { SignInRoute } from './sign-in';
import { TournamentRoute } from './tournament';
import { TournamentCreateRoute } from './tournament-create';
import { TournamentsRoute } from './tournaments';

export const Pages = createRoutesView({
  routes: [SignInRoute, HomeRoute, TournamentRoute, TournamentsRoute, TournamentCreateRoute],
});
