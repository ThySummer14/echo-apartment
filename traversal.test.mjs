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

test('社区两条街区回路从大厅连续步行可达并返回',()=>{
 const outer=level.campaign.doors.community;outer.locked=false;level.forceOpen(outer);
 for(let i=0;i<200;i++)level.updateDoors(.016);
 const cs=[...level.colliders,...level.doors.map(d=>d.collider).filter(Boolean)];
 const c=body(0,0,-6),guard=new TraversalGuard();guard.reset(point(c));
 const route=[[0,-12],[-6,-12],[-6,-21],[-12,-21],[-18,-23],[-18,-35],[-18,-40],[-18,-35],[-12,-35],[-12,-33],[-6,-33],[-6,-41],
  [6,-41],[6,-33],[12,-33],[13,-33],[13,-35],[18,-35],[18,-40],[18,-35],[13,-35],[13,-21],[18,-22.5],[13,-21],[6,-21],[6,-12],[0,-12],[0,-6]];
 let frames=0;
 for(const [x,z] of route) {
  let reached=false;
  for(let i=0;i<900;i++) {
   const p=point(c),distance=Math.hypot(x-p.x,z-p.z);
   if(distance<.08){reached=true;break;}
   const step=Math.min(.065,distance);
   const moved=moveWithCollisions(c,(x-p.x)/distance*step,-.03,(z-p.z)/distance*step,cs,.35);
   assert.equal(guard.update(c,moved.grounded,cs,1/60),null,'unexpected recovery');
   assert.ok(Math.abs(c.y0)<.001,'unintended climb/fall '+JSON.stringify(point(c)));
   frames++;
  }
  assert.ok(reached,'blocked on way to '+JSON.stringify([x,z])+' at '+JSON.stringify(point(c)));
 }
 console.log('  Community continuous movement frames:',frames);
});

test('重建衣柜的全部部件位于单一碰撞包络内，没有装饰碰撞碎片',()=>{
 const wardrobes=[];level.scene.updateMatrixWorld(true);
 level.scene.traverse(o=>{if(o.userData.model==='wardrobe')wardrobes.push(o);});
 assert.ok(wardrobes.length>=4);
 for(const wardrobe of wardrobes) {
  const b=new THREE.Box3().setFromObject(wardrobe),c=wardrobe.userData.collider;
  for(const axis of ['x','y','z']) {
   assert.ok(b.min[axis]>=c[axis+'0']-.015,axis+' min '+b.min[axis]);
   assert.ok(b.max[axis]<=c[axis+'1']+.015,axis+' max '+b.max[axis]);
  }
  assert.ok(wardrobe.children.length>25,'carcass, inset doors, hardware and ventilation are separate geometry');
  assert.equal(level.colliders.filter(x=>x===c).length,1);
 }
});

test('厨房桌面由四条腿支撑，冰箱面板不超过机身，柜门后有真实空腔',()=>{
 level.scene.updateMatrixWorld(true);
 const table=level.props.kitchenTable;
 const top=new THREE.Box3().setFromObject(table.top);
 assert.ok(Math.abs(top.min.y-.74)<.02);
 assert.equal(table.legs.length,4);
 for(const leg of table.legs) {
  const b=new THREE.Box3().setFromObject(leg);
  assert.ok(Math.abs(b.min.y)<.02);
  assert.ok(Math.abs(b.max.y-top.min.y)<.025);
 }
 const fridge=new THREE.Box3().setFromObject(level.props.fridgeDoor);
 assert.ok(fridge.max.y<1.76);
 const cupboard=level.props.cabinet;
 for(const mesh of cupboard.carcass) {
  const b=new THREE.Box3().setFromObject(mesh);
  assert.ok(!b.containsPoint(new THREE.Vector3(-7.1,2.05,7.1)),'shelf cavity filled');
  assert.ok(b.max.z<7.4,'cabinet embedded in wall');
 }
 cupboard.pivot.rotation.y=1.3;cupboard.pivot.updateMatrixWorld(true);
 const door=new THREE.Box3().setFromObject(cupboard.pivot);
 assert.ok(door.min.z<6.5,'opening reveals interior');
 cupboard.pivot.rotation.y=0;cupboard.pivot.updateMatrixWorld(true);
});


test('衣柜调查锚点在把手高度，新增书架和椅子不再无碰撞',()=>{
 level.scene.updateMatrixWorld(true);
 const wardrobes=[];level.scene.traverse(o=>{if(o.userData.model==='wardrobe')wardrobes.push(o);});
 for(const w of wardrobes) {
  const anchor=interactionWorldPosition(w),base=w.getWorldPosition(new THREE.Vector3());
  assert.ok(Math.abs(anchor.y-base.y-1.08)<.001);
  const eye=new THREE.Vector3(base.x,base.y+1.55,base.z-1.6);
  const ray=anchor.clone().sub(eye).normalize();
  assert.ok(ray.z>Math.cos(Math.PI/6),'level gaze should reach the door handle');
 }
 assert.ok(level.colliders.filter(c=>c.propKind==='shelf').length>=4);
});

test('社区主线记录可从地面接近并具有清晰调查视线',()=>{
 for(const [id,x,z] of [[25,-18,-22.3],[26,-12.5,-19.2],[27,17,-21.2]]) {
  const rec=level.notePickups.find(r=>String(r.id)===String(id));assert.ok(rec);
  const eye=new THREE.Vector3(x,1.55,z),target=interactionWorldPosition(rec.mesh);
  assert.ok(eye.distanceTo(target)<2.6);
  assert.equal(interactionBlocked(eye,target,level.colliders,level.doors),false,'record '+id+' occluded');
 }
});


