import { encode } from './encode';
import { coerceToString } from './string';

export const reOrderMembers = (obj: any) => {
  return Object.entries(obj).sort((a, b) => {
    const getCodePoints = (char: string) =>
      char.length > 1
        ? char.charCodeAt(0) + char.charCodeAt(1)
        : char.charCodeAt(0);

    const keyAAsString = a[0].toString();
    const keyBAsString = b[0].toString();

    const charsKeyA = [...keyAAsString].map(getCodePoints);
    const charsKeyB = [...keyBAsString].map(getCodePoints);

    let result = 0;

    charsKeyA.some((codePointA, idx) => {
      const codePointB = charsKeyB[idx];
      if (!codePointB) {
        result = 1;
        return true;
      }
      if (charsKeyA !== charsKeyB) {
        result = codePointA - codePointB;
        return true;
      }
      return false;
    });

    return result;
  });
};

export const constructOrderedObj = (orderedEntries: any[]) => {
  const orderedObj: any = {};
  orderedEntries.forEach((entry) => (orderedObj[entry[0]] = entry[1]));
  return orderedObj;
};

export const encodeObj = (obj: any): any => {
  const orderedMembers = reOrderMembers(obj);
  const encodedDeep = orderedMembers.map(([key, value]) => [
    coerceToString(key),
    encode(value),
  ]);

  const keyValsJoined = encodedDeep.map((entry) => entry.join(':'));
  return `{${keyValsJoined.join(',')}}`;
};
