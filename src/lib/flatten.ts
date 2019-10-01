import { JSONArray, JSONDictionary, JSONPrimitive } from '../type/JSON';
import { delimiter } from './config';
import {
  isArray,
  isEmpty,
  isEmptyArray,
  isEmptyObject,
  isObject
} from './util';

export function flatten(target: object): JSONDictionary {
  const output: { [index: string]: JSONPrimitive } = {};

  function step(
    object: any,
    prev?: string,
    currentDelimiter = delimiter.object
  ) {
    Object.keys(object).forEach(key => {
      const next: string = prev ? prev + currentDelimiter + key : key;
      const value = object[key];
      if (isArray(value) && !isEmptyArray(value)) {
        return step(value as JSONArray, next, delimiter.array);
      } else if (isObject(value) && !isEmptyObject(value)) {
        return step(value as JSONDictionary, next);
      }

      if (!isEmpty(value)) {
        output[next] = value as JSONPrimitive;
      }

      return undefined;
    });
  }

  step(target);

  return output;
}
