'use strict';
const assert=require('node:assert/strict');
const {test}=require('node:test');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');

const root=path.resolve(__dirname,'../mision');
function browser(){
 const data=new Map();
 const store={getItem:k=>data.has(k)?data.get(k):null,setItem:(k,v)=>data.set(k,String(v)),removeItem:k=>data.delete(k)};
 const location={href:'https://listoenlinea.com/demo/mision/analisis-cuotas.html',replace:()=>{}};
 const window={fetch:async()=>new Response('not mocked',{status:404}),location,localStorage:store,sessionStorage:store};
 const context={window,location,localStorage:store,sessionStorage:store,URL,URLSearchParams,
  Date,Intl,Response,Blob,console,structuredClone,XMLHttpRequest:function XMLHttpRequest(){}};
 context.XMLHttpRequest.prototype.open=function(){};
 vm.createContext(context);
 for(const script of ['demo-bootstrap.js','demo-upgrade.js']){
  vm.runInContext(fs.readFileSync(path.join(root,script),'utf8'),context,{filename:script,timeout:10000});
 }
 return window;
}
const get=async(r)=>{const d=await r.json();assert.equal(d.ok,true,d.message);return d.data};
test('231 viviendas sintéticas con estados diversos y proyectos extraordinarios',async()=>{
 const w=browser(),analysis=await get(await w.fetch('https://demo.invalid/api/finanzas/analisis'));
 assert.equal(analysis.viviendas.length,231);
 assert.equal(analysis.proyectosExtraordinarios.length,2);
 assert(analysis.viviendas.some(v=>v.saldoPendiente>0));
 assert(analysis.viviendas.some(v=>v.saldoPendiente===0));
 assert(analysis.viviendas.some(v=>v.ultimoMesPagado?.mes==='Diciembre'));
 const pay=w.MISION_DEMO.getState().pagos;
 assert(pay.some(p=>p.monto>0));
 assert(pay.every(p=>Number.isInteger(Number(p.monto))));
});
test('recibo manual: emisión, historial, PDF real y eliminación aislada',async()=>{
 const w=browser(),api='https://demo.invalid/api/finanzas/recibos-manuales';
 const before=JSON.stringify(w.MISION_DEMO.getState().pagos);
 const row=await get(await w.fetch(api,{method:'POST',body:JSON.stringify({
  casaId:3,calle:'Rosas',inicialCalle:'R',numeroCasa:'18',nombre:'Persona Ficticia',
  mesFolio:11,anioFolio:2026,conceptoPago:'Mantenimiento',
  mesCubierto:11,anioCubierto:2026,conceptoDetalle:'Noviembre',
  monto:350,formaPago:'TRANSFERENCIA',sello:'PAGADO'
 })}));
 assert.match(row.folio,/^MJ-NOV-2026-[A-F0-9]{10}-R18-M$/);
 assert.equal((await get(await w.fetch(api))).length,1);
 const pdf=await w.fetch(api+'/'+row.id+'/pdf');
 assert.equal(pdf.headers.get('Content-Type'),'application/pdf');
 assert.match(await pdf.text(),/^%PDF-1\.4/);
 await get(await w.fetch(api+'/'+row.id,{method:'DELETE',body:JSON.stringify({folio:row.folio})}));
 assert.equal((await get(await w.fetch(api))).length,0);
 assert.equal(JSON.stringify(w.MISION_DEMO.getState().pagos),before);
});
test('comprobantes de pagos ficticios pueden visualizarse y descargarse en PDF',async()=>{
 const w=browser(),p=w.MISION_DEMO.getState().pagos.find(p=>p.monto>0);
 const uri='https://demo.invalid/api/finanzas/pagos-vivienda/'+p.casaId+'/recibo';
 const details=await get(await w.fetch(uri+'/datos?referencia='+encodeURIComponent(p.referencia)));
 assert.equal(details.monto,p.monto);
 const pdf=await w.fetch(uri+'?referencia='+encodeURIComponent(p.referencia));
 assert.equal(pdf.status,200);
 assert.match(await pdf.text(),/^%PDF-1\.4/);
});
test('inventario ficticio de Controles: 0 inicial, alta, bloqueo, edición y eliminación',async()=>{
 const w=browser(),uri='https://demo.invalid/api/controles-remotos';
 const rows=await get(await w.fetch(uri+'/viviendas'));assert.equal(rows.length,231);
 assert(rows.every(x=>x.controles.length===0));
 const created=await get(await w.fetch(uri+'/viviendas/3/controles',{method:'POST',body:JSON.stringify({
  codigo:'CT-001',descripcion:'Control de prueba',botones:{A:'PORTON_1_ENTRADA'}
 })}));
 assert.equal(created.casaId,3);
 const blocked=await get(await w.fetch(uri+'/controles/'+created.id+'/bloqueo',{
  method:'PATCH',body:JSON.stringify({bloqueado:true})
 }));
 assert.equal(blocked.activo,false);
 const log=await get(await w.fetch(uri+'/logs'));assert(log.length>=2);
 await get(await w.fetch(uri+'/controles/'+created.id,{method:'DELETE'}));
 const after=await get(await w.fetch(uri+'/viviendas'));
 assert.equal(after.find(x=>x.id===3).controles.length,0);
});
