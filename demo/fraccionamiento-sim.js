(() => {
'use strict';
const storageKey='lel_mj_public_demo_20261026';
const names=['Ana López','Luis Ramos','María Torres','Sofía Peña','Javier Díaz','Elena Ruiz'];
const streets=['Rosas','Gardenias','Magnolias','Claveles','Azucenas','Jardines'];
const seed=()=>({homes:Array.from({length:30},(_,i)=>({id:i+1,street:streets[Math.floor(i/5)],number:21+i%5,owner:names[i%6],fee:i%7===0?150:300,paid:i%4!==0,balance:0})),tags:Array.from({length:30},(_,i)=>({id:i+1,homeId:i+1,code:'DEMO-'+(10000+i),expires:'2026-11-10',active:i%4!==0})),visits:[],payments:[],reservations:[]});
let db;try{db=JSON.parse(localStorage.getItem(storageKey));}catch{}if(!db||!db.homes)db=seed();
const save=()=>localStorage.setItem(storageKey,JSON.stringify(db));
const cash=n=>new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN',maximumFractionDigits:0}).format(n);
const safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const home=id=>db.homes.find(h=>h.id===Number(id));
const addr=h=>h.street+' '+h.number;
const button=(text,action)=>'<button type="button" data-demo-action="'+action+'" style="border:1px solid #f1d4bb;background:#fff6ee;border-radius:8px;color:#ca5a09;padding:7px 10px;cursor:pointer">'+text+'</button>';
const table=(cols,rows)=>'<div style="overflow:auto"><table class="table"><thead><tr>'+cols.map(x=>'<th>'+x+'</th>').join('')+'</tr></thead><tbody>'+rows.join('')+'</tbody></table></div>';
const row=c=>'<tr>'+c.map(x=>'<td>'+x+'</td>').join('')+'</tr>';
function draw(){
const tags=document.getElementById('view-tags'),houses=document.getElementById('view-viviendas'),club=document.getElementById('view-club');
tags.innerHTML='<div class="welcome"><div><h1>ZKTeco · TAGs</h1><p>Simulador local: ninguna conexión con controladores.</p></div>'+button('+ Agregar TAG','newtag')+'</div><article class="card">'+table(['TAG','Vivienda','Vigencia','Estado','Opciones'],db.tags.map(t=>row([safe(t.code),addr(home(t.homeId)),safe(t.expires),t.active?'Activo':'Suspendido',button('Editar','tag:'+t.id)+' '+button('Cambiar estado','toggle:'+t.id)])))+'</article>';
houses.innerHTML='<div class="welcome"><div><h1>Viviendas y condóminos</h1><p>Padrón 100% ficticio.</p></div>'+button('+ Agregar vivienda','newhome')+'</div><article class="card">'+table(['Casa','Condómino','Cuota','Situación','Acciones'],db.homes.map(h=>row([addr(h),safe(h.owner),cash(h.fee),h.paid?'Pagado':'Pendiente',button('Registrar pago','pay:'+h.id)+' '+button('Editar','edit:'+h.id)])))+'</article>';
club.innerHTML='<div class="welcome"><div><h1>Casa club</h1><p>Reservas ficticias con revisión de mantenimiento.</p></div>'+button('+ Reservar','reserve')+'</div><article class="card">'+table(['Vivienda','Fecha','Evento'],db.reservations.map(r=>row([addr(home(r.homeId)),safe(r.date),safe(r.title)])))+'</article>';
const paid=db.homes.filter(h=>h.paid).length;
const card=document.querySelector('#view-resumen .kpis');if(card)card.innerHTML=['Viviendas','Al corriente','TAGs activos','Visitas simuladas'].map((label,i)=>'<article class="card kpi"><div class="kpi-icon">✓</div><div><small>'+label+'</small><strong>'+[db.homes.length,paid,db.tags.filter(t=>t.active).length,db.visits.length][i]+'</strong></div></article>').join('');
const cuota=document.getElementById('view-cuotas');const original=cuota.querySelector('[data-demo-table]');if(original)original.remove();
const wrap=document.createElement('div');wrap.dataset.demoTable='true';wrap.className='card';wrap.style.marginTop='14px';wrap.innerHTML='<div class="head"><h2>Quién pagó y quién está pendiente · Datos ficticios</h2>'+button('Registrar pago','choosepay')+'</div>'+table(['Vivienda','Estado','Adeudo','Acción'],db.homes.map(h=>row([addr(h),h.paid?'Pagado':'Pendiente',h.paid?cash(0):cash(h.fee+50),button('Pagar','pay:'+h.id)])));cuota.append(wrap);
}
function act(a){let m;if(a==='newtag'){const id=Number(prompt('ID de vivienda ficticia (1–'+db.homes.length+')'));if(!home(id))return;const code=prompt('Número de TAG ficticio','DEMO-'+Date.now());if(!code)return;db.tags.push({id:Date.now(),homeId:id,code,expires:'2026-11-10',active:true});}
else if((m=a.match(/^tag:(\d+)$/))){const t=db.tags.find(t=>t.id===Number(m[1]));const date=prompt('Nueva vigencia (AAAA-MM-DD)',t.expires);if(!/^\d{4}-\d{2}-\d{2}$/.test(date||''))return;t.expires=date;}
else if((m=a.match(/^toggle:(\d+)$/))){const t=db.tags.find(t=>t.id===Number(m[1]));t.active=!t.active;}
else if(a==='newhome'){const street=prompt('Calle ficticia','Rosas');if(!street)return;const number=Number(prompt('Número',99));const owner=prompt('Nombre ficticio','Residente Demo');if(!owner||!Number.isFinite(number))return;db.homes.push({id:Math.max(...db.homes.map(x=>x.id))+1,street,number,owner,fee:300,paid:false,balance:0});}
else if((m=a.match(/^edit:(\d+)$/))){const h=home(m[1]),owner=prompt('Nombre del residente',h.owner);if(!owner)return;const fee=Number(prompt('Cuota mensual',h.fee));if(!Number.isFinite(fee)||fee<0)return;h.owner=owner;h.fee=fee;}
else if(a==='choosepay'){const id=Number(prompt('ID de vivienda a pagar'));if(home(id))act('pay:'+id);return;}
else if((m=a.match(/^pay:(\d+)$/))){const h=home(m[1]);const amount=Number(prompt('Importe de pago ficticio',h.fee+50));if(!Number.isFinite(amount)||amount<=0)return;h.balance=(h.balance||0)+amount;if(h.balance>=h.fee){h.paid=true;h.balance-=h.fee;db.tags.filter(t=>t.homeId===h.id).forEach(t=>{t.active=true;t.expires='2026-11-10'})}db.payments.push({homeId:h.id,amount,date:new Date().toISOString()});alert('Pago de demostración registrado. No se procesó dinero real.');}
else if(a==='reserve'){const id=Number(prompt('ID de vivienda'));const h=home(id);if(!h)return;if(!h.paid){alert('Vivienda con mantenimiento pendiente. Reserva rechazada.');return}const date=prompt('Fecha (AAAA-MM-DD)','2026-11-15');if(!/^\d{4}-\d{2}-\d{2}$/.test(date||''))return;if(db.reservations.some(x=>x.date===date)){alert('La fecha ya está reservada');return}const title=prompt('Evento','Reunión familiar');if(!title)return;db.reservations.push({homeId:id,date,title});}
save();draw();}
document.addEventListener('click',e=>{const b=e.target.closest('[data-demo-action]');if(b)act(b.dataset.demoAction)});
draw();
})();