import { notifications } from '@mantine/notifications';
import { attach, createEvent, createStore, sample } from 'effector';

import { appStarted } from './config/init';
import { delay } from 'patronum';

export const NOTIFICATIONS_LIMIT = 3;
export const NOTIFICATIONS_TIMEOUT = 2000;

export const $notificationApi = createStore<typeof notifications | null>(null);

const $currentNotifications = createStore<string[]>([]);

const notificationAdded = createEvent<string>();

$currentNotifications.on(notificationAdded, (state, id) => state.concat(id));

const hideNotificationFx = attach({
  source: $notificationApi,
  effect: (api, id: string) => {
    if (!api) {
      throw new Error('Notification API is not ready');
    }

    return api.hide(id);
  },
});

$currentNotifications.on(hideNotificationFx.doneData, (state, id) =>
  state.filter((current) => current !== id),
);

export const showNotificationFx = attach({
  source: [$notificationApi, $currentNotifications],
  effect: ([api, currentNotifications], params: Parameters<typeof notifications.show>[0]) => {
    if (!api) {
      throw new Error('Notification API is not ready');
    }

    if (currentNotifications.length >= NOTIFICATIONS_LIMIT) {
      hideNotificationFx(currentNotifications[0]);
    }

    return api.show({
      radius: 'md',
      withBorder: true,
      withCloseButton: false,
      ...params,
    });
  },
});

$currentNotifications.on(showNotificationFx.doneData, (state, id) => state.concat(id));

const notificationDelayClosed = delay({
  source: showNotificationFx.doneData,
  timeout: NOTIFICATIONS_TIMEOUT,
});

$currentNotifications.on(notificationDelayClosed, (state) => state.slice(1))

sample({
  clock: appStarted,
  fn: () => notifications,
  target: $notificationApi,
});
