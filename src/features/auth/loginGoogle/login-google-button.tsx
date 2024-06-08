import { Button } from '@mantine/core';
import { useGoogleLogin } from '@react-oauth/google';
import { IconBrandGoogleFilled } from '@tabler/icons-react';
import clsx from 'clsx';
import { useUnit } from 'effector-react';

import { loginGoogleDone } from './model';

export const LoginGoogleButton = ({ className }: { className?: string }) => {
  const [handleLogin] = useUnit([loginGoogleDone]);

  const login = useGoogleLogin({
    onSuccess: handleLogin,
  });

  return (
    <Button
      className={clsx("h-10 w-[234px] text-base", className)}
      color="red"
      onClick={() => login()}
      disabled={false}
      rightSection={<IconBrandGoogleFilled />}
      aria-label="Войти через Google"
    >
      Войти через Google
    </Button>
  );
};
