import dayjs from 'dayjs';
import { createEvent, createStore, sample } from 'effector';
import { createForm } from 'effector-forms';

import { createEventFx } from '@drag/entities/event';
import { rules } from '@drag/shared/lib/validation';
import { notificationOpened } from '@drag/shared/ui';

export const newEventForm = createForm({
  fields: {
    name: {
      init: '',
      rules: [rules.required(), rules.maxLength(50)],
    },
    eventDate: {
      init: dayjs(new Date()).add(5, 'day').toISOString(),
      rules: [rules.required(), rules.date(), rules.minDate(new Date())],
    },
    description: {
      init: '',
      rules: [rules.maxLength(150)],
    },
    shouldStartRegistration: {
      init: true,
    },
  },
  validateOn: ['submit'],
});

sample({
  clock: newEventForm.submit,
  source: newEventForm.$values,
  fn: (data) => ({ data }),
  target: createEventFx,
});

export const $isDialogOpen = createStore(false);

export const dialogOpened = createEvent();
export const dialogClosed = createEvent();

$isDialogOpen.on(dialogOpened, () => true).on(dialogClosed, () => false);

sample({
  clock: createEventFx.done,
  target: [
    dialogClosed,
    notificationOpened.prepend(() => ({ type: 'success', text: 'Событие успешно создано' })),
  ],
});

sample({
  clock: dialogClosed,
  target: newEventForm.reset,
});
