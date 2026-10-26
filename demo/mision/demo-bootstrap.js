/* Entorno público aislado. No conecta con C3, MySQL, correo ni banca. */
(()=>{'use strict';
const ORIGIN='https://demo.invalid', API=ORIGIN+'/api', KEY='lel_mision_copy_demo_v1';
const monthName=['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'];
const now=new Date(),yyyy=now.getFullYear(),mm=now.getMonth()+1,period=(y,m)=>y*12+m-1;
const curr=period(yyyy,mm),pad=n=>String(n).padStart(2,'0'),date=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const longDate=date(now),yearMonth=i=>String(Math.floor(i/12))+'-'+pad(i%12+1);
const message='DEMO: el dispositivo, pago, notificación o servicio externo no fue contactado.';
const owners=['Elena Fernández','Rodrigo Sánchez','Paola Flores','Carlos Aguilar','Mariana Solís','David Romero','Andrea Luna','Gabriel Navarro','Silvia Vázquez','Laura Campos','José Rivera','Sofía Moreno'];
const streetList=['Rosas','Gardenias','Magnolias','Claveles','Azucenas','Jardines','Camelias','Orquídeas'];
function fixture(){
 const casas=Array.from({length:48},(_,i)=>({id:i+1,calle:streetList[Math.floor(i/6)],calleCorrecta:streetList[Math.floor(i/6)],numero:11+i%6+Math.floor(i/6)*40,nombre:owners[i%owners.length],cuota: i%11===0?150:300,paidThrough:curr-(i%5===0?2:i%3===0?1:0),credito:0,exento:i%13===0,permisosAcceso:{},telefono:'330000'+pad(i+21)+'00',correo:'residente'+(i+1)+'@example.test'}));
 const tags=casas.map((c,i)=>({id:i+1,casaId:c.id,numeroTarjeta:'DEMO'+String(10000+i),nombreDispositivo:'TAG '+String(i+1),fechaInicio:'2026-01-01',fechaFin:date(new Date(yyyy,mm+(c.paidThrough<curr?-1:0),10)),activo:c.paidThrough===curr,fechaFinGuardada:date(new Date(yyyy,mm+1,10)),fisicamenteObservado:true}));
 return {casas,tags,accesos:[],visitas:[{id:1,casaId:1,nombre:'Gabriela Ramos',placa:'DEM-001',motivo:'Visita familiar',estado:'PROGRAMADA',fecha:longDate,hora:'11:30',codigo:'VIS-DEMO-0001'}],pagos:[],reportes:[],egresos:[],reservas:[],cuotasExtra:[],incidentes:[],cuentas:[],logs:[],lastId:100};
}
let state;try{state=JSON.parse(localStorage.getItem(KEY))}catch{}if(!state?.casas)state=fixture();
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){console.warn('Sin almacenamiento persistente',e)}};
const byId=id=>state.casas.find(c=>Number(c.id)===Number(id)),byTag=id=>state.tags.find(t=>Number(t.id)===Number(id));
const cap=n=>Math.max(0,Math.round((Number(n)||0)*100)/100);
const overdue=i=>i<curr||(i===curr&&now.getDate()>10);
const periodCost=(c,i)=>c.cuota+(overdue(i)&&!c.exento?50:0);
const debt=c=>{let total=0;for(let i=c.paidThrough+1;i<=curr;i++)total+=periodCost(c,i);return cap(Math.max(0,total-(c.credito||0)))};
const dates=c=>yearMonth(c.paidThrough);
const dueEnd=c=>{const y=Math.floor(c.paidThrough/12),m=c.paidThrough%12;return date(new Date(y,m+1,10))};
function advance(c,money){
 let total=cap((c.credito||0)+cap(money)),n=0;
 for(let i=c.paidThrough+1;i<c.paidThrough+37;i++){
  const cost=periodCost(c,i);if(total+0.00001<cost)break;
  total=cap(total-cost);n++;
 }
 c.paidThrough+=n;c.credito=total;
 if(n)state.tags.filter(t=>t.casaId===c.id).forEach(t=>{t.fechaFin=dueEnd(c);if(debt(c)===0)t.activo=true});
 return n;
}
const token='SIMULACION_PUBLICA_SIN_AUTENTICACION',admin={id:1,nombre:'Administrador',apellidoPaterno:'Demo',apellidoMaterno:'',correo:'admin@example.test',telefono:'3300000000',rol:{id:1,nombre:'ADMINISTRADOR'},casa:state.casas[0],roles:['ADMINISTRADOR'],administrador:true};
try{localStorage.setItem('misionJardinesToken',token);localStorage.setItem('misionJardinesUsuario',JSON.stringify(admin));sessionStorage.setItem('misionJardinesToken',token)}catch{}
window.MJ_API_URL=API;window.MJ_TOKEN=token;window.MJ_SHELL_MODE=false;
const ok=(data={},extra={})=>({ok:true,data,...extra});
const houses=()=>state.casas.map(c=>({...c,condominos:[{nombre:c.nombre,telefono:c.telefono,correo:c.correo}],tarifaMensual:c.cuota,cuotaPorCobrar:c.cuota}));
const card=t=>({id:t.id,numeroTarjeta:t.numeroTarjeta,numero:t.numeroTarjeta,numeroTarjetaNormalizado:t.numeroTarjeta,fechaInicio:t.fechaInicio,fechaFin:t.fechaFin,activo:t.activo,estado:t.activo?'ACTIVO':'INACTIVO',sincronizado:true,ultimaLectura:new Date().toISOString(),fisicamenteObservado:true,casaId:t.casaId,nombreDispositivo:t.nombreDispositivo});
function analisis(){
 const viviendas=state.casas.map(c=>{const tags=state.tags.filter(t=>t.casaId===c.id).map(card);const ultimoMesPagado={mes:monthName[c.paidThrough%12][0]+monthName[c.paidThrough%12].slice(1).toLowerCase(),anio:Math.floor(c.paidThrough/12),pagoAnual:false};const last=[...state.pagos].reverse().find(p=>p.casaId===c.id);return {casaId:c.id,calle:c.calle,numero:c.numero,nombre:c.nombre,estatus:debt(c)?'PENDIENTE':'PAGADO',saldoPendiente:debt(c),tarifaMensual:c.cuota,ultimoMesPagado,ultimoPago:last?{monto:last.monto,fecha:last.fecha}:{monto:0},tags:{detalle:tags,controlesNoEnlazados:[]},tagDiagnostico:{tarjetas:tags},exencionesRecargo:c.exento?[{desde:yearMonth(curr),hasta:null}]:[]};});
 const pagadas=viviendas.filter(v=>v.estatus==='PAGADO').length, ingresos=state.pagos.reduce((s,p)=>s+p.monto,0),egresos=state.egresos.reduce((s,e)=>s+e.monto,0);
 const calles=streetList.map(calle=>{const a=viviendas.filter(v=>v.calle===calle),done=a.filter(v=>v.estatus==='PAGADO').length;return {calle,total:a.length,pagadas:done,pendientes:a.length-done,porcentaje:Math.round(done/a.length*100)}});
 const other={EXTRAORDINARIO:viviendas.map(v=>({...v,saldoPendiente:state.cuotasExtra.reduce((s,e)=>s+e.monto/state.casas.length,0),estatus:state.cuotasExtra.length?'PENDIENTE':'PAGADO'})),CASA_CLUB:viviendas.map(v=>({...v,saldoPendiente:0,estatus:'PAGADO'}))};
 return {casas:viviendas.length,pagadas,pendientes:viviendas.length-pagadas,porcentaje:Math.round(pagadas/viviendas.length*100),esCargaHistorica:false,ingresosParaBalance:ingresos,ingresosReportados:{mantenimiento:ingresos,extraordinarios:0,casaClub:0},ingresosAdicionales:0,saldoInicial:0,totalEgresos:egresos,balanceReportado:ingresos-egresos,casaClub:{recuperacion:0,limpieza:0,garantiasRecibidas:0,garantiasDevueltas:0},calles,avisoPadron:'Datos totalmente ficticios de un entorno de prueba',ingresosHistoricos:0,manualesCasaClub:0,cobrosCuotasRegistrados:ingresos,avisoConciliacion:'Simulación sin verificación bancaria real',egresosCategorias:Object.fromEntries(state.egresos.map(e=>[e.categoria,e.monto])),egresos:state.egresos,viviendas,viviendasConceptos:other};
}
const debug=(uri,input)=>state.logs.push({fecha:new Date().toISOString(),uri,accion:input.method||'GET'});
function handle(uri,method,body,query){
 const parts=uri.split('/').filter(Boolean),h=byId(body.casaId||body.id);
 if(uri==='/auth/perfil'||uri==='/auth/me')return {ok:true,usuario:{...admin,casa:state.casas[0]},user:admin};
 if(uri==='/casas'||uri==='/viviendas')return ok(houses(),{casas:houses(),viviendas:houses()});
 if(uri==='/viviendas/mias')return ok([houses()[0]],{viviendas:[houses()[0]]});
 if(uri==='/calles')return ok(streetList,{calles:streetList});
 if(uri.startsWith('/casas/')&&uri.endsWith('/accesos')&&method==='PATCH'){const c=byId(parts[1]);c.permisosAcceso[body.acceso]=body.habilitado;save();return ok(c)}
 if(uri==='/accesos'&&method==='GET')return ok(state.accesos,{data:state.accesos});
 if(uri==='/accesos'&&method==='POST'){const c=byId(body.casaId)||state.casas[0];const entry={id:++state.lastId,casa:c,fechaEntrada:new Date().toISOString(),estado:'DENTRO',...body};state.accesos.unshift(entry);save();return ok(entry)}
 if(uri.startsWith('/accesos/')&&uri.endsWith('/salida')){const entry=state.accesos.find(x=>x.id===Number(parts[1]));if(entry){entry.estado='SALIO';entry.fechaSalida=new Date().toISOString()}save();return ok(entry)}
 if(uri.startsWith('/dashboard')){
  const fin=analisis(),total=state.casas.length,vis=state.visitas.length,inside=state.accesos.filter(a=>a.estado==='DENTRO').length;
  return ok({vista:'ADMINISTRADOR',fuentes:{cuotas:true,visitas:true,accesos:true,residentes:true,viviendas:true},kpis:{cuotas:{porcentajeAlCorriente:fin.porcentaje,alCorriente:fin.pagadas,total},visitas:{hoy:vis,programadas:vis,enCurso:inside},accesos:{activos:inside,entradasHoy:state.accesos.length},residentes:{activos:total,viviendasOcupadas:total,viviendasTotales:total}},
  recaudacion:{totalMes:fin.ingresosParaBalance,variacionPorcentaje:0,serie:[{anio:yyyy,mes:mm,ingresos:fin.ingresosParaBalance,egresos:fin.totalEgresos,disponible:fin.balanceReportado,monto:fin.ingresosParaBalance}]},periodo:{actual:{etiqueta:monthName[mm-1]+' '+yyyy}},eventos:[],eventosProximos7Dias:[],actividad:state.accesos.slice(0,8),operativo:{visitas:state.visitas,accesos:state.accesos},generadoEn:new Date().toISOString()});
 }
 if(uri==='/finanzas/analisis')return ok(analisis());
 if(uri==='/finanzas/egresos'&&method==='POST'){const e={id:++state.lastId,concepto:body.concepto||'Egreso demostrativo',categoria:body.categoria||'OPERACION',monto:cap(body.monto),fecha:body.fecha||longDate,referencia:body.referencia||'DEMO'};state.egresos.push(e);save();return ok(e)}
 if(uri.startsWith('/finanzas/egresos/')&&uri.endsWith('/activar-cuota')){state.cuotasExtra.push({id:++state.lastId,egresoId:Number(parts[2]),meses:Number(body.meses)||1,monto:state.egresos.find(e=>e.id===Number(parts[2]))?.monto||0});save();return ok({creada:true})}
 if(uri.startsWith('/finanzas/viviendas/')&&uri.endsWith('/cuota-por-cobrar')){const c=byId(parts[2]);c.cuota=cap(body.cuotaPorCobrar);c.exento=Boolean(body.sinRecargo);save();return ok(c)}
 if(uri.startsWith('/finanzas/pagos-vivienda/')&&uri.endsWith('/historial'))return ok(state.pagos.filter(p=>p.casaId===Number(parts[2])));
 if(uri.startsWith('/finanzas/pagos-vivienda/')&&uri.endsWith('/estado-c3')){const t=state.tags.filter(x=>x.casaId===Number(parts[2]));return ok({tags:t.length,sincronizacion:'COMPLETADO',fechaFinal:t[0]?.fechaFin,fechasTags:t.map(x=>({fechaFinal:x.fechaFin}))})}
 if(uri.startsWith('/finanzas/pagos-vivienda/')&&uri.endsWith('/cotizar')){const c=byId(parts[2]),targetYear=+query.get('anio')||yyyy,targetMonth=+query.get('mes')||mm,desired=period(targetYear,targetMonth),months=Math.max(1,desired-c.paidThrough);const periods=Array.from({length:months},(_,i)=>({mes:monthName[(c.paidThrough+i+1)%12],anio:Math.floor((c.paidThrough+i+1)/12),registrable:true}));return ok({tarifaMensual:c.cuota,ultimoMesPagado:{mes:monthName[c.paidThrough%12],anio:Math.floor(c.paidThrough/12)},meses:months,desde:periods[0]&&{nombre:periods[0].mes,anio:periods[0].anio},hasta:periods.at(-1)&&{nombre:periods.at(-1).mes,anio:periods.at(-1).anio},periodos:periods,montoSugerido:periods.reduce((sum,_,i)=>sum+periodCost(c,c.paidThrough+i+1),0),montoMinimo:periods.reduce((sum,_,i)=>sum+periodCost(c,c.paidThrough+i+1),0),montoMaximo:periods.reduce((sum,_,i)=>sum+periodCost(c,c.paidThrough+i+1),0),fechaFinObjetivo:date(new Date(targetYear,targetMonth,10)),bloqueado:false,requiereRevision:false,requiereConciliacionTarifa:false})}
 if(uri==='/finanzas/pagos-vivienda'&&method==='POST'){const c=byId(body.casaId);if(!c)return {ok:false,message:'Casa inexistente'};const monto=cap(body.montoTotal??body.monto??body.importe);if(!(monto>0))return {ok:false,message:'El importe debe ser positivo.'};const previo=c.paidThrough;advance(c,monto);if(body.pagoAnual&&body.anio){const last=period(Number(body.anio),12);if(c.paidThrough<last)return {ok:false,message:'El monto no alcanza para cubrir los meses pendientes del pago anual.'};c.paidThrough=last;}const p={id:++state.lastId,casaId:c.id,monto,fecha:longDate,referencia:'PAGO-DEMO-'+state.lastId,concepto:'MANTENIMIENTO',pagoAnual:Boolean(body.pagoAnual)};state.pagos.push(p);save();return {ok:true,data:{referencia:p.referencia,pago:p,fechaFinObjetivo:dueEnd(c),meses:c.paidThrough-previo},message:'Pago ficticio registrado. TAGs actualizados únicamente en el simulador.'}}
 if(uri.startsWith('/finanzas/pagos-concepto'))return ok({EXTRAORDINARIO:[],CASA_CLUB:[]});
 if(uri.startsWith('/zkteco/estado'))return ok({modelo:'C3-200 (simulado)',deviceName:'C3-200 · Demo',lockCount:2,firmware:'DEMO',tarjetas:state.tags.length,escrituraUsuarios:'SIMULADO',inventarioAuto:{lastError:null}});
 if(uri==='/zkteco/sincronizar')return ok({noObservados:0,noObservadosDetalle:[],sincronizado:true,message:message});
 if(uri.startsWith('/zkteco/viviendas/')&&uri.endsWith('/vigencia-tags')){const c=byId(parts[2]);const tags=state.tags.filter(t=>t.casaId===c.id);if(method==='POST'||method==='PATCH'||method==='PUT'){tags.forEach(t=>t.fechaFin=body.fechaFin||body.fechaFinNueva||t.fechaFin);save()}return ok({vigenciaMantenimiento:dueEnd(c),tarjetas:tags.map(card)})}
 if(uri.startsWith('/zkteco/viviendas/')&&uri.endsWith('/tarjetas')&&method==='POST'){const c=byId(parts[2]),tag={id:++state.lastId,casaId:c.id,numeroTarjeta:body.numeroTarjeta||body.numero||'DEMO'+state.lastId,fechaInicio:body.fechaInicio||longDate,fechaFin:body.fechaFin||dueEnd(c),activo:true,nombreDispositivo:body.nombreDispositivo||'TAG de prueba'};state.tags.push(tag);save();return ok(card(tag))}
 if(uri==='/zkteco/viviendas'){let cs=state.casas.slice();if(query.get('calle'))cs=cs.filter(c=>c.calle===query.get('calle'));if(query.get('numero'))cs=cs.filter(c=>String(c.numero).includes(query.get('numero')));if(query.get('casaId'))cs=cs.filter(c=>String(c.id)===query.get('casaId'));const tag=query.get('tag');if(tag)cs=cs.filter(c=>state.tags.some(t=>t.casaId===c.id&&t.numeroTarjeta.includes(tag)));const total=cs.length,page=Math.max(1,Number(query.get('pagina'))||1),limit=Math.max(1,Number(query.get('limite'))||50);const data=cs.slice((page-1)*limit,page*limit).map(c=>({...c,tarjetas:state.tags.filter(t=>t.casaId===c.id).map(card),controlesNoEnlazados:[]}));return ok({rows:data,pagination:{page,limit,total,totalPages:Math.ceil(total/limit),hasPrev:page>1,hasNext:page*limit<total}})}
 if(uri==='/zkteco/tarjetas')return ok(state.tags.map(card));
 if(uri.startsWith('/zkteco/tarjetas/')){const tag=byTag(parts[2]);if(!tag)return {ok:false,message:'TAG inexistente'};if(method==='DELETE'){state.tags=state.tags.filter(t=>t!==tag)}else if(method==='PATCH'||method==='PUT'){tag.fechaFin=body.fechaFin||tag.fechaFin;if(body.activo!==undefined)tag.activo=body.activo;if(body.casaId)tag.casaId=Number(body.casaId)}save();return ok(card(tag))}
 if(uri==='/zkteco/logs')return ok([]);
 if(uri==='/zkteco/calles')return ok(streetList.map(calle=>({calle,total:state.casas.filter(c=>c.calle===calle).length})));
 if(uri==='/zkteco/pluma')return ok({simulado:true,accion:body.accion||'ABRIR',message:message});
 if(uri.startsWith('/casa-club/fechas'))return ok(state.reservas.map(r=>({fecha:r.fecha,estatus:r.estado})));
 if(uri==='/casa-club/mias'||uri==='/casa-club/administracion')return ok(state.reservas);
 if(uri==='/casa-club/solicitudes-pendientes')return ok(state.reservas.filter(r=>r.estado==='PENDIENTE'));
 if(uri==='/casa-club/reservas'&&method==='POST'){const c=byId(body.casaId)||state.casas[0];if(debt(c)||state.cuotasExtra.length)return {ok:false,message:'Reserva bloqueada por adeudos de mantenimiento o cuotas extraordinarias.'};if(state.reservas.some(r=>r.fecha===body.fecha&&r.estado!=='CANCELADA'))return {ok:false,message:'La fecha ya está reservada'};const entry={id:++state.lastId,casaId:c.id,casa:c,fecha:body.fecha,estado:'PENDIENTE',...body};state.reservas.push(entry);save();return ok(entry)}
 if(uri.startsWith('/casa-club/')&&parts.length>=3&&(method==='PATCH'||method==='PUT')){const entry=state.reservas.find(r=>r.id===Number(parts[2]));if(entry)entry.estado=parts[3]==='cancelar'?'CANCELADA':body.accion==='APROBAR'?'APROBADA':body.accion==='RECHAZAR'?'RECHAZADA':entry.estado;save();return ok(entry)}
 if(uri==='/visitas'&&method==='GET')return ok(state.visitas,{visitas:state.visitas});
 if(uri==='/visitas'&&method==='POST'){const entry={id:++state.lastId,fecha:longDate,estado:'PROGRAMADA',...body};state.visitas.push(entry);save();return ok(entry)}
 if(uri.startsWith('/visitas/')&&method==='DELETE'){state.visitas=state.visitas.filter(v=>v.id!==Number(parts[1]));save();return ok({deleted:true})}
 if(uri.startsWith('/pagos/config'))return ok({banco:'Banco Ejemplo (simulado)',beneficiario:'BENEFICIARIO DEMO',cuenta:'000000000000',clabe:'000000000000000000',tarjeta:'0000000000000000',referencia:'DEMO',saldoPendiente:debt(state.casas[0])});
 if(uri.startsWith('/pagos/adeudos'))return ok({saldoPendiente:debt(state.casas[0]),saldoAFavor:state.casas[0].credito,estado:debt(state.casas[0])?'PENDIENTE':'PAGADO'});
 if(uri.startsWith('/pagos/mios'))return ok(state.pagos.filter(p=>p.casaId===state.casas[0].id));
 if(uri.startsWith('/pagos/extraordinarias'))return ok(state.cuotasExtra);
 if(uri.startsWith('/pagos/pendientes'))return ok(state.reportes);
 if(uri.startsWith('/pagos/vigencia'))return ok({fechaFin:dueEnd(state.casas[0])});
 if(uri.startsWith('/pagos/cotizacion'))return ok({monto:debt(state.casas[0]),saldoPendiente:debt(state.casas[0])});
 if(uri==='/pagos'&&method==='POST'){const entry={id:++state.lastId,casaId:state.casas[0].id,estado:'PENDIENTE_VALIDACION',referencia:body.referencia||'DEMO-'+state.lastId,monto:cap(body.monto),fecha:longDate};state.reportes.push(entry);save();return ok(entry)}
 if(uri.startsWith('/pagos/'))return ok({historial:state.pagos,reportes:state.reportes});
 if(uri.startsWith('/auth/cuentas'))return ok(state.cuentas,{cuentas:state.cuentas,solicitudes:state.cuentas,paginacion:{total:state.cuentas.length,pagina:1,paginas:1}});
 if(uri.startsWith('/auth/'))return ok({message:'Operación simulada',usuario:admin});
 if(uri.startsWith('/entorno/'))return ok({trafico:[],noticias:[],data:[],eventos:[]});
 return {ok:false,message:'Este flujo aún no tiene contrato simulado: '+uri};
}
const nativeFetch=window.fetch.bind(window);
window.fetch=async(input,init={})=>{
 const url=new URL(typeof input==='string'?input:input.url,location.href);
 if(url.hostname==='demo.invalid'&&url.pathname.startsWith('/api')){
  const method=(init.method||input?.method||'GET').toUpperCase(),uri=url.pathname.slice(4),b=init.body;
  let body={};try{if(typeof b==='string')body=JSON.parse(b)}catch{}
  try{debug(uri,init);const data=handle(uri,method,body,url.searchParams);return new Response(JSON.stringify(data),{status:data.ok===false?400:200,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}})}
  catch(err){return new Response(JSON.stringify({ok:false,message:err.message}),{status:400,headers:{'Content-Type':'application/json'}})}
 }
 if(/(misionjardines|yerenariso)\.listoenlinea\.host$/i.test(url.hostname)||/api-misionjardines/i.test(url.hostname))throw Error('Bloqueado: API real no disponible desde el demo');
 const method=(init.method||input?.method||'GET').toUpperCase();if(!['GET','HEAD'].includes(method))throw Error('Bloqueado: operación externa desde el demo');
 return nativeFetch(input,init);
};
const xhrOpen=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(method,url){const target=new URL(url,location.href);if(/(misionjardines|yerenariso)\.listoenlinea\.host$/.test(target.hostname)||!['GET','HEAD'].includes(String(method).toUpperCase())&&target.hostname!=='demo.invalid')throw Error('XHR externa bloqueada en demo');return xhrOpen.apply(this,arguments)};
window.MISION_DEMO={getState:()=>structuredClone(state),reset(){localStorage.removeItem(KEY);location.reload()},version:1,simulatePayment(id,monto){const h=byId(id);if(!h)throw Error('Casa no existe');advance(h,monto);state.pagos.push({id:++state.lastId,casaId:h.id,monto:Number(monto),fecha:longDate});save();return {saldo:debt(h),paidThrough:h.paidThrough}}};
})();