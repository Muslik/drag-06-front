import { Button } from '@mantine/core';
import { useGoogleLogin } from '@react-oauth/google';
import { IconBrandGoogle } from '@tabler/icons-react';
import { useUnit } from 'effector-react';

import { loginGoogleDone } from '@drag/features/auth/loginGoogle';

export const LoginGoogleButton = () => {
  const [handleLogin] = useUnit([loginGoogleDone]);

  const login = useGoogleLogin({
    onSuccess: handleLogin,
  });

  return (
    <Button
      color="inherit"
      onClick={() => login()}
      disabled={false}
      rightSection={<IconBrandGoogle />}
      aria-label="Войти через Google"
    />
  );
};
