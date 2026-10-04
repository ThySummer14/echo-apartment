import * as THREE from '../vendor/three.module.js';
import { stdMat, basicMat, boxAABB, mulberry32 } from './util.js';
import { buildSwitchbackStair } from './stairs.js';
import { detailMaterials, fixtureDetails, finishStairwell } from './models.js';
import { WEST_AREAS, buildWestWing } from './west-wing.js';

// 平面图与位置提示共用真实关卡坐标。
export const WORLD_AREAS = [
  ...WEST_AREAS,
  { name: '入口大厅', floor: 0, bounds: [-5, -9, 5, -2] },
  { name: '玄关', floor: 0, bounds: [-1.7, -2, 1.7, 1.8] },
  { name: '一楼走廊', floor: 0, bounds: [-1.9, 1.8, 1.9, 61.7] },
  { name: '东翼走廊', floor: 0, bounds: [1.9, 42, 31, 46] },
  { name: '公共洗衣房', floor: 0, bounds: [7, 32, 17.5, 42] },
  { name: '104 空屋', floor: 0, bounds: [7, 46, 18.5, 56] },
  { name: '管理员维修室', floor: 0, bounds: [19, 32, 31, 42] },
  { name: '厨房', floor: 0, bounds: [-8.4, 0, -1.7, 7.5] },
  { name: '客厅', floor: 0, bounds: [-8.4, 7.5, -1.7, 15.5] },
  { name: '寝室', floor: 0, bounds: [-13.8, 7.5, -8.4, 15.5] },
  { name: '浴室', floor: 0, bounds: [-17.6, 14.8, -13.8, 21] },
  { name: '佛间', floor: 0, bounds: [1.7, 0, 8.4, 8.5] },
  { name: '儿童房', floor: 0, bounds: [1.7, 8.5, 8.4, 15.5] },
  { name: '维修楼梯间', floor: 0, bounds: [1.7, 16, 11.8, 25] },
  { name: '维修楼梯间', floor: -1, bounds: [1.7, 16, 11.8, 25] },
  ...[0, 1, 2].map((floor) => ({ name: '折返楼梯间', floor, bounds: [-5, 61.7, 5, 72.8] })),
  { name: '屋顶晾晒场', floor: 2, bounds: [-8, 61.7, 8, 83] },
  { name: '二楼走廊', floor: 1, bounds: [-1, 0, 1, 61.7] },
  { name: '201 管理室', floor: 1, bounds: [-8.4, 16, -1, 27] },
  { name: '202 留守住户', floor: 1, bounds: [1, 40, 10, 54] },
  { name: '203 放映室', floor: 1, bounds: [-10, 36, -1, 48] },
  { name: '露天天井', floor: 1, bounds: [1, 28.5, 10.5, 33] },
  { name: '地下配电间', floor: -1, bounds: [11.8, 14, 20, 29] },
  { name: '地下排水间', floor: -1, bounds: [20, 14, 24, 29] },
];

export function currentArea(position) {
  const floor = position.y < -0.8 ? -1 : position.y > 4.8 ? 2 : position.y > 2 ? 1 : 0;
  return WORLD_AREAS.find((area) => area.floor === floor &&
    position.x >= area.bounds[0] && position.x <= area.bounds[2] &&
    position.z >= area.bounds[1] && position.z <= area.bounds[3])?.name ??
    (floor === -1 ? '地下维修楼梯' : '楼梯间');
}

