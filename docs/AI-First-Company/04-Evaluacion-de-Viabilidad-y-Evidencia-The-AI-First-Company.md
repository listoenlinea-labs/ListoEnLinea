# DOCUMENTO 4 DE 5 — EVALUACIÓN DE VIABILIDAD, EVIDENCIA Y RIESGOS
## The AI First Company, Benjamin Simkin
### Auditoría crítica independiente para decisiones empresariales

**Serie de investigación:** Listo en Línea / AI First Company
**Fecha de corte:** 8 de noviembre de 2026
**Edición:** 1.0
**Estatus:** Informe de investigación; no auditoría financiera de empresas participantes ni asesoría jurídica.
**Fuente primaria:** [F01]; fuentes independientes [F02]-[F18].
**Objetivo:** determinar qué recomendaciones del libro son plausibles, cuáles cuentan con evidencia externa, cuáles dependen del contexto y cuáles no deben repetirse como garantías.

# 1. Dictamen ejecutivo

**Dictamen:** el libro es una base conceptual útil para rediseñar operaciones, priorizar cuellos de botella, documentar conocimiento y ampliar autonomía de forma controlada. Su tesis es más sólida como **marco de dirección** que como **pronóstico de márgenes** o guía neutral y definitiva de proveedores. Las pruebas externas confirman ganancias significativas de IA en ciertas tareas, pero también muestran beneficios heterogéneos, períodos de pérdida de productividad, restricciones de costo y un número todavía reducido de organizaciones que identifica resultados importantes sobre utilidad operativa.

Las recomendaciones que mejor resisten un contraste son: partir de un problema económico específico; rediseñar flujos y no sólo añadir herramientas; documentar conocimiento y estándares; probar tareas con información real; implantar controles de producción; mantener trazabilidad; y revisar la restricción del negocio después de cada cambio. [F02][F05][F11]

Las más débiles como proposiciones generales son: que toda automatización aumentará la rentabilidad, que añadir contexto explica o cura cualquier falla, que un proveedor concreto será siempre la mejor elección, que alcanzar una proporción genérica de aciertos permite eliminar supervisión, que un prototipo hecho rápidamente es software empresarial o que una ruta temporal fija garantiza transformación. [F07][F12][F13][F14]

**Dato contemporáneo principal.** En la encuesta McKinsey publicada el 25 de agosto de 2026, 37% de los respondentes atribuyó algún impacto en EBIT a la IA, aproximadamente 6% fue clasificado como grupo de mayor desempeño y cerca de uno de cada cinco indicó que los costos operativos limitaban su uso. El trabajo de campo fue del 4 de mayo al 8 de junio de 2026, con 1,719 participantes de 97 países. Estas son opiniones de encuestados sobre sus organizaciones, no auditorías contables ni una tasa universal de fracaso. [F02]

**Prueba de cautela.** El estudio Noy-Zhang en *Science* observó que, para tareas acotadas de escritura profesional, el tiempo promedio bajó 40% y la calidad subió 18%; un estudio de soporte con 5,179 trabajadores observó alrededor de 14% más asuntos resueltos por hora. Sin embargo, METR halló que profesionales trabajando en repositorios de código maduros fueron 19% más lentos con herramientas de principios de 2025. La aparente contradicción se disuelve si se analiza la tarea, la experiencia, el tipo de producto, las herramientas y el tiempo de revisión. Ningún resultado puede trasladarse automáticamente a otra empresa. [F04][F05][F07]

**Conclusión de inversión:** seleccionar pocos pilotos medibles y reversibles, con línea base, costos completos y criterios de suspensión. Evitar automatizaciones irreversibles y proteger datos personales. La viabilidad económica y la viabilidad técnica son necesarias pero distintas.

# 2. Qué se ha contrastado y qué no

La edición de *The AI First Company* consultada en Scribd está organizada en 35 capítulos y ocho partes. Para no atribuir cifras sin contexto, el análisis traduce sus recomendaciones en 18 proposiciones comprobables y las contrasta con estudios publicados, encuestas empresariales, marcos técnicos de riesgo y fuentes jurídicas oficiales. Se identifican fuentes y fechas en cada ficha. [F01]

**Niveles de evidencia utilizados:** (A) experimento aleatorizado o diseño causal pertinente para una tarea específica; (B) investigación empírica observacional o encuesta de tamaño y alcance declarados; (C) marco técnico, norma o documentación de riesgos; (D) hipótesis de gestión, analogía, preferencia comercial o caso anecdótico. Un hallazgo A sobre redacción no equivale a evidencia A sobre ventas o control de acceso. Una recomendación puede ser prudente sin tener un porcentaje causal universal que la sustente.

**Fuentes que se distinguen expresamente:** estudios en publicaciones académicas (Noy y Zhang; Brynjolfsson, Li y Raymond), investigación experimental (Harvard/BCG; METR), encuestas empresariales (McKinsey 2026; OCDE 2025 y 2026), indicadores compuestos (Stanford AI Index 2026), marcos de seguridad (NIST y OWASP), y normas mexicanas de datos personales. [F02]-[F17]

**Límites:** no se auditó la contabilidad de los negocios citados en el libro, no se obtuvieron sus contratos ni sus métricas primarias, ni se recalcularon todos los gráficos de los estudios. No se compararon cotizaciones comerciales vigentes de cada producto ni sus licencias actuales. Los costos de la sección 8 son escenarios ilustrativos en MXN, expresamente inventados para ensayar decisiones, y **no son precios de mercado**. El Documento 5 adaptará el análisis a información real de Listo en Línea.

# 3. Lo que dicen los datos sobre productividad

## 3.1. Escritura profesional: una intervención con beneficio claro

En 2023, Noy y Zhang publicaron en *Science* un experimento preinscrito con 453 profesionales de educación universitaria y tareas remuneradas de redacción de nivel intermedio. La asignación de acceso a ChatGPT fue aleatoria. Reportaron reducción promedio de tiempo de 40% y mejora promedio de calidad de 18%. Esta es evidencia relevante para generación y edición de textos cuando el contenido es revisable. No estudió procesos enteros de empresas, ni ventas cobradas, ni calidad legal de documentos sensibles. Su edad y versión tecnológica también limitan extrapolaciones a 2026. [F04]

**Lectura de negocio:** es razonable probar borradores de comunicaciones, primeras versiones de propuestas y materiales internos, sin confundir velocidad del primer borrador con tiempo total hasta aprobación.

## 3.2. Soporte al cliente: efecto desigual entre grupos

Brynjolfsson, Li y Raymond estudiaron el despliegue escalonado de un asistente entre 5,179 agentes de soporte. Encontraron cerca de 14% más problemas resueltos por hora, 34% entre empleados novatos o de menor habilidad, y efecto pequeño para los más expertos. También observaron indicadores compatibles con mejor experiencia y transferencia de prácticas. El diseño de despliegue escalonado aporta evidencia útil, pero no convierte esa magnitud en parámetro para hospitales, programación, finanzas o ventas. [F05]

**Lectura de negocio:** una biblioteca de resolución de problemas bien supervisada puede servir como apoyo al personal menos experimentado. Hay que medir al mismo tiempo resolución, escalación, satisfacción, error y formación.

## 3.3. Consultoría: la frontera tecnológica irregular

