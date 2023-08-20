import { createHistoryRouter } from 'atomic-router';
import { createRoutesView } from 'atomic-router-react';
import { createBrowserHistory } from 'history';

import { Error404Page } from '@drag/pages/error404';
import { EventsPage } from '@drag/pages/events';
import { HomePage } from '@drag/pages/home';
import { appRoutes } from '@drag/shared/routes';

const routes = [
  { path: '/', route: appRoutes.home, view: HomePage },
  { path: '/404', route: appRoutes.notFound, view: Error404Page },
  { path: '/events', route: appRoutes.events, view: EventsPage },
];

const history = createBrowserHistory();

export const RoutesView = createRoutesView({
  routes,
  otherwise: Error404Page,
});

export const router = createHistoryRouter({
  routes,
  notFoundRoute: appRoutes.notFound,
});

router.setHistory(history);
