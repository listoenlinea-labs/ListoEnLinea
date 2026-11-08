# DOCUMENTO 5 DE 5
# LISTO EN LÍNEA: ESTRATEGIA AI-FIRST 2026–2029
## Plan de transformación empresarial, producto, IA y ejecución
**Edición:** 1.0, 8 de noviembre de 2026  
**Destino editorial:** Serie *The AI First Company*, Listo en Línea  
**Naturaleza:** propuesta de dirección y documento de trabajo; no constituye compromiso comercial, auditoría de producción ni cotización vigente  
**Fuente conceptual:** Benjamin Simkin, *The AI First Company: Engineering a Business That Thrives in the AI Economy* (Documento 1–4 de esta serie).  
**Corte de revisión técnica:** repositorios GitHub consultados el 8 de noviembre de 2026.  
**Visibilidad:** se publica en el repositorio **público** `listoenlinea-labs/ListoEnLinea`. No se exponen credenciales, datos de residentes o pacientes, números de cuenta, IP privadas, detalles personales de prospectos ni tarifas contractuales de clientes concretos. Las cifras de planificación son supuestos ilustrativos, no contratos existentes.

# Resumen de dirección: decisiones propuestas

**Decisión 1 — foco.** Convertir las capacidades de administración de fraccionamientos y de automatización operativa en el principal motor de ingresos recurrentes, en vez de mantener al mismo nivel todos los prototipos y proyectos. El principal producto candidato es la familia **CondoOps + acceso conectado**, derivada de la experiencia de Misión Jardines, siempre que se confirmen en instalaciones reales los flujos de pagos, roles, comunicación y controladores. Las automatizaciones empresariales pequeñas y los sitios web repetibles son un segundo motor para generar caja y contactos. [R2][R3]

**Decisión 2 — dónde sí introducir IA.** Empezar en tareas de bajo riesgo, alto volumen y revisión barata: elaboración de propuestas, clasificación de solicitudes, borradores de respuestas, documentación y extracción de campos de comprobantes **sin acreditar dinero**. Usar reglas deterministas, bases de datos y confirmaciones autorizadas para cuentas, vigencias, accesos, impuestos y estados. La IA sugiere o prepara; el negocio valida y confirma.

**Decisión 3 — evitar dispersión.** Con un equipo pequeño, establecer máximo **dos iniciativas de producto activas** por ciclo, además del soporte crítico. No lanzar simultáneamente un SaaS hospitalario productivo, un agente de control vehicular y un producto generalista de comercio electrónico. HospitalOS conserva prioridad de descubrimiento y validación de procesos, no de despliegue clínico inmediato. [R5]

**Decisión 4 — pasar de desarrollo a empresa de producto.** Crear contratos modulares, implementaciones repetibles, condiciones de servicio, pruebas de aceptación, base de conocimientos, trazabilidad y métricas financieras. La ventaja vendible es integrar operaciones reales con software mantenible; la frase «tenemos IA» no debe sustituir pruebas de reducción de trabajo o errores.

**Decisión 5 — buscar tres validaciones en 90 días.** (A) flujo de Misión Jardines operado y aceptado con evidencia real bajo controles; (B) un proceso interno de Listo en Línea donde la IA genere ahorro neto medido; (C) al menos una oferta comercial de producto repetible validada con compradores. Ninguna de las tres está declarada como lograda al redactar este informe.

**Decisión 6 — gobernanza.** Ninguna salida de un modelo debe actualizar pagos, acreditar SPEI, bloquear o abrir plumas, cambiar vigencias de TAGs, emitir una receta o realizar una decisión clínica. Esas acciones necesitan reglas y sistemas autorizados, con aprobación y trazas según su impacto. El acceso físico y los datos sanitarios merecen el mayor nivel de precaución.

**Horizonte:** primeros 90 días para documentar, medir y consolidar; meses 4–12 para producto, ventas y operación repetible; años 2–3 para ampliar módulos, clientes y autonomía limitada sólo en tareas ya demostradas.

## Cómo leer el plan

Este documento contiene **recomendaciones**, **hechos observados en repositorios** e **hipótesis de negocio**. Se distinguen para impedir que un prototipo se convierta inadvertidamente en una promesa contractual. Los registros de código sirven para comprobar presencia de funciones; no sustituyen pruebas con el banco, Meta, pacientes, controladores o usuarios reales. La dirección debe revisar el documento antes de publicitar cualquier capacidad nueva.

**Documentos anteriores:** (1) análisis de los 35 capítulos; (2) resumen ejecutivo; (3) catálogo de 30 metodologías y ocho plantillas; (4) evaluación con evidencia independiente. Aquí se transforman sus principios en decisiones sobre el portafolio existente de Listo en Línea. [D1]–[D4]

# 1. Punto de partida: qué es realmente Listo en Línea

Listo en Línea se presenta como una empresa de soluciones digitales para negocios, con desarrollo a medida, aplicaciones, automatizaciones y presencia web. El sitio contiene un portafolio, servicios, precios, contacto y una sección que invita a describir un negocio para recibir una demo orientativa. Tener esa sección en HTML no demuestra por sí solo una generación fiable, su conversión en ventas ni la existencia de un backend productivo de IA: debe probarse de extremo a extremo. [R1]

