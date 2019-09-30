import {isArray, isObject} from './util';

const renameKey = ({ [oldProp]: old, ...others }, oldProp, newProp) => ({
  [newProp]: old,
  ...others
});

export function unflatten(target, opts = { delimiter: { object: '.', array: '$' } }) {
  const { delimiter } = opts;
  const result = {};

  Object.keys(target).forEach(key => {
    target = renameKey(target, key, key.replace(/\$/g, '.'));
  });

  if (!isObject(target)) {
    return target;
  }

  const getKey = key => {
    const parsedKey = Number(key);
    return (isNaN(parsedKey) || key.indexOf('.') !== -1) ? key : parsedKey;
  };

  Object
    .keys(target)
    .sort((a, b) => a.length - b.length)
    .forEach(key => {
      const split = key.split(delimiter.object);
      let key1 = getKey(split.shift());
      let key2 = getKey(split[0]);
      let recipient = result;

      while (key2 !== undefined) {
        if (!(isObject(recipient[key1]) || isArray(recipient[key1]))) {
          recipient[key1] = (typeof key2 === 'number' ? [] : {});
        }

        recipient = recipient[key1];

        if (split.length > 0) {
          key1 = getKey(split.shift());
          key2 = getKey(split[0]);
        }
      }
      // recipient[key1] = unflatten(target[key], opts);
      recipient[key1] = target[key];
    });

  return result;
}
