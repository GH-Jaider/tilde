// Turns the collected content in content/ into the compact files the app imports from src/content/.
// Usage: node scripts/build-content.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const read = (f) => JSON.parse(readFileSync('content/' + f, 'utf8'));
mkdirSync('src/content', { recursive: true });
const write = (f, data) => { const s = JSON.stringify(data); writeFileSync('src/content/' + f, s); console.log(f.padEnd(14), (s.length / 1024).toFixed(0).padStart(5), 'KB'); };

// ---------- words: [w, rule, ambiguous] ----------
const RULES = ['aguda', 'llana', 'esdrújula', 'sobresdrújula', 'hiato', 'monosílabo', 'diacrítica'];
const words = read('words.json');
write('words.json', { rules: RULES, words: words.map((x) => [x.w, RULES.indexOf(x.r), x.a ? 1 : 0, ...(x.h ? [x.h] : [])]) });

// ---------- sentences for the pairs (esta/está, porque/por qué...) from Fundéu paragraphs ----------
const cur = JSON.parse(readFileSync('curricula/ortografia.json', 'utf8'));
const pairs = [...new Set(cur.units.flatMap((u) => u.exercises.flatMap((e) => e.pairs || [])))];
const fundeu = read('fundeu.json');
let consultas = [];
try { consultas = read('consultas.json'); } catch { console.log('(no consultas.json yet)'); }
const paras = [
  ...fundeu.flatMap((r) => r.paras.map((p) => ({ p, url: r.url, title: r.title }))),
  ...consultas.flatMap((r) => [...(r.question || []), ...(r.answer || [])].map((p) => ({ p, url: r.url, title: r.title }))),
];
const sentences = [];
for (const { p, url } of paras) {
  if (/https?:\/\/|#|@/.test(p)) continue;
  for (const s of p.split(/(?<=[.!?…»])\s+(?=[A-ZÁÉÍÓÚÑ¿¡«])/)) {
    const t = s.trim();
    if (t.length >= 40 && t.length <= 220) sentences.push({ s: t, url });
  }
}
const esc = (v) => v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const pares = {};
for (const pair of pairs) {
  const variants = pair.split('/');
  const re = new RegExp(`(?<![\\p{L}])(${variants.map(esc).join('|')})(?![\\p{L}])`, 'giu');
  const byVariant = Object.fromEntries(variants.map((v) => [v, []]));
  for (const { s, url } of sentences) {
    const ms = [...s.matchAll(re)];
    if (ms.length !== 1) continue; // exactly one of the pair's words, so the blank is unambiguous
    const m = ms[0];
    const a = variants.find((v) => v.toLowerCase() === m[1].toLowerCase());
    if (!a) continue;
    byVariant[a].push({ s, i: m.index, m: m[1], a, url });
  }
  // keep a balanced, capped set per variant
  const out = [];
  for (const v of variants) out.push(...byVariant[v].slice(0, 30));
  pares[pair] = out;
  console.log('pair', pair.padEnd(28), variants.map((v) => `${v}:${byVariant[v].length}`).join(' '));
}
write('pares.json', pares);

// ---------- paragraphs for restoration, with sign counts ----------
const SIGNS = [',', '.', ';', ':', '…', '¿', '?', '¡', '!', '«', '»', '—', '(', ')', '"'];
const textos = [];
for (const { p, url, title } of paras) {
  if (/https?:\/\/|#|@|\d{2}:\d{2}/.test(p)) continue;
  if (p.length < 120 || p.length > 420) continue;
  if (/^(Ver también|Véase|Más información)/i.test(p)) continue;
  const c = {};
  for (const ch of p) if (SIGNS.includes(ch)) c[ch] = (c[ch] || 0) + 1;
  // capitals inside sentences: words starting with a capital that are not sentence-initial
  const caps = [...p.matchAll(/(?<=[^.!?¿¡«(—]\s)[A-ZÁÉÍÓÚÑ][\p{L}]+/gu)].length;
  textos.push({ t: p, c, caps, url, title });
}
write('textos.json', textos.slice(0, 600));
console.log('textos with ≥3 commas:', textos.filter((x) => (x.c[','] || 0) >= 3).length, '· with ; :', textos.filter((x) => x.c[';']).length, '· with ¿:', textos.filter((x) => x.c['¿']).length, '· with «:', textos.filter((x) => x.c['«']).length, '· with —:', textos.filter((x) => x.c['—']).length, '· with 2+ caps:', textos.filter((x) => x.caps >= 2).length);

// ---------- forms and examples ----------
const formas = read('formas.json');
const muestras = read('muestras.json');
// the definition is the first sentence or two of the article, not the whole opening
const brief = (s, max = 320) => { if (!s) return ''; const t = s.replace(/\s+/g, ' ').replace(/ ,/g, ',').replace(/ ;/g, ';').trim(); if (t.length <= max) return t; const cut = t.slice(0, max).lastIndexOf('. '); return cut > 80 ? t.slice(0, cut + 1) : t.slice(0, max).trim() + '…'; };
write('formas.json', formas.map((f) => ({ id: f.id, name: f.name, shape: f.shape, pattern: f.pattern || null, verse: f.verse || null, def: brief(f.wikipedia?.extract), url: f.wikipedia?.url || '' })));
write('muestras.json', muestras.map((m) => ({ form: m.form, title: m.page.split('/').pop(), author: m.author, year: m.year, country: m.country, excerpt: m.excerpt, url: m.url, text: m.text })));
