<script>
  import { cur } from '#lib/store.svelte.js';
  let { item, ex, result, onanswer } = $props();
  const href = (r) => (cur.sources[r.site] || '') + (r.site === 'fundeu' ? r.page + '/' : r.page);
</script>

<div class="drill">
  <div class="k mute">Lectura</div>
  <h1 class="h-poster">{ex?.name}</h1>
  <p class="lead">Tilde no muestra el texto: se lee en la fuente y se vuelve. Con una vez basta.</p>
  <div class="links">
    {#each item.read as r}<a class="btn line" href={href(r)} target="_blank" rel="noopener">{r.title} ↗</a>{/each}
  </div>
  {#if !result}<button class="btn" onclick={() => onanswer(true)}>Ya lo leí →</button>{:else}<p class="lead">Leído.</p>{/if}
</div>

<style>
  .drill { display: grid; gap: 18px; max-width: 760px; }
  .links { display: flex; flex-wrap: wrap; gap: 10px; }
</style>
