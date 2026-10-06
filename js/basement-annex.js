import * as THREE from '../vendor/three.module.js';
import { stdMat, boxAABB } from './util.js';

export const ANNEX_AREAS = [
  { name: '地下旧区连廊', floor: -1, bounds: [12, 29, 44, 33] },
  { name: '旧区检修走廊', floor: -1, bounds: [22, 33, 26, 67] },
  { name: '地下值班站', floor: -1, bounds: [12, 33, 22, 45] },
  { name: '备用发电机房', floor: -1, bounds: [26, 33, 44, 47] },
  { name: '搬迁档案库', floor: -1, bounds: [12, 45, 22, 59] },
  { name: '旧蓄水池', floor: -1, bounds: [26, 47, 44, 67] },
  { name: '应急电台室', floor: -1, bounds: [12, 59, 22, 67] },
];

// 1,216m² 封闭旧区。房间与中央检修走廊构成两条回路，共享墙只建一次。
export function buildBasementAnnex(level, h) {
  const { box, mesh, cylinder, sign, lamp, desk, chair, shelf, closet, recordDocument, pickup } = h;
  const M = level.materials, D = level.detailMaterials, world = level.campaign, y = -2.8;
  const green = stdMat({ color: 0x3d5a4b, roughness: .75, metalness: .25 });
  const enamel = stdMat({ color: 0xa2a99a, roughness: .68, metalness: .15 });
  const red = stdMat({ color: 0x963e2c, roughness: .62, metalness: .25 });
  const brass = D.brass;
  level.room(12, 44, 29, 33, { y, h: 2.65, wallMat: M.concrete, floorMat: M.concrete,
    gaps: { n: [[15.8, 17.4]], s: [[16, 17.6], [23.2, 24.8], [34, 35.6]] } });
  level.room(22, 26, 33, 67, { y, h: 2.65, n: false, w: false, e: false, wallMat: M.concrete, floorMat: M.tile });
  level.room(12, 22, 33, 45, { y, h: 2.65, n: false, wallMat: M.plaster, floorMat: M.tile,
    gaps: { e: [[38, 39.6]], s: [[16, 17.6]] } });
  level.room(12, 22, 45, 59, { y, h: 2.65, n: false, wallMat: M.plaster, floorMat: M.concrete,
    gaps: { e: [[52, 53.6]], s: [[16, 17.6]] } });
  level.room(12, 22, 59, 67, { y, h: 2.65, n: false, wallMat: M.plaster, floorMat: M.tile,
    gaps: { e: [[63, 64.6]] } });
  level.room(26, 44, 33, 47, { y, h: 2.65, n: false, wallMat: M.concrete, floorMat: M.concrete,
    gaps: { w: [[40, 41.6]], s: [[34, 35.6]] } });
  level.room(26, 44, 47, 67, { y, h: 2.65, n: false, wallMat: M.concrete, floorMat: M.concrete,
    gaps: { w: [[56, 57.6]] } });

  world.doors.annex = level.makeDoor({ x: 15.8, z: 29, along: 'x', y, width: 1.6, dir: 1,
    label: '地下旧区防火门', mat: green, locked: true,
    lockedMsg: '旧区被封闭了。摄影师将钥匙藏在全家福背后的相纸夹层里。' });
  for (const [x, z, label, along] of [[16,33,'地下值班站','x'],[16,45,'搬迁档案库','x'],
    [16,59,'应急电台室','x'],[34,33,'备用发电机房','x'],[34,47,'旧蓄水池','x']])
    level.makeDoor({ x, z, along, y, width: 1.6, dir: 1, label, mat: green });
  sign(16.6, 28.87, -1.1, '旧区封闭', ['值班站 / 发电机 / 档案库', '相纸夹层内留有钥匙'], 's', 1.35, true);
  sign(24, 33.12, -1.25, '检修走廊', ['左侧：档案 / 电台', '右侧：发电 / 蓄水池'], 'n', 1.35, true);
  for (const [x,z,label] of [[16.8,33.13,'值班站'],[34.8,33.13,'发电机房'],[16.8,45.13,'搬迁档案'],
    [16.8,59.13,'应急电台'],[34.8,47.13,'蓄水池']]) sign(x,z,-1.2,label,[],'n',1.0,true);
  for (const [x,z] of [[16,31],[25,31],[34,31],[41,31],[24,38],[24,48],[24,59],[24,65]]) {
    lamp(x,z,-.32,0x9fb6a4,2.8,true);
    box(x,z,y+.01,.7,.05,.01,enamel);
  }
  // 管线固定在墙/顶，黄黑标记说明回路，不用碎石遮住通路。
  for (const x of [22.3,25.7]) {
    cylinder(x,-.47,50,.065,32,M.rust,'z');
    for (const z of [35,43,51,59,65]) {
      box(x,z,-.72,.11,.07,.35,D.paint);
      cylinder(x,-.47,z,.08,.08,D.paint,'z');
    }
  }
  for (const [z,title] of [[37,'01 值班'],[48,'02 档案'],[60,'03 呼叫']])
    sign(25.87,z,-1.25,title,['原路返回配电间'],'w',1.15,true);
  for (const area of ANNEX_AREAS) {
    const [x0,z0,x1,z1]=area.bounds;
    // 下部墙裙无碰撞，不能跨过门洞；独立建筑墙负责阻挡。
    for (const x of [x0+.13,x1-.13]) for (const z of [z0+.7,z1-.7])
      box(x,z,y,.025,.8,.7,green);
  }

  // 值班站：失去回应的工位、钥匙架和纸质交班记录。
  desk(14.5,35.2,y,2.9); chair(14.5,36.5,y);
  recordDocument(18,14.1,35.2,y+.803,'最后一次交班日志');
  recordDocument(24,15.0,35.2,y+.803,'泵房门锁工单');
  box(14.4,35.15,y+.8,.38,.25,.13,M.black);
  cylinder(14.25,y+.985,35.15,.055,.08,D.paint);
  sign(12.13,39,-1.0,'交班牌',['白班：未签字','夜班：02:17'],'e',1.4);
  for (let i=0;i<5;i++) {
    box(12.2,42.2-i*.3,y+1.45,.04,.22,.26,M.darkWood);
    cylinder(12.25,y+1.55,42.2-i*.3,.035,.015,brass,'x');
  }
  box(18.8,43,y+.42,3,.65,.1,M.darkWood,true);
  box(18.8,43.34,y+.5,3,.05,.55,green);
  for (const x of [17.5,20.1]) box(x,43,y,.065,.6,.43,D.paint);
  closet(13.1,43,y); lamp(17,39,-.35,0xc4a77b,3.1,true);
  level._battery(20.5,34.8,y+.07);

  // 发电机：发动机壳、散热器、排气弯管、仪表和与机座相连的支脚。
  box(38,40,y,5.5,2.5,.3,D.paint,true);
  box(37.5,40,y+.3,3.6,1.75,1.3,green,true);
  cylinder(40,y+.98,40,.65,1.8,enamel,'x');
  for (const x of [39.25,40.5]) cylinder(x,y+.98,40,.67,.075,D.paint,'x');
  for(let i=0;i<12;i++) box(35.65,39.22+i*.13,y+.46,.035,.055,1.02,M.darkMetal);
  for (const x of [36.3,38.7]) for(const z of [39.2,40.8])
    box(x,z,y+.12,.35,.35,.32,M.black);
  cylinder(37.6,-.63,40,.09,1.2,M.rust,'x');
  cylinder(37,-1.04,40,.09,.82,M.rust);
  box(41.9,40,y,.7,2.5,1.6,green,true);
  const control=box(30.1,34.1,y,2.1,.42,1.8,D.paint,true);
  for(const x of [29.5,30.1,30.7]) {
    const gauge=cylinder(x,y+1.4,34.34,.12,.04,enamel,'z');
    cylinder(x,y+1.4,34.37,.09,.025,D.darkGlass,'z');
    box(x,34.4,y+1.37,.012,.02,.085,red);
  }
  level.regInteractable(control,'启动备用柴油机',2.7,()=>level.handlers.onPuzzle?.('generator'));
  recordDocument(19,29,35.7,y+.8,'备用柴油机启动规程');
  desk(29.6,35.7,y,1.8);
  for(const [x,z] of [[28,43.5],[30,43.5],[32,43.5]]) {
    cylinder(x,y+.65,z,.43,1.3,red);
    level.colliders.push(boxAABB(x,y+.65,z,.86,1.3,.86));
    for(const yy of [y+.2,y+1.1]) cylinder(x,yy,z,.45,.05,D.paint);
  }
  sign(43.87,39,-1.2,'备用输出',['先预热，再供油','最后接通输出'],'w',1.5,true);
  lamp(33,39,-.35,0xaebdac,3.4,true);
  lamp(41,43,-.35,0xc5a473,3.0,true);
  lamp(37.5,40,-.35,0xb6bd9e,3.6,true);
  world.generatorLamp=lamp(30.1,34.5,-1.2,0x73ad75,.65,false);
  world.generatorRotor=cylinder(40.95,y+.98,40,.38,.08,D.paint,'x');
  level.props.campaignDynamic.add(world.generatorRotor);

  // 档案库：可绕行的成排档案架，关键熔断器位于清晰的维修盒。
  for (const x of [13.4,17.3,20.5]) for (const z of [47.3,55.6]) shelf(x,z,y,1.65);
  desk(14.5,52,y,2.0); chair(14.5,53.2,y);
  recordDocument(20,14.1,52,y+.803,'没有结清的搬迁总账');
  box(20.3,51,y,1.0,.75,.8,green,true);
  box(20.3,51.3,y+.8,1.02,.045,.55,green);
  const relayFuse=new THREE.Group();
  const body=mesh(new THREE.CylinderGeometry(.065,.065,.28,12),enamel,0,0,0,relayFuse);
  body.rotation.z=Math.PI/2;
  for(const x of [-.13,.13]) {
    const cap=mesh(new THREE.CylinderGeometry(.07,.07,.05,12),brass,x,0,0,relayFuse);cap.rotation.z=Math.PI/2;
  }
  relayFuse.position.set(20.3,y+.87,51);level.scene.add(relayFuse);
  pickup('relayFuse',relayFuse,'取走旧区输出熔断器');
  sign(20.3,51.46,-1.4,'维修备件',['柴油机输出熔断器'],'n',.8,true);
  lamp(16.5,50,-.35,0xb3b69b,3.1,true);lamp(17.5,57,-.35,0x8bac99,2.5,true);

  // 蓄水池保持整块承重地板；水池模型在抬高的设备座上，四边实体护栏。
  box(37.2,58,y,10.4,11,.28,D.paint,true);
  const water=mesh(new THREE.PlaneGeometry(9.4,10),stdMat({color:0x233d36,roughness:.3,metalness:.2}),37.2,y+.3,58);
  water.rotation.x=-Math.PI/2;
  for(const x of [31.95,42.45]) {
    level.colliders.push(boxAABB(x,y+.84,58,.08,1.12,11));
    for(const offset of [.52,1.08]) box(x,58,y+.28+offset,.065,11,.045,enamel);
    for(let z=52.5;z<=63.5;z+=.5) cylinder(x,y+.84,z,.027,1.12,enamel);
  }
  for(const z of [52.45,63.55]) {
    level.colliders.push(boxAABB(37.2,y+.84,z,10.6,1.12,.08));
    for(const offset of [.52,1.08]) box(37.2,z,y+.28+offset,10.6,.065,.045,enamel);
    for(let x=32;x<=42.5;x+=.5) cylinder(x,y+.84,z,.027,1.12,enamel);
  }
  cylinder(42.8,-.55,58,.12,15,M.rust,'z');
  for(const z of [49.5,64.5]) cylinder(42.8,-1.45,z,.12,1.8,M.rust);
  const marker=sign(26.13,61,-1.2,'苍太 · 七岁',['墙上的刻线停在这里'],'e',1.7);
  level.regInteractable(marker,'读蓄水池墙上的刻字',2.7,()=>level.handlers.onDocument?.(22));
  for(let i=0;i<9;i++)box(26.16,60.8,y+.35+i*.08,.015,.35,.012,enamel);
  lamp(29,51,-.35,0x82b5a0,3.0,true);lamp(29,63,-.35,0xb49570,3.2,true);
  lamp(40,65,-.35,0x82b5a0,2.8,true);
  lamp(37.2,58,-.35,0x9ebba5,3.6,true);
  closet(27.2,49,y);level._battery(28.5,64.8,y+.07);

  // 电台室：电源、调频盘、听筒和实体天线。完成呼叫后回到原泵房排水。
  desk(15.3,65.4,y,3.1);chair(15.3,64.6,y); // tucked toward the desk, clear of the return aisle
  const radio=box(15.3,65.4,y+.8,1.3,.65,.62,green,true);
  box(15.3,65.05,y+.95,.9,.035,.23,D.darkGlass);
  for(const x of [14.83,15.78])cylinder(x,y+1.0,65.0,.08,.075,D.paint,'z');
  for(let i=0;i<7;i++)box(15.65,65.015,y+1.16+i*.025,.25,.012,.008,enamel);
  cylinder(14.9,y+1.75,65.5,.012,.75,D.paint);
  cylinder(15.82,y+1.44,65.3,.026,.11,brass);
  level.regInteractable(radio,'调谐应急无线电',2.7,()=>level.handlers.onPuzzle?.('radio'));
  recordDocument(21,16.4,65.4,y+.803,'应急呼叫频道表');
  sign(12.13,62,-1.1,'不要结束通话',['14.07 MHz / 四位调谐码','把名字说出来'],'e',1.35,true);
  lamp(16,62,-.35,0xc5af85,3.0,true);
  world.radioLamp=lamp(15.3,65.0,-1.5,0x7bbf96,.55,false);
  for(const [x,z] of [[16.6,30.5],[23.8,31],[24,38],[24,48],[24,58],[24,65],
    [18,38],[18,52],[18,62],[29,40],[34.8,45],[34.8,49],[29,57],[29,64],[40,49],[40,65]])
    level.monsterNodes.push({x,y,z});
}
