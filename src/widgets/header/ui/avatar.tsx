import { Avatar as MantineAvatar } from '@mantine/core';
import { useUnit } from 'effector-react';

import { $user } from '@drag/shared/session';

import { generateAvatarInitials } from '../lib';

export function Avatar() {
  const user = useUnit($user);

  if (!user) {
    return null;
  }

  return (
    <div
      className={`rounded-full border-1.5 border-black-600 border-solid hover:bg-neutral-100 hover:transition-all`}
    >
      <MantineAvatar size="lg" src={null} color={user.avatarColor}>
        {generateAvatarInitials(user.firstName, user.lastName)}
      </MantineAvatar>
    </div>
  );
}
