import {test} from 'node:test';
import assert from 'node:assert/strict';
import {TraversalGuard} from './js/traversal.js';
import {interactionWorldPosition, interactionBlocked} from './js/interaction.js';
import {ANNEX_AREAS} from './js/basement-annex.js';
// 构建真实关卡，检查可达地板、封边和移动碰撞；Canvas stub 不验证画面。
import * as THREE from './vendor/three.module.js';
import { Level } from './js/level.js';
import { moveWithCollisions } from './js/util.js';

// ---------- minimal DOM stub ----------
function makeCtx() {
  const ctx = {
    canvas: null,
    createImageData(a, b) {
      if (typeof a === 'number') return { width: a, height: b, data: new Uint8ClampedArray(a * b * 4) };
      return { width: a.width, height: a.height, data: new Uint8ClampedArray(a.data.length) };
    },
    getImageData() {
      return { width: 1, height: 1, data: new Uint8ClampedArray(4) };
    },
    putImageData() {},
    createRadialGradient() { return { addColorStop() {} }; },
    measureText() { return { width: 10 }; },
  };
  const noop = new Proxy(ctx, {
    get(t, k) {
      if (k in t) return t[k];
      if (typeof k === 'string') return () => {};
      return undefined;
    },
    set(t, k, v) { t[k] = v; return true; },
  });
  return noop;
}

globalThis.document = {
  createElement(tag) {
    const el = { tag, width: 0, height: 0, style: {} };
    el.getContext = (type) => (type === '2d' ? makeCtx() : null);
    return el;
  },
};
globalThis.window = globalThis;
globalThis.performance = globalThis.performance || { now: () => Date.now() };


import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {ROOM104,safeRoom104Checkpoint} from './js/room104-layout.js';
import {Campaign} from './js/campaign.js';
import {Monster} from './js/monster.js';
import {isSafeSpawn} from './js/pursuit.js';
const level=new Level(new THREE.Scene());
const outside=c=>!(c.x0>=6.8&&c.x1<=18.7&&c.z0>=45.8&&c.z1<=56.2&&c.y0>=-.2&&c.y1<=3);
const clean=c=>Object.fromEntries(Object.entries(c).filter(([k,v])=>['number','boolean','string'].includes(typeof v)));
const dynamic=()=>[...level.colliders,...level.doors.map(d=>d.collider).filter(Boolean)];
const body=(x,z)=>({x0:x-.3,x1:x+.3,y0:0,y1:1.75,z0:z-.3,z1:z+.3});
const pos=c=>new THREE.Vector3((c.x0+c.x1)/2,c.y0,(c.z0+c.z1)/2);
function walk(c,points){for(const[x,z]of points){let reached=false;for(let i=0;i<450;i++){
 const p=pos(c),d=Math.hypot(x-p.x,z-p.z);if(d<.035){reached=true;break;}
 const step=Math.min(.04,d);moveWithCollisions(c,(x-p.x)/d*step,-.025,(z-p.z)/d*step,dynamic(),.35);assert.ok(Math.abs(c.y0)<.001);
 }assert.ok(reached,'blocked '+JSON.stringify(pos(c))+' target '+[x,z]);}return c;}
