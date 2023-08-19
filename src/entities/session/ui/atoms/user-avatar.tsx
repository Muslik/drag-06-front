import { Avatar } from '@mui/material';
import { useUnit } from 'effector-react';

import { $session } from '@drag/entities/session';
import { generateAvatarInitials } from '@drag/entities/session/lib';

export const UserAvatar = () => {
  const session = useUnit($session);

  if (!session) {
    return null;
  }

  const { firstName, lastName, avatarColor } = session;

  const initials = generateAvatarInitials(firstName, lastName);

  return <Avatar sx={{ bgcolor: avatarColor, color: '#fff' }}>{initials}</Avatar>;
};
