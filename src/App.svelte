<script>
  import { onMount } from 'svelte';
  import { db, load } from './lib/store.svelte.js';
  import { loadRun } from './lib/run.svelte.js';
  import { ui, applyTheme } from './lib/ui.svelte.js';
  import Toast from './components/Toast.svelte';
  import Hoy from './routes/Hoy.svelte';
  import Sesion from './routes/Sesion.svelte';
  import Hecho from './routes/Hecho.svelte';
  import Camino from './routes/Camino.svelte';
  import Muestras from './routes/Muestras.svelte';
  import Muestra from './routes/Muestra.svelte';
  import Diario from './routes/Diario.svelte';
  import Ajustes from './routes/Ajustes.svelte';

  const views = { hoy: Hoy, sesion: Sesion, hecho: Hecho, camino: Camino, muestras: Muestras, muestra: Muestra, diario: Diario, ajustes: Ajustes };
  let ready = $state(false);
  const View = $derived(views[ui.route.name] || Hoy);

  onMount(async () => {
    await load();
    loadRun();
    applyTheme(db.settings.theme);
    ready = true;
  });
</script>

{#if ready}
  {#key ui.route.name + '/' + (ui.route.id || '')}
    <View id={ui.route.id} />
  {/key}
{/if}
<Toast />
