import { createQuery } from '@farfetched/core';
import { createEvent, sample } from 'effector';

import { internalApi } from '@drag/shared/api';
import { TelegramUser } from '@drag/shared/ui';

export const signInTelegramQuery = createQuery({
  effect: internalApi.authSignInTelegramFx,
});

export const telegramLoggedIn = createEvent<TelegramUser>();

sample({
  clock: telegramLoggedIn,
  fn: (telegramUser) => ({
    data: {
      userId: telegramUser.id,
      username: telegramUser.username,
      firstName: telegramUser.first_name,
      lastName: '',
    },
  }),
  target: signInTelegramQuery.start,
});
