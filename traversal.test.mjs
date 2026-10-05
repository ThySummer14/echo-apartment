import {test} from 'node:test';
import assert from 'node:assert/strict';
import {TraversalGuard} from './js/traversal.js';
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


const level = new Level(new THREE.Scene(), {});
// 打开可解锁的内部门；剧情明确永久锈死的外门仍是建筑边界。
for(const door of level.doors){if(door.label==='公寓外门')continue;door.locked=false;level.forceOpen(door);}
for(let i=0;i<200;i++)level.updateDoors(.016);
const colliders=[...level.colliders,...level.doors.map(d=>d.collider).filter(Boolean)];
const body=(x,y,z)=>({x0:x-.3,x1:x+.3,y0:y,y1:y+1.75,z0:z-.3,z1:z+.3});
const point=c=>({x:(c.x0+c.x1)/2,y:c.y0,z:(c.z0+c.z1)/2});
const onStair=(p)=>level.stairs.some(s=>{
 const dx=p.x-s.x,dz=p.z-s.z,co=Math.cos(s.rotation),si=Math.sin(s.rotation);
 const u=dx*co-dz*si,v=dx*si+dz*co;
 return Math.abs(u)<s.width+s.gap/2+.3&&v>=-s.frontDepth-.3&&v<=s.run+s.landingDepth+.3;
});

test('大位移经过薄墙仍被阻挡，四个方向与斜向一致',()=>{
 for(const [dx,dz] of [[2,0],[-2,0],[0,2],[0,-2],[2,2],[-2,-2]]) {
  const c=body(0,0,0),walls=[];
  if(dx)walls.push({x0:dx>0?.6:-.66,x1:dx>0?.66:-.6,z0:-5,z1:5,y0:0,y1:3});
  if(dz)walls.push({z0:dz>0?.6:-.66,z1:dz>0?.66:-.6,x0:-5,x1:5,y0:0,y1:3});
  moveWithCollisions(c,dx,-.1,dz,walls,.35);
  if(dx)assert.ok(Math.abs(point(c).x)<.31);
  if(dz)assert.ok(Math.abs(point(c).z)<.31);
 }
});

test('客厅、右侧儿童房和屋顶入口边角有实际封边',()=>{
 for(const [x,y,z,dz] of [[-4,0,15,.13],[5,0,15,.13],[3,5.6,62.8,.1],[-3,5.6,62.8,.1]]) {
  const c=body(x,y,z);
  for(let i=0;i<100;i++){moveWithCollisions(c,0,-.12,dz,colliders,.35);assert.ok(c.y0>=y-.02,JSON.stringify(point(c)));}
 }
});

test('异常掉落退回有地板且无嵌墙的落脚点，正常下楼不会触发',()=>{
 const guard=new TraversalGuard(),floor={x0:-5,x1:5,z0:-5,z1:5,y0:-.12,y1:0};
 guard.reset({x:0,y:0,z:0});
 assert.equal(guard.update(body(1,0,1),true,[floor],.016),null);
 let recovered;
 for(let i=0;i<20;i++)recovered=guard.update(body(8,-2,8),false,[floor],.05)||recovered;
 assert.deepEqual(recovered,{x:1,y:0,z:1});
 for(let i=0;i<16;i++){
  const y=-i*.175,c={...floor,y0:y-.12,y1:y};
  assert.equal(guard.update(body(1,y,1),true,[c],.1),null);
 }
});

