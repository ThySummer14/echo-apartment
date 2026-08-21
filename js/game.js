// game.js — main loop: renderer + post FX, player controller, interactions,
// event director, monster AI glue, scares, UI flow.
import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { AudioEngine } from './audio.js';
import { Level } from './level.js';
import { Monster, GhostGirl } from './monster.js';
import { updateTVStatic } from './textures.js';
import { setSnapResolution, aabbFromSphere, moveWithCollisions, clamp, lerp, rand, chance, pick } from './util.js';

const RENDER_W = 640, RENDER_H = 360;
const EYE = 1.55, PLAYER_H = 1.75, PLAYER_R = 0.3;

const $ = (id) => document.getElementById(id);

// ---------------------------------------------------------------- notes / text
const NOTES = {
  1: {
    title: '管理人的手记 — 7月14日',
    titleJa: '管理人の手記 — 7月14日',
    item: '手记 1/3',
    cn: '深夜又传来了声响。\n自从3号室那家人消失之后，一直如此。\n\n总觉得，只有那个孩子\n还留在这里。\n\n玄关的门，再也打不开了。',
    ja: 'また夜中に物音がする。\n3号室の家族が消えてから、ずっとだ。\n\nあの子だけが、まだここにいる気がする。\n\n玄関のドアは、もう開かない。',
  },
  2: {
    title: '旧报纸的剪报',
    titleJa: '古新聞の切り抜き',
    item: '手记 2/3',
    cn: '○○公寓一家失踪事件\n3号室的一家四口，一夜之间消失了。\n只有长子（7岁）至今下落不明。\n\n邻居的证言：\n「夜里，听见有人在走廊走动的声音。」',
    ja: '◯◯アパート一家失踪事件\n3号室の家族4人が、忽然と姿を消した。\n長男（7）の行方のみ、いまだ不明。\n\n近隣住民の証言：\n「夜、誰かが廊下を歩く音を聞いた」',
  },
  3: {
    title: '孩子的涂鸦',
    titleJa: '子供の落書き',
    item: '手记 3/3',
    cn: '妈妈，你在哪里？\n\n有一个高高的黑色人影\n一直站在我们身后。\n\n一到晚上，它就会看着这边。',
    ja: 'おかあさん どこ？\n\nせのたかい くろいひとが\nいつも うしろに いる。\n\nよるになると こっちを みてる。',
  },
};

const END_TEXT =
  '外面还很黑。\n但身后的气息，已经消失了。\n\n你没有回头，走进了夜色。\n\n——回声公寓 · 终';
const END_TEXT_JA =
  '外はまだ暗い。\nけれど、背後の気配はもうない。\n\nあなたは振り返らず、夜の中へ歩き出した。\n\n――残響アパート・了';

// ---------------------------------------------------------------- grade shader
const GRADE_VERT = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const GRADE_FRAG = `
  uniform sampler2D tDiffuse;
  uniform float uTime;
  uniform float uFear;
  uniform float uDistort;
  uniform float uGlow;
  uniform float uExposure;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
  float bayer4(vec2 p) {
    p = floor(p);
    float i = mod(p.x, 4.0) + 4.0 * mod(p.y, 4.0);
    float v = 0.0;
    if (i < 0.5) v = 0.0; else if (i < 1.5) v = 8.0;
    else if (i < 2.5) v = 2.0; else if (i < 3.5) v = 10.0;
    else if (i < 4.5) v = 12.0; else if (i < 5.5) v = 4.0;
    else if (i < 6.5) v = 14.0; else if (i < 7.5) v = 6.0;
    else if (i < 8.5) v = 3.0; else if (i < 9.5) v = 11.0;
    else if (i < 10.5) v = 1.0; else if (i < 11.5) v = 9.0;
    else if (i < 12.5) v = 15.0; else if (i < 13.5) v = 7.0;
    else if (i < 14.5) v = 13.0; else v = 5.0;
    return v / 16.0;
  }

  // three.js' ACES filmic fit + sRGB OETF, moved here from OutputPass so the
  // ordered dither at the end can quantize DISPLAY values (see note in main()).
  vec3 acesFilm(vec3 color) {
    const mat3 ACESInputMat = mat3(
      vec3(0.59719, 0.07600, 0.02840),
      vec3(0.35458, 0.90834, 0.13383),
      vec3(0.04823, 0.01566, 0.83777)
    );
    const mat3 ACESOutputMat = mat3(
      vec3( 1.60475, -0.10208, -0.00327),
      vec3(-0.53108,  1.10813, -0.07276),
      vec3(-0.07367, -0.00605,  1.07602)
    );
    color *= uExposure / 0.6;
    color = ACESInputMat * color;
    color = (color * (color + 0.0245786) - 0.000090537)
          / (color * (0.983729 * color + 0.4329510) + 0.238081);
    color = ACESOutputMat * color;
    return clamp(color, 0.0, 1.0);
  }
  vec3 linearToSRGB(vec3 c) {
    return mix(pow(c, vec3(0.41666)) * 1.055 - 0.055, c * 12.92,
               vec3(lessThanEqual(c, vec3(0.0031308))));
  }

  void main() {
    vec2 uv = vUv;
    // fear wobble / barrel distortion
    vec2 c = uv - 0.5;
    uv += c * dot(c, c) * uFear * 0.18;
    uv += c * uDistort * 0.02;

    float sp = 0.0008 + 0.0022 * uDistort + 0.0006 * uFear;
    vec3 col;
    col.r = texture2D(tDiffuse, uv + vec2(sp, 0.0)).r;
    col.g = texture2D(tDiffuse, uv).g;
    col.b = texture2D(tDiffuse, uv - vec2(sp, 0.0)).b;

    // cheap built-in bloom: two rings of thresholded taps, added back
    // (replaces a separate bloom pass - robust on all GPUs, very retro)
    // NOTE: this runs BEFORE tone mapping/exposure, on HalfFloat scene values.
    // The threshold must sit above the distant-lights luminance band
    // (ambient + many corridor fixtures accumulate to ~1.1 far away) or the
    // bloom grows that band into a wide white smear across the corridor.
    vec3 glow = vec3(0.0);
    float gt = 1.2;
    for (float i = 0.0; i < 16.0; i++) {
      float a = i * 0.3926991; // golden-angle rotation
      float rad = 0.0035 + 0.011 * floor(i / 8.0);
      vec3 s = texture2D(tDiffuse, uv + vec2(cos(a), sin(a)) * rad).rgb;
      glow += max(vec3(0.0), s - vec3(gt));
    }
    col += glow * (uGlow / 16.0);

    // Extra highlight shoulder (safety net against large pure-white sheets).
    // Below 1.2 the curve is untouched; above it values are rolled off so a
    // close flashlight hotspot or a light fixture can never accumulate into an
    // all-white wall after tone mapping.
    vec3 over = max(vec3(0.0), col - vec3(1.2));
    // Roll off only the part above 1.2; pixels at or below 1.2 stay untouched.
    col += over * (vec3(1.0) / (vec3(1.0) + over * 0.32) - vec3(1.0));

    // scanlines (2px at 360p)
    col *= 1.0 - 0.085 * sin(uv.y * 360.0 * 3.14159265);

    // cold teal push in the shadows, red pulse under fear
    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(col, col * vec3(0.92, 1.06, 1.12), (1.0 - lum) * 0.22 * (1.0 - uFear * 0.6));
    col += vec3(1.0, 0.22, 0.16) * uFear * 0.035 * (0.6 + 0.4 * sin(uTime * 6.5));

    // vignette
    float vg = length(uv - 0.5);
    col *= 1.0 - smoothstep(0.38, 1.0, vg) * (0.34 + uFear * 0.28 + uDistort * 0.25);

    // display transform (was OutputPass). Everything above works on linear
    // HalfFloat scene values; ACES + sRGB happen here so the grain and the
    // ordered dither below operate on DISPLAY values. Dithering LINEAR values
    // put the first code step at ~21% display brightness — the bayer pattern
    // turned every near-black wall into a harsh 0-vs-50/255 checkerboard,
    // which was the "dark fields drown in grain" artifact.
    col = acesFilm(col);
    col = linearToSRGB(col);

    // film grain, in display space: perceptually even size, gently tapered
    // toward the shadows (alive in the light, blacks stay quiet)
    float dlum = dot(col, vec3(0.299, 0.587, 0.114));
    col += (hash(uv * 913.7 + fract(uTime) * 131.1) - 0.5)
         * 0.045 * (0.3 + 0.7 * smoothstep(0.05, 0.25, dlum));

    // ordered dithering (banding killer) — 32 perceptually even display levels
    col = floor(col * 31.0 + bayer4(gl_FragCoord.xy)) / 31.0;

    gl_FragColor = vec4(col, 1.0);
  }
`;

