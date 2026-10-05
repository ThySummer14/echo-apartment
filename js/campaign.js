// 剧情规则独立于渲染、DOM 与音频；同一份状态驱动门、谜题和存档。
export const SAVE_KEY = 'echo_apartment_campaign_v2';
export const DOCUMENTS = {
  invitation: {
    title: '一封没有署名的信', location: '大厅 · 值班台', item: '失物招领函',
    cn: '致七月十四日离开的住户：\n\n您遗落的东西仍在三号室。\n请在拆除前来取。夜间入口已为您保留。\n\n信封里夹着地下维修间的钥匙。\n背面只有一句话：\n「哥哥，这次不要把我留在黑暗里。」\n\n我不记得自己住过这里。可这行字，我认得。',
  },
  1: {
    title: '管理人的夜间记录', location: '一楼 · 寝室', item: '调查记录 01',
    cn: '1998年7月14日\n\n02:17，地下排水泵短路。整栋楼断电。\n三号室的母亲来找我，说小儿子躲进了维修间。\n我拿了钥匙，却没有下去。\n\n那扇门后来再也打不开了。\n每次走到那里，里面都有人问我：\n「灯修好了吗？」\n\n拆楼之前，我必须把真相留下。',
  },
  2: {
    title: '被剪去一角的报纸', location: '一楼 · 佛间', item: '调查记录 02',
    cn: '回声公寓住户失踪案，仍无新进展\n\n7月14日凌晨，三号室发生事故。警方找到三名家属，七岁的次子苍太仍未寻获。\n唯一幸存的长子在医院醒来，无法回忆当晚经过。\n\n公寓管理人拒绝再次进入地下层。\n\n剪报边缘有一行铅笔字：\n「档案柜的密码，是停电的时刻。」\n\n墙上的钟永远停在 02:17。',
  },
  3: {
    title: '两个人的捉迷藏', location: '一楼 · 儿童房', item: '调查记录 03',
    cn: '画上有两个孩子。一人躲在门后，一人蒙住眼睛。\n\n「哥哥说，听见这首歌，就可以出来了。」\n\n八音盒旁画着四根不同高度的竖线。\n下方的圆圈依次标在：\n第三根、第一根、第四根。\n\n3 → 1 → 4\n\n最后一行被反复描过：\n「可是歌停了。他没有来找我。」',
  },
  4: {
    title: '断电检修卡', location: '地下 · 配电间', item: '维修记录',
    cn: '回声公寓 · 备用电源启动规程\n\n先更换熔断器，再依次合上三路开关。\n\n① 排水泵\n② 走廊照明\n③ 住户电源\n\n面板排列与启动顺序不同。不可同时合闸。\n来电后，二楼防火门会自动解除磁锁。\n\n请勿让儿童靠近排水井。',
  },
  5: {
    title: '录音带：七月十四日', location: '二楼 · 203 放映室', item: '录音转写',
    cn: '［雨声。一个孩子在数数。］\n\n「哥哥，你会来接我吗？」\n「歌响了就出来，别让妈妈发现。」\n\n［开门声。电流声中断。］\n\n「哥哥？我看不见了。」\n\n［很长的沉默。随后，一个成年男人的声音。］\n\n「水闸要先泄压，再排水，最后回水。\n别再把那扇门封起来了。」\n\n录音最后传来三枚八音盒的音符。',
  },
  6: {
    title: '未寄出的认领书', location: '二楼 · 203 放映室', item: '完整真相',
    cn: '我一直以为，那个在走廊里的高大人影是他。\n\n不是。\n那是我们不肯承认的事情。\n\n苍太在停电的地下层等了一整夜。我逃离了这里，告诉所有人自己什么也不记得。\n后来，每次有人叫我的名字，我都会听见那扇门里面的敲击声。\n\n我回来，不是为了取回失物。\n我是来带他回家的。\n\n认领人：三号室长子\n失物：一段被故意遗忘的记忆',
  },
  7: {
    title: '苍太写给哥哥的纸条', location: '一楼 · 八音盒夹层', item: '最后一封信',
    cn: '哥哥：\n\n我已经没有生气了。\n这里太黑，我只是想听见你叫我的名字。\n\n你说我没有出现在那张全家福里。可是，204 的叔叔还留着底片。\n八音盒下面的钥匙能打开二楼西翼。找回照片，看看你牵着的是谁的手。\n\n维修间的水还没有退。第三只阀门的手轮被管理员收进了一楼东翼维修室。\n把它装回去，先泄压，再排水，最后回水，井底的门就会松开。\n\n等天亮了，我们一起走。\n\n苍太',
  },
  8: {
    title: '二楼住户的目击记录', location: '二楼 · 201 管理室', item: '调查记录 04',
    cn: '7月15日\n\n昨晚停电后，我看见长子独自从楼梯下来。\n他浑身湿透，手里攥着一枚发条钥匙。\n我问他弟弟呢，他说：\n「我们没有在玩捉迷藏。」\n\n今天我才知道，那孩子没有回家。\n录音带留在 202 号室。\n档案柜钥匙被管理人锁在办公室里。\n\n有些人忘记，是为了活下去。\n有些地方记住，是为了让他们回来。',
  },
  9: {
    title: '未完成的维修工单', location: '一楼东翼 · 管理员维修室', item: '维修工单',
    cn: '7月13日\n\n排水阀手轮松动，暂时卸下，存于工具台。\n备用熔断器交给三号室母亲，放在厨房工具盒。\n\n7月14日，02:17\n\n故障时排水泵必须先于走廊与住户合闸。\n我知道这些。可那个孩子敲门的时候，我只想快点离开。\n\n［最后一栏空着，没有签字。］',
  },
  10: {
    title: '母亲留下的便条', location: '屋顶 · 晾晒场', item: '屋顶便条',
    cn: '给我的两个孩子：\n\n雨停了以后，把床单收到屋里。\n苍太又把自己的名字写在枕头里面，说这样睡着了也不会忘记。\n\n哥哥，如果他又藏起来了，记得去找他。\n不要光喊他的名字，要真的把门打开。\n\n［便条被压在晾衣夹下面，雨水已经洗掉了日期。］',
  },
  11: {
    title: '洗衣房的留言', location: '一楼东翼 · 公共洗衣房', item: '住户留言',
    cn: '14日夜间停止供水。\n请不要再把洗衣机里的水排进地下泵房。\n\n如果有人听见小孩在数数，请叫管理人来。\n他有维修门的钥匙。\n\n［通知上贴着一张更旧的纸条：\n「苍太的红外套不要烘干，我会回来取。」］',
  },
  12: {
    title: '104 住户日记', location: '一楼东翼 · 104 空屋', item: '住户日记',
    cn: '7月16日\n\n我准备搬走了。\n凌晨仍然有人从楼梯上下来，在维修门前停住。\n只要我看着他，他就不动。等我转过身，脚步又会跟上来。\n\n不要在它眼前躲进衣柜。先关上门，等脚步远了再出来。\n\n屋顶的灯还亮着。那位母亲以前总在那里晾两个孩子的衣服。',
  },
  13: {
    title: '暗房冲洗规程', location: '二楼西翼 · 暗房', item: '摄影师的手记',
    cn: '暗房只开红色安全灯。\n\n底片先浸入显影液，待轮廓出现后停显，随后定影，最后用清水洗净。\n\n显影 → 停显 → 定影 → 水洗\n\n显影液存放在北面的住户纪念室，不能用井里的水代替。\n\n那卷七月的胶片一直没有洗出来。我怕看见照片上的孩子。',
  },
  14: {
    title: '被抹去的全家福', location: '二楼西翼 · 暗房冲洗台', item: '找回的名字',
    cn: '1998年7月13日，屋顶。\n\n照片上的母亲正在收床单。父亲抱着一篮衣服。\n右边站着两个孩子。年长的那个牵着弟弟的手。\n\n背面是母亲的字：\n「苍太，七岁。哥哥，十二岁。一个也不能少。」\n\n水痕没有抹去他，是我把他从记忆里删掉了。\n\n相纸夹层里，留着地下旧区的钥匙。摄影师写道：\n「不要只把照片带走。旧区最里面的应急电台，还没有等到回应。」',
  },
  15: {
    title: '最后一册住户名簿', location: '二楼西翼 · 住户纪念室', item: '住户名簿',
    cn: '清场前的最后核对\n\n101：已迁出。\n104：钥匙归还。\n三号室：父亲、母亲、长子、次子。\n\n管理人划掉了最后一行，摄影师又把它补上。\n\n「失踪不等于从来没有存在。」\n\n纪念室里留下了四张椅子。一直没有人坐最后一张。',
  },
  16: {
    title: '204 摄影师的日记', location: '二楼西翼 · 204 摄影师旧居', item: '西翼日记',
    cn: '7月13日\n\n三号室请我在屋顶拍一张全家福。苍太坚持要牵着哥哥，说这样捉迷藏就不会走散。\n\n7月14日\n\n停电以后，我听见地下有人喊救命。管理人说，泵房里没人。\n我相信了。\n\n底片留在桌上的相机旁。显影液在纪念室里。请替我洗出那张照片。\n\n红灯亮着的时候，别急着回头。',
  },
  17: {
    title: '防水袋里的收据', location: '二楼西翼 · 住户纪念室', item: '事故前的凭据',
    cn: '回声公寓 · 排水设备检修\n\n7月12日：泵房门锁失效，雨季前应立即更换。\n7月13日：维修申请被退回，原因为「拆除在即，费用不予批准」。\n\n收据背面，四位住户共同签字。\n\n这不是一个孩子的错，也不是只有一个人知道的秘密。\n\n［防水袋上的标签写着：不要把证据也带进水里。］',
  },
  18: {
    title: '最后一次交班日志', location: '地下旧区 · 值班站', item: '夜班记录',
    cn: '7月14日，02:17\n\n停电。主泵断开，备用机未启动。\n走廊里有一个孩子说，哥哥在门外。\n\n02:31\n我听见敲击，记录成「管道水锤」。\n\n03:06\n救援频道没有人应答。不是他们没有来，是我们根本没有发出呼叫。\n\n［页边补记：输出熔断器放在搬迁档案库的绿色维修盒。先恢复柴油机，再去最里面的电台室。］',
  },
  19: {
    title: '备用柴油机启动规程', location: '地下旧区 · 发电机房', item: '启动规程',
    cn: '备用柴油发电机 · 人工启动\n\n装回输出熔断器后：\n\n① 预热\n② 供油\n③ 接通输出\n\n供油前必须预热，输出不得提前接通。\n\n备用输出只连接应急电台与远端泵房继电器。主楼来电不代表电台已经恢复。',
  },
  20: {
    title: '没有结清的搬迁总账', location: '地下旧区 · 搬迁档案库', item: '搬迁总账',
    cn: '三号室：四人。\n补偿人数：三人。\n\n一份事故记录被改成了设备故障。一份维修申请被压到了拆除清单下面。\n\n摄影师在封面上写：\n「如果所有人都说没有发生，那个孩子就会永远待在这里。」\n\n绿色维修盒里保存着旧区输出熔断器。请让那部电台重新通电。',
  },
  21: {
    title: '应急呼叫频道表', location: '地下旧区 · 应急电台室', item: '电台频道',
    cn: '夜间救援专用：14.07 MHz\n\n旧面板只接受四位数，去掉小数点，输入 1407。\n\n按住通话，先报地点，再报姓名。\n不要因为没有立刻听见回应，就结束呼叫。\n\n［手写字：回声公寓，地下层。苍太，七岁。还有人等着他回家。］',
  },
  22: {
    title: '蓄水池旁的刻字', location: '地下旧区 · 旧蓄水池', item: '孩子留下的标记',
    cn: '苍太，七岁。\n哥哥，十二岁。\n\n每一道刻线都是一轮数数。最后一道没有画完。\n\n刻字旁边写着：\n「只要歌还会响，哥哥就能找到我。」\n\n你终于明白，那些敲击从来不是想让人离开。',
  },
  23: {
    title: '终于发出的求救', location: '地下旧区 · 应急电台', item: '救援呼叫转写',
    cn: '［电流声。随后，对面有人回答。］\n\n「请报地点与姓名。」\n\n「回声公寓，地下层。苍太，七岁。」\n\n「收到。不要再把门关上。」\n\n你没有放开通话键。\n你把那个名字又说了一遍。\n\n远端泵房的继电器接通了。现在可以带手轮回到原排水间，泄压、排水、回水。\n这一次，不会再有人把敲门声写成故障。',
  },
  24: {
    title: '泵房门锁工单', location: '地下旧区 · 值班站', item: '未执行工单',
    cn: '泵房门锁：由内部不能打开。\n建议立即撤换，并在电台侧增加远程解锁继电器。\n\n验收栏一直空着。\n\n摄影师偷偷接好了继电器，却没有给备用电台通电。\n\n［最后的批注：需要先启动柴油机，再接通救援频道。机械手轮仍在一楼东翼维修室。］',
  },

};

