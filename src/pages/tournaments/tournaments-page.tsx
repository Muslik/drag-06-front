import { Text, Container, DefaultMantineColor, Paper, Title, Box } from '@mantine/core';
import { Link } from 'atomic-router-react';
import dayjs from 'dayjs';
import { useUnit } from 'effector-react';

import { tournamentModel } from '@drag/entities/tournament';
import { internalApi } from '@drag/shared/api';
import { routes } from '@drag/shared/routing';

const BADGE_MAP = {
  CREATED: {
    title: 'Скоро регистрация',
    color: 'cyan',
  },
  REGISTRATION: {
    title: 'Регистрация',
    color: 'red',
  },
  IN_PROGRESS: {
    title: 'В процессе',
    color: 'green',
  },
  FINISHED: {
    title: 'Завершен',
    color: 'gray',
  },
} satisfies Record<
  internalApi.TournamentDto['status'],
  {
    title: string;
    color: DefaultMantineColor;
  }
>;

export default function TournamentsPage() {
  const { data } = useUnit(tournamentModel.tournamentsQuery);

  return (
    <Container size="lg" w="100%">
      <Title
        className="mb-6"
        onClick={() => {
          tournamentModel.tournamentsQuery.start({});
        }}
      >
        Список турниров:
      </Title>
      {data.map(({ id, description, title, status, startDate }) => {
        const { color: badgeColor } = BADGE_MAP[status];

        const isToday = dayjs().isSame(startDate, 'day');
        const isFinished = status === 'FINISHED';

        const startDateDescription =
          !isFinished && isToday ? 'Сегодня' : startDate.format(!isFinished ? 'DD MMMM' : '');
        const startTimeDescription = startDate.format(isFinished ? 'dd MMMM, YYYY' : 'HH:mm');

        return (
          <Paper
            key={id}
            radius="md"
            p="lg"
            withBorder={true}
            mb="md"
            className="flex cursor-pointer hover:shadow-lg transition-shadow duration-300"
          >
            <Paper
              bg={badgeColor}
              p="sm"
              w="100"
              h="100"
              className="flex flex-col items-center justify-center"
            >
              {startDateDescription && (
                <Text c="#fff" size="md" className="text-center">
                  {startDateDescription}
                </Text>
              )}
              <Text c="#fff" size="32px">
                {startTimeDescription}
              </Text>
            </Paper>
            <Box className="pt-4 ml-4 h-full">
              <Text size="24px" fw="bold" className="block mb-4">
                {title}
              </Text>
              <Text size="14px" className="self-start">
                {description}
              </Text>
            </Box>
            <Link
              to={routes.tournament.current}
              params={{ tournamentId: '1' }}
              className="ml-auto mt-auto mb-auto"
            >
              Открыть
            </Link>
          </Paper>
        );
      })}
    </Container>
  );
}