export function buildCampaignWorld(level) {
  const M = level.materials;
  const D = detailMaterials(level);
  // 原公寓保留色图，增加线性空间的凹凸/粗糙度，让近距离手电显出表面细节。
  for (const [name, source, scale] of [['concrete', D.concrete, .018], ['plaster', D.plaster, .012],
    ['wallpaper', D.plaster, .006], ['woodWall', D.wood, .009], ['woodDoor', D.wood, .008], ['woodFloor', D.wood, .009]]) {
    M[name].bumpMap = source.bumpMap; M[name].roughnessMap = source.roughnessMap; M[name].bumpScale = scale;
  }
  const scene = level.scene;
  const rng = mulberry32(14071998);
  const decorative = { collide: false, cast: false, geo: { ao: 'none', jitter: 0, bevel: true } };
  const grey = stdMat({ color: 0x626d69, roughness: 0.88, metalness: 0.08 });
  const brass = stdMat({ color: 0x92734b, roughness: 0.68, metalness: 0.12 });
  const red = stdMat({ color: 0x843d31, roughness: 0.9, metalness: 0.06 });
  const blue = stdMat({ color: 0x354e5a, roughness: 0.92 });
  const paper = stdMat({ map: level.tex.journal, color: 0xd6c9af, roughness: 1 });
  level.campaign = { doors: {}, pickups: {}, valves: [], lamps: [], dynamics: [] };
  const world = level.campaign;
  level.props.campaignDynamic = new THREE.Group();
  scene.add(level.props.campaignDynamic);

  const box = (x, z, y, w, d, h, mat, solid = false) =>
    level.box(x, z, y, w, d, h, mat === M.darkWood ? D.wood : mat, solid ? {geo:{bevel:true}} : decorative);
  const mesh = (geometry, material, x, y, z, parent = scene) => {
    const result = new THREE.Mesh(geometry, material);
    result.position.set(x, y, z);
    parent.add(result);
    return result;
  };
  const cylinder = (x, y, z, radius, height, material, axis = 'y') => {
    const result = mesh(new THREE.CylinderGeometry(radius, radius, height, 10), material, x, y, z);
    if (axis === 'x') result.rotation.z = Math.PI / 2;
    if (axis === 'z') result.rotation.x = Math.PI / 2;
    return result;
  };
  const texture = (title, lines = [], dark = false) => {
    const canvas = document.createElement('canvas');
    canvas.width = 512; canvas.height = 320;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = dark ? '#25342f' : '#c4b99e';
    ctx.fillRect(0, 0, 512, 320);
    for (let i = 0; i < 400; i++) {
      ctx.fillStyle = 'rgba(30,26,18,' + (rng() * 0.07) + ')';
      ctx.fillRect(rng() * 512, rng() * 320, rng() * 25 + 1, 1);
    }
    ctx.strokeStyle = dark ? '#829083' : '#6e6556';
    ctx.lineWidth = 3; ctx.strokeRect(14, 14, 484, 292);
    ctx.fillStyle = dark ? '#d7d9c5' : '#302c26';
    ctx.textAlign = 'center';
    ctx.font = 'bold 38px "Songti SC", serif';
    ctx.fillText(title, 256, lines.length ? 82 : 175);
    ctx.font = '25px "Songti SC", serif';
    lines.forEach((line, index) => ctx.fillText(line, 256, 145 + index * 44));
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    return tex;
  };
  const sign = (x, z, y, title, lines, face, width = 0.72, dark = false) =>
    level.decalWall(x, z, y, width, width * 0.625, texture(title, lines, dark), face);
  const recordDocument = (id, x, z, y, title) => {
    const note = mesh(new THREE.PlaneGeometry(0.28, 0.36), paper, x, y, z);
    note.rotation.x = -Math.PI / 2; note.rotation.z = -0.13;
    note.material = stdMat({
      map: level.tex.journal, color: 0xe1d2b1, roughness: 1,
      side: THREE.DoubleSide, emissive: 0x5a4b2a, emissiveIntensity: 0.14,
    });
    level.regInteractable(note, title, 2.6, () => level.handlers.onDocument?.(id));
    level.notePickups.push({ mesh: note, id });
    return note;
  };
  const pickup = (id, group, title) => {
    const it = level.regInteractable(group, title, 2.4,
      () => level.handlers.onItem?.(id, group, it));
    world.pickups[id] = { mesh: group, interactable: it };
  };
  const lamp = (x, z, y, color = 0x96b2a8, intensity = 2.0, powered = false, mount = null) => {
    const light = new THREE.PointLight(color, intensity, 8, 1.8);
    light.position.set(x, y - 0.08, z);
    scene.add(light);
    const fixture=fixtureDetails(level,x,y,z,powered?0x292d29:color);
    if(mount?.wall) {
      if(mount.wall==='east'||mount.wall==='west') {
        fixture.group.rotation.z=mount.wall==='east'?-Math.PI/2:Math.PI/2;
        light.position.set(x+(mount.wall==='east'?-.08:.08),y,z);
      } else {
        fixture.group.rotation.x=mount.wall==='south'?Math.PI/2:-Math.PI/2;
        light.position.set(x,y,z+(mount.wall==='south'?-.08:.08));
      }
    } else if(mount?.pole!==undefined) {
      const top=y+.12,base=mount.pole;
      cylinder(x-.48,(base+top)/2,z,.033,top-base,grey);
      cylinder(x-.24,top,z,.024,.48,grey,'x');
      cylinder(x,y+.075,z,.019,.09,grey);
      box(x-.48,z,base,.16,.16,.035,grey);
    } else {
      const ceiling=level.ceilings.filter(c=>x>=c.x0&&x<=c.x1&&z>=c.z0&&z<=c.z1&&c.y>=y-.1&&c.y-y<.8)
        .sort((a,b)=>a.y-b.y)[0];
      const top=mount?.ceiling??ceiling?.y;
      if(top>y+.035)for(const dx of [-.25,.25])cylinder(x+dx,(top+y+.035)/2,z,.014,top-y-.035,grey);
    }
    const bulb=fixture.diffuser;
    const rec = { light, base: intensity, powered, bulb };
    world.lamps.push(rec);
    if (powered) light.intensity = 0;
    return rec;
  };
  const desk = (x, z, y, width = 1.8) => {
    box(x, z, y + 0.73, width, 0.8, 0.06, M.darkWood, true);
    for (const dx of [-width / 2 + 0.09, width / 2 - 0.09])
      for (const dz of [-0.3, 0.3]) box(x + dx, z + dz, y, 0.06, 0.06, 0.73, M.darkWood);
    box(x + width / 2 - 0.28, z, y, 0.38, 0.7, 0.68, M.darkWood, true);
    for (let i=0;i<3;i++) {
      const xx=x+width/2-.28,yy=y+.07+i*.20;
      box(xx,z-.361,yy,.34,.025,.176,M.darkWood);
      cylinder(xx,yy+.10,z-.406,.012,.18,brass,'x');
      for(const dx of [-.065,.065])cylinder(xx+dx,yy+.10,z-.384,.011,.045,brass,'z');
    }
  };
  const chair = (x, z, y, material = M.darkWood) => {
    box(x, z, y + 0.4, 0.47, 0.46, 0.07, material);
    for(const dx of [-.21,.21])box(x+dx,z+.2,y+.44,.048,.045,.49,material);
    for(const yy of [.57,.72,.87])box(x,z+.2,y+yy,.40,.045,.055,material);
    for (const dx of [-0.19, 0.19]) for (const dz of [-0.18, 0.18])
      box(x + dx, z + dz, y, 0.035, 0.035, 0.42, material);
  };
  const shelf = (x, z, y, width = 1.5) => {
    for (const dx of [-width / 2, width / 2]) box(x + dx, z, y, 0.055, 0.4, 1.85, grey);
    for (let i = 0; i < 5; i++) {
      box(x, z, y + 0.08 + i * 0.41, width, 0.4, 0.045, grey);
      if (i < 4) for (let j = 0; j < 4; j++)
        box(x - width * 0.35 + j * width * 0.23, z,
          y + 0.125 + i * 0.41, 0.22, 0.3, 0.27, j % 2 ? blue : paper);
    }
  };
  const closet = (x, z, y) => {
    const body = box(x, z, y, 1.25, 0.62, 2.05, M.darkWood, true);
    box(x, z - 0.32, y + 0.03, 1.15, 0.035, 1.96, grey);
    box(x, z - 0.35, y + 0.08, 0.018, 0.02, 1.86, M.black);
    for (const dx of [-0.08, 0.08]) cylinder(x + dx, y + 1.06, z - 0.38, 0.016, 0.14, brass);
    level.regInteractable(body, '躲进衣柜', 2.3, () => level.handlers.onHide?.(body));
  };
  const roomTrim = (x0, x1, z0, z1, y, doorX, gap) => {
    level._baseboard(x0 + 0.115, z0, z1, y, doorX === x0 ? [gap] : []);
    level._baseboard(x1 - 0.115, z0, z1, y, doorX === x1 ? [gap] : []);
    level._baseboardX(z0 + 0.115, x0, x1, y);
    level._baseboardX(z1 - 0.115, x0, x1, y);
    for (const x of [x0 + 0.15, x1 - 0.15])
      box(x, (z0 + z1) / 2, y + 2.27, 0.055, z1 - z0, 0.07, M.darkWood);
  };

  // 真正的入口大厅：外门、住户信箱、值班台、长椅与拆迁告示。
  level.room(-5, 5, -9, -2, { h: 2.7, s: false, wallMat: M.concrete, floorMat: M.tile,
    gaps: { n: [[-0.8, 0.8]] } });
  level.wallZ(-2, -5, -1.7, 0, 2.7, M.concrete);
  level.wallZ(-2, 1.7, 5, 0, 2.7, M.concrete);
  level.makeDoor({ x: -0.8, z: -9, along: 'x', width: 1.6, dir: 1, mat: grey,
    label: '公寓外门', locked: true, lockedMsg: '外门的锁舌已经锈死。拆除通知说，夜间只能走二楼天井出口。' });
  desk(-3.55, -6.55, 0, 2.0);
  chair(-3.5, -5.45, 0);
  recordDocument('invitation', -3.5, -6.55, 0.803, '一封没有署名的信');
  for (let row = 0; row < 3; row++) for (let col = 0; col < 4; col++) {
    box(-3.85 + col * 0.55, -8.86, 0.95 + row * 0.39, 0.49, 0.14, 0.34, grey);
    box(-3.85 + col * 0.55, -8.77, 1.08 + row * 0.39, 0.24, 0.012, 0.025, M.black);
  }
  sign(-3.25, -8.73, 2.36, '回声公寓', ['夜間受付 / MAIL'], 'n', 1.65, true);
  sign(4.86, -5.2, 1.5, '拆除告示', ['七月十四日清场', '夜间出口：二楼天井'], 'w', 1.8);
  box(3.2, -7.6, 0.38, 2.7, 0.55, 0.09, M.darkWood, true);
  box(3.2, -7.88, 0.49, 2.7, 0.05, 0.7, M.darkWood);
  for (const x of [2.05, 4.35]) box(x, -7.6, 0, 0.055, 0.45, 0.4, grey);
  box(0, -8.1, 0.012, 2.1, 0.75, 0.025, M.rug);
  sign(0.95, -2.12, 1.65, '住户区', ['厨房 / 三号室', '楼梯间在走廊尽头'], 's', 0.9, true);
  lamp(0, -5.5, 2.5, 0xc19c71, 3.0);
  lamp(-3.4, -6.5, 2.4, 0x9dbbae, 1.4);
  level._window(4.86, -7.3, 1.5, 'w', { w: 1.5, h: 1.4 });

  // 双跑折返梯：两跑各升半层，楼层平台从走廊门洞连续铺到最后一级。
  level.floor(0, 67.25, 10, 11.1, 0, M.concrete);
  level.wallX(-5, 61.7, 72.8, 0, 5.6, M.concrete);
  level.wallX(5, 61.7, 72.8, 0, 5.6, M.concrete);
  level.wallZ(72.8, -5, 5, 0, 5.6, M.concrete);
  for (const y of [0, 2.8]) level.wallZ(61.7, -5, 5, y, 2.8, M.concrete, [[-1.7, 1.7]]);
  buildSwitchbackStair(level, { roofOpenDepth: 1.5 });
  finishStairwell(level,{x0:-5,x1:5,z0:61.7,z1:72.8,base:0,height:5.6,gapX:[-1.7,1.7]});
  for (const [index, y] of [0, 2.8, 5.6].entries()) {
    sign(1.8, 61.84, y + 1.65, ['1F', '2F', '屋顶 R'][index],
      ['住户区 / 住户区 / 晾晒场'.split(' / ')[index], '沿扶手可原路返回'], 'n', 1.1, true);
    if(index<2)lamp(0,63.05,y+2.565,0xc0a57b,3.8,false,{ceiling:y+2.6});
    else {
      for(const dx of [-.4,.4])box(1.8+dx,61.79,y,.045,.045,1.85,grey);
      box(1.8,61.81,y+1.65-.344,1.1,.035,.688,grey);
    }
    if (index < 2) level._window(-4.86, 69.4, y + 1.55, 'e', { w: 1.75, h: 1.65 });
    level.monsterNodes.push({ x: 0, y, z: 62.4 });
  }
  lamp(0,67.5,3.965,0x98b2aa,2.8,false,{ceiling:4.0});
  lamp(4.865,67.4,5.05,0x98b2aa,3.6,false,{wall:'east'});
  // 屋顶保留楼梯井，周围是可绕行的晾晒场；开口有防坠护栏。
  level.floor(-6, 67.25, 4, 11.1, 5.6, M.concrete);
  level.floor(6, 67.25, 4, 11.1, 5.6, M.concrete);
  level.floor(0, 62.45, 8, 1.5, 5.6, M.concrete);
  level.floor(0, 77.9, 16, 10.2, 5.6, M.concrete);
  level.wallX(-8, 61.7, 83, 5.6, 1.12, M.concrete);
  level.wallX(8, 61.7, 83, 5.6, 1.12, M.concrete);
  level.wallZ(83, -8, 8, 5.6, 1.12, M.concrete);
  level.wallZ(61.7, -8, 8, 5.6, 1.12, M.concrete);
  for (const x of [-4.08, 4.08]) {
    box(x, 67.75, 5.6, 0.065, 9.9, 1.04, grey, true);
    for (let z = 63.1; z < 73; z += 0.7) cylinder(x, 6.12, z, 0.025, 1.04, grey);
  }
  box(0, 72.73, 5.6, 8.2, 0.07, 1.04, grey, true);
  for (const x of [-3.05, 3.05]) for (const z of [75, 81]) cylinder(x, 6.8, z, 0.045, 2.4, grey);
  for (const x of [-3.05, 3.05]) cylinder(x, 7.98, 78, 0.038, 6.0, grey, 'z');
  for (let i = 0; i < 5; i++) {
    const cloth = box(-2.4 + i * 1.15, 78.5, 6.35, 0.75, 0.035, 1.55, i % 2 ? M.quilt : M.pale);
    cloth.rotation.y = i * 0.2 - 0.4;
  }
  const roofBench = box(0.4, 81.55, 5.99, 2.2, 0.52, 0.07, M.darkWood, true);
  for (const x of [-0.5, 1.3]) box(x, 81.55, 5.6, 0.05, 0.45, 0.4, grey);
  recordDocument(10, 0.4, 81.55, 6.08, '母亲留下的便条');
  lamp(-5.4, 74.2, 7.25, 0x82a9b5, 2.3,false,{pole:5.6});
  lamp(5.4, 81, 7.3, 0x93b6bd, 2.3,false,{pole:5.6});
  level._battery(5.8, 75.5, 5.65);
  for (const [x, z, w, h] of [[-18, 78, 12, 18], [20, 84, 13, 23], [0, 102, 22, 15]]) {
    box(x, z, -4, w, 9, h, M.concrete);
    for (let row = 0; row < 5; row++) for (let col = 0; col < 4; col++)
      box(x - w / 2 + 1.5 + col * (w - 3) / 3, z - 4.55, 0.5 + row * 2.5,
        1.0, 0.04, 1.5, basicMat({ color: rng() < 0.15 ? 0x8f7d55 : 0x172728 }));
  }

  // 东翼公共区让调查穿过真实的住户生活空间，而非只有一条走廊。
  level.room(1.9, 31, 42, 46, { w: false, wallMat: M.plaster, floorMat: M.tile,
    gaps: { n: [[9, 10.5], [23, 24.5]], s: [[10, 11.5]] } });
  level.room(7, 17.5, 32, 42, { s: false, wallMat: M.concrete, floorMat: M.tile });
  level.room(19, 31, 32, 42, { s: false, wallMat: M.concrete, floorMat: M.concrete });
  level.room(7, 18.5, 46, 56, { n: false, wallMat: M.wallpaper, floorMat: M.woodFloor });
  level.makeDoor({ x: 9, z: 42, along: 'x', width: 1.5, dir: 1, label: '公共洗衣房' });
  world.doors.workshop = level.makeDoor({ x: 23, z: 42, along: 'x', width: 1.5, dir: 1,
    label: '管理员维修室', mat: grey, locked: true, lockedMsg: '维修室磁锁没有电。先接通地下备用电源。' });
  level.makeDoor({ x: 10, z: 46, along: 'x', width: 1.5, dir: -1, label: '104 空屋' });
  sign(1.77, 42.2, 1.7, '东翼', ['洗衣房 / 104', '管理员维修室'], 'w', 0.75, true);
  sign(9.75, 42.13, 1.6, '洗衣房', [], 'n', 0.65, true);
  sign(23.75, 42.13, 1.6, '维修室', [], 'n', 0.65, true);
  sign(10.75, 45.87, 1.6, '104', [], 's', 0.46, true);
  for (const x of [5.5, 13, 21, 28]) lamp(x, 44, 2.5, 0x97b7a7, 2.6, x > 12);
  for (const x of [8.4, 10.3, 12.2, 14.1]) {
    box(x,33.1,0,1.05,.8,1.15,D.enamel,true);
    box(x,33.1,1.15,1.08,.84,.035,D.enamel);
    box(x,33.515,.91,.93,.03,.17,D.paint);
    mesh(new THREE.TorusGeometry(.319,.024,12,32),D.iron,x,.58,33.61);
    mesh(new THREE.TorusGeometry(.283,.026,10,32),D.rubber,x,.58,33.595);
    cylinder(x,.58,33.53,.24,.12,D.iron,'z');
    mesh(new THREE.TorusGeometry(.205,.011,8,28),D.iron,x,.58,33.594);
    const holes=new THREE.InstancedMesh(new THREE.CircleGeometry(.008,6),D.rubber,24);
    for(let i=0;i<24;i++) {
      const angle=i/12*Math.PI*2,r=i<12?.17:.215;
      holes.setMatrixAt(i,new THREE.Matrix4().makeTranslation(x+Math.cos(angle)*r,.58+Math.sin(angle)*r,33.596));
    }
    scene.add(holes);
    const glassMaterial=D.darkGlass.clone();glassMaterial.transparent=true;glassMaterial.opacity=.40;glassMaterial.depthWrite=false;
    mesh(new THREE.CircleGeometry(.253,32),glassMaterial,x,.58,33.615);
    box(x-.30,33.59,.49,.08,.05,.18,D.iron);
    box(x+.30,33.63,.48,.045,.05,.20,D.enamel);
    for(const dx of [-.31,.20]) {
      cylinder(x+dx,1.00,33.556,.037,.04,D.rubber,'z');
      box(x+dx,33.58,1.0,.006,.005,.026,D.enamel);
    }
    for(let i=0;i<3;i++)box(x-.08+i*.09,33.55,.96,.055,.016,.024,D.iron);
    box(x,33.55,.18,.90,.012,.018,D.iron);
    for(const dx of [-.38,.38])cylinder(x+dx,.055,33.2,.045,.11,D.rubber);
    cylinder(x, 1.28, 32.55, 0.038, 0.35, M.rust, 'z');
  }
  shelf(15.8, 40.8, 0, 1.5);
  box(9.8, 39.6, 0.38, 2.6, 0.75, 0.08, M.darkWood, true);
  for (const x of [8.7, 10.9]) box(x, 39.6, 0, 0.06, 0.65, 0.38, grey);
  for (let i = 0; i < 4; i++) box(9.1 + i * 0.43, 39.6, 0.46 + i * 0.01, 0.35, 0.5, 0.035, M.quilt);
  lamp(12, 36.7, 2.5, 0x93b6b1, 3.1, true);
  level._window(17.36, 36.5, 1.45, 'w', { w: 1.6, h: 1.3 });
  recordDocument(11, 10.1, 39.6, 0.66, '洗衣房的留言');

  // 工具台、挂板、手轮与被涂改的工单组成排水谜题的第二个现场。
  desk(25.4, 33.8, 0, 3.4);
  box(25.4, 32.14, 1.18, 4.7, 0.035, 1.1, M.darkWood);
  for (let i = 0; i < 7; i++) {
    const tool = cylinder(23.5 + i * 0.59, 1.65, 32.23, 0.021, 0.45, grey);
    tool.rotation.z = i * 0.09 - 0.2;
    box(23.5 + i * 0.59, 32.23, 1.88, 0.14, 0.035, 0.055, brass);
  }
  shelf(30.15, 36.8, 0, 1.25);
  shelf(29, 40.8, 0, 2.1);
  closet(20.25, 40.8, 0);
  box(20.5, 34, 0, 1.1, 1.25, 1.4, grey, true);
  cylinder(20.5, 1.47, 34, 0.32, 0.13, brass);
  recordDocument(9, 26.2, 33.8, 0.803, '未完成的维修工单');
  const handwheel = new THREE.Group();
  handwheel.position.set(24.2, 0.9, 33.8);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.035, 8, 18), red);
  rim.rotation.x = -Math.PI / 2; handwheel.add(rim);
  for (const angle of [0, Math.PI / 2]) {
    const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.036, 0.036), red);
    spoke.rotation.y = angle; handwheel.add(spoke);
  }
  scene.add(handwheel); pickup('valveHandle', handwheel, '取走排水阀手轮');
  lamp(25.4, 35.6, 2.5, 0xc0a06b, 3.0, true);
  level._battery(27.8, 38.2, 0.05);

  // 空屋的生活痕迹和独立调查记录，让支路提供信息与补给。
  box(15.8, 52.2, 0, 1.85, 2.7, 0.3, M.darkWood, true);
  box(15.8, 52.2, 0.3, 1.7, 2.5, 0.13, M.quilt);
  desk(9, 54.7, 0, 1.65); chair(9, 53.7, 0);
  box(9.2, 54.7, 0.81, 0.32, 0.23, 0.07, M.black);
  recordDocument(12, 8.5, 54.7, 0.803, '104 住户日记');
  closet(17.2, 47.2, 0);
  box(12.3, 50.3, 0.015, 3.0, 3.7, 0.018, M.rug);
  lamp(12, 50, 2.5, 0xc19e75, 2.8, true);
  level._window(18.36, 50.5, 1.45, 'w', { w: 1.8, h: 1.35 });
  level._battery(8.7, 48.4, 0.05);
  for (const [x, z] of [[5, 44], [12, 44], [21, 44], [28.5, 44], [11, 36.5], [24, 37], [12, 49]])
    level.monsterNodes.push({ x, y: 0, z });

  // 地下维修梯采用同样的双跑折返结构，楼层平台直接贴合维修门。
  level.wallX(1.7, 16, 25, -2.8, 2.8, M.concrete);
  level.wallZ(16, 1.7, 11.8, -2.8, 5.5, M.concrete);
  level.wallZ(25, 1.7, 11.8, -2.8, 5.5, M.concrete);
  level.ceil(6.75, 20.5, 10.1, 9, 2.7, M.concrete);
  level.floor(6.75, 20.5, 10.1, 9, -2.8, M.concrete);
  buildSwitchbackStair(level, { x: 4.6, z: 20.5, base: -2.8, storeys: 1, frontDepth: 2.9, rotation: Math.PI / 2 });
  finishStairwell(level,{x0:1.7,x1:11.8,z0:16,z1:25,base:-2.8,height:5.5,leftDoor:{y:0,gap:[19.8,21.2]}});
  world.doors.service = level.makeDoor({
    x: 1.7, z: 19.8, width: 1.4, dir: 1, offset: -0.11, mat: grey,
    label: '地下维修门', locked: true, lockedMsg: '维修门锁着。大厅值班台上有一封信。',
  });
  sign(1.58, 19.35, 1.62, '地下维修', ['配电 / 排水', '非住户请勿进入'], 'w', 0.6, true);
  lamp(3.6, 20.5, 2.45, 0xc79a68, 1.6);
  lamp(7.8,24.865,-.4,0x9cb3a2,2.8,false,{wall:'south'});
  sign(3.9, 16.13, 1.4, 'B1', ['沿楼梯下楼', '原路可返回一楼'], 'n', 0.95, true);

  // 地下维修层：排水设备、管线、潮湿地面、手写检修规程。
  level.room(11.8, 24, 14, 29, {
    y: -2.8, h: 2.8, wallMat: M.concrete, floorMat: M.concrete,
    gaps: { w: [[19.4, 21.6]] },
  });
  level.floor(11.6, 20.5, 0.5, 3.0, -2.8, M.concrete);
  level.wallX(20, 14, 29, -2.8, 2.8, M.concrete, [[21, 22.5]]);
  world.doors.pump = level.makeDoor({
    x: 20, z: 21, width: 1.5, y: -2.8, mat: grey, dir: 1,
    label: '排水间铁门', locked: true, lockedMsg: '铁门上缠着锈链。先听完那盘录音。',
  });
  sign(19.88, 20.5, -1.2, '排水间', ['门内禁止通行'], 'w', 0.56, true);
  for (const x of [13.5, 16.5, 19]) {
    cylinder(x, -0.34, 21.5, 0.07, 14.4, M.rust, 'z');
    for (const z of [15.5, 20, 26.5]) cylinder(x, -0.33, z, 0.09, 0.06, grey, 'z');
  }
  shelf(14.8, 27.7, -2.8, 2.3);
  box(18.3, 27.9, -2.8, 1.3, 0.85, 0.9, grey, true);
  cylinder(18.3, -1.66, 27.9, 0.34, 0.6, M.rust);
  closet(12.75, 27.8, -2.8);
  const cabinet = box(17.1, 14.36, -2.35, 2.05, 0.35, 1.5, grey, true);
  box(17.1, 14.57, -2.25, 1.9, 0.045, 1.28, M.darkMetal);
  const powerLabels = ['走廊', '住户', '排水'];
  for (let i = 0; i < 3; i++) {
    box(16.45 + i * 0.65, 14.63, -1.72, 0.3, 0.08, 0.16, brass);
    sign(16.45 + i * 0.65, 14.64, -1.35, powerLabels[i], [], 'n', 0.4, true);
  }
  level.regInteractable(cabinet, '更换熔断器 / 合上备用电源', 2.5,
    () => level.handlers.onPuzzle?.('power'));
  sign(15.1, 14.13, -1.33, '检修卡', ['先排水 · 后走廊', '最后住户电源'], 'n', 1.0);
  const wiring = sign(14, 14.13, -1.35, '停电检修', ['合闸前更换熔断器'], 'n', 0.65);
  level.regInteractable(wiring, '阅读断电检修卡', 2.5, () => level.handlers.onDocument?.(4));
  for (const [x, z] of [[13.3, 17], [18, 23.5], [22, 18], [22, 26]]) {
    lamp(x, z, -0.3, 0x8bb4a5, 2.8, true);
    const puddle = mesh(new THREE.CircleGeometry(0.7 + rng(), 18),
      stdMat({ color: 0x1d2c28, transparent: true, opacity: 0.48, roughness: 0.26 }),
      x + 0.5, -2.775, z + 1);
    puddle.rotation.x = -Math.PI / 2;
  }
  lamp(13, 20.5, -0.3, 0xb26446, 1.25);
  const boiler = cylinder(22.6, -1.7, 16.3, 0.7, 2.05, grey);
  scene.add(boiler);
  level.colliders.push(boxAABB(22.6, -1.7, 16.3, 1.4, 2.05, 1.4));
  for (const y of [-2.55, -0.85]) cylinder(22.6, y, 16.3, 0.73, 0.07, M.rust);
  for (const x of [21.1, 22.15, 23.2]) {
    cylinder(x, -1.25, 28.2, 0.075, 2.4, M.rust);
    const wheel = new THREE.Group();
    wheel.position.set(x, -1.48, 28); level.props.campaignDynamic.add(wheel);
    mesh(new THREE.TorusGeometry(0.22, 0.028, 8, 14), red, 0, 0, 0, wheel);
    const hub = cylinder(x, -1.48, 28, 0.04, 0.12, brass, 'z');
    for (const angle of [0, Math.PI / 2]) {
      const spoke = mesh(new THREE.BoxGeometry(0.43, 0.028, 0.028), red, 0, 0, 0, wheel);
      spoke.rotation.z = angle;
    }
    world.valves.push(wheel);
    level.regInteractable(hub, '排水阀组', 2.6, () => level.handlers.onPuzzle?.('valves'));
  }
  sign(22.2, 28.86, -0.9, '水闸操作', ['泄压 / 回水 / 排水'], 's', 1.75, true);
  box(22.3, 23.8, -2.8, 2.1, 1.7, 0.1, M.darkMetal);
  for (let i = 0; i < 12; i++) box(21.3 + i * 0.18, 23.8, -2.67, 0.025, 1.7, 0.035, grey);
  level._battery(13.8, 24.5, -2.75);

  // 二楼的三套真实房间，使用门洞与完整碰撞壳体。
  const upperRoom = (x0, x1, z0, z1, gap, side) => {
    level.room(x0, x1, z0, z1, {
      y: 2.8, h: 2.4, wallMat: M.wallpaper, floorMat: M.woodFloor,
      [side]: false,
    });
    roomTrim(x0, x1, z0, z1, 2.8, side === 'w' ? x0 : x1, gap);
  };
  upperRoom(-8.4, -1, 16, 27, [20, 21.4], 'e');
  upperRoom(1, 10, 40, 54, [46, 47.4], 'w');
  upperRoom(-10, -1, 36, 48, [40, 41.4], 'e');
  world.doors.office = level.makeDoor({
    x: -1, z: 20, y: 2.8, width: 1.4, dir: -1, offset: 0.11,
    label: '201 管理室', locked: true, lockedMsg: '磁锁没有电。需要恢复地下备用电源。',
  });
  world.doors.resident = level.makeDoor({
    x: 1, z: 46, y: 2.8, width: 1.4, dir: 1, offset: -0.11,
    label: '202 留守住户', locked: true, lockedMsg: '磁锁没有电。需要恢复地下备用电源。',
  });
  world.doors.archive = level.makeDoor({
    x: -1, z: 40, y: 2.8, width: 1.4, dir: -1, offset: 0.11,
    label: '203 放映室', locked: true, lockedMsg: '钥匙保存在 201 管理室的档案柜里。',
  });
  for (const [x, z, number, face] of [[-0.87, 19.5, '201', 'e'], [0.87, 45.5, '202', 'w'], [-0.87, 39.5, '203', 'e']])
    sign(x, z, 4.4, number, [], face, 0.46, true);

  // 201：带抽屉的办公桌、打字机、文件架、保险柜和不再走动的时钟。
  desk(-5.8, 18.5, 2.8, 2.6);
  chair(-5.8, 19.6, 2.8);
  box(-6.5, 18.5, 3.59, 0.52, 0.38, 0.11, M.darkMetal);
  for (let row = 0; row < 3; row++) for (let key = 0; key < 8; key++)
    box(-6.72 + key * 0.062, 18.43 + row * 0.08, 3.7, 0.038, 0.04, 0.025, grey);
  cylinder(-6.5, 3.83, 18.68, 0.055, 0.5, M.black, 'x');
  recordDocument(8, -5.15, 18.5, 3.598, '二楼住户的目击记录');
  const safe = box(-7.65, 23.7, 2.8, 1.1, 0.75, 1.4, grey, true);
  box(-7.65, 23.3, 2.92, 0.94, 0.045, 1.16, M.darkMetal);
  for (let row = 0; row < 4; row++) for (let key = 0; key < 3; key++)
    box(-7.73 + key * 0.08, 23.26, 3.5 + row * 0.08, 0.048, 0.028, 0.048, brass);
  level.regInteractable(safe, '档案柜密码锁', 2.6, () => level.handlers.onPuzzle?.('cabinet'));
  const clockFace = mesh(new THREE.CircleGeometry(0.3, 24), stdMat({ map: level.tex.clock, roughness: 0.8 }), -3.6, 4.42, 16.13);
  mesh(new THREE.TorusGeometry(0.31, 0.023, 8, 24), grey, -3.6, 4.42, 16.12);
  shelf(-4.2, 26.4, 2.8, 2.5);
  closet(-2.5, 25.9, 2.8);
  sign(-8.26, 20.3, 4.2, '拆除通知', ['所有失物请在', '七月十四日前认领'], 'e', 1.4);
  lamp(-5.2, 21, 5.02, 0xc7af85, 2.8, true);
  lamp(-3, 25, 5.02, 0x92b3a5, 2.0, true);
  level._window(-8.26, 24.5, 4.3, 'e', { w: 1.4, h: 1.2 });
  level._battery(-4, 20, 2.85);

  // 202：有人生活到昨天的痕迹。
  box(7.7, 43, 2.8, 2.0, 3.1, 0.28, M.darkWood, true);
  box(7.7, 43, 3.08, 1.9, 3.0, 0.18, M.quilt);
  box(7.7, 41.95, 3.26, 1.2, 0.5, 0.11, M.pale);
  box(7.7, 44, 3.27, 1.9, 1.0, 0.07, blue);
  desk(4.1, 51.8, 2.8, 2);
  chair(4.1, 50.6, 2.8);
  const tape = new THREE.Group();
  const tapeBody = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.05, 0.18), grey);
  tape.add(tapeBody);
  for (const dx of [-0.068, 0.068]) {
    const reel = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.038, 0.012, 12), M.black);
    reel.position.set(dx, 0.032, 0); tape.add(reel);
  }
  tape.position.set(4.1, 3.64, 51.8); scene.add(tape);
  pickup('tape', tape, '七月十四日的录音带');
  closet(8.4, 52.9, 2.8);
  for (let i = 0; i < 5; i++) {
    box(2.2 + i * 0.65, 42, 2.8, 0.48, 0.4, 0.36, paper);
    box(2.2 + i * 0.65, 42, 3.16, 0.5, 0.43, 0.025, M.darkWood);
  }
  level._window(9.86, 48.2, 4.3, 'w', { w: 1.7, h: 1.1 });
  lamp(5.2, 47.5, 5.02, 0x9ab6bb, 2.5, true);
  level._battery(6.5, 50.2, 2.85);

  // 203：放映幕、胶片架和磁带录音机，真相是可选择调查的物件。
  desk(-6.5, 43.8, 2.8, 2);
  const player = box(-6.5, 43.8, 3.59, 0.68, 0.42, 0.15, grey);
  for (const dx of [-0.15, 0.15]) cylinder(-6.5 + dx, 3.76, 43.8, 0.11, 0.025, M.black);
  for (let i = 0; i < 4; i++) box(-6.73 + i * 0.13, 43.56, 3.62, 0.075, 0.04, 0.025, brass);
  level.regInteractable(player, '播放七月十四日的录音带', 2.8, () => level.handlers.onPuzzle?.('tape'));
  recordDocument(6, -7.15, 43.75, 3.599, '未寄出的认领书');
  shelf(-8.8, 47.3, 2.8, 1.7);
  const screen = sign(-9.86, 40.1, 4.15, '三号室', ['7月14日', '苍太 / 七岁'], 'e', 3.4);
  world.screen = screen;
  const projector = box(-3.4, 40.1, 3.5, 0.5, 0.7, 0.35, grey);
  cylinder(-3.8, 3.66, 40.1, 0.105, 0.26, M.black, 'x');
  for (const z of [39.8, 40.5]) {
    const reel = mesh(new THREE.TorusGeometry(0.21, 0.025, 8, 16), grey, -3.4, 4.06, z);
    reel.rotation.y = Math.PI / 2;
  }
  level.regInteractable(projector, '检查停止的放映机', 2.4, () => level.handlers.onDocument?.(6));
  for (const x of [-4.6, -6.2]) for (const z of [37.4, 38.9]) chair(x, z, 2.8, blue);
  lamp(-6, 41, 5.02, 0xb4a786, 1.9, true);
  lamp(-8, 45.5, 5.02, 0x759790, 1.7, true);

  // 真正可以走出去的露天天井与周围建筑轮廓。
  level.floor(5.75, 30.75, 9.5, 4.5, 2.8, M.concrete);
  for (const z of [28.5, 33]) {
    box(5.8, z, 2.8, 9.5, 0.14, 0.9, M.concrete, true);
    cylinder(5.8, 3.84, z, 0.045, 9.6, grey, 'x');
  }
  box(10.5, 30.75, 2.8, 0.14, 4.5, 0.9, M.concrete, true);
  cylinder(10.5, 3.85, 30.75, 0.045, 4.5, grey, 'z');
  for (const x of [3, 5.5, 8, 10.5]) for (const z of [28.5, 33])
    cylinder(x, 3.37, z, 0.024, 1.1, grey);
  sign(9.8, 32.86, 3.6, '避難経路', ['出口 →'], 's', 0.7, true);
  for (const [x, z, width, height] of [[28, 40, 8, 14], [25, 57, 12, 17], [37, 25, 10, 20]]) {
    box(x, z, -5, width, 10, height, M.concrete);
    for (let row = 0; row < 5; row++) for (let col = 0; col < 4; col++) {
      if (rng() < 0.28) continue;
      box(x - width / 2 + 1 + col * (width - 2) / 3, z - 5.04,
        -2 + row * 2.5, 0.8, 0.035, 1.1,
        basicMat({ color: rng() < 0.15 ? 0x81714e : 0x152022 }));
    }
  }
  const rainGeo = new THREE.BufferGeometry();
  const rain = new Float32Array(180 * 6);
  for (let i = 0; i < 180; i++) {
    const rooftop = i >= 90;
    const x = rooftop ? -8 + rng() * 16 : 1.4 + rng() * 11;
    const y = (rooftop ? 6 : 3) + rng() * 9, z = (rooftop ? 62 : 27) + rng() * (rooftop ? 22 : 8);
    rain.set([x, y, z, x - 0.035, y - 0.35, z], i * 6);
  }
  rainGeo.setAttribute('position', new THREE.BufferAttribute(rain, 3));
  const rainfall = new THREE.LineSegments(rainGeo,
    new THREE.LineBasicMaterial({ color: 0x9bb6be, transparent: true, opacity: 0.22 }));
  level.props.campaignDynamic.add(rainfall);
  world.rain = rainfall;

  // 起始物件与八音盒把旧房间接入新主线。

  box(-3.2, 1.4, 0, 1.2, 0.7, 0.73, M.darkWood, true);
  const fuse = new THREE.Group();
  const fuseBody = new THREE.Mesh(new THREE.CylinderGeometry(0.034, 0.034, 0.21, 10), M.pale);
  fuseBody.rotation.z = Math.PI / 2; fuse.add(fuseBody);
  for (const dx of [-0.1, 0.1]) {
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.036, 0.035, 10), brass);
    cap.rotation.z = Math.PI / 2; cap.position.x = dx; fuse.add(cap);
  }
  fuse.position.set(-3.2, 0.78, 1.4); scene.add(fuse);
  pickup('fuse', fuse, '备用熔断器');
  sign(-3.2, 0.13, 1.35, '备用工具', ['熔断器 / 配电间'], 'n', 0.75);
  const musicBox = box(6.75, 11.4, 0.48, 0.5, 0.38, 0.25, M.darkWood);
  box(6.75, 11.4, 0.73, 0.52, 0.4, 0.035, brass);
  for (let i = 0; i < 4; i++) box(6.6 + i * 0.1, 11.34, 0.77, 0.045, 0.15, 0.025, brass);
  level.regInteractable(musicBox, '修复八音盒', 2.7, () => level.handlers.onPuzzle?.('music'));
  closet(3, 14.7, 0);
  world.musicBox = musicBox;
  buildWestWing(level, { box, mesh, cylinder, sign, lamp, desk, chair, shelf, closet, recordDocument, pickup });

  // 不再用满地血迹承担全部叙事；墙面的潮痕和住户留下的标记更有辨识度。
  for (const [x, z, y, face] of [[-1.58, 17, 1.2, 'e'], [1.58, 26.2, 1.25, 'w'],
    [-8.25, 17.5, 4.0, 'e'], [11.93, 16.7, -1.4, 'e']])
    level.decalWall(x, z, y, 1.1, 1.8, level.tex.rust, face);
  sign(-1.58, 15.7, 1.7, '天井出口', ['由楼梯前往二楼', '停电时禁止通行'], 'e', 0.8, true);
  sign(0.86, 29.5, 4.5, '天井', [], 'w', 0.43, true);
  level.exitDoor.label = '天井防火门';
  level.exitDoor.slab.userData.interactable.label = '天井防火门';
  level.exitDoor.lockedMsg = '门被水压安全锁封住了。先解除地下水闸。';

  for (const [x, z, y] of [[13.3, 20.5, -2.8], [17.5, 18, -2.8], [18, 24.5, -2.8],
    [21.7, 21.8, -2.8], [22.3, 26, -2.8], [-3, 21.5, 2.8], [-5.5, 23, 2.8],
    [3, 47, 2.8], [5, 49.5, 2.8], [-3, 42, 2.8], [-7, 45.7, 2.8]])
    level.monsterNodes.push({ x, y, z });
}

