// Explicit touch handling for scroll panels inside the rotated mobile stage.
// Mouse/wheel/keyboard retain native behavior; a swipe must never submit a key.
export const contentDelta=(x,y,rotated)=>rotated?[y,-x]:[x,y];
const clamp=(v,lo,hi)=>Math.max(lo,Math.min(hi,v));
export function scrollPanels(nodes,dx,dy){
 for(const node of nodes){
  const x=node.scrollLeft||0,y=node.scrollTop||0;
  node.scrollLeft=clamp(x-dx,0,Math.max(0,node.scrollWidth-node.clientWidth));
  node.scrollTop=clamp(y-dy,0,Math.max(0,node.scrollHeight-node.clientHeight));
  dx-=x-node.scrollLeft;dy-=y-node.scrollTop;
 }
}
export function rangeTouchValue(input,touch,rotated){
 const r=input.getBoundingClientRect(),span=rotated?r.height:r.width;
 if(span<=0)return Number(input.value);
 const ratio=clamp((rotated?touch.clientY-r.top:touch.clientX-r.left)/span,0,1);
 const min=Number(input.min)||0,max=Number(input.max)||100,step=Number(input.step)||1;
 return clamp(min+Math.round((max-min)*ratio/step)*step,min,max);
}
export function bindPanelTouch(root,isRotated=()=>false){
 if(root.dataset.mobileBound)return;root.dataset.mobileBound='true';
 let gesture=null,blockClickUntil=0;
 const scrollable=target=>{const nodes=[];for(let n=target;n;n=n.parentElement){if(n.scrollHeight>n.clientHeight+1||n.scrollWidth>n.clientWidth+1)nodes.push(n);if(n===root)break;}return nodes;};
 const changeRange=t=>{const value=rangeTouchValue(gesture.range,t,gesture.rotated);if(Number(gesture.range.value)!==value){gesture.range.value=String(value);gesture.range.dispatchEvent(new Event('input',{bubbles:true}));}};
 root.addEventListener('touchstart',e=>{
  blockClickUntil=0;if(e.touches.length!==1){gesture=null;blockClickUntil=Date.now()+700;return;}
  const t=e.changedTouches[0],range=e.target.closest?.('input[type="range"]');
  gesture={id:t.identifier,x:t.clientX,y:t.clientY,startX:t.clientX,startY:t.clientY,rotated:isRotated(),nodes:scrollable(e.target),range,moved:false};
  if(range){e.preventDefault();changeRange(t);}
 },{capture:true,passive:false});
 root.addEventListener('touchmove',e=>{
  if(!gesture)return;
  if(e.touches.length!==1||gesture.rotated!==isRotated()){gesture=null;blockClickUntil=Date.now()+700;e.preventDefault();return;}
  const t=Array.from(e.changedTouches).find(t=>t.identifier===gesture.id);if(!t)return;
  if(gesture.range){e.preventDefault();changeRange(t);gesture.moved=true;return;}
  if(!gesture.moved&&Math.hypot(t.clientX-gesture.startX,t.clientY-gesture.startY)<6)return;
  gesture.moved=true;e.preventDefault();
  const [dx,dy]=contentDelta(t.clientX-gesture.x,t.clientY-gesture.y,gesture.rotated);
  scrollPanels(gesture.nodes,dx,dy);gesture.x=t.clientX;gesture.y=t.clientY;
 },{capture:true,passive:false});
 const finish=(e,cancel)=>{
  if(!gesture)return;if(!cancel&&!Array.from(e.changedTouches).some(t=>t.identifier===gesture.id))return;
  if(gesture.range){e.preventDefault();if(!cancel)gesture.range.dispatchEvent(new Event('change',{bubbles:true}));}
  if(gesture.moved||cancel){e.preventDefault();blockClickUntil=Date.now()+700;}
  gesture=null;
 };
 root.addEventListener('touchend',e=>finish(e,false),{capture:true,passive:false});
 root.addEventListener('touchcancel',e=>finish(e,true),{capture:true,passive:false});
 root.addEventListener('click',e=>{if(blockClickUntil>Date.now()&&e.detail!==0&&e.pointerType!=='mouse'){blockClickUntil=0;e.preventDefault();e.stopImmediatePropagation();}},{capture:true});
}
export function bindMobilePanels(doc=document,isRotated=()=>Boolean(window.__forcedLandscape?.())){
 doc.body.classList.add('touch-panels');
 doc.querySelectorAll('.modal, #note, #end').forEach(root=>bindPanelTouch(root,isRotated));
 for(const button of doc.querySelectorAll('[data-puzzle-scroll]'))button.addEventListener('click',()=>{
  const pane=doc.getElementById('puzzle-scroll');pane.scrollTop=clamp(pane.scrollTop+Number(button.dataset.puzzleScroll)*Math.max(80,pane.clientHeight*.75),0,Math.max(0,pane.scrollHeight-pane.clientHeight));
 });
}

export function bindTouchButton(element,activate){
 let press=null;
 // Other fingers may be steering the joystick or looking around. Only touches
 // that began on this button participate in its tap/cancel policy.
 const localTouches=e=>e.targetTouches||Array.from(e.touches).filter(t=>t.target===element||t.identifier===press?.id||Array.from(e.changedTouches).some(c=>c.identifier===t.identifier));
 element.addEventListener('touchstart',e=>{e.preventDefault();if(localTouches(e).length!==1){press=null;return;}const t=e.changedTouches[0];press={id:t.identifier,x:t.clientX,y:t.clientY};},{passive:false});
 element.addEventListener('touchmove',e=>{if(!press)return;const t=Array.from(e.changedTouches).find(t=>t.identifier===press.id);if(localTouches(e).length!==1||(t&&Math.hypot(t.clientX-press.x,t.clientY-press.y)>12))press=null;},{passive:true});
 element.addEventListener('touchcancel',()=>{press=null;},{passive:true});
 element.addEventListener('touchend',e=>{e.preventDefault();if(!press)return;const t=Array.from(e.changedTouches).find(t=>t.identifier===press.id);if(!t)return;const r=element.getBoundingClientRect();const valid=Math.hypot(t.clientX-press.x,t.clientY-press.y)<=12&&t.clientX>=r.left&&t.clientX<=r.right&&t.clientY>=r.top&&t.clientY<=r.bottom;press=null;if(valid)activate();},{passive:false});
}
