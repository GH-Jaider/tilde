// End-to-end walk through Tilde in headless Chrome on a fresh profile (so a fresh database). Needs `pnpm dev` on 5174,
// or set TILDE_URL. Drives every drill by reading the answer key from the running session in localStorage.
import { launch } from './cdp.mjs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const BASE = process.env.TILDE_URL || 'http://127.0.0.1:5174/';
const OUT = process.env.TILDE_SHOTS || join(tmpdir(), 'tilde-shots');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let step = 0;
const ok = (msg) => console.log(`ok ${++step}. ${msg}`);
const fail = (msg) => { console.log(`FAIL ${msg}`); process.exitCode = 1; };

const b = await launch({ width: 390, height: 844, outDir: OUT, device: 'iphone' });
await b.colorScheme('light');
const body = async () => (await b.eval('document.body.innerText')).toLowerCase();
const has = async (t) => (await body()).includes(t.toLowerCase());
const expect = async (t, msg) => { if (await has(t)) ok(msg || `sees "${t}"`); else fail(`expected "${t}" (${msg || ''})`); };
const clickText = async (text, sel = 'button, a') => {
  const found = await b.eval(`(() => { const els = [...document.querySelectorAll(${JSON.stringify(sel)})]; const e = els.find(x => x.innerText.trim().toLowerCase().startsWith(${JSON.stringify(text.toLowerCase())})); if (!e) return false; e.click(); return true; })()`);
  if (!found) fail(`no control "${text}"`);
  await sleep(300);
  return found;
};
const runState = () => b.eval(`JSON.parse(localStorage.getItem('tilde.run') || 'null')`);
const waitBody = async (t, timeout = 6000) => { const t0 = Date.now(); while (Date.now() - t0 < timeout) { if (await has(t)) return true; await sleep(100); } return false; };

// Answers the current item correctly, using the key kept in the run.
async function answerCurrent() {
  const r = await runState();
  if (!r) return false;
  const item = r.items[r.i]?.[r.j];
  if (!item) return false;
  if (item.kind === 'silabas') await clickText(String(item.answer), '.opt');
  else if (item.kind === 'tildes') {
    if (item.answer < 0) await clickText('No lleva', '.opt');
    else { const done = await b.eval(`(() => { const btns = [...document.querySelectorAll('.word .v')]; const idx = ${JSON.stringify(item.vowels)}.indexOf(${item.answer}); if (idx < 0 || !btns[idx]) return false; btns[idx].click(); return true; })()`); if (!done) fail('vowel button missing'); }
  } else if (item.kind === 'pares') await clickText(item.answer, '.opt');
  else if (item.kind === 'letras') await clickText(item.answer === '' ? 'nada' : item.answer, '.opt');
  else if (item.kind === 'leer') await clickText('Ya lo leí');
  else if (item.kind === 'restaurar') {
    for (const [k, w] of item.words.entries()) {
      if (item.caps) { if (w.cap) await b.eval(`document.querySelectorAll('.cap')[${k}].click()`); continue; }
      if (w.hidPost) { const n = item.options.indexOf(w.hidPost) + 1; for (let t = 0; t < n; t++) await b.eval(`document.querySelectorAll('.gap:not(.pre)')[${k}].click()`); }
      if (w.hidPre) { const n = item.opens.indexOf(w.hidPre) + 1; for (let t = 0; t < n; t++) await b.eval(`document.querySelectorAll('.gap.pre')[${k}].click()`); }
    }
    await clickText('Comprobar');
  }
  await sleep(250);
  return true;
}

// Plays a whole drill block; returns when the block's moment has passed.
async function playBlock(label) {
  for (let guard = 0; guard < 80; guard++) {
    const r = await runState();
    if (!r) break; // session finished
    const items = r.items[r.i];
    if (!items) { await sleep(200); continue; }
    if (r.j >= items.length) { await sleep(300); continue; } // the block's moment is on screen
    const before = { i: r.i, j: r.j, kind: items[r.j].kind, w: items[r.j].w || '' };
    await answerCurrent();
    const after = await runState();
    const ans = after?.answers?.[before.i]?.[before.j];
    if (!ans) fail(`no answer recorded on ${before.kind} "${before.w}"`);
    else if (!ans.ok) fail(`answered wrong on ${before.kind} "${before.w}"`);
    // correct answers move on by themselves after a beat; restaurar, leer and wrong answers wait for the button
    let pressed = false;
    for (let t = 0; t < 50; t++) {
      await sleep(100);
      const s = await runState();
      if (!s || s.i !== before.i || s.j !== before.j) break;
      if (await b.eval(`!!document.querySelector('.moment')`)) continue;
      if (t >= 12 && !pressed) {
        for (const label of ['Siguiente', 'Terminar', 'Ahora:']) { if (await b.eval(`!![...document.querySelectorAll('button')].find(x => x.innerText.trim().startsWith(${JSON.stringify(label)}))`)) { await clickText(label); pressed = true; break; } }
      }
    }
    const s2 = await runState();
    if (!s2 || s2.i !== before.i) break; // block over
  }
  await sleep(1800); // the moment
  ok(`played block: ${label}`);
}

