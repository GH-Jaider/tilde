// Written-accent rules (Ortografía 2010, chapter II): where the stress falls, what kind of word it is,
// and whether the tilde is required. Works from the correctly spelt word, so the answer key is the word itself.
import { syllabify, isAccented, isVowel } from './silabas.js';

const STRONG = 'aeoáéó';
const WEAK = 'iuü';

// Monosyllables that carry the diacritical tilde, with the word they are told apart from.
export const DIACRITICOS = {
  'él': 'el', 'tú': 'tu', 'mí': 'mi', 'sí': 'si', 'dé': 'de', 'sé': 'se', 'té': 'te', 'más': 'mas', 'aún': 'aun',
  // interrogatives and exclamatives, of any length
  'qué': 'que', 'cuál': 'cual', 'cuáles': 'cuales', 'quién': 'quien', 'quiénes': 'quienes', 'cómo': 'como', 'dónde': 'donde', 'adónde': 'adonde',
  'cuándo': 'cuando', 'cuánto': 'cuanto', 'cuánta': 'cuanta', 'cuántos': 'cuantos', 'cuántas': 'cuantas', 'cuán': 'cuan',
};

// Spellings the 2010 Ortografía retired (or never accepted) that still show up in older texts and subtitle corpora.
export const PRE_2010 = new Set(['sólo', 'éste', 'ésta', 'ésto', 'éstos', 'éstas', 'ése', 'ésa', 'éso', 'ésos', 'ésas', 'aquél', 'aquélla', 'aquéllo', 'aquéllos', 'aquéllas',
  'guión', 'truhán', 'crié', 'crió', 'criáis', 'fié', 'fió', 'lié', 'lió', 'rió', 'riáis', 'huí', 'hui', 'dí', 'vé', 'fé', 'tí', 'dió', 'vió', 'fué']);

export const stripTildes = (s) => s.replace(/[áéíóú]/g, (c) => 'aeiou'['áéíóú'.indexOf(c)]);
export const hasTilde = (s) => /[áéíóú]/.test(s);

// Does the word end in a vowel, -n or -s (the ending that makes llanas unmarked and agudas marked)?
export function endsVowelNS(word) {
  const w = word.toLowerCase();
  const last = w[w.length - 1], prev = w[w.length - 2] || '';
  if (last === 'y') return false; // -y counts as a consonant for this rule (virrey, convoy)
  if (isVowel(last)) return true;
  if (last === 'n') return true;
  if (last === 's') return isVowel(prev) || prev === 'n'; // bíceps, tictacs: -s after another consonant does not count
  return false;
}

// Index (from the end, 1 = last) of the stressed syllable in a correctly written word.
export function stressIndex(word) {
  const syl = syllabify(word);
  if (syl.length === 1) return 1;
  const withTilde = syl.findIndex((s) => [...s].some(isAccented));
  if (withTilde >= 0) return syl.length - withTilde;
  return endsVowelNS(word) ? 2 : 1;
}

export const TYPES = ['aguda', 'llana', 'esdrújula', 'sobresdrújula'];
export function wordType(word) {
  const i = stressIndex(word);
  return i === 1 ? 'aguda' : i === 2 ? 'llana' : i === 3 ? 'esdrújula' : 'sobresdrújula';
}

// Is the accented vowel a weak vowel (i, u) next to a strong one (possibly across an h)? That is a "tilde hiática".
export function hiatusTilde(word) {
  const w = word.toLowerCase();
  for (let i = 0; i < w.length; i++) {
    if (!'íú'.includes(w[i])) continue;
    const l = w[i - 1] === 'h' ? w[i - 2] : w[i - 1];
    const r = w[i + 1] === 'h' ? w[i + 2] : w[i + 1];
    if ((l && STRONG.includes(l)) || (r && STRONG.includes(r))) return true;
  }
  return false;
}

// Explains the word: syllables, stressed syllable, type and the rule that decides the tilde.
export function explain(word) {
  const syl = syllabify(word);
  const n = syl.length;
  const idx = stressIndex(word);
  const type = wordType(word);
  const tilde = hasTilde(word);
  const lower = word.toLowerCase();
  let rule, needs;
  if (hiatusTilde(word)) { rule = 'hiato'; needs = true; }
  else if (DIACRITICOS[lower]) { rule = 'diacrítica'; needs = true; }
  else if (n === 1) { rule = 'monosílabo'; needs = false; }
  else if (type === 'aguda') { rule = 'aguda'; needs = endsVowelNS(word); }
  else if (type === 'llana') { rule = 'llana'; needs = !endsVowelNS(word); }
  else { rule = type; needs = true; }
  return { word, syllables: syl, stress: n - idx, type, rule, needs, consistent: needs === tilde };
}

export const RULES = {
  aguda: 'Aguda: lleva tilde si termina en vocal, -n o -s.',
  llana: 'Llana: lleva tilde si no termina en vocal, -n o -s.',
  esdrújula: 'Esdrújula: siempre lleva tilde.',
  sobresdrújula: 'Sobresdrújula: siempre lleva tilde.',
  hiato: 'Hiato: la vocal cerrada tónica (i, u) junto a una abierta lleva tilde, sin importar las reglas generales.',
  monosílabo: 'Monosílabo: no lleva tilde.',
  diacrítica: 'Tilde diacrítica: distingue dos palabras que se escriben igual.',
};
