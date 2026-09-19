# Tilde

Una lección al día para escribir bien en español: tildes, puntuación, mayúsculas, las letras que suenan igual, y una biblioteca de formas literarias para escribir cosas propias con seguridad. Hermana de [Kata](https://github.com/GH-Jaider/kata), hecha para un hablante nativo colombiano que nunca aprendió del todo a escribir.

Tilde no inventa lecciones. Indexa la estructura de la *Ortografía de la lengua española* (RAE y ASALE, 2010), manda a leer a fuentes abiertas y bien hechas, y construye ejercicios cuya respuesta correcta sale siempre de una fuente real: el diccionario, el texto original o la métrica.

## Cómo se usa

- **Hoy**: una sesión en pasos. Calentamiento con tildes de las reglas que ya viste, un tema del camino, y escribir algo corto si quieres. Empezar abre la sesión; cada respuesta se corrige al instante y explica la regla.
- **Camino**: las siete lecciones en el orden de la *Ortografía*, reordenadas para nativos: tilde, puntuación, mayúsculas, palabras juntas o separadas, letras que suenan igual (seseo y yeísmo), números, extranjerismos. Cada tema tiene sus páginas de lectura y una cuota; al alcanzarla, el camino sigue.
- **Muestras**: qué es cada forma (haiku, soneto, décima, copla, fábula, carta…), cómo se arma y un ejemplo real de dominio público con la cuenta de sílabas al margen. Desde ahí se escribe una, con la cuenta en vivo.
- **Diario**: los días, las sesiones y lo que escribiste.

Todo queda en el dispositivo. Solo sale de él el texto que mandas a revisar a LanguageTool cuando pulsas Revisar.

## Ejercicios

| Tipo | Qué haces | De dónde sale la respuesta |
|---|---|---|
| `tildes` | Tocas la vocal que lleva la tilde, o dices que no lleva | El diccionario colombiano de RLA-ES y las reglas de la *Ortografía* |
| `silabas` | Cuentas las sílabas | Silabeo según la RAE |
| `pares` | Eliges la palabra que va en una frase real (esta/está, porque/por qué) | El texto original de FundéuRAE |
| `restaurar` | Devuelves la puntuación o las mayúsculas a un párrafo real | El texto original de FundéuRAE |
| `letras` | Pones la letra que falta (s/c/z, b/v, ll/y, h, g/j) | El diccionario, sin palabras que tengan un homófono válido |
| `leer` | Lees la página enlazada y lo marcas | Wikilengua, FundéuRAE o el DPD |

## Fuentes

| Fuente | Qué aporta | Licencia |
|---|---|---|
| [FundéuRAE](https://www.fundeu.es) | Recomendaciones y consultas: los textos y frases de los ejercicios | CC BY-SA 3.0 |
| [Wikilengua](https://www.wikilengua.org) | Las páginas de lectura de cada tema | CC BY-SA |
| [RAE](https://www.rae.es): *Ortografía* 2010 y *Diccionario panhispánico de dudas* | El índice del curso y enlaces de consulta | Solo se enlaza |
| [RLA-ES](https://github.com/sbosio/rla-es) `es_CO` | Diccionario colombiano que valida cada palabra y los pares homófonos | GPL / LGPL / MPL |
| [FrequencyWords](https://github.com/hermitdave/FrequencyWords) | Las palabras más frecuentes del español | CC BY-SA |
| [Wikipedia](https://es.wikipedia.org) | Definiciones de las formas literarias | CC BY-SA 4.0 |
| [Wikisource](https://es.wikisource.org) | Ejemplos de dominio público: Quevedo, Garcilaso, Sor Juana, Calderón, Machado, Silva, Pombo, Carrasquilla, Bolívar… | Dominio público; transcripciones CC BY-SA 4.0 |
| [LanguageTool](https://languagetool.org) | Corrección de la escritura libre | LGPL; API pública con enlace de atribución |

Por el share-alike de Fundéu y Wikipedia, el contenido de `content/` y `src/content/` es CC BY-SA. El código es MIT. Tilde no está afiliada a la RAE ni a FundéuRAE.

## Código

Svelte 5 + Vite, PWA sin servidor, rutas por hash, IndexedDB. Mismo esqueleto que Kata.

```
pnpm install
pnpm dev            # http://localhost:5173
pnpm build          # sitio estático en dist/
pnpm test           # silabeo, reglas de la tilde, métrica, ejercicios
pnpm test:browser   # Chrome sin cabeza: primera sesión, cada ejercicio, todas las pantallas (necesita pnpm dev en 5174)
```

- `src/lib/silabas.js`, `tilde.js`, `metrica.js`: silabeo según la RAE (variante americana, `tl` junto), dónde va el acento y por qué, cuenta de versos con sinalefa.
- `src/lib/drills.js`: generadores y correctores de cada ejercicio, deterministas por día.
- `src/lib/logic.js`: plan del día, continuación dentro de la hora, meta semanal de 5 de 7 con días de reserva, progreso.
- `curricula/ortografia.json`: el camino, con enlaces de lectura verificados.
- `src/content/`: lo que la app importa, compilado desde `content/` con `pnpm content`.

## Contenido

```
node scripts/words.mjs              # banco de palabras + pares homófonos (necesita data/raw: es_50k.txt y es_CO.oxt descomprimido)
node scripts/fundeu.mjs 80          # recomendaciones de FundéuRAE por su feed
node scripts/fundeu-consultas.mjs   # consultas de FundéuRAE
node scripts/formas.mjs             # definiciones de Wikipedia
node scripts/wikisource.mjs         # ejemplos de dominio público
node scripts/muestras-postprocess.mjs
pnpm content                        # compila src/content/
```

`scripts/words.mjs` audita el silabeo: toda palabra del diccionario debe coincidir con la regla que la explica, y las que no coinciden se listan. Hoy son cero.

## Deploy

Cada push a `main` corre `.github/workflows/pages.yml`: tests, build con `BASE_PATH` en la ruta del repositorio, y despliegue a GitHub Pages. En los ajustes del repositorio, Pages debe tener "GitHub Actions" como origen.