Harvard y BCG evaluaron a 758 consultores. En tareas situadas dentro de las capacidades de la IA, encontraron mejoras de más de 25% en velocidad, 40% en evaluación de calidad y más de 12% en cumplimiento de tareas. La expresión *frontera irregular* recuerda que una tecnología sobresaliente en algunos trabajos puede fallar en otros de apariencia parecida. [F06]

**Lectura de negocio:** no delegar una profesión completa porque una clase de tarea mejore. Descomponer actividades, evaluar la frontera de capacidades y mantener responsables de decisiones que van más allá de la prueba.

## 3.4. Desarrollo de software: un resultado que impide promesas universales

El experimento aleatorio METR de 2025 reunió a 16 desarrolladores experimentados con 246 tareas de repositorios maduros. Los participantes tardaron alrededor de 19% más cuando podían usar herramientas de IA, pese a prever que serían más rápidos. El estudio tiene límites: muestra pequeña, proyectos específicos y tecnología del periodo febrero-junio de 2025. En febrero de 2026, METR advirtió que su nuevo diseño de estudio sufría sesgo de selección porque algunos desarrolladores evitaban trabajar sin IA. Esa observación exige cautela con cualquier pronóstico sobre productividad contemporánea de código. [F07][F08]

**Lectura de negocio:** comparar corrección de defectos en proyectos antiguos, nuevas funcionalidades pequeñas, refactorización, diseño de pruebas y documentación como grupos separados. Medir tiempo hasta el cambio integrado y desplegado, no líneas generadas ni satisfacción subjetiva del programador.

## 3.5. Por qué no se contradicen los estudios

Los estudios difieren en aleatorización, tarea, duración, calidad de salida, experiencia del participante, versión del producto y métrica. Un asistente reduce esfuerzo de redacción sin dificultad cuando el resultado es verificable y tolera revisión. La misma interacción puede introducir exploración, depuración o retrabajo en un repositorio complejo. **La unidad económica correcta es el resultado aceptado y utilizable**, no el número de acciones del modelo.

# 4. De la adopción al impacto empresarial

## 4.1. Uso extendido no equivale a transformación

El Stanford AI Index 2026 recoge una expansión importante de adopción y señala que los agentes permanecen en etapas tempranas por función. McKinsey 2026 indica que cerca de nueve de cada diez encuestados reportan uso de IA en alguna actividad; 44% identifica escala de IA en toda su empresa, frente a 38% el año anterior. Las definiciones, poblaciones y métodos no son intercambiables: estos valores no describen exactamente a todas las pymes mexicanas. [F02][F03]

## 4.2. La rentabilidad es más difícil de atribuir

El 37% que reporta algún EBIT atribuible a IA no significa que 63% haya fracasado: algunos proyectos están en fase inicial, otros generan beneficios no financieros y los cuestionarios no verifican causalmente el resultado. Tampoco el 37% es una probabilidad de éxito para una inversión nueva. Es evidencia de una brecha entre adopción y beneficios financieros observables. [F02]

McKinsey encuentra mayor desempeño reportado entre organizaciones que rediseñan flujos e invierten también en crecimiento y productos nuevos. Esta correlación apoya la tesis general del libro, aunque las empresas con mejor liderazgo y recursos pueden estar simultáneamente más dispuestas a rediseñar y ser mejores en ejecutar. La asociación no elimina variables de confusión. [F02][F18]

## 4.3. Realidad de pequeñas y medianas empresas

La OCDE, a partir de una encuesta representativa levantada en 2024 a más de 5,000 pymes de siete países, reportó 31% de uso de IA generativa. Otro estudio de 2026, sobre más de 2,000 empresas de doce países, encontró que predominan herramientas listas para usar y que el tiempo, mantenimiento y brechas de habilidades dificultan integraciones estratégicas; este segundo estudio **no utiliza una muestra representativa**, por lo que no debe generalizarse su porcentaje a todo el universo de pymes. [F09][F10]

Esto respalda la conveniencia de tecnologías simples y mejoras graduales para empresas de recursos limitados. Comprar una interfaz es relativamente sencillo; mantener datos, seguridad, evaluaciones y soporte es un compromiso distinto. El libro reconoce varios de estos requisitos, pero su lenguaje de rediseño profundo no debe convertir cada empresa pequeña en un gran proyecto tecnológico.

# 5. Matriz de viabilidad: 18 afirmaciones del libro

Las fichas siguientes clasifican la **aplicabilidad de una tesis en determinados contextos**, no emiten una calificación global del autor. El grado indicado resulta de interpretar fuentes independientes, y los pasos recomendados son una elaboración analítica de esta investigación.

## 01. Rediseñar procesos importa más que acumular herramientas

**Capítulos relacionados:** undefined. **Juicio de evidencia:** RESPALDO PARCIAL FUERTE. **Fuentes:** F02, F18.

**Contraste externo.** McKinsey 2026 asocia a los grupos de mayor impacto con rediseño fundamental de flujos, liderazgo y objetivos de crecimiento, además de eficiencia. McKinsey 2025 observó también una asociación robusta entre rediseño y desempeño. Son encuestas autorreportadas, no ensayos que aíslen el efecto causal del rediseño.

**Veredicto de viabilidad.** Principio gerencial razonable y consistente con la evidencia; NO demuestra que siempre convenga reconstruir procesos existentes desde cero.

**Condición verificable para aplicarla.** Justificar cada rediseño por efecto sobre el flujo completo, costo de migración y calidad del servicio.

## 02. La IA eleva la productividad de los trabajadores

**Capítulos relacionados:** undefined. **Juicio de evidencia:** RESPALDO DIRECTO CON LIMITACIONES. **Fuentes:** F04, F05.

**Contraste externo.** Noy-Zhang: 453 participantes en escritura profesional; -40% de tiempo y +18% de calidad. Brynjolfsson-Li-Raymond: 5,179 agentes, +14% de casos resueltos por hora; efecto mayor en novatos. Son tareas bien delimitadas, no un multiplicador universal del negocio.

**Veredicto de viabilidad.** Puede producir ganancias importantes. El tamaño y la dirección del efecto dependen de tarea, experiencia, calidad requerida y costo de revisión.

**Condición verificable para aplicarla.** Comparar tiempo total y defectos en un conjunto propio de casos, incluyendo supervisión y retrabajo.

## 03. La programación con IA siempre acelera el desarrollo

**Capítulos relacionados:** undefined. **Juicio de evidencia:** NO SOSTENIBLE COMO AFIRMACIÓN UNIVERSAL. **Fuentes:** F07, F08, F14.

**Contraste externo.** El ensayo METR 2025 observó que 16 desarrolladores con experiencia tardaron 19% más en 246 tareas de repositorios maduros. No representa todas las tareas ni las herramientas de 2026. METR advirtió en 2026 sesgo de selección en su experimento posterior, por lo que no hay aquí una magnitud definitiva actual.

**Veredicto de viabilidad.** La automatización de código puede ser productiva en ciertos contextos y contraproducente en otros; benchmark de programación no equivale a entrega de software fiable.

**Condición verificable para aplicarla.** Ensayos por tipo de repositorio, complejidad, revisión, seguridad y tiempo hasta despliegue.

## 04. La ventaja de IA es mayor para trabajadores menos expertos

