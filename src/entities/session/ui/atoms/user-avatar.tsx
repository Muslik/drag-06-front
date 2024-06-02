import { Avatar } from '@mantine/core';
import { useUnit } from 'effector-react';

import { $session } from '@drag/entities/session';
import { generateAvatarInitials } from '@drag/entities/session/lib';

export const UserAvatar = () => {
  const session = useUnit($session);

  if (!session) {
    return null;
  }

  const { firstName, lastName } = session;

  const initials = generateAvatarInitials(firstName, lastName);

  return <Avatar>{initials}</Avatar>;
};