El portafolio visible y las necesidades documentadas muestran cuatro grupos: (a) administración de comunidades y acceso físico; (b) agenda, comunicación y operaciones de clínicas; (c) comercio electrónico y captación digital; (d) software administrativo hospitalario y servicios informáticos. Existe además trabajo en conciliación de pagos SPEI como infraestructura. [R2]–[R7]

**Diferencia competitiva ya perceptible:** la empresa no se limita a producir un sitio informativo. Ha trabajado en reglas de pago, cuotas, vigencias, controladores, agendas, mensajería, correos, catálogos, sistemas administrativos y condiciones de red local. El valor potencial está en resolver procesos que mezclan software, personas y dispositivos, no en vender un chatbot genérico.

**Restricción prioritaria a verificar:** el tamaño del equipo y la amplitud del portafolio pueden generar un cuello de botella de mantenimiento y personalización. La investigación no dispone de un registro de horas, cartera de contratos firmados ni rentabilidad histórica; por ello considera esta restricción una **hipótesis gerencial**, no un diagnóstico confirmado. Se probará con la bitácora de trabajo de las primeras dos semanas.

## 1.1. Evidencia frente a intención de producto

| Línea | Evidencia consultada | Lo que NO está demostrado |
|---|---|---|
| Sitio Listo en Línea | Web estática y portafolio, con demo de IA anunciada | Conversión de prospectos, resultados económicos o prueba productiva de cada promesa |
| Misión Jardines | Amplia lógica de cuotas, acceso y documentación de integración; desarrollos recientes de PWA y recepción WhatsApp | Despliegue completo en ambiente real, recepción WhatsApp real y todas las pruebas con dispositivos físicos |
| Clínica dental | README y guías de agenda, pacientes y recordatorios; se describe un MVP con validación pendiente | Uso productivo con datos clínicos reales autorizado, expediente clínico completo o seguridad clínica certificada |
| Floristería Magno | Páginas públicas de catálogo, compra y elementos SEO | Tasas reales de compra, conciliación de pago y rentabilidad del comercio |
| HospitalOS | Demostración funcional, matriz de requisitos y documentos de fases | Plataforma clínica/fiscal apta para producción y paridad certificada con el sistema previo |
| API-banco | Servicio experimental FastAPI para consultar CEP y estados de verificación | API oficial de Banxico, disponibilidad garantizada o prueba automática de cualquier depósito |

Las conclusiones se basan en documentación del repositorio revisada en la fecha indicada. **Ante discrepancia**, prevalece un ensayo de aceptación actualizado sobre la descripción histórica del README. [R1]–[R7]

## 1.2. Diagnóstico de las siete zonas del libro

**Captación:** existe presencia web y demostraciones; faltan métricas registradas de visitantes, origen, contacto y propuesta aceptada. Recomendación: sistema sencillo de seguimiento con consentimientos y atribución.

**Ventas:** hay trabajo comercial consultivo, en particular para fraccionamientos; falta formalizar guion de diagnóstico, calificación, cotización estándar, seguimiento y decisión de no perseguir prospectos sin presupuesto o autoridad.

**Entrega:** los proyectos muestran capacidad técnica real, pero distintos niveles de madurez. Falta un proceso empresarial uniforme para pasar de requisito a prueba, aceptación, despliegue, soporte y versión reutilizable.

**Operaciones:** existe conocimiento documentado por repositorio; el riesgo es fragmentación entre proyectos. Debe crearse una biblioteca empresarial con fuentes por producto y procedimientos transversales.

**Finanzas:** hay ofertas SaaS posibles, pero no consta un sistema completo de margen por cliente, costos de soporte, implementación y flujo recurrente. Esta ausencia debe corregirse antes de decidir precios.

**Equipo:** dos personas pueden construir prototipos rápidamente, pero no tienen capacidad ilimitada de guardias, integraciones y servicio presencial. Se necesita límite de trabajo simultáneo y procedimientos de escalación.

**Dirección:** captación, arquitectura y validación pueden quedar demasiado concentradas. El paso de operador a arquitecto requiere roles claros, sistemas de aprobación y reportes semanales.

# 2. Tesis estratégica y posicionamiento

**Propuesta recomendada:** «Listo en Línea diseña y opera software a la medida que automatiza procesos reales de empresas y comunidades, integrando pagos, comunicación y dispositivos cuando existe una necesidad verificable. Incorpora IA donde mejora tiempos o calidad, con controles y supervisión».

Esta formulación evita prometer magia y protege la diferenciación más difícil de copiar: integración con operaciones y reglas reales. La IA no es producto universal; es una **capacidad opcional** integrada al producto cuando mejora un resultado.

## 2.1. Elegir dos motores comerciales

**Motor A — SaaS vertical recurrente.** Concentrarse inicialmente en administración de fraccionamientos: cuota, pagos, reportes, comunicación, autorizaciones y acceso físico. Es una combinación de funciones administrativas y sistemas existentes que puede generar barreras de sustitución por integración y soporte, aunque introduce riesgos de operación y necesidad de presencia local.

