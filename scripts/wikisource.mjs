// Fetches public-domain examples of literary forms from es.wikisource.org (texts in the public domain;
// the transcriptions are CC BY-SA 4.0) into content/muestras.json. Reads the rendered page, so works
// transcluded from scanned pages come through. Slow and polite: Wikisource rate-limits.
// Usage: node scripts/wikisource.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { clean } from './wsclean.mjs';

const UA = 'tilde-content-collector/0.1 (personal project by GH-Jaider on GitHub; runs once)';
const API = 'https://es.wikisource.org/w/api.php';
const OUT = 'content/muestras.json';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const PROSE_CHARS = 2200; // prose works are stored as an opening excerpt plus the link

// form id → works. `page` is the exact Wikisource title; `search` finds it; `excerpt` keeps only the opening.
const WORKS = [
  { form: 'soneto', page: 'Amor constante más allá de la muerte', author: 'Francisco de Quevedo', year: 1648 },
  { form: 'soneto', page: 'En tanto que de rosa y azucena', author: 'Garcilaso de la Vega', year: 1543 },
  { form: 'soneto', page: 'Detente sombra', author: 'Sor Juana Inés de la Cruz', year: 1689 },
  { form: 'romance', page: 'Romance del prisionero', author: 'Anónimo', year: 1500 },
  { form: 'verso-libre', page: 'Nocturno (Silva)', author: 'José Asunción Silva', year: 1894, country: 'Colombia' },
  { form: 'poema-narrativo', page: 'Los maderos de San Juan', author: 'José Asunción Silva', year: 1885, country: 'Colombia' },
  { form: 'fabula', page: 'El renacuajo paseador', author: 'Rafael Pombo', year: 1867, country: 'Colombia' },
  { form: 'fabula', page: 'La pobre viejecita', author: 'Rafael Pombo', year: 1867, country: 'Colombia' },
  { form: 'fabula', page: 'Simón el bobito', author: 'Rafael Pombo', year: 1867, country: 'Colombia' },
  { form: 'fabula', page: 'El burro flautista', author: 'Tomás de Iriarte', year: 1782 },
  { form: 'fabula', page: 'La lechera', author: 'Félix María Samaniego', year: 1781 },
  { form: 'rima', search: 'Volverán las oscuras golondrinas', author: 'Gustavo Adolfo Bécquer', year: 1871 },
  { form: 'cancion', page: 'Sonatina', author: 'Rubén Darío', year: 1896 },
  { form: 'cuarteta', page: 'Versos sencillos/XXXIX', author: 'José Martí', year: 1891 },
  { form: 'copla', page: 'Proverbios y cantares (Campos de Castilla)', author: 'Antonio Machado', year: 1912, excerpt: true },
  { form: 'aforismo', page: 'Proverbios y cantares (Campos de Castilla)', author: 'Antonio Machado', year: 1912, excerpt: true },
  { form: 'carta', page: 'Carta de Jamaica', author: 'Simón Bolívar', year: 1815, excerpt: true },
  { form: 'cuento', page: 'En la diestra de Dios Padre', author: 'Tomás Carrasquilla', year: 1897, country: 'Colombia', excerpt: true },
  { form: 'decima', search: 'Cuentan de un sabio que un día', author: 'Pedro Calderón de la Barca', year: 1635 },
  { form: 'lira', page: 'Noche oscura', author: 'San Juan de la Cruz', year: 1578 },
];

async function api(params, tries = 5) {
  for (let t = 0; t < tries; t++) {
    try {
      const r = await fetch(API + '?format=json&' + new URLSearchParams(params), { headers: { 'user-agent': UA } });
      if (r.status === 429) { await sleep(10000 * (t + 1)); continue; }
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return await r.json();
    } catch (e) { if (t === tries - 1) throw e; await sleep(4000 * (t + 1)); }
  }
}

function excerpt(text) {
  if (text.length <= PROSE_CHARS) return text;
  const cut = text.lastIndexOf('\n\n', PROSE_CHARS);
  return text.slice(0, cut > 400 ? cut : PROSE_CHARS).trim();
}

const items = [];
for (const w of WORKS) {
  try {
    let page = w.page;
    if (!page) {
      const d = await api({ action: 'query', list: 'search', srsearch: '"' + w.search + '"', srlimit: 3 });
      page = d.query.search[0]?.title;
      console.log('search', w.search, '→', d.query.search.map((x) => x.title).join(' | '));
      await sleep(2500);
    }
    if (!page) { console.log('not found', w.search); continue; }
    const d = await api({ action: 'parse', page, prop: 'text', redirects: 1, disabletoc: 1 });
    const full = clean(d.parse.text['*']);
    const text = w.excerpt ? excerpt(full) : full;
    items.push({ form: w.form, page, author: w.author, year: w.year, country: w.country || null, excerpt: !!w.excerpt && text.length < full.length,
      url: 'https://es.wikisource.org/wiki/' + encodeURIComponent(page.replace(/ /g, '_')), text, license: 'Dominio público. Transcripción de Wikisource, CC BY-SA 4.0' });
    console.log('ok', page, text.length, 'chars');
  } catch (e) { console.log('fail', w.page || w.search, e.message); }
  await sleep(3000);
}
mkdirSync('content', { recursive: true });
writeFileSync(OUT, JSON.stringify(items, null, 1));
console.log('saved', items.length, 'works to', OUT);
