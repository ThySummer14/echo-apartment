import * as THREE from '../vendor/three.module.js';

// 普通公寓双跑折返梯：每跑升半层，楼层平台直接接到走廊。
export function stairPoint(stair, u, v, y) {
  const c = Math.cos(stair.rotation), s = Math.sin(stair.rotation);
  return new THREE.Vector3(stair.x + c * u + s * v, y, stair.z - s * u + c * v);
}

export function stairRoute(stair, storey = 0, direction = 1) {
  const base = stair.base + storey * stair.rise;
  const lane = (stair.width + stair.gap) / 2;
  const route = [stairPoint(stair, 0, -1.25, base), stairPoint(stair, -lane, -.5, base)];
  for (let i = 0; i < stair.steps; i++) route.push(stairPoint(stair, -lane,
    (i + .5) * stair.going, base + (i + 1) * stair.riser));
  for (const u of [-lane, 0, lane]) route.push(stairPoint(stair, u,
    stair.run + stair.landingDepth / 2, base + stair.rise / 2));
  for (let i = 0; i < stair.steps; i++) route.push(stairPoint(stair, lane,
    stair.run - (i + .5) * stair.going, base + stair.rise / 2 + (i + 1) * stair.riser));
  route.push(stairPoint(stair, lane, -.5, base + stair.rise), stairPoint(stair, 0, -1.25, base + stair.rise));
  return direction > 0 ? route : route.reverse();
}

export function stairNavigationTarget(stairs, position, player) {
  const direction = Math.sign(player.y - position.y);
  if (Math.abs(player.y - position.y) < .15) return null;
  const candidates = stairs.filter(stair => position.y >= stair.base - .2 &&
    position.y <= stair.base + stair.storeys * stair.rise + .2 &&
    (direction > 0 ? position.y < stair.base + stair.storeys * stair.rise - .15 : position.y > stair.base + .15));
  candidates.sort((a, b) => a.entry.distanceToSquared(position) - b.entry.distanceToSquared(position));
  const stair = candidates[0];
  if (!stair) return null;
  const goalY = Math.max(stair.base, Math.min(stair.base + stair.storeys * stair.rise, player.y));
  const nodes = stair.path;
  let segment = 0, best = Infinity;
  for (let i=0;i<nodes.length-1;i++) {
    const a=nodes[i],b=nodes[i+1];
    const dx=b.x-a.x,dz=b.z-a.z,dy=(b.y-a.y)*4;
    const length=dx*dx+dz*dz+dy*dy;
    if(length<1e-8)continue;
    const t=Math.max(0,Math.min(1,((position.x-a.x)*dx+(position.z-a.z)*dz+(position.y-a.y)*4*dy)/length));
    const score=(position.x-a.x-t*dx)**2+(position.z-a.z-t*dz)**2+((position.y-a.y)*4-t*dy)**2;
    if(score<best-1e-7 || (Math.abs(score-best)<1e-7 && direction>0)) {best=score;segment=i;}
  }
  const target=nodes[direction>0?segment+1:segment];
  if(Math.abs(position.y-goalY)<.1)return null;
  return target;
}

