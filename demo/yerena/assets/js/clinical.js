(()=>{
 'use strict';
 const id=Number(new URLSearchParams(location.search).get('id'));
 const content=document.getElementById('clinical-content'),title=document.getElementById('clinical-view-title'),subtitle=document.getElementById('clinical-view-subtitle');
 let data=null,tab=(new URLSearchParams(location.search).get('tab')==='radiographs'?'radiographs':'filiation'),phase='initial',selectedTooth=11,viewerUrl=null,photoUrl=null,canDeleteFiles=false;
 const rxController=window.YerenaRadiographControls.create();
 const radiographToolbar=()=>window.YerenaRadiographControls.toolbarMarkup();
 const tabs={filiation:['Filiación','Datos generales, fecha de nacimiento y contacto de emergencia.'],history:['Historia clínica','Antecedentes médicos y odontológicos del paciente.'],odontogram:['Odontograma','Piezas FDI y hallazgos registrados por etapa clínica.'],periodontal:['Periodontograma','Profundidad de sondaje y sangrado por sitio dental.'],documents:['Archivos PDF','Documentos privados del expediente.'],prescriptions:['Prescripciones','Indicaciones y prescripciones registradas por el profesional.'],radiographs:['Radiografías y Tomografías','Estudios 2D y tomografías CBCT con reconstrucción volumétrica cuando el estudio lo permite.']};
 const findings={healthy:'Sano',caries:'Caries',filling:'Restauración',missing:'Ausente',crown:'Corona',root_canal:'Endodoncia',fracture:'Fractura',watch:'En observación'};
 const teethGroups=[[18,17,16,15,14,13,12,11],[21,22,23,24,25,26,27,28],[48,47,46,45,44,43,42,41],[31,32,33,34,35,36,37,38]];
 const esc=x=>String(x??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
 function notify(t){const el=document.getElementById('clinical-toast');el.textContent=t;el.classList.remove('hidden');clearTimeout(notify.timer);notify.timer=setTimeout(()=>el.classList.add('hidden'),4200)}
 function field(key,label,value='',kind='text',opts=''){return "<div class='clinical-field'><label for='f-"+esc(key)+"'>"+esc(label)+"</label>"+(kind==='textarea'?"<textarea id='f-"+esc(key)+"' name='"+esc(key)+"' maxlength='2500'>"+esc(value)+"</textarea>":"<input id='f-"+esc(key)+"' type='"+esc(kind)+"' name='"+esc(key)+"' value='"+esc(value)+"' "+opts+">")+"</div>"}
 function card(heading,body){return "<section class='clinical-card'><h3>"+esc(heading)+"</h3>"+body+"</section>"}
 function actions(label){return "<div class='clinical-actions'><button class='btn btn-primary' type='submit'>"+esc(label)+"</button></div>"}
 function age(date){if(!date)return 'Edad sin registrar';const birth=new Date(String(date).slice(0,10)+'T12:00:00'),today=new Date();if(Number.isNaN(birth.getTime())||birth>today)return 'Edad sin registrar';let n=today.getFullYear()-birth.getFullYear();if(today.getMonth()<birth.getMonth()||(today.getMonth()===birth.getMonth()&&today.getDate()<birth.getDate()))n--;return n+' años'}
 function dateText(s){if(!s)return '';const d=new Date(String(s).slice(0,10)+'T12:00:00');return Number.isNaN(d.getTime())?String(s).slice(0,16):d.toLocaleDateString('es-MX',{year:'numeric',month:'short',day:'numeric'})}
 function getForm(form){return Object.fromEntries(new FormData(form).entries())}
 function select(name,items,selected){return "<select id='f-"+esc(name)+"' name='"+esc(name)+"'>"+items.map(([value,label])=>"<option value='"+esc(value)+"'"+(String(value)===String(selected)?" selected":"")+">"+esc(label)+"</option>").join('')+"</select>"}
 function filiationView(){
 const x=data.filiation||{},p=data.patient;
 return card('Información personal',"<form data-form='filiation'><div class='clinical-form-grid'>"+
 field('birth_date','Fecha de nacimiento',String(p.birth_date||'').slice(0,10),'date')+
 field('occupation','Ocupación',x.occupation||'')+
 field('address','Domicilio',x.address||'')+
 field('responsible_adult','Responsable legal / tutor (si aplica)',x.responsible_adult||'')+
 field('emergency_contact','Contacto de emergencia',x.emergency_contact||'')+
 field('emergency_phone','Teléfono de emergencia',x.emergency_phone||'')+
 "<div class='wide'>"+field('notes','Observaciones de filiación',x.notes||'','textarea')+"</div></div>"+
 "<p class='clinical-note'>La fecha de nacimiento permite calcular la edad. Los cambios quedan registrados con la cuenta del usuario.</p>"+actions('Guardar filiación')+"</form>");
 }
 function historyView(){
 const x=data.history||{};
 const items=[['chief_complaint','Motivo de consulta'],['allergies','Alergias conocidas'],['medical_conditions','Enfermedades y antecedentes médicos'],['medications','Medicamentos actuales'],['dental_history','Antecedentes odontológicos'],['observations','Observaciones clínicas']];
 return card('Historia clínica y antecedentes',"<form data-form='history'><div class='clinical-form-grid'>"+items.map(([k,l])=>"<div class='"+(k==='observations'?'wide':'')+"'>"+field(k,l,x[k]||'','textarea')+"</div>").join('')+"</div>"+actions('Guardar historia clínica')+"</form><p class='clinical-note'>Demostración con información inventada; no debe utilizarse como expediente médico real.</p>");
 }
 function toothSVG(){return "<svg viewBox='0 0 38 46' aria-hidden='true'><path d='M8 5C3 8 3 19 6 28c2 6 3 14 8 14 3 0 3-10 5-10s2 10 5 10c6 0 6-8 8-14C36 17 34 6 28 5c-4-2-6 2-9 2s-7-4-11-2Z'/></svg>"}
 function chartState(tooth){return data.odontogram.find(x=>x.tooth===tooth&&x.phase===phase)?.finding||''}
 function odontogramView(){
 const options=[['initial','Odo. inicial'],['evolution','Odo. evolución'],['discharge','Odo. alta']];
 const chart="<div class='tooth-groups'>"+teethGroups.map(g=>"<div class='tooth-group'>"+g.map(t=>"<button class='tooth-btn' type='button' data-tooth='"+t+"' aria-pressed='"+(selectedTooth===t)+"' data-finding='"+esc(chartState(t))+"' title='Pieza "+t+"'><strong>"+t+"</strong>"+toothSVG()+"</button>").join('')+"</div>").join('')+"</div>";
 const rows=data.odontogram.filter(x=>x.phase===phase).slice(0,35);
 const form="<form data-form='odontogram'><div class='clinical-form-grid'>"+
 "<div class='clinical-field'><label>Pieza seleccionada</label><input name='tooth' type='number' value='"+selectedTooth+"' min='11' max='48' readonly></div>"+
 "<div class='clinical-field'><label for='f-finding'>Hallazgo</label>"+select('finding',Object.entries(findings),'healthy')+"</div>"+
 "<div class='clinical-field'><label for='f-surface'>Superficie</label>"+select('surface',[['WHOLE','Toda la pieza'],['OCCLUSAL','Oclusal'],['BUCCAL','Vestibular'],['LINGUAL','Lingual / palatina'],['MESIAL','Mesial'],['DISTAL','Distal']],'WHOLE')+"</div>"+
 "<div class='clinical-field'><label for='f-phase'>Etapa clínica</label>"+select('phase',options,phase)+"</div>"+
 "<div class='wide'>"+field('notes','Observaciones', '', 'textarea')+"</div></div>"+actions('Registrar hallazgo')+"</form>";
 const history=rows.length?"<div class='clinical-activity-list'>"+rows.map(x=>"<div class='clinical-log'><strong>Pieza "+x.tooth+" · "+esc(findings[x.finding]||x.finding)+"</strong><small>"+esc(x.surface)+" · "+esc(dateText(x.created_at))+"</small>"+(x.notes?"<p>"+esc(x.notes)+"</p>":"")+"</div>").join('')+"</div>":"<div class='clinical-empty'>Todavía no hay hallazgos en esta etapa.</div>";
 return card('Odontograma visual · nomenclatura FDI',"<div class='clinical-toolbar'><div class='clinical-field'><label for='chart-phase'>Fase</label><select id='chart-phase'>"+options.map(([v,l])=>"<option value='"+v+"'"+(v===phase?' selected':'')+">"+l+"</option>").join('')+"</select></div><span class='clinical-pill'>Pieza "+selectedTooth+"</span></div>"+chart+"<div class='tooth-legend'>"+Object.entries(findings).map(([v,l])=>"<span>"+esc(l)+"</span>").join('')+"</div>")+"<div class='clinical-two-pane'>"+card('Registrar hallazgo',form)+card('Hallazgos anteriores',history)+"</div>";
 }
 function periodontalView(){
 const rows=data.periodontal.slice(0,50);
 const sites=[['MB','Mesiovestibular'],['B','Vestibular'],['DB','Distovestibular'],['ML','Mesiolingual'],['L','Lingual'],['DL','Distolingual']];
 const current=sites.map(([k,l])=>{const x=data.periodontal.find(e=>e.tooth===selectedTooth&&e.site===k);return "<span"+(x?.depth_mm>=4?" class='deep'":"")+">"+k+"<br>"+(x?x.depth_mm+' mm':'—')+"</span>"}).join('');
 const form="<form data-form='periodontal'><div class='clinical-form-grid'>"+
 "<div class='clinical-field'><label for='f-tooth'>Pieza dental</label>"+select('tooth',teethGroups.flat().map(t=>[t,'Pieza '+t]),selectedTooth)+"</div>"+
 "<div class='clinical-field'><label for='f-site'>Sitio</label>"+select('site',sites,'MB')+"</div>"+
 field('depth_mm','Profundidad de sondaje (mm)',0,'number',"min='0' max='15' required")+
 field('recession_mm','Recesión / margen gingival (mm)',0,'number',"min='-15' max='15' required")+
 "<div class='clinical-field'><label for='f-mobility'>Movilidad</label>"+select('mobility',[[0,'0 · Sin movilidad'],[1,'1 · Leve'],[2,'2 · Moderada'],[3,'3 · Avanzada']],0)+"</div>"+
 "<div class='clinical-field'><label>Indicadores clínicos</label><label class='clinical-check'><input type='checkbox' name='bleeding'> Sangrado al sondaje</label><label class='clinical-check'><input type='checkbox' name='plaque'> Placa</label></div></div>"+actions('Registrar medición')+"</form>";
 return card('Mediciones periodontales por sitio',"<p class='clinical-subtitle'>Registro histórico por pieza y seis sitios. Los valores de 4 mm o más se resaltan para facilitar la revisión clínica; la valoración corresponde al profesional.</p><div class='perio-preview'>"+current+"</div>")+card('Nueva medición',form)+card('Historial de sitios',rows.length?"<div class='clinical-activity-list'>"+rows.map(x=>"<div class='clinical-log'><strong>Pieza "+x.tooth+" · "+esc(x.site)+" · "+x.depth_mm+" mm</strong><small>"+esc(dateText(x.created_at))+(x.bleeding?' · Sangrado':'')+(x.plaque?' · Placa':'')+"</small></div>").join('')+"</div>":"<div class='clinical-empty'>Sin mediciones registradas.</div>");
 }
 function prescriptionsView(){
 const p=data.prescriptions;
 const form="<form data-form='prescriptions'><div class='clinical-form-grid'>"+
 field('medication','Medicamento')+field('dose','Dosis')+field('frequency','Frecuencia')+field('duration','Duración')+
 field('prescriber','Profesional prescriptor','Dra. Yerena Riso')+
 "<div class='wide'>"+field('instructions','Indicaciones adicionales','','textarea')+"</div></div>"+
 "<p class='clinical-note'>Completa y verifica la prescripción. Este módulo registra indicaciones; no reemplaza la firma ni los requisitos legales de una receta oficial.</p>"+actions('Guardar prescripción')+"</form>";
 return card('Registrar prescripción',form)+card('Prescripciones del paciente',p.length?"<div class='clinical-activity-list'>"+p.map(x=>"<div class='clinical-log'><div><strong>"+esc(x.medication)+"</strong><small>"+esc(x.dose)+" · "+esc(x.frequency)+" · "+esc(x.duration)+"</small><small>"+esc(x.prescriber)+" · "+esc(dateText(x.created_at))+"</small>"+(x.instructions?"<p>"+esc(x.instructions)+"</p>":"")+"</div></div>").join('')+"</div>":"<div class='clinical-empty'>No hay prescripciones registradas.</div>");
 }
 function filesView(kind){
 const radiograph=kind==='radiograph';
 const files=data.files.filter(x=>x.category===kind);
 const form="<form data-form='files' data-category='"+kind+"'><div class='clinical-file-picker'><span class='clinical-file-icon' aria-hidden='true'><svg viewBox='0 0 48 48' fill='none' stroke='currentColor' stroke-width='1.7'><path d='M12 5h15l9 9v27a3 3 0 0 1-3 3H12a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3Z'/><path d='M27 5v11h10M16 27h16M16 34h12'/></svg></span><div class='clinical-upload-info'><strong>"+(radiograph?'Agregar estudio radiográfico':'Agregar documento PDF')+"</strong><span data-clinical-filename>Ningún archivo seleccionado</span><label class='clinical-file-button' for='clinical-file-input'>Seleccionar archivo <span aria-hidden='true'>↗</span></label><input id='clinical-file-input' class='clinical-visually-hidden' type='file' name='file' accept='"+(radiograph?'application/dicom,.dcm,.dicom,.ima,application/pdf,image/jpeg,image/png,image/webp,image/tiff,.tif,.tiff,image/bmp,.bmp':'application/pdf')+"' required></div></div><p class='clinical-note'>Archivos ficticios guardados localmente en este navegador · "+(radiograph?'DICOM hasta 14 MB; imágenes y PDF hasta 5 MB.':'máximo 5 MB.')+(radiograph?' Admite DICOM 2D sin compresión, RLE, JPEG Baseline y JPEG Lossless (SV1, 12/16 bits); otros códecs indican su UID y se descargan para PACS.':' Únicamente PDF.')+"</p><div class='clinical-form-grid'>"+field('description','Descripción del archivo')+"</div>"+actions('Guardar archivo')+"</form>";
 const rows=files.length?"<div class='clinical-file-list'>"+files.map(x=>"<article class='clinical-file'><div><strong>"+esc(x.filename)+"</strong><small>"+esc(x.description||'Sin descripción')+" · "+Math.round(x.size_bytes/1024)+" KB · "+esc(dateText(x.created_at))+"</small></div><div class='clinical-actions' style='margin:0'><button class='btn btn-secondary' data-file-open='"+x.id+"' data-file-type='"+esc(x.mime_type)+"' data-file-name='"+esc(x.filename)+"' type='button'>"+(radiograph&&x.mime_type==='application/zip'?'Ver tomografía':radiograph&&x.mime_type==='application/dicom'?'Ver DICOM':radiograph&&['image/jpeg','image/png','image/webp','image/bmp'].includes(x.mime_type)?'Ver imagen':'Descargar')+"</button>"+(['application/dicom','application/zip'].includes(x.mime_type)?"<button type='button' class='btn btn-outline' data-file-download='"+x.id+"' data-file-name='"+esc(x.filename)+"'>Descargar original</button>":'')+(canDeleteFiles?"<button type='button' class='btn btn-outline clinical-delete-file' data-file-delete='"+x.id+"' data-file-name='"+esc(x.filename)+"'>Eliminar</button>":'')+"</div></article>").join('')+"</div>":"<div class='clinical-empty'>Sin archivos en este apartado.</div>";
 return card(radiograph?'Agregar radiografía 2D':'Agregar documento PDF',form)+card(radiograph?'Radiografías y Tomografías':'Archivos del paciente',rows)+(radiograph?"<section class='clinical-card' id='clinical-viewer'><h3>Visor de radiografías</h3><div class='clinical-image-canvas clinical-demo-canvas'><span class='clinical-demo-label'>VISTA DEMOSTRATIVA · NO ES UNA RADIOGRAFÍA REAL</span><svg class='clinical-image-demo-art' viewBox='0 0 320 320' role='img' aria-label='Modelo de orientación ilustrativo: gira y amplía esta figura, no es una imagen diagnóstica'><path d='M88 44 C100 12 218 12 232 44 C255 85 265 122 253 199 C240 273 211 292 160 293 C109 292 80 273 67 199 C55 122 65 85 88 44 Z' fill='none' stroke='#b5c5d1' stroke-width='8'/><rect x='115' y='103' width='34' height='51' rx='4' fill='#25323c'/><rect x='171' y='103' width='34' height='51' rx='4' fill='#25323c'/><ellipse cx='160' cy='207' rx='65' ry='26' fill='none' stroke='#9aaebe' stroke-width='6'/></svg>"+radiographToolbar()+"</div><p class='clinical-note'>Selecciona una radiografía o tomografía guardada para verla aquí. Esta figura solo demuestra zoom y rotación.</p></section><div class='clinical-media-warning'>Visor 2D de consulta (no diagnóstico): archivos individuales DICOM. Para series CBCT con geometría válida, utiliza el módulo volumétrico 2D / 3D / Panoramic. Otros códecs pueden requerir un PACS. El tipo de compresión se identifica al abrir.</div>":"");
 }
 function render(){
  if(!data)return;
  title.textContent=tabs[tab][0];subtitle.textContent=tabs[tab][1];
  document.querySelectorAll('[data-tab]').forEach(x=>{const selected=x.dataset.tab===tab;x.classList.toggle('active',selected);x.setAttribute('aria-current',selected?'page':'false')});
  const views={filiation:filiationView,history:historyView,odontogram:()=>window.YerenaDental.renderOdontogram(),periodontal:()=>window.YerenaDental.renderPerio(),prescriptions:prescriptionsView,documents:()=>filesView('document'),radiographs:()=>filesView('radiograph')};
  content.innerHTML=views[tab]();
 }
 window.YerenaClinicalRefresh=async()=>{data=await API.request('/clinical/'+id);render();};
 async function load(){
  if(!Number.isSafeInteger(id)||id<1)throw new Error('Selecciona un paciente válido.');
  const session=await API.request('/auth/me');
  if(!['admin','asistente'].includes(session.user?.role))throw new Error('No tienes permisos para consultar expedientes clínicos.');
  canDeleteFiles=session.user.role==='admin';
  data=await API.request('/clinical/'+id);
  const p=data.patient;
  document.getElementById('history-patient-name').textContent=p.first_name+' '+p.last_name;
  document.getElementById('history-patient-age').textContent=age(p.birth_date);
  document.getElementById('history-patient-contact').textContent=p.phone||'Sin teléfono';
  if(p.has_photo){try{photoUrl=URL.createObjectURL(await API.photo(id));const x=document.getElementById('history-photo');x.textContent='';const img=document.createElement('img');img.src=photoUrl;img.alt='Foto del paciente';x.append(img)}catch{}}
  await window.YerenaDental.setup({API,id,getData:()=>data,notify,refresh:async({localOnly=false}={})=>{if(!localOnly)data=await API.request('/clinical/'+id);render()}});
  render();
 }
 async function blobFile(fileId){
  const res=await fetch(window.YERENA_CONFIG.API_BASE_URL.replace(/\/$/,'')+'/clinical/'+id+'/files/'+fileId,{headers:{Authorization:'Bearer '+API.token()},cache:'no-store'});
  if(res.status===401){API.logout();throw new Error('Sesión caducada.')}
  if(!res.ok){const msg=await res.json().catch(()=>({}));throw new Error(msg.error||'No se pudo abrir el archivo.')}
  return res.blob();
 }
 function resetViewer(){if(viewerUrl){URL.revokeObjectURL(viewerUrl);viewerUrl=null}rxController.change('reset')}
 function transform(){document.querySelectorAll('#clinical-radiograph-image,.clinical-image-demo-art').forEach(img=>{img.style.transform=rxController.cssTransform()})}
 document.addEventListener('click',async e=>{
  const btn=e.target.closest('[data-tab]');if(btn){tab=btn.dataset.tab;resetViewer();render();return}
  const tooth=e.target.closest('[data-tooth]');if(tooth){selectedTooth=Number(tooth.dataset.tooth);render();return}
  const f=e.target.closest('[data-file-open]');if(f){
   if(f.dataset.fileType==='application/zip')return; // Manejador especializado CBCT con vistas 2D, 3D y Panoramic.
   try{
    const blob=await blobFile(Number(f.dataset.fileOpen));
    if(tab==='radiographs'&&f.dataset.fileType==='application/dicom'){
     resetViewer();const div=document.getElementById('clinical-viewer');
     if(!div)throw new Error('Abre primero la pestaña Radiografías.');
     div.innerHTML='<h3>Visor DICOM 2D · '+esc(f.dataset.fileName)+'</h3><div id="clinical-dicom-host"></div><p class="clinical-note">Visualización de consulta, no certificada para diagnóstico. Mueve con el dedo o ratón; ajusta contraste y zoom. La imagen se procesa localmente, sin enviarla a terceros.</p>';
     const buffer=await blob.arrayBuffer();
     let syntax=null;
     try{
      syntax=window.YerenaDicomViewer.inspect(buffer);
      await window.YerenaDicomViewer.mount(buffer,div.querySelector('#clinical-dicom-host'));
      const detail=document.createElement('p');detail.className='clinical-note';
      detail.textContent='Transfer Syntax: '+syntax.label+' · UID '+syntax.uid+' · Imagen procesada localmente.';
      div.append(detail);
     }catch(err){
      const host=div.querySelector('#clinical-dicom-host');
      if(host)host.textContent=err.message+' Puedes descargar el archivo original desde la lista de estudios.';
      notify('No se pudo abrir la radiografía. Revisa el detalle del formato DICOM.');
     }
     return;
    }
    const url=URL.createObjectURL(blob);
    if(tab==='radiographs'&&['image/jpeg','image/png','image/webp','image/bmp'].includes(f.dataset.fileType)){
     resetViewer();viewerUrl=url;
     const div=document.getElementById('clinical-viewer');
     if(div){div.innerHTML="<h3>Visor · "+esc(f.dataset.fileName)+"</h3><div class='clinical-image-viewer'><div class='clinical-image-canvas'><img id='clinical-radiograph-image' alt='Radiografía clínica'>"+radiographToolbar()+"</div></div>";div.querySelector('img').src=url}
    }else{const a=document.createElement('a');a.href=url;a.download=f.dataset.fileName||'archivo-clinico';a.click();setTimeout(()=>URL.revokeObjectURL(url),10000)}
   }catch(err){notify(err.message)}return;
  }
  const deletion=e.target.closest('[data-file-delete]');
  if(deletion){
   if(!canDeleteFiles)return notify('Solo administración puede eliminar archivos.');
   const fileId=Number(deletion.dataset.fileDelete),entry=data?.files?.find(x=>Number(x.id)===fileId);
   if(!entry)return notify('El archivo ya no está disponible. Actualiza la página.');
   if(!confirm('¿Eliminar definitivamente "'+entry.filename+'" del expediente? El contenido se borrará de MySQL. Esta acción no se puede deshacer. Guarda una copia antes si necesitas conservarla.'))return;
   deletion.disabled=true;
   try{
    await API.request('/clinical/'+id+'/files/'+fileId,{method:'DELETE'});
    resetViewer();
    data=await API.request('/clinical/'+id);
    render();
    notify('Archivo eliminado del expediente.');
   }catch(err){notify(err.message);deletion.disabled=false}
   return;
  }
  const download=e.target.closest('[data-file-download]');
  if(download){
   try{
    const blob=await blobFile(Number(download.dataset.fileDownload)),url=URL.createObjectURL(blob);
    const link=document.createElement('a');link.href=url;link.download=download.dataset.fileName||'radiografia.dcm';link.click();
    setTimeout(()=>URL.revokeObjectURL(url),10000);
   }catch(err){notify(err.message)}
   return;
  }
  const action=e.target.closest('[data-image]');if(action){if(rxController.change(action.dataset.image))transform();return;}
 });
 document.addEventListener('change',e=>{if(e.target.id==='chart-phase'){phase=e.target.value;render()}if(e.target.id==='clinical-file-input'){const label=document.querySelector('[data-clinical-filename]');if(label)label.textContent=e.target.files?.[0]?.name||'Ningún archivo seleccionado'}});
 document.addEventListener('submit',async e=>{
  const form=e.target.closest('[data-form]');if(!form)return;e.preventDefault();
  const action=form.dataset.form,values=getForm(form),button=form.querySelector('button[type=submit]');button.disabled=true;
  try{
   if(action==='filiation'){
    const birth_date=values.birth_date||'';
    delete values.birth_date;
    await API.request('/clinical/'+id+'/birth-date',{method:'PUT',body:JSON.stringify({birth_date})});
    await API.request('/clinical/'+id+'/filiation',{method:'PUT',body:JSON.stringify(values)});
   }else if(action==='history'){
    await API.request('/clinical/'+id+'/history',{method:'PUT',body:JSON.stringify(values)});
   }else if(action==='odontogram'){
    const payload={phase:values.phase,tooth:Number(values.tooth),surface:values.surface,finding:values.finding,notes:values.notes||''};
    await API.request('/clinical/'+id+'/odontogram',{method:'POST',body:JSON.stringify(payload)});
   }else if(action==='periodontal'){
    const payload={tooth:Number(values.tooth),site:values.site,depth_mm:Number(values.depth_mm),recession_mm:Number(values.recession_mm),mobility:Number(values.mobility),bleeding:!!values.bleeding,plaque:!!values.plaque};
    await API.request('/clinical/'+id+'/periodontal',{method:'POST',body:JSON.stringify(payload)});
   }else if(action==='prescriptions'){
    await API.request('/clinical/'+id+'/prescriptions',{method:'POST',body:JSON.stringify(values)});
   }else if(action==='files'){
    const file=form.querySelector('input[type=file]').files[0],category=form.dataset.category;
    if(!file)throw new Error('Selecciona un archivo.');
    const dicom=category==='radiograph'&&/\.(dcm|dicom|ima)$/i.test(file.name);
    const mime=dicom?'application/dicom':file.type;
    if(file.size>(dicom?14:5)*1024*1024)throw new Error('Archivo demasiado grande (DICOM: 14 MB; otros: 5 MB).');
    if(!['application/pdf','application/dicom','image/jpeg','image/png','image/webp','image/tiff','image/bmp'].includes(mime))throw new Error('Tipo de archivo no permitido. Admite DCM/DICOM, JPG, PNG, TIFF, BMP, WEBP y PDF.');
    if(category==='document'&&mime!=='application/pdf')throw new Error('En Archivos solo se admiten PDF.');
    const qs=new URLSearchParams({category,name:file.name,description:values.description||''});
    const res=await fetch(window.YERENA_CONFIG.API_BASE_URL.replace(/\/$/,'')+'/clinical/'+id+'/files?'+qs,{method:'POST',headers:{Authorization:'Bearer '+API.token(),'Content-Type':mime},body:file,cache:'no-store'});
    const json=await res.json().catch(()=>({}));
    if(!res.ok)throw new Error(json.error||'No se pudo guardar el archivo.');
   }
   data=await API.request('/clinical/'+id);render();notify('Información guardada en el expediente.');
  }catch(err){notify(err.message);button.disabled=false}
 });
 window.addEventListener('pagehide',()=>{resetViewer();if(photoUrl)URL.revokeObjectURL(photoUrl)});
 load().catch(err=>{title.textContent='No se pudo abrir el expediente';subtitle.textContent=err.message;content.innerHTML="<div class='clinical-card'><p class='clinical-muted'>Comprueba tu sesión y permisos clínicos. <a href='app.html?view=pacientes'>Regresar al directorio</a>.</p></div>"});
})();
