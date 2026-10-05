import { DOCUMENTS, INVENTORY_LABELS, CHAPTERS, SAVE_KEY } from './campaign.js';
import { WORLD_AREAS } from './campaign-world.js';

const $ = (id) => document.getElementById(id);
const puzzleDefinitions = {
  generator: {
    title: '地下旧区备用输出', description: '装回输出熔断器，按机房规程启动柴油机。',
    labels: ['供油', '预热', '接通输出'], values: [0, 1, 2],
    hint: '发电机房的规程：预热 → 供油 → 接通输出。熔断器在搬迁档案库的绿色维修盒。',
    complete: '柴油机起动了。旧区尽头的电台终于通电。',
  },
  radio: {
    title: '没有回应的频道', description: '四位调谐码。频道表留在电台旁边。',
    hint: '14.07 MHz，去掉小数点，输入 1407。需要先启动备用柴油机。',
    complete: '「请报地点与姓名。」这一次，你没有结束呼叫。',
  },
  develop: {
    title: '被抹去的全家福', description: '让底片经过四只药液托盘。桌上的规程记录着冲洗次序。',
    labels: ['显影', '定影', '停显', '水洗'], values: [0, 1, 2, 3], length: 4,
    hint: '暗房规程：显影 → 停显 → 定影 → 水洗。底片在 204，显影液在住户纪念室。',
    complete: '影像浮了出来。你牵着他的手。照片上从来都不是一个孩子。',
  },
  power: {
    title: '备用电源', description: '装入熔断器，再按检修卡的次序合闸。',
    labels: ['走廊照明', '住户电源', '排水泵'], values: [0, 1, 2],
    hint: '面板左起：走廊、住户、排水。启动次序：排水 → 走廊 → 住户。',
    complete: '备用电源启动。二楼的磁锁松开了。',
  },
  cabinet: {
    title: '档案柜', description: '四位数的密码。锁面上有一处尚未干透的水痕。',
    hint: '一楼佛间的剪报说，密码是停电时刻。02:17，输入 0217。',
    complete: '档案柜打开了。里面放着 203 放映室的钥匙。',
  },
  music: {
    title: '没唱完的歌', description: '四枚音片。让苍太熟悉的三个音符再次响起。',
    labels: ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ'], values: [1, 2, 3, 4],
    hint: '儿童房的画标出了三根线：3 → 1 → 4。',
    complete: '八音盒响了。夹层里藏着一张写给哥哥的纸条。',
  },
  valves: {
    title: '水闸', description: '顺序错误会让水压重新升高。听从录音里的声音。',
    labels: ['泄压', '回水', '排水'], values: [0, 1, 2],
    hint: '录音里说：先泄压，再排水，最后回水。',
    complete: '井底的门开了。背后传来了不属于你的脚步声。',
  },
};

export class InvestigationUI {
  constructor(game) {
    this.game = game;
    this.sequence = [];
    this.mapFloor = 0;
    this.mapZoom = 1;
    this.saved = null;
    try {
      const saved = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
      if (saved?.version === 2 && saved.flags?.invitation && !saved.flags?.ended) this.saved = saved;
    } catch {}
    $('continue-game').classList.toggle('hidden', !this.saved);
    $('continue-game').addEventListener('click', () => game._start(true));
    $('start-game').addEventListener('click', () => game._start(false));
    $('settings-title').addEventListener('click', () => this.openSettings());
    $('resume-game').addEventListener('click', () => this.closeSettings());
    $('checkpoint-retry').addEventListener('click', () => {
      game._wakeAtCheckpoint(); this.closeSettings();
    });
    $('journal-button').addEventListener('click', () => this.openJournal());
    $('journal-close').addEventListener('click', () => this.close());
    $('puzzle-close').addEventListener('click', () => this.close());
    $('puzzle-submit').addEventListener('click', () => this.submitPuzzle());
    $('puzzle-reset').addEventListener('click', () => {
      this.sequence = []; $('puzzle-code').value = ''; this.renderSequence();
    });
    $('recording-skip').addEventListener('click', () => this.finishRecording());
    $('puzzle-code').addEventListener('keydown', (event) => {
      event.stopPropagation();
      if (event.code === 'Escape') { event.preventDefault(); this.close(); return; }
      if (event.code === 'Enter') this.submitPuzzle();
    });
    $('puzzle-hint').addEventListener('click', () => {
      $('puzzle-status').textContent = puzzleDefinitions[this.puzzle].hint;
    });
    $('journal-hint').addEventListener('click', () => {
      $('journal-guidance').textContent = game.campaign.hint;
      $('journal-guidance').classList.toggle('hidden');
    });
    document.querySelectorAll('[data-journal-tab]').forEach((button) => {
      button.addEventListener('click', () => this.showJournalTab(button.dataset.journalTab));
    });
    document.querySelectorAll('[data-map-floor]').forEach((button) => {
      button.addEventListener('click', () => { this.mapFloor = Number(button.dataset.mapFloor); this.drawMap(); });
    });
    for (const [id, delta] of [['map-zoom-in', .25], ['map-zoom-out', -.25]]) $(id).addEventListener('click', () => {
      this.mapZoom = Math.max(1, Math.min(2.5, this.mapZoom + delta)); this.applyMapZoom();
    });
    $('map-zoom-reset').addEventListener('click', () => { this.mapZoom = 1; this.applyMapZoom(); });
    $('ending-remember').addEventListener('click', () => game._ending('remember'));
    $('ending-leave').addEventListener('click', () => game._ending('leave'));
    this.bindSettings();
  }

