export const isNumber = (data: any) => typeof data === 'number';

export const handleNumber = (num: number) => {
  return Number.isInteger(num) && num <= Number.MAX_SAFE_INTEGER
    ? num.toFixed()
    : null;
};