export const CHAPTERS = [
  { title: '来信', subtitle: '有些失物，一直在等你。' },
  { title: '停电的那一夜', subtitle: '这栋楼记得你遗忘的事情。' },
  { title: '没有结束的捉迷藏', subtitle: '歌停之后，谁也没有来。' },
  { title: '照片里少了一个人', subtitle: '被抹去的名字，还留在底片上。' },
  { title: '井下的来电', subtitle: '那一夜没有发出的求救，终于有人回答。' },
  { title: '把名字带出去', subtitle: '这一次，别再独自离开。' },
];

const FLAG_NAMES = ['invitation', 'power', 'cabinet', 'tapePlayed', 'memory', 'photo', 'generator', 'relay', 'released', 'ended'];
const ITEM_NAMES = ['serviceKey', 'fuse', 'archiveKey', 'tape', 'valveHandle', 'exitKey', 'westKey', 'film', 'developer', 'annexKey', 'relayFuse'];
const docIds = Object.keys(DOCUMENTS);
const equalSequence = (input, expected) => Array.isArray(input) &&
  input.length === expected.length && input.every((value, index) => value === expected[index]);

export class Campaign {
  constructor(saved = null) {
    this.flags = {};
    this.items = new Set();
    this.documents = new Set();
    this.checkpoint = { x: 0, y: 0, z: -6.4 };
    this.elapsed = 0;
    this.events = new Set();
    if (saved) this.restore(saved);
  }