**Capítulos relacionados:** undefined. **Juicio de evidencia:** RESPALDO PARCIAL SEGÚN TAREA. **Fuentes:** F04, F05.

**Contraste externo.** En soporte se halló +34% para agentes novatos o menos hábiles y poco efecto en los más expertos; estudios de redacción también observaron reducción de diferencias entre trabajadores. No implica que reemplazar entrenamiento, aprendizaje o conocimiento experto sea seguro.

**Veredicto de viabilidad.** La IA puede difundir mejores prácticas, pero el desarrollo de criterio humano necesita espacios deliberados.

**Condición verificable para aplicarla.** Evaluar habilidades adquiridas, errores y dependencia de la herramienta seis meses después.

## 05. La adopción de IA ya es masiva

**Capítulos relacionados:** undefined. **Juicio de evidencia:** RESPALDO FUERTE COMO DIFUSIÓN. **Fuentes:** F02, F03, F09.

**Contraste externo.** AI Index 2026 registra 88% de uso de IA en organizaciones cubiertas por fuentes empresariales. McKinsey 2026 también encuentra uso extendido; la OCDE midió 31% de uso en 5,000+ pymes de siete países en 2024. La adopción varía con población, fecha, tamaño de empresa y definición de uso.

**Veredicto de viabilidad.** Hay adopción extendida, pero 'usar alguna IA' es distinto de integrar sistemas de producción o demostrar rentabilidad.

**Condición verificable para aplicarla.** Separar experimentación, despliegue estable, escala y beneficio financiero.

## 06. La adopción de IA se traduce en mayor margen empresarial

**Capítulos relacionados:** undefined. **Juicio de evidencia:** RESPALDO LIMITADO PARA GENERALIZAR. **Fuentes:** F02.

**Contraste externo.** McKinsey agosto 2026: sólo 37% de respondentes atribuye algún impacto de EBIT a IA y alrededor de 6% cumple su definición de high performer. Son atribuciones declaradas, no pruebas contables auditadas de causalidad.

**Veredicto de viabilidad.** La mejora de margen es posible, no esperable por defecto. Horas liberadas no son automáticamente ahorro ni ventas.

**Condición verificable para aplicarla.** Modelo de costo total, capacidad realmente monetizada, costos de error y comparaciones antes/después.

## 07. La documentación empresarial mejora la automatización

**Capítulos relacionados:** undefined. **Juicio de evidencia:** PLAUSIBILIDAD ALTA; EFECTO CUANTITATIVO NO ESTABLECIDO. **Fuentes:** F05, F11, F12.

**Contraste externo.** NIST demanda contexto, delimitación y gobernanza; hallazgos sobre difusión de mejores prácticas en soporte son compatibles con la propuesta. No se identificó un experimento independiente que demuestre una proporción universal del valor atribuible a contexto frente a prompts o modelos.

**Veredicto de viabilidad.** La documentación versionada es una inversión justificable incluso sin IA. La magnitud exacta de su ventaja exige pruebas propias.

**Condición verificable para aplicarla.** Medir precisión, tiempo de incorporación y errores por falta o vigencia de documentos.

## 08. La ventana de contexto explica casi todos los fallos

**Capítulos relacionados:** undefined. **Juicio de evidencia:** NO RESPALDADO COMO CAUSALIDAD GENERAL. **Fuentes:** F12, F14, F15.

**Contraste externo.** NIST documenta riesgos de respuestas falsas, privacidad y uso impropio; Stanford AI Index muestra límites persistentes de capacidad y evaluación. El contexto puede ser insuficiente o contradictorio, pero hay fallas de razonamiento, búsqueda, herramientas y permisos que no se resuelven añadiendo texto.

**Veredicto de viabilidad.** Contexto correcto es necesario en muchas tareas, pero no suficiente para confiabilidad.

**Condición verificable para aplicarla.** Evaluar por separado recuperación, generación, validación y ejecución.

## 09. Un agente puede operar sistemas externos con autonomía

**Capítulos relacionados:** undefined. **Juicio de evidencia:** VIABLE BAJO LÍMITES SEVEROS. **Fuentes:** F13, F14.

**Contraste externo.** Stanford AI Index 2026 informa alrededor de 66% de éxito en OSWorld para agentes, aún lejos de fiabilidad absoluta; OWASP describe inyección de instrucciones, permisos excesivos y manejo inseguro de salidas.

**Veredicto de viabilidad.** La autonomía es defendible en tareas de bajo daño y acciones reversibles. No se justifica control irrestricto sobre transacciones, datos de salud o seguridad física.

**Condición verificable para aplicarla.** Permisos mínimos, validación determinista, confirmación y límites de operación.

## 10. RAG y una biblioteca documental eliminan alucinaciones

**Capítulos relacionados:** undefined. **Juicio de evidencia:** NO RESPALDADO COMO GARANTÍA. **Fuentes:** F12, F13.

**Contraste externo.** RAG puede conectar respuestas con fuentes, pero no asegura que la información recuperada sea pertinente, actual, autorizada o interpretada correctamente. NIST reconoce errores confiados y riesgos de privacidad; OWASP advierte de instrucciones y contenido malicioso en fuentes externas.

**Veredicto de viabilidad.** Es una arquitectura de apoyo, no una garantía de verdad o seguridad.

**Condición verificable para aplicarla.** Conjunto de preguntas de referencia, prueba de permisos, citas correctas y abstención cuando falta evidencia.

## 11. Las integraciones siempre crean más valor que los puntos aislados

**Capítulos relacionados:** undefined. **Juicio de evidencia:** PLAUSIBLE EN FLUJOS CONECTADOS; CONDICIONADO. **Fuentes:** F02, F11, F13.

**Contraste externo.** Las encuestas muestran relación entre rediseño y resultados, pero no prueban que todas las integraciones superen a herramientas aisladas. Conectar múltiples sistemas aumenta también costo, dependencias, complejidad y superficie de ataque.

**Veredicto de viabilidad.** Integrar cuando se elimine una transferencia de información costosa y haya fuente de verdad confiable.

**Condición verificable para aplicarla.** Contrato API, idempotencia, ownership de datos, fallback y costo total.

## 12. Comprar es preferible salvo diferencia competitiva real

**Capítulos relacionados:** undefined. **Juicio de evidencia:** HEURÍSTICA ESTRATÉGICA, NO LEY. **Fuentes:** F02, F10.

**Contraste externo.** En McKinsey 2026, 32% de encuestados reportó que su organización dejó de comprar al menos una función de software que podía desarrollar internamente con agentes. No se verificaron ahorros ni su costo total de mantenimiento.

**Veredicto de viabilidad.** Comprar, construir o esperar debe decidirse con horizonte de 24-36 meses, riesgo y capacidad de salida.

**Condición verificable para aplicarla.** Probar requisitos obligatorios y comparar TCO, seguridad, soporte y costo de reemplazo.

## 13. Una demostración funcional comprueba preparación para producción

**Capítulos relacionados:** undefined. **Juicio de evidencia:** REFUTADO COMO SUFICIENCIA. **Fuentes:** F13, F14.

**Contraste externo.** El avance en benchmarks no elimina fallas en pruebas reales; Stanford reporta desempeño irregular y OWASP detalla vulnerabilidades de operación. Una demo puede omitir casos difíciles y trabajo humano oculto.