// ---------- first visit ----------
await b.goto(BASE);
await expect('Cómo funciona', 'fresh Hoy explains itself');
await expect('Sílabas, diptongos e hiatos', 'first lesson is on the plan');
await b.shot('01-hoy-fresh');
await clickText('Empezar');
await waitBody('sílabas');
await expect('Paso 1 de', 'session opened');
await expect('Antes del ejercicio', 'the card comes first');
await expect('golpe de voz', 'card explains what a syllable is');
await b.shot('02-ficha');
await clickText('Empezar el ejercicio');
await waitBody('¿Cuántas sílabas?');
await b.shot('02-session-silabas');
await playBlock('sílabas');
// writing step
if (await waitBody('Escribir · Haiku', 4000)) {
  ok('writing step follows');
  await b.eval(`(() => { const t = document.querySelector('textarea'); t.value = 'Llueve en el patio\\nel gato mira el agua\\ny no se mueve'; t.dispatchEvent(new Event('input', { bubbles: true })); })()`);
  await sleep(300);
  await expect('de 5', 'metre counts show');
  await b.shot('03-escribir');
  await clickText('Guardar');
} else fail('no writing step');
await waitBody('Sesión hecha');
await expect('Escribiste', 'summary shows the writing');
await b.shot('04-hecho');
await clickText('Listo');
await waitBody('Hoy hasta ahora');
ok('back on Hoy with today so far');

// ---------- the other screens ----------
await b.goto(BASE + '#/camino');
await waitBody('Camino');
await expect('Lección 1', 'path lists lessons');
await clickText('Leer la ficha');
await waitBody('golpe de voz');
ok('card opens from the path');
await b.shot('05-camino-ficha');
await b.eval(`document.querySelector('.sheet .head button').click()`);
await sleep(300);
await b.goto(BASE + '#/muestras');
await waitBody('Muestras');
await expect('Soneto', 'forms listed');
await b.goto(BASE + '#/muestra/soneto');
await waitBody('Cerrar podrá mis ojos');
await expect('Quevedo', 'sample with its author');
await b.shot('06-muestra');
await b.goto(BASE + '#/diario');
await waitBody('Diario');
await expect('Llueve en el patio', 'journal keeps the writing');
await b.goto(BASE + '#/ajustes');
await waitBody('Ajustes');
await expect('LanguageTool', 'settings show the checker');

// ---------- every drill, straight from the path ----------
for (const [name, label] of [['Agudas, llanas y esdrújulas', 'tildes'], ['Monosílabos y tilde diacrítica', 'pares'], ['La coma', 'restaurar'], ['S, c y z: el seseo', 'letras'], ['Cuándo va mayúscula inicial', 'mayúsculas']]) {
  await b.goto(BASE + '#/camino');
  await waitBody('Camino');
  const opened = await b.eval(`(() => { const rows = [...document.querySelectorAll('.unit .row')]; for (const r of rows) { if (!r.closest('.unit').classList.contains('open')) r.click(); } return rows.length; })()`);
  await sleep(400);
  const started = await b.eval(`(() => { const ex = [...document.querySelectorAll('.ex')].find(e => e.querySelector('.exname')?.innerText.trim() === ${JSON.stringify(name)}); if (!ex) return false; const btn = [...ex.querySelectorAll('.exacts button')].find(b => b.innerText.trim() === 'Practicar'); if (!btn) return false; btn.click(); return true; })()`);
  if (!started) { fail(`could not start ${name}`); continue; }
  await waitBody('Paso 1 de 1');
  if (await has('Antes del ejercicio')) { ok(`card shown before ${label}`); await clickText('Empezar el ejercicio'); }
  await sleep(500); await b.shot(`07-${label}`);
  await playBlock(label);
  await waitBody('Sesión hecha');
  await clickText('Listo');
}

// ---------- wide layout ----------
await b.viewport(1280, 900, 'mac', 1);
await b.goto(BASE);
await waitBody('Empezar');
await b.shot('08-hoy-wide');
await b.goto(BASE + '#/muestra/haiku');
await waitBody('Haiku');
await b.shot('09-muestra-wide');

const bad = b.logs.filter((l) => /exception|error/i.test(l) && !/favicon|languagetool/i.test(l));
if (bad.length) fail('console errors:\n' + bad.join('\n')); else ok('no console errors');
await b.close();
console.log(process.exitCode ? 'FAILED' : 'all good.', 'screenshots in', OUT);
