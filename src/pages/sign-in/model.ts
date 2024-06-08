import { sample } from 'effector';

import { loginGoogleModel } from '@drag/features/auth/loginGoogle';
import { loginTelegramModel } from '@drag/features/auth/loginTelegram';
import { showNotificationFx } from '@drag/shared/notification';
import { routes } from '@drag/shared/routing';
import { chainAnonymous, sessionRequestQuery } from '@drag/shared/session';

export const currentRoute = routes.signIn;
export const anonymousRoute = chainAnonymous(currentRoute, {
  otherwise: routes.home.navigate,
});

sample({
  clock: [
    loginTelegramModel.signInTelegramQuery.finished.success,
    loginGoogleModel.signInGoogleQuery.finished.success,
  ],
  target: sessionRequestQuery.start,
});

sample({
  clock: [
    loginTelegramModel.signInTelegramQuery.finished.failure,
    loginGoogleModel.signInGoogleQuery.finished.failure,
  ],
  target: showNotificationFx.prepend(() => ({
    title: 'Что-то пошло не так',
    message: 'Попробуйте еще раз',
    color: 'red',
  })),
});
