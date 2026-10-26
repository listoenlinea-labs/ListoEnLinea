'use strict';
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../..');
const load=p=>fs.readFileSync(path.join(root,p),'utf8');
function storage(){const map=new Map();return {getItem:k=>map.get(k)||null,setItem:(k,v)=>map.set(k,String(v)),removeItem:k=>map.delete(k)}}
function residential(){
 const memory=storage(),requests=[];
 const win={fetch:async(url)=>{requests.push(url);throw Error('Intento de red real: '+url)}};
 const sandbox={window:win,localStorage:memory,sessionStorage:memory,URL,Response,Headers,Date,structuredClone,console,
  location:{href:'https://listoenlinea.com/demo/mision/index.html',reload(){}},
  XMLHttpRequest:class{}};
 sandbox.XMLHttpRequest.prototype.open=()=>{};
 vm.runInNewContext(load('demo/mision/demo-bootstrap.js'),sandbox,{filename:'demo-bootstrap.js'});
 async function request(route,method='GET',body={}){
  const r=await win.fetch('https://demo.invalid/api'+route,{method,body:JSON.stringify(body)});
  return {...await r.json(),status:r.status};
 }
 return {win,request,requests};
}
function dental(){
 const bytes=new Map(),db=storage(),win={fetch:async(url)=>{throw Error('Tráfico no permitido: '+url)}};
 const mkRequest=fn=>{const q={};queueMicrotask(()=>{try{q.result=fn();q.onsuccess?.()}catch(e){q.error=e;q.onerror?.()}});return q};
 const indexedDB={open(){const database={createObjectStore(){},close(){},transaction(){return {objectStore(){return {get:key=>mkRequest(()=>bytes.get(key)),put:(blob,key)=>mkRequest(()=>bytes.set(key,blob)),delete:key=>mkRequest(()=>bytes.delete(key))}}}}};const q={result:database};queueMicrotask(()=>q.onsuccess?.());return q},deleteDatabase(){bytes.clear()}};
 const sandbox={window:win,localStorage:db,indexedDB,Blob,Response,Headers,URL,Date,structuredClone,console,Uint8Array,
  location:{href:'app.html'}};
 vm.runInNewContext(load('demo/yerena/assets/js/api.js'),sandbox,{filename:'yerena-api.js'});
 return {win,bytes};
}
test('Portal residencial usa administrador ficticio sin salir a producción',async()=>{
 const {win,request,requests}=residential();
 const profile=await request('/auth/perfil');
 assert.equal(profile.usuario.rol.nombre,'ADMINISTRADOR');
 const a=await request('/finanzas/analisis?anio=2026&mes=10');
 assert.equal(a.data.casas,231);
 assert.ok(a.data.viviendas.every(h=>h.nombre&&!h.calle.includes('Atotonilco')));
 assert.equal(requests.length,0);
 await assert.rejects(()=>win.fetch('https://api-misionjardines.listoenlinea.host/api/auth/perfil'),/Bloqueado/);
});
test('Pago de mantenimiento liquida deuda y actualiza TAG pero cuotas extra no lo alteran',async()=>{
 const {request}=residential();
 const before=await request('/finanzas/analisis?anio=2026&mes=10'),house=before.data.viviendas.find(h=>h.saldoPendiente>0);
 assert.ok(house&&house.saldoPendiente>0);
 const id=house.casaId;
 const paid=await request('/finanzas/pagos-vivienda','POST',{casaId:id,montoTotal:house.saldoPendiente,anio:new Date().getFullYear(),mes:new Date().getMonth()+1});
 assert.equal(paid.ok,true);
 assert.ok(paid.data.referencia.startsWith('PAGO-DEMO-'));
 const after=await request('/finanzas/analisis?anio=2026&mes=10');
 assert.equal(after.data.viviendas.find(h=>h.casaId===id).saldoPendiente,0);
 const tags=await request('/zkteco/viviendas/'+id+'/vigencia-tags'),expires=tags.data.tarjetas[0].fechaFin;
 const expense=await request('/finanzas/egresos','POST',{monto:10000,categoria:'PROYECTOS',concepto:'Jardín ficticio'});
 await request('/finanzas/egresos/'+expense.data.id+'/activar-cuota','POST',{meses:2});
 const tags2=await request('/zkteco/viviendas/'+id+'/vigencia-tags');
 assert.equal(tags2.data.tarjetas[0].fechaFin,expires);
});
test('Clínica: pacientes, agenda, odontograma y periodontograma funcionan como administrador',async()=>{
 const {win}=dental(),API=win.API;
 assert.equal((await API.request('/patients')).patients.length,8);
 const p=(await API.request('/patients',{method:'POST',body:JSON.stringify({first_name:'Rita',last_name:'Demo',phone:'3300002222'})})).patient;
 const a={patient_id:p.id,start_at:'2030-01-05 09:00:00',end_at:'2030-01-05 10:00:00',resource:'Box 1',professional_name:'Dra. Yerena Riso',status:'confirmed'};
 await API.request('/appointments',{method:'POST',body:JSON.stringify(a)});
 await assert.rejects(API.request('/appointments',{method:'POST',body:JSON.stringify({...a,patient_id:2})}),/Horario ocupado/);
 await API.request('/clinical/1/odontogram',{method:'POST',body:JSON.stringify({tooth:11,phase:'initial',finding:'CARIES',surface:'WHOLE'})});
 await API.request('/clinical/1/periodontal',{method:'POST',body:JSON.stringify({tooth:11,site:'MB',depth_mm:3})});
 const clinical=await API.request('/clinical/1');
 assert.equal(clinical.odontogram.length,1);assert.equal(clinical.periodontal.length,1);
 assert.equal((await API.request('/clinical/catalog/odontogram')).items.length,48);
});
test('Clínica: PDF se guarda, lee y elimina sin fuga de BLOB',async()=>{
 const {win,bytes}=dental(),API=win.API;
 const pdf=new Blob(['%PDF-1.4\nSimulación'],{type:'application/pdf'});
 const uploaded=await win.fetch('demo://isolated/clinical/1/files?category=document&name=prueba.pdf',{method:'POST',body:pdf,headers:{'Content-Type':'application/pdf'}});
 assert.equal(uploaded.status,201);
 const list=(await API.request('/clinical/1')).files;
 assert.equal(list.length,1);
 const file=await win.fetch('demo://isolated/clinical/1/files/'+list[0].id);
 assert.equal(file.status,200);
 assert.ok((await file.blob()).size>0);
 await API.request('/clinical/1/files/'+list[0].id,{method:'DELETE'});
 assert.equal((await API.request('/clinical/1')).files.length,0);
 assert.equal(bytes.size,0);
 const fakeZip=new Blob(['PKnot-a-zip'],{type:'application/zip'});
 const zip=await win.fetch('demo://isolated/clinical/1/files?category=radiograph&name=bad.zip',{method:'POST',body:fakeZip,headers:{'Content-Type':'application/zip'}});
 assert.equal(zip.status,400);
});