test('社区室内外地板不重叠共面，避免大片闪烁穿插',()=>{
 const floors=level.colliders.filter(c=>c.walkable&&Math.abs(c.y1)<.001&&c.z1<=-9.09);
 assert.equal(floors.length,5);
 for(let i=0;i<floors.length;i++)for(let j=i+1;j<floors.length;j++) {
  const a=floors[i],b=floors[j];
  const overlap=Math.max(0,Math.min(a.x1,b.x1)-Math.max(a.x0,b.x0))*Math.max(0,Math.min(a.z1,b.z1)-Math.max(a.z0,b.z0));
  assert.ok(overlap<.0001,'coplanar floor area '+overlap);
 }
});


test('客厅书柜与浴室药柜有空腔，开门和柜体均不埋进墙体',()=>{
 level.scene.updateMatrixWorld(true);
 for(const part of level.props.bookcase.parts) {
  const b=new THREE.Box3().setFromObject(part);
  assert.ok(b.min.x>=-8.3-.005);
  assert.equal(b.containsPoint(new THREE.Vector3(-8.12,1.1,10.3)),false);
 }
 for(const part of level.props.medicineCabinet.parts) {
  const b=new THREE.Box3().setFromObject(part);
  assert.ok(b.max.x< -13.9);
  assert.equal(b.containsPoint(new THREE.Vector3(-14.02,2,15.5)),false);
 }
 const door=new THREE.Box3().setFromObject(level.props.medicineCabinet.door);
 assert.ok(door.max.x< -13.9);assert.ok(door.min.y>=1.5);assert.ok(door.max.y<=2.2);
});


test('客厅茶几的桌面位于四条腿上，而不是倒置在地面',()=>{
 level.scene.updateMatrixWorld(true);const table=level.props.coffeeTable;
 const top=new THREE.Box3().setFromObject(table.top);
 assert.ok(Math.abs(top.min.y-.32)<.015);assert.equal(table.legs.length,4);
 for(const leg of table.legs){const b=new THREE.Box3().setFromObject(leg);
  assert.ok(Math.abs(b.min.y)<.015);assert.ok(Math.abs(b.max.y-top.min.y)<.02);
 }
});

test('电话从冰箱背后移到可步行接近、无遮挡的同一交互物件上',()=>{
 const c=body(-2.3,0,3.6);
 for(const[x,z]of[[-3.7,3.6],[-3.7,2.3],[-6.8,2.3],[-6.8,4],[-7.4,4]]){
  let reached=false;for(let i=0;i<400;i++){const p=point(c),d=Math.hypot(x-p.x,z-p.z);if(d<.06){reached=true;break;}const step=Math.min(.05,d);moveWithCollisions(c,(x-p.x)/d*step,-.03,(z-p.z)/d*step,colliders,.35);assert.ok(Math.abs(c.y0)<.001);}
  assert.ok(reached,'phone approach blocked on '+[x,z]+' at '+JSON.stringify(point(c)));
 }
 level.scene.updateMatrixWorld(true);const phone=level.props.phone,target=interactionWorldPosition(phone),origin=new THREE.Vector3(point(c).x,1.62,point(c).z);
 const interaction=level.interactables.find(i=>i.mesh===phone);assert.ok(interaction);assert.ok(origin.distanceTo(target)<interaction.dist);assert.equal(interactionBlocked(origin,target,level.colliders,level.doors),false);
 const ray=new THREE.Raycaster(origin,target.clone().sub(origin).normalize());assert.ok(ray.intersectObject(phone).length>0);let called=0;level.handlers.onPhone=()=>called++;interaction.action();assert.equal(called,1);
});

test('洗衣房对面的104与入口大厅都有连续可见地板网格',()=>{
 level.scene.updateMatrixWorld(true);const floors=[];level.scene.traverse(o=>{if(o.isMesh&&o.userData.collider?.walkable&&Math.abs(o.userData.collider.y1)<.001)floors.push(o);});
 let samples=0;for(const[x0,x1,z0,z1]of[[7.3,18.2,46.3,55.7],[-4.7,4.7,-8.7,-2.3]])for(let x=x0;x<=x1;x+=.65)for(let z=z0;z<=z1;z+=.65){
  const hits=new THREE.Raycaster(new THREE.Vector3(x,1,z),new THREE.Vector3(0,-1,0)).intersectObjects(floors);assert.ok(hits.length,'missing floor at '+[x,z]);assert.ok(hits[0].object.visible);assert.ok(Math.abs(hits[0].point.y)<.001);samples++;
 }
 console.log('  Reported-room floor samples:',samples);
});


test('104床垫不再被30厘米踏步高度吞没，床边通路仍可连续行走',()=>{
 level.scene.updateMatrixWorld(true);const bed=level.campaign.bed104,bounds=new THREE.Box3().setFromObject(bed.mattress),solid=bed.frame.userData.collider;
 assert.ok(Math.abs(solid.y1-bounds.max.y)<1e-6);
 const c=body(15.8,0,50);for(let i=0;i<40;i++)moveWithCollisions(c,0,-.03,.05,colliders,.35);
 assert.ok(Math.abs(c.y0)<.001);assert.ok(c.z1<=solid.z0+.002,'walked into or onto the mattress without clearing its height');
 const route=body(15.8,0,50);for(const[x,z]of[[14.4,50],[14.4,54],[15.8,54]]){
  let reached=false;for(let i=0;i<160;i++){const p=point(route),d=Math.hypot(x-p.x,z-p.z);if(d<.07){reached=true;break;}const step=Math.min(.05,d);moveWithCollisions(route,(x-p.x)/d*step,-.03,(z-p.z)/d*step,colliders,.35);assert.ok(Math.abs(route.y0)<.001);}
  assert.ok(reached,'bed-side route blocked');
 }
});
