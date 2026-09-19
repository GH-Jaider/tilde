<script>
  import { ui } from '#lib/ui.svelte.js';
  let { meta = '' } = $props();
  const items = [['hoy', 'Hoy'], ['camino', 'Camino'], ['muestras', 'Muestras'], ['diario', 'Diario']];
  const on = (id) => ui.route.name === id || (id === 'muestras' && ui.route.name === 'muestra');
</script>

<header class="mast">
  <a class="brand" href="#/hoy">t<i>í</i>lde</a>
  <nav aria-label="Secciones">
    {#each items as [id, label]}<a href={'#/' + id} class:on={on(id)} data-label={label}><span>{label}</span></a>{/each}
  </nav>
  <span class="right"><span class="meta">{meta}</span><a class="gear" href="#/ajustes" aria-label="Ajustes" class:on={ui.route.name === 'ajustes'}><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="2.5"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2 2M16.4 16.4l2 2M5.6 18.4l2-2M16.4 7.6l2-2"/></svg></a></span>
</header>
