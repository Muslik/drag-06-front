import { createQuery } from '@farfetched/core';
import { TokenResponse } from '@react-oauth/google';
import { createEvent, sample } from 'effector';

import { internalApi } from '@drag/shared/api';

export const loginGoogleDone = createEvent<TokenResponse>();

export const signInGoogleQuery = createQuery({
  effect: internalApi.authSignInGoogleFx,
});

sample({
  clock: loginGoogleDone,
  fn: (response) => {
    return { data: { token: response.access_token } };
  },
  target: signInGoogleQuery.start,
});
