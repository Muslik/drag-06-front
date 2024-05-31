import GoogleIcon from '@mui/icons-material/Google';
import { IconButton } from '@mui/material';
import { useGoogleLogin } from '@react-oauth/google';
import { useUnit } from 'effector-react';

import { loginGoogleDone } from '@drag/features/auth/loginGoogle';

export const LoginGoogleButton = () => {
  const [handleLogin] = useUnit([loginGoogleDone]);

  const login = useGoogleLogin({
    onSuccess: handleLogin,
  });

  return (
    <IconButton
      sx={{ width: '50px', height: '50px' }}
      color="inherit"
      onClick={() => login()}
      disabled={false}
    >
      <GoogleIcon />
    </IconButton>
  );
};
