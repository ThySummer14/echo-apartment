// smoke.mjs — headless runtime smoke test (no WebGL): builds the whole level,
// runs the monster AI for many frames, verifies geometry/collider sanity.
import * as THREE from './vendor/three.module.js';
import { createTextures, updateTVStatic } from './js/textures.js';
import { Level } from './js/level.js';
import { Monster, GhostGirl } from './js/monster.js';
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
check('doors == 9', level.doors.length === 9);
check('interactables >= 12', level.interactables.length >= 12);
check('fluorescents >= 30', level.fluorescents.length >= 30);
check('monster nodes > 25', level.monsterNodes.length > 25);

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
check('kitchen door opened', kd.angle > 1.5 && kd.collider === null);
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
for (let i = 0; i < 1200; i++) { mon.update(0.016, ctx); mon.tempLife = null; }
check('stalker closes in (z <= 22)', mon.pos.z <= 22);
check('stalker on ground', Math.abs(mon.pos.y) < 0.01);
check('stalker inside corridor bounds', Math.abs(mon.pos.x) < 2.4);

mon.spawn(new THREE.Vector3(0, 0, 20), 'chase');
for (let i = 0; i < 900; i++) mon.update(0.016, ctx);
check('chase reaches attack range', mon.state === 'attack' || mon.state === 'gone' || mon.state === 'dormant');
check('attack callback fired', attackCalled);
if (mon.state === 'attack') {
  for (let i = 0; i < 60; i++) mon.update(0.016, ctx);
  check('attack ends in gone state', mon.state === 'gone');
}

console.log('[6] monster climbs stairs (upper floor)');
mon.spawn(new THREE.Vector3(0, 0, 57), 'chase');
player.set(0, 2.8, 63);
for (let i = 0; i < 1500; i++) mon.update(0.016, ctx);
check('monster reached upper floor', mon.pos.y > 2.5);

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
    if (dist < 0.35) return true;
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

const p = { x: 0, y: 0, z: -1.35 };
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
  ['stairs east base', 0, 57.5],
  ['landing (upper floor)', 0, 62.3],
  ['landing east (to catwalk)', 0.75, 62.3],
  ['landing south edge', 0.75, 61.2],
  ['catwalk north end', 0.75, 60.6],
  ['catwalk south end', 0.75, 59.4],
  ['catwalk onto upper corridor', 0.75, 57.0],
  ['upper corridor to exit door', 0, 30.0],
  ['back west on upper', 0, 10],
  ['upper to west stairs', -0.75, 1.5],
  ['down the west stairs', -0.75, 0.3],
  ['stairs bottom', -0.75, 0.05],
  ['stairs fully down', -0.75, -0.9],
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

console.log(failures === 0 ? '\nSMOKE TEST PASSED' : `\nSMOKE TEST FAILED (${failures})`);
process.exit(failures === 0 ? 0 : 1);
