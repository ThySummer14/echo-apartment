// textures.js — fully procedural low-res textures (PS1-era feel), generated on canvas.
import * as THREE from 'three';
import { mulberry32 } from './util.js';

function canvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return c;
}

// deterministic value-noise over ImageData
function fillNoise(img, rng, { r = 255, g = 255, b = 255, amp = 18, scale = 1, base = null }) {
  const d = img.data;
  const w = img.width, h = img.height;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const n = (rng() - 0.5) * 2 * amp * scale;
      const br = base ? (base[y * w * 4 + x] || d[i]) : 0;
      const rr = base ? br : r;
      d[i] = Math.max(0, Math.min(255, rr + n));
      d[i + 1] = Math.max(0, Math.min(255, (base ? base[i + 1] : g) + n));
      d[i + 2] = Math.max(0, Math.min(255, (base ? base[i + 2] : b) + n));
      d[i + 3] = 255;
    }
  }
  return img;
}

function fbmNoise(img, rng, amp, octaves = 4, fill = [120, 118, 110]) {
  const d = img.data, w = img.width, h = img.height;
  // cheap multi-scale value noise accumulation
  const grids = [];
  for (let o = 0; o < octaves; o++) {
    const gw = 2 << o, gh = 2 << o;
    const g = new Float32Array(gw * gh);
    for (let i = 0; i < g.length; i++) g[i] = rng();
    grids.push({ g, gw, gh });
  }
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let n = 0, tot = 0;
      for (let o = 0; o < octaves; o++) {
        const { g, gw, gh } = grids[o];
        const fx = (x / w) * gw, fy = (y / h) * gh;
        const x0 = Math.floor(fx) % gw, y0 = Math.floor(fy) % gh;
        const x1 = (x0 + 1) % gw, y1 = (y0 + 1) % gh;
        const tx = fx - Math.floor(fx), ty = fy - Math.floor(fy);
        const sx = tx * tx * (3 - 2 * tx), sy = ty * ty * (3 - 2 * ty);
        const v = g[y0 * gw + x0] * (1 - sx) * (1 - sy) + g[y0 * gw + x1] * sx * (1 - sy) +
                  g[y1 * gw + x0] * (1 - sx) * sy + g[y1 * gw + x1] * sx * sy;
        n += v / (o + 1); tot += 1 / (o + 1);
      }
      n /= tot;
      const i = (y * w + x) * 4;
      d[i] = fill[0] + (n - 0.5) * 2 * amp;
      d[i + 1] = fill[1] + (n - 0.5) * 2 * amp;
      d[i + 2] = fill[2] + (n - 0.5) * 2 * amp;
      d[i + 3] = 255;
    }
  }
}

