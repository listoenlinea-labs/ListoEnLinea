'use strict';
const assert=require('node:assert/strict');
const {chromium}=require('playwright');

(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  for(const width of [1440,390]){
   const context=await browser.newContext({viewport:{width,height:900}});
   const page=await context.newPage();
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   const outgoing=[];
   page.on('request',r=>{if(/api-misionjardines\.listoenlinea\.host|misionjardines.*\/api/i.test(r.url()))outgoing.push(r.url())});
   await page.goto('http://127.0.0.1:8765/demo/mision/app.html?page=seguridad.html',{waitUntil:'domcontentloaded'});
   await page.waitForFunction(()=>window.MJShell?.currentPage==='seguridad.html',{timeout:15000});
   assert.equal(await page.locator('a.mj-side-link[href="mapa.html"]').count(),0);
   assert.equal(await page.locator('a.mj-side-link[href="auto-users.html"]').count(),0);
   const frame=page.frameLocator('.mj-app-frame.is-active');
   await frame.locator('#segCuotasRows tr').first().waitFor({timeout:15000});
   await frame.locator('#segCuotasStatus').filter({hasText:/viviendas/}).waitFor({timeout:12000});
   const first=await frame.locator('#segCuotasRows tr').first().locator('td').allTextContents();
   assert.equal(first.length,5,'Las cinco columnas deben llenarse');
   assert(first[0]&&!first[0].includes('No hay viviendas'),'Falta el padrón de Seguridad');
   assert.equal(await frame.locator('#segCuotasRows tr').count(),15);
   const selected=await frame.locator('body').evaluate(async()=>{
    const r=await fetch('https://demo.invalid/api/finanzas/analisis');
    const j=await r.json();
    return j.data.viviendas.find(h=>h.saldoPendiente>0&&h.tarifaMensual===300);
   });
   assert(selected);
   await frame.locator('#segCuotasCalle').fill(selected.calle);
   await frame.locator('#segCuotasNumero').fill(String(selected.numero));
   await frame.locator('#segCuotasRefresh').click();
   await frame.locator('#segCuotasStatus').filter({hasText:/^1 viviendas/}).waitFor({timeout:15000});
   let cells=await frame.locator('#segCuotasRows tr').first().locator('td').allTextContents();
   assert.equal(cells[0],selected.calle);
   assert.equal(cells[1],String(selected.numero));
   assert.match(cells[2],/Deudor/);
   await frame.locator('body').evaluate(h=>{
    // Mismo motor financiero que la API de pagos ficticios, sin un segundo servidor.
    const result=window.MISION_DEMO.simulatePayment(h.casaId,h.saldoPendiente);
    if(result.saldo!==0)throw Error('El pago ficticio no liquidó la deuda: '+result.saldo);
   },selected);
   await frame.locator('#segCuotasRefresh').click();
   await frame.locator('#segCuotasRows tr').first().getByText('Al corriente').waitFor({timeout:15000});
   cells=await frame.locator('#segCuotasRows tr').first().locator('td').allTextContents();
   assert.match(cells[2],/Al corriente/);
   assert(cells[4].includes(String(new Date().getFullYear())));
   await frame.locator('#segCuotasEstado').selectOption('DEUDOR');
   await frame.locator('#segCuotasStatus').filter({hasText:/^0 viviendas/}).waitFor({timeout:15000});
   await frame.locator('#segCuotasEstado').selectOption('AL_CORRIENTE');
   await frame.locator('#segCuotasStatus').filter({hasText:/^1 viviendas/}).waitFor({timeout:15000});
   // Navegación a módulos retirados vía URL compartida debe regresar a Inicio.
   for(const forbidden of ['mapa.html','auto-users.html']){
    await page.goto('http://127.0.0.1:8765/demo/mision/app.html?page='+forbidden);
    await page.waitForFunction(()=>window.MJShell?.currentPage==='index.html',{timeout:15000});
    const direct=await context.newPage();
    await direct.goto('http://127.0.0.1:8765/demo/mision/'+forbidden,{waitUntil:'domcontentloaded'});
    await direct.waitForURL(u=>u.pathname.endsWith('/app.html')&&u.searchParams.get('page')==='index.html',{timeout:15000});
    await direct.close();
   }
   assert.equal(outgoing.length,0,'El demo intentó conectar con una API productiva');
   assert.equal(errors.length,0,'Errores JS: '+errors.join('; '));
   await context.close();
   console.log('PASS '+width+'px: Seguridad sincronizada, filtros, pago ficticio, rutas retiradas');
  }
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
