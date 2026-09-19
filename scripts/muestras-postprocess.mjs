// Second pass over content/muestras.json: strips Wikisource page furniture, restores first-line titles,
// and adds three passages that need extracting from longer pages (Machado's cantar XXIX, Calderón's
// décimas, Sor Juana's redondillas). Run after scripts/wikisource.mjs. Usage: node scripts/muestras-postprocess.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { clean } from './wsclean.mjs';

const UA = 'tilde-content-collector/0.1 (personal project by GH-Jaider on GitHub; runs once)';
const API = 'https://es.wikisource.org/w/api.php';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const OUT = 'content/muestras.json';

const JUNK = /metadatos|Descargar como|p\.m\.a\.|otras versiones|títulos similares|^citas$|^\[editar\]$|^Nota: |^i: i$|^de \p{Lu}[\p{L} .]+$|→$|^← |^(français|english|italiano|deutsch|português)|^Ilustraci|^multimedia|artículo enciclopédico|^Categoría|^FÁBULA [IVXL]+\.$|^Cancionero gen\.|fol\. \d+:$/u;
// Pages whose title is the poem's first verse, which the header filter would otherwise remove.
const FIRST_LINE = new Set(['En tanto que de rosa y azucena']);

export function tidy(text, page) {
  let lines = text.split('\n').map((l) => l.replace(/\s+$/, ''));
  // header: everything up to the last furniture line among the first 14
  let last = -1;
  lines.slice(0, 14).forEach((l, i) => { const s = l.trim(); if (s && (JUNK.test(s) || s === page.split('/').pop())) last = i; });
  lines = lines.slice(last + 1);
  lines = lines.filter((l) => !JUNK.test(l.trim()));
  while (lines.length && (!lines[lines.length - 1].trim() || /^(Obtenido de|Esta página|Categorías?|Notas?$|Referencias$)/.test(lines[lines.length - 1].trim()))) lines.pop();
  let out = lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
  // a repeated title as the first line (SONATINA, El Burro Flautista.) is furniture too
  const title = page.split('/').pop();
  const first = out.split('\n')[0].trim().replace(/\.$/, '');
  if (first && first.toLowerCase() === title.toLowerCase() && !FIRST_LINE.has(page)) out = out.split('\n').slice(1).join('\n').trim();
  if (FIRST_LINE.has(page) && !out.toLowerCase().startsWith(title.toLowerCase())) out = title + '\n\n' + out;
  return out;
}

async function fetchPage(page) {
  for (let t = 0; t < 5; t++) {
    const r = await fetch(API + '?format=json&' + new URLSearchParams({ action: 'parse', page, prop: 'text', redirects: 1, disabletoc: 1 }), { headers: { 'user-agent': UA } });
    if (r.status === 429) { await sleep(10000 * (t + 1)); continue; }
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return clean((await r.json()).parse.text['*']);
  }
}

// Cut `text` from the line matching `from` to (and including) `n` non-empty lines, or up to the line matching `to`.
function passage(text, from, { lines: n, to } = {}) {
  const ls = text.split('\n');
  const i = ls.findIndex((l) => from.test(l));
  if (i < 0) return null;
  const out = [];
  for (let k = i; k < ls.length; k++) {
    if (to && k > i && to.test(ls[k])) break;
    out.push(ls[k]);
    if (n && out.filter((l) => l.trim()).length >= n) break;
  }
  return out.join('\n').trim();
}

const items = JSON.parse(readFileSync(OUT, 'utf8'));
for (const x of items) x.text = tidy(x.text, x.page);

const extra = [
  { form: 'copla', page: 'Proverbios y cantares (Campos de Castilla)', author: 'Antonio Machado', year: 1912, pick: (t) => passage(t, /^XXIX$/, { to: /^XXX$/ }) },
  { form: 'aforismo', page: 'Proverbios y cantares (Campos de Castilla)', author: 'Antonio Machado', year: 1912, pick: (t) => [passage(t, /^I$/, { to: /^II$/ }), passage(t, /^XLIV$/, { to: /^XLV$/ }), passage(t, /^LIII$/, { to: /^LIV$/ })].filter(Boolean).join('\n\n') },
  { form: 'decima', page: 'La vida es sueño/II', author: 'Pedro Calderón de la Barca', year: 1635, pick: (t) => [passage(t, /Sueña el [Rr]ey que es rey/, { lines: 10 }), passage(t, /^Yo sueño que estoy aquí/, { lines: 10 })].filter(Boolean).map((p) => p.replace(/^[A-ZÁÉÍÓÚ]{2,5}\.\s*/gm, '')).join('\n\n') },
  { form: 'redondilla', page: 'Redondillas', author: 'Sor Juana Inés de la Cruz', year: 1689, pick: (t) => passage(t, /^Hombres necios que acusáis/, { lines: 16 }) },
];
const cache = {};
for (const e of extra) {
  try {
    if (!cache[e.page]) { cache[e.page] = await fetchPage(e.page); await sleep(3000); }
    const text = e.pick(cache[e.page]);
    if (!text || text.length < 40) { console.log('could not extract', e.form, e.page); continue; }
    const i = items.findIndex((x) => x.form === e.form && x.page === e.page);
    const item = { form: e.form, page: e.page, author: e.author, year: e.year, country: null, excerpt: true,
      url: 'https://es.wikisource.org/wiki/' + encodeURIComponent(e.page.replace(/ /g, '_')), text, license: 'Dominio público. Transcripción de Wikisource, CC BY-SA 4.0' };
    if (i >= 0) items[i] = item; else items.push(item);
    console.log('ok', e.form, e.page, text.length, 'chars');
  } catch (err) { console.log('fail', e.form, e.page, err.message); }
}
writeFileSync(OUT, JSON.stringify(items, null, 1));
console.log('saved', items.length, 'works');
for (const x of items) console.log('-', x.form.padEnd(16), x.page.padEnd(44), String(x.text.length).padStart(5), JSON.stringify(x.text.slice(0, 60)));