  bindSettings() {
    let settings = {};
    try { settings = JSON.parse(localStorage.getItem('echo_settings_v2') || '{}') || {}; } catch {}
    this.settings = {
      volume: Number.isFinite(settings.volume) ? Math.max(0, Math.min(100, settings.volume)) : 70,
      brightness: Number.isFinite(settings.brightness) ? Math.max(70, Math.min(150, settings.brightness)) : 100,
      reduced: settings.reduced === true,
    };
    const apply = () => {
      this.game.audio.setVolume(this.settings.volume / 100);
      this.game.grade.uniforms.uExposure.value = 1.38 * this.settings.brightness / 100;
      this.game.reduceEffects = this.settings.reduced;
      document.body.classList.toggle('reduced-effects', this.settings.reduced);
      try { localStorage.setItem('echo_settings_v2', JSON.stringify(this.settings)); } catch {}
    };
    for (const name of ['volume', 'brightness']) {
      const input = $('setting-' + name);
      input.value = this.settings[name];
      $('value-' + name).textContent = this.settings[name] + '%';
      input.addEventListener('input', () => {
        this.settings[name] = Number(input.value);
        $('value-' + name).textContent = input.value + '%'; apply();
      });
    }
    $('setting-reduced').checked = this.settings.reduced;
    $('setting-reduced').addEventListener('change', (event) => {
      this.settings.reduced = event.target.checked; apply();
    });
    apply();
  }

  openSettings() {
    $('pause').classList.remove('hidden');
    $('pause-heading').textContent = this.game.state === 'title' ? '体验设置' : '暂停';
    $('resume-game').textContent = this.game.state === 'title' ? '返回' : '继续探索';
    $('checkpoint-retry').classList.toggle('hidden', this.game.state === 'title');
    this.game.audio.setPaused(true);
    this.game.keys = {};
    if (this.game.controls.isLocked) {
      this.game._skipUnlockPause = true;
      this.game.controls.unlock();
    }
  }

  closeSettings() {
    $('pause').classList.add('hidden');
    if (this.game.state === 'playing') this.game._tryLock();
    this.game.audio.setPaused(false);
  }

  open(panel) {
    if (this.game.state !== 'playing' || this.game.noteOpen) return false;
    this.game.noteOpen = true;
    this.panel = panel;
    this.game.keys = {};
    this.game.audio.setPaused(true);
    if (this.game._touchUI) this.game._touchUI.classList.add('hidden');
    if (this.game.controls.isLocked) {
      this.game._skipUnlockPause = true;
      this.game.controls.unlock();
    }
    $(panel).classList.remove('hidden');
    return true;
  }

  close() {
    if (!this.panel) return;
    $(this.panel).classList.add('hidden');
    this.panel = null;
    this.recording = null;
    document.activeElement?.blur();
    this.game.noteOpen = false;
    this.game.audio.setPaused(false);
    if (this.game._touchUI) this.game._touchUI.classList.remove('hidden');
    if (this.game.state === 'playing') this.game._tryLock();
  }