**Veredicto de viabilidad.** La demo prueba posibilidad básica, no confiabilidad, mantenimiento, recuperación ni cumplimiento.

**Condición verificable para aplicarla.** Pruebas no preparadas por el vendedor, casos adversarios, telemetría y controles de incidentes.

## 14. Se puede retirar revisión humana al superar un porcentaje fijo

**Capítulos relacionados:** undefined. **Juicio de evidencia:** NO RECOMENDABLE COMO REGLA FIJA. **Fuentes:** F11, F12, F13.

**Contraste externo.** Un promedio alto de aciertos puede ocultar errores críticos. NIST considera probabilidad e impacto y recomienda decisiones informadas según contexto. OWASP distingue riesgo de exceso de autonomía.

**Veredicto de viabilidad.** La autonomía debe segmentarse por gravedad, reversibilidad, incertidumbre y consecuencias del error.

**Condición verificable para aplicarla.** No aceptar fallos catastróficos bajo una meta porcentual agregada.

## 15. Concentrarse en un solo ecosistema de IA es más eficiente

**Capítulos relacionados:** undefined. **Juicio de evidencia:** NO DEMOSTRADO UNIVERSALMENTE. **Fuentes:** F02, F14.

**Contraste externo.** La ventaja de operación integrada puede reducir cambios de herramienta, pero hay riesgos de lock-in, precios, residencia de datos y continuidad. Stanford observa convergencia entre proveedores líderes; eso hace relevante evaluar opciones por caso de uso y no fidelidad a una marca.

**Veredicto de viabilidad.** Preferir interoperabilidad, datos exportables y pruebas comparables de calidad/costo; consolidar sólo cuando el ahorro sea real.

**Condición verificable para aplicarla.** Plan de migración, inventario de dependencias y evaluación periódica de proveedor.

## 16. La IA reduce la necesidad de empleados

**Capítulos relacionados:** undefined. **Juicio de evidencia:** EVIDENCIA MIXTA; NO CONCLUIR REEMPLAZO AUTOMÁTICO. **Fuentes:** F02, F09, F10.

**Contraste externo.** La OCDE observa beneficios percibidos y demanda de habilidades; McKinsey 2026 apunta que reducciones laborales efectivas estuvieron por debajo de expectativas previas, mientras productividad individual se reporta mejorada. Los resultados dependen de demanda, crecimiento y reorganización.

**Veredicto de viabilidad.** Diseñar roles y capacitación antes de equiparar capacidad liberada con recorte monetario.

**Condición verificable para aplicarla.** Proteger aprendizaje, calidad de empleo, soporte y experiencia del cliente.

## 17. Una hoja de ruta 90 días / 1 año / 3 años sirve a todos

**Capítulos relacionados:** undefined. **Juicio de evidencia:** ÚTIL COMO SECUENCIA, NO COMO PLAZO UNIVERSAL. **Fuentes:** F02, F10.

**Contraste externo.** La OCDE 2026 identifica límites de tiempo, mantenimiento y habilidades en pymes; McKinsey observa diferencias significativas entre empresas grandes y pequeñas. No existe evidencia de que un calendario uniforme produzca ROI en todos los sectores.

**Veredicto de viabilidad.** Usar hitos y puertas de calidad; ajustar calendario a datos, regulación y deuda técnica.

**Condición verificable para aplicarla.** No avanzar por fecha si faltan documentación, seguridad o evidencia económica.

## 18. El propietario debe pasar de operar a diseñar sistemas

**Capítulos relacionados:** undefined. **Juicio de evidencia:** MARCO GERENCIAL PLAUSIBLE; NO CAUSALMENTE CUANTIFICADO. **Fuentes:** F02, F11.

**Contraste externo.** Los hallazgos sobre rediseño, gobierno y coordinación apoyan el cambio de rol; no demuestran que retirarse de las operaciones aumente por sí mismo rentabilidad o confianza. La gestión requiere cercanía con clientes y aprendizaje humano.

**Veredicto de viabilidad.** Delegación con estándares, revisión por muestreo y decisiones reservadas para asuntos críticos.

**Condición verificable para aplicarla.** Medir dependencia del fundador y calidad de servicio tras delegación.


# 6. Viabilidad por tipo de empresa y proceso

## 6.1. Empresa de servicios profesionales

**Alta plausibilidad:** clasificación de correos, primeros borradores, preparación de reportes, búsqueda de políticas internas, asistentes para personal que aprende y consolidación de registros repetitivos. Las tareas deben ser frecuentes, claras y revisables. [F04][F05]

**Viabilidad condicionada:** generación de estrategias comerciales o consultas financieras, donde los datos de origen, el conocimiento de mercado y la responsabilidad humana determinan utilidad. **No recomendable sin gobierno especial:** enviar propuestas o compromisos contractuales de forma totalmente autónoma. Efecto esperado: productividad de funciones específicas; no presupuestar crecimiento anual automático.

## 6.2. Empresa desarrolladora de software

**Alta plausibilidad:** documentación de código, pruebas propuestas como borradores, asistentes de búsqueda, prototipos que se reconstruyen o verifican, y análisis de incidencias. **Condicionada:** refactorizaciones y entregas importantes en repositorios existentes; aplicar pruebas por categoría. **No recomendable:** permitir agentes de programación con acceso amplio a producción, secretos o cuentas administrativas sin permisos limitados, revisión y pruebas. [F07][F08][F13]

La encuesta McKinsey 2026 detecta que 32% de respondentes indicó decisión de no comprar alguna función que sus organizaciones podían construir internamente con agentes de programación. El hecho ilustra cambio de conducta de compra, no una prueba de que cada reconstrucción sea rentable. [F02]

## 6.3. Comercio y servicio al cliente

**Alta plausibilidad:** asistir en preguntas frecuentes, orientar hacia políticas de devolución, preparar contenidos y clasificar solicitudes. **Condicionada:** mensajes a clientes, promociones personalizadas y ofertas dependientes de existencias reales. **No recomendable:** modificar saldos, hacer reembolsos o interpretar identificaciones sin comprobación. Medir venta neta, quejas, devoluciones y efecto sobre reputación. [F05][F13]

## 6.4. Administración de inmuebles y servicios físicos

**Alta plausibilidad:** revisión de reportes de mantenimiento, resumen de incidencias, clasificación de solicitudes y preparación de comunicados sujetos a aprobación. **Condicionada:** reconocer pagos desde comprobantes o capturas de pantalla; una imagen de depósito no equivale a confirmación bancaria. **No recomendable:** habilitar acceso físico o denegarlo automáticamente basándose sólo en texto generado por IA. El sistema transaccional debe aplicar reglas exactas, evidencias y autorizaciones. [F11][F13]

Esta sección plantea condiciones generales de viabilidad, no una especificación de los proyectos particulares de Listo en Línea. La propuesta de arquitectura concreta está reservada al Documento 5.

## 6.5. Salud, clínica y datos sensibles

**Alta plausibilidad:** apoyo a redacción administrativa sin información innecesaria, búsqueda documental de políticas autorizadas y clasificación de tareas internas. **Viabilidad más restringida:** cualquier procesamiento de historiales, recetas, identidades o datos biométricos, debido a privacidad, seguridad y responsabilidad. **No recomendable sin validación clínica y regulatoria:** decisiones automáticas sobre pacientes o tratamientos. NIST identifica expresamente riesgos por información falsa y datos sensibles. [F12][F16]

