/* Contratos de producción simulados exclusivamente en el navegador.
 * Sin escrituras externas; PDF válido, historial independiente y controles locales.
 */
(()=>{'use strict';
const BASE='https://demo.invalid/api', KEY='lel_mision_copy_demo_extra_v1';
const months=['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
let state;try{state=JSON.parse(localStorage.getItem(KEY))}catch{}
if(!state||typeof state!=='object')state={manual:[],remotes:[],logs:[],next:90000,egresos:[]};
for(const k of ['manual','remotes','logs','egresos'])if(!Array.isArray(state[k]))state[k]=[];
const save=()=>localStorage.setItem(KEY,JSON.stringify(state));
const fixtures=()=>window.MISION_DEMO.getState();
const houses=()=>fixtures().casas;
const house=id=>houses().find(x=>Number(x.id)===Number(id));
const ymd=()=>new Intl.DateTimeFormat('sv-SE',{timeZone:'America/Mexico_City',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
const nice=n=>Math.round(Number(n)||0).toLocaleString('es-MX');
const money=n=>Math.round(Number(n)||0);
const fail=message=>({ok:false,message});
const ok=(data,extra={})=>({ok:true,data,...extra});
const norm=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^\x20-\x7e]/g,' ').trim();
const id=()=>++state.next;
const getPeriods=h=>fixtures().pagos.filter(x=>x.casaId===h.id&&x.monto>0).flatMap(x=>Array.isArray(x.periodos)&&x.periodos.length?x.periodos:[{mes:(['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'][Number(String(x.periodo||'').slice(5,7))-1]||''),anio:Number(String(x.periodo||'').slice(0,4))}])
 .filter(x=>x.mes&&x.anio).map(x=>({valor:String(x.anio)+'-'+String(['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'].indexOf(x.mes.toUpperCase())+1).padStart(2,'0'),etiqueta:x.mes+' '+x.anio}));
function receipt(h,query){
 const all=fixtures().pagos.filter(p=>p.casaId===h.id&&Number(p.monto)>0);
 const period=query.get('periodo'),ref=query.get('referencia');
 const match=ref?all.find(p=>p.referencia===ref):period?all.find(p=>(p.periodo===period||(p.periodos||[]).some(x=>String(x.anio)+'-'+String(['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'].indexOf(x.mes)+1).padStart(2,'0')===period))):all.at(-1);
 if(!match)return null;
 const date=String(match.fecha||ymd()),m=Number(date.slice(5,7))||1,y=Number(date.slice(0,4))||2026;
 const p=Array.isArray(match.periodos)&&match.periodos.length?match.periodos:[{mes:['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'][Number(String(match.periodo||'').slice(5,7))-1]||'NOVIEMBRE',anio:Number(String(match.periodo||'').slice(0,4))||y}];
 const first=p[0],last=p.at(-1);
 const token=Array.from((match.referencia+':'+h.id),c=>c.charCodeAt(0)).reduce((a,b)=>(a*33+b)>>>0,5381).toString(16).toUpperCase().padStart(10,'0').slice(-10);
 const folio='MJ-'+months[m-1]+'-'+y+'-'+token+'-'+norm(h.calle).charAt(0).toUpperCase()+h.numero+'-M';
 const periodLabel=x=>x.mes+' '+x.anio;
 return {id:match.id,folio,referencia:match.referencia,calle:h.calle,numero:h.numero,nombre:h.nombre,monto:money(match.monto),pagoAnual:Boolean(match.pagoAnual),periodos:p,
   periodo:p.length>1?periodLabel(first)+' a '+periodLabel(last):periodLabel(first),fecha:date,fechaPago:date,sello:'PAGADO · DEMOSTRACIÓN',
   correo:h.correo,telefonos:h.telefono?[{numero:'52'+String(h.telefono).replace(/\D/g,'').slice(-10),nombre:h.nombre}]:[],
   periodosDisponibles:Array.from(new Map(getPeriods(h).map(x=>[x.valor,x])).values()).sort((a,b)=>b.valor.localeCompare(a.valor)),
   periodoSeleccionado:period||getPeriods(h).at(-1)?.valor||'',formaPago:match.formaPago||'TRANSFERENCIA'};
}
const pdfEscape=s=>norm(s).replace(/[\\()]/g,'\\$&');
function createPDF(r){
 const lines=['LISTO EN LINEA | FRACCIONAMIENTO DEMO','RECIBO DE PAGO - DOCUMENTO FICTICIO',
 'Folio: '+r.folio,'Fecha de emision: '+(r.fechaEmision||r.fecha||ymd()),
 'Vivienda: '+r.calle+' '+(r.numeroCasa||r.numero),'Residente: '+r.nombre,
 'Concepto: '+(r.conceptoPago||'Mantenimiento'),'Periodo: '+(r.periodo||r.mesTexto+' '+r.anioCubierto||''),
 'Detalle: '+(r.conceptoDetalle||''),'Forma de pago: '+(r.formaPago||'TRANSFERENCIA'),
 'Monto recibido: $'+nice(r.monto)+' MXN','Estado: '+(r.sello||'PAGADO'),
 'SOLO DEMOSTRACION. Sin validez fiscal ni comprobante bancario.',
 'No refleja transacciones reales, bancos o dispositivos fisicos.'];
 let body='BT /F1 12 Tf 52 770 Td 16 TL '+lines.map((s,i)=>'('+pdfEscape(s).slice(0,112)+') Tj'+(i===lines.length-1?'':' T*')).join('\n')+' ET';
 const objs=[
 '<< /Type /Catalog /Pages 2 0 R >>',
 '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
 '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>',
 '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
 '<< /Length '+body.length+' >>\nstream\n'+body+'\nendstream'
 ];
 let result='%PDF-1.4\n',offset=[0];
 objs.forEach((obj,i)=>{offset.push(result.length);result+=(i+1)+' 0 obj\n'+obj+'\nendobj\n'});
 const start=result.length;result+='xref\n0 '+(objs.length+1)+'\n0000000000 65535 f \n';
 for(let i=1;i<=objs.length;i++)result+=String(offset[i]).padStart(10,'0')+' 00000 n \n';
 result+='trailer\n<< /Size '+(objs.length+1)+' /Root 1 0 R >>\nstartxref\n'+start+'\n%%EOF';
 return new Blob([result],{type:'application/pdf'});
}
const headers={'Cache-Control':'no-store','Content-Type':'application/json'};
const response=(value,status=200)=>new Response(JSON.stringify(value),{status,headers});
const file=(blob,extra={})=>new Response(blob,{status:200,headers:{'Content-Type':blob.type,...extra}});
const log=(accion,control,casaId)=>{state.logs.unshift({id:id(),accion,controlId:control?.id,casaId:casaId||control?.casaId,actorId:1,createdAt:new Date().toISOString()});save()};
const remotes=()=>houses().map(h=>({id:h.id,calle:h.calle,calleCorrecta:h.calle,numero:h.numero,controles:state.remotes.filter(x=>x.casaId===h.id).sort((a,b)=>b.id-a.id)}));
function handle(uri,method,body,query){
 const parts=uri.split('/').filter(Boolean);
 if(uri==='/controles-remotos/viviendas')return ok(remotes(),{integracionFisica:false,mensaje:'Simulación local; sin control físico'});
 if(uri==='/controles-remotos/logs')return ok(state.logs.slice(0,150));
 if(parts[0]==='controles-remotos'){
  const h=house(Number(parts[2])),r=state.remotes.find(c=>c.id===Number(parts[2]));
  if(parts[1]==='viviendas'&&parts[3]==='controles'&&method==='POST'){
   if(!h)return fail('Vivienda no encontrada');
   const codigo=String(body.codigo||'').trim();if(!codigo)return fail('Captura un código de control');
   if(state.remotes.some(c=>c.codigo.toLowerCase()===codigo.toLowerCase()))return fail('Ese código ya existe');
   const c={id:id(),casaId:h.id,codigo,descripcion:String(body.descripcion||''),fechaFin:body.fechaFin||null,
     botones:body.botones||{},activo:true,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};
   state.remotes.push(c);log('ALTA',c);return ok(c,{message:'Control ficticio guardado sin contacto con receptor físico'});
  }
  if(parts[1]==='viviendas'&&parts[3]==='bloqueo'){
   if(!h)return fail('Vivienda no encontrada');
   const list=state.remotes.filter(c=>c.casaId===h.id);list.forEach(c=>c.activo=!body.bloqueado);log(body.bloqueado?'BLOQUEO_VIVIENDA':'ACTIVACION_VIVIENDA',null,h.id);
   return ok({total:list.length},{message:'Controles actualizados solo en este navegador'});
  }
  if(parts[1]==='viviendas'&&parts[3]==='vigencia'){
   if(!h)return fail('Vivienda no encontrada');state.remotes.filter(c=>c.casaId===h.id).forEach(c=>c.fechaFin=body.fechaFin||null);
   log('VIGENCIA_VIVIENDA',null,h.id);return ok({}, {message:'Vigencias ficticias actualizadas'});
  }
  if(parts[1]==='controles'&&!r)return fail('Control inexistente');
  if(parts[1]==='controles'&&parts[3]==='bloqueo'){r.activo=!Boolean(body.bloqueado);r.updatedAt=new Date().toISOString();log(r.activo?'ACTIVACION':'BLOQUEO',r);return ok(r,{message:'Estado ficticio actualizado'})}
  if(parts[1]==='controles'&&method==='PATCH'){
   if(!house(Number(body.casaId||r.casaId)))return fail('Vivienda inválida');
   if(state.remotes.some(c=>c.id!==r.id&&c.codigo.toLowerCase()===String(body.codigo).toLowerCase()))return fail('Código duplicado');
   Object.assign(r,body,{casaId:Number(body.casaId||r.casaId),updatedAt:new Date().toISOString()});log('EDICION',r);
   return ok(r,{message:'Control ficticio actualizado'});
  }
  if(parts[1]==='controles'&&method==='DELETE'){state.remotes=state.remotes.filter(c=>c.id!==r.id);log('ELIMINACION',r);return ok({deleted:true},{message:'Control eliminado del inventario ficticio'})}
 }
 if(uri==='/finanzas/recibos-manuales'&&method==='GET'){
  const offset=Math.max(0,Number(query.get('offset'))||0),rows=state.manual.slice().sort((a,b)=>b.id-a.id);
  return ok(rows.slice(offset,offset+30),{mas:offset+30<rows.length});
 }
 if(uri==='/finanzas/recibos-manuales'&&method==='POST'){
  const required=['calle','numeroCasa','nombre','conceptoPago','conceptoDetalle','sello','inicialCalle'];
  if(required.some(k=>!String(body[k]||'').trim()))return fail('Completa todos los campos del recibo manual');
  const amount=Number(body.monto);
  if(!Number.isSafeInteger(amount)||amount<=0)return fail('El monto debe ser un número entero positivo');
  const n=id(),token=n.toString(16).toUpperCase().padStart(10,'0'),mf=Number(body.mesFolio)||new Date().getMonth()+1;
  const row={...body,id:n,monto:amount,folio:'MJ-'+months[mf-1]+'-'+body.anioFolio+'-'+token+'-'+body.inicialCalle+body.numeroCasa+'-M',
   referencia:'DEMO-MANUAL-'+n,fechaEmision:ymd(),creadoEn:new Date().toISOString(),
   mesTexto:['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'][Number(body.mesCubierto)-1]};
  state.manual.push(row);save();return ok(row,{message:'Recibo de demostración creado; sin modificar cuotas ni pagos'});
 }
 if(parts[0]==='finanzas'&&parts[1]==='recibos-manuales'&&parts[2]){
  const r=state.manual.find(x=>x.id===Number(parts[2]));if(!r)return fail('Recibo inexistente');
  if(parts[3]==='pdf')return {blob:createPDF({...r,periodo:r.mesTexto+' '+r.anioCubierto})};
  if(method==='DELETE'){if(body.folio!==r.folio)return fail('Folio de confirmación incorrecto');state.manual=state.manual.filter(x=>x!==r);save();return ok({deleted:true})}
  return ok(r);
 }
 if(parts[0]==='finanzas'&&parts[1]==='pagos-vivienda'&&parts[3]==='recibo'){
  const h=house(Number(parts[2]));if(!h)return fail('Vivienda inexistente');
  const r=receipt(h,query);if(!r)return fail('Esta vivienda no tiene pagos registrados; no puede emitirse un recibo');
  if(parts[4]==='datos')return ok(r);
  if(parts[4]==='vista')return ok({url:'/api/recibo-vista/demo-'+r.id});
  if(parts.length===4)return {blob:createPDF(r)};
 }
 if(parts[0]==='finanzas'&&parts[1]==='recibos-masivos'&&parts[2]==='periodos'){
  const all=fixtures().pagos.filter(x=>x.monto>0).map(x=>String(x.fecha).slice(0,7));
  return ok({periodos:[...new Set(all)].sort()});
 }
 if(parts[0]==='finanzas'&&parts[1]==='recibos-masivos'&&parts[2]==='zip'){
  const p=query.get('periodo');if(!/^\d{4}-\d{2}$/.test(p||''))return fail('Elige un mes válido');
  const rows=fixtures().pagos.filter(x=>String(x.fecha).slice(0,7)===p&&x.monto>0).map(x=>receipt(house(x.casaId),new URLSearchParams({referencia:x.referencia}))).filter(Boolean);
  return {zip:rows};
 }
 if(uri==='/finanzas/drive/status')return ok({conectado:false,folderConfigured:false,simulado:true});
 if(uri.startsWith('/finanzas/drive/'))return fail('Google Drive no está conectado en la demostración. Usa la descarga local de Excel o ZIP.');
 if(uri==='/finanzas/viviendas/registrar-residente')return fail('Vivienda inválida');
 if(parts[0]==='finanzas'&&parts[1]==='viviendas'&&parts[3]==='registrar-residente'&&method==='POST'){
  return fail('El padrón es sintético; para editarlo, usa el módulo de residentes de demostración.');
 }
 if(parts[0]==='finanzas'&&parts[1]==='viviendas'&&parts[3]==='contacto-recibo'&&method==='PATCH'){
  return ok({valor:String(body.valor||body.telefono||body.correo||'')},{message:'Contacto guardado solo en el simulador'});
 }
 if(parts[0]==='finanzas'&&parts[1]==='pagos-vivienda'&&parts[3]==='recibo'&&parts[4]==='destino-correo')return ok({correo:house(parts[2])?.correo||''});
 if(parts[0]==='finanzas'&&parts[1]==='pagos-vivienda'&&parts[3]==='recibo'&&parts[4]==='enviar-correo')return fail('La demo no envía correos reales. Descarga el PDF y compártelo manualmente.');
 if(parts[0]==='finanzas'&&parts[1]==='egresos'&&parts[2]==='resumen-mensual'&&method==='PUT')return ok({updated:true},{message:'Importe simulado guardado'});
 return null;
}
const original=window.fetch.bind(window);
window.fetch=async function(input,init={}){
 const url=new URL(typeof input==='string'?input:input.url,location.href);
 if(url.hostname!=='demo.invalid'||!url.pathname.startsWith('/api/'))return original(input,init);
 const method=String(init.method||input?.method||'GET').toUpperCase();
 let body={};try{body=JSON.parse(init.body||'{}')}catch{}
 let result;try{result=handle(url.pathname.slice(4),method,body,url.searchParams)}catch(e){result=fail(e.message)}
 if(result===null)return original(input,init);
 if(result?.blob)return file(result.blob);
 if(result?.zip){
  if(!window.JSZip)return response(fail('El generador ZIP no está cargado'),400);
  const zip=new JSZip();for(const r of result.zip)zip.file(r.folio+'.pdf',await createPDF(r).arrayBuffer());
  const blob=await zip.generateAsync({type:'blob',compression:'DEFLATE'});return file(blob,{'Content-Type':'application/zip','X-Recibos-Count':String(result.zip.length)});
 }
 return response(result,result?.ok===false?400:200);
};
window.MISION_DEMO_UPGRADE={getState:()=>structuredClone(state),pdf:createPDF};
})();
