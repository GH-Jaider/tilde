// The session runner: a plan, the current block and item, the answers so far. Survives reloads.
import { cur, recordSession, addWriting, db } from './store.svelte.js';
import { uid, exerciseById, todayKey } from './logic.js';
import { generateBlock, check } from './drills.js';

const KEY = 'tilde.run';

export const run = $state({ current: null });

export function loadRun() {
  try { run.current = JSON.parse(localStorage.getItem(KEY)) || null; } catch { run.current = null; }
  return run.current;
}

function save() {
  if (run.current) localStorage.setItem(KEY, JSON.stringify($state.snapshot(run.current)));
  else localStorage.removeItem(KEY);
}

export function startRun(plan) {
  run.current = { sessionId: uid(), start: new Date().toISOString(), plan, i: 0, j: 0, items: {}, answers: {}, startedAt: {}, ended: {}, writing: { text: '', saved: false } };
  save();
  return run.current;
}

// Items for the current block, generated once and kept with the run.
export async function ensureItems() {
  const r = run.current;
  if (!r) return [];
  if (r.items[r.i]) return r.items[r.i];
  const b = r.plan.blocks[r.i];
  const ex = b.exerciseId ? exerciseById(cur, b.exerciseId) : null;
  const items = await generateBlock(b, ex, { seed: r.plan.seed || r.sessionId, today: r.plan.date, memory: $state.snapshot(db.words) });
  r.items[r.i] = items;
  r.answers[r.i] ??= [];
  r.startedAt[r.i] ??= Date.now();
  save();
  return items;
}

export function answer(given) {
  const r = run.current;
  const item = r.items[r.i][r.j];
  const res = check(item, given);
  r.answers[r.i][r.j] = { ok: res.ok, given, score: res.score ?? null };
  save();
  return res;
}

export function nextItem() {
  const r = run.current;
  r.j += 1;
  save();
}

export function setWriting(text) {
  run.current.writing.text = text;
  save();
}

function closeBlock() {
  const r = run.current;
  r.ended[r.i] = Date.now();
}

function blockRecord(b, i, r) {
  const items = r.items[i] || [];
  const answers = r.answers[i] || [];
  const ms = r.startedAt[i] ? (r.ended[i] || Date.now()) - r.startedAt[i] : 0;
  const minutes = ms > 0 ? Math.max(1, Math.round(ms / 60000)) : 0;
  if (b.kind === 'write') return { kind: 'write', form: b.form, saved: !!r.writing.saved, minutes };
  const answered = answers.filter(Boolean);
  const rec = { kind: b.kind, drill: b.drill, exerciseId: b.exerciseId || null, items: answered.length, minutes };
  if (b.drill === 'restaurar') rec.ok = answered.length ? Math.round(answered.reduce((a, x) => a + (x.score || 0), 0) / answered.length) : 0;
  else rec.ok = answered.filter((a) => a.ok).length;
  if (b.drill === 'tildes') {
    rec.misses = items.filter((it, k) => answers[k] && !answers[k].ok).map((it) => ({ w: it.w, rule: it.rule }));
    rec.hits = items.filter((it, k) => answers[k] && answers[k].ok).map((it) => it.w);
  } else if (b.drill !== 'leer') {
    rec.misses = items.filter((it, k) => answers[k] && !answers[k].ok).map((it) => ({ w: it.w || it.answer, rule: it.rule || it.kind }));
  }
  return rec;
}

export function nextBlock() {
  const r = run.current;
  closeBlock();
  r.i += 1;
  r.j = 0;
  save();
}

export async function saveWriting(form, text) {
  const r = run.current;
  const w = await addWriting({ sessionId: r.sessionId, form, text, date: r.plan.date });
  r.writing.saved = true;
  save();
  return w;
}

export async function finishRun() {
  const r = run.current;
  closeBlock();
  const blocks = r.plan.blocks.slice(0, r.i + 1).map((b, i) => blockRecord(b, i, r)).filter((b) => b.kind === 'write' ? b.saved : b.items > 0);
  const session = await recordSession({ id: r.sessionId, date: r.plan.date || todayKey(), start: r.start, end: new Date().toISOString(), blocks });
  run.current = null;
  save();
  return session;
}

export function discardRun() {
  run.current = null;
  save();
}
