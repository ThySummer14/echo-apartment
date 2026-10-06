import {test} from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from './vendor/three.module.js';
import {Level} from './js/level.js';
import {Monster} from './js/monster.js';
import {findGroundRoute} from './js/navigation.js';
const context=()=>new Proxy({createImageData:(w,h)=>({width:w,height:h,data:new Uint8ClampedArray(w*h*4)}),
 getImageData:()=>({width:1,height:1,data:new Uint8ClampedArray(4)}),createRadialGradient:()=>({addColorStop(){}}),measureText:()=>({width:10})},
 {get:(o,k)=>k in o?o[k]:()=>{}});
globalThis.document={createElement:()=>({width:0,height:0,style:{},getContext:()=>context()})};
globalThis.window=globalThis;
const scene=new THREE.Scene(),level=new Level(scene),monster=new Monster(scene,level.tex);
const dynamic=()=>[...level.colliders,...level.doors.map(d=>d.collider).filter(Boolean)];
const vector=p=>new THREE.Vector3(p[0],0,p[1]);
function traverse(start,end){
 monster.spawn(vector(start),'chase');let teleports=0,doorsOpened=0,maxFrame=0;
 monster._teleportNear=()=>{teleports++;};
 const ctx={player:vector(end),stairs:level.stairs,doors:level.doors,nodes:level.monsterNodes,
  audio:{doorOpen(){doorsOpened++;}},game:{level},canSeePlayer:false};
 let frames=0;
 for(;frames<2200;frames++){
  if(monster.pos.distanceTo(ctx.player)<.16)break;
  level.updateDoors(.016,null,[monster.pos]);ctx.colliders=dynamic();monster.lastPos.copy(monster.pos);
  const before=performance.now();monster._moveToward(ctx,.016,3.3);maxFrame=Math.max(maxFrame,performance.now()-before);
  assert.ok(Math.hypot(monster.pos.x-monster.lastPos.x,monster.pos.z-monster.lastPos.z)<.06,'movement jumped '+JSON.stringify({from:monster.lastPos,to:monster.pos,waiting:monster.waitingDoor?.label}));
  assert.ok(Math.abs(monster.pos.y)<.01,'left supported floor '+JSON.stringify(monster.pos));
 }
 assert.equal(teleports,0);assert.ok(frames<2200,'stuck '+JSON.stringify(monster.pos)+' goal '+end);
 console.log('  route',start,'→',end,'frames',frames,'plans',monster.groundNavigator.plans,'doors',doorsOpened,'last expanded',monster.groundNavigator.lastStats?.expanded,'max CPU ms',maxFrame.toFixed(1));
 return{doorsOpened,frames};
}
test('actual hunter walks around the courtyard memorial without relocation',()=>traverse([-6,-28],[6,-28]));
test('actual hunter opens a shop door and enters its furnished interior',()=>{
 const result=traverse([-6,-27],[-18,-27]);assert.ok(result.doorsOpened>0);
});
test('actual hunter traverses the shop-to-clinic side loop and clinic screen',()=>{
 traverse([-18,-34.5],[18,-34.5]);traverse([6,-28],[19,-28]);
});
test('locking every shop entrance produces no route instead of a wall shortcut',()=>{
 for(const d of level.doors.filter(d=>d.label.startsWith('杂货店'))){d.locked=true;d.open=false;d.target=0;}
 for(let i=0;i<200;i++)level.updateDoors(.016);
 assert.equal(findGroundRoute(vector([-6,-27]),vector([-18,-27]),dynamic(),level.doors),null);
});

test('planner follows perception memory, not a quiet player who switches into a sealed room',()=>{
 const hiddenPlayer=new THREE.Vector3(6,0,-28),audio=new Proxy({},{get:()=>()=>{}});
 monster.spawn(new THREE.Vector3(-6,0,-28),'chase');
 const ctx={player:hiddenPlayer,lookDir:new THREE.Vector3(0,0,1),flashHit:false,time:1,noiseRadius:0,
  stairs:level.stairs,doors:level.doors,nodes:level.monsterNodes,colliders:dynamic(),audio,game:{level}};
 monster.update(.016,ctx);assert.equal(monster.pursuit.target.x,6);
 hiddenPlayer.set(-18,0,-27);
 for(let i=0;i<90;i++){ctx.colliders=dynamic();monster.update(.016,ctx);}
 assert.equal(monster.pursuit.target.x,6);assert.equal(monster.groundNavigator.goal.x,6);
 hiddenPlayer.set(6,0,-35);
 for(let i=0;i<65;i++){ctx.colliders=dynamic();monster.update(.016,ctx);}
 assert.equal(monster.pursuit.target.z,-35);assert.equal(monster.groundNavigator.goal.z,-35);
});
test('door closing on a hunter reopens without displacing it',()=>{
 const door=level.doors.find(d=>d.label==='杂货店前门');door.locked=false;level.forceOpen(door);
 for(let i=0;i<200;i++)level.updateDoors(.016);
 const occupant=new THREE.Vector3(door.hinge.x,door.hinge.y,door.hinge.z+door.width*.55);
 door.open=false;door.target=0;
 let blocked=false;
 for(let i=0;i<200;i++){level.updateDoors(.016,null,[occupant]);blocked ||= door.obstructed;}
 assert.equal(blocked,true);assert.equal(door.open,true);
 const c=door.collider;
 assert.ok(!(c.x0<occupant.x+.28&&c.x1>occupant.x-.28&&c.z0<occupant.z+.28&&c.z1>occupant.z-.28));
});

test('legacy kitchen and bedroom sliding doorway remain navigable',()=>{
 traverse([0,3.8],[-3.9,4.5]);
 traverse([0,11.2],[-2.8,13.8]);
 traverse([-2.8,13.8],[-12.5,12.5]);
});

test('standing on the low futon does not send a visible hunter toward a distant staircase',()=>{
 monster.spawn(new THREE.Vector3(-12.5,0,12.5),'chase');let attacked=false;
 const audio=new Proxy({},{get:()=>()=>{}});
 const ctx={player:new THREE.Vector3(-10.7,.24,12.3),lookDir:new THREE.Vector3(-1,0,0),flashHit:false,time:1,noiseRadius:0,
  stairs:level.stairs,doors:level.doors,nodes:level.monsterNodes,colliders:dynamic(),audio,game:{level,onMonsterAttack(){attacked=true;}}};
 for(let i=0;i<300&&!attacked;i++){ctx.colliders=dynamic();monster.update(.016,ctx);}
 assert.equal(attacked,true,'hunter walked away from a visible player on a low bed: '+JSON.stringify(monster.pos));
});
