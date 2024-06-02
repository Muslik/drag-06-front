import { expect, test, describe } from 'vitest';

import { parseRacerNumbers } from './parse-racer-numbers';

describe('parse racer numbers', () => {
  test('should parse racer numbers', () => {
    const racerNumbers = '1,2,3,4,5,6,7,8,9,10';
    const parsedRacerNumbers = parseRacerNumbers(racerNumbers);
    expect(parsedRacerNumbers).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  test('Correctly parse racer numbers with ranges', () => {
    const racerNumbers = '1-3,7-10,5';
    const parsedRacerNumbers = parseRacerNumbers(racerNumbers);
    expect(parsedRacerNumbers).toEqual([1, 2, 3, 7, 8, 9, 10, 5]);
  });

  test('Correctly parse trailing comma', () => {
    const racerNumbers = '1-3,7-10,5,';
    const parsedRacerNumbers = parseRacerNumbers(racerNumbers);
    expect(parsedRacerNumbers).toEqual([1, 2, 3, 7, 8, 9, 10, 5]);
  });

  test('Correctly parse with missing range end', () => {
    const racerNumbers = '1-3,7-,5-';
    const parsedRacerNumbers = parseRacerNumbers(racerNumbers);
    expect(parsedRacerNumbers).toEqual(null);
  });

  test('Return null with missing range start', () => {
    const racerNumbers = '1-3,7-,-5';
    const parsedRacerNumbers = parseRacerNumbers(racerNumbers);
    expect(parsedRacerNumbers).toBe(null);
  });

  test('Correctly parse with spaces', () => {
    const racerNumbers = '1-3, 7-10, 5';
    expect(parseRacerNumbers(racerNumbers)).toEqual([1, 2, 3, 7, 8, 9, 10, 5]);
  });

  test('Correctly parse if range is decreasing', () => {
    const racerNumbers = '1-3,15-10,5';
    expect(parseRacerNumbers(racerNumbers)).toEqual([1, 2, 3, 10, 11, 12, 13, 14, 15, 5]);
  });
});
