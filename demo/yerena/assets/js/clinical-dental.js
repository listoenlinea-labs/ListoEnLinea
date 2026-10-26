/* Módulo visual inspirado en Samantha Studio Lab: catálogo completo, denticiones y matriz periodontal.
   Adaptado al backend clínico privado de Dra. Yerena Riso y a su diseño menta/pastel. */
(()=>{
 'use strict';
 const adultUpper=[18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
 const adultLower=[48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];
 const childUpper=[55,54,53,52,51,61,62,63,64,65],childLower=[85,84,83,82,81,71,72,73,74,75];
 const groups=[[18,17,16,15,14,13,12,11],[21,22,23,24,25,26,27,28],[48,47,46,45,44,43,42,41],[31,32,33,34,35,36,37,38]];
 const labels={MB:'Mesiovestibular',B:'Vestibular',DB:'Distovestibular',ML:'Mesiolingual',L:'Lingual / palatina',DL:'Distolingual'};
 const phases=[['initial','Odo. inicial'],['evolution','Odo. evolución'],['discharge','Odo. alta']];
 const surfaces=[['WHOLE','Diente completo'],['OCCLUSAL','Oclusal'],['BUCCAL','Vestibular'],['PALATINA','Palatina'],['LINGUAL','Lingual'],['MESIAL','Mesial'],['DISTAL','Distal']];
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const symbol=(icon,visual)=>window.YerenaDentalArt.findingGlyph(icon,visual);
 const art=(tooth,arch)=>window.YerenaDentalArt.toothArtwork(tooth,arch);
 const api={};let getData=()=>({odontogram:[],periodontal:[]}),refresh=async()=>{},notify=()=>{};
 let catalog=[],phase='initial',dentition='ADULTO',nomenclature='FDI',selected=new Set(),multi=false,popover=false,filter='',face='BUCCAL',draft=new Map(),dirty=new Set(),perioLoaded=false,busy=false;
 const catalogEntry=code=>catalog.find(x=>x.codigo===code);
 // Mostrar registros, no inferir vigencia clínica: el esquema conserva histórico sin estado activo/inactivo.
 const toothFindings=tooth=>(getData().odontogram||[]).filter(x=>x.phase===phase&&Number(x.tooth)===Number(tooth))
  .sort((a,b)=>Number(b.id||0)-Number(a.id||0)||String(b.created_at||'').localeCompare(String(a.created_at||'')));
 const findingName=row=>catalogEntry(row.finding)?.nombre||row.finding;
 const findingState=row=>row.visual_state||catalogEntry(row.finding)?.clasificacion||'NEUTRO';
 const surfaceName=row=>surfaces.find(x=>x[0]===row.surface)?.[1]||row.surface||'Diente completo';
 const findingDescription=row=>findingName(row)+' · '+surfaceName(row)+' · '+findingState(row);
 const key=(tooth,site)=>tooth+':'+site;
 const fdiLabel=tooth=>{
  if(nomenclature==='FDI')return tooth;
  const all=[...adultUpper,...adultLower,...childUpper,...childLower],found=all.indexOf(tooth);
  if(found<0)return tooth;
  if(found<32)return found<16?found+1:32-(found-16);
  const chars='ABCDEFGHIJ',children=[...childUpper,...childLower];
  const idx=children.indexOf(tooth);
  return idx<10?chars[idx]:'TSRQPONMLK'[idx-10];
 };
 function toothVisual(tooth,arch,rows){
  const shown=rows.slice(0,3);
  return "<span class='yer-tooth-visual'>"+art(tooth,arch)+"<span class='yer-tooth-markers' data-marker-count='"+shown.length+"'>"+
   shown.map(row=>"<span class='yer-tooth-marker' title='"+esc(findingDescription(row))+"'>"+symbol(catalogEntry(row.finding)?.icono||'punto',findingState(row))+"</span>").join('')+"</span></span>";
 }
 function chartTooth(tooth,arch){
  const rows=toothFindings(tooth),extra=Math.max(0,rows.length-3);
  const description='Diente '+tooth+', '+rows.length+' registro(s)'+(rows.length?': '+rows.map(findingDescription).join('; '):'');
  return "<button type='button' class='yer-tooth' data-dental-tooth='"+tooth+"' aria-pressed='"+selected.has(tooth)+"' aria-haspopup='dialog' aria-label='"+esc(description)+"'><span class='yer-tooth-number'>"+esc(fdiLabel(tooth))+"</span>"+toothVisual(tooth,arch,rows)+"<span class='yer-tooth-overflow'"+(extra?"":" aria-hidden='true'")+">"+(extra?'+'+extra:'')+"</span></button>";
 }
 function toothRow(ids,arch){return "<div class='yer-teeth-row'>"+ids.map(t=>chartTooth(t,arch)).join('')+"</div>"}
 function dentitionChart(){
  const adult="<div class='yer-teeth-pair'>"+toothRow(adultUpper,'upper')+"<div class='yer-teeth-axis'></div>"+toothRow(adultLower,'lower')+"</div>";
  const child="<div class='yer-teeth-pair primary'>"+toothRow(childUpper,'upper')+"<div class='yer-teeth-axis'></div>"+toothRow(childLower,'lower')+"</div>";
  return "<div class='yer-teeth-stage' tabindex='0' aria-label='Gráfico dental: desplazar horizontalmente para ver todas las piezas'>"+(dentition==='ADULTO'?adult:dentition==='NINO'?child:adult+child)+"</div>";
 }
 function selectedToothDetails(teeth){
  if(teeth.length!==1)return "<p class='clinical-note'>El hallazgo se agregará a las "+teeth.length+" piezas seleccionadas.</p>";
  const tooth=teeth[0],rows=toothFindings(tooth),quadrant=Math.floor(tooth/10);
  const arch=[1,2,5,6].includes(quadrant)?'upper':'lower';
  return "<section class='yer-tooth-detail' aria-label='Registros de la pieza seleccionada'><div class='yer-tooth-enlarged'>"+toothVisual(tooth,arch,rows)+"</div><div class='yer-tooth-detail-content'><h4>"+rows.length+" registro(s) · "+esc(phases.find(x=>x[0]===phase)[1])+"</h4><p class='yer-detail-hint'>Vista: los tres más recientes. La posición del símbolo no indica la superficie.</p><div class='yer-tooth-detail-list' tabindex='0' aria-label='Todos los registros de esta pieza'>"+
   (rows.length?rows.map(row=>"<div class='yer-tooth-detail-row'>"+symbol(catalogEntry(row.finding)?.icono||'punto',findingState(row))+"<div><strong>"+esc(findingName(row))+"</strong><small>"+esc(surfaceName(row))+' · '+esc(findingState(row))+"</small><small>"+esc(String(row.created_at||'').replace('T',' ').slice(0,16))+"</small>"+(row.notes?"<p>"+esc(row.notes)+"</p>":'')+"</div></div>").join(''):"<p class='clinical-muted'>Todavía no hay hallazgos en esta etapa.</p>")+"</div></div></section>";
 }
 function popoverMarkup(){
  const teeth=[...selected].sort((a,b)=>a-b);
  const rows=catalog.map(item=>"<div class='yer-finding-item' data-finding-label='"+esc(item.nombre.toLocaleLowerCase('es-MX').normalize('NFD').replace(/[\u0300-\u036f]/g,''))+"'><span>"+esc(item.nombre)+"</span><div class='yer-finding-variants'>"+item.variantes.map(v=>"<button type='button' class='yer-finding-variant "+v.toLowerCase()+"' data-dental-code='"+esc(item.codigo)+"' data-visual='"+esc(v)+"' title='"+esc(item.nombre)+' · '+v+"'>"+symbol(item.icono,v)+"</button>").join('')+"</div></div>").join('');
  return "<div class='yer-finding-backdrop' data-dental-close></div><section class='yer-finding-dialog' role='dialog' aria-modal='true' aria-labelledby='yer-dialog-title'><header class='yer-finding-head'><h3 id='yer-dialog-title'>"+(teeth.length>1?'Dientes ':'Diente ')+teeth.join(', ')+"</h3><button type='button' class='yer-finding-close' data-dental-close aria-label='Cerrar'>×</button></header>"+
  selectedToothDetails(teeth)+
  "<div class='yer-finding-quick'><button type='button' data-dental-quick='CARIES' class='bad'>Caries</button><button type='button' data-dental-quick='RESTAURACION_DEFICIENTE' class='bad'>Restau.</button><button type='button' data-dental-quick='RESTAURACION' class='good'>Restau.</button></div>"+
  "<label class='yer-finding-search'><span>Buscar hallazgo</span><input id='yer-finding-query' type='search' placeholder='Buscar en los "+catalog.length+" hallazgos' value='"+esc(filter)+"' autocomplete='off'></label>"+
  "<div class='yer-finding-form'><label>Superficie<select id='yer-finding-surface'>"+surfaces.map(([v,t])=>"<option value='"+v+"'>"+t+"</option>").join('')+"</select></label><label>Nota opcional<input id='yer-finding-note' maxlength='500' placeholder='Observaciones clínicas'></label></div>"+
  "<div class='yer-finding-results' id='yer-finding-results'>"+rows+"</div><small class='yer-finding-bottom'>Selecciona el símbolo correspondiente al estado. Se guardará en el expediente del paciente.</small></section>";
 }
 function findingsTable(){
  const rows=getData().odontogram.filter(x=>x.phase===phase).slice(0,100);
  if(!rows.length)return "<div class='clinical-empty'>Selecciona un diente del odontograma para registrar un hallazgo.</div>";
  return "<div class='yer-findings-table'><div class='yer-findings-heading'><b>N.º diente</b><b>Hallazgo</b><b>Superficie</b><b>Estado</b><b>Fecha</b></div>"+rows.map(x=>{const item=catalogEntry(x.finding);return "<div class='yer-finding-record'><span>"+x.tooth+"</span><span>"+symbol(item?.icono||'punto',x.visual_state)+" "+esc(item?.nombre||x.finding)+"</span><span>"+esc(surfaces.find(y=>y[0]===x.surface)?.[1]||x.surface)+"</span><span class='yer-state "+esc((x.visual_state||'NEUTRO').toLowerCase())+"'>"+esc(x.visual_state||'NEUTRO')+"</span><span>"+esc(String(x.created_at||'').slice(0,10))+"</span>"+(x.notes?"<small>"+esc(x.notes)+"</small>":"")+"</div>"}).join('')+"</div>";
 }
 function renderOdontogram(){
  return "<section class='clinical-card yer-dental-card'><div class='yer-odo-header'><nav class='yer-odo-tabs' aria-label='Etapas odontograma'>"+phases.map(([v,label])=>"<button type='button' data-dental-phase='"+v+"' aria-pressed='"+(phase===v)+"'>"+label+"</button>").join('')+"</nav><div class='yer-state-legend'><span class='bad'>● Mal estado</span><span class='good'>● Buen estado</span></div></div>"+
  "<div class='yer-odo-controls'><label>Tipo de dentición<select id='yer-dentition'><option value='ADULTO'"+(dentition==='ADULTO'?' selected':'')+">Adulto</option><option value='MIXTO'"+(dentition==='MIXTO'?' selected':'')+">Mixto</option><option value='NINO'"+(dentition==='NINO'?' selected':'')+">Niño</option></select></label><label>Nomenclatura<select id='yer-nomenclature'><option value='FDI'"+(nomenclature==='FDI'?' selected':'')+">Internacional (FDI)</option><option value='ADA'"+(nomenclature==='ADA'?' selected':'')+">ADA</option></select></label><label class='yer-multi'><input type='checkbox' id='yer-multi' "+(multi?'checked':'')+"> Marcado múltiple</label></div>"+
  "<p class='clinical-subtitle'>Hasta tres símbolos por pieza: los registros más recientes de esta etapa. +N indica registros adicionales. Toca una pieza para ampliarla, consultar todos sus registros o agregar un hallazgo.</p>"+dentitionChart()+
  "<div class='yer-odo-footer'><span class='clinical-pill'>"+selected.size+" pieza(s) seleccionada(s)</span><span class='clinical-note'>Rojo: mal estado · Azul: buen estado · Menta: neutral</span></div></section>"+
  "<section class='clinical-card'><h3>Hallazgos · "+phases.find(x=>x[0]===phase)[1]+"</h3>"+findingsTable()+"</section>"+
  (popover?popoverMarkup():"");
 }
 function ensurePerio(){
  if(perioLoaded)return;
  draft=new Map();
  for(const row of getData().periodontal||[]){
   const k=key(row.tooth,row.site);
   if(!draft.has(k))draft.set(k,{tooth:Number(row.tooth),site:row.site,depth_mm:Number(row.depth_mm),recession_mm:Number(row.recession_mm),mobility:Number(row.mobility)||0,furcation:Number(row.furcation)||0,bleeding:!!row.bleeding,plaque:!!row.plaque,suppuration:!!row.suppuration});
  }
  dirty.clear();perioLoaded=true;
 }
 function getPerio(tooth,site){return draft.get(key(tooth,site))}
 function getValue(tooth,site,property){const item=getPerio(tooth,site);return item?item[property]:undefined}
 function perioInput(tooth,site,field){
  const value=getValue(tooth,site,field);
  const keyAttrs="data-perio-tooth='"+tooth+"' data-perio-site='"+site+"' data-perio-field='"+field+"'";
  if(['plaque','bleeding','suppuration'].includes(field))return "<input type='checkbox' "+keyAttrs+" aria-label='"+field+" pieza "+tooth+" sitio "+site+"' "+(value?'checked':'')+">";
  const low=field==='recession_mm'?-15:0,high=field==='mobility'||field==='furcation'?3:15;
  return "<input type='number' inputmode='numeric' min='"+low+"' max='"+high+"' "+keyAttrs+" value='"+(value??'')+"' placeholder='—' aria-label='"+field+" pieza "+tooth+" sitio "+site+"'>";
 }
 function perioGroup(group){
  const sites=face==='BUCCAL'?['MB','B','DB']:['ML','L','DL'];
  const label=["","Movilidad","Sangrado","Placa","Margen gingival","Profundidad","Furcación","Supuración"];
  const fields=['mobility','bleeding','plaque','recession_mm','depth_mm','furcation','suppuration'];
  const heading="<div class='yer-perio-thead'><div class='yer-perio-corner'>"+(face==='BUCCAL'?'Vestibular':'Lingual / palatina')+"</div>"+group.map(t=>"<div class='yer-perio-piece' colspan='3'>"+t+"</div>").join('')+"</div>";
  const rows=fields.map((field,i)=>"<div class='yer-perio-tr'><div class='yer-perio-rowlabel'>"+label[i+1]+"</div>"+group.map(tooth=>"<div class='yer-perio-three"+(['mobility','furcation'].includes(field)?' unified':'')+"'>"+(['mobility','furcation'].includes(field)?perioInput(tooth,sites[1],field):sites.map(site=>perioInput(tooth,site,field)).join(''))+"</div>").join('')+"</div>").join('');
  return "<div class='yer-perio-section'><div class='yer-perio-scroll' tabindex='0' aria-label='Tabla de piezas "+group.join(' a ')+"; desliza horizontalmente'><div class='yer-perio-grid'>"+heading+rows+"</div></div></div>";
 }
 function perioGraph(arch,ids){
  const sites=face==='BUCCAL'?['MB','B','DB']:['ML','L','DL'];
  const dataPoints=ids.flatMap(t=>sites.map(s=>getPerio(t,s)));
  const line=(field,base,scale)=>{let current=[],paths=[];
    dataPoints.forEach((entry,i)=>{
     if(!entry){if(current.length){paths.push(current.join(' '));current=[]}return}
     current.push((current.length?'L':'M')+(i/(dataPoints.length-1)*1000).toFixed(2)+' '+(base+(Number(entry[field])||0)*scale).toFixed(2));
    });
    if(current.length)paths.push(current.join(' '));return paths.join(' ');
  };
  return "<div class='yer-perio-graph-scroll' tabindex='0' aria-label='Gráfica periodontal horizontal: desplazar para explorar todos los dientes'><div class='yer-perio-graph'><svg viewBox='0 0 1000 150' preserveAspectRatio='none' role='img' aria-label='Gráfica periodontal "+arch+"'><g class='yer-graph-grid'>"+[25,50,75,100,125].map(y=>"<line x1='0' y1='"+y+"' x2='1000' y2='"+y+"'/>").join('')+"</g><path class='yer-graph-gingiva' d='"+line('recession_mm',75,-6)+"'/><path class='yer-graph-depth' d='"+line('depth_mm',75,5)+"'/></svg><div class='yer-perio-illustrations'>"+ids.map(t=>art(t,arch)).join('')+"</div></div></div>";
 }
 function renderPerio(){
  ensurePerio();
  const values=[...draft.values()],count=values.length,avg=count?values.reduce((s,v)=>s+v.depth_mm,0)/count:0;
  const pct=k=>count?Math.round(values.filter(v=>v[k]).length/count*100):0;
  return "<section class='clinical-card yer-perio-card'><div class='yer-perio-top'><h3>Periodontograma completo</h3><label>Cara<select id='yer-perio-face'><option value='BUCCAL'"+(face==='BUCCAL'?' selected':'')+">Vestibular</option><option value='LINGUAL'"+(face==='LINGUAL'?' selected':'')+">Lingual / palatina</option></select></label><button type='button' class='btn btn-primary' data-perio-save "+(!dirty.size||busy?'disabled':'')+">Guardar cambios ("+dirty.size+")</button></div>"+
  "<div class='yer-perio-summary'><span>Sitios registrados <b>"+count+"</b></span><span>Placa <b>"+pct('plaque')+"%</b></span><span>Sangrado <b>"+pct('bleeding')+"%</b></span><span>Profundidad media <b>"+avg.toFixed(1)+" mm</b></span></div><p class='clinical-subtitle'>Matriz clínica de 6 sitios por diente. Cada bloque puede desplazarse horizontalmente en celular. Los valores que cambies se enviarán a MySQL al pulsar Guardar.</p>"+
  perioGroup(groups[0])+perioGroup(groups[1])+perioGraph('upper',adultUpper)+perioGroup(groups[2])+perioGroup(groups[3])+perioGraph('lower',adultLower)+
  "<div class='yer-perio-bottom'><span class='clinical-note'>Línea rosa: margen gingival · Línea azul: profundidad de sondaje.</span><button type='button' class='btn btn-primary' data-perio-save "+(!dirty.size||busy?'disabled':'')+">Guardar cambios ("+dirty.size+")</button></div></section>";
 }
 function updatePerioPreview(){
  const values=[...draft.values()],count=values.length,avg=count?values.reduce((s,v)=>s+v.depth_mm,0)/count:0;
  const pct=field=>count?Math.round(values.filter(v=>v[field]).length/count*100):0;
  const panel=document.querySelector('.yer-perio-summary');
  if(panel)panel.innerHTML="<span>Sitios registrados <b>"+count+"</b></span><span>Placa <b>"+pct('plaque')+"%</b></span><span>Sangrado <b>"+pct('bleeding')+"%</b></span><span>Profundidad media <b>"+avg.toFixed(1)+" mm</b></span>";
  document.querySelectorAll('.yer-perio-graph-scroll').forEach((container,index)=>{
   const left=container.scrollLeft,html=perioGraph(index===0?'upper':'lower',index===0?adultUpper:adultLower);
   const node=document.createElement('div');node.innerHTML=html;
   const next=node.firstElementChild;if(next){container.replaceWith(next);next.scrollLeft=left}
  });
 }
 function updatePerioInput(input){
  const t=Number(input.dataset.perioTooth),site=input.dataset.perioSite,field=input.dataset.perioField,k=key(t,site);
  const record=draft.get(k)||{tooth:t,site,depth_mm:0,recession_mm:0,mobility:0,furcation:0,bleeding:false,plaque:false,suppuration:false};
  if(input.type==='checkbox')record[field]=input.checked;
  else{
   if(input.value===''||!input.checkValidity())return;
   record[field]=Number(input.value);
  }
  draft.set(k,record);dirty.add(k);
  if(['mobility','furcation'].includes(field)){
   const sameFace=site==='B'?['MB','B','DB']:['ML','L','DL'];
   for(const s of sameFace){if(s===site)continue;
    const otherKey=key(t,s),other=draft.get(otherKey)||{tooth:t,site:s,depth_mm:0,recession_mm:0,mobility:0,furcation:0,bleeding:false,plaque:false,suppuration:false};
    other[field]=record[field];draft.set(otherKey,other);dirty.add(otherKey);
   }
  }
  document.querySelectorAll('[data-perio-save]').forEach(button=>{button.disabled=false;button.textContent='Guardar cambios ('+dirty.size+')'});
  updatePerioPreview();
 }
 async function savePerio(){
  if(busy||!dirty.size)return;busy=true;
  document.querySelectorAll('[data-perio-save]').forEach(b=>b.disabled=true);
  try{
   const measurements=[...dirty].map(k=>draft.get(k));
   await api.request('/clinical/'+api.id+'/periodontal/batch',{method:'POST',body:JSON.stringify({measurements})});
   notify('Periodontograma guardado: '+measurements.length+' sitios.');
   perioLoaded=false;await refresh();
  }catch(e){notify(e.message);busy=false;document.querySelectorAll('[data-perio-save]').forEach(b=>b.disabled=false)}
  busy=false;
 }
 async function saveFinding(button){
  if(busy)return;
  const item=catalogEntry(button.dataset.dentalCode);if(!item)return;
  const surface=document.getElementById('yer-finding-surface').value;
  const note=document.getElementById('yer-finding-note').value;
  // Samantha permite Diente completo también para atajos como Caries.
  const teeth=[...selected];busy=true;
  try{
   for(const tooth of teeth)await api.request('/clinical/'+api.id+'/odontogram',{method:'POST',body:JSON.stringify({phase,tooth,surface,finding:item.codigo,visual_state:button.dataset.visual,notes:note})});
   popover=false;filter='';notify('Hallazgo guardado en '+teeth.length+' pieza(s).');await refresh();
  }catch(e){notify(e.message)}finally{busy=false}
 }
 function restoreToothFocus(){
  const tooth=[...selected][0];
  requestAnimationFrame(()=>document.querySelector('[data-dental-tooth="'+tooth+'"]')?.focus({preventScroll:true}));
 }
 function closeFinding(){popover=false;filter='';refresh({localOnly:true});restoreToothFocus()}
 function onClick(e){
  const f=e.target.closest('[data-dental-tooth]');
  if(f){const t=Number(f.dataset.dentalTooth);if(!multi)selected.clear();if(multi&&selected.has(t))selected.delete(t);else selected.add(t);popover=selected.size>0;filter='';refresh({localOnly:true});if(popover)requestAnimationFrame(()=>document.getElementById('yer-finding-query')?.focus());return}
  const stage=e.target.closest('[data-dental-phase]');
  if(stage){phase=stage.dataset.dentalPhase;popover=false;refresh({localOnly:true});return}
  if(e.target.closest('[data-dental-close]')){closeFinding();return}
  const quick=e.target.closest('[data-dental-quick]');
  if(quick){const button=document.querySelector('[data-dental-code="'+quick.dataset.dentalQuick+'"]');if(button)saveFinding(button);return}
  const variant=e.target.closest('[data-dental-code]');if(variant){saveFinding(variant);return}
  if(e.target.closest('[data-perio-save]')){savePerio();return}
 }
 function onChange(e){
  if(e.target.id==='yer-dentition'){dentition=e.target.value;popover=false;selected.clear();refresh({localOnly:true})}
  if(e.target.id==='yer-nomenclature'){nomenclature=e.target.value;refresh({localOnly:true})}
  if(e.target.id==='yer-multi'){multi=e.target.checked;if(!multi&&selected.size>1)selected=new Set([[...selected][0]]);refresh({localOnly:true})}
  if(e.target.id==='yer-perio-face'){face=e.target.value;refresh({localOnly:true})}
 }
 function onInput(e){
  if(e.target.id==='yer-finding-query'){filter=e.target.value;const q=filter.toLocaleLowerCase('es-MX').normalize('NFD').replace(/[\u0300-\u036f]/g,'');document.querySelectorAll('.yer-finding-item').forEach(row=>{row.hidden=!row.dataset.findingLabel.includes(q)});return}
  if(e.target.matches('[data-perio-field]'))updatePerioInput(e.target);
 }
 document.addEventListener('keydown',e=>{
  const dialog=document.querySelector('.yer-finding-dialog');if(!popover||!dialog)return;
  if(e.key==='Escape'){e.preventDefault();closeFinding();return}
  if(e.key==='Tab'){
   const controls=[...dialog.querySelectorAll('button:not(:disabled),input:not(:disabled),select:not(:disabled),[tabindex="0"]')].filter(x=>x.getClientRects().length);
   const first=controls[0],last=controls[controls.length-1];
   if(e.shiftKey&&(document.activeElement===first||!dialog.contains(document.activeElement))){e.preventDefault();last?.focus()}
   else if(!e.shiftKey&&(document.activeElement===last||!dialog.contains(document.activeElement))){e.preventDefault();first?.focus()}
  }
 });
 window.YerenaDental={
  async setup(opts){
   Object.assign(api,{request:opts.API.request,id:opts.id});getData=opts.getData;refresh=opts.refresh;notify=opts.notify;
   const response=await opts.API.request('/clinical/catalog/odontogram');
   catalog=Array.isArray(response.items)?response.items:[];
   document.addEventListener('click',onClick);document.addEventListener('change',onChange);document.addEventListener('input',onInput);
  },
  renderOdontogram,renderPerio
 };
})();
