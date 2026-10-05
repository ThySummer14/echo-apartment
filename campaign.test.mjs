import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from './vendor/three.module.js';
import { Campaign, DOCUMENTS } from './js/campaign.js';
import { interactionBlocked } from './js/interaction.js';
import { AtmosphereDirector } from './js/atmosphere.js';

const powerOn = () => {
  const campaign = new Campaign();
  campaign.collectDocument('invitation');
  campaign.collectItem('fuse');
  assert.equal(campaign.perform('power', [2, 0, 1]).ok, true);
  return campaign;
};
const recovered = () => {
  const campaign = powerOn();
  campaign.collectDocument(2);
  assert.equal(campaign.perform('cabinet', '0217').ok, true);
  campaign.collectItem('tape');
  assert.equal(campaign.perform('tape').ok, true);
  campaign.collectDocument(3);
  assert.equal(campaign.perform('music', [3, 1, 4]).ok, true);
  campaign.collectItem('film'); campaign.collectItem('developer');
  assert.equal(campaign.perform('develop', [0, 2, 1, 3]).ok, true);
  return campaign;
};

const radioLinked = (campaign) => {
  campaign.collectItem('relayFuse');
  assert.equal(campaign.perform('generator', [1, 0, 2]).ok, true);
  campaign.collectDocument(27);
  assert.equal(campaign.perform('radio', '1407').ok, true);
  return campaign;
};

test('维修钥匙来自来信，物件重复调查不会重复计入记录', () => {
  const campaign = new Campaign();
  assert.match(campaign.objective, /信/);
  assert.equal(campaign.collectDocument('invitation'), true);
  assert.equal(campaign.collectDocument('invitation'), false);
  assert.equal(campaign.items.has('serviceKey'), true);
  assert.equal(campaign.documents.size, 1);
  assert.equal(campaign.collectDocument('missing'), false);
  assert.equal(campaign.collectItem('nonexistent'), false);
});

test('不能跳过电源、柜锁、录音、八音盒与排水的剧情前置', () => {
  const campaign = new Campaign();
  for (const [action, input] of [['power', [2, 0, 1]], ['cabinet', '0217'],
    ['tape', null], ['music', [3, 1, 4]], ['valves', [0, 2, 1]], ['ending', 'leave']])
    assert.equal(campaign.perform(action, input).ok, false, action);
  assert.equal(campaign.chapter, 0);
});

test('错误合闸不会消耗熔断器，正确维修只消耗一次', () => {
  const campaign = new Campaign();
  campaign.collectDocument('invitation');
  campaign.collectItem('fuse');
  assert.equal(campaign.perform('power', [0, 1, 2]).ok, false);
  assert.equal(campaign.items.has('fuse'), true);
  assert.equal(campaign.perform('power', [2, 0, 1]).ok, true);
  assert.equal(campaign.items.has('fuse'), false);
  assert.equal(campaign.perform('power', [2, 0, 1]).ok, false);
  assert.equal(campaign.chapter, 1);
});

test('档案柜必须接通电源，四位数密码保留开头的零', () => {
  const campaign = powerOn();
  assert.equal(campaign.perform('cabinet', 217).ok, false);
  assert.equal(campaign.perform('cabinet', '0218').ok, false);
  assert.equal(campaign.items.has('archiveKey'), false);
  assert.equal(campaign.perform('cabinet', '0217').ok, true);
  assert.equal(campaign.items.has('archiveKey'), true);
  assert.equal(campaign.chapter, 2);
});

test('录音必须有磁带与房间钥匙，转写作为可复查线索保存', () => {
  const campaign = powerOn();
  campaign.collectItem('tape');
  assert.equal(campaign.perform('tape').ok, false);
  campaign.perform('cabinet', '0217');
  assert.equal(campaign.perform('tape').ok, true);
  assert.equal(campaign.documents.has('5'), true);
  assert.match(DOCUMENTS[5].cn, /泄压.*排水.*回水/);
  assert.equal(campaign.perform('tape').ok, false);
});

test('八音盒接受完整旋律，错误音符不改变记忆状态', () => {
  const campaign = powerOn();
  campaign.perform('cabinet', '0217'); campaign.collectItem('tape'); campaign.perform('tape');
  for (const notes of [[], [3, 1], [1, 3, 4], [3, 1, 4, 2], ['3', '1', '4']])
    assert.equal(campaign.perform('music', notes).ok, false);
  assert.equal(campaign.perform('music', [3, 1, 4]).ok, true);
  assert.equal(campaign.documents.has('7'), true);
  assert.equal(campaign.chapter, 3);
});

test('水闸与出口门需要正确顺序，不靠收集三张纸条直接解锁', () => {
  const campaign = radioLinked(recovered());
  assert.equal(campaign.items.has('exitKey'), false);
  assert.equal(campaign.perform('valves', [0, 2, 1]).ok, false);
  campaign.collectItem('valveHandle');
  assert.equal(campaign.perform('valves', [0, 1, 2]).ok, false);
  assert.equal(campaign.perform('valves', [0, 2, 1]).ok, true);
  assert.equal(campaign.items.has('exitKey'), true);
  assert.equal(campaign.items.has('valveHandle'), false);
  assert.match(campaign.objective, /天井/);
});

