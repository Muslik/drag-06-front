import { Button, Title } from '@mantine/core';
import { Link } from 'atomic-router-react';
import { useUnit } from 'effector-react';

import { tournamentModel } from '@drag/entities/tournament';
import { routes } from '@drag/shared/routing';

export default function HomePage() {
  const [openedTournament] = useUnit([tournamentModel.$openedToRegisterTournament]);

  return (
    <div className="h-full bg-no-repeat bg-cover p-8 bg-car2">
      {openedTournament && (
        <>
          <Title className="text-white">{openedTournament.title}</Title>
          <Button
            component={Link}
            to={routes.tournament.create}
            className="btn absolute max-w-72 bottom-20 left-0 right-0 mr-auto ml-auto text-white rounded-full btn-lg btn-primary"
          >
            Принять участие
          </Button>
        </>
      )}
    </div>
  );
}
