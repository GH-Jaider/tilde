<script>
  import { db, cur } from '#lib/store.svelte.js';
  import { navigate } from '#lib/ui.svelte.js';
  import { explain, RULES } from '#lib/tilde.js';
  import * as L from '#lib/logic.js';
  import formas from '../content/formas.json';

  let { id } = $props();
  const s = $derived(db.sessions.find((x) => x.id === id));
  $effect(() => { if (!s) navigate('hoy'); });
  const lesson = $derived(s ? s.blocks.find((b) => b.kind === 'lesson' && b.exerciseId) : null);
  const ex = $derived(lesson ? L.exerciseById(cur, lesson.exerciseId) : null);
  const next = $derived(L.nextExercise(cur, db.progress));
  const week = $derived(L.weekView(db.sessions, L.todayKey(), db.settings.weeklyGoal));
  const writing = $derived(s ? db.writings.find((w) => w.sessionId === s.id) : null);
  const form = $derived(writing ? formas.find((f) => f.id === writing.form) : null);
  const drillBlocks = $derived(s ? s.blocks.filter((b) => b.kind !== 'write' && b.drill !== 'leer' && b.drill !== 'restaurar') : []);
  const okTotal = $derived(drillBlocks.reduce((a, b) => a + (b.ok || 0), 0));
  const itemsTotal = $derived(drillBlocks.reduce((a, b) => a + (b.items || 0), 0));
  const misses = $derived(s ? s.blocks.flatMap((b) => (b.misses || []).map((m) => ({ ...m, drill: b.drill }))) : []);
  const headline = $derived.by(() => {
    if (!s) return '';
    if (itemsTotal) return `${L.cap(L.numWord(okTotal))} de ${L.numWord(itemsTotal)}.`;
    if (s.blocks.some((b) => b.drill === 'restaurar')) return 'Texto restaurado.';
    if (s.blocks.some((b) => b.drill === 'leer')) return 'Leído.';
    return writing ? 'Escrito.' : 'Hecho.';
  });
  const missLine = (m) => {
    if (m.drill === 'tildes') { const e = explain(m.w); return `${m.w}: ${e.syllables.join('·')}, ${(RULES[e.rule] || '').toLowerCase()}`; }
    if (m.drill === 'pares') return `${m.w}: así va en el texto original`;
    return m.w;
  };
  const total = $derived(s ? s.blocks.reduce((a, b) => a + (b.minutes || 0), 0) : 0);
</script>

{#if s}
  <div class="end">
    <div class="body">
      <div class="k mute">Sesión hecha · {L.fmtDate(s.date)}{total ? ` · ${total} min` : ''}</div>
      <h1 class="h-poster" style="margin-top:8px">{headline}</h1>
      <ul class="did">{#each s.blocks as b}<li>{L.blockSentence(cur, b)}</li>{/each}</ul>
      {#if misses.length}
        <div class="miss"><div class="k mute">Se te fueron</div><ul>{#each misses.slice(0, 8) as m}<li>{missLine(m)}</li>{/each}</ul></div>
      {/if}
      {#if ex}<p class="lead" style="margin-top:14px">{L.exerciseState(ex, db.progress).done ? `${ex.name} queda completo.` : `${ex.name}: ${L.countOf(db.progress, ex.id)} de ${ex.quota} ${ex.unit}.`} {next ? `Siguiente en el camino: ${next.name} (${L.exerciseContext(cur, next).toLowerCase()}).` : 'Ese era el camino entero.'}</p>{/if}
      {#if writing}
        <div class="wrote"><div class="k mute">Escribiste · {form?.name || writing.form}</div><pre>{writing.text}</pre></div>
      {/if}
      <div class="facts">
        {#if ex && ex.drill !== 'leer'}<div><div class="v num">{L.countOf(db.progress, ex.id)}<small>/ {ex.quota}</small></div><div class="l">{ex.unit} de {ex.name.toLowerCase()}</div></div>{/if}
        <div><div class="v num">{week.done}<small>de {week.goal}</small></div><div class="l">Días esta semana</div></div>
        <div><div class="v num">{L.daysPractised(db.sessions)}</div><div class="l">Días en total</div></div>
      </div>
    </div>
    <div class="foot"><span class="small mute">Hoy muestra el siguiente paso. Ahora o cuando quieras.</span><button class="btn" onclick={() => navigate('hoy')}>Listo</button></div>
  </div>
{/if}

<style>
  .end { min-height: 100vh; display: flex; flex-direction: column; padding: calc(var(--pad) + var(--safe-top)) var(--pad) calc(var(--pad) + var(--safe-bottom)); }
  .body { flex: 1; max-width: 900px; }
  .did { list-style: none; padding: 0; margin: 14px 0 0; display: grid; gap: 4px; font-size: 17px; color: var(--mute); }
  .did li::before { content: '· '; }
  .miss { margin-top: 18px; }
  .miss ul { list-style: none; padding: 0; margin: 6px 0 0; display: grid; gap: 4px; font-size: 16px; }
  .miss li::before { content: '· '; color: var(--c2); }
  .wrote { margin-top: 18px; }
  .wrote pre { font: inherit; font-size: 20px; font-weight: 500; white-space: pre-wrap; margin: 6px 0 0; border-left: 4px solid var(--c3); padding-left: 14px; }
  .facts { display: flex; gap: clamp(20px, 5vw, 56px); flex-wrap: wrap; margin-top: 24px; }
  .facts .v { font-size: clamp(44px, 8vw, 96px); font-weight: 700; line-height: .85; letter-spacing: -.05em; }
  .facts .v small { font-size: .3em; letter-spacing: -.01em; margin-left: 6px; opacity: .5; }
  .facts .l { margin-top: 8px; font-weight: 500; }
  .foot { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-top: 32px; }
</style>
