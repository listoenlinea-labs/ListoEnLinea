'use strict';
const assert=require('node:assert/strict');
const {chromium}=require('playwright');

(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  for(const width of [1440,390]){
   const page=await browser.newPage({viewport:{width,height:900}});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   await page.goto('http://127.0.0.1:8765/demo/mision/app.html?page=analisis-cuotas.html',
     {waitUntil:'domcontentloaded'});
   await page.waitForFunction(()=>window.MJShell?.currentPage==='analisis-cuotas.html',{timeout:15000});
   const frame=page.frameLocator('.mj-app-frame.is-active');
   await frame.locator('[data-paid-history]').first().waitFor({timeout:20000});
   const first=frame.locator('[data-paid-history]').first();
   const id=Number(await first.getAttribute('data-paid-history'));
   await first.click();
   const modal=frame.locator('#houseHistoryModal');
   await modal.waitFor({state:'visible',timeout:15000});
   await frame.locator('#houseHistoryTimeline .history-event').first().waitFor({timeout:15000});
   const cards=await frame.locator('#houseHistoryTimeline .history-event').count();
   const amount=await frame.locator('#houseHistorySummary .history-stat').first().innerText();
   const text=await frame.locator('#houseHistoryTimeline').innerText();
   assert(cards>=6,'Se esperaban pagos anteriores en la vivienda '+id);
   assert(!amount.includes('$0'),'Último pago de prueba debería tener monto');
   assert(/Mantenimiento/i.test(text));
   assert(!await frame.locator('#houseHistoryModal .history-empty').count());
   await frame.locator('#houseHistoryClose').click();
   await modal.waitFor({state:'hidden'});
   const pendingId=await frame.locator('body').evaluate(async()=>{
    const data=await fetch('https://demo.invalid/api/finanzas/analisis').then(r=>r.json());
    // Respetar paginación/orden actual de la tabla: elegir una casa visible.
    const visible=new Set([...document.querySelectorAll('[data-paid-history]')].map(b=>
      Number(b.getAttribute('data-paid-history'))));
    return data.data.viviendas.find(h=>visible.has(h.casaId)&&h.saldoPendiente>0)?.casaId;
   });
   assert(pendingId);
   await frame.locator('[data-paid-history="'+pendingId+'"]').click();
   await frame.locator('#houseHistoryDebts .history-debt').first().waitFor({timeout:15000});
   assert(await frame.locator('#houseHistoryDebts .history-debt').count()>0);
   assert(await frame.locator('#houseHistoryTimeline .history-event').count()>0);
   const owed=await frame.locator('#houseHistorySummary .history-stat.debt').innerText();
   assert(!owed.includes('$0'),'Saldo pendiente se perdió en el modal');
   assert.equal(errors.length,0,errors.join('; '));
   console.log('PASS '+width+'px: historial, meses cubiertos, importes y deudas por vivienda');
   await page.close();
  }
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