function blotch(ctx, x, y, r, color, alpha = 0.14, rings = 2) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  for (let i = rings; i >= 0; i--) {
    ctx.beginPath();
    ctx.ellipse(x + (Math.random() - 0.5) * r * 0.7, y + (Math.random() - 0.5) * r * 0.7, r * (i + 0.6) / rings * 0.55, r * (i + 0.6) / rings * 0.4, Math.random() * 3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function stains(ctx, w, h, color, count, rng) {
  for (let i = 0; i < count; i++) {
    blotch(ctx, rng() * w, rng() * h, 4 + rng() * 16, color, 0.05 + rng() * 0.12, 3);
  }
}

function cracks(ctx, w, h, rng, count = 7, color = 'rgba(20,18,14,0.5)') {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  for (let i = 0; i < count; i++) {
    let x = rng() * w, y = rng() * h;
    ctx.beginPath();
    ctx.moveTo(x, y);
    const segs = 3 + (rng() * 5 | 0);
    for (let s = 0; s < segs; s++) {
      x += (rng() - 0.5) * 26; y += (rng() - 0.5) * 26;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
}

function toTexture(c, repeat = true) {
  const t = new THREE.CanvasTexture(c);
  // Moiré fix: NEAREST minification with no mipmaps made every surface crawl
  // and ripple at distance (classic PS1 shimmer, but far too severe here).
  // Linear magnification plus a trilinear mip chain + anisotropy keeps walls
  // and floors stable while turning; the retro look now comes from vertex snap
  // and ordered dithering rather than from texture pixel-crawl.
  t.magFilter = THREE.LinearFilter;
  t.minFilter = THREE.LinearMipmapLinearFilter;
  t.generateMipmaps = true;
  t.anisotropy = 16;
  t.colorSpace = THREE.SRGBColorSpace;
  if (repeat) { t.wrapS = THREE.RepeatWrapping; t.wrapT = THREE.RepeatWrapping; }
  return t;
}

// per-frame noise textures (TV static) stay unfiltered: they are tiny, viewed
// up close, and regenerating a mip chain every frame wastes GPU time
function toStreamingTexture(c, repeat = false) {
  const t = new THREE.CanvasTexture(c);
  t.magFilter = THREE.NearestFilter;
  t.minFilter = THREE.NearestFilter;
  t.generateMipmaps = false;
  t.colorSpace = THREE.NoColorSpace;
  if (repeat) { t.wrapS = THREE.RepeatWrapping; t.wrapT = THREE.RepeatWrapping; }
  return t;
}

// ---------------- individual textures ----------------
function wallPlaster(rng) {
  const c = canvas(128, 128);
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(128, 128);
  fbmNoise(img, rng, 14, 4, [150, 147, 136]);
  ctx.putImageData(img, 0, 0);
  stains(ctx, 128, 128, '#3a3f33', 26, rng);
  stains(ctx, 128, 128, '#6f735a', 14, rng);
  // peeling patches: darker rounded blotches with lighter rim
  for (let i = 0; i < 8; i++) {
    const x = rng() * 128, y = rng() * 128, r = 6 + rng() * 14;
    ctx.fillStyle = 'rgba(70,74,62,0.35)';
    ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.7, rng(), 0, 7); ctx.fill();
    ctx.strokeStyle = 'rgba(220,215,195,0.25)';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.7, rng(), 0, 7); ctx.stroke();
  }
  cracks(ctx, 128, 128, rng, 6);
  return toTexture(c);
}

function wallpaper(rng) {
  // 256x512 instead of 128x256: vertical stripes are still period-doubled
  // (every 2.6 m on the wall) but with enough texels per metre that the
  // mipmap chain does not alias into crawling moiré when the player turns.
  const c = canvas(256, 512);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#6f6a5e';
  ctx.fillRect(0, 0, 256, 512);
  // vertical stripes: deliberately LOW contrast. Sharp alternating light/dark
  // stripes were the worst moiré generator on walls; keep the pattern readable
  // but without hard 2px edges that alias while turning.
  for (let x = 0; x < 256; x += 32) {
    ctx.fillStyle = (x / 32) % 2 ? '#6c675c' : '#716c61';
    ctx.fillRect(x, 0, 32, 512);
    ctx.fillStyle = 'rgba(52,56,46,0.18)';
    ctx.fillRect(x + 15, 0, 3, 512);
  }
  const img = ctx.getImageData(0, 0, 256, 512);
  fillNoise(img, rng, { amp: 8, base: img.data.slice() });
  ctx.putImageData(img, 0, 0);
  stains(ctx, 256, 512, '#3d4234', 60, rng);
  // torn strip revealing aged plaster - deliberately DARKER than the paper:
  // a light strip here repeated every 2.6m and blew out into a white band
  // across kitchen/living walls under the room lights
  const ty = 80 + rng() * 240;
  ctx.fillStyle = '#5f5c52';
  ctx.fillRect(0, ty, 256, 36 + rng() * 60);
  const img2 = ctx.getImageData(0, ty, 256, 80);
  fillNoise(img2, rng, { amp: 12, base: img2.data.slice() });
  ctx.putImageData(img2, 0, ty);
  ctx.fillStyle = 'rgba(40,36,30,0.45)';
  ctx.fillRect(0, ty - 3, 256, 3);
  ctx.fillRect(0, ty + 78, 256, 3);
  cracks(ctx, 256, 512, rng, 6);
  return toTexture(c);
}

function woodPlanks(rng, w = 128, h = 128, base = [86, 66, 46], horiz = false) {
  const c = canvas(w, h);
  const ctx = c.getContext('2d');
  ctx.fillStyle = `rgb(${base[0]},${base[1]},${base[2]})`;
  ctx.fillRect(0, 0, w, h);
  const n = horiz ? 4 : 4;
  for (let i = 0; i < n; i++) {
    ctx.fillStyle = `rgba(${base[0] - 14},${base[1] - 12},${base[2] - 10},0.55)`;
    if (horiz) ctx.fillRect(0, (h / n) * i, w, 1);
    else ctx.fillRect((w / n) * i, 0, 1, h);
    ctx.fillStyle = 'rgba(255,235,200,0.04)';
    if (horiz) ctx.fillRect(0, (h / n) * i + 1, w, 1);
    else ctx.fillRect((w / n) * i + 1, 0, 1, h);
  }
  const img = ctx.getImageData(0, 0, w, h);
  fillNoise(img, rng, { amp: 10, base: img.data.slice() });
  ctx.putImageData(img, 0, 0);
  // grain streaks
  ctx.strokeStyle = 'rgba(50,36,22,0.25)';
  for (let i = 0; i < 26; i++) {
    ctx.beginPath();
    if (horiz) {
      const y = rng() * h;
      ctx.moveTo(0, y); ctx.bezierCurveTo(w * 0.3, y + (rng() - 0.5) * 6, w * 0.7, y + (rng() - 0.5) * 6, w, y);
    } else {
      const x = rng() * w;
      ctx.moveTo(x, 0); ctx.bezierCurveTo(x + (rng() - 0.5) * 6, h * 0.3, x + (rng() - 0.5) * 6, h * 0.7, x, h);
    }
    ctx.stroke();
  }
  stains(ctx, w, h, '#2c2118', 14, rng);
  return toTexture(c);
}

function woodDoor(rng) {
  const c = canvas(128, 256);
  const ctx = c.getContext('2d');
  ctx.drawImage(woodPlanks(rng, 128, 256, [92, 70, 48], true).image, 0, 0);
  // panel insets
  ctx.strokeStyle = 'rgba(30,22,14,0.6)';
  ctx.lineWidth = 3;
  for (const [y, h] of [[18, 92], [146, 92]]) {
    ctx.strokeRect(14, y, 100, h);
    ctx.strokeStyle = 'rgba(255,240,210,0.08)';
    ctx.strokeRect(16, y + 2, 96, h - 4);
    ctx.strokeStyle = 'rgba(30,22,14,0.6)';
  }
  // handle
  ctx.fillStyle = '#8a7a3a';
  ctx.beginPath(); ctx.arc(104, 150, 5, 0, 7); ctx.fill();
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.beginPath(); ctx.arc(104, 152, 3, 0, 7); ctx.fill();
  stains(ctx, 128, 256, '#241a10', 12, rng);
  return toTexture(c);
}

function tatami(rng) {
  const c = canvas(128, 128);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#a3a05a';
  ctx.fillRect(0, 0, 128, 128);
  const img = ctx.getImageData(0, 0, 128, 128);
  fillNoise(img, rng, { amp: 12, base: img.data.slice() });
  ctx.putImageData(img, 0, 0);
  // weave (wider spacing + lower contrast: the old 4px lines aliased into a
  // crawling moiré band across the tatami at eye level)
  ctx.strokeStyle = 'rgba(96,94,48,0.35)';
  ctx.lineWidth = 1;
  for (let y = 0; y < 128; y += 6) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(128, y); ctx.stroke(); }
  ctx.strokeStyle = 'rgba(60,58,30,0.5)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(1, 1, 126, 126);
  stains(ctx, 128, 128, '#4a4a2c', 10, rng);
  return toTexture(c);
}

function ceiling(rng) {
  const c = canvas(128, 128);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#9a9a92';
  ctx.fillRect(0, 0, 128, 128);
  const img = ctx.getImageData(0, 0, 128, 128);
  fillNoise(img, rng, { amp: 8, base: img.data.slice() });
  ctx.putImageData(img, 0, 0);
  ctx.strokeStyle = 'rgba(60,60,56,0.5)';
  ctx.strokeRect(0, 0, 128, 128);
  ctx.strokeRect(64, 64, 64, 64);
  // big water stain
  blotch(ctx, 40 + rng() * 40, 30 + rng() * 30, 26, '#5c5a3e', 0.22, 4);
  blotch(ctx, 90, 90, 18, '#666448', 0.16, 3);
  return toTexture(c);
}

function concrete(rng) {
  const c = canvas(128, 128);
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(128, 128);
  fbmNoise(img, rng, 16, 4, [92, 92, 94]);
  ctx.putImageData(img, 0, 0);
  stains(ctx, 128, 128, '#2f3236', 30, rng);
  cracks(ctx, 128, 128, rng, 10, 'rgba(25,25,28,0.6)');
  return toTexture(c);
}

function rustMetal(rng) {
  const c = canvas(128, 128);
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(128, 128);
  fbmNoise(img, rng, 10, 4, [74, 78, 82]);
  ctx.putImageData(img, 0, 0);
  stains(ctx, 128, 128, '#7a4a26', 22, rng);
  stains(ctx, 128, 128, '#a2622e', 12, rng);
  ctx.strokeStyle = 'rgba(200,205,210,0.2)';
  for (let i = 0; i < 10; i++) {
    ctx.beginPath();
    const x = rng() * 128, y = rng() * 128;
    ctx.moveTo(x, y); ctx.lineTo(x + (rng() - 0.5) * 30, y + (rng() - 0.5) * 30);
    ctx.stroke();
  }
  return toTexture(c);
}

function paper(rng, w = 256, h = 320) {
  const c = canvas(w, h);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#c9bd9c';
  ctx.fillRect(0, 0, w, h);
  const img = ctx.getImageData(0, 0, w, h);
  fillNoise(img, rng, { amp: 9, base: img.data.slice() });
  ctx.putImageData(img, 0, 0);
  stains(ctx, w, h, '#8a7c58', 16, rng);
  // fold lines
  ctx.strokeStyle = 'rgba(90,80,55,0.4)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2); ctx.stroke();
  return toTexture(c);
}

function fakeTextRows(ctx, x, y, w, rowH, n, seed) {
  const r = mulberry32(seed);
  for (let i = 0; i < n; i++) {
    let xx = x;
    const rowW = w * (0.7 + r() * 0.3);
    while (xx < x + rowW) {
      const cw = 3 + r() * 4;
      ctx.fillRect(xx, y + i * rowH, cw, rowH * 0.62);
      xx += cw + 2;
    }
  }
}

function newspaper(rng) {
  const c = canvas(256, 320);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#b0a892';
  ctx.fillRect(0, 0, 256, 320);
  const img = ctx.getImageData(0, 0, 256, 320);
  fillNoise(img, rng, { amp: 7, base: img.data.slice() });
  ctx.putImageData(img, 0, 0);
  ctx.fillStyle = '#26241e';
  ctx.fillRect(10, 12, 236, 30);
  ctx.fillStyle = '#b0a892';
  ctx.font = 'bold 20px serif';
  ctx.fillText('◯◯アパート一家失踪', 16, 34);
  ctx.fillStyle = '#26241e';
  fakeTextRows(ctx, 12, 52, 160, 10, 6, 42);
  ctx.strokeStyle = '#26241e';
  ctx.lineWidth = 2;
  ctx.strokeRect(178, 52, 66, 62);
  ctx.fillStyle = '#6b675a';
  ctx.fillRect(182, 56, 58, 54);
  ctx.fillStyle = '#26241e';
  fakeTextRows(ctx, 12, 128, 232, 10, 14, 99);
  fakeTextRows(ctx, 12, 280, 232, 10, 2, 131);
  stains(ctx, 256, 320, '#7d7460', 10, rng);
  return toTexture(c);
}

function journalTex(rng) {
  const c = canvas(256, 320);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#bdb28f';
  ctx.fillRect(0, 0, 256, 320);
  const img = ctx.getImageData(0, 0, 256, 320);
  fillNoise(img, rng, { amp: 8, base: img.data.slice() });
  ctx.putImageData(img, 0, 0);
  ctx.fillStyle = '#2a2620';
  ctx.font = '16px serif';
  const lines = ['また夜中に物音がする。', '3号室の家族が消えてから、', 'ずっとだ。', '', 'あの子だけが、まだ', 'ここにいる気がする。', '', '玄関のドアは、もう', '開かない。'];
  lines.forEach((l, i) => { if (l) ctx.fillText(l, 24, 46 + i * 30); });
  stains(ctx, 256, 320, '#8a7c58', 12, rng);
  return toTexture(c);
}

function drawingTex(rng) {
  const c = canvas(256, 320);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#c4b896';
  ctx.fillRect(0, 0, 256, 320);
  const img = ctx.getImageData(0, 0, 256, 320);
  fillNoise(img, rng, { amp: 8, base: img.data.slice() });
  ctx.putImageData(img, 0, 0);
  // crayon stick family
  ctx.lineWidth = 4;
  const stick = (x, y, h, col) => {
    ctx.strokeStyle = col;
    ctx.beginPath(); ctx.arc(x, y - h, 12, 0, 7); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x, y - h + 12); ctx.lineTo(x, y); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x, y - h + 20); ctx.lineTo(x - 16, y - h + 36); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x, y - h + 20); ctx.lineTo(x + 16, y - h + 36); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x, y - 4); ctx.lineTo(x - 12, y + 22); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x, y - 4); ctx.lineTo(x + 12, y + 22); ctx.stroke();
  };
  stick(50, 120, 66, '#3a3f8a');
  stick(96, 132, 56, '#8a3a3a');
  stick(140, 124, 62, '#3a7a4a');
  stick(186, 132, 40, '#8a6a3a');
  // tall black figure
  ctx.strokeStyle = '#141210';
  ctx.lineWidth = 8;
  ctx.beginPath(); ctx.moveTo(214, 30); ctx.lineTo(214, 60); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(214, 34); ctx.lineTo(204, 58); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(214, 34); ctx.lineTo(226, 60); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(214, 60); ctx.lineTo(214, 132); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(214, 132); ctx.lineTo(200, 158); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(214, 132); ctx.lineTo(228, 158); ctx.stroke();
  // red scribble
  ctx.strokeStyle = 'rgba(160,20,20,0.8)';
  ctx.lineWidth = 5;
  for (let i = 0; i < 14; i++) {
    ctx.beginPath();
    ctx.moveTo(rng() * 256, 160 + rng() * 100);
    ctx.lineTo(rng() * 256, 160 + rng() * 100);
    ctx.stroke();
  }
  ctx.fillStyle = '#2a2620';
  ctx.font = '15px serif';
  ctx.fillText('おかあさん どこ？', 18, 236);
  ctx.fillText('せのたかい くろいひとが', 18, 262);
  ctx.fillText('よるになると みてる', 18, 288);
  stains(ctx, 256, 320, '#8a7c58', 8, rng);
  return toTexture(c);
}

