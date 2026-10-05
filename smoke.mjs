// smoke.mjs — headless runtime smoke test (no WebGL): builds the whole level,
// runs the monster AI for many frames, verifies geometry/collider sanity.
import * as THREE from './vendor/three.module.js';
import { createTextures, updateTVStatic, fillNoise } from './js/textures.js';
import { Level } from './js/level.js';
import { Monster, GhostGirl } from './js/monster.js';
import { moveWithCollisions } from './js/util.js';
import { stairRoute, stairPoint } from './js/stairs.js';

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

// ---------- run ----------
let failures = 0;
const check = (name, cond) => {
  console.log(cond ? `  ok  ${name}` : `  FAIL ${name}`);
  if (!cond) failures++;
};

console.log('[1] textures');
const colorSample = { width: 2, height: 1, data: new Uint8ClampedArray([10, 20, 30, 255, 0, 40, 50, 255]) };
fillNoise(colorSample, () => 0.5, { amp: 0, base: colorSample.data.slice() });
check('texture noise preserves RGB channels including a black red channel',
  colorSample.data[0] === 10 && colorSample.data[4] === 0 && colorSample.data[5] === 40);
const tex = createTextures();
check('texture count >= 24', Object.keys(tex).length >= 24);
const tvVer = tex.tvStatic.version;
updateTVStatic(tex.tvStatic);
check('tv static update bumps source version', tex.tvStatic.version === tvVer + 1);

console.log('[2] level build');
const scene = new THREE.Scene();
const handlers = {};
const level = new Level(scene, handlers);
check('colliders > 150', level.colliders.length > 150);
check('original and campaign doors exist', ['厨房的门', '地下维修门', '排水间铁门', '201 管理室', '202 留守住户', '203 放映室'].every((name) => level.doors.some((door) => door.label === name)));
check('interactables >= 12', level.interactables.length >= 12);
check('fluorescents >= 30', level.fluorescents.length >= 30);
check('monster nodes > 25', level.monsterNodes.length > 25);
check('dark wood preserves its intended colour', level.materials.darkWood.color.getHex() === 0x3a2a1c);
let joinsContinuous=true, corridorJoinsContinuous=true, headroomClear=true;
const supportedPoint=(point,top)=>level.colliders.some(c=>Math.abs(c.y1-top)<.001&&
  point.x>=c.x0-1e-6&&point.x<=c.x1+1e-6&&point.z>=c.z0-1e-6&&point.z<=c.z1+1e-6);
for(const stair of level.stairs) {
  for(let storey=1;storey<=stair.storeys;storey++) {
    const top=stair.base+storey*stair.rise,lane=(stair.width+stair.gap)/2;
    // 使用小于旧地板缝隙的点采样；玩家宽碰撞体不能掩盖悬空接缝。
    for(let v=-.08;v<=.08;v+=.004) {
      const point=stairPoint(stair,lane,v,top);
      joinsContinuous=joinsContinuous&&supportedPoint(point,top);
    }
  }
  for(let storey=0;storey<=stair.storeys;storey++) {
    if(stair.base<0?storey===0:storey===stair.storeys)continue;
    const top=stair.base+storey*stair.rise;
    for(let delta=-.08;delta<=.08;delta+=.004)
      corridorJoinsContinuous=corridorJoinsContinuous&&supportedPoint(stairPoint(stair,0,-stair.frontDepth+delta,top),top);
  }
  for(const point of stair.path) {
    const ceilings=level.colliders.filter(c=>c.stairPart!=='guard'&&c.stairPart!=='column'&&c.y0>point.y+.02&&
      point.x>c.x0&&point.x<c.x1&&point.z>c.z0&&point.z<c.z1);
    headroomClear=headroomClear&&ceilings.every(c=>c.y0-point.y>=2.3);
    headroomClear=headroomClear&&level.ceilings.filter(c=>c.y>point.y+.02&&
      point.x>c.x0&&point.x<c.x1&&point.z>c.z0&&point.z<c.z1).every(c=>c.y-point.y>=2.3);
  }
}
check('last treads join floor landings without a gap at either stairwell',joinsContinuous);
check('floor landings join apartment corridors without a gap',corridorJoinsContinuous);
check('stair flights and landings retain at least 2.3m headroom',headroomClear);

