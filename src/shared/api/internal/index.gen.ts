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

export type ApiErrorResponse = {
  /**
   * Error status code
   * @example 401
   */
  statusCode: number;
  /**
   * Error type
   * @example "UNAUTHORIZED"
   */
  type: string;
  /**
   * Error code
   * @example "AUTH.INVALID_GRANT"
   */
  code: string;
  /**
   * Error message
   * @example "Token is not valid"
   */
  message: string;
  /** Error additional info */
  inner?: object;
};

export type SignInDto = {
  /** @example "google-token" */
  token: string;
  /** @example "google" */
  provider: 'google';
};

export type UserAuthDto = {
  /** @example 1 */
  id: number;
  /** @example "johny" */
  username: string;
  /** @example "johny76@gmail.com" */
  email: string;
  /** @example "John" */
  firstName?: string | null;
  /** @example "Doe" */
  lastName?: string | null;
  /** @example "#ffffff" */
  avatarColor: string;
};

export type RequestValidationErrorDto = {
  isString?: string;
  isNumberString?: string;
  isEmail?: string;
  isNumber?: string;
  isEnum?: string;
  isNotEmpty?: string;
  isArray?: string;
  isIn?: string;
  isDate?: string;
  isDateString?: string;
  arrayMaxSize?: string;
  arrayMinSize?: string;
  arrayUnique?: string;
  arrayNotEmpty?: string;
};

export type ApiValidationErrorResponse = {
  /**
   * Error status code
   * @example 400
   */
  statusCode: number;
  /**
   * Error type
   * @example "BAD_REQUEST"
   */
  type: string;
  /**
   * Error code
   * @example "VALIDATION_ERROR"
   */
  code: string;
  /**
   * Error message
   * @example "Validation failed"
   */
  message: string;
  /** Validation errors */
  inner: Record<string, RequestValidationErrorDto>;
};

export type JWTTokensDto = {
  /** @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" */
  accessToken: string;
  /** @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" */
  refreshToken: string;
};

export type RefreshTokenDto = {
  /** @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" */
  refreshToken: string;
};

export type RateLimitException = object;

export type TournamentDto = {
  /** @example "Турнир по дрег рейсингу 3й этап" */
  title: string;
  /**
   * @maxLength 1500
   * @example "Турнир пройдет дома"
   */
  description: string;
  /**
   * @format date-time
   * @example "2021-10-10T10:00:00.000Z"
   */
  startDate: string;
  /** @example 2000 */
  fee: number;
  /** @example [1,2,3,4,5] */
  availableRacerNumbers: number[];
  /** @example "CREATED" */
  status: 'CREATED' | 'REGISTRATION' | 'IN_PROGRESS' | 'FINISHED';
  /** @example 1 */
  id: number;
  /** @format date-time */
  createdAt: string;
};

export type TournamentCreateDto = {
  /** @example "Турнир по дрег рейсингу 3й этап" */
  title: string;
  /**
   * @maxLength 1500
   * @example "Турнир пройдет дома"
   */
  description?: string;
  /**
   * @format date-time
   * @example "2021-10-10T10:00:00.000Z"
   */
  startDate: string;
  /** @example 2000 */
  fee: number;
  /** @example [1,2,3,4,5] */
  availableRacerNumbers: number[];
  /** @example "CREATED" */
  status?: 'CREATED' | 'REGISTRATION' | 'IN_PROGRESS' | 'FINISHED';
};

export type AuthSignInParams = { data: SignInDto };

export const authSignInFx = createEffect<
  AuthSignInParams,
  UserAuthDto,
  ApiValidationErrorResponse | ApiErrorResponse
>({
  async handler({ data }) {
    const response = await requestFx({
      path: `/auth/sign-in`,
      method: 'post',
      body: data,
    });

    if (response.status >= 400) {
      throw response.body as ApiValidationErrorResponse | ApiErrorResponse;
    }

    return response.body as UserAuthDto;
  },
});

export type AuthJwtSignInParams = { data: SignInDto };

