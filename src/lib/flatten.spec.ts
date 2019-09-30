import test from 'ava';
import { flatten } from './flatten';

test('object-level conversion', t => {
  t.deepEqual(flatten({ a: 'b' }), { a: 'b' });
  t.deepEqual(flatten({ a: { b: 'c' } }), { 'a.b': 'c' });
  t.deepEqual(flatten({ a: { b: { c: 'd' } } }), { 'a.b.c': 'd' });
  t.deepEqual(flatten({ a: { b: { c: 'd' } }, e: 'f' }), { 'a.b.c': 'd', 'e': 'f' });
  t.deepEqual(flatten({ a: { b: { c: 'd' }, e: 'f' } }), { 'a.b.c': 'd', 'a.e': 'f' });
  t.deepEqual(flatten({ a: { b: null, e: 'f' } }), { 'a.e': 'f' });
});

test('convert arrays', t => {
  t.deepEqual(flatten({a: [ 'b', 'c']}), { 'a$0': 'b', 'a$1': 'c'});
  t.deepEqual(flatten({a: { b: [ 'c', 'd']}}), { 'a.b$0': 'c', 'a.b$1': 'd'});
  t.deepEqual(flatten({a: { b: [ 'c', 'd'], e: null}}), { 'a.b$0': 'c', 'a.b$1': 'd'});
  t.deepEqual(flatten({a: { b: [ 'c', 'd'], e: undefined}}), { 'a.b$0': 'c', 'a.b$1': 'd'});
  t.deepEqual(flatten({a: { b: [ 'c', 'd'], e: true}}), { 'a.b$0': 'c', 'a.b$1': 'd', 'a.e': true});
});

test('convert arrays with nested objects', t => {
  t.deepEqual(flatten({a: [ {b: 'c'}]}), { 'a$0.b': 'c'});
  t.deepEqual(flatten({a: [ {b: [{c: 'd'}]}]}), { 'a$0.b$0.c': 'd'});
  t.deepEqual(flatten({a: [ {b: [{c: 'd'}, {e: 'f'}]}]}), { 'a$0.b$0.c': 'd', 'a$0.b$1.e': 'f'});
});