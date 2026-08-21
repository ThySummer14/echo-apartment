// level.js — the abandoned apartment: geometry, colliders, doors, lights,
// props, pickups and trigger zones. All coordinates in meters.
// North = -x, South = +x, East = +z.
import * as THREE from 'three';
import { createTextures } from './textures.js';
import {
  makeBoxGeo, stdMat, basicMat, boxAABB, rand, mulberry32, clamp,
} from './util.js';

const WALL_T = 0.2;      // wall thickness
const CORR_H = 2.7;      // corridor wall height
const DOOR_H = 2.05;     // door height
const DOOR_W = 1.16;     // door width

export class Level {
  constructor(scene, handlers = {}) {
    this.scene = scene;
    this.handlers = handlers;
    this.tex = createTextures();
    this.rng = mulberry32(20260814);

    this.colliders = [];       // static AABBs
    this.doors = [];          // dynamic doors
    this.interactables = [];  // {mesh, label, action, dist, once}
    this.triggers = [];       // {aabb, id}
    this.fluorescents = [];   // {light, base, mode, phase, seed}
    this.candles = [];
    this.tvLight = null;
    this.windowLights = [];
    this.notePickups = [];
    this.props = {};
    this.monsterNodes = [];
    this.ghostSpawns = [];
    this.ofudas = [];
    this.playerStart = new THREE.Vector3(0, 0, -1.35);

    this.materials = this._makeMaterials();
    this._build();
    this._buildDoors();
    this._buildProps();
    this._buildDecals();
    this._buildLights();
    this._buildNodes();
  }

  // ---------------------------------------------------------------- materials
  _makeMaterials() {
    const t = this.tex;
    return {
      plaster: stdMat({ map: t.plaster, vertexColors: true }),
      wallpaper: stdMat({ map: t.wallpaper, vertexColors: true }),
      woodWall: stdMat({ map: t.woodWall, vertexColors: true }),
      woodDoor: stdMat({ map: t.woodDoor, roughness: 0.8 }),
      // rough 0.42 + metal 0.18 made the floor a mirror: on a real GPU every
      // light painted a moving specular blob on it (one of the "white patch"
      // reports). Old worn boards are matte.
      woodFloor: stdMat({ map: t.woodFloor, vertexColors: true, roughness: 0.72, metalness: 0.04 }),
      tatami: stdMat({ map: t.tatami, vertexColors: true, roughness: 0.85 }),
      ceiling: stdMat({ map: t.ceiling, vertexColors: true, roughness: 1 }),
      concrete: stdMat({ map: t.concrete, vertexColors: true }),
      rust: stdMat({ map: t.rust, roughness: 0.68, metalness: 0.12 }),
      fusuma: stdMat({ map: t.fusuma, roughness: 0.9 }),
      quilt: stdMat({ map: t.quilt, roughness: 0.95 }),
      brick: stdMat({ map: t.brick, vertexColors: true }),
      darkMetal: stdMat({ color: 0x15181c, roughness: 0.45, metalness: 0.3 }),
      black: stdMat({ color: 0x0b0d10, roughness: 0.9 }),
      pale: stdMat({ color: 0xd6cfc0, roughness: 0.85 }),
      darkWood: stdMat({ color: 0x3a2a1c, roughness: 0.75 }),
      waterDark: stdMat({ color: 0x0d1a14, roughness: 0.15, metalness: 0.25 }),
      moonWin: basicMat({ map: t.windowMoon }),
      tvScreen: basicMat({ map: t.tvStatic }),
      exitSign: basicMat({ map: t.exitSign }),
      ofuda: stdMat({ map: t.ofuda, side: THREE.DoubleSide }),
      photo: stdMat({ map: t.photo, roughness: 0.85 }),
      porcelain: stdMat({ color: 0xc4c8c0, roughness: 0.45 }),
      clothRed: stdMat({ color: 0x6e2a22, roughness: 0.95 }),
      whiteMetal: stdMat({ color: 0x9aa0a4, roughness: 0.68, metalness: 0.08 }),
      tile: stdMat({ map: t.tile, vertexColors: true, roughness: 0.72 }),
      mailbox: stdMat({ map: t.mailbox, roughness: 0.6, metalness: 0.3 }),
    };
  }

  // ---------------------------------------------------------------- builders
  box(x, z, y, w, d, h, mat, opts = {}) {
    const geo = makeBoxGeo(w, h, d, opts.geo || {});
    const mesh = new THREE.Mesh(geo, opts.material || mat);
    mesh.position.set(x, y + h / 2, z);
    mesh.castShadow = opts.cast ?? true;
    mesh.receiveShadow = opts.receive ?? true;
    this.scene.add(mesh);
    // boxAABB takes the CENTER; y here is the bottom of the box
    if (opts.collide !== false) this.colliders.push(boxAABB(x, y + h / 2, z, w, h, d));
    return mesh;
  }

  // wall running along z (fixed x), y bottom, gaps along z
  wallX(x, z0, z1, y, h, mat, gaps = [], opts = {}) {
    const segs = [];
    let a = z0;
    for (const [g0, g1] of [...gaps].sort((p, q) => p[0] - q[0])) {
      if (g0 > a) segs.push([a, g0]);
      a = Math.max(a, g1);
    }
    if (a < z1) segs.push([a, z1]);
    for (const [s0, s1] of segs) {
      const len = s1 - s0;
      this.box(x, (s0 + s1) / 2, y, WALL_T, len, h, mat, {
        geo: { uv: [len / 2.6, h / 2.6], ao: 'wall', aoStrength: opts.ao ?? 0.85, jitter: 0.012 },
        collide: opts.collide ?? true,
      });
    }
  }

  // wall running along x (fixed z), y bottom, gaps along x
  wallZ(z, x0, x1, y, h, mat, gaps = [], opts = {}) {
    const segs = [];
    let a = x0;
    for (const [g0, g1] of [...gaps].sort((p, q) => p[0] - q[0])) {
      if (g0 > a) segs.push([a, g0]);
      a = Math.max(a, g1);
    }
    if (a < x1) segs.push([a, x1]);
    for (const [s0, s1] of segs) {
      const len = s1 - s0;
      this.box((s0 + s1) / 2, z, y, len, WALL_T, h, mat, {
        geo: { uv: [len / 2.6, h / 2.6], ao: 'wall', aoStrength: opts.ao ?? 0.85, jitter: 0.012 },
        collide: opts.collide ?? true,
      });
    }
  }

  floor(x, z, w, d, yTop, mat, uv) {
    return this.box(x, z, yTop - 0.12, w, d, 0.12, mat, {
      geo: { uv: uv || [w / 3, d / 3], ao: 'floor', aoStrength: 0.9 },
    });
  }

  ceil(x, z, w, d, yBottom, mat) {
    return this.box(x, z, yBottom, w, d, 0.12, mat, {
      geo: { uv: [w / 3, d / 3], ao: 'ceil', aoStrength: 0.95 },
      cast: false,
      collide: false,
    });
  }

  // room shell: floor + ceiling (+ walls via flags)
  room(x0, x1, z0, z1, opts = {}) {
    const M = this.materials;
    const h = opts.h ?? CORR_H;
    const y = opts.y ?? 0;
    this.floor((x0 + x1) / 2, (z0 + z1) / 2, x1 - x0 + 0.2, z1 - z0 + 0.2, y,
      opts.floorMat || M.woodFloor, opts.floorUV);
    this.ceil((x0 + x1) / 2, (z0 + z1) / 2, x1 - x0 + 0.2, z1 - z0 + 0.2, y + h,
      opts.ceilMat || M.ceiling);
    const wallMat = opts.wallMat || M.plaster;
    if (opts.walls !== false) {
      if (opts.n !== false) this.wallZ(z0, x0, x1, y, h, wallMat, opts.gaps?.n || [], { ao: opts.ao });
      if (opts.s !== false) this.wallZ(z1, x0, x1, y, h, wallMat, opts.gaps?.s || [], { ao: opts.ao });
      if (opts.w !== false) this.wallX(x0, z0, z1, y, h, wallMat, opts.gaps?.w || [], { ao: opts.ao });
      if (opts.e !== false) this.wallX(x1, z0, z1, y, h, wallMat, opts.gaps?.e || [], { ao: opts.ao });
    }
  }

  decalFloor(x, z, w, h, tex, rotY = 0, y = 0.012, lit = true) {
    const geo = new THREE.PlaneGeometry(w, h);
    geo.rotateX(-Math.PI / 2);
    // lit by default: unlit decals (newspapers, rug, photos) glowed at full
    // texture brightness in the dark, reading as floating white patches.
    // `lit=false` keeps scare-critical decals (silhouette) visible in darkness.
    const m = lit
      ? stdMat({ map: tex, transparent: true, depthWrite: false, roughness: 0.92 })
      : basicMat({ map: tex, transparent: true, depthWrite: false });
    m.polygonOffset = true;
    m.polygonOffsetFactor = -3;
    m.polygonOffsetUnits = -3;
    const mesh = new THREE.Mesh(geo, m);
    mesh.position.set(x, y, z);
    // the geometry was already rotated flat (rotateX(-PI/2)); spinning it must
    // happen around the world Y axis. rotation.z used to tilt the decal up out
    // of the floor - blood spatter and newspapers stood at random angles like
    // fins stuck into the ground.
    mesh.rotation.y = rotY;
    mesh.renderOrder = 2;
    mesh.receiveShadow = false;
    this.scene.add(mesh);
    return mesh;
  }

  // face: 'n' plane faces +z, 's' faces -z, 'e' faces +x, 'w' faces -x
  decalWall(x, z, y, w, h, tex, face, rotY = 0, lit = true) {
    const geo = new THREE.PlaneGeometry(w, h);
    const m = lit
      ? stdMat({ map: tex, transparent: true, depthWrite: false, roughness: 0.92 })
      : basicMat({ map: tex, transparent: true, depthWrite: false });
    m.polygonOffset = true;
    m.polygonOffsetFactor = -3;
    m.polygonOffsetUnits = -3;
    const mesh = new THREE.Mesh(geo, m);
    const eps = 0.015;
    if (face === 'n') mesh.position.set(x, y, z - eps);
    if (face === 's') { mesh.position.set(x, y, z + eps); mesh.rotation.y = Math.PI; }
    if (face === 'e') { mesh.position.set(x + eps, y, z); mesh.rotation.y = Math.PI / 2; }
    if (face === 'w') { mesh.position.set(x - eps, y, z); mesh.rotation.y = -Math.PI / 2; }
    if (rotY) mesh.rotateY(rotY);
    mesh.renderOrder = 2;
    mesh.receiveShadow = false;
    this.scene.add(mesh);
    return mesh;
  }

