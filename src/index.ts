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
export const isNumber = (data: any) =>
  typeof data === 'number' || typeof data === 'bigint';

export const coerceToJsonNull = () => String(null);
export const coerceToString = (val: string | number) => val.toString();
export const coerceDateToJSONString = (date: Date) => date.toJSON();

export const handleNumber = (num: number) => {
  return Number.isInteger(num) || typeof num === 'bigint'
    ? coerceToString(num)
    : coerceToJsonNull();
};

export const encode = (data: any) => {
  let canonicalJSON = '';

  canonicalJSON = shouldCoerceToNull(data)
    ? canonicalJSON.concat(coerceToJsonNull())
    : isString(data)
    ? canonicalJSON.concat(coerceToString(data))
    : isBoolean(data)
    ? canonicalJSON.concat(data)
    : isDate(data)
    ? canonicalJSON.concat(coerceDateToJSONString(data))
    : isNumber(data)
    ? canonicalJSON.concat(handleNumber(data))
    : '';

  return canonicalJSON;
};
