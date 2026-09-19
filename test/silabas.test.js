import { test } from 'node:test';
import assert from 'node:assert/strict';
import { syllabify } from '#lib/silabas.js';

// Divisions checked against Wiktionary hyphenation and the RAE rules.
const CASES = {
  camión: 'ca-mión', país: 'pa-ís', ruido: 'rui-do', construir: 'cons-truir', examen: 'e-xa-men',
  guion: 'guion', huir: 'huir', reír: 're-ír', búho: 'bú-ho', prohíbe: 'pro-hí-be', instante: 'ins-tan-te',
  atleta: 'a-tle-ta', transporte: 'trans-por-te', guerra: 'gue-rra', pingüino: 'pin-güi-no', ciudad: 'ciu-dad',
  averiguáis: 'a-ve-ri-guáis', rey: 'rey', leer: 'le-er', caos: 'ca-os', poeta: 'po-e-ta', día: 'dí-a', María: 'Ma-rí-a',
  también: 'tam-bién', después: 'des-pués', línea: 'lí-ne-a', héroe: 'hé-ro-e', exámenes: 'e-xá-me-nes',
  rápidamente: 'rá-pi-da-men-te', bíceps: 'bí-ceps', virrey: 'vi-rrey', queso: 'que-so', chico: 'chi-co',
  calle: 'ca-lle', perro: 'pe-rro', abstracto: 'abs-trac-to', obstruir: 'obs-truir', aire: 'ai-re', ahumar: 'ahu-mar',
  desahucio: 'de-sahu-cio', ahí: 'a-hí', raíz: 'ra-íz', baúl: 'ba-úl', hoy: 'hoy', yo: 'yo', ayer: 'a-yer', tuya: 'tu-ya',
  cuídate: 'cuí-da-te', jesuita: 'je-sui-ta', casuística: 'ca-suís-ti-ca', chiita: 'chi-i-ta', prohibir: 'prohi-bir', viuda: 'viu-da', buey: 'buey', actriz: 'ac-triz', innato: 'in-na-to',
  siempre: 'siem-pre', hombre: 'hom-bre', alma: 'al-ma', isla: 'is-la', azul: 'a-zul', ñu: 'ñu', a: 'a',
};

for (const [w, expected] of Object.entries(CASES)) {
  test(`silabeo ${w} → ${expected}`, () => { assert.equal(syllabify(w).join('-'), expected); });
}