  // ---------------------------------------------------------------- main build
  _build() {
    const M = this.materials;

    // ===== main corridor =====
    // north wall: kitchen door (3.2-4.4), living door (10.0-11.2), dead door (48.6-49.8),
    // plus a doorless bulge at z 20..24 (spatial anomaly)
    this.wallX(-1.2, 0, 8, 0, CORR_H, M.plaster, [[3.2, 4.4]]);
    this.wallX(-1.2, 8, 20, 0, CORR_H, M.plaster, [[10.0, 11.2]]);
    this.wallX(-1.35, 20, 24, 0, CORR_H, M.plaster, []);
    // Long corridor (z 32..58) is widened to 2.8m inner (wall centers ±1.5)
    // so the main hallway does not feel like a coffin. The room-lined stretch
    // (z 0..24/32) stays at the old 2.2m width.
    this.wallX(-1.2, 24, 32, 0, CORR_H, M.plaster, []);
    this.wallX(-1.5, 32, 58, 0, CORR_H, M.plaster, [[48.6, 49.8]]);
    // south wall: altar door (3.0-4.2), child door (10.0-11.2)
    this.wallX(1.2, 0, 32, 0, CORR_H, M.plaster, [[3.0, 4.2], [10.0, 11.2]]);
    this.wallX(1.5, 32, 58, 0, CORR_H, M.plaster, []);
    // jog walls closing the width transitions
    this.wallZ(20, -1.35, -1.2, 0, CORR_H, M.plaster);
    this.wallZ(24, -1.35, -1.2, 0, CORR_H, M.plaster);
    this.wallZ(32, -1.5, -1.2, 0, CORR_H, M.plaster);
    this.wallZ(32, 1.2, 1.5, 0, CORR_H, M.plaster);
    this.wallZ(58, -1.5, -1.2, 0, CORR_H, M.plaster);
    this.wallZ(58, 1.2, 1.5, 0, CORR_H, M.plaster);
    // stairwell end wall (below landing)
    this.wallZ(61, -1.2, 1.2, 0, 2.8, M.concrete);

    // floors: entry (concrete), normal + raised anomaly segment
    this.floor(0, -1, 2.4, 2, 0, M.concrete);             // z -2..0
    this.floor(0, 12, 2.7, 24, 0, M.woodFloor);          // z 0..24 (covers north bulge)
    this.floor(0, 28, 2.4, 8, 0.16, M.woodFloor);        // z 24..32 raised
    this.box(0, 24, 0, 2.4, 0.24, 0.16, M.plaster, { geo: { ao: 'floor' } }); // step lip
    this.floor(0, 45, 3.0, 26, 0, M.woodFloor);          // z 32..58 (widened corridor)
    // ceilings (main corridor): the west stairwell opens upward as a dark shaft
    this.ceil(0, 12.8, 2.7, 22.4, 2.7, M.ceiling);           // z 1.6..24 (covers north bulge)
    this.ceil(0.45, 0.8, 1.5, 1.6, 2.7, M.ceiling);          // passage z 0..1.6 (south of stairs)
    this.ceil(0, 28, 2.4, 8, 2.7, M.ceiling);                // lower ceiling over raised floor (anomaly)
    this.ceil(0, 45, 3.0, 26, 2.7, M.ceiling);

    // ===== east stairs (z 58..61, rise 2.8) =====
    // 1.8 wide (x -0.9..0.9), matching the UPPER corridor's inner width: the
    // upper walls (±1.0) overhung the old 2.4-wide stairs, so a climber hugging
    // the rail clipped their head into the wall above the stairwell.
    for (let i = 0; i < 10; i++) {
      this.box(0, 58 + i * 0.3 + 0.15, 0, 1.8, 0.3, 0.28 * (i + 1), M.concrete, { geo: { ao: 'none' } });
    }
    this.wallX(-1.2, 58, 61, 0, 2.8, M.concrete);
    this.wallX(1.2, 58, 61, 0, 2.8, M.concrete);

    // ===== upper floor (y 2.8) =====
    // floor has two stair openings: east (z 58..61, x -1.0..0.5 - the stairs
    // must NOT sit under the slab, or the climber's head clips into it) and
    // west notch (z 1.6..1.9, x -1.0..-0.3) so the stairwells have headroom.
    // The right strip (x 0.5..1.0) is bridged by a catwalk above the stairwell.
    const UY = 2.8, UH = 2.4;
    this.floor(0.35, 29.8, 1.3, 56.4, UY, M.woodFloor);      // z 1.6..58, x -0.3..1.0
    this.floor(-0.65, 29.95, 0.7, 56.1, UY, M.woodFloor);    // z 1.9..58, x -1.0..-0.3
    this.floor(0, 62.1, 2.0, 2.2, UY, M.woodFloor);          // landing z 61..63.2
    this.floor(0.75, 59.5, 0.5, 3.0, UY, M.woodFloor);       // catwalk across the stairwell opening (z 58..61)
    this.ceil(0, 32.4, 2.0, 61.6, UY + UH, M.ceiling);
    this.wallX(-1.0, 1.6, 63.2, UY, UH, M.plaster);
    this.wallX(1.0, 1.6, 63.2, UY, UH, M.plaster, [[30.0, 31.2]]); // exit door gap
    // west-end jogs closing the stair well (stairs are 2.4 wide, upper is 2.0)
    this.wallZ(1.6, -1.2, -1.0, UY, UH, M.concrete);
    this.wallZ(1.6, 1.0, 1.2, UY, UH, M.concrete);
    this.box(-1.1, 62.1, UY, 0.2, 2.2, UH, M.concrete);  // landing strips
    this.box(1.1, 62.1, UY, 0.2, 2.2, UH, M.concrete);
    this.box(-0.75, 0.8, 5.2, 0.9, 1.6, 0.12, M.concrete, { geo: { ao: 'ceil' } }); // west shaft cap

    // ===== west stairs (side staircase along the north wall, z 0..1.6) =====
    // corridor squeezes along the south side (anomaly: the hallway dips past the stairs)
    for (let i = 0; i < 10; i++) {
      this.box(-0.75, 0.16 * i + 0.08, 0, 0.9, 0.16, 0.28 * (i + 1), M.concrete, { geo: { ao: 'none' } });
    }
    // entry walls + ceiling (the stairwell side stays open as a shaft)
    this.wallX(-1.2, -2, 0, 0, CORR_H, M.concrete);
    this.wallX(1.2, -2, 0, 0, CORR_H, M.concrete);
    this.ceil(0.45, -1, 1.5, 2, 2.7, M.ceiling);
    // entry end wall (front door side)
    this.wallZ(-2, -1.2, 1.2, 0, CORR_H, M.plaster, [[-0.58, 0.58]]);
    // shoe shelf nook
    this.box(-0.95, -1.5, 0, 0.3, 0.7, 1.0, M.darkWood, { geo: { ao: 'wall' } });

    // ===== rooms: north wing =====
    // kitchen  x -8.4..-1.3, z 0..7.5
    this.room(-8.4, -1.3, 0, 7.5, { n: true, w: true, s: true, e: false, wallMat: M.wallpaper });
    // living   x -8.4..-1.3, z 7.5..15.5
    this.room(-8.4, -1.3, 7.5, 15.5, { n: true, w: true, s: false, e: false, wallMat: M.wallpaper, gaps: { w: [[12.2, 13.4]] } });
    // bedroom  x -13.8..-8.4, z 7.5..15.5 (wardrobe gap on west wall)
    this.room(-13.8, -8.4, 7.5, 15.5, { n: true, w: true, s: true, e: false, wallMat: M.plaster, gaps: { w: [[13.8, 14.8]] } });
    // wardrobe passage x -16.4..-14.6, z 13.8..14.8 (low ceiling 2.2)
    this.room(-16.4, -14.6, 13.8, 14.8, { n: true, w: true, s: false, e: false, wallMat: M.concrete, h: 2.2 });
    // bathroom  x -17.6..-13.8, z 14.8..21 (e wall only above bedroom's wall, z 15.5+)
    this.room(-17.6, -13.8, 14.8, 21, { n: false, w: true, s: true, e: false, wallMat: M.concrete, floorMat: M.tile, floorUV: [5, 8] });
    this.wallX(-13.8, 15.5, 21, 0, CORR_H, M.concrete, []);
    // shared wall between passage and bathroom (gap at the west end, clear of the wardrobe frame)
    this.wallZ(14.8, -17.6, -13.8, 0, CORR_H, M.concrete, [[-16.3, -15.0]]);

    // ===== rooms: south wing =====
    // altar    x 1.3..8.4, z 0..8.5 (tatami)
    this.room(1.3, 8.4, 0, 8.5, { n: true, w: false, s: true, e: true, floorMat: M.tatami, floorUV: [9.5, 4.7], wallMat: M.woodWall });
    // child    x 1.3..8.4, z 8.5..15.5
    this.room(1.3, 8.4, 8.5, 15.5, { n: true, w: false, s: false, e: true, wallMat: M.wallpaper });

    this._buildTrim();
    this._buildDetailProps();
  }

