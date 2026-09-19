import { test } from 'node:test';
import assert from 'node:assert/strict';
import { explain, wordType, stripTildes, endsVowelNS } from '#lib/tilde.js';

test('tipos de palabra', () => {
  assert.equal(wordType('camión'), 'aguda');
  assert.equal(wordType('examen'), 'llana');
  assert.equal(wordType('exámenes'), 'esdrújula');
  assert.equal(wordType('rápidamente'), 'sobresdrújula');
  assert.equal(wordType('virrey'), 'aguda');
  assert.equal(wordType('bíceps'), 'llana');
  assert.equal(wordType('tictacs'), 'aguda');
});

test('terminaciones que cuentan', () => {
  assert.equal(endsVowelNS('examen'), true);
  assert.equal(endsVowelNS('crisis'), true);
  assert.equal(endsVowelNS('bíceps'), false);
  assert.equal(endsVowelNS('virrey'), false);
  assert.equal(endsVowelNS('árbol'), false);
});

// Every correctly written word must agree with the rule that explains it.
const WORDS = ['camión', 'examen', 'exámenes', 'árbol', 'canción', 'país', 'raíz', 'día', 'María', 'búho', 'prohíbe', 'oír',
  'también', 'después', 'línea', 'héroe', 'rápidamente', 'fácilmente', 'solamente', 'bíceps', 'fórum', 'virrey', 'tictacs',
  'guion', 'huir', 'fue', 'dio', 'vio', 'sol', 'pan', 'él', 'tú', 'más', 'qué', 'jesuita', 'huida', 'ciudad', 'ruido', 'feliz',
  'lápiz', 'azúcar', 'carácter', 'caracteres', 'régimen', 'regímenes', 'joven', 'jóvenes', 'crisis', 'análisis', 'cortés',
  'atlas', 'ahí', 'aún', 'mío', 'río', 'baúl', 'reúne', 'actúa', 'continúo', 'continuo', 'averiguáis', 'estudiáis', 'buey'];

for (const w of WORDS) {
  test(`regla coherente: ${w}`, () => {
    const e = explain(w);
    assert.equal(e.consistent, true, `${w}: ${e.syllables.join('-')} ${e.type} regla ${e.rule} needs=${e.needs}`);
  });
}

test('strip', () => { assert.equal(stripTildes('canción está aquí'), 'cancion esta aqui'); });