const baselineHash='667dccda09ccc7f8333cb9717919a1c64e0ba82c2c1764f2e0f0864f5217b3b8';
test('42 square metre shell preserves shared corridor, neighbors and original door coordinates',()=>{
 const r={colliders:level.colliders.filter(outside).map(clean),doors:level.doors.map(d=>({label:d.label,hinge:d.hinge,width:d.width})),nodes:level.monsterNodes.filter(n=>!(n.x>=7&&n.x<=18.5&&n.z>=46&&n.z<=56&&n.y===0))};
 assert.equal(createHash('sha256').update(JSON.stringify(r)).digest('hex'),baselineHash);
 for(const n of level.monsterNodes.filter(n=>n.x>=7&&n.x<=14&&n.z>=46&&n.z<=52&&n.y===0))assert.equal(isSafeSpawn(n,level.colliders),true);
 assert.deepEqual(ROOM104.bounds,[7,46,14,52]);assert.equal((14-7)*(52-46),42);
});
test('continuous entry-diary-wardrobe-exit path and real callbacks remain usable',()=>{
 const door=level.doors.find(d=>d.label==='104 空屋');level.forceOpen(door);for(let i=0;i<200;i++)level.updateDoors(.016);
 const c=walk(body(10.75,44.8),[[10.75,48.15],[9.3,48.15],[9.3,50.7],[8.85,50.65]]);
 level.scene.updateMatrixWorld(true);
 const diary=level.notePickups.find(n=>n.id===12).mesh,it=level.interactables.find(i=>i.mesh===diary);
 const eye=pos(c).add(new THREE.Vector3(0,1.55,0)),target=interactionWorldPosition(diary);
 assert.ok(eye.distanceTo(target)<it.dist);assert.equal(interactionBlocked(eye,target,level.colliders,level.doors),false);
 let read=0;level.handlers.onDocument=id=>{assert.equal(id,12);read++;};it.action();assert.equal(read,1);
 walk(c,[[9.3,50.7],[9.3,49.65],[10.95,49.65],[10.95,50.3]]);
 const hide=level.interactables.find(i=>i.label==='躲进衣柜'&&Math.abs(i.mesh.position.x-10.95)<.01&&Math.abs(i.mesh.position.z-51.45)<.01);
 assert.ok(hide);const hp=pos(c).add(new THREE.Vector3(0,1.55,0)),ht=interactionWorldPosition(hide.mesh);
 assert.ok(hp.distanceTo(ht)<hide.dist);assert.equal(interactionBlocked(hp,ht,level.colliders,level.doors,hide.mesh.userData.collider),false);
 const source=readFileSync(new URL('./js/game.js',import.meta.url),'utf8');
 const method=source.slice(source.indexOf('  _toggleHide(mesh) {'),source.indexOf('  setSensitivity(v)')).trim().replace('_toggleHide(mesh)','function(mesh)');
 const hideFn=new Function('THREE','interactionBlocked','$','return '+method)(THREE,interactionBlocked,()=>({classList:{add(){},remove(){}}}));
 const game={hiding:false,monster:{pos:new THREE.Vector3(10.75,0,47.1),state:'chase'},playerPos:pos(c),camera:{position:hp},level,battery:80,_sub(){},_clearMovementInput(){},audio:{doorClose(){}}};
 level.handlers.onHide=m=>hideFn.call(game,m);hide.action();assert.equal(game.hiding,true,'entry pursuer should be occluded by partition');hideFn.call(game);assert.equal(game.hiding,false);
 game.monster.pos.set(10.95,0,49.65);hide.action();assert.equal(game.hiding,false,'visible pursuer must prevent hiding');
 walk(c,[[10.95,49.65],[9.3,49.65],[9.3,48.15],[10.75,48.15],[10.75,44.8]]);
});
test('legacy points in removed floor, new wall and furniture migrate without resetting progress',()=>{
 for(const p of [{x:17,y:0,z:55},{x:12,y:0,z:48.8},{x:12.75,y:0,z:49.85}]){
 const campaign=new Campaign();campaign.documents.add('12');campaign.flags.invitation=true;campaign.items.add('serviceKey');campaign.elapsed=123;const saved=campaign.snapshot();saved.checkpoint=p;
 const restored=new Campaign(saved),before=restored.snapshot();const safe=safeRoom104Checkpoint(restored.checkpoint,level.colliders);assert.deepEqual(safe,ROOM104.safeEntry);
 restored.checkpoint={...safe};const after=restored.snapshot();assert.deepEqual({...after,checkpoint:before.checkpoint},before);assert.deepEqual(new Campaign(after).checkpoint,safe);
 const c=walk(body(safe.x,safe.z),[[10.75,44.8]]);assert.ok(pos(c).z<45);
 }
 for(const p of [{x:9.3,y:0,z:49},{x:10.75,y:0,z:46.2},{x:10.75,y:0,z:45.95},{x:10.75,y:0,z:46.39},{x:10.75,y:0,z:44.8},{x:-2.8,y:2.8,z:21.2}])assert.equal(safeRoom104Checkpoint(p,level.colliders),p);
});
test('hunter walks through compact suite door and partition without relocation',()=>{
 const m=new Monster(level.scene,level.tex);m.spawn(new THREE.Vector3(10.75,0,44.8),'chase');let jumps=0;m._teleportNear=()=>jumps++;
 const ctx={player:new THREE.Vector3(10.95,0,50.3),stairs:level.stairs,doors:level.doors,nodes:level.monsterNodes,audio:{doorOpen(){}},game:{level},canSeePlayer:false};
 let frames=0;for(;frames<1500;frames++){if(m.pos.distanceTo(ctx.player)<.16)break;level.updateDoors(.016,null,[m.pos]);ctx.colliders=dynamic();m.lastPos.copy(m.pos);m._moveToward(ctx,.016,3.3);assert.ok(m.pos.distanceTo(m.lastPos)<.06);}
 assert.ok(frames<1500,'hunter stuck '+JSON.stringify(m.pos));assert.equal(jumps,0);
});