  get chapter() {
    if (this.flags.relay) return 5;
    if (this.flags.photo) return 4;
    if (this.flags.memory) return 3;
    if (this.flags.cabinet) return 2;
    if (this.flags.power) return 1;
    return 0;
  }

  get objective() {
    if (!this.flags.invitation) return '调查入口大厅值班台上没有署名的信';
    if (!this.items.has('fuse') && !this.flags.power) return '到一楼厨房寻找备用熔断器';
    if (!this.flags.power) return '从走廊维修门下楼，恢复地下备用电源';
    if (!this.flags.cabinet && !this.documents.has('2')) return '调查一楼佛间的旧报纸，寻找档案柜密码';
    if (!this.flags.cabinet) return '上二楼，在 201 管理室打开档案柜';
    if (!this.items.has('tape')) return '在二楼 202 号室取回录音带';
    if (!this.flags.tapePlayed) return '进入二楼 203 放映室，播放录音带';
    if (!this.flags.memory && !this.documents.has('3')) return '寻找一楼儿童房的画，辨认八音盒旋律';
    if (!this.flags.memory) return '回到一楼儿童房，让八音盒再次响起';
    if (!this.flags.photo && !this.items.has('film')) return '用八音盒里的钥匙打开二楼西翼，到 204 寻找底片';
    if (!this.flags.photo && !this.items.has('developer')) return '在西翼住户纪念室取回显影液';
    if (!this.flags.photo) return '到二楼西翼暗房，洗出三号室的全家福';
    if (!this.flags.generator && !this.items.has('relayFuse')) return '用相纸夹层的钥匙进入地下旧区，在搬迁档案库找输出熔断器';
    if (!this.flags.generator) return '到地下旧区发电机房，恢复电台备用输出';
    if (!this.flags.relay) return '到地下旧区最里面的电台室，接通救援频道';
    if (!this.flags.released && !this.items.has('valveHandle')) return '到一楼东翼维修室取回排水阀手轮';
    if (!this.flags.released) return '返回地下排水间，装回手轮并转开三只阀门';
    return '带着苍太的名字，前往二楼天井防火门';
  }