**Motor B — automatizaciones empresariales configurables.** Vender diagnósticos de flujo, recordatorios, reportes, integraciones y pequeñas soluciones con instalación y mantenimiento. Estas ventas generan aprendizaje sobre procesos comunes y pueden alimentar módulos reusables sin comprometer la caja en un producto demasiado grande.

**Líneas selectivas:** mantener e-commerce como portafolio y ofertas paquetizadas, no como tercer gran SaaS por defecto; desarrollar herramientas de agenda dental sólo después de completar validaciones de seguridad y uso; realizar descubrimiento hospitalario con entregables pagados y sin trasladar el prototipo a producción clínica prematuramente.

## 2.2. Qué NO debe venderse como diferencial principal

No vender «robots que sustituyen al guardia» como si el software garantizara seguridad. No vender «pago verificado» a partir de la imagen del comprobante. No prometer «software hospitalario terminado» por tener pantallas, tablas y datos de prueba. No afirmar que cualquier demo de IA equivale a una aplicación a medida lista para usarse. No prometer SLA 24/7 sin personal, telemetría y contrato que lo financie.

## 2.3. Posicionamiento frente a herramientas genéricas

La empresa debe competir por **personalización controlada**, integración local, migración, reglas verificables, respuesta directa y soporte en español. La habilidad distintiva no debería ser una cantidad de tecnologías, sino un procedimiento de entrega: diagnóstico → especificación → demostración con datos ficticios → aceptación → puesta en marcha → monitoreo → mejora.

**Prueba de la propuesta:** cada caso publicado debe incluir problema, alcance, cambios observados, límites y aprobación de divulgación del cliente. No utilizar fotografías, montos o datos reales sin autorización.

# 3. Cartera priorizada: qué construir y qué posponer

Se utiliza una matriz **propuesta por este informe** de seis criterios ponderados: dolor del comprador (25 puntos), ingresos recurrentes potenciales (20), reutilización de código/conocimiento (20), tiempo hasta prueba de valor (15), riesgo operativo bajo (10) y preparación de datos/requisitos (10). Cada criterio se valora subjetivamente de 1 a 5 a partir de los repositorios y experiencia declarada; la puntuación NO resulta de entrevistas de mercado ni de validación financiera.

| Candidato | Puntos / 100 | Recomendación |
|---|---:|---|
| Administración de fraccionamientos y acceso conectado | 86 | Producto principal, sujeto a validación real de operación crítica |
| Fábrica de automatizaciones repetibles para pymes | 84 | Segundo motor comercial, ciclos cortos |
| Agenda y gestión administrativa dental | 65 | Piloto regulado y controlado; no expansión clínica aún |
| Sitios/e-commerce repetibles | 63 | Oferta paquetizada y portafolio; no tercer producto principal |
| Verificación SPEI propia sin contrato oficial | 59 | Infraestructura experimental con aprobación manual |
| HospitalOS productivo | 51 | Descubrimiento y validación pagados; posponer explotación clínica |

**Interpretación:** las diferencias pequeñas entre puntuaciones son orientativas. Los criterios de riesgo son independientes de la puntuación: una oportunidad con gran mercado no autoriza saltarse controles de pagos, personas o acceso físico.

## 3.1. Selección de las dos restricciones iniciales

**R1: calidad operativa y soporte de Misión Jardines.** Hipótesis: la funcionalidad ya creada necesita integración, despliegue y pruebas de extremo a extremo antes de convertirse en una plataforma repetible. El README de estado distingue código fusionado de validación productiva y señala específicamente tareas pendientes del piloto de WhatsApp, PWA y operación del C3. [R2][R3]

**R2: comercialización repetible.** Hipótesis: Listo en Línea necesita convertir visitas, reuniones y demos en propuestas de valor y contratos de una manera uniforme. La web existente es punto de entrada, no evidencia de un embudo que convierta. [R1]

**Regla de foco:** hasta validar ambas, nuevas ideas de IA sólo entrarán al backlog si reducen el esfuerzo de R1 o R2, son reversibles y pueden probarse en un ciclo breve. El equipo no debe responder a cada solicitud de «poner IA» desarrollando un sistema separado.

# 4. Diseño del producto principal: CondoOps

## 4.1. Oferta de valor por tipo de usuario

**Administración:** visualización de adeudos y aportaciones, registro y conciliación, reportes, comunicaciones, incidencias, autorizaciones y controles de dispositivos.

**Condóminos:** claridad de cuentas, comprobantes, documentos y solicitudes, con un mecanismo comprensible de aclaración.

**Seguridad:** panel simple con funciones autorizadas y trazabilidad; no exponer cálculos de deudas ni datos privados innecesarios.

**Comité o mesa directiva:** tablero de ingresos y cumplimiento agregado, incidencias y auditoría, con permisos de consulta y reportes; no requerir que tres directivos ejecuten tareas repetitivas manuales.

## 4.2. Tres capas vendibles

