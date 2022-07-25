import { absNumber } from './common.util';

describe('test absNumber', () => {
  test('should return positive number if input is positive', () => {
    expect(absNumber(1)).toBe(1);
  });
  test('should return positive number if input is negative', () => {
    expect(absNumber(-1)).toBe(1);
  });
});
