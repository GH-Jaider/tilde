<script>
  import Mast from '#components/Mast.svelte';
  import { db, cur, deleteSession, deleteWriting } from '#lib/store.svelte.js';
  import { toast } from '#lib/ui.svelte.js';
  import * as L from '#lib/logic.js';
  import formas from '../content/formas.json';

  const today = L.todayKey();
  const [Y, M] = today.split('-').map(Number);
  const monthName = L.cap(new Date(Y, M - 1, 1).toLocaleDateString('es-CO', { month: 'long' }));
  const daysInMonth = new Date(Y, M, 0).getDate();
  const firstDow = (new Date(Y, M - 1, 1).getDay() + 6) % 7;
  const totals = $derived(L.dayTotals(db.sessions));
  const monthDays = $derived(Array.from({ length: daysInMonth }, (_, i) => { const d = `${Y}-${String(M).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`; return { d, on: totals.has(d), now: d === today, future: d > today }; }));
  const thisMonth = $derived(monthDays.filter((x) => x.on).length);
  const days = $derived.by(() => {
    const map = new Map();
    for (const s of [...db.sessions].sort((a, b) => (b.start || b.date).localeCompare(a.start || a.date))) map.set(s.date, [...(map.get(s.date) || []), s]);
    for (const w of db.writings) if (!map.has(w.date)) map.set(w.date, []);
    return [...map.entries()].sort((a, b) => b[0].localeCompare(a[0]));
  });
  const formName = (id) => formas.find((f) => f.id === id)?.name || id;
  let confirmDel = $state(null);
  async function del(id) { await deleteSession(id); confirmDel = null; toast('Sesión borrada'); }
</script>

<Mast meta={`${monthName} · ${thisMonth} ${thisMonth === 1 ? 'día' : 'días'}`} />
<main class="page wrap">
  <div class="head">
    <div><div class="k mute">{monthName} · {thisMonth} {thisMonth === 1 ? 'día' : 'días'} · {db.writings.length} {db.writings.length === 1 ? 'texto' : 'textos'}</div><h1 class="h-poster" style="margin-top:6px">Diario</h1></div>
    <div class="month" role="img" aria-label={`${thisMonth} días en ${monthName}`}>
      {#each Array(firstDow) as _}<i class="blank"></i>{/each}
      {#each monthDays as d}<i class:on={d.on} class:now={d.now} class:blank={d.future}></i>{/each}
    </div>
  </div>

  {#if !db.sessions.length && !db.writings.length}
    <p class="lead" style="margin-top:32px">Nada todavía. Aquí van tus sesiones y lo que escribas, día por día.</p>
  {/if}

  <div class="days">
    {#each days as [date, list] (date)}
      {@const writings = db.writings.filter((w) => w.date === date)}
      <section class="day">
        <div class="hd"><b>{L.fmtDate(date)}</b></div>
        {#each writings as w (w.id)}
          <div class="wrote"><div class="k mute">{formName(w.form)}</div><pre>{w.text}</pre><button class="btn text dim" onclick={async () => { await deleteWriting(w.id); toast('Texto borrado'); }}>Borrar texto</button></div>
        {/each}
        <ul class="lines">
          {#each list as s (s.id)}
            <li>
              <span>{s.blocks.map((b) => L.blockSentence(cur, b)).join('  ·  ')}</span>
              {#if confirmDel === s.id}<span class="del"><button class="btn text dim" onclick={() => del(s.id)} style="color:var(--c2)">Borrar de verdad</button><button class="btn text dim" onclick={() => (confirmDel = null)}>Dejar</button></span>
              {:else}<button class="btn text dim" onclick={() => (confirmDel = s.id)}>Borrar</button>{/if}
            </li>
          {/each}
        </ul>
      </section>
    {/each}
  </div>
</main>

<style>
  .head { display: flex; justify-content: space-between; align-items: flex-end; gap: 20px; flex-wrap: wrap; }
  .days { display: grid; gap: 32px; margin-top: 32px; }
  .day .hd { display: flex; justify-content: space-between; align-items: baseline; border-top: 2px solid var(--ink); padding-top: 10px; gap: 12px; }
  .day .hd b { font-size: 20px; letter-spacing: -.02em; }
  .wrote { margin-top: 12px; display: grid; gap: 6px; justify-items: start; }
  .wrote pre { font: inherit; font-size: 20px; font-weight: 500; white-space: pre-wrap; margin: 0; border-left: 4px solid var(--c3); padding-left: 14px; }
  .lines { list-style: none; padding: 0; margin: 12px 0 0; display: grid; gap: 8px; font-size: 14px; color: var(--mute); }
  .lines li { display: flex; justify-content: space-between; gap: 12px; align-items: baseline; }
  .del { display: flex; gap: 12px; }
</style>
