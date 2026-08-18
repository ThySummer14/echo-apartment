// monster.js — the low-poly, wrong-proportioned humanoid ("the tall black one")
// and the pale ghost girl. Fully procedural models + procedural animation.
import * as THREE from 'three';
import {
  makeBoxGeo, stdMat, basicMat, aabbFromSphere, moveWithCollisions, clamp, lerp, rand, mulberry32,
} from './util.js';

const SKIN = 0xcfc6b4;

export class Monster {
  constructor(scene, tex) {
    this.scene = scene;
    this.tex = tex;
    this.state = 'dormant'; // dormant | stalk | chase | attack | gone
    this.speed = 0;
    this.pos = new THREE.Vector3();
    this.group = new THREE.Group();
    this.visible = true;
    this._build();
    this.scene.add(this.group);
    this.group.visible = false;

    this.stareTimer = 0;
    this.litTimer = 0;
    this.teleportTimer = rand(1.5, 2.5);
    this.stepTimer = 0;
    this.stuckTime = 0;
    this.lastPos = new THREE.Vector3();
    this.walkPhase = 0;
    this.twitchTimer = rand(0.3, 1);
    this.headRot = new THREE.Vector3();
    this.headTarget = new THREE.Vector3();
    this.char = aabbFromSphere(0, 0, 0, 0.28, 1.9);
    this.attackTimer = 0;
    this.tempLife = null; // limited-time appearance (silhouette events)
  }

  _build() {
    const t = this.tex;
    const skin = stdMat({ map: t.skin, roughness: 0.95, color: SKIN });
    const dark = stdMat({ color: 0x0e0c0a, roughness: 0.95 });

    const add = (geo, mat, parent, x = 0, y = 0, z = 0) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.castShadow = true;
      m.receiveShadow = true;
      parent.add(m);
      return m;
    };

    // --- legs (too thin, too long) ---
    this.legL = new THREE.Group(); this.legR = new THREE.Group();
    this.legL.position.set(-0.14, 0.95, 0); this.legR.position.set(0.14, 0.95, 0);
    this.group.add(this.legL, this.legR);
    add(makeBoxGeo(0.12, 0.95, 0.15, { jitter: 0.01 }), skin, this.legL, 0, -0.45, 0);
    add(makeBoxGeo(0.12, 0.95, 0.15, { jitter: 0.01 }), skin, this.legR, 0, -0.45, 0);

    // --- pelvis ---
    add(makeBoxGeo(0.34, 0.22, 0.22, { jitter: 0.008 }), skin, this.group, 0, 0.96, 0);

