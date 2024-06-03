import {
  UnmappedRouteObject,
  createHistoryRouter,
  createRoute,
  createRouterControls,
} from 'atomic-router';
import { sample } from 'effector';
import { createBrowserHistory } from 'history';

import { appStarted } from './config/init';

export const routes = {
  home: createRoute(),
  tournament: {
    current: createRoute<{ tournamentId: string }>(),
    all: createRoute(),
    register: createRoute<{ tournamentId: string }>(),
    create: createRoute(),
  },
  notFound: createRoute(),
};

const routesMap: UnmappedRouteObject<any>[] = [
  { path: '/', route: routes.home },
  { path: '/tournaments', route: routes.tournament.all },
  { path: '/tournaments/create', route: routes.tournament.create },
  { path: '/tournaments/:tournamentId', route: routes.tournament.current },
  { path: '/tournaments/:tournamentId/register', route: routes.tournament.register },
  { path: '/404', route: routes.notFound },
];

export const controls = createRouterControls();

export const router = createHistoryRouter({
  routes: routesMap,
  notFoundRoute: routes.notFound,
  controls,
});

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
});

