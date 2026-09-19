// Metrical syllable count for Spanish verse: syllables per word, sinalefa between words, and the
// adjustment for the last word (aguda +1, esdrújula −1). Sinalefa is a licence the poet may skip, so
// the count comes as a range: `min` with every sinalefa, `max` with none.
import { syllabify, isVowel } from './silabas.js';
import { wordType } from './tilde.js';

const WORD = /[a-záéíóúüñ]+/gi;

export function words(line) {
  return (line.match(WORD) || []);
}

const startsVowel = (w) => { const s = w.toLowerCase(); return isVowel(s[0]) || (s[0] === 'h' && isVowel(s[1] || '')) || s === 'y'; };
const endsVowel = (w) => { const s = w.toLowerCase(); return isVowel(s[s.length - 1]) || s === 'y' || s.endsWith('y'); };

// Count for one verse line.
export function scan(line) {
  const ws = words(line);
  if (!ws.length) return { min: 0, max: 0, syllables: [], sinalefas: 0, ending: null };
  const per = ws.map((w) => syllabify(w));
  let max = per.reduce((a, s) => a + s.length, 0);
  let sinalefas = 0;
  for (let i = 1; i < ws.length; i++) if (endsVowel(ws[i - 1]) && startsVowel(ws[i])) sinalefas++;
  const last = ws[ws.length - 1];
  const type = per[per.length - 1].length === 1 ? 'aguda' : wordType(last);
  const adj = type === 'aguda' ? 1 : type === 'llana' ? 0 : -1;
  const ending = { word: last, type, adjust: adj };
  return { min: max - sinalefas + adj, max: max + adj, syllables: per, sinalefas, ending };
}

// Checks a poem against a pattern like [5, 7, 5]. A line fits when the target sits inside its range.
export function fits(text, pattern) {
  const lines = text.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  const scans = lines.map(scan);
  const ok = lines.length === pattern.length && scans.every((s, i) => pattern[i] >= s.min && pattern[i] <= s.max);
  return { ok, lines: scans.map((s, i) => ({ text: lines[i], target: pattern[i] ?? null, min: s.min, max: s.max, fits: pattern[i] != null && pattern[i] >= s.min && pattern[i] <= s.max })) };
}
