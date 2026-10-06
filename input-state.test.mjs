import {test} from 'node:test';
import assert from 'node:assert/strict';
import {clearMovementInput} from './js/input-state.js';
import {InvestigationUI} from './js/investigation.js';
function fixture(){
 const elements=new Map();const get=id=>{if(!elements.has(id)){
  const classes=new Set(['hidden']);elements.set(id,{textContent:'',classList:{add:x=>classes.add(x),remove:x=>classes.delete(x),contains:x=>classes.has(x),toggle(x,on){on?classes.add(x):classes.delete(x);}}});
 }return elements.get(id);};
 globalThis.document={hidden:false,activeElement:null,getElementById:get};
 const game={state:'playing',noteOpen:false,keys:{KeyW:true},touchMove:{x:1,y:-1},touchRun:true,_joyId:7,_lookId:8,dragging:true,
  controls:{isLocked:false},audio:{paused:false,setPaused(v){this.paused=v;}},locks:0,_tryLock(){this.locks++;},_clearMovementInput(){clearMovementInput(this);},_touchUI:get('touch')};
 const ui=Object.assign(Object.create(InvestigationUI.prototype),{game,panel:null});return{ui,game,get};
}
test('modal entry clears keyboard, drag, sprint, joystick and touch look',()=>{
 const{ui,game}=fixture();assert.equal(ui.open('journal'),true);
 assert.deepEqual(game.keys,{});assert.deepEqual(game.touchMove,{x:0,y:0});
 assert.equal(game.touchRun,false);assert.equal(game.dragging,false);assert.equal(game._joyId,null);assert.equal(game._lookId,null);
 assert.equal(game.audio.paused,true);ui.close();assert.equal(game.audio.paused,false);
});
test('pause above a document preserves document pause and pointer state',()=>{
 const{ui,game}=fixture();ui.open('journal');ui.openSettings();ui.closeSettings();
 assert.equal(game.noteOpen,true);assert.equal(game.audio.paused,true);assert.equal(game.locks,0);
 ui.close();assert.equal(game.audio.paused,false);assert.equal(game.locks,1);
});
test('closing a document beneath pause cannot resume audio or controls',()=>{
 const{ui,game,get}=fixture();ui.open('journal');ui.openSettings();ui.close();
 assert.equal(game.noteOpen,false);assert.equal(game.audio.paused,true);assert.equal(game.locks,0);
 assert.equal(game._touchUI.classList.contains('hidden'),true);
 assert.equal(ui.open('journal'),false);
 ui.closeSettings();assert.equal(game.audio.paused,false);assert.equal(game.locks,1);
 assert.equal(game._touchUI.classList.contains('hidden'),false);assert.equal(get('pause').classList.contains('hidden'),true);
});
test('repeated completed generator/radio interactions do not reopen a puzzle',()=>{
 const{ui,game}=fixture();let notices=0;game.campaign={flags:{generator:true,relay:true}};game._sub=()=>notices++;
 ui.openPuzzle('generator');ui.openPuzzle('radio');assert.equal(notices,2);assert.equal(ui.panel,null);assert.equal(game.noteOpen,false);
});
