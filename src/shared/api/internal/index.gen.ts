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
  inner: Record<string, RequestValidationErrorDto>;
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
  /** @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" */
  accessToken: string;
  /** @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" */
  refreshToken: string;
};

export type RefreshTokenDto = {
  /** @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" */
  refreshToken: string;
};

export type TournamentDto = {
  /** @example "Турнир по дрег рейсингу 3й этап" */
  title: string;
  /** @example "Турнир пройдет дома" */
  description: string;
  /**
   * @format date-time
   * @example "2021-10-10T10:00:00.000Z"
   */
  startDate: string;
  /**
   * @format date-time
   * @example "2021-10-10T10:00:00.000Z"
   */
  endRegistrationDate: string | null;
  /** @example 2000 */
  classET10Fee: number;
  /** @example 2000 */
  classET11Fee: number;
  /** @example 2000 */
  classET12Fee: number;
  /** @example 2000 */
  classET13Fee: number;
  /** @example 2000 */
  classET14Fee: number;
  /** @example 2000 */
  classET15Fee: number;
  /** @example [1,2,3,4,5] */
  availableRacerNumbers: number[];
  /** @example "CREATED" */
  status: 'CREATED' | 'REGISTRATION' | 'IN_PROGRESS' | 'FINISHED';
  /** @example 1 */
  id: number;
};

export type TournamentCreateDto = {
  /** @example "Турнир по дрег рейсингу 3й этап" */
  title: string;
  /** @example "Турнир пройдет дома" */
  description?: string;
  /**
   * @format date-time
   * @example "2021-10-10T10:00:00.000Z"
   */
  startDate: string;
  /**
   * @format date-time
   * @example "2021-10-10T10:00:00.000Z"
   */
  endRegistrationDate?: string | null;
  /** @example 2000 */
  classET10Fee: number;
  /** @example 2000 */
  classET11Fee: number;
  /** @example 2000 */
  classET12Fee: number;
  /** @example 2000 */
  classET13Fee: number;
  /** @example 2000 */
  classET14Fee: number;
  /** @example 2000 */
  classET15Fee: number;
  /** @example [1,2,3,4,5] */
  availableRacerNumbers: number[];
  /** @example "CREATED" */
  status?: 'CREATED' | 'REGISTRATION' | 'IN_PROGRESS' | 'FINISHED';
};

type AuthSignInParams = { data: SignInDto };

export const authSignInFx = createEffect<
  AuthSignInParams,
  UserAuthDto,
  ApiValidationErrorResponse | ApiErrorResponse
>({
  async handler({ data }) {
    const response = await requestFx({
      path: '/auth/sign-in',
      method: 'post',
      body: data,
    });

    if (response.status >= 400) {
      throw response.body as ApiValidationErrorResponse | ApiErrorResponse;
    }

    return response.body as UserAuthDto;
  },
});

type AuthJwtSignInParams = { data: SignInDto };

export const authJwtSignInFx = createEffect<
  AuthJwtSignInParams,
  JWTTokensDto,
  ApiValidationErrorResponse | ApiErrorResponse
>({
  async handler({ data }) {
    const response = await requestFx({
      path: '/auth/jwt/sign-in',
      method: 'post',
      body: data,
    });

    if (response.status >= 400) {
      throw response.body as ApiValidationErrorResponse | ApiErrorResponse;
    }

    return response.body as JWTTokensDto;
  },
});

type AuthRefreshTokensParams = { data: RefreshTokenDto };

export const authRefreshTokensFx = createEffect<
  AuthRefreshTokensParams,
  JWTTokensDto,
  ApiValidationErrorResponse | ApiErrorResponse
>({
  async handler({ data }) {
    const response = await requestFx({
      path: '/auth/jwt/refresh',
      method: 'post',
      body: data,
    });

    if (response.status >= 400) {
      throw response.body as ApiValidationErrorResponse | ApiErrorResponse;
    }

    return response.body as JWTTokensDto;
  },
});

type AuthMeParams = void;

export const authMeFx = createEffect<AuthMeParams, UserAuthDto, ApiErrorResponse>({
  async handler() {
    const response = await requestFx({
      path: '/auth/me',
      method: 'post',
    });

    if (response.status >= 400) {
      throw response.body as ApiErrorResponse;
    }

    return response.body as UserAuthDto;
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

type TournamentGetTournamentsParams = void;

export const tournamentGetTournamentsFx = createEffect<
  TournamentGetTournamentsParams,
  TournamentDto[],
  TournamentDto
>({
  async handler() {
    const response = await requestFx({
      path: '/tournaments',
      method: 'get',
    });

    if (response.status >= 400) {
      throw response.body as TournamentDto;
    }

    return response.body as TournamentDto[];
  },
});

type TournamentCreateTournamentParams = { data: TournamentCreateDto };

export const tournamentCreateTournamentFx = createEffect<
  TournamentCreateTournamentParams,
  TournamentDto,
  ApiValidationErrorResponse
>({
  async handler({ data }) {
    const response = await requestFx({
      path: '/tournaments',
      method: 'post',
      body: data,
    });

    if (response.status >= 400) {
      throw response.body as ApiValidationErrorResponse;
    }

    return response.body as TournamentDto;
  },
});
