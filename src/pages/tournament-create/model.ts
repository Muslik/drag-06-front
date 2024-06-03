import { sample } from 'effector';

import { createTournamentModel } from '@drag/features/tournament/create-tournament';
import { controls, routes } from '@drag/shared/routing';

export const currentRoute = routes.tournament.create;

sample({
  clock: createTournamentModel.tournamentMutation.finished.success,
  filter: currentRoute.$isOpened,
  target: routes.tournament.all.open
})

sample({
  clock: createTournamentModel.creationCancelled,
  target: controls.back,
})