  openJournal(tab = 'evidence') {
    if (this.panel === 'journal') { this.close(); return; }
    if (!this.open('journal')) return;
    const campaign = this.game.campaign;
    $('journal-chapter').textContent = CHAPTERS[campaign.chapter].title;
    $('journal-objective').textContent = campaign.objective;
    const progress = $('journal-progress'); progress.replaceChildren();
    CHAPTERS.forEach((chapter, index) => {
      const step = document.createElement('li');
      step.textContent = String(index + 1).padStart(2, '0') + ' · ' + chapter.title;
      step.className = index < campaign.chapter ? 'complete' : index === campaign.chapter ? 'current' : '';
      progress.appendChild(step);
    });
    $('journal-guidance').classList.add('hidden');
    const inventory = $('inventory-list');
    inventory.replaceChildren();
    for (const id of campaign.items) {
      const item = document.createElement('span');
      item.textContent = INVENTORY_LABELS[id]; inventory.appendChild(item);
    }
    if (!campaign.items.size) inventory.textContent = '还没有找到随身物品。';
    const list = $('evidence-list');
    list.replaceChildren();
    for (const id of campaign.documents) {
      const note = DOCUMENTS[id];
      const button = document.createElement('button');
      button.className = 'evidence-entry';
      const title = document.createElement('strong'); title.textContent = note.title;
      const place = document.createElement('span'); place.textContent = note.location;
      button.append(title, place);
      button.addEventListener('click', () => this.renderDocument(id));
      list.appendChild(button);
    }
    if (!campaign.documents.size) list.textContent = '调查纸张、报纸与录音，会将记录保存在这里。';
    const first = [...campaign.documents].at(-1);
    if (first) this.renderDocument(first);
    else { $('evidence-title').textContent = '还没有记录'; $('evidence-content').textContent = '从大厅值班台上的那封信开始。'; }
    this.mapFloor = this.game.playerPos.y < -0.8 ? -1 : this.game.playerPos.y > 4.8 ? 2 : this.game.playerPos.y > 2 ? 1 : 0;
    this.showJournalTab(tab);
    $('journal-close').focus();
  }

  renderDocument(id) {
    const note = DOCUMENTS[id];
    $('evidence-title').textContent = note.title;
    $('evidence-location').textContent = note.location;
    $('evidence-content').textContent = note.cn;
    this.renderPhoto('evidence-photo', id);
    document.querySelectorAll('.evidence-entry').forEach((button) =>
      button.classList.toggle('selected', button.querySelector('strong')?.textContent === note.title));
  }

  renderPhoto(elementId, id) {
    const canvas = $(elementId);
    const visible = String(id) === '14'; canvas.classList.toggle('hidden', !visible);
    if (visible) {
      const image = this.game.level.campaign.photo.material.map.image;
      canvas.width = image.width; canvas.height = image.height;
      canvas.getContext('2d').drawImage(image, 0, 0);
    }
  }

  showJournalTab(tab) {
    $('journal').dataset.tab = tab;
    $('journal-evidence').classList.toggle('hidden', tab !== 'evidence');
    $('journal-map').classList.toggle('hidden', tab !== 'map');
    document.querySelectorAll('[data-journal-tab]').forEach((button) =>
      button.classList.toggle('selected', button.dataset.journalTab === tab));
    if (tab === 'map') this.drawMap();
  }

