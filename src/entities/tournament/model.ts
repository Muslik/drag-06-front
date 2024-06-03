import { createQuery } from '@farfetched/core';

import { internalApi } from '@drag/shared/api';

export const tournamentsQuery = createQuery({
  effect: internalApi.tournamentGetTournamentsFx,
  initialData: [],
});

export const $openedTournament = tournamentsQuery.$data.map(
  (tournaments) => tournaments.find((tournament) => tournament.status === 'REGISTRATION') ?? null,
);
