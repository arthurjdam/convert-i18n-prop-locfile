import test from 'ava';
import { unflatten } from './unflatten';

test('object-level conversion', t => {
  t.deepEqual(unflatten({ a: 'b' }), { a: 'b' });
  t.deepEqual(unflatten({ 'a.b': 'c' }), { a: { b: 'c' } });
  t.deepEqual(unflatten({ 'a.b.c': 'd' }), { a: { b: { c: 'd' } } });
  t.deepEqual(unflatten({ 'a.b.c': 'd', e: 'f' }), {
    a: { b: { c: 'd' } },
    e: 'f'
  });
  t.deepEqual(unflatten({ 'a.b.c': 'd', 'a.e': 'f' }), {
    a: { b: { c: 'd' }, e: 'f' }
  });
  t.deepEqual(unflatten({ 'a.e': 'f' }), { a: { e: 'f' } });
});

test('convert arrays', t => {
  t.deepEqual(unflatten({ a$0: 'b', a$1: 'c' }), { a: ['b', 'c'] });
  t.deepEqual(unflatten({ 'a.b$0': 'c', 'a.b$1': 'd' }), {
    a: { b: ['c', 'd'] }
  });
  t.deepEqual(unflatten({ 'a.b$0': 'c', 'a.b$1': 'd' }), {
    a: { b: ['c', 'd'] }
  });
  t.deepEqual(unflatten({ 'a.b$0': 'c', 'a.b$1': 'd', 'a.e': true }), {
    a: { b: ['c', 'd'], e: true }
  });
});

test('convert arrays with nested objects', t => {
  t.deepEqual(unflatten({ 'a$0.b': 'c' }), { a: [{ b: 'c' }] });
  t.deepEqual(unflatten({ 'a$0.b$0.c': 'd' }), { a: [{ b: [{ c: 'd' }] }] });
  t.deepEqual(unflatten({ 'a$0.b$0.c': 'd', 'a$0.b$1.e': 'f' }), {
    a: [{ b: [{ c: 'd' }, { e: 'f' }] }]
  });
});
