import * as THREE from '../vendor/three.module.js';
import { stdMat, mulberry32 } from './util.js';

export const WEST_AREAS = [
  { name: '西翼封闭走廊', floor: 1, bounds: [-30, 54, -1, 58] },
  { name: '红灯暗房', floor: 1, bounds: [-30, 40, -21, 54] },
  { name: '204 摄影师旧居', floor: 1, bounds: [-21, 40, -10, 54] },
  { name: '住户纪念室', floor: 1, bounds: [-30, 28, -10, 40] },
];

// 胶片接触印相：在游戏中生成照片、底片和相纸，避免外部素材请求。
const photoTextures = new Map();
export function familyPhotoTexture(index = 0) {
  if(photoTextures.has(index))return photoTextures.get(index);
  const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = 384;
  const c = canvas.getContext('2d'), rng = mulberry32(714 + index);
  c.fillStyle = '#c9bea7'; c.fillRect(0, 0, 512, 384);
  c.save(); c.beginPath(); c.rect(22,22,468,300); c.clip();
  c.fillStyle = '#595953'; c.fillRect(22, 22, 468, 300);
  c.fillStyle = '#7d7c6c'; c.fillRect(22, 185, 468, 137);
  for (let i = 0; i < 6; i++) {
    c.fillStyle = i % 2 ? '#676a62' : '#878477';
    c.fillRect(30 + i * 82, 60 + i * 9, 65, 160);
    c.fillStyle = '#343e3c';
    for (let j = 0; j < 3; j++) c.fillRect(40 + i * 82, 78 + i * 9 + j * 35, 20, 20);
  }
  c.strokeStyle = '#b6b2a0'; c.lineWidth = 2;
  c.beginPath(); c.moveTo(32, 100); c.lineTo(475, 130); c.stroke();
  for (let i = 0; i < 3; i++) { c.fillStyle = '#c4beab'; c.fillRect(50 + i * 54, 108, 42, 68); }
  const people = [[230, 161, 75], [291, 158, 80], [352, 205, 43], [397, 224, 31]];
  for (const [x, y, height] of people) {
    c.fillStyle = '#beb7a3'; c.beginPath(); c.ellipse(x, y, height * .16, height * .22, 0, 0, 7); c.fill();
    c.fillStyle = '#2e3431'; c.beginPath(); c.ellipse(x, y - height * .1, height * .17, height * .14, -.08, Math.PI, 7); c.fill();
    c.fillStyle = index === 1 ? '#6d6960' : '#414943';
    c.beginPath(); c.moveTo(x - height * .23, y + height * .24); c.lineTo(x + height * .2, y + height * .24);
    c.lineTo(x + height * .29, y + height); c.lineTo(x - height * .3, y + height); c.closePath(); c.fill();
    c.strokeStyle = '#343b37'; c.lineWidth = height * .12;
    c.beginPath(); c.moveTo(x - height * .12, y + height); c.lineTo(x - height * .14, y + height * 1.55);
    c.moveTo(x + height * .12, y + height); c.lineTo(x + height * .16, y + height * 1.55); c.stroke();
  }
  c.strokeStyle = '#aca28e'; c.lineWidth = 6;
  c.beginPath(); c.moveTo(364, 234); c.lineTo(389, 239); c.stroke();
  if(index===0) {
    c.strokeStyle='#343b37';c.lineWidth=8;
    c.beginPath();c.moveTo(216,185);c.lineTo(189,152);c.stroke();
    c.fillStyle='#82755b';c.fillRect(273,210,39,23);
    c.strokeStyle='#b6a384';c.lineWidth=2;
    for(let i=0;i<5;i++){c.beginPath();c.moveTo(276+i*8,210);c.lineTo(276+i*8,233);c.stroke();}
  }
  const pixels = c.getImageData(22, 22, 468, 300);
  for (let i = 0; i < pixels.data.length; i += 4) {
    const n = (rng() - .5) * 23;
    for (let j = 0; j < 3; j++) pixels.data[i + j] += n;
  }
  c.putImageData(pixels, 22, 22);
  c.strokeStyle = '#d9d1b05a'; c.lineWidth = 1;
  for (let i = 0; i < 10; i++) { const x = 25 + rng() * 460; c.beginPath(); c.moveTo(x, 23); c.lineTo(x + 4, 320); c.stroke(); }
  c.restore();
  c.fillStyle = '#534d41'; c.font = '18px "Songti SC", serif';
  c.fillText(index === 0 ? '三号室 · 七月十三日 / 一个也不能少' : '回声公寓 · 最后一个夏天', 30, 355);
  const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearMipmapLinearFilter; texture.anisotropy = 8;
  photoTextures.set(index,texture);
  return texture;
}

