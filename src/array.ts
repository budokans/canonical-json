import { encode } from './encode';

export const transformArray = (arr: any[]) => {
  const partial: any[] = [];

  arr.map((val) => {
    partial.push(encode(val));
  });

  return `[${partial.join(',')}]`;
};
