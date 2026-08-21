// util.js — shared helpers: seeded RNG, geometry builders with PS1 quirks,
// AABB collision, vertex-snap (vertex wobble) material modifier.
import * as THREE from 'three';

// ---------------- RNG ----------------
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export const rand = (a = 1, b) => (b === undefined ? Math.random() * a : a + Math.random() * (b - a));
export const chance = (p) => Math.random() < p;
export const pick = (arr) => arr[(Math.random() * arr.length) | 0];
export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const lerp = (a, b, t) => a + (b - a) * t;

// ---------------- AABB ----------------
// plain objects for speed: {x0,y0,z0,x1,y1,z1}
export function boxAABB(x, y, z, w, h, d) {
  const hw = w / 2, hh = h / 2, hd = d / 2;
  return { x0: x - hw, y0: y - hh, z0: z - hd, x1: x + hw, y1: y + hh, z1: z + hd };
}
export function aabbOverlap(a, b) {
  return a.x0 < b.x1 && a.x1 > b.x0 && a.y0 < b.y1 && a.y1 > b.y0 && a.z0 < b.z1 && a.z1 > b.z0;
}
export function aabbFromSphere(x, y, z, r, h) {
  return { x0: x - r, y0: y, z0: z - r, x1: x + r, y1: y + h, z1: z + r };
}

