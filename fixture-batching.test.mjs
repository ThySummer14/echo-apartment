import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from './vendor/three.module.js';
import {fixtureDetails} from './js/models.js';
import {batchFixtureHardware} from './js/fixture-batching.js';
import {Level} from './js/level.js';
import {Campaign} from './js/campaign.js';
import {syncCampaignWorld} from './js/campaign-world.js';
import {interactionWorldPosition} from './js/interaction.js';
const mat=()=>new THREE.MeshStandardMaterial({color:0x647b6a,roughness:.63,metalness:.2});
const fixture=()=>fixtureDetails({scene:new THREE.Scene(),batchStaticFixtures:false,detailMaterials:{iron:mat(),enamel:mat(),brass:mat()}},2,2.4,5,0x819c87);
function snapshot(group,bulb){
 group.updateMatrixWorld(true);const byMaterial=new Map();
 for(const mesh of group.children){if(mesh===bulb)continue;const key=mesh.material;let values=byMaterial.get(key);if(!values){values=[];byMaterial.set(key,values);}const g=mesh.geometry,nm=new THREE.Matrix3().getNormalMatrix(mesh.matrixWorld),ids=g.index?.array??Array.from({length:g.attributes.position.count},(_,i)=>i);
  for(const i of ids){const p=new THREE.Vector3().fromBufferAttribute(g.attributes.position,i).applyMatrix4(mesh.matrixWorld),n=new THREE.Vector3().fromBufferAttribute(g.attributes.normal,i).applyNormalMatrix(nm),uv=g.attributes.uv;values.push(p.x,p.y,p.z,n.x,n.y,n.z,uv.getX(i),uv.getY(i));}
 }return byMaterial;
}
test('fixture batching preserves every triangle position, normal, UV and material under wall transforms',()=>{
 for(const rotation of [[0,0,0],[Math.PI/2,0,0],[0,0,-Math.PI/2],[.2,.6,.3]]){
  const f=fixture();f.group.rotation.set(...rotation);f.group.scale.set(1.2,.9,1.1);const before=snapshot(f.group,f.diffuser);const bounds=new THREE.Box3().setFromObject(f.group,true);const result=batchFixtureHardware(f.group,f.diffuser);assert.deepEqual(result,{enabled:true,before:23,after:4});const after=snapshot(f.group,f.diffuser);assert.equal(before.size,after.size);
  for(const[material,values]of before){const got=after.get(material);assert.equal(values.length,got.length);for(let i=0;i<values.length;i++)assert.ok(Math.abs(values[i]-got[i])<2e-6,'triangle attribute changed');}
  const next=new THREE.Box3().setFromObject(f.group,true);assert.ok(bounds.min.distanceTo(next.min)<2e-6&&bounds.max.distanceTo(next.max)<2e-6);
  for(const mesh of f.group.children)if(mesh!==f.diffuser){const g=mesh.geometry;g.computeBoundingSphere();for(let i=0;i<g.attributes.position.count;i++)assert.ok(g.boundingSphere.containsPoint(new THREE.Vector3().fromBufferAttribute(g.attributes.position,i))||g.boundingSphere.center.distanceTo(new THREE.Vector3().fromBufferAttribute(g.attributes.position,i))<=g.boundingSphere.radius+1e-6);}
 }
});
test('diffuser identity, visibility and scripted material changes survive batching and fallback',()=>{
 const f=fixture(),bulb=f.diffuser,material=bulb.material;batchFixtureHardware(f.group,bulb,false);assert.equal(f.group.children.length,23);batchFixtureHardware(f.group,bulb,true);assert.equal(f.diffuser,bulb);assert.equal(bulb.material,material);assert.equal(bulb.parent,f.group);bulb.visible=false;material.color.setHex(0x123456);assert.equal(f.diffuser.visible,false);assert.equal(f.diffuser.material.color.getHex(),0x123456);const geometries=f.group.children.map(m=>m.geometry);batchFixtureHardware(f.group,bulb);assert.deepEqual(f.group.children.map(m=>m.geometry),geometries);
});
test('transparent hardware and custom render callbacks stay separate; shadow flags are preserved',()=>{
 const f=fixture(),enamel=f.group.children[2].material;enamel.transparent=true;const protectedMesh=f.group.children.at(-1);protectedMesh.onBeforeRender=()=>{};const shadowMesh=f.group.children.at(-2);shadowMesh.castShadow=true;shadowMesh.receiveShadow=true;
 batchFixtureHardware(f.group,f.diffuser);assert.ok(f.group.children.includes(protectedMesh));assert.ok(f.group.children.includes(shadowMesh));assert.equal(shadowMesh.castShadow,true);assert.equal(shadowMesh.receiveShadow,true);assert.equal(f.group.children.filter(m=>m.material===enamel).length,17);
});
test('merged per-fixture bounds cannot hide source vertices visible at doorway-like frustum edges',()=>{
 const f=fixture(),before=snapshot(f.group,f.diffuser);batchFixtureHardware(f.group,f.diffuser);f.group.updateMatrixWorld(true);
 for(const x of [-1,1.5,3,5])for(const yaw of [-.7,0,.7]){const camera=new THREE.PerspectiveCamera(75,16/9,.05,250);camera.position.set(x,1.55,2);camera.lookAt(2+yaw,2.4,5);camera.updateMatrixWorld(true);const frustum=new THREE.Frustum().setFromProjectionMatrix(new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix,camera.matrixWorldInverse));
  for(const[material,values]of before)for(let i=0;i<values.length;i+=8)if(frustum.containsPoint(new THREE.Vector3(values[i],values[i+1],values[i+2])))assert.ok(f.group.children.some(m=>m.material===material&&frustum.intersectsObject(m)));
 }
});
// Canvas fixtures exercise actual world construction without claiming WebGL QA.
function makeCtx(){const c={createImageData(w,h){return{width:w,height:h,data:new Uint8ClampedArray(w*h*4)};},getImageData(){return{width:1,height:1,data:new Uint8ClampedArray(4)};},createRadialGradient(){return{addColorStop(){}};},measureText(){return{width:10};}};return new Proxy(c,{get(t,k){return k in t?t[k]:()=>{};}});}
globalThis.document={createElement(tag){const e={tag,width:0,height:0,style:{}};e.getContext=()=>makeCtx();return e;}};globalThis.window=globalThis;
const plain=new Level(new THREE.Scene(),{},{batchStaticFixtures:false}),batched=new Level(new THREE.Scene(),{},{batchStaticFixtures:true});
const stats=level=>{let meshes=0,triangles=0;level.scene.traverse(o=>{if(o.isMesh){meshes++;triangles+=(o.geometry.index?.count??o.geometry.attributes.position.count)/3;}});return{meshes,triangles};};
const colliders=level=>level.colliders.map(c=>Object.fromEntries(Object.entries(c).filter(([,v])=>['number','string','boolean'].includes(typeof v))));
const interactions=level=>{level.scene.updateMatrixWorld(true);return level.interactables.map(i=>({label:i.label,dist:i.dist,position:interactionWorldPosition(i.mesh).toArray()}));};
test('actual world loses exactly1216 hardware meshes without changing triangles, collisions or interactions',()=>{
 const a=stats(plain),b=stats(batched);assert.equal(a.meshes-b.meshes,1216);assert.equal(a.triangles,b.triangles);assert.deepEqual(colliders(plain),colliders(batched));assert.deepEqual(interactions(plain),interactions(batched));assert.equal(plain.doors.length,batched.doors.length);assert.equal(plain.campaign.lamps.length,64);assert.equal(batched.campaign.lamps.length,64);console.log({unbatched:a,batched:b});
});
test('power, relay, reduced-effects updates and scare-relevant bulb references remain equivalent',()=>{
 const c=new Campaign();const bulbs=batched.campaign.lamps.map(l=>l.bulb);
 for(const power of [false,true,false,true]){c.flags.power=power;c.flags.generator=power;c.flags.relay=power;syncCampaignWorld(plain,c);syncCampaignWorld(batched,c);
  assert.deepEqual(plain.campaign.lamps.map(l=>[l.light.intensity,l.bulb.material.color.getHex()]),batched.campaign.lamps.map(l=>[l.light.intensity,l.bulb.material.color.getHex()]));
  assert.deepEqual(batched.campaign.lamps.map(l=>l.bulb),bulbs);assert.deepEqual(plain.doors.map(d=>[d.label,d.locked]),batched.doors.map(d=>[d.label,d.locked]));
  for(const l of [plain,batched])for(const f of l.fluorescents)f.kill=true;
  for(const l of [plain,batched]){l.update(.016,2,null,null,false);for(const f of l.fluorescents){assert.equal(f.light.intensity,0);if(f.tube)assert.equal(f.tube.material,l.tubeOffMat);}}
  for(const l of [plain,batched])for(const f of l.fluorescents)f.kill=false;
  for(const reduced of [false,true]){plain.update(.016,1,new THREE.Vector3(0,1.55,-6),new THREE.Vector3(0,0,1),reduced);batched.update(.016,1,new THREE.Vector3(0,1.55,-6),new THREE.Vector3(0,0,1),reduced);assert.deepEqual(plain.campaign.lamps.map(l=>l.bulb.material.color.getHex()),batched.campaign.lamps.map(l=>l.bulb.material.color.getHex()));}
 }
});
