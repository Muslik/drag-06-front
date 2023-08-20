import { SxProps, Link } from '@mui/material';
import { Link as RouterLink } from 'atomic-router-react';
import clsx from 'clsx';
import { ReactNode } from 'react';

import invertedLogo from '@drag/shared/assets/logo-inverted.svg';
import logo from '@drag/shared/assets/logo.svg';
import { appRoutes } from '@drag/shared/routes';

type Props = {
  className?: string;
  type?: 'both' | 'text' | 'icon';
  isInverted?: boolean;
  sx?: SxProps;
};

export const Logo = ({ className, type = 'both', isInverted = false, sx }: Props) => {
  const LinkWrapper = ({ children }: { children: ReactNode }) => (
    <Link
      component={RouterLink}
      to={appRoutes.home}
      sx={{
        textDecoration: 'none',
        color: isInverted ? 'white' : 'black',
        fontWeight: 700,
        fontSize: '20px',
        ...sx,
      }}
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
