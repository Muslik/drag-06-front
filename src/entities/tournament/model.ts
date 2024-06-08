import { concurrency, createQuery } from '@farfetched/core';
import dayjs from 'dayjs';

import { internalApi } from '@drag/shared/api';

export const tournamentsQuery = createQuery({
  effect: internalApi.tournamentGetTournamentsFx,
  initialData: [],
  mapData: ({ result }) =>
    result.map((tournament) => {
      return {
        ...tournament,
        id: tournament.id.toString(),
        startDate: dayjs(tournament.startDate),
        createdAt: dayjs(tournament.createdAt),
      };
    }),
});

export const tournamentQuery = createQuery({
  effect: internalApi.tournamentGetTournamentByIdFx,
});

concurrency(tournamentQuery, {
  strategy: 'TAKE_LATEST',
});

export const $openedToRegisterTournament = tournamentsQuery.$data.map(
  (tournaments) => tournaments.find((tournament) => tournament.status === 'REGISTRATION') ?? null,
);
