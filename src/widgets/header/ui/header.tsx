import { Logout } from '@mui/icons-material';
import CalendarMonth from '@mui/icons-material/CalendarMonth';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Button,
  List,
  ListItem,
  IconButton,
  ListItemIcon,
  Menu,
  Toolbar,
  Typography,
  Container,
  Box,
  SwipeableDrawer,
  MenuItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Link } from 'atomic-router-react';
import clsx from 'clsx';
import { useUnit } from 'effector-react';
import { useState } from 'react';

import { UserAvatar, ShowOnly } from '@drag/entities/session';
import { LoginGoogleButton } from '@drag/features/auth/loginGoogle';
import { logout } from '@drag/features/auth/logout';
import { appRoutes } from '@drag/shared/routes';
import { Logo } from '@drag/shared/ui';

const pages = [
  {
    title: 'События',
    route: appRoutes.events,
    icon: <CalendarMonth />,
  },
];

type Props = {
  className?: string;
};

export const Header = ({ className }: Props) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const logoutEvent = useUnit(logout);

  const handleClickLogout = () => {
    logoutEvent();
    handleCloseUserMenu();
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen((is) => !is);
  };

  return (
    <AppBar position="static" className={clsx(className)}>
      <Container maxWidth="xl">
        <Toolbar disableGutters={true} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Logo type="text" sx={{ display: { xs: 'none', md: 'flex' } }} isInverted={true} />
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" onClick={toggleDrawer} color="inherit">
              <MenuIcon />
            </IconButton>
            <SwipeableDrawer
              anchor="left"
              open={isDrawerOpen}
              onClose={toggleDrawer}
              onOpen={toggleDrawer}
            >
              <Box sx={{ width: 250 }}>
                <List>
                  {pages.map((page) => (
                    <ListItem key={page.title} disablePadding={true}>
                      <ListItemButton component={Link} to={page.route} onClick={toggleDrawer}>
                        <ListItemIcon>{page.icon}</ListItemIcon>
                        <ListItemText>{page.title}</ListItemText>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </SwipeableDrawer>
          </Box>
          <Logo type="text" sx={{ display: { xs: 'flex', md: 'none' } }} isInverted={true} />
          <Box sx={{ marginLeft: 'auto', display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                component={Link}
                to={page.route}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Typography textAlign="center">{page.title}</Typography>
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <ShowOnly when="anonymous">
              <LoginGoogleButton />
            </ShowOnly>
            <ShowOnly when="authorized">
              <IconButton onClick={handleOpenUserMenu} size="small">
                <UserAvatar />
              </IconButton>
              <Menu
                anchorEl={anchorElUser}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleClickLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Выйти
                </MenuItem>
              </Menu>
            </ShowOnly>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
