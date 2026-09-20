// Downloads the plain text of every reading page the curriculum links to (Wikilengua and FundéuRAE),
// into data/raw/fuentes/, so the cards can be checked line by line against their sources.
// Usage: node scripts/fuentes.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36 tilde-source-check';
const cur = JSON.parse(readFileSync('curricula/ortografia.json', 'utf8'));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync('data/raw/fuentes', { recursive: true });

const unesc = (s) => s.replace(/&nbsp;/g, ' ').replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(n)).replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&laquo;/g, '«').replace(/&raquo;/g, '»');
function text(html) {
  let s = html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<!--[\s\S]*?-->/g, '');
  const main = s.match(/<div id="mw-content-text"[\s\S]*?<div id="catlinks"|<div class="art-content[\s\S]*?class="post-ratings/);
  s = main ? main[0] : s;
  s = s.replace(/<span class="mw-editsection">[\s\S]*?<\/span>/g, '');
  s = s.replace(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi, (_, h, t) => `\n\n## ${t}\n`);
  s = s.replace(/<li[^>]*>/gi, '\n• ').replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>|<\/div>|<\/tr>|<\/li>/gi, '\n').replace(/<td[^>]*>|<th[^>]*>/gi, ' | ').replace(/<[^>]+>/g, '');
  s = unesc(s).split('\n').map((l) => l.replace(/\s+/g, ' ').trim()).filter((l, i, a) => l || (a[i - 1] && a[i - 1] !== '')).join('\n');
  return s.replace(/\n{3,}/g, '\n\n').trim();
}

const seen = new Set();
for (const u of cur.units) for (const ex of u.exercises) for (const r of ex.read) {
  const url = (cur.sources[r.site] || '') + (r.site === 'fundeu' ? r.page + '/' : r.page);
  if (seen.has(url) || r.site === 'dpd') continue;
  seen.add(url);
  const file = `data/raw/fuentes/${r.site}-${r.page.replace(/[^\p{L}\d_-]+/gu, '_')}.txt`;
  try {
    const res = await fetch(url, { headers: { 'user-agent': UA } });
    const t = text(await res.text());
    writeFileSync(file, `# ${r.title}\n# ${url}\n\n${t}\n`);
    console.log(res.status, String(t.split(/\s+/).length).padStart(5), 'words', file);
  } catch (e) { console.log('fail', url, e.message); }
  await sleep(700);
}
