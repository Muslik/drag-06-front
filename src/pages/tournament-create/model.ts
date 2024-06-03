import { sample } from 'effector';

import { createTournamentModel } from '@drag/features/tournament/create-tournament';
import { controls, routes } from '@drag/shared/routing';

export const currentRoute = routes.tournamentsCreate;

sample({
  clock: createTournamentModel.tournamentMutation.finished.success,
  filter: currentRoute.$isOpened,
  target: routes.tournaments.open
})

sample({
  clock: createTournamentModel.creationCancelled,
  target: controls.back,
})