    // --- torso (hunched, tapered) ---
    this.torso = new THREE.Group();
    this.torso.position.set(0, 1.18, 0);
    this.group.add(this.torso);
    const torsoGeo = makeBoxGeo(0.44, 0.85, 0.26, { jitter: 0.014 });
    // taper shoulders by scaling top verts slightly
    const pos = torsoGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      if (y > 0.15) {
        const s = 1 - (y - 0.15) / 0.75 * 0.22;
        pos.setX(i, pos.getX(i) * s);
        pos.setZ(i, pos.getZ(i) * s);
      }
    }
    torsoGeo.computeVertexNormals();
    add(torsoGeo, skin, this.torso);
    // chest stain
    const stain = new THREE.Mesh(
      new THREE.PlaneGeometry(0.3, 0.24),
      basicMat({ map: t.blood, transparent: true, depthWrite: false })
    );
    stain.position.set(0, 0.12, 0.135);
    stain.renderOrder = 2;
    this.torso.add(stain);

    // --- neck + head ---
    this.headG = new THREE.Group();
    this.headG.position.set(0, 2.0, 0.02);
    this.group.add(this.headG);
    add(makeBoxGeo(0.1, 0.14, 0.1), skin, this.headG, 0, -0.08, 0);
    const headGeo = makeBoxGeo(0.3, 0.4, 0.28, { jitter: 0.02 });
    const head = add(headGeo, skin, this.headG, 0, 0.18, 0.01);
    head.name = 'monsterHead';
    // face plane: hollow eyes, gaping mouth
    const face = new THREE.Mesh(new THREE.PlaneGeometry(0.26, 0.34), basicMat({ map: t.face }));
    face.position.set(0, 0.18, 0.152);
    this.headG.add(face);
    // separate lower jaw - it drops open when it hunts
    this.jaw = new THREE.Group();
    this.jaw.position.set(0, 0.08, 0.02);
    this.headG.add(this.jaw);
    add(makeBoxGeo(0.2, 0.1, 0.2, { jitter: 0.02 }), skin, this.jaw, 0, -0.04, 0.02);
    // glowing ember eyes (flare up in chase)
    const eyeMat = stdMat({ color: 0x1a0505, emissive: 0x8a1410, emissiveIntensity: 0 });
    this.eyeL = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.05, 0.02), eyeMat);
    this.eyeR = this.eyeL.clone();
    this.eyeL.position.set(-0.07, 0.2, 0.156);
    this.eyeR.position.set(0.07, 0.2, 0.156);
    this.headG.add(this.eyeL, this.eyeR);
    this.eyeMat = eyeMat;
    // hair shards
    for (let i = 0; i < 5; i++) {
      const shard = add(
        makeBoxGeo(0.05 + rand(0, 0.04), 0.34 + rand(0, 0.22), 0.04, { jitter: 0.01 }),
        dark, this.headG,
        rand(-0.11, 0.11), 0.36 + rand(0, 0.06), rand(-0.12, 0.05)
      );
      shard.rotation.z = rand(-0.25, 0.25);
      shard.rotation.x = rand(-0.2, 0.2);
    }

    // --- arms (one longer, reaching the knees) ---
    this.armL = new THREE.Group(); this.armR = new THREE.Group();
    this.armL.position.set(-0.26, 1.94, 0); this.armR.position.set(0.26, 1.94, 0);
    this.group.add(this.armL, this.armR);
    const armLGeo = makeBoxGeo(0.11, 1.22, 0.13, { jitter: 0.01 });
    add(armLGeo, skin, this.armL, 0, -0.6, 0.02);
    const armRGeo = makeBoxGeo(0.11, 1.34, 0.13, { jitter: 0.01 });
    add(armRGeo, skin, this.armR, 0, -0.66, 0.02);
    add(makeBoxGeo(0.13, 0.2, 0.15, { jitter: 0.012 }), skin, this.armL, 0, -1.28, 0);
    add(makeBoxGeo(0.13, 0.2, 0.15, { jitter: 0.012 }), skin, this.armR, 0, -1.4, 0);
    // too-long fingers
    for (const arm of [this.armL, this.armR]) {
      for (let i = 0; i < 4; i++) {
        const f = add(makeBoxGeo(0.014, 0.12, 0.014, { jitter: 0.004 }), skin, arm, -0.045 + i * 0.03, -1.52, 0);
        f.rotation.x = 0.3 + (i % 2) * 0.18;
      }
    }
    // default pose: arms slightly bent forward
    this.armL.rotation.x = -0.18;
    this.armR.rotation.x = -0.24;

    // --- spine ridges + hanging cloth shreds ---
    for (let i = 0; i < 4; i++) {
      const b = add(makeBoxGeo(0.1, 0.07, 0.05, { jitter: 0.012 }), skin, this.torso, 0, 0.1 + i * 0.19, -0.14);
      b.rotation.x = 0.35;
    }
    this.cloth = [];
    const clothMat = stdMat({ color: 0x181410, roughness: 0.95, side: THREE.DoubleSide });
    for (let i = 0; i < 5; i++) {
      const s = add(makeBoxGeo(0.08 + rand(0, 0.06), 0.4 + rand(0, 0.3), 0.02, { jitter: 0.02 }),
        clothMat, this.torso, rand(-0.2, 0.2), -0.3 + rand(0, 0.2), 0.02);
      s.rotation.x = rand(-0.25, 0.25);
      this.cloth.push(s);
    }

    this.group.scale.setScalar(1);
  }

  spawn(pos, state = 'stalk') {
    this.pos.copy(pos);
    this.group.position.copy(pos);
    this.group.visible = true;
    this.visible = true;
    this.state = state;
    this.stareTimer = 0;
    this.litTimer = 0;
    this.stuckTime = 0;
    this.attackTimer = 0;
    this.tempLife = null;
    this.lastPos.copy(pos);
    this._syncChar();
  }

  despawn() {
    this.state = 'dormant';
    this.group.visible = false;
  }

  _syncChar() {
    const c = this.char;
    c.x0 = this.pos.x - 0.28; c.x1 = this.pos.x + 0.28;
    c.z0 = this.pos.z - 0.28; c.z1 = this.pos.z + 0.28;
    c.y0 = this.pos.y; c.y1 = this.pos.y + 1.9;
  }

  // ---------------- update ----------------
  update(dt, ctx) {
    if (this.state === 'dormant' || this.state === 'gone') return;

    // limited-time appearance: animate only, then vanish
    if (this.tempLife !== null) {
      this.tempLife -= dt;
      if (this.tempLife <= 0) {
        this.tempLife = null;
        this.despawn();
        return;
      }
    }

    const p = ctx.player;
    const dx = p.x - this.pos.x, dz = p.z - this.pos.z;
    const dist = Math.hypot(dx, dz);
    const toPlayer = new THREE.Vector3(dx, 0, dz).normalize();
    const looking = toPlayer.dot(ctx.lookDir) > 0.55;

    // --- procedural animation ---
    const animSpeed = this.state === 'chase' ? 2.0 : 0.7;
    this.walkPhase += dt * animSpeed * 6.5 * (this.state === 'attack' ? 0 : 1);
    const sw = this.state === 'attack' ? 0 : (this.state === 'chase' ? 0.62 : 0.3);
    this.legL.rotation.x = Math.sin(this.walkPhase) * sw;
    this.legR.rotation.x = -Math.sin(this.walkPhase) * sw;
    this.armL.rotation.x = -0.18 + Math.sin(this.walkPhase + Math.PI) * sw * 0.7;
    this.armR.rotation.x = -0.24 + Math.sin(this.walkPhase) * sw * 0.7;
    this.torso.rotation.z = Math.sin(this.walkPhase) * 0.045;
    this.torso.rotation.x = -0.16 + Math.abs(Math.sin(this.walkPhase)) * 0.05; // hunched
    this.group.position.y = this.pos.y + Math.abs(Math.sin(this.walkPhase)) * 0.03;

    // head twitch
    this.twitchTimer -= dt;
    if (this.twitchTimer <= 0) {
      this.twitchTimer = rand(0.35, 1.1);
      this.headTarget.set(rand(-0.15, 0.25), rand(-0.5, 0.5), rand(-0.3, 0.3));
      if (looking && dist < 20) this.headTarget.set(-0.05, 0, 0.06); // fixate on player
    }
    const k = Math.min(1, dt * 6);
    this.headRot.x = lerp(this.headRot.x, this.headTarget.x, k);
    this.headRot.y = lerp(this.headRot.y, this.headTarget.y, k);
    this.headRot.z = lerp(this.headRot.z, this.headTarget.z, k);
    this.headG.rotation.set(this.headRot.x, this.headRot.y, this.headRot.z);

    // jaw drops open while hunting, ember eyes flare up
    const jawOpen = this.state === 'chase' ? 0.3 + Math.sin(this.walkPhase * 2.1) * 0.08
      : this.state === 'attack' ? 0.55 : 0;
    this.jaw.rotation.x = lerp(this.jaw.rotation.x, jawOpen, Math.min(1, dt * 8));
    const hot = this.state === 'chase' || this.state === 'attack';
    this.eyeMat.emissiveIntensity = lerp(this.eyeMat.emissiveIntensity,
      hot ? 0.75 + 0.45 * Math.sin(this.walkPhase * 9) : 0, Math.min(1, dt * 6));
    // cloth shreds flutter
    for (let i = 0; i < this.cloth.length; i++) {
      this.cloth[i].rotation.z = Math.sin(this.walkPhase * 2.3 + i * 1.4) * 0.12;
    }

    // --- flashlight visibility flicker ---
    if (ctx.flashHit && dist < 22) {
      this.visible = Math.sin(ctx.time * 88 + this.walkPhase) > -0.15;
    } else this.visible = true;
    this.group.visible = this.visible && this.state !== 'gone';

    // --- state logic (frozen during limited appearances) ---
    if (this.tempLife !== null) {
      this.lastPos.copy(this.pos);
      return;
    }

    if (this.state === 'stalk') {
      if (ctx.flashHit && dist < 22) {
        this.litTimer += dt;
        if (this.litTimer > 0.9) { this._enterChase(ctx); }
      } else this.litTimer = Math.max(0, this.litTimer - dt * 2);

      if (looking && dist < 15 && !ctx.flashHit) {
        this.stareTimer += dt;
        if (this.stareTimer > 1.15) this._enterChase(ctx);
      } else this.stareTimer = Math.max(0, this.stareTimer - dt);

      if (!looking && dist > 9 && dist < 40) {
        this.teleportTimer -= dt;
        if (this.teleportTimer <= 0) {
          this.teleportTimer = rand(1.6, 3.2);
          this._teleportNear(ctx, 7.5, 10);
          ctx.audio.whisper(0, 1.2);
        }
      }

      if (dist > 13 && !looking) this._moveToward(ctx, dt, 0.9);
      else if (dist > 26) this._moveToward(ctx, dt, 1.5);
    }

    if (this.state === 'chase') {
      // chase speed 3.3: faster than the player's walk (2.7) but slower than
      // sprint (3.9), so escape requires actually running. It was 2.35, i.e.
      // SLOWER than walking - the monster could never catch anyone.
      this._moveToward(ctx, dt, 3.3);
      this.stepTimer -= dt;
      if (this.stepTimer <= 0) {
        this.stepTimer = 0.5;
        ctx.audio.thud();
      }
      if (dist < 1.3 && ctx.time > 0) {
        this.state = 'attack';
        this.attackTimer = 0.42;
        this._teleportTowardPlayer(ctx, 0.55); // lunge
        ctx.audio.sting();
        ctx.game?.onMonsterAttack?.();
      }
      if (dist > 30) {
        this._teleportNear(ctx, 18, 24);
        this.state = 'stalk';
        this.litTimer = 0;
      }
    }

    if (this.state === 'attack') {
      // arms rise toward the player
      this.armL.rotation.x = lerp(this.armL.rotation.x, -2.6, dt * 9);
      this.armR.rotation.x = lerp(this.armR.rotation.x, -2.7, dt * 9);
      this.headG.rotation.set(-0.12, this.headRot.y, 0);
      this.attackTimer -= dt;
      if (this.attackTimer <= 0) {
        this.state = 'gone';
        this.group.visible = false;
        ctx.game?.onMonsterAttackEnd?.();
      }
    }

    this.lastPos.copy(this.pos);
  }

  _enterChase(ctx) {
    if (this.state !== 'stalk') return;
    this.state = 'chase';
    this.stepTimer = 0;
    ctx.audio.moan(0);
    ctx.audio.duck();
    ctx.game?.onChaseStart?.();
  }

  _moveToward(ctx, dt, speed) {
    const p = ctx.player;
    const dx = p.x - this.pos.x, dz = p.z - this.pos.z;
    const d = Math.max(0.0001, Math.hypot(dx, dz));
    const step = Math.min(d, speed * dt);
    this._syncChar();
    moveWithCollisions(this.char, (dx / d) * step, 0, (dz / d) * step, ctx.colliders, 0.4, { bodyHeight: 1.0 });
    this.pos.x = (this.char.x0 + this.char.x1) / 2;
    this.pos.z = (this.char.z0 + this.char.z1) / 2;
    // snap to the ground under the feet (climbs stairs, follows floor levels)
    let support = -Infinity;
    const cx = (this.char.x0 + this.char.x1) / 2, cz = (this.char.z0 + this.char.z1) / 2;
    for (const b of ctx.colliders) {
      if (b.x0 < this.char.x1 && b.x1 > this.char.x0 && b.z0 < this.char.z1 && b.z1 > this.char.z0) {
        if (b.y1 <= this.pos.y + 0.45 && b.y1 > support &&
            b.x0 < cx && b.x1 > cx && b.z0 < cz && b.z1 > cz) support = b.y1;
      }
    }
    if (support > -1e9 && Math.abs(support - this.pos.y) <= 0.45) this.pos.y = support;
    this.group.position.x = this.pos.x;
    this.group.position.z = this.pos.z;
    this.group.position.y = this.pos.y + Math.abs(Math.sin(this.walkPhase)) * 0.03;

    // face movement direction
    if (step > 0.0001) {
      const ty = Math.atan2(dx, dz);
      let dy = ty - this.group.rotation.y;
      dy = Math.atan2(Math.sin(dy), Math.cos(dy));
      this.group.rotation.y += dy * Math.min(1, dt * 5);
    }

    // stuck / door handling
    const moved = Math.hypot(this.pos.x - this.lastPos.x, this.pos.z - this.lastPos.z);
    if (this.state === 'chase' && moved < 0.008) {
      this.stuckTime += dt;
      if (this.stuckTime > 0.9) {
        // try opening a nearby door
        let opened = false;
        for (const door of ctx.doors) {
          if (!door.locked && !door.open) {
            const h = door.hinge;
            if (Math.hypot(h.x - this.pos.x, h.z - this.pos.z) < 1.4) {
              ctx.game?.level?.forceOpen(door);
              ctx.audio.doorOpen();
              opened = true;
              break;
            }
          }
        }
        if (this.stuckTime > 2.2) {
          this._teleportNear(ctx, 5, 9);
          this.stuckTime = 0;
        } else if (opened) this.stuckTime = 0;
      }
    } else this.stuckTime = 0;
  }

  _teleportNear(ctx, dMin, dMax) {
    const nodes = ctx.nodes;
    let best = null, bestErr = Infinity;
    for (const n of nodes) {
      const d = Math.hypot(n.x - ctx.player.x, n.z - ctx.player.z);
      if (d < dMin || d > dMax) continue;
      // skip nodes that would embed the monster in a wall/object
      if (this._hitWall(n.x, n.y, n.z, ctx.colliders)) continue;
      const err = Math.abs(d - (dMin + dMax) / 2);
      if (err < bestErr) { bestErr = err; best = n; }
    }
    if (best) {
      this.pos.set(best.x, best.y, best.z);
      this.group.position.set(best.x, best.y, best.z);
      this._syncChar();
    }
  }

  _teleportTowardPlayer(ctx, dist) {
    const dx = ctx.player.x - this.pos.x, dz = ctx.player.z - this.pos.z;
    const d = Math.max(0.001, Math.hypot(dx, dz));
    const ux = dx / d, uz = dz / d;
    // try progressively farther spots: the player may be pressed against a
    // wall, and the old code would teleport the monster INSIDE it (visible
    // clipping through the wall during the lunge)
    for (const test of [dist, 0.8, 1.1, 1.5]) {
      const tx = ctx.player.x - ux * test;
      const tz = ctx.player.z - uz * test;
      if (!this._hitWall(tx, ctx.player.y, tz, ctx.colliders)) {
        this.pos.x = tx;
        this.pos.z = tz;
        this.pos.y = ctx.player.y;
        this.group.position.copy(this.pos);
        this._syncChar();
        return;
      }
    }
    // no free spot found: stay where we are instead of clipping through walls
  }

  // true if a 0.28-radius, ~1.9m-tall monster AABB at (x,z) on floor y would
  // overlap any blocking collider
  _hitWall(x, y, z, colliders) {
    const r = 0.28;
    for (const b of colliders) {
      if (b.x0 < x + r && b.x1 > x - r && b.z0 < z + r && b.z1 > z - r &&
          b.y1 > y + 0.1 && b.y0 < y + 1.9) return true;
    }
    return false;
  }
}

