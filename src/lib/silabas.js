// Spanish syllabification following the RAE rules (Ortografía 2010, chapter II on diphthongs and hiatus,
// and the general rules for consonant groups). American variant: "tl" stays together (a-tle-ta).
// Pure functions, no dependencies.

const STRONG = new Set('aeoáéó');
const WEAK = new Set('iuíúü');
const ACCENTED = new Set('áéíóú');
// Consonant pairs that start a syllable together.
const ONSETS = new Set(['pr', 'br', 'tr', 'dr', 'cr', 'kr', 'gr', 'fr', 'pl', 'bl', 'cl', 'kl', 'gl', 'fl', 'tl', 'ch', 'll', 'rr']);

export const isVowel = (c) => STRONG.has(c) || WEAK.has(c);
export const isAccented = (c) => ACCENTED.has(c);

// Splits a word into phonological units: each is a vowel (possibly with a silent/transparent h) or a consonant.
// 'qu' and 'gu'+e/i are consonants (silent u); 'gü' keeps the u; 'y' is a vowel only when not followed by a vowel.
function units(word) {
  const w = word.toLowerCase();
  const out = [];
  for (let i = 0; i < w.length; i++) {
    const c = w[i], n = w[i + 1] || '';
    if ((c === 'q' || c === 'g') && n === 'u' && 'eéií'.includes(w[i + 2] || '')) { out.push({ t: 'c', s: c + 'u' }); i++; continue; }
    if (c === 'y') { out.push(isVowel(n) ? { t: 'c', s: 'y' } : { t: 'v', s: 'y', v: 'i' }); continue; }
    if (isVowel(c)) { out.push({ t: 'v', s: c, v: c === 'ü' ? 'u' : c }); continue; }
    out.push({ t: 'c', s: c });
  }
  return out;
}

// Two adjacent vowels form a diphthong unless both are strong, or the weak one carries the accent.
export function isDiphthong(a, b) {
  const base = (c) => ({ 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'ü': 'u' }[c] || c);
  const A = base(a), B = base(b);
  const strongA = 'aeo'.includes(A), strongB = 'aeo'.includes(B);
  if (strongA && strongB) return false; // two open vowels: hiatus (le-er, ca-os)
  if (!strongA && !strongB) return A !== B; // two different closed vowels: always a diphthong (cuí-da-te, rui-do); the same one twice: hiatus (chi-i-ta)
  const weak = strongA ? b : a;
  return !isAccented(weak); // closed vowel with the tilde breaks the diphthong (pa-ís, ba-úl)
}

// Returns the syllables of a word as an array of strings (original spelling kept).
export function syllabify(word) {
  const u = units(word);
  if (!u.length) return [];
  // Group vowels into nuclei, letting a written h sit inside a diphthong (ahu-mar → a-hu-mar keeps the h with the next vowel).
  const nuclei = []; // indices into u of the units that belong to each nucleus
  const cons = []; // consonant runs between nuclei: cons[k] is before nuclei[k]
  let run = [];
  let i = 0;
  while (i < u.length) {
    if (u[i].t === 'c') { run.push(i); i++; continue; }
    // start a nucleus
    const nuc = [i];
    let j = i + 1;
    while (j < u.length) {
      let k = j, throughH = false;
      if (u[k] && u[k].t === 'c' && u[k].s === 'h' && u[k + 1] && u[k + 1].t === 'v') { throughH = true; k++; }
      if (!u[k] || u[k].t !== 'v') break;
      const prev = u[nuc[nuc.length - 1]].v, next = u[k].v;
      // triphthong: weak + strong + weak
      const canJoin = isDiphthong(prev, next) || (nuc.length === 2 && WEAK.has(u[nuc[0]].v) && STRONG.has(prev) && WEAK.has(next) && !isAccented(next));
      if (!canJoin) break;
      if (throughH) nuc.push(k - 1);
      nuc.push(k);
      j = k + 1;
    }
    cons.push(run); run = [];
    nuclei.push(nuc);
    i = j;
  }
  const tail = run;
  if (!nuclei.length) return [word]; // no vowel at all (mmm, pff): one lump
  // Distribute consonant runs between nuclei.
  const syl = nuclei.map(() => []);
  for (let k = 0; k < nuclei.length; k++) {
    const r = cons[k];
    if (k === 0) { syl[0].push(...r); continue; }
    const names = r.map((idx) => u[idx].s);
    let split; // how many consonants stay with the previous syllable
    if (names.length === 0) split = 0;
    else if (names.length === 1) split = names[0] === 'h' && false ? 0 : 0;
    else if (names.length === 2) split = ONSETS.has(names.join('')) || names[0] === 'h' ? 0 : 1;
    else if (names.length === 3) split = ONSETS.has(names.slice(1).join('')) ? 1 : 2;
    else split = ONSETS.has(names.slice(2).join('')) ? 2 : names.length - 1;
    syl[k - 1].push(...r.slice(0, split));
    syl[k].push(...r.slice(split));
  }
  syl[syl.length - 1].push(...tail);
  for (let k = 0; k < nuclei.length; k++) {
    // put nucleus units in order with their consonants
    const idxs = [...syl[k], ...nuclei[k]].sort((a, b) => a - b);
    syl[k] = idxs;
  }
  // Rebuild strings from the original word using unit positions.
  const strings = [];
  let pos = 0;
  const lens = u.map((x) => x.s.length);
  const starts = lens.map((l) => { const s = pos; pos += l; return s; });
  for (const idxs of syl) {
    const a = starts[idxs[0]], b = starts[idxs[idxs.length - 1]] + lens[idxs[idxs.length - 1]];
    strings.push(word.slice(a, b));
  }
  return strings;
}

export const syllableCount = (word) => syllabify(word).length;