## 6.6. Restricción transversal por tamaño

Un equipo pequeño puede tener mayor velocidad de adopción, pero menor capacidad para sostener múltiples integraciones y revisar incidentes. En lugar de poner una IA en las siete zonas al mismo tiempo, conviene empezar por uno o dos procesos suficientemente rentables y documentados. Esta es una inferencia estratégica respaldada indirectamente por los obstáculos de tiempo, mantenimiento y habilidades recogidos por la OCDE. [F09][F10]

# 7. Evaluación técnica: qué funciona y qué no garantiza resultados

## 7.1. Generación de texto y clasificación

**Madurez relativa:** alta en tareas estrechas y revisables. **Fallos típicos:** números incorrectos, detalles inventados, incomprensión de excepciones, inconsistencias en salidas repetidas. **Controles:** esquema de salida, restricciones por categoría, reglas deterministas y registro de revisiones. El éxito en tareas de ensayo no implica igual desempeño frente a datos propios o clientes reales. [F04][F12]

## 7.2. RAG y bibliotecas de conocimiento

**Madurez relativa:** viable para consulta documental con fuentes y permisos. **Fallos:** recuperación incompleta, fragmentos obsoletos, datos de distintos usuarios mezclados, interpretación errónea o fuentes que contienen instrucciones maliciosas. **Controles:** índices con metadatos de vigencia, búsqueda híbrida, separación por cliente, citas verificables y prueba de preguntas sin respuesta. Una biblioteca puede reducir incertidumbre sin eliminarla. [F11][F12][F13]

## 7.3. Agentes conectados a aplicaciones

**Madurez relativa:** creciente, pero de fiabilidad heterogénea. Stanford HAI 2026 indica un salto del desempeño en OSWorld hasta alrededor de 66%, todavía con fallas considerables en una evaluación estructurada; tal cifra no es la probabilidad de éxito de un agente comercial específico. **Controles:** lista de herramientas aprobadas, scopes, límites de gasto y acciones, confirmaciones y circuit breaker. [F14][F13]

## 7.4. Integración y protocolos

**Madurez relativa:** las APIs y webhooks son prácticas sólidas; cualquier protocolo que conecte modelos con acciones necesita políticas adicionales. **Fallos:** credenciales excesivas, acciones duplicadas, reintentos no idempotentes, pérdida de contexto de permisos. **Controles:** fuente de verdad única por dato, eventos con identificador, timeouts, control de acceso, pruebas de contrato y reversión. El hecho de usar un protocolo estandarizado no certifica seguridad.

## 7.5. Investigación con agentes

**Madurez relativa:** útil para descubrir alternativas y preparar comparativas. **Fallos:** citas mal asociadas, fuentes comerciales confundidas con análisis, fechas obsoletas y falsa exhaustividad. **Controles:** lista de fuentes primarias, fechas de corte, afirmaciones asociadas a evidencias y revisión humana antes de una inversión.

## 7.6. Generación de código y constructores rápidos

**Madurez relativa:** útil como acelerador de exploración; variabilidad considerable para productos con usuarios y obligaciones reales. **Fallos:** seguridad de autenticación, migraciones, manejo de errores, falta de pruebas y deuda técnica invisible. **Controles:** repositorio independiente de la plataforma, validación de datos, pruebas automatizadas, revisión de seguridad y despliegue reproducible. [F07][F13]

## 7.7. Herramientas audiovisuales sintéticas

**Madurez relativa:** técnicamente productivas para contenido repetitivo. **Impacto de negocio:** incierto hasta medir conversión, aprendizaje o satisfacción. **Riesgos:** voz e imagen sin permiso, suplantación, información falsa y pérdida de credibilidad. **Controles:** consentimiento, derechos de uso, aviso cuando corresponda, revisión del contenido y comparación con alternativas tradicionales.

# 8. Economía real: costo total y escenarios ilustrativos

## 8.1. La contabilidad que hace falta

La afirmación "la IA nos ahorra 30 horas" es incompleta. **Costo total de propiedad (TCO)** incluye adquisición, configuración, formación, infraestructura, modelos/tokens, almacenamiento, software de terceros, validación, revisión humana, observabilidad, seguridad, incidentes, actualización y posible migración de proveedor. El costo debe distribuirse a la unidad que compra el cliente: cotización aprobada, ticket resuelto, conciliación correcta, entrega sin defectos o venta realmente cobrada.

**Fórmula de decisión elaborada en este informe:**
Beneficio mensual neto = ingresos cobrados adicionales + costos de caja eliminados + valor monetizable de capacidad adicional usada - costos recurrentes - implementación amortizada - costo esperado de fallas.

**Precaución:** no sumar dos veces ingresos y valor de las mismas horas utilizadas. El valor monetizable de capacidad puede ser cero cuando no hay demanda, no se reducen costos de nómina y el tiempo no se reasigna a trabajo productivo.

## 8.2. Caso ilustrativo A: elaboración de cotizaciones

**Supuestos hipotéticos, no precios de mercado:** 80 cotizaciones al mes; 25 minutos de trabajo neto ahorrado por cotización después de revisión; costo de oportunidad de 250 MXN por hora; sólo 60% de la capacidad adicional se aprovecha para tareas facturables o necesarias; operación tecnológica 2,000 MXN mensuales; implementación amortizada 1,500 MXN al mes.

**Cálculo:** 80 × 25 / 60 = 33.33 horas potenciales. Valor recuperable: 33.33 × 250 × 0.60 = 5,000 MXN. Costos: 3,500 MXN. **Beneficio neto ilustrativo: +1,500 MXN/mes.** Si la reutilización del tiempo bajara de 60% a 30%, el beneficio sería **-1,000 MXN/mes**. Un cambio en un supuesto domina el resultado.

**Veredicto:** viable sólo si existe demanda real para el tiempo liberado y la cotización mantiene calidad. El primer borrador rápido, por sí mismo, no paga la integración.

## 8.3. Caso ilustrativo B: soporte recurrente

**Supuestos hipotéticos:** 1,000 tickets/mes, ahorro neto de 4 minutos por ticket, costo humano de 160 MXN/hora, 60% del tiempo con valor recuperable; licencias y consumos 5,500 MXN/mes, soporte y mantenimiento 3,000 MXN/mes.

Horas liberadas: 1,000 × 4 / 60 = 66.67 horas. Valor recuperable: 66.67 × 160 × 0.60 = 6,400 MXN. Costos: 8,500 MXN. **Resultado ilustrativo: -2,100 MXN/mes**. Para equilibrio con todos esos supuestos, serían necesarios aproximadamente **5.31 minutos netos ahorrados por ticket**, no cuatro. Hay que medir también calidad de atención y satisfacción, no sólo costo.

**Veredicto:** no conviene implantar una arquitectura costosa para una reducción pequeña de tiempo. Una opción de menor precio, mayor volumen o una ruta asistida simple podría cambiar la decisión.

## 8.4. Caso ilustrativo C: apoyo a desarrollo

**Supuestos hipotéticos:** 40 tickets de software/mes de 3 horas promedio; reducción del 10% del tiempo útil (12 horas al mes), tarifa interna de capacidad de 300 MXN/h; valor bruto si se aprovecha todo: 3,600 MXN. Revisión, correcciones y pruebas adicionales: 10 horas (3,000 MXN). Consumo de herramientas: 1,000 MXN. **Resultado ilustrativo: -400 MXN/mes**, incluso antes de amortizar configuración.