// ---------------------------------------------------------------------------
// Ghost girl: pale T-pose figure that appears in doorways, then fades.
// ---------------------------------------------------------------------------
export class GhostGirl {
  constructor(scene) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.visible = false;
    this.opacity = 0;
    this.mats = [];
    this._build();
    this.scene.add(this.group);
    this.life = 0;
    this.bob = rand(0, 6);
  }

  _build() {
    const mat = new THREE.MeshBasicMaterial({
      color: 0xdde3e8, transparent: true, opacity: 0.45, depthWrite: false,
    });
    this.mats.push(mat);
    const dark = new THREE.MeshBasicMaterial({ color: 0x0a0c10 });
    const add = (w, h, d, x, y, z) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      m.position.set(x, y, z);
      this.group.add(m);
      return m;
    };
    add(0.3, 0.7, 0.18, 0, 1.05, 0);            // torso
    add(0.28, 0.3, 0.26, 0, 1.5, 0);           // head
    this.ghostArmL = add(0.14, 0.68, 0.14, -0.42, 1.0, 0);      // arm L (T-pose)
    this.ghostArmR = add(0.14, 0.68, 0.14, 0.42, 1.0, 0);       // arm R
    add(0.13, 0.68, 0.13, -0.09, 0.34, 0);     // leg L
    add(0.13, 0.68, 0.13, 0.09, 0.34, 0);      // leg R
    // dress
    const dress = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.9, 0.34), mat);
    dress.position.set(0, 0.5, 0);
    this.group.add(dress);
    // dark eye sockets + hair
    const eye1 = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.06, 0.02), dark);
    eye1.position.set(-0.06, 1.52, 0.135);
    const eye2 = eye1.clone(); eye2.position.x = 0.06;
    this.group.add(eye1, eye2);
    for (let i = 0; i < 4; i++) {
      const h = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.4 + rand(0, 0.2), 0.03), dark);
      h.position.set(rand(-0.12, 0.12), 1.62, rand(-0.08, 0.02));
      this.group.add(h);
    }
  }

  appearAt(x, y, z, ry) {
    this.group.position.set(x, y, z);
    this.group.rotation.y = ry;
    this.group.visible = true;
    this.life = 1.9;
    this.opacity = 0;
    this.group.scale.setScalar(0.96);
  }

  hide() {
    this.group.visible = false;
    this.life = 0;
  }

  update(dt, playerPos) {
    if (!this.group.visible) return;
    this.bob += dt;
    this.group.position.y += Math.sin(this.bob * 1.6) * 0.002;
    // arms droop and sway slowly, presence flickers
    this.ghostArmL.rotation.z = -0.18 + Math.sin(this.bob * 0.7) * 0.05;
    this.ghostArmR.rotation.z = 0.18 + Math.cos(this.bob * 0.8) * 0.05;
    if (Math.random() < 0.05) this.opacity *= 0.55;
    // slow turn toward the player
    const ty = Math.atan2(playerPos.x - this.group.position.x, playerPos.z - this.group.position.z);
    let dy = ty - this.group.rotation.y;
    dy = Math.atan2(Math.sin(dy), Math.cos(dy));
    this.group.rotation.y += dy * Math.min(1, dt * 0.8);

    this.life -= dt;
    const target = this.life > 0.55 ? 0.42 : 0;
    this.opacity = lerp(this.opacity, target, dt * 6);
    for (const m of this.mats) m.opacity = this.opacity;
    if (this.life <= 0) this.hide();
  }
}
