# Tilde

Una lección al día para escribir bien en español: tildes, puntuación, mayúsculas, las letras que suenan igual, y una biblioteca de formas literarias para escribir cosas propias con seguridad. Hermana de [Kata](https://github.com/GH-Jaider/kata), hecha para un hablante nativo colombiano que nunca aprendió del todo a escribir.

Tilde no inventa lecciones. Indexa la estructura de la *Ortografía de la lengua española* (RAE y ASALE, 2010), manda a leer a fuentes abiertas y bien hechas, y construye ejercicios cuya respuesta correcta sale siempre de una fuente real: el diccionario, el texto original o la métrica.

## Fuentes

| Fuente | Qué aporta | Licencia |
|---|---|---|
| [FundéuRAE](https://www.fundeu.es) | Recomendaciones y consultas: los textos modernos que se restauran en los ejercicios de puntuación y los pares (esta/está, porque/por qué) | CC BY-SA 3.0 |
| [Wikilengua](https://www.wikilengua.org) | Las páginas de lectura de cada tema | CC BY-SA |
| [RAE](https://www.rae.es): *Ortografía* 2010 y *Diccionario panhispánico de dudas* | El índice del curso y enlaces de consulta | Solo se enlaza |
| [RLA-ES](https://github.com/sbosio/rla-es) `es_CO` | Diccionario colombiano que valida cada palabra y los pares homófonos | GPL / LGPL / MPL |
| [FrequencyWords](https://github.com/hermitdave/FrequencyWords) | Las palabras más frecuentes del español, para que los ejercicios usen palabras de verdad | CC BY-SA |
| [Wikipedia](https://es.wikipedia.org) | Definiciones de las formas literarias | CC BY-SA 4.0 |
| [Wikisource](https://es.wikisource.org) | Ejemplos de dominio público: Quevedo, Garcilaso, Sor Juana, Machado, Silva, Pombo, Carrasquilla, Bolívar… | Dominio público; transcripciones CC BY-SA 4.0 |
| [LanguageTool](https://languagetool.org) | Corrección de la escritura libre | LGPL; API pública con enlace de atribución |

Por el share-alike de Fundéu y Wikipedia, el contenido de `content/` es CC BY-SA. El código es MIT.

## Cómo funciona

- **Camino**: `curricula/ortografia.json`. Siete lecciones que siguen los capítulos de la *Ortografía* reordenados para nativos: tilde, puntuación, mayúsculas, palabras juntas o separadas, letras que suenan igual (seseo y yeísmo), números, extranjerismos. Cada tema tiene sus páginas de lectura y un tipo de ejercicio.
- **Ejercicios**: `tildes` (palabras reales sin tilde), `pares` (una frase real con la palabra en juego), `restaurar` (un párrafo real sin puntuación), `letras` (una palabra con una letra en blanco), `silabas`, `leer`.
- **Muestras**: `content/formas.json` y `content/muestras.json`. Qué es cada forma, cómo se arma, y un ejemplo real con su fuente. El contador métrico comprueba lo que escribes: sílabas con sinalefa y ajuste por la palabra final.
- **Lógica** en `src/lib/`: `silabas.js` (silabeo según la RAE, variante americana con `tl` junto), `tilde.js` (dónde va el acento, tipo de palabra, regla que decide la tilde), `metrica.js` (cuenta de versos como rango, porque la sinalefa es una licencia).

## Contenido

```
pnpm install
node scripts/words.mjs            # banco de palabras + pares homófonos (necesita data/raw: es_50k.txt y es_CO.oxt descomprimido)
node scripts/fundeu.mjs 80        # recomendaciones de FundéuRAE por su feed
node scripts/formas.mjs           # definiciones de Wikipedia
node scripts/wikisource.mjs       # ejemplos de dominio público
node scripts/muestras-postprocess.mjs
```

`scripts/words.mjs` audita el silabeo: toda palabra del diccionario debe coincidir con la regla que la explica, y las que no coinciden se listan. Hoy son cero.

## Tests

```
pnpm test                          # silabeo, reglas de la tilde, métrica
node test/browser/shots.mjs        # capturas de las exploraciones de diseño
```

## Estado

Contenido y lógica listos; direcciones visuales en `docs/explorations/` esperando elección. La app (Svelte 5 + Vite, como Kata) viene después.
