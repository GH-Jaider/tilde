<script>
  import { cur } from '#lib/store.svelte.js';
  import * as L from '#lib/logic.js';
  // ex: the exercise; ficha: its card; intro: the big first-time version with a start button
  let { ex, ficha, intro = false, onstart } = $props();
  const href = (r) => (cur.sources[r.site] || '') + (r.site === 'fundeu' ? r.page + '/' : r.page);
</script>

<div class="ficha" class:intro>
  <div class="k mute">{intro ? 'Antes del ejercicio · ' : ''}{L.exerciseContext(cur, ex)}</div>
  <h1 class={intro ? 'h-poster' : 'h-big'}>{ex.name}</h1>
  <p class="lead blurb">{ficha.blurb}</p>
  <ol class="points">{#each ficha.points as [b, t]}<li><span><b>{b}</b> {t}</span></li>{/each}</ol>
  {#if ficha.watch}<p class="watch"><b>Ojo.</b> {ficha.watch}</p>{/if}
  <div class="more">
    <span class="small mute">La versión completa:</span>
    {#each ex.read as r}<a class="ext small" href={href(r)} target="_blank" rel="noopener">{r.title} ↗</a>{/each}
  </div>
  {#if intro}<div class="go"><button class="btn" onclick={onstart}>Empezar el ejercicio →</button><span class="small mute">La ficha vuelve a salir la próxima vez, y después queda en «Ver la regla».</span></div>{/if}
</div>

<style>
  .ficha { display: grid; gap: 14px; max-width: 760px; }
  .ficha.intro { margin: 0 auto; width: 100%; }
  .blurb { max-width: 60ch; }
  .points { margin: 4px 0 0; padding: 0; list-style: none; counter-reset: s; display: grid; gap: 10px; font-size: 16px; }
  .points li { counter-increment: s; display: grid; grid-template-columns: 24px 1fr; gap: 8px; }
  .points li::before { content: counter(s); font-weight: 700; color: var(--c2); }
  .points b { font-weight: 700; }
  .watch { font-size: 16px; border-left: 4px solid var(--c1); padding-left: 12px; max-width: 60ch; }
  .more { display: flex; flex-wrap: wrap; gap: 6px 14px; align-items: baseline; }
  .go { display: flex; flex-wrap: wrap; gap: 14px; align-items: center; margin-top: 8px; }
</style>
