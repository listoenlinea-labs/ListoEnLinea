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
 assert.equal(a.data.casas,48);
 assert.ok(a.data.viviendas.every(h=>h.nombre&&!h.calle.includes('Atotonilco')));
 assert.equal(requests.length,0);
 await assert.rejects(()=>win.fetch('https://api-misionjardines.listoenlinea.host/api/auth/perfil'),/Bloqueado/);
});
test('Pago de mantenimiento liquida deuda y actualiza TAG pero cuotas extra no lo alteran',async()=>{
 const {request}=residential();
 const before=await request('/finanzas/analisis?anio=2026&mes=10'),house=before.data.viviendas.find(h=>h.casaId===6);
 assert.ok(house.saldoPendiente>0);
 const paid=await request('/finanzas/pagos-vivienda','POST',{casaId:6,montoTotal:house.saldoPendiente,anio:new Date().getFullYear(),mes:new Date().getMonth()+1});
 assert.equal(paid.ok,true);
 assert.ok(paid.data.referencia.startsWith('PAGO-DEMO-'));
 const after=await request('/finanzas/analisis?anio=2026&mes=10');
 assert.equal(after.data.viviendas.find(h=>h.casaId===6).saldoPendiente,0);
 const tags=await request('/zkteco/viviendas/6/vigencia-tags'),expires=tags.data.tarjetas[0].fechaFin;
 await request('/finanzas/egresos','POST',{monto:10000,categoria:'PROYECTOS',concepto:'Jardín ficticio'});
 await request('/finanzas/egresos/101/activar-cuota','POST',{meses:2});
 const tags2=await request('/zkteco/viviendas/6/vigencia-tags');
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