  get hint() {
    if (!this.flags.invitation) return '入口大厅左侧值班台上的信可以调查。按 E，或点击右侧调查按钮。';
    if (!this.flags.power) return this.items.has('fuse')
      ? '维修门在一楼长走廊右侧。配电箱旁的检修卡记录着合闸顺序。'
      : '厨房在玄关左侧第一扇门后。熔断器放在靠墙的工具盒里。';
    if (!this.flags.cabinet) return '佛间剪报提示用停电时刻作为密码；墙上的钟停在 02:17。';
    if (!this.flags.tapePlayed) return '202 在二楼走廊右侧，203 在左侧。需要档案柜里的钥匙。';
    if (!this.flags.memory) return '画上标出了第 3、第 1、第 4 根线。按这个顺序弹奏四个音。';
    if (!this.flags.photo) return '西翼入口在二楼靠近楼梯间的左侧。204 桌上有底片，北面的纪念室有显影液。暗房红灯旁记录着冲洗顺序。';
    if (!this.flags.generator) return '旧区入口在地下配电间最里面。输出熔断器在档案库绿色维修盒，柴油机按预热、供油、输出启动。';
    if (!this.flags.relay) return '电台在旧区尽头。频道表标明 14.07 MHz，去掉小数点，输入 1407。';
    if (!this.flags.released && !this.items.has('valveHandle')) return '东翼入口在一楼长走廊右侧。手轮留在管理员维修室的工具台上。';
    if (!this.flags.released) return '带手轮到地下排水间。录音记录着操作次序：泄压、排水、回水。';
    return '防火门在二楼走廊中段。保持电量；衣柜可以躲藏，但别在它眼前躲进去。';
  }