**Capa estándar:** padrón, roles, cuotas, pagos reportados, conciliación administrativa, reportes y comunicaciones. Debe poder ponerse en marcha sin hardware particular.

**Capa de automatización:** mensajes de utilidad, recepción asistida de comprobantes, recordatorios con consentimiento, reportes programados y manejo de incidencias.

**Capa de acceso:** integración específica con controladores compatibles, reglas deterministas, bitácora física, reconciliación y procedimiento de operación degradada. Cada instalación requiere diagnóstico físico de red, dispositivos y riesgos antes de contratarla.

La modularidad permite vender base + complementos y evita que una comunidad con infraestructura distinta obligue a modificar el núcleo de todos los clientes.

## 4.3. Pagos y reglas: la IA sólo ayuda

Un comprobante enviado por WhatsApp o portal se recibe, almacena y clasifica. Un extractor puede sugerir monto, fecha, referencia y vivienda, pero mantiene siempre estado **NO VERIFICADO**. La conciliación contra evidencia bancaria autorizada, identificadores únicos, movimientos anteriores, reglas de cuota y cargos exige controles deterministas y autorización definida. Una transferencia SPEI con CEP coincidente puede ayudar; un depósito en efectivo o un folio sin CEP no debe transformarse en «pagado» por inferencia. [R2][R6]

**Cadena propuesta de estados:** RECIBIDO → EXTRAÍDO_NO_VERIFICADO → EN_REVISIÓN → VALIDADO_CON_EVIDENCIA → APLICADO_A_CUENTAS → EVALUAR_ACCESO → REGISTRADO_EN_DISPOSITIVO / PENDIENTE_REINTENTO. Una excepción detiene el avance y deja huella. El componente de IA nunca altera por sí mismo la deuda ni la vigencia del TAG.

## 4.4. Red local, cámaras, plumas y disponibilidad

El portal alojado en la nube no tiene acceso automático a dispositivos privados de una caseta. La integración con un C3, grabador o cámara exige un puente local, permisos, conectividad confiable y protección de credenciales. Para instalaciones con IP dinámica, es preferible un **agente saliente administrado o un mecanismo de conexión segura** que notifique/establezca canal autenticado, antes que inferir la dirección del controlador a partir de la IP de cualquier navegador de administrador. La IP del cliente que inicia sesión no es garantía de que comparta la red del dispositivo. [R3]

Evitar exposición pública de puertos de control, contraseñas en front-end y apertura dependiente de decisiones generativas. Mantener una vía manual segura y contratada si se cae internet, y distinguir visualización remota de posibilidad real de operar un actuador.

## 4.5. IA adecuada para fraccionamientos: orden sugerido

1. **Asistente de documentación** para que administradores encuentren políticas, reportes e instrucciones con fuentes.
2. **Clasificación de incidencias** por tema, urgencia sugerida y responsable; toda decisión de emergencia sigue protocolo humano.
3. **Recepción de comprobantes** y extracción asistida con estado no verificado, sin acreditación ni acceso automático.
4. **Borradores de comunicaciones** mensuales o personalizados sujetos a aprobación administrativa.
5. **Alertas explicativas** sobre anomalías de patrones agregados, verificadas por administración.
6. **Pronósticos agregados** cuando existan series suficientes y se haya evaluado su utilidad; no prometer precisión por defecto.

**Excluir por ahora:** apertura de plumas por reconocimiento visual de una conversación, sustitución integral del guardia por visión artificial, denegación automática de acceso basada en un resumen de IA y reconocimiento de identidad biométrica sin evaluación jurídica y técnica específica.

# 5. Línea clínica: separar agenda administrativa de expediente clínico

La app de consultorio dental se orienta a agenda, pacientes, recordatorios e integraciones. El README consultado se autodefine como **MVP en desarrollo** y advierte expresamente que no está listo para operar expedientes clínicos reales, aunque hay guías y cambios posteriores que podrían ampliar funciones. Por ello, antes de publicitar un sistema «clínico completo», hay que comprobar código, permisos, respaldos, auditoría y pruebas con el consultorio. [R4]

**Producto inicial defendible:** agendas y comunicación consentida, con datos mínimos, recordatorios, cancelaciones y confirmación de citas. Separar un módulo futuro de expediente, odontograma, tratamientos, cobros y documentos sensibles que demande validaciones adicionales.

**IA de bajo riesgo:** preparar recordatorios administrativos a partir de plantillas aprobadas, ordenar solicitudes de cita, resumir preguntas logísticas sin diagnosticar ni prescribir. Incluso una respuesta logística debe evitar revelar datos personales a destinatarios incorrectos.

**No hacer con IA generalista:** diagnósticos odontológicos, indicaciones de tratamiento, cálculo clínico automático no validado o decisiones sobre menores de edad a partir de texto. La información sobre salud exige una revisión específica de privacidad, consentimientos, proveedores y permisos conforme a la legislación aplicable. [E4][E5]

**Puerta antes de ofrecer más clínicas:** audit de roles/permisos y sesiones, respaldos restaurables, políticas de retención y consentimiento, flujo de alta y baja de usuarios, pruebas de recordatorios y eliminación de datos, revisión legal de aviso de privacidad y aceptación documentada de un piloto con datos autorizados.

