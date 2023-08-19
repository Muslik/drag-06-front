import GoogleIcon from '@mui/icons-material/Google';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useUnit } from 'effector-react';
import { useState } from 'react';
import { GoogleLogin } from 'react-google-login';

import { loginGoogleDone } from '@drag/features/auth/loginGoogle/model';
import { env } from '@drag/shared/config';

export const LoginGoogleButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = useUnit(loginGoogleDone);

  const handleToggleLoading = () => setIsLoading((is) => !is);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <GoogleLogin
      clientId={env.GOOGLE_CLIENT_ID}
      render={({ onClick, disabled }) => (
        <Button color="inherit" onClick={onClick} disabled={disabled} startIcon={<GoogleIcon />}>
          Войти
        </Button>
      )}
      onSuccess={handleLogin}
      onFailure={handleToggleLoading}
      onRequest={handleToggleLoading}
      cookiePolicy="single_host_origin"
    />
  );
};
