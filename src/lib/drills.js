// Exercise generators and checkers. Pure and seeded: the same day and seed give the same items.
// Every answer key comes from the data (the dictionary word, the original sentence), never from us.
import { seeded } from './logic.js';
import { syllabify } from './silabas.js';
import { explain, stripTildes, hasTilde, RULES } from './tilde.js';

const VOWELS = 'aeiouáéíóúü';

function shuffle(arr, rnd) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

// Weighted pick without replacement.
function pickWeighted(pool, weight, count, rnd) {
  const items = pool.map((x) => ({ x, w: Math.max(0.01, weight(x)) }));
  const out = [];
  while (out.length < count && items.length) {
    const total = items.reduce((a, it) => a + it.w, 0);
    let r = rnd() * total, i = 0;
    for (; i < items.length - 1; i++) { r -= items[i].w; if (r <= 0) break; }
    out.push(items[i].x);
    items.splice(i, 1);
  }
  return out;
}

// ---------- tildes: put the accent where it goes, or say it takes none ----------

export function tildesItems(bank, { rules, count = 10, seed = '', memory = {}, today = '' } = {}) {
  const rnd = seeded(`tildes|${seed}|${today}`);
  const ruleIds = new Set(rules.map((r) => bank.rules.indexOf(r)));
  const pool = bank.words.filter(([w, r, a]) => ruleIds.has(r) && !a && w.length >= 3);
  const withT = pool.filter(([w]) => hasTilde(w));
  const without = pool.filter(([w]) => !hasTilde(w));
  // words that went wrong before come back sooner; words that went right come back later
  const weight = ([w]) => { const m = memory[w]; if (!m) return 1; return 1 + 3 * (m.fail || 0) - 0.4 * Math.min(2, m.ok || 0); };
  const nT = without.length ? Math.round(count * 0.65) : count;
  const chosen = [...pickWeighted(withT, weight, nT, rnd), ...pickWeighted(without, weight, count - Math.min(nT, withT.length), rnd)];
  return shuffle(chosen, rnd).slice(0, count).map(([w]) => tildeItem(w));
}

export function tildeItem(w) {
  const bare = stripTildes(w);
  const vowels = [...bare].map((c, i) => (VOWELS.includes(c) ? i : -1)).filter((i) => i >= 0);
  const answer = [...w].findIndex((c) => 'áéíóú'.includes(c));
  const e = explain(w);
  return { kind: 'tildes', w, bare, vowels, answer, rule: e.rule, syllables: e.syllables, type: e.type };
}

// given: a vowel index in `bare`, or -1 for "no tilde"
export function checkTilde(item, given) {
  const ok = given === item.answer;
  return { ok, given, answer: item.answer, shown: item.w, why: whyTilde(item) };
}

export function whyTilde(item) {
  const syl = item.syllables.join(' · ');
  const base = RULES[item.rule] || '';
  if (item.rule === 'monosílabo') return `${syl}. Monosílabo: no lleva tilde.`;
  if (item.rule === 'diacrítica') return `${syl}. Tilde diacrítica: la distingue de otra palabra que se escribe igual.`;
  if (item.rule === 'hiato') return `${syl}. Hiato: la vocal cerrada tónica junto a la abierta lleva tilde siempre.`;
  const ends = item.rule === 'aguda' ? (hasTilde(item.w) ? 'termina en vocal, -n o -s: lleva tilde' : 'no termina en vocal, -n o -s: no lleva') : item.rule === 'llana' ? (hasTilde(item.w) ? 'no termina en vocal, -n o -s: lleva tilde' : 'termina en vocal, -n o -s: no lleva') : 'siempre lleva tilde';
  return `${syl}. ${item.type.charAt(0).toUpperCase() + item.type.slice(1)} que ${ends}.`.replace('Esdrújula que siempre', 'Esdrújula: siempre').replace('Sobresdrújula que siempre', 'Sobresdrújula: siempre') || base;
}

// ---------- sílabas: how many? ----------

export function silabasItems(bank, { count = 10, seed = '', today = '' } = {}) {
  const rnd = seeded(`silabas|${seed}|${today}`);
  const pool = bank.words.filter(([w, r, a]) => w.length >= 4 && !a);
  const chosen = shuffle(pool, rnd).slice(0, count * 3).map(([w]) => ({ w, syl: syllabify(w) })).filter((x) => x.syl.length >= 2 && x.syl.length <= 5).slice(0, count);
  return chosen.map((x) => ({ kind: 'silabas', w: x.w, syllables: x.syl, answer: x.syl.length }));
}

export function checkSilabas(item, given) {
  return { ok: given === item.answer, given, answer: item.answer, shown: item.syllables.join(' · '), why: `${item.syllables.join(' · ')}: ${item.answer} sílabas.` };
}

// ---------- pares: which one goes here? ----------

