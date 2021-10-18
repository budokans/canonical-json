import { coerceToJsonNull } from 'src';

export const isNumber = (data: any) =>
  typeof data === 'number' || typeof data === 'bigint';

export const handleNumber = (num: number) => {
  return Number.isInteger(num) || typeof num === 'bigint'
    ? num
    : coerceToJsonNull();
};
