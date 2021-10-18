export const coerceDateToJSONString = (date: Date) => date.toJSON();
export const coerceToJsonNull = () => String(null);

/* eslint-disable */
export const expressable = /[\u0022\u005c\u0000-\u001F\ud800-\udfff]/u;
