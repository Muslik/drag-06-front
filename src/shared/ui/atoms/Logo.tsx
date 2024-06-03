import clsx from 'clsx';
import { ReactNode } from 'react';

import invertedLogo from '@drag/shared/assets/logo-inverted.svg';
import logo from '@drag/shared/assets/logo.svg';
import { routes } from '@drag/shared/routing';
import { Link } from 'atomic-router-react';

type Props = {
  className?: string;
  type?: 'both' | 'text' | 'icon';
  isInverted?: boolean;
};

export const Logo = ({ className, type = 'both', isInverted = false, }: Props) => {
  const LinkWrapper = ({ children }: { children: ReactNode }) => (
    <Link
      to={routes.home}
      /* sx={{ */
      /*   textDecoration: 'none', */
      /*   color: isInverted ? 'white' : 'black', */
      /*   fontWeight: 700, */
      /*   fontSize: '20px', */
      /*   ...sx, */
      /* }} */
      className={clsx('flex gap-4 items-center', className)}
    >
      {children}
    </Link>
  );

  const textNode = <span>Drag06</span>;

  const iconNode = <img width="100" alt="Logo" src={isInverted ? invertedLogo : logo} />;

  if (type === 'text') {
    return <LinkWrapper>{textNode}</LinkWrapper>;
  }

  if (type === 'icon') {
    return <LinkWrapper>{iconNode}</LinkWrapper>;
  }

  return (
    <LinkWrapper>
      {iconNode}
      {textNode}
    </LinkWrapper>
  );
};