// Move a character AABB through a world of AABBs, axis by axis.
// char = {x0,y0,z0,x1,y1,z1} mutable; delta in meters; stepUp = max step height.
// opts.bodyHeight: effective blocking height above the feet (a hunched creature
// folds under low ceilings; only obstacles below feet+bodyHeight stop it).
export function moveWithCollisions(char, dx, dy, dz, colliders, stepUp = 0.35, opts = {}) {
  const foot = char.y0;
  const w = char.x1 - char.x0, d = char.z1 - char.z0;
  const bodyTop = foot + (opts.bodyHeight ?? (char.y1 - char.y0));
  let blockedXZ = false;
  let prevX0 = char.x0, prevX1 = char.x1, prevZ0 = char.z0, prevZ1 = char.z1;

  // does box b block horizontal movement at feet height (with step tolerance)?
  const blocks = (b) =>
    b.x0 < char.x1 && b.x1 > char.x0 && b.z0 < char.z1 && b.z1 > char.z0 &&
    b.y1 > foot + stepUp && b.y0 < bodyTop - 0.08;

  // Snapshot the blockers the character was already embedded in at the START
  // of this move. The post-move un-embed must only consider these: a wall
  // resolution can create a new, artificial overlap with trim/door frames that
  // sit just inside the room; letting those push back shoves the player into
  // the wall again (the "door frame eats the resolver" bug).
  const initialBlockers = [];
  for (const b of colliders) {
    if (b.x0 < char.x1 && b.x1 > char.x0 && b.z0 < char.z1 && b.z1 > char.z0 &&
        b.y1 > foot + stepUp && b.y0 < bodyTop - 0.08) initialBlockers.push(b);
  }

  // X
  if (dx !== 0) {
    prevX0 = char.x0; prevX1 = char.x1;
    char.x0 += dx; char.x1 += dx;
    for (const b of colliders) {
      if (blocks(b)) {
        // only resolve if this frame's move actually crossed the box face
        // (prevents snapping along long walls when overlapping on entry)
        if (dx > 0 && prevX1 <= b.x0 + 0.001) { char.x1 = b.x0 - 0.001; char.x0 = char.x1 - w; blockedXZ = true; }
        else if (dx < 0 && prevX0 >= b.x1 - 0.001) { char.x0 = b.x1 + 0.001; char.x1 = char.x0 + w; blockedXZ = true; }
      }
    }
  }
  // Z
  if (dz !== 0) {
    prevZ0 = char.z0; prevZ1 = char.z1;
    char.z0 += dz; char.z1 += dz;
    for (const b of colliders) {
      if (blocks(b)) {
        if (dz > 0 && prevZ1 <= b.z0 + 0.001) { char.z1 = b.z0 - 0.001; char.z0 = char.z1 - d; blockedXZ = true; }
        else if (dz < 0 && prevZ0 >= b.z1 - 0.001) { char.z0 = b.z1 + 0.001; char.z1 = char.z0 + d; blockedXZ = true; }
      }
    }
  }

  // Un-embed: a blocking box may appear while the character is already inside
  // it (a door closing on the player, a teleport landing in a tight spot, the
  // monster lunging). The face-cross checks above can never fire for an
  // already-embedded box, which used to let the character tunnel straight
  // through the wall/door. Only boxes THINNER than the character along an axis
  // (xw < w or zw < d) are candidates — those are the ones the character
  // actually spans across. Long walls are wider than the character in their
  // long axis and are never touched here, so walking along a wall stays smooth.
  for (const b of initialBlockers) {
    if (!blocks(b)) continue;
    const xw = b.x1 - b.x0, zw = b.z1 - b.z0;
    const xOv = Math.min(char.x1, b.x1) - Math.max(char.x0, b.x0);
    const zOv = Math.min(char.z1, b.z1) - Math.max(char.z0, b.z0);
    if (xOv > 0.001 && xw < w) {
      const penL = char.x1 - b.x0, penR = b.x1 - char.x0;
      const left = { x0: b.x0 - 0.001 - w, x1: b.x0 - 0.001, y0: char.y0, y1: char.y1, z0: char.z0, z1: char.z1 };
      const right = { x0: b.x1 + 0.001, x1: b.x1 + 0.001 + w, y0: char.y0, y1: char.y1, z0: char.z0, z1: char.z1 };
      const collides = (cand) => {
        for (const o of colliders) {
          if (o === b) continue;
          if (o.x0 < cand.x1 && o.x1 > cand.x0 && o.z0 < cand.z1 && o.z1 > cand.z0 &&
              o.y1 > cand.y0 + stepUp && o.y0 < cand.y0 + (cand.y1 - cand.y0) - 0.08) return true;
        }
        return false;
      };
      const badL = collides(left), badR = collides(right);
      // Prefer the escape direction that does not shove the character into
      // another wall (e.g. a low nightstand next to a wall: the short escape
      // points into the wall, the long one points into the room).
      if (badL && !badR) { char.x0 = right.x0; char.x1 = right.x1; }
      else if (badR && !badL) { char.x0 = left.x0; char.x1 = left.x1; }
      else if (penL <= penR) { char.x0 = left.x0; char.x1 = left.x1; }
      else { char.x0 = right.x0; char.x1 = right.x1; }
      blockedXZ = true;
      // Stop after the first un-embed. Resolving a wall can create a small,
      // artificial overlap with a door frame or trim that sits just inside the
      // room; letting that second collider push back would shove the player
      // straight through the wall again (the "door frame eats the resolver" bug).
      break;
    } else if (zOv > 0.001 && zw < d) {
      const penL = char.z1 - b.z0, penR = b.z1 - char.z0;
      const down = { x0: char.x0, x1: char.x1, y0: char.y0, y1: char.y1, z0: b.z0 - 0.001 - d, z1: b.z0 - 0.001 };
      const up = { x0: char.x0, x1: char.x1, y0: char.y0, y1: char.y1, z0: b.z1 + 0.001, z1: b.z1 + 0.001 + d };
      const collides = (cand) => {
        for (const o of colliders) {
          if (o === b) continue;
          if (o.x0 < cand.x1 && o.x1 > cand.x0 && o.z0 < cand.z1 && o.z1 > cand.z0 &&
              o.y1 > cand.y0 + stepUp && o.y0 < cand.y0 + (cand.y1 - cand.y0) - 0.08) return true;
        }
        return false;
      };
      const badD = collides(down), badU = collides(up);
      if (badD && !badU) { char.z0 = up.z0; char.z1 = up.z1; }
      else if (badU && !badD) { char.z0 = down.z0; char.z1 = down.z1; }
      else if (penL <= penR) { char.z0 = down.z0; char.z1 = down.z1; }
      else { char.z0 = up.z0; char.z1 = up.z1; }
      blockedXZ = true;
      break;
    }
  }

  // Y: support.
  // fpOverlap: the surface lies under any part of the character's footprint.
  // movingIn: this frame's move actually crossed the box's near face (both
  // the pre-move and post-move sides), which is what distinguishes climbing
  // onto a surface from merely brushing past it.
  const fpOverlap = (b) =>
    b.x0 < char.x1 && b.x1 > char.x0 && b.z0 < char.z1 && b.z1 > char.z0;
  const movingIn = (b) =>
    (dz > 0 && prevZ1 <= b.z0 + 0.001 && char.z1 > b.z0) ||
    (dz < 0 && prevZ0 >= b.z1 - 0.001 && char.z0 < b.z1) ||
    (dx > 0 && prevX1 <= b.x0 + 0.001 && char.x1 > b.x0) ||
    (dx < 0 && prevX0 >= b.x1 - 0.001 && char.x0 < b.x1);

  if (dy < 0) {
    const fallBottom = foot + dy;
    // 1) step-up onto a surface the character is actively pushing into
    let step = -Infinity;
    for (const b of colliders) {
      if (movingIn(b) && fpOverlap(b) && b.y1 <= foot + stepUp + 0.001 &&
          b.y1 > foot + 0.1 && b.y1 > step) step = b.y1;
    }
    if (step > -1e9) {
      char.y1 += step - foot;
      char.y0 = step;
      return { grounded: true, blocked: true };
    }
    // 2) stay/land: highest top within THIS frame's actual fall span
    // [fallBottom, foot+0.101]. Anchoring the lower bound to fallBottom
    // (instead of foot-0.001) means a character hovering slightly above a
    // surface — e.g. after stepping off a stair edge, or after a teleport
    // drop — still lands on it. With the old foot-0.001 bound, a large
    // per-frame fall could jump PAST the narrow window and fall through the
    // floor forever (the smoke-test "player back on entry floor" failure).
    // A grounded character never gets dragged down: its own support top is
    // always within the window, and lower surfaces lie below fallBottom.
    const low = fallBottom - 0.001;
    let land = -Infinity;
    for (const b of colliders) {
      if (fpOverlap(b) && b.y1 <= foot + 0.101 && b.y1 >= low && b.y1 > land) land = b.y1;
    }
    if (land > -1e9) {
      char.y1 += land - foot;
      char.y0 = land;
      return { grounded: true, blocked: true };
    }
    char.y0 += dy; char.y1 += dy;
    return { grounded: false, blocked: false };
  }
  char.y0 += dy; char.y1 += dy;
  let support = -Infinity;
  for (const b of colliders) {
    if (fpOverlap(b) && b.y1 <= foot + 0.101 && b.y1 > support) support = b.y1;
  }
  return { grounded: foot <= support + 0.001, blocked: false };
}

