import { createTheme, LoadingOverlay, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { RouterProvider } from 'atomic-router-react';
import 'dayjs/locale/ru';
import { Suspense } from 'react';

import { Pages } from '@drag/pages';
import { env } from '@drag/shared/config';
import { NOTIFICATIONS_LIMIT, NOTIFICATIONS_TIMEOUT } from '@drag/shared/notification';
import { router } from '@drag/shared/routing';
import { Footer } from '@drag/widgets/footer';
import { Header } from '@drag/widgets/header';

import './styles/index.css';

const theme = createTheme({});

export function App() {
  return (
    <MantineProvider theme={theme}>
      <Suspense fallback={<LoadingOverlay visible={true} />}>
        <RouterProvider router={router}>
          <Notifications
            autoClose={NOTIFICATIONS_TIMEOUT}
            position="bottom-center"
            limit={NOTIFICATIONS_LIMIT}
          />
          <GoogleOAuthProvider clientId={env.GOOGLE_CLIENT_ID}>
            <div className="flex flex-col grow">
              <Header />
              <Pages />
            </div>
            <Footer className="shrink-0" />
          </GoogleOAuthProvider>
        </RouterProvider>
      </Suspense>
    </MantineProvider>
  );
}