function bloodTex(rng, w = 256, h = 256) {
  const c = canvas(w, h);
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, w, h);
  const splat = (x, y, r) => {
    ctx.fillStyle = '#5c0e0c';
    for (let i = 0; i < 5; i++) {
      const a = rng() * Math.PI * 2, d = rng() * r * 0.7;
      ctx.beginPath();
      ctx.ellipse(x + Math.cos(a) * d, y + Math.sin(a) * d, r * (0.3 + rng() * 0.5), r * (0.2 + rng() * 0.4), rng() * 3, 0, 7);
      ctx.fill();
    }
    ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.7, rng(), 0, 7); ctx.fill();
    // drips
    ctx.fillStyle = '#4a0b09';
    for (let i = 0; i < 3; i++) {
      const dx = x + (rng() - 0.5) * r * 1.4;
      ctx.fillRect(dx, y + r * 0.5, 3, 14 + rng() * 30);
    }
  };
  for (let i = 0; i < 9; i++) splat(rng() * w, rng() * h, 8 + rng() * 22);
  const t = toTexture(c);
  t.colorSpace = THREE.NoColorSpace;
  return t;
}

function handprintTex(rng) {
  const c = canvas(128, 128);
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 128, 128);
  ctx.fillStyle = '#4a0b09';
  // palm
  ctx.beginPath(); ctx.ellipse(56, 78, 22, 30, 0.25, 0, 7); ctx.fill();
  // fingers
  const fw = [[30, 40], [46, 30], [62, 26], [76, 32], [88, 46]];
  for (const [x, y] of fw) {
    ctx.beginPath(); ctx.ellipse(x, y, 6.5, 15, x < 60 ? -0.35 : 0.3, 0, 7); ctx.fill();
  }
  const img = ctx.getImageData(0, 0, 128, 128);
  // speckle noise
  for (let i = 0; i < 2600; i++) {
    const x = (rng() * 128) | 0, y = (rng() * 128) | 0;
    if (img.data[(y * 128 + x) * 4 + 3] > 0) img.data[(y * 128 + x) * 4] += 12;
  }
  ctx.putImageData(img, 0, 0);
  const t = toTexture(c);
  t.colorSpace = THREE.NoColorSpace;
  return t;
}

