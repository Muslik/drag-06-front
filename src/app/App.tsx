import { createTheme, ThemeProvider } from '@mui/material';
import { Link, RouterProvider } from 'atomic-router-react';

import { appRoutes } from '@drag/shared/routes';

import { router, RoutesView } from './routing';
import './styles/index.scss';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}>
        <Link
          to={appRoutes.home}
          className="rounded bg-indigo-500 px-6 py-2 text-white"
          activeClassName="bg-green-500"
        >
          Home
        </Link>
        <RoutesView />
      </RouterProvider>
    </ThemeProvider>
  );
};
