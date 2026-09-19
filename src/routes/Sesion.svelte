<script>
  import { run, ensureItems, answer, nextItem, nextBlock, finishRun, discardRun, markIntro } from '#lib/run.svelte.js';
  import { db, cur } from '#lib/store.svelte.js';
  import { navigate, withTransition, reduceMotion } from '#lib/ui.svelte.js';
  import { fichaFor, RULE_TOPIC } from '#lib/fichas.js';
  import Ficha from '#components/Ficha.svelte';
  import Sheet from '#components/Sheet.svelte';
  import * as L from '#lib/logic.js';
  import Tildes from '../drills/Tildes.svelte';
  import Silabas from '../drills/Silabas.svelte';
  import Pares from '../drills/Pares.svelte';
  import Letras from '../drills/Letras.svelte';
  import Restaurar from '../drills/Restaurar.svelte';
  import Leer from '../drills/Leer.svelte';
  import Escribir from '../drills/Escribir.svelte';
  import { fade, fly } from 'svelte/transition';

  const r = $derived(run.current);
  const block = $derived(r ? r.plan.blocks[r.i] : null);
  const ex = $derived(block?.exerciseId ? L.exerciseById(cur, block.exerciseId) : null);
  const last = $derived(r ? r.i === r.plan.blocks.length - 1 : true);
  const color = $derived(block?.kind === 'warmup' ? 'c1' : block?.kind === 'write' ? 'c3' : 'c2');
  let items = $state(null);
  let result = $state(null); // the checked answer for the current item
  let moment = $state(null);
  let confirm = $state(false);
  const reduce = reduceMotion();
  const item = $derived(items && r ? items[r.j] : null);
  const total = $derived(items ? items.length : 0);
  const okSoFar = $derived(r && r.answers[r.i] ? r.answers[r.i].filter((a) => a && a.ok).length : 0);
  // The card before the exercise: the first two times a topic comes up. Afterwards it lives under "Ver la regla".
  const ficha = $derived(ex ? fichaFor(ex.id) : null);
  const showIntro = $derived(!!(r && block?.kind === 'lesson' && ex && ficha && block.drill !== 'leer' && !r.intro?.[r.i] && (db.progress[ex.id]?.sessions || 0) < 2));
  let rule = $state(false);
  // Which card explains the current item: the topic's own, or, in the warm-up, the one for the word's rule.
  const ruleCard = $derived.by(() => {
    if (ex && ficha) return { ex, ficha };
    const id = item?.rule ? RULE_TOPIC[item.rule] : null;
    const rex = id ? L.exerciseById(cur, id) : null;
    return rex && fichaFor(id) ? { ex: rex, ficha: fichaFor(id) } : null;
  });
  function startDrill() { markIntro(); }

  $effect(() => { if (!run.current) navigate('hoy'); });
  $effect(() => {
    const i = r?.i;
    if (i == null) return;
    items = null; result = null;
    ensureItems().then((its) => { items = its; });
  });

  const stepLabel = $derived(block ? (block.kind === 'warmup' ? 'Calentamiento' : block.kind === 'write' ? 'Escribir' : ex ? L.exerciseContext(cur, ex) : 'Lección') : '');
  const title = $derived(block ? (block.kind === 'warmup' ? 'Calentamiento' : block.kind === 'write' ? 'Escribir' : ex?.name || '') : '');
  const nextName = $derived.by(() => { const nb = r && r.plan.blocks[r.i + 1]; if (!nb) return null; return nb.kind === 'write' ? 'Escribir' : nb.kind === 'warmup' ? 'Calentamiento' : (L.exerciseById(cur, nb.exerciseId)?.name || 'Lección'); });

  let timer = null;
  function onanswer(given) {
    if (result) return;
    result = answer(given);
    if (result.ok && item.kind !== 'restaurar' && item.kind !== 'leer') { timer = setTimeout(advance, reduce ? 500 : 800); }
  }
  async function advance() {
    clearTimeout(timer); timer = null;
    if (!result) return;
    if (r.j + 1 < total) { result = null; nextItem(); return; }
    // the block is done: a moment on the fourth colour, then on
    const ok = okSoFar, n = total;
    moment = block.drill === 'leer' ? { title: 'Leído.', sub: ex ? `${ex.name} queda hecho.` : '' } : block.drill === 'restaurar' ? { title: `${L.cap(L.numWord(n))} ${L.unitLabel('textos', n)} ${n === 1 ? 'restaurado' : 'restaurados'}.`, sub: '' } : { title: `${L.cap(L.numWord(ok))} de ${L.numWord(n)}.`, sub: ok === n ? 'Todas.' : ok >= n * 0.8 ? 'Casi todas. Las que fallaste vuelven pronto.' : 'Las que fallaste vuelven en el calentamiento.' };
    moment.then = last ? 'Cerrando la sesión' : `Ahora: ${nextName}`;
    await new Promise((res) => setTimeout(res, reduce ? 900 : 1500));
    moment = null;
    if (last) finish(); else withTransition(nextBlock);
  }
  async function finish() { const s = await finishRun(); navigate('hecho/' + s.id); }
  async function skipWrite() { if (last) finish(); else withTransition(nextBlock); }
  function leave() { discardRun(); navigate('hoy'); }
  async function endEarly() { const s = await finishRun(); if (s.blocks.length) navigate('hecho/' + s.id); else navigate('hoy'); }
