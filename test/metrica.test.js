import { test } from 'node:test';
import assert from 'node:assert/strict';
import { scan, fits } from '#lib/metrica.js';

const within = (line, n) => { const s = scan(line); assert.ok(n >= s.min && n <= s.max, `${line}: ${n} not in [${s.min}, ${s.max}]`); };

test('endecasílabos clásicos', () => {
  within('En tanto que de rosa y azucena', 11); // Garcilaso
  within('se muestra la color en vuestro gesto', 11);
  within('Cerrar podrá mis ojos la postrera', 11); // Quevedo
  within('sombra que me llevare el blanco día', 11);
});

test('octosílabos', () => {
  within('Que por mayo era por mayo', 8); // Romance del prisionero
  within('cuando hace la calor', 8); // aguda ending adds one
});

test('ajuste por palabra final', () => {
  assert.equal(scan('la postrera').ending.type, 'llana');
  assert.equal(scan('la calor').ending.adjust, 1);
  assert.equal(scan('la lámpara').ending.adjust, -1);
});

test('haiku 5-7-5', () => {
  const r = fits('Un viejo estanque\nse zambulle una rana\nruido del agua', [5, 7, 5]);
  assert.equal(r.ok, true, JSON.stringify(r.lines));
  const bad = fits('Un viejo estanque\nse zambulle una rana en el agua\nruido', [5, 7, 5]);
  assert.equal(bad.ok, false);
});
