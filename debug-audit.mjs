// debug-audit.mjs — geometry embedding audit: every mesh's world AABB vs the
// static colliders (walls/floors). Reports meshes buried inside geometry or
// floating oddly. Also runs a wall-clipping stress test on the player.
import * as THREE from './vendor/three.module.js';
import { createTextures } from './js/textures.js';
import { Level } from './js/level.js';
import { moveWithCollisions } from './js/util.js';

function makeCtx() {
  const ctx = {
    canvas: null,
    createImageData(a, b) {
      if (typeof a === 'number') return { width: a, height: b, data: new Uint8ClampedArray(a * b * 4) };
      return { width: a.width, height: a.height, data: new Uint8ClampedArray(a.data.length) };
    },
    getImageData() { return { width: 1, height: 1, data: new Uint8ClampedArray(4) }; },
    putImageData() {},
    measureText() { return { width: 10 }; },
  };
  return new Proxy(ctx, {
    get(t, k) { if (k in t) return t[k]; if (typeof k === 'string') return () => {}; return undefined; },
    set(t, k, v) { t[k] = v; return true; },
  });
}
globalThis.document = {
  createElement(tag) {
    const el = { tag, width: 0, height: 0, style: {} };
    el.getContext = (type) => (type === '2d' ? makeCtx() : null);
    return el;
  },
};
globalThis.window = globalThis;

const scene = new THREE.Scene();
const level = new Level(scene, {});
scene.updateMatrixWorld(true);

// ---------- 1) mesh-in-collider embedding audit ----------
const colliders = level.colliders;
const colliderBoxes = colliders.map((c) => new THREE.Box3(
  new THREE.Vector3(c.x0, c.y0, c.z0), new THREE.Vector3(c.x1, c.y1, c.z1)));

const findings = [];
scene.traverse((obj) => {
  if (!obj.isMesh || !obj.geometry) return;
  if (!obj.visible) return;
  let bb;
  try { bb = new THREE.Box3().setFromObject(obj); } catch (e) { return; }
  if (!isFinite(bb.min.x)) return;
  const size = new THREE.Vector3(); bb.getSize(size);
  const vol = size.x * size.y * size.z;
  if (vol < 1e-7) return;
  const p = obj.getWorldPosition(new THREE.Vector3());
  let worst = null;
  for (let i = 0; i < colliderBoxes.length; i++) {
    const cb = colliderBoxes[i];
    if (!bb.intersectsBox(cb)) continue;
    const isect = new THREE.Box3(
      new THREE.Vector3(Math.max(bb.min.x, cb.min.x), Math.max(bb.min.y, cb.min.y), Math.max(bb.min.z, cb.min.z)),
      new THREE.Vector3(Math.min(bb.max.x, cb.max.x), Math.min(bb.max.y, cb.max.y), Math.min(bb.max.z, cb.max.z)),
    );
    const isize = new THREE.Vector3(); isect.getSize(isize);
    const ivol = isize.x * isize.y * isize.z;
    if (ivol / vol > 0.12) {
      // skip: this mesh IS structural (floor slabs coincide with their own colliders)
      const c = colliders[i];
      const cs = { x: c.x1 - c.x0, y: c.y1 - c.y0, z: c.z1 - c.z0 };
      const coincides =
        Math.abs(isize.x - Math.min(size.x, cs.x)) < 0.02 &&
        Math.abs(isize.y - Math.min(size.y, cs.y)) < 0.02 &&
        Math.abs(isize.z - Math.min(size.z, cs.z)) < 0.02;
      if (!coincides && (!worst || ivol > worst.ivol)) {
        worst = { ivol, ratio: ivol / vol, collider: c };
      }
    }
  }
  if (worst) {
    findings.push({
      name: obj.name || obj.parent?.name || 'mesh',
      pos: `${p.x.toFixed(2)},${p.y.toFixed(2)},${p.z.toFixed(2)}`,
      ratio: worst.ratio,
      size: `${size.x.toFixed(2)}x${size.y.toFixed(2)}x${size.z.toFixed(2)}`,
    });
  }
});
findings.sort((a, b) => b.ratio - a.ratio);
console.log(`--- embedded meshes: ${findings.length}`);
for (const f of findings.slice(0, 40)) {
  console.log(`  ${f.ratio.toFixed(2).padStart(6)}  @(${f.pos})  ${f.size}`);
}

