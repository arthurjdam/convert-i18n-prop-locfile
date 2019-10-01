import { JSONDictionary, JSONPrimitive } from '../type/JSON';
import { delimiter } from './config';
import { isArray, isObject } from './util';

const renameKey = (
  { [oldProp]: old, ...others },
  oldProp: string,
  newProp: string
) => ({
  [newProp]: old,
  ...others
});

export function unflatten(target: JSONDictionary) {
  const result: JSONPrimitive = {};

  Object.keys(target).forEach(key => {
    target = renameKey(target, key, key.replace(/\$/g, '.'));
  });

  if (!isObject(target)) {
    return target;
  }

  const getKey = (key: string) => {
    const parsedKey = Number(key);
    return isNaN(parsedKey) || key.indexOf('.') !== -1 ? key : parsedKey;
  };

  Object.keys(target)
    .sort((a, b) => a.length - b.length)
    .forEach(key => {
      const split = key.split(delimiter.object);
      let key1 = getKey(split.shift() as string);
      let key2 = getKey(split[0]);
      let recipient: any = result;

      while (key2 !== undefined) {
        if (!(isObject(recipient[key1]) || isArray(recipient[key1]))) {
          recipient[key1] = typeof key2 === 'number' ? [] : {};
        }

        recipient = recipient[key1];

        if (split.length > 0) {
          key1 = getKey(split.shift() as string);
          key2 = getKey(split[0]);
        }
      }
      recipient[key1] = target[key];
    });

  return result;
}
