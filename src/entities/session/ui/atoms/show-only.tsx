import { useUnit } from 'effector-react';
import { ReactNode } from 'react';

import { $isAuthenticated } from '@drag/entities/session';

type Props = {
  when: 'authorized' | 'anonymous';
  children: ReactNode;
};

export const ShowOnly = ({ when, children }: Props) => {
  const isAuthorized = useUnit($isAuthenticated);
  const shouldShow = (when === 'authorized') === isAuthorized;

  if (!shouldShow) {
    return null;
  }

  return <>{children}</>;
};
