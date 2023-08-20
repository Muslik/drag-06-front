/* eslint-disable */

/* tslint:disable */

/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */
import { createEffect } from 'effector';

import { requestFx } from '../request';

export type LoginGoogleDto = {
  token: string;
};

export type SessionUserDto = {
  id: string;
  username: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  avatarColor: string;
};

export type ApiErrorResponse = {
  /**
   * Тип ошибки
   * @example "NOT_FOUND"
   */
  type: string;
  /**
   * Код ошибки
   * @example "EMPLOYEE_NOT_FOUND_ERROR_CODE"
   */
  code: string;
  /**
   * Человеческое описание ошибки
   * @example "Пользователь не найден"
   */
  message: string;
  /** Подробная информация об ошибке */
  inner?: object;
};

export type JWTTokensDto = {
  accessToken: string;
  refreshToken: string;
};

export type RefreshDto = {
  refreshToken: string;
};

export type EventEntity = {
  id: string;
  /** @format date-time */
  createdDate: string;
  /** @format date-time */
  eventDate: string;
  name: string;
  eventStatus: 'registration' | 'started' | 'finished';
};

export type CreateEventDto = {
  /** @format date-time */
  eventDate: string;
  name: string;
};

export type RequestValidationError = {
  /**
   * Поле у которого возникла ошибка
   * @example "email"
   */
  property: string;
  /**
   * Описание каждой ошибки
   * @example {"isNotEmpty":"Поле не может быть пустым"}
   */
  errors: Record<string, string>;
  nested: object[];
};

export type ApiValidationErrorResponse = {
  /**
   * Тип ошибки
   * @example "BAD_REQUEST"
   */
  type: string;
  /**
   * Код ошибки
   * @example "VALIDATION_ERROR"
   */
  code: string;
  /**
   * Человеческое описание ошибки
   * @example "Validation failed"
   */
  message: string;
  /** Ошибки валидации */
  inner: RequestValidationError[];
};

type AuthLoginGoogleParams = { data: LoginGoogleDto };

export const authLoginGoogleFx = createEffect<
  AuthLoginGoogleParams,
  SessionUserDto,
  ApiErrorResponse
>({
  async handler({ data }) {
    const response = await requestFx({
      path: '/auth/login/google',
      method: 'post',
      body: data,
    });

    if (response.status >= 400) {
      throw response.body as ApiErrorResponse;
    }

    return response.body as SessionUserDto;
  },
});

type AuthGetSessionUserParams = void;

export const authGetSessionUserFx = createEffect<
  AuthGetSessionUserParams,
  SessionUserDto,
  ApiErrorResponse
>({
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

type AuthLogoutParams = void;

export const authLogoutFx = createEffect<AuthLogoutParams, void, ApiErrorResponse>({
  async handler() {
    const response = await requestFx({
      path: '/auth/logout',
      method: 'post',
    });

    if (response.status >= 400) {
      throw response.body as ApiErrorResponse;
    }

    return response.body as void;
  },
});

type AuthLogoutAllParams = void;

export const authLogoutAllFx = createEffect<AuthLogoutAllParams, void, ApiErrorResponse>({
  async handler() {
    const response = await requestFx({
      path: '/auth/logout-all',
      method: 'post',
    });

    if (response.status >= 400) {
      throw response.body as ApiErrorResponse;
    }

    return response.body as void;
  },
});

type UsersGetUsersParams = void;

export const usersGetUsersFx = createEffect<UsersGetUsersParams, void, any>({
  async handler() {
    const response = await requestFx({
      path: '/users',
      method: 'get',
    });

    if (response.status >= 400) {
      throw response.body as any;
    }

    return response.body as void;
  },
});

type OauthLoginGoogleParams = { data: LoginGoogleDto };

export const oauthLoginGoogleFx = createEffect<
  OauthLoginGoogleParams,
  JWTTokensDto,
  ApiErrorResponse
>({
  async handler({ data }) {
    const response = await requestFx({
      path: '/oauth/login/google',
      method: 'post',
      body: data,
    });

    if (response.status >= 400) {
      throw response.body as ApiErrorResponse;
    }

    return response.body as JWTTokensDto;
  },
});

type OauthRefreshTokensParams = { data: RefreshDto };

export const oauthRefreshTokensFx = createEffect<
  OauthRefreshTokensParams,
  JWTTokensDto,
  ApiErrorResponse
>({
  async handler({ data }) {
    const response = await requestFx({
      path: '/oauth/refresh-tokens',
      method: 'post',
      body: data,
    });

    if (response.status >= 400) {
      throw response.body as ApiErrorResponse;
    }

    return response.body as JWTTokensDto;
  },
});

type EventsGetEventsParams = {
  query?: {
    take?: string;
    skip?: string;
    direction?: 'ASC' | 'DESC';
    order?: 'eventDate' | 'name' | 'eventStatus';
    search?: string;
  };
};

export const eventsGetEventsFx = createEffect<
  EventsGetEventsParams,
  EventEntity[],
  ApiErrorResponse
>({
  async handler({ query }) {
    const response = await requestFx({
      path: '/events',
      method: 'get',
      query,
    });

    if (response.status >= 400) {
      throw response.body as ApiErrorResponse;
    }

    return response.body as EventEntity[];
  },
});

type EventsCreateEventParams = { data: CreateEventDto };

export const eventsCreateEventFx = createEffect<
  EventsCreateEventParams,
  EventEntity,
  ApiValidationErrorResponse | ApiErrorResponse
>({
  async handler({ data }) {
    const response = await requestFx({
      path: '/events',
      method: 'post',
      body: data,
    });

    if (response.status >= 400) {
      throw response.body as ApiValidationErrorResponse | ApiErrorResponse;
    }

    return response.body as EventEntity;
  },
});

type EventsGetActiveEventsParams = {
  query?: {
    take?: string;
    skip?: string;
    direction?: 'ASC' | 'DESC';
    order?: 'eventDate' | 'name' | 'eventStatus';
    search?: string;
  };
};

export const eventsGetActiveEventsFx = createEffect<
  EventsGetActiveEventsParams,
  EventEntity[],
  ApiErrorResponse
>({
  async handler({ query }) {
    const response = await requestFx({
      path: '/events/active',
      method: 'get',
      query,
    });

    if (response.status >= 400) {
      throw response.body as ApiErrorResponse;
    }

    return response.body as EventEntity[];
  },
});
