/* Menús principal y clínico: preferencia de escritorio y panel móvil independiente. */
(()=>{
 'use strict';
 const button=document.getElementById('menu-toggle')||document.getElementById('history-menu-toggle');
 const sidebar=button&&document.getElementById(button.getAttribute('aria-controls'));
 const overlay=document.getElementById('sidebar-overlay')||document.getElementById('history-sidebar-overlay');
 if(!button||!sidebar||!overlay)return;
 const clinical=sidebar.id==='history-aside';
 const media=window.matchMedia(clinical?'(max-width:760px)':'(max-width:900px)');
 const key='yerena.sidebar.collapsed';
 let collapsed=false,mobileOpen=false;
 try{collapsed=localStorage.getItem(key)==='1'}catch{}
 document.body.classList.add(clinical?'yer-sidebar-clinical':'yer-sidebar-app');
 button.classList.add('yer-sidebar-toggle');
 function apply(){
  const open=media.matches?mobileOpen:!collapsed;
  // Mover el foco antes de volver inaccesible el panel.
  if(!open&&sidebar.contains(document.activeElement))button.focus({preventScroll:true});
  document.body.classList.toggle('yer-sidebar-collapsed',!open);
  document.body.classList.toggle('mobile-sidebar-open',media.matches&&open);
  sidebar.classList.toggle('open',media.matches&&open);
  sidebar.inert=!open;
  sidebar.setAttribute('aria-hidden',String(!open));
  button.setAttribute('aria-expanded',String(open));
  button.setAttribute('aria-label',open?'Ocultar menú lateral':'Mostrar menú lateral');
  button.title=open?'Ocultar menú lateral':'Mostrar menú lateral';
  button.textContent=open?'‹':'›';
  overlay.classList.toggle('open',media.matches&&open);
  overlay.setAttribute('aria-hidden','true');
 }
 function setMobileOpen(open){
  if(!media.matches)return;
  mobileOpen=Boolean(open);apply();
 }
 button.addEventListener('click',()=>{
  if(media.matches)mobileOpen=!mobileOpen;
  else{
   collapsed=!collapsed;
   try{localStorage.setItem(key,collapsed?'1':'0')}catch{}
  }
  apply();
 });
 overlay.addEventListener('click',()=>setMobileOpen(false));
 sidebar.addEventListener('click',event=>{
  if(event.target.closest('[data-view],[data-tab],a[href]'))setMobileOpen(false);
 });
 document.addEventListener('keydown',event=>{
  if(!media.matches||!mobileOpen)return;
  if(event.key==='Escape'){event.preventDefault();setMobileOpen(false);button.focus();return}
  if(event.key!=='Tab')return;
  const controls=[button,...sidebar.querySelectorAll('a[href],button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex="0"]')]
   .filter(node=>!node.hidden&&node.getClientRects().length);
  const first=controls[0],last=controls[controls.length-1],current=document.activeElement;
  if(event.shiftKey&&(current===first||!controls.includes(current))){event.preventDefault();last?.focus()}
  else if(!event.shiftKey&&(current===last||!controls.includes(current))){event.preventDefault();first?.focus()}
 });
 media.addEventListener('change',()=>{mobileOpen=false;apply()});
 window.addEventListener('storage',event=>{if(event.key===key){collapsed=event.newValue==='1';apply()}});
 window.YerenaSidebar={setMobileOpen};
 apply();
})();
