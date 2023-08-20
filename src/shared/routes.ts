import { createRoute } from 'atomic-router';

export const appRoutes = {
  home: createRoute(),
  events: createRoute(),
  notFound: createRoute(),
};
