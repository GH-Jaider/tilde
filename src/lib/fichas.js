// One card per topic, in our own words: what it is, the rules that matter, examples, and the trap to watch.
// They summarise the Ortografía de la lengua española (RAE y ASALE, 2010); the linked pages hold the full account.
export const FICHAS = {
  // ---------- Lección 1 · La tilde ----------
  silabas: {
    blurb: 'Una sílaba es un golpe de voz: cada vocal, sola o con consonantes alrededor, hace una. Dos vocales juntas pueden ir en la misma sílaba (diptongo) o en dos (hiato). Contarlas bien es la base de toda la acentuación.',
    points: [
      ['Cada vocal, una sílaba.', 'ca-sa, ár-bol, a-mi-go. Una consonante sola va con la vocal que sigue (ca-mi-no); dos se reparten (car-ta), salvo pr, br, tr, dr, cr, gr, fr, pl, bl, cl, gl, fl, que van juntas (li-bro, ha-blar).'],
      ['Diptongo: dos vocales en una sílaba.', 'Cuando una de las dos es cerrada (i, u) y no lleva tilde: ai-re, ciu-dad, rui-do, bue-no, tie-rra, a-gua.'],
      ['Hiato: dos vocales en sílabas distintas.', 'Cuando las dos son abiertas (a, e, o): le-er, ca-os, po-e-ta. O cuando la cerrada lleva la fuerza y la tilde: dí-a, pa-ís, ba-úl, ra-íz.'],
      ['La h no separa.', 'ahu-mar, prohi-bir tienen diptongo igual que si la h no estuviera.'],
      ['ch, ll y rr no se parten.', 'co-che, ca-lle, pe-rro.'],
    ],
    watch: 'Las combinaciones ui e iu siempre cuentan como una sílaba: rui-do, cui-dar, viu-da, je-sui-ta.',
  },
  agudas: {
    blurb: 'Toda palabra de más de una sílaba tiene una que suena más fuerte. Según cuál sea, la palabra es aguda, llana o esdrújula, y eso decide si lleva tilde.',
    points: [
      ['Aguda: la fuerza en la última sílaba.', 'Lleva tilde si termina en vocal, -n o -s: café, canción, jamás. No la lleva si termina en otra consonante: pared, reloj, feliz.'],
      ['Llana: en la penúltima.', 'Es la más común. Lleva tilde solo si termina en consonante distinta de -n o -s: árbol, lápiz, fácil. No la lleva en examen, crisis, mesa.'],
      ['Esdrújula: en la antepenúltima.', 'Siempre lleva tilde: música, rápido, exámenes.'],
      ['Sobresdrújula: antes de la antepenúltima.', 'También siempre: cuéntamelo, rápidamente.'],
      ['Para saber cuál es la fuerte.', 'Di la palabra alargando cada sílaba: la que aguanta la fuerza es la tónica. ca-MIÓN, e-XA-men, MÚ-si-ca.'],
    ],
    watch: 'Cada palabra va por su cuenta: examen no lleva tilde, pero exámenes sí; canción sí, pero canciones no.',
  },
  hiatos: {
    blurb: 'Cuando la fuerza cae en una i o una u que está junto a a, e, o, esa vocal lleva tilde siempre, digan lo que digan las reglas generales. Es la tilde que rompe el diptongo.',
    points: [
      ['Cerrada tónica junto a abierta: tilde.', 'dí-a, Ma-rí-a, pa-ís, ra-íz, ba-úl, re-ír, o-ír, ac-tú-a, con-ti-nú-o.'],
      ['Con h en medio, igual.', 'bú-ho, pro-hí-be, a-hí.'],
      ['Sin fuerza en la cerrada, es diptongo.', 'dia-rio, rui-na, ciu-dad, gra-cias: la i o la u no llevan la fuerza y no hay tilde.'],
      ['Dos abiertas: hiato con las reglas de siempre.', 'le-er, ca-os, po-e-ma no llevan tilde; hé-ro-e sí, porque es esdrújula.'],
    ],
    watch: 'Río y rio son dos palabras: rí-o (el agua) y rio (de reír), que es monosílabo y no lleva tilde desde 2010. Igual guion, truhan, fie.',
  },
  monosilabos: {
    blurb: 'Los monosílabos no llevan tilde: sol, pan, fue, vio, dio, fe. La excepción es la tilde diacrítica: unas pocas parejas que se escriben igual y se distinguen con ella.',
    points: [
      ['él / el', 'él es pronombre: él vino. el es artículo: el libro.'],
      ['tú / tu', 'tú vienes; tu casa.'],
      ['mí / mi', 'para mí; mi perro.'],
      ['sí / si', 'sí, claro; si llueve. También sí mismo.'],
      ['dé / de', 'que le dé algo (verbo dar); de madera.'],
      ['sé / se', 'no sé, sé bueno; se fue.'],
      ['té / te', 'un té; te quiero.'],
      ['más / mas', 'más café; mas quiere decir pero y casi no se usa.'],
    ],
    watch: 'Fue, fui, vio, dio, ti: nunca llevan tilde. Ti no tiene pareja, así que no la necesita.',
  },
  'solo-aun': {
    blurb: 'Tres casos que cambiaron o que confunden: solo, los demostrativos y aún.',
    points: [
      ['solo, sin tilde.', 'Sea adjetivo (está solo) o adverbio (solo quiero uno). Desde 2010 la tilde es opcional solo si hay ambigüedad, y la RAE recomienda no ponerla.'],
      ['este, ese, aquel, sin tilde.', 'este libro, quiero este. Igual esta, ese, aquella. Esto, eso y aquello nunca la llevaron.'],
      ['aún quiere decir todavía.', 'aún no llega. Si puedes cambiarlo por todavía, lleva tilde.'],
      ['aun quiere decir incluso, hasta.', 'aun así, aun los niños lo saben: sin tilde.'],
    ],
    watch: 'Si dudas con aún, prueba a cambiarlo por todavía. Si encaja, lleva tilde.',
  },
  interrogativos: {
    blurb: 'Qué, cuál, quién, cómo, dónde, cuándo y cuánto llevan tilde cuando preguntan o exclaman, con o sin signos. Sin ese sentido, van sin tilde.',
    points: [
      ['Pregunta directa.', '¿Qué hora es? ¿Dónde vives? ¿Cuánto cuesta?'],
      ['Pregunta indirecta, también.', 'No sé qué hacer. Dime dónde vives. Pregunta cuánto cuesta.'],
      ['Exclamación.', '¡Qué calor! ¡Cómo llueve!'],
      ['Sin tilde cuando no preguntan.', 'Dice que viene. El lugar donde nací. Como quieras. Cuando llegues.'],
    ],
    watch: 'La prueba: sé que vienes (que, sin fuerza) frente a sé qué quieres (qué, con fuerza propia y sentido de pregunta).',
  },
  mente: {
    blurb: 'Casos que parecen excepción y no lo son: los adverbios en -mente, las palabras compuestas y las mayúsculas.',
    points: [
      ['-mente conserva la tilde del adjetivo.', 'rápidamente (rápida), fácilmente (fácil), cortésmente (cortés). Pero solamente y felizmente no, porque sola y feliz no la llevan.'],
      ['Compuestos en una palabra: una sola regla.', 'decimoséptimo, tiovivo, baloncesto se acentúan como una palabra normal; el primer elemento pierde su tilde: así + mismo = asimismo.'],
      ['Con guion, cada parte la suya.', 'teórico-práctico, franco-alemán.'],
      ['Las mayúsculas también llevan tilde.', 'África, ÁFRICA, Él. Siempre.'],
      ['Verbos con pronombres pegados: como una palabra.', 'dámelo, cuéntame, dime, deme.'],
    ],
    watch: 'Las siglas no llevan tilde (CIA); las abreviaturas sí (pág., admón.).',
  },

  // ---------- Lección 2 · La puntuación ----------
  punto: {
    blurb: 'El punto cierra un enunciado. Hay tres: y seguido (sigue en la misma línea), y aparte (cambia de párrafo) y final.',
    points: [
      ['Después de punto, mayúscula.', 'Y sin espacio antes del punto.'],
      ['No llevan punto.', 'Los títulos y encabezados, las cifras de miles (20 000) ni la frase que ya termina en puntos suspensivos o en cierre de interrogación o exclamación: ¿Vienes? Sí.'],
      ['Con comillas y paréntesis.', 'El punto va después del cierre: Dijo «vengo». Llegó tarde (otra vez).'],
      ['Las abreviaturas llevan punto.', 'etc., Sr., pág. Si cierran la frase, un solo punto.'],
    ],
    watch: 'Un párrafo, una idea. El punto y aparte es el que ordena el texto.',
  },
  coma: {
    blurb: 'La coma marca pausas cortas y separa partes del enunciado. No va donde uno respira: va donde la gramática la pide.',
    points: [
      ['Enumeraciones.', 'Compré pan, leche y huevos. Sin coma antes de la y final, salvo que lo que sigue sea otra cosa: compré pan, leche y huevos, y me fui.'],
      ['Vocativo.', 'Ana, ven. Ven, Ana. Oye, Ana, ven.'],
      ['Incisos.', 'Mi hermano, que vive en Cali, viene mañana. Van dos comas o ninguna.'],
      ['Conectores.', 'Sin embargo, es decir, por ejemplo, además: entre comas.'],
      ['Orden cambiado.', 'Cuando llegues, avísame. Avísame cuando llegues, sin coma.'],
      ['Nunca entre sujeto y verbo.', 'Los niños de la escuela cantaron. Con coma después de escuela está mal, por largo que sea el sujeto.'],
    ],
    watch: 'La coma entre sujeto y verbo es el error más común. Si el sujeto es largo dan ganas de ponerla: no.',
  },
  'coma-y': {
    blurb: 'Las comas junto a y, pero, sin embargo y otros nexos siguen reglas propias.',
    points: [
      ['Antes de pero, coma.', 'Quería ir, pero llovía.'],
      ['Antes de y, normalmente no.', 'Vino y se fue. Sí cuando lo que sigue es otra cosa (llegó tarde, y encima sin avisar) o cuando cierra un inciso (Ana, que estaba cansada, y Luis se fueron).'],
      ['Sin embargo, no obstante, es decir.', 'Entre comas donde vayan: Sin embargo, no vino. No vino, sin embargo.'],
      ['Aunque.', 'Coma cuando va después: Fue, aunque llovía. Sin coma cuando va antes: Aunque llovía fue.'],
      ['Pues.', 'Cuando explica la causa lleva coma antes: no fui, pues llovía.'],
    ],
    watch: 'Pero al inicio de frase no lleva coma después: Pero no vino.',
  },
  'punto-y-coma': {
    blurb: 'El punto y coma es una pausa mayor que la coma y menor que el punto. Separa partes que ya llevan comas dentro, o dos frases muy ligadas.',
    points: [
      ['Enumeraciones con comas dentro.', 'Vinieron Ana, la mayor; Luis, el del medio; y Pedro.'],
      ['Dos frases unidas por el sentido.', 'Llovía mucho; nadie salió.'],
      ['Antes de conectores largos.', 'No llegó a tiempo; sin embargo, lo dejaron entrar.'],
      ['Después, minúscula.', 'Siempre.'],
    ],
    watch: 'Si dudas entre punto y coma y punto, el punto casi siempre sirve. El punto y coma es un matiz, no una obligación.',
  },
  'dos-puntos': {
    blurb: 'Los dos puntos anuncian lo que viene: una lista, una cita, una explicación.',
    points: [
      ['Antes de una enumeración anunciada.', 'Trajo tres cosas: pan, vino y queso.'],
      ['Antes de una cita.', 'Dijo: «Vuelvo mañana».'],
      ['Causa o consecuencia.', 'No fui: estaba enfermo.'],
      ['Saludo de carta.', 'Querida Ana: y lo que sigue empieza en línea aparte, con mayúscula.'],
      ['Minúscula después.', 'Salvo tras el saludo de carta o cuando sigue una cita.'],
    ],
    watch: 'No van entre el verbo y lo que le sigue: compró pan y leche, sin dos puntos después de compró.',
  },
  suspensivos: {
    blurb: 'Los puntos suspensivos son exactamente tres. Dejan la frase en el aire, cortan una lista o marcan duda.',
    points: [
      ['Tres, siempre.', 'Ni dos ni cuatro. Pegados a la palabra anterior, con espacio después.'],
      ['Sustituyen a etc.', 'Compró pan, leche, huevos… Nunca los dos juntos.'],
      ['Si cierran la frase, no hay punto.', 'No sé… Mañana veremos.'],
      ['Entre corchetes, en citas.', '[…] marca lo que se omite.'],
    ],
    watch: 'Mayúscula después solo si cerraron la frase: No sé… Quizá.',
  },
  interrogacion: {
    blurb: 'En español las preguntas y exclamaciones se abren y se cierran: ¿…? ¡…! Los signos de apertura no son opcionales.',
    points: [
      ['Se abren donde empieza la pregunta.', 'No siempre al inicio de la frase: Si vienes, ¿me avisas?'],
      ['El cierre hace de punto.', '¿Vienes? Sí. Nunca un punto después del cierre.'],
      ['Sin espacio por dentro.', '¿Qué? y no ¿ Qué ?'],
      ['Varias seguidas.', '¿Qué? ¿Cuándo? ¿Dónde? O bien ¿qué?, ¿cuándo?, ¿dónde?, con minúscula y comas.'],
      ['Se pueden combinar.', '¡¿Qué dices?!'],
    ],
    watch: 'En los chats se olvida el de apertura. En un texto cuidado se nota.',
  },
  comillas: {
    blurb: 'Las comillas encierran citas, títulos de partes de una obra y palabras usadas con otro sentido. El español prefiere las angulares «», y las inglesas “” cuando van dentro.',
    points: [
      ['Citas textuales.', 'Dijo: «No vuelvo».'],
      ['El punto va fuera.', '«No vuelvo», dijo. Dijo «no vuelvo».'],
      ['Dentro de otras comillas.', '«Me dijo “hola” y se fue».'],
      ['Títulos de artículos, capítulos, canciones.', 'El capítulo «La casa». Los libros y las películas van en cursiva, no entre comillas.'],
      ['Ironía o sentido especial.', 'Su «amigo» no apareció.'],
    ],
    watch: 'Las comillas rectas del teclado (") son de programación; en un texto van «» o “”.',
  },
  raya: {
    blurb: 'La raya (—) es más larga que el guion (-). Abre los diálogos y encierra incisos.',
    points: [
      ['Diálogo.', '—¿Vienes? —preguntó. Pegada a la palabra que abre, con espacio antes.'],
      ['Comentario del narrador.', '—Sí —dijo Ana—, ahora voy. La raya de cierre va antes de la coma.'],
      ['Incisos, como paréntesis.', 'Llegó —por fin— a tiempo.'],
      ['El guion es otra cosa.', 'Une palabras (teórico-práctico) y parte al final de línea.'],
    ],
    watch: 'Si el inciso cierra la frase, no lleva raya de cierre, solo el punto: Llegó tarde —como siempre.',
  },
  parentesis: {
    blurb: 'Paréntesis, corchetes, guion y barra: signos auxiliares con usos concretos.',
    points: [
      ['Paréntesis: aclaraciones.', 'Nació en Cali (Colombia) en 1990. El punto va fuera.'],
      ['Corchetes: dentro de paréntesis o en citas.', '[sic], […].'],
      ['Guion corto.', 'Une (franco-alemán), separa sílabas al final de línea, marca rangos (págs. 5-7). Sin espacios.'],
      ['Barra.', 'km/h, 3/4, y para versos en línea: «Caminante, no hay camino / se hace camino al andar». La fórmula y/o casi siempre sobra.'],
    ],
    watch: 'Un paréntesis que cierra no lleva punto dentro, salvo que toda la frase esté entre paréntesis. (Así.)',
  },

  // ---------- Lección 3 · Mayúsculas ----------
  inicial: {
    blurb: 'La mayúscula inicial va al empezar un texto, después de punto y en los nombres propios. Todo lo demás va en minúscula.',
    points: [
      ['Después de punto y al inicio.', 'Y después de ¿? o ¡! cuando cierran la frase.'],
      ['Después de dos puntos, minúscula.', 'Salvo en una cita o tras el saludo de una carta.'],
      ['Después de coma o punto y coma.', 'Siempre minúscula.'],
      ['Los días, los meses, las estaciones.', 'lunes, marzo, verano: minúscula.'],
      ['Los idiomas y los gentilicios.', 'español, colombiano, bogotano: minúscula.'],
    ],
    watch: 'La mayúscula lleva tilde: Él, Ángel, ÚLTIMO.',
  },
  nombres: {
    blurb: 'Los nombres propios van con mayúscula; los cargos y los nombres comunes, no. Las instituciones, sí.',
    points: [
      ['Personas, lugares, marcas.', 'Ana, Bogotá, el Cauca, Renault.'],
      ['Cargos y títulos, minúscula.', 'el presidente, la ministra, el papa, el rey, el doctor García.'],
      ['Instituciones y organismos.', 'el Ministerio de Educación, la Universidad Nacional, la Real Academia Española, el Estado, la Iglesia como institución.'],
      ['Lo común de un lugar va en minúscula.', 'el río Magdalena, la calle Real, el mar Caribe: solo el nombre propio lleva mayúscula.'],
      ['Tierra, sol, norte.', 'La Tierra como planeta, la tierra como suelo. El norte en minúscula, salvo en nombres: América del Norte.'],
    ],
    watch: 'Colombiano, católico, catolicismo: minúscula siempre.',
  },
  titulos: {
    blurb: 'Títulos de obras, épocas y otros casos con regla propia.',
    points: [
      ['Títulos de libros, películas, canciones.', 'Solo la primera palabra con mayúscula, y en cursiva: Cien años de soledad, La vida es sueño.'],
      ['Periódicos y revistas.', 'Todas las palabras importantes: El Tiempo, El Espectador.'],
      ['Épocas y hechos históricos.', 'la Edad Media, la Revolución francesa, la Independencia.'],
      ['Festividades.', 'Navidad, Año Nuevo, Semana Santa.'],
      ['Asignaturas y disciplinas.', 'Matemáticas como asignatura; matemáticas como ciencia.'],
    ],
    watch: 'No se usa mayúscula para dar importancia: la patria, la verdad, en minúscula.',
  },

  // ---------- Lección 4 · Juntas o separadas ----------
  porque: {
    blurb: 'Porque, por qué, porqué y por que suenan igual y se escriben de cuatro maneras, según lo que hacen en la frase.',
    points: [
      ['porque: responde, da la causa.', 'No fui porque llovía.'],
      ['por qué: pregunta.', '¿Por qué no fuiste? No sé por qué.'],
      ['porqué: sustantivo, el motivo.', 'No entiendo el porqué. Lleva artículo y se puede cambiar por el motivo.'],
      ['por que: preposición más que.', 'Poco frecuente: la razón por la que vine; luchan por que se haga justicia.'],
    ],
    watch: 'La prueba: si puedes decir el motivo, es porqué; si pregunta, por qué; si responde, porque.',
  },
  sino: {
    blurb: 'Sino y si no; conque y con que: parecidos, distintos.',
    points: [
      ['sino contrapone.', 'No es rojo, sino azul. No solo canta, sino que baila.'],
      ['si no es una condición negativa.', 'Si no vienes, me voy. Se puede decir en caso de que no.'],
      ['conque quiere decir así que.', 'Llueve, conque llévate paraguas.'],
      ['con que es con más que.', 'El lápiz con que escribo; basta con que vengas.'],
    ],
    watch: 'La prueba para sino: si puedes cambiarlo por al contrario, es sino.',
  },
  haber: {
    blurb: 'Suenan igual y se escriben distinto. Lo que decide es qué palabra es.',
    points: [
      ['a ver.', 'A ver qué pasa; vamos a ver. Se puede cambiar por veamos.'],
      ['haber.', 'Verbo: va a haber fiesta; debe haber salido.'],
      ['haya / halla / aya.', 'haya es del verbo haber (espero que haya venido); halla es encuentra (no lo halla); aya es niñera.'],
      ['a / ha / ah.', 'a es preposición (voy a casa); ha es verbo (ha venido); ah es interjección (¡ah!).'],
    ],
    watch: 'Si puedes cambiarlo por veamos, es a ver. Si es parte de un verbo compuesto, es haber.',
  },
  otras: {
    blurb: 'Palabras que se juntan o se separan según lo que significan.',
    points: [
      ['asimismo quiere decir también.', 'así mismo es de esa manera; a sí mismo es a su persona.'],
      ['sobre todo quiere decir principalmente.', 'sobretodo es un abrigo.'],
      ['aparte es separado.', 'a parte es a una parte de algo.'],
      ['adonde y a donde valen las dos.', 'adónde, con tilde, cuando pregunta.'],
      ['demás es el resto.', 'de más es de sobra: lo demás; está de más.'],
      ['Juntas y separadas que se confunden.', 'también, tampoco, alrededor, sinfín van juntas; en fin, a menudo, a veces, o sea van separadas.'],
    ],
    watch: 'Osea no existe: es o sea.',
  },

  // ---------- Lección 5 · Letras ----------
  sz: {
    blurb: 'En Colombia s, c ante e o i, y z suenan igual. Para escribirlas bien no hay oído que valga: hay familias de palabras y unas pocas reglas.',
    points: [
      ['z ante a, o, u; c ante e, i.', 'zapato, zorro, zumo; cero, cine. Por eso cambia al conjugar: cazar, cace; vencer, venzo.'],
      ['Terminaciones con z.', '-az, -ez, -iz, -oz, -uz en sustantivos y adjetivos: paz, vejez, nariz, voz, luz. También -azo, -aza (golpazo) y -eza (belleza).'],
      ['Terminaciones con c.', '-ción cuando la familia tiene -to o -do: canción y canto, acción y acto. Los diminutivos -cito y -cillo (pancito), salvo que la palabra base lleve s: casita, mesita.'],
      ['Terminaciones con s.', '-sión cuando la familia tiene -so, -sor o -sivo: televisión y televisor, decisión y decisivo. También -ísimo, -ésimo, -oso, -osa.'],
      ['Familias.', 'La palabra sigue a su familia: hace, hacer, hacía; casa, casita, casero.'],
    ],
    watch: 'Las parejas trampa: casa y caza, cocer y coser, abrasar y abrazar, cima y sima. En el ejercicio no salen: sin contexto no hay forma de saberlo.',
  },
  bv: {
    blurb: 'B y v suenan igual en todo el español. Las reglas cubren muchos casos; el resto es memoria y familias.',
    points: [
      ['Siempre b.', 'Antes de consonante: blanco, brazo, obtener. Después de m: ambos, cambio. En -aba de los verbos: cantaba, íbamos. En bu-, bur-, bus-: burla, buscar. En -bilidad y -bundo: amabilidad, vagabundo.'],
      ['Siempre v.', 'Después de n: envío, invierno. Después de b y d: obvio, advertir. En -ivo, -ava, -eve: activo, octava, breve. En ir, estar, andar y tener en pasado: voy, estuve, anduve, tuve.'],
      ['Familias.', 'escribir, escribo, escribía; volver, vuelvo, volvía.'],
    ],
    watch: 'Parejas trampa: tubo y tuvo, bello y vello, botar y votar, baca y vaca.',
  },
  lly: {
    blurb: 'Ll e y suenan igual para casi todos los hablantes. Reglas cortas y algunas parejas.',
    points: [
      ['ll.', 'En -illo, -illa, -alle, -elle, -ello: castillo, calle, muelle, sello. Y en los verbos que la llevan: llover, llegar, callar.'],
      ['y.', 'Como vocal al final: rey, hoy, muy. En formas de verbos que no tienen ll ni y en el infinitivo: oyó de oír, cayó de caer, leyendo de leer, huyó de huir. En yer- y yes-: yerno, yeso.'],
      ['Familias.', 'ley, leyes; rey, reyes: la y de la palabra corta se queda.'],
    ],
    watch: 'Parejas trampa: valla, vaya y baya; rallar y rayar; halla y haya; callo y cayo; pollo y poyo.',
  },
  h: {
    blurb: 'La h no suena. Se escribe por la historia de cada palabra, así que son reglas de memoria y de familias.',
    points: [
      ['Siempre h.', 'En hie-, hue-, hui-: hielo, hueso, huir. En hidr-, hiper-, hipo-, hosp-, hum-: hidratar, hipermercado, hospital, humo. En haber, hacer, hablar, hallar y todas sus formas.'],
      ['Familias que la pierden.', 'hueso y óseo, huevo y óvulo, huérfano y orfanato: cuando ya no empieza por ue.'],
      ['Parejas.', 'hola y ola, hecho y echo, hasta y asta, hay, ay y ahí, hora y ora, honda y onda.'],
    ],
    watch: 'Hecho es de hacer (lo he hecho); echo es de echar (echo de menos). Ahí lleva h y tilde: a-hí.',
  },
  gj: {
    blurb: 'Ante e o i, la g y la j suenan igual. Ante a, o, u no hay duda: g suave, j fuerte.',
    points: [
      ['g ante e, i.', 'En -ger y -gir: proteger, dirigir, salvo tejer y crujir. En gen-, geo-, -logía, -gencia: gente, geografía, biología, urgencia. En -gésimo: vigésimo.'],
      ['j ante e, i.', 'En -aje y -eje: viaje, hereje. En -jero y -jería: extranjero, relojería. En los verbos con j en el infinitivo: tejer, crujir, trabajar. En los pasados de decir, traer y los verbos en -ducir: dije, trajo, conduje.'],
      ['Con u.', 'gue, gui: la u no suena (guerra, guitarra). güe, güi: suena (pingüino, vergüenza).'],
    ],
    watch: 'Los verbos en -ger y -gir cambian a j ante a y o: protejo, dirija.',
  },
  errores: {
    blurb: 'Una lista de palabras que casi todos escriben mal, con su forma correcta. Se aprende por familiaridad, no por regla.',
    points: [
      ['Cómo leerla.', 'Busca las que tú escribes mal. Apunta tres.'],
      ['Las que más se ven.', 'a través y no atravez; en serio y no enserio; o sea y no osea; haber y a ver; hay, ahí y ay; exhaustivo; exuberante; idiosincrasia.'],
    ],
    watch: 'Casi todas las trampas de esta lista son palabras que se escriben separadas y la gente junta.',
  },

  // ---------- Lección 6 · Números ----------
  cifras: {
    blurb: 'Cuándo escribir un número con letras y cuándo con cifras.',
    points: [
      ['Con letras.', 'Los que se dicen en una palabra (hasta treinta) o en dos sencillas: tres hijos, veinte años, cuarenta y dos, doscientos.'],
      ['Con cifras.', 'Cantidades exactas largas, porcentajes, fechas, horas y medidas con símbolo: 1250 personas, 15 %, 3 km.'],
      ['Miles y millones.', 'Con un espacio y no con punto: 20 000, 1 500 000. Los años, sin separador: 2026.'],
      ['Decimales.', 'Con coma: 3,5. El punto también es válido.'],
      ['Ordinales.', 'primero, segundo… Con cifra: 1.º, 2.ª, con punto y letra volada.'],
    ],
    watch: 'Nunca empieces una frase con cifra: Veinte personas vinieron.',
  },
  fechas: {
    blurb: 'Fechas, horas y porcentajes tienen su forma.',
    points: [
      ['Fecha.', '19 de septiembre de 2026; abreviada 19/9/2026. El día y el mes en minúscula. Del 2026 también vale.'],
      ['Hora.', 'Las 3 de la tarde, las 15:00, las 3 y media. Con dos puntos, nunca con punto ni coma.'],
      ['Porcentaje.', '15 %, con espacio antes del símbolo. Con letras: el quince por ciento.'],
      ['Siglos y décadas.', 'El siglo XXI, en romanos. Los ochenta o los años 80, nunca 80s.'],
    ],
    watch: 'Los meses no llevan mayúscula: 5 de marzo.',
  },
  abreviaturas: {
    blurb: 'Abreviaturas, siglas y símbolos son cosas distintas.',
    points: [
      ['Abreviaturas.', 'Con punto y con la tilde de la palabra: pág., Sr., Sra., admón., etc., núm. Se leen como la palabra entera.'],
      ['Siglas.', 'Todo en mayúsculas, sin puntos ni tildes: ONU, RAE, DIAN. Si se leen como palabra y son largas, minúscula: ovni, sida.'],
      ['Símbolos.', 'Sin punto y sin plural: km, kg, h, m, %. Con espacio tras la cifra: 5 km, 30 %.'],
      ['Plural de las siglas.', 'Sin s: las ONG, los CD.'],
    ],
    watch: 'Etc. ya lleva punto: no se escribe etc.. ni etc… y nada más.',
  },

  // ---------- Lección 7 · Extranjerismos ----------
  extranjerismos: {
    blurb: 'Las palabras de otras lenguas van en cursiva si conservan su forma original, o en redonda si están adaptadas al español.',
    points: [
      ['Cursiva, sin tilde.', 'software, jazz, sushi, hobby.'],
      ['Adaptadas: redonda y reglas españolas.', 'fútbol, béisbol, güisqui, cruasán, bluyín.'],
      ['Mejor la palabra española cuando la hay.', 'correo en vez de mail, enlace en vez de link, reunión en vez de meeting.'],
      ['Latinismos.', 'Los crudos en cursiva (in situ); los adaptados en redonda y con tilde (currículum, quórum, ítem).'],
    ],
    watch: 'Si escribes sin cursiva, entre comillas: «software».',
  },
  'nombres-propios': {
    blurb: 'Los nombres propios de otras lenguas se escriben como ellos, salvo que tengan forma española.',
    points: [
      ['Topónimos con forma española.', 'Londres, Nueva York, Pekín, Múnich: se usa la española, con sus tildes.'],
      ['Sin forma española.', 'Se respeta la original: Washington, Ottawa.'],
      ['Nombres de persona.', 'Se dejan como son: Shakespeare, Beethoven. Los reyes y los papas, en español: Isabel II, Francisco.'],
      ['Colombia.', 'Medellín, Bogotá, Cúcuta, Ibagué llevan tilde; Cali y Cartagena no. Bogotá D. C., con espacio.'],
    ],
    watch: 'Las tildes de las formas españolas se respetan aunque la lengua local no las tenga: Múnich, Zúrich.',
  },
};

export const fichaFor = (id) => FICHAS[id] || null;

// The card that explains a tilde rule, for "Ver la regla" inside the warm-up.
export const RULE_TOPIC = { aguda: 'agudas', llana: 'agudas', esdrújula: 'agudas', sobresdrújula: 'agudas', hiato: 'hiatos', monosílabo: 'monosilabos', diacrítica: 'monosilabos' };
