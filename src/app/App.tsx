import { createTheme, ThemeProvider } from '@mui/material';
import { RouterProvider } from 'atomic-router-react';
import { createEvent, sample } from 'effector';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';

import { requestSession } from '@drag/entities/session';
import { Header } from '@drag/widgets/header';

import { router, RoutesView } from './routing';
import './styles/index.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const readyEvent = createEvent();

sample({
  clock: readyEvent,
  target: requestSession,
});

export const App = () => {
  const ready = useUnit(readyEvent);

  useEffect(() => {
    ready();
  }, [ready]);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}>
        <Header />
        <RoutesView />
      </RouterProvider>
    </ThemeProvider>
  );
};