export function buildWestWing(level, h) {
  const { box, mesh, cylinder, sign, lamp, desk, chair, shelf, closet, recordDocument, pickup } = h;
  const M = level.materials, D = level.detailMaterials, world = level.campaign;
  const y = 2.8, Y = 5.2;
  const red = stdMat({ color: 0x692b22, roughness: .7 });
  const black = stdMat({ color: 0x161c1b, roughness: .7, metalness: .25 });
  const chrome = stdMat({ color: 0x92958b, roughness: .34, metalness: .75 });
  const photo = stdMat({ map: familyPhotoTexture(), roughness: .68 });
  const archivePhoto = stdMat({ map: familyPhotoTexture(1), roughness: .8 });
  level.room(-30, -1, 54, 58, { y, h: 2.4, e: false, floorMat: M.tile, wallMat: M.plaster,
    gaps: { n: [[-26.5, -25], [-16.5, -15]] } });
  level.room(-30, -21, 40, 54, { y, h: 2.4, s: false, floorMat: M.tile, wallMat: M.concrete });
  level.room(-21, -10, 40, 54, { y, h: 2.4, s: false, w: false, floorMat: M.woodFloor,
    gaps: { n: [[-16.5, -15]] } });
  level.room(-30, -10, 28, 40, { y, h: 2.4, s: false, floorMat: M.woodFloor, wallMat: M.plaster });
  world.doors.west = level.makeDoor({ x: -1, z: 55, y, width: 1.6, dir: -1, offset: .11,
    label: '西翼封闭门', mat: D.paint, locked: true, lockedMsg: '钥匙藏在儿童房八音盒的夹层里。' });
  level.makeDoor({ x: -26.5, z: 54, y, along: 'x', width: 1.5, dir: 1, label: '红灯暗房', mat: D.paint });
  level.makeDoor({ x: -16.5, z: 54, y, along: 'x', width: 1.5, dir: 1, label: '204 摄影师旧居' });
  level.makeDoor({ x: -16.5, z: 40, y, along: 'x', width: 1.5, dir: 1, label: '住户纪念室' });
  sign(-.87, 54.4, 4.45, '西翼', ['204 / 暗房'], 'e', .55, true);
  sign(-25.75, 54.13, 4.4, '暗房', ['紅燈 / DARKROOM'], 'n', .7, true);
  sign(-15.75, 54.13, 4.4, '204', [], 'n', .48, true);
  sign(-15.75, 40.13, 4.4, '住户纪念室', [], 'n', 1.1, true);
  for (const x of [-4.5, -12, -21, -28]) lamp(x, 56, 5.03, 0xa8b3a0, 2.6, true);
  for (const z of [54.13, 57.87]) level._baseboardX(z, -29.8, -1.2, y, z < 55 ? [[-26.5, -25], [-16.5, -15]] : []);
  level._baseboard(-29.87, 54, 58, y);
  for (let i = 0; i < 5; i++) {
    const x = -7 - i * 4.5;
    level.decalWall(x, 57.87, 4.3, 1.0, .75, familyPhotoTexture(i % 2), 's');
    box(x, 57.9, 3.9, 1.1, .045, .045, M.darkWood);
  }
  sign(-29.86, 56, 4.25, '1998', ['没有人搬走', '只是停止回家'], 'e', 1.4);
  // 摄影师旧居：镜头、卷片器、皮革相机与成组接触印相。
  desk(-13.7, 43.1, y, 2.8); chair(-13.7, 44.3, y);
  const camera = box(-13.9, 43.1, 3.6, .4, .25, .23, black);
  cylinder(-13.9, 3.73, 43.29, .092, .22, chrome, 'z');
  cylinder(-13.9, 3.73, 43.415, .072, .03, D.darkGlass, 'z');
  box(-13.78, 43.07, 3.84, .07, .06, .04, chrome);
  box(-14.02, 43.06, 3.83, .14, .09, .09, black);
  const strap = mesh(new THREE.TorusGeometry(.26, .011, 6, 24, Math.PI), D.rubber, -13.9, 3.6, 43.1);
  strap.rotation.x = Math.PI / 2;
  level.regInteractable(camera, '查看摄影师的相机', 2.5, () => level.handlers.onDocument?.(16));
  recordDocument(16, -12.8, 43.1, 3.601, '204 摄影师的日记');
  const film = new THREE.Group(); film.position.set(-14.5, 3.65, 43.1);
  const can = new THREE.Mesh(new THREE.CylinderGeometry(.06, .06, .13, 20), black); film.add(can);
  const band = new THREE.Mesh(new THREE.CylinderGeometry(.061, .061, .067, 20), D.enamel); film.add(band);
  const tail = new THREE.Mesh(new THREE.PlaneGeometry(.08, .26), stdMat({color:0x634e30,side:THREE.DoubleSide}));
  tail.rotation.x = -Math.PI / 2; tail.position.set(.04, -.02, .12); film.add(tail);
  level.scene.add(film); pickup('film', film, '取走七月十三日的底片');
  shelf(-19.8, 43, y, 1.6); closet(-19.4, 52.8, y);
  box(-19, 48.5, y, 1.8, 2.8, .25, M.darkWood, true);
  box(-19, 48.5, 3.05, 1.7, 2.7, .16, M.quilt);
  box(-19, 47.6, 3.21, 1.0, .5, .11, M.pale);
  level._window(-10.14, 48, 4.22, 'w', { w: 1.8, h: 1.2 });
  lamp(-15.5, 47.2, 5.03, 0xc4a979, 2.5, true);
  for (let i = 0; i < 4; i++) level.decalWall(-20.86, 45 + i * 1.6, 4.15, .75, .55, familyPhotoTexture(i % 2), 'e');
  // 暗房：冲洗台有四只空心托盘，放大机有镜头、伸缩柱和底座。
  desk(-25.4, 42.4, y, 6.3);
  const trays = [];
  for (let i = 0; i < 4; i++) {
    const x = -27.7 + i * 1.5;
    const tray = box(x, 42.4, 3.61, 1.12, .68, .035, D.enamel);
    for (const dx of [-.56, .56]) box(x + dx, 42.4, 3.61, .035, .71, .11, D.enamel);
    for (const dz of [-.34, .34]) box(x, 42.4 + dz, 3.61, 1.15, .035, .11, D.enamel);
    const water = mesh(new THREE.PlaneGeometry(1.04, .61), stdMat({ color: i === 3 ? 0x415859 : 0x514c35,
      roughness: .25, metalness: .15 }), x, 3.659, 42.4); water.rotation.x = -Math.PI / 2;
    sign(x, 40.13, 4.35, ['显影', '定影', '停显', '水洗'][i], [], 'n', .7, true);
    level.regInteractable(tray, '冲洗全家福底片', 2.7, () => level.handlers.onPuzzle?.('develop')); trays.push(water);
  }
  world.photo = mesh(new THREE.PlaneGeometry(.32, .24), photo, -23.2, 3.67, 42.4);
  world.photo.rotation.x = -Math.PI / 2; world.photo.visible = false;
  level.regInteractable(world.photo, '查看洗出的全家福', 2.6, () => level.handlers.onDocument?.(14));
  desk(-28.5, 48.5, y, 1.6);
  box(-28.5, 48.5, 3.61, .72, .6, .08, black);
  cylinder(-28.5, 4.12, 48.7, .035, 1.05, chrome);
  box(-28.5, 48.48, 4.48, .43, .44, .21, black);
  cylinder(-28.5, 4.43, 48.48, .09, .15, chrome);
  recordDocument(13, -28.1, 48.5, 3.604, '暗房冲洗规程');
  shelf(-22, 51, y, 1.2);
  for (let i = 0; i < 8; i++) {
    cylinder(-29 + i * .85, 4.68, 40.9, .011, .2, chrome);
    const print = mesh(new THREE.PlaneGeometry(.5, .36), archivePhoto, -29 + i * .85, 4.42, 40.9);
    world.dynamics.push({ mesh: print, kind: 'print', phase: i });
    level.props.campaignDynamic.attach(print);
  }
  cylinder(-25.8, 4.79, 40.9, .012, 6.6, chrome, 'x');
  lamp(-25.7, 45.8, 5.03, 0xc6442c, 3.7, true);
  lamp(-28.8, 51.6, 5.03, 0xad4632, 1.8, true);
  sign(-29.86, 46, 4.26, '暗房', ['只开红灯', '照片会替你记得'], 'e', 1.4, true);
  // 纪念室：八张住户照片、四把椅子与一张刻意留空的桌子。
  for (let i = 0; i < 6; i++) {
    const x = -28 + i * 3;
    box(x, 28.15, 3.79, 1.38, .05, 1.05, M.darkWood);
    level.decalWall(x, 28.19, 4.32, 1.22, .91, familyPhotoTexture(i % 2), 'n');
  }
  for (const x of [-26, -22, -18, -14]) chair(x, 35.3, y);
  desk(-21, 31.1, y, 4.0);
  recordDocument(15, -21.9, 31.1, 3.604, '最后一册住户名簿');
  recordDocument(17, -19.6, 31.1, 3.604, '防水袋里的收据');
  const developer = new THREE.Group(); developer.position.set(-20.6, 3.79, 31.1);
  const bottle = new THREE.Mesh(new THREE.CylinderGeometry(.08, .085, .32, 20), stdMat({color:0x60563a,roughness:.4}));
  developer.add(bottle);
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(.052, .052, .055, 16), black); cap.position.y = .182; developer.add(cap);
  const label = new THREE.Mesh(new THREE.BoxGeometry(.14, .18, .143), D.enamel); developer.add(label);
  level.scene.add(developer); pickup('developer', developer, '取走密封的显影液');
  sign(-20, 28.14, 4.7, '一个也不能少', ['三号室 / 最后一个夏天'], 'n', 3.2);
  level._window(-29.86, 33.5, 4.22, 'e', { w: 2.5, h: 1.2 });
  lamp(-25, 33, 5.03, 0xc6ad87, 3.2);
  lamp(-15, 33, 5.03, 0xc6ad87, 3.0);
  level._battery(-28.2, 38, 2.85);
  // 墙裙、接线管、磨损和窗帘补齐生活空间的真实比例。
  for (const area of WEST_AREAS.slice(1)) {
    const [x0, z0, x1, z1] = area.bounds;
    level._baseboard(x0 + .13, z0 + .1, z1 - .1, y);
    level._baseboard(x1 - .13, z0 + .1, z1 - .1, y);
    level._baseboardX(z0 + .13, x0 + .1, x1 - .1, y, area.name.includes('204') ? [[-16.5, -15]] : []);
    if (z1 === 54) level._baseboardX(z1 - .13, x0 + .1, x1 - .1, y, [area.name.includes('暗房') ? [-26.5, -25] : [-16.5, -15]]);
  }
  for (const [x, z] of [[-29.84, 47], [-20.86, 50], [-29.84, 36]])
    level.decalWall(x, z, 3.4, .9, 1.1, level.tex.rust, 'e');
  // 布料褶皱用连续曲面，而不是一块长方体；窗外光只穿过中间的缝。
  for (const z of [46.6, 49.4]) {
    const geometry = new THREE.PlaneGeometry(1.15, 1.7, 18, 8);
    const positions = geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) positions.setZ(i, Math.sin(positions.getX(i) * 36) * .045);
    geometry.computeVertexNormals();
    const cloth = mesh(geometry, stdMat({color:0x656950,roughness:1,side:THREE.DoubleSide}), -10.35, 4.15, z);
    cloth.rotation.y = -Math.PI / 2;
    cylinder(-10.37, 5.02, z, .018, 1.3, chrome, 'z');
  }
  // 柔软接触阴影只覆盖家具脚底；没有逐帧阴影贴图的成本。
  const shadowCanvas = document.createElement('canvas'); shadowCanvas.width = shadowCanvas.height = 128;
  const sc = shadowCanvas.getContext('2d'), gradient = sc.createRadialGradient(64,64,5,64,64,64);
  gradient.addColorStop(0,'rgba(0,0,0,.52)'); gradient.addColorStop(1,'rgba(0,0,0,0)');
  sc.fillStyle = gradient; sc.fillRect(0,0,128,128);
  const shadow = new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(shadowCanvas),transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1});
  for (const [x,z,w,d] of [[-13.7,43.1,3.2,1.2],[-19,48.5,2.1,3.1],[-25.4,42.4,6.7,1.2],[-28.5,48.5,2,1.3],[-21,31.1,4.4,1.3],
    ...[-26,-22,-18,-14].map(x=>[x,35.3,.8,.9])]) {
    const plane = mesh(new THREE.PlaneGeometry(w,d),shadow,x,2.807,z); plane.rotation.x=-Math.PI/2;
  }
  for (const [x, z] of [[-3, 56], [-10, 56], [-18, 56], [-26, 56], [-25, 50], [-25, 45], [-16, 49], [-16, 43], [-16, 37], [-22, 35], [-27, 35]])
    level.monsterNodes.push({ x, y, z });
  world.trays = trays;
  world.westBuilt = true;
}