# 6. E-commerce: servicio empaquetado, no nueva plataforma general

Floristería Magno evidencia trabajo en páginas de catálogo, carrito, pago, rastreo y posicionamiento SEO. Eso es útil para mostrar capacidad de integrar una experiencia comercial; no demuestra por sí mismo ventas, aprobación del procesador o margen. [R5]

**Oferta comercial propuesta:** tres variantes de tienda (catálogo con solicitud, e-commerce con pago e integración, e-commerce con inventario/entrega avanzada), con base reutilizable, temas configurables, región de entrega, avisos, analítica y soporte opcional. Cotizar explícitamente integraciones y pruebas, sin asumir que una pasarela funciona en producción por tener la interfaz.

**IA útil:** clasificación de catálogo, borradores de fichas con supervisión, respuestas frecuentes basadas en políticas reales, análisis de patrones de consultas y ayuda interna para crear contenido. **No útil por defecto:** agente que garantiza existencias, fecha de entrega o reembolso sin consultar inventario y reglas vigentes.

**Decisión de inversión:** continuar como servicio repetible siempre que la demanda pague personalización y soporte; no comenzar un SaaS de comercio horizontal si no hay ventaja distintiva probada frente a plataformas establecidas.


# 7. HospitalOS y sistemas médicos: descubrimiento antes que producción

HospitalOS muestra una propuesta de modernización con veinte pantallas y documentación de requisitos; el README la denomina **demo funcional con datos ficticios** y señala explícitamente que no está lista para un despliegue clínico o fiscal. La matriz de requisitos documenta funciones existentes, parciales y ausentes, y varias son aproximaciones de demostración. [R7]

**Recomendación comercial:** ofrecer primero diagnóstico funcional y plan de migración, con sesiones de observación de recepción, caja, farmacia, inventario y facturación. Entregar matriz de procesos, brechas, costos estimados, plan de datos y riesgos, con precio de consultoría por etapa. No vender una licencia SaaS hospitalaria completa antes de contar con flujos de punta a punta aprobados, controles y presupuesto de implementación sostenido.

**Uso razonable de IA durante descubrimiento:** indexar manuales autorizados, cruzar pantallas con requisitos, proponer pruebas, detectar contradicciones de especificación y redactar minutas para aprobación. Usar datos ficticios o anonimizados de forma robusta. Nunca ingresar expedientes reales en herramientas no autorizadas ni permitir un agente que genere decisiones clínicas.

**Separar servicios distintos:** la instalación de red o software de monitorización de pacientes (CMS) es una responsabilidad de infraestructura y continuidad que no debe confundirse con el roadmap de IA ni con HospitalOS. Se necesitan alcances, contrato y procedimientos independientes para cada servicio, incluso cuando comparten cliente.

**Condiciones para convertirlo en producto estratégico:** validación de demanda en varios hospitales similares, patrocinio económico, estándares clínico/administrativos aprobados, arquitectura local y offline claramente especificada, seguridad, soporte formal y estimación de costo total que justifique alejar capacidad del producto principal. Si faltan esos requisitos, mantener un laboratorio demostrativo sin prometer operación real.

# 8. API de pagos: infraestructura crítica, no producto de IA

El repositorio API-banco contiene un servicio experimental en Python/FastAPI que consulta el portal público de CEP de Banxico. Su documentación aclara: **no es API oficial, no mueve dinero, no cubre depósitos en efectivo y no confirma pagos sin CEP XML coincidente**. Puede detenerse ante CAPTCHA u otros cambios del portal y su disponibilidad no tiene SLA contractual. [R8]

**Política corporativa recomendada:** la verificación financiera sólo puede quedar confirmada mediante evidencia bancaria suficiente y conciliación de reglas, nunca mediante OCR o la apariencia de un comprobante. El servicio experimental puede enriquecer un flujo de revisión, pero **no sustituye un proveedor bancario contratado** si se necesita disponibilidad garantizada.

**Opciones de evolución:** mantener como auxiliar con límites y fallbacks; negociar acceso a mecanismos autorizados de conciliación bancaria; evaluar enlaces SPEI, CoDi o pasarelas según comisión, confirmación, reversos, cumplimiento y cobertura real; no decidir únicamente por evitar una comisión. Las alternativas requieren investigación comercial y contractual específica antes de cotizar.

**Arquitectura de contingencia:** PENDIENTE → REINTENTAR_CON_LÍMITE → VERIFICADO_CON_EVIDENCIA / REQUIERE_REVISIÓN. No pasar de PENDIENTE a PAGADO por agotar reintentos ni por inferencia del modelo. Identificar duplicados por movimiento y beneficiario, conservar trazabilidad y separar el comprobante visual de la transacción comprobada.

# 9. Arquitectura objetivo: plataforma modular con límites claros

## 9.1. Principios de arquitectura

