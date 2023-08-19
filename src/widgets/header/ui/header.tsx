import { Logout } from '@mui/icons-material';
import { AppBar, IconButton, ListItemIcon, Menu, MenuItem, Toolbar } from '@mui/material';
import { useUnit } from 'effector-react';
import { useState } from 'react';

import { UserAvatar, ShowOnly } from '@drag/entities/session';
import { LoginGoogleButton } from '@drag/features/auth/loginGoogle';
import { logout } from '@drag/features/auth/logout';
import { Logo } from '@drag/shared/ui';

export const Header = () => {
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null);

  const handleClickLogout = useUnit(logout);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElement(null);
  };

  return (
    <AppBar position="static">
      <Toolbar className="flex justify-between py-4">
        <Logo href="/" isInverted={true} />
        <ShowOnly when="anonymous">
          <LoginGoogleButton />
        </ShowOnly>
        <ShowOnly when="authorized">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <UserAvatar />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElement}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            open={Boolean(anchorElement)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClickLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Выйти
            </MenuItem>
          </Menu>
        </ShowOnly>
      </Toolbar>
    </AppBar>
  );
};