**Veredicto:** una herramienta rentable para prototipos puede no serlo para repositorios complejos. Aumentar porcentaje de ahorro neto o reducir retrabajo cambia la decisión; la medición debe hacerse antes de comprar licencias para todo el equipo.

## 8.5. Punto de equilibrio y sensibilidad

Una inversión puede tener retorno positivo en promedio y seguir siendo inaceptable si un fallo improbable produce daño elevado. En cada piloto se debe calcular un punto de equilibrio (tareas necesarias, minutos netos, tasa de reutilización o margen por venta), sensibilidad de tres variables y máximo costo tolerable por incidente.

**No son cotizaciones reales:** ningún valor de los ejemplos A-C se atribuye a OpenAI, Anthropic, McKinsey, proveedores de nube o clientes; sólo muestra cómo un cambio de supuestos altera la viabilidad. Para presupuestos comerciales deben obtenerse precios y volúmenes actuales, validarse impuestos y definirse responsabilidades.

# 9. Seguridad, privacidad y cumplimiento

## 9.1. El riesgo no aparece sólo cuando el modelo se equivoca

Una respuesta técnicamente correcta puede vulnerar privacidad si la información se envía al destinatario equivocado. Un agente puede ejecutar una acción permitida para el sistema, pero no autorizada por el usuario. OWASP 2025 incluye inyección de instrucciones, exposición de información sensible, cadena de suministro, manejo inseguro de salida y exceso de autonomía entre las amenazas a aplicaciones de IA. [F13]

La seguridad requiere **identidad, autorización, minimización de datos, segmentación, validación y trazabilidad**. Un prompt que diga "no revelar secretos" no sustituye controles de permisos. Una prueba de conversación amigable no demuestra seguridad ante un archivo, correo o página que intente modificar la conducta del agente.

## 9.2. NIST como estructura de gobierno

El marco voluntario AI RMF de NIST emplea cuatro funciones: Govern, Map, Measure y Manage. Su Playbook advierte que no debe leerse como una lista obligatoria y universal; las medidas deben seleccionarse por contexto y riesgo. El perfil de IA generativa NIST 600-1 trata, entre otros, falsedades expresadas con confianza, filtración de datos y riesgos de gobernanza. [F11][F12]

**Aplicación mínima:** responsable del sistema, propósito permitido, datos autorizados, clases de daño, pruebas, registros, revisión de incidentes y facultad de suspensión. La gobernanza se diseña antes de otorgar capacidades de escritura.

## 9.3. México: datos personales

La nueva Ley Federal de Protección de Datos Personales en Posesión de los Particulares se publicó el 20 de marzo de 2025; la fuente consolidada de la Cámara de Diputados consultada señala una reforma posterior del 14 de noviembre de 2025. Para empresas que tratan datos de clientes, empleados o usuarios, se deben revisar al menos fines del tratamiento, avisos de privacidad, medidas de seguridad, transferencias, relación con encargados y derechos de las personas titulares. [F16][F17]

**No es dictamen jurídico:** obligaciones concretas, consentimientos, transferencias internacionales, datos sensibles y contratos con proveedores requieren revisión bajo el texto vigente y el caso concreto. No se debe enviar automáticamente información de salud, identidad, nómina, biometría, claves o finanzas a un modelo de propósito general.

## 9.4. Matriz de riesgos con controles recomendados

| Riesgo | Impacto posible | Prevención y recuperación |
|---|---|---|
| Confabulación | Cifras o hechos inventados | Validar contra fuente oficial y permitir abstención |
| Inyección indirecta | Acción no autorizada por leer contenido malicioso | Aislar datos de instrucciones; permisos mínimos |
| Fuga de información | Incidente de privacidad o reputación | Separar clientes; cifrar; minimizar y auditar accesos |
| Acciones excesivas | Cobros, cambios o mensajes incorrectos | Aprobación y límites explícitos por herramienta |
| Duplicidad | Dos pagos, dos altas, dos comunicaciones | Idempotencia, controles transaccionales y conciliación |
| Deriva de modelos | Calidad cambiante tras actualizaciones | Versionado, pruebas de regresión y rollback |
| Dependencia del proveedor | Interrupción o sobrecostos | Exportación, desacoplamiento y modo manual |
| Falta de evidencia | Decisión difícil de explicar | Registro suficiente y protegido de datos/versiones |
| Sesgo | Atención inconsistente a usuarios | Evaluación por segmentos y revisión de daños |
| Falla de integración | Datos desactualizados o mezclados | Monitoreo, timeout, colas y reconciliación |
| Fatiga del revisor | Errores no detectados en aprobaciones masivas | Muestreo por riesgo y controles automáticos previos |
| Capacidad del equipo | Dependencia técnica o abandono del servicio | Formación, manuales, propiedad y soporte |

## 9.5. Regla de intervención humana

**Riesgo bajo y reversible:** se puede experimentar con automatización y registros. **Riesgo medio:** IA sugiere y una regla o persona valida; limitar acciones. **Riesgo alto o irreversible:** revisión humana competente, validación determinista y pruebas específicas. El grado de autonomía no se define por un porcentaje agregado de aciertos, sino por tipos de daño, consecuencias y capacidad de recuperación. [F11][F13]

# 10. Condiciones comerciales para que un proyecto sea viable

Una solución puede funcionar perfectamente y aun así carecer de cliente o margen. El libro destaca velocidad, costos, escala y diferenciación; el contraste externo exige verificar cada eslabón. Una empresa debe demostrar que la capacidad adicional se vende, que la calidad no cae, que las integraciones no consumen más de lo ahorrado y que los usuarios confían en el resultado.

**Unidad de análisis:** un servicio o resultado terminado. **Línea base:** volumen y calidad durante semanas comparables. **Hipótesis:** efecto de una intervención acotada. **Control:** grupo o periodos comparables cuando sea posible. **Métrica principal:** contribución económica o satisfacción con una tasa de error máxima. **Decisión:** ampliar, rediseñar, mantener asistido, pausar o abandonar.

También debe evaluarse si el valor es defendible frente a competidores que contraten la misma IA. El conocimiento propio, relaciones con clientes, sistemas integrados, datos obtenidos legítimamente y la reputación pueden ser más difíciles de copiar que el prompt o la marca comercial de una plataforma.

# 11. Protocolo de evaluación empírica antes de invertir

## Etapa 0. Definir el problema y su dueño

Escribir un proceso y el costo del resultado actual. Registrar 20-100 casos históricos según volumen y riesgo; reservar excepciones importantes. No imponer ese rango como norma de tamaño estadístico. El número final debe responder a variabilidad, defectos esperados y criticidad.

## Etapa 1. Línea base y distribución de casos

Medir desde recepción hasta aceptación del resultado. Registrar tiempo de preparación, búsqueda, revisión, corrección, espera y escalación. Diferenciar trabajadores nuevos y expertos, clientes sencillos y complejos, y casos normales y fuera de alcance.

## Etapa 2. Prueba controlada