let bad = 0;
for (const c of level.colliders) {
  if (!(c.x0 < c.x1 && c.y0 < c.y1 && c.z0 < c.z1)) { bad++; if (bad < 5) console.log('   degenerate AABB', c); }
}
check('no degenerate AABBs', bad === 0);

// playerStart must be inside entry, not inside a collider
const ps = level.playerStart;
let stuck = 0;
for (const c of level.colliders) {
  if (ps.x > c.x0 + 0.05 && ps.x < c.x1 - 0.05 && ps.z > c.z0 + 0.05 && ps.z < c.z1 - 0.05 &&
      c.y0 < 1.7 && c.y1 > 0.05) stuck++;
}
check('playerStart not embedded in geometry', stuck === 0);
if (stuck) {
  for (const c of level.colliders) {
    if (ps.x > c.x0 + 0.05 && ps.x < c.x1 - 0.05 && ps.z > c.z0 + 0.05 && ps.z < c.z1 - 0.05 &&
        c.y0 < 1.7 && c.y1 > 0.05) console.log('  embedding collider', c);
  }
}

console.log('[2b] door slab orientation (closed slabs must lie in the wall plane)');
{
  let doorBad = 0;
  for (const d of level.doors) {
    d.pivot.updateWorldMatrix(true, true);
    const bb = new THREE.Box3().setFromObject(d.slab);
    const sx = bb.max.x - bb.min.x, sz = bb.max.z - bb.min.z;
    // along='z' doors live in walls running along Z -> slab must be thin in X and span the opening in Z;
    // along='x' doors are the opposite.
    const ok = d.along === 'z'
      ? (sx < 0.25 && sz > d.width * 0.8)
      : (sz < 0.25 && sx > d.width * 0.8);
    if (!ok) { doorBad++; console.log(`   misaligned door "${d.label}" along=${d.along} sx=${sx.toFixed(2)} sz=${sz.toFixed(2)}`); }
  }
  check('all closed door slabs lie in their wall plane', doorBad === 0);
}

console.log('[2c] fall-through regression (hovering character must land)');
{
  // a character hovering slightly above a surface (0.068m, as happens when
  // stepping off a stair edge) must still land when a LARGE per-frame fall
  // occurs (the smoke settle loop uses dy=-0.5; it used to jump past the
  // landing window and fall through the floor forever)
  const c = { x0: -0.3, x1: 0.3, y0: 0.068, y1: 0.068 + 1.75, z0: -0.7, z1: -0.1 };
  const res = moveWithCollisions(c, 0, -0.5, 0, level.colliders, 0.35);
  check('hovering char lands on the floor after a big fall step', res.grounded && Math.abs(c.y0) < 0.011);
  const c2 = { x0: -0.3, x1: 0.3, y0: 0.068, y1: 0.068 + 1.75, z0: -0.7, z1: -0.1 };
  let landed2 = false;
  for (let i = 0; i < 20 && !landed2; i++) {
    const r2 = moveWithCollisions(c2, 0, -0.05, 0, level.colliders, 0.35);
    landed2 = r2.grounded;
  }
  check('hovering char lands with small fall steps (no floor clip)', landed2 && Math.abs(c2.y0) < 0.011);
}

console.log('[3] door animation');
level.updateDoors(0.016);
const kd = level.doors.find((d) => d.label === '厨房的门');
kd.target = 1;
for (let i = 0; i < 200; i++) level.updateDoors(0.016);
check('open kitchen door retains collision at its actual slab', kd.angle > 1.5 && kd.collider !== null);
kd.target = 0;
for (let i = 0; i < 200; i++) level.updateDoors(0.016);
check('kitchen door closed again', kd.angle < 0.02 && kd.collider !== null);

