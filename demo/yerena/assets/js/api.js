// Isolated public demo: no HTTP requests, no production credentials.
(()=>{'use strict';
const key='lel_yerena_demo_v3';const today=new Date();const ymd=d=>[d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');const plus=(n,h)=>{const d=new Date();d.setDate(d.getDate()+n);return ymd(d)+' '+String(h).padStart(2,'0')+':00:00'};
const seed=()=>({patients:[['Ana','Morales'],['Carlos','Ramírez'],['Lucía','Campos'],['Luis','Serrano'],['Elena','Vargas'],['Daniel','Ríos'],['Mariana','Luna'],['Sofía','Torres']].map(([first_name,last_name],i)=>({id:i+1,first_name,last_name,phone:'330000'+String(1000+i),email:'paciente'+(i+1)+'@example.test',notes:'Ejemplo clínico ficticio',whatsapp_opt_in:true})),appointments:[[0,9,1,'confirmed'],[0,11,2,'pending'],[0,14,3,'confirmed'],[1,10,4,'pending'],[2,13,5,'confirmed'],[3,12,6,'confirmed'],[-1,10,7,'completed']].map(([d,h,p,status],i)=>({id:i+1,patient_id:p,patient_name:['Ana Morales','Carlos Ramírez','Lucía Campos','Luis Serrano','Elena Vargas','Daniel Ríos','Mariana Luna'][p-1],professional_name:'Dra. Yerena Riso',resource:'Box 1',treatment:['Limpieza dental','Valoración inicial','Resina dental'][i%3],start_at:plus(d,h),end_at:plus(d,h+1),status})),settings:{email_enabled:true,whatsapp_enabled:true,days_before:[1,2],hours_before:[1],send_hour:9,clinic_name:'Consultorio Dental Demo',clinic_address:'Guadalajara, Jalisco',clinic_maps_url:'',message_template:'Hola, te recordamos tu cita dental.'},clinical:{},logs:[]});
let db;try{db=JSON.parse(localStorage.getItem(key))}catch{}if(!db?.patients)db=seed();
const persist=()=>{try{localStorage.setItem(key,JSON.stringify(db))}catch(e){console.warn('Demo solo en memoria',e)}};
const result=x=>structuredClone(x);const body=o=>{try{return JSON.parse(o?.body||'{}')}catch{return {}}};const patient=id=>db.patients.find(p=>p.id===Number(id));const full=p=>p.first_name+' '+p.last_name;const count=a=>Math.max(0,...a.map(x=>Number(x.id)||0))+1;
const bundle=id=>{if(!patient(id))throw Error('Paciente ficticio no encontrado');if(!db.clinical[id])db.clinical[id]={filiation:{},history:{},odontogram:[],periodontal:[],prescriptions:[],files:[]};return {patient:patient(id),...db.clinical[id]}};
const answer=(route,options={})=>{const method=(options.method||'GET').toUpperCase(),input=body(options);let m;
if(route==='/auth/me')return {user:{id:1,name:'Administración Demo',email:'admin@example.test',role:'admin'}};
if(route==='/auth/password'||route==='/auth/users')return {error:'La administración de credenciales está desactivada en este demo.'};
if(route==='/patients'&&method==='GET')return {patients:db.patients};
if(route==='/patients'&&method==='POST'){const p={id:count(db.patients),...input};db.patients.push(p);persist();return {patient:p}}
if((m=route.match(/^\/patients\/(\d+)\/details$/))){const p=patient(m[1]);return {patient:p,appointments:db.appointments.filter(a=>a.patient_id===p.id)}}
if((m=route.match(/^\/patients\/(\d+)$/))){const p=patient(m[1]);if(!p)throw Error('Paciente no encontrado');if(method==='DELETE'){db.patients=db.patients.filter(x=>x!==p);db.appointments=db.appointments.filter(a=>a.patient_id!==p.id);persist();return {archived:true}}Object.assign(p,input);persist();return {patient:p}}
if(route.startsWith('/appointments?')){const q=new URLSearchParams(route.split('?')[1]);return {appointments:db.appointments.filter(x=>x.start_at.slice(0,10)>=(q.get('from')||'0000')&&x.start_at.slice(0,10)<=(q.get('to')||'9999'))}}
if(route==='/appointments'&&method==='POST'){const p=patient(input.patient_id);if(!p)throw Error('Selecciona un paciente válido');const a={id:count(db.appointments),...input,patient_name:full(p)};db.appointments.push(a);persist();return {appointment:a,calendar_warning:'Cita registrada únicamente en este demo.'}}
if((m=route.match(/^\/appointments\/(\d+)$/))){const a=db.appointments.find(x=>x.id===Number(m[1]));if(!a)throw Error('Cita no encontrada');Object.assign(a,input);a.patient_name=full(patient(a.patient_id));persist();return {appointment:a,calendar_warning:'No se sincronizó con Google Calendar (demo).'}}
if(route==='/settings/reminders'){if(method==='PUT'){db.settings=input;persist()}return {settings:db.settings,mode:'demo',capabilities:{schedulerEnabled:true,emailReady:false,whatsappReady:false,clinicEmailsConfigured:false}}}
if(route==='/settings/daily-agenda')return {enabled:true,configured:true,smtpConfigured:false,recipientEmails:['demo@example.test'],logs:[],note:'Simulación sin envío de correo.'};
if(route==='/settings/reminder-diagnostics')return {schedulerEnabled:true,mode:'demo',smtp:{configured:false,connected:false},whatsapp:{configured:false,reachable:false},clinicEmailsConfigured:false};
if(route==='/settings/reminder-logs')return {logs:db.logs};
if(route==='/settings/tests/status')return {remindersEnabled:true,emailEnabled:true,whatsappEnabled:true,smtpConfigured:false,whatsappConfigured:false,templateApproval:'Demo',daily:{configured:false},reminderLogs:db.logs.slice(-8)};
if(route.startsWith('/settings/tests/logs'))return {logs:db.logs,configuration:{},title:'Pruebas simuladas'};
if(route.startsWith('/settings/tests/')||route==='/settings/daily-agenda/test'){const log={id:count(db.logs),channel:route.includes('whatsapp')?'whatsapp':'email',status:'simulado',created_at:new Date().toISOString(),summary:'Simulación sin envío externo'};db.logs.push(log);persist();return {sent:1,failed:0,message:'Envío simulado. No se contactó a ninguna persona real.'}}
if(route==='/calendar/status')return {connected:false,configured:false,mode:'demo'};
if(route==='/calendar/connect')return {url:'#'};
if(route==='/calendar/disconnect')return {disconnected:true};
if(route==='/calendar/sync')return {synced:0,failed:0};
if(route==='/clinical/catalog/odontogram')return {items:[{codigo:'CARIES',descripcion:'Caries',variantes:['MALO']},{codigo:'SANO',descripcion:'Sano',variantes:['BUENO']}]};
if((m=route.match(/^\/clinical\/(\d+)(?:\/(.*))?$/))){const id=Number(m[1]),section=m[2],c=bundle(id);
 if(!section)return c;
 if(section==='birth-date'&&method==='PUT'){patient(id).birth_date=input.birth_date;persist();return {ok:true}}
 if(['filiation','history'].includes(section)&&method==='PUT'){db.clinical[id][section]=input;persist();return {ok:true}}
 if(['odontogram','periodontal','prescriptions'].includes(section)&&method==='POST'){const list=db.clinical[id][section];const record={id:count(list),...input,created_at:new Date().toISOString()};list.push(record);persist();return record}
 if(section==='periodontal/batch'){db.clinical[id].periodontal.push(...(input.measurements||[]));persist();return {saved:(input.measurements||[]).length}}
 if(section?.startsWith('files')){if(method==='DELETE'){db.clinical[id].files=db.clinical[id].files.filter(f=>String(f.id)!==section.split('/')[1]);persist();return {deleted:true}}return {files:db.clinical[id].files}}
}
throw Error('Acción no habilitada en esta simulación: '+route)};
window.YERENA_CONFIG=Object.freeze({API_BASE_URL:'demo://isolated'});
window.API={token:()=> 'demo-administrator',saveToken:()=>{},request:async(route,o)=>result(answer(route,o)),photo:async()=>{throw Error('Sin foto')},doctorPhoto:async()=>null,logout:()=>{location.href='app.html'}};
window.YERENA_DEMO={reset(){localStorage.removeItem(key);location.reload()},version:3};
})();
