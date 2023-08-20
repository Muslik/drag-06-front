import { createEvent, sample, attach } from 'effector';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import { setSession } from '@drag/entities/session';
import { internalApi } from '@drag/shared/api';

export const loginGoogleDone = createEvent<GoogleLoginResponse | GoogleLoginResponseOffline>();

const isGoogleLoginReponse = (
  response: GoogleLoginResponse | GoogleLoginResponseOffline,
): response is GoogleLoginResponse => {
  return !response.code;
};

const loginGoogleFx = attach({ effect: internalApi.authLoginGoogleFx });

sample({
  source: loginGoogleDone,
  fn: (response) => {
    if (isGoogleLoginReponse(response)) {
      return { data: { token: response.accessToken } };
    }

    return { data: { token: response.code } };
  },
  target: loginGoogleFx,
});

sample({
  clock: loginGoogleFx.doneData,
  target: setSession,
});
