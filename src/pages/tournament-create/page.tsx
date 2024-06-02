import { Container, Title } from '@mantine/core';

import { CreateTournamentForm } from '@drag/features/tournament/create-tournament';

export const TournamentCreatePage = () => {
  return (
    <Container size="xs" w="100%">
      <Title className="mb-6">Создание турнира</Title>
      <CreateTournamentForm />
    </Container>
  );
};
