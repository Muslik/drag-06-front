export const parseRacerNumbers = (value: string) => {
  const ranges = value
    .trim()
    .split(',')
    .filter((item) => item !== '');
  const result = [];
  for (const range of ranges) {
    if (!range.includes('-')) {
      result.push(Number(range));
    } else {
      const rangeArr = range.split('-').map(Number);
      const start = rangeArr[0] > rangeArr[1] ? rangeArr[1] : rangeArr[0];
      const end = rangeArr[1] > rangeArr[0] ? rangeArr[1] : rangeArr[0];
      if (Number.isNaN(start) || Number.isNaN(end) || !start || !end) {
        return null;
      }
      if (start > end) {
        return null;
      }
      for (let i = start; i <= end; i++) {
        result.push(i);
      }
    }
  }

  return [...new Set(result)];
};
