(() => {
  'use strict';

  const app = document.getElementById('demoApp');
  const modal = document.getElementById('demoModal');
  const toast = document.getElementById('demoToast');
  const money = new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN',maximumFractionDigits:0});
  const adultUpper=[18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
  const adultLower=[48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];

  const state = {
    page:'home', agendaView:'week', drawerTab:'appointments', recordView:'odontogram',
    historyPatientId:1, odoStage:'initial', odoVersion:1, odoFinalized:false, multiSelect:false,
    selectedTeeth:new Set(), rxRotation:0, financeTab:'cxc',
    patients:[
      {id:1,name:'Arturo Vazquez',age:31,phone:'3312345678',email:'arturo.demo@example.com',status:'Activo',file:'EXP-2026-000005',created:'20 sep 2026',note:'Paciente en control preventivo. Revisión de restauración en 6 meses.',allergies:'Sin alergias registradas',tags:['Paciente activo','Control preventivo'],last:'—',next:'03 oct 2026 · 10:30',tutor:'—'},
      {id:2,name:'Diego Alvarado Luna',age:6,phone:'3338221100',email:'familia.alvarado@example.com',status:'Activo',file:'EXP-2026-000006',created:'21 sep 2026',note:'Buena adaptación a consulta.',allergies:'Alergia reportada a penicilina',tags:['Pediatría','Seguimiento'],last:'24 sep 2026 · 11:30',next:'08 oct 2026 · 16:00',tutor:'Paola Luna'},
      {id:3,name:'Emiliano Cárdenas Solís',age:9,phone:'3311982200',email:'familia.cardenas@example.com',status:'Activo',file:'EXP-2026-000007',created:'22 sep 2026',note:'Control de selladores.',allergies:'Sin alergias registradas',tags:['Pediatría'],last:'29 sep 2026 · 12:30',next:'15 oct 2026 · 12:30',tutor:'Mariana Solís'},
      {id:4,name:'Gael Serrano López',age:8,phone:'3329012288',email:'familia.serrano@example.com',status:'Activo',file:'EXP-2026-000008',created:'22 sep 2026',note:'Pendiente radiografía de control.',allergies:'Sin alergias registradas',tags:['Pediatría','RX pendiente'],last:'26 sep 2026 · 10:30',next:'05 oct 2026 · 09:00',tutor:'Laura López'},
      {id:5,name:'Itzel Navarro Mejía',age:12,phone:'3314459922',email:'itzel.demo@example.com',status:'Activo',file:'EXP-2026-000009',created:'23 sep 2026',note:'Valoración ortodóncica.',allergies:'Latex: sensibilidad leve',tags:['Ortodoncia'],last:'25 sep 2026 · 15:30',next:'10 oct 2026 · 13:00',tutor:'Roberto Navarro'}
    ],
    appointments:[
      {id:1,date:'2026-10-01',time:'09:00',patientId:2,patient:'Diego Alvarado Luna',treatment:'Control clínico',doctor:'Dra. Samantha',chair:'A',status:'Confirmada',minutes:45},
      {id:2,date:'2026-10-01',time:'10:15',patientId:1,patient:'Arturo Vazquez',treatment:'Profilaxis',doctor:'Dra. Samantha',chair:'B',status:'Confirmada',minutes:60},
      {id:3,date:'2026-10-01',time:'12:00',patientId:3,patient:'Emiliano Cárdenas Solís',treatment:'Selladores',doctor:'Dra. Samantha',chair:'C',status:'Pendiente',minutes:30},
      {id:4,date:'2026-10-01',time:'16:30',patientId:4,patient:'Gael Serrano López',treatment:'Valoración + RX',doctor:'Dra. Samantha',chair:'B',status:'Confirmada',minutes:45},
      {id:5,date:'2026-10-02',time:'11:00',patientId:5,patient:'Itzel Navarro Mejía',treatment:'Valoración ortodóncica',doctor:'Dra. Samantha',chair:'C',status:'Confirmada',minutes:60}
    ],
    treatments:[
      {id:1,name:'Consulta / valoración',category:'Diagnóstico',minutes:30,sessions:1,cost:180,price:500,active:true},
      {id:2,name:'Profilaxis',category:'Preventivo',minutes:45,sessions:1,cost:240,price:650,active:true},
      {id:3,name:'Sellador de fosetas y fisuras',category:'Preventivo',minutes:30,sessions:1,cost:160,price:450,active:true},
      {id:4,name:'Restauración con resina',category:'Operatoria',minutes:60,sessions:1,cost:340,price:900,active:true},
      {id:5,name:'Pulpotomía',category:'Odontopediatría',minutes:75,sessions:1,cost:580,price:1500,active:true},
      {id:6,name:'Corona acero-cromo',category:'Odontopediatría',minutes:70,sessions:1,cost:620,price:1650,active:true}
    ],
    inventory:[
      {id:1,name:'Resina A2',category:'Restauración',qty:8,min:4,opt:12,provider:'DentalPro',cost:780},
      {id:2,name:'Sellador fotocurable',category:'Preventivo',qty:3,min:4,opt:8,provider:'Odonto Supply',cost:590},
      {id:3,name:'Guantes pediátricos',category:'Desechables',qty:0,min:5,opt:20,provider:'Medical Box',cost:220},
      {id:4,name:'Vasos desechables',category:'Desechables',qty:12,min:8,opt:24,provider:'Medical Box',cost:95},
      {id:5,name:'Anestésico local',category:'Anestesia',qty:5,min:5,opt:10,provider:'DentalPro',cost:690}
    ],
    followups:[
      {id:1,patient:'Diego Alvarado Luna',type:'Medicamento',when:'09:00',note:'Recordar indicaciones del tratamiento',done:false},
      {id:2,patient:'Emiliano Cárdenas Solís',type:'Confirmación',when:'12:00',note:'Confirmar cita de control',done:false},
      {id:3,patient:'Gael Serrano López',type:'RX',when:'18:00',note:'Recordar estudio radiográfico',done:false}
    ],
    findings:[
      {id:1,tooth:18,name:'Caries',surface:'OCLUSAL',state:'bad'},
      {id:2,tooth:16,name:'Restauración',surface:'OCLUSAL',state:'good'},
      {id:3,tooth:15,name:'Caries',surface:'DISTAL',state:'bad'},
      {id:4,tooth:12,name:'Restauración',surface:'VESTIBULAR',state:'good'},
      {id:5,tooth:24,name:'Caries',surface:'MESIAL',state:'bad'},
      {id:6,tooth:35,name:'Sellador',surface:'OCLUSAL',state:'good'}
    ],
    perio:{},
    history:{
      motivo:'Revisión preventiva y control de restauraciones.',
      alergias:'Sin alergias registradas.',
      antecedentesMedicos:'Paciente sano. Niega enfermedades crónicas.',
      antecedentesOdontologicos:'Profilaxis previa y restauración en pieza 16.',
      medicamentos:'Ninguno.',
      diagnostico:'Riesgo de caries moderado. Higiene oral aceptable.',
      observaciones:'Se recomienda reforzar técnica de cepillado.'
    },
    evolutions:[
      {date:'23 sep 2026',text:'Valoración inicial, fotografías y odontograma. Se explican hallazgos y plan preventivo.'},
      {date:'28 sep 2026',text:'Profilaxis sin incidencias. Paciente tolera adecuadamente el procedimiento.'}
    ],
    prescriptions:[
      {date:'28 sep 2026',name:'Enjuague bucal sin alcohol',instructions:'10 ml, 2 veces al día por 7 días'},
      {date:'23 sep 2026',name:'Pasta fluorada',instructions:'Cepillado 3 veces al día'}
    ],
    budgets:[
      {id:'PRE-0068',patientId:1,total:3200,status:'Aceptado',date:'23 sep 2026'},
      {id:'PRE-0071',patientId:2,total:1800,status:'Pendiente',date:'28 sep 2026'}
    ],
    tasks:[
      {id:1,patientId:1,title:'Enviar indicaciones preventivas',status:'Pendiente'},
      {id:2,patientId:2,title:'Confirmar disponibilidad de horario',status:'Pendiente'}
    ]
  };

  function esc(v){return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function patient(id){return state.patients.find(p=>p.id===Number(id))||state.patients[0];}
  function initials(name){return name.split(/\s+/).slice(0,2).map(x=>x[0]).join('').toUpperCase();}
  function status(label,tone=''){return '<span class="badge '+tone+'">'+esc(label)+'</span>';}
  function notify(message){toast.textContent=message;toast.classList.add('show');clearTimeout(notify.t);notify.t=setTimeout(()=>toast.classList.remove('show'),2400);}
  function closeModal(){modal.hidden=true;modal.setAttribute('aria-hidden','true');modal.innerHTML='';}
  function openModal(title,body,foot='',wide=false){
    modal.hidden=false;modal.setAttribute('aria-hidden','false');
    modal.innerHTML='<section class="modal '+(wide?'wide':'')+'" role="dialog" aria-modal="true"><header class="modal-head"><h2>'+esc(title)+'</h2><button class="modal-close" type="button" data-close-modal>×</button></header><div class="modal-body">'+body+'</div>'+(foot?'<footer class="modal-foot">'+foot+'</footer>':'')+'</section>';
  }

  function setPage(page){
    state.historyPatientId=null;state.page=page;
    document.querySelectorAll('[data-page]').forEach(b=>b.classList.toggle('active',b.dataset.page===page));
    document.querySelectorAll('.nav-menu').forEach(d=>d.classList.toggle('active',!!d.querySelector('[data-page="'+page+'"]')));
    document.querySelectorAll('.nav-menu').forEach(d=>d.removeAttribute('open'));
    render();
    scrollTo({top:42,behavior:'smooth'});
  }

  function head(kicker,title,desc,actions=''){return '<div class="page-head"><div><p class="eyebrow">'+esc(kicker)+'</p><h1>'+esc(title)+'</h1><p>'+esc(desc)+'</p></div><div class="actions">'+actions+'</div></div>';}
  function kpi(label,value,note){return '<article class="card kpi"><span class="kpi-label">'+esc(label)+'</span><strong>'+value+'</strong><small>'+note+'</small></article>';}

  function renderHome(){
    return '<section class="page">'+
      head('Panel general · Demo','La clínica, sin perder ningún detalle.','Agenda, expediente, cobro, materiales y seguimiento conectados alrededor de cada paciente.','<button class="btn primary" data-new-patient>＋ Registrar paciente</button>')+
      '<div class="kpis">'+kpi('Pacientes del último mes','128','Datos ficticios')+kpi('Citas de hoy',String(state.appointments.filter(a=>a.date==='2026-10-01').length),'3 confirmadas · 1 pendiente')+kpi('Meta mensual','$95,000','Objetivo demo')+kpi('Inventario por atender',String(state.inventory.filter(i=>i.qty<=i.min).length),'Insumos en mínimo o debajo')+'</div>'+
      '<div class="layout-2"><article class="card"><div class="card-head"><div><h2>Agenda de hoy</h2><p>Ordenada por horario, duración y complejidad.</p></div><button class="btn soft" data-page="agenda">Abrir agenda</button></div><div class="list">'+
      state.appointments.filter(a=>a.date==='2026-10-01').map(a=>'<div class="list-row"><div class="list-icon">'+esc(a.time)+'</div><div class="list-copy"><strong>'+esc(a.patient)+'</strong><span>'+esc(a.treatment)+' · '+esc(a.doctor)+' · Silla '+esc(a.chair)+'</span></div>'+status(a.status,a.status==='Confirmada'?'':'warning')+'</div>').join('')+
      '</div></article><div class="stack"><article class="card"><div class="card-head"><div><h2>Meta de ingresos</h2><p>Seguimiento contra metas 2026.</p></div>'+status('En curso','info')+'</div><div class="price-calc"><div class="metric"><small>Ingreso estimado</small><strong>$68,000</strong></div><div class="metric"><small>Meta</small><strong>$95,000</strong></div><div class="metric"><small>Avance</small><strong>72%</strong></div></div></article>'+
      '<article class="card"><div class="card-head"><div><h2>Acciones prioritarias</h2><p>Lo que requiere atención.</p></div></div><div class="list"><div class="list-row"><div class="list-icon">▦</div><div class="list-copy"><strong>Inventario</strong><span>4 insumos por revisar</span></div><button class="btn" data-page="inventory">Abrir</button></div><div class="list-row"><div class="list-icon">$</div><div class="list-copy"><strong>Cuentas por cobrar</strong><span>3 pagos vencidos</span></div><button class="btn" data-page="finance">Abrir</button></div><div class="list-row"><div class="list-icon">✉</div><div class="list-copy"><strong>Seguimientos</strong><span>3 mensajes pendientes</span></div><button class="btn" data-page="followups">Abrir</button></div></div></article></div></div></section>';
  }

  function renderAgenda(){
    const action='<button class="btn" data-agenda-view="month">Mes</button><button class="btn" data-agenda-view="week">Semana</button><button class="btn" data-agenda-view="day">Día</button><button class="btn primary" data-new-appointment>＋ Nueva cita</button>';
    let content='';
    if(state.agendaView==='month'){
      const days=['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
      content='<div class="table-wrap"><div class="month-grid">'+days.map(d=>'<div class="month-head">'+d+'</div>').join('')+Array.from({length:35},(_,i)=>{const day=i-1;const appts=state.appointments.filter(a=>Number(a.date.slice(-2))===day);return '<div><small>'+(day>0&&day<=31?day:'')+'</small>'+appts.map(a=>'<button class="agenda-event" data-open-appointment="'+a.id+'"><i class="month-dot"></i>'+esc(a.time)+' '+esc(a.patient.split(' ')[0])+'</button>').join('')+'</div>';}).join('')+'</div></div>';
    } else {
      const hours=['08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00'];
      const days=['Lun 28','Mar 29','Mié 30','Jue 01','Vie 02','Sáb 03'];
      content='<div class="table-wrap"><div class="agenda-grid"><div class="day-cell">Hora</div>'+days.map(d=>'<div class="day-cell">'+d+'</div>').join('')+hours.map(h=>'<div class="time-cell">'+h+'</div>'+days.map((d,idx)=>{const date=['2026-09-28','2026-09-29','2026-09-30','2026-10-01','2026-10-02','2026-10-03'][idx];const rows=state.appointments.filter(a=>a.date===date&&a.time.slice(0,2)===h.slice(0,2));return '<div>'+rows.map(a=>'<button class="agenda-event" data-open-appointment="'+a.id+'"><b>'+esc(a.time)+'</b>'+esc(a.patient)+'<br>'+esc(a.treatment)+'</button>').join('')+'</div>';}).join('')).join('')+'</div></div>';
    }
    return '<section class="page">'+head('Operación','Agenda y confirmaciones','Consulta citas, cambia la vista y crea registros demostrativos.',action)+'<article class="card"><div class="toolbar"><input class="input search" id="agendaSearch" placeholder="Buscar paciente o tratamiento"><select class="select" style="max-width:190px"><option>Todos los doctores</option><option>Dra. Samantha</option></select></div>'+content+'</article></section>';
  }

  function renderPatients(){
    const rows=state.patients.map(p=>'<article class="patient-row" data-patient-row data-search="'+esc((p.name+' '+p.phone+' '+p.file).toLowerCase())+'"><div class="avatar">'+initials(p.name)+'</div><div class="patient-name"><strong>'+esc(p.name)+'</strong><span>'+p.age+' años · '+esc(p.file)+'</span></div><div class="patient-meta"><b>Última cita</b>'+esc(p.last)+'</div><div class="patient-meta"><b>Próxima cita</b>'+esc(p.next)+'</div><div class="actions">'+status(p.status)+'<button class="btn" data-open-patient="'+p.id+'">Ver</button><button class="btn primary" data-open-history="'+p.id+'">Historial</button></div></article>').join('');
    return '<section class="page">'+head('Expediente único','Pacientes y familias','Directorio, asistencias, resumen rápido y acceso al historial clínico.','<button class="btn primary" data-new-patient>＋ Nuevo paciente</button>')+
      '<article class="card"><div class="tabs"><button class="active">Mis pacientes</button><button data-attendance>Asistencias</button></div><div class="toolbar"><input class="input search" id="patientSearch" placeholder="Buscar por nombre, expediente o teléfono"><span class="badge info">'+state.patients.length+' pacientes</span></div><div class="patient-list" id="patientList">'+rows+'</div></article></section>';
  }

  function renderOperation(){
    const todays=state.appointments.filter(a=>a.date==='2026-10-01');
    return '<section class="page">'+head('Flujo del día','Jornada clínica','Pacientes del día ordenados por horario y pasos clínicos.','<button class="btn primary" data-new-appointment>＋ Nueva cita</button>')+
      '<div class="layout-2"><article class="card"><div class="card-head"><div><h2>Pacientes de hoy</h2><p>Identidad, motivo, tratamiento y estado.</p></div>'+status(todays.length+' por atender','info')+'</div><div class="list">'+todays.map(a=>'<div class="list-row"><div class="list-icon">'+esc(a.time)+'</div><div class="list-copy"><strong>'+esc(a.patient)+'</strong><span>'+esc(a.treatment)+' · Silla '+esc(a.chair)+'</span></div><div class="actions"><button class="btn" data-open-patient="'+a.patientId+'">Ficha</button><button class="btn primary" data-open-history="'+a.patientId+'">Abrir expediente</button></div></div>').join('')+'</div></article>'+
      '<article class="card"><div class="card-head"><div><h2>Flujo de captura</h2><p>Información clínica con trazabilidad.</p></div></div><div class="list"><div class="list-row"><div class="list-icon">1</div><div class="list-copy"><strong>Identidad, alertas y motivo</strong><span>Confirmar datos y alergias</span></div></div><div class="list-row"><div class="list-icon">2</div><div class="list-copy"><strong>Procedimiento</strong><span>Diente, diagnóstico y materiales</span></div></div><div class="list-row"><div class="list-icon">3</div><div class="list-copy"><strong>Indicaciones</strong><span>Receta y recordatorios</span></div></div><div class="list-row"><div class="list-icon">4</div><div class="list-copy"><strong>Cerrar atención</strong><span>Cobro y próxima cita</span></div></div></div></article></div></section>';
  }

  function renderTreatments(){
    const rows=state.treatments.map(t=>'<tr data-treatment-row data-search="'+esc((t.name+' '+t.category).toLowerCase())+'"><td>'+esc(t.name)+'</td><td>'+esc(t.category)+'</td><td>'+t.minutes+' min</td><td>'+t.sessions+'</td><td>'+money.format(t.cost)+'</td><td><b>'+money.format(t.price)+'</b></td><td>'+status(t.active?'Activo':'Inactivo',t.active?'':'warning')+'</td><td><button class="btn" data-edit-treatment="'+t.id+'">Editar</button></td></tr>').join('');
    return '<section class="page">'+head('Catálogo clínico','Tratamientos y costos','Catálogo demostrativo con calculador de precios y edición en memoria.','<button class="btn primary" data-new-treatment>＋ Nuevo tratamiento</button>')+
      '<div class="layout-2"><article class="card"><div class="card-head"><div><h2>Catálogo completo</h2><p>'+state.treatments.length+' tratamientos hardcodeados.</p></div></div><div class="toolbar"><input class="input search" id="treatmentSearch" placeholder="Buscar tratamiento o categoría"></div><div class="table-wrap"><table class="table"><thead><tr><th>Tratamiento</th><th>Categoría</th><th>Tiempo</th><th>Sesiones</th><th>Costo</th><th>Precio</th><th>Estado</th><th></th></tr></thead><tbody id="treatmentRows">'+rows+'</tbody></table></div></article>'+
      '<article class="card"><div class="card-head"><div><h2>Calculador de precio</h2><p>Evita precios por debajo del costo.</p></div></div><div class="price-calc"><div class="field"><label>Tiempo de sillón (horas)</label><input class="input" id="calcHours" type="number" value="1" step=".25"></div><div class="field"><label>Costo por hora</label><input class="input" id="calcHourly" type="number" value="450"></div><div class="field"><label>Margen deseado %</label><input class="input" id="calcMargin" type="number" value="55"></div><div class="field"><label>Materiales</label><input class="input" id="calcMaterials" type="number" value="260"></div><div class="field"><label>Consumibles</label><input class="input" id="calcOther" type="number" value="90"></div><div class="metric"><small>Precio sugerido</small><strong id="calcSuggested">$1,778</strong></div></div><div class="callout" style="margin:0 16px 16px"><b>Fórmula demo:</b> costo total ÷ (1 − margen).</div></article></div></section>';
  }

  function renderFollowups(){
    return '<section class="page">'+head('Comunicación','Seguimientos automáticos','Cola demostrativa para confirmaciones, cuidados e indicaciones.','<button class="btn primary" data-generate-followup>＋ Programar seguimiento</button>')+
      '<div class="kpis">'+kpi('Mensajes pendientes',String(state.followups.filter(f=>!f.done).length),'Citas e indicaciones')+kpi('Confirmaciones','75%','Respuesta demo')+kpi('Sin respuesta','2','Requieren llamada')+kpi('Tratamientos activos','14','Con recordatorio')+'</div>'+
      '<div class="layout-2"><article class="card"><div class="card-head"><div><h2>Cola de mensajes</h2><p>WhatsApp Business · demo sin envío real.</p></div></div><div class="list">'+state.followups.map(f=>'<div class="list-row"><div class="list-icon">'+esc(f.when)+'</div><div class="list-copy"><strong>'+esc(f.patient)+' · '+esc(f.type)+'</strong><span>'+esc(f.note)+'</span></div>'+(f.done?status('Completado'):('<button class="btn primary" data-complete-followup="'+f.id+'">Marcar enviado</button>'))+'</div>').join('')+'</div></article>'+
      '<article class="card"><div class="card-head"><div><h2>Automatizaciones base</h2><p>Configurables por tratamiento.</p></div></div><div class="list"><div class="list-row"><div class="list-icon">36</div><div class="list-copy"><strong>Recordatorio de cita</strong><span>36 horas antes</span></div>'+status('Activa')+'</div><div class="list-row"><div class="list-icon">18</div><div class="list-copy"><strong>Solicitar confirmación</strong><span>18 horas antes</span></div>'+status('Activa')+'</div><div class="list-row"><div class="list-icon">RX</div><div class="list-copy"><strong>Indicaciones clínicas</strong><span>Según procedimiento</span></div>'+status('Por regla','info')+'</div></div></article></div></section>';
  }

  function renderInventory(){
    const rows=state.inventory.map(i=>{const tone=i.qty===0?'danger':i.qty<=i.min?'warning':'';const label=i.qty===0?'Comprar':i.qty<=i.min?'Bajo':'OK';return '<tr data-inventory-row data-search="'+esc((i.name+' '+i.category+' '+i.provider).toLowerCase())+'"><td><b>'+esc(i.name)+'</b></td><td>'+esc(i.category)+'</td><td>'+i.qty+'</td><td>'+i.min+'</td><td>'+i.opt+'</td><td>'+esc(i.provider)+'</td><td>'+money.format(i.cost)+'</td><td>'+status(label,tone)+'</td><td><button class="btn" data-use-inventory="'+i.id+'">Registrar uso</button></td></tr>';}).join('');
    return '<section class="page">'+head('Insumos','Inventario inteligente','Control demostrativo de existencias, mínimos, óptimos y consumo clínico.','<button class="btn primary" data-new-inventory>＋ Nuevo insumo</button>')+
      '<div class="kpis">'+kpi('Productos',String(state.inventory.length),'Inventario maestro')+kpi('Compra inmediata',String(state.inventory.filter(i=>i.qty===0).length),'Cantidad en cero')+kpi('Nivel bajo',String(state.inventory.filter(i=>i.qty>0&&i.qty<=i.min).length),'En o debajo del mínimo')+kpi('Valor estimado',money.format(state.inventory.reduce((s,i)=>s+i.qty*i.cost,0)),'Inventario disponible')+'</div>'+
      '<article class="card"><div class="toolbar"><input class="input search" id="inventorySearch" placeholder="Producto, categoría o proveedor"></div><div class="table-wrap"><table class="table"><thead><tr><th>Producto</th><th>Categoría</th><th>Actual</th><th>Mínimo</th><th>Óptimo</th><th>Proveedor</th><th>Costo</th><th>Estado</th><th></th></tr></thead><tbody id="inventoryRows">'+rows+'</tbody></table></div></article></section>';
  }

  function renderRx(){
    return '<section class="page">'+head('Samantha Studio RX','Estudios radiográficos','Visor demostrativo vinculado al expediente del paciente.','<button class="btn primary" data-toast="Estudio preparado en modo demostración.">＋ Nuevo estudio</button>')+
      '<div class="layout-2"><article class="card"><div class="card-head"><div><h2>Panorámica · Arturo Vazquez</h2><p>VISTA DEMOSTRATIVA · NO ES UNA RADIOGRAFÍA REAL</p></div>'+status('Vinculada','info')+'</div><div class="rx-viewer"><div class="rx-skull" id="rxSkull">☠</div><div class="rx-label">PANORÁMICA DEMO</div></div><div class="toolbar"><button class="btn" data-rx="-15">↶ Girar izquierda</button><button class="btn" data-rx="15">↷ Girar derecha</button><button class="btn" data-rx-reset>Restablecer</button></div></article>'+
      '<div class="stack"><article class="card"><div class="card-head"><h2>Metadatos</h2></div><div class="list"><div class="list-row"><div class="list-icon">RX</div><div class="list-copy"><strong>Tipo</strong><span>Panorámica</span></div></div><div class="list-row"><div class="list-icon">↗</div><div class="list-copy"><strong>Procedimiento relacionado</strong><span>Primera consulta / diagnóstico</span></div></div><div class="list-row"><div class="list-icon">▭</div><div class="list-copy"><strong>Archivo</strong><span>DICOM + miniatura segura</span></div></div></div></article><article class="card"><div class="card-head"><h2>Registro de estudios</h2></div><div class="table-wrap"><table class="table"><tbody><tr><td>02 sep 2026</td><td>Arturo Vazquez</td><td>Panorámica</td><td>'+status('Disponible')+'</td></tr><tr><td>24 sep 2026</td><td>Diego Alvarado Luna</td><td>Periapical</td><td>'+status('Disponible')+'</td></tr></tbody></table></div></article></div></div></section>';
  }

  function renderFinance(){
    const panel=state.financeTab==='cxc'?'<div class="table-wrap"><table class="table"><thead><tr><th>Paciente</th><th>Tratamiento</th><th>Total</th><th>Pagado</th><th>Saldo</th><th>Próximo pago</th><th>Estado</th></tr></thead><tbody><tr><td>Arturo Vazquez</td><td>Plan preventivo</td><td>$3,200</td><td>$1,600</td><td>$1,600</td><td>12 oct</td><td>'+status('Al corriente')+'</td></tr><tr><td>Paciente demo B</td><td>Plan restaurador</td><td>$6,800</td><td>$2,000</td><td>$4,800</td><td>05 oct</td><td>'+status('Vencido','danger')+'</td></tr></tbody></table></div>':
      state.financeTab==='payments'?'<div class="fin-tabs-panel"><div class="layout-3">'+['Semana 1 · $18,500','Semana 2 · $22,300','Semana 3 · $19,800'].map(x=>'<div class="metric"><small>Recaudación</small><strong>'+x+'</strong></div>').join('')+'</div></div>':
      state.financeTab==='lab'?'<div class="table-wrap"><table class="table"><thead><tr><th>Remisión</th><th>Paciente</th><th>Trabajo</th><th>Costo lab</th><th>Saldo</th><th>Entrega</th></tr></thead><tbody><tr><td>REM-DEM-01</td><td>Itzel Navarro Mejía</td><td>Aparato ortodóncico</td><td>$1,450</td><td>$650</td><td>08 oct</td></tr></tbody></table></div>':
      state.financeTab==='payroll'?'<div class="fin-tabs-panel"><div class="layout-3"><div class="metric"><small>Nómina semanal</small><strong>$12,800</strong></div><div class="metric"><small>Especialistas</small><strong>$8,450</strong></div><div class="metric"><small>Pagado</small><strong>82%</strong></div></div></div>':
      '<div class="table-wrap"><table class="table"><thead><tr><th>Producto</th><th>Precio</th><th>Existencia</th><th>Venta mensual</th></tr></thead><tbody><tr><td>Kit higiene infantil</td><td>$280</td><td>9</td><td>14</td></tr><tr><td>Cepillo ortodóncico</td><td>$160</td><td>12</td><td>8</td></tr></tbody></table></div>';
    return '<section class="page">'+head('Acceso administrador','Finanzas y cuentas por cobrar','Cobros, gastos y compromisos visibles a tiempo.','<button class="btn primary" data-toast="Plan de pago preparado en modo demo.">＋ Nuevo plan</button>')+
      '<div class="kpis">'+kpi('Ingreso mensual','$68,000','72% de meta demo')+kpi('Por cobrar','$9,400','3 pagos pendientes')+kpi('Gastos','$21,300','Datos ficticios')+kpi('Utilidad estimada','$46,700','Escenario demo')+'</div>'+
      '<article class="card"><div class="tabs">'+[['cxc','Cuentas por cobrar'],['payments','Calendario de pagos'],['lab','Laboratorio'],['payroll','Nómina y especialistas'],['sales','Ventas']].map(x=>'<button data-finance-tab="'+x[0]+'" class="'+(state.financeTab===x[0]?'active':'')+'">'+x[1]+'</button>').join('')+'</div>'+panel+'</article></section>';
  }

  function renderReports(){
    const vals=[52,63,58,71,75,82,73,35,20,10], months=['Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    return '<section class="page">'+head('Metas configurables','Reportes operativos','Del dato diario a la decisión anual.','<button class="btn" onclick="window.print()">Imprimir reporte</button><button class="btn primary" data-toast="Exportación Excel simulada.">Exportar Excel</button>')+
      '<div class="kpis">'+kpi('Ingreso mínimo mensual','$70,000','Meta demo')+kpi('Ingreso objetivo','$95,000','Meta demo')+kpi('Ticket objetivo','$700','Dato ficticio')+kpi('Utilidad neta mínima','$35,000','Dato ficticio')+'</div>'+
      '<div class="layout-2"><article class="card"><div class="card-head"><div><h2>Avance mensual contra meta</h2><p>Marzo–diciembre.</p></div>'+status('73% septiembre','info')+'</div><div class="bars">'+vals.map((v,i)=>'<div class="bar" style="height:'+v+'%"><b>'+v+'%</b><span>'+months[i]+'</span></div>').join('')+'</div></article><article class="card"><div class="card-head"><div><h2>Parámetros personales</h2><p>Configuración demostrativa.</p></div></div><div class="list"><div class="list-row"><div class="list-icon">6</div><div class="list-copy"><strong>Pacientes por día</strong><span>6 mínimo · 10 objetivo</span></div></div><div class="list-row"><div class="list-icon">%</div><div class="list-copy"><strong>Materiales / ingresos</strong><span>15–20%</span></div></div><div class="list-row"><div class="list-icon">$</div><div class="list-copy"><strong>Ticket promedio</strong><span>Objetivo $700</span></div></div></div></article></div></section>';
  }

  function renderConfig(){
    const caps=['Agenda, pacientes e historial','Anotación básica de procedimiento','Detalle clínico y odontograma','Rayos X e inventario','Finanzas, metas y reportes','Usuarios, roles e integraciones'];
    return '<section class="page">'+head('Seguridad','Usuarios y permisos','Tres roles claros y permisos visuales para demostrar el modelo.','<button class="btn primary" data-toast="Nuevo usuario simulado.">＋ Nuevo usuario</button>')+
      '<div class="layout-2"><article class="card"><div class="card-head"><div><h2>Matriz de permisos</h2><p>Administrador, asistente y recepcionista.</p></div></div><div class="table-wrap"><table class="table"><thead><tr><th>Capacidad</th><th>Administrador</th><th>Asistente</th><th>Recepcionista</th></tr></thead><tbody>'+caps.map((c,i)=>'<tr><td>'+c+'</td><td>✓</td><td>'+(i<4?'✓':'—')+'</td><td>'+(i<2?'✓':'—')+'</td></tr>').join('')+'</tbody></table></div></article>'+
      '<div class="stack"><article class="card"><div class="card-head"><h2>Integraciones</h2></div><div class="list"><div class="list-row"><div class="list-icon">G</div><div class="list-copy"><strong>Google Calendar</strong><span>Agenda y eventos</span></div><button class="btn" data-toast="Autorización OAuth simulada.">Autorizar</button></div><div class="list-row"><div class="list-icon">W</div><div class="list-copy"><strong>WhatsApp Business</strong><span>Recordatorios y confirmación</span></div><button class="btn" data-toast="Configuración de API simulada.">Configurar</button></div><div class="list-row"><div class="list-icon">☁</div><div class="list-copy"><strong>Almacenamiento clínico</strong><span>Fotos, PDF y DICOM</span></div><button class="btn" data-toast="Almacenamiento simulado.">Configurar</button></div></div></article><div class="callout"><b>Demo sin credenciales:</b> ningún botón guarda datos reales ni llama a APIs externas.</div></div></div></section>';
  }

  function drawerContent(p){
    const appointments=state.appointments.filter(a=>a.patientId===p.id);
    if(state.drawerTab==='appointments') return '<div class="toolbar" style="justify-content:flex-end"><button class="btn primary" data-new-appointment>＋ Nuevo</button></div><div class="table-wrap"><table class="table"><thead><tr><th>Fecha</th><th>Doctor</th><th>Motivo</th><th>Estado</th><th>Comentario</th></tr></thead><tbody>'+(appointments.length?appointments.map(a=>'<tr><td>'+esc(a.date)+' '+esc(a.time)+'</td><td>'+esc(a.doctor)+'</td><td>'+esc(a.treatment)+'</td><td>'+status(a.status)+'</td><td>Silla '+esc(a.chair)+'</td></tr>').join(''):'<tr><td colspan="5"><div class="empty"><strong>No se encontró ninguna cita</strong>Agrega una cita para este paciente.</div></td></tr>')+'</tbody></table></div>';
    if(state.drawerTab==='filiation') return '<div class="form-grid"><label>Nombre<input class="input" value="'+esc(p.name)+'"></label><label>Edad<input class="input" value="'+p.age+'"></label><label>Teléfono<input class="input" value="'+esc(p.phone)+'"></label><label>Correo<input class="input" value="'+esc(p.email)+'"></label><label class="wide">Nota general<textarea class="textarea">'+esc(p.note)+'</textarea></label></div>';
    if(state.drawerTab==='budgets'){const bs=state.budgets.filter(b=>b.patientId===p.id);return '<div class="toolbar" style="justify-content:flex-end"><button class="btn primary" data-toast="Presupuesto creado en modo demo.">＋ Crear presupuesto</button></div><div class="table-wrap"><table class="table"><thead><tr><th>Folio</th><th>Fecha</th><th>Total</th><th>Estado</th></tr></thead><tbody>'+(bs.length?bs.map(b=>'<tr><td>'+b.id+'</td><td>'+b.date+'</td><td>'+money.format(b.total)+'</td><td>'+status(b.status,b.status==='Pendiente'?'warning':'')+'</td></tr>').join(''):'<tr><td colspan="4">Sin presupuestos</td></tr>')+'</tbody></table></div>';}
    const ts=state.tasks.filter(t=>t.patientId===p.id);return '<div class="toolbar" style="justify-content:flex-end"><button class="btn primary" data-toast="Tarea creada en modo demo.">＋ Nueva tarea</button></div><div class="list">'+(ts.length?ts.map(t=>'<div class="list-row"><div class="list-icon">✓</div><div class="list-copy"><strong>'+esc(t.title)+'</strong><span>'+esc(t.status)+'</span></div><button class="btn" data-toast="Tarea marcada como completada.">Completar</button></div>').join(''):'<div class="empty">Sin tareas pendientes</div>')+'</div>';
  }

  function openPatientDrawer(id){
    const p=patient(id);state.drawerTab='appointments';
    const draw=()=>{openModal('Resumen de paciente','<div class="drawer-patient"><div class="avatar">'+initials(p.name)+'</div><div><h2>'+esc(p.name)+'</h2><p>'+p.age+' años · ☎ '+esc(p.phone)+' · '+status(p.status)+'</p></div><div style="margin-left:auto"><button class="btn primary" data-open-history="'+p.id+'">Abrir historial ↗</button></div></div><label style="display:block;color:#657b87;font-size:9px;margin-bottom:5px">Nota general</label><textarea class="textarea">'+esc(p.note)+'</textarea><div class="drawer-tabs">'+[['appointments','Citas'],['filiation','Filiación'],['budgets','Presupuestos'],['tasks','Tareas']].map(x=>'<button data-drawer-tab="'+x[0]+'" data-patient="'+p.id+'" class="'+(state.drawerTab===x[0]?'active':'')+'">'+x[1]+'</button>').join('')+'</div><div class="drawer-content">'+drawerContent(p)+'</div>','',true);};
    draw();state.redrawDrawer=draw;
  }

  function renderHistoryShell(){
    const p=patient(state.historyPatientId);
    return '<section class="patient-history"><aside class="history-sidebar"><section class="patient-profile"><div class="profile-cover"></div><div class="profile-avatar">'+initials(p.name)+'</div><h2>'+esc(p.name)+'</h2><p>'+p.age+' años</p><small>Creado el '+esc(p.created)+'</small><div class="contact-row"><button data-toast="Teléfono: '+esc(p.phone)+'">☎</button><button data-toast="Correo: '+esc(p.email)+'">✉</button><button data-toast="Descarga de expediente simulada.">⋮</button></div></section><nav class="record-nav">'+[['filiation','Filiación'],['history','Historia clínica'],['odontogram','Odontograma'],['perio','Periodontograma'],['ortho','Ortodoncia'],['account','Estado de cuenta'],['prescriptions','Prescripciones'],['files','Archivos']].map(x=>'<button data-record-view="'+x[0]+'" class="'+(state.recordView===x[0]?'active':'')+'"><span>◇</span>'+x[1]+'</button>').join('')+'</nav></aside>'+
      '<section class="history-workspace"><div class="history-strip"><article><b>▮ Etiquetas</b><button data-edit-summary="tags">＋ Editar</button><span>'+esc(p.tags.join(', '))+'</span></article><article><b>▰ Nota general</b><button data-edit-summary="note">Editar</button><span>'+esc(p.note)+'</span></article><article><b>● Alergias</b><button data-edit-summary="allergies">Editar</button><span>'+esc(p.allergies)+'</span></article></div>'+renderRecordView(p)+'</section>'+
      '<aside class="clinical-rail"><div class="rail-box"><h3>Expediente</h3><div class="rail-icon">◔</div><strong>'+esc(p.file)+'</strong></div><div class="rail-box"><h3>Notas de evolución</h3><div class="rail-icon">▤</div><button class="btn primary" data-record-view="history">＋ Registrar evolución</button></div></aside></section>';
  }

  function renderRecordView(p){
    if(state.recordView==='filiation') return '<section class="history-card"><header class="history-card-head"><div><h2>Filiación</h2><p>Datos personales y de contacto del paciente.</p></div><button class="btn primary" data-save-filiation>Guardar cambios</button></header><div class="form-grid"><label>Nombre(s)<input class="input" value="'+esc(p.name.split(' ')[0])+'"></label><label>Apellidos<input class="input" value="'+esc(p.name.split(' ').slice(1).join(' '))+'"></label><label>Fecha de nacimiento<input class="input" type="date" value="1995-03-14"></label><label>Sexo<select class="select"><option>Masculino</option><option>Femenino</option></select></label><label>Teléfono<input class="input" value="'+esc(p.phone)+'"></label><label>Correo<input class="input" value="'+esc(p.email)+'"></label><label>¿Cómo nos conoció?<input class="input" value="Recomendación"></label><label>Tutor / responsable<input class="input" value="'+esc(p.tutor)+'"></label><label class="wide">Antecedentes médicos<textarea class="textarea">Paciente sano. Sin antecedentes relevantes.</textarea></label><label class="wide">Notas de alerta<textarea class="textarea">'+esc(p.allergies)+'</textarea></label></div></section>';

    if(state.recordView==='history') return '<section class="history-card"><header class="history-card-head"><div><h2>Historia clínica</h2><p>Edición demostrativa con versiones en memoria.</p></div><button class="btn primary" data-save-history>Guardar cambios</button></header><div class="form-grid"><label class="wide">Motivo de consulta<textarea class="textarea" id="histMotivo">'+esc(state.history.motivo)+'</textarea></label><label>Alergias<textarea class="textarea" id="histAlergias">'+esc(state.history.alergias)+'</textarea></label><label>Medicamentos actuales<textarea class="textarea" id="histMedicamentos">'+esc(state.history.medicamentos)+'</textarea></label><label class="wide">Antecedentes médicos<textarea class="textarea" id="histMedicos">'+esc(state.history.antecedentesMedicos)+'</textarea></label><label class="wide">Antecedentes odontológicos<textarea class="textarea" id="histOdonto">'+esc(state.history.antecedentesOdontologicos)+'</textarea></label><label class="wide">Diagnóstico general<textarea class="textarea" id="histDiagnostico">'+esc(state.history.diagnostico)+'</textarea></label></div><div class="clinical-columns"><section><h3>Tratamientos</h3><div class="clinical-note"><b>Profilaxis</b><p>Completado · 28 sep 2026</p></div><div class="clinical-note"><b>Restauración pieza 16</b><p>En seguimiento</p></div></section><section><h3>Evolución</h3>'+state.evolutions.map(e=>'<div class="clinical-note"><b>'+esc(e.date)+'</b><p>'+esc(e.text)+'</p></div>').join('')+'<form data-evolution-form style="margin-top:10px"><textarea class="textarea" name="evolution" placeholder="Nueva nota de evolución" required></textarea><button class="btn primary" style="margin-top:8px">Registrar evolución</button></form></section></div></section>';

    if(state.recordView==='odontogram') return renderOdontogram();
    if(state.recordView==='perio') return renderPerio();

    if(state.recordView==='ortho') return '<section class="history-card"><header class="history-card-head"><div><h2>Ortodoncia</h2><p>Diagnóstico, análisis y controles.</p></div><button class="btn primary" data-toast="Control ortodóncico agregado en modo demo.">＋ Nuevo control</button></header><div class="generic-grid"><div class="generic-box"><b>Clase molar</b><strong>Clase I</strong><span>Relación bilateral</span></div><div class="generic-box"><b>Overjet</b><strong>3 mm</strong><span>Dentro de rango demo</span></div><div class="generic-box"><b>Overbite</b><strong>35%</strong><span>Control trimestral</span></div><div class="generic-box"><b>Plan</b><strong>Observación</strong><span>Revalorar en 6 meses</span></div></div></section>';

    if(state.recordView==='account') return '<section class="history-card"><header class="history-card-head"><div><h2>Estado de cuenta</h2><p>Cargos, abonos y planes de pago.</p></div><button class="btn primary" data-toast="Abono registrado en modo demo.">＋ Registrar abono</button></header><div class="kpis" style="padding:16px;margin:0">'+kpi('Total presupuestado','$3,200','Plan preventivo')+kpi('Pagado','$1,600','2 abonos')+kpi('Saldo','$1,600','Pendiente')+kpi('Próximo pago','12 Oct','2026')+'</div><div class="table-wrap"><table class="table"><thead><tr><th>Fecha</th><th>Concepto</th><th>Cargo</th><th>Abono</th><th>Saldo</th></tr></thead><tbody><tr><td>23 sep</td><td>Anticipo plan preventivo</td><td>$3,200</td><td>$800</td><td>$2,400</td></tr><tr><td>28 sep</td><td>Abono</td><td>—</td><td>$800</td><td>$1,600</td></tr></tbody></table></div></section>';

    if(state.recordView==='prescriptions') return '<section class="history-card"><header class="history-card-head"><div><h2>Prescripciones</h2><p>Recetas e indicaciones clínicas.</p></div><button class="btn primary" data-new-prescription>＋ Nueva prescripción</button></header><div class="table-wrap"><table class="table"><thead><tr><th>Fecha</th><th>Producto</th><th>Indicaciones</th><th></th></tr></thead><tbody>'+state.prescriptions.map((r,i)=>'<tr><td>'+esc(r.date)+'</td><td>'+esc(r.name)+'</td><td>'+esc(r.instructions)+'</td><td><button class="btn" data-toast="Receta lista para impresión.">Imprimir</button></td></tr>').join('')+'</tbody></table></div></section>';

    return '<section class="history-card"><header class="history-card-head"><div><h2>Archivos</h2><p>Radiografías, consentimientos y documentos.</p></div><button class="btn primary" data-toast="Selector de archivos simulado.">＋ Subir archivo</button></header><div class="list"><div class="list-row"><div class="list-icon">RX</div><div class="list-copy"><strong>Panorámica · 02 sep 2026</strong><span>DICOM + miniatura</span></div><button class="btn" data-page="rx">Abrir</button></div><div class="list-row"><div class="list-icon">PDF</div><div class="list-copy"><strong>Consentimiento informado</strong><span>Firmado · 02 sep 2026</span></div><button class="btn" data-toast="Descarga PDF simulada.">Descargar</button></div><div class="list-row"><div class="list-icon">PDF</div><div class="list-copy"><strong>Política de cancelaciones</strong><span>Aceptada</span></div><button class="btn" data-toast="Descarga PDF simulada.">Descargar</button></div></div></section>';
  }

  function renderOdontogram(){
    const rows=(ids,lower)=>'<div class="tooth-row">'+ids.map(id=>{const f=state.findings.find(x=>x.tooth===id);return '<button class="tooth '+(f?f.state:'')+' '+(state.selectedTeeth.has(id)?'selected':'')+'" data-tooth="'+id+'" '+(state.odoFinalized?'disabled':'')+'><span class="tooth-num">'+id+'</span><span class="tooth-shape"></span>'+(f?'<i class="finding-mark"></i>':'')+'</button>';}).join('')+'</div>';
    return '<section class="history-card"><div class="odo-tabs"><div>'+[['initial','Odo. inicial'],['evolution','Odo. evolución'],['discharge','Odo. alta']].map(x=>'<button data-odo-stage="'+x[0]+'" class="'+(state.odoStage===x[0]?'active':'')+'">'+x[1]+'</button>').join('')+'</div><div class="odo-legend"><span class="dot-bad">● Mal estado</span><span class="dot-good">● Buen estado</span><button class="btn" data-new-odo> Nueva versión</button><button class="btn danger" data-finalize-odo '+(state.odoFinalized?'disabled':'')+'>Finalizar</button></div></div><div class="odo-controls"><label>Tipo<select class="select"><option>Adulto</option><option>Mixto</option><option>Niño</option></select></label><label>Nomenclatura<select class="select"><option>Internacional (FDI)</option><option>ADA</option></select></label><label style="display:flex;align-items:center;gap:7px;margin-bottom:10px"><input type="checkbox" data-multiselect '+(state.multiSelect?'checked':'')+'> Marcado múltiple</label></div><div class="odo-status"><span>BORRADOR v'+state.odoVersion+' · 23 sep 2026</span><input class="input" value="Observaciones del odontograma" '+(state.odoFinalized?'disabled':'')+'></div><div class="teeth-chart">'+rows(adultUpper,false)+rows(adultLower,true)+'</div>'+(state.multiSelect&&state.selectedTeeth.size?'<div class="toolbar"><button class="btn primary" data-add-finding-selected>Agregar hallazgo a '+[...state.selectedTeeth].join(', ')+'</button><button class="btn" data-clear-teeth>Limpiar selección</button></div>':'')+'<section class="finding-table"><div class="finding-head"><span>N.º diente</span><span>Hallazgo</span><span>Superficie</span><span>Estado</span><span></span></div>'+state.findings.map(f=>'<div class="finding-row"><span>'+f.tooth+'</span><span>'+esc(f.name)+'</span><span>'+esc(f.surface)+'</span><span class="'+f.state+'">'+(f.state==='good'?'Buen estado':'Mal estado')+'</span><button class="btn" data-remove-finding="'+f.id+'" '+(state.odoFinalized?'disabled':'')+'>×</button></div>').join('')+'</section></section>';
  }

  function renderPerio(){
    const teeth=[18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
    const get=(id)=>state.perio[id]||(state.perio[id]={depth:(id%4)+1,margin:0,plaque:id%3===0,bleed:id%5===0,mobility:0,furcation:0,supp:false});
    const values=teeth.map(get);const plaque=Math.round(values.filter(v=>v.plaque).length/values.length*100);const bleed=Math.round(values.filter(v=>v.bleed).length/values.length*100);const avg=(values.reduce((s,v)=>s+Number(v.depth),0)/values.length).toFixed(1);
    return '<section class="history-card"><div class="perio-toolbar"><strong style="font-size:11px">Periodontograma</strong><label style="margin-left:auto;font-size:8px">Cara <select class="select" style="width:130px;height:34px"><option>VESTIBULAR</option><option>PALATINA</option><option>LINGUAL</option></select></label><button class="btn primary" data-save-perio>Guardar</button><button class="btn danger" data-finalize-perio>Finalizar</button></div><div class="perio-summary"><span>Placa <b id="plaquePct">'+plaque+'%</b></span><span>Sangrado <b id="bleedPct">'+bleed+'%</b></span><span>Profundidad media <b id="depthAvg">'+avg+' mm</b></span></div><div class="perio-scroll"><table class="perio-table"><thead><tr><th>Diente</th>'+teeth.map(id=>'<th>'+id+'</th>').join('')+'</tr></thead><tbody>'+
      '<tr><th>Movilidad</th>'+teeth.map(id=>'<td><input type="number" min="0" max="3" data-perio="'+id+'" data-key="mobility" value="'+get(id).mobility+'"></td>').join('')+'</tr>'+
      '<tr><th>Sangrado</th>'+teeth.map(id=>'<td><input type="checkbox" data-perio="'+id+'" data-key="bleed" '+(get(id).bleed?'checked':'')+'></td>').join('')+'</tr>'+
      '<tr><th>Placa</th>'+teeth.map(id=>'<td><input type="checkbox" data-perio="'+id+'" data-key="plaque" '+(get(id).plaque?'checked':'')+'></td>').join('')+'</tr>'+
      '<tr><th>Margen gingival</th>'+teeth.map(id=>'<td><input type="number" min="-15" max="15" data-perio="'+id+'" data-key="margin" value="'+get(id).margin+'"></td>').join('')+'</tr>'+
      '<tr><th>Profundidad</th>'+teeth.map(id=>'<td><input type="number" min="0" max="15" data-perio="'+id+'" data-key="depth" value="'+get(id).depth+'"></td>').join('')+'</tr>'+
      '<tr><th>Furcación</th>'+teeth.map(id=>'<td><input type="number" min="0" max="3" data-perio="'+id+'" data-key="furcation" value="'+get(id).furcation+'"></td>').join('')+'</tr>'+
      '<tr><th>Supuración</th>'+teeth.map(id=>'<td><input type="checkbox" data-perio="'+id+'" data-key="supp" '+(get(id).supp?'checked':'')+'></td>').join('')+'</tr></tbody></table></div><div class="form-grid"><label class="wide">Observaciones<textarea class="textarea">Periodontograma demostrativo. Valores editables sólo durante esta sesión.</textarea></label></div></section>';
  }

  function render(){
    if(state.historyPatientId){app.innerHTML=renderHistoryShell();return;}
    const renderers={home:renderHome,agenda:renderAgenda,patients:renderPatients,operation:renderOperation,treatments:renderTreatments,followups:renderFollowups,inventory:renderInventory,rx:renderRx,finance:renderFinance,reports:renderReports,config:renderConfig};
    app.innerHTML=(renderers[state.page]||renderHome)();
    document.querySelectorAll('[data-agenda-view]').forEach(b=>b.classList.toggle('primary',b.dataset.agendaView===state.agendaView));
    updateCalculator();
  }

  function newAppointment(){
    const options=state.patients.map(p=>'<option value="'+p.id+'">'+esc(p.name)+'</option>').join('');
    openModal('Nueva cita','<form id="appointmentForm"><div class="form-grid"><label>Paciente<select class="select" name="patientId">'+options+'</select></label><label>Fecha<input class="input" name="date" type="date" value="2026-10-03" required></label><label>Hora<input class="input" name="time" type="time" value="10:00" required></label><label>Duración<input class="input" name="minutes" type="number" value="45" min="15"></label><label>Tratamiento<select class="select" name="treatment">'+state.treatments.map(t=>'<option>'+esc(t.name)+'</option>').join('')+'</select></label><label>Silla<select class="select" name="chair"><option>A</option><option>B</option><option>C</option></select></label></div></form>','<button class="btn" data-close-modal>Cancelar</button><button class="btn primary" data-submit-appointment>Guardar cita</button>');
  }

  function newPatient(){
    openModal('Nuevo paciente','<form id="patientForm"><div class="form-grid"><label>Nombre completo<input class="input" name="name" required></label><label>Edad<input class="input" name="age" type="number" min="0" required></label><label>Teléfono<input class="input" name="phone" required></label><label>Correo<input class="input" name="email" type="email"></label><label class="wide">Nota general<textarea class="textarea" name="note"></textarea></label></div></form>','<button class="btn" data-close-modal>Cancelar</button><button class="btn primary" data-submit-patient>Guardar paciente</button>');
  }

  function treatmentModal(id){
    const t=state.treatments.find(x=>x.id===Number(id));
    openModal(t?'Editar tratamiento':'Nuevo tratamiento','<form id="treatmentForm" data-id="'+(t?.id||'')+'"><div class="form-grid"><label>Nombre<input class="input" name="name" value="'+esc(t?.name||'')+'" required></label><label>Categoría<input class="input" name="category" value="'+esc(t?.category||'Preventivo')+'" required></label><label>Duración (min)<input class="input" name="minutes" type="number" value="'+(t?.minutes||30)+'"></label><label>Sesiones sugeridas<input class="input" name="sessions" type="number" value="'+(t?.sessions||1)+'"></label><label>Costo calculado<input class="input" name="cost" type="number" value="'+(t?.cost||0)+'"></label><label>Precio de venta<input class="input" name="price" type="number" value="'+(t?.price||0)+'"></label></div></form>','<button class="btn" data-close-modal>Cancelar</button><button class="btn primary" data-submit-treatment>Guardar</button>');
  }

  function findingModal(teeth){
    openModal('Registrar hallazgo','<p style="font-size:10px;color:#657b87">Diente(s): <b>'+teeth.join(', ')+'</b></p><div class="form-grid"><label>Hallazgo<select class="select" id="findingName"><option>Caries</option><option>Restauración</option><option>Restauración deficiente</option><option>Sellador</option><option>Ausente</option><option>Corona</option></select></label><label>Superficie<select class="select" id="findingSurface"><option>DIENTE</option><option>OCLUSAL</option><option>VESTIBULAR</option><option>PALATINA</option><option>LINGUAL</option><option>MESIAL</option><option>DISTAL</option></select></label><label>Estado<select class="select" id="findingState"><option value="bad">Mal estado</option><option value="good">Buen estado</option></select></label><label class="wide">Nota opcional<input class="input" placeholder="Observaciones"></label></div>','<button class="btn" data-close-modal>Cancelar</button><button class="btn primary" data-save-finding data-teeth="'+teeth.join(',')+'">Guardar hallazgo</button>');
  }

  function globalSearch(){
    const rows=[...state.patients.map(p=>({type:'Paciente',label:p.name,detail:p.file,action:'patient',id:p.id})),{type:'Módulo',label:'Agenda',detail:'Citas y confirmaciones',action:'page',id:'agenda'},{type:'Módulo',label:'Tratamientos',detail:'Catálogo clínico',action:'page',id:'treatments'},{type:'Módulo',label:'Finanzas',detail:'Cuentas por cobrar',action:'page',id:'finance'}];
    openModal('Búsqueda universal','<input class="input" id="globalSearchInput" autofocus placeholder="Buscar paciente o módulo"><div class="list" id="globalSearchResults">'+rows.map(r=>'<button style="width:100%;border:0;background:#fff;text-align:left" class="list-row" data-search-action="'+r.action+'" data-search-id="'+r.id+'" data-search-text="'+esc((r.label+' '+r.detail).toLowerCase())+'"><div class="list-icon">⌕</div><div class="list-copy"><strong>'+esc(r.label)+'</strong><span>'+esc(r.type)+' · '+esc(r.detail)+'</span></div><span>↗</span></button>').join('')+'</div>');
  }

  function globalCreate(){
    openModal('Crear','<div class="layout-3"><button class="btn primary" data-new-appointment>＋ Nueva cita</button><button class="btn" data-new-patient>＋ Nuevo paciente</button><button class="btn" data-new-treatment>＋ Nuevo tratamiento</button><button class="btn" data-toast="Presupuesto preparado en modo demo.">＋ Presupuesto</button><button class="btn" data-toast="Seguimiento preparado en modo demo.">＋ Seguimiento</button><button class="btn" data-toast="Abono preparado en modo demo.">＋ Abono</button></div>');
  }

  function attendance(){
    openModal('Asistencias','<div class="attendance-grid">'+state.appointments.filter(a=>a.date==='2026-10-01').map(a=>'<div class="card" style="padding:14px"><b style="font-size:10px">'+esc(a.time)+' · '+esc(a.patient)+'</b><p style="font-size:8px;color:#718690">'+esc(a.treatment)+'</p><div class="actions"><button class="btn primary" data-toast="Asistencia registrada: llegó.">Llegó</button><button class="btn" data-toast="Asistencia registrada: no asistió.">No asistió</button></div></div>').join('')+'</div>','',true);
  }

  function updateCalculator(){
    const h=document.getElementById('calcHours'), hourly=document.getElementById('calcHourly'), margin=document.getElementById('calcMargin'), mat=document.getElementById('calcMaterials'), other=document.getElementById('calcOther'), out=document.getElementById('calcSuggested');
    if(!h||!out)return;const cost=(+h.value||0)*(+hourly.value||0)+(+mat.value||0)+(+other.value||0);const m=Math.min(.9,(+margin.value||0)/100);out.textContent=money.format(cost/Math.max(.1,1-m));
  }

  function updatePerio(){
    const inputs=[...document.querySelectorAll('[data-perio]')];if(!inputs.length)return;
    inputs.forEach(input=>{const id=Number(input.dataset.perio), key=input.dataset.key;state.perio[id]=state.perio[id]||{};state.perio[id][key]=input.type==='checkbox'?input.checked:Number(input.value||0);});
    const vals=Object.values(state.perio);const plaque=Math.round(vals.filter(v=>v.plaque).length/Math.max(1,vals.length)*100);const bleed=Math.round(vals.filter(v=>v.bleed).length/Math.max(1,vals.length)*100);const avg=vals.reduce((s,v)=>s+Number(v.depth||0),0)/Math.max(1,vals.length);
    const p=document.getElementById('plaquePct'),b=document.getElementById('bleedPct'),d=document.getElementById('depthAvg');if(p)p.textContent=plaque+'%';if(b)b.textContent=bleed+'%';if(d)d.textContent=avg.toFixed(1)+' mm';
  }

  document.addEventListener('click',(e)=>{
    const page=e.target.closest('[data-page]');if(page){e.preventDefault();closeModal();setPage(page.dataset.page);return;}
    if(e.target.closest('[data-close-modal]')||e.target===modal){closeModal();return;}
    const toaster=e.target.closest('[data-toast]');if(toaster){notify(toaster.dataset.toast);return;}
    if(e.target.closest('[data-global-search]')){globalSearch();return;}
    if(e.target.closest('[data-global-create]')){globalCreate();return;}
    if(e.target.closest('[data-new-appointment]')){newAppointment();return;}
    if(e.target.closest('[data-new-patient]')){newPatient();return;}
    if(e.target.closest('[data-new-treatment]')){treatmentModal();return;}
    const editT=e.target.closest('[data-edit-treatment]');if(editT){treatmentModal(editT.dataset.editTreatment);return;}
    const av=e.target.closest('[data-agenda-view]');if(av){state.agendaView=av.dataset.agendaView;render();return;}
    const op=e.target.closest('[data-open-patient]');if(op){openPatientDrawer(op.dataset.openPatient);return;}
    const oh=e.target.closest('[data-open-history]');if(oh){closeModal();state.historyPatientId=Number(oh.dataset.openHistory);state.recordView='odontogram';render();scrollTo({top:42,behavior:'smooth'});return;}
    const dt=e.target.closest('[data-drawer-tab]');if(dt){state.drawerTab=dt.dataset.drawerTab;state.redrawDrawer?.();return;}
    if(e.target.closest('[data-attendance]')){attendance();return;}
    const use=e.target.closest('[data-use-inventory]');if(use){const i=state.inventory.find(x=>x.id===Number(use.dataset.useInventory));if(i&&i.qty>0)i.qty--;notify(i?'Uso registrado: '+i.name:'Insumo no encontrado');render();return;}
    const cf=e.target.closest('[data-complete-followup]');if(cf){const f=state.followups.find(x=>x.id===Number(cf.dataset.completeFollowup));if(f)f.done=true;notify('Seguimiento marcado como completado.');render();return;}
    if(e.target.closest('[data-generate-followup]')){state.followups.push({id:Date.now(),patient:'Arturo Vazquez',type:'Confirmación',when:'17:00',note:'Confirmar próxima cita',done:false});notify('Seguimiento agregado al demo.');render();return;}
    const rx=e.target.closest('[data-rx]');if(rx){state.rxRotation+=Number(rx.dataset.rx);const s=document.getElementById('rxSkull');if(s)s.style.transform='rotate('+state.rxRotation+'deg)';return;}
    if(e.target.closest('[data-rx-reset]')){state.rxRotation=0;const s=document.getElementById('rxSkull');if(s)s.style.transform='rotate(0deg)';return;}
    const ft=e.target.closest('[data-finance-tab]');if(ft){state.financeTab=ft.dataset.financeTab;render();return;}
    const rv=e.target.closest('[data-record-view]');if(rv){state.recordView=rv.dataset.recordView;render();return;}
    const os=e.target.closest('[data-odo-stage]');if(os){state.odoStage=os.dataset.odoStage;render();return;}
    if(e.target.closest('[data-new-odo]')){state.odoVersion++;state.odoFinalized=false;state.findings=[];notify('Nueva versión de odontograma creada en memoria.');render();return;}
    if(e.target.closest('[data-finalize-odo]')){state.odoFinalized=true;notify('Odontograma finalizado en el demo.');render();return;}
    const tooth=e.target.closest('[data-tooth]');if(tooth){const id=Number(tooth.dataset.tooth);if(state.multiSelect){state.selectedTeeth.has(id)?state.selectedTeeth.delete(id):state.selectedTeeth.add(id);render();}else findingModal([id]);return;}
    if(e.target.closest('[data-add-finding-selected]')){findingModal([...state.selectedTeeth]);return;}
    if(e.target.closest('[data-clear-teeth]')){state.selectedTeeth.clear();render();return;}
    const rf=e.target.closest('[data-remove-finding]');if(rf){state.findings=state.findings.filter(f=>f.id!==Number(rf.dataset.removeFinding));notify('Hallazgo eliminado del demo.');render();return;}
    if(e.target.closest('[data-save-perio]')){updatePerio();notify('Periodontograma guardado en memoria.');return;}
    if(e.target.closest('[data-finalize-perio]')){updatePerio();notify('Periodontograma finalizado en el demo.');return;}
    if(e.target.closest('[data-save-filiation]')){notify('Filiación guardada en memoria.');return;}
    if(e.target.closest('[data-save-history]')){state.history.motivo=document.getElementById('histMotivo')?.value||state.history.motivo;state.history.alergias=document.getElementById('histAlergias')?.value||state.history.alergias;state.history.medicamentos=document.getElementById('histMedicamentos')?.value||state.history.medicamentos;state.history.antecedentesMedicos=document.getElementById('histMedicos')?.value||state.history.antecedentesMedicos;state.history.antecedentesOdontologicos=document.getElementById('histOdonto')?.value||state.history.antecedentesOdontologicos;state.history.diagnostico=document.getElementById('histDiagnostico')?.value||state.history.diagnostico;notify('Historia clínica guardada y versionada en memoria.');return;}
    if(e.target.closest('[data-new-prescription]')){openModal('Nueva prescripción','<form id="prescriptionForm"><div class="form-grid"><label>Producto<input class="input" name="name" required></label><label>Indicaciones<input class="input" name="instructions" required></label></div></form>','<button class="btn" data-close-modal>Cancelar</button><button class="btn primary" data-submit-prescription>Guardar</button>');return;}
    const es=e.target.closest('[data-edit-summary]');if(es){const p=patient(state.historyPatientId);const map={tags:['Etiquetas',p.tags.join(', ')],note:['Nota general',p.note],allergies:['Alergias',p.allergies]};const item=map[es.dataset.editSummary];openModal('Editar '+item[0],'<textarea class="textarea" id="summaryValue">'+esc(item[1])+'</textarea>','<button class="btn" data-close-modal>Cancelar</button><button class="btn primary" data-save-summary="'+es.dataset.editSummary+'">Guardar</button>');return;}
    const ss=e.target.closest('[data-save-summary]');if(ss){const p=patient(state.historyPatientId),v=document.getElementById('summaryValue').value;if(ss.dataset.saveSummary==='tags')p.tags=v.split(',').map(x=>x.trim()).filter(Boolean);if(ss.dataset.saveSummary==='note')p.note=v;if(ss.dataset.saveSummary==='allergies')p.allergies=v;closeModal();notify('Resumen clínico actualizado en memoria.');render();return;}
    const searchAction=e.target.closest('[data-search-action]');if(searchAction){closeModal();if(searchAction.dataset.searchAction==='patient'){state.historyPatientId=Number(searchAction.dataset.searchId);state.recordView='odontogram';render();}else setPage(searchAction.dataset.searchId);return;}
  });

  document.addEventListener('change',(e)=>{
    if(e.target.matches('[data-multiselect]')){state.multiSelect=e.target.checked;state.selectedTeeth.clear();render();}
    if(e.target.matches('[data-perio]'))updatePerio();
  });
  document.addEventListener('input',(e)=>{
    if(['calcHours','calcHourly','calcMargin','calcMaterials','calcOther'].includes(e.target.id))updateCalculator();
    if(e.target.id==='patientSearch'){const q=e.target.value.toLowerCase();document.querySelectorAll('[data-patient-row]').forEach(r=>r.hidden=!r.dataset.search.includes(q));}
    if(e.target.id==='treatmentSearch'){const q=e.target.value.toLowerCase();document.querySelectorAll('[data-treatment-row]').forEach(r=>r.hidden=!r.dataset.search.includes(q));}
    if(e.target.id==='inventorySearch'){const q=e.target.value.toLowerCase();document.querySelectorAll('[data-inventory-row]').forEach(r=>r.hidden=!r.dataset.search.includes(q));}
    if(e.target.id==='globalSearchInput'){const q=e.target.value.toLowerCase();document.querySelectorAll('[data-search-text]').forEach(r=>r.hidden=!r.dataset.searchText.includes(q));}
    if(e.target.matches('[data-perio]'))updatePerio();
  });

  document.addEventListener('submit',(e)=>{
    if(e.target.matches('[data-evolution-form]')){e.preventDefault();const val=new FormData(e.target).get('evolution');state.evolutions.push({date:'01 oct 2026',text:String(val)});notify('Evolución registrada en memoria.');render();}
  });

  document.addEventListener('click',(e)=>{
    if(e.target.closest('[data-submit-appointment]')){const f=document.getElementById('appointmentForm');if(!f.reportValidity())return;const d=Object.fromEntries(new FormData(f));const p=patient(d.patientId);state.appointments.push({id:Date.now(),date:d.date,time:d.time,patientId:p.id,patient:p.name,treatment:d.treatment,doctor:'Dra. Samantha',chair:d.chair,status:'Pendiente',minutes:Number(d.minutes)});closeModal();notify('Cita agregada al demo.');render();}
    if(e.target.closest('[data-submit-patient]')){const f=document.getElementById('patientForm');if(!f.reportValidity())return;const d=Object.fromEntries(new FormData(f));const id=Math.max(...state.patients.map(p=>p.id))+1;state.patients.push({id,name:d.name,age:Number(d.age),phone:d.phone,email:d.email||'',status:'Activo',file:'EXP-2026-'+String(id+4).padStart(6,'0'),created:'01 oct 2026',note:d.note||'Sin nota general',allergies:'Sin alergias registradas',tags:['Paciente activo'],last:'—',next:'—',tutor:'—'});closeModal();notify('Paciente agregado al demo.');render();}
    if(e.target.closest('[data-submit-treatment]')){const f=document.getElementById('treatmentForm');if(!f.reportValidity())return;const d=Object.fromEntries(new FormData(f)),id=Number(f.dataset.id);if(id){const t=state.treatments.find(x=>x.id===id);Object.assign(t,{name:d.name,category:d.category,minutes:Number(d.minutes),sessions:Number(d.sessions),cost:Number(d.cost),price:Number(d.price)});}else state.treatments.push({id:Date.now(),name:d.name,category:d.category,minutes:Number(d.minutes),sessions:Number(d.sessions),cost:Number(d.cost),price:Number(d.price),active:true});closeModal();notify('Tratamiento guardado en memoria.');render();}
    const sf=e.target.closest('[data-save-finding]');if(sf){const teeth=sf.dataset.teeth.split(',').map(Number),name=document.getElementById('findingName').value,surface=document.getElementById('findingSurface').value,visual=document.getElementById('findingState').value;teeth.forEach(t=>{state.findings=state.findings.filter(f=>f.tooth!==t);state.findings.push({id:Date.now()+t,tooth:t,name,surface,state:visual});});state.selectedTeeth.clear();closeModal();notify('Hallazgo guardado en el odontograma demo.');render();}
    if(e.target.closest('[data-submit-prescription]')){const f=document.getElementById('prescriptionForm');if(!f.reportValidity())return;const d=Object.fromEntries(new FormData(f));state.prescriptions.unshift({date:'01 oct 2026',name:d.name,instructions:d.instructions});closeModal();notify('Prescripción guardada en memoria.');render();}
  });

  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();globalSearch();}});

  render();
})();