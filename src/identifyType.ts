export const shouldCoerceToNull = (data: any) =>
  data === null ||
  data === undefined ||
  typeof data === 'function' ||
  typeof data === 'symbol';

export const isString = (data: any) =>
  typeof data === 'string' || data.constructor.name === 'String';

export const isBoolean = (data: any) =>
  typeof data === 'boolean' || data.constructor.name === 'Boolean';

export const isDate = (data: any) => data.constructor.name === 'Date';

export const isArray = (data: any) => Array.isArray(data);