console.log('[4] level.update');
level.update(0.016, 2.5);
for (const f of level.fluorescents) {
  if (f.mode === 'dead') check('dead light stays off', f.light.intensity === 0);
}
check('candles flicker', level.candles.every((c) => c.light.intensity > 0.1));

console.log('[5] monster stalk + chase');
const mon = new Monster(scene, level.tex);
const player = new THREE.Vector3(0, 0, 10);
const lookDir = new THREE.Vector3(0, 0, 1);
let attackCalled = false;
const fakeAudio = { whisper() {}, moan() {}, thud() {}, sting() {}, doorOpen() {}, duck() {}, heartbeat() {} };
const gameStub = {
  onMonsterAttack() { attackCalled = true; },
  onMonsterAttackEnd() {},
  onChaseStart() {},
  level,
};
const ctx = {
  player, lookDir, flashHit: false, time: 1,
  colliders: level.colliders, doors: level.doors,
  nodes: level.monsterNodes, audio: fakeAudio, game: gameStub,
};

mon.spawn(new THREE.Vector3(0, 0, 30), 'stalk');
// 玩家回头看入口（-z）时，怪物才应该趁视线之外靠近。
lookDir.set(0, 0, -1);
for (let i = 0; i < 1200; i++) { mon.update(0.016, ctx); mon.tempLife = null; }
check('stalker closes in (z <= 22)', mon.pos.z <= 22);
check('stalker on ground', Math.abs(mon.pos.y) < 0.01);
check('stalker inside corridor bounds', Math.abs(mon.pos.x) < 2.4);

mon.spawn(new THREE.Vector3(0, 0, 20), 'chase');
lookDir.set(0, 0, 1);
for (let i = 0; i < 900; i++) mon.update(0.016, ctx);
check('chase reaches attack range', mon.state === 'attack' || mon.state === 'gone' || mon.state === 'dormant');
check('attack callback fired', attackCalled);
if (mon.state === 'attack') {
  for (let i = 0; i < 60; i++) mon.update(0.016, ctx);
  check('attack ends in gone state', mon.state === 'gone');
}

console.log('[6] monster follows the switchback staircase');
ctx.stairs = level.stairs;
mon.spawn(new THREE.Vector3(0, 0, 62.6), 'chase');
player.set(0, 2.8, 60.5);
for (let i = 0; i < 1500; i++) mon.update(0.016, ctx);
if (mon.pos.y <= 2.5) console.log('  monster stair position:', mon.pos, 'state:', mon.state);
check('monster reached upper floor', mon.pos.y > 2.5);
mon.spawn(new THREE.Vector3(0,2.8,62.6),'chase');player.set(0,0,60.5);
for(let i=0;i<1500;i++)mon.update(.016,ctx);
check('monster follows the same switchback down to the first floor',Math.abs(mon.pos.y)<.05);

console.log('[7] ghost');
const ghost = new GhostGirl(scene);
ghost.appearAt(0, 0, 5, 0);
for (let i = 0; i < 300; i++) ghost.update(0.016, player);
check('ghost faded out', !ghost.group.visible);

console.log('[8] temp appearance');
mon.spawn(new THREE.Vector3(0, 0, 40), 'stalk');
mon.tempLife = 0.5;
for (let i = 0; i < 100; i++) mon.update(0.016, ctx);
check('temp monster despawned', mon.state === 'dormant' && !mon.group.visible);

console.log('[9] player walkthrough of the whole level');
// open all non-locked doors so the player can traverse freely
for (const d of level.doors) if (!d.locked) level.forceOpen(d);

function dynColliders() {
  const arr = level.colliders.slice(0);
  for (const d of level.doors) if (d.collider) arr.push(d.collider);
  return arr;
}

