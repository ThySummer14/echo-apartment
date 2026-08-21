// audio.js — fully procedural WebAudio engine (no external assets).
import { rand, clamp, mulberry32 } from './util.js';

export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.ambientGain = null;
    this.humGain = null;
    this.tvGain = null;
    this.windGain = null;
    this.fear = 0;
    this._noiseBuf = null;
    this._hbTimer = null;
    this._phoneTimer = null;
    this.enabled = true;
    this.droneOscs = [];
    // music director state
    this.musNext = 3;
    this.chasePulse = 0;
    this.chaseBar = 0;
    this.chaseOn = false;
  }

  // call from a user gesture
  ensure() {
    if (this.ctx) { this.ctx.resume?.(); return; }
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AC();
    } catch (e) {
      this.enabled = false;
      return;
    }
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.85;
    const comp = this.ctx.createDynamicsCompressor();
    comp.threshold.value = -18;
    comp.ratio.value = 8;
    this.master.connect(comp);
    comp.connect(this.ctx.destination);

    this._noiseBuf = this._makeNoise(2);
    this._buildReverb();
    this._buildAmbient();
  }

  _makeNoise(seconds) {
    const len = (seconds * this.ctx.sampleRate) | 0;
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  }

  // procedural impulse response: decaying stereo noise ~1.9s. Sends through it
  // turn dry one-shots into sounds inhabiting the apartment's dead rooms.
  _buildReverb() {
    const c = this.ctx;
    const dur = 1.9, len = (dur * c.sampleRate) | 0;
    const ir = c.createBuffer(2, len, c.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const d = ir.getChannelData(ch);
      let last = 0;
      for (let i = 0; i < len; i++) {
        const t = i / len;
        const decay = Math.pow(1 - t, 2.4);
        // one-pole lowpass on the noise so the tail is dark, not hissy
        const n = (Math.random() * 2 - 1) * decay;
        last = last * 0.72 + n * 0.28;
        d[i] = last * (i < 200 ? i / 200 : 1); // tiny fade-in against clicks
      }
    }
    this.rev = c.createConvolver();
    this.rev.buffer = ir;
    this.revGain = c.createGain();
    this.revGain.gain.value = 0.5;
    this.rev.connect(this.revGain);
    this.revGain.connect(this.master);
  }

  // route a node to master + a reverb send (share one send gain per voice)
  _out(node, wet = 0.35) {
    node.connect(this.master);
    if (this.rev) {
      const s = this.ctx.createGain();
      s.gain.value = wet;
      node.connect(s);
      s.connect(this.rev);
    }
  }

  // ---------- ambient ----------
  _buildAmbient() {
    const c = this.ctx;
    // deep drone: two detuned sines
    const droneGain = c.createGain();
    droneGain.gain.value = 0.05;
    const lp = c.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 130;
    droneGain.connect(lp); lp.connect(this.master);
    this.ambientGain = droneGain;
    for (const f of [41.2, 41.7, 82.4]) {
      const o = c.createOscillator();
      o.type = 'sine'; o.frequency.value = f;
      const g = c.createGain(); g.gain.value = f > 60 ? 0.35 : 1;
      o.connect(g); g.connect(droneGain);
      o.start();
      this.droneOscs.push(o);
    }
    // air noise
    const air = c.createBufferSource();
    air.buffer = this._noiseBuf; air.loop = true;
    const airF = c.createBiquadFilter();
    airF.type = 'lowpass'; airF.frequency.value = 420;
    const airG = c.createGain(); airG.gain.value = 0.012;
    air.connect(airF); airF.connect(airG); airG.connect(this.master);
    air.start();

    // fluorescent hum (gain modulated by lights)
    const hum = c.createOscillator();
    hum.type = 'square'; hum.frequency.value = 120;
    const humF = c.createBiquadFilter();
    humF.type = 'bandpass'; humF.frequency.value = 120; humF.Q.value = 12;
    const humG = c.createGain(); humG.gain.value = 0;
    hum.connect(humF); humF.connect(humG); humG.connect(this.master);
    hum.start();
    this.humGain = humG;

    // TV static loop node (gain 0 until TV is on)
    const tv = c.createBufferSource();
    tv.buffer = this._noiseBuf; tv.loop = true;
    const tvF = c.createBiquadFilter();
    tvF.type = 'highpass'; tvF.frequency.value = 900;
    const tvG = c.createGain(); tvG.gain.value = 0;
    tv.connect(tvF); tvF.connect(tvG); tvG.connect(this.master);
    tv.start();
    this.tvGain = tvG;

    // night wind around the building (gain driven by setWind)
    const wind = c.createBufferSource();
    wind.buffer = this._noiseBuf; wind.loop = true;
    wind.playbackRate.value = 0.5;
    const windF = c.createBiquadFilter();
    windF.type = 'lowpass'; windF.frequency.value = 240; windF.Q.value = 0.7;
    const windG = c.createGain(); windG.gain.value = 0.0;
    wind.connect(windF); windF.connect(windG); windG.connect(this.master);
    wind.start();
    this.windGain = windG;
    // slow LFO wobbles the wind filter cutoff so the gusts breathe
    const lfo = c.createOscillator();
    lfo.frequency.value = 0.13;
    const lfoAmt = c.createGain(); lfoAmt.gain.value = 90;
    lfo.connect(lfoAmt); lfoAmt.connect(windF.frequency);
    lfo.start();

    // constant rain hiss outside: a soft bandpassed noise bed that swells near
    // windows, stairwells and the upper floor, tying the storm together.
    const rain = c.createBufferSource();
    rain.buffer = this._noiseBuf; rain.loop = true;
    rain.playbackRate.value = 0.35;
    const rainF = c.createBiquadFilter();
    rainF.type = 'bandpass'; rainF.frequency.value = 720; rainF.Q.value = 0.55;
    const rainG = c.createGain(); rainG.gain.value = 0.006;
    rain.connect(rainF); rainF.connect(rainG); rainG.connect(this.master);
    if (this.rev) {
      const rainSend = c.createGain(); rainSend.gain.value = 0.25;
      rainG.connect(rainSend); rainSend.connect(this.rev);
    }
    rain.start();
    this.rainGain = rainG;
  }

  setWind(level) {
    if (this.windGain) this.windGain.gain.setTargetAtTime(clamp(level, 0, 1) * 0.05, this.ctx.currentTime, 0.6);
  }

  setRain(level) {
    if (this.rainGain) this.rainGain.gain.setTargetAtTime(clamp(level, 0, 1) * 0.02, this.ctx.currentTime, 0.8);
  }

  setFear(v) {
    if (!this.ctx) return;
    this.fear = clamp(v, 0, 1);
    if (this.ambientGain) {
      this.ambientGain.gain.setTargetAtTime(0.05 + this.fear * 0.055, this.ctx.currentTime, 0.4);
    }
  }

  setHum(level) {
    if (this.humGain) this.humGain.gain.setTargetAtTime(clamp(level, 0, 1) * 0.022, this.ctx.currentTime, 0.25);
  }

  setTV(on) {
    if (this.tvGain) this.tvGain.gain.setTargetAtTime(on ? 0.05 : 0, this.ctx.currentTime, 0.15);
  }

  // ---------- one-shot helpers ----------
  _env(peak, attack, decay, t0) {
    const c = this.ctx;
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(peak, t0 + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + attack + decay);
    return g;
  }

  _pan(v) {
    if (!this.ctx) return null;
    const p = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
    if (p) p.pan.value = clamp(v, -1, 1);
    return p;
  }

  _noise({ dur = 0.1, type = 'bandpass', freq = 400, freqEnd = null, q = 2, gain = 0.1, attack = 0.005, pan = 0, delay = 0, hp = 0 }) {
    if (!this.ctx) return;
    const c = this.ctx, t0 = c.currentTime + delay;
    const src = c.createBufferSource();
    src.buffer = this._noiseBuf;
    src.loop = true;
    src.playbackRate.value = 0.8 + Math.random() * 0.4;
    const f = c.createBiquadFilter();
    f.type = type; f.frequency.setValueAtTime(freq, t0);
    if (freqEnd !== null) f.frequency.exponentialRampToValueAtTime(Math.max(30, freqEnd), t0 + dur);
    f.Q.value = q;
    let tail = f;
    if (hp > 0) {
      const hf = c.createBiquadFilter(); hf.type = 'highpass'; hf.frequency.value = hp;
      f.connect(hf); tail = hf;
    }
    const g = this._env(gain, attack, dur, t0);
    tail.connect(g);
    const p = this._pan(pan);
    if (p) { g.connect(p); this._out(p, 0.3); } else this._out(g, 0.3);
    src.connect(f);
    src.start(t0);
    src.stop(t0 + dur + attack + 0.05);
  }

  _osc({ type = 'sine', f0 = 440, f1 = null, dur = 0.5, gain = 0.1, attack = 0.01, pan = 0, delay = 0, curve = [], wet = 0.35 }) {
    if (!this.ctx) return;
    const c = this.ctx, t0 = c.currentTime + delay;
    const o = c.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(f0, t0);
    if (f1 !== null) o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t0 + dur);
    for (const [t, f] of curve) o.frequency.setValueAtTime(f, t0 + t);
    const g = this._env(gain, attack, dur, t0);
    o.connect(g);
    const p = this._pan(pan);
    if (p) { g.connect(p); this._out(p, wet); } else this._out(g, wet);
    o.start(t0);
    o.stop(t0 + dur + attack + 0.05);
  }

  // ---------- game sounds ----------
  // surface-aware footsteps: wood = dry mid knock, tatami = soft dull thud,
  // concrete = hard click with a scrape
  footstep(surface = 'wood') {
    if (surface === true) surface = 'tatami';   // legacy soft flag
    if (surface === false) surface = 'wood';
    if (surface === 'tatami') {
      this._noise({ dur: 0.08, type: 'lowpass', freq: 300, gain: 0.06, attack: 0.004 });
      this._noise({ dur: 0.05, type: 'bandpass', freq: 130, q: 1.2, gain: 0.035, attack: 0.003 });
    } else if (surface === 'concrete') {
      this._noise({ dur: 0.07, type: 'bandpass', freq: 430, q: 1.8, gain: 0.09, attack: 0.002, hp: 120 });
      this._noise({ dur: 0.04, type: 'highpass', freq: 1600, gain: 0.012, attack: 0.001 });
    } else {
      this._noise({ dur: 0.09, type: 'bandpass', freq: 190, q: 1.4, gain: 0.085, attack: 0.003, hp: 60 });
      this._noise({ dur: 0.04, type: 'bandpass', freq: 800, q: 2, gain: 0.014, attack: 0.001 });
      // an old floorboard occasionally creaks underfoot
      if (Math.random() < 0.12) this.woodenCreak();
    }
  }

  runStep(surface = 'wood') {
    const f = surface === 'concrete' ? 320 : surface === 'tatami' ? 130 : rand(220, 300);
    this._noise({ dur: 0.08, type: surface === 'tatami' ? 'lowpass' : 'bandpass', freq: f, q: 1.5, gain: 0.11, attack: 0.003 });
  }

  doorOpen() {
    const r = mulberry32((Math.random() * 1e9) | 0);
    this._osc({ type: 'sawtooth', f0: 70, f1: 150, dur: 0.8, gain: 0.05, attack: 0.1, curve: [[0.1, 92], [0.3, 78], [0.5, 118], [0.7, 84]] });
    this._noise({ dur: 0.7, type: 'bandpass', freq: 300, freqEnd: 900, q: 6, gain: 0.03, attack: 0.06 });
  }

  doorClose() {
    this._osc({ type: 'sawtooth', f0: 140, f1: 62, dur: 0.35, gain: 0.05, attack: 0.02 });
    this._noise({ dur: 0.12, type: 'lowpass', freq: 800, gain: 0.1, attack: 0.002 });
  }

  doorSlam() {
    this._noise({ dur: 0.4, type: 'lowpass', freq: 500, gain: 0.5, attack: 0.002 });
    this._osc({ type: 'sine', f0: 70, f1: 38, dur: 0.5, gain: 0.28, attack: 0.002 });
  }

  woodenCreak() {
    this._osc({ type: 'sawtooth', f0: rand(90, 130), f1: rand(50, 80), dur: 1.4, gain: 0.03, attack: 0.4, curve: [[0.3, 110], [0.7, 92], [1.1, 64]] });
  }

  sting() {
    if (!this.ctx) return;
    const freqs = [110, 116.5, 220, 233, 466];
    for (const f of freqs) {
      this._osc({ type: 'sawtooth', f0: f * 0.97, f1: f * 0.94, dur: 1.5, gain: 0.055, attack: 0.008 });
    }
    this._noise({ dur: 0.7, type: 'lowpass', freq: 1600, gain: 0.22, attack: 0.004 });
    this._osc({ type: 'sine', f0: 880, f1: 60, dur: 1.2, gain: 0.05, attack: 0.004 });
  }

  scareBurst() {
    this._noise({ dur: 0.9, type: 'bandpass', freq: 3000, q: 0.6, gain: 0.5, attack: 0.002 });
    this._osc({ type: 'square', f0: 180, f1: 40, dur: 0.9, gain: 0.16, attack: 0.002 });
  }

  whisper(pan = 0, dur = 1.8) {
    if (!this.ctx) return;
    const steps = 5;
    const f0 = rand(900, 1500);
    for (let i = 0; i < steps; i++) {
      this._noise({
        dur: dur / steps + 0.05,
        type: 'bandpass',
        freq: f0 + Math.sin(i * 1.7) * 500 + rand(-200, 200),
        q: 9,
        gain: 0.05 + Math.random() * 0.03,
        attack: 0.06,
        pan,
        delay: (i * dur) / steps,
      });
    }
    // breath under it
    this._noise({ dur, type: 'bandpass', freq: 500, q: 1, gain: 0.02, attack: 0.3, pan });
  }

  moan(pan = 0) {
    const r = mulberry32((Math.random() * 1e9) | 0);
    const pts = [];
    for (let t = 0; t <= 2.2; t += 0.2) pts.push([t, 150 - t * 30 + Math.sin(t * 6) * 18]);
    this._osc({ type: 'sine', f0: 160, f1: 80, dur: 2.2, gain: 0.055, attack: 0.5, pan, curve: pts });
    this._noise({ dur: 2.2, type: 'bandpass', freq: 700, q: 4, gain: 0.015, attack: 0.4, pan });
  }

  bell() {
    this._osc({ type: 'sine', f0: 1568, f1: 1500, dur: 1.1, gain: 0.06, attack: 0.004 });
    this._osc({ type: 'sine', f0: 2093, f1: 1980, dur: 0.7, gain: 0.03, attack: 0.004 });
  }

  phoneRing() {
    if (!this.ctx || this._phoneTimer) return;
    const ring = () => {
      this._osc({ type: 'square', f0: 25, dur: 0.9, gain: 0.05, attack: 0.01 });
      this._osc({ type: 'square', f0: 20, dur: 0.9, gain: 0.03, attack: 0.01 });
    };
    ring();
    let n = 1;
    this._phoneTimer = setInterval(() => {
      ring();
      if (++n >= 4) { clearInterval(this._phoneTimer); this._phoneTimer = null; }
    }, 1900);
  }

  phoneStop() {
    if (this._phoneTimer) { clearInterval(this._phoneTimer); this._phoneTimer = null; }
  }

  heartbeat(on, intensity = 1) {
    if (!this.ctx) return;
    if (!on) {
      if (this._hbTimer) { clearInterval(this._hbTimer); this._hbTimer = null; }
      return;
    }
    if (this._hbTimer) return;
    const thump = (g) => {
      this._osc({ type: 'sine', f0: 58, f1: 40, dur: 0.14, gain: 0.5 * g, attack: 0.006 });
    };
    const beat = () => { thump(intensity); setTimeout(() => thump(intensity * 0.7), 180); };
    beat();
    this._hbTimer = setInterval(beat, 850);
  }

  thud() {
    this._osc({ type: 'sine', f0: 48, f1: 30, dur: 0.25, gain: 0.4, attack: 0.004 });
    this._noise({ dur: 0.12, type: 'lowpass', freq: 300, gain: 0.12, attack: 0.002 });
  }

  clatter() {
    for (let i = 0; i < 4; i++) {
      this._noise({ dur: 0.06, type: 'bandpass', freq: rand(900, 2400), q: 3, gain: 0.05, attack: 0.001, delay: i * 0.09 });
    }
  }

  paperRustle() {
    this._noise({ dur: 0.5, type: 'bandpass', freq: 2200, q: 1.5, gain: 0.06, attack: 0.03 });
  }

  ending() {
    const notes = [220, 261.6, 329.6, 220];
    notes.forEach((f, i) => {
      this._osc({ type: 'sine', f0: f, dur: 5, gain: 0.04, attack: 1.4, delay: i * 0.9 });
      this._osc({ type: 'triangle', f0: f * 2.01, dur: 5, gain: 0.012, attack: 1.4, delay: i * 0.9 });
    });
  }

  cry(pan = 0) {
    const r = mulberry32((Math.random() * 1e9) | 0);
    const pts = [];
    for (let t = 0; t <= 2.4; t += 0.2) pts.push([t, 520 + Math.sin(t * 5.2) * 60 + r() * 30]);
    this._osc({ type: 'sine', f0: 540, f1: 480, dur: 2.4, gain: 0.035, attack: 0.35, pan, curve: pts });
    this._noise({ dur: 2.4, type: 'bandpass', freq: 900, q: 5, gain: 0.012, attack: 0.3, pan });
  }

  childGiggle(pan = 0) {
    // a disturbingly bright little giggle, far away
    const r = mulberry32((Math.random() * 1e9) | 0);
    const pts = [];
    for (let t = 0; t <= 1.1; t += 0.1) pts.push([t, 720 + Math.sin(t * 9) * 90 + r() * 45]);
    this._osc({ type: 'sine', f0: 720, f1: 780, dur: 1.1, gain: 0.028, attack: 0.02, pan, curve: pts });
    this._osc({ type: 'sine', f0: 1440, f1: 1520, dur: 0.7, gain: 0.008, attack: 0.02, pan });
    this._noise({ dur: 0.8, type: 'bandpass', freq: 2400, q: 6, gain: 0.006, attack: 0.05, pan });
  }

  breath(pan = 0, dur = 3.2) {
    if (!this.ctx) return;
    const n = 2;
    for (let i = 0; i < n; i++) {
      this._noise({
        dur: dur / n, type: 'bandpass', freq: 300, freqEnd: 420, q: 2,
        gain: 0.07, attack: (dur / n) * 0.5, pan, delay: i * (dur / n),
      });
    }
  }

  knock(n = 3) {
    for (let i = 0; i < n; i++) {
      this._osc({ type: 'sine', f0: 90, f1: 50, dur: 0.18, gain: 0.22, attack: 0.002, delay: i * 0.34, pan: rand(-0.4, 0.4) });
      this._noise({ dur: 0.06, type: 'lowpass', freq: 400, gain: 0.1, attack: 0.001, delay: i * 0.34, pan: rand(-0.4, 0.4) });
    }
  }

  ceilingSteps() {
    for (let i = 0; i < 5; i++) {
      this._osc({ type: 'sine', f0: 60, f1: 38, dur: 0.16, gain: 0.12, attack: 0.004, delay: i * 0.42, pan: rand(-0.6, 0.6) });
    }
  }

  drip() {
    this._osc({ type: 'sine', f0: 1400, f1: 420, dur: 0.12, gain: 0.05, attack: 0.002 });
    this._noise({ dur: 0.04, type: 'bandpass', freq: 2200, q: 4, gain: 0.03, attack: 0.001, delay: 0.08 });
  }

  musicBox() {
    const seq = [659.25, 587.33, 493.88, 587.33, 659.25, 587.33, 493.88, 440.0];
    seq.forEach((f, i) => {
      this._osc({ type: 'sine', f0: f, dur: 1.2, gain: 0.038, attack: 0.004, delay: i * 0.42 });
      this._osc({ type: 'sine', f0: f * 2.003, dur: 1.2, gain: 0.008, attack: 0.004, delay: i * 0.42 });
    });
  }

  radio() {
    if (!this.ctx) return;
    this._noise({ dur: 0.5, type: 'bandpass', freq: 400, freqEnd: 1200, q: 8, gain: 0.08, attack: 0.02 });
    this._noise({ dur: 2.2, type: 'bandpass', freq: 700, q: 3, gain: 0.04, attack: 0.1, delay: 0.5, pan: rand(-0.5, 0.5) });
    const r = mulberry32((Math.random() * 1e9) | 0);
    for (let i = 0; i < 6; i++) {
      this._noise({ dur: 0.16, type: 'bandpass', freq: 300 + r() * 600, q: 10, gain: 0.05, attack: 0.02, delay: 0.7 + i * 0.22, pan: rand(-0.4, 0.4) });
    }
    this._noise({ dur: 0.3, type: 'bandpass', freq: 2000, freqEnd: 500, q: 5, gain: 0.05, attack: 0.01, delay: 2.4 });
  }

  scrape() {
    this._noise({ dur: 1.1, type: 'bandpass', freq: 1300, q: 8, gain: 0.045, attack: 0.08, hp: 300 });
    this._osc({ type: 'sawtooth', f0: 420, f1: 380, dur: 1.1, gain: 0.02, attack: 0.08 });
  }

  // a distant emergency siren somewhere across the flooded city - two
  // detuned carriers beating against each other, very slow swell, far away
  siren(pan = 0) {
    if (!this.ctx) return;
    for (let i = 0; i < 2; i++) {
      this._osc({ type: 'sine', f0: 660 + i * 4, f1: 875 + i * 4, dur: 3.0, gain: 0.011, attack: 1.4, pan, wet: 0.6 });
      this._osc({ type: 'sine', f0: 875 + i * 4, f1: 660 + i * 4, dur: 3.0, gain: 0.011, attack: 1.4, pan, wet: 0.6, delay: 3.1 });
    }
  }

  // water hammer: pipes knock inside the walls, three dull thuds descending
  hammer(pan = 0) {
    if (!this.ctx) return;
    for (let i = 0; i < 3; i++) {
      this._osc({ type: 'triangle', f0: 132 - i * 14, f1: 58, dur: 0.09, gain: 0.085, attack: 0.003, pan, delay: i * 0.19 });
      this._noise({ dur: 0.05, type: 'bandpass', freq: 2300, q: 3, gain: 0.018, attack: 0.002, pan, delay: i * 0.19 });
    }
  }

  // the washer down the hall starts a spin cycle nobody asked for
  washer(pan = 0) {
    if (!this.ctx) return;
    this._osc({ type: 'sawtooth', f0: 52, f1: 58, dur: 5.5, gain: 0.026, attack: 1.2, pan, wet: 0.5 });
    this._noise({ dur: 5.5, type: 'bandpass', freq: 320, q: 2, gain: 0.018, attack: 1.2, pan, wet: 0.5 });
    // unbalanced load thumps
    for (let i = 0; i < 9; i++) {
      this._osc({ type: 'sine', f0: 46, dur: 0.07, gain: 0.05, attack: 0.004, pan, delay: 1.4 + i * 0.42 });
    }
  }

  // a child's wind chime (fūrin) stirs - bright glass tones at irregular,
  // breathing intervals; too delicate for the rot in this building
  chime(pan = 0) {
    if (!this.ctx) return;
    const notes = [1975, 2349, 2637, 3136];
    const r = mulberry32((Math.random() * 1e9) | 0);
    let t = 0;
    const n = 3 + (r() * 3 | 0);
    for (let i = 0; i < n; i++) {
      const f = notes[(r() * notes.length) | 0];
      this._osc({ type: 'sine', f0: f, dur: 1.5, gain: 0.028, attack: 0.004, pan, delay: t, wet: 0.5 });
      this._osc({ type: 'sine', f0: f * 2.76, dur: 0.8, gain: 0.006, attack: 0.004, pan, delay: t, wet: 0.5 });
      t += 0.18 + r() * 0.85;
    }
  }

  duck() { // brief silence for scares
    if (this.master) {
      this.master.gain.setTargetAtTime(0.15, this.ctx.currentTime, 0.02);
      setTimeout(() => { if (this.master) this.master.gain.setTargetAtTime(0.85, this.ctx.currentTime, 0.2); }, 350);
    }
  }

  switchClick() {
    this._noise({ dur: 0.03, type: 'bandpass', freq: 2400, q: 3, gain: 0.07, attack: 0.001 });
    this._osc({ type: 'square', f0: 240, f1: 140, dur: 0.05, gain: 0.04, attack: 0.001 });
  }

  buzz() { // a fluorescent tube refusing to stay off
    this._osc({ type: 'sawtooth', f0: 118, f1: 124, dur: 0.5, gain: 0.035, attack: 0.02, wet: 0.2 });
    this._osc({ type: 'sawtooth', f0: 236, f1: 248, dur: 0.5, gain: 0.012, attack: 0.02, wet: 0.2 });
  }

  thunder(distance = 0.5) { // 0 near .. 1 far
    const d = clamp(distance, 0, 1);
    const delay = 0.1 + d * 0.4;
    const g = 0.5 - d * 0.32;
    // rolling crack: layered lowpass bursts, darker and longer when far
    this._noise({ dur: 0.5 + d * 1.6, type: 'lowpass', freq: 420 - d * 250, gain: g * 0.7, attack: 0.02 + d * 0.25, delay, wet: 0.6 });
    this._noise({ dur: 0.25, type: 'lowpass', freq: 900, gain: g * 0.5, attack: 0.004, delay: delay + 0.05 + d * 0.2, wet: 0.6 });
    this._osc({ type: 'sine', f0: 54, f1: 30, dur: 1.6 + d, gain: g * 0.5, attack: 0.05, delay, wet: 0.5 });
  }

  // ------------------------------------------------- generative score
  // A sparse, slow motif over the drone: minor triad tones with long swells,
  // scheduled from the game loop. Fear shortens the intervals and admits
  // dissonant notes; the chase layer adds a pounding ostinato.
  updateMusic(dt, fear, chase) {
    if (!this.ctx) return;
    if (chase && !this.chaseOn) { this.chaseOn = true; this.chasePulse = 0; this.chaseBar = 0; }
    if (!chase && this.chaseOn) this.chaseOn = false;

    // calm/dread layer
    this.musNext -= dt;
    if (this.musNext <= 0) {
      this.musNext = rand(9, 16) - fear * 6;
      const root = 110; // A2
      const scale = [1, 6 / 5, 4 / 3, 3 / 2, 8 / 5]; // minor-ish intervals
      let f = root * scale[(Math.random() * scale.length) | 0] * (Math.random() < 0.4 ? 2 : 1);
      this._osc({ type: 'sine', f0: f, dur: rand(4, 7), gain: 0.028 + fear * 0.02, attack: 1.6, wet: 0.85 });
      this._osc({ type: 'sine', f0: f * 2.002, dur: rand(4, 7), gain: 0.008 + fear * 0.006, attack: 2.2, wet: 0.85 });
      if (fear > 0.45 && Math.random() < 0.5) {
        // a dissonant minor-second shadow under high fear
        this._osc({ type: 'sine', f0: f * 16 / 15, dur: rand(3, 5), gain: 0.014, attack: 2.4, wet: 0.9 });
      }
      if (fear > 0.7 && Math.random() < 0.35) {
        this._osc({ type: 'sawtooth', f0: f / 2, dur: 3, gain: 0.008, attack: 1.2, wet: 0.9 });
      }
    }

    // chase layer: eighth-note low pulse + a stab cluster every bar
    if (this.chaseOn) {
      this.chasePulse -= dt;
      if (this.chasePulse <= 0) {
        this.chasePulse = 0.21;
        this._osc({ type: 'square', f0: this.chaseBar % 2 ? 58 : 55, dur: 0.1, gain: 0.05, attack: 0.002, wet: 0.15 });
      }
      this.chaseBar -= dt;
      if (this.chaseBar <= 0) {
        this.chaseBar = 1.68;
        for (const f of [220, 233.1, 311.1]) {
          this._osc({ type: 'sawtooth', f0: f * 0.985, f1: f * 0.94, dur: 1.4, gain: 0.016, attack: 0.03, wet: 0.7 });
        }
      }
    }
  }

  // full lullaby phrase for the child's room (softer and slower than musicBox)
  lullaby() {
    const seq = [659.25, 587.33, 493.88, 587.33, 659.25, 493.88, 440.0, 0, 493.88, 587.33, 659.25, 587.33, 493.88, 440.0];
    let t = 0;
    for (const f of seq) {
      if (f > 0) {
        this._osc({ type: 'sine', f0: f, dur: 1.4, gain: 0.026, attack: 0.008, delay: t, wet: 0.8 });
        this._osc({ type: 'sine', f0: f * 2.003, dur: 1.4, gain: 0.006, attack: 0.008, delay: t, wet: 0.8 });
      }
      t += 0.56;
    }
  }
}
