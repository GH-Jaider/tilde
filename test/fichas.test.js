import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { FICHAS, RULE_TOPIC } from '#lib/fichas.js';
import { RULES } from '#lib/tilde.js';

const cur = JSON.parse(readFileSync('curricula/ortografia.json', 'utf8'));
const ids = cur.units.flatMap((u) => u.exercises.map((e) => e.id));

test('every topic on the path has a card', () => {
  for (const id of ids) {
    const f = FICHAS[id];
    assert.ok(f, `no card for ${id}`);
    assert.ok(f.blurb.length > 40, `${id}: blurb too short`);
    assert.ok(f.points.length >= 2, `${id}: fewer than two points`);
    for (const [b, t] of f.points) { assert.ok(b && t, `${id}: empty point`); }
    assert.ok(f.watch, `${id}: no watch line`);
  }
});

test('no card without a topic', () => {
  for (const id of Object.keys(FICHAS)) assert.ok(ids.includes(id), `card ${id} has no topic`);
});

test('every tilde rule maps to a card', () => {
  for (const rule of Object.keys(RULES)) assert.ok(FICHAS[RULE_TOPIC[rule]], `rule ${rule} has no card`);
});