function walkTo(target, maxFrames = 2400) {
  let vy = 0;
  const char = { x0: p.x - 0.3, x1: p.x + 0.3, y0: p.y, y1: p.y + 1.75, z0: p.z - 0.3, z1: p.z + 0.3 };
  for (let i = 0; i < maxFrames; i++) {
    level.updateDoors(0.016);
    const dx = target.x - p.x, dz = target.z - p.z;
    const dist = Math.hypot(dx, dz);
    if (dist < 0.085) return true;
    const step = Math.min(dist, 2.7 * 0.016);
    char.x0 = p.x - 0.3; char.x1 = p.x + 0.3;
    char.z0 = p.z - 0.3; char.z1 = p.z + 0.3;
    char.y0 = p.y; char.y1 = p.y + 1.75;
    vy -= 22 * 0.016;
    const res = moveWithCollisions(char, (dx / dist) * step, vy * 0.016, (dz / dist) * step, dynColliders(), 0.35);
    if (res.grounded) vy = 0;
    p.x = (char.x0 + char.x1) / 2;
    p.z = (char.z0 + char.z1) / 2;
    p.y = char.y0;
  }
  return false;
}

const p = { ...level.playerStart };
const flightRoute = (stair, direction = 1) => stairRoute(stair, 0, direction)
  .map((point,i)=>['stair waypoint '+i,point.x,point.z]);
const mainStair = level.stairs[0], serviceStair = level.stairs[1];
const route = [
  ['corridor to kitchen door', 0, 3.8],
  ['kitchen interior', -2.6, 3.8],
  ['back to corridor', 0, 4.6],
  ['living door', 0, 10.6],
  ['living interior', -2.6, 10.6],
  ['fusuma doorway', -8.6, 12.8],
  ['bedroom', -11.5, 12.6],
  ['wardrobe approach', -13.4, 14.3],
  ['bedroom wardrobe', -14.0, 14.3],
  ['wardrobe interior', -14.2, 14.3],
  ['passage entry', -14.9, 14.3],
  ['passage south', -15.65, 14.4],
  ['gap cross', -15.65, 14.9],
  ['bathroom', -15.5, 17.5],
  ['gap cross back', -15.65, 14.9],
  ['passage south back', -15.65, 14.4],
  ['passage back', -14.9, 14.3],
  ['through wardrobe', -14.0, 14.3],
  ['bedroom east', -9.0, 12.8],
  ['living to corridor', 0, 10.6],
  ['altar door', 0, 3.6],
  ['altar interior', 2.6, 3.6],
  ['altar doorway', 0.9, 3.6],
  ['back to corridor', 0, 4.6],
  ['child room door', 0, 10.6],
  ['child interior', 2.6, 10.6],
  ['child to corridor', 0, 10.6],
  ['corridor east', 0, 20],
  ['past the bicycle', 0.6, 21.5],
  ['stair lobby', 0, 62.5],
  ['switchback start', 0, 62.95],
  ...flightRoute(mainStair),
  ['second floor landing', 0, 62.5],
  ['upper corridor to exit door', 0, 30.0],
  ['upper west end', 0, 1.0],
  ['return to the same stair', 0, 62.5],
  ['switchback descent start', 0, 62.95],
  ...flightRoute(mainStair, -1),
  ['first floor landing', 0, 62.5],
  ['entry', 0, -1.2],
];
let allOk = true;
for (const [name, x, z] of route) {
  const ok = walkTo({ x, z });
  if (!ok) console.log(`  FAIL route: ${name} (ended at ${p.x.toFixed(1)}, ${p.y.toFixed(2)}, ${p.z.toFixed(1)})`);
  allOk = allOk && ok;
}
// let gravity settle at the final position
for (let i = 0; i < 240; i++) {
  const char = { x0: p.x - 0.3, x1: p.x + 0.3, y0: p.y, y1: p.y + 1.75, z0: p.z - 0.3, z1: p.z + 0.3 };
  moveWithCollisions(char, 0, -0.5, 0, dynColliders(), 0.35);
  p.y = char.y0;
  if (Math.abs(p.y - 0) < 0.011) break;
}
check('player reaches every waypoint', allOk);
check('player back on entry floor (y=0)', Math.abs(p.y) < 0.02);

