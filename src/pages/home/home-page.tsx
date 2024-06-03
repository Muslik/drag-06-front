import { Link } from 'atomic-router-react';
import { useUnit } from 'effector-react';

import { tournamentModel } from '@drag/entities/tournament';
import { routes } from '@drag/shared/routing';

export default function HomePage() {
  const { pending } = useUnit(tournamentModel.tournamentsQuery);
  const [openedTournament] = useUnit([tournamentModel.$openedTournament]);

  return (
    <div className="bg-black h-full bg-no-repeat bg-cover pt-24">
      {openedTournament && !pending && (
        <Link
          to={routes.tournament.create}
          params={{ id: openedTournament.id }}
          className="btn absolute max-w-72 bottom-20 left-0 right-0 mr-auto ml-auto text-white rounded-full btn-lg btn-primary"
        >
          Принять участие
        </Link>
      )}
    </div>
  );
}
