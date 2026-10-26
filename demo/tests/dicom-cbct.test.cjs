'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const JSZip=require('../yerena/assets/js/vendor/jszip.min.js');
const dicom=require('../yerena/assets/js/dicom-viewer.js');
const volume=require('../yerena/assets/js/dicom-volume.js');
const cbct=require('../yerena/assets/js/cbct-archive.js');
function element(group,tag,vr,value){
 const payload=Buffer.isBuffer(value)?value:Buffer.from(String(value),'ascii');
 const long=['OB','OW','SQ','UN'].includes(vr);
 const h=Buffer.alloc(long?12:8);
 h.writeUInt16LE(group,0);h.writeUInt16LE(tag,2);h.write(vr,4,2,'ascii');
 if(long)h.writeUInt32LE(payload.length,8);else h.writeUInt16LE(payload.length,6);
 return Buffer.concat([h,payload]);
}
const short=n=>{const x=Buffer.alloc(2);x.writeUInt16LE(n);return x};
function makeSlice(z,{series='1.2.3.999',frame='1.2.3.998'}={}){
 const pre=Buffer.alloc(132);pre.write('DICM',128);
 return Buffer.concat([
  pre,element(2,16,'UI','1.2.840.10008.1.2.1 '),
  element(0x20,0x000e,'UI',series+' '),
  element(0x20,0x0052,'UI',frame+' '),
  element(0x20,0x0032,'DS','0\\0\\'+(z*.3).toFixed(2)),
  element(0x20,0x0037,'DS','1\\0\\0\\0\\1\\0'),
  element(0x28,0x0030,'DS','0.3\\0.3'),
  element(0x28,2,'US',short(1)),
  element(0x28,4,'CS','MONOCHROME2 '),
  element(0x28,16,'US',short(8)),
  element(0x28,17,'US',short(8)),
  element(0x28,256,'US',short(8)),
  element(0x28,257,'US',short(8)),
  element(0x28,258,'US',short(7)),
  element(0x28,259,'US',short(0)),
  element(0x7fe0,16,'OB',Buffer.alloc(64,z*17))
 ]);
}
const file=(name,bytes)=>({name,size:bytes.byteLength,arrayBuffer:async()=>bytes.buffer.slice(bytes.byteOffset,bytes.byteOffset+bytes.byteLength)});
async function archiveZip(count=12,{broken=false,series='1.2.3.999'}={}){
 const zip=new JSZip();
 for(let i=0;i<count;i++)zip.file('DICOM/CBCT_DEMO_'+String(i+1).padStart(4,'0')+'.dcm',broken&&i===count-1?Buffer.alloc(512):makeSlice(i,{series}));
 zip.file('README.txt','Datos sintéticos de prueba · ningún paciente real');
 const bytes=await zip.generateAsync({type:'nodebuffer',compression:'DEFLATE'});
 return file('CBCT_SINTETICO.zip',bytes);
}
test('El visor real decodifica un DICOM sintético con píxeles y metadatos espaciales',()=>{
 const scan=makeSlice(4);
 const data=dicom.parse(scan.buffer.slice(scan.byteOffset,scan.byteOffset+scan.byteLength));
 assert.equal(data.rows,8);assert.equal(data.cols,8);
 assert.equal(data.metadata.seriesUID,'1.2.3.999');
 assert.equal(data.metadata.position[2],1.2);
 assert.equal(data.pixels(0).values.length,64);
});
test('Un ZIP CBCT válido abre 12 cortes y reconstruye volumen 3D MPR',async()=>{
 const zip=await archiveZip(12);
 const scan=await cbct.fromFiles([zip],{zipLib:JSZip});
 assert.equal(scan.kind,'zip');
 assert.equal(scan.records.length,12);
 const model=await volume.fromFiles(scan.records);
 assert.equal(model.nz,12);
 assert.equal(model.seriesUID,'1.2.3.999');
 for(const axis of ['axial','sagittal','coronal']){
  const picture=volume.sliceImage(model,axis,.5);
  assert.equal(picture.values.length,picture.width*picture.height*4);
 }
 assert.notEqual(volume.sample(model,.5,.5,0),volume.sample(model,.5,.5,1));
});
test('ZIP con menos de doce cortes o DICOM falsificado se rechaza',async()=>{
 await assert.rejects(async()=>cbct.fromFiles([await archiveZip(4)],{zipLib:JSZip}),/entre 12 y 400/);
 await assert.rejects(async()=>cbct.fromFiles([await archiveZip(12,{broken:true})],{zipLib:JSZip}),/no es un DICOM/);
});
test('Serie con pacientes/series diferentes no puede producir volumetría engañosa',async()=>{
 const records=Array.from({length:12},(_,i)=>{const b=makeSlice(i,{series:i===7?'OTRA.SERIE':'1.2.3.999'});return {name:'corte_'+i+'.dcm',buffer:b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength)}});
 await assert.rejects(()=>volume.fromFiles(records),/misma serie/);
});
