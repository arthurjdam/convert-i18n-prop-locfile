export const isArray = val => Array.isArray(val);
export const isEmpty = val => val === null || val === undefined;
export const isEmptyArray = val => isArray(val) && val.length === 0;
export const isEmptyObject = val =>
  isObject(val) && Object.keys(val).length === 0;
export const isObject = val =>
  Object.prototype.toString.call(val) === '[object Object]';
