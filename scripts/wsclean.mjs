// Rendered Wikisource HTML → plain text. Lines of verse stay lines; paragraphs and stanzas are separated by a blank line.
const unesc = (s) => s.replace(/&nbsp;/g, ' ').replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(n)).replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

// Rendered HTML → plain text. Lines of verse stay lines; paragraphs and stanzas are separated by a blank line.
export function clean(html) {
  let s = html.replace(/<!--[\s\S]*?-->/g, '');
  s = s.replace(/<(script|style|table|sup|span class="mw-editsection"[^>]*)[\s\S]*?<\/\1>/gi, '');
  s = s.replace(/<div[^>]*class="[^"]*(noprint|navbox|catlinks|mw-references|toc|licencia|ws-noexport|headertemplate|encabezado|cabecera)[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '');
  s = s.replace(/<(h[1-6])[^>]*>[\s\S]*?<\/\1>/gi, '\n\n');
  s = s.replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>|<\/div>|<\/li>/gi, '\n\n').replace(/<[^>]+>/g, '');
  s = unesc(s).split('\n').map((l) => l.replace(/\s+/g, ' ').trim()).join('\n');
  s = s.replace(/\n{3,}/g, '\n\n').trim();
  // drop leading header junk (title repeated, "de Autor", editorial notes) until the first real line
  const lines = s.split('\n');
  while (lines.length && /^(Categoría|Obtenido de|Esta página|Contenido|de [A-ZÁ]|\[|«)/.test(lines[0])) lines.shift();
  return lines.join('\n').trim();
}

