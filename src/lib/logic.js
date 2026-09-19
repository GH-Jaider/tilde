// Pure functions, no DOM. Shared by the app and the node tests.

// ---------- dates (local calendar days as 'YYYY-MM-DD') ----------

export function todayKey(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function addDays(key, n) {
  const [y, m, d] = key.split('-').map(Number);
  return todayKey(new Date(y, m - 1, d + n));
}

export function daysBetween(a, b) {
  const [y1, m1, d1] = a.split('-').map(Number);
  const [y2, m2, d2] = b.split('-').map(Number);
  return Math.round((Date.UTC(y2, m2 - 1, d2) - Date.UTC(y1, m1 - 1, d1)) / 86400000);
}

export function fmtDate(key, { withYear = false } = {}) {
  const [y, m, d] = key.split('-').map(Number);
  const opts = { weekday: 'long', month: 'long', day: 'numeric' };
  if (withYear) opts.year = 'numeric';
  const s = new Date(y, m - 1, d).toLocaleDateString('es-CO', opts);
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function fmtMinutes(min) {
  const h = Math.floor(min / 60), m = Math.round(min % 60);
  return h ? `${h} h ${m} min` : `${m} min`;
}

export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// Deterministic PRNG (mulberry32) seeded from a string, so the plan for a given day stays put.
export function seeded(seedStr) {
  let h = 1779033703 ^ seedStr.length;
  for (let i = 0; i < seedStr.length; i++) { h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
  let a = h >>> 0;
  return () => {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------- curriculum ----------

export function units(cur) { return cur.units; }
export function unitById(cur, id) { return cur.units.find((u) => u.id === id) || null; }

export function exercises(cur) {
  return cur.units.flatMap((u, ui) => u.exercises.map((e, ei) => ({ ...e, unitId: u.id, unitName: u.name, unitShort: u.short, unitIndex: ui, index: ei, of: u.exercises.length })));
}
export function exerciseById(cur, id) { return exercises(cur).find((e) => e.id === id) || null; }

export function countOf(progress, id) { return progress[id]?.count || 0; }

export function exerciseState(ex, progress) {
  const count = countOf(progress, ex.id);
  return { count, quota: ex.quota, done: count >= ex.quota, pct: Math.min(1, count / ex.quota), remaining: Math.max(0, ex.quota - count) };
}

export function unitDone(unit, progress) { return unit.exercises.every((ex) => exerciseState(ex, progress).done); }
export function unitStarted(unit, progress) { return unit.exercises.some((ex) => countOf(progress, ex.id) > 0); }
export function unitStatus(unit, progress) { return unitDone(unit, progress) ? 'complete' : unitStarted(unit, progress) ? 'active' : 'available'; }
export function unitProgress(unit, progress) {
  const s = unit.exercises.map((ex) => exerciseState(ex, progress).pct);
  return s.length ? s.reduce((a, b) => a + b, 0) / s.length : 0;
}

// First unfinished exercise on the path.
export function nextExercise(cur, progress) {
  for (const ex of exercises(cur)) if (!exerciseState(ex, progress).done) return ex;
  return null;
}

// "Lección 1 · tema 3 de 7"
export function exerciseContext(cur, ex) {
  const u = unitById(cur, ex.unitId);
  if (!u) return '';
  return `Lección ${ex.unitIndex + 1} · tema ${ex.index + 1} de ${ex.of}`;
}

const UNIT_ONE = { palabras: 'palabra', frases: 'frase', textos: 'texto', lectura: 'lectura' };
export function unitLabel(unit, n) { return n === 1 ? (UNIT_ONE[unit] || unit) : unit; }

// The tilde rules the path has touched so far: what the warm-up may draw from.
export function studiedRules(cur, progress) {
  const rules = new Set();
  for (const ex of exercises(cur)) if (ex.drill === 'tildes' && countOf(progress, ex.id) > 0) for (const r of ex.rules) rules.add(r);
  return [...rules];
}

// ---------- session planning ----------

// How many items one lesson block holds, by drill.
export function lessonSize(ex, settings) {
  const n = settings.lessonItems || 20;
  switch (ex.drill) {
    case 'tildes': case 'letras': case 'silabas': return n;
    case 'pares': return Math.max(6, Math.round(n / 2));
    case 'restaurar': return Math.max(1, Math.round(n / 10));
    case 'leer': return 1;
    default: return n;
  }
}

// Minutes a block is worth, for the plan's estimate only: drills are item-based, no clock.
export function blockMinutes(b) {
  if (b.kind === 'warmup') return 3;
  if (b.kind === 'write') return 5;
  if (b.drill === 'restaurar') return 5 * (b.items || 1);
  if (b.drill === 'leer') return 8;
  return Math.max(3, Math.round((b.items || 10) * 0.5));
}

export const PATTERN_FORMS = ['haiku', 'copla', 'tanka', 'seguidilla', 'cuarteta', 'redondilla', 'lira', 'decima', 'soneto'];

// The form to write today: the cycle above, one per writing already saved, so it moves on as you go.
export function formOfTheDay(writings) {
  return PATTERN_FORMS[Math.min(writings.length, PATTERN_FORMS.length - 1) % PATTERN_FORMS.length] || 'haiku';
}

export function planSession(cur, progress, settings, { today = todayKey(), seed = '', writings = [] } = {}) {
  const blocks = [];
  const rules = studiedRules(cur, progress);
  if (rules.length && settings.warmupCount > 0) blocks.push({ kind: 'warmup', drill: 'tildes', rules, items: settings.warmupCount });
  const ex = nextExercise(cur, progress);
  if (ex) blocks.push({ kind: 'lesson', drill: ex.drill, exerciseId: ex.id, items: lessonSize(ex, settings) });
  if (settings.writing !== false) blocks.push({ kind: 'write', form: formOfTheDay(writings) });
  return { date: today, seed, blocks, continuing: false };
}

// After a session, the next plan within the hour is just the next lesson (and writing if none yet today).
export function continuationPlan(cur, progress, settings, { today = todayKey(), wroteToday = false, writings = [] } = {}) {
  const blocks = [];
  const ex = nextExercise(cur, progress);
  if (ex) blocks.push({ kind: 'lesson', drill: ex.drill, exerciseId: ex.id, items: lessonSize(ex, settings) });
  if (settings.writing !== false && !wroteToday) blocks.push({ kind: 'write', form: formOfTheDay(writings) });
  return { date: today, seed: '', blocks, continuing: true };
}

// A plan for one exercise from the path, or one form from the library.
export function focusPlan(cur, ex, settings, { today = todayKey() } = {}) {
  return { date: today, seed: '', blocks: [{ kind: 'lesson', drill: ex.drill, exerciseId: ex.id, items: lessonSize(ex, settings) }], continuing: true };
}
export function writePlan(form, { today = todayKey() } = {}) {
  return { date: today, seed: '', blocks: [{ kind: 'write', form }], continuing: true };
}

// ---------- history ----------

// A block counts toward its exercise by correct answers (drills) or by texts and readings completed.
export function blockCredit(b) {
  if (!b.exerciseId) return 0;
  if (b.drill === 'restaurar' || b.drill === 'leer') return b.items || 0;
  return b.ok || 0;
}

export function applySession(progress, session, sign = 1) {
  const p = { ...progress };
  for (const b of session.blocks) {
    if (!b.exerciseId) continue;
    const cur = { count: 0, sessions: 0, last: null, ...(p[b.exerciseId] || {}) };
    cur.count = Math.max(0, cur.count + sign * blockCredit(b));
    cur.sessions = Math.max(0, cur.sessions + sign);
    if (sign > 0 && (!cur.last || cur.last < session.date)) cur.last = session.date;
    p[b.exerciseId] = cur;
  }
  return p;
}

// Per-word memory: how often a word went right or wrong, for the warm-up to lean on the weak ones.
export function applyWords(words, session, sign = 1) {
  const w = { ...words };
  for (const b of session.blocks) {
    if (b.drill !== 'tildes') continue;
    for (const m of b.misses || []) { const c = { ok: 0, fail: 0, last: null, ...(w[m.w] || {}) }; c.fail = Math.max(0, c.fail + sign); if (sign > 0) c.last = session.date; w[m.w] = c; }
    for (const x of b.hits || []) { const c = { ok: 0, fail: 0, last: null, ...(w[x] || {}) }; c.ok = Math.max(0, c.ok + sign); if (sign > 0) c.last = session.date; w[x] = c; }
  }
  return w;
}

export function dayTotals(sessions) {
  const m = new Map();
  for (const s of sessions) {
    const t = m.get(s.date) || { minutes: 0, items: 0, ok: 0, writings: 0 };
    for (const b of s.blocks) { t.minutes += b.minutes || 0; t.items += b.items || 0; t.ok += b.ok || 0; if (b.kind === 'write' && b.saved) t.writings += 1; }
    m.set(s.date, t);
  }
  return m;
}

export function daysPractised(sessions) { return dayTotals(sessions).size; }

export function weekView(sessions, today = todayKey(), goal = 5) {
  const tot = dayTotals(sessions);
  const [y, m, d] = today.split('-').map(Number);
  const dow = (new Date(y, m - 1, d).getDay() + 6) % 7;
  const start = addDays(today, -dow);
  const days = [];
  for (let i = 0; i < 7; i++) { const date = addDays(start, i); days.push({ date, done: tot.has(date), today: date === today, future: date > today, label: 'LMXJVSD'[i] }); }
  const done = days.filter((x) => x.done).length;
  const left = days.filter((x) => !x.done && !x.future && !x.today).length;
  return { days, done, goal, reserve: Math.max(0, 7 - goal - left), met: done >= goal };
}

export function minutesSinceLastSession(sessions, today = todayKey(), now = new Date()) {
  const ends = sessions.filter((s) => s.date === today && s.end).map((s) => new Date(s.end).getTime());
  if (!ends.length) return null;
  return Math.max(0, (now.getTime() - Math.max(...ends)) / 60000);
}

export function wroteToday(sessions, today = todayKey()) {
  return sessions.some((s) => s.date === today && s.blocks.some((b) => b.kind === 'write' && b.saved));
}

// "Ocho de diez tildes." for the summary.
const NUM = ['cero', 'una', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve', 'veinte'];
export function numWord(n) { return NUM[n] ?? String(n); }
export function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

export function blockSentence(cur, b) {
  const ex = b.exerciseId ? exerciseById(cur, b.exerciseId) : null;
  if (b.kind === 'write') return b.saved ? `Escribiste ${b.form === 'haiku' ? 'un haiku' : 'un texto'}` : 'No escribiste esta vez';
  const what = b.kind === 'warmup' ? 'Calentamiento' : ex ? ex.name : b.drill;
  if (b.drill === 'leer') return `${what} · leído`;
  if (b.drill === 'restaurar') return `${what} · ${b.items} ${unitLabel('textos', b.items)}${b.ok != null ? ` · ${b.ok} % de aciertos` : ''}`;
  return `${what} · ${b.ok} de ${b.items}`;
}
