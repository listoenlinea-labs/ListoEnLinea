'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const repo=path.resolve(__dirname,'../..');
const relative=filename=>fs.readFileSync(path.join(repo,filename),'utf8');
const image='assets/img/projects/Fraccionameinto-Demo.png'; // Exact filename uploaded to GitHub.
function walk(dir){
 return fs.readdirSync(dir,{withFileTypes:true}).flatMap(item=>{
  const full=path.join(dir,item.name);
  if(item.isDirectory())return item.name==='vendor'?[]:walk(full);
  return /\.(?:html|js)$/i.test(full)?[full]:[];
 });
}
test('La imagen exacta subida por el propietario es un PNG real',()=>{
 const logo=fs.readFileSync(path.join(repo,image));
 assert(logo.length>1024);
 assert.equal(logo.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
});
test('El portafolio y la barra lateral usan Fraccionamiento Demo y el mismo logotipo',()=>{
 const landing=relative('index.html');
 const sidebar=relative('demo/mision/assets/js/site-sidebar.js');
 const shell=relative('demo/mision/app.html');
 assert(landing.includes('src="'+image+'"'));
 assert(landing.includes('<h3>Fraccionamiento Demo</h3>'));
 assert(landing.includes('data-project-details="Fraccionamiento Demo"'));
 assert(sidebar.includes('../../'+image));
 assert(sidebar.includes('<strong>Fraccionamiento Demo</strong><span>Modo demostración</span>'));
 assert(shell.includes('<title>Fraccionamiento Demo</title>'));
 assert(shell.includes('../../'+image));
});
test('Las páginas y scripts visibles del demo no conservan el nombre del cliente real',()=>{
 const directory=path.join(repo,'demo/mision');
 const offenders=walk(directory).flatMap(file=>{
  const text=fs.readFileSync(file,'utf8');
  const matches=text.match(/misi[oó]n\s+jardines/gi)||[];
  return matches.length?[path.relative(repo,file)+': '+matches.join(', ')]:[];
 });
 assert.deepEqual(offenders,[],'No debe mostrarse el nombre de un cliente real en el demo');
});
test('Claves internas y aislamiento de la aplicación no cambian con la marca',()=>{
 const script=relative('demo/mision/demo-bootstrap.js');
 assert(script.includes('https://demo.invalid/api'));
 assert(script.includes('misionJardinesToken'));
 assert(script.includes('api-misionjardines'));
});
