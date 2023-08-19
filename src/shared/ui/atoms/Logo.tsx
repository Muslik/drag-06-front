import clsx from 'clsx';

import invertedLogo from '@drag/shared/assets/logo-inverted.svg';
import logo from '@drag/shared/assets/logo.svg';

type Props = {
  href: string;
  isInverted?: boolean;
  className?: string;
};

export const Logo = ({ isInverted = false, href, className }: Props) => {
  return (
    <a href={href} className={clsx(className)}>
      <img width="150" alt="Logo" src={isInverted ? invertedLogo : logo} />
    </a>
  );
};