export function buildSwitchbackStair(level, options = {}) {
  const stair = { x: 0, z: 64.2, base: 0, rise: 2.8, storeys: 2, steps: 8,
    width: 1.65, gap: .35, going: .30, landingDepth: 1.65, frontDepth: 2.5, rotation: 0, ...options };
  stair.run = stair.steps * stair.going;
  stair.riser = stair.rise / (stair.steps * 2);
  const span = stair.width * 2 + stair.gap + .3;
  const lane = (stair.width + stair.gap) / 2;
  stair.entry = stairPoint(stair, 0, -1.25, stair.base);
  stair.path = Array.from({length: stair.storeys}, (_, i) => stairRoute(stair, i)).flat();
  level.stairs.push(stair);
  const group = new THREE.Group();
  group.name = 'switchback-stair'; group.position.set(stair.x, 0, stair.z); group.rotation.y = stair.rotation;
  group.userData.stair = stair; level.scene.add(group);
  const concrete = level.detailMaterials?.concrete || level.materials.concrete;
  const paint = new THREE.MeshStandardMaterial({color:0x56655b,roughness:.74,metalness:.18});
  const grip = new THREE.MeshStandardMaterial({color:0x302a24,roughness:.5,metalness:.12});
  const brass = new THREE.MeshStandardMaterial({color:0x8d7750,roughness:.66,metalness:.45});
  const add = (geometry, material, u, y, v) => {
    const mesh = new THREE.Mesh(geometry, material); mesh.position.set(u,y,v); group.add(mesh); return mesh;
  };
  const collision = (u,v,bottom,w,d,h,part) => {
    const p = stairPoint(stair,u,v,bottom);
    const sideways = Math.abs(Math.sin(stair.rotation)) > .5;
    const hw = (sideways ? d : w) / 2, hd = (sideways ? w : d) / 2;
    const collider = {x0:p.x-hw,x1:p.x+hw,z0:p.z-hd,z1:p.z+hd,y0:bottom,y1:bottom+h,stairPart:part,
      walkable: ['tread', 'floor-landing', 'half-landing'].includes(part)};
    level.colliders.push(collider); return collider;
  };
  const platform = (v,top,depth,part) => {
    const mesh = add(new THREE.BoxGeometry(span,.20,depth),concrete,0,top-.1,v);
    mesh.userData.collider = collision(0,v,top-.20,span,depth,.20,part);
  };
  const tube = (a,b,r,mat=paint) => {
    const delta = b.clone().sub(a);
    const mesh = add(new THREE.CylinderGeometry(r,r,delta.length(),12),mat,0,0,0);
    mesh.position.copy(a.clone().add(b).multiplyScalar(.5));
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize()); return mesh;
  };
  const footPlate = (u,v,top) => {
    add(new THREE.BoxGeometry(.12,.018,.12),paint,u,top+.009,v);
    for (const du of [-.037,.037]) for (const dv of [-.037,.037])
      add(new THREE.CylinderGeometry(.009,.009,.012,6),brass,u+du,top+.022,v+dv);
  };
  const rail = (u,start,end,y0,y1,treadHeight=null) => {
    for (const offset of [.52,1.02]) tube(new THREE.Vector3(u,y0+offset,start),new THREE.Vector3(u,y1+offset,end),offset>.8?.032:.014,offset>.8?grip:paint);
    const count = Math.ceil((end-start)/.32);
    for (let i=0;i<=count;i++) {
      const t=i/count,v=start+(end-start)*t,y=y0+(y1-y0)*t;
      const foot=treadHeight?treadHeight(v):y;
      tube(new THREE.Vector3(u,foot+.025,v),new THREE.Vector3(u,y+1.01,v),.013);
      if (i%3===0 || i===count) footPlate(u,v,foot);
    }
    collision(u,(start+end)/2,Math.min(y0,y1),.085,end-start,Math.abs(y1-y0)+1.08,'guard');
  };
  const crossRail = (v,top) => {
    tube(new THREE.Vector3(-span/2,top+1.02,v),new THREE.Vector3(span/2,top+1.02,v),.032,grip);
    tube(new THREE.Vector3(-span/2,top+.52,v),new THREE.Vector3(span/2,top+.52,v),.014);
    for (let u=-span/2;u<=span/2+.01;u+=.3) {
      tube(new THREE.Vector3(u,top+.02,v),new THREE.Vector3(u,top+1.02,v),.013);
      footPlate(u,v,top);
    }
    collision(0,v,top,span,.085,1.08,'guard');
  };
  // 平台荷载通过横梁和连续柱传到地面；灰模也保留这些真实支撑。
  for (const v of [-.22,stair.run+stair.landingDepth-.16]) {
    const height = v<0 ? stair.storeys*stair.rise : (stair.storeys-.5)*stair.rise;
    for (const u of [-span/2,span/2]) {
      const mesh=add(new THREE.BoxGeometry(.22,height,.28),concrete,u,stair.base+height/2,v);
      mesh.userData.collider=collision(u,v,stair.base,.22,.28,height,'column');
    }
    const count=v<0?stair.storeys:stair.storeys-1;
    for(let i=0;i<=count;i++) {
      const top=v<0?stair.base+i*stair.rise:stair.base+(i+.5)*stair.rise;
      add(new THREE.BoxGeometry(span+.22,.35,.28),concrete,0,top-.175,v);
    }
  }
  const flight = (u,base,direction) => {
    const shape = new THREE.Shape(); shape.moveTo(0,-.22); shape.lineTo(0,stair.riser);
    for (let i=0;i<stair.steps;i++) {
      shape.lineTo((i+1)*stair.going,(i+1)*stair.riser);
      if(i<stair.steps-1) shape.lineTo((i+1)*stair.going,(i+2)*stair.riser);
    }
    shape.lineTo(stair.run,stair.rise/2-.22); shape.lineTo(0,-.22);
    const geo = new THREE.ExtrudeGeometry(shape,{depth:stair.width,bevelEnabled:false,steps:1});
    geo.rotateY(direction>0?-Math.PI/2:Math.PI/2);
    add(geo,concrete,u+direction*stair.width/2,base,direction>0?0:stair.run);
    for(let i=0;i<stair.steps;i++) {
      const v=direction>0?(i+.5)*stair.going:stair.run-(i+.5)*stair.going;
      const top=base+(i+1)*stair.riser;
      collision(u,v,top-.24,stair.width,stair.going+.008,.24,'tread');
      // 防滑鼻口、三道凹槽与真实混凝土侧面，而非漂浮薄片。
      const edge=v-direction*(stair.going/2-.027);
      add(new THREE.BoxGeometry(stair.width-.06,.008,.043),brass,u,top+.004,edge);
      for(const offset of [-.011,0,.011]) add(new THREE.BoxGeometry(stair.width-.09,.0015,.003),grip,u,top+.009,edge+offset);
      const point=stairPoint(stair,u,v,top);level.monsterNodes.push({...point});
    }
    for(const side of [-1,1]) {
      const edge=u+side*(stair.width/2-.075);
      const near=direction>0?base+stair.riser:base+stair.rise/2;
      const far=direction>0?base+stair.rise/2:base+stair.riser;
      rail(edge,.05,stair.run-.05,near,far,v=>{
        const distance=direction>0?v:stair.run-v;
        const index=Math.min(stair.steps-1,Math.floor(distance/stair.going));
        return base+(index+1)*stair.riser;
      });
    }
  };
  for(let i=0;i<=stair.storeys;i++) {
    const y=stair.base+i*stair.rise;
    platform(-stair.frontDepth/2,y,stair.frontDepth,'floor-landing');
    if(i>0) {
      const start=i===stair.storeys&&stair.roofOpenDepth?-(stair.frontDepth-stair.roofOpenDepth):-stair.frontDepth;
      for(const u of [-span/2,span/2]) rail(u,start,-.03,y,y);
    }
    level.monsterNodes.push({...stairPoint(stair,0,-1.25,y)});
  }
  for(let i=0;i<stair.storeys;i++) {
    const y=stair.base+i*stair.rise;
    flight(-lane,y,1);flight(lane,y+stair.rise/2,-1);
    const mid=y+stair.rise/2;
    platform(stair.run+stair.landingDepth/2,mid,stair.landingDepth,'half-landing');
    crossRail(stair.run+stair.landingDepth-.04,mid);
    for(const u of [-span/2,span/2]) rail(u,stair.run,stair.run+stair.landingDepth-.04,mid,mid);
    for(const u of [-lane,0,lane])level.monsterNodes.push({...stairPoint(stair,u,stair.run+stair.landingDepth/2,mid)});
  }
  return stair;
}
