import { createEvent, createStore, sample } from 'effector';
import { delay } from 'patronum';

type NotificationType = 'error' | 'warning' | 'info' | 'success';

type NotificationState = {
  type?: NotificationType;
  text: string;
};

const NOTIFICATION_TIMEOUT = 3000;

export const $notification = createStore<NotificationState | null>(null);

export const notificationOpened = createEvent<NotificationState>();

export const notificationClosed = createEvent();

$notification
  .on(notificationOpened, (_, { type = 'info', ...rest }) => ({ type, ...rest }))
  .reset(notificationClosed);

const notificationDelayClosed = delay({
  source: notificationOpened,
  timeout: NOTIFICATION_TIMEOUT,
});

sample({
  clock: notificationDelayClosed,
  target: notificationClosed,
});
