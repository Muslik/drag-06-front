import clsx from 'clsx';
import { useUnit } from 'effector-react';

import { env } from '@drag/shared/config';
import { TelegramLoginButton } from '@drag/shared/ui';

import { telegramLoggedIn } from './model';

export const LoginTelegramButton = ({ className }: { className?: string }) => {
  const [handleLogin] = useUnit([telegramLoggedIn]);

  return (
    <TelegramLoginButton
      className={clsx(className)}
      botName={env.TELEGRAM_BOT_NAME}
      dataOnauth={handleLogin}
      buttonSize="large"
      usePic={false}
      requestAccess={false}
      cornerRadius={4}
    />
  );
};
