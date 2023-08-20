import { Divider, Box, createTheme, ThemeProvider } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { RouterProvider } from 'atomic-router-react';
import { createEvent, sample } from 'effector';
import { useUnit } from 'effector-react';
import { useEffect, useMemo } from 'react';

import { requestSession } from '@drag/entities/session';
import { Footer } from '@drag/widgets/footer';
import { Header } from '@drag/widgets/header';

import { router, RoutesView } from './routing';
import './styles/index.css';

const readyEvent = createEvent();

sample({
  clock: readyEvent,
  target: requestSession,
});

export const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const ready = useUnit(readyEvent);

  useEffect(() => {
    ready();
  }, [ready]);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}>
        <Box className="grow shrink-0">
          <Header />
          <RoutesView />
        </Box>
        <Divider />
        <Footer className="shrink-0" />
      </RouterProvider>
    </ThemeProvider>
  );
};