export function syncCampaignWorld(level, campaign) {
  const world = level.campaign;
  if (level.props.clock) level.props.clock.mysterySolved = !!campaign.flags.cabinet;
  world.valves[2].visible = !!campaign.flags.released;
  world.doors.service.locked = !campaign.flags.invitation;
  world.doors.office.locked = !campaign.flags.power;
  world.doors.resident.locked = !campaign.flags.power;
  world.doors.archive.locked = !campaign.flags.cabinet;
  world.doors.pump.locked = !campaign.flags.memory;
  world.doors.workshop.locked = !campaign.flags.power;
  world.doors.west.locked = !campaign.flags.memory;
  world.photo.visible = !!campaign.flags.photo;
  level.exitDoor.locked = !campaign.flags.released;
  for (const [id, rec] of Object.entries(world.pickups)) {
    const taken = campaign.items.has(id) || (id === 'fuse' && campaign.flags.power) || (id === 'valveHandle' && campaign.flags.released) || (['film', 'developer'].includes(id) && campaign.flags.photo);
    rec.mesh.visible = !taken;
    rec.interactable.disabled = taken;
  }
  for (const lamp of world.lamps) if (lamp.powered) {
    lamp.light.intensity = campaign.flags.power ? lamp.base : 0;
    lamp.bulb.material.color.setHex(campaign.flags.power ? 0xbcc7b3 : 0x292d29);
  }
}
