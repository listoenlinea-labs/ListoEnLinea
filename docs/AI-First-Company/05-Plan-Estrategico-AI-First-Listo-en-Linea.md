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


# 13. Modelo de negocio, paquetes y política de precios

Una compañía AI-first puede tener mejor productividad sin generar caja. Por eso cada oferta debe definir precio de implementación, ingreso recurrente, responsabilidad de soporte, garantías, exclusiones y costo de operar el servicio. Se propone un menú sencillo, con personalización tarifada por separado.

## 13.1. Paquete 1 — diagnóstico digital y de procesos

**Comprador:** administración de comunidad, clínica, comercio o pyme que no conoce bien su necesidad.

**Entrega estándar:** sesión de descubrimiento, mapa de procesos, problemas priorizados, arquitectura preliminar, prototipo de flujo y presupuesto de implementación. No incluye desarrollar una aplicación terminada ni desplegar dispositivos.

**Duración orientativa:** una a dos semanas según complejidad y acceso a información. **Cobro recomendado:** precio fijo conforme a horas y alcance, acreditable parcialmente a implementación si el negocio lo decide. Como ejercicio de planeación, no como tarifa de mercado, considerar un ticket ilustrativo de 3,000 a 12,000 MXN para diagnósticos básicos y recalcular para trabajos complejos.

**Ventaja económica:** filtra prospectos, obliga a obtener datos reales y protege horas de consultoría que de otro modo quedarían sin facturar.

## 13.2. Paquete 2 — implementación productiva

**Entrega:** configuración, migración autorizada, personalización acotada, pruebas, capacitación, despliegue, plan de recuperación y acta de aceptación. Los integradores de hardware pueden presupuestarse por separado.

**Cobro:** instalación inicial basada en trabajo real más un margen de riesgo y garantía. No esconder meses de desarrollo a medida dentro de una mensualidad baja. Declarar qué integración y cuántos usuarios o viviendas incluye el alcance.

**Criterio de éxito:** un nuevo cliente se pone en marcha por un procedimiento reproducible que no requiere modificar el núcleo del software.

## 13.3. Paquete 3 — suscripción y mantenimiento

**Entrega:** uso de módulos contratados, actualizaciones programadas, respaldo y recuperación según SLA, soporte definido, monitoreo proporcional y cambios correctivos cubiertos. Las nuevas funcionalidades, migraciones extraordinarias, dispositivos ajenos y visitas fuera de alcance deben presupuestarse aparte.

**Unidades de precio útiles:** mínimo mensual por organización más cargo escalonado por viviendas/usuarios o módulos, según la estructura real de costos. Evaluar con cuidado precios por vivienda que no cubran el costo fijo de atender a una comunidad pequeña.

**Objetivo:** que el ingreso recurrente pague consumo de servicios, atención, mantenimiento, incidentes esperados y una contribución a los gastos generales, sin depender de cobros únicos para mantener la plataforma activa.

## 13.4. Paquete 4 — automatización con IA bajo suscripción

**Cobro:** implementación de flujo y suscripción por volumen/uso, con límite de tareas incluido y costo de excedentes comunicado. Separar procesamiento de IA de las tarifas del canal (por ejemplo WhatsApp) y del tiempo de validación humana.

**Límite:** un bot de recepción o soporte puede operar en modo asistido. No cobrar como «conciliación automática» una función que sólo extrae campos de archivos.

**Recomendación comercial:** vender resultado verificable ("preparar reportes en menos tiempo", "ordenar solicitudes"), no un número de tokens, prompts o agentes.

# 14. Economía unitaria: cuánto debe aportar cada cuenta

## 14.1. Modelo general

**MRR (ingreso recurrente mensual):** cuotas de suscripción cobrables y no ingresos de instalaciones únicas.  
**Costos variables de caja:** nube, almacenamiento, mensajes, API, licencias, proveedores externos y comisiones no repercutidas.  
**Horas directas:** soporte, conciliación excepcional, pruebas y mantenimiento específicas del cliente.  
**Contribución por cuenta:** MRR - costos variables de caja - valor económico de horas directas.  
**Margen de contribución:** contribución / MRR, antes de gastos generales, impuestos, marketing, desarrollo de nuevos productos y remuneración directiva no imputada.

