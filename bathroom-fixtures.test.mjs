import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from './vendor/three.module.js';
import {buildBathroomFixtures} from './js/bathroom-fixtures.js';
import {aabbFromSphere,moveWithCollisions} from './js/util.js';
const material=new THREE.MeshStandardMaterial();
const scene=new THREE.Scene(),level={scene,props:{},colliders:[],detailMaterials:{concrete:material,iron:material,brass:material,paint:material,darkGlass:material}};
const f=buildBathroomFixtures(level);scene.updateMatrixWorld(true);
const box=m=>new THREE.Box3().setFromObject(m);
const downAt=(object,x,z)=>new THREE.Raycaster(new THREE.Vector3(x,3,z),new THREE.Vector3(0,-1,0)).intersectObject(object,true);

test('fixture bodies use reference-scale footprints and stay clear of room walls',()=>{
 for(const [key,part,w,d] of [['tub','hollow-shell',1.4,.7],['toilet','open-pan',.38,.55],['basin','hollow-bowl',.55,.46]]){
  const b=box(f[key].parts[part]),size=b.getSize(new THREE.Vector3());
  assert.ok(Math.abs(size.x-w)<.001);assert.ok(Math.abs(size.z-d)<.001);
  assert.ok(b.min.x> -17.5&&b.max.x< -13.9);assert.ok(b.min.z>14.9&&b.max.z<20.9);
 }
 const toilet=box(f.toilet.group);assert.ok(toilet.max.y<.73&&toilet.max.y>.71);
});
test('tub has a 300mm deep actual cavity and water below its rim',()=>{
 const tub=f.tub,shell=tub.parts['hollow-shell'];
 const hits=downAt(shell,-15.8,20.35);assert.ok(hits.length);
 assert.ok(hits[0].point.y<.27,'solid top face closes the tub');
 assert.ok(Math.abs(tub.profile[2].y-tub.profile[5].y-.3)<.001);
 assert.ok(box(tub.parts.water).max.y<.32);
 assert.ok(Math.abs(box(tub.parts.plinth).max.y-box(shell).min.y)<.001);
});
test('toilet seat and bowl remain open, with separately supported cistern and fittings',()=>{
 const x=-14.55,z=16.455-.08;
 assert.equal(downAt(f.toilet.parts['seat-ring'],x,z).length,0);
 assert.equal(downAt(f.toilet.parts['open-pan'],x,z).length,0);
 assert.ok(downAt(f.toilet.parts.water,x,z).length>0);
 assert.ok(box(f.toilet.parts.cistern).min.y>=.38);
 assert.ok(box(f.toilet.parts['cistern-lid']).max.y<=.7181);
});
test('basin drain opens above its pedestal and tap is connected to the rear ledge',()=>{
 const basin=f.basin,x=-16.55,z=15.18+.035;
 assert.equal(downAt(basin.parts['hollow-bowl'],x,z).length,0);
 assert.ok(box(basin.parts.pedestal).max.y<.645);
 assert.ok(box(basin.parts['drain-throat']).min.y>box(basin.parts.pedestal).max.y);
 assert.ok(box(basin.parts['tap-stem']).min.y<=box(basin.parts['tap-escutcheon']).max.y+.003);
 assert.ok(box(basin.parts['tap-spout']).max.y>=box(basin.parts['tap-stem']).max.y-.02);
});
test('shell normals face outwards and rims face up; geometry remains finite and bounded',()=>{
 let triangles=0,meshes=0;
 scene.traverse(o=>{if(!o.isMesh)return;meshes++;const g=o.geometry;triangles+=(g.index?.count??g.attributes.position.count)/3;
  for(const name of ['position','normal','uv'])if(g.attributes[name])for(const v of g.attributes[name].array)assert.ok(Number.isFinite(v));
 });
 const g=f.tub.parts['hollow-shell'].geometry,n=g.attributes.normal;
 assert.ok(n.getX(0)>.5);assert.ok(n.getY(2*65)>.1);
 assert.ok(meshes<60);assert.ok(triangles<12000);console.log('  bathroom meshes:',meshes,'triangles:',triangles);
});
test('fixture collisions block entry while the front service aisle stays walkable',()=>{
 const floor={x0:-17.6,x1:-13.8,z0:14.8,z1:21,y0:-.12,y1:0};
 const body=aabbFromSphere(-15.8,0,19.2,.3,1.75),cs=[floor,...level.colliders];
 for(let i=0;i<80;i++)moveWithCollisions(body,0,-.05,.04,cs,.35);
 assert.ok(body.z1<=f.tub.collider.z0+.002);assert.ok(Math.abs(body.y0)<.001);
 const aisle=aabbFromSphere(-16.8,0,19.3,.3,1.75);
 for(let i=0;i<50;i++)moveWithCollisions(aisle,.04,-.05,0,cs,.35);
 assert.ok((aisle.x0+aisle.x1)/2> -14.9);
});


test('shower supply and mirror supports reach their physical connections',()=>{
 const shower=f.shower.parts;
 assert.ok(box(shower['mixer-feed']).intersectsBox(box(shower['riser-feed'])));
 assert.ok(box(shower['riser-feed']).intersectsBox(box(shower.riser)));
 assert.ok(box(shower['mixer-feed']).intersectsBox(box(f.tub.parts['mixer-stem'])));
 for(const [name,part] of Object.entries(f.mirror.parts))if(name.startsWith('wall-standoff')){
  assert.ok(box(part).min.z<=14.9);assert.ok(box(part).max.z>=box(f.mirror.parts.backing).min.z);
 }
});


test('tub water reaches the real inner-wall cross-section instead of floating as an ellipse',()=>{
 const size=box(f.tub.parts.water).getSize(new THREE.Vector3());
 assert.ok(Math.abs(size.x-1.07)<.001);assert.ok(Math.abs(size.z-.4175)<.001);
 const positions=f.tub.parts.water.geometry.attributes.position;
 for(let i=0;i<positions.count;i++)assert.ok(Math.abs(positions.getY(i)-.31)<1e-6);
 assert.ok(downAt(f.tub.parts.water,-15.32,20.5).length>0,'rounded rectangular corners should contain water');
});
