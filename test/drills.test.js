import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { tildesItems, checkTilde, silabasItems, checkSilabas, paresItems, checkPares, letrasItems, checkLetra, restaurarItem, restaurarItems, checkRestaurar, tokenize } from '#lib/drills.js';
import { hasTilde, stripTildes } from '#lib/tilde.js';

const bank = JSON.parse(readFileSync('src/content/words.json', 'utf8'));
const pares = JSON.parse(readFileSync('src/content/pares.json', 'utf8'));
const textos = JSON.parse(readFileSync('src/content/textos.json', 'utf8'));

test('tildes: items are deterministic and their keys point at the accent', () => {
  const a = tildesItems(bank, { rules: ['aguda', 'llana', 'esdrújula'], count: 10, seed: 's', today: '2026-09-19' });
  const b = tildesItems(bank, { rules: ['aguda', 'llana', 'esdrújula'], count: 10, seed: 's', today: '2026-09-19' });
  assert.deepEqual(a.map((x) => x.w), b.map((x) => x.w));
  assert.equal(a.length, 10);
  for (const it of a) {
    assert.equal(hasTilde(it.bare), false);
    if (it.answer >= 0) { assert.ok('áéíóú'.includes(it.w[it.answer])); assert.ok(it.vowels.includes(it.answer)); }
    else assert.equal(hasTilde(it.w), false);
    assert.equal(checkTilde(it, it.answer).ok, true);
    assert.equal(checkTilde(it, it.answer >= 0 ? -1 : it.vowels[0]).ok, false);
  }
  assert.ok(a.some((x) => x.answer >= 0) && a.some((x) => x.answer < 0), 'mixes words with and without tilde');
});

test('tildes: failed words come back more', () => {
  const memory = {};
  const plain = tildesItems(bank, { rules: ['aguda'], count: 5, seed: 'm', today: 'd' });
  const target = plain[0].w;
  memory[target] = { fail: 5, ok: 0 };
  let seen = 0;
  for (let i = 0; i < 20; i++) if (tildesItems(bank, { rules: ['aguda'], count: 5, seed: 'm' + i, today: 'd', memory }).some((x) => x.w === target)) seen++;
  assert.ok(seen >= 3, `expected the failed word to show up often, saw it ${seen} of 20`);
});

test('sílabas: answer equals the syllable count', () => {
  const items = silabasItems(bank, { count: 8, seed: 'x', today: 'd' });
  assert.equal(items.length, 8);
  for (const it of items) { assert.equal(it.answer, it.syllables.length); assert.equal(checkSilabas(it, it.answer).ok, true); }
});

test('pares: the blank hides exactly the original word', () => {
  const items = paresItems(pares, { pairs: ['si/sí', 'que/qué'], count: 12, seed: 'p', today: 'd' });
  assert.equal(items.length, 12);
  for (const it of items) {
    assert.equal(it.before + it.m + it.after, it.s);
    assert.equal(it.m.toLowerCase(), it.answer.toLowerCase());
    assert.ok(it.options.includes(it.answer));
    assert.equal(checkPares(it, it.answer).ok, true);
    assert.equal(checkPares(it, it.options.find((o) => o !== it.answer)).ok, false);
  }
});

test('letras: blank round-trips and never has a homophone twin', () => {
  for (const letters of [['s', 'c', 'z'], ['b', 'v'], ['ll', 'y'], ['h', ''], ['g', 'j']]) {
    const items = letrasItems(bank, { letters, count: 10, seed: 'l', today: 'd' });
    assert.ok(items.length >= 5, `few items for ${letters}`);
    for (const it of items) {
      assert.equal(it.before + it.answer + it.after, it.w);
      assert.ok(it.options.includes(it.answer));
      assert.equal(checkLetra(it, it.answer).ok, true);
      const twin = bank.words.find(([w]) => w === it.w);
      assert.ok(twin && !twin[3], `${it.w} has homophones`);
    }
  }
});

test('restaurar: hiding and restoring the signs is exact', () => {
  const t = { t: 'Aunque llueve, salimos; no había, en realidad, otra opción. ¿Vamos? Sí, «ahora».', url: '', title: '' };
  const item = restaurarItem(t, [',', ';']);
  const given = { post: {}, pre: {}, cap: {} };
  item.words.forEach((w, k) => { if (w.hidPost) given.post[k] = w.hidPost; });
  const r = checkRestaurar(item, given);
  assert.equal(r.ok, true);
  assert.equal(r.hit, item.total);
  assert.equal(item.total, 5); // four commas and a semicolon
  // a stray sign counts as extra, a missing one as a miss
  const bad = checkRestaurar(item, { post: { 0: ',', 1: ',' }, pre: {}, cap: {} });
  assert.equal(bad.ok, false);
  assert.ok(bad.extra >= 1 && bad.miss >= 2);
  // opening marks
  const q = restaurarItem(t, ['¿', '?']);
  assert.equal(q.total, 2);
  const g2 = { post: {}, pre: {}, cap: {} };
  q.words.forEach((w, k) => { if (w.hidPost) g2.post[k] = w.hidPost; if (w.hidPre) g2.pre[k] = w.hidPre; });
  assert.equal(checkRestaurar(q, g2).ok, true);
});

test('restaurar: capitals inside the sentence', () => {
  const t = { t: 'La capital de Colombia es Bogotá. Allí vive María con su perro Tobías.', url: '', title: '' };
  const item = restaurarItem(t, ['A']);
  assert.equal(item.total, 4); // Colombia, Bogotá, María, Tobías
  const given = { post: {}, pre: {}, cap: {} };
  item.words.forEach((w, k) => { if (w.cap) given.cap[k] = 1; });
  assert.equal(checkRestaurar(item, given).ok, true);
  assert.equal(item.words[0].shown, 'La');
  assert.equal(item.words.find((w) => w.w === 'Bogotá').shown, 'bogotá');
});

test('restaurar: real paragraphs carry enough signs', () => {
  for (const signs of [[','], ['.'], [';'], [':'], ['¿', '?', '¡', '!'], ['«', '»', '"'], ['—'], ['A']]) {
    const items = restaurarItems(textos, { signs, count: 2, seed: 'r', today: 'd' });
    assert.ok(items.length === 2, `no texts for ${signs.join('')}`);
    for (const it of items) assert.ok(it.total >= (signs[0] === '—' ? 1 : 2), `${signs.join('')}: only ${it.total} targets`);
  }
});

test('tokenize keeps words whole', () => {
  const toks = tokenize('«Hola», dijo. ¿Vienes?');
  assert.deepEqual(toks.map((x) => x.w), ['Hola', 'dijo', 'Vienes']);
  assert.equal(toks[0].pre, '«'); assert.equal(toks[0].post, '»,'); assert.equal(toks[2].pre, '¿'); assert.equal(toks[2].post, '?');
});