**Costo total de cliente:** incluir instalación, migración, ventas, soporte, renovación, incidentes y baja, especialmente cuando existe hardware físico.

El costo/hora de referencia empleado en los escenarios siguientes es **350 MXN como supuesto interno ilustrativo**, no nómina real, sueldo de empleados, precio de venta ni dato contable verificado. Reemplazarlo por el costo real completo de cada perfil antes de decidir.

## 14.2. Ejemplo de unidad: comunidad con 300 viviendas

Supuestos totalmente hipotéticos: 300 viviendas, tarifa equivalente a 45 MXN por vivienda/mes, ingreso 13,500 MXN/mes. Infraestructura y mensajería 1,500 MXN/mes; soporte 10 horas a 350 MXN = 3,500 MXN; reserva operativa 500 MXN. **Contribución antes de gastos generales: 8,000 MXN/mes (59.3% del MRR)**.

**Sensibilidad:** si la atención crece de 10 a 22 horas mensuales, la contribución cae de 8,000 a **3,800 MXN**. Si el hardware requiere visitas, combustible o soporte 24/7, deben presupuestarse además. Este escenario no representa un contrato real ni una recomendación de precio fijo a cualquier comunidad.

## 14.3. Ejemplo de unidad: consultorio administrativo

Supuestos hipotéticos: suscripción de 1,800 MXN/mes; infraestructura y comunicaciones 350 MXN; soporte 3 horas a 350 MXN = 1,050 MXN; provisión de incidentes 200 MXN. **Contribución: 200 MXN/mes (11.1%)**, antes de ventas, desarrollo y obligaciones clínicas adicionales.

**Conclusión:** la suscripción de un consultorio puede ser insuficiente si demanda soporte y cambios frecuentes. Antes de comercializar masivamente, el servicio debe automatizar soporte, limitar alcance o cambiar su precio. Un ticket bajo sólo funciona con muchas cuentas estandarizadas, soporte muy reducido o ingreso adicional legítimo.

## 14.4. Ejemplo de unidad: retainer de automatización

Supuestos hipotéticos: servicio de automatización a 2,500 MXN/mes; consumo tecnológico 300 MXN, soporte/seguimiento 2 horas a 350 MXN = 700 MXN y reserva 400 MXN. **Contribución: 1,100 MXN/mes (44%)**. Si cada cliente exige un flujo propio que cambia semanalmente, el costo/hora se incrementa y puede eliminar el beneficio.

**Aprendizaje:** la configuración repetible es condición para que un servicio a medida pueda sostener ingresos recurrentes.

# 15. Tres escenarios de ingresos recurrentes al mes 12

Estas cifras son un **modelo de sensibilidad de cartera futura**, no previsión de contratos ni proyección de ventas certificada. Se calculan a mes 12 como una fotografía de MRR; no equivalen a ingreso acumulado del año ni incluyen implementaciones, IVA, ISR, comisiones de venta, nómina corporativa, salarios directivos, adquisición de clientes o reserva fiscal.

| Variable | Conservador | Base | Expansión |
|---|---:|---:|---:|
| Comunidades activas | 1 | 3 | 6 |
| Viviendas promedio por comunidad | 250 | 300 | 350 |
| Cuota ilustrativa por vivienda (MXN/mes) | 35 | 45 | 50 |
| Ingreso mensual de comunidades (MXN) | 8,750 | 40,500 | 105,000 |
| Consultorios administrativos | 2 × 1,500 | 5 × 1,800 | 10 × 2,000 |
| Ingreso mensual de consultorios (MXN) | 3,000 | 9,000 | 20,000 |
| Retainers de automatización | 2 × 1,500 | 4 × 2,500 | 8 × 3,000 |
| Ingreso mensual de retainers (MXN) | 3,000 | 10,000 | 24,000 |
| **MRR total ilustrativo (MXN)** | **14,750** | **59,500** | **149,000** |
| Costos variables de caja (MXN/mes) | 5,000 | 14,000 | 33,000 |
| Horas directas mensuales | 30 | 70 | 160 |
| Valorización de horas a 350 MXN | 10,500 | 24,500 | 56,000 |
| **Contribución antes de gastos generales (MXN)** | **-750** | **21,000** | **60,000** |