// ---------------- PS1 vertex snap ----------------
// Half-res snapping (320x180 at a 640x360 backbuffer) was a 2px vertex
// wobble on every wall and floor — combined with low-res textures it read as
// "wall moiré that moves when I turn". Full-res snapping keeps the retro
// low-poly step but halves the crawl, which is the biggest remaining shim.
const snapUniform = { value: new THREE.Vector2(640, 360) };
export function setSnapResolution(w, h) { snapUniform.value.set(w, h); }

const SNAP_DISABLED =
  typeof window !== 'undefined' && typeof location !== 'undefined' &&
  new URLSearchParams(location.search).has('nosnap');

export function applyPS1Snap(material) {
  if (!material || material.__ps1 || SNAP_DISABLED) return;
  material.__ps1 = true;
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uSnapRes = snapUniform;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nuniform vec2 uSnapRes;')
      .replace(
        '#include <project_vertex>',
        '#include <project_vertex>\n' +
        'gl_Position.xy = floor(gl_Position.xy * uSnapRes + 0.5) / uSnapRes;'
      );
  };
}

// ---------------- Box geometry with per-face UV + vertex AO ----------------
// Face order in BoxGeometry: +x, -x, +y, -y, +z, -z (4 verts each, 24 total).
const FACE_COUNT = { px: 0, nx: 1, py: 2, ny: 3, pz: 4, nz: 5 };

/**
 * Box with per-face UV repeat, vertex colors (fake AO), and vertex jitter.
 * opts: { uv: {px:[u,v], nx:.., py:.., ny:.., pz:.., nz:..} or scalar [u,v],
 *         jitter: 0..n (position noise), tone: base color multiplier,
 *         ao: 'wall' | 'floor' | 'none', aoStrength }
 */
