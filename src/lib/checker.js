// Spelling and grammar check through a LanguageTool server (LGPL). The public API asks for a visible
// link back to languagetool.org, which the writing screen shows. A self-hosted URL works the same.
export async function checkText(text, endpoint = 'https://api.languagetool.org/v2', { signal } = {}) {
  const body = new URLSearchParams({ language: 'es', text, level: 'default' });
  const r = await fetch(endpoint.replace(/\/$/, '') + '/check', { method: 'POST', body, signal });
  if (!r.ok) throw new Error(`El corrector respondió ${r.status}`);
  const data = await r.json();
  return (data.matches || []).map((m) => ({
    offset: m.offset, length: m.length,
    text: text.slice(m.offset, m.offset + m.length),
    message: m.message,
    short: m.shortMessage || '',
    fixes: (m.replacements || []).slice(0, 3).map((x) => x.value),
    type: m.rule?.issueType || 'other',
    rule: m.rule?.id || '',
  }));
}

// A plain sentence per issue, for the list under the text.
export function issueLine(i) {
  const fix = i.fixes.length ? ` → ${i.fixes.join(', ')}` : '';
  return `«${i.text}»${fix}: ${i.message}`;
}
