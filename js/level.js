// level.js — the abandoned apartment: geometry, colliders, doors, lights,
// props, pickups and trigger zones. All coordinates in meters.
// North = -x, South = +x, East = +z.
import * as THREE from '../vendor/three.module.js';
import { beveledBoxGeometry, detailMaterials, doorDetails } from './models.js';
import { createTextures } from './textures.js';
import { buildCampaignWorld } from './campaign-world.js';
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

    this.stairs = [];
    this.colliders = [];       // static AABBs
    this.doors = [];          // dynamic doors
    this.interactables = [];  // {mesh, label, action, dist, once}
    this.triggers = [];       // {aabb, id}
    this.fluorescents = [];   // {light, base, mode, phase, seed}
    this.candles = [];
    this.tvLight = null;
    this.windowLights = [];
    this.ceilings = [];
    this.notePickups = [];
    this.props = {};
    this.monsterNodes = [];
    this.ghostSpawns = [];
    this.ofudas = [];
    this.playerStart = new THREE.Vector3(0, 0, -6.4);

    this.materials = this._makeMaterials();
    this._build();
    this._buildDoors();
    this._buildProps();
    this._buildDecals();
    this._buildLights();
    buildCampaignWorld(this);
    this._buildNodes();
    this._initPerf();
  }

  // ---------------------------------------------------------------- perf
  /* 性能基建（视觉不变）。
     前向渲染里每个着色像素都要遍历全部点光源：本关有 40+ 盏，是卡顿主因。
     灯光预算只保留对画面真正有贡献的最近/视野内的灯；可见灯数量恒定，
     避免three.js因灯光数变化反复编译着色器变体。
     关卡几何构建后静止不动，冻结其矩阵省掉每帧 updateMatrixWorld 遍历。 */
  _initPerf() {
    this._cullable = [];
    const dead = new Set();
    for (const f of this.fluorescents) if (f.mode === 'dead' || f.base === 0) dead.add(f.light);
    this.scene.traverse((o) => {
      if (!o.isPointLight) return;
      if (dead.has(o)) { o.visible = false; return; } // 常灭灯永不参与着色
      this._cullable.push(o);
    });
    this.lightBudget = Math.min(14, this._cullable.length);
    this._budgetT = -1; // <0 → 首次 update 立即分配
    this._viewDir = new THREE.Vector3(0, 0, 1);
    this._lastCam = { x: this.playerStart.x, y: this.playerStart.y, z: this.playerStart.z };
    this._freezeStaticMatrices();
    this._applyLightBudget(this._lastCam.x, this._lastCam.y, this._lastCam.z);
  }

  _freezeStaticMatrices() {
    const dynamic = new Set();
    const keepTree = (o) => { if (o) o.traverse((c) => dynamic.add(c)); };
    for (const d of this.doors) keepTree(d.pivot);
    const P = this.props;
    keepTree(P.cabinet?.pivot);
    keepTree(P.doll?.mesh);
    keepTree(P.mobile);
    keepTree(P.furin);
    keepTree(P.campaignDynamic);
    for (const r of P.ropes || []) dynamic.add(r);
    for (const o of this.ofudas) dynamic.add(o);
    for (const b of P.batteries || []) dynamic.add(b.halo);
    this.scene.traverse((o) => {
      if (dynamic.has(o) || o.isLight || o.isCamera) return;
      o.matrixAutoUpdate = false;
      o.updateMatrix();
    });
  }

  /* 运行期临时灯（演出用逆光等）纳入预算管理，注册/注销都立即重新分配，
     保证任意渲染帧的可见灯数量恒定（= 不触发新的着色器变体编译）。 */
  registerLight(light) {
    if (!light || !light.isPointLight || this._cullable.includes(light)) return;
    this._cullable.push(light);
    light.visible = false;
    this._applyLightBudgetNow();
  }

  unregisterLight(light) {
    const i = this._cullable.indexOf(light);
    if (i >= 0) this._cullable.splice(i, 1);
    light.visible = false;
    this._applyLightBudgetNow();
  }

  _applyLightBudgetNow() {
    const c = this._lastCam;
    this._applyLightBudget(c.x, c.y, c.z);
  }

  _applyLightBudget(px, py, pz) {
    this._lastCam.x = px; this._lastCam.y = py; this._lastCam.z = pz;
    const K = this.lightBudget;
    const list = this._cullable;
    const n = list.length;
    if (n <= K) { for (let i = 0; i < n; i++) list[i].visible = true; return; }
    const fdx = this._viewDir.x, fdz = this._viewDir.z;
    const fl = Math.hypot(fdx, fdz) || 1;
    const scored = this._scored || (this._scored = new Array(n));
    for (let i = 0; i < n; i++) {
      const l = list[i];
      const dx = l.position.x - px, dy = l.position.y - py, dz = l.position.z - pz;
      let s = dx * dx + dz * dz + dy * dy * 0.6; // 楼层差压权：隔层灯贡献≈0
      const dl = Math.sqrt(dx * dx + dz * dz) || 1;
      const dot = (dx * fdx + dz * fdz) / (dl * fl);
      if (dot > 0.3) s *= 0.4;                   // 视野前方：光池看得见，优先保留
      else if (dot < -0.4 && s > 49) s *= 3;     // 身后 7m 外：最先让位
      if (l.intensity <= 0.001) s += 1e7;        // 熄灭的灯仅作占位，维持数量恒定
      if (l.visible) s *= 0.75;                  // 滞回：上一轮亮着的优先续留防抖动
      if (scored[i]) { scored[i].l = l; scored[i].s = s; } else scored[i] = { l, s };
    }
    scored.length = n;
    scored.sort((a, b) => a.s - b.s);
    for (let i = 0; i < K; i++) scored[i].l.visible = true;
    for (let i = K; i < n; i++) scored[i].l.visible = false;
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
    const geo = opts.geo?.bevel ? beveledBoxGeometry(w,h,d) : makeBoxGeo(w, h, d, opts.geo || {});
    const mesh = new THREE.Mesh(geo, opts.material || mat);
    mesh.position.set(x, y + h / 2, z);
    mesh.castShadow = opts.cast ?? true;
    mesh.receiveShadow = opts.receive ?? true;
    this.scene.add(mesh);
    // boxAABB takes the CENTER; y here is the bottom of the box
    if (opts.collide !== false) {
      const collider = boxAABB(x, y + h / 2, z, w, h, d);
      this.colliders.push(collider);
      mesh.userData.collider = collider;
    }
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
    const mesh = this.box(x, z, yTop - 0.12, w, d, 0.12, mat, {
      geo: { uv: uv || [w / 3, d / 3], ao: 'floor', aoStrength: 0.9 },
    });
    mesh.userData.collider.walkable = true;
    return mesh;
  }

  ceil(x, z, w, d, yBottom, mat) {
    const mesh = this.box(x, z, yBottom, w, d, 0.12, mat, {
      geo: { uv: [w / 3, d / 3], ao: 'ceil', aoStrength: 0.95 },
      cast: false,
      collide: true,
    });
    this.ceilings.push({x0:x-w/2,x1:x+w/2,z0:z-d/2,z1:z+d/2,y:yBottom});
    return mesh;
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
    // Main corridor widened to 3.2m inner (wall centers ±1.7) so the ghost
    // cannot pin the player against the wall as easily.
    this.wallX(-1.7, 0, 8, 0, CORR_H, M.plaster, [[3.2, 4.4]]);
    this.wallX(-1.7, 8, 20, 0, CORR_H, M.plaster, [[10.0, 11.2]]);
    this.wallX(-1.85, 20, 24, 0, CORR_H, M.plaster, []);
    // Long corridor (z 32..58) widened to 3.6m inner (wall centers ±1.9).
    this.wallX(-1.7, 24, 32, 0, CORR_H, M.plaster, []);
    this.wallX(-1.9, 32, 58, 0, CORR_H, M.plaster, [[48.6, 49.8]]);
    // south wall: altar door (3.0-4.2), child door (10.0-11.2)
    this.wallX(1.7, 0, 32, 0, CORR_H, M.plaster, [[3.0, 4.2], [10.0, 11.2], [19.8, 21.2]]);
    this.wallX(1.9, 32, 58, 0, CORR_H, M.plaster, [[43, 45]]);
    // jog walls closing the width transitions
    this.wallZ(20, -1.85, -1.7, 0, CORR_H, M.plaster);
    this.wallZ(24, -1.85, -1.7, 0, CORR_H, M.plaster);
    this.wallZ(32, -1.9, -1.7, 0, CORR_H, M.plaster);
    this.wallZ(32, 1.7, 1.9, 0, CORR_H, M.plaster);
    this.wallZ(58, -1.9, -1.7, 0, CORR_H, M.plaster);
    this.wallZ(58, 1.7, 1.9, 0, CORR_H, M.plaster);
    // 连续的公寓走廊；楼梯口位于走廊尽头的独立楼梯间。
    this.wallX(-1.7, 58, 61.7, 0, CORR_H, M.plaster);
    this.wallX(1.7, 58, 61.7, 0, CORR_H, M.plaster);
    this.floor(0, -1, 3.4, 2, 0, M.concrete);
    this.floor(0, 12, 3.6, 24, 0, M.woodFloor);
    this.floor(0, 28, 3.4, 8, 0, M.woodFloor);
    this.floor(0, 45, 3.8, 26, 0, M.woodFloor);
    this.floor(0, 59.85, 3.4, 3.7, 0, M.concrete);
    this.ceil(0, 12, 3.6, 24, 2.7, M.ceiling);
    this.ceil(0, 28, 3.4, 8, 2.7, M.ceiling);
    this.ceil(0, 45, 3.8, 26, 2.7, M.ceiling);
    this.ceil(0, 59.85, 3.4, 3.7, 2.7, M.ceiling);

    const UY = 2.8, UH = 2.4;
    this.floor(0, 30.85, 2, 61.7, UY, M.woodFloor);
    this.ceil(0, 31, 2, 62, UY + UH, M.ceiling);
    this.wallX(-1, 0, 61.7, UY, UH, M.plaster, [[20, 21.4], [40, 41.4], [55, 56.6]]);
    this.wallX(1, 0, 61.7, UY, UH, M.plaster, [[30, 31.2], [46, 47.4]]);
    this.wallZ(0, -1, 1, UY, UH, M.plaster);

    // 原来的玄关成为大厅通往住户区的门厅，没有地洞或陡梯。
    this.wallX(-1.7, -2, 0, 0, CORR_H, M.concrete);
    this.wallX(1.7, -2, 0, 0, CORR_H, M.concrete);
    this.ceil(0, -1, 3.4, 2, 2.7, M.ceiling);
    this.wallZ(-2, -1.7, 1.7, 0, CORR_H, M.plaster, [[-0.58, 0.58]]);
    this.box(-0.95, -1.5, 0, 0.3, 0.7, 1.0, M.darkWood, { geo: { ao: 'wall' } });

    // ===== rooms: north wing =====
    // kitchen  x -8.4..-1.3, z 0..7.5
    this.room(-8.4, -1.3, 0, 7.5, { n: true, w: true, s: true, e: false, wallMat: M.wallpaper });
    // living   x -8.4..-1.3, z 7.5..15.5
    this.room(-8.4, -1.3, 7.5, 15.5, { n: true, w: true, s: true, e: false, wallMat: M.wallpaper, gaps: { w: [[12.2, 13.4]] } });
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
    this.room(1.3, 8.4, 8.5, 15.5, { n: true, w: false, s: true, e: true, wallMat: M.wallpaper });

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
    // rusty body, mounted on the wall face. x is the wall center position;
    // place the body 0.025 proud of the wall inner face (inner = x - sgn*0.1).
    const bx = x - sgn * 0.125;
    this.box(bx, z, 0.15, 0.08, 1.5, 0.55, M.rust, { geo: { ao: 'wall', uv: [1.8, 0.8] } });
    // vertical rib columns on the front face (deeper profile so they read as
    // ribs in low-res, not noise)
    const ribMat = stdMat({ color: 0x4a4f56, roughness: 0.6, metalness: 0.22 });
    for (let i = 0; i < 7; i++) {
      this.box(bx - sgn * 0.075, z - 0.63 + i * 0.21, 0.22, 0.065, 0.07, 0.46, ribMat, {
        geo: { ao: 'none' }, collide: false, cast: false,
      });
    }
    // top grill + old valve knob
    this.box(bx, z, 0.72, 0.08, 1.4, 0.03, M.darkMetal, { geo: { ao: 'none' }, collide: false, cast: false });
    // 落地支脚 ×2：一眼读懂「立式暖气片」的剪影
    for (const fz of [z - 0.6, z + 0.6]) {
      this.box(bx, fz, 0.035, 0.1, 0.09, 0.09, M.rust, { geo: { ao: 'none' }, collide: false, cast: false });
    }
    // 连接墙面的供热横管（上端）+ 管箍：解释「它是接在墙上的」
    const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, sgn > 0 ? 0.16 : 0.16, 6),
      stdMat({ color: 0x5a4a42, roughness: 0.75, metalness: 0.25 }));
    pipe.rotation.z = Math.PI / 2;
    pipe.position.set(bx + sgn * 0.11, 0.68, z);
    this.scene.add(pipe);
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.042, 0.03, 6), M.darkMetal);
    collar.rotation.z = Math.PI / 2;
    collar.position.set(bx + sgn * 0.05, 0.68, z);
    this.scene.add(collar);
    const valve = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.05, 6),
      stdMat({ color: 0x7a2a24, roughness: 0.5, metalness: 0.2 }));
    valve.rotation.z = Math.PI / 2;
    valve.position.set(bx - sgn * 0.06, 0.34, z - 0.62);
    this.scene.add(valve);
    // 阀门十字把手（红色小十字，远看也能读出「这是个阀门」）
    const vh = new THREE.Group();
    for (const r of [0, Math.PI / 2]) {
      const bar = new THREE.Mesh(makeBoxGeo(0.008, 0.075, 0.02), stdMat({ color: 0x8a3028, roughness: 0.55 }));
      bar.rotation.x = r;
      vh.add(bar);
    }
    vh.position.set(bx - sgn * 0.1, 0.34, z - 0.62);
    this.scene.add(vh);
  }

  _buildTrim() {
    const M = this.materials;
    // baseboards: lower corridor (segmented to skip door gaps + wall jogs)
    // wall inner faces: x = -1.6 (wall at -1.7), -1.75 (wall at -1.85),
    // 1.6 (wall at 1.7), 1.75 (wall at 1.85), 1.4 (wall at 1.5)
    this._baseboard(-1.585, 0, 3.2, 0);
    this._baseboard(-1.585, 4.4, 10.0, 0);
    this._baseboard(-1.585, 11.2, 20, 0);
    this._baseboard(-1.735, 20, 24, 0);
    // the raised floor segment (z 24..32) has its top at y=0.16: baseboards
    // must sit ON it, not buried inside it (old y=0 left them 0.14 sunk)
    this._baseboard(-1.585, 24, 32, 0.16);
    this._baseboard(-1.775, 32, 48.6, 0);
    this._baseboard(-1.775, 49.8, 58, 0);
    this._baseboard(1.585, 0, 3.0, 0);
    this._baseboard(1.585, 4.2, 10.0, 0);
    this._baseboard(1.585, 11.2, 24, 0, [[19.8, 21.2]]);
    // 南侧踢脚线沿连续地面布置
    this._baseboard(1.585, 24, 32, 0);
    this._baseboard(1.775, 32, 38, 0); // south wide wall (x=1.9, inner face 1.8)
    this._baseboard(1.775, 38, 46, 0, [[43, 45]]);
    this._baseboard(1.775, 46, 54, 0);
    this._baseboard(1.775, 54, 58, 0);
    // lower wainscot in the widened long corridor: breaks up the big flat wall
    // planes and adds the "old Japanese apartment" horizontal depth cue.
    this._wainscot(-1.775, 32, 48.6);
    this._wainscot(-1.775, 49.8, 58);
    this._wainscot(1.775, 32, 43);
    this._wainscot(1.775, 45, 58);
    // ceiling cornice: a thin shadow line where the wall meets the ceiling,
    // gives the long corridor a more built, less "cardboard box" silhouette.
    for (const cx of [-1.775, 1.775]) {
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
    this._baseboard(-0.885, 1.6, 63.2, 2.8, [[20, 21.4], [40, 41.4], [55, 56.6]]);
    this._baseboard(0.885, 1.6, 30.0, 2.8);
    this._baseboard(0.885, 31.2, 63.2, 2.8, [[46, 47.4]]);
    // ceiling beams, lower corridor (between the fixtures)
    for (const z of [5.65, 10.05, 14.6, 19.2, 23.8, 28.4, 33.0, 37.6, 42.2, 46.8, 51.4]) {
      this.box(0, z, 2.56, z >= 33 ? 3.8 : 3.4, 0.16, 0.14, M.darkWood, {
        geo: { ao: 'ceil', uv: [3, 0.2] }, collide: false, cast: false,
      });
    }
    // upper beams
    for (const z of [5.6, 11.6, 17.6, 23.6, 35.6, 41.6, 47.6, 53.6, 59.6]) {
      this.box(0, z, 2.8 + 2.26, 2.0, 0.16, 0.14, M.darkWood, {
        geo: { ao: 'ceil', uv: [2.5, 0.2] }, collide: false, cast: false,
      });
    }
    // exposed pipes along the ceiling (split at z=32 where corridor width changes)
    this._pipe(-1.65, 2, 32, 2.42);    // main corridor north side (widened)
    this._pipe(-1.85, 32, 55, 2.42);   // long corridor north side (widened)
    this._pipe(-0.87, 2, 55, 2.8 + 2.12);  // upper pipe (centered, unchanged)
    // water stain + bucket under the dripping pipe joint
    this.decalFloor(-1.65, 33, 0.5, 0.5, this.tex.blood, 0.3);
    this.box(-1.5, 33.6, 0, 0.26, 0.26, 0.2, M.darkMetal, { geo: { ao: 'none' }, collide: false, cast: false });
    // old radiators - modeled with ribs so they read as objects, not white slabs
    this._radiator(1.7, 16.8);   // south wall, main corridor (widened)
    this._radiator(-1.9, 40.8);  // north wall, long corridor (widened)

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
    const slabGeo = beveledBoxGeometry(width,height,.06);
    // BoxGeometry makes the slab wide in X and thin in Z. That is correct for
    // along='x' doors, but along='z' doors live in walls that run along Z, so
    // their slab must be thin in X and span the opening in Z — otherwise the
    // closed door sticks out of the frame at a right angle (the "cross" bug).
    if (along === 'z') slabGeo.rotateY(Math.PI / 2);
    slabGeo.computeBoundingBox();
    const slab = new THREE.Mesh(slabGeo, mat === M.woodDoor ? detailMaterials(this).wood : mat);
    slab.castShadow = true;
    slab.receiveShadow = true;
    if (along === 'z') slab.position.set(0, height / 2, width / 2);
    else slab.position.set(width / 2, height / 2, 0);
    pivot.add(slab);
    this.scene.add(pivot);

    const knob = new THREE.Mesh(
      new THREE.SphereGeometry(0.035, 16, 10),
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
    doorDetails(this,slab,width,height,along);

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
      localBounds: slabGeo.boundingBox.clone(), worldBounds: slabGeo.boundingBox.clone(), collisionAngle: null,
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

  updateDoors(dt, playerPos = null, otherPositions = []) {
    const occupants=playerPos?[playerPos,...otherPositions]:otherPositions;
    const hitsBody=(x0,x1,y0,y1,z0,z1)=>occupants.some(p=>
      x0<p.x+.3&&x1>p.x-.3&&z0<p.z+.3&&z1>p.z-.3&&y1>p.y+.35&&y0<p.y+1.67);
    for (const d of this.doors) {
      if (d.type === 'swing') {
        const previous = d.angle;
        d.angle = clamp(d.angle + (d.target * d.openAngle - d.angle) * Math.min(1, dt * 3.2), 0, d.openAngle);
        if (Math.abs(d.angle - d.target * d.openAngle) < .00001) d.angle = d.target * d.openAngle;
        d.pivot.rotation.y = d.angle * d.dir;
        if (d.collisionAngle !== d.angle) {
          // collider = the SLAB's own box only (excluding the knob child, which
          // would otherwise inflate the closed-door collision by ~0.5m)
          d.slab.updateWorldMatrix(true, false);
          const bb = d.worldBounds.copy(d.localBounds).applyMatrix4(d.slab.matrixWorld);
          // 门扇不能把玩家挤入墙角。关门受阻会重新打开；开门受阻则等待让路。
          if (hitsBody(bb.min.x,bb.max.x,bb.min.y,bb.max.y,bb.min.z,bb.max.z)) {
            d.angle = previous; d.pivot.rotation.y = previous * d.dir;
            if (!d.open) { d.open = true; d.target = 1; }
            if (!d.obstructed) this.handlers.onDoorBlocked?.(d);
            d.obstructed = true;
            d.slab.updateWorldMatrix(true, false);
            bb.copy(d.localBounds).applyMatrix4(d.slab.matrixWorld);
          } else d.obstructed = false;
          d.collider = { x0: bb.min.x, y0: bb.min.y, z0: bb.min.z, x1: bb.max.x, y1: bb.max.y, z1: bb.max.z };
          d.collisionAngle = d.angle;
        }
      } else {
        const previous = d.slidePos;
        d.slidePos += (d.slideTarget - d.slidePos) * Math.min(1, dt * 3.0);
        const base = d.width / 2;
        if (d.along === 'z') d.slab.position.z = base + d.slidePos;
        else d.slab.position.x = base + d.slidePos;
        {
          d.collider = d.along === 'z'
            ? boxAABB(d.hinge.x, d.hinge.y + d.height / 2, d.hinge.z + base + d.slidePos, 0.12, d.height, d.width)
            : boxAABB(d.hinge.x + base + d.slidePos, d.hinge.y + d.height / 2, d.hinge.z, d.width, d.height, 0.12);
          const c = d.collider;
          if (hitsBody(c.x0,c.x1,c.y0,c.y1,c.z0,c.z1)) {
            d.slidePos = previous;
            if (!d.open) { d.open = true; d.target = 1; d.slideTarget = -d.slideOffset; }
            if (!d.obstructed) this.handlers.onDoorBlocked?.(d);
            d.obstructed = true;
            if (d.along === 'z') d.slab.position.z = base + previous;
            else d.slab.position.x = base + previous;
            d.collider = d.along === 'z'
              ? boxAABB(d.hinge.x, d.hinge.y + d.height / 2, d.hinge.z + base + previous, .12, d.height, d.width)
              : boxAABB(d.hinge.x + base + previous, d.hinge.y + d.height / 2, d.hinge.z, d.width, d.height, .12);
          } else d.obstructed = false;
        }
      }
    }
  }

  _buildDoors() {
    const M = this.materials;
    // kitchen (north wall, hinge z=3.2, opens into kitchen)
    this.makeDoor({ x: -1.7, z: 3.2, dir: -1, offset: 0.11, label: '厨房的门' });
    // living
    this.makeDoor({ x: -1.7, z: 10.0, dir: -1, offset: 0.11, label: '客厅的门' });
    // fusuma living<->bedroom (slides in front of the wall)
    this.makeDoor({
      x: -8.4, z: 12.2, width: 1.14, height: 2.0, type: 'slide', mat: M.fusuma,
      label: '纸拉门', slideOffset: 1.15, offset: 0.12,
    });
    // altar
    this.makeDoor({ x: 1.7, z: 3.0, dir: 1, offset: -0.11, label: '佛间的门' });
    // child room
    this.makeDoor({ x: 1.7, z: 10.0, dir: 1, offset: -0.11, label: '儿童房的门' });
    // dead door (opens onto brick)
    this.makeDoor({
      x: -1.9, z: 48.6, dir: -1, offset: 0.11, label: '没有用过的门',
      onOpen: () => this.handlers.onDeadDoor?.(),
    });
    // brick backing: must fully cover the door opening (z 48.02..49.18) so a
    // player can't clip through the uncovered west part and get stuck in the wall.
    this.box(-2.25, 48.6, 0, 0.2, 1.4, 2.7, M.brick, { geo: { ao: 'wall' } }); // brick backing (solid)
    // 大厅与住户区之间的正常内门
    this.makeDoor({
      x: -0.58, z: -2, along: 'x', width: 1.16, dir: 1, offset: 0.11, label: '玄关的门',
      locked: false,
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
    const UY = 2.8; // upper floor height

    // ---------- kitchen ----------
    this.box(-6.2, 7.04, 0, 3.4, 0.62, 0.92, M.darkWood, { geo: { ao: 'wall', uv: [4, 1] } }); // counter
    this.box(-6.2, 7.01, 0.92, 3.5, 0.7, 0.06, stdMat({ color: 0x63665f, roughness: 0.78, metalness: 0.12 }), { geo: { ao: 'none' } }); // countertop (matte + dark: its far edge blew out at grazing angles under the flashlight)
    // Hollow wall cabinet: the swinging door reveals shelves, never a solid cube.
    const cabinetParts = [];
    const cabinetPart = (x,z,y,w,d,h,mat=M.darkWood) => {
      const part=this.box(x,z,y,w,d,h,mat,{geo:{bevel:true}});
      cabinetParts.push(part);return part;
    };
    for(const x of [-7.77,-5.43])cabinetPart(x,7.06,1.6,.06,.60,.62);
    for(const y of [1.6,2.17])cabinetPart(-6.6,7.06,y,2.4,.60,.05);
    cabinetPart(-6.6,7.345,1.65,2.28,.03,.52);
    cabinetPart(-6.6,7.09,1.89,2.28,.50,.035);
    const cabPivot = new THREE.Group();
    cabPivot.position.set(-7.735, 1.65, 6.744);
    const cabDoor = new THREE.Mesh(beveledBoxGeometry(1.09,.50,.04),M.darkWood);
    cabDoor.position.set(.545,.25,0);cabPivot.add(cabDoor);
    const pull=new THREE.Mesh(beveledBoxGeometry(.08,.025,.028),detailMaterials(this).brass);
    pull.position.set(.95,.23,-.035);cabPivot.add(pull);
    this.scene.add(cabPivot);
    cabinetPart(-6.01,6.744,1.65,1.09,.04,.50);
    cabinetPart(-6.42,6.706,1.87,.08,.035,.025,detailMaterials(this).brass);
    this.props.cabinet = { pivot: cabPivot, angle: 0, openedOnce: false, carcass: cabinetParts };
    // fridge
    this.box(-7.7, 2.85, 0, 0.85, 0.85, 1.75, M.rust, { geo: { ao: 'wall' } });
    // door seam: a VERTICAL panel on the fridge's front face (z 3.275 side).
    // The old call was a horizontal slab with its center at the fridge's own
    // center (z=2.85), i.e. fully buried inside the body and invisible.
    this.props.fridgeDoor = this.box(-7.7, 3.29, 0.025, 0.8, 0.06, 1.70, M.darkMetal, { geo: { ao: 'none' }, collide: false });
    // Table and chairs: a supported top at dining height, not an upside-down
    // slab at floor level. Legs and back slats are separate beveled geometry.
    const tableTop=this.box(-5.3,4.6,.74,1.4,.8,.065,M.darkWood,{geo:{bevel:true}});
    const tableLegs=[];
    for(const dx of [-.59,.59])for(const dz of [-.29,.29])
      tableLegs.push(this.box(-5.3+dx,4.6+dz,0,.065,.065,.74,M.darkWood,{geo:{bevel:true},collide:false}));
    this.props.kitchenTable={top:tableTop,legs:tableLegs};
    for(const [z,back] of [[3.55,-1],[5.65,1]]) {
      this.box(-5.3,z,.42,.51,.51,.065,M.darkWood,{geo:{bevel:true}});
      for(const dx of [-.2,.2])for(const dz of [-.2,.2])
        this.box(-5.3+dx,z+dz,0,.045,.045,.42,M.darkWood,{geo:{bevel:true},collide:false});
      for(const dx of [-.23,.23])this.box(-5.3+dx,z+back*.23,.46,.04,.045,.53,M.darkWood,{geo:{bevel:true},collide:false});
      for(const y of [.59,.77,.95])this.box(-5.3,z+back*.23,y,.46,.045,.045,M.darkWood,{geo:{bevel:true},collide:false});
    }
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
    this.box(-3.4, 7.06, 0, 0.95, 0.62, 0.92, M.whiteMetal, { geo: { ao: 'wall' } });
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
    const coffeeTop=this.box(-4.9,14,.32,1.1,.6,.06,M.darkWood,{geo:{bevel:true}});
    const coffeeLegs=[];
    for(const dx of [-.45,.45])for(const dz of [-.21,.21])
      coffeeLegs.push(this.box(-4.9+dx,14+dz,0,.055,.055,.32,M.darkWood,{geo:{bevel:true},collide:false}));
    this.props.coffeeTable={top:coffeeTop,legs:coffeeLegs};
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
    const bookcaseParts=[];
    const casePart=(x,z,y,w,d,h)=>{
      const part=this.box(x,z,y,w,d,h,M.darkWood,{geo:{bevel:true},collide:false});
      bookcaseParts.push(part);return part;
    };
    const bookcaseCollider=boxAABB(-8.15,.95,10.3,.3,1.9,2.2);
    this.colliders.push(bookcaseCollider);
    casePart(-8.265,10.3,0,.04,2.2,1.9);
    for(const z of [9.23,11.37])casePart(-8.14,z,0,.28,.055,1.9);
    for(const y of [0,.65,1.25,1.845])casePart(-8.14,10.3,y,.28,2.2,.055);
    this.props.bookcase={parts:bookcaseParts,collider:bookcaseCollider};
    const bookCols = [0x6a3020, 0x20506a, 0x3a5a30, 0x6a5a20, 0x4a3050, 0x505050, 0x704020, 0x2a3a4a];
    for (const shelfY of [0.71, 1.31]) {
      for (let i = 0; i < 8; i++) {
        const bw = 0.045 + rng() * 0.05;
        // books must stand ON the shelf front (x≈-7.98, just proud of the new
        // cabinet face -8.00); the old -8.10 was inside the solid cabinet
        this.box(-8.115, 9.42 + i * 0.25, shelfY, 0.22, bw, 0.2 + rng() * 0.13,
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
    // 第三张：倒着挂的旧照片（错位恐怖，报告 1.3/3.4）——
    // 和旁边两张并排却明显不对，玩家路过会多看一眼
    const flip = this.decalWall(-4.9, 7.63, 1.55, 0.34, 0.42, t.photo, 's');
    flip.rotation.z = Math.PI;
    this.box(-4.9 - 0.185, 7.645, 1.55, 0.03, 0.02, 0.5, M.darkWood, { geo: { ao: 'none' }, collide: false, cast: false });
    this.box(-4.9 + 0.185, 7.645, 1.55, 0.03, 0.02, 0.5, M.darkWood, { geo: { ao: 'none' }, collide: false, cast: false });
    this.box(-4.9, 7.645, 1.335, 0.34, 0.02, 0.03, M.darkWood, { geo: { ao: 'none' }, collide: false, cast: false });
    this.box(-4.9, 7.645, 1.765, 0.34, 0.02, 0.03, M.darkWood, { geo: { ao: 'none' }, collide: false, cast: false });
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
    const noteGlow1 = new THREE.PointLight(0xffb060, 0.4, 2.5, 2.0);
    noteGlow1.position.set(-9.15, 0.7, 9.55);
    this.scene.add(noteGlow1);
    this.notePickups.push({ mesh: note1, id: 1 });
    this.regInteractable(note1, '旧手记', 3.5, () => this.handlers.onNote?.(1));
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
    // Hollow medicine cabinet. Both its carcass and open door remain fully
    // on the bathroom side of x=-13.9; the mirror is inset into its door frame.
    const medicineParts=[];
    const medPart=(x,z,y,w,d,h)=>{
      const part=this.box(x,z,y,w,d,h,M.whiteMetal,{geo:{bevel:true},collide:false});
      medicineParts.push(part);return part;
    };
    medPart(-13.945,15.5,1.5,.025,.6,.7);
    for(const z of [15.215,15.785])medPart(-14.02,z,1.5,.18,.03,.7);
    for(const y of [1.5,1.82,2.17])medPart(-14.02,15.5,y,.18,.6,.03);
    this.colliders.push(boxAABB(-14.02,1.85,15.5,.18,.7,.6));
    const medPivot=new THREE.Group();medPivot.position.set(-14.115,1.535,15.24);
    const medDoor=new THREE.Mesh(beveledBoxGeometry(.025,.62,.52),M.whiteMetal);
    medDoor.position.set(0,.31,.26);medPivot.add(medDoor);
    const inset=new THREE.Mesh(new THREE.PlaneGeometry(.45,.54),detailMaterials(this).darkGlass);
    inset.rotation.y=-Math.PI/2;inset.position.set(-.014,.31,.26);medPivot.add(inset);
    medPivot.rotation.y=-.55;this.scene.add(medPivot);
    this.props.medicineCabinet={parts:medicineParts,door:medPivot};
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
    const noteGlow2 = new THREE.PointLight(0xffb060, 0.4, 2.5, 2.0);
    noteGlow2.position.set(7.55, 1.6, 5.1);
    this.scene.add(noteGlow2);
    this.notePickups.push({ mesh: note2, id: 2 });
    this.regInteractable(note2, '报纸文章', 3.5, () => this.handlers.onNote?.(2));
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
    const noteGlow3 = new THREE.PointLight(0xffb060, 0.4, 2.5, 2.0);
    noteGlow3.position.set(7.75, 0.85, 9.1);
    this.scene.add(noteGlow3);
    this.notePickups.push({ mesh: note3, id: 3 });
    this.regInteractable(note3, '孩子的画', 3.5, () => this.handlers.onNote?.(3));
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
    const chair = this.box(-1.2, 17.2, 0, 0.45, 0.45, 0.5, M.darkWood, { geo: { ao: 'none' } });
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
    bike.position.set(-1.3, 0, 21.5);
    bike.rotation.y = 0.2;
    bike.rotation.z = 0.06;
    this.scene.add(bike);
    this.colliders.push(boxAABB(-1.3, 0.5, 21.5, 1.3, 1.0, 0.5));
    this.props.bike = bike;
    // graffiti poster + ofuda + exit sign
    this.decalWall(-1.585, 30, 1.4, 1.3, 0.65, t.graffiti, 'e');
    this._ofuda(1.55, 3.6, 2.5);
    const sign = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.28, 0.06), M.exitSign);
    sign.position.set(0, 2.42, 57.4);
    this.scene.add(sign);
    // stopped wall clock (02:17) - lit material so it doesn't glow white in the dark
    // mounted on the south wall inner face (wall at x=1.7, inner face ~1.6)
    const clock = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.03, 12),
      stdMat({ map: t.clock, roughness: 0.6 }));
    clock.position.set(1.575, 1.7, 26.5);
    clock.rotation.z = Math.PI / 2;
    this.scene.add(clock);
    // 挂歪的旧照片（非对称设计，报告 3.4）：就在挂钟旁边，歪得刚好能注意到
    const tilt = this.decalWall(1.585, 25.4, 1.58, 0.3, 0.38, t.photo, 'w');
    tilt.rotation.z = -0.09;
    // 挂钟倒走（日常异化，报告 3.2）：靠近时偶尔倒走几秒再复原
    this.props.clock = { mesh: clock, state: 'normal', timer: rand(30, 70) };
    // light switches are created in _buildLights (they need the fixture list
    // to link to) - see the end of _buildLights.
    // upper-floor window (NORTH wall x=-1.0, inner face -0.9: the pane must
    // face +x into the corridor, so the face parameter is 'e', not 'n' -
    // 'n' left the plane edge-on to the player)
    this._window(-0.9, 20, 3.55, 'e');
    // 地面贴花贴合重建后的连续走廊
    this.decalFloor(0, 30.6, 0.8, 1.2, t.blood, 0.4, 0.012);
    this.decalWall(1.575, 29.4, 3.2, 0.3, 0.6, t.handprint, 'w', 0.2);
    this.decalWall(1.575, 31.5, 3.4, 0.4, 0.5, t.blood, 'w', 0.1);
    // green exit glow above the upper door (dim: a 2.6 light at 0.4m from the
    // wall blew the wall out white around the sign)
    const exitGlow = new THREE.PointLight(0x3fa05a, 0.9, 4, 1.9);
    exitGlow.position.set(0.6, 3.3, 30.6);
    this.scene.add(exitGlow);
    this.props.ropes = [];
    // the eyes wall (revealed behind the dead door) — the brick backing spans
    // x -1.92..-1.78 (corridor-facing side x=-1.78), z 48.6..49.8. The decal
    // must face +x INTO the corridor ('e'), centered on the brick — the old
    // 's' orientation at the gap's edge showed it edge-on: invisible.
    const eyes = this.decalWall(-1.765, 49.2, 1.05, 1.1, 2.0, t.eyesWall, 'e', 0, false);
    eyes.visible = false;
    this.props.eyesWall = eyes;
    // vertical blood drag on the south wall (inner face x=1.6)
    this.decalWall(1.615, 28.0, 0.75, 0.32, 1.6, t.blood, 'w', 0.12);
    // cardboard boxes (moved outward to match widened corridor)
    for (const [bx, bz, br] of [[-1.5, 43.2, 0.3], [1.6, 41.7, -0.4], [-1.5, 44.0, 0.7]]) {
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
    // 一排完好窗中唯一一扇黑的（报告 3.4 非对称设计）：
    // 玻璃碎了、月光进不来，路过时这段走廊明显更暗
    this._window(-8.3, 14.0, 1.0, 'e', { dark: true });
    this._window(-13.7, 10.75, 1.0, 'e');

    // blood stain under the futon corner
    this.decalFloor(-13.4, 15.0, 0.9, 1.1, t.blood, 0.1);

    // 手电电池 ×3（报告 2.2：第二阶段的资源会被打破，但先给足安全感）
    this._battery(0.62, -0.15);
    this._battery(-5.05, 13.05);
    this._battery(-0.55, 33.6);

    // 二楼家具与调查物件位于独立住户房间，由 campaign-world.js 构建。

  }

  /* 一节手电电池：横放在地上的小圆柱，淡色环带在黑暗里隐约可见
     加 PointLight + 脉冲 halo 环，玩家在黑暗里一眼就能看到 */
  _battery(x, z, yOffset = 0.042) {
    const g = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.032, 0.032, 0.11, 8),
      stdMat({ color: 0x74563a, roughness: 0.55, metalness: 0.35 }));
    body.rotation.z = Math.PI / 2;
    g.add(body);
    const band = new THREE.Mesh(
      new THREE.CylinderGeometry(0.033, 0.033, 0.028, 8),
      basicMat({ color: 0xd8cfae }));
    band.rotation.z = Math.PI / 2;
    band.position.x = 0.03;
    g.add(band);
    const nub = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.012, 8),
      stdMat({ color: 0xa9a9a4, roughness: 0.4, metalness: 0.5 }));
    nub.rotation.z = Math.PI / 2;
    nub.position.x = 0.058;
    g.add(nub);

    // glow light: cold blue, short range, pulses via update
    const glow = new THREE.PointLight(0x60a0ff, 0.7, 3.5, 2.0);
    glow.position.set(0, 0.05, 0);
    g.add(glow);

    // halo ring: a thin emissive torus lying flat on the ground, pulses
    const halo = new THREE.Mesh(
      new THREE.TorusGeometry(0.12, 0.012, 6, 16),
      basicMat({ color: 0x60a0ff, transparent: true, opacity: 0.8 }));
    halo.rotation.x = Math.PI / 2;
    halo.position.y = 0.01;
    g.add(halo);

    g.position.set(x, yOffset, z);
    g.rotation.y = rand(0, Math.PI * 2);
    this.scene.add(g);
    const it = this.regInteractable(g, '手电电池', 3.5, () => this.handlers.onBattery?.(g));
    (this.props.batteries ||= []).push({ mesh: g, interactable: it, glow, halo, phase: rand(0, 6.28) });
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

  _window(x, z, y, face, opts = {}) {
    const M = this.materials;
    const dark = !!opts.dark;
    const ww = opts.w ?? 0.8, wh = opts.h ?? 0.8;
    // 碎/被封死的黑窗：无月光、无雨痕，只剩一块更暗的破玻璃
    const paneMat = dark
      ? stdMat({ color: 0x070a0e, roughness: 0.35, metalness: 0.1 })
      : M.moonWin;
    const win = new THREE.Mesh(new THREE.PlaneGeometry(ww, wh), paneMat);
    const lx = face === 'e' ? 0.02 : face === 'w' ? -0.02 : 0;
    const lz = face === 'n' ? -0.02 : face === 's' ? 0.02 : 0;
    win.position.set(x + lx, y, z + lz);
    if (face === 'e') win.rotation.y = Math.PI / 2;
    else if (face === 'w') win.rotation.y = -Math.PI / 2;
    else if (face === 's') win.rotation.y = Math.PI;
    this.scene.add(win);
    if (!dark) {
      // rain-streak overlay: a transparent second pane, just in front of the
      // moonlit glass, ties the storm ambience to the visuals.
      const rainMat = basicMat({
        map: this.tex.rainStreaks, transparent: true, opacity: 0.55,
        depthWrite: false, side: THREE.DoubleSide,
      });
      const rain = new THREE.Mesh(new THREE.PlaneGeometry(ww, wh), rainMat);
      const ox = face === 'e' ? 0.005 : face === 'w' ? -0.005 : 0;
      const oz = face === 'n' ? -0.005 : face === 's' ? 0.005 : 0;
      rain.position.set(win.position.x + ox, win.position.y, win.position.z + oz);
      rain.rotation.copy(win.rotation);
      rain.renderOrder = 3;
      this.scene.add(rain);
    }
    const barMat = stdMat({ color: 0x0c0e12, roughness: 0.65, metalness: 0.25 });
    const frameMat = stdMat({ color: 0x2e2620, roughness: 0.85 });
    if (dark && (face === 'e' || face === 'w')) {
      // 黑窗上残留的裂痕：两道交叉的浅色细棱，近看才认得出是碎玻璃
      const fx = x + (face === 'e' ? 0.025 : -0.025);
      const crackMat = stdMat({ color: 0x39434b, roughness: 0.4 });
      this.box(fx, z - 0.1, y + 0.08, 0.02, 0.62, 0.018, crackMat, { geo: { ao: 'none' }, collide: false, cast: false });
      this.box(fx, z + 0.14, y - 0.06, 0.02, 0.5, 0.014, crackMat, { geo: { ao: 'none' }, collide: false, cast: false });
    }
    if (!dark) {
      const light = new THREE.PointLight(0x6a8cb4, 0.8, 7, 1.9);
      // place the moonlight source outside the building:
      // north=-x, south=+x, east=+z, west=-z
      light.position.set(
        x + (face === 'e' ? 0.6 : face === 'w' ? -0.6 : 0), y,
        z + (face === 'n' ? 0.6 : face === 's' ? -0.6 : 0),
      );
      this.scene.add(light);
      this.windowLights.push(light);
    }
    if (face === 'e' || face === 'w') {
      const fx = x + (face === 'e' ? 0.03 : -0.03);
      // window frame: lintel, stool, two jambs + a cross mullion (proud of the
      // wall, giving the pane real depth instead of a flat decal)
      this.box(fx, z, y + wh / 2 - 0.03, 0.05, ww + 0.14, 0.05, frameMat, { geo: { ao: 'none' }, collide: false, cast: false });
      this.box(fx, z, y - wh / 2 + 0.03, 0.05, ww + 0.14, 0.05, frameMat, { geo: { ao: 'none' }, collide: false, cast: false });
      this.box(fx, z - ww / 2 - 0.02, y, 0.05, 0.05, wh - 0.01, frameMat, { geo: { ao: 'none' }, collide: false, cast: false });
      this.box(fx, z + ww / 2 + 0.02, y, 0.05, 0.05, wh - 0.01, frameMat, { geo: { ao: 'none' }, collide: false, cast: false });
      this.box(fx, z, y, 0.04, 0.05, wh - 0.01, frameMat, { geo: { ao: 'none' }, collide: false, cast: false });
      this.box(fx, z, y - wh * 0.23, 0.05, ww - 0.01, 0.04, frameMat, { geo: { ao: 'none' }, collide: false, cast: false });
      for (const dz of [-ww * 0.325, 0, ww * 0.325]) {
        const bar = new THREE.Mesh(new THREE.BoxGeometry(0.02, wh - 0.05, 0.02), barMat);
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
      this.box(x - 0.42, fz, y, 0.05, 0.05, wh - 0.01, frameMat, { geo: { ao: 'none' }, collide: false, cast: false });
      this.box(x + 0.42, fz, y, 0.05, 0.05, wh - 0.01, frameMat, { geo: { ao: 'none' }, collide: false, cast: false });
      this.box(x, fz, y, 0.79, 0.04, 0.05, frameMat, { geo: { ao: 'none' }, collide: false, cast: false });
      this.box(x, fz, y - wh * 0.23, 0.79, 0.05, 0.04, frameMat, { geo: { ao: 'none' }, collide: false, cast: false });
      for (const dx of [-ww * 0.325, 0, ww * 0.325]) {
        const bar = new THREE.Mesh(new THREE.BoxGeometry(0.02, wh - 0.05, 0.02), barMat);
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
    // 脸作为头的子节点：头部凝视追踪时脸跟着一起转
    face.position.set(0, 0, 0.062);
    head.add(face);
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
    // handprints near child door (corridor side of south wall, inner face x=1.6)
    this.decalWall(1.615, 10.5, 1.25, 0.22, 0.22, t.handprint, 'w', 0.4);
    this.decalWall(1.615, 10.9, 0.95, 0.22, 0.22, t.handprint, 'w', -0.3);
    // bathroom smears — bathroom's east wall is at x=-13.8 (x -13.9..-13.7);
    // the bathroom-side inner face is x=-13.9, so the decals must hang at
    // x≈-13.915 facing +x. They were placed at -13.685 facing 'w', i.e.
    // inside the wall on the BEDROOM side - invisible from both rooms.
    this.decalWall(-13.93, 17.6, 1.2, 0.6, 0.5, t.blood, 'e', 0.1);
    this.decalWall(-13.93, 19.4, 0.7, 0.3, 0.3, t.handprint, 'e', 0.6);
    // bedroom wall blood (west side of shared wall, x = -8.5)
    this.decalWall(-8.515, 13.6, 1.1, 0.5, 0.4, t.blood, 'e', 0.2);
    // corridor stains
    this.decalFloor(0.9, 30.6, 0.5, 0.7, t.blood, 0.6, 0.012); // on the continuous floor
    this.decalWall(-1.585, 24.4, 0.5, 0.3, 0.25, t.blood, 'e', 0.1);
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
      [-1.585, 4.55, -4.8, 3.8],    // kitchen door -> kitchen room light (widened)
      [-1.585, 11.35, -4.8, 12.0],  // living door  -> living room light (widened)
      [1.585, 4.3, 4.8, 4.5],       // altar door   -> altar room light (widened)
      [-1.775, 49.95, 0, 49.1],     // dead door    -> its corridor light (widened)
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
    // 节点位于连续走廊的地面；折返梯节点由 stairs.js 注册。
    const cz = [-1, 3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43, 47, 51, 55, 57.5];
    for (const z of cz) {
      this.monsterNodes.push({ x: 0, z, y: 0 });
    }
    // 二楼节点位于正常住户走廊。
    const uz = [4, 12, 20, 28, 36, 44, 52, 62.5];
    for (const z of uz) this.monsterNodes.push({ x: 0, z, y: 2.8 });
    this.monsterNodes.push({ x: 0.75, z: 60.5, y: 2.8 });
    // room nodes (monster teleport targets) - must sit on clear floor, not
    // inside furniture (the old (-4.8,12.5) was inside the living room's
    // coffee table, so the monster popped out of the table)
    for (const [x, z] of [[-3.9, 4.5], [-2.8, 13.8], [-12.5, 12.5], [-15.5, 17.5], [4.8, 4.5], [4.8, 12]]) {
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
    zone(-8.4, 0, -1.3, 7.5, 'kitchen', -0.3, 2);
    zone(-8.4, 7.5, -1.3, 15.5, 'living', -0.3, 2);
    zone(-13.8, 7.5, -8.4, 15.5, 'bedroom', -0.3, 2);
    zone(-17.6, 14.8, -13.8, 21, 'bathroom', -0.3, 2);
    zone(-16.4, 13.8, -14.6, 14.8, 'passage', -0.3, 2);
    zone(1.3, 0, 8.4, 8.5, 'altar', -0.3, 2);
    zone(1.3, 8.5, 8.4, 15.5, 'child', -0.3, 2);
    zone(-2, 10, 2, 58, 'upper', 2.3, 8);
    zone(-1.7, 24, 1.7, 30, 'corridorMid', 0, 2.2);
    zone(-1.7, 57.5, 1.7, 61, 'stairsEast', 0, 2.2);
    // 出口持续检查：锁着时路过不能永久消耗结局触发器。
    this.exitBounds = { x0: 2.4, x1: 10.3, z0: 28.7, z1: 32.8, y0: 2.4, y1: 4 };
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
    const exit = this.exitBounds;
    const insideExit = p.x >= exit.x0 && p.x <= exit.x1 &&
      p.z >= exit.z0 && p.z <= exit.z1 && p.y >= exit.y0 && p.y <= exit.y1;
    if (!insideExit) this.exitVisit = false;
    if (this.exitDoor.open && insideExit && !this.exitVisit) {
      this.exitVisit = true;
      this.handlers.zone_exitVoid?.();
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

  update(dt, time, playerPos = null, viewDir = null, reduced = false, doorBodies = null) {
    this.updateDoors(dt, doorBodies ? null : playerPos, doorBodies || []);
    // 灯光预算节流重算（0.12s）：排序 51 盏灯的成本可忽略，切换只改 uniforms
    this._budgetT -= dt;
    if (this._budgetT < 0 && playerPos) {
      this._budgetT = 0.12;
      if (viewDir) this._viewDir.copy(viewDir);
      this._applyLightBudget(playerPos.x, playerPos.y, playerPos.z);
    }
    // 人偶的头会极缓慢地转向玩家（凝视恐怖，报告 1.4）——
    // 只在近处生效、转速慢到「感觉不对但说不出为什么」；远禹时保持原样
    const doll = this.props.doll;
    if (doll && playerPos) {
      const ddx = playerPos.x - doll.mesh.position.x;
      const ddz = playerPos.z - doll.mesh.position.z;
      if (ddx * ddx + ddz * ddz < 36) {
        let local = Math.atan2(ddx, ddz) - doll.mesh.rotation.y;
        local = Math.atan2(Math.sin(local), Math.cos(local));
        const target = clamp(local, -1.15, 1.15);
        doll.head.rotation.y += (target - doll.head.rotation.y) * Math.min(1, dt * 0.55);
      }
    }
    for (const c of this.candles) {
      const v = 0.75 + 0.25 * Math.sin(time * 9 + c.phase) * Math.sin(time * 13.7 + c.phase * 2);
      c.light.intensity = c.base * clamp(v + rand(-0.08, 0.08), 0.3, 1.2);
    }
    // battery glow + halo pulse (sin wave, ~2s period)
    for (const b of (this.props.batteries || [])) {
      const pulse = 0.5 + 0.5 * Math.sin(time * 3.0 + b.phase);
      b.glow.intensity = 0.3 + 0.7 * pulse;
      b.halo.scale.setScalar(0.85 + 0.3 * pulse);
      b.halo.material.opacity = 0.4 + 0.6 * pulse;
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
    // 挂钟倒走：玩家在 5m 内时偶尔触发，指针退回一截、几秒后悄悄走回原位
    const clk = this.props.clock;
    if (clk && playerPos) {
      clk.timer -= dt;
      const cdx = playerPos.x - clk.mesh.position.x;
      const cdz = playerPos.z - clk.mesh.position.z;
      const near = (cdx * cdx + cdz * cdz) < 25;
      if (clk.state === 'normal' && clk.mysterySolved && near && clk.timer <= 0 && Math.random() < 0.01) {
        clk.state = 'back';
        clk.timer = rand(2.5, 5);
        clk.mesh.material.map = this.tex.clockBack;
      } else if (clk.state === 'back' && clk.timer <= 0) {
        clk.state = 'normal';
        clk.timer = rand(50, 110);
        clk.mesh.material.map = this.tex.clock;
      }
    }
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
      else if (reduced && f.mode !== 'dead') v = f.mode === 'bad' ? 0.55 : 1;
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
