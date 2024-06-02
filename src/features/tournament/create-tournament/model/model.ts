import { createMutation } from '@farfetched/core';
import { createEvent, sample } from 'effector';
import * as z from 'zod';

import { internalApi } from '@drag/shared/api';
import { showNotificationFx } from '@drag/shared/notification';

import { MAX_DESCRIPTION_LENGTH } from '../config';
import { parseRacerNumbers } from '../lib/parse-racer-numbers';

export const tournamentMutation = createMutation({
  effect: internalApi.tournamentCreateTournamentFx,
});

export const formSchema = z.object({
  title: z.string().min(1, 'Поле обязательно для заполнения'),
  description: z
    .string()
    .min(0)
    .max(MAX_DESCRIPTION_LENGTH, `Максимальная длина описания ${MAX_DESCRIPTION_LENGTH} символов`),
  startDate: z.preprocess(
    (val) => (val instanceof Date ? new Date(val) : null),
    z.date({ message: 'Поле обязательно для заполнения' }).refine((val) => val > new Date(), {
      message: 'Дата должна быть в будущем',
    }),
  ),
  fee: z.preprocess(
    (val) => Number(val),
    z
      .number({ message: 'Необходимо ввести корректную сумму или 0 если участие бесплатное' })
      .min(0, { message: 'Сумма должна быть позитивной' }),
  ),
  availableRacerNumbers: z.string().superRefine((val, ctx) => {
    const parsed = parseRacerNumbers(val);

    const { error } = z
      .array(
        z
          .number({ message: "Неверный формат. Пример: '1-3,7-10,5'"})
          .min(1, 'Номера не могут содержать меньше 1')
          .max(99, 'Номера не могут быть больше 99'),
        {
          message: "Неверный формат. Пример: '1-3,7-10,5'",
        },
      )
      .nonempty('Поле обязательно для заполнения')
      .safeParse(parsed);

    if (error) {
      ctx.addIssue({
        code: "custom",
        message: error.errors[0].message,
      });
    }
  }),
});

export type Form = {
  title: string;
  description: string;
  startDate: Date;
  fee: number;
  availableRacerNumbers: string;
  status: internalApi.TournamentCreateDto['status'];
};

export const formSubmitted = createEvent<Form>();
export const formReset = createEvent();

export const creationCancelled = createEvent();

sample({
  clock: formSubmitted,
  filter: tournamentMutation.$idle,
  fn: ({
    title,
    description,
    fee,
    status,
    startDate,
    availableRacerNumbers,
  }): internalApi.TournamentCreateTournamentParams => {
    return {
      data: {
        title,
        description,
        availableRacerNumbers: parseRacerNumbers(availableRacerNumbers) ?? [],
        startDate: startDate.toString(),
        fee,
        status,
      },
    };
  },
  target: tournamentMutation.start,
});

sample({
  clock: tournamentMutation.finished.success,
  target: showNotificationFx.prepend(() => ({
    message: 'Турнир успешно создан',
    color: 'green',
  })),
});

sample({
  clock: tournamentMutation.finished.failure,
  target: showNotificationFx.prepend(() => ({
    title: 'Ошибка при создании турнира',
    message: 'Попробуйте позже',
    color: 'red',
  })),
});
