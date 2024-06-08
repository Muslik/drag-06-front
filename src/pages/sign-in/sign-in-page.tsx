import { Container, Paper, Title } from '@mantine/core';

import { LoginGoogleButton } from '@drag/features/auth/loginGoogle';
import { LoginTelegramButton } from '@drag/features/auth/loginTelegram';

export default function SignInPage() {
  return (
    <Container size="xs" w="100%">
      <Title className="mb-6">Вход</Title>
      <Paper withBorder={true} p="lg" radius="md" className="flex flex-col items-center">
        <LoginGoogleButton className="mb-4" />
        <LoginTelegramButton />
      </Paper>
    </Container>
  );
}
