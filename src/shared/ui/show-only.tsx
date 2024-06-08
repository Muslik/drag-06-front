import { useUnit } from 'effector-react';
import { ReactNode } from 'react';

import { $user, Role, checkRole } from '@drag/shared/session';

type AuthorizedProps = {
  when: 'authorized';
  role?: Role;
};

type AnonymousProps = {
  when: 'anonymous';
};

type Props = (AuthorizedProps | AnonymousProps) & {
  children: ReactNode;
};

export function ShowOnly({ when, children, ...props }: Props) {
  const user = useUnit($user);

  if (when === 'authorized') {
    if (!user) {
      return null;
    }

    if ('role' in props && !checkRole(user.role, props.role)) {
      return null;
    }
  }

  if (user && when === 'anonymous') {
    return null;
  }

  return <>{children}</>;
}
