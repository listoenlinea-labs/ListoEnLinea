'use strict';
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  for(const width of [1440,390]){
   const page=await browser.newPage({viewport:{width,height:900}});
   await page.goto('http://127.0.0.1:8765/index.html#portfolio',{waitUntil:'domcontentloaded'});
   const card=page.locator('#portfolio .project-card').filter({has:page.locator('h3', {hasText:'Fraccionamiento Demo'})}).first();
   await card.waitFor({timeout:12000});
   const img=card.locator('img[src$="Fraccionameinto-Demo.png"]');
   assert.equal(await img.count(),1,'El portafolio no usa el logotipo subido');
   await img.evaluate(async image=>{
    if(!image.complete)await new Promise((resolve,reject)=>{image.addEventListener('load',resolve,{once:true});image.addEventListener('error',reject,{once:true})});
   });
   assert(await img.evaluate(x=>x.naturalWidth>0),'Logo del portafolio sin imagen válida');
   assert.equal(await card.locator('[data-project-details="Fraccionamiento Demo"]').count(),1);
   await page.goto('http://127.0.0.1:8765/demo/mision/app.html?page=index.html',{waitUntil:'domcontentloaded'});
   await page.locator('.mj-side-community strong').waitFor({timeout:16000});
   assert.equal(await page.locator('.mj-side-community strong').innerText(),'Fraccionamiento Demo');
   assert.equal(await page.locator('.mj-side-community span').first().innerText(),'Modo demostración');
   const sideLogo=page.locator('.mj-side-logo img');
   assert.equal(await sideLogo.count(),1);
   const loaded=await sideLogo.evaluate(img=>img.complete&&img.naturalWidth>0&&img.currentSrc.endsWith('Fraccionameinto-Demo.png'));
   assert(loaded,'El logo lateral no se cargó correctamente');
   assert.match(await page.title(),/Fraccionamiento Demo/);
   console.log('PASS '+width+'px: logo visible y nueva identidad del demo');
   await page.close();
  }
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