1. **Dominio antes que proveedor de IA.** Las reglas de negocio viven en aplicaciones y bases de datos; el modelo sólo trabaja en tareas semánticas autorizadas.
2. **Portabilidad por diseño.** Datos y procedimientos en formatos estándar, registros versionados y adaptadores para proveedores externos.
3. **Aislamiento por cliente.** Cada comunidad, clínica o comercio tiene permisos, datos y claves independientes o particiones estrictamente controladas. No migrar a multitenencia sin pruebas de aislamiento.
4. **Fuente de verdad explícita.** La base transaccional mantiene el estado de pagos, agenda o acceso; la IA no inventa estados.
5. **Eventos idempotentes.** Webhooks y reintentos no deben duplicar pagos, mensajes, altas o efectos físicos.
6. **Aprobación humana por riesgo.** El sistema puede preparar, pero los actos económicos y sensibles necesitan validación autorizada.
7. **Observabilidad mínima real.** Registros de cambios, correlación de eventos, alertas, métricas y una guía de recuperación.
8. **Evolución incremental.** No iniciar una costosa reescritura multi-tenant antes de tener múltiples clientes y requerimientos repetidos.

## 9.2. Diagrama lógico por capas

**Capa de experiencia:** portales para administración, usuarios, clientes comerciales y personal autorizado; componentes reutilizables y accesibilidad.

**Capa de negocio determinista:** módulos de cuentas, estado de pago, roles, reglas, agenda, pedidos, reportes y autorizaciones. Cada operación expone validaciones y transacciones comprobables.

**Capa de integración:** adaptadores para correo, WhatsApp Business Platform, calendarios, pasarelas, CEP/banca según alcance, ZKTeco y sistemas físicos mediante puente seguro. Cada adaptador controla permisos, reintentos y cuotas de API.

**Capa de eventos y tareas:** un registro durable de eventos, un patrón outbox o cola donde haga falta, identificadores idempotentes, tareas pendientes y estado de conciliación. La interfaz no presupone que un envío o cambio remoto fue exitoso por haber iniciado el comando.

**Capa opcional de IA:** gateway de modelos con proveedores intercambiables; clasificadores, extracción documental y asistentes con contexto. Su salida queda marcada como propuesta, con calidad estimada por pruebas y referencias rastreables.

**Capa de seguridad y auditoría:** autenticación robusta, autorización por rol y contexto, cifrado, control de secretos, bitácoras, respaldos y procedimientos de incidentes.

**Capa de observabilidad y finanzas:** logs con datos mínimos, métricas de tiempo y error, costo por solicitud, costo por cliente y panel de salud de integraciones.

## 9.3. Tres decisiones sobre reutilización

**Primera — catálogo común de módulos:** aprovechar autenticación, permisos, registros de auditoría, envío de mensajes, plantillas de correo y reportes, pero sin extraerlos a microservicios independientes antes de tener necesidad probada.

**Segunda — despliegue gradual:** una arquitectura modular monolítica por producto con adaptadores bien separados puede resultar más barata de operar que muchos microservicios; la frontera del módulo importa más que la cantidad de servidores.

**Tercera — multitenencia cuando se justifique:** iniciar nuevas cuentas con aislamiento verificable y un esquema de datos compatible con expansión. Migrar sólo después de planificar exportación, permisos, reconciliación y protección de datos.

## 9.4. Ejemplo técnico: comprobante por WhatsApp

A. Meta recibe un mensaje; se valida la autenticidad del webhook y se registra identificador único.  
B. Se verifica tipo, tamaño y política de retención del archivo.  
C. El sistema crea un registro NO_VERIFICADO; si es duplicado, no repite el evento.  
D. Un extractor opcional sugiere campos; guarda valor, origen, confianza observada y evidencia.  
E. Administración y/o un servicio autorizado verifican movimiento, identidad, monto, cuenta y duplicados.  
F. El backend aplica reglas de cuota sin alterar fechas ni montos por aproximación.  
G. La capa de integración calcula consecuencias del pago con reglas aprobadas; cualquier orden física requiere bitácora, reintentos y verificación del resultado.  
H. Se envía confirmación únicamente cuando el estado transaccional autorizado lo justifica.

La bitácora de Misión Jardines indica que el piloto de recepción de comprobantes por WhatsApp ya se incorporó en código **desactivado por defecto**, sin acreditación automática; faltan pruebas, configuración real y despliegue. Por tanto, el ejemplo representa un **diseño objetivo**, no un flujo totalmente operativo ya acreditado. [R2]

## 9.5. Reglas de seguridad para integración con hardware

- No publicar IP, contraseñas, tokens, puertos administrativos o credenciales de dispositivos en GitHub.
- No inferir que una IP pública observada de un usuario pertenece a la caseta; validar identidad del sitio y del puente.
- Preferir conexión saliente cifrada, autenticación mutua si es viable, permisos estrictos y monitoreo; evaluar VPN empresarial donde corresponda.
- Diferenciar solicitud de acción, comando enviado, respuesta del controlador y resultado físico observado; no equipararlos.
- Mantener operador humano y procedimiento local cuando se pierde nube, red o energía.
- No usar visión o texto generado para decidir unilateralmente admisión de personas.
- En pruebas, usar TAGs y escenarios autorizados; no bloquear residencias reales sin coordinación y plan de reversión.