  collectDocument(id) {
    const key = String(id);
    if (!DOCUMENTS[key] || this.documents.has(key)) return false;
    this.documents.add(key);
    if (key === 'invitation') {
      this.flags.invitation = true;
      this.items.add('serviceKey');
    }
    return true;
  }

  collectItem(id) {
    if (!ITEM_NAMES.includes(id) || this.items.has(id)) return false;
    if (['westKey', 'film', 'developer'].includes(id) && !this.flags.memory) return false;
    if ((id === 'film' || id === 'developer') && this.flags.photo) return false;
    if (['annexKey', 'relayFuse'].includes(id) && !this.flags.photo) return false;
    if (id === 'relayFuse' && this.flags.generator) return false;
    this.items.add(id);
    return true;
  }

  perform(action, input) {
    const fail = (message) => ({ ok: false, message });
    if (action === 'power') {
      if (this.flags.power) return fail('备用电源已经接通。');
      if (!this.flags.invitation || !this.items.has('fuse')) return fail('熔断器烧断了。厨房应该有备用件。');
      if (!equalSequence(input, [2, 0, 1])) return fail('保护开关跳闸了。先启动排水，再启动走廊与住户电源。');
      this.flags.power = true;
      this.items.delete('fuse');
      this.checkpoint = { x: 13.2, y: -2.8, z: 20.5 };
    } else if (action === 'cabinet') {
      if (!this.flags.power) return fail('电子锁没有电。先恢复地下电源。');
      if (this.flags.cabinet) return fail('档案柜已经打开。');
      if (String(input) !== '0217') return fail('密码不对。剪报上说，是停电的时刻。');
      this.flags.cabinet = true;
      this.items.add('archiveKey');
      this.checkpoint = { x: -2.8, y: 2.8, z: 21.2 };
    } else if (action === 'tape') {
      if (!this.items.has('archiveKey')) return fail('需要管理室档案柜里的钥匙。');
      if (!this.items.has('tape')) return fail('没有录音带。202 号室里还留着一盘。');
      if (this.flags.tapePlayed) return fail('那一夜的录音已经收进调查手册。');
      this.flags.tapePlayed = true;
      this.collectDocument(5);
    } else if (action === 'music') {
      if (!this.flags.tapePlayed) return fail('发条卡住了。先找到并播放二楼的录音带。');
      if (this.flags.memory) return fail('八音盒的夹层已经打开。');
      if (!equalSequence(input, [3, 1, 4])) return fail('旋律不对。孩子的画里留下了三个音符。');
      this.flags.memory = true;
      this.items.add('westKey');
      this.collectDocument(7);
      this.checkpoint = { x: 2.8, y: 0, z: 10.7 };
    } else if (action === 'develop') {
      if (!this.flags.memory) return fail('还没有找到西翼的钥匙。先让八音盒响起来。');
      if (this.flags.photo) return fail('全家福已经洗出来了。');
      if (!this.items.has('film')) return fail('需要 204 摄影师旧居里的那卷底片。');
      if (!this.items.has('developer')) return fail('显影液用完了。北面的住户纪念室里有一瓶。');
      if (!equalSequence(input, [0, 2, 1, 3])) return fail('纸上的影像散开了。先显影，再停显、定影，最后水洗。');
      this.flags.photo = true;
      this.items.add('annexKey');
      this.items.delete('film'); this.items.delete('developer');
      this.collectDocument(14);
      this.checkpoint = { x: -25, y: 2.8, z: 50.5 };
    } else if (action === 'generator') {
      if (!this.flags.photo) return fail('地下旧区仍然锁着。先洗出全家福。');
      if (this.flags.generator) return fail('备用柴油机已经启动。');
      if (!this.items.has('relayFuse')) return fail('输出熔断器缺失。旧区档案库的绿色维修盒里有备件。');
      if (!equalSequence(input, [1, 0, 2])) return fail('柴油机没有起动。先预热，再供油，最后接通输出。');
      this.flags.generator = true; this.items.delete('relayFuse');
      this.checkpoint = { x: 31, y: -2.8, z: 40 };
    } else if (action === 'radio') {
      if (!this.flags.generator) return fail('电台没有电。先恢复旧区柴油机输出。');
      if (this.flags.relay) return fail('救援频道已经接通。转写收在调查手册中。');
      if (String(input) !== '1407') return fail('只有杂音。频道表标明了四位调谐码。');
      this.flags.relay = true; this.collectDocument(23);
      this.checkpoint = { x: 18, y: -2.8, z: 62.5 };
    } else if (action === 'valves') {
      if (!this.flags.memory) return fail('水闸封死了。似乎在等待有人记起什么。');
      if (!this.flags.photo) return fail('铁链仍然绷紧。先在西翼暗房找回照片里的名字。');
      if (!this.flags.relay) return fail('远端继电器没有接通。先到地下旧区启动柴油机，并通过电台发出求救。');
      if (this.flags.released) return fail('排水已经完成。天井的防火门可以打开了。');
      if (!this.items.has('valveHandle')) return fail('第三只阀门没有手轮。一楼东翼维修室的工具台上应该还留着它。');
      if (!equalSequence(input, [0, 2, 1])) return fail('水压没有下降。录音里的次序是泄压、排水、回水。');
      this.flags.released = true;
      this.items.delete('valveHandle');
      this.items.add('exitKey');
      this.checkpoint = { x: 13.2, y: -2.8, z: 20.5 };
    } else if (action === 'ending') {
      if (!this.flags.released) return fail('地下的门还没有松开。');
      if (!['remember', 'leave'].includes(input)) return fail('你还没有作出选择。');
      if (input === 'remember' && !this.documents.has('6')) return fail('你还不知道完整的真相。203 号室里有一封认领书。');
      this.flags.ended = true;
      this.ending = input;
    } else return fail('无法操作。');
    return { ok: true, chapter: this.chapter, action };
  }