**Lectura correcta:** en el escenario conservador se pierde dinero bajo los supuestos de la unidad, incluso antes de gastos corporativos. El escenario base genera contribución, pero no demuestra que la empresa sea rentable después de salarios, dirección, adquisición y desarrollo. El de expansión consume 160 horas mensuales de atención, lo que puede forzar una contratación o reducir la capacidad comercial del equipo.

**Regla para usar esta tabla:** cambiar número de cuentas, precio, soporte por cuenta, costo tecnológico, demora de cobro y churn con datos reales. Evaluar escenarios con cero nuevas ventas durante varios meses. No construir estructura fija basada en el escenario de expansión.

## 15.1. Fórmulas para completar el modelo con datos verdaderos

**Ingreso recurrente esperado:** cuentas activas × precio medio por cuenta + complementos pagados - descuentos recurrentes.  
**Margen operativo real:** ingresos cobrados - todos los costos recurrentes - nómina e impuestos relevantes - depreciación/amortización procedente - gastos generales.  
**CAC:** costo de prospección y venta del periodo / nuevos clientes ganados atribuibles.  
**Recuperación de CAC:** CAC / contribución mensual promedio del cliente, si el denominador es positivo.  
**Churn de clientes:** cuentas canceladas en el periodo / cuentas al inicio.  
**Churn de ingresos:** MRR perdido en periodo / MRR inicial, con tratamiento explícito de expansiones.  
**Punto de equilibrio de suscripción:** costos atribuibles fijos mensuales / contribución por cuenta, si el modelo es homogéneo.

**Precaución financiera:** no contar una hora liberada como ingreso si no se vendió el servicio adicional ni se eliminó un gasto; tampoco añadir por separado la misma contribución dentro de un margen calculado.

# 16. Presupuesto de ejecución para los primeros 90 días

## 16.1. Trabajo del equipo

Propuesta de asignación durante 90 días, **270–360 horas económicas** dedicadas al programa: producto y pruebas 100–140 horas; ventas/oferta 60–80; piloto interno de IA 40–55; documentación, seguridad y datos 50–65; revisión de dirección 20 horas. No representa la jornada total de ambos colaboradores: el resto debe mantener servicio contratado, incidencias y otras obligaciones.

Con el **supuesto ilustrativo** de 350 MXN/hora de costo económico completo, son **94,500 a 126,000 MXN** de capacidad que se deja de utilizar en otra cosa. No es gasto de caja incremental si la nómina ya se paga, pero sí tiene costo de oportunidad y debe aparecer en la decisión de inversión.

## 16.2. Gasto de caja adicional

Una banda exploratoria de **10,000–35,000 MXN durante 90 días** podría distribuirse entre servicios/API e infraestructura de prueba (3,000–12,000), validaciones y desplazamientos (2,000–8,000) y apoyo externo acotado en revisión contractual, privacidad o seguridad (5,000–15,000). **No es una cotización ni asegura cobertura legal completa**, especialmente en servicios de salud o control físico.

**Inversión económica ilustrativa total del programa:** **104,500–161,000 MXN** combinando horas internas valoradas y caja incremental. Antes de aprobarla, comparar con el margen de contribución mensual esperado y la probabilidad real de conseguir contratos.

## 16.3. Puerta para autorizar gasto mayor

No adquirir hardware, contratar una API compleja o construir una capa multi-tenant costosa hasta contar con: comprador identificado; alcance; beneficio medible; arquitectura y datos; costo de mantenimiento; responsable de soporte; criterios de aceptación; contrato y plan de salida. Si falta un elemento, financiar sólo un prototipo reversible o trabajo de descubrimiento.

## 16.4. Costos de IA y WhatsApp: cálculo que no depende de una marca

