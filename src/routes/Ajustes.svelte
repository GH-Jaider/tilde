<script>
  import Mast from '#components/Mast.svelte';
  import { db, cur, setSettings, exportBackup, importBackup, wipe } from '#lib/store.svelte.js';
  import { toast, applyTheme } from '#lib/ui.svelte.js';
  import * as L from '#lib/logic.js';

  let confirm = $state(null);
  async function doExport() {
    const text = await exportBackup();
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
    a.download = `tilde-copia-${L.todayKey()}.json`;
    document.body.append(a); a.click(); a.remove();
    toast('Copia lista');
  }
  async function doImport(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    try { await importBackup(await f.text()); applyTheme(db.settings.theme); toast('Copia restaurada'); }
    catch (err) { toast(err.message || 'No se pudo leer ese archivo'); }
    e.target.value = '';
  }
  async function erase() { await wipe(); localStorage.removeItem('tilde.run'); confirm = null; toast('Borrado'); }
</script>

<Mast meta="Ajustes" />
<main class="page wrap">
  <div class="k mute">Tilde</div>
  <h1 class="h-poster" style="margin-top:6px">Ajustes</h1>

  <section class="group">
    <span class="k mute">Sesión</span>
    <div class="field"><div><span class="lbl">Calentamiento</span><div class="hint">Palabras con tilde de las reglas que ya viste</div></div><select value={db.settings.warmupCount} onchange={(e) => setSettings({ warmupCount: Number(e.target.value) })}>{#each [0, 5, 10, 15, 20] as v}<option value={v}>{v ? `${v} palabras` : 'Sin calentamiento'}</option>{/each}</select></div>
    <div class="field"><div><span class="lbl">Lección</span><div class="hint">Palabras por sesión; las frases y los textos van a la mitad y a la décima parte</div></div><select value={db.settings.lessonItems} onchange={(e) => setSettings({ lessonItems: Number(e.target.value) })}>{#each [10, 15, 20, 30, 40] as v}<option value={v}>{v} palabras</option>{/each}</select></div>
    <div class="field"><span class="lbl">Escribir al final</span><div class="seg"><button class:on={db.settings.writing !== false} onclick={() => setSettings({ writing: true })}>Sí</button><button class:on={db.settings.writing === false} onclick={() => setSettings({ writing: false })}>No</button></div></div>
    <div class="field"><div><span class="lbl">Días a la semana</span><div class="hint">Los demás son de reserva, no fallos</div></div><select value={db.settings.weeklyGoal} onchange={(e) => setSettings({ weeklyGoal: Number(e.target.value) })}>{#each [3, 4, 5, 6, 7] as v}<option value={v}>{v} de 7</option>{/each}</select></div>
  </section>

  <section class="group">
    <span class="k mute">Pantalla</span>
    <div class="field"><span class="lbl">Tema</span><div class="seg">{#each [['auto', 'Auto'], ['light', 'Claro'], ['dark', 'Oscuro']] as [v, l]}<button class:on={db.settings.theme === v} onclick={() => { applyTheme(v); setSettings({ theme: v }); }}>{l}</button>{/each}</div></div>
  </section>

  <section class="group">
    <span class="k mute">Corrector</span>
    <div class="field col"><div><span class="lbl">Servidor de LanguageTool</span><div class="hint">El público sirve para uso personal y pide un enlace visible, que la app muestra. Si instalas uno propio, pon aquí su dirección.</div></div><input type="url" value={db.settings.checker} onchange={(e) => setSettings({ checker: e.target.value.trim() || 'https://api.languagetool.org/v2' })} style="max-width:100%"></div>
  </section>

  <section class="group">
    <span class="k mute">Datos</span>
    <div class="field"><div><span class="lbl">Exportar copia</span><div class="hint">Un archivo JSON con sesiones, progreso y textos</div></div><button class="btn line sm" onclick={doExport}>Exportar</button></div>
    <div class="field"><div><span class="lbl">Importar copia</span><div class="hint">Reemplaza todo lo de este dispositivo</div></div><label class="btn line sm">Elegir archivo<input class="sr" type="file" accept="application/json,.json" onchange={doImport}></label></div>
    <div class="field"><div><span class="lbl" style="color:var(--c2)">Empezar de cero</span><div class="hint">Borra sesiones, progreso, textos y ajustes de este dispositivo</div></div>
      {#if confirm === 'erase'}<span style="display:flex;gap:12px"><button class="btn text" style="color:var(--c2)" onclick={erase}>Sí, de cero</button><button class="btn text dim" onclick={() => (confirm = null)}>Dejar</button></span>
      {:else}<button class="btn line sm" onclick={() => (confirm = 'erase')}>Empezar de cero</button>{/if}
    </div>
  </section>

  <section class="group">
    <span class="k mute">Cómo funciona Tilde</span>
    <p class="small mute" style="margin-top:10px">{cur.spine} Cada tema tiene una cuota; cuando la alcanzas, el camino pasa al siguiente. Las respuestas correctas salen del diccionario colombiano de RLA-ES, de textos de FundéuRAE y de la métrica, nunca de nosotros. Todo queda en este dispositivo salvo el texto que mandas a revisar.</p>
  </section>

  <section class="group">
    <span class="k mute">Fuentes</span>
    <p class="small mute" style="margin-top:10px">FundéuRAE y Wikilengua (CC BY-SA), Wikipedia (CC BY-SA 4.0), Wikisource (dominio público, transcripciones CC BY-SA 4.0), RLA-ES (GPL/LGPL/MPL), FrequencyWords (CC BY-SA), LanguageTool (LGPL). Tilde no está afiliada a la RAE ni a FundéuRAE. El contenido derivado es CC BY-SA; el código, MIT.</p>
  </section>
</main>

<style>
  .group { margin-top: 32px; max-width: 720px; }
  .group > .k { display: block; margin-bottom: 6px; }
</style>
