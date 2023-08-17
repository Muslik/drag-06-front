import { attach, createEffect, createEvent, restore } from 'effector';

import { Answer, Request } from '@drag/shared/api';
import { env } from '@drag/shared/config';
import { logger } from '@drag/shared/lib/logger';

export const sendRequestFx = createEffect<Request, Answer, Answer>();

export const setCookiesForRequest = createEvent<string>();
export const $cookiesForRequest = restore(setCookiesForRequest, '');

export const setCookiesFromResponse = createEvent<string>();
export const $cookiesFromResponse = restore(setCookiesFromResponse, '');

export const requestFx = attach({
  effect: sendRequestFx,
  source: $cookiesForRequest,
  mapParams: (parameters: Request, cookies) => ({ ...parameters, cookies }),
});

if (env.IS_DEBUG || env.IS_DEV_ENV) {
  // eslint-disable-next-line effector/no-watch
  sendRequestFx.watch(({ path, method }) => {
    logger.info('[ REQUEST ]', { method, path });
  });

  // eslint-disable-next-line effector/no-watch
  sendRequestFx.done.watch(({ params: { path, method }, result: { status } }) => {
    logger.info('[ REQUEST DONE ]', { method, path, status });
  });

  // eslint-disable-next-line effector/no-watch
  sendRequestFx.fail.watch(({ params: { path, method }, error: { status, body } }) => {
    logger.info('[ REQUEST FAIL ]', { method, path, status, body });
  });
}
