import { Button, Container } from '@mantine/core';
import { Link } from 'atomic-router-react';
import clsx from 'clsx';

import { routes } from '@drag/shared/routing';
import { Logo, ShowOnly } from '@drag/shared/ui';

import { Avatar } from './avatar';

type Props = {
  className?: string;
};

export function Header({ className }: Props) {
  return (
    <header className={clsx('p-4 border-2 border-indigo-600', className)}>
      <Container size="xl" w="100%" className="flex justify-between items-center">
        <Logo type="icon" />
        <ShowOnly when="anonymous">
          <Button component={Link} to={routes.signIn}>
            Войти
          </Button>
        </ShowOnly>
        <Avatar />
      </Container>
    </header>
  );
}