  snapshot() {
    return {
      version: 2, flags: { ...this.flags }, items: [...this.items],
      documents: [...this.documents], checkpoint: { ...this.checkpoint },
      elapsed: Math.max(0, this.elapsed), ending: this.ending ?? null,
      revision: 4, events: [...this.events],
    };
  }

  restore(saved) {
    if (!saved || saved.version !== 2 || !Array.isArray(saved.items) || !Array.isArray(saved.documents)) return;
    for (const name of FLAG_NAMES) if (saved.flags?.[name] === true) this.flags[name] = true;
    this.items = new Set(saved.items.filter((item) => ITEM_NAMES.includes(item)));
    this.documents = new Set(saved.documents.map(String).filter((id) => docIds.includes(id)));
    // 损坏或旧的存档不能凭空跳过前置条件。
    if (!this.documents.has('invitation')) this.flags = {};
    else this.flags.invitation = true;
    if (!this.flags.power) for (const flag of ['cabinet', 'tapePlayed', 'memory', 'photo', 'released', 'ended']) delete this.flags[flag];
    if (!this.flags.cabinet) for (const flag of ['tapePlayed', 'memory', 'photo', 'released', 'ended']) delete this.flags[flag];
    if (!this.flags.tapePlayed) for (const flag of ['memory', 'photo', 'released', 'ended']) delete this.flags[flag];
    if (!this.flags.memory) for (const flag of ['photo', 'released', 'ended']) delete this.flags[flag];
    // 已到终章的旧存档补齐照片；尚未排水的旧存档自然接入西翼。
    if (this.flags.memory && this.flags.released && (saved.revision ?? 2) < 3) {
      this.flags.photo = true; this.documents.add('14');
    }
    if (!this.flags.photo || !this.documents.has('14')) {
      for (const flag of ['photo', 'generator', 'relay', 'released', 'ended']) delete this.flags[flag];
    }
    if (this.flags.photo && this.flags.released && (saved.revision ?? 2) < 4) {
      this.flags.generator = true; this.flags.relay = true; this.documents.add('23');
    }
    if (!this.flags.generator || !this.flags.relay || !this.documents.has('23')) {
      if (!this.flags.generator || !this.documents.has('23')) delete this.flags.relay;
      delete this.flags.released; delete this.flags.ended;
    }
    if (this.flags.photo) this.items.add('annexKey');
    else { this.items.delete('annexKey'); this.items.delete('relayFuse'); }
    if (this.flags.generator) this.items.delete('relayFuse');
    if (this.flags.memory) this.items.add('westKey');
    else for (const item of ['westKey', 'film', 'developer']) this.items.delete(item);
    if (this.flags.photo) { this.items.delete('film'); this.items.delete('developer'); }
    this.events = new Set(Array.isArray(saved.events) ? saved.events.filter(e => typeof e === 'string' && e.length < 48).slice(0, 32) : []);
    if (!this.flags.invitation) this.items.delete('serviceKey');
    if (!this.flags.cabinet) this.items.delete('archiveKey');
    if (!this.flags.released) this.items.delete('exitKey');
    if (this.flags.invitation) this.items.add('serviceKey');
    if (this.flags.cabinet) this.items.add('archiveKey');
    if (this.flags.released) this.items.add('exitKey');
    if (this.flags.tapePlayed) this.items.add('tape');
    if (Number.isFinite(saved.elapsed)) this.elapsed = Math.max(0, saved.elapsed);
    const point = saved.checkpoint;
    if (point && [point.x, point.y, point.z].every(Number.isFinite) &&
      point.x >= -30 && point.x <= 44 && point.z >= -9 && point.z <= 83 &&
      [-2.8, 0, 2.8, 5.6].includes(point.y)) this.checkpoint = { ...point };
    if (['remember', 'leave'].includes(saved.ending) && this.flags.ended) this.ending = saved.ending;
  }
}

export const INVENTORY_LABELS = {
  serviceKey: '地下维修间钥匙', fuse: '备用熔断器',
  valveHandle: '排水阀手轮', archiveKey: '203 放映室钥匙', tape: '七月十四日的录音带', exitKey: '防火门钥匙',
  westKey: '二楼西翼钥匙', film: '未冲洗的全家福底片', developer: '密封的显影液',
  annexKey: '地下旧区钥匙', relayFuse: '旧区输出熔断器',
};

export const ENDINGS = {
  remember: {
    title: '天亮之前', label: '结局 · 归来',
    text: '你第一次清楚地叫出了他的名字。\n「苍太，我们回家。」\n\n走廊里的脚步停了。\n那只冰冷的小手，终于握住了你的手。\n\n楼外仍然下着雨。\n可你记得，天亮的方向。',
  },
  leave: {
    title: '又一封来信', label: '结局 · 遗忘',
    text: '你推开了门，没有再回头。\n\n三个月后，一封没有署名的信被塞进你家的信箱。\n\n「您遗落的东西仍在三号室。」\n\n信封里，是一枚还在缓慢转动的八音盒发条。\n从门外传来三个音符。',
  },
};