  drawMap() {
    const canvas = $('map-canvas');
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    const floor = this.mapFloor;
    const areas = WORLD_AREAS.filter((area) => area.floor === floor);
    const xMin = Math.min(...areas.map((area) => area.bounds[0])) - 2;
    const xMax = Math.max(...areas.map((area) => area.bounds[2])) + 2;
    const zMin = Math.min(...areas.map((area) => area.bounds[1])) - 3;
    const zMax = Math.max(...areas.map((area) => area.bounds[3])) + 3;
    const scale = Math.min((W - 80) / (zMax - zMin), (H - 80) / (xMax - xMin));
    const px = (z) => W / 2 + (z - (zMax + zMin) / 2) * scale;
    const py = (x) => H / 2 + (x - (xMax + xMin) / 2) * scale;
    ctx.lineWidth = 1.5;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    for (const area of areas) {
      const [x0, z0, x1, z1] = area.bounds;
      ctx.fillStyle = 'rgba(129,153,138,.08)'; ctx.strokeStyle = '#81938a';
      ctx.fillRect(px(z0), py(x0), (z1 - z0) * scale, (x1 - x0) * scale);
      ctx.strokeRect(px(z0), py(x0), (z1 - z0) * scale, (x1 - x0) * scale);
      ctx.fillStyle = '#ced4c7';
      const rw=(z1-z0)*scale, rh=(x1-x0)*scale;
      ctx.save(); ctx.translate(px((z0+z1)/2),py((x0+x1)/2));
      const vertical=rw<60&&rh>rw*2;
      if(vertical)ctx.rotate(-Math.PI/2);
      const labelWidth=(vertical?rh:rw)-12;
      let size=Math.min(16,Math.max(10,(vertical?rw:rh)*.65));
      ctx.font=size+'px "Songti SC", serif';
      let lines=[area.name];
      if(ctx.measureText(area.name).width>labelWidth&&rh>40&&!vertical) {
        const parts=area.name.replace('摄影师旧居','摄影师\n旧居').replace('204 ','204\n').split('\n');
        lines=parts.length>1?parts:[area.name.slice(0,4),area.name.slice(4)];
      }
      while(size>9&&lines.some(line=>ctx.measureText(line).width>labelWidth)) {
        size--; ctx.font=size+'px "Songti SC", serif';
      }
      lines.forEach((line,i)=>ctx.fillText(line,0,(i-(lines.length-1)/2)*(size+5)));
      ctx.restore();
    }
    const position = this.game.playerPos;
    const playerFloor = position.y < -0.8 ? -1 : position.y > 4.8 ? 2 : position.y > 2 ? 1 : 0;
    if (playerFloor === floor) {
      ctx.fillStyle = '#ca8b63'; ctx.beginPath();
      ctx.arc(px(position.z), py(position.x), 6, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#ca8b63'; ctx.beginPath();
      ctx.moveTo(px(position.z), py(position.x));
      ctx.lineTo(px(position.z) - Math.cos(this.game.camera.rotation.y) * 18,
        py(position.x) - Math.sin(this.game.camera.rotation.y) * 18); ctx.stroke();
    }
    $('map-caption').textContent = '住户旧平面图 · 橙色标记是你的位置 · 主楼梯连接一楼、二楼和屋顶；维修楼梯通往地下';
    document.querySelectorAll('[data-map-floor]').forEach((button) =>
      button.classList.toggle('selected', Number(button.dataset.mapFloor) === floor));
    this.applyMapZoom();
  }

  applyMapZoom() {
    $('map-canvas').style.width = (this.mapZoom * 100) + '%';
    $('map-zoom-reset').textContent = Math.round(this.mapZoom * 100) + '%';
    $('map-zoom-out').disabled = this.mapZoom === 1;
    $('map-zoom-in').disabled = this.mapZoom === 2.5;
  }

  openPuzzle(id) {
    if (id === 'tape') {
      if (this.game.campaign.flags.tapePlayed) { this.game._readNote(5); return; }
      const result = this.game.campaign.perform('tape');
      if (!result.ok) { this.game._sub(result.message); return; }
      this.game._campaignAdvanced('tape');
      this.openRecording();
      return;
    }
    const completed = { power: 'power', cabinet: 'cabinet', music: 'memory', valves: 'released', develop: 'photo' };
    if (this.game.campaign.flags[completed[id]]) {
      this.game._sub('这里已经调查过了。记录保存在调查手册里。'); return;
    }
    if (!this.open('puzzle')) return;
    this.puzzle = id;
    this.sequence = [];
    const definition = puzzleDefinitions[id];
    $('puzzle-title').textContent = definition.title;
    $('puzzle-description').textContent = definition.description;
    $('puzzle-status').textContent = '';
    $('puzzle-code').value = '';
    const coded = ['cabinet', 'radio'].includes(id);
    $('puzzle-code').classList.toggle('hidden', !coded);
    $('puzzle-keypad').classList.toggle('hidden', !coded);
    $('puzzle-sequence').classList.toggle('hidden', coded);
    const buttons = $('puzzle-controls');
    buttons.replaceChildren();
    definition.labels?.forEach((label, index) => {
      const button = document.createElement('button');
      button.className = 'puzzle-control';
      button.textContent = label;
      button.addEventListener('click', () => {
        if (this.sequence.length >= (definition.length || 3)) this.sequence = [];
        this.sequence.push(definition.values[index]);
        if (id === 'music') this.game.audio.puzzleTone(definition.values[index]);
        else this.game.audio.switchClick();
        this.renderSequence();
      });
      buttons.appendChild(button);
    });
    const keypad = $('puzzle-keypad');
    keypad.replaceChildren();
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '清除', '0', '退格'].forEach((digit) => {
      const button = document.createElement('button');
      button.textContent = digit;
      button.addEventListener('click', () => {
        const input = $('puzzle-code');
        if (digit === '清除') input.value = '';
        else if (digit === '退格') input.value = input.value.slice(0, -1);
        else if (input.value.length < 4) input.value += digit;
      });
      keypad.appendChild(button);
    });
    this.renderSequence();
    if (coded) $('puzzle-code').focus();
    else $('puzzle-close').focus();
  }

