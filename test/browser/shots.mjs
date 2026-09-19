// Screenshots the design explorations in headless Chrome, light and dark. Usage: node test/browser/shots.mjs [outDir]
import { launch } from './cdp.mjs';
import { resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const OUT = process.argv[2] || join(tmpdir(), 'tilde-shots');
const files = ['index', 'a-cartel', 'b-pagina', 'c-corrector'];
const b = await launch({ width: 1280, height: 900, outDir: OUT, device: 'mac', scale: 1 });
for (const f of files) {
  await b.goto('file://' + resolve('docs/explorations', f + '.html'));
  await b.eval('document.fonts.ready.then(() => new Promise(r => setTimeout(r, 400)))');
  for (const scheme of ['light', 'dark']) {
    await b.colorScheme(scheme);
    await b.eval('new Promise(r => setTimeout(r, 200))');
    console.log(await b.shot(`${f}-${scheme}`, { full: true }));
  }
}
const bad = b.logs.filter((l) => /exception|error/i.test(l) && !/favicon/.test(l));
if (bad.length) { console.log('console:', bad.join('\n')); }
await b.close();