test('完整真相是归来结局的前置，两个结局都可以完成', () => {
  const campaign = radioLinked(recovered());
  campaign.collectItem('valveHandle');
  campaign.perform('valves', [0, 2, 1]);
  assert.equal(campaign.perform('ending', 'remember').ok, false);
  campaign.collectDocument(6);
  assert.equal(campaign.perform('ending', 'remember').ok, true);
  assert.equal(campaign.ending, 'remember');
  const other = radioLinked(recovered()); other.collectItem('valveHandle'); other.perform('valves', [0, 2, 1]);
  assert.equal(other.perform('ending', 'leave').ok, true);
  assert.equal(other.ending, 'leave');
});

test('章节存档往返保留状态、线索、物品和安全出生点', () => {
  const campaign = recovered();
  campaign.collectItem('valveHandle');
  campaign.elapsed = 327.4;
  const snapshot = JSON.parse(JSON.stringify(campaign.snapshot()));
  const loaded = new Campaign(snapshot);
  assert.deepEqual(loaded.snapshot(), snapshot);
  assert.equal(loaded.chapter, 4);
  radioLinked(loaded);
  assert.equal(loaded.perform('valves', [0, 2, 1]).ok, true);
});

test('西翼物品与冲洗不能跳过记忆，错误冲洗保留底片和显影液', () => {
  const campaign = powerOn();
  assert.equal(campaign.collectItem('film'), false);
  assert.equal(campaign.collectItem('developer'), false);
  assert.equal(campaign.perform('develop', [0, 2, 1, 3]).ok, false);
  campaign.perform('cabinet', '0217'); campaign.collectItem('tape'); campaign.perform('tape');
  campaign.perform('music', [3, 1, 4]);
  assert.equal(campaign.items.has('westKey'), true);
  campaign.collectItem('film');
  assert.equal(campaign.perform('develop', [0, 2, 1, 3]).ok, false);
  campaign.collectItem('developer'); campaign.collectItem('valveHandle');
  assert.equal(campaign.perform('valves', [0, 2, 1]).ok, false);
  for (const input of [[], [0, 2, 1], [0, 1, 2, 3], ['0', '2', '1', '3']])
    assert.equal(campaign.perform('develop', input).ok, false);
  assert.equal(campaign.items.has('film'), true);
  assert.equal(campaign.items.has('developer'), true);
  assert.equal(campaign.perform('develop', [0, 2, 1, 3]).ok, true);
  assert.equal(campaign.chapter, 4);
  assert.equal(campaign.documents.has('14'), true);
  assert.equal(campaign.items.has('film'), false);
  assert.equal(campaign.items.has('developer'), false);
  assert.equal(campaign.collectItem('film'), false);
  assert.equal(campaign.perform('develop', [0, 2, 1, 3]).ok, false);
  assert.equal(campaign.perform('valves', [0, 2, 1]).ok, false);
  radioLinked(campaign);
  assert.equal(campaign.perform('valves', [0, 2, 1]).ok, true);
});

test('旧终章存档迁移，西翼检查点和演出记录持久化，伪造照片不能跳过排水前置', () => {
  const campaign = radioLinked(recovered()); campaign.collectItem('valveHandle'); campaign.perform('valves', [0, 2, 1]);
  const old = campaign.snapshot(); delete old.revision; delete old.flags.photo; old.documents = old.documents.filter(d => d !== '14');
  const migrated = new Campaign(old);
  assert.equal(migrated.flags.released, true); assert.equal(migrated.flags.photo, true);
  assert.equal(migrated.documents.has('14'), true);
  const partial = powerOn(); partial.perform('cabinet', '0217'); partial.collectItem('tape'); partial.perform('tape'); partial.perform('music', [3, 1, 4]);
  const early = partial.snapshot(); delete early.revision;
  assert.match(new Campaign(early).objective, /西翼/);
  campaign.events.add('west-arrival'); campaign.checkpoint = { x: -25, y: 2.8, z: 50.5 };
  assert.deepEqual(new Campaign(campaign.snapshot()).snapshot(), campaign.snapshot());
  const forged = campaign.snapshot(); forged.documents = forged.documents.filter(d => d !== '14');
  assert.equal(new Campaign(forged).flags.released, undefined);
});

test('坏存档、旧版本与不满足前置的状态不能跳过剧情', () => {
  for (const saved of [null, {}, { version: 1 }, { version: 2, items: null, documents: [] }])
    assert.equal(new Campaign(saved).chapter, 0);
  const corrupt = new Campaign({
    version: 2, flags: { power: true, memory: true, released: true },
    items: ['forged'], documents: ['unknown'],
    checkpoint: { x: Infinity, y: -2.8, z: 0 },
  });
  assert.equal(corrupt.flags.released, undefined);
  assert.equal(corrupt.items.size, 0);
  assert.deepEqual(corrupt.checkpoint, { x: 0, y: 0, z: -6.4 });
});

