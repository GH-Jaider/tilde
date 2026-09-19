<script>
  import Mast from '#components/Mast.svelte';
  import { db, cur, setRead } from '#lib/store.svelte.js';
  import { run, startRun } from '#lib/run.svelte.js';
  import { navigate } from '#lib/ui.svelte.js';
  import * as L from '#lib/logic.js';
  import { slide } from 'svelte/transition';

  const next = $derived(L.nextExercise(cur, db.progress));
  const firstOpen = L.nextExercise(cur, db.progress)?.unitId || cur.units[0].id;
  let open = $state(new Set([firstOpen]));
  function toggle(id) { const s = new Set(open); s.has(id) ? s.delete(id) : s.add(id); open = s; }
  const href = (r) => (cur.sources[r.site] || '') + (r.site === 'fundeu' ? r.page + '/' : r.page);
  const unitsDone = $derived(cur.units.filter((u) => L.unitDone(u, db.progress)).length);
  const exDone = $derived(L.exercises(cur).filter((e) => L.exerciseState(e, db.progress).done).length);
  function practise(ex) { if (run.current) { navigate('sesion'); return; } startRun(L.focusPlan(cur, ex, db.settings)); navigate('sesion'); }
</script>

<Mast meta={`${unitsDone} de ${cur.units.length} lecciones`} />
<main class="page wrap">
  <div class="head">
    <div><div class="k mute">Ortografía de la lengua española · siete lecciones</div><h1 class="h-poster" style="margin-top:6px">Camino</h1></div>
    <div class="stats">
      <div><div class="v num">{L.daysPractised(db.sessions)}</div><div class="l">Días</div></div>
      <div><div class="v num">{exDone}<small>de {L.exercises(cur).length}</small></div><div class="l">Temas</div></div>
      <div><div class="v num">{unitsDone}<small>de {cur.units.length}</small></div><div class="l">Lecciones</div></div>
    </div>
  </div>

  <div class="path-grid">
    <div class="units">
      {#each cur.units as u, ui (u.id)}
        {@const st = L.unitStatus(u, db.progress)}
        {@const done = u.exercises.filter((e) => L.exerciseState(e, db.progress).done).length}
        <div class="unit {st}" class:open={open.has(u.id)}>
          <button class="row" onclick={() => toggle(u.id)} aria-expanded={open.has(u.id)}>
            <div class="no">Lección {ui + 1}</div>
            <div><div class="nm">{u.name}</div><div class="sb">{u.chapter}</div></div>
            <div class="q num">{done}<small> / {u.exercises.length}</small></div>
          </button>
          {#if st === 'active'}<div class="prog"><i style={`width:${L.unitProgress(u, db.progress) * 100}%`}></i></div>{/if}
          {#if open.has(u.id)}
            <div class="exs" transition:slide={{ duration: 200 }}>
              {#each u.exercises as ex (ex.id)}
                {@const es = L.exerciseState(ex, db.progress)}
                <div class="ex" class:done={es.done} class:now={next?.id === ex.id}>
                  <div class="exname">{ex.name}</div>
                  <span class="exq num">{ex.drill === 'leer' ? (es.done ? 'leído' : 'sin leer') : `${es.count} / ${es.quota} ${ex.unit}`}</span>
                  <div class="exlinks">{#each ex.read as r}<a class="ext small" href={href(r)} target="_blank" rel="noopener">{r.title} ↗</a>{/each}</div>
                  <div class="exacts">
                    {#if ex.drill === 'leer'}<button class="btn text dim" onclick={() => setRead(ex.id, !es.done)}>{es.done ? 'Marcar como no leído' : 'Ya lo leí'}</button>
                    {:else}<button class="btn text dim" onclick={() => practise({ ...ex, unitId: u.id })}>Practicar</button>{/if}
                  </div>
                  <div class="exbar"><i style={`width:${es.pct * 100}%`}></i></div>
                </div>
              {/each}
            </div>
          {/if}
        </div>
      {/each}
    </div>

    {#if next}
      <aside class="now-card">
        <div class="k">Ahora · {L.exerciseContext(cur, next)}</div>
        <h2 class="h-big">{next.name}</h2>
        <div class="big num">{L.countOf(db.progress, next.id)}<small>/ {next.quota} {next.unit}</small></div>
        <p class="small" style="opacity:.9">{cur.drills[next.drill]}</p>
        <div class="acts"><button class="btn paper" onclick={() => practise(next)}>Practicar esto</button></div>
      </aside>
    {/if}
  </div>
</main>

<style>
  .head { display: flex; justify-content: space-between; align-items: flex-end; gap: 20px; flex-wrap: wrap; }
  .stats { display: flex; gap: clamp(20px, 5vw, 56px); flex-wrap: wrap; }
  .stats .v { font-size: clamp(40px, 6vw, 72px); font-weight: 700; line-height: .85; letter-spacing: -.05em; }
  .stats .v small { font-size: .3em; opacity: .5; margin-left: 4px; letter-spacing: -.01em; }
  .stats .l { margin-top: 6px; font-weight: 500; font-size: 14px; color: var(--mute); }
  .path-grid { display: grid; gap: 28px; margin-top: 32px; }
  .units { border-top: 2px solid var(--ink); }
  .unit { border-bottom: 1px solid var(--line); }
  .unit .row { display: grid; grid-template-columns: 92px minmax(0, 1fr) auto; gap: 14px; align-items: center; padding: 16px 0; width: 100%; }
  .unit .no { font-size: 13px; font-weight: 700; letter-spacing: .02em; text-transform: uppercase; line-height: 1.2; color: var(--faint); }
  .unit .nm { font-weight: 700; font-size: clamp(18px, 2.2vw, 22px); letter-spacing: -.02em; line-height: 1.1; }
  .unit .sb { color: var(--mute); font-size: 14px; margin-top: 4px; }
  .unit .q { font-weight: 700; font-size: 18px; letter-spacing: -.02em; white-space: nowrap; }
  .unit .q small { font-weight: 500; color: var(--mute); }
  .unit.complete .no { color: var(--c4); }
  .unit.active .no, .unit.active .nm { color: var(--c2); }
  .unit .prog { height: 6px; background: var(--paper-2); margin: -6px 0 12px 106px; }
  .unit .prog i { display: block; height: 100%; background: var(--c2); }
  .exs { padding: 0 0 14px 106px; }
  .ex { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 6px 12px; align-items: center; padding: 10px 0; border-top: 1px solid var(--line); }
  .exname { font-weight: 700; }
  .ex.now .exname { color: var(--c2); }
  .ex.done .exname::before { content: '✓ '; color: var(--c4); }
  .exq { font-size: 13px; color: var(--mute); white-space: nowrap; }
  .exlinks { display: flex; flex-wrap: wrap; gap: 6px 14px; grid-column: 1; }
  .exacts { grid-column: 2; justify-self: end; }
  .exbar { grid-column: 1 / -1; height: 4px; background: var(--paper-2); }
  .exbar i { display: block; height: 100%; background: var(--ink); }
  .ex.done .exbar i { background: var(--c4); }
  .now-card { background: var(--c2); color: var(--c2-ink); padding: var(--pad); display: flex; flex-direction: column; gap: 14px; }
  .now-card .big { font-size: clamp(64px, 9vw, 120px); font-weight: 700; line-height: .85; letter-spacing: -.06em; }
  .now-card .big small { font-size: .3em; letter-spacing: -.01em; opacity: .75; margin-left: 6px; }
  .acts { display: flex; gap: 18px; align-items: center; flex-wrap: wrap; }
  @media (max-width: 599px) { .unit .row { grid-template-columns: minmax(0, 1fr) auto; } .unit .no { grid-column: 1 / -1; } .unit .prog, .exs { margin-left: 0; padding-left: 0; } }
  @media (min-width: 900px) { .path-grid { grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); gap: 48px; align-items: start; } .now-card { position: sticky; top: calc(var(--mast) + 24px); } }
</style>
