// Collects FundéuRAE recommendations (CC BY-SA 3.0, see https://www.fundeu.es/aviso-legal/) into content/fundeu.json.
// The public listing is the WordPress feed for the post type, ten items a page; each item is then read once.
// Polite: one request at a time with a pause. Usage: node scripts/fundeu.mjs [feedPages=80]
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';

const PAGES = Number(process.argv[2] || 80);
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36 tilde-content-collector';
const OUT = 'content/fundeu.json';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const get = async (url) => { const r = await fetch(url, { headers: { 'user-agent': UA } }); if (!r.ok) throw new Error(r.status + ' ' + url); return r.text(); };
const unesc = (s) => s.replace(/&nbsp;/g, ' ').replace(/&#8211;/g, '–').replace(/&#8212;/g, '—').replace(/&#8230;/g, '…').replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(n)).replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&laquo;/g, '«').replace(/&raquo;/g, '»');
const strip = (h) => unesc(h.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

const items = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : [];
const have = new Set(items.map((r) => r.url));
const urls = [];
let quiet = 0;
for (let p = 1; p <= PAGES && quiet < 5; p++) {
  const xml = await get(`https://www.fundeu.es/feed/?post_type=recomendacion&paged=${p}`);
  const found = [...new Set([...xml.matchAll(/<link>(https:\/\/www\.fundeu\.es\/recomendacion\/[a-z0-9-]+\/)<\/link>/g)].map((m) => m[1]))];
  const fresh = found.filter((u) => !have.has(u) && !urls.includes(u));
  urls.push(...fresh);
  quiet = fresh.length ? 0 : quiet + 1;
  process.stdout.write(`feed page ${p}: ${found.length} recommendations, ${urls.length} to fetch\n`);
  await sleep(500);
}

for (const [i, url] of urls.entries()) {
  try {
    const html = await get(url);
    const title = strip((html.match(/<meta property="og:title" content="([^"]+)"/) || [])[1] || '').replace(/\s*\|\s*FundéuRAE$/, '');
    const date = ((html.match(/"datePublished":"([^"]+)"/) || [])[1] || '').slice(0, 10);
    const body = (html.split('class="art-content')[1] || '').split('class="post-ratings')[0];
    const paras = [...body.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map((m) => strip(m[1])).filter((t) => t.length > 30 && !/^#puestaapunto/i.test(t) && !/^Ver también/i.test(t));
    const tags = [...new Set([...html.matchAll(/fundeu\.es\/(?:categoria|tema|etiqueta|tag|tipo-de-duda)\/([a-z0-9-]+)\//g)].map((m) => m[1]))];
    if (title && paras.length) items.push({ url, title, date, tags, paras, license: 'CC BY-SA 3.0', by: 'FundéuRAE' });
    process.stdout.write(`${i + 1}/${urls.length} ${title.slice(0, 60)} (${paras.length} p)\n`);
  } catch (e) { process.stdout.write(`skip ${url}: ${e.message}\n`); }
  if (i % 10 === 9) { mkdirSync('content', { recursive: true }); writeFileSync(OUT, JSON.stringify(items, null, 1)); }
  await sleep(600);
}
mkdirSync('content', { recursive: true });
writeFileSync(OUT, JSON.stringify(items, null, 1));
console.log('saved', items.length, 'recommendations to', OUT);