Los modelos comerciales de API suelen cobrar por volumen de entrada/salida, y sus tarifas pueden cambiar, incluso por velocidad, caché, región y herramientas. Para presupuestar 1,000 tareas al mes con 2,500 tokens de entrada y 350 de salida por tarea, la facturación de tokens es **2.5 × tarifa de entrada por millón + 0.35 × tarifa de salida por millón**, en la moneda definida por el proveedor; faltan reintentos, RAG, adjuntos, almacenamiento y revisión. Reemplazar con la tarifa vigente al momento de compra. [E1]

La WhatsApp Business Platform aplica categorías de mensajes y estructuras de tarifas por país y fecha. Consultar la tarjeta oficial de Meta antes de presupuestar, separando mensajes de utilidad, marketing, autenticación y otras condiciones; evitar suponer gratis todos los recordatorios o que la misma tarifa aplica a todos los países. [E2]

# 17. Capacidad de dos personas: cómo proteger margen y continuidad

## 17.1. Política de trabajo en curso

**No más de dos grandes iniciativas en desarrollo simultáneo**, más incidentes contractuales. Cada tarea entra a una cola priorizada; si una urgencia de cliente supera el límite, se debe posponer otra iniciativa de manera explícita. Mantener una reserva operativa para incidentes y mantenimiento no previstos, calculada a partir de horas reales.

El equipo debe tener una sola cola de problemas por prioridad y un registro de cambios por producto. Crear una nueva aplicación para resolver un requerimiento común sólo es justificable si los módulos existentes no sirven.

## 17.2. Roles sugeridos, no nombramientos existentes

**Responsable de negocio y dirección:** entrevistas de cliente, prioridades, precio, aprobación de cambios de alcance, contratos, métricas de margen y aceptación del trabajo.

**Responsable de arquitectura y operaciones técnicas:** pruebas, integraciones, seguridad, despliegues, respaldos, monitoreo y procedimientos de recuperación.

**Responsables compartidos:** documentación de requisitos, revisión de IA, atención de incidentes, validación con usuarios y calendario de mejoras.

**Especialistas externos según riesgo y costo:** instalación física de controladores, seguridad de red, asesoría jurídica de datos personales, fiscalidad, cumplimiento clínico y soporte de equipos médicos. La contratación de cualquiera requiere términos y responsabilidad concretos.

## 17.3. RACI simplificado

| Decisión | Negocio / dirección | Ingeniería | Cliente autorizador |
|---|---|---|---|
| Priorización de producto | Aprueba | Asesora | Consultado |
| Precio y contrato | Aprueba | Estima esfuerzo | Acepta alcance |
| Diseño técnico | Informado | Responsable | Consultado |
| Cambio en datos financieros | Autoriza política | Implementa control | Aprueba operación según contrato |
| Cambio de vigencia o hardware | Autoriza condiciones | Verifica y registra | Autoriza acción |
| Entrega de datos médicos | Autoriza política comercial | Configura controles | Responsable según contrato y ley |
| Incidente crítico | Coordina comunicación | Ejecuta recuperación | Recibe información / interviene |
| Publicar caso de éxito | Aprueba | Verifica datos técnicos | Autoriza divulgación |

## 17.4. Soporte y horarios que se pueden cumplir

Definir SLA por plan. Una empresa pequeña no puede prometer respuesta inmediata 24/7 sin turnos, personal, alertas, redundancia y presupuesto. Ejemplo orientativo para un servicio administrado **en horario laboral acordado**: prioridad 1 con recepción y clasificación urgente y objetivo de primera respuesta dentro de cuatro horas laborales; prioridad 2 dentro del siguiente día laboral; prioridad 3 según backlog programado. Estos tiempos son propuestas a validar con capacidad real, no contratos actuales.

Para acceso vehicular y otros servicios críticos, diferenciar **disponibilidad del software** de **respuesta humana presencial**, del mantenimiento de internet y de la capacidad del proveedor del dispositivo. Un SLA comercial debe dejar clara la responsabilidad de cada capa y el procedimiento local de contingencia.

