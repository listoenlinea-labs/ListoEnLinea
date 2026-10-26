'use strict';
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  const externalCalls=[];
  page.on('request',r=>{
   if(/whatsapp|wa\.me|\/call\?|misionjardines-call:|tel:/i.test(r.url()))externalCalls.push(r.url());
  });
  await page.goto('http://127.0.0.1:8765/demo/mision/app.html?page=conmutador.html');
  await page.waitForFunction(()=>window.MJShell?.currentPage==='conmutador.html',{timeout:15000});
  const frame=page.frameLocator('.mj-app-frame.is-active');
  const buttons=frame.locator('.street-tab');
  await buttons.first().waitFor();
  assert.equal(await buttons.count(),8,'Deben mostrarse ocho secciones del conmutador');
  assert.equal(await frame.locator('.house-btn').count(),32,'Gardenias debe mostrar 32 botones');
  assert.match(await frame.locator('[data-call-description]').innerText(),/línea telefónica local/i);
  await frame.locator('.house-btn').first().click();
  assert.match(await frame.locator('#callStatus').innerText(),/SIMULADA/);
  assert.match(await frame.locator('#callStatus').innerText(),/No se marcó ningún teléfono ni se abrió WhatsApp/);
  assert.equal(externalCalls.length,0);
  await frame.locator('.street-tab').filter({hasText:'Exterior'}).click();
  assert.equal(await frame.locator('.house-btn').count(),3,'Exterior debe mostrar los tres accesos especiales');
  console.log('PASS: conmutador con ocho pestañas, cuadrícula, línea local y llamadas simuladas');
  await page.goto('http://127.0.0.1:8765/demo/mision/app.html?page=zkteco.html');
  await page.waitForFunction(()=>window.MJShell?.currentPage==='zkteco.html');
  const zk=page.frameLocator('.mj-app-frame.is-active');
  await zk.locator('.house-card').first().waitFor({timeout:16000});
  const states=await zk.locator('.house-card .house-state').allTextContents();
  assert(states.some(s=>s.includes('Sincronizado')),'Se esperan TAGs sincronizados en la página ZKTeco');
  assert(states.some(s=>s.includes('Verificar')||s.includes('Sin enlace')||s.includes('Vigencia')),
    'Se esperan estados mixtos de TAGs simulados');
  console.log('PASS: TAGs con estados heterogéneos visibles');
  await page.goto('http://127.0.0.1:8765/demo/mision/app.html?page=index.html');
  await page.waitForFunction(()=>window.MJShell?.currentPage==='index.html');
  const inicio=page.frameLocator('.mj-app-frame.is-active');
  await inicio.locator('.hl-chart-hit').first().waitFor({timeout:16000});
  const hits=await inicio.locator('.hl-chart-hit').count();
  assert(hits>10,'La gráfica debe tener múltiples puntos mensuales interactivos');
  await inicio.locator('.hl-chart-hit').first().evaluate(el=>el.dispatchEvent(new MouseEvent('click',{bubbles:true})));
  assert(await inicio.locator('#hlFinanceDetails').innerText().then(s=>s.includes('Ingresos')));
  console.log('PASS: gráfica financiera interactiva de Inicio');
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});