Alternar o aleatorizar el uso de IA cuando sea operacionalmente posible. Evitar que los mismos ejemplos sirvan a la vez para ajustar prompts y evaluar. Registrar todos los costos y también los errores que la supervisión previene. Si no se puede aleatorizar, declarar confusores y comparar prudencialmente.

## Etapa 3. Evaluación por daño

Medir precisión, suficiencia de evidencia, cumplimiento de políticas, privacidad y acciones indebidas por clase de caso. Para pagos, historiales o seguridad física se requiere **cero fallas críticas en pruebas de aceptación**, aunque esa condición no demuestra ausencia definitiva de riesgos.

## Etapa 4. Economía y sensibilidad

Calcular beneficio neto por mes, inversión amortizada, costo máximo tolerable por tarea, escenarios conservador/base/adverso y tiempo de recuperación de la inversión. No dar por valioso el tiempo que no pueda utilizarse. Registrar además percepción del cliente y mantenimiento.

## Etapa 5. Gobierno y ampliación

Autorizar por escrito una de cinco decisiones: no implementar, mantener como asistente, ampliar con revisión, dar autonomía parcial de bajo riesgo o replantear arquitectura. Prescribir la fecha de nueva evaluación y una ruta de salida.

## Etapa 6. Seguimiento posterior

Observar degradación tras cambios de modelo, documentos, interfaces o demandas. Comparar costos reales contra estimación; preservar controles de seguridad y registro. Una automatización que funcionó la primera semana no está necesariamente preparada para sostener un servicio anual.

# 12. Criterios de suspensión inmediata

**Detener y revisar** cuando: a) el sistema ejecuta una acción fuera de sus permisos; b) mezcla datos entre clientes; c) inventa saldos, resultados clínicos, autorizaciones o referencias de cobro; d) duplica transacciones; e) falla silenciosamente una integración; f) el costo por resultado supera la alternativa de manera sostenida; g) las tasas de errores críticos suben respecto de la base; h) se pierde trazabilidad de decisiones; o i) cambia un requisito contractual o legal que invalida la finalidad prevista. La gravedad de uno solo de los primeros cuatro supuestos puede justificar suspensión sin esperar una tendencia estadística.

# 13. Comparativa de decisiones: adoptar, adaptar, posponer o descartar

| Recomendación evaluada | Decisión general | Condición no negociable |
|---|---|---|
| Rediseño de flujos | ADOPTAR CON DIAGNÓSTICO | Beneficio medido del flujo completo |
| Biblioteca de conocimiento | ADOPTAR | Versión, responsable, permisos y vigencia |
| Clasificación/redacción asistida | PILOTO PREFERENTE | Revisión y casos de prueba propios |
| Mapa económico por restricción | ADOPTAR | Línea base y cálculo neto |
| Comprar/desarrollar/esperar | ADOPTAR COMO FILTRO | TCO y salida del proveedor |
| RAG documental | SEGÚN ESCALA | Recuperación y seguridad demostradas |
| Agentes de lectura | PILOTO ACOTADO | Fuentes y permisos mínimos |
| Agentes con escritura | CONDICIONADO | Aprobación por impacto e idempotencia |
| Agentes de pago/acceso/salud | POSPONER AUTONOMÍA | Reglas deterministas, seguridad y pruebas |
| Reemplazar revisión humana por tasa fija | DESCARTAR COMO NORMA | Decidir según gravedad del error |
| Herramienta audiovisual sintética | EXPERIMENTAR | Consentimiento y conversión comprobada |
| Desarrollar todo con generadores | DESCARTAR COMO PRINCIPIO | Ingeniería y sostenibilidad antes de producción |
| Un proveedor único por defecto | NO IMPONER | Portabilidad y comparación revisable |
| Hoja 90d/1a/3a | USAR COMO ORIENTACIÓN | Puertas de calidad y ritmo propio |

# 14. El conflicto entre velocidad y fiabilidad

El libro invita a actuar antes de perder oportunidades, pero también a esperar cuando la categoría tecnológica sea inmadura. Ambas posiciones son compatibles si se distinguen experimentos de despliegues. Un prototipo sin datos sensibles puede ser barato y reversible; una decisión que administra dinero, información de salud o control de acceso puede tener costos de error muy superiores al ahorro esperado.

**Principio económico:** optimizar velocidad de aprendizaje en entornos reversibles y confiabilidad en sistemas críticos. La mayor eficiencia no se logra eliminando controles; se logra evitando controles manuales redundantes cuando existe validación determinista y trazabilidad suficiente.

# 15. Sesgos y vacíos del libro que deben quedar explícitos

**Casos narrativos seleccionados:** las empresas exitosas citadas pueden no representar al conjunto de intentos. Faltan denominadores, fracasos, periodos de medición y comparación independiente. No se debe asignar una tasa de éxito basada en ejemplos persuasivos.

**Superposición de beneficios:** horas ahorradas, mayor capacidad, aumento de ventas y margen pueden describir la misma ganancia en diferentes pasos. Sumarlas sin controles dobla beneficios.

**Sesgo de proveedor:** las marcas preferidas en la obra son una foto temporal, no estándares universales de 2026. Los contratos, costos, políticas y versiones cambian.

**Atribución causal:** crecimiento en una empresa que adopta IA no prueba que la IA lo haya causado. Otros cambios simultáneos —oferta, mercado, precios, dirección o publicidad— deben registrarse.

**Brecha entre prueba y producción:** resultados de un modelo sobre tareas seleccionadas no incluyen manejo de excepciones, soporte, privacidad ni recuperación ante errores.

**No universalidad sectorial:** procesos donde hay cuerpos, dinero, bienes, obligaciones legales y confianza interpersonal no son equivalentes a redacción o análisis de datos.

**Protección de aprendizaje humano:** eliminar tareas de iniciación puede reducir la formación del talento que verificará resultados futuros.

**Sobrecosto silencioso:** supervisión, versiones nuevas, mantenimiento de conectores y fallas rara vez aparecen en la cotización de la primera demo.

# 16. Recomendaciones verificadas para dirección empresarial

1. **Empezar por el resultado**, no por una marca o chatbot. Exigir una métrica que el negocio ya conoce.
2. **Elegir casos revisables y reversibles** para iniciar el aprendizaje; no asignar autonomía a sistemas críticos en el primer proyecto.
3. **Documentar fuentes oficiales y excepciones** antes de prometer respuestas automáticas precisas.
4. **Comparar con un flujo sin IA**; a veces un formulario, una regla o una integración API resuelven el problema con menos incertidumbre.
5. **Incluir el costo completo**: consumo, revisión, capacitación, integración y retirada.
6. **Probar con personas y casos reales**, sin introducir riesgos indebidos para clientes ni exponer secretos.
7. **Preservar portabilidad** de datos, conocimiento y código donde sea posible.
8. **Dar permisos mínimos**; nunca interpretar una página recuperada como autorización de ejecutar acciones.
9. **Tratar las cifras de estudios como evidencia específica**, no como promesa de porcentajes comerciales.
10. **Revisar cada nueva restricción** después de una mejora; automatización no equivale a crecimiento permanente.

# 17. Veredicto por horizonte de inversión

**0-90 días — viable con prudencia:** inventarios de procesos, biblioteca de contexto, documentación, preparación de borradores, apoyo a investigación y pruebas asistidas con conjunto de aceptación. Costo potencialmente controlable y reversibilidad alta si no se conectan acciones críticas.

