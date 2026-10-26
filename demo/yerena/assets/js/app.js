(() => {
 'use strict';
 const root=document.getElementById('app-content');const modalRoot=document.getElementById('modal-root');const toastEl=document.getElementById('toast');
 const clinicProfessionals=['Dra. Yerena Riso','Profesional 2 · demostración'];
 // Vista diaria de escritorio: última hora visible 23:00–23:59, sin afectar Día móvil ni Semana/Mes.
 const calendarDayStartHour=8,calendarDayLastHour=23,calendarDayHourHeight=66;
 const names={inicio:'Inicio',agenda:'Agenda',pacientes:'Pacientes',recordatorios:'Recordatorios',expedientes:'Expedientes digitales',tratamientos:'Tratamientos',pagos:'Pagos',configuracion:'Configuración',pruebas:'Pruebas'};
 const statusLabels={pending:'Pendiente',confirmed:'Confirmada',in_progress:'Atendiéndose',completed:'Finalizada',cancelled:'Cancelada'};
 const state={view:'inicio',calendarView:'day',date:ymd(new Date()),patients:[],appointments:[],settings:null,reminderCapabilities:null,patientSearch:'',professional:'all',session:null,mode:'demo',calendarStatus:null,dailyAgendaStatus:null,testsStatus:null,doctorPhotoUrl:null,doctorPhotoLoaded:false};
 function ymd(d){const year=d.getFullYear(),month=String(d.getMonth()+1).padStart(2,'0'),day=String(d.getDate()).padStart(2,'0');return `${year}-${month}-${day}`}
 function atDay(date){return new Date(`${date}T12:00:00`)}
 function dateShift(date,n){const d=atDay(date);d.setDate(d.getDate()+n);return ymd(d)}
 function monthShift(date,n){const d=atDay(date);const day=d.getDate();d.setDate(1);d.setMonth(d.getMonth()+n);d.setDate(Math.min(day,new Date(d.getFullYear(),d.getMonth()+1,0).getDate()));return ymd(d)}
 function monthFirst(date){return date.slice(0,7)+'-01'}
 function monthLast(date){const d=atDay(monthFirst(date));return ymd(new Date(d.getFullYear(),d.getMonth()+1,0))}
 function startWeek(date){const d=atDay(date);d.setDate(d.getDate()-((d.getDay()+6)%7));return ymd(d)}
 function prettyDate(date,options={weekday:'long',day:'numeric',month:'long'}){return atDay(date).toLocaleDateString('es-MX',options)}
 function esc(value){return String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]))}
 function minutes(time){const [h,m]=time.slice(0,5).split(':').map(Number);return h*60+m}
 function timeOnly(sql){return String(sql||'').replace('T',' ').slice(11,16)}
 function dateOnly(sql){return String(sql||'').slice(0,10)}
 function eventTime(a){return `${timeOnly(a.start_at)} – ${timeOnly(a.end_at)}`}
 function statusBadge(s){return `<span class="badge badge-${esc(s)}">${esc(statusLabels[s]||s)}</span>`}
 function toast(message){toastEl.textContent=message;toastEl.classList.remove('hidden');clearTimeout(toast.timer);toast.timer=setTimeout(()=>toastEl.classList.add('hidden'),3500)}
 function busy(){root.innerHTML='<div class="loading-state">Actualizando información del consultorio…</div>'}
 function getRelevantAppointments(){return state.appointments.filter(a=>state.professional==='all'||a.professional_name===state.professional)}
 async function loadData(){
  const from=monthFirst(monthShift(state.date,-2));const to=monthLast(monthShift(state.date,2));
  const [p,a,s]=await Promise.all([API.request('/patients'),API.request(`/appointments?from=${from}&to=${to}`),API.request('/settings/reminders')]);
  state.patients=p.patients;state.appointments=a.appointments;state.settings=s.settings;state.mode=s.mode;state.reminderCapabilities=s.capabilities;
  document.getElementById('nav-upcoming').textContent=state.appointments.filter(a=>dateOnly(a.start_at)>=ymd(new Date())&&!['completed','cancelled'].includes(a.status)).length;
 }
 async function refresh(){busy();try{await loadData();render()}catch(e){root.innerHTML=`<div class="panel"><h3>No pudimos cargar la información</h3><p>${esc(e.message)}</p><button class="btn btn-primary" data-action="retry">Reintentar</button></div>`}}
 function pageHeading(eyebrow,title,subtitle,actions=''){return `<div class="page-head"><div><span class="eyebrow">${esc(eyebrow)}</span><h1 class="page-title">${esc(title)}</h1><p class="page-sub">${esc(subtitle)}</p></div>${actions?`<div class="head-actions">${actions}</div>`:''}</div>`}
 function render(){document.getElementById('crumb-view').textContent=names[state.view];document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===state.view));
  root.innerHTML=({inicio:renderDashboard,agenda:renderAgenda,pacientes:renderPatients,recordatorios:renderReminders,expedientes:renderPatients,tratamientos:()=>renderSoon('Tratamientos'),pagos:()=>renderSoon('Pagos'),configuracion:renderConfig,pruebas:renderTests}[state.view])();
   if(state.view==='pacientes'||state.view==='expedientes')hydratePatientPhotos();
   if(state.view==='configuracion' && state.session?.role==='admin' && state.calendarStatus===null)loadCalendarStatus();
   if(state.view==='configuracion' && !state.doctorPhotoLoaded)loadDoctorPhoto();
   if(['configuracion','pruebas'].includes(state.view) && state.session?.role==='admin' && state.dailyAgendaStatus===null)loadDailyAgendaStatus();
   if(state.view==='pruebas' && state.testsStatus===null)loadTestsStatus();
 }
 function renderDashboard(){
  const today=ymd(new Date());const todays=state.appointments.filter(a=>dateOnly(a.start_at)===today&&a.status!=='cancelled').sort((a,b)=>a.start_at.localeCompare(b.start_at));
  const upcoming=todays.filter(a=>!['completed','cancelled'].includes(a.status));const confirmed=todays.filter(a=>a.status==='confirmed');
  const metricData=[['Citas programadas hoy',todays.length,'Agenda del día'],['Pacientes registrados',state.patients.length,'En el consultorio'],['Citas confirmadas',confirmed.length,'Para hoy'],['Por atender',upcoming.length,'Pendientes de atención']];
  return `<div class="welcome-banner"><div><span class="eyebrow">TU ESPACIO, TU CONSULTORIO</span><h2>¡Qué bonito día para <em>sonreír!</em></h2><p>Todo lo que necesitas para cuidar a tus pacientes, en un solo lugar.</p></div><div class="banner-sparkle"><img src="assets/images/sonrisa.svg" alt=""></div></div>
   ${pageHeading('RESUMEN DEL CONSULTORIO','Tu día de un vistazo',`Hoy es ${prettyDate(today)}.`, '<button class="btn btn-primary" data-action="new-appointment">+ Nueva cita</button>')}
   <div class="metrics">${metricData.map((m,i)=>`<div class="metric"><div class="metric-label"><span class="metric-dot"></span>${m[0]}</div><div class="metric-value">${m[1]}</div><div class="metric-caption">${m[2]}</div></div>`).join('')}</div>
   <div class="dashboard-grid"><section class="panel"><div class="panel-head"><h2 class="panel-title">Próximas citas de hoy</h2><button class="link-button" data-action="go-agenda">Ver agenda →</button></div><div class="upcoming-list">${todays.length?todays.slice(0,7).map(a=>`<div class="appointment-line"><span class="time-block">${esc(timeOnly(a.start_at))}</span><div class="appointment-person"><strong>${esc(a.patient_name)}</strong><small>${esc(a.treatment)} · ${esc(a.professional_name)}</small></div>${statusBadge(a.status)}</div>`).join(''):'<div class="empty">No hay citas programadas para hoy. Puedes añadir una desde Agenda.</div>'}</div></section>
   <section class="panel"><div class="panel-head"><h2 class="panel-title">Accesos rápidos</h2><span class="muted" style="font-size:11px">Todo en orden ✦</span></div><div class="quick-items">
    <div class="quick-item"><div class="quick-symbol">▦</div><div><strong>Agendar nueva cita</strong><small>Reserva un espacio para tu paciente</small></div><button data-action="new-appointment" aria-label="Nueva cita">→</button></div>
    <div class="quick-item"><div class="quick-symbol">♡</div><div><strong>Registrar paciente</strong><small>Agrega una ficha en segundos</small></div><button data-action="new-patient" aria-label="Nuevo paciente">→</button></div>
    <div class="quick-item"><div class="quick-symbol">✉</div><div><strong>Recordatorios</strong><small>Configura notificaciones de citas</small></div><button data-action="go-reminders" aria-label="Ver recordatorios">→</button></div>
    </div></section></div>`;
 }
 function toolbar(){
  return `<div class="agenda-toolbar"><div class="toolbar-group"><button class="btn btn-outline" data-action="previous-date" aria-label="Anterior">‹</button><input class="date-control" type="date" id="agenda-date" value="${state.date}" aria-label="Fecha de la agenda"><button class="btn btn-outline" data-action="next-date" aria-label="Siguiente">›</button><button class="btn btn-secondary" data-action="today-date">Hoy</button></div>
   <div class="toolbar-group"><select class="filter-select" id="professional-filter"><option value="all">Todos los profesionales</option>${clinicProfessionals.map(d=>`<option value="${esc(d)}" ${state.professional===d?'selected':''}>${esc(d)}</option>`).join('')}</select><div class="view-switch">${[['day','Día'],['week','Semana'],['month','Mes']].map(([v,label])=>`<button data-calendar-view="${v}" class="${state.calendarView===v?'selected':''}">${label}</button>`).join('')}</div></div></div>`;
 }
 function renderAgenda(){return pageHeading('AGENDA CLÍNICA','Agenda de citas','Consulta la disponibilidad, confirma citas y organiza tus sillones.','<button class="btn btn-primary" data-action="new-appointment">+ Nueva cita</button>')+toolbar()+`<div class="panel agenda-panel"><div class="calendar-scroll calendar-${state.calendarView}"><div class="agenda-desktop-grid">${state.calendarView==='day'?renderDay():state.calendarView==='week'?renderWeek():renderMonth()}</div>${state.calendarView==='day'?renderMobileDay():state.calendarView==='week'?renderMobileWeek():renderMobileMonth()}</div></div>`}
