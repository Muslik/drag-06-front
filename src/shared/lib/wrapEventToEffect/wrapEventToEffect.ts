import { EventCallable, createEffect } from 'effector';

export function wrapEventToFx<T>(event: EventCallable<T>) {
  return createEffect({ handler: async (params: T) => {
    return event(params);
  } });
}
