import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {InvestigationUI} from './js/investigation.js';
function setup(raw=null){
 const elements=new Map(),classes=new Set();let saved=raw;
 const get=id=>{if(!elements.has(id))elements.set(id,{value:'',textContent:'',checked:false,listeners:{},addEventListener(type,fn){this.listeners[type]=fn;},fire(type){this.listeners[type]?.({target:this});}});return elements.get(id);};
 globalThis.document={getElementById:get,body:{classList:{toggle(k,v){v?classes.add(k):classes.delete(k);}}}};
 globalThis.localStorage={getItem:()=>saved,setItem:(k,v)=>{assert.equal(k,'echo_settings_v2');saved=v;}};
 const game={audio:{setVolume(v){this.volume=v;}},grade:{uniforms:{uExposure:{value:0}}}};
 const ui=Object.assign(Object.create(InvestigationUI.prototype),{game});ui.bindSettings();return{ui,game,get,saved:()=>saved};
}
test('normal default stays100%, while old saved brightness remains unchanged',()=>{
 for(const [raw,expected] of [[null,100],['broken',100],['null',100],[JSON.stringify({brightness:135,volume:42,reduced:true}),135]]){
  const{ui,game}=setup(raw);assert.equal(ui.settings.brightness,expected);assert.equal(game.grade.uniforms.uExposure.value,1.38*expected/100);
 }
});
test('500% testing brightness persists, reloads and labels the extended range',()=>{
 const f=setup();f.get('setting-brightness').value='500';f.get('setting-brightness').fire('input');
 assert.equal(f.ui.settings.brightness,500);assert.equal(f.game.grade.uniforms.uExposure.value,6.9);assert.match(f.get('value-brightness').textContent,/测试增亮/);
 const reloaded=setup(f.saved());assert.equal(reloaded.get('setting-brightness').value,500);assert.equal(reloaded.ui.settings.brightness,500);
});
test('repeated native input/change events clamp endpoints and reject invalid values',()=>{
 const f=setup();for(const type of ['input','change'])for(const [value,expected] of [['70',70],['151',151],['500',500],['900',500],['-20',70],['NaN',100],['100',100]]){
  f.get('setting-brightness').value=value;f.get('setting-brightness').fire(type);assert.equal(f.ui.settings.brightness,expected);assert.equal(JSON.parse(f.saved()).brightness,expected);
 }
 assert.equal(f.get('value-brightness').textContent,'100%');
});
test('brightness reset is repeatable and preserves audio/reduced-effects settings',()=>{
 const f=setup(JSON.stringify({brightness:500,volume:31,reduced:true}));for(let i=0;i<3;i++)f.get('reset-brightness').fire('click');
 assert.equal(f.ui.settings.brightness,100);assert.equal(f.game.grade.uniforms.uExposure.value,1.38);assert.equal(f.ui.settings.volume,31);assert.equal(f.ui.settings.reduced,true);assert.equal(f.get('value-brightness').textContent,'100%');assert.equal(JSON.parse(f.saved()).brightness,100);
});
test('storage validation and accessible native slider match the runtime range',()=>{
 for(const [brightness,expected] of [[999,500],[-2,70],['500',100]])assert.equal(setup(JSON.stringify({brightness})).ui.settings.brightness,expected);
 const html=readFileSync(new URL('./index.html',import.meta.url),'utf8');assert.match(html,/id="setting-brightness" type="range" min="70" max="500" step="1" value="100" aria-describedby="brightness-help"/);assert.match(html,/id="reset-brightness" type="button"/);
});
