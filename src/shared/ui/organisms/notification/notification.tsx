import { Alert, AlertTitle, Slide } from '@mui/material';
import { useUnit } from 'effector-react';

import { $notification, notificationClosed } from './model';

const TITLE_MAP = {
  info: 'Информация',
  success: 'Успешно',
  warning: 'Предупреждение',
  error: 'Ошибка',
} as const;

export const Notification = () => {
  const [notification, notificationClosedFn] = useUnit([$notification, notificationClosed]);

  return (
    <Slide direction="left" in={Boolean(notification)} mountOnEnter={true} unmountOnExit={true}>
      <Alert
        onClose={notificationClosedFn}
        color={notification?.type}
        sx={{ position: 'fixed', right: '32px', top: '32px', zIndex: '100', minWidth: '250px' }}
      >
        <AlertTitle>{notification?.type && TITLE_MAP[notification.type]}</AlertTitle>
        {notification?.text}
      </Alert>
    </Slide>
  );
};
