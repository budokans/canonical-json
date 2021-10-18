import { handleNumber, isNumber } from './number';
import {
  isArray,
  isBoolean,
  isDate,
  isString,
  shouldCoerceToNull,
} from './identifyType';
import { transformArray } from './array';
import { coerceDateToJSONString, coerceToJsonNull } from './utils';

export const coerceToString = (val: string | number) => `"${val.toString()}"`;

export const encode = (data: any) => {
  return shouldCoerceToNull(data)
    ? coerceToJsonNull()
    : isString(data)
    ? coerceToString(data)
    : isBoolean(data)
    ? `${data}`
    : isDate(data)
    ? coerceDateToJSONString(data)
    : isNumber(data)
    ? `${handleNumber(data)}`
    : isArray(data)
    ? transformArray(data)
    : '';
};