function photoTex(rng) {
  const c = canvas(128, 160);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#8f8f8a';
  ctx.fillRect(0, 0, 128, 160);
  const img = ctx.getImageData(0, 0, 128, 160);
  fillNoise(img, rng, { amp: 10, base: img.data.slice() });
  ctx.putImageData(img, 0, 0);
  // three smudged figures
  for (const x of [34, 64, 94]) {
    ctx.fillStyle = 'rgba(52,50,44,0.55)';
    ctx.beginPath(); ctx.ellipse(x, 84, 11, 15, 0, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.ellipse(x, 118, 14, 20, 0, 0, 7); ctx.fill();
  }
  // face smudges (unrecognizable)
  ctx.fillStyle = 'rgba(30,28,24,0.5)';
  for (const x of [34, 64, 94]) { ctx.fillRect(x - 7, 78, 14, 8); }
  // torn corner
  ctx.fillStyle = '#c9bd9c';
  ctx.beginPath(); ctx.moveTo(128, 0); ctx.lineTo(112, 0); ctx.lineTo(128, 18); ctx.fill();
  ctx.strokeStyle = 'rgba(40,36,30,0.6)';
  ctx.strokeRect(2, 2, 124, 156);
  return toTexture(c);
}

function dollFace(rng) {
  const c = canvas(64, 64);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#d8d2c4';
  ctx.fillRect(0, 0, 64, 64);
  const img = ctx.getImageData(0, 0, 64, 64);
  fillNoise(img, rng, { amp: 8, base: img.data.slice() });
  ctx.putImageData(img, 0, 0);
  ctx.fillStyle = '#151210';
  ctx.fillRect(16, 24, 8, 8);   // left eye
  ctx.fillRect(42, 24, 10, 10); // right socket (bigger, missing eye)
  ctx.fillStyle = '#5c0e0c';
  ctx.fillRect(41, 22, 13, 3);
  ctx.strokeStyle = '#3a1a16';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(24, 48); ctx.quadraticCurveTo(32, 52, 40, 48); ctx.stroke();
  // crack
  ctx.strokeStyle = 'rgba(40,36,30,0.65)';
  ctx.beginPath(); ctx.moveTo(0, 40); ctx.lineTo(14, 34); ctx.lineTo(26, 38); ctx.lineTo(30, 26); ctx.stroke();
  return toTexture(c);
}

function tvStaticTex() {
  const c = canvas(64, 48);
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(64, 48);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = (Math.random() * 255) | 0;
    img.data[i] = v; img.data[i + 1] = v; img.data[i + 2] = v; img.data[i + 3] = 255;
  }
  // horizontal band
  const band = (Math.random() * 48) | 0;
  for (let x = 0; x < 64; x++) {
    const i = (band * 64 + x) * 4;
    img.data[i] = 220; img.data[i + 1] = 220; img.data[i + 2] = 220;
  }
  ctx.putImageData(img, 0, 0);
  return toStreamingTexture(c);
}

function windowMoon(rng) {
  const c = canvas(128, 256);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#04070d';
  ctx.fillRect(0, 0, 128, 256);
  const img = ctx.getImageData(0, 0, 128, 256);
  fillNoise(img, rng, { amp: 5, base: img.data.slice() });
  ctx.putImageData(img, 0, 0);
  // moon
  ctx.fillStyle = 'rgba(190,205,215,0.85)';
  ctx.beginPath(); ctx.arc(38, 52, 16, 0, 7); ctx.fill();
  ctx.fillStyle = 'rgba(4,7,13,0.55)';
  ctx.beginPath(); ctx.arc(44, 48, 13, 0, 7); ctx.fill();
  // bars
  ctx.fillStyle = '#0a0c10';
  ctx.fillRect(0, 0, 6, 256);
  ctx.fillRect(122, 0, 6, 256);
  ctx.fillRect(0, 0, 128, 6);
  ctx.fillRect(0, 250, 128, 6);
  ctx.fillRect(0, 60, 128, 5);
  ctx.fillRect(0, 128, 128, 5);
  ctx.fillRect(0, 196, 128, 5);
  return toTexture(c);
}

