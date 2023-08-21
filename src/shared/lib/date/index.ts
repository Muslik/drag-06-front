import dayjs from 'dayjs';

export function getShortMonthName(date: Date) {
  return dayjs(date).locale('ru').format('MMM').replace('.', ''); // июнь
}
