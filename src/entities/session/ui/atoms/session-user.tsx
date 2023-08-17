import { useStore } from 'effector-react/ssr';

import { $session } from '@drag/entities/session';

export const SessionUser = () => {
  const sessionUser = useStore($session);

  if (!sessionUser) {
    return null;
  }

  return <span>{sessionUser.username}</span>;
};