test('Proyecto extraordinario reparte centavos exactos y no altera vigencias de TAG',async()=>{
 const {request}=residential(),month=new Date().getMonth()+1,year=new Date().getFullYear();
 const start=year+'-'+String(month).padStart(2,'0')+'-01';
 const expense=await request('/finanzas/egresos','POST',{concepto:'Proyecto sintético',categoria:'PROYECTOS',monto:10000.01});
 assert(expense.ok);
 const created=await request('/finanzas/egresos/'+expense.data.id+'/activar-cuota','POST',{meses:2,fechaInicio:start});
 assert.equal(created.ok,true);
 assert.equal(created.data.conceptos,231*2);
 const duplicate=await request('/finanzas/egresos/'+expense.data.id+'/activar-cuota','POST',{meses:2,fechaInicio:start});
 assert.equal(duplicate.ok,false);
 let cents=0;
 for(let id=1;id<=231;id++){
  const data=await request('/finanzas/pagos-concepto/'+id);
  assert.equal(data.data.EXTRAORDINARIO.length,2);
  for(const charge of data.data.EXTRAORDINARIO)cents+=Math.round(charge.monto*100);
 }
 assert.equal(cents,1000001);
 const houseId=2;
 const tagBefore=(await request('/zkteco/viviendas/'+houseId+'/vigencia-tags')).data.tarjetas[0].fechaFin;
 const pending=(await request('/finanzas/pagos-concepto/'+houseId)).data.EXTRAORDINARIO;
 const blocked=await request('/casa-club/reservas','POST',{casaId:houseId,fecha:'2030-06-15'});
 assert.equal(blocked.ok,false);
 const payment=await request('/finanzas/pagos-concepto','POST',{casaId:houseId,tipoPago:'EXTRAORDINARIO',conceptoId:pending[0].id,monto:pending[0].monto});
 assert.equal(payment.ok,true);
 assert.equal((await request('/finanzas/pagos-concepto','POST',{casaId:houseId,tipoPago:'EXTRAORDINARIO',conceptoId:pending[0].id,monto:pending[0].monto})).ok,false);
 const after=(await request('/zkteco/viviendas/'+houseId+'/vigencia-tags')).data.tarjetas[0].fechaFin;
 assert.equal(after,tagBefore);
 const allowed=await request('/casa-club/reservas','POST',{casaId:houseId,fecha:'2030-06-15'});
 assert.equal(allowed.ok,true,'Una cuota futura no debe bloquear una reserva actual');
});


