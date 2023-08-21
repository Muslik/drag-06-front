import { Divider, Box, createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { RouterProvider } from 'atomic-router-react';
import 'dayjs/locale/ru';
import { createEvent, sample } from 'effector';
import { useUnit } from 'effector-react';
import { useEffect, useMemo } from 'react';

import { requestSession } from '@drag/entities/session';
import { Notification } from '@drag/shared/ui';
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
      <Notification />
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
        <CssBaseline />
        <RouterProvider router={router}>
          <Box className="grow shrink-0">
            <Header />
            <RoutesView />
          </Box>
          <Divider />
          <Footer className="shrink-0" />
        </RouterProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
};
