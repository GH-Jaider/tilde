<script>
  import Mast from '#components/Mast.svelte';
  import Week from '#components/Week.svelte';
  import { db, cur } from '#lib/store.svelte.js';
  import { run, startRun } from '#lib/run.svelte.js';
  import { navigate } from '#lib/ui.svelte.js';
  import * as L from '#lib/logic.js';
  import formas from '../content/formas.json';

  const today = L.todayKey();
  let seed = $state(sessionStorage.getItem('tilde.seed') || '');
  const since = $derived(L.minutesSinceLastSession(db.sessions, today));
  const continuing = $derived(since !== null && since < 60);
  const plan = $derived(continuing
    ? L.continuationPlan(cur, db.progress, db.settings, { today, wroteToday: L.wroteToday(db.sessions, today), writings: db.writings })
    : L.planSession(cur, db.progress, db.settings, { today, seed, writings: db.writings }));
  const week = $derived(L.weekView(db.sessions, today, db.settings.weeklyGoal));
  const fresh = $derived(!db.sessions.length);
  const warm = $derived(plan.blocks.find((b) => b.kind === 'warmup'));
  const lesson = $derived(plan.blocks.find((b) => b.kind === 'lesson'));
  const write = $derived(plan.blocks.find((b) => b.kind === 'write'));
  const ex = $derived(lesson ? L.exerciseById(cur, lesson.exerciseId) : null);
  const form = $derived(write ? formas.find((f) => f.id === write.form) : null);
  const minutes = $derived(plan.blocks.reduce((a, b) => a + L.blockMinutes(b), 0));
  const stepOf = (kind) => plan.blocks.findIndex((b) => b.kind === kind) + 1;
  const todayDone = $derived(db.sessions.filter((s) => s.date === today));
  const doneToday = $derived(todayDone.reduce((a, s) => a + s.blocks.reduce((x, b) => x + (b.kind !== 'write' ? b.items || 0 : 0), 0), 0));

  const drillLine = (e) => cur.drills[e.drill] || '';
  const readHref = (r) => (cur.sources[r.site] || '') + (r.site === 'fundeu' ? r.page + '/' : r.page);
  const lessonLine = $derived.by(() => {
    if (!ex) return '';
    const st = L.exerciseState(ex, db.progress);
    if (ex.drill === 'leer') return `Lee ${ex.read[0].title} y márcalo como leído. Eso es todo el tema.`;
    const n = lesson.items;
    const what = ex.drill === 'restaurar' ? `${n} ${L.unitLabel('textos', n)}` : ex.drill === 'pares' ? `${n} frases` : `${n} palabras`;
    const first = (db.progress[ex.id]?.sessions || 0) < 2;
    return `${first ? 'Primero la ficha del tema: qué es y cómo funciona, con ejemplos. Luego' : `${st.count} de ${st.quota} ${ex.unit} hasta ahora. Hoy,`} ${what}.`;
  });
  function start() { startRun($state.snapshot(plan)); navigate('sesion'); }
  function shuffle() { seed = L.uid(); sessionStorage.setItem('tilde.seed', seed); }
</script>

