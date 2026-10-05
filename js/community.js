import * as THREE from '../vendor/three.module.js';
import { stdMat } from './util.js';

// Authored exterior loop. Shop and clinic each have two doors; a continuous
// promenade joins them back to the lobby without teleporting the player.
export const COMMUNITY_AREAS = [
  { name: '雨夜杂货店', floor: 0, bounds: [-24,-37,-10,-17] },
  { name: '街区卫生站', floor: 0, bounds: [10,-37,24,-17] },
  { name: '社区雨棚连廊', floor: 0, bounds: [-24,-45,24,-37] },
  { name: '回声社区中庭', floor: 0, bounds: [-24,-45,24,-9] },
];

export function buildCommunity(level,h) {
  const {box,mesh,cylinder,sign,lamp,desk,chair,shelf,closet,recordDocument}=h;
  const M=level.materials,D=level.detailMaterials,w=level.campaign;
  const stone=stdMat({color:0x525d5a,roughness:.87});
  const green=stdMat({color:0x36564e,roughness:.72,metalness:.15});
  const cream=stdMat({color:0xb6ad91,roughness:.81});
  const ochre=stdMat({color:0x877342,roughness:.83});
  const glass=stdMat({color:0x162c30,roughness:.22,metalness:.32});
  level.floor(0,-27,48,36,0,stone,[16,12]);
  // Solid perimeter; the lobby is the only opening in the north edge.
  level.wallZ(-9,-24,-.8,0,3.2,M.concrete);
  level.wallZ(-9,.8,24,0,3.2,M.concrete);
  level.wallZ(-45,-24,24,0,3.2,M.concrete);
  level.wallX(-24,-45,-9,0,3.2,M.concrete);
  level.wallX(24,-45,-9,0,3.2,M.concrete);
  // A shared apartment elevation is visible from every route, so the district
  // reads as one neighborhood rather than unrelated room boxes.
  box(0,-8.96,3.2,48,.22,8.4,M.concrete,true);
  for(const yy of [3.2,6,8.8,11.5])box(0,-9.14,yy,48,.5,.13,stone);
  for(const x of [-21,-15,-9,-3,3,9,15,21])for(const y of [4.5,7.3,10.1]) {
    box(x,-9.105,y-.62,1.75,.035,1.4,glass);
    for(const dx of [-.9,0,.9])box(x+dx,-9.16,y-.65,.05,.06,1.48,D.iron);
    for(const dy of [-.65,.78])box(x,-9.16,y+dy,1.85,.09,.05,D.iron);
    box(x,-9.24,y-.69,2,.34,.09,stone);
  }
  // Shared outside walls are owned by the perimeter, never doubled.
  level.room(-24,-10,-37,-17,{h:3,w:false,wallMat:M.plaster,floorMat:M.tile,
    gaps:{e:[[-22,-20],[-34,-32]],n:[[-19,-17]]}});
  level.room(10,24,-37,-17,{h:3,e:false,wallMat:M.plaster,floorMat:M.tile,
    gaps:{w:[[-22,-20],[-34,-32]],n:[[17,19]]}});
  level.ceil(0,-41,48,8,3.2,M.concrete);
  for(const x of [-9,0,9])for(const z of [-38,-44]) {
    box(x,z,0,.22,.22,3.2,green,true);
    box(x,z,.02,.42,.42,.1,stone,true);
  }
  for(const z of [-38,-44])box(0,z,3.04,48,.26,.16,green);
  for(const [x,z,along,label] of [[-10,-22,'z','杂货店前门'],[-10,-34,'z','杂货店侧门'],
    [10,-22,'z','卫生站前门'],[10,-34,'z','卫生站侧门'],[-19,-37,'x','杂货店后门'],[17,-37,'x','卫生站后门']])
    level.makeDoor({x,z,along,width:2,dir:1,label,mat:green});
  sign(-9.87,-26,2.05,'雨夜杂货',['面包 / 电话 / 失物招领'],'e',2.0,true);
  sign(9.87,-26,2.05,'社区卫生站',['夜间急救联络处'],'w',2.0,true);
  sign(0,-44.87,1.8,'回声社区',['公寓 ↑  卫生站 →','← 杂货店  /  雨棚通道'],'n',2.8,true);
  sign(-4,-9.13,1.9,'回声公寓',['备用电源恢复后可通行'],'s',1.8,true);
  // The perimeter gate is scenery, visibly barricaded rather than a fake exit.
  box(0,-44.82,0,3,.12,2.65,green,true);
  for(const x of [-1.4,1.4])box(x,-44.66,.1,.12,.22,2.7,D.iron,true);
  sign(0,-44.68,1.6,'道路沉降',['通往天井的救援线仍可使用'],'n',1.7);

  // Memorial island: knee-height planter and supported notice monolith.
  // Two 7m-wide paths flank the island; no invisible collision around foliage.
  box(0,-28,0,5.6,7,.43,stone,true);
  box(0,-28,.43,5.1,6.5,.08,M.darkWood);
  box(0,-28,.51,1.4,.45,1.9,stone,true);
  sign(0,-27.76,1.6,'迁居纪念',['共十二户 / 四十一人','最后一行被反复擦过'],'n',1.2);
  for(const x of [-2,2])for(const z of [-30,-26]) {
    cylinder(x,.82,z,.045,1.05,D.wood);
    for(const a of [-.45,.45]) {
      const branch=cylinder(x+a*.3,1.2,z,.021,.65,D.wood);branch.rotation.z=a;
    }
  }
  // Wet paving seams and drains stay flush with the walking surface.
  for(const x of [-8,8])for(let z=-42;z<-10;z+=4) {
    box(x,z,.004,.45,1.5,.012,D.iron);
    for(let k=0;k<7;k++)box(x,z-.6+k*.2,.017,.34,.045,.004,M.black);
  }
  for(const x of [-6,6])for(const z of [-15,-36]) {
    lamp(x,z,2.85,0xd1ac73,2.4,false,{pole:0});
    box(x-.48,z,0,.28,.28,.08,stone,true);
  }
  // Shop counter is open shelving with feet and cabinet fronts, not a cube.
  desk(-18,-21,0,4);recordDocument(25,-18,-21,.803,'未取走的面包订单');
  shelf(-22.7,-26,0,1.65);shelf(-22.7,-31,0,1.65);
  for(const z of [-25,-29,-33]) {
    box(-15,z,.75,2,.75,.075,D.wood,true);
    for(const x of [-15.8,-14.2])box(x,z,0,.07,.65,.75,D.wood);
    for(let i=0;i<4;i++) {
      const tin=cylinder(-15.65+i*.42,.94,z,.13,.29,i%2?cream:ochre);
      cylinder(tin.position.x,1.09,z,.133,.02,D.iron);
    }
  }
  closet(-22.8,-35.7,0);lamp(-18,-27,2.78,0xc2a16c,2.5);
  level._battery(-18,-20.8,.86);
  // Telephone: body, curved receiver, keypad, cord and its own shelf.
  box(-12,-18.1,.9,1.3,.55,.065,D.wood,true);
  box(-12,-18.1,.97,.36,.26,.12,green);
  cylinder(-12,1.12,-18.08,.036,.4,M.black,'x');
  for(const x of [-12.16,-11.84])cylinder(x,1.09,-18.08,.065,.09,M.black);
  for(let r=0;r<3;r++)for(let c=0;c<3;c++)box(-12.07+c*.07,-18.18+r*.05,1.091,.043,.032,.01,cream);
  recordDocument(26,-12.45,-18.1,.971,'公用电话通话底单');
  for(const x of [-12.5,-11.5])box(x,-18.1,0,.055,.4,.9,D.wood);

  // Clinic: distinct reception and treatment area, with a curtained sightline.
  desk(18,-20,0,3.5);chair(18,-21.3,0);
  recordDocument(27,18,-20,.803,'救援接线记录');
  sign(18,-17.13,1.8,'请先呼叫',['救援频道 14.07','回应以前，请不要挂断'],'s',1.6);
  for(const z of [-27,-32]) {
    box(19,z,.62,3,1.1,.13,D.iron,true);
    box(19,z,.75,2.9,1,.15,cream,true);
    box(20,z,.9,.7,.92,.12,M.wallpaper);
    for(const x of [17.7,20.3])for(const dz of [-.4,.4])cylinder(x,.32,z+dz,.035,.64,D.iron);
    for(const x of [17.55,20.45])box(x,z,.68,.055,1.05,.55,D.iron);
  }
  box(15,-29,0,.12,5,1.85,green,true);
  box(15,-29,1.85,.18,5.2,.08,D.iron);
  closet(22.9,-35.7,0);shelf(22.8,-24,0,1.3);lamp(18,-26,2.78,0x91b9b0,2.5);
  // Return-state landmark: a dark rescue indicator turns green after the call.
  w.communityBeacon=lamp(0,-39,2.85,0x739bb0,0,false,{pole:0});
  w.communityBeacon.base=3;
  const plaque=mesh(new THREE.PlaneGeometry(1.4,.7),new THREE.MeshBasicMaterial({color:0x28332f}),0,1.7,-39);
  // A solid backing and post support the lamp/plaque without obstructing loops.
  box(0,-39.04,.02,1.5,.12,2,green,true);
  w.communityPlaque=plaque;
  for(const [x,z] of [[0,-12],[-6,-20],[-6,-34],[0,-41],[6,-34],[6,-20],[-18,-22],[-18,-34],[18,-22],[18,-34]])
    level.monsterNodes.push({x,y:0,z});
}
