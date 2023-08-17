import { createTheme, ThemeProvider } from '@mui/material';
import { RouterProvider } from 'atomic-router-react';

import { Header } from '@drag/widgets/header';

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
        <Header />
        <RoutesView />
      </RouterProvider>
    </ThemeProvider>
  );
};
