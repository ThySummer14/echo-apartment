/* rotate.js —— 伪横屏：竖屏 + 触屏时把整个舞台旋转 90°。
   物理转屏在 WebView 里无法控制（orientation.lock 需要被禁用的全屏 API，
   系统转屏锁定也无法绕过），所以由我们自己旋转画面，用户横握手机即可。
   必须在 bundle 的游戏主体之前执行（先包舞台，游戏初始化才有正确视口）。 */
(function () {
  'use strict';
  var stage = null;
  var FORCED = false;

  function isPortrait() {
    return window.innerHeight > window.innerWidth;
  }

  /* 游戏代码通过它拿到「逻辑视口」尺寸（强制横屏时宽高互换） */
  window.__forcedLandscape = function () {
    return FORCED;
  };

  function apply() {
    if (!stage) return;
    var need = document.body.classList.contains('touch') && isPortrait();
    if (need === FORCED) return;
    FORCED = need;
    if (need) {
      stage.style.cssText =
        'position:absolute;top:0;left:100%;' +
        'width:100vh;height:100vw;' +
        'transform-origin:top left;transform:rotate(90deg);';
      document.documentElement.classList.add('forced');
    } else {
      stage.style.cssText = '';
      document.documentElement.classList.remove('forced');
    }
    if (window.__game && typeof window.__game._fitCanvas === 'function') {
      window.__game._fitCanvas();
    }
  }

  window.__reapplyRotate = apply;

  function init() {
    if (stage) return;
    stage = document.createElement('div');
    stage.id = 'stage';
    while (document.body.firstChild) stage.appendChild(document.body.firstChild);
    document.body.appendChild(stage);
    apply();
    window.addEventListener('resize', apply);
    window.addEventListener('orientationchange', function () { setTimeout(apply, 150); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

(()=>{var Yo=Object.freeze({bounds:[7,46,14,52],legacyBounds:[7,46,18.5,56],safeEntry:{x:10.75,y:0,z:47.15},bedroom:[10.1,48.8,14,52]});function Xl(i,t){if(i.y!==0||i.x<6.7||i.x>18.8||i.z<45.7||i.z>56.3)return i;let e=r=>t.some(o=>o.y1>r.y+.05&&o.y0<r.y+1.75&&o.x0<r.x+.3&&o.x1>r.x-.3&&o.z0<r.z+.3&&o.z1>r.z-.3),n=r=>t.some(o=>o.walkable&&Math.abs(o.y1-r.y)<.04&&r.x>=o.x0&&r.x<=o.x1&&r.z>=o.z0&&r.z<=o.z1);if(n(i)&&!e(i))return i;let s={...Yo.safeEntry};if(!n(s)||e(s))throw new Error("104 checkpoint fallback unsupported or obstructed");return s}var Iu=(i,t,e)=>e?[t,-i]:[i,t],Ss=(i,t,e)=>Math.max(t,Math.min(e,i));function Du(i,t,e){for(let n of i){let s=n.scrollLeft||0,r=n.scrollTop||0;n.scrollLeft=Ss(s-t,0,Math.max(0,n.scrollWidth-n.clientWidth)),n.scrollTop=Ss(r-e,0,Math.max(0,n.scrollHeight-n.clientHeight)),t-=s-n.scrollLeft,e-=r-n.scrollTop}}function zu(i,t,e){let n=i.getBoundingClientRect(),s=e?n.height:n.width;if(s<=0)return Number(i.value);let r=Ss((e?t.clientY-n.top:t.clientX-n.left)/s,0,1),o=Number(i.min)||0,a=Number(i.max)||100,l=Number(i.step)||1;return Ss(o+Math.round((a-o)*r/l)*l,o,a)}function Uu(i,t=()=>!1){if(i.dataset.mobileBound)return;i.dataset.mobileBound="true";let e=null,n=0,s=a=>{let l=[];for(let c=a;c&&((c.scrollHeight>c.clientHeight+1||c.scrollWidth>c.clientWidth+1)&&l.push(c),c!==i);c=c.parentElement);return l},r=a=>{let l=zu(e.range,a,e.rotated);Number(e.range.value)!==l&&(e.range.value=String(l),e.range.dispatchEvent(new Event("input",{bubbles:!0})))};i.addEventListener("touchstart",a=>{var h,u;if(n=0,a.touches.length!==1){e=null,n=Date.now()+700;return}let l=a.changedTouches[0],c=(u=(h=a.target).closest)==null?void 0:u.call(h,'input[type="range"]');e={id:l.identifier,x:l.clientX,y:l.clientY,startX:l.clientX,startY:l.clientY,rotated:t(),nodes:s(a.target),range:c,moved:!1},c&&(a.preventDefault(),r(l))},{capture:!0,passive:!1}),i.addEventListener("touchmove",a=>{if(!e)return;if(a.touches.length!==1||e.rotated!==t()){e=null,n=Date.now()+700,a.preventDefault();return}let l=Array.from(a.changedTouches).find(u=>u.identifier===e.id);if(!l)return;if(e.range){a.preventDefault(),r(l),e.moved=!0;return}if(!e.moved&&Math.hypot(l.clientX-e.startX,l.clientY-e.startY)<6)return;e.moved=!0,a.preventDefault();let[c,h]=Iu(l.clientX-e.x,l.clientY-e.y,e.rotated);Du(e.nodes,c,h),e.x=l.clientX,e.y=l.clientY},{capture:!0,passive:!1});let o=(a,l)=>{e&&(!l&&!Array.from(a.changedTouches).some(c=>c.identifier===e.id)||(e.range&&(a.preventDefault(),l||e.range.dispatchEvent(new Event("change",{bubbles:!0}))),(e.moved||l)&&(a.preventDefault(),n=Date.now()+700),e=null))};i.addEventListener("touchend",a=>o(a,!1),{capture:!0,passive:!1}),i.addEventListener("touchcancel",a=>o(a,!0),{capture:!0,passive:!1}),i.addEventListener("click",a=>{n>Date.now()&&a.detail!==0&&a.pointerType!=="mouse"&&(n=0,a.preventDefault(),a.stopImmediatePropagation())},{capture:!0})}function ql(i=document,t=()=>{var e;return!!((e=window.__forcedLandscape)!=null&&e.call(window))}){i.body.classList.add("touch-panels"),i.querySelectorAll(".modal, #note, #end").forEach(e=>Uu(e,t));for(let e of i.querySelectorAll("[data-puzzle-scroll]"))e.addEventListener("click",()=>{let n=i.getElementById("puzzle-scroll");n.scrollTop=Ss(n.scrollTop+Number(e.dataset.puzzleScroll)*Math.max(80,n.clientHeight*.75),0,Math.max(0,n.scrollHeight-n.clientHeight))})}function Yl(i,t){let e=null,n=s=>s.targetTouches||Array.from(s.touches).filter(r=>r.target===i||r.identifier===(e==null?void 0:e.id)||Array.from(s.changedTouches).some(o=>o.identifier===r.identifier));i.addEventListener("touchstart",s=>{if(s.preventDefault(),n(s).length!==1){e=null;return}let r=s.changedTouches[0];e={id:r.identifier,x:r.clientX,y:r.clientY}},{passive:!1}),i.addEventListener("touchmove",s=>{if(!e)return;let r=Array.from(s.changedTouches).find(o=>o.identifier===e.id);(n(s).length!==1||r&&Math.hypot(r.clientX-e.x,r.clientY-e.y)>12)&&(e=null)},{passive:!0}),i.addEventListener("touchcancel",()=>{e=null},{passive:!0}),i.addEventListener("touchend",s=>{if(s.preventDefault(),!e)return;let r=Array.from(s.changedTouches).find(l=>l.identifier===e.id);if(!r)return;let o=i.getBoundingClientRect(),a=Math.hypot(r.clientX-e.x,r.clientY-e.y)<=12&&r.clientX>=o.left&&r.clientX<=o.right&&r.clientY>=o.top&&r.clientY<=o.bottom;e=null,a&&t()},{passive:!1})}var ku=0,Zl=1,Nu=2;var Ih=1,Fu=2,Gn=3,Xn=0,Qe=1,ue=2;var Ln=0,ns=1,Os=2,Jl=3,Kl=4,Ou=5,yi=100,Bu=101,Hu=102,$l=103,jl=104,Gu=200,Vu=201,Wu=202,Xu=203,La=204,Ia=205,qu=206,Yu=207,Zu=208,Ju=209,Ku=210,$u=211,ju=212,Qu=213,td=214,ed=0,nd=1,id=2,kr=3,sd=4,rd=5,od=6,ad=7,Dh=0,ld=1,cd=2,oi=0,hd=1,ud=2,dd=3,vl=4,fd=5,pd=6;var zh=300,rs=301,os=302,Da=303,za=304,vo=306,In=1e3,Sn=1001,Ua=1002,He=1003,Ql=1004;var Zo=1005;var on=1006,md=1007;var An=1008;var ai=1009,gd=1010,xd=1011,bl=1012,Uh=1013,si=1014,ri=1015,Ei=1016,kh=1017,Nh=1018,vi=1020,yd=1021,Tn=1023,_d=1024,vd=1025,bi=1026,as=1027,bd=1028,Fh=1029,Md=1030,Oh=1031,Bh=1033,Jo=33776,Ko=33777,$o=33778,jo=33779,tc=35840,ec=35841,nc=35842,ic=35843,Hh=36196,sc=37492,rc=37496,oc=37808,ac=37809,lc=37810,cc=37811,hc=37812,uc=37813,dc=37814,fc=37815,pc=37816,mc=37817,gc=37818,xc=37819,yc=37820,_c=37821,Qo=36492,vc=36494,bc=36495,Ed=36283,Mc=36284,Ec=36285,wc=36286;var Nr=2300,Fr=2301,ta=2302,Sc=2400,Tc=2401,Ac=2402;var Gh=3e3,Mi=3001,wd=3200,Sd=3201,Vh=0,Td=1,Ge="",ye="srgb",qn="srgb-linear",Ml="display-p3",bo="display-p3-linear",Or="linear",xe="srgb",Br="rec709",Hr="p3";var Ui=7680;var Rc=519,Ad=512,Rd=513,Cd=514,Wh=515,Pd=516,Ld=517,Id=518,Dd=519,Cc=35044;var Pc="300 es",ka=1035,Wn=2e3,Gr=2001,Dn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Ke=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var ea=Math.PI/180,Vr=180/Math.PI;function ps(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ke[i&255]+Ke[i>>8&255]+Ke[i>>16&255]+Ke[i>>24&255]+"-"+Ke[t&255]+Ke[t>>8&255]+"-"+Ke[t>>16&15|64]+Ke[t>>24&255]+"-"+Ke[e&63|128]+Ke[e>>8&255]+"-"+Ke[e>>16&255]+Ke[e>>24&255]+Ke[n&255]+Ke[n>>8&255]+Ke[n>>16&255]+Ke[n>>24&255]).toLowerCase()}function je(i,t,e){return Math.max(t,Math.min(e,i))}function zd(i,t){return(i%t+t)%t}function na(i,t,e){return(1-e)*i+e*t}function Lc(i){return(i&i-1)===0&&i!==0}function Na(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Ts(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function rn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var yt=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(je(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},te=class i{constructor(t,e,n,s,r,o,a,l,c){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c)}set(t,e,n,s,r,o,a,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],m=n[8],y=s[0],p=s[3],g=s[6],_=s[1],x=s[4],b=s[7],T=s[2],E=s[5],M=s[8];return r[0]=o*y+a*_+l*T,r[3]=o*p+a*x+l*E,r[6]=o*g+a*b+l*M,r[1]=c*y+h*_+u*T,r[4]=c*p+h*x+u*E,r[7]=c*g+h*b+u*M,r[2]=d*y+f*_+m*T,r[5]=d*p+f*x+m*E,r[8]=d*g+f*b+m*M,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+s*r*c-s*o*l}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,m=e*u+n*d+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let y=1/m;return t[0]=u*y,t[1]=(s*c-h*n)*y,t[2]=(a*n-s*o)*y,t[3]=d*y,t[4]=(h*e-s*l)*y,t[5]=(s*r-a*e)*y,t[6]=f*y,t[7]=(n*l-c*e)*y,t[8]=(o*e-n*r)*y,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(ia.makeScale(t,e)),this}rotate(t){return this.premultiply(ia.makeRotation(-t)),this}translate(t,e){return this.premultiply(ia.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},ia=new te;function Xh(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Wr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ud(){let i=Wr("canvas");return i.style.display="block",i}var Ic={};function zs(i){i in Ic||(Ic[i]=!0,console.warn(i))}var Dc=new te().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),zc=new te().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),or={[qn]:{transfer:Or,primaries:Br,toReference:i=>i,fromReference:i=>i},[ye]:{transfer:xe,primaries:Br,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[bo]:{transfer:Or,primaries:Hr,toReference:i=>i.applyMatrix3(zc),fromReference:i=>i.applyMatrix3(Dc)},[Ml]:{transfer:xe,primaries:Hr,toReference:i=>i.convertSRGBToLinear().applyMatrix3(zc),fromReference:i=>i.applyMatrix3(Dc).convertLinearToSRGB()}},kd=new Set([qn,bo]),pe={enabled:!0,_workingColorSpace:qn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!kd.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;let n=or[t].toReference,s=or[e].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return or[i].primaries},getTransfer:function(i){return i===Ge?Or:or[i].transfer}};function is(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function sa(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var ki,Xr=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ki===void 0&&(ki=Wr("canvas")),ki.width=t.width,ki.height=t.height;let n=ki.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ki}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let e=Wr("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=is(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(is(e[n]/255)*255):e[n]=is(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Nd=0,qr=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Nd++}),this.uuid=ps(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ra(s[o].image)):r.push(ra(s[o]))}else r=ra(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function ra(i){return typeof HTMLImageElement!="undefined"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&i instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&i instanceof ImageBitmap?Xr.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Fd=0,xn=class i extends Dn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=Sn,s=Sn,r=on,o=An,a=Tn,l=ai,c=i.DEFAULT_ANISOTROPY,h=Ge){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Fd++}),this.uuid=ps(),this.name="",this.source=new qr(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new yt(0,0),this.repeat=new yt(1,1),this.center=new yt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new te,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(zs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Mi?ye:Ge),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==zh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case In:t.x=t.x-Math.floor(t.x);break;case Sn:t.x=t.x<0?0:1;break;case Ua:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case In:t.y=t.y-Math.floor(t.y);break;case Sn:t.y=t.y<0?0:1;break;case Ua:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return zs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===ye?Mi:Gh}set encoding(t){zs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===Mi?ye:Ge}};xn.DEFAULT_IMAGE=null;xn.DEFAULT_MAPPING=zh;xn.DEFAULT_ANISOTROPY=1;var Me=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],m=l[9],y=l[2],p=l[6],g=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-y)<.01&&Math.abs(m-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+y)<.1&&Math.abs(m+p)<.1&&Math.abs(c+f+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let x=(c+1)/2,b=(f+1)/2,T=(g+1)/2,E=(h+d)/4,M=(u+y)/4,I=(m+p)/4;return x>b&&x>T?x<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(x),s=E/n,r=M/n):b>T?b<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),n=E/s,r=I/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=M/r,s=I/r),this.set(n,s,r,e),this}let _=Math.sqrt((p-m)*(p-m)+(u-y)*(u-y)+(d-h)*(d-h));return Math.abs(_)<.001&&(_=1),this.x=(p-m)/_,this.y=(u-y)/_,this.z=(d-h)/_,this.w=Math.acos((c+f+g-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Fa=class extends Dn{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Me(0,0,t,e),this.scissorTest=!1,this.viewport=new Me(0,0,t,e);let s={width:t,height:e,depth:1};n.encoding!==void 0&&(zs("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Mi?ye:Ge),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:on,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new xn(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new qr(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Rn=class extends Fa{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Yr=class extends xn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=He,this.minFilter=He,this.wrapR=Sn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Oa=class extends xn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=He,this.minFilter=He,this.wrapR=Sn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var li=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3],d=r[o+0],f=r[o+1],m=r[o+2],y=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=m,t[e+3]=y;return}if(u!==y||l!==d||c!==f||h!==m){let p=1-a,g=l*d+c*f+h*m+u*y,_=g>=0?1:-1,x=1-g*g;if(x>Number.EPSILON){let T=Math.sqrt(x),E=Math.atan2(T,g*_);p=Math.sin(p*E)/T,a=Math.sin(a*E)/T}let b=a*_;if(l=l*p+d*b,c=c*p+f*b,h=h*p+m*b,u=u*p+y*b,p===1-a){let T=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=T,c*=T,h*=T,u*=T}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){let a=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[o],d=r[o+1],f=r[o+2],m=r[o+3];return t[e]=a*m+h*u+l*f-c*d,t[e+1]=l*m+h*d+c*u-a*f,t[e+2]=c*m+h*f+a*d-l*u,t[e+3]=h*m-a*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(s/2),u=a(r/2),d=l(n/2),f=l(s/2),m=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"YZX":this._x=d*h*u+c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u-d*f*m;break;case"XZY":this._x=d*h*u-c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(je(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+s*c-r*l,this._y=s*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-s*a,this._w=o*h-n*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(e*Math.cos(s),n*Math.sin(r),n*Math.cos(r),e*Math.sin(s))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},L=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Uc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Uc.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=s+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-n*l,this.z=n*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return oa.copy(this).projectOnVector(t),this.sub(oa)}reflect(t){return this.sub(oa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(je(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},oa=new L,Uc=new li,dn=class{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Mn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Mn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Mn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Mn):Mn.fromBufferAttribute(r,o),Mn.applyMatrix4(t.matrixWorld),this.expandByPoint(Mn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ar.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ar.copy(n.boundingBox)),ar.applyMatrix4(t.matrixWorld),this.union(ar)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,Mn),Mn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(As),lr.subVectors(this.max,As),Ni.subVectors(t.a,As),Fi.subVectors(t.b,As),Oi.subVectors(t.c,As),Qn.subVectors(Fi,Ni),ti.subVectors(Oi,Fi),fi.subVectors(Ni,Oi);let e=[0,-Qn.z,Qn.y,0,-ti.z,ti.y,0,-fi.z,fi.y,Qn.z,0,-Qn.x,ti.z,0,-ti.x,fi.z,0,-fi.x,-Qn.y,Qn.x,0,-ti.y,ti.x,0,-fi.y,fi.x,0];return!aa(e,Ni,Fi,Oi,lr)||(e=[1,0,0,0,1,0,0,0,1],!aa(e,Ni,Fi,Oi,lr))?!1:(cr.crossVectors(Qn,ti),e=[cr.x,cr.y,cr.z],aa(e,Ni,Fi,Oi,lr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Mn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Mn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Nn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Nn=[new L,new L,new L,new L,new L,new L,new L,new L],Mn=new L,ar=new dn,Ni=new L,Fi=new L,Oi=new L,Qn=new L,ti=new L,fi=new L,As=new L,lr=new L,cr=new L,pi=new L;function aa(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){pi.fromArray(i,r);let a=s.x*Math.abs(pi.x)+s.y*Math.abs(pi.y)+s.z*Math.abs(pi.z),l=t.dot(pi),c=e.dot(pi),h=n.dot(pi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var Od=new dn,Rs=new L,la=new L,Yn=class{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):Od.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Rs.subVectors(t,this.center);let e=Rs.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Rs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(la.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Rs.copy(t.center).add(la)),this.expandByPoint(Rs.copy(t.center).sub(la))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Fn=new L,ca=new L,hr=new L,ei=new L,ha=new L,ur=new L,ua=new L,wi=class{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Fn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Fn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Fn.copy(this.origin).addScaledVector(this.direction,e),Fn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){ca.copy(t).add(e).multiplyScalar(.5),hr.copy(e).sub(t).normalize(),ei.copy(this.origin).sub(ca);let r=t.distanceTo(e)*.5,o=-this.direction.dot(hr),a=ei.dot(this.direction),l=-ei.dot(hr),c=ei.lengthSq(),h=Math.abs(1-o*o),u,d,f,m;if(h>0)if(u=o*l-a,d=o*a-l,m=r*h,u>=0)if(d>=-m)if(d<=m){let y=1/h;u*=y,d*=y,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-m?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=m?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(ca).addScaledVector(hr,d),f}intersectSphere(t,e){Fn.subVectors(t.center,this.origin);let n=Fn.dot(this.direction),s=Fn.dot(Fn)-n*n,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Fn)!==null}intersectTriangle(t,e,n,s,r){ha.subVectors(e,t),ur.subVectors(n,t),ua.crossVectors(ha,ur);let o=this.direction.dot(ua),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ei.subVectors(this.origin,t);let l=a*this.direction.dot(ur.crossVectors(ei,ur));if(l<0)return null;let c=a*this.direction.dot(ha.cross(ei));if(c<0||l+c>o)return null;let h=-a*ei.dot(ua);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},me=class i{constructor(t,e,n,s,r,o,a,l,c,h,u,d,f,m,y,p){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,l,c,h,u,d,f,m,y,p)}set(t,e,n,s,r,o,a,l,c,h,u,d,f,m,y,p){let g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=s,g[1]=r,g[5]=o,g[9]=a,g[13]=l,g[2]=c,g[6]=h,g[10]=u,g[14]=d,g[3]=f,g[7]=m,g[11]=y,g[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/Bi.setFromMatrixColumn(t,0).length(),r=1/Bi.setFromMatrixColumn(t,1).length(),o=1/Bi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let d=o*h,f=o*u,m=a*h,y=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+m*c,e[5]=d-y*c,e[9]=-a*l,e[2]=y-d*c,e[6]=m+f*c,e[10]=o*l}else if(t.order==="YXZ"){let d=l*h,f=l*u,m=c*h,y=c*u;e[0]=d+y*a,e[4]=m*a-f,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-m,e[6]=y+d*a,e[10]=o*l}else if(t.order==="ZXY"){let d=l*h,f=l*u,m=c*h,y=c*u;e[0]=d-y*a,e[4]=-o*u,e[8]=m+f*a,e[1]=f+m*a,e[5]=o*h,e[9]=y-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let d=o*h,f=o*u,m=a*h,y=a*u;e[0]=l*h,e[4]=m*c-f,e[8]=d*c+y,e[1]=l*u,e[5]=y*c+d,e[9]=f*c-m,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let d=o*l,f=o*c,m=a*l,y=a*c;e[0]=l*h,e[4]=y-d*u,e[8]=m*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*u+m,e[10]=d-y*u}else if(t.order==="XZY"){let d=o*l,f=o*c,m=a*l,y=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+y,e[5]=o*h,e[9]=f*u-m,e[2]=m*u-f,e[6]=a*h,e[10]=y*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Bd,t,Hd)}lookAt(t,e,n){let s=this.elements;return hn.subVectors(t,e),hn.lengthSq()===0&&(hn.z=1),hn.normalize(),ni.crossVectors(n,hn),ni.lengthSq()===0&&(Math.abs(n.z)===1?hn.x+=1e-4:hn.z+=1e-4,hn.normalize(),ni.crossVectors(n,hn)),ni.normalize(),dr.crossVectors(hn,ni),s[0]=ni.x,s[4]=dr.x,s[8]=hn.x,s[1]=ni.y,s[5]=dr.y,s[9]=hn.y,s[2]=ni.z,s[6]=dr.z,s[10]=hn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],m=n[2],y=n[6],p=n[10],g=n[14],_=n[3],x=n[7],b=n[11],T=n[15],E=s[0],M=s[4],I=s[8],w=s[12],S=s[1],R=s[5],U=s[9],B=s[13],D=s[2],O=s[6],X=s[10],$=s[14],Z=s[3],q=s[7],Q=s[11],ot=s[15];return r[0]=o*E+a*S+l*D+c*Z,r[4]=o*M+a*R+l*O+c*q,r[8]=o*I+a*U+l*X+c*Q,r[12]=o*w+a*B+l*$+c*ot,r[1]=h*E+u*S+d*D+f*Z,r[5]=h*M+u*R+d*O+f*q,r[9]=h*I+u*U+d*X+f*Q,r[13]=h*w+u*B+d*$+f*ot,r[2]=m*E+y*S+p*D+g*Z,r[6]=m*M+y*R+p*O+g*q,r[10]=m*I+y*U+p*X+g*Q,r[14]=m*w+y*B+p*$+g*ot,r[3]=_*E+x*S+b*D+T*Z,r[7]=_*M+x*R+b*O+T*q,r[11]=_*I+x*U+b*X+T*Q,r[15]=_*w+x*B+b*$+T*ot,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],m=t[3],y=t[7],p=t[11],g=t[15];return m*(+r*l*u-s*c*u-r*a*d+n*c*d+s*a*f-n*l*f)+y*(+e*l*f-e*c*d+r*o*d-s*o*f+s*c*h-r*l*h)+p*(+e*c*u-e*a*f-r*o*u+n*o*f+r*a*h-n*c*h)+g*(-s*a*h-e*l*u+e*a*d+s*o*u-n*o*d+n*l*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],m=t[12],y=t[13],p=t[14],g=t[15],_=u*p*c-y*d*c+y*l*f-a*p*f-u*l*g+a*d*g,x=m*d*c-h*p*c-m*l*f+o*p*f+h*l*g-o*d*g,b=h*y*c-m*u*c+m*a*f-o*y*f-h*a*g+o*u*g,T=m*u*l-h*y*l-m*a*d+o*y*d+h*a*p-o*u*p,E=e*_+n*x+s*b+r*T;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let M=1/E;return t[0]=_*M,t[1]=(y*d*r-u*p*r-y*s*f+n*p*f+u*s*g-n*d*g)*M,t[2]=(a*p*r-y*l*r+y*s*c-n*p*c-a*s*g+n*l*g)*M,t[3]=(u*l*r-a*d*r-u*s*c+n*d*c+a*s*f-n*l*f)*M,t[4]=x*M,t[5]=(h*p*r-m*d*r+m*s*f-e*p*f-h*s*g+e*d*g)*M,t[6]=(m*l*r-o*p*r-m*s*c+e*p*c+o*s*g-e*l*g)*M,t[7]=(o*d*r-h*l*r+h*s*c-e*d*c-o*s*f+e*l*f)*M,t[8]=b*M,t[9]=(m*u*r-h*y*r-m*n*f+e*y*f+h*n*g-e*u*g)*M,t[10]=(o*y*r-m*a*r+m*n*c-e*y*c-o*n*g+e*a*g)*M,t[11]=(h*a*r-o*u*r-h*n*c+e*u*c+o*n*f-e*a*f)*M,t[12]=T*M,t[13]=(h*y*s-m*u*s+m*n*d-e*y*d-h*n*p+e*u*p)*M,t[14]=(m*a*s-o*y*s-m*n*l+e*y*l+o*n*p-e*a*p)*M,t[15]=(o*u*s-h*a*s+h*n*l-e*u*l-o*n*d+e*a*d)*M,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-s*l,c*l+s*a,0,c*a+s*l,h*a+n,h*l-s*o,0,c*l-s*a,h*l+s*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,m=r*u,y=o*h,p=o*u,g=a*u,_=l*c,x=l*h,b=l*u,T=n.x,E=n.y,M=n.z;return s[0]=(1-(y+g))*T,s[1]=(f+b)*T,s[2]=(m-x)*T,s[3]=0,s[4]=(f-b)*E,s[5]=(1-(d+g))*E,s[6]=(p+_)*E,s[7]=0,s[8]=(m+x)*M,s[9]=(p-_)*M,s[10]=(1-(d+y))*M,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=Bi.set(s[0],s[1],s[2]).length(),o=Bi.set(s[4],s[5],s[6]).length(),a=Bi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],En.copy(this);let c=1/r,h=1/o,u=1/a;return En.elements[0]*=c,En.elements[1]*=c,En.elements[2]*=c,En.elements[4]*=h,En.elements[5]*=h,En.elements[6]*=h,En.elements[8]*=u,En.elements[9]*=u,En.elements[10]*=u,e.setFromRotationMatrix(En),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=Wn){let l=this.elements,c=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),d=(n+s)/(n-s),f,m;if(a===Wn)f=-(o+r)/(o-r),m=-2*o*r/(o-r);else if(a===Gr)f=-o/(o-r),m=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=m,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Wn){let l=this.elements,c=1/(e-t),h=1/(n-s),u=1/(o-r),d=(e+t)*c,f=(n+s)*h,m,y;if(a===Wn)m=(o+r)*u,y=-2*u;else if(a===Gr)m=r*u,y=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=y,l[14]=-m,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},Bi=new L,En=new me,Bd=new L(0,0,0),Hd=new L(1,1,1),ni=new L,dr=new L,hn=new L,kc=new me,Nc=new li,ls=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(je(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-je(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(je(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-je(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(je(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-je(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return kc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(kc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Nc.setFromEuler(this),this.setFromQuaternion(Nc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ls.DEFAULT_ORDER="XYZ";var Zr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Gd=0,Fc=new L,Hi=new li,On=new me,fr=new L,Cs=new L,Vd=new L,Wd=new li,Oc=new L(1,0,0),Bc=new L(0,1,0),Hc=new L(0,0,1),Xd={type:"added"},qd={type:"removed"},Ee=class i extends Dn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Gd++}),this.uuid=ps(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new L,e=new ls,n=new li,s=new L(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new me},normalMatrix:{value:new te}}),this.matrix=new me,this.matrixWorld=new me,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Zr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Hi.setFromAxisAngle(t,e),this.quaternion.multiply(Hi),this}rotateOnWorldAxis(t,e){return Hi.setFromAxisAngle(t,e),this.quaternion.premultiply(Hi),this}rotateX(t){return this.rotateOnAxis(Oc,t)}rotateY(t){return this.rotateOnAxis(Bc,t)}rotateZ(t){return this.rotateOnAxis(Hc,t)}translateOnAxis(t,e){return Fc.copy(t).applyQuaternion(this.quaternion),this.position.add(Fc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Oc,t)}translateY(t){return this.translateOnAxis(Bc,t)}translateZ(t){return this.translateOnAxis(Hc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(On.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?fr.copy(t):fr.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Cs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?On.lookAt(Cs,fr,this.up):On.lookAt(fr,Cs,this.up),this.quaternion.setFromRotationMatrix(On),s&&(On.extractRotation(s.matrixWorld),Hi.setFromRotationMatrix(On),this.quaternion.premultiply(Hi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(Xd)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(qd)),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),On.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),On.multiply(t.parent.matrixWorld)),t.applyMatrix4(On),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cs,t,Vd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Cs,Wd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++){let r=e[n];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++){let a=s[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),m=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};Ee.DEFAULT_UP=new L(0,1,0);Ee.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ee.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var wn=new L,Bn=new L,da=new L,Hn=new L,Gi=new L,Vi=new L,Gc=new L,fa=new L,pa=new L,ma=new L,pr=!1,ji=class i{constructor(t=new L,e=new L,n=new L){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),wn.subVectors(t,e),s.cross(wn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){wn.subVectors(s,e),Bn.subVectors(n,e),da.subVectors(t,e);let o=wn.dot(wn),a=wn.dot(Bn),l=wn.dot(da),c=Bn.dot(Bn),h=Bn.dot(da),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(c*l-a*h)*d,m=(o*h-a*l)*d;return r.set(1-f-m,m,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Hn)===null?!1:Hn.x>=0&&Hn.y>=0&&Hn.x+Hn.y<=1}static getUV(t,e,n,s,r,o,a,l){return pr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),pr=!0),this.getInterpolation(t,e,n,s,r,o,a,l)}static getInterpolation(t,e,n,s,r,o,a,l){return this.getBarycoord(t,e,n,s,Hn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Hn.x),l.addScaledVector(o,Hn.y),l.addScaledVector(a,Hn.z),l)}static isFrontFacing(t,e,n,s){return wn.subVectors(n,e),Bn.subVectors(t,e),wn.cross(Bn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return wn.subVectors(this.c,this.b),Bn.subVectors(this.a,this.b),wn.cross(Bn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,s,r){return pr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),pr=!0),i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,o,a;Gi.subVectors(s,n),Vi.subVectors(r,n),fa.subVectors(t,n);let l=Gi.dot(fa),c=Vi.dot(fa);if(l<=0&&c<=0)return e.copy(n);pa.subVectors(t,s);let h=Gi.dot(pa),u=Vi.dot(pa);if(h>=0&&u<=h)return e.copy(s);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Gi,o);ma.subVectors(t,r);let f=Gi.dot(ma),m=Vi.dot(ma);if(m>=0&&f<=m)return e.copy(r);let y=f*c-l*m;if(y<=0&&c>=0&&m<=0)return a=c/(c-m),e.copy(n).addScaledVector(Vi,a);let p=h*m-f*u;if(p<=0&&u-h>=0&&f-m>=0)return Gc.subVectors(r,s),a=(u-h)/(u-h+(f-m)),e.copy(s).addScaledVector(Gc,a);let g=1/(p+y+d);return o=y*g,a=d*g,e.copy(n).addScaledVector(Gi,o).addScaledVector(Vi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},qh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ii={h:0,s:0,l:0},mr={h:0,s:0,l:0};function ga(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var Zt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ye){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,pe.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=pe.workingColorSpace){return this.r=t,this.g=e,this.b=n,pe.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=pe.workingColorSpace){if(t=zd(t,1),e=je(e,0,1),n=je(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=ga(o,r,t+1/3),this.g=ga(o,r,t),this.b=ga(o,r,t-1/3)}return pe.toWorkingColorSpace(this,s),this}setStyle(t,e=ye){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ye){let n=qh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=is(t.r),this.g=is(t.g),this.b=is(t.b),this}copyLinearToSRGB(t){return this.r=sa(t.r),this.g=sa(t.g),this.b=sa(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ye){return pe.fromWorkingColorSpace($e.copy(this),t),Math.round(je($e.r*255,0,255))*65536+Math.round(je($e.g*255,0,255))*256+Math.round(je($e.b*255,0,255))}getHexString(t=ye){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=pe.workingColorSpace){pe.fromWorkingColorSpace($e.copy(this),e);let n=$e.r,s=$e.g,r=$e.b,o=Math.max(n,s,r),a=Math.min(n,s,r),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=pe.workingColorSpace){return pe.fromWorkingColorSpace($e.copy(this),e),t.r=$e.r,t.g=$e.g,t.b=$e.b,t}getStyle(t=ye){pe.fromWorkingColorSpace($e.copy(this),t);let e=$e.r,n=$e.g,s=$e.b;return t!==ye?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ii),this.setHSL(ii.h+t,ii.s+e,ii.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ii),t.getHSL(mr);let n=na(ii.h,mr.h,e),s=na(ii.s,mr.s,e),r=na(ii.l,mr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},$e=new Zt;Zt.NAMES=qh;var Yd=0,Zn=class extends Dn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Yd++}),this.uuid=ps(),this.name="",this.type="Material",this.blending=ns,this.side=Xn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=La,this.blendDst=Ia,this.blendEquation=yi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Zt(0,0,0),this.blendAlpha=0,this.depthFunc=kr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Rc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ui,this.stencilZFail=Ui,this.stencilZPass=Ui,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ns&&(n.blending=this.blending),this.side!==Xn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==La&&(n.blendSrc=this.blendSrc),this.blendDst!==Ia&&(n.blendDst=this.blendDst),this.blendEquation!==yi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==kr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Rc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ui&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ui&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ui&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},Ze=class extends Zn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Dh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var ze=new L,gr=new yt,Pe=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Cc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=ri,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)gr.fromBufferAttribute(this,e),gr.applyMatrix3(t),this.setXY(e,gr.x,gr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ze.fromBufferAttribute(this,e),ze.applyMatrix3(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ze.fromBufferAttribute(this,e),ze.applyMatrix4(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ze.fromBufferAttribute(this,e),ze.applyNormalMatrix(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ze.fromBufferAttribute(this,e),ze.transformDirection(t),this.setXYZ(e,ze.x,ze.y,ze.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ts(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=rn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ts(e,this.array)),e}setX(t,e){return this.normalized&&(e=rn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ts(e,this.array)),e}setY(t,e){return this.normalized&&(e=rn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ts(e,this.array)),e}setZ(t,e){return this.normalized&&(e=rn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ts(e,this.array)),e}setW(t,e){return this.normalized&&(e=rn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=rn(e,this.array),n=rn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=rn(e,this.array),n=rn(n,this.array),s=rn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=rn(e,this.array),n=rn(n,this.array),s=rn(s,this.array),r=rn(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Cc&&(t.usage=this.usage),t}};var Jr=class extends Pe{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Kr=class extends Pe{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var re=class extends Pe{constructor(t,e,n){super(new Float32Array(t),e,n)}};var Zd=0,gn=new me,xa=new Ee,Wi=new L,un=new dn,Ps=new dn,Be=new L,ge=class i extends Dn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Zd++}),this.uuid=ps(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Xh(t)?Kr:Jr)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new te().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return gn.makeRotationFromQuaternion(t),this.applyMatrix4(gn),this}rotateX(t){return gn.makeRotationX(t),this.applyMatrix4(gn),this}rotateY(t){return gn.makeRotationY(t),this.applyMatrix4(gn),this}rotateZ(t){return gn.makeRotationZ(t),this.applyMatrix4(gn),this}translate(t,e,n){return gn.makeTranslation(t,e,n),this.applyMatrix4(gn),this}scale(t,e,n){return gn.makeScale(t,e,n),this.applyMatrix4(gn),this}lookAt(t){return xa.lookAt(t),xa.updateMatrix(),this.applyMatrix4(xa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Wi).negate(),this.translate(Wi.x,Wi.y,Wi.z),this}setFromPoints(t){let e=[];for(let n=0,s=t.length;n<s;n++){let r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new re(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new dn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];un.setFromBufferAttribute(r),this.morphTargetsRelative?(Be.addVectors(this.boundingBox.min,un.min),this.boundingBox.expandByPoint(Be),Be.addVectors(this.boundingBox.max,un.max),this.boundingBox.expandByPoint(Be)):(this.boundingBox.expandByPoint(un.min),this.boundingBox.expandByPoint(un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Yn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new L,1/0);return}if(t){let n=this.boundingSphere.center;if(un.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];Ps.setFromBufferAttribute(a),this.morphTargetsRelative?(Be.addVectors(un.min,Ps.min),un.expandByPoint(Be),Be.addVectors(un.max,Ps.max),un.expandByPoint(Be)):(un.expandByPoint(Ps.min),un.expandByPoint(Ps.max))}un.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)Be.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Be));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Be.fromBufferAttribute(a,c),l&&(Wi.fromBufferAttribute(t,c),Be.add(Wi)),s=Math.max(s,n.distanceToSquared(Be))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.array,s=e.position.array,r=e.normal.array,o=e.uv.array,a=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Pe(new Float32Array(4*a),4));let l=this.getAttribute("tangent").array,c=[],h=[];for(let S=0;S<a;S++)c[S]=new L,h[S]=new L;let u=new L,d=new L,f=new L,m=new yt,y=new yt,p=new yt,g=new L,_=new L;function x(S,R,U){u.fromArray(s,S*3),d.fromArray(s,R*3),f.fromArray(s,U*3),m.fromArray(o,S*2),y.fromArray(o,R*2),p.fromArray(o,U*2),d.sub(u),f.sub(u),y.sub(m),p.sub(m);let B=1/(y.x*p.y-p.x*y.y);isFinite(B)&&(g.copy(d).multiplyScalar(p.y).addScaledVector(f,-y.y).multiplyScalar(B),_.copy(f).multiplyScalar(y.x).addScaledVector(d,-p.x).multiplyScalar(B),c[S].add(g),c[R].add(g),c[U].add(g),h[S].add(_),h[R].add(_),h[U].add(_))}let b=this.groups;b.length===0&&(b=[{start:0,count:n.length}]);for(let S=0,R=b.length;S<R;++S){let U=b[S],B=U.start,D=U.count;for(let O=B,X=B+D;O<X;O+=3)x(n[O+0],n[O+1],n[O+2])}let T=new L,E=new L,M=new L,I=new L;function w(S){M.fromArray(r,S*3),I.copy(M);let R=c[S];T.copy(R),T.sub(M.multiplyScalar(M.dot(R))).normalize(),E.crossVectors(I,R);let B=E.dot(h[S])<0?-1:1;l[S*4]=T.x,l[S*4+1]=T.y,l[S*4+2]=T.z,l[S*4+3]=B}for(let S=0,R=b.length;S<R;++S){let U=b[S],B=U.start,D=U.count;for(let O=B,X=B+D;O<X;O+=3)w(n[O+0]),w(n[O+1]),w(n[O+2])}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Pe(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let s=new L,r=new L,o=new L,a=new L,l=new L,c=new L,h=new L,u=new L;if(t)for(let d=0,f=t.count;d<f;d+=3){let m=t.getX(d+0),y=t.getX(d+1),p=t.getX(d+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,y),o.fromBufferAttribute(e,p),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,m),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,p),a.add(h),l.add(h),c.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Be.fromBufferAttribute(t,e),Be.normalize(),t.setXYZ(e,Be.x,Be.y,Be.z)}toNonIndexed(){function t(a,l){let c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h),f=0,m=0;for(let y=0,p=l.length;y<p;y++){a.isInterleavedBufferAttribute?f=l[y]*a.data.stride+a.offset:f=l[y]*h;for(let g=0;g<h;g++)d[m++]=c[f++]}return new Pe(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=t(l,n);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let l in n){let c=n[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Vc=new me,mi=new wi,xr=new Yn,Wc=new L,Xi=new L,qi=new L,Yi=new L,ya=new L,yr=new L,_r=new yt,vr=new yt,br=new yt,Xc=new L,qc=new L,Yc=new L,Mr=new L,Er=new L,Y=class extends Ee{constructor(t=new ge,e=new Ze){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){yr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=a[l],u=r[l];h!==0&&(ya.fromBufferAttribute(u,t),o?yr.addScaledVector(ya,h):yr.addScaledVector(ya.sub(e),h))}e.add(yr)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),xr.copy(n.boundingSphere),xr.applyMatrix4(r),mi.copy(t.ray).recast(t.near),!(xr.containsPoint(mi.origin)===!1&&(mi.intersectSphere(xr,Wc)===null||mi.origin.distanceToSquared(Wc)>(t.far-t.near)**2))&&(Vc.copy(r).invert(),mi.copy(t.ray).applyMatrix4(Vc),!(n.boundingBox!==null&&mi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,mi)))}_computeIntersections(t,e,n){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,y=d.length;m<y;m++){let p=d[m],g=o[p.materialIndex],_=Math.max(p.start,f.start),x=Math.min(a.count,Math.min(p.start+p.count,f.start+f.count));for(let b=_,T=x;b<T;b+=3){let E=a.getX(b),M=a.getX(b+1),I=a.getX(b+2);s=wr(this,g,t,n,c,h,u,E,M,I),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let m=Math.max(0,f.start),y=Math.min(a.count,f.start+f.count);for(let p=m,g=y;p<g;p+=3){let _=a.getX(p),x=a.getX(p+1),b=a.getX(p+2);s=wr(this,o,t,n,c,h,u,_,x,b),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let m=0,y=d.length;m<y;m++){let p=d[m],g=o[p.materialIndex],_=Math.max(p.start,f.start),x=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let b=_,T=x;b<T;b+=3){let E=b,M=b+1,I=b+2;s=wr(this,g,t,n,c,h,u,E,M,I),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let m=Math.max(0,f.start),y=Math.min(l.count,f.start+f.count);for(let p=m,g=y;p<g;p+=3){let _=p,x=p+1,b=p+2;s=wr(this,o,t,n,c,h,u,_,x,b),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}};function Jd(i,t,e,n,s,r,o,a){let l;if(t.side===Qe?l=n.intersectTriangle(o,r,s,!0,a):l=n.intersectTriangle(s,r,o,t.side===Xn,a),l===null)return null;Er.copy(a),Er.applyMatrix4(i.matrixWorld);let c=e.ray.origin.distanceTo(Er);return c<e.near||c>e.far?null:{distance:c,point:Er.clone(),object:i}}function wr(i,t,e,n,s,r,o,a,l,c){i.getVertexPosition(a,Xi),i.getVertexPosition(l,qi),i.getVertexPosition(c,Yi);let h=Jd(i,t,e,n,Xi,qi,Yi,Mr);if(h){s&&(_r.fromBufferAttribute(s,a),vr.fromBufferAttribute(s,l),br.fromBufferAttribute(s,c),h.uv=ji.getInterpolation(Mr,Xi,qi,Yi,_r,vr,br,new yt)),r&&(_r.fromBufferAttribute(r,a),vr.fromBufferAttribute(r,l),br.fromBufferAttribute(r,c),h.uv1=ji.getInterpolation(Mr,Xi,qi,Yi,_r,vr,br,new yt),h.uv2=h.uv1),o&&(Xc.fromBufferAttribute(o,a),qc.fromBufferAttribute(o,l),Yc.fromBufferAttribute(o,c),h.normal=ji.getInterpolation(Mr,Xi,qi,Yi,Xc,qc,Yc,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:l,c,normal:new L,materialIndex:0};ji.getNormal(Xi,qi,Yi,u.normal),h.face=u}return h}var ee=class i extends ge{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],h=[],u=[],d=0,f=0;m("z","y","x",-1,-1,n,e,t,o,r,0),m("z","y","x",1,-1,n,e,-t,o,r,1),m("x","z","y",1,1,t,n,e,s,o,2),m("x","z","y",1,-1,t,n,-e,s,o,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new re(c,3)),this.setAttribute("normal",new re(h,3)),this.setAttribute("uv",new re(u,2));function m(y,p,g,_,x,b,T,E,M,I,w){let S=b/M,R=T/I,U=b/2,B=T/2,D=E/2,O=M+1,X=I+1,$=0,Z=0,q=new L;for(let Q=0;Q<X;Q++){let ot=Q*R-B;for(let tt=0;tt<O;tt++){let G=tt*S-U;q[y]=G*_,q[p]=ot*x,q[g]=D,c.push(q.x,q.y,q.z),q[y]=0,q[p]=0,q[g]=E>0?1:-1,h.push(q.x,q.y,q.z),u.push(tt/M),u.push(1-Q/I),$+=1}}for(let Q=0;Q<I;Q++)for(let ot=0;ot<M;ot++){let tt=d+ot+O*Q,G=d+ot+O*(Q+1),rt=d+(ot+1)+O*(Q+1),pt=d+(ot+1)+O*Q;l.push(tt,G,pt),l.push(G,rt,pt),Z+=6}a.addGroup(f,Z,w),f+=Z,d+=$}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function cs(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function en(i){let t={};for(let e=0;e<i.length;e++){let n=cs(i[e]);for(let s in n)t[s]=n[s]}return t}function Kd(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Yh(i){return i.getRenderTarget()===null?i.outputColorSpace:pe.workingColorSpace}var El={clone:cs,merge:en},$d=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,jd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,nn=class extends Zn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=$d,this.fragmentShader=jd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=cs(t.uniforms),this.uniformsGroups=Kd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},$r=class extends Ee{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new me,this.projectionMatrix=new me,this.projectionMatrixInverse=new me,this.coordinateSystem=Wn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ye=class extends $r{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Vr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(ea*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Vr*2*Math.atan(Math.tan(ea*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(ea*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*n/c,s*=o.width/l,n*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Zi=-90,Ji=1,Ba=class extends Ee{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Ye(Zi,Ji,t,e);s.layers=this.layers,this.add(s);let r=new Ye(Zi,Ji,t,e);r.layers=this.layers,this.add(r);let o=new Ye(Zi,Ji,t,e);o.layers=this.layers,this.add(o);let a=new Ye(Zi,Ji,t,e);a.layers=this.layers,this.add(a);let l=new Ye(Zi,Ji,t,e);l.layers=this.layers,this.add(l);let c=new Ye(Zi,Ji,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===Wn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Gr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;let y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=y,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},jr=class extends xn{constructor(t,e,n,s,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:rs,super(t,e,n,s,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Ha=class extends Rn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];e.encoding!==void 0&&(zs("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===Mi?ye:Ge),this.texture=new jr(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:on}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new ee(5,5,5),r=new nn({name:"CubemapFromEquirect",uniforms:cs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Qe,blending:Ln});r.uniforms.tEquirect.value=e;let o=new Y(s,r),a=e.minFilter;return e.minFilter===An&&(e.minFilter=on),new Ba(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,s){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}},_a=new L,Qd=new L,tf=new te,Vn=class{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=_a.subVectors(n,e).cross(Qd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(_a),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||tf.getNormalMatrix(t),s=this.coplanarPoint(_a).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},gi=new Yn,Sr=new L,Bs=class{constructor(t=new Vn,e=new Vn,n=new Vn,s=new Vn,r=new Vn,o=new Vn){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Wn){let n=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],h=s[5],u=s[6],d=s[7],f=s[8],m=s[9],y=s[10],p=s[11],g=s[12],_=s[13],x=s[14],b=s[15];if(n[0].setComponents(l-r,d-c,p-f,b-g).normalize(),n[1].setComponents(l+r,d+c,p+f,b+g).normalize(),n[2].setComponents(l+o,d+h,p+m,b+_).normalize(),n[3].setComponents(l-o,d-h,p-m,b-_).normalize(),n[4].setComponents(l-a,d-u,p-y,b-x).normalize(),e===Wn)n[5].setComponents(l+a,d+u,p+y,b+x).normalize();else if(e===Gr)n[5].setComponents(a,u,y,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),gi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),gi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(gi)}intersectsSprite(t){return gi.center.set(0,0,0),gi.radius=.7071067811865476,gi.applyMatrix4(t.matrixWorld),this.intersectsSphere(gi)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(Sr.x=s.normal.x>0?t.max.x:t.min.x,Sr.y=s.normal.y>0?t.max.y:t.min.y,Sr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Sr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Zh(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function ef(i,t){let e=t.isWebGL2,n=new WeakMap;function s(c,h){let u=c.array,d=c.usage,f=u.byteLength,m=i.createBuffer();i.bindBuffer(h,m),i.bufferData(h,u,d),c.onUploadCallback();let y;if(u instanceof Float32Array)y=i.FLOAT;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(e)y=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else y=i.UNSIGNED_SHORT;else if(u instanceof Int16Array)y=i.SHORT;else if(u instanceof Uint32Array)y=i.UNSIGNED_INT;else if(u instanceof Int32Array)y=i.INT;else if(u instanceof Int8Array)y=i.BYTE;else if(u instanceof Uint8Array)y=i.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)y=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:m,type:y,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version,size:f}}function r(c,h,u){let d=h.array,f=h._updateRange,m=h.updateRanges;if(i.bindBuffer(u,c),f.count===-1&&m.length===0&&i.bufferSubData(u,0,d),m.length!==0){for(let y=0,p=m.length;y<p;y++){let g=m[y];e?i.bufferSubData(u,g.start*d.BYTES_PER_ELEMENT,d,g.start,g.count):i.bufferSubData(u,g.start*d.BYTES_PER_ELEMENT,d.subarray(g.start,g.start+g.count))}h.clearUpdateRanges()}f.count!==-1&&(e?i.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d,f.offset,f.count):i.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d.subarray(f.offset,f.offset+f.count)),f.count=-1),h.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);let h=n.get(c);h&&(i.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){let d=n.get(c);(!d||d.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);let u=n.get(c);if(u===void 0)n.set(c,s(c,h));else if(u.version<c.version){if(u.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,c,h),u.version=c.version}}return{get:o,remove:a,update:l}}var oe=class i extends ge{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(s),c=a+1,h=l+1,u=t/a,d=e/l,f=[],m=[],y=[],p=[];for(let g=0;g<h;g++){let _=g*d-o;for(let x=0;x<c;x++){let b=x*u-r;m.push(b,-_,0),y.push(0,0,1),p.push(x/a),p.push(1-g/l)}}for(let g=0;g<l;g++)for(let _=0;_<a;_++){let x=_+c*g,b=_+c*(g+1),T=_+1+c*(g+1),E=_+1+c*g;f.push(x,b,E),f.push(b,T,E)}this.setIndex(f),this.setAttribute("position",new re(m,3)),this.setAttribute("normal",new re(y,3)),this.setAttribute("uv",new re(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},nf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,sf=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,rf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,of=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,af=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,lf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,cf=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,hf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,uf=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,df=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,ff=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,pf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,mf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,gf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,xf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,yf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,_f=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,vf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,bf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Mf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ef=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,wf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Sf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Tf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Af=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Rf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Cf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Pf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Lf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,If=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Df="gl_FragColor = linearToOutputTexel( gl_FragColor );",zf=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Uf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,kf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Nf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Ff=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Of=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Bf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Hf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Gf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Vf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Wf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Xf=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,qf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Yf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Zf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Jf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Kf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,$f=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,jf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Qf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,tp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ep=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,np=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ip=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,sp=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,rp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,op=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ap=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,lp=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,cp=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,hp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,up=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,dp=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,fp=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,pp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,mp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,gp=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,xp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,yp=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,_p=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,vp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,bp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Mp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ep=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Sp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Tp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ap=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Rp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Cp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Pp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Lp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Ip=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Dp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,zp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Up=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,kp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Np=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Fp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Op=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Bp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Hp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Gp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Vp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Wp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Xp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,qp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Yp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Zp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Jp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Kp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,$p=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,jp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Qp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,t0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,e0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,n0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,i0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,s0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,r0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,o0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,a0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,l0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,c0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,h0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,u0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,d0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,f0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,p0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,m0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,g0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,x0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,y0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,_0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,v0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,b0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,M0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,E0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,w0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,S0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,T0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,A0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,R0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,C0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,P0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,L0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,I0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,D0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,z0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,U0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$t={alphahash_fragment:nf,alphahash_pars_fragment:sf,alphamap_fragment:rf,alphamap_pars_fragment:of,alphatest_fragment:af,alphatest_pars_fragment:lf,aomap_fragment:cf,aomap_pars_fragment:hf,batching_pars_vertex:uf,batching_vertex:df,begin_vertex:ff,beginnormal_vertex:pf,bsdfs:mf,iridescence_fragment:gf,bumpmap_pars_fragment:xf,clipping_planes_fragment:yf,clipping_planes_pars_fragment:_f,clipping_planes_pars_vertex:vf,clipping_planes_vertex:bf,color_fragment:Mf,color_pars_fragment:Ef,color_pars_vertex:wf,color_vertex:Sf,common:Tf,cube_uv_reflection_fragment:Af,defaultnormal_vertex:Rf,displacementmap_pars_vertex:Cf,displacementmap_vertex:Pf,emissivemap_fragment:Lf,emissivemap_pars_fragment:If,colorspace_fragment:Df,colorspace_pars_fragment:zf,envmap_fragment:Uf,envmap_common_pars_fragment:kf,envmap_pars_fragment:Nf,envmap_pars_vertex:Ff,envmap_physical_pars_fragment:Kf,envmap_vertex:Of,fog_vertex:Bf,fog_pars_vertex:Hf,fog_fragment:Gf,fog_pars_fragment:Vf,gradientmap_pars_fragment:Wf,lightmap_fragment:Xf,lightmap_pars_fragment:qf,lights_lambert_fragment:Yf,lights_lambert_pars_fragment:Zf,lights_pars_begin:Jf,lights_toon_fragment:$f,lights_toon_pars_fragment:jf,lights_phong_fragment:Qf,lights_phong_pars_fragment:tp,lights_physical_fragment:ep,lights_physical_pars_fragment:np,lights_fragment_begin:ip,lights_fragment_maps:sp,lights_fragment_end:rp,logdepthbuf_fragment:op,logdepthbuf_pars_fragment:ap,logdepthbuf_pars_vertex:lp,logdepthbuf_vertex:cp,map_fragment:hp,map_pars_fragment:up,map_particle_fragment:dp,map_particle_pars_fragment:fp,metalnessmap_fragment:pp,metalnessmap_pars_fragment:mp,morphcolor_vertex:gp,morphnormal_vertex:xp,morphtarget_pars_vertex:yp,morphtarget_vertex:_p,normal_fragment_begin:vp,normal_fragment_maps:bp,normal_pars_fragment:Mp,normal_pars_vertex:Ep,normal_vertex:wp,normalmap_pars_fragment:Sp,clearcoat_normal_fragment_begin:Tp,clearcoat_normal_fragment_maps:Ap,clearcoat_pars_fragment:Rp,iridescence_pars_fragment:Cp,opaque_fragment:Pp,packing:Lp,premultiplied_alpha_fragment:Ip,project_vertex:Dp,dithering_fragment:zp,dithering_pars_fragment:Up,roughnessmap_fragment:kp,roughnessmap_pars_fragment:Np,shadowmap_pars_fragment:Fp,shadowmap_pars_vertex:Op,shadowmap_vertex:Bp,shadowmask_pars_fragment:Hp,skinbase_vertex:Gp,skinning_pars_vertex:Vp,skinning_vertex:Wp,skinnormal_vertex:Xp,specularmap_fragment:qp,specularmap_pars_fragment:Yp,tonemapping_fragment:Zp,tonemapping_pars_fragment:Jp,transmission_fragment:Kp,transmission_pars_fragment:$p,uv_pars_fragment:jp,uv_pars_vertex:Qp,uv_vertex:t0,worldpos_vertex:e0,background_vert:n0,background_frag:i0,backgroundCube_vert:s0,backgroundCube_frag:r0,cube_vert:o0,cube_frag:a0,depth_vert:l0,depth_frag:c0,distanceRGBA_vert:h0,distanceRGBA_frag:u0,equirect_vert:d0,equirect_frag:f0,linedashed_vert:p0,linedashed_frag:m0,meshbasic_vert:g0,meshbasic_frag:x0,meshlambert_vert:y0,meshlambert_frag:_0,meshmatcap_vert:v0,meshmatcap_frag:b0,meshnormal_vert:M0,meshnormal_frag:E0,meshphong_vert:w0,meshphong_frag:S0,meshphysical_vert:T0,meshphysical_frag:A0,meshtoon_vert:R0,meshtoon_frag:C0,points_vert:P0,points_frag:L0,shadow_vert:I0,shadow_frag:D0,sprite_vert:z0,sprite_frag:U0},vt={common:{diffuse:{value:new Zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new te},alphaMap:{value:null},alphaMapTransform:{value:new te},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new te}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new te}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new te}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new te},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new te},normalScale:{value:new yt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new te},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new te}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new te}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new te}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new te},alphaTest:{value:0},uvTransform:{value:new te}},sprite:{diffuse:{value:new Zt(16777215)},opacity:{value:1},center:{value:new yt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new te},alphaMap:{value:null},alphaMapTransform:{value:new te},alphaTest:{value:0}}},Pn={basic:{uniforms:en([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.fog]),vertexShader:$t.meshbasic_vert,fragmentShader:$t.meshbasic_frag},lambert:{uniforms:en([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,vt.lights,{emissive:{value:new Zt(0)}}]),vertexShader:$t.meshlambert_vert,fragmentShader:$t.meshlambert_frag},phong:{uniforms:en([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,vt.lights,{emissive:{value:new Zt(0)},specular:{value:new Zt(1118481)},shininess:{value:30}}]),vertexShader:$t.meshphong_vert,fragmentShader:$t.meshphong_frag},standard:{uniforms:en([vt.common,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.roughnessmap,vt.metalnessmap,vt.fog,vt.lights,{emissive:{value:new Zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag},toon:{uniforms:en([vt.common,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.gradientmap,vt.fog,vt.lights,{emissive:{value:new Zt(0)}}]),vertexShader:$t.meshtoon_vert,fragmentShader:$t.meshtoon_frag},matcap:{uniforms:en([vt.common,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,{matcap:{value:null}}]),vertexShader:$t.meshmatcap_vert,fragmentShader:$t.meshmatcap_frag},points:{uniforms:en([vt.points,vt.fog]),vertexShader:$t.points_vert,fragmentShader:$t.points_frag},dashed:{uniforms:en([vt.common,vt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:$t.linedashed_vert,fragmentShader:$t.linedashed_frag},depth:{uniforms:en([vt.common,vt.displacementmap]),vertexShader:$t.depth_vert,fragmentShader:$t.depth_frag},normal:{uniforms:en([vt.common,vt.bumpmap,vt.normalmap,vt.displacementmap,{opacity:{value:1}}]),vertexShader:$t.meshnormal_vert,fragmentShader:$t.meshnormal_frag},sprite:{uniforms:en([vt.sprite,vt.fog]),vertexShader:$t.sprite_vert,fragmentShader:$t.sprite_frag},background:{uniforms:{uvTransform:{value:new te},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:$t.background_vert,fragmentShader:$t.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:$t.backgroundCube_vert,fragmentShader:$t.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:$t.cube_vert,fragmentShader:$t.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:$t.equirect_vert,fragmentShader:$t.equirect_frag},distanceRGBA:{uniforms:en([vt.common,vt.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:$t.distanceRGBA_vert,fragmentShader:$t.distanceRGBA_frag},shadow:{uniforms:en([vt.lights,vt.fog,{color:{value:new Zt(0)},opacity:{value:1}}]),vertexShader:$t.shadow_vert,fragmentShader:$t.shadow_frag}};Pn.physical={uniforms:en([Pn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new te},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new te},clearcoatNormalScale:{value:new yt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new te},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new te},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new te},sheen:{value:0},sheenColor:{value:new Zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new te},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new te},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new te},transmissionSamplerSize:{value:new yt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new te},attenuationDistance:{value:0},attenuationColor:{value:new Zt(0)},specularColor:{value:new Zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new te},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new te},anisotropyVector:{value:new yt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new te}}]),vertexShader:$t.meshphysical_vert,fragmentShader:$t.meshphysical_frag};var Tr={r:0,b:0,g:0};function k0(i,t,e,n,s,r,o){let a=new Zt(0),l=r===!0?0:1,c,h,u=null,d=0,f=null;function m(p,g){let _=!1,x=g.isScene===!0?g.background:null;x&&x.isTexture&&(x=(g.backgroundBlurriness>0?e:t).get(x)),x===null?y(a,l):x&&x.isColor&&(y(x,1),_=!0);let b=i.xr.getEnvironmentBlendMode();b==="additive"?n.buffers.color.setClear(0,0,0,1,o):b==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||_)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),x&&(x.isCubeTexture||x.mapping===vo)?(h===void 0&&(h=new Y(new ee(1,1,1),new nn({name:"BackgroundCubeMaterial",uniforms:cs(Pn.backgroundCube.uniforms),vertexShader:Pn.backgroundCube.vertexShader,fragmentShader:Pn.backgroundCube.fragmentShader,side:Qe,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,E,M){this.matrixWorld.copyPosition(M.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=g.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,h.material.toneMapped=pe.getTransfer(x.colorSpace)!==xe,(u!==x||d!==x.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=x,d=x.version,f=i.toneMapping),h.layers.enableAll(),p.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new Y(new oe(2,2),new nn({name:"BackgroundMaterial",uniforms:cs(Pn.background.uniforms),vertexShader:Pn.background.vertexShader,fragmentShader:Pn.background.fragmentShader,side:Xn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,c.material.toneMapped=pe.getTransfer(x.colorSpace)!==xe,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||d!==x.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=x,d=x.version,f=i.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function y(p,g){p.getRGB(Tr,Yh(i)),n.buffers.color.setClear(Tr.r,Tr.g,Tr.b,g,o)}return{getClearColor:function(){return a},setClearColor:function(p,g=1){a.set(p),l=g,y(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,y(a,l)},render:m}}function N0(i,t,e,n){let s=i.getParameter(i.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:t.get("OES_vertex_array_object"),o=n.isWebGL2||r!==null,a={},l=p(null),c=l,h=!1;function u(D,O,X,$,Z){let q=!1;if(o){let Q=y($,X,O);c!==Q&&(c=Q,f(c.object)),q=g(D,$,X,Z),q&&_(D,$,X,Z)}else{let Q=O.wireframe===!0;(c.geometry!==$.id||c.program!==X.id||c.wireframe!==Q)&&(c.geometry=$.id,c.program=X.id,c.wireframe=Q,q=!0)}Z!==null&&e.update(Z,i.ELEMENT_ARRAY_BUFFER),(q||h)&&(h=!1,I(D,O,X,$),Z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(Z).buffer))}function d(){return n.isWebGL2?i.createVertexArray():r.createVertexArrayOES()}function f(D){return n.isWebGL2?i.bindVertexArray(D):r.bindVertexArrayOES(D)}function m(D){return n.isWebGL2?i.deleteVertexArray(D):r.deleteVertexArrayOES(D)}function y(D,O,X){let $=X.wireframe===!0,Z=a[D.id];Z===void 0&&(Z={},a[D.id]=Z);let q=Z[O.id];q===void 0&&(q={},Z[O.id]=q);let Q=q[$];return Q===void 0&&(Q=p(d()),q[$]=Q),Q}function p(D){let O=[],X=[],$=[];for(let Z=0;Z<s;Z++)O[Z]=0,X[Z]=0,$[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:X,attributeDivisors:$,object:D,attributes:{},index:null}}function g(D,O,X,$){let Z=c.attributes,q=O.attributes,Q=0,ot=X.getAttributes();for(let tt in ot)if(ot[tt].location>=0){let rt=Z[tt],pt=q[tt];if(pt===void 0&&(tt==="instanceMatrix"&&D.instanceMatrix&&(pt=D.instanceMatrix),tt==="instanceColor"&&D.instanceColor&&(pt=D.instanceColor)),rt===void 0||rt.attribute!==pt||pt&&rt.data!==pt.data)return!0;Q++}return c.attributesNum!==Q||c.index!==$}function _(D,O,X,$){let Z={},q=O.attributes,Q=0,ot=X.getAttributes();for(let tt in ot)if(ot[tt].location>=0){let rt=q[tt];rt===void 0&&(tt==="instanceMatrix"&&D.instanceMatrix&&(rt=D.instanceMatrix),tt==="instanceColor"&&D.instanceColor&&(rt=D.instanceColor));let pt={};pt.attribute=rt,rt&&rt.data&&(pt.data=rt.data),Z[tt]=pt,Q++}c.attributes=Z,c.attributesNum=Q,c.index=$}function x(){let D=c.newAttributes;for(let O=0,X=D.length;O<X;O++)D[O]=0}function b(D){T(D,0)}function T(D,O){let X=c.newAttributes,$=c.enabledAttributes,Z=c.attributeDivisors;X[D]=1,$[D]===0&&(i.enableVertexAttribArray(D),$[D]=1),Z[D]!==O&&((n.isWebGL2?i:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](D,O),Z[D]=O)}function E(){let D=c.newAttributes,O=c.enabledAttributes;for(let X=0,$=O.length;X<$;X++)O[X]!==D[X]&&(i.disableVertexAttribArray(X),O[X]=0)}function M(D,O,X,$,Z,q,Q){Q===!0?i.vertexAttribIPointer(D,O,X,Z,q):i.vertexAttribPointer(D,O,X,$,Z,q)}function I(D,O,X,$){if(n.isWebGL2===!1&&(D.isInstancedMesh||$.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;x();let Z=$.attributes,q=X.getAttributes(),Q=O.defaultAttributeValues;for(let ot in q){let tt=q[ot];if(tt.location>=0){let G=Z[ot];if(G===void 0&&(ot==="instanceMatrix"&&D.instanceMatrix&&(G=D.instanceMatrix),ot==="instanceColor"&&D.instanceColor&&(G=D.instanceColor)),G!==void 0){let rt=G.normalized,pt=G.itemSize,gt=e.get(G);if(gt===void 0)continue;let wt=gt.buffer,Ut=gt.type,Nt=gt.bytesPerElement,Ct=n.isWebGL2===!0&&(Ut===i.INT||Ut===i.UNSIGNED_INT||G.gpuType===Uh);if(G.isInterleavedBufferAttribute){let Ft=G.data,v=Ft.stride,z=G.offset;if(Ft.isInstancedInterleavedBuffer){for(let k=0;k<tt.locationSize;k++)T(tt.location+k,Ft.meshPerAttribute);D.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=Ft.meshPerAttribute*Ft.count)}else for(let k=0;k<tt.locationSize;k++)b(tt.location+k);i.bindBuffer(i.ARRAY_BUFFER,wt);for(let k=0;k<tt.locationSize;k++)M(tt.location+k,pt/tt.locationSize,Ut,rt,v*Nt,(z+pt/tt.locationSize*k)*Nt,Ct)}else{if(G.isInstancedBufferAttribute){for(let Ft=0;Ft<tt.locationSize;Ft++)T(tt.location+Ft,G.meshPerAttribute);D.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=G.meshPerAttribute*G.count)}else for(let Ft=0;Ft<tt.locationSize;Ft++)b(tt.location+Ft);i.bindBuffer(i.ARRAY_BUFFER,wt);for(let Ft=0;Ft<tt.locationSize;Ft++)M(tt.location+Ft,pt/tt.locationSize,Ut,rt,pt*Nt,pt/tt.locationSize*Ft*Nt,Ct)}}else if(Q!==void 0){let rt=Q[ot];if(rt!==void 0)switch(rt.length){case 2:i.vertexAttrib2fv(tt.location,rt);break;case 3:i.vertexAttrib3fv(tt.location,rt);break;case 4:i.vertexAttrib4fv(tt.location,rt);break;default:i.vertexAttrib1fv(tt.location,rt)}}}}E()}function w(){U();for(let D in a){let O=a[D];for(let X in O){let $=O[X];for(let Z in $)m($[Z].object),delete $[Z];delete O[X]}delete a[D]}}function S(D){if(a[D.id]===void 0)return;let O=a[D.id];for(let X in O){let $=O[X];for(let Z in $)m($[Z].object),delete $[Z];delete O[X]}delete a[D.id]}function R(D){for(let O in a){let X=a[O];if(X[D.id]===void 0)continue;let $=X[D.id];for(let Z in $)m($[Z].object),delete $[Z];delete X[D.id]}}function U(){B(),h=!0,c!==l&&(c=l,f(c.object))}function B(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:u,reset:U,resetDefaultState:B,dispose:w,releaseStatesOfGeometry:S,releaseStatesOfProgram:R,initAttributes:x,enableAttribute:b,disableUnusedAttributes:E}}function F0(i,t,e,n){let s=n.isWebGL2,r;function o(h){r=h}function a(h,u){i.drawArrays(r,h,u),e.update(u,r,1)}function l(h,u,d){if(d===0)return;let f,m;if(s)f=i,m="drawArraysInstanced";else if(f=t.get("ANGLE_instanced_arrays"),m="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[m](r,h,u,d),e.update(u,r,d)}function c(h,u,d){if(d===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<d;m++)this.render(h[m],u[m]);else{f.multiDrawArraysWEBGL(r,h,0,u,0,d);let m=0;for(let y=0;y<d;y++)m+=u[y];e.update(m,r,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function O0(i,t,e){let n;function s(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){let M=t.get("EXT_texture_filter_anisotropic");n=i.getParameter(M.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(M){if(M==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";M="mediump"}return M==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let o=typeof WebGL2RenderingContext!="undefined"&&i.constructor.name==="WebGL2RenderingContext",a=e.precision!==void 0?e.precision:"highp",l=r(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);let c=o||t.has("WEBGL_draw_buffers"),h=e.logarithmicDepthBuffer===!0,u=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),d=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),y=i.getParameter(i.MAX_VERTEX_ATTRIBS),p=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),g=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),x=d>0,b=o||t.has("OES_texture_float"),T=x&&b,E=o?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:f,maxCubemapSize:m,maxAttributes:y,maxVertexUniforms:p,maxVaryings:g,maxFragmentUniforms:_,vertexTextures:x,floatFragmentTextures:b,floatVertexTextures:T,maxSamples:E}}function B0(i){let t=this,e=null,n=0,s=!1,r=!1,o=new Vn,a=new te,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){let m=u.clippingPlanes,y=u.clipIntersection,p=u.clipShadows,g=i.get(u);if(!s||m===null||m.length===0||r&&!p)r?h(null):c();else{let _=r?0:n,x=_*4,b=g.clippingState||null;l.value=b,b=h(m,d,x,f);for(let T=0;T!==x;++T)b[T]=e[T];g.clippingState=b,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=_}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,m){let y=u!==null?u.length:0,p=null;if(y!==0){if(p=l.value,m!==!0||p===null){let g=f+y*4,_=d.matrixWorldInverse;a.getNormalMatrix(_),(p===null||p.length<g)&&(p=new Float32Array(g));for(let x=0,b=f;x!==y;++x,b+=4)o.copy(u[x]).applyMatrix4(_,a),o.normal.toArray(p,b),p[b+3]=o.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,p}}function H0(i){let t=new WeakMap;function e(o,a){return a===Da?o.mapping=rs:a===za&&(o.mapping=os),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Da||a===za)if(t.has(o)){let l=t.get(o).texture;return e(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new Ha(l.height/2);return c.fromEquirectangularTexture(i,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var hs=class extends $r{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,o=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Qi=4,Zc=[.125,.215,.35,.446,.526,.582],_i=20,va=new hs,Jc=new Zt,ba=null,Ma=0,Ea=0,xi=(1+Math.sqrt(5))/2,Ki=1/xi,Kc=[new L(1,1,1),new L(-1,1,1),new L(1,1,-1),new L(-1,1,-1),new L(0,xi,Ki),new L(0,xi,-Ki),new L(Ki,0,xi),new L(-Ki,0,xi),new L(xi,Ki,0),new L(-xi,Ki,0)],Qr=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){ba=this._renderer.getRenderTarget(),Ma=this._renderer.getActiveCubeFace(),Ea=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Qc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=jc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ba,Ma,Ea),t.scissorTest=!1,Ar(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===rs||t.mapping===os?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ba=this._renderer.getRenderTarget(),Ma=this._renderer.getActiveCubeFace(),Ea=this._renderer.getActiveMipmapLevel();let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:on,minFilter:on,generateMipmaps:!1,type:Ei,format:Tn,colorSpace:qn,depthBuffer:!1},s=$c(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=$c(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=G0(r)),this._blurMaterial=V0(r,t,e)}return s}_compileMaterial(t){let e=new Y(this._lodPlanes[0],t);this._renderer.compile(e,va)}_sceneToCubeUV(t,e,n,s){let a=new Ye(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Jc),h.toneMapping=oi,h.autoClear=!1;let f=new Ze({name:"PMREM.Background",side:Qe,depthWrite:!1,depthTest:!1}),m=new Y(new ee,f),y=!1,p=t.background;p?p.isColor&&(f.color.copy(p),t.background=null,y=!0):(f.color.copy(Jc),y=!0);for(let g=0;g<6;g++){let _=g%3;_===0?(a.up.set(0,l[g],0),a.lookAt(c[g],0,0)):_===1?(a.up.set(0,0,l[g]),a.lookAt(0,c[g],0)):(a.up.set(0,l[g],0),a.lookAt(0,0,c[g]));let x=this._cubeSize;Ar(s,_*x,g>2?x:0,x,x),h.setRenderTarget(s),y&&h.render(m,a),h.render(t,a)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=p}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===rs||t.mapping===os;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Qc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=jc());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new Y(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;Ar(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,va)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){let r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Kc[(s-1)%Kc.length];this._blur(t,s-1,s,r,o)}e.autoClear=n}_blur(t,e,n,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Y(this._lodPlanes[s],c),d=c.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*_i-1),y=r/m,p=isFinite(r)?1+Math.floor(h*y):_i;p>_i&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${_i}`);let g=[],_=0;for(let M=0;M<_i;++M){let I=M/y,w=Math.exp(-I*I/2);g.push(w),M===0?_+=w:M<p&&(_+=2*w)}for(let M=0;M<g.length;M++)g[M]=g[M]/_;d.envMap.value=t.texture,d.samples.value=p,d.weights.value=g,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:x}=this;d.dTheta.value=m,d.mipInt.value=x-n;let b=this._sizeLods[s],T=3*b*(s>x-Qi?s-x+Qi:0),E=4*(this._cubeSize-b);Ar(e,T,E,3*b,2*b),l.setRenderTarget(e),l.render(u,va)}};function G0(i){let t=[],e=[],n=[],s=i,r=i-Qi+1+Zc.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let l=1/a;o>i-Qi?l=Zc[o-i+Qi-1]:o===0&&(l=0),n.push(l);let c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,m=6,y=3,p=2,g=1,_=new Float32Array(y*m*f),x=new Float32Array(p*m*f),b=new Float32Array(g*m*f);for(let E=0;E<f;E++){let M=E%3*2/3-1,I=E>2?0:-1,w=[M,I,0,M+2/3,I,0,M+2/3,I+1,0,M,I,0,M+2/3,I+1,0,M,I+1,0];_.set(w,y*m*E),x.set(d,p*m*E);let S=[E,E,E,E,E,E];b.set(S,g*m*E)}let T=new ge;T.setAttribute("position",new Pe(_,y)),T.setAttribute("uv",new Pe(x,p)),T.setAttribute("faceIndex",new Pe(b,g)),t.push(T),s>Qi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function $c(i,t,e){let n=new Rn(i,t,e);return n.texture.mapping=vo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ar(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function V0(i,t,e){let n=new Float32Array(_i),s=new L(0,1,0);return new nn({name:"SphericalGaussianBlur",defines:{n:_i,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:wl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function jc(){return new nn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:wl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function Qc(){return new nn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:wl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function wl(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function W0(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){let l=a.mapping,c=l===Da||l===za,h=l===rs||l===os;if(c||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=t.get(a);return e===null&&(e=new Qr(i)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),t.set(a,u),u.texture}else{if(t.has(a))return t.get(a).texture;{let u=a.image;if(c&&u&&u.height>0||h&&u&&s(u)){e===null&&(e=new Qr(i));let d=c?e.fromEquirectangular(a):e.fromCubemap(a);return t.set(a,d),a.addEventListener("dispose",r),d.texture}else return null}}}return a}function s(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function X0(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){let s=e(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function q0(i,t,e,n){let s={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&t.remove(d.index);for(let m in d.attributes)t.remove(d.attributes[m]);for(let m in d.morphAttributes){let y=d.morphAttributes[m];for(let p=0,g=y.length;p<g;p++)t.remove(y[p])}d.removeEventListener("dispose",o),delete s[d.id];let f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function l(u){let d=u.attributes;for(let m in d)t.update(d[m],i.ARRAY_BUFFER);let f=u.morphAttributes;for(let m in f){let y=f[m];for(let p=0,g=y.length;p<g;p++)t.update(y[p],i.ARRAY_BUFFER)}}function c(u){let d=[],f=u.index,m=u.attributes.position,y=0;if(f!==null){let _=f.array;y=f.version;for(let x=0,b=_.length;x<b;x+=3){let T=_[x+0],E=_[x+1],M=_[x+2];d.push(T,E,E,M,M,T)}}else if(m!==void 0){let _=m.array;y=m.version;for(let x=0,b=_.length/3-1;x<b;x+=3){let T=x+0,E=x+1,M=x+2;d.push(T,E,E,M,M,T)}}else return;let p=new(Xh(d)?Kr:Jr)(d,1);p.version=y;let g=r.get(u);g&&t.remove(g),r.set(u,p)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Y0(i,t,e,n){let s=n.isWebGL2,r;function o(f){r=f}let a,l;function c(f){a=f.type,l=f.bytesPerElement}function h(f,m){i.drawElements(r,m,a,f*l),e.update(m,r,1)}function u(f,m,y){if(y===0)return;let p,g;if(s)p=i,g="drawElementsInstanced";else if(p=t.get("ANGLE_instanced_arrays"),g="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[g](r,m,a,f*l,y),e.update(m,r,y)}function d(f,m,y){if(y===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<y;g++)this.render(f[g]/l,m[g]);else{p.multiDrawElementsWEBGL(r,m,0,a,f,0,y);let g=0;for(let _=0;_<y;_++)g+=m[_];e.update(g,r,1)}}this.setMode=o,this.setIndex=c,this.render=h,this.renderInstances=u,this.renderMultiDraw=d}function Z0(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function J0(i,t){return i[0]-t[0]}function K0(i,t){return Math.abs(t[1])-Math.abs(i[1])}function $0(i,t,e){let n={},s=new Float32Array(8),r=new WeakMap,o=new Me,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,h,u){let d=c.morphTargetInfluences;if(t.isWebGL2===!0){let f=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,m=f!==void 0?f.length:0,y=r.get(h);if(y===void 0||y.count!==m){let D=function(){U.dispose(),r.delete(h),h.removeEventListener("dispose",D)};y!==void 0&&y.texture.dispose();let _=h.morphAttributes.position!==void 0,x=h.morphAttributes.normal!==void 0,b=h.morphAttributes.color!==void 0,T=h.morphAttributes.position||[],E=h.morphAttributes.normal||[],M=h.morphAttributes.color||[],I=0;_===!0&&(I=1),x===!0&&(I=2),b===!0&&(I=3);let w=h.attributes.position.count*I,S=1;w>t.maxTextureSize&&(S=Math.ceil(w/t.maxTextureSize),w=t.maxTextureSize);let R=new Float32Array(w*S*4*m),U=new Yr(R,w,S,m);U.type=ri,U.needsUpdate=!0;let B=I*4;for(let O=0;O<m;O++){let X=T[O],$=E[O],Z=M[O],q=w*S*4*O;for(let Q=0;Q<X.count;Q++){let ot=Q*B;_===!0&&(o.fromBufferAttribute(X,Q),R[q+ot+0]=o.x,R[q+ot+1]=o.y,R[q+ot+2]=o.z,R[q+ot+3]=0),x===!0&&(o.fromBufferAttribute($,Q),R[q+ot+4]=o.x,R[q+ot+5]=o.y,R[q+ot+6]=o.z,R[q+ot+7]=0),b===!0&&(o.fromBufferAttribute(Z,Q),R[q+ot+8]=o.x,R[q+ot+9]=o.y,R[q+ot+10]=o.z,R[q+ot+11]=Z.itemSize===4?o.w:1)}}y={count:m,texture:U,size:new yt(w,S)},r.set(h,y),h.addEventListener("dispose",D)}let p=0;for(let _=0;_<d.length;_++)p+=d[_];let g=h.morphTargetsRelative?1:1-p;u.getUniforms().setValue(i,"morphTargetBaseInfluence",g),u.getUniforms().setValue(i,"morphTargetInfluences",d),u.getUniforms().setValue(i,"morphTargetsTexture",y.texture,e),u.getUniforms().setValue(i,"morphTargetsTextureSize",y.size)}else{let f=d===void 0?0:d.length,m=n[h.id];if(m===void 0||m.length!==f){m=[];for(let x=0;x<f;x++)m[x]=[x,0];n[h.id]=m}for(let x=0;x<f;x++){let b=m[x];b[0]=x,b[1]=d[x]}m.sort(K0);for(let x=0;x<8;x++)x<f&&m[x][1]?(a[x][0]=m[x][0],a[x][1]=m[x][1]):(a[x][0]=Number.MAX_SAFE_INTEGER,a[x][1]=0);a.sort(J0);let y=h.morphAttributes.position,p=h.morphAttributes.normal,g=0;for(let x=0;x<8;x++){let b=a[x],T=b[0],E=b[1];T!==Number.MAX_SAFE_INTEGER&&E?(y&&h.getAttribute("morphTarget"+x)!==y[T]&&h.setAttribute("morphTarget"+x,y[T]),p&&h.getAttribute("morphNormal"+x)!==p[T]&&h.setAttribute("morphNormal"+x,p[T]),s[x]=E,g+=E):(y&&h.hasAttribute("morphTarget"+x)===!0&&h.deleteAttribute("morphTarget"+x),p&&h.hasAttribute("morphNormal"+x)===!0&&h.deleteAttribute("morphNormal"+x),s[x]=0)}let _=h.morphTargetsRelative?1:1-g;u.getUniforms().setValue(i,"morphTargetBaseInfluence",_),u.getUniforms().setValue(i,"morphTargetInfluences",s)}}return{update:l}}function j0(i,t,e,n){let s=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,u=t.get(l,h);if(s.get(u)!==c&&(t.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function o(){s=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}var to=class extends xn{constructor(t,e,n,s,r,o,a,l,c,h){if(h=h!==void 0?h:bi,h!==bi&&h!==as)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===bi&&(n=si),n===void 0&&h===as&&(n=vi),super(null,s,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:He,this.minFilter=l!==void 0?l:He,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},Jh=new xn,Kh=new to(1,1);Kh.compareFunction=Wh;var $h=new Yr,jh=new Oa,Qh=new jr,th=[],eh=[],nh=new Float32Array(16),ih=new Float32Array(9),sh=new Float32Array(4);function ms(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=th[s];if(r===void 0&&(r=new Float32Array(s),th[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function Ue(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function ke(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Mo(i,t){let e=eh[t];e===void 0&&(e=new Int32Array(t),eh[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Q0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function tm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ue(e,t))return;i.uniform2fv(this.addr,t),ke(e,t)}}function em(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ue(e,t))return;i.uniform3fv(this.addr,t),ke(e,t)}}function nm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ue(e,t))return;i.uniform4fv(this.addr,t),ke(e,t)}}function im(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ue(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),ke(e,t)}else{if(Ue(e,n))return;sh.set(n),i.uniformMatrix2fv(this.addr,!1,sh),ke(e,n)}}function sm(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ue(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),ke(e,t)}else{if(Ue(e,n))return;ih.set(n),i.uniformMatrix3fv(this.addr,!1,ih),ke(e,n)}}function rm(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(Ue(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),ke(e,t)}else{if(Ue(e,n))return;nh.set(n),i.uniformMatrix4fv(this.addr,!1,nh),ke(e,n)}}function om(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function am(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ue(e,t))return;i.uniform2iv(this.addr,t),ke(e,t)}}function lm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ue(e,t))return;i.uniform3iv(this.addr,t),ke(e,t)}}function cm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ue(e,t))return;i.uniform4iv(this.addr,t),ke(e,t)}}function hm(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function um(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ue(e,t))return;i.uniform2uiv(this.addr,t),ke(e,t)}}function dm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ue(e,t))return;i.uniform3uiv(this.addr,t),ke(e,t)}}function fm(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ue(e,t))return;i.uniform4uiv(this.addr,t),ke(e,t)}}function pm(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r=this.type===i.SAMPLER_2D_SHADOW?Kh:Jh;e.setTexture2D(t||r,s)}function mm(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||jh,s)}function gm(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Qh,s)}function xm(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||$h,s)}function ym(i){switch(i){case 5126:return Q0;case 35664:return tm;case 35665:return em;case 35666:return nm;case 35674:return im;case 35675:return sm;case 35676:return rm;case 5124:case 35670:return om;case 35667:case 35671:return am;case 35668:case 35672:return lm;case 35669:case 35673:return cm;case 5125:return hm;case 36294:return um;case 36295:return dm;case 36296:return fm;case 35678:case 36198:case 36298:case 36306:case 35682:return pm;case 35679:case 36299:case 36307:return mm;case 35680:case 36300:case 36308:case 36293:return gm;case 36289:case 36303:case 36311:case 36292:return xm}}function _m(i,t){i.uniform1fv(this.addr,t)}function vm(i,t){let e=ms(t,this.size,2);i.uniform2fv(this.addr,e)}function bm(i,t){let e=ms(t,this.size,3);i.uniform3fv(this.addr,e)}function Mm(i,t){let e=ms(t,this.size,4);i.uniform4fv(this.addr,e)}function Em(i,t){let e=ms(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function wm(i,t){let e=ms(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Sm(i,t){let e=ms(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Tm(i,t){i.uniform1iv(this.addr,t)}function Am(i,t){i.uniform2iv(this.addr,t)}function Rm(i,t){i.uniform3iv(this.addr,t)}function Cm(i,t){i.uniform4iv(this.addr,t)}function Pm(i,t){i.uniform1uiv(this.addr,t)}function Lm(i,t){i.uniform2uiv(this.addr,t)}function Im(i,t){i.uniform3uiv(this.addr,t)}function Dm(i,t){i.uniform4uiv(this.addr,t)}function zm(i,t,e){let n=this.cache,s=t.length,r=Mo(e,s);Ue(n,r)||(i.uniform1iv(this.addr,r),ke(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Jh,r[o])}function Um(i,t,e){let n=this.cache,s=t.length,r=Mo(e,s);Ue(n,r)||(i.uniform1iv(this.addr,r),ke(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||jh,r[o])}function km(i,t,e){let n=this.cache,s=t.length,r=Mo(e,s);Ue(n,r)||(i.uniform1iv(this.addr,r),ke(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Qh,r[o])}function Nm(i,t,e){let n=this.cache,s=t.length,r=Mo(e,s);Ue(n,r)||(i.uniform1iv(this.addr,r),ke(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||$h,r[o])}function Fm(i){switch(i){case 5126:return _m;case 35664:return vm;case 35665:return bm;case 35666:return Mm;case 35674:return Em;case 35675:return wm;case 35676:return Sm;case 5124:case 35670:return Tm;case 35667:case 35671:return Am;case 35668:case 35672:return Rm;case 35669:case 35673:return Cm;case 5125:return Pm;case 36294:return Lm;case 36295:return Im;case 36296:return Dm;case 35678:case 36198:case 36298:case 36306:case 35682:return zm;case 35679:case 36299:case 36307:return Um;case 35680:case 36300:case 36308:case 36293:return km;case 36289:case 36303:case 36311:case 36292:return Nm}}var Ga=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=ym(e.type)}},Va=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Fm(e.type)}},Wa=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],n)}}},wa=/(\w+)(\])?(\[|\.)?/g;function rh(i,t){i.seq.push(t),i.map[t.id]=t}function Om(i,t,e){let n=i.name,s=n.length;for(wa.lastIndex=0;;){let r=wa.exec(n),o=wa.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){rh(e,c===void 0?new Ga(a,i,t):new Va(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new Wa(a),rh(e,u)),e=u}}}var ss=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);Om(r,o,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&n.push(o)}return n}};function oh(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var Bm=37297,Hm=0;function Gm(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function Vm(i){let t=pe.getPrimaries(pe.workingColorSpace),e=pe.getPrimaries(i),n;switch(t===e?n="":t===Hr&&e===Br?n="LinearDisplayP3ToLinearSRGB":t===Br&&e===Hr&&(n="LinearSRGBToLinearDisplayP3"),i){case qn:case bo:return[n,"LinearTransferOETF"];case ye:case Ml:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function ah(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Gm(i.getShaderSource(t),o)}else return s}function Wm(i,t){let e=Vm(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Xm(i,t){let e;switch(t){case hd:e="Linear";break;case ud:e="Reinhard";break;case dd:e="OptimizedCineon";break;case vl:e="ACESFilmic";break;case pd:e="AgX";break;case fd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function qm(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(ts).join(`
`)}function Ym(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(ts).join(`
`)}function Zm(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Jm(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),o=r.name,a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function ts(i){return i!==""}function lh(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ch(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Km=/^[ \t]*#include +<([\w\d./]+)>/gm;function Xa(i){return i.replace(Km,jm)}var $m=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function jm(i,t){let e=$t[t];if(e===void 0){let n=$m.get(t);if(n!==void 0)e=$t[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Xa(e)}var Qm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function hh(i){return i.replace(Qm,tg)}function tg(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function uh(i){let t="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function eg(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Ih?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Fu?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Gn&&(t="SHADOWMAP_TYPE_VSM"),t}function ng(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case rs:case os:t="ENVMAP_TYPE_CUBE";break;case vo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function ig(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case os:t="ENVMAP_MODE_REFRACTION";break}return t}function sg(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Dh:t="ENVMAP_BLENDING_MULTIPLY";break;case ld:t="ENVMAP_BLENDING_MIX";break;case cd:t="ENVMAP_BLENDING_ADD";break}return t}function rg(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function og(i,t,e,n){let s=i.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=eg(e),c=ng(e),h=ig(e),u=sg(e),d=rg(e),f=e.isWebGL2?"":qm(e),m=Ym(e),y=Zm(r),p=s.createProgram(),g,_,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,y].filter(ts).join(`
`),g.length>0&&(g+=`
`),_=[f,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,y].filter(ts).join(`
`),_.length>0&&(_+=`
`)):(g=[uh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,y,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ts).join(`
`),_=[f,uh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,y,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==oi?"#define TONE_MAPPING":"",e.toneMapping!==oi?$t.tonemapping_pars_fragment:"",e.toneMapping!==oi?Xm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",$t.colorspace_pars_fragment,Wm("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ts).join(`
`)),o=Xa(o),o=lh(o,e),o=ch(o,e),a=Xa(a),a=lh(a,e),a=ch(a,e),o=hh(o),a=hh(a),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,g=[m,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,_=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===Pc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Pc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);let b=x+g+o,T=x+_+a,E=oh(s,s.VERTEX_SHADER,b),M=oh(s,s.FRAGMENT_SHADER,T);s.attachShader(p,E),s.attachShader(p,M),e.index0AttributeName!==void 0?s.bindAttribLocation(p,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function I(U){if(i.debug.checkShaderErrors){let B=s.getProgramInfoLog(p).trim(),D=s.getShaderInfoLog(E).trim(),O=s.getShaderInfoLog(M).trim(),X=!0,$=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,p,E,M);else{let Z=ah(s,E,"vertex"),q=ah(s,M,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Program Info Log: `+B+`
`+Z+`
`+q)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(D===""||O==="")&&($=!1);$&&(U.diagnostics={runnable:X,programLog:B,vertexShader:{log:D,prefix:g},fragmentShader:{log:O,prefix:_}})}s.deleteShader(E),s.deleteShader(M),w=new ss(s,p),S=Jm(s,p)}let w;this.getUniforms=function(){return w===void 0&&I(this),w};let S;this.getAttributes=function(){return S===void 0&&I(this),S};let R=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(p,Bm)),R},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Hm++,this.cacheKey=t,this.usedTimes=1,this.program=p,this.vertexShader=E,this.fragmentShader=M,this}var ag=0,qa=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new Ya(t),e.set(t,n)),n}},Ya=class{constructor(t){this.id=ag++,this.code=t,this.usedTimes=0}};function lg(i,t,e,n,s,r,o){let a=new Zr,l=new qa,c=[],h=s.isWebGL2,u=s.logarithmicDepthBuffer,d=s.vertexTextures,f=s.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function y(w){return w===0?"uv":`uv${w}`}function p(w,S,R,U,B){let D=U.fog,O=B.geometry,X=w.isMeshStandardMaterial?U.environment:null,$=(w.isMeshStandardMaterial?e:t).get(w.envMap||X),Z=$&&$.mapping===vo?$.image.height:null,q=m[w.type];w.precision!==null&&(f=s.getMaxPrecision(w.precision),f!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",f,"instead."));let Q=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,ot=Q!==void 0?Q.length:0,tt=0;O.morphAttributes.position!==void 0&&(tt=1),O.morphAttributes.normal!==void 0&&(tt=2),O.morphAttributes.color!==void 0&&(tt=3);let G,rt,pt,gt;if(q){let Fe=Pn[q];G=Fe.vertexShader,rt=Fe.fragmentShader}else G=w.vertexShader,rt=w.fragmentShader,l.update(w),pt=l.getVertexShaderID(w),gt=l.getFragmentShaderID(w);let wt=i.getRenderTarget(),Ut=B.isInstancedMesh===!0,Nt=B.isBatchedMesh===!0,Ct=!!w.map,Ft=!!w.matcap,v=!!$,z=!!w.aoMap,k=!!w.lightMap,H=!!w.bumpMap,F=!!w.normalMap,it=!!w.displacementMap,et=!!w.emissiveMap,C=!!w.metalnessMap,A=!!w.roughnessMap,V=w.anisotropy>0,ct=w.clearcoat>0,ht=w.iridescence>0,at=w.sheen>0,St=w.transmission>0,mt=V&&!!w.anisotropyMap,Tt=ct&&!!w.clearcoatMap,zt=ct&&!!w.clearcoatNormalMap,Vt=ct&&!!w.clearcoatRoughnessMap,ut=ht&&!!w.iridescenceMap,Jt=ht&&!!w.iridescenceThicknessMap,Kt=at&&!!w.sheenColorMap,Ht=at&&!!w.sheenRoughnessMap,Dt=!!w.specularMap,Rt=!!w.specularColorMap,Wt=!!w.specularIntensityMap,le=St&&!!w.transmissionMap,he=St&&!!w.thicknessMap,Xt=!!w.gradientMap,xt=!!w.alphaMap,N=w.alphaTest>0,Et=!!w.alphaHash,Mt=!!w.extensions,Lt=!!O.attributes.uv1,kt=!!O.attributes.uv2,fe=!!O.attributes.uv3,de=oi;return w.toneMapped&&(wt===null||wt.isXRRenderTarget===!0)&&(de=i.toneMapping),{isWebGL2:h,shaderID:q,shaderType:w.type,shaderName:w.name,vertexShader:G,fragmentShader:rt,defines:w.defines,customVertexShaderID:pt,customFragmentShaderID:gt,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:f,batching:Nt,instancing:Ut,instancingColor:Ut&&B.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:wt===null?i.outputColorSpace:wt.isXRRenderTarget===!0?wt.texture.colorSpace:qn,map:Ct,matcap:Ft,envMap:v,envMapMode:v&&$.mapping,envMapCubeUVHeight:Z,aoMap:z,lightMap:k,bumpMap:H,normalMap:F,displacementMap:d&&it,emissiveMap:et,normalMapObjectSpace:F&&w.normalMapType===Td,normalMapTangentSpace:F&&w.normalMapType===Vh,metalnessMap:C,roughnessMap:A,anisotropy:V,anisotropyMap:mt,clearcoat:ct,clearcoatMap:Tt,clearcoatNormalMap:zt,clearcoatRoughnessMap:Vt,iridescence:ht,iridescenceMap:ut,iridescenceThicknessMap:Jt,sheen:at,sheenColorMap:Kt,sheenRoughnessMap:Ht,specularMap:Dt,specularColorMap:Rt,specularIntensityMap:Wt,transmission:St,transmissionMap:le,thicknessMap:he,gradientMap:Xt,opaque:w.transparent===!1&&w.blending===ns,alphaMap:xt,alphaTest:N,alphaHash:Et,combine:w.combine,mapUv:Ct&&y(w.map.channel),aoMapUv:z&&y(w.aoMap.channel),lightMapUv:k&&y(w.lightMap.channel),bumpMapUv:H&&y(w.bumpMap.channel),normalMapUv:F&&y(w.normalMap.channel),displacementMapUv:it&&y(w.displacementMap.channel),emissiveMapUv:et&&y(w.emissiveMap.channel),metalnessMapUv:C&&y(w.metalnessMap.channel),roughnessMapUv:A&&y(w.roughnessMap.channel),anisotropyMapUv:mt&&y(w.anisotropyMap.channel),clearcoatMapUv:Tt&&y(w.clearcoatMap.channel),clearcoatNormalMapUv:zt&&y(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Vt&&y(w.clearcoatRoughnessMap.channel),iridescenceMapUv:ut&&y(w.iridescenceMap.channel),iridescenceThicknessMapUv:Jt&&y(w.iridescenceThicknessMap.channel),sheenColorMapUv:Kt&&y(w.sheenColorMap.channel),sheenRoughnessMapUv:Ht&&y(w.sheenRoughnessMap.channel),specularMapUv:Dt&&y(w.specularMap.channel),specularColorMapUv:Rt&&y(w.specularColorMap.channel),specularIntensityMapUv:Wt&&y(w.specularIntensityMap.channel),transmissionMapUv:le&&y(w.transmissionMap.channel),thicknessMapUv:he&&y(w.thicknessMap.channel),alphaMapUv:xt&&y(w.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(F||V),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,vertexUv1s:Lt,vertexUv2s:kt,vertexUv3s:fe,pointsUvs:B.isPoints===!0&&!!O.attributes.uv&&(Ct||xt),fog:!!D,useFog:w.fog===!0,fogExp2:D&&D.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:B.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:ot,morphTextureStride:tt,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:de,useLegacyLights:i._useLegacyLights,decodeVideoTexture:Ct&&w.map.isVideoTexture===!0&&pe.getTransfer(w.map.colorSpace)===xe,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===ue,flipSided:w.side===Qe,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionDerivatives:Mt&&w.extensions.derivatives===!0,extensionFragDepth:Mt&&w.extensions.fragDepth===!0,extensionDrawBuffers:Mt&&w.extensions.drawBuffers===!0,extensionShaderTextureLOD:Mt&&w.extensions.shaderTextureLOD===!0,extensionClipCullDistance:Mt&&w.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()}}function g(w){let S=[];if(w.shaderID?S.push(w.shaderID):(S.push(w.customVertexShaderID),S.push(w.customFragmentShaderID)),w.defines!==void 0)for(let R in w.defines)S.push(R),S.push(w.defines[R]);return w.isRawShaderMaterial===!1&&(_(S,w),x(S,w),S.push(i.outputColorSpace)),S.push(w.customProgramCacheKey),S.join()}function _(w,S){w.push(S.precision),w.push(S.outputColorSpace),w.push(S.envMapMode),w.push(S.envMapCubeUVHeight),w.push(S.mapUv),w.push(S.alphaMapUv),w.push(S.lightMapUv),w.push(S.aoMapUv),w.push(S.bumpMapUv),w.push(S.normalMapUv),w.push(S.displacementMapUv),w.push(S.emissiveMapUv),w.push(S.metalnessMapUv),w.push(S.roughnessMapUv),w.push(S.anisotropyMapUv),w.push(S.clearcoatMapUv),w.push(S.clearcoatNormalMapUv),w.push(S.clearcoatRoughnessMapUv),w.push(S.iridescenceMapUv),w.push(S.iridescenceThicknessMapUv),w.push(S.sheenColorMapUv),w.push(S.sheenRoughnessMapUv),w.push(S.specularMapUv),w.push(S.specularColorMapUv),w.push(S.specularIntensityMapUv),w.push(S.transmissionMapUv),w.push(S.thicknessMapUv),w.push(S.combine),w.push(S.fogExp2),w.push(S.sizeAttenuation),w.push(S.morphTargetsCount),w.push(S.morphAttributeCount),w.push(S.numDirLights),w.push(S.numPointLights),w.push(S.numSpotLights),w.push(S.numSpotLightMaps),w.push(S.numHemiLights),w.push(S.numRectAreaLights),w.push(S.numDirLightShadows),w.push(S.numPointLightShadows),w.push(S.numSpotLightShadows),w.push(S.numSpotLightShadowsWithMaps),w.push(S.numLightProbes),w.push(S.shadowMapType),w.push(S.toneMapping),w.push(S.numClippingPlanes),w.push(S.numClipIntersection),w.push(S.depthPacking)}function x(w,S){a.disableAll(),S.isWebGL2&&a.enable(0),S.supportsVertexTextures&&a.enable(1),S.instancing&&a.enable(2),S.instancingColor&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),w.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.skinning&&a.enable(4),S.morphTargets&&a.enable(5),S.morphNormals&&a.enable(6),S.morphColors&&a.enable(7),S.premultipliedAlpha&&a.enable(8),S.shadowMapEnabled&&a.enable(9),S.useLegacyLights&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),w.push(a.mask)}function b(w){let S=m[w.type],R;if(S){let U=Pn[S];R=El.clone(U.uniforms)}else R=w.uniforms;return R}function T(w,S){let R;for(let U=0,B=c.length;U<B;U++){let D=c[U];if(D.cacheKey===S){R=D,++R.usedTimes;break}}return R===void 0&&(R=new og(i,S,w,r),c.push(R)),R}function E(w){if(--w.usedTimes===0){let S=c.indexOf(w);c[S]=c[c.length-1],c.pop(),w.destroy()}}function M(w){l.remove(w)}function I(){l.dispose()}return{getParameters:p,getProgramCacheKey:g,getUniforms:b,acquireProgram:T,releaseProgram:E,releaseShaderCache:M,programs:c,dispose:I}}function cg(){let i=new WeakMap;function t(r){let o=i.get(r);return o===void 0&&(o={},i.set(r,o)),o}function e(r){i.delete(r)}function n(r,o,a){i.get(r)[o]=a}function s(){i=new WeakMap}return{get:t,remove:e,update:n,dispose:s}}function hg(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function dh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function fh(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,d,f,m,y,p){let g=i[t];return g===void 0?(g={id:u.id,object:u,geometry:d,material:f,groupOrder:m,renderOrder:u.renderOrder,z:y,group:p},i[t]=g):(g.id=u.id,g.object=u,g.geometry=d,g.material=f,g.groupOrder=m,g.renderOrder=u.renderOrder,g.z=y,g.group=p),t++,g}function a(u,d,f,m,y,p){let g=o(u,d,f,m,y,p);f.transmission>0?n.push(g):f.transparent===!0?s.push(g):e.push(g)}function l(u,d,f,m,y,p){let g=o(u,d,f,m,y,p);f.transmission>0?n.unshift(g):f.transparent===!0?s.unshift(g):e.unshift(g)}function c(u,d){e.length>1&&e.sort(u||hg),n.length>1&&n.sort(d||dh),s.length>1&&s.sort(d||dh)}function h(){for(let u=t,d=i.length;u<d;u++){let f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:l,finish:h,sort:c}}function ug(){let i=new WeakMap;function t(n,s){let r=i.get(n),o;return r===void 0?(o=new fh,i.set(n,[o])):s>=r.length?(o=new fh,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function dg(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new Zt};break;case"SpotLight":e={position:new L,direction:new L,color:new Zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new Zt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new Zt,groundColor:new Zt};break;case"RectAreaLight":e={color:new Zt,position:new L,halfWidth:new L,halfHeight:new L};break}return i[t.id]=e,e}}}function fg(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new yt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var pg=0;function mg(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function gg(i,t){let e=new dg,n=fg(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new L);let r=new L,o=new me,a=new me;function l(h,u){let d=0,f=0,m=0;for(let U=0;U<9;U++)s.probe[U].set(0,0,0);let y=0,p=0,g=0,_=0,x=0,b=0,T=0,E=0,M=0,I=0,w=0;h.sort(mg);let S=u===!0?Math.PI:1;for(let U=0,B=h.length;U<B;U++){let D=h[U],O=D.color,X=D.intensity,$=D.distance,Z=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)d+=O.r*X*S,f+=O.g*X*S,m+=O.b*X*S;else if(D.isLightProbe){for(let q=0;q<9;q++)s.probe[q].addScaledVector(D.sh.coefficients[q],X);w++}else if(D.isDirectionalLight){let q=e.get(D);if(q.color.copy(D.color).multiplyScalar(D.intensity*S),D.castShadow){let Q=D.shadow,ot=n.get(D);ot.shadowBias=Q.bias,ot.shadowNormalBias=Q.normalBias,ot.shadowRadius=Q.radius,ot.shadowMapSize=Q.mapSize,s.directionalShadow[y]=ot,s.directionalShadowMap[y]=Z,s.directionalShadowMatrix[y]=D.shadow.matrix,b++}s.directional[y]=q,y++}else if(D.isSpotLight){let q=e.get(D);q.position.setFromMatrixPosition(D.matrixWorld),q.color.copy(O).multiplyScalar(X*S),q.distance=$,q.coneCos=Math.cos(D.angle),q.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),q.decay=D.decay,s.spot[g]=q;let Q=D.shadow;if(D.map&&(s.spotLightMap[M]=D.map,M++,Q.updateMatrices(D),D.castShadow&&I++),s.spotLightMatrix[g]=Q.matrix,D.castShadow){let ot=n.get(D);ot.shadowBias=Q.bias,ot.shadowNormalBias=Q.normalBias,ot.shadowRadius=Q.radius,ot.shadowMapSize=Q.mapSize,s.spotShadow[g]=ot,s.spotShadowMap[g]=Z,E++}g++}else if(D.isRectAreaLight){let q=e.get(D);q.color.copy(O).multiplyScalar(X),q.halfWidth.set(D.width*.5,0,0),q.halfHeight.set(0,D.height*.5,0),s.rectArea[_]=q,_++}else if(D.isPointLight){let q=e.get(D);if(q.color.copy(D.color).multiplyScalar(D.intensity*S),q.distance=D.distance,q.decay=D.decay,D.castShadow){let Q=D.shadow,ot=n.get(D);ot.shadowBias=Q.bias,ot.shadowNormalBias=Q.normalBias,ot.shadowRadius=Q.radius,ot.shadowMapSize=Q.mapSize,ot.shadowCameraNear=Q.camera.near,ot.shadowCameraFar=Q.camera.far,s.pointShadow[p]=ot,s.pointShadowMap[p]=Z,s.pointShadowMatrix[p]=D.shadow.matrix,T++}s.point[p]=q,p++}else if(D.isHemisphereLight){let q=e.get(D);q.skyColor.copy(D.color).multiplyScalar(X*S),q.groundColor.copy(D.groundColor).multiplyScalar(X*S),s.hemi[x]=q,x++}}_>0&&(t.isWebGL2?i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=vt.LTC_FLOAT_1,s.rectAreaLTC2=vt.LTC_FLOAT_2):(s.rectAreaLTC1=vt.LTC_HALF_1,s.rectAreaLTC2=vt.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=vt.LTC_FLOAT_1,s.rectAreaLTC2=vt.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=vt.LTC_HALF_1,s.rectAreaLTC2=vt.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=d,s.ambient[1]=f,s.ambient[2]=m;let R=s.hash;(R.directionalLength!==y||R.pointLength!==p||R.spotLength!==g||R.rectAreaLength!==_||R.hemiLength!==x||R.numDirectionalShadows!==b||R.numPointShadows!==T||R.numSpotShadows!==E||R.numSpotMaps!==M||R.numLightProbes!==w)&&(s.directional.length=y,s.spot.length=g,s.rectArea.length=_,s.point.length=p,s.hemi.length=x,s.directionalShadow.length=b,s.directionalShadowMap.length=b,s.pointShadow.length=T,s.pointShadowMap.length=T,s.spotShadow.length=E,s.spotShadowMap.length=E,s.directionalShadowMatrix.length=b,s.pointShadowMatrix.length=T,s.spotLightMatrix.length=E+M-I,s.spotLightMap.length=M,s.numSpotLightShadowsWithMaps=I,s.numLightProbes=w,R.directionalLength=y,R.pointLength=p,R.spotLength=g,R.rectAreaLength=_,R.hemiLength=x,R.numDirectionalShadows=b,R.numPointShadows=T,R.numSpotShadows=E,R.numSpotMaps=M,R.numLightProbes=w,s.version=pg++)}function c(h,u){let d=0,f=0,m=0,y=0,p=0,g=u.matrixWorldInverse;for(let _=0,x=h.length;_<x;_++){let b=h[_];if(b.isDirectionalLight){let T=s.directional[d];T.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(g),d++}else if(b.isSpotLight){let T=s.spot[m];T.position.setFromMatrixPosition(b.matrixWorld),T.position.applyMatrix4(g),T.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),T.direction.sub(r),T.direction.transformDirection(g),m++}else if(b.isRectAreaLight){let T=s.rectArea[y];T.position.setFromMatrixPosition(b.matrixWorld),T.position.applyMatrix4(g),a.identity(),o.copy(b.matrixWorld),o.premultiply(g),a.extractRotation(o),T.halfWidth.set(b.width*.5,0,0),T.halfHeight.set(0,b.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),y++}else if(b.isPointLight){let T=s.point[f];T.position.setFromMatrixPosition(b.matrixWorld),T.position.applyMatrix4(g),f++}else if(b.isHemisphereLight){let T=s.hemi[p];T.direction.setFromMatrixPosition(b.matrixWorld),T.direction.transformDirection(g),p++}}}return{setup:l,setupView:c,state:s}}function ph(i,t){let e=new gg(i,t),n=[],s=[];function r(){n.length=0,s.length=0}function o(u){n.push(u)}function a(u){s.push(u)}function l(u){e.setup(n,u)}function c(u){e.setupView(n,u)}return{init:r,state:{lightsArray:n,shadowsArray:s,lights:e},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function xg(i,t){let e=new WeakMap;function n(r,o=0){let a=e.get(r),l;return a===void 0?(l=new ph(i,t),e.set(r,[l])):o>=a.length?(l=new ph(i,t),a.push(l)):l=a[o],l}function s(){e=new WeakMap}return{get:n,dispose:s}}var Za=class extends Zn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=wd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Ja=class extends Zn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},yg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,_g=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function vg(i,t,e){let n=new Bs,s=new yt,r=new yt,o=new Me,a=new Za({depthPacking:Sd}),l=new Ja,c={},h=e.maxTextureSize,u={[Xn]:Qe,[Qe]:Xn,[ue]:ue},d=new nn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new yt},radius:{value:4}},vertexShader:yg,fragmentShader:_g}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let m=new ge;m.setAttribute("position",new Pe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let y=new Y(m,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ih;let g=this.type;this.render=function(E,M,I){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||E.length===0)return;let w=i.getRenderTarget(),S=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),U=i.state;U.setBlending(Ln),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);let B=g!==Gn&&this.type===Gn,D=g===Gn&&this.type!==Gn;for(let O=0,X=E.length;O<X;O++){let $=E[O],Z=$.shadow;if(Z===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;s.copy(Z.mapSize);let q=Z.getFrameExtents();if(s.multiply(q),r.copy(Z.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/q.x),s.x=r.x*q.x,Z.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/q.y),s.y=r.y*q.y,Z.mapSize.y=r.y)),Z.map===null||B===!0||D===!0){let ot=this.type!==Gn?{minFilter:He,magFilter:He}:{};Z.map!==null&&Z.map.dispose(),Z.map=new Rn(s.x,s.y,ot),Z.map.texture.name=$.name+".shadowMap",Z.camera.updateProjectionMatrix()}i.setRenderTarget(Z.map),i.clear();let Q=Z.getViewportCount();for(let ot=0;ot<Q;ot++){let tt=Z.getViewport(ot);o.set(r.x*tt.x,r.y*tt.y,r.x*tt.z,r.y*tt.w),U.viewport(o),Z.updateMatrices($,ot),n=Z.getFrustum(),b(M,I,Z.camera,$,this.type)}Z.isPointLightShadow!==!0&&this.type===Gn&&_(Z,I),Z.needsUpdate=!1}g=this.type,p.needsUpdate=!1,i.setRenderTarget(w,S,R)};function _(E,M){let I=t.update(y);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Rn(s.x,s.y)),d.uniforms.shadow_pass.value=E.map.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(M,null,I,d,y,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(M,null,I,f,y,null)}function x(E,M,I,w){let S=null,R=I.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(R!==void 0)S=R;else if(S=I.isPointLight===!0?l:a,i.localClippingEnabled&&M.clipShadows===!0&&Array.isArray(M.clippingPlanes)&&M.clippingPlanes.length!==0||M.displacementMap&&M.displacementScale!==0||M.alphaMap&&M.alphaTest>0||M.map&&M.alphaTest>0){let U=S.uuid,B=M.uuid,D=c[U];D===void 0&&(D={},c[U]=D);let O=D[B];O===void 0&&(O=S.clone(),D[B]=O,M.addEventListener("dispose",T)),S=O}if(S.visible=M.visible,S.wireframe=M.wireframe,w===Gn?S.side=M.shadowSide!==null?M.shadowSide:M.side:S.side=M.shadowSide!==null?M.shadowSide:u[M.side],S.alphaMap=M.alphaMap,S.alphaTest=M.alphaTest,S.map=M.map,S.clipShadows=M.clipShadows,S.clippingPlanes=M.clippingPlanes,S.clipIntersection=M.clipIntersection,S.displacementMap=M.displacementMap,S.displacementScale=M.displacementScale,S.displacementBias=M.displacementBias,S.wireframeLinewidth=M.wireframeLinewidth,S.linewidth=M.linewidth,I.isPointLight===!0&&S.isMeshDistanceMaterial===!0){let U=i.properties.get(S);U.light=I}return S}function b(E,M,I,w,S){if(E.visible===!1)return;if(E.layers.test(M.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&S===Gn)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,E.matrixWorld);let B=t.update(E),D=E.material;if(Array.isArray(D)){let O=B.groups;for(let X=0,$=O.length;X<$;X++){let Z=O[X],q=D[Z.materialIndex];if(q&&q.visible){let Q=x(E,q,w,S);E.onBeforeShadow(i,E,M,I,B,Q,Z),i.renderBufferDirect(I,null,B,Q,E,Z),E.onAfterShadow(i,E,M,I,B,Q,Z)}}}else if(D.visible){let O=x(E,D,w,S);E.onBeforeShadow(i,E,M,I,B,O,null),i.renderBufferDirect(I,null,B,O,E,null),E.onAfterShadow(i,E,M,I,B,O,null)}}let U=E.children;for(let B=0,D=U.length;B<D;B++)b(U[B],M,I,w,S)}function T(E){E.target.removeEventListener("dispose",T);for(let I in c){let w=c[I],S=E.target.uuid;S in w&&(w[S].dispose(),delete w[S])}}}function bg(i,t,e){let n=e.isWebGL2;function s(){let N=!1,Et=new Me,Mt=null,Lt=new Me(0,0,0,0);return{setMask:function(kt){Mt!==kt&&!N&&(i.colorMask(kt,kt,kt,kt),Mt=kt)},setLocked:function(kt){N=kt},setClear:function(kt,fe,de,Re,Fe){Fe===!0&&(kt*=Re,fe*=Re,de*=Re),Et.set(kt,fe,de,Re),Lt.equals(Et)===!1&&(i.clearColor(kt,fe,de,Re),Lt.copy(Et))},reset:function(){N=!1,Mt=null,Lt.set(-1,0,0,0)}}}function r(){let N=!1,Et=null,Mt=null,Lt=null;return{setTest:function(kt){kt?Nt(i.DEPTH_TEST):Ct(i.DEPTH_TEST)},setMask:function(kt){Et!==kt&&!N&&(i.depthMask(kt),Et=kt)},setFunc:function(kt){if(Mt!==kt){switch(kt){case ed:i.depthFunc(i.NEVER);break;case nd:i.depthFunc(i.ALWAYS);break;case id:i.depthFunc(i.LESS);break;case kr:i.depthFunc(i.LEQUAL);break;case sd:i.depthFunc(i.EQUAL);break;case rd:i.depthFunc(i.GEQUAL);break;case od:i.depthFunc(i.GREATER);break;case ad:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Mt=kt}},setLocked:function(kt){N=kt},setClear:function(kt){Lt!==kt&&(i.clearDepth(kt),Lt=kt)},reset:function(){N=!1,Et=null,Mt=null,Lt=null}}}function o(){let N=!1,Et=null,Mt=null,Lt=null,kt=null,fe=null,de=null,Re=null,Fe=null;return{setTest:function(ce){N||(ce?Nt(i.STENCIL_TEST):Ct(i.STENCIL_TEST))},setMask:function(ce){Et!==ce&&!N&&(i.stencilMask(ce),Et=ce)},setFunc:function(ce,Xe,ln){(Mt!==ce||Lt!==Xe||kt!==ln)&&(i.stencilFunc(ce,Xe,ln),Mt=ce,Lt=Xe,kt=ln)},setOp:function(ce,Xe,ln){(fe!==ce||de!==Xe||Re!==ln)&&(i.stencilOp(ce,Xe,ln),fe=ce,de=Xe,Re=ln)},setLocked:function(ce){N=ce},setClear:function(ce){Fe!==ce&&(i.clearStencil(ce),Fe=ce)},reset:function(){N=!1,Et=null,Mt=null,Lt=null,kt=null,fe=null,de=null,Re=null,Fe=null}}}let a=new s,l=new r,c=new o,h=new WeakMap,u=new WeakMap,d={},f={},m=new WeakMap,y=[],p=null,g=!1,_=null,x=null,b=null,T=null,E=null,M=null,I=null,w=new Zt(0,0,0),S=0,R=!1,U=null,B=null,D=null,O=null,X=null,$=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Z=!1,q=0,Q=i.getParameter(i.VERSION);Q.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(Q)[1]),Z=q>=1):Q.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),Z=q>=2);let ot=null,tt={},G=i.getParameter(i.SCISSOR_BOX),rt=i.getParameter(i.VIEWPORT),pt=new Me().fromArray(G),gt=new Me().fromArray(rt);function wt(N,Et,Mt,Lt){let kt=new Uint8Array(4),fe=i.createTexture();i.bindTexture(N,fe),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let de=0;de<Mt;de++)n&&(N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY)?i.texImage3D(Et,0,i.RGBA,1,1,Lt,0,i.RGBA,i.UNSIGNED_BYTE,kt):i.texImage2D(Et+de,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,kt);return fe}let Ut={};Ut[i.TEXTURE_2D]=wt(i.TEXTURE_2D,i.TEXTURE_2D,1),Ut[i.TEXTURE_CUBE_MAP]=wt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Ut[i.TEXTURE_2D_ARRAY]=wt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Ut[i.TEXTURE_3D]=wt(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Nt(i.DEPTH_TEST),l.setFunc(kr),et(!1),C(Zl),Nt(i.CULL_FACE),F(Ln);function Nt(N){d[N]!==!0&&(i.enable(N),d[N]=!0)}function Ct(N){d[N]!==!1&&(i.disable(N),d[N]=!1)}function Ft(N,Et){return f[N]!==Et?(i.bindFramebuffer(N,Et),f[N]=Et,n&&(N===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=Et),N===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=Et)),!0):!1}function v(N,Et){let Mt=y,Lt=!1;if(N)if(Mt=m.get(Et),Mt===void 0&&(Mt=[],m.set(Et,Mt)),N.isWebGLMultipleRenderTargets){let kt=N.texture;if(Mt.length!==kt.length||Mt[0]!==i.COLOR_ATTACHMENT0){for(let fe=0,de=kt.length;fe<de;fe++)Mt[fe]=i.COLOR_ATTACHMENT0+fe;Mt.length=kt.length,Lt=!0}}else Mt[0]!==i.COLOR_ATTACHMENT0&&(Mt[0]=i.COLOR_ATTACHMENT0,Lt=!0);else Mt[0]!==i.BACK&&(Mt[0]=i.BACK,Lt=!0);Lt&&(e.isWebGL2?i.drawBuffers(Mt):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(Mt))}function z(N){return p!==N?(i.useProgram(N),p=N,!0):!1}let k={[yi]:i.FUNC_ADD,[Bu]:i.FUNC_SUBTRACT,[Hu]:i.FUNC_REVERSE_SUBTRACT};if(n)k[$l]=i.MIN,k[jl]=i.MAX;else{let N=t.get("EXT_blend_minmax");N!==null&&(k[$l]=N.MIN_EXT,k[jl]=N.MAX_EXT)}let H={[Gu]:i.ZERO,[Vu]:i.ONE,[Wu]:i.SRC_COLOR,[La]:i.SRC_ALPHA,[Ku]:i.SRC_ALPHA_SATURATE,[Zu]:i.DST_COLOR,[qu]:i.DST_ALPHA,[Xu]:i.ONE_MINUS_SRC_COLOR,[Ia]:i.ONE_MINUS_SRC_ALPHA,[Ju]:i.ONE_MINUS_DST_COLOR,[Yu]:i.ONE_MINUS_DST_ALPHA,[$u]:i.CONSTANT_COLOR,[ju]:i.ONE_MINUS_CONSTANT_COLOR,[Qu]:i.CONSTANT_ALPHA,[td]:i.ONE_MINUS_CONSTANT_ALPHA};function F(N,Et,Mt,Lt,kt,fe,de,Re,Fe,ce){if(N===Ln){g===!0&&(Ct(i.BLEND),g=!1);return}if(g===!1&&(Nt(i.BLEND),g=!0),N!==Ou){if(N!==_||ce!==R){if((x!==yi||E!==yi)&&(i.blendEquation(i.FUNC_ADD),x=yi,E=yi),ce)switch(N){case ns:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Os:i.blendFunc(i.ONE,i.ONE);break;case Jl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Kl:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case ns:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Os:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Jl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Kl:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}b=null,T=null,M=null,I=null,w.set(0,0,0),S=0,_=N,R=ce}return}kt=kt||Et,fe=fe||Mt,de=de||Lt,(Et!==x||kt!==E)&&(i.blendEquationSeparate(k[Et],k[kt]),x=Et,E=kt),(Mt!==b||Lt!==T||fe!==M||de!==I)&&(i.blendFuncSeparate(H[Mt],H[Lt],H[fe],H[de]),b=Mt,T=Lt,M=fe,I=de),(Re.equals(w)===!1||Fe!==S)&&(i.blendColor(Re.r,Re.g,Re.b,Fe),w.copy(Re),S=Fe),_=N,R=!1}function it(N,Et){N.side===ue?Ct(i.CULL_FACE):Nt(i.CULL_FACE);let Mt=N.side===Qe;Et&&(Mt=!Mt),et(Mt),N.blending===ns&&N.transparent===!1?F(Ln):F(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),l.setFunc(N.depthFunc),l.setTest(N.depthTest),l.setMask(N.depthWrite),a.setMask(N.colorWrite);let Lt=N.stencilWrite;c.setTest(Lt),Lt&&(c.setMask(N.stencilWriteMask),c.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),c.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),V(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?Nt(i.SAMPLE_ALPHA_TO_COVERAGE):Ct(i.SAMPLE_ALPHA_TO_COVERAGE)}function et(N){U!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),U=N)}function C(N){N!==ku?(Nt(i.CULL_FACE),N!==B&&(N===Zl?i.cullFace(i.BACK):N===Nu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ct(i.CULL_FACE),B=N}function A(N){N!==D&&(Z&&i.lineWidth(N),D=N)}function V(N,Et,Mt){N?(Nt(i.POLYGON_OFFSET_FILL),(O!==Et||X!==Mt)&&(i.polygonOffset(Et,Mt),O=Et,X=Mt)):Ct(i.POLYGON_OFFSET_FILL)}function ct(N){N?Nt(i.SCISSOR_TEST):Ct(i.SCISSOR_TEST)}function ht(N){N===void 0&&(N=i.TEXTURE0+$-1),ot!==N&&(i.activeTexture(N),ot=N)}function at(N,Et,Mt){Mt===void 0&&(ot===null?Mt=i.TEXTURE0+$-1:Mt=ot);let Lt=tt[Mt];Lt===void 0&&(Lt={type:void 0,texture:void 0},tt[Mt]=Lt),(Lt.type!==N||Lt.texture!==Et)&&(ot!==Mt&&(i.activeTexture(Mt),ot=Mt),i.bindTexture(N,Et||Ut[N]),Lt.type=N,Lt.texture=Et)}function St(){let N=tt[ot];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function mt(){try{i.compressedTexImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Tt(){try{i.compressedTexImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function zt(){try{i.texSubImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Vt(){try{i.texSubImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ut(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Jt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Kt(){try{i.texStorage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ht(){try{i.texStorage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Dt(){try{i.texImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Rt(){try{i.texImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Wt(N){pt.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),pt.copy(N))}function le(N){gt.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),gt.copy(N))}function he(N,Et){let Mt=u.get(Et);Mt===void 0&&(Mt=new WeakMap,u.set(Et,Mt));let Lt=Mt.get(N);Lt===void 0&&(Lt=i.getUniformBlockIndex(Et,N.name),Mt.set(N,Lt))}function Xt(N,Et){let Lt=u.get(Et).get(N);h.get(Et)!==Lt&&(i.uniformBlockBinding(Et,Lt,N.__bindingPointIndex),h.set(Et,Lt))}function xt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},ot=null,tt={},f={},m=new WeakMap,y=[],p=null,g=!1,_=null,x=null,b=null,T=null,E=null,M=null,I=null,w=new Zt(0,0,0),S=0,R=!1,U=null,B=null,D=null,O=null,X=null,pt.set(0,0,i.canvas.width,i.canvas.height),gt.set(0,0,i.canvas.width,i.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:Nt,disable:Ct,bindFramebuffer:Ft,drawBuffers:v,useProgram:z,setBlending:F,setMaterial:it,setFlipSided:et,setCullFace:C,setLineWidth:A,setPolygonOffset:V,setScissorTest:ct,activeTexture:ht,bindTexture:at,unbindTexture:St,compressedTexImage2D:mt,compressedTexImage3D:Tt,texImage2D:Dt,texImage3D:Rt,updateUBOMapping:he,uniformBlockBinding:Xt,texStorage2D:Kt,texStorage3D:Ht,texSubImage2D:zt,texSubImage3D:Vt,compressedTexSubImage2D:ut,compressedTexSubImage3D:Jt,scissor:Wt,viewport:le,reset:xt}}function Mg(i,t,e,n,s,r,o){let a=s.isWebGL2,l=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(C){}function m(C,A){return f?new OffscreenCanvas(C,A):Wr("canvas")}function y(C,A,V,ct){let ht=1;if((C.width>ct||C.height>ct)&&(ht=ct/Math.max(C.width,C.height)),ht<1||A===!0)if(typeof HTMLImageElement!="undefined"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&C instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&C instanceof ImageBitmap){let at=A?Na:Math.floor,St=at(ht*C.width),mt=at(ht*C.height);u===void 0&&(u=m(St,mt));let Tt=V?m(St,mt):u;return Tt.width=St,Tt.height=mt,Tt.getContext("2d").drawImage(C,0,0,St,mt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+C.width+"x"+C.height+") to ("+St+"x"+mt+")."),Tt}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+C.width+"x"+C.height+")."),C;return C}function p(C){return Lc(C.width)&&Lc(C.height)}function g(C){return a?!1:C.wrapS!==Sn||C.wrapT!==Sn||C.minFilter!==He&&C.minFilter!==on}function _(C,A){return C.generateMipmaps&&A&&C.minFilter!==He&&C.minFilter!==on}function x(C){i.generateMipmap(C)}function b(C,A,V,ct,ht=!1){if(a===!1)return A;if(C!==null){if(i[C]!==void 0)return i[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let at=A;if(A===i.RED&&(V===i.FLOAT&&(at=i.R32F),V===i.HALF_FLOAT&&(at=i.R16F),V===i.UNSIGNED_BYTE&&(at=i.R8)),A===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(at=i.R8UI),V===i.UNSIGNED_SHORT&&(at=i.R16UI),V===i.UNSIGNED_INT&&(at=i.R32UI),V===i.BYTE&&(at=i.R8I),V===i.SHORT&&(at=i.R16I),V===i.INT&&(at=i.R32I)),A===i.RG&&(V===i.FLOAT&&(at=i.RG32F),V===i.HALF_FLOAT&&(at=i.RG16F),V===i.UNSIGNED_BYTE&&(at=i.RG8)),A===i.RGBA){let St=ht?Or:pe.getTransfer(ct);V===i.FLOAT&&(at=i.RGBA32F),V===i.HALF_FLOAT&&(at=i.RGBA16F),V===i.UNSIGNED_BYTE&&(at=St===xe?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT_4_4_4_4&&(at=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(at=i.RGB5_A1)}return(at===i.R16F||at===i.R32F||at===i.RG16F||at===i.RG32F||at===i.RGBA16F||at===i.RGBA32F)&&t.get("EXT_color_buffer_float"),at}function T(C,A,V){return _(C,V)===!0||C.isFramebufferTexture&&C.minFilter!==He&&C.minFilter!==on?Math.log2(Math.max(A.width,A.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?A.mipmaps.length:1}function E(C){return C===He||C===Ql||C===Zo?i.NEAREST:i.LINEAR}function M(C){let A=C.target;A.removeEventListener("dispose",M),w(A),A.isVideoTexture&&h.delete(A)}function I(C){let A=C.target;A.removeEventListener("dispose",I),R(A)}function w(C){let A=n.get(C);if(A.__webglInit===void 0)return;let V=C.source,ct=d.get(V);if(ct){let ht=ct[A.__cacheKey];ht.usedTimes--,ht.usedTimes===0&&S(C),Object.keys(ct).length===0&&d.delete(V)}n.remove(C)}function S(C){let A=n.get(C);i.deleteTexture(A.__webglTexture);let V=C.source,ct=d.get(V);delete ct[A.__cacheKey],o.memory.textures--}function R(C){let A=C.texture,V=n.get(C),ct=n.get(A);if(ct.__webglTexture!==void 0&&(i.deleteTexture(ct.__webglTexture),o.memory.textures--),C.depthTexture&&C.depthTexture.dispose(),C.isWebGLCubeRenderTarget)for(let ht=0;ht<6;ht++){if(Array.isArray(V.__webglFramebuffer[ht]))for(let at=0;at<V.__webglFramebuffer[ht].length;at++)i.deleteFramebuffer(V.__webglFramebuffer[ht][at]);else i.deleteFramebuffer(V.__webglFramebuffer[ht]);V.__webglDepthbuffer&&i.deleteRenderbuffer(V.__webglDepthbuffer[ht])}else{if(Array.isArray(V.__webglFramebuffer))for(let ht=0;ht<V.__webglFramebuffer.length;ht++)i.deleteFramebuffer(V.__webglFramebuffer[ht]);else i.deleteFramebuffer(V.__webglFramebuffer);if(V.__webglDepthbuffer&&i.deleteRenderbuffer(V.__webglDepthbuffer),V.__webglMultisampledFramebuffer&&i.deleteFramebuffer(V.__webglMultisampledFramebuffer),V.__webglColorRenderbuffer)for(let ht=0;ht<V.__webglColorRenderbuffer.length;ht++)V.__webglColorRenderbuffer[ht]&&i.deleteRenderbuffer(V.__webglColorRenderbuffer[ht]);V.__webglDepthRenderbuffer&&i.deleteRenderbuffer(V.__webglDepthRenderbuffer)}if(C.isWebGLMultipleRenderTargets)for(let ht=0,at=A.length;ht<at;ht++){let St=n.get(A[ht]);St.__webglTexture&&(i.deleteTexture(St.__webglTexture),o.memory.textures--),n.remove(A[ht])}n.remove(A),n.remove(C)}let U=0;function B(){U=0}function D(){let C=U;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),U+=1,C}function O(C){let A=[];return A.push(C.wrapS),A.push(C.wrapT),A.push(C.wrapR||0),A.push(C.magFilter),A.push(C.minFilter),A.push(C.anisotropy),A.push(C.internalFormat),A.push(C.format),A.push(C.type),A.push(C.generateMipmaps),A.push(C.premultiplyAlpha),A.push(C.flipY),A.push(C.unpackAlignment),A.push(C.colorSpace),A.join()}function X(C,A){let V=n.get(C);if(C.isVideoTexture&&it(C),C.isRenderTargetTexture===!1&&C.version>0&&V.__version!==C.version){let ct=C.image;if(ct===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ct.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{pt(V,C,A);return}}e.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+A)}function $(C,A){let V=n.get(C);if(C.version>0&&V.__version!==C.version){pt(V,C,A);return}e.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+A)}function Z(C,A){let V=n.get(C);if(C.version>0&&V.__version!==C.version){pt(V,C,A);return}e.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+A)}function q(C,A){let V=n.get(C);if(C.version>0&&V.__version!==C.version){gt(V,C,A);return}e.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+A)}let Q={[In]:i.REPEAT,[Sn]:i.CLAMP_TO_EDGE,[Ua]:i.MIRRORED_REPEAT},ot={[He]:i.NEAREST,[Ql]:i.NEAREST_MIPMAP_NEAREST,[Zo]:i.NEAREST_MIPMAP_LINEAR,[on]:i.LINEAR,[md]:i.LINEAR_MIPMAP_NEAREST,[An]:i.LINEAR_MIPMAP_LINEAR},tt={[Ad]:i.NEVER,[Dd]:i.ALWAYS,[Rd]:i.LESS,[Wh]:i.LEQUAL,[Cd]:i.EQUAL,[Id]:i.GEQUAL,[Pd]:i.GREATER,[Ld]:i.NOTEQUAL};function G(C,A,V){if(V?(i.texParameteri(C,i.TEXTURE_WRAP_S,Q[A.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,Q[A.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,Q[A.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,ot[A.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,ot[A.minFilter])):(i.texParameteri(C,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(C,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(A.wrapS!==Sn||A.wrapT!==Sn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(C,i.TEXTURE_MAG_FILTER,E(A.magFilter)),i.texParameteri(C,i.TEXTURE_MIN_FILTER,E(A.minFilter)),A.minFilter!==He&&A.minFilter!==on&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),A.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,tt[A.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){let ct=t.get("EXT_texture_filter_anisotropic");if(A.magFilter===He||A.minFilter!==Zo&&A.minFilter!==An||A.type===ri&&t.has("OES_texture_float_linear")===!1||a===!1&&A.type===Ei&&t.has("OES_texture_half_float_linear")===!1)return;(A.anisotropy>1||n.get(A).__currentAnisotropy)&&(i.texParameterf(C,ct.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,s.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy)}}function rt(C,A){let V=!1;C.__webglInit===void 0&&(C.__webglInit=!0,A.addEventListener("dispose",M));let ct=A.source,ht=d.get(ct);ht===void 0&&(ht={},d.set(ct,ht));let at=O(A);if(at!==C.__cacheKey){ht[at]===void 0&&(ht[at]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,V=!0),ht[at].usedTimes++;let St=ht[C.__cacheKey];St!==void 0&&(ht[C.__cacheKey].usedTimes--,St.usedTimes===0&&S(A)),C.__cacheKey=at,C.__webglTexture=ht[at].texture}return V}function pt(C,A,V){let ct=i.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(ct=i.TEXTURE_2D_ARRAY),A.isData3DTexture&&(ct=i.TEXTURE_3D);let ht=rt(C,A),at=A.source;e.bindTexture(ct,C.__webglTexture,i.TEXTURE0+V);let St=n.get(at);if(at.version!==St.__version||ht===!0){e.activeTexture(i.TEXTURE0+V);let mt=pe.getPrimaries(pe.workingColorSpace),Tt=A.colorSpace===Ge?null:pe.getPrimaries(A.colorSpace),zt=A.colorSpace===Ge||mt===Tt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,A.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,A.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,zt);let Vt=g(A)&&p(A.image)===!1,ut=y(A.image,Vt,!1,s.maxTextureSize);ut=et(A,ut);let Jt=p(ut)||a,Kt=r.convert(A.format,A.colorSpace),Ht=r.convert(A.type),Dt=b(A.internalFormat,Kt,Ht,A.colorSpace,A.isVideoTexture);G(ct,A,Jt);let Rt,Wt=A.mipmaps,le=a&&A.isVideoTexture!==!0&&Dt!==Hh,he=St.__version===void 0||ht===!0,Xt=T(A,ut,Jt);if(A.isDepthTexture)Dt=i.DEPTH_COMPONENT,a?A.type===ri?Dt=i.DEPTH_COMPONENT32F:A.type===si?Dt=i.DEPTH_COMPONENT24:A.type===vi?Dt=i.DEPTH24_STENCIL8:Dt=i.DEPTH_COMPONENT16:A.type===ri&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),A.format===bi&&Dt===i.DEPTH_COMPONENT&&A.type!==bl&&A.type!==si&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),A.type=si,Ht=r.convert(A.type)),A.format===as&&Dt===i.DEPTH_COMPONENT&&(Dt=i.DEPTH_STENCIL,A.type!==vi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),A.type=vi,Ht=r.convert(A.type))),he&&(le?e.texStorage2D(i.TEXTURE_2D,1,Dt,ut.width,ut.height):e.texImage2D(i.TEXTURE_2D,0,Dt,ut.width,ut.height,0,Kt,Ht,null));else if(A.isDataTexture)if(Wt.length>0&&Jt){le&&he&&e.texStorage2D(i.TEXTURE_2D,Xt,Dt,Wt[0].width,Wt[0].height);for(let xt=0,N=Wt.length;xt<N;xt++)Rt=Wt[xt],le?e.texSubImage2D(i.TEXTURE_2D,xt,0,0,Rt.width,Rt.height,Kt,Ht,Rt.data):e.texImage2D(i.TEXTURE_2D,xt,Dt,Rt.width,Rt.height,0,Kt,Ht,Rt.data);A.generateMipmaps=!1}else le?(he&&e.texStorage2D(i.TEXTURE_2D,Xt,Dt,ut.width,ut.height),e.texSubImage2D(i.TEXTURE_2D,0,0,0,ut.width,ut.height,Kt,Ht,ut.data)):e.texImage2D(i.TEXTURE_2D,0,Dt,ut.width,ut.height,0,Kt,Ht,ut.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){le&&he&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Xt,Dt,Wt[0].width,Wt[0].height,ut.depth);for(let xt=0,N=Wt.length;xt<N;xt++)Rt=Wt[xt],A.format!==Tn?Kt!==null?le?e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,xt,0,0,0,Rt.width,Rt.height,ut.depth,Kt,Rt.data,0,0):e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,xt,Dt,Rt.width,Rt.height,ut.depth,0,Rt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):le?e.texSubImage3D(i.TEXTURE_2D_ARRAY,xt,0,0,0,Rt.width,Rt.height,ut.depth,Kt,Ht,Rt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,xt,Dt,Rt.width,Rt.height,ut.depth,0,Kt,Ht,Rt.data)}else{le&&he&&e.texStorage2D(i.TEXTURE_2D,Xt,Dt,Wt[0].width,Wt[0].height);for(let xt=0,N=Wt.length;xt<N;xt++)Rt=Wt[xt],A.format!==Tn?Kt!==null?le?e.compressedTexSubImage2D(i.TEXTURE_2D,xt,0,0,Rt.width,Rt.height,Kt,Rt.data):e.compressedTexImage2D(i.TEXTURE_2D,xt,Dt,Rt.width,Rt.height,0,Rt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):le?e.texSubImage2D(i.TEXTURE_2D,xt,0,0,Rt.width,Rt.height,Kt,Ht,Rt.data):e.texImage2D(i.TEXTURE_2D,xt,Dt,Rt.width,Rt.height,0,Kt,Ht,Rt.data)}else if(A.isDataArrayTexture)le?(he&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Xt,Dt,ut.width,ut.height,ut.depth),e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ut.width,ut.height,ut.depth,Kt,Ht,ut.data)):e.texImage3D(i.TEXTURE_2D_ARRAY,0,Dt,ut.width,ut.height,ut.depth,0,Kt,Ht,ut.data);else if(A.isData3DTexture)le?(he&&e.texStorage3D(i.TEXTURE_3D,Xt,Dt,ut.width,ut.height,ut.depth),e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ut.width,ut.height,ut.depth,Kt,Ht,ut.data)):e.texImage3D(i.TEXTURE_3D,0,Dt,ut.width,ut.height,ut.depth,0,Kt,Ht,ut.data);else if(A.isFramebufferTexture){if(he)if(le)e.texStorage2D(i.TEXTURE_2D,Xt,Dt,ut.width,ut.height);else{let xt=ut.width,N=ut.height;for(let Et=0;Et<Xt;Et++)e.texImage2D(i.TEXTURE_2D,Et,Dt,xt,N,0,Kt,Ht,null),xt>>=1,N>>=1}}else if(Wt.length>0&&Jt){le&&he&&e.texStorage2D(i.TEXTURE_2D,Xt,Dt,Wt[0].width,Wt[0].height);for(let xt=0,N=Wt.length;xt<N;xt++)Rt=Wt[xt],le?e.texSubImage2D(i.TEXTURE_2D,xt,0,0,Kt,Ht,Rt):e.texImage2D(i.TEXTURE_2D,xt,Dt,Kt,Ht,Rt);A.generateMipmaps=!1}else le?(he&&e.texStorage2D(i.TEXTURE_2D,Xt,Dt,ut.width,ut.height),e.texSubImage2D(i.TEXTURE_2D,0,0,0,Kt,Ht,ut)):e.texImage2D(i.TEXTURE_2D,0,Dt,Kt,Ht,ut);_(A,Jt)&&x(ct),St.__version=at.version,A.onUpdate&&A.onUpdate(A)}C.__version=A.version}function gt(C,A,V){if(A.image.length!==6)return;let ct=rt(C,A),ht=A.source;e.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+V);let at=n.get(ht);if(ht.version!==at.__version||ct===!0){e.activeTexture(i.TEXTURE0+V);let St=pe.getPrimaries(pe.workingColorSpace),mt=A.colorSpace===Ge?null:pe.getPrimaries(A.colorSpace),Tt=A.colorSpace===Ge||St===mt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,A.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,A.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Tt);let zt=A.isCompressedTexture||A.image[0].isCompressedTexture,Vt=A.image[0]&&A.image[0].isDataTexture,ut=[];for(let xt=0;xt<6;xt++)!zt&&!Vt?ut[xt]=y(A.image[xt],!1,!0,s.maxCubemapSize):ut[xt]=Vt?A.image[xt].image:A.image[xt],ut[xt]=et(A,ut[xt]);let Jt=ut[0],Kt=p(Jt)||a,Ht=r.convert(A.format,A.colorSpace),Dt=r.convert(A.type),Rt=b(A.internalFormat,Ht,Dt,A.colorSpace),Wt=a&&A.isVideoTexture!==!0,le=at.__version===void 0||ct===!0,he=T(A,Jt,Kt);G(i.TEXTURE_CUBE_MAP,A,Kt);let Xt;if(zt){Wt&&le&&e.texStorage2D(i.TEXTURE_CUBE_MAP,he,Rt,Jt.width,Jt.height);for(let xt=0;xt<6;xt++){Xt=ut[xt].mipmaps;for(let N=0;N<Xt.length;N++){let Et=Xt[N];A.format!==Tn?Ht!==null?Wt?e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,N,0,0,Et.width,Et.height,Ht,Et.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,N,Rt,Et.width,Et.height,0,Et.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Wt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,N,0,0,Et.width,Et.height,Ht,Dt,Et.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,N,Rt,Et.width,Et.height,0,Ht,Dt,Et.data)}}}else{Xt=A.mipmaps,Wt&&le&&(Xt.length>0&&he++,e.texStorage2D(i.TEXTURE_CUBE_MAP,he,Rt,ut[0].width,ut[0].height));for(let xt=0;xt<6;xt++)if(Vt){Wt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,0,0,ut[xt].width,ut[xt].height,Ht,Dt,ut[xt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,Rt,ut[xt].width,ut[xt].height,0,Ht,Dt,ut[xt].data);for(let N=0;N<Xt.length;N++){let Mt=Xt[N].image[xt].image;Wt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,N+1,0,0,Mt.width,Mt.height,Ht,Dt,Mt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,N+1,Rt,Mt.width,Mt.height,0,Ht,Dt,Mt.data)}}else{Wt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,0,0,Ht,Dt,ut[xt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,Rt,Ht,Dt,ut[xt]);for(let N=0;N<Xt.length;N++){let Et=Xt[N];Wt?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,N+1,0,0,Ht,Dt,Et.image[xt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xt,N+1,Rt,Ht,Dt,Et.image[xt])}}}_(A,Kt)&&x(i.TEXTURE_CUBE_MAP),at.__version=ht.version,A.onUpdate&&A.onUpdate(A)}C.__version=A.version}function wt(C,A,V,ct,ht,at){let St=r.convert(V.format,V.colorSpace),mt=r.convert(V.type),Tt=b(V.internalFormat,St,mt,V.colorSpace);if(!n.get(A).__hasExternalTextures){let Vt=Math.max(1,A.width>>at),ut=Math.max(1,A.height>>at);ht===i.TEXTURE_3D||ht===i.TEXTURE_2D_ARRAY?e.texImage3D(ht,at,Tt,Vt,ut,A.depth,0,St,mt,null):e.texImage2D(ht,at,Tt,Vt,ut,0,St,mt,null)}e.bindFramebuffer(i.FRAMEBUFFER,C),F(A)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ct,ht,n.get(V).__webglTexture,0,H(A)):(ht===i.TEXTURE_2D||ht>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ht<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ct,ht,n.get(V).__webglTexture,at),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ut(C,A,V){if(i.bindRenderbuffer(i.RENDERBUFFER,C),A.depthBuffer&&!A.stencilBuffer){let ct=a===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(V||F(A)){let ht=A.depthTexture;ht&&ht.isDepthTexture&&(ht.type===ri?ct=i.DEPTH_COMPONENT32F:ht.type===si&&(ct=i.DEPTH_COMPONENT24));let at=H(A);F(A)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,at,ct,A.width,A.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,at,ct,A.width,A.height)}else i.renderbufferStorage(i.RENDERBUFFER,ct,A.width,A.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,C)}else if(A.depthBuffer&&A.stencilBuffer){let ct=H(A);V&&F(A)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ct,i.DEPTH24_STENCIL8,A.width,A.height):F(A)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ct,i.DEPTH24_STENCIL8,A.width,A.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,C)}else{let ct=A.isWebGLMultipleRenderTargets===!0?A.texture:[A.texture];for(let ht=0;ht<ct.length;ht++){let at=ct[ht],St=r.convert(at.format,at.colorSpace),mt=r.convert(at.type),Tt=b(at.internalFormat,St,mt,at.colorSpace),zt=H(A);V&&F(A)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,zt,Tt,A.width,A.height):F(A)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,zt,Tt,A.width,A.height):i.renderbufferStorage(i.RENDERBUFFER,Tt,A.width,A.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Nt(C,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,C),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(A.depthTexture).__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),X(A.depthTexture,0);let ct=n.get(A.depthTexture).__webglTexture,ht=H(A);if(A.depthTexture.format===bi)F(A)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ct,0,ht):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,ct,0);else if(A.depthTexture.format===as)F(A)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ct,0,ht):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,ct,0);else throw new Error("Unknown depthTexture format")}function Ct(C){let A=n.get(C),V=C.isWebGLCubeRenderTarget===!0;if(C.depthTexture&&!A.__autoAllocateDepthBuffer){if(V)throw new Error("target.depthTexture not supported in Cube render targets");Nt(A.__webglFramebuffer,C)}else if(V){A.__webglDepthbuffer=[];for(let ct=0;ct<6;ct++)e.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer[ct]),A.__webglDepthbuffer[ct]=i.createRenderbuffer(),Ut(A.__webglDepthbuffer[ct],C,!1)}else e.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer=i.createRenderbuffer(),Ut(A.__webglDepthbuffer,C,!1);e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ft(C,A,V){let ct=n.get(C);A!==void 0&&wt(ct.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&Ct(C)}function v(C){let A=C.texture,V=n.get(C),ct=n.get(A);C.addEventListener("dispose",I),C.isWebGLMultipleRenderTargets!==!0&&(ct.__webglTexture===void 0&&(ct.__webglTexture=i.createTexture()),ct.__version=A.version,o.memory.textures++);let ht=C.isWebGLCubeRenderTarget===!0,at=C.isWebGLMultipleRenderTargets===!0,St=p(C)||a;if(ht){V.__webglFramebuffer=[];for(let mt=0;mt<6;mt++)if(a&&A.mipmaps&&A.mipmaps.length>0){V.__webglFramebuffer[mt]=[];for(let Tt=0;Tt<A.mipmaps.length;Tt++)V.__webglFramebuffer[mt][Tt]=i.createFramebuffer()}else V.__webglFramebuffer[mt]=i.createFramebuffer()}else{if(a&&A.mipmaps&&A.mipmaps.length>0){V.__webglFramebuffer=[];for(let mt=0;mt<A.mipmaps.length;mt++)V.__webglFramebuffer[mt]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(at)if(s.drawBuffers){let mt=C.texture;for(let Tt=0,zt=mt.length;Tt<zt;Tt++){let Vt=n.get(mt[Tt]);Vt.__webglTexture===void 0&&(Vt.__webglTexture=i.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&C.samples>0&&F(C)===!1){let mt=at?A:[A];V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let Tt=0;Tt<mt.length;Tt++){let zt=mt[Tt];V.__webglColorRenderbuffer[Tt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[Tt]);let Vt=r.convert(zt.format,zt.colorSpace),ut=r.convert(zt.type),Jt=b(zt.internalFormat,Vt,ut,zt.colorSpace,C.isXRRenderTarget===!0),Kt=H(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,Kt,Jt,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Tt,i.RENDERBUFFER,V.__webglColorRenderbuffer[Tt])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),Ut(V.__webglDepthRenderbuffer,C,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ht){e.bindTexture(i.TEXTURE_CUBE_MAP,ct.__webglTexture),G(i.TEXTURE_CUBE_MAP,A,St);for(let mt=0;mt<6;mt++)if(a&&A.mipmaps&&A.mipmaps.length>0)for(let Tt=0;Tt<A.mipmaps.length;Tt++)wt(V.__webglFramebuffer[mt][Tt],C,A,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,Tt);else wt(V.__webglFramebuffer[mt],C,A,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0);_(A,St)&&x(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(at){let mt=C.texture;for(let Tt=0,zt=mt.length;Tt<zt;Tt++){let Vt=mt[Tt],ut=n.get(Vt);e.bindTexture(i.TEXTURE_2D,ut.__webglTexture),G(i.TEXTURE_2D,Vt,St),wt(V.__webglFramebuffer,C,Vt,i.COLOR_ATTACHMENT0+Tt,i.TEXTURE_2D,0),_(Vt,St)&&x(i.TEXTURE_2D)}e.unbindTexture()}else{let mt=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(a?mt=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(mt,ct.__webglTexture),G(mt,A,St),a&&A.mipmaps&&A.mipmaps.length>0)for(let Tt=0;Tt<A.mipmaps.length;Tt++)wt(V.__webglFramebuffer[Tt],C,A,i.COLOR_ATTACHMENT0,mt,Tt);else wt(V.__webglFramebuffer,C,A,i.COLOR_ATTACHMENT0,mt,0);_(A,St)&&x(mt),e.unbindTexture()}C.depthBuffer&&Ct(C)}function z(C){let A=p(C)||a,V=C.isWebGLMultipleRenderTargets===!0?C.texture:[C.texture];for(let ct=0,ht=V.length;ct<ht;ct++){let at=V[ct];if(_(at,A)){let St=C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,mt=n.get(at).__webglTexture;e.bindTexture(St,mt),x(St),e.unbindTexture()}}}function k(C){if(a&&C.samples>0&&F(C)===!1){let A=C.isWebGLMultipleRenderTargets?C.texture:[C.texture],V=C.width,ct=C.height,ht=i.COLOR_BUFFER_BIT,at=[],St=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,mt=n.get(C),Tt=C.isWebGLMultipleRenderTargets===!0;if(Tt)for(let zt=0;zt<A.length;zt++)e.bindFramebuffer(i.FRAMEBUFFER,mt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+zt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,mt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+zt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,mt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,mt.__webglFramebuffer);for(let zt=0;zt<A.length;zt++){at.push(i.COLOR_ATTACHMENT0+zt),C.depthBuffer&&at.push(St);let Vt=mt.__ignoreDepthValues!==void 0?mt.__ignoreDepthValues:!1;if(Vt===!1&&(C.depthBuffer&&(ht|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&(ht|=i.STENCIL_BUFFER_BIT)),Tt&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,mt.__webglColorRenderbuffer[zt]),Vt===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[St]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[St])),Tt){let ut=n.get(A[zt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ut,0)}i.blitFramebuffer(0,0,V,ct,0,0,V,ct,ht,i.NEAREST),c&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,at)}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Tt)for(let zt=0;zt<A.length;zt++){e.bindFramebuffer(i.FRAMEBUFFER,mt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+zt,i.RENDERBUFFER,mt.__webglColorRenderbuffer[zt]);let Vt=n.get(A[zt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,mt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+zt,i.TEXTURE_2D,Vt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,mt.__webglMultisampledFramebuffer)}}function H(C){return Math.min(s.maxSamples,C.samples)}function F(C){let A=n.get(C);return a&&C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function it(C){let A=o.render.frame;h.get(C)!==A&&(h.set(C,A),C.update())}function et(C,A){let V=C.colorSpace,ct=C.format,ht=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||C.format===ka||V!==qn&&V!==Ge&&(pe.getTransfer(V)===xe?a===!1?t.has("EXT_sRGB")===!0&&ct===Tn?(C.format=ka,C.minFilter=on,C.generateMipmaps=!1):A=Xr.sRGBToLinear(A):(ct!==Tn||ht!==ai)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",V)),A}this.allocateTextureUnit=D,this.resetTextureUnits=B,this.setTexture2D=X,this.setTexture2DArray=$,this.setTexture3D=Z,this.setTextureCube=q,this.rebindTextures=Ft,this.setupRenderTarget=v,this.updateRenderTargetMipmap=z,this.updateMultisampleRenderTarget=k,this.setupDepthRenderbuffer=Ct,this.setupFrameBufferTexture=wt,this.useMultisampledRTT=F}function Eg(i,t,e){let n=e.isWebGL2;function s(r,o=Ge){let a,l=pe.getTransfer(o);if(r===ai)return i.UNSIGNED_BYTE;if(r===kh)return i.UNSIGNED_SHORT_4_4_4_4;if(r===Nh)return i.UNSIGNED_SHORT_5_5_5_1;if(r===gd)return i.BYTE;if(r===xd)return i.SHORT;if(r===bl)return i.UNSIGNED_SHORT;if(r===Uh)return i.INT;if(r===si)return i.UNSIGNED_INT;if(r===ri)return i.FLOAT;if(r===Ei)return n?i.HALF_FLOAT:(a=t.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===yd)return i.ALPHA;if(r===Tn)return i.RGBA;if(r===_d)return i.LUMINANCE;if(r===vd)return i.LUMINANCE_ALPHA;if(r===bi)return i.DEPTH_COMPONENT;if(r===as)return i.DEPTH_STENCIL;if(r===ka)return a=t.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===bd)return i.RED;if(r===Fh)return i.RED_INTEGER;if(r===Md)return i.RG;if(r===Oh)return i.RG_INTEGER;if(r===Bh)return i.RGBA_INTEGER;if(r===Jo||r===Ko||r===$o||r===jo)if(l===xe)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===Jo)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Ko)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===$o)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===jo)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===Jo)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Ko)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===$o)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===jo)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===tc||r===ec||r===nc||r===ic)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===tc)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===ec)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===nc)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===ic)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Hh)return a=t.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===sc||r===rc)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(r===sc)return l===xe?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===rc)return l===xe?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===oc||r===ac||r===lc||r===cc||r===hc||r===uc||r===dc||r===fc||r===pc||r===mc||r===gc||r===xc||r===yc||r===_c)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(r===oc)return l===xe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===ac)return l===xe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===lc)return l===xe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===cc)return l===xe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===hc)return l===xe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===uc)return l===xe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===dc)return l===xe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===fc)return l===xe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===pc)return l===xe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===mc)return l===xe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===gc)return l===xe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===xc)return l===xe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===yc)return l===xe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===_c)return l===xe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Qo||r===vc||r===bc)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(r===Qo)return l===xe?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===vc)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===bc)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Ed||r===Mc||r===Ec||r===wc)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(r===Qo)return a.COMPRESSED_RED_RGTC1_EXT;if(r===Mc)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Ec)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===wc)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===vi?n?i.UNSIGNED_INT_24_8:(a=t.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):i[r]!==void 0?i[r]:null}return{convert:s}}var Ka=class extends Ye{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},Ot=class extends Ee{constructor(){super(),this.isGroup=!0,this.type="Group"}},wg={type:"move"},Us=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ot,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ot,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ot,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let y of t.hand.values()){let p=e.getJointPose(y,n),g=this._getHandJoint(c,y);p!==null&&(g.matrix.fromArray(p.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=p.radius),g.visible=p!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(wg)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new Ot;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},$a=class extends Dn{constructor(t,e){super();let n=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,m=null,y=e.getContextAttributes(),p=null,g=null,_=[],x=[],b=new yt,T=null,E=new Ye;E.layers.enable(1),E.viewport=new Me;let M=new Ye;M.layers.enable(2),M.viewport=new Me;let I=[E,M],w=new Ka;w.layers.enable(1),w.layers.enable(2);let S=null,R=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let rt=_[G];return rt===void 0&&(rt=new Us,_[G]=rt),rt.getTargetRaySpace()},this.getControllerGrip=function(G){let rt=_[G];return rt===void 0&&(rt=new Us,_[G]=rt),rt.getGripSpace()},this.getHand=function(G){let rt=_[G];return rt===void 0&&(rt=new Us,_[G]=rt),rt.getHandSpace()};function U(G){let rt=x.indexOf(G.inputSource);if(rt===-1)return;let pt=_[rt];pt!==void 0&&(pt.update(G.inputSource,G.frame,c||o),pt.dispatchEvent({type:G.type,data:G.inputSource}))}function B(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",B),s.removeEventListener("inputsourceschange",D);for(let G=0;G<_.length;G++){let rt=x[G];rt!==null&&(x[G]=null,_[G].disconnect(rt))}S=null,R=null,t.setRenderTarget(p),f=null,d=null,u=null,s=null,g=null,tt.stop(),n.isPresenting=!1,t.setPixelRatio(T),t.setSize(b.width,b.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){r=G,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){a=G,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(G){c=G},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(G){if(s=G,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",B),s.addEventListener("inputsourceschange",D),y.xrCompatible!==!0&&await e.makeXRCompatible(),T=t.getPixelRatio(),t.getSize(b),s.renderState.layers===void 0||t.capabilities.isWebGL2===!1){let rt={antialias:s.renderState.layers===void 0?y.antialias:!0,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,rt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),g=new Rn(f.framebufferWidth,f.framebufferHeight,{format:Tn,type:ai,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil})}else{let rt=null,pt=null,gt=null;y.depth&&(gt=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,rt=y.stencil?as:bi,pt=y.stencil?vi:si);let wt={colorFormat:e.RGBA8,depthFormat:gt,scaleFactor:r};u=new XRWebGLBinding(s,e),d=u.createProjectionLayer(wt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),g=new Rn(d.textureWidth,d.textureHeight,{format:Tn,type:ai,depthTexture:new to(d.textureWidth,d.textureHeight,pt,void 0,void 0,void 0,void 0,void 0,void 0,rt),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0});let Ut=t.properties.get(g);Ut.__ignoreDepthValues=d.ignoreDepthValues}g.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),tt.setContext(s),tt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function D(G){for(let rt=0;rt<G.removed.length;rt++){let pt=G.removed[rt],gt=x.indexOf(pt);gt>=0&&(x[gt]=null,_[gt].disconnect(pt))}for(let rt=0;rt<G.added.length;rt++){let pt=G.added[rt],gt=x.indexOf(pt);if(gt===-1){for(let Ut=0;Ut<_.length;Ut++)if(Ut>=x.length){x.push(pt),gt=Ut;break}else if(x[Ut]===null){x[Ut]=pt,gt=Ut;break}if(gt===-1)break}let wt=_[gt];wt&&wt.connect(pt)}}let O=new L,X=new L;function $(G,rt,pt){O.setFromMatrixPosition(rt.matrixWorld),X.setFromMatrixPosition(pt.matrixWorld);let gt=O.distanceTo(X),wt=rt.projectionMatrix.elements,Ut=pt.projectionMatrix.elements,Nt=wt[14]/(wt[10]-1),Ct=wt[14]/(wt[10]+1),Ft=(wt[9]+1)/wt[5],v=(wt[9]-1)/wt[5],z=(wt[8]-1)/wt[0],k=(Ut[8]+1)/Ut[0],H=Nt*z,F=Nt*k,it=gt/(-z+k),et=it*-z;rt.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(et),G.translateZ(it),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert();let C=Nt+it,A=Ct+it,V=H-et,ct=F+(gt-et),ht=Ft*Ct/A*C,at=v*Ct/A*C;G.projectionMatrix.makePerspective(V,ct,ht,at,C,A),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}function Z(G,rt){rt===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(rt.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(s===null)return;w.near=M.near=E.near=G.near,w.far=M.far=E.far=G.far,(S!==w.near||R!==w.far)&&(s.updateRenderState({depthNear:w.near,depthFar:w.far}),S=w.near,R=w.far);let rt=G.parent,pt=w.cameras;Z(w,rt);for(let gt=0;gt<pt.length;gt++)Z(pt[gt],rt);pt.length===2?$(w,E,M):w.projectionMatrix.copy(E.projectionMatrix),q(G,w,rt)};function q(G,rt,pt){pt===null?G.matrix.copy(rt.matrixWorld):(G.matrix.copy(pt.matrixWorld),G.matrix.invert(),G.matrix.multiply(rt.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(rt.projectionMatrix),G.projectionMatrixInverse.copy(rt.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=Vr*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return w},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(G){l=G,d!==null&&(d.fixedFoveation=G),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=G)};let Q=null;function ot(G,rt){if(h=rt.getViewerPose(c||o),m=rt,h!==null){let pt=h.views;f!==null&&(t.setRenderTargetFramebuffer(g,f.framebuffer),t.setRenderTarget(g));let gt=!1;pt.length!==w.cameras.length&&(w.cameras.length=0,gt=!0);for(let wt=0;wt<pt.length;wt++){let Ut=pt[wt],Nt=null;if(f!==null)Nt=f.getViewport(Ut);else{let Ft=u.getViewSubImage(d,Ut);Nt=Ft.viewport,wt===0&&(t.setRenderTargetTextures(g,Ft.colorTexture,d.ignoreDepthValues?void 0:Ft.depthStencilTexture),t.setRenderTarget(g))}let Ct=I[wt];Ct===void 0&&(Ct=new Ye,Ct.layers.enable(wt),Ct.viewport=new Me,I[wt]=Ct),Ct.matrix.fromArray(Ut.transform.matrix),Ct.matrix.decompose(Ct.position,Ct.quaternion,Ct.scale),Ct.projectionMatrix.fromArray(Ut.projectionMatrix),Ct.projectionMatrixInverse.copy(Ct.projectionMatrix).invert(),Ct.viewport.set(Nt.x,Nt.y,Nt.width,Nt.height),wt===0&&(w.matrix.copy(Ct.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale)),gt===!0&&w.cameras.push(Ct)}}for(let pt=0;pt<_.length;pt++){let gt=x[pt],wt=_[pt];gt!==null&&wt!==void 0&&wt.update(gt,rt,c||o)}Q&&Q(G,rt),rt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:rt}),m=null}let tt=new Zh;tt.setAnimationLoop(ot),this.setAnimationLoop=function(G){Q=G},this.dispose=function(){}}};function Sg(i,t){function e(p,g){p.matrixAutoUpdate===!0&&p.updateMatrix(),g.value.copy(p.matrix)}function n(p,g){g.color.getRGB(p.fogColor.value,Yh(i)),g.isFog?(p.fogNear.value=g.near,p.fogFar.value=g.far):g.isFogExp2&&(p.fogDensity.value=g.density)}function s(p,g,_,x,b){g.isMeshBasicMaterial||g.isMeshLambertMaterial?r(p,g):g.isMeshToonMaterial?(r(p,g),u(p,g)):g.isMeshPhongMaterial?(r(p,g),h(p,g)):g.isMeshStandardMaterial?(r(p,g),d(p,g),g.isMeshPhysicalMaterial&&f(p,g,b)):g.isMeshMatcapMaterial?(r(p,g),m(p,g)):g.isMeshDepthMaterial?r(p,g):g.isMeshDistanceMaterial?(r(p,g),y(p,g)):g.isMeshNormalMaterial?r(p,g):g.isLineBasicMaterial?(o(p,g),g.isLineDashedMaterial&&a(p,g)):g.isPointsMaterial?l(p,g,_,x):g.isSpriteMaterial?c(p,g):g.isShadowMaterial?(p.color.value.copy(g.color),p.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(p,g){p.opacity.value=g.opacity,g.color&&p.diffuse.value.copy(g.color),g.emissive&&p.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.bumpMap&&(p.bumpMap.value=g.bumpMap,e(g.bumpMap,p.bumpMapTransform),p.bumpScale.value=g.bumpScale,g.side===Qe&&(p.bumpScale.value*=-1)),g.normalMap&&(p.normalMap.value=g.normalMap,e(g.normalMap,p.normalMapTransform),p.normalScale.value.copy(g.normalScale),g.side===Qe&&p.normalScale.value.negate()),g.displacementMap&&(p.displacementMap.value=g.displacementMap,e(g.displacementMap,p.displacementMapTransform),p.displacementScale.value=g.displacementScale,p.displacementBias.value=g.displacementBias),g.emissiveMap&&(p.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,p.emissiveMapTransform)),g.specularMap&&(p.specularMap.value=g.specularMap,e(g.specularMap,p.specularMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest);let _=t.get(g).envMap;if(_&&(p.envMap.value=_,p.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=g.reflectivity,p.ior.value=g.ior,p.refractionRatio.value=g.refractionRatio),g.lightMap){p.lightMap.value=g.lightMap;let x=i._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=g.lightMapIntensity*x,e(g.lightMap,p.lightMapTransform)}g.aoMap&&(p.aoMap.value=g.aoMap,p.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,p.aoMapTransform))}function o(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform))}function a(p,g){p.dashSize.value=g.dashSize,p.totalSize.value=g.dashSize+g.gapSize,p.scale.value=g.scale}function l(p,g,_,x){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.size.value=g.size*_,p.scale.value=x*.5,g.map&&(p.map.value=g.map,e(g.map,p.uvTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function c(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.rotation.value=g.rotation,g.map&&(p.map.value=g.map,e(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,e(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function h(p,g){p.specular.value.copy(g.specular),p.shininess.value=Math.max(g.shininess,1e-4)}function u(p,g){g.gradientMap&&(p.gradientMap.value=g.gradientMap)}function d(p,g){p.metalness.value=g.metalness,g.metalnessMap&&(p.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,p.metalnessMapTransform)),p.roughness.value=g.roughness,g.roughnessMap&&(p.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,p.roughnessMapTransform)),t.get(g).envMap&&(p.envMapIntensity.value=g.envMapIntensity)}function f(p,g,_){p.ior.value=g.ior,g.sheen>0&&(p.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),p.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(p.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,p.sheenColorMapTransform)),g.sheenRoughnessMap&&(p.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,p.sheenRoughnessMapTransform))),g.clearcoat>0&&(p.clearcoat.value=g.clearcoat,p.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(p.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,p.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(p.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Qe&&p.clearcoatNormalScale.value.negate())),g.iridescence>0&&(p.iridescence.value=g.iridescence,p.iridescenceIOR.value=g.iridescenceIOR,p.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(p.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,p.iridescenceMapTransform)),g.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),g.transmission>0&&(p.transmission.value=g.transmission,p.transmissionSamplerMap.value=_.texture,p.transmissionSamplerSize.value.set(_.width,_.height),g.transmissionMap&&(p.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,p.transmissionMapTransform)),p.thickness.value=g.thickness,g.thicknessMap&&(p.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=g.attenuationDistance,p.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(p.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(p.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=g.specularIntensity,p.specularColor.value.copy(g.specularColor),g.specularColorMap&&(p.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,p.specularColorMapTransform)),g.specularIntensityMap&&(p.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,g){g.matcap&&(p.matcap.value=g.matcap)}function y(p,g){let _=t.get(g).light;p.referencePosition.value.setFromMatrixPosition(_.matrixWorld),p.nearDistance.value=_.shadow.camera.near,p.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Tg(i,t,e,n){let s={},r={},o=[],a=e.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(_,x){let b=x.program;n.uniformBlockBinding(_,b)}function c(_,x){let b=s[_.id];b===void 0&&(m(_),b=h(_),s[_.id]=b,_.addEventListener("dispose",p));let T=x.program;n.updateUBOMapping(_,T);let E=t.render.frame;r[_.id]!==E&&(d(_),r[_.id]=E)}function h(_){let x=u();_.__bindingPointIndex=x;let b=i.createBuffer(),T=_.__size,E=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,b),i.bufferData(i.UNIFORM_BUFFER,T,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,b),b}function u(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(_){let x=s[_.id],b=_.uniforms,T=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let E=0,M=b.length;E<M;E++){let I=Array.isArray(b[E])?b[E]:[b[E]];for(let w=0,S=I.length;w<S;w++){let R=I[w];if(f(R,E,w,T)===!0){let U=R.__offset,B=Array.isArray(R.value)?R.value:[R.value],D=0;for(let O=0;O<B.length;O++){let X=B[O],$=y(X);typeof X=="number"||typeof X=="boolean"?(R.__data[0]=X,i.bufferSubData(i.UNIFORM_BUFFER,U+D,R.__data)):X.isMatrix3?(R.__data[0]=X.elements[0],R.__data[1]=X.elements[1],R.__data[2]=X.elements[2],R.__data[3]=0,R.__data[4]=X.elements[3],R.__data[5]=X.elements[4],R.__data[6]=X.elements[5],R.__data[7]=0,R.__data[8]=X.elements[6],R.__data[9]=X.elements[7],R.__data[10]=X.elements[8],R.__data[11]=0):(X.toArray(R.__data,D),D+=$.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,U,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(_,x,b,T){let E=_.value,M=x+"_"+b;if(T[M]===void 0)return typeof E=="number"||typeof E=="boolean"?T[M]=E:T[M]=E.clone(),!0;{let I=T[M];if(typeof E=="number"||typeof E=="boolean"){if(I!==E)return T[M]=E,!0}else if(I.equals(E)===!1)return I.copy(E),!0}return!1}function m(_){let x=_.uniforms,b=0,T=16;for(let M=0,I=x.length;M<I;M++){let w=Array.isArray(x[M])?x[M]:[x[M]];for(let S=0,R=w.length;S<R;S++){let U=w[S],B=Array.isArray(U.value)?U.value:[U.value];for(let D=0,O=B.length;D<O;D++){let X=B[D],$=y(X),Z=b%T;Z!==0&&T-Z<$.boundary&&(b+=T-Z),U.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=b,b+=$.storage}}}let E=b%T;return E>0&&(b+=T-E),_.__size=b,_.__cache={},this}function y(_){let x={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(x.boundary=4,x.storage=4):_.isVector2?(x.boundary=8,x.storage=8):_.isVector3||_.isColor?(x.boundary=16,x.storage=12):_.isVector4?(x.boundary=16,x.storage=16):_.isMatrix3?(x.boundary=48,x.storage=48):_.isMatrix4?(x.boundary=64,x.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),x}function p(_){let x=_.target;x.removeEventListener("dispose",p);let b=o.indexOf(x.__bindingPointIndex);o.splice(b,1),i.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function g(){for(let _ in s)i.deleteBuffer(s[_]);o=[],s={},r={}}return{bind:l,update:c,dispose:g}}var Hs=class{constructor(t={}){let{canvas:e=Ud(),context:n=null,depth:s=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=o;let f=new Uint32Array(4),m=new Int32Array(4),y=null,p=null,g=[],_=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ye,this._useLegacyLights=!1,this.toneMapping=oi,this.toneMappingExposure=1;let x=this,b=!1,T=0,E=0,M=null,I=-1,w=null,S=new Me,R=new Me,U=null,B=new Zt(0),D=0,O=e.width,X=e.height,$=1,Z=null,q=null,Q=new Me(0,0,O,X),ot=new Me(0,0,O,X),tt=!1,G=new Bs,rt=!1,pt=!1,gt=null,wt=new me,Ut=new yt,Nt=new L,Ct={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ft(){return M===null?$:1}let v=n;function z(P,W){for(let K=0;K<P.length;K++){let j=P[K],J=e.getContext(j,W);if(J!==null)return J}return null}try{let P={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine","three.js r160"),e.addEventListener("webglcontextlost",xt,!1),e.addEventListener("webglcontextrestored",N,!1),e.addEventListener("webglcontextcreationerror",Et,!1),v===null){let W=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&W.shift(),v=z(W,P),v===null)throw z(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext!="undefined"&&v instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),v.getShaderPrecisionFormat===void 0&&(v.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(P){throw console.error("THREE.WebGLRenderer: "+P.message),P}let k,H,F,it,et,C,A,V,ct,ht,at,St,mt,Tt,zt,Vt,ut,Jt,Kt,Ht,Dt,Rt,Wt,le;function he(){k=new X0(v),H=new O0(v,k,t),k.init(H),Rt=new Eg(v,k,H),F=new bg(v,k,H),it=new Z0(v),et=new cg,C=new Mg(v,k,F,et,H,Rt,it),A=new H0(x),V=new W0(x),ct=new ef(v,H),Wt=new N0(v,k,ct,H),ht=new q0(v,ct,it,Wt),at=new j0(v,ht,ct,it),Kt=new $0(v,H,C),Vt=new B0(et),St=new lg(x,A,V,k,H,Wt,Vt),mt=new Sg(x,et),Tt=new ug,zt=new xg(k,H),Jt=new k0(x,A,V,F,at,d,l),ut=new vg(x,at,H),le=new Tg(v,it,H,F),Ht=new F0(v,k,it,H),Dt=new Y0(v,k,it,H),it.programs=St.programs,x.capabilities=H,x.extensions=k,x.properties=et,x.renderLists=Tt,x.shadowMap=ut,x.state=F,x.info=it}he();let Xt=new $a(x,v);this.xr=Xt,this.getContext=function(){return v},this.getContextAttributes=function(){return v.getContextAttributes()},this.forceContextLoss=function(){let P=k.get("WEBGL_lose_context");P&&P.loseContext()},this.forceContextRestore=function(){let P=k.get("WEBGL_lose_context");P&&P.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(P){P!==void 0&&($=P,this.setSize(O,X,!1))},this.getSize=function(P){return P.set(O,X)},this.setSize=function(P,W,K=!0){if(Xt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=P,X=W,e.width=Math.floor(P*$),e.height=Math.floor(W*$),K===!0&&(e.style.width=P+"px",e.style.height=W+"px"),this.setViewport(0,0,P,W)},this.getDrawingBufferSize=function(P){return P.set(O*$,X*$).floor()},this.setDrawingBufferSize=function(P,W,K){O=P,X=W,$=K,e.width=Math.floor(P*K),e.height=Math.floor(W*K),this.setViewport(0,0,P,W)},this.getCurrentViewport=function(P){return P.copy(S)},this.getViewport=function(P){return P.copy(Q)},this.setViewport=function(P,W,K,j){P.isVector4?Q.set(P.x,P.y,P.z,P.w):Q.set(P,W,K,j),F.viewport(S.copy(Q).multiplyScalar($).floor())},this.getScissor=function(P){return P.copy(ot)},this.setScissor=function(P,W,K,j){P.isVector4?ot.set(P.x,P.y,P.z,P.w):ot.set(P,W,K,j),F.scissor(R.copy(ot).multiplyScalar($).floor())},this.getScissorTest=function(){return tt},this.setScissorTest=function(P){F.setScissorTest(tt=P)},this.setOpaqueSort=function(P){Z=P},this.setTransparentSort=function(P){q=P},this.getClearColor=function(P){return P.copy(Jt.getClearColor())},this.setClearColor=function(){Jt.setClearColor.apply(Jt,arguments)},this.getClearAlpha=function(){return Jt.getClearAlpha()},this.setClearAlpha=function(){Jt.setClearAlpha.apply(Jt,arguments)},this.clear=function(P=!0,W=!0,K=!0){let j=0;if(P){let J=!1;if(M!==null){let At=M.texture.format;J=At===Bh||At===Oh||At===Fh}if(J){let At=M.texture.type,It=At===ai||At===si||At===bl||At===vi||At===kh||At===Nh,Bt=Jt.getClearColor(),Gt=Jt.getClearAlpha(),jt=Bt.r,qt=Bt.g,Yt=Bt.b;It?(f[0]=jt,f[1]=qt,f[2]=Yt,f[3]=Gt,v.clearBufferuiv(v.COLOR,0,f)):(m[0]=jt,m[1]=qt,m[2]=Yt,m[3]=Gt,v.clearBufferiv(v.COLOR,0,m))}else j|=v.COLOR_BUFFER_BIT}W&&(j|=v.DEPTH_BUFFER_BIT),K&&(j|=v.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),v.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",xt,!1),e.removeEventListener("webglcontextrestored",N,!1),e.removeEventListener("webglcontextcreationerror",Et,!1),Tt.dispose(),zt.dispose(),et.dispose(),A.dispose(),V.dispose(),at.dispose(),Wt.dispose(),le.dispose(),St.dispose(),Xt.dispose(),Xt.removeEventListener("sessionstart",Fe),Xt.removeEventListener("sessionend",ce),gt&&(gt.dispose(),gt=null),Xe.stop()};function xt(P){P.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function N(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;let P=it.autoReset,W=ut.enabled,K=ut.autoUpdate,j=ut.needsUpdate,J=ut.type;he(),it.autoReset=P,ut.enabled=W,ut.autoUpdate=K,ut.needsUpdate=j,ut.type=J}function Et(P){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",P.statusMessage)}function Mt(P){let W=P.target;W.removeEventListener("dispose",Mt),Lt(W)}function Lt(P){kt(P),et.remove(P)}function kt(P){let W=et.get(P).programs;W!==void 0&&(W.forEach(function(K){St.releaseProgram(K)}),P.isShaderMaterial&&St.releaseShaderCache(P))}this.renderBufferDirect=function(P,W,K,j,J,At){W===null&&(W=Ct);let It=J.isMesh&&J.matrixWorld.determinant()<0,Bt=Un(P,W,K,j,J);F.setMaterial(j,It);let Gt=K.index,jt=1;if(j.wireframe===!0){if(Gt=ht.getWireframeAttribute(K),Gt===void 0)return;jt=2}let qt=K.drawRange,Yt=K.attributes.position,Ce=qt.start*jt,cn=(qt.start+qt.count)*jt;At!==null&&(Ce=Math.max(Ce,At.start*jt),cn=Math.min(cn,(At.start+At.count)*jt)),Gt!==null?(Ce=Math.max(Ce,0),cn=Math.min(cn,Gt.count)):Yt!=null&&(Ce=Math.max(Ce,0),cn=Math.min(cn,Yt.count));let Oe=cn-Ce;if(Oe<0||Oe===1/0)return;Wt.setup(J,j,Bt,K,Gt);let kn,Se=Ht;if(Gt!==null&&(kn=ct.get(Gt),Se=Dt,Se.setIndex(kn)),J.isMesh)j.wireframe===!0?(F.setLineWidth(j.wireframeLinewidth*Ft()),Se.setMode(v.LINES)):Se.setMode(v.TRIANGLES);else if(J.isLine){let Qt=j.linewidth;Qt===void 0&&(Qt=1),F.setLineWidth(Qt*Ft()),J.isLineSegments?Se.setMode(v.LINES):J.isLineLoop?Se.setMode(v.LINE_LOOP):Se.setMode(v.LINE_STRIP)}else J.isPoints?Se.setMode(v.POINTS):J.isSprite&&Se.setMode(v.TRIANGLES);if(J.isBatchedMesh)Se.renderMultiDraw(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount);else if(J.isInstancedMesh)Se.renderInstances(Ce,Oe,J.count);else if(K.isInstancedBufferGeometry){let Qt=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Vo=Math.min(K.instanceCount,Qt);Se.renderInstances(Ce,Oe,Vo)}else Se.render(Ce,Oe)};function fe(P,W,K){P.transparent===!0&&P.side===ue&&P.forceSinglePass===!1?(P.side=Qe,P.needsUpdate=!0,qe(P,W,K),P.side=Xn,P.needsUpdate=!0,qe(P,W,K),P.side=ue):qe(P,W,K)}this.compile=function(P,W,K=null){K===null&&(K=P),p=zt.get(K),p.init(),_.push(p),K.traverseVisible(function(J){J.isLight&&J.layers.test(W.layers)&&(p.pushLight(J),J.castShadow&&p.pushShadow(J))}),P!==K&&P.traverseVisible(function(J){J.isLight&&J.layers.test(W.layers)&&(p.pushLight(J),J.castShadow&&p.pushShadow(J))}),p.setupLights(x._useLegacyLights);let j=new Set;return P.traverse(function(J){let At=J.material;if(At)if(Array.isArray(At))for(let It=0;It<At.length;It++){let Bt=At[It];fe(Bt,K,J),j.add(Bt)}else fe(At,K,J),j.add(At)}),_.pop(),p=null,j},this.compileAsync=function(P,W,K=null){let j=this.compile(P,W,K);return new Promise(J=>{function At(){if(j.forEach(function(It){et.get(It).currentProgram.isReady()&&j.delete(It)}),j.size===0){J(P);return}setTimeout(At,10)}k.get("KHR_parallel_shader_compile")!==null?At():setTimeout(At,10)})};let de=null;function Re(P){de&&de(P)}function Fe(){Xe.stop()}function ce(){Xe.start()}let Xe=new Zh;Xe.setAnimationLoop(Re),typeof self!="undefined"&&Xe.setContext(self),this.setAnimationLoop=function(P){de=P,Xt.setAnimationLoop(P),P===null?Xe.stop():Xe.start()},Xt.addEventListener("sessionstart",Fe),Xt.addEventListener("sessionend",ce),this.render=function(P,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),Xt.enabled===!0&&Xt.isPresenting===!0&&(Xt.cameraAutoUpdate===!0&&Xt.updateCamera(W),W=Xt.getCamera()),P.isScene===!0&&P.onBeforeRender(x,P,W,M),p=zt.get(P,_.length),p.init(),_.push(p),wt.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),G.setFromProjectionMatrix(wt),pt=this.localClippingEnabled,rt=Vt.init(this.clippingPlanes,pt),y=Tt.get(P,g.length),y.init(),g.push(y),ln(P,W,0,x.sortObjects),y.finish(),x.sortObjects===!0&&y.sort(Z,q),this.info.render.frame++,rt===!0&&Vt.beginShadows();let K=p.state.shadowsArray;if(ut.render(K,P,W),rt===!0&&Vt.endShadows(),this.info.autoReset===!0&&this.info.reset(),Jt.render(y,P),p.setupLights(x._useLegacyLights),W.isArrayCamera){let j=W.cameras;for(let J=0,At=j.length;J<At;J++){let It=j[J];Es(y,P,It,It.viewport)}}else Es(y,P,W);M!==null&&(C.updateMultisampleRenderTarget(M),C.updateRenderTargetMipmap(M)),P.isScene===!0&&P.onAfterRender(x,P,W),Wt.resetDefaultState(),I=-1,w=null,_.pop(),_.length>0?p=_[_.length-1]:p=null,g.pop(),g.length>0?y=g[g.length-1]:y=null};function ln(P,W,K,j){if(P.visible===!1)return;if(P.layers.test(W.layers)){if(P.isGroup)K=P.renderOrder;else if(P.isLOD)P.autoUpdate===!0&&P.update(W);else if(P.isLight)p.pushLight(P),P.castShadow&&p.pushShadow(P);else if(P.isSprite){if(!P.frustumCulled||G.intersectsSprite(P)){j&&Nt.setFromMatrixPosition(P.matrixWorld).applyMatrix4(wt);let It=at.update(P),Bt=P.material;Bt.visible&&y.push(P,It,Bt,K,Nt.z,null)}}else if((P.isMesh||P.isLine||P.isPoints)&&(!P.frustumCulled||G.intersectsObject(P))){let It=at.update(P),Bt=P.material;if(j&&(P.boundingSphere!==void 0?(P.boundingSphere===null&&P.computeBoundingSphere(),Nt.copy(P.boundingSphere.center)):(It.boundingSphere===null&&It.computeBoundingSphere(),Nt.copy(It.boundingSphere.center)),Nt.applyMatrix4(P.matrixWorld).applyMatrix4(wt)),Array.isArray(Bt)){let Gt=It.groups;for(let jt=0,qt=Gt.length;jt<qt;jt++){let Yt=Gt[jt],Ce=Bt[Yt.materialIndex];Ce&&Ce.visible&&y.push(P,It,Ce,K,Nt.z,Yt)}}else Bt.visible&&y.push(P,It,Bt,K,Nt.z,null)}}let At=P.children;for(let It=0,Bt=At.length;It<Bt;It++)ln(At[It],W,K,j)}function Es(P,W,K,j){let J=P.opaque,At=P.transmissive,It=P.transparent;p.setupLightsView(K),rt===!0&&Vt.setGlobalState(x.clippingPlanes,K),At.length>0&&st(J,At,W,K),j&&F.viewport(S.copy(j)),J.length>0&&lt(J,W,K),At.length>0&&lt(At,W,K),It.length>0&&lt(It,W,K),F.buffers.depth.setTest(!0),F.buffers.depth.setMask(!0),F.buffers.color.setMask(!0),F.setPolygonOffset(!1)}function st(P,W,K,j){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;let At=H.isWebGL2;gt===null&&(gt=new Rn(1,1,{generateMipmaps:!0,type:k.has("EXT_color_buffer_half_float")?Ei:ai,minFilter:An,samples:At?4:0})),x.getDrawingBufferSize(Ut),At?gt.setSize(Ut.x,Ut.y):gt.setSize(Na(Ut.x),Na(Ut.y));let It=x.getRenderTarget();x.setRenderTarget(gt),x.getClearColor(B),D=x.getClearAlpha(),D<1&&x.setClearColor(16777215,.5),x.clear();let Bt=x.toneMapping;x.toneMapping=oi,lt(P,K,j),C.updateMultisampleRenderTarget(gt),C.updateRenderTargetMipmap(gt);let Gt=!1;for(let jt=0,qt=W.length;jt<qt;jt++){let Yt=W[jt],Ce=Yt.object,cn=Yt.geometry,Oe=Yt.material,kn=Yt.group;if(Oe.side===ue&&Ce.layers.test(j.layers)){let Se=Oe.side;Oe.side=Qe,Oe.needsUpdate=!0,ae(Ce,K,j,cn,Oe,kn),Oe.side=Se,Oe.needsUpdate=!0,Gt=!0}}Gt===!0&&(C.updateMultisampleRenderTarget(gt),C.updateRenderTargetMipmap(gt)),x.setRenderTarget(It),x.setClearColor(B,D),x.toneMapping=Bt}function lt(P,W,K){let j=W.isScene===!0?W.overrideMaterial:null;for(let J=0,At=P.length;J<At;J++){let It=P[J],Bt=It.object,Gt=It.geometry,jt=j===null?It.material:j,qt=It.group;Bt.layers.test(K.layers)&&ae(Bt,W,K,Gt,jt,qt)}}function ae(P,W,K,j,J,At){P.onBeforeRender(x,W,K,j,J,At),P.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),J.onBeforeRender(x,W,K,j,P,At),J.transparent===!0&&J.side===ue&&J.forceSinglePass===!1?(J.side=Qe,J.needsUpdate=!0,x.renderBufferDirect(K,W,j,J,P,At),J.side=Xn,J.needsUpdate=!0,x.renderBufferDirect(K,W,j,J,P,At),J.side=ue):x.renderBufferDirect(K,W,j,J,P,At),P.onAfterRender(x,W,K,j,J,At)}function qe(P,W,K){W.isScene!==!0&&(W=Ct);let j=et.get(P),J=p.state.lights,At=p.state.shadowsArray,It=J.state.version,Bt=St.getParameters(P,J.state,At,W,K),Gt=St.getProgramCacheKey(Bt),jt=j.programs;j.environment=P.isMeshStandardMaterial?W.environment:null,j.fog=W.fog,j.envMap=(P.isMeshStandardMaterial?V:A).get(P.envMap||j.environment),jt===void 0&&(P.addEventListener("dispose",Mt),jt=new Map,j.programs=jt);let qt=jt.get(Gt);if(qt!==void 0){if(j.currentProgram===qt&&j.lightsStateVersion===It)return jn(P,Bt),qt}else Bt.uniforms=St.getUniforms(P),P.onBuild(K,Bt,x),P.onBeforeCompile(Bt,x),qt=St.acquireProgram(Bt,Gt),jt.set(Gt,qt),j.uniforms=Bt.uniforms;let Yt=j.uniforms;return(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)&&(Yt.clippingPlanes=Vt.uniform),jn(P,Bt),j.needsLights=Pu(P),j.lightsStateVersion=It,j.needsLights&&(Yt.ambientLightColor.value=J.state.ambient,Yt.lightProbe.value=J.state.probe,Yt.directionalLights.value=J.state.directional,Yt.directionalLightShadows.value=J.state.directionalShadow,Yt.spotLights.value=J.state.spot,Yt.spotLightShadows.value=J.state.spotShadow,Yt.rectAreaLights.value=J.state.rectArea,Yt.ltc_1.value=J.state.rectAreaLTC1,Yt.ltc_2.value=J.state.rectAreaLTC2,Yt.pointLights.value=J.state.point,Yt.pointLightShadows.value=J.state.pointShadow,Yt.hemisphereLights.value=J.state.hemi,Yt.directionalShadowMap.value=J.state.directionalShadowMap,Yt.directionalShadowMatrix.value=J.state.directionalShadowMatrix,Yt.spotShadowMap.value=J.state.spotShadowMap,Yt.spotLightMatrix.value=J.state.spotLightMatrix,Yt.spotLightMap.value=J.state.spotLightMap,Yt.pointShadowMap.value=J.state.pointShadowMap,Yt.pointShadowMatrix.value=J.state.pointShadowMatrix),j.currentProgram=qt,j.uniformsList=null,qt}function $n(P){if(P.uniformsList===null){let W=P.currentProgram.getUniforms();P.uniformsList=ss.seqWithValue(W.seq,P.uniforms)}return P.uniformsList}function jn(P,W){let K=et.get(P);K.outputColorSpace=W.outputColorSpace,K.batching=W.batching,K.instancing=W.instancing,K.instancingColor=W.instancingColor,K.skinning=W.skinning,K.morphTargets=W.morphTargets,K.morphNormals=W.morphNormals,K.morphColors=W.morphColors,K.morphTargetsCount=W.morphTargetsCount,K.numClippingPlanes=W.numClippingPlanes,K.numIntersection=W.numClipIntersection,K.vertexAlphas=W.vertexAlphas,K.vertexTangents=W.vertexTangents,K.toneMapping=W.toneMapping}function Un(P,W,K,j,J){W.isScene!==!0&&(W=Ct),C.resetTextureUnits();let At=W.fog,It=j.isMeshStandardMaterial?W.environment:null,Bt=M===null?x.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:qn,Gt=(j.isMeshStandardMaterial?V:A).get(j.envMap||It),jt=j.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,qt=!!K.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),Yt=!!K.morphAttributes.position,Ce=!!K.morphAttributes.normal,cn=!!K.morphAttributes.color,Oe=oi;j.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(Oe=x.toneMapping);let kn=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Se=kn!==void 0?kn.length:0,Qt=et.get(j),Vo=p.state.lights;if(rt===!0&&(pt===!0||P!==w)){let mn=P===w&&j.id===I;Vt.setState(j,P,mn)}let Ae=!1;j.version===Qt.__version?(Qt.needsLights&&Qt.lightsStateVersion!==Vo.state.version||Qt.outputColorSpace!==Bt||J.isBatchedMesh&&Qt.batching===!1||!J.isBatchedMesh&&Qt.batching===!0||J.isInstancedMesh&&Qt.instancing===!1||!J.isInstancedMesh&&Qt.instancing===!0||J.isSkinnedMesh&&Qt.skinning===!1||!J.isSkinnedMesh&&Qt.skinning===!0||J.isInstancedMesh&&Qt.instancingColor===!0&&J.instanceColor===null||J.isInstancedMesh&&Qt.instancingColor===!1&&J.instanceColor!==null||Qt.envMap!==Gt||j.fog===!0&&Qt.fog!==At||Qt.numClippingPlanes!==void 0&&(Qt.numClippingPlanes!==Vt.numPlanes||Qt.numIntersection!==Vt.numIntersection)||Qt.vertexAlphas!==jt||Qt.vertexTangents!==qt||Qt.morphTargets!==Yt||Qt.morphNormals!==Ce||Qt.morphColors!==cn||Qt.toneMapping!==Oe||H.isWebGL2===!0&&Qt.morphTargetsCount!==Se)&&(Ae=!0):(Ae=!0,Qt.__version=j.version);let ui=Qt.currentProgram;Ae===!0&&(ui=qe(j,W,J));let Vl=!1,ws=!1,Wo=!1,Je=ui.getUniforms(),di=Qt.uniforms;if(F.useProgram(ui.program)&&(Vl=!0,ws=!0,Wo=!0),j.id!==I&&(I=j.id,ws=!0),Vl||w!==P){Je.setValue(v,"projectionMatrix",P.projectionMatrix),Je.setValue(v,"viewMatrix",P.matrixWorldInverse);let mn=Je.map.cameraPosition;mn!==void 0&&mn.setValue(v,Nt.setFromMatrixPosition(P.matrixWorld)),H.logarithmicDepthBuffer&&Je.setValue(v,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&Je.setValue(v,"isOrthographic",P.isOrthographicCamera===!0),w!==P&&(w=P,ws=!0,Wo=!0)}if(J.isSkinnedMesh){Je.setOptional(v,J,"bindMatrix"),Je.setOptional(v,J,"bindMatrixInverse");let mn=J.skeleton;mn&&(H.floatVertexTextures?(mn.boneTexture===null&&mn.computeBoneTexture(),Je.setValue(v,"boneTexture",mn.boneTexture,C)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}J.isBatchedMesh&&(Je.setOptional(v,J,"batchingTexture"),Je.setValue(v,"batchingTexture",J._matricesTexture,C));let Xo=K.morphAttributes;if((Xo.position!==void 0||Xo.normal!==void 0||Xo.color!==void 0&&H.isWebGL2===!0)&&Kt.update(J,K,ui),(ws||Qt.receiveShadow!==J.receiveShadow)&&(Qt.receiveShadow=J.receiveShadow,Je.setValue(v,"receiveShadow",J.receiveShadow)),j.isMeshGouraudMaterial&&j.envMap!==null&&(di.envMap.value=Gt,di.flipEnvMap.value=Gt.isCubeTexture&&Gt.isRenderTargetTexture===!1?-1:1),ws&&(Je.setValue(v,"toneMappingExposure",x.toneMappingExposure),Qt.needsLights&&rr(di,Wo),At&&j.fog===!0&&mt.refreshFogUniforms(di,At),mt.refreshMaterialUniforms(di,j,$,X,gt),ss.upload(v,$n(Qt),di,C)),j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(ss.upload(v,$n(Qt),di,C),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&Je.setValue(v,"center",J.center),Je.setValue(v,"modelViewMatrix",J.modelViewMatrix),Je.setValue(v,"normalMatrix",J.normalMatrix),Je.setValue(v,"modelMatrix",J.matrixWorld),j.isShaderMaterial||j.isRawShaderMaterial){let mn=j.uniformsGroups;for(let qo=0,Lu=mn.length;qo<Lu;qo++)if(H.isWebGL2){let Wl=mn[qo];le.update(Wl,ui),le.bind(Wl,ui)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return ui}function rr(P,W){P.ambientLightColor.needsUpdate=W,P.lightProbe.needsUpdate=W,P.directionalLights.needsUpdate=W,P.directionalLightShadows.needsUpdate=W,P.pointLights.needsUpdate=W,P.pointLightShadows.needsUpdate=W,P.spotLights.needsUpdate=W,P.spotLightShadows.needsUpdate=W,P.rectAreaLights.needsUpdate=W,P.hemisphereLights.needsUpdate=W}function Pu(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(P,W,K){et.get(P.texture).__webglTexture=W,et.get(P.depthTexture).__webglTexture=K;let j=et.get(P);j.__hasExternalTextures=!0,j.__hasExternalTextures&&(j.__autoAllocateDepthBuffer=K===void 0,j.__autoAllocateDepthBuffer||k.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),j.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(P,W){let K=et.get(P);K.__webglFramebuffer=W,K.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(P,W=0,K=0){M=P,T=W,E=K;let j=!0,J=null,At=!1,It=!1;if(P){let Gt=et.get(P);Gt.__useDefaultFramebuffer!==void 0?(F.bindFramebuffer(v.FRAMEBUFFER,null),j=!1):Gt.__webglFramebuffer===void 0?C.setupRenderTarget(P):Gt.__hasExternalTextures&&C.rebindTextures(P,et.get(P.texture).__webglTexture,et.get(P.depthTexture).__webglTexture);let jt=P.texture;(jt.isData3DTexture||jt.isDataArrayTexture||jt.isCompressedArrayTexture)&&(It=!0);let qt=et.get(P).__webglFramebuffer;P.isWebGLCubeRenderTarget?(Array.isArray(qt[W])?J=qt[W][K]:J=qt[W],At=!0):H.isWebGL2&&P.samples>0&&C.useMultisampledRTT(P)===!1?J=et.get(P).__webglMultisampledFramebuffer:Array.isArray(qt)?J=qt[K]:J=qt,S.copy(P.viewport),R.copy(P.scissor),U=P.scissorTest}else S.copy(Q).multiplyScalar($).floor(),R.copy(ot).multiplyScalar($).floor(),U=tt;if(F.bindFramebuffer(v.FRAMEBUFFER,J)&&H.drawBuffers&&j&&F.drawBuffers(P,J),F.viewport(S),F.scissor(R),F.setScissorTest(U),At){let Gt=et.get(P.texture);v.framebufferTexture2D(v.FRAMEBUFFER,v.COLOR_ATTACHMENT0,v.TEXTURE_CUBE_MAP_POSITIVE_X+W,Gt.__webglTexture,K)}else if(It){let Gt=et.get(P.texture),jt=W||0;v.framebufferTextureLayer(v.FRAMEBUFFER,v.COLOR_ATTACHMENT0,Gt.__webglTexture,K||0,jt)}I=-1},this.readRenderTargetPixels=function(P,W,K,j,J,At,It){if(!(P&&P.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Bt=et.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&It!==void 0&&(Bt=Bt[It]),Bt){F.bindFramebuffer(v.FRAMEBUFFER,Bt);try{let Gt=P.texture,jt=Gt.format,qt=Gt.type;if(jt!==Tn&&Rt.convert(jt)!==v.getParameter(v.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let Yt=qt===Ei&&(k.has("EXT_color_buffer_half_float")||H.isWebGL2&&k.has("EXT_color_buffer_float"));if(qt!==ai&&Rt.convert(qt)!==v.getParameter(v.IMPLEMENTATION_COLOR_READ_TYPE)&&!(qt===ri&&(H.isWebGL2||k.has("OES_texture_float")||k.has("WEBGL_color_buffer_float")))&&!Yt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=P.width-j&&K>=0&&K<=P.height-J&&v.readPixels(W,K,j,J,Rt.convert(jt),Rt.convert(qt),At)}finally{let Gt=M!==null?et.get(M).__webglFramebuffer:null;F.bindFramebuffer(v.FRAMEBUFFER,Gt)}}},this.copyFramebufferToTexture=function(P,W,K=0){let j=Math.pow(2,-K),J=Math.floor(W.image.width*j),At=Math.floor(W.image.height*j);C.setTexture2D(W,0),v.copyTexSubImage2D(v.TEXTURE_2D,K,0,0,P.x,P.y,J,At),F.unbindTexture()},this.copyTextureToTexture=function(P,W,K,j=0){let J=W.image.width,At=W.image.height,It=Rt.convert(K.format),Bt=Rt.convert(K.type);C.setTexture2D(K,0),v.pixelStorei(v.UNPACK_FLIP_Y_WEBGL,K.flipY),v.pixelStorei(v.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),v.pixelStorei(v.UNPACK_ALIGNMENT,K.unpackAlignment),W.isDataTexture?v.texSubImage2D(v.TEXTURE_2D,j,P.x,P.y,J,At,It,Bt,W.image.data):W.isCompressedTexture?v.compressedTexSubImage2D(v.TEXTURE_2D,j,P.x,P.y,W.mipmaps[0].width,W.mipmaps[0].height,It,W.mipmaps[0].data):v.texSubImage2D(v.TEXTURE_2D,j,P.x,P.y,It,Bt,W.image),j===0&&K.generateMipmaps&&v.generateMipmap(v.TEXTURE_2D),F.unbindTexture()},this.copyTextureToTexture3D=function(P,W,K,j,J=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let At=P.max.x-P.min.x+1,It=P.max.y-P.min.y+1,Bt=P.max.z-P.min.z+1,Gt=Rt.convert(j.format),jt=Rt.convert(j.type),qt;if(j.isData3DTexture)C.setTexture3D(j,0),qt=v.TEXTURE_3D;else if(j.isDataArrayTexture||j.isCompressedArrayTexture)C.setTexture2DArray(j,0),qt=v.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}v.pixelStorei(v.UNPACK_FLIP_Y_WEBGL,j.flipY),v.pixelStorei(v.UNPACK_PREMULTIPLY_ALPHA_WEBGL,j.premultiplyAlpha),v.pixelStorei(v.UNPACK_ALIGNMENT,j.unpackAlignment);let Yt=v.getParameter(v.UNPACK_ROW_LENGTH),Ce=v.getParameter(v.UNPACK_IMAGE_HEIGHT),cn=v.getParameter(v.UNPACK_SKIP_PIXELS),Oe=v.getParameter(v.UNPACK_SKIP_ROWS),kn=v.getParameter(v.UNPACK_SKIP_IMAGES),Se=K.isCompressedTexture?K.mipmaps[J]:K.image;v.pixelStorei(v.UNPACK_ROW_LENGTH,Se.width),v.pixelStorei(v.UNPACK_IMAGE_HEIGHT,Se.height),v.pixelStorei(v.UNPACK_SKIP_PIXELS,P.min.x),v.pixelStorei(v.UNPACK_SKIP_ROWS,P.min.y),v.pixelStorei(v.UNPACK_SKIP_IMAGES,P.min.z),K.isDataTexture||K.isData3DTexture?v.texSubImage3D(qt,J,W.x,W.y,W.z,At,It,Bt,Gt,jt,Se.data):K.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),v.compressedTexSubImage3D(qt,J,W.x,W.y,W.z,At,It,Bt,Gt,Se.data)):v.texSubImage3D(qt,J,W.x,W.y,W.z,At,It,Bt,Gt,jt,Se),v.pixelStorei(v.UNPACK_ROW_LENGTH,Yt),v.pixelStorei(v.UNPACK_IMAGE_HEIGHT,Ce),v.pixelStorei(v.UNPACK_SKIP_PIXELS,cn),v.pixelStorei(v.UNPACK_SKIP_ROWS,Oe),v.pixelStorei(v.UNPACK_SKIP_IMAGES,kn),J===0&&j.generateMipmaps&&v.generateMipmap(qt),F.unbindTexture()},this.initTexture=function(P){P.isCubeTexture?C.setTextureCube(P,0):P.isData3DTexture?C.setTexture3D(P,0):P.isDataArrayTexture||P.isCompressedArrayTexture?C.setTexture2DArray(P,0):C.setTexture2D(P,0),F.unbindTexture()},this.resetState=function(){T=0,E=0,M=null,F.reset(),Wt.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Wn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=t===Ml?"display-p3":"srgb",e.unpackColorSpace=pe.workingColorSpace===bo?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===ye?Mi:Gh}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===Mi?ye:qn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}},ja=class extends Hs{};ja.prototype.isWebGL1Renderer=!0;var eo=class i{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new Zt(t),this.density=e}clone(){return new i(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var no=class extends Ee{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}};var io=class extends Pe{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},$i=new me,mh=new me,Rr=[],gh=new dn,Ag=new me,Ls=new Y,Is=new Yn,so=class extends Y{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new io(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Ag)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new dn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,$i),gh.copy(t.boundingBox).applyMatrix4($i),this.boundingBox.union(gh)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Yn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,$i),Is.copy(t.boundingSphere).applyMatrix4($i),this.boundingSphere.union(Is)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}raycast(t,e){let n=this.matrixWorld,s=this.count;if(Ls.geometry=this.geometry,Ls.material=this.material,Ls.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Is.copy(this.boundingSphere),Is.applyMatrix4(n),t.ray.intersectsSphere(Is)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,$i),mh.multiplyMatrices(n,$i),Ls.matrixWorld=mh,Ls.raycast(t,Rr);for(let o=0,a=Rr.length;o<a;o++){let l=Rr[o];l.instanceId=r,l.object=this,e.push(l)}Rr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new io(new Float32Array(this.instanceMatrix.count*3),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}};var Gs=class extends Zn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Zt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},xh=new L,yh=new L,_h=new me,Sa=new wi,Cr=new Yn,Qa=class extends Ee{constructor(t=new ge,e=new Gs){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)xh.fromBufferAttribute(e,s-1),yh.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=xh.distanceTo(yh);t.setAttribute("lineDistance",new re(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Cr.copy(n.boundingSphere),Cr.applyMatrix4(s),Cr.radius+=r,t.ray.intersectsSphere(Cr)===!1)return;_h.copy(s).invert(),Sa.copy(t.ray).applyMatrix4(_h);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new L,h=new L,u=new L,d=new L,f=this.isLineSegments?2:1,m=n.index,p=n.attributes.position;if(m!==null){let g=Math.max(0,o.start),_=Math.min(m.count,o.start+o.count);for(let x=g,b=_-1;x<b;x+=f){let T=m.getX(x),E=m.getX(x+1);if(c.fromBufferAttribute(p,T),h.fromBufferAttribute(p,E),Sa.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);let I=t.ray.origin.distanceTo(d);I<t.near||I>t.far||e.push({distance:I,point:u.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{let g=Math.max(0,o.start),_=Math.min(p.count,o.start+o.count);for(let x=g,b=_-1;x<b;x+=f){if(c.fromBufferAttribute(p,x),h.fromBufferAttribute(p,x+1),Sa.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);let E=t.ray.origin.distanceTo(d);E<t.near||E>t.far||e.push({distance:E,point:u.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}},vh=new L,bh=new L,ro=class extends Qa{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)vh.fromBufferAttribute(e,s),bh.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+vh.distanceTo(bh);t.setAttribute("lineDistance",new re(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Vs=class extends Zn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Zt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Mh=new me,tl=new wi,Pr=new Yn,Lr=new L,oo=class extends Ee{constructor(t=new ge,e=new Vs){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Pr.copy(n.boundingSphere),Pr.applyMatrix4(s),Pr.radius+=r,t.ray.intersectsSphere(Pr)===!1)return;Mh.copy(s).invert(),tl.copy(t.ray).applyMatrix4(Mh);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){let d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let m=d,y=f;m<y;m++){let p=c.getX(m);Lr.fromBufferAttribute(u,p),Eh(Lr,p,l,s,t,e,this)}}else{let d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let m=d,y=f;m<y;m++)Lr.fromBufferAttribute(u,m),Eh(Lr,m,l,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function Eh(i,t,e,n,s,r,o){let a=tl.distanceSqToPoint(i);if(a<e){let l=new L;tl.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,object:o})}}var yn=class extends xn{constructor(t,e,n,s,r,o,a,l,c){super(t,e,n,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},_n=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),s=0,r=n.length,o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=n[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===o)return s/(r-1);let h=n[s],d=n[s+1]-h,f=(o-h)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new yt:new L);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new L,s=[],r=[],o=[],a=new L,l=new me;for(let f=0;f<=t;f++){let m=f/t;s[f]=this.getTangentAt(m,new L)}r[0]=new L,o[0]=new L;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();let m=Math.acos(je(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,m))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(je(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let m=1;m<=t;m++)r[m].applyMatrix4(l.makeRotationAxis(s[m],f*m)),o[m].crossVectors(s[m],r[m])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Ws=class extends _n{constructor(t=0,e=0,n=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e){let n=e||new yt,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},el=class extends Ws{constructor(t,e,n,s,r,o){super(t,e,n,n,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Sl(){let i=0,t=0,e=0,n=0;function s(r,o,a,l){i=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,s(o,a,d,f)},calc:function(r){let o=r*r,a=o*r;return i+t*r+e*o+n*a}}}var Ir=new L,Ta=new Sl,Aa=new Sl,Ra=new Sl,Xs=class extends _n{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new L){let n=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=s[(a-1)%r]:(Ir.subVectors(s[0],s[1]).add(s[0]),c=Ir);let u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(Ir.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Ir),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,m=Math.pow(c.distanceToSquared(u),f),y=Math.pow(u.distanceToSquared(d),f),p=Math.pow(d.distanceToSquared(h),f);y<1e-4&&(y=1),m<1e-4&&(m=y),p<1e-4&&(p=y),Ta.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,m,y,p),Aa.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,m,y,p),Ra.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,m,y,p)}else this.curveType==="catmullrom"&&(Ta.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),Aa.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Ra.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(Ta.calc(l),Aa.calc(l),Ra.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new L().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function wh(i,t,e,n,s){let r=(n-t)*.5,o=(s-e)*.5,a=i*i,l=i*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*i+e}function Rg(i,t){let e=1-i;return e*e*t}function Cg(i,t){return 2*(1-i)*i*t}function Pg(i,t){return i*i*t}function ks(i,t,e,n){return Rg(i,t)+Cg(i,e)+Pg(i,n)}function Lg(i,t){let e=1-i;return e*e*e*t}function Ig(i,t){let e=1-i;return 3*e*e*i*t}function Dg(i,t){return 3*(1-i)*i*i*t}function zg(i,t){return i*i*i*t}function Ns(i,t,e,n,s){return Lg(i,t)+Ig(i,e)+Dg(i,n)+zg(i,s)}var ao=class extends _n{constructor(t=new yt,e=new yt,n=new yt,s=new yt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new yt){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Ns(t,s.x,r.x,o.x,a.x),Ns(t,s.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},nl=class extends _n{constructor(t=new L,e=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new L){let n=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Ns(t,s.x,r.x,o.x,a.x),Ns(t,s.y,r.y,o.y,a.y),Ns(t,s.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},lo=class extends _n{constructor(t=new yt,e=new yt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new yt){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new yt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},il=class extends _n{constructor(t=new L,e=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new L){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new L){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},co=class extends _n{constructor(t=new yt,e=new yt,n=new yt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new yt){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(ks(t,s.x,r.x,o.x),ks(t,s.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},ho=class extends _n{constructor(t=new L,e=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new L){let n=e,s=this.v0,r=this.v1,o=this.v2;return n.set(ks(t,s.x,r.x,o.x),ks(t,s.y,r.y,o.y),ks(t,s.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},uo=class extends _n{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new yt){let n=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return n.set(wh(a,l.x,c.x,h.x,u.x),wh(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new yt().fromArray(s))}return this}},fo=Object.freeze({__proto__:null,ArcCurve:el,CatmullRomCurve3:Xs,CubicBezierCurve:ao,CubicBezierCurve3:nl,EllipseCurve:Ws,LineCurve:lo,LineCurve3:il,QuadraticBezierCurve:co,QuadraticBezierCurve3:ho,SplineCurve:uo}),sl=class extends _n{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new fo[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let o=s[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new fo[s.type]().fromJSON(s))}return this}},po=class extends sl{constructor(t){super(),this.type="Path",this.currentPoint=new yt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new lo(this.currentPoint.clone(),new yt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new co(this.currentPoint.clone(),new yt(t,e),new yt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,o){let a=new ao(this.currentPoint.clone(),new yt(t,e),new yt(n,s),new yt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new uo(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,s,r,o),this}absarc(t,e,n,s,r,o){return this.absellipse(t,e,n,n,s,r,o),this}ellipse(t,e,n,s,r,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,o,a,l),this}absellipse(t,e,n,s,r,o,a,l){let c=new Ws(t,e,n,s,r,o,a,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}};var vn=class i extends ge{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);let r=[],o=[],a=[],l=[],c=new L,h=new yt;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){let f=n+u/e*s;c.x=t*Math.cos(f),c.y=t*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[d]/t+1)/2,h.y=(o[d+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new re(o,3)),this.setAttribute("normal",new re(a,3)),this.setAttribute("uv",new re(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.segments,t.thetaStart,t.thetaLength)}},bt=class i extends ge{constructor(t=1,e=1,n=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],d=[],f=[],m=0,y=[],p=n/2,g=0;_(),o===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new re(u,3)),this.setAttribute("normal",new re(d,3)),this.setAttribute("uv",new re(f,2));function _(){let b=new L,T=new L,E=0,M=(e-t)/n;for(let I=0;I<=r;I++){let w=[],S=I/r,R=S*(e-t)+t;for(let U=0;U<=s;U++){let B=U/s,D=B*l+a,O=Math.sin(D),X=Math.cos(D);T.x=R*O,T.y=-S*n+p,T.z=R*X,u.push(T.x,T.y,T.z),b.set(O,M,X).normalize(),d.push(b.x,b.y,b.z),f.push(B,1-S),w.push(m++)}y.push(w)}for(let I=0;I<s;I++)for(let w=0;w<r;w++){let S=y[w][I],R=y[w+1][I],U=y[w+1][I+1],B=y[w][I+1];h.push(S,R,B),h.push(R,U,B),E+=6}c.addGroup(g,E,0),g+=E}function x(b){let T=m,E=new yt,M=new L,I=0,w=b===!0?t:e,S=b===!0?1:-1;for(let U=1;U<=s;U++)u.push(0,p*S,0),d.push(0,S,0),f.push(.5,.5),m++;let R=m;for(let U=0;U<=s;U++){let D=U/s*l+a,O=Math.cos(D),X=Math.sin(D);M.x=w*X,M.y=p*S,M.z=w*O,u.push(M.x,M.y,M.z),d.push(0,S,0),E.x=O*.5+.5,E.y=X*.5*S+.5,f.push(E.x,E.y),m++}for(let U=0;U<s;U++){let B=T+U,D=R+U;b===!0?h.push(D,D+1,B):h.push(D+1,D,B),I+=3}c.addGroup(g,I,b===!0?1:2),g+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Si=class i extends bt{constructor(t=1,e=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var Ti=class extends po{constructor(t){super(t),this.uuid=ps(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new po().fromJSON(s))}return this}},Ug={triangulate:function(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=tu(i,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c,h,u,d,f;if(n&&(r=Bg(i,t,r,e)),i.length>80*e){a=c=i[0],l=h=i[1];for(let m=e;m<s;m+=e)u=i[m],d=i[m+1],u<a&&(a=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);f=Math.max(c-a,h-l),f=f!==0?32767/f:0}return qs(r,o,e,a,l,f,0),o}};function tu(i,t,e,n,s){let r,o;if(s===$g(i,t,e,n)>0)for(r=t;r<e;r+=n)o=Sh(r,i[r],i[r+1],o);else for(r=e-n;r>=t;r-=n)o=Sh(r,i[r],i[r+1],o);return o&&Eo(o,o.next)&&(Zs(o),o=o.next),o}function Ai(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Eo(e,e.next)||Te(e.prev,e,e.next)===0)){if(Zs(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function qs(i,t,e,n,s,r,o){if(!i)return;!o&&r&&Xg(i,n,s,r);let a=i,l,c;for(;i.prev!==i.next;){if(l=i.prev,c=i.next,r?Ng(i,n,s,r):kg(i)){t.push(l.i/e|0),t.push(i.i/e|0),t.push(c.i/e|0),Zs(i),i=c.next,a=c.next;continue}if(i=c,i===a){o?o===1?(i=Fg(Ai(i),t,e),qs(i,t,e,n,s,r,2)):o===2&&Og(i,t,e,n,s,r):qs(Ai(i),t,e,n,s,r,1);break}}}function kg(i){let t=i.prev,e=i,n=i.next;if(Te(t,e,n)>=0)return!1;let s=t.x,r=e.x,o=n.x,a=t.y,l=e.y,c=n.y,h=s<r?s<o?s:o:r<o?r:o,u=a<l?a<c?a:c:l<c?l:c,d=s>r?s>o?s:o:r>o?r:o,f=a>l?a>c?a:c:l>c?l:c,m=n.next;for(;m!==t;){if(m.x>=h&&m.x<=d&&m.y>=u&&m.y<=f&&es(s,a,r,l,o,c,m.x,m.y)&&Te(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Ng(i,t,e,n){let s=i.prev,r=i,o=i.next;if(Te(s,r,o)>=0)return!1;let a=s.x,l=r.x,c=o.x,h=s.y,u=r.y,d=o.y,f=a<l?a<c?a:c:l<c?l:c,m=h<u?h<d?h:d:u<d?u:d,y=a>l?a>c?a:c:l>c?l:c,p=h>u?h>d?h:d:u>d?u:d,g=rl(f,m,t,e,n),_=rl(y,p,t,e,n),x=i.prevZ,b=i.nextZ;for(;x&&x.z>=g&&b&&b.z<=_;){if(x.x>=f&&x.x<=y&&x.y>=m&&x.y<=p&&x!==s&&x!==o&&es(a,h,l,u,c,d,x.x,x.y)&&Te(x.prev,x,x.next)>=0||(x=x.prevZ,b.x>=f&&b.x<=y&&b.y>=m&&b.y<=p&&b!==s&&b!==o&&es(a,h,l,u,c,d,b.x,b.y)&&Te(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;x&&x.z>=g;){if(x.x>=f&&x.x<=y&&x.y>=m&&x.y<=p&&x!==s&&x!==o&&es(a,h,l,u,c,d,x.x,x.y)&&Te(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;b&&b.z<=_;){if(b.x>=f&&b.x<=y&&b.y>=m&&b.y<=p&&b!==s&&b!==o&&es(a,h,l,u,c,d,b.x,b.y)&&Te(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function Fg(i,t,e){let n=i;do{let s=n.prev,r=n.next.next;!Eo(s,r)&&eu(s,n,n.next,r)&&Ys(s,r)&&Ys(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),Zs(n),Zs(n.next),n=i=r),n=n.next}while(n!==i);return Ai(n)}function Og(i,t,e,n,s,r){let o=i;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Zg(o,a)){let l=nu(o,a);o=Ai(o,o.next),l=Ai(l,l.next),qs(o,t,e,n,s,r,0),qs(l,t,e,n,s,r,0);return}a=a.next}o=o.next}while(o!==i)}function Bg(i,t,e,n){let s=[],r,o,a,l,c;for(r=0,o=t.length;r<o;r++)a=t[r]*n,l=r<o-1?t[r+1]*n:i.length,c=tu(i,a,l,n,!1),c===c.next&&(c.steiner=!0),s.push(Yg(c));for(s.sort(Hg),r=0;r<s.length;r++)e=Gg(s[r],e);return e}function Hg(i,t){return i.x-t.x}function Gg(i,t){let e=Vg(i,t);if(!e)return t;let n=nu(e,i);return Ai(n,n.next),Ai(e,e.next)}function Vg(i,t){let e=t,n=-1/0,s,r=i.x,o=i.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){let d=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=r&&d>n&&(n=d,s=e.x<e.next.x?e:e.next,d===r))return s}e=e.next}while(e!==t);if(!s)return null;let a=s,l=s.x,c=s.y,h=1/0,u;e=s;do r>=e.x&&e.x>=l&&r!==e.x&&es(o<c?r:n,o,l,c,o<c?n:r,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(r-e.x),Ys(e,i)&&(u<h||u===h&&(e.x>s.x||e.x===s.x&&Wg(s,e)))&&(s=e,h=u)),e=e.next;while(e!==a);return s}function Wg(i,t){return Te(i.prev,i,t.prev)<0&&Te(t.next,i,i.next)<0}function Xg(i,t,e,n){let s=i;do s.z===0&&(s.z=rl(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,qg(s)}function qg(i){let t,e,n,s,r,o,a,l,c=1;do{for(e=i,i=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<c&&(a++,n=n.nextZ,!!n);t++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,a--):(s=n,n=n.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,c*=2}while(o>1);return i}function rl(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function Yg(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function es(i,t,e,n,s,r,o,a){return(s-o)*(t-a)>=(i-o)*(r-a)&&(i-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(n-a)}function Zg(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!Jg(i,t)&&(Ys(i,t)&&Ys(t,i)&&Kg(i,t)&&(Te(i.prev,i,t.prev)||Te(i,t.prev,t))||Eo(i,t)&&Te(i.prev,i,i.next)>0&&Te(t.prev,t,t.next)>0)}function Te(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Eo(i,t){return i.x===t.x&&i.y===t.y}function eu(i,t,e,n){let s=zr(Te(i,t,e)),r=zr(Te(i,t,n)),o=zr(Te(e,n,i)),a=zr(Te(e,n,t));return!!(s!==r&&o!==a||s===0&&Dr(i,e,t)||r===0&&Dr(i,n,t)||o===0&&Dr(e,i,n)||a===0&&Dr(e,t,n))}function Dr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function zr(i){return i>0?1:i<0?-1:0}function Jg(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&eu(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Ys(i,t){return Te(i.prev,i,i.next)<0?Te(i,t,i.next)>=0&&Te(i,i.prev,t)>=0:Te(i,t,i.prev)<0||Te(i,i.next,t)<0}function Kg(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function nu(i,t){let e=new ol(i.i,i.x,i.y),n=new ol(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Sh(i,t,e,n){let s=new ol(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Zs(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function ol(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function $g(i,t,e,n){let s=0;for(let r=t,o=e-n;r<e;r+=n)s+=(i[o]-i[r])*(i[r+1]+i[o+1]),o=r;return s}var Fs=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];Th(t),Ah(n,t);let o=t.length;e.forEach(Th);for(let l=0;l<e.length;l++)s.push(o),o+=e[l].length,Ah(n,e[l]);let a=Ug.triangulate(n,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function Th(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Ah(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var us=class i extends ge{constructor(t=new Ti([new yt(.5,.5),new yt(-.5,.5),new yt(-.5,-.5),new yt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let a=0,l=t.length;a<l;a++){let c=t[a];o(c)}this.setAttribute("position",new re(s,3)),this.setAttribute("uv",new re(r,2)),this.computeVertexNormals();function o(a){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1,d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,m=e.bevelSize!==void 0?e.bevelSize:f-.1,y=e.bevelOffset!==void 0?e.bevelOffset:0,p=e.bevelSegments!==void 0?e.bevelSegments:3,g=e.extrudePath,_=e.UVGenerator!==void 0?e.UVGenerator:jg,x,b=!1,T,E,M,I;g&&(x=g.getSpacedPoints(h),b=!0,d=!1,T=g.computeFrenetFrames(h,!1),E=new L,M=new L,I=new L),d||(p=0,f=0,m=0,y=0);let w=a.extractPoints(c),S=w.shape,R=w.holes;if(!Fs.isClockWise(S)){S=S.reverse();for(let v=0,z=R.length;v<z;v++){let k=R[v];Fs.isClockWise(k)&&(R[v]=k.reverse())}}let B=Fs.triangulateShape(S,R),D=S;for(let v=0,z=R.length;v<z;v++){let k=R[v];S=S.concat(k)}function O(v,z,k){return z||console.error("THREE.ExtrudeGeometry: vec does not exist"),v.clone().addScaledVector(z,k)}let X=S.length,$=B.length;function Z(v,z,k){let H,F,it,et=v.x-z.x,C=v.y-z.y,A=k.x-v.x,V=k.y-v.y,ct=et*et+C*C,ht=et*V-C*A;if(Math.abs(ht)>Number.EPSILON){let at=Math.sqrt(ct),St=Math.sqrt(A*A+V*V),mt=z.x-C/at,Tt=z.y+et/at,zt=k.x-V/St,Vt=k.y+A/St,ut=((zt-mt)*V-(Vt-Tt)*A)/(et*V-C*A);H=mt+et*ut-v.x,F=Tt+C*ut-v.y;let Jt=H*H+F*F;if(Jt<=2)return new yt(H,F);it=Math.sqrt(Jt/2)}else{let at=!1;et>Number.EPSILON?A>Number.EPSILON&&(at=!0):et<-Number.EPSILON?A<-Number.EPSILON&&(at=!0):Math.sign(C)===Math.sign(V)&&(at=!0),at?(H=-C,F=et,it=Math.sqrt(ct)):(H=et,F=C,it=Math.sqrt(ct/2))}return new yt(H/it,F/it)}let q=[];for(let v=0,z=D.length,k=z-1,H=v+1;v<z;v++,k++,H++)k===z&&(k=0),H===z&&(H=0),q[v]=Z(D[v],D[k],D[H]);let Q=[],ot,tt=q.concat();for(let v=0,z=R.length;v<z;v++){let k=R[v];ot=[];for(let H=0,F=k.length,it=F-1,et=H+1;H<F;H++,it++,et++)it===F&&(it=0),et===F&&(et=0),ot[H]=Z(k[H],k[it],k[et]);Q.push(ot),tt=tt.concat(ot)}for(let v=0;v<p;v++){let z=v/p,k=f*Math.cos(z*Math.PI/2),H=m*Math.sin(z*Math.PI/2)+y;for(let F=0,it=D.length;F<it;F++){let et=O(D[F],q[F],H);wt(et.x,et.y,-k)}for(let F=0,it=R.length;F<it;F++){let et=R[F];ot=Q[F];for(let C=0,A=et.length;C<A;C++){let V=O(et[C],ot[C],H);wt(V.x,V.y,-k)}}}let G=m+y;for(let v=0;v<X;v++){let z=d?O(S[v],tt[v],G):S[v];b?(M.copy(T.normals[0]).multiplyScalar(z.x),E.copy(T.binormals[0]).multiplyScalar(z.y),I.copy(x[0]).add(M).add(E),wt(I.x,I.y,I.z)):wt(z.x,z.y,0)}for(let v=1;v<=h;v++)for(let z=0;z<X;z++){let k=d?O(S[z],tt[z],G):S[z];b?(M.copy(T.normals[v]).multiplyScalar(k.x),E.copy(T.binormals[v]).multiplyScalar(k.y),I.copy(x[v]).add(M).add(E),wt(I.x,I.y,I.z)):wt(k.x,k.y,u/h*v)}for(let v=p-1;v>=0;v--){let z=v/p,k=f*Math.cos(z*Math.PI/2),H=m*Math.sin(z*Math.PI/2)+y;for(let F=0,it=D.length;F<it;F++){let et=O(D[F],q[F],H);wt(et.x,et.y,u+k)}for(let F=0,it=R.length;F<it;F++){let et=R[F];ot=Q[F];for(let C=0,A=et.length;C<A;C++){let V=O(et[C],ot[C],H);b?wt(V.x,V.y+x[h-1].y,x[h-1].x+k):wt(V.x,V.y,u+k)}}}rt(),pt();function rt(){let v=s.length/3;if(d){let z=0,k=X*z;for(let H=0;H<$;H++){let F=B[H];Ut(F[2]+k,F[1]+k,F[0]+k)}z=h+p*2,k=X*z;for(let H=0;H<$;H++){let F=B[H];Ut(F[0]+k,F[1]+k,F[2]+k)}}else{for(let z=0;z<$;z++){let k=B[z];Ut(k[2],k[1],k[0])}for(let z=0;z<$;z++){let k=B[z];Ut(k[0]+X*h,k[1]+X*h,k[2]+X*h)}}n.addGroup(v,s.length/3-v,0)}function pt(){let v=s.length/3,z=0;gt(D,z),z+=D.length;for(let k=0,H=R.length;k<H;k++){let F=R[k];gt(F,z),z+=F.length}n.addGroup(v,s.length/3-v,1)}function gt(v,z){let k=v.length;for(;--k>=0;){let H=k,F=k-1;F<0&&(F=v.length-1);for(let it=0,et=h+p*2;it<et;it++){let C=X*it,A=X*(it+1),V=z+H+C,ct=z+F+C,ht=z+F+A,at=z+H+A;Nt(V,ct,ht,at)}}}function wt(v,z,k){l.push(v),l.push(z),l.push(k)}function Ut(v,z,k){Ct(v),Ct(z),Ct(k);let H=s.length/3,F=_.generateTopUV(n,s,H-3,H-2,H-1);Ft(F[0]),Ft(F[1]),Ft(F[2])}function Nt(v,z,k,H){Ct(v),Ct(z),Ct(H),Ct(z),Ct(k),Ct(H);let F=s.length/3,it=_.generateSideWallUV(n,s,F-6,F-3,F-2,F-1);Ft(it[0]),Ft(it[1]),Ft(it[3]),Ft(it[1]),Ft(it[2]),Ft(it[3])}function Ct(v){s.push(l[v*3+0]),s.push(l[v*3+1]),s.push(l[v*3+2])}function Ft(v){r.push(v.x),r.push(v.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Qg(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];n.push(a)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new fo[s.type]().fromJSON(s)),new i(n,t.options)}},jg={generateTopUV:function(i,t,e,n,s){let r=t[e*3],o=t[e*3+1],a=t[n*3],l=t[n*3+1],c=t[s*3],h=t[s*3+1];return[new yt(r,o),new yt(a,l),new yt(c,h)]},generateSideWallUV:function(i,t,e,n,s,r){let o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[s*3],f=t[s*3+1],m=t[s*3+2],y=t[r*3],p=t[r*3+1],g=t[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new yt(o,1-l),new yt(c,1-u),new yt(d,1-m),new yt(y,1-g)]:[new yt(a,1-l),new yt(h,1-u),new yt(f,1-m),new yt(p,1-g)]}};function Qg(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Ne=class i extends ge{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let l=Math.min(o+a,Math.PI),c=0,h=[],u=new L,d=new L,f=[],m=[],y=[],p=[];for(let g=0;g<=n;g++){let _=[],x=g/n,b=0;g===0&&o===0?b=.5/e:g===n&&l===Math.PI&&(b=-.5/e);for(let T=0;T<=e;T++){let E=T/e;u.x=-t*Math.cos(s+E*r)*Math.sin(o+x*a),u.y=t*Math.cos(o+x*a),u.z=t*Math.sin(s+E*r)*Math.sin(o+x*a),m.push(u.x,u.y,u.z),d.copy(u).normalize(),y.push(d.x,d.y,d.z),p.push(E+b,1-x),_.push(c++)}h.push(_)}for(let g=0;g<n;g++)for(let _=0;_<e;_++){let x=h[g][_+1],b=h[g][_],T=h[g+1][_],E=h[g+1][_+1];(g!==0||o>0)&&f.push(x,b,E),(g!==n-1||l<Math.PI)&&f.push(b,T,E)}this.setIndex(f),this.setAttribute("position",new re(m,3)),this.setAttribute("normal",new re(y,3)),this.setAttribute("uv",new re(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var tn=class i extends ge{constructor(t=1,e=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);let o=[],a=[],l=[],c=[],h=new L,u=new L,d=new L;for(let f=0;f<=n;f++)for(let m=0;m<=s;m++){let y=m/s*r,p=f/n*Math.PI*2;u.x=(t+e*Math.cos(p))*Math.cos(y),u.y=(t+e*Math.cos(p))*Math.sin(y),u.z=e*Math.sin(p),a.push(u.x,u.y,u.z),h.x=t*Math.cos(y),h.y=t*Math.sin(y),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(m/s),c.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=s;m++){let y=(s+1)*f+m-1,p=(s+1)*(f-1)+m-1,g=(s+1)*(f-1)+m,_=(s+1)*f+m;o.push(y,p,_),o.push(p,g,_)}this.setIndex(o),this.setAttribute("position",new re(a,3)),this.setAttribute("normal",new re(l,3)),this.setAttribute("uv",new re(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var mo=class i extends ge{constructor(t=new ho(new L(-1,-1,0),new L(-1,1,0),new L(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};let o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new L,l=new L,c=new yt,h=new L,u=[],d=[],f=[],m=[];y(),this.setIndex(m),this.setAttribute("position",new re(u,3)),this.setAttribute("normal",new re(d,3)),this.setAttribute("uv",new re(f,2));function y(){for(let x=0;x<e;x++)p(x);p(r===!1?e:0),_(),g()}function p(x){h=t.getPointAt(x/e,h);let b=o.normals[x],T=o.binormals[x];for(let E=0;E<=s;E++){let M=E/s*Math.PI*2,I=Math.sin(M),w=-Math.cos(M);l.x=w*b.x+I*T.x,l.y=w*b.y+I*T.y,l.z=w*b.z+I*T.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function g(){for(let x=1;x<=e;x++)for(let b=1;b<=s;b++){let T=(s+1)*(x-1)+(b-1),E=(s+1)*x+(b-1),M=(s+1)*x+b,I=(s+1)*(x-1)+b;m.push(T,E,I),m.push(E,M,I)}}function _(){for(let x=0;x<=e;x++)for(let b=0;b<=s;b++)c.x=x/e,c.y=b/s,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new i(new fo[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};var we=class extends Zn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Zt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vh,this.normalScale=new yt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function Ur(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function t1(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var ds=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=s,s=e[++n],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=e[--n-1],t>=r)break t}o=n,n=0;break e}break n}for(;n<o;){let a=n+o>>>1;t<e[a]?o=a:n=a+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=n[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},al=class extends ds{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Sc,endingEnd:Sc}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Tc:r=t,a=2*e-n;break;case Ac:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Tc:o=t,l=2*n-e;break;case Ac:o=1,l=n+s[1]-s[0];break;default:o=t-1,l=e}let c=(n-e)*.5,h=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-e)/(s-e),y=m*m,p=y*m,g=-d*p+2*d*y-d*m,_=(1+d)*p+(-1.5-2*d)*y+(-.5+d)*m+1,x=(-1-f)*p+(1.5+f)*y+.5*m,b=f*p-f*y;for(let T=0;T!==a;++T)r[T]=g*o[h+T]+_*o[c+T]+x*o[l+T]+b*o[u+T];return r}},ll=class extends ds{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,h=(n-e)/(s-e),u=1-h;for(let d=0;d!==a;++d)r[d]=o[c+d]*u+o[l+d]*h;return r}},cl=class extends ds{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Cn=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Ur(e,this.TimeBufferType),this.values=Ur(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:Ur(t.times,Array),values:Ur(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new cl(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new ll(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new al(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Nr:e=this.InterpolantFactoryMethodDiscrete;break;case Fr:e=this.InterpolantFactoryMethodLinear;break;case ta:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Nr;case this.InterpolantFactoryMethodLinear:return Fr;case this.InterpolantFactoryMethodSmooth:return ta}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,o=s-1;for(;r!==s&&n[r]<t;)++r;for(;o!==-1&&n[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(s!==void 0&&t1(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===ta,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],h=t[a+1];if(c!==h&&(a!==1||c!==t[0]))if(s)l=!0;else{let u=a*n,d=u-n,f=u+n;for(let m=0;m!==n;++m){let y=e[u+m];if(y!==e[d+m]||y!==e[f+m]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let u=a*n,d=o*n;for(let f=0;f!==n;++f)e[d+f]=e[u+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};Cn.prototype.TimeBufferType=Float32Array;Cn.prototype.ValueBufferType=Float32Array;Cn.prototype.DefaultInterpolation=Fr;var Ri=class extends Cn{};Ri.prototype.ValueTypeName="bool";Ri.prototype.ValueBufferType=Array;Ri.prototype.DefaultInterpolation=Nr;Ri.prototype.InterpolantFactoryMethodLinear=void 0;Ri.prototype.InterpolantFactoryMethodSmooth=void 0;var hl=class extends Cn{};hl.prototype.ValueTypeName="color";var ul=class extends Cn{};ul.prototype.ValueTypeName="number";var dl=class extends ds{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-e)/(s-e),c=t*a;for(let h=c+a;c!==h;c+=4)li.slerpFlat(r,0,o,c-a,o,c,l);return r}},Js=class extends Cn{InterpolantFactoryMethodLinear(t){return new dl(this.times,this.values,this.getValueSize(),t)}};Js.prototype.ValueTypeName="quaternion";Js.prototype.DefaultInterpolation=Fr;Js.prototype.InterpolantFactoryMethodSmooth=void 0;var Ci=class extends Cn{};Ci.prototype.ValueTypeName="string";Ci.prototype.ValueBufferType=Array;Ci.prototype.DefaultInterpolation=Nr;Ci.prototype.InterpolantFactoryMethodLinear=void 0;Ci.prototype.InterpolantFactoryMethodSmooth=void 0;var fl=class extends Cn{};fl.prototype.ValueTypeName="vector";var pl=class{constructor(t,e,n){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],m=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null}}},e1=new pl,ml=class{constructor(t){this.manager=t!==void 0?t:e1,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};ml.DEFAULT_MATERIAL_NAME="__DEFAULT";var fs=class extends Ee{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Zt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}},go=class extends fs{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ee.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Zt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},Ca=new me,Rh=new L,Ch=new L,Ks=class{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new yt(512,512),this.map=null,this.mapPass=null,this.matrix=new me,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Bs,this._frameExtents=new yt(1,1),this._viewportCount=1,this._viewports=[new Me(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;Rh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Rh),Ch.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Ch),e.updateMatrixWorld(),Ca.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ca),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ca)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},gl=class extends Ks{constructor(){super(new Ye(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){let e=this.camera,n=Vr*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=t.distance||e.far;(n!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=n,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}},xo=class extends fs{constructor(t,e,n=0,s=Math.PI/3,r=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ee.DEFAULT_UP),this.updateMatrix(),this.target=new Ee,this.distance=n,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new gl}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},Ph=new me,Ds=new L,Pa=new L,xl=class extends Ks{constructor(){super(new Ye(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new yt(4,2),this._viewportCount=6,this._viewports=[new Me(2,1,1,1),new Me(0,1,1,1),new Me(3,1,1,1),new Me(1,1,1,1),new Me(3,0,1,1),new Me(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(t,e=0){let n=this.camera,s=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Ds.setFromMatrixPosition(t.matrixWorld),n.position.copy(Ds),Pa.copy(n.position),Pa.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(Pa),n.updateMatrixWorld(),s.makeTranslation(-Ds.x,-Ds.y,-Ds.z),Ph.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ph)}},Ve=class extends fs{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new xl}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},yl=class extends Ks{constructor(){super(new hs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},yo=class extends fs{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ee.DEFAULT_UP),this.updateMatrix(),this.target=new Ee,this.shadow=new yl}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var _o=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Lh(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=Lh();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};function Lh(){return(typeof performance=="undefined"?Date:performance).now()}var Tl="\\[\\]\\.:\\/",n1=new RegExp("["+Tl+"]","g"),Al="[^"+Tl+"]",i1="[^"+Tl.replace("\\.","")+"]",s1=/((?:WC+[\/:])*)/.source.replace("WC",Al),r1=/(WCOD+)?/.source.replace("WCOD",i1),o1=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Al),a1=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Al),l1=new RegExp("^"+s1+r1+o1+a1+"$"),c1=["material","materials","bones","map"],_l=class{constructor(t,e,n){let s=n||be.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},be=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(n1,"")}static parseTrackName(t){let e=l1.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);c1.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=n(a.children);if(l)return l}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[s];if(o===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};be.Composite=_l;be.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};be.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};be.prototype.GetterByBindingType=[be.prototype._getValue_direct,be.prototype._getValue_array,be.prototype._getValue_arrayElement,be.prototype._getValue_toArray];be.prototype.SetterByBindingTypeAndVersioning=[[be.prototype._setValue_direct,be.prototype._setValue_direct_setNeedsUpdate,be.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[be.prototype._setValue_array,be.prototype._setValue_array_setNeedsUpdate,be.prototype._setValue_array_setMatrixWorldNeedsUpdate],[be.prototype._setValue_arrayElement,be.prototype._setValue_arrayElement_setNeedsUpdate,be.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[be.prototype._setValue_fromArray,be.prototype._setValue_fromArray_setNeedsUpdate,be.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var mx=new Float32Array(1);typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"160"}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="160");var gs=new ls(0,0,0,"YXZ"),xs=new L,h1={type:"change"},u1={type:"lock"},d1={type:"unlock"},iu=Math.PI/2,wo=class extends Dn{constructor(t,e){super(),this.camera=t,this.domElement=e,this.isLocked=!1,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.pointerSpeed=1,this._onMouseMove=f1.bind(this),this._onPointerlockChange=p1.bind(this),this._onPointerlockError=m1.bind(this),this.connect()}connect(){this.domElement.ownerDocument.addEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.addEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.addEventListener("pointerlockerror",this._onPointerlockError)}disconnect(){this.domElement.ownerDocument.removeEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.removeEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.removeEventListener("pointerlockerror",this._onPointerlockError)}dispose(){this.disconnect()}getObject(){return this.camera}getDirection(t){return t.set(0,0,-1).applyQuaternion(this.camera.quaternion)}moveForward(t){let e=this.camera;xs.setFromMatrixColumn(e.matrix,0),xs.crossVectors(e.up,xs),e.position.addScaledVector(xs,t)}moveRight(t){let e=this.camera;xs.setFromMatrixColumn(e.matrix,0),e.position.addScaledVector(xs,t)}lock(){this.domElement.requestPointerLock()}unlock(){this.domElement.ownerDocument.exitPointerLock()}};function f1(i){if(this.isLocked===!1)return;let t=i.movementX||i.mozMovementX||i.webkitMovementX||0,e=i.movementY||i.mozMovementY||i.webkitMovementY||0,n=this.camera;gs.setFromQuaternion(n.quaternion),gs.y-=t*.002*this.pointerSpeed,gs.x-=e*.002*this.pointerSpeed,gs.x=Math.max(iu-this.maxPolarAngle,Math.min(iu-this.minPolarAngle,gs.x)),n.quaternion.setFromEuler(gs),this.dispatchEvent(h1)}function p1(){this.domElement.ownerDocument.pointerLockElement===this.domElement?(this.dispatchEvent(u1),this.isLocked=!0):(this.dispatchEvent(d1),this.isLocked=!1)}function m1(){console.error("THREE.PointerLockControls: Unable to use Pointer Lock API")}var su={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};var Jn=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},g1=new hs(-1,1,1,-1,0,1),Rl=class extends ge{constructor(){super(),this.setAttribute("position",new re([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new re([0,2,0,0,2,0],2))}},x1=new Rl,So=class{constructor(t){this._mesh=new Y(x1,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,g1)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}};var ys=class extends Jn{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof nn?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=El.clone(t.uniforms),this.material=new nn({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new So(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var $s=class extends Jn{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){let s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},To=class extends Jn{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}};var Ao=class{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){let n=t.getSize(new yt);this._width=n.width,this._height=n.height,e=new Rn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Ei}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new ys(su),this.copyPass.material.blending=Ln,this.clock=new _o}swapBuffers(){let t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){let e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());let e=this.renderer.getRenderTarget(),n=!1;for(let s=0,r=this.passes.length;s<r;s++){let o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),o.needsSwap){if(n){let a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}$s!==void 0&&(o instanceof $s?n=!0:o instanceof To&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){let e=this.renderer.getSize(new yt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;let n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var Ro=class extends Jn{constructor(t,e,n=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Zt}render(t,e,n){let s=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor)),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=s}};function Pt(i){let t=i>>>0;return function(){t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}var dt=(i=1,t)=>t===void 0?Math.random()*i:i+Math.random()*(t-i),Pi=i=>Math.random()<i,Li=i=>i[Math.random()*i.length|0],ne=(i,t,e)=>Math.max(t,Math.min(e,i)),an=(i,t,e)=>i+(t-i)*e;function Le(i,t,e,n,s,r){let o=n/2,a=s/2,l=r/2;return{x0:i-o,y0:t-a,z0:e-l,x1:i+o,y1:t+a,z1:e+l}}function js(i,t,e,n,s){return{x0:i-n,y0:t,z0:e-n,x1:i+n,y1:t+s,z1:e+n}}function Co(i,t,e,n,s,r=.35,o={}){let a=Math.max(1,Math.ceil(Math.max(Math.abs(t),Math.abs(e),Math.abs(n))/.18)),l={grounded:!1,blocked:!1};for(let c=0;c<a;c++){let h=y1(i,t/a,e/a,n/a,s,r,o);l={grounded:h.grounded,blocked:l.blocked||h.blocked}}return l}function y1(i,t,e,n,s,r,o){var E;let a=i.y0,l=i.x1-i.x0,c=i.z1-i.z0,h=a+((E=o.bodyHeight)!=null?E:i.y1-i.y0),u=!1,d=i.x0,f=i.x1,m=i.z0,y=i.z1,p=M=>!s.some(I=>I!==M&&I.x0<i.x1&&I.x1>i.x0&&I.z0<i.z1&&I.z1>i.z0&&I.y0<M.y1+(h-a)&&I.y1>Math.max(M.y1,h)),g=M=>M.x0<i.x1&&M.x1>i.x0&&M.z0<i.z1&&M.z1>i.z0&&(M.y1>a+r||M.y1>a+.1&&!p(M))&&M.y0<h-.08,_=[];for(let M of s)M.x0<i.x1&&M.x1>i.x0&&M.z0<i.z1&&M.z1>i.z0&&M.y1>a+r&&M.y0<h-.08&&_.push(M);if(t!==0){d=i.x0,f=i.x1,i.x0+=t,i.x1+=t;for(let M of s)g(M)&&(t>0&&f<=M.x0+.001?(i.x1=M.x0-.001,i.x0=i.x1-l,u=!0):t<0&&d>=M.x1-.001&&(i.x0=M.x1+.001,i.x1=i.x0+l,u=!0))}if(n!==0){m=i.z0,y=i.z1,i.z0+=n,i.z1+=n;for(let M of s)g(M)&&(n>0&&y<=M.z0+.001?(i.z1=M.z0-.001,i.z0=i.z1-c,u=!0):n<0&&m>=M.z1-.001&&(i.z0=M.z1+.001,i.z1=i.z0+c,u=!0))}for(let M of _){if(!g(M))continue;let I=M.x1-M.x0,w=M.z1-M.z0,S=Math.min(i.x1,M.x1)-Math.max(i.x0,M.x0),R=Math.min(i.z1,M.z1)-Math.max(i.z0,M.z0);if(S>.001&&I<l){let U=i.x1-M.x0,B=M.x1-i.x0,D={x0:M.x0-.001-l,x1:M.x0-.001,y0:i.y0,y1:i.y1,z0:i.z0,z1:i.z1},O={x0:M.x1+.001,x1:M.x1+.001+l,y0:i.y0,y1:i.y1,z0:i.z0,z1:i.z1},X=q=>{for(let Q of s)if(Q!==M&&Q.x0<q.x1&&Q.x1>q.x0&&Q.z0<q.z1&&Q.z1>q.z0&&Q.y1>q.y0+r&&Q.y0<q.y0+(q.y1-q.y0)-.08)return!0;return!1},$=X(D),Z=X(O);if($&&Z){u=!0;continue}$&&!Z?(i.x0=O.x0,i.x1=O.x1):Z&&!$||U<=B?(i.x0=D.x0,i.x1=D.x1):(i.x0=O.x0,i.x1=O.x1),u=!0;break}else if(R>.001&&w<c){let U=i.z1-M.z0,B=M.z1-i.z0,D={x0:i.x0,x1:i.x1,y0:i.y0,y1:i.y1,z0:M.z0-.001-c,z1:M.z0-.001},O={x0:i.x0,x1:i.x1,y0:i.y0,y1:i.y1,z0:M.z1+.001,z1:M.z1+.001+c},X=q=>{for(let Q of s)if(Q!==M&&Q.x0<q.x1&&Q.x1>q.x0&&Q.z0<q.z1&&Q.z1>q.z0&&Q.y1>q.y0+r&&Q.y0<q.y0+(q.y1-q.y0)-.08)return!0;return!1},$=X(D),Z=X(O);if($&&Z){u=!0;continue}$&&!Z?(i.z0=O.z0,i.z1=O.z1):Z&&!$||U<=B?(i.z0=D.z0,i.z1=D.z1):(i.z0=O.z0,i.z1=O.z1),u=!0;break}}let x=M=>M.x0<i.x1&&M.x1>i.x0&&M.z0<i.z1&&M.z1>i.z0,b=M=>n>0&&y<=M.z0+.001&&i.z1>M.z0||n<0&&m>=M.z1-.001&&i.z0<M.z1||t>0&&f<=M.x0+.001&&i.x1>M.x0||t<0&&d>=M.x1-.001&&i.x0<M.x1;if(e<0){let M=a+e,I=-1/0;for(let R of s)b(R)&&x(R)&&R.y1<=a+r+.001&&R.y1>a+.1&&R.y1>I&&p(R)&&(I=R.y1);if(I>-1e9)return i.y1+=I-a,i.y0=I,{grounded:!0,blocked:!0};let w=M-.001,S=-1/0;for(let R of s)x(R)&&R.y1<=a+.101&&R.y1>=w&&R.y1>S&&(S=R.y1);return S>-1e9?(i.y1+=S-a,i.y0=S,{grounded:!0,blocked:!0}):(i.y0+=e,i.y1+=e,{grounded:!1,blocked:!1})}if(e>0){let M=e;for(let I of s)x(I)&&I.y0>=h-.001&&I.y0<h+M&&(M=Math.max(0,I.y0-h));return i.y0+=M,i.y1+=M,{grounded:!1,blocked:u||M<e}}let T=-1/0;for(let M of s)x(M)&&M.y1<=a+.101&&M.y1>T&&(T=M.y1);return{grounded:a<=T+.001,blocked:!1}}var ru={value:new yt(640,360)};function Cl(i,t){ru.value.set(i,t)}var _1=typeof window!="undefined"&&typeof location!="undefined"&&new URLSearchParams(location.search).has("nosnap");function ou(i){!i||i.__ps1||_1||(i.__ps1=!0,i.onBeforeCompile=t=>{t.uniforms.uSnapRes=ru,t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
uniform vec2 uSnapRes;`).replace("#include <project_vertex>",`#include <project_vertex>
gl_Position.xy = floor(gl_Position.xy * uSnapRes + 0.5) / uSnapRes;`)})}function We(i,t,e,n={}){var u;let s=new ee(i,t,e),r=s.attributes.position,o=s.attributes.uv,a=n.uv||[1,1],l=!Array.isArray(a)||a.length===2&&typeof a[0]=="string",c=l?[1,1]:a;for(let d=0;d<6;d++){let f=["px","nx","py","ny","pz","nz"][d],m=l&&a[f]||c;for(let y=0;y<4;y++){let p=d*4+y;o.setXY(p,o.getX(p)*m[0],o.getY(p)*m[1])}}let h=n.jitter||0;if(h>0)for(let d=0;d<r.count;d++)r.setXYZ(d,r.getX(d)+dt(-h,h),r.getY(d)+dt(-h,h),r.getZ(d)+dt(-h,h));if(n.ao&&n.ao!=="none"){let d=new Float32Array(r.count*3),f=(u=n.aoStrength)!=null?u:.85,m=i/2,y=t/2,p=e/2;for(let g=0;g<r.count;g++){let _=r.getX(g),x=r.getY(g),b=r.getZ(g),T=1;if(n.ao==="wall"){let I=ne((x+y)/t,0,1),w=(1-ne(Math.abs(_)/m,0,1))*.5+(1-ne(Math.abs(b)/p,0,1))*.5,S=Math.abs(I-.5)*2;T=ne(.7+.3*Math.pow(ne(1-S,0,1),1.3),0,1)*ne(.45+.55*w,0,1)}else if(n.ao==="floor"||n.ao==="ceil"){let I=1-ne(Math.abs(_)/m,0,1),w=1-ne(Math.abs(b)/p,0,1),S=ne(Math.min(I,w),0,1);T=ne(.5+.5*Math.pow(S,1.6),0,1)}let E=1-dt(0,.1),M=T*E*f;Number.isFinite(M)||(M=f),d[g*3]=M,d[g*3+1]=M,d[g*3+2]=M}s.setAttribute("color",new Pe(d,3))}return s.computeVertexNormals(),s}function nt(i={}){var e,n,s,r,o,a;let t=new we({color:(e=i.color)!=null?e:16777215,roughness:(n=i.roughness)!=null?n:.9,metalness:(s=i.metalness)!=null?s:0,flatShading:(r=i.flat)!=null?r:!1});return i.map&&(t.map=i.map),i.vertexColors&&(t.vertexColors=!0),i.emissive!==void 0&&(t.emissive.set(i.emissive),t.emissiveIntensity=(o=i.emissiveIntensity)!=null?o:1),i.transparent&&(t.transparent=!0,t.opacity=(a=i.opacity)!=null?a:1),i.depthWrite===!1&&(t.depthWrite=!1),i.side&&(t.side=i.side),i.ps1!==!1&&ou(t),t}function Ie(i={}){var e,n,s;let t=new Ze({color:(e=i.color)!=null?e:16777215,map:(n=i.map)!=null?n:null,transparent:!!i.transparent,opacity:(s=i.opacity)!=null?s:1});return i.vertexColors&&(t.vertexColors=!0),i.depthWrite===!1&&(t.depthWrite=!1),i.side&&(t.side=i.side),i.ps1!==!1&&ou(t),t}var Po=class{constructor(){this.ctx=null,this.master=null,this.ambientGain=null,this.humGain=null,this.tvGain=null,this.windGain=null,this.fear=0,this._noiseBuf=null,this._hbTimer=null,this._phoneTimer=null,this.enabled=!0,this.volume=.7,this.paused=!1,this.droneOscs=[],this.musNext=3,this.chasePulse=0,this.chaseBar=0,this.chaseOn=!1}ensure(){var e,n;if(this.ctx){(n=(e=this.ctx).resume)==null||n.call(e);return}try{let s=window.AudioContext||window.webkitAudioContext;this.ctx=new s}catch(s){this.enabled=!1;return}this.master=this.ctx.createGain(),this.master.gain.value=this.volume;let t=this.ctx.createDynamicsCompressor();t.threshold.value=-18,t.ratio.value=8,this.master.connect(t),t.connect(this.ctx.destination),this._noiseBuf=this._makeNoise(2),this._buildReverb(),this._buildAmbient(),this._buildEnvironment()}_buildEnvironment(){this.environment=[];let t=[{x:18.3,y:-1.6,z:27.9,frequency:72,gain:.06,range:12,type:"sine"},{x:22.6,y:-1,z:16.3,frequency:145,gain:.035,range:8,type:"triangle"},{x:-25.4,y:3.7,z:42.4,frequency:760,gain:.018,range:6,type:"noise"},{x:0,y:7,z:78,frequency:280,gain:.04,range:17,type:"noise"},{x:38,y:-1.8,z:40,frequency:88,gain:.05,range:15,type:"triangle",campaignFlag:"generator"},{x:37,y:-2,z:58,frequency:340,gain:.023,range:12,type:"noise"}],e=this.ctx;for(let n of t){let s=n.type==="noise"?e.createBufferSource():e.createOscillator();n.type==="noise"?(s.buffer=this._noiseBuf,s.loop=!0):(s.type=n.type,s.frequency.value=n.frequency);let r=e.createBiquadFilter();r.type="lowpass",r.frequency.value=n.frequency;let o=e.createGain();o.gain.value=0;let a=e.createPanner();a.panningModel="HRTF",a.distanceModel="inverse",a.refDistance=1.7,a.maxDistance=n.range,a.rolloffFactor=1.4,a.setPosition(n.x,n.y,n.z),s.connect(r),r.connect(o),o.connect(a),this._out(a,.2),s.start(),this.environment.push({...n,source:s,filter:r,volume:o})}}updateEnvironment(t,e,n){if(!this.ctx||!this.environment)return;let s=this.ctx,r=s.listener,o=s.currentTime;if(r.positionX)for(let[a,l]of[["positionX",t.x],["positionY",t.y],["positionZ",t.z],["forwardX",e.x],["forwardY",e.y],["forwardZ",e.z],["upX",0],["upY",1],["upZ",0]])r[a].setTargetAtTime(l,o,.04);else r.setPosition(t.x,t.y,t.z),r.setOrientation(e.x,e.y,e.z,0,1,0);for(let a of this.environment){let l=Math.hypot(t.x-a.x,t.y-a.y,t.z-a.z),c=l<a.range&&n(a);a.volume.gain.setTargetAtTime(l<a.range&&a.enabled!==!1?a.gain*(c?.12:1):0,o,.25),a.filter.frequency.setTargetAtTime(a.frequency*(c?.5:1),o,.25)}this.revGain&&this.revGain.gain.setTargetAtTime(t.y<-.8?.68:t.y>4.8?.18:.42,o,.6)}cameraShutter(t=0){this._noise({dur:.035,type:"highpass",freq:1400,gain:.11,pan:t}),this._noise({dur:.08,type:"bandpass",freq:440,gain:.09,pan:t,delay:.05}),this._osc({f0:180,f1:55,dur:.12,gain:.07,attack:.002,pan:t,delay:.04})}_makeNoise(t){let e=t*this.ctx.sampleRate|0,n=this.ctx.createBuffer(1,e,this.ctx.sampleRate),s=n.getChannelData(0);for(let r=0;r<e;r++)s[r]=Math.random()*2-1;return n}_buildReverb(){let t=this.ctx,e=1.9,n=e*t.sampleRate|0,s=t.createBuffer(2,n,t.sampleRate);for(let r=0;r<2;r++){let o=s.getChannelData(r),a=0;for(let l=0;l<n;l++){let c=l/n,h=Math.pow(1-c,2.4),u=(Math.random()*2-1)*h;a=a*.72+u*.28,o[l]=a*(l<200?l/200:1)}}this.rev=t.createConvolver(),this.rev.buffer=s,this.revGain=t.createGain(),this.revGain.gain.value=.5,this.rev.connect(this.revGain),this.revGain.connect(this.master)}_out(t,e=.35){if(t.connect(this.master),this.rev){let n=this.ctx.createGain();n.gain.value=e,t.connect(n),n.connect(this.rev)}}_buildAmbient(){let t=this.ctx,e=t.createGain();e.gain.value=.05;let n=t.createBiquadFilter();n.type="lowpass",n.frequency.value=130,e.connect(n),n.connect(this.master),this.ambientGain=e;for(let T of[41.2,41.7,82.4]){let E=t.createOscillator();E.type="sine",E.frequency.value=T;let M=t.createGain();M.gain.value=T>60?.35:1,E.connect(M),M.connect(e),E.start(),this.droneOscs.push(E)}let s=t.createBufferSource();s.buffer=this._noiseBuf,s.loop=!0;let r=t.createBiquadFilter();r.type="lowpass",r.frequency.value=420;let o=t.createGain();o.gain.value=.012,s.connect(r),r.connect(o),o.connect(this.master),s.start();let a=t.createOscillator();a.type="square",a.frequency.value=120;let l=t.createBiquadFilter();l.type="bandpass",l.frequency.value=120,l.Q.value=12;let c=t.createGain();c.gain.value=0,a.connect(l),l.connect(c),c.connect(this.master),a.start(),this.humGain=c;let h=t.createBufferSource();h.buffer=this._noiseBuf,h.loop=!0;let u=t.createBiquadFilter();u.type="highpass",u.frequency.value=900;let d=t.createGain();d.gain.value=0,h.connect(u),u.connect(d),d.connect(this.master),h.start(),this.tvGain=d;let f=t.createBufferSource();f.buffer=this._noiseBuf,f.loop=!0,f.playbackRate.value=.5;let m=t.createBiquadFilter();m.type="lowpass",m.frequency.value=240,m.Q.value=.7;let y=t.createGain();y.gain.value=0,f.connect(m),m.connect(y),y.connect(this.master),f.start(),this.windGain=y;let p=t.createOscillator();p.frequency.value=.13;let g=t.createGain();g.gain.value=90,p.connect(g),g.connect(m.frequency),p.start();let _=t.createBufferSource();_.buffer=this._noiseBuf,_.loop=!0,_.playbackRate.value=.35;let x=t.createBiquadFilter();x.type="bandpass",x.frequency.value=720,x.Q.value=.55;let b=t.createGain();if(b.gain.value=.006,_.connect(x),x.connect(b),b.connect(this.master),this.rev){let T=t.createGain();T.gain.value=.25,b.connect(T),T.connect(this.rev)}_.start(),this.rainGain=b}setWind(t){this.windGain&&this.windGain.gain.setTargetAtTime(ne(t,0,1)*.05,this.ctx.currentTime,.6)}setRain(t){this.rainGain&&this.rainGain.gain.setTargetAtTime(ne(t,0,1)*.02,this.ctx.currentTime,.8)}setFear(t){this.ctx&&(this.fear=ne(t,0,1),this.ambientGain&&this.ambientGain.gain.setTargetAtTime(.05+this.fear*.055,this.ctx.currentTime,.4))}setHum(t){this.humGain&&this.humGain.gain.setTargetAtTime(ne(t,0,1)*.022,this.ctx.currentTime,.25)}setTV(t){this.tvGain&&this.tvGain.gain.setTargetAtTime(t?.05:0,this.ctx.currentTime,.15)}_env(t,e,n,s){let o=this.ctx.createGain();return o.gain.setValueAtTime(1e-4,s),o.gain.linearRampToValueAtTime(t,s+e),o.gain.exponentialRampToValueAtTime(1e-4,s+e+n),o}_pan(t){if(!this.ctx)return null;let e=this.ctx.createStereoPanner?this.ctx.createStereoPanner():null;return e&&(e.pan.value=ne(t,-1,1)),e}_noise({dur:t=.1,type:e="bandpass",freq:n=400,freqEnd:s=null,q:r=2,gain:o=.1,attack:a=.005,pan:l=0,delay:c=0,hp:h=0}){if(!this.ctx)return;let u=this.ctx,d=u.currentTime+c,f=u.createBufferSource();f.buffer=this._noiseBuf,f.loop=!0,f.playbackRate.value=.8+Math.random()*.4;let m=u.createBiquadFilter();m.type=e,m.frequency.setValueAtTime(n,d),s!==null&&m.frequency.exponentialRampToValueAtTime(Math.max(30,s),d+t),m.Q.value=r;let y=m;if(h>0){let _=u.createBiquadFilter();_.type="highpass",_.frequency.value=h,m.connect(_),y=_}let p=this._env(o,a,t,d);y.connect(p);let g=this._pan(l);g?(p.connect(g),this._out(g,.3)):this._out(p,.3),f.connect(m),f.start(d),f.stop(d+t+a+.05)}_osc({type:t="sine",f0:e=440,f1:n=null,dur:s=.5,gain:r=.1,attack:o=.01,pan:a=0,delay:l=0,curve:c=[],wet:h=.35}){if(!this.ctx)return;let u=this.ctx,d=u.currentTime+l,f=u.createOscillator();f.type=t,f.frequency.setValueAtTime(e,d),n!==null&&f.frequency.exponentialRampToValueAtTime(Math.max(20,n),d+s);for(let[p,g]of c)f.frequency.setValueAtTime(g,d+p);let m=this._env(r,o,s,d);f.connect(m);let y=this._pan(a);y?(m.connect(y),this._out(y,h)):this._out(m,h),f.start(d),f.stop(d+s+o+.05)}footstep(t="wood"){t===!0&&(t="tatami"),t===!1&&(t="wood"),t==="tatami"?(this._noise({dur:.08,type:"lowpass",freq:300,gain:.06,attack:.004}),this._noise({dur:.05,type:"bandpass",freq:130,q:1.2,gain:.035,attack:.003})):t==="concrete"?(this._noise({dur:.07,type:"bandpass",freq:430,q:1.8,gain:.09,attack:.002,hp:120}),this._noise({dur:.04,type:"highpass",freq:1600,gain:.012,attack:.001})):(this._noise({dur:.09,type:"bandpass",freq:190,q:1.4,gain:.085,attack:.003,hp:60}),this._noise({dur:.04,type:"bandpass",freq:800,q:2,gain:.014,attack:.001}),Math.random()<.12&&this.woodenCreak())}runStep(t="wood"){let e=t==="concrete"?320:t==="tatami"?130:dt(220,300);this._noise({dur:.08,type:t==="tatami"?"lowpass":"bandpass",freq:e,q:1.5,gain:.11,attack:.003})}doorOpen(){let t=Pt(Math.random()*1e9|0);this._osc({type:"sawtooth",f0:70,f1:150,dur:.8,gain:.05,attack:.1,curve:[[.1,92],[.3,78],[.5,118],[.7,84]]}),this._noise({dur:.7,type:"bandpass",freq:300,freqEnd:900,q:6,gain:.03,attack:.06})}doorClose(){this._osc({type:"sawtooth",f0:140,f1:62,dur:.35,gain:.05,attack:.02}),this._noise({dur:.12,type:"lowpass",freq:800,gain:.1,attack:.002})}doorSlam(){this._noise({dur:.4,type:"lowpass",freq:500,gain:.5,attack:.002}),this._osc({type:"sine",f0:70,f1:38,dur:.5,gain:.28,attack:.002})}woodenCreak(){this._osc({type:"sawtooth",f0:dt(90,130),f1:dt(50,80),dur:1.4,gain:.03,attack:.4,curve:[[.3,110],[.7,92],[1.1,64]]})}sting(){if(!this.ctx)return;let t=[110,116.5,220,233,466];for(let e of t)this._osc({type:"sawtooth",f0:e*.97,f1:e*.94,dur:1.5,gain:.055,attack:.008});this._noise({dur:.7,type:"lowpass",freq:1600,gain:.22,attack:.004}),this._osc({type:"sine",f0:880,f1:60,dur:1.2,gain:.05,attack:.004})}scareBurst(){this._noise({dur:.9,type:"bandpass",freq:3e3,q:.6,gain:.5,attack:.002}),this._osc({type:"square",f0:180,f1:40,dur:.9,gain:.16,attack:.002})}whisper(t=0,e=1.8){if(!this.ctx)return;let n=5,s=dt(900,1500);for(let r=0;r<n;r++)this._noise({dur:e/n+.05,type:"bandpass",freq:s+Math.sin(r*1.7)*500+dt(-200,200),q:9,gain:.05+Math.random()*.03,attack:.06,pan:t,delay:r*e/n});this._noise({dur:e,type:"bandpass",freq:500,q:1,gain:.02,attack:.3,pan:t})}moan(t=0){let e=Pt(Math.random()*1e9|0),n=[];for(let s=0;s<=2.2;s+=.2)n.push([s,150-s*30+Math.sin(s*6)*18]);this._osc({type:"sine",f0:160,f1:80,dur:2.2,gain:.055,attack:.5,pan:t,curve:n}),this._noise({dur:2.2,type:"bandpass",freq:700,q:4,gain:.015,attack:.4,pan:t})}bell(){this._osc({type:"sine",f0:1568,f1:1500,dur:1.1,gain:.06,attack:.004}),this._osc({type:"sine",f0:2093,f1:1980,dur:.7,gain:.03,attack:.004})}phoneRing(){if(!this.ctx||this._phoneTimer)return;let t=()=>{this._osc({type:"square",f0:25,dur:.9,gain:.05,attack:.01}),this._osc({type:"square",f0:20,dur:.9,gain:.03,attack:.01})};t();let e=1;this._phoneTimer=setInterval(()=>{t(),++e>=4&&(clearInterval(this._phoneTimer),this._phoneTimer=null)},1900)}phoneStop(){this._phoneTimer&&(clearInterval(this._phoneTimer),this._phoneTimer=null)}heartbeat(t,e=1){if(!this.ctx)return;if(!t){this._hbTimer&&(clearInterval(this._hbTimer),this._hbTimer=null);return}if(this._hbTimer)return;let n=r=>{this._osc({type:"sine",f0:58,f1:40,dur:.14,gain:.5*r,attack:.006})},s=()=>{n(e),setTimeout(()=>n(e*.7),180)};s(),this._hbTimer=setInterval(s,850)}thud(){this._osc({type:"sine",f0:48,f1:30,dur:.25,gain:.4,attack:.004}),this._noise({dur:.12,type:"lowpass",freq:300,gain:.12,attack:.002})}clatter(){for(let t=0;t<4;t++)this._noise({dur:.06,type:"bandpass",freq:dt(900,2400),q:3,gain:.05,attack:.001,delay:t*.09})}paperRustle(){this._noise({dur:.5,type:"bandpass",freq:2200,q:1.5,gain:.06,attack:.03})}ending(){[220,261.6,329.6,220].forEach((e,n)=>{this._osc({type:"sine",f0:e,dur:5,gain:.04,attack:1.4,delay:n*.9}),this._osc({type:"triangle",f0:e*2.01,dur:5,gain:.012,attack:1.4,delay:n*.9})})}cry(t=0){let e=Pt(Math.random()*1e9|0),n=[];for(let s=0;s<=2.4;s+=.2)n.push([s,520+Math.sin(s*5.2)*60+e()*30]);this._osc({type:"sine",f0:540,f1:480,dur:2.4,gain:.035,attack:.35,pan:t,curve:n}),this._noise({dur:2.4,type:"bandpass",freq:900,q:5,gain:.012,attack:.3,pan:t})}childGiggle(t=0){let e=Pt(Math.random()*1e9|0),n=[];for(let s=0;s<=1.1;s+=.1)n.push([s,720+Math.sin(s*9)*90+e()*45]);this._osc({type:"sine",f0:720,f1:780,dur:1.1,gain:.028,attack:.02,pan:t,curve:n}),this._osc({type:"sine",f0:1440,f1:1520,dur:.7,gain:.008,attack:.02,pan:t}),this._noise({dur:.8,type:"bandpass",freq:2400,q:6,gain:.006,attack:.05,pan:t})}breath(t=0,e=3.2){if(!this.ctx)return;let n=2;for(let s=0;s<n;s++)this._noise({dur:e/n,type:"bandpass",freq:300,freqEnd:420,q:2,gain:.07,attack:e/n*.5,pan:t,delay:s*(e/n)})}knock(t=3){for(let e=0;e<t;e++)this._osc({type:"sine",f0:90,f1:50,dur:.18,gain:.22,attack:.002,delay:e*.34,pan:dt(-.4,.4)}),this._noise({dur:.06,type:"lowpass",freq:400,gain:.1,attack:.001,delay:e*.34,pan:dt(-.4,.4)})}ceilingSteps(){for(let t=0;t<5;t++)this._osc({type:"sine",f0:60,f1:38,dur:.16,gain:.12,attack:.004,delay:t*.42,pan:dt(-.6,.6)})}drip(){this._osc({type:"sine",f0:1400,f1:420,dur:.12,gain:.05,attack:.002}),this._noise({dur:.04,type:"bandpass",freq:2200,q:4,gain:.03,attack:.001,delay:.08})}musicBox(){[659.25,587.33,493.88,587.33,659.25,587.33,493.88,440].forEach((e,n)=>{this._osc({type:"sine",f0:e,dur:1.2,gain:.038,attack:.004,delay:n*.42}),this._osc({type:"sine",f0:e*2.003,dur:1.2,gain:.008,attack:.004,delay:n*.42})})}radio(){if(!this.ctx)return;this._noise({dur:.5,type:"bandpass",freq:400,freqEnd:1200,q:8,gain:.08,attack:.02}),this._noise({dur:2.2,type:"bandpass",freq:700,q:3,gain:.04,attack:.1,delay:.5,pan:dt(-.5,.5)});let t=Pt(Math.random()*1e9|0);for(let e=0;e<6;e++)this._noise({dur:.16,type:"bandpass",freq:300+t()*600,q:10,gain:.05,attack:.02,delay:.7+e*.22,pan:dt(-.4,.4)});this._noise({dur:.3,type:"bandpass",freq:2e3,freqEnd:500,q:5,gain:.05,attack:.01,delay:2.4})}scrape(){this._noise({dur:1.1,type:"bandpass",freq:1300,q:8,gain:.045,attack:.08,hp:300}),this._osc({type:"sawtooth",f0:420,f1:380,dur:1.1,gain:.02,attack:.08})}siren(t=0){if(this.ctx)for(let e=0;e<2;e++)this._osc({type:"sine",f0:660+e*4,f1:875+e*4,dur:3,gain:.011,attack:1.4,pan:t,wet:.6}),this._osc({type:"sine",f0:875+e*4,f1:660+e*4,dur:3,gain:.011,attack:1.4,pan:t,wet:.6,delay:3.1})}hammer(t=0){if(this.ctx)for(let e=0;e<3;e++)this._osc({type:"triangle",f0:132-e*14,f1:58,dur:.09,gain:.085,attack:.003,pan:t,delay:e*.19}),this._noise({dur:.05,type:"bandpass",freq:2300,q:3,gain:.018,attack:.002,pan:t,delay:e*.19})}washer(t=0){if(this.ctx){this._osc({type:"sawtooth",f0:52,f1:58,dur:5.5,gain:.026,attack:1.2,pan:t,wet:.5}),this._noise({dur:5.5,type:"bandpass",freq:320,q:2,gain:.018,attack:1.2,pan:t,wet:.5});for(let e=0;e<9;e++)this._osc({type:"sine",f0:46,dur:.07,gain:.05,attack:.004,pan:t,delay:1.4+e*.42})}}chime(t=0){if(!this.ctx)return;let e=[1975,2349,2637,3136],n=Pt(Math.random()*1e9|0),s=0,r=3+(n()*3|0);for(let o=0;o<r;o++){let a=e[n()*e.length|0];this._osc({type:"sine",f0:a,dur:1.5,gain:.028,attack:.004,pan:t,delay:s,wet:.5}),this._osc({type:"sine",f0:a*2.76,dur:.8,gain:.006,attack:.004,pan:t,delay:s,wet:.5}),s+=.18+n()*.85}}duck(){this.master&&(this.master.gain.setTargetAtTime(this.volume*.18,this.ctx.currentTime,.02),setTimeout(()=>this.setVolume(this.volume),350))}setVolume(t){this.volume=ne(t,0,1),this.master&&this.master.gain.setTargetAtTime(this.paused?this.volume*.12:this.volume,this.ctx.currentTime,.05)}setPaused(t){this.paused=t,this.setVolume(this.volume)}puzzleTone(t){this._osc({type:"sine",f0:[0,261.63,329.63,392,523.25][t],dur:.9,gain:.1,attack:.005,wet:.45})}switchClick(){this._noise({dur:.03,type:"bandpass",freq:2400,q:3,gain:.07,attack:.001}),this._osc({type:"square",f0:240,f1:140,dur:.05,gain:.04,attack:.001})}buzz(){this._osc({type:"sawtooth",f0:118,f1:124,dur:.5,gain:.035,attack:.02,wet:.2}),this._osc({type:"sawtooth",f0:236,f1:248,dur:.5,gain:.012,attack:.02,wet:.2})}thunder(t=.5){let e=ne(t,0,1),n=.1+e*.4,s=.5-e*.32;this._noise({dur:.5+e*1.6,type:"lowpass",freq:420-e*250,gain:s*.7,attack:.02+e*.25,delay:n,wet:.6}),this._noise({dur:.25,type:"lowpass",freq:900,gain:s*.5,attack:.004,delay:n+.05+e*.2,wet:.6}),this._osc({type:"sine",f0:54,f1:30,dur:1.6+e,gain:s*.5,attack:.05,delay:n,wet:.5})}updateMusic(t,e,n){if(this.ctx){if(n&&!this.chaseOn&&(this.chaseOn=!0,this.chasePulse=0,this.chaseBar=0),!n&&this.chaseOn&&(this.chaseOn=!1),this.musNext-=t,this.musNext<=0){this.musNext=dt(9,16)-e*6;let s=110,r=[1,6/5,4/3,3/2,8/5],o=s*r[Math.random()*r.length|0]*(Math.random()<.4?2:1);this._osc({type:"sine",f0:o,dur:dt(4,7),gain:.028+e*.02,attack:1.6,wet:.85}),this._osc({type:"sine",f0:o*2.002,dur:dt(4,7),gain:.008+e*.006,attack:2.2,wet:.85}),e>.45&&Math.random()<.5&&this._osc({type:"sine",f0:o*16/15,dur:dt(3,5),gain:.014,attack:2.4,wet:.9}),e>.7&&Math.random()<.35&&this._osc({type:"sawtooth",f0:o/2,dur:3,gain:.008,attack:1.2,wet:.9})}if(this.chaseOn&&(this.chasePulse-=t,this.chasePulse<=0&&(this.chasePulse=.21,this._osc({type:"square",f0:this.chaseBar%2?58:55,dur:.1,gain:.05,attack:.002,wet:.15})),this.chaseBar-=t,this.chaseBar<=0)){this.chaseBar=1.68;for(let s of[220,233.1,311.1])this._osc({type:"sawtooth",f0:s*.985,f1:s*.94,dur:1.4,gain:.016,attack:.03,wet:.7})}}}lullaby(){let t=[659.25,587.33,493.88,587.33,659.25,493.88,440,0,493.88,587.33,659.25,587.33,493.88,440],e=0;for(let n of t)n>0&&(this._osc({type:"sine",f0:n,dur:1.4,gain:.026,attack:.008,delay:e,wet:.8}),this._osc({type:"sine",f0:n*2.003,dur:1.4,gain:.006,attack:.008,delay:e,wet:.8})),e+=.56}};function v1(i){let t=Object.keys(i[0].geometry.attributes).sort();if(i.some(a=>a.geometry.isInstancedBufferGeometry||Object.keys(a.geometry.morphAttributes).length||a.geometry.drawRange.start!==0||a.geometry.drawRange.count!==1/0||Object.keys(a.geometry.attributes).sort().join()!==t.join()))return null;for(let a of t){let l=i[0].geometry.attributes[a];if(l.isInterleavedBufferAttribute||i.some(c=>{let h=c.geometry.attributes[a];return h.isInterleavedBufferAttribute||h.itemSize!==l.itemSize||h.normalized!==l.normalized||h.array.constructor!==l.array.constructor}))return null}let e=i.map(a=>(a.updateMatrix(),a.geometry.clone().applyMatrix4(a.matrix))),n=new ge,s=0;for(let a of e)s+=a.attributes.position.count;for(let a of t){let l=e[0].attributes[a],c=new l.array.constructor(s*l.itemSize),h=0;for(let u of e)c.set(u.attributes[a].array,h),h+=u.attributes[a].array.length;n.setAttribute(a,new Pe(c,l.itemSize,l.normalized))}let r=[],o=0;for(let a of e){if(a.index)for(let l of a.index.array)r.push(l+o);else for(let l=0;l<a.attributes.position.count;l++)r.push(l+o);o+=a.attributes.position.count,a.dispose()}return n.setIndex(r),n.computeBoundingBox(),n.computeBoundingSphere(),n}function au(i,t,e=!0){let n=i.children.filter(r=>r.isMesh).length;if(e){let r=new Map;for(let o of i.children){if(!o.isMesh||o===t||Array.isArray(o.material)||o.material.transparent||o.material.opacity!==1||o.material.alphaTest>0||!o.material.depthWrite||!o.visible||o.userData.interactable||o.customDepthMaterial||o.customDistanceMaterial||o.onBeforeRender!==Ee.prototype.onBeforeRender||o.onAfterRender!==Ee.prototype.onAfterRender)continue;let a=r.get(o.material);a||(a=new Map,r.set(o.material,a));let l=[o.castShadow,o.receiveShadow,o.renderOrder,o.layers.mask,o.frustumCulled].join("/");a.has(l)||a.set(l,[]),a.get(l).push(o)}for(let[o,a]of r)for(let l of a.values()){if(l.length<2)continue;let c=v1(l);if(!c)continue;let h=l[0],u=new Y(c,o);u.name="fixture-static-hardware",u.castShadow=h.castShadow,u.receiveShadow=h.receiveShadow,u.renderOrder=h.renderOrder,u.layers.mask=h.layers.mask,u.frustumCulled=h.frustumCulled,i.add(u);for(let d of l)i.remove(d),d.geometry.dispose()}}let s={enabled:e,before:n,after:i.children.filter(r=>r.isMesh).length};return i.userData.fixtureBatching=s,s}function fn(i,t,e){let n=Math.min(.018,i/7,t/7,e/7),s=new Ti;s.moveTo(-i/2+n,-e/2+n),s.lineTo(i/2-n,-e/2+n),s.lineTo(i/2-n,e/2-n),s.lineTo(-i/2+n,e/2-n),s.closePath();let r=new us(s,{depth:t-2*n,bevelEnabled:!0,bevelSize:n,bevelThickness:n,bevelSegments:2,curveSegments:1,steps:1});return r.rotateX(-Math.PI/2),r.translate(0,n-t/2,0),r}function b1(i,t,e=!1){let n=Pt(t),s=256,r=Array.from({length:3},()=>{let a=document.createElement("canvas");return a.width=a.height=s,a}),o=r.map(a=>a.getContext("2d").createImageData(s,s));for(let a=0;a<s;a++)for(let l=0;l<s;l++){let c=(a*s+l)*4,h=(n()-.5)*18,u=e?Math.sin(l*.24+Math.sin(a*.024)*1.7)*8+Math.sin(l*.73)*2:0,d=n()<.015?-26:0;for(let f=0;f<3;f++)o[0].data[c+f]=i[f]+h+u+d,o[1].data[c+f]=128+h*2+u*1.5+d*2,o[2].data[c+f]=218+h;for(let f of o)f.data[c+3]=255}return r.map((a,l)=>{a.getContext("2d").putImageData(o[l],0,0);let c=new yn(a);return c.wrapS=c.wrapT=In,c.colorSpace=l===0?ye:Ge,c.anisotropy=8,c})}function pn(i){if(i.detailMaterials)return i.detailMaterials;let t=(e,n,s,r)=>{let[o,a,l]=b1(e,n,s);return new we({map:o,bumpMap:a,roughnessMap:l,bumpScale:r,roughness:.96})};return i.detailMaterials={wood:t([100,76,51],771,!0,.012),concrete:t([133,132,119],772,!1,.018),paint:t([85,105,93],773,!1,.006),plaster:t([174,166,143],774,!1,.012),iron:new we({color:5793633,roughness:.63,metalness:.38}),brass:new we({color:9599563,roughness:.53,metalness:.52}),rubber:new we({color:2435881,roughness:.68}),enamel:new we({color:11976372,roughness:.52,metalness:.08}),darkGlass:new we({color:2241326,roughness:.17,metalness:.24})},i.detailMaterials}function lu(i,t,e,n,s,r=i.scene){let o=pn(i),a=new Ot;a.position.set(t,e,n),r.add(a);let l=(u,d,f,m,y,p,g)=>{let _=new Y(fn(u,d,f),m);return _.position.set(y,p,g),a.add(_),_};l(.75,.07,.25,o.iron,0,0,0);let c=new Ze({color:s}),h=l(.57,.045,.19,c,0,-.06,0);for(let u=0;u<15;u++)l(.008,.008,.18,o.enamel,-.27+u*.038,-.087,0);for(let u of[-1,1]){l(.065,.1,.27,o.enamel,u*.335,-.025,0);for(let d of[-.085,.085]){let f=new Y(new bt(.01,.01,.007,8),o.brass);f.position.set(u*.335,-.079,d),a.add(f)}}return au(a,h,i.batchStaticFixtures!==!1),{group:a,diffuser:h}}function Pl(i,{x0:t,x1:e,z0:n,z1:s,base:r,height:o,gapX:a=null,leftDoor:l=null}){let c=pn(i),h={collide:!1,cast:!1,geo:{jitter:0,ao:"none"}};for(let d=0;d<o/2.8;d++){let f=r+d*2.8;for(let p of[t+.12,e-.12]){let g=l&&p<t+.2&&Math.abs(f-l.y)<.01?[[n,l.gap[0]],[l.gap[1],s]]:[[n,s]];for(let[_,x]of g)i.box(p,(_+x)/2,f,.025,x-_,1.15,c.paint,h),i.box(p,(_+x)/2,f+1.15,.036,x-_,.035,c.iron,h),i.box(p,(_+x)/2,f,.04,x-_,.14,c.rubber,h)}i.box((t+e)/2,s-.12,f,e-t,.025,1.15,c.paint,h),i.box((t+e)/2,s-.12,f,e-t,.04,.14,c.rubber,h);let m=a?[[t,a[0]],[a[1],e]]:[[t,e]];for(let[p,g]of m)g>p&&i.box((p+g)/2,n+.12,f,g-p,.025,1.15,c.paint,h);let y=new Y(new bt(.019,.019,2.5,10),c.iron);y.position.set(e-.16,f+1.4,s-.4),i.scene.add(y);for(let p of[.35,1.15,2.25])i.box(e-.15,s-.4,f+p,.035,.1,.04,c.brass,h);i.box(e-.17,s-1.1,f+1.2,.12,.38,.46,c.iron,h),i.box(e-.24,s-1.1,f+1.24,.018,.32,.38,c.paint,h)}let u=Pt(817);for(let d=0;d<34;d++){let f=r+.18+u()*(o-.4),m=n+.7+u()*(s-n-1.4),y=.04+u()*.22,p=.1+u()*.48;if(l&&m>l.gap[0]-.2&&m<l.gap[1]+.2&&f>l.y-.5&&f<l.y+2.2)continue;let g=d%3?c.plaster:c.rubber;i.box(t+.137,m,f,.006,y,p,g,h)}}function cu(i,t,e,n,s){let r=pn(i),o=new Ot;s==="z"&&(o.rotation.y=-Math.PI/2),t.add(o);let a=(l,c,h,u,d)=>{let f=new Y(l,c);return f.position.set(h,u,d),o.add(f),f};for(let l of[-1,1]){for(let h of[-n*.23,n*.16]){let u=e*.7,d=n*.32;for(let f of[-u/2,u/2])a(fn(.018,d,.012),r.wood,f,h,l*.036);for(let f of[h-d/2,h+d/2])a(fn(u,.018,.012),r.wood,0,f,l*.036)}a(fn(.085,.17,.014),r.brass,e/2-.09,n*.04,l*.04);let c=a(new bt(.012,.012,.13,12),r.brass,e/2-.145,n*.04,l*.075);c.rotation.z=Math.PI/2}for(let l of[-n*.34,0,n*.34])a(new bt(.014,.014,.12,12),r.iron,-e/2+.016,l,0)}function hu(i,t,e,n){let s=pn(i),r=new Ot;r.position.set(t,n,e),i.scene.add(r);let o=(l,c,h,u,d,f,m)=>{let y=new Y(fn(l,c,h),u);return y.position.set(d,f,m),r.add(y),y};o(1.18,.1,.57,s.wood,0,.1,0),o(1.25,.075,.62,s.wood,0,2.01,0);for(let l of[-1,1]){o(.075,1.85,.58,s.wood,l*.586,1.04,0),o(.1,.1,.12,s.wood,l*.5,.05,-.19),o(.1,.1,.12,s.wood,l*.5,.05,.19);let c=l*.282;for(let u of[-.245,.245])o(.058,1.79,.045,s.wood,c+u,1.08,-.301);for(let u of[.21,1.95])o(.55,.05,.045,s.wood,c,u,-.301);o(.455,1.6,.025,s.paint,c,1.08,-.288);for(let u=0;u<5;u++)o(.34,.013,.005,s.rubber,c,1.56+u*.047,-.303);o(.052,.17,.02,s.brass,l*.061,1.05,-.319);let h=new Y(new bt(.012,.012,.12,10),s.brass);h.position.set(l*.061,1.05,-.34),r.add(h);for(let u of[.38,1.76])o(.015,.085,.016,s.brass,l*.558,u,-.328)}o(1.1,1.82,.032,s.wood,0,1.06,.286);let a={x0:t-.625,x1:t+.625,y0:n,y1:n+2.05,z0:e-.36,z1:e+.31};return i.colliders.push(a),r.userData.collider=a,r.userData.model="wardrobe",r.userData.interactionPoint={x:0,y:1.08,z:-.34},r}function Lo(i,t=64){var a,l,c;let e=[],n=[],s=[];for(let h=0;h<i.length;h++){let u=i[h],d=2/((a=u.exponent)!=null?a:2);for(let f=0;f<=t;f++){let m=f/t*Math.PI*2,y=Math.cos(m),p=Math.sin(m);e.push(((l=u.x)!=null?l:0)+Math.sign(y)*Math.abs(y)**d*u.w/2,u.y,((c=u.z)!=null?c:0)+Math.sign(p)*Math.abs(p)**d*u.d/2),n.push(f/t,h/(i.length-1))}}for(let h=0;h<i.length-1;h++)for(let u=0;u<t;u++){let d=h*(t+1)+u,f=d+t+1;s.push(d,f,d+1,d+1,f,f+1)}let r=new ge;r.setAttribute("position",new re(e,3)),r.setAttribute("uv",new re(n,2)),r.setIndex(s),r.computeVertexNormals();let o=r.attributes.normal;for(let h=0;h<i.length;h++){let u=h*(t+1),d=u+t,f=new L().fromBufferAttribute(o,u).add(new L().fromBufferAttribute(o,d)).normalize();o.setXYZ(u,f.x,f.y,f.z),o.setXYZ(d,f.x,f.y,f.z)}return r.computeBoundingBox(),r.computeBoundingSphere(),r}function M1(i,t,e=64){let n=i.findIndex((f,m)=>m+1<i.length&&f.y>=t&&i[m+1].y<t);if(n<0)throw new Error("Waterline must intersect the descending inner wall");let s=i[n],r=i[n+1],o=(s.y-t)/(s.y-r.y),a=(f,m)=>{var x,b,T;let y=m/e*Math.PI*2,p=Math.cos(y),g=Math.sin(y),_=2/((x=f.exponent)!=null?x:2);return new L(((b=f.x)!=null?b:0)+Math.sign(p)*Math.abs(p)**_*f.w/2,t,((T=f.z)!=null?T:0)+Math.sign(g)*Math.abs(g)**_*f.d/2)},l=[];for(let f=0;f<e;f++)l.push(a(s,f).lerp(a(r,f),o)),l.push(a(s,f+1).lerp(a(r,f),o));let c=l.reduce((f,m)=>f.add(m),new L).multiplyScalar(1/l.length),h=[c.x,t,c.z],u=[];for(let f of l){let m=f.clone().sub(c),y=m.length();f.addScaledVector(m,-Math.min(2e-4/y,.01)),h.push(f.x,t,f.z)}for(let f=0;f<l.length;f++)u.push(0,(f+1)%l.length+1,f+1);let d=new ge;return d.setAttribute("position",new re(h,3)),d.setIndex(u),d.computeVertexNormals(),d.computeBoundingBox(),d.computeBoundingSphere(),d}function uu(i){let t=pn(i),e=new we({color:12567736,roughness:.48}),n=new we({color:11187626,roughness:.54}),s=new we({color:2700847,roughness:.86}),r=new we({color:1518888,roughness:.28,metalness:.08}),o={};i.props.bathroomFixtures=o;let a=(B,D,O,X)=>{let $=new Ot;$.name="bathroom-"+B,$.position.set(D,0,O),i.scene.add($);let Z=Le(D,X.h/2,O,X.w,X.h,X.d);Z.fixture=B,i.colliders.push(Z);let q={group:$,collider:Z,parts:{},bounds:X};return o[B]=q,q},l=(B,D,O,X,$=0,Z=0,q=0)=>{let Q=new Y(O,X);return Q.position.set($,Z,q),Q.name=D,B.group.add(Q),B.parts[D]=Q,Q},c=(B,D,O,X,$,Z,q,Q,ot)=>l(B,D,fn(O,X,$),Z,q,Q,ot),h=(B,D,O,X,$=.014)=>{let Z=new L(...O),q=new L(...X),Q=q.clone().sub(Z),ot=l(B,D,new bt($,$,Q.length(),12),t.iron);return ot.position.copy(Z.add(q).multiplyScalar(.5)),ot.quaternion.setFromUnitVectors(new L(0,1,0),Q.normalize()),ot},u=(B,D,O,X,$)=>{let Z=l(B,"drain-flange",new tn($,.004,8,32),t.iron,D,O,X);Z.rotation.x=-Math.PI/2;let q=l(B,"drain-throat",new vn($-.004,32),s,D,O-.006,X);q.rotation.x=-Math.PI/2},d=a("tub",-15.8,20.35,{w:1.4,d:.7,h:.55});c(d,"plinth",1.3,.15,.6,t.concrete,0,.075,0);let f=[{w:1.22,d:.53,y:.15,exponent:5},{w:1.34,d:.65,y:.48,exponent:5},{w:1.4,d:.7,y:.55,exponent:5},{w:1.275,d:.575,y:.55,exponent:4},{w:1.22,d:.53,y:.49,exponent:4},{w:1.02,d:.38,y:.25,exponent:4},{w:.055,d:.055,y:.247,x:.44,exponent:2}];l(d,"hollow-shell",Lo(f),n),d.profile=f,u(d,.44,.249,0,.0275),l(d,"water",M1(f,.31),r),h(d,"mixer-stem",[.4,.55,.255],[.4,.74,.255],.02),h(d,"mixer-spout",[.4,.74,.255],[.4,.74,.05],.016),c(d,"mixer-base",.085,.018,.075,t.iron,.4,.559,.255);for(let B of[.34,.46])c(d,"tap-"+B,.045,.035,.045,t.brass,B,.7,.255);let m=new Ot;m.position.set(-15.8,0,20.82),i.scene.add(m);let y={group:m,parts:{}};o.shower=y,h(y,"riser",[0,.55,0],[0,1.95,0],.015),h(y,"mixer-feed",[.4,.64,-.215],[.4,.64,0],.014),h(y,"riser-feed",[.4,.64,0],[0,.64,0],.014),h(y,"head-arm",[0,1.95,0],[0,1.95,-.16],.015);let p=l(y,"shower-head",new bt(.055,.045,.035,24),t.iron,0,1.93,-.16),g=l(y,"perforated-face",new bt(.049,.049,.004,24),s,0,1.91,-.16);for(let B of[.68,1.35,1.85])h(y,"wall-bracket-"+B,[0,B,0],[0,B,.065],.021);let _=a("toilet",-14.55,16.455,{w:.38,d:.71,h:.718}),x=-.08,b=[{w:.23,d:.38,y:0,z:x},{w:.29,d:.43,y:.2,z:x},{w:.38,d:.55,y:.38,z:x},{w:.27,d:.365,y:.38,z:x},{w:.18,d:.25,y:.255,z:x},{w:.07,d:.09,y:.175,z:x}];l(_,"open-pan",Lo(b),e),_.profile=b,l(_,"seat-ring",Lo([{w:.38,d:.54,y:.386,z:x},{w:.38,d:.54,y:.41,z:x},{w:.255,d:.35,y:.41,z:x},{w:.255,d:.35,y:.386,z:x},{w:.38,d:.54,y:.386,z:x}]),n),c(_,"rear-support",.25,.38,.19,e,0,.19,.25),c(_,"cistern-gasket",.3,.012,.18,s,0,.386,.25),c(_,"cistern",.36,.302,.16,e,0,.541,.275),c(_,"cistern-lid",.38,.026,.16,n,0,.705,.275);let E=l(_,"flush-button",new bt(.023,.023,.007,24),t.brass,0,.721,.275),M=l(_,"water",new vn(1,32),r,0,.183,x);M.rotation.x=-Math.PI/2,M.scale.set(.034,.044,1);for(let B of[-.09,.09])c(_,"seat-hinge-"+B,.035,.028,.042,t.iron,B,.399,.15);for(let B of[-.1,.1])l(_,"floor-fixing-"+B,new Ne(.018,12,8),e,B,.022,.035);let I=a("basin",-16.55,15.18,{w:.55,d:.46,h:.82});c(I,"pedestal-foot",.22,.07,.21,e,0,.035,0);let w=l(I,"pedestal",new bt(.09,.105,.57,24),e,0,.355,0);w.scale.z=.85;let S=[{w:.22,d:.18,y:.64,exponent:3},{w:.5,d:.41,y:.765,exponent:4},{w:.55,d:.46,y:.82,exponent:4},{w:.44,d:.32,y:.82,z:.035,exponent:3},{w:.18,d:.13,y:.67,z:.035,exponent:2},{w:.046,d:.046,y:.653,z:.035,exponent:2}];l(I,"hollow-bowl",Lo(S),e),I.profile=S,u(I,0,.655,.035,.023),c(I,"tap-escutcheon",.07,.018,.07,t.iron,0,.829,-.18),h(I,"tap-stem",[0,.838,-.18],[0,.94,-.18],.018),h(I,"tap-spout",[0,.94,-.18],[0,.94,-.02],.014),c(I,"tap-lever",.085,.016,.025,t.brass,.025,.959,-.18);for(let B of[-.18,.18])h(I,"wall-fixing-"+B,[B,.75,-.2],[B,.75,-.255],.015);let R=new Ot;R.position.set(-16.55,1.5,14.925),i.scene.add(R);let U={group:R,parts:{}};o.mirror=U;for(let B of[-.24,.24])for(let D of[-.28,.28])h(U,"wall-standoff-"+B+"-"+D,[B,D,-.032],[B,D,0],.011);c(U,"backing",.59,.69,.025,t.paint,0,0,0),c(U,"glass",.53,.63,.006,t.darkGlass,0,0,.018);for(let B of[-.285,.285])c(U,"frame-side-"+B,.025,.69,.035,t.iron,B,0,.015);for(let B of[-.332,.332])c(U,"frame-rail-"+B,.59,.025,.035,t.iron,0,B,.015);return o}function ie(i,t){let e=document.createElement("canvas");return e.width=i,e.height=t,e}function _e(i,t,{r:e=255,g:n=255,b:s=255,amp:r=18,scale:o=1,base:a=null}){let l=i.data,c=i.width,h=i.height;for(let u=0;u<h;u++)for(let d=0;d<c;d++){let f=(u*c+d)*4,m=(t()-.5)*2*r*o,y=a?a[f]:0,p=a?y:e;l[f]=Math.max(0,Math.min(255,p+m)),l[f+1]=Math.max(0,Math.min(255,(a?a[f+1]:n)+m)),l[f+2]=Math.max(0,Math.min(255,(a?a[f+2]:s)+m)),l[f+3]=255}return i}function Qs(i,t,e,n=4,s=[120,118,110]){let r=i.data,o=i.width,a=i.height,l=[];for(let c=0;c<n;c++){let h=2<<c,u=2<<c,d=new Float32Array(h*u);for(let f=0;f<d.length;f++)d[f]=t();l.push({g:d,gw:h,gh:u})}for(let c=0;c<a;c++)for(let h=0;h<o;h++){let u=0,d=0;for(let m=0;m<n;m++){let{g:y,gw:p,gh:g}=l[m],_=h/o*p,x=c/a*g,b=Math.floor(_)%p,T=Math.floor(x)%g,E=(b+1)%p,M=(T+1)%g,I=_-Math.floor(_),w=x-Math.floor(x),S=I*I*(3-2*I),R=w*w*(3-2*w),U=y[T*p+b]*(1-S)*(1-R)+y[T*p+E]*S*(1-R)+y[M*p+b]*(1-S)*R+y[M*p+E]*S*R;u+=U/(m+1),d+=1/(m+1)}u/=d;let f=(c*o+h)*4;r[f]=s[0]+(u-.5)*2*e,r[f+1]=s[1]+(u-.5)*2*e,r[f+2]=s[2]+(u-.5)*2*e,r[f+3]=255}}function Io(i,t,e,n,s,r=.14,o=2){i.save(),i.globalAlpha=r,i.fillStyle=s;for(let a=o;a>=0;a--)i.beginPath(),i.ellipse(t+(Math.random()-.5)*n*.7,e+(Math.random()-.5)*n*.7,n*(a+.6)/o*.55,n*(a+.6)/o*.4,Math.random()*3,0,Math.PI*2),i.fill();i.restore()}function ve(i,t,e,n,s,r){for(let o=0;o<s;o++)Io(i,r()*t,r()*e,4+r()*16,n,.05+r()*.12,3)}function Dl(i,t,e,n,s=7,r="rgba(20,18,14,0.5)"){i.strokeStyle=r,i.lineWidth=1;for(let o=0;o<s;o++){let a=n()*t,l=n()*e;i.beginPath(),i.moveTo(a,l);let c=3+(n()*5|0);for(let h=0;h<c;h++)a+=(n()-.5)*26,l+=(n()-.5)*26,i.lineTo(a,l);i.stroke()}}function se(i,t=!0){let e=new yn(i);return e.magFilter=on,e.minFilter=An,e.generateMipmaps=!0,e.anisotropy=16,e.colorSpace=ye,t&&(e.wrapS=In,e.wrapT=In),e}function E1(i,t=!1){let e=new yn(i);return e.magFilter=He,e.minFilter=He,e.generateMipmaps=!1,e.colorSpace=Ge,t&&(e.wrapS=In,e.wrapT=In),e}function w1(i){let t=ie(128,128),e=t.getContext("2d"),n=e.createImageData(128,128);Qs(n,i,14,4,[150,147,136]),e.putImageData(n,0,0),ve(e,128,128,"#3a3f33",26,i),ve(e,128,128,"#6f735a",14,i);for(let s=0;s<8;s++){let r=i()*128,o=i()*128,a=6+i()*14;e.fillStyle="rgba(70,74,62,0.35)",e.beginPath(),e.ellipse(r,o,a,a*.7,i(),0,7),e.fill(),e.strokeStyle="rgba(220,215,195,0.25)",e.lineWidth=1.5,e.beginPath(),e.ellipse(r,o,a,a*.7,i(),0,7),e.stroke()}return Dl(e,128,128,i,6),se(t)}function S1(i){let t=ie(256,512),e=t.getContext("2d");e.fillStyle="#6f6a5e",e.fillRect(0,0,256,512);for(let o=0;o<256;o+=32)e.fillStyle=o/32%2?"#6c675c":"#716c61",e.fillRect(o,0,32,512),e.fillStyle="rgba(52,56,46,0.18)",e.fillRect(o+15,0,3,512);let n=e.getImageData(0,0,256,512);_e(n,i,{amp:8,base:n.data.slice()}),e.putImageData(n,0,0),ve(e,256,512,"#3d4234",60,i);let s=80+i()*240;e.fillStyle="#5f5c52",e.fillRect(0,s,256,36+i()*60);let r=e.getImageData(0,s,256,80);return _e(r,i,{amp:12,base:r.data.slice()}),e.putImageData(r,0,s),e.fillStyle="rgba(40,36,30,0.45)",e.fillRect(0,s-3,256,3),e.fillRect(0,s+78,256,3),Dl(e,256,512,i,6),se(t)}function Il(i,t=128,e=128,n=[86,66,46],s=!1){let r=ie(t,e),o=r.getContext("2d");o.fillStyle=`rgb(${n[0]},${n[1]},${n[2]})`,o.fillRect(0,0,t,e);let a=4;for(let c=0;c<a;c++)o.fillStyle=`rgba(${n[0]-14},${n[1]-12},${n[2]-10},0.55)`,s?o.fillRect(0,e/a*c,t,1):o.fillRect(t/a*c,0,1,e),o.fillStyle="rgba(255,235,200,0.04)",s?o.fillRect(0,e/a*c+1,t,1):o.fillRect(t/a*c+1,0,1,e);let l=o.getImageData(0,0,t,e);_e(l,i,{amp:10,base:l.data.slice()}),o.putImageData(l,0,0),o.strokeStyle="rgba(50,36,22,0.25)";for(let c=0;c<26;c++){if(o.beginPath(),s){let h=i()*e;o.moveTo(0,h),o.bezierCurveTo(t*.3,h+(i()-.5)*6,t*.7,h+(i()-.5)*6,t,h)}else{let h=i()*t;o.moveTo(h,0),o.bezierCurveTo(h+(i()-.5)*6,e*.3,h+(i()-.5)*6,e*.7,h,e)}o.stroke()}return ve(o,t,e,"#2c2118",14,i),se(r)}function T1(i){let t=ie(128,256),e=t.getContext("2d");e.drawImage(Il(i,128,256,[92,70,48],!0).image,0,0),e.strokeStyle="rgba(30,22,14,0.6)",e.lineWidth=3;for(let[n,s]of[[18,92],[146,92]])e.strokeRect(14,n,100,s),e.strokeStyle="rgba(255,240,210,0.08)",e.strokeRect(16,n+2,96,s-4),e.strokeStyle="rgba(30,22,14,0.6)";return e.fillStyle="#8a7a3a",e.beginPath(),e.arc(104,150,5,0,7),e.fill(),e.fillStyle="rgba(0,0,0,0.35)",e.beginPath(),e.arc(104,152,3,0,7),e.fill(),ve(e,128,256,"#241a10",12,i),se(t)}function A1(i){let t=ie(128,128),e=t.getContext("2d");e.fillStyle="#a3a05a",e.fillRect(0,0,128,128);let n=e.getImageData(0,0,128,128);_e(n,i,{amp:12,base:n.data.slice()}),e.putImageData(n,0,0),e.strokeStyle="rgba(96,94,48,0.35)",e.lineWidth=1;for(let s=0;s<128;s+=6)e.beginPath(),e.moveTo(0,s),e.lineTo(128,s),e.stroke();return e.strokeStyle="rgba(60,58,30,0.5)",e.lineWidth=1.5,e.strokeRect(1,1,126,126),ve(e,128,128,"#4a4a2c",10,i),se(t)}function R1(i){let t=ie(128,128),e=t.getContext("2d");e.fillStyle="#9a9a92",e.fillRect(0,0,128,128);let n=e.getImageData(0,0,128,128);return _e(n,i,{amp:8,base:n.data.slice()}),e.putImageData(n,0,0),e.strokeStyle="rgba(60,60,56,0.5)",e.strokeRect(0,0,128,128),e.strokeRect(64,64,64,64),Io(e,40+i()*40,30+i()*30,26,"#5c5a3e",.22,4),Io(e,90,90,18,"#666448",.16,3),se(t)}function C1(i){let t=ie(128,128),e=t.getContext("2d"),n=e.createImageData(128,128);return Qs(n,i,16,4,[92,92,94]),e.putImageData(n,0,0),ve(e,128,128,"#2f3236",30,i),Dl(e,128,128,i,10,"rgba(25,25,28,0.6)"),se(t)}function P1(i){let t=ie(128,128),e=t.getContext("2d"),n=e.createImageData(128,128);Qs(n,i,10,4,[74,78,82]),e.putImageData(n,0,0),ve(e,128,128,"#7a4a26",22,i),ve(e,128,128,"#a2622e",12,i),e.strokeStyle="rgba(200,205,210,0.2)";for(let s=0;s<10;s++){e.beginPath();let r=i()*128,o=i()*128;e.moveTo(r,o),e.lineTo(r+(i()-.5)*30,o+(i()-.5)*30),e.stroke()}return se(t)}function L1(i,t=256,e=320){let n=ie(t,e),s=n.getContext("2d");s.fillStyle="#c9bd9c",s.fillRect(0,0,t,e);let r=s.getImageData(0,0,t,e);return _e(r,i,{amp:9,base:r.data.slice()}),s.putImageData(r,0,0),ve(s,t,e,"#8a7c58",16,i),s.strokeStyle="rgba(90,80,55,0.4)",s.lineWidth=1,s.beginPath(),s.moveTo(0,e/2),s.lineTo(t,e/2),s.stroke(),se(n)}function Ll(i,t,e,n,s,r,o){let a=Pt(o);for(let l=0;l<r;l++){let c=t,h=n*(.7+a()*.3);for(;c<t+h;){let u=3+a()*4;i.fillRect(c,e+l*s,u,s*.62),c+=u+2}}}function I1(i){let t=ie(256,320),e=t.getContext("2d");e.fillStyle="#b0a892",e.fillRect(0,0,256,320);let n=e.getImageData(0,0,256,320);return _e(n,i,{amp:7,base:n.data.slice()}),e.putImageData(n,0,0),e.fillStyle="#26241e",e.fillRect(10,12,236,30),e.fillStyle="#b0a892",e.font="bold 20px serif",e.fillText("\u25EF\u25EF\u30A2\u30D1\u30FC\u30C8\u4E00\u5BB6\u5931\u8E2A",16,34),e.fillStyle="#26241e",Ll(e,12,52,160,10,6,42),e.strokeStyle="#26241e",e.lineWidth=2,e.strokeRect(178,52,66,62),e.fillStyle="#6b675a",e.fillRect(182,56,58,54),e.fillStyle="#26241e",Ll(e,12,128,232,10,14,99),Ll(e,12,280,232,10,2,131),ve(e,256,320,"#7d7460",10,i),se(t)}function D1(i){let t=ie(256,320),e=t.getContext("2d");e.fillStyle="#bdb28f",e.fillRect(0,0,256,320);let n=e.getImageData(0,0,256,320);return _e(n,i,{amp:8,base:n.data.slice()}),e.putImageData(n,0,0),e.fillStyle="#2a2620",e.font="16px serif",["\u307E\u305F\u591C\u4E2D\u306B\u7269\u97F3\u304C\u3059\u308B\u3002","3\u53F7\u5BA4\u306E\u5BB6\u65CF\u304C\u6D88\u3048\u3066\u304B\u3089\u3001","\u305A\u3063\u3068\u3060\u3002","","\u3042\u306E\u5B50\u3060\u3051\u304C\u3001\u307E\u3060","\u3053\u3053\u306B\u3044\u308B\u6C17\u304C\u3059\u308B\u3002","","\u7384\u95A2\u306E\u30C9\u30A2\u306F\u3001\u3082\u3046","\u958B\u304B\u306A\u3044\u3002"].forEach((r,o)=>{r&&e.fillText(r,24,46+o*30)}),ve(e,256,320,"#8a7c58",12,i),se(t)}function z1(i){let t=ie(256,320),e=t.getContext("2d");e.fillStyle="#c4b896",e.fillRect(0,0,256,320);let n=e.getImageData(0,0,256,320);_e(n,i,{amp:8,base:n.data.slice()}),e.putImageData(n,0,0),e.lineWidth=4;let s=(r,o,a,l)=>{e.strokeStyle=l,e.beginPath(),e.arc(r,o-a,12,0,7),e.stroke(),e.beginPath(),e.moveTo(r,o-a+12),e.lineTo(r,o),e.stroke(),e.beginPath(),e.moveTo(r,o-a+20),e.lineTo(r-16,o-a+36),e.stroke(),e.beginPath(),e.moveTo(r,o-a+20),e.lineTo(r+16,o-a+36),e.stroke(),e.beginPath(),e.moveTo(r,o-4),e.lineTo(r-12,o+22),e.stroke(),e.beginPath(),e.moveTo(r,o-4),e.lineTo(r+12,o+22),e.stroke()};s(50,120,66,"#3a3f8a"),s(96,132,56,"#8a3a3a"),s(140,124,62,"#3a7a4a"),s(186,132,40,"#8a6a3a"),e.strokeStyle="#141210",e.lineWidth=8,e.beginPath(),e.moveTo(214,30),e.lineTo(214,60),e.stroke(),e.beginPath(),e.moveTo(214,34),e.lineTo(204,58),e.stroke(),e.beginPath(),e.moveTo(214,34),e.lineTo(226,60),e.stroke(),e.beginPath(),e.moveTo(214,60),e.lineTo(214,132),e.stroke(),e.beginPath(),e.moveTo(214,132),e.lineTo(200,158),e.stroke(),e.beginPath(),e.moveTo(214,132),e.lineTo(228,158),e.stroke(),e.strokeStyle="rgba(160,20,20,0.8)",e.lineWidth=5;for(let r=0;r<14;r++)e.beginPath(),e.moveTo(i()*256,160+i()*100),e.lineTo(i()*256,160+i()*100),e.stroke();return e.fillStyle="#2a2620",e.font="15px serif",e.fillText("\u304A\u304B\u3042\u3055\u3093 \u3069\u3053\uFF1F",18,236),e.fillText("\u305B\u306E\u305F\u304B\u3044 \u304F\u308D\u3044\u3072\u3068\u304C",18,262),e.fillText("\u3088\u308B\u306B\u306A\u308B\u3068 \u307F\u3066\u308B",18,288),ve(e,256,320,"#8a7c58",8,i),se(t)}function U1(i,t=256,e=256){let n=ie(t,e),s=n.getContext("2d");s.clearRect(0,0,t,e);let r=(a,l,c)=>{s.fillStyle="#5c0e0c";for(let h=0;h<5;h++){let u=i()*Math.PI*2,d=i()*c*.7;s.beginPath(),s.ellipse(a+Math.cos(u)*d,l+Math.sin(u)*d,c*(.3+i()*.5),c*(.2+i()*.4),i()*3,0,7),s.fill()}s.beginPath(),s.ellipse(a,l,c,c*.7,i(),0,7),s.fill(),s.fillStyle="#4a0b09";for(let h=0;h<3;h++){let u=a+(i()-.5)*c*1.4;s.fillRect(u,l+c*.5,3,14+i()*30)}};for(let a=0;a<9;a++)r(i()*t,i()*e,8+i()*22);let o=se(n);return o.colorSpace=Ge,o}function k1(i){let t=ie(128,128),e=t.getContext("2d");e.clearRect(0,0,128,128),e.fillStyle="#4a0b09",e.beginPath(),e.ellipse(56,78,22,30,.25,0,7),e.fill();let n=[[30,40],[46,30],[62,26],[76,32],[88,46]];for(let[o,a]of n)e.beginPath(),e.ellipse(o,a,6.5,15,o<60?-.35:.3,0,7),e.fill();let s=e.getImageData(0,0,128,128);for(let o=0;o<2600;o++){let a=i()*128|0,l=i()*128|0;s.data[(l*128+a)*4+3]>0&&(s.data[(l*128+a)*4]+=12)}e.putImageData(s,0,0);let r=se(t);return r.colorSpace=Ge,r}function N1(i){let t=ie(128,160),e=t.getContext("2d");e.fillStyle="#8f8f8a",e.fillRect(0,0,128,160);let n=e.getImageData(0,0,128,160);_e(n,i,{amp:10,base:n.data.slice()}),e.putImageData(n,0,0);for(let s of[34,64,94])e.fillStyle="rgba(52,50,44,0.55)",e.beginPath(),e.ellipse(s,84,11,15,0,0,7),e.fill(),e.beginPath(),e.ellipse(s,118,14,20,0,0,7),e.fill();e.fillStyle="rgba(30,28,24,0.5)";for(let s of[34,64,94])e.fillRect(s-7,78,14,8);return e.fillStyle="#c9bd9c",e.beginPath(),e.moveTo(128,0),e.lineTo(112,0),e.lineTo(128,18),e.fill(),e.strokeStyle="rgba(40,36,30,0.6)",e.strokeRect(2,2,124,156),se(t)}function F1(i){let t=ie(64,64),e=t.getContext("2d");e.fillStyle="#d8d2c4",e.fillRect(0,0,64,64);let n=e.getImageData(0,0,64,64);return _e(n,i,{amp:8,base:n.data.slice()}),e.putImageData(n,0,0),e.fillStyle="#151210",e.fillRect(16,24,8,8),e.fillRect(42,24,10,10),e.fillStyle="#5c0e0c",e.fillRect(41,22,13,3),e.strokeStyle="#3a1a16",e.lineWidth=2,e.beginPath(),e.moveTo(24,48),e.quadraticCurveTo(32,52,40,48),e.stroke(),e.strokeStyle="rgba(40,36,30,0.65)",e.beginPath(),e.moveTo(0,40),e.lineTo(14,34),e.lineTo(26,38),e.lineTo(30,26),e.stroke(),se(t)}function O1(){let i=ie(64,48),t=i.getContext("2d"),e=t.createImageData(64,48);for(let s=0;s<e.data.length;s+=4){let r=Math.random()*255|0;e.data[s]=r,e.data[s+1]=r,e.data[s+2]=r,e.data[s+3]=255}let n=Math.random()*48|0;for(let s=0;s<64;s++){let r=(n*64+s)*4;e.data[r]=220,e.data[r+1]=220,e.data[r+2]=220}return t.putImageData(e,0,0),E1(i)}function B1(i){let t=ie(128,256),e=t.getContext("2d");e.fillStyle="#04070d",e.fillRect(0,0,128,256);let n=e.getImageData(0,0,128,256);return _e(n,i,{amp:5,base:n.data.slice()}),e.putImageData(n,0,0),e.fillStyle="rgba(190,205,215,0.85)",e.beginPath(),e.arc(38,52,16,0,7),e.fill(),e.fillStyle="rgba(4,7,13,0.55)",e.beginPath(),e.arc(44,48,13,0,7),e.fill(),e.fillStyle="#0a0c10",e.fillRect(0,0,6,256),e.fillRect(122,0,6,256),e.fillRect(0,0,128,6),e.fillRect(0,250,128,6),e.fillRect(0,60,128,5),e.fillRect(0,128,128,5),e.fillRect(0,196,128,5),se(t)}function H1(i){let t=ie(128,256),e=t.getContext("2d");e.clearRect(0,0,128,256);for(let n=0;n<28;n++){let s=i()*128,r=i()*256,o=24+i()*64,a=.45+i()*.2;e.strokeStyle=`rgba(210,225,235,${.05+i()*.1})`,e.lineWidth=.5+i()*.7,e.beginPath(),e.moveTo(s,r),e.lineTo(s+o*a,r+o),e.stroke(),e.strokeStyle=`rgba(12,20,30,${.03+i()*.07})`,e.lineWidth=.4+i()*.5,e.beginPath(),e.moveTo(s+1.2,r),e.lineTo(s+1.2+o*a,r+o),e.stroke()}return se(t,!1)}function G1(i){let t=ie(128,256),e=t.getContext("2d");e.fillStyle="#b7ae8f",e.fillRect(0,0,128,256);let n=e.getImageData(0,0,128,256);return _e(n,i,{amp:8,base:n.data.slice()}),e.putImageData(n,0,0),e.strokeStyle="#4a4230",e.lineWidth=4,e.strokeRect(3,3,122,250),e.lineWidth=2,e.strokeRect(12,12,104,112),e.strokeRect(12,132,104,112),e.fillStyle="rgba(40,36,26,0.6)",e.beginPath(),e.ellipse(34,240,18,12,.4,0,7),e.fill(),ve(e,128,256,"#7d745c",12,i),se(t)}function V1(){let i=ie(128,64),t=i.getContext("2d");t.fillStyle="#0a2a10",t.fillRect(0,0,128,64),t.fillStyle="#49d46a",t.font='bold 40px "Hiragino Kaku Gothic ProN", sans-serif',t.fillText("\u975E\u5E38\u53E3",14,46);let e=t.getImageData(0,0,128,64);return _e(e,Pt(7),{amp:8,base:e.data.slice()}),t.putImageData(e,0,0),se(i)}function W1(i){let t=ie(256,128),e=t.getContext("2d"),n=e.createImageData(256,128);return Qs(n,i,12,4,[128,124,112]),e.putImageData(n,0,0),ve(e,256,128,"#4a4436",20,i),e.fillStyle="#8a1410",e.font="bold 30px serif",e.save(),e.translate(18,70),e.rotate(-.03),e.fillText("\u3053\u306E\u5ECA\u4E0B\u306F\u3001\u3069\u3053\u307E\u3067",0,0),e.restore(),e.save(),e.translate(40,106),e.rotate(.02),e.fillText("\u7D9A\u304F\u306E\u304B",0,0),e.restore(),se(t)}function X1(i){let t=ie(128,128),e=t.getContext("2d");e.fillStyle="#6e3a30",e.fillRect(0,0,128,128);let n=e.getImageData(0,0,128,128);_e(n,i,{amp:12,base:n.data.slice()}),e.putImageData(n,0,0),e.fillStyle="#8a4a3a";for(let s=0;s<128;s+=32){let r=s/32%2?32:0;for(let o=-32+r;o<128;o+=64)e.fillRect(o,s,62,30)}e.strokeStyle="rgba(40,20,16,0.7)";for(let s=0;s<128;s+=32)e.fillRect(0,s,128,2);for(let s=0;s<128;s+=32){let r=s/32%2?32:0;for(let o=r;o<128;o+=64)e.fillRect(o,s,2,32)}return ve(e,128,128,"#2a1410",18,i),se(t)}function q1(){let i=ie(64,160),t=i.getContext("2d");t.fillStyle="#ddd6be",t.fillRect(0,0,64,160);let e=t.getImageData(0,0,64,160);return _e(e,Pt(11),{amp:8,base:e.data.slice()}),t.putImageData(e,0,0),t.fillStyle="#9a1420",t.fillRect(26,20,12,120),t.strokeStyle="rgba(120,90,60,0.5)",t.strokeRect(1,1,62,158),se(i)}function Y1(i){let t=ie(128,128),e=t.getContext("2d");e.fillStyle="#5a6270",e.fillRect(0,0,128,128);let n=e.getImageData(0,0,128,128);_e(n,i,{amp:10,base:n.data.slice()}),e.putImageData(n,0,0),e.strokeStyle="rgba(30,34,44,0.7)";for(let s=0;s<=4;s++)e.fillRect(s*32-1,0,2,128),e.fillRect(0,s*32-1,128,2);e.fillStyle="rgba(180,190,205,0.15)";for(let s=0;s<4;s++)for(let r=0;r<4;r++)(r+s)%2&&e.fillRect(r*32+3,s*32+3,26,26);return se(t)}function fu(i){let t=ie(64,64),e=t.getContext("2d"),n=e.createImageData(64,64);return Qs(n,i,10,4,[168,162,150]),e.putImageData(n,0,0),ve(e,64,64,"#6b5a4a",14,i),ve(e,64,64,"#8f9a92",8,i),se(t)}function Z1(i){let t=ie(128,128),e=t.getContext("2d");return e.drawImage(fu(i).image,0,0,128,128),e.fillStyle="#0c0a08",e.beginPath(),e.ellipse(40,52,13,17,.08,0,7),e.fill(),e.beginPath(),e.ellipse(88,52,13,17,-.08,0,7),e.fill(),e.fillStyle="rgba(210,205,190,0.5)",e.beginPath(),e.ellipse(42,47,3,4,0,0,7),e.fill(),e.beginPath(),e.ellipse(86,47,3,4,0,0,7),e.fill(),e.fillStyle="#120b08",e.beginPath(),e.ellipse(64,96,9,20,0,0,7),e.fill(),e.strokeStyle="rgba(60,30,24,0.8)",e.lineWidth=2,e.beginPath(),e.moveTo(52,108),e.lineTo(76,108),e.stroke(),ve(e,128,128,"#2c2018",10,i),se(t)}function J1(i){let t=ie(128,128),e=t.getContext("2d");e.fillStyle="#5a2620",e.fillRect(0,0,128,128);let n=e.getImageData(0,0,128,128);_e(n,i,{amp:10,base:n.data.slice()}),e.putImageData(n,0,0),e.strokeStyle="#2a140e",e.lineWidth=6,e.strokeRect(6,6,116,116),e.strokeStyle="rgba(190,150,110,0.3)",e.lineWidth=2,e.strokeRect(12,12,104,104),e.strokeStyle="rgba(40,20,16,0.5)",e.lineWidth=2;for(let s=24;s<108;s+=21)for(let r=24;r<108;r+=21)e.beginPath(),e.moveTo(r,s-6),e.lineTo(r+6,s),e.lineTo(r,s+6),e.lineTo(r-6,s),e.closePath(),e.stroke();return ve(e,128,128,"#1c0e0a",16,i),se(t)}function K1(i){let t=ie(128,128),e=t.getContext("2d");e.fillStyle="#14100e",e.fillRect(0,0,128,128);let n=e.getImageData(0,0,128,128);_e(n,i,{amp:8,base:n.data.slice()}),e.putImageData(n,0,0);for(let s=0;s<36;s++){let r=i()*128,o=i()*128,a=2+i()*4.5,l=i()*Math.PI;e.fillStyle="rgba(198,193,178,0.45)",e.beginPath(),e.ellipse(r,o,a*1.35,a,l,0,7),e.fill(),e.fillStyle="rgba(6,6,6,0.9)",e.beginPath(),e.ellipse(r,o,a*.55,a*.5,l,0,7),e.fill(),i()<.3&&(e.fillStyle="rgba(90,12,10,0.5)",e.fillRect(r-1,o+a,2,6+i()*12))}return ve(e,128,128,"#000000",6,i),se(t)}function du(i=!1){let t=ie(128,128),e=t.getContext("2d"),n=Pt(21);e.fillStyle="#e8e2d0",e.beginPath(),e.arc(64,64,60,0,7),e.fill();let s=e.getImageData(0,0,128,128);_e(s,n,{amp:8,base:s.data.slice()}),e.putImageData(s,0,0),e.strokeStyle="#2a2620",e.lineWidth=3,e.beginPath(),e.arc(64,64,58,0,7),e.stroke();for(let a=0;a<12;a++){let l=a/12*Math.PI*2;e.lineWidth=a%3?2:4,e.beginPath(),e.moveTo(64+Math.sin(l)*48,64-Math.cos(l)*48),e.lineTo(64+Math.sin(l)*54,64-Math.cos(l)*54),e.stroke()}let r=(2+17/60)/12*Math.PI*2+(i?-.55:0),o=17/60*Math.PI*2+(i?-1.9:0);return e.lineWidth=5,e.beginPath(),e.moveTo(64,64),e.lineTo(64+Math.sin(r)*28,64-Math.cos(r)*28),e.stroke(),e.lineWidth=3,e.beginPath(),e.moveTo(64,64),e.lineTo(64+Math.sin(o)*44,64-Math.cos(o)*44),e.stroke(),e.strokeStyle="rgba(40,36,30,0.7)",e.lineWidth=2,e.beginPath(),e.moveTo(20,90),e.lineTo(42,78),e.lineTo(58,86),e.stroke(),se(t)}function $1(i){let t=ie(128,256),e=t.getContext("2d");e.fillStyle="#c9bd9c",e.fillRect(0,0,128,256);let n=e.getImageData(0,0,128,256);_e(n,i,{amp:8,base:n.data.slice()}),e.putImageData(n,0,0),e.fillStyle="#3a2a1c",e.fillRect(0,0,128,10),e.fillRect(0,246,128,10),e.fillStyle="#1a1814";for(let s=0;s<2;s++){let r=34+s*36;e.font="bold 30px serif",e.fillText("\u25EF",r,62),e.font="26px serif",e.fillText("\u25EF",r,98),e.fillText("\u25EF",r,132),e.fillText("\u25EF",r,166),e.fillText("\u25EF",r,200)}return e.fillStyle="#a01420",e.fillRect(92,204,24,24),ve(e,128,256,"#8a7c58",10,i),se(t)}function j1(){let i=ie(128,256),t=i.getContext("2d");return t.clearRect(0,0,128,256),t.fillStyle="rgba(10,10,12,0.92)",t.beginPath(),t.ellipse(64,56,16,21,0,0,7),t.fill(),t.beginPath(),t.moveTo(40,80),t.quadraticCurveTo(64,70,88,80),t.lineTo(84,238),t.lineTo(44,238),t.closePath(),t.fill(),t.fillRect(24,94,14,122),t.fillRect(90,94,14,122),se(i,!1)}function Q1(i){let t=ie(128,96),e=t.getContext("2d");e.clearRect(0,0,128,96),e.fillStyle="rgba(178,176,166,0.85)",e.beginPath(),e.ellipse(64,50,30,38,0,0,7),e.fill(),e.fillStyle="rgba(8,8,8,0.95)",e.beginPath(),e.ellipse(50,42,8,10,0,0,7),e.fill(),e.beginPath(),e.ellipse(78,42,8,10,0,0,7),e.fill(),e.beginPath(),e.ellipse(64,74,7,12,0,0,7),e.fill();let n=e.getImageData(0,0,128,96);for(let s=0;s<3e3;s++){let r=i()*128|0,a=((i()*96|0)*128+r)*4;n.data[a+3]>0&&(n.data[a]=n.data[a]<128?240:60)}return e.putImageData(n,0,0),se(t,!1)}function tx(i){let t=ie(128,256),e=t.getContext("2d");e.fillStyle="#1c2429",e.fillRect(0,0,128,256);let n=e.getImageData(0,0,128,256);_e(n,i,{amp:7,base:n.data.slice()}),e.putImageData(n,0,0),e.strokeStyle="rgba(90,100,105,0.22)";for(let s=0;s<14;s++){e.beginPath();let r=i()*128;e.moveTo(r,0),e.lineTo(r+(i()-.5)*30,256),e.stroke()}return e.save(),e.translate(64,120),e.rotate(.06),e.fillStyle="rgba(8,10,12,0.82)",e.beginPath(),e.ellipse(0,32,20,48,0,0,7),e.fill(),e.beginPath(),e.ellipse(-2,-34,15,19,.08,0,7),e.fill(),e.fillRect(-36,-16,11,58),e.fillRect(25,-16,11,58),e.fillStyle="rgba(168,172,168,0.5)",e.beginPath(),e.ellipse(-4,-38,8,10,.08,0,7),e.fill(),e.fillStyle="rgba(200,45,52,0.75)",e.beginPath(),e.ellipse(-7,-39,2.2,1.6,0,0,7),e.fill(),e.beginPath(),e.ellipse(0,-40,2.2,1.6,0,0,7),e.fill(),e.restore(),e.strokeStyle="rgba(220,228,232,0.5)",e.beginPath(),e.moveTo(20,20),e.lineTo(48,90),e.lineTo(44,120),e.lineTo(70,190),e.stroke(),ve(e,128,256,"#0a0e10",12,i),se(t)}function ex(i){let t=ie(128,128),e=t.getContext("2d");e.fillStyle="#767b74",e.fillRect(0,0,128,128);for(let s=0;s<4;s++)for(let r=0;r<4;r++){let o=114+(i()-.5)*22|0;e.fillStyle=`rgb(${o},${o+3},${o-2})`,e.fillRect(r*32+2,s*32+2,28,28);for(let a=0;a<4;a++)e.fillStyle=`rgba(40,44,40,${.04+a*.045})`,e.fillRect(r*32+2,s*32+2+a*7,28,7);e.fillStyle="rgba(255,255,255,0.035)",e.fillRect(r*32+2,s*32+2,28,4),i()<.12&&(e.fillStyle="rgba(52,50,44,0.8)",e.fillRect(r*32+2,s*32+2,28,28),e.strokeStyle="rgba(20,18,14,0.5)",e.beginPath(),e.moveTo(r*32+6,s*32+8),e.lineTo(r*32+22,s*32+24),e.stroke())}ve(e,128,128,"#3d443c",22,i),ve(e,128,128,"#2c3a30",8,i);let n=e.getImageData(0,0,128,128);return _e(n,i,{amp:6,base:n.data.slice()}),e.putImageData(n,0,0),se(t)}function nx(i){let t=ie(256,128),e=t.getContext("2d");e.fillStyle="#4a4e52",e.fillRect(0,0,256,128);let n=e.getImageData(0,0,256,128);_e(n,i,{amp:8,base:n.data.slice()}),e.putImageData(n,0,0);for(let s=0;s<2;s++)for(let r=0;r<4;r++){let o=10+r*62,a=8+s*60;e.fillStyle="#6a7076",e.fillRect(o,a,54,48),e.strokeStyle="rgba(20,22,24,0.8)",e.lineWidth=2,e.strokeRect(o,a,54,48);for(let l=0;l<4;l++)Io(e,o+i()*54,a+i()*48,3+i()*5,"#7a4a26",.25,2);e.fillStyle="#c9bd9c",e.fillRect(o+6,a+26,40,12),e.fillStyle="rgba(40,36,30,0.85)",s===0&&r===2?(e.filter="blur(2px)",e.fillRect(o+9,a+29,34,6),e.filter="none"):e.fillRect(o+9,a+29,34,6),e.fillStyle="#1e2022",e.font="bold 11px sans-serif",e.fillText(String(s*4+r+1),o+44,a+14),e.fillStyle="#141618",e.beginPath(),e.arc(o+27,a+42,2.5,0,7),e.fill()}return se(t)}function ix(i){let t=ie(64,256),e=t.getContext("2d");e.clearRect(0,0,64,256),e.fillStyle="rgba(214,206,186,0.9)",e.fillRect(6,0,52,256);let n=e.getImageData(0,0,64,256);_e(n,i,{amp:7,base:n.data.slice()}),e.putImageData(n,0,0),e.fillStyle="rgba(40,36,30,0.75)",e.font="9px serif";for(let s=16;s<248;s+=20)e.fillRect(20,s,24,1),e.fillText(String(210-(s-16)/20*10),7,s+3);return e.fillStyle="rgba(140,20,16,0.8)",e.font="10px serif",e.fillText("\u30D2\u30ED",44,92),e.fillRect(26,84,18,1),e.fillText("\u30CA\u30AA",44,120),e.fillRect(26,112,18,1),e.fillStyle="rgba(60,20,16,0.9)",e.fillText("\u30DF\u30C4\u30B3",38,200),e.fillRect(26,192,18,1),e.fillStyle="rgba(90,12,10,0.7)",e.fillRect(26,188,18,3),se(t,!1)}function pu(){let i={};return i.plaster=w1(Pt(101)),i.wallpaper=S1(Pt(102)),i.woodDoor=T1(Pt(103)),i.woodFloor=Il(Pt(104),128,128,[84,64,44],!0),i.woodWall=Il(Pt(105),128,128,[74,56,38],!0),i.tatami=A1(Pt(106)),i.ceiling=R1(Pt(107)),i.concrete=C1(Pt(108)),i.rust=P1(Pt(109)),i.paper=L1(Pt(110)),i.news=I1(Pt(111)),i.journal=D1(Pt(112)),i.drawing=z1(Pt(113)),i.blood=U1(Pt(114)),i.handprint=k1(Pt(115)),i.photo=N1(Pt(116)),i.dollFace=F1(Pt(117)),i.tvStatic=O1(),i.windowMoon=B1(Pt(118)),i.fusuma=G1(Pt(119)),i.exitSign=V1(),i.graffiti=W1(Pt(120)),i.brick=X1(Pt(121)),i.ofuda=q1(),i.quilt=Y1(Pt(122)),i.skin=fu(Pt(123)),i.face=Z1(Pt(124)),i.rug=J1(Pt(125)),i.eyesWall=K1(Pt(126)),i.clock=du(),i.scroll=$1(Pt(127)),i.silhouette=j1(),i.tvFace=Q1(Pt(128)),i.mirror=tx(Pt(129)),i.growth=ix(Pt(130)),i.tile=ex(Pt(131)),i.mailbox=nx(Pt(132)),i.rainStreaks=H1(Pt(133)),i.clockBack=du(!0),i}function mu(i){let t=i.image.getContext("2d"),e=t.createImageData(64,48);for(let s=0;s<e.data.length;s+=4){let r=Math.random()*255|0;e.data[s]=r,e.data[s+1]=r,e.data[s+2]=r,e.data[s+3]=255}let n=Math.random()*48|0;for(let s=0;s<64;s++){let r=(n*64+s)*4;e.data[r]=235,e.data[r+1]=235,e.data[r+2]=235}t.putImageData(e,0,0),i.needsUpdate=!0}function bn(i,t,e,n){let s=Math.cos(i.rotation),r=Math.sin(i.rotation);return new L(i.x+s*t+r*e,n,i.z-r*t+s*e)}function sx(i,t=0,e=1){let n=i.base+t*i.rise,s=(i.width+i.gap)/2,r=[bn(i,0,-1.25,n),bn(i,-s,-.5,n)];for(let o=0;o<i.steps;o++)r.push(bn(i,-s,(o+.5)*i.going,n+(o+1)*i.riser));for(let o of[-s,0,s])r.push(bn(i,o,i.run+i.landingDepth/2,n+i.rise/2));for(let o=0;o<i.steps;o++)r.push(bn(i,s,i.run-(o+.5)*i.going,n+i.rise/2+(o+1)*i.riser));return r.push(bn(i,s,-.5,n+i.rise),bn(i,0,-1.25,n+i.rise)),e>0?r:r.reverse()}function gu(i,t,e){let n=Math.sign(e.y-t.y);if(Math.abs(e.y-t.y)<.15)return null;let s=i.some(m=>{let y=(e.y-m.base)/m.rise;return y>=-.04&&y<=m.storeys+.04&&Math.abs(y-Math.round(y))<.04}),r=i.some(m=>{let y=e.x-m.x,p=e.z-m.z,g=Math.cos(m.rotation),_=Math.sin(m.rotation),x=y*g-p*_,b=y*_+p*g;return Math.abs(x)<m.width+m.gap/2+.3&&b>=-m.frontDepth-.3&&b<=m.run+m.landingDepth+.3&&e.y>=m.base-.2&&e.y<=m.base+m.storeys*m.rise+.2});if(!s&&!r)return null;let o=i.filter(m=>t.y>=m.base-.2&&t.y<=m.base+m.storeys*m.rise+.2&&(n>0?t.y<m.base+m.storeys*m.rise-.15:t.y>m.base+.15));o.sort((m,y)=>m.entry.distanceToSquared(t)-y.entry.distanceToSquared(t));let a=o[0];if(!a)return null;let l=Math.max(a.base,Math.min(a.base+a.storeys*a.rise,e.y)),c=a.path,h=0,u=1/0;for(let m=0;m<c.length-1;m++){let y=c[m],p=c[m+1],g=p.x-y.x,_=p.z-y.z,x=(p.y-y.y)*4,b=g*g+_*_+x*x;if(b<1e-8)continue;let T=Math.max(0,Math.min(1,((t.x-y.x)*g+(t.z-y.z)*_+(t.y-y.y)*4*x)/b)),E=(t.x-y.x-T*g)**2+(t.z-y.z-T*_)**2+((t.y-y.y)*4-T*x)**2;(E<u-1e-7||Math.abs(E-u)<1e-7&&n>0)&&(u=E,h=m)}let d=n>0?h+1:h;for(;d+n>=0&&d+n<c.length&&Math.hypot(t.x-c[d].x,t.z-c[d].z)<.38&&Math.abs(t.y-c[d].y)<.45;)d+=n;let f=c[d];return Math.abs(t.y-l)<.1?null:f}function zl(i,t={}){var _;let e={x:0,z:64.2,base:0,rise:2.8,storeys:2,steps:8,width:1.65,gap:.35,going:.3,landingDepth:1.65,frontDepth:2.5,rotation:0,...t};e.run=e.steps*e.going,e.riser=e.rise/(e.steps*2);let n=e.width*2+e.gap+.3,s=(e.width+e.gap)/2;e.entry=bn(e,0,-1.25,e.base),e.path=Array.from({length:e.storeys},(x,b)=>sx(e,b)).flat(),i.stairs.push(e);let r=new Ot;r.name="switchback-stair",r.position.set(e.x,0,e.z),r.rotation.y=e.rotation,r.userData.stair=e,i.scene.add(r);let o=((_=i.detailMaterials)==null?void 0:_.concrete)||i.materials.concrete,a=new we({color:5662043,roughness:.74,metalness:.18}),l=new we({color:3156516,roughness:.5,metalness:.12}),c=new we({color:9271120,roughness:.66,metalness:.45}),h=(x,b,T,E,M)=>{let I=new Y(x,b);return I.position.set(T,E,M),r.add(I),I},u=(x,b,T,E,M,I,w)=>{let S=bn(e,x,b,T),R=Math.abs(Math.sin(e.rotation))>.5,U=(R?M:E)/2,B=(R?E:M)/2,D={x0:S.x-U,x1:S.x+U,z0:S.z-B,z1:S.z+B,y0:T,y1:T+I,stairPart:w,walkable:["tread","floor-landing","half-landing"].includes(w)};return i.colliders.push(D),D},d=(x,b,T,E)=>{let M=h(new ee(n,.2,T),o,0,b-.1,x);M.userData.collider=u(0,x,b-.2,n,T,.2,E)},f=(x,b,T,E=a)=>{let M=b.clone().sub(x),I=h(new bt(T,T,M.length(),12),E,0,0,0);return I.position.copy(x.clone().add(b).multiplyScalar(.5)),I.quaternion.setFromUnitVectors(new L(0,1,0),M.normalize()),I},m=(x,b,T)=>{h(new ee(.12,.018,.12),a,x,T+.009,b);for(let E of[-.037,.037])for(let M of[-.037,.037])h(new bt(.009,.009,.012,6),c,x+E,T+.022,b+M)},y=(x,b,T,E,M,I=null)=>{for(let S of[.52,1.02])f(new L(x,E+S,b),new L(x,M+S,T),S>.8?.032:.014,S>.8?l:a);let w=Math.ceil((T-b)/.32);for(let S=0;S<=w;S++){let R=S/w,U=b+(T-b)*R,B=E+(M-E)*R,D=I?I(U):B;f(new L(x,D+.025,U),new L(x,B+1.01,U),.013),(S%3===0||S===w)&&m(x,U,D)}u(x,(b+T)/2,Math.min(E,M),.085,T-b,Math.abs(M-E)+1.08,"guard")},p=(x,b)=>{f(new L(-n/2,b+1.02,x),new L(n/2,b+1.02,x),.032,l),f(new L(-n/2,b+.52,x),new L(n/2,b+.52,x),.014);for(let T=-n/2;T<=n/2+.01;T+=.3)f(new L(T,b+.02,x),new L(T,b+1.02,x),.013),m(T,x,b);u(0,x,b,n,.085,1.08,"guard")};for(let x of[-.22,e.run+e.landingDepth-.16]){let b=x<0?e.storeys*e.rise:(e.storeys-.5)*e.rise;for(let E of[-n/2,n/2]){let M=h(new ee(.22,b,.28),o,E,e.base+b/2,x);M.userData.collider=u(E,x,e.base,.22,.28,b,"column")}let T=x<0?e.storeys:e.storeys-1;for(let E=0;E<=T;E++){let M=x<0?e.base+E*e.rise:e.base+(E+.5)*e.rise;h(new ee(n+.22,.35,.28),o,0,M-.175,x)}}let g=(x,b,T)=>{let E=new Ti;E.moveTo(0,-.22),E.lineTo(0,e.riser);for(let I=0;I<e.steps;I++)E.lineTo((I+1)*e.going,(I+1)*e.riser),I<e.steps-1&&E.lineTo((I+1)*e.going,(I+2)*e.riser);E.lineTo(e.run,e.rise/2-.22),E.lineTo(0,-.22);let M=new us(E,{depth:e.width,bevelEnabled:!1,steps:1});M.rotateY(T>0?-Math.PI/2:Math.PI/2),h(M,o,x+T*e.width/2,b,T>0?0:e.run);for(let I=0;I<e.steps;I++){let w=T>0?(I+.5)*e.going:e.run-(I+.5)*e.going,S=b+(I+1)*e.riser;u(x,w,S-.24,e.width,e.going+.008,.24,"tread");let R=w-T*(e.going/2-.027);h(new ee(e.width-.06,.008,.043),c,x,S+.004,R);for(let B of[-.011,0,.011])h(new ee(e.width-.09,.0015,.003),l,x,S+.009,R+B);let U=bn(e,x,w,S);i.monsterNodes.push({...U})}for(let I of[-1,1]){let w=x+I*(e.width/2-.075),S=T>0?b+e.riser:b+e.rise/2,R=T>0?b+e.rise/2:b+e.riser;y(w,.05,e.run-.05,S,R,U=>{let B=T>0?U:e.run-U,D=Math.min(e.steps-1,Math.floor(B/e.going));return b+(D+1)*e.riser})}};for(let x=0;x<=e.storeys;x++){let b=e.base+x*e.rise;if(d(-e.frontDepth/2,b,e.frontDepth,"floor-landing"),x>0){let T=x===e.storeys&&e.roofOpenDepth?-(e.frontDepth-e.roofOpenDepth):-e.frontDepth;for(let E of[-n/2,n/2])y(E,T,-.03,b,b)}i.monsterNodes.push({...bn(e,0,-1.25,b)})}for(let x=0;x<e.storeys;x++){let b=e.base+x*e.rise;g(-s,b,1),g(s,b+e.rise/2,-1);let T=b+e.rise/2;d(e.run+e.landingDepth/2,T,e.landingDepth,"half-landing"),p(e.run+e.landingDepth-.04,T);for(let E of[-n/2,n/2])y(E,e.run,e.run+e.landingDepth-.04,T,T);for(let E of[-s,0,s])i.monsterNodes.push({...bn(e,E,e.run+e.landingDepth/2,T)})}return e}var xu=[{name:"\u96E8\u591C\u6742\u8D27\u5E97",floor:0,bounds:[-24,-37,-10,-17]},{name:"\u8857\u533A\u536B\u751F\u7AD9",floor:0,bounds:[10,-37,24,-17]},{name:"\u793E\u533A\u96E8\u68DA\u8FDE\u5ECA",floor:0,bounds:[-24,-45,24,-37]},{name:"\u56DE\u58F0\u793E\u533A\u4E2D\u5EAD",floor:0,bounds:[-24,-45,24,-9]}];function yu(i,t){let{box:e,mesh:n,cylinder:s,sign:r,lamp:o,desk:a,chair:l,shelf:c,closet:h,recordDocument:u}=t,d=i.materials,f=i.detailMaterials,m=i.campaign,y=nt({color:5397850,roughness:.87}),p=nt({color:3561038,roughness:.72,metalness:.15}),g=nt({color:11971985,roughness:.81}),_=nt({color:8876866,roughness:.83}),x=nt({color:1453104,roughness:.22,metalness:.32});i.floor(0,-13,48.2,7.8,0,y,[16,3]),i.floor(0,-27,19.8,20.2,0,y,[7,7]),i.floor(0,-41.1,48.2,8,0,y,[16,3]),i.wallZ(-9,-24,-.8,0,3.2,d.concrete),i.wallZ(-9,.8,24,0,3.2,d.concrete),i.wallZ(-45,-24,24,0,3.2,d.concrete),i.wallX(-24,-45,-9,0,3.2,d.concrete),i.wallX(24,-45,-9,0,3.2,d.concrete),e(0,-8.96,3.2,48,.22,8.4,d.concrete,!0);for(let T of[3.2,6,8.8,11.5])e(0,-9.14,T,48,.5,.13,y);for(let T of[-21,-15,-9,-3,3,9,15,21])for(let E of[4.5,7.3,10.1]){e(T,-9.105,E-.62,1.75,.035,1.4,x);for(let M of[-.9,0,.9])e(T+M,-9.16,E-.65,.05,.06,1.48,f.iron);for(let M of[-.65,.78])e(T,-9.16,E+M,1.85,.09,.05,f.iron);e(T,-9.24,E-.69,2,.34,.09,y)}i.room(-24,-10,-37,-17,{h:3,w:!1,wallMat:d.plaster,floorMat:d.tile,gaps:{e:[[-22,-20],[-34,-32]],n:[[-19,-17]]}}),i.room(10,24,-37,-17,{h:3,e:!1,wallMat:d.plaster,floorMat:d.tile,gaps:{w:[[-22,-20],[-34,-32]],n:[[17,19]]}}),i.ceil(0,-41,48,8,3.2,d.concrete);for(let T of[-9,0,9])for(let E of[-38,-44])e(T,E,0,.22,.22,3.2,p,!0),e(T,E,.02,.42,.42,.1,y,!0);for(let T of[-38,-44])e(0,T,3.04,48,.26,.16,p);for(let[T,E,M,I]of[[-10,-22,"z","\u6742\u8D27\u5E97\u524D\u95E8"],[-10,-34,"z","\u6742\u8D27\u5E97\u4FA7\u95E8"],[10,-22,"z","\u536B\u751F\u7AD9\u524D\u95E8"],[10,-34,"z","\u536B\u751F\u7AD9\u4FA7\u95E8"],[-19,-37,"x","\u6742\u8D27\u5E97\u540E\u95E8"],[17,-37,"x","\u536B\u751F\u7AD9\u540E\u95E8"]])i.makeDoor({x:T,z:E,along:M,width:2,dir:1,label:I,mat:p});r(-9.87,-26,2.05,"\u96E8\u591C\u6742\u8D27",["\u9762\u5305 / \u7535\u8BDD / \u5931\u7269\u62DB\u9886"],"e",2,!0),r(9.87,-26,2.05,"\u793E\u533A\u536B\u751F\u7AD9",["\u591C\u95F4\u6025\u6551\u8054\u7EDC\u5904"],"w",2,!0),r(0,-44.87,1.8,"\u56DE\u58F0\u793E\u533A",["\u516C\u5BD3 \u2191  \u536B\u751F\u7AD9 \u2192","\u2190 \u6742\u8D27\u5E97  /  \u96E8\u68DA\u901A\u9053"],"n",2.8,!0),r(-4,-9.13,1.9,"\u56DE\u58F0\u516C\u5BD3",["\u5907\u7528\u7535\u6E90\u6062\u590D\u540E\u53EF\u901A\u884C"],"s",1.8,!0),e(0,-44.82,0,3,.12,2.65,p,!0);for(let T of[-1.4,1.4])e(T,-44.66,.1,.12,.22,2.7,f.iron,!0);r(0,-44.68,1.6,"\u9053\u8DEF\u6C89\u964D",["\u901A\u5F80\u5929\u4E95\u7684\u6551\u63F4\u7EBF\u4ECD\u53EF\u4F7F\u7528"],"n",1.7),e(0,-28,0,5.6,7,.43,y,!0),e(0,-28,.43,5.1,6.5,.08,d.darkWood),e(0,-28,.51,1.4,.45,1.9,y,!0),r(0,-27.76,1.6,"\u8FC1\u5C45\u7EAA\u5FF5",["\u5171\u5341\u4E8C\u6237 / \u56DB\u5341\u4E00\u4EBA","\u6700\u540E\u4E00\u884C\u88AB\u53CD\u590D\u64E6\u8FC7"],"n",1.2);for(let T of[-2,2])for(let E of[-30,-26]){s(T,.82,E,.045,1.05,f.wood);for(let M of[-.45,.45]){let I=s(T+M*.3,1.2,E,.021,.65,f.wood);I.rotation.z=M}}for(let T of[-8,8])for(let E=-42;E<-10;E+=4){e(T,E,.004,.45,1.5,.012,f.iron);for(let M=0;M<7;M++)e(T,E-.6+M*.2,.017,.34,.045,.004,d.black)}for(let T of[-6,6])for(let E of[-15,-36])o(T,E,2.85,13741171,2.4,!1,{pole:0}),e(T-.48,E,0,.28,.28,.08,y,!0);a(-18,-21,0,4),u(25,-18,-21,.803,"\u672A\u53D6\u8D70\u7684\u9762\u5305\u8BA2\u5355"),c(-22.7,-26,0,1.65),c(-22.7,-31,0,1.65);for(let T of[-25,-29,-33]){e(-15,T,.75,2,.75,.075,f.wood,!0);for(let E of[-15.8,-14.2])e(E,T,0,.07,.65,.75,f.wood);for(let E=0;E<4;E++){let M=s(-15.65+E*.42,.94,T,.13,.29,E%2?g:_);s(M.position.x,1.09,T,.133,.02,f.iron)}}h(-22.8,-35.7,0),o(-18,-27,2.78,12755308,2.5),i._battery(-18,-20.8,.86),e(-12,-18.1,.9,1.3,.55,.065,f.wood,!0),e(-12,-18.1,.97,.36,.26,.12,p),s(-12,1.12,-18.08,.036,.4,d.black,"x");for(let T of[-12.16,-11.84])s(T,1.09,-18.08,.065,.09,d.black);for(let T=0;T<3;T++)for(let E=0;E<3;E++)e(-12.07+E*.07,-18.18+T*.05,1.091,.043,.032,.01,g);u(26,-12.45,-18.1,.971,"\u516C\u7528\u7535\u8BDD\u901A\u8BDD\u5E95\u5355");for(let T of[-12.5,-11.5])e(T,-18.1,0,.055,.4,.9,f.wood);a(18,-20,0,3.5),l(18,-21.3,0),u(27,18,-20,.803,"\u6551\u63F4\u63A5\u7EBF\u8BB0\u5F55"),r(18,-17.13,1.8,"\u8BF7\u5148\u547C\u53EB",["\u6551\u63F4\u9891\u9053 14.07","\u56DE\u5E94\u4EE5\u524D\uFF0C\u8BF7\u4E0D\u8981\u6302\u65AD"],"s",1.6);for(let T of[-27,-32]){e(19,T,.62,3,1.1,.13,f.iron,!0),e(19,T,.75,2.9,1,.15,g,!0),e(20,T,.9,.7,.92,.12,d.wallpaper);for(let E of[17.7,20.3])for(let M of[-.4,.4])s(E,.32,T+M,.035,.64,f.iron);for(let E of[17.55,20.45])e(E,T,.68,.055,1.05,.55,f.iron)}e(15,-29,0,.12,5,1.85,p,!0),e(15,-29,1.85,.18,5.2,.08,f.iron),h(22.9,-35.7,0),c(22.8,-24,0,1.3),o(18,-26,2.78,9550256,2.5),m.communityBeacon=o(0,-39,2.85,7576496,0,!1,{pole:0}),m.communityBeacon.base=3;let b=n(new oe(1.4,.7),new Ze({color:2634543}),0,1.7,-39);e(0,-39.04,.02,1.5,.12,2,p,!0),m.communityPlaque=b;for(let[T,E]of[[0,-12],[-6,-20],[-6,-34],[0,-41],[6,-34],[6,-20],[-18,-22],[-18,-34],[18,-22],[18,-34]])i.monsterNodes.push({x:T,y:0,z:E})}var kl=[{name:"\u897F\u7FFC\u5C01\u95ED\u8D70\u5ECA",floor:1,bounds:[-30,54,-1,58]},{name:"\u7EA2\u706F\u6697\u623F",floor:1,bounds:[-30,40,-21,54]},{name:"204 \u6444\u5F71\u5E08\u65E7\u5C45",floor:1,bounds:[-21,40,-10,54]},{name:"\u4F4F\u6237\u7EAA\u5FF5\u5BA4",floor:1,bounds:[-30,28,-10,40]}],Ul=new Map;function tr(i=0){if(Ul.has(i))return Ul.get(i);let t=document.createElement("canvas");t.width=512,t.height=384;let e=t.getContext("2d"),n=Pt(714+i);e.fillStyle="#c9bea7",e.fillRect(0,0,512,384),e.save(),e.beginPath(),e.rect(22,22,468,300),e.clip(),e.fillStyle="#595953",e.fillRect(22,22,468,300),e.fillStyle="#7d7c6c",e.fillRect(22,185,468,137);for(let a=0;a<6;a++){e.fillStyle=a%2?"#676a62":"#878477",e.fillRect(30+a*82,60+a*9,65,160),e.fillStyle="#343e3c";for(let l=0;l<3;l++)e.fillRect(40+a*82,78+a*9+l*35,20,20)}e.strokeStyle="#b6b2a0",e.lineWidth=2,e.beginPath(),e.moveTo(32,100),e.lineTo(475,130),e.stroke();for(let a=0;a<3;a++)e.fillStyle="#c4beab",e.fillRect(50+a*54,108,42,68);let s=[[230,161,75],[291,158,80],[352,205,43],[397,224,31]];for(let[a,l,c]of s)e.fillStyle="#beb7a3",e.beginPath(),e.ellipse(a,l,c*.16,c*.22,0,0,7),e.fill(),e.fillStyle="#2e3431",e.beginPath(),e.ellipse(a,l-c*.1,c*.17,c*.14,-.08,Math.PI,7),e.fill(),e.fillStyle=i===1?"#6d6960":"#414943",e.beginPath(),e.moveTo(a-c*.23,l+c*.24),e.lineTo(a+c*.2,l+c*.24),e.lineTo(a+c*.29,l+c),e.lineTo(a-c*.3,l+c),e.closePath(),e.fill(),e.strokeStyle="#343b37",e.lineWidth=c*.12,e.beginPath(),e.moveTo(a-c*.12,l+c),e.lineTo(a-c*.14,l+c*1.55),e.moveTo(a+c*.12,l+c),e.lineTo(a+c*.16,l+c*1.55),e.stroke();if(e.strokeStyle="#aca28e",e.lineWidth=6,e.beginPath(),e.moveTo(364,234),e.lineTo(389,239),e.stroke(),i===0){e.strokeStyle="#343b37",e.lineWidth=8,e.beginPath(),e.moveTo(216,185),e.lineTo(189,152),e.stroke(),e.fillStyle="#82755b",e.fillRect(273,210,39,23),e.strokeStyle="#b6a384",e.lineWidth=2;for(let a=0;a<5;a++)e.beginPath(),e.moveTo(276+a*8,210),e.lineTo(276+a*8,233),e.stroke()}let r=e.getImageData(22,22,468,300);for(let a=0;a<r.data.length;a+=4){let l=(n()-.5)*23;for(let c=0;c<3;c++)r.data[a+c]+=l}e.putImageData(r,22,22),e.strokeStyle="#d9d1b05a",e.lineWidth=1;for(let a=0;a<10;a++){let l=25+n()*460;e.beginPath(),e.moveTo(l,23),e.lineTo(l+4,320),e.stroke()}e.restore(),e.fillStyle="#534d41",e.font='18px "Songti SC", serif',e.fillText(i===0?"\u4E09\u53F7\u5BA4 \xB7 \u4E03\u6708\u5341\u4E09\u65E5 / \u4E00\u4E2A\u4E5F\u4E0D\u80FD\u5C11":"\u56DE\u58F0\u516C\u5BD3 \xB7 \u6700\u540E\u4E00\u4E2A\u590F\u5929",30,355);let o=new yn(t);return o.colorSpace=ye,o.minFilter=An,o.anisotropy=8,Ul.set(i,o),o}function _u(i,t){let{box:e,mesh:n,cylinder:s,sign:r,lamp:o,desk:a,chair:l,shelf:c,closet:h,recordDocument:u,pickup:d}=t,f=i.materials,m=i.detailMaterials,y=i.campaign,p=2.8,g=5.2,_=nt({color:6892322,roughness:.7}),x=nt({color:1448987,roughness:.7,metalness:.25}),b=nt({color:9606539,roughness:.34,metalness:.75}),T=nt({map:tr(),roughness:.68}),E=nt({map:tr(1),roughness:.8});i.room(-30,-1,54,58,{y:p,h:2.4,e:!1,floorMat:f.tile,wallMat:f.plaster,gaps:{n:[[-26.5,-25],[-16.5,-15]]}}),i.room(-30,-21,40,54,{y:p,h:2.4,s:!1,floorMat:f.tile,wallMat:f.concrete}),i.room(-21,-10,40,54,{y:p,h:2.4,s:!1,w:!1,floorMat:f.woodFloor,gaps:{n:[[-16.5,-15]]}}),i.room(-30,-10,28,40,{y:p,h:2.4,s:!1,floorMat:f.woodFloor,wallMat:f.plaster}),y.doors.west=i.makeDoor({x:-1,z:55,y:p,width:1.6,dir:-1,offset:.11,label:"\u897F\u7FFC\u5C01\u95ED\u95E8",mat:m.paint,locked:!0,lockedMsg:"\u94A5\u5319\u85CF\u5728\u513F\u7AE5\u623F\u516B\u97F3\u76D2\u7684\u5939\u5C42\u91CC\u3002"}),i.makeDoor({x:-26.5,z:54,y:p,along:"x",width:1.5,dir:1,label:"\u7EA2\u706F\u6697\u623F",mat:m.paint}),i.makeDoor({x:-16.5,z:54,y:p,along:"x",width:1.5,dir:1,label:"204 \u6444\u5F71\u5E08\u65E7\u5C45"}),i.makeDoor({x:-16.5,z:40,y:p,along:"x",width:1.5,dir:1,label:"\u4F4F\u6237\u7EAA\u5FF5\u5BA4"}),r(-.87,54.4,4.45,"\u897F\u7FFC",["204 / \u6697\u623F"],"e",.55,!0),r(-25.75,54.13,4.4,"\u6697\u623F",["\u7D05\u71C8 / DARKROOM"],"n",.7,!0),r(-15.75,54.13,4.4,"204",[],"n",.48,!0),r(-15.75,40.13,4.4,"\u4F4F\u6237\u7EAA\u5FF5\u5BA4",[],"n",1.1,!0);for(let tt of[-4.5,-12,-21,-28])o(tt,56,5.03,11056032,2.6,!0);for(let tt of[54.13,57.87])i._baseboardX(tt,-29.8,-1.2,p,tt<55?[[-26.5,-25],[-16.5,-15]]:[]);i._baseboard(-29.87,54,58,p);for(let tt=0;tt<5;tt++){let G=-7-tt*4.5;i.decalWall(G,57.87,4.3,1,.75,tr(tt%2),"s"),e(G,57.9,3.9,1.1,.045,.045,f.darkWood)}r(-29.86,56,4.25,"1998",["\u6CA1\u6709\u4EBA\u642C\u8D70","\u53EA\u662F\u505C\u6B62\u56DE\u5BB6"],"e",1.4),a(-13.7,43.1,p,2.8),l(-13.7,44.3,p);let M=e(-13.9,43.1,3.6,.4,.25,.23,x);s(-13.9,3.73,43.29,.092,.22,b,"z"),s(-13.9,3.73,43.415,.072,.03,m.darkGlass,"z"),e(-13.78,43.07,3.84,.07,.06,.04,b),e(-14.02,43.06,3.83,.14,.09,.09,x);let I=n(new tn(.26,.011,6,24,Math.PI),m.rubber,-13.9,3.6,43.1);I.rotation.x=Math.PI/2,i.regInteractable(M,"\u67E5\u770B\u6444\u5F71\u5E08\u7684\u76F8\u673A",2.5,()=>{var tt,G;return(G=(tt=i.handlers).onDocument)==null?void 0:G.call(tt,16)}),u(16,-12.8,43.1,3.601,"204 \u6444\u5F71\u5E08\u7684\u65E5\u8BB0");let w=new Ot;w.position.set(-14.5,3.65,43.1);let S=new Y(new bt(.06,.06,.13,20),x);w.add(S);let R=new Y(new bt(.061,.061,.067,20),m.enamel);w.add(R);let U=new Y(new oe(.08,.26),nt({color:6508080,side:ue}));U.rotation.x=-Math.PI/2,U.position.set(.04,-.02,.12),w.add(U),i.scene.add(w),d("film",w,"\u53D6\u8D70\u4E03\u6708\u5341\u4E09\u65E5\u7684\u5E95\u7247"),c(-19.8,43,p,1.6),h(-19.4,52.8,p),e(-19,48.5,p,1.8,2.8,.25,f.darkWood,!0),e(-19,48.5,3.05,1.7,2.7,.16,f.quilt),e(-19,47.6,3.21,1,.5,.11,f.pale),i._window(-10.14,48,4.22,"w",{w:1.8,h:1.2}),o(-15.5,47.2,5.03,12888441,2.5,!0);for(let tt=0;tt<4;tt++)i.decalWall(-20.86,45+tt*1.6,4.15,.75,.55,tr(tt%2),"e");a(-25.4,42.4,p,6.3);let B=[];for(let tt=0;tt<4;tt++){let G=-27.7+tt*1.5,rt=e(G,42.4,3.61,1.12,.68,.035,m.enamel);for(let gt of[-.56,.56])e(G+gt,42.4,3.61,.035,.71,.11,m.enamel);for(let gt of[-.34,.34])e(G,42.4+gt,3.61,1.15,.035,.11,m.enamel);let pt=n(new oe(1.04,.61),nt({color:tt===3?4282457:5327925,roughness:.25,metalness:.15}),G,3.659,42.4);pt.rotation.x=-Math.PI/2,r(G,40.13,4.35,["\u663E\u5F71","\u5B9A\u5F71","\u505C\u663E","\u6C34\u6D17"][tt],[],"n",.7,!0),i.regInteractable(rt,"\u51B2\u6D17\u5168\u5BB6\u798F\u5E95\u7247",2.7,()=>{var gt,wt;return(wt=(gt=i.handlers).onPuzzle)==null?void 0:wt.call(gt,"develop")}),B.push(pt)}y.photo=n(new oe(.32,.24),T,-23.2,3.67,42.4),y.photo.rotation.x=-Math.PI/2,y.photo.visible=!1,i.regInteractable(y.photo,"\u67E5\u770B\u6D17\u51FA\u7684\u5168\u5BB6\u798F",2.6,()=>{var tt,G;return(G=(tt=i.handlers).onDocument)==null?void 0:G.call(tt,14)}),a(-28.5,48.5,p,1.6),e(-28.5,48.5,3.61,.72,.6,.08,x),s(-28.5,4.12,48.7,.035,1.05,b),e(-28.5,48.48,4.48,.43,.44,.21,x),s(-28.5,4.43,48.48,.09,.15,b),u(13,-28.1,48.5,3.604,"\u6697\u623F\u51B2\u6D17\u89C4\u7A0B"),c(-22,51,p,1.2);for(let tt=0;tt<8;tt++){s(-29+tt*.85,4.68,40.9,.011,.2,b);let G=n(new oe(.5,.36),E,-29+tt*.85,4.42,40.9);y.dynamics.push({mesh:G,kind:"print",phase:tt}),i.props.campaignDynamic.attach(G)}s(-25.8,4.79,40.9,.012,6.6,b,"x"),o(-25.7,45.8,5.03,12993580,3.7,!0),o(-28.8,51.6,5.03,11355698,1.8,!0),r(-29.86,46,4.26,"\u6697\u623F",["\u53EA\u5F00\u7EA2\u706F","\u7167\u7247\u4F1A\u66FF\u4F60\u8BB0\u5F97"],"e",1.4,!0);for(let tt=0;tt<6;tt++){let G=-28+tt*3;e(G,28.15,3.79,1.38,.05,1.05,f.darkWood),i.decalWall(G,28.19,4.32,1.22,.91,tr(tt%2),"n")}for(let tt of[-26,-22,-18,-14])l(tt,35.3,p);a(-21,31.1,p,4),u(15,-21.9,31.1,3.604,"\u6700\u540E\u4E00\u518C\u4F4F\u6237\u540D\u7C3F"),u(17,-19.6,31.1,3.604,"\u9632\u6C34\u888B\u91CC\u7684\u6536\u636E");let D=new Ot;D.position.set(-20.6,3.79,31.1);let O=new Y(new bt(.08,.085,.32,20),nt({color:6313530,roughness:.4}));D.add(O);let X=new Y(new bt(.052,.052,.055,16),x);X.position.y=.182,D.add(X);let $=new Y(new ee(.14,.18,.143),m.enamel);D.add($),i.scene.add(D),d("developer",D,"\u53D6\u8D70\u5BC6\u5C01\u7684\u663E\u5F71\u6DB2"),r(-20,28.14,4.7,"\u4E00\u4E2A\u4E5F\u4E0D\u80FD\u5C11",["\u4E09\u53F7\u5BA4 / \u6700\u540E\u4E00\u4E2A\u590F\u5929"],"n",3.2),i._window(-29.86,33.5,4.22,"e",{w:2.5,h:1.2}),o(-25,33,5.03,13020551,3.2),o(-15,33,5.03,13020551,3),i._battery(-28.2,38,2.85);for(let tt of kl.slice(1)){let[G,rt,pt,gt]=tt.bounds;i._baseboard(G+.13,rt+.1,gt-.1,p),i._baseboard(pt-.13,rt+.1,gt-.1,p),i._baseboardX(rt+.13,G+.1,pt-.1,p,tt.name.includes("204")?[[-16.5,-15]]:[]),gt===54&&i._baseboardX(gt-.13,G+.1,pt-.1,p,[tt.name.includes("\u6697\u623F")?[-26.5,-25]:[-16.5,-15]])}for(let[tt,G]of[[-29.84,47],[-20.86,50],[-29.84,36]])i.decalWall(tt,G,3.4,.9,1.1,i.tex.rust,"e");for(let tt of[46.6,49.4]){let G=new oe(1.15,1.7,18,8),rt=G.attributes.position;for(let gt=0;gt<rt.count;gt++)rt.setZ(gt,Math.sin(rt.getX(gt)*36)*.045);G.computeVertexNormals();let pt=n(G,nt({color:6646096,roughness:1,side:ue}),-10.35,4.15,tt);pt.rotation.y=-Math.PI/2,s(-10.37,5.02,tt,.018,1.3,b,"z")}let Z=document.createElement("canvas");Z.width=Z.height=128;let q=Z.getContext("2d"),Q=q.createRadialGradient(64,64,5,64,64,64);Q.addColorStop(0,"rgba(0,0,0,.52)"),Q.addColorStop(1,"rgba(0,0,0,0)"),q.fillStyle=Q,q.fillRect(0,0,128,128);let ot=new Ze({map:new yn(Z),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1});for(let[tt,G,rt,pt]of[[-13.7,43.1,3.2,1.2],[-19,48.5,2.1,3.1],[-25.4,42.4,6.7,1.2],[-28.5,48.5,2,1.3],[-21,31.1,4.4,1.3],...[-26,-22,-18,-14].map(gt=>[gt,35.3,.8,.9])]){let gt=n(new oe(rt,pt),ot,tt,2.807,G);gt.rotation.x=-Math.PI/2}for(let[tt,G]of[[-3,56],[-10,56],[-18,56],[-26,56],[-25,50],[-25,45],[-16,49],[-16,43],[-16,37],[-22,35],[-27,35]])i.monsterNodes.push({x:tt,y:p,z:G});y.trays=B,y.westBuilt=!0}var Nl=[{name:"\u5730\u4E0B\u65E7\u533A\u8FDE\u5ECA",floor:-1,bounds:[12,29,44,33]},{name:"\u65E7\u533A\u68C0\u4FEE\u8D70\u5ECA",floor:-1,bounds:[22,33,26,67]},{name:"\u5730\u4E0B\u503C\u73ED\u7AD9",floor:-1,bounds:[12,33,22,45]},{name:"\u5907\u7528\u53D1\u7535\u673A\u623F",floor:-1,bounds:[26,33,44,47]},{name:"\u642C\u8FC1\u6863\u6848\u5E93",floor:-1,bounds:[12,45,22,59]},{name:"\u65E7\u84C4\u6C34\u6C60",floor:-1,bounds:[26,47,44,67]},{name:"\u5E94\u6025\u7535\u53F0\u5BA4",floor:-1,bounds:[12,59,22,67]}];function vu(i,t){let{box:e,mesh:n,cylinder:s,sign:r,lamp:o,desk:a,chair:l,shelf:c,closet:h,recordDocument:u,pickup:d}=t,f=i.materials,m=i.detailMaterials,y=i.campaign,p=-2.8,g=nt({color:4020811,roughness:.75,metalness:.25}),_=nt({color:10660250,roughness:.68,metalness:.15}),x=nt({color:9846316,roughness:.62,metalness:.25}),b=m.brass;i.room(12,44,29,33,{y:p,h:2.65,wallMat:f.concrete,floorMat:f.concrete,gaps:{n:[[15.8,17.4]],s:[[16,17.6],[23.2,24.8],[34,35.6]]}}),i.room(22,26,33,67,{y:p,h:2.65,n:!1,w:!1,e:!1,wallMat:f.concrete,floorMat:f.tile}),i.room(12,22,33,45,{y:p,h:2.65,n:!1,wallMat:f.plaster,floorMat:f.tile,gaps:{e:[[38,39.6]],s:[[16,17.6]]}}),i.room(12,22,45,59,{y:p,h:2.65,n:!1,wallMat:f.plaster,floorMat:f.concrete,gaps:{e:[[52,53.6]],s:[[16,17.6]]}}),i.room(12,22,59,67,{y:p,h:2.65,n:!1,wallMat:f.plaster,floorMat:f.tile,gaps:{e:[[63,64.6]]}}),i.room(26,44,33,47,{y:p,h:2.65,n:!1,wallMat:f.concrete,floorMat:f.concrete,gaps:{w:[[40,41.6]],s:[[34,35.6]]}}),i.room(26,44,47,67,{y:p,h:2.65,n:!1,wallMat:f.concrete,floorMat:f.concrete,gaps:{w:[[56,57.6]]}}),y.doors.annex=i.makeDoor({x:15.8,z:29,along:"x",y:p,width:1.6,dir:1,label:"\u5730\u4E0B\u65E7\u533A\u9632\u706B\u95E8",mat:g,locked:!0,lockedMsg:"\u65E7\u533A\u88AB\u5C01\u95ED\u4E86\u3002\u6444\u5F71\u5E08\u5C06\u94A5\u5319\u85CF\u5728\u5168\u5BB6\u798F\u80CC\u540E\u7684\u76F8\u7EB8\u5939\u5C42\u91CC\u3002"});for(let[R,U,B,D]of[[16,33,"\u5730\u4E0B\u503C\u73ED\u7AD9","x"],[16,45,"\u642C\u8FC1\u6863\u6848\u5E93","x"],[16,59,"\u5E94\u6025\u7535\u53F0\u5BA4","x"],[34,33,"\u5907\u7528\u53D1\u7535\u673A\u623F","x"],[34,47,"\u65E7\u84C4\u6C34\u6C60","x"]])i.makeDoor({x:R,z:U,along:D,y:p,width:1.6,dir:1,label:B,mat:g});r(16.6,28.87,-1.1,"\u65E7\u533A\u5C01\u95ED",["\u503C\u73ED\u7AD9 / \u53D1\u7535\u673A / \u6863\u6848\u5E93","\u76F8\u7EB8\u5939\u5C42\u5185\u7559\u6709\u94A5\u5319"],"s",1.35,!0),r(24,33.12,-1.25,"\u68C0\u4FEE\u8D70\u5ECA",["\u5DE6\u4FA7\uFF1A\u6863\u6848 / \u7535\u53F0","\u53F3\u4FA7\uFF1A\u53D1\u7535 / \u84C4\u6C34\u6C60"],"n",1.35,!0);for(let[R,U,B]of[[16.8,33.13,"\u503C\u73ED\u7AD9"],[34.8,33.13,"\u53D1\u7535\u673A\u623F"],[16.8,45.13,"\u642C\u8FC1\u6863\u6848"],[16.8,59.13,"\u5E94\u6025\u7535\u53F0"],[34.8,47.13,"\u84C4\u6C34\u6C60"]])r(R,U,-1.2,B,[],"n",1,!0);for(let[R,U]of[[16,31],[25,31],[34,31],[41,31],[24,38],[24,48],[24,59],[24,65]])o(R,U,-.32,10466980,2.8,!0),e(R,U,p+.01,.7,.05,.01,_);for(let R of[22.3,25.7]){s(R,-.47,50,.065,32,f.rust,"z");for(let U of[35,43,51,59,65])e(R,U,-.72,.11,.07,.35,m.paint),s(R,-.47,U,.08,.08,m.paint,"z")}for(let[R,U]of[[37,"01 \u503C\u73ED"],[48,"02 \u6863\u6848"],[60,"03 \u547C\u53EB"]])r(25.87,R,-1.25,U,["\u539F\u8DEF\u8FD4\u56DE\u914D\u7535\u95F4"],"w",1.15,!0);for(let R of Nl){let[U,B,D,O]=R.bounds;for(let X of[U+.13,D-.13])for(let $ of[B+.7,O-.7])e(X,$,p,.025,.8,.7,g)}a(14.5,35.2,p,2.9),l(14.5,36.5,p),u(18,14.1,35.2,p+.803,"\u6700\u540E\u4E00\u6B21\u4EA4\u73ED\u65E5\u5FD7"),u(24,15,35.2,p+.803,"\u6CF5\u623F\u95E8\u9501\u5DE5\u5355"),e(14.4,35.15,p+.8,.38,.25,.13,f.black),s(14.25,p+.985,35.15,.055,.08,m.paint),r(12.13,39,-1,"\u4EA4\u73ED\u724C",["\u767D\u73ED\uFF1A\u672A\u7B7E\u5B57","\u591C\u73ED\uFF1A02:17"],"e",1.4);for(let R=0;R<5;R++)e(12.2,42.2-R*.3,p+1.45,.04,.22,.26,f.darkWood),s(12.25,p+1.55,42.2-R*.3,.035,.015,b,"x");e(18.8,43,p+.42,3,.65,.1,f.darkWood,!0),e(18.8,43.34,p+.5,3,.05,.55,g);for(let R of[17.5,20.1])e(R,43,p,.065,.6,.43,m.paint);h(13.1,43,p),o(17,39,-.35,12887931,3.1,!0),i._battery(20.5,34.8,p+.07),e(38,40,p,5.5,2.5,.3,m.paint,!0),e(37.5,40,p+.3,3.6,1.75,1.3,g,!0),s(40,p+.98,40,.65,1.8,_,"x");for(let R of[39.25,40.5])s(R,p+.98,40,.67,.075,m.paint,"x");for(let R=0;R<12;R++)e(35.65,39.22+R*.13,p+.46,.035,.055,1.02,f.darkMetal);for(let R of[36.3,38.7])for(let U of[39.2,40.8])e(R,U,p+.12,.35,.35,.32,f.black);s(37.6,-.63,40,.09,1.2,f.rust,"x"),s(37,-1.04,40,.09,.82,f.rust),e(41.9,40,p,.7,2.5,1.6,g,!0);let T=e(30.1,34.1,p,2.1,.42,1.8,m.paint,!0);for(let R of[29.5,30.1,30.7]){let U=s(R,p+1.4,34.34,.12,.04,_,"z");s(R,p+1.4,34.37,.09,.025,m.darkGlass,"z"),e(R,34.4,p+1.37,.012,.02,.085,x)}i.regInteractable(T,"\u542F\u52A8\u5907\u7528\u67F4\u6CB9\u673A",2.7,()=>{var R,U;return(U=(R=i.handlers).onPuzzle)==null?void 0:U.call(R,"generator")}),u(19,29,35.7,p+.8,"\u5907\u7528\u67F4\u6CB9\u673A\u542F\u52A8\u89C4\u7A0B"),a(29.6,35.7,p,1.8);for(let[R,U]of[[28,43.5],[30,43.5],[32,43.5]]){s(R,p+.65,U,.43,1.3,x),i.colliders.push(Le(R,p+.65,U,.86,1.3,.86));for(let B of[p+.2,p+1.1])s(R,B,U,.45,.05,m.paint)}r(43.87,39,-1.2,"\u5907\u7528\u8F93\u51FA",["\u5148\u9884\u70ED\uFF0C\u518D\u4F9B\u6CB9","\u6700\u540E\u63A5\u901A\u8F93\u51FA"],"w",1.5,!0),o(33,39,-.35,11451820,3.4,!0),o(41,43,-.35,12952691,3,!0),o(37.5,40,-.35,11976094,3.6,!0),y.generatorLamp=o(30.1,34.5,-1.2,7581045,.65,!1),y.generatorRotor=s(40.95,p+.98,40,.38,.08,m.paint,"x"),i.props.campaignDynamic.add(y.generatorRotor);for(let R of[13.4,17.3,20.5])for(let U of[47.3,55.6])c(R,U,p,1.65);a(14.5,52,p,2),l(14.5,53.2,p),u(20,14.1,52,p+.803,"\u6CA1\u6709\u7ED3\u6E05\u7684\u642C\u8FC1\u603B\u8D26"),e(20.3,51,p,1,.75,.8,g,!0),e(20.3,51.3,p+.8,1.02,.045,.55,g);let E=new Ot,M=n(new bt(.065,.065,.28,12),_,0,0,0,E);M.rotation.z=Math.PI/2;for(let R of[-.13,.13]){let U=n(new bt(.07,.07,.05,12),b,R,0,0,E);U.rotation.z=Math.PI/2}E.position.set(20.3,p+.87,51),i.scene.add(E),d("relayFuse",E,"\u53D6\u8D70\u65E7\u533A\u8F93\u51FA\u7194\u65AD\u5668"),r(20.3,51.46,-1.4,"\u7EF4\u4FEE\u5907\u4EF6",["\u67F4\u6CB9\u673A\u8F93\u51FA\u7194\u65AD\u5668"],"n",.8,!0),o(16.5,50,-.35,11777691,3.1,!0),o(17.5,57,-.35,9153689,2.5,!0),e(37.2,58,p,10.4,11,.28,m.paint,!0);let I=n(new oe(9.4,10),nt({color:2309430,roughness:.3,metalness:.2}),37.2,p+.3,58);I.rotation.x=-Math.PI/2;for(let R of[31.95,42.45]){i.colliders.push(Le(R,p+.84,58,.08,1.12,11));for(let U of[.52,1.08])e(R,58,p+.28+U,.065,11,.045,_);for(let U=52.5;U<=63.5;U+=.5)s(R,p+.84,U,.027,1.12,_)}for(let R of[52.45,63.55]){i.colliders.push(Le(37.2,p+.84,R,10.6,1.12,.08));for(let U of[.52,1.08])e(37.2,R,p+.28+U,10.6,.065,.045,_);for(let U=32;U<=42.5;U+=.5)s(U,p+.84,R,.027,1.12,_)}s(42.8,-.55,58,.12,15,f.rust,"z");for(let R of[49.5,64.5])s(42.8,-1.45,R,.12,1.8,f.rust);let w=r(26.13,61,-1.2,"\u82CD\u592A \xB7 \u4E03\u5C81",["\u5899\u4E0A\u7684\u523B\u7EBF\u505C\u5728\u8FD9\u91CC"],"e",1.7);i.regInteractable(w,"\u8BFB\u84C4\u6C34\u6C60\u5899\u4E0A\u7684\u523B\u5B57",2.7,()=>{var R,U;return(U=(R=i.handlers).onDocument)==null?void 0:U.call(R,22)});for(let R=0;R<9;R++)e(26.16,60.8,p+.35+R*.08,.015,.35,.012,_);o(29,51,-.35,8566176,3,!0),o(29,63,-.35,11834736,3.2,!0),o(40,65,-.35,8566176,2.8,!0),o(37.2,58,-.35,10402725,3.6,!0),h(27.2,49,p),i._battery(28.5,64.8,p+.07),a(15.3,65.4,p,3.1),l(15.3,64.6,p);let S=e(15.3,65.4,p+.8,1.3,.65,.62,g,!0);e(15.3,65.05,p+.95,.9,.035,.23,m.darkGlass);for(let R of[14.83,15.78])s(R,p+1,65,.08,.075,m.paint,"z");for(let R=0;R<7;R++)e(15.65,65.015,p+1.16+R*.025,.25,.012,.008,_);s(14.9,p+1.75,65.5,.012,.75,m.paint),s(15.82,p+1.44,65.3,.026,.11,b),i.regInteractable(S,"\u8C03\u8C10\u5E94\u6025\u65E0\u7EBF\u7535",2.7,()=>{var R,U;return(U=(R=i.handlers).onPuzzle)==null?void 0:U.call(R,"radio")}),u(21,16.4,65.4,p+.803,"\u5E94\u6025\u547C\u53EB\u9891\u9053\u8868"),r(12.13,62,-1.1,"\u4E0D\u8981\u7ED3\u675F\u901A\u8BDD",["14.07 MHz / \u56DB\u4F4D\u8C03\u8C10\u7801","\u628A\u540D\u5B57\u8BF4\u51FA\u6765"],"e",1.35,!0),o(16,62,-.35,12955525,3,!0),y.radioLamp=o(15.3,65,-1.5,8109974,.55,!1);for(let[R,U]of[[16.6,30.5],[23.8,31],[24,38],[24,48],[24,58],[24,65],[18,38],[18,52],[18,62],[29,40],[34.8,45],[34.8,49],[29,57],[29,64],[40,49],[40,65]])i.monsterNodes.push({x:R,y:p,z:U})}var Fl=[...xu,...Nl,...kl,{name:"\u5165\u53E3\u5927\u5385",floor:0,bounds:[-5,-9,5,-2]},{name:"\u7384\u5173",floor:0,bounds:[-1.7,-2,1.7,1.8]},{name:"\u4E00\u697C\u8D70\u5ECA",floor:0,bounds:[-1.9,1.8,1.9,61.7]},{name:"\u4E1C\u7FFC\u8D70\u5ECA",floor:0,bounds:[1.9,42,31,46]},{name:"\u516C\u5171\u6D17\u8863\u623F",floor:0,bounds:[7,32,17.5,42]},{name:"104 \u7A7A\u5C4B",floor:0,bounds:Yo.bounds},{name:"\u7BA1\u7406\u5458\u7EF4\u4FEE\u5BA4",floor:0,bounds:[19,32,31,42]},{name:"\u53A8\u623F",floor:0,bounds:[-8.4,0,-1.7,7.5]},{name:"\u5BA2\u5385",floor:0,bounds:[-8.4,7.5,-1.7,15.5]},{name:"\u5BDD\u5BA4",floor:0,bounds:[-13.8,7.5,-8.4,15.5]},{name:"\u6D74\u5BA4",floor:0,bounds:[-17.6,14.8,-13.8,21]},{name:"\u4F5B\u95F4",floor:0,bounds:[1.7,0,8.4,8.5]},{name:"\u513F\u7AE5\u623F",floor:0,bounds:[1.7,8.5,8.4,15.5]},{name:"\u7EF4\u4FEE\u697C\u68AF\u95F4",floor:0,bounds:[1.7,16,11.8,25]},{name:"\u7EF4\u4FEE\u697C\u68AF\u95F4",floor:-1,bounds:[1.7,16,11.8,25]},...[0,1,2].map(i=>({name:"\u6298\u8FD4\u697C\u68AF\u95F4",floor:i,bounds:[-5,61.7,5,72.8]})),{name:"\u5C4B\u9876\u667E\u6652\u573A",floor:2,bounds:[-8,61.7,8,83]},{name:"\u4E8C\u697C\u8D70\u5ECA",floor:1,bounds:[-1,0,1,61.7]},{name:"201 \u7BA1\u7406\u5BA4",floor:1,bounds:[-8.4,16,-1,27]},{name:"202 \u7559\u5B88\u4F4F\u6237",floor:1,bounds:[1,40,10,54]},{name:"203 \u653E\u6620\u5BA4",floor:1,bounds:[-10,36,-1,48]},{name:"\u9732\u5929\u5929\u4E95",floor:1,bounds:[1,28.5,10.5,33]},{name:"\u5730\u4E0B\u914D\u7535\u95F4",floor:-1,bounds:[11.8,14,20,29]},{name:"\u5730\u4E0B\u6392\u6C34\u95F4",floor:-1,bounds:[20,14,24,29]}];function _s(i){var e,n;let t=i.y<-.8?-1:i.y>4.8?2:i.y>2?1:0;return(n=(e=Fl.find(s=>s.floor===t&&i.x>=s.bounds[0]&&i.x<=s.bounds[2]&&i.z>=s.bounds[1]&&i.z<=s.bounds[3]))==null?void 0:e.name)!=null?n:t===-1?"\u5730\u4E0B\u7EF4\u4FEE\u697C\u68AF":"\u697C\u68AF\u95F4"}function bu(i){let t=i.materials,e=pn(i);for(let[v,z,k]of[["concrete",e.concrete,.018],["plaster",e.plaster,.012],["wallpaper",e.plaster,.006],["woodWall",e.wood,.009],["woodDoor",e.wood,.008],["woodFloor",e.wood,.009]])t[v].bumpMap=z.bumpMap,t[v].roughnessMap=z.roughnessMap,t[v].bumpScale=k;let n=i.scene,s=Pt(14071998),r={collide:!1,cast:!1,geo:{ao:"none",jitter:0,bevel:!0}},o=nt({color:6450537,roughness:.88,metalness:.08}),a=nt({color:9597771,roughness:.68,metalness:.12}),l=nt({color:8666417,roughness:.9,metalness:.06}),c=nt({color:3493466,roughness:.92}),h=nt({map:i.tex.journal,color:14076335,roughness:1});i.campaign={doors:{},pickups:{},valves:[],lamps:[],dynamics:[]};let u=i.campaign;i.props.campaignDynamic=new Ot,n.add(i.props.campaignDynamic);let d=(v,z,k,H,F,it,et,C=!1)=>i.box(v,z,k,H,F,it,et===t.darkWood?e.wood:et,C?{geo:{bevel:!0}}:r),f=(v,z,k,H,F,it=n)=>{let et=new Y(v,z);return et.position.set(k,H,F),it.add(et),et},m=(v,z,k,H,F,it,et="y")=>{let C=f(new bt(H,H,F,10),it,v,z,k);return et==="x"&&(C.rotation.z=Math.PI/2),et==="z"&&(C.rotation.x=Math.PI/2),C},y=(v,z=[],k=!1)=>{let H=document.createElement("canvas");H.width=512,H.height=320;let F=H.getContext("2d");F.fillStyle=k?"#25342f":"#c4b99e",F.fillRect(0,0,512,320);for(let et=0;et<400;et++)F.fillStyle="rgba(30,26,18,"+s()*.07+")",F.fillRect(s()*512,s()*320,s()*25+1,1);F.strokeStyle=k?"#829083":"#6e6556",F.lineWidth=3,F.strokeRect(14,14,484,292),F.fillStyle=k?"#d7d9c5":"#302c26",F.textAlign="center",F.font='bold 38px "Songti SC", serif',F.fillText(v,256,z.length?82:175),F.font='25px "Songti SC", serif',z.forEach((et,C)=>F.fillText(et,256,145+C*44));let it=new yn(H);return it.colorSpace=ye,it.minFilter=An,it},p=(v,z,k,H,F,it,et=.72,C=!1)=>i.decalWall(v,z,k,et,et*.625,y(H,F,C),it),g=(v,z,k,H,F)=>{let it=f(new oe(.28,.36),h,z,H,k);return it.rotation.x=-Math.PI/2,it.rotation.z=-.13,it.material=nt({map:i.tex.journal,color:14799537,roughness:1,side:ue,emissive:5917482,emissiveIntensity:.14}),i.regInteractable(it,F,2.6,()=>{var et,C;return(C=(et=i.handlers).onDocument)==null?void 0:C.call(et,v)}),i.notePickups.push({mesh:it,id:v}),it},_=(v,z,k)=>{let H=i.regInteractable(z,k,2.4,()=>{var F,it;return(it=(F=i.handlers).onItem)==null?void 0:it.call(F,v,z,H)});u.pickups[v]={mesh:z,interactable:H}},x=(v,z,k,H=9876136,F=2,it=!1,et=null)=>{var ht;let C=new Ve(H,F,8,1.8);C.position.set(v,k-.08,z),n.add(C);let A=lu(i,v,k,z,it?2698537:H);if(et!=null&&et.wall)et.wall==="east"||et.wall==="west"?(A.group.rotation.z=et.wall==="east"?-Math.PI/2:Math.PI/2,C.position.set(v+(et.wall==="east"?-.08:.08),k,z)):(A.group.rotation.x=et.wall==="south"?Math.PI/2:-Math.PI/2,C.position.set(v,k,z+(et.wall==="south"?-.08:.08)));else if((et==null?void 0:et.pole)!==void 0){let at=k+.12,St=et.pole;m(v-.48,(St+at)/2,z,.033,at-St,o),m(v-.24,at,z,.024,.48,o,"x"),m(v,k+.075,z,.019,.09,o),d(v-.48,z,St,.16,.16,.035,o)}else{let at=i.ceilings.filter(mt=>v>=mt.x0&&v<=mt.x1&&z>=mt.z0&&z<=mt.z1&&mt.y>=k-.1&&mt.y-k<.8).sort((mt,Tt)=>mt.y-Tt.y)[0],St=(ht=et==null?void 0:et.ceiling)!=null?ht:at==null?void 0:at.y;if(St>k+.035)for(let mt of[-.25,.25])m(v+mt,(St+k+.035)/2,z,.014,St-k-.035,o)}let V=A.diffuser,ct={light:C,base:F,powered:it,bulb:V};return u.lamps.push(ct),it&&(C.intensity=0),ct},b=(v,z,k,H=1.8)=>{d(v,z,k+.73,H,.8,.06,t.darkWood,!0);for(let F of[-H/2+.09,H/2-.09])for(let it of[-.3,.3])d(v+F,z+it,k,.06,.06,.73,t.darkWood);d(v+H/2-.28,z,k,.38,.7,.68,t.darkWood,!0);for(let F=0;F<3;F++){let it=v+H/2-.28,et=k+.07+F*.2;d(it,z-.361,et,.34,.025,.176,t.darkWood),m(it,et+.1,z-.406,.012,.18,a,"x");for(let C of[-.065,.065])m(it+C,et+.1,z-.384,.011,.045,a,"z")}},T=(v,z,k,H=t.darkWood)=>{d(v,z,k+.4,.47,.46,.07,H,!0);for(let F of[-.21,.21])d(v+F,z+.2,k+.44,.048,.045,.49,H);for(let F of[.57,.72,.87])d(v,z+.2,k+F,.4,.045,.055,H);for(let F of[-.19,.19])for(let it of[-.18,.18])d(v+F,z+it,k,.035,.035,.42,H)},E=(v,z,k,H=1.5)=>{let F=Le(v,k+.925,z,H+.055,1.85,.4);F.propKind="shelf",i.colliders.push(F);for(let it of[-H/2,H/2])d(v+it,z,k,.055,.4,1.85,o);for(let it=0;it<5;it++)if(d(v,z,k+.08+it*.41,H,.4,.045,o),it<4)for(let et=0;et<4;et++)d(v-H*.35+et*H*.23,z,k+.125+it*.41,.22,.3,.27,et%2?c:h)},M=(v,z,k)=>{let H=hu(i,v,z,k);i.regInteractable(H,"\u8EB2\u8FDB\u8863\u67DC",2.3,()=>{var F,it;return(it=(F=i.handlers).onHide)==null?void 0:it.call(F,H)})},I=(v,z,k,H,F,it,et)=>{i._baseboard(v+.115,k,H,F,it===v?[et]:[]),i._baseboard(z-.115,k,H,F,it===z?[et]:[]),i._baseboardX(k+.115,v,z,F),i._baseboardX(H-.115,v,z,F);for(let C of[v+.15,z-.15])d(C,(k+H)/2,F+2.27,.055,H-k,.07,t.darkWood)};i.room(-5,5,-9,-2,{h:2.7,s:!1,wallMat:t.concrete,floorMat:t.tile,gaps:{n:[[-.8,.8]]}}),i.wallZ(-2,-5,-1.7,0,2.7,t.concrete),i.wallZ(-2,1.7,5,0,2.7,t.concrete),u.doors.community=i.makeDoor({x:-.8,z:-9,along:"x",width:1.6,dir:1,mat:o,label:"\u516C\u5BD3\u5916\u95E8",locked:!0,lockedMsg:"\u793E\u533A\u95E8\u7981\u5931\u53BB\u4F9B\u7535\u3002\u5148\u6062\u590D\u5730\u4E0B\u5907\u7528\u7535\u6E90\u3002"}),b(-3.55,-6.55,0,2),T(-3.5,-5.45,0),g("invitation",-3.5,-6.55,.803,"\u4E00\u5C01\u6CA1\u6709\u7F72\u540D\u7684\u4FE1");for(let v=0;v<3;v++)for(let z=0;z<4;z++)d(-3.85+z*.55,-8.86,.95+v*.39,.49,.14,.34,o),d(-3.85+z*.55,-8.77,1.08+v*.39,.24,.012,.025,t.black);p(-3.25,-8.73,2.36,"\u56DE\u58F0\u516C\u5BD3",["\u591C\u9593\u53D7\u4ED8 / MAIL"],"n",1.65,!0),p(4.86,-5.2,1.5,"\u62C6\u9664\u544A\u793A",["\u4E03\u6708\u5341\u56DB\u65E5\u6E05\u573A","\u591C\u95F4\u51FA\u53E3\uFF1A\u4E8C\u697C\u5929\u4E95"],"w",1.8),d(3.2,-7.6,.38,2.7,.55,.09,t.darkWood,!0),d(3.2,-7.88,.49,2.7,.05,.7,t.darkWood);for(let v of[2.05,4.35])d(v,-7.6,0,.055,.45,.4,o);d(0,-8.1,.012,2.1,.75,.025,t.rug),p(.95,-2.12,1.65,"\u4F4F\u6237\u533A",["\u53A8\u623F / \u4E09\u53F7\u5BA4","\u697C\u68AF\u95F4\u5728\u8D70\u5ECA\u5C3D\u5934"],"s",.9,!0),x(0,-5.5,2.5,12688497,3),x(-3.4,-6.5,2.4,10337198,1.4),i._window(4.86,-7.3,1.5,"w",{w:1.5,h:1.4}),i.floor(0,67.25,10,11.1,0,t.concrete),i.wallX(-5,61.7,72.8,0,5.6,t.concrete),i.wallX(5,61.7,72.8,0,5.6,t.concrete),i.wallZ(72.8,-5,5,0,5.6,t.concrete);for(let v of[0,2.8])i.wallZ(61.7,-5,5,v,2.8,t.concrete,[[-1.7,1.7]]);zl(i,{roofOpenDepth:1.5}),Pl(i,{x0:-5,x1:5,z0:61.7,z1:72.8,base:0,height:5.6,gapX:[-1.7,1.7]});for(let[v,z]of[0,2.8,5.6].entries()){if(p(1.8,61.84,z+1.65,["1F","2F","\u5C4B\u9876 R"][v],["\u4F4F\u6237\u533A / \u4F4F\u6237\u533A / \u667E\u6652\u573A".split(" / ")[v],"\u6CBF\u6276\u624B\u53EF\u539F\u8DEF\u8FD4\u56DE"],"n",1.1,!0),v<2)x(0,63.05,z+2.565,12625275,3.8,!1,{ceiling:z+2.6});else{for(let k of[-.4,.4])d(1.8+k,61.79,z,.045,.045,1.85,o);d(1.8,61.81,z+1.65-.344,1.1,.035,.688,o)}v<2&&i._window(-4.86,69.4,z+1.55,"e",{w:1.75,h:1.65}),i.monsterNodes.push({x:0,y:z,z:62.4})}x(0,67.5,3.965,10007210,2.8,!1,{ceiling:4}),x(4.865,67.4,5.05,10007210,3.6,!1,{wall:"east"}),i.floor(-6,67.25,4,11.1,5.6,t.concrete),i.floor(6,67.25,4,11.1,5.6,t.concrete),i.floor(0,62.95,8,2.5,5.6,t.concrete),i.floor(0,77.9,16,10.2,5.6,t.concrete),i.wallX(-8,61.7,83,5.6,1.12,t.concrete),i.wallX(8,61.7,83,5.6,1.12,t.concrete),i.wallZ(83,-8,8,5.6,1.12,t.concrete),i.wallZ(61.7,-8,8,5.6,1.12,t.concrete);for(let v of[-4.08,4.08]){d(v,67.75,5.6,.065,9.9,1.04,o,!0);for(let z=63.1;z<73;z+=.7)m(v,6.12,z,.025,1.04,o)}d(0,72.73,5.6,8.2,.07,1.04,o,!0);for(let v of[-2.95,2.95]){d(v,64.18,5.6,2.1,.07,1.12,o,!0);for(let z of[-.85,-.42,0,.42,.85])m(v+z,6.16,64.18,.022,1.12,o)}for(let v of[-3.05,3.05])for(let z of[75,81])m(v,6.8,z,.045,2.4,o);for(let v of[-3.05,3.05])m(v,7.98,78,.038,6,o,"z");for(let v=0;v<5;v++){let z=d(-2.4+v*1.15,78.5,6.35,.75,.035,1.55,v%2?t.quilt:t.pale);z.rotation.y=v*.2-.4}let w=d(.4,81.55,5.99,2.2,.52,.07,t.darkWood,!0);for(let v of[-.5,1.3])d(v,81.55,5.6,.05,.45,.4,o);g(10,.4,81.55,6.08,"\u6BCD\u4EB2\u7559\u4E0B\u7684\u4FBF\u6761"),x(-5.4,74.2,7.25,8563125,2.3,!1,{pole:5.6}),x(5.4,81,7.3,9680573,2.3,!1,{pole:5.6}),i._battery(5.8,75.5,5.65);for(let[v,z,k,H]of[[-18,78,12,18],[20,84,13,23],[0,102,22,15]]){d(v,z,-4,k,9,H,t.concrete);for(let F=0;F<5;F++)for(let it=0;it<4;it++)d(v-k/2+1.5+it*(k-3)/3,z-4.55,.5+F*2.5,1,.04,1.5,Ie({color:s()<.15?9403733:1517352}))}i.room(1.9,31,42,46,{w:!1,wallMat:t.plaster,floorMat:t.tile,gaps:{n:[[9,10.5],[23,24.5]],s:[[10,11.5]]}}),i.room(7,17.5,32,42,{s:!1,wallMat:t.concrete,floorMat:t.tile}),i.room(19,31,32,42,{s:!1,wallMat:t.concrete,floorMat:t.concrete}),i.room(7,14,46,52,{n:!1,wallMat:t.wallpaper,floorMat:t.woodFloor}),i.wallZ(48.8,10.1,14,0,2.7,t.plaster),i.wallX(10.1,48.8,52,0,2.7,t.plaster,[[49,50.3]]),i.wallX(11.8,46,48.8,0,2.7,t.plaster,[[46.7,47.9]]),i.makeDoor({x:9,z:42,along:"x",width:1.5,dir:1,label:"\u516C\u5171\u6D17\u8863\u623F"}),u.doors.workshop=i.makeDoor({x:23,z:42,along:"x",width:1.5,dir:1,label:"\u7BA1\u7406\u5458\u7EF4\u4FEE\u5BA4",mat:o,locked:!0,lockedMsg:"\u7EF4\u4FEE\u5BA4\u78C1\u9501\u6CA1\u6709\u7535\u3002\u5148\u63A5\u901A\u5730\u4E0B\u5907\u7528\u7535\u6E90\u3002"}),i.makeDoor({x:10,z:46,along:"x",width:1.5,dir:-1,label:"104 \u7A7A\u5C4B"}),p(1.77,42.2,1.7,"\u4E1C\u7FFC",["\u6D17\u8863\u623F / 104","\u7BA1\u7406\u5458\u7EF4\u4FEE\u5BA4"],"w",.75,!0),p(9.75,42.13,1.6,"\u6D17\u8863\u623F",[],"n",.65,!0),p(23.75,42.13,1.6,"\u7EF4\u4FEE\u5BA4",[],"n",.65,!0),p(10.75,45.87,1.6,"104",[],"s",.46,!0);for(let v of[5.5,13,21,28])x(v,44,2.5,9942951,2.6,v>12);for(let v of[8.4,10.3,12.2,14.1]){d(v,33.1,0,1.05,.8,1.15,e.enamel,!0),d(v,33.1,1.15,1.08,.84,.035,e.enamel),d(v,33.515,.91,.93,.03,.17,e.paint),f(new tn(.319,.024,12,32),e.iron,v,.58,33.61),f(new tn(.283,.026,10,32),e.rubber,v,.58,33.595),m(v,.58,33.53,.24,.12,e.iron,"z"),f(new tn(.205,.011,8,28),e.iron,v,.58,33.594);let z=new so(new vn(.008,6),e.rubber,24);for(let H=0;H<24;H++){let F=H/12*Math.PI*2,it=H<12?.17:.215;z.setMatrixAt(H,new me().makeTranslation(v+Math.cos(F)*it,.58+Math.sin(F)*it,33.596))}n.add(z);let k=e.darkGlass.clone();k.transparent=!0,k.opacity=.4,k.depthWrite=!1,f(new vn(.253,32),k,v,.58,33.615),d(v-.3,33.59,.49,.08,.05,.18,e.iron),d(v+.3,33.63,.48,.045,.05,.2,e.enamel);for(let H of[-.31,.2])m(v+H,1,33.556,.037,.04,e.rubber,"z"),d(v+H,33.58,1,.006,.005,.026,e.enamel);for(let H=0;H<3;H++)d(v-.08+H*.09,33.55,.96,.055,.016,.024,e.iron);d(v,33.55,.18,.9,.012,.018,e.iron);for(let H of[-.38,.38])m(v+H,.055,33.2,.045,.11,e.rubber);m(v,1.28,32.55,.038,.35,t.rust,"z")}E(15.8,40.8,0,1.5),d(9.8,39.6,.38,2.6,.75,.08,t.darkWood,!0);for(let v of[8.7,10.9])d(v,39.6,0,.06,.65,.38,o);for(let v=0;v<4;v++)d(9.1+v*.43,39.6,.46+v*.01,.35,.5,.035,t.quilt);x(12,36.7,2.5,9680561,3.1,!0),i._window(17.36,36.5,1.45,"w",{w:1.6,h:1.3}),g(11,10.1,39.6,.66,"\u6D17\u8863\u623F\u7684\u7559\u8A00"),b(25.4,33.8,0,3.4),d(25.4,32.14,1.18,4.7,.035,1.1,t.darkWood);for(let v=0;v<7;v++){let z=m(23.5+v*.59,1.65,32.23,.021,.45,o);z.rotation.z=v*.09-.2,d(23.5+v*.59,32.23,1.88,.14,.035,.055,a)}E(30.15,36.8,0,1.25),E(29,40.8,0,2.1),M(20.25,40.8,0),d(20.5,34,0,1.1,1.25,1.4,o,!0),m(20.5,1.47,34,.32,.13,a),g(9,26.2,33.8,.803,"\u672A\u5B8C\u6210\u7684\u7EF4\u4FEE\u5DE5\u5355");let S=new Ot;S.position.set(24.2,.9,33.8);let R=new Y(new tn(.25,.035,8,18),l);R.rotation.x=-Math.PI/2,S.add(R);for(let v of[0,Math.PI/2]){let z=new Y(new ee(.48,.036,.036),l);z.rotation.y=v,S.add(z)}n.add(S),_("valveHandle",S,"\u53D6\u8D70\u6392\u6C34\u9600\u624B\u8F6E"),x(25.4,35.6,2.5,12623979,3,!0),i._battery(27.8,38.2,.05);let U=d(12.75,50.25,0,1.85,2.7,.3,t.darkWood,!0),B=d(12.75,50.25,.3,1.7,2.5,.13,t.quilt);U.userData.collider.y1=.43,u.bed104={frame:U,mattress:B},b(8.15,51.45,0,1.65),T(8.15,50.45,0),d(8.35,51.45,.81,.32,.23,.07,t.black),g(12,7.65,51.45,.803,"104 \u4F4F\u6237\u65E5\u8BB0"),M(10.95,51.45,0),d(8.7,48.8,.015,2.3,2,.018,t.rug),x(9.4,49,2.5,12689013,2.8,!0),i._window(13.86,50.5,1.45,"w",{w:1.8,h:1.35}),i._battery(8.7,48.4,.05);for(let[v,z]of[[5,44],[12,44],[21,44],[28.5,44],[11,36.5],[24,37],[9.4,49],[10.95,50]])i.monsterNodes.push({x:v,y:0,z});i.wallX(1.7,16,25,-2.8,2.8,t.concrete),i.wallZ(16,1.7,11.8,-2.8,5.5,t.concrete),i.wallZ(25,1.7,11.8,-2.8,5.5,t.concrete),i.ceil(6.75,20.5,10.1,9,2.7,t.concrete),i.floor(6.75,20.5,10.1,9,-2.8,t.concrete),zl(i,{x:4.6,z:20.5,base:-2.8,storeys:1,frontDepth:2.9,rotation:Math.PI/2}),Pl(i,{x0:1.7,x1:11.8,z0:16,z1:25,base:-2.8,height:5.5,leftDoor:{y:0,gap:[19.8,21.2]}}),u.doors.service=i.makeDoor({x:1.7,z:19.8,width:1.4,dir:1,offset:-.11,mat:o,label:"\u5730\u4E0B\u7EF4\u4FEE\u95E8",locked:!0,lockedMsg:"\u7EF4\u4FEE\u95E8\u9501\u7740\u3002\u5927\u5385\u503C\u73ED\u53F0\u4E0A\u6709\u4E00\u5C01\u4FE1\u3002"}),p(1.58,19.35,1.62,"\u5730\u4E0B\u7EF4\u4FEE",["\u914D\u7535 / \u6392\u6C34","\u975E\u4F4F\u6237\u8BF7\u52FF\u8FDB\u5165"],"w",.6,!0),x(3.6,20.5,2.45,13081192,1.6),x(7.8,24.865,-.4,10269602,2.8,!1,{wall:"south"}),p(3.9,16.13,1.4,"B1",["\u6CBF\u697C\u68AF\u4E0B\u697C","\u539F\u8DEF\u53EF\u8FD4\u56DE\u4E00\u697C"],"n",.95,!0),i.room(11.8,24,14,29,{y:-2.8,h:2.8,wallMat:t.concrete,floorMat:t.concrete,gaps:{w:[[19.4,21.6]],s:[[15.8,17.4]]}}),i.floor(11.6,20.5,.5,3,-2.8,t.concrete),i.wallX(20,14,29,-2.8,2.8,t.concrete,[[21,22.5]]),u.doors.pump=i.makeDoor({x:20,z:21,width:1.5,y:-2.8,mat:o,dir:1,label:"\u6392\u6C34\u95F4\u94C1\u95E8",locked:!0,lockedMsg:"\u94C1\u95E8\u4E0A\u7F20\u7740\u9508\u94FE\u3002\u5148\u542C\u5B8C\u90A3\u76D8\u5F55\u97F3\u3002"}),p(19.88,20.5,-1.2,"\u6392\u6C34\u95F4",["\u95E8\u5185\u7981\u6B62\u901A\u884C"],"w",.56,!0);for(let v of[13.5,16.5,19]){m(v,-.34,21.5,.07,14.4,t.rust,"z");for(let z of[15.5,20,26.5])m(v,-.33,z,.09,.06,o,"z")}E(14.8,27.7,-2.8,2.3),d(18.3,27.9,-2.8,1.3,.85,.9,o,!0),m(18.3,-1.66,27.9,.34,.6,t.rust),M(12.75,27.8,-2.8);let D=d(17.1,14.36,-2.35,2.05,.35,1.5,o,!0);d(17.1,14.57,-2.25,1.9,.045,1.28,t.darkMetal);let O=["\u8D70\u5ECA","\u4F4F\u6237","\u6392\u6C34"];for(let v=0;v<3;v++)d(16.45+v*.65,14.63,-1.72,.3,.08,.16,a),p(16.45+v*.65,14.64,-1.35,O[v],[],"n",.4,!0);i.regInteractable(D,"\u66F4\u6362\u7194\u65AD\u5668 / \u5408\u4E0A\u5907\u7528\u7535\u6E90",2.5,()=>{var v,z;return(z=(v=i.handlers).onPuzzle)==null?void 0:z.call(v,"power")}),p(15.1,14.13,-1.33,"\u68C0\u4FEE\u5361",["\u5148\u6392\u6C34 \xB7 \u540E\u8D70\u5ECA","\u6700\u540E\u4F4F\u6237\u7535\u6E90"],"n",1);let X=p(14,14.13,-1.35,"\u505C\u7535\u68C0\u4FEE",["\u5408\u95F8\u524D\u66F4\u6362\u7194\u65AD\u5668"],"n",.65);i.regInteractable(X,"\u9605\u8BFB\u65AD\u7535\u68C0\u4FEE\u5361",2.5,()=>{var v,z;return(z=(v=i.handlers).onDocument)==null?void 0:z.call(v,4)});for(let[v,z]of[[13.3,17],[18,23.5],[22,18],[22,26]]){x(v,z,-.3,9155749,2.8,!0);let k=f(new vn(.7+s(),18),nt({color:1911848,transparent:!0,opacity:.48,roughness:.26}),v+.5,-2.775,z+1);k.rotation.x=-Math.PI/2}x(13,20.5,-.3,11691078,1.25);let $=m(22.6,-1.7,16.3,.7,2.05,o);n.add($),i.colliders.push(Le(22.6,-1.7,16.3,1.4,2.05,1.4));for(let v of[-2.55,-.85])m(22.6,v,16.3,.73,.07,t.rust);for(let v of[21.1,22.15,23.2]){m(v,-1.25,28.2,.075,2.4,t.rust);let z=new Ot;z.position.set(v,-1.48,28),i.props.campaignDynamic.add(z),f(new tn(.22,.028,8,14),l,0,0,0,z);let k=m(v,-1.48,28,.04,.12,a,"z");for(let H of[0,Math.PI/2]){let F=f(new ee(.43,.028,.028),l,0,0,0,z);F.rotation.z=H}u.valves.push(z),i.regInteractable(k,"\u6392\u6C34\u9600\u7EC4",2.6,()=>{var H,F;return(F=(H=i.handlers).onPuzzle)==null?void 0:F.call(H,"valves")})}p(22.2,28.86,-.9,"\u6C34\u95F8\u64CD\u4F5C",["\u6CC4\u538B / \u56DE\u6C34 / \u6392\u6C34"],"s",1.75,!0),d(22.3,23.8,-2.8,2.1,1.7,.1,t.darkMetal);for(let v=0;v<12;v++)d(21.3+v*.18,23.8,-2.67,.025,1.7,.035,o);i._battery(13.8,24.5,-2.75);let Z=(v,z,k,H,F,it)=>{i.room(v,z,k,H,{y:2.8,h:2.4,wallMat:t.wallpaper,floorMat:t.woodFloor,[it]:!1}),I(v,z,k,H,2.8,it==="w"?v:z,F)};Z(-8.4,-1,16,27,[20,21.4],"e"),Z(1,10,40,54,[46,47.4],"w"),Z(-10,-1,36,48,[40,41.4],"e"),u.doors.office=i.makeDoor({x:-1,z:20,y:2.8,width:1.4,dir:-1,offset:.11,label:"201 \u7BA1\u7406\u5BA4",locked:!0,lockedMsg:"\u78C1\u9501\u6CA1\u6709\u7535\u3002\u9700\u8981\u6062\u590D\u5730\u4E0B\u5907\u7528\u7535\u6E90\u3002"}),u.doors.resident=i.makeDoor({x:1,z:46,y:2.8,width:1.4,dir:1,offset:-.11,label:"202 \u7559\u5B88\u4F4F\u6237",locked:!0,lockedMsg:"\u78C1\u9501\u6CA1\u6709\u7535\u3002\u9700\u8981\u6062\u590D\u5730\u4E0B\u5907\u7528\u7535\u6E90\u3002"}),u.doors.archive=i.makeDoor({x:-1,z:40,y:2.8,width:1.4,dir:-1,offset:.11,label:"203 \u653E\u6620\u5BA4",locked:!0,lockedMsg:"\u94A5\u5319\u4FDD\u5B58\u5728 201 \u7BA1\u7406\u5BA4\u7684\u6863\u6848\u67DC\u91CC\u3002"});for(let[v,z,k,H]of[[-.87,19.5,"201","e"],[.87,45.5,"202","w"],[-.87,39.5,"203","e"]])p(v,z,4.4,k,[],H,.46,!0);b(-5.8,18.5,2.8,2.6),T(-5.8,19.6,2.8),d(-6.5,18.5,3.59,.52,.38,.11,t.darkMetal);for(let v=0;v<3;v++)for(let z=0;z<8;z++)d(-6.72+z*.062,18.43+v*.08,3.7,.038,.04,.025,o);m(-6.5,3.83,18.68,.055,.5,t.black,"x"),g(8,-5.15,18.5,3.598,"\u4E8C\u697C\u4F4F\u6237\u7684\u76EE\u51FB\u8BB0\u5F55");let q=d(-7.65,23.7,2.8,1.1,.75,1.4,o,!0);d(-7.65,23.3,2.92,.94,.045,1.16,t.darkMetal);for(let v=0;v<4;v++)for(let z=0;z<3;z++)d(-7.73+z*.08,23.26,3.5+v*.08,.048,.028,.048,a);i.regInteractable(q,"\u6863\u6848\u67DC\u5BC6\u7801\u9501",2.6,()=>{var v,z;return(z=(v=i.handlers).onPuzzle)==null?void 0:z.call(v,"cabinet")});let Q=f(new vn(.3,24),nt({map:i.tex.clock,roughness:.8}),-3.6,4.42,16.13);f(new tn(.31,.023,8,24),o,-3.6,4.42,16.12),E(-4.2,26.4,2.8,2.5),M(-2.5,25.9,2.8),p(-8.26,20.3,4.2,"\u62C6\u9664\u901A\u77E5",["\u6240\u6709\u5931\u7269\u8BF7\u5728","\u4E03\u6708\u5341\u56DB\u65E5\u524D\u8BA4\u9886"],"e",1.4),x(-5.2,21,5.02,13086597,2.8,!0),x(-3,25,5.02,9614245,2,!0),i._window(-8.26,24.5,4.3,"e",{w:1.4,h:1.2}),i._battery(-4,20,2.85),d(7.7,43,2.8,2,3.1,.28,t.darkWood,!0),d(7.7,43,3.08,1.9,3,.18,t.quilt),d(7.7,41.95,3.26,1.2,.5,.11,t.pale),d(7.7,44,3.27,1.9,1,.07,c),b(4.1,51.8,2.8,2),T(5,50.6,2.8);let ot=new Ot,tt=new Y(new ee(.28,.05,.18),o);ot.add(tt);for(let v of[-.068,.068]){let z=new Y(new bt(.038,.038,.012,12),t.black);z.position.set(v,.032,0),ot.add(z)}ot.position.set(4.1,3.64,51.8),n.add(ot),_("tape",ot,"\u4E03\u6708\u5341\u56DB\u65E5\u7684\u5F55\u97F3\u5E26"),M(8.4,52.9,2.8);for(let v=0;v<5;v++)d(2.2+v*.65,42,2.8,.48,.4,.36,h),d(2.2+v*.65,42,3.16,.5,.43,.025,t.darkWood);i._window(9.86,48.2,4.3,"w",{w:1.7,h:1.1}),x(5.2,47.5,5.02,10139323,2.5,!0),i._battery(6.5,50.2,2.85),b(-6.5,43.8,2.8,2);let G=d(-6.5,43.8,3.59,.68,.42,.15,o);for(let v of[-.15,.15])m(-6.5+v,3.76,43.8,.11,.025,t.black);for(let v=0;v<4;v++)d(-6.73+v*.13,43.56,3.62,.075,.04,.025,a);i.regInteractable(G,"\u64AD\u653E\u4E03\u6708\u5341\u56DB\u65E5\u7684\u5F55\u97F3\u5E26",2.8,()=>{var v,z;return(z=(v=i.handlers).onPuzzle)==null?void 0:z.call(v,"tape")}),g(6,-7.15,43.75,3.599,"\u672A\u5BC4\u51FA\u7684\u8BA4\u9886\u4E66"),E(-8.8,47.3,2.8,1.7);let rt=p(-9.86,40.1,4.15,"\u4E09\u53F7\u5BA4",["7\u670814\u65E5","\u82CD\u592A / \u4E03\u5C81"],"e",3.4);u.screen=rt;let pt=d(-3.4,40.1,3.5,.5,.7,.35,o);m(-3.8,3.66,40.1,.105,.26,t.black,"x");for(let v of[39.8,40.5]){let z=f(new tn(.21,.025,8,16),o,-3.4,4.06,v);z.rotation.y=Math.PI/2}i.regInteractable(pt,"\u68C0\u67E5\u505C\u6B62\u7684\u653E\u6620\u673A",2.4,()=>{var v,z;return(z=(v=i.handlers).onDocument)==null?void 0:z.call(v,6)});for(let v of[-4.6,-6.2])for(let z of[37.4,38.9])T(v,z,2.8,c);x(-6,41,5.02,11839366,1.9,!0),x(-8,45.5,5.02,7706512,1.7,!0),i.floor(5.75,30.75,9.5,4.5,2.8,t.concrete);for(let v of[28.5,33])d(5.8,v,2.8,9.5,.14,.9,t.concrete,!0),m(5.8,3.84,v,.045,9.6,o,"x");d(10.5,30.75,2.8,.14,4.5,.9,t.concrete,!0),m(10.5,3.85,30.75,.045,4.5,o,"z");for(let v of[3,5.5,8,10.5])for(let z of[28.5,33])m(v,3.37,z,.024,1.1,o);p(9.8,32.86,3.6,"\u907F\u96E3\u7D4C\u8DEF",["\u51FA\u53E3 \u2192"],"s",.7,!0);for(let[v,z,k,H]of[[28,40,8,14],[25,57,12,17],[37,25,10,20]]){d(v,z,-5,k,10,H,t.concrete);for(let F=0;F<5;F++)for(let it=0;it<4;it++)s()<.28||d(v-k/2+1+it*(k-2)/3,z-5.04,-2+F*2.5,.8,.035,1.1,Ie({color:s()<.15?8483150:1384482}))}let gt=new ge,wt=new Float32Array(1080);for(let v=0;v<180;v++){let z=v>=90,k=z?-8+s()*16:1.4+s()*11,H=(z?6:3)+s()*9,F=(z?62:27)+s()*(z?22:8);wt.set([k,H,F,k-.035,H-.35,F],v*6)}gt.setAttribute("position",new Pe(wt,3));let Ut=new ro(gt,new Gs({color:10204862,transparent:!0,opacity:.22}));i.props.campaignDynamic.add(Ut),u.rain=Ut,d(-3.2,1.4,0,1.2,.7,.73,t.darkWood,!0);let Nt=new Ot,Ct=new Y(new bt(.034,.034,.21,10),t.pale);Ct.rotation.z=Math.PI/2,Nt.add(Ct);for(let v of[-.1,.1]){let z=new Y(new bt(.036,.036,.035,10),a);z.rotation.z=Math.PI/2,z.position.x=v,Nt.add(z)}Nt.position.set(-3.2,.78,1.4),n.add(Nt),_("fuse",Nt,"\u5907\u7528\u7194\u65AD\u5668"),p(-3.2,.13,1.35,"\u5907\u7528\u5DE5\u5177",["\u7194\u65AD\u5668 / \u914D\u7535\u95F4"],"n",.75);let Ft=d(6.75,11.4,.48,.5,.38,.25,t.darkWood);d(6.75,11.4,.73,.52,.4,.035,a);for(let v=0;v<4;v++)d(6.6+v*.1,11.34,.77,.045,.15,.025,a);i.regInteractable(Ft,"\u4FEE\u590D\u516B\u97F3\u76D2",2.7,()=>{var v,z;return(z=(v=i.handlers).onPuzzle)==null?void 0:z.call(v,"music")}),M(3,14.7,0),u.musicBox=Ft,_u(i,{box:d,mesh:f,cylinder:m,sign:p,lamp:x,desk:b,chair:T,shelf:E,closet:M,recordDocument:g,pickup:_}),yu(i,{box:d,mesh:f,cylinder:m,sign:p,lamp:x,desk:b,chair:T,shelf:E,closet:M,recordDocument:g,pickup:_}),vu(i,{box:d,mesh:f,cylinder:m,sign:p,lamp:x,desk:b,chair:T,shelf:E,closet:M,recordDocument:g,pickup:_});for(let[v,z,k,H]of[[-1.58,17,1.2,"e"],[1.58,26.2,1.25,"w"],[-8.25,17.5,4,"e"],[11.93,16.7,-1.4,"e"]])i.decalWall(v,z,k,1.1,1.8,i.tex.rust,H);p(-1.58,15.7,1.7,"\u5929\u4E95\u51FA\u53E3",["\u7531\u697C\u68AF\u524D\u5F80\u4E8C\u697C","\u505C\u7535\u65F6\u7981\u6B62\u901A\u884C"],"e",.8,!0),p(.86,29.5,4.5,"\u5929\u4E95",[],"w",.43,!0),i.exitDoor.label="\u5929\u4E95\u9632\u706B\u95E8",i.exitDoor.slab.userData.interactable.label="\u5929\u4E95\u9632\u706B\u95E8",i.exitDoor.lockedMsg="\u95E8\u88AB\u6C34\u538B\u5B89\u5168\u9501\u5C01\u4F4F\u4E86\u3002\u5148\u89E3\u9664\u5730\u4E0B\u6C34\u95F8\u3002";for(let[v,z,k]of[[13.3,20.5,-2.8],[17.5,18,-2.8],[18,24.5,-2.8],[21.7,21.8,-2.8],[22.3,26,-2.8],[-3,21.5,2.8],[-5.5,23,2.8],[3,47,2.8],[5,49.5,2.8],[-3,42,2.8],[-7,45.7,2.8]])i.monsterNodes.push({x:v,y:k,z})}function Ol(i,t){let e=i.campaign;i.props.clock&&(i.props.clock.mysterySolved=!!t.flags.cabinet),e.valves[2].visible=!!t.flags.released,e.doors.community.locked=!t.flags.power,e.communityBeacon.light.intensity=t.flags.relay?e.communityBeacon.base:0,e.communityBeacon.bulb.material.color.setHex(t.flags.relay?10472612:2634543),e.communityPlaque.material.color.setHex(t.flags.relay?5601118:2634543),e.doors.service.locked=!t.flags.invitation,e.doors.office.locked=!t.flags.power,e.doors.resident.locked=!t.flags.power,e.doors.archive.locked=!t.flags.cabinet,e.doors.pump.locked=!t.flags.memory,e.doors.workshop.locked=!t.flags.power,e.doors.west.locked=!t.flags.memory,e.doors.annex.locked=!t.flags.photo;for(let[n,s]of[[e.generatorLamp,t.flags.generator],[e.radioLamp,t.flags.relay]])n.light.intensity=s?n.base:0,n.bulb.material.color.setHex(s?10997406:2438698);e.photo.visible=!!t.flags.photo,i.exitDoor.locked=!t.flags.released;for(let[n,s]of Object.entries(e.pickups)){let r=t.items.has(n)||n==="fuse"&&t.flags.power||n==="relayFuse"&&t.flags.generator||n==="valveHandle"&&t.flags.released||["film","developer"].includes(n)&&t.flags.photo;s.mesh.visible=!r,s.interactable.disabled=r}for(let n of e.lamps)n.powered&&(n.light.intensity=t.flags.power?n.base:0,n.bulb.material.color.setHex(t.flags.power?12371891:2698537))}var ci=.2,De=2.7,Mu=2.05,rx=1.16,Do=class{constructor(t,e={},n={}){this.scene=t,this.handlers=e,this.batchStaticFixtures=n.batchStaticFixtures!==!1,this.tex=pu(),this.rng=Pt(20260814),this.stairs=[],this.colliders=[],this.doors=[],this.interactables=[],this.triggers=[],this.fluorescents=[],this.candles=[],this.tvLight=null,this.windowLights=[],this.ceilings=[],this.notePickups=[],this.props={},this.monsterNodes=[],this.ghostSpawns=[],this.ofudas=[],this.playerStart=new L(0,0,-6.4),this.materials=this._makeMaterials(),this._build(),this._buildDoors(),this._buildProps(),this._buildDecals(),this._buildLights(),bu(this),this._buildNodes(),this._initPerf()}_initPerf(){this._cullable=[];let t=new Set;for(let e of this.fluorescents)(e.mode==="dead"||e.base===0)&&t.add(e.light);this.scene.traverse(e=>{if(e.isPointLight){if(t.has(e)){e.visible=!1;return}this._cullable.push(e)}}),this.lightBudget=Math.min(14,this._cullable.length),this._budgetT=-1,this._viewDir=new L(0,0,1),this._lastCam={x:this.playerStart.x,y:this.playerStart.y,z:this.playerStart.z},this._freezeStaticMatrices(),this._applyLightBudget(this._lastCam.x,this._lastCam.y,this._lastCam.z)}_freezeStaticMatrices(){var s,r;let t=new Set,e=o=>{o&&o.traverse(a=>t.add(a))};for(let o of this.doors)e(o.pivot);let n=this.props;e((s=n.cabinet)==null?void 0:s.pivot),e((r=n.doll)==null?void 0:r.mesh),e(n.mobile),e(n.furin),e(n.campaignDynamic);for(let o of n.ropes||[])t.add(o);for(let o of this.ofudas)t.add(o);for(let o of n.batteries||[])t.add(o.halo);this.scene.traverse(o=>{t.has(o)||o.isLight||o.isCamera||(o.matrixAutoUpdate=!1,o.updateMatrix())})}registerLight(t){!t||!t.isPointLight||this._cullable.includes(t)||(this._cullable.push(t),t.visible=!1,this._applyLightBudgetNow())}unregisterLight(t){let e=this._cullable.indexOf(t);e>=0&&this._cullable.splice(e,1),t.visible=!1,this._applyLightBudgetNow()}_applyLightBudgetNow(){let t=this._lastCam;this._applyLightBudget(t.x,t.y,t.z)}_applyLightBudget(t,e,n){this._lastCam.x=t,this._lastCam.y=e,this._lastCam.z=n;let s=this.lightBudget,r=this._cullable,o=r.length;if(o<=s){for(let u=0;u<o;u++)r[u].visible=!0;return}let a=this._viewDir.x,l=this._viewDir.z,c=Math.hypot(a,l)||1,h=this._scored||(this._scored=new Array(o));for(let u=0;u<o;u++){let d=r[u],f=d.position.x-t,m=d.position.y-e,y=d.position.z-n,p=f*f+y*y+m*m*.6,g=Math.sqrt(f*f+y*y)||1,_=(f*a+y*l)/(g*c);_>.3?p*=.4:_<-.4&&p>49&&(p*=3),d.intensity<=.001&&(p+=1e7),d.visible&&(p*=.75),h[u]?(h[u].l=d,h[u].s=p):h[u]={l:d,s:p}}h.length=o,h.sort((u,d)=>u.s-d.s);for(let u=0;u<s;u++)h[u].l.visible=!0;for(let u=s;u<o;u++)h[u].l.visible=!1}_makeMaterials(){let t=this.tex;return{plaster:nt({map:t.plaster,vertexColors:!0}),wallpaper:nt({map:t.wallpaper,vertexColors:!0}),woodWall:nt({map:t.woodWall,vertexColors:!0}),woodDoor:nt({map:t.woodDoor,roughness:.8}),woodFloor:nt({map:t.woodFloor,vertexColors:!0,roughness:.72,metalness:.04}),tatami:nt({map:t.tatami,vertexColors:!0,roughness:.85}),ceiling:nt({map:t.ceiling,vertexColors:!0,roughness:1}),concrete:nt({map:t.concrete,vertexColors:!0}),rust:nt({map:t.rust,roughness:.68,metalness:.12}),fusuma:nt({map:t.fusuma,roughness:.9}),quilt:nt({map:t.quilt,roughness:.95}),brick:nt({map:t.brick,vertexColors:!0}),darkMetal:nt({color:1382428,roughness:.45,metalness:.3}),black:nt({color:724240,roughness:.9}),pale:nt({color:14077888,roughness:.85}),darkWood:nt({color:3811868,roughness:.75}),waterDark:nt({color:858644,roughness:.15,metalness:.25}),moonWin:Ie({map:t.windowMoon}),tvScreen:Ie({map:t.tvStatic}),exitSign:Ie({map:t.exitSign}),ofuda:nt({map:t.ofuda,side:ue}),photo:nt({map:t.photo,roughness:.85}),porcelain:nt({color:12896448,roughness:.45}),clothRed:nt({color:7219746,roughness:.95}),whiteMetal:nt({color:10133668,roughness:.68,metalness:.08}),tile:nt({map:t.tile,vertexColors:!0,roughness:.72}),mailbox:nt({map:t.mailbox,roughness:.6,metalness:.3})}}box(t,e,n,s,r,o,a,l={}){var u,d,f;let c=(u=l.geo)!=null&&u.bevel?fn(s,o,r):We(s,o,r,l.geo||{}),h=new Y(c,l.material||a);if(h.position.set(t,n+o/2,e),h.castShadow=(d=l.cast)!=null?d:!0,h.receiveShadow=(f=l.receive)!=null?f:!0,this.scene.add(h),l.collide!==!1){let m=Le(t,n+o/2,e,s,o,r);this.colliders.push(m),h.userData.collider=m}return h}wallX(t,e,n,s,r,o,a=[],l={}){var u,d;let c=[],h=e;for(let[f,m]of[...a].sort((y,p)=>y[0]-p[0]))f>h&&c.push([h,f]),h=Math.max(h,m);h<n&&c.push([h,n]);for(let[f,m]of c){let y=m-f;this.box(t,(f+m)/2,s,ci,y,r,o,{geo:{uv:[y/2.6,r/2.6],ao:"wall",aoStrength:(u=l.ao)!=null?u:.85,jitter:.012},collide:(d=l.collide)!=null?d:!0})}}wallZ(t,e,n,s,r,o,a=[],l={}){var u,d;let c=[],h=e;for(let[f,m]of[...a].sort((y,p)=>y[0]-p[0]))f>h&&c.push([h,f]),h=Math.max(h,m);h<n&&c.push([h,n]);for(let[f,m]of c){let y=m-f;this.box((f+m)/2,t,s,y,ci,r,o,{geo:{uv:[y/2.6,r/2.6],ao:"wall",aoStrength:(u=l.ao)!=null?u:.85,jitter:.012},collide:(d=l.collide)!=null?d:!0})}}floor(t,e,n,s,r,o,a){let l=this.box(t,e,r-.12,n,s,.12,o,{geo:{uv:a||[n/3,s/3],ao:"floor",aoStrength:.9}});return l.userData.collider.walkable=!0,l}ceil(t,e,n,s,r,o){let a=this.box(t,e,r,n,s,.12,o,{geo:{uv:[n/3,s/3],ao:"ceil",aoStrength:.95},cast:!1,collide:!0});return this.ceilings.push({x0:t-n/2,x1:t+n/2,z0:e-s/2,z1:e+s/2,y:r}),a}room(t,e,n,s,r={}){var h,u,d,f,m,y;let o=this.materials,a=(h=r.h)!=null?h:De,l=(u=r.y)!=null?u:0;this.floor((t+e)/2,(n+s)/2,e-t+.2,s-n+.2,l,r.floorMat||o.woodFloor,r.floorUV),this.ceil((t+e)/2,(n+s)/2,e-t+.2,s-n+.2,l+a,r.ceilMat||o.ceiling);let c=r.wallMat||o.plaster;r.walls!==!1&&(r.n!==!1&&this.wallZ(n,t,e,l,a,c,((d=r.gaps)==null?void 0:d.n)||[],{ao:r.ao}),r.s!==!1&&this.wallZ(s,t,e,l,a,c,((f=r.gaps)==null?void 0:f.s)||[],{ao:r.ao}),r.w!==!1&&this.wallX(t,n,s,l,a,c,((m=r.gaps)==null?void 0:m.w)||[],{ao:r.ao}),r.e!==!1&&this.wallX(e,n,s,l,a,c,((y=r.gaps)==null?void 0:y.e)||[],{ao:r.ao}))}decalFloor(t,e,n,s,r,o=0,a=.012,l=!0){let c=new oe(n,s);c.rotateX(-Math.PI/2);let h=l?nt({map:r,transparent:!0,depthWrite:!1,roughness:.92}):Ie({map:r,transparent:!0,depthWrite:!1});h.polygonOffset=!0,h.polygonOffsetFactor=-3,h.polygonOffsetUnits=-3;let u=new Y(c,h);return u.position.set(t,a,e),u.rotation.y=o,u.renderOrder=2,u.receiveShadow=!1,this.scene.add(u),u}decalWall(t,e,n,s,r,o,a,l=0,c=!0){let h=new oe(s,r),u=c?nt({map:o,transparent:!0,depthWrite:!1,roughness:.92}):Ie({map:o,transparent:!0,depthWrite:!1});u.polygonOffset=!0,u.polygonOffsetFactor=-3,u.polygonOffsetUnits=-3;let d=new Y(h,u),f=.015;return a==="n"&&d.position.set(t,n,e-f),a==="s"&&(d.position.set(t,n,e+f),d.rotation.y=Math.PI),a==="e"&&(d.position.set(t+f,n,e),d.rotation.y=Math.PI/2),a==="w"&&(d.position.set(t-f,n,e),d.rotation.y=-Math.PI/2),l&&d.rotateY(l),d.renderOrder=2,d.receiveShadow=!1,this.scene.add(d),d}_build(){let t=this.materials;this.wallX(-1.7,0,8,0,De,t.plaster,[[3.2,4.4]]),this.wallX(-1.7,8,20,0,De,t.plaster,[[10,11.2]]),this.wallX(-1.85,20,24,0,De,t.plaster,[]),this.wallX(-1.7,24,32,0,De,t.plaster,[]),this.wallX(-1.9,32,58,0,De,t.plaster,[[48.6,49.8]]),this.wallX(1.7,0,32,0,De,t.plaster,[[3,4.2],[10,11.2],[19.8,21.2]]),this.wallX(1.9,32,58,0,De,t.plaster,[[43,45]]),this.wallZ(20,-1.85,-1.7,0,De,t.plaster),this.wallZ(24,-1.85,-1.7,0,De,t.plaster),this.wallZ(32,-1.9,-1.7,0,De,t.plaster),this.wallZ(32,1.7,1.9,0,De,t.plaster),this.wallZ(58,-1.9,-1.7,0,De,t.plaster),this.wallZ(58,1.7,1.9,0,De,t.plaster),this.wallX(-1.7,58,61.7,0,De,t.plaster),this.wallX(1.7,58,61.7,0,De,t.plaster),this.floor(0,-1,3.4,2,0,t.concrete),this.floor(0,12,3.6,24,0,t.woodFloor),this.floor(0,28,3.4,8,0,t.woodFloor),this.floor(0,45,3.8,26,0,t.woodFloor),this.floor(0,59.85,3.4,3.7,0,t.concrete),this.ceil(0,12,3.6,24,2.7,t.ceiling),this.ceil(0,28,3.4,8,2.7,t.ceiling),this.ceil(0,45,3.8,26,2.7,t.ceiling),this.ceil(0,59.85,3.4,3.7,2.7,t.ceiling);let e=2.8,n=2.4;this.floor(0,30.85,2,61.7,e,t.woodFloor),this.ceil(0,31,2,62,e+n,t.ceiling),this.wallX(-1,0,61.7,e,n,t.plaster,[[20,21.4],[40,41.4],[55,56.6]]),this.wallX(1,0,61.7,e,n,t.plaster,[[30,31.2],[46,47.4]]),this.wallZ(0,-1,1,e,n,t.plaster),this.wallX(-1.7,-2,0,0,De,t.concrete),this.wallX(1.7,-2,0,0,De,t.concrete),this.ceil(0,-1,3.4,2,2.7,t.ceiling),this.wallZ(-2,-1.7,1.7,0,De,t.plaster,[[-.58,.58]]),this.box(-.95,-1.5,0,.3,.7,1,t.darkWood,{geo:{ao:"wall"}}),this.room(-8.4,-1.3,0,7.5,{n:!0,w:!0,s:!0,e:!1,wallMat:t.wallpaper}),this.room(-8.4,-1.3,7.5,15.5,{n:!0,w:!0,s:!0,e:!1,wallMat:t.wallpaper,gaps:{w:[[12.2,13.4]]}}),this.room(-13.8,-8.4,7.5,15.5,{n:!0,w:!0,s:!0,e:!1,wallMat:t.plaster,gaps:{w:[[13.8,14.8]]}}),this.room(-16.4,-14.6,13.8,14.8,{n:!0,w:!0,s:!1,e:!1,wallMat:t.concrete,h:2.2}),this.room(-17.6,-13.8,14.8,21,{n:!1,w:!0,s:!0,e:!1,wallMat:t.concrete,floorMat:t.tile,floorUV:[5,8]}),this.wallX(-13.8,15.5,21,0,De,t.concrete,[]),this.wallZ(14.8,-17.6,-13.8,0,De,t.concrete,[[-16.3,-15]]),this.room(1.3,8.4,0,8.5,{n:!0,w:!1,s:!0,e:!0,floorMat:t.tatami,floorUV:[9.5,4.7],wallMat:t.woodWall}),this.room(1.3,8.4,8.5,15.5,{n:!0,w:!1,s:!0,e:!0,wallMat:t.wallpaper}),this._buildTrim(),this._buildDetailProps()}_buildDetailProps(){let t=this.materials,e=this.tex,n=this.rng,s=(h,u,d,f)=>{let m=u-h;this.box((h+u)/2,d+(f==="s"?.008:-.008),0,m,.016,1.3,t.tile,{geo:{uv:[m/.6,1.3/.6],ao:"wall"},collide:!1,cast:!1})},r=(h,u,d,f)=>{let m=u-h;this.box(d+(f==="e"?.008:-.008),(h+u)/2,0,.016,m,1.3,t.tile,{geo:{uv:[m/.6,1.3/.6],ao:"wall"},collide:!1,cast:!1})};r(14.92,20.88,-17.5,"w"),s(-17.48,-13.92,20.9,"s"),r(15.6,20.88,-13.9,"e"),s(-17.48,-16.32,14.9,"n"),s(-14.98,-13.92,14.9,"n");let o=new Y(new bt(.012,.012,1.5,6),t.darkMetal);o.rotation.z=Math.PI/2,o.position.set(-15.8,1.95,19.9),this.scene.add(o),this.box(.92,-1.892,1.15,1.04,.018,.52,t.mailbox,{geo:{uv:[1,1],ao:"wall"},collide:!1,cast:!1});let a=new Y(new bt(.11,.09,.5,8,1,!0),nt({color:4865846,roughness:.9,side:ue}));a.position.set(-.98,.25,-.45),this.scene.add(a);for(let[h,u,d]of[[-1.02,-.48,.16],[-.95,-.42,-.12]]){let f=new Y(new bt(.022,.012,.86,6),nt({color:2894896,roughness:.7}));f.position.set(h,.44,u),f.rotation.z=d,this.scene.add(f)}this.colliders.push(Le(-.98,.25,-.45,.24,.5,.24));for(let h=0;h<3;h++){let u=-5.55+h*.78;this.box(u,12,.42,.72,.62,.1,nt({color:4538163,roughness:.95}),{geo:{ao:"none",jitter:.008},collide:!1,cast:!1}),this.box(u,12.42,.52,.7,.15,.4,nt({color:4209199,roughness:.95}),{geo:{ao:"none",jitter:.008},collide:!1,cast:!1})}let l=this.box(-5,11.98,.52,.7,.6,.05,t.quilt,{geo:{ao:"none",jitter:.02,uv:[1.5,1]},collide:!1,cast:!1});l.rotation.z=.08,l.rotation.x=.05,this.box(-9.9,12.55,.24,.34,.24,.07,t.pale,{geo:{ao:"none"},collide:!1,cast:!1});let c=this.box(-10.55,12.3,.24,.5,1,.07,t.quilt,{geo:{ao:"none",jitter:.015,uv:[1,2]},collide:!1,cast:!1});c.rotation.y=.04,this.box(-6.2,7.392,.98,3.4,.016,.6,t.tile,{geo:{uv:[3.4/.6,1],ao:"wall"},collide:!1,cast:!1}),this.box(-3.4,7.392,.98,.95,.016,.6,t.tile,{geo:{uv:[1.6,1],ao:"wall"},collide:!1,cast:!1});for(let[h,u]of[[-6.9,6.6],[-6.55,6.62]]){let d=new Y(new bt(.004,.004,.14,4),t.darkMetal);d.position.set(h,1.65,u),this.scene.add(d);let f=new Y(new bt(.11,.11,.035,10,1,!0),nt({color:3816770,roughness:.55,metalness:.2,side:ue}));f.position.set(h,1.56,u),this.scene.add(f)}this.box(3.1,12.8,0,.55,.55,.04,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1});for(let[h,u]of[[2.87,12.57],[3.33,12.57],[2.87,13.03],[3.33,13.03]])this.box(h,u,0,.04,.04,.3,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1});this.box(3.1,13.35,0,.3,.3,.04,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(3.1,13.35,.04,.04,.04,.26,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(3.1,13.48,.04,.3,.03,.3,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1});for(let h=0;h<3;h++){let u=new Y(new bt(.006,.006,.08,5),nt({color:[12595248,3170496,3186752][h],roughness:.8}));u.rotation.z=Math.PI/2,u.rotation.y=n()*3,u.position.set(2.95+h*.12,.045,12.7+n()*.2),this.scene.add(u)}}_baseboard(t,e,n,s,r=[]){let o=e;for(let[a,l]of[...r].sort((c,h)=>c[0]-h[0]))a>o&&this._baseSegZ(t,o,Math.min(a,n),s),o=Math.max(o,l);o<n&&this._baseSegZ(t,o,n,s)}_baseSegZ(t,e,n,s){let r=this.materials,o=8;for(let a=e;a<n;a+=o){let l=Math.min(o,n-a);this.box(t,a+l/2,s,.03,l,.14,r.darkWood,{geo:{ao:"wall",uv:[l/2,.2]},collide:!1,cast:!1})}}_baseboardX(t,e,n,s,r=[]){let o=e;for(let[a,l]of[...r].sort((c,h)=>c[0]-h[0]))a>o&&this._baseSegX(t,o,Math.min(a,n),s),o=Math.max(o,l);o<n&&this._baseSegX(t,o,n,s)}_baseSegX(t,e,n,s){let r=this.materials,o=8;for(let a=e;a<n;a+=o){let l=Math.min(o,n-a);this.box(a+l/2,t,s,l,.03,.14,r.darkWood,{geo:{ao:"wall",uv:[l/2,.2]},collide:!1,cast:!1})}}_wainscot(t,e,n,s=.15,r=.85){let o=this.materials,a=8;for(let l=e;l<n;l+=a){let c=Math.min(a,n-l);this.box(t,l+c/2,s,.025,c,r,o.woodWall,{geo:{ao:"wall",uv:[c/2,r/2]},collide:!1,cast:!1})}}_pipe(t,e,n,s){let r=this.materials,o=n-e,a=new bt(.035,.035,o,6);a.rotateX(Math.PI/2);let l=new Y(a,r.rust);l.position.set(t,s,(e+n)/2),l.castShadow=!0,this.scene.add(l);for(let c=e+1.5;c<n-1;c+=3)this.box(t-.02,c,s,.04,.04,.05,r.darkMetal,{geo:{ao:"none"},collide:!1,cast:!1});return l}_radiator(t,e){let n=this.materials,s=Math.sign(t),r=t-s*.125;this.box(r,e,.15,.08,1.5,.55,n.rust,{geo:{ao:"wall",uv:[1.8,.8]}});let o=nt({color:4869974,roughness:.6,metalness:.22});for(let u=0;u<7;u++)this.box(r-s*.075,e-.63+u*.21,.22,.065,.07,.46,o,{geo:{ao:"none"},collide:!1,cast:!1});this.box(r,e,.72,.08,1.4,.03,n.darkMetal,{geo:{ao:"none"},collide:!1,cast:!1});for(let u of[e-.6,e+.6])this.box(r,u,.035,.1,.09,.09,n.rust,{geo:{ao:"none"},collide:!1,cast:!1});let a=new Y(new bt(.028,.028,(s>0,.16),6),nt({color:5917250,roughness:.75,metalness:.25}));a.rotation.z=Math.PI/2,a.position.set(r+s*.11,.68,e),this.scene.add(a);let l=new Y(new bt(.042,.042,.03,6),n.darkMetal);l.rotation.z=Math.PI/2,l.position.set(r+s*.05,.68,e),this.scene.add(l);let c=new Y(new bt(.03,.03,.05,6),nt({color:8006180,roughness:.5,metalness:.2}));c.rotation.z=Math.PI/2,c.position.set(r-s*.06,.34,e-.62),this.scene.add(c);let h=new Ot;for(let u of[0,Math.PI/2]){let d=new Y(We(.008,.075,.02),nt({color:9056296,roughness:.55}));d.rotation.x=u,h.add(d)}h.position.set(r-s*.1,.34,e-.62),this.scene.add(h)}_buildTrim(){let t=this.materials;this._baseboard(-1.585,0,3.2,0),this._baseboard(-1.585,4.4,10,0),this._baseboard(-1.585,11.2,20,0),this._baseboard(-1.735,20,24,0),this._baseboard(-1.585,24,32,.16),this._baseboard(-1.775,32,48.6,0),this._baseboard(-1.775,49.8,58,0),this._baseboard(1.585,0,3,0),this._baseboard(1.585,4.2,10,0),this._baseboard(1.585,11.2,24,0,[[19.8,21.2]]),this._baseboard(1.585,24,32,0),this._baseboard(1.775,32,38,0),this._baseboard(1.775,38,46,0,[[43,45]]),this._baseboard(1.775,46,54,0),this._baseboard(1.775,54,58,0),this._wainscot(-1.775,32,48.6),this._wainscot(-1.775,49.8,58),this._wainscot(1.775,32,43),this._wainscot(1.775,45,58);for(let e of[-1.775,1.775])this.box(e,45,2.48,.03,26,.05,t.darkWood,{geo:{ao:"wall",uv:[26/2,.1]},collide:!1,cast:!1});this._baseboard(-8.285,0,7.5,0),this._baseboardX(.115,-8.4,-1.3,0),this._baseboardX(7.385,-8.4,-1.3,0),this._baseboard(-8.285,7.5,15.5,0,[[12.2,13.4]]),this._baseboardX(7.615,-8.4,-1.3,0),this._baseboard(-13.685,7.5,15.5,0,[[13.8,14.8]]),this._baseboardX(7.615,-13.8,-8.4,0),this._baseboardX(15.385,-13.8,-8.4,0),this._baseboard(-8.515,7.5,15.5,0),this._baseboardX(.115,1.3,8.4,0),this._baseboardX(8.385,1.3,8.4,0),this._baseboard(8.285,0,8.5,0),this._baseboardX(8.615,1.3,8.4,0),this._baseboard(8.285,8.5,15.5,0),this._baseboard(-.885,1.6,63.2,2.8,[[20,21.4],[40,41.4],[55,56.6]]),this._baseboard(.885,1.6,30,2.8),this._baseboard(.885,31.2,63.2,2.8,[[46,47.4]]);for(let e of[5.65,10.05,14.6,19.2,23.8,28.4,33,37.6,42.2,46.8,51.4])this.box(0,e,2.56,e>=33?3.8:3.4,.16,.14,t.darkWood,{geo:{ao:"ceil",uv:[3,.2]},collide:!1,cast:!1});for(let e of[5.6,11.6,17.6,23.6,35.6,41.6,47.6,53.6,59.6])this.box(0,e,2.8+2.26,2,.16,.14,t.darkWood,{geo:{ao:"ceil",uv:[2.5,.2]},collide:!1,cast:!1});this._pipe(-1.65,2,32,2.42),this._pipe(-1.85,32,55,2.42),this._pipe(-.87,2,55,2.8+2.12),this.decalFloor(-1.65,33,.5,.5,this.tex.blood,.3),this.box(-1.5,33.6,0,.26,.26,.2,t.darkMetal,{geo:{ao:"none"},collide:!1,cast:!1}),this._radiator(1.7,16.8),this._radiator(-1.9,40.8)}_doorFrame(t,e,n,s,r=0){let o=this.materials,a=Mu;n==="z"?(this.box(t,e,r,ci+.06,.07,a,o.darkWood,{geo:{ao:"wall"}}),this.box(t,e+s,r,ci+.06,.07,a,o.darkWood,{geo:{ao:"wall"}}),this.box(t,e+s/2,r+a,ci+.06,s,.12,o.darkWood,{geo:{ao:"wall"}})):(this.box(t,e,r,.07,ci+.06,a,o.darkWood,{geo:{ao:"wall"}}),this.box(t+s,e,r,.07,ci+.06,a,o.darkWood,{geo:{ao:"wall"}}),this.box(t+s/2,e,r+a,s,ci+.06,.12,o.darkWood,{geo:{ao:"wall"}}))}makeDoor(t){let e=this.materials,{x:n,z:s,along:r="z",width:o=rx,height:a=Mu,dir:l=1,label:c="\u95E8",locked:h=!1,lockedMsg:u="\u9501\u7740\u2026\u2026",mat:d=e.woodDoor,type:f="swing",slideOffset:m=1.15,onOpen:y=null,openAngle:p=1.72,offset:g=0,y:_=0}=t;this._doorFrame(n,s,r,o,_);let x=new Ot,b=r==="z"?n+g:n,T=r==="z"?s:s+g;x.position.set(b,_,T);let E=fn(o,a,.06);r==="z"&&E.rotateY(Math.PI/2),E.computeBoundingBox();let M=new Y(E,d===e.woodDoor?pn(this).wood:d);M.castShadow=!0,M.receiveShadow=!0,r==="z"?M.position.set(0,a/2,o/2):M.position.set(o/2,a/2,0),x.add(M),this.scene.add(x);let I=new Y(new Ne(.035,16,10),nt({color:9075258,roughness:.55,metalness:.3}));r==="z"?I.position.set(-.06,a*.54,o/2-.09):I.position.set(o/2-.09,a*.54,-.06),M.add(I),cu(this,M,o,a,r);let w={pivot:x,slab:M,knob:I,along:r,type:f,width:o,height:a,dir:l,angle:0,target:0,open:!1,locked:h,lockedMsg:u,onOpen:y,openAngle:p,slideOffset:m,slidePos:0,slideTarget:0,collider:r==="z"?Le(b,_+a/2,s+o/2,.12,a,o):Le(n+o/2,_+a/2,T,o,a,.12),label:c,enabled:!0,hinge:new L(b,_,T),localBounds:E.boundingBox.clone(),worldBounds:E.boundingBox.clone(),collisionAngle:null};this.doors.push(w);let S={mesh:M,label:c,dist:2.6,action:()=>this.toggleDoor(w),door:w};return M.userData.interactable=S,this.interactables.push(S),w}toggleDoor(t){var e,n,s,r;if(t.locked){(n=(e=this.handlers).onLocked)==null||n.call(e,t);return}t.open=!t.open,t.target=t.open?1:0,t.type==="slide"&&(t.slideTarget=t.open?-t.slideOffset:0),(r=(s=this.handlers).onDoorToggle)==null||r.call(s,t,t.open),t.open&&t.onOpen&&t.onOpen(t)}forceOpen(t){t.locked||t.open||(t.open=!0,t.target=1,t.type==="slide"&&(t.slideTarget=-t.slideOffset),t.onOpen&&t.onOpen(t))}regInteractable(t,e,n,s){let r={mesh:t,label:e,dist:n,action:s};return t.userData.interactable=r,this.interactables.push(r),r}updateDoors(t,e=null,n=[]){var o,a,l,c;let s=e?[e,...n]:n,r=(h,u,d,f,m,y)=>s.some(p=>h<p.x+.3&&u>p.x-.3&&m<p.z+.3&&y>p.z-.3&&f>p.y+.35&&d<p.y+1.67);for(let h of this.doors)if(h.type==="swing"){let u=h.angle;if(h.angle=ne(h.angle+(h.target*h.openAngle-h.angle)*Math.min(1,t*3.2),0,h.openAngle),Math.abs(h.angle-h.target*h.openAngle)<1e-5&&(h.angle=h.target*h.openAngle),h.pivot.rotation.y=h.angle*h.dir,h.collisionAngle!==h.angle){h.slab.updateWorldMatrix(!0,!1);let d=h.worldBounds.copy(h.localBounds).applyMatrix4(h.slab.matrixWorld);r(d.min.x,d.max.x,d.min.y,d.max.y,d.min.z,d.max.z)?(h.angle=u,h.pivot.rotation.y=u*h.dir,h.open||(h.open=!0,h.target=1),h.obstructed||(a=(o=this.handlers).onDoorBlocked)==null||a.call(o,h),h.obstructed=!0,h.slab.updateWorldMatrix(!0,!1),d.copy(h.localBounds).applyMatrix4(h.slab.matrixWorld)):h.obstructed=!1,h.collider={x0:d.min.x,y0:d.min.y,z0:d.min.z,x1:d.max.x,y1:d.max.y,z1:d.max.z},h.collisionAngle=h.angle}}else{let u=h.slidePos;h.slidePos+=(h.slideTarget-h.slidePos)*Math.min(1,t*3);let d=h.width/2;h.along==="z"?h.slab.position.z=d+h.slidePos:h.slab.position.x=d+h.slidePos;{h.collider=h.along==="z"?Le(h.hinge.x,h.hinge.y+h.height/2,h.hinge.z+d+h.slidePos,.12,h.height,h.width):Le(h.hinge.x+d+h.slidePos,h.hinge.y+h.height/2,h.hinge.z,h.width,h.height,.12);let f=h.collider;r(f.x0,f.x1,f.y0,f.y1,f.z0,f.z1)?(h.slidePos=u,h.open||(h.open=!0,h.target=1,h.slideTarget=-h.slideOffset),h.obstructed||(c=(l=this.handlers).onDoorBlocked)==null||c.call(l,h),h.obstructed=!0,h.along==="z"?h.slab.position.z=d+u:h.slab.position.x=d+u,h.collider=h.along==="z"?Le(h.hinge.x,h.hinge.y+h.height/2,h.hinge.z+d+u,.12,h.height,h.width):Le(h.hinge.x+d+u,h.hinge.y+h.height/2,h.hinge.z,h.width,h.height,.12)):h.obstructed=!1}}}_buildDoors(){let t=this.materials;this.makeDoor({x:-1.7,z:3.2,dir:-1,offset:.11,label:"\u53A8\u623F\u7684\u95E8"}),this.makeDoor({x:-1.7,z:10,dir:-1,offset:.11,label:"\u5BA2\u5385\u7684\u95E8"}),this.makeDoor({x:-8.4,z:12.2,width:1.14,height:2,type:"slide",mat:t.fusuma,label:"\u7EB8\u62C9\u95E8",slideOffset:1.15,offset:.12}),this.makeDoor({x:1.7,z:3,dir:1,offset:-.11,label:"\u4F5B\u95F4\u7684\u95E8"}),this.makeDoor({x:1.7,z:10,dir:1,offset:-.11,label:"\u513F\u7AE5\u623F\u7684\u95E8"}),this.makeDoor({x:-1.9,z:48.6,dir:-1,offset:.11,label:"\u6CA1\u6709\u7528\u8FC7\u7684\u95E8",onOpen:()=>{var e,n;return(n=(e=this.handlers).onDeadDoor)==null?void 0:n.call(e)}}),this.box(-2.25,48.6,0,.2,1.4,2.7,t.brick,{geo:{ao:"wall"}}),this.makeDoor({x:-.58,z:-2,along:"x",width:1.16,dir:1,offset:.11,label:"\u7384\u5173\u7684\u95E8",locked:!1}),this.exitDoor=this.makeDoor({x:1,z:30,dir:1,offset:-.11,y:2.8,label:"\u901A\u5F80\u5916\u754C\u7684\u95E8",locked:!0,lockedMsg:"\u597D\u50CF\u8FD8\u7F3A\u4E86\u4EC0\u4E48\u2026\u2026",onOpen:()=>{var e,n;return(n=(e=this.handlers).onExitOpen)==null?void 0:n.call(e)}}),this.box(1.5,30.6,2.8,1.3,1.5,.15,t.concrete,{geo:{ao:"floor"}}),this.makeDoor({x:-13.8,z:13.8,width:.9,height:2,dir:1,offset:.11,label:"\u58C1\u6A71"}),this.box(-14.6,13.86,0,.12,.1,2.1,t.darkWood,{geo:{ao:"wall"}}),this.box(-14.25,13.86,0,.7,.06,2.1,t.darkWood,{geo:{ao:"wall"}}),this.box(-14.25,14.3,2.1,.7,1,.1,t.darkWood,{geo:{ao:"wall"}}),this.box(-13.85,14.3,2.1,.2,1,.6,t.darkWood,{geo:{ao:"wall"}}),this.floor(-14.25,14.25,.7,.9,0,t.woodFloor)}_buildProps(){let t=this.materials,e=this.tex,n=this.rng,s=2.8;this.box(-6.2,7.04,0,3.4,.62,.92,t.darkWood,{geo:{ao:"wall",uv:[4,1]}}),this.box(-6.2,7.01,.92,3.5,.7,.06,nt({color:6514271,roughness:.78,metalness:.12}),{geo:{ao:"none"}});let r=[],o=(st,lt,ae,qe,$n,jn,Un=t.darkWood)=>{let rr=this.box(st,lt,ae,qe,$n,jn,Un,{geo:{bevel:!0}});return r.push(rr),rr};for(let st of[-7.77,-5.43])o(st,7.06,1.6,.06,.6,.62);for(let st of[1.6,2.17])o(-6.6,7.06,st,2.4,.6,.05);o(-6.6,7.345,1.65,2.28,.03,.52),o(-6.6,7.09,1.89,2.28,.5,.035);let a=new Ot;a.position.set(-7.735,1.65,6.744);let l=new Y(fn(1.09,.5,.04),t.darkWood);l.position.set(.545,.25,0),a.add(l);let c=new Y(fn(.08,.025,.028),pn(this).brass);c.position.set(.95,.23,-.035),a.add(c),this.scene.add(a),o(-6.01,6.744,1.65,1.09,.04,.5),o(-6.42,6.706,1.87,.08,.035,.025,pn(this).brass),this.props.cabinet={pivot:a,angle:0,openedOnce:!1,carcass:r},this.box(-7.7,2.85,0,.85,.85,1.75,t.rust,{geo:{ao:"wall"}}),this.props.fridgeDoor=this.box(-7.7,3.29,.025,.8,.06,1.7,t.darkMetal,{geo:{ao:"none"},collide:!1});let h=this.box(-5.3,4.6,.74,1.4,.8,.065,t.darkWood,{geo:{bevel:!0}}),u=[];for(let st of[-.59,.59])for(let lt of[-.29,.29])u.push(this.box(-5.3+st,4.6+lt,0,.065,.065,.74,t.darkWood,{geo:{bevel:!0},collide:!1}));this.props.kitchenTable={top:h,legs:u};for(let[st,lt]of[[3.55,-1],[5.65,1]]){this.box(-5.3,st,.42,.51,.51,.065,t.darkWood,{geo:{bevel:!0}});for(let ae of[-.2,.2])for(let qe of[-.2,.2])this.box(-5.3+ae,st+qe,0,.045,.045,.42,t.darkWood,{geo:{bevel:!0},collide:!1});for(let ae of[-.23,.23])this.box(-5.3+ae,st+lt*.23,.46,.04,.045,.53,t.darkWood,{geo:{bevel:!0},collide:!1});for(let ae of[.59,.77,.95])this.box(-5.3,st+lt*.23,ae,.46,.045,.045,t.darkWood,{geo:{bevel:!0},collide:!1})}this.box(-5.5,7,.98,.26,.26,.22,t.darkMetal,{geo:{ao:"none"}}),this.box(-5.8,7.2,.95,.45,.26,.05,t.darkMetal,{geo:{ao:"none"},collide:!1}),this.box(-5.8,7.2,.99,.6,.4,.015,t.darkMetal,{geo:{ao:"none"},collide:!1});let d=new Y(new bt(.022,.022,.3,6),t.darkMetal);d.position.set(-5.72,1.14,7.31);let f=new Y(new bt(.018,.018,.34,6),t.darkMetal);f.rotation.x=Math.PI/2,f.position.set(-5.72,1.26,7.21),this.scene.add(d,f),this.box(-3.4,7.06,0,.95,.62,.92,t.whiteMetal,{geo:{ao:"wall"}});for(let[st,lt]of[[-3.55,7.05],[-3.25,7.05],[-3.55,7.29],[-3.25,7.29]]){let ae=new Y(new bt(.07,.07,.02,8),t.darkMetal);ae.position.set(st,.93,lt),this.scene.add(ae)}this.box(-3.4,7.25,1.72,1,.42,.28,t.darkMetal,{geo:{ao:"wall"},collide:!1}),this.box(-3.4,7.25,2,.24,.24,.4,t.rust,{geo:{ao:"none"},collide:!1}),this.box(-6.7,6.6,1.72,1.7,.28,.04,t.darkWood,{geo:{ao:"none"},collide:!1});let m=[4876880,6965808,4868704,6318666];for(let st=0;st<4;st++){let lt=new Y(new bt(.035,.03,.12,6),nt({color:m[st],roughness:.3,metalness:.2}));lt.position.set(-7.25+st*.32,1.8,6.6),this.scene.add(lt)}let y=this.box(-8.22,4,1.45,.16,.1,.24,nt({color:4016706,roughness:.6}),{geo:{ao:"none"},collide:!1});this.props.phone=y,this.regInteractable(y,"\u7535\u8BDD",2,()=>{var st,lt;return(lt=(st=this.handlers).onPhone)==null?void 0:lt.call(st)}),this.decalFloor(-2.6,5.6,.42,.56,e.news,n()*3),this.decalFloor(-6.4,1.6,.42,.56,e.news,.7);let p=nt({color:13223092,roughness:.55});for(let[st,lt,ae]of[[-5.9,7.16,.09],[-5.7,7.26,.11],[-5.86,7.3,.08]]){let qe=new Y(new bt(ae,ae*.72,.055,8),p);qe.position.set(st,.99,lt),this.scene.add(qe)}let g=new Y(We(.012,.012,.24),nt({color:10124111,roughness:.85}));g.position.set(-5.78,1.005,7.2),g.rotation.y=.5,this.scene.add(g);let _=new Y(new bt(.11,.1,.13,10),t.darkMetal);_.position.set(-3.55,1.005,7.05),this.scene.add(_);let x=new Y(new bt(.14,.15,.17,10),t.whiteMetal);x.position.set(-6.95,1.065,7.15),this.scene.add(x);let b=new Y(new bt(.145,.145,.02,10),t.darkMetal);b.position.set(-6.95,1.16,7.15),this.scene.add(b);let T=new Y(new bt(.028,.032,.15,6),nt({color:3023128,roughness:.4}));T.position.set(-5.15,1.055,7.15),this.scene.add(T),this.box(-6.5,15.15,0,1.1,.45,.45,t.darkWood,{geo:{ao:"wall"}});let E=this.box(-6.5,15.25,.45,1,.45,.72,t.darkMetal,{geo:{ao:"none"}}),M=new Y(new oe(.86,.6),t.tvScreen);M.position.set(-6.5,1.05,15.02),M.rotation.y=Math.PI,this.scene.add(M),this.props.tv={body:E,screen:M,on:!1,timer:0},this.regInteractable(E,"\u7535\u89C6",2.4,()=>{var st,lt;return(lt=(st=this.handlers).onTV)==null?void 0:lt.call(st)}),this.box(-4.8,12,0,2.4,.75,.42,nt({color:4867128,roughness:.95}),{geo:{ao:"wall"}}),this.box(-4.8,12.62,.42,2.4,.24,.5,nt({color:3946542,roughness:.95}),{geo:{ao:"none"}}),this.box(-5.95,12.2,0,.16,.6,.55,t.darkWood,{geo:{ao:"none"}}),this.box(-3.65,12.2,0,.16,.6,.55,t.darkWood,{geo:{ao:"none"}});let I=this.box(-4.9,14,.32,1.1,.6,.06,t.darkWood,{geo:{bevel:!0}}),w=[];for(let st of[-.45,.45])for(let lt of[-.21,.21])w.push(this.box(-4.9+st,14+lt,0,.055,.055,.32,t.darkWood,{geo:{bevel:!0},collide:!1}));this.props.coffeeTable={top:I,legs:w},this.tvLight=new Ve(9418444,0,7,1.8),this.tvLight.position.set(-6.5,1.4,14.2),this.scene.add(this.tvLight);for(let st of[-.25,.25]){let lt=new Y(new bt(.008,.008,.5,4),t.darkMetal);lt.position.set(-6.5+st,1.38,15.25),lt.rotation.z=st>0?-.5:.5,lt.rotation.x=.35,this.scene.add(lt)}let S=new Y(new oe(.86,.6),Ie({map:e.tvFace,transparent:!0}));S.position.set(-6.5,1.05,14.99),S.rotation.y=Math.PI,S.visible=!1,this.scene.add(S),this.props.tvFace=S;let R=[],U=(st,lt,ae,qe,$n,jn)=>{let Un=this.box(st,lt,ae,qe,$n,jn,t.darkWood,{geo:{bevel:!0},collide:!1});return R.push(Un),Un},B=Le(-8.15,.95,10.3,.3,1.9,2.2);this.colliders.push(B),U(-8.265,10.3,0,.04,2.2,1.9);for(let st of[9.23,11.37])U(-8.14,st,0,.28,.055,1.9);for(let st of[0,.65,1.25,1.845])U(-8.14,10.3,st,.28,2.2,.055);this.props.bookcase={parts:R,collider:B};let D=[6959136,2117738,3824176,6969888,4862032,5263440,7356448,2767434];for(let st of[.71,1.31])for(let lt=0;lt<8;lt++){let ae=.045+n()*.05;this.box(-8.115,9.42+lt*.25,st,.22,ae,.2+n()*.13,nt({color:D[(lt*3+(st>1?1:0))%8],roughness:.9}),{geo:{ao:"none"},collide:!1,cast:!1})}for(let st=0;st<3;st++){let lt=this.box(-8.03,9.8+st*.3,1.93,.24,.05,.035,nt({color:D[st+2],roughness:.9}),{geo:{ao:"none"},collide:!1,cast:!1});lt.rotation.z=.2+n()*.4}this.decalFloor(-5.2,11.8,2.6,3.2,e.rug,.05),this.box(-3.1,13.9,0,.26,.26,.04,t.darkMetal,{geo:{ao:"none"},collide:!1});let O=new Y(new bt(.02,.02,1.5,6),t.darkMetal);O.position.set(-3.1,.77,13.9);let X=nt({color:9071168,roughness:.9,side:ue}),$=nt({color:13215850,emissive:16756838,emissiveIntensity:.55,roughness:.9,side:ue}),Z=new Y(new Si(.16,.3,10,1,!0),X);Z.position.set(-3.1,1.66,13.9),this.scene.add(O,Z);let q=new Ve(16756838,0,6,1.9);q.position.set(-3.1,1.6,13.9),this.scene.add(q),this.props.lamp={light:q,on:!1,shade:Z,shadeOff:X,shadeOn:$},this.regInteractable(O,"\u843D\u5730\u706F",2,()=>{var st,lt;return(lt=(st=this.handlers).onLamp)==null?void 0:lt.call(st)});for(let[st,lt]of[[-6.4,7.615],[-3.4,7.615]])this.decalWall(st,lt,1.55,.34,.42,e.photo,"s"),this.box(st-.185,lt+.015,1.55,.03,.02,.5,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(st+.185,lt+.015,1.55,.03,.02,.5,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(st,lt+.015,1.335,.34,.02,.03,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(st,lt+.015,1.765,.34,.02,.03,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1});let Q=this.decalWall(-4.9,7.63,1.55,.34,.42,e.photo,"s");Q.rotation.z=Math.PI,this.box(-4.9-.185,7.645,1.55,.03,.02,.5,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(-4.9+.185,7.645,1.55,.03,.02,.5,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(-4.9,7.645,1.335,.34,.02,.03,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(-4.9,7.645,1.765,.34,.02,.03,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(-7.7,14.6,0,.32,.22,.14,t.darkWood,{geo:{ao:"wall"}});let ot=new Y(new bt(.006,.006,.4,4),t.darkMetal);ot.position.set(-7.7,.34,14.6),this.scene.add(ot);let tt=this.decalWall(-8.28,14,1,.55,.75,e.silhouette,"e",0,!1);tt.visible=!1,this.props.silhouette=tt,this.box(-10.7,12.3,0,1.8,1.15,.24,t.quilt,{geo:{ao:"wall",uv:[2,2]}}),this.box(-9.9,12.3,.24,.4,.3,.08,t.pale,{geo:{ao:"none"}}),this.box(-9.15,9.55,0,.5,.45,.55,t.darkWood,{geo:{ao:"wall"}});let G=new Y(new oe(.2,.26),nt({map:e.journal,side:ue,roughness:.92,emissive:16777215,emissiveIntensity:.4}));G.position.set(-9.15,.56,9.55),G.rotation.x=-Math.PI/2,this.scene.add(G);let rt=new Ve(16756832,.4,2.5,2);rt.position.set(-9.15,.7,9.55),this.scene.add(rt),this.notePickups.push({mesh:G,id:1}),this.regInteractable(G,"\u65E7\u624B\u8BB0",3.5,()=>{var st,lt;return(lt=(st=this.handlers).onNote)==null?void 0:lt.call(st,1)}),this.box(-11.6,9.3,0,.5,.9,.72,t.darkWood,{geo:{ao:"wall"}}),this.box(-11.6,9.3,.72,.54,.94,.04,t.darkWood,{geo:{ao:"none"}}),this.box(-11.6,9.95,0,.3,.3,.42,t.darkWood,{geo:{ao:"none"}});let pt=new Y(new oe(.6,1.3),Ie({map:e.mirror}));pt.position.set(-13.695,1.5,9.5),pt.rotation.y=Math.PI/2,this.scene.add(pt),this.regInteractable(pt,"\u955C\u5B50",2,()=>{var st,lt;return(lt=(st=this.handlers).onMirror)==null?void 0:lt.call(st)});let gt=new Y(new bt(.015,.015,.75,5),t.darkMetal);gt.rotation.z=Math.PI/2,gt.position.set(-14.2,1.85,14.3),this.scene.add(gt);let wt=[5917290,4872794,6965834];for(let st=0;st<3;st++)this.box(-14.53,14.05+st*.24,1.32,.05,.42,.95,nt({color:wt[st],roughness:.95}),{geo:{ao:"none"},collide:!1,cast:!0});this.decalWall(-11.2,7.615,1.48,.36,1.1,e.scroll,"n"),this.box(-11.2,7.635,2,.44,.045,.032,t.darkWood,{geo:{ao:"none"},collide:!1}),this.box(-11.2,7.635,.9,.44,.045,.032,t.darkWood,{geo:{ao:"none"},collide:!1});let Ut=nt({color:8219218,roughness:.92});this.box(-13.2,8.1,0,.52,.44,.36,Ut,{geo:{ao:"wall"}});let Nt=this.box(-13.12,8.16,.36,.42,.36,.3,Ut,{geo:{ao:"none"}});Nt.rotation.y=.16,this.box(-12.5,11.4,0,.5,.5,.09,nt({color:5913146,roughness:.95}),{geo:{ao:"none"}}),uu(this);let Ct=[],Ft=(st,lt,ae,qe,$n,jn)=>{let Un=this.box(st,lt,ae,qe,$n,jn,t.whiteMetal,{geo:{bevel:!0},collide:!1});return Ct.push(Un),Un};Ft(-13.945,15.5,1.5,.025,.6,.7);for(let st of[15.215,15.785])Ft(-14.02,st,1.5,.18,.03,.7);for(let st of[1.5,1.82,2.17])Ft(-14.02,15.5,st,.18,.6,.03);this.colliders.push(Le(-14.02,1.85,15.5,.18,.7,.6));let v=new Ot;v.position.set(-14.115,1.535,15.24);let z=new Y(fn(.025,.62,.52),t.whiteMetal);z.position.set(0,.31,.26),v.add(z);let k=new Y(new oe(.45,.54),pn(this).darkGlass);k.rotation.y=-Math.PI/2,k.position.set(-.014,.31,.26),v.add(k),v.rotation.y=-.55,this.scene.add(v),this.props.medicineCabinet={parts:Ct,door:v};let H=this.box(-14.5,20.3,0,.62,.62,.92,t.whiteMetal,{geo:{ao:"wall"}});this.props.washer=H,this.regInteractable(H,"\u6D17\u8863\u673A",2.2,()=>{var st,lt;return(lt=(st=this.handlers).onWasher)==null?void 0:lt.call(st)});let F=new Y(new bt(.24,.24,.03,10),nt({color:10133668,roughness:.6,metalness:.15}));F.position.set(-14.5,.935,20.3),F.rotation.x=.06,this.scene.add(F),this.box(-14.5,20.52,.92,.56,.1,.1,t.darkMetal,{geo:{ao:"none"},collide:!1});let it=new Y(new bt(.17,.14,.36,8),nt({color:9082016,roughness:.85}));it.position.set(-14.75,.18,19.5),this.scene.add(it);let et=new Y(new Ne(.14,7,5),nt({color:5921382,roughness:.95}));et.position.set(-14.75,.37,19.5),et.scale.y=.5,this.scene.add(et),this.box(7.55,4.8,0,.85,.75,.5,t.darkWood,{geo:{ao:"wall"}}),this.box(7.55,4.8,.5,.8,.7,.85,t.darkWood,{geo:{ao:"wall"}}),this.box(7.55,4.8,1.35,.84,.74,.1,t.darkWood,{geo:{ao:"none"}});let C=new Y(new oe(.2,.26),t.photo);C.position.set(7.145,1.05,4.8),C.rotation.y=-Math.PI/2,this.scene.add(C);let A=this._candle(7.15,4.8,1.59);this._candle(7.95,4.8,1.59),this.box(7.55,4.8,1.46,.09,.09,.1,nt({color:9075258,roughness:.45,metalness:.3}),{geo:{ao:"none"},collide:!1}),this.regInteractable(A,"\u6447\u54CD\u94C3\u94DB",2.2,()=>{var st,lt;return(lt=(st=this.handlers).onBell)==null?void 0:lt.call(st)});let V=new Y(new oe(.24,.3),nt({map:e.news,side:ue,roughness:.92,emissive:16777215,emissiveIntensity:.4}));V.position.set(7.55,1.47,5.1),V.rotation.x=-Math.PI/2+.2,this.scene.add(V);let ct=new Ve(16756832,.4,2.5,2);ct.position.set(7.55,1.6,5.1),this.scene.add(ct),this.notePickups.push({mesh:V,id:2}),this.regInteractable(V,"\u62A5\u7EB8\u6587\u7AE0",3.5,()=>{var st,lt;return(lt=(st=this.handlers).onNote)==null?void 0:lt.call(st,2)});for(let st of[3.4,4.1,4.8])this._ofuda(2.3,st,2.55);for(let[st,lt]of[[5.9,4.2],[5.9,5.4]])this.box(st,lt,0,.55,.55,.09,t.clothRed,{geo:{ao:"wall"}});for(let[st,lt]of[[7.3,4.6],[7.55,4.55],[7.8,4.65]]){let ae=new Y(new bt(.045,.03,.05,6),nt({color:3813432,roughness:.5,metalness:.2}));ae.position.set(st,1.475,lt),this.scene.add(ae)}this.decalWall(8.285,4.8,1.55,.38,1.15,e.scroll,"w"),this.box(5.2,15,0,1.9,.8,.32,t.quilt,{geo:{ao:"wall",uv:[2,1]}}),this.box(4.35,15,.32,.3,.25,.08,t.pale,{geo:{ao:"none"}}),this.box(2,15,0,.8,.5,.45,t.darkWood,{geo:{ao:"wall"}});let ht=[11546672,3172528,4235336,13676592];for(let st=0;st<6;st++){let lt=.1+n()*.08;this.box(1.7+n()*3.5,9.2+n()*2.5,lt/2,lt,lt,lt,nt({color:ht[st%4],roughness:.8}),{geo:{ao:"none"},collide:!1})}let at=this._doll(7.9,9.9);this.props.doll=at,this.regInteractable(at.mesh,"\u4EBA\u5076",1.8,()=>{var st,lt;return(lt=(st=this.handlers).onDoll)==null?void 0:lt.call(st)}),this.box(7.75,9.1,0,1.1,.5,.72,t.darkWood,{geo:{ao:"wall"}});let St=new Y(new oe(.24,.3),nt({map:e.drawing,side:ue,roughness:.92,emissive:16777215,emissiveIntensity:.4}));St.position.set(7.75,.73,9.1),St.rotation.x=-Math.PI/2,this.scene.add(St);let mt=new Ve(16756832,.4,2.5,2);mt.position.set(7.75,.85,9.1),this.scene.add(mt),this.notePickups.push({mesh:St,id:3}),this.regInteractable(St,"\u5B69\u5B50\u7684\u753B",3.5,()=>{var st,lt;return(lt=(st=this.handlers).onNote)==null?void 0:lt.call(st,3)}),this.decalWall(8.285,12.2,1.4,.4,.5,e.drawing,"w",.05),this.box(7.95,14.4,0,.65,1.1,2.05,t.darkWood,{geo:{ao:"wall"}}),this.box(7.95,13.82,0,.62,.06,2.05,t.darkWood,{geo:{ao:"none"},collide:!1}),this.box(4.4,9.1,0,1.1,.65,.9,t.darkWood,{geo:{ao:"wall"}}),this.box(4.4,9.1,.28,1.02,.57,.08,t.quilt,{geo:{ao:"none"}});for(let[st,lt]of[[3.88,8.8],[4.92,8.8],[3.88,9.4],[4.92,9.4]]){let ae=new Y(new bt(.02,.02,.9,5),t.darkWood);ae.position.set(st,.45,lt),this.scene.add(ae)}this.box(4.4,9.1,.82,1.14,.06,.04,t.darkWood,{geo:{ao:"none"},collide:!1}),this.box(4.4,9.1,.82,.06,.69,.04,t.darkWood,{geo:{ao:"none"},collide:!1});let Tt=new Ot,zt=new Y(new bt(.006,.006,.5,4),t.darkMetal);zt.rotation.z=Math.PI/2;let Vt=zt.clone();Vt.rotation.z=-Math.PI/2,Tt.add(zt,Vt);let ut=Ie({color:15262936,side:ue});for(let st=0;st<5;st++){let lt=new Y(new Si(.03,.07,4),ut);lt.position.set(dt(-.2,.2),-.22-dt(0,.1),dt(-.2,.2)),lt.rotation.z=Math.PI,Tt.add(lt)}Tt.position.set(4.4,1.95,9.1),this.scene.add(Tt),this.props.mobile=Tt;let Jt=new Ot;Jt.position.set(2.3,2.5,13);let Kt=new Y(new bt(.004,.004,.42,4),t.darkMetal);Kt.position.y=-.21,Jt.add(Kt);let Ht=nt({color:12109004,roughness:.25,metalness:.2}),Dt=new Y(new bt(.05,.032,.055,8),Ht);Dt.position.y=-.45,Jt.add(Dt);let Rt=new Y(new bt(.005,.005,.1,4),t.darkMetal);Rt.position.y=-.53,Jt.add(Rt);let Wt=new Y(new Ne(.012,5,4),t.darkMetal);Wt.position.y=-.59,Jt.add(Wt);let le=nt({color:14209212,roughness:.9,side:ue});for(let st=0;st<3;st++){let lt=st/3*Math.PI*2+.5,ae=new Y(We(.028,.16,.004),le);ae.position.set(Math.cos(lt)*.035,-.66,Math.sin(lt)*.035),ae.rotation.y=-lt,Jt.add(ae)}this.scene.add(Jt),this.props.furin=Jt;let he=new Ot,Xt=nt({color:8018490,roughness:.95}),xt=new Y(We(.22,.3,.18),Xt);xt.position.y=.18;let N=new Y(We(.16,.16,.16),Xt);N.position.y=.4,he.add(xt,N);for(let st of[-.14,.14]){let lt=new Y(We(.08,.16,.08),Xt);lt.position.set(st,.24,0),he.add(lt)}for(let st of[-.07,.07]){let lt=new Y(We(.1,.1,.12),Xt);lt.position.set(st,.05,.03),he.add(lt)}let Et=nt({color:1315344});for(let st of[-.05,.05]){let lt=new Y(new Ne(.012,4,3),Et);lt.position.set(st,.43,.075),he.add(lt)}he.position.set(2.1,0,12.6),he.rotation.y=.4,this.scene.add(he),this.decalWall(8.285,9.4,.75,.16,1.55,e.growth,"w"),this.dollSpots=[{x:7.9,z:9.9,ry:Math.PI},{x:2,z:15,ry:0},{x:5,z:11.2,ry:Math.PI/2},{x:.45,z:11.4,ry:-Math.PI/2},{x:7,z:13.8,ry:Math.PI}],this.decalFloor(-.5,6.2,.42,.56,e.news,.4),this.decalFloor(.6,19.2,.42,.56,e.news,1.2),this.decalFloor(-.4,33.2,.42,.56,e.news,2),this.decalFloor(.3,47.2,.42,.56,e.news,.8);let Mt=this.box(-1.2,17.2,0,.45,.45,.5,t.darkWood,{geo:{ao:"none"}});Mt.rotation.z=Math.PI/2,Mt.position.y=.24;let Lt=new Ot,kt=new bt(.32,.32,.05,7),fe=nt({color:1711134,roughness:.65,metalness:.25});for(let st of[-.45,.45]){let lt=new Y(kt,fe);lt.rotation.x=Math.PI/2,lt.position.set(st,.32,0),Lt.add(lt)}let de=new Y(new ee(1,.07,.07),nt({color:6958116,roughness:.55,metalness:.15}));de.position.set(0,.62,0),Lt.add(de);let Re=new Y(new ee(.35,.06,.06),nt({color:5593696,roughness:.5,metalness:.3}));Re.position.set(.55,.85,0),Lt.add(Re),Lt.position.set(-1.3,0,21.5),Lt.rotation.y=.2,Lt.rotation.z=.06,this.scene.add(Lt),this.colliders.push(Le(-1.3,.5,21.5,1.3,1,.5)),this.props.bike=Lt,this.decalWall(-1.585,30,1.4,1.3,.65,e.graffiti,"e"),this._ofuda(1.55,3.6,2.5);let Fe=new Y(new ee(.55,.28,.06),t.exitSign);Fe.position.set(0,2.42,57.4),this.scene.add(Fe);let ce=new Y(new bt(.15,.15,.03,12),nt({map:e.clock,roughness:.6}));ce.position.set(1.575,1.7,26.5),ce.rotation.z=Math.PI/2,this.scene.add(ce);let Xe=this.decalWall(1.585,25.4,1.58,.3,.38,e.photo,"w");Xe.rotation.z=-.09,this.props.clock={mesh:ce,state:"normal",timer:dt(30,70)},this._window(-.9,20,3.55,"e"),this.decalFloor(0,30.6,.8,1.2,e.blood,.4,.012),this.decalWall(1.575,29.4,3.2,.3,.6,e.handprint,"w",.2),this.decalWall(1.575,31.5,3.4,.4,.5,e.blood,"w",.1);let ln=new Ve(4169818,.9,4,1.9);ln.position.set(.6,3.3,30.6),this.scene.add(ln),this.props.ropes=[];let Es=this.decalWall(-1.765,49.2,1.05,1.1,2,e.eyesWall,"e",0,!1);Es.visible=!1,this.props.eyesWall=Es,this.decalWall(1.615,28,.75,.32,1.6,e.blood,"w",.12);for(let[st,lt,ae]of[[-1.5,43.2,.3],[1.6,41.7,-.4],[-1.5,44,.7]]){let qe=this.box(st,lt,0,.55,.5,.5,nt({color:7232056,roughness:.9}),{geo:{ao:"wall"}});qe.rotation.y=ae}this.box(.35,38.6,.02,.8,.55,.03,t.ceiling,{geo:{ao:"none"},collide:!1}),this.box(-.4,38.9,.02,.25,.18,.03,t.ceiling,{geo:{ao:"none"},collide:!1}),this.box(.75,38.35,.015,.15,.2,.025,t.ceiling,{geo:{ao:"none"},collide:!1}),this._window(-8.3,2.6,1,"e"),this._window(-8.3,14,1,"e",{dark:!0}),this._window(-13.7,10.75,1,"e"),this.decalFloor(-13.4,15,.9,1.1,e.blood,.1),this._battery(.62,-.15),this._battery(-5.05,13.05),this._battery(-.55,33.6)}_battery(t,e,n=.042){var u;let s=new Ot,r=new Y(new bt(.032,.032,.11,8),nt({color:7624250,roughness:.55,metalness:.35}));r.rotation.z=Math.PI/2,s.add(r);let o=new Y(new bt(.033,.033,.028,8),Ie({color:14208942}));o.rotation.z=Math.PI/2,o.position.x=.03,s.add(o);let a=new Y(new bt(.014,.014,.012,8),nt({color:11119012,roughness:.4,metalness:.5}));a.rotation.z=Math.PI/2,a.position.x=.058,s.add(a);let l=new Ve(6332671,.7,3.5,2);l.position.set(0,.05,0),s.add(l);let c=new Y(new tn(.12,.012,6,16),Ie({color:6332671,transparent:!0,opacity:.8}));c.rotation.x=Math.PI/2,c.position.y=.01,s.add(c),s.position.set(t,n,e),s.rotation.y=dt(0,Math.PI*2),this.scene.add(s);let h=this.regInteractable(s,"\u624B\u7535\u7535\u6C60",3.5,()=>{var d,f;return(f=(d=this.handlers).onBattery)==null?void 0:f.call(d,s)});((u=this.props).batteries||(u.batteries=[])).push({mesh:s,interactable:h,glow:l,halo:c,phase:dt(0,6.28)})}_candle(t,e,n){this.box(t,e,n-.14,.05,.05,.14,nt({color:13617328,roughness:.9}),{geo:{ao:"none"},collide:!1});let s=new Y(new Ne(.022,5,4),Ie({color:16760928}));s.position.set(t,n+.02,e),this.scene.add(s);let r=new Ve(16747066,1.8,4,1.9);return r.position.set(t,n+.06,e),this.scene.add(r),this.candles.push({light:r,base:1.8,phase:dt(0,6.28)}),s}_ofuda(t,e,n){let s=new Y(new bt(.003,.003,.24,4),nt({color:2762788,roughness:.9}));s.position.set(t,n,e);let r=new Y(new oe(.09,.24),this.materials.ofuda);return r.position.set(t,n-.24,e),this.scene.add(s),this.scene.add(r),this.ofudas.push(r),r}_window(t,e,n,s,r={}){var p,g;let o=this.materials,a=!!r.dark,l=(p=r.w)!=null?p:.8,c=(g=r.h)!=null?g:.8,h=a?nt({color:461326,roughness:.35,metalness:.1}):o.moonWin,u=new Y(new oe(l,c),h),d=s==="e"?.02:s==="w"?-.02:0,f=s==="n"?-.02:s==="s"?.02:0;if(u.position.set(t+d,n,e+f),s==="e"?u.rotation.y=Math.PI/2:s==="w"?u.rotation.y=-Math.PI/2:s==="s"&&(u.rotation.y=Math.PI),this.scene.add(u),!a){let _=Ie({map:this.tex.rainStreaks,transparent:!0,opacity:.55,depthWrite:!1,side:ue}),x=new Y(new oe(l,c),_),b=s==="e"?.005:s==="w"?-.005:0,T=s==="n"?-.005:s==="s"?.005:0;x.position.set(u.position.x+b,u.position.y,u.position.z+T),x.rotation.copy(u.rotation),x.renderOrder=3,this.scene.add(x)}let m=nt({color:790034,roughness:.65,metalness:.25}),y=nt({color:3024416,roughness:.85});if(a&&(s==="e"||s==="w")){let _=t+(s==="e"?.025:-.025),x=nt({color:3752779,roughness:.4});this.box(_,e-.1,n+.08,.02,.62,.018,x,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(_,e+.14,n-.06,.02,.5,.014,x,{geo:{ao:"none"},collide:!1,cast:!1})}if(!a){let _=new Ve(6982836,.8,7,1.9);_.position.set(t+(s==="e"?.6:s==="w"?-.6:0),n,e+(s==="n"?.6:s==="s"?-.6:0)),this.scene.add(_),this.windowLights.push(_)}if(s==="e"||s==="w"){let _=t+(s==="e"?.03:-.03);this.box(_,e,n+c/2-.03,.05,l+.14,.05,y,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(_,e,n-c/2+.03,.05,l+.14,.05,y,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(_,e-l/2-.02,n,.05,.05,c-.01,y,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(_,e+l/2+.02,n,.05,.05,c-.01,y,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(_,e,n,.04,.05,c-.01,y,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(_,e,n-c*.23,.05,l-.01,.04,y,{geo:{ao:"none"},collide:!1,cast:!1});for(let x of[-l*.325,0,l*.325]){let b=new Y(new ee(.02,c-.05,.02),m);b.position.set(t+(s==="e"?.045:-.045),n,e+x),this.scene.add(b)}this.box(t+(s==="e"?.05:-.05),e,n-.41,.1,.86,.04,o.darkWood,{geo:{ao:"none"},collide:!1,cast:!1})}else{let _=e+(s==="n"?-.03:.03);this.box(t,_-.37,n,.94,.05,.05,y,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(t,_+.37,n,.94,.05,.05,y,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(t-.42,_,n,.05,.05,c-.01,y,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(t+.42,_,n,.05,.05,c-.01,y,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(t,_,n,.79,.04,.05,y,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(t,_,n-c*.23,.79,.05,.04,y,{geo:{ao:"none"},collide:!1,cast:!1});for(let x of[-l*.325,0,l*.325]){let b=new Y(new ee(.02,c-.05,.02),m);b.position.set(t+x+(s==="n"?.015:-.015),n,e+(s==="n"?-.045:.045)),this.scene.add(b)}this.box(t+(s==="n"?.045:-.045),e+(s==="n"?.03:-.03),n-.41,.86,.1,.04,o.darkWood,{geo:{ao:"none"},collide:!1,cast:!1})}return u}_doll(t,e){let n=new Ot,s=nt({color:14209732,roughness:.85}),r=new Y(We(.14,.24,.1,{jitter:.004}),s);r.position.y=.12,n.add(r);let o=new Y(We(.13,.13,.12,{jitter:.01}),s);o.position.y=.32,n.add(o);let a=new Y(new oe(.1,.1),Ie({map:this.tex.dollFace}));a.position.set(0,0,.062),o.add(a);let l=new Y(We(.18,.12,.14,{jitter:.004}),nt({color:8002074,roughness:.9}));l.position.y=.06,n.add(l);let c=new Y(We(.14,.07,.13,{jitter:.008}),nt({color:1840144,roughness:.95}));c.position.y=.4,n.add(c);let h=(f,m,y,p,g,_)=>{let x=new Y(We(f,m,y,{jitter:.004}),s);return x.position.set(p,g,_),n.add(x),x},u=h(.05,.2,.05,-.1,.2,0),d=h(.05,.2,.05,.1,.2,0);return h(.06,.14,.07,-.05,.07,.04),h(.06,.14,.07,.05,.07,.04),n.position.set(t,0,e),n.rotation.y=Math.PI,this.scene.add(n),{mesh:n,head:o,armL:u,armR:d,turned:!1}}_buildDecals(){let t=this.tex,e=this.rng;for(let n=11.6;n<26;n+=.9){let s=.3+e()*.5;this.decalFloor(.55+e()*.5,n+e()*.4,s,s*(.5+e()),t.blood,e()*3)}this.decalWall(1.615,10.5,1.25,.22,.22,t.handprint,"w",.4),this.decalWall(1.615,10.9,.95,.22,.22,t.handprint,"w",-.3),this.decalWall(-13.93,17.6,1.2,.6,.5,t.blood,"e",.1),this.decalWall(-13.93,19.4,.7,.3,.3,t.handprint,"e",.6),this.decalWall(-8.515,13.6,1.1,.5,.4,t.blood,"e",.2),this.decalFloor(.9,30.6,.5,.7,t.blood,.6,.012),this.decalWall(-1.585,24.4,.5,.3,.25,t.blood,"e",.1)}_buildLights(){let t=this.materials,e=Ie({color:13226710});this.tubeMat=e,this.tubeOffMat=Ie({color:1974564});let n=(f,m,y,p,g,_,x=9,b=1.06)=>{let T=new Ve(g,p,x,1.8);T.position.set(f,y-.05,m),this.scene.add(T);let E=new Y(new ee(.24,.09,b+.09),nt({color:3948614,roughness:.6,metalness:.25}));E.position.set(f,y+.06,m),E.castShadow=!1,this.scene.add(E);let M=nt({color:2895668,roughness:.6,metalness:.2});for(let w of[-b/2-.035,b/2+.035]){let S=new Y(new ee(.26,.11,.06),M);S.position.set(f,y+.06,m+w),this.scene.add(S)}let I=new Y(new bt(.028,.028,b,6),e);return I.rotation.x=Math.PI/2,I.position.set(f,y+.005,m),this.scene.add(I),this.fluorescents.push({light:T,base:p,mode:_,phase:dt(0,6.28),seed:Math.random()*1e9|0,rng:Pt(Math.random()*1e9|0),x:f,z:m,y,tube:I,flickState:1,flickT:dt(0,2),userOff:!1}),T},s=10470616,r=11061440;[-.5,3.5,7.8,12.3,16.9,21.5,26.1,30.7,35.3,39.9,44.5,49.1,53.7,56.9].forEach((f,m)=>{let y=m===4||m===9?"bad":m===12?"dead":m%5===2?"flicker":"steady";n(0,f,2.56,2.4,r,y)}),n(0,-1.4,2.56,2.6,s,"flicker"),n(-4.8,3.8,2.56,3,s,"steady"),n(-4.8,12,2.56,3,r,"flicker"),n(-11,12,2.56,2.6,r,"bad"),n(-15.7,18,2.56,2.5,r,"flicker"),n(-15.5,14.3,2.06,0,s,"dead",6,.7),n(4.8,4.5,2.56,2.4,16756838,"flicker"),n(4.8,12.5,2.56,2.6,r,"bad");let a=new Ve(9050640,1.2,4,1.9);a.position.set(-14.55,2.3,16.7),this.scene.add(a),this.box(-13.94,16.7,2.05,.08,.3,.5,t.rust,{geo:{ao:"wall"},collide:!1,cast:!1}),this.fluorescents.push({light:a,base:1.2,mode:"bad",phase:dt(0,6.28),seed:Math.random()*1e9|0,rng:Pt(Math.random()*1e9|0),x:-14.55,z:16.7,y:2.3,tube:null,flickState:1,flickT:0,userOff:!1}),[2.5,8.5,14.5,20.5,26.5,32.5,38.5,44.5,50.5,56.5,61.5].forEach((f,m)=>{n(0,f,5.06,2.4,r,m%3===0?"bad":"flicker",8)});let c=nt({color:9406070,roughness:.92}),h=nt({color:6972245,roughness:.85}),u=(f,m)=>this.fluorescents.find(y=>Math.abs(y.x-f)<.01&&Math.abs(y.z-m)<.01);this.props.switches=[];let d=[[-1.585,4.55,-4.8,3.8],[-1.585,11.35,-4.8,12],[1.585,4.3,4.8,4.5],[-1.775,49.95,0,49.1]];for(let[f,m,y,p]of d){let g=this.box(f,m,1.18,.02,.1,.14,c,{geo:{ao:"wall"},collide:!1,cast:!1}),_=new Y(new ee(.016,.028,.045),h);_.position.set(f+(f>0?.017:-.017),1.26,m),this.scene.add(_);let x={plate:g,nub:_,fluor:u(y,p),on:!0,baseY:1.26};this.props.switches.push(x),this.regInteractable(g,"\u7535\u706F\u5F00\u5173",2,()=>{var b,T;return(T=(b=this.handlers).onSwitch)==null?void 0:T.call(b,x)})}}_buildNodes(){let t=[-1,3,7,11,15,19,23,27,31,35,39,43,47,51,55,57.5];for(let s of t)this.monsterNodes.push({x:0,z:s,y:0});let e=[4,12,20,28,36,44,52,62.5];for(let s of e)this.monsterNodes.push({x:0,z:s,y:2.8});this.monsterNodes.push({x:.75,z:60.5,y:2.8});for(let[s,r]of[[-3.9,4.5],[-2.8,13.8],[-12.5,12.5],[-15.5,17.5],[4.8,4.5],[4.8,12]])this.monsterNodes.push({x:s,z:r,y:0});this.ghostSpawns=[{x:-2.6,z:3.8,ry:0},{x:-2.6,z:10.6,ry:0},{x:2.6,z:10.6,ry:Math.PI},{x:2.6,z:3.6,ry:Math.PI},{x:-1.9,z:49.2,ry:0},{x:0,z:20,ry:Math.PI/2},{x:0,z:40,ry:Math.PI/2},{x:0,z:30,ry:0,y:2.8}];let n=(s,r,o,a,l,c=-10,h=10)=>{this.triggers.push({aabb:{x0:s,y0:c,z0:r,x1:o,y1:h,z1:a},id:l,fired:!1})};n(-8.4,0,-1.3,7.5,"kitchen",-.3,2),n(-8.4,7.5,-1.3,15.5,"living",-.3,2),n(-13.8,7.5,-8.4,15.5,"bedroom",-.3,2),n(-17.6,14.8,-13.8,21,"bathroom",-.3,2),n(-16.4,13.8,-14.6,14.8,"passage",-.3,2),n(1.3,0,8.4,8.5,"altar",-.3,2),n(1.3,8.5,8.4,15.5,"child",-.3,2),n(-2,10,2,58,"upper",2.3,8),n(-1.7,24,1.7,30,"corridorMid",0,2.2),n(-1.7,57.5,1.7,61,"stairsEast",0,2.2),this.exitBounds={x0:2.4,x1:10.3,z0:28.7,z1:32.8,y0:2.4,y1:4}}checkTriggers(t){var s,r,o,a;for(let l of this.triggers){if(l.fired)continue;let c=l.aabb;t.x>=c.x0&&t.x<=c.x1&&t.y>=c.y0&&t.y<=c.y1&&t.z>=c.z0&&t.z<=c.z1&&(l.fired=!0,(r=(s=this.handlers)[`zone_${l.id}`])==null||r.call(s,l))}let e=this.exitBounds,n=t.x>=e.x0&&t.x<=e.x1&&t.z>=e.z0&&t.z<=e.z1&&t.y>=e.y0&&t.y<=e.y1;n||(this.exitVisit=!1),this.exitDoor.open&&n&&!this.exitVisit&&(this.exitVisit=!0,(a=(o=this.handlers).zone_exitVoid)==null||a.call(o))}humLevel(t){let e=0;for(let n of this.fluorescents){if(n.light.intensity<=.05)continue;let s=Math.hypot(n.x-t.x,n.z-t.z);s<10&&(e=Math.max(e,(1-s/10)*ne(n.light.intensity/n.base,0,1)))}return e}update(t,e,n=null,s=null,r=!1,o=null){var c,h,u,d;this.updateDoors(t,o?null:n,o||[]),this._budgetT-=t,this._budgetT<0&&n&&(this._budgetT=.12,s&&this._viewDir.copy(s),this._applyLightBudget(n.x,n.y,n.z));let a=this.props.doll;if(a&&n){let f=n.x-a.mesh.position.x,m=n.z-a.mesh.position.z;if(f*f+m*m<36){let y=Math.atan2(f,m)-a.mesh.rotation.y;y=Math.atan2(Math.sin(y),Math.cos(y));let p=ne(y,-1.15,1.15);a.head.rotation.y+=(p-a.head.rotation.y)*Math.min(1,t*.55)}}for(let f of this.candles){let m=.75+.25*Math.sin(e*9+f.phase)*Math.sin(e*13.7+f.phase*2);f.light.intensity=f.base*ne(m+dt(-.08,.08),.3,1.2)}for(let f of this.props.batteries||[]){let m=.5+.5*Math.sin(e*3+f.phase);f.glow.intensity=.3+.7*m,f.halo.scale.setScalar(.85+.3*m),f.halo.material.opacity=.4+.6*m}for(let f=0;f<this.ofudas.length;f++)this.ofudas[f].rotation.z=Math.sin(e*.8+f*1.7)*.09;for(let f=0;f<(((c=this.props.ropes)==null?void 0:c.length)||0);f++)this.props.ropes[f].rotation.z=Math.sin(e*.7+f*1.9)*.05,this.props.ropes[f].rotation.x=Math.cos(e*.55+f)*.03;this.props.mobile&&(this.props.mobile.rotation.y=e*.5);let l=this.props.clock;if(l&&n){l.timer-=t;let f=n.x-l.mesh.position.x,m=n.z-l.mesh.position.z,y=f*f+m*m<25;l.state==="normal"&&l.mysterySolved&&y&&l.timer<=0&&Math.random()<.01?(l.state="back",l.timer=dt(2.5,5),l.mesh.material.map=this.tex.clockBack):l.state==="back"&&l.timer<=0&&(l.state="normal",l.timer=dt(50,110),l.mesh.material.map=this.tex.clock)}if(this.props.furin){let f=this.props.furin;f.rotation.z=Math.sin(e*1.7)*.05+Math.sin(e*4.3+1.2)*.03,f.rotation.x=Math.cos(e*1.3+.6)*.04+Math.sin(e*3.7)*.02}n&&(this.dripT=((h=this.dripT)!=null?h:0)-t,this.dripT<=0&&(this.dripT=dt(2.2,4.5),Math.hypot(n.x- -1.05,n.z-33)<7&&((d=(u=this.handlers).onDrip)==null||d.call(u))));for(let f of this.fluorescents){let m=1;if(f.kill||f.userOff)m=0;else if(r&&f.mode!=="dead")m=f.mode==="bad"?.55:1;else if(f.mode==="steady")m=1;else if(f.mode==="flicker"){if(f.flickT-=t,f.flickT<=0){let y=f.rng();f.flickState===1?y<.08?(f.flickState=y<.03?.05:.3,f.flickT=.04+f.rng()*.14):(f.flickState=1,f.flickT=.5+f.rng()*3.2):(f.flickState=1,f.flickT=.05+f.rng()*.3)}m=f.flickState}else f.mode==="bad"?m=Math.sin(e*31+f.phase)>.3?.5+f.rng()*.4:.04:f.mode==="dead"&&(m=0);f.boost>0&&(f.boost-=t,m*=1.8),f.light.intensity=f.base*m,f.tube&&(f.tube.material=m>.25?this.tubeMat:this.tubeOffMat)}}};var hi=(i,t)=>Math.hypot(i.x-t.x,i.z-t.z);function Hl(i,t,e){let n=0,s=1;for(let r of["x","z"]){let o=t[r]-i[r],a=e[r+"0"]-.29,l=e[r+"1"]+.29;if(Math.abs(o)<1e-9){if(i[r]<=a||i[r]>=l)return!1;continue}let c=(a-i[r])/o,h=(l-i[r])/o;if(c>h&&([c,h]=[h,c]),n=Math.max(n,c),s=Math.min(s,h),n>=s)return!1}return s>0&&n<1}function ox(i,t,e,n){let s=new Set(e.filter(u=>!u.locked&&!u.open).map(u=>u.collider)),r=[...new Set([...t,...e.map(u=>u.collider).filter(Boolean)])].filter(u=>u.x1>=n.x0&&u.x0<=n.x1&&u.z1>=n.z0&&u.z0<=n.z1),o=r.filter(u=>!s.has(u)&&u.y1>i+.1&&u.y0<i+.92),a=r.filter(u=>u.y1>=i-.4&&u.y1<=i+.05),l=u=>a.some(d=>u.x>=d.x0&&u.x<=d.x1&&u.z>=d.z0&&u.z<=d.z1);return{free:u=>l(u)&&!o.some(d=>u.x>d.x0-.29&&u.x<d.x1+.29&&u.z>d.z0-.29&&u.z<d.z1+.29),clear:(u,d)=>{if(o.some(m=>Hl(u,d,m)))return!1;let f=Math.max(1,Math.ceil(hi(u,d)/.2));for(let m=0;m<=f;m++)if(!l({x:u.x+(d.x-u.x)*m/f,z:u.z+(d.z-u.z)*m/f}))return!1;return!0},supported:l}}var Bl=class{constructor(){this.items=[]}push(t){let e=this.items;e.push(t);let n=e.length-1;for(;n;){let s=n-1>>1;if(e[s].f<=t.f)break;e[n]=e[s],n=s}e[n]=t}pop(){let t=this.items,e=t[0],n=t.pop();if(t.length){let s=0;for(;s*2+1<t.length;){let r=s*2+1;if(r+1<t.length&&t[r+1].f<t[r].f&&r++,t[r].f>=n.f)break;t[s]=t[r],s=r}t[s]=n}return e}get length(){return this.items.length}};function ax(i,t,e,n=[],s={}){var T,E;let r=s.stats;if(r&&Object.assign(r,{expanded:0,cells:0}),Math.abs(i.y-t.y)>.4)return null;let o=(T=s.margin)!=null?T:8,a=Math.max(0,Math.min(6e3,(E=s.budget)!=null?E:2e3)),l={x0:Math.min(i.x,t.x)-o-1.5,x1:Math.max(i.x,t.x)+o+1.5,z0:Math.min(i.z,t.z)-o-1.5,z1:Math.max(i.z,t.z)+o+1.5},c=ox(i.y,e,n,l);if(!c.free(i))return null;if(!c.free(t)&&t.y>i.y+.1&&t.y<=i.y+.4&&e.some(M=>t.x>=M.x0&&t.x<=M.x1&&t.z>=M.z0&&t.z<=M.z1&&Math.abs(M.y1-t.y)<.04)){let M=null,I=1/0;for(let w of[.9,1.2])for(let S=0;S<16;S++){let R={x:t.x+Math.cos(S*Math.PI/8)*w,z:t.z+Math.sin(S*Math.PI/8)*w,y:i.y};c.free(R)&&hi(i,R)<I&&(M=R,I=hi(i,R))}M&&(t=M)}if(!c.free(t))return null;if(c.clear(i,t))return[{...t}];let h=Math.floor((Math.min(i.x,t.x)-o)/.45),u=Math.ceil((Math.max(i.x,t.x)+o)/.45),d=Math.floor((Math.min(i.z,t.z)-o)/.45),f=Math.ceil((Math.max(i.z,t.z)+o)/.45),m=new Map,y=(M,I)=>{let w=M+","+I;if(m.has(w))return m.get(w);let S={x:M*.45,z:I*.45,y:i.y,ix:M,iz:I,key:w,g:1/0,parent:null,closed:!1};return S.free=M>=h&&M<=u&&I>=d&&I<=f&&c.free(S),m.set(w,S),S},p=M=>{let I=null,w=1/0,S=Math.round(M.x/.45),R=Math.round(M.z/.45);for(let U=-1;U<=1;U++)for(let B=-1;B<=1;B++){let D=y(S+U,R+B),O=hi(M,D);D.free&&O<w&&c.clear(M,D)&&(I=D,w=O)}return I},g=p(i),_=p(t);if(!g||!_)return null;let x=new Bl;g.g=0,x.push({node:g,f:hi(g,_),g:0});let b=0;for(;x.length&&b<a;){let M=x.pop(),I=M.node;if(!(I.closed||M.g!==I.g)){if(I.closed=!0,b++,r&&(r.expanded=b,r.cells=m.size),I===_){let w=[];for(let R=I;R;R=R.parent)w.push({x:R.x,y:R.y,z:R.z});w.reverse(),w.push({...t});let S=[];for(let R=0;R<w.length;R++){let U=S.at(-1),B=w[R],D=w[R+1];U&&D&&Math.abs((B.x-U.x)*(D.z-B.z)-(B.z-U.z)*(D.x-B.x))<1e-7&&c.clear(U,D)||S.push(B)}return S}for(let w=-1;w<=1;w++)for(let S=-1;S<=1;S++){if(!w&&!S)continue;let R=y(I.ix+w,I.iz+S);if(!R.free||R.closed||w&&S&&(!y(I.ix+w,I.iz).free||!y(I.ix,I.iz+S).free)||!c.supported({x:(I.x+R.x)/2,z:(I.z+R.z)/2}))continue;let U=I.g+Math.hypot(w,S)*.45;U<R.g&&(R.g=U,R.parent=I,x.push({node:R,g:U,f:U+hi(R,_)}))}}}return null}var zo=class{constructor(){this.reset()}reset(){this.path=null,this.goal=null,this.cooldown=0,this.signature="",this.plans=0,this.dirty=!0}invalidate(){this.path=null,this.cooldown=0,this.dirty=!0}target(t,e,n,s,r){var l,c,h;this.cooldown=Math.max(0,this.cooldown-r);let o=s.map(u=>(u.locked?"L":"")+(u.open?"O":"C")).join(","),a=!this.goal||hi(e,this.goal)>.8||Math.abs(e.y-this.goal.y)>.15;for(this.cooldown===0&&(this.dirty||a||o!==this.signature)&&(this.lastStats={},this.path=ax(t,e,n,s,{stats:this.lastStats}),this.goal={x:e.x,y:e.y,z:e.z},this.signature=o,this.cooldown=.75,this.plans++,this.dirty=!1);((l=this.path)==null?void 0:l.length)>1&&hi(t,this.path[0])<.18;)this.path.shift();return(h=(c=this.path)==null?void 0:c[0])!=null?h:null}};var Uo=class{constructor(){this.reset()}reset(t=null){this.target=t?{x:t.x,y:t.y,z:t.z}:null,this.age=0}update(t,{player:e,visible:n,audible:s}){return n||s||!this.target?(this.target={x:e.x,y:e.y,z:e.z},this.age=0):this.age+=Math.max(0,t),this.target}get expired(){return this.age>=10}};function Eu(i,t,e,n){if(!Number.isFinite(e)||e<=0||Math.abs(i.y-t.y)>=1)return!1;let s=n?e*.35:e;return Math.hypot(i.x-t.x,i.z-t.z)<s}function er(i,t){return![i.x,i.y,i.z].every(Number.isFinite)||!t.some(n=>i.x>=n.x0&&i.x<=n.x1&&i.z>=n.z0&&i.z<=n.z1&&Math.abs(n.y1-i.y)<.04)?!1:!t.some(n=>n.x0<i.x+.28&&n.x1>i.x-.28&&n.z0<i.z+.28&&n.z1>i.z-.28&&n.y1>i.y+.1&&n.y0<i.y+1.9)}function Kn(i,t,e,n=[],s=null){let r=new L().subVectors(t,i),o=r.length();if(o<.001)return!1;let a=new wi(i,r.divideScalar(o)),l=new L,c=new dn,h=u=>!u||u===s?!1:(c.min.set(u.x0,u.y0,u.z0),c.max.set(u.x1,u.y1,u.z1),a.intersectBox(c,l)!==null&&l.distanceTo(i)<o-.065);return e.some(h)||n.some(u=>h(u.collider))}function wu(i,t=new L){let e=i.userData.interactionPoint;return e?i.localToWorld(t.set(e.x,e.y,e.z)):i.getWorldPosition(t)}var lx=13616820,ko=class{constructor(t,e){this.scene=t,this.tex=e,this.pursuit=new Uo,this.groundNavigator=new zo,this.searchTimer=0,this.state="dormant",this.speed=0,this.pos=new L,this.group=new Ot,this.visible=!0,this._build(),this.scene.add(this.group),this.group.visible=!1,this.stareTimer=0,this.litTimer=0,this.teleportTimer=dt(1.5,2.5),this.stepTimer=0,this.stuckTime=0,this.lastPos=new L,this.walkPhase=0,this.twitchTimer=dt(.3,1),this.headRot=new L,this.headTarget=new L,this.char=js(0,0,0,.28,1.9),this.attackTimer=0,this.tempLife=null}_build(){let t=this.tex,e=nt({map:t.skin,roughness:.95,color:lx}),n=nt({color:920586,roughness:.95}),s=(_,x,b,T=0,E=0,M=0)=>{let I=new Y(_,x);return I.position.set(T,E,M),I.castShadow=!0,I.receiveShadow=!0,b.add(I),I};this.legL=new Ot,this.legR=new Ot,this.legL.position.set(-.14,.95,0),this.legR.position.set(.14,.95,0),this.group.add(this.legL,this.legR);for(let _ of[this.legL,this.legR])s(new bt(.065,.042,.91,18),e,_,0,-.45,0),s(new Ne(.068,16,10),e,_,0,-.49,.01),s(new ee(.105,.055,.23),n,_,0,-.92,.06);let r=new Ne(.17,20,12);r.scale(1,.65,.65),s(r,e,this.group,0,.96,0),this.torso=new Ot,this.torso.position.set(0,1.4,0),this.group.add(this.torso);let o=new bt(.22,.16,.85,24,8);o.scale(1,1,.65);let a=o.attributes.position;for(let _=0;_<a.count;_++){let x=a.getY(_);if(x>.15){let b=1-(x-.15)/.75*.22;a.setX(_,a.getX(_)*b),a.setZ(_,a.getZ(_)*b)}}o.computeVertexNormals(),s(o,e,this.torso);let l=new Y(new oe(.3,.24),Ie({map:t.blood,transparent:!0,depthWrite:!1}));l.position.set(0,.12,.135),l.renderOrder=2,this.torso.add(l),this.headG=new Ot,this.headG.position.set(0,2,.02),this.group.add(this.headG),s(new bt(.047,.068,.34,16),e,this.headG,0,-.12,0);let c=new Ne(.19,28,20);c.scale(.86,1.2,.82);let h=s(c,e,this.headG,0,.18,.01);h.name="monsterHead";let u=new oe(.26,.34,12,14),d=u.attributes.position;for(let _=0;_<d.count;_++){let x=d.getX(_)/.13,b=d.getY(_)/.17;d.setZ(_,-.035*(x*x+b*b))}u.computeVertexNormals();let f=new Y(u,nt({map:t.face,roughness:1}));f.position.set(0,.18,.152),this.headG.add(f),this.jaw=new Ot,this.jaw.position.set(0,.08,.02),this.headG.add(this.jaw);let m=new Ne(.1,20,12);m.scale(1,.5,1),s(m,e,this.jaw,0,-.04,.02);let y=nt({color:1705221,emissive:9049104,emissiveIntensity:0});this.eyeL=new Y(new ee(.045,.05,.02),y),this.eyeR=this.eyeL.clone(),this.eyeL.position.set(-.07,.2,.156),this.eyeR.position.set(.07,.2,.156),this.headG.add(this.eyeL,this.eyeR),this.eyeMat=y;for(let _=0;_<14;_++){let x=_/14*Math.PI*2,b=Math.cos(x)*.12,T=Math.sin(x)*.11,E=new Xs([new L(b*.5,.4,T*.5),new L(b,.32,T),new L(b*1.2,.14,T*1.3),new L(b*1.1,-.13-_%3*.04,T*1.4)]);s(new mo(E,8,.012+_%3*.002,5,!1),n,this.headG)}this.armL=new Ot,this.armR=new Ot,this.armL.position.set(-.26,1.94,0),this.armR.position.set(.26,1.94,0),this.group.add(this.armL,this.armR);for(let[_,x]of[[this.armL,1.22],[this.armR,1.34]])s(new bt(.057,.044,x*.46,18),e,_,0,-x*.23,.02),s(new Ne(.061,16,10),e,_,0,-x*.46,.02),s(new bt(.044,.031,x*.54,18),e,_,0,-x*.73,.02);let p=new Ne(.075,16,12);p.scale(.8,1.3,.65),s(p,e,this.armL,0,-1.28,0),s(p,e,this.armR,0,-1.4,0);for(let _ of[this.armL,this.armR])for(let x=0;x<4;x++){let b=s(We(.014,.12,.014,{jitter:.004}),e,_,-.045+x*.03,-1.52,0);b.rotation.x=.3+x%2*.18}this.armL.rotation.x=-.18,this.armR.rotation.x=-.24;for(let _=0;_<4;_++){let x=s(We(.1,.07,.05,{jitter:.012}),e,this.torso,0,.1+_*.19,-.14);x.rotation.x=.35}this.cloth=[];let g=nt({color:1578e3,roughness:.95,side:ue});for(let _=0;_<5;_++){let x=s(We(.08+dt(0,.06),.4+dt(0,.3),.02,{jitter:.02}),g,this.torso,dt(-.2,.2),-.3+dt(0,.2),.02);x.rotation.x=dt(-.25,.25),this.cloth.push(x)}this.group.scale.setScalar(1)}spawn(t,e="stalk"){this.pos.copy(t),this.group.position.copy(t),this.group.visible=!0,this.visible=!0,this.state=e,this.pursuit.reset(),this.groundNavigator.reset(),this.searchTimer=0,this.waitingDoor=null,this.stareTimer=0,this.litTimer=0,this.stuckTime=0,this.attackTimer=0,this.tempLife=null,this.lastPos.copy(t),this._syncChar()}despawn(){this.state="dormant",this.group.visible=!1}_syncChar(){let t=this.char;t.x0=this.pos.x-.28,t.x1=this.pos.x+.28,t.z0=this.pos.z-.28,t.z1=this.pos.z+.28,t.y0=this.pos.y,t.y1=this.pos.y+1.9}update(t,e){var _,x,b,T,E,M,I,w;if(this.state==="dormant"||this.state==="gone")return;if(this.tempLife!==null&&(this.tempLife-=t,this.tempLife<=0)){this.tempLife=null,this.despawn();return}let n=e.player,s=n.x-this.pos.x,r=n.z-this.pos.z,o=Math.hypot(s,r),a=new L(s,0,r).normalize(),l=Math.abs(n.y-this.pos.y)<1,c=Kn(this.pos.clone().add(new L(0,1.4,0)),n.clone().add(new L(0,1.3,0)),e.colliders,e.doors),h=l&&o<24&&!c,u=Eu(this.pos,n,e.noiseRadius||0,c),d=h&&a.dot(e.lookDir)<-.55,f=this.state==="chase"?2:.7;this.walkPhase+=t*f*6.5*(this.state==="attack"?0:1);let m=this.state==="attack"?0:this.state==="chase"?.62:.3;this.legL.rotation.x=Math.sin(this.walkPhase)*m,this.legR.rotation.x=-Math.sin(this.walkPhase)*m,this.armL.rotation.x=-.18+Math.sin(this.walkPhase+Math.PI)*m*.7,this.armR.rotation.x=-.24+Math.sin(this.walkPhase)*m*.7,this.torso.rotation.z=Math.sin(this.walkPhase)*.045,this.torso.rotation.x=-.16+Math.abs(Math.sin(this.walkPhase))*.05,this.group.position.y=this.pos.y+Math.abs(Math.sin(this.walkPhase))*.03,this.twitchTimer-=t,this.twitchTimer<=0&&(this.twitchTimer=dt(.35,1.1),this.headTarget.set(dt(-.15,.25),dt(-.5,.5),dt(-.3,.3)),d&&o<20&&this.headTarget.set(-.05,0,.06));let y=Math.min(1,t*6);this.headRot.x=an(this.headRot.x,this.headTarget.x,y),this.headRot.y=an(this.headRot.y,this.headTarget.y,y),this.headRot.z=an(this.headRot.z,this.headTarget.z,y),this.headG.rotation.set(this.headRot.x,this.headRot.y,this.headRot.z);let p=this.state==="chase"?.3+Math.sin(this.walkPhase*2.1)*.08:this.state==="attack"?.55:0;this.jaw.rotation.x=an(this.jaw.rotation.x,p,Math.min(1,t*8));let g=this.state==="chase"||this.state==="attack";this.eyeMat.emissiveIntensity=an(this.eyeMat.emissiveIntensity,g?.75+.45*Math.sin(this.walkPhase*9):0,Math.min(1,t*6));for(let S=0;S<this.cloth.length;S++)this.cloth[S].rotation.z=Math.sin(this.walkPhase*2.3+S*1.4)*.12;if(e.flashHit&&o<22&&!e.reduceEffects?this.visible=Math.sin(e.time*88+this.walkPhase)>-.15:this.visible=!0,this.group.visible=this.visible&&this.state!=="gone",this.tempLife!==null){this.lastPos.copy(this.pos);return}if(this.state==="stalk"&&(e.flashHit&&o<22?(this.litTimer+=t,this.litTimer>.9&&this._enterChase(e)):this.litTimer=Math.max(0,this.litTimer-t*2),d&&o<15&&!e.flashHit?(this.stareTimer+=t,this.stareTimer>1.15&&this._enterChase(e)):this.stareTimer=Math.max(0,this.stareTimer-t),!d&&o>9&&o<40&&(this.teleportTimer-=t,this.teleportTimer<=0&&(this.teleportTimer=dt(1.6,3.2),this._teleportNear(e,7.5,10),e.audio.whisper(0,1.2))),o>13&&!d?this._moveToward(e,t,.9):o>26&&this._moveToward(e,t,1.5)),this.state==="search"){if(this.searchTimer-=t,h||u)this._enterChase(e);else if(this.searchTimer<=0){this.despawn(),(x=(_=e.game)==null?void 0:_.onPursuitLost)==null||x.call(_);return}}if(this.state==="chase"){let S=this.pursuit.update(t,{player:n,visible:h,audible:u});if(this.pursuit.expired){this.state="search",this.searchTimer=3,(T=(b=e.game)==null?void 0:b._sub)==null||T.call(b,"\u811A\u6B65\u505C\u5728\u4F60\u521A\u624D\u7ECF\u8FC7\u7684\u5730\u65B9\u3002\u4FDD\u6301\u5B89\u9759\uFF0C\u7ED5\u5F00\u5B83\u7684\u89C6\u7EBF\u3002","",4);return}let R=new L(S.x,S.y,S.z);this._moveToward({...e,player:R,canSeePlayer:h},t,3.3),this.stepTimer-=t,this.stepTimer<=0&&(this.stepTimer=.5,e.audio.thud()),o<1.3&&h&&e.time>0&&(this.state="attack",this.attackTimer=.42,this._teleportTowardPlayer(e,.55),e.audio.sting(),(M=(E=e.game)==null?void 0:E.onMonsterAttack)==null||M.call(E))}this.state==="attack"&&(this.armL.rotation.x=an(this.armL.rotation.x,-2.6,t*9),this.armR.rotation.x=an(this.armR.rotation.x,-2.7,t*9),this.headG.rotation.set(-.12,this.headRot.y,0),this.attackTimer-=t,this.attackTimer<=0&&(this.state="gone",this.group.visible=!1,(w=(I=e.game)==null?void 0:I.onMonsterAttackEnd)==null||w.call(I))),this.lastPos.copy(this.pos)}_enterChase(t){var e,n;this.state!=="stalk"&&this.state!=="search"||(this.pursuit.reset(t.player),this.state="chase",this.stepTimer=0,t.audio.moan(0),t.audio.duck(),(n=(e=t.game)==null?void 0:e.onChaseStart)==null||n.call(e))}_moveToward(t,e,n){var f,m,y,p,g,_;let s=t.player,r=s.x,o=s.z,a=gu(t.stairs||[],this.pos,s);if(a)r=a.x,o=a.z,this.groundNavigator.invalidate(),this.waitingDoor=null;else{let x=this.groundNavigator.target(this.pos,s,t.colliders,t.doors||[],e);r=(f=x==null?void 0:x.x)!=null?f:this.pos.x,o=(m=x==null?void 0:x.z)!=null?m:this.pos.z}if(!a&&!this.waitingDoor)for(let x of t.doors||[]){if(x.locked||x.open||Math.abs(x.hinge.y-this.pos.y)>.5||Math.hypot(x.hinge.x-this.pos.x,x.hinge.z-this.pos.z)>x.width+.65)continue;let b=this.pos,T=!1;for(let E of(this.groundNavigator.path||[]).slice(0,4)){if(x.collider&&Hl(b,E,x.collider)){T=!0;break}b=E}if(T){(p=(y=t.game)==null?void 0:y.level)==null||p.forceOpen(x),t.audio.doorOpen(),this.waitingDoor=x;break}}if(this.waitingDoor){let x=this.waitingDoor,b=x.type==="slide"?Math.abs(x.slidePos-x.slideTarget)<.035:Math.abs(x.angle-x.openAngle)<.035;x.locked||!x.open||b?(this.waitingDoor=null,this.groundNavigator.invalidate()):(r=this.pos.x,o=this.pos.z)}let l=r-this.pos.x,c=o-this.pos.z,h=Math.max(1e-4,Math.hypot(l,c)),u=Math.min(h,n*e);if(this._syncChar(),Co(this.char,l/h*u,-.12,c/h*u,t.colliders,.4,{bodyHeight:1}),this.pos.x=(this.char.x0+this.char.x1)/2,this.pos.z=(this.char.z0+this.char.z1)/2,this.pos.y=this.char.y0,this.group.position.x=this.pos.x,this.group.position.z=this.pos.z,this.group.position.y=this.pos.y+Math.abs(Math.sin(this.walkPhase))*.03,u>1e-4){let b=Math.atan2(l,c)-this.group.rotation.y;b=Math.atan2(Math.sin(b),Math.cos(b)),this.group.rotation.y+=b*Math.min(1,e*5)}let d=Math.hypot(this.pos.x-this.lastPos.x,this.pos.z-this.lastPos.z);if(this.state==="chase"&&d<.008){if(this.stuckTime+=e,this.stuckTime>.9){let x=!1;for(let b of t.doors)if(!b.locked&&!b.open){let T=b.hinge;if(Math.hypot(T.x-this.pos.x,T.z-this.pos.z)<1.4){(_=(g=t.game)==null?void 0:g.level)==null||_.forceOpen(b),t.audio.doorOpen(),x=!0;break}}this.stuckTime>2.2?(this.groundNavigator.path&&this.groundNavigator.invalidate(),this.stuckTime=0):x&&(this.stuckTime=0)}}else this.stuckTime=0}_teleportNear(t,e,n){let s=t.nodes,r=null,o=1/0;for(let a of s){if(Math.abs(a.y-t.player.y)>.5)continue;let l=Math.hypot(a.x-t.player.x,a.z-t.player.z);if(l<e||l>n)continue;let c=new L(a.x-t.player.x,0,a.z-t.player.z).normalize();if(t.lookDir&&c.dot(t.lookDir)>0&&!Kn(t.player.clone().add(new L(0,1.55,0)),new L(a.x,a.y+1.4,a.z),t.colliders,t.doors)||!er(a,t.colliders))continue;let h=Math.abs(l-(e+n)/2);h<o&&(o=h,r=a)}r&&(this.pos.set(r.x,r.y,r.z),this.group.position.set(r.x,r.y,r.z),this._syncChar())}_teleportTowardPlayer(t,e){let n=t.player.x-this.pos.x,s=t.player.z-this.pos.z,r=Math.max(.001,Math.hypot(n,s)),o=n/r,a=s/r;for(let l of[e,.8,1.1,1.5]){let c=t.player.x-o*l,h=t.player.z-a*l;if(er({x:c,y:t.player.y,z:h},t.colliders)){this.pos.x=c,this.pos.z=h,this.pos.y=t.player.y,this.group.position.copy(this.pos),this._syncChar();return}}}_hitWall(t,e,n,s){for(let o of s)if(o.x0<t+.28&&o.x1>t-.28&&o.z0<n+.28&&o.z1>n-.28&&o.y1>e+.1&&o.y0<e+1.9)return!0;return!1}},No=class{constructor(t){this.scene=t,this.group=new Ot,this.group.visible=!1,this.opacity=0,this.mats=[],this._build(),this.scene.add(this.group),this.life=0,this.bob=dt(0,6)}_build(){let t=new Ze({color:14541800,transparent:!0,opacity:.45,depthWrite:!1});this.mats.push(t);let e=new Ze({color:658448}),n=(a,l,c,h,u,d)=>{let f=new Y(new ee(a,l,c),t);return f.position.set(h,u,d),this.group.add(f),f};n(.3,.7,.18,0,1.05,0),n(.28,.3,.26,0,1.5,0),this.ghostArmL=n(.14,.68,.14,-.42,1,0),this.ghostArmR=n(.14,.68,.14,.42,1,0),n(.13,.68,.13,-.09,.34,0),n(.13,.68,.13,.09,.34,0);let s=new Y(new ee(.5,.9,.34),t);s.position.set(0,.5,0),this.group.add(s);let r=new Y(new ee(.05,.06,.02),e);r.position.set(-.06,1.52,.135);let o=r.clone();o.position.x=.06,this.group.add(r,o);for(let a=0;a<4;a++){let l=new Y(new ee(.06,.4+dt(0,.2),.03),e);l.position.set(dt(-.12,.12),1.62,dt(-.08,.02)),this.group.add(l)}}appearAt(t,e,n,s){this.group.position.set(t,e,n),this.group.rotation.y=s,this.group.visible=!0,this.life=1.9,this.opacity=0,this.group.scale.setScalar(.96)}hide(){this.group.visible=!1,this.life=0}update(t,e){if(!this.group.visible)return;this.bob+=t,this.group.position.y+=Math.sin(this.bob*1.6)*.002,this.ghostArmL.rotation.z=-.18+Math.sin(this.bob*.7)*.05,this.ghostArmR.rotation.z=.18+Math.cos(this.bob*.8)*.05,Math.random()<.05&&(this.opacity*=.55);let s=Math.atan2(e.x-this.group.position.x,e.z-this.group.position.z)-this.group.rotation.y;s=Math.atan2(Math.sin(s),Math.cos(s)),this.group.rotation.y+=s*Math.min(1,t*.8),this.life-=t;let r=this.life>.55?.42:0;this.opacity=an(this.opacity,r,t*6);for(let o of this.mats)o.opacity=this.opacity;this.life<=0&&this.hide()}};var vs="echo_apartment_campaign_v2",Di={invitation:{title:"\u4E00\u5C01\u6CA1\u6709\u7F72\u540D\u7684\u4FE1",location:"\u5927\u5385 \xB7 \u503C\u73ED\u53F0",item:"\u5931\u7269\u62DB\u9886\u51FD",cn:`\u81F4\u4E03\u6708\u5341\u56DB\u65E5\u79BB\u5F00\u7684\u4F4F\u6237\uFF1A

\u60A8\u9057\u843D\u7684\u4E1C\u897F\u4ECD\u5728\u4E09\u53F7\u5BA4\u3002
\u8BF7\u5728\u62C6\u9664\u524D\u6765\u53D6\u3002\u591C\u95F4\u5165\u53E3\u5DF2\u4E3A\u60A8\u4FDD\u7559\u3002

\u4FE1\u5C01\u91CC\u5939\u7740\u5730\u4E0B\u7EF4\u4FEE\u95F4\u7684\u94A5\u5319\u3002
\u80CC\u9762\u53EA\u6709\u4E00\u53E5\u8BDD\uFF1A
\u300C\u54E5\u54E5\uFF0C\u8FD9\u6B21\u4E0D\u8981\u628A\u6211\u7559\u5728\u9ED1\u6697\u91CC\u3002\u300D

\u6211\u4E0D\u8BB0\u5F97\u81EA\u5DF1\u4F4F\u8FC7\u8FD9\u91CC\u3002\u53EF\u8FD9\u884C\u5B57\uFF0C\u6211\u8BA4\u5F97\u3002`},1:{title:"\u7BA1\u7406\u4EBA\u7684\u591C\u95F4\u8BB0\u5F55",location:"\u4E00\u697C \xB7 \u5BDD\u5BA4",item:"\u8C03\u67E5\u8BB0\u5F55 01",cn:`1998\u5E747\u670814\u65E5

02:17\uFF0C\u5730\u4E0B\u6392\u6C34\u6CF5\u77ED\u8DEF\u3002\u6574\u680B\u697C\u65AD\u7535\u3002
\u4E09\u53F7\u5BA4\u7684\u6BCD\u4EB2\u6765\u627E\u6211\uFF0C\u8BF4\u5C0F\u513F\u5B50\u8EB2\u8FDB\u4E86\u7EF4\u4FEE\u95F4\u3002
\u6211\u62FF\u4E86\u94A5\u5319\uFF0C\u5374\u6CA1\u6709\u4E0B\u53BB\u3002

\u90A3\u6247\u95E8\u540E\u6765\u518D\u4E5F\u6253\u4E0D\u5F00\u4E86\u3002
\u6BCF\u6B21\u8D70\u5230\u90A3\u91CC\uFF0C\u91CC\u9762\u90FD\u6709\u4EBA\u95EE\u6211\uFF1A
\u300C\u706F\u4FEE\u597D\u4E86\u5417\uFF1F\u300D

\u62C6\u697C\u4E4B\u524D\uFF0C\u6211\u5FC5\u987B\u628A\u771F\u76F8\u7559\u4E0B\u3002`},2:{title:"\u88AB\u526A\u53BB\u4E00\u89D2\u7684\u62A5\u7EB8",location:"\u4E00\u697C \xB7 \u4F5B\u95F4",item:"\u8C03\u67E5\u8BB0\u5F55 02",cn:`\u56DE\u58F0\u516C\u5BD3\u4F4F\u6237\u5931\u8E2A\u6848\uFF0C\u4ECD\u65E0\u65B0\u8FDB\u5C55

7\u670814\u65E5\u51CC\u6668\uFF0C\u4E09\u53F7\u5BA4\u53D1\u751F\u4E8B\u6545\u3002\u8B66\u65B9\u627E\u5230\u4E09\u540D\u5BB6\u5C5E\uFF0C\u4E03\u5C81\u7684\u6B21\u5B50\u82CD\u592A\u4ECD\u672A\u5BFB\u83B7\u3002
\u552F\u4E00\u5E78\u5B58\u7684\u957F\u5B50\u5728\u533B\u9662\u9192\u6765\uFF0C\u65E0\u6CD5\u56DE\u5FC6\u5F53\u665A\u7ECF\u8FC7\u3002

\u516C\u5BD3\u7BA1\u7406\u4EBA\u62D2\u7EDD\u518D\u6B21\u8FDB\u5165\u5730\u4E0B\u5C42\u3002

\u526A\u62A5\u8FB9\u7F18\u6709\u4E00\u884C\u94C5\u7B14\u5B57\uFF1A
\u300C\u6863\u6848\u67DC\u7684\u5BC6\u7801\uFF0C\u662F\u505C\u7535\u7684\u65F6\u523B\u3002\u300D

\u5899\u4E0A\u7684\u949F\u6C38\u8FDC\u505C\u5728 02:17\u3002`},3:{title:"\u4E24\u4E2A\u4EBA\u7684\u6349\u8FF7\u85CF",location:"\u4E00\u697C \xB7 \u513F\u7AE5\u623F",item:"\u8C03\u67E5\u8BB0\u5F55 03",cn:`\u753B\u4E0A\u6709\u4E24\u4E2A\u5B69\u5B50\u3002\u4E00\u4EBA\u8EB2\u5728\u95E8\u540E\uFF0C\u4E00\u4EBA\u8499\u4F4F\u773C\u775B\u3002

\u300C\u54E5\u54E5\u8BF4\uFF0C\u542C\u89C1\u8FD9\u9996\u6B4C\uFF0C\u5C31\u53EF\u4EE5\u51FA\u6765\u4E86\u3002\u300D

\u516B\u97F3\u76D2\u65C1\u753B\u7740\u56DB\u6839\u4E0D\u540C\u9AD8\u5EA6\u7684\u7AD6\u7EBF\u3002
\u4E0B\u65B9\u7684\u5706\u5708\u4F9D\u6B21\u6807\u5728\uFF1A
\u7B2C\u4E09\u6839\u3001\u7B2C\u4E00\u6839\u3001\u7B2C\u56DB\u6839\u3002

3 \u2192 1 \u2192 4

\u6700\u540E\u4E00\u884C\u88AB\u53CD\u590D\u63CF\u8FC7\uFF1A
\u300C\u53EF\u662F\u6B4C\u505C\u4E86\u3002\u4ED6\u6CA1\u6709\u6765\u627E\u6211\u3002\u300D`},4:{title:"\u65AD\u7535\u68C0\u4FEE\u5361",location:"\u5730\u4E0B \xB7 \u914D\u7535\u95F4",item:"\u7EF4\u4FEE\u8BB0\u5F55",cn:`\u56DE\u58F0\u516C\u5BD3 \xB7 \u5907\u7528\u7535\u6E90\u542F\u52A8\u89C4\u7A0B

\u5148\u66F4\u6362\u7194\u65AD\u5668\uFF0C\u518D\u4F9D\u6B21\u5408\u4E0A\u4E09\u8DEF\u5F00\u5173\u3002

\u2460 \u6392\u6C34\u6CF5
\u2461 \u8D70\u5ECA\u7167\u660E
\u2462 \u4F4F\u6237\u7535\u6E90

\u9762\u677F\u6392\u5217\u4E0E\u542F\u52A8\u987A\u5E8F\u4E0D\u540C\u3002\u4E0D\u53EF\u540C\u65F6\u5408\u95F8\u3002
\u6765\u7535\u540E\uFF0C\u4E8C\u697C\u9632\u706B\u95E8\u4F1A\u81EA\u52A8\u89E3\u9664\u78C1\u9501\u3002

\u8BF7\u52FF\u8BA9\u513F\u7AE5\u9760\u8FD1\u6392\u6C34\u4E95\u3002`},5:{title:"\u5F55\u97F3\u5E26\uFF1A\u4E03\u6708\u5341\u56DB\u65E5",location:"\u4E8C\u697C \xB7 203 \u653E\u6620\u5BA4",item:"\u5F55\u97F3\u8F6C\u5199",cn:`\uFF3B\u96E8\u58F0\u3002\u4E00\u4E2A\u5B69\u5B50\u5728\u6570\u6570\u3002\uFF3D

\u300C\u54E5\u54E5\uFF0C\u4F60\u4F1A\u6765\u63A5\u6211\u5417\uFF1F\u300D
\u300C\u6B4C\u54CD\u4E86\u5C31\u51FA\u6765\uFF0C\u522B\u8BA9\u5988\u5988\u53D1\u73B0\u3002\u300D

\uFF3B\u5F00\u95E8\u58F0\u3002\u7535\u6D41\u58F0\u4E2D\u65AD\u3002\uFF3D

\u300C\u54E5\u54E5\uFF1F\u6211\u770B\u4E0D\u89C1\u4E86\u3002\u300D

\uFF3B\u5F88\u957F\u7684\u6C89\u9ED8\u3002\u968F\u540E\uFF0C\u4E00\u4E2A\u6210\u5E74\u7537\u4EBA\u7684\u58F0\u97F3\u3002\uFF3D

\u300C\u6C34\u95F8\u8981\u5148\u6CC4\u538B\uFF0C\u518D\u6392\u6C34\uFF0C\u6700\u540E\u56DE\u6C34\u3002
\u522B\u518D\u628A\u90A3\u6247\u95E8\u5C01\u8D77\u6765\u4E86\u3002\u300D

\u5F55\u97F3\u6700\u540E\u4F20\u6765\u4E09\u679A\u516B\u97F3\u76D2\u7684\u97F3\u7B26\u3002`},6:{title:"\u672A\u5BC4\u51FA\u7684\u8BA4\u9886\u4E66",location:"\u4E8C\u697C \xB7 203 \u653E\u6620\u5BA4",item:"\u5B8C\u6574\u771F\u76F8",cn:`\u6211\u4E00\u76F4\u4EE5\u4E3A\uFF0C\u90A3\u4E2A\u5728\u8D70\u5ECA\u91CC\u7684\u9AD8\u5927\u4EBA\u5F71\u662F\u4ED6\u3002

\u4E0D\u662F\u3002
\u90A3\u662F\u6211\u4EEC\u4E0D\u80AF\u627F\u8BA4\u7684\u4E8B\u60C5\u3002

\u82CD\u592A\u5728\u505C\u7535\u7684\u5730\u4E0B\u5C42\u7B49\u4E86\u4E00\u6574\u591C\u3002\u6211\u9003\u79BB\u4E86\u8FD9\u91CC\uFF0C\u544A\u8BC9\u6240\u6709\u4EBA\u81EA\u5DF1\u4EC0\u4E48\u4E5F\u4E0D\u8BB0\u5F97\u3002
\u540E\u6765\uFF0C\u6BCF\u6B21\u6709\u4EBA\u53EB\u6211\u7684\u540D\u5B57\uFF0C\u6211\u90FD\u4F1A\u542C\u89C1\u90A3\u6247\u95E8\u91CC\u9762\u7684\u6572\u51FB\u58F0\u3002

\u6211\u56DE\u6765\uFF0C\u4E0D\u662F\u4E3A\u4E86\u53D6\u56DE\u5931\u7269\u3002
\u6211\u662F\u6765\u5E26\u4ED6\u56DE\u5BB6\u7684\u3002

\u8BA4\u9886\u4EBA\uFF1A\u4E09\u53F7\u5BA4\u957F\u5B50
\u5931\u7269\uFF1A\u4E00\u6BB5\u88AB\u6545\u610F\u9057\u5FD8\u7684\u8BB0\u5FC6`},7:{title:"\u82CD\u592A\u5199\u7ED9\u54E5\u54E5\u7684\u7EB8\u6761",location:"\u4E00\u697C \xB7 \u516B\u97F3\u76D2\u5939\u5C42",item:"\u6700\u540E\u4E00\u5C01\u4FE1",cn:`\u54E5\u54E5\uFF1A

\u6211\u5DF2\u7ECF\u6CA1\u6709\u751F\u6C14\u4E86\u3002
\u8FD9\u91CC\u592A\u9ED1\uFF0C\u6211\u53EA\u662F\u60F3\u542C\u89C1\u4F60\u53EB\u6211\u7684\u540D\u5B57\u3002

\u4F60\u8BF4\u6211\u6CA1\u6709\u51FA\u73B0\u5728\u90A3\u5F20\u5168\u5BB6\u798F\u91CC\u3002\u53EF\u662F\uFF0C204 \u7684\u53D4\u53D4\u8FD8\u7559\u7740\u5E95\u7247\u3002
\u516B\u97F3\u76D2\u4E0B\u9762\u7684\u94A5\u5319\u80FD\u6253\u5F00\u4E8C\u697C\u897F\u7FFC\u3002\u627E\u56DE\u7167\u7247\uFF0C\u770B\u770B\u4F60\u7275\u7740\u7684\u662F\u8C01\u7684\u624B\u3002

\u7EF4\u4FEE\u95F4\u7684\u6C34\u8FD8\u6CA1\u6709\u9000\u3002\u7B2C\u4E09\u53EA\u9600\u95E8\u7684\u624B\u8F6E\u88AB\u7BA1\u7406\u5458\u6536\u8FDB\u4E86\u4E00\u697C\u4E1C\u7FFC\u7EF4\u4FEE\u5BA4\u3002
\u628A\u5B83\u88C5\u56DE\u53BB\uFF0C\u5148\u6CC4\u538B\uFF0C\u518D\u6392\u6C34\uFF0C\u6700\u540E\u56DE\u6C34\uFF0C\u4E95\u5E95\u7684\u95E8\u5C31\u4F1A\u677E\u5F00\u3002

\u7B49\u5929\u4EAE\u4E86\uFF0C\u6211\u4EEC\u4E00\u8D77\u8D70\u3002

\u82CD\u592A`},8:{title:"\u4E8C\u697C\u4F4F\u6237\u7684\u76EE\u51FB\u8BB0\u5F55",location:"\u4E8C\u697C \xB7 201 \u7BA1\u7406\u5BA4",item:"\u8C03\u67E5\u8BB0\u5F55 04",cn:`7\u670815\u65E5

\u6628\u665A\u505C\u7535\u540E\uFF0C\u6211\u770B\u89C1\u957F\u5B50\u72EC\u81EA\u4ECE\u697C\u68AF\u4E0B\u6765\u3002
\u4ED6\u6D51\u8EAB\u6E7F\u900F\uFF0C\u624B\u91CC\u6525\u7740\u4E00\u679A\u53D1\u6761\u94A5\u5319\u3002
\u6211\u95EE\u4ED6\u5F1F\u5F1F\u5462\uFF0C\u4ED6\u8BF4\uFF1A
\u300C\u6211\u4EEC\u6CA1\u6709\u5728\u73A9\u6349\u8FF7\u85CF\u3002\u300D

\u4ECA\u5929\u6211\u624D\u77E5\u9053\uFF0C\u90A3\u5B69\u5B50\u6CA1\u6709\u56DE\u5BB6\u3002
\u5F55\u97F3\u5E26\u7559\u5728 202 \u53F7\u5BA4\u3002
\u6863\u6848\u67DC\u94A5\u5319\u88AB\u7BA1\u7406\u4EBA\u9501\u5728\u529E\u516C\u5BA4\u91CC\u3002

\u6709\u4E9B\u4EBA\u5FD8\u8BB0\uFF0C\u662F\u4E3A\u4E86\u6D3B\u4E0B\u53BB\u3002
\u6709\u4E9B\u5730\u65B9\u8BB0\u4F4F\uFF0C\u662F\u4E3A\u4E86\u8BA9\u4ED6\u4EEC\u56DE\u6765\u3002`},9:{title:"\u672A\u5B8C\u6210\u7684\u7EF4\u4FEE\u5DE5\u5355",location:"\u4E00\u697C\u4E1C\u7FFC \xB7 \u7BA1\u7406\u5458\u7EF4\u4FEE\u5BA4",item:"\u7EF4\u4FEE\u5DE5\u5355",cn:`7\u670813\u65E5

\u6392\u6C34\u9600\u624B\u8F6E\u677E\u52A8\uFF0C\u6682\u65F6\u5378\u4E0B\uFF0C\u5B58\u4E8E\u5DE5\u5177\u53F0\u3002
\u5907\u7528\u7194\u65AD\u5668\u4EA4\u7ED9\u4E09\u53F7\u5BA4\u6BCD\u4EB2\uFF0C\u653E\u5728\u53A8\u623F\u5DE5\u5177\u76D2\u3002

7\u670814\u65E5\uFF0C02:17

\u6545\u969C\u65F6\u6392\u6C34\u6CF5\u5FC5\u987B\u5148\u4E8E\u8D70\u5ECA\u4E0E\u4F4F\u6237\u5408\u95F8\u3002
\u6211\u77E5\u9053\u8FD9\u4E9B\u3002\u53EF\u90A3\u4E2A\u5B69\u5B50\u6572\u95E8\u7684\u65F6\u5019\uFF0C\u6211\u53EA\u60F3\u5FEB\u70B9\u79BB\u5F00\u3002

\uFF3B\u6700\u540E\u4E00\u680F\u7A7A\u7740\uFF0C\u6CA1\u6709\u7B7E\u5B57\u3002\uFF3D`},10:{title:"\u6BCD\u4EB2\u7559\u4E0B\u7684\u4FBF\u6761",location:"\u5C4B\u9876 \xB7 \u667E\u6652\u573A",item:"\u5C4B\u9876\u4FBF\u6761",cn:`\u7ED9\u6211\u7684\u4E24\u4E2A\u5B69\u5B50\uFF1A

\u96E8\u505C\u4E86\u4EE5\u540E\uFF0C\u628A\u5E8A\u5355\u6536\u5230\u5C4B\u91CC\u3002
\u82CD\u592A\u53C8\u628A\u81EA\u5DF1\u7684\u540D\u5B57\u5199\u5728\u6795\u5934\u91CC\u9762\uFF0C\u8BF4\u8FD9\u6837\u7761\u7740\u4E86\u4E5F\u4E0D\u4F1A\u5FD8\u8BB0\u3002

\u54E5\u54E5\uFF0C\u5982\u679C\u4ED6\u53C8\u85CF\u8D77\u6765\u4E86\uFF0C\u8BB0\u5F97\u53BB\u627E\u4ED6\u3002
\u4E0D\u8981\u5149\u558A\u4ED6\u7684\u540D\u5B57\uFF0C\u8981\u771F\u7684\u628A\u95E8\u6253\u5F00\u3002

\uFF3B\u4FBF\u6761\u88AB\u538B\u5728\u667E\u8863\u5939\u4E0B\u9762\uFF0C\u96E8\u6C34\u5DF2\u7ECF\u6D17\u6389\u4E86\u65E5\u671F\u3002\uFF3D`},11:{title:"\u6D17\u8863\u623F\u7684\u7559\u8A00",location:"\u4E00\u697C\u4E1C\u7FFC \xB7 \u516C\u5171\u6D17\u8863\u623F",item:"\u4F4F\u6237\u7559\u8A00",cn:`14\u65E5\u591C\u95F4\u505C\u6B62\u4F9B\u6C34\u3002
\u8BF7\u4E0D\u8981\u518D\u628A\u6D17\u8863\u673A\u91CC\u7684\u6C34\u6392\u8FDB\u5730\u4E0B\u6CF5\u623F\u3002

\u5982\u679C\u6709\u4EBA\u542C\u89C1\u5C0F\u5B69\u5728\u6570\u6570\uFF0C\u8BF7\u53EB\u7BA1\u7406\u4EBA\u6765\u3002
\u4ED6\u6709\u7EF4\u4FEE\u95E8\u7684\u94A5\u5319\u3002

\uFF3B\u901A\u77E5\u4E0A\u8D34\u7740\u4E00\u5F20\u66F4\u65E7\u7684\u7EB8\u6761\uFF1A
\u300C\u82CD\u592A\u7684\u7EA2\u5916\u5957\u4E0D\u8981\u70D8\u5E72\uFF0C\u6211\u4F1A\u56DE\u6765\u53D6\u3002\u300D\uFF3D`},12:{title:"104 \u4F4F\u6237\u65E5\u8BB0",location:"\u4E00\u697C\u4E1C\u7FFC \xB7 104 \u7A7A\u5C4B",item:"\u4F4F\u6237\u65E5\u8BB0",cn:`7\u670816\u65E5

\u6211\u51C6\u5907\u642C\u8D70\u4E86\u3002
\u51CC\u6668\u4ECD\u7136\u6709\u4EBA\u4ECE\u697C\u68AF\u4E0A\u4E0B\u6765\uFF0C\u5728\u7EF4\u4FEE\u95E8\u524D\u505C\u4F4F\u3002
\u53EA\u8981\u6211\u770B\u7740\u4ED6\uFF0C\u4ED6\u5C31\u4E0D\u52A8\u3002\u7B49\u6211\u8F6C\u8FC7\u8EAB\uFF0C\u811A\u6B65\u53C8\u4F1A\u8DDF\u4E0A\u6765\u3002

\u4E0D\u8981\u5728\u5B83\u773C\u524D\u8EB2\u8FDB\u8863\u67DC\u3002\u5148\u5173\u4E0A\u95E8\uFF0C\u7B49\u811A\u6B65\u8FDC\u4E86\u518D\u51FA\u6765\u3002

\u5C4B\u9876\u7684\u706F\u8FD8\u4EAE\u7740\u3002\u90A3\u4F4D\u6BCD\u4EB2\u4EE5\u524D\u603B\u5728\u90A3\u91CC\u667E\u4E24\u4E2A\u5B69\u5B50\u7684\u8863\u670D\u3002`},13:{title:"\u6697\u623F\u51B2\u6D17\u89C4\u7A0B",location:"\u4E8C\u697C\u897F\u7FFC \xB7 \u6697\u623F",item:"\u6444\u5F71\u5E08\u7684\u624B\u8BB0",cn:`\u6697\u623F\u53EA\u5F00\u7EA2\u8272\u5B89\u5168\u706F\u3002

\u5E95\u7247\u5148\u6D78\u5165\u663E\u5F71\u6DB2\uFF0C\u5F85\u8F6E\u5ED3\u51FA\u73B0\u540E\u505C\u663E\uFF0C\u968F\u540E\u5B9A\u5F71\uFF0C\u6700\u540E\u7528\u6E05\u6C34\u6D17\u51C0\u3002

\u663E\u5F71 \u2192 \u505C\u663E \u2192 \u5B9A\u5F71 \u2192 \u6C34\u6D17

\u663E\u5F71\u6DB2\u5B58\u653E\u5728\u5317\u9762\u7684\u4F4F\u6237\u7EAA\u5FF5\u5BA4\uFF0C\u4E0D\u80FD\u7528\u4E95\u91CC\u7684\u6C34\u4EE3\u66FF\u3002

\u90A3\u5377\u4E03\u6708\u7684\u80F6\u7247\u4E00\u76F4\u6CA1\u6709\u6D17\u51FA\u6765\u3002\u6211\u6015\u770B\u89C1\u7167\u7247\u4E0A\u7684\u5B69\u5B50\u3002`},14:{title:"\u88AB\u62B9\u53BB\u7684\u5168\u5BB6\u798F",location:"\u4E8C\u697C\u897F\u7FFC \xB7 \u6697\u623F\u51B2\u6D17\u53F0",item:"\u627E\u56DE\u7684\u540D\u5B57",cn:`1998\u5E747\u670813\u65E5\uFF0C\u5C4B\u9876\u3002

\u7167\u7247\u4E0A\u7684\u6BCD\u4EB2\u6B63\u5728\u6536\u5E8A\u5355\u3002\u7236\u4EB2\u62B1\u7740\u4E00\u7BEE\u8863\u670D\u3002
\u53F3\u8FB9\u7AD9\u7740\u4E24\u4E2A\u5B69\u5B50\u3002\u5E74\u957F\u7684\u90A3\u4E2A\u7275\u7740\u5F1F\u5F1F\u7684\u624B\u3002

\u80CC\u9762\u662F\u6BCD\u4EB2\u7684\u5B57\uFF1A
\u300C\u82CD\u592A\uFF0C\u4E03\u5C81\u3002\u54E5\u54E5\uFF0C\u5341\u4E8C\u5C81\u3002\u4E00\u4E2A\u4E5F\u4E0D\u80FD\u5C11\u3002\u300D

\u6C34\u75D5\u6CA1\u6709\u62B9\u53BB\u4ED6\uFF0C\u662F\u6211\u628A\u4ED6\u4ECE\u8BB0\u5FC6\u91CC\u5220\u6389\u4E86\u3002

\u76F8\u7EB8\u5939\u5C42\u91CC\uFF0C\u7559\u7740\u5730\u4E0B\u65E7\u533A\u7684\u94A5\u5319\u3002\u6444\u5F71\u5E08\u5199\u9053\uFF1A
\u300C\u4E0D\u8981\u53EA\u628A\u7167\u7247\u5E26\u8D70\u3002\u65E7\u533A\u6700\u91CC\u9762\u7684\u5E94\u6025\u7535\u53F0\uFF0C\u8FD8\u6CA1\u6709\u7B49\u5230\u56DE\u5E94\u3002\u300D`},15:{title:"\u6700\u540E\u4E00\u518C\u4F4F\u6237\u540D\u7C3F",location:"\u4E8C\u697C\u897F\u7FFC \xB7 \u4F4F\u6237\u7EAA\u5FF5\u5BA4",item:"\u4F4F\u6237\u540D\u7C3F",cn:`\u6E05\u573A\u524D\u7684\u6700\u540E\u6838\u5BF9

101\uFF1A\u5DF2\u8FC1\u51FA\u3002
104\uFF1A\u94A5\u5319\u5F52\u8FD8\u3002
\u4E09\u53F7\u5BA4\uFF1A\u7236\u4EB2\u3001\u6BCD\u4EB2\u3001\u957F\u5B50\u3001\u6B21\u5B50\u3002

\u7BA1\u7406\u4EBA\u5212\u6389\u4E86\u6700\u540E\u4E00\u884C\uFF0C\u6444\u5F71\u5E08\u53C8\u628A\u5B83\u8865\u4E0A\u3002

\u300C\u5931\u8E2A\u4E0D\u7B49\u4E8E\u4ECE\u6765\u6CA1\u6709\u5B58\u5728\u3002\u300D

\u7EAA\u5FF5\u5BA4\u91CC\u7559\u4E0B\u4E86\u56DB\u5F20\u6905\u5B50\u3002\u4E00\u76F4\u6CA1\u6709\u4EBA\u5750\u6700\u540E\u4E00\u5F20\u3002`},16:{title:"204 \u6444\u5F71\u5E08\u7684\u65E5\u8BB0",location:"\u4E8C\u697C\u897F\u7FFC \xB7 204 \u6444\u5F71\u5E08\u65E7\u5C45",item:"\u897F\u7FFC\u65E5\u8BB0",cn:`7\u670813\u65E5

\u4E09\u53F7\u5BA4\u8BF7\u6211\u5728\u5C4B\u9876\u62CD\u4E00\u5F20\u5168\u5BB6\u798F\u3002\u82CD\u592A\u575A\u6301\u8981\u7275\u7740\u54E5\u54E5\uFF0C\u8BF4\u8FD9\u6837\u6349\u8FF7\u85CF\u5C31\u4E0D\u4F1A\u8D70\u6563\u3002

7\u670814\u65E5

\u505C\u7535\u4EE5\u540E\uFF0C\u6211\u542C\u89C1\u5730\u4E0B\u6709\u4EBA\u558A\u6551\u547D\u3002\u7BA1\u7406\u4EBA\u8BF4\uFF0C\u6CF5\u623F\u91CC\u6CA1\u4EBA\u3002
\u6211\u76F8\u4FE1\u4E86\u3002

\u5E95\u7247\u7559\u5728\u684C\u4E0A\u7684\u76F8\u673A\u65C1\u3002\u663E\u5F71\u6DB2\u5728\u7EAA\u5FF5\u5BA4\u91CC\u3002\u8BF7\u66FF\u6211\u6D17\u51FA\u90A3\u5F20\u7167\u7247\u3002

\u7EA2\u706F\u4EAE\u7740\u7684\u65F6\u5019\uFF0C\u522B\u6025\u7740\u56DE\u5934\u3002`},17:{title:"\u9632\u6C34\u888B\u91CC\u7684\u6536\u636E",location:"\u4E8C\u697C\u897F\u7FFC \xB7 \u4F4F\u6237\u7EAA\u5FF5\u5BA4",item:"\u4E8B\u6545\u524D\u7684\u51ED\u636E",cn:`\u56DE\u58F0\u516C\u5BD3 \xB7 \u6392\u6C34\u8BBE\u5907\u68C0\u4FEE

7\u670812\u65E5\uFF1A\u6CF5\u623F\u95E8\u9501\u5931\u6548\uFF0C\u96E8\u5B63\u524D\u5E94\u7ACB\u5373\u66F4\u6362\u3002
7\u670813\u65E5\uFF1A\u7EF4\u4FEE\u7533\u8BF7\u88AB\u9000\u56DE\uFF0C\u539F\u56E0\u4E3A\u300C\u62C6\u9664\u5728\u5373\uFF0C\u8D39\u7528\u4E0D\u4E88\u6279\u51C6\u300D\u3002

\u6536\u636E\u80CC\u9762\uFF0C\u56DB\u4F4D\u4F4F\u6237\u5171\u540C\u7B7E\u5B57\u3002

\u8FD9\u4E0D\u662F\u4E00\u4E2A\u5B69\u5B50\u7684\u9519\uFF0C\u4E5F\u4E0D\u662F\u53EA\u6709\u4E00\u4E2A\u4EBA\u77E5\u9053\u7684\u79D8\u5BC6\u3002

\uFF3B\u9632\u6C34\u888B\u4E0A\u7684\u6807\u7B7E\u5199\u7740\uFF1A\u4E0D\u8981\u628A\u8BC1\u636E\u4E5F\u5E26\u8FDB\u6C34\u91CC\u3002\uFF3D`},18:{title:"\u6700\u540E\u4E00\u6B21\u4EA4\u73ED\u65E5\u5FD7",location:"\u5730\u4E0B\u65E7\u533A \xB7 \u503C\u73ED\u7AD9",item:"\u591C\u73ED\u8BB0\u5F55",cn:`7\u670814\u65E5\uFF0C02:17

\u505C\u7535\u3002\u4E3B\u6CF5\u65AD\u5F00\uFF0C\u5907\u7528\u673A\u672A\u542F\u52A8\u3002
\u8D70\u5ECA\u91CC\u6709\u4E00\u4E2A\u5B69\u5B50\u8BF4\uFF0C\u54E5\u54E5\u5728\u95E8\u5916\u3002

02:31
\u6211\u542C\u89C1\u6572\u51FB\uFF0C\u8BB0\u5F55\u6210\u300C\u7BA1\u9053\u6C34\u9524\u300D\u3002

03:06
\u6551\u63F4\u9891\u9053\u6CA1\u6709\u4EBA\u5E94\u7B54\u3002\u4E0D\u662F\u4ED6\u4EEC\u6CA1\u6709\u6765\uFF0C\u662F\u6211\u4EEC\u6839\u672C\u6CA1\u6709\u53D1\u51FA\u547C\u53EB\u3002

\uFF3B\u9875\u8FB9\u8865\u8BB0\uFF1A\u8F93\u51FA\u7194\u65AD\u5668\u653E\u5728\u642C\u8FC1\u6863\u6848\u5E93\u7684\u7EFF\u8272\u7EF4\u4FEE\u76D2\u3002\u5148\u6062\u590D\u67F4\u6CB9\u673A\uFF0C\u518D\u53BB\u6700\u91CC\u9762\u7684\u7535\u53F0\u5BA4\u3002\uFF3D`},19:{title:"\u5907\u7528\u67F4\u6CB9\u673A\u542F\u52A8\u89C4\u7A0B",location:"\u5730\u4E0B\u65E7\u533A \xB7 \u53D1\u7535\u673A\u623F",item:"\u542F\u52A8\u89C4\u7A0B",cn:`\u5907\u7528\u67F4\u6CB9\u53D1\u7535\u673A \xB7 \u4EBA\u5DE5\u542F\u52A8

\u88C5\u56DE\u8F93\u51FA\u7194\u65AD\u5668\u540E\uFF1A

\u2460 \u9884\u70ED
\u2461 \u4F9B\u6CB9
\u2462 \u63A5\u901A\u8F93\u51FA

\u4F9B\u6CB9\u524D\u5FC5\u987B\u9884\u70ED\uFF0C\u8F93\u51FA\u4E0D\u5F97\u63D0\u524D\u63A5\u901A\u3002

\u5907\u7528\u8F93\u51FA\u53EA\u8FDE\u63A5\u5E94\u6025\u7535\u53F0\u4E0E\u8FDC\u7AEF\u6CF5\u623F\u7EE7\u7535\u5668\u3002\u4E3B\u697C\u6765\u7535\u4E0D\u4EE3\u8868\u7535\u53F0\u5DF2\u7ECF\u6062\u590D\u3002`},20:{title:"\u6CA1\u6709\u7ED3\u6E05\u7684\u642C\u8FC1\u603B\u8D26",location:"\u5730\u4E0B\u65E7\u533A \xB7 \u642C\u8FC1\u6863\u6848\u5E93",item:"\u642C\u8FC1\u603B\u8D26",cn:`\u4E09\u53F7\u5BA4\uFF1A\u56DB\u4EBA\u3002
\u8865\u507F\u4EBA\u6570\uFF1A\u4E09\u4EBA\u3002

\u4E00\u4EFD\u4E8B\u6545\u8BB0\u5F55\u88AB\u6539\u6210\u4E86\u8BBE\u5907\u6545\u969C\u3002\u4E00\u4EFD\u7EF4\u4FEE\u7533\u8BF7\u88AB\u538B\u5230\u4E86\u62C6\u9664\u6E05\u5355\u4E0B\u9762\u3002

\u6444\u5F71\u5E08\u5728\u5C01\u9762\u4E0A\u5199\uFF1A
\u300C\u5982\u679C\u6240\u6709\u4EBA\u90FD\u8BF4\u6CA1\u6709\u53D1\u751F\uFF0C\u90A3\u4E2A\u5B69\u5B50\u5C31\u4F1A\u6C38\u8FDC\u5F85\u5728\u8FD9\u91CC\u3002\u300D

\u7EFF\u8272\u7EF4\u4FEE\u76D2\u91CC\u4FDD\u5B58\u7740\u65E7\u533A\u8F93\u51FA\u7194\u65AD\u5668\u3002\u8BF7\u8BA9\u90A3\u90E8\u7535\u53F0\u91CD\u65B0\u901A\u7535\u3002`},21:{title:"\u5E94\u6025\u547C\u53EB\u9891\u9053\u8868",location:"\u5730\u4E0B\u65E7\u533A \xB7 \u5E94\u6025\u7535\u53F0\u5BA4",item:"\u7535\u53F0\u9891\u9053",cn:`\u591C\u95F4\u6551\u63F4\u4E13\u7528\uFF1A14.07 MHz

\u65E7\u9762\u677F\u53EA\u63A5\u53D7\u56DB\u4F4D\u6570\uFF0C\u53BB\u6389\u5C0F\u6570\u70B9\uFF0C\u8F93\u5165 1407\u3002

\u6309\u4F4F\u901A\u8BDD\uFF0C\u5148\u62A5\u5730\u70B9\uFF0C\u518D\u62A5\u59D3\u540D\u3002
\u4E0D\u8981\u56E0\u4E3A\u6CA1\u6709\u7ACB\u523B\u542C\u89C1\u56DE\u5E94\uFF0C\u5C31\u7ED3\u675F\u547C\u53EB\u3002

\uFF3B\u624B\u5199\u5B57\uFF1A\u56DE\u58F0\u516C\u5BD3\uFF0C\u5730\u4E0B\u5C42\u3002\u82CD\u592A\uFF0C\u4E03\u5C81\u3002\u8FD8\u6709\u4EBA\u7B49\u7740\u4ED6\u56DE\u5BB6\u3002\uFF3D`},22:{title:"\u84C4\u6C34\u6C60\u65C1\u7684\u523B\u5B57",location:"\u5730\u4E0B\u65E7\u533A \xB7 \u65E7\u84C4\u6C34\u6C60",item:"\u5B69\u5B50\u7559\u4E0B\u7684\u6807\u8BB0",cn:`\u82CD\u592A\uFF0C\u4E03\u5C81\u3002
\u54E5\u54E5\uFF0C\u5341\u4E8C\u5C81\u3002

\u6BCF\u4E00\u9053\u523B\u7EBF\u90FD\u662F\u4E00\u8F6E\u6570\u6570\u3002\u6700\u540E\u4E00\u9053\u6CA1\u6709\u753B\u5B8C\u3002

\u523B\u5B57\u65C1\u8FB9\u5199\u7740\uFF1A
\u300C\u53EA\u8981\u6B4C\u8FD8\u4F1A\u54CD\uFF0C\u54E5\u54E5\u5C31\u80FD\u627E\u5230\u6211\u3002\u300D

\u4F60\u7EC8\u4E8E\u660E\u767D\uFF0C\u90A3\u4E9B\u6572\u51FB\u4ECE\u6765\u4E0D\u662F\u60F3\u8BA9\u4EBA\u79BB\u5F00\u3002`},23:{title:"\u7EC8\u4E8E\u53D1\u51FA\u7684\u6C42\u6551",location:"\u5730\u4E0B\u65E7\u533A \xB7 \u5E94\u6025\u7535\u53F0",item:"\u6551\u63F4\u547C\u53EB\u8F6C\u5199",cn:`\uFF3B\u7535\u6D41\u58F0\u3002\u968F\u540E\uFF0C\u5BF9\u9762\u6709\u4EBA\u56DE\u7B54\u3002\uFF3D

\u300C\u8BF7\u62A5\u5730\u70B9\u4E0E\u59D3\u540D\u3002\u300D

\u300C\u56DE\u58F0\u516C\u5BD3\uFF0C\u5730\u4E0B\u5C42\u3002\u82CD\u592A\uFF0C\u4E03\u5C81\u3002\u300D

\u300C\u6536\u5230\u3002\u4E0D\u8981\u518D\u628A\u95E8\u5173\u4E0A\u3002\u300D

\u4F60\u6CA1\u6709\u653E\u5F00\u901A\u8BDD\u952E\u3002
\u4F60\u628A\u90A3\u4E2A\u540D\u5B57\u53C8\u8BF4\u4E86\u4E00\u904D\u3002

\u8FDC\u7AEF\u6CF5\u623F\u7684\u7EE7\u7535\u5668\u63A5\u901A\u4E86\u3002\u73B0\u5728\u53EF\u4EE5\u5E26\u624B\u8F6E\u56DE\u5230\u539F\u6392\u6C34\u95F4\uFF0C\u6CC4\u538B\u3001\u6392\u6C34\u3001\u56DE\u6C34\u3002
\u8FD9\u4E00\u6B21\uFF0C\u4E0D\u4F1A\u518D\u6709\u4EBA\u628A\u6572\u95E8\u58F0\u5199\u6210\u6545\u969C\u3002`},24:{title:"\u6CF5\u623F\u95E8\u9501\u5DE5\u5355",location:"\u5730\u4E0B\u65E7\u533A \xB7 \u503C\u73ED\u7AD9",item:"\u672A\u6267\u884C\u5DE5\u5355",cn:`\u6CF5\u623F\u95E8\u9501\uFF1A\u7531\u5185\u90E8\u4E0D\u80FD\u6253\u5F00\u3002
\u5EFA\u8BAE\u7ACB\u5373\u64A4\u6362\uFF0C\u5E76\u5728\u7535\u53F0\u4FA7\u589E\u52A0\u8FDC\u7A0B\u89E3\u9501\u7EE7\u7535\u5668\u3002

\u9A8C\u6536\u680F\u4E00\u76F4\u7A7A\u7740\u3002

\u6444\u5F71\u5E08\u5077\u5077\u63A5\u597D\u4E86\u7EE7\u7535\u5668\uFF0C\u5374\u6CA1\u6709\u7ED9\u5907\u7528\u7535\u53F0\u901A\u7535\u3002

\uFF3B\u6700\u540E\u7684\u6279\u6CE8\uFF1A\u9700\u8981\u5148\u542F\u52A8\u67F4\u6CB9\u673A\uFF0C\u518D\u63A5\u901A\u6551\u63F4\u9891\u9053\u3002\u673A\u68B0\u624B\u8F6E\u4ECD\u5728\u4E00\u697C\u4E1C\u7FFC\u7EF4\u4FEE\u5BA4\u3002\uFF3D`},25:{title:"\u672A\u53D6\u8D70\u7684\u9762\u5305\u8BA2\u5355",location:"\u793E\u533A \xB7 \u96E8\u591C\u6742\u8D27\u5E97",item:"\u793E\u533A\u8BB0\u5F55 01",cn:`\u4E03\u6708\u5341\u56DB\u65E5\uFF0C\u4E09\u53F7\u5BA4\u3002

\u56DB\u4EFD\u725B\u5976\u9762\u5305\u3002\u4E24\u4EFD\u4E0D\u8981\u8461\u8404\u5E72\u3002

\u6BCD\u4EB2\u4ED8\u8FC7\u94B1\uFF0C\u8BF4\u96E8\u505C\u4EE5\u540E\u8BA9\u54E5\u54E5\u6765\u53D6\u3002
\u4E03\u6708\u5341\u4E94\u65E5\uFF0C\u5E97\u4E3B\u628A\u6570\u91CF\u6539\u6210\u4E09\u4EFD\uFF0C\u53C8\u5212\u6389\u4E86\u3002

\u67DC\u53F0\u4E0B\u9762\u8FD8\u538B\u7740\u90A3\u679A\u96F6\u94B1\u3002\u6CA1\u6709\u4EBA\u6765\u8981\u6C42\u9000\u6B3E\u3002`},26:{title:"\u516C\u7528\u7535\u8BDD\u901A\u8BDD\u5E95\u5355",location:"\u793E\u533A \xB7 \u6742\u8D27\u5E97\u7535\u8BDD\u53F0",item:"\u793E\u533A\u8BB0\u5F55 02",cn:`02:24\uFF0C\u62E8\u53F7\u81F3\u793E\u533A\u536B\u751F\u7AD9\u3002
\u901A\u8BDD\u65F6\u95F4\uFF1A\u5341\u4E00\u79D2\u3002

\u63A5\u7EBF\u5458\u7684\u5907\u6CE8\uFF1A\u4E00\u4E2A\u5B69\u5B50\u4E00\u76F4\u95EE\uFF0C\u6C34\u4F1A\u4E0D\u4F1A\u6DA8\u8FC7\u95E8\u4E0A\u7684\u7A97\u3002\u6709\u4EBA\u5728\u540E\u9762\u558A\u4ED6\u522B\u6DFB\u4E71\uFF0C\u7535\u8BDD\u5C31\u65AD\u4E86\u3002

\u4E0D\u662F\u6CA1\u6709\u4EBA\u542C\u5230\u3002\u62E8\u53F7\u7684\u662F\u4F60\u3002\u4F60\u8DD1\u6765\u6C42\u8FC7\u6551\uFF0C\u53C8\u5728\u5927\u4EBA\u7684\u50AC\u4FC3\u4E0B\u677E\u5F00\u4E86\u542C\u7B52\u3002
\u536B\u751F\u7AD9\u7684\u63A5\u7EBF\u8BB0\u5F55\u5E94\u5F53\u8FD8\u5728\u3002`},27:{title:"\u6551\u63F4\u63A5\u7EBF\u8BB0\u5F55",location:"\u793E\u533A \xB7 \u8857\u533A\u536B\u751F\u7AD9",item:"\u793E\u533A\u8BB0\u5F55 03",cn:`02:25\uFF0C\u51C6\u5907\u6D3E\u4EBA\u524D\u5F80\u56DE\u58F0\u516C\u5BD3\u3002
02:28\uFF0C\u7BA1\u7406\u5904\u56DE\u7535\uFF1A\u8BEF\u62A5\uFF0C\u5DF2\u786E\u8BA4\u697C\u5185\u65E0\u4EBA\u88AB\u56F0\u3002
02:31\uFF0C\u53D6\u6D88\u51FA\u8F66\u3002

\u503C\u73ED\u62A4\u58EB\u5728\u4E0B\u9762\u8865\u4E86\u4E00\u53E5\uFF1A\u6211\u6CA1\u6709\u542C\u89C1\u5B69\u5B50\u4EB2\u53E3\u8BF4\u5B89\u5168\u3002

\u6551\u63F4\u53F0\u8981\u6C42\u91CD\u65B0\u547C\u53EB\u65F6\u540C\u65F6\u62A5\u51FA\u5730\u70B9\u548C\u59D3\u540D\u3002\u9891\u9053 14.07\uFF0C\u9762\u677F\u8F93\u5165 1407\u3002\u63A5\u901A\u524D\u4E0D\u8981\u677E\u5F00\u901A\u8BDD\u952E\u3002

\u8FD9\u4E00\u6B21\uFF0C\u628A\u4F60\u77E5\u9053\u7684\u8BF4\u5B8C\u3002`}},bs=[{title:"\u6765\u4FE1",subtitle:"\u6709\u4E9B\u5931\u7269\uFF0C\u4E00\u76F4\u5728\u7B49\u4F60\u3002"},{title:"\u505C\u7535\u7684\u90A3\u4E00\u591C",subtitle:"\u8FD9\u680B\u697C\u8BB0\u5F97\u4F60\u9057\u5FD8\u7684\u4E8B\u60C5\u3002"},{title:"\u6CA1\u6709\u7ED3\u675F\u7684\u6349\u8FF7\u85CF",subtitle:"\u6B4C\u505C\u4E4B\u540E\uFF0C\u8C01\u4E5F\u6CA1\u6709\u6765\u3002"},{title:"\u7167\u7247\u91CC\u5C11\u4E86\u4E00\u4E2A\u4EBA",subtitle:"\u88AB\u62B9\u53BB\u7684\u540D\u5B57\uFF0C\u8FD8\u7559\u5728\u5E95\u7247\u4E0A\u3002"},{title:"\u4E95\u4E0B\u7684\u6765\u7535",subtitle:"\u90A3\u4E00\u591C\u6CA1\u6709\u53D1\u51FA\u7684\u6C42\u6551\uFF0C\u7EC8\u4E8E\u6709\u4EBA\u56DE\u7B54\u3002"},{title:"\u628A\u540D\u5B57\u5E26\u51FA\u53BB",subtitle:"\u8FD9\u4E00\u6B21\uFF0C\u522B\u518D\u72EC\u81EA\u79BB\u5F00\u3002"}],cx=["invitation","power","cabinet","tapePlayed","memory","photo","generator","relay","released","ended"],Su=["serviceKey","fuse","archiveKey","tape","valveHandle","exitKey","westKey","film","developer","annexKey","relayFuse"],hx=Object.keys(Di),nr=(i,t)=>Array.isArray(i)&&i.length===t.length&&i.every((e,n)=>e===t[n]),Ii=class{constructor(t=null){this.flags={},this.items=new Set,this.documents=new Set,this.checkpoint={x:0,y:0,z:-6.4},this.elapsed=0,this.events=new Set,t&&this.restore(t)}get chapter(){return this.flags.relay?5:this.flags.photo?4:this.flags.memory?3:this.flags.cabinet?2:this.flags.power?1:0}get objective(){return this.flags.invitation?!this.items.has("fuse")&&!this.flags.power?"\u5230\u4E00\u697C\u53A8\u623F\u5BFB\u627E\u5907\u7528\u7194\u65AD\u5668":this.flags.power?!this.flags.cabinet&&!this.documents.has("2")?"\u8C03\u67E5\u4E00\u697C\u4F5B\u95F4\u7684\u65E7\u62A5\u7EB8\uFF0C\u5BFB\u627E\u6863\u6848\u67DC\u5BC6\u7801":this.flags.cabinet?this.items.has("tape")?this.flags.tapePlayed?!this.flags.memory&&!this.documents.has("3")?"\u5BFB\u627E\u4E00\u697C\u513F\u7AE5\u623F\u7684\u753B\uFF0C\u8FA8\u8BA4\u516B\u97F3\u76D2\u65CB\u5F8B":this.flags.memory?!this.flags.photo&&!this.items.has("film")?"\u7528\u516B\u97F3\u76D2\u91CC\u7684\u94A5\u5319\u6253\u5F00\u4E8C\u697C\u897F\u7FFC\uFF0C\u5230 204 \u5BFB\u627E\u5E95\u7247":!this.flags.photo&&!this.items.has("developer")?"\u5728\u897F\u7FFC\u4F4F\u6237\u7EAA\u5FF5\u5BA4\u53D6\u56DE\u663E\u5F71\u6DB2":this.flags.photo?!this.flags.generator&&!this.items.has("relayFuse")?"\u7528\u76F8\u7EB8\u5939\u5C42\u7684\u94A5\u5319\u8FDB\u5165\u5730\u4E0B\u65E7\u533A\uFF0C\u5728\u642C\u8FC1\u6863\u6848\u5E93\u627E\u8F93\u51FA\u7194\u65AD\u5668":this.flags.generator?!this.flags.relay&&!this.documents.has("27")?"\u4ECE\u5927\u5385\u5916\u95E8\u8FDB\u5165\u793E\u533A\uFF0C\u5230\u536B\u751F\u7AD9\u67E5\u660E\u6551\u63F4\u4E3A\u4F55\u53D6\u6D88":this.flags.relay?!this.flags.released&&!this.items.has("valveHandle")?"\u5230\u4E00\u697C\u4E1C\u7FFC\u7EF4\u4FEE\u5BA4\u53D6\u56DE\u6392\u6C34\u9600\u624B\u8F6E":this.flags.released?"\u5E26\u7740\u82CD\u592A\u7684\u540D\u5B57\uFF0C\u524D\u5F80\u4E8C\u697C\u5929\u4E95\u9632\u706B\u95E8":"\u8FD4\u56DE\u5730\u4E0B\u6392\u6C34\u95F4\uFF0C\u88C5\u56DE\u624B\u8F6E\u5E76\u8F6C\u5F00\u4E09\u53EA\u9600\u95E8":"\u5E26\u7740\u536B\u751F\u7AD9\u7684\u8BB0\u5F55\u56DE\u5730\u4E0B\u7535\u53F0\uFF0C\u91CD\u65B0\u53D1\u51FA\u6551\u63F4\u547C\u53EB":"\u5230\u5730\u4E0B\u65E7\u533A\u53D1\u7535\u673A\u623F\uFF0C\u6062\u590D\u7535\u53F0\u5907\u7528\u8F93\u51FA":"\u5230\u4E8C\u697C\u897F\u7FFC\u6697\u623F\uFF0C\u6D17\u51FA\u4E09\u53F7\u5BA4\u7684\u5168\u5BB6\u798F":"\u56DE\u5230\u4E00\u697C\u513F\u7AE5\u623F\uFF0C\u8BA9\u516B\u97F3\u76D2\u518D\u6B21\u54CD\u8D77":"\u8FDB\u5165\u4E8C\u697C 203 \u653E\u6620\u5BA4\uFF0C\u64AD\u653E\u5F55\u97F3\u5E26":"\u5728\u4E8C\u697C 202 \u53F7\u5BA4\u53D6\u56DE\u5F55\u97F3\u5E26":"\u4E0A\u4E8C\u697C\uFF0C\u5728 201 \u7BA1\u7406\u5BA4\u6253\u5F00\u6863\u6848\u67DC":"\u4ECE\u8D70\u5ECA\u7EF4\u4FEE\u95E8\u4E0B\u697C\uFF0C\u6062\u590D\u5730\u4E0B\u5907\u7528\u7535\u6E90":"\u8C03\u67E5\u5165\u53E3\u5927\u5385\u503C\u73ED\u53F0\u4E0A\u6CA1\u6709\u7F72\u540D\u7684\u4FE1"}get hint(){return this.flags.invitation?this.flags.power?this.flags.cabinet?this.flags.tapePlayed?this.flags.memory?this.flags.photo?this.flags.generator?!this.flags.relay&&!this.documents.has("27")?"\u6062\u590D\u4F9B\u7535\u540E\uFF0C\u5927\u5385\u5916\u95E8\u53EF\u4EE5\u6253\u5F00\u3002\u7A7F\u8FC7\u4E2D\u5EAD\uFF0C\u53F3\u4FA7\u536B\u751F\u7AD9\u524D\u53F0\u4FDD\u5B58\u7740\u6551\u63F4\u63A5\u7EBF\u8BB0\u5F55\u3002":this.flags.relay?!this.flags.released&&!this.items.has("valveHandle")?"\u4E1C\u7FFC\u5165\u53E3\u5728\u4E00\u697C\u957F\u8D70\u5ECA\u53F3\u4FA7\u3002\u624B\u8F6E\u7559\u5728\u7BA1\u7406\u5458\u7EF4\u4FEE\u5BA4\u7684\u5DE5\u5177\u53F0\u4E0A\u3002":this.flags.released?"\u9632\u706B\u95E8\u5728\u4E8C\u697C\u8D70\u5ECA\u4E2D\u6BB5\u3002\u4FDD\u6301\u7535\u91CF\uFF1B\u8863\u67DC\u53EF\u4EE5\u8EB2\u85CF\uFF0C\u4F46\u522B\u5728\u5B83\u773C\u524D\u8EB2\u8FDB\u53BB\u3002":"\u5E26\u624B\u8F6E\u5230\u5730\u4E0B\u6392\u6C34\u95F4\u3002\u5F55\u97F3\u8BB0\u5F55\u7740\u64CD\u4F5C\u6B21\u5E8F\uFF1A\u6CC4\u538B\u3001\u6392\u6C34\u3001\u56DE\u6C34\u3002":"\u7535\u53F0\u5728\u65E7\u533A\u5C3D\u5934\u3002\u9891\u9053\u8868\u6807\u660E 14.07 MHz\uFF0C\u53BB\u6389\u5C0F\u6570\u70B9\uFF0C\u8F93\u5165 1407\u3002":"\u65E7\u533A\u5165\u53E3\u5728\u5730\u4E0B\u914D\u7535\u95F4\u6700\u91CC\u9762\u3002\u8F93\u51FA\u7194\u65AD\u5668\u5728\u6863\u6848\u5E93\u7EFF\u8272\u7EF4\u4FEE\u76D2\uFF0C\u67F4\u6CB9\u673A\u6309\u9884\u70ED\u3001\u4F9B\u6CB9\u3001\u8F93\u51FA\u542F\u52A8\u3002":"\u897F\u7FFC\u5165\u53E3\u5728\u4E8C\u697C\u9760\u8FD1\u697C\u68AF\u95F4\u7684\u5DE6\u4FA7\u3002204 \u684C\u4E0A\u6709\u5E95\u7247\uFF0C\u5317\u9762\u7684\u7EAA\u5FF5\u5BA4\u6709\u663E\u5F71\u6DB2\u3002\u6697\u623F\u7EA2\u706F\u65C1\u8BB0\u5F55\u7740\u51B2\u6D17\u987A\u5E8F\u3002":"\u753B\u4E0A\u6807\u51FA\u4E86\u7B2C 3\u3001\u7B2C 1\u3001\u7B2C 4 \u6839\u7EBF\u3002\u6309\u8FD9\u4E2A\u987A\u5E8F\u5F39\u594F\u56DB\u4E2A\u97F3\u3002":"202 \u5728\u4E8C\u697C\u8D70\u5ECA\u53F3\u4FA7\uFF0C203 \u5728\u5DE6\u4FA7\u3002\u9700\u8981\u6863\u6848\u67DC\u91CC\u7684\u94A5\u5319\u3002":"\u4F5B\u95F4\u526A\u62A5\u63D0\u793A\u7528\u505C\u7535\u65F6\u523B\u4F5C\u4E3A\u5BC6\u7801\uFF1B\u5899\u4E0A\u7684\u949F\u505C\u5728 02:17\u3002":this.items.has("fuse")?"\u7EF4\u4FEE\u95E8\u5728\u4E00\u697C\u957F\u8D70\u5ECA\u53F3\u4FA7\u3002\u914D\u7535\u7BB1\u65C1\u7684\u68C0\u4FEE\u5361\u8BB0\u5F55\u7740\u5408\u95F8\u987A\u5E8F\u3002":"\u53A8\u623F\u5728\u7384\u5173\u5DE6\u4FA7\u7B2C\u4E00\u6247\u95E8\u540E\u3002\u7194\u65AD\u5668\u653E\u5728\u9760\u5899\u7684\u5DE5\u5177\u76D2\u91CC\u3002":"\u5165\u53E3\u5927\u5385\u5DE6\u4FA7\u503C\u73ED\u53F0\u4E0A\u7684\u4FE1\u53EF\u4EE5\u8C03\u67E5\u3002\u6309 E\uFF0C\u6216\u70B9\u51FB\u53F3\u4FA7\u8C03\u67E5\u6309\u94AE\u3002"}collectDocument(t){let e=String(t);return!Di[e]||this.documents.has(e)?!1:(this.documents.add(e),e==="invitation"&&(this.flags.invitation=!0,this.items.add("serviceKey")),!0)}collectItem(t){return!Su.includes(t)||this.items.has(t)||["westKey","film","developer"].includes(t)&&!this.flags.memory||(t==="film"||t==="developer")&&this.flags.photo||["annexKey","relayFuse"].includes(t)&&!this.flags.photo||t==="relayFuse"&&this.flags.generator?!1:(this.items.add(t),!0)}perform(t,e){let n=s=>({ok:!1,message:s});if(t==="power"){if(this.flags.power)return n("\u5907\u7528\u7535\u6E90\u5DF2\u7ECF\u63A5\u901A\u3002");if(!this.flags.invitation||!this.items.has("fuse"))return n("\u7194\u65AD\u5668\u70E7\u65AD\u4E86\u3002\u53A8\u623F\u5E94\u8BE5\u6709\u5907\u7528\u4EF6\u3002");if(!nr(e,[2,0,1]))return n("\u4FDD\u62A4\u5F00\u5173\u8DF3\u95F8\u4E86\u3002\u5148\u542F\u52A8\u6392\u6C34\uFF0C\u518D\u542F\u52A8\u8D70\u5ECA\u4E0E\u4F4F\u6237\u7535\u6E90\u3002");this.flags.power=!0,this.items.delete("fuse"),this.checkpoint={x:13.2,y:-2.8,z:20.5}}else if(t==="cabinet"){if(!this.flags.power)return n("\u7535\u5B50\u9501\u6CA1\u6709\u7535\u3002\u5148\u6062\u590D\u5730\u4E0B\u7535\u6E90\u3002");if(this.flags.cabinet)return n("\u6863\u6848\u67DC\u5DF2\u7ECF\u6253\u5F00\u3002");if(String(e)!=="0217")return n("\u5BC6\u7801\u4E0D\u5BF9\u3002\u526A\u62A5\u4E0A\u8BF4\uFF0C\u662F\u505C\u7535\u7684\u65F6\u523B\u3002");this.flags.cabinet=!0,this.items.add("archiveKey"),this.checkpoint={x:-2.8,y:2.8,z:21.2}}else if(t==="tape"){if(!this.items.has("archiveKey"))return n("\u9700\u8981\u7BA1\u7406\u5BA4\u6863\u6848\u67DC\u91CC\u7684\u94A5\u5319\u3002");if(!this.items.has("tape"))return n("\u6CA1\u6709\u5F55\u97F3\u5E26\u3002202 \u53F7\u5BA4\u91CC\u8FD8\u7559\u7740\u4E00\u76D8\u3002");if(this.flags.tapePlayed)return n("\u90A3\u4E00\u591C\u7684\u5F55\u97F3\u5DF2\u7ECF\u6536\u8FDB\u8C03\u67E5\u624B\u518C\u3002");this.flags.tapePlayed=!0,this.collectDocument(5)}else if(t==="music"){if(!this.flags.tapePlayed)return n("\u53D1\u6761\u5361\u4F4F\u4E86\u3002\u5148\u627E\u5230\u5E76\u64AD\u653E\u4E8C\u697C\u7684\u5F55\u97F3\u5E26\u3002");if(this.flags.memory)return n("\u516B\u97F3\u76D2\u7684\u5939\u5C42\u5DF2\u7ECF\u6253\u5F00\u3002");if(!nr(e,[3,1,4]))return n("\u65CB\u5F8B\u4E0D\u5BF9\u3002\u5B69\u5B50\u7684\u753B\u91CC\u7559\u4E0B\u4E86\u4E09\u4E2A\u97F3\u7B26\u3002");this.flags.memory=!0,this.items.add("westKey"),this.collectDocument(7),this.checkpoint={x:2.8,y:0,z:10.7}}else if(t==="develop"){if(!this.flags.memory)return n("\u8FD8\u6CA1\u6709\u627E\u5230\u897F\u7FFC\u7684\u94A5\u5319\u3002\u5148\u8BA9\u516B\u97F3\u76D2\u54CD\u8D77\u6765\u3002");if(this.flags.photo)return n("\u5168\u5BB6\u798F\u5DF2\u7ECF\u6D17\u51FA\u6765\u4E86\u3002");if(!this.items.has("film"))return n("\u9700\u8981 204 \u6444\u5F71\u5E08\u65E7\u5C45\u91CC\u7684\u90A3\u5377\u5E95\u7247\u3002");if(!this.items.has("developer"))return n("\u663E\u5F71\u6DB2\u7528\u5B8C\u4E86\u3002\u5317\u9762\u7684\u4F4F\u6237\u7EAA\u5FF5\u5BA4\u91CC\u6709\u4E00\u74F6\u3002");if(!nr(e,[0,2,1,3]))return n("\u7EB8\u4E0A\u7684\u5F71\u50CF\u6563\u5F00\u4E86\u3002\u5148\u663E\u5F71\uFF0C\u518D\u505C\u663E\u3001\u5B9A\u5F71\uFF0C\u6700\u540E\u6C34\u6D17\u3002");this.flags.photo=!0,this.items.add("annexKey"),this.items.delete("film"),this.items.delete("developer"),this.collectDocument(14),this.checkpoint={x:-25,y:2.8,z:50.5}}else if(t==="generator"){if(!this.flags.photo)return n("\u5730\u4E0B\u65E7\u533A\u4ECD\u7136\u9501\u7740\u3002\u5148\u6D17\u51FA\u5168\u5BB6\u798F\u3002");if(this.flags.generator)return n("\u5907\u7528\u67F4\u6CB9\u673A\u5DF2\u7ECF\u542F\u52A8\u3002");if(!this.items.has("relayFuse"))return n("\u8F93\u51FA\u7194\u65AD\u5668\u7F3A\u5931\u3002\u65E7\u533A\u6863\u6848\u5E93\u7684\u7EFF\u8272\u7EF4\u4FEE\u76D2\u91CC\u6709\u5907\u4EF6\u3002");if(!nr(e,[1,0,2]))return n("\u67F4\u6CB9\u673A\u6CA1\u6709\u8D77\u52A8\u3002\u5148\u9884\u70ED\uFF0C\u518D\u4F9B\u6CB9\uFF0C\u6700\u540E\u63A5\u901A\u8F93\u51FA\u3002");this.flags.generator=!0,this.items.delete("relayFuse"),this.checkpoint={x:31,y:-2.8,z:40}}else if(t==="radio"){if(!this.flags.generator)return n("\u7535\u53F0\u6CA1\u6709\u7535\u3002\u5148\u6062\u590D\u65E7\u533A\u67F4\u6CB9\u673A\u8F93\u51FA\u3002");if(this.flags.relay)return n("\u6551\u63F4\u9891\u9053\u5DF2\u7ECF\u63A5\u901A\u3002\u8F6C\u5199\u6536\u5728\u8C03\u67E5\u624B\u518C\u4E2D\u3002");if(!this.documents.has("27"))return n("\u547C\u53EB\u7F3A\u5C11\u4E8B\u6545\u6838\u5B9E\u8BB0\u5F55\u3002\u5148\u5230\u5927\u5385\u5916\u7684\u793E\u533A\u536B\u751F\u7AD9\uFF0C\u67E5\u660E\u90A3\u4E00\u591C\u4E3A\u4F55\u53D6\u6D88\u6551\u63F4\u3002");if(String(e)!=="1407")return n("\u53EA\u6709\u6742\u97F3\u3002\u9891\u9053\u8868\u6807\u660E\u4E86\u56DB\u4F4D\u8C03\u8C10\u7801\u3002");this.flags.relay=!0,this.collectDocument(23),this.checkpoint={x:18,y:-2.8,z:62.5}}else if(t==="valves"){if(!this.flags.memory)return n("\u6C34\u95F8\u5C01\u6B7B\u4E86\u3002\u4F3C\u4E4E\u5728\u7B49\u5F85\u6709\u4EBA\u8BB0\u8D77\u4EC0\u4E48\u3002");if(!this.flags.photo)return n("\u94C1\u94FE\u4ECD\u7136\u7EF7\u7D27\u3002\u5148\u5728\u897F\u7FFC\u6697\u623F\u627E\u56DE\u7167\u7247\u91CC\u7684\u540D\u5B57\u3002");if(!this.flags.relay)return n("\u8FDC\u7AEF\u7EE7\u7535\u5668\u6CA1\u6709\u63A5\u901A\u3002\u5148\u5230\u5730\u4E0B\u65E7\u533A\u542F\u52A8\u67F4\u6CB9\u673A\uFF0C\u5E76\u901A\u8FC7\u7535\u53F0\u53D1\u51FA\u6C42\u6551\u3002");if(this.flags.released)return n("\u6392\u6C34\u5DF2\u7ECF\u5B8C\u6210\u3002\u5929\u4E95\u7684\u9632\u706B\u95E8\u53EF\u4EE5\u6253\u5F00\u4E86\u3002");if(!this.items.has("valveHandle"))return n("\u7B2C\u4E09\u53EA\u9600\u95E8\u6CA1\u6709\u624B\u8F6E\u3002\u4E00\u697C\u4E1C\u7FFC\u7EF4\u4FEE\u5BA4\u7684\u5DE5\u5177\u53F0\u4E0A\u5E94\u8BE5\u8FD8\u7559\u7740\u5B83\u3002");if(!nr(e,[0,2,1]))return n("\u6C34\u538B\u6CA1\u6709\u4E0B\u964D\u3002\u5F55\u97F3\u91CC\u7684\u6B21\u5E8F\u662F\u6CC4\u538B\u3001\u6392\u6C34\u3001\u56DE\u6C34\u3002");this.flags.released=!0,this.items.delete("valveHandle"),this.items.add("exitKey"),this.checkpoint={x:13.2,y:-2.8,z:20.5}}else if(t==="ending"){if(!this.flags.released)return n("\u5730\u4E0B\u7684\u95E8\u8FD8\u6CA1\u6709\u677E\u5F00\u3002");if(!["remember","leave"].includes(e))return n("\u4F60\u8FD8\u6CA1\u6709\u4F5C\u51FA\u9009\u62E9\u3002");if(e==="remember"&&!this.documents.has("6"))return n("\u4F60\u8FD8\u4E0D\u77E5\u9053\u5B8C\u6574\u7684\u771F\u76F8\u3002203 \u53F7\u5BA4\u91CC\u6709\u4E00\u5C01\u8BA4\u9886\u4E66\u3002");this.flags.ended=!0,this.ending=e}else return n("\u65E0\u6CD5\u64CD\u4F5C\u3002");return{ok:!0,chapter:this.chapter,action:t}}snapshot(){var t;return{version:2,flags:{...this.flags},items:[...this.items],documents:[...this.documents],checkpoint:{...this.checkpoint},elapsed:Math.max(0,this.elapsed),ending:(t=this.ending)!=null?t:null,revision:5,events:[...this.events]}}restore(t){var n,s,r,o;if(!t||t.version!==2||!Array.isArray(t.items)||!Array.isArray(t.documents))return;for(let a of cx)((n=t.flags)==null?void 0:n[a])===!0&&(this.flags[a]=!0);if(this.items=new Set(t.items.filter(a=>Su.includes(a))),this.documents=new Set(t.documents.map(String).filter(a=>hx.includes(a))),this.documents.has("invitation")?this.flags.invitation=!0:this.flags={},!this.flags.power)for(let a of["cabinet","tapePlayed","memory","photo","released","ended"])delete this.flags[a];if(!this.flags.cabinet)for(let a of["tapePlayed","memory","photo","released","ended"])delete this.flags[a];if(!this.flags.tapePlayed)for(let a of["memory","photo","released","ended"])delete this.flags[a];if(!this.flags.memory)for(let a of["photo","released","ended"])delete this.flags[a];if(this.flags.memory&&this.flags.released&&((s=t.revision)!=null?s:2)<3&&(this.flags.photo=!0,this.documents.add("14")),!this.flags.photo||!this.documents.has("14"))for(let a of["photo","generator","relay","released","ended"])delete this.flags[a];if(this.flags.photo&&this.flags.released&&((r=t.revision)!=null?r:2)<4&&(this.flags.generator=!0,this.flags.relay=!0,this.documents.add("23")),(!this.flags.generator||!this.flags.relay||!this.documents.has("23"))&&((!this.flags.generator||!this.documents.has("23"))&&delete this.flags.relay,delete this.flags.released,delete this.flags.ended),this.flags.photo?this.items.add("annexKey"):(this.items.delete("annexKey"),this.items.delete("relayFuse")),this.flags.generator&&this.items.delete("relayFuse"),this.flags.memory)this.items.add("westKey");else for(let a of["westKey","film","developer"])this.items.delete(a);this.flags.photo&&(this.items.delete("film"),this.items.delete("developer")),((o=t.revision)!=null?o:2)<5&&this.flags.generator&&this.documents.add("27"),this.events=new Set(Array.isArray(t.events)?t.events.filter(a=>typeof a=="string"&&a.length<48).slice(0,32):[]),this.flags.invitation||this.items.delete("serviceKey"),this.flags.cabinet||this.items.delete("archiveKey"),this.flags.released||this.items.delete("exitKey"),this.flags.invitation&&this.items.add("serviceKey"),this.flags.cabinet&&this.items.add("archiveKey"),this.flags.released&&this.items.add("exitKey"),this.flags.tapePlayed&&this.items.add("tape"),Number.isFinite(t.elapsed)&&(this.elapsed=Math.max(0,t.elapsed));let e=t.checkpoint;e&&[e.x,e.y,e.z].every(Number.isFinite)&&e.x>=-30&&e.x<=44&&e.z>=-45&&e.z<=83&&[-2.8,0,2.8,5.6].includes(e.y)&&(this.checkpoint={...e}),["remember","leave"].includes(t.ending)&&this.flags.ended&&(this.ending=t.ending)}},Tu={serviceKey:"\u5730\u4E0B\u7EF4\u4FEE\u95F4\u94A5\u5319",fuse:"\u5907\u7528\u7194\u65AD\u5668",valveHandle:"\u6392\u6C34\u9600\u624B\u8F6E",archiveKey:"203 \u653E\u6620\u5BA4\u94A5\u5319",tape:"\u4E03\u6708\u5341\u56DB\u65E5\u7684\u5F55\u97F3\u5E26",exitKey:"\u9632\u706B\u95E8\u94A5\u5319",westKey:"\u4E8C\u697C\u897F\u7FFC\u94A5\u5319",film:"\u672A\u51B2\u6D17\u7684\u5168\u5BB6\u798F\u5E95\u7247",developer:"\u5BC6\u5C01\u7684\u663E\u5F71\u6DB2",annexKey:"\u5730\u4E0B\u65E7\u533A\u94A5\u5319",relayFuse:"\u65E7\u533A\u8F93\u51FA\u7194\u65AD\u5668"},Au={remember:{title:"\u5929\u4EAE\u4E4B\u524D",label:"\u7ED3\u5C40 \xB7 \u5F52\u6765",text:`\u4F60\u7B2C\u4E00\u6B21\u6E05\u695A\u5730\u53EB\u51FA\u4E86\u4ED6\u7684\u540D\u5B57\u3002
\u300C\u82CD\u592A\uFF0C\u6211\u4EEC\u56DE\u5BB6\u3002\u300D

\u8D70\u5ECA\u91CC\u7684\u811A\u6B65\u505C\u4E86\u3002
\u90A3\u53EA\u51B0\u51B7\u7684\u5C0F\u624B\uFF0C\u7EC8\u4E8E\u63E1\u4F4F\u4E86\u4F60\u7684\u624B\u3002

\u697C\u5916\u4ECD\u7136\u4E0B\u7740\u96E8\u3002
\u53EF\u4F60\u8BB0\u5F97\uFF0C\u5929\u4EAE\u7684\u65B9\u5411\u3002`},leave:{title:"\u53C8\u4E00\u5C01\u6765\u4FE1",label:"\u7ED3\u5C40 \xB7 \u9057\u5FD8",text:`\u4F60\u63A8\u5F00\u4E86\u95E8\uFF0C\u6CA1\u6709\u518D\u56DE\u5934\u3002

\u4E09\u4E2A\u6708\u540E\uFF0C\u4E00\u5C01\u6CA1\u6709\u7F72\u540D\u7684\u4FE1\u88AB\u585E\u8FDB\u4F60\u5BB6\u7684\u4FE1\u7BB1\u3002

\u300C\u60A8\u9057\u843D\u7684\u4E1C\u897F\u4ECD\u5728\u4E09\u53F7\u5BA4\u3002\u300D

\u4FE1\u5C01\u91CC\uFF0C\u662F\u4E00\u679A\u8FD8\u5728\u7F13\u6162\u8F6C\u52A8\u7684\u516B\u97F3\u76D2\u53D1\u6761\u3002
\u4ECE\u95E8\u5916\u4F20\u6765\u4E09\u4E2A\u97F3\u7B26\u3002`}};var ft=i=>document.getElementById(i),Fo={generator:{title:"\u5730\u4E0B\u65E7\u533A\u5907\u7528\u8F93\u51FA",description:"\u88C5\u56DE\u8F93\u51FA\u7194\u65AD\u5668\uFF0C\u6309\u673A\u623F\u89C4\u7A0B\u542F\u52A8\u67F4\u6CB9\u673A\u3002",labels:["\u4F9B\u6CB9","\u9884\u70ED","\u63A5\u901A\u8F93\u51FA"],values:[0,1,2],hint:"\u53D1\u7535\u673A\u623F\u7684\u89C4\u7A0B\uFF1A\u9884\u70ED \u2192 \u4F9B\u6CB9 \u2192 \u63A5\u901A\u8F93\u51FA\u3002\u7194\u65AD\u5668\u5728\u642C\u8FC1\u6863\u6848\u5E93\u7684\u7EFF\u8272\u7EF4\u4FEE\u76D2\u3002",complete:"\u67F4\u6CB9\u673A\u8D77\u52A8\u4E86\u3002\u65E7\u533A\u5C3D\u5934\u7684\u7535\u53F0\u7EC8\u4E8E\u901A\u7535\u3002"},radio:{title:"\u6CA1\u6709\u56DE\u5E94\u7684\u9891\u9053",description:"\u56DB\u4F4D\u8C03\u8C10\u7801\u3002\u9891\u9053\u8868\u7559\u5728\u7535\u53F0\u65C1\u8FB9\u3002",hint:"14.07 MHz\uFF0C\u53BB\u6389\u5C0F\u6570\u70B9\uFF0C\u8F93\u5165 1407\u3002\u9700\u8981\u5148\u542F\u52A8\u5907\u7528\u67F4\u6CB9\u673A\uFF0C\u5E76\u8BFB\u8FC7\u793E\u533A\u536B\u751F\u7AD9\u7684\u6551\u63F4\u63A5\u7EBF\u8BB0\u5F55\u3002",complete:"\u300C\u8BF7\u62A5\u5730\u70B9\u4E0E\u59D3\u540D\u3002\u300D\u8FD9\u4E00\u6B21\uFF0C\u4F60\u6CA1\u6709\u7ED3\u675F\u547C\u53EB\u3002"},develop:{title:"\u88AB\u62B9\u53BB\u7684\u5168\u5BB6\u798F",description:"\u8BA9\u5E95\u7247\u7ECF\u8FC7\u56DB\u53EA\u836F\u6DB2\u6258\u76D8\u3002\u684C\u4E0A\u7684\u89C4\u7A0B\u8BB0\u5F55\u7740\u51B2\u6D17\u6B21\u5E8F\u3002",labels:["\u663E\u5F71","\u5B9A\u5F71","\u505C\u663E","\u6C34\u6D17"],values:[0,1,2,3],length:4,hint:"\u6697\u623F\u89C4\u7A0B\uFF1A\u663E\u5F71 \u2192 \u505C\u663E \u2192 \u5B9A\u5F71 \u2192 \u6C34\u6D17\u3002\u5E95\u7247\u5728 204\uFF0C\u663E\u5F71\u6DB2\u5728\u4F4F\u6237\u7EAA\u5FF5\u5BA4\u3002",complete:"\u5F71\u50CF\u6D6E\u4E86\u51FA\u6765\u3002\u4F60\u7275\u7740\u4ED6\u7684\u624B\u3002\u7167\u7247\u4E0A\u4ECE\u6765\u90FD\u4E0D\u662F\u4E00\u4E2A\u5B69\u5B50\u3002"},power:{title:"\u5907\u7528\u7535\u6E90",description:"\u88C5\u5165\u7194\u65AD\u5668\uFF0C\u518D\u6309\u68C0\u4FEE\u5361\u7684\u6B21\u5E8F\u5408\u95F8\u3002",labels:["\u8D70\u5ECA\u7167\u660E","\u4F4F\u6237\u7535\u6E90","\u6392\u6C34\u6CF5"],values:[0,1,2],hint:"\u9762\u677F\u5DE6\u8D77\uFF1A\u8D70\u5ECA\u3001\u4F4F\u6237\u3001\u6392\u6C34\u3002\u542F\u52A8\u6B21\u5E8F\uFF1A\u6392\u6C34 \u2192 \u8D70\u5ECA \u2192 \u4F4F\u6237\u3002",complete:"\u5907\u7528\u7535\u6E90\u542F\u52A8\u3002\u4E8C\u697C\u7684\u78C1\u9501\u677E\u5F00\u4E86\u3002"},cabinet:{title:"\u6863\u6848\u67DC",description:"\u56DB\u4F4D\u6570\u7684\u5BC6\u7801\u3002\u9501\u9762\u4E0A\u6709\u4E00\u5904\u5C1A\u672A\u5E72\u900F\u7684\u6C34\u75D5\u3002",hint:"\u4E00\u697C\u4F5B\u95F4\u7684\u526A\u62A5\u8BF4\uFF0C\u5BC6\u7801\u662F\u505C\u7535\u65F6\u523B\u300202:17\uFF0C\u8F93\u5165 0217\u3002",complete:"\u6863\u6848\u67DC\u6253\u5F00\u4E86\u3002\u91CC\u9762\u653E\u7740 203 \u653E\u6620\u5BA4\u7684\u94A5\u5319\u3002"},music:{title:"\u6CA1\u5531\u5B8C\u7684\u6B4C",description:"\u56DB\u679A\u97F3\u7247\u3002\u8BA9\u82CD\u592A\u719F\u6089\u7684\u4E09\u4E2A\u97F3\u7B26\u518D\u6B21\u54CD\u8D77\u3002",labels:["\u2160","\u2161","\u2162","\u2163"],values:[1,2,3,4],hint:"\u513F\u7AE5\u623F\u7684\u753B\u6807\u51FA\u4E86\u4E09\u6839\u7EBF\uFF1A3 \u2192 1 \u2192 4\u3002",complete:"\u516B\u97F3\u76D2\u54CD\u4E86\u3002\u5939\u5C42\u91CC\u85CF\u7740\u4E00\u5F20\u5199\u7ED9\u54E5\u54E5\u7684\u7EB8\u6761\u3002"},valves:{title:"\u6C34\u95F8",description:"\u987A\u5E8F\u9519\u8BEF\u4F1A\u8BA9\u6C34\u538B\u91CD\u65B0\u5347\u9AD8\u3002\u542C\u4ECE\u5F55\u97F3\u91CC\u7684\u58F0\u97F3\u3002",labels:["\u6CC4\u538B","\u56DE\u6C34","\u6392\u6C34"],values:[0,1,2],hint:"\u5F55\u97F3\u91CC\u8BF4\uFF1A\u5148\u6CC4\u538B\uFF0C\u518D\u6392\u6C34\uFF0C\u6700\u540E\u56DE\u6C34\u3002",complete:"\u4E95\u5E95\u7684\u95E8\u5F00\u4E86\u3002\u80CC\u540E\u4F20\u6765\u4E86\u4E0D\u5C5E\u4E8E\u4F60\u7684\u811A\u6B65\u58F0\u3002"}},Oo=class{constructor(t){this.game=t,this.sequence=[],this.mapFloor=0,this.mapZoom=1,this.saved=null;try{let e=JSON.parse(localStorage.getItem(vs)||"null"),n=new Ii(e);n.flags.invitation&&!n.flags.ended&&(this.saved=n.snapshot())}catch(e){}ft("continue-game").classList.toggle("hidden",!this.saved),ft("continue-game").addEventListener("click",()=>t._start(!0)),ft("start-game").addEventListener("click",()=>t._start(!1)),ft("settings-title").addEventListener("click",()=>this.openSettings()),ft("resume-game").addEventListener("click",()=>this.closeSettings()),ft("checkpoint-retry").addEventListener("click",()=>{t._wakeAtCheckpoint(),this.closeSettings()}),ft("journal-button").addEventListener("click",()=>this.openJournal()),ft("journal-close").addEventListener("click",()=>this.close()),ft("puzzle-close").addEventListener("click",()=>this.close()),ft("puzzle-submit").addEventListener("click",()=>this.submitPuzzle()),ft("puzzle-reset").addEventListener("click",()=>{this.sequence=[],ft("puzzle-code").value="",this.renderSequence()}),ft("recording-skip").addEventListener("click",()=>this.finishRecording()),ft("puzzle-code").addEventListener("keydown",e=>{if(e.stopPropagation(),e.code==="Escape"){e.preventDefault(),this.close();return}e.code==="Enter"&&this.submitPuzzle()}),ft("puzzle-hint").addEventListener("click",()=>{ft("puzzle-status").textContent=Fo[this.puzzle].hint}),ft("journal-hint").addEventListener("click",()=>{ft("journal-guidance").textContent=t.campaign.hint,ft("journal-guidance").classList.toggle("hidden")}),document.querySelectorAll("[data-journal-tab]").forEach(e=>{e.addEventListener("click",()=>this.showJournalTab(e.dataset.journalTab))}),document.querySelectorAll("[data-map-floor]").forEach(e=>{e.addEventListener("click",()=>{this.mapFloor=Number(e.dataset.mapFloor),this.drawMap()})});for(let[e,n]of[["map-zoom-in",.25],["map-zoom-out",-.25]])ft(e).addEventListener("click",()=>{this.mapZoom=Math.max(1,Math.min(2.5,this.mapZoom+n)),this.applyMapZoom()});ft("map-zoom-reset").addEventListener("click",()=>{this.mapZoom=1,this.applyMapZoom()}),ft("ending-remember").addEventListener("click",()=>t._ending("remember")),ft("ending-leave").addEventListener("click",()=>t._ending("leave")),this.bindSettings(),t.touchMode&&ql()}bindSettings(){let t={};try{t=JSON.parse(localStorage.getItem("echo_settings_v2")||"{}")||{}}catch(s){}this.settings={volume:Number.isFinite(t.volume)?Math.max(0,Math.min(100,t.volume)):70,brightness:Number.isFinite(t.brightness)?Math.max(70,Math.min(500,t.brightness)):100,reduced:t.reduced===!0};let e=()=>{this.game.audio.setVolume(this.settings.volume/100),this.game.grade.uniforms.uExposure.value=1.38*this.settings.brightness/100,this.game.reduceEffects=this.settings.reduced,document.body.classList.toggle("reduced-effects",this.settings.reduced);try{localStorage.setItem("echo_settings_v2",JSON.stringify(this.settings))}catch(s){}},n=(s,r)=>{let o=s==="brightness"?100:70,a=s==="brightness"?70:0,l=s==="brightness"?500:100;this.settings[s]=Number.isFinite(r)?Math.max(a,Math.min(l,r)):o,ft("setting-"+s).value=this.settings[s],ft("value-"+s).textContent=this.settings[s]+"%"+(s==="brightness"&&this.settings[s]>150?"\uFF08\u6D4B\u8BD5\u589E\u4EAE\uFF09":"")};for(let s of["volume","brightness"]){let r=ft("setting-"+s);n(s,this.settings[s]);let o=()=>{n(s,Number(r.value)),e()};r.addEventListener("input",o),r.addEventListener("change",o)}ft("reset-brightness").addEventListener("click",()=>{n("brightness",100),e()}),ft("setting-reduced").checked=this.settings.reduced,ft("setting-reduced").addEventListener("change",s=>{this.settings.reduced=s.target.checked,e()}),e()}openSettings(){ft("pause").classList.remove("hidden"),ft("pause-heading").textContent=this.game.state==="title"?"\u4F53\u9A8C\u8BBE\u7F6E":"\u6682\u505C",ft("resume-game").textContent=this.game.state==="title"?"\u8FD4\u56DE":"\u7EE7\u7EED\u63A2\u7D22",ft("checkpoint-retry").classList.toggle("hidden",this.game.state==="title"),this.game.audio.setPaused(!0),this.game._clearMovementInput(),this.game.controls.isLocked&&(this.game._skipUnlockPause=!0,this.game.controls.unlock())}closeSettings(){ft("pause").classList.add("hidden"),this.game.state==="playing"&&!this.game.noteOpen&&(this.game._touchUI&&this.game._touchUI.classList.remove("hidden"),this.game._tryLock()),this.game.audio.setPaused(this.game.noteOpen||document.hidden)}open(t){return this.game.state!=="playing"||this.game.noteOpen||!ft("pause").classList.contains("hidden")?!1:(this.game.noteOpen=!0,this.panel=t,this.game._clearMovementInput(),this.game.audio.setPaused(!0),this.game._touchUI&&this.game._touchUI.classList.add("hidden"),this.game.controls.isLocked&&(this.game._skipUnlockPause=!0,this.game.controls.unlock()),ft(t).classList.remove("hidden"),!0)}close(){var e;if(!this.panel)return;ft(this.panel).classList.add("hidden"),this.panel=null,this.recording=null,(e=document.activeElement)==null||e.blur(),this.game.noteOpen=!1;let t=!ft("pause").classList.contains("hidden");this.game.audio.setPaused(t||document.hidden),this.game._touchUI&&!t&&this.game._touchUI.classList.remove("hidden"),this.game.state==="playing"&&!t&&this.game._tryLock()}openJournal(t="evidence"){if(this.panel==="journal"){this.close();return}if(!this.open("journal"))return;let e=this.game.campaign;ft("journal-chapter").textContent=bs[e.chapter].title,ft("journal-objective").textContent=e.objective;let n=ft("journal-progress");n.replaceChildren(),bs.forEach((a,l)=>{let c=document.createElement("li");c.textContent=String(l+1).padStart(2,"0")+" \xB7 "+a.title,c.className=l<e.chapter?"complete":l===e.chapter?"current":"",n.appendChild(c)}),ft("journal-guidance").classList.add("hidden");let s=ft("inventory-list");s.replaceChildren();for(let a of e.items){let l=document.createElement("span");l.textContent=Tu[a],s.appendChild(l)}e.items.size||(s.textContent="\u8FD8\u6CA1\u6709\u627E\u5230\u968F\u8EAB\u7269\u54C1\u3002");let r=ft("evidence-list");r.replaceChildren();for(let a of e.documents){let l=Di[a],c=document.createElement("button");c.className="evidence-entry";let h=document.createElement("strong");h.textContent=l.title;let u=document.createElement("span");u.textContent=l.location,c.append(h,u),c.addEventListener("click",()=>this.renderDocument(a)),r.appendChild(c)}e.documents.size||(r.textContent="\u8C03\u67E5\u7EB8\u5F20\u3001\u62A5\u7EB8\u4E0E\u5F55\u97F3\uFF0C\u4F1A\u5C06\u8BB0\u5F55\u4FDD\u5B58\u5728\u8FD9\u91CC\u3002");let o=[...e.documents].at(-1);o?this.renderDocument(o):(ft("evidence-title").textContent="\u8FD8\u6CA1\u6709\u8BB0\u5F55",ft("evidence-content").textContent="\u4ECE\u5927\u5385\u503C\u73ED\u53F0\u4E0A\u7684\u90A3\u5C01\u4FE1\u5F00\u59CB\u3002"),this.mapFloor=this.game.playerPos.y<-.8?-1:this.game.playerPos.y>4.8?2:this.game.playerPos.y>2?1:0,this.showJournalTab(t),ft("journal-close").focus()}renderDocument(t){let e=Di[t];ft("evidence-title").textContent=e.title,ft("evidence-location").textContent=e.location,ft("evidence-content").textContent=e.cn,this.renderPhoto("evidence-photo",t),document.querySelectorAll(".evidence-entry").forEach(n=>{var s;return n.classList.toggle("selected",((s=n.querySelector("strong"))==null?void 0:s.textContent)===e.title)})}renderPhoto(t,e){let n=ft(t),s=String(e)==="14";if(n.classList.toggle("hidden",!s),s){let r=this.game.level.campaign.photo.material.map.image;n.width=r.width,n.height=r.height,n.getContext("2d").drawImage(r,0,0)}}showJournalTab(t){ft("journal").dataset.tab=t,ft("journal-evidence").classList.toggle("hidden",t!=="evidence"),ft("journal-map").classList.toggle("hidden",t!=="map"),document.querySelectorAll("[data-journal-tab]").forEach(e=>e.classList.toggle("selected",e.dataset.journalTab===t)),t==="map"&&this.drawMap()}drawMap(){let t=ft("map-canvas"),e=t.getContext("2d"),n=t.width,s=t.height;e.clearRect(0,0,n,s);let r=this.mapFloor,o=Fl.filter(p=>p.floor===r),a=Math.min(...o.map(p=>p.bounds[0]))-2,l=Math.max(...o.map(p=>p.bounds[2]))+2,c=Math.min(...o.map(p=>p.bounds[1]))-3,h=Math.max(...o.map(p=>p.bounds[3]))+3,u=Math.min((n-80)/(h-c),(s-80)/(l-a)),d=p=>n/2+(p-(h+c)/2)*u,f=p=>s/2+(p-(l+a)/2)*u;e.lineWidth=1.5,e.textAlign="center",e.textBaseline="middle";for(let p of o){let[g,_,x,b]=p.bounds;e.fillStyle="rgba(129,153,138,.08)",e.strokeStyle="#81938a",e.fillRect(d(_),f(g),(b-_)*u,(x-g)*u),e.strokeRect(d(_),f(g),(b-_)*u,(x-g)*u),e.fillStyle="#ced4c7";let T=(b-_)*u,E=(x-g)*u;e.save(),e.translate(d((_+b)/2),f((g+x)/2));let M=T<60&&E>T*2;M&&e.rotate(-Math.PI/2);let I=(M?E:T)-12,w=Math.min(16,Math.max(10,(M?T:E)*.65));e.font=w+'px "Songti SC", serif';let S=[p.name];if(e.measureText(p.name).width>I&&E>40&&!M){let R=p.name.replace("\u6444\u5F71\u5E08\u65E7\u5C45",`\u6444\u5F71\u5E08
\u65E7\u5C45`).replace("204 ",`204
`).split(`
`);S=R.length>1?R:[p.name.slice(0,4),p.name.slice(4)]}for(;w>9&&S.some(R=>e.measureText(R).width>I);)w--,e.font=w+'px "Songti SC", serif';S.forEach((R,U)=>e.fillText(R,0,(U-(S.length-1)/2)*(w+5))),e.restore()}let m=this.game.playerPos;(m.y<-.8?-1:m.y>4.8?2:m.y>2?1:0)===r&&(e.fillStyle="#ca8b63",e.beginPath(),e.arc(d(m.z),f(m.x),6,0,Math.PI*2),e.fill(),e.strokeStyle="#ca8b63",e.beginPath(),e.moveTo(d(m.z),f(m.x)),e.lineTo(d(m.z)-Math.cos(this.game.camera.rotation.y)*18,f(m.x)-Math.sin(this.game.camera.rotation.y)*18),e.stroke()),ft("map-caption").textContent="\u4F4F\u6237\u65E7\u5E73\u9762\u56FE \xB7 \u6A59\u8272\u6807\u8BB0\u662F\u4F60\u7684\u4F4D\u7F6E \xB7 \u4E3B\u697C\u68AF\u8FDE\u63A5\u4E00\u697C\u3001\u4E8C\u697C\u548C\u5C4B\u9876\uFF1B\u7EF4\u4FEE\u697C\u68AF\u901A\u5F80\u5730\u4E0B",document.querySelectorAll("[data-map-floor]").forEach(p=>p.classList.toggle("selected",Number(p.dataset.mapFloor)===r)),this.applyMapZoom()}applyMapZoom(){ft("map-canvas").style.width=this.mapZoom*100+"%",ft("map-zoom-reset").textContent=Math.round(this.mapZoom*100)+"%",ft("map-zoom-out").disabled=this.mapZoom===1,ft("map-zoom-in").disabled=this.mapZoom===2.5}openPuzzle(t){var a;if(t==="tape"){if(this.game.campaign.flags.tapePlayed){this.game._readNote(5);return}let l=this.game.campaign.perform("tape");if(!l.ok){this.game._sub(l.message);return}this.game._campaignAdvanced("tape"),this.openRecording();return}let e={power:"power",cabinet:"cabinet",music:"memory",valves:"released",develop:"photo",generator:"generator",radio:"relay"};if(this.game.campaign.flags[e[t]]){this.game._sub("\u8FD9\u91CC\u5DF2\u7ECF\u8C03\u67E5\u8FC7\u4E86\u3002\u8BB0\u5F55\u4FDD\u5B58\u5728\u8C03\u67E5\u624B\u518C\u91CC\u3002");return}if(!this.open("puzzle"))return;this.puzzle=t,this.sequence=[];let n=Fo[t];ft("puzzle-title").textContent=n.title,ft("puzzle-description").textContent=n.description,ft("puzzle-status").textContent="",ft("puzzle-code").value="";let s=["cabinet","radio"].includes(t);ft("puzzle-code").classList.toggle("hidden",!s),ft("puzzle-keypad").classList.toggle("hidden",!s),ft("puzzle-sequence").classList.toggle("hidden",s);let r=ft("puzzle-controls");r.replaceChildren(),(a=n.labels)==null||a.forEach((l,c)=>{let h=document.createElement("button");h.className="puzzle-control",h.textContent=l,h.addEventListener("click",()=>{this.sequence.length>=(n.length||3)&&(this.sequence=[]),this.sequence.push(n.values[c]),t==="music"?this.game.audio.puzzleTone(n.values[c]):this.game.audio.switchClick(),this.renderSequence()}),r.appendChild(h)});let o=ft("puzzle-keypad");o.replaceChildren(),["1","2","3","4","5","6","7","8","9","\u6E05\u9664","0","\u9000\u683C"].forEach(l=>{let c=document.createElement("button");c.textContent=l,c.addEventListener("click",()=>{let h=ft("puzzle-code");l==="\u6E05\u9664"?h.value="":l==="\u9000\u683C"?h.value=h.value.slice(0,-1):h.value.length<4&&(h.value+=l)}),o.appendChild(c)}),this.renderSequence(),ft("puzzle-code").inputMode=this.game.touchMode?"none":"numeric",ft("puzzle-scroll").scrollTop=0,s&&!this.game.touchMode?ft("puzzle-code").focus():ft("puzzle-close").focus()}openRecording(){this.open("recording")&&(this.game.audio.setPaused(!1),this.recording={elapsed:0,beat:0,duration:32},ft("recording-line").textContent="\uFF3B\u78C1\u5E26\u5F00\u59CB\u8F6C\u52A8\u3002\u96E8\u58F0\u3002\uFF3D",ft("recording-time").textContent="00:00 / 00:32",ft("recording-progress").style.width="0%",ft("recording-skip").focus())}update(t){var s,r;let e=this.recording;if(this.panel!=="recording"||!e||!ft("pause").classList.contains("hidden"))return;e.elapsed+=t;let n=[[2,"\u300C\u54E5\u54E5\uFF0C\u4F60\u4F1A\u6765\u63A5\u6211\u5417\uFF1F\u300D","whisper"],[6,"\u300C\u6B4C\u54CD\u4E86\u5C31\u51FA\u6765\uFF0C\u522B\u8BA9\u5988\u5988\u53D1\u73B0\u3002\u300D","musicBox"],[10,"\uFF3B\u5F00\u95E8\u58F0\u3002\u7535\u6D41\u4E2D\u65AD\u3002\uFF3D","doorClose"],[13,"\u300C\u54E5\u54E5\uFF1F\u6211\u770B\u4E0D\u89C1\u4E86\u3002\u300D","cry"],[18,"\uFF3B\u6C89\u9ED8\u3002\u968F\u540E\uFF0C\u4E00\u4E2A\u6210\u5E74\u7537\u4EBA\u7684\u58F0\u97F3\u3002\uFF3D","breath"],[22,"\u300C\u5148\u6CC4\u538B\uFF0C\u518D\u6392\u6C34\uFF0C\u6700\u540E\u56DE\u6C34\u3002\u300D","hammer"],[26,"\u300C\u522B\u518D\u628A\u90A3\u6247\u95E8\u5C01\u8D77\u6765\u4E86\u3002\u300D","whisper"],[29,"\uFF3B\u6700\u540E\u4F20\u6765\u4E09\u679A\u516B\u97F3\u76D2\u7684\u97F3\u7B26\u3002\uFF3D","musicBox"]];for(;e.beat<n.length&&e.elapsed>=n[e.beat][0];){let[,o,a]=n[e.beat++];ft("recording-line").textContent=o,(r=(s=this.game.audio)[a])==null||r.call(s)}ft("recording-time").textContent="00:"+String(Math.min(32,Math.floor(e.elapsed))).padStart(2,"0")+" / 00:32",ft("recording-progress").style.width=Math.min(100,e.elapsed/e.duration*100)+"%",e.elapsed>=e.duration&&this.finishRecording()}finishRecording(){this.panel==="recording"&&(this.close(),this.game._readNote(5))}renderSequence(){let t=Fo[this.puzzle];ft("puzzle-sequence").textContent=this.sequence.length?this.sequence.map(e=>t.labels[t.values.indexOf(e)]).join(" \u2192 "):"\u7B49\u5F85\u64CD\u4F5C"}submitPuzzle(){let t=this.puzzle,e=["cabinet","radio"].includes(t)?ft("puzzle-code").value.trim():this.sequence,n=this.game.campaign.perform(t,e);if(!n.ok){ft("puzzle-status").textContent=n.message,this.sequence=[],this.renderSequence(),this.game.audio.switchClick();return}this.close(),this.game._campaignAdvanced(t),this.game._sub(Fo[t].complete,"",5),t==="music"&&this.game._readNote(7),t==="develop"&&this.game._readNote(14),t==="radio"&&this.game._readNote(23)}chooseEnding(){if(this.panel||this.game.state!=="playing"||!this.open("ending-choice"))return;let t=this.game.campaign.documents.has("6");ft("ending-remember").disabled=!t,ft("ending-choice-hint").textContent=t?"\u4F60\u7EC8\u4E8E\u8BB0\u5F97\u81EA\u5DF1\u7684\u5F1F\u5F1F\u3002\u95E8\u5916\u7684\u5929\u8FD8\u6CA1\u6709\u4EAE\u3002":"\u4F60\u8FD8\u4E0D\u77E5\u9053\u5B8C\u6574\u7684\u771F\u76F8\u3002203 \u653E\u6620\u5BA4\u91CC\u6709\u4E00\u5C01\u672A\u5BC4\u51FA\u7684\u8BA4\u9886\u4E66\u3002",ft("ending-return").onclick=()=>this.close(),ft("ending-return").focus()}};var Bo=class{constructor(t){this.game=t,this.acousticTimer=0,this.areaTime=0,this.lastArea="",this.cooldown=0,this.look=new L,this.source=new L}once(t,e){let n=this.game.campaign;n.events.has(t)||(n.events.add(t),e(),this.game._refreshCampaign(),this.cooldown=10)}update(t){let e=this.game,n=e.playerPos,s=_s(n);if(this.cooldown=Math.max(0,this.cooldown-t),s!==this.lastArea&&(this.lastArea=s,this.areaTime=0),this.areaTime+=t,this.acousticTimer-=t,this.acousticTimer<=0){this.acousticTimer=.12,e.camera.getWorldDirection(this.look);for(let r of e.audio.environment||[])r.campaignFlag&&(r.enabled=!!e.campaign.flags[r.campaignFlag]);e.audio.updateEnvironment(e.camera.position,this.look,r=>{let o=e.level.colliders.filter(a=>!(r.x>=a.x0&&r.x<=a.x1&&r.y>=a.y0&&r.y<=a.y1&&r.z>=a.z0&&r.z<=a.z1));return Kn(e.camera.position,this.source.set(r.x,r.y,r.z),o,e.level.doors)})}for(let r of e.level.campaign.dynamics)r.kind==="print"&&(r.mesh.rotation.y=Math.sin(e.campaign.elapsed*.7+r.phase)*.035);e.campaign.flags.generator&&e.level.campaign.generatorRotor&&(e.level.campaign.generatorRotor.rotation.x+=t*5),!(this.areaTime<1.2||this.cooldown>0||e.monster.state==="chase")&&(s==="\u56DE\u58F0\u793E\u533A\u4E2D\u5EAD"&&e.campaign.flags.relay?this.once("community-return",()=>{e.audio.duck(),e._sub("\u96E8\u68DA\u4E0B\u7684\u6551\u63F4\u706F\u4EAE\u4E86\u3002\u8FDF\u5230\u7684\u56DE\u5E94\u5DF2\u7ECF\u4F20\u8FDB\u5730\u4E0B\u3002\u8FD8\u6709\u4E00\u4E2A\u4EBA\uFF0C\u5728\u7B49\u4F60\u5F00\u95E8\u3002","",6),e._setFear(.3)}):s==="\u56DE\u58F0\u793E\u533A\u4E2D\u5EAD"?this.once("community-arrival",()=>{e.audio.knock(3),e._sub("\u516C\u5BD3\u5916\u4E5F\u662F\u540C\u4E00\u573A\u96E8\u3002\u6742\u8D27\u5E97\u7684\u706F\u8FD8\u4EAE\u7740\uFF0C\u536B\u751F\u7AD9\u5374\u6CA1\u6709\u51FA\u8F66\u3002","",5)}):s==="\u96E8\u591C\u6742\u8D27\u5E97"?this.once("shop-arrival",()=>{e.audio.switchClick(),e._sub("\u67DC\u53F0\u4E0A\u7559\u7740\u56DB\u4EFD\u8BA2\u5355\u3002\u7535\u8BDD\u7684\u542C\u7B52\uFF0C\u6CA1\u6709\u653E\u597D\u3002","",4)}):s==="\u8857\u533A\u536B\u751F\u7AD9"?this.once("clinic-arrival",()=>{e.audio.breath(-.5,2),e._sub("\u4E24\u5F20\u7A7A\u5E8A\u3002\u63A5\u7EBF\u5458\u66FE\u7ECF\u5199\u4E0B\u4E86\u4ED6\u7684\u58F0\u97F3\u3002","",4)}):s==="\u5730\u4E0B\u65E7\u533A\u8FDE\u5ECA"?this.once("annex-arrival",()=>{e.audio.hammer(.5),e._sub("\u53E6\u4E00\u4FA7\u7684\u95E8\u4E0D\u662F\u51FA\u53E3\u3002\u8FD9\u91CC\u85CF\u7740\u90A3\u4E00\u591C\u6CA1\u6709\u53D1\u51FA\u7684\u6C42\u6551\u3002","",5),e._setFear(.45)}):s==="\u5730\u4E0B\u503C\u73ED\u7AD9"?this.once("watch-arrival",()=>{e.audio.knock(3),e._sub("\u4EA4\u73ED\u65E5\u5FD7\u6700\u540E\u4E00\u680F\uFF0C\u5199\u7740\u300C\u7BA1\u9053\u6C34\u9524\u300D\u3002","",4)}):s==="\u65E7\u84C4\u6C34\u6C60"?this.once("cistern-arrival",()=>{e.audio.duck(),e.audio.lullaby(),e._sub("\u6BCF\u4E00\u9053\u523B\u7EBF\uFF0C\u90FD\u662F\u4ED6\u7B49\u4F60\u6765\u627E\u7684\u4E00\u8F6E\u6570\u6570\u3002","",5),e.ghost.appearAt(29,-2.8,61,Math.PI/2),e._setFear(.5)}):s==="\u5E94\u6025\u7535\u53F0\u5BA4"&&!e.campaign.flags.relay?this.once("radio-arrival",()=>{e.audio.buzz(),e._sub("\u7535\u53F0\u65C1\u7684\u7EB8\u6761\u5199\u7740\uFF1A\u4E0D\u8981\u56E0\u4E3A\u6CA1\u6709\u56DE\u5E94\uFF0C\u5C31\u7ED3\u675F\u547C\u53EB\u3002","",5)}):s==="\u897F\u7FFC\u5C01\u95ED\u8D70\u5ECA"&&e.campaign.flags.memory?this.once("west-arrival",()=>{e.audio.cameraShutter(-.5),e._sub("\u8FD9\u6761\u8D70\u5ECA\u2026\u2026\u539F\u6765\u4E00\u76F4\u5728\u8FD9\u91CC\u3002\u7EA2\u706F\u8FD8\u4EAE\u7740\u3002","",5),e._setFear(Math.max(.4,e.fear)),e.storyEvents.push({delay:6,action:()=>{e.audio.knock(3),e._sub("\u6709\u4EBA\u5728\u6697\u623F\u91CC\uFF0C\u7B49\u7167\u7247\u5E72\u900F\u3002","",4)}})}):s==="\u7EA2\u706F\u6697\u623F"&&!e.campaign.flags.photo?this.once("darkroom-arrival",()=>{e.audio.breath(.75,3),e._sub("\u7A7A\u6C14\u91CC\u6709\u836F\u6C34\u7684\u5473\u9053\u3002\u56DB\u53EA\u6258\u76D8\uFF0C\u6700\u540E\u4E00\u53EA\u76DB\u7740\u6E05\u6C34\u3002","",5),e.storyEvents.push({delay:7,action:()=>{_s(e.playerPos)==="\u7EA2\u706F\u6697\u623F"&&(e.audio.cameraShutter(.7),e._sub("\u8EAB\u540E\u54CD\u4E86\u4E00\u58F0\u5FEB\u95E8\u3002\u8FD9\u91CC\u6CA1\u6709\u7B2C\u4E8C\u53F0\u76F8\u673A\u3002","",4),e._setFear(Math.max(.55,e.fear)))}})}):s==="\u4F4F\u6237\u7EAA\u5FF5\u5BA4"?this.once("memorial-arrival",()=>{e.audio.duck(),e._setFear(.2),e._sub("\u56DB\u628A\u6905\u5B50\u3002\u56DB\u4E2A\u4EBA\u3002\u4E3A\u4EC0\u4E48\u540D\u7C3F\u91CC\u53EA\u5269\u4E0B\u4E09\u884C\uFF1F","",5)}):s==="\u5C4B\u9876\u667E\u6652\u573A"&&e.campaign.flags.photo?this.once("roof-recalled",()=>{e.audio.lullaby(),e._sub("\u5C31\u662F\u8FD9\u91CC\u3002\u6BCD\u4EB2\u6536\u7740\u5E8A\u5355\uFF0C\u5F1F\u5F1F\u7275\u7740\u4F60\u7684\u624B\u3002","",5),e._setFear(.12)}):s==="\u5730\u4E0B\u914D\u7535\u95F4"&&e.campaign.flags.photo&&!e.campaign.flags.released&&this.once("basement-return",()=>{e.audio.knock(3),e._sub("\u300C\u54E5\u54E5\uFF0C\u8FD9\u4E00\u6B21\uFF0C\u771F\u7684\u628A\u95E8\u6253\u5F00\u3002\u300D","",5),e._setFear(.6)}))}};function Ru(i){i.keys={},i.dragging=!1,i.touchRun=!1,i._joyId=null,i._lookId=null,i.touchMove&&(i.touchMove.x=0,i.touchMove.y=0)}var Ho=class{constructor(){this.scale=1,this.cooldown=0,this.elapsed=0,this.frames=0}sample(t){if(!Number.isFinite(t)||t<=0||t>.5)return this.elapsed=0,this.frames=0,null;if(this.cooldown>0)return this.cooldown=Math.max(0,this.cooldown-t),null;if(this.elapsed+=t,this.frames++,this.elapsed<2||this.frames<8)return null;let e=this.frames/this.elapsed;this.elapsed=0,this.frames=0;let n=[1,.8,.7,.6],s=n.indexOf(this.scale),r=e<38?Math.min(3,s+1):e>57?Math.max(0,s-1):s;return r===s?null:(this.scale=n[r],this.cooldown=10,this.scale)}};var Go=class{constructor(){this.safe=null,this.airTime=0}reset(t){this.safe={x:t.x,y:t.y,z:t.z},this.airTime=0}update(t,e,n,s){let r={x:(t.x0+t.x1)/2,y:t.y0,z:(t.z0+t.z1)/2};if(![r.x,r.y,r.z].every(Number.isFinite))return this.safe;let o=e&&n.some(l=>r.x>=l.x0&&r.x<=l.x1&&r.z>=l.z0&&r.z<=l.z1&&Math.abs(l.y1-r.y)<.04),a=n.some(l=>l.x0<t.x1&&l.x1>t.x0&&l.z0<t.z1&&l.z1>t.z0&&l.y1>r.y+.35&&l.y0<t.y1-.08);return o&&!a?(this.safe=r,this.airTime=0):this.airTime+=s,this.safe&&(r.y<-6||this.airTime>.8&&r.y<this.safe.y-1.4)?(this.airTime=0,{...this.safe}):null}};var zi=1280,ir=720,Ms=1.55,sr=1.75,zn=.3,_t=i=>document.getElementById(i),ux=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,dx=`
  uniform sampler2D tDiffuse;
  uniform float uTime;
  uniform float uFear;
  uniform float uDistort;
  uniform float uGlow;
  uniform float uExposure;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
  float bayer4(vec2 p) {
    p = floor(p);
    float i = mod(p.x, 4.0) + 4.0 * mod(p.y, 4.0);
    float v = 0.0;
    if (i < 0.5) v = 0.0; else if (i < 1.5) v = 8.0;
    else if (i < 2.5) v = 2.0; else if (i < 3.5) v = 10.0;
    else if (i < 4.5) v = 12.0; else if (i < 5.5) v = 4.0;
    else if (i < 6.5) v = 14.0; else if (i < 7.5) v = 6.0;
    else if (i < 8.5) v = 3.0; else if (i < 9.5) v = 11.0;
    else if (i < 10.5) v = 1.0; else if (i < 11.5) v = 9.0;
    else if (i < 12.5) v = 15.0; else if (i < 13.5) v = 7.0;
    else if (i < 14.5) v = 13.0; else v = 5.0;
    return v / 16.0;
  }

  // three.js' ACES filmic fit + sRGB OETF, moved here from OutputPass so the
  // ordered dither at the end can quantize DISPLAY values (see note in main()).
  vec3 acesFilm(vec3 color) {
    const mat3 ACESInputMat = mat3(
      vec3(0.59719, 0.07600, 0.02840),
      vec3(0.35458, 0.90834, 0.13383),
      vec3(0.04823, 0.01566, 0.83777)
    );
    const mat3 ACESOutputMat = mat3(
      vec3( 1.60475, -0.10208, -0.00327),
      vec3(-0.53108,  1.10813, -0.07276),
      vec3(-0.07367, -0.00605,  1.07602)
    );
    color *= uExposure / 0.6;
    color = ACESInputMat * color;
    color = (color * (color + 0.0245786) - 0.000090537)
          / (color * (0.983729 * color + 0.4329510) + 0.238081);
    color = ACESOutputMat * color;
    return clamp(color, 0.0, 1.0);
  }
  vec3 linearToSRGB(vec3 c) {
    return mix(pow(c, vec3(0.41666)) * 1.055 - 0.055, c * 12.92,
               vec3(lessThanEqual(c, vec3(0.0031308))));
  }

  void main() {
    vec2 uv = vUv;
    // fear wobble / barrel distortion
    vec2 c = uv - 0.5;
    uv += c * dot(c, c) * uFear * 0.18;
    uv += c * uDistort * 0.02;

    float sp = 0.0008 + 0.0022 * uDistort + 0.0006 * uFear;
    vec3 col;
    col.r = texture2D(tDiffuse, uv + vec2(sp, 0.0)).r;
    col.g = texture2D(tDiffuse, uv).g;
    col.b = texture2D(tDiffuse, uv - vec2(sp, 0.0)).b;

    // cheap built-in bloom: two rings of thresholded taps, added back
    // (replaces a separate bloom pass - robust on all GPUs, very retro)
    // NOTE: this runs BEFORE tone mapping/exposure, on HalfFloat scene values.
    // The threshold must sit above the distant-lights luminance band
    // (ambient + many corridor fixtures accumulate to ~1.1 far away) or the
    // bloom grows that band into a wide white smear across the corridor.
    vec3 glow = vec3(0.0);
    float gt = 1.25;
    for (float i = 0.0; i < 16.0; i++) {
      float a = i * 0.3926991; // golden-angle rotation
      float rad = 0.0035 + 0.011 * floor(i / 8.0);
      vec3 s = texture2D(tDiffuse, uv + vec2(cos(a), sin(a)) * rad).rgb;
      glow += max(vec3(0.0), s - vec3(gt));
    }
    col += glow * (uGlow / 16.0);

    // Extra highlight shoulder (safety net against large pure-white sheets).
    // Below 1.25 the curve is untouched; above it values are rolled off so a
    // close flashlight hotspot or a light fixture can never accumulate into an
    // all-white wall after tone mapping.
    vec3 over = max(vec3(0.0), col - vec3(1.25));
    // Roll off only the part above 1.25; pixels at or below 1.25 stay untouched.
    col += over * (vec3(1.0) / (vec3(1.0) + over * 0.32) - vec3(1.0));

    // scanlines (2px at 360p)
    col *= 1.0 - 0.085 * sin(uv.y * 360.0 * 3.14159265);

    // cold teal push in the shadows, red pulse under fear
    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(col, col * vec3(0.92, 1.06, 1.12), (1.0 - lum) * 0.22 * (1.0 - uFear * 0.6));
    col += vec3(1.0, 0.22, 0.16) * uFear * 0.035 * (0.6 + 0.4 * sin(uTime * 6.5));

    // vignette
    float vg = length(uv - 0.5);
    col *= 1.0 - smoothstep(0.38, 1.0, vg) * (0.34 + uFear * 0.28 + uDistort * 0.25);

    // display transform (was OutputPass). Everything above works on linear
    // HalfFloat scene values; ACES + sRGB happen here so the grain and the
    // ordered dither below operate on DISPLAY values. Dithering LINEAR values
    // put the first code step at ~21% display brightness \u2014 the bayer pattern
    // turned every near-black wall into a harsh 0-vs-50/255 checkerboard,
    // which was the "dark fields drown in grain" artifact.
    col = acesFilm(col);
    col = linearToSRGB(col);

    // film grain, in display space: perceptually even size, gently tapered
    // toward the shadows (alive in the light, blacks stay quiet)
    float dlum = dot(col, vec3(0.299, 0.587, 0.114));
    col += (hash(uv * 913.7 + fract(uTime) * 131.1) - 0.5)
         * 0.045 * (0.3 + 0.7 * smoothstep(0.05, 0.25, dlum));

    // ordered dithering (banding killer) \u2014 32 perceptually even display levels
    col = floor(col * 63.0 + bayer4(gl_FragCoord.xy)) / 63.0;

    gl_FragColor = vec4(col, 1.0);
  }
`;function Cu(i,t){return typeof window.__forcedLandscape=="function"&&window.__forcedLandscape()?[t,-i]:[i,t]}var Gl=class{constructor(){this.audio=new Po,this.state="title",this.notes=new Set,this.campaign=new Ii,this.storyEvents=[],this.hiding=!1,this.spareBatteries=0,this.saveNotice=0,this.fear=0,this.time=0,this.scareCount=0,this.startTime=0,this.noteOpen=!1,this.blackout=!1,this.battery=100,this.batteryHudT=0,this._flashMul=1,this.finale=!1,this.phoneRinging=!1,this.phoneArmed=!1,this.phoneTimer=null,this.eventTimer=dt(20,30),this.keys={},this.bobPhase=0,this.lastBobSin=0,this.bob=0,this.eyeY=0,this.vy=0,this.grounded=!0,this.flashOn=!0,this.shake=0,this.scaredTimer=0,this.fadeLevel=0,this.subtitleTimer=null,this.introStep=0,this.monster=null,this.ghost=null,this.initOK=!1;try{this._initRenderer(),this._initScene(),this._initPost(),this._initLevel(),this._initEntities(),this._initPlayer(),this._initDust(),this._initEvents(),this._initTouch(),this.investigation=new Oo(this),this.atmosphere=new Bo(this),this.initOK=!0}catch(t){console.error(t),_t("error").classList.remove("hidden"),_t("title").classList.add("hidden");return}this.nopost=new URLSearchParams(location.search).has("nopost"),this._loop=this._loop.bind(this),requestAnimationFrame(this._loop)}_initRenderer(){this.canvas=_t("game"),this.renderer=new Hs({canvas:this.canvas,antialias:!0,powerPreference:"high-performance"}),this.renderer.setSize(zi,ir,!1),this.renderer.setPixelRatio(1),this.renderer.shadowMap.enabled=!1,this.renderer.toneMapping=vl,this.renderer.toneMappingExposure=1.38,this.scene=new no,this.scene.background=new Zt(263690),this.scene.fog=new eo(659985,.043),this.camera=new Ye(75,zi/ir,.05,250),this.camera.rotation.order="YXZ",this.scene.add(this.camera),Cl(zi,ir),window.addEventListener("resize",()=>this._fitCanvas()),this._fitCanvas(),this.resScale=1,this.resolutionGovernor=new Ho}_applyResolution(){let t=Math.round((this.renderW||zi)*this.resScale),e=Math.round((this.renderH||ir)*this.resScale);this.renderer.setSize(t,e,!1),this.composer&&this.composer.setSize(t,e),Cl(t,e)}_autoResolution(t){let e=this.resolutionGovernor.sample(t);e!==null&&(this.resScale=e,this._applyResolution())}_fitCanvas(){let t=typeof window.__forcedLandscape=="function"&&window.__forcedLandscape(),e=t?window.innerHeight:window.innerWidth,n=t?window.innerWidth:window.innerHeight;this.canvas.style.width=e+"px",this.canvas.style.height=n+"px",this.camera.aspect=e/n,this.camera.updateProjectionMatrix(),this.renderW=zi,this.renderH=Math.round(zi*n/e),this.renderer.setSize(this.renderW*(this.resScale||1),this.renderH*(this.resScale||1),!1),this.composer&&this._applyResolution()}_initScene(){this.hemi=new go(2766916,657157,1.26),this.hemiBase=1.26,this.scene.add(this.hemi);let t=new yo(7508899,.24);t.position.set(-14,30,70),this.scene.add(t),this.skyMaterial=new nn({side:Qe,depthWrite:!1,uniforms:{uTime:{value:0}},vertexShader:`varying vec3 vSky; void main() {
        vSky = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,fragmentShader:`uniform float uTime; varying vec3 vSky;
        void main() {
          vec3 dir = normalize(vSky);
          float clouds = sin(dir.x * 19.0 + uTime * 0.008 + sin(dir.z * 11.0))
            * sin(dir.z * 16.0 - uTime * 0.005 + dir.x * 4.0);
          vec3 color = mix(vec3(0.036, 0.061, 0.066), vec3(0.007, 0.013, 0.023), clamp(dir.y, 0.0, 1.0));
          color *= 0.83 + clouds * 0.16;
          float moon = length(dir - normalize(vec3(-0.3, 0.58, 0.82)));
          color += vec3(0.22, 0.3, 0.32) * (1.0 - smoothstep(0.0, 0.09, moon));
          color += vec3(0.4, 0.48, 0.47) * (1.0 - smoothstep(0.012, 0.018, moon));
          gl_FragColor = vec4(color, 1.0);
        }`});let e=new Y(new Ne(150,24,16),this.skyMaterial);e.position.set(0,0,44),this.scene.add(e),this.lightning={next:dt(25,60),t:0,dur:0,dist:.5}}_initPost(){this.composer=new Ao(this.renderer),this.composer.setSize(this.renderW,this.renderH),this.composer.setPixelRatio(1),this.composer.addPass(new Ro(this.scene,this.camera)),this.grade=new ys({uniforms:{tDiffuse:{value:null},uTime:{value:0},uFear:{value:0},uDistort:{value:0},uGlow:{value:.35},uExposure:{value:this.renderer.toneMappingExposure}},vertexShader:ux,fragmentShader:dx}),this.composer.addPass(this.grade)}_initLevel(){this.level=new Do(this.scene,{onLocked:t=>{this._sub(t.lockedMsg,""),this.audio.woodenCreak()},onDoorToggle:(t,e)=>{e?this.audio.doorOpen():this.audio.doorClose()},onDoorBlocked:()=>this._sub("\u95E8\u6247\u88AB\u6321\u4F4F\u4E86\u3002\u9000\u5F00\u4E00\u70B9\uFF0C\u8BA9\u5B83\u8F6C\u8FC7\u53BB\u3002","",2.5),onDeadDoor:()=>{this._sub("\u8FD9\u91CC\u2026\u2026\u662F\u5899\uFF1F","\u3053\u3053\u306F\u2026\u58C1\uFF1F"),this.audio.woodenCreak(),this.level.props.eyesWall.visible=!0,this._setFear(this.fear+.15)},onExitOpen:()=>{this._sub("\u591C\u98CE\u6D8C\u4E86\u8FDB\u6765\u3002","\u5916\u306E\u7A7A\u6C17\u304C\u3001\u6D41\u308C\u8FBC\u3080\u3002")},onNote:t=>this._readNote(t),onDocument:t=>this._readNote(t),onPuzzle:t=>this.investigation.openPuzzle(t),onHide:t=>this._toggleHide(t),onItem:(t,e,n)=>{if(this.campaign.collectItem(t)){e.visible=!1,n.disabled=!0,this.audio.paperRustle(),this._refreshCampaign();let s={fuse:"\u627E\u5230\u5907\u7528\u7194\u65AD\u5668\u3002\u7EF4\u4FEE\u95E8\u5728\u8D70\u5ECA\u53F3\u4FA7\u3002",tape:"\u4E03\u6708\u5341\u56DB\u65E5\u7684\u5F55\u97F3\u5E26\u3002\u53BB 203 \u653E\u6620\u5BA4\u542C\u542C\u3002",valveHandle:"\u53D6\u56DE\u6392\u6C34\u9600\u624B\u8F6E\u3002\u53EF\u4EE5\u56DE\u5730\u4E0B\u88C5\u56DE\u5B83\u4E86\u3002"};this._sub(s[t]||"\u7269\u54C1\u5DF2\u653E\u5165\u968F\u8EAB\u7269\u54C1\u680F\u3002","",4)}},onPhone:()=>this._answerPhone(),onTV:()=>this._toggleTV(),onBell:()=>this._ringBell(),onDoll:()=>this._lookDoll(),onBattery:t=>this._pickupBattery(t),onLamp:()=>this._toggleLamp(),onMirror:()=>this._mirrorScare(),onSwitch:t=>this._toggleSwitch(t),onDrip:()=>this.audio.drip(),onWasher:()=>{this.audio.washer(-.6),this.shake=Math.max(this.shake,.1),this._sub("\u6D17\u8863\u673A\u52A8\u4E86\u534A\u5708\uFF0C\u53C8\u505C\u4E86\u3002","\u6D17\u6FEF\u6A5F\u304C\u534A\u5468\u56DE\u3063\u3066\u3001\u6B62\u307E\u3063\u305F\u3002",3),this._setFear(this.fear+.05)},zone_kitchen:()=>this._zoneKitchen(),zone_living:()=>this._zoneLiving(),zone_bedroom:()=>this._zoneBedroom(),zone_bathroom:()=>this._zoneBathroom(),zone_passage:()=>this._zonePassage(),zone_altar:()=>this._zoneAltar(),zone_child:()=>this._zoneChild(),zone_upper:()=>this._zoneUpper(),zone_corridorMid:()=>this._zoneCorridorMid(),zone_stairsEast:()=>this._zoneStairs(),zone_exitVoid:()=>this._zoneExitVoid()},{batchStaticFixtures:new URLSearchParams(location.search).get("fixtureBatching")!=="0"}),this.colliders=this.level.colliders,this._losBoxes=this.level.colliders.map(t=>new dn(new L(t.x0,t.y0,t.z0),new L(t.x1,t.y1,t.z1)))}_initEntities(){this.monster=new ko(this.scene,this.level.tex),this.ghost=new No(this.scene)}_initPlayer(){this.controls=new wo(this.camera,document.body),document.removeEventListener("pointerlockerror",this.controls._onPointerlockError);let t=.014;try{let c=parseFloat(localStorage.getItem("echo_sens"));c>0&&(t=c)}catch(c){}this.sens=ne(t,.004,.04),this.controls.pointerSpeed=this.sens/.002,this.controls.addEventListener("lock",()=>this._onLock()),this.controls.addEventListener("unlock",()=>this._onUnlock()),this.playerPos=new L().copy(this.level.playerStart),this.char=js(this.playerPos.x,this.playerPos.y,this.playerPos.z,zn,sr),this.traversal=new Go,this.flash=new xo(13623551,8,22,.4,.85,1.5),this.flash.position.set(.1,Ms-.06,this.playerPos.z),this.flash.castShadow=!1,this.flash.shadow.mapSize.set(512,512),this.flash.shadow.bias=4e-4,this.flash.shadow.normalBias=.02,this.flash.shadow.camera.near=.1,this.flash.shadow.camera.far=30,this.flashTarget=new Ee,this.flashTarget.position.set(0,0,-12),this.scene.add(this.flashTarget),this.flash.target=this.flashTarget,this.scene.add(this.flash),this._tmpDir=new L;let e=new Si(.6,6.5,18,1,!0);e.translate(0,3.25,0),e.rotateX(Math.PI/2),this.coneMat=new nn({transparent:!0,depthWrite:!1,blending:Os,side:ue,uniforms:{uTime:{value:0},uFade:{value:1},uOpacity:{value:.05}},vertexShader:`
        varying float vZ;
        void main() {
          vZ = position.z;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform float uTime;
        uniform float uFade;
        uniform float uOpacity;
        varying float vZ;
        void main() {
          float a = pow(max(0.0, 1.0 - vZ / 6.5), 2.4);
          // fade the first 1.2m: viewed from inside the cone, the near-eye
          // stretch added up to 0.1 luminance across the screen center and
          // clipped moderately lit walls into a solid white rectangle
          a *= smoothstep(0.0, 1.2, vZ);
          float shimmer = 0.85 + 0.15 * sin(uTime * 40.0 + vZ * 5.0);
          gl_FragColor = vec4(vec3(0.72, 0.82, 0.95) * shimmer, a * uOpacity * uFade);
        }
      `}),this.cone=new Y(e,this.coneMat),this.cone.position.set(.04,-.09,.01),this.camera.add(this.cone);let n=new Ot,s=new Y(new bt(.035,.03,.24,12),new we({color:2568234,roughness:.7}));s.rotation.x=Math.PI/2,n.add(s);let r=new Y(new bt(.058,.038,.085,12),new we({color:7042151,roughness:.65,metalness:.12}));r.rotation.x=Math.PI/2,r.position.z=-.15,n.add(r);let o=new Y(new vn(.046,12),new Ze({color:9017735}));o.position.z=-.195,o.rotation.y=Math.PI,n.add(o);let a=new Y(new ee(.015,.012,.035),new we({color:9673609,roughness:.9}));a.position.set(0,.036,-.02),n.add(a),n.position.set(.31,-.27,-.48),n.rotation.x=-.15,this.camera.add(n),this.torchModel=n,window.addEventListener("keydown",c=>{this.keys[c.code]=!0,this._onKey(c)}),window.addEventListener("keyup",c=>{this.keys[c.code]=!1});let l=()=>{this._clearMovementInput(),this.state==="playing"&&this.investigation&&this.investigation.openSettings()};window.addEventListener("blur",l),document.addEventListener("visibilitychange",()=>{document.hidden&&l()}),this.dragging=!1,this._dragX=0,this._dragY=0,this.canvas.addEventListener("mousedown",c=>{document.pointerLockElement||this.state!=="playing"||this.noteOpen||this.controls.pointerSpeed!==0&&(this.dragging=!0,this._dragX=c.clientX,this._dragY=c.clientY)}),window.addEventListener("mousemove",c=>{if(!this.dragging||document.pointerLockElement)return;if(this.state!=="playing"||this.noteOpen){this.dragging=!1;return}if(this.controls.pointerSpeed===0)return;let h=c.clientX-this._dragX,u=c.clientY-this._dragY;this._dragX=c.clientX,this._dragY=c.clientY;let d=this.sens,f=this.camera.rotation;f.order="YXZ",f.y-=h*d,f.x=ne(f.x-u*d,-1.52,1.52),f.z=0}),window.addEventListener("mouseup",()=>{this.dragging=!1}),document.addEventListener("pointerlockerror",()=>this._lockHint()),this.camera.position.set(this.playerPos.x,Ms,this.playerPos.z),this.camera.rotation.set(0,Math.PI,0),this.canvas.addEventListener("click",()=>{(this.state==="playing"||this.state==="scared")&&!this.noteOpen&&!document.pointerLockElement&&this._tryLock()}),_t("end-again").addEventListener("click",()=>location.reload()),_t("note").addEventListener("click",c=>{(c.target===_t("note")||c.target===_t("note-close"))&&this._closeNote()})}_initDust(){let e=new ge,n=new Float32Array(320*3);this.dustPos=n;for(let r=0;r<320;r++)n[r*3]=dt(-11,11),n[r*3+1]=dt(0,4),n[r*3+2]=dt(-11,11);e.setAttribute("position",new Pe(n,3));let s=new Vs({color:10336460,size:.02,sizeAttenuation:!0,transparent:!0,opacity:.18,depthWrite:!1,blending:Os});this.dust=new oo(e,s),this.scene.add(this.dust)}_initEvents(){let t=_t("scare-canvas");t.width=zi,t.height=ir;let e=t.getContext("2d");e.fillStyle="#000",e.fillRect(0,0,t.width,t.height);let n=s=>Math.random()*s;e.fillStyle="#b8b2a4",e.beginPath(),e.ellipse(320,190,150+n(20),200+n(30),.06,0,7),e.fill(),e.fillStyle="#8f897c",e.beginPath(),e.ellipse(320,330,110,70,.1,0,7),e.fill(),e.fillStyle="#000",e.beginPath(),e.ellipse(250,140,38,52,.15,0,7),e.fill(),e.beginPath(),e.ellipse(390,140,38,52,-.15,0,7),e.fill(),e.fillStyle="#3a3a38",e.beginPath(),e.arc(258,150,7,0,7),e.fill(),e.beginPath(),e.arc(382,150,7,0,7),e.fill(),e.fillStyle="#000",e.beginPath(),e.ellipse(320,300,55,85,0,0,7),e.fill(),e.fillStyle="#2c1210",e.beginPath(),e.ellipse(320,270,40,30,0,0,7),e.fill(),e.strokeStyle="rgba(60,50,40,0.5)";for(let s=0;s<26;s++)e.beginPath(),e.moveTo(200+n(240),40+n(80)),e.lineTo(200+n(240),240+n(120)),e.stroke();e.strokeStyle="rgba(110,10,8,0.8)",e.lineWidth=6;for(let s of[250,390])e.beginPath(),e.moveTo(s,190),e.lineTo(s-20,260),e.stroke()}_initTouch(){let t=new URLSearchParams(location.search).has("touch");if(this.touchMode=t||"ontouchstart"in window||(navigator.maxTouchPoints|0)>0||window.matchMedia&&matchMedia("(pointer: coarse)").matches,!this.touchMode)return;document.body.classList.add("touch"),this.touchMove={x:0,y:0},this.touchRun=!1,this._joyId=null,this._lookId=null,this._lookLX=0,this._lookLY=0;let e=document.getElementById("touch-help");e&&(e.style.display="inline");let n=_t("touch-ui"),s=_t("joy-knob"),r=_t("joy-zone"),o=_t("btn-interact"),a=42,l=()=>{let p=r.getBoundingClientRect();return{x:p.left+p.width/2,y:p.top+p.height/2}},c=p=>{let g=l(),_=p.clientX-g.x,x=p.clientY-g.y;[_,x]=Cu(_,x);let b=Math.hypot(_,x);b>a&&(_*=a/b,x*=a/b),this.touchMove.x=_/a,this.touchMove.y=x/a,s.style.transform=`translate(${_}px, ${x}px)`},h=()=>{this._joyId=null,this.touchMove.x=0,this.touchMove.y=0,s.style.transform="translate(0px, 0px)"};r.addEventListener("touchstart",p=>{if(p.preventDefault(),this._joyId!==null)return;let g=p.changedTouches[0];this._joyId=g.identifier,c(g)},{passive:!1}),r.addEventListener("touchmove",p=>{p.preventDefault();for(let g of p.changedTouches)g.identifier===this._joyId&&c(g)},{passive:!1});for(let p of["touchend","touchcancel"])r.addEventListener(p,g=>{for(let _ of g.changedTouches)_.identifier===this._joyId&&h()},{passive:!1});let u=()=>this.state==="playing"&&!this.noteOpen&&_t("pause").classList.contains("hidden");this.canvas.addEventListener("touchstart",p=>{if(!u()||this._lookId!==null)return;let g=p.changedTouches[0];this._lookId=g.identifier,this._lookLX=g.clientX,this._lookLY=g.clientY},{passive:!0}),this.canvas.addEventListener("touchmove",p=>{if(u()){for(let g of p.changedTouches){if(g.identifier!==this._lookId)continue;let _=g.clientX-this._lookLX,x=g.clientY-this._lookLY;this._lookLX=g.clientX,this._lookLY=g.clientY;let[b,T]=Cu(_,x),E=this.camera.rotation;E.order="YXZ",E.y-=b*this.sens*.85,E.x=ne(E.x-T*this.sens*.85,-1.52,1.52),E.z=0}p.preventDefault()}},{passive:!1});for(let p of["touchend","touchcancel"])this.canvas.addEventListener(p,g=>{for(let _ of g.changedTouches)_.identifier===this._lookId&&(this._lookId=null)},{passive:!1});let d=Yl;d(o,()=>{if(this.noteOpen){this._closeNote();return}this.state==="playing"&&this._interact()}),d(_t("btn-flash"),()=>{this.state==="playing"&&this._toggleFlash()});let f=_t("btn-run");f.addEventListener("touchstart",p=>{p.preventDefault(),this.touchRun=!0,f.classList.add("on")},{passive:!1});for(let p of["touchend","touchcancel"])f.addEventListener(p,g=>{g.preventDefault(),this.touchRun=!1,f.classList.remove("on")},{passive:!1});d(_t("btn-pause"),()=>{this.state==="playing"&&!this.noteOpen&&this.investigation.openSettings()});let m=_t("rotate-hint"),y=()=>m.classList.toggle("hidden",window.innerWidth>=window.innerHeight||window.__forcedLandscape&&window.__forcedLandscape());y(),window.addEventListener("resize",y),_t("btn-flash").classList.toggle("on",this.flashOn),this._touchUI=n}_clearMovementInput(){Ru(this);let t=_t("joy-knob");t&&(t.style.transform="translate(0px, 0px)")}_sub(t,e="",n=3.4){let s=_t("subtitle");s.querySelector(".cn").textContent=t,s.querySelector(".ja").textContent="",s.classList.add("on"),clearTimeout(this.subtitleTimer),this.subtitleTimer=setTimeout(()=>s.classList.remove("on"),n*1e3)}_setObjective(t){_t("objective").innerHTML=`<div>${t}</div>`}_prompt(t){t?(_t("prompt-text").textContent=t,_t("prompt").classList.remove("hidden")):_t("prompt").classList.add("hidden")}_setFear(t){this.fear=ne(t,0,1),this.audio.setFear(this.fear),_t("vignette").classList.toggle("fear",this.fear>.55)}_flashRed(){let t=_t("flash");t.style.opacity="1",setTimeout(()=>{t.style.opacity="0"},90)}_start(t=!1){this.state!=="title"||!this.initOK||(this.campaign=new Ii(t?this.investigation.saved:null),this.notes=new Set(this.campaign.documents),Ol(this.level,this.campaign),this.audio.ensure(),this.audio.setPaused(!1),this.state="playing",this.startTime=performance.now(),_t("title").classList.add("hidden"),_t("hud").classList.remove("hidden"),this._touchUI&&this._touchUI.classList.remove("hidden"),this._wakeAtCheckpoint(),this._tryLock(),this._refreshCampaign(!1),this._showChapter(),t?this._sub("\u96E8\u8FD8\u5728\u4E0B\u3002\u4F60\u8BB0\u5F97\u81EA\u5DF1\u662F\u6765\u505A\u4EC0\u4E48\u7684\u3002","",4):(this._sub("\u62C6\u9664\u524D\u4E00\u591C\u3002\u90A3\u5C01\u4FE1\u628A\u4F60\u5E26\u56DE\u4E86\u8FD9\u91CC\u3002","",4.5),this.storyEvents.push({delay:5,action:()=>this._sub("\u5148\u770B\u770B\u5927\u5385\u5DE6\u4FA7\u503C\u73ED\u53F0\u4E0A\u7684\u4FE1\u3002\u6309 E \u8C03\u67E5\u3002","",5)})),this.campaign.flags.released&&(this.finale=!0,this.storyEvents.push({delay:6,action:()=>this._spawnHunt()})))}_refreshCampaign(t=!0){if(Ol(this.level,this.campaign),this._setObjective(this.campaign.objective),_t("chapter-label").textContent=bs[this.campaign.chapter].title,_t("evidence-count").textContent=this.campaign.documents.size+" \u4EFD\u8BB0\u5F55",t&&!this.campaign.flags.ended)try{localStorage.setItem(vs,JSON.stringify(this.campaign.snapshot())),_t("save-status").textContent="\u8C03\u67E5\u8FDB\u5EA6\u5DF2\u4FDD\u5B58",this.saveNotice=3}catch(e){_t("save-status").textContent="\u6D4F\u89C8\u5668\u65E0\u6CD5\u4FDD\u5B58\u8FDB\u5EA6",this.saveNotice=5}}_showChapter(){let t=bs[this.campaign.chapter];_t("chapter-title").textContent=t.title,_t("chapter-subtitle").textContent=t.subtitle,_t("chapter-card").classList.remove("hidden"),this.chapterTimer=4}_campaignAdvanced(t){this._refreshCampaign(),["power","cabinet","music","develop","radio"].includes(t)&&this._showChapter(),t==="power"?(this.battery=Math.max(this.battery,80),this.audio.buzz(),this.shake=.12,this.storyEvents.push({delay:4,action:()=>{this.audio.knock(3),this._sub("\u697C\u4E0A\u7684\u78C1\u9501\u677E\u5F00\u4E86\u3002\u63A5\u7740\uFF0C\u662F\u4E09\u4E0B\u6572\u95E8\u58F0\u3002","",4)}})):t==="tape"?(this.audio.whisper(-.6,2.5),this.audio.musicBox(),this._setFear(.5)):t==="music"?(this.audio.lullaby(),this._setFear(.6),this.storyEvents.push({delay:2,action:()=>{this.ghost.appearAt(3.2,0,10.8,Math.PI),this._sub("\u300C\u4F60\u7EC8\u4E8E\u8BB0\u8D77\u6765\u4E86\u3002\u300D","",4)}})):t==="develop"?(this.audio.cameraShutter(),this.audio.lullaby(),this._setFear(.25),this.storyEvents.push({delay:4,action:()=>{this._sub("\u300C\u82CD\u592A\u3002\u300D\u4F60\u5FF5\u51FA\u7167\u7247\u80CC\u9762\u7684\u540D\u5B57\u3002\u5730\u4E0B\u7684\u94C1\u94FE\u677E\u4E86\u3002","",5),this.audio.hammer(-.3)}})):t==="generator"?(this.audio.buzz(),this.audio.hammer(.4),this.shake=.07,this.battery=Math.max(60,this.battery)):t==="radio"?(this.audio.switchClick(),this.audio.whisper(-.2,2),this._setFear(.15),this.storyEvents.push({delay:4,action:()=>{this.audio.knock(3),this._sub("\u8FDC\u5904\u7684\u7EE7\u7535\u5668\u5438\u5408\u4E86\u3002\u56DE\u5230\u539F\u6CF5\u623F\uFF0C\u8FD9\u6B21\u628A\u95E8\u6253\u5F00\u3002","",5)}})):t==="valves"&&this._startFinale()}_wakeAtCheckpoint(t=this.campaign.checkpoint){let e=Xl(t,this.level.colliders);if(e!==t){t=e,this.campaign.checkpoint={...t};try{localStorage.setItem(vs,JSON.stringify(this.campaign.snapshot()))}catch(n){}}this._clearMovementInput(),this.playerPos.set(t.x,t.y,t.z),this.char=js(t.x,t.y,t.z,zn,sr),this.camera.position.set(t.x,t.y+Ms,t.z),this.camera.rotation.set(0,Math.PI,0),this.eyeY=t.y,this.vy=0,this.grounded=!0,this.traversal.reset(t),this.hiding=!1,this.hideTimer=0,_t("hide-state").classList.add("hidden"),this.monster.despawn(),this.ghost.hide(),this.audio.heartbeat(!1),this._hbOn=!1,this.battery=Math.max(45,this.battery),this.flashOn=!0,this._setFear(.15),this.shake=0,this.storyEvents=this.storyEvents.filter(n=>!n.hunt),this.finale&&this.storyEvents.push({delay:7,hunt:!0,action:()=>this._spawnHunt()})}_spawnHunt(){if(this.state!=="playing")return;let t=this._dynColliders(),n=this.level.monsterNodes.filter(s=>er(s,t)&&Math.abs(s.y-this.playerPos.y)<.5&&Math.hypot(s.x-this.playerPos.x,s.z-this.playerPos.z)>8&&Math.hypot(s.x-this.playerPos.x,s.z-this.playerPos.z)<20).at(-1);n&&(this.monster.spawn(new L(n.x,n.y,n.z),"chase"),this.onChaseStart())}_toggleHide(t){if(this.hiding){this.hiding=!1,this.flashOn=this.battery>0,_t("hide-state").classList.add("hidden"),this._sub("\u4F60\u63A8\u5F00\u8863\u67DC\u7684\u95E8\u3002","",2);return}let e=this.monster.pos.distanceTo(this.playerPos);if(["chase","stalk","search"].includes(this.monster.state)&&e<5&&!Kn(this.camera.position,this.monster.pos.clone().add(new L(0,1.3,0)),this.level.colliders,this.level.doors)){this._sub("\u5B83\u770B\u89C1\u4E86\u4F60\u3002\u5148\u5173\u4E0A\u95E8\uFF0C\u6216\u8005\u62C9\u5F00\u8DDD\u79BB\u3002","",3);return}this.hiding=!0,this.hideTimer=0,this.hideMesh=t,this.flashOn=!1,this._clearMovementInput(),this.audio.doorClose(),_t("hide-state").classList.remove("hidden"),this._sub("\u5C4F\u4F4F\u547C\u5438\u3002\u6309 E \u79BB\u5F00\u8863\u67DC\u3002","",4)}setSensitivity(t){this.sens=ne(t,.004,.04);try{localStorage.setItem("echo_sens",String(this.sens))}catch(e){}this.controls.pointerSpeed!==0&&(this.controls.pointerSpeed=this.sens/.002)}_tryLock(){var t,e;if(this.state!=="ending"&&!this.noteOpen){if(this.touchMode){_t("pause").classList.add("hidden");return}try{let n=(e=(t=document.body).requestPointerLock)==null?void 0:e.call(t);n&&typeof n.catch=="function"&&n.catch(()=>this._lockHint())}catch(n){this._lockHint()}}}_lockHint(){this.lockHintShown||this.state!=="playing"||(this.lockHintShown=!0,this._sub("\u82E5\u89C6\u89D2\u65E0\u6CD5\u8F6C\u52A8\uFF1A\u6309\u4F4F\u5E76\u62D6\u52A8\u9F20\u6807\u6216\u89E6\u63A7\u677F\u3002","\u8996\u70B9\u304C\u52D5\u304B\u306A\u3044\u5834\u5408\uFF1A\u30DE\u30A6\u30B9\u304B\u30C8\u30E9\u30C3\u30AF\u30D1\u30C3\u30C9\u3092\u30C9\u30E9\u30C3\u30B0\u3002",5.5))}_onLock(){if(this.noteOpen||!_t("pause").classList.contains("hidden")){this._skipUnlockPause=!0,this.controls.unlock();return}this.state==="playing"&&(_t("pause").classList.add("hidden"),this.audio.setPaused(!1))}_onUnlock(){var t;if(this._skipUnlockPause){this._skipUnlockPause=!1;return}this.controls.isLocked&&this.state==="playing"&&!this.noteOpen&&((t=this.investigation)==null||t.openSettings())}_onKey(t){var e;if(!t.repeat){if(t.code==="Escape"){if(!_t("pause").classList.contains("hidden")){this.investigation.closeSettings();return}if(this.noteOpen){this._closeNote();return}if(this.state!=="playing")return;_t("pause").classList.contains("hidden")?this.investigation.openSettings():this.investigation.closeSettings();return}if(!(["INPUT","TEXTAREA"].includes((e=document.activeElement)==null?void 0:e.tagName)&&document.activeElement.getClientRects().length)&&!(t.code==="Tab"&&this.noteOpen)){if((t.code==="KeyJ"||t.code==="Tab"||t.code==="KeyM")&&this.state==="playing"){t.preventDefault(),this.investigation.panel?this.investigation.close():!this.noteOpen&&_t("pause").classList.contains("hidden")&&this.investigation.openJournal(t.code==="KeyM"?"map":"evidence");return}if(t.code==="KeyE"){if(this.noteOpen){this._closeNote();return}if(this.state!=="playing"||!_t("pause").classList.contains("hidden"))return;if(this.hiding){this._toggleHide();return}this._interact()}t.code==="KeyF"&&this.state==="playing"&&!this.noteOpen&&!this.hiding&&_t("pause").classList.contains("hidden")&&this._toggleFlash(),t.code==="KeyR"&&this.state==="playing"&&!this.noteOpen&&_t("pause").classList.contains("hidden")&&this._wakeAtCheckpoint()}}}_interact(){let t=this._raycastTarget();if(!t)return;let e=t.object.userData.interactable;e&&e.action&&e.action()}_raycastTarget(){var s,r;this._pickDir=this._pickDir||new L,this.camera.getWorldDirection(this._pickDir);let t=this.camera.position,e=null,n=1/0;for(let o of this.level.interactables){if(o.disabled)continue;let a=o.mesh;if(!a.visible)continue;let l=wu(a,this._tmpV||(this._tmpV=new L)),c=l.x-t.x,h=l.y-t.y,u=l.z-t.z,d=Math.sqrt(c*c+h*h+u*u);if(d>o.dist||d<.001)continue;let f=(c*this._pickDir.x+h*this._pickDir.y+u*this._pickDir.z)/d;if(f<Math.cos(Math.PI/6)||Kn(t,l,this.level.colliders,this.level.doors,(r=(s=o.door)==null?void 0:s.collider)!=null?r:a.userData.collider))continue;let m=Math.acos(ne(f,-1,1))*4+d*.4;m<n&&(n=m,e=o)}return e?{object:e.mesh,interactable:e}:null}_readNote(t){if(this.noteOpen||this.state!=="playing")return;let e=Di[String(t)];e&&(this.noteOpen=!0,this._clearMovementInput(),this.audio.paperRustle(),_t("note-item").textContent=e.item,_t("note-title").textContent=e.title,_t("note-cn").textContent=e.cn,_t("note-ja").textContent=e.location,this.investigation.renderPhoto("note-photo",t),_t("note").classList.remove("hidden"),this._touchUI&&this._touchUI.classList.add("hidden"),this.controls.isLocked&&(this._skipUnlockPause=!0,this.controls.unlock()),this.campaign.collectDocument(t)&&(this.notes.add(String(t)),this._refreshCampaign()),this.audio.setPaused(!0),_t("note-close").focus())}_closeNote(){var e,n;if((e=this.investigation)!=null&&e.panel){this.investigation.close();return}if(!this.noteOpen)return;this.noteOpen=!1,(n=document.activeElement)==null||n.blur(),_t("note").classList.add("hidden");let t=!_t("pause").classList.contains("hidden");this.audio.setPaused(t||document.hidden),this._touchUI&&!t&&this._touchUI.classList.remove("hidden"),this.state==="playing"&&!t&&this._tryLock()}_toggleTV(){let t=this.level.props.tv;t.on=!t.on,this.audio.setTV(t.on),t.on?this._sub("\u96EA\u82B1\u566A\u70B9\u2026\u2026","\u7802\u5D50\u2026\u3002",2):(this._sub("\u5B89\u9759\u4E0B\u6765\u4E86\u3002","\u9759\u304B\u306B\u306A\u3063\u305F\u3002",2),t.timer=dt(4,9))}_answerPhone(){this.phoneRinging?(this.phoneRinging=!1,this.audio.phoneStop(),this.audio.whisper(.2,2.2),this._sub("\u2026\u2026\u5988\u5988\uFF1F","\u2026\u2026\u304A\u304B\u3042\u3055\u3093\uFF1F",3.2),this._setFear(this.fear+.12)):(this.audio._noise({dur:.4,type:"highpass",freq:1200,gain:.05}),this._sub("\u561F\u2014\u2014\u561F\u2014\u2014\u3002","\u30C4\u30FC\u2026\u30C4\u30FC\u2026\u3002",2.4))}_ringBell(){var t;if(this.audio.bell(),this._sub("\u94C3\u58F0\u5728\u9ED1\u6697\u4E2D\u56DE\u8361\u3002","\u9234\u306E\u97F3\u304C\u3001\u95C7\u306B\u97FF\u3044\u305F\u3002",2.8),Pi(.6)&&this.monster.state==="dormant"){let e=this.level.ghostSpawns.find(n=>Math.hypot(n.x-this.playerPos.x,n.z-this.playerPos.z)>3);e&&(this.ghost.appearAt(e.x,(t=e.y)!=null?t:0,e.z,e.ry),this.audio.moan(0))}}_lookDoll(){let t=this.level.props.doll;if(t.turned)this._sub("\u2026\u2026\u5B83\u5728\u770B\u3002","\u2026\u2026\u898B\u3066\u3044\u308B\u3002",2.2);else{t.turned=!0;let e=Math.atan2(this.playerPos.x-t.mesh.position.x,this.playerPos.z-t.mesh.position.z);t.targetYaw=e,this.audio.whisper(.3,1.4),this._sub("\u4EBA\u5076\u6B63\u770B\u7740\u4F60\u3002","\u4EBA\u5F62\u304C\u3001\u3053\u3061\u3089\u3092\u898B\u3066\u3044\u308B\u3002",2.8),this._setFear(this.fear+.1)}}_toggleLamp(){let t=this.level.props.lamp;t.on=!t.on,t.light.intensity=t.on?1.8:0,t.shade&&(t.shade.material=t.on?t.shadeOn:t.shadeOff),this.audio.switchClick(),this._sub(t.on?"\u706F\u4EAE\u4E86\u3002":"\u706F\u706D\u4E86\u3002",t.on?"\u706F\u304C\u3064\u3044\u305F\u3002":"\u706F\u304C\u6D88\u3048\u305F\u3002",1.8)}_toggleSwitch(t){t&&(t.on=!t.on,t.fluor&&(t.fluor.userOff=!t.on),t.nub&&(t.nub.position.y=t.baseY+(t.on?.018:-.018)),this.audio.switchClick(),this._sub(t.on?"\u706F\u4EAE\u4E86\u3002":"\u706F\u706D\u4E86\u3002",t.on?"\u706F\u304C\u3064\u3044\u305F\u3002":"\u706F\u304C\u6D88\u3048\u305F\u3002",1.6),!t.on&&Pi(.22)&&setTimeout(()=>{this.state==="playing"&&(t.on=!0,t.fluor&&(t.fluor.userOff=!1),t.nub&&(t.nub.position.y=t.baseY+.018),this.audio.buzz(),this._sub("\u2026\u2026\u706F\uFF0C\u81EA\u5DF1\u4EAE\u4E86\u3002","\u2026\u2026\u96FB\u6C17\u304C\u3001\u3072\u3068\u308A\u3067\u306B\u70B9\u3044\u305F\u3002",3),this._setFear(this.fear+.1))},dt(2e3,4500)))}_mirrorScare(){if(this.ghost.group.visible)return;let t=new L;this.camera.getWorldDirection(t),t.y=0,t.normalize();let e=1.7,n=this.playerPos.x-t.x*e,s=this.playerPos.z-t.z*e;for(let o=0;o<6&&this._spotBlocked(n,s,this.playerPos.y);o++)e+=.3,n=this.playerPos.x-t.x*e,s=this.playerPos.z-t.z*e;let r=Math.atan2(this.playerPos.x-n,this.playerPos.z-s);this.ghost.appearAt(n,this.playerPos.y,s,r),this.ghost.life=1.4,this.audio.whisper(-.2,1.6),this.audio.sting(),this._sub("\u955C\u5B50\u91CC\u2026\u2026\u7AD9\u7740\u4EBA\u3002","",3.2),window.__meta&&!this.touchMode&&window.__meta.flashFace(this),this._setFear(this.fear+.18),this.shake=Math.max(this.shake,.4)}_spotBlocked(t,e,n){let s=this._dynColliders();for(let r of s)if(r.x0<t+.35&&r.x1>t-.35&&r.z0<e+.35&&r.z1>e-.35&&r.y1>n+.15&&r.y0<n+1.7)return!0;return!1}_zoneKitchen(){this.audio.clatter(),this.audio.doorOpen();let t=this.level.props.cabinet;t.openedOnce||(t.openedOnce=!0,this._sub("\u6A71\u67DC\u81EA\u5DF1\u6253\u5F00\u4E86\u3002","\u6238\u68DA\u304C\u3001\u3072\u3068\u308A\u3067\u306B\u958B\u3044\u305F\u3002",3.2),this._setFear(this.fear+.08),this.phoneArmed=!0,this.phoneTimer=setTimeout(()=>this._phoneRings(),dt(25,45)*1e3))}_phoneRings(){this.state!=="playing"||this.phoneRinging||(this.phoneRinging=!0,this.audio.phoneRing(),this._sub("\u7535\u8BDD\u5728\u54CD\u3002","\u96FB\u8A71\u304C\u3001\u9CF4\u3063\u3066\u3044\u308B\u3002",3),setTimeout(()=>{this.phoneRinging=!1},9500))}_zoneLiving(){let t=this.level.props.tv;t.on||(t.on=!0,this.audio.setTV(!0),this._sub("\u7535\u89C6\u81EA\u5DF1\u5F00\u4E86\u3002","\u30C6\u30EC\u30D3\u304C\u3001\u3064\u3044\u305F\u3002",3))}_zoneBedroom(){this.audio.whisper(-.3,2),this._sub("\u2026\u2026\u6709\u4EBA\u66FE\u7761\u5728\u8FD9\u91CC\u3002","\u2026\u2026\u3053\u3053\u3067\u3001\u5BDD\u3066\u3044\u305F\u3002",3.2)}_zoneBathroom(){this.audio.whisper(.4,2.2),this.audio.doorSlam(),this._sub("\u2026\u2026\u6211\u60F3\u56DE\u5BB6\u3002","\u2026\u2026\u304B\u3048\u308A\u305F\u3044\u3002",3.2),this._setFear(this.fear+.12)}_zonePassage(){this.audio.woodenCreak(),this._sub("\u58C1\u6A71\u6DF1\u5904\u6709\u4E00\u6761\u8DEF\u2026\u2026","\u62BC\u5165\u308C\u306E\u5965\u306B\u3001\u9053\u304C\u3042\u308B\u2026\u3002",3.4)}_zoneAltar(){this.audio.bell(),this._sub("\u4E3A\u67D0\u4EBA\u8BBE\u7684\u4F5B\u9F9B\u3002","\u8AB0\u304B\u306E\u305F\u3081\u306E\u3001\u4ECF\u58C7\u3002",3)}_zoneChild(){let t=this.level.props.doll;if(!t.turned){t.turned=!0;let e=Math.atan2(this.playerPos.x-t.mesh.position.x,this.playerPos.z-t.mesh.position.z);t.targetYaw=e}this.childLullaby||(this.childLullaby=!0,this.audio.lullaby()),this.audio.whisper(-.5,1.6),this._sub("\u8FD9\u4E2A\u623F\u95F4\uFF0C\u5F88\u51B7\u3002","\u3053\u306E\u90E8\u5C4B\u306F\u3001\u5BD2\u3044\u3002",3),this._setFear(this.fear+.1)}_zoneUpper(){this.audio.moan(0),this._sub("\u697C\u4E0A\uFF0C\u662F\u540C\u4E00\u6761\u8D70\u5ECA\u3002","\u4E0A\u306E\u968E\u306F\u3001\u540C\u3058\u5ECA\u4E0B\u3060\u3063\u305F\u3002",4),this.upperFlicker=3.5}_zoneStairs(){this.audio.woodenCreak()}_zoneExitVoid(){this.campaign.flags.released&&this.state==="playing"&&!this.noteOpen&&this.investigation.chooseEnding()}_zoneCorridorMid(){if(this.finale)return;this._sub("\u2026\u2026\u706F\uFF0C\u4E00\u76CF\u76CF\u7184\u706D\u3002","",4);let t=this.level.fluorescents.filter(n=>n.z>20&&n.z<58&&n.light.position.y<3);t.sort((n,s)=>s.z-n.z),t.forEach((n,s)=>{setTimeout(()=>{n.kill=!0},300+s*180)});let e=300+t.length*180+300;setTimeout(()=>this.audio.duck(),Math.max(600,e-500)),setTimeout(()=>{this.audio.sting();let n=t.find(s=>Math.abs(s.z-53.7)<.2);if(n&&(n.kill=!1,n.boost=2.8),this.monster.state==="dormant"){this.monster.spawn(new L(0,0,42),"stalk"),this.monster.tempLife=3.6,this.monster.group.rotation.y=Math.PI;let s=new Ve(13623530,3.4,16,1.6);s.position.set(0,2.5,45),this.scene.add(s),this.level.registerLight(s),setTimeout(()=>{s.removeFromParent(),this.level.unregisterLight(s)},3700),setTimeout(()=>{this.finale||this.audio.thud()},3300)}this._sub("\u8D70\u5ECA\u5C3D\u5934\u2026\u2026\u7AD9\u7740\u4EC0\u4E48\u3002","",3.4),this._setFear(.55)},e)}_toggleFlash(){if(this.flashOn)this.flashOn=!1;else if(this.battery<=0)if(this.spareBatteries>0)this.spareBatteries--,this.battery=55,this.flashOn=!0;else{this._sub("\u624B\u7535\u7B52\u6CA1\u7535\u4E86\u3002\u5BFB\u627E\u7535\u6C60\uFF0C\u6216\u8FD4\u56DE\u7AE0\u8282\u8282\u70B9\u3002","",2.6);return}else this.flashOn=!0;let t=_t("btn-flash");t&&t.classList.toggle("on",this.flashOn)}_updateBattery(t){var e,n;if(this.flashOn){let s=this.finale?.3:.12;if(this.battery=Math.max(0,this.battery-s*t),this.battery<=0){this.flashOn=!1;let r=_t("btn-flash");r&&r.classList.remove("on"),this._sub("\u624B\u7535\u7B52\u5F7B\u5E95\u6CA1\u7535\u4E86\u3002","",3.2),this._setFear(Math.min(1,this.fear+.12))}}if(this.flashOn&&this.battery<25&&!this.reduceEffects?this._flashMul=Math.random()<.05?dt(.12,.5):((e=this._flashMul)!=null?e:1)+(1-((n=this._flashMul)!=null?n:1))*Math.min(1,t*9):this._flashMul=1,this.batteryHudT-=t,this.batteryHudT<=0){this.batteryHudT=.2;let s=_t("battery");s&&(s.classList.toggle("low",this.battery<25),_t("battery-fill").style.width=this.battery+"%")}}_pickupBattery(t){let e=this.battery;e>=80?this.spareBatteries++:this.battery=Math.min(100,this.battery+55),t.removeFromParent();let n=this.level.interactables;for(let s=n.length-1;s>=0;s--)if(n[s].mesh===t){n.splice(s,1);break}this.audio.switchClick(),this._sub(e>=100?"\u6536\u597D\u4E00\u8282\u5907\u7528\u7535\u6C60\u3002\u7535\u91CF\u7528\u5B8C\u65F6\u6309 F \u66F4\u6362\u3002":"\u6362\u4E0A\u7535\u6C60\uFF0C\u5149\u7A33\u4E86\u4E0B\u6765\u3002","",2.4)}_startFinale(){this.finale||(this.finale=!0,this.audio.duck(),this.audio.sting(),this.lightsOutTimer=3,this._setFear(.8),this._refreshCampaign(),this.storyEvents.push({delay:2,hunt:!0,action:()=>this._spawnHunt()}))}_ending(t){if(this.state==="ending")return;let e=this.campaign.perform("ending",t);if(!e.ok){this._sub(e.message);return}this.investigation.close(),this.state="ending",this.monster.despawn(),this.ghost.hide(),this.controls.unlock(),this._touchUI&&this._touchUI.classList.add("hidden"),_t("pause").classList.add("hidden"),_t("hud").classList.add("hidden"),this.audio.setPaused(!1),this.audio.setFear(0),this.audio.heartbeat(!1),this.audio.ending();let n=Au[t],s=Math.round(this.campaign.elapsed),r=String(Math.floor(s/60)).padStart(2,"0"),o=String(s%60).padStart(2,"0");_t("end-title").textContent=n.title,_t("end-label").textContent=n.label,_t("end-text").textContent=n.text,_t("end-stats").textContent="\u7528\u65F6 "+r+":"+o+" / \u8BB0\u5F55 "+this.campaign.documents.size+" / \u9192\u6765 "+this.scareCount+" \u6B21";try{localStorage.setItem(vs,JSON.stringify(this.campaign.snapshot()))}catch(a){}_t("fade").style.opacity="1",setTimeout(()=>{_t("end").classList.remove("hidden"),_t("fade").style.opacity="0"},900)}onMonsterAttack(){this.state==="playing"&&(this.state="scared",this.scaredTimer=1.35,this.scareCount++,this.shake=1,this._flashRed(),_t("scare").style.opacity=this.reduceEffects?"0":"1",this.audio.scareBurst(),this.audio.heartbeat(!1),this._setFear(1),_t("vignette").classList.add("fear"),this.controls.pointerSpeed=0)}onMonsterAttackEnd(){this.state==="scared"&&(_t("scare").style.opacity="0",_t("fade").classList.remove("white"),_t("fade").style.opacity="1",setTimeout(()=>{this._wakeAtCheckpoint(),this.controls.pointerSpeed=this.sens/.002,_t("fade").style.opacity="0",_t("vignette").classList.remove("fear"),this.state="playing",this._sub("\u4F60\u5728\u6700\u540E\u4E00\u6B21\u8BB0\u8D77\u771F\u76F8\u7684\u5730\u65B9\u9192\u6765\u3002\u8C03\u67E5\u8FDB\u5EA6\u4FDD\u7559\u3002","",4),this._tryLock()},700))}onChaseStart(){this._setFear(.8),this._sub("\u7ED5\u8FC7\u8F6C\u89D2\uFF0C\u518D\u653E\u8F7B\u811A\u6B65\u3002\u5954\u8DD1\u7684\u58F0\u97F3\u4F1A\u66B4\u9732\u4F4D\u7F6E\u3002","",4),this._hbOn=!0,this.audio.heartbeat(!0,1)}onPursuitLost(){this.eventTimer=Math.max(this.eventTimer,18),this._setFear(Math.min(this.fear,.35))}_randomEvent(){var r,o;if(this.state!=="playing"||this.hiding||["chase","attack","search"].includes(this.monster.state))return;let t=Math.random(),e=this.playerPos,n=Math.hypot(e.x,e.z+1.35)>6,s=e.y<1;if(t<.12){this.audio.whisper(dt(-.8,.8),dt(1.4,2.4));{let[a,l]=Li([["\u2026\u2026\u8FC7\u6765","\u2026\u2026\u3053\u3063\u3061"],["\u2026\u2026\u627E\u5230\u4F60\u4E86","\u2026\u2026\u898B\u3064\u3051\u305F"],["\u2026\u2026\u5728\u54EA\u513F","\u2026\u2026\u3069\u3053"],["\u2026\u2026\u4F4F\u624B","\u2026\u2026\u3084\u3081\u3066"]]);this._sub(a,l,2.6)}}else if(t<.2){let a=this.level.ghostSpawns.filter(l=>{var h;let c=Math.hypot(l.x-e.x,l.z-e.z);return c>4.5&&c<17&&Math.abs(((h=l.y)!=null?h:0)-e.y)<.75});if(a.length){let l=Li(a);this.ghost.appearAt(l.x,(r=l.y)!=null?r:0,l.z,l.ry),this.audio.moan(dt(-.4,.4)),this._setFear(this.fear+.1)}}else if(t<.28){let a=this.level.doors.filter(l=>!l.locked&&l.type==="swing"&&l.label!=="\u58C1\u6A71"&&Math.abs(l.hinge.y-e.y)<.75&&Math.hypot(l.hinge.x-e.x,l.hinge.z-e.z)<16&&Math.hypot(l.hinge.x-e.x,l.hinge.z-e.z)>3);if(a.length){let l=Li(a);l.open?(l.open=!1,l.target=0,this.audio.doorSlam()):this.audio.knock(1)}else this.audio.doorSlam()}else if(t<.32){let a=this.level.doors.filter(l=>!l.locked&&l.type==="swing"&&l.label!=="\u58C1\u6A71"&&Math.abs(l.hinge.y-e.y)<.75&&Math.hypot(l.hinge.x-e.x,l.hinge.z-e.z)<16&&Math.hypot(l.hinge.x-e.x,l.hinge.z-e.z)>4);if(a.length){let l=Li(a);l.open||(l.open=!0,l.target=1,this.audio.doorOpen(),this._sub("\u95E8\u2026\u2026\u81EA\u5DF1\u5F00\u4E86\u3002","\u6249\u304C\u2026\u4E00\u4EBA\u3067\u958B\u3044\u305F\u3002",3),this._setFear(this.fear+.05))}else this.audio.woodenCreak()}else if(t<.36)this.audio.duck(),this.lightsOutTimer=2.6;else if(t<.44)s?(this.audio.ceilingSteps(),this._sub("\u697C\u4E0A\u2026\u2026\u6709\u811A\u6B65\u58F0\u3002","\u4E0A\u306E\u968E\u3067\u2026\u8DB3\u97F3\u304C\u3002",3)):(this.audio.knock(2),this._sub("\u5899\u58C1\u7684\u53E6\u4E00\u4FA7\uFF0C\u6709\u4EBA\u5728\u6572\u3002","\u58C1\u306E\u5411\u3053\u3046\u3067\u3001\u8AB0\u304B\u304C\u53E9\u3044\u3066\u3044\u308B\u3002",3));else if(t<.52)this.audio.knock(3),this._sub("\u6709\u4EBA\u5728\u6572\u95E8\u2026\u2026","\u30C9\u30A2\u3092\u3001\u53E9\u304F\u97F3\u304C\u2026",3);else if(t<.58&&n)this.audio.runStep(),setTimeout(()=>this.audio.runStep(),260),setTimeout(()=>this.audio.runStep(),520),this._sub("\u8EAB\u540E\u2026\u2026\uFF1F","\u5F8C\u308D\u306B\u2026\uFF1F",2.4);else if(t<.66)this.audio.cry(dt(-.6,.6)),this._sub("\u2026\u2026\u6709\u5B69\u5B50\u5728\u54ED\u3002","\u2026\u2026\u5B50\u4F9B\u306E\u6CE3\u304D\u58F0\u304C\u3002",3);else if(t<.69)this.audio.childGiggle(dt(-.6,.6)),this._setFear(this.fear+.05);else if(t<.75)this.audio.breath(dt(-.6,.6),dt(2.4,3.6));else if(t<.81){let a=this.level.props.tv;a.on||(a.on=!0,this.audio.setTV(!0))}else if(t<.84)this.audio.radio(),this._sub("\u6536\u97F3\u673A\u2026\u2026\u81EA\u5DF1\u54CD\u4E86\u3002","\u30E9\u30B8\u30AA\u304C\u3001\u52DD\u624B\u306B\u9CF4\u3063\u305F\u3002",3);else if(t<.9&&this.phoneArmed&&!this.phoneRinging)this._phoneRings();else if(t<.96&&this.campaign.flags.power&&this.monster.state==="dormant"&&!this.finale)this.monster.spawn(new L(0,0,55.5),"stalk"),this.monster.tempLife=3,this.audio.moan(0),this._setFear(this.fear+.15);else{let a=Math.random();if(a<.18)this.audio.siren(dt(-.5,.5)),this._sub("\u96E8\u58F0\u6DF1\u5904\uFF0C\u6709\u8B66\u7B1B\u5728\u54CD\u3002","\u96E8\u97F3\u306E\u5965\u3067\u3001\u30B5\u30A4\u30EC\u30F3\u304C\u9CF4\u3063\u3066\u3044\u308B\u3002",3.4);else if(a<.38)this.audio.hammer(dt(-.5,.5)),this._sub("\u5899\u91CC\u7684\u6C34\u7BA1\uFF0C\u549A\u3001\u549A\u5730\u54CD\u3002","\u58C1\u306E\u914D\u7BA1\u304C\u3001\u30C9\u30F3\u3001\u30C9\u30F3\u3068\u9CF4\u308B\u3002",3);else if(a<.52&&e.x<-13.8&&e.z>14.8)this.audio.washer(-.6),this.shake=Math.max(this.shake,.12),this._sub("\u6D17\u8863\u673A\u2026\u2026\u81EA\u5DF1\u5728\u8F6C\u3002","\u6D17\u6FEF\u6A5F\u304C\u2026\u52DD\u624B\u306B\u56DE\u3063\u3066\u3044\u308B\u3002",3.4),this._setFear(this.fear+.06);else{if(this.audio.woodenCreak(),Pi(.5)){let l=Li(this.level.ghostSpawns);Math.hypot(l.x-e.x,l.z-e.z)>4.5&&this.ghost.appearAt(l.x,(o=l.y)!=null?o:0,l.z,l.ry)}Pi(.4)&&this.audio.scrape()}}if(Pi(.18)){let a=this.level.props.silhouette;a.visible=!0,this.audio.moan(0),setTimeout(()=>{a.visible=!1},2600)}}_loop(){var u,d,f;if(requestAnimationFrame(this._loop),!this.initOK)return;let t=performance.now(),e=this.lastT?(t-this.lastT)/1e3:.016,n=Math.min(.05,e);this.lastT=t,this.time+=n,this.investigation.update(n);let s=this.state==="playing"&&!this.noteOpen&&_t("pause").classList.contains("hidden");if(s){this.campaign.elapsed+=n;for(let y of this.storyEvents)y.delay-=n;let m=this.storyEvents.filter(y=>y.delay<=0);this.storyEvents=this.storyEvents.filter(y=>y.delay>0);for(let y of m)y.action();this.chapterTimer>0&&(this.chapterTimer-=n)<=0&&_t("chapter-card").classList.add("hidden"),this.saveNotice>0&&(this.saveNotice-=n)<=0&&(_t("save-status").textContent=""),_t("location-label").textContent=_s(this.playerPos)}if(this.state==="title"&&(this.camera.position.set(-22,2.8+Ms,37.8),this.camera.rotation.set(-.025,.26+Math.sin(this.time*.055)*.055,0)),document.hidden||this._autoResolution(e),s||this.state==="scared"){let m=this.state==="scared";!m&&!this.hiding&&this._updatePlayer(n),this._updateInteractPrompt(),m||(this.atmosphere.update(n),this._updateDirector(n),this._updateBattery(n))}this.skyMaterial.uniforms.uTime.value=this.time;let r=this._doorBodies||(this._doorBodies=[]);if(r.length=0,r.push(this.playerPos),["stalk","chase","search","attack"].includes(this.monster.state)&&r.push(this.monster.pos),this.level.update(n,this.time,this.camera.position,this.camera.getWorldDirection(this._viewDir||(this._viewDir=new L)),this.reduceEffects,r),this.level.campaign.rain){let m=this.level.campaign.rain.geometry.attributes.position.array;for(let y=0;y<m.length;y+=6)m[y+1]-=n*5,m[y+4]-=n*5,m[y+1]<(y>=540?5.9:2.9)&&(m[y+1]+=9,m[y+4]+=9);this.level.campaign.rain.geometry.attributes.position.needsUpdate=!0}let o=this.level.props.tv;if(o.screen.visible=o.on,o.on?(mu(this.level.tex.tvStatic),this.level.tvLight.intensity=1.4+Math.sin(this.time*23)*.5+dt(-.2,.2),this.tvFaceTimer=((u=this.tvFaceTimer)!=null?u:dt(30,50))-n,this.tvFaceTimer<=0&&(this.tvFaceTimer=dt(35,60),this.level.props.tvFace.visible=!0,this.audio._noise({dur:.5,type:"bandpass",freq:2200,q:6,gain:.06}),Math.hypot(this.playerPos.x- -6.5,this.playerPos.z-15.25)<9&&(this._sub("\u7535\u89C6\u91CC\u2026\u2026\u6709\u4E00\u5F20\u8138\u3002","\u30C6\u30EC\u30D3\u306E\u4E2D\u306B\u2026\u9854\u304C\u3002",2.6),this._setFear(this.fear+.08)),setTimeout(()=>{this.level.props.tvFace.visible=!1},750))):(this.level.tvLight.intensity=0,o.timer>0&&this.state==="playing"&&(o.timer-=n,o.timer<=0&&(o.on=!0,this.audio.setTV(!0),this.audio._noise({dur:.4,type:"bandpass",freq:1200,q:2,gain:.07}),this._sub("\u7535\u89C6\u53C8\u81EA\u5DF1\u5F00\u4E86\u3002","\u30C6\u30EC\u30D3\u304C\u3001\u307E\u305F\u52DD\u624B\u306B\u70B9\u3044\u305F\u3002",3)))),this.blackout)for(let m of this.level.fluorescents)m.kill=!0;else if(this.lightsOutTimer>0){this.lightsOutTimer-=n;for(let m of this.level.fluorescents)m.kill=!0;if(this.lightsOutTimer<=0)for(let m of this.level.fluorescents)m.kill=!1}if(this.upperFlicker>0){this.upperFlicker-=n;for(let m of this.level.fluorescents)if(m.z>2&&m.z<62&&m.light.position.y>4){let y=Math.sin(this.time*50)>0;m.light.intensity=y?m.base:.05,m.tube&&(m.tube.material=y?this.level.tubeMat:this.level.tubeOffMat)}}let a=this.level.props.cabinet;a.openedOnce&&(a.angle=an(a.angle,1.35,n*2.2),a.pivot.rotation.y=a.angle);let l=this.level.props.doll;if(l.turned&&l.targetYaw!==void 0){let m=l.targetYaw-l.mesh.rotation.y;if(m=Math.atan2(Math.sin(m),Math.cos(m)),l.mesh.rotation.y+=m*Math.min(1,n*1.1),this.dollTimer=((d=this.dollTimer)!=null?d:dt(14,22))-n,this.dollTimer<=0){this.dollTimer=dt(16,26);let y=this.level.dollSpots||[],p=l.mesh.position,g=y.filter(_=>Math.hypot(_.x-this.playerPos.x,_.z-this.playerPos.z)>4&&(Math.abs(_.x-p.x)>.5||Math.abs(_.z-p.z)>.5));if(g.length){let _=p.x-this.playerPos.x,x=p.z-this.playerPos.z,b=Math.hypot(_,x)||1,T=new L;if(this.camera.getWorldDirection(T),T.x*(_/b)+T.z*(x/b)<.5){let E=Li(g);l.mesh.position.set(E.x,0,E.z),l.mesh.rotation.y=E.ry,l.targetYaw=E.ry,this.audio.musicBox(),Math.hypot(E.x-this.playerPos.x,E.z-this.playerPos.z)<8&&this._sub("\u4EBA\u5076\u2026\u2026\u4E0D\u5728\u539F\u6765\u7684\u4F4D\u7F6E\u4E86\u3002","\u4EBA\u5F62\u304C\u2026\u5143\u306E\u5834\u6240\u306B\u3044\u306A\u3044\u3002",3)}}}}if((s||this.state==="scared")&&this._updateMonster(n),s&&this.ghost.update(n,this.playerPos),s&&(this._setFear(Math.max(.12,this.fear-n*.02)),this.monster.state==="chase"&&this._setFear(Math.min(1,this.fear+n*.12)),this.monster.state==="stalk")){let m=Math.hypot(this.monster.pos.x-this.playerPos.x,this.monster.pos.z-this.playerPos.z);m<14&&this._setFear(Math.min(.8,this.fear+n*(.1*(1-m/14))))}this.shake>0&&!this.reduceEffects&&(this.shake=Math.max(0,this.shake-n*1.6),this.camera.position.x+=dt(-.03,.03)*this.shake,this.camera.position.y+=dt(-.02,.02)*this.shake);let c=this.reduceEffects?75:75+this.fear*7+(this.state==="scared"?10:0);Math.abs(this.camera.fov-c)>.1&&(this.camera.fov=an(this.camera.fov,c,n*4),this.camera.updateProjectionMatrix()),this.grade.uniforms.uTime.value=this.time,this.grade.uniforms.uFear.value=this.reduceEffects?0:this.fear,this.grade.uniforms.uDistort.value=this.reduceEffects?0:this.state==="scared"?Math.min(1,this.scaredTimer):this.shake,this.coneMat.uniforms.uTime.value=this.time,this.torchModel.visible=this.state==="playing"&&!this.hiding,this._updateDust(n),this.audio.setHum(this.level.humLevel(this.camera.position)),s&&this.audio.updateMusic(n,this.fear,this.monster.state==="chase"||this.monster.state==="attack"),this.audio.setWind(ne(.3+(this.playerPos.y>2.5?.2:0)+(this.playerPos.z<2.2||this.playerPos.z>56?.3:0),0,1)),this.audio.setRain(ne(.3+(this.playerPos.y>2.5?.25:0)+(this.playerPos.z<2.2||this.playerPos.z>56?.35:0),0,1));let h=this.level.props.furin;h&&this.state==="playing"&&(Math.hypot(this.camera.position.x-h.position.x,this.camera.position.z-h.position.z)<7?(this.furinT=((f=this.furinT)!=null?f:dt(4,9))-n,this.furinT<=0&&(this.furinT=dt(6,16),this.audio.chime(ne((h.position.x-this.camera.position.x)/7,-1,1)))):this.furinT=dt(3,8)),this._updateLightning(n),this.nopost?this.renderer.render(this.scene,this.camera):this.composer.render(),this._plc=(this._plc||0)+1,this.posLog&&this._plc%30===0&&(document.title=`POS:z=${this.playerPos.z.toFixed(1)},y=${this.playerPos.y.toFixed(2)} flash=${this.flash.intensity.toFixed(1)}`)}_updatePlayer(t){var b,T;let e=this.keys,n=0,s=0,r;if(this.touchMode){n=this.touchMove.x,s=-this.touchMove.y,r=this.touchRun;let E=Math.hypot(n,s);E>1&&(n/=E,s/=E)}else{(e.KeyW||e.ArrowUp)&&(s+=1),(e.KeyS||e.ArrowDown)&&(s-=1),(e.KeyA||e.ArrowLeft)&&(n-=1),(e.KeyD||e.ArrowRight)&&(n+=1),r=e.ShiftLeft||e.ShiftRight;let E=Math.hypot(n,s)||1;n/=E,s/=E}let o=r?3.9:2.7;if(this.tpZ!==void 0){if(!this._tpDone){this._tpDone=!0;let E=(b=this.tpX)!=null?b:0,M=-10,I=1/0,w=this.level.colliders;for(let R of w)R.x0<E+.3&&R.x1>E-.3&&R.z0<this.tpZ+.3&&R.z1>this.tpZ-.3&&R.y1<6&&R.y1>M&&(M=R.y1);M<-5&&(M=0);for(let R of w)R.x0<E+.3&&R.x1>E-.3&&R.z0<this.tpZ+.3&&R.z1>this.tpZ-.3&&R.y0>M+1.5&&R.y0<I&&(I=R.y0);let S;this.tpY!==void 0?S=this.tpY:S=Math.min(M+.45,I===1/0?M+2.2:I-sr-.05),this.playerPos.set(E,S,this.tpZ),this.char.x0=E-zn,this.char.x1=E+zn,this.char.z0=this.tpZ-zn,this.char.z1=this.tpZ+zn,this.char.y0=S,this.char.y1=S+sr,this.eyeY=S,this.vy=0,this.camera.position.set(E,S+Ms,this.tpZ)}n=0,s=0,this.tpYaw!==void 0?this.camera.rotation.y=this.tpYaw*Math.PI/180:this.camera.rotation.y=this.tpFace==="s"?Math.PI+1.57:Math.PI-1.57,this.camera.rotation.x=0}let a=this.camera.rotation.y,l=Math.sin(a),c=Math.cos(a),h=(-l*s+c*n)*o*t,u=(-c*s-l*n)*o*t;this.char.x0=this.playerPos.x-zn,this.char.x1=this.playerPos.x+zn,this.char.z0=this.playerPos.z-zn,this.char.z1=this.playerPos.z+zn,this.char.y0=this.playerPos.y,this.char.y1=this.playerPos.y+sr;let d=this.playerPos.x,f=this.playerPos.z,m=this._dynColliders();this.vy-=22*t;let y=Co(this.char,h,this.vy*t,u,m,.35);this.grounded=y.grounded,y.grounded&&(this.vy=0),this.playerPos.x=(this.char.x0+this.char.x1)/2,this.playerPos.z=(this.char.z0+this.char.z1)/2,this.playerPos.y=this.char.y0;let p=this.traversal.update(this.char,this.grounded,m,t);if(p){this._wakeAtCheckpoint(p),this._sub("\u811A\u4E0B\u7684\u5730\u9762\u5931\u53BB\u652F\u6491\u3002\u4F60\u9000\u56DE\u4E86\u521A\u624D\u7AD9\u7A33\u7684\u4F4D\u7F6E\u3002","",3);return}let g=Math.hypot(this.playerPos.x-d,this.playerPos.z-f)/t;if(this.playerNoiseRadius=this.grounded&&g>.4?r?12:4:0,this.grounded&&g>.4){this.bobPhase+=g/2.7*t*8.5;let E=Math.sin(this.bobPhase);if(this.lastBobSin>0&&E<=0){let M=this._floorSurface();r?this.audio.runStep(M):this.audio.footstep(M)}this.lastBobSin=E,this.bob=Math.abs(E)*.03*Math.min(1,g/2.7)}else this.bob=an(this.bob||0,0,t*8),this.lastBobSin=0;this.eyeY=an(this.eyeY||0,this.playerPos.y,Math.min(1,t*16)),this.camera.position.set(this.playerPos.x,this.eyeY+Ms+(this.reduceEffects?0:this.bob),this.playerPos.z),this.camera.rotation.z=this.reduceEffects?0:Math.sin(this.time*.4)*.0016+this.fear*Math.sin(this.time*1.7)*.005+(r?.012*Math.sin(this.bobPhase):0),this.camera.rotation.order="YXZ",this.camera.getWorldDirection(this._tmpDir),this.flashTarget.position.copy(this.camera.position).addScaledVector(this._tmpDir,12),this._tmpDir2=this._tmpDir2||new L,this.camera.getWorldDirection(this._tmpDir2),this.flash.position.copy(this.camera.position).addScaledVector(this._tmpDir2,.12),this.flash.position.y-=.06;let _=0;if(this.flashOn){let E=this.camera.position,M=2.2;for(let R of this.colliders){if(R.y1<E.y-.8||R.y0>E.y+.8)continue;let U=ne(E.x,R.x0,R.x1),B=ne(E.z,R.z0,R.z1),D=ne(E.y,R.y0,R.y1),O=Math.hypot(E.x-U,E.y-D,E.z-B);O<M&&(M=O)}_=6.5*ne((M-.3)/1.4,.15,1)*((T=this._flashMul)!=null?T:1);let w=this.monster.state==="stalk"||this.monster.state==="chase",S=Math.hypot(this.monster.pos.x-this.playerPos.x,this.monster.pos.z-this.playerPos.z);w&&S<5&&!this.reduceEffects&&(_=_*(.55+.45*Math.sin(this.time*41+S*9)))}this.flash.intensity=_,this.coneMat.uniforms.uFade.value=this.flashOn?1:0;let x=this._trigV||(this._trigV=new L);x.set(this.playerPos.x,this.playerPos.y+.2,this.playerPos.z),this.level.checkTriggers(x)}_dynColliders(){let t=this._dynArr||(this._dynArr=[]);t.length=0;let e=this.level.colliders;for(let s=0;s<e.length;s++)t.push(e[s]);let n=this.level.doors;for(let s=0;s<n.length;s++)n[s].collider&&t.push(n[s].collider);return t}_floorSurface(){let t=this.playerPos;if(t.y<-.8||t.y>4.8||t.z>61.6)return"concrete";if(t.y>2&&t.x<-1){let e=_s(t);return["\u897F\u7FFC\u5C01\u95ED\u8D70\u5ECA","\u7EA2\u706F\u6697\u623F"].includes(e)?"concrete":"wood"}return t.y<1.5&&t.x>7&&t.z>=32&&t.z<46?"concrete":t.y<1.5&&t.x>1.3&&t.x<8.4&&t.z>0&&t.z<8.5?"tatami":t.z<0||t.z>57.5&&t.y<2.7||t.y<1.5&&t.x<-13.8&&t.z>13.8?"concrete":"wood"}_updateInteractPrompt(){if(this.noteOpen||this.hiding){this._prompt(null);return}let t=this._raycastTarget();this._prompt(t?t.interactable.label:null),this.touchMode&&_t("btn-interact").classList.toggle("avail",!!t)}_updateDirector(t){this.atmosphere.cooldown>0||(this.eventTimer-=t,this.eventTimer<=0&&(this.eventTimer=dt(21,42),this._randomEvent()))}_updateMonster(t){if(this.hiding){this.hideTimer+=t,this.hideTimer>5&&!["dormant","gone"].includes(this.monster.state)&&(this.monster.despawn(),this.onPursuitLost(),this._hbOn&&(this._hbOn=!1,this.audio.heartbeat(!1)));return}let e=this.playerPos,n=this._mDir||(this._mDir=new L);this.camera.getWorldDirection(n),n.y=0,n.normalize();let s=this._mTo||(this._mTo=new L);s.set(this.monster.pos.x-e.x,0,this.monster.pos.z-e.z);let r=s.length(),o=this.flashOn&&r>.01&&r<22&&Math.abs(this.monster.pos.y-e.y)<1&&n.dot(s.normalize())>.94&&!Kn(this.camera.position,this.monster.pos.clone().add(new L(0,1.2,0)),this.level.colliders,this.level.doors),a=this._mPl||(this._mPl=new L);a.set(e.x,e.y,e.z),this.monster.update(t,{player:a,lookDir:n,flashHit:o,noiseRadius:this.playerNoiseRadius||0,time:this.time,colliders:this._dynColliders(),stairs:this.level.stairs,reduceEffects:this.reduceEffects,doors:this.level.doors,nodes:this.level.monsterNodes,audio:this.audio,game:this}),this._hbOn&&this.monster.state!=="chase"&&(this._hbOn=!1,this.audio.heartbeat(!1))}_updateLightning(t){if(this.reduceEffects)return;let e=this.lightning,n=this.level.materials.moonWin;if(e.t>0){e.t-=t,Math.random()<.35&&(this.shake=Math.max(this.shake,.08));let s=1-e.t/e.dur,o=(s<.15||s>.45&&s<.55?1:.25)*(.5+Math.random()*.5);this.hemi.intensity=this.hemiBase+o*1.7;for(let a of this.level.windowLights)a.intensity=.8+o*5;if(n.color.setScalar(1+o*1.5),e.t<=0){this.hemi.intensity=this.hemiBase;for(let a of this.level.windowLights)a.intensity=.8;n.color.setScalar(1)}return}e.next-=t,e.next<=0&&(e.next=dt(45,100),e.dur=dt(.45,.9),e.t=e.dur,e.dist=dt(.3,.95),setTimeout(()=>{(this.state==="playing"||this.state==="scared")&&(this.audio.thunder(e.dist),Pi(.35)&&this._sub("\u6253\u96F7\u4E86\u3002","\u96F7\u304C\u3001\u9CF4\u3063\u305F\u3002",2.2))},400+e.dist*3e3))}_updateDust(t){let e=this.dustPos,n=this.camera.position.x,s=this.camera.position.z,r=this.camera.position.y;for(let o=0;o<e.length;o+=3){e[o+1]+=t*dt(.02,.07),e[o+1]>4&&(e[o+1]=0),e[o]+=Math.sin(this.time*.6+o)*t*.08,e[o+2]+=Math.cos(this.time*.5+o)*t*.08,e[o]-n>11?e[o]=n-11:e[o]-n<-11&&(e[o]=n+11),e[o+2]-s>11?e[o+2]=s-11:e[o+2]-s<-11&&(e[o+2]=s+11);let a=e[o]-n,l=e[o+2]-s,c=e[o+1]-r;a*a+c*c+l*l<1.69&&(e[o]=n+dt(-11,11),e[o+1]=dt(.2,3.8),e[o+2]=s+dt(-11,11))}this.dust.geometry.attributes.position.needsUpdate=!0,this.dust.position.set(n,0,s)}};_t("error-retry").addEventListener("click",()=>location.reload());try{window.__game=new Gl,new URLSearchParams(location.search).has("autostart")&&setTimeout(()=>window.__game._start(),400),new URLSearchParams(location.search).has("pos")&&(window.__game.posLog=!0);let i=new URLSearchParams(location.search);i.has("tp")&&(window.__game.tpZ=parseFloat(i.get("tp"))||0,window.__game.tpFace=i.get("face")==="s"?"s":"n"),i.has("tpx")&&(window.__game.tpX=parseFloat(i.get("tpx"))||0),i.has("tpy")&&(window.__game.tpY=parseFloat(i.get("tpy"))),i.has("yaw")&&(window.__game.tpYaw=parseFloat(i.get("yaw"))),i.has("noflash")&&(window.__game.flashOn=!1)}catch(i){console.error(i)}})();
/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */

  window.addEventListener('error', (e) => {
    document.title = 'JSERR:' + (e.message || 'unknown') + ' @' + (e.filename || '').split('/').pop() + ':' + e.lineno;
  });

  // ---- sensitivity slider (pause screen) ----
  (function () {
    const slider = document.getElementById('sens');
    const val = document.getElementById('sensval');
    if (!slider || !val) return;
    let v = 14;
    try { const p = parseFloat(localStorage.getItem('echo_sens')); if (p > 0) v = Math.round(p * 1000); } catch (e) {}
    v = Math.min(40, Math.max(4, v));
    slider.value = v; val.textContent = v;
    const apply = () => {
      val.textContent = slider.value;
      if (window.__game && window.__game.setSensitivity) window.__game.setSensitivity(slider.value / 1000);
    };
    slider.addEventListener('input', apply);
    // slider drags must not bubble up to #pause's click-to-relock
    const box = document.getElementById('sensbox');
    for (const ev of ['mousedown', 'mouseup', 'click', 'touchstart', 'touchmove', 'touchend']) {
      slider.addEventListener(ev, (e) => e.stopPropagation());
      if (box) box.addEventListener(ev, (e) => e.stopPropagation());
    }
  })();

/* 游戏主体已初始化（body.touch 就位），重新评估伪横屏 */
if (typeof window.__reapplyRotate === 'function') window.__reapplyRotate();