console.log('[9b] reverse on the intermediate landing');
p.x=0;p.y=0;p.z=62.95;
const halfRoute=flightRoute(mainStair).slice(0,12);
let reversed=true;
for(const [,x,z] of halfRoute)reversed=walkTo({x,z})&&reversed;
check('half-landing rises exactly half a storey',Math.abs(p.y-1.4)<.05);
for(const [,x,z] of halfRoute.slice(0,-1).reverse())reversed=walkTo({x,z})&&reversed;
reversed=walkTo({x:0,z:62.5})&&reversed;
check('can return from the half-landing without falling or getting stuck',reversed&&Math.abs(p.y)<.05);

console.log('[10] basement and expanded upstairs walkthrough');
p.x = level.playerStart.x; p.y = level.playerStart.y; p.z = level.playerStart.z;
for (const door of level.doors) {
  door.locked = false;
  level.forceOpen(door);
}
const expansionRoute = [
  ['service doorway approach', 0.6, 20.5],
  ['service landing', 3.8, 20.5],
  ['service stair start', 3.35, 20.5],
  ...flightRoute(serviceStair, -1),
  ['basement service landing', 3.2, 20.5],
  ['basement perimeter west', 3.2, 23.8],
  ['basement perimeter south', 10.5, 24.2],
  ['basement stair doorway', 11.3, 20.5],
  ['downstairs to basement', 13.3, 20.5],
  ['power cabinet approach', 17.1, 16],
  ['basement central aisle', 17.5, 21.7],
  ['through pump door', 21.6, 21.7],
  ['valve panel approach', 22.3, 26.5],
  ['pump door return', 21.5, 21.7],
  ['power room return', 18, 21.7],
  ['basement stair base', 13.3, 20.5],
  ['basement doorway return', 11.3, 20.5],
  ['basement south return', 10.5, 24.2],
  ['basement west return', 3.2, 23.8],
  ['basement landing return', 3.2, 20.5],
  ['service stair ascent start', 3.35, 20.5],
  ...flightRoute(serviceStair),
  ['upstairs to service landing', 3.8, 20.5],
  ['main hall return', 0.6, 20.5],
  ['main switchback entry', 0, 62.5],
  ['main switchback start', 0, 62.95],
  ...flightRoute(mainStair),
  ['upper landing', 0, 62.5],
  ['202 doorway approach', 0, 46.7],
  ['202 room enter', 2.7, 46.7],
  ['202 tape table approach', 4.1, 50.6],
  ['202 return', 2.7, 46.7],
  ['202 corridor', 0, 46.7],
  ['203 doorway approach', 0, 40.7],
  ['203 room enter', -2.7, 40.7],
  ['203 recorder approach', -6.5, 42.5],
  ['203 return', -2.7, 40.7],
  ['203 corridor', 0, 40.7],
  ['201 doorway approach', 0, 20.7],
  ['201 enter', -2.8, 20.7],
  ['201 safe approach', -6.1, 23.5],
  ['201 return', -2.8, 20.7],
  ['201 corridor', 0, 20.7],
  ['courtyard doorway', 0, 30.6],
  ['courtyard enter', 3.2, 30.6],
];
let expandedOk = true;
for (const [name, x, z] of expansionRoute) {
  const ok = walkTo({ x, z });
  if (!ok) console.log('  FAIL expanded route: ' + name + ' @ ' +
    [p.x, p.y, p.z].map((value) => value.toFixed(2)).join(','));
  expandedOk = expandedOk && ok;
  if (name === 'downstairs to basement') check('basement is reached at y=-2.8', Math.abs(p.y + 2.8) < .05);
  if (name === 'upstairs to service landing') check('basement stairs can be climbed back', Math.abs(p.y) < .05);
}
check('expanded rooms and courtyard are physically reachable', expandedOk);
check('courtyard stays on the second floor', Math.abs(p.y - 2.8) < .05);