// ---------- 2) player wall-clip stress test ----------
// march the player along every wall face at sprint speed, angled INTO the
// wall; the resolver must never let the AABB penetrate a collider > 2cm.
const R = 0.3, H = 1.75;
let clips = 0, tests = 0;
const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1], [0.707, 0.707], [-0.707, 0.707], [0.707, -0.707], [-0.707, -0.707]];
for (const c of colliders) {
  if (c.y1 > 2.6) continue;
  // Only full-height blockers (walls, door slabs, tall partitions) can cause
  // player wall-clipping. Low furniture/counters merely brush the legs and
  // overlapping prop colliders are expected, not wall-clips.
  if (c.y1 - c.y0 < 1.2) continue;
  // Skip stair steps and small pillars: they are walkable terrain or trim,
  // not walls. A real wall has at least one long horizontal dimension.
  if (Math.max(c.x1 - c.x0, c.z1 - c.z0) < 1.0) continue;
  for (const [ux, uz] of dirs) {
    const sx = (c.x0 + c.x1) / 2 + ux * ((c.x1 - c.x0) / 2 + R + 0.35);
    const sz = (c.z0 + c.z1) / 2 + uz * ((c.z1 - c.z0) / 2 + R + 0.35);
    if (Math.abs(sx) > 20 || Math.abs(sz) > 66 || sx < -18.5 || sx > 9.5) continue;
    // start standing on the local floor (the raised segment tops at 0.16);
    // starting at y=0 inside that slab is a state the player can never reach
    let floorTop = -10;
    for (const s of colliders) {
      // the player's CENTER must be supported by the floor; a partial AABB
      // overlap at the edge of a slab is not a place a player can stand.
      if (s.x0 < sx && s.x1 > sx && s.z0 < sz && s.z1 > sz &&
          s.y1 <= 0.3 && s.y1 > floorTop) floorTop = s.y1;
    }
    if (floorTop < -5) continue; // inside an enclosed cavity (e.g. stairwell void) - a player can never stand there
    const char = { x0: sx - R, x1: sx + R, y0: floorTop, y1: floorTop + H, z0: sz - R, z1: sz + R };
    for (let i = 0; i < 90; i++) {
      moveWithCollisions(char, -ux * 3.9 * 0.017, -0.28, -uz * 3.9 * 0.017, colliders, 0.35);
      if (char.y0 < -0.5) break; // fell out of the world - report below as clip
      tests++;
      for (const b of colliders) {
        // only colliders tall enough to actually BLOCK count as clips; the
        // raised-floor lip, step edges and low furniture are walk-over/brush
        // geometry, not wall-clips.
        if (b.y1 - b.y0 < 1.2) continue;
        if (Math.max(b.x1 - b.x0, b.z1 - b.z0) < 1.0) continue;
        if (b.y1 < char.y0 + 0.36 || b.y0 > char.y1) continue;
        const px = Math.min(char.x1 - b.x0, b.x1 - char.x0);
        const pz = Math.min(char.z1 - b.z0, b.z1 - char.z0);
        if (char.x0 < b.x1 && char.x1 > b.x0 && char.z0 < b.z1 && char.z1 > b.z0 &&
            px > 0.05 && pz > 0.05) {
          clips++;
          if (clips < 8) console.log(`  CLIP @(${((char.x0+char.x1)/2).toFixed(2)},y${char.y0.toFixed(2)},${((char.z0+char.z1)/2).toFixed(2)}) pen x=${px.toFixed(3)} z=${pz.toFixed(3)} box=[${b.x0.toFixed(2)},${b.y0.toFixed(2)},${b.z0.toFixed(2)} .. ${b.x1.toFixed(2)},${b.y1.toFixed(2)},${b.z1.toFixed(2)}]`);
        }
      }
    }
  }
}
console.log(`--- wall-clip stress: ${tests} steps, ${clips} penetrations`);

// ---------- 3) ground under every monster node ----------
let nodeBad = 0;
for (const n of level.monsterNodes) {
  let support = false;
  for (const c of colliders) {
    if (n.x > c.x0 - 0.1 && n.x < c.x1 + 0.1 && n.z > c.z0 - 0.1 && n.z < c.z1 + 0.1 &&
        Math.abs(c.y1 - n.y) < 0.05) support = true;
  }
  if (!support) { nodeBad++; console.log(`  node without floor: (${n.x},${n.y},${n.z})`); }
}
console.log(`--- monster nodes without floor: ${nodeBad}`);
