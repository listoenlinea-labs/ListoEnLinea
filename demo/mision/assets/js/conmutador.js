(() => {
  'use strict';
  // Demo del conmutador local: ni WhatsApp, ni protocolo tel:, ni llamadas reales.
  // La caseta de producción utiliza telefonía local. Aquí únicamente se simula.
  const byId=id=>document.getElementById(id);
      const range = amount => Array.from({ length: amount }, (_, index) => ({ number: String(index + 1) }));
      const fromList = value => value.split(',').map(number => ({ number: number.trim() })).filter(item => item.number);
      const sections = [
        { key: 'Gardenias', houses: range(32) },
        { key: 'Magnolias', houses: range(32) },
        { key: 'Lirios', houses: range(39) },
        { key: 'Rosas', houses: range(42) },
        { key: 'Jardines 1', houses: fromList('116,120,124,125,128,129,132,133,136,137,141,142,144,145,148,149,152,153,156,157,160,161,164,165,168,169,173,177,181,185') },
        { key: 'Jardines 2', houses: fromList('201,205,209,213,217,221,233,237,241,245,249,253,257,269,273,277,281,285,289') },
        { key: 'Jardines 3', houses: fromList('307,311,315,319,323,327,328,331,332,335,336,339,340,343,344,347,348,351,352,355,356,359,360,363,364,367,368,371,372,375,376,379,380,384,388') },
        {
          key: 'Exterior',
          houses: [
            { number: '3614', label: 'Valle de México', lookup: 'Valle de México' },
            { number: '752', label: 'Atotonilco', lookup: 'Atotonilco' },
            { number: '707', label: 'Guadalajara', lookup: 'Guadalajara' }
          ]
        }
      ];


  sections.sort((a,b)=>a.key.localeCompare(b.key,'es-MX',{numeric:true,sensitivity:'base'}));
  sections.forEach(s=>s.houses.sort((a,b)=>String(a.number).localeCompare(String(b.number),'es-MX',{numeric:true})));
  let active=sections.find(s=>s.key==='Gardenias')||sections[0];
  function status(message,kind='ok'){
    const element=byId('callStatus');element.className='statusbar '+kind;element.textContent=message;
  }
  function isCommerce(key,number){
    return (key==='Gardenias'&&number==='28')||(key==='Lirios'&&number==='32');
  }
  function renderTabs(){
    const tabs=byId('streetTabs');tabs.replaceChildren();
    sections.forEach(section=>{
      const btn=document.createElement('button');
      btn.type='button';btn.className='street-tab'+(section===active?' active':'');
      btn.textContent=section.key;btn.setAttribute('role','tab');
      btn.setAttribute('aria-selected',String(section===active));
      btn.addEventListener('click',()=>{
        active=section;renderTabs();renderHouses();
        status('Conmutador ficticio de línea local listo. Selecciona una vivienda para simular una llamada.');
      });
      tabs.append(btn);
    });
  }
  function renderHouses(){
    byId('streetTitle').textContent=active.key;
    byId('houseCount').textContent=active.houses.length+(active.houses.length===1?' domicilio':' domicilios');
    const grid=byId('houseGrid');grid.replaceChildren();
    active.houses.forEach(house=>{
      const button=document.createElement('button');button.type='button';
      const business=isCommerce(active.key,house.number);
      button.className='house-btn'+(business?' commerce':'')+(active.key==='Exterior'?' exterior':'');
      button.dataset.houseNumber=house.number;
      if(active.key==='Exterior'){
        const label=document.createElement('small');label.textContent=house.label;button.append(label);
      }
      const number=document.createElement('span');number.textContent=house.number;button.append(number);
      if(business){
        const label=document.createElement('span');label.className='commerce-badge';label.textContent='Comercio';button.append(label);
      }
      const address=(house.lookup||active.key)+' '+house.number;
      button.setAttribute('aria-label','Simular llamada local a '+address);
      button.addEventListener('click',()=>{
        grid.querySelectorAll('.house-btn').forEach(b=>b.classList.remove('is-calling'));
        button.classList.add('is-calling');
        status('Llamada de línea local SIMULADA a '+address+'. No se marcó ningún teléfono ni se abrió WhatsApp.');
        try{sessionStorage.setItem('mjDemoUltimaLlamadaLocal',address)}catch(_){}
      });
      grid.append(button);
    });
  }
  renderTabs();renderHouses();
  status('Conmutador de caseta listo · Línea telefónica local (DEMO). Selecciona una casa para simular una llamada.');
})();
