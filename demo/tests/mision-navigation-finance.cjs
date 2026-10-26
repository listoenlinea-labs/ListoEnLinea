'use strict';
const assert = require('node:assert/strict');
const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try {
  for(const width of [1440,390]){
   const page=await browser.newPage({viewport:{width,height:850}});
   const exceptions=[];page.on('pageerror',e=>exceptions.push(e.message));
   const status=[];
   page.on('response',r=>{if(r.url().includes('/demo/mision/')&&r.status()>=400)status.push({status:r.status(),url:r.url()})});
   await page.goto('http://127.0.0.1:8765/demo/mision/index.html',{waitUntil:'domcontentloaded'});
   await page.waitForFunction(()=>Boolean(window.MISION_DEMO));
   const data=await page.evaluate(async()=>{const r=await fetch('https://demo.invalid/api/dashboard');return await r.json()});
   assert.equal(data.ok,true);
   assert.equal(data.vista,'ADMINISTRADOR');
   assert(data.recaudacion?.serie?.length>=10,'Se requieren meses desde enero de 2026');
   assert.equal(data.recaudacion.serie.length,new Date().getMonth()+1);
   assert(data.recaudacion.serie.every(x=>x.etiqueta&&Number.isFinite(x.cuotas)&&Number.isFinite(x.ingresos)&&Number.isFinite(x.egresos)&&Number.isFinite(x.disponible)));
   await page.waitForSelector('.hl-finance-plot .hl-chart',{timeout:16000});
   const chart=await page.locator('.hl-finance-plot .hl-chart').count();
   const axis=await page.locator('.hl-chart-hit').count();
   assert(chart>0&&axis>0,'Gráfica no renderizada con puntos seleccionables');
   const alert=await page.locator('.hl-finance-no-data').count();
   assert.equal(alert,0,'Aparece el resumen financiero vacío');
   const logo=await page.locator('.mj-side-logo img').first().evaluate(img=>img.complete&&img.naturalWidth>0);
   assert(logo,'El logotipo del fraccionamiento no cargó');

   // Los enlaces del propio menú son los que antes enviaban a app.html inexistente.
   for(const target of ['analisis-cuotas.html','zkteco.html','seguridad.html','visitas.html','viviendas.html','casa-club.html','pagos.html']){
    if(width<821 && await page.locator('body').evaluate(b=>b.classList.contains('mj-shared-sidebar-collapsed'))){
      await page.locator('.mj-side-tab').click();
    }
    const chosen=page.locator('.mj-side-link[href="'+target+'"]').first();
    assert(await chosen.count(), 'No hay enlace de '+target);
    await chosen.click();
    await page.waitForURL(url=>url.pathname.endsWith('/demo/mision/app.html')&&url.searchParams.get('page')===target,{timeout:16000});
    await page.waitForFunction(t=>window.MJShell?.currentPage===t,target,{timeout:16000});
    await page.waitForFunction(t=>[...document.querySelectorAll('.mj-app-frame')].some(f=>
      f.classList.contains('is-active')&&f.contentDocument?.location?.pathname?.endsWith('/'+t)),target,{timeout:16000});
    assert.equal(await page.locator('#mjAppError:visible').count(),0,'Contenedor muestra error para '+target);
    assert.equal(await page.locator('.mj-app-frame.is-active').count(),1);
    // Desde el contenedor compartido la navegación debe ser por enlaces internos.
    const next=target==='analisis-cuotas.html'?'zkteco.html':'analisis-cuotas.html';
    const nextLink=page.locator('.mj-side-link[href="'+next+'"]').first();
    assert(await nextLink.count(),'Menú del shell no tiene '+next);
    if(width<821 && await page.locator('body').evaluate(b=>b.classList.contains('mj-shared-sidebar-collapsed'))){
      await page.locator('.mj-side-tab').click();
    }
    await nextLink.click();
    await page.waitForFunction(t=>window.MJShell?.currentPage===t,next);
    // Volver a Inicio a través del menú del shell para siguiente iteración.
    const home=page.locator('.mj-side-link[href="index.html"]').first();
    if(width<821 && await page.locator('body').evaluate(b=>b.classList.contains('mj-shared-sidebar-collapsed'))){
      await page.locator('.mj-side-tab').click();
    }
    await home.click();
    await page.waitForFunction(()=>window.MJShell?.currentPage==='index.html');
    await page.goto('http://127.0.0.1:8765/demo/mision/index.html');
   }
   await page.goto('http://127.0.0.1:8765/demo/mision/app.html?page=analisis-cuotas.html');
   await page.waitForFunction(()=>window.MJShell?.currentPage==='analisis-cuotas.html',{timeout:15000});
   assert.equal(await page.locator('#mjAppError:visible').count(),0);
   assert.equal(status.length,0,'404 o errores de recursos: '+JSON.stringify(status));
   assert.equal(exceptions.length,0,'Errores JS: '+JSON.stringify(exceptions));
   console.log('PASS '+width+'px: financial chart, valid nested navigation, direct links and logo');
   await page.close();
  }
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});