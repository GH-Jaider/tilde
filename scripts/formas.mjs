// Fetches the opening summary of each literary form from es.wikipedia.org (CC BY-SA 4.0) into content/formas.json.
// Usage: node scripts/formas.mjs
import { writeFileSync, mkdirSync } from 'node:fs';

const UA = 'tilde-content-collector/0.1 (personal project by GH-Jaider on GitHub; runs once)';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// id, display name, Wikipedia article, the shape in one line (our own words), metre pattern when it is fixed.
const FORMS = [
  { id: 'haiku', name: 'Haiku', article: 'Haiku', shape: 'Tres versos de 5, 7 y 5 sílabas. Una imagen del presente, casi siempre con una señal de la estación.', pattern: [5, 7, 5] },
  { id: 'tanka', name: 'Tanka', article: 'Tanka', shape: 'Cinco versos de 5, 7, 5, 7 y 7 sílabas. Un haiku que sigue dos versos más.', pattern: [5, 7, 5, 7, 7] },
  { id: 'soneto', name: 'Soneto', article: 'Soneto', shape: 'Catorce endecasílabos: dos cuartetos y dos tercetos. El último terceto suele dar la vuelta a todo.', pattern: Array(14).fill(11) },
  { id: 'romance', name: 'Romance', article: 'Romance (poesía)', shape: 'Versos octosílabos sin límite, con rima asonante en los pares. La forma de contar historias en verso.', pattern: null, verse: 8 },
  { id: 'copla', name: 'Copla', article: 'Copla', shape: 'Cuatro octosílabos con rima asonante en los pares. Cabe en la memoria y se canta.', pattern: [8, 8, 8, 8] },
  { id: 'cuarteta', name: 'Cuarteta', article: 'Cuarteta', shape: 'Cuatro octosílabos con rima consonante cruzada (ABAB).', pattern: [8, 8, 8, 8] },
  { id: 'redondilla', name: 'Redondilla', article: 'Redondilla', shape: 'Cuatro octosílabos con rima abrazada (ABBA).', pattern: [8, 8, 8, 8] },
  { id: 'decima', name: 'Décima', article: 'Décima (poesía)', shape: 'Diez octosílabos con rima ABBAACCDDC. La estrofa de los repentistas y del canto popular.', pattern: Array(10).fill(8) },
  { id: 'seguidilla', name: 'Seguidilla', article: 'Seguidilla', shape: 'Cuatro versos de 7, 5, 7 y 5 sílabas. Ligera, para cantar.', pattern: [7, 5, 7, 5] },
  { id: 'lira', name: 'Lira', article: 'Lira (poesía)', shape: 'Cinco versos de 7, 11, 7, 7 y 11 sílabas con rima aBabB.', pattern: [7, 11, 7, 7, 11] },
  { id: 'verso-libre', name: 'Verso libre', article: 'Verso libre', shape: 'Sin medida ni rima fijas. El ritmo lo ponen las pausas y las repeticiones.', pattern: null },
  { id: 'rima', name: 'Rima', article: 'Rima', shape: 'Poema breve de tono íntimo, de metro variable. Bécquer le dio el nombre.', pattern: null },
  { id: 'fabula', name: 'Fábula', article: 'Fábula', shape: 'Relato breve, muchas veces en verso, con animales que hablan y una moraleja al final.', pattern: null },
  { id: 'microrrelato', name: 'Microrrelato', article: 'Microrrelato', shape: 'Un cuento de pocas líneas. Todo lo que no se dice trabaja.', pattern: null },
  { id: 'cuento', name: 'Cuento', article: 'Cuento', shape: 'Narración breve con pocos personajes y un solo conflicto que se resuelve.', pattern: null },
  { id: 'aforismo', name: 'Aforismo', article: 'Aforismo', shape: 'Una frase que se sostiene sola. Máximas, proverbios, cantares.', pattern: null },
  { id: 'greguería', name: 'Greguería', article: 'Greguería', shape: 'Metáfora más humor en una sola frase. La inventó Ramón Gómez de la Serna.', pattern: null },
  { id: 'carta', name: 'Carta', article: 'Carta', shape: 'Lugar y fecha, saludo, cuerpo, despedida y firma. Alguien le escribe a alguien.', pattern: null },
  { id: 'cronica', name: 'Crónica', article: 'Crónica (género periodístico)', shape: 'Cuenta hechos reales en orden, con la mirada de quien estuvo allí.', pattern: null },
  { id: 'diario', name: 'Diario', article: 'Diario personal', shape: 'Una entrada por día, en primera persona, sin más lector que uno mismo.', pattern: null },
  { id: 'ensayo', name: 'Ensayo', article: 'Ensayo', shape: 'Prosa que piensa en voz alta sobre un tema, sin pretender agotarlo.', pattern: null },
  { id: 'cancion', name: 'Canción', article: 'Canción (lírica)', shape: 'Estrofas iguales, a veces con estribillo. Hecha para la música o para sonar como ella.', pattern: null },
  { id: 'poema-narrativo', name: 'Poema narrativo', article: 'Poesía narrativa', shape: 'Un poema que cuenta una historia con principio y final.', pattern: null },
];

const out = [];
for (const f of FORMS) {
  try {
    let r;
    for (let t = 0; t < 5; t++) {
      r = await fetch('https://es.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(f.article.replace(/ /g, '_')), { headers: { 'user-agent': UA } });
      if (r.status !== 429) break;
      await sleep(4000 * (t + 1));
    }
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const d = await r.json();
    out.push({ ...f, wikipedia: { title: d.title, url: d.content_urls?.desktop?.page, extract: d.extract, license: 'CC BY-SA 4.0' } });
    console.log('ok', f.id, '←', d.title, `(${d.extract.length} chars)`);
  } catch (e) { out.push({ ...f, wikipedia: null }); console.log('fail', f.id, f.article, e.message); }
  await sleep(1500);
}
mkdirSync('content', { recursive: true });
writeFileSync('content/formas.json', JSON.stringify(out, null, 1));
console.log('saved', out.length, 'forms');