export function paresItems(pares, { pairs, count = 8, seed = '', today = '' } = {}) {
  const rnd = seeded(`pares|${seed}|${today}`);
  const pool = pairs.flatMap((pair) => (pares[pair] || []).map((x) => ({ ...x, pair, options: pair.split('/') })));
  return shuffle(pool, rnd).slice(0, count).map((x) => ({ kind: 'pares', pair: x.pair, options: x.options, s: x.s, i: x.i, m: x.m, answer: x.a, url: x.url,
    before: x.s.slice(0, x.i), after: x.s.slice(x.i + x.m.length) }));
}

export function checkPares(item, given) {
  const ok = given.toLowerCase() === item.answer.toLowerCase();
  return { ok, given, answer: item.answer, shown: item.m, why: `En el texto original va «${item.m}».` };
}

// ---------- letras: which letter is missing? ----------

const SETS = { s: 'scz', c: 'scz', z: 'scz', b: 'bv', v: 'bv', g: 'gj', j: 'gj' };

export function letrasItems(bank, { letters, count = 15, seed = '', today = '' } = {}) {
  const rnd = seeded(`letras|${seed}|${today}`);
  const opts = letters.filter((l) => l !== '');
  const items = [];
  const pool = shuffle(bank.words.filter(([w, r, a, h]) => !h && w.length >= 4), rnd);
  for (const [w] of pool) {
    if (items.length >= count) break;
    const it = letraItem(w, letters);
    if (it) items.push(it);
  }
  return items;
}

export function letraItem(w, letters) {
  const lower = w.toLowerCase();
  if (letters.includes('ll') || letters.includes('y')) {
    const i = lower.indexOf('ll');
    const j = [...lower].findIndex((c, k) => c === 'y' && VOWELS.includes(lower[k + 1] || ''));
    if (i >= 0) return blank(w, i, 2, ['ll', 'y'], 'll');
    if (j >= 0) return blank(w, j, 1, ['ll', 'y'], 'y');
    return null;
  }
  if (letters.includes('h')) {
    const i = [...lower].findIndex((c, k) => c === 'h' && (k === 0 || VOWELS.includes(lower[k - 1])));
    if (i >= 0) return blank(w, i, 1, ['h', ''], 'h');
    if (VOWELS.includes(lower[0])) return blank(w, 0, 0, ['h', ''], '');
    return null;
  }
  for (let i = 0; i < lower.length; i++) {
    const c = lower[i], nx = lower[i + 1] || '';
    if (!letters.includes(c)) continue;
    // only where the sound is the same for a seseante speaker: c and g before e/i, s and z anywhere, b/v anywhere
    if ((c === 'c' || c === 'g' || c === 'j') && !'eéií'.includes(nx)) continue;
    if (c === 'z' && 'eéií'.includes(nx)) continue;
    const set = c === 'j' ? ['g', 'j'] : c === 'g' ? ['g', 'j'] : c === 's' || c === 'z' || c === 'c' ? ['s', 'c', 'z'] : ['b', 'v'];
    const options = c === 'c' || c === 's' && 'eéií'.includes(nx) ? ['s', 'c'] : c === 's' || c === 'z' ? ['s', 'z'] : set;
    return blank(w, i, 1, options, c);
  }
  return null;
}

function blank(w, i, len, options, answer) {
  return { kind: 'letras', w, i, len, options, answer, before: w.slice(0, i), after: w.slice(i + len) };
}

export function checkLetra(item, given) {
  return { ok: given === item.answer, given, answer: item.answer, shown: item.w, why: `Se escribe «${item.w}».` };
}

// ---------- restaurar: put the punctuation (or the capitals) back ----------

const OPEN = '¿¡«(—';
const CLOSE = ',.;:…?!»)"';

// Tokenises a paragraph into words with the marks that open before and close after each one.
export function tokenize(text) {
  const words = [];
  const re = /(\S+)/g;
  let m;
  while ((m = re.exec(text))) {
    let w = m[1], pre = '', post = '';
    while (w.length > 1 && (OPEN.includes(w[0]) || w[0] === '"')) { pre += w[0]; w = w.slice(1); }
    while (w.length > 1 && CLOSE.includes(w[w.length - 1])) { post = w[w.length - 1] + post; w = w.slice(0, -1); }
    words.push({ w, pre, post });
  }
  // a mark standing on its own (« — ») belongs to the word after it when it opens, before it when it closes
  const out = [];
  for (let k = 0; k < words.length; k++) {
    const t = words[k];
    if (/\p{L}|\d/u.test(t.w)) { out.push(t); continue; }
    const marks = t.pre + t.w + t.post;
    if ([...marks].every((c) => OPEN.includes(c)) && words[k + 1]) words[k + 1].pre = marks + words[k + 1].pre;
    else if (out.length) out[out.length - 1].post += marks;
  }
  return out;
}

