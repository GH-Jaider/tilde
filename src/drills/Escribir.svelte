<script>
  import { run, setWriting, saveWriting } from '#lib/run.svelte.js';
  import { db } from '#lib/store.svelte.js';
  import { toast } from '#lib/ui.svelte.js';
  import { scan, fits } from '#lib/metrica.js';
  import { checkText, issueLine } from '#lib/checker.js';
  import formas from '../content/formas.json';
  import muestras from '../content/muestras.json';

  let { form, onsaved, onskip } = $props();
  const f = $derived(formas.find((x) => x.id === form) || formas[0]);
  const example = $derived(muestras.find((m) => m.form === f.id) || null);
  const exampleLines = $derived(example ? example.text.split('\n').filter(Boolean).slice(0, f.pattern ? f.pattern.length : 4) : []);
  let text = $state(run.current?.writing?.text || '');
  const lines = $derived(text.split('\n'));
  const metre = $derived(f.pattern ? fits(text, f.pattern) : null);
  const counts = $derived(!f.pattern && f.verse ? lines.map((l) => (l.trim() ? scan(l) : null)) : null);
  let issues = $state(null);
  let checking = $state(false);
  let saving = $state(false);
  function oninput(e) { text = e.target.value; setWriting(text); issues = null; }
  async function review() {
    if (!text.trim()) return;
    checking = true;
    try { issues = await checkText(text, db.settings.checker); }
    catch (err) { toast(err.message || 'No se pudo revisar'); }
    checking = false;
  }
  async function save() {
    if (!text.trim() || saving) return;
    saving = true;
    await saveWriting(f.id, text.trim());
    toast('Guardado en el diario');
    onsaved?.();
  }
  const what = $derived(f.id === 'soneto' ? 'un cuarteto' : f.id === 'haiku' ? 'un haiku' : `una ${f.name.toLowerCase()}`);
</script>

<div class="write">
  <div class="left">
    <div class="k mute">Escribir · {f.name}</div>
    <h1 class="h-big">{f.id === 'soneto' ? 'Un cuarteto' : f.id === 'haiku' ? 'Un haiku' : `Una ${f.name.toLowerCase()}`}</h1>
    <p class="lead">{f.shape}</p>
    {#if example}
      <div class="ex">
        <div class="k mute">Por ejemplo</div>
        {#each exampleLines as l}<div class="exl"><span>{l}</span>{#if f.pattern || f.verse}<b class="num">{scan(l).min}</b>{/if}</div>{/each}
        <div class="small mute">{example.author}, {example.year}. <a class="ext" href={example.url} target="_blank" rel="noopener">Wikisource ↗</a></div>
      </div>
    {/if}
  </div>
  <div class="right">
    <textarea value={text} {oninput} rows={f.pattern ? f.pattern.length + 1 : 6} placeholder={`Escribe ${what} aquí`} spellcheck="false"></textarea>
    {#if f.pattern}
      <div class="metre">{#each metre.lines as m, i}<span class="m" class:ok={m.fits} class:bad={!m.fits && m.text}><b class="num">{m.text ? (m.min === m.max ? m.min : `${m.min}–${m.max}`) : '·'}</b><small>de {f.pattern[i]}</small></span>{/each}{#if lines.length > f.pattern.length}<span class="m bad"><b>+{lines.length - f.pattern.length}</b><small>versos de más</small></span>{/if}</div>
      <p class="small mute">La cuenta va con sinalefa; cuando hay dos posibles, salen las dos. Aguda al final suma una; esdrújula resta una.</p>
    {:else if counts}
      <div class="metre">{#each counts as c}{#if c}<span class="m" class:ok={f.verse >= c.min && f.verse <= c.max}><b class="num">{c.min === c.max ? c.min : `${c.min}–${c.max}`}</b></span>{/if}{/each}</div>
    {/if}
    {#if issues}
      {#if issues.length}<ul class="issues">{#each issues as i}<li>{issueLine(i)}</li>{/each}</ul>
      {:else}<p class="small">El corrector no encontró nada.</p>{/if}
    {/if}
    <div class="acts">
      <button class="btn line sm" onclick={review} disabled={checking || !text.trim()}>{checking ? 'Revisando…' : 'Revisar ortografía'}</button>
      <button class="btn text dim" onclick={onskip}>Hoy no</button>
      <button class="btn" onclick={save} disabled={!text.trim() || saving}>Guardar →</button>
    </div>
    <p class="small mute">Revisión con <a class="ext" href="https://languagetool.org" target="_blank" rel="noopener">LanguageTool</a>. El texto se envía solo cuando pulsas Revisar.</p>
  </div>
</div>

<style>
  .write { display: grid; gap: 28px; max-width: 1180px; margin: 0 auto; width: 100%; }
  .left { display: grid; gap: 12px; align-content: start; }
  .ex { margin-top: 8px; display: grid; gap: 4px; max-width: 46ch; }
  .exl { display: flex; justify-content: space-between; gap: 16px; font-size: 18px; border-bottom: 1px solid var(--line); padding: 4px 0; }
  .exl b { color: var(--c3); }
  .right { display: grid; gap: 12px; align-content: start; }
  textarea { width: 100%; font-size: clamp(22px, 2.6vw, 30px); font-weight: 500; line-height: 1.35; letter-spacing: -.01em; background: transparent; border: 0; border-left: 4px solid var(--c3); padding: 4px 0 4px 16px; outline: none; resize: vertical; color: var(--ink); }
  textarea::placeholder { color: var(--faint); }
  .metre { display: flex; flex-wrap: wrap; gap: 14px; }
  .m { display: grid; justify-items: center; min-width: 48px; }
  .m b { font-size: 30px; font-weight: 700; line-height: 1; letter-spacing: -.03em; color: var(--faint); }
  .m.ok b { color: var(--c3); } .m.bad b { color: var(--c2); }
  .m small { font-size: 12px; color: var(--mute); margin-top: 2px; }
  .issues { margin: 0; padding-left: 18px; display: grid; gap: 6px; font-size: 15px; color: var(--c2); }
  .acts { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }
  .acts .btn:last-child { margin-left: auto; }
  @media (min-width: 900px) { .write { grid-template-columns: minmax(0, 1fr) minmax(0, 1.3fr); gap: 48px; } }
</style>