test('Toda cifra del Inicio, análisis, calles y reporte Excel coincide con el mismo padrón ficticio',async()=>{
 const {request,win}=residential();
 const analysis=(await request('/finanzas/analisis')).data;
 const home=await request('/dashboard');
 const Excel=require('../mision/assets/js/analisis-excel.js');
 const report=Excel.prepararReporte(analysis,'padron');
 assert.equal(analysis.casas,231);
 assert.equal(analysis.viviendas.length,231);
 assert.equal(analysis.viviendas.filter(x=>x.pagada).length,analysis.pagadas);
 assert.equal(analysis.viviendas.filter(x=>!x.pagada).length,analysis.pendientes);
 assert.equal(analysis.pagadas+analysis.pendientes,analysis.casas);
 assert.equal(Math.round(analysis.pagadas/analysis.casas*100),analysis.porcentaje);
 assert.equal(home.kpis.cuotas.alCorriente,analysis.pagadas);
 assert.equal(home.kpis.cuotas.porcentajeAlCorriente,analysis.porcentaje);
 assert.equal(home.kpis.cuotas.total,analysis.casas);
 assert.equal(analysis.calles.reduce((s,c)=>s+c.total,0),231);
 assert.equal(analysis.calles.reduce((s,c)=>s+c.pagadas,0),analysis.pagadas);
 assert(analysis.calles.some((c,i,a)=>c.porcentaje!==a[0].porcentaje),'Las tasas por calle deben ser distintas');
 assert.equal(report.hojas.find(x=>x.nombre==='Desglose por calle').filas.length,analysis.calles.length);
 const streetSheet=report.hojas.find(x=>x.nombre==='Desglose por calle');
 for(const [street,paid,pending,total,pct] of streetSheet.filas){
  const summary=analysis.calles.find(c=>c.calle===street);
  assert.equal(paid,summary.pagadas);assert.equal(pending,summary.pendientes);
  assert.equal(total,summary.total);assert.equal(pct,Math.round(10000*paid/total)/100);
 }
 const pending=analysis.viviendas.find(h=>h.ultimoMesPagado.mes==='Junio'&&h.saldoPendiente>0&&h.tarifaMensual===300);
 assert(pending,'Debe existir una vivienda con adeudo desde julio');
 const year=new Date().getFullYear(),month=new Date().getMonth()+1;
 const expected=Array.from({length:month-6},(_,i)=>7+i).reduce((s,m)=>s+300+((m<month||new Date().getDate()>10)?50:0),0);
 assert.equal(pending.saldoPendiente,expected);
 const current=home.recaudacion.serie.at(-1);
 const state=win.MISION_DEMO.getState();
 const receipts=state.pagos.filter(p=>p.fecha.slice(0,7)===year+'-'+String(month).padStart(2,'0')).reduce((a,p)=>a+p.monto,0);
 const expenses=state.egresos.filter(p=>p.fecha.slice(0,7)===year+'-'+String(month).padStart(2,'0')).reduce((a,p)=>a+p.monto,0);
 assert.equal(current.cuotas,receipts);
 assert.equal(current.egresos,expenses);
 assert.equal(home.recaudacion.totalMes,analysis.ingresosParaBalance);
 assert.equal(home.recaudacion.totalMes,receipts);
 assert.equal(analysis.totalEgresos,expenses);
 assert.equal(current.disponible,analysis.balanceReportado);
 const lastPaid=analysis.viviendas.filter(x=>x.ultimoPago?.monto===300);
 assert(lastPaid.length>60,'Deben aparecer importes $300 en la columna Pagado');
 assert(lastPaid.some(x=>x.estatus==='PAGADO')&&lastPaid.some(x=>x.estatus==='PENDIENTE'));
 const snapshots=home.recaudacion.serie.map(x=>x.cuotas);
 assert(new Set(snapshots).size>=4,'La gráfica de ingresos no puede ser lineal o constante');
});
test('TAGs del simulador muestran estados sincronizados y jamás contactan el C3 real',async()=>{
 const {request,requests}=residential();
 const tags=(await request('/zkteco/tarjetas')).data;
 assert(tags.some(t=>t.enControlador===true&&t.sincronizado===true&&t.puertasAutorizadas===3&&!t.bloqueado));
 assert(tags.some(t=>t.enControlador===false));
 assert(tags.some(t=>t.bloqueado===true));
 const sync=await request('/zkteco/sincronizar','POST',{});
 assert.equal(sync.data.simulado,true);
 assert.equal(requests.length,0);
});


