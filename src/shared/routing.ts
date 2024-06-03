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
  tournament: createRoute<{ id: string | number }>(),
  tournaments: createRoute(),
  tournamentsRegister: createRoute<{ id: string | number }>(),
  tournamentsCreate: createRoute(),
  notFound: createRoute(),
};

const routesMap: UnmappedRouteObject<any>[] = [
  { path: '/', route: routes.home },
  { path: '/tournaments', route: routes.tournaments },
  { path: '/tournaments/create', route: routes.tournamentsCreate },
  { path: '/tournaments/:id/register', route: routes.tournamentsRegister },
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