</script>

{#if r && block}
  <div class="session" style={`view-transition-name: block-${block.kind}`}>
    <div class="s-top {color}">
      <span class="k">Paso {r.i + 1} de {r.plan.blocks.length} · {stepLabel}</span>
      {#if block.kind !== 'write' && total && !showIntro}<span class="k num">{Math.min(r.j + 1, total)} de {total}</span>{/if}
    </div>
    {#if block.kind !== 'write' && total && !showIntro}
      <div class="segs {color}" aria-hidden="true">{#each Array(total) as _, i}<i class:done={i < r.j} class:on={i === r.j}></i>{/each}</div>
    {/if}

    <div class="s-body">
      {#if block.kind === 'write'}
        <Escribir form={block.form} onsaved={skipWrite} onskip={skipWrite} />
      {:else if showIntro}
        <Ficha {ex} {ficha} intro onstart={startDrill} />
      {:else if !items}
        <p class="mute wait">Preparando…</p>
      {:else if !item}
        <p class="mute wait">No hay material para este tema todavía.</p>
        <button class="btn" onclick={skipWrite}>Seguir</button>
      {:else}
        {#key r.i + '/' + r.j}
          <div class="item" in:fly={{ y: 10, duration: reduce ? 0 : 200 }}>
            {#if item.kind === 'tildes'}<Tildes {item} {result} {onanswer} />
            {:else if item.kind === 'silabas'}<Silabas {item} {result} {onanswer} />
            {:else if item.kind === 'pares'}<Pares {item} {result} {onanswer} />
            {:else if item.kind === 'letras'}<Letras {item} {result} {onanswer} />
            {:else if item.kind === 'restaurar'}<Restaurar {item} {result} {onanswer} />
            {:else if item.kind === 'leer'}<Leer {item} {ex} {result} {onanswer} />{/if}
          </div>
        {/key}
      {/if}
    </div>

    {#if block.kind !== 'write'}
      <div class="s-bottom">
        <div class="acts">
          {#if confirm}
            <span class="small">¿Salir?</span>
            <button class="btn text" onclick={endEarly}>Guardar lo hecho y salir</button>
            <button class="btn text dim" onclick={leave}>Descartar todo</button>
            <button class="btn text dim" onclick={() => (confirm = false)}>Seguir</button>
          {:else}
            <button class="btn text dim" onclick={() => (confirm = true)}>Salir</button>
            {#if ruleCard && !showIntro}<button class="btn text dim" onclick={() => (rule = true)}>Ver la regla</button>{/if}
            {#if result}<button class="btn next" onclick={advance}>{r.j + 1 < total ? 'Siguiente →' : last ? 'Terminar →' : `Ahora: ${nextName} →`}</button>{/if}
          {/if}
        </div>
      </div>
    {/if}

    {#if rule && ruleCard}
      <Sheet title="La regla" onclose={() => (rule = false)}><Ficha ex={ruleCard.ex} ficha={ruleCard.ficha} /></Sheet>
    {/if}

    {#if moment}
      <div class="moment" transition:fade={{ duration: reduce ? 0 : 180 }}>
        <div class="moment-in" in:fly={{ y: reduce ? 0 : 18, duration: reduce ? 0 : 320, delay: 80 }}>
          <div class="k">{moment.then}</div>
          <div class="big">{moment.title}</div>
          {#if moment.sub}<div class="sub">{moment.sub}</div>{/if}
        </div>
      </div>
    {/if}
  </div>
{/if}

<style>
  .session { position: relative; min-height: 100vh; display: flex; flex-direction: column; padding: calc(var(--pad) + var(--safe-top)) var(--pad) calc(var(--pad) + var(--safe-bottom)); }
  .s-top { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
  .s-top.c1 { color: var(--c1); } .s-top.c2 { color: var(--c2); } .s-top.c3 { color: var(--c3); }
  .segs { margin-top: 10px; }
  .segs.c1 { color: var(--c1); } .segs.c2 { color: var(--c2); } .segs.c3 { color: var(--c3); }
  .s-body { flex: 1; display: flex; flex-direction: column; justify-content: center; margin: 20px 0; }
  .wait { text-align: center; }
  .s-bottom { margin-top: 8px; }
  .acts { display: flex; gap: 18px; align-items: center; flex-wrap: wrap; }
  .acts .next { margin-left: auto; }
  .moment { position: absolute; inset: 0; z-index: 5; background: var(--c4); color: var(--c4-ink); display: grid; align-content: end; padding: var(--pad); padding-bottom: calc(var(--pad) * 2 + var(--safe-bottom)); }
  .moment .k { opacity: .75; }
  .moment .big { font-weight: 700; line-height: .95; letter-spacing: -.035em; font-size: clamp(44px, 9vw, 120px); margin-top: 10px; max-width: 14ch; }
  .moment .sub { margin-top: 14px; font-size: clamp(16px, 2vw, 22px); opacity: .9; max-width: 40ch; }
  @media (max-width: 599px) { .acts { width: 100%; } .acts .next { width: 100%; margin-left: 0; } }
</style>
