import { Avatar } from '@mui/material';
import { useStore } from 'effector-react/ssr';

import { $session } from '@drag/entities/session';
import { generateAvatarInitials } from '@drag/entities/session/lib';

export const UserAvatar = () => {
  const session = useStore($session);

  if (!session) {
    return null;
  }

  const { firstName, lastName, avatarColor } = session;

  const initials = generateAvatarInitials(firstName, lastName);

  return <Avatar sx={{ bgcolor: avatarColor, color: '#fff' }}>{initials}</Avatar>;
};