// ---------------------------------------------------------------- game
class Game {
  constructor() {
    this.audio = new AudioEngine();
    this.state = 'title'; // title | playing | scared | ending
    this.notes = new Set();
    this.fear = 0;
    this.time = 0;
    this.scareCount = 0;
    this.startTime = 0;
    this.noteOpen = false;
    this.blackout = false;
    this.finale = false;
    this.phoneRinging = false;
    this.phoneArmed = false;
    this.phoneTimer = null;
    this.eventTimer = rand(20, 30);
    this.keys = {};
    this.bobPhase = 0;
    this.lastBobSin = 0;
    this.bob = 0;
    this.eyeY = 0;
    this.vy = 0;
    this.grounded = true;
    this.flashOn = true;
    this.shake = 0;
    this.scaredTimer = 0;
    this.fadeLevel = 0;
    this.subtitleTimer = null;
    this.introStep = 0;
    this.monster = null;
    this.ghost = null;
    this.initOK = false;

    try {
      this._initRenderer();
      this._initScene();
      this._initPost();
      this._initLevel();
      this._initEntities();
      this._initPlayer();
      this._initDust();
      this._initEvents();
      this._initTouch();
      this.initOK = true;
    } catch (err) {
      console.error(err);
      $('error').classList.remove('hidden');
      $('title').classList.add('hidden');
      return;
    }
    this.nopost = new URLSearchParams(location.search).has('nopost');
    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);
  }

  // ------------------------------------------------------------ init: renderer
  _initRenderer() {
    this.canvas = $('game');
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: false, powerPreference: 'high-performance' });
    this.renderer.setSize(RENDER_W, RENDER_H, false);
    this.renderer.setPixelRatio(1);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.38;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x04060a);
    this.scene.fog = new THREE.FogExp2(0x05090d, 0.062);
    this.camera = new THREE.PerspectiveCamera(75, RENDER_W / RENDER_H, 0.05, 70);
    this.camera.rotation.order = 'YXZ';
    // CRITICAL: the camera must be part of the scene graph, otherwise the
    // renderer's scene traversal never collects camera-attached lights/meshes
    // (the flashlight would silently illuminate nothing).
    this.scene.add(this.camera);
    setSnapResolution(RENDER_W, RENDER_H);
    window.addEventListener('resize', () => this._fitCanvas());
    this._fitCanvas();
  }

  _fitCanvas() {
    const w = window.innerWidth, h = window.innerHeight;
    const target = RENDER_W / RENDER_H;
    if (w / h > target) {
      this.canvas.style.width = `${w}px`;
      this.canvas.style.height = `${w / target}px`;
    } else {
      this.canvas.style.height = `${h}px`;
      this.canvas.style.width = `${h * target}px`;
    }
  }

  _initScene() {
    this.hemi = new THREE.HemisphereLight(0x2a3844, 0x0a0705, 1.26);
    this.hemiBase = 1.26;
    this.scene.add(this.hemi);
    // lightning director state: strikes flicker the windows + sky glow, with
    // distance-delayed thunder
    this.lightning = { next: rand(25, 60), t: 0, dur: 0, dist: 0.5 };
  }

  _initPost() {
    this.composer = new EffectComposer(this.renderer);
    this.composer.setSize(RENDER_W, RENDER_H);
    this.composer.setPixelRatio(1);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    this.grade = new ShaderPass({
      uniforms: {
        tDiffuse: { value: null },
        uTime: { value: 0 },
        uFear: { value: 0 },
        uDistort: { value: 0 },
        uGlow: { value: 0.35 },
        uExposure: { value: this.renderer.toneMappingExposure },
      },
      vertexShader: GRADE_VERT,
      fragmentShader: GRADE_FRAG,
    });
    this.composer.addPass(this.grade);
    // no OutputPass: the grade shader itself ends with ACES + sRGB so its
    // grain and ordered dither work in display space (see GRADE_FRAG)
  }

  // ------------------------------------------------------------ init: world
  _initLevel() {
    this.level = new Level(this.scene, {
      onLocked: (d) => { this._sub(d.lockedMsg, ''); this.audio.woodenCreak(); },
      onDoorToggle: (d, open) => { open ? this.audio.doorOpen() : this.audio.doorClose(); },
      onDeadDoor: () => {
        this._sub('这里……是墙？', 'ここは…壁？');
        this.audio.woodenCreak();
        this.level.props.eyesWall.visible = true;
        this._setFear(this.fear + 0.15);
      },
      onExitOpen: () => { this._sub('夜风涌了进来。', '外の空気が、流れ込む。'); },
      onNote: (id) => this._readNote(id),
      onPhone: () => this._answerPhone(),
      onTV: () => this._toggleTV(),
      onBell: () => this._ringBell(),
      onDoll: () => this._lookDoll(),
      onLamp: () => this._toggleLamp(),
      onMirror: () => this._mirrorScare(),
      onSwitch: (rec) => this._toggleSwitch(rec),
      onDrip: () => this.audio.drip(),
      onWasher: () => {
        // touching it: half a turn of the drum, a lurch - then dead silence
        this.audio.washer(-0.6);
        this.shake = Math.max(this.shake, 0.1);
        this._sub('洗衣机动了半圈，又停了。', '洗濯機が半周回って、止まった。', 3);
        this._setFear(this.fear + 0.05);
      },
      // zone handlers
      zone_kitchen: () => this._zoneKitchen(),
      zone_living: () => this._zoneLiving(),
      zone_bedroom: () => this._zoneBedroom(),
      zone_bathroom: () => this._zoneBathroom(),
      zone_passage: () => this._zonePassage(),
      zone_altar: () => this._zoneAltar(),
      zone_child: () => this._zoneChild(),
      zone_upper: () => this._zoneUpper(),
      zone_corridorMid: () => this._zoneCorridorMid(),
      zone_stairsEast: () => this._zoneStairs(),
      zone_exitVoid: () => this._zoneExitVoid(),
    });
    this.colliders = this.level.colliders;
    // precompute Box3s for the line-of-sight interaction check (static set)
    this._losBoxes = this.level.colliders.map((c) => new THREE.Box3(
      new THREE.Vector3(c.x0, c.y0, c.z0),
      new THREE.Vector3(c.x1, c.y1, c.z1),
    ));
  }

  _initEntities() {
    this.monster = new Monster(this.scene, this.level.tex);
    this.ghost = new GhostGirl(this.scene);
  }

  // ------------------------------------------------------------ init: player
  _initPlayer() {
    this.controls = new PointerLockControls(this.camera, document.body);
    // sensitivity in rad/px, persisted across sessions (pause-screen slider).
    // NOTE: three's pointerSpeed is a MULTIPLIER on its built-in 0.002 rad/px
    // base — setting it to a rad/px value directly makes turning ~500x too slow.
    let s0 = 0.014;
    try { const p = parseFloat(localStorage.getItem('echo_sens')); if (p > 0) s0 = p; } catch (e) {}
    this.sens = clamp(s0, 0.004, 0.04);
    this.controls.pointerSpeed = this.sens / 0.002;
    this.controls.addEventListener('lock', () => this._onLock());
    this.controls.addEventListener('unlock', () => this._onUnlock());

    this.playerPos = new THREE.Vector3().copy(this.level.playerStart);
    this.char = aabbFromSphere(this.playerPos.x, this.playerPos.y, this.playerPos.z, PLAYER_R, PLAYER_H);

    // flashlight (physical units: bright enough to read the room but NOT so hot
    // that the beam clips to a big white blob on nearby walls; faster falloff
    // (decay 1.5) keeps the hotspot from blowing out walls at close range).
    // NOTE: kept as a direct scene child (not camera-attached) - camera-attached
    // spotlights proved unreliable on some GPU/driver combos and lit nothing.
    this.flash = new THREE.SpotLight(0xcfe0ff, 5.5, 18, 0.34, 0.85, 1.7);
    this.flash.position.set(0.1, EYE - 0.06, this.playerPos.z);
    // shadows disabled on the flashlight: a moving spotlight shadow map is the
    // classic source of white speckle (shadow acne) on walls, and it costs a
    // full shadow pass every frame. The beam + hotspot look is carried by the
    // light itself and the cone mesh.
    this.flash.castShadow = false;
    this.flash.shadow.mapSize.set(512, 512);
    this.flash.shadow.bias = 0.0004;
    this.flash.shadow.normalBias = 0.02;
    this.flash.shadow.camera.near = 0.1;
    this.flash.shadow.camera.far = 30;
    // target placed 12m ahead of the camera every frame (the beam must point
    // FORWARD, not at the camera itself)
    this.flashTarget = new THREE.Object3D();
    this.flashTarget.position.set(0, 0, -12);
    this.scene.add(this.flashTarget);
    this.flash.target = this.flashTarget;
    this.scene.add(this.flash);
    this._tmpDir = new THREE.Vector3();

    // volumetric-ish beam cone (narrow, so it never slices through the walls)
    const coneGeo = new THREE.ConeGeometry(0.6, 6.5, 18, 1, true);
    coneGeo.translate(0, 3.25, 0);
    coneGeo.rotateX(Math.PI / 2);
    this.coneMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uFade: { value: 1 },
        uOpacity: { value: 0.05 },
      },
      vertexShader: `
        varying float vZ;
        void main() {
          vZ = position.z;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform float uFade;
        uniform float uOpacity;
        varying float vZ;
        void main() {
          float a = pow(max(0.0, 1.0 - vZ / 6.5), 2.4);
          // fade the first 1.2m: viewed from inside the cone, the near-eye
          // stretch added up to 0.1 luminance across the screen center and
          // clipped moderately lit walls into a solid white rectangle
          a *= smoothstep(0.0, 1.2, vZ);
          float shimmer = 0.85 + 0.15 * sin(uTime * 40.0 + vZ * 5.0);
          gl_FragColor = vec4(vec3(0.72, 0.82, 0.95) * shimmer, a * uOpacity * uFade);
        }
      `,
    });
    this.cone = new THREE.Mesh(coneGeo, this.coneMat);
    this.cone.position.set(0.04, -0.09, 0.01);
    this.camera.add(this.cone);

    // keys
    window.addEventListener('keydown', (e) => { this.keys[e.code] = true; this._onKey(e); });
    window.addEventListener('keyup', (e) => { this.keys[e.code] = false; });

    // --- trackpad / drag-to-look fallback -------------------------------
    // macOS trackpads (tap-to-click) often cannot obtain pointer lock, and
    // some browsers deny lock() without a hard mouse button press. When the
    // pointer is not locked, allow holding + dragging to turn the view, so
    // turning always works regardless of pointer-lock availability.
    this.dragging = false;
    this._dragX = 0; this._dragY = 0;
    this.canvas.addEventListener('mousedown', (e) => {
      if (document.pointerLockElement) return;
      if (this.state !== 'playing' || this.noteOpen) return;
      if (this.controls.pointerSpeed === 0) return; // frozen during a scare
      this.dragging = true;
      this._dragX = e.clientX;
      this._dragY = e.clientY;
    });
    window.addEventListener('mousemove', (e) => {
      if (!this.dragging || document.pointerLockElement) return;
      if (this.state !== 'playing' || this.noteOpen) { this.dragging = false; return; }
      if (this.controls.pointerSpeed === 0) return;
      const dx = e.clientX - this._dragX;
      const dy = e.clientY - this._dragY;
      this._dragX = e.clientX;
      this._dragY = e.clientY;
      const sens = this.sens; // shared with pointer-lock; user-adjustable on the pause screen
      const eul = this.camera.rotation;
      eul.order = 'YXZ';
      eul.y -= dx * sens;
      eul.x = clamp(eul.x - dy * sens, -1.52, 1.52);
      eul.z = 0;
    });
    window.addEventListener('mouseup', () => { this.dragging = false; });
    document.addEventListener('pointerlockerror', () => this._lockHint());
    // --------------------------------------------------------------------

    // initial camera placement (entry, facing east)
    this.camera.position.set(this.playerPos.x, EYE, this.playerPos.z);
    this.camera.rotation.set(0, Math.PI, 0);

    // click-to-relock fallback (browser pointer-lock cooldown)
    this.canvas.addEventListener('click', () => {
      if ((this.state === 'playing' || this.state === 'scared') && !this.noteOpen && !document.pointerLockElement) this._tryLock();
    });

    // title / pause / restart clicks
    $('title').addEventListener('click', () => this._start());
    $('pause').addEventListener('click', () => this._tryLock());
    $('end-again').addEventListener('click', () => location.reload());
    $('note').addEventListener('click', () => this._closeNote());
  }

  _initDust() {
    const N = 320;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(N * 3);
    this.dustPos = pos;
    for (let i = 0; i < N; i++) {
      pos[i * 3] = rand(-11, 11);
      pos[i * 3 + 1] = rand(0, 4);
      pos[i * 3 + 2] = rand(-11, 11);
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      color: 0x9db8cc, size: 0.02, sizeAttenuation: true,
      transparent: true, opacity: 0.18, depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.dust = new THREE.Points(geo, mat);
    this.scene.add(this.dust);
  }

  _initEvents() {
    // draw the jumpscare face once
    const c = $('scare-canvas');
    c.width = RENDER_W; c.height = RENDER_H;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, c.width, c.height);
    const rng = (n) => Math.random() * n;
    // pale elongated face
    ctx.fillStyle = '#b8b2a4';
    ctx.beginPath();
    ctx.ellipse(320, 190, 150 + rng(20), 200 + rng(30), 0.06, 0, 7);
    ctx.fill();
    ctx.fillStyle = '#8f897c';
    ctx.beginPath();
    ctx.ellipse(320, 330, 110, 70, 0.1, 0, 7);
    ctx.fill();
    // hollow eyes
    ctx.fillStyle = '#000';
    ctx.beginPath(); ctx.ellipse(250, 140, 38, 52, 0.15, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.ellipse(390, 140, 38, 52, -0.15, 0, 7); ctx.fill();
    // pupils barely visible
    ctx.fillStyle = '#3a3a38';
    ctx.beginPath(); ctx.arc(258, 150, 7, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.arc(382, 150, 7, 0, 7); ctx.fill();
    // gaping mouth
    ctx.fillStyle = '#000';
    ctx.beginPath(); ctx.ellipse(320, 300, 55, 85, 0, 0, 7); ctx.fill();
    ctx.fillStyle = '#2c1210';
    ctx.beginPath(); ctx.ellipse(320, 270, 40, 30, 0, 0, 7); ctx.fill();
    // grime streaks
    ctx.strokeStyle = 'rgba(60,50,40,0.5)';
    for (let i = 0; i < 26; i++) {
      ctx.beginPath();
      ctx.moveTo(200 + rng(240), 40 + rng(80));
      ctx.lineTo(200 + rng(240), 240 + rng(120));
      ctx.stroke();
    }
    // blood from eyes
    ctx.strokeStyle = 'rgba(110,10,8,0.8)';
    ctx.lineWidth = 6;
    for (const ex of [250, 390]) {
      ctx.beginPath();
      ctx.moveTo(ex, 190);
      ctx.lineTo(ex - 20, 260);
      ctx.stroke();
    }
  }

  // ------------------------------------------------------------ touch controls
  // Virtual joystick (left) + drag-to-look (anywhere else) + action buttons.
  // Pointer lock does not exist on phones, so the whole look/move path has a
  // touch twin; ?touch=1 forces the UI on desktop for testing.
  _initTouch() {
    const force = new URLSearchParams(location.search).has('touch');
    this.touchMode = force || ('ontouchstart' in window) ||
      ((navigator.maxTouchPoints | 0) > 0) ||
      (window.matchMedia && matchMedia('(pointer: coarse)').matches);
    if (!this.touchMode) return;

    document.body.classList.add('touch');
    this.touchMove = { x: 0, y: 0 };
    this.touchRun = false;
    this._joyId = null;
    this._lookId = null;
    this._lookLX = 0;
    this._lookLY = 0;
    const help = document.getElementById('touch-help');
    if (help) help.style.display = 'inline';

    const ui = $('touch-ui');
    const knob = $('joy-knob');
    const zone = $('joy-zone');
    const btnI = $('btn-interact');
    const TRAVEL = 42; // max knob travel in px

    // ---- joystick: vector from the base center, clamped, analog magnitude
    const joyCenter = () => {
      const r = zone.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    };
    const joyMove = (t) => {
      const c = joyCenter();
      let dx = t.clientX - c.x, dy = t.clientY - c.y;
      const d = Math.hypot(dx, dy);
      if (d > TRAVEL) { dx *= TRAVEL / d; dy *= TRAVEL / d; }
      this.touchMove.x = dx / TRAVEL;
      this.touchMove.y = dy / TRAVEL;
      knob.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    const joyEnd = () => {
      this._joyId = null;
      this.touchMove.x = 0;
      this.touchMove.y = 0;
      knob.style.transform = 'translate(0px, 0px)';
    };
    zone.addEventListener('touchstart', (e) => {
      e.preventDefault();
      if (this._joyId !== null) return;
      const t = e.changedTouches[0];
      this._joyId = t.identifier;
      joyMove(t);
    }, { passive: false });
    zone.addEventListener('touchmove', (e) => {
      e.preventDefault();
      for (const t of e.changedTouches) if (t.identifier === this._joyId) joyMove(t);
    }, { passive: false });
    for (const ev of ['touchend', 'touchcancel']) {
      zone.addEventListener(ev, (e) => {
        for (const t of e.changedTouches) if (t.identifier === this._joyId) joyEnd();
      }, { passive: false });
    }

    // ---- look: any touch that starts on the canvas (the buttons and the
    // joystick sit above it and never reach here)
    const canLook = () => this.state === 'playing' && !this.noteOpen;
    this.canvas.addEventListener('touchstart', (e) => {
      if (this._lookId !== null) return;
      const t = e.changedTouches[0];
      this._lookId = t.identifier;
      this._lookLX = t.clientX;
      this._lookLY = t.clientY;
    }, { passive: true });
    this.canvas.addEventListener('touchmove', (e) => {
      if (!canLook()) return;
      for (const t of e.changedTouches) {
        if (t.identifier !== this._lookId) continue;
        const dx = t.clientX - this._lookLX;
        const dy = t.clientY - this._lookLY;
        this._lookLX = t.clientX;
        this._lookLY = t.clientY;
        const eul = this.camera.rotation;
        eul.order = 'YXZ';
        // 0.85x of the mouse sens: a full-thumb swipe (~250px) turns ~170°
        eul.y -= dx * this.sens * 0.85;
        eul.x = clamp(eul.x - dy * this.sens * 0.85, -1.52, 1.52);
        eul.z = 0;
      }
      e.preventDefault();
    }, { passive: false });
    for (const ev of ['touchend', 'touchcancel']) {
      this.canvas.addEventListener(ev, (e) => {
        for (const t of e.changedTouches) if (t.identifier === this._lookId) this._lookId = null;
      }, { passive: false });
    }

    // ---- buttons
    const tap = (el, fn) => {
      el.addEventListener('touchend', (e) => { e.preventDefault(); fn(); }, { passive: false });
      el.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
    };
    tap(btnI, () => {
      if (this.noteOpen) { this._closeNote(); return; }
      if (this.state === 'playing') this._interact();
    });
    tap($('btn-flash'), () => {
      if (this.state !== 'playing') return;
      this.flashOn = !this.flashOn;
      $('btn-flash').classList.toggle('on', this.flashOn);
    });
    const runBtn = $('btn-run');
    runBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.touchRun = true;
      runBtn.classList.add('on');
    }, { passive: false });
    for (const ev of ['touchend', 'touchcancel']) {
      runBtn.addEventListener(ev, (e) => {
        e.preventDefault();
        this.touchRun = false;
        runBtn.classList.remove('on');
      }, { passive: false });
    }
    tap($('btn-pause'), () => {
      if (this.state === 'playing' && !this.noteOpen) $('pause').classList.remove('hidden');
    });

    // portrait hint
    const hint = $('rotate-hint');
    const orient = () => hint.classList.toggle('hidden', window.innerWidth >= window.innerHeight);
    orient();
    window.addEventListener('resize', orient);

    // flashlight starts ON: reflect it on the button
    $('btn-flash').classList.toggle('on', this.flashOn);

    this._touchUI = ui;
  }

  // ------------------------------------------------------------ UI helpers
  _sub(cn, ja = '', dur = 3.4) {
    const s = $('subtitle');
    s.querySelector('.cn').textContent = cn;
    s.querySelector('.ja').textContent = ja;
    s.classList.add('on');
    clearTimeout(this.subtitleTimer);
    this.subtitleTimer = setTimeout(() => s.classList.remove('on'), dur * 1000);
  }

  _setObjective(cn, ja = '') {
    $('objective').innerHTML = `<div>${cn}</div>${ja ? `<div class="obj-ja">${ja}</div>` : ''}`;
  }

  _prompt(text) {
    if (text) {
      $('prompt-text').textContent = text;
      $('prompt').classList.remove('hidden');
    } else $('prompt').classList.add('hidden');
  }

  _setFear(v) {
    this.fear = clamp(v, 0, 1);
    this.audio.setFear(this.fear);
    $('vignette').classList.toggle('fear', this.fear > 0.55);
  }

  _flashRed() {
    const f = $('flash');
    f.style.opacity = '1';
    setTimeout(() => { f.style.opacity = '0'; }, 90);
  }

  // ------------------------------------------------------------ flow
  _start() {
    if (this.state !== 'title') return;
    this.audio.ensure();
    this.state = 'playing';
    this.startTime = performance.now();
    $('title').classList.add('hidden');
    $('hud').classList.remove('hidden');
    if (this._touchUI) this._touchUI.classList.remove('hidden');
    this._tryLock();
    this._sub('……这里，是哪里？', '……ここは、どこだ', 3.2);
    setTimeout(() => {
      this._sub('这栋公寓的一家人失踪了。去找线索。', '家族が消えたアパート。手がかりを探せ。', 4.4);
      this._setObjective('寻找线索 0 / 3', '手がかりを探せ 0 / 3');
    }, 3800);
    setTimeout(() => {
      this._sub('走廊尽头，有什么东西。', '廊下の先に、何かがいる。', 3.4);
    }, 9000);
    setTimeout(() => {
      this._sub('按 F 开关手电筒', 'F で懐中電灯', 3.2);
    }, 12500);
  }

  setSensitivity(v) {
    this.sens = clamp(v, 0.004, 0.04);
    try { localStorage.setItem('echo_sens', String(this.sens)); } catch (e) {}
    // don't override the freeze flag during a scare (pointerSpeed === 0)
    if (this.controls.pointerSpeed !== 0) this.controls.pointerSpeed = this.sens / 0.002;
  }

  _tryLock() {
    if (this.state === 'ending') return;
    if (this.noteOpen) return;
    // phones have no pointer lock: tapping "resume" just dismisses the overlay
    if (this.touchMode) {
      $('pause').classList.add('hidden');
      return;
    }
    try {
      const r = this.controls.lock();
      // newer Chrome returns a promise that rejects without a user gesture
      if (r && typeof r.catch === 'function') r.catch(() => this._lockHint());
    } catch (e) { this._lockHint(); }
  }

  _lockHint() {
    if (this.lockHintShown || this.state !== 'playing') return;
    this.lockHintShown = true;
    this._sub('若视角无法转动：按住并拖动鼠标或触控板。', '視点が動かない場合：マウスかトラックパッドをドラッグ。', 5.5);
  }

  _onLock() {
    if (this.state === 'playing') $('pause').classList.add('hidden');
  }

  _onUnlock() {
    if (this.state === 'playing' && !this.noteOpen) {
      $('pause').classList.remove('hidden');
    }
  }

  _onKey(e) {
    if (e.code === 'KeyE') {
      if (this.noteOpen) { this._closeNote(); return; }
      if (this.state !== 'playing') return;
      this._interact();
    }
    if (e.code === 'KeyF' && this.state === 'playing') {
      this.flashOn = !this.flashOn;
    }
    if (e.code === 'KeyR' && this.state === 'playing') location.reload();
  }

  // ------------------------------------------------------------ interaction
  _interact() {
    const hit = this._raycastTarget();
    if (!hit) return;
    const it = hit.object.userData.interactable;
    if (it && it.action) it.action();
  }

  _raycastTarget() {
    this.raycaster = this.raycaster || new THREE.Raycaster();
    const meshes = [];
    for (const it of this.level.interactables) {
      if (it.disabled) continue;
      meshes.push(it.mesh);
    }
    this.raycaster.setFromCamera(new THREE.Vector2(0, 0), this.camera);
    const hits = this.raycaster.intersectObjects(meshes, true);
    for (const h of hits) {
      if (h.distance > 2.6) continue;
      let obj = h.object;
      while (obj && !obj.userData.interactable) obj = obj.parent;
      if (obj?.userData.interactable) {
        // line-of-sight: no interacting through walls/doors (the ray only
        // tests interactable meshes, so walls would otherwise never block)
        if (this._losBlocked(h.distance)) continue;
        return { object: obj, interactable: obj.userData.interactable };
      }
    }
    return null;
  }

  // is a static collider between the camera and distance `dist` blocking the
  // ray? (precomputed Box3s: level.colliders never changes)
  _losBlocked(dist) {
    this._ray = this._ray || new THREE.Ray();
    this._vDir = this._vDir || new THREE.Vector3();
    this._ray.origin.copy(this.camera.position);
    this.camera.getWorldDirection(this._vDir);
    this._ray.direction.copy(this._vDir);
    const hit = new THREE.Vector3();
    for (const b of this._losBoxes) {
      const t = this._ray.intersectBox(b, hit);
      if (t !== null && t < dist - 0.05) return true;
    }
    return false;
  }

  // ------------------------------------------------------------ notes
  _readNote(id) {
    if (this.noteOpen) return;
    const note = NOTES[id];
    if (!note) return;
    this.noteOpen = true;
    this.audio.paperRustle();
    $('note-item').textContent = note.item;
    $('note-title').innerHTML = `${note.title}<span class="n-ja-title">／${note.titleJa}</span>`;
    $('note-cn').textContent = note.cn;
    $('note-ja').textContent = note.ja;
    $('note').classList.remove('hidden');
    if (this._touchUI) this._touchUI.classList.add('hidden');
    this.controls.unlock();
    if (!this.notes.has(id)) {
      this.notes.add(id);
      this._onNoteFound(id);
    }
  }

  _closeNote() {
    if (!this.noteOpen) return;
    this.noteOpen = false;
    $('note').classList.add('hidden');
    if (this._touchUI) this._touchUI.classList.remove('hidden');
    if (this.state === 'playing') this._tryLock();
  }

  _onNoteFound(id) {
    const n = this.notes.size;
    this._sub(`找到线索了。　${n} / 3`, `手がかりを見つけた。　${n} / 3`, 2.6);
    if (n < 3) {
      this._setObjective(`寻找线索 ${n} / 3`, `手がかりを探せ ${n} / 3`);
      // after the second note, the presence grows
      if (n === 2) {
        setTimeout(() => {
          this._sub('……气息，变近了。', '……気配が、近くなった。', 3.4);
          this._setFear(0.35);
        }, 1500);
      }
    } else {
      this._startFinale();
    }
  }

  // ------------------------------------------------------------ props handlers
  _toggleTV() {
    const tv = this.level.props.tv;
    tv.on = !tv.on;
    this.audio.setTV(tv.on);
    if (tv.on) {
      this._sub('雪花噪点……', '砂嵐…。', 2);
    } else {
      this._sub('安静下来了。', '静かになった。', 2);
      // it may come back by itself
      tv.timer = rand(4, 9);
    }
  }

  _answerPhone() {
    if (this.phoneRinging) {
      this.phoneRinging = false;
      this.audio.phoneStop();
      this.audio.whisper(0.2, 2.2);
      this._sub('……妈妈？', '……おかあさん？', 3.2);
      this._setFear(this.fear + 0.12);
    } else {
      this.audio._noise({ dur: 0.4, type: 'highpass', freq: 1200, gain: 0.05 });
      this._sub('嘟——嘟——。', 'ツー…ツー…。', 2.4);
    }
  }

  _ringBell() {
    this.audio.bell();
    this._sub('铃声在黑暗中回荡。', '鈴の音が、闇に響いた。', 2.8);
    if (chance(0.6) && this.monster.state === 'dormant') {
      const s = this.level.ghostSpawns.find((g) => Math.hypot(g.x - this.playerPos.x, g.z - this.playerPos.z) > 3);
      if (s) {
        this.ghost.appearAt(s.x, s.y ?? 0, s.z, s.ry);
        this.audio.moan(0);
      }
    }
  }

  _lookDoll() {
    const doll = this.level.props.doll;
    if (!doll.turned) {
      doll.turned = true;
      const ty = Math.atan2(this.playerPos.x - doll.mesh.position.x, this.playerPos.z - doll.mesh.position.z);
      doll.targetYaw = ty;
      this.audio.whisper(0.3, 1.4);
      this._sub('人偶正看着你。', '人形が、こちらを見ている。', 2.8);
      this._setFear(this.fear + 0.1);
    } else {
      this._sub('……它在看。', '……見ている。', 2.2);
    }
  }

  _toggleLamp() {
    const lamp = this.level.props.lamp;
    lamp.on = !lamp.on;
    lamp.light.intensity = lamp.on ? 1.8 : 0;
    if (lamp.shade) lamp.shade.material = lamp.on ? lamp.shadeOn : lamp.shadeOff;
    this.audio.switchClick();
    this._sub(lamp.on ? '灯亮了。' : '灯灭了。', lamp.on ? '灯がついた。' : '灯が消えた。', 1.8);
  }

  // interactive wall switch: actually toggles its wired fixture. Sometimes the
  // apartment refuses to let a light stay off...
  _toggleSwitch(rec) {
    if (!rec) return;
    rec.on = !rec.on;
    if (rec.fluor) rec.fluor.userOff = !rec.on;
    if (rec.nub) rec.nub.position.y = rec.baseY + (rec.on ? 0.018 : -0.018);
    this.audio.switchClick();
    this._sub(rec.on ? '灯亮了。' : '灯灭了。', rec.on ? '灯がついた。' : '灯が消えた。', 1.6);
    if (!rec.on && chance(0.22)) {
      setTimeout(() => {
        if (this.state !== 'playing') return;
        rec.on = true;
        if (rec.fluor) rec.fluor.userOff = false;
        if (rec.nub) rec.nub.position.y = rec.baseY + 0.018;
        this.audio.buzz();
        this._sub('……灯，自己亮了。', '……電気が、ひとりでに点いた。', 3);
        this._setFear(this.fear + 0.1);
      }, rand(2000, 4500));
    }
  }

  _mirrorScare() {
    if (this.ghost.group.visible) return;
    const dir = new THREE.Vector3();
    this.camera.getWorldDirection(dir);
    dir.y = 0;
    dir.normalize();
    // she stands BEHIND you - the mirror shows what you cannot see.
    // Back off from walls so she never spawns inside one.
    let dist = 1.7;
    let bx = this.playerPos.x - dir.x * dist;
    let bz = this.playerPos.z - dir.z * dist;
    for (let i = 0; i < 6 && this._spotBlocked(bx, bz, this.playerPos.y); i++) {
      dist += 0.3;
      bx = this.playerPos.x - dir.x * dist;
      bz = this.playerPos.z - dir.z * dist;
    }
    const ty = Math.atan2(this.playerPos.x - bx, this.playerPos.z - bz);
    this.ghost.appearAt(bx, this.playerPos.y, bz, ty);
    this.ghost.life = 1.4;
    this.audio.whisper(-0.2, 1.6);
    this.audio.sting();
    this._sub('镜子里……站着人。', '鏡の中に…誰かが、立っている。', 3.2);
    this._setFear(this.fear + 0.18);
    this.shake = Math.max(this.shake, 0.4);
  }

  // is the ghost's footprint (~0.35 half-width, 1.7m tall) overlapping a
  // blocking collider at (x,z) standing on floor y?
  _spotBlocked(x, z, y) {
    const cs = this._dynColliders();
    for (const b of cs) {
      if (b.x0 < x + 0.35 && b.x1 > x - 0.35 && b.z0 < z + 0.35 && b.z1 > z - 0.35 &&
          b.y1 > y + 0.15 && b.y0 < y + 1.7) return true;
    }
    return false;
  }

  // ------------------------------------------------------------ zone handlers
  _zoneKitchen() {
    this.audio.clatter();
    this.audio.doorOpen();
    const cab = this.level.props.cabinet;
    if (!cab.openedOnce) {
      cab.openedOnce = true;
      this._sub('橱柜自己打开了。', '戸棚が、ひとりでに開いた。', 3.2);
      this._setFear(this.fear + 0.08);
      // arm the phone
      this.phoneArmed = true;
      this.phoneTimer = setTimeout(() => this._phoneRings(), rand(25, 45) * 1000);
    }
  }

  _phoneRings() {
    if (this.state !== 'playing' || this.phoneRinging) return;
    this.phoneRinging = true;
    this.audio.phoneRing();
    this._sub('电话在响。', '電話が、鳴っている。', 3);
    // stops ringing on its own after ~9s
    setTimeout(() => { this.phoneRinging = false; }, 9500);
  }

  _zoneLiving() {
    const tv = this.level.props.tv;
    if (!tv.on) {
      tv.on = true;
      this.audio.setTV(true);
      this._sub('电视自己开了。', 'テレビが、ついた。', 3);
    }
  }

  _zoneBedroom() {
    this.audio.whisper(-0.3, 2);
    this._sub('……有人曾睡在这里。', '……ここで、寝ていた。', 3.2);
  }

  _zoneBathroom() {
    this.audio.whisper(0.4, 2.2);
    this.audio.doorSlam();
    this._sub('……我想回家。', '……かえりたい。', 3.2);
    this._setFear(this.fear + 0.12);
  }

  _zonePassage() {
    this.audio.woodenCreak();
    this._sub('壁橱深处有一条路……', '押入れの奥に、道がある…。', 3.4);
  }

  _zoneAltar() {
    this.audio.bell();
    this._sub('为某人设的佛龛。', '誰かのための、仏壇。', 3);
  }

  _zoneChild() {
    const doll = this.level.props.doll;
    if (!doll.turned) {
      doll.turned = true;
      const ty = Math.atan2(this.playerPos.x - doll.mesh.position.x, this.playerPos.z - doll.mesh.position.z);
      doll.targetYaw = ty;
    }
    if (!this.childLullaby) {
      this.childLullaby = true;
      this.audio.lullaby(); // a music box playing for no one
    }
    this.audio.whisper(-0.5, 1.6);
    this._sub('这个房间，很冷。', 'この部屋は、寒い。', 3);
    this._setFear(this.fear + 0.1);
  }

  _zoneUpper() {
    this.audio.moan(0);
    this._sub('楼上，是同一条走廊。', '上の階は、同じ廊下だった。', 4);
    this.upperFlicker = 3.5;
  }

  _zoneStairs() {
    this.audio.woodenCreak();
  }

  _zoneExitVoid() {
    if (this.level.exitDoor.open && this.state === 'playing') this._ending();
  }

  _zoneCorridorMid() {
    // scripted: lights die one by one toward the player, then a silhouette
    if (this.finale) return;
    this._sub('……灯，一盏盏熄灭。', '……電気が、消えていく。', 4);
    const lights = this.level.fluorescents.filter((f) => f.z > 20 && f.z < 58 && f.light.position.y < 3);
    lights.sort((a, b) => b.z - a.z);
    lights.forEach((f, i) => {
      setTimeout(() => { f.kill = true; }, 300 + i * 180);
    });
    setTimeout(() => {
      this.audio.sting();
      // one far light strobes behind the silhouette
      const back = lights.find((f) => Math.abs(f.z - 53.7) < 0.2);
      if (back) back.boost = 2.6;
      if (this.monster.state === 'dormant') {
        this.monster.spawn(new THREE.Vector3(0, 0, 55.5), 'stalk');
        this.monster.tempLife = 2.4;
      }
      this._setFear(0.55);
    }, 300 + lights.length * 180 + 300);
    setTimeout(() => {
      for (const f of lights) { f.kill = false; f.boost = 0; }
      this._setFear(this.fear * 0.5);
    }, 300 + lights.length * 180 + 3400);
  }

  // ------------------------------------------------------------ finale / ending
  _startFinale() {
    this.finale = true;
    this.audio.duck();
    this.audio.sting();
    this.blackout = true;
    this.level.exitDoor.locked = false;
    this._setObjective('上楼——通往外面的门已经打开', '上の階へ——外へ出るドアが開いた');
    this._sub('它来了。快逃。', '来る。逃げろ。', 4);
    this._setFear(0.85);
    setTimeout(() => {
      this.monster.spawn(new THREE.Vector3(0, 0, 57), 'chase');
      this.onChaseStart();
      this._sub('上楼！', '二階へ！', 2);
    }, 1200);
  }

  _ending() {
    if (this.state === 'ending') return;
    this.state = 'ending';
    this.controls.unlock();
    if (this._touchUI) this._touchUI.classList.add('hidden');
    this.audio.setFear(0);
    this.audio.ending();
    const t = Math.round((performance.now() - this.startTime) / 1000);
    const mm = String(Math.floor(t / 60)).padStart(2, '0');
    const ss = String(t % 60).padStart(2, '0');
    $('end-text').innerHTML = `${END_TEXT}<br><span style="font-size:12px;color:#6b7278">${END_TEXT_JA}</span>`;
    $('end-stats').textContent = `用时 ${mm}:${ss} ／ 线索 3/3 ／ 醒来次数 ${this.scareCount}`;
    const fade = $('fade');
    fade.classList.add('white');
    fade.style.opacity = '1';
    setTimeout(() => { $('end').classList.remove('hidden'); }, 900);
  }

  // ------------------------------------------------------------ scare
  onMonsterAttack() {
    if (this.state !== 'playing') return;
    this.state = 'scared';
    this.scaredTimer = 1.35;
    this.scareCount++;
    this.shake = 1;
    this._flashRed();
    $('scare').style.opacity = '1';
    this.audio.scareBurst();
    this.audio.heartbeat(false);
    this._setFear(1);
    $('vignette').classList.add('fear');
    this.controls.pointerSpeed = 0; // freeze the view during the lunge
  }

  onMonsterAttackEnd() {
    // monster finished its lunge; finish the wake-up
    if (this.state !== 'scared') return;
    const finish = () => {
      $('scare').style.opacity = '0';
      $('fade').classList.remove('white');
      $('fade').style.opacity = '1';
      setTimeout(() => {
        // wake up at the entrance
        this.playerPos.copy(this.level.playerStart);
        this.char.x0 = this.playerPos.x - PLAYER_R; this.char.x1 = this.playerPos.x + PLAYER_R;
        this.char.z0 = this.playerPos.z - PLAYER_R; this.char.z1 = this.playerPos.z + PLAYER_R;
        this.char.y0 = 0; this.char.y1 = PLAYER_H;
        this.camera.position.set(this.playerPos.x, EYE, this.playerPos.z);
        this.camera.rotation.set(0, Math.PI, 0);
        this.eyeY = 0;
        this.vy = 0;
        this.monster.despawn();
        this.audio.heartbeat(false);
        this.controls.pointerSpeed = this.sens / 0.002;
        this._setFear(0.25);
        this.shake = 0;
        $('fade').style.opacity = '0';
        $('vignette').classList.toggle('fear', false);
        this.state = 'playing';
        this._sub('醒来时，又站在了玄关。', '気がつくと、玄関に立っていた。', 4.2);
        if (this.finale) {
          this._sub('它还在追你。', 'まだ、追われている。', 3.4);
          setTimeout(() => this.monster.spawn(new THREE.Vector3(0, 0, 57), 'chase'), 2500);
        }
        this._tryLock();
      }, 500);
    };
    setTimeout(finish, 420);
  }

  onChaseStart() {
    this._setFear(0.8);
    this._sub('快跑！', '逃げろ！', 2.2);
    this._hbOn = true;
    this.audio.heartbeat(true, 1);
  }

  // ------------------------------------------------------------ random events
  _randomEvent() {
    if (this.state !== 'playing' || this.monster.state === 'chase' || this.monster.state === 'attack') return;
    const r = Math.random();
    const p = this.playerPos;
    const farFromSpawn = Math.hypot(p.x, p.z + 1.35) > 6;
    const below = p.y < 1.0;

    if (r < 0.12) {
      this.audio.whisper(rand(-0.8, 0.8), rand(1.4, 2.4));
      {
        const [wcn, wja] = pick([['……过来', '……こっち'], ['……找到你了', '……見つけた'], ['……在哪儿', '……どこ'], ['……住手', '……やめて']]);
        this._sub(wcn, wja, 2.6);
      }
    } else if (r < 0.2) {
      // ghost girl in a doorway
      const candidates = this.level.ghostSpawns.filter((s) => {
        const d = Math.hypot(s.x - p.x, s.z - p.z);
        return d > 4.5 && d < 17;
      });
      if (candidates.length) {
        const s = pick(candidates);
        this.ghost.appearAt(s.x, s.y ?? 0, s.z, s.ry);
        this.audio.moan(rand(-0.4, 0.4));
        this._setFear(this.fear + 0.1);
      }
    } else if (r < 0.28) {
      // a door slams shut somewhere (only doors far from the player: closing
      // one the player is standing in would trap them inside the slab)
      const swingDoors = this.level.doors.filter((d) =>
        !d.locked && d.type === 'swing' && d.label !== '壁橱' &&
        Math.hypot(d.hinge.x - p.x, d.hinge.z - p.z) > 3);
      if (swingDoors.length) {
        const door = pick(swingDoors);
        if (door.open) {
          door.open = false; door.target = 0;
          this.audio.doorSlam();
        } else {
          this.audio.knock(1); // nothing visible closed - a dull thud instead
        }
      } else {
        this.audio.doorSlam();
      }
    } else if (r < 0.32) {
      // a far door creaks open on its own (only doors away from the player)
      const swingDoors = this.level.doors.filter((d) =>
        !d.locked && d.type === 'swing' && d.label !== '壁橱' &&
        Math.hypot(d.hinge.x - p.x, d.hinge.z - p.z) > 4);
      if (swingDoors.length) {
        const door = pick(swingDoors);
        if (!door.open) {
          door.open = true; door.target = 1;
          this.audio.doorOpen();
          this._sub('门……自己开了。', '扉が…一人で開いた。', 3);
          this._setFear(this.fear + 0.05);
        }
      } else {
        this.audio.woodenCreak();
      }
    } else if (r < 0.36) {
      // lights out for a moment
      this.audio.duck();
      this.lightsOutTimer = 2.6;
    } else if (r < 0.44) {
      // something moves on the floor above
      if (below) {
        this.audio.ceilingSteps();
        this._sub('楼上……有脚步声。', '上の階で…足音が。', 3);
      } else {
        this.audio.knock(2);
        this._sub('墙壁的另一侧，有人在敲。', '壁の向こうで、誰かが叩いている。', 3);
      }
    } else if (r < 0.52) {
      // knocking at the entrance
      this.audio.knock(3);
      this._sub('有人在敲门……', 'ドアを、叩く音が…', 3);
    } else if (r < 0.58 && farFromSpawn) {
      this.audio.runStep(); setTimeout(() => this.audio.runStep(), 260); setTimeout(() => this.audio.runStep(), 520);
      this._sub('身后……？', '後ろに…？', 2.4);
    } else if (r < 0.66) {
      // a child is crying somewhere far away
      this.audio.cry(rand(-0.6, 0.6));
      this._sub('……有孩子在哭。', '……子供の泣き声が。', 3);
    } else if (r < 0.69) {
      // a faint giggle, too bright for this building
      this.audio.childGiggle(rand(-0.6, 0.6));
      this._setFear(this.fear + 0.05);
    } else if (r < 0.75) {
      // breathing, right behind you
      this.audio.breath(rand(-0.6, 0.6), rand(2.4, 3.6));
    } else if (r < 0.81) {
      const tv = this.level.props.tv;
      if (!tv.on) { tv.on = true; this.audio.setTV(true); }
    } else if (r < 0.84) {
      // the radio turns itself on
      this.audio.radio();
      this._sub('收音机……自己响了。', 'ラジオが、勝手に鳴った。', 3);
    } else if (r < 0.9 && this.phoneArmed && !this.phoneRinging) {
      this._phoneRings();
    } else if (r < 0.96 && this.notes.size >= 2 && this.monster.state === 'dormant' && !this.finale) {
      this.monster.spawn(new THREE.Vector3(0, 0, 55.5), 'stalk');
      this.monster.tempLife = 3;
      this.audio.moan(0);
      this._setFear(this.fear + 0.15);
    } else {
      // ambience soup: the classic creak/ghost/scrape, plus the city at large
      // beyond the storm - a siren across the rain, pipes knocking, and the
      // washer starting by itself while you are the only one in the apartment
      const w = Math.random();
      if (w < 0.18) {
        this.audio.siren(rand(-0.5, 0.5));
        this._sub('雨声深处，有警笛在响。', '雨音の奥で、サイレンが鳴っている。', 3.4);
      } else if (w < 0.38) {
        this.audio.hammer(rand(-0.5, 0.5));
        this._sub('墙里的水管，咚、咚地响。', '壁の配管が、ドン、ドンと鳴る。', 3);
      } else if (w < 0.52 && p.x < -13.8 && p.z > 14.8) {
        this.audio.washer(-0.6);
        this.shake = Math.max(this.shake, 0.12);
        this._sub('洗衣机……自己在转。', '洗濯機が…勝手に回っている。', 3.4);
        this._setFear(this.fear + 0.06);
      } else {
        this.audio.woodenCreak();
        if (chance(0.5)) {
          const s = pick(this.level.ghostSpawns);
          if (Math.hypot(s.x - p.x, s.z - p.z) > 4.5) this.ghost.appearAt(s.x, s.y ?? 0, s.z, s.ry);
        }
        if (chance(0.4)) this.audio.scrape();
      }
    }

    // the figure in the window - a rare extra, layered on top of any event
    if (chance(0.18)) {
      const sil = this.level.props.silhouette;
      sil.visible = true;
      this.audio.moan(0);
      setTimeout(() => { sil.visible = false; }, 2600);
    }
  }

  // ------------------------------------------------------------ main loop
  _loop() {
    requestAnimationFrame(this._loop);
    if (!this.initOK) return;
    const now = performance.now();
    const dt = Math.min(0.05, (this.lastT ? (now - this.lastT) / 1000 : 0.016));
    this.lastT = now;
    this.time += dt;

    if (this.state === 'playing' || this.state === 'scared') {
      const scared = this.state === 'scared';
      if (!scared) this._updatePlayer(dt);
      this._updateInteractPrompt();
      this._updateDirector(dt);
    }

    this.level.update(dt, this.time, this.camera.position);
    const tv = this.level.props.tv;
    // a switched-off TV must be a dark screen, not an always-on static glow
    tv.screen.visible = tv.on;
    if (tv.on) {
      updateTVStatic(this.level.tex.tvStatic);
      this.level.tvLight.intensity = 1.4 + Math.sin(this.time * 23) * 0.5 + rand(-0.2, 0.2);
      // a face swims through the static, rarely
      this.tvFaceTimer = (this.tvFaceTimer ?? rand(30, 50)) - dt;
      if (this.tvFaceTimer <= 0) {
        this.tvFaceTimer = rand(35, 60);
        this.level.props.tvFace.visible = true;
        this.audio._noise({ dur: 0.5, type: 'bandpass', freq: 2200, q: 6, gain: 0.06 });
        if (Math.hypot(this.playerPos.x - -6.5, this.playerPos.z - 15.25) < 9) {
          this._sub('电视里……有一张脸。', 'テレビの中に…顔が。', 2.6);
          this._setFear(this.fear + 0.08);
        }
        setTimeout(() => { this.level.props.tvFace.visible = false; }, 750);
      }
    } else {
      this.level.tvLight.intensity = 0;
      // the TV may switch itself back on after being turned off
      if (tv.timer > 0 && this.state === 'playing') {
        tv.timer -= dt;
        if (tv.timer <= 0) {
          tv.on = true;
          this.audio.setTV(true);
          this.audio._noise({ dur: 0.4, type: 'bandpass', freq: 1200, q: 2, gain: 0.07 });
          this._sub('电视又自己开了。', 'テレビが、また勝手に点いた。', 3);
        }
      }
    }

    // blackout / lights-out timer — use each fixture's kill flag so the TUBES
    // go dark too (zeroing only light.intensity left every tube glowing
    // through the finale blackout like white slabs)
    if (this.blackout) {
      for (const f of this.level.fluorescents) f.kill = true;
    } else if (this.lightsOutTimer > 0) {
      this.lightsOutTimer -= dt;
      for (const f of this.level.fluorescents) f.kill = true;
      if (this.lightsOutTimer <= 0) {
        for (const f of this.level.fluorescents) f.kill = false;
      }
    }

    // upper floor hard flicker
    if (this.upperFlicker > 0) {
      this.upperFlicker -= dt;
      for (const f of this.level.fluorescents) {
        if (f.z > 2 && f.z < 62 && f.light.position.y > 4) {
          const on = Math.sin(this.time * 50) > 0;
          f.light.intensity = on ? f.base : 0.05;
          // keep the tube glass in sync (level.update already set it this frame)
          if (f.tube) f.tube.material = on ? this.level.tubeMat : this.level.tubeOffMat;
        }
      }
    }

    // cabinet door animation
    const cab = this.level.props.cabinet;
    if (cab.openedOnce) {
      cab.angle = lerp(cab.angle, 1.35, dt * 2.2);
      cab.pivot.rotation.y = cab.angle;
    }
    // doll slow turn
    const doll = this.level.props.doll;
    if (doll.turned && doll.targetYaw !== undefined) {
      let dy = doll.targetYaw - doll.mesh.rotation.y;
      dy = Math.atan2(Math.sin(dy), Math.cos(dy));
      doll.mesh.rotation.y += dy * Math.min(1, dt * 1.1);
      // once it has seen you, it moves when you are not looking
      this.dollTimer = (this.dollTimer ?? rand(14, 22)) - dt;
      if (this.dollTimer <= 0) {
        this.dollTimer = rand(16, 26);
        const spots = this.level.dollSpots || [];
        const cur = doll.mesh.position;
        const opts = spots.filter((s) =>
          Math.hypot(s.x - this.playerPos.x, s.z - this.playerPos.z) > 4 &&
          (Math.abs(s.x - cur.x) > 0.5 || Math.abs(s.z - cur.z) > 0.5));
        if (opts.length) {
          const dx = cur.x - this.playerPos.x, dz = cur.z - this.playerPos.z;
          const dl = Math.hypot(dx, dz) || 1;
          const dir = new THREE.Vector3();
          this.camera.getWorldDirection(dir);
          if (dir.x * (dx / dl) + dir.z * (dz / dl) < 0.5) {
            const s = pick(opts);
            doll.mesh.position.set(s.x, 0, s.z);
            doll.mesh.rotation.y = s.ry;
            doll.targetYaw = s.ry;
            this.audio.musicBox();
            if (Math.hypot(s.x - this.playerPos.x, s.z - this.playerPos.z) < 8) {
              this._sub('人偶……不在原来的位置了。', '人形が…元の場所にいない。', 3);
            }
          }
        }
      }
    }

    // monster + ghost
    this._updateMonster(dt);
    this.ghost.update(dt, this.playerPos);

    // fear decay
    if (this.state === 'playing') {
      this._setFear(Math.max(0.12, this.fear - dt * 0.02));
      if (this.monster.state === 'chase') this._setFear(Math.min(1, this.fear + dt * 0.12));
      if (this.monster.state === 'stalk') {
        const d = Math.hypot(this.monster.pos.x - this.playerPos.x, this.monster.pos.z - this.playerPos.z);
        if (d < 14) this._setFear(Math.min(0.8, this.fear + dt * (0.1 * (1 - d / 14))));
      }
    }

    // camera shake
    if (this.shake > 0) {
      this.shake = Math.max(0, this.shake - dt * 1.6);
      this.camera.position.x += rand(-0.03, 0.03) * this.shake;
      this.camera.position.y += rand(-0.02, 0.02) * this.shake;
    }

    // fear fov + grade uniforms
    const targetFov = 75 + this.fear * 7 + (this.state === 'scared' ? 10 : 0);
    if (Math.abs(this.camera.fov - targetFov) > 0.1) {
      this.camera.fov = lerp(this.camera.fov, targetFov, dt * 4);
      this.camera.updateProjectionMatrix();
    }
    this.grade.uniforms.uTime.value = this.time;
    this.grade.uniforms.uFear.value = this.fear;
    this.grade.uniforms.uDistort.value = this.state === 'scared' ? Math.min(1, this.scaredTimer) : this.shake;
    this.coneMat.uniforms.uTime.value = this.time;

    // dust drift
    this._updateDust(dt);

    // audio hum follows nearby lights
    this.audio.setHum(this.level.humLevel(this.camera.position));
    // generative score + night wind (stronger upstairs and at the stairwells)
    this.audio.updateMusic(dt, this.fear, this.monster.state === 'chase' || this.monster.state === 'attack');
    this.audio.setWind(clamp(0.3 + (this.playerPos.y > 2.5 ? 0.2 : 0) +
      (this.playerPos.z < 2.2 || this.playerPos.z > 56 ? 0.3 : 0), 0, 1));
    // the storm's rain bed follows the same spatial cues as the wind.
    this.audio.setRain(clamp(0.3 + (this.playerPos.y > 2.5 ? 0.25 : 0) +
      (this.playerPos.z < 2.2 || this.playerPos.z > 56 ? 0.35 : 0), 0, 1));
    // the fūrin in the child room rings when the wind breathes on it and
    // someone is near enough to hear - a child's chime in a sealed apartment
    const fu = this.level.props.furin;
    if (fu && this.state === 'playing') {
      const fd = Math.hypot(this.camera.position.x - fu.position.x, this.camera.position.z - fu.position.z);
      if (fd < 7) {
        this.furinT = (this.furinT ?? rand(4, 9)) - dt;
        if (this.furinT <= 0) {
          this.furinT = rand(6, 16);
          this.audio.chime(clamp((fu.position.x - this.camera.position.x) / 7, -1, 1));
        }
      } else {
        this.furinT = rand(3, 8);
      }
    }
    this._updateLightning(dt);

    if (this.nopost) this.renderer.render(this.scene, this.camera);
    else this.composer.render();
    this._plc = (this._plc || 0) + 1;
    if (this.posLog && this._plc % 30 === 0) {
      document.title = `POS:z=${this.playerPos.z.toFixed(1)},y=${this.playerPos.y.toFixed(2)} flash=${this.flash.intensity.toFixed(1)}`;
    }
  }

  _updatePlayer(dt) {
    const k = this.keys;
    // input vector
    let mx = 0, mz = 0;
    let sprint;
    if (this.touchMode) {
      // analog joystick: partial tilt walks slower (magnitude preserved)
      mx = this.touchMove.x;
      mz = -this.touchMove.y;
      sprint = this.touchRun;
      const mag = Math.hypot(mx, mz);
      if (mag > 1) { mx /= mag; mz /= mag; }
    } else {
      if (k['KeyW'] || k['ArrowUp']) mz += 1;
      if (k['KeyS'] || k['ArrowDown']) mz -= 1;
      if (k['KeyA'] || k['ArrowLeft']) mx -= 1;
      if (k['KeyD'] || k['ArrowRight']) mx += 1;
      sprint = k['ShiftLeft'] || k['ShiftRight'];
      const len = Math.hypot(mx, mz) || 1;
      mx /= len; mz /= len;
    }
    const speed = sprint ? 3.9 : 2.7;

    // headless debug: ?tp=Z teleports the player to z=Z and stares at a wall
    // (?face=s for the south wall, default north) - deterministic screenshots.
    // The player is dropped from 0.9m so gravity lands them on whatever floor
    // height the corridor has at z (spawning at y=0 inside the raised segment
    // z 24..32 embeds the AABB in the slab and the resolver falls through it).
    // The drop start is clamped to the local floor/ceiling, so tp also works
    // on the upper floor (y 2.8) instead of falling out of the world.
    if (this.tpZ !== undefined) {
      if (!this._tpDone) {
        this._tpDone = true;
        const tx = this.tpX ?? 0;
        let floorTop = -10, ceilBottom = Infinity;
        const cs = this.level.colliders;
        for (const c of cs) {
          if (c.x0 < tx + 0.3 && c.x1 > tx - 0.3 && c.z0 < this.tpZ + 0.3 && c.z1 > this.tpZ - 0.3 && c.y1 < 6 && c.y1 > floorTop) floorTop = c.y1;
        }
        if (floorTop < -5) floorTop = 0;
        for (const c of cs) {
          if (c.x0 < tx + 0.3 && c.x1 > tx - 0.3 && c.z0 < this.tpZ + 0.3 && c.z1 > this.tpZ - 0.3 && c.y0 > floorTop + 1.5 && c.y0 < ceilBottom) ceilBottom = c.y0;
        }
        let dropY;
        if (this.tpY !== undefined) dropY = this.tpY;
        // drop from only +0.45m: a +0.9m drop passes the eye RIGHT THROUGH the
        // ceiling-fixture layer (lights sit at y 2.46-2.52) - screenshots taken
        // mid-drop caught the camera 6cm from a point light = whole-screen white
        else dropY = Math.min(floorTop + 0.45, ceilBottom === Infinity ? floorTop + 2.2 : ceilBottom - PLAYER_H - 0.05);
        this.playerPos.set(tx, dropY, this.tpZ);
        this.char.x0 = tx - PLAYER_R; this.char.x1 = tx + PLAYER_R;
        this.char.z0 = this.tpZ - PLAYER_R; this.char.z1 = this.tpZ + PLAYER_R;
        this.char.y0 = dropY; this.char.y1 = dropY + PLAYER_H;
        this.eyeY = dropY;
        this.vy = 0;
        this.camera.position.set(tx, dropY + EYE, this.tpZ);
      }
      mx = 0; mz = 0;
      if (this.tpYaw !== undefined) {
        this.camera.rotation.y = (this.tpYaw * Math.PI) / 180;
      } else {
        this.camera.rotation.y = this.tpFace === 's' ? Math.PI + 1.57 : Math.PI - 1.57;
      }
      this.camera.rotation.x = 0;
    }

    const yaw = this.camera.rotation.y;
    const sin = Math.sin(yaw), cos = Math.cos(yaw);
    // forward = (-sin, -cos); right = (cos, -sin)
    const dx = (-sin * mz + cos * mx) * speed * dt;
    const dz = (-cos * mz - sin * mx) * speed * dt;

    this.char.x0 = this.playerPos.x - PLAYER_R; this.char.x1 = this.playerPos.x + PLAYER_R;
    this.char.z0 = this.playerPos.z - PLAYER_R; this.char.z1 = this.playerPos.z + PLAYER_R;
    this.char.y0 = this.playerPos.y; this.char.y1 = this.playerPos.y + PLAYER_H;
    const ox = this.playerPos.x, oz = this.playerPos.z;

    const dynColliders = this._dynColliders();
    this.vy -= 22 * dt;
    const res = moveWithCollisions(this.char, dx, this.vy * dt, dz, dynColliders, 0.35);
    this.grounded = res.grounded;
    if (res.grounded) this.vy = 0;

    this.playerPos.x = (this.char.x0 + this.char.x1) / 2;
    this.playerPos.z = (this.char.z0 + this.char.z1) / 2;
    this.playerPos.y = this.char.y0;

    // head bob + footsteps (based on actual displacement, not input)
    const hSpeed = Math.hypot(this.playerPos.x - ox, this.playerPos.z - oz) / dt;
    if (this.grounded && hSpeed > 0.4) {
      this.bobPhase += (hSpeed / 2.7) * dt * 8.5;
      const s = Math.sin(this.bobPhase);
      if (this.lastBobSin > 0 && s <= 0) {
        const surf = this._floorSurface();
        if (sprint) this.audio.runStep(surf);
        else this.audio.footstep(surf);
      }
      this.lastBobSin = s;
      this.bob = Math.abs(s) * 0.03 * Math.min(1, hSpeed / 2.7);
    } else {
      this.bob = lerp(this.bob || 0, 0, dt * 8);
      this.lastBobSin = 0;
    }

    // smooth the vertical camera: step-ups / stair climbs no longer teleport the eye
    this.eyeY = lerp(this.eyeY || 0, this.playerPos.y, Math.min(1, dt * 16));
    this.camera.position.set(this.playerPos.x, this.eyeY + EYE + this.bob, this.playerPos.z);
    this.camera.rotation.z = Math.sin(this.time * 0.4) * 0.0016 + this.fear * Math.sin(this.time * 1.7) * 0.005 + (sprint ? 0.012 * Math.sin(this.bobPhase) : 0);
    this.camera.rotation.order = 'YXZ';

    // aim the flashlight target straight ahead of the camera
    this.camera.getWorldDirection(this._tmpDir);
    this.flashTarget.position.copy(this.camera.position).addScaledVector(this._tmpDir, 12);
    // flashlight follows the camera (scene child, not camera-attached).
    // Position it just in FRONT of the camera along the view direction
    // (slightly low, like a hand-held torch) instead of a fixed +x offset
    // that pointed sideways when facing north/south.
    this._tmpDir2 = this._tmpDir2 || new THREE.Vector3();
    this.camera.getWorldDirection(this._tmpDir2);
    this.flash.position.copy(this.camera.position).addScaledVector(this._tmpDir2, 0.12);
    this.flash.position.y -= 0.06;

    // flashlight. The beam is also soft-capped when the player is close to a
    // wall: with a physical falloff a 0.35m wall distance accumulates a huge
    // radiance and clips the whole view to a pure-white sheet. Keep full power
    // in open corridor, dim smoothly as a wall gets near.
    let flashI = 0;
    if (this.flashOn) {
      const p = this.camera.position;
      let nearWall = 2.2;
      for (const c of this.colliders) {
        // only tall vertical barriers matter; skip floors/ceilings
        if (c.y1 < p.y - 0.8 || c.y0 > p.y + 0.8) continue;
        const cx = clamp(p.x, c.x0, c.x1);
        const cz = clamp(p.z, c.z0, c.z1);
        const cy = clamp(p.y, c.y0, c.y1);
        const d = Math.hypot(p.x - cx, p.y - cy, p.z - cz);
        if (d < nearWall) nearWall = d;
      }
      // Stronger roll-off: near a wall the beam must fall to ~15% (not 35%),
      // otherwise a 0.3m hotspot still accumulates ~15 radiance -> near-white.
      const close = clamp((nearWall - 0.3) / 1.4, 0.15, 1);
      flashI = 4.6 * close;
      const nearMonster = this.monster.state === 'stalk' || this.monster.state === 'chase';
      const md = Math.hypot(this.monster.pos.x - this.playerPos.x, this.monster.pos.z - this.playerPos.z);
      if (nearMonster && md < 5) {
        flashI = flashI * (0.55 + 0.45 * Math.sin(this.time * 41 + md * 9));
      }
    }
    this.flash.intensity = flashI;
    this.coneMat.uniforms.uFade.value = this.flashOn ? 1 : 0;

    // triggers
    this.level.checkTriggers(new THREE.Vector3(this.playerPos.x, this.playerPos.y + 0.2, this.playerPos.z));
  }

  _dynColliders() {
    const arr = this.level.colliders.slice(0);
    for (const d of this.level.doors) if (d.collider) arr.push(d.collider);
    return arr;
  }

  // what the player is standing on (footstep timbre must match the room)
  _floorSurface() {
    const p = this.playerPos;
    if (p.x > 1.3 && p.x < 8.4 && p.z > 0 && p.z < 8.5) return 'tatami';    // altar
    if (p.z < 0) return 'concrete';                                          // entry
    if (p.z > 57.5 && p.y < 2.7) return 'concrete';                          // east stairwell
    if (p.x < -13.8 && p.z > 13.8) return 'concrete';                        // passage + bathroom
    return 'wood';
  }

  _updateInteractPrompt() {
    if (this.noteOpen) { this._prompt(null); return; }
    const hit = this._raycastTarget();
    this._prompt(hit ? hit.interactable.label : null);
    // on touch devices the E-key hint is hidden: the interact button itself
    // glows when something is in reach instead
    if (this.touchMode) $('btn-interact').classList.toggle('avail', !!hit);
  }

  _updateDirector(dt) {
    this.eventTimer -= dt;
    if (this.eventTimer <= 0) {
      this.eventTimer = rand(21, 42);
      this._randomEvent();
    }
  }

  _updateMonster(dt) {
    const p = this.playerPos;
    const dir = new THREE.Vector3();
    this.camera.getWorldDirection(dir);
    dir.y = 0;
    dir.normalize();
    const toM = new THREE.Vector3(this.monster.pos.x - p.x, 0, this.monster.pos.z - p.z);
    const md = toM.length();
    const flashHit = this.flashOn && md > 0.01 && md < 22 && dir.dot(toM.normalize()) > 0.94;

    this.monster.update(dt, {
      player: new THREE.Vector3(p.x, p.y, p.z),
      lookDir: dir,
      flashHit,
      time: this.time,
      colliders: this._dynColliders(),
      doors: this.level.doors,
      nodes: this.level.monsterNodes,
      audio: this.audio,
      game: this,
    });
    if (this._hbOn && this.monster.state !== 'chase') {
      this._hbOn = false;
      this.audio.heartbeat(false);
    }
  }

  // lightning: window panes + sky hemisphere flash in 1-3 spikes, thunder
  // arrives later the farther the strike landed
  _updateLightning(dt) {
    const L = this.lightning;
    const moonWin = this.level.materials.moonWin;
    if (L.t > 0) {
      L.t -= dt;
      // a lightning crack should physically rattle the camera a little
      if (Math.random() < 0.35) this.shake = Math.max(this.shake, 0.08);
      const frac = 1 - L.t / L.dur; // 0..1 over the strike
      // ragged double-strike envelope
      const spike = (frac < 0.15 || (frac > 0.45 && frac < 0.55)) ? 1 : 0.25;
      const v = spike * (0.5 + Math.random() * 0.5);
      this.hemi.intensity = this.hemiBase + v * 1.7;
      for (const wl of this.level.windowLights) wl.intensity = 0.8 + v * 5;
      moonWin.color.setScalar(1 + v * 1.5);
      if (L.t <= 0) {
        this.hemi.intensity = this.hemiBase;
        for (const wl of this.level.windowLights) wl.intensity = 0.8;
        moonWin.color.setScalar(1);
      }
      return;
    }
    L.next -= dt;
    if (L.next <= 0) {
      L.next = rand(45, 100);
      L.dur = rand(0.45, 0.9);
      L.t = L.dur;
      L.dist = rand(0.3, 0.95);
      setTimeout(() => {
        if (this.state === 'playing' || this.state === 'scared') {
          this.audio.thunder(L.dist);
          if (chance(0.35)) this._sub('打雷了。', '雷が、鳴った。', 2.2);
        }
      }, 400 + L.dist * 3000);
    }
  }

  _updateDust(dt) {
    const pos = this.dustPos;
    const cx = this.camera.position.x, cz = this.camera.position.z, cy = this.camera.position.y;
    for (let i = 0; i < pos.length; i += 3) {
      pos[i + 1] += dt * rand(0.02, 0.07);
      if (pos[i + 1] > 4) pos[i + 1] = 0;
      pos[i] += Math.sin(this.time * 0.6 + i) * dt * 0.08;
      pos[i + 2] += Math.cos(this.time * 0.5 + i) * dt * 0.08;
      // wrap around player
      if (pos[i] - cx > 11) pos[i] = cx - 11; else if (pos[i] - cx < -11) pos[i] = cx + 11;
      if (pos[i + 2] - cz > 11) pos[i + 2] = cz - 11; else if (pos[i + 2] - cz < -11) pos[i + 2] = cz + 11;
      // keep dust out of a 1.3m bubble around the camera. With size
      // attenuation, particles near the eye render as big additive white
      // blobs drifting across the view - the moving "white patch" that no
      // amount of lighting tuning could remove.
      const rx = pos[i] - cx, rz = pos[i + 2] - cz, ry = pos[i + 1] - cy;
      if (rx * rx + ry * ry + rz * rz < 1.69) {
        pos[i] = cx + rand(-11, 11);
        pos[i + 1] = rand(0.2, 3.8);
        pos[i + 2] = cz + rand(-11, 11);
      }
    }
    this.dust.geometry.attributes.position.needsUpdate = true;
    this.dust.position.set(cx, 0, cz);
  }
}