<div class="today-page">
  <Mast meta={`${L.fmtDate(today)} · ${week.done} de ${week.goal} esta semana`} />

  {#if run.current}
    {@const r = run.current}
    {@const b = r.plan.blocks[r.i]}
    <div class="blocks one">
      <section class="blk {b.kind === 'warmup' ? 'c1' : b.kind === 'write' ? 'c3' : 'c2'}">
        <div class="k">Sesión en curso · paso {r.i + 1} de {r.plan.blocks.length}</div>
        <div class="n">{b.kind === 'warmup' ? 'Calentamiento' : b.kind === 'write' ? 'Escribir' : (L.exerciseById(cur, b.exerciseId)?.name || 'Lección')}</div>
        <div class="d">Quedó abierta. Sigue donde ibas o ciérrala desde dentro.</div>
      </section>
    </div>
    <button class="bar-btn ink" onclick={() => navigate('sesion')}>Seguir →</button>
  {:else}
    <div class="blocks" class:two={plan.blocks.length === 2} class:one={plan.blocks.length === 1}>
      {#if warm}
        <section class="blk c1" style="view-transition-name: block-warmup">
          <div class="k">Paso {stepOf('warmup')} · Calentamiento</div>
          <div class="n">{L.cap(L.numWord(warm.items))} tildes</div>
          <div class="d">Palabras de las reglas que ya viste. Pones la tilde donde va, o dices que no lleva.</div>
          <div class="m num">{L.blockMinutes(warm)}<small>min</small></div>
        </section>
      {/if}
      {#if lesson && ex}
        <section class="blk c2" style="view-transition-name: block-lesson">
          <div class="k">Paso {stepOf('lesson')} · {L.exerciseContext(cur, ex)}</div>
          <div class="n">{ex.name}</div>
          <div class="d">{lessonLine}{#if ex.read?.length}{' '}<a class="rd" href={readHref(ex.read[0])} target="_blank" rel="noopener">Lectura completa: {ex.read[0].title} ↗</a>{/if}</div>
          <div class="m num">{L.blockMinutes(lesson)}<small>min</small></div>
        </section>
      {:else if !lesson}
        <section class="blk c2"><div class="k">Camino completo</div><div class="n">Calentamiento y escritura desde aquí.</div></section>
      {/if}
      {#if write && form}
        <section class="blk c3" style="view-transition-name: block-write">
          <div class="k">Paso {stepOf('write')} · Escribir · opcional</div>
          <div class="n">{form.id === 'haiku' ? 'Un haiku' : form.id === 'soneto' ? 'Un cuarteto' : `Una ${form.name.toLowerCase()}`}</div>
          <div class="d">{form.shape} Tilde cuenta las sílabas y revisa la ortografía.</div>
          <div class="m num">{L.blockMinutes(write)}<small>min</small></div>
        </section>
      {/if}
    </div>

    {#if fresh}
      <div class="page how">
        <p><b>Cómo funciona.</b> Tilde es el índice de la <i>Ortografía</i> de la RAE, en siete lecciones: tilde, puntuación, mayúsculas, palabras juntas o separadas, letras que suenan igual, números y extranjerismos. Cada lección son unos pocos temas con una cuota.</p>
        <p>Cada día, una sesión en pasos: un calentamiento con tildes, un tema del camino y, si quieres, escribir algo corto. Cada tema empieza con una ficha corta, en nuestras palabras y con ejemplos, y enlaza la explicación completa. Las respuestas correctas salen del diccionario y de textos reales, nunca de nosotros. Cuando un tema llega a su cuota, el camino pasa al siguiente.</p>
      </div>
    {:else if todayDone.length}
      <div class="page sofar">
        <div class="k">Hoy hasta ahora</div>
        <p class="line">{todayDone.length === 1 ? 'Una sesión' : `${todayDone.length} sesiones`} · {doneToday} {L.unitLabel('palabras', doneToday)} o frases{L.wroteToday(db.sessions, today) ? ' · escribiste' : ''}{continuing ? ' · sin calentamiento, acabas de hacer uno' : ''}</p>
        <div class="line small"><Week {week} /><span>{week.done} de {week.goal} esta semana{week.reserve ? ` · ${week.reserve} de reserva` : ''}</span></div>
      </div>
    {:else}
      <div class="page weekrow"><Week {week} /><span class="small mute">{week.done} de {week.goal} esta semana{week.reserve ? ` · ${week.reserve} de reserva` : ''}</span>{#if warm}<button class="btn text dim" onclick={shuffle}>Otras palabras</button>{/if}</div>
    {/if}
    <div class="bar-btn" class:ink={fresh}>
      <button class="go" onclick={start}>{continuing ? 'Continuar' : 'Empezar'}</button>
      <span class="aside"><span class="long">unos {minutes} min</span></span>
    </div>
  {/if}
</div>

<style>
  .today-page { min-height: 100vh; display: grid; grid-template-rows: auto 1fr auto; }
  .blocks { display: grid; grid-template-rows: repeat(3, minmax(0, 1fr)); }
  .blocks.two { grid-template-rows: 2fr 1fr; }
  .blocks.one { grid-template-rows: 1fr; }
  .blk { position: relative; padding: var(--pad); display: flex; flex-direction: column; justify-content: flex-end; gap: 8px; overflow: hidden; min-height: 150px; }
  .blk.c1 { background: var(--c1); color: var(--c1-ink); }
  .blk.c2 { background: var(--c2); color: var(--c2-ink); }
  .blk.c3 { background: var(--c3); color: var(--c3-ink); }
  .blk .k { opacity: .85; padding-right: 36%; }
  .blk .n { font-weight: 700; line-height: .95; letter-spacing: -.03em; font-size: clamp(26px, 5vw, 44px); max-width: 18ch; }
  .blk .d { opacity: .88; max-width: 44ch; font-size: clamp(14px, 1.5vw, 16px); }
  .blk .rd { text-decoration: underline; text-underline-offset: 3px; font-weight: 700; white-space: nowrap; }
  .blk .m { position: absolute; right: var(--pad); top: calc(var(--pad) - 8px); font-weight: 700; line-height: .8; letter-spacing: -.06em; font-size: clamp(64px, 16vw, 120px); }
  .blk .m small { font-size: clamp(14px, 1.6vw, 18px); letter-spacing: 0; font-weight: 500; margin-left: 4px; }
  .go { font-size: inherit; font-weight: inherit; letter-spacing: inherit; }
  .weekrow { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
  .how { display: grid; gap: 8px; max-width: 62ch; font-size: 15px; color: var(--mute); }
  .how b { color: var(--ink); }
  .sofar { background: var(--ink); color: var(--paper); display: grid; gap: 8px; }
  .sofar .k { opacity: .6; }
  .sofar .line { font-weight: 500; font-size: 17px; line-height: 1.4; }
  .sofar .line.small { display: flex; flex-wrap: wrap; gap: 6px 12px; align-items: center; font-size: 14px; font-weight: 400; opacity: .8; }
  @media (min-width: 900px) {
    .blocks, .blocks.two, .blocks.one { grid-template-rows: none; grid-auto-flow: column; }
    .blocks { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .blocks.two { grid-template-columns: 2fr 1fr; }
    .blocks.one { grid-template-columns: 1fr; }
    .blk { min-height: 0; padding-bottom: calc(var(--pad) + 8px); }
    .blk .n { max-width: 16ch; }
    .blk .d { max-width: 40ch; }
    .blk .k { padding-right: 0; }
    .blk .m { position: static; margin-bottom: 18px; font-size: clamp(120px, 12vw, 190px); }
  }
</style>
