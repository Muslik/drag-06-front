import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Paper, Select, Textarea, TextInput } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { IconCurrencyRubel } from '@tabler/icons-react';
import cx from 'clsx';
import dayjs from 'dayjs';
import { useUnit } from 'effector-react';
import { Controller, useForm } from 'react-hook-form';

import { internalApi } from '@drag/shared/api';

import { MAX_DESCRIPTION_LENGTH } from '../config';
import { creationCancelled, Form, formSchema, formSubmitted, tournamentMutation } from '../model';

const options = [
  {
    label: 'Создан',
    value: 'CREATED',
  },
  {
    label: 'Открыта регистрация',
    value: 'REGISTRATION',
  },
] satisfies { label: string; value: internalApi.TournamentDto['status'] }[];

export const CreateTournamentForm = ({ className }: { className?: string }) => {
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'REGISTRATION',
      availableRacerNumbers: '',
      fee: 0,
      startDate: dayjs().add(1, 'day').startOf('day').toDate(),
    },
  });
  const { isLoading, submitted, cancelled } = useUnit({
    isLoading: tournamentMutation.$pending,
    submitted: formSubmitted,
    cancelled: creationCancelled
  });

  return (
    <Paper
      component="form"
      withBorder={true}
      p="lg"
      radius="md"
      className={cx(className)}
      onSubmit={handleSubmit(submitted)}
    >
      <Controller
        control={control}
        name="title"
        render={({ field }) => (
          <TextInput
            disabled={isLoading}
            size="md"
            withAsterisk={true}
            label="Заголовок"
            className="mb-6"
            placeholder="Введите текст"
            error={errors.title?.message}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <Textarea
            disabled={isLoading}
            size="md"
            rows={5}
            label={`Описание (${field.value?.length ?? 0}/${MAX_DESCRIPTION_LENGTH})`}
            maxLength={MAX_DESCRIPTION_LENGTH}
            className="mb-6"
            placeholder="Введите текст"
            error={errors.description?.message}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="startDate"
        render={({ field }) => (
          <DateTimePicker
            disabled={isLoading}
            withAsterisk={true}
            size="md"
            className="mb-6"
            label="Дата начала"
            placeholder="Введите дату"
            error={errors.startDate?.message}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="availableRacerNumbers"
        render={({ field }) => (
          <TextInput
            disabled={isLoading}
            size="md"
            withAsterisk={true}
            label="Доступные номера для участия"
            className="mb-6"
            description="Укажите номера 1-99 через запятую или дефис"
            placeholder="Прим: 1,2,3-40"
            error={errors.availableRacerNumbers?.message}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="fee"
        render={({ field }) => (
          <TextInput
            disabled={isLoading}
            rightSection={<IconCurrencyRubel stroke={1} />}
            size="md"
            label="Взнос за участие"
            withAsterisk={true}
            id="fee"
            className="mb-6"
            placeholder="Сумма в ₽"
            error={errors.fee?.message}
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="status"
        render={({ field }) => (
          <Select
            disabled={isLoading}
            size="md"
            label="Статус"
            className="mb-12"
            data={options}
            error={errors.status?.message}
            {...field}
          />
        )}
      />
      <Button className="w-full mb-4" size="md" color="blue" type="submit" loading={isLoading}>
        Создать
      </Button>
      <Button
        variant="outline"
        className="w-full"
        size="md"
        color="gray"
        type="button"
        disabled={isLoading}
        onClick={cancelled}
      >
        Отменить
      </Button>
    </Paper>
  );
};
