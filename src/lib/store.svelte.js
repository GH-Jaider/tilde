// App state (Svelte 5 runes) and persistence. Everything lives on this device; nothing leaves it
// except the text you ask LanguageTool to check.
import { idb } from './idb.js';
import { applySession, applyWords, todayKey, uid } from './logic.js';
import curriculum from '#curricula/ortografia.json';

export const cur = curriculum;

export const DEFAULT_SETTINGS = {
  warmupCount: 10,   // words in the warm-up
  lessonItems: 20,   // items in the lesson block (fewer for sentences and texts)
  writing: true,     // the writing step at the end
  weeklyGoal: 5,
  theme: 'auto',     // auto | light | dark
  sound: true,
  checker: 'https://api.languagetool.org/v2',
};

export const db = $state({
  ready: false,
  settings: { ...DEFAULT_SETTINGS },
  progress: {},   // exerciseId -> { count, sessions, last }
  words: {},      // word -> { ok, fail, last }
  sessions: [],   // { id, date, start, end, blocks: [{ kind, drill, exerciseId, items, ok, misses, hits, minutes, form, saved }] }
  writings: [],   // { id, date, sessionId, form, text }
});

async function persist(...keys) {
  await idb.setMany('kv', keys.map((k) => [k, $state.snapshot(db[k])]));
}

export async function load() {
  const [settings, progress, words, sessions, writings] = await Promise.all(['settings', 'progress', 'words', 'sessions', 'writings'].map((k) => idb.get('kv', k)));
  db.settings = { ...DEFAULT_SETTINGS, ...(settings || {}) };
  db.progress = progress || {};
  db.words = words || {};
  db.sessions = sessions || [];
  db.writings = writings || [];
  db.ready = true;
}

export async function setSettings(patch) {
  db.settings = { ...db.settings, ...patch };
  await persist('settings');
}

export async function recordSession(session) {
  session.id ??= uid();
  session.date ??= todayKey();
  db.sessions = [...db.sessions, session];
  db.progress = applySession(db.progress, session);
  db.words = applyWords(db.words, session);
  await persist('sessions', 'progress', 'words');
  return session;
}

export async function deleteSession(id) {
  const s = db.sessions.find((x) => x.id === id);
  if (!s) return;
  db.sessions = db.sessions.filter((x) => x.id !== id);
  db.progress = applySession(db.progress, $state.snapshot(s), -1);
  db.words = applyWords(db.words, $state.snapshot(s), -1);
  db.writings = db.writings.filter((w) => w.sessionId !== id);
  await persist('sessions', 'progress', 'words', 'writings');
}

export async function addWriting(w) {
  w.id ??= uid();
  w.date ??= todayKey();
  db.writings = [...db.writings, w];
  await persist('writings');
  return w;
}

export async function deleteWriting(id) {
  db.writings = db.writings.filter((w) => w.id !== id);
  await persist('writings');
}

// Mark a reading done (or undone) from the path without a session.
export async function setRead(exerciseId, on) {
  const p = { ...db.progress };
  p[exerciseId] = { count: on ? 1 : 0, sessions: p[exerciseId]?.sessions || 0, last: on ? todayKey() : p[exerciseId]?.last || null };
  db.progress = p;
  await persist('progress');
}

// ---------- backup ----------

export async function exportBackup() {
  return JSON.stringify({ app: 'tilde', version: 1, exported: new Date().toISOString(), settings: $state.snapshot(db.settings), progress: $state.snapshot(db.progress), words: $state.snapshot(db.words), sessions: $state.snapshot(db.sessions), writings: $state.snapshot(db.writings) });
}

export async function importBackup(text) {
  const data = JSON.parse(text);
  if (data.app !== 'tilde' || !Array.isArray(data.sessions)) throw new Error('Este archivo no es una copia de Tilde.');
  db.settings = { ...DEFAULT_SETTINGS, ...(data.settings || {}) };
  db.progress = data.progress || {};
  db.words = data.words || {};
  db.sessions = data.sessions;
  db.writings = data.writings || [];
  await persist('settings', 'progress', 'words', 'sessions', 'writings');
}

export async function wipe() {
  await idb.clear('kv');
  db.settings = { ...DEFAULT_SETTINGS };
  db.progress = {};
  db.words = {};
  db.sessions = [];
  db.writings = [];
}
