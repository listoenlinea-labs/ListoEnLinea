/* Entorno público aislado. No conecta con C3, MySQL, correo ni banca. */
(()=>{'use strict';
const ORIGIN='https://demo.invalid', API=ORIGIN+'/api', KEY='lel_mision_copy_demo_v2';
const monthName=['ENERO','FEBRERO','MARZO','ABRIL','MAYO','JUNIO','JULIO','AGOSTO','SEPTIEMBRE','OCTUBRE','NOVIEMBRE','DICIEMBRE'];
const now=new Date(),yyyy=now.getFullYear(),mm=now.getMonth()+1,period=(y,m)=>y*12+m-1;
const curr=period(yyyy,mm),pad=n=>String(n).padStart(2,'0'),date=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const longDate=date(now),yearMonth=i=>String(Math.floor(i/12))+'-'+pad(i%12+1);
const message='DEMO: el dispositivo, pago, notificación o servicio externo no fue contactado.';
const owners=['Elena Fernández','Rodrigo Sánchez','Paola Flores','Carlos Aguilar','Mariana Solís','David Romero','Andrea Luna','Gabriel Navarro','Silvia Vázquez','Laura Campos','José Rivera','Sofía Moreno'];
const streetList=['Rosas','Gardenias','Magnolias','Claveles','Azucenas','Jardines','Camelias','Orquídeas'];
function fixture(){
 // Un único padrón de 231 viviendas; cada calle posee un porcentaje distinto.
 // Las cifras de la tabla, donut, barras, Excel e Inicio se derivan de este ledger.
 const seedEnd=period(yyyy,Math.min(mm,12));
 const callesMeta=[{clave:'Rosas',tasa:78},{clave:'Gardenias',tasa:62},{clave:'Magnolias',tasa:69},{clave:'Claveles',tasa:48},
   {clave:'Azucenas',tasa:57},{clave:'Jardines',tasa:82},{clave:'Camelias',tasa:45},{clave:'Orquídeas',tasa:73}];
 const casas=Array.from({length:231},(_,i)=>{
  const street=Math.floor(i/30), hash=(i*37+Math.floor(i/30)*23+(i*i)%31)%100;
  const threshold=callesMeta[street].tasa;
  const paidThrough=hash<threshold?seedEnd:hash<threshold+9?seedEnd-1:hash<threshold+17?seedEnd-2:
    hash<threshold+25?period(yyyy,7):period(yyyy,6);
  return {id:i+1,calle:streetList[street],calleCorrecta:streetList[street],
    numero:11+(i%30)*2,nombre:owners[i%owners.length],cuota:i%11===0?150:300,
    paidThrough:Math.min(seedEnd,paidThrough),credito:0,exento:i%13===0,permisosAcceso:{},
    telefono:'330000'+pad(i+21)+'00',correo:'residente'+(i+1)+'@example.test'};
 });
 const pagos=[];
 for(const c of casas){
  for(let month=1;month<=mm;month++){
   const coverage=period(yyyy,month);
   if(coverage>c.paidThrough)continue;
   // Un porcentaje de casas anticipa su mensualidad y otro paga después:
   // los movimientos por mes no resultan líneas artificialmente planas.
   const shift=(c.id*13+month*7)%9===0?-1:(c.id*7+month*11)%8===0?1:0;
   const registeredMonth=Math.max(1,Math.min(mm,month+shift));
   pagos.push({id:pagos.length+1001,casaId:c.id,monto:c.cuota,
    fecha:yyyy+'-'+pad(registeredMonth)+'-'+pad(6+(c.id*3+month)%18),
    periodo:yearMonth(coverage),referencia:'PAGO-FICTICIO-'+pad(c.id)+'-'+pad(month),
    concepto:'MANTENIMIENTO',origen:'DEMO',estado:'VALIDADO'});
  }
 }
 // Abonos parciales de prueba: no completan la mensualidad y quedan en saldo a favor.
 for(const c of casas.filter(c=>c.paidThrough<curr&&c.id%31===0)){
  c.credito=100;
  pagos.push({id:pagos.length+1001,casaId:c.id,monto:100,fecha:longDate,
   periodo:yearMonth(c.paidThrough+1),referencia:'ABONO-FICTICIO-'+c.id,
   concepto:'MANTENIMIENTO',origen:'DEMO',estado:'VALIDADO',parcial:true});
 }
 const tags=casas.flatMap((c,i)=>{
  const current=debtForFixture(c);
  const linked=i%7!==0;
  const synced=linked&&i%5!==0;
  const physical=synced&&i%9!==0;
  const expires=dueEndFixture(c);
  const entry={id:i+1,casaId:c.id,numeroTarjeta:linked?'DEMO'+String(10000+i):'FICTICIO'+String(10000+i),
    nombreDispositivo:'TAG '+String(i+1),fechaInicio:yyyy+'-01-01',fechaFin:expires,
    fechaFinGuardada:expires,fechaFinC3:physical?expires:null,activo:current===0,
    sincronizado:synced,fisicamenteObservado:physical,enControlador:physical,
    ultimaLectura:physical?new Date().toISOString():null,puertas:physical?[1,2]:[]};
  // En algunas viviendas al corriente existen dos TAGs, ambos ficticios.
  if(i%37===3){
   const copy={...entry,id:2500+i,numeroTarjeta:'DEMO2'+String(10000+i),
     fisicamenteObservado:true,sincronizado:true,enControlador:true,ultimaLectura:new Date().toISOString()};
   return [entry,copy];
  }
  return [entry];
 });
 const egresos=Array.from({length:mm},(_,i)=>({
  id:3001+i,concepto:['Seguridad','Jardinería','Alumbrado','Limpieza','Mantenimiento'][i%5]+' · Demo',
  categoria:'OPERACION',monto:13000+((i*71+5)%13)*960,fecha:yyyy+'-'+pad(i+1)+'-15',referencia:'EGRESO-FICTICIO-'+(i+1)
 }));
 const otrosIngresos=Array.from({length:mm},(_,i)=>({id:4001+i,concepto:'Ingreso adicional ficticio',
  monto:200+((i*53+7)%9)*145,fecha:yyyy+'-'+pad(i+1)+'-19'}));
 return {version:2,casas,tags,pagos,egresos,otrosIngresos,saldoInicial:12000,
  accesos:[],visitas:[{id:1,casaId:1,nombre:'Gabriela Ramos',placa:'DEM-001',
    motivo:'Visita familiar',estado:'PROGRAMADA',fecha:longDate,hora:'11:30',codigo:'VIS-DEMO-0001'}],
  reportes:[],reservas:[],cuotasExtra:[],pagosConcepto:[],incidentes:[],cuentas:[],logs:[],lastId:5000};
}
function dueEndFixture(c){
 const y=Math.floor(c.paidThrough/12),m=c.paidThrough%12;
 return date(new Date(y,m+1,10));
}
function debtForFixture(c){
 let amount=0;for(let i=c.paidThrough+1;i<=curr;i++)amount+=c.cuota+(i<curr||(i===curr&&now.getDate()>10)?(!c.exento?50:0):0);
 return Math.max(0,amount-(c.credito||0));
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
const card=t=>({id:t.id,numeroTarjeta:t.numeroTarjeta,numero:t.numeroTarjeta,numeroTarjetaNormalizado:t.numeroTarjeta,
 fechaInicio:t.fechaInicio,fechaFin:t.fechaFin,fechaFinC3:t.fechaFinC3??null,activo:t.activo,
 estado:t.activo?'ACTIVO':'INACTIVO',sincronizado:Boolean(t.sincronizado),
 enControlador:Boolean(t.enControlador),fisicamenteObservado:Boolean(t.fisicamenteObservado),
 ultimaLectura:t.ultimaLectura||null,casaId:t.casaId,nombreDispositivo:t.nombreDispositivo,
 puertas:t.puertas||[]});

/* Cargos exactos por vivienda y periodo: centavos distribuidos sin perder saldo. */
function extraCharges(c){
 const paid=new Set((state.pagosConcepto||[]).filter(x=>x.casaId===c.id&&x.tipoPago==='EXTRAORDINARIO').map(x=>x.conceptoId));
 return state.cuotasExtra.flatMap(project=>{
  const months=Math.max(1,Number(project.meses)||1);
  const amount=Math.round(cap(project.monto)*100),units=state.casas.length*months;
  const fixed=Math.floor(amount/units),remainder=amount%units;
  const begin=Number.isInteger(project.fechaInicioPeriodo)?project.fechaInicioPeriodo:curr;
  return Array.from({length:months},(_,i)=>{
   const index=i*state.casas.length+(c.id-1),amountCents=fixed+(index<remainder?1:0);
   const id=project.id*1000000+i*1000+c.id;
   return {id,proyectoId:project.id,periodo:yearMonth(begin+i),periodoIndice:begin+i,
    concepto:'Cuota extraordinaria '+(project.concepto||'Proyecto DEMO'),monto:amountCents/100,
    estado:paid.has(id)?'PAGADO':'PENDIENTE'};
  }).filter(x=>x.monto>0);
 });
}
const extraDue=c=>cap(extraCharges(c).filter(x=>x.estado!=='PAGADO'&&x.periodoIndice<=curr).reduce((sum,x)=>sum+x.monto,0));
const clubCharges=c=>state.reservas.filter(r=>r.casaId===c.id&&r.estado==='APROBADA'&&!r.pagado).map(r=>({id:r.id,periodo:r.fecha,
 monto:cap(Number(r.cuotaRecuperacion||0)+Number(r.depositoGarantia||0)+Number(r.limpieza||0)),concepto:'Casa club '+r.fecha,fechaLimitePago:r.fechaLimitePago}));

function movements(month,year=yyyy,ledger=state.pagos){
 return ledger.filter(item=>String(item.fecha||'').slice(0,7)===year+'-'+pad(month));
}
function financeLedger(){
 let balance=Number(state.saldoInicial||0);
 const initials=Number(state.saldoInicial||0);
 const records=Array.from({length:mm},(_,index)=>{
  const month=index+1;
  const cuotas=cap(movements(month).reduce((sum,p)=>sum+Number(p.monto||0),0));
  const otros=cap(movements(month,yyyy,state.otrosIngresos||[]).reduce((sum,p)=>sum+Number(p.monto||0),0)+
    movements(month,yyyy,state.pagosConcepto||[]).reduce((sum,p)=>sum+Number(p.monto||0),0));
  const egresos=cap(movements(month,yyyy,state.egresos||[]).reduce((sum,e)=>sum+Number(e.monto||0),0));
  const ingresos=cap(cuotas+otros);
  balance=Math.round((balance+ingresos-egresos)*100)/100;
  return {anio:yyyy,mes:month,etiqueta:['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'][index]+' '+yyyy,
    cuotas,ingresosAdicionales:otros,saldoInicial:index===0?initials:0,ingresos,egresos,
    disponible:balance,total:ingresos,monto:cuotas};
 });
 return records;
}
function analisis(){
 const viviendas=state.casas.map(c=>{
  const tags=state.tags.filter(t=>t.casaId===c.id).map(card);
  const ultimoMesPagado={mes:monthName[c.paidThrough%12][0]+monthName[c.paidThrough%12].slice(1).toLowerCase(),
    anio:Math.floor(c.paidThrough/12),pagoAnual:false};
  const last=state.pagos.filter(p=>p.casaId===c.id).sort((a,b)=>String(b.fecha).localeCompare(String(a.fecha))||b.id-a.id)[0];
  const saldo=debt(c),pagada=saldo<=0;
  return {casaId:c.id,calle:c.calle,numero:c.numero,nombre:c.nombre,estatus:pagada?'PAGADO':'PENDIENTE',
    pagada,montoPagado:last?.monto||0,saldoPendiente:saldo,tarifaMensual:c.cuota,ultimoMesPagado,
    ultimoPago:last?{monto:last.monto,fecha:last.fecha,referencia:last.referencia,periodo:last.periodo}:{monto:0},
    tags:{detalle:tags,controlesNoEnlazados:[]},tagDiagnostico:{tarjetas:tags},
    exencionesRecargo:c.exento?[{desde:yearMonth(curr),hasta:null}]:[]};
 });
 const pagadas=viviendas.filter(v=>v.pagada).length,history=financeLedger(),current=history.at(-1);
 const calles=streetList.map(calle=>{
  const a=viviendas.filter(v=>v.calle===calle),done=a.filter(v=>v.pagada).length;
  return {calle,total:a.length,pagadas:done,pendientes:a.length-done,porcentaje:Math.round(done/a.length*100)};
 });
 const other={EXTRAORDINARIO:viviendas.map(v=>{const pending=extraDue(byId(v.casaId));return {...v,saldoPendiente:pending,estatus:pending?'PENDIENTE':'PAGADO'}}),
  CASA_CLUB:viviendas.map(v=>{const pending=clubCharges(byId(v.casaId)).reduce((sum,x)=>sum+x.monto,0);
   return {...v,saldoPendiente:cap(pending),estatus:pending?'PENDIENTE':'PAGADO'}})};
 const sum=key=>history.reduce((acc,item)=>acc+item[key],0);
 return {periodo:monthName[mm-1]+' '+yyyy,anio:yyyy,mes:mm,
  casas:viviendas.length,pagadas,pendientes:viviendas.length-pagadas,porcentaje:Math.round(pagadas/viviendas.length*100),
  esCargaHistorica:false,ingresosParaBalance:current.cuotas,
  ingresosReportados:{mantenimiento:current.cuotas,extraordinarios:0,casaClub:0},
  ingresosAdicionales:current.ingresosAdicionales,saldoInicial:history.length>1?history.at(-2).disponible:Number(state.saldoInicial||0),
  totalEgresos:current.egresos,balanceReportado:current.disponible,
  casaClub:{recuperacion:0,limpieza:0,garantiasRecibidas:0,garantiasDevueltas:0},
  calles,avisoPadron:'231 viviendas y todos los pagos son ficticios; datos consistentes para gráficas y Excel',
  ingresosHistoricos:sum('cuotas'),manualesCasaClub:0,cobrosCuotasRegistrados:current.cuotas,
  avisoConciliacion:'Operaciones ficticias; ninguna verificación bancaria real',
  egresosCategorias:Object.fromEntries(state.egresos.filter(e=>String(e.fecha||'').slice(0,7)===yyyy+'-'+pad(mm)).map(e=>[e.categoria,e.monto])),
  egresos:state.egresos.filter(e=>String(e.fecha||'').slice(0,7)===yyyy+'-'+pad(mm)),
  viviendas,viviendasMantenimiento:viviendas,viviendasConceptos:other};
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
  const serie=financeLedger(),current=serie.at(-1),previous=serie.at(-2);
  const monthAbbr=['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  const activity=[
    ...state.pagos.map(p=>({tipo:'PAGO',titulo:'Pago de cuota registrado',monto:p.monto,fecha:p.fecha,
      calle:byId(p.casaId)?.calle,numero:byId(p.casaId)?.numero})),
    ...state.visitas.map(v=>({tipo:'VISITA',titulo:'Visita de demostración',fecha:v.fecha,
      calle:byId(v.casaId)?.calle,numero:byId(v.casaId)?.numero})),
    ...state.accesos.map(a=>({tipo:'ACCESO',titulo:'Acceso simulado',fecha:a.fechaEntrada,
      calle:byId(a.casaId)?.calle,numero:byId(a.casaId)?.numero}))
  ].sort((a,b)=>String(b.fecha).localeCompare(String(a.fecha))).slice(0,8);
  // El dashboard del repositorio original espera campos a nivel raíz, no dentro de "data".
  return {ok:true,vista:'ADMINISTRADOR',
    fuentes:{cuotas:true,visitas:true,accesos:true,residentes:true,viviendas:true,eventos:true},
    kpis:{cuotas:{porcentajeAlCorriente:fin.porcentaje,alCorriente:fin.pagadas,total},
      visitas:{hoy:vis,programadas:vis,enCurso:inside},
      accesos:{activos:inside,entradasHoy:state.accesos.length},
      residentes:{activos:total,viviendasOcupadas:total,viviendasTotales:total}},
    recaudacion:{totalMes:current.cuotas,variacionPorcentaje:previous&&previous.cuotas
      ?Math.round((current.cuotas-previous.cuotas)/previous.cuotas*10000)/100:0,serie},
    periodo:{actual:{etiqueta:monthAbbr[mm-1]+' '+yyyy}},eventos:[],eventosProximos7Dias:0,
    actividad:activity,operativo:{visitas:state.visitas,accesos:state.accesos},
    generadoEn:new Date().toISOString(),modo:'DEMO_FICTICIO'};
 }
 if(uri==='/finanzas/analisis')return ok(analisis());
 if(uri==='/finanzas/egresos'&&method==='POST'){const e={id:++state.lastId,concepto:body.concepto||'Egreso demostrativo',categoria:body.categoria||'OPERACION',monto:cap(body.monto),fecha:body.fecha||longDate,referencia:body.referencia||'DEMO'};state.egresos.push(e);save();return ok(e)}
 if(uri.startsWith('/finanzas/egresos/')&&uri.endsWith('/activar-cuota')){
  const egresoId=Number(parts[2]),egreso=state.egresos.find(e=>e.id===egresoId);
  if(!egreso)return {ok:false,message:'Egreso de prueba inexistente'};
  if(state.cuotasExtra.some(x=>x.egresoId===egresoId))return {ok:false,message:'Este proyecto ya tiene cuota extraordinaria'};
  const months=Number(body.meses||body.numeroMeses||1);
  if(!Number.isInteger(months)||months<1||months>36)return {ok:false,message:'El número de meses debe estar entre 1 y 36'};
  const start=String(body.fechaInicio||body.fecha_inicio||longDate).slice(0,7);
  const match=/^(\d{4})-(\d{2})$/.exec(start);
  const begin=match?period(Number(match[1]),Number(match[2])):curr;
  state.cuotasExtra.push({id:++state.lastId,egresoId,concepto:egreso.concepto,meses:months,monto:egreso.monto,fechaInicioPeriodo:begin});
  save();return ok({creada:true,conceptos:state.casas.length*months,importe:egreso.monto});
 }
 if(uri.startsWith('/finanzas/viviendas/')&&uri.endsWith('/cuota-por-cobrar')){const c=byId(parts[2]);c.cuota=cap(body.cuotaPorCobrar);c.exento=Boolean(body.sinRecargo);save();return ok(c)}
 if(uri.startsWith('/finanzas/pagos-vivienda/')&&uri.endsWith('/historial'))return ok(state.pagos.filter(p=>p.casaId===Number(parts[2])));
 if(uri.startsWith('/finanzas/pagos-vivienda/')&&uri.endsWith('/estado-c3')){const t=state.tags.filter(x=>x.casaId===Number(parts[2]));return ok({tags:t.length,sincronizacion:'COMPLETADO',fechaFinal:t[0]?.fechaFin,fechasTags:t.map(x=>({fechaFinal:x.fechaFin}))})}
 if(uri.startsWith('/finanzas/pagos-vivienda/')&&uri.endsWith('/cotizar')){const c=byId(parts[2]),targetYear=+query.get('anio')||yyyy,targetMonth=+query.get('mes')||mm,desired=period(targetYear,targetMonth),months=Math.max(1,desired-c.paidThrough);const periods=Array.from({length:months},(_,i)=>({mes:monthName[(c.paidThrough+i+1)%12],anio:Math.floor((c.paidThrough+i+1)/12),registrable:true}));return ok({tarifaMensual:c.cuota,ultimoMesPagado:{mes:monthName[c.paidThrough%12],anio:Math.floor(c.paidThrough/12)},meses:months,desde:periods[0]&&{nombre:periods[0].mes,anio:periods[0].anio},hasta:periods.at(-1)&&{nombre:periods.at(-1).mes,anio:periods.at(-1).anio},periodos:periods,montoSugerido:periods.reduce((sum,_,i)=>sum+periodCost(c,c.paidThrough+i+1),0),montoMinimo:periods.reduce((sum,_,i)=>sum+periodCost(c,c.paidThrough+i+1),0),montoMaximo:periods.reduce((sum,_,i)=>sum+periodCost(c,c.paidThrough+i+1),0),fechaFinObjetivo:date(new Date(targetYear,targetMonth,10)),bloqueado:false,requiereRevision:false,requiereConciliacionTarifa:false})}
 if(uri==='/finanzas/pagos-vivienda'&&method==='POST'){const c=byId(body.casaId);if(!c)return {ok:false,message:'Casa inexistente'};const monto=cap(body.montoTotal??body.monto??body.importe);if(!(monto>0))return {ok:false,message:'El importe debe ser positivo.'};const previo=c.paidThrough;if(body.pagoAnual&&body.anio){const last=period(Number(body.anio),12);let required=0;for(let i=c.paidThrough+1;i<=last;i++)required+=periodCost(c,i);if(monto+(c.credito||0)+0.00001<required)return {ok:false,message:'El monto no alcanza para cubrir los meses pendientes del pago anual.'};}advance(c,monto);const p={id:++state.lastId,casaId:c.id,monto,fecha:longDate,referencia:'PAGO-DEMO-'+state.lastId,concepto:'MANTENIMIENTO',pagoAnual:Boolean(body.pagoAnual)};state.pagos.push(p);save();return {ok:true,data:{referencia:p.referencia,pago:p,fechaFinObjetivo:dueEnd(c),meses:c.paidThrough-previo},message:'Pago ficticio registrado. TAGs actualizados únicamente en el simulador.'}}
 if(uri.startsWith('/finanzas/pagos-concepto/')&&method==='GET'){const c=byId(parts[2]);if(!c)return {ok:false,message:'Casa inexistente'};return ok({EXTRAORDINARIO:extraCharges(c).filter(x=>x.estado!=='PAGADO'),CASA_CLUB:clubCharges(c)})}
 if(uri==='/finanzas/pagos-concepto'&&method==='POST'){
  const c=byId(body.casaId),tipo=String(body.tipoPago||''),id=Number(body.conceptoId),amount=cap(body.monto);
  if(!c||!['EXTRAORDINARIO','CASA_CLUB'].includes(tipo)||!Number.isSafeInteger(id))return {ok:false,message:'Vivienda o concepto inválido'};
  const concept=(tipo==='EXTRAORDINARIO'?extraCharges(c).filter(x=>x.estado!=='PAGADO'):clubCharges(c)).find(x=>x.id===id);
  if(!concept)return {ok:false,message:'El concepto ya fue pagado o no pertenece a esta vivienda'};
  if(Math.round(concept.monto*100)!==Math.round(amount*100))return {ok:false,message:'El importe debe coincidir con el cargo vigente'};
  const payment={id:++state.lastId,casaId:c.id,tipoPago:tipo,conceptoId:id,monto:amount,formaPago:String(body.formaPago||'EFECTIVO').toUpperCase(),fecha:longDate,referencia:'PAGO-DEMO-CONCEPTO-'+state.lastId};
  state.pagosConcepto=state.pagosConcepto||[];
  state.pagosConcepto.push(payment);
  if(tipo==='CASA_CLUB'){const booking=state.reservas.find(r=>r.id===id);booking.pagado=true;}
  save();return ok(payment,{message:'Pago ficticio registrado sin tocar TAGs ni mantenimiento'});
 }
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
 if(uri==='/casa-club/reservas'&&method==='POST'){const c=byId(body.casaId)||state.casas[0];if(debt(c)>0||extraDue(c)>0)return {ok:false,message:'Reserva bloqueada por adeudos de mantenimiento o cuotas extraordinarias.'};if(state.reservas.some(r=>r.fecha===body.fecha&&r.estado!=='CANCELADA'))return {ok:false,message:'La fecha ya está reservada'};const entry={id:++state.lastId,casaId:c.id,casa:c,fecha:body.fecha,estado:'PENDIENTE',...body};state.reservas.push(entry);save();return ok(entry)}
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

 if(uri==='/cuotas'&&method==='GET'){
  const year=Number(query.get('anio'))||yyyy,mon=String(query.get('mes')||monthName[mm-1]).toUpperCase(),idx=monthName.indexOf(mon),target=period(year,idx<0?mm:idx+1);
  const result=state.casas.map(c=>{const override=(state.cuotas||[]).find(q=>q.casaId===c.id&&q.anio===year&&q.mes===mon)||{};const pagado=c.paidThrough>=target;return {id:year*100000+(idx+1)*1000+c.id,casaId:c.id,casa:houses().find(h=>h.id===c.id),mes:mon,anio:year,monto:c.cuota,montoPagado:pagado?c.cuota:0,importePagado:pagado?c.cuota:0,pagado,estado:pagado?'PAGADO':'PENDIENTE',estatus:pagado?'PAGADO':'PENDIENTE',fechaPago:pagado?longDate:null,calleSnapshot:c.calle,numeroCasaSnapshot:c.numero,nombreCondominoSnapshot:c.nombre,...override}});
  return ok(result);
 }
 if(uri==='/cuotas'&&method==='POST'){const c=byId(body.casaId),entry={id:++state.lastId,casaId:c.id,anio:Number(body.anio)||yyyy,mes:String(body.mes||monthName[mm-1]).toUpperCase(),monto:Number(body.monto)||c.cuota,...body};state.cuotas=state.cuotas||[];state.cuotas.push(entry);save();return ok(entry)}
 if(uri==='/cuotas/lote'&&method==='PATCH'){state.cuotas=state.cuotas||[];for(const op of body.operaciones||[]){const c=state.cuotas.find(x=>x.id===op.id);if(c)Object.assign(c,op.cambios)}save();return ok({actualizados:(body.operaciones||[]).length})}
 if(uri==='/cuotas/recibos/enviar-lote')return {ok:true,resultados:(body.ids||[]).map(id=>({id,enviado:false,motivo:'Demo: no se envían correos reales'})),message:'Comprobantes simulados; no se enviaron correos.'};
 if(uri.startsWith('/cuotas/')){const id=Number(parts[1]),record=(state.cuotas||[]).find(c=>c.id===id);if(method==='DELETE'){state.cuotas=(state.cuotas||[]).filter(c=>c.id!==id);save();return ok({deleted:true})}if(method==='PATCH'&&record){Object.assign(record,body);save();return ok(record)}return ok(record||{})}
 if(uri==='/eventos'&&method==='GET')return ok(state.eventos||[],{eventos:state.eventos||[]});
 if(uri==='/eventos'&&method==='POST'){state.eventos=state.eventos||[];const e={id:++state.lastId,...body};state.eventos.push(e);save();return ok(e)}
 if(uri.startsWith('/eventos/')&&method==='DELETE'){state.eventos=(state.eventos||[]).filter(e=>String(e.id)!==parts[1]);save();return ok({deleted:true})}
 if(uri.startsWith('/casas/')&&uri.endsWith('/residentes')&&method==='GET'){const c=byId(parts[1]);return ok(c?c.residentes||[{id:c.id,nombre:c.nombre,correo:c.correo,telefono:c.telefono}]:[])}
 if(uri.startsWith('/casas/')&&uri.endsWith('/residentes')&&method==='POST'){const c=byId(parts[1]);if(!c)return {ok:false,message:'Vivienda inexistente'};c.residentes=c.residentes||[];const resident={id:++state.lastId,...body};c.residentes.push(resident);save();return ok(resident)}
 if(uri.startsWith('/visitas/')&&method==='PATCH'){const entry=state.visitas.find(v=>String(v.id)===parts[1]);if(!entry)return {ok:false,message:'Visita inexistente'};entry.estado=({entrada:'DENTRO',salida:'SALIO',autorizar:'AUTORIZADA',cancelar:'CANCELADA',rechazar:'RECHAZADA'})[parts[2]]||'ACTUALIZADA';save();return ok(entry)}
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
// Bloquear canales de telefonía, SMS, cámaras y acciones físicas del entorno real.
window.WebSocket=class{constructor(){throw Error('WebSocket/telefonía real deshabilitados en este demo público')}};
window.EventSource=class{constructor(){throw Error('Eventos remotos deshabilitados en demo')}};
window.MISION_DEMO={getState:()=>structuredClone(state),getFinanceLedger:()=>structuredClone(financeLedger()),getAnalysis:()=>structuredClone(analisis()),reset(){localStorage.removeItem(KEY);location.reload()},version:1,simulatePayment(id,monto){const h=byId(id);if(!h)throw Error('Casa no existe');advance(h,monto);state.pagos.push({id:++state.lastId,casaId:h.id,monto:Number(monto),fecha:longDate});save();return {saldo:debt(h),paidThrough:h.paidThrough}}};
})();