import test from 'ava';
import { isArray, isEmpty, isEmptyArray, isEmptyObject, isObject } from './util';

test('is array an Array', t => {
  t.is(isArray(['a', 'b']), true);
  t.is(isArray('a'), false);
  t.is(isArray(0), false);
  t.is(isArray({a: 0}), false);
});
test('is empty object empty', t => {
  t.is(isEmpty({a: 0}), false);
  t.is(isEmpty(undefined), true);
  t.is(isEmpty(null), true);
  t.is(isEmpty(0), false);
});
test('is array empty', t => {
  t.is(isEmptyArray([]), true);
  t.is(isEmptyArray(''), false);
  t.is(isEmptyArray(1), false);
});
test('is object empty', t => {
  t.is(isEmptyObject({}), true);
  t.is(isEmptyObject({a: 'b'}), false);
  t.is(isEmptyObject([]), false);
  t.is(isEmptyObject(['a']), false);
});
test('is object an Object', t => {
  t.is(isObject({a: 'b'}), true);
  t.is(isObject({}), true);
  t.is(isObject(['a']), false);
  t.is(isObject(0), false);
  t.is(isObject(undefined), false);
});
