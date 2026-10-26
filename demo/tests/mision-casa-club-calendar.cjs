'use strict';
const assert=require('node:assert/strict');
const {chromium}=require('playwright');

(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  for(const width of [1440,390]){
   const context=await browser.newContext({viewport:{width,height:900}});
   const page=await context.newPage();
   page.on('dialog',dialog=>dialog.accept());
   await page.goto('http://127.0.0.1:8765/demo/mision/app.html?page=casa-club.html',
     {waitUntil:'domcontentloaded'});
   await page.waitForFunction(()=>window.MJShell?.currentPage==='casa-club.html',{timeout:15000});
   const frame=page.frameLocator('.mj-app-frame.is-active');
   await frame.locator('#calendarDays button').first().waitFor({timeout:15000});
   const localToday=new Intl.DateTimeFormat('sv-SE',{timeZone:'America/Mexico_City',
     year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
   const [year,month,today]=localToday.split('-').map(Number);
   const title=await frame.locator('#calendarLabel').innerText();
   const expectedName=new Intl.DateTimeFormat('es-MX',{month:'long',year:'numeric',timeZone:'UTC'})
     .format(new Date(localToday.slice(0,7)+'-01T12:00:00Z'));
   assert.equal(title.toLowerCase(),expectedName.toLowerCase(),'No inicia en el mes actual');
   const days=await frame.locator('#calendarDays button').count();
   assert.equal(days,new Date(Date.UTC(year,month,0)).getUTCDate());
   const past=await frame.locator('#calendarDays button.past').count();
   assert.equal(past,today-1,'Los días anteriores deben mostrarse grises');
   assert.equal(await frame.locator('#calendarDays button.past:not([disabled])').count(),0);
   const availability=await frame.locator('#calendarDays button.available').count();
   assert.equal(availability,days-past,'Solo los días desde hoy están verdes');
   assert(await frame.locator('#prevMonth').isDisabled(),'No se debe volver a meses pasados');
   assert.equal(await frame.locator('#clubNotice:visible').count(),0,'El calendario reporta un error');
   const todayButton=frame.locator('#calendarDays button.available').first();
   const todayLabel=await todayButton.getAttribute('aria-label');
   assert(todayLabel?.includes('Disponible'));
   await todayButton.click();
   assert((await frame.locator('#clubDate').inputValue()).length>5,'Seleccionar fecha no actualizó formulario');
   await frame.locator('#clubOwner').selectOption('SI');
   await frame.locator('#clubReason').fill('Celebración ficticia');
   await frame.locator('#clubSubmit').click();
   await frame.locator('#myReservations .reserve-card').first().waitFor({timeout:15000});
   assert.match(await frame.locator('#myReservations').innerText(),/Celebración ficticia/);
   await frame.locator('[data-tab="reservar"]').click();
   await frame.locator('#calendarDays button.waiting').first().waitFor({timeout:15000});
   assert.equal(await frame.locator('#calendarDays button.waiting:not([disabled])').count(),0);
   const waiting=await frame.locator('#calendarDays button.waiting').count();
   assert.equal(waiting,1,'Reserva pendiente debe quedar ámbar');
   await frame.locator('[data-tab="mis-reservas"]').click();
   await frame.locator('#myReservations [data-cancel]').first().click();
   await frame.locator('#clubNotice').waitFor({state:'visible'});
   await frame.locator('[data-tab="reservar"]').click();
   await frame.locator('#calendarDays button.waiting').waitFor({state:'detached',timeout:15000});
   assert.equal(await frame.locator('#calendarDays button.available').count(),days-past,
     'Cancelar debe devolver la fecha al calendario verde');
   await frame.locator('#nextMonth').click();
   assert.notEqual((await frame.locator('#calendarLabel').innerText()).toLowerCase(),title.toLowerCase());
   await frame.locator('#prevMonth').click();
   assert.equal((await frame.locator('#calendarLabel').innerText()).toLowerCase(),title.toLowerCase());
   console.log('PASS '+width+'px: mes actual, fechas pasadas, reserva ámbar, cancelación y navegación');
   await context.close();
  }
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
