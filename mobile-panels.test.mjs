import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {bindPanelTouch,bindTouchButton,scrollPanels,rangeTouchValue} from './js/mobile-panels.js';
import {InvestigationUI} from './js/investigation.js';
import {Campaign} from './js/campaign.js';
class Element{
 constructor(tag='div'){this.tagName=tag.toUpperCase();this.dataset={};this.children=[];this.listeners={};this.value='';this.style={};this.scrollTop=0;this.scrollLeft=0;this.scrollHeight=this.clientHeight=100;this.scrollWidth=this.clientWidth=200;this.rect={left:0,top:0,width:200,height:100,right:200,bottom:100};const s=new Set();this.classList={add:x=>s.add(x),remove:x=>s.delete(x),contains:x=>s.has(x),toggle(x,on){on?s.add(x):s.delete(x);}};}
 addEventListener(type,fn,options){(this.listeners[type]??=[]).push({fn,capture:options===true||options?.capture});}
 appendChild(n){n.parentElement=this;this.children.push(n);return n;}append(...ns){ns.forEach(n=>this.appendChild(n));}replaceChildren(){this.children=[];}
 closest(selector){if(selector==='input[type="range"]'&&this.tagName==='INPUT'&&this.type==='range')return this;return this.parentElement?.closest(selector)||null;}
 getBoundingClientRect(){return this.rect;}focus(){document.activeElement=this;}blur(){document.activeElement=null;}
 dispatchEvent(e){Object.defineProperty(e,'target',{value:this,configurable:true});for(const{fn}of this.listeners[e.type]||[])fn(e);return true;}
 emit(type,data={}){const e={type,target:this,detail:1,defaultPrevented:false,stopped:false,preventDefault(){this.defaultPrevented=true;},stopPropagation(){this.stopped=true;},stopImmediatePropagation(){this.stopped=true;},...data};const chain=[];for(let n=this;n;n=n.parentElement)chain.push(n);for(const n of [...chain].reverse())for(const l of n.listeners[type]||[])if(l.capture&&!e.stopped)l.fn(e);for(const n of chain)for(const l of n.listeners[type]||[])if(!l.capture&&!e.stopped)l.fn(e);return e;}
}
const touch=(x,y,id=1)=>({clientX:x,clientY:y,identifier:id});
const event=(el,type,t,touches=type==='touchend'?[]:[t])=>el.emit(type,{changedTouches:[t],touches});
function setup(rotated=false){
 const map=new Map(),get=id=>{if(!map.has(id))map.set(id,new Element(id.startsWith('setting-')||id==='puzzle-code'?'input':'div'));return map.get(id);};
 const roots=['puzzle','pause','journal','recording','ending-choice','note','end'].map(id=>get(id));roots.forEach(r=>r.classList.add('hidden'));
 const pane=get('puzzle-scroll');pane.clientHeight=180;pane.scrollHeight=900;get('puzzle').appendChild(pane);
 for(const id of ['puzzle-code','puzzle-keypad','puzzle-controls','puzzle-sequence','puzzle-status'])pane.appendChild(get(id));
 for(const id of ['puzzle-close','puzzle-submit','puzzle-reset','puzzle-hint'])get('puzzle').appendChild(get(id));
 const up=new Element('button'),down=new Element('button');up.dataset.puzzleScroll='-1';down.dataset.puzzleScroll='1';
 globalThis.document={activeElement:null,hidden:false,body:new Element('body'),getElementById:get,createElement:t=>new Element(t),querySelectorAll:s=>s==='[data-puzzle-scroll]'?[up,down]:s==='.modal, #note, #end'?roots:[]};
 globalThis.window={__forcedLandscape:()=>rotated};globalThis.localStorage={getItem:()=>null,setItem(){}};
 const campaign=new Campaign(),game={campaign,touchMode:true,state:'playing',noteOpen:false,controls:{isLocked:false},grade:{uniforms:{uExposure:{value:1.38}}},audio:{setVolume(){},setPaused(){},switchClick(){},puzzleTone(){}},_clearMovementInput(){},_tryLock(){},_sub(){},_readNote(){},_campaignAdvanced(){}};
 const ui=new InvestigationUI(game);return{ui,game,get,pane,up,down};
}
function tap(button){event(button,'touchstart',touch(30,30));event(button,'touchend',touch(30,30));button.emit('click');}
test('rotated swipes scroll the panel and cannot accidentally press a puzzle control',()=>{
 const{ui,game,get,pane}=setup(true);game.campaign.collectDocument('invitation');game.campaign.collectItem('fuse');ui.openPuzzle('power');const button=get('puzzle-controls').children[0];
 event(button,'touchstart',touch(20,40));event(button,'touchmove',touch(120,40));event(button,'touchend',touch(120,40));button.emit('click');assert.equal(pane.scrollTop,100);assert.deepEqual(ui.sequence,[]);
 tap(button);assert.deepEqual(ui.sequence,[0]);
});
test('nested horizontal/vertical scrolling clamps and transfers remaining movement',()=>{
 const inner=new Element(),outer=new Element();inner.scrollHeight=120;inner.scrollWidth=400;outer.scrollHeight=700;
 scrollPanels([inner,outer],-80,-100);assert.equal(inner.scrollLeft,80);assert.equal(inner.scrollTop,20);assert.equal(outer.scrollTop,80);
 scrollPanels([inner,outer],500,500);assert.equal(inner.scrollLeft,0);assert.equal(inner.scrollTop,0);assert.equal(outer.scrollTop,0);
});
test('cancel, multitouch and orientation change do not produce puzzle taps or stale drags',()=>{
 let rotated=false;const root=new Element(),pane=new Element(),button=new Element('button');pane.scrollHeight=800;root.appendChild(pane);pane.appendChild(button);bindPanelTouch(root,()=>rotated);let taps=0;button.addEventListener('click',()=>taps++);
 event(button,'touchstart',touch(20,30));event(button,'touchcancel',touch(20,30),[]);button.emit('click');assert.equal(taps,0);
 event(button,'touchstart',touch(20,30));event(button,'touchmove',touch(20,0),[touch(20,0),touch(40,0,2)]);event(button,'touchend',touch(20,0));button.emit('click');assert.equal(taps,0);
 event(button,'touchstart',touch(20,30));rotated=true;event(button,'touchmove',touch(80,30));event(button,'touchend',touch(80,30));button.emit('click');assert.equal(taps,0);assert.equal(pane.scrollTop,0);
 tap(button);assert.equal(taps,1);
 event(button,'touchstart',touch(20,30));event(button,'touchcancel',touch(20,30),[]);button.emit('click',{pointerType:'mouse'});assert.equal(taps,2,'real mouse click remains usable after touch cancellation');
});
test('rotated settings sliders use their visual axis and preserve keyboard input events',()=>{
 const root=new Element(),input=new Element('input');input.type='range';input.min='70';input.max='500';input.step='1';input.value='100';input.rect={left:10,top:20,width:32,height:200,right:42,bottom:220};root.appendChild(input);bindPanelTouch(root,()=>true);let inputs=0,changes=0;input.addEventListener('input',()=>inputs++);input.addEventListener('change',()=>changes++);
 event(input,'touchstart',touch(25,20));event(input,'touchmove',touch(25,220));event(input,'touchend',touch(25,220));assert.equal(Number(input.value),500);assert.equal(changes,1);assert.ok(inputs>=2);
 input.value='499';input.emit('input',{detail:0});assert.equal(Number(input.value),499);assert.equal(rangeTouchValue(input,touch(25,-40),true),70);
});
test('every puzzle can be completed by taps, with scrolling/clear/backspace and saved progression',()=>{
 const{ui,game,get,pane,down,up}=setup(true),c=game.campaign;c.collectDocument('invitation');c.collectItem('fuse');
 const solve=(id,values,flag)=>{ui.openPuzzle(id);assert.equal(ui.panel,'puzzle');down.emit('click');assert.ok(pane.scrollTop>0);up.emit('click');
  if(typeof values==='string'){assert.notEqual(document.activeElement,get('puzzle-code'));const keys=get('puzzle-keypad').children;tap(keys[0]);tap(keys[11]);tap(keys[1]);tap(keys[9]);for(const d of values)tap(keys.find(k=>k.textContent===d));}
  else for(const index of values)tap(get('puzzle-controls').children[index]);
  tap(get('puzzle-submit'));assert.equal(c.flags[flag],true,id);assert.equal(ui.panel,null);assert.equal(new Campaign(c.snapshot()).flags[flag],true);
 };
 solve('power',[2,0,1],'power');solve('cabinet','0217','cabinet');c.collectItem('tape');assert.equal(c.perform('tape').ok,true);solve('music',[2,0,3],'memory');c.collectItem('film');c.collectItem('developer');solve('develop',[0,2,1,3],'photo');c.collectItem('relayFuse');solve('generator',[1,0,2],'generator');c.collectDocument(27);solve('radio','1407','relay');c.collectItem('valveHandle');solve('valves',[0,2,1],'released');
});
test('wrong puzzle input fails normally and desktop code entry still receives focus',()=>{
 const{ui,game,get}=setup();game.campaign.collectDocument('invitation');game.campaign.collectItem('fuse');ui.openPuzzle('power');tap(get('puzzle-controls').children[0]);tap(get('puzzle-submit'));assert.equal(game.campaign.flags.power,undefined);assert.equal(ui.panel,'puzzle');ui.close();game.campaign.perform('power',[2,0,1]);game.touchMode=false;ui.openPuzzle('cabinet');assert.equal(document.activeElement,get('puzzle-code'));get('puzzle-code').value='0217';tap(get('puzzle-submit'));assert.equal(game.campaign.flags.cabinet,true);
});
test('gameplay touch buttons reject drags/outside releases and cancellation',()=>{
 const b=new Element('button');let taps=0;bindTouchButton(b,()=>taps++);event(b,'touchstart',touch(30,30));event(b,'touchmove',touch(80,30));event(b,'touchend',touch(80,30));assert.equal(taps,0);event(b,'touchstart',touch(30,30));event(b,'touchcancel',touch(30,30));event(b,'touchend',touch(30,30));assert.equal(taps,0);event(b,'touchstart',touch(30,30));event(b,'touchend',touch(30,30));assert.equal(taps,1);
});
test('mobile puzzle actions remain outside the scrolling content',()=>{
 const html=readFileSync(new URL('./index.html',import.meta.url),'utf8'),css=readFileSync(new URL('./css/game.css',import.meta.url),'utf8');assert.match(html,/id="puzzle-scroll"/);assert.match(html,/<\/div>\s*<div class="puzzle-actions">/);assert.match(css,/body\.touch \.puzzle-scroll \{[^}]*min-height:0;[^}]*overflow:auto/);assert.match(css,/html\.forced body\.touch \.puzzle-shell \{ height:min\(700px,94vw\)/);
});


test('unrotated mobile swipes and page buttons reach offscreen keypad rows',()=>{
 const{ui,game,get,pane,down,up}=setup(false);game.campaign.collectDocument('invitation');game.campaign.collectItem('fuse');ui.openPuzzle('power');const button=get('puzzle-controls').children[0];
 event(button,'touchstart',touch(20,100));event(button,'touchmove',touch(20,20));event(button,'touchend',touch(20,20));button.emit('click');assert.equal(pane.scrollTop,80);assert.deepEqual(ui.sequence,[]);
 for(let i=0;i<12;i++)down.emit('click');assert.equal(pane.scrollTop,pane.scrollHeight-pane.clientHeight);for(let i=0;i<12;i++)up.emit('click');assert.equal(pane.scrollTop,0);
 const input=new Element('input');input.min='70';input.max='500';input.step='1';assert.equal(rangeTouchValue(input,touch(200,10),false),500);
});
