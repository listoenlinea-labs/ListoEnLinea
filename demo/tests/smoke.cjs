const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
 const browser = await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:1280,height:850}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 try{
  await page.goto('http://127.0.0.1:8765/demo/yerena/app.html');
  await page.waitForFunction(()=>Boolean(window.API && window.YERENA_DEMO));
  const result=await page.evaluate(async()=>{
   const first=await API.request('/patients');const initial=first.patients.length;
   const p=(await API.request('/patients',{method:'POST',body:JSON.stringify({first_name:'Prueba',last_name:'Aislada',phone:'3300000000',email:'ficticio@example.test'})})).patient;
   const d=new Date(Date.now()+86400000),date=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
   const a=(await API.request('/appointments',{method:'POST',body:JSON.stringify({patient_id:p.id,start_at:date+' 16:00:00',end_at:date+' 17:00:00',professional_name:'Dra. Yerena Riso',resource:'Box 1',treatment:'Revisión',status:'pending'})})).appointment;
   await API.request('/clinical/'+p.id+'/odontogram',{method:'POST',body:JSON.stringify({phase:'initial',tooth:11,finding:'CARIES',surface:'WHOLE'})});
   await API.request('/clinical/'+p.id+'/periodontal',{method:'POST',body:JSON.stringify({tooth:11,site:'B',depth_mm:3})});
   const bundle=await API.request('/clinical/'+p.id);
   const pdf=new Blob(['%PDF-1.4\\nDEMO'],{type:'application/pdf'});
   const uploaded=await fetch('demo://isolated/clinical/'+p.id+'/files?category=document&name=test.pdf',{method:'POST',headers:{'Content-Type':'application/pdf'},body:pdf});
   const documentMeta=await uploaded.json();
   const fetched=await fetch('demo://isolated/clinical/'+p.id+'/files/'+documentMeta.id);
   const bytes=await fetched.text();
   await API.request('/clinical/'+p.id+'/files/'+documentMeta.id,{method:'DELETE'});
   const after=await API.request('/clinical/'+p.id);
   const blocked=await fetch('demo://isolated/clinical/'+p.id+'/files?category=document&name=invalid.pdf',{method:'POST',headers:{'Content-Type':'application/pdf'},body:new Blob(['invalid'],{type:'application/pdf'})});
   return {initial,added:(await API.request('/patients')).patients.length===initial+1,appointment:a.patient_id===p.id,odontogram:bundle.odontogram.length===1,periodontal:bundle.periodontal.length===1,upload:uploaded.status,download:bytes.startsWith('%PDF-'),removed:after.files.length===0,badFileStatus:blocked.status};
  });
  console.log('DENTAL',result);
  assert.equal(result.added,true);assert.equal(result.appointment,true);assert.equal(result.odontogram,true);assert.equal(result.periodontal,true);assert.equal(result.upload,201);assert.equal(result.download,true);assert.equal(result.removed,true);assert.equal(result.badFileStatus,400);
  await page.goto('http://127.0.0.1:8765/demo/mision/index.html');
  await page.waitForFunction(()=>!!window.MISION_DEMO);
  const m=await page.evaluate(async()=>{
    const before=MISION_DEMO.getState();const house=before.casas.find(h=>h.paidThrough<new Date().getFullYear()*12+new Date().getMonth());
    const pre=house.paidThrough;const result=MISION_DEMO.simulatePayment(house.id,1500);
    const after=MISION_DEMO.getState();const changed=after.casas.find(h=>h.id===house.id);
    const token=window.MJ_TOKEN;
    const checked=await fetch('https://demo.invalid/api/finanzas/analisis',{headers:{Authorization:'Bearer '+token}}).then(r=>r.json());
    return {updated:changed.paidThrough>pre,valid:checked.ok===true,token,tagCount:after.tags.length};
  });
  const extended=await page.evaluate(async()=>{
   const api='https://demo.invalid/api';const post=(path,data)=>fetch(api+path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).then(r=>r.json());
   const before=MISION_DEMO.getState();const debtor=before.casas.find(c=>c.paidThrough<new Date().getFullYear()*12+new Date().getMonth()),payer=before.casas.find(c=>c.paidThrough>=new Date().getFullYear()*12+new Date().getMonth());
   const denied=await post('/casa-club/reservas',{casaId:debtor.id,fecha:'2026-12-15',nombre:'Evento de prueba'});
   const allowed=await post('/casa-club/reservas',{casaId:payer.id,fecha:'2026-12-16',nombre:'Evento ficticio'});
   const conflict=await post('/casa-club/reservas',{casaId:payer.id,fecha:'2026-12-16',nombre:'Otro evento'});
   const isolation=await fetch('https://api-misionjardines.listoenlinea.host/api/auth/me').then(()=>false,()=>true);
   return {denied:denied.ok===false,allowed:allowed.ok===true,conflict:conflict.ok===false,isolation};
  });
  console.log('MISION EXTENDED',extended);
  assert.deepEqual(extended,{denied:true,allowed:true,conflict:true,isolation:true});
  console.log('MISION',m);
  assert(m.updated);assert(m.valid);assert(m.tagCount>0);
  assert.equal(errors.length,0,'Page exceptions: '+errors.join(' | '));
  console.log('SMOKE PASS');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});