function mobileAppointmentCard(a){
 return '<button type="button" class="mobile-agenda-event status-'+esc(a.status)+'" data-edit-appointment="'+a.id+'"><span class="mobile-agenda-time">'+esc(eventTime(a))+'</span><span class="mobile-agenda-main"><strong>'+esc(a.patient_name)+'</strong><small>'+esc(a.treatment)+' · '+esc(a.professional_name)+'</small></span><span class="mobile-agenda-badge">'+esc(statusLabels[a.status]||'Cita')+'</span></button>';
}
function renderMobileDay(){
 const events=getRelevantAppointments().filter(a=>dateOnly(a.start_at)===state.date&&a.status!=='cancelled').sort((a,b)=>a.start_at.localeCompare(b.start_at));
 return '<section class="mobile-agenda-list" aria-label="Citas del día"><div class="mobile-agenda-list-head"><strong>'+esc(prettyDate(state.date))+'</strong><span>'+events.length+' cita(s)</span></div>'+(events.length?events.map(mobileAppointmentCard).join(''):'<div class="mobile-agenda-empty">No hay citas para esta fecha.</div>')+'</section>';
}
function renderMobileWeek(){
 const monday=startWeek(state.date),events=getRelevantAppointments();
 return '<div class="mobile-agenda-week" aria-label="Semana de citas">'+Array.from({length:7},(_,i)=>{
  const day=dateShift(monday,i),dayAppointments=events.filter(a=>dateOnly(a.start_at)===day&&a.status!=='cancelled').sort((a,b)=>a.start_at.localeCompare(b.start_at));
  return '<section class="mobile-week-day"><header><strong>'+esc(prettyDate(day,{weekday:'long',day:'numeric',month:'short'}))+'</strong><span>'+dayAppointments.length+' citas</span></header>'+(dayAppointments.length?dayAppointments.map(mobileAppointmentCard).join(''):'<p class="mobile-agenda-empty">Sin citas</p>')+'</section>'
 }).join('')+'</div>';
}
 function renderMobileMonth(){
  const first=monthFirst(state.date),monday=startWeek(first),end=monthLast(first);
  const offset=(atDay(first).getDay()+6)%7;
  const weeks=Math.ceil((offset+Number(end.slice(-2)))/7);
  const all=getRelevantAppointments().filter(a=>a.status!=='cancelled');
  const counts=new Map();
  for(const a of all){const d=dateOnly(a.start_at);counts.set(d,(counts.get(d)||0)+1)}
  const headings=['L','M','M','J','V','S','D'].map((d,i)=>'<span aria-label="'+['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'][i]+'">'+d+'</span>').join('');
  return '<section class="mobile-month-wrap" aria-label="Calendario mensual de '+esc(prettyDate(first,{month:'long',year:'numeric'}))+'">'+
   '<div class="mobile-month-weekdays" aria-hidden="true">'+headings+'</div>'+
   '<div class="mobile-month-grid">'+Array.from({length:weeks*7},(_,i)=>{
    const d=dateShift(monday,i),count=counts.get(d)||0;
    return '<button type="button" class="mobile-month-cell '+(d.slice(0,7)!==first.slice(0,7)?'outside ':'')+(d===ymd(new Date())?'is-today ':'')+(d===state.date?'selected':'')+
      '" data-month-day="'+d+'" aria-label="'+esc(prettyDate(d))+'; '+count+' cita(s). Ver citas del día">'+
      '<span class="mobile-month-date">'+Number(d.slice(-2))+'</span>'+
      (count?'<span class="mobile-month-count">'+count+' '+(count===1?'cita':'citas')+'</span>':'<span class="mobile-month-no-events" aria-hidden="true"></span>')+
      '</button>';
   }).join('')+'</div>'+
   '<p class="mobile-month-hint">Toca una fecha para consultar sus citas. Desliza verticalmente para navegar.</p></section>';
 }
 function renderDay(){const doctors=state.professional==='all'?clinicProfessionals:[state.professional];const events=getRelevantAppointments().filter(a=>dateOnly(a.start_at)===state.date&&a.status!=='cancelled');
  const firstMinute=calendarDayStartHour*60,lastMinute=(calendarDayLastHour+1)*60;
  const trackHeight=(calendarDayLastHour-calendarDayStartHour+1)*calendarDayHourHeight;
  const timeLabels=Array.from({length:calendarDayLastHour-calendarDayStartHour+1},(_,i)=>`<span style="top:${i*calendarDayHourHeight}px">${String(i+calendarDayStartHour).padStart(2,'0')}:00</span>`).join('');
  return `<div class="calendar-header" style="--cols:${doctors.length}"><div></div>${doctors.map(d=>`<div class="dentist-head"><strong>${esc(d)}</strong><small>Sillón / Agenda</small></div>`).join('')}</div><div class="day-body" style="--cols:${doctors.length};--day-height:${trackHeight}px"><div class="timeline-labels">${timeLabels}</div>${doctors.map(d=>`<div class="day-track">${events.filter(a=>a.professional_name===d).map(a=>{
   const start=minutes(timeOnly(a.start_at)),end=minutes(timeOnly(a.end_at));if(start<firstMinute||start>=lastMinute)return '';
   const top=(start-firstMinute)*calendarDayHourHeight/60;
   const height=Math.max(4,Math.min(Math.max((end-start)*calendarDayHourHeight/60-4,42),trackHeight-top-4));
   return `<button class="event-block status-${esc(a.status)}" data-edit-appointment="${a.id}" style="top:${top}px;height:${height}px" title="${esc(a.patient_name)}"><span class="event-time">${esc(eventTime(a))}</span><span class="event-name">${esc(a.patient_name)}</span><span class="event-extra">${esc(a.treatment)}</span>${height>69?`<span class="event-chip">${esc(statusLabels[a.status])} · ${esc(a.resource)}</span>`:''}</button>`;
  }).join('')}</div>`).join('')}</div>`}
 function renderWeek(){const monday=startWeek(state.date),events=getRelevantAppointments();return `<div class="week-grid">${Array.from({length:7},(_,i)=>{const d=dateShift(monday,i),arr=events.filter(a=>dateOnly(a.start_at)===d&&a.status!=='cancelled').sort((a,b)=>a.start_at.localeCompare(b.start_at));return `<section class="week-day"><div class="week-day-head">${esc(prettyDate(d,{weekday:'short',day:'numeric'}))}<small>${arr.length} citas</small></div>${arr.map(a=>`<button class="week-appt" data-edit-appointment="${a.id}"><strong>${esc(timeOnly(a.start_at))} · ${esc(a.patient_name)}</strong>${esc(a.treatment)}</button>`).join('')}</section>`}).join('')}</div>`}
 function renderMonth(){const first=monthFirst(state.date),monday=startWeek(first),all=getRelevantAppointments();return `<div class="month-grid">${Array.from({length:42},(_,i)=>{const day=dateShift(monday,i),arr=all.filter(a=>dateOnly(a.start_at)===day&&a.status!=='cancelled');return `<div class="month-day ${day.slice(0,7)!==first.slice(0,7)?'outside':''}"><div class="month-day-head">${esc(prettyDate(day,{weekday:'short'}))} ${day.slice(-2)}</div>${arr.slice(0,3).map(a=>`<button class="month-appt" data-edit-appointment="${a.id}">${esc(timeOnly(a.start_at))} ${esc(a.patient_name)}</button>`).join('')}${arr.length>3?`<small>+${arr.length-3} citas</small>`:''}</div>`}).join('')}</div>`}
 function renderPatients(){
 const q=state.patientSearch.toLowerCase();
 const ps=state.patients.filter(p=>`${p.first_name} ${p.last_name} ${p.phone||''} ${p.email||''}`.toLowerCase().includes(q));
 return pageHeading('NUESTROS PACIENTES',state.view==='expedientes'?'Expedientes digitales':'Pacientes',state.view==='expedientes'?'Consulta un paciente mediante Detalles para abrir su historial clínico.':'Registra personas y fotografías de perfil con acceso privado.',state.view==='pacientes'?'<button class="btn btn-primary" data-action="new-patient">+ Nuevo paciente</button>':'')+
 `<section class="panel"><div class="panel-head"><h2 class="panel-title">Directorio de pacientes <small class="muted" style="font:normal 11px var(--font)">(${ps.length})</small></h2><input id="patient-search" class="search-input" placeholder="Buscar nombre, teléfono o correo" value="${esc(state.patientSearch)}"></div><div class="table-scroll patient-desktop-table"><table class="data-table"><thead><tr><th>Paciente</th><th>Teléfono</th><th>Correo</th><th>WhatsApp</th><th>Detalles</th></tr></thead><tbody>${ps.map(p=>`<tr><td><div class="patient-cell"><span class="patient-avatar" ${p.has_photo?`data-photo-id="${p.id}"`:''}>${esc(p.first_name.slice(0,1)+p.last_name.slice(0,1))}</span><strong>${esc(p.first_name+' '+p.last_name)}</strong></div></td><td>${esc(p.phone||'—')}</td><td>${esc(p.email||'—')}</td><td>${p.whatsapp_opt_in?'Autorizado':'Sin consentimiento'}</td><td><button type="button" class="btn btn-secondary patient-detail-trigger" data-action="patient-details" data-patient-id="${p.id}">Detalles →</button></td></tr>`).join('')}</tbody></table></div>${ps.length?'':'<div class="empty">Sin pacientes para mostrar.</div>'}<div class="patient-mobile-list">${ps.map(p=>`<button type="button" class="patient-mobile-row" data-action="patient-details" data-patient-id="${p.id}" aria-label="Abrir detalles de ${esc(p.first_name+' '+p.last_name)}"><span class="patient-avatar" ${p.has_photo?`data-photo-id="${p.id}"`:''}>${esc(p.first_name.slice(0,1)+p.last_name.slice(0,1))}</span><span class="patient-mobile-info"><strong>${esc(p.first_name+' '+p.last_name)}</strong><small>${esc(p.phone||p.email||'Sin contacto')}</small></span><span class="patient-mobile-chevron" aria-hidden="true">›</span></button>`).join('')}</div></section>`;
}
 function patientAge(value){
 if(!value)return 'Edad no registrada';
 const birth=new Date(String(value).slice(0,10)+'T12:00:00'),today=new Date();
 if(Number.isNaN(birth.getTime())||birth>today)return 'Edad no registrada';
 let age=today.getFullYear()-birth.getFullYear();
 if(today.getMonth()<birth.getMonth()||(today.getMonth()===birth.getMonth()&&today.getDate()<birth.getDate()))age--;
 return age>=0?age+' años':'Edad no registrada';
}
async function showPatientDetails(patientId){
 const id=Number(patientId);if(!Number.isSafeInteger(id)||id<=0)return;
 modalRoot.classList.add('patient-drawer-root');
 modalRoot.innerHTML="<aside class='patient-drawer' role='dialog' aria-modal='true' aria-label='Detalles del paciente'><p class='muted'>Cargando paciente…</p></aside>";
 modalRoot.classList.remove('hidden');
 try{
  const payload=await API.request('/patients/'+id+'/details'),p=payload.patient,appointments=payload.appointments;
  const name=esc(p.first_name+' '+p.last_name);
  const photo="<span class='patient-drawer-avatar' data-drawer-photo='"+id+"'>"+esc(p.first_name[0]+p.last_name[0])+"</span>";
  const rows=appointments.length?appointments.map(a=>"<article class='patient-upcoming-card'><div class='patient-upcoming-date'>"+esc(prettyDate(dateOnly(a.start_at),{day:'numeric',month:'short',year:'numeric'}))+"<strong>"+esc(timeOnly(a.start_at))+"</strong></div><div class='patient-upcoming-info'><strong>"+esc(a.treatment)+"</strong><small>"+esc(a.professional_name)+"</small>"+statusBadge(a.status)+"</div></article>").join(''):"<div class='patient-upcoming-empty'>Todavía no hay citas próximas para este paciente.</div>";
  const clinical=['admin','asistente'].includes(state.session?.role);
  modalRoot.innerHTML="<aside class='patient-drawer' role='dialog' aria-modal='true' aria-labelledby='patient-drawer-name'><header class='patient-drawer-header'><button type='button' data-action='close-modal' class='patient-drawer-close' aria-label='Cerrar detalles'>×</button>"+photo+"<div class='patient-drawer-identity'><span class='eyebrow'>PERFIL DEL PACIENTE</span><h2 id='patient-drawer-name'>"+name+"</h2><div class='patient-drawer-meta'><span>"+esc(patientAge(p.birth_date))+"</span><span>"+esc(p.phone||'Sin teléfono')+"</span></div><span class='patient-drawer-hint'>"+esc(p.email||'Sin correo registrado')+"</span></div></header><div class='patient-drawer-main'><div class='patient-drawer-section-header'><div><span class='eyebrow'>AGENDA PERSONAL</span><h3>Citas próximas</h3></div><span class='badge badge-confirmed'>"+appointments.length+"</span></div><div class='patient-upcoming-list'>"+rows+"</div></div><footer class='patient-drawer-footer'>"+(clinical?"<button type='button' class='btn btn-primary' data-action='open-clinical-history' data-patient-id='"+id+"'>Abrir historial clínico ↗</button>":"<span class='muted'>Expediente reservado al personal clínico autorizado.</span>")+"<button type='button' class='btn btn-outline' data-action='edit-patient' data-patient-id='"+id+"'>Editar datos</button>"+(state.session?.role==='admin'?"<button type='button' class='btn btn-outline patient-archive-btn' data-action='delete-patient' data-patient-id='"+id+"'>Eliminar paciente</button>":'')+"<button type='button' class='btn btn-outline' data-action='close-modal'>Cerrar</button></footer></aside>";
  const span=modalRoot.querySelector('[data-drawer-photo]');
  if(p.has_photo&&span){let url=photoCache.get(String(id));if(!url){try{const blob=await API.photo(id);url=URL.createObjectURL(blob);photoCache.set(String(id),url)}catch{}}if(url&&span.isConnected){span.textContent='';const img=document.createElement('img');img.src=url;img.alt='Fotografía del paciente';span.append(img)}}
  modalRoot.querySelector('.patient-drawer-close')?.focus();
 }catch(err){closeModal();toast(err.message)}
}

 const DEFAULT_REMINDER_MESSAGE='Hola {paciente} 🌷\n\nTe recordamos tu cita dental:\n\n📅 {fecha}\n🕘 {hora}\n🦷 {profesional}\n📍 {ubicacion}\n\n¡Te esperamos con una sonrisa! ♡';
 function reminderPreview(settings,appt){
  const address=String(settings.clinic_address||'').trim(),userUrl=String(settings.clinic_maps_url||'').trim();
  const url=address?(userUrl||'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(address)):'';
  const values={paciente:appt?.patient_name||'María Fernández',fecha:appt?prettyDate(dateOnly(appt.start_at)):'viernes 16 de octubre',hora:appt?timeOnly(appt.start_at):'10:00',profesional:appt?.professional_name||'Dra. Yerena Riso',consultorio:settings.clinic_name||'Dra. Yerena Riso',direccion:address,ubicacion:'Ver ubicación'};
  return esc(settings.message_template||DEFAULT_REMINDER_MESSAGE).replace(/\{(paciente|fecha|hora|profesional|consultorio|direccion|ubicacion)\}/g,(_,key)=>key==='ubicacion'?(url?'<a class="preview-map-link" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">Ver ubicación ↗</a>':'Ubicación por configurar'):esc(values[key]||'')).replace(/\n/g,'<br>');
 }
 function updateReminderPreview(form){
  const preview=root.querySelector('#reminder-preview-body');if(!preview)return;
  const values=Object.fromEntries(new FormData(form).entries());
  const appointment=state.appointments.find(a=>dateOnly(a.start_at)>=ymd(new Date())&&a.status!=='cancelled');
  preview.innerHTML=reminderPreview({...state.settings,...values},appointment);
 }

 function renderReminders(){const s=state.settings||{email_enabled:false,whatsapp_enabled:false,days_before:[1],hours_before:[1],send_hour:9};const future=state.appointments.find(a=>dateOnly(a.start_at)>=ymd(new Date())&&a.status!=='cancelled');
  return pageHeading('COMUNICACIÓN CON PACIENTES','Recordatorios automáticos','Mantén a tus pacientes informados antes de cada consulta.')+`<div class="reminder-layout"><section class="panel"><div class="panel-head"><h2 class="panel-title">Preferencias de envío</h2><span class="badge badge-confirmed">Configuración</span></div>
   <form id="reminder-form"><div class="setting-row"><div><strong>Correo electrónico</strong><small>Enviar mensajes por correo cuando haya SMTP configurado</small></div><label class="switch"><input type="checkbox" name="email_enabled" ${s.email_enabled?'checked':''}><span></span></label></div>
   <div class="setting-row"><div><strong>WhatsApp Business</strong><small>Requiere Meta Cloud API y plantillas aprobadas</small></div><label class="switch"><input type="checkbox" name="whatsapp_enabled" ${s.whatsapp_enabled?'checked':''}><span></span></label></div>
   <div class="section-kicker">Recordar con días de anticipación</div><div class="check-days">${[1,2,3].map(n=>`<label><input type="checkbox" name="days" value="${n}" ${(s.days_before||[]).includes(n)?'checked':''}> ${n} día${n>1?'s':''} antes</label>`).join('')}</div><div class="section-kicker">Y también unas horas antes</div><div class="check-days">${[1,2,3].map(n=>`<label><input type="checkbox" name="hours" value="${n}" ${(s.hours_before||[]).includes(n)?'checked':''}> ${n} hora${n>1?'s':''} antes</label>`).join('')}</div>
   <div class="form-grid"><div class="field"><label for="send-hour">Hora del envío</label><select name="send_hour" id="send-hour">${[8,9,10,11,12,13,14,15,16,17].map(h=>`<option value="${h}" ${s.send_hour===h?'selected':''}>${String(h).padStart(2,'0')}:00</option>`).join('')}</select></div><div class="field"><label for="clinic-name">Nombre del consultorio</label><input id="clinic-name" name="clinic_name" value="${esc(s.clinic_name||'Dra. Yerena Riso')}" maxlength="100" required></div><div class="field span-two"><label for="clinic-address">Dirección del consultorio</label><input id="clinic-address" name="clinic_address" value="${esc(s.clinic_address||'')}" placeholder="Calle, número, colonia, ciudad" maxlength="180"></div><div class="field span-two"><label for="clinic-maps">Enlace de ubicación en Google Maps (opcional)</label><input id="clinic-maps" name="clinic_maps_url" type="url" value="${esc(s.clinic_maps_url||'')}" placeholder="https://maps.app.goo.gl/…" maxlength="2048"><small>El texto del mensaje mostrará «Ver ubicación» como enlace, sin una URL larga. Si no agregas enlace, se buscará la dirección en Google Maps.</small></div><div class="field span-two"><div class="reminder-editor-head"><label for="reminder-template">Personaliza el mensaje de recordatorio</label><button class="btn btn-outline" type="button" data-action="reset-reminder-template">Restablecer mensaje</button></div><textarea id="reminder-template" name="message_template" rows="10" maxlength="2000" required>${esc(s.message_template||DEFAULT_REMINDER_MESSAGE)}</textarea></div></div>
   <div class="modal-actions"><button class="btn btn-outline" type="button" data-action="reminder-logs">Ver historial de envíos</button><button class="btn btn-primary" type="submit">Guardar preferencias</button></div></form></section>
   <aside class="reminder-preview"><span class="preview-label">✦ Vista previa del mensaje personalizado</span><div class="phone-frame"><div class="phone-top">● Dra. Yerena Riso</div><div class="phone-msg" id="reminder-preview-body">${reminderPreview(s,future)}</div><div class="phone-compose" aria-hidden="true"><span>Mensaje</span><span class="phone-send-dot">➤</span></div><span class="phone-home-indicator" aria-hidden="true"></span></div></aside></div>`}

 async function readSelectedPhoto(file){
  if(!file)return null;
  if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>1048576||file.size<20)throw new Error('Selecciona una fotografía JPG, PNG o WEBP de máximo 1 MB.');
  return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=()=>reject(new Error('No se pudo leer la fotografía.'));reader.readAsDataURL(file)});
 }
 async function loadDoctorPhoto(){
  state.doctorPhotoLoaded=true;
  try{const blob=await API.doctorPhoto();if(state.doctorPhotoUrl)URL.revokeObjectURL(state.doctorPhotoUrl);state.doctorPhotoUrl=blob?URL.createObjectURL(blob):null}
  catch(err){state.doctorPhotoLoaded=false;toast(err.message);return}
  if(state.view==='configuracion'){const card=document.getElementById('doctor-photo-display');if(card){card.innerHTML=state.doctorPhotoUrl?'<img src="'+state.doctorPhotoUrl+'" alt="Fotografía de la Dra. Yerena Riso">':'<span aria-hidden="true">YR</span>';const btn=document.querySelector('[for="doctor-photo-input"]');if(btn)btn.textContent=state.doctorPhotoUrl?'✦ Cambiar fotografía':'✦ Subir fotografía';const remove=document.querySelector('[data-action="remove-doctor-photo"]');if(remove)remove.disabled=!state.doctorPhotoUrl}}
 }

 function renderAccountSettings(){
 const email=esc(state.session?.email||'Correo no disponible');
 const admin=state.session?.role==='admin';
 return `<section class="panel account-settings-panel" aria-labelledby="account-settings-title">
  <div class="panel-head account-head">
   <div><span class="soon-tag">Acceso personal</span><h2 id="account-settings-title" class="panel-title">Mi cuenta y seguridad</h2><p class="account-description">Administra el acceso a tu consultorio desde un solo lugar.</p></div>
   <span class="account-lock" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/><circle cx="12" cy="15.5" r="1"/></svg></span>
  </div>
  <div class="account-management-layout">
   <div class="account-email-panel">
    <label id="account-email-label">Correo electrónico de acceso</label>
    <div class="account-email-value" aria-labelledby="account-email-label">${email}</div>
    <p>Correo vinculado a tu cuenta.</p>
   </div>
   <div class="account-actions-panel">
    <div class="account-actions-heading"><h3>Acciones de seguridad</h3><p>Controla tus credenciales con acceso protegido.</p></div>
    <div class="account-action-buttons">
     <button class="btn btn-primary" type="button" data-action="open-password-modal"><svg class="account-button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 3 6.8 9.2a4.5 4.5 0 1 0 6 6L19 9l2 2"/><path d="m15.5 6.5 2 2"/></svg> Cambiar contraseña</button>
     ${admin?'<button class="btn btn-outline account-create-user" type="button" data-action="open-user-modal"><svg class="account-button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M19 10v8M15 14h8"/></svg> Nuevo usuario</button>':''}
    </div>
   </div>
  </div>
 </section>`;
}
function accountPasswordField(label,id,name,autocomplete,min=1){
 return `<div class="field"><label for="${id}">${label}</label><div class="account-password-control"><input id="${id}" name="${name}" type="password" autocomplete="${autocomplete}" minlength="${min}" maxlength="128" required><button type="button" data-action="toggle-account-password" data-target="${id}" aria-label="Mostrar ${label.toLowerCase()}" aria-pressed="false">Mostrar</button></div></div>`;
}
function openPasswordModal(){
 const email=esc(state.session?.email||'');
 showModal('Cambiar contraseña',`<div class="security-modal-intro"><div class="security-modal-email"><span>Correo de la cuenta</span><strong>${email}</strong></div><p>Para proteger tu cuenta, confirma tu contraseña actual antes de establecer una nueva.</p></div>
  <form id="account-password-form" class="security-modal-form" autocomplete="on">
   ${accountPasswordField('Contraseña actual','account-current-password','current_password','current-password')}
   ${accountPasswordField('Nueva contraseña','account-new-password','new_password','new-password',12)}
   ${accountPasswordField('Confirmar nueva contraseña','account-confirm-password','confirm_password','new-password',12)}
   <small>La nueva contraseña debe contener al menos 12 caracteres. Después deberás iniciar sesión nuevamente.</small>
   <div class="modal-actions"><button type="button" class="btn btn-outline" data-action="close-modal">Cancelar</button><button type="submit" class="btn btn-primary">Actualizar contraseña</button></div>
  </form>`);
}
function openNewUserModal(){
 if(state.session?.role!=='admin')return;
 showModal('Nuevo usuario',`<div class="security-modal-intro"><p>Da acceso al consultorio a un integrante del equipo. La nueva cuenta tendrá el rol inicial de <strong>Recepción</strong>, sin permisos de administración.</p></div>
  <form id="account-user-form" class="security-modal-form" autocomplete="off">
   <div class="field"><label for="new-user-email">Correo electrónico</label><input type="email" id="new-user-email" name="email" placeholder="usuario@consultorio.com" autocomplete="off" maxlength="180" required></div>
   ${accountPasswordField('Contraseña de acceso','new-user-password','password','new-password',12)}
   ${accountPasswordField('Confirmar contraseña','new-user-confirm','confirm_password','new-password',12)}
   <small>Mínimo 12 caracteres. Comparte las credenciales con la persona autorizada mediante un canal seguro. No se enviarán por correo automáticamente.</small>
   <div class="modal-actions"><button type="button" class="btn btn-outline" data-action="close-modal">Cancelar</button><button type="submit" class="btn btn-primary">Crear usuario</button></div>
  </form>`);
}

 function renderConfig(){
 return pageHeading('AJUSTES DEL SISTEMA','Configuración','Personaliza el consultorio y administra las integraciones.')+
 `<div class="soon"><div class="soon-card doctor-profile-card"><span class="soon-tag">Perfil de la doctora</span><div class="doctor-profile-content"><div class="doctor-profile-photo" id="doctor-photo-display">${state.doctorPhotoUrl?'<img src="'+state.doctorPhotoUrl+'" alt="Fotografía de la Dra. Yerena Riso">':'<span aria-hidden="true">YR</span>'}</div><div class="doctor-profile-copy"><h3>Dra. Yerena Riso</h3><p>Fotografía oficial del consultorio, guardada de manera privada.</p><div class="doctor-profile-actions">${state.session?.role==='admin'?'<input type="file" class="visually-hidden-upload" id="doctor-photo-input" accept="image/jpeg,image/png,image/webp" aria-label="Seleccionar foto de la doctora"><label for="doctor-photo-input" class="photo-pick-btn">✦ '+(state.doctorPhotoUrl?'Cambiar fotografía':'Subir fotografía')+'</label><button type="button" class="btn btn-outline" data-action="remove-doctor-photo" '+(state.doctorPhotoUrl?'':'disabled')+'>Quitar foto</button>':''}</div></div></div></div><div class="soon-card"><span class="soon-tag">Integraciones</span><h3>Correo y WhatsApp</h3><p>Los recordatorios requieren credenciales, consentimiento y configuración del proveedor.</p><button class="btn btn-secondary" data-action="go-reminders">Configurar recordatorios →</button></div></div>`+renderAccountSettings()+
 (state.session?.role==='admin'?'<section class="panel calendar-integration"><div class="panel-head"><h2 class="panel-title">Google Calendar</h2><span class="badge badge-confirmed">Integración segura</span></div><div id="calendar-status">'+(state.calendarStatus===null?'Consultando conexión…':calendarStatusMarkup())+'</div></section><section class="panel calendar-integration daily-agenda-panel"><div class="panel-head"><h2 class="panel-title">Resumen diario de citas por correo</h2><span class="badge badge-confirmed">Exclusivo del consultorio</span></div><div id="daily-agenda-status">'+(state.dailyAgendaStatus===null?'Consultando programación…':dailyAgendaStatusMarkup())+'</div></section>':'');
}

 function dailyAgendaStatusMarkup(){
  const data=state.dailyAgendaStatus;
  if(!data)return '<p class="muted">Consultando programación…</p>';
  const recipients=(data.recipientEmails||[]).map(esc).join(', ')||'Ningún correo configurado';
  const recent=(data.logs||[]).slice(0,5).map(l=>'<div class="daily-agenda-log"><span>'+esc(String(l.agenda_date).slice(0,10))+' · '+esc(l.recipient)+'</span><strong>'+esc(l.status)+'</strong></div>').join('');
  return '<div class="daily-agenda-grid"><div><p>Recibe todas las citas activas del día en un correo pastel, con horario, paciente, profesional, servicio y estado.</p>'+
   '<p><strong>Horario:</strong> '+esc(data.sendTime)+' · '+esc(data.timezone)+'</p>'+
   '<p><strong>Destinatarios:</strong> '+recipients+'</p>'+
   '<p><strong>Envíos automáticos:</strong> '+(data.enabled?'Activados':'Desactivados')+' · <strong>SMTP:</strong> '+(data.smtpConfigured?'Configurado':'Sin configurar')+'</p>'+
   '<p><strong>WhatsApp interno:</strong> '+(data.whatsappEnabled?'Activado':'Desactivado')+' · '+(data.whatsappRecipientCount||0)+' destinatario(s) · <strong>Meta:</strong> '+(data.whatsappConfigured?'Configurado':'Sin configurar')+'</p>'+
   '<p><strong>Formato WhatsApp:</strong> '+(data.whatsappVisualEnabled?'Tarjeta visual pastel · '+esc(data.whatsappVisualTemplate||''):'Mensaje de texto')+'</p>'+
   '<small class="muted">Gestiona las pruebas desde Administración → Pruebas. Para los envíos automáticos configura DAILY_AGENDA_ENABLED, DAILY_AGENDA_EMAILS, DAILY_AGENDA_WHATSAPP_NUMBERS y DAILY_AGENDA_TIME en Hostinger.</small></div>'+
   '<div class="daily-agenda-history"><strong>Últimos envíos programados</strong>'+(recent||'<p class="muted">Todavía no hay envíos diarios registrados.</p>')+'</div></div>';
 }
 async function loadDailyAgendaStatus(){
  try{state.dailyAgendaStatus=await API.request('/settings/daily-agenda');const el=document.getElementById('daily-agenda-status');if(el)el.innerHTML=dailyAgendaStatusMarkup()}
  catch(err){const el=document.getElementById('daily-agenda-status');if(el)el.textContent='No pudimos consultar el resumen diario: '+err.message}
 }

 function testLogsButton(kind,label='Ver logs'){
  return '<button type="button" class="btn btn-outline test-log-button" data-action="view-test-logs" data-test-kind="'+kind+'" aria-label="Consultar logs de '+kind+'">'+label+'</button>';
 }
 function renderTests(){
 if(state.session?.role!=='admin')return pageHeading('ACCESO RESTRINGIDO','Pruebas','Solo administración puede realizar envíos de prueba.');
 const status=state.testsStatus;
 const helloTestMode=Boolean(status?.helloWorldTestMode);
 const selected=state.patients.find(p=>String(p.id)===String(state.testPatientId||state.patients[0]?.id));
 const emailSelected=state.patients.find(p=>String(p.id)===String(state.testEmailPatientId||state.patients[0]?.id));
 const options=patient=>state.patients.map(p=>'<option value="'+p.id+'" '+(patient?.id===p.id?'selected':'')+'>'+esc(p.first_name+' '+p.last_name)+'</option>').join('');
 return pageHeading('ADMINISTRACIÓN','Pruebas','Comprueba los envíos reales y consulta los errores por proveedor y variable de entorno.')+
 '<div class="tests-layout"><section class="panel test-card"><div class="panel-head"><h2 class="panel-title">Agenda diaria · correo</h2><span class="badge badge-confirmed">Datos ficticios</span></div>'+
 '<p class="muted">Comprueba el diseño diario enviado al personal por SMTP, sin esperar a las 7:00 a. m.</p>'+
 '<div class="test-actions"><button class="btn btn-primary" data-action="daily-agenda-test">Enviar ejemplo de prueba</button>'+testLogsButton('daily_email')+'</div></section>'+
 '<section class="panel test-card"><div class="panel-head"><h2 class="panel-title">Agenda diaria · WhatsApp</h2><span class="badge badge-confirmed">Personal interno</span></div>'+
 '<p class="muted">Envía una agenda ficticia a los números internos de DAILY_AGENDA_WHATSAPP_NUMBERS mediante plantilla Meta aprobada.</p>'+
 '<div class="test-actions"><button class="btn btn-primary" data-action="daily-whatsapp-test">Probar resumen WhatsApp</button>'+testLogsButton('daily_whatsapp')+'</div></section>'+
 '<section class="panel test-card"><div class="panel-head"><h2 class="panel-title">Recordatorio WhatsApp a paciente</h2><span class="badge badge-confirmed">Envío real</span></div>'+
 '<p class="muted">'+(helloTestMode?'Modo temporal hello_world: se enviará un saludo en inglés sin nombre, fecha ni hora. Los recordatorios automáticos por WhatsApp están suspendidos.':'Paciente con consentimiento y próxima cita para el recordatorio; hello_world verifica solamente la conexión.')+'</p>'+
 '<label for="test-patient-select">Paciente</label><select id="test-patient-select" class="filter-select" autocomplete="off">'+options(selected)+'</select>'+
 '<div class="test-patient-contact"><span>WhatsApp registrado</span><strong id="test-patient-number">'+esc(selected?.phone||'Sin teléfono')+'</strong><small id="test-patient-consent">'+(selected?.whatsapp_opt_in?'Consentimiento guardado':'Sin consentimiento WhatsApp')+'</small></div>'+
 '<div class="test-actions"><button class="btn btn-primary" data-action="test-patient-whatsapp" '+(selected?.whatsapp_opt_in&&selected?.phone?'':'disabled')+'> '+(helloTestMode?'Enviar hello_world de prueba':'Enviar recordatorio de prueba')+'</button>'+testLogsButton('patient_whatsapp')+'</div>'+
 '<div class="test-actions"><button class="btn btn-outline" data-action="test-hello-world" '+(selected?.whatsapp_opt_in&&selected?.phone?'':'disabled')+'>Probar conexión (hello_world)</button>'+testLogsButton('hello_world','Logs hello_world')+'</div>'+
 '<p class="muted">hello_world: plantilla oficial de Meta en inglés, sin datos clínicos. En el emisor de prueba registra primero este número como destinatario autorizado.</p></section>'+
 '<section class="panel test-card"><div class="panel-head"><h2 class="panel-title">Recordatorio de cita · correo</h2><span class="badge badge-confirmed">SMTP real</span></div>'+
 '<p class="muted">Envía al correo guardado del paciente el recordatorio de su próxima cita, con el mismo formato que el envío automático. Requiere que el correo también esté en la cita.</p>'+
 '<label for="test-email-patient-select">Paciente</label><select id="test-email-patient-select" class="filter-select">'+options(emailSelected)+'</select>'+
 '<div class="test-patient-contact"><span>Correo electrónico</span><strong id="test-email-patient-address">'+esc(emailSelected?.email||'Sin correo')+'</strong><small>Se requiere próxima cita con correo coincidente.</small></div>'+
 '<div class="test-actions"><button class="btn btn-primary" data-action="test-patient-email" '+(emailSelected?.email?'':'disabled')+'>Enviar recordatorio por correo</button>'+testLogsButton('patient_email')+'</div></section>'+
 '<section class="panel test-card"><div class="panel-head"><h2 class="panel-title">Diagnóstico de programación</h2><span class="badge badge-confirmed">Solo administrador</span></div><div id="tests-status">'+(status?testsStatusMarkup(status):'<p class="muted">Consultando la configuración…</p>')+'</div>'+
 '<div class="test-actions"><button class="btn btn-outline" data-action="tests-refresh">Actualizar diagnóstico</button><button class="btn btn-outline" data-action="reminder-diagnostics">Comprobar conexión</button><button class="btn btn-outline" data-action="reminder-logs">Ver historial de recordatorios</button></div></section></div>'+
 '<section class="panel"><div class="panel-head"><h2 class="panel-title">Resumen diario de citas por correo y WhatsApp</h2></div><div id="daily-agenda-status">'+(state.dailyAgendaStatus===null?'Consultando programación…':dailyAgendaStatusMarkup())+'</div></section>';
 }
 async function showTestLogsModal(kind){
  const allowed=['patient_whatsapp','hello_world','patient_email','daily_email','daily_whatsapp'];
  if(!allowed.includes(kind))return;
  const names={patient_whatsapp:'Recordatorio WhatsApp a paciente',hello_world:'Conexión WhatsApp · hello_world',patient_email:'Recordatorio por correo a paciente',daily_email:'Agenda diaria · correo',daily_whatsapp:'Agenda diaria · WhatsApp'};
  showModal('Logs · '+names[kind],'<div class="test-logs-view"><p class="muted">Consultando los últimos intentos…</p></div><div class="test-logs-footer"><button class="btn btn-outline" data-action="reload-test-logs" data-test-kind="'+kind+'">Actualizar logs</button></div>');
  modalRoot.querySelector('.modal-card')?.classList.add('test-logs-modal');
  const container=modalRoot.querySelector('.test-logs-view');
  try{
   const data=await API.request('/settings/tests/logs?kind='+encodeURIComponent(kind));
   if(!container||!modalRoot.contains(container))return;
   const conf=data.configuration||{},logs=data.logs||[];
   const diagnostic=diag=>{
    if(!diag)return '';
    return '<div class="test-log-diagnostic"><strong>'+esc(diag.code||'DIAGNÓSTICO')+'</strong>'+
      '<p>'+esc(diag.message||'')+'</p><p><strong>Qué revisar:</strong> '+esc(diag.fix||'')+'</p>'+
      (diag.http_status?'<small>HTTP '+esc(diag.http_status)+'</small> ':'')+
      (diag.meta_code?'<small>Código Meta '+esc(diag.meta_code)+'</small> ':'')+
      (diag.smtp_code?'<small>SMTP '+esc(diag.smtp_code)+'</small> ':'')+
      (diag.smtp_response_code?'<small>Respuesta SMTP '+esc(diag.smtp_response_code)+'</small>':'')+'</div>';
   };
   const configuration=c=>'<div class="test-logs-config"><strong>Variables que necesita esta prueba</strong><div class="test-env-tags">'+
     (c.checked||[]).map(v=>'<span class="test-env-tag '+((c.missing||[]).includes(v)?'missing':'ok')+'">'+esc(v)+' · '+((c.missing||[]).includes(v)?'Ausente':'Configurada')+'</span>').join('')+'</div>'+
     (c.warnings||[]).map(w=>'<p class="muted">'+esc(w)+'</p>').join('')+
     '<small>No se muestran secretos ni valores privados. Configurada no equivale a credenciales válidas o plantilla aprobada.</small></div>';
   container.innerHTML=configuration(conf)+
    (logs.length?'<div class="test-log-rows">'+logs.map(log=>{
      const d=log.details||{},issue=(d.issues||[]).map(diagnostic).join('');
      return '<article class="test-log-item"><div class="test-log-top"><span class="test-log-status '+esc(log.status)+'">'+
       (log.status==='accepted'?'Aceptado':log.status==='partial'?'Parcial':'Fallido')+'</span>'+
       '<time>'+esc(log.created_at||'')+'</time><small>#'+esc(log.id)+' · '+esc(log.duration_ms)+' ms</small></div>'+
       '<p>'+esc(log.summary)+'</p>'+diagnostic(d.diagnostic)+issue+
       (d.configuration?.missing?.length?'<p class="test-env-missing"><strong>Variables ausentes:</strong> '+esc(d.configuration.missing.join(', '))+'</p>':'')+
       '</article>'}).join('')+'</div>':'<div class="empty">Aún no hay pruebas registradas para este canal. Ejecuta la prueba y revisa este historial.</div>')+
    '<p class="muted">«Aceptado» indica que SMTP/Meta aceptó la solicitud; no garantiza que se haya entregado al destinatario. Historial exclusivo de administradores.</p>';
  }catch(err){
   if(container&&modalRoot.contains(container))container.innerHTML='<div class="test-log-diagnostic"><strong>No se pudieron consultar los logs</strong><p>'+esc(err.message)+'</p><p>Comprueba que el despliegue haya creado la tabla admin_test_send_logs en MySQL.</p></div>';
  }
 }
 function testsStatusMarkup(s){
 const status=(on)=>'<strong class="'+(on?'test-ok':'test-warning')+'">'+(on?'Activo':'Inactivo')+'</strong>';
 const logs=(s.reminderLogs||[]).slice(0,5).map(l=>'<div class="daily-agenda-log"><span>'+esc(l.channel)+' · Cita '+esc(l.appointment_id)+' · '+esc(l.reminder_key)+'</span><strong>'+esc(l.status)+'</strong></div>').join('');
 return '<div class="test-status-list"><p>Programador de recordatorios: '+status(s.remindersEnabled)+'</p><p>Horario de avisos por días: <strong>'+esc(String(s.sendHour).padStart(2,'0'))+':00</strong></p><p>Anticipación: '+esc((s.daysBefore||[]).join(', ')||'Ninguna')+' día(s) y '+esc((s.hoursBefore||[]).join(', ')||'Ninguna')+' hora(s)</p><p>Canal SMTP: '+status(s.smtpConfigured&&s.emailEnabled)+'</p><p>Canal WhatsApp: '+status(s.whatsappConfigured&&s.whatsappEnabled)+'</p><p>Resumen matutino: '+status(s.daily?.enabled)+'</p><p>Resumen WhatsApp: '+status(s.daily?.whatsappEnabled&&s.daily?.whatsappConfigured)+'</p><small>La conexión y la plantilla aprobada deben validarse; configuración no equivale a entrega.</small></div><div class="daily-agenda-history"><strong>Últimos intentos</strong>'+(logs||'<p class="muted">Sin registros todavía.</p>')+'</div>';
 }
 async function loadTestsStatus(){
 try{state.testsStatus=await API.request('/settings/tests/status');const el=document.getElementById('tests-status');if(el)el.innerHTML=testsStatusMarkup(state.testsStatus)}
 catch(err){const el=document.getElementById('tests-status');if(el)el.textContent=err.message}
 }
 function renderSoon(title){const feature={expedientes:['Historia clínica digital','Imágenes, radiografías y documentos','Consentimientos informados y firma electrónica'],tratamientos:['Planes de tratamiento y presupuestos','Odontograma clínico','Seguimiento del progreso del tratamiento'],pagos:['Control de ingresos','Planes de pago','Financiamiento y pagos en línea']}[state.view];return pageHeading('MÓDULO EN CONSTRUCCIÓN',title,'Esta primera entrega incluye la base visual y técnica; el módulo clínico necesita su flujo y validación.')+`<section class="panel"><span class="soon-tag">Próxima etapa</span><h2 class="panel-title" style="margin:18px 0">Lo que integraremos</h2><div class="soon">${feature.map(x=>`<div class="quick-item"><span class="quick-symbol">✧</span><div><strong>${esc(x)}</strong><small>Pendiente de implementación funcional</small></div></div>`).join('')}</div></section>`}
 function showModal(title,body,footer=''){modalRoot.classList.remove('patient-drawer-root');modalRoot.innerHTML=`<div class="modal-card" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="modal-header"><h2>${esc(title)}</h2><button class="modal-close" type="button" data-action="close-modal" aria-label="Cerrar">×</button></div>${body}${footer}</div>`;modalRoot.classList.remove('hidden');modalRoot.querySelector('input,select,button')?.focus()}
 function closeModal(){modalRoot.classList.add('hidden');modalRoot.classList.remove('patient-drawer-root');modalRoot.innerHTML=''}
 function showAppointmentModal(appointment){if(!state.patients.length){toast('Primero agrega un paciente.');showPatientModal();return}
  const a=appointment||{};const isEdit=Boolean(a.id);const start=a.start_at?String(a.start_at).replace(' ','T').slice(0,16):`${state.date}T09:00`;
  const initialPatient=state.patients.find(p=>p.id===(a.patient_id||state.patients[0].id))||state.patients[0];
  const options=state.patients.map(p=>`<option value="${p.id}" ${p.id===a.patient_id?'selected':''}>${esc(p.first_name+' '+p.last_name)}</option>`).join('');
  showModal(isEdit?'Editar cita':'Agendar una cita',`<form id="appointment-form"><div class="form-grid">
   <div class="field span-two"><label>Paciente</label><select name="patient_id" id="appointment-patient" required>${options}</select></div>
   <div class="field"><label>Profesional</label><select name="professional_name" required>${clinicProfessionals.map(p=>`<option ${p===(a.professional_name||clinicProfessionals[0])?'selected':''}>${esc(p)}</option>`).join('')}</select></div>
   <div class="field"><label>Sillón o recurso</label><select name="resource">${['Box 1','Box 2','Box 3'].map(x=>`<option ${x===(a.resource||'Box 1')?'selected':''}>${x}</option>`).join('')}</select></div>
   <div class="field span-two"><label>Motivo / tratamiento</label><input name="treatment" maxlength="160" required value="${esc(a.treatment||'Consulta de valoración')}" placeholder="Ejemplo: Limpieza dental"></div>
   <div class="field"><label>Fecha y hora</label><input type="datetime-local" name="start_at" value="${esc(start)}" required></div><div class="field"><label>Duración</label><select name="duration">${[30,45,60,90,120].map(n=>`<option value="${n}" ${((a.start_at&&a.end_at)?minutes(timeOnly(a.end_at))-minutes(timeOnly(a.start_at)):60)===n?'selected':''}>${n} min</option>`).join('')}</select></div>
   <div class="field span-two"><label>Estado</label><select name="status">${Object.entries(statusLabels).map(([key,label])=>`<option value="${key}" ${(a.status||'pending')===key?'selected':''}>${label}</option>`).join('')}</select></div><div class="field"><label>Correo para notificar</label><input type="email" name="contact_email" maxlength="180" placeholder="paciente@correo.com" value="${esc(a.contact_email||initialPatient.email||'')}"></div><div class="field"><label>WhatsApp con LADA</label><input name="contact_whatsapp" maxlength="25" placeholder="+52 33 1234 5678" value="${esc(a.contact_whatsapp||initialPatient.phone||'')}"></div><div class="field span-two"><label class="consent-check"><input name="whatsapp_opt_in" type="checkbox" ${(a.whatsapp_opt_in||(!isEdit&&initialPatient.whatsapp_opt_in))?'checked':''}> El paciente autorizó expresamente los recordatorios por WhatsApp.</label><small class="muted">Necesitamos por lo menos correo o WhatsApp. Para usar solo WhatsApp debes marcar el consentimiento.</small></div></div>
   <div class="modal-actions"><button type="button" class="btn btn-outline" data-action="close-modal">Cancelar</button><button type="submit" class="btn btn-primary">${isEdit?'Guardar cambios':'Crear cita'}</button></div></form>`);
  const form=document.getElementById('appointment-form');
  form.elements.namedItem('patient_id').addEventListener('change',event=>{const p=state.patients.find(x=>String(x.id)===event.target.value);if(p){form.elements.namedItem('contact_email').value=p.email||'';form.elements.namedItem('contact_whatsapp').value=p.phone||'';form.elements.namedItem('whatsapp_opt_in').checked=!!p.whatsapp_opt_in}});
  form.addEventListener('submit',async e=>{e.preventDefault();const values=Object.fromEntries(new FormData(form).entries());const startDate=new Date(values.start_at);const endDate=new Date(startDate.getTime()+Number(values.duration)*60_000);if(isNaN(startDate.getTime()))return toast('Fecha no válida');
    const payload={patient_id:Number(values.patient_id),professional_name:values.professional_name,resource:values.resource,treatment:values.treatment,start_at:values.start_at,end_at:`${ymd(endDate)}T${String(endDate.getHours()).padStart(2,'0')}:${String(endDate.getMinutes()).padStart(2,'0')}`,status:values.status,contact_email:values.contact_email.trim(),contact_whatsapp:values.contact_whatsapp.trim(),whatsapp_opt_in:form.elements.namedItem('whatsapp_opt_in').checked};
    if(!payload.contact_email&&!payload.contact_whatsapp)return toast('Es obligatorio proporcionar correo o WhatsApp.');
    if(!payload.contact_email&&!payload.whatsapp_opt_in)return toast('Autoriza WhatsApp o proporciona un correo electrónico.');
    const submit=form.querySelector('button[type=submit]');submit.disabled=true;try{const result=await API.request(isEdit?`/appointments/${a.id}`:'/appointments',{method:isEdit?'PATCH':'POST',body:JSON.stringify(payload)});closeModal();toast(result.calendar_warning|| (isEdit?'Cita actualizada':'Cita registrada'));await refresh()}catch(err){toast(err.message);submit.disabled=false}
  })
 }
 function showPatientModal(patient=null){
 showModal(patient?'Editar datos del paciente':'Registrar nuevo paciente',`<form id="patient-form"><div class="form-grid"><div class="field span-two"><label for="patient-photo">Fotografía de perfil (opcional)</label><div class="patient-photo-picker"><span class="patient-avatar patient-avatar-preview" id="patient-photo-placeholder">✦</span><img id="patient-photo-preview" class="patient-photo-preview hidden" alt="Vista previa de la fotografía del paciente"><div class="photo-picker-details"><input id="patient-photo" class="visually-hidden-upload" type="file" accept="image/jpeg,image/png,image/webp" aria-label="Seleccionar fotografía del paciente"><strong id="patient-photo-name">Agrega una fotografía</strong><div class="photo-picker-actions"><label class="photo-pick-btn" for="patient-photo">✧ Elegir imagen</label><button class="photo-clear-btn" id="patient-photo-clear" type="button" hidden>Quitar</button></div></div></div></div><div class="patient-demographics-grid" role="group" aria-label="Datos y contacto del paciente"><div class="patient-identity-fields" role="group" aria-label="Datos personales"><div class="patient-column-title">Datos personales</div><div class="field"><label for="patient-first-name">Nombre(s)</label><input id="patient-first-name" name="first_name" maxlength="90" autocomplete="given-name" required></div><div class="field"><label for="patient-last-name">Apellidos</label><input id="patient-last-name" name="last_name" maxlength="90" autocomplete="family-name" required></div><div class="field"><label for="patient-birth-date">Fecha de nacimiento (opcional)</label><input id="patient-birth-date" type="date" name="birth_date" max="${ymd(new Date())}"></div></div><div class="patient-contact-fields" role="group" aria-label="Medios de contacto"><div class="patient-column-title">Contacto</div><div class="field"><label for="patient-phone">Teléfono</label><input id="patient-phone" name="phone" type="tel" inputmode="tel" maxlength="30" autocomplete="tel" placeholder="33 1234 5678"></div><div class="field"><label for="patient-email">Correo electrónico</label><input id="patient-email" name="email" type="email" maxlength="180" autocomplete="email" placeholder="persona@correo.com"></div></div></div><div class="field span-two"><label>Notas internas (opcional)</label><textarea name="notes" maxlength="2000" placeholder="Evita registrar datos clínicos sensibles hasta concluir el módulo de expedientes."></textarea></div><div class="field span-two"><label style="display:flex;align-items:center;gap:8px"><input name="whatsapp_opt_in" type="checkbox" style="width:auto">El paciente autorizó recibir recordatorios por WhatsApp</label></div></div><div class="modal-actions"><button type="button" class="btn btn-outline" data-action="close-modal">Cancelar</button><button type="submit" class="btn btn-primary">Registrar paciente</button></div></form>`);
 const form=document.getElementById('patient-form');let photoData=null;
 if(patient){for(const key of ['first_name','last_name','birth_date','phone','email','notes']){const input=form.elements.namedItem(key);if(input)input.value=patient[key]||''}form.elements.namedItem('whatsapp_opt_in').checked=!!patient.whatsapp_opt_in;const submit=form.querySelector('button[type=submit]');submit.textContent='Guardar cambios'}
 const photoInput=document.getElementById('patient-photo'),photoName=document.getElementById('patient-photo-name'),photoPreview=document.getElementById('patient-photo-preview'),photoPlaceholder=document.getElementById('patient-photo-placeholder'),photoClear=document.getElementById('patient-photo-clear');
 function clearPhoto(){photoData=null;photoInput.value='';photoName.textContent='Agrega una fotografía';photoPreview.removeAttribute('src');photoPreview.classList.add('hidden');photoPlaceholder.classList.remove('hidden');photoClear.hidden=true}
 photoClear.addEventListener('click',clearPhoto);
 photoInput.addEventListener('change',async event=>{
  const file=event.target.files?.[0];if(!file){clearPhoto();return}
  try{photoData=await readSelectedPhoto(file);photoPreview.src=photoData;photoPreview.classList.remove('hidden');photoPlaceholder.classList.add('hidden');photoName.textContent=file.name;photoClear.hidden=false}
  catch(err){clearPhoto();toast(err.message)}
 });
 form.addEventListener('submit',async event=>{
  event.preventDefault();const data=Object.fromEntries(new FormData(form).entries());delete data.photo;
  data.phone=String(data.phone||'').trim();data.email=String(data.email||'').trim();
  if(!data.phone&&!data.email){form.querySelector('[name="phone"]').focus();toast('Agrega al menos un teléfono o un correo electrónico.');return}
  if(data.whatsapp_opt_in&&!data.phone){form.querySelector('[name="phone"]').focus();toast('Para usar WhatsApp registra un teléfono.');return}data.whatsapp_opt_in=Boolean(data.whatsapp_opt_in);if(photoData)data.photo_data=photoData;
  const submit=form.querySelector('button[type=submit]');submit.disabled=true;
  try{await API.request(patient?'/patients/'+patient.id:'/patients',{method:patient?'PATCH':'POST',body:JSON.stringify(data)});if(patient&&photoData){const cached=photoCache.get(String(patient.id));if(cached){URL.revokeObjectURL(cached);photoCache.delete(String(patient.id))}}closeModal();toast(patient?'Paciente actualizado':'Paciente registrado');await refresh()}
  catch(err){toast(err.message);submit.disabled=false}
 })
}
 const photoCache=new Map();
 async function hydratePatientPhotos(){
 const els=root.querySelectorAll('[data-photo-id]');
 await Promise.all(Array.from(els,async el=>{
  const id=el.dataset.photoId;
  try{
   let url=photoCache.get(id);
   if(!url){const blob=await API.photo(id);url=URL.createObjectURL(blob);photoCache.set(id,url)}
   if(el.isConnected)el.innerHTML=`<img src="${url}" alt="Foto del paciente">`;
  }catch{ /* La ficha puede seguir mostrándose sin la foto */ }
 }))
}
 function calendarStatusMarkup(){
 const s=state.calendarStatus;
 if(!s)return '';
 if(s.error)return `<p class="help-note">${esc(s.error)}</p>`;
 if(!s.configured)return '<p class="help-note">Falta configurar Google OAuth en las variables privadas de Hostinger. Consulta GOOGLE_CALENDAR_SETUP.md.</p>';
 return s.connected?`<p>Tu calendario está conectado. Las nuevas citas se enviarán a Google Calendar; los cambios se sincronizan al guardar.</p><div class="head-actions"><button class="btn btn-primary" data-action="google-sync">Sincronizar próximas citas</button><button class="btn btn-outline" data-action="google-disconnect">Desconectar</button></div>`:`<p>Vincula la cuenta de Google autorizada para sincronizar las citas del consultorio (sin nombres de pacientes).</p><button class="btn btn-primary" data-action="google-connect">Conectar Google Calendar</button>`;
}
 async function loadCalendarStatus(){
 try{const status=await API.request('/calendar/status');state.calendarStatus=status}
 catch(err){state.calendarStatus={error:err.message}}
 if(state.view==='configuracion')render();
}
 function setSidebarOpen(open){window.YerenaSidebar?.setMobileOpen(open)}
 async function navigate(view){if(view==='pruebas'&&state.session?.role!=='admin')return toast('Solo administración puede acceder a Pruebas.');state.view=view;setSidebarOpen(false);if(view==='agenda')await refresh();else render();window.scrollTo({top:0,behavior:'instant'})}
 document.addEventListener('click',async event=>{
  const v=event.target.closest('[data-view]');if(v){await navigate(v.dataset.view);return}
  const cal=event.target.closest('[data-calendar-view]');if(cal){state.calendarView=cal.dataset.calendarView;render();return}
  const monthDay=event.target.closest('[data-month-day]');if(monthDay){state.date=monthDay.dataset.monthDay;state.calendarView='day';render();return}
  const edit=event.target.closest('[data-edit-appointment]');if(edit){showAppointmentModal(state.appointments.find(a=>String(a.id)===edit.dataset.editAppointment));return}
  const act=event.target.closest('[data-action]');if(!act)return;
  switch(act.dataset.action){case 'patient-details':await showPatientDetails(act.dataset.patientId);break;case 'edit-patient':{const p=state.patients.find(x=>String(x.id)===act.dataset.patientId);if(p)showPatientModal(p);else toast('Recarga el directorio para editar.');break}case 'delete-patient':{const id=Number(act.dataset.patientId);const p=state.patients.find(x=>Number(x.id)===id);if(!p||state.session?.role!=='admin')break;if(!confirm('¿Eliminar del directorio a '+p.first_name+' '+p.last_name+'? Se conservará el historial clínico y las citas pasadas. Esta acción no se puede deshacer desde la interfaz.'))break;act.disabled=true;try{await API.request('/patients/'+id,{method:'DELETE'});const cached=photoCache.get(String(id));if(cached){URL.revokeObjectURL(cached);photoCache.delete(String(id))}closeModal();toast('Paciente retirado del directorio.');await refresh()}catch(err){toast(err.message);act.disabled=false}break}case 'open-clinical-history':location.href='expediente.html?id='+encodeURIComponent(act.dataset.patientId);break;case 'open-password-modal':openPasswordModal();break;case 'open-user-modal':openNewUserModal();break;case 'toggle-account-password':{const input=document.getElementById(act.dataset.target);if(input){const visible=input.type==='password';input.type=visible?'text':'password';act.textContent=visible?'Ocultar':'Mostrar';act.setAttribute('aria-pressed',String(visible));act.setAttribute('aria-label',(visible?'Ocultar ':'Mostrar ')+(input.labels?.[0]?.textContent?.toLowerCase()||'contraseña'))}break}case 'new-appointment':showAppointmentModal();break;case 'new-patient':showPatientModal();break;case 'close-modal':closeModal();break;case 'go-agenda':await navigate('agenda');break;case 'go-reminders':await navigate('recordatorios');break;case 'retry':await refresh();break;case 'reset-reminder-template':{const field=document.getElementById('reminder-template');if(field){field.value=DEFAULT_REMINDER_MESSAGE;updateReminderPreview(field.form)}break}case 'reminder-diagnostics':try{act.disabled=true;const result=await API.request('/settings/reminder-diagnostics');showModal('Diagnóstico de notificaciones',`<div class="reminder-diagnostics"><p><strong>Programador:</strong> ${result.schedulerEnabled?'Activado':'Desactivado'} (REMINDERS_ENABLED)</p><p><strong>SMTP:</strong> ${result.smtp.connected?'Conexión comprobada':result.smtp.configured?'Configurado, sin conexión confirmada':'Sin configurar'}</p><p><strong>Meta WhatsApp:</strong> ${result.whatsapp.reachable?'API accesible':result.whatsapp.configured?'Credenciales detectadas, API no confirmada':'Sin configurar'}</p><p><strong>Plantilla de WhatsApp:</strong> la aprobación debe comprobarse en WhatsApp Manager; no se valida con esta prueba.</p><p><strong>Correos del consultorio:</strong> ${result.clinicEmailsConfigured?'Configurados':'No configurados'}</p><small>Este diagnóstico no envía mensajes. Para comprobar una entrega real, usa únicamente contactos de prueba autorizados.</small></div>`)}catch(e){toast(e.message)}finally{act.disabled=false}break;case 'remove-doctor-photo':if(!confirm('¿Quitar la fotografía de la doctora?'))break;act.disabled=true;try{await API.request('/settings/doctor-photo',{method:'DELETE'});await loadDoctorPhoto();toast('Fotografía eliminada.')}catch(err){toast(err.message)}finally{act.disabled=false}break;case 'reminder-logs':try{const p=await API.request('/settings/reminder-logs');showModal('Historial de recordatorios',`<div class="reminder-history">${(p.logs||[]).length?(p.logs||[]).map(x=>`<div class="appointment-line"><span class="time-block">${esc(x.reminder_key)}</span><div class="appointment-person"><strong>${esc(x.channel)} · ${esc(x.status)}</strong><small>${esc(x.recipient)} · Cita ${esc(x.appointment_id)}</small></div></div>`).join(''):'<p class="muted">Todavía no hay envíos registrados.</p>'}</div>`)}catch(e){toast(e.message)}break;case 'view-test-logs':await showTestLogsModal(act.dataset.testKind);break;case 'reload-test-logs':await showTestLogsModal(act.dataset.testKind);break;case 'tests-refresh':await loadTestsStatus();await loadDailyAgendaStatus();break;
case 'daily-whatsapp-test':if(confirm('Esta prueba ENVIARÁ mensajes WhatsApp reales con datos ficticios a todos los teléfonos internos configurados. ¿Continuar?')){act.disabled=true;try{const result=await API.request('/settings/tests/daily-whatsapp',{method:'POST',body:JSON.stringify({confirmation:'SEND_TEST_DAILY_WHATSAPP'})});toast('Meta aceptó '+result.sent+' envío(s); '+result.failed+' fallido(s).');await loadTestsStatus()}catch(err){toast(err.message)}finally{act.disabled=false;await showTestLogsModal('daily_whatsapp')}}break;
case 'test-hello-world':{
 const patientId=Number(document.getElementById('test-patient-select')?.value);
 const p=state.patients.find(p=>Number(p.id)===patientId);if(!p)break;
 if(!confirm('Enviar UN mensaje REAL hello_world (inglés) a '+p.first_name+' '+p.last_name+' ('+p.phone+')? No incluirá información de citas. El número debe estar autorizado para pruebas en Meta.'))break;
 act.disabled=true;
 try{
  const result=await API.request('/settings/tests/hello-world',{method:'POST',body:JSON.stringify({patient_id:patientId,confirmation:'SEND_HELLO_WORLD'})});
  toast(result.message);
 }catch(err){toast(err.message)}
 finally{act.disabled=false;await showTestLogsModal('hello_world')}
 break;
}
case 'test-patient-whatsapp':{const patientId=Number(document.getElementById('test-patient-select')?.value);const p=state.patients.find(p=>Number(p.id)===patientId);if(!p)break;
 if(!confirm((state.testsStatus?.helloWorldTestMode?'Enviar UN hello_world REAL, en inglés y SIN información de su cita, a ':'Enviar UN WhatsApp REAL sobre su próxima cita a ')+p.first_name+' '+p.last_name+' ('+p.phone+')? Se necesita consentimiento.'))break;
 act.disabled=true;try{const result=await API.request('/settings/tests/patient-whatsapp',{method:'POST',body:JSON.stringify({patient_id:patientId,confirmation:'SEND_PATIENT_WHATSAPP'})});toast(result.message)}catch(err){toast(err.message)}finally{act.disabled=false;await showTestLogsModal('patient_whatsapp')}break;
}
case 'test-patient-email':{
 const patientId=Number(document.getElementById('test-email-patient-select')?.value);
 const p=state.patients.find(p=>Number(p.id)===patientId);if(!p){toast('Selecciona un paciente con correo.');break}
 if(!confirm('Enviar un correo REAL de recordatorio a '+p.email+' para su próxima cita?'))break;
 act.disabled=true;
 try{
  const result=await API.request('/settings/tests/patient-email',{method:'POST',body:JSON.stringify({patient_id:patientId,confirmation:'SEND_PATIENT_EMAIL'})});
  toast(result.message);
 }catch(err){toast(err.message)}
 finally{act.disabled=false;await showTestLogsModal('patient_email')}
 break;
}
case 'daily-agenda-refresh':act.disabled=true;try{await loadDailyAgendaStatus()}finally{act.disabled=false}break;case 'daily-agenda-test':if(confirm('Se enviará UN correo de PRUEBA con citas ficticias a todos los destinatarios configurados en DAILY_AGENDA_EMAILS. ¿Continuar?')){act.disabled=true;try{const result=await API.request('/settings/daily-agenda/test',{method:'POST',body:JSON.stringify({confirmation:'SEND_TEST_AGENDA'})});toast('Prueba: '+result.sent+' correos enviados; '+result.failed+' fallidos.');await loadDailyAgendaStatus()}catch(err){toast(err.message)}finally{act.disabled=false;await showTestLogsModal('daily_email')}}break;case 'google-connect':try{const p=await API.request('/calendar/connect',{method:'POST'});location.assign(p.url)}catch(e){toast(e.message)}break;case 'google-disconnect':if(confirm('¿Desconectar Google Calendar?')){try{await API.request('/calendar/disconnect',{method:'POST'});state.calendarStatus=null;render()}catch(e){toast(e.message)}}break;case 'google-sync':act.disabled=true;try{const p=await API.request('/calendar/sync',{method:'POST'});toast(`${p.synced} citas sincronizadas, ${p.failed} pendientes.`)}catch(e){toast(e.message)}finally{act.disabled=false}break;case 'today-date':state.date=ymd(new Date());await refresh();break;case 'previous-date':state.date=state.calendarView==='month'?monthShift(state.date,-1):dateShift(state.date,state.calendarView==='week'?-7:-1);await refresh();break;case 'next-date':state.date=state.calendarView==='month'?monthShift(state.date,1):dateShift(state.date,state.calendarView==='week'?7:1);await refresh();break;}
 });
 root.addEventListener('change',async event=>{
  if(event.target.id==='doctor-photo-input'){
   const input=event.target,file=input.files?.[0];if(!file)return;
   try{input.disabled=true;const data=await readSelectedPhoto(file);await API.request('/settings/doctor-photo',{method:'PUT',body:JSON.stringify({photo_data:data})});await loadDoctorPhoto();toast('Foto de la doctora guardada.')}
   catch(err){toast(err.message)}
   finally{input.disabled=false;input.value=''}
  }
if(event.target.id==='test-patient-select'){
  const p=state.patients.find(p=>String(p.id)===event.target.value);state.testPatientId=p?.id;
  const n=document.getElementById('test-patient-number'),consent=document.getElementById('test-patient-consent');
  if(n)n.textContent=p?.phone||'Sin teléfono';
  if(consent)consent.textContent=p?.whatsapp_opt_in?'Consentimiento guardado':'Sin consentimiento WhatsApp';
  for(const action of ['test-patient-whatsapp','test-hello-world']){const button=document.querySelector('[data-action="'+action+'"]');if(button)button.disabled=!(p?.phone&&p?.whatsapp_opt_in)}
 }
 if(event.target.id==='test-email-patient-select'){
  const p=state.patients.find(p=>String(p.id)===event.target.value);state.testEmailPatientId=p?.id;
  const label=document.getElementById('test-email-patient-address'),button=document.querySelector('[data-action="test-patient-email"]');
  if(label)label.textContent=p?.email||'Sin correo';if(button)button.disabled=!p?.email;
 }
 if(event.target.id==='agenda-date'){state.date=event.target.value;await refresh()}if(event.target.id==='professional-filter'){state.professional=event.target.value;render()}});
 root.addEventListener('input',event=>{if(event.target.closest('#reminder-form')&&['clinic_name','clinic_address','clinic_maps_url','message_template'].includes(event.target.name)){updateReminderPreview(event.target.form)}if(event.target.id==='patient-search'){state.patientSearch=event.target.value;const el=document.activeElement;const caret=el?.selectionStart;render();document.getElementById('patient-search').focus();document.getElementById('patient-search').setSelectionRange(caret,caret)}});
 modalRoot.addEventListener('submit',async event=>{
 const form=event.target;
 if(!['account-password-form','account-user-form'].includes(form.id))return;
 event.preventDefault();
 const submit=form.querySelector('button[type="submit"]');
 const oldText=submit.textContent;
 const fd=new FormData(form);
 const pwdForm=form.id==='account-password-form';
 const pass=String(fd.get(pwdForm?'new_password':'password')||'');
 const confirm=String(fd.get('confirm_password')||'');
 if(pass.length<12||pass.length>128)return toast('La contraseña debe contener entre 12 y 128 caracteres.');
 if(pass!==confirm)return toast('La confirmación de contraseña no coincide.');
 if(pwdForm&&fd.get('current_password')===pass)return toast('La nueva contraseña debe ser diferente de la anterior.');
 submit.disabled=true;submit.textContent='Guardando…';
 try{
  if(pwdForm){
   await API.request('/auth/password',{method:'POST',body:JSON.stringify({current_password:fd.get('current_password'),new_password:pass,confirm_password:confirm})});
   form.reset();API.logout();return;
  }
  if(state.session?.role!=='admin')throw new Error('Solo administración puede agregar usuarios.');
  const result=await API.request('/auth/users',{method:'POST',body:JSON.stringify({email:String(fd.get('email')||'').trim(),password:pass,confirm_password:confirm})});
  form.reset();closeModal();toast('Usuario creado: '+result.user.email);
 }catch(err){
  if(pwdForm)form.elements.current_password.value='';
  toast(err.message);
 }finally{submit.disabled=false;submit.textContent=oldText}
});
 root.addEventListener('submit',async event=>{ if(event.target.id!=='reminder-form')return;event.preventDefault();const form=event.target;const fd=new FormData(form);const days=fd.getAll('days').map(Number),hours=fd.getAll('hours').map(Number);if(!days.length&&!hours.length)return toast('Selecciona al menos un aviso en días u horas.');const payload={email_enabled:fd.has('email_enabled'),whatsapp_enabled:fd.has('whatsapp_enabled'),days_before:days,hours_before:hours,send_hour:Number(fd.get('send_hour')),clinic_name:fd.get('clinic_name'),clinic_address:fd.get('clinic_address'),clinic_maps_url:fd.get('clinic_maps_url'),message_template:fd.get('message_template')};
  try{await API.request('/settings/reminders',{method:'PUT',body:JSON.stringify(payload)});toast('Preferencias guardadas');await refresh()}catch(err){toast(err.message)}
 });
 modalRoot.addEventListener('click',event=>{if(event.target===modalRoot)closeModal()});document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();setSidebarOpen(false)}});
 document.getElementById('logout-button').addEventListener('click',()=>API.logout());
 async function bootstrap(){if(!API.token()){location.href='index.html';return}try{const data=await API.request('/auth/me');state.session=data.user;const navTests=document.querySelector('[data-view="pruebas"]');if(navTests)navTests.hidden=data.user.role!=='admin';const initialView=new URLSearchParams(location.search).get('view');if(['pacientes','expedientes'].includes(initialView))state.view=initialView;document.getElementById('sidebar-user-name').textContent=data.user.name;document.getElementById('sidebar-user-role').textContent=data.user.role==='admin'?'Administración':data.user.role;document.getElementById('today-label').textContent=prettyDate(ymd(new Date()));await refresh();const outcome=new URLSearchParams(location.search).get('calendar');if(outcome){history.replaceState(null,'',location.pathname);if(outcome==='connected'){state.view='configuracion';state.calendarStatus=null;render();toast('Google Calendar conectado. Sincroniza tus próximas citas.')}else toast('No se pudo completar la autorización de Google.')}}catch(e){if(API.token())root.innerHTML=`<div class="panel">${esc(e.message)}</div>`}}
 // La bienvenida se muestra al menos 2.8 s para disfrutar la animación.
 // Si la API tarda demasiado, ocultamos el splash tras 6 s para no bloquear la página.
 const splash=document.getElementById('app-splash');
 const splashStartedAt=performance.now();
 let splashDismissed=false;
 function dismissSplash(){
  if(!splash || splashDismissed)return;
  splashDismissed=true;
  splash.classList.add('splash-hidden');
  setTimeout(()=>splash.remove(),650);
 }
 const splashFallback=setTimeout(dismissSplash,6000);
 bootstrap().finally(()=>{
  const remaining=Math.max(0,2800-(performance.now()-splashStartedAt));
  setTimeout(()=>{clearTimeout(splashFallback);dismissSplash()},remaining);
 });
})();
