import {
  isArray,
  isEmpty,
  isEmptyArray,
  isEmptyObject,
  isObject
} from './util';

export function flatten(
  target,
  opts = { delimiter: { object: '.', array: '$' } }
) {
  const output = {};

  function step(object, prev?, delimiter = opts.delimiter.object) {
    Object.keys(object).forEach(key => {
      const next = prev ? prev + delimiter + key : key;
      const value = object[key];
      if (isArray(value) && !isEmptyArray(value)) {
        return step(value, next, opts.delimiter.array);
      } else if (isObject(value) && !isEmptyObject(value)) {
        return step(value, next);
      }

      if (!isEmpty(value)) {
        output[next] = value;
      }

      return undefined;
    });
  }

  step(target);

  return output;
}