// ---------------------------------------------------------------- boot
try {
  window.__game = new Game();
  // headless/debug: ?autostart=1 skips the title screen (pointer lock will fail silently)
  if (new URLSearchParams(location.search).has('autostart')) {
    setTimeout(() => window.__game._start(), 400);
  }
  // headless/debug: ?pos=1 writes player position into the page title
  if (new URLSearchParams(location.search).has('pos')) {
    window.__game.posLog = true;
  }
  // headless/debug: ?tp=Z&face=n|s teleports to z=Z facing a wall.
  // Room support: ?tpx=X (default 0), ?tpy=Y (default = auto floor/ceiling),
  // ?yaw=deg (camera yaw, overrides face). E.g. ?tpx=-6.5&tpz=11&yaw=90.
  const qsTp = new URLSearchParams(location.search);
  if (qsTp.has('tp')) {
    window.__game.tpZ = parseFloat(qsTp.get('tp')) || 0;
    window.__game.tpFace = qsTp.get('face') === 's' ? 's' : 'n';
  }
  if (qsTp.has('tpx')) window.__game.tpX = parseFloat(qsTp.get('tpx')) || 0;
  if (qsTp.has('tpy')) window.__game.tpY = parseFloat(qsTp.get('tpy'));
  if (qsTp.has('yaw')) window.__game.tpYaw = parseFloat(qsTp.get('yaw'));
  // headless/debug: ?noflash=1 starts with the flashlight off (A/B white-blotch triage)
  if (qsTp.has('noflash')) window.__game.flashOn = false;
} catch (err) {
  console.error(err);
}
