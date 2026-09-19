<script>
  let { item, result, onanswer } = $props();
  const cls = (o) => !result ? '' : o.toLowerCase() === item.answer.toLowerCase() ? 'hit' : o === result.given ? 'miss' : 'dim';
</script>

<div class="drill">
  <div class="k mute">{result ? (result.ok ? 'Bien' : 'No') : '¿Cuál va aquí?'}</div>
  <p class="sent">{item.before}<span class="blank" class:filled={!!result}>{result ? item.m : '_____'}</span>{item.after}</p>
  <div class="opts">{#each item.options as o}<button class="opt {cls(o)}" onclick={() => onanswer(o)} disabled={!!result}>{o}</button>{/each}</div>
  <p class="small mute src">Frase de <a class="ext" href={item.url} target="_blank" rel="noopener">FundéuRAE ↗</a>, CC BY-SA.</p>
</div>

<style>
  .drill { display: grid; gap: 22px; justify-items: center; text-align: center; max-width: 760px; margin: 0 auto; }
  .sent { font-size: clamp(22px, 3.2vw, 34px); font-weight: 500; line-height: 1.3; letter-spacing: -.01em; }
  .blank { display: inline-block; min-width: 3ch; border-bottom: 3px solid var(--c1); color: var(--c1); font-weight: 700; letter-spacing: .05em; margin: 0 .15em; }
  .blank.filled { letter-spacing: -.01em; }
  .src { margin-top: 4px; }
</style>
