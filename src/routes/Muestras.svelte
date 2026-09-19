<script>
  import Mast from '#components/Mast.svelte';
  import formas from '../content/formas.json';
  import muestras from '../content/muestras.json';
  const groups = [
    ['Poesía con forma fija', ['haiku', 'tanka', 'copla', 'cuarteta', 'redondilla', 'seguidilla', 'decima', 'lira', 'soneto', 'romance']],
    ['Poesía sin medida fija', ['verso-libre', 'rima', 'cancion', 'poema-narrativo']],
    ['Prosa breve', ['microrrelato', 'cuento', 'fabula', 'aforismo', 'greguería', 'carta', 'cronica', 'diario', 'ensayo']],
  ];
  const byId = Object.fromEntries(formas.map((f) => [f.id, f]));
  const examples = (id) => muestras.filter((m) => m.form === id).length;
</script>

<Mast meta={`${formas.length} formas · ${muestras.length} muestras`} />
<main class="page wrap">
  <div class="k mute">Cómo se conforman las cosas que se escriben</div>
  <h1 class="h-poster" style="margin-top:6px">Muestras</h1>
  <p class="lead" style="margin-top:12px">Cada forma con lo que es, cómo se arma y un ejemplo real de dominio público. Las que tienen medida traen la cuenta de sílabas al margen, y puedes escribir una con la cuenta en vivo.</p>
  {#each groups as [name, ids]}
    <section class="group">
      <span class="k mute">{name}</span>
      <div class="list">
        {#each ids as id}
          {@const f = byId[id]}
          {#if f}
            <a class="row" href={'#/muestra/' + id}>
              <div class="nm">{f.name}</div>
              <div class="sb">{f.shape}</div>
              <div class="ct small mute">{examples(id) ? `${examples(id)} ${examples(id) === 1 ? 'muestra' : 'muestras'}` : 'sin muestra aún'}</div>
            </a>
          {/if}
        {/each}
      </div>
    </section>
  {/each}
</main>

<style>
  .group { margin-top: 32px; }
  .group > .k { display: block; margin-bottom: 8px; }
  .list { border-top: 2px solid var(--ink); }
  .row { display: grid; grid-template-columns: 160px minmax(0, 1fr) auto; gap: 14px; align-items: baseline; padding: 14px 0; border-bottom: 1px solid var(--line); }
  .row:hover .nm { color: var(--c2); }
  .nm { font-weight: 700; font-size: clamp(18px, 2.2vw, 24px); letter-spacing: -.02em; }
  .sb { color: var(--mute); font-size: 15px; }
  .ct { white-space: nowrap; }
  @media (max-width: 599px) { .row { grid-template-columns: minmax(0, 1fr) auto; } .sb { grid-column: 1 / -1; } }
</style>
