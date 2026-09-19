<script>
  let { item, result, onanswer } = $props();
  const chars = $derived(result ? [...item.w] : [...item.bare]);
</script>

<div class="drill">
  <div class="k mute">{result ? (result.ok ? 'Bien' : 'No') : '¿Dónde va la tilde?'}</div>
  <div class="word" aria-label={result ? item.w : item.bare}>
    {#each chars as c, i}
      {#if !result && item.vowels.includes(i)}<button class="v" onclick={() => onanswer(i)} aria-label={`Tilde en la ${c}`}>{c}</button>
      {:else}<span class:acc={result && i === item.answer} class:wrong={result && !result.ok && i === result.given && result.given !== item.answer}>{c}</span>{/if}
    {/each}
  </div>
  {#if result}
    <p class="why">{result.why}</p>
  {:else}
    <div class="opts"><button class="opt" onclick={() => onanswer(-1)}>No lleva tilde</button></div>
  {/if}
</div>

<style>
  .drill { display: grid; gap: 18px; justify-items: center; text-align: center; }
  .word { font-weight: 700; line-height: 1; letter-spacing: -.04em; font-size: clamp(56px, 14vw, 176px); display: flex; flex-wrap: wrap; justify-content: center; }
  .word .v { border-bottom: .06em solid var(--c1); margin-bottom: -.06em; transition: color var(--t); }
  .word .v:hover { color: var(--c1); }
  .word .acc { color: var(--c1); }
  .word .wrong { color: var(--c2); text-decoration: line-through; text-decoration-thickness: .06em; }
  .why { font-size: clamp(17px, 2vw, 22px); max-width: 40ch; }
</style>