## 17.5. Condición para contratar más capacidad

Considerar apoyo externo o contratación cuando, durante ocho semanas, se cumplan simultáneamente: contribución recurrente positiva y cobrable, tickets de soporte que ya consumen capacidad reservada, backlog comercial rechazado por falta de tiempo y procedimientos estables para delegar. La contratación debe basarse en la restricción demostrada; no sólo en haber lanzado nuevas funcionalidades.

# 18. Comercialización: embudo, segmentos y mensajes

## 18.1. Cliente ideal inicial de CondoOps

Administración o comité de comunidad que tenga dificultad documentada con cobros, morosos, comunicación, control de acceso o informes; disponga de responsable para autorizar procesos y presupuesto; acepte registrar correctamente sus reglas; y pueda realizar una prueba controlada. Un prospecto que únicamente desea «tener IA» pero no puede identificar un proceso costoso debe pasar primero por diagnóstico.

La cercanía geográfica en la fase inicial importa si la solución requiere controlador o red local. Mantener una oferta exclusivamente de software para comunidades fuera del radio de soporte presencial acordado.

## 18.2. Investigación comercial antes de la demo

Preguntar: ¿cuántas viviendas y cuántas activas?, ¿cómo se registran pagos?, ¿cómo se confirma realmente la transferencia?, ¿qué pasa con pagos parciales?, ¿cuánto tarda una aclaración?, ¿qué dispositivos existen?, ¿quién los administra?, ¿qué pasa en un apagón?, ¿qué decisiones puede tomar el guardia?, ¿cuánto cuesta hoy el problema?, ¿quién compra y quién firma? No solicitar archivos de residentes, credenciales o estados de cuenta por canales inseguros durante la prospección.

**Resultado:** una ficha de oportunidad con dolor, responsable, presupuesto, datos, riesgo, fecha y siguiente paso acordado.

## 18.3. Narrativa de venta que no dependa de moda

**Apertura:** «Desarrollamos software ajustado a las reglas de su comunidad y lo conectamos con herramientas existentes cuando hay una integración técnicamente viable».

**Prueba:** mostrar flujo de cuota, cuenta, reporte y un dispositivo de prueba, con incertidumbres claramente identificadas.

**Beneficio:** menos duplicación de trabajo, seguimiento de movimientos y visibilidad para administración; el valor de la seguridad debe tratarse con responsabilidad.

**IA opcional:** «Podemos agregar un módulo para clasificar solicitudes y preparar reportes, sujeto a pruebas y aprobación de la administración». No atribuir a IA acciones que ejecuta el backend con reglas convencionales.

## 18.4. Experimento de captación de 90 días

Seleccionar 40–60 prospectos relevantes, agrupados por tamaño y problema. Documentar contacto, conversación, propuesta, motivo de rechazo y compromiso de siguiente paso. Crear dos versiones de la oferta —una centrada en cobros y otra en operación integral—, compararlas sin exagerar resultados y revisar semanalmente.

**Hipótesis a validar:** al menos 10 entrevistas de problema, 3 propuestas concretas y una conversación seria sobre un piloto pagado. Estos números son metas operativas sugeridas, no tasas del mercado. Si la conversión es baja, revisar precio, autoridad del comprador y valor ofrecido antes de comprar publicidad.

## 18.5. Sitio web como instrumento medible

El sitio de Listo en Línea contiene un acceso a una demostración y formularios de contacto. Recomendación: instrumentar eventos de visitas, clic en demo, demo iniciada/completada, contacto solicitado, reunión agendada, propuesta enviada y cierre, conservando privacidad y permisos. No instalar un sistema pesado de CRM si una hoja estructurada o sistema simple cubre la etapa.

Se deben crear casos de estudio con permiso de clientes, páginas orientadas a búsqueda de problemas concretos, un formulario breve de diagnóstico y una explicación honesta de alcances. Evitar que la demo generativa invente retornos o precios de productos como si fueran resultados reales. [R1]

# 19. Indicadores y cuadro de mando de dirección

## 19.1. Finanzas y cartera