export const authJwtSignInFx = createEffect<
  AuthJwtSignInParams,
  JWTTokensDto,
  ApiValidationErrorResponse | ApiErrorResponse
>({
  async handler({ data }) {
    const response = await requestFx({
      path: `/auth/jwt/sign-in`,
      method: 'post',
      body: data,
    });

    if (response.status >= 400) {
      throw response.body as ApiValidationErrorResponse | ApiErrorResponse;
    }

    return response.body as JWTTokensDto;
  },
});

export type AuthRefreshTokensParams = { data: RefreshTokenDto };

export const authRefreshTokensFx = createEffect<
  AuthRefreshTokensParams,
  JWTTokensDto,
  ApiValidationErrorResponse | ApiErrorResponse
>({
  async handler({ data }) {
    const response = await requestFx({
      path: `/auth/jwt/refresh`,
      method: 'post',
      body: data,
    });

    if (response.status >= 400) {
      throw response.body as ApiValidationErrorResponse | ApiErrorResponse;
    }

    return response.body as JWTTokensDto;
  },
});

export type AuthMeParams = void;

export const authMeFx = createEffect<AuthMeParams, UserAuthDto, ApiErrorResponse>({
  async handler() {
    const response = await requestFx({
      path: `/auth/me`,
      method: 'post',
    });

    if (response.status >= 400) {
      throw response.body as ApiErrorResponse;
    }

    return response.body as UserAuthDto;
  },
});

export type AuthLogoutParams = void;

export const authLogoutFx = createEffect<AuthLogoutParams, void, ApiErrorResponse>({
  async handler() {
    const response = await requestFx({
      path: `/auth/logout`,
      method: 'post',
    });

    if (response.status >= 400) {
      throw response.body as ApiErrorResponse;
    }

    return response.body as void;
  },
});

export type UsersGetUsersParams = void;

export const usersGetUsersFx = createEffect<UsersGetUsersParams, void, any>({
  async handler() {
    const response = await requestFx({
      path: `/users`,
      method: 'get',
    });

    if (response.status >= 400) {
      throw response.body as any;
    }

    return response.body as void;
  },
});

export type TournamentGetTournamentsParams = {
  query?: {
    'take'?: string | number;
    'skip'?: string | number;
    'order[direction]'?: 'asc' | 'desc';
    'order[field]'?: 'createdAt' | 'status' | 'startDate';
    'where[status]'?: 'CREATED' | 'REGISTRATION' | 'IN_PROGRESS' | 'FINISHED';
  };
};

export const tournamentGetTournamentsFx = createEffect<
  TournamentGetTournamentsParams,
  TournamentDto[],
  ApiErrorResponse | RateLimitException
>({
  async handler({ query }) {
    const response = await requestFx({
      path: `/tournaments`,
      method: 'get',
      query,
    });

    if (response.status >= 400) {
      throw response.body as ApiErrorResponse | RateLimitException;
    }

    return response.body as TournamentDto[];
  },
});

export type TournamentCreateTournamentParams = { data: TournamentCreateDto };

export const tournamentCreateTournamentFx = createEffect<
  TournamentCreateTournamentParams,
  TournamentDto,
  ApiValidationErrorResponse | ApiErrorResponse | RateLimitException
>({
  async handler({ data }) {
    const response = await requestFx({
      path: `/tournaments`,
      method: 'post',
      body: data,
    });

    if (response.status >= 400) {
      throw response.body as ApiValidationErrorResponse | ApiErrorResponse | RateLimitException;
    }

    return response.body as TournamentDto;
  },
});

export type TournamentGetTournamentByIdParams = { id: string };

export const tournamentGetTournamentByIdFx = createEffect<
  TournamentGetTournamentByIdParams,
  TournamentDto,
  ApiErrorResponse | RateLimitException
>({
  async handler({ id }) {
    const response = await requestFx({
      path: `/tournaments/${id}`,
      method: 'get',
    });

    if (response.status >= 400) {
      throw response.body as ApiErrorResponse | RateLimitException;
    }

    return response.body as TournamentDto;
  },
});
