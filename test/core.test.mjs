import test from 'node:test';
import assert from 'node:assert/strict';
import {parseGroups, planCopies, packingList} from '../core.mjs';

test('community example conserves copies and page units while reducing origin dispatch', () => {
  const plan = planCopies(parseGroups('Library | 12\nSchool | 18\nClub | 6'), 4);
  assert.equal(plan.readers, 36); assert.equal(plan.masters, 3);
  assert.equal(plan.localCopies, 33); assert.equal(plan.totalPages, 144);
  assert.equal(plan.masterPages, 12); assert.equal(plan.localPages, 132);
  assert.equal(plan.directPages, plan.masterPages + plan.localPages);
  assert.ok(Math.abs(plan.reduction - 91.6666666667) < 1e-8);
  assert.deepEqual(plan.rows.map(r => r.localCopies), [11, 17, 5]);
});
test('one reader per group needs no local printing and no dispatch reduction', () => {
  const plan = planCopies(parseGroups('A | 1\nB | 1'), 5);
  assert.equal(plan.localCopies, 0); assert.equal(plan.reduction, 0);
  assert.equal(plan.totalPages, 10);
});
test('one large group retains exactly one master', () => {
  const plan = planCopies(parseGroups('Library | 10000'), 1000);
  assert.equal(plan.masters, 1); assert.equal(plan.localCopies, 9999);
  assert.equal(plan.totalPages, 10000000);
});
test('repeated group labels remain distinct delivery points', () => {
  const plan = planCopies(parseGroups('Library | 2\nLibrary | 3'), 1);
  assert.equal(plan.masters, 2); assert.equal(plan.readers, 5);
  assert.deepEqual(plan.rows.map(r => r.id), [1, 2]);
});
test('CRLF and surrounding whitespace are accepted without changing labels', () => {
  assert.deepEqual(parseGroups('  पुस्तकालय | 2\r\n Club | 3  '), [{label:'पुस्तकालय',readers:2},{label:'Club',readers:3}]);
});
test('malformed rows and invalid reader counts show a line-specific error', () => {
  for (const text of ['A, 2', '| 2', 'A | 0', 'A | -1', 'A | 1.5', 'A | 1e3', 'A | Infinity', 'A | 10001', 'A | 2 | extra']) assert.throws(() => parseGroups(text), /Line 1/);
  assert.throws(() => parseGroups('A | 1\n\nB | 2'), /Line 2/);
  assert.throws(() => parseGroups(''), /at least/);
});
test('positive whole page counts and group bounds are enforced', () => {
  const groups = parseGroups('A | 2');
  for (const pages of [0, -1, 1.5, 1001, NaN, Infinity, '4']) assert.throws(() => planCopies(groups, pages));
  assert.throws(() => planCopies([], 1));
  assert.throws(() => planCopies([{label:'A',readers:0}], 1));
  assert.throws(() => planCopies([{label:'A\nB',readers:2}], 1));
  assert.throws(() => parseGroups(Array(51).fill('A | 1').join('\n')), /50/);
  assert.equal(planCopies(parseGroups(Array(50).fill('A | 10000').join('\n')), 1000).totalPages, 500000000);
});
test('download checklist includes master, local, and conserved total counts', () => {
  const text = packingList(planCopies(parseGroups('Club | 3'), 2));
  assert.match(text, /Club: send 1 master; print 2 locally \(4 page units\)/);
  assert.match(text, /Total: 3 copies, 6 page units in either model/);
  assert.match(text, /not a cost or paper-saving estimate/);
});
