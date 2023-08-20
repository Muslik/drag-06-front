import GoogleIcon from '@mui/icons-material/Google';
import { IconButton, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useUnit } from 'effector-react';
import { useState } from 'react';
import { GoogleLogin } from 'react-google-login';

import { $isSessionPending } from '@drag/entities/session';
import { loginGoogleDone } from '@drag/features/auth/loginGoogle/model';
import { env } from '@drag/shared/config';

export const LoginGoogleButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const isSessionLoading = useUnit($isSessionPending);

  const handleLogin = useUnit(loginGoogleDone);

  const handleToggleLoading = () => setIsLoading((is) => !is);

  if (isLoading || isSessionLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          width: '50px',
          height: '50px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress size="30px" />
      </Box>
    );
  }

  return (
    <GoogleLogin
      clientId={env.GOOGLE_CLIENT_ID}
      render={({ onClick, disabled }) => (
        <IconButton
          sx={{ width: '50px', height: '50px' }}
          color="inherit"
          onClick={onClick}
          disabled={disabled}
        >
          <GoogleIcon />
        </IconButton>
      )}
      onSuccess={handleLogin}
      onFailure={handleToggleLoading}
      onRequest={handleToggleLoading}
      cookiePolicy="single_host_origin"
    />
  );
};
