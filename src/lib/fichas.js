// One card per topic, in our own words: what it is, the rules that matter, examples, and the trap to watch.
// Every card was checked line by line against the pages it links to (Wikilengua, FundéuRAE), which summarise
// the Ortografía de la lengua española (RAE y ASALE, 2010). The linked pages hold the full account.
export const FICHAS = {
  // ---------- Lección 1 · La tilde ----------
  silabas: {
    blurb: 'Una sílaba es un golpe de voz. En español la forman una o varias vocales, con o sin consonantes alrededor; la vocal es el núcleo. Dos vocales seguidas pueden ir en la misma sílaba (diptongo) o en dos (hiato), y eso decide cómo se cuenta y dónde va la tilde.',
    points: [
      ['Las vocales abiertas (a, e, o) siempre son núcleo de sílaba.', 'océano tiene cuatro. Las cerradas (i, u) también lo son cuando no van pegadas a otra vocal: incinerado tiene cinco.'],
      ['Diptongo: una vocal cerrada átona (i, u) y una abierta (a, e, o), sea cual sea el orden, o dos cerradas distintas.', 'diá-me-tro, a-mais, au-nar, sue-ño, diur-no, cui-dar. En gue, gui, que, qui la u es parte del dígrafo y no cuenta como vocal.'],
      ['Hiato: dos vocales que no forman diptongo.', 'Son tres casos: dos vocales iguales (le-er, a-za-har), dos abiertas distintas (te-a-tro, ca-os, ro-e-dor) y una cerrada tónica junto a una abierta (en-ví-o, pa-ís, ba-úl), que siempre lleva tilde.'],
      ['La h entre vocales no separa.', 'Se consideran en contacto directo: ahu-mar, prohi-bir, bú-ho, truhan.'],
      ['Las consonantes se reparten.', 'Una sola va con la vocal que sigue (ca-mi-no); dos se separan (car-ta), salvo los grupos que empiezan sílaba juntos: pr, br, tr, dr, cr, gr, fr, pl, bl, cl, gl, fl (li-bro, ha-blar). Los dígrafos ch, ll y rr nunca se parten: co-che, ca-lle, pe-rro.'],
    ],
    watch: 'ui e iu son siempre diptongo (rui-do, cui-dar, viu-da, je-sui-ta); ii y uu son siempre hiato (chi-i-ta, du-un-vi-ro). Lo que se pronuncia en tu zona no cambia la cuenta: para la ortografía solo vale el diptongo o el hiato ortográfico.',
  },
  agudas: {
    blurb: 'Toda palabra de más de una sílaba tiene una tónica, la que suena más fuerte. Según cuál sea, la palabra es aguda, llana, esdrújula o sobresdrújula, y las reglas generales dicen cuándo se marca con tilde. Están hechas para ahorrar: la mayoría de las palabras no la necesita.',
    points: [
      ['Aguda: la tónica es la última.', 'Lleva tilde si termina en vocal, o en -n o -s no precedidas de otra consonante: cantó, león, compás, camión. No la lleva si termina en otra consonante, en -y o en dos consonantes: verdad, reloj, feliz, convoy, robots, tictacs.'],
      ['Llana o grave: la tónica es la penúltima.', 'Es la más común y casi nunca lleva tilde: joven, crisis, mesa, examen. Sí la lleva si termina en consonante distinta de -n o -s (árbol, lápiz, fácil, césped), en dos o más consonantes (bíceps, fórceps, récords) o en -y (yóquey, póney).'],
      ['Esdrújula: la tónica es la antepenúltima.', 'Siempre lleva tilde: rápido, música, exámenes, análisis, hábitat.'],
      ['Sobresdrújula: antes de la antepenúltima.', 'Siempre: expóngaselo, cuéntamelo, rápidamente.'],
      ['Para encontrar la tónica.', 'Di la palabra alargando cada sílaba; la que aguanta la fuerza es la tónica: ca-MIÓN, e-XA-men, MÚ-si-ca. Los monosílabos no llevan tilde, salvo la diacrítica.'],
    ],
    watch: 'Cada forma de la palabra va por su cuenta: examen no lleva tilde pero exámenes sí; canción sí pero canciones no; joven no pero jóvenes sí.',
  },
  hiatos: {
    blurb: 'La tilde hiática va sobre la vocal cerrada (i, u) cuando es tónica y está en contacto con una abierta (a, e, o), antes o después, aunque haya una h en medio. Se pone siempre, sea la palabra aguda, llana o esdrújula: está por encima de las reglas generales.',
    points: [
      ['Cerrada tónica junto a abierta: tilde, en cualquier orden.', 'dí-a, pa-ís, ra-íz, ba-úl, o-ír, ca-í-da, e-go-ís-ta, ac-tú-a, tran-se-ún-te.'],
      ['Con h en medio y en palabras compuestas, igual.', 'bú-ho, pro-hí-be, ta-húr, a-hí; cor-ta-ú-ñas, ar-co-í-ris.'],
      ['Sin esa tilde sería diptongo y la fuerza caería en la abierta.', 'egoísta se dice egoÍsta; egoista se diría egÓista. Por eso se dice que la tilde «deshace» el diptongo.'],
      ['Si la cerrada es átona, es diptongo y siguen las reglas generales.', 'dia-rio, ciu-dad, gra-cias, jus-ti-cia: sin tilde. can-táis la lleva por aguda acabada en -s, no por hiato.'],
      ['Dos abiertas o dos iguales: hiato, pero con las reglas de siempre.', 'acordeón lleva tilde por aguda en -n; leona no la lleva por llana en vocal; le-er, ca-os, po-e-ma tampoco; hé-ro-e sí, por esdrújula.'],
    ],
    watch: 'ui e iu son diptongo aunque suenen separados, y solo la segunda vocal puede ser tónica: construido, huida, jesuita, sin tilde. Río (el agua, y también yo río) lleva tilde por hiato; rio (él rio ayer) es monosílabo y no la lleva desde 2010, igual que guion, truhan y fie.',
  },
  monosilabos: {
    blurb: 'Un monosílabo ortográfico tiene una sola vocal o un solo grupo de vocales en diptongo o triptongo: sol, pan, fue, vio, dio, guion, fiais. No lleva tilde en ningún caso, salvo la tilde diacrítica: una lista cerrada de palabras que se escriben igual que otra pero son tónicas, mientras la otra es átona.',
    points: [
      ['tú / tu, él / el, mí / mí.', 'Tú traes tu libro. Él quiere el libro. Para mí, mi libro.'],
      ['sí / si, té / te, dé / de, sé / se.', 'Sí, voy si puedes; se dijo a sí mismo que sí. Te hice un té. Quiero que me dé el de su amigo. Sé que se fue; sé bueno (sé vale para saber y para ser).'],
      ['más / mas.', 'más es cantidad, suma o comparación: dos más dos, no sé más. mas quiere decir pero y es de uso literario: quería ir, mas no pude.'],
      ['Nunca llevan tilde, aunque sean tónicas.', 'Las notas musicales (do, mi, la, si), las letras (a, de, e, o, te, u) y las palabras con una sola función, como ve, di, fue, fui, vio, dio, ti. Tampoco la o entre cifras: 2 o 3.'],
      ['La regla de fondo.', 'Solo hay tilde diacrítica cuando una forma es tónica (nombre, verbo, pronombre tónico) y la otra átona (artículo, preposición, pronombre átono). Por eso ti no la lleva: no tiene pareja.'],
    ],
    watch: 'Guion, ion, truhan, crie, crio, fie, hui, rio, riais: desde 2010 son monosílabos y van sin tilde, aunque en tu zona se pronuncien en dos golpes.',
  },
  'solo-aun': {
    blurb: 'Tres casos que la norma de 2010 cambió y que todavía se ven escritos de todas las maneras: solo, los demostrativos y aún.',
    points: [
      ['solo sin tilde siempre es correcto.', 'Tanto el adjetivo (está solo, un solo libro) como el adverbio (solo quiero uno). Es una palabra llana acabada en vocal.'],
      ['Con tilde, solo el adverbio y solo si hay ambigüedad.', 'Según la nota de la RAE de 2023, es obligatorio escribirlo sin tilde cuando no hay riesgo de ambigüedad y optativo tildarlo cuando, a juicio de quien escribe, lo hay: «Juan habla solo por la calle» frente a «Juan habla sólo por la calle». La Ortografía recomienda no tildarlo nunca y resolver la duda con solamente, únicamente o cambiando el orden.'],
      ['este, ese, aquel: lo mismo.', 'Sin tilde en todos los usos: este libro; quiero este. La tilde es admisible solo en el pronombre y solo si hay ambigüedad. esto, eso y aquello no la llevan nunca.'],
      ['aún con tilde es todavía; aun sin tilde es incluso, hasta, también.', 'No ha llegado aún. No te lo digo aun sabiéndolo; aun así, fue.'],
    ],
    watch: 'Prueba para aún: si puedes cambiarlo por todavía, lleva tilde. Solo como sustantivo (un solo de oboe) tampoco la lleva.',
  },
  interrogativos: {
    blurb: 'Qué, cuál, quién, cómo, cuán, cuánto, cuándo, dónde y adónde llevan tilde diacrítica cuando tienen sentido interrogativo o exclamativo. Sin ese sentido, van sin tilde.',
    points: [
      ['No depende de los signos ¿? ¡!.', 'Vale igual en pregunta directa o indirecta: ¿Cuánto tiene? No sé cuánto tiene. Dime cómo lo hizo. Y en exclamación: ¡Qué calor!'],
      ['No depende de que se sepa la respuesta.', 'Sé cuánto dinero tiene: cuánto sigue con tilde.'],
      ['Sin tilde cuando no preguntan ni exclaman.', 'Dice que viene. Como quieras. El lugar donde nací. Cuando llegues, avísame. Y en giros como así fue como, fue entonces cuando, él fue quien, el modo como, el momento cuando.'],
      ['Con tilde también como sustantivos.', 'Hay que saber el cómo, el cuándo, el qué, el quién y el dónde; los porqués.'],
      ['Con algunos verbos valen las dos.', 'Con ver, saber, depender, gustar, y tras según o dependiendo de, cambia poco el sentido: depende de como o cómo lo mires.'],
    ],
    watch: 'La prueba: la forma con tilde es tónica y la otra átona. Sé que vienes (que, sin fuerza) frente a Sé qué quieres (qué, con fuerza y sentido de pregunta).',
  },
  mente: {
    blurb: 'Casos que parecen excepción y siguen la regla: adverbios en -mente, palabras compuestas, verbos con pronombres pegados y mayúsculas.',
    points: [
      ['-mente conserva la tilde del adjetivo.', 'fácil, fácilmente; cortés, cortésmente; útil, útilmente. Si el adjetivo no la lleva, el adverbio tampoco: natural, naturalmente; sencillo, sencillamente.'],
      ['Compuestos en una palabra: solo cuenta el resultado.', 'Se acentúan como una palabra normal, sin importar cómo se acentuaban las partes: asimismo, decimoséptimo, baloncesto, tiovivo, semidiós. A veces hay que añadir una tilde hiática: cortaúñas.'],
      ['Compuestos con guion: cada parte conserva la suya.', 'histórico-crítico, franco-alemán, teórico-práctico.'],
      ['Verbos con pronombres pegados: como una palabra nueva.', 'dame, dámelo; está, estate; dé, deme, déselo. Se aplican las reglas generales al conjunto.'],
      ['Las mayúsculas llevan tilde.', 'Ángel, ÁFRICA, LINGÜÍSTICA, y en las abreviaturas de nombres: M. Á. (Miguel Ángel). Las siglas no: CIA, no CÍA.'],
    ],
    watch: 'Tampoco se acentúan las locuciones latinas y las voces extranjeras sin adaptar (curriculum vitae, alma mater), pero sí las adaptadas: currículum, referéndum, láser, bidé.',
  },

  // ---------- Lección 2 · La puntuación ----------
  punto: {
    blurb: 'El punto señala el final de un enunciado, de un párrafo o de un texto. Hay tres: y seguido, y aparte y final, y los tres indican pausa completa. Se escribe pegado a la palabra anterior y con un espacio después; lo que sigue empieza con mayúscula.',
    points: [
      ['Punto y seguido: fin de un enunciado dentro del párrafo.', 'El coche circulaba despacio. Lo adelantaban por la izquierda.'],
      ['Punto y aparte: fin de una idea y comienzo de otra.', 'Separa párrafos. El último del texto es el punto final (no «punto y final»).'],
      ['Punto en las abreviaturas, nunca en los símbolos.', 'Sra., etc., EE. UU., pág.; pero km, kg, h, sin punto. Si la abreviatura cierra la frase, un solo punto.'],
      ['Sin punto.', 'En títulos y encabezados, en las cifras de miles (12 000, con espacio) y en los años (2026). Tampoco tras ? o ! de cierre: el cierre ya hace de punto.'],
      ['Con paréntesis y comillas, el punto va fuera.', 'Llegó tarde (otra vez). Dijo: «Vengo».'],
    ],
    watch: 'El punto que separa las horas (20.30) y el que separa decimales (2.718) son otros usos; en los decimales vale también la coma.',
  },
  coma: {
    blurb: 'La coma separa partes dentro de un enunciado. Va pegada a la palabra anterior y con un espacio después. No la pone la respiración: la pide la gramática.',
    points: [
      ['Incisos: siempre dos comas, una para abrir y otra para cerrar.', 'Cervantes, el autor del Quijote, murió en 1616. Las víctimas, furiosas, protestaron. Si es especificativo no hay comas: Las víctimas furiosas protestaron (solo las que estaban furiosas).'],
      ['Enumeraciones: coma entre los miembros, salvo los unidos por y, e, o, ni.', 'Vinieron Pedro, Juan, María y Cristina. Poner coma antes de la y final es anglicismo, excepto si lo que sigue se aparta de la serie: El ruido era estridente, ensordecedor, y causaba la locura.'],
      ['Vocativos e interjecciones.', 'Sebastián, te he dicho que vengas. Ya tiene un aviso, Martínez. Bah, no lo tengas en cuenta. Sí, señor.'],
      ['Cuando se omite el verbo y cuando se cambia el orden.', 'Belén va a la cena; Cristina y María, no. Durante aquellos primeros años, el tiempo pasaba despacio. Si no sabes qué hacer, no vengas. Si lo anticipado es corto, la coma es opcional.'],
      ['Nunca entre el sujeto y el verbo, por largo que sea el sujeto.', 'Los padres, los abuelos y los niños del barrio disfrutaron del parque. Sí hay coma si justo antes del verbo cierra un inciso o va etc.: Tailandia, Laos, Camboya, etc., participaron.'],
      ['Tampoco para unir oraciones que van seguidas.', 'Las oraciones yuxtapuestas se separan con punto, punto y coma o dos puntos, no con coma. Ni delante de que consecutivo: tal importancia que…'],
    ],
    watch: 'La coma entre sujeto y verbo es la llamada coma criminal, el error más frecuente. Y tras el saludo de una carta van dos puntos, no coma: Querida Ana:',
  },
  'coma-y': {
    blurb: 'Las comas junto a y, pero, aunque, sin embargo y otros nexos siguen reglas propias.',
    points: [
      ['Antes de y, normalmente no.', 'Había queso, jamón y cebolla. Sí, cuando lo que se une contiene comas (Luis le dio un regalo a María, y Begoña, a Juanma), cuando cierra un inciso (Abordó la tarea, aunque era complicada, y la acabó), cuando equivale a pero (Le propuse compartir gastos, y se negó) o cuando añade una conclusión (Se añade la sal, y ya).'],
      ['Después de y, coma solo si abre un inciso.', 'Abordó la tarea y, gracias a su entusiasmo, la acabó enseguida.'],
      ['Después de pero, aunque, así que: sin coma.', 'No es mi libro preferido, pero me gusta. Aunque había estudiado, no aprobé. Es tarde, así que repítelo. Pero ¿qué me dices? Solo lleva coma si sigue un inciso: pero, ya que me lo pides, me quedo.'],
      ['sin embargo, no obstante, es decir: entre comas donde vayan.', 'Sin embargo, no vino. No vino, sin embargo. Al mirar, sin embargo, no lo vio. Entre dos oraciones va mejor con punto y coma: Le dedicó horas; sin embargo, no aprobó. Siempre en dos palabras.'],
      ['excepto, salvo, menos: con coma delante.', 'Estoy libre todos los días, salvo el jueves.'],
    ],
    watch: 'Cuidado con dónde cae el conector: «Lo hizo bien, sin embargo; todavía funciona» dice algo distinto de «Lo hizo bien; sin embargo, ya no funciona».',
  },
  'punto-y-coma': {
    blurb: 'El punto y coma es una pausa mayor que la de la coma y menor que la del punto. Es el signo más subjetivo: donde cabe, casi siempre cabe también un punto. Después va minúscula.',
    points: [
      ['Enumeraciones con comas dentro.', 'Mi madre es tendera; la de Sandra, arquitecta; la de Antonio, cirujana. Ante el último miembro, el que lleva y, se recomienda coma.'],
      ['Oraciones relacionadas sin conjunción.', 'Nada más ver la habitación, decidió limpiarla; la desempolvó, la fregó y la pulió. En julio estaré trabajando; en agosto, de vacaciones.'],
      ['Antes de pero, sin embargo, por tanto, cuando lo que sigue es largo.', 'Ismael tuvo muy buenas notas; no obstante, estudió menos de lo que creemos. Si la oración es corta, coma: Llamará, pero pasado mañana.'],
      ['Listas en líneas independientes.', 'Cada miembro termina en punto y coma y empieza en minúscula; el último se cierra con punto.'],
    ],
    watch: 'Dos puntos y punto y coma no son lo mismo: «Hace un día espléndido: estoy contento» da la causa; «Hace un día espléndido; estoy contento» solo junta dos hechos.',
  },
  'dos-puntos': {
    blurb: 'Los dos puntos detienen el discurso para llamar la atención sobre lo que sigue, que está en estrecha relación con lo anterior. Van pegados a la palabra anterior y con espacio después; lo que sigue va en minúscula, salvo excepciones.',
    points: [
      ['Antes de una enumeración anunciada, o después para cerrarla.', 'Había dos implicados: un trabajador y uno de sus hijos. Traducir, corregir y editar: esas serán tus funciones.'],
      ['Antes de una cita textual.', 'Lo decía Ortega: «La claridad es la cortesía del filósofo». La cita va entre comillas y empieza con mayúscula.'],
      ['Causa, consecuencia o resumen, sin otro nexo.', 'Está lloviendo: no podremos ir a la playa. Si hay nexo (porque, así que), no van dos puntos.'],
      ['Tras el saludo de una carta y en documentos.', 'Estimado señor García: y lo que sigue, con mayúscula y en renglón aparte. Poner coma ahí es anglicismo. CERTIFICA: Que…'],
      ['Después de fórmulas como en resumen, dicho de otro modo, pues bien.', 'Dicho de otro modo: me gusta ayudar. Ahí también cabe la coma; los dos puntos dan énfasis.'],
    ],
    watch: 'No van entre el verbo y su complemento ni tras una preposición: «Había comprado: lápiz y corrector» o «Iremos a: España e Inglaterra» están mal. Tampoco delante ni detrás de que, salvo en textos jurídicos.',
  },
  suspensivos: {
    blurb: 'Los puntos suspensivos son tres, y solo tres. Dejan el enunciado en suspenso: duda, temor, algo que se calla o una lista que podría seguir.',
    points: [
      ['Pegados a la palabra anterior, con espacio después.', 'No sé si ir o no ir... No sé qué hacer. Si lo que sigue es otro signo, sin espacio: No sé..., bueno..., que si quieres.'],
      ['Si cierran el enunciado, no se añade punto y lo que sigue va con mayúscula.', 'He escrito cuentos, poemas, ensayos... Ahora quiero una novela. Si no lo cierran, minúscula: No tengo... prisa.'],
      ['Enumeraciones abiertas, sin coma antes.', 'Había de todo: vacas, marranos, gallinas, conejos... Nunca junto con etc.: los dos dicen lo mismo.'],
      ['Lo que se calla o se da por sabido.', 'A buen entendedor... Si te viera tu madre... ¡Qué hijo de... está hecho!'],
      ['Con interrogación y exclamación.', 'Dentro si el enunciado queda incompleto (¿Sabía usted...?) y fuera si está completo (Pero ¡qué has hecho!...). En una cita, lo que se omite va entre corchetes: [...].'],
    ],
    watch: 'Tras una abreviatura se suman los puntos: «a las 3 p. m....» lleva cuatro. Coma, punto y coma y dos puntos sí pueden ir después, pegados: refranes..., dichos...',
  },
  interrogacion: {
    blurb: 'Los signos de interrogación y exclamación son dobles: uno abre (¿ ¡) y otro cierra (? !). El de apertura es obligatorio en español; solo así se sabe dónde empieza la pregunta.',
    points: [
      ['Se abren donde empieza la pregunta o la exclamación, no siempre al inicio de la frase.', 'Oye, dime, ¿te gustó la película? Si vienes, ¿me avisas? Me dijo que no iría ¡porque estaba lloviendo!'],
      ['Los vocativos y las subordinadas quedan fuera si van delante, dentro si van detrás.', 'Mónica, ¿puedes ayudarme? Que lo sepas, ¡no pienso hacerlo yo sola! pero ¡No pienso hacerlo yo sola, que lo sepas!'],
      ['El cierre hace de punto: no se añade otro.', '¿Por dónde vendrán? Lo que sigue va con mayúscula. Sí pueden ir coma, punto y coma o dos puntos: ¿lo hago?, ¿no lo hago?'],
      ['Varias seguidas.', 'Cada una con sus signos. Con mayúscula si son enunciados independientes (¿Qué? ¿Cuándo? ¿Dónde?) o con minúscula y comas si forman uno solo (¿qué?, ¿cuándo?, ¿dónde?).'],
      ['Preguntas indirectas: sin signos.', 'Me preguntó si vienes mañana. Mi duda es dónde está. La tilde de dónde, qué y cuándo no depende de los signos.'],
      ['Interrogativas y exclamativas a la vez.', 'Lo más frecuente y lo que recomienda la RAE: ¡¿Es que no me has escuchado?! Sin espacio entre los signos y la primera o la última palabra.'],
    ],
    watch: 'Repetir signos (¡¡¡Al ladrón!!!) solo cabe en textos literarios o muy expresivos. Poner el de apertura al revés, o el mismo signo para abrir y cerrar, es falta de ortografía.',
  },
  comillas: {
    blurb: 'Las comillas marcan distancia respecto a lo que se escribe: una cita, una palabra usada con otro sentido, el título de una parte. En español la RAE aconseja las angulares «»; dentro de ellas, las inglesas “” y luego las simples ‘’.',
    points: [
      ['Citas, propias o ajenas, y pensamientos.', 'Juan me dijo: «Es un buen día para pasear». «Mejor me quedo», pensé. Los diálogos, en cambio, van con raya.'],
      ['Títulos de partes de una obra.', 'El capítulo «La guerra civil». El episodio «Apagón». La obra entera (libro, película, revista) va en cursiva, no entre comillas.'],
      ['Ironía, vulgarismos, palabras usadas a falta de otra mejor.', 'El «listo» de tu hijo suspendió. La órbita se «tuerce». Para una palabra nueva o extranjera es mejor la cursiva.'],
      ['Antes de la comilla de cierre no va punto, coma ni punto y coma; van después.', 'Dijo: «Hoy lloverá a cántaros». «Ya no aguanto más», dijo Juan. Dentro sí puede haber ? ! …: Preguntó: «¿Hoy lloverá?».'],
      ['Comillas dentro de comillas.', '«Juan exclamó: “¡Qué ‘simpático’ eres!”». Si se abren, se cierran todas.'],
    ],
    watch: 'Las comillas rectas del teclado (") vienen de la mecanografía y se evitan en texto cuidado. No llevan comillas los refranes usados con su sentido, ni las marcas, ni los nombres de colegios o premios.',
  },
  raya: {
    blurb: 'La raya (—) es un trazo largo; el guion (-) es corto y hace otra cosa. La raya abre los diálogos y encierra incisos, como un paréntesis.',
    points: [
      ['Diálogo: cada intervención empieza párrafo con raya, pegada a la primera palabra.', '—No viene —dijo Juan—. Allá él. Con espacio antes de la raya y nunca después de la de apertura.'],
      ['El comentario del narrador va entre rayas; si cierra el párrafo, sin raya final.', '—No viene —dijo. —¿Vienes? —me replicó con sorna.'],
      ['La puntuación de la frase va después de la raya de cierre.', '—Si he de ser franco —dijo—, no lo hice. —La verdad —dijo— es que no lo hice. Si el narrador no remite a lo dicho sino que hace otra cosa, punto y mayúscula: —No viene. —Hizo una pausa—. Allá él.'],
      ['Incisos, como paréntesis.', 'El camino más corto —según los matemáticos— es la línea recta. En español la raya se cierra incluso cuando el inciso termina la frase: …es la línea recta —según los matemáticos—.'],
      ['Usos que son calcos del inglés.', 'No sustituye a los dos puntos (Una medalla y tres diplomas: esos fueron sus logros) ni al paréntesis de las siglas (la Escuela Politécnica (EPN)).'],
    ],
    watch: 'En el Mac la raya sale con opción-mayúsculas-guion. Un doble guion (--) no la sustituye.',
  },
  parentesis: {
    blurb: 'Paréntesis, corchetes, guion y barra: signos auxiliares con usos concretos.',
    points: [
      ['Paréntesis: aclaraciones intercaladas.', 'Nació en Cali (Colombia) en 1990. Fechas, desarrollo de siglas, traducciones. Espacio fuera, nunca dentro. El punto que cierra el enunciado va después del paréntesis de cierre: (Odiaba lo predecibles que son algunos restaurantes).'],
      ['Corchetes: dentro de un paréntesis, o para lo que el editor añade o quita en una cita.', 'The Doors [mítica banda de rock]; [sic]; [...].'],
      ['Guion: une palabras y elementos.', 'franco-prusiano (oposición) frente a hispanoamericano (unidad); teórico-práctico; pro-Alemania (prefijo ante mayúscula); relaciones Norte-Sur; págs. 5-7; 1888-1953. Sin espacios. Cada parte unida con guion conserva su tilde.'],
      ['Sin guion.', 'zigzag, tictac, tío abuelo, curso en línea, la mecánica no relativista, los no fumadores. Los prefijos van pegados: exministro, posguerra, antirrobo.'],
      ['Barra.', 'km/h, 3/4, c/ (calle), y para separar versos en línea: «Caminante, no hay camino / se hace camino al andar». La fórmula y/o casi siempre sobra: la o ya incluye las dos opciones.'],
    ],
    watch: 'Delante del paréntesis de apertura no van coma, punto y coma ni raya; sí pueden ir punto, puntos suspensivos o comillas. El texto de dentro lleva su propia puntuación.',
  },

  // ---------- Lección 3 · Mayúsculas ----------
  inicial: {
    blurb: 'Lo normal es escribir en minúscula. La mayúscula inicial va al empezar el texto, después de punto y en los nombres propios. Fuera de eso, cada mayúscula necesita una razón.',
    points: [
      ['Después de punto y al empezar.', 'También tras ? o ! cuando cierran el enunciado (¿Cuándo llegaste? Creía que vendrías mañana) y tras puntos suspensivos que lo cierran. Si la pregunta es solo parte del enunciado, no: Mónica, ¿puedes ayudarme?'],
      ['Después de dos puntos, minúscula.', 'Se confirma la noticia: el Chelsea ficha a Benítez. Excepciones: el saludo de una carta (Muy señor mío: Le comunico…), una cita (Juan dijo: «Me voy») y los verbos de los documentos oficiales (CERTIFICA: Que…).'],
      ['Después de coma o punto y coma, siempre minúscula.', 'Y en los dígrafos solo va en mayúscula la primera letra: Chocó, Llueve, Guerra, Quito.'],
      ['Minúscula en días, meses, estaciones, idiomas y gentilicios.', 'lunes, marzo, verano, español, colombiano, bogotano. También en los pueblos y etnias: los mayas, los mapuches.'],
      ['Si el enunciado empieza con cifra, lo que sigue va en minúscula.', '20 000 leguas de viaje submarino. Mejor no empezar una frase con cifra.'],
    ],
    watch: 'Las mayúsculas llevan tilde: Ángel, ÁNGEL. Escribir todo en mayúsculas equivale a gritar; para destacar, cursiva, negrita o comillas.',
  },
  nombres: {
    blurb: 'Los nombres propios van con mayúscula; los nombres comunes, no. La frontera está en si nombran a un individuo concreto o a una clase.',
    points: [
      ['Personas, apellidos, apodos, lugares, marcas.', 'Juan, García, el Cordobés, Bogotá, Renault. La preposición del apellido va en minúscula con el nombre (Juan de Ávalos) y en mayúscula sin él (señor De Ávalos). El artículo del apodo va en minúscula: el Cordobés, del Greco.'],
      ['Instituciones, organismos, partidos, edificios: los términos significativos en mayúscula.', 'Real Academia Española, Ministerio de Educación, Universidad Nacional, Partido Liberal, Museo del Oro. Artículos y preposiciones en minúscula. En plural o de forma genérica, minúscula: los ministerios de Defensa y de Interior, las universidades.'],
      ['Mayúscula institucional.', 'el Estado, el Gobierno, la Iglesia, el Ejército cuando son la institución (golpe de Estado); en minúscula cuando son nombres comunes: la iglesia del barrio, el ejército abandonó la ciudad. Los especificadores van en minúscula: el Ejército español, la Iglesia católica, la Constitución colombiana.'],
      ['Cargos y tratamientos, en minúscula.', 'el presidente, la ministra, el papa, el rey, el doctor García, don, doña, san, santa: la tierra de san Francisco. Con mayúscula solo cuando forman parte de un nombre propio: San Francisco (la ciudad), la plaza de Santa Catarina.'],
      ['Nombres geográficos: el genérico en minúscula, el específico en mayúscula.', 'el río Magdalena, el mar Caribe, el cabo de Hornos, la calle Real, el departamento del Cauca. Salvo que el genérico forme parte del nombre: Río de la Plata, Sierra Nevada. Los puntos cardinales en minúscula (el sur de Colombia) salvo en nombres: Corea del Norte, América del Sur.'],
      ['Dios, divinidades y lo personificado.', 'Dios, Alá, Júpiter; el Creador, el Salvador; la Muerte y la Esperanza como alegorías.'],
    ],
    watch: 'Colombia, colombiano; Bogotá, bogotano; Iglesia (institución), iglesia (edificio). Sol, Tierra y Luna llevan mayúscula solo en contexto astronómico; fuera de él, minúscula.',
  },
  titulos: {
    blurb: 'Títulos de obras, épocas, festividades y otros casos con regla propia.',
    points: [
      ['Títulos de obras: cursiva y solo la primera palabra con mayúscula.', 'Cien años de soledad, El sí de las niñas, La vida es sueño, sea libro, película, obra de teatro o disco. Las partes (capítulos, artículos, canciones, episodios) van entre comillas y en redonda: el capítulo «La casa».'],
      ['Periódicos y revistas: mayúscula en las palabras significativas.', 'El Tiempo, El Espectador, Mundo Científico, en cursiva.'],
      ['Épocas y acontecimientos históricos.', 'la Edad Media, el Renacimiento, la Revolución francesa (el adjetivo en minúscula), la Independencia, la Antigüedad.'],
      ['Festividades: mayúscula cuando son el día; minúscula cuando son el periodo.', 'Feliz Año Nuevo (el 1 de enero), Navidad (el 25), Semana Santa, Día de la Madre; pero próspero año nuevo (todo el año) y en navidades. Feliz y próspero, en minúscula.'],
      ['Leyes y documentos oficiales.', 'Con el nombre completo, mayúsculas: Ley 100 de 1993, Declaración Universal de los Derechos Humanos; abreviado y genérico, minúscula: la ley de salud. La Constitución (una concreta) frente a las constituciones democráticas.'],
      ['Siglas en mayúsculas y sin tilde; acrónimos comunes en minúscula.', 'ONU, OTAN, DIAN; pero láser, ovni, pyme, sida. Los plurales con puntos y espacios: EE. UU., JJ. OO.'],
    ],
    watch: 'No se usa la mayúscula para dar importancia: la patria, la verdad y el amor van en minúscula. Los meses y los días tampoco la llevan aunque estén en una fecha: 20 de julio.',
  },

  // ---------- Lección 4 · Juntas o separadas ----------
  porque: {
    blurb: 'Por y que se combinan de cuatro maneras, y solo una lleva tilde diacrítica: por qué.',
    points: [
      ['por qué: pregunta el motivo, directa o indirecta.', '¿Por qué lo hiciste? Dime por qué lo hiciste. También cuando equivale a por cuál: No sé por qué camino ir.'],
      ['porque: da la causa.', 'No lo hace porque no le conviene. También puede indicar finalidad (para que), y entonces cabe en una o dos palabras: Se esfuerza porque (por que) lo consigan.'],
      ['porqué: sustantivo, el motivo, con artículo y con plural.', 'No conoce el porqué del problema. Todos tenemos nuestros porqués. Solo si se puede cambiar directamente por motivo o razón; en «no entiendo el por qué lo hizo» no es sustantivo.'],
      ['por que: cuando el verbo o el nombre exigen por, o cuando equivale a por el cual.', 'Vela por que sus hijos estudien (velar por). Se inclina por que se anule. La razón por que vine, que hoy se dice por la que.'],
    ],
    watch: 'La prueba rápida: si responde, porque; si pregunta, por qué; si es el motivo con artículo, porqué; si es un verbo que pide por, por que.',
  },
  sino: {
    blurb: 'Sino, en una palabra, es una conjunción que contrapone; si no, en dos, es una condición negativa. Conque y con que se distinguen igual.',
    points: [
      ['sino contrapone una idea positiva a otra negativa.', 'No bebe vino, sino agua. No solo canta, sino que baila (con verbo distinto, sino que). También equivale a más que o excepto: No hacía sino comer y dormir; nadie lo sabe sino Roberto.'],
      ['si no: si sucede que no, en caso contrario.', 'No se hará si no se aprueba. Esperemos que no llueva; si no, no podremos ir. Se pueden meter palabras en medio (si tú no quieres) y puede empezar la oración; sino, no.'],
      ['La prueba.', 'Si puedes decir en caso contrario o si es que no, es si no. Si puedes decir al contrario o más bien, es sino. Es gris oscuro, si no negro (podría ser negro) frente a No es gris, sino negro (es negro).'],
      ['conque quiere decir así que.', 'Llueve, conque llévate paraguas. con que es con más que: el lápiz con que escribo; basta con que vengas.'],
      ['En preguntas retóricas con excepción, junto.', '¿Quién sino él pudo hacerlo? (nadie salvo él). Pero ¿quién, si no fue él, pudo hacerlo?'],
    ],
    watch: 'sinó, con tilde, no existe. Y sino también es un sustantivo: el destino.',
  },
  haber: {
    blurb: 'Suenan igual y se escriben distinto. Lo que decide es qué palabra es cada una.',
    points: [
      ['a ver: la preposición a más el verbo ver.', 'Para pedir ver algo (¿A ver tu carro nuevo?), para la expectación (A ver qué pasa esta noche), para llamar la atención (A ver, circulen) y en a ver si (A ver si te atreves). Se puede cambiar por veamos.'],
      ['haber: el verbo.', 'Va a haber fiesta. Debe haber salido. Tendrá que habérselas conmigo. «Haber si os calláis» está mal: es a ver si.'],
      ['haya / halla / aya.', 'haya es de haber: espero que haya venido; quien lo haya visto, que lo diga. halla es de hallar, encontrar: quien busca halla. aya es la niñera, y el haya es un árbol.'],
      ['a / ha / ah.', 'a es preposición: voy a casa. ha es del verbo haber: ha venido. ah es interjección: ¡ah!'],
    ],
    watch: 'Prueba para haya: si puedes cambiarlo por encuentra, es halla; si va con un participio o significa exista (haya venido, haya paz), es haya.',
  },
  otras: {
    blurb: 'Palabras que se juntan o se separan según lo que significan, y otras que van siempre separadas aunque se vean juntas por todas partes.',
    points: [
      ['Siempre separadas.', 'o sea, a veces, a menudo, a través, en fin, en medio, de nuevo, de acuerdo, en cambio, a pesar, de repente, sin embargo, a gusto. Escribirlas juntas (osea, aveces, através, derrepente) es falta.'],
      ['asimismo, así mismo, a sí mismo.', 'asimismo es también (lo recomendado, sin tilde); así mismo es de esa manera; a sí mismo es a su propia persona: se clonó a sí mismo.'],
      ['sobre todo, aparte, demás, sinfín, sinvergüenza.', 'sobre todo es principalmente; sobretodo, un abrigo. aparte es separado; a parte, a una parte. demás es el resto; de más, de sobra. sinfín es infinidad; sin fin, inacabable. sinvergüenza es el pícaro; sin vergüenza, sin ella.'],
      ['también y tampoco frente a tan bien y tan poco.', 'También hay que leer el prefacio. Lo hizo tan bien que no hubo que tocar nada. Tampoco hay mucho que hacer. Es tan poco lo que hay que hacer.'],
      ['adonde, a donde, donde.', 'Con verbos de movimiento valen adonde y a donde (llegó adonde estaban); para indicar dónde está algo, solo donde: estaba donde debía, no adonde debía. adónde, con tilde, cuando pregunta.'],
    ],
    watch: 'Algunas valen de las dos formas: enseguida y en seguida, alrededor y al rededor, deprisa y de prisa. Cuando dudes, la Lista de palabras unidas o separadas de Wikilengua lo resuelve.',
  },

  // ---------- Lección 5 · Letras ----------
  sz: {
    blurb: 'Para la mayoría de los hablantes, en Colombia entre ellos, s, c ante e o i, y z suenan igual. Las reglas que hay son orientativas: lo que decide es la familia de la palabra.',
    points: [
      ['-ción o -sión: mira la familia.', 'Va -ción cuando hay -to, -tor, -do, -dor en la familia: acción y acto, protección y protector, oración y orador. Va -sión cuando hay -so, -sor, -sivo, -sible o el verbo acaba en -tir, -dir: extensión y extenso, compasión y compasivo, diversión y divertir, evasión y evadir. Y -xión con -jo, -xo: reflexión y reflejo, conexión y conexo.'],
      ['-azo, -aza, -azón, -anza, -izar: con z.', 'Golpes y aumentativos: escobazo, puñetazo, botellazo; corazón, hinchazón, razón; esperanza; organizar, realizar. Excepciones frecuentes: casa, caso, paso, vaso, masa, tasa, raso.'],
      ['Verbos en -cer, -ceder, -cender, -ciar, -citar: con c.', 'agradecer, crecer, ofrecer, convencer; conceder, suceder; encender, descender; anunciar, iniciar, vaciar; citar, felicitar. Excepciones: ser, toser, ansiar, necesitar, visitar.'],
      ['-cente, -ciente, -cencia, -ciencia: con c.', 'adolescente, inocente, paciente, suficiente, docencia, conciencia. Pero las formas de verbos en -entar, -entir, -enter no: consiente, presiente.'],
      ['Diminutivos: -cito, -cillo, salvo que la palabra base lleve s.', 'pancito, hombrecillo; pero casita, mesita, cosita.'],
    ],
    watch: 'Las parejas trampa no se resuelven con reglas: casa y caza, cocer y coser, abrasar y abrazar, reciente y resiente, sumo y zumo. En el ejercicio nunca salen, porque sin contexto no hay forma de saberlo.',
  },
  bv: {
    blurb: 'B y v suenan igual en todo el español. Hay unas pocas normas fijas y varias reglas orientativas; el resto es memoria y familias.',
    points: [
      ['Normas fijas.', 'Los grupos bl y br siempre con b: doble, hebra, niebla, palabra, tabla. Los pretéritos imperfectos en -aba: hablaba, ibas, amábamos, jugabais. Tras d siempre v: advertir, adverbio, adversario.'],
      ['Con b, orientativas.', 'Los verbos en -bir (escribir, recibir, prohibir, subir), salvo hervir, servir, vivir y sus compuestos. Las terminaciones -bilidad (amabilidad, responsabilidad), salvo civilidad y movilidad. Los grupos amb, umb: ambiente, también, umbral, zumbido. Los prefijos bene-, bi-, bio-: benéfico, bicicleta, biología.'],
      ['Con v, orientativas.', 'Las terminaciones -ivo, -iva (activo, cursiva, motivo, oliva), salvo formas verbales como recibo y escriba. Las terminaciones -voro, -vora: carnívoro, herbívoro. Los prefijos vice-, viz-, vi-: vicepresidente, vizconde, virrey.'],
      ['Familias.', 'escribir, escribo, escribía; volver, vuelvo, volvía. Y las formas irregulares de ir, estar, andar, tener con v: voy, estuve, anduve, tuve.'],
    ],
    watch: 'Parejas trampa: tubo y tuvo, bello y vello, botar y votar, baca y vaca, rebelar y revelar, sabia y savia.',
  },
  lly: {
    blurb: 'Ll e y suenan igual para casi todos los hablantes. La y es consonante al empezar sílaba (yegua, ayer) y vocal al final de palabra tras vocal (rey, hoy, muy).',
    points: [
      ['ll.', 'En -illo, -illa, -alle, -elle, -ello: castillo, calle, muelle, sello. Y en los verbos que la llevan: llover, llegar, callar.'],
      ['y.', 'Como vocal al final: rey, hoy, muy, convoy. En formas de verbos que no tienen ll ni y en el infinitivo: oyó de oír, cayó de caer, leyendo de leer, huyó de huir. Y en yer-, yes-: yerno, yeso.'],
      ['Al final de palabra, nunca tras consonante.', 'Las voces extranjeras se adaptan cambiando la y por i: panty, panti; pony, poni; sexy, sexi.'],
      ['Familias.', 'ley, leyes; rey, reyes: la y de la palabra corta se queda al alargarla.'],
    ],
    watch: 'Parejas trampa: valla (cerca), vaya (de ir) y baya (fruto); rallar (con rallador) y rayar (hacer rayas, estropear, volver loco); halla (encuentra) y haya (de haber); callo y cayo; pollo y poyo.',
  },
  h: {
    blurb: 'La h no suena. Se escribe por la historia de cada palabra, así que las reglas son de memoria y de familias, y solo aparece al principio de palabra o entre vocales.',
    points: [
      ['Siempre h ante los diptongos ue y ui al empezar palabra.', 'hueso, huevo, huérfano, huella, huir, y las formas de oler que empiezan por ue: huelo, hueles.'],
      ['El prefijo hidr- y otros de origen griego.', 'hidratar, hidrógeno; hecto-, helio-, hemi-, hemo-, hepta-, hiper-, hipo-: hectárea, hemisferio, hemorragia, hipermercado, hipopótamo.'],
      ['Verbos con h y toda su familia.', 'haber, hacer, hablar, hallar, habitar y sus formas: hubo, hicieron, hallamos. Y los compuestos: deshacer, rehuir, inhumano, prehistórico, malhechor.'],
      ['Familias que la pierden.', 'hueso y óseo, huevo y óvalo, huérfano y orfandad, hueco y oquedad: cuando la palabra ya no empieza por ue.'],
      ['Parejas.', 'hola y ola, hecho y echo, hasta y asta, hay, ay y ahí, hora y ora, honda y onda, deshecho y desecho.'],
    ],
    watch: 'Hecho es de hacer (lo he hecho); echo es de echar (echo de menos). Ahí lleva h y tilde: a-hí. Y algunas voces con h se escriben hoy con g o con w: güisqui o wiski, wéstern.',
  },
  gj: {
    blurb: 'Ante e o i, la g y la j suenan igual. Ante a, o, u no hay duda: la g es suave (gato) y la j es fuerte (jabalí).',
    points: [
      ['Con g.', 'Los verbos en -ger, -gir (proteger, dirigir, coger), salvo tejer y crujir. El afijo geo- (geología). Las terminaciones -gía (biología, vigía), salvo bujía, herejía, lejía, apoplejía. La combinación gen (general, imagen, urgente), salvo berenjena, ajeno, jengibre. Las combinaciones ges, gis (gesto, legislar, magisterio), salvo majestad, jesuita, vejestorio.'],
      ['Con j.', 'Las terminaciones -aje, -eje: viaje, garaje, mensaje, hereje. Las terminaciones -jero, -jería: extranjero, relojería. Los verbos en -jear: canjear, hojear, cojear. Las formas de decir, traer y los verbos en -ducir: dije, trajo, conduje, tradujimos. Las derivadas de palabras con ja, jo: rojizo de rojo, quejido de queja.'],
      ['Las formas de un verbo siguen a su infinitivo.', 'cruje de crujir, trabajemos de trabajar, dejéis de dejar; pero protejo y dirija cambian a j ante a, o, para conservar el sonido.'],
      ['Con u.', 'gue, gui: la u no suena (guerra, guitarra). güe, güi: suena y lleva diéresis (pingüino, vergüenza, lingüista).'],
    ],
    watch: 'Las voces extranjeras con g final forman el plural con s (airbags, gags); la terminación inglesa -ing se adapta sin la g: mitin, esmoquin, cáterin.',
  },
  errores: {
    blurb: 'Una lista de palabras que se escriben mal con frecuencia, con la forma correcta y la razón del error cuando se conoce. Se aprende por familiaridad, no por regla.',
    points: [
      ['Cómo leerla.', 'Busca las que tú escribes mal. Apunta tres y úsalas esta semana.'],
      ['Las que más se ven.', 'acérrimo (no aférrimo), beneficencia (no beneficiencia), coger (no cojer), conciencia, decisión (no desición), digresión (no disgresión), excéntrico (no escéntrico), expectativa (no espectativa), exhalar, exhausto.'],
      ['Las que se juntan sin deber.', 'o sea, a veces, a través, de repente, en serio, sin embargo, de acuerdo: siempre separadas.'],
    ],
    watch: 'Muchos errores vienen de una analogía falsa: beneficiencia por ciencia, consanguineidad por sanguíneo, computerizar por el inglés. La palabra base manda: beneficio, sangre, computar.',
  },

  // ---------- Lección 6 · Números ----------
  cifras: {
    blurb: 'No hay una regla universal para escribir un número con letras o con cifras; lo importante es fijar un criterio y mantenerlo. Sí hay casos claros para cada lado.',
    points: [
      ['Con cifras.', 'Cuando el número es una etiqueta o el orden importa: páginas, figuras, calles, años (la página 67, el año 1987). Siempre que va con símbolo: 100 km, 15 %, 24 kg. Y al contrastar datos: 9 vuelos con Francia y 229 con el resto.'],
      ['Con letras.', 'En narrativa y en general los que se dicen en una o dos palabras: uno, quince, veintidós, cien mil. Las frases hechas (cada dos por tres, mil horas) y las cantidades imprecisas (treinta y tantos, veintipico). En letras no llevan comas: diez millones ciento cincuenta y cinco mil.'],
      ['Nunca mezclar letras y cifras en un mismo número.', '40 000 litros o cuarenta mil litros, no 40 mil litros. Sí cabe cifra más sustantivo: 12 millones de personas.'],
      ['Miles y millones: con espacio, no con punto ni coma.', '12 000, 1 500 000. Los de cuatro cifras, juntos: 5600. Nunca se separan los años, las páginas ni los códigos postales: 2026.'],
      ['Decimales: punto o coma, los dos valen.', 'En Colombia se usa la coma (94,5 %), en México el punto; la Ortografía recomienda el punto para unificar. Nunca el apóstrofo (20’3).'],
    ],
    watch: 'Los ordinales con cifra llevan punto y letra volada: 1.º, 2.ª, 20.º aniversario; o números romanos: XX aniversario. Y no se empieza una frase con cifra.',
  },
  fechas: {
    blurb: 'Fechas, horas y porcentajes tienen su forma.',
    points: [
      ['Fecha con letras y números.', '4 de febrero de 1932: el mes en minúscula, el año sin punto. De 2026 y del 2026 valen las dos; en cartas y documentos se prefiere sin artículo. No se quitan las preposiciones: nunca 15 enero 2006.'],
      ['Fecha solo con números.', 'Día, mes y año, sin ceros a la izquierda: 4-2-1932, 4/2/1932, 4.2.1932. El orden mes-día-año no se recomienda. El formato ISO es aaaa-mm-dd: 1932-02-04.'],
      ['Décadas y siglos.', 'los años veinte, los ochenta, la década de los 50; nunca los 80s ni los 80’s. Los siglos en romanos: siglo XXI. Antes de Cristo: a. C.; después: d. C.'],
      ['Hora.', 'En letras: las diez menos cuarto, la una y media. En cifras: 13.30 en el sistema clásico (con punto) o 13:30 en el de la ISO (con dos puntos y dos cifras). En el de 24 horas no se añade de la tarde ni p. m.: las 19:00, no las 19:00 p. m. Para el mediodía, 12 m.; para la medianoche, 12 a. m. o las 0:00.'],
      ['Porcentaje.', '15 %, con espacio antes del símbolo. Con letras: el quince por ciento, no el quince %. Entre el 10 % y el 15 %; en textos generales cabe entre el 10 y el 15 %.'],
    ],
    watch: 'Los días de la semana y los meses van en minúscula aunque sean fiesta: viernes santo, 20 de julio. Con cifra, las horas no llevan el símbolo h: las 15:30, no las 15:30 h.',
  },
  abreviaturas: {
    blurb: 'Abreviaturas, siglas y símbolos son tres cosas distintas, con reglas distintas.',
    points: [
      ['Abreviaturas: con punto y con la tilde de la palabra.', 'pág., Sr., Sra., Dr., Dra., admón., etc., núm., a. m., p. m., EE. UU. Con espacio entre los elementos. Se leen como la palabra entera. Algunas van con barra: c/ (calle).'],
      ['Plural de las abreviaturas.', 'Con s: págs., Sres. Las de una letra se duplican: pp. (páginas), EE. UU., JJ. OO. Las de letra volada: n.º, n.os.'],
      ['Siglas: todo en mayúsculas, sin puntos, sin espacios y sin tilde.', 'ONU, OTAN, DIAN, CIA. Son invariables en plural: las ONG, los CD. Los acrónimos que ya son palabras comunes van en minúscula y con tilde si les toca: láser, ovni, pyme. Los que son nombres propios largos, solo con inicial: Unicef.'],
      ['Símbolos: sin punto, sin plural, con espacio tras la cifra.', 'km, kg, h, m, %: 5 km, 30 %, 24 kg. No son abreviaturas: no admiten cambios.'],
      ['En texto corrido se evitan las abreviaturas.', 'Salvo etc. al final de una lista, a. m. y p. m. tras horas, a. C. tras años, los tratamientos ante nombres (Sr., Dr.), y las remisiones (pág., fig.).'],
    ],
    watch: 'Si la abreviatura cierra la frase, un solo punto. La abreviatura de versus es vs., con punto, en minúscula y en redonda.',
  },

  // ---------- Lección 7 · Extranjerismos ----------
  extranjerismos: {
    blurb: 'Un extranjerismo es una palabra tomada de otra lengua. Puede ir crudo, con su grafía original, o adaptado al español. La RAE y Fundéu recomiendan usar la palabra española cuando la hay.',
    points: [
      ['Crudo: en cursiva, y entre comillas si no se puede usar cursiva.', 'software, jazz, flash, jet, blues. Sin tilde y con la grafía original.'],
      ['Adaptado: en redonda y con las reglas del español.', 'fútbol, béisbol, güisqui o wiski, cruasán, mitin, cóctel, escúter, estándar. Adaptar suele ser añadir una tilde (máster, bádminton), una e ante s más consonante (estándar), cambiar ck por c o qu (bloc, críquet), quitar la g de -ing (campin, cáterin) o la y final tras consonante (panti, poni).'],
      ['Mejor la palabra española cuando la hay.', 'correo en vez de mail, enlace en vez de link, reunión en vez de meeting, de última hora en vez de last minute.'],
      ['Latinismos.', 'Las locuciones latinas van en cursiva y sin tilde: in situ, alma mater, curriculum vitae. Las voces adaptadas van en redonda y con tilde si les toca: currículum, quórum, ítem, referéndum.'],
      ['Transcripciones de otros alfabetos.', 'Se adaptan y van en redonda: manga, anime, samurái, sóviet. Con el grupo sh, ajeno al español, van en cursiva: sharía, geisha.'],
    ],
    watch: 'Las voces que se ajustan al sistema del español van en redonda aunque sean recientes: web, manga. Y hay voces que no se adaptan porque nombran cosas de otra cultura: whisky, sake, kimono.',
  },
  'nombres-propios': {
    blurb: 'Los nombres propios de otras lenguas se escriben como en su origen, salvo que tengan forma española asentada. Los geográficos siguen además las reglas del genérico y el específico.',
    points: [
      ['Topónimos con forma española: se usa la española, con sus tildes.', 'Londres, Nueva York, Pekín, Múnich, Zúrich, París, Támesis, Afganistán. Se acentúan como cualquier palabra española.'],
      ['Sin forma española: se respeta la original.', 'Washington, Ottawa, Wagner (no Wágner). Los nombres de persona se dejan como son: Shakespeare, Beethoven. Los adaptados sí se tildan: Tolstói, Platón, Abderramán.'],
      ['Los reyes y los papas, en español.', 'Isabel II, Carlos III, Francisco, León XIV.'],
      ['El artículo del nombre.', 'Con mayúscula si es parte del nombre oficial (El Salvador, La Habana, El Cairo), y entonces no se contrae: llego de El Cairo. Con minúscula si es opcional: el Perú, la Argentina.'],
      ['Colombia.', 'Medellín, Bogotá, Cúcuta, Ibagué, Cauca llevan tilde; Cali, Cartagena, Barranquilla no. Bogotá D. C., con puntos y espacio. El departamento del Cauca, el río Cauca: genérico en minúscula.'],
    ],
    watch: 'Las lenguas, los pueblos y las etnias van en minúscula: el español, los mayas, los uigures. Y las zonas geopolíticas con mayúscula: Occidente, Oriente Medio, Cono Sur, Hispanoamérica.',
  },
};

export const fichaFor = (id) => FICHAS[id] || null;

// The card that explains a tilde rule, for "Ver la regla" inside the warm-up.
export const RULE_TOPIC = { aguda: 'agudas', llana: 'agudas', esdrújula: 'agudas', sobresdrújula: 'agudas', hiato: 'hiatos', monosílabo: 'monosilabos', diacrítica: 'monosilabos' };