// An item hides the target signs (or lowercases the capitals for 'A') and remembers where they were.
export function restaurarItem(t, signs) {
  const caps = signs.includes('A');
  const targets = new Set(signs.filter((s) => s !== 'A'));
  const words = tokenize(t.t).map((tok, k, arr) => {
    const prev = arr[k - 1];
    const startsSentence = k === 0 || /[.!?…]$/.test(prev.post) || /[¿¡]/.test(tok.pre);
    const keepPre = [...tok.pre].filter((c) => !targets.has(c)).join('');
    const keepPost = [...tok.post].filter((c) => !targets.has(c)).join('');
    const hidPre = [...tok.pre].filter((c) => targets.has(c)).join('');
    const hidPost = [...tok.post].filter((c) => targets.has(c)).join('');
    const isCap = /^[A-ZÁÉÍÓÚÑ]/.test(tok.w);
    const shown = caps ? (isCap && !startsSentence ? tok.w.charAt(0).toLowerCase() + tok.w.slice(1) : tok.w) : tok.w;
    return { w: tok.w, shown, keepPre, keepPost, hidPre, hidPost, cap: caps && isCap && !startsSentence ? 1 : 0, start: startsSentence };
  });
  const options = caps ? ['A'] : [...targets].filter((c) => CLOSE.includes(c));
  const opens = caps ? [] : [...targets].filter((c) => OPEN.includes(c));
  const total = words.reduce((a, x) => a + (caps ? x.cap : (x.hidPre ? 1 : 0) + (x.hidPost ? 1 : 0)), 0);
  return { kind: 'restaurar', signs, caps, text: t.t, url: t.url, title: t.title, words, options, opens, total };
}

export function restaurarItems(textos, { signs, count = 1, seed = '', today = '' } = {}) {
  const rnd = seeded(`restaurar|${seed}|${today}`);
  const caps = signs.includes('A');
  const min = signs.includes(',') ? 3 : 2;
  const need = (t) => caps ? t.caps >= 2 : signs.reduce((a, s) => a + (t.c[s] || 0), 0) >= min;
  const out = [], spare = [];
  for (const t of shuffle(textos.filter(need), rnd)) {
    if (out.length >= count) break;
    const item = restaurarItem(t, signs);
    if (item.total >= min) out.push(item); else if (item.total >= 1) spare.push(item);
  }
  // rare signs (the raya, mostly) may not reach the minimum in any paragraph: one is better than none
  while (out.length < count && spare.length) out.push(spare.shift());
  return out;
}

// given: { post: { [wordIndex]: sign }, pre: { [wordIndex]: sign }, cap: { [wordIndex]: 1 } }
export function checkRestaurar(item, given) {
  let hit = 0, miss = 0, extra = 0;
  const marks = [];
  item.words.forEach((x, k) => {
    if (item.caps) {
      const g = !!given.cap?.[k];
      if (x.cap && g) hit++; else if (x.cap && !g) { miss++; marks.push({ k, want: 'A' }); } else if (!x.cap && g) { extra++; marks.push({ k, extra: 'A' }); }
      return;
    }
    const gp = given.post?.[k] || '', gpre = given.pre?.[k] || '';
    if (x.hidPost) { if (gp === x.hidPost) hit++; else { miss++; marks.push({ k, want: x.hidPost, got: gp }); } } else if (gp) { extra++; marks.push({ k, extra: gp }); }
    if (x.hidPre) { if (gpre === x.hidPre) hit++; else { miss++; marks.push({ k, wantPre: x.hidPre, gotPre: gpre }); } } else if (gpre) { extra++; marks.push({ k, extraPre: gpre }); }
  });
  const total = item.total || 1;
  const score = Math.max(0, Math.round(100 * (hit - extra * 0.5) / total));
  return { ok: miss === 0 && extra === 0, hit, miss, extra, total, score, marks, why: miss || extra ? `${hit} de ${total} en su sitio${extra ? `, ${extra} de más` : ''}.` : 'Todo en su sitio.' };
}

// ---------- block generation ----------

export async function generateBlock(block, ex, { seed = '', today = '', memory = {} } = {}) {
  if (block.kind === 'write') return [];
  if (block.drill === 'leer') return [{ kind: 'leer', read: ex.read }];
  const bank = block.drill === 'tildes' || block.drill === 'silabas' || block.drill === 'letras' ? (await import('../content/words.json')).default : null;
  switch (block.drill) {
    case 'tildes': return tildesItems(bank, { rules: block.rules || ex.rules, count: block.items, seed: seed + (block.kind === 'warmup' ? '|w' : '|l'), memory, today });
    case 'silabas': return silabasItems(bank, { count: block.items, seed, today });
    case 'letras': return letrasItems(bank, { letters: ex.letters, count: block.items, seed, today });
    case 'pares': { const pares = (await import('../content/pares.json')).default; return paresItems(pares, { pairs: ex.pairs, count: block.items, seed, today }); }
    case 'restaurar': { const textos = (await import('../content/textos.json')).default; return restaurarItems(textos, { signs: ex.signs, count: block.items, seed, today }); }
    default: return [];
  }
}

export function check(item, given) {
  switch (item.kind) {
    case 'tildes': return checkTilde(item, given);
    case 'silabas': return checkSilabas(item, given);
    case 'pares': return checkPares(item, given);
    case 'letras': return checkLetra(item, given);
    case 'restaurar': return checkRestaurar(item, given);
    case 'leer': return { ok: true, given, why: '' };
    default: return { ok: false, given, why: '' };
  }
}