test('Casa Club renderiza el mes actual con fechas ocupadas y permite reservar, aprobar y cancelar de forma ficticia',async()=>{
 const {request,requests}=residential();
 const hoy=new Intl.DateTimeFormat('sv-SE',{timeZone:'America/Mexico_City',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
 const [year,month]=hoy.split('-').map(Number);
 const fin=new Date(Date.UTC(year,month,0)).toISOString().slice(0,10);
 const first=await request('/casa-club/fechas?desde='+hoy.slice(0,7)+'-01&hasta='+fin);
 assert.equal(first.ok,true);assert(Array.isArray(first.ocupadas));assert.equal(first.ocupadas.length,0);
 const paidHouse=(await request('/finanzas/analisis')).data.viviendas.find(x=>x.estatus==='PAGADO');
 assert(paidHouse,'Debe existir una casa ficticia al corriente');
 const created=await request('/casa-club/reservas','POST',{
  casaId:paidHouse.casaId,fecha:hoy,solicitante:'Residente ficticio',telefono:'3300000000',
  correo:'demo@example.test',motivo:'Evento demo',propietario:true});
 assert.equal(created.ok,true);assert(created.data.id);
 const pending=await request('/casa-club/fechas?desde='+hoy.slice(0,7)+'-01&hasta='+fin);
 assert.deepEqual(pending.ocupadas,[{fecha:hoy,estatus:'PENDIENTE'}]);
 const duplicate=await request('/casa-club/reservas','POST',{casaId:paidHouse.casaId,fecha:hoy});
 assert.equal(duplicate.ok,false);
 const my=await request('/casa-club/mias');
 assert.equal(my.ok,true);assert.equal(my.data.length,1);
 assert.equal(my.data[0].estatus,'PENDIENTE');
 const pendingCount=await request('/casa-club/solicitudes-pendientes');
 assert.equal(pendingCount.cantidad,1);
 const approval=await request('/casa-club/administracion/'+created.data.id,'PATCH',{
  accion:'APROBAR',cuotaRecuperacion:700,depositoGarantia:700,limpieza:0,
  fechaLimitePago:hoy});
 assert.equal(approval.ok,true);
 assert.equal((await request('/casa-club/fechas?desde='+hoy+'&hasta='+fin)).ocupadas[0].estatus,'APROBADA');
 const cancelled=await request('/casa-club/reservas/'+created.data.id+'/cancelar','PATCH');
 assert.equal(cancelled.ok,true);
 assert.equal((await request('/casa-club/fechas?desde='+hoy+'&hasta='+fin)).ocupadas.length,0);
 assert.equal(requests.length,0,'El demo no debe contactar servidores reales');
});
test('Casa Club rechaza fechas anteriores a hoy y solicitudes de deudores',async()=>{
 const {request}=residential();
 const local=new Intl.DateTimeFormat('sv-SE',{timeZone:'America/Mexico_City',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
 const ayer=new Date(Date.parse(local+'T12:00:00Z')-86400000).toISOString().slice(0,10);
 const rejected=await request('/casa-club/reservas','POST',{casaId:1,fecha:ayer});
 assert.equal(rejected.ok,false);assert.match(rejected.message,/desde hoy/);
 const owing=(await request('/finanzas/analisis')).data.viviendas.find(v=>v.saldoPendiente>0);
 assert(owing);
 const today=await request('/casa-club/reservas','POST',{casaId:owing.casaId,fecha:local});
 assert.equal(today.ok,false);assert.equal(today.codigo,'ADEUDOS_RESERVA');
 assert(today.adeudos.totales.MANTENIMIENTO>0);
});