test('调查射线阻挡墙后的物件，同时允许目标本身的碰撞体', () => {
  const origin = new THREE.Vector3(0, 1.5, 0);
  const target = new THREE.Vector3(4, 1.5, 0.4);
  const wall = { x0: 2, x1: 2.2, y0: 0, y1: 3, z0: -2, z1: 2 };
  assert.equal(interactionBlocked(origin, target, [wall]), true);
  assert.equal(interactionBlocked(origin, new THREE.Vector3(1, 1.5, 0), [wall]), false);
  assert.equal(interactionBlocked(origin, target, [wall], [], wall), false);
});

test('调查射线同样尊重关闭的门，并使用目标方向而非视野中心', () => {
  const origin = new THREE.Vector3(0, 1.5, 0);
  const target = new THREE.Vector3(4, 1.5, 2);
  const collider = { x0: 2, x1: 2.2, y0: 0, y1: 3, z0: .8, z1: 1.4 };
  assert.equal(interactionBlocked(origin, target, [], [{ collider }]), true);
  assert.equal(interactionBlocked(origin, target, [], [{ collider: null }]), false);
});

test('西翼演出按区域触发一次，继续存档与返回区域不重复演出', () => {
  const campaign=recovered();let shutters=0,saves=0;
  const game={campaign,playerPos:new THREE.Vector3(-3,2.8,56),fear:.1,
    camera:new THREE.PerspectiveCamera(),level:{colliders:[],doors:[],campaign:{dynamics:[]}},
    audio:{updateEnvironment(){},cameraShutter(){shutters++;}},monster:{state:'dormant'},
    storyEvents:[],_sub(){},_setFear(value){this.fear=value;},_refreshCampaign(){saves++;}};
  const director=new AtmosphereDirector(game);
  director.update(.5);assert.equal(shutters,0);
  director.update(.8);assert.equal(shutters,1);assert.equal(saves,1);
  assert.equal(campaign.events.has('west-arrival'),true);
  game.campaign=new Campaign(campaign.snapshot());
  new AtmosphereDirector(game).update(2);
  assert.equal(shutters,1);assert.equal(saves,1);
});

test('旧区供电、呼叫和排水必须依次推进，错误操作不消耗熔断器', () => {
  const early = powerOn();
  assert.equal(early.collectItem('relayFuse'), false);
  assert.equal(early.perform('generator', [1, 0, 2]).ok, false);
  const campaign = recovered(); campaign.collectItem('valveHandle');
  assert.equal(campaign.items.has('annexKey'), true);
  assert.equal(campaign.perform('radio', '1407').ok, false);
  assert.equal(campaign.perform('valves', [0, 2, 1]).ok, false);
  assert.equal(campaign.perform('generator', [1, 0, 2]).ok, false);
  campaign.collectItem('relayFuse');
  assert.equal(campaign.perform('generator', [0, 1, 2]).ok, false);
  assert.equal(campaign.items.has('relayFuse'), true);
  assert.equal(campaign.perform('generator', [1, 0, 2]).ok, true);
  assert.equal(campaign.items.has('relayFuse'), false);
  assert.equal(campaign.collectItem('relayFuse'), false);
  assert.equal(campaign.perform('radio', '0147').ok, false);
  assert.equal(campaign.chapter, 4);
  campaign.collectDocument(27);
  assert.equal(campaign.perform('radio', '1407').ok, true);
  assert.equal(campaign.documents.has('23'), true);
  assert.equal(campaign.chapter, 5);
  assert.equal(campaign.perform('valves', [0, 2, 1]).ok, true);
});

test('3.0 未排水存档接入旧区，终章存档保留进度，4.0 不能伪造继电器', () => {
  const old = recovered().snapshot(); old.revision = 3;
  const partial = new Campaign(old);
  assert.match(partial.objective, /地下旧区/);
  assert.equal(partial.flags.relay, undefined);
  old.flags.released = true; old.items.push('exitKey');
  const migrated = new Campaign(old);
  assert.equal(migrated.flags.relay, true);
  assert.equal(migrated.flags.generator, true);
  assert.equal(migrated.flags.released, true);
  assert.equal(migrated.documents.has('23'), true);
  const forged = migrated.snapshot(); forged.documents = forged.documents.filter(d => d !== '23');
  assert.equal(new Campaign(forged).flags.released, undefined);
  const current = radioLinked(recovered());
  assert.deepEqual(new Campaign(current.snapshot()).snapshot(), current.snapshot());
});

test('社区记录解释救援取消并接入电台；旧存档保留已完成前置',()=>{
 const c=recovered();c.collectItem('relayFuse');c.perform('generator',[1,0,2]);
 assert.match(c.objective,/卫生站/);
 assert.equal(c.perform('radio','1407').ok,false);
 const old=c.snapshot();old.revision=4;
 assert.equal(new Campaign(old).documents.has('27'),true);
 assert.equal(new Campaign(c.snapshot()).documents.has('27'),false);
 c.collectDocument(27);
 assert.match(c.objective,/电台/);
 assert.equal(c.perform('radio','1407').ok,true);
 assert.equal(new Campaign(c.snapshot()).flags.relay,true);
});