- **MRR cobrado**, no sólo facturado; nuevos MRR y pérdidas por cancelación.
- **Contribución por cuenta y por línea**, incluyendo horas de soporte realmente trabajadas.
- **Ingresos únicos frente a recurrentes** para conocer dependencia de instalaciones.
- **Tiempo de cobro** y cuentas con pagos atrasados.
- **Costo de adquisición** y retorno de la actividad comercial, si existe un registro consistente.

## 19.2. Entrega y calidad

- Tiempo desde aceptación de requerimiento hasta despliegue comprobado.
- Porcentaje de requerimientos entregados sin retrabajo significativo.
- Defectos críticos en producción y tiempo hasta contención.
- Porcentaje de restauraciones de respaldos probadas satisfactoriamente.
- Tiempo de puesta en marcha de cliente nuevo y personalizaciones que requieren cambios al núcleo.

## 19.3. Producto y adopción

- Comunidades activas que realizan procesos reales, no sólo cuentas creadas.
- Porcentaje de conciliaciones correctamente verificadas; comprobantes pendientes.
- Porcentaje de eventos físicos que se registran con estado confirmado.
- Uso de reportes por administradores y problemas resueltos.
- Para clínica: citas confirmadas y comunicaciones autorizadas, sin inferir resultados clínicos.

## 19.4. IA y automatización

- Costo de IA por resultado aceptado, incluyendo revisión.
- Tiempo neto ahorrado medido y **aprovechado** en una tarea de valor.
- Tasa de respuestas que necesitan corrección; errores por clase y severidad.
- Fugas de información o acciones no autorizadas: objetivo **cero incidentes**; cualquier incidencia crítica dispara revisión.
- Pruebas de regresión aprobadas antes de cambiar modelo, prompt, documentos o conectores.

## 19.5. Objetivos hipotéticos de control en 90 días

| Indicador | Meta de trabajo, no dato histórico |
|---|---|
| Procesos prioritarios con dueño, entrada, salida y regla documentada | 100% de los seleccionados |
| Casos críticos de pago y acceso simulados antes de intervención real | 100% del conjunto de aceptación aprobado |
| Pilotos internos de IA medidos con línea base y revisión | 1 completo |
| Propuestas que usan plantilla aprobada con alcance claro | 100% de las nuevas |
| Defectos críticos conocidos al autorizar nuevo despliegue | 0 abiertos |
| Restauración de respaldo en un entorno controlado | 1 prueba completa documentada |
| Prospectos con necesidad, autoridad, presupuesto y siguiente paso | Por lo menos 10 conversaciones cualificadas |
| Horas reales de soporte registradas por producto | Cobertura total del periodo de prueba |

**No confundir:** una meta de «cero defectos críticos abiertos» no prueba ausencia de defectos desconocidos; sólo impide ignorar riesgos ya detectados.

# 20. Gobierno de IA, seguridad y protección de datos

## 20.1. Política corporativa mínima

**Permitido de inicio:** ayuda a redacción no sensible, investigación con fuentes, documentación de código, clasificación de tickets de bajo riesgo, pruebas de software y análisis de datos agregados. **Condicionado:** lectura de datos de clientes con bases legales, contratos, controles de acceso y minimización; extracción de comprobantes que no alteren cuentas; agentes de escritura para acciones reversibles. **Prohibido sin aprobación especial:** decisiones clínicas, acreditaciones financieras, control físico, publicación de credenciales o tratamiento indiscriminado de datos sensibles mediante modelos externos.

El NIST AI RMF y su perfil de IA generativa son referencias voluntarias para diseñar gobierno, medición y controles según contexto; no sustituyen obligaciones jurídicas ni certifican una plataforma comercial. [E3]

## 20.2. Inventario de datos y terceros

Mantener para cada integración: controlador de los datos, finalidad, base legitimadora, categoría de información, proveedor, ubicación de tratamiento cuando aplique, acceso, retención, borrado, subprocesadores, incidentes y responsable. Revisar condiciones del proveedor antes de introducir datos de clientes. Usar datos ficticios en pruebas hasta que exista autorización.