function rainStreaks(rng) {
  const c = canvas(128, 256);
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 128, 256);
  // faint diagonal streaks + wet edges, for overlaying on moonlit windows
  for (let i = 0; i < 28; i++) {
    const x = rng() * 128, y = rng() * 256;
    const len = 24 + rng() * 64;
    const slope = 0.45 + rng() * 0.2;
    ctx.strokeStyle = `rgba(210,225,235,${0.05 + rng() * 0.10})`;
    ctx.lineWidth = 0.5 + rng() * 0.7;
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + len * slope, y + len); ctx.stroke();
    ctx.strokeStyle = `rgba(12,20,30,${0.03 + rng() * 0.07})`;
    ctx.lineWidth = 0.4 + rng() * 0.5;
    ctx.beginPath(); ctx.moveTo(x + 1.2, y); ctx.lineTo(x + 1.2 + len * slope, y + len); ctx.stroke();
  }
  return toTexture(c, false);
}

function fusuma(rng) {
  const c = canvas(128, 256);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#b7ae8f';
  ctx.fillRect(0, 0, 128, 256);
  const img = ctx.getImageData(0, 0, 128, 256);
  fillNoise(img, rng, { amp: 8, base: img.data.slice() });
  ctx.putImageData(img, 0, 0);
  // lattice
  ctx.strokeStyle = '#4a4230';
  ctx.lineWidth = 4;
  ctx.strokeRect(3, 3, 122, 250);
  ctx.lineWidth = 2;
  ctx.strokeRect(12, 12, 104, 112);
  ctx.strokeRect(12, 132, 104, 112);
  // worn hole bottom corner
  ctx.fillStyle = 'rgba(40,36,26,0.6)';
  ctx.beginPath(); ctx.ellipse(34, 240, 18, 12, 0.4, 0, 7); ctx.fill();
  stains(ctx, 128, 256, '#7d745c', 12, rng);
  return toTexture(c);
}

function exitSignTex() {
  const c = canvas(128, 64);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#0a2a10';
  ctx.fillRect(0, 0, 128, 64);
  ctx.fillStyle = '#49d46a';
  ctx.font = 'bold 40px "Hiragino Kaku Gothic ProN", sans-serif';
  ctx.fillText('非常口', 14, 46);
  const img = ctx.getImageData(0, 0, 128, 64);
  fillNoise(img, mulberry32(7), { amp: 8, base: img.data.slice() });
  ctx.putImageData(img, 0, 0);
  return toTexture(c);
}

function graffitiTex(rng) {
  const c = canvas(256, 128);
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(256, 128);
  fbmNoise(img, rng, 12, 4, [128, 124, 112]);
  ctx.putImageData(img, 0, 0);
  stains(ctx, 256, 128, '#4a4436', 20, rng);
  ctx.fillStyle = '#8a1410';
  ctx.font = 'bold 30px serif';
  ctx.save();
  ctx.translate(18, 70);
  ctx.rotate(-0.03);
  ctx.fillText('この廊下は、どこまで', 0, 0);
  ctx.restore();
  ctx.save();
  ctx.translate(40, 106);
  ctx.rotate(0.02);
  ctx.fillText('続くのか', 0, 0);
  ctx.restore();
  return toTexture(c);
}

function brick(rng) {
  const c = canvas(128, 128);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#6e3a30';
  ctx.fillRect(0, 0, 128, 128);
  const img = ctx.getImageData(0, 0, 128, 128);
  fillNoise(img, rng, { amp: 12, base: img.data.slice() });
  ctx.putImageData(img, 0, 0);
  ctx.fillStyle = '#8a4a3a';
  for (let y = 0; y < 128; y += 32) {
    const off = (y / 32) % 2 ? 32 : 0;
    for (let x = -32 + off; x < 128; x += 64) ctx.fillRect(x, y, 62, 30);
  }
  ctx.strokeStyle = 'rgba(40,20,16,0.7)';
  for (let y = 0; y < 128; y += 32) { ctx.fillRect(0, y, 128, 2); }
  for (let y = 0; y < 128; y += 32) {
    const off = (y / 32) % 2 ? 32 : 0;
    for (let x = off; x < 128; x += 64) ctx.fillRect(x, y, 2, 32);
  }
  stains(ctx, 128, 128, '#2a1410', 18, rng);
  return toTexture(c);
}

function ofudaTex() {
  const c = canvas(64, 160);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#ddd6be';
  ctx.fillRect(0, 0, 64, 160);
  const img = ctx.getImageData(0, 0, 64, 160);
  fillNoise(img, mulberry32(11), { amp: 8, base: img.data.slice() });
  ctx.putImageData(img, 0, 0);
  ctx.fillStyle = '#9a1420';
  ctx.fillRect(26, 20, 12, 120);
  ctx.strokeStyle = 'rgba(120,90,60,0.5)';
  ctx.strokeRect(1, 1, 62, 158);
  return toTexture(c);
}

function quiltTex(rng) {
  const c = canvas(128, 128);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#5a6270';
  ctx.fillRect(0, 0, 128, 128);
  const img = ctx.getImageData(0, 0, 128, 128);
  fillNoise(img, rng, { amp: 10, base: img.data.slice() });
  ctx.putImageData(img, 0, 0);
  // patch grid
  ctx.strokeStyle = 'rgba(30,34,44,0.7)';
  for (let i = 0; i <= 4; i++) { ctx.fillRect(i * 32 - 1, 0, 2, 128); ctx.fillRect(0, i * 32 - 1, 128, 2); }
  ctx.fillStyle = 'rgba(180,190,205,0.15)';
  for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) if ((x + y) % 2) ctx.fillRect(x * 32 + 3, y * 32 + 3, 26, 26);
  return toTexture(c);
}

function skinTex(rng) {
  const c = canvas(64, 64);
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(64, 64);
  fbmNoise(img, rng, 10, 4, [168, 162, 150]);
  ctx.putImageData(img, 0, 0);
  stains(ctx, 64, 64, '#6b5a4a', 14, rng);
  stains(ctx, 64, 64, '#8f9a92', 8, rng);
  return toTexture(c);
}

