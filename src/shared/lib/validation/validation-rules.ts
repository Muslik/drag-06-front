import dayjs from 'dayjs';
import { Rule } from 'effector-forms';

export const rules = {
  required: () => ({
    name: 'required',
    validator: (value) => Boolean(value.trim()),
    errorText: 'Поле обязательно для заполнения',
  }),
  maxLength: (max: number) => ({
    name: 'maxLength',
    validator: (value) => value.trim().length <= max,
    errorText: `Поле не может содержать больше чем ${max} символов`,
  }),
  date: () => ({
    name: 'date',
    validator: (value) => dayjs(new Date(value)).isValid(),
    errorText: 'Невалидная дата',
  }),
  minDate: (date: Date) => ({
    name: 'minDate',
    validator: (value) => dayjs(new Date(value)).isAfter(date),
    errorText: `Дата должна быть больше чем ${dayjs(date).format('DD-MM-YYYY, HH:mm')}`,
  }),
  maxDate: (date: Date) => ({
    name: 'maxDate',
    validator: (value) => dayjs(new Date(value)).isBefore(date),
    errorText: `Дата должна быть меньше чем ${dayjs(date).format('DD-MM-YYYY, HH:mm')}`,
  }),
} satisfies Record<string, (...args: any[]) => Rule<string>>;