  // ---------------------------------------------------------------- detail pass
  // second modeling pass: wainscots, cushions, small clutter - the props that
  // make rooms read as lived-in instead of box prototypes
  _buildDetailProps() {
    const M = this.materials;
    const t = this.tex;
    const rng = this.rng;

    // ---------- bathroom: tiled wainscot (bottom 1.3m of every wall) ----------
    // thin tile panels mounted proud of each wall's inner face
    const tilePanelZ = (x0, x1, z, face) => {
      const len = x1 - x0;
      this.box((x0 + x1) / 2, z + (face === 's' ? 0.008 : -0.008), 0, len, 0.016, 1.3, M.tile, {
        geo: { uv: [len / 0.6, 1.3 / 0.6], ao: 'wall' }, collide: false, cast: false,
      });
    };
    const tilePanelX = (z0, z1, x, face) => {
      const len = z1 - z0;
      this.box(x + (face === 'e' ? 0.008 : -0.008), (z0 + z1) / 2, 0, 0.016, len, 1.3, M.tile, {
        geo: { uv: [len / 0.6, 1.3 / 0.6], ao: 'wall' }, collide: false, cast: false,
      });
    };
    tilePanelX(14.92, 20.88, -17.5, 'w');   // west wall inner face x=-17.5
    tilePanelZ(-17.48, -13.92, 20.9, 's');  // south wall inner face z=20.9
    tilePanelX(15.6, 20.88, -13.9, 'e');    // east wall bathroom face x=-13.9
    // north wall (passage side, z=14.9) has the secret gap at x -16.3..-15.0
    // (wardrobe passage entrance) - tile around it, never across it
    tilePanelZ(-17.48, -16.32, 14.9, 'n');
    tilePanelZ(-14.98, -13.92, 14.9, 'n');
    // a dirty shower curtain rail over the tub (no cloth - it was removed)
    const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 1.5, 6), M.darkMetal);
    rail.rotation.z = Math.PI / 2;
    rail.position.set(-15.8, 1.95, 19.9);
    this.scene.add(rail);

    // ---------- entry: mailboxes, umbrella stand ----------
    // apartment mailboxes on the entry end wall (inner face z=-1.9, beside the
    // locked front door). Room 3's name tag is blurred beyond reading.
    this.box(0.92, -1.892, 1.15, 1.04, 0.018, 0.52, M.mailbox, { geo: { uv: [1, 1], ao: 'wall' }, collide: false, cast: false });
    // umbrella stand in the corner + two closed umbrellas
    const ub = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.09, 0.5, 8, 1, true),
      stdMat({ color: 0x4a3f36, roughness: 0.9, side: THREE.DoubleSide }));
    ub.position.set(-0.98, 0.25, -0.45);
    this.scene.add(ub);
    for (const [ux, uz, rot] of [[-1.02, -0.48, 0.16], [-0.95, -0.42, -0.12]]) {
      const um = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.012, 0.86, 6),
        stdMat({ color: 0x2c2c30, roughness: 0.7 }));
      um.position.set(ux, 0.44, uz);
      um.rotation.z = rot;
      this.scene.add(um);
    }
    this.colliders.push(boxAABB(-0.98, 0.25, -0.45, 0.24, 0.5, 0.24));

    // ---------- living room: couch cushions + throw blanket ----------
    // seat frame: x -6.0..-3.6, top y 0.42, z 11.625..12.375; backrest front
    // face z 12.5. Cushions sit ON the seat and LEAN on the backrest.
    for (let i = 0; i < 3; i++) {
      const cx = -5.55 + i * 0.78;
      this.box(cx, 12.0, 0.42, 0.72, 0.62, 0.1, stdMat({ color: 0x453f33, roughness: 0.95 }), {
        geo: { ao: 'none', jitter: 0.008 }, collide: false, cast: false,
      });
      this.box(cx, 12.42, 0.52, 0.7, 0.15, 0.4, stdMat({ color: 0x403a2f, roughness: 0.95 }), {
        geo: { ao: 'none', jitter: 0.008 }, collide: false, cast: false,
      });
    }
    // rumpled throw blanket over one seat
    const blanket = this.box(-5.0, 11.98, 0.52, 0.7, 0.6, 0.05, M.quilt, {
      geo: { ao: 'none', jitter: 0.02, uv: [1.5, 1] }, collide: false, cast: false,
    });
    blanket.rotation.z = 0.08;
    blanket.rotation.x = 0.05;

    // ---------- bedroom: second pillow + folded blanket on the futon ----------
    // futon spans x -11.6..-9.8, z 11.725..12.875, top y 0.24
    this.box(-9.9, 12.55, 0.24, 0.34, 0.24, 0.07, M.pale, { geo: { ao: 'none' }, collide: false, cast: false });
    const fblank = this.box(-10.55, 12.3, 0.24, 0.5, 1.0, 0.07, M.quilt, {
      geo: { ao: 'none', jitter: 0.015, uv: [1, 2] }, collide: false, cast: false,
    });
    fblank.rotation.y = 0.04;

    // ---------- kitchen: backsplash + hanging pans ----------
    // tile strip on the kitchen-side face (z=7.4) of the south wall, above the counter
    this.box(-6.2, 7.392, 0.98, 3.4, 0.016, 0.6, M.tile, {
      geo: { uv: [3.4 / 0.6, 1], ao: 'wall' }, collide: false, cast: false,
    });
    this.box(-3.4, 7.392, 0.98, 0.95, 0.016, 0.6, M.tile, {
      geo: { uv: [1.6, 1], ao: 'wall' }, collide: false, cast: false,
    });
    // two pans hanging from hooks under the wall shelf (x -7.55..-5.85, y 1.72)
    for (const [px2, pz2] of [[-6.9, 6.6], [-6.55, 6.62]]) {
      const hook = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.14, 4), M.darkMetal);
      hook.position.set(px2, 1.65, pz2);
      this.scene.add(hook);
      const pan = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 0.035, 10, 1, true),
        stdMat({ color: 0x3a3d42, roughness: 0.55, metalness: 0.2, side: THREE.DoubleSide }));
      pan.position.set(px2, 1.56, pz2);
      this.scene.add(pan);
    }

    // ---------- child room: small table + chair ----------
    this.box(3.1, 12.8, 0, 0.55, 0.55, 0.04, M.darkWood, { geo: { ao: 'none' }, collide: false, cast: false });
    for (const [lx, lz] of [[2.87, 12.57], [3.33, 12.57], [2.87, 13.03], [3.33, 13.03]]) {
      this.box(lx, lz, 0, 0.04, 0.04, 0.3, M.darkWood, { geo: { ao: 'none' }, collide: false, cast: false });
    }
    this.box(3.1, 13.35, 0, 0.3, 0.3, 0.04, M.darkWood, { geo: { ao: 'none' }, collide: false, cast: false });
    this.box(3.1, 13.35, 0.04, 0.04, 0.04, 0.26, M.darkWood, { geo: { ao: 'none' }, collide: false, cast: false });
    this.box(3.1, 13.48, 0.04, 0.3, 0.03, 0.3, M.darkWood, { geo: { ao: 'none' }, collide: false, cast: false });
    // a few crayons on the table
    for (let i = 0; i < 3; i++) {
      const cr = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.08, 5),
        stdMat({ color: [0xc03030, 0x3060c0, 0x30a040][i], roughness: 0.8 }));
      cr.rotation.z = Math.PI / 2;
      cr.rotation.y = rng() * 3;
      cr.position.set(2.95 + i * 0.12, 0.045, 12.7 + rng() * 0.2);
      this.scene.add(cr);
    }
  }

  // ---------------------------------------------------------------- trim
  _baseboard(x, z0, z1, y, gaps = []) {
    let a = z0;
    for (const [g0, g1] of [...gaps].sort((p, q) => p[0] - q[0])) {
      if (g0 > a) this._baseSegZ(x, a, Math.min(g0, z1), y);
      a = Math.max(a, g1);
    }
    if (a < z1) this._baseSegZ(x, a, z1, y);
  }

  _baseSegZ(x, z0, z1, y) {
    const M = this.materials;
    const seg = 8;
    for (let z = z0; z < z1; z += seg) {
      const len = Math.min(seg, z1 - z);
      this.box(x, z + len / 2, y, 0.03, len, 0.14, M.darkWood, {
        geo: { ao: 'wall', uv: [len / 2, 0.2] }, collide: false, cast: false,
      });
    }
  }

  _baseboardX(z, x0, x1, y, gaps = []) {
    let a = x0;
    for (const [g0, g1] of [...gaps].sort((p, q) => p[0] - q[0])) {
      if (g0 > a) this._baseSegX(z, a, Math.min(g0, x1), y);
      a = Math.max(a, g1);
    }
    if (a < x1) this._baseSegX(z, a, x1, y);
  }

  _baseSegX(z, x0, x1, y) {
    const M = this.materials;
    const seg = 8;
    for (let x = x0; x < x1; x += seg) {
      const len = Math.min(seg, x1 - x);
      this.box(x + len / 2, z, y, len, 0.03, 0.14, M.darkWood, {
        geo: { ao: 'wall', uv: [len / 2, 0.2] }, collide: false, cast: false,
      });
    }
  }

  _wainscot(x, z0, z1, y = 0.15, h = 0.85) {
    const M = this.materials;
    const seg = 8;
    for (let z = z0; z < z1; z += seg) {
      const len = Math.min(seg, z1 - z);
      this.box(x, z + len / 2, y, 0.025, len, h, M.woodWall, {
        geo: { ao: 'wall', uv: [len / 2, h / 2] }, collide: false, cast: false,
      });
    }
  }

  _pipe(x, z0, z1, y) {
    const M = this.materials;
    const len = z1 - z0;
    const geo = new THREE.CylinderGeometry(0.035, 0.035, len, 6);
    geo.rotateX(Math.PI / 2);
    const m = new THREE.Mesh(geo, M.rust);
    m.position.set(x, y, (z0 + z1) / 2);
    m.castShadow = true;
    this.scene.add(m);
    for (let z = z0 + 1.5; z < z1 - 1; z += 3) {
      // small pipe clips hugging the pipe (0.04 wide); the old 0.08-wide
      // bracket at x-0.04 reached into the wall on the upper floor
      this.box(x - 0.02, z, y, 0.04, 0.04, 0.05, M.darkMetal, { geo: { ao: 'none' }, collide: false, cast: false });
    }
    return m;
  }

  _radiator(x, z) {
    const M = this.materials;
    const sgn = Math.sign(x);
    // rusty body, mounted on the wall face (wall inner faces are at ±1.1;
    // center the body at ±1.075 so it sits proud of the wall, not half-buried)
    const bx = sgn * 1.075;
    this.box(bx, z, 0.15, 0.08, 1.5, 0.55, M.rust, { geo: { ao: 'wall', uv: [1.8, 0.8] } });
    // vertical rib columns on the front face
    const ribMat = stdMat({ color: 0x4a4f56, roughness: 0.6, metalness: 0.22 });
    for (let i = 0; i < 7; i++) {
      this.box(bx - sgn * 0.055, z - 0.63 + i * 0.21, 0.22, 0.05, 0.05, 0.42, ribMat, {
        geo: { ao: 'none' }, collide: false, cast: false,
      });
    }
    // top grill + old valve knob
    this.box(bx, z, 0.72, 0.08, 1.4, 0.03, M.darkMetal, { geo: { ao: 'none' }, collide: false, cast: false });
    const valve = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.05, 6),
      stdMat({ color: 0x7a2a24, roughness: 0.5, metalness: 0.2 }));
    valve.rotation.z = Math.PI / 2;
    valve.position.set(bx - sgn * 0.06, 0.34, z - 0.62);
    this.scene.add(valve);
  }

  _buildTrim() {
    const M = this.materials;
    // baseboards: lower corridor (segmented to skip door gaps + wall jogs)
    // wall inner faces: x = -1.1 (wall at -1.2), -1.25 (wall at -1.35),
    // 1.1 (wall at 1.2), 0.95 (wall at 1.05), 1.25 (wall at 1.35)
    this._baseboard(-1.085, 0, 3.2, 0);
    this._baseboard(-1.085, 4.4, 10.0, 0);
    this._baseboard(-1.085, 11.2, 20, 0);
    this._baseboard(-1.235, 20, 24, 0);
    // the raised floor segment (z 24..32) has its top at y=0.16: baseboards
    // must sit ON it, not buried inside it (old y=0 left them 0.14 sunk)
    this._baseboard(-1.085, 24, 32, 0.16);
    this._baseboard(-1.375, 32, 48.6, 0);
    this._baseboard(-1.375, 49.8, 58, 0);
    this._baseboard(1.085, 0, 3.0, 0);
    this._baseboard(1.085, 4.2, 10.0, 0);
    this._baseboard(1.085, 11.2, 24, 0);
    // raised floor (z 24..32) top at y=0.16: south baseboard sits ON it
    this._baseboard(1.085, 24, 32, 0.16);
    this._baseboard(1.375, 32, 38, 0); // south wide wall (x=1.5, inner face 1.4)
    this._baseboard(1.375, 38, 46, 0);
    this._baseboard(1.375, 46, 54, 0);
    this._baseboard(1.375, 54, 58, 0);
    // lower wainscot in the widened long corridor: breaks up the big flat wall
    // planes and adds the "old Japanese apartment" horizontal depth cue.
    this._wainscot(-1.375, 32, 48.6);
    this._wainscot(-1.375, 49.8, 58);
    this._wainscot(1.375, 32, 58);
    // ceiling cornice: a thin shadow line where the wall meets the ceiling,
    // gives the long corridor a more built, less "cardboard box" silhouette.
    for (const cx of [-1.375, 1.375]) {
      this.box(cx, 45, 2.48, 0.03, 26, 0.05, M.darkWood, {
        geo: { ao: 'wall', uv: [26 / 2, 0.1] }, collide: false, cast: false,
      });
    }

    // ---------- room baseboards ----------
    // kitchen
    this._baseboard(-8.285, 0, 7.5, 0);
    this._baseboardX(0.115, -8.4, -1.3, 0);
    this._baseboardX(7.385, -8.4, -1.3, 0);
    // living (west wall has the fusuma gap 12.2..13.4)
    this._baseboard(-8.285, 7.5, 15.5, 0, [[12.2, 13.4]]);
    this._baseboardX(7.615, -8.4, -1.3, 0);
    // bedroom (west wall has the wardrobe gap 13.8..14.8)
    this._baseboard(-13.685, 7.5, 15.5, 0, [[13.8, 14.8]]);
    this._baseboardX(7.615, -13.8, -8.4, 0);
    this._baseboardX(15.385, -13.8, -8.4, 0);
    this._baseboard(-8.515, 7.5, 15.5, 0);
    // altar (tatami room)
    this._baseboardX(0.115, 1.3, 8.4, 0);
    this._baseboardX(8.385, 1.3, 8.4, 0);
    this._baseboard(8.285, 0, 8.5, 0);
    // child room
    this._baseboardX(8.615, 1.3, 8.4, 0);
    this._baseboard(8.285, 8.5, 15.5, 0);
    // upper floor (skip the exit door gap on the east wall; walls at ±1.0, inner faces ±0.9)
    this._baseboard(-0.885, 1.6, 63.2, 2.8);
    this._baseboard(0.885, 1.6, 30.0, 2.8);
    this._baseboard(0.885, 31.2, 63.2, 2.8);
    // ceiling beams, lower corridor (between the fixtures)
    for (const z of [5.65, 10.05, 14.6, 19.2, 23.8, 28.4, 33.0, 37.6, 42.2, 46.8, 51.4]) {
      this.box(0, z, 2.56, z >= 33 ? 3.0 : 2.4, 0.16, 0.14, M.darkWood, {
        geo: { ao: 'ceil', uv: [3, 0.2] }, collide: false, cast: false,
      });
    }
    // upper beams
    for (const z of [5.6, 11.6, 17.6, 23.6, 35.6, 41.6, 47.6, 53.6, 59.6]) {
      this.box(0, z, 2.8 + 2.26, 2.0, 0.16, 0.14, M.darkWood, {
        geo: { ao: 'ceil', uv: [2.5, 0.2] }, collide: false, cast: false,
      });
    }
    // exposed pipes along the ceiling
    this._pipe(-1.05, 2, 55, 2.42);
    this._pipe(-0.87, 2, 55, 2.8 + 2.12);
    // water stain + bucket under the dripping pipe joint
    this.decalFloor(-0.95, 33, 0.5, 0.5, this.tex.blood, 0.3);
    this.box(-0.8, 33.6, 0, 0.26, 0.26, 0.2, M.darkMetal, { geo: { ao: 'none' }, collide: false, cast: false });
    // old radiators - modeled with ribs so they read as objects, not white slabs
    this._radiator(1.10, 16.8);
    this._radiator(-1.375, 40.8);
    // east stair handrails + posts. The stairs rise 2.8m over z 58.15..60.85
    // (slope ~0.804 rad). The old rails sat at y=1.06 with rotation +0.76:
    // wrong sign (descending) and far too low - mid-run the steps are 1.5m+
    // high, so the rails were buried inside the staircase.
    {
      const railY = (z) => 2.44 + (z - 59.5) * (2.8 / 2.7);
      for (const hx of [-0.885, 0.885]) {
        const rail = this.box(hx, 59.5, 2.44 - 0.0125, 0.03, 3.92, 0.025, M.darkMetal, { geo: { ao: 'none' }, collide: false, cast: false });
        rail.rotation.x = -Math.atan2(2.8, 2.7);
        for (let k = 0; k < 5; k++) {
          const pz = 58.45 + k * 0.6;
          const py0 = Math.max(0.28, (pz - 58.15) * (2.8 / 2.7));
          const py1 = railY(pz) - 0.02;
          this.box(hx, pz, py0, 0.024, 0.024, py1 - py0, M.darkMetal, { geo: { ao: 'none' }, collide: false, cast: false });
        }
      }
    }
    // west stair handrail on its open (south) side - the stairs hug the north
    // wall, so only the corridor side needs a rail. Rise 2.8 over run 1.6.
    {
      const wx = -0.31; // on the stairs' open edge (x -1.2..-0.3), not floating past it
      const railY = (z) => 2.44 + (z - 0.8) * 1.75;
      const rail = this.box(wx, 0.8, 2.44 - 0.0125, 0.03, 3.24, 0.025, M.darkMetal, { geo: { ao: 'none' }, collide: false, cast: false });
      rail.rotation.x = -Math.atan2(2.8, 1.6);
      for (const pz of [0.32, 0.64, 0.96, 1.28]) {
        const py0 = Math.max(0.28, pz * 1.75);
        const py1 = railY(pz) - 0.02;
        this.box(wx, pz, py0, 0.024, 0.024, py1 - py0, M.darkMetal, { geo: { ao: 'none' }, collide: false, cast: false });
      }
    }
  }

  // ---------------------------------------------------------------- doors
  _doorFrame(x, z, along, width, y = 0) {
    const M = this.materials;
    const h = DOOR_H;
    if (along === 'z') {
      this.box(x, z, y, WALL_T + 0.06, 0.07, h, M.darkWood, { geo: { ao: 'wall' } });
      this.box(x, z + width, y, WALL_T + 0.06, 0.07, h, M.darkWood, { geo: { ao: 'wall' } });
      this.box(x, z + width / 2, y + h, WALL_T + 0.06, width, 0.12, M.darkWood, { geo: { ao: 'wall' } });
    } else {
      this.box(x, z, y, 0.07, WALL_T + 0.06, h, M.darkWood, { geo: { ao: 'wall' } });
      this.box(x + width, z, y, 0.07, WALL_T + 0.06, h, M.darkWood, { geo: { ao: 'wall' } });
      this.box(x + width / 2, z, y + h, width, WALL_T + 0.06, 0.12, M.darkWood, { geo: { ao: 'wall' } });
    }
  }

  makeDoor(opts) {
    const M = this.materials;
    const {
      x, z, along = 'z', width = DOOR_W, height = DOOR_H,
      dir = 1, label = '门', locked = false, lockedMsg = '锁着……',
      mat = M.woodDoor, type = 'swing', slideOffset = 1.15, onOpen = null, openAngle = 1.72,
      offset = 0, y = 0,
    } = opts;

    this._doorFrame(x, z, along, width, y);

    const pivot = new THREE.Group();
    const px = along === 'z' ? x + offset : x;
    const pz = along === 'z' ? z : z + offset;
    pivot.position.set(px, y, pz);
    const slabGeo = makeBoxGeo(width, height, 0.06, { uv: [width / 1.4, height / 1.4], jitter: 0.004 });
    // BoxGeometry makes the slab wide in X and thin in Z. That is correct for
    // along='x' doors, but along='z' doors live in walls that run along Z, so
    // their slab must be thin in X and span the opening in Z — otherwise the
    // closed door sticks out of the frame at a right angle (the "cross" bug).
    if (along === 'z') slabGeo.rotateY(Math.PI / 2);
    const slab = new THREE.Mesh(slabGeo, mat);
    slab.castShadow = true;
    slab.receiveShadow = true;
    if (along === 'z') slab.position.set(0, height / 2, width / 2);
    else slab.position.set(width / 2, height / 2, 0);
    pivot.add(slab);
    this.scene.add(pivot);

    const knob = new THREE.Mesh(
      new THREE.SphereGeometry(0.035, 5, 4),
      stdMat({ color: 0x8a7a3a, roughness: 0.55, metalness: 0.3 })
    );
    // The slab is CENTERED on the pivot, spanning [0, width] from the hinge.
    // A knob must sit at the free edge: width/2 - 0.09 relative to the slab
    // center. width - 0.09 put it ~0.5m PAST the free edge (floating knob),
    // and because the door collider is derived from the slab's whole world
    // box, that phantom knob also inflated the closed-door collider.
    if (along === 'z') knob.position.set(-0.06, height * 0.54, width / 2 - 0.09);
    else knob.position.set(width / 2 - 0.09, height * 0.54, -0.06);
    slab.add(knob);

    const door = {
      pivot, slab, knob, along, type, width, height, dir,
      angle: 0, target: 0, open: false,
      locked, lockedMsg, onOpen, openAngle,
      slideOffset, slidePos: 0, slideTarget: 0,
      collider: along === 'z'
        ? boxAABB(px, y + height / 2, z + width / 2, 0.12, height, width)
        : boxAABB(x + width / 2, y + height / 2, pz, width, height, 0.12),
      label, enabled: true,
      hinge: new THREE.Vector3(px, y, pz),
    };
    this.doors.push(door);
    const it = {
      mesh: slab, label, dist: 2.6,
      action: () => this.toggleDoor(door),
      door,
    };
    slab.userData.interactable = it;
    this.interactables.push(it);
    return door;
  }

  toggleDoor(door) {
    if (door.locked) {
      this.handlers.onLocked?.(door);
      return;
    }
    door.open = !door.open;
    door.target = door.open ? 1 : 0;
    if (door.type === 'slide') door.slideTarget = door.open ? -door.slideOffset : 0;
    this.handlers.onDoorToggle?.(door, door.open);
    if (door.open && door.onOpen) door.onOpen(door);
  }

  forceOpen(door) {
    if (door.locked || door.open) return;
    door.open = true;
    door.target = 1;
    if (door.type === 'slide') door.slideTarget = -door.slideOffset;
    if (door.onOpen) door.onOpen(door);
  }

  regInteractable(mesh, label, dist, action) {
    const it = { mesh, label, dist, action };
    mesh.userData.interactable = it;
    this.interactables.push(it);
    return it;
  }

  updateDoors(dt) {
    for (const d of this.doors) {
      if (d.type === 'swing') {
        d.angle = clamp(d.angle + (d.target * d.openAngle - d.angle) * Math.min(1, dt * 3.2), 0, d.openAngle);
        d.pivot.rotation.y = d.angle * d.dir;
        if (d.angle < 1.05) {
          // collider = the SLAB's own box only (excluding the knob child, which
          // would otherwise inflate the closed-door collision by ~0.5m)
          d.slab.updateWorldMatrix(true, true);
          d.slab.geometry.computeBoundingBox();
          const bb = d.slab.geometry.boundingBox.clone().applyMatrix4(d.slab.matrixWorld);
          d.collider = { x0: bb.min.x, y0: bb.min.y, z0: bb.min.z, x1: bb.max.x, y1: bb.max.y, z1: bb.max.z };
        } else d.collider = null;
      } else {
        d.slidePos += (d.slideTarget - d.slidePos) * Math.min(1, dt * 3.0);
        const base = d.width / 2;
        if (d.along === 'z') d.slab.position.z = base + d.slidePos;
        else d.slab.position.x = base + d.slidePos;
        if (d.slidePos > -0.7) {
          d.collider = d.along === 'z'
            ? boxAABB(d.hinge.x, d.hinge.y + d.height / 2, d.hinge.z + base + d.slidePos, 0.12, d.height, d.width)
            : boxAABB(d.hinge.x + base + d.slidePos, d.hinge.y + d.height / 2, d.hinge.z, d.width, d.height, 0.12);
        } else d.collider = null;
      }
    }
  }

  _buildDoors() {
    const M = this.materials;
    // kitchen (north wall, hinge z=3.2, opens into kitchen)
    this.makeDoor({ x: -1.2, z: 3.2, dir: -1, offset: 0.11, label: '厨房的门' });
    // living
    this.makeDoor({ x: -1.2, z: 10.0, dir: -1, offset: 0.11, label: '客厅的门' });
    // fusuma living<->bedroom (slides in front of the wall)
    this.makeDoor({
      x: -8.4, z: 12.2, width: 1.14, height: 2.0, type: 'slide', mat: M.fusuma,
      label: '纸拉门', slideOffset: 1.15, offset: 0.12,
    });
    // altar
    this.makeDoor({ x: 1.2, z: 3.0, dir: 1, offset: -0.11, label: '佛间的门' });
    // child room
    this.makeDoor({ x: 1.2, z: 10.0, dir: 1, offset: -0.11, label: '儿童房的门' });
    // dead door (opens onto brick)
    this.makeDoor({
      x: -1.5, z: 48.6, dir: -1, offset: 0.11, label: '没有用过的门',
      onOpen: () => this.handlers.onDeadDoor?.(),
    });
    this.box(-1.85, 49.2, 0, 0.14, 1.2, 2.1, M.brick, { geo: { ao: 'wall' } }); // brick backing (solid)
    // entry door (locked forever)
    this.makeDoor({
      x: -0.58, z: -2, along: 'x', width: 1.16, dir: 1, offset: 0.11, label: '玄关的门',
      locked: true, lockedMsg: '打不开……外面一片漆黑。',
    });
    // exit door (upper floor, locked until finale) + balcony platform beyond
    this.exitDoor = this.makeDoor({
      x: 1.0, z: 30.0, dir: 1, offset: -0.11, y: 2.8, label: '通往外界的门',
      locked: true, lockedMsg: '好像还缺了什么……',
      onOpen: () => this.handlers.onExitOpen?.(),
    });
    this.box(1.5, 30.6, 2.8, 1.3, 1.5, 0.15, M.concrete, { geo: { ao: 'floor' } });
    // wardrobe shell: one wide front door + back opening into the passage.
    // The passage's own south wall (z 14.7..14.9) already forms the wardrobe's
    // south end, so no lower back/side panels are needed there (they would
    // either embed in the wall or steal passage width). The upper panels hug
    // the north wall's inner face (13.8).
    this.makeDoor({ x: -13.8, z: 13.8, width: 0.9, height: 2.0, dir: 1, offset: 0.11, label: '壁橱' });
    this.box(-14.6, 13.86, 0, 0.12, 0.1, 2.1, M.darkWood, { geo: { ao: 'wall' } });  // back wall upper part
    this.box(-14.25, 13.86, 0, 0.7, 0.06, 2.1, M.darkWood, { geo: { ao: 'wall' } }); // side wall (north end)
    this.box(-14.25, 14.3, 2.1, 0.7, 1.0, 0.1, M.darkWood, { geo: { ao: 'wall' } }); // top
    this.box(-13.85, 14.3, 2.1, 0.2, 1.0, 0.6, M.darkWood, { geo: { ao: 'wall' } }); // panel above doors
    this.floor(-14.25, 14.25, 0.7, 0.9, 0, M.woodFloor); // wardrobe interior floor (z 13.8..14.7, clear of the south wall)
  }

  // ---------------------------------------------------------------- props
  _buildProps() {
    const M = this.materials;
    const t = this.tex;
    const rng = this.rng;

    // ---------- kitchen ----------
    this.box(-6.2, 7.25, 0, 3.4, 0.62, 0.92, M.darkWood, { geo: { ao: 'wall', uv: [4, 1] } }); // counter
    this.box(-6.2, 7.25, 0.92, 3.5, 0.7, 0.06, stdMat({ color: 0x63665f, roughness: 0.78, metalness: 0.12 }), { geo: { ao: 'none' } }); // countertop (matte + dark: its far edge blew out at grazing angles under the flashlight)
    // wall cabinet with auto-opening door
    this.box(-6.6, 7.25, 1.6, 2.4, 0.62, 0.62, M.darkWood, { geo: { ao: 'wall' } });
    const cabPivot = new THREE.Group();
    cabPivot.position.set(-7.75, 1.6, 6.93);
    const cabDoor = new THREE.Mesh(makeBoxGeo(1.05, 0.54, 0.04, { uv: [1, 1] }), M.darkWood);
    cabDoor.position.set(0.525, 0.27, 0);
    cabPivot.add(cabDoor);
    this.scene.add(cabPivot);
    this.props.cabinet = { pivot: cabPivot, angle: 0, openedOnce: false };
    // fridge
    this.box(-7.7, 2.85, 0, 0.85, 0.85, 1.75, M.rust, { geo: { ao: 'wall' } });
    // door seam: a VERTICAL panel on the fridge's front face (z 3.275 side).
    // The old call was a horizontal slab with its center at the fridge's own
    // center (z=2.85), i.e. fully buried inside the body and invisible.
    this.box(-7.7, 3.29, 0.875, 0.8, 0.06, 1.75, M.darkMetal, { geo: { ao: 'none' }, collide: false });
    // table + chairs
    this.box(-5.3, 4.6, 0, 1.4, 0.8, 0.06, M.darkWood, { geo: { ao: 'none', uv: [2, 1] } });
    for (const [lx, lz] of [[-5.85, 4.6], [-4.75, 4.6], [-5.3, 4.05], [-5.3, 5.15]]) {
      this.box(lx, lz, 0.06, 0.08, 0.08, 0.72, M.darkWood, { geo: { ao: 'none' } });
    }
    this.box(-5.3, 3.55, 0, 0.55, 0.55, 0.46, M.darkWood, { geo: { ao: 'wall' } });
    this.box(-5.3, 3.32, 0.46, 0.55, 0.07, 0.55, M.darkWood, { geo: { ao: 'none' } });
    this.box(-5.3, 5.65, 0, 0.55, 0.55, 0.46, M.darkWood, { geo: { ao: 'wall' } });
    this.box(-5.3, 5.88, 0.46, 0.55, 0.07, 0.55, M.darkWood, { geo: { ao: 'none' } });
    // kettle
    this.box(-5.5, 7.0, 0.98, 0.26, 0.26, 0.22, M.darkMetal, { geo: { ao: 'none' } });
    // sink + faucet (inset in the counter)
    this.box(-5.8, 7.2, 0.95, 0.45, 0.26, 0.05, M.darkMetal, { geo: { ao: 'none' }, collide: false });
    this.box(-5.8, 7.2, 0.99, 0.6, 0.4, 0.015, M.darkMetal, { geo: { ao: 'none' }, collide: false });
    // kitchen faucet: the riser used to sit at z=7.45, INSIDE the south wall
    // (z 7.4..7.6). It must stand on the sink's back edge (z≈7.31), clear of
    // the wall, with the spout reaching over the basin.
    const faucetV = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.3, 6), M.darkMetal);
    faucetV.position.set(-5.72, 1.14, 7.31);
    const faucetH = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.34, 6), M.darkMetal);
    faucetH.rotation.x = Math.PI / 2;
    faucetH.position.set(-5.72, 1.26, 7.21);
    this.scene.add(faucetV, faucetH);
    // stove + hood
    this.box(-3.4, 7.25, 0, 0.95, 0.62, 0.92, M.whiteMetal, { geo: { ao: 'wall' } });
    // rear burners at z=7.45 sat inside the south wall (z 7.4..7.6); the
    // stove's usable top is z 6.94..7.40, so space them at 6.89 / 7.29
    for (const [bx, bz] of [[-3.55, 7.05], [-3.25, 7.05], [-3.55, 7.29], [-3.25, 7.29]]) {
      const burner = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.02, 8), M.darkMetal);
      burner.position.set(bx, 0.93, bz);
      this.scene.add(burner);
    }
    this.box(-3.4, 7.25, 1.72, 1.0, 0.42, 0.28, M.darkMetal, { geo: { ao: 'wall' }, collide: false });
    this.box(-3.4, 7.25, 2.0, 0.24, 0.24, 0.4, M.rust, { geo: { ao: 'none' }, collide: false });
    // hanging shelf + jars
    this.box(-6.7, 6.6, 1.72, 1.7, 0.28, 0.04, M.darkWood, { geo: { ao: 'none' }, collide: false });
    const jarCols = [0x4a6a50, 0x6a4a30, 0x4a4a60, 0x606a4a];
    for (let i = 0; i < 4; i++) {
      const jar = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.03, 0.12, 6),
        stdMat({ color: jarCols[i], roughness: 0.3, metalness: 0.2 }));
      jar.position.set(-7.25 + i * 0.32, 1.8, 6.6);
      this.scene.add(jar);
    }
    // wall phone — moved off the south wall: the old spot (x=-6.9, z=7.36)
    // was INSIDE the wall cabinet (x -7.8..-5.4, z 6.94..7.56, y 1.6..2.22).
    // Hang it on the kitchen's west wall (inner face x=-8.3) at a clear spot.
    const phone = this.box(-8.22, 3.2, 1.45, 0.16, 0.1, 0.24, stdMat({ color: 0x3d4a42, roughness: 0.6 }), { geo: { ao: 'none' }, collide: false });
    this.props.phone = phone;
    this.regInteractable(phone, '电话', 2.0, () => this.handlers.onPhone?.());
    // newspapers
    this.decalFloor(-2.6, 5.6, 0.42, 0.56, t.news, rng() * 3);
    this.decalFloor(-6.4, 1.6, 0.42, 0.56, t.news, 0.7);
    // dishes left soaking in the sink basin - the rim slab top is y=1.0, the
    // bowls sit half-sunk like they were abandoned mid-washing
    const bowlMat = stdMat({ color: 0xc9c4b4, roughness: 0.55 });
    for (const [bx, bz, r] of [[-5.9, 7.16, 0.09], [-5.7, 7.26, 0.11], [-5.86, 7.3, 0.08]]) {
      const bowl = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 0.72, 0.055, 8), bowlMat);
      bowl.position.set(bx, 0.99, bz);
      this.scene.add(bowl);
    }
    const chop = new THREE.Mesh(makeBoxGeo(0.012, 0.012, 0.24), stdMat({ color: 0x9a7b4f, roughness: 0.85 }));
    chop.position.set(-5.78, 1.005, 7.2);
    chop.rotation.y = 0.5;
    this.scene.add(chop);
    // a pot forgotten on one of the burners (burner top y=0.94)
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.1, 0.13, 10), M.darkMetal);
    pot.position.set(-3.55, 1.005, 7.05);
    this.scene.add(pot);
    // rice cooker + soy sauce on the counter (top y=0.98)
    const cooker = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.15, 0.17, 10), M.whiteMetal);
    cooker.position.set(-6.95, 1.065, 7.15);
    this.scene.add(cooker);
    const cookerLid = new THREE.Mesh(new THREE.CylinderGeometry(0.145, 0.145, 0.02, 10), M.darkMetal);
    cookerLid.position.set(-6.95, 1.16, 7.15);
    this.scene.add(cookerLid);
    const soy = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.032, 0.15, 6), stdMat({ color: 0x2e2118, roughness: 0.4 }));
    soy.position.set(-5.15, 1.055, 7.15);
    this.scene.add(soy);

    // ---------- living ----------
    this.box(-6.5, 15.15, 0, 1.1, 0.45, 0.45, M.darkWood, { geo: { ao: 'wall' } }); // tv stand
    const tv = this.box(-6.5, 15.25, 0.45, 1.0, 0.45, 0.72, M.darkMetal, { geo: { ao: 'none' } }); // tv body
    // the screen must face INTO the room (-z). PlaneGeometry's default normal
    // is +z, which pointed the screen at the south wall (invisible from the
    // living room) - the classic "model facing the wrong way" bug.
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.86, 0.6), M.tvScreen);
    screen.position.set(-6.5, 1.05, 15.02);
    screen.rotation.y = Math.PI;
    this.scene.add(screen);
    this.props.tv = { body: tv, screen, on: false, timer: 0 };
    this.regInteractable(tv, '电视', 2.4, () => this.handlers.onTV?.());
    // couch facing the TV (+z): seat frame + slim backrest (the old "back" was
    // a second 0.85m-deep box stacked over half the seat - a chunky daybed)
    this.box(-4.8, 12.0, 0, 2.4, 0.75, 0.42, stdMat({ color: 0x4a4438, roughness: 0.95 }), { geo: { ao: 'wall' } });
    this.box(-4.8, 12.62, 0.42, 2.4, 0.24, 0.5, stdMat({ color: 0x3c382e, roughness: 0.95 }), { geo: { ao: 'none' } });
    this.box(-5.95, 12.2, 0, 0.16, 0.6, 0.55, M.darkWood, { geo: { ao: 'none' } });
    this.box(-3.65, 12.2, 0, 0.16, 0.6, 0.55, M.darkWood, { geo: { ao: 'none' } });
    // low table
    this.box(-4.9, 14.0, 0, 1.1, 0.6, 0.06, M.darkWood, { geo: { ao: 'none' } });
    this.box(-4.9, 14.0, 0.06, 0.1, 0.1, 0.32, M.darkWood, { geo: { ao: 'none' } });
    // tv light
    this.tvLight = new THREE.PointLight(0x8fb6cc, 0, 7, 1.8);
    this.tvLight.position.set(-6.5, 1.4, 14.2);
    this.scene.add(this.tvLight);
    // tv antenna + ghost-face overlay for scares
    for (const sx of [-0.25, 0.25]) {
      const ant = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.5, 4), M.darkMetal);
      ant.position.set(-6.5 + sx, 1.38, 15.25);
      ant.rotation.z = sx > 0 ? -0.5 : 0.5;
      ant.rotation.x = 0.35;
      this.scene.add(ant);
    }
    const tvFace = new THREE.Mesh(new THREE.PlaneGeometry(0.86, 0.6), basicMat({ map: t.tvFace, transparent: true }));
    tvFace.position.set(-6.5, 1.05, 14.99);
    tvFace.rotation.y = Math.PI; // same orientation as the screen
    tvFace.visible = false;
    this.scene.add(tvFace);
    this.props.tvFace = tvFace;
    // bookshelf against the west wall. Living-room west wall inner face is x=-8.3
    // (wall center -8.4, thickness 0.2); the cabinet must sit flush OUTSIDE it,
    // not half-buried in the wall (old center -8.28 put 0.13m inside the wall).
    this.box(-8.15, 10.3, 0, 0.3, 2.2, 1.9, M.darkWood, { geo: { ao: 'wall' } });
    this.box(-8.15, 10.3, 0.65, 0.32, 2.05, 0.05, M.darkWood, { geo: { ao: 'none' }, collide: false });
    this.box(-8.15, 10.3, 1.25, 0.32, 2.05, 0.05, M.darkWood, { geo: { ao: 'none' }, collide: false });
    const bookCols = [0x6a3020, 0x20506a, 0x3a5a30, 0x6a5a20, 0x4a3050, 0x505050, 0x704020, 0x2a3a4a];
    for (const shelfY of [0.7, 1.3]) {
      for (let i = 0; i < 8; i++) {
        const bw = 0.045 + rng() * 0.05;
        // books must stand ON the shelf front (x≈-7.98, just proud of the new
        // cabinet face -8.00); the old -8.10 was inside the solid cabinet
        this.box(-7.98, 9.42 + i * 0.25, shelfY, 0.05, bw, 0.2 + rng() * 0.13,
          stdMat({ color: bookCols[(i * 3 + (shelfY > 1 ? 1 : 0)) % 8], roughness: 0.9 }), { geo: { ao: 'none' }, collide: false, cast: false });
      }
    }
    // fallen books on top (sticking out past the cabinet's front edge so they
    // are actually visible from the room)
    for (let i = 0; i < 3; i++) {
      const fb = this.box(-8.03, 9.8 + i * 0.3, 1.93, 0.24, 0.05, 0.035,
        stdMat({ color: bookCols[i + 2], roughness: 0.9 }), { geo: { ao: 'none' }, collide: false, cast: false });
      fb.rotation.z = 0.2 + rng() * 0.4;
    }
    // floor rug
    this.decalFloor(-5.2, 11.8, 2.6, 3.2, t.rug, 0.05);
    // standing lamp (interactable)
    this.box(-3.1, 13.9, 0, 0.26, 0.26, 0.04, M.darkMetal, { geo: { ao: 'none' }, collide: false });
    const lampPole = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.5, 6), M.darkMetal);
    lampPole.position.set(-3.1, 0.77, 13.9);
    // two shade materials: dark cloth when off, warm glowing cloth when on
    const lampShadeOff = stdMat({ color: 0x8a6a40, roughness: 0.9, side: THREE.DoubleSide });
    const lampShadeOn = stdMat({ color: 0xc9a86a, emissive: 0xffb066, emissiveIntensity: 0.55, roughness: 0.9, side: THREE.DoubleSide });
    const lampShade = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.3, 10, 1, true), lampShadeOff);
    lampShade.position.set(-3.1, 1.66, 13.9);
    this.scene.add(lampPole, lampShade);
    const lampLight = new THREE.PointLight(0xffb066, 0, 6, 1.9);
    lampLight.position.set(-3.1, 1.6, 13.9);
    this.scene.add(lampLight);
    this.props.lamp = { light: lampLight, on: false, shade: lampShade, shadeOff: lampShadeOff, shadeOn: lampShadeOn };
    this.regInteractable(lampPole, '落地灯', 2.0, () => this.handlers.onLamp?.());
    // framed photos on the north wall + old radio on the floor.
    // The kitchen/living shared wall is z=7.5 (z 7.4..7.6); the LIVING-room
    // side inner face is z=7.6. Pictures/frames at z≈7.51 were inside the
    // wall; hang them at z≈7.63, proud of the living-room face.
    for (const [px, pz] of [[-6.4, 7.615], [-3.4, 7.615]]) {
      this.decalWall(px, pz, 1.55, 0.34, 0.42, t.photo, 's');
      this.box(px - 0.185, pz + 0.015, 1.55, 0.03, 0.02, 0.5, M.darkWood, { geo: { ao: 'none' }, collide: false, cast: false });
      this.box(px + 0.185, pz + 0.015, 1.55, 0.03, 0.02, 0.5, M.darkWood, { geo: { ao: 'none' }, collide: false, cast: false });
      this.box(px, pz + 0.015, 1.335, 0.34, 0.02, 0.03, M.darkWood, { geo: { ao: 'none' }, collide: false, cast: false });
      this.box(px, pz + 0.015, 1.765, 0.34, 0.02, 0.03, M.darkWood, { geo: { ao: 'none' }, collide: false, cast: false });
    }
    this.box(-7.7, 14.6, 0, 0.32, 0.22, 0.14, M.darkWood, { geo: { ao: 'wall' } });
    const radioAnt = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.4, 4), M.darkMetal);
    radioAnt.position.set(-7.7, 0.34, 14.6);
    this.scene.add(radioAnt);
    // window silhouette decal (appears during scares)
    const sil = this.decalWall(-8.28, 14.0, 1.0, 0.55, 0.75, t.silhouette, 'e', 0, false);
    sil.visible = false;
    this.props.silhouette = sil;

    // ---------- bedroom ----------
    this.box(-10.7, 12.3, 0, 1.8, 1.15, 0.24, M.quilt, { geo: { ao: 'wall', uv: [2, 2] } });
    this.box(-9.9, 12.3, 0.24, 0.4, 0.3, 0.08, M.pale, { geo: { ao: 'none' } });
    this.box(-9.15, 9.55, 0, 0.5, 0.45, 0.55, M.darkWood, { geo: { ao: 'wall' } });
    const note1 = new THREE.Mesh(
      new THREE.PlaneGeometry(0.2, 0.26),
      stdMat({ map: t.journal, side: THREE.DoubleSide, roughness: 0.92, emissive: 0xffffff, emissiveIntensity: 0.4 })
    );
    note1.position.set(-9.15, 0.56, 9.55); // nightstand top is 0.55
    note1.rotation.x = -Math.PI / 2;
    this.scene.add(note1);
    this.notePickups.push({ mesh: note1, id: 1 });
    this.regInteractable(note1, '旧手记', 2.2, () => this.handlers.onNote?.(1));
    // vanity + stool
    this.box(-11.6, 9.3, 0, 0.5, 0.9, 0.72, M.darkWood, { geo: { ao: 'wall' } });
    this.box(-11.6, 9.3, 0.72, 0.54, 0.94, 0.04, M.darkWood, { geo: { ao: 'none' } });
    this.box(-11.6, 9.95, 0, 0.3, 0.3, 0.42, M.darkWood, { geo: { ao: 'none' } });
    // dressing mirror - the figure inside is not you
    // bedroom west wall is at x=-13.8 (x -13.9..-13.7, inner face -13.7);
    // the mirror must sit just IN FRONT of that face, not inside the wall
    const mirror = new THREE.Mesh(new THREE.PlaneGeometry(0.6, 1.3), basicMat({ map: t.mirror }));
    mirror.position.set(-13.695, 1.5, 9.5);
    mirror.rotation.y = Math.PI / 2;
    this.scene.add(mirror);
    this.regInteractable(mirror, '镜子', 2.0, () => this.handlers.onMirror?.());
    // wardrobe interior: rail + hanging clothes (against the back wall)
    const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.75, 5), M.darkMetal);
    rail.rotation.z = Math.PI / 2;
    rail.position.set(-14.2, 1.85, 14.3);
    this.scene.add(rail);
    const clothCols = [0x5a4a6a, 0x4a5a5a, 0x6a4a4a];
    for (let i = 0; i < 3; i++) {
      this.box(-14.53, 14.05 + i * 0.24, 1.32, 0.05, 0.42, 0.95,
        stdMat({ color: clothCols[i], roughness: 0.95 }), { geo: { ao: 'none' }, collide: false, cast: true });
    }
    // kakemono scroll on the north wall (the wall the futon faces) - bare
    // plaster read as unfinished geometry; a hanging scroll is the classic
    // washitsu dressing. Wooden rods give it physical depth.
    this.decalWall(-11.2, 7.615, 1.48, 0.36, 1.1, t.scroll, 'n');
    this.box(-11.2, 7.635, 2.0, 0.44, 0.045, 0.032, M.darkWood, { geo: { ao: 'none' }, collide: false });
    this.box(-11.2, 7.635, 0.9, 0.44, 0.045, 0.032, M.darkWood, { geo: { ao: 'none' }, collide: false });
    // moving boxes stacked in the NW corner
    const cardboard = stdMat({ color: 0x7d6a52, roughness: 0.92 });
    this.box(-13.2, 8.1, 0, 0.52, 0.44, 0.36, cardboard, { geo: { ao: 'wall' } });
    const boxTop = this.box(-13.12, 8.16, 0.36, 0.42, 0.36, 0.3, cardboard, { geo: { ao: 'none' } });
    boxTop.rotation.y = 0.16;
    // a zabuton someone left beside the futon
    this.box(-12.5, 11.4, 0, 0.5, 0.5, 0.09, stdMat({ color: 0x5a3a3a, roughness: 0.95 }), { geo: { ao: 'none' } });

    // ---------- bathroom ----------
    this.box(-15.8, 20.25, 0, 1.4, 0.55, 0.6, M.rust, { geo: { ao: 'wall' } });   // tub shell
    this.box(-15.8, 20.25, 0.3, 1.25, 0.4, 0.02, M.waterDark, { geo: { ao: 'none' } }); // dark water
    this.box(-15.8, 19.86, 0, 1.5, 0.08, 0.62, M.darkMetal, { geo: { ao: 'none' } });   // rim
    this.box(-16.7, 15.25, 1.45, 0.06, 0.6, 0.55, M.darkMetal, { geo: { ao: 'none' } }); // mirror (NW corner)
    this.box(-16.9, 17.2, 1.9, 0.14, 0.14, 0.1, M.darkMetal, { geo: { ao: 'none' } }); // shower head
    // tub faucet — must stand ON the tub rim (top 0.62); it used to float at
    // y≈1.25 in mid-air, 0.6m above the tub
    const tubTap = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.35, 6), M.darkMetal);
    tubTap.position.set(-15.6, 0.8, 20.25);
    const tubSpout = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.22, 6), M.darkMetal);
    tubSpout.rotation.x = Math.PI / 2;
    tubSpout.position.set(-15.6, 0.97, 20.05);
    this.scene.add(tubTap, tubSpout);
    // toilet
    this.box(-14.55, 16.85, 0, 0.4, 0.55, 0.42, M.whiteMetal, { geo: { ao: 'wall' } }); // cistern
    this.box(-14.55, 16.4, 0, 0.4, 0.48, 0.4, M.whiteMetal, { geo: { ao: 'wall' } });    // bowl
    this.box(-14.55, 16.4, 0.4, 0.42, 0.5, 0.04, M.whiteMetal, { geo: { ao: 'none' } }); // seat
    // sink
    this.box(-16.55, 15.35, 0, 0.55, 0.5, 0.8, M.whiteMetal, { geo: { ao: 'wall' } });
    this.box(-16.55, 15.35, 0.8, 0.6, 0.55, 0.05, M.whiteMetal, { geo: { ao: 'none' } });
    // medicine cabinet, door ajar.
    // The bathroom east wall spans x -13.9..-13.7 (bathroom inner face
    // -13.9): the cabinet must protrude into the bathroom at x≈-13.93; the
    // old x=-13.9/-13.86 placement was embedded in the wall, and the ajar
    // door at x=-13.98 was fully inside it.
    this.box(-13.93, 15.5, 1.5, 0.12, 0.5, 0.7, M.whiteMetal, { geo: { ao: 'wall' } });
    const medPivot = new THREE.Group();
    medPivot.position.set(-13.95, 1.55, 15.35); // hinge at the cabinet's bathroom-side edge
    const medDoor = new THREE.Mesh(makeBoxGeo(0.06, 0.6, 0.5), M.whiteMetal);
    medDoor.position.set(0, 0, 0.25);
    medPivot.add(medDoor);
    medPivot.rotation.y = -0.55; // swing INTO the bathroom (west), not into the wall/bedroom
    this.scene.add(medPivot);
    // washing machine in the SE corner (clear of the tub rim x -16.55..-15.05
    // and the east wall inner face x=-13.9) - lid ajar, never quite drained
    const washer = this.box(-14.5, 20.3, 0, 0.62, 0.62, 0.92, M.whiteMetal, { geo: { ao: 'wall' } });
    this.props.washer = washer;
    this.regInteractable(washer, '洗衣机', 2.2, () => this.handlers.onWasher?.());
    const washerLid = new THREE.Mesh(
      new THREE.CylinderGeometry(0.24, 0.24, 0.03, 10),
      stdMat({ color: 0x9aa0a4, roughness: 0.6, metalness: 0.15 })
    );
    washerLid.position.set(-14.5, 0.935, 20.3);
    washerLid.rotation.x = 0.06; // ajar
    this.scene.add(washerLid);
    this.box(-14.5, 20.52, 0.92, 0.56, 0.1, 0.1, M.darkMetal, { geo: { ao: 'none' }, collide: false });
    // laundry basket with a heap of clothes
    const basket = new THREE.Mesh(
      new THREE.CylinderGeometry(0.17, 0.14, 0.36, 8),
      stdMat({ color: 0x8a94a0, roughness: 0.85 })
    );
    basket.position.set(-14.75, 0.18, 19.5);
    this.scene.add(basket);
    const clothes = new THREE.Mesh(new THREE.SphereGeometry(0.14, 7, 5), stdMat({ color: 0x5a5a66, roughness: 0.95 }));
    clothes.position.set(-14.75, 0.37, 19.5);
    clothes.scale.y = 0.5;
    this.scene.add(clothes);

    // ---------- altar ----------
    this.box(7.55, 4.8, 0, 0.85, 0.75, 0.5, M.darkWood, { geo: { ao: 'wall' } });
    this.box(7.55, 4.8, 0.5, 0.8, 0.7, 0.85, M.darkWood, { geo: { ao: 'wall' } });
    this.box(7.55, 4.8, 1.35, 0.84, 0.74, 0.1, M.darkWood, { geo: { ao: 'none' } });
    // (the old "recess" black box sat INSIDE the solid wooden tier and was
    // invisible; the family photo now hangs on the tier's front face instead)
    // family photo on the altar's FRONT face (x=7.15, facing the room -x).
    // It used to sit on the tier's east edge facing +z, i.e. edge-on to the
    // player - effectively invisible from the room.
    const photo = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.26), M.photo);
    photo.position.set(7.145, 1.05, 4.8);
    photo.rotation.y = -Math.PI / 2;
    this.scene.add(photo);
    // candles must STAND on the top board (y 1.35..1.45); yTop=1.42 buried
    // them inside it, with only the flame poking out of the wood
    const flame1 = this._candle(7.15, 4.8, 1.59);
    this._candle(7.95, 4.8, 1.59);
    this.box(7.55, 4.8, 1.46, 0.09, 0.09, 0.1, stdMat({ color: 0x8a7a3a, roughness: 0.45, metalness: 0.3 }), { geo: { ao: 'none' }, collide: false });
    this.regInteractable(flame1, '摇响铃铛', 2.2, () => this.handlers.onBell?.());
    const note2 = new THREE.Mesh(new THREE.PlaneGeometry(0.24, 0.3), stdMat({ map: t.news, side: THREE.DoubleSide, roughness: 0.92, emissive: 0xffffff, emissiveIntensity: 0.4 }));
    // lay it ON TOP of the altar's top board (y 1.35..1.45); it used to be
    // inside the solid wooden tier (y=0.62) and completely invisible.
    note2.position.set(7.55, 1.47, 5.1);
    note2.rotation.x = -Math.PI / 2 + 0.2;
    this.scene.add(note2);
    this.notePickups.push({ mesh: note2, id: 2 });
    this.regInteractable(note2, '报纸文章', 2.2, () => this.handlers.onNote?.(2));
    for (const oz of [3.4, 4.1, 4.8]) this._ofuda(2.3, oz, 2.55);
    // zabuton cushions + offerings + hanging scroll
    for (const [cx, cz] of [[5.9, 4.2], [5.9, 5.4]]) {
      this.box(cx, cz, 0, 0.55, 0.55, 0.09, M.clothRed, { geo: { ao: 'wall' } });
    }
    for (const [ox, oz] of [[7.3, 4.6], [7.55, 4.55], [7.8, 4.65]]) {
      const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.03, 0.05, 6),
        stdMat({ color: 0x3a3038, roughness: 0.5, metalness: 0.2 }));
      bowl.position.set(ox, 1.475, oz);
      this.scene.add(bowl);
    }
    this.decalWall(8.285, 4.8, 1.55, 0.38, 1.15, t.scroll, 'w');

    // ---------- child room ----------
    this.box(5.2, 15.0, 0, 1.9, 0.8, 0.32, M.quilt, { geo: { ao: 'wall', uv: [2, 1] } });
    this.box(4.35, 15.0, 0.32, 0.3, 0.25, 0.08, M.pale, { geo: { ao: 'none' } });
    this.box(2.0, 15.0, 0, 0.8, 0.5, 0.45, M.darkWood, { geo: { ao: 'wall' } });
    const blockCols = [0xb03030, 0x3068b0, 0x40a048, 0xd0b030];
    for (let i = 0; i < 6; i++) {
      const s = 0.1 + rng() * 0.08;
      this.box(1.7 + rng() * 3.5, 9.2 + rng() * 2.5, s / 2, s, s, s,
        stdMat({ color: blockCols[i % 4], roughness: 0.8 }), { geo: { ao: 'none' }, collide: false });
    }
    const doll = this._doll(7.9, 9.9);
    this.props.doll = doll;
    this.regInteractable(doll.mesh, '人偶', 1.8, () => this.handlers.onDoll?.());
    this.box(7.75, 9.1, 0, 1.1, 0.5, 0.72, M.darkWood, { geo: { ao: 'wall' } });
    const note3 = new THREE.Mesh(new THREE.PlaneGeometry(0.24, 0.3), stdMat({ map: t.drawing, side: THREE.DoubleSide, roughness: 0.92, emissive: 0xffffff, emissiveIntensity: 0.4 }));
    note3.position.set(7.75, 0.73, 9.1); // shelf top is 0.72
    note3.rotation.x = -Math.PI / 2;
    this.scene.add(note3);
    this.notePickups.push({ mesh: note3, id: 3 });
    this.regInteractable(note3, '孩子的画', 2.2, () => this.handlers.onNote?.(3));
    this.decalWall(8.285, 12.2, 1.4, 0.4, 0.5, t.drawing, 'w', 0.05);
    // child-room closet: the east wall is x=8.4 (inner face 8.3); the closet
    // used to be centered at x=8.05, i.e. 0.075 embedded in the wall, and its
    // "door" was a horizontal slab buried inside the body. Move it flush
    // against the wall and make the door a vertical panel on the front face.
    this.box(7.95, 14.4, 0, 0.65, 1.1, 2.05, M.darkWood, { geo: { ao: 'wall' } }); // closet
    this.box(7.95, 13.82, 0, 0.62, 0.06, 2.05, M.darkWood, { geo: { ao: 'none' }, collide: false }); // door panel
    // crib + paper-crane mobile
    this.box(4.4, 9.1, 0, 1.1, 0.65, 0.9, M.darkWood, { geo: { ao: 'wall' } });
    this.box(4.4, 9.1, 0.28, 1.02, 0.57, 0.08, M.quilt, { geo: { ao: 'none' } });
    for (const [px, pz] of [[3.88, 8.8], [4.92, 8.8], [3.88, 9.4], [4.92, 9.4]]) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.9, 5), M.darkWood);
      post.position.set(px, 0.45, pz);
      this.scene.add(post);
    }
    this.box(4.4, 9.1, 0.82, 1.14, 0.06, 0.04, M.darkWood, { geo: { ao: 'none' }, collide: false });
    this.box(4.4, 9.1, 0.82, 0.06, 0.69, 0.04, M.darkWood, { geo: { ao: 'none' }, collide: false });
    const mob = new THREE.Group();
    const mobStick1 = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, 0.5, 4), M.darkMetal);
    mobStick1.rotation.z = Math.PI / 2;
    const mobStick2 = mobStick1.clone();
    mobStick2.rotation.z = -Math.PI / 2;
    mob.add(mobStick1, mobStick2);
    const craneMat = basicMat({ color: 0xe8e4d8, side: THREE.DoubleSide });
    for (let i = 0; i < 5; i++) {
      const cr = new THREE.Mesh(new THREE.ConeGeometry(0.03, 0.07, 4), craneMat);
      cr.position.set(rand(-0.2, 0.2), -0.22 - rand(0, 0.1), rand(-0.2, 0.2));
      cr.rotation.z = Math.PI;
      mob.add(cr);
    }
    mob.position.set(4.4, 1.95, 9.1);
    this.scene.add(mob);
    this.props.mobile = mob;
    // fūrin wind chime hung from the ceiling - no window in this room; a
    // child's chime stirring in a sealed space is its own kind of wrong.
    // Group origin at the ceiling hook so the whole chime can swing.
    const furin = new THREE.Group();
    furin.position.set(2.3, 2.5, 13.0);
    const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.42, 4), M.darkMetal);
    cord.position.y = -0.21;
    furin.add(cord);
    const bellMat = stdMat({ color: 0xb8c4cc, roughness: 0.25, metalness: 0.2 });
    const bell = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.032, 0.055, 8), bellMat);
    bell.position.y = -0.45;
    furin.add(bell);
    const clapper = new THREE.Mesh(new THREE.CylinderGeometry(0.005, 0.005, 0.1, 4), M.darkMetal);
    clapper.position.y = -0.53;
    furin.add(clapper);
    const clapperBall = new THREE.Mesh(new THREE.SphereGeometry(0.012, 5, 4), M.darkMetal);
    clapperBall.position.y = -0.59;
    furin.add(clapperBall);
    const stripMat = stdMat({ color: 0xd8d0bc, roughness: 0.9, side: THREE.DoubleSide });
    for (let i = 0; i < 3; i++) {
      const a = (i / 3) * Math.PI * 2 + 0.5;
      const strip = new THREE.Mesh(makeBoxGeo(0.028, 0.16, 0.004), stripMat);
      strip.position.set(Math.cos(a) * 0.035, -0.66, Math.sin(a) * 0.035);
      strip.rotation.y = -a;
      furin.add(strip);
    }
    this.scene.add(furin);
    this.props.furin = furin;
    // teddy bear
    const ted = new THREE.Group();
    const tmat = stdMat({ color: 0x7a5a3a, roughness: 0.95 });
    const tbody = new THREE.Mesh(makeBoxGeo(0.22, 0.3, 0.18), tmat);
    tbody.position.y = 0.18;
    const thead = new THREE.Mesh(makeBoxGeo(0.16, 0.16, 0.16), tmat);
    thead.position.y = 0.4;
    ted.add(tbody, thead);
    for (const sx of [-0.14, 0.14]) {
      const arm = new THREE.Mesh(makeBoxGeo(0.08, 0.16, 0.08), tmat);
      arm.position.set(sx, 0.24, 0);
      ted.add(arm);
    }
    for (const sx of [-0.07, 0.07]) {
      const leg = new THREE.Mesh(makeBoxGeo(0.1, 0.1, 0.12), tmat);
      leg.position.set(sx, 0.05, 0.03);
      ted.add(leg);
    }
    const teye = stdMat({ color: 0x141210 });
    for (const sx of [-0.05, 0.05]) {
      const e = new THREE.Mesh(new THREE.SphereGeometry(0.012, 4, 3), teye);
      e.position.set(sx, 0.43, 0.075);
      ted.add(e);
    }
    ted.position.set(2.1, 0, 12.6);
    ted.rotation.y = 0.4;
    this.scene.add(ted);
    // growth chart on the east wall
    this.decalWall(8.285, 9.4, 0.75, 0.16, 1.55, t.growth, 'w');
    // doll teleport spots (creepy: one is out in the corridor)
    this.dollSpots = [
      { x: 7.9, z: 9.9, ry: Math.PI },
      { x: 2.0, z: 15.0, ry: 0 },
      { x: 5.0, z: 11.2, ry: Math.PI / 2 },
      { x: 0.45, z: 11.4, ry: -Math.PI / 2 },
      { x: 7.0, z: 13.8, ry: Math.PI },
    ];

    // ---------- corridor props ----------
    this.decalFloor(-0.5, 6.2, 0.42, 0.56, t.news, 0.4);
    this.decalFloor(0.6, 19.2, 0.42, 0.56, t.news, 1.2);
    this.decalFloor(-0.4, 33.2, 0.42, 0.56, t.news, 2.0);
    this.decalFloor(0.3, 47.2, 0.42, 0.56, t.news, 0.8);
    const chair = this.box(-0.7, 17.2, 0, 0.45, 0.45, 0.5, M.darkWood, { geo: { ao: 'none' } });
    chair.rotation.z = Math.PI / 2;
    chair.position.y = 0.24;
    // bicycle
    const bike = new THREE.Group();
    const wheelGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.05, 7);
    const wheelMat = stdMat({ color: 0x1a1c1e, roughness: 0.65, metalness: 0.25 });
    for (const wx of [-0.45, 0.45]) {
      const wh = new THREE.Mesh(wheelGeo, wheelMat);
      wh.rotation.x = Math.PI / 2;
      wh.position.set(wx, 0.32, 0);
      bike.add(wh);
    }
    const frame = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.07, 0.07), stdMat({ color: 0x6a2c24, roughness: 0.55, metalness: 0.15 }));
    frame.position.set(0, 0.62, 0);
    bike.add(frame);
    const handle = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.06, 0.06), stdMat({ color: 0x555a60, roughness: 0.5, metalness: 0.3 }));
    handle.position.set(0.55, 0.85, 0);
    bike.add(handle);
    bike.position.set(-0.72, 0, 21.5);
    bike.rotation.y = 0.2;
    bike.rotation.z = 0.06;
    this.scene.add(bike);
    this.colliders.push(boxAABB(-0.72, 0.5, 21.5, 1.3, 1.0, 0.5));
    this.props.bike = bike;
    // graffiti poster + ofuda + exit sign
    this.decalWall(-1.085, 30, 1.4, 1.3, 0.65, t.graffiti, 'e');
    this._ofuda(1.05, 3.6, 2.5);
    const sign = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.28, 0.06), M.exitSign);
    sign.position.set(0, 2.42, 57.4);
    this.scene.add(sign);
    // stopped wall clock (3:33) - lit material so it doesn't glow white in the dark
    // mounted on the south wall inner face (wall at x=1.2, inner face ~1.085)
    const clock = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.03, 12),
      stdMat({ map: t.clock, roughness: 0.6 }));
    clock.position.set(1.075, 1.7, 26.5);
    clock.rotation.z = Math.PI / 2;
    this.scene.add(clock);
    // light switches are created in _buildLights (they need the fixture list
    // to link to) - see the end of _buildLights.
    // upper-floor window (NORTH wall x=-1.0, inner face -0.9: the pane must
    // face +x into the corridor, so the face parameter is 'e', not 'n' -
    // 'n' left the plane edge-on to the player)
    this._window(-0.9, 20, 3.55, 'e');
    // raised floor segment (z 24..32) has its top at y=0.16: the decal must
    // sit on 0.172, not 0.012 (it was buried under the floor and invisible)
    this.decalFloor(0, 30.6, 0.8, 1.2, t.blood, 0.4, 0.172);
    this.decalWall(0.915, 29.4, 3.2, 0.3, 0.6, t.handprint, 'w', 0.2);
    this.decalWall(0.915, 31.5, 3.4, 0.4, 0.5, t.blood, 'w', 0.1);
    // green exit glow above the upper door (dim: a 2.6 light at 0.4m from the
    // wall blew the wall out white around the sign)
    const exitGlow = new THREE.PointLight(0x3fa05a, 0.9, 4, 1.9);
    exitGlow.position.set(0.6, 3.3, 30.6);
    this.scene.add(exitGlow);
    // hanging ropes in the west stairwell shaft
    this.props.ropes = [];
    for (const [rx, rz, rl] of [[-0.6, 0.5, 1.6], [-0.95, 1.15, 1.1], [-0.45, 0.15, 1.3]]) {
      const g = new THREE.Group();
      g.position.set(rx, 5.2, rz);
      const rope = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.007, rl, 4),
        stdMat({ color: 0x3a322a, roughness: 0.9 }));
      rope.position.y = -rl / 2;
      g.add(rope);
      this.scene.add(g);
      this.props.ropes.push(g);
    }
    // the eyes wall (revealed behind the dead door) — the brick backing spans
    // x -1.92..-1.78 (corridor-facing side x=-1.78), z 48.6..49.8. The decal
    // must face +x INTO the corridor ('e'), centered on the brick — the old
    // 's' orientation at the gap's edge showed it edge-on: invisible.
    const eyes = this.decalWall(-1.765, 49.2, 1.05, 1.1, 2.0, t.eyesWall, 'e', 0, false);
    eyes.visible = false;
    this.props.eyesWall = eyes;
    // vertical blood drag on the south wall (inner face x=1.1)
    this.decalWall(1.115, 28.0, 0.75, 0.32, 1.6, t.blood, 'w', 0.12);
    // cardboard boxes
    for (const [bx, bz, br] of [[-0.7, 43.2, 0.3], [0.75, 43.6, -0.4], [-0.75, 44.0, 0.7]]) {
      const b = this.box(bx, bz, 0, 0.55, 0.5, 0.5, stdMat({ color: 0x6e5a38, roughness: 0.9 }), { geo: { ao: 'wall' } });
      b.rotation.y = br;
    }
    // fallen ceiling panel + debris
    this.box(0.35, 38.6, 0.02, 0.8, 0.55, 0.03, M.ceiling, { geo: { ao: 'none' }, collide: false });
    this.box(-0.4, 38.9, 0.02, 0.25, 0.18, 0.03, M.ceiling, { geo: { ao: 'none' }, collide: false });
    this.box(0.75, 38.35, 0.015, 0.15, 0.2, 0.025, M.ceiling, { geo: { ao: 'none' }, collide: false });
    // windows (moonlight) — x is the wall's inner face so the sill/plane/bars
    // sit proud of it, not buried in the wall
    this._window(-8.3, 2.6, 1.0, 'e');
    this._window(-8.3, 14.0, 1.0, 'e');
    this._window(-13.7, 10.75, 1.0, 'e');

    // blood stain under the futon corner
    this.decalFloor(-13.4, 15.0, 0.9, 1.1, t.blood, 0.1);
  }

  _candle(x, z, yTop) {
    this.box(x, z, yTop - 0.14, 0.05, 0.05, 0.14, stdMat({ color: 0xcfc8b0, roughness: 0.9 }), { geo: { ao: 'none' }, collide: false });
    const flame = new THREE.Mesh(
      new THREE.SphereGeometry(0.022, 5, 4),
      basicMat({ color: 0xffc060 })
    );
    flame.position.set(x, yTop + 0.02, z);
    this.scene.add(flame);
    const light = new THREE.PointLight(0xff8a3a, 1.8, 4, 1.9);
    light.position.set(x, yTop + 0.06, z);
    this.scene.add(light);
    this.candles.push({ light, base: 1.8, phase: rand(0, 6.28) });
    return flame;
  }

  _ofuda(x, z, y) {
    const line = new THREE.Mesh(
      new THREE.CylinderGeometry(0.003, 0.003, 0.24, 4),
      stdMat({ color: 0x2a2824, roughness: 0.9 })
    );
    line.position.set(x, y, z);
    const paper = new THREE.Mesh(new THREE.PlaneGeometry(0.09, 0.24), this.materials.ofuda);
    paper.position.set(x, y - 0.24, z);
    this.scene.add(line);
    this.scene.add(paper);
    this.ofudas.push(paper);
    return paper;
  }

  _window(x, z, y, face) {
    const M = this.materials;
    const win = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.8), M.moonWin);
    const lx = face === 'e' ? 0.02 : face === 'w' ? -0.02 : 0;
    const lz = face === 'n' ? -0.02 : face === 's' ? 0.02 : 0;
    win.position.set(x + lx, y, z + lz);
    if (face === 'e') win.rotation.y = Math.PI / 2;
    else if (face === 'w') win.rotation.y = -Math.PI / 2;
    else if (face === 's') win.rotation.y = Math.PI;
    this.scene.add(win);
    // rain-streak overlay: a transparent second pane, just in front of the
    // moonlit glass, ties the storm ambience to the visuals.
    const rainMat = basicMat({
      map: this.tex.rainStreaks, transparent: true, opacity: 0.55,
      depthWrite: false, side: THREE.DoubleSide,
    });
    const rain = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 0.8), rainMat);
    const ox = face === 'e' ? 0.005 : face === 'w' ? -0.005 : 0;
    const oz = face === 'n' ? -0.005 : face === 's' ? 0.005 : 0;
    rain.position.set(win.position.x + ox, win.position.y, win.position.z + oz);
    rain.rotation.copy(win.rotation);
    rain.renderOrder = 3;
    this.scene.add(rain);
    const light = new THREE.PointLight(0x6a8cb4, 0.8, 7, 1.9);
    // place the moonlight source outside the building:
    // north=-x, south=+x, east=+z, west=-z
    light.position.set(
      x + (face === 'n' ? -0.6 : face === 's' ? 0.6 : 0), y,
      z + (face === 'e' ? 0.6 : face === 'w' ? -0.6 : 0),
    );
    this.scene.add(light);
    this.windowLights.push(light);
    const barMat = stdMat({ color: 0x0c0e12, roughness: 0.65, metalness: 0.25 });
    const frameMat = stdMat({ color: 0x2e2620, roughness: 0.85 });
    if (face === 'e' || face === 'w') {
      const fx = x + (face === 'e' ? 0.03 : -0.03);
      // window frame: lintel, stool, two jambs + a cross mullion (proud of the
      // wall, giving the pane real depth instead of a flat decal)
      this.box(fx, z, y + 0.37, 0.05, 0.94, 0.05, frameMat, { geo: { ao: 'none' }, collide: false, cast: false });
      this.box(fx, z, y - 0.37, 0.05, 0.94, 0.05, frameMat, { geo: { ao: 'none' }, collide: false, cast: false });
      this.box(fx, z - 0.42, y, 0.05, 0.05, 0.79, frameMat, { geo: { ao: 'none' }, collide: false, cast: false });
      this.box(fx, z + 0.42, y, 0.05, 0.05, 0.79, frameMat, { geo: { ao: 'none' }, collide: false, cast: false });
      this.box(fx, z, y, 0.04, 0.05, 0.79, frameMat, { geo: { ao: 'none' }, collide: false, cast: false });
      this.box(fx, z, y - 0.185, 0.05, 0.79, 0.04, frameMat, { geo: { ao: 'none' }, collide: false, cast: false });
      for (const dz of [-0.26, 0, 0.26]) {
        const bar = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.75, 0.02), barMat);
        bar.position.set(x + (face === 'e' ? 0.045 : -0.045), y, z + dz);
        this.scene.add(bar);
      }
      // sill — must protrude INTO the room from the wall inner face `x`.
      // Center it 0.05 from the face (0.1 deep => face..face+0.1, flush).
      this.box(x + (face === 'e' ? 0.05 : -0.05), z, y - 0.41, 0.1, 0.86, 0.04, M.darkWood, {
        geo: { ao: 'none' }, collide: false, cast: false,
      });
    } else {
      const fz = z + (face === 'n' ? -0.03 : 0.03);
      this.box(x, fz - 0.37, y, 0.94, 0.05, 0.05, frameMat, { geo: { ao: 'none' }, collide: false, cast: false });
      this.box(x, fz + 0.37, y, 0.94, 0.05, 0.05, frameMat, { geo: { ao: 'none' }, collide: false, cast: false });
      this.box(x - 0.42, fz, y, 0.05, 0.05, 0.79, frameMat, { geo: { ao: 'none' }, collide: false, cast: false });
      this.box(x + 0.42, fz, y, 0.05, 0.05, 0.79, frameMat, { geo: { ao: 'none' }, collide: false, cast: false });
      this.box(x, fz, y, 0.79, 0.04, 0.05, frameMat, { geo: { ao: 'none' }, collide: false, cast: false });
      this.box(x, fz, y - 0.185, 0.79, 0.05, 0.04, frameMat, { geo: { ao: 'none' }, collide: false, cast: false });
      for (const dx of [-0.26, 0, 0.26]) {
        const bar = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.75, 0.02), barMat);
        bar.position.set(x + dx + (face === 'n' ? 0.015 : -0.015), y, z + (face === 'n' ? -0.045 : 0.045));
        this.scene.add(bar);
      }
      this.box(x + (face === 'n' ? 0.045 : -0.045), z + (face === 'n' ? 0.03 : -0.03), y - 0.41, 0.86, 0.1, 0.04, M.darkWood, {
        geo: { ao: 'none' }, collide: false, cast: false,
      });
    }
    return win;
  }

  _doll(x, z) {
    const group = new THREE.Group();
    const pale = stdMat({ color: 0xd8d2c4, roughness: 0.85 });
    const body = new THREE.Mesh(makeBoxGeo(0.14, 0.24, 0.1, { jitter: 0.004 }), pale);
    body.position.y = 0.12;
    group.add(body);
    const head = new THREE.Mesh(makeBoxGeo(0.13, 0.13, 0.12, { jitter: 0.01 }), pale);
    head.position.y = 0.32;
    group.add(head);
    const face = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.1), basicMat({ map: this.tex.dollFace }));
    face.position.set(0, 0.32, 0.062);
    group.add(face);
    const skirt = new THREE.Mesh(makeBoxGeo(0.18, 0.12, 0.14, { jitter: 0.004 }), stdMat({ color: 0x7a1a1a, roughness: 0.9 }));
    skirt.position.y = 0.06;
    group.add(skirt);
    // hair + limbs
    const hair = new THREE.Mesh(makeBoxGeo(0.14, 0.07, 0.13, { jitter: 0.008 }), stdMat({ color: 0x1c1410, roughness: 0.95 }));
    hair.position.y = 0.4;
    group.add(hair);
    const limb = (w, h, d, lx, ly, lz) => {
      const m = new THREE.Mesh(makeBoxGeo(w, h, d, { jitter: 0.004 }), pale);
      m.position.set(lx, ly, lz);
      group.add(m);
      return m;
    };
    const armL = limb(0.05, 0.2, 0.05, -0.1, 0.2, 0);
    const armR = limb(0.05, 0.2, 0.05, 0.1, 0.2, 0);
    // legs stand flush on the floor (bottom at y=0, not sunk 0.05 into it)
    limb(0.06, 0.14, 0.07, -0.05, 0.07, 0.04);
    limb(0.06, 0.14, 0.07, 0.05, 0.07, 0.04);
    group.position.set(x, 0, z);
    group.rotation.y = Math.PI;
    this.scene.add(group);
    return { mesh: group, head, armL, armR, turned: false };
  }

  // ---------------------------------------------------------------- decals
  _buildDecals() {
    const t = this.tex;
    const rng = this.rng;
    // blood trail from child-room door eastward along corridor south side
    for (let z = 11.6; z < 26; z += 0.9) {
      const s = 0.3 + rng() * 0.5;
      this.decalFloor(0.55 + rng() * 0.5, z + rng() * 0.4, s, s * (0.5 + rng()), t.blood, rng() * 3);
    }
    // handprints near child door (corridor side of south wall, inner face x=1.1)
    this.decalWall(1.115, 10.5, 1.25, 0.22, 0.22, t.handprint, 'w', 0.4);
    this.decalWall(1.115, 10.9, 0.95, 0.22, 0.22, t.handprint, 'w', -0.3);
    // bathroom smears — bathroom's east wall is at x=-13.8 (x -13.9..-13.7);
    // the bathroom-side inner face is x=-13.9, so the decals must hang at
    // x≈-13.915 facing +x. They were placed at -13.685 facing 'w', i.e.
    // inside the wall on the BEDROOM side - invisible from both rooms.
    this.decalWall(-13.93, 17.6, 1.2, 0.6, 0.5, t.blood, 'e', 0.1);
    this.decalWall(-13.93, 19.4, 0.7, 0.3, 0.3, t.handprint, 'e', 0.6);
    // bedroom wall blood (west side of shared wall, x = -8.5)
    this.decalWall(-8.515, 13.6, 1.1, 0.5, 0.4, t.blood, 'e', 0.2);
    // corridor stains
    this.decalFloor(0.9, 30.6, 0.5, 0.7, t.blood, 0.6, 0.172); // on the raised floor (top 0.16)
    this.decalWall(-1.085, 24.4, 0.5, 0.3, 0.25, t.blood, 'e', 0.1);
  }

  // ---------------------------------------------------------------- lights
  _buildLights() {
    const M = this.materials;
    // One shared emissive tube material for every fixture: when a light dies
    // or is switched off, its tube must go dark too (a lit tube over a dead
    // light read as a floating white slab - one of the "white blob" reports).
    // One shared tube material pair for every fixture. The tubes are UNLIT
    // (MeshBasic): the point light sits only 0.19m above them, and a lit tube
    // accumulated its own light to 255 at distance - a white band down every
    // corridor view. A fixed-brightness material reads as a glowing tube but
    // can never be blown out by any light.
    const tubeMat = basicMat({ color: 0xc9d2d6 });
    this.tubeMat = tubeMat;
    // dead tube: dark glass
    this.tubeOffMat = basicMat({ color: 0x1e2124 });

    // A fixture = metal channel + two end caps + emissive tube just below the
    // channel's lip. The channel visually shields the ceiling from the point
    // light, so the blown-out pool a bare bulb paints on the ceiling reads as
    // a thin natural light spill instead of a white blob.
    const make = (x, z, y, base, color, mode, dist = 9, len = 1.06) => {
      const light = new THREE.PointLight(color, base, dist, 1.8);
      light.position.set(x, y - 0.05, z);
      this.scene.add(light);
      // channel housing (open at the bottom)
      const fix = new THREE.Mesh(
        new THREE.BoxGeometry(0.24, 0.09, len + 0.09),
        stdMat({ color: 0x3c4046, roughness: 0.6, metalness: 0.25 }),
      );
      fix.position.set(x, y + 0.06, z);
      fix.castShadow = false;
      this.scene.add(fix);
      // end caps
      const capMat = stdMat({ color: 0x2c2f34, roughness: 0.6, metalness: 0.2 });
      for (const dz of [-len / 2 - 0.035, len / 2 + 0.035]) {
        const cap = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.11, 0.06), capMat);
        cap.position.set(x, y + 0.06, z + dz);
        this.scene.add(cap);
      }
      // the tube itself (emissive; toggled with the light)
      const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, len, 6), tubeMat);
      tube.rotation.x = Math.PI / 2;
      tube.position.set(x, y + 0.005, z);
      this.scene.add(tube);
      this.fluorescents.push({
        light, base, mode, phase: rand(0, 6.28), seed: (Math.random() * 1e9) | 0,
        rng: mulberry32((Math.random() * 1e9) | 0), x, z, y, tube,
        flickState: 1, flickT: rand(0, 2), userOff: false,
      });
      return light;
    };
    const cold = 0x9fc4d8;
    const green = 0xa8c8c0;
    const zs = [-0.5, 3.5, 7.8, 12.3, 16.9, 21.5, 26.1, 30.7, 35.3, 39.9, 44.5, 49.1, 53.7, 56.9];
    zs.forEach((z, i) => {
      const mode = i === 4 || i === 9 ? 'bad' : i === 12 ? 'dead' : i % 5 === 2 ? 'flicker' : 'steady';
      // 2.4 (down from 2.8): a corridor light plus the working flashlight used
      // to blow out the upper wall band when the player stood next to it.
      make(0, z, 2.56, 2.4, green, mode);
    });
    make(0, -1.4, 2.56, 2.6, cold, 'flicker');
    make(-4.8, 3.8, 2.56, 3.0, cold, 'steady');
    make(-4.8, 12.0, 2.56, 3.0, green, 'flicker');
    make(-11.0, 12.0, 2.56, 2.6, green, 'bad');
    make(-15.7, 18.0, 2.56, 2.5, green, 'flicker');
    make(-15.5, 14.3, 2.06, 0, cold, 'dead', 6, 0.7); // short: the passage is only 1.0m wide
    make(4.8, 4.5, 2.56, 2.4, 0xffb066, 'flicker');
    make(4.8, 12.5, 2.56, 2.6, green, 'bad');
    // bathroom water heater: a dim red pulse.
    // Bathroom east wall spans x -13.9..-13.7; the bathroom-side inner face
    // is x=-13.9, so the heater body must sit at x≈-13.94 to protrude INTO
    // the bathroom (the old -13.86/-13.84 put it inside the wall).
    const heater = new THREE.PointLight(0x8a1a10, 1.2, 4, 1.9);
    heater.position.set(-14.55, 2.3, 16.7);
    this.scene.add(heater);
    this.box(-13.94, 16.7, 2.05, 0.08, 0.3, 0.5, M.rust, { geo: { ao: 'wall' }, collide: false, cast: false });
    this.fluorescents.push({
      light: heater, base: 1.2, mode: 'bad', phase: rand(0, 6.28), seed: (Math.random() * 1e9) | 0,
      rng: mulberry32((Math.random() * 1e9) | 0), x: -14.55, z: 16.7, y: 2.3, tube: null,
      flickState: 1, flickT: 0, userOff: false,
    });
    const uz = [2.5, 8.5, 14.5, 20.5, 26.5, 32.5, 38.5, 44.5, 50.5, 56.5, 61.5];
    uz.forEach((z, i) => {
      make(0, z, 5.06, 2.4, green, i % 3 === 0 ? 'bad' : 'flicker', 8);
    });

    // ---- interactive light switches (created here: linking needs fixtures) ----
    // aged bakelite plates, deliberately NOT pale/white (a bright plate beside
    // the flashlight hotspot clips to pure white and reads as a glitch blob).
    // Each switch is wired to a specific fixture - flipping it actually works.
    const switchMat = stdMat({ color: 0x8f8676, roughness: 0.92 });
    const nubMat = stdMat({ color: 0x6a6355, roughness: 0.85 });
    const findFluor = (lx, lz) =>
      this.fluorescents.find((f) => Math.abs(f.x - lx) < 0.01 && Math.abs(f.z - lz) < 0.01);
    this.props.switches = [];
    const swSpots = [
      [-1.085, 4.55, -4.8, 3.8],    // kitchen door -> kitchen room light
      [-1.085, 11.35, -4.8, 12.0],  // living door  -> living room light
      [1.085, 4.3, 4.8, 4.5],       // altar door   -> altar room light
      [-1.375, 49.95, 0, 49.1],     // dead door    -> its corridor light
    ];
    for (const [sx, sz, lx, lz] of swSpots) {
      const plate = this.box(sx, sz, 1.18, 0.02, 0.1, 0.14, switchMat, { geo: { ao: 'wall' }, collide: false, cast: false });
      const nub = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.028, 0.045), nubMat);
      nub.position.set(sx + (sx > 0 ? 0.017 : -0.017), 1.26, sz);
      this.scene.add(nub);
      const rec = { plate, nub, fluor: findFluor(lx, lz), on: true, baseY: 1.26 };
      this.props.switches.push(rec);
      this.regInteractable(plate, '电灯开关', 2.0, () => this.handlers.onSwitch?.(rec));
    }
  }

  // ---------------------------------------------------------------- nodes / triggers
  _buildNodes() {
    // corridor nodes: z 24..32 is the raised floor segment (top y=0.16) -
    // nodes there must carry that height or the monster teleports 0.16m INTO
    // the slab. z 59.5 sat inside the east staircase (buried 1.5m deep); the
    // pre-stairs corridor z 57.5 is the correct stalking spot.
    const cz = [-1, 3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43, 47, 51, 55, 57.5];
    for (const z of cz) {
      this.monsterNodes.push({ x: 0, z, y: z >= 24 && z < 32 ? 0.16 : 0 });
    }
    // upper nodes: z 60.5 at x=0 floats over the stairwell opening - the
    // catwalk strip (x 0.75) is the only floor there
    const uz = [4, 12, 20, 28, 36, 44, 52, 62.5];
    for (const z of uz) this.monsterNodes.push({ x: 0, z, y: 2.8 });
    this.monsterNodes.push({ x: 0.75, z: 60.5, y: 2.8 });
    // room nodes (monster teleport targets) - must sit on clear floor, not
    // inside furniture (the old (-4.8,12.5) was inside the living room's
    // coffee table, so the monster popped out of the table)
    for (const [x, z] of [[-4.8, 4.5], [-2.8, 13.8], [-11, 12.5], [-15.5, 17.5], [4.8, 4.5], [4.8, 12]]) {
      this.monsterNodes.push({ x, z, y: 0 });
    }
    this.ghostSpawns = [
      { x: -2.6, z: 3.8, ry: 0 }, { x: -2.6, z: 10.6, ry: 0 },
      { x: 2.6, z: 10.6, ry: Math.PI }, { x: 2.6, z: 3.6, ry: Math.PI },
      { x: -1.9, z: 49.2, ry: 0 },
      { x: 0, z: 20, ry: Math.PI / 2 }, { x: 0, z: 40, ry: Math.PI / 2 },
      { x: 0, z: 30, ry: 0, y: 2.8 },
    ];
    const zone = (x0, z0, x1, z1, id, y0 = -10, y1 = 10) => {
      this.triggers.push({ aabb: { x0, y0, z0, x1, y1, z1 }, id, fired: false });
    };
    zone(-8.4, 0, -1.3, 7.5, 'kitchen');
    zone(-8.4, 7.5, -1.3, 15.5, 'living');
    zone(-13.8, 7.5, -8.4, 15.5, 'bedroom');
    zone(-17.6, 14.8, -13.8, 21, 'bathroom');
    zone(-16.4, 13.8, -14.6, 14.8, 'passage');
    zone(1.3, 0, 8.4, 8.5, 'altar');
    zone(1.3, 8.5, 8.4, 15.5, 'child');
    zone(-2, 10, 2, 58, 'upper', 2.3, 8);
    zone(-1.2, 24, 1.2, 30, 'corridorMid', 0, 2.2);
    zone(-1.2, 57.5, 1.2, 61, 'stairsEast', 0, 2.2);
    zone(0.95, 29.2, 2.4, 31.8, 'exitVoid', 2.3, 8);
  }

  checkTriggers(p) {
    for (const t of this.triggers) {
      if (t.fired) continue;
      const b = t.aabb;
      if (p.x >= b.x0 && p.x <= b.x1 && p.y >= b.y0 && p.y <= b.y1 && p.z >= b.z0 && p.z <= b.z1) {
        t.fired = true;
        this.handlers[`zone_${t.id}`]?.(t);
      }
    }
  }

  humLevel(p) {
    let best = 0;
    for (const f of this.fluorescents) {
      if (f.light.intensity <= 0.05) continue;
      const d = Math.hypot(f.x - p.x, f.z - p.z);
      if (d < 10) best = Math.max(best, (1 - d / 10) * clamp(f.light.intensity / f.base, 0, 1));
    }
    return best;
  }

  update(dt, time, playerPos = null) {
    this.updateDoors(dt);
    for (const c of this.candles) {
      const v = 0.75 + 0.25 * Math.sin(time * 9 + c.phase) * Math.sin(time * 13.7 + c.phase * 2);
      c.light.intensity = c.base * clamp(v + rand(-0.08, 0.08), 0.3, 1.2);
    }
    for (let i = 0; i < this.ofudas.length; i++) {
      this.ofudas[i].rotation.z = Math.sin(time * 0.8 + i * 1.7) * 0.09;
    }
    // hanging ropes sway, paper-crane mobile turns
    for (let i = 0; i < (this.props.ropes?.length || 0); i++) {
      this.props.ropes[i].rotation.z = Math.sin(time * 0.7 + i * 1.9) * 0.05;
      this.props.ropes[i].rotation.x = Math.cos(time * 0.55 + i) * 0.03;
    }
    if (this.props.mobile) this.props.mobile.rotation.y = time * 0.5;
    // fūrin sways on the wind: gusty, slightly arrhythmic (it should feel
    // breathed-on rather than pendulum-neat)
    if (this.props.furin) {
      const f = this.props.furin;
      f.rotation.z = Math.sin(time * 1.7) * 0.05 + Math.sin(time * 4.3 + 1.2) * 0.03;
      f.rotation.x = Math.cos(time * 1.3 + 0.6) * 0.04 + Math.sin(time * 3.7) * 0.02;
    }
    // the dripping pipe joint near z 33
    if (playerPos) {
      this.dripT = (this.dripT ?? 0) - dt;
      if (this.dripT <= 0) {
        this.dripT = rand(2.2, 4.5);
        if (Math.hypot(playerPos.x - -1.05, playerPos.z - 33) < 7) this.handlers.onDrip?.();
      }
    }
    for (const f of this.fluorescents) {
      // NOTE: the old code rebuilt mulberry32(f.seed) every frame and drew the
      // FIRST value - a constant - so 'flicker' lights never actually flickered.
      // Proper state machine: hold each state for a random duration, then pick
      // the next one (mostly on, occasional stutters - a dying fluorescent).
      let v = 1;
      if (f.kill || f.userOff) v = 0;
      else if (f.mode === 'steady') v = 1;
      else if (f.mode === 'flicker') {
        f.flickT -= dt;
        if (f.flickT <= 0) {
          const n = f.rng();
          if (f.flickState === 1) {
            // was on: 8% chance of a stutter burst
            if (n < 0.08) { f.flickState = n < 0.03 ? 0.05 : 0.3; f.flickT = 0.04 + f.rng() * 0.14; }
            else { f.flickState = 1; f.flickT = 0.5 + f.rng() * 3.2; }
          } else {
            f.flickState = 1;
            f.flickT = 0.05 + f.rng() * 0.3;
          }
        }
        v = f.flickState;
      } else if (f.mode === 'bad') {
        v = Math.sin(time * 31 + f.phase) > 0.3 ? 0.5 + f.rng() * 0.4 : 0.04;
      } else if (f.mode === 'dead') v = 0;
      if (f.boost > 0) { f.boost -= dt; v *= 1.8; }
      f.light.intensity = f.base * v;
      // the tube glows with the light (dead tube = dark glass)
      if (f.tube) f.tube.material = v > 0.25 ? this.tubeMat : this.tubeOffMat;
    }
  }
}
