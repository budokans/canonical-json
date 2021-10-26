import * as R from 'ramda';
import { encode, JSONValue } from './encode';
import { coerceToString } from './string';

export const reOrderMembers = (obj: any) => {
  return Object.entries(obj).sort((a, b) => {
    const keyAAsString = a[0].toString();
    const keyBAsString = b[0].toString();

    const getCodePoints = (char: string) =>
      char.length > 1
        ? char.charCodeAt(0) + char.charCodeAt(1)
        : char.charCodeAt(0);

    const charCodesKeyA = [...keyAAsString].map(getCodePoints);
    const charCodesKeyB = [...keyBAsString].map(getCodePoints);

    let result = 0;

    charCodesKeyA.some((codePointA, idx) => {
      const codePointB = charCodesKeyB[idx];
      if (!codePointB) {
        result = 1;
        return true;
      }
      if (codePointA !== codePointB) {
        result = codePointA - codePointB;
        return true;
      }
      return false;
    });

    return result;
  });
};

type ObjectEntry = [key: string, val: unknown];
type JSONEncodedObjectEntry = [key: string, val: JSONValue];

export const constructOrderedObj = (orderedEntries: ObjectEntry[]) => {
  const orderedObj: any = {};
  orderedEntries.forEach((entry) => (orderedObj[entry[0]] = entry[1]));
  return orderedObj;
};

const encodeDeep = (entries: ObjectEntry[]): JSONEncodedObjectEntry[] => {
  return entries.map(([key, value]) => [coerceToString(key), encode(value)]);
};

const joinKeyAndVal = (entry: JSONEncodedObjectEntry) => entry.join(':');

const joinAllKeysAndVals = (members: JSONEncodedObjectEntry[]) =>
  members.map(joinKeyAndVal);

const joinAllMembers = (members: string[]) => members.join(',');

const wrapInCurlyBrackets = (dataString: string) => `{${dataString}}`;

export const transformObj = R.pipe(
  reOrderMembers,
  encodeDeep,
  joinAllKeysAndVals,
  joinAllMembers,
  wrapInCurlyBrackets
);
