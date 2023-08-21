import { attach, createStore, sample } from 'effector';

import { internalApi } from '@drag/shared/api';

export const getEventsFx = attach({ effect: internalApi.eventsGetEventsFx });

export const $events = createStore<internalApi.EventEntity[]>([]);

$events.on(getEventsFx.doneData, (_, data) => data);

export const createEventFx = attach({ effect: internalApi.eventsCreateEventFx });

sample({
  clock: createEventFx.doneData,
  target: getEventsFx.prepend(() => ({})),
});