**3-12 meses — viable según disciplina de ingeniería:** integración de flujos y asistentes especializados con trazabilidad, métricas, procedimientos de recuperación y pruebas de permisos. Priorizar un proceso económico central antes de abrir otros.

**1-3 años — hipótesis estratégica, no pronóstico:** mayor interconexión y autonomía limitada a funciones demostradas. Debe depender de demanda, capacidad de mantener el sistema, normativas y resultados auditados; el calendario no genera ROI por sí mismo.

# 18. Dictamen final

**Calificación metodológica global: útil como marco, insuficiente como evidencia financiera autónoma.** Los principios de estrategia, restricciones, contexto, integración y fiabilidad merecen incorporarse a una caja de herramientas de dirección. Sus resultados cuantitativos, preferencia por proveedores y cronogramas deben tratarse como hipótesis para comprobar mediante pilotos controlados, no como conclusiones portables.

La evidencia independiente de 2023-2026 muestra que IA ayuda en tareas concretas —a menudo mucho— y al mismo tiempo puede causar retrabajo, costos o riesgo en tareas complejas. El paso de productividad individual a margen operativo sigue siendo una dificultad central en las empresas encuestadas. [F02][F04][F05][F07]

**Criterio rector para el siguiente documento:** elegir aplicaciones que mejoren una restricción observable de la empresa, con datos propios, controles, presupuesto de mantenimiento, protección de información y retorno verificable. El Documento 5 evaluará ese principio en los servicios, capacidades y prioridades reales de Listo en Línea, sin asumir que todas las herramientas del libro deban instalarse.

# 19. Registro de fuentes y trazabilidad

Los códigos [Fxx] hacen referencia a recursos consultados. Se han preferido fuentes primarias o institucionales y sus datos se acompañan del contexto necesario para no extrapolar. Las fechas de publicación pertenecen al recurso; la fecha de consulta de este informe es el 8 de noviembre de 2026.

**[F01] Simkin, Benjamin (2026).** The AI First Company (edición digital consultada). *Tipo y alcance:* Fuente primaria / obra evaluada. URL: https://es.scribd.com/document/1077687243/The-AI-First-Company-Digital

**[F02] McKinsey / Tinkoff et al. (2026-08-25).** The state of AI in 2026: On the road to ROI. *Tipo y alcance:* Encuesta global; 1,719 participantes, 97 países, datos autorreportados. URL: https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai

**[F03] Stanford HAI (2026).** 2026 AI Index Report: Economy. *Tipo y alcance:* Síntesis de indicadores empresariales; combina distintas fuentes. URL: https://hai.stanford.edu/ai-index/2026-ai-index-report/economy

**[F04] Noy y Zhang (2023-07).** Experimental evidence on the productivity effects of generative artificial intelligence. *Tipo y alcance:* Experimento preinscrito aleatorizado; 453 profesionales; publicación Science. URL: https://www.science.org/doi/10.1126/science.adh2586

**[F05] Brynjolfsson, Li y Raymond (2025 (edición publicada)).** Generative AI at Work. *Tipo y alcance:* Estudio observacional de despliegue escalonado, 5,179 agentes; QJE / NBER. URL: https://www.nber.org/papers/w31161

**[F06] Harvard / BCG (2023-09).** Navigating the Jagged Technological Frontier. *Tipo y alcance:* Estudio de campo con 758 consultores; resultados específicos de tareas. URL: https://aiinstitute.hbs.edu/navigating-the-jagged-technological-frontier/

**[F07] METR / Becker et al. (2025-07-10).** Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity. *Tipo y alcance:* Ensayo aleatorio de 16 desarrolladores y 246 tareas en repositorios maduros. URL: https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/

**[F08] METR (2026-02-24).** We are Changing our Developer Productivity Experiment Design. *Tipo y alcance:* Actualización que describe sesgo de participación en un estudio posterior. URL: https://metr.org/blog/2026-02-24-uplift-update/

**[F09] OCDE (2025-11-05).** Generative AI and the SME Workforce: New Survey Evidence. *Tipo y alcance:* Encuesta representativa de más de 5,000 pymes en siete países. URL: https://www.oecd.org/en/publications/generative-ai-and-the-sme-workforce_2d08b99d-en.html

**[F10] OCDE (2026-04-13).** Empowering SMEs in the age of AI: The 2026 OECD D4SME Survey. *Tipo y alcance:* Más de 2,000 pymes en 12 países; muestra NO representativa. URL: https://www.oecd.org/en/publications/empowering-smes-in-the-age-of-ai_bf5a9816-en.html

**[F11] NIST (2026 (consulta; RMF 1.0)).** AI Risk Management Framework Playbook. *Tipo y alcance:* Referencia voluntaria de gestión: Govern, Map, Measure, Manage. URL: https://airc.nist.gov/airmf-resources/playbook/

**[F12] NIST (2024-07-26).** AI RMF: Generative Artificial Intelligence Profile (NIST AI 600-1). *Tipo y alcance:* Perfil de riesgos aplicables a IA generativa. URL: https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence

**[F13] OWASP GenAI Security Project (2025).** Top 10 for LLM Applications, versión 2025. *Tipo y alcance:* Catálogo técnico de riesgos, incluido prompt injection y excessive agency. URL: https://genai.owasp.org/llm-top-10/

**[F14] Stanford HAI (2026).** 2026 AI Index Report: Technical Performance. *Tipo y alcance:* Rendimiento de modelos y agentes; límites de los benchmarks. URL: https://hai.stanford.edu/ai-index/2026-ai-index-report/technical-performance

**[F15] Stanford HAI (2026).** 2026 AI Index Report: Responsible AI. *Tipo y alcance:* Incidentes, pruebas de seguridad y límites de evaluación. URL: https://hai.stanford.edu/ai-index/2026-ai-index-report/responsible-ai

**[F16] DOF (2025-03-20).** Decreto que expide la Ley Federal de Protección de Datos Personales en Posesión de los Particulares. *Tipo y alcance:* Fuente jurídica oficial mexicana; comprobar reformas posteriores. URL: https://sidof.segob.gob.mx/notas/5752569

**[F17] Cámara de Diputados (2025-11-14 reforma indicada).** Ley Federal de Protección de Datos Personales en Posesión de los Particulares: texto vigente. *Tipo y alcance:* Texto consolidado vigente según fuente consultada, revisar actualizaciones. URL: https://www.diputados.gob.mx/LeyesBiblio/pdf/LFPDPPP.pdf

**[F18] McKinsey (2025-11-05).** The state of AI in 2025: Agents, innovation, and transformation. *Tipo y alcance:* Encuesta anterior utilizada para comparar tendencias con 2026. URL: https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/the-state-of-ai-2025

## Política de revisión

Este informe debe revisarse antes de cotizar tecnología o tomar decisiones reguladas: actualizar precios, niveles de servicio, condiciones de datos, versiones de modelos, incidentes publicados y reformas legales. Los cálculos ilustrativos no sustituyen una propuesta económica. La validez de cada afirmación queda limitada al contexto de la fuente y al corte temporal señalado.

**Archivo asociado:** Documento 1 — análisis crítico; Documento 2 — resumen ejecutivo; Documento 3 — 30 metodologías; Documento 4 — este contraste de viabilidad; Documento 5 — implementación específica para Listo en Línea.
