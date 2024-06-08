import { sample } from 'effector';

import { createTournamentModel } from '@drag/features/tournament/create-tournament';
import { controls, routes } from '@drag/shared/routing';
import { chainAuthorized } from '@drag/shared/session';

export const currentRoute = routes.tournament.create;

export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.home.navigate,
  role: 'ADMIN'
});

sample({
  clock: createTournamentModel.tournamentMutation.finished.success,
  filter: authorizedRoute.$isOpened,
  target: routes.tournament.all.open,
});

sample({
  clock: createTournamentModel.creationCancelled,
  target: controls.back,
});