console.log('[11] rooftop, reversal and east wing walkthrough');
const sceneRoute = [
  ['courtyard return', 0, 30.6], ['upper stair lobby', 0, 62.5], ['second flight start', 0, 62.95],
  ...flightRoute(mainStair), ['roof landing', 0, 62.4], ['roof front left', -3, 62.4],
  ['roof side entry', -6, 62.4], ['roof terrace', -6, 76], ['roof central terrace', 0, 76],
  ['roof letter approach', 0.4, 80.4], ['roof bench return', 0, 76], ['roof side return', -6, 76],
  ['roof front return', -6, 62.4], ['roof landing return', 0, 62.4], ['roof stair return', 0, 62.95],
  ...flightRoute(mainStair, -1), ['second floor return landing', 0, 62.5], ['continue down stair', 0, 62.95],
  ...flightRoute(mainStair, -1), ['ground floor return landing', 0, 62.5], ['east corridor entrance', 0, 44],
  ['east wing entry', 4.5, 44], ['laundry doorway', 9.75, 44], ['laundry enter', 9.75, 40.9],
  ['laundry machines', 11.5, 35.5], ['laundry side aisle', 12.4, 40.9], ['laundry return', 9.75, 40.9], ['laundry corridor', 9.75, 44],
  ['104 doorway', 10.75, 44], ['104 entry', 10.75, 47.3], ['104 desk approach', 9, 52.4],
  ['104 return', 10.75, 47.3], ['east hallway return', 10.75, 44], ['workshop doorway', 23.75, 44],
  ['workshop entry', 23.75, 40.9], ['workshop handwheel approach', 24.2, 35.2],
  ['workshop return', 23.75, 40.9], ['east corridor return', 23.75, 44], ['main hall return', 0, 44],
];
let sceneOk = true;
for (const [name, x, z] of sceneRoute) {
  const ok = walkTo({ x, z });
  if (!ok) console.log('  FAIL scene route: ' + name + ' @ ' + [p.x, p.y, p.z].map(v => v.toFixed(2)).join(','));
  sceneOk = sceneOk && ok;
  if (name === 'roof landing') check('switchback reaches rooftop y=5.6', Math.abs(p.y - 5.6) < .05);
  if (name === 'ground floor return landing') check('same switchback returns all the way to 1F', Math.abs(p.y) < .05);
}
check('rooftop and east wing are reachable and reversible', sceneOk);

console.log('[12] west wing investigation route and return');
const westRoute = [
  ['stair lobby',0,62.5], ['stair start',0,62.95], ...flightRoute(mainStair),
  ['upper landing',0,62.5], ['west doorway approach',0,55.8], ['west entrance',-3,55.8],
  ['204 approach',-15.75,56], ['204 doorway',-15.75,52.5], ['film table',-14.5,44.5],
  ['memorial doorway',-15.75,40.2], ['memorial enter',-15.75,37.8], ['memorial aisle',-21,37.8],
  ['developer table',-20.6,32.5], ['memorial return aisle',-21,37.8], ['memorial return door',-15.75,37.8],
  ['204 return',-15.75,42], ['204 return hallway',-15.75,56], ['darkroom approach',-25.75,56],
  ['darkroom doorway',-25.75,52.5], ['darkroom centre',-25.4,47], ['wash trays',-25.4,43.8],
  ['darkroom procedure',-28.1,47], ['darkroom return',-25.75,52.5], ['darkroom hallway',-25.75,56],
  ['west return',-3,55.8], ['main hall return',0,55.8],
];
let westOk = true;
for (const [name,x,z] of westRoute) {
  const ok = walkTo({x,z});
  if (!ok) console.log('  FAIL west route: '+name+' @ '+[p.x,p.y,p.z].map(v=>v.toFixed(2)).join(','));
  westOk = westOk && ok;
}
check('all west rooms and puzzle surfaces are reachable through their doors',westOk);
check('west wing returns to the actual second floor without dropping',Math.abs(p.y-2.8)<.05);

