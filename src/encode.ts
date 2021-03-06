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
import { coerceToString } from './string';
import { transformObj } from './object';

const wrapWithSingleQuotes = (data: any) => ''.concat(data);

export const encode = (data: any) => {
  return shouldCoerceToNull(data)
    ? wrapWithSingleQuotes(coerceToJsonNull())
    : isString(data)
    ? wrapWithSingleQuotes(coerceToString(data))
    : isBoolean(data)
    ? wrapWithSingleQuotes(data)
    : isDate(data)
    ? coerceDateToJSONString(data)
    : isNumber(data)
    ? wrapWithSingleQuotes(handleNumber(data))
    : isArray(data)
    ? transformArray(data)
    : transformObj(data);
};

export type JSONValue =
  | string
  | number
  | null
  | boolean
  | JSONValue[]
  | { [key: string]: JSONValue };

export const decode = (json: string): JSONValue => JSON.parse(json);