test('自由探索所有可达地板边缘，不从无墙空缺掉出建筑',()=>{
 const reached=new Map();let edgeCount=0,visitedCount=0;
 const step=.25,dirs=[[1,0],[-1,0],[0,1],[0,-1]];
 for(const [y,sx,sz] of [[0,0,-6],[2.8,0,60],[5.6,0,62],[-2.8,13,20]]) {
  const relevant=colliders.filter(b=>b.y1>=y-.3&&b.y0<y+1.75);
  const floors=relevant.filter(b=>Math.abs(b.y1-y)<.015);
  const blockers=relevant.filter(b=>b.y1>y+.35&&b.y0<y+1.67);
  const supported=(x,z)=>floors.some(b=>x>=b.x0&&x<=b.x1&&z>=b.z0&&z<=b.z1);
  const clear=(x,z)=>!blockers.some(b=>b.x0<x+.3-.001&&b.x1>x-.3+.001&&b.z0<z+.3-.001&&b.z1>z-.3+.001);
  const queue=[[sx,sz]],seen=new Set([sx+','+sz]);let cursor=0,edges=0;
  while(cursor<queue.length) {
   const [x,z]=queue[cursor++];
   for(const [ux,uz] of dirs) {
    const nx=x+ux*step,nz=z+uz*step,key=nx+','+nz;
    if(nx< -32||nx>46||nz< -11||nz>85||!clear(nx,nz))continue;
    if(supported(nx,nz)) {
     if(seen.has(key))continue;
     const c=body(x,y,z);moveWithCollisions(c,ux*step,-.01,uz*step,relevant,.35);
     const p=point(c);if(Math.hypot(p.x-nx,p.z-nz)>.02||Math.abs(p.y-y)>.03)continue;
     seen.add(key);queue.push([nx,nz]);
    } else {
     if(onStair({x,y,z})||onStair({x:nx,y,z:nz}))continue;
     const c=body(x,y,z);edges++;
     for(let frame=0;frame<20;frame++) {
      moveWithCollisions(c,ux*.13,-.12,uz*.13,relevant,.35);
      const p=point(c);if(onStair(p))break;
      assert.ok(p.y>=y-.6,`可达边缘掉落：从 (${x},${y},${z}) 往 (${ux},${uz})，到 ${JSON.stringify(p)}`);
     }
    }
   }
  }
  reached.set(y,queue);visitedCount+=queue.length;edgeCount+=edges;
  console.log(`floor ${y}: ${queue.length} reachable samples, ${edges} edge approaches`);
 }
 for(const area of ANNEX_AREAS) {
  const [x0,z0,x1,z1]=area.bounds;
  assert.ok(reached.get(-2.8).some(([x,z])=>x>x0+.5&&x<x1-.5&&z>z0+.5&&z<z1-.5),`无法从配电间走到 ${area.name}`);
 }
 assert.ok(visitedCount>15000);console.log(`exploration audit: ${visitedCount} samples, ${edgeCount} edge approaches`);
});


test('无法退出的嵌入不能把角色进一步推穿相邻墙',()=>{
 const c=body(0,0,0),left={x0:-1,x1:-.5,z0:-2,z1:2,y0:0,y1:3},right={x0:.5,x1:1,z0:-2,z1:2,y0:0,y1:3};
 const closingDoor={x0:-.03,x1:.03,z0:-2,z1:2,y0:0,y1:3};
 moveWithCollisions(c,0,-.1,0,[closingDoor,left,right],.35);
 assert.ok(c.x0>=left.x1&&c.x1<=right.x0);
});

test('关门受阻自动重新打开，开着的门仍然有碰撞体',()=>{
 const door=level.makeDoor({x:100,z:100,along:'x',width:1.6});
 level.forceOpen(door);for(let i=0;i<100;i++)level.updateDoors(.05);
 const p={x:100.8,y:0,z:99.8};level.toggleDoor(door);
 for(let i=0;i<100;i++)level.updateDoors(.05,p);
 assert.equal(door.open,true);assert.equal(door.target,1);assert.ok(door.collider);
 const b=door.collider;assert.ok(!(b.x0<p.x+.3&&b.x1>p.x-.3&&b.z0<p.z+.3&&b.z1>p.z-.3));
});

test('纸拉门受阻停止关闭，不能将玩家推入墙内',()=>{
 const door=level.makeDoor({x:110,z:110,type:'slide',width:1.14});
 level.forceOpen(door);for(let i=0;i<100;i++)level.updateDoors(.05);
 const p={x:110,y:0,z:110.55};level.toggleDoor(door);
 for(let i=0;i<100;i++)level.updateDoors(.05,p);
 assert.equal(door.open,true);assert.equal(door.slideTarget,-door.slideOffset);
 const b=door.collider;assert.ok(!(b.x0<p.x+.3&&b.x1>p.x-.3&&b.z0<p.z+.3&&b.z1>p.z-.3));
});

test('低顶下不能自动踏上矮物并把头挤进天花板',()=>{
 const floor={x0:-5,x1:5,z0:-5,z1:5,y0:-.2,y1:0};
 const step={x0:.6,x1:2,z0:-1,z1:1,y0:0,y1:.3};
 const ceiling={x0:-5,x1:5,z0:-5,z1:5,y0:1.9,y1:2.1};
 const c=body(0,0,0);
 for(let i=0;i<20;i++)moveWithCollisions(c,.1,-.04,0,[floor,step,ceiling],.35);
 assert.ok(c.x1<=step.x0+.001,JSON.stringify(c));
 assert.equal(c.y0,0);
 assert.ok(c.y1<=ceiling.y0);
 const clear=body(0,0,0);
 for(let i=0;i<20;i++)moveWithCollisions(clear,.1,-.04,0,[floor,step],.35);
 assert.ok(clear.y0>=.3,'headroom clearance must not prevent ordinary stairs');
});

test('向上运动不能穿过顶板',()=>{
 const c=body(0,0,0),ceiling={x0:-5,x1:5,z0:-5,z1:5,y0:1.9,y1:2.1};
 moveWithCollisions(c,0,3,0,[ceiling],.35);
 assert.ok(c.y1<=ceiling.y0+.001,JSON.stringify(c));
});
