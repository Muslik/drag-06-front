import { TokenResponse } from '@react-oauth/google';
import { createEvent, sample, attach } from 'effector';

import { setSession } from '@drag/entities/session';
import { internalApi } from '@drag/shared/api';

export const loginGoogleDone = createEvent<TokenResponse>();

const loginGoogleFx = attach({ effect: internalApi.authSignInFx });

sample({
  clock: loginGoogleDone,
  fn: (response) => {
    return { data: { token: response.access_token, provider: 'google' as const } };
  },
  target: loginGoogleFx,
});

sample({
  clock: loginGoogleFx.doneData,
  target: setSession,
});