console.log('[13] basement annex loop, puzzle approaches and return');
p.x=13.3;p.y=-2.8;p.z=20.5;
const annexRoute=[
 ['old utility aisle',16.6,20.5],['old utility rear',16.6,26],['annex threshold',16.6,28.5],
 ['annex gallery',16.6,31],['annex junction',24,31],['watch portal',24,38.8],['watch enter',20,38.8],
 ['watch centre',17,38.8],['watch log',13.7,36.5],['watch return',17,38.8],
 ['watch archive door',16.8,43.5],['archive threshold',16.8,45.6],['archive aisle',15.9,45.6],
 ['archive middle',15.9,50],['fuse approach',20.3,49.8],['fuse cabinet bypass',19.3,49.8],
 ['fuse cabinet return aisle',19.3,52.8],['archive portal approach',20.3,52.8],
 ['archive corridor',24,52.8],['archive return portal',20.3,52.8],['archive east aisle',15.9,53.3],
 ['archive chair bypass',15.9,54.4],['archive table side',13.7,54.4],['archive ledger',13.7,53.3],
 ['archive table return',13.7,54.4],['archive aisle return',15.9,54.4],['archive south aisle',15.9,56.7],
 ['radio hinge bypass',16.8,56.7],
 ['radio doorway',16.8,58.3],['radio threshold',16.8,60.3],['radio approach',14.3,64],
 ['radio side return',17,63.8],['radio portal',20.5,63.8],['radio corridor',24,63.8],
 ['cistern corridor',24,56.8],['cistern entry',28.5,56.8],['cistern story wall',27.6,61],
 ['cistern southwest',29,64.8],['cistern southeast',43.2,64.8],['cistern northeast',43.2,49.2],
 ['cistern north aisle',34.8,49.2],['generator back entry',34.8,45.5],['generator side',34.8,41],
 ['generator control approach',31.4,35.2],['generator gallery doorway',34.8,35],
 ['generator gallery',34.8,31],['annex return',16.6,31],['old utility return',16.6,26],
 ['old utility front return',16.6,20.5],['old basement return',13.3,20.5],
];
let annexOk=true;
for(const [name,x,z] of annexRoute){const ok=walkTo({x,z});if(!ok)console.log('  FAIL annex route: '+name+' @ '+[p.x,p.y,p.z].map(v=>v.toFixed(2)).join(','));annexOk=ok&&annexOk;}
check('new underground loop reaches all puzzle surfaces and returns through the real entrance',annexOk);
check('annex remains on the basement slab throughout the loop',Math.abs(p.y+2.8)<.05);

console.log('[11] geometry attributes and exit retrigger');
let invalidAttributes = 0;
let invalidMaterials = 0;
scene.traverse((mesh) => {
  if (!mesh.isMesh) return;
  for (const name of ['position', 'color', 'normal']) {
    const attribute = mesh.geometry?.attributes[name];
    if (attribute && Array.from(attribute.array).some((value) => !Number.isFinite(value))) invalidAttributes++;
  }
  for (const material of Array.isArray(mesh.material) ? mesh.material : [mesh.material]) {
    for (const color of [material.color, material.emissive]) {
      if (color !== undefined && (!color.isColor ||
          ![color.r, color.g, color.b].every(Number.isFinite))) invalidMaterials++;
    }
  }
});
check('new and existing geometry contain no NaN or Infinity', invalidAttributes === 0);
check('all material and emission colours are finite THREE.Color values', invalidMaterials === 0);
let exitCalls = 0;
level.handlers.zone_exitVoid = () => exitCalls++;
level.exitDoor.open = false;
level.checkTriggers({ x: 3.2, y: 2.8, z: 30.6 });
check('locked exit does not finish the game', exitCalls === 0);
level.exitDoor.open = true;
level.checkTriggers({ x: 3.2, y: 2.8, z: 30.6 });
level.checkTriggers({ x: 3.2, y: 2.8, z: 30.6 });
check('return from ending chooser does not immediately reopen it', exitCalls === 1);
level.checkTriggers({ x: 0, y: 2.8, z: 30.6 });
level.checkTriggers({ x: 3.2, y: 2.8, z: 30.6 });
check('exit remains usable after a prior locked visit', exitCalls === 2);

console.log(failures === 0 ? '\nSMOKE TEST PASSED' : `\nSMOKE TEST FAILED (${failures})`);
process.exit(failures === 0 ? 0 : 1);
