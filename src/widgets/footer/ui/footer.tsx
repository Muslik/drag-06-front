import { Container, Box, Text } from '@mantine/core';
import clsx from 'clsx';
import { useUnit } from 'effector-react';

import { routes } from '@drag/shared/routing';

type Props = {
  className?: string;
};

const currentYear = new Date().getFullYear();

export const Footer = ({ className }: Props) => {
  const [isHomePage] = useUnit([routes.home.$isOpened]);
  if (isHomePage) {
    return null;
  }

  return (
    <Box
      component="footer"
      className={clsx(className)}
    >
      <Container>
        <Box className="flex justify-between items-center">
          <Box>{/* <Logo isInverted={mode === 'dark'} /> */}</Box>
          <Text c="gray" className="mr-auto" variant="caption">
            Copyright © {currentYear}
          </Text>
        </Box>
      </Container>
    </Box>
  );
};
