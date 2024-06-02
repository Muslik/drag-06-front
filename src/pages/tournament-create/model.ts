import { sample } from 'effector';

import { createTournamentModel } from '@drag/features/tournament/create-tournament';
import { routes } from '@drag/shared/routing';

export const currentRoute = routes.tournamentsCreate;

sample({
  clock: createTournamentModel.tournamentMutation.finished.success,
  target: routes.tournaments.open
})