test('actual checkpoint wake persists migration, preserves progress and stays idempotent',()=>{
 const source=readFileSync(new URL('./js/game.js',import.meta.url),'utf8');
 const method=source.slice(source.indexOf('  _wakeAtCheckpoint(p ='),source.indexOf('  _spawnHunt()')).trim().replace('_wakeAtCheckpoint(p = this.campaign.checkpoint)','function(p = this.campaign.checkpoint)');
 let persisted=null,writes=0;const store={setItem(k,v){persisted=JSON.parse(v);writes++;}};
 const wake=new Function('safeRoom104Checkpoint','localStorage','SAVE_KEY','aabbFromSphere','PLAYER_R','PLAYER_H','EYE','$','return '+method)(safeRoom104Checkpoint,store,'test-save',(x,y,z)=>body(x,z),.3,1.75,1.55,()=>({classList:{add(){}}}));
 const campaign=new Campaign();campaign.flags.invitation=true;campaign.items.add('serviceKey');campaign.documents.add('12');campaign.elapsed=123;campaign.checkpoint={x:12,y:0,z:48.8};const before=campaign.snapshot();
 const game={campaign,level,playerPos:new THREE.Vector3(),camera:new THREE.PerspectiveCamera(),traversal:{reset(){}},monster:{despawn(){}},ghost:{hide(){}},audio:{heartbeat(){}},battery:61,storyEvents:[],_clearMovementInput(){},_setFear(){}};
 wake.call(game);assert.deepEqual(game.playerPos.toArray(),[10.75,0,47.15]);assert.equal(writes,1);
 assert.deepEqual({...persisted,checkpoint:before.checkpoint},before);wake.call(game);assert.equal(writes,1);
 game.campaign.checkpoint={x:10.75,y:0,z:46.2};wake.call(game);assert.equal(writes,1,'valid threshold must not rewrite save');assert.deepEqual(game.playerPos.toArray(),[10.75,0,46.2]);
});

test('standing and crouched boundary rays meet opaque inward-facing walls and ceiling',()=>{
 level.scene.updateMatrixWorld(true);const walls=[];level.scene.traverse(o=>{const c=o.userData.collider;if(o.isMesh&&c&&c.y1>2.6&&c.y0<3&&c.x1>=7&&c.x0<=14&&c.z1>=46&&c.z0<=52)walls.push(o);});
 for(const [x,z]of[[8,49],[12.9,51.5],[12.9,47.5]])for(const y of [.95,1.55])for(const dir of [[-1,0,0],[1,0,0],[0,0,1],[0,1,0]]){
  const hit=new THREE.Raycaster(new THREE.Vector3(x,y,z),new THREE.Vector3(...dir),0,12).intersectObjects(walls)[0];assert.ok(hit,'missing shell ray '+[x,y,z,dir]);assert.equal(hit.object.visible,true);assert.equal(hit.object.material.transparent,false);assert.equal(hit.object.material.opacity,1);
 }
});
