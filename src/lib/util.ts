export const isArray = (val: any): val is any[] => Array.isArray(val);
export const isEmpty = (val: any): boolean => val === null || val === undefined;
export const isEmptyArray = (val: any): boolean =>
  isArray(val) && val.length === 0;
export const isEmptyObject = (val: any): boolean =>
  isObject(val) && Object.keys(val).length === 0;
export const isObject = (val: any): val is {} =>
  Object.prototype.toString.call(val) === '[object Object]';
