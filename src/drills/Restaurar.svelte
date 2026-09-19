<script>
  let { item, result, onanswer } = $props();
  let given = $state({ post: {}, pre: {}, cap: {} });
  const cycle = (list, cur) => { const i = list.indexOf(cur); return i < 0 || i === list.length - 1 ? '' : list[i + 1]; };
  function tapPost(k) { if (result) return; const cur = given.post[k] || ''; given.post = { ...given.post, [k]: cur === '' ? item.options[0] : cycle(item.options, cur) }; }
  function tapPre(k) { if (result) return; const cur = given.pre[k] || ''; given.pre = { ...given.pre, [k]: cur === '' ? item.opens[0] : cycle(item.opens, cur) }; }
  function tapCap(k) { if (result) return; given.cap = { ...given.cap, [k]: given.cap[k] ? 0 : 1 }; }
  const markFor = (k) => result ? result.marks.find((m) => m.k === k) : null;
  const shownWord = (x, k) => item.caps && (given.cap[k] || (result && x.cap)) ? x.w.charAt(0).toUpperCase() + x.shown.slice(1) : x.shown;
  const placed = $derived(Object.values(given.post).filter(Boolean).length + Object.values(given.pre).filter(Boolean).length + Object.values(given.cap).filter(Boolean).length);
</script>

<div class="drill">
  <div class="k mute">{result ? result.why : item.caps ? 'Toca las palabras que van con mayúscula' : `Toca entre las palabras para poner ${item.options.length === 1 ? 'el signo' : 'los signos'} · ${item.total} en total`}</div>
  <p class="text" class:checked={!!result}>
    {#each item.words as x, k}
      {@const m = markFor(k)}
      {#if item.opens.length}<button class="gap pre" class:set={!!given.pre[k]} onclick={() => tapPre(k)} aria-label="Signo de apertura">{given.pre[k] || (result ? '' : '·')}{#if m?.wantPre}<mark class="miss">{m.wantPre}</mark>{/if}{#if m?.extraPre}<mark class="extra">{m.extraPre}</mark>{/if}</button>{/if}
      <span class="w"><span class="keep">{x.keepPre}</span>{#if item.caps}<button class="cap" class:on={!!given.cap[k]} class:miss={m?.want === 'A'} class:extra={m?.extra === 'A'} onclick={() => tapCap(k)}>{shownWord(x, k)}</button>{:else}{x.shown}{/if}<span class="keep">{x.keepPost}</span></span>
      {#if !item.caps}<button class="gap" class:set={!!given.post[k]} onclick={() => tapPost(k)} aria-label="Signo de cierre">{given.post[k] || (result ? '' : '·')}{#if m?.want && m.want !== 'A'}<mark class="miss">{m.want}</mark>{/if}{#if m?.extra && m.extra !== 'A'}<mark class="extra">{m.extra}</mark>{/if}</button>{/if}
      {' '}
    {/each}
  </p>
  <div class="foot">
    <span class="small mute">Texto de <a class="ext" href={item.url} target="_blank" rel="noopener">FundéuRAE ↗</a>, CC BY-SA.{#if result && !result.ok} Lo que faltaba va en granate; lo que sobraba, tachado.{/if}</span>
    {#if !result}<button class="btn" onclick={() => onanswer($state.snapshot(given))} disabled={!placed}>Comprobar</button>{/if}
  </div>
</div>

<style>
  .drill { display: grid; gap: 18px; max-width: 820px; margin: 0 auto; width: 100%; }
  .text { font-size: clamp(20px, 2.6vw, 28px); font-weight: 500; line-height: 1.7; letter-spacing: -.01em; }
  .w { white-space: nowrap; }
  .keep { opacity: .7; }
  .gap { display: inline-block; min-width: .8em; text-align: center; color: var(--faint); font-weight: 700; border-radius: 4px; padding: 0 .1em; line-height: 1.2; vertical-align: baseline; }
  .gap.pre { margin-right: -.1em; }
  .gap:not(.set):hover { background: var(--paper-2); color: var(--mute); }
  .gap.set { color: var(--c1); background: var(--paper-2); }
  .checked .gap { color: var(--c1); background: none; min-width: 0; }
  .cap { font: inherit; border-bottom: 2px dotted var(--line); }
  .cap.on { color: var(--c1); border-bottom-color: var(--c1); }
  .checked .cap { border-bottom: 0; }
  mark { background: none; font-weight: 700; padding: 0 .05em; }
  mark.miss { color: var(--c2); text-decoration: underline; text-underline-offset: .15em; }
  mark.extra { color: var(--c1); text-decoration: line-through; }
  .cap.miss { color: var(--c2); text-decoration: underline; }
  .cap.extra { color: var(--c1); text-decoration: line-through; }
  .foot { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; }
</style>
