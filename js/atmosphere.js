import * as THREE from '../vendor/three.module.js';
import { interactionBlocked } from './interaction.js';
import { currentArea } from './campaign-world.js';

// 演出使用游玩时间；调查和暂停不消耗倒计时，已发生的事件随存档保留。
export class AtmosphereDirector {
  constructor(game) {
    this.game = game; this.acousticTimer = 0; this.areaTime = 0; this.lastArea = ''; this.cooldown = 0;
    this.look = new THREE.Vector3(); this.source = new THREE.Vector3();
  }
  once(id, action) {
    const campaign = this.game.campaign;
    if (campaign.events.has(id)) return;
    campaign.events.add(id); action(); this.game._refreshCampaign(); this.cooldown = 10;
  }
  update(dt) {
    const g = this.game, p = g.playerPos, area = currentArea(p);
    this.cooldown = Math.max(0, this.cooldown - dt);
    if (area !== this.lastArea) { this.lastArea = area; this.areaTime = 0; }
    this.areaTime += dt; this.acousticTimer -= dt;
    if (this.acousticTimer <= 0) {
      this.acousticTimer = .12; g.camera.getWorldDirection(this.look);
      for (const source of g.audio.environment || []) if (source.campaignFlag)
        source.enabled = !!g.campaign.flags[source.campaignFlag];
      g.audio.updateEnvironment(g.camera.position, this.look, point => {
        // 发声设备自身的外壳不算墙体遮挡；墙与关闭的门仍使声音变闷。
        const blockers=g.level.colliders.filter(c=>!(point.x>=c.x0&&point.x<=c.x1&&point.y>=c.y0&&point.y<=c.y1&&point.z>=c.z0&&point.z<=c.z1));
        return interactionBlocked(g.camera.position,this.source.set(point.x,point.y,point.z),blockers,g.level.doors);
      });
    }
    for (const rec of g.level.campaign.dynamics) if (rec.kind === 'print')
      rec.mesh.rotation.y = Math.sin(g.campaign.elapsed * .7 + rec.phase) * .035;
    if (g.campaign.flags.generator && g.level.campaign.generatorRotor)
      g.level.campaign.generatorRotor.rotation.x += dt * 5;
    if (this.areaTime < 1.2 || this.cooldown > 0 || g.monster.state === 'chase') return;
    if (area === '地下旧区连廊') {
      this.once('annex-arrival', () => { g.audio.hammer(.5); g._sub('另一侧的门不是出口。这里藏着那一夜没有发出的求救。', '', 5); g._setFear(.45); });
    } else if (area === '地下值班站') {
      this.once('watch-arrival', () => { g.audio.knock(3); g._sub('交班日志最后一栏，写着「管道水锤」。', '', 4); });
    } else if (area === '旧蓄水池') {
      this.once('cistern-arrival', () => {
        g.audio.duck(); g.audio.lullaby(); g._sub('每一道刻线，都是他等你来找的一轮数数。', '', 5);
        g.ghost.appearAt(29, -2.8, 61, Math.PI / 2); g._setFear(.5);
      });
    } else if (area === '应急电台室' && !g.campaign.flags.relay) {
      this.once('radio-arrival', () => { g.audio.buzz(); g._sub('电台旁的纸条写着：不要因为没有回应，就结束呼叫。', '', 5); });
    } else if (area === '西翼封闭走廊' && g.campaign.flags.memory) {
      this.once('west-arrival', () => {
        g.audio.cameraShutter(-.5); g._sub('这条走廊……原来一直在这里。红灯还亮着。', '', 5);
        g._setFear(Math.max(.4, g.fear));
        g.storyEvents.push({ delay: 6, action: () => { g.audio.knock(3); g._sub('有人在暗房里，等照片干透。', '', 4); } });
      });
    } else if (area === '红灯暗房' && !g.campaign.flags.photo) {
      this.once('darkroom-arrival', () => {
        g.audio.breath(.75, 3); g._sub('空气里有药水的味道。四只托盘，最后一只盛着清水。', '', 5);
        g.storyEvents.push({ delay: 7, action: () => {
          if (currentArea(g.playerPos) !== '红灯暗房') return;
          g.audio.cameraShutter(.7); g._sub('身后响了一声快门。这里没有第二台相机。', '', 4);
          g._setFear(Math.max(.55, g.fear));
        } });
      });
    } else if (area === '住户纪念室') {
      this.once('memorial-arrival', () => { g.audio.duck(); g._setFear(.2); g._sub('四把椅子。四个人。为什么名簿里只剩下三行？', '', 5); });
    } else if (area === '屋顶晾晒场' && g.campaign.flags.photo) {
      this.once('roof-recalled', () => { g.audio.lullaby(); g._sub('就是这里。母亲收着床单，弟弟牵着你的手。', '', 5); g._setFear(.12); });
    } else if (area === '地下配电间' && g.campaign.flags.photo && !g.campaign.flags.released) {
      this.once('basement-return', () => { g.audio.knock(3); g._sub('「哥哥，这一次，真的把门打开。」', '', 5); g._setFear(.6); });
    }
  }
}
