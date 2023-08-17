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
  inner: object;
};

export type JWTTokensDto = {
  accessToken: string;
  refreshToken: string;
};

export type RefreshDto = {
  refreshToken: string;
};
