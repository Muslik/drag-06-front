import { createEffect } from 'effector';

import { ApiErrorResponse, LoginGoogleDto, SessionUserDto } from '@drag/shared/api/internal';

import { requestFx } from './request';

export const loginGoogleApiFx = createEffect<LoginGoogleDto, SessionUserDto, ApiErrorResponse>({
  async handler(body) {
    const response = await requestFx({
      path: '/auth/login/google',
      method: 'post',
      body,
    });
    if (response.status >= 400) {
      throw response.body as ApiErrorResponse;
    }

    return response.body as SessionUserDto;
  },
});

export const getSessionApiFx = createEffect<void, SessionUserDto>({
  async handler() {
    const response = await requestFx({
      path: '/auth/session',
      method: 'post',
    });
    if (response.status >= 400) {
      throw response.body as ApiErrorResponse;
    }

    return response.body as SessionUserDto;
  },
});

export const deleteSessionApiFx = createEffect({
  async handler() {
    const response = await requestFx({
      path: '/auth/logout',
      method: 'post',
    });
    if (response.status >= 400) {
      throw response.body as ApiErrorResponse;
    }

    return response.body as SessionUserDto;
  },
});

export const deleteAllSessionsApiFx = createEffect({
  async handler() {
    const response = await requestFx({
      path: '/auth/logout-all',
      method: 'post',
    });
    if (response.status >= 400) {
      throw response.body as ApiErrorResponse;
    }

    return response.body as SessionUserDto;
  },
});
