<script>
  let { item, result, onanswer } = $props();
</script>

<div class="drill">
  <div class="k mute">{result ? (result.ok ? 'Bien' : 'No') : '¿Cuántas sílabas?'}</div>
  <div class="word">{result ? item.syllables.join('·') : item.w}</div>
  {#if result}
    <p class="why">{result.why}</p>
  {:else}
    <div class="opts">{#each [1, 2, 3, 4, 5, 6] as n}<button class="opt" onclick={() => onanswer(n)}>{n}</button>{/each}</div>
  {/if}
</div>

<style>
  .drill { display: grid; gap: 18px; justify-items: center; text-align: center; }
  .word { font-weight: 700; line-height: 1; letter-spacing: -.04em; font-size: clamp(48px, 12vw, 160px); }
  .why { font-size: clamp(17px, 2vw, 22px); max-width: 40ch; }
</style>
