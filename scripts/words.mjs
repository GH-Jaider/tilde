// Builds content/words.json: common Spanish words (OpenSubtitles frequency list, CC BY-SA, hermitdave/FrequencyWords)
// that the Colombian RLA-ES dictionary accepts, each explained by the tilde rules. Also reports every word
// where the rule disagrees with the spelling, which is how the syllabifier gets audited against real data.
// Usage: node scripts/words.mjs [limit=12000]
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import nspell from 'nspell';
import { explain, stripTildes, hasTilde, PRE_2010 } from '../src/lib/tilde.js';

const LIMIT = Number(process.argv[2] || 12000);
const sp = nspell(readFileSync('data/raw/es_CO/es_CO.aff'), readFileSync('data/raw/es_CO/es_CO.dic'));
const lines = readFileSync('data/raw/es_50k.txt', 'utf8').split('\n');
const out = [];
const pairs = new Set();
const V = 'aeiouáéíóú';
// Other spellings that sound the same for a seseante, yeísta speaker: casa/caza, haya/halla, tuvo/tubo, hola/ola.
function homophones(w) {
  const c = new Set();
  const add = (i, len, rep) => c.add(w.slice(0, i) + rep + w.slice(i + len));
  for (let i = 0; i < w.length; i++) {
    const ch = w[i], nx = w[i + 1] || '';
    if (ch === 's') { 'eéií'.includes(nx) ? add(i, 1, 'c') : add(i, 1, 'z'); }
    if (ch === 'c' && 'eéií'.includes(nx)) add(i, 1, 's');
    if (ch === 'z') { add(i, 1, 's'); if ('eéií'.includes(nx)) add(i, 1, 'c'); }
    if (ch === 'b') add(i, 1, 'v'); if (ch === 'v') add(i, 1, 'b');
    if (ch === 'l' && nx === 'l') add(i, 2, 'y'); if (ch === 'y' && V.includes(nx)) add(i, 1, 'll');
    if (ch === 'h' && (i === 0 || V.includes(w[i - 1]))) add(i, 1, '');
    if (ch === 'g' && 'eéií'.includes(nx)) add(i, 1, 'j'); if (ch === 'j' && 'eéií'.includes(nx)) add(i, 1, 'g');
  }
  if (V.includes(w[0])) c.add('h' + w);
  return [...c].filter((x) => x !== w && x.length > 1 && sp.correct(x));
}
const mismatches = [];
let rank = 0;
for (const line of lines) {
  const [w, f] = line.trim().split(' ');
  if (!w || !/^[a-záéíóúüñ]{2,}$/.test(w)) continue;
  if (!sp.correct(w) || PRE_2010.has(w)) continue;
  rank++;
  if (out.length >= LIMIT) break;
  const e = explain(w);
  const bare = stripTildes(w);
  const ambiguous = hasTilde(w) && sp.correct(bare); // canto/cantó, esta/está: needs a sentence, not a bare word
  if (!e.consistent) { mismatches.push(`${w} ${e.syllables.join('-')} ${e.type} ${e.rule} needs=${e.needs}`); continue; }
  const h = homophones(w);
  out.push({ w, r: e.rule, a: ambiguous ? 1 : 0, ...(h.length ? { h } : {}) });
  for (const x of h) pairs.add([w, x].sort().join('/'));
}
mkdirSync('content', { recursive: true });
writeFileSync('content/words.json', JSON.stringify(out));
const withTilde = out.filter((x) => hasTilde(x.w)).length;
console.log(`kept ${out.length} words (${withTilde} with tilde, ${out.filter((x) => x.a).length} ambiguous when stripped)`);
console.log(`by rule:`, Object.entries(out.reduce((m, x) => ((m[x.r] = (m[x.r] || 0) + 1), m), {})).map(([k, v]) => `${k} ${v}`).join(', '));
writeFileSync('content/homofonos.json', JSON.stringify([...pairs].sort()));
console.log(`${pairs.size} homophone pairs → content/homofonos.json`);
console.log(`${mismatches.length} words where the rule and the spelling disagree (excluded):`);
console.log(mismatches.slice(0, 60).join('\n'));
