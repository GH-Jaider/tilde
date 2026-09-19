<script>
  import Mast from '#components/Mast.svelte';
  import { db } from '#lib/store.svelte.js';
  import { run, startRun } from '#lib/run.svelte.js';
  import { navigate } from '#lib/ui.svelte.js';
  import { scan } from '#lib/metrica.js';
  import * as L from '#lib/logic.js';
  import formas from '../content/formas.json';
  import muestras from '../content/muestras.json';

  let { id } = $props();
  const f = $derived(formas.find((x) => x.id === id));
  $effect(() => { if (!f) navigate('muestras'); });
  const examples = $derived(f ? muestras.filter((m) => m.form === f.id) : []);
  const measured = $derived(!!(f && (f.pattern || f.verse)));
  const isVerse = (m) => !/^(carta|cuento|cronica|ensayo|diario|microrrelato)$/.test(m.form);
  const lines = (m) => m.text.split('\n');
  const count = (l) => { const s = scan(l); return s.min === s.max ? String(s.min) : `${s.min}–${s.max}`; };
  function write() { if (run.current) { navigate('sesion'); return; } startRun(L.writePlan(f.id)); navigate('sesion'); }
  const mine = $derived(f ? db.writings.filter((w) => w.form === f.id) : []);
</script>

{#if f}
  <Mast meta={f.name} />
  <main class="page wrap grid">
    <div class="top">
      <div class="k mute"><a href="#/muestras">Muestras</a> · {f.name}</div>
      <h1 class="h-poster" style="margin-top:6px">{f.name}</h1>
      <p class="lead" style="margin-top:14px"><b>Cómo se arma.</b> {f.shape}</p>
      {#if f.def}<p class="lead" style="margin-top:10px">{f.def} <a class="ext small" href={f.url} target="_blank" rel="noopener">Wikipedia, CC BY-SA ↗</a></p>{/if}
      <div class="acts"><button class="btn" onclick={write}>{f.id === 'soneto' ? 'Escribe un cuarteto' : f.id === 'haiku' ? 'Escribe un haiku' : `Escribe ${/a$/.test(f.name) ? 'una' : 'un'} ${f.name.toLowerCase()}`} →</button>{#if measured}<span class="small mute">Con la cuenta de sílabas en vivo.</span>{/if}</div>
    </div>
    <div class="side">
    {#if !examples.length}<p class="small mute" style="margin-top:36px">Todavía no hay una muestra de dominio público para esta forma.</p>{/if}
    {#each examples as m}
      <section class="ex">
        <div class="hd"><b>{m.title}</b><span class="small mute">{m.author}{m.year ? `, ${m.year}` : ''}{m.country ? ` · ${m.country}` : ''}</span></div>
        {#if isVerse(m)}
          <div class="verse" class:measured>{#each lines(m) as l}{#if l.trim()}<div class="vl"><span>{l}</span>{#if measured}<b class="num">{count(l)}</b>{/if}</div>{:else}<div class="gap"></div>{/if}{/each}</div>
        {:else}
          <div class="prose">{#each m.text.split('\n\n') as p}<p>{p}</p>{/each}{#if m.excerpt}<p class="small mute">Es el comienzo; el resto está en la fuente.</p>{/if}</div>
        {/if}
        <p class="small mute src">{m.license}. <a class="ext" href={m.url} target="_blank" rel="noopener">Wikisource ↗</a>{#if m.year && m.year < 1950} · Ortografía de su época: sirve para la forma, no como modelo de tildes.{/if}</p>
      </section>
    {/each}

    {#if mine.length}
      <section class="ex"><div class="hd"><b>Las tuyas</b></div>{#each mine as w}<pre class="mine">{w.text}</pre>{/each}</section>
    {/if}
    </div>
  </main>
{/if}

<style>
  .grid { display: grid; gap: 0 48px; align-items: start; }
  .acts { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; margin-top: 22px; }
  .ex { margin-top: 36px; max-width: 760px; }
  @media (min-width: 900px) { .grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr); } .top { position: sticky; top: calc(var(--mast) + 24px); } .side .ex:first-child { margin-top: 0; } }
  .hd { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; border-top: 2px solid var(--ink); padding-top: 10px; flex-wrap: wrap; }
  .hd b { font-size: 20px; letter-spacing: -.02em; }
  .verse { margin-top: 14px; font-size: clamp(18px, 2vw, 22px); line-height: 1.45; }
  .vl { display: flex; justify-content: space-between; gap: 18px; }
  .verse.measured .vl { border-bottom: 1px solid var(--line); padding: 4px 0; }
  .vl b { color: var(--c2); font-size: 15px; align-self: center; }
  .gap { height: 14px; }
  .prose { margin-top: 14px; font-size: 18px; line-height: 1.5; display: grid; gap: 12px; max-width: 64ch; }
  .src { margin-top: 12px; }
  .mine { font: inherit; font-size: 18px; white-space: pre-wrap; border-left: 4px solid var(--c3); padding-left: 14px; margin: 12px 0 0; }
</style>