function faceTex(rng) {
  // monster face: hollow eyes, gaping dark mouth on pale skin
  const c = canvas(128, 128);
  const ctx = c.getContext('2d');
  ctx.drawImage(skinTex(rng).image, 0, 0, 128, 128);
  ctx.fillStyle = '#0c0a08';
  ctx.beginPath(); ctx.ellipse(40, 52, 13, 17, 0.08, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.ellipse(88, 52, 13, 17, -0.08, 0, 7); ctx.fill();
  ctx.fillStyle = 'rgba(210,205,190,0.5)';
  ctx.beginPath(); ctx.ellipse(42, 47, 3, 4, 0, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.ellipse(86, 47, 3, 4, 0, 0, 7); ctx.fill();
  // mouth: vertical slit
  ctx.fillStyle = '#120b08';
  ctx.beginPath(); ctx.ellipse(64, 96, 9, 20, 0, 0, 7); ctx.fill();
  ctx.strokeStyle = 'rgba(60,30,24,0.8)';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(52, 108); ctx.lineTo(76, 108); ctx.stroke();
  // grime
  stains(ctx, 128, 128, '#2c2018', 10, rng);
  return toTexture(c);
}

function rugTex(rng) {
  const c = canvas(128, 128);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#5a2620';
  ctx.fillRect(0, 0, 128, 128);
  const img = ctx.getImageData(0, 0, 128, 128);
  fillNoise(img, rng, { amp: 10, base: img.data.slice() });
  ctx.putImageData(img, 0, 0);
  ctx.strokeStyle = '#2a140e';
  ctx.lineWidth = 6;
  ctx.strokeRect(6, 6, 116, 116);
  ctx.strokeStyle = 'rgba(190,150,110,0.3)';
  ctx.lineWidth = 2;
  ctx.strokeRect(12, 12, 104, 104);
  ctx.strokeStyle = 'rgba(40,20,16,0.5)';
  ctx.lineWidth = 2;
  for (let y = 24; y < 108; y += 21) {
    for (let x = 24; x < 108; x += 21) {
      ctx.beginPath();
      ctx.moveTo(x, y - 6); ctx.lineTo(x + 6, y); ctx.lineTo(x, y + 6); ctx.lineTo(x - 6, y);
      ctx.closePath(); ctx.stroke();
    }
  }
  stains(ctx, 128, 128, '#1c0e0a', 16, rng);
  return toTexture(c);
}

function eyesWallTex(rng) {
  const c = canvas(128, 128);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#14100e';
  ctx.fillRect(0, 0, 128, 128);
  const img = ctx.getImageData(0, 0, 128, 128);
  fillNoise(img, rng, { amp: 8, base: img.data.slice() });
  ctx.putImageData(img, 0, 0);
  for (let i = 0; i < 36; i++) {
    const x = rng() * 128, y = rng() * 128;
    const r = 2 + rng() * 4.5;
    const o = rng() * Math.PI;
    ctx.fillStyle = 'rgba(198,193,178,0.45)';
    ctx.beginPath(); ctx.ellipse(x, y, r * 1.35, r, o, 0, 7); ctx.fill();
    ctx.fillStyle = 'rgba(6,6,6,0.9)';
    ctx.beginPath(); ctx.ellipse(x, y, r * 0.55, r * 0.5, o, 0, 7); ctx.fill();
    if (rng() < 0.3) {
      ctx.fillStyle = 'rgba(90,12,10,0.5)';
      ctx.fillRect(x - 1, y + r, 2, 6 + rng() * 12);
    }
  }
  stains(ctx, 128, 128, '#000000', 6, rng);
  return toTexture(c);
}

function clockTex(back = false) {
  const c = canvas(128, 128);
  const ctx = c.getContext('2d');
  const rng = mulberry32(21);
  ctx.fillStyle = '#e8e2d0';
  ctx.beginPath(); ctx.arc(64, 64, 60, 0, 7); ctx.fill();
  const img = ctx.getImageData(0, 0, 128, 128);
  fillNoise(img, rng, { amp: 8, base: img.data.slice() });
  ctx.putImageData(img, 0, 0);
  ctx.strokeStyle = '#2a2620';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(64, 64, 58, 0, 7); ctx.stroke();
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    ctx.lineWidth = i % 3 ? 2 : 4;
    ctx.beginPath();
    ctx.moveTo(64 + Math.sin(a) * 48, 64 - Math.cos(a) * 48);
    ctx.lineTo(64 + Math.sin(a) * 54, 64 - Math.cos(a) * 54);
    ctx.stroke();
  }
  // 停在 3:33；back 变体 = 两根针都从原位逆时针退回一截（时间倒走了）
  const hb = Math.PI * 1.07 + (back ? -0.55 : 0);
  const mb = Math.PI * 0.12 + (back ? -1.9 : 0);
  ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(64, 64); ctx.lineTo(64 + Math.sin(hb) * 28, 64 - Math.cos(hb) * 28); ctx.stroke();
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(64, 64); ctx.lineTo(64 + Math.sin(mb) * 44, 64 - Math.cos(mb) * 44); ctx.stroke();
  // crack
  ctx.strokeStyle = 'rgba(40,36,30,0.7)';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(20, 90); ctx.lineTo(42, 78); ctx.lineTo(58, 86); ctx.stroke();
  return toTexture(c);
}

function scrollTex(rng) {
  const c = canvas(128, 256);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#c9bd9c';
  ctx.fillRect(0, 0, 128, 256);
  const img = ctx.getImageData(0, 0, 128, 256);
  fillNoise(img, rng, { amp: 8, base: img.data.slice() });
  ctx.putImageData(img, 0, 0);
  ctx.fillStyle = '#3a2a1c';
  ctx.fillRect(0, 0, 128, 10);
  ctx.fillRect(0, 246, 128, 10);
  ctx.fillStyle = '#1a1814';
  for (let col = 0; col < 2; col++) {
    const x = 34 + col * 36;
    ctx.font = 'bold 30px serif';
    ctx.fillText('◯', x, 62);
    ctx.font = '26px serif';
    ctx.fillText('◯', x, 98);
    ctx.fillText('◯', x, 132);
    ctx.fillText('◯', x, 166);
    ctx.fillText('◯', x, 200);
  }
  ctx.fillStyle = '#a01420';
  ctx.fillRect(92, 204, 24, 24);
  stains(ctx, 128, 256, '#8a7c58', 10, rng);
  return toTexture(c);
}

function silhouetteTex() {
  const c = canvas(128, 256);
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 128, 256);
  ctx.fillStyle = 'rgba(10,10,12,0.92)';
  ctx.beginPath(); ctx.ellipse(64, 56, 16, 21, 0, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.moveTo(40, 80); ctx.quadraticCurveTo(64, 70, 88, 80);
  ctx.lineTo(84, 238); ctx.lineTo(44, 238); ctx.closePath(); ctx.fill();
  ctx.fillRect(24, 94, 14, 122);
  ctx.fillRect(90, 94, 14, 122);
  return toTexture(c, false);
}

function tvFaceTex(rng) {
  const c = canvas(128, 96);
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 128, 96);
  ctx.fillStyle = 'rgba(178,176,166,0.85)';
  ctx.beginPath(); ctx.ellipse(64, 50, 30, 38, 0, 0, 7); ctx.fill();
  ctx.fillStyle = 'rgba(8,8,8,0.95)';
  ctx.beginPath(); ctx.ellipse(50, 42, 8, 10, 0, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.ellipse(78, 42, 8, 10, 0, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.ellipse(64, 74, 7, 12, 0, 0, 7); ctx.fill();
  const img = ctx.getImageData(0, 0, 128, 96);
  for (let i = 0; i < 3000; i++) {
    const x = (rng() * 128) | 0, y = (rng() * 96) | 0;
    const k = (y * 128 + x) * 4;
    if (img.data[k + 3] > 0) img.data[k] = img.data[k] < 128 ? 240 : 60;
  }
  ctx.putImageData(img, 0, 0);
  return toTexture(c, false);
}

function mirrorTex(rng) {
  const c = canvas(128, 256);
  const ctx = c.getContext('2d');
  // 镜面稍亮一点，让人影能以「暗剪影」形式衬出来（报告 3.4：逆光剪影）
  ctx.fillStyle = '#1c2429';
  ctx.fillRect(0, 0, 128, 256);
  const img = ctx.getImageData(0, 0, 128, 256);
  fillNoise(img, rng, { amp: 7, base: img.data.slice() });
  ctx.putImageData(img, 0, 0);
  ctx.strokeStyle = 'rgba(90,100,105,0.22)';
  for (let i = 0; i < 14; i++) {
    ctx.beginPath();
    const x = rng() * 128;
    ctx.moveTo(x, 0); ctx.lineTo(x + (rng() - 0.5) * 30, 256);
    ctx.stroke();
  }
  // a standing figure that is not you —— 提高到能一眼认出「那是个人」的剪影，
  // 但保留模糊与歪头（恐怖谷：像人又不像人）；报告 1.4
  ctx.save();
  ctx.translate(64, 120);
  ctx.rotate(0.06); /* 头与身体整体微微歪斜 */
  // 躯干（暗色，比镜面暗一档）
  ctx.fillStyle = 'rgba(8,10,12,0.82)';
  ctx.beginPath(); ctx.ellipse(0, 32, 20, 48, 0, 0, 7); ctx.fill();
  // 头
  ctx.beginPath(); ctx.ellipse(-2, -34, 15, 19, 0.08, 0, 7); ctx.fill();
  // 垂在两侧的手臂
  ctx.fillRect(-36, -16, 11, 58);
  ctx.fillRect(25, -16, 11, 58);
  // 苍白的一小块脸（在暗剪影里唯一亮的东西）
  ctx.fillStyle = 'rgba(168,172,168,0.5)';
  ctx.beginPath(); ctx.ellipse(-4, -38, 8, 10, 0.08, 0, 7); ctx.fill();
  // 两点红眼：凝视恐惧（报告 1.4「它在看着我」）
  ctx.fillStyle = 'rgba(200,45,52,0.75)';
  ctx.beginPath(); ctx.ellipse(-7, -39, 2.2, 1.6, 0, 0, 7); ctx.fill();
  ctx.beginPath(); ctx.ellipse(0, -40, 2.2, 1.6, 0, 0, 7); ctx.fill();
  ctx.restore();
  ctx.strokeStyle = 'rgba(220,228,232,0.5)';
  ctx.beginPath(); ctx.moveTo(20, 20); ctx.lineTo(48, 90); ctx.lineTo(44, 120); ctx.lineTo(70, 190); ctx.stroke();
  stains(ctx, 128, 256, '#0a0e10', 12, rng);
  return toTexture(c);
}

// bathroom wall tiles: small grimy ceramic squares with dark grout
function tileTex(rng) {
  const c = canvas(128, 128);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#767b74';
  ctx.fillRect(0, 0, 128, 128);
  // 4x4 tile grid, 32px tiles, 3px grout
  for (let ty = 0; ty < 4; ty++) {
    for (let tx = 0; tx < 4; tx++) {
      const shade = 114 + ((rng() - 0.5) * 22) | 0;
      ctx.fillStyle = `rgb(${shade},${shade + 3},${shade - 2})`;
      ctx.fillRect(tx * 32 + 2, ty * 32 + 2, 28, 28);
      // per-tile grime gradient (darker toward the bottom edge) - emulated
      // with stacked translucent bands: no canvas gradient API, so the
      // headless smoke-test stub stays happy
      for (let band = 0; band < 4; band++) {
        ctx.fillStyle = `rgba(40,44,40,${0.04 + band * 0.045})`;
        ctx.fillRect(tx * 32 + 2, ty * 32 + 2 + band * 7, 28, 7);
      }
      ctx.fillStyle = 'rgba(255,255,255,0.035)';
      ctx.fillRect(tx * 32 + 2, ty * 32 + 2, 28, 4);
      // occasional cracked/missing tile
      if (rng() < 0.12) {
        ctx.fillStyle = 'rgba(52,50,44,0.8)';
        ctx.fillRect(tx * 32 + 2, ty * 32 + 2, 28, 28);
        ctx.strokeStyle = 'rgba(20,18,14,0.5)';
        ctx.beginPath();
        ctx.moveTo(tx * 32 + 6, ty * 32 + 8);
        ctx.lineTo(tx * 32 + 22, ty * 32 + 24);
        ctx.stroke();
      }
    }
  }
  // grout stains + mildew spots
  stains(ctx, 128, 128, '#3d443c', 22, rng);
  stains(ctx, 128, 128, '#2c3a30', 8, rng);
  const img = ctx.getImageData(0, 0, 128, 128);
  fillNoise(img, rng, { amp: 6, base: img.data.slice() });
  ctx.putImageData(img, 0, 0);
  return toTexture(c);
}

// row of apartment mailboxes with blurred name tags
function mailboxTex(rng) {
  const c = canvas(256, 128);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#4a4e52';
  ctx.fillRect(0, 0, 256, 128);
  const img = ctx.getImageData(0, 0, 256, 128);
  fillNoise(img, rng, { amp: 8, base: img.data.slice() });
  ctx.putImageData(img, 0, 0);
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 4; col++) {
      const x = 10 + col * 62, y = 8 + row * 60;
      // door
      ctx.fillStyle = '#6a7076';
      ctx.fillRect(x, y, 54, 48);
      ctx.strokeStyle = 'rgba(20,22,24,0.8)';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, 54, 48);
      // rust spots on the door
      for (let i = 0; i < 4; i++) {
        blotch(ctx, x + rng() * 54, y + rng() * 48, 3 + rng() * 5, '#7a4a26', 0.25, 2);
      }
      // name tag (one blurred beyond reading - room 3)
      ctx.fillStyle = '#c9bd9c';
      ctx.fillRect(x + 6, y + 26, 40, 12);
      ctx.fillStyle = 'rgba(40,36,30,0.85)';
      if (row === 0 && col === 2) {
        ctx.filter = 'blur(2px)';
        ctx.fillRect(x + 9, y + 29, 34, 6);
        ctx.filter = 'none';
      } else {
        ctx.fillRect(x + 9, y + 29, 34, 6);
      }
      // room number
      ctx.fillStyle = '#1e2022';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(String(row * 4 + col + 1), x + 44, y + 14);
      // lock hole
      ctx.fillStyle = '#141618';
      ctx.beginPath();
      ctx.arc(x + 27, y + 42, 2.5, 0, 7);
      ctx.fill();
    }
  }
  return toTexture(c);
}

