<script>
  let { item, result, onanswer } = $props();
  const cls = (o) => !result ? '' : o === item.answer ? 'hit' : o === result.given ? 'miss' : 'dim';
  const label = (o) => (o === '' ? 'nada' : o);
</script>

<div class="drill">
  <div class="k mute">{result ? (result.ok ? 'Bien' : 'No') : '¿Qué letra falta?'}</div>
  <div class="word">{item.before}<span class="gap">{result ? item.answer : '_'}</span>{item.after}</div>
  {#if result}<p class="why">{result.why}</p>{/if}
  <div class="opts">{#each item.options as o}<button class="opt {cls(o)}" onclick={() => onanswer(o)} disabled={!!result}>{label(o)}</button>{/each}</div>
</div>

<style>
  .drill { display: grid; gap: 18px; justify-items: center; text-align: center; }
  .word { font-weight: 700; line-height: 1; letter-spacing: -.04em; font-size: clamp(48px, 12vw, 160px); }
  .gap { color: var(--c1); }
  .why { font-size: clamp(17px, 2vw, 22px); }
</style>
