import { useTheme, Container, Box, Typography } from '@mui/material';
import clsx from 'clsx';

import { Logo } from '@drag/shared/ui';

type Props = {
  className?: string;
};

const currentYear = new Date().getFullYear();

export const Footer = ({ className }: Props) => {
  const {
    palette: { mode },
  } = useTheme();

  return (
    <Box
      component="footer"
      className={clsx(className)}
      sx={{
        backgroundColor: 'background.paper',
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09));',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            flexDirection: { xs: 'column', md: 'row' },
            padding: '8px 0',
          }}
          className="flex justify-between items-center"
        >
          <Box sx={{ marginBottom: { xs: '16px', md: 0 } }}>
            <Logo isInverted={mode === 'dark'} />
          </Box>
          <Typography color="text.secondary" className="mr-auto" variant="caption">
            Copyright © {currentYear}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
