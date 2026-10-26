/* Connects existing private MySQL clinical files with local CBCT series viewer.
   No third-party uploads; only patient-authorized authenticated APIs. */
(()=>{
 'use strict';
 const patientId=Number(new URLSearchParams(location.search).get('id'));
 if(!Number.isSafeInteger(patientId)||patientId<1)return;
 const root=document.getElementById('clinical-content');
 if(!root)return;
 let busy=false,instance=null,scheduled=false,selectedFiles=[];
 const API_BASE=window.YERENA_CONFIG.API_BASE_URL.replace(/\/$/,'');
 const safe=t=>String(t??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','"':'&quot;'}[c]));
 const isDicom=n=>/\.(dcm|dicom|ima)$/i.test(String(n||''));
 function stateText(str){const node=document.getElementById('cbct-status');if(node)node.textContent=str}
 function dispose(){if(instance){instance.dispose();instance=null}}
 function currentViewer(){return root.querySelector('#clinical-viewer')}
 function isRadiographTab(){return root.querySelector('#clinical-viewer')&&root.querySelector('form[data-category="radiograph"]')}
 async function getBlob(id){
  const r=await fetch(API_BASE+'/clinical/'+patientId+'/files/'+id,{
   headers:{Authorization:'Bearer '+API.token()},cache:'no-store'
  });
  if(!r.ok)throw Error('No se pudo descargar un corte DICOM ('+r.status+').');
  return r.arrayBuffer();
 }
 function openVolume(volume,label){
  const host=currentViewer();
  if(!host)throw Error('Regresa a Radiografías para visualizar el estudio.');
  dispose();
  host.replaceChildren();
  instance=window.YerenaCBCTViewer.mount(host,volume,{name:label});
  host.scrollIntoView({behavior:'smooth',block:'start'});
 }
 async function collectLocal(files){
  const result=await window.YerenaCBCTArchive.fromFiles(files,{
   onProgress:(count,total,stage)=>progress(count,total,stage)
  });
  stateText(result.kind==='zip'
   ?'ZIP descomprimido localmente: '+result.records.length+' cortes DICOM · '+window.YerenaCBCTArchive.readableBytes(result.totalBytes)+' descomprimidos.'
   :'Serie local: '+result.records.length+' cortes DICOM leídos.');
  return result.records;
 }
 function progress(done,total,label){
  const bar=root.querySelector('#cbct-progress-fill'),wrapper=root.querySelector('#cbct-progress');
  if(wrapper){wrapper.hidden=false;wrapper.setAttribute('aria-valuenow',String(Math.floor(done/Math.max(1,total)*100)))}
  if(bar)bar.style.width=Math.floor(done/Math.max(1,total)*100)+'%';
  stateText(label+' · '+done+' de '+total);
 }
 function setBusy(value){
  busy=value;
  root.querySelectorAll('#cbct-series-panel button').forEach(b=>b.disabled=value);
  root.querySelectorAll('#cbct-series-panel input').forEach(b=>b.disabled=value);
  root.querySelector('#cbct-series-panel')?.classList.toggle('cbct-busy',value);
 }
 function displaySelection(files){
  selectedFiles=[...files];
  const title=root.querySelector('#cbct-selection-name'),caption=root.querySelector('#cbct-selection-details'),clear=root.querySelector('#cbct-selection-clear');
  if(!title||!caption)return;
  if(!selectedFiles.length){
   title.textContent='Arrastra aquí un ZIP o tus archivos DICOM';
   caption.textContent='ZIP completo, carpeta CBCT o varios .dcm · Procesamiento privado en tu navegador';
  }else if(selectedFiles.length===1&&/\.zip$/i.test(selectedFiles[0].name)){
   title.textContent=selectedFiles[0].name;
   caption.textContent='Archivo ZIP seleccionado · '+window.YerenaCBCTArchive.readableBytes(selectedFiles[0].size)+' · Se extraerán sus cortes al abrir';
  }else{
   title.textContent=selectedFiles.length+' archivos seleccionados';
   const total=selectedFiles.reduce((n,file)=>n+file.size,0);
   caption.textContent=window.YerenaCBCTArchive.readableBytes(total)+' en archivos DICOM · Se validará su geometría';
  }
  if(clear)clear.hidden=!selectedFiles.length;
  const bar=root.querySelector('#cbct-progress');if(bar)bar.hidden=true;
  stateText('');
 }
 async function assemble(files){
  return window.YerenaVolume.fromFiles(files,(n,total,step)=>{
   if(n===total||n%6===0)stateText(step+' · '+n+'/'+total);
  });
 }
 async function uploadFile(record,uid,i,total){
  const qs=new URLSearchParams({category:'radiograph',name:record.name,description:'CBCT:'+uid});
  const result=await fetch(API_BASE+'/clinical/'+patientId+'/files?'+qs,{
   method:'POST',headers:{Authorization:'Bearer '+API.token(),'Content-Type':'application/dicom'},
   body:record.file,cache:'no-store'
  });
  if(!result.ok){const body=await result.json().catch(()=>({}));throw Error(body.error||'No se pudo guardar el corte '+(i+1)+'/'+total)}
 }
 async function uploadZip(file,volume){
  if(file.size>14*1024*1024)throw Error('El ZIP supera 14 MB y no cabe como un único archivo en MySQL. Puedes abrirlo sin guardar, o descomprimirlo y guardar la carpeta como serie DICOM.');
  const qs=new URLSearchParams({category:'radiograph',name:file.name});
  const res=await fetch(API_BASE+'/clinical/'+patientId+'/files?'+qs,{
   method:'POST',headers:{Authorization:'Bearer '+API.token(),'Content-Type':'application/zip'},body:file,cache:'no-store'
  });
  const json=await res.json().catch(()=>({}));
  if(!res.ok)throw Error(json.error||'No se pudo guardar el ZIP.');
  return json.file;
 }
 async function selectedLocal(persist){
  if(busy)return;
  const files=selectedFiles;
  setBusy(true);
  try{
   const records=await collectLocal(files);
   const volume=await assemble(records);
   if(persist){
    const isZip=files.length===1&&window.YerenaCBCTArchive.isZip(files[0].name);
    const metadata=window.YerenaDicomViewer.parse(records[0].buffer).metadata;
    if(!metadata?.seriesUID||metadata.seriesUID.length>64)throw Error('La serie no incluye UID válido.');
    if(isZip&&files[0].size>14*1024*1024)throw Error('Este ZIP supera el límite de 14 MB por archivo de MySQL. Puedes abrirlo localmente sin guardar o seleccionar una carpeta con los DICOM para guardar los cortes por separado.');
    const ok=confirm(isZip?'¿Guardar '+files[0].name+' como una sola tomografía ZIP ('+records.length+' cortes) en Radiografías y Tomografías?':'¿Guardar '+records.length+' cortes DICOM en MySQL? Los cortes de la carpeta se almacenarán individualmente.');
    if(!ok){stateText('No se guardó ningún archivo.');return}
    if(isZip){
     progress(0,1,'Guardando tomografía ZIP original en MySQL');
     await uploadZip(files[0],volume);
     progress(1,1,'Tomografía ZIP guardada');
    }else{
     for(let i=0;i<records.length;i++){
      progress(i+1,records.length,'Guardando cortes DICOM originales en MySQL');
      await uploadFile(records[i],metadata.seriesUID,i,records.length);
      await new Promise(resolve=>setTimeout(resolve,0));
     }
    }
    // Refresca sin recargar la página para mostrar inmediatamente el ZIP o serie recién guardada.
    if(typeof window.YerenaClinicalRefresh==='function')await window.YerenaClinicalRefresh();
    stateText(isZip?'ZIP guardado como '+files[0].name+' en Radiografías y Tomografías.':'Cortes DICOM guardados en Radiografías y Tomografías.');
   }else stateText('Serie cargada localmente; no se guardó en la base de datos.');
   openVolume(volume,'CBCT · '+records.length+' cortes');
  }catch(err){stateText('Error: '+err.message)}
  finally{setBusy(false)}
 }
 async function stored(ids,label){
  if(busy)return;
  busy=true;
  try{
   if(ids.length<12)throw Error('Se requieren al menos 12 cortes espaciales válidos para abrir el volumen.');
   const files=[];
   for(let i=0;i<ids.length;i++){
    stateText('Descargando cortes protegidos '+(i+1)+'/'+ids.length);
    files.push({name:'dicom_'+ids[i]+'.dcm',buffer:await getBlob(ids[i])});
    if(i%3===0)await new Promise(resolve=>setTimeout(resolve,0));
   }
   const volume=await assemble(files);
   stateText('Volumen DICOM listo.');
   openVolume(volume,label);
  }catch(err){stateText('No se pudo construir el volumen: '+err.message)}
  finally{busy=false}
 }
 async function storedZip(fileId,filename){
  if(busy)return;
  busy=true;
  try{
   stateText('Recuperando '+filename+' desde el expediente privado');
   const bytes=await getBlob(fileId);
   const fake={name:filename,size:bytes.byteLength,arrayBuffer:async()=>bytes};
   const records=await collectLocal([fake]);
   const volume=await assemble(records);
   stateText('Tomografía ZIP lista: '+records.length+' cortes reconstruidos.');
   openVolume(volume,filename);
  }catch(err){stateText('No se pudo abrir la tomografía: '+err.message)}
  finally{busy=false}
 }
 document.addEventListener('click',event=>{
  const open=event.target.closest('[data-file-open][data-file-type="application/zip"]');
  if(!open||!root.contains(open))return;
  event.preventDefault();
  storedZip(Number(open.dataset.fileOpen),open.dataset.fileName);
 });
 function prepareStored(){
  const list=root.querySelector('.clinical-file-list');
  if(!list)return;
  const rows=[...list.querySelectorAll('.clinical-file')];
  const series=new Map();
  for(const row of rows){
   const file=row.querySelector('[data-file-open]');
   if(!file||!isDicom(file.dataset.fileName))continue;
   const id=Number(file.dataset.fileOpen);
   const records=row.querySelector('small')?.textContent||'';
   // Series grouping via description populated by the CBCT uploader.
   const match=/^CBCT:([0-9.]+)(?:\s|·|$)/.exec(records.trim());
   if(!match){
    const box=document.createElement('label');box.title='Agregar corte al volumen';
    box.className='cbct-pick';const check=document.createElement('input');
    check.type='checkbox';check.className='cbct-stored-selection';check.value=String(id);
    box.append(check,document.createTextNode('Serie 3D'));row.prepend(box);continue;
   }
   const uid=match[1];
   if(!series.has(uid))series.set(uid,[]);
   series.get(uid).push({id,row});
  }
  for(const [uid,items] of series){
   const group=document.createElement('section');group.className='cbct-group';
   const head=document.createElement('div');head.className='cbct-group-head';
   const title=document.createElement('div');title.className='cbct-series-title';title.textContent='CBCT · '+items.length+' cortes DICOM';
   const open=document.createElement('button');open.className='btn btn-primary';open.type='button';
   open.textContent='Abrir 2D / 3D / Panoramic';open.addEventListener('click',()=>stored(items.map(x=>x.id),'CBCT · '+items.length+' cortes'));
   head.append(title,open);
   const details=document.createElement('details');const summary=document.createElement('summary');summary.textContent='Ver y administrar archivos originales';details.append(summary);
   const inner=document.createElement('div');inner.className='clinical-file-list';
   items.forEach(x=>inner.append(x.row));
   details.append(inner);group.append(head,details);list.prepend(group);
  }
 }
 function setup(){
  if(!isRadiographTab()||root.querySelector('#cbct-series-panel'))return;
  const first=root.querySelector('.clinical-card');if(!first)return;
  const panel=document.createElement('section');panel.id='cbct-series-panel';panel.className='cbct-series-panel';
  const heading=document.createElement('div');heading.className='cbct-upload-header';
  const icon=document.createElement('div');icon.className='cbct-upload-icon';icon.setAttribute('aria-hidden','true');icon.textContent='▣';
  const text=document.createElement('div');const title=document.createElement('h3');title.className='cbct-series-title';title.textContent='Estudio CBCT · Visor 2D / 3D / Panoramic';
  const hint=document.createElement('p');hint.className='cbct-series-note';
  hint.textContent='Carga un solo ZIP con cortes DICOM, o selecciona una carpeta con todos los cortes. El sistema revisará su geometría antes de abrir las vistas.';
  text.append(title,hint);heading.append(icon,text);
  const zone=document.createElement('div');zone.className='cbct-dropzone';
  zone.setAttribute('role','button');zone.tabIndex=0;zone.setAttribute('aria-label','Seleccionar ZIP o archivos DICOM');
  const image=document.createElement('div');image.className='cbct-dropzone-mark';image.setAttribute('aria-hidden','true');image.textContent='⇧';
  const info=document.createElement('div');info.className='cbct-dropzone-info';
  const name=document.createElement('strong');name.id='cbct-selection-name';name.textContent='Arrastra aquí un ZIP o tus archivos DICOM';
  const description=document.createElement('span');description.id='cbct-selection-details';
  description.textContent='ZIP completo, carpeta CBCT o varios .dcm · Procesamiento privado en tu navegador';
  info.append(name,description);
  const actions=document.createElement('div');actions.className='cbct-picker-actions';
  const choose=document.createElement('button');choose.type='button';choose.className='cbct-pick-btn';choose.textContent='Elegir ZIP o archivos';
  const folder=document.createElement('button');folder.type='button';folder.className='cbct-pick-folder';folder.textContent='Seleccionar carpeta';
  const clear=document.createElement('button');clear.type='button';clear.className='cbct-pick-clear';clear.id='cbct-selection-clear';clear.textContent='Limpiar';clear.hidden=true;
  const input=document.createElement('input');input.id='cbct-series-files';input.className='cbct-hidden-input';
  input.type='file';input.multiple=true;input.accept='.zip,.dcm,.dicom,.ima,application/zip,application/dicom';
  const folderInput=document.createElement('input');folderInput.id='cbct-series-folder';folderInput.className='cbct-hidden-input';
  folderInput.type='file';folderInput.multiple=true;folderInput.webkitdirectory=true;
  const openPicker=()=>input.click();
  choose.addEventListener('click',event=>{event.stopPropagation();openPicker()});
  folder.addEventListener('click',event=>{event.stopPropagation();folderInput.click()});
  clear.addEventListener('click',event=>{event.stopPropagation();input.value='';folderInput.value='';displaySelection([])});
  input.addEventListener('change',()=>displaySelection(input.files));
  folderInput.addEventListener('change',()=>{
   const files=[...folderInput.files].filter(file=>isDicom(file.name));
   displaySelection(files);
  });
  zone.addEventListener('click',event=>{if(!event.target.closest('button'))openPicker()});
  zone.addEventListener('keydown',event=>{
   if(event.target===zone&&(event.key==='Enter'||event.key===' ')){event.preventDefault();openPicker()}
  });
  let dragDepth=0;
  zone.addEventListener('dragenter',event=>{event.preventDefault();dragDepth++;zone.classList.add('is-dragging')});
  zone.addEventListener('dragover',event=>{event.preventDefault();event.dataTransfer.dropEffect='copy'});
  zone.addEventListener('dragleave',event=>{event.preventDefault();dragDepth=Math.max(0,dragDepth-1);if(!dragDepth)zone.classList.remove('is-dragging')});
  zone.addEventListener('drop',event=>{
   event.preventDefault();dragDepth=0;zone.classList.remove('is-dragging');
   if(busy)return;
   const files=Array.from(event.dataTransfer?.files||[]);
   if(!files.length)return stateText('No se detectaron archivos. Utiliza Seleccionar carpeta si arrastraste una carpeta.');
   displaySelection(files);
  });
  actions.append(choose,folder,clear);zone.append(image,info,actions,input,folderInput);
  const controls=document.createElement('div');controls.className='cbct-upload-footer';
  const local=document.createElement('button');local.className='cbct-main-action';local.type='button';
  local.textContent='Abrir estudio (sin guardar)';local.addEventListener('click',()=>selectedLocal(false));
  const save=document.createElement('button');save.className='cbct-secondary-action';save.type='button';
  save.textContent='Guardar serie y abrir';save.addEventListener('click',()=>selectedLocal(true));
  const storedButton=document.createElement('button');storedButton.className='cbct-secondary-action';storedButton.type='button';
  storedButton.textContent='Abrir selección guardada';
  storedButton.addEventListener('click',()=>stored([...root.querySelectorAll('.cbct-stored-selection:checked')].map(c=>Number(c.value)),'Serie CBCT seleccionada'));
  controls.append(local,save,storedButton);
  const status=document.createElement('p');status.id='cbct-status';status.className='cbct-series-status';status.setAttribute('role','status');
  const progressHolder=document.createElement('div');progressHolder.id='cbct-progress';
  progressHolder.className='cbct-progress';progressHolder.hidden=true;
  progressHolder.setAttribute('role','progressbar');progressHolder.setAttribute('aria-valuemin','0');progressHolder.setAttribute('aria-valuemax','100');
  const fill=document.createElement('div');fill.id='cbct-progress-fill';fill.className='cbct-progress-fill';progressHolder.append(fill);
  const note=document.createElement('p');note.className='cbct-series-note';
  note.textContent='Abrir estudio: los cortes se procesan aquí sin guardar. Guardar ZIP (hasta 14 MB): almacena el ZIP original como un solo estudio. Guardar carpeta: almacena los cortes DICOM por separado. Visor exploratorio, no diagnóstico.';
  panel.append(heading,zone,controls,progressHolder,status,note);first.before(panel);
  prepareStored();
 }
 const observer=new MutationObserver(()=>{
  if(!isRadiographTab()){dispose();return}
  if(scheduled)return;scheduled=true;
  setTimeout(()=>{scheduled=false;setup()},100);
 });
 observer.observe(root,{childList:true});
 setup();
})();
