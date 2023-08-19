import { useUnit } from 'effector-react';

import { $session } from '@drag/entities/session';

export const SessionUser = () => {
  const sessionUser = useUnit($session);

  if (!sessionUser) {
    return null;
  }

  return <span>{sessionUser.username}</span>;
};