## 20.3. Ley mexicana y datos de salud

La Ley Federal de Protección de Datos Personales en Posesión de los Particulares fue renovada en marzo de 2025 y debe consultarse en su texto vigente y sus reformas; la empresa debe evaluar avisos, finalidades, medidas de seguridad, derechos de titulares, encargados y transferencias. Para servicios de salud y datos personales sensibles se exige un análisis jurídico especializado antes de la producción. Este plan no constituye asesoría jurídica. [E4]

## 20.4. Ataques contra agentes y conectores

El riesgo no se limita a «alucinaciones»: un documento o mensaje malicioso puede ordenar a un agente que ignore instrucciones, envíe información o ejecute herramientas fuera del propósito. Basarse en controles de identidad, scopes, validación, listas de acciones, revisión de efectos, aislamiento y trazabilidad; no en una frase de prompt. OWASP recoge prompt injection, divulgación de datos y autonomía excesiva como clases de riesgo. [E6]

## 20.5. Respuesta a incidentes

1. Detectar y clasificar: incidente de calidad, seguridad, dinero, datos o hardware.
2. Contener: detener automatización, revocar credenciales o desconectar conmutadores seguros según protocolo.
3. Preservar evidencia protegida: versión de flujo, actor, estado, momento y acciones realizadas.
4. Recuperar: restaurar servicio o modo manual verificado; no repetir operaciones con riesgo de duplicidad.
5. Comunicar: al responsable contractual y a interesados/autoridades cuando corresponda legalmente.
6. Aprender: registrar causa, corregir control y añadir prueba de regresión.

**Puertas inmediatas de suspensión:** acreditación sin evidencia, duplicación de movimientos, cambio no autorizado de acceso, fuga de datos personales, envío cruzado entre clientes o pérdida de trazabilidad de una acción crítica.

# 21. Escenarios de fracaso, señales tempranas y respuesta

## Fracaso 1. Más proyectos y el mismo ingreso

**Señal:** crecimiento de demos, commits y personalizaciones, sin incremento de MRR ni margen. **Respuesta:** limitar proyectos simultáneos, cobrar descubrimiento, estandarizar módulos y revisar el embudo.

## Fracaso 2. El hardware domina la agenda

**Señal:** visitas y llamadas de caseta absorben tiempo de ingeniería. **Respuesta:** contratos de alcance, procedimientos de red y dispositivos, diagnósticos pagados, aliado instalador y plan de contingencia en sitio.

## Fracaso 3. Automatización que produce incidentes

**Señal:** comprobantes duplicados, respuestas no autorizadas o estados financieros inconsistentes. **Respuesta:** suspender la escritura automática, reconciliar datos, revisar idempotencia y mantener humanos en el bucle.

## Fracaso 4. Precio mensual demasiado bajo

**Señal:** margen de contribución negativo tras contabilizar mensajes, soporte y cambios. **Respuesta:** definir precio mínimo por sitio, cobrar instalación, delimitar bolsa de soporte, evitar personalización ilimitada.

## Fracaso 5. Venta basada en «IA» sin utilidad demostrada

**Señal:** prospectos piden «algo con IA», pero no aceptan un piloto pagado. **Respuesta:** volver a preguntas de costo, tiempo y calidad; demostrar un resultado con evidencia de negocio.

## Fracaso 6. Dependencia del fundador

**Señal:** ninguna entrega, venta o cambio de un sistema puede completarse sin una persona. **Respuesta:** crear habilidades, SOP, acceso responsable a información, matriz de permisos y aprobación por categoría.

## Fracaso 7. Soluciones clínicas prematuras

**Señal:** se solicita usar datos reales antes de pruebas, contratos y autorizaciones. **Respuesta:** mantener demostración con datos ficticios; contratar revisión y validación antes de migrar datos.

## Fracaso 8. Dependencia técnica de una herramienta

**Señal:** el proveedor cambia API/precio o deja de existir y el producto no puede operar. **Respuesta:** adaptadores, exportación documentada, alternativas de proveedor, pruebas de transición y modo manual controlado.