## 9.6. Paquetes de contexto y habilidades internas

No es necesario crear una gran base vectorial desde el primer día. Iniciar con documentos cortos, versionados, auditables y recuperables por repositorio; sólo añadir RAG cuando exista volumen y preguntas que justifiquen búsqueda avanzada.

**Conocimiento empresarial compartido:** propuesta de valor, productos, política de cotización, guía de servicio, procedimientos de soporte, criterios de QA, protección de datos, preguntas frecuentes y ejemplos aprobados.

**Conocimiento por producto:** reglas, estados, permisos, diagramas, errores conocidos, aceptación y restricciones específicas. Separar un manual público de una configuración privada.

**Habilidades de IA candidatas:** preparar propuesta comercial; elaborar matriz de requerimientos; transformar incidencias en tickets; redactar respuestas de soporte; resumir cambios de GitHub contra requisitos; auditar contenido SEO; proponer casos de prueba. Ninguna habilidad debe hacer commits automáticos a producción o escribir en sistemas de clientes sin autorización y pruebas.

**Reglas de adopción:** cada habilidad debe tener dueño, versiones, casos de éxito y rechazo, tiempo de revisión, posibilidad de regresión y documentación de uso permitido.

# 10. Plan de 90 días: entregables, fechas y puertas de decisión

**Calendario de referencia:** 9 de noviembre de 2026 al 6 de febrero de 2027. Las fechas son una propuesta de planeación, no entregas ya comprometidas. La implantación debe cerrarse por evidencias, no por calendario.

## Semanas 1–2 — línea base, inventario y protección

**Objetivo:** construir la fotografía operativa real antes de adoptar nuevas herramientas.

**Tareas:** registrar horas de desarrollo, soporte, ventas y administración por producto; inventariar clientes activos y obligaciones sin exponer datos personales en el repositorio público; confirmar costos actuales de nube, dominio, mensajería y viajes; realizar un mapa de procesos de cada servicio; seleccionar fuentes de verdad y dueños de los procedimientos.

**Entregables:** tablero de seis KPIs, registro de riesgos y backlog con máximo dos iniciativas productivas. **Puerta:** existe un proceso con línea base, responsable y criterio cuantificable de éxito.

## Semanas 3–4 — producto CondoOps y oferta comercial

**Objetivo:** establecer límites entre plataforma reutilizable, personalización y hardware por sitio.

**Tareas:** inventariar módulos del repositorio, identificar componentes comunes, documentar requisitos de instalación, construir checklist de migración y devolución de datos, preparar propuesta con tres capas y responsabilidades de soporte, redactar un caso de estudio publicable sólo con aprobación.

**Entregables:** ficha de producto 1.0, catálogo de módulos, proceso de alta y propuesta comercial estándar. **Puerta:** una demostración reproduce un proceso normal y uno excepcional usando datos ficticios representativos.

## Semanas 5–6 — pruebas de extremo a extremo y continuidad

**Objetivo:** reducir incertidumbre del código ya desarrollado antes de agregar funciones.

**Tareas:** diseñar y ejecutar pruebas de pago y morosidad en entorno controlado; verificar fallas de red, reintentos y bitácora C3 sin comprometer accesos reales; probar que un webhook repetido no duplica acciones; probar respaldos restaurables, permisos, login por rol y recuperación de servicio; documentar lo que sólo se pudo simular.

**Entregables:** informe de aceptación, matriz de fallas, registro de pruebas y lista de bloqueos de producción. **Puerta:** cero defectos críticos abiertos antes de cualquier nueva exposición al cliente.

## Semanas 7–8 — primer piloto de IA de bajo riesgo

**Objetivo:** demostrar un beneficio real sin tocar dinero ni control físico.

**Piloto preferente:** asistente interno de preparación de propuestas comerciales y respuestas de soporte con biblioteca de contexto. Entradas: requerimiento redactado y documentación oficial. Salidas: borrador con citas y banderas de información faltante. Un humano verifica y envía.

**Medición:** comparar 30–50 tareas con línea base y revisar calidad, correcciones, tiempo hasta aprobación y costo por tarea; la cantidad de casos se ajusta a la variabilidad real. **Puerta:** ahorro neto positivo y ninguna divulgación o compromiso no autorizado.

**Piloto opcional paralelo si hay tiempo:** recepción y extracción de comprobantes de prueba en WhatsApp, en un buzón **sin acreditación ni actualización de TAGs**. Su éxito se mide por integridad del registro, consentimiento, deduplicación, exactitud de campos y tiempo de revisión. [R2]

## Semanas 9–10 — validación comercial del paquete recurrente

**Objetivo:** confirmar que existe una oferta por la que un comprador pagaría.

**Tareas:** contactar prospectos con perfil definido, realizar entrevistas de problema, demostrar caso con datos falsos, probar precio y alcances, documentar objeciones, proponer piloto pagado con fecha de aceptación y costos de hardware separados.