function growthTex(rng) {
  const c = canvas(64, 256);
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 64, 256);
  ctx.fillStyle = 'rgba(214,206,186,0.9)';
  ctx.fillRect(6, 0, 52, 256);
  const img = ctx.getImageData(0, 0, 64, 256);
  fillNoise(img, rng, { amp: 7, base: img.data.slice() });
  ctx.putImageData(img, 0, 0);
  ctx.fillStyle = 'rgba(40,36,30,0.75)';
  ctx.font = '9px serif';
  for (let y = 16; y < 248; y += 20) {
    ctx.fillRect(20, y, 24, 1);
    ctx.fillText(String(210 - ((y - 16) / 20) * 10), 7, y + 3);
  }
  ctx.fillStyle = 'rgba(140,20,16,0.8)';
  ctx.font = '10px serif';
  ctx.fillText('ヒロ', 44, 92);
  ctx.fillRect(26, 84, 18, 1);
  ctx.fillText('ナオ', 44, 120);
  ctx.fillRect(26, 112, 18, 1);
  ctx.fillStyle = 'rgba(60,20,16,0.9)';
  ctx.fillText('ミツコ', 38, 200);
  ctx.fillRect(26, 192, 18, 1);
  ctx.fillStyle = 'rgba(90,12,10,0.7)';
  ctx.fillRect(26, 188, 18, 3); // scratched out
  return toTexture(c, false);
}

