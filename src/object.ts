import { encode } from './encode';

// TO DO: Get this working right by converting all characters to code points and sorting by those.
export const reOrderMembers = (obj: any) =>
  Object.entries(obj).sort((a, b) =>
    encode(b[0]) < encode(a[0]) ? 1 : b[0] === a[0] ? 0 : -1
  );

export const constructOrderedObj = (orderedEntries: any[]) => {
  const orderedObj: any = {};
  orderedEntries.forEach((entry) => (orderedObj[entry[0]] = entry[1]));
  return orderedObj;
};

export const transformObject = (obj: any) => {
  const orderedMembers = reOrderMembers(obj);
  const orderedObject = constructOrderedObj(orderedMembers);
  const partial: any[] = [];

  Object.entries(orderedObject).forEach(([key, value]) => {
    partial.push([encode(key), encode(value)]);
  });

  const keyValsJoined = partial.map((entry) => entry.join(':'));
  return `{${keyValsJoined.join(',')}}`;
};
