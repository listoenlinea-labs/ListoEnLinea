'use strict';
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true});
 const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 try{
  await page.goto('http://127.0.0.1:8765/demo/yerena/app.html',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>!!window.YERENA_DEMO);
  await page.waitForSelector('#menu-toggle');
  await page.locator('#menu-toggle').click();
  const open=await page.locator('#menu-toggle').getAttribute('aria-expanded');
  assert.equal(open,'true','Menú dental no abre en pantalla móvil');
  await page.locator('[data-view="pacientes"]').first().click();
  await page.waitForTimeout(180);
  assert(await page.locator('#app-content').isVisible(),'Contenido dental invisible en móvil');
  for(const route of ['index.html','seguridad.html','visitas.html','zkteco.html','analisis-cuotas.html','casa-club.html','pagos.html']){
   await page.goto('http://127.0.0.1:8765/demo/mision/'+route,{waitUntil:'domcontentloaded'});
   await page.waitForTimeout(400);
   assert(!page.url().endsWith('login.html'),'Demo residencial exige login en '+route);
   const metrics=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,visibility:getComputedStyle(document.body).visibility}));
   assert.notEqual(metrics.visibility,'hidden','Pantalla residencial oculta en '+route);
   assert(metrics.scroll-metrics.width<=32,'Desbordamiento horizontal en '+route+': '+JSON.stringify(metrics));
  }
  assert.deepEqual(errors,[],'Errores de JavaScript en móvil');
  console.log('MOBILE PASS: mobile menu, navigation and responsive widths');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