export function makeBoxGeo(w, h, d, opts = {}) {
  const geo = new THREE.BoxGeometry(w, h, d);
  const pos = geo.attributes.position;
  const uv = geo.attributes.uv;
  const uvOpt = opts.uv || [1, 1];
  const perFace = !Array.isArray(uvOpt) || (uvOpt.length === 2 && typeof uvOpt[0] === 'string');
  const uvDefault = perFace ? [1, 1] : uvOpt;

  for (let f = 0; f < 6; f++) {
    const key = ['px', 'nx', 'py', 'ny', 'pz', 'nz'][f];
    const rep = perFace ? (uvOpt[key] || uvDefault) : uvDefault;
    for (let i = 0; i < 4; i++) {
      const idx = f * 4 + i;
      uv.setXY(idx, uv.getX(idx) * rep[0], uv.getY(idx) * rep[1]);
    }
  }

  const jit = opts.jitter || 0;
  if (jit > 0) {
    for (let i = 0; i < pos.count; i++) {
      pos.setXYZ(
        i,
        pos.getX(i) + rand(-jit, jit),
        pos.getY(i) + rand(-jit, jit),
        pos.getZ(i) + rand(-jit, jit)
      );
    }
  }

  // fake AO via vertex colors
  if (opts.ao && opts.ao !== 'none') {
    const colors = new Float32Array(pos.count * 3);
    const strength = opts.aoStrength ?? 0.85;
    const hw = w / 2, hh = h / 2, hd = d / 2;
    for (let i = 0; i < pos.count; i++) {
      // NOTE: positions were already jittered above, so a vertex can sit just
      // OUTSIDE the box (|y| > hh etc.). Every normalized coordinate below is
      // therefore clamped into [0,1] BEFORE any Math.pow — pow(negative, x)
      // returns NaN, and a NaN vertex color rasterizes as garbage white on
      // real GPUs (SwiftShader renders it black, which hid the bug in headless
      // screenshots). This was the "walls render as big white slabs" bug.
      const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
      let m = 1;
      if (opts.ao === 'wall') {
        const dy = clamp((y + hh) / h, 0, 1); // 0 bottom .. 1 top
        const e1 = (1 - clamp(Math.abs(x) / hw, 0, 1)) * 0.5 + (1 - clamp(Math.abs(z) / hd, 0, 1)) * 0.5; // distance from vertical edges
        // brightness profile across the wall height: darkest at the floor AND
        // the ceiling line, brightest mid-height. The old `pow(dy,0.35)` made
        // the TOP the brightest — combined with ceiling lights directly above,
        // the upper stretch of every wall blew out white.
        const dyc = Math.abs(dy - 0.5) * 2; // 0 at mid-height, 1 at top/bottom
        // wall tops must NOT hit full brightness under the ceiling lights (that
        // was the white-blob source) but should stay readable - 0.7 at the
        // top/bottom line, 1.0 at mid-height.
        m = clamp(0.70 + 0.30 * Math.pow(clamp(1 - dyc, 0, 1), 1.3), 0, 1) * clamp(0.45 + 0.55 * e1, 0, 1);
      } else if (opts.ao === 'floor' || opts.ao === 'ceil') {
        const ex = 1 - clamp(Math.abs(x) / hw, 0, 1), ez = 1 - clamp(Math.abs(z) / hd, 0, 1);
        const e = clamp(Math.min(ex, ez), 0, 1);
        m = clamp(0.5 + 0.5 * Math.pow(e, 1.6), 0, 1);
      }
      const n = 1 - rand(0, 0.10); // dirty variance
      let c = m * n * strength;
      if (!Number.isFinite(c)) c = strength; // last-ditch guard: never write NaN/Inf
      colors[i * 3] = c; colors[i * 3 + 1] = c; colors[i * 3 + 2] = c;
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  }

  geo.computeVertexNormals();
  return geo;
}

// ---------------- materials ----------------
export function stdMat(opts = {}) {
  const m = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: opts.roughness ?? 0.9,
    metalness: opts.metalness ?? 0.0,
    flatShading: opts.flat ?? false,
  });
  if (opts.map) m.map = opts.map;
  if (opts.vertexColors) m.vertexColors = true;
  if (opts.emissive) { m.emissive = opts.emissive; m.emissiveIntensity = opts.emissiveIntensity ?? 1; }
  if (opts.transparent) { m.transparent = true; m.opacity = opts.opacity ?? 1; }
  if (opts.depthWrite === false) m.depthWrite = false;
  if (opts.side) m.side = opts.side;
  if (opts.ps1 !== false) applyPS1Snap(m);
  return m;
}

export function basicMat(opts = {}) {
  const m = new THREE.MeshBasicMaterial({
    color: opts.color ?? 0xffffff,
    map: opts.map ?? null,
    transparent: !!opts.transparent,
    opacity: opts.opacity ?? 1,
  });
  if (opts.vertexColors) m.vertexColors = true;
  if (opts.depthWrite === false) m.depthWrite = false;
  if (opts.side) m.side = opts.side;
  if (opts.ps1 !== false) applyPS1Snap(m);
  return m;
}

// ---------------- misc ----------------
export function makePlane(w, h, map, opts = {}) {
  const geo = new THREE.PlaneGeometry(w, h);
  if (opts.jitter) {
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      pos.setXYZ(i, pos.getX(i) + rand(-opts.jitter, opts.jitter), pos.getY(i) + rand(-opts.jitter, opts.jitter), pos.getZ(i));
    }
  }
  const m = opts.emissive
    ? new THREE.MeshBasicMaterial({ map, transparent: opts.transparent ?? false, opacity: opts.opacity ?? 1, side: opts.side ?? THREE.FrontSide })
    : stdMat({ map, roughness: opts.roughness ?? 0.9, flat: opts.flat ?? false, transparent: opts.transparent, opacity: opts.opacity, vertexColors: opts.vertexColors });
  if (opts.ps1 !== false) applyPS1Snap(m);
  const mesh = new THREE.Mesh(geo, m);
  if (opts.emissive) mesh.material.color.setScalar(opts.emissiveColor ?? 1);
  return mesh;
}

export function dispose(obj) {
  obj.traverse((o) => {
    if (o.geometry) o.geometry.dispose();
    if (o.material) {
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      mats.forEach((mm) => { mm.map?.dispose(); mm.dispose(); });
    }
  });
}