  openRecording() {
    if (!this.open('recording')) return;
    this.game.audio.setPaused(false);
    this.recording = { elapsed:0, beat:0, duration:32 };
    $('recording-line').textContent='［磁带开始转动。雨声。］';
    $('recording-time').textContent='00:00 / 00:32'; $('recording-progress').style.width='0%';
    $('recording-skip').focus();
  }

  update(dt) {
    const recording=this.recording;
    if(this.panel!=='recording'||!recording||!$('pause').classList.contains('hidden'))return;
    recording.elapsed+=dt;
    const beats=[
      [2,'「哥哥，你会来接我吗？」','whisper'],
      [6,'「歌响了就出来，别让妈妈发现。」','musicBox'],
      [10,'［开门声。电流中断。］','doorClose'],
      [13,'「哥哥？我看不见了。」','cry'],
      [18,'［沉默。随后，一个成年男人的声音。］','breath'],
      [22,'「先泄压，再排水，最后回水。」','hammer'],
      [26,'「别再把那扇门封起来了。」','whisper'],
      [29,'［最后传来三枚八音盒的音符。］','musicBox'],
    ];
    while(recording.beat<beats.length&&recording.elapsed>=beats[recording.beat][0]) {
      const [,text,sound]=beats[recording.beat++];$('recording-line').textContent=text;this.game.audio[sound]?.();
    }
    $('recording-time').textContent='00:'+String(Math.min(32,Math.floor(recording.elapsed))).padStart(2,'0')+' / 00:32';
    $('recording-progress').style.width=Math.min(100,recording.elapsed/recording.duration*100)+'%';
    if(recording.elapsed>=recording.duration)this.finishRecording();
  }

  finishRecording() {
    if(this.panel!=='recording')return;
    this.close();this.game._readNote(5);
  }

  renderSequence() {
    const definition = puzzleDefinitions[this.puzzle];
    $('puzzle-sequence').textContent = this.sequence.length
      ? this.sequence.map((value) => definition.labels[definition.values.indexOf(value)]).join(' → ')
      : '等待操作';
  }

  submitPuzzle() {
    const id = this.puzzle;
    const input = ['cabinet', 'radio'].includes(id) ? $('puzzle-code').value.trim() : this.sequence;
    const result = this.game.campaign.perform(id, input);
    if (!result.ok) {
      $('puzzle-status').textContent = result.message;
      this.sequence = []; this.renderSequence(); this.game.audio.switchClick();
      return;
    }
    this.close();
    this.game._campaignAdvanced(id);
    this.game._sub(puzzleDefinitions[id].complete, '', 5);
    if (id === 'music') this.game._readNote(7);
    if (id === 'develop') this.game._readNote(14);
    if (id === 'radio') this.game._readNote(23);
  }

  chooseEnding() {
    if (this.panel || this.game.state !== 'playing') return;
    if (!this.open('ending-choice')) return;
    const knows = this.game.campaign.documents.has('6');
    $('ending-remember').disabled = !knows;
    $('ending-choice-hint').textContent = knows
      ? '你终于记得自己的弟弟。门外的天还没有亮。'
      : '你还不知道完整的真相。203 放映室里有一封未寄出的认领书。';
    $('ending-return').onclick = () => this.close();
    $('ending-return').focus();
  }
}
