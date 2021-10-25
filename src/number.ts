export const isNumber = (data: any) => typeof data === 'number';

export const isUnsafeNum = (num: number) =>
  num < Number.MIN_SAFE_INTEGER || num > Number.MAX_SAFE_INTEGER;

export const formatNonInt = (num: number) =>
  num.toExponential().toUpperCase().replace('+', '');

export const handleNumber = (num: number) => {
  return isUnsafeNum(num) || Number.isNaN(num)
    ? null
    : Number.isInteger(num)
    ? num.toFixed()
    : formatNonInt(num);
};