export function createTextures() {
  const T = {};
  T.plaster = wallPlaster(mulberry32(101));
  T.wallpaper = wallpaper(mulberry32(102));
  T.woodDoor = woodDoor(mulberry32(103));
  T.woodFloor = woodPlanks(mulberry32(104), 128, 128, [84, 64, 44], true);
  T.woodWall = woodPlanks(mulberry32(105), 128, 128, [74, 56, 38], true);
  T.tatami = tatami(mulberry32(106));
  T.ceiling = ceiling(mulberry32(107));
  T.concrete = concrete(mulberry32(108));
  T.rust = rustMetal(mulberry32(109));
  T.paper = paper(mulberry32(110));
  T.news = newspaper(mulberry32(111));
  T.journal = journalTex(mulberry32(112));
  T.drawing = drawingTex(mulberry32(113));
  T.blood = bloodTex(mulberry32(114));
  T.handprint = handprintTex(mulberry32(115));
  T.photo = photoTex(mulberry32(116));
  T.dollFace = dollFace(mulberry32(117));
  T.tvStatic = tvStaticTex();
  T.windowMoon = windowMoon(mulberry32(118));
  T.fusuma = fusuma(mulberry32(119));
  T.exitSign = exitSignTex();
  T.graffiti = graffitiTex(mulberry32(120));
  T.brick = brick(mulberry32(121));
  T.ofuda = ofudaTex();
  T.quilt = quiltTex(mulberry32(122));
  T.skin = skinTex(mulberry32(123));
  T.face = faceTex(mulberry32(124));
  T.rug = rugTex(mulberry32(125));
  T.eyesWall = eyesWallTex(mulberry32(126));
  T.clock = clockTex();
  T.scroll = scrollTex(mulberry32(127));
  T.silhouette = silhouetteTex();
  T.tvFace = tvFaceTex(mulberry32(128));
  T.mirror = mirrorTex(mulberry32(129));
  T.growth = growthTex(mulberry32(130));
  T.tile = tileTex(mulberry32(131));
  T.mailbox = mailboxTex(mulberry32(132));
  T.rainStreaks = rainStreaks(mulberry32(133));
  T.clockBack = clockTex(true);
  return T;
}

// per-frame noise update for the TV
export function updateTVStatic(tex) {
  const ctx = tex.image.getContext('2d');
  const img = ctx.createImageData(64, 48);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = (Math.random() * 255) | 0;
    img.data[i] = v; img.data[i + 1] = v; img.data[i + 2] = v; img.data[i + 3] = 255;
  }
  const band = (Math.random() * 48) | 0;
  for (let x = 0; x < 64; x++) {
    const i = (band * 64 + x) * 4;
    img.data[i] = 235; img.data[i + 1] = 235; img.data[i + 2] = 235;
  }
  ctx.putImageData(img, 0, 0);
  tex.needsUpdate = true;
}