**Indicadores de planificación — no pronósticos:** 40–60 contactos cualificados, 10–15 conversaciones de descubrimiento, 3–5 propuestas y 1–2 pilotos propuestos. Si los números reales son menores, estudiar segmento/oferta antes de aumentar gasto publicitario.

**Entregable:** pipeline reproducible y al menos una decisión de compra/rechazo razonada por un prospecto. **Puerta:** evidencia de demanda, presupuesto y patrocinador; no basta con entusiasmo por IA.

## Semanas 11–12 — corregir y estandarizar

**Objetivo:** resolver los fallos de pilotos, reducir mantenimiento y dejar el proceso repetible.

**Tareas:** optimizar el piloto de IA sólo si generó ahorro, estabilizar los flujos de CondoOps que todavía tengan fallas, auditar costos por cliente, revisar seguridad y procedimientos de respuesta, definir condiciones de contratación e instalación.

**Entregables:** operación estándar, versión de producto candidata, tabla de costos y caso de estudio con datos autorizados. **Puerta:** pruebas completas y costo de atención compatible con precio.

## Semana 13 — comité de inversión y siguiente trimestre

**Objetivo:** decidir, no seguir construyendo por inercia.

**Decisiones obligatorias:** mantener o cancelar piloto de IA, continuar o modificar oferta CondoOps, contratar soporte externo si la carga lo justifica, fijar capacidad para nuevas clínicas, definir presupuesto del siguiente trimestre y depurar backlog.

**Salida:** acta ejecutiva con responsable, presupuesto, fecha, métricas, criterios de suspensión y próximos dos proyectos. Si falta evidencia de uso real, la respuesta correcta puede ser continuar validando y posponer expansión.

# 11. Hoja de ruta de 12 meses con decisiones de inversión

## Trimestre 1 — noviembre 2026 a enero/febrero 2027

Estabilizar Misión Jardines, probar integraciones, documentar CondoOps, medir primer asistente interno, preparar paquetes y pipeline. No iniciar una reescritura completa ni una plataforma horizontal de IA. El éxito es demostrar reproducibilidad y reducción de riesgo, no añadir decenas de funciones.

## Trimestre 2 — febrero a abril 2027

Con los pilotos y controles validados: cerrar uno o más contratos recurrentes adicionales, diseñar una migración de datos semiautomatizada, formalizar monitoreo y soporte, separar entornos de pruebas y producción, usar una biblioteca común de ofertas y SOP. Definir un representante funcional por cliente para aprobaciones.

La agenda dental puede entrar como segunda línea de producto si existe demanda y el paquete administrativo cumple seguridad y privacidad. Si no, mantenerla como proyecto de cliente con calendario acotado.

## Trimestre 3 — mayo a julio 2027

Evaluar patrones de personalización: qué módulos se repiten y cuáles deben configurarse por contrato. Sólo entonces decidir inversiones en multitenencia, catálogo de integraciones, panel de soporte y analítica transversal. Crear pruebas de regresión que reproduzcan escenarios financieros y de acceso. Evaluar un convenio de soporte de dispositivos y redes con un tercero.

Ampliar IA hacia investigación documental de operaciones o borradores de comunicaciones, siempre que los primeros pilotos mantengan beneficio neto y no eleven incidentes.

## Trimestre 4 — agosto a octubre/noviembre 2027

Medir rentabilidad por producto y segmento. Tomar tres decisiones: (1) escalar CondoOps a más comunidades, (2) consolidar la oferta de automatización empresarial, y (3) promover la línea dental o continuarla de forma selectiva. El hospital queda condicionado a contrato de descubrimiento y evidencia de implantación realista.

Definir presupuesto de 2028, objetivos de retención, crecimiento de ingresos recurrentes y cargas máximas de soporte. La expansión debe justificarse por margen y fiabilidad, no por visitas a demos.

# 12. Horizonte 2028–2029: plataforma sin caer en el mito del ERP universal

**2028 — consolidar activos propios.** Si existen varios clientes en el mismo segmento, invertir en módulos probados, herramientas de despliegue, monitoreo, reportes, exportación de datos, onboarding y formación. Fortalecer biblioteca de conocimiento sectorial y acuerdos con instaladores, proveedores de mensajería o integradores.

**2029 — ampliar bajo evidencia.** Integrar más sectores sólo cuando puedan compartir auténticos módulos y procesos, no sólo porque ambos usen usuarios, botones y una tabla. Un ERP/CRM/e-commerce universal exige diversidad de requisitos, costo comercial y soporte superiores al de un SaaS vertical; no debe ser la meta automática del tercer año.

**IA madura en 2029, si las pruebas lo autorizan:** clasificación automática de casos sencillos, extracción con controles, preparación de respuestas y planes de acción, búsqueda con trazabilidad y mejora experimental de procesos internos. La autonomía sobre pagos, salud o acceso continuará limitada por riesgos y legislación independientemente de avances de modelos.

**Punto de revisión anual:** evaluar retención, margen de contribución, tiempo de soporte por cliente, tasa de incidentes, dependencia del fundador, capacidad real y demanda por cada módulo antes de abrir un nuevo frente.
