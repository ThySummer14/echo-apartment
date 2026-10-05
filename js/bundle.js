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

(()=>{var pu=0,Il=1,mu=2;var gh=1,gu=2,Di=3,Ni=0,qe=1,ae=2;var Ei=0,Yn=1,As=2,Dl=3,Ul=4,xu=5,hn=100,_u=101,yu=102,zl=103,Nl=104,vu=200,bu=201,Mu=202,Eu=203,ga=204,xa=205,wu=206,Su=207,Tu=208,Au=209,Ru=210,Cu=211,Pu=212,Lu=213,Iu=214,Du=0,Uu=1,zu=2,Tr=3,Nu=4,ku=5,Fu=6,Ou=7,xh=0,Bu=1,Hu=2,Ji=0,Gu=1,Vu=2,Wu=3,rl=4,Xu=5,qu=6;var _h=300,Kn=301,$n=302,_a=303,ya=304,co=306,wi=1e3,gi=1001,va=1002,Ne=1003,kl=1004;var Do=1005;var Qe=1006,Yu=1007;var _i=1008;var Ki=1009,Zu=1010,Ju=1011,ol=1012,yh=1013,Yi=1014,Zi=1015,mn=1016,vh=1017,bh=1018,dn=1020,Ku=1021,xi=1023,$u=1024,ju=1025,fn=1026,jn=1027,Qu=1028,Mh=1029,td=1030,Eh=1031,wh=1033,Uo=33776,zo=33777,No=33778,ko=33779,Fl=35840,Ol=35841,Bl=35842,Hl=35843,Sh=36196,Gl=37492,Vl=37496,Wl=37808,Xl=37809,ql=37810,Yl=37811,Zl=37812,Jl=37813,Kl=37814,$l=37815,jl=37816,Ql=37817,tc=37818,ec=37819,ic=37820,nc=37821,Fo=36492,sc=36494,rc=36495,ed=36283,oc=36284,ac=36285,lc=36286;var Ar=2300,Rr=2301,Oo=2302,cc=2400,hc=2401,uc=2402;var Th=3e3,pn=3001,id=3200,nd=3201,Ah=0,sd=1,ke="",pe="srgb",ki="srgb-linear",al="display-p3",ho="display-p3-linear",Cr="linear",fe="srgb",Pr="rec709",Lr="p3";var Tn=7680;var dc=519,rd=512,od=513,ad=514,Rh=515,ld=516,cd=517,hd=518,ud=519,fc=35044;var pc="300 es",ba=1035,zi=2e3,Ir=2001,Si=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let i=this._listeners[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},Ve=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Bo=Math.PI/180,Dr=180/Math.PI;function rs(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ve[n&255]+Ve[n>>8&255]+Ve[n>>16&255]+Ve[n>>24&255]+"-"+Ve[t&255]+Ve[t>>8&255]+"-"+Ve[t>>16&15|64]+Ve[t>>24&255]+"-"+Ve[e&63|128]+Ve[e>>8&255]+"-"+Ve[e>>16&255]+Ve[e>>24&255]+Ve[i&255]+Ve[i>>8&255]+Ve[i>>16&255]+Ve[i>>24&255]).toLowerCase()}function Xe(n,t,e){return Math.max(t,Math.min(e,n))}function dd(n,t){return(n%t+t)%t}function Ho(n,t,e){return(1-e)*n+e*t}function mc(n){return(n&n-1)===0&&n!==0}function Ma(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function ps(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function je(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var _t=class n{constructor(t=0,e=0){n.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Xe(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},$t=class n{constructor(t,e,i,s,r,a,o,l,c){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c)}set(t,e,i,s,r,a,o,l,c){let u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=e,u[4]=r,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],d=i[7],h=i[2],f=i[5],g=i[8],_=s[0],p=s[3],m=s[6],y=s[1],x=s[4],v=s[7],S=s[2],M=s[5],b=s[8];return r[0]=a*_+o*y+l*S,r[3]=a*p+o*x+l*M,r[6]=a*m+o*v+l*b,r[1]=c*_+u*y+d*S,r[4]=c*p+u*x+d*M,r[7]=c*m+u*v+d*b,r[2]=h*_+f*y+g*S,r[5]=h*p+f*x+g*M,r[8]=h*m+f*v+g*b,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8];return e*a*u-e*o*c-i*r*u+i*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],d=u*a-o*c,h=o*l-u*r,f=c*r-a*l,g=e*d+i*h+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return t[0]=d*_,t[1]=(s*c-u*i)*_,t[2]=(o*i-s*a)*_,t[3]=h*_,t[4]=(u*e-s*l)*_,t[5]=(s*r-o*e)*_,t[6]=f*_,t[7]=(i*l-c*e)*_,t[8]=(a*e-i*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Go.makeScale(t,e)),this}rotate(t){return this.premultiply(Go.makeRotation(-t)),this}translate(t,e){return this.premultiply(Go.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Go=new $t;function Ch(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Ur(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function fd(){let n=Ur("canvas");return n.style.display="block",n}var gc={};function Ms(n){n in gc||(gc[n]=!0,console.warn(n))}var xc=new $t().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),_c=new $t().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ks={[ki]:{transfer:Cr,primaries:Pr,toReference:n=>n,fromReference:n=>n},[pe]:{transfer:fe,primaries:Pr,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[ho]:{transfer:Cr,primaries:Lr,toReference:n=>n.applyMatrix3(_c),fromReference:n=>n.applyMatrix3(xc)},[al]:{transfer:fe,primaries:Lr,toReference:n=>n.convertSRGBToLinear().applyMatrix3(_c),fromReference:n=>n.applyMatrix3(xc).convertLinearToSRGB()}},pd=new Set([ki,ho]),le={enabled:!0,_workingColorSpace:ki,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!pd.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,t,e){if(this.enabled===!1||t===e||!t||!e)return n;let i=Ks[t].toReference,s=Ks[e].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,t){return this.convert(n,this._workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this._workingColorSpace)},getPrimaries:function(n){return Ks[n].primaries},getTransfer:function(n){return n===ke?Cr:Ks[n].transfer}};function Zn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Vo(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var An,zr=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{An===void 0&&(An=Ur("canvas")),An.width=t.width,An.height=t.height;let i=An.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=An}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let e=Ur("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Zn(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Zn(e[i]/255)*255):e[i]=Zn(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},md=0,Nr=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:md++}),this.uuid=rs(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Wo(s[a].image)):r.push(Wo(s[a]))}else r=Wo(s);i.url=r}return e||(t.images[this.uuid]=i),i}};function Wo(n){return typeof HTMLImageElement!="undefined"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&n instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&n instanceof ImageBitmap?zr.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var gd=0,ci=class n extends Si{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=gi,s=gi,r=Qe,a=_i,o=xi,l=Ki,c=n.DEFAULT_ANISOTROPY,u=ke){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:gd++}),this.uuid=rs(),this.name="",this.source=new Nr(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new _t(0,0),this.repeat=new _t(1,1),this.center=new _t(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $t,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(Ms("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===pn?pe:ke),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==_h)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case wi:t.x=t.x-Math.floor(t.x);break;case gi:t.x=t.x<0?0:1;break;case va:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case wi:t.y=t.y-Math.floor(t.y);break;case gi:t.y=t.y<0?0:1;break;case va:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Ms("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===pe?pn:Th}set encoding(t){Ms("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===pn?pe:ke}};ci.DEFAULT_IMAGE=null;ci.DEFAULT_MAPPING=_h;ci.DEFAULT_ANISOTROPY=1;var _e=class n{constructor(t=0,e=0,i=0,s=1){n.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,l=t.elements,c=l[0],u=l[4],d=l[8],h=l[1],f=l[5],g=l[9],_=l[2],p=l[6],m=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let x=(c+1)/2,v=(f+1)/2,S=(m+1)/2,M=(u+h)/4,b=(d+_)/4,U=(g+p)/4;return x>v&&x>S?x<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(x),s=M/i,r=b/i):v>S?v<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),i=M/s,r=U/s):S<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(S),i=b/r,s=U/r),this.set(i,s,r,e),this}let y=Math.sqrt((p-g)*(p-g)+(d-_)*(d-_)+(h-u)*(h-u));return Math.abs(y)<.001&&(y=1),this.x=(p-g)/y,this.y=(d-_)/y,this.z=(h-u)/y,this.w=Math.acos((c+f+m-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ea=class extends Si{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new _e(0,0,t,e),this.scissorTest=!1,this.viewport=new _e(0,0,t,e);let s={width:t,height:e,depth:1};i.encoding!==void 0&&(Ms("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===pn?pe:ke),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qe,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new ci(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(t,e,i=1){(this.width!==t||this.height!==e||this.depth!==i)&&(this.width=t,this.height=e,this.depth=i,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new Nr(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},yi=class extends Ea{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},kr=class extends ci{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ne,this.minFilter=Ne,this.wrapR=gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var wa=class extends ci{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Ne,this.minFilter=Ne,this.wrapR=gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var $i=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let l=i[s+0],c=i[s+1],u=i[s+2],d=i[s+3],h=r[a+0],f=r[a+1],g=r[a+2],_=r[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=d;return}if(o===1){t[e+0]=h,t[e+1]=f,t[e+2]=g,t[e+3]=_;return}if(d!==_||l!==h||c!==f||u!==g){let p=1-o,m=l*h+c*f+u*g+d*_,y=m>=0?1:-1,x=1-m*m;if(x>Number.EPSILON){let S=Math.sqrt(x),M=Math.atan2(S,m*y);p=Math.sin(p*M)/S,o=Math.sin(o*M)/S}let v=o*y;if(l=l*p+h*v,c=c*p+f*v,u=u*p+g*v,d=d*p+_*v,p===1-o){let S=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=S,c*=S,u*=S,d*=S}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=d}static multiplyQuaternionsFlat(t,e,i,s,r,a){let o=i[s],l=i[s+1],c=i[s+2],u=i[s+3],d=r[a],h=r[a+1],f=r[a+2],g=r[a+3];return t[e]=o*g+u*d+l*f-c*h,t[e+1]=l*g+u*h+c*d-o*f,t[e+2]=c*g+u*f+o*h-l*d,t[e+3]=u*g-o*d-l*h-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(s/2),d=o(r/2),h=l(i/2),f=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=h*u*d+c*f*g,this._y=c*f*d-h*u*g,this._z=c*u*g+h*f*d,this._w=c*u*d-h*f*g;break;case"YXZ":this._x=h*u*d+c*f*g,this._y=c*f*d-h*u*g,this._z=c*u*g-h*f*d,this._w=c*u*d+h*f*g;break;case"ZXY":this._x=h*u*d-c*f*g,this._y=c*f*d+h*u*g,this._z=c*u*g+h*f*d,this._w=c*u*d-h*f*g;break;case"ZYX":this._x=h*u*d-c*f*g,this._y=c*f*d+h*u*g,this._z=c*u*g-h*f*d,this._w=c*u*d+h*f*g;break;case"YZX":this._x=h*u*d+c*f*g,this._y=c*f*d+h*u*g,this._z=c*u*g-h*f*d,this._w=c*u*d-h*f*g;break;case"XZY":this._x=h*u*d-c*f*g,this._y=c*f*d-h*u*g,this._z=c*u*g+h*f*d,this._w=c*u*d+h*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],u=e[6],d=e[10],h=i+o+d;if(h>0){let f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(i>o&&i>d){let f=2*Math.sqrt(1+i-o-d);this._w=(u-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>d){let f=2*Math.sqrt(1+o-i-d);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+u)/f}else{let f=2*Math.sqrt(1+d-i-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Xe(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-i*c,this._z=r*u+a*c+i*l-s*o,this._w=a*u-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let i=this._x,s=this._y,r=this._z,a=this._w,o=a*t._w+i*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=i,this._y=s,this._z=r,this;let l=1-o*o;if(l<=Number.EPSILON){let f=1-e;return this._w=f*a+e*this._w,this._x=f*i+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,o),d=Math.sin((1-e)*u)/c,h=Math.sin(e*u)/c;return this._w=a*d+this._w*h,this._x=i*d+this._x*h,this._y=s*d+this._y*h,this._z=r*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=Math.random(),e=Math.sqrt(1-t),i=Math.sqrt(t),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(e*Math.cos(s),i*Math.sin(r),i*Math.cos(r),e*Math.sin(s))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},I=class n{constructor(t=0,e=0,i=0){n.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(yc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(yc.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*i),u=2*(o*e-r*s),d=2*(r*i-a*e);return this.x=e+l*c+a*d-o*u,this.y=i+l*u+o*c-r*d,this.z=s+l*d+r*u-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Xo.copy(this).projectOnVector(t),this.sub(Xo)}reflect(t){return this.sub(Xo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Xe(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,i=Math.sqrt(1-t**2);return this.x=i*Math.cos(e),this.y=i*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Xo=new I,yc=new $i,ri=class{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(fi.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(fi.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=fi.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,fi):fi.fromBufferAttribute(r,a),fi.applyMatrix4(t.matrixWorld),this.expandByPoint(fi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),$s.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),$s.copy(i.boundingBox)),$s.applyMatrix4(t.matrixWorld),this.union($s)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,fi),fi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ms),js.subVectors(this.max,ms),Rn.subVectors(t.a,ms),Cn.subVectors(t.b,ms),Pn.subVectors(t.c,ms),Gi.subVectors(Cn,Rn),Vi.subVectors(Pn,Cn),rn.subVectors(Rn,Pn);let e=[0,-Gi.z,Gi.y,0,-Vi.z,Vi.y,0,-rn.z,rn.y,Gi.z,0,-Gi.x,Vi.z,0,-Vi.x,rn.z,0,-rn.x,-Gi.y,Gi.x,0,-Vi.y,Vi.x,0,-rn.y,rn.x,0];return!qo(e,Rn,Cn,Pn,js)||(e=[1,0,0,0,1,0,0,0,1],!qo(e,Rn,Cn,Pn,js))?!1:(Qs.crossVectors(Gi,Vi),e=[Qs.x,Qs.y,Qs.z],qo(e,Rn,Cn,Pn,js))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,fi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(fi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ri[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ri[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ri[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ri[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ri[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ri[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ri[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ri[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ri),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Ri=[new I,new I,new I,new I,new I,new I,new I,new I],fi=new I,$s=new ri,Rn=new I,Cn=new I,Pn=new I,Gi=new I,Vi=new I,rn=new I,ms=new I,js=new I,Qs=new I,on=new I;function qo(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){on.fromArray(n,r);let o=s.x*Math.abs(on.x)+s.y*Math.abs(on.y)+s.z*Math.abs(on.z),l=t.dot(on),c=e.dot(on),u=i.dot(on);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var xd=new ri,gs=new I,Yo=new I,Fi=class{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):xd.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;gs.subVectors(t,this.center);let e=gs.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(gs,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Yo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(gs.copy(t.center).add(Yo)),this.expandByPoint(gs.copy(t.center).sub(Yo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Ci=new I,Zo=new I,tr=new I,Wi=new I,Jo=new I,er=new I,Ko=new I,gn=class{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ci)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Ci.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ci.copy(this.origin).addScaledVector(this.direction,e),Ci.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Zo.copy(t).add(e).multiplyScalar(.5),tr.copy(e).sub(t).normalize(),Wi.copy(this.origin).sub(Zo);let r=t.distanceTo(e)*.5,a=-this.direction.dot(tr),o=Wi.dot(this.direction),l=-Wi.dot(tr),c=Wi.lengthSq(),u=Math.abs(1-a*a),d,h,f,g;if(u>0)if(d=a*l-o,h=a*o-l,g=r*u,d>=0)if(h>=-g)if(h<=g){let _=1/u;d*=_,h*=_,f=d*(d+a*h+2*o)+h*(a*d+h+2*l)+c}else h=r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;else h=-r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;else h<=-g?(d=Math.max(0,-(-a*r+o)),h=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+h*(h+2*l)+c):h<=g?(d=0,h=Math.min(Math.max(-r,-l),r),f=h*(h+2*l)+c):(d=Math.max(0,-(a*r+o)),h=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+h*(h+2*l)+c);else h=a>0?-r:r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Zo).addScaledVector(tr,h),f}intersectSphere(t,e){Ci.subVectors(t.center,this.origin);let i=Ci.dot(this.direction),s=Ci.dot(Ci)-i*i,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,l,c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(i=(t.min.x-h.x)*c,s=(t.max.x-h.x)*c):(i=(t.max.x-h.x)*c,s=(t.min.x-h.x)*c),u>=0?(r=(t.min.y-h.y)*u,a=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,a=(t.min.y-h.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-h.z)*d,l=(t.max.z-h.z)*d):(o=(t.max.z-h.z)*d,l=(t.min.z-h.z)*d),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Ci)!==null}intersectTriangle(t,e,i,s,r){Jo.subVectors(e,t),er.subVectors(i,t),Ko.crossVectors(Jo,er);let a=this.direction.dot(Ko),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Wi.subVectors(this.origin,t);let l=o*this.direction.dot(er.crossVectors(Wi,er));if(l<0)return null;let c=o*this.direction.dot(Jo.cross(Wi));if(c<0||l+c>a)return null;let u=-o*Wi.dot(Ko);return u<0?null:this.at(u/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ce=class n{constructor(t,e,i,s,r,a,o,l,c,u,d,h,f,g,_,p){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c,u,d,h,f,g,_,p)}set(t,e,i,s,r,a,o,l,c,u,d,h,f,g,_,p){let m=this.elements;return m[0]=t,m[4]=e,m[8]=i,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=u,m[10]=d,m[14]=h,m[3]=f,m[7]=g,m[11]=_,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,i=t.elements,s=1/Ln.setFromMatrixColumn(t,0).length(),r=1/Ln.setFromMatrixColumn(t,1).length(),a=1/Ln.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let h=a*u,f=a*d,g=o*u,_=o*d;e[0]=l*u,e[4]=-l*d,e[8]=c,e[1]=f+g*c,e[5]=h-_*c,e[9]=-o*l,e[2]=_-h*c,e[6]=g+f*c,e[10]=a*l}else if(t.order==="YXZ"){let h=l*u,f=l*d,g=c*u,_=c*d;e[0]=h+_*o,e[4]=g*o-f,e[8]=a*c,e[1]=a*d,e[5]=a*u,e[9]=-o,e[2]=f*o-g,e[6]=_+h*o,e[10]=a*l}else if(t.order==="ZXY"){let h=l*u,f=l*d,g=c*u,_=c*d;e[0]=h-_*o,e[4]=-a*d,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*u,e[9]=_-h*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let h=a*u,f=a*d,g=o*u,_=o*d;e[0]=l*u,e[4]=g*c-f,e[8]=h*c+_,e[1]=l*d,e[5]=_*c+h,e[9]=f*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let h=a*l,f=a*c,g=o*l,_=o*c;e[0]=l*u,e[4]=_-h*d,e[8]=g*d+f,e[1]=d,e[5]=a*u,e[9]=-o*u,e[2]=-c*u,e[6]=f*d+g,e[10]=h-_*d}else if(t.order==="XZY"){let h=a*l,f=a*c,g=o*l,_=o*c;e[0]=l*u,e[4]=-d,e[8]=c*u,e[1]=h*d+_,e[5]=a*u,e[9]=f*d-g,e[2]=g*d-f,e[6]=o*u,e[10]=_*d+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(_d,t,yd)}lookAt(t,e,i){let s=this.elements;return ni.subVectors(t,e),ni.lengthSq()===0&&(ni.z=1),ni.normalize(),Xi.crossVectors(i,ni),Xi.lengthSq()===0&&(Math.abs(i.z)===1?ni.x+=1e-4:ni.z+=1e-4,ni.normalize(),Xi.crossVectors(i,ni)),Xi.normalize(),ir.crossVectors(ni,Xi),s[0]=Xi.x,s[4]=ir.x,s[8]=ni.x,s[1]=Xi.y,s[5]=ir.y,s[9]=ni.y,s[2]=Xi.z,s[6]=ir.z,s[10]=ni.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],d=i[5],h=i[9],f=i[13],g=i[2],_=i[6],p=i[10],m=i[14],y=i[3],x=i[7],v=i[11],S=i[15],M=s[0],b=s[4],U=s[8],E=s[12],T=s[1],C=s[5],F=s[9],et=s[13],D=s[2],O=s[6],Y=s[10],rt=s[14],it=s[3],Z=s[7],st=s[11],ht=s[15];return r[0]=a*M+o*T+l*D+c*it,r[4]=a*b+o*C+l*O+c*Z,r[8]=a*U+o*F+l*Y+c*st,r[12]=a*E+o*et+l*rt+c*ht,r[1]=u*M+d*T+h*D+f*it,r[5]=u*b+d*C+h*O+f*Z,r[9]=u*U+d*F+h*Y+f*st,r[13]=u*E+d*et+h*rt+f*ht,r[2]=g*M+_*T+p*D+m*it,r[6]=g*b+_*C+p*O+m*Z,r[10]=g*U+_*F+p*Y+m*st,r[14]=g*E+_*et+p*rt+m*ht,r[3]=y*M+x*T+v*D+S*it,r[7]=y*b+x*C+v*O+S*Z,r[11]=y*U+x*F+v*Y+S*st,r[15]=y*E+x*et+v*rt+S*ht,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],u=t[2],d=t[6],h=t[10],f=t[14],g=t[3],_=t[7],p=t[11],m=t[15];return g*(+r*l*d-s*c*d-r*o*h+i*c*h+s*o*f-i*l*f)+_*(+e*l*f-e*c*h+r*a*h-s*a*f+s*c*u-r*l*u)+p*(+e*c*d-e*o*f-r*a*d+i*a*f+r*o*u-i*c*u)+m*(-s*o*u-e*l*d+e*o*h+s*a*d-i*a*h+i*l*u)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],u=t[8],d=t[9],h=t[10],f=t[11],g=t[12],_=t[13],p=t[14],m=t[15],y=d*p*c-_*h*c+_*l*f-o*p*f-d*l*m+o*h*m,x=g*h*c-u*p*c-g*l*f+a*p*f+u*l*m-a*h*m,v=u*_*c-g*d*c+g*o*f-a*_*f-u*o*m+a*d*m,S=g*d*l-u*_*l-g*o*h+a*_*h+u*o*p-a*d*p,M=e*y+i*x+s*v+r*S;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let b=1/M;return t[0]=y*b,t[1]=(_*h*r-d*p*r-_*s*f+i*p*f+d*s*m-i*h*m)*b,t[2]=(o*p*r-_*l*r+_*s*c-i*p*c-o*s*m+i*l*m)*b,t[3]=(d*l*r-o*h*r-d*s*c+i*h*c+o*s*f-i*l*f)*b,t[4]=x*b,t[5]=(u*p*r-g*h*r+g*s*f-e*p*f-u*s*m+e*h*m)*b,t[6]=(g*l*r-a*p*r-g*s*c+e*p*c+a*s*m-e*l*m)*b,t[7]=(a*h*r-u*l*r+u*s*c-e*h*c-a*s*f+e*l*f)*b,t[8]=v*b,t[9]=(g*d*r-u*_*r-g*i*f+e*_*f+u*i*m-e*d*m)*b,t[10]=(a*_*r-g*o*r+g*i*c-e*_*c-a*i*m+e*o*m)*b,t[11]=(u*o*r-a*d*r-u*i*c+e*d*c+a*i*f-e*o*f)*b,t[12]=S*b,t[13]=(u*_*s-g*d*s+g*i*h-e*_*h-u*i*p+e*d*p)*b,t[14]=(g*o*s-a*_*s-g*i*l+e*_*l+a*i*p-e*o*p)*b,t[15]=(a*d*s-u*o*s+u*i*l-e*d*l-a*i*h+e*o*h)*b,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,u=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+i,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,u=a+a,d=o+o,h=r*c,f=r*u,g=r*d,_=a*u,p=a*d,m=o*d,y=l*c,x=l*u,v=l*d,S=i.x,M=i.y,b=i.z;return s[0]=(1-(_+m))*S,s[1]=(f+v)*S,s[2]=(g-x)*S,s[3]=0,s[4]=(f-v)*M,s[5]=(1-(h+m))*M,s[6]=(p+y)*M,s[7]=0,s[8]=(g+x)*b,s[9]=(p-y)*b,s[10]=(1-(h+_))*b,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements,r=Ln.set(s[0],s[1],s[2]).length(),a=Ln.set(s[4],s[5],s[6]).length(),o=Ln.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],pi.copy(this);let c=1/r,u=1/a,d=1/o;return pi.elements[0]*=c,pi.elements[1]*=c,pi.elements[2]*=c,pi.elements[4]*=u,pi.elements[5]*=u,pi.elements[6]*=u,pi.elements[8]*=d,pi.elements[9]*=d,pi.elements[10]*=d,e.setFromRotationMatrix(pi),i.x=r,i.y=a,i.z=o,this}makePerspective(t,e,i,s,r,a,o=zi){let l=this.elements,c=2*r/(e-t),u=2*r/(i-s),d=(e+t)/(e-t),h=(i+s)/(i-s),f,g;if(o===zi)f=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Ir)f=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=zi){let l=this.elements,c=1/(e-t),u=1/(i-s),d=1/(a-r),h=(e+t)*c,f=(i+s)*u,g,_;if(o===zi)g=(a+r)*d,_=-2*d;else if(o===Ir)g=r*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}},Ln=new I,pi=new ce,_d=new I(0,0,0),yd=new I(1,1,1),Xi=new I,ir=new I,ni=new I,vc=new ce,bc=new $i,Qn=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],d=s[2],h=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(Xe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Xe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Xe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Xe(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Xe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Xe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return vc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(vc,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return bc.setFromEuler(this),this.setFromQuaternion(bc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Qn.DEFAULT_ORDER="XYZ";var Fr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},vd=0,Mc=new I,In=new $i,Pi=new ce,nr=new I,xs=new I,bd=new I,Md=new $i,Ec=new I(1,0,0),wc=new I(0,1,0),Sc=new I(0,0,1),Ed={type:"added"},wd={type:"removed"},Ee=class n extends Si{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:vd++}),this.uuid=rs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new I,e=new Qn,i=new $i,s=new I(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ce},normalMatrix:{value:new $t}}),this.matrix=new ce,this.matrixWorld=new ce,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Fr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return In.setFromAxisAngle(t,e),this.quaternion.multiply(In),this}rotateOnWorldAxis(t,e){return In.setFromAxisAngle(t,e),this.quaternion.premultiply(In),this}rotateX(t){return this.rotateOnAxis(Ec,t)}rotateY(t){return this.rotateOnAxis(wc,t)}rotateZ(t){return this.rotateOnAxis(Sc,t)}translateOnAxis(t,e){return Mc.copy(t).applyQuaternion(this.quaternion),this.position.add(Mc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ec,t)}translateY(t){return this.translateOnAxis(wc,t)}translateZ(t){return this.translateOnAxis(Sc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Pi.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?nr.copy(t):nr.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),xs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Pi.lookAt(xs,nr,this.up):Pi.lookAt(nr,xs,this.up),this.quaternion.setFromRotationMatrix(Pi),s&&(Pi.extractRotation(s.matrixWorld),In.setFromRotationMatrix(Pi),this.quaternion.premultiply(In.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(Ed)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(wd)),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Pi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Pi.multiply(t.parent.matrixWorld)),t.applyMatrix4(Pi),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xs,t,bd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xs,Md,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++){let r=e[i];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){let i=this.parent;if(t===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++){let o=s[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),u=a(t.images),d=a(t.shapes),h=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}};Ee.DEFAULT_UP=new I(0,1,0);Ee.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ee.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var mi=new I,Li=new I,$o=new I,Ii=new I,Dn=new I,Un=new I,Tc=new I,jo=new I,Qo=new I,ta=new I,sr=!1,Vn=class n{constructor(t=new I,e=new I,i=new I){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),mi.subVectors(t,e),s.cross(mi);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){mi.subVectors(s,e),Li.subVectors(i,e),$o.subVectors(t,e);let a=mi.dot(mi),o=mi.dot(Li),l=mi.dot($o),c=Li.dot(Li),u=Li.dot($o),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let h=1/d,f=(c*l-o*u)*h,g=(a*u-o*l)*h;return r.set(1-f-g,g,f)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Ii)===null?!1:Ii.x>=0&&Ii.y>=0&&Ii.x+Ii.y<=1}static getUV(t,e,i,s,r,a,o,l){return sr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),sr=!0),this.getInterpolation(t,e,i,s,r,a,o,l)}static getInterpolation(t,e,i,s,r,a,o,l){return this.getBarycoord(t,e,i,s,Ii)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Ii.x),l.addScaledVector(a,Ii.y),l.addScaledVector(o,Ii.z),l)}static isFrontFacing(t,e,i,s){return mi.subVectors(i,e),Li.subVectors(t,e),mi.cross(Li).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return mi.subVectors(this.c,this.b),Li.subVectors(this.a,this.b),mi.cross(Li).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,i,s,r){return sr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),sr=!0),n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,a,o;Dn.subVectors(s,i),Un.subVectors(r,i),jo.subVectors(t,i);let l=Dn.dot(jo),c=Un.dot(jo);if(l<=0&&c<=0)return e.copy(i);Qo.subVectors(t,s);let u=Dn.dot(Qo),d=Un.dot(Qo);if(u>=0&&d<=u)return e.copy(s);let h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),e.copy(i).addScaledVector(Dn,a);ta.subVectors(t,r);let f=Dn.dot(ta),g=Un.dot(ta);if(g>=0&&f<=g)return e.copy(r);let _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(i).addScaledVector(Un,o);let p=u*g-f*d;if(p<=0&&d-u>=0&&f-g>=0)return Tc.subVectors(r,s),o=(d-u)/(d-u+(f-g)),e.copy(s).addScaledVector(Tc,o);let m=1/(p+_+h);return a=_*m,o=h*m,e.copy(i).addScaledVector(Dn,a).addScaledVector(Un,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Ph={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},qi={h:0,s:0,l:0},rr={h:0,s:0,l:0};function ea(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var qt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=pe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,le.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=le.workingColorSpace){return this.r=t,this.g=e,this.b=i,le.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=le.workingColorSpace){if(t=dd(t,1),e=Xe(e,0,1),i=Xe(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=ea(a,r,t+1/3),this.g=ea(a,r,t),this.b=ea(a,r,t-1/3)}return le.toWorkingColorSpace(this,s),this}setStyle(t,e=pe){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=pe){let i=Ph[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Zn(t.r),this.g=Zn(t.g),this.b=Zn(t.b),this}copyLinearToSRGB(t){return this.r=Vo(t.r),this.g=Vo(t.g),this.b=Vo(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=pe){return le.fromWorkingColorSpace(We.copy(this),t),Math.round(Xe(We.r*255,0,255))*65536+Math.round(Xe(We.g*255,0,255))*256+Math.round(Xe(We.b*255,0,255))}getHexString(t=pe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=le.workingColorSpace){le.fromWorkingColorSpace(We.copy(this),e);let i=We.r,s=We.g,r=We.b,a=Math.max(i,s,r),o=Math.min(i,s,r),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case i:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-i)/d+2;break;case r:l=(i-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=le.workingColorSpace){return le.fromWorkingColorSpace(We.copy(this),e),t.r=We.r,t.g=We.g,t.b=We.b,t}getStyle(t=pe){le.fromWorkingColorSpace(We.copy(this),t);let e=We.r,i=We.g,s=We.b;return t!==pe?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(qi),this.setHSL(qi.h+t,qi.s+e,qi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(qi),t.getHSL(rr);let i=Ho(qi.h,rr.h,e),s=Ho(qi.s,rr.s,e),r=Ho(qi.l,rr.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},We=new qt;qt.NAMES=Ph;var Sd=0,Oi=class extends Si{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Sd++}),this.uuid=rs(),this.name="",this.type="Material",this.blending=Yn,this.side=Ni,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ga,this.blendDst=xa,this.blendEquation=hn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qt(0,0,0),this.blendAlpha=0,this.depthFunc=Tr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=dc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Tn,this.stencilZFail=Tn,this.stencilZPass=Tn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Yn&&(i.blending=this.blending),this.side!==Ni&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ga&&(i.blendSrc=this.blendSrc),this.blendDst!==xa&&(i.blendDst=this.blendDst),this.blendEquation!==hn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Tr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==dc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Tn&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Tn&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Tn&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},Be=class extends Oi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=xh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Ae=new I,or=new _t,Ce=class{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=fc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Zi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)or.fromBufferAttribute(this,e),or.applyMatrix3(t),this.setXY(e,or.x,or.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ae.fromBufferAttribute(this,e),Ae.applyMatrix3(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ae.fromBufferAttribute(this,e),Ae.applyMatrix4(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ae.fromBufferAttribute(this,e),Ae.applyNormalMatrix(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ae.fromBufferAttribute(this,e),Ae.transformDirection(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=ps(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=je(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ps(e,this.array)),e}setX(t,e){return this.normalized&&(e=je(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ps(e,this.array)),e}setY(t,e){return this.normalized&&(e=je(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ps(e,this.array)),e}setZ(t,e){return this.normalized&&(e=je(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ps(e,this.array)),e}setW(t,e){return this.normalized&&(e=je(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=je(e,this.array),i=je(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=je(e,this.array),i=je(i,this.array),s=je(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=je(e,this.array),i=je(i,this.array),s=je(s,this.array),r=je(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==fc&&(t.usage=this.usage),t}};var Or=class extends Ce{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var Br=class extends Ce{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var oe=class extends Ce{constructor(t,e,i){super(new Float32Array(t),e,i)}};var Td=0,li=new ce,ia=new Ee,zn=new I,si=new ri,_s=new ri,ze=new I,we=class n extends Si{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Td++}),this.uuid=rs(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ch(t)?Br:Or)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new $t().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return li.makeRotationFromQuaternion(t),this.applyMatrix4(li),this}rotateX(t){return li.makeRotationX(t),this.applyMatrix4(li),this}rotateY(t){return li.makeRotationY(t),this.applyMatrix4(li),this}rotateZ(t){return li.makeRotationZ(t),this.applyMatrix4(li),this}translate(t,e,i){return li.makeTranslation(t,e,i),this.applyMatrix4(li),this}scale(t,e,i){return li.makeScale(t,e,i),this.applyMatrix4(li),this}lookAt(t){return ia.lookAt(t),ia.updateMatrix(),this.applyMatrix4(ia.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(zn).negate(),this.translate(zn.x,zn.y,zn.z),this}setFromPoints(t){let e=[];for(let i=0,s=t.length;i<s;i++){let r=t[i];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new oe(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ri);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];si.setFromBufferAttribute(r),this.morphTargetsRelative?(ze.addVectors(this.boundingBox.min,si.min),this.boundingBox.expandByPoint(ze),ze.addVectors(this.boundingBox.max,si.max),this.boundingBox.expandByPoint(ze)):(this.boundingBox.expandByPoint(si.min),this.boundingBox.expandByPoint(si.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new I,1/0);return}if(t){let i=this.boundingSphere.center;if(si.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];_s.setFromBufferAttribute(o),this.morphTargetsRelative?(ze.addVectors(si.min,_s.min),si.expandByPoint(ze),ze.addVectors(si.max,_s.max),si.expandByPoint(ze)):(si.expandByPoint(_s.min),si.expandByPoint(_s.max))}si.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)ze.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(ze));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)ze.fromBufferAttribute(o,c),l&&(zn.fromBufferAttribute(t,c),ze.add(zn)),s=Math.max(s,i.distanceToSquared(ze))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.array,s=e.position.array,r=e.normal.array,a=e.uv.array,o=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ce(new Float32Array(4*o),4));let l=this.getAttribute("tangent").array,c=[],u=[];for(let T=0;T<o;T++)c[T]=new I,u[T]=new I;let d=new I,h=new I,f=new I,g=new _t,_=new _t,p=new _t,m=new I,y=new I;function x(T,C,F){d.fromArray(s,T*3),h.fromArray(s,C*3),f.fromArray(s,F*3),g.fromArray(a,T*2),_.fromArray(a,C*2),p.fromArray(a,F*2),h.sub(d),f.sub(d),_.sub(g),p.sub(g);let et=1/(_.x*p.y-p.x*_.y);isFinite(et)&&(m.copy(h).multiplyScalar(p.y).addScaledVector(f,-_.y).multiplyScalar(et),y.copy(f).multiplyScalar(_.x).addScaledVector(h,-p.x).multiplyScalar(et),c[T].add(m),c[C].add(m),c[F].add(m),u[T].add(y),u[C].add(y),u[F].add(y))}let v=this.groups;v.length===0&&(v=[{start:0,count:i.length}]);for(let T=0,C=v.length;T<C;++T){let F=v[T],et=F.start,D=F.count;for(let O=et,Y=et+D;O<Y;O+=3)x(i[O+0],i[O+1],i[O+2])}let S=new I,M=new I,b=new I,U=new I;function E(T){b.fromArray(r,T*3),U.copy(b);let C=c[T];S.copy(C),S.sub(b.multiplyScalar(b.dot(C))).normalize(),M.crossVectors(U,C);let et=M.dot(u[T])<0?-1:1;l[T*4]=S.x,l[T*4+1]=S.y,l[T*4+2]=S.z,l[T*4+3]=et}for(let T=0,C=v.length;T<C;++T){let F=v[T],et=F.start,D=F.count;for(let O=et,Y=et+D;O<Y;O+=3)E(i[O+0]),E(i[O+1]),E(i[O+2])}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ce(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let h=0,f=i.count;h<f;h++)i.setXYZ(h,0,0,0);let s=new I,r=new I,a=new I,o=new I,l=new I,c=new I,u=new I,d=new I;if(t)for(let h=0,f=t.count;h<f;h+=3){let g=t.getX(h+0),_=t.getX(h+1),p=t.getX(h+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,p),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,p),o.add(u),l.add(u),c.add(u),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let h=0,f=e.count;h<f;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),a.fromBufferAttribute(e,h+2),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)ze.fromBufferAttribute(t,e),ze.normalize(),t.setXYZ(e,ze.x,ze.y,ze.z)}toNonIndexed(){function t(o,l){let c=o.array,u=o.itemSize,d=o.normalized,h=new c.constructor(l.length*u),f=0,g=0;for(let _=0,p=l.length;_<p;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*u;for(let m=0;m<u;m++)h[g++]=c[f++]}return new Ce(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,i);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let u=0,d=c.length;u<d;u++){let h=c[u],f=t(h,i);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){let f=c[d];u.push(f.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone(e));let s=t.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(e))}let r=t.morphAttributes;for(let c in r){let u=[],d=r[c];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,u=a.length;c<u;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ac=new ce,an=new gn,ar=new Fi,Rc=new I,Nn=new I,kn=new I,Fn=new I,na=new I,lr=new I,cr=new _t,hr=new _t,ur=new _t,Cc=new I,Pc=new I,Lc=new I,dr=new I,fr=new I,K=class extends Ee{constructor(t=new we,e=new Be){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){lr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=o[l],d=r[l];u!==0&&(na.fromBufferAttribute(d,t),a?lr.addScaledVector(na,u):lr.addScaledVector(na.sub(e),u))}e.add(lr)}return e}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ar.copy(i.boundingSphere),ar.applyMatrix4(r),an.copy(t.ray).recast(t.near),!(ar.containsPoint(an.origin)===!1&&(an.intersectSphere(ar,Rc)===null||an.origin.distanceToSquared(Rc)>(t.far-t.near)**2))&&(Ac.copy(r).invert(),an.copy(t.ray).applyMatrix4(Ac),!(i.boundingBox!==null&&an.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,an)))}_computeIntersections(t,e,i){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=h.length;g<_;g++){let p=h[g],m=a[p.materialIndex],y=Math.max(p.start,f.start),x=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let v=y,S=x;v<S;v+=3){let M=o.getX(v),b=o.getX(v+1),U=o.getX(v+2);s=pr(this,m,t,i,c,u,d,M,b,U),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){let y=o.getX(p),x=o.getX(p+1),v=o.getX(p+2);s=pr(this,a,t,i,c,u,d,y,x,v),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=h.length;g<_;g++){let p=h[g],m=a[p.materialIndex],y=Math.max(p.start,f.start),x=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let v=y,S=x;v<S;v+=3){let M=v,b=v+1,U=v+2;s=pr(this,m,t,i,c,u,d,M,b,U),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){let y=p,x=p+1,v=p+2;s=pr(this,a,t,i,c,u,d,y,x,v),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}};function Ad(n,t,e,i,s,r,a,o){let l;if(t.side===qe?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,t.side===Ni,o),l===null)return null;fr.copy(o),fr.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(fr);return c<e.near||c>e.far?null:{distance:c,point:fr.clone(),object:n}}function pr(n,t,e,i,s,r,a,o,l,c){n.getVertexPosition(o,Nn),n.getVertexPosition(l,kn),n.getVertexPosition(c,Fn);let u=Ad(n,t,e,i,Nn,kn,Fn,dr);if(u){s&&(cr.fromBufferAttribute(s,o),hr.fromBufferAttribute(s,l),ur.fromBufferAttribute(s,c),u.uv=Vn.getInterpolation(dr,Nn,kn,Fn,cr,hr,ur,new _t)),r&&(cr.fromBufferAttribute(r,o),hr.fromBufferAttribute(r,l),ur.fromBufferAttribute(r,c),u.uv1=Vn.getInterpolation(dr,Nn,kn,Fn,cr,hr,ur,new _t),u.uv2=u.uv1),a&&(Cc.fromBufferAttribute(a,o),Pc.fromBufferAttribute(a,l),Lc.fromBufferAttribute(a,c),u.normal=Vn.getInterpolation(dr,Nn,kn,Fn,Cc,Pc,Lc,new I),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new I,materialIndex:0};Vn.getNormal(Nn,kn,Fn,d.normal),u.face=d}return u}var jt=class n extends we{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],u=[],d=[],h=0,f=0;g("z","y","x",-1,-1,i,e,t,a,r,0),g("z","y","x",1,-1,i,e,-t,a,r,1),g("x","z","y",1,1,t,i,e,s,a,2),g("x","z","y",1,-1,t,i,-e,s,a,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new oe(c,3)),this.setAttribute("normal",new oe(u,3)),this.setAttribute("uv",new oe(d,2));function g(_,p,m,y,x,v,S,M,b,U,E){let T=v/b,C=S/U,F=v/2,et=S/2,D=M/2,O=b+1,Y=U+1,rt=0,it=0,Z=new I;for(let st=0;st<Y;st++){let ht=st*C-et;for(let tt=0;tt<O;tt++){let B=tt*T-F;Z[_]=B*y,Z[p]=ht*x,Z[m]=D,c.push(Z.x,Z.y,Z.z),Z[_]=0,Z[p]=0,Z[m]=M>0?1:-1,u.push(Z.x,Z.y,Z.z),d.push(tt/b),d.push(1-st/U),rt+=1}}for(let st=0;st<U;st++)for(let ht=0;ht<b;ht++){let tt=h+ht+O*st,B=h+ht+O*(st+1),ot=h+(ht+1)+O*(st+1),ft=h+(ht+1)+O*st;l.push(tt,B,ft),l.push(B,ot,ft),it+=6}o.addGroup(f,it,E),f+=it,h+=rt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function ts(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function Ke(n){let t={};for(let e=0;e<n.length;e++){let i=ts(n[e]);for(let s in i)t[s]=i[s]}return t}function Rd(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Lh(n){return n.getRenderTarget()===null?n.outputColorSpace:le.workingColorSpace}var ll={clone:ts,merge:Ke},Cd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Pd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,$e=class extends Oi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Cd,this.fragmentShader=Pd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ts(t.uniforms),this.uniformsGroups=Rd(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}},Hr=class extends Ee{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ce,this.projectionMatrix=new ce,this.projectionMatrixInverse=new ce,this.coordinateSystem=zi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Oe=class extends Hr{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Dr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Bo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Dr*2*Math.atan(Math.tan(Bo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Bo*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},On=-90,Bn=1,Sa=class extends Ee{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Oe(On,Bn,t,e);s.layers=this.layers,this.add(s);let r=new Oe(On,Bn,t,e);r.layers=this.layers,this.add(r);let a=new Oe(On,Bn,t,e);a.layers=this.layers,this.add(a);let o=new Oe(On,Bn,t,e);o.layers=this.layers,this.add(o);let l=new Oe(On,Bn,t,e);l.layers=this.layers,this.add(l);let c=new Oe(On,Bn,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===zi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ir)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,u]=this.children,d=t.getRenderTarget(),h=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,a),t.setRenderTarget(i,2,s),t.render(e,o),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,s),t.render(e,u),t.setRenderTarget(d,h,f),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},Gr=class extends ci{constructor(t,e,i,s,r,a,o,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:Kn,super(t,e,i,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Ta=class extends yi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];e.encoding!==void 0&&(Ms("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===pn?pe:ke),this.texture=new Gr(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Qe}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new jt(5,5,5),r=new $e({name:"CubemapFromEquirect",uniforms:ts(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:qe,blending:Ei});r.uniforms.tEquirect.value=e;let a=new K(s,r),o=e.minFilter;return e.minFilter===_i&&(e.minFilter=Qe),new Sa(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,i,s){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}},sa=new I,Ld=new I,Id=new $t,Ui=class{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=sa.subVectors(i,e).cross(Ld.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let i=t.delta(sa),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||Id.getNormalMatrix(t),s=this.coplanarPoint(sa).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},ln=new Fi,mr=new I,Rs=class{constructor(t=new Ui,e=new Ui,i=new Ui,s=new Ui,r=new Ui,a=new Ui){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=zi){let i=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],u=s[5],d=s[6],h=s[7],f=s[8],g=s[9],_=s[10],p=s[11],m=s[12],y=s[13],x=s[14],v=s[15];if(i[0].setComponents(l-r,h-c,p-f,v-m).normalize(),i[1].setComponents(l+r,h+c,p+f,v+m).normalize(),i[2].setComponents(l+a,h+u,p+g,v+y).normalize(),i[3].setComponents(l-a,h-u,p-g,v-y).normalize(),i[4].setComponents(l-o,h-d,p-_,v-x).normalize(),e===zi)i[5].setComponents(l+o,h+d,p+_,v+x).normalize();else if(e===Ir)i[5].setComponents(o,d,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ln.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ln.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ln)}intersectsSprite(t){return ln.center.set(0,0,0),ln.radius=.7071067811865476,ln.applyMatrix4(t.matrixWorld),this.intersectsSphere(ln)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if(mr.x=s.normal.x>0?t.max.x:t.min.x,mr.y=s.normal.y>0?t.max.y:t.min.y,mr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(mr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Ih(){let n=null,t=!1,e=null,i=null;function s(r,a){e(r,a),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Dd(n,t){let e=t.isWebGL2,i=new WeakMap;function s(c,u){let d=c.array,h=c.usage,f=d.byteLength,g=n.createBuffer();n.bindBuffer(u,g),n.bufferData(u,d,h),c.onUploadCallback();let _;if(d instanceof Float32Array)_=n.FLOAT;else if(d instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(e)_=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=n.UNSIGNED_SHORT;else if(d instanceof Int16Array)_=n.SHORT;else if(d instanceof Uint32Array)_=n.UNSIGNED_INT;else if(d instanceof Int32Array)_=n.INT;else if(d instanceof Int8Array)_=n.BYTE;else if(d instanceof Uint8Array)_=n.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)_=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:_,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version,size:f}}function r(c,u,d){let h=u.array,f=u._updateRange,g=u.updateRanges;if(n.bindBuffer(d,c),f.count===-1&&g.length===0&&n.bufferSubData(d,0,h),g.length!==0){for(let _=0,p=g.length;_<p;_++){let m=g[_];e?n.bufferSubData(d,m.start*h.BYTES_PER_ELEMENT,h,m.start,m.count):n.bufferSubData(d,m.start*h.BYTES_PER_ELEMENT,h.subarray(m.start,m.start+m.count))}u.clearUpdateRanges()}f.count!==-1&&(e?n.bufferSubData(d,f.offset*h.BYTES_PER_ELEMENT,h,f.offset,f.count):n.bufferSubData(d,f.offset*h.BYTES_PER_ELEMENT,h.subarray(f.offset,f.offset+f.count)),f.count=-1),u.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);let u=i.get(c);u&&(n.deleteBuffer(u.buffer),i.delete(c))}function l(c,u){if(c.isGLBufferAttribute){let h=i.get(c);(!h||h.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);let d=i.get(c);if(d===void 0)i.set(c,s(c,u));else if(d.version<c.version){if(d.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(d.buffer,c,u),d.version=c.version}}return{get:a,remove:o,update:l}}var ie=class n extends we{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(s),c=o+1,u=l+1,d=t/o,h=e/l,f=[],g=[],_=[],p=[];for(let m=0;m<u;m++){let y=m*h-a;for(let x=0;x<c;x++){let v=x*d-r;g.push(v,-y,0),_.push(0,0,1),p.push(x/o),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let y=0;y<o;y++){let x=y+c*m,v=y+c*(m+1),S=y+1+c*(m+1),M=y+1+c*m;f.push(x,v,M),f.push(v,S,M)}this.setIndex(f),this.setAttribute("position",new oe(g,3)),this.setAttribute("normal",new oe(_,3)),this.setAttribute("uv",new oe(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}},Ud=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,zd=`#ifdef USE_ALPHAHASH
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
#endif`,Nd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,kd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Fd=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Od=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Bd=`#ifdef USE_AOMAP
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
#endif`,Hd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Gd=`#ifdef USE_BATCHING
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
#endif`,Vd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Wd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Xd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,qd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Yd=`#ifdef USE_IRIDESCENCE
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
#endif`,Zd=`#ifdef USE_BUMPMAP
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
#endif`,Jd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Kd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,$d=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,jd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Qd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,tf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ef=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,nf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,sf=`#define PI 3.141592653589793
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
} // validated`,rf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,of=`vec3 transformedNormal = objectNormal;
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
#endif`,af=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,lf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,cf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,hf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,uf="gl_FragColor = linearToOutputTexel( gl_FragColor );",df=`
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
}`,ff=`#ifdef USE_ENVMAP
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
#endif`,pf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,mf=`#ifdef USE_ENVMAP
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
#endif`,gf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,xf=`#ifdef USE_ENVMAP
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
#endif`,_f=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,yf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,vf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,bf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Mf=`#ifdef USE_GRADIENTMAP
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
}`,Ef=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,wf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Sf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Tf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Af=`uniform bool receiveShadow;
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
#endif`,Rf=`#ifdef USE_ENVMAP
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
#endif`,Cf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Pf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Lf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,If=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Df=`PhysicalMaterial material;
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
#endif`,Uf=`struct PhysicalMaterial {
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
}`,zf=`
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
#endif`,Nf=`#if defined( RE_IndirectDiffuse )
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
#endif`,kf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ff=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Of=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Hf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Gf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Vf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Wf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Xf=`#if defined( USE_POINTS_UV )
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
#endif`,qf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Yf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Zf=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Jf=`#ifdef USE_MORPHNORMALS
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
#endif`,Kf=`#ifdef USE_MORPHTARGETS
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
#endif`,$f=`#ifdef USE_MORPHTARGETS
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
#endif`,jf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Qf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,tp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ep=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ip=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,np=`#ifdef USE_NORMALMAP
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
#endif`,sp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,rp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,op=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ap=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,lp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,cp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,hp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,up=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,fp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,pp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,mp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,gp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,xp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_p=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,yp=`float getShadowMask() {
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
}`,vp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,bp=`#ifdef USE_SKINNING
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
#endif`,Mp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ep=`#ifdef USE_SKINNING
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
#endif`,wp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Sp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Tp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ap=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Rp=`#ifdef USE_TRANSMISSION
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
#endif`,Cp=`#ifdef USE_TRANSMISSION
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
#endif`,Pp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Lp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ip=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Dp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Up=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,zp=`uniform sampler2D t2D;
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
}`,Np=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Fp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Op=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bp=`#include <common>
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
}`,Hp=`#if DEPTH_PACKING == 3200
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
}`,Gp=`#define DISTANCE
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
}`,Vp=`#define DISTANCE
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
}`,Wp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Xp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qp=`uniform float scale;
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
}`,Yp=`uniform vec3 diffuse;
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
}`,Zp=`#include <common>
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
}`,Jp=`uniform vec3 diffuse;
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
}`,Kp=`#define LAMBERT
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
}`,$p=`#define LAMBERT
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
}`,jp=`#define MATCAP
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
}`,Qp=`#define MATCAP
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
}`,t0=`#define NORMAL
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
}`,e0=`#define NORMAL
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
}`,i0=`#define PHONG
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
}`,n0=`#define PHONG
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
}`,s0=`#define STANDARD
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
}`,r0=`#define STANDARD
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
}`,o0=`#define TOON
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
}`,a0=`#define TOON
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
}`,l0=`uniform float size;
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
}`,c0=`uniform vec3 diffuse;
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
}`,h0=`#include <common>
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
}`,u0=`uniform vec3 color;
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
}`,d0=`uniform float rotation;
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
}`,f0=`uniform vec3 diffuse;
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
}`,Zt={alphahash_fragment:Ud,alphahash_pars_fragment:zd,alphamap_fragment:Nd,alphamap_pars_fragment:kd,alphatest_fragment:Fd,alphatest_pars_fragment:Od,aomap_fragment:Bd,aomap_pars_fragment:Hd,batching_pars_vertex:Gd,batching_vertex:Vd,begin_vertex:Wd,beginnormal_vertex:Xd,bsdfs:qd,iridescence_fragment:Yd,bumpmap_pars_fragment:Zd,clipping_planes_fragment:Jd,clipping_planes_pars_fragment:Kd,clipping_planes_pars_vertex:$d,clipping_planes_vertex:jd,color_fragment:Qd,color_pars_fragment:tf,color_pars_vertex:ef,color_vertex:nf,common:sf,cube_uv_reflection_fragment:rf,defaultnormal_vertex:of,displacementmap_pars_vertex:af,displacementmap_vertex:lf,emissivemap_fragment:cf,emissivemap_pars_fragment:hf,colorspace_fragment:uf,colorspace_pars_fragment:df,envmap_fragment:ff,envmap_common_pars_fragment:pf,envmap_pars_fragment:mf,envmap_pars_vertex:gf,envmap_physical_pars_fragment:Rf,envmap_vertex:xf,fog_vertex:_f,fog_pars_vertex:yf,fog_fragment:vf,fog_pars_fragment:bf,gradientmap_pars_fragment:Mf,lightmap_fragment:Ef,lightmap_pars_fragment:wf,lights_lambert_fragment:Sf,lights_lambert_pars_fragment:Tf,lights_pars_begin:Af,lights_toon_fragment:Cf,lights_toon_pars_fragment:Pf,lights_phong_fragment:Lf,lights_phong_pars_fragment:If,lights_physical_fragment:Df,lights_physical_pars_fragment:Uf,lights_fragment_begin:zf,lights_fragment_maps:Nf,lights_fragment_end:kf,logdepthbuf_fragment:Ff,logdepthbuf_pars_fragment:Of,logdepthbuf_pars_vertex:Bf,logdepthbuf_vertex:Hf,map_fragment:Gf,map_pars_fragment:Vf,map_particle_fragment:Wf,map_particle_pars_fragment:Xf,metalnessmap_fragment:qf,metalnessmap_pars_fragment:Yf,morphcolor_vertex:Zf,morphnormal_vertex:Jf,morphtarget_pars_vertex:Kf,morphtarget_vertex:$f,normal_fragment_begin:jf,normal_fragment_maps:Qf,normal_pars_fragment:tp,normal_pars_vertex:ep,normal_vertex:ip,normalmap_pars_fragment:np,clearcoat_normal_fragment_begin:sp,clearcoat_normal_fragment_maps:rp,clearcoat_pars_fragment:op,iridescence_pars_fragment:ap,opaque_fragment:lp,packing:cp,premultiplied_alpha_fragment:hp,project_vertex:up,dithering_fragment:dp,dithering_pars_fragment:fp,roughnessmap_fragment:pp,roughnessmap_pars_fragment:mp,shadowmap_pars_fragment:gp,shadowmap_pars_vertex:xp,shadowmap_vertex:_p,shadowmask_pars_fragment:yp,skinbase_vertex:vp,skinning_pars_vertex:bp,skinning_vertex:Mp,skinnormal_vertex:Ep,specularmap_fragment:wp,specularmap_pars_fragment:Sp,tonemapping_fragment:Tp,tonemapping_pars_fragment:Ap,transmission_fragment:Rp,transmission_pars_fragment:Cp,uv_pars_fragment:Pp,uv_pars_vertex:Lp,uv_vertex:Ip,worldpos_vertex:Dp,background_vert:Up,background_frag:zp,backgroundCube_vert:Np,backgroundCube_frag:kp,cube_vert:Fp,cube_frag:Op,depth_vert:Bp,depth_frag:Hp,distanceRGBA_vert:Gp,distanceRGBA_frag:Vp,equirect_vert:Wp,equirect_frag:Xp,linedashed_vert:qp,linedashed_frag:Yp,meshbasic_vert:Zp,meshbasic_frag:Jp,meshlambert_vert:Kp,meshlambert_frag:$p,meshmatcap_vert:jp,meshmatcap_frag:Qp,meshnormal_vert:t0,meshnormal_frag:e0,meshphong_vert:i0,meshphong_frag:n0,meshphysical_vert:s0,meshphysical_frag:r0,meshtoon_vert:o0,meshtoon_frag:a0,points_vert:l0,points_frag:c0,shadow_vert:h0,shadow_frag:u0,sprite_vert:d0,sprite_frag:f0},yt={common:{diffuse:{value:new qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $t}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $t},normalScale:{value:new _t(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0},uvTransform:{value:new $t}},sprite:{diffuse:{value:new qt(16777215)},opacity:{value:1},center:{value:new _t(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}}},Mi={basic:{uniforms:Ke([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.fog]),vertexShader:Zt.meshbasic_vert,fragmentShader:Zt.meshbasic_frag},lambert:{uniforms:Ke([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new qt(0)}}]),vertexShader:Zt.meshlambert_vert,fragmentShader:Zt.meshlambert_frag},phong:{uniforms:Ke([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new qt(0)},specular:{value:new qt(1118481)},shininess:{value:30}}]),vertexShader:Zt.meshphong_vert,fragmentShader:Zt.meshphong_frag},standard:{uniforms:Ke([yt.common,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.roughnessmap,yt.metalnessmap,yt.fog,yt.lights,{emissive:{value:new qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag},toon:{uniforms:Ke([yt.common,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.gradientmap,yt.fog,yt.lights,{emissive:{value:new qt(0)}}]),vertexShader:Zt.meshtoon_vert,fragmentShader:Zt.meshtoon_frag},matcap:{uniforms:Ke([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,{matcap:{value:null}}]),vertexShader:Zt.meshmatcap_vert,fragmentShader:Zt.meshmatcap_frag},points:{uniforms:Ke([yt.points,yt.fog]),vertexShader:Zt.points_vert,fragmentShader:Zt.points_frag},dashed:{uniforms:Ke([yt.common,yt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Zt.linedashed_vert,fragmentShader:Zt.linedashed_frag},depth:{uniforms:Ke([yt.common,yt.displacementmap]),vertexShader:Zt.depth_vert,fragmentShader:Zt.depth_frag},normal:{uniforms:Ke([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,{opacity:{value:1}}]),vertexShader:Zt.meshnormal_vert,fragmentShader:Zt.meshnormal_frag},sprite:{uniforms:Ke([yt.sprite,yt.fog]),vertexShader:Zt.sprite_vert,fragmentShader:Zt.sprite_frag},background:{uniforms:{uvTransform:{value:new $t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Zt.background_vert,fragmentShader:Zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Zt.backgroundCube_vert,fragmentShader:Zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Zt.cube_vert,fragmentShader:Zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Zt.equirect_vert,fragmentShader:Zt.equirect_frag},distanceRGBA:{uniforms:Ke([yt.common,yt.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Zt.distanceRGBA_vert,fragmentShader:Zt.distanceRGBA_frag},shadow:{uniforms:Ke([yt.lights,yt.fog,{color:{value:new qt(0)},opacity:{value:1}}]),vertexShader:Zt.shadow_vert,fragmentShader:Zt.shadow_frag}};Mi.physical={uniforms:Ke([Mi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $t},clearcoatNormalScale:{value:new _t(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $t},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $t},sheen:{value:0},sheenColor:{value:new qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $t},transmissionSamplerSize:{value:new _t},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $t},attenuationDistance:{value:0},attenuationColor:{value:new qt(0)},specularColor:{value:new qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $t},anisotropyVector:{value:new _t},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $t}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag};var gr={r:0,b:0,g:0};function p0(n,t,e,i,s,r,a){let o=new qt(0),l=r===!0?0:1,c,u,d=null,h=0,f=null;function g(p,m){let y=!1,x=m.isScene===!0?m.background:null;x&&x.isTexture&&(x=(m.backgroundBlurriness>0?e:t).get(x)),x===null?_(o,l):x&&x.isColor&&(_(x,1),y=!0);let v=n.xr.getEnvironmentBlendMode();v==="additive"?i.buffers.color.setClear(0,0,0,1,a):v==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(n.autoClear||y)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),x&&(x.isCubeTexture||x.mapping===co)?(u===void 0&&(u=new K(new jt(1,1,1),new $e({name:"BackgroundCubeMaterial",uniforms:ts(Mi.backgroundCube.uniforms),vertexShader:Mi.backgroundCube.vertexShader,fragmentShader:Mi.backgroundCube.fragmentShader,side:qe,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(S,M,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),u.material.uniforms.envMap.value=x,u.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,u.material.toneMapped=le.getTransfer(x.colorSpace)!==fe,(d!==x||h!==x.version||f!==n.toneMapping)&&(u.material.needsUpdate=!0,d=x,h=x.version,f=n.toneMapping),u.layers.enableAll(),p.unshift(u,u.geometry,u.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new K(new ie(2,2),new $e({name:"BackgroundMaterial",uniforms:ts(Mi.background.uniforms),vertexShader:Mi.background.vertexShader,fragmentShader:Mi.background.fragmentShader,side:Ni,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,c.material.toneMapped=le.getTransfer(x.colorSpace)!==fe,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(d!==x||h!==x.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,d=x,h=x.version,f=n.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function _(p,m){p.getRGB(gr,Lh(n)),i.buffers.color.setClear(gr.r,gr.g,gr.b,m,a)}return{getClearColor:function(){return o},setClearColor:function(p,m=1){o.set(p),l=m,_(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,_(o,l)},render:g}}function m0(n,t,e,i){let s=n.getParameter(n.MAX_VERTEX_ATTRIBS),r=i.isWebGL2?null:t.get("OES_vertex_array_object"),a=i.isWebGL2||r!==null,o={},l=p(null),c=l,u=!1;function d(D,O,Y,rt,it){let Z=!1;if(a){let st=_(rt,Y,O);c!==st&&(c=st,f(c.object)),Z=m(D,rt,Y,it),Z&&y(D,rt,Y,it)}else{let st=O.wireframe===!0;(c.geometry!==rt.id||c.program!==Y.id||c.wireframe!==st)&&(c.geometry=rt.id,c.program=Y.id,c.wireframe=st,Z=!0)}it!==null&&e.update(it,n.ELEMENT_ARRAY_BUFFER),(Z||u)&&(u=!1,U(D,O,Y,rt),it!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(it).buffer))}function h(){return i.isWebGL2?n.createVertexArray():r.createVertexArrayOES()}function f(D){return i.isWebGL2?n.bindVertexArray(D):r.bindVertexArrayOES(D)}function g(D){return i.isWebGL2?n.deleteVertexArray(D):r.deleteVertexArrayOES(D)}function _(D,O,Y){let rt=Y.wireframe===!0,it=o[D.id];it===void 0&&(it={},o[D.id]=it);let Z=it[O.id];Z===void 0&&(Z={},it[O.id]=Z);let st=Z[rt];return st===void 0&&(st=p(h()),Z[rt]=st),st}function p(D){let O=[],Y=[],rt=[];for(let it=0;it<s;it++)O[it]=0,Y[it]=0,rt[it]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:Y,attributeDivisors:rt,object:D,attributes:{},index:null}}function m(D,O,Y,rt){let it=c.attributes,Z=O.attributes,st=0,ht=Y.getAttributes();for(let tt in ht)if(ht[tt].location>=0){let ot=it[tt],ft=Z[tt];if(ft===void 0&&(tt==="instanceMatrix"&&D.instanceMatrix&&(ft=D.instanceMatrix),tt==="instanceColor"&&D.instanceColor&&(ft=D.instanceColor)),ot===void 0||ot.attribute!==ft||ft&&ot.data!==ft.data)return!0;st++}return c.attributesNum!==st||c.index!==rt}function y(D,O,Y,rt){let it={},Z=O.attributes,st=0,ht=Y.getAttributes();for(let tt in ht)if(ht[tt].location>=0){let ot=Z[tt];ot===void 0&&(tt==="instanceMatrix"&&D.instanceMatrix&&(ot=D.instanceMatrix),tt==="instanceColor"&&D.instanceColor&&(ot=D.instanceColor));let ft={};ft.attribute=ot,ot&&ot.data&&(ft.data=ot.data),it[tt]=ft,st++}c.attributes=it,c.attributesNum=st,c.index=rt}function x(){let D=c.newAttributes;for(let O=0,Y=D.length;O<Y;O++)D[O]=0}function v(D){S(D,0)}function S(D,O){let Y=c.newAttributes,rt=c.enabledAttributes,it=c.attributeDivisors;Y[D]=1,rt[D]===0&&(n.enableVertexAttribArray(D),rt[D]=1),it[D]!==O&&((i.isWebGL2?n:t.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](D,O),it[D]=O)}function M(){let D=c.newAttributes,O=c.enabledAttributes;for(let Y=0,rt=O.length;Y<rt;Y++)O[Y]!==D[Y]&&(n.disableVertexAttribArray(Y),O[Y]=0)}function b(D,O,Y,rt,it,Z,st){st===!0?n.vertexAttribIPointer(D,O,Y,it,Z):n.vertexAttribPointer(D,O,Y,rt,it,Z)}function U(D,O,Y,rt){if(i.isWebGL2===!1&&(D.isInstancedMesh||rt.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;x();let it=rt.attributes,Z=Y.getAttributes(),st=O.defaultAttributeValues;for(let ht in Z){let tt=Z[ht];if(tt.location>=0){let B=it[ht];if(B===void 0&&(ht==="instanceMatrix"&&D.instanceMatrix&&(B=D.instanceMatrix),ht==="instanceColor"&&D.instanceColor&&(B=D.instanceColor)),B!==void 0){let ot=B.normalized,ft=B.itemSize,mt=e.get(B);if(mt===void 0)continue;let vt=mt.buffer,Ut=mt.type,Ft=mt.bytesPerElement,L=i.isWebGL2===!0&&(Ut===n.INT||Ut===n.UNSIGNED_INT||B.gpuType===yh);if(B.isInterleavedBufferAttribute){let z=B.data,R=z.stride,H=B.offset;if(z.isInstancedInterleavedBuffer){for(let k=0;k<tt.locationSize;k++)S(tt.location+k,z.meshPerAttribute);D.isInstancedMesh!==!0&&rt._maxInstanceCount===void 0&&(rt._maxInstanceCount=z.meshPerAttribute*z.count)}else for(let k=0;k<tt.locationSize;k++)v(tt.location+k);n.bindBuffer(n.ARRAY_BUFFER,vt);for(let k=0;k<tt.locationSize;k++)b(tt.location+k,ft/tt.locationSize,Ut,ot,R*Ft,(H+ft/tt.locationSize*k)*Ft,L)}else{if(B.isInstancedBufferAttribute){for(let z=0;z<tt.locationSize;z++)S(tt.location+z,B.meshPerAttribute);D.isInstancedMesh!==!0&&rt._maxInstanceCount===void 0&&(rt._maxInstanceCount=B.meshPerAttribute*B.count)}else for(let z=0;z<tt.locationSize;z++)v(tt.location+z);n.bindBuffer(n.ARRAY_BUFFER,vt);for(let z=0;z<tt.locationSize;z++)b(tt.location+z,ft/tt.locationSize,Ut,ot,ft*Ft,ft/tt.locationSize*z*Ft,L)}}else if(st!==void 0){let ot=st[ht];if(ot!==void 0)switch(ot.length){case 2:n.vertexAttrib2fv(tt.location,ot);break;case 3:n.vertexAttrib3fv(tt.location,ot);break;case 4:n.vertexAttrib4fv(tt.location,ot);break;default:n.vertexAttrib1fv(tt.location,ot)}}}}M()}function E(){F();for(let D in o){let O=o[D];for(let Y in O){let rt=O[Y];for(let it in rt)g(rt[it].object),delete rt[it];delete O[Y]}delete o[D]}}function T(D){if(o[D.id]===void 0)return;let O=o[D.id];for(let Y in O){let rt=O[Y];for(let it in rt)g(rt[it].object),delete rt[it];delete O[Y]}delete o[D.id]}function C(D){for(let O in o){let Y=o[O];if(Y[D.id]===void 0)continue;let rt=Y[D.id];for(let it in rt)g(rt[it].object),delete rt[it];delete Y[D.id]}}function F(){et(),u=!0,c!==l&&(c=l,f(c.object))}function et(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:F,resetDefaultState:et,dispose:E,releaseStatesOfGeometry:T,releaseStatesOfProgram:C,initAttributes:x,enableAttribute:v,disableUnusedAttributes:M}}function g0(n,t,e,i){let s=i.isWebGL2,r;function a(u){r=u}function o(u,d){n.drawArrays(r,u,d),e.update(d,r,1)}function l(u,d,h){if(h===0)return;let f,g;if(s)f=n,g="drawArraysInstanced";else if(f=t.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](r,u,d,h),e.update(d,r,h)}function c(u,d,h){if(h===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<h;g++)this.render(u[g],d[g]);else{f.multiDrawArraysWEBGL(r,u,0,d,0,h);let g=0;for(let _=0;_<h;_++)g+=d[_];e.update(g,r,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function x0(n,t,e){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let b=t.get("EXT_texture_filter_anisotropic");i=n.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(b){if(b==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=typeof WebGL2RenderingContext!="undefined"&&n.constructor.name==="WebGL2RenderingContext",o=e.precision!==void 0?e.precision:"highp",l=r(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);let c=a||t.has("WEBGL_draw_buffers"),u=e.logarithmicDepthBuffer===!0,d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),h=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),_=n.getParameter(n.MAX_VERTEX_ATTRIBS),p=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),m=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),x=h>0,v=a||t.has("OES_texture_float"),S=x&&v,M=a?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:u,maxTextures:d,maxVertexTextures:h,maxTextureSize:f,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:p,maxVaryings:m,maxFragmentUniforms:y,vertexTextures:x,floatFragmentTextures:v,floatVertexTextures:S,maxSamples:M}}function _0(n){let t=this,e=null,i=0,s=!1,r=!1,a=new Ui,o=new $t,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let f=d.length!==0||h||i!==0||s;return s=h,i=d.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){e=u(d,h,0)},this.setState=function(d,h,f){let g=d.clippingPlanes,_=d.clipIntersection,p=d.clipShadows,m=n.get(d);if(!s||g===null||g.length===0||r&&!p)r?u(null):c();else{let y=r?0:i,x=y*4,v=m.clippingState||null;l.value=v,v=u(g,h,x,f);for(let S=0;S!==x;++S)v[S]=e[S];m.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(d,h,f,g){let _=d!==null?d.length:0,p=null;if(_!==0){if(p=l.value,g!==!0||p===null){let m=f+_*4,y=h.matrixWorldInverse;o.getNormalMatrix(y),(p===null||p.length<m)&&(p=new Float32Array(m));for(let x=0,v=f;x!==_;++x,v+=4)a.copy(d[x]).applyMatrix4(y,o),a.normal.toArray(p,v),p[v+3]=a.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}function y0(n){let t=new WeakMap;function e(a,o){return o===_a?a.mapping=Kn:o===ya&&(a.mapping=$n),a}function i(a){if(a&&a.isTexture){let o=a.mapping;if(o===_a||o===ya)if(t.has(a)){let l=t.get(a).texture;return e(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new Ta(l.height/2);return c.fromEquirectangularTexture(n,a),t.set(a,c),a.addEventListener("dispose",s),e(c.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}var es=class extends Hr{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,a=i+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Wn=4,Ic=[.125,.215,.35,.446,.526,.582],un=20,ra=new es,Dc=new qt,oa=null,aa=0,la=0,cn=(1+Math.sqrt(5))/2,Hn=1/cn,Uc=[new I(1,1,1),new I(-1,1,1),new I(1,1,-1),new I(-1,1,-1),new I(0,cn,Hn),new I(0,cn,-Hn),new I(Hn,0,cn),new I(-Hn,0,cn),new I(cn,Hn,0),new I(-cn,Hn,0)],Vr=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){oa=this._renderer.getRenderTarget(),aa=this._renderer.getActiveCubeFace(),la=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=kc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Nc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(oa,aa,la),t.scissorTest=!1,xr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Kn||t.mapping===$n?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),oa=this._renderer.getRenderTarget(),aa=this._renderer.getActiveCubeFace(),la=this._renderer.getActiveMipmapLevel();let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Qe,minFilter:Qe,generateMipmaps:!1,type:mn,format:xi,colorSpace:ki,depthBuffer:!1},s=zc(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zc(t,e,i);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=v0(r)),this._blurMaterial=b0(r,t,e)}return s}_compileMaterial(t){let e=new K(this._lodPlanes[0],t);this._renderer.compile(e,ra)}_sceneToCubeUV(t,e,i,s){let o=new Oe(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,h=u.toneMapping;u.getClearColor(Dc),u.toneMapping=Ji,u.autoClear=!1;let f=new Be({name:"PMREM.Background",side:qe,depthWrite:!1,depthTest:!1}),g=new K(new jt,f),_=!1,p=t.background;p?p.isColor&&(f.color.copy(p),t.background=null,_=!0):(f.color.copy(Dc),_=!0);for(let m=0;m<6;m++){let y=m%3;y===0?(o.up.set(0,l[m],0),o.lookAt(c[m],0,0)):y===1?(o.up.set(0,0,l[m]),o.lookAt(0,c[m],0)):(o.up.set(0,l[m],0),o.lookAt(0,0,c[m]));let x=this._cubeSize;xr(s,y*x,m>2?x:0,x,x),u.setRenderTarget(s),_&&u.render(g,o),u.render(t,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=h,u.autoClear=d,t.background=p}_textureToCubeUV(t,e){let i=this._renderer,s=t.mapping===Kn||t.mapping===$n;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=kc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Nc());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new K(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;let l=this._cubeSize;xr(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,ra)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){let r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Uc[(s-1)%Uc.length];this._blur(t,s-1,s,r,a)}e.autoClear=i}_blur(t,e,i,s,r){let a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,s,"latitudinal",r),this._halfBlur(a,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,d=new K(this._lodPlanes[s],c),h=c.uniforms,f=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*un-1),_=r/g,p=isFinite(r)?1+Math.floor(u*_):un;p>un&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${un}`);let m=[],y=0;for(let b=0;b<un;++b){let U=b/_,E=Math.exp(-U*U/2);m.push(E),b===0?y+=E:b<p&&(y+=2*E)}for(let b=0;b<m.length;b++)m[b]=m[b]/y;h.envMap.value=t.texture,h.samples.value=p,h.weights.value=m,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);let{_lodMax:x}=this;h.dTheta.value=g,h.mipInt.value=x-i;let v=this._sizeLods[s],S=3*v*(s>x-Wn?s-x+Wn:0),M=4*(this._cubeSize-v);xr(e,S,M,3*v,2*v),l.setRenderTarget(e),l.render(d,ra)}};function v0(n){let t=[],e=[],i=[],s=n,r=n-Wn+1+Ic.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);e.push(o);let l=1/o;a>n-Wn?l=Ic[a-n+Wn-1]:a===0&&(l=0),i.push(l);let c=1/(o-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,g=6,_=3,p=2,m=1,y=new Float32Array(_*g*f),x=new Float32Array(p*g*f),v=new Float32Array(m*g*f);for(let M=0;M<f;M++){let b=M%3*2/3-1,U=M>2?0:-1,E=[b,U,0,b+2/3,U,0,b+2/3,U+1,0,b,U,0,b+2/3,U+1,0,b,U+1,0];y.set(E,_*g*M),x.set(h,p*g*M);let T=[M,M,M,M,M,M];v.set(T,m*g*M)}let S=new we;S.setAttribute("position",new Ce(y,_)),S.setAttribute("uv",new Ce(x,p)),S.setAttribute("faceIndex",new Ce(v,m)),t.push(S),s>Wn&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function zc(n,t,e){let i=new yi(n,t,e);return i.texture.mapping=co,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function xr(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function b0(n,t,e){let i=new Float32Array(un),s=new I(0,1,0);return new $e({name:"SphericalGaussianBlur",defines:{n:un,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:cl(),fragmentShader:`

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
		`,blending:Ei,depthTest:!1,depthWrite:!1})}function Nc(){return new $e({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:cl(),fragmentShader:`

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
		`,blending:Ei,depthTest:!1,depthWrite:!1})}function kc(){return new $e({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:cl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ei,depthTest:!1,depthWrite:!1})}function cl(){return`

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
	`}function M0(n){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){let l=o.mapping,c=l===_a||l===ya,u=l===Kn||l===$n;if(c||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let d=t.get(o);return e===null&&(e=new Vr(n)),d=c?e.fromEquirectangular(o,d):e.fromCubemap(o,d),t.set(o,d),d.texture}else{if(t.has(o))return t.get(o).texture;{let d=o.image;if(c&&d&&d.height>0||u&&d&&s(d)){e===null&&(e=new Vr(n));let h=c?e.fromEquirectangular(o):e.fromCubemap(o);return t.set(o,h),o.addEventListener("dispose",r),h.texture}else return null}}}return o}function s(o){let l=0,c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:a}}function E0(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(i){i.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(i){let s=e(i);return s===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function w0(n,t,e,i){let s={},r=new WeakMap;function a(d){let h=d.target;h.index!==null&&t.remove(h.index);for(let g in h.attributes)t.remove(h.attributes[g]);for(let g in h.morphAttributes){let _=h.morphAttributes[g];for(let p=0,m=_.length;p<m;p++)t.remove(_[p])}h.removeEventListener("dispose",a),delete s[h.id];let f=r.get(h);f&&(t.remove(f),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function o(d,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,e.memory.geometries++),h}function l(d){let h=d.attributes;for(let g in h)t.update(h[g],n.ARRAY_BUFFER);let f=d.morphAttributes;for(let g in f){let _=f[g];for(let p=0,m=_.length;p<m;p++)t.update(_[p],n.ARRAY_BUFFER)}}function c(d){let h=[],f=d.index,g=d.attributes.position,_=0;if(f!==null){let y=f.array;_=f.version;for(let x=0,v=y.length;x<v;x+=3){let S=y[x+0],M=y[x+1],b=y[x+2];h.push(S,M,M,b,b,S)}}else if(g!==void 0){let y=g.array;_=g.version;for(let x=0,v=y.length/3-1;x<v;x+=3){let S=x+0,M=x+1,b=x+2;h.push(S,M,M,b,b,S)}}else return;let p=new(Ch(h)?Br:Or)(h,1);p.version=_;let m=r.get(d);m&&t.remove(m),r.set(d,p)}function u(d){let h=r.get(d);if(h){let f=d.index;f!==null&&h.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function S0(n,t,e,i){let s=i.isWebGL2,r;function a(f){r=f}let o,l;function c(f){o=f.type,l=f.bytesPerElement}function u(f,g){n.drawElements(r,g,o,f*l),e.update(g,r,1)}function d(f,g,_){if(_===0)return;let p,m;if(s)p=n,m="drawElementsInstanced";else if(p=t.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[m](r,g,o,f*l,_),e.update(g,r,_)}function h(f,g,_){if(_===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<_;m++)this.render(f[m]/l,g[m]);else{p.multiDrawElementsWEBGL(r,g,0,o,f,0,_);let m=0;for(let y=0;y<_;y++)m+=g[y];e.update(m,r,1)}}this.setMode=a,this.setIndex=c,this.render=u,this.renderInstances=d,this.renderMultiDraw=h}function T0(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function A0(n,t){return n[0]-t[0]}function R0(n,t){return Math.abs(t[1])-Math.abs(n[1])}function C0(n,t,e){let i={},s=new Float32Array(8),r=new WeakMap,a=new _e,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,u,d){let h=c.morphTargetInfluences;if(t.isWebGL2===!0){let f=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,g=f!==void 0?f.length:0,_=r.get(u);if(_===void 0||_.count!==g){let D=function(){F.dispose(),r.delete(u),u.removeEventListener("dispose",D)};_!==void 0&&_.texture.dispose();let y=u.morphAttributes.position!==void 0,x=u.morphAttributes.normal!==void 0,v=u.morphAttributes.color!==void 0,S=u.morphAttributes.position||[],M=u.morphAttributes.normal||[],b=u.morphAttributes.color||[],U=0;y===!0&&(U=1),x===!0&&(U=2),v===!0&&(U=3);let E=u.attributes.position.count*U,T=1;E>t.maxTextureSize&&(T=Math.ceil(E/t.maxTextureSize),E=t.maxTextureSize);let C=new Float32Array(E*T*4*g),F=new kr(C,E,T,g);F.type=Zi,F.needsUpdate=!0;let et=U*4;for(let O=0;O<g;O++){let Y=S[O],rt=M[O],it=b[O],Z=E*T*4*O;for(let st=0;st<Y.count;st++){let ht=st*et;y===!0&&(a.fromBufferAttribute(Y,st),C[Z+ht+0]=a.x,C[Z+ht+1]=a.y,C[Z+ht+2]=a.z,C[Z+ht+3]=0),x===!0&&(a.fromBufferAttribute(rt,st),C[Z+ht+4]=a.x,C[Z+ht+5]=a.y,C[Z+ht+6]=a.z,C[Z+ht+7]=0),v===!0&&(a.fromBufferAttribute(it,st),C[Z+ht+8]=a.x,C[Z+ht+9]=a.y,C[Z+ht+10]=a.z,C[Z+ht+11]=it.itemSize===4?a.w:1)}}_={count:g,texture:F,size:new _t(E,T)},r.set(u,_),u.addEventListener("dispose",D)}let p=0;for(let y=0;y<h.length;y++)p+=h[y];let m=u.morphTargetsRelative?1:1-p;d.getUniforms().setValue(n,"morphTargetBaseInfluence",m),d.getUniforms().setValue(n,"morphTargetInfluences",h),d.getUniforms().setValue(n,"morphTargetsTexture",_.texture,e),d.getUniforms().setValue(n,"morphTargetsTextureSize",_.size)}else{let f=h===void 0?0:h.length,g=i[u.id];if(g===void 0||g.length!==f){g=[];for(let x=0;x<f;x++)g[x]=[x,0];i[u.id]=g}for(let x=0;x<f;x++){let v=g[x];v[0]=x,v[1]=h[x]}g.sort(R0);for(let x=0;x<8;x++)x<f&&g[x][1]?(o[x][0]=g[x][0],o[x][1]=g[x][1]):(o[x][0]=Number.MAX_SAFE_INTEGER,o[x][1]=0);o.sort(A0);let _=u.morphAttributes.position,p=u.morphAttributes.normal,m=0;for(let x=0;x<8;x++){let v=o[x],S=v[0],M=v[1];S!==Number.MAX_SAFE_INTEGER&&M?(_&&u.getAttribute("morphTarget"+x)!==_[S]&&u.setAttribute("morphTarget"+x,_[S]),p&&u.getAttribute("morphNormal"+x)!==p[S]&&u.setAttribute("morphNormal"+x,p[S]),s[x]=M,m+=M):(_&&u.hasAttribute("morphTarget"+x)===!0&&u.deleteAttribute("morphTarget"+x),p&&u.hasAttribute("morphNormal"+x)===!0&&u.deleteAttribute("morphNormal"+x),s[x]=0)}let y=u.morphTargetsRelative?1:1-m;d.getUniforms().setValue(n,"morphTargetBaseInfluence",y),d.getUniforms().setValue(n,"morphTargetInfluences",s)}}return{update:l}}function P0(n,t,e,i){let s=new WeakMap;function r(l){let c=i.render.frame,u=l.geometry,d=t.get(l,u);if(s.get(d)!==c&&(t.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return d}function a(){s=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:a}}var Wr=class extends ci{constructor(t,e,i,s,r,a,o,l,c,u){if(u=u!==void 0?u:fn,u!==fn&&u!==jn)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===fn&&(i=Yi),i===void 0&&u===jn&&(i=dn),super(null,s,r,a,o,l,u,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Ne,this.minFilter=l!==void 0?l:Ne,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},Dh=new ci,Uh=new Wr(1,1);Uh.compareFunction=Rh;var zh=new kr,Nh=new wa,kh=new Gr,Fc=[],Oc=[],Bc=new Float32Array(16),Hc=new Float32Array(9),Gc=new Float32Array(4);function os(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=Fc[s];if(r===void 0&&(r=new Float32Array(s),Fc[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function Pe(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Le(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function uo(n,t){let e=Oc[t];e===void 0&&(e=new Int32Array(t),Oc[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function L0(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function I0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;n.uniform2fv(this.addr,t),Le(e,t)}}function D0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Pe(e,t))return;n.uniform3fv(this.addr,t),Le(e,t)}}function U0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;n.uniform4fv(this.addr,t),Le(e,t)}}function z0(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Pe(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Le(e,t)}else{if(Pe(e,i))return;Gc.set(i),n.uniformMatrix2fv(this.addr,!1,Gc),Le(e,i)}}function N0(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Pe(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Le(e,t)}else{if(Pe(e,i))return;Hc.set(i),n.uniformMatrix3fv(this.addr,!1,Hc),Le(e,i)}}function k0(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Pe(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Le(e,t)}else{if(Pe(e,i))return;Bc.set(i),n.uniformMatrix4fv(this.addr,!1,Bc),Le(e,i)}}function F0(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function O0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;n.uniform2iv(this.addr,t),Le(e,t)}}function B0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Pe(e,t))return;n.uniform3iv(this.addr,t),Le(e,t)}}function H0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;n.uniform4iv(this.addr,t),Le(e,t)}}function G0(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function V0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;n.uniform2uiv(this.addr,t),Le(e,t)}}function W0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Pe(e,t))return;n.uniform3uiv(this.addr,t),Le(e,t)}}function X0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;n.uniform4uiv(this.addr,t),Le(e,t)}}function q0(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r=this.type===n.SAMPLER_2D_SHADOW?Uh:Dh;e.setTexture2D(t||r,s)}function Y0(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Nh,s)}function Z0(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||kh,s)}function J0(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||zh,s)}function K0(n){switch(n){case 5126:return L0;case 35664:return I0;case 35665:return D0;case 35666:return U0;case 35674:return z0;case 35675:return N0;case 35676:return k0;case 5124:case 35670:return F0;case 35667:case 35671:return O0;case 35668:case 35672:return B0;case 35669:case 35673:return H0;case 5125:return G0;case 36294:return V0;case 36295:return W0;case 36296:return X0;case 35678:case 36198:case 36298:case 36306:case 35682:return q0;case 35679:case 36299:case 36307:return Y0;case 35680:case 36300:case 36308:case 36293:return Z0;case 36289:case 36303:case 36311:case 36292:return J0}}function $0(n,t){n.uniform1fv(this.addr,t)}function j0(n,t){let e=os(t,this.size,2);n.uniform2fv(this.addr,e)}function Q0(n,t){let e=os(t,this.size,3);n.uniform3fv(this.addr,e)}function tm(n,t){let e=os(t,this.size,4);n.uniform4fv(this.addr,e)}function em(n,t){let e=os(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function im(n,t){let e=os(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function nm(n,t){let e=os(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function sm(n,t){n.uniform1iv(this.addr,t)}function rm(n,t){n.uniform2iv(this.addr,t)}function om(n,t){n.uniform3iv(this.addr,t)}function am(n,t){n.uniform4iv(this.addr,t)}function lm(n,t){n.uniform1uiv(this.addr,t)}function cm(n,t){n.uniform2uiv(this.addr,t)}function hm(n,t){n.uniform3uiv(this.addr,t)}function um(n,t){n.uniform4uiv(this.addr,t)}function dm(n,t,e){let i=this.cache,s=t.length,r=uo(e,s);Pe(i,r)||(n.uniform1iv(this.addr,r),Le(i,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||Dh,r[a])}function fm(n,t,e){let i=this.cache,s=t.length,r=uo(e,s);Pe(i,r)||(n.uniform1iv(this.addr,r),Le(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Nh,r[a])}function pm(n,t,e){let i=this.cache,s=t.length,r=uo(e,s);Pe(i,r)||(n.uniform1iv(this.addr,r),Le(i,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||kh,r[a])}function mm(n,t,e){let i=this.cache,s=t.length,r=uo(e,s);Pe(i,r)||(n.uniform1iv(this.addr,r),Le(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||zh,r[a])}function gm(n){switch(n){case 5126:return $0;case 35664:return j0;case 35665:return Q0;case 35666:return tm;case 35674:return em;case 35675:return im;case 35676:return nm;case 5124:case 35670:return sm;case 35667:case 35671:return rm;case 35668:case 35672:return om;case 35669:case 35673:return am;case 5125:return lm;case 36294:return cm;case 36295:return hm;case 36296:return um;case 35678:case 36198:case 36298:case 36306:case 35682:return dm;case 35679:case 36299:case 36307:return fm;case 35680:case 36300:case 36308:case 36293:return pm;case 36289:case 36303:case 36311:case 36292:return mm}}var Aa=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=K0(e.type)}},Ra=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=gm(e.type)}},Ca=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],i)}}},ca=/(\w+)(\])?(\[|\.)?/g;function Vc(n,t){n.seq.push(t),n.map[t.id]=t}function xm(n,t,e){let i=n.name,s=i.length;for(ca.lastIndex=0;;){let r=ca.exec(i),a=ca.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Vc(e,c===void 0?new Aa(o,n,t):new Ra(o,n,t));break}else{let d=e.map[o];d===void 0&&(d=new Ca(o),Vc(e,d)),e=d}}}var Jn=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);xm(r,a,this)}}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&i.push(a)}return i}};function Wc(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var _m=37297,ym=0;function vm(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}function bm(n){let t=le.getPrimaries(le.workingColorSpace),e=le.getPrimaries(n),i;switch(t===e?i="":t===Lr&&e===Pr?i="LinearDisplayP3ToLinearSRGB":t===Pr&&e===Lr&&(i="LinearSRGBToLinearDisplayP3"),n){case ki:case ho:return[i,"LinearTransferOETF"];case pe:case al:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Xc(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+vm(n.getShaderSource(t),a)}else return s}function Mm(n,t){let e=bm(t);return`vec4 ${n}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Em(n,t){let e;switch(t){case Gu:e="Linear";break;case Vu:e="Reinhard";break;case Wu:e="OptimizedCineon";break;case rl:e="ACESFilmic";break;case qu:e="AgX";break;case Xu:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function wm(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Xn).join(`
`)}function Sm(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Xn).join(`
`)}function Tm(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Am(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function Xn(n){return n!==""}function qc(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Yc(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Rm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Pa(n){return n.replace(Rm,Pm)}var Cm=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Pm(n,t){let e=Zt[t];if(e===void 0){let i=Cm.get(t);if(i!==void 0)e=Zt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Pa(e)}var Lm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Zc(n){return n.replace(Lm,Im)}function Im(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Jc(n){let t="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Dm(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===gh?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===gu?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Di&&(t="SHADOWMAP_TYPE_VSM"),t}function Um(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Kn:case $n:t="ENVMAP_TYPE_CUBE";break;case co:t="ENVMAP_TYPE_CUBE_UV";break}return t}function zm(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case $n:t="ENVMAP_MODE_REFRACTION";break}return t}function Nm(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case xh:t="ENVMAP_BLENDING_MULTIPLY";break;case Bu:t="ENVMAP_BLENDING_MIX";break;case Hu:t="ENVMAP_BLENDING_ADD";break}return t}function km(n){let t=n.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function Fm(n,t,e,i){let s=n.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=Dm(e),c=Um(e),u=zm(e),d=Nm(e),h=km(e),f=e.isWebGL2?"":wm(e),g=Sm(e),_=Tm(r),p=s.createProgram(),m,y,x=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Xn).join(`
`),m.length>0&&(m+=`
`),y=[f,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Xn).join(`
`),y.length>0&&(y+=`
`)):(m=[Jc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Xn).join(`
`),y=[f,Jc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ji?"#define TONE_MAPPING":"",e.toneMapping!==Ji?Zt.tonemapping_pars_fragment:"",e.toneMapping!==Ji?Em("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Zt.colorspace_pars_fragment,Mm("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Xn).join(`
`)),a=Pa(a),a=qc(a,e),a=Yc(a,e),o=Pa(o),o=qc(o,e),o=Yc(o,e),a=Zc(a),o=Zc(o),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,y=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===pc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===pc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);let v=x+m+a,S=x+y+o,M=Wc(s,s.VERTEX_SHADER,v),b=Wc(s,s.FRAGMENT_SHADER,S);s.attachShader(p,M),s.attachShader(p,b),e.index0AttributeName!==void 0?s.bindAttribLocation(p,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function U(F){if(n.debug.checkShaderErrors){let et=s.getProgramInfoLog(p).trim(),D=s.getShaderInfoLog(M).trim(),O=s.getShaderInfoLog(b).trim(),Y=!0,rt=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(Y=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,p,M,b);else{let it=Xc(s,M,"vertex"),Z=Xc(s,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Program Info Log: `+et+`
`+it+`
`+Z)}else et!==""?console.warn("THREE.WebGLProgram: Program Info Log:",et):(D===""||O==="")&&(rt=!1);rt&&(F.diagnostics={runnable:Y,programLog:et,vertexShader:{log:D,prefix:m},fragmentShader:{log:O,prefix:y}})}s.deleteShader(M),s.deleteShader(b),E=new Jn(s,p),T=Am(s,p)}let E;this.getUniforms=function(){return E===void 0&&U(this),E};let T;this.getAttributes=function(){return T===void 0&&U(this),T};let C=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=s.getProgramParameter(p,_m)),C},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=ym++,this.cacheKey=t,this.usedTimes=1,this.program=p,this.vertexShader=M,this.fragmentShader=b,this}var Om=0,La=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new Ia(t),e.set(t,i)),i}},Ia=class{constructor(t){this.id=Om++,this.code=t,this.usedTimes=0}};function Bm(n,t,e,i,s,r,a){let o=new Fr,l=new La,c=[],u=s.isWebGL2,d=s.logarithmicDepthBuffer,h=s.vertexTextures,f=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return E===0?"uv":`uv${E}`}function p(E,T,C,F,et){let D=F.fog,O=et.geometry,Y=E.isMeshStandardMaterial?F.environment:null,rt=(E.isMeshStandardMaterial?e:t).get(E.envMap||Y),it=rt&&rt.mapping===co?rt.image.height:null,Z=g[E.type];E.precision!==null&&(f=s.getMaxPrecision(E.precision),f!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",f,"instead."));let st=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,ht=st!==void 0?st.length:0,tt=0;O.morphAttributes.position!==void 0&&(tt=1),O.morphAttributes.normal!==void 0&&(tt=2),O.morphAttributes.color!==void 0&&(tt=3);let B,ot,ft,mt;if(Z){let Ze=Mi[Z];B=Ze.vertexShader,ot=Ze.fragmentShader}else B=E.vertexShader,ot=E.fragmentShader,l.update(E),ft=l.getVertexShaderID(E),mt=l.getFragmentShaderID(E);let vt=n.getRenderTarget(),Ut=et.isInstancedMesh===!0,Ft=et.isBatchedMesh===!0,L=!!E.map,z=!!E.matcap,R=!!rt,H=!!E.aoMap,k=!!E.lightMap,q=!!E.bumpMap,G=!!E.normalMap,gt=!!E.displacementMap,bt=!!E.emissiveMap,A=!!E.metalnessMap,w=!!E.roughnessMap,W=E.anisotropy>0,ct=E.clearcoat>0,lt=E.iridescence>0,at=E.sheen>0,Ct=E.transmission>0,Mt=W&&!!E.anisotropyMap,Tt=ct&&!!E.clearcoatMap,Dt=ct&&!!E.clearcoatNormalMap,Ht=ct&&!!E.clearcoatRoughnessMap,ut=lt&&!!E.iridescenceMap,ne=lt&&!!E.iridescenceThicknessMap,Yt=at&&!!E.sheenColorMap,Nt=at&&!!E.sheenRoughnessMap,zt=!!E.specularMap,Pt=!!E.specularColorMap,Gt=!!E.specularIntensityMap,se=Ct&&!!E.transmissionMap,de=Ct&&!!E.thicknessMap,Vt=!!E.gradientMap,xt=!!E.alphaMap,N=E.alphaTest>0,Et=!!E.alphaHash,V=!!E.extensions,j=!!O.attributes.uv1,At=!!O.attributes.uv2,re=!!O.attributes.uv3,he=Ji;return E.toneMapped&&(vt===null||vt.isXRRenderTarget===!0)&&(he=n.toneMapping),{isWebGL2:u,shaderID:Z,shaderType:E.type,shaderName:E.name,vertexShader:B,fragmentShader:ot,defines:E.defines,customVertexShaderID:ft,customFragmentShaderID:mt,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:f,batching:Ft,instancing:Ut,instancingColor:Ut&&et.instanceColor!==null,supportsVertexTextures:h,outputColorSpace:vt===null?n.outputColorSpace:vt.isXRRenderTarget===!0?vt.texture.colorSpace:ki,map:L,matcap:z,envMap:R,envMapMode:R&&rt.mapping,envMapCubeUVHeight:it,aoMap:H,lightMap:k,bumpMap:q,normalMap:G,displacementMap:h&&gt,emissiveMap:bt,normalMapObjectSpace:G&&E.normalMapType===sd,normalMapTangentSpace:G&&E.normalMapType===Ah,metalnessMap:A,roughnessMap:w,anisotropy:W,anisotropyMap:Mt,clearcoat:ct,clearcoatMap:Tt,clearcoatNormalMap:Dt,clearcoatRoughnessMap:Ht,iridescence:lt,iridescenceMap:ut,iridescenceThicknessMap:ne,sheen:at,sheenColorMap:Yt,sheenRoughnessMap:Nt,specularMap:zt,specularColorMap:Pt,specularIntensityMap:Gt,transmission:Ct,transmissionMap:se,thicknessMap:de,gradientMap:Vt,opaque:E.transparent===!1&&E.blending===Yn,alphaMap:xt,alphaTest:N,alphaHash:Et,combine:E.combine,mapUv:L&&_(E.map.channel),aoMapUv:H&&_(E.aoMap.channel),lightMapUv:k&&_(E.lightMap.channel),bumpMapUv:q&&_(E.bumpMap.channel),normalMapUv:G&&_(E.normalMap.channel),displacementMapUv:gt&&_(E.displacementMap.channel),emissiveMapUv:bt&&_(E.emissiveMap.channel),metalnessMapUv:A&&_(E.metalnessMap.channel),roughnessMapUv:w&&_(E.roughnessMap.channel),anisotropyMapUv:Mt&&_(E.anisotropyMap.channel),clearcoatMapUv:Tt&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:Dt&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ht&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:ut&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:ne&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:Yt&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:Nt&&_(E.sheenRoughnessMap.channel),specularMapUv:zt&&_(E.specularMap.channel),specularColorMapUv:Pt&&_(E.specularColorMap.channel),specularIntensityMapUv:Gt&&_(E.specularIntensityMap.channel),transmissionMapUv:se&&_(E.transmissionMap.channel),thicknessMapUv:de&&_(E.thicknessMap.channel),alphaMapUv:xt&&_(E.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(G||W),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,vertexUv1s:j,vertexUv2s:At,vertexUv3s:re,pointsUvs:et.isPoints===!0&&!!O.attributes.uv&&(L||xt),fog:!!D,useFog:E.fog===!0,fogExp2:D&&D.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:et.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:ht,morphTextureStride:tt,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:E.dithering,shadowMapEnabled:n.shadowMap.enabled&&C.length>0,shadowMapType:n.shadowMap.type,toneMapping:he,useLegacyLights:n._useLegacyLights,decodeVideoTexture:L&&E.map.isVideoTexture===!0&&le.getTransfer(E.map.colorSpace)===fe,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===ae,flipSided:E.side===qe,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionDerivatives:V&&E.extensions.derivatives===!0,extensionFragDepth:V&&E.extensions.fragDepth===!0,extensionDrawBuffers:V&&E.extensions.drawBuffers===!0,extensionShaderTextureLOD:V&&E.extensions.shaderTextureLOD===!0,extensionClipCullDistance:V&&E.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()}}function m(E){let T=[];if(E.shaderID?T.push(E.shaderID):(T.push(E.customVertexShaderID),T.push(E.customFragmentShaderID)),E.defines!==void 0)for(let C in E.defines)T.push(C),T.push(E.defines[C]);return E.isRawShaderMaterial===!1&&(y(T,E),x(T,E),T.push(n.outputColorSpace)),T.push(E.customProgramCacheKey),T.join()}function y(E,T){E.push(T.precision),E.push(T.outputColorSpace),E.push(T.envMapMode),E.push(T.envMapCubeUVHeight),E.push(T.mapUv),E.push(T.alphaMapUv),E.push(T.lightMapUv),E.push(T.aoMapUv),E.push(T.bumpMapUv),E.push(T.normalMapUv),E.push(T.displacementMapUv),E.push(T.emissiveMapUv),E.push(T.metalnessMapUv),E.push(T.roughnessMapUv),E.push(T.anisotropyMapUv),E.push(T.clearcoatMapUv),E.push(T.clearcoatNormalMapUv),E.push(T.clearcoatRoughnessMapUv),E.push(T.iridescenceMapUv),E.push(T.iridescenceThicknessMapUv),E.push(T.sheenColorMapUv),E.push(T.sheenRoughnessMapUv),E.push(T.specularMapUv),E.push(T.specularColorMapUv),E.push(T.specularIntensityMapUv),E.push(T.transmissionMapUv),E.push(T.thicknessMapUv),E.push(T.combine),E.push(T.fogExp2),E.push(T.sizeAttenuation),E.push(T.morphTargetsCount),E.push(T.morphAttributeCount),E.push(T.numDirLights),E.push(T.numPointLights),E.push(T.numSpotLights),E.push(T.numSpotLightMaps),E.push(T.numHemiLights),E.push(T.numRectAreaLights),E.push(T.numDirLightShadows),E.push(T.numPointLightShadows),E.push(T.numSpotLightShadows),E.push(T.numSpotLightShadowsWithMaps),E.push(T.numLightProbes),E.push(T.shadowMapType),E.push(T.toneMapping),E.push(T.numClippingPlanes),E.push(T.numClipIntersection),E.push(T.depthPacking)}function x(E,T){o.disableAll(),T.isWebGL2&&o.enable(0),T.supportsVertexTextures&&o.enable(1),T.instancing&&o.enable(2),T.instancingColor&&o.enable(3),T.matcap&&o.enable(4),T.envMap&&o.enable(5),T.normalMapObjectSpace&&o.enable(6),T.normalMapTangentSpace&&o.enable(7),T.clearcoat&&o.enable(8),T.iridescence&&o.enable(9),T.alphaTest&&o.enable(10),T.vertexColors&&o.enable(11),T.vertexAlphas&&o.enable(12),T.vertexUv1s&&o.enable(13),T.vertexUv2s&&o.enable(14),T.vertexUv3s&&o.enable(15),T.vertexTangents&&o.enable(16),T.anisotropy&&o.enable(17),T.alphaHash&&o.enable(18),T.batching&&o.enable(19),E.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.skinning&&o.enable(4),T.morphTargets&&o.enable(5),T.morphNormals&&o.enable(6),T.morphColors&&o.enable(7),T.premultipliedAlpha&&o.enable(8),T.shadowMapEnabled&&o.enable(9),T.useLegacyLights&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),E.push(o.mask)}function v(E){let T=g[E.type],C;if(T){let F=Mi[T];C=ll.clone(F.uniforms)}else C=E.uniforms;return C}function S(E,T){let C;for(let F=0,et=c.length;F<et;F++){let D=c[F];if(D.cacheKey===T){C=D,++C.usedTimes;break}}return C===void 0&&(C=new Fm(n,T,E,r),c.push(C)),C}function M(E){if(--E.usedTimes===0){let T=c.indexOf(E);c[T]=c[c.length-1],c.pop(),E.destroy()}}function b(E){l.remove(E)}function U(){l.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:v,acquireProgram:S,releaseProgram:M,releaseShaderCache:b,programs:c,dispose:U}}function Hm(){let n=new WeakMap;function t(r){let a=n.get(r);return a===void 0&&(a={},n.set(r,a)),a}function e(r){n.delete(r)}function i(r,a,o){n.get(r)[a]=o}function s(){n=new WeakMap}return{get:t,remove:e,update:i,dispose:s}}function Gm(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Kc(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function $c(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(d,h,f,g,_,p){let m=n[t];return m===void 0?(m={id:d.id,object:d,geometry:h,material:f,groupOrder:g,renderOrder:d.renderOrder,z:_,group:p},n[t]=m):(m.id=d.id,m.object=d,m.geometry=h,m.material=f,m.groupOrder=g,m.renderOrder=d.renderOrder,m.z=_,m.group=p),t++,m}function o(d,h,f,g,_,p){let m=a(d,h,f,g,_,p);f.transmission>0?i.push(m):f.transparent===!0?s.push(m):e.push(m)}function l(d,h,f,g,_,p){let m=a(d,h,f,g,_,p);f.transmission>0?i.unshift(m):f.transparent===!0?s.unshift(m):e.unshift(m)}function c(d,h){e.length>1&&e.sort(d||Gm),i.length>1&&i.sort(h||Kc),s.length>1&&s.sort(h||Kc)}function u(){for(let d=t,h=n.length;d<h;d++){let f=n[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:o,unshift:l,finish:u,sort:c}}function Vm(){let n=new WeakMap;function t(i,s){let r=n.get(i),a;return r===void 0?(a=new $c,n.set(i,[a])):s>=r.length?(a=new $c,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function Wm(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new I,color:new qt};break;case"SpotLight":e={position:new I,direction:new I,color:new qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new qt,groundColor:new qt};break;case"RectAreaLight":e={color:new qt,position:new I,halfWidth:new I,halfHeight:new I};break}return n[t.id]=e,e}}}function Xm(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var qm=0;function Ym(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function Zm(n,t){let e=new Wm,i=Xm(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)s.probe.push(new I);let r=new I,a=new ce,o=new ce;function l(u,d){let h=0,f=0,g=0;for(let F=0;F<9;F++)s.probe[F].set(0,0,0);let _=0,p=0,m=0,y=0,x=0,v=0,S=0,M=0,b=0,U=0,E=0;u.sort(Ym);let T=d===!0?Math.PI:1;for(let F=0,et=u.length;F<et;F++){let D=u[F],O=D.color,Y=D.intensity,rt=D.distance,it=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=O.r*Y*T,f+=O.g*Y*T,g+=O.b*Y*T;else if(D.isLightProbe){for(let Z=0;Z<9;Z++)s.probe[Z].addScaledVector(D.sh.coefficients[Z],Y);E++}else if(D.isDirectionalLight){let Z=e.get(D);if(Z.color.copy(D.color).multiplyScalar(D.intensity*T),D.castShadow){let st=D.shadow,ht=i.get(D);ht.shadowBias=st.bias,ht.shadowNormalBias=st.normalBias,ht.shadowRadius=st.radius,ht.shadowMapSize=st.mapSize,s.directionalShadow[_]=ht,s.directionalShadowMap[_]=it,s.directionalShadowMatrix[_]=D.shadow.matrix,v++}s.directional[_]=Z,_++}else if(D.isSpotLight){let Z=e.get(D);Z.position.setFromMatrixPosition(D.matrixWorld),Z.color.copy(O).multiplyScalar(Y*T),Z.distance=rt,Z.coneCos=Math.cos(D.angle),Z.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),Z.decay=D.decay,s.spot[m]=Z;let st=D.shadow;if(D.map&&(s.spotLightMap[b]=D.map,b++,st.updateMatrices(D),D.castShadow&&U++),s.spotLightMatrix[m]=st.matrix,D.castShadow){let ht=i.get(D);ht.shadowBias=st.bias,ht.shadowNormalBias=st.normalBias,ht.shadowRadius=st.radius,ht.shadowMapSize=st.mapSize,s.spotShadow[m]=ht,s.spotShadowMap[m]=it,M++}m++}else if(D.isRectAreaLight){let Z=e.get(D);Z.color.copy(O).multiplyScalar(Y),Z.halfWidth.set(D.width*.5,0,0),Z.halfHeight.set(0,D.height*.5,0),s.rectArea[y]=Z,y++}else if(D.isPointLight){let Z=e.get(D);if(Z.color.copy(D.color).multiplyScalar(D.intensity*T),Z.distance=D.distance,Z.decay=D.decay,D.castShadow){let st=D.shadow,ht=i.get(D);ht.shadowBias=st.bias,ht.shadowNormalBias=st.normalBias,ht.shadowRadius=st.radius,ht.shadowMapSize=st.mapSize,ht.shadowCameraNear=st.camera.near,ht.shadowCameraFar=st.camera.far,s.pointShadow[p]=ht,s.pointShadowMap[p]=it,s.pointShadowMatrix[p]=D.shadow.matrix,S++}s.point[p]=Z,p++}else if(D.isHemisphereLight){let Z=e.get(D);Z.skyColor.copy(D.color).multiplyScalar(Y*T),Z.groundColor.copy(D.groundColor).multiplyScalar(Y*T),s.hemi[x]=Z,x++}}y>0&&(t.isWebGL2?n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=yt.LTC_FLOAT_1,s.rectAreaLTC2=yt.LTC_FLOAT_2):(s.rectAreaLTC1=yt.LTC_HALF_1,s.rectAreaLTC2=yt.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=yt.LTC_FLOAT_1,s.rectAreaLTC2=yt.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=yt.LTC_HALF_1,s.rectAreaLTC2=yt.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=h,s.ambient[1]=f,s.ambient[2]=g;let C=s.hash;(C.directionalLength!==_||C.pointLength!==p||C.spotLength!==m||C.rectAreaLength!==y||C.hemiLength!==x||C.numDirectionalShadows!==v||C.numPointShadows!==S||C.numSpotShadows!==M||C.numSpotMaps!==b||C.numLightProbes!==E)&&(s.directional.length=_,s.spot.length=m,s.rectArea.length=y,s.point.length=p,s.hemi.length=x,s.directionalShadow.length=v,s.directionalShadowMap.length=v,s.pointShadow.length=S,s.pointShadowMap.length=S,s.spotShadow.length=M,s.spotShadowMap.length=M,s.directionalShadowMatrix.length=v,s.pointShadowMatrix.length=S,s.spotLightMatrix.length=M+b-U,s.spotLightMap.length=b,s.numSpotLightShadowsWithMaps=U,s.numLightProbes=E,C.directionalLength=_,C.pointLength=p,C.spotLength=m,C.rectAreaLength=y,C.hemiLength=x,C.numDirectionalShadows=v,C.numPointShadows=S,C.numSpotShadows=M,C.numSpotMaps=b,C.numLightProbes=E,s.version=qm++)}function c(u,d){let h=0,f=0,g=0,_=0,p=0,m=d.matrixWorldInverse;for(let y=0,x=u.length;y<x;y++){let v=u[y];if(v.isDirectionalLight){let S=s.directional[h];S.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),h++}else if(v.isSpotLight){let S=s.spot[g];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),g++}else if(v.isRectAreaLight){let S=s.rectArea[_];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(m),o.identity(),a.copy(v.matrixWorld),a.premultiply(m),o.extractRotation(a),S.halfWidth.set(v.width*.5,0,0),S.halfHeight.set(0,v.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),_++}else if(v.isPointLight){let S=s.point[f];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(m),f++}else if(v.isHemisphereLight){let S=s.hemi[p];S.direction.setFromMatrixPosition(v.matrixWorld),S.direction.transformDirection(m),p++}}}return{setup:l,setupView:c,state:s}}function jc(n,t){let e=new Zm(n,t),i=[],s=[];function r(){i.length=0,s.length=0}function a(d){i.push(d)}function o(d){s.push(d)}function l(d){e.setup(i,d)}function c(d){e.setupView(i,d)}return{init:r,state:{lightsArray:i,shadowsArray:s,lights:e},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function Jm(n,t){let e=new WeakMap;function i(r,a=0){let o=e.get(r),l;return o===void 0?(l=new jc(n,t),e.set(r,[l])):a>=o.length?(l=new jc(n,t),o.push(l)):l=o[a],l}function s(){e=new WeakMap}return{get:i,dispose:s}}var Da=class extends Oi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=id,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Ua=class extends Oi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},Km=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$m=`uniform sampler2D shadow_pass;
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
}`;function jm(n,t,e){let i=new Rs,s=new _t,r=new _t,a=new _e,o=new Da({depthPacking:nd}),l=new Ua,c={},u=e.maxTextureSize,d={[Ni]:qe,[qe]:Ni,[ae]:ae},h=new $e({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new _t},radius:{value:4}},vertexShader:Km,fragmentShader:$m}),f=h.clone();f.defines.HORIZONTAL_PASS=1;let g=new we;g.setAttribute("position",new Ce(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new K(g,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=gh;let m=this.type;this.render=function(M,b,U){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||M.length===0)return;let E=n.getRenderTarget(),T=n.getActiveCubeFace(),C=n.getActiveMipmapLevel(),F=n.state;F.setBlending(Ei),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);let et=m!==Di&&this.type===Di,D=m===Di&&this.type!==Di;for(let O=0,Y=M.length;O<Y;O++){let rt=M[O],it=rt.shadow;if(it===void 0){console.warn("THREE.WebGLShadowMap:",rt,"has no shadow.");continue}if(it.autoUpdate===!1&&it.needsUpdate===!1)continue;s.copy(it.mapSize);let Z=it.getFrameExtents();if(s.multiply(Z),r.copy(it.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/Z.x),s.x=r.x*Z.x,it.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/Z.y),s.y=r.y*Z.y,it.mapSize.y=r.y)),it.map===null||et===!0||D===!0){let ht=this.type!==Di?{minFilter:Ne,magFilter:Ne}:{};it.map!==null&&it.map.dispose(),it.map=new yi(s.x,s.y,ht),it.map.texture.name=rt.name+".shadowMap",it.camera.updateProjectionMatrix()}n.setRenderTarget(it.map),n.clear();let st=it.getViewportCount();for(let ht=0;ht<st;ht++){let tt=it.getViewport(ht);a.set(r.x*tt.x,r.y*tt.y,r.x*tt.z,r.y*tt.w),F.viewport(a),it.updateMatrices(rt,ht),i=it.getFrustum(),v(b,U,it.camera,rt,this.type)}it.isPointLightShadow!==!0&&this.type===Di&&y(it,U),it.needsUpdate=!1}m=this.type,p.needsUpdate=!1,n.setRenderTarget(E,T,C)};function y(M,b){let U=t.update(_);h.defines.VSM_SAMPLES!==M.blurSamples&&(h.defines.VSM_SAMPLES=M.blurSamples,f.defines.VSM_SAMPLES=M.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new yi(s.x,s.y)),h.uniforms.shadow_pass.value=M.map.texture,h.uniforms.resolution.value=M.mapSize,h.uniforms.radius.value=M.radius,n.setRenderTarget(M.mapPass),n.clear(),n.renderBufferDirect(b,null,U,h,_,null),f.uniforms.shadow_pass.value=M.mapPass.texture,f.uniforms.resolution.value=M.mapSize,f.uniforms.radius.value=M.radius,n.setRenderTarget(M.map),n.clear(),n.renderBufferDirect(b,null,U,f,_,null)}function x(M,b,U,E){let T=null,C=U.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(C!==void 0)T=C;else if(T=U.isPointLight===!0?l:o,n.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){let F=T.uuid,et=b.uuid,D=c[F];D===void 0&&(D={},c[F]=D);let O=D[et];O===void 0&&(O=T.clone(),D[et]=O,b.addEventListener("dispose",S)),T=O}if(T.visible=b.visible,T.wireframe=b.wireframe,E===Di?T.side=b.shadowSide!==null?b.shadowSide:b.side:T.side=b.shadowSide!==null?b.shadowSide:d[b.side],T.alphaMap=b.alphaMap,T.alphaTest=b.alphaTest,T.map=b.map,T.clipShadows=b.clipShadows,T.clippingPlanes=b.clippingPlanes,T.clipIntersection=b.clipIntersection,T.displacementMap=b.displacementMap,T.displacementScale=b.displacementScale,T.displacementBias=b.displacementBias,T.wireframeLinewidth=b.wireframeLinewidth,T.linewidth=b.linewidth,U.isPointLight===!0&&T.isMeshDistanceMaterial===!0){let F=n.properties.get(T);F.light=U}return T}function v(M,b,U,E,T){if(M.visible===!1)return;if(M.layers.test(b.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&T===Di)&&(!M.frustumCulled||i.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,M.matrixWorld);let et=t.update(M),D=M.material;if(Array.isArray(D)){let O=et.groups;for(let Y=0,rt=O.length;Y<rt;Y++){let it=O[Y],Z=D[it.materialIndex];if(Z&&Z.visible){let st=x(M,Z,E,T);M.onBeforeShadow(n,M,b,U,et,st,it),n.renderBufferDirect(U,null,et,st,M,it),M.onAfterShadow(n,M,b,U,et,st,it)}}}else if(D.visible){let O=x(M,D,E,T);M.onBeforeShadow(n,M,b,U,et,O,null),n.renderBufferDirect(U,null,et,O,M,null),M.onAfterShadow(n,M,b,U,et,O,null)}}let F=M.children;for(let et=0,D=F.length;et<D;et++)v(F[et],b,U,E,T)}function S(M){M.target.removeEventListener("dispose",S);for(let U in c){let E=c[U],T=M.target.uuid;T in E&&(E[T].dispose(),delete E[T])}}}function Qm(n,t,e){let i=e.isWebGL2;function s(){let N=!1,Et=new _e,V=null,j=new _e(0,0,0,0);return{setMask:function(At){V!==At&&!N&&(n.colorMask(At,At,At,At),V=At)},setLocked:function(At){N=At},setClear:function(At,re,he,De,Ze){Ze===!0&&(At*=De,re*=De,he*=De),Et.set(At,re,he,De),j.equals(Et)===!1&&(n.clearColor(At,re,he,De),j.copy(Et))},reset:function(){N=!1,V=null,j.set(-1,0,0,0)}}}function r(){let N=!1,Et=null,V=null,j=null;return{setTest:function(At){At?Ft(n.DEPTH_TEST):L(n.DEPTH_TEST)},setMask:function(At){Et!==At&&!N&&(n.depthMask(At),Et=At)},setFunc:function(At){if(V!==At){switch(At){case Du:n.depthFunc(n.NEVER);break;case Uu:n.depthFunc(n.ALWAYS);break;case zu:n.depthFunc(n.LESS);break;case Tr:n.depthFunc(n.LEQUAL);break;case Nu:n.depthFunc(n.EQUAL);break;case ku:n.depthFunc(n.GEQUAL);break;case Fu:n.depthFunc(n.GREATER);break;case Ou:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}V=At}},setLocked:function(At){N=At},setClear:function(At){j!==At&&(n.clearDepth(At),j=At)},reset:function(){N=!1,Et=null,V=null,j=null}}}function a(){let N=!1,Et=null,V=null,j=null,At=null,re=null,he=null,De=null,Ze=null;return{setTest:function(ue){N||(ue?Ft(n.STENCIL_TEST):L(n.STENCIL_TEST))},setMask:function(ue){Et!==ue&&!N&&(n.stencilMask(ue),Et=ue)},setFunc:function(ue,Je,bi){(V!==ue||j!==Je||At!==bi)&&(n.stencilFunc(ue,Je,bi),V=ue,j=Je,At=bi)},setOp:function(ue,Je,bi){(re!==ue||he!==Je||De!==bi)&&(n.stencilOp(ue,Je,bi),re=ue,he=Je,De=bi)},setLocked:function(ue){N=ue},setClear:function(ue){Ze!==ue&&(n.clearStencil(ue),Ze=ue)},reset:function(){N=!1,Et=null,V=null,j=null,At=null,re=null,he=null,De=null,Ze=null}}}let o=new s,l=new r,c=new a,u=new WeakMap,d=new WeakMap,h={},f={},g=new WeakMap,_=[],p=null,m=!1,y=null,x=null,v=null,S=null,M=null,b=null,U=null,E=new qt(0,0,0),T=0,C=!1,F=null,et=null,D=null,O=null,Y=null,rt=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),it=!1,Z=0,st=n.getParameter(n.VERSION);st.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(st)[1]),it=Z>=1):st.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(st)[1]),it=Z>=2);let ht=null,tt={},B=n.getParameter(n.SCISSOR_BOX),ot=n.getParameter(n.VIEWPORT),ft=new _e().fromArray(B),mt=new _e().fromArray(ot);function vt(N,Et,V,j){let At=new Uint8Array(4),re=n.createTexture();n.bindTexture(N,re),n.texParameteri(N,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(N,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let he=0;he<V;he++)i&&(N===n.TEXTURE_3D||N===n.TEXTURE_2D_ARRAY)?n.texImage3D(Et,0,n.RGBA,1,1,j,0,n.RGBA,n.UNSIGNED_BYTE,At):n.texImage2D(Et+he,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,At);return re}let Ut={};Ut[n.TEXTURE_2D]=vt(n.TEXTURE_2D,n.TEXTURE_2D,1),Ut[n.TEXTURE_CUBE_MAP]=vt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Ut[n.TEXTURE_2D_ARRAY]=vt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Ut[n.TEXTURE_3D]=vt(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Ft(n.DEPTH_TEST),l.setFunc(Tr),bt(!1),A(Il),Ft(n.CULL_FACE),G(Ei);function Ft(N){h[N]!==!0&&(n.enable(N),h[N]=!0)}function L(N){h[N]!==!1&&(n.disable(N),h[N]=!1)}function z(N,Et){return f[N]!==Et?(n.bindFramebuffer(N,Et),f[N]=Et,i&&(N===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=Et),N===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=Et)),!0):!1}function R(N,Et){let V=_,j=!1;if(N)if(V=g.get(Et),V===void 0&&(V=[],g.set(Et,V)),N.isWebGLMultipleRenderTargets){let At=N.texture;if(V.length!==At.length||V[0]!==n.COLOR_ATTACHMENT0){for(let re=0,he=At.length;re<he;re++)V[re]=n.COLOR_ATTACHMENT0+re;V.length=At.length,j=!0}}else V[0]!==n.COLOR_ATTACHMENT0&&(V[0]=n.COLOR_ATTACHMENT0,j=!0);else V[0]!==n.BACK&&(V[0]=n.BACK,j=!0);j&&(e.isWebGL2?n.drawBuffers(V):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(V))}function H(N){return p!==N?(n.useProgram(N),p=N,!0):!1}let k={[hn]:n.FUNC_ADD,[_u]:n.FUNC_SUBTRACT,[yu]:n.FUNC_REVERSE_SUBTRACT};if(i)k[zl]=n.MIN,k[Nl]=n.MAX;else{let N=t.get("EXT_blend_minmax");N!==null&&(k[zl]=N.MIN_EXT,k[Nl]=N.MAX_EXT)}let q={[vu]:n.ZERO,[bu]:n.ONE,[Mu]:n.SRC_COLOR,[ga]:n.SRC_ALPHA,[Ru]:n.SRC_ALPHA_SATURATE,[Tu]:n.DST_COLOR,[wu]:n.DST_ALPHA,[Eu]:n.ONE_MINUS_SRC_COLOR,[xa]:n.ONE_MINUS_SRC_ALPHA,[Au]:n.ONE_MINUS_DST_COLOR,[Su]:n.ONE_MINUS_DST_ALPHA,[Cu]:n.CONSTANT_COLOR,[Pu]:n.ONE_MINUS_CONSTANT_COLOR,[Lu]:n.CONSTANT_ALPHA,[Iu]:n.ONE_MINUS_CONSTANT_ALPHA};function G(N,Et,V,j,At,re,he,De,Ze,ue){if(N===Ei){m===!0&&(L(n.BLEND),m=!1);return}if(m===!1&&(Ft(n.BLEND),m=!0),N!==xu){if(N!==y||ue!==C){if((x!==hn||M!==hn)&&(n.blendEquation(n.FUNC_ADD),x=hn,M=hn),ue)switch(N){case Yn:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case As:n.blendFunc(n.ONE,n.ONE);break;case Dl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ul:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case Yn:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case As:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Dl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ul:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}v=null,S=null,b=null,U=null,E.set(0,0,0),T=0,y=N,C=ue}return}At=At||Et,re=re||V,he=he||j,(Et!==x||At!==M)&&(n.blendEquationSeparate(k[Et],k[At]),x=Et,M=At),(V!==v||j!==S||re!==b||he!==U)&&(n.blendFuncSeparate(q[V],q[j],q[re],q[he]),v=V,S=j,b=re,U=he),(De.equals(E)===!1||Ze!==T)&&(n.blendColor(De.r,De.g,De.b,Ze),E.copy(De),T=Ze),y=N,C=!1}function gt(N,Et){N.side===ae?L(n.CULL_FACE):Ft(n.CULL_FACE);let V=N.side===qe;Et&&(V=!V),bt(V),N.blending===Yn&&N.transparent===!1?G(Ei):G(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),l.setFunc(N.depthFunc),l.setTest(N.depthTest),l.setMask(N.depthWrite),o.setMask(N.colorWrite);let j=N.stencilWrite;c.setTest(j),j&&(c.setMask(N.stencilWriteMask),c.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),c.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),W(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?Ft(n.SAMPLE_ALPHA_TO_COVERAGE):L(n.SAMPLE_ALPHA_TO_COVERAGE)}function bt(N){F!==N&&(N?n.frontFace(n.CW):n.frontFace(n.CCW),F=N)}function A(N){N!==pu?(Ft(n.CULL_FACE),N!==et&&(N===Il?n.cullFace(n.BACK):N===mu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):L(n.CULL_FACE),et=N}function w(N){N!==D&&(it&&n.lineWidth(N),D=N)}function W(N,Et,V){N?(Ft(n.POLYGON_OFFSET_FILL),(O!==Et||Y!==V)&&(n.polygonOffset(Et,V),O=Et,Y=V)):L(n.POLYGON_OFFSET_FILL)}function ct(N){N?Ft(n.SCISSOR_TEST):L(n.SCISSOR_TEST)}function lt(N){N===void 0&&(N=n.TEXTURE0+rt-1),ht!==N&&(n.activeTexture(N),ht=N)}function at(N,Et,V){V===void 0&&(ht===null?V=n.TEXTURE0+rt-1:V=ht);let j=tt[V];j===void 0&&(j={type:void 0,texture:void 0},tt[V]=j),(j.type!==N||j.texture!==Et)&&(ht!==V&&(n.activeTexture(V),ht=V),n.bindTexture(N,Et||Ut[N]),j.type=N,j.texture=Et)}function Ct(){let N=tt[ht];N!==void 0&&N.type!==void 0&&(n.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function Mt(){try{n.compressedTexImage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Tt(){try{n.compressedTexImage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Dt(){try{n.texSubImage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ht(){try{n.texSubImage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ut(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ne(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Yt(){try{n.texStorage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Nt(){try{n.texStorage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function zt(){try{n.texImage2D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Pt(){try{n.texImage3D.apply(n,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Gt(N){ft.equals(N)===!1&&(n.scissor(N.x,N.y,N.z,N.w),ft.copy(N))}function se(N){mt.equals(N)===!1&&(n.viewport(N.x,N.y,N.z,N.w),mt.copy(N))}function de(N,Et){let V=d.get(Et);V===void 0&&(V=new WeakMap,d.set(Et,V));let j=V.get(N);j===void 0&&(j=n.getUniformBlockIndex(Et,N.name),V.set(N,j))}function Vt(N,Et){let j=d.get(Et).get(N);u.get(Et)!==j&&(n.uniformBlockBinding(Et,j,N.__bindingPointIndex),u.set(Et,j))}function xt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},ht=null,tt={},f={},g=new WeakMap,_=[],p=null,m=!1,y=null,x=null,v=null,S=null,M=null,b=null,U=null,E=new qt(0,0,0),T=0,C=!1,F=null,et=null,D=null,O=null,Y=null,ft.set(0,0,n.canvas.width,n.canvas.height),mt.set(0,0,n.canvas.width,n.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:Ft,disable:L,bindFramebuffer:z,drawBuffers:R,useProgram:H,setBlending:G,setMaterial:gt,setFlipSided:bt,setCullFace:A,setLineWidth:w,setPolygonOffset:W,setScissorTest:ct,activeTexture:lt,bindTexture:at,unbindTexture:Ct,compressedTexImage2D:Mt,compressedTexImage3D:Tt,texImage2D:zt,texImage3D:Pt,updateUBOMapping:de,uniformBlockBinding:Vt,texStorage2D:Yt,texStorage3D:Nt,texSubImage2D:Dt,texSubImage3D:Ht,compressedTexSubImage2D:ut,compressedTexSubImage3D:ne,scissor:Gt,viewport:se,reset:xt}}function tg(n,t,e,i,s,r,a){let o=s.isWebGL2,l=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap,d,h=new WeakMap,f=!1;try{f=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(A){}function g(A,w){return f?new OffscreenCanvas(A,w):Ur("canvas")}function _(A,w,W,ct){let lt=1;if((A.width>ct||A.height>ct)&&(lt=ct/Math.max(A.width,A.height)),lt<1||w===!0)if(typeof HTMLImageElement!="undefined"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&A instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&A instanceof ImageBitmap){let at=w?Ma:Math.floor,Ct=at(lt*A.width),Mt=at(lt*A.height);d===void 0&&(d=g(Ct,Mt));let Tt=W?g(Ct,Mt):d;return Tt.width=Ct,Tt.height=Mt,Tt.getContext("2d").drawImage(A,0,0,Ct,Mt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+A.width+"x"+A.height+") to ("+Ct+"x"+Mt+")."),Tt}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+A.width+"x"+A.height+")."),A;return A}function p(A){return mc(A.width)&&mc(A.height)}function m(A){return o?!1:A.wrapS!==gi||A.wrapT!==gi||A.minFilter!==Ne&&A.minFilter!==Qe}function y(A,w){return A.generateMipmaps&&w&&A.minFilter!==Ne&&A.minFilter!==Qe}function x(A){n.generateMipmap(A)}function v(A,w,W,ct,lt=!1){if(o===!1)return w;if(A!==null){if(n[A]!==void 0)return n[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let at=w;if(w===n.RED&&(W===n.FLOAT&&(at=n.R32F),W===n.HALF_FLOAT&&(at=n.R16F),W===n.UNSIGNED_BYTE&&(at=n.R8)),w===n.RED_INTEGER&&(W===n.UNSIGNED_BYTE&&(at=n.R8UI),W===n.UNSIGNED_SHORT&&(at=n.R16UI),W===n.UNSIGNED_INT&&(at=n.R32UI),W===n.BYTE&&(at=n.R8I),W===n.SHORT&&(at=n.R16I),W===n.INT&&(at=n.R32I)),w===n.RG&&(W===n.FLOAT&&(at=n.RG32F),W===n.HALF_FLOAT&&(at=n.RG16F),W===n.UNSIGNED_BYTE&&(at=n.RG8)),w===n.RGBA){let Ct=lt?Cr:le.getTransfer(ct);W===n.FLOAT&&(at=n.RGBA32F),W===n.HALF_FLOAT&&(at=n.RGBA16F),W===n.UNSIGNED_BYTE&&(at=Ct===fe?n.SRGB8_ALPHA8:n.RGBA8),W===n.UNSIGNED_SHORT_4_4_4_4&&(at=n.RGBA4),W===n.UNSIGNED_SHORT_5_5_5_1&&(at=n.RGB5_A1)}return(at===n.R16F||at===n.R32F||at===n.RG16F||at===n.RG32F||at===n.RGBA16F||at===n.RGBA32F)&&t.get("EXT_color_buffer_float"),at}function S(A,w,W){return y(A,W)===!0||A.isFramebufferTexture&&A.minFilter!==Ne&&A.minFilter!==Qe?Math.log2(Math.max(w.width,w.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?w.mipmaps.length:1}function M(A){return A===Ne||A===kl||A===Do?n.NEAREST:n.LINEAR}function b(A){let w=A.target;w.removeEventListener("dispose",b),E(w),w.isVideoTexture&&u.delete(w)}function U(A){let w=A.target;w.removeEventListener("dispose",U),C(w)}function E(A){let w=i.get(A);if(w.__webglInit===void 0)return;let W=A.source,ct=h.get(W);if(ct){let lt=ct[w.__cacheKey];lt.usedTimes--,lt.usedTimes===0&&T(A),Object.keys(ct).length===0&&h.delete(W)}i.remove(A)}function T(A){let w=i.get(A);n.deleteTexture(w.__webglTexture);let W=A.source,ct=h.get(W);delete ct[w.__cacheKey],a.memory.textures--}function C(A){let w=A.texture,W=i.get(A),ct=i.get(w);if(ct.__webglTexture!==void 0&&(n.deleteTexture(ct.__webglTexture),a.memory.textures--),A.depthTexture&&A.depthTexture.dispose(),A.isWebGLCubeRenderTarget)for(let lt=0;lt<6;lt++){if(Array.isArray(W.__webglFramebuffer[lt]))for(let at=0;at<W.__webglFramebuffer[lt].length;at++)n.deleteFramebuffer(W.__webglFramebuffer[lt][at]);else n.deleteFramebuffer(W.__webglFramebuffer[lt]);W.__webglDepthbuffer&&n.deleteRenderbuffer(W.__webglDepthbuffer[lt])}else{if(Array.isArray(W.__webglFramebuffer))for(let lt=0;lt<W.__webglFramebuffer.length;lt++)n.deleteFramebuffer(W.__webglFramebuffer[lt]);else n.deleteFramebuffer(W.__webglFramebuffer);if(W.__webglDepthbuffer&&n.deleteRenderbuffer(W.__webglDepthbuffer),W.__webglMultisampledFramebuffer&&n.deleteFramebuffer(W.__webglMultisampledFramebuffer),W.__webglColorRenderbuffer)for(let lt=0;lt<W.__webglColorRenderbuffer.length;lt++)W.__webglColorRenderbuffer[lt]&&n.deleteRenderbuffer(W.__webglColorRenderbuffer[lt]);W.__webglDepthRenderbuffer&&n.deleteRenderbuffer(W.__webglDepthRenderbuffer)}if(A.isWebGLMultipleRenderTargets)for(let lt=0,at=w.length;lt<at;lt++){let Ct=i.get(w[lt]);Ct.__webglTexture&&(n.deleteTexture(Ct.__webglTexture),a.memory.textures--),i.remove(w[lt])}i.remove(w),i.remove(A)}let F=0;function et(){F=0}function D(){let A=F;return A>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),F+=1,A}function O(A){let w=[];return w.push(A.wrapS),w.push(A.wrapT),w.push(A.wrapR||0),w.push(A.magFilter),w.push(A.minFilter),w.push(A.anisotropy),w.push(A.internalFormat),w.push(A.format),w.push(A.type),w.push(A.generateMipmaps),w.push(A.premultiplyAlpha),w.push(A.flipY),w.push(A.unpackAlignment),w.push(A.colorSpace),w.join()}function Y(A,w){let W=i.get(A);if(A.isVideoTexture&&gt(A),A.isRenderTargetTexture===!1&&A.version>0&&W.__version!==A.version){let ct=A.image;if(ct===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ct.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ft(W,A,w);return}}e.bindTexture(n.TEXTURE_2D,W.__webglTexture,n.TEXTURE0+w)}function rt(A,w){let W=i.get(A);if(A.version>0&&W.__version!==A.version){ft(W,A,w);return}e.bindTexture(n.TEXTURE_2D_ARRAY,W.__webglTexture,n.TEXTURE0+w)}function it(A,w){let W=i.get(A);if(A.version>0&&W.__version!==A.version){ft(W,A,w);return}e.bindTexture(n.TEXTURE_3D,W.__webglTexture,n.TEXTURE0+w)}function Z(A,w){let W=i.get(A);if(A.version>0&&W.__version!==A.version){mt(W,A,w);return}e.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture,n.TEXTURE0+w)}let st={[wi]:n.REPEAT,[gi]:n.CLAMP_TO_EDGE,[va]:n.MIRRORED_REPEAT},ht={[Ne]:n.NEAREST,[kl]:n.NEAREST_MIPMAP_NEAREST,[Do]:n.NEAREST_MIPMAP_LINEAR,[Qe]:n.LINEAR,[Yu]:n.LINEAR_MIPMAP_NEAREST,[_i]:n.LINEAR_MIPMAP_LINEAR},tt={[rd]:n.NEVER,[ud]:n.ALWAYS,[od]:n.LESS,[Rh]:n.LEQUAL,[ad]:n.EQUAL,[hd]:n.GEQUAL,[ld]:n.GREATER,[cd]:n.NOTEQUAL};function B(A,w,W){if(W?(n.texParameteri(A,n.TEXTURE_WRAP_S,st[w.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,st[w.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,st[w.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,ht[w.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,ht[w.minFilter])):(n.texParameteri(A,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(A,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(w.wrapS!==gi||w.wrapT!==gi)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(A,n.TEXTURE_MAG_FILTER,M(w.magFilter)),n.texParameteri(A,n.TEXTURE_MIN_FILTER,M(w.minFilter)),w.minFilter!==Ne&&w.minFilter!==Qe&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),w.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,tt[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){let ct=t.get("EXT_texture_filter_anisotropic");if(w.magFilter===Ne||w.minFilter!==Do&&w.minFilter!==_i||w.type===Zi&&t.has("OES_texture_float_linear")===!1||o===!1&&w.type===mn&&t.has("OES_texture_half_float_linear")===!1)return;(w.anisotropy>1||i.get(w).__currentAnisotropy)&&(n.texParameterf(A,ct.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,s.getMaxAnisotropy())),i.get(w).__currentAnisotropy=w.anisotropy)}}function ot(A,w){let W=!1;A.__webglInit===void 0&&(A.__webglInit=!0,w.addEventListener("dispose",b));let ct=w.source,lt=h.get(ct);lt===void 0&&(lt={},h.set(ct,lt));let at=O(w);if(at!==A.__cacheKey){lt[at]===void 0&&(lt[at]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,W=!0),lt[at].usedTimes++;let Ct=lt[A.__cacheKey];Ct!==void 0&&(lt[A.__cacheKey].usedTimes--,Ct.usedTimes===0&&T(w)),A.__cacheKey=at,A.__webglTexture=lt[at].texture}return W}function ft(A,w,W){let ct=n.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(ct=n.TEXTURE_2D_ARRAY),w.isData3DTexture&&(ct=n.TEXTURE_3D);let lt=ot(A,w),at=w.source;e.bindTexture(ct,A.__webglTexture,n.TEXTURE0+W);let Ct=i.get(at);if(at.version!==Ct.__version||lt===!0){e.activeTexture(n.TEXTURE0+W);let Mt=le.getPrimaries(le.workingColorSpace),Tt=w.colorSpace===ke?null:le.getPrimaries(w.colorSpace),Dt=w.colorSpace===ke||Mt===Tt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,w.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,w.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Dt);let Ht=m(w)&&p(w.image)===!1,ut=_(w.image,Ht,!1,s.maxTextureSize);ut=bt(w,ut);let ne=p(ut)||o,Yt=r.convert(w.format,w.colorSpace),Nt=r.convert(w.type),zt=v(w.internalFormat,Yt,Nt,w.colorSpace,w.isVideoTexture);B(ct,w,ne);let Pt,Gt=w.mipmaps,se=o&&w.isVideoTexture!==!0&&zt!==Sh,de=Ct.__version===void 0||lt===!0,Vt=S(w,ut,ne);if(w.isDepthTexture)zt=n.DEPTH_COMPONENT,o?w.type===Zi?zt=n.DEPTH_COMPONENT32F:w.type===Yi?zt=n.DEPTH_COMPONENT24:w.type===dn?zt=n.DEPTH24_STENCIL8:zt=n.DEPTH_COMPONENT16:w.type===Zi&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),w.format===fn&&zt===n.DEPTH_COMPONENT&&w.type!==ol&&w.type!==Yi&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),w.type=Yi,Nt=r.convert(w.type)),w.format===jn&&zt===n.DEPTH_COMPONENT&&(zt=n.DEPTH_STENCIL,w.type!==dn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),w.type=dn,Nt=r.convert(w.type))),de&&(se?e.texStorage2D(n.TEXTURE_2D,1,zt,ut.width,ut.height):e.texImage2D(n.TEXTURE_2D,0,zt,ut.width,ut.height,0,Yt,Nt,null));else if(w.isDataTexture)if(Gt.length>0&&ne){se&&de&&e.texStorage2D(n.TEXTURE_2D,Vt,zt,Gt[0].width,Gt[0].height);for(let xt=0,N=Gt.length;xt<N;xt++)Pt=Gt[xt],se?e.texSubImage2D(n.TEXTURE_2D,xt,0,0,Pt.width,Pt.height,Yt,Nt,Pt.data):e.texImage2D(n.TEXTURE_2D,xt,zt,Pt.width,Pt.height,0,Yt,Nt,Pt.data);w.generateMipmaps=!1}else se?(de&&e.texStorage2D(n.TEXTURE_2D,Vt,zt,ut.width,ut.height),e.texSubImage2D(n.TEXTURE_2D,0,0,0,ut.width,ut.height,Yt,Nt,ut.data)):e.texImage2D(n.TEXTURE_2D,0,zt,ut.width,ut.height,0,Yt,Nt,ut.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){se&&de&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Vt,zt,Gt[0].width,Gt[0].height,ut.depth);for(let xt=0,N=Gt.length;xt<N;xt++)Pt=Gt[xt],w.format!==xi?Yt!==null?se?e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,xt,0,0,0,Pt.width,Pt.height,ut.depth,Yt,Pt.data,0,0):e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,xt,zt,Pt.width,Pt.height,ut.depth,0,Pt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):se?e.texSubImage3D(n.TEXTURE_2D_ARRAY,xt,0,0,0,Pt.width,Pt.height,ut.depth,Yt,Nt,Pt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,xt,zt,Pt.width,Pt.height,ut.depth,0,Yt,Nt,Pt.data)}else{se&&de&&e.texStorage2D(n.TEXTURE_2D,Vt,zt,Gt[0].width,Gt[0].height);for(let xt=0,N=Gt.length;xt<N;xt++)Pt=Gt[xt],w.format!==xi?Yt!==null?se?e.compressedTexSubImage2D(n.TEXTURE_2D,xt,0,0,Pt.width,Pt.height,Yt,Pt.data):e.compressedTexImage2D(n.TEXTURE_2D,xt,zt,Pt.width,Pt.height,0,Pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):se?e.texSubImage2D(n.TEXTURE_2D,xt,0,0,Pt.width,Pt.height,Yt,Nt,Pt.data):e.texImage2D(n.TEXTURE_2D,xt,zt,Pt.width,Pt.height,0,Yt,Nt,Pt.data)}else if(w.isDataArrayTexture)se?(de&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Vt,zt,ut.width,ut.height,ut.depth),e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ut.width,ut.height,ut.depth,Yt,Nt,ut.data)):e.texImage3D(n.TEXTURE_2D_ARRAY,0,zt,ut.width,ut.height,ut.depth,0,Yt,Nt,ut.data);else if(w.isData3DTexture)se?(de&&e.texStorage3D(n.TEXTURE_3D,Vt,zt,ut.width,ut.height,ut.depth),e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ut.width,ut.height,ut.depth,Yt,Nt,ut.data)):e.texImage3D(n.TEXTURE_3D,0,zt,ut.width,ut.height,ut.depth,0,Yt,Nt,ut.data);else if(w.isFramebufferTexture){if(de)if(se)e.texStorage2D(n.TEXTURE_2D,Vt,zt,ut.width,ut.height);else{let xt=ut.width,N=ut.height;for(let Et=0;Et<Vt;Et++)e.texImage2D(n.TEXTURE_2D,Et,zt,xt,N,0,Yt,Nt,null),xt>>=1,N>>=1}}else if(Gt.length>0&&ne){se&&de&&e.texStorage2D(n.TEXTURE_2D,Vt,zt,Gt[0].width,Gt[0].height);for(let xt=0,N=Gt.length;xt<N;xt++)Pt=Gt[xt],se?e.texSubImage2D(n.TEXTURE_2D,xt,0,0,Yt,Nt,Pt):e.texImage2D(n.TEXTURE_2D,xt,zt,Yt,Nt,Pt);w.generateMipmaps=!1}else se?(de&&e.texStorage2D(n.TEXTURE_2D,Vt,zt,ut.width,ut.height),e.texSubImage2D(n.TEXTURE_2D,0,0,0,Yt,Nt,ut)):e.texImage2D(n.TEXTURE_2D,0,zt,Yt,Nt,ut);y(w,ne)&&x(ct),Ct.__version=at.version,w.onUpdate&&w.onUpdate(w)}A.__version=w.version}function mt(A,w,W){if(w.image.length!==6)return;let ct=ot(A,w),lt=w.source;e.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+W);let at=i.get(lt);if(lt.version!==at.__version||ct===!0){e.activeTexture(n.TEXTURE0+W);let Ct=le.getPrimaries(le.workingColorSpace),Mt=w.colorSpace===ke?null:le.getPrimaries(w.colorSpace),Tt=w.colorSpace===ke||Ct===Mt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,w.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,w.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Tt);let Dt=w.isCompressedTexture||w.image[0].isCompressedTexture,Ht=w.image[0]&&w.image[0].isDataTexture,ut=[];for(let xt=0;xt<6;xt++)!Dt&&!Ht?ut[xt]=_(w.image[xt],!1,!0,s.maxCubemapSize):ut[xt]=Ht?w.image[xt].image:w.image[xt],ut[xt]=bt(w,ut[xt]);let ne=ut[0],Yt=p(ne)||o,Nt=r.convert(w.format,w.colorSpace),zt=r.convert(w.type),Pt=v(w.internalFormat,Nt,zt,w.colorSpace),Gt=o&&w.isVideoTexture!==!0,se=at.__version===void 0||ct===!0,de=S(w,ne,Yt);B(n.TEXTURE_CUBE_MAP,w,Yt);let Vt;if(Dt){Gt&&se&&e.texStorage2D(n.TEXTURE_CUBE_MAP,de,Pt,ne.width,ne.height);for(let xt=0;xt<6;xt++){Vt=ut[xt].mipmaps;for(let N=0;N<Vt.length;N++){let Et=Vt[N];w.format!==xi?Nt!==null?Gt?e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xt,N,0,0,Et.width,Et.height,Nt,Et.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xt,N,Pt,Et.width,Et.height,0,Et.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Gt?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xt,N,0,0,Et.width,Et.height,Nt,zt,Et.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xt,N,Pt,Et.width,Et.height,0,Nt,zt,Et.data)}}}else{Vt=w.mipmaps,Gt&&se&&(Vt.length>0&&de++,e.texStorage2D(n.TEXTURE_CUBE_MAP,de,Pt,ut[0].width,ut[0].height));for(let xt=0;xt<6;xt++)if(Ht){Gt?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,0,0,ut[xt].width,ut[xt].height,Nt,zt,ut[xt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,Pt,ut[xt].width,ut[xt].height,0,Nt,zt,ut[xt].data);for(let N=0;N<Vt.length;N++){let V=Vt[N].image[xt].image;Gt?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xt,N+1,0,0,V.width,V.height,Nt,zt,V.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xt,N+1,Pt,V.width,V.height,0,Nt,zt,V.data)}}else{Gt?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,0,0,Nt,zt,ut[xt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,Pt,Nt,zt,ut[xt]);for(let N=0;N<Vt.length;N++){let Et=Vt[N];Gt?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xt,N+1,0,0,Nt,zt,Et.image[xt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+xt,N+1,Pt,Nt,zt,Et.image[xt])}}}y(w,Yt)&&x(n.TEXTURE_CUBE_MAP),at.__version=lt.version,w.onUpdate&&w.onUpdate(w)}A.__version=w.version}function vt(A,w,W,ct,lt,at){let Ct=r.convert(W.format,W.colorSpace),Mt=r.convert(W.type),Tt=v(W.internalFormat,Ct,Mt,W.colorSpace);if(!i.get(w).__hasExternalTextures){let Ht=Math.max(1,w.width>>at),ut=Math.max(1,w.height>>at);lt===n.TEXTURE_3D||lt===n.TEXTURE_2D_ARRAY?e.texImage3D(lt,at,Tt,Ht,ut,w.depth,0,Ct,Mt,null):e.texImage2D(lt,at,Tt,Ht,ut,0,Ct,Mt,null)}e.bindFramebuffer(n.FRAMEBUFFER,A),G(w)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ct,lt,i.get(W).__webglTexture,0,q(w)):(lt===n.TEXTURE_2D||lt>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&lt<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,ct,lt,i.get(W).__webglTexture,at),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Ut(A,w,W){if(n.bindRenderbuffer(n.RENDERBUFFER,A),w.depthBuffer&&!w.stencilBuffer){let ct=o===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(W||G(w)){let lt=w.depthTexture;lt&&lt.isDepthTexture&&(lt.type===Zi?ct=n.DEPTH_COMPONENT32F:lt.type===Yi&&(ct=n.DEPTH_COMPONENT24));let at=q(w);G(w)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,at,ct,w.width,w.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,at,ct,w.width,w.height)}else n.renderbufferStorage(n.RENDERBUFFER,ct,w.width,w.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,A)}else if(w.depthBuffer&&w.stencilBuffer){let ct=q(w);W&&G(w)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,ct,n.DEPTH24_STENCIL8,w.width,w.height):G(w)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ct,n.DEPTH24_STENCIL8,w.width,w.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,A)}else{let ct=w.isWebGLMultipleRenderTargets===!0?w.texture:[w.texture];for(let lt=0;lt<ct.length;lt++){let at=ct[lt],Ct=r.convert(at.format,at.colorSpace),Mt=r.convert(at.type),Tt=v(at.internalFormat,Ct,Mt,at.colorSpace),Dt=q(w);W&&G(w)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Dt,Tt,w.width,w.height):G(w)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Dt,Tt,w.width,w.height):n.renderbufferStorage(n.RENDERBUFFER,Tt,w.width,w.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ft(A,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,A),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(w.depthTexture).__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),Y(w.depthTexture,0);let ct=i.get(w.depthTexture).__webglTexture,lt=q(w);if(w.depthTexture.format===fn)G(w)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ct,0,lt):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ct,0);else if(w.depthTexture.format===jn)G(w)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ct,0,lt):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ct,0);else throw new Error("Unknown depthTexture format")}function L(A){let w=i.get(A),W=A.isWebGLCubeRenderTarget===!0;if(A.depthTexture&&!w.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");Ft(w.__webglFramebuffer,A)}else if(W){w.__webglDepthbuffer=[];for(let ct=0;ct<6;ct++)e.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer[ct]),w.__webglDepthbuffer[ct]=n.createRenderbuffer(),Ut(w.__webglDepthbuffer[ct],A,!1)}else e.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer=n.createRenderbuffer(),Ut(w.__webglDepthbuffer,A,!1);e.bindFramebuffer(n.FRAMEBUFFER,null)}function z(A,w,W){let ct=i.get(A);w!==void 0&&vt(ct.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),W!==void 0&&L(A)}function R(A){let w=A.texture,W=i.get(A),ct=i.get(w);A.addEventListener("dispose",U),A.isWebGLMultipleRenderTargets!==!0&&(ct.__webglTexture===void 0&&(ct.__webglTexture=n.createTexture()),ct.__version=w.version,a.memory.textures++);let lt=A.isWebGLCubeRenderTarget===!0,at=A.isWebGLMultipleRenderTargets===!0,Ct=p(A)||o;if(lt){W.__webglFramebuffer=[];for(let Mt=0;Mt<6;Mt++)if(o&&w.mipmaps&&w.mipmaps.length>0){W.__webglFramebuffer[Mt]=[];for(let Tt=0;Tt<w.mipmaps.length;Tt++)W.__webglFramebuffer[Mt][Tt]=n.createFramebuffer()}else W.__webglFramebuffer[Mt]=n.createFramebuffer()}else{if(o&&w.mipmaps&&w.mipmaps.length>0){W.__webglFramebuffer=[];for(let Mt=0;Mt<w.mipmaps.length;Mt++)W.__webglFramebuffer[Mt]=n.createFramebuffer()}else W.__webglFramebuffer=n.createFramebuffer();if(at)if(s.drawBuffers){let Mt=A.texture;for(let Tt=0,Dt=Mt.length;Tt<Dt;Tt++){let Ht=i.get(Mt[Tt]);Ht.__webglTexture===void 0&&(Ht.__webglTexture=n.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&A.samples>0&&G(A)===!1){let Mt=at?w:[w];W.__webglMultisampledFramebuffer=n.createFramebuffer(),W.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let Tt=0;Tt<Mt.length;Tt++){let Dt=Mt[Tt];W.__webglColorRenderbuffer[Tt]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,W.__webglColorRenderbuffer[Tt]);let Ht=r.convert(Dt.format,Dt.colorSpace),ut=r.convert(Dt.type),ne=v(Dt.internalFormat,Ht,ut,Dt.colorSpace,A.isXRRenderTarget===!0),Yt=q(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,Yt,ne,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Tt,n.RENDERBUFFER,W.__webglColorRenderbuffer[Tt])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(W.__webglDepthRenderbuffer=n.createRenderbuffer(),Ut(W.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(lt){e.bindTexture(n.TEXTURE_CUBE_MAP,ct.__webglTexture),B(n.TEXTURE_CUBE_MAP,w,Ct);for(let Mt=0;Mt<6;Mt++)if(o&&w.mipmaps&&w.mipmaps.length>0)for(let Tt=0;Tt<w.mipmaps.length;Tt++)vt(W.__webglFramebuffer[Mt][Tt],A,w,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,Tt);else vt(W.__webglFramebuffer[Mt],A,w,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0);y(w,Ct)&&x(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(at){let Mt=A.texture;for(let Tt=0,Dt=Mt.length;Tt<Dt;Tt++){let Ht=Mt[Tt],ut=i.get(Ht);e.bindTexture(n.TEXTURE_2D,ut.__webglTexture),B(n.TEXTURE_2D,Ht,Ct),vt(W.__webglFramebuffer,A,Ht,n.COLOR_ATTACHMENT0+Tt,n.TEXTURE_2D,0),y(Ht,Ct)&&x(n.TEXTURE_2D)}e.unbindTexture()}else{let Mt=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(o?Mt=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(Mt,ct.__webglTexture),B(Mt,w,Ct),o&&w.mipmaps&&w.mipmaps.length>0)for(let Tt=0;Tt<w.mipmaps.length;Tt++)vt(W.__webglFramebuffer[Tt],A,w,n.COLOR_ATTACHMENT0,Mt,Tt);else vt(W.__webglFramebuffer,A,w,n.COLOR_ATTACHMENT0,Mt,0);y(w,Ct)&&x(Mt),e.unbindTexture()}A.depthBuffer&&L(A)}function H(A){let w=p(A)||o,W=A.isWebGLMultipleRenderTargets===!0?A.texture:[A.texture];for(let ct=0,lt=W.length;ct<lt;ct++){let at=W[ct];if(y(at,w)){let Ct=A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,Mt=i.get(at).__webglTexture;e.bindTexture(Ct,Mt),x(Ct),e.unbindTexture()}}}function k(A){if(o&&A.samples>0&&G(A)===!1){let w=A.isWebGLMultipleRenderTargets?A.texture:[A.texture],W=A.width,ct=A.height,lt=n.COLOR_BUFFER_BIT,at=[],Ct=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Mt=i.get(A),Tt=A.isWebGLMultipleRenderTargets===!0;if(Tt)for(let Dt=0;Dt<w.length;Dt++)e.bindFramebuffer(n.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Dt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,Mt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Dt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Mt.__webglFramebuffer);for(let Dt=0;Dt<w.length;Dt++){at.push(n.COLOR_ATTACHMENT0+Dt),A.depthBuffer&&at.push(Ct);let Ht=Mt.__ignoreDepthValues!==void 0?Mt.__ignoreDepthValues:!1;if(Ht===!1&&(A.depthBuffer&&(lt|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&(lt|=n.STENCIL_BUFFER_BIT)),Tt&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Mt.__webglColorRenderbuffer[Dt]),Ht===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[Ct]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[Ct])),Tt){let ut=i.get(w[Dt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ut,0)}n.blitFramebuffer(0,0,W,ct,0,0,W,ct,lt,n.NEAREST),c&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,at)}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Tt)for(let Dt=0;Dt<w.length;Dt++){e.bindFramebuffer(n.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Dt,n.RENDERBUFFER,Mt.__webglColorRenderbuffer[Dt]);let Ht=i.get(w[Dt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,Mt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Dt,n.TEXTURE_2D,Ht,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer)}}function q(A){return Math.min(s.maxSamples,A.samples)}function G(A){let w=i.get(A);return o&&A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function gt(A){let w=a.render.frame;u.get(A)!==w&&(u.set(A,w),A.update())}function bt(A,w){let W=A.colorSpace,ct=A.format,lt=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||A.format===ba||W!==ki&&W!==ke&&(le.getTransfer(W)===fe?o===!1?t.has("EXT_sRGB")===!0&&ct===xi?(A.format=ba,A.minFilter=Qe,A.generateMipmaps=!1):w=zr.sRGBToLinear(w):(ct!==xi||lt!==Ki)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),w}this.allocateTextureUnit=D,this.resetTextureUnits=et,this.setTexture2D=Y,this.setTexture2DArray=rt,this.setTexture3D=it,this.setTextureCube=Z,this.rebindTextures=z,this.setupRenderTarget=R,this.updateRenderTargetMipmap=H,this.updateMultisampleRenderTarget=k,this.setupDepthRenderbuffer=L,this.setupFrameBufferTexture=vt,this.useMultisampledRTT=G}function eg(n,t,e){let i=e.isWebGL2;function s(r,a=ke){let o,l=le.getTransfer(a);if(r===Ki)return n.UNSIGNED_BYTE;if(r===vh)return n.UNSIGNED_SHORT_4_4_4_4;if(r===bh)return n.UNSIGNED_SHORT_5_5_5_1;if(r===Zu)return n.BYTE;if(r===Ju)return n.SHORT;if(r===ol)return n.UNSIGNED_SHORT;if(r===yh)return n.INT;if(r===Yi)return n.UNSIGNED_INT;if(r===Zi)return n.FLOAT;if(r===mn)return i?n.HALF_FLOAT:(o=t.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===Ku)return n.ALPHA;if(r===xi)return n.RGBA;if(r===$u)return n.LUMINANCE;if(r===ju)return n.LUMINANCE_ALPHA;if(r===fn)return n.DEPTH_COMPONENT;if(r===jn)return n.DEPTH_STENCIL;if(r===ba)return o=t.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===Qu)return n.RED;if(r===Mh)return n.RED_INTEGER;if(r===td)return n.RG;if(r===Eh)return n.RG_INTEGER;if(r===wh)return n.RGBA_INTEGER;if(r===Uo||r===zo||r===No||r===ko)if(l===fe)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===Uo)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===zo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===No)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===ko)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===Uo)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===zo)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===No)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===ko)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Fl||r===Ol||r===Bl||r===Hl)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===Fl)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Ol)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Bl)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Hl)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Sh)return o=t.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Gl||r===Vl)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(r===Gl)return l===fe?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===Vl)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Wl||r===Xl||r===ql||r===Yl||r===Zl||r===Jl||r===Kl||r===$l||r===jl||r===Ql||r===tc||r===ec||r===ic||r===nc)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(r===Wl)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Xl)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===ql)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Yl)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Zl)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Jl)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Kl)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===$l)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===jl)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Ql)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===tc)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===ec)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===ic)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===nc)return l===fe?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Fo||r===sc||r===rc)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(r===Fo)return l===fe?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===sc)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===rc)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===ed||r===oc||r===ac||r===lc)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(r===Fo)return o.COMPRESSED_RED_RGTC1_EXT;if(r===oc)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===ac)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===lc)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===dn?i?n.UNSIGNED_INT_24_8:(o=t.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):n[r]!==void 0?n[r]:null}return{convert:s}}var za=class extends Oe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},Ot=class extends Ee{constructor(){super(),this.isGroup=!0,this.type="Group"}},ig={type:"move"},Es=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ot,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ot,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ot,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let _ of t.hand.values()){let p=e.getJointPose(_,i),m=this._getHandJoint(c,_);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}let u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&h>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ig)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new Ot;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},Na=class extends Si{constructor(t,e){super();let i=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,h=null,f=null,g=null,_=e.getContextAttributes(),p=null,m=null,y=[],x=[],v=new _t,S=null,M=new Oe;M.layers.enable(1),M.viewport=new _e;let b=new Oe;b.layers.enable(2),b.viewport=new _e;let U=[M,b],E=new za;E.layers.enable(1),E.layers.enable(2);let T=null,C=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(B){let ot=y[B];return ot===void 0&&(ot=new Es,y[B]=ot),ot.getTargetRaySpace()},this.getControllerGrip=function(B){let ot=y[B];return ot===void 0&&(ot=new Es,y[B]=ot),ot.getGripSpace()},this.getHand=function(B){let ot=y[B];return ot===void 0&&(ot=new Es,y[B]=ot),ot.getHandSpace()};function F(B){let ot=x.indexOf(B.inputSource);if(ot===-1)return;let ft=y[ot];ft!==void 0&&(ft.update(B.inputSource,B.frame,c||a),ft.dispatchEvent({type:B.type,data:B.inputSource}))}function et(){s.removeEventListener("select",F),s.removeEventListener("selectstart",F),s.removeEventListener("selectend",F),s.removeEventListener("squeeze",F),s.removeEventListener("squeezestart",F),s.removeEventListener("squeezeend",F),s.removeEventListener("end",et),s.removeEventListener("inputsourceschange",D);for(let B=0;B<y.length;B++){let ot=x[B];ot!==null&&(x[B]=null,y[B].disconnect(ot))}T=null,C=null,t.setRenderTarget(p),f=null,h=null,d=null,s=null,m=null,tt.stop(),i.isPresenting=!1,t.setPixelRatio(S),t.setSize(v.width,v.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(B){r=B,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(B){o=B,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(B){c=B},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(B){if(s=B,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",F),s.addEventListener("selectstart",F),s.addEventListener("selectend",F),s.addEventListener("squeeze",F),s.addEventListener("squeezestart",F),s.addEventListener("squeezeend",F),s.addEventListener("end",et),s.addEventListener("inputsourceschange",D),_.xrCompatible!==!0&&await e.makeXRCompatible(),S=t.getPixelRatio(),t.getSize(v),s.renderState.layers===void 0||t.capabilities.isWebGL2===!1){let ot={antialias:s.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,ot),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),m=new yi(f.framebufferWidth,f.framebufferHeight,{format:xi,type:Ki,colorSpace:t.outputColorSpace,stencilBuffer:_.stencil})}else{let ot=null,ft=null,mt=null;_.depth&&(mt=_.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ot=_.stencil?jn:fn,ft=_.stencil?dn:Yi);let vt={colorFormat:e.RGBA8,depthFormat:mt,scaleFactor:r};d=new XRWebGLBinding(s,e),h=d.createProjectionLayer(vt),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),m=new yi(h.textureWidth,h.textureHeight,{format:xi,type:Ki,depthTexture:new Wr(h.textureWidth,h.textureHeight,ft,void 0,void 0,void 0,void 0,void 0,void 0,ot),stencilBuffer:_.stencil,colorSpace:t.outputColorSpace,samples:_.antialias?4:0});let Ut=t.properties.get(m);Ut.__ignoreDepthValues=h.ignoreDepthValues}m.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),tt.setContext(s),tt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function D(B){for(let ot=0;ot<B.removed.length;ot++){let ft=B.removed[ot],mt=x.indexOf(ft);mt>=0&&(x[mt]=null,y[mt].disconnect(ft))}for(let ot=0;ot<B.added.length;ot++){let ft=B.added[ot],mt=x.indexOf(ft);if(mt===-1){for(let Ut=0;Ut<y.length;Ut++)if(Ut>=x.length){x.push(ft),mt=Ut;break}else if(x[Ut]===null){x[Ut]=ft,mt=Ut;break}if(mt===-1)break}let vt=y[mt];vt&&vt.connect(ft)}}let O=new I,Y=new I;function rt(B,ot,ft){O.setFromMatrixPosition(ot.matrixWorld),Y.setFromMatrixPosition(ft.matrixWorld);let mt=O.distanceTo(Y),vt=ot.projectionMatrix.elements,Ut=ft.projectionMatrix.elements,Ft=vt[14]/(vt[10]-1),L=vt[14]/(vt[10]+1),z=(vt[9]+1)/vt[5],R=(vt[9]-1)/vt[5],H=(vt[8]-1)/vt[0],k=(Ut[8]+1)/Ut[0],q=Ft*H,G=Ft*k,gt=mt/(-H+k),bt=gt*-H;ot.matrixWorld.decompose(B.position,B.quaternion,B.scale),B.translateX(bt),B.translateZ(gt),B.matrixWorld.compose(B.position,B.quaternion,B.scale),B.matrixWorldInverse.copy(B.matrixWorld).invert();let A=Ft+gt,w=L+gt,W=q-bt,ct=G+(mt-bt),lt=z*L/w*A,at=R*L/w*A;B.projectionMatrix.makePerspective(W,ct,lt,at,A,w),B.projectionMatrixInverse.copy(B.projectionMatrix).invert()}function it(B,ot){ot===null?B.matrixWorld.copy(B.matrix):B.matrixWorld.multiplyMatrices(ot.matrixWorld,B.matrix),B.matrixWorldInverse.copy(B.matrixWorld).invert()}this.updateCamera=function(B){if(s===null)return;E.near=b.near=M.near=B.near,E.far=b.far=M.far=B.far,(T!==E.near||C!==E.far)&&(s.updateRenderState({depthNear:E.near,depthFar:E.far}),T=E.near,C=E.far);let ot=B.parent,ft=E.cameras;it(E,ot);for(let mt=0;mt<ft.length;mt++)it(ft[mt],ot);ft.length===2?rt(E,M,b):E.projectionMatrix.copy(M.projectionMatrix),Z(B,E,ot)};function Z(B,ot,ft){ft===null?B.matrix.copy(ot.matrixWorld):(B.matrix.copy(ft.matrixWorld),B.matrix.invert(),B.matrix.multiply(ot.matrixWorld)),B.matrix.decompose(B.position,B.quaternion,B.scale),B.updateMatrixWorld(!0),B.projectionMatrix.copy(ot.projectionMatrix),B.projectionMatrixInverse.copy(ot.projectionMatrixInverse),B.isPerspectiveCamera&&(B.fov=Dr*2*Math.atan(1/B.projectionMatrix.elements[5]),B.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(B){l=B,h!==null&&(h.fixedFoveation=B),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=B)};let st=null;function ht(B,ot){if(u=ot.getViewerPose(c||a),g=ot,u!==null){let ft=u.views;f!==null&&(t.setRenderTargetFramebuffer(m,f.framebuffer),t.setRenderTarget(m));let mt=!1;ft.length!==E.cameras.length&&(E.cameras.length=0,mt=!0);for(let vt=0;vt<ft.length;vt++){let Ut=ft[vt],Ft=null;if(f!==null)Ft=f.getViewport(Ut);else{let z=d.getViewSubImage(h,Ut);Ft=z.viewport,vt===0&&(t.setRenderTargetTextures(m,z.colorTexture,h.ignoreDepthValues?void 0:z.depthStencilTexture),t.setRenderTarget(m))}let L=U[vt];L===void 0&&(L=new Oe,L.layers.enable(vt),L.viewport=new _e,U[vt]=L),L.matrix.fromArray(Ut.transform.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale),L.projectionMatrix.fromArray(Ut.projectionMatrix),L.projectionMatrixInverse.copy(L.projectionMatrix).invert(),L.viewport.set(Ft.x,Ft.y,Ft.width,Ft.height),vt===0&&(E.matrix.copy(L.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),mt===!0&&E.cameras.push(L)}}for(let ft=0;ft<y.length;ft++){let mt=x[ft],vt=y[ft];mt!==null&&vt!==void 0&&vt.update(mt,ot,c||a)}st&&st(B,ot),ot.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ot}),g=null}let tt=new Ih;tt.setAnimationLoop(ht),this.setAnimationLoop=function(B){st=B},this.dispose=function(){}}};function ng(n,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function i(p,m){m.color.getRGB(p.fogColor.value,Lh(n)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,y,x,v){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(p,m):m.isMeshToonMaterial?(r(p,m),d(p,m)):m.isMeshPhongMaterial?(r(p,m),u(p,m)):m.isMeshStandardMaterial?(r(p,m),h(p,m),m.isMeshPhysicalMaterial&&f(p,m,v)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),_(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?l(p,m,y,x):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===qe&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===qe&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);let y=t.get(m).envMap;if(y&&(p.envMap.value=y,p.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap){p.lightMap.value=m.lightMap;let x=n._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=m.lightMapIntensity*x,e(m.lightMap,p.lightMapTransform)}m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,y,x){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*y,p.scale.value=x*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function d(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function h(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),t.get(m).envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,y){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===qe&&p.clearcoatNormalScale.value.negate())),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=y.texture,p.transmissionSamplerSize.value.set(y.width,y.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function _(p,m){let y=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(y.matrixWorld),p.nearDistance.value=y.shadow.camera.near,p.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function sg(n,t,e,i){let s={},r={},a=[],o=e.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(y,x){let v=x.program;i.uniformBlockBinding(y,v)}function c(y,x){let v=s[y.id];v===void 0&&(g(y),v=u(y),s[y.id]=v,y.addEventListener("dispose",p));let S=x.program;i.updateUBOMapping(y,S);let M=t.render.frame;r[y.id]!==M&&(h(y),r[y.id]=M)}function u(y){let x=d();y.__bindingPointIndex=x;let v=n.createBuffer(),S=y.__size,M=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,v),n.bufferData(n.UNIFORM_BUFFER,S,M),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,x,v),v}function d(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(y){let x=s[y.id],v=y.uniforms,S=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,x);for(let M=0,b=v.length;M<b;M++){let U=Array.isArray(v[M])?v[M]:[v[M]];for(let E=0,T=U.length;E<T;E++){let C=U[E];if(f(C,M,E,S)===!0){let F=C.__offset,et=Array.isArray(C.value)?C.value:[C.value],D=0;for(let O=0;O<et.length;O++){let Y=et[O],rt=_(Y);typeof Y=="number"||typeof Y=="boolean"?(C.__data[0]=Y,n.bufferSubData(n.UNIFORM_BUFFER,F+D,C.__data)):Y.isMatrix3?(C.__data[0]=Y.elements[0],C.__data[1]=Y.elements[1],C.__data[2]=Y.elements[2],C.__data[3]=0,C.__data[4]=Y.elements[3],C.__data[5]=Y.elements[4],C.__data[6]=Y.elements[5],C.__data[7]=0,C.__data[8]=Y.elements[6],C.__data[9]=Y.elements[7],C.__data[10]=Y.elements[8],C.__data[11]=0):(Y.toArray(C.__data,D),D+=rt.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,F,C.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(y,x,v,S){let M=y.value,b=x+"_"+v;if(S[b]===void 0)return typeof M=="number"||typeof M=="boolean"?S[b]=M:S[b]=M.clone(),!0;{let U=S[b];if(typeof M=="number"||typeof M=="boolean"){if(U!==M)return S[b]=M,!0}else if(U.equals(M)===!1)return U.copy(M),!0}return!1}function g(y){let x=y.uniforms,v=0,S=16;for(let b=0,U=x.length;b<U;b++){let E=Array.isArray(x[b])?x[b]:[x[b]];for(let T=0,C=E.length;T<C;T++){let F=E[T],et=Array.isArray(F.value)?F.value:[F.value];for(let D=0,O=et.length;D<O;D++){let Y=et[D],rt=_(Y),it=v%S;it!==0&&S-it<rt.boundary&&(v+=S-it),F.__data=new Float32Array(rt.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=v,v+=rt.storage}}}let M=v%S;return M>0&&(v+=S-M),y.__size=v,y.__cache={},this}function _(y){let x={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(x.boundary=4,x.storage=4):y.isVector2?(x.boundary=8,x.storage=8):y.isVector3||y.isColor?(x.boundary=16,x.storage=12):y.isVector4?(x.boundary=16,x.storage=16):y.isMatrix3?(x.boundary=48,x.storage=48):y.isMatrix4?(x.boundary=64,x.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),x}function p(y){let x=y.target;x.removeEventListener("dispose",p);let v=a.indexOf(x.__bindingPointIndex);a.splice(v,1),n.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function m(){for(let y in s)n.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:l,update:c,dispose:m}}var Cs=class{constructor(t={}){let{canvas:e=fd(),context:i=null,depth:s=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1}=t;this.isWebGLRenderer=!0;let h;i!==null?h=i.getContextAttributes().alpha:h=a;let f=new Uint32Array(4),g=new Int32Array(4),_=null,p=null,m=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=pe,this._useLegacyLights=!1,this.toneMapping=Ji,this.toneMappingExposure=1;let x=this,v=!1,S=0,M=0,b=null,U=-1,E=null,T=new _e,C=new _e,F=null,et=new qt(0),D=0,O=e.width,Y=e.height,rt=1,it=null,Z=null,st=new _e(0,0,O,Y),ht=new _e(0,0,O,Y),tt=!1,B=new Rs,ot=!1,ft=!1,mt=null,vt=new ce,Ut=new _t,Ft=new I,L={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function z(){return b===null?rt:1}let R=i;function H(P,X){for(let $=0;$<P.length;$++){let Q=P[$],J=e.getContext(Q,X);if(J!==null)return J}return null}try{let P={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine","three.js r160"),e.addEventListener("webglcontextlost",xt,!1),e.addEventListener("webglcontextrestored",N,!1),e.addEventListener("webglcontextcreationerror",Et,!1),R===null){let X=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&X.shift(),R=H(X,P),R===null)throw H(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext!="undefined"&&R instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),R.getShaderPrecisionFormat===void 0&&(R.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(P){throw console.error("THREE.WebGLRenderer: "+P.message),P}let k,q,G,gt,bt,A,w,W,ct,lt,at,Ct,Mt,Tt,Dt,Ht,ut,ne,Yt,Nt,zt,Pt,Gt,se;function de(){k=new E0(R),q=new x0(R,k,t),k.init(q),Pt=new eg(R,k,q),G=new Qm(R,k,q),gt=new T0(R),bt=new Hm,A=new tg(R,k,G,bt,q,Pt,gt),w=new y0(x),W=new M0(x),ct=new Dd(R,q),Gt=new m0(R,k,ct,q),lt=new w0(R,ct,gt,Gt),at=new P0(R,lt,ct,gt),Yt=new C0(R,q,A),Ht=new _0(bt),Ct=new Bm(x,w,W,k,q,Gt,Ht),Mt=new ng(x,bt),Tt=new Vm,Dt=new Jm(k,q),ne=new p0(x,w,W,G,at,h,l),ut=new jm(x,at,q),se=new sg(R,gt,q,G),Nt=new g0(R,k,gt,q),zt=new S0(R,k,gt,q),gt.programs=Ct.programs,x.capabilities=q,x.extensions=k,x.properties=bt,x.renderLists=Tt,x.shadowMap=ut,x.state=G,x.info=gt}de();let Vt=new Na(x,R);this.xr=Vt,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){let P=k.get("WEBGL_lose_context");P&&P.loseContext()},this.forceContextRestore=function(){let P=k.get("WEBGL_lose_context");P&&P.restoreContext()},this.getPixelRatio=function(){return rt},this.setPixelRatio=function(P){P!==void 0&&(rt=P,this.setSize(O,Y,!1))},this.getSize=function(P){return P.set(O,Y)},this.setSize=function(P,X,$=!0){if(Vt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=P,Y=X,e.width=Math.floor(P*rt),e.height=Math.floor(X*rt),$===!0&&(e.style.width=P+"px",e.style.height=X+"px"),this.setViewport(0,0,P,X)},this.getDrawingBufferSize=function(P){return P.set(O*rt,Y*rt).floor()},this.setDrawingBufferSize=function(P,X,$){O=P,Y=X,rt=$,e.width=Math.floor(P*$),e.height=Math.floor(X*$),this.setViewport(0,0,P,X)},this.getCurrentViewport=function(P){return P.copy(T)},this.getViewport=function(P){return P.copy(st)},this.setViewport=function(P,X,$,Q){P.isVector4?st.set(P.x,P.y,P.z,P.w):st.set(P,X,$,Q),G.viewport(T.copy(st).multiplyScalar(rt).floor())},this.getScissor=function(P){return P.copy(ht)},this.setScissor=function(P,X,$,Q){P.isVector4?ht.set(P.x,P.y,P.z,P.w):ht.set(P,X,$,Q),G.scissor(C.copy(ht).multiplyScalar(rt).floor())},this.getScissorTest=function(){return tt},this.setScissorTest=function(P){G.setScissorTest(tt=P)},this.setOpaqueSort=function(P){it=P},this.setTransparentSort=function(P){Z=P},this.getClearColor=function(P){return P.copy(ne.getClearColor())},this.setClearColor=function(){ne.setClearColor.apply(ne,arguments)},this.getClearAlpha=function(){return ne.getClearAlpha()},this.setClearAlpha=function(){ne.setClearAlpha.apply(ne,arguments)},this.clear=function(P=!0,X=!0,$=!0){let Q=0;if(P){let J=!1;if(b!==null){let Rt=b.texture.format;J=Rt===wh||Rt===Eh||Rt===Mh}if(J){let Rt=b.texture.type,It=Rt===Ki||Rt===Yi||Rt===ol||Rt===dn||Rt===vh||Rt===bh,kt=ne.getClearColor(),Bt=ne.getClearAlpha(),Jt=kt.r,Wt=kt.g,Xt=kt.b;It?(f[0]=Jt,f[1]=Wt,f[2]=Xt,f[3]=Bt,R.clearBufferuiv(R.COLOR,0,f)):(g[0]=Jt,g[1]=Wt,g[2]=Xt,g[3]=Bt,R.clearBufferiv(R.COLOR,0,g))}else Q|=R.COLOR_BUFFER_BIT}X&&(Q|=R.DEPTH_BUFFER_BIT),$&&(Q|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(Q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",xt,!1),e.removeEventListener("webglcontextrestored",N,!1),e.removeEventListener("webglcontextcreationerror",Et,!1),Tt.dispose(),Dt.dispose(),bt.dispose(),w.dispose(),W.dispose(),at.dispose(),Gt.dispose(),se.dispose(),Ct.dispose(),Vt.dispose(),Vt.removeEventListener("sessionstart",Ze),Vt.removeEventListener("sessionend",ue),mt&&(mt.dispose(),mt=null),Je.stop()};function xt(P){P.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),v=!0}function N(){console.log("THREE.WebGLRenderer: Context Restored."),v=!1;let P=gt.autoReset,X=ut.enabled,$=ut.autoUpdate,Q=ut.needsUpdate,J=ut.type;de(),gt.autoReset=P,ut.enabled=X,ut.autoUpdate=$,ut.needsUpdate=Q,ut.type=J}function Et(P){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",P.statusMessage)}function V(P){let X=P.target;X.removeEventListener("dispose",V),j(X)}function j(P){At(P),bt.remove(P)}function At(P){let X=bt.get(P).programs;X!==void 0&&(X.forEach(function($){Ct.releaseProgram($)}),P.isShaderMaterial&&Ct.releaseShaderCache(P))}this.renderBufferDirect=function(P,X,$,Q,J,Rt){X===null&&(X=L);let It=J.isMesh&&J.matrixWorld.determinant()<0,kt=hu(P,X,$,Q,J);G.setMaterial(Q,It);let Bt=$.index,Jt=1;if(Q.wireframe===!0){if(Bt=lt.getWireframeAttribute($),Bt===void 0)return;Jt=2}let Wt=$.drawRange,Xt=$.attributes.position,Me=Wt.start*Jt,ii=(Wt.start+Wt.count)*Jt;Rt!==null&&(Me=Math.max(Me,Rt.start*Jt),ii=Math.min(ii,(Rt.start+Rt.count)*Jt)),Bt!==null?(Me=Math.max(Me,0),ii=Math.min(ii,Bt.count)):Xt!=null&&(Me=Math.max(Me,0),ii=Math.min(ii,Xt.count));let Ue=ii-Me;if(Ue<0||Ue===1/0)return;Gt.setup(J,Q,kt,$,Bt);let Ai,ye=Nt;if(Bt!==null&&(Ai=ct.get(Bt),ye=zt,ye.setIndex(Ai)),J.isMesh)Q.wireframe===!0?(G.setLineWidth(Q.wireframeLinewidth*z()),ye.setMode(R.LINES)):ye.setMode(R.TRIANGLES);else if(J.isLine){let Kt=Q.linewidth;Kt===void 0&&(Kt=1),G.setLineWidth(Kt*z()),J.isLineSegments?ye.setMode(R.LINES):J.isLineLoop?ye.setMode(R.LINE_LOOP):ye.setMode(R.LINE_STRIP)}else J.isPoints?ye.setMode(R.POINTS):J.isSprite&&ye.setMode(R.TRIANGLES);if(J.isBatchedMesh)ye.renderMultiDraw(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount);else if(J.isInstancedMesh)ye.renderInstances(Me,Ue,J.count);else if($.isInstancedBufferGeometry){let Kt=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,Co=Math.min($.instanceCount,Kt);ye.renderInstances(Me,Ue,Co)}else ye.render(Me,Ue)};function re(P,X,$){P.transparent===!0&&P.side===ae&&P.forceSinglePass===!1?(P.side=qe,P.needsUpdate=!0,Js(P,X,$),P.side=Ni,P.needsUpdate=!0,Js(P,X,$),P.side=ae):Js(P,X,$)}this.compile=function(P,X,$=null){$===null&&($=P),p=Dt.get($),p.init(),y.push(p),$.traverseVisible(function(J){J.isLight&&J.layers.test(X.layers)&&(p.pushLight(J),J.castShadow&&p.pushShadow(J))}),P!==$&&P.traverseVisible(function(J){J.isLight&&J.layers.test(X.layers)&&(p.pushLight(J),J.castShadow&&p.pushShadow(J))}),p.setupLights(x._useLegacyLights);let Q=new Set;return P.traverse(function(J){let Rt=J.material;if(Rt)if(Array.isArray(Rt))for(let It=0;It<Rt.length;It++){let kt=Rt[It];re(kt,$,J),Q.add(kt)}else re(Rt,$,J),Q.add(Rt)}),y.pop(),p=null,Q},this.compileAsync=function(P,X,$=null){let Q=this.compile(P,X,$);return new Promise(J=>{function Rt(){if(Q.forEach(function(It){bt.get(It).currentProgram.isReady()&&Q.delete(It)}),Q.size===0){J(P);return}setTimeout(Rt,10)}k.get("KHR_parallel_shader_compile")!==null?Rt():setTimeout(Rt,10)})};let he=null;function De(P){he&&he(P)}function Ze(){Je.stop()}function ue(){Je.start()}let Je=new Ih;Je.setAnimationLoop(De),typeof self!="undefined"&&Je.setContext(self),this.setAnimationLoop=function(P){he=P,Vt.setAnimationLoop(P),P===null?Je.stop():Je.start()},Vt.addEventListener("sessionstart",Ze),Vt.addEventListener("sessionend",ue),this.render=function(P,X){if(X!==void 0&&X.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(v===!0)return;P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),Vt.enabled===!0&&Vt.isPresenting===!0&&(Vt.cameraAutoUpdate===!0&&Vt.updateCamera(X),X=Vt.getCamera()),P.isScene===!0&&P.onBeforeRender(x,P,X,b),p=Dt.get(P,y.length),p.init(),y.push(p),vt.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),B.setFromProjectionMatrix(vt),ft=this.localClippingEnabled,ot=Ht.init(this.clippingPlanes,ft),_=Tt.get(P,m.length),_.init(),m.push(_),bi(P,X,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(it,Z),this.info.render.frame++,ot===!0&&Ht.beginShadows();let $=p.state.shadowsArray;if(ut.render($,P,X),ot===!0&&Ht.endShadows(),this.info.autoReset===!0&&this.info.reset(),ne.render(_,P),p.setupLights(x._useLegacyLights),X.isArrayCamera){let Q=X.cameras;for(let J=0,Rt=Q.length;J<Rt;J++){let It=Q[J];Tl(_,P,It,It.viewport)}}else Tl(_,P,X);b!==null&&(A.updateMultisampleRenderTarget(b),A.updateRenderTargetMipmap(b)),P.isScene===!0&&P.onAfterRender(x,P,X),Gt.resetDefaultState(),U=-1,E=null,y.pop(),y.length>0?p=y[y.length-1]:p=null,m.pop(),m.length>0?_=m[m.length-1]:_=null};function bi(P,X,$,Q){if(P.visible===!1)return;if(P.layers.test(X.layers)){if(P.isGroup)$=P.renderOrder;else if(P.isLOD)P.autoUpdate===!0&&P.update(X);else if(P.isLight)p.pushLight(P),P.castShadow&&p.pushShadow(P);else if(P.isSprite){if(!P.frustumCulled||B.intersectsSprite(P)){Q&&Ft.setFromMatrixPosition(P.matrixWorld).applyMatrix4(vt);let It=at.update(P),kt=P.material;kt.visible&&_.push(P,It,kt,$,Ft.z,null)}}else if((P.isMesh||P.isLine||P.isPoints)&&(!P.frustumCulled||B.intersectsObject(P))){let It=at.update(P),kt=P.material;if(Q&&(P.boundingSphere!==void 0?(P.boundingSphere===null&&P.computeBoundingSphere(),Ft.copy(P.boundingSphere.center)):(It.boundingSphere===null&&It.computeBoundingSphere(),Ft.copy(It.boundingSphere.center)),Ft.applyMatrix4(P.matrixWorld).applyMatrix4(vt)),Array.isArray(kt)){let Bt=It.groups;for(let Jt=0,Wt=Bt.length;Jt<Wt;Jt++){let Xt=Bt[Jt],Me=kt[Xt.materialIndex];Me&&Me.visible&&_.push(P,It,Me,$,Ft.z,Xt)}}else kt.visible&&_.push(P,It,kt,$,Ft.z,null)}}let Rt=P.children;for(let It=0,kt=Rt.length;It<kt;It++)bi(Rt[It],X,$,Q)}function Tl(P,X,$,Q){let J=P.opaque,Rt=P.transmissive,It=P.transparent;p.setupLightsView($),ot===!0&&Ht.setGlobalState(x.clippingPlanes,$),Rt.length>0&&cu(J,Rt,X,$),Q&&G.viewport(T.copy(Q)),J.length>0&&Zs(J,X,$),Rt.length>0&&Zs(Rt,X,$),It.length>0&&Zs(It,X,$),G.buffers.depth.setTest(!0),G.buffers.depth.setMask(!0),G.buffers.color.setMask(!0),G.setPolygonOffset(!1)}function cu(P,X,$,Q){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;let Rt=q.isWebGL2;mt===null&&(mt=new yi(1,1,{generateMipmaps:!0,type:k.has("EXT_color_buffer_half_float")?mn:Ki,minFilter:_i,samples:Rt?4:0})),x.getDrawingBufferSize(Ut),Rt?mt.setSize(Ut.x,Ut.y):mt.setSize(Ma(Ut.x),Ma(Ut.y));let It=x.getRenderTarget();x.setRenderTarget(mt),x.getClearColor(et),D=x.getClearAlpha(),D<1&&x.setClearColor(16777215,.5),x.clear();let kt=x.toneMapping;x.toneMapping=Ji,Zs(P,$,Q),A.updateMultisampleRenderTarget(mt),A.updateRenderTargetMipmap(mt);let Bt=!1;for(let Jt=0,Wt=X.length;Jt<Wt;Jt++){let Xt=X[Jt],Me=Xt.object,ii=Xt.geometry,Ue=Xt.material,Ai=Xt.group;if(Ue.side===ae&&Me.layers.test(Q.layers)){let ye=Ue.side;Ue.side=qe,Ue.needsUpdate=!0,Al(Me,$,Q,ii,Ue,Ai),Ue.side=ye,Ue.needsUpdate=!0,Bt=!0}}Bt===!0&&(A.updateMultisampleRenderTarget(mt),A.updateRenderTargetMipmap(mt)),x.setRenderTarget(It),x.setClearColor(et,D),x.toneMapping=kt}function Zs(P,X,$){let Q=X.isScene===!0?X.overrideMaterial:null;for(let J=0,Rt=P.length;J<Rt;J++){let It=P[J],kt=It.object,Bt=It.geometry,Jt=Q===null?It.material:Q,Wt=It.group;kt.layers.test($.layers)&&Al(kt,X,$,Bt,Jt,Wt)}}function Al(P,X,$,Q,J,Rt){P.onBeforeRender(x,X,$,Q,J,Rt),P.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),J.onBeforeRender(x,X,$,Q,P,Rt),J.transparent===!0&&J.side===ae&&J.forceSinglePass===!1?(J.side=qe,J.needsUpdate=!0,x.renderBufferDirect($,X,Q,J,P,Rt),J.side=Ni,J.needsUpdate=!0,x.renderBufferDirect($,X,Q,J,P,Rt),J.side=ae):x.renderBufferDirect($,X,Q,J,P,Rt),P.onAfterRender(x,X,$,Q,J,Rt)}function Js(P,X,$){X.isScene!==!0&&(X=L);let Q=bt.get(P),J=p.state.lights,Rt=p.state.shadowsArray,It=J.state.version,kt=Ct.getParameters(P,J.state,Rt,X,$),Bt=Ct.getProgramCacheKey(kt),Jt=Q.programs;Q.environment=P.isMeshStandardMaterial?X.environment:null,Q.fog=X.fog,Q.envMap=(P.isMeshStandardMaterial?W:w).get(P.envMap||Q.environment),Jt===void 0&&(P.addEventListener("dispose",V),Jt=new Map,Q.programs=Jt);let Wt=Jt.get(Bt);if(Wt!==void 0){if(Q.currentProgram===Wt&&Q.lightsStateVersion===It)return Cl(P,kt),Wt}else kt.uniforms=Ct.getUniforms(P),P.onBuild($,kt,x),P.onBeforeCompile(kt,x),Wt=Ct.acquireProgram(kt,Bt),Jt.set(Bt,Wt),Q.uniforms=kt.uniforms;let Xt=Q.uniforms;return(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)&&(Xt.clippingPlanes=Ht.uniform),Cl(P,kt),Q.needsLights=du(P),Q.lightsStateVersion=It,Q.needsLights&&(Xt.ambientLightColor.value=J.state.ambient,Xt.lightProbe.value=J.state.probe,Xt.directionalLights.value=J.state.directional,Xt.directionalLightShadows.value=J.state.directionalShadow,Xt.spotLights.value=J.state.spot,Xt.spotLightShadows.value=J.state.spotShadow,Xt.rectAreaLights.value=J.state.rectArea,Xt.ltc_1.value=J.state.rectAreaLTC1,Xt.ltc_2.value=J.state.rectAreaLTC2,Xt.pointLights.value=J.state.point,Xt.pointLightShadows.value=J.state.pointShadow,Xt.hemisphereLights.value=J.state.hemi,Xt.directionalShadowMap.value=J.state.directionalShadowMap,Xt.directionalShadowMatrix.value=J.state.directionalShadowMatrix,Xt.spotShadowMap.value=J.state.spotShadowMap,Xt.spotLightMatrix.value=J.state.spotLightMatrix,Xt.spotLightMap.value=J.state.spotLightMap,Xt.pointShadowMap.value=J.state.pointShadowMap,Xt.pointShadowMatrix.value=J.state.pointShadowMatrix),Q.currentProgram=Wt,Q.uniformsList=null,Wt}function Rl(P){if(P.uniformsList===null){let X=P.currentProgram.getUniforms();P.uniformsList=Jn.seqWithValue(X.seq,P.uniforms)}return P.uniformsList}function Cl(P,X){let $=bt.get(P);$.outputColorSpace=X.outputColorSpace,$.batching=X.batching,$.instancing=X.instancing,$.instancingColor=X.instancingColor,$.skinning=X.skinning,$.morphTargets=X.morphTargets,$.morphNormals=X.morphNormals,$.morphColors=X.morphColors,$.morphTargetsCount=X.morphTargetsCount,$.numClippingPlanes=X.numClippingPlanes,$.numIntersection=X.numClipIntersection,$.vertexAlphas=X.vertexAlphas,$.vertexTangents=X.vertexTangents,$.toneMapping=X.toneMapping}function hu(P,X,$,Q,J){X.isScene!==!0&&(X=L),A.resetTextureUnits();let Rt=X.fog,It=Q.isMeshStandardMaterial?X.environment:null,kt=b===null?x.outputColorSpace:b.isXRRenderTarget===!0?b.texture.colorSpace:ki,Bt=(Q.isMeshStandardMaterial?W:w).get(Q.envMap||It),Jt=Q.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Wt=!!$.attributes.tangent&&(!!Q.normalMap||Q.anisotropy>0),Xt=!!$.morphAttributes.position,Me=!!$.morphAttributes.normal,ii=!!$.morphAttributes.color,Ue=Ji;Q.toneMapped&&(b===null||b.isXRRenderTarget===!0)&&(Ue=x.toneMapping);let Ai=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,ye=Ai!==void 0?Ai.length:0,Kt=bt.get(Q),Co=p.state.lights;if(ot===!0&&(ft===!0||P!==E)){let ai=P===E&&Q.id===U;Ht.setState(Q,P,ai)}let be=!1;Q.version===Kt.__version?(Kt.needsLights&&Kt.lightsStateVersion!==Co.state.version||Kt.outputColorSpace!==kt||J.isBatchedMesh&&Kt.batching===!1||!J.isBatchedMesh&&Kt.batching===!0||J.isInstancedMesh&&Kt.instancing===!1||!J.isInstancedMesh&&Kt.instancing===!0||J.isSkinnedMesh&&Kt.skinning===!1||!J.isSkinnedMesh&&Kt.skinning===!0||J.isInstancedMesh&&Kt.instancingColor===!0&&J.instanceColor===null||J.isInstancedMesh&&Kt.instancingColor===!1&&J.instanceColor!==null||Kt.envMap!==Bt||Q.fog===!0&&Kt.fog!==Rt||Kt.numClippingPlanes!==void 0&&(Kt.numClippingPlanes!==Ht.numPlanes||Kt.numIntersection!==Ht.numIntersection)||Kt.vertexAlphas!==Jt||Kt.vertexTangents!==Wt||Kt.morphTargets!==Xt||Kt.morphNormals!==Me||Kt.morphColors!==ii||Kt.toneMapping!==Ue||q.isWebGL2===!0&&Kt.morphTargetsCount!==ye)&&(be=!0):(be=!0,Kt.__version=Q.version);let nn=Kt.currentProgram;be===!0&&(nn=Js(Q,X,J));let Pl=!1,fs=!1,Po=!1,Ge=nn.getUniforms(),sn=Kt.uniforms;if(G.useProgram(nn.program)&&(Pl=!0,fs=!0,Po=!0),Q.id!==U&&(U=Q.id,fs=!0),Pl||E!==P){Ge.setValue(R,"projectionMatrix",P.projectionMatrix),Ge.setValue(R,"viewMatrix",P.matrixWorldInverse);let ai=Ge.map.cameraPosition;ai!==void 0&&ai.setValue(R,Ft.setFromMatrixPosition(P.matrixWorld)),q.logarithmicDepthBuffer&&Ge.setValue(R,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2)),(Q.isMeshPhongMaterial||Q.isMeshToonMaterial||Q.isMeshLambertMaterial||Q.isMeshBasicMaterial||Q.isMeshStandardMaterial||Q.isShaderMaterial)&&Ge.setValue(R,"isOrthographic",P.isOrthographicCamera===!0),E!==P&&(E=P,fs=!0,Po=!0)}if(J.isSkinnedMesh){Ge.setOptional(R,J,"bindMatrix"),Ge.setOptional(R,J,"bindMatrixInverse");let ai=J.skeleton;ai&&(q.floatVertexTextures?(ai.boneTexture===null&&ai.computeBoneTexture(),Ge.setValue(R,"boneTexture",ai.boneTexture,A)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}J.isBatchedMesh&&(Ge.setOptional(R,J,"batchingTexture"),Ge.setValue(R,"batchingTexture",J._matricesTexture,A));let Lo=$.morphAttributes;if((Lo.position!==void 0||Lo.normal!==void 0||Lo.color!==void 0&&q.isWebGL2===!0)&&Yt.update(J,$,nn),(fs||Kt.receiveShadow!==J.receiveShadow)&&(Kt.receiveShadow=J.receiveShadow,Ge.setValue(R,"receiveShadow",J.receiveShadow)),Q.isMeshGouraudMaterial&&Q.envMap!==null&&(sn.envMap.value=Bt,sn.flipEnvMap.value=Bt.isCubeTexture&&Bt.isRenderTargetTexture===!1?-1:1),fs&&(Ge.setValue(R,"toneMappingExposure",x.toneMappingExposure),Kt.needsLights&&uu(sn,Po),Rt&&Q.fog===!0&&Mt.refreshFogUniforms(sn,Rt),Mt.refreshMaterialUniforms(sn,Q,rt,Y,mt),Jn.upload(R,Rl(Kt),sn,A)),Q.isShaderMaterial&&Q.uniformsNeedUpdate===!0&&(Jn.upload(R,Rl(Kt),sn,A),Q.uniformsNeedUpdate=!1),Q.isSpriteMaterial&&Ge.setValue(R,"center",J.center),Ge.setValue(R,"modelViewMatrix",J.modelViewMatrix),Ge.setValue(R,"normalMatrix",J.normalMatrix),Ge.setValue(R,"modelMatrix",J.matrixWorld),Q.isShaderMaterial||Q.isRawShaderMaterial){let ai=Q.uniformsGroups;for(let Io=0,fu=ai.length;Io<fu;Io++)if(q.isWebGL2){let Ll=ai[Io];se.update(Ll,nn),se.bind(Ll,nn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return nn}function uu(P,X){P.ambientLightColor.needsUpdate=X,P.lightProbe.needsUpdate=X,P.directionalLights.needsUpdate=X,P.directionalLightShadows.needsUpdate=X,P.pointLights.needsUpdate=X,P.pointLightShadows.needsUpdate=X,P.spotLights.needsUpdate=X,P.spotLightShadows.needsUpdate=X,P.rectAreaLights.needsUpdate=X,P.hemisphereLights.needsUpdate=X}function du(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}this.getActiveCubeFace=function(){return S},this.getActiveMipmapLevel=function(){return M},this.getRenderTarget=function(){return b},this.setRenderTargetTextures=function(P,X,$){bt.get(P.texture).__webglTexture=X,bt.get(P.depthTexture).__webglTexture=$;let Q=bt.get(P);Q.__hasExternalTextures=!0,Q.__hasExternalTextures&&(Q.__autoAllocateDepthBuffer=$===void 0,Q.__autoAllocateDepthBuffer||k.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Q.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(P,X){let $=bt.get(P);$.__webglFramebuffer=X,$.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(P,X=0,$=0){b=P,S=X,M=$;let Q=!0,J=null,Rt=!1,It=!1;if(P){let Bt=bt.get(P);Bt.__useDefaultFramebuffer!==void 0?(G.bindFramebuffer(R.FRAMEBUFFER,null),Q=!1):Bt.__webglFramebuffer===void 0?A.setupRenderTarget(P):Bt.__hasExternalTextures&&A.rebindTextures(P,bt.get(P.texture).__webglTexture,bt.get(P.depthTexture).__webglTexture);let Jt=P.texture;(Jt.isData3DTexture||Jt.isDataArrayTexture||Jt.isCompressedArrayTexture)&&(It=!0);let Wt=bt.get(P).__webglFramebuffer;P.isWebGLCubeRenderTarget?(Array.isArray(Wt[X])?J=Wt[X][$]:J=Wt[X],Rt=!0):q.isWebGL2&&P.samples>0&&A.useMultisampledRTT(P)===!1?J=bt.get(P).__webglMultisampledFramebuffer:Array.isArray(Wt)?J=Wt[$]:J=Wt,T.copy(P.viewport),C.copy(P.scissor),F=P.scissorTest}else T.copy(st).multiplyScalar(rt).floor(),C.copy(ht).multiplyScalar(rt).floor(),F=tt;if(G.bindFramebuffer(R.FRAMEBUFFER,J)&&q.drawBuffers&&Q&&G.drawBuffers(P,J),G.viewport(T),G.scissor(C),G.setScissorTest(F),Rt){let Bt=bt.get(P.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+X,Bt.__webglTexture,$)}else if(It){let Bt=bt.get(P.texture),Jt=X||0;R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,Bt.__webglTexture,$||0,Jt)}U=-1},this.readRenderTargetPixels=function(P,X,$,Q,J,Rt,It){if(!(P&&P.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let kt=bt.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&It!==void 0&&(kt=kt[It]),kt){G.bindFramebuffer(R.FRAMEBUFFER,kt);try{let Bt=P.texture,Jt=Bt.format,Wt=Bt.type;if(Jt!==xi&&Pt.convert(Jt)!==R.getParameter(R.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let Xt=Wt===mn&&(k.has("EXT_color_buffer_half_float")||q.isWebGL2&&k.has("EXT_color_buffer_float"));if(Wt!==Ki&&Pt.convert(Wt)!==R.getParameter(R.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Wt===Zi&&(q.isWebGL2||k.has("OES_texture_float")||k.has("WEBGL_color_buffer_float")))&&!Xt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=P.width-Q&&$>=0&&$<=P.height-J&&R.readPixels(X,$,Q,J,Pt.convert(Jt),Pt.convert(Wt),Rt)}finally{let Bt=b!==null?bt.get(b).__webglFramebuffer:null;G.bindFramebuffer(R.FRAMEBUFFER,Bt)}}},this.copyFramebufferToTexture=function(P,X,$=0){let Q=Math.pow(2,-$),J=Math.floor(X.image.width*Q),Rt=Math.floor(X.image.height*Q);A.setTexture2D(X,0),R.copyTexSubImage2D(R.TEXTURE_2D,$,0,0,P.x,P.y,J,Rt),G.unbindTexture()},this.copyTextureToTexture=function(P,X,$,Q=0){let J=X.image.width,Rt=X.image.height,It=Pt.convert($.format),kt=Pt.convert($.type);A.setTexture2D($,0),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,$.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,$.unpackAlignment),X.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,Q,P.x,P.y,J,Rt,It,kt,X.image.data):X.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,Q,P.x,P.y,X.mipmaps[0].width,X.mipmaps[0].height,It,X.mipmaps[0].data):R.texSubImage2D(R.TEXTURE_2D,Q,P.x,P.y,It,kt,X.image),Q===0&&$.generateMipmaps&&R.generateMipmap(R.TEXTURE_2D),G.unbindTexture()},this.copyTextureToTexture3D=function(P,X,$,Q,J=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let Rt=P.max.x-P.min.x+1,It=P.max.y-P.min.y+1,kt=P.max.z-P.min.z+1,Bt=Pt.convert(Q.format),Jt=Pt.convert(Q.type),Wt;if(Q.isData3DTexture)A.setTexture3D(Q,0),Wt=R.TEXTURE_3D;else if(Q.isDataArrayTexture||Q.isCompressedArrayTexture)A.setTexture2DArray(Q,0),Wt=R.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,Q.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Q.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,Q.unpackAlignment);let Xt=R.getParameter(R.UNPACK_ROW_LENGTH),Me=R.getParameter(R.UNPACK_IMAGE_HEIGHT),ii=R.getParameter(R.UNPACK_SKIP_PIXELS),Ue=R.getParameter(R.UNPACK_SKIP_ROWS),Ai=R.getParameter(R.UNPACK_SKIP_IMAGES),ye=$.isCompressedTexture?$.mipmaps[J]:$.image;R.pixelStorei(R.UNPACK_ROW_LENGTH,ye.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,ye.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,P.min.x),R.pixelStorei(R.UNPACK_SKIP_ROWS,P.min.y),R.pixelStorei(R.UNPACK_SKIP_IMAGES,P.min.z),$.isDataTexture||$.isData3DTexture?R.texSubImage3D(Wt,J,X.x,X.y,X.z,Rt,It,kt,Bt,Jt,ye.data):$.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),R.compressedTexSubImage3D(Wt,J,X.x,X.y,X.z,Rt,It,kt,Bt,ye.data)):R.texSubImage3D(Wt,J,X.x,X.y,X.z,Rt,It,kt,Bt,Jt,ye),R.pixelStorei(R.UNPACK_ROW_LENGTH,Xt),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,Me),R.pixelStorei(R.UNPACK_SKIP_PIXELS,ii),R.pixelStorei(R.UNPACK_SKIP_ROWS,Ue),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Ai),J===0&&Q.generateMipmaps&&R.generateMipmap(Wt),G.unbindTexture()},this.initTexture=function(P){P.isCubeTexture?A.setTextureCube(P,0):P.isData3DTexture?A.setTexture3D(P,0):P.isDataArrayTexture||P.isCompressedArrayTexture?A.setTexture2DArray(P,0):A.setTexture2D(P,0),G.unbindTexture()},this.resetState=function(){S=0,M=0,b=null,G.reset(),Gt.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=t===al?"display-p3":"srgb",e.unpackColorSpace=le.workingColorSpace===ho?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===pe?pn:Th}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===pn?pe:ki}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}},ka=class extends Cs{};ka.prototype.isWebGL1Renderer=!0;var Xr=class n{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new qt(t),this.density=e}clone(){return new n(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var qr=class extends Ee{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}};var Yr=class extends Ce{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Gn=new ce,Qc=new ce,_r=[],th=new ri,rg=new ce,ys=new K,vs=new Fi,Zr=class extends K{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Yr(new Float32Array(i*16),16),this.instanceColor=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,rg)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new ri),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Gn),th.copy(t.boundingBox).applyMatrix4(Gn),this.boundingBox.union(th)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Fi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Gn),vs.copy(t.boundingSphere).applyMatrix4(Gn),this.boundingSphere.union(vs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}raycast(t,e){let i=this.matrixWorld,s=this.count;if(ys.geometry=this.geometry,ys.material=this.material,ys.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),vs.copy(this.boundingSphere),vs.applyMatrix4(i),t.ray.intersectsSphere(vs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Gn),Qc.multiplyMatrices(i,Gn),ys.matrixWorld=Qc,ys.raycast(t,_r);for(let a=0,o=_r.length;a<o;a++){let l=_r[a];l.instanceId=r,l.object=this,e.push(l)}_r.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Yr(new Float32Array(this.instanceMatrix.count*3),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}};var Ps=class extends Oi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new qt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},eh=new I,ih=new I,nh=new ce,ha=new gn,yr=new Fi,Fa=class extends Ee{constructor(t=new we,e=new Ps){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)eh.fromBufferAttribute(e,s-1),ih.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=eh.distanceTo(ih);t.setAttribute("lineDistance",new oe(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),yr.copy(i.boundingSphere),yr.applyMatrix4(s),yr.radius+=r,t.ray.intersectsSphere(yr)===!1)return;nh.copy(s).invert(),ha.copy(t.ray).applyMatrix4(nh);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new I,u=new I,d=new I,h=new I,f=this.isLineSegments?2:1,g=i.index,p=i.attributes.position;if(g!==null){let m=Math.max(0,a.start),y=Math.min(g.count,a.start+a.count);for(let x=m,v=y-1;x<v;x+=f){let S=g.getX(x),M=g.getX(x+1);if(c.fromBufferAttribute(p,S),u.fromBufferAttribute(p,M),ha.distanceSqToSegment(c,u,h,d)>l)continue;h.applyMatrix4(this.matrixWorld);let U=t.ray.origin.distanceTo(h);U<t.near||U>t.far||e.push({distance:U,point:d.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{let m=Math.max(0,a.start),y=Math.min(p.count,a.start+a.count);for(let x=m,v=y-1;x<v;x+=f){if(c.fromBufferAttribute(p,x),u.fromBufferAttribute(p,x+1),ha.distanceSqToSegment(c,u,h,d)>l)continue;h.applyMatrix4(this.matrixWorld);let M=t.ray.origin.distanceTo(h);M<t.near||M>t.far||e.push({distance:M,point:d.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}},sh=new I,rh=new I,Jr=class extends Fa{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)sh.fromBufferAttribute(e,s),rh.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+sh.distanceTo(rh);t.setAttribute("lineDistance",new oe(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Ls=class extends Oi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new qt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},oh=new ce,Oa=new gn,vr=new Fi,br=new I,Kr=class extends Ee{constructor(t=new we,e=new Ls){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),vr.copy(i.boundingSphere),vr.applyMatrix4(s),vr.radius+=r,t.ray.intersectsSphere(vr)===!1)return;oh.copy(s).invert(),Oa.copy(t.ray).applyMatrix4(oh);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,d=i.attributes.position;if(c!==null){let h=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=h,_=f;g<_;g++){let p=c.getX(g);br.fromBufferAttribute(d,p),ah(br,p,l,s,t,e,this)}}else{let h=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let g=h,_=f;g<_;g++)br.fromBufferAttribute(d,g),ah(br,g,l,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function ah(n,t,e,i,s,r,a){let o=Oa.distanceSqToPoint(n);if(o<e){let l=new I;Oa.closestPointToPoint(n,l),l.applyMatrix4(i);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,object:a})}}var hi=class extends ci{constructor(t,e,i,s,r,a,o,l,c){super(t,e,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},ui=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],i,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)i=this.getPoint(a/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let i=this.getLengths(),s=0,r=i.length,a;e?a=e:a=t*i[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=i[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===a)return s/(r-1);let u=i[s],h=i[s+1]-u,f=(a-u)/h;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new _t:new I);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){let i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){let i=new I,s=[],r=[],a=[],o=new I,l=new ce;for(let f=0;f<=t;f++){let g=f/t;s[f]=this.getTangentAt(g,new I)}r[0]=new I,a[0]=new I;let c=Number.MAX_VALUE,u=Math.abs(s[0].x),d=Math.abs(s[0].y),h=Math.abs(s[0].z);u<=c&&(c=u,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),h<=c&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(Xe(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(o,g))}a[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(Xe(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Is=class extends ui{constructor(t=0,e=0,i=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e){let i=e||new _t,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=l-this.aX,f=c-this.aY;l=h*u-f*d+this.aX,c=h*d+f*u+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Ba=class extends Is{constructor(t,e,i,s,r,a){super(t,e,i,i,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function hl(){let n=0,t=0,e=0,i=0;function s(r,a,o,l){n=r,t=o,e=-3*r+3*a-2*o-l,i=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,u,d){let h=(a-r)/c-(o-r)/(c+u)+(o-a)/u,f=(o-a)/u-(l-a)/(u+d)+(l-o)/d;h*=u,f*=u,s(a,o,h,f)},calc:function(r){let a=r*r,o=a*r;return n+t*r+e*a+i*o}}}var Mr=new I,ua=new hl,da=new hl,fa=new hl,Ds=class extends ui{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new I){let i=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,u;this.closed||o>0?c=s[(o-1)%r]:(Mr.subVectors(s[0],s[1]).add(s[0]),c=Mr);let d=s[o%r],h=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(Mr.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=Mr),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(h),f),p=Math.pow(h.distanceToSquared(u),f);_<1e-4&&(_=1),g<1e-4&&(g=_),p<1e-4&&(p=_),ua.initNonuniformCatmullRom(c.x,d.x,h.x,u.x,g,_,p),da.initNonuniformCatmullRom(c.y,d.y,h.y,u.y,g,_,p),fa.initNonuniformCatmullRom(c.z,d.z,h.z,u.z,g,_,p)}else this.curveType==="catmullrom"&&(ua.initCatmullRom(c.x,d.x,h.x,u.x,this.tension),da.initCatmullRom(c.y,d.y,h.y,u.y,this.tension),fa.initCatmullRom(c.z,d.z,h.z,u.z,this.tension));return i.set(ua.calc(l),da.calc(l),fa.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new I().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function lh(n,t,e,i,s){let r=(i-t)*.5,a=(s-e)*.5,o=n*n,l=n*o;return(2*e-2*i+r+a)*l+(-3*e+3*i-2*r-a)*o+r*n+e}function og(n,t){let e=1-n;return e*e*t}function ag(n,t){return 2*(1-n)*n*t}function lg(n,t){return n*n*t}function ws(n,t,e,i){return og(n,t)+ag(n,e)+lg(n,i)}function cg(n,t){let e=1-n;return e*e*e*t}function hg(n,t){let e=1-n;return 3*e*e*n*t}function ug(n,t){return 3*(1-n)*n*n*t}function dg(n,t){return n*n*n*t}function Ss(n,t,e,i,s){return cg(n,t)+hg(n,e)+ug(n,i)+dg(n,s)}var $r=class extends ui{constructor(t=new _t,e=new _t,i=new _t,s=new _t){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new _t){let i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(Ss(t,s.x,r.x,a.x,o.x),Ss(t,s.y,r.y,a.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ha=class extends ui{constructor(t=new I,e=new I,i=new I,s=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new I){let i=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return i.set(Ss(t,s.x,r.x,a.x,o.x),Ss(t,s.y,r.y,a.y,o.y),Ss(t,s.z,r.z,a.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},jr=class extends ui{constructor(t=new _t,e=new _t){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new _t){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new _t){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ga=class extends ui{constructor(t=new I,e=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new I){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new I){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Qr=class extends ui{constructor(t=new _t,e=new _t,i=new _t){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new _t){let i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(ws(t,s.x,r.x,a.x),ws(t,s.y,r.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},to=class extends ui{constructor(t=new I,e=new I,i=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new I){let i=e,s=this.v0,r=this.v1,a=this.v2;return i.set(ws(t,s.x,r.x,a.x),ws(t,s.y,r.y,a.y),ws(t,s.z,r.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},eo=class extends ui{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new _t){let i=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],u=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return i.set(lh(o,l.x,c.x,u.x,d.x),lh(o,l.y,c.y,u.y,d.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new _t().fromArray(s))}return this}},io=Object.freeze({__proto__:null,ArcCurve:Ba,CatmullRomCurve3:Ds,CubicBezierCurve:$r,CubicBezierCurve3:Ha,EllipseCurve:Is,LineCurve:jr,LineCurve3:Ga,QuadraticBezierCurve:Qr,QuadraticBezierCurve3:to,SplineCurve:eo}),Va=class extends ui{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new io[i](e,t))}return this}getPoint(t,e){let i=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=i){let a=s[r]-i,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],i;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){let u=l[c];i&&i.equals(u)||(e.push(u),i=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let s=t.curves[e];this.curves.push(new io[s.type]().fromJSON(s))}return this}},no=class extends Va{constructor(t){super(),this.type="Path",this.currentPoint=new _t,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let i=new jr(this.currentPoint.clone(),new _t(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){let r=new Qr(this.currentPoint.clone(),new _t(t,e),new _t(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,a){let o=new $r(this.currentPoint.clone(),new _t(t,e),new _t(i,s),new _t(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),i=new eo(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,i,s,r,a),this}absarc(t,e,i,s,r,a){return this.absellipse(t,e,i,i,s,r,a),this}ellipse(t,e,i,s,r,a,o,l){let c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+c,e+u,i,s,r,a,o,l),this}absellipse(t,e,i,s,r,a,o,l){let c=new Is(t,e,i,s,r,a,o,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}};var Bi=class n extends we{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);let r=[],a=[],o=[],l=[],c=new I,u=new _t;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,h=3;d<=e;d++,h+=3){let f=i+d/e*s;c.x=t*Math.cos(f),c.y=t*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[h]/t+1)/2,u.y=(a[h+1]/t+1)/2,l.push(u.x,u.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new oe(a,3)),this.setAttribute("normal",new oe(o,3)),this.setAttribute("uv",new oe(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.segments,t.thetaStart,t.thetaLength)}},St=class n extends we{constructor(t=1,e=1,i=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let u=[],d=[],h=[],f=[],g=0,_=[],p=i/2,m=0;y(),a===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(u),this.setAttribute("position",new oe(d,3)),this.setAttribute("normal",new oe(h,3)),this.setAttribute("uv",new oe(f,2));function y(){let v=new I,S=new I,M=0,b=(e-t)/i;for(let U=0;U<=r;U++){let E=[],T=U/r,C=T*(e-t)+t;for(let F=0;F<=s;F++){let et=F/s,D=et*l+o,O=Math.sin(D),Y=Math.cos(D);S.x=C*O,S.y=-T*i+p,S.z=C*Y,d.push(S.x,S.y,S.z),v.set(O,b,Y).normalize(),h.push(v.x,v.y,v.z),f.push(et,1-T),E.push(g++)}_.push(E)}for(let U=0;U<s;U++)for(let E=0;E<r;E++){let T=_[E][U],C=_[E+1][U],F=_[E+1][U+1],et=_[E][U+1];u.push(T,C,et),u.push(C,F,et),M+=6}c.addGroup(m,M,0),m+=M}function x(v){let S=g,M=new _t,b=new I,U=0,E=v===!0?t:e,T=v===!0?1:-1;for(let F=1;F<=s;F++)d.push(0,p*T,0),h.push(0,T,0),f.push(.5,.5),g++;let C=g;for(let F=0;F<=s;F++){let D=F/s*l+o,O=Math.cos(D),Y=Math.sin(D);b.x=E*Y,b.y=p*T,b.z=E*O,d.push(b.x,b.y,b.z),h.push(0,T,0),M.x=O*.5+.5,M.y=Y*.5*T+.5,f.push(M.x,M.y),g++}for(let F=0;F<s;F++){let et=S+F,D=C+F;v===!0?u.push(D,D+1,et):u.push(D+1,D,et),U+=3}c.addGroup(m,U,v===!0?1:2),m+=U}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},xn=class n extends St{constructor(t=1,e=1,i=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,i,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new n(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var _n=class extends no{constructor(t){super(t),this.uuid=rs(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let s=t.holes[e];this.holes.push(new no().fromJSON(s))}return this}},fg={triangulate:function(n,t,e=2){let i=t&&t.length,s=i?t[0]*e:n.length,r=Fh(n,0,s,e,!0),a=[];if(!r||r.next===r.prev)return a;let o,l,c,u,d,h,f;if(i&&(r=_g(n,t,r,e)),n.length>80*e){o=c=n[0],l=u=n[1];for(let g=e;g<s;g+=e)d=n[g],h=n[g+1],d<o&&(o=d),h<l&&(l=h),d>c&&(c=d),h>u&&(u=h);f=Math.max(c-o,u-l),f=f!==0?32767/f:0}return Us(r,a,e,o,l,f,0),a}};function Fh(n,t,e,i,s){let r,a;if(s===Cg(n,t,e,i)>0)for(r=t;r<e;r+=i)a=ch(r,n[r],n[r+1],a);else for(r=e-i;r>=t;r-=i)a=ch(r,n[r],n[r+1],a);return a&&fo(a,a.next)&&(Ns(a),a=a.next),a}function yn(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(fo(e,e.next)||ve(e.prev,e,e.next)===0)){if(Ns(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function Us(n,t,e,i,s,r,a){if(!n)return;!a&&r&&Eg(n,i,s,r);let o=n,l,c;for(;n.prev!==n.next;){if(l=n.prev,c=n.next,r?mg(n,i,s,r):pg(n)){t.push(l.i/e|0),t.push(n.i/e|0),t.push(c.i/e|0),Ns(n),n=c.next,o=c.next;continue}if(n=c,n===o){a?a===1?(n=gg(yn(n),t,e),Us(n,t,e,i,s,r,2)):a===2&&xg(n,t,e,i,s,r):Us(yn(n),t,e,i,s,r,1);break}}}function pg(n){let t=n.prev,e=n,i=n.next;if(ve(t,e,i)>=0)return!1;let s=t.x,r=e.x,a=i.x,o=t.y,l=e.y,c=i.y,u=s<r?s<a?s:a:r<a?r:a,d=o<l?o<c?o:c:l<c?l:c,h=s>r?s>a?s:a:r>a?r:a,f=o>l?o>c?o:c:l>c?l:c,g=i.next;for(;g!==t;){if(g.x>=u&&g.x<=h&&g.y>=d&&g.y<=f&&qn(s,o,r,l,a,c,g.x,g.y)&&ve(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function mg(n,t,e,i){let s=n.prev,r=n,a=n.next;if(ve(s,r,a)>=0)return!1;let o=s.x,l=r.x,c=a.x,u=s.y,d=r.y,h=a.y,f=o<l?o<c?o:c:l<c?l:c,g=u<d?u<h?u:h:d<h?d:h,_=o>l?o>c?o:c:l>c?l:c,p=u>d?u>h?u:h:d>h?d:h,m=Wa(f,g,t,e,i),y=Wa(_,p,t,e,i),x=n.prevZ,v=n.nextZ;for(;x&&x.z>=m&&v&&v.z<=y;){if(x.x>=f&&x.x<=_&&x.y>=g&&x.y<=p&&x!==s&&x!==a&&qn(o,u,l,d,c,h,x.x,x.y)&&ve(x.prev,x,x.next)>=0||(x=x.prevZ,v.x>=f&&v.x<=_&&v.y>=g&&v.y<=p&&v!==s&&v!==a&&qn(o,u,l,d,c,h,v.x,v.y)&&ve(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;x&&x.z>=m;){if(x.x>=f&&x.x<=_&&x.y>=g&&x.y<=p&&x!==s&&x!==a&&qn(o,u,l,d,c,h,x.x,x.y)&&ve(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;v&&v.z<=y;){if(v.x>=f&&v.x<=_&&v.y>=g&&v.y<=p&&v!==s&&v!==a&&qn(o,u,l,d,c,h,v.x,v.y)&&ve(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function gg(n,t,e){let i=n;do{let s=i.prev,r=i.next.next;!fo(s,r)&&Oh(s,i,i.next,r)&&zs(s,r)&&zs(r,s)&&(t.push(s.i/e|0),t.push(i.i/e|0),t.push(r.i/e|0),Ns(i),Ns(i.next),i=n=r),i=i.next}while(i!==n);return yn(i)}function xg(n,t,e,i,s,r){let a=n;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Tg(a,o)){let l=Bh(a,o);a=yn(a,a.next),l=yn(l,l.next),Us(a,t,e,i,s,r,0),Us(l,t,e,i,s,r,0);return}o=o.next}a=a.next}while(a!==n)}function _g(n,t,e,i){let s=[],r,a,o,l,c;for(r=0,a=t.length;r<a;r++)o=t[r]*i,l=r<a-1?t[r+1]*i:n.length,c=Fh(n,o,l,i,!1),c===c.next&&(c.steiner=!0),s.push(Sg(c));for(s.sort(yg),r=0;r<s.length;r++)e=vg(s[r],e);return e}function yg(n,t){return n.x-t.x}function vg(n,t){let e=bg(n,t);if(!e)return t;let i=Bh(e,n);return yn(i,i.next),yn(e,e.next)}function bg(n,t){let e=t,i=-1/0,s,r=n.x,a=n.y;do{if(a<=e.y&&a>=e.next.y&&e.next.y!==e.y){let h=e.x+(a-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(h<=r&&h>i&&(i=h,s=e.x<e.next.x?e:e.next,h===r))return s}e=e.next}while(e!==t);if(!s)return null;let o=s,l=s.x,c=s.y,u=1/0,d;e=s;do r>=e.x&&e.x>=l&&r!==e.x&&qn(a<c?r:i,a,l,c,a<c?i:r,a,e.x,e.y)&&(d=Math.abs(a-e.y)/(r-e.x),zs(e,n)&&(d<u||d===u&&(e.x>s.x||e.x===s.x&&Mg(s,e)))&&(s=e,u=d)),e=e.next;while(e!==o);return s}function Mg(n,t){return ve(n.prev,n,t.prev)<0&&ve(t.next,n,n.next)<0}function Eg(n,t,e,i){let s=n;do s.z===0&&(s.z=Wa(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,wg(s)}function wg(n){let t,e,i,s,r,a,o,l,c=1;do{for(e=n,n=null,r=null,a=0;e;){for(a++,i=e,o=0,t=0;t<c&&(o++,i=i.nextZ,!!i);t++);for(l=c;o>0||l>0&&i;)o!==0&&(l===0||!i||e.z<=i.z)?(s=e,e=e.nextZ,o--):(s=i,i=i.nextZ,l--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;e=i}r.nextZ=null,c*=2}while(a>1);return n}function Wa(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function Sg(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function qn(n,t,e,i,s,r,a,o){return(s-a)*(t-o)>=(n-a)*(r-o)&&(n-a)*(i-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(i-o)}function Tg(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!Ag(n,t)&&(zs(n,t)&&zs(t,n)&&Rg(n,t)&&(ve(n.prev,n,t.prev)||ve(n,t.prev,t))||fo(n,t)&&ve(n.prev,n,n.next)>0&&ve(t.prev,t,t.next)>0)}function ve(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function fo(n,t){return n.x===t.x&&n.y===t.y}function Oh(n,t,e,i){let s=wr(ve(n,t,e)),r=wr(ve(n,t,i)),a=wr(ve(e,i,n)),o=wr(ve(e,i,t));return!!(s!==r&&a!==o||s===0&&Er(n,e,t)||r===0&&Er(n,i,t)||a===0&&Er(e,n,i)||o===0&&Er(e,t,i))}function Er(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function wr(n){return n>0?1:n<0?-1:0}function Ag(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&Oh(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function zs(n,t){return ve(n.prev,n,n.next)<0?ve(n,t,n.next)>=0&&ve(n,n.prev,t)>=0:ve(n,t,n.prev)<0||ve(n,n.next,t)<0}function Rg(n,t){let e=n,i=!1,s=(n.x+t.x)/2,r=(n.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function Bh(n,t){let e=new Xa(n.i,n.x,n.y),i=new Xa(t.i,t.x,t.y),s=n.next,r=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function ch(n,t,e,i){let s=new Xa(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function Ns(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Xa(n,t,e){this.i=n,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Cg(n,t,e,i){let s=0;for(let r=t,a=e-i;r<e;r+=i)s+=(n[a]-n[r])*(n[r+1]+n[a+1]),a=r;return s}var Ts=class n{static area(t){let e=t.length,i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return n.area(t)<0}static triangulateShape(t,e){let i=[],s=[],r=[];hh(t),uh(i,t);let a=t.length;e.forEach(hh);for(let l=0;l<e.length;l++)s.push(a),a+=e[l].length,uh(i,e[l]);let o=fg.triangulate(i,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}};function hh(n){let t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function uh(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}var is=class n extends we{constructor(t=new _n([new _t(.5,.5),new _t(-.5,.5),new _t(-.5,-.5),new _t(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let i=this,s=[],r=[];for(let o=0,l=t.length;o<l;o++){let c=t[o];a(c)}this.setAttribute("position",new oe(s,3)),this.setAttribute("uv",new oe(r,2)),this.computeVertexNormals();function a(o){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,u=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1,h=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:f-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,p=e.bevelSegments!==void 0?e.bevelSegments:3,m=e.extrudePath,y=e.UVGenerator!==void 0?e.UVGenerator:Pg,x,v=!1,S,M,b,U;m&&(x=m.getSpacedPoints(u),v=!0,h=!1,S=m.computeFrenetFrames(u,!1),M=new I,b=new I,U=new I),h||(p=0,f=0,g=0,_=0);let E=o.extractPoints(c),T=E.shape,C=E.holes;if(!Ts.isClockWise(T)){T=T.reverse();for(let R=0,H=C.length;R<H;R++){let k=C[R];Ts.isClockWise(k)&&(C[R]=k.reverse())}}let et=Ts.triangulateShape(T,C),D=T;for(let R=0,H=C.length;R<H;R++){let k=C[R];T=T.concat(k)}function O(R,H,k){return H||console.error("THREE.ExtrudeGeometry: vec does not exist"),R.clone().addScaledVector(H,k)}let Y=T.length,rt=et.length;function it(R,H,k){let q,G,gt,bt=R.x-H.x,A=R.y-H.y,w=k.x-R.x,W=k.y-R.y,ct=bt*bt+A*A,lt=bt*W-A*w;if(Math.abs(lt)>Number.EPSILON){let at=Math.sqrt(ct),Ct=Math.sqrt(w*w+W*W),Mt=H.x-A/at,Tt=H.y+bt/at,Dt=k.x-W/Ct,Ht=k.y+w/Ct,ut=((Dt-Mt)*W-(Ht-Tt)*w)/(bt*W-A*w);q=Mt+bt*ut-R.x,G=Tt+A*ut-R.y;let ne=q*q+G*G;if(ne<=2)return new _t(q,G);gt=Math.sqrt(ne/2)}else{let at=!1;bt>Number.EPSILON?w>Number.EPSILON&&(at=!0):bt<-Number.EPSILON?w<-Number.EPSILON&&(at=!0):Math.sign(A)===Math.sign(W)&&(at=!0),at?(q=-A,G=bt,gt=Math.sqrt(ct)):(q=bt,G=A,gt=Math.sqrt(ct/2))}return new _t(q/gt,G/gt)}let Z=[];for(let R=0,H=D.length,k=H-1,q=R+1;R<H;R++,k++,q++)k===H&&(k=0),q===H&&(q=0),Z[R]=it(D[R],D[k],D[q]);let st=[],ht,tt=Z.concat();for(let R=0,H=C.length;R<H;R++){let k=C[R];ht=[];for(let q=0,G=k.length,gt=G-1,bt=q+1;q<G;q++,gt++,bt++)gt===G&&(gt=0),bt===G&&(bt=0),ht[q]=it(k[q],k[gt],k[bt]);st.push(ht),tt=tt.concat(ht)}for(let R=0;R<p;R++){let H=R/p,k=f*Math.cos(H*Math.PI/2),q=g*Math.sin(H*Math.PI/2)+_;for(let G=0,gt=D.length;G<gt;G++){let bt=O(D[G],Z[G],q);vt(bt.x,bt.y,-k)}for(let G=0,gt=C.length;G<gt;G++){let bt=C[G];ht=st[G];for(let A=0,w=bt.length;A<w;A++){let W=O(bt[A],ht[A],q);vt(W.x,W.y,-k)}}}let B=g+_;for(let R=0;R<Y;R++){let H=h?O(T[R],tt[R],B):T[R];v?(b.copy(S.normals[0]).multiplyScalar(H.x),M.copy(S.binormals[0]).multiplyScalar(H.y),U.copy(x[0]).add(b).add(M),vt(U.x,U.y,U.z)):vt(H.x,H.y,0)}for(let R=1;R<=u;R++)for(let H=0;H<Y;H++){let k=h?O(T[H],tt[H],B):T[H];v?(b.copy(S.normals[R]).multiplyScalar(k.x),M.copy(S.binormals[R]).multiplyScalar(k.y),U.copy(x[R]).add(b).add(M),vt(U.x,U.y,U.z)):vt(k.x,k.y,d/u*R)}for(let R=p-1;R>=0;R--){let H=R/p,k=f*Math.cos(H*Math.PI/2),q=g*Math.sin(H*Math.PI/2)+_;for(let G=0,gt=D.length;G<gt;G++){let bt=O(D[G],Z[G],q);vt(bt.x,bt.y,d+k)}for(let G=0,gt=C.length;G<gt;G++){let bt=C[G];ht=st[G];for(let A=0,w=bt.length;A<w;A++){let W=O(bt[A],ht[A],q);v?vt(W.x,W.y+x[u-1].y,x[u-1].x+k):vt(W.x,W.y,d+k)}}}ot(),ft();function ot(){let R=s.length/3;if(h){let H=0,k=Y*H;for(let q=0;q<rt;q++){let G=et[q];Ut(G[2]+k,G[1]+k,G[0]+k)}H=u+p*2,k=Y*H;for(let q=0;q<rt;q++){let G=et[q];Ut(G[0]+k,G[1]+k,G[2]+k)}}else{for(let H=0;H<rt;H++){let k=et[H];Ut(k[2],k[1],k[0])}for(let H=0;H<rt;H++){let k=et[H];Ut(k[0]+Y*u,k[1]+Y*u,k[2]+Y*u)}}i.addGroup(R,s.length/3-R,0)}function ft(){let R=s.length/3,H=0;mt(D,H),H+=D.length;for(let k=0,q=C.length;k<q;k++){let G=C[k];mt(G,H),H+=G.length}i.addGroup(R,s.length/3-R,1)}function mt(R,H){let k=R.length;for(;--k>=0;){let q=k,G=k-1;G<0&&(G=R.length-1);for(let gt=0,bt=u+p*2;gt<bt;gt++){let A=Y*gt,w=Y*(gt+1),W=H+q+A,ct=H+G+A,lt=H+G+w,at=H+q+w;Ft(W,ct,lt,at)}}}function vt(R,H,k){l.push(R),l.push(H),l.push(k)}function Ut(R,H,k){L(R),L(H),L(k);let q=s.length/3,G=y.generateTopUV(i,s,q-3,q-2,q-1);z(G[0]),z(G[1]),z(G[2])}function Ft(R,H,k,q){L(R),L(H),L(q),L(H),L(k),L(q);let G=s.length/3,gt=y.generateSideWallUV(i,s,G-6,G-3,G-2,G-1);z(gt[0]),z(gt[1]),z(gt[3]),z(gt[1]),z(gt[2]),z(gt[3])}function L(R){s.push(l[R*3+0]),s.push(l[R*3+1]),s.push(l[R*3+2])}function z(R){r.push(R.x),r.push(R.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,i=this.parameters.options;return Lg(e,i,t)}static fromJSON(t,e){let i=[];for(let r=0,a=t.shapes.length;r<a;r++){let o=e[t.shapes[r]];i.push(o)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new io[s.type]().fromJSON(s)),new n(i,t.options)}},Pg={generateTopUV:function(n,t,e,i,s){let r=t[e*3],a=t[e*3+1],o=t[i*3],l=t[i*3+1],c=t[s*3],u=t[s*3+1];return[new _t(r,a),new _t(o,l),new _t(c,u)]},generateSideWallUV:function(n,t,e,i,s,r){let a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[i*3],u=t[i*3+1],d=t[i*3+2],h=t[s*3],f=t[s*3+1],g=t[s*3+2],_=t[r*3],p=t[r*3+1],m=t[r*3+2];return Math.abs(o-u)<Math.abs(a-c)?[new _t(a,1-l),new _t(c,1-d),new _t(h,1-g),new _t(_,1-m)]:[new _t(o,1-l),new _t(u,1-d),new _t(f,1-g),new _t(p,1-m)]}};function Lg(n,t,e){if(e.shapes=[],Array.isArray(n))for(let i=0,s=n.length;i<s;i++){let r=n[i];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var He=class n extends we{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let l=Math.min(a+o,Math.PI),c=0,u=[],d=new I,h=new I,f=[],g=[],_=[],p=[];for(let m=0;m<=i;m++){let y=[],x=m/i,v=0;m===0&&a===0?v=.5/e:m===i&&l===Math.PI&&(v=-.5/e);for(let S=0;S<=e;S++){let M=S/e;d.x=-t*Math.cos(s+M*r)*Math.sin(a+x*o),d.y=t*Math.cos(a+x*o),d.z=t*Math.sin(s+M*r)*Math.sin(a+x*o),g.push(d.x,d.y,d.z),h.copy(d).normalize(),_.push(h.x,h.y,h.z),p.push(M+v,1-x),y.push(c++)}u.push(y)}for(let m=0;m<i;m++)for(let y=0;y<e;y++){let x=u[m][y+1],v=u[m][y],S=u[m+1][y],M=u[m+1][y+1];(m!==0||a>0)&&f.push(x,v,M),(m!==i-1||l<Math.PI)&&f.push(v,S,M)}this.setIndex(f),this.setAttribute("position",new oe(g,3)),this.setAttribute("normal",new oe(_,3)),this.setAttribute("uv",new oe(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var ti=class n extends we{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);let a=[],o=[],l=[],c=[],u=new I,d=new I,h=new I;for(let f=0;f<=i;f++)for(let g=0;g<=s;g++){let _=g/s*r,p=f/i*Math.PI*2;d.x=(t+e*Math.cos(p))*Math.cos(_),d.y=(t+e*Math.cos(p))*Math.sin(_),d.z=e*Math.sin(p),o.push(d.x,d.y,d.z),u.x=t*Math.cos(_),u.y=t*Math.sin(_),h.subVectors(d,u).normalize(),l.push(h.x,h.y,h.z),c.push(g/s),c.push(f/i)}for(let f=1;f<=i;f++)for(let g=1;g<=s;g++){let _=(s+1)*f+g-1,p=(s+1)*(f-1)+g-1,m=(s+1)*(f-1)+g,y=(s+1)*f+g;a.push(_,p,y),a.push(p,m,y)}this.setIndex(a),this.setAttribute("position",new oe(o,3)),this.setAttribute("normal",new oe(l,3)),this.setAttribute("uv",new oe(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var so=class n extends we{constructor(t=new to(new I(-1,-1,0),new I(-1,1,0),new I(1,1,0)),e=64,i=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:i,radialSegments:s,closed:r};let a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new I,l=new I,c=new _t,u=new I,d=[],h=[],f=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new oe(d,3)),this.setAttribute("normal",new oe(h,3)),this.setAttribute("uv",new oe(f,2));function _(){for(let x=0;x<e;x++)p(x);p(r===!1?e:0),y(),m()}function p(x){u=t.getPointAt(x/e,u);let v=a.normals[x],S=a.binormals[x];for(let M=0;M<=s;M++){let b=M/s*Math.PI*2,U=Math.sin(b),E=-Math.cos(b);l.x=E*v.x+U*S.x,l.y=E*v.y+U*S.y,l.z=E*v.z+U*S.z,l.normalize(),h.push(l.x,l.y,l.z),o.x=u.x+i*l.x,o.y=u.y+i*l.y,o.z=u.z+i*l.z,d.push(o.x,o.y,o.z)}}function m(){for(let x=1;x<=e;x++)for(let v=1;v<=s;v++){let S=(s+1)*(x-1)+(v-1),M=(s+1)*x+(v-1),b=(s+1)*x+v,U=(s+1)*(x-1)+v;g.push(S,M,U),g.push(M,b,U)}}function y(){for(let x=0;x<=e;x++)for(let v=0;v<=s;v++)c.x=x/e,c.y=v/s,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new n(new io[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};var Ie=class extends Oi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new qt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ah,this.normalScale=new _t(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function Sr(n,t,e){return!n||!e&&n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function Ig(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}var ns=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];i:{t:{let a;e:{n:if(!(t<s)){for(let o=i+2;;){if(s===void 0){if(t<r)break n;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=e[++i],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=e[--i-1],t>=r)break t}a=i,i=0;break e}break i}for(;i<a;){let o=i+a>>>1;t<e[o]?a=o:i=o+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=i[r+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},qa=class extends ns{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:cc,endingEnd:cc}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case hc:r=t,o=2*e-i;break;case uc:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case hc:a=t,l=2*i-e;break;case uc:a=1,l=i+s[1]-s[0];break;default:a=t-1,l=e}let c=(i-e)*.5,u=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-i),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,f=this._weightNext,g=(i-e)/(s-e),_=g*g,p=_*g,m=-h*p+2*h*_-h*g,y=(1+h)*p+(-1.5-2*h)*_+(-.5+h)*g+1,x=(-1-f)*p+(1.5+f)*_+.5*g,v=f*p-f*_;for(let S=0;S!==o;++S)r[S]=m*a[u+S]+y*a[c+S]+x*a[l+S]+v*a[d+S];return r}},Ya=class extends ns{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,u=(i-e)/(s-e),d=1-u;for(let h=0;h!==o;++h)r[h]=a[c+h]*d+a[l+h]*u;return r}},Za=class extends ns{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},vi=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Sr(e,this.TimeBufferType),this.values=Sr(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:Sr(t.times,Array),values:Sr(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Za(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Ya(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new qa(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Ar:e=this.InterpolantFactoryMethodDiscrete;break;case Rr:e=this.InterpolantFactoryMethodLinear;break;case Oo:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ar;case this.InterpolantFactoryMethodLinear:return Rr;case this.InterpolantFactoryMethodSmooth:return Oo}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t}return this}trim(t,e){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<t;)++r;for(;a!==-1&&i[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&Ig(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Oo,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],u=t[o+1];if(c!==u&&(o!==1||c!==t[0]))if(s)l=!0;else{let d=o*i,h=d-i,f=d+i;for(let g=0;g!==i;++g){let _=e[d+g];if(_!==e[h+g]||_!==e[f+g]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let d=o*i,h=a*i;for(let f=0;f!==i;++f)e[h+f]=e[d+f]}++a}}if(r>0){t[a]=t[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};vi.prototype.TimeBufferType=Float32Array;vi.prototype.ValueBufferType=Float32Array;vi.prototype.DefaultInterpolation=Rr;var vn=class extends vi{};vn.prototype.ValueTypeName="bool";vn.prototype.ValueBufferType=Array;vn.prototype.DefaultInterpolation=Ar;vn.prototype.InterpolantFactoryMethodLinear=void 0;vn.prototype.InterpolantFactoryMethodSmooth=void 0;var Ja=class extends vi{};Ja.prototype.ValueTypeName="color";var Ka=class extends vi{};Ka.prototype.ValueTypeName="number";var $a=class extends ns{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-e)/(s-e),c=t*o;for(let u=c+o;c!==u;c+=4)$i.slerpFlat(r,0,a,c-o,a,c,l);return r}},ks=class extends vi{InterpolantFactoryMethodLinear(t){return new $a(this.times,this.values,this.getValueSize(),t)}};ks.prototype.ValueTypeName="quaternion";ks.prototype.DefaultInterpolation=Rr;ks.prototype.InterpolantFactoryMethodSmooth=void 0;var bn=class extends vi{};bn.prototype.ValueTypeName="string";bn.prototype.ValueBufferType=Array;bn.prototype.DefaultInterpolation=Ar;bn.prototype.InterpolantFactoryMethodLinear=void 0;bn.prototype.InterpolantFactoryMethodSmooth=void 0;var ja=class extends vi{};ja.prototype.ValueTypeName="vector";var Qa=class{constructor(t,e,i){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){let d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=c.length;d<h;d+=2){let f=c[d],g=c[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null}}},Dg=new Qa,tl=class{constructor(t){this.manager=t!==void 0?t:Dg,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};tl.DEFAULT_MATERIAL_NAME="__DEFAULT";var ss=class extends Ee{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new qt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}},ro=class extends ss{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ee.DEFAULT_UP),this.updateMatrix(),this.groundColor=new qt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},pa=new ce,dh=new I,fh=new I,Fs=class{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new _t(512,512),this.map=null,this.mapPass=null,this.matrix=new ce,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Rs,this._frameExtents=new _t(1,1),this._viewportCount=1,this._viewports=[new _e(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,i=this.matrix;dh.setFromMatrixPosition(t.matrixWorld),e.position.copy(dh),fh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(fh),e.updateMatrixWorld(),pa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(pa),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(pa)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},el=class extends Fs{constructor(){super(new Oe(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){let e=this.camera,i=Dr*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=t.distance||e.far;(i!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=i,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}},oo=class extends ss{constructor(t,e,i=0,s=Math.PI/3,r=0,a=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ee.DEFAULT_UP),this.updateMatrix(),this.target=new Ee,this.distance=i,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new el}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},ph=new ce,bs=new I,ma=new I,il=class extends Fs{constructor(){super(new Oe(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new _t(4,2),this._viewportCount=6,this._viewports=[new _e(2,1,1,1),new _e(0,1,1,1),new _e(3,1,1,1),new _e(1,1,1,1),new _e(3,0,1,1),new _e(1,0,1,1)],this._cubeDirections=[new I(1,0,0),new I(-1,0,0),new I(0,0,1),new I(0,0,-1),new I(0,1,0),new I(0,-1,0)],this._cubeUps=[new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,1,0),new I(0,0,1),new I(0,0,-1)]}updateMatrices(t,e=0){let i=this.camera,s=this.matrix,r=t.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),bs.setFromMatrixPosition(t.matrixWorld),i.position.copy(bs),ma.copy(i.position),ma.add(this._cubeDirections[e]),i.up.copy(this._cubeUps[e]),i.lookAt(ma),i.updateMatrixWorld(),s.makeTranslation(-bs.x,-bs.y,-bs.z),ph.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ph)}},Fe=class extends ss{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new il}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},nl=class extends Fs{constructor(){super(new es(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ao=class extends ss{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ee.DEFAULT_UP),this.updateMatrix(),this.target=new Ee,this.shadow=new nl}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var lo=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=mh(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=mh();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};function mh(){return(typeof performance=="undefined"?Date:performance).now()}var ul="\\[\\]\\.:\\/",Ug=new RegExp("["+ul+"]","g"),dl="[^"+ul+"]",zg="[^"+ul.replace("\\.","")+"]",Ng=/((?:WC+[\/:])*)/.source.replace("WC",dl),kg=/(WCOD+)?/.source.replace("WCOD",zg),Fg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",dl),Og=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",dl),Bg=new RegExp("^"+Ng+kg+Fg+Og+"$"),Hg=["material","materials","bones","map"],sl=class{constructor(t,e,i){let s=i||xe.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},xe=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Ug,"")}static parseTrackName(t){let e=Bg.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);Hg.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=i(o.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===c){c=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};xe.Composite=sl;xe.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};xe.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};xe.prototype.GetterByBindingType=[xe.prototype._getValue_direct,xe.prototype._getValue_array,xe.prototype._getValue_arrayElement,xe.prototype._getValue_toArray];xe.prototype.SetterByBindingTypeAndVersioning=[[xe.prototype._setValue_direct,xe.prototype._setValue_direct_setNeedsUpdate,xe.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[xe.prototype._setValue_array,xe.prototype._setValue_array_setNeedsUpdate,xe.prototype._setValue_array_setMatrixWorldNeedsUpdate],[xe.prototype._setValue_arrayElement,xe.prototype._setValue_arrayElement_setNeedsUpdate,xe.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[xe.prototype._setValue_fromArray,xe.prototype._setValue_fromArray_setNeedsUpdate,xe.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var H1=new Float32Array(1);typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"160"}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="160");var as=new Qn(0,0,0,"YXZ"),ls=new I,Gg={type:"change"},Vg={type:"lock"},Wg={type:"unlock"},Hh=Math.PI/2,po=class extends Si{constructor(t,e){super(),this.camera=t,this.domElement=e,this.isLocked=!1,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.pointerSpeed=1,this._onMouseMove=Xg.bind(this),this._onPointerlockChange=qg.bind(this),this._onPointerlockError=Yg.bind(this),this.connect()}connect(){this.domElement.ownerDocument.addEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.addEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.addEventListener("pointerlockerror",this._onPointerlockError)}disconnect(){this.domElement.ownerDocument.removeEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.removeEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.removeEventListener("pointerlockerror",this._onPointerlockError)}dispose(){this.disconnect()}getObject(){return this.camera}getDirection(t){return t.set(0,0,-1).applyQuaternion(this.camera.quaternion)}moveForward(t){let e=this.camera;ls.setFromMatrixColumn(e.matrix,0),ls.crossVectors(e.up,ls),e.position.addScaledVector(ls,t)}moveRight(t){let e=this.camera;ls.setFromMatrixColumn(e.matrix,0),e.position.addScaledVector(ls,t)}lock(){this.domElement.requestPointerLock()}unlock(){this.domElement.ownerDocument.exitPointerLock()}};function Xg(n){if(this.isLocked===!1)return;let t=n.movementX||n.mozMovementX||n.webkitMovementX||0,e=n.movementY||n.mozMovementY||n.webkitMovementY||0,i=this.camera;as.setFromQuaternion(i.quaternion),as.y-=t*.002*this.pointerSpeed,as.x-=e*.002*this.pointerSpeed,as.x=Math.max(Hh-this.maxPolarAngle,Math.min(Hh-this.minPolarAngle,as.x)),i.quaternion.setFromEuler(as),this.dispatchEvent(Gg)}function qg(){this.domElement.ownerDocument.pointerLockElement===this.domElement?(this.dispatchEvent(Vg),this.isLocked=!0):(this.dispatchEvent(Wg),this.isLocked=!1)}function Yg(){console.error("THREE.PointerLockControls: Unable to use Pointer Lock API")}var Gh={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};var Hi=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},Zg=new es(-1,1,1,-1,0,1),fl=class extends we{constructor(){super(),this.setAttribute("position",new oe([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new oe([0,2,0,0,2,0],2))}},Jg=new fl,mo=class{constructor(t){this._mesh=new K(Jg,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Zg)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}};var cs=class extends Hi{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof $e?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=ll.clone(t.uniforms),this.material=new $e({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new mo(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var Os=class extends Hi{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){let s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),r.buffers.stencil.setClear(o),r.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},go=class extends Hi{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}};var xo=class{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){let i=t.getSize(new _t);this._width=i.width,this._height=i.height,e=new yi(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:mn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new cs(Gh),this.copyPass.material.blending=Ei,this.clock=new lo}swapBuffers(){let t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){let e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());let e=this.renderer.getRenderTarget(),i=!1;for(let s=0,r=this.passes.length;s<r;s++){let a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),a.needsSwap){if(i){let o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Os!==void 0&&(a instanceof Os?i=!0:a instanceof go&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){let e=this.renderer.getSize(new _t);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;let i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var _o=class extends Hi{constructor(t,e,i=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new qt}render(t,e,i){let s=t.autoClear;t.autoClear=!1;let r,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor)),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=s}};function Lt(n){let t=n>>>0;return function(){t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}var dt=(n=1,t)=>t===void 0?Math.random()*n:n+Math.random()*(t-n),Mn=n=>Math.random()<n,En=n=>n[Math.random()*n.length|0],Qt=(n,t,e)=>Math.max(t,Math.min(e,n)),ei=(n,t,e)=>n+(t-n)*e;function Ye(n,t,e,i,s,r){let a=i/2,o=s/2,l=r/2;return{x0:n-a,y0:t-o,z0:e-l,x1:n+a,y1:t+o,z1:e+l}}function Bs(n,t,e,i,s){return{x0:n-i,y0:t,z0:e-i,x1:n+i,y1:t+s,z1:e+i}}function yo(n,t,e,i,s,r=.35,a={}){let o=Math.max(1,Math.ceil(Math.max(Math.abs(t),Math.abs(e),Math.abs(i))/.18)),l={grounded:!1,blocked:!1};for(let c=0;c<o;c++){let u=Kg(n,t/o,e/o,i/o,s,r,a);l={grounded:u.grounded,blocked:l.blocked||u.blocked}}return l}function Kg(n,t,e,i,s,r,a){var M;let o=n.y0,l=n.x1-n.x0,c=n.z1-n.z0,u=o+((M=a.bodyHeight)!=null?M:n.y1-n.y0),d=!1,h=n.x0,f=n.x1,g=n.z0,_=n.z1,p=b=>!s.some(U=>U!==b&&U.x0<n.x1&&U.x1>n.x0&&U.z0<n.z1&&U.z1>n.z0&&U.y0<b.y1+(u-o)&&U.y1>Math.max(b.y1,u)),m=b=>b.x0<n.x1&&b.x1>n.x0&&b.z0<n.z1&&b.z1>n.z0&&(b.y1>o+r||b.y1>o+.1&&!p(b))&&b.y0<u-.08,y=[];for(let b of s)b.x0<n.x1&&b.x1>n.x0&&b.z0<n.z1&&b.z1>n.z0&&b.y1>o+r&&b.y0<u-.08&&y.push(b);if(t!==0){h=n.x0,f=n.x1,n.x0+=t,n.x1+=t;for(let b of s)m(b)&&(t>0&&f<=b.x0+.001?(n.x1=b.x0-.001,n.x0=n.x1-l,d=!0):t<0&&h>=b.x1-.001&&(n.x0=b.x1+.001,n.x1=n.x0+l,d=!0))}if(i!==0){g=n.z0,_=n.z1,n.z0+=i,n.z1+=i;for(let b of s)m(b)&&(i>0&&_<=b.z0+.001?(n.z1=b.z0-.001,n.z0=n.z1-c,d=!0):i<0&&g>=b.z1-.001&&(n.z0=b.z1+.001,n.z1=n.z0+c,d=!0))}for(let b of y){if(!m(b))continue;let U=b.x1-b.x0,E=b.z1-b.z0,T=Math.min(n.x1,b.x1)-Math.max(n.x0,b.x0),C=Math.min(n.z1,b.z1)-Math.max(n.z0,b.z0);if(T>.001&&U<l){let F=n.x1-b.x0,et=b.x1-n.x0,D={x0:b.x0-.001-l,x1:b.x0-.001,y0:n.y0,y1:n.y1,z0:n.z0,z1:n.z1},O={x0:b.x1+.001,x1:b.x1+.001+l,y0:n.y0,y1:n.y1,z0:n.z0,z1:n.z1},Y=Z=>{for(let st of s)if(st!==b&&st.x0<Z.x1&&st.x1>Z.x0&&st.z0<Z.z1&&st.z1>Z.z0&&st.y1>Z.y0+r&&st.y0<Z.y0+(Z.y1-Z.y0)-.08)return!0;return!1},rt=Y(D),it=Y(O);if(rt&&it){d=!0;continue}rt&&!it?(n.x0=O.x0,n.x1=O.x1):it&&!rt||F<=et?(n.x0=D.x0,n.x1=D.x1):(n.x0=O.x0,n.x1=O.x1),d=!0;break}else if(C>.001&&E<c){let F=n.z1-b.z0,et=b.z1-n.z0,D={x0:n.x0,x1:n.x1,y0:n.y0,y1:n.y1,z0:b.z0-.001-c,z1:b.z0-.001},O={x0:n.x0,x1:n.x1,y0:n.y0,y1:n.y1,z0:b.z1+.001,z1:b.z1+.001+c},Y=Z=>{for(let st of s)if(st!==b&&st.x0<Z.x1&&st.x1>Z.x0&&st.z0<Z.z1&&st.z1>Z.z0&&st.y1>Z.y0+r&&st.y0<Z.y0+(Z.y1-Z.y0)-.08)return!0;return!1},rt=Y(D),it=Y(O);if(rt&&it){d=!0;continue}rt&&!it?(n.z0=O.z0,n.z1=O.z1):it&&!rt||F<=et?(n.z0=D.z0,n.z1=D.z1):(n.z0=O.z0,n.z1=O.z1),d=!0;break}}let x=b=>b.x0<n.x1&&b.x1>n.x0&&b.z0<n.z1&&b.z1>n.z0,v=b=>i>0&&_<=b.z0+.001&&n.z1>b.z0||i<0&&g>=b.z1-.001&&n.z0<b.z1||t>0&&f<=b.x0+.001&&n.x1>b.x0||t<0&&h>=b.x1-.001&&n.x0<b.x1;if(e<0){let b=o+e,U=-1/0;for(let C of s)v(C)&&x(C)&&C.y1<=o+r+.001&&C.y1>o+.1&&C.y1>U&&p(C)&&(U=C.y1);if(U>-1e9)return n.y1+=U-o,n.y0=U,{grounded:!0,blocked:!0};let E=b-.001,T=-1/0;for(let C of s)x(C)&&C.y1<=o+.101&&C.y1>=E&&C.y1>T&&(T=C.y1);return T>-1e9?(n.y1+=T-o,n.y0=T,{grounded:!0,blocked:!0}):(n.y0+=e,n.y1+=e,{grounded:!1,blocked:!1})}if(e>0){let b=e;for(let U of s)x(U)&&U.y0>=u-.001&&U.y0<u+b&&(b=Math.max(0,U.y0-u));return n.y0+=b,n.y1+=b,{grounded:!1,blocked:d||b<e}}let S=-1/0;for(let b of s)x(b)&&b.y1<=o+.101&&b.y1>S&&(S=b.y1);return{grounded:o<=S+.001,blocked:!1}}var Vh={value:new _t(640,360)};function pl(n,t){Vh.value.set(n,t)}var $g=typeof window!="undefined"&&typeof location!="undefined"&&new URLSearchParams(location.search).has("nosnap");function Wh(n){!n||n.__ps1||$g||(n.__ps1=!0,n.onBeforeCompile=t=>{t.uniforms.uSnapRes=Vh,t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
uniform vec2 uSnapRes;`).replace("#include <project_vertex>",`#include <project_vertex>
gl_Position.xy = floor(gl_Position.xy * uSnapRes + 0.5) / uSnapRes;`)})}function Re(n,t,e,i={}){var d;let s=new jt(n,t,e),r=s.attributes.position,a=s.attributes.uv,o=i.uv||[1,1],l=!Array.isArray(o)||o.length===2&&typeof o[0]=="string",c=l?[1,1]:o;for(let h=0;h<6;h++){let f=["px","nx","py","ny","pz","nz"][h],g=l&&o[f]||c;for(let _=0;_<4;_++){let p=h*4+_;a.setXY(p,a.getX(p)*g[0],a.getY(p)*g[1])}}let u=i.jitter||0;if(u>0)for(let h=0;h<r.count;h++)r.setXYZ(h,r.getX(h)+dt(-u,u),r.getY(h)+dt(-u,u),r.getZ(h)+dt(-u,u));if(i.ao&&i.ao!=="none"){let h=new Float32Array(r.count*3),f=(d=i.aoStrength)!=null?d:.85,g=n/2,_=t/2,p=e/2;for(let m=0;m<r.count;m++){let y=r.getX(m),x=r.getY(m),v=r.getZ(m),S=1;if(i.ao==="wall"){let U=Qt((x+_)/t,0,1),E=(1-Qt(Math.abs(y)/g,0,1))*.5+(1-Qt(Math.abs(v)/p,0,1))*.5,T=Math.abs(U-.5)*2;S=Qt(.7+.3*Math.pow(Qt(1-T,0,1),1.3),0,1)*Qt(.45+.55*E,0,1)}else if(i.ao==="floor"||i.ao==="ceil"){let U=1-Qt(Math.abs(y)/g,0,1),E=1-Qt(Math.abs(v)/p,0,1),T=Qt(Math.min(U,E),0,1);S=Qt(.5+.5*Math.pow(T,1.6),0,1)}let M=1-dt(0,.1),b=S*M*f;Number.isFinite(b)||(b=f),h[m*3]=b,h[m*3+1]=b,h[m*3+2]=b}s.setAttribute("color",new Ce(h,3))}return s.computeVertexNormals(),s}function nt(n={}){var e,i,s,r,a,o;let t=new Ie({color:(e=n.color)!=null?e:16777215,roughness:(i=n.roughness)!=null?i:.9,metalness:(s=n.metalness)!=null?s:0,flatShading:(r=n.flat)!=null?r:!1});return n.map&&(t.map=n.map),n.vertexColors&&(t.vertexColors=!0),n.emissive!==void 0&&(t.emissive.set(n.emissive),t.emissiveIntensity=(a=n.emissiveIntensity)!=null?a:1),n.transparent&&(t.transparent=!0,t.opacity=(o=n.opacity)!=null?o:1),n.depthWrite===!1&&(t.depthWrite=!1),n.side&&(t.side=n.side),n.ps1!==!1&&Wh(t),t}function Se(n={}){var e,i,s;let t=new Be({color:(e=n.color)!=null?e:16777215,map:(i=n.map)!=null?i:null,transparent:!!n.transparent,opacity:(s=n.opacity)!=null?s:1});return n.vertexColors&&(t.vertexColors=!0),n.depthWrite===!1&&(t.depthWrite=!1),n.side&&(t.side=n.side),n.ps1!==!1&&Wh(t),t}var vo=class{constructor(){this.ctx=null,this.master=null,this.ambientGain=null,this.humGain=null,this.tvGain=null,this.windGain=null,this.fear=0,this._noiseBuf=null,this._hbTimer=null,this._phoneTimer=null,this.enabled=!0,this.volume=.7,this.paused=!1,this.droneOscs=[],this.musNext=3,this.chasePulse=0,this.chaseBar=0,this.chaseOn=!1}ensure(){var e,i;if(this.ctx){(i=(e=this.ctx).resume)==null||i.call(e);return}try{let s=window.AudioContext||window.webkitAudioContext;this.ctx=new s}catch(s){this.enabled=!1;return}this.master=this.ctx.createGain(),this.master.gain.value=this.volume;let t=this.ctx.createDynamicsCompressor();t.threshold.value=-18,t.ratio.value=8,this.master.connect(t),t.connect(this.ctx.destination),this._noiseBuf=this._makeNoise(2),this._buildReverb(),this._buildAmbient(),this._buildEnvironment()}_buildEnvironment(){this.environment=[];let t=[{x:18.3,y:-1.6,z:27.9,frequency:72,gain:.06,range:12,type:"sine"},{x:22.6,y:-1,z:16.3,frequency:145,gain:.035,range:8,type:"triangle"},{x:-25.4,y:3.7,z:42.4,frequency:760,gain:.018,range:6,type:"noise"},{x:0,y:7,z:78,frequency:280,gain:.04,range:17,type:"noise"},{x:38,y:-1.8,z:40,frequency:88,gain:.05,range:15,type:"triangle",campaignFlag:"generator"},{x:37,y:-2,z:58,frequency:340,gain:.023,range:12,type:"noise"}],e=this.ctx;for(let i of t){let s=i.type==="noise"?e.createBufferSource():e.createOscillator();i.type==="noise"?(s.buffer=this._noiseBuf,s.loop=!0):(s.type=i.type,s.frequency.value=i.frequency);let r=e.createBiquadFilter();r.type="lowpass",r.frequency.value=i.frequency;let a=e.createGain();a.gain.value=0;let o=e.createPanner();o.panningModel="HRTF",o.distanceModel="inverse",o.refDistance=1.7,o.maxDistance=i.range,o.rolloffFactor=1.4,o.setPosition(i.x,i.y,i.z),s.connect(r),r.connect(a),a.connect(o),this._out(o,.2),s.start(),this.environment.push({...i,source:s,filter:r,volume:a})}}updateEnvironment(t,e,i){if(!this.ctx||!this.environment)return;let s=this.ctx,r=s.listener,a=s.currentTime;if(r.positionX)for(let[o,l]of[["positionX",t.x],["positionY",t.y],["positionZ",t.z],["forwardX",e.x],["forwardY",e.y],["forwardZ",e.z],["upX",0],["upY",1],["upZ",0]])r[o].setTargetAtTime(l,a,.04);else r.setPosition(t.x,t.y,t.z),r.setOrientation(e.x,e.y,e.z,0,1,0);for(let o of this.environment){let l=Math.hypot(t.x-o.x,t.y-o.y,t.z-o.z),c=l<o.range&&i(o);o.volume.gain.setTargetAtTime(l<o.range&&o.enabled!==!1?o.gain*(c?.12:1):0,a,.25),o.filter.frequency.setTargetAtTime(o.frequency*(c?.5:1),a,.25)}this.revGain&&this.revGain.gain.setTargetAtTime(t.y<-.8?.68:t.y>4.8?.18:.42,a,.6)}cameraShutter(t=0){this._noise({dur:.035,type:"highpass",freq:1400,gain:.11,pan:t}),this._noise({dur:.08,type:"bandpass",freq:440,gain:.09,pan:t,delay:.05}),this._osc({f0:180,f1:55,dur:.12,gain:.07,attack:.002,pan:t,delay:.04})}_makeNoise(t){let e=t*this.ctx.sampleRate|0,i=this.ctx.createBuffer(1,e,this.ctx.sampleRate),s=i.getChannelData(0);for(let r=0;r<e;r++)s[r]=Math.random()*2-1;return i}_buildReverb(){let t=this.ctx,e=1.9,i=e*t.sampleRate|0,s=t.createBuffer(2,i,t.sampleRate);for(let r=0;r<2;r++){let a=s.getChannelData(r),o=0;for(let l=0;l<i;l++){let c=l/i,u=Math.pow(1-c,2.4),d=(Math.random()*2-1)*u;o=o*.72+d*.28,a[l]=o*(l<200?l/200:1)}}this.rev=t.createConvolver(),this.rev.buffer=s,this.revGain=t.createGain(),this.revGain.gain.value=.5,this.rev.connect(this.revGain),this.revGain.connect(this.master)}_out(t,e=.35){if(t.connect(this.master),this.rev){let i=this.ctx.createGain();i.gain.value=e,t.connect(i),i.connect(this.rev)}}_buildAmbient(){let t=this.ctx,e=t.createGain();e.gain.value=.05;let i=t.createBiquadFilter();i.type="lowpass",i.frequency.value=130,e.connect(i),i.connect(this.master),this.ambientGain=e;for(let S of[41.2,41.7,82.4]){let M=t.createOscillator();M.type="sine",M.frequency.value=S;let b=t.createGain();b.gain.value=S>60?.35:1,M.connect(b),b.connect(e),M.start(),this.droneOscs.push(M)}let s=t.createBufferSource();s.buffer=this._noiseBuf,s.loop=!0;let r=t.createBiquadFilter();r.type="lowpass",r.frequency.value=420;let a=t.createGain();a.gain.value=.012,s.connect(r),r.connect(a),a.connect(this.master),s.start();let o=t.createOscillator();o.type="square",o.frequency.value=120;let l=t.createBiquadFilter();l.type="bandpass",l.frequency.value=120,l.Q.value=12;let c=t.createGain();c.gain.value=0,o.connect(l),l.connect(c),c.connect(this.master),o.start(),this.humGain=c;let u=t.createBufferSource();u.buffer=this._noiseBuf,u.loop=!0;let d=t.createBiquadFilter();d.type="highpass",d.frequency.value=900;let h=t.createGain();h.gain.value=0,u.connect(d),d.connect(h),h.connect(this.master),u.start(),this.tvGain=h;let f=t.createBufferSource();f.buffer=this._noiseBuf,f.loop=!0,f.playbackRate.value=.5;let g=t.createBiquadFilter();g.type="lowpass",g.frequency.value=240,g.Q.value=.7;let _=t.createGain();_.gain.value=0,f.connect(g),g.connect(_),_.connect(this.master),f.start(),this.windGain=_;let p=t.createOscillator();p.frequency.value=.13;let m=t.createGain();m.gain.value=90,p.connect(m),m.connect(g.frequency),p.start();let y=t.createBufferSource();y.buffer=this._noiseBuf,y.loop=!0,y.playbackRate.value=.35;let x=t.createBiquadFilter();x.type="bandpass",x.frequency.value=720,x.Q.value=.55;let v=t.createGain();if(v.gain.value=.006,y.connect(x),x.connect(v),v.connect(this.master),this.rev){let S=t.createGain();S.gain.value=.25,v.connect(S),S.connect(this.rev)}y.start(),this.rainGain=v}setWind(t){this.windGain&&this.windGain.gain.setTargetAtTime(Qt(t,0,1)*.05,this.ctx.currentTime,.6)}setRain(t){this.rainGain&&this.rainGain.gain.setTargetAtTime(Qt(t,0,1)*.02,this.ctx.currentTime,.8)}setFear(t){this.ctx&&(this.fear=Qt(t,0,1),this.ambientGain&&this.ambientGain.gain.setTargetAtTime(.05+this.fear*.055,this.ctx.currentTime,.4))}setHum(t){this.humGain&&this.humGain.gain.setTargetAtTime(Qt(t,0,1)*.022,this.ctx.currentTime,.25)}setTV(t){this.tvGain&&this.tvGain.gain.setTargetAtTime(t?.05:0,this.ctx.currentTime,.15)}_env(t,e,i,s){let a=this.ctx.createGain();return a.gain.setValueAtTime(1e-4,s),a.gain.linearRampToValueAtTime(t,s+e),a.gain.exponentialRampToValueAtTime(1e-4,s+e+i),a}_pan(t){if(!this.ctx)return null;let e=this.ctx.createStereoPanner?this.ctx.createStereoPanner():null;return e&&(e.pan.value=Qt(t,-1,1)),e}_noise({dur:t=.1,type:e="bandpass",freq:i=400,freqEnd:s=null,q:r=2,gain:a=.1,attack:o=.005,pan:l=0,delay:c=0,hp:u=0}){if(!this.ctx)return;let d=this.ctx,h=d.currentTime+c,f=d.createBufferSource();f.buffer=this._noiseBuf,f.loop=!0,f.playbackRate.value=.8+Math.random()*.4;let g=d.createBiquadFilter();g.type=e,g.frequency.setValueAtTime(i,h),s!==null&&g.frequency.exponentialRampToValueAtTime(Math.max(30,s),h+t),g.Q.value=r;let _=g;if(u>0){let y=d.createBiquadFilter();y.type="highpass",y.frequency.value=u,g.connect(y),_=y}let p=this._env(a,o,t,h);_.connect(p);let m=this._pan(l);m?(p.connect(m),this._out(m,.3)):this._out(p,.3),f.connect(g),f.start(h),f.stop(h+t+o+.05)}_osc({type:t="sine",f0:e=440,f1:i=null,dur:s=.5,gain:r=.1,attack:a=.01,pan:o=0,delay:l=0,curve:c=[],wet:u=.35}){if(!this.ctx)return;let d=this.ctx,h=d.currentTime+l,f=d.createOscillator();f.type=t,f.frequency.setValueAtTime(e,h),i!==null&&f.frequency.exponentialRampToValueAtTime(Math.max(20,i),h+s);for(let[p,m]of c)f.frequency.setValueAtTime(m,h+p);let g=this._env(r,a,s,h);f.connect(g);let _=this._pan(o);_?(g.connect(_),this._out(_,u)):this._out(g,u),f.start(h),f.stop(h+s+a+.05)}footstep(t="wood"){t===!0&&(t="tatami"),t===!1&&(t="wood"),t==="tatami"?(this._noise({dur:.08,type:"lowpass",freq:300,gain:.06,attack:.004}),this._noise({dur:.05,type:"bandpass",freq:130,q:1.2,gain:.035,attack:.003})):t==="concrete"?(this._noise({dur:.07,type:"bandpass",freq:430,q:1.8,gain:.09,attack:.002,hp:120}),this._noise({dur:.04,type:"highpass",freq:1600,gain:.012,attack:.001})):(this._noise({dur:.09,type:"bandpass",freq:190,q:1.4,gain:.085,attack:.003,hp:60}),this._noise({dur:.04,type:"bandpass",freq:800,q:2,gain:.014,attack:.001}),Math.random()<.12&&this.woodenCreak())}runStep(t="wood"){let e=t==="concrete"?320:t==="tatami"?130:dt(220,300);this._noise({dur:.08,type:t==="tatami"?"lowpass":"bandpass",freq:e,q:1.5,gain:.11,attack:.003})}doorOpen(){let t=Lt(Math.random()*1e9|0);this._osc({type:"sawtooth",f0:70,f1:150,dur:.8,gain:.05,attack:.1,curve:[[.1,92],[.3,78],[.5,118],[.7,84]]}),this._noise({dur:.7,type:"bandpass",freq:300,freqEnd:900,q:6,gain:.03,attack:.06})}doorClose(){this._osc({type:"sawtooth",f0:140,f1:62,dur:.35,gain:.05,attack:.02}),this._noise({dur:.12,type:"lowpass",freq:800,gain:.1,attack:.002})}doorSlam(){this._noise({dur:.4,type:"lowpass",freq:500,gain:.5,attack:.002}),this._osc({type:"sine",f0:70,f1:38,dur:.5,gain:.28,attack:.002})}woodenCreak(){this._osc({type:"sawtooth",f0:dt(90,130),f1:dt(50,80),dur:1.4,gain:.03,attack:.4,curve:[[.3,110],[.7,92],[1.1,64]]})}sting(){if(!this.ctx)return;let t=[110,116.5,220,233,466];for(let e of t)this._osc({type:"sawtooth",f0:e*.97,f1:e*.94,dur:1.5,gain:.055,attack:.008});this._noise({dur:.7,type:"lowpass",freq:1600,gain:.22,attack:.004}),this._osc({type:"sine",f0:880,f1:60,dur:1.2,gain:.05,attack:.004})}scareBurst(){this._noise({dur:.9,type:"bandpass",freq:3e3,q:.6,gain:.5,attack:.002}),this._osc({type:"square",f0:180,f1:40,dur:.9,gain:.16,attack:.002})}whisper(t=0,e=1.8){if(!this.ctx)return;let i=5,s=dt(900,1500);for(let r=0;r<i;r++)this._noise({dur:e/i+.05,type:"bandpass",freq:s+Math.sin(r*1.7)*500+dt(-200,200),q:9,gain:.05+Math.random()*.03,attack:.06,pan:t,delay:r*e/i});this._noise({dur:e,type:"bandpass",freq:500,q:1,gain:.02,attack:.3,pan:t})}moan(t=0){let e=Lt(Math.random()*1e9|0),i=[];for(let s=0;s<=2.2;s+=.2)i.push([s,150-s*30+Math.sin(s*6)*18]);this._osc({type:"sine",f0:160,f1:80,dur:2.2,gain:.055,attack:.5,pan:t,curve:i}),this._noise({dur:2.2,type:"bandpass",freq:700,q:4,gain:.015,attack:.4,pan:t})}bell(){this._osc({type:"sine",f0:1568,f1:1500,dur:1.1,gain:.06,attack:.004}),this._osc({type:"sine",f0:2093,f1:1980,dur:.7,gain:.03,attack:.004})}phoneRing(){if(!this.ctx||this._phoneTimer)return;let t=()=>{this._osc({type:"square",f0:25,dur:.9,gain:.05,attack:.01}),this._osc({type:"square",f0:20,dur:.9,gain:.03,attack:.01})};t();let e=1;this._phoneTimer=setInterval(()=>{t(),++e>=4&&(clearInterval(this._phoneTimer),this._phoneTimer=null)},1900)}phoneStop(){this._phoneTimer&&(clearInterval(this._phoneTimer),this._phoneTimer=null)}heartbeat(t,e=1){if(!this.ctx)return;if(!t){this._hbTimer&&(clearInterval(this._hbTimer),this._hbTimer=null);return}if(this._hbTimer)return;let i=r=>{this._osc({type:"sine",f0:58,f1:40,dur:.14,gain:.5*r,attack:.006})},s=()=>{i(e),setTimeout(()=>i(e*.7),180)};s(),this._hbTimer=setInterval(s,850)}thud(){this._osc({type:"sine",f0:48,f1:30,dur:.25,gain:.4,attack:.004}),this._noise({dur:.12,type:"lowpass",freq:300,gain:.12,attack:.002})}clatter(){for(let t=0;t<4;t++)this._noise({dur:.06,type:"bandpass",freq:dt(900,2400),q:3,gain:.05,attack:.001,delay:t*.09})}paperRustle(){this._noise({dur:.5,type:"bandpass",freq:2200,q:1.5,gain:.06,attack:.03})}ending(){[220,261.6,329.6,220].forEach((e,i)=>{this._osc({type:"sine",f0:e,dur:5,gain:.04,attack:1.4,delay:i*.9}),this._osc({type:"triangle",f0:e*2.01,dur:5,gain:.012,attack:1.4,delay:i*.9})})}cry(t=0){let e=Lt(Math.random()*1e9|0),i=[];for(let s=0;s<=2.4;s+=.2)i.push([s,520+Math.sin(s*5.2)*60+e()*30]);this._osc({type:"sine",f0:540,f1:480,dur:2.4,gain:.035,attack:.35,pan:t,curve:i}),this._noise({dur:2.4,type:"bandpass",freq:900,q:5,gain:.012,attack:.3,pan:t})}childGiggle(t=0){let e=Lt(Math.random()*1e9|0),i=[];for(let s=0;s<=1.1;s+=.1)i.push([s,720+Math.sin(s*9)*90+e()*45]);this._osc({type:"sine",f0:720,f1:780,dur:1.1,gain:.028,attack:.02,pan:t,curve:i}),this._osc({type:"sine",f0:1440,f1:1520,dur:.7,gain:.008,attack:.02,pan:t}),this._noise({dur:.8,type:"bandpass",freq:2400,q:6,gain:.006,attack:.05,pan:t})}breath(t=0,e=3.2){if(!this.ctx)return;let i=2;for(let s=0;s<i;s++)this._noise({dur:e/i,type:"bandpass",freq:300,freqEnd:420,q:2,gain:.07,attack:e/i*.5,pan:t,delay:s*(e/i)})}knock(t=3){for(let e=0;e<t;e++)this._osc({type:"sine",f0:90,f1:50,dur:.18,gain:.22,attack:.002,delay:e*.34,pan:dt(-.4,.4)}),this._noise({dur:.06,type:"lowpass",freq:400,gain:.1,attack:.001,delay:e*.34,pan:dt(-.4,.4)})}ceilingSteps(){for(let t=0;t<5;t++)this._osc({type:"sine",f0:60,f1:38,dur:.16,gain:.12,attack:.004,delay:t*.42,pan:dt(-.6,.6)})}drip(){this._osc({type:"sine",f0:1400,f1:420,dur:.12,gain:.05,attack:.002}),this._noise({dur:.04,type:"bandpass",freq:2200,q:4,gain:.03,attack:.001,delay:.08})}musicBox(){[659.25,587.33,493.88,587.33,659.25,587.33,493.88,440].forEach((e,i)=>{this._osc({type:"sine",f0:e,dur:1.2,gain:.038,attack:.004,delay:i*.42}),this._osc({type:"sine",f0:e*2.003,dur:1.2,gain:.008,attack:.004,delay:i*.42})})}radio(){if(!this.ctx)return;this._noise({dur:.5,type:"bandpass",freq:400,freqEnd:1200,q:8,gain:.08,attack:.02}),this._noise({dur:2.2,type:"bandpass",freq:700,q:3,gain:.04,attack:.1,delay:.5,pan:dt(-.5,.5)});let t=Lt(Math.random()*1e9|0);for(let e=0;e<6;e++)this._noise({dur:.16,type:"bandpass",freq:300+t()*600,q:10,gain:.05,attack:.02,delay:.7+e*.22,pan:dt(-.4,.4)});this._noise({dur:.3,type:"bandpass",freq:2e3,freqEnd:500,q:5,gain:.05,attack:.01,delay:2.4})}scrape(){this._noise({dur:1.1,type:"bandpass",freq:1300,q:8,gain:.045,attack:.08,hp:300}),this._osc({type:"sawtooth",f0:420,f1:380,dur:1.1,gain:.02,attack:.08})}siren(t=0){if(this.ctx)for(let e=0;e<2;e++)this._osc({type:"sine",f0:660+e*4,f1:875+e*4,dur:3,gain:.011,attack:1.4,pan:t,wet:.6}),this._osc({type:"sine",f0:875+e*4,f1:660+e*4,dur:3,gain:.011,attack:1.4,pan:t,wet:.6,delay:3.1})}hammer(t=0){if(this.ctx)for(let e=0;e<3;e++)this._osc({type:"triangle",f0:132-e*14,f1:58,dur:.09,gain:.085,attack:.003,pan:t,delay:e*.19}),this._noise({dur:.05,type:"bandpass",freq:2300,q:3,gain:.018,attack:.002,pan:t,delay:e*.19})}washer(t=0){if(this.ctx){this._osc({type:"sawtooth",f0:52,f1:58,dur:5.5,gain:.026,attack:1.2,pan:t,wet:.5}),this._noise({dur:5.5,type:"bandpass",freq:320,q:2,gain:.018,attack:1.2,pan:t,wet:.5});for(let e=0;e<9;e++)this._osc({type:"sine",f0:46,dur:.07,gain:.05,attack:.004,pan:t,delay:1.4+e*.42})}}chime(t=0){if(!this.ctx)return;let e=[1975,2349,2637,3136],i=Lt(Math.random()*1e9|0),s=0,r=3+(i()*3|0);for(let a=0;a<r;a++){let o=e[i()*e.length|0];this._osc({type:"sine",f0:o,dur:1.5,gain:.028,attack:.004,pan:t,delay:s,wet:.5}),this._osc({type:"sine",f0:o*2.76,dur:.8,gain:.006,attack:.004,pan:t,delay:s,wet:.5}),s+=.18+i()*.85}}duck(){this.master&&(this.master.gain.setTargetAtTime(this.volume*.18,this.ctx.currentTime,.02),setTimeout(()=>this.setVolume(this.volume),350))}setVolume(t){this.volume=Qt(t,0,1),this.master&&this.master.gain.setTargetAtTime(this.paused?this.volume*.12:this.volume,this.ctx.currentTime,.05)}setPaused(t){this.paused=t,this.setVolume(this.volume)}puzzleTone(t){this._osc({type:"sine",f0:[0,261.63,329.63,392,523.25][t],dur:.9,gain:.1,attack:.005,wet:.45})}switchClick(){this._noise({dur:.03,type:"bandpass",freq:2400,q:3,gain:.07,attack:.001}),this._osc({type:"square",f0:240,f1:140,dur:.05,gain:.04,attack:.001})}buzz(){this._osc({type:"sawtooth",f0:118,f1:124,dur:.5,gain:.035,attack:.02,wet:.2}),this._osc({type:"sawtooth",f0:236,f1:248,dur:.5,gain:.012,attack:.02,wet:.2})}thunder(t=.5){let e=Qt(t,0,1),i=.1+e*.4,s=.5-e*.32;this._noise({dur:.5+e*1.6,type:"lowpass",freq:420-e*250,gain:s*.7,attack:.02+e*.25,delay:i,wet:.6}),this._noise({dur:.25,type:"lowpass",freq:900,gain:s*.5,attack:.004,delay:i+.05+e*.2,wet:.6}),this._osc({type:"sine",f0:54,f1:30,dur:1.6+e,gain:s*.5,attack:.05,delay:i,wet:.5})}updateMusic(t,e,i){if(this.ctx){if(i&&!this.chaseOn&&(this.chaseOn=!0,this.chasePulse=0,this.chaseBar=0),!i&&this.chaseOn&&(this.chaseOn=!1),this.musNext-=t,this.musNext<=0){this.musNext=dt(9,16)-e*6;let s=110,r=[1,6/5,4/3,3/2,8/5],a=s*r[Math.random()*r.length|0]*(Math.random()<.4?2:1);this._osc({type:"sine",f0:a,dur:dt(4,7),gain:.028+e*.02,attack:1.6,wet:.85}),this._osc({type:"sine",f0:a*2.002,dur:dt(4,7),gain:.008+e*.006,attack:2.2,wet:.85}),e>.45&&Math.random()<.5&&this._osc({type:"sine",f0:a*16/15,dur:dt(3,5),gain:.014,attack:2.4,wet:.9}),e>.7&&Math.random()<.35&&this._osc({type:"sawtooth",f0:a/2,dur:3,gain:.008,attack:1.2,wet:.9})}if(this.chaseOn&&(this.chasePulse-=t,this.chasePulse<=0&&(this.chasePulse=.21,this._osc({type:"square",f0:this.chaseBar%2?58:55,dur:.1,gain:.05,attack:.002,wet:.15})),this.chaseBar-=t,this.chaseBar<=0)){this.chaseBar=1.68;for(let s of[220,233.1,311.1])this._osc({type:"sawtooth",f0:s*.985,f1:s*.94,dur:1.4,gain:.016,attack:.03,wet:.7})}}}lullaby(){let t=[659.25,587.33,493.88,587.33,659.25,493.88,440,0,493.88,587.33,659.25,587.33,493.88,440],e=0;for(let i of t)i>0&&(this._osc({type:"sine",f0:i,dur:1.4,gain:.026,attack:.008,delay:e,wet:.8}),this._osc({type:"sine",f0:i*2.003,dur:1.4,gain:.006,attack:.008,delay:e,wet:.8})),e+=.56}};function ji(n,t,e){let i=Math.min(.018,n/7,t/7,e/7),s=new _n;s.moveTo(-n/2+i,-e/2+i),s.lineTo(n/2-i,-e/2+i),s.lineTo(n/2-i,e/2-i),s.lineTo(-n/2+i,e/2-i),s.closePath();let r=new is(s,{depth:t-2*i,bevelEnabled:!0,bevelSize:i,bevelThickness:i,bevelSegments:2,curveSegments:1,steps:1});return r.rotateX(-Math.PI/2),r.translate(0,i-t/2,0),r}function jg(n,t,e=!1){let i=Lt(t),s=256,r=Array.from({length:3},()=>{let o=document.createElement("canvas");return o.width=o.height=s,o}),a=r.map(o=>o.getContext("2d").createImageData(s,s));for(let o=0;o<s;o++)for(let l=0;l<s;l++){let c=(o*s+l)*4,u=(i()-.5)*18,d=e?Math.sin(l*.24+Math.sin(o*.024)*1.7)*8+Math.sin(l*.73)*2:0,h=i()<.015?-26:0;for(let f=0;f<3;f++)a[0].data[c+f]=n[f]+u+d+h,a[1].data[c+f]=128+u*2+d*1.5+h*2,a[2].data[c+f]=218+u;for(let f of a)f.data[c+3]=255}return r.map((o,l)=>{o.getContext("2d").putImageData(a[l],0,0);let c=new hi(o);return c.wrapS=c.wrapT=wi,c.colorSpace=l===0?pe:ke,c.anisotropy=8,c})}function Qi(n){if(n.detailMaterials)return n.detailMaterials;let t=(e,i,s,r)=>{let[a,o,l]=jg(e,i,s);return new Ie({map:a,bumpMap:o,roughnessMap:l,bumpScale:r,roughness:.96})};return n.detailMaterials={wood:t([100,76,51],771,!0,.012),concrete:t([133,132,119],772,!1,.018),paint:t([85,105,93],773,!1,.006),plaster:t([174,166,143],774,!1,.012),iron:new Ie({color:5793633,roughness:.63,metalness:.38}),brass:new Ie({color:9599563,roughness:.53,metalness:.52}),rubber:new Ie({color:2435881,roughness:.68}),enamel:new Ie({color:11976372,roughness:.52,metalness:.08}),darkGlass:new Ie({color:2241326,roughness:.17,metalness:.24})},n.detailMaterials}function Xh(n,t,e,i,s,r=n.scene){let a=Qi(n),o=new Ot;o.position.set(t,e,i),r.add(o);let l=(d,h,f,g,_,p,m)=>{let y=new K(ji(d,h,f),g);return y.position.set(_,p,m),o.add(y),y};l(.75,.07,.25,a.iron,0,0,0);let c=new Be({color:s}),u=l(.57,.045,.19,c,0,-.06,0);for(let d=0;d<15;d++)l(.008,.008,.18,a.enamel,-.27+d*.038,-.087,0);for(let d of[-1,1]){l(.065,.1,.27,a.enamel,d*.335,-.025,0);for(let h of[-.085,.085]){let f=new K(new St(.01,.01,.007,8),a.brass);f.position.set(d*.335,-.079,h),o.add(f)}}return{group:o,diffuser:u}}function ml(n,{x0:t,x1:e,z0:i,z1:s,base:r,height:a,gapX:o=null,leftDoor:l=null}){let c=Qi(n),u={collide:!1,cast:!1,geo:{jitter:0,ao:"none"}};for(let h=0;h<a/2.8;h++){let f=r+h*2.8;for(let p of[t+.12,e-.12]){let m=l&&p<t+.2&&Math.abs(f-l.y)<.01?[[i,l.gap[0]],[l.gap[1],s]]:[[i,s]];for(let[y,x]of m)n.box(p,(y+x)/2,f,.025,x-y,1.15,c.paint,u),n.box(p,(y+x)/2,f+1.15,.036,x-y,.035,c.iron,u),n.box(p,(y+x)/2,f,.04,x-y,.14,c.rubber,u)}n.box((t+e)/2,s-.12,f,e-t,.025,1.15,c.paint,u),n.box((t+e)/2,s-.12,f,e-t,.04,.14,c.rubber,u);let g=o?[[t,o[0]],[o[1],e]]:[[t,e]];for(let[p,m]of g)m>p&&n.box((p+m)/2,i+.12,f,m-p,.025,1.15,c.paint,u);let _=new K(new St(.019,.019,2.5,10),c.iron);_.position.set(e-.16,f+1.4,s-.4),n.scene.add(_);for(let p of[.35,1.15,2.25])n.box(e-.15,s-.4,f+p,.035,.1,.04,c.brass,u);n.box(e-.17,s-1.1,f+1.2,.12,.38,.46,c.iron,u),n.box(e-.24,s-1.1,f+1.24,.018,.32,.38,c.paint,u)}let d=Lt(817);for(let h=0;h<34;h++){let f=r+.18+d()*(a-.4),g=i+.7+d()*(s-i-1.4),_=.04+d()*.22,p=.1+d()*.48;if(l&&g>l.gap[0]-.2&&g<l.gap[1]+.2&&f>l.y-.5&&f<l.y+2.2)continue;let m=h%3?c.plaster:c.rubber;n.box(t+.137,g,f,.006,_,p,m,u)}}function qh(n,t,e,i,s){let r=Qi(n),a=new Ot;s==="z"&&(a.rotation.y=-Math.PI/2),t.add(a);let o=(l,c,u,d,h)=>{let f=new K(l,c);return f.position.set(u,d,h),a.add(f),f};for(let l of[-1,1]){for(let u of[-i*.23,i*.16]){let d=e*.7,h=i*.32;for(let f of[-d/2,d/2])o(ji(.018,h,.012),r.wood,f,u,l*.036);for(let f of[u-h/2,u+h/2])o(ji(d,.018,.012),r.wood,0,f,l*.036)}o(ji(.085,.17,.014),r.brass,e/2-.09,i*.04,l*.04);let c=o(new St(.012,.012,.13,12),r.brass,e/2-.145,i*.04,l*.075);c.rotation.z=Math.PI/2}for(let l of[-i*.34,0,i*.34])o(new St(.014,.014,.12,12),r.iron,-e/2+.016,l,0)}function Yh(n,t,e,i){let s=Qi(n),r=new Ot;r.position.set(t,i,e),n.scene.add(r);let a=(l,c,u,d,h,f,g)=>{let _=new K(ji(l,c,u),d);return _.position.set(h,f,g),r.add(_),_};a(1.18,.1,.57,s.wood,0,.1,0),a(1.25,.075,.62,s.wood,0,2.01,0);for(let l of[-1,1]){a(.075,1.85,.58,s.wood,l*.586,1.04,0),a(.1,.1,.12,s.wood,l*.5,.05,-.19),a(.1,.1,.12,s.wood,l*.5,.05,.19);let c=l*.282;for(let d of[-.245,.245])a(.058,1.79,.045,s.wood,c+d,1.08,-.301);for(let d of[.21,1.95])a(.55,.05,.045,s.wood,c,d,-.301);a(.455,1.6,.025,s.paint,c,1.08,-.288);for(let d=0;d<5;d++)a(.34,.013,.005,s.rubber,c,1.56+d*.047,-.303);a(.052,.17,.02,s.brass,l*.061,1.05,-.319);let u=new K(new St(.012,.012,.12,10),s.brass);u.position.set(l*.061,1.05,-.34),r.add(u);for(let d of[.38,1.76])a(.015,.085,.016,s.brass,l*.558,d,-.328)}a(1.1,1.82,.032,s.wood,0,1.06,.286);let o={x0:t-.625,x1:t+.625,y0:i,y1:i+2.05,z0:e-.36,z1:e+.31};return n.colliders.push(o),r.userData.collider=o,r.userData.model="wardrobe",r}function te(n,t){let e=document.createElement("canvas");return e.width=n,e.height=t,e}function me(n,t,{r:e=255,g:i=255,b:s=255,amp:r=18,scale:a=1,base:o=null}){let l=n.data,c=n.width,u=n.height;for(let d=0;d<u;d++)for(let h=0;h<c;h++){let f=(d*c+h)*4,g=(t()-.5)*2*r*a,_=o?o[f]:0,p=o?_:e;l[f]=Math.max(0,Math.min(255,p+g)),l[f+1]=Math.max(0,Math.min(255,(o?o[f+1]:i)+g)),l[f+2]=Math.max(0,Math.min(255,(o?o[f+2]:s)+g)),l[f+3]=255}return n}function Hs(n,t,e,i=4,s=[120,118,110]){let r=n.data,a=n.width,o=n.height,l=[];for(let c=0;c<i;c++){let u=2<<c,d=2<<c,h=new Float32Array(u*d);for(let f=0;f<h.length;f++)h[f]=t();l.push({g:h,gw:u,gh:d})}for(let c=0;c<o;c++)for(let u=0;u<a;u++){let d=0,h=0;for(let g=0;g<i;g++){let{g:_,gw:p,gh:m}=l[g],y=u/a*p,x=c/o*m,v=Math.floor(y)%p,S=Math.floor(x)%m,M=(v+1)%p,b=(S+1)%m,U=y-Math.floor(y),E=x-Math.floor(x),T=U*U*(3-2*U),C=E*E*(3-2*E),F=_[S*p+v]*(1-T)*(1-C)+_[S*p+M]*T*(1-C)+_[b*p+v]*(1-T)*C+_[b*p+M]*T*C;d+=F/(g+1),h+=1/(g+1)}d/=h;let f=(c*a+u)*4;r[f]=s[0]+(d-.5)*2*e,r[f+1]=s[1]+(d-.5)*2*e,r[f+2]=s[2]+(d-.5)*2*e,r[f+3]=255}}function bo(n,t,e,i,s,r=.14,a=2){n.save(),n.globalAlpha=r,n.fillStyle=s;for(let o=a;o>=0;o--)n.beginPath(),n.ellipse(t+(Math.random()-.5)*i*.7,e+(Math.random()-.5)*i*.7,i*(o+.6)/a*.55,i*(o+.6)/a*.4,Math.random()*3,0,Math.PI*2),n.fill();n.restore()}function ge(n,t,e,i,s,r){for(let a=0;a<s;a++)bo(n,r()*t,r()*e,4+r()*16,i,.05+r()*.12,3)}function _l(n,t,e,i,s=7,r="rgba(20,18,14,0.5)"){n.strokeStyle=r,n.lineWidth=1;for(let a=0;a<s;a++){let o=i()*t,l=i()*e;n.beginPath(),n.moveTo(o,l);let c=3+(i()*5|0);for(let u=0;u<c;u++)o+=(i()-.5)*26,l+=(i()-.5)*26,n.lineTo(o,l);n.stroke()}}function ee(n,t=!0){let e=new hi(n);return e.magFilter=Qe,e.minFilter=_i,e.generateMipmaps=!0,e.anisotropy=16,e.colorSpace=pe,t&&(e.wrapS=wi,e.wrapT=wi),e}function Qg(n,t=!1){let e=new hi(n);return e.magFilter=Ne,e.minFilter=Ne,e.generateMipmaps=!1,e.colorSpace=ke,t&&(e.wrapS=wi,e.wrapT=wi),e}function t1(n){let t=te(128,128),e=t.getContext("2d"),i=e.createImageData(128,128);Hs(i,n,14,4,[150,147,136]),e.putImageData(i,0,0),ge(e,128,128,"#3a3f33",26,n),ge(e,128,128,"#6f735a",14,n);for(let s=0;s<8;s++){let r=n()*128,a=n()*128,o=6+n()*14;e.fillStyle="rgba(70,74,62,0.35)",e.beginPath(),e.ellipse(r,a,o,o*.7,n(),0,7),e.fill(),e.strokeStyle="rgba(220,215,195,0.25)",e.lineWidth=1.5,e.beginPath(),e.ellipse(r,a,o,o*.7,n(),0,7),e.stroke()}return _l(e,128,128,n,6),ee(t)}function e1(n){let t=te(256,512),e=t.getContext("2d");e.fillStyle="#6f6a5e",e.fillRect(0,0,256,512);for(let a=0;a<256;a+=32)e.fillStyle=a/32%2?"#6c675c":"#716c61",e.fillRect(a,0,32,512),e.fillStyle="rgba(52,56,46,0.18)",e.fillRect(a+15,0,3,512);let i=e.getImageData(0,0,256,512);me(i,n,{amp:8,base:i.data.slice()}),e.putImageData(i,0,0),ge(e,256,512,"#3d4234",60,n);let s=80+n()*240;e.fillStyle="#5f5c52",e.fillRect(0,s,256,36+n()*60);let r=e.getImageData(0,s,256,80);return me(r,n,{amp:12,base:r.data.slice()}),e.putImageData(r,0,s),e.fillStyle="rgba(40,36,30,0.45)",e.fillRect(0,s-3,256,3),e.fillRect(0,s+78,256,3),_l(e,256,512,n,6),ee(t)}function xl(n,t=128,e=128,i=[86,66,46],s=!1){let r=te(t,e),a=r.getContext("2d");a.fillStyle=`rgb(${i[0]},${i[1]},${i[2]})`,a.fillRect(0,0,t,e);let o=4;for(let c=0;c<o;c++)a.fillStyle=`rgba(${i[0]-14},${i[1]-12},${i[2]-10},0.55)`,s?a.fillRect(0,e/o*c,t,1):a.fillRect(t/o*c,0,1,e),a.fillStyle="rgba(255,235,200,0.04)",s?a.fillRect(0,e/o*c+1,t,1):a.fillRect(t/o*c+1,0,1,e);let l=a.getImageData(0,0,t,e);me(l,n,{amp:10,base:l.data.slice()}),a.putImageData(l,0,0),a.strokeStyle="rgba(50,36,22,0.25)";for(let c=0;c<26;c++){if(a.beginPath(),s){let u=n()*e;a.moveTo(0,u),a.bezierCurveTo(t*.3,u+(n()-.5)*6,t*.7,u+(n()-.5)*6,t,u)}else{let u=n()*t;a.moveTo(u,0),a.bezierCurveTo(u+(n()-.5)*6,e*.3,u+(n()-.5)*6,e*.7,u,e)}a.stroke()}return ge(a,t,e,"#2c2118",14,n),ee(r)}function i1(n){let t=te(128,256),e=t.getContext("2d");e.drawImage(xl(n,128,256,[92,70,48],!0).image,0,0),e.strokeStyle="rgba(30,22,14,0.6)",e.lineWidth=3;for(let[i,s]of[[18,92],[146,92]])e.strokeRect(14,i,100,s),e.strokeStyle="rgba(255,240,210,0.08)",e.strokeRect(16,i+2,96,s-4),e.strokeStyle="rgba(30,22,14,0.6)";return e.fillStyle="#8a7a3a",e.beginPath(),e.arc(104,150,5,0,7),e.fill(),e.fillStyle="rgba(0,0,0,0.35)",e.beginPath(),e.arc(104,152,3,0,7),e.fill(),ge(e,128,256,"#241a10",12,n),ee(t)}function n1(n){let t=te(128,128),e=t.getContext("2d");e.fillStyle="#a3a05a",e.fillRect(0,0,128,128);let i=e.getImageData(0,0,128,128);me(i,n,{amp:12,base:i.data.slice()}),e.putImageData(i,0,0),e.strokeStyle="rgba(96,94,48,0.35)",e.lineWidth=1;for(let s=0;s<128;s+=6)e.beginPath(),e.moveTo(0,s),e.lineTo(128,s),e.stroke();return e.strokeStyle="rgba(60,58,30,0.5)",e.lineWidth=1.5,e.strokeRect(1,1,126,126),ge(e,128,128,"#4a4a2c",10,n),ee(t)}function s1(n){let t=te(128,128),e=t.getContext("2d");e.fillStyle="#9a9a92",e.fillRect(0,0,128,128);let i=e.getImageData(0,0,128,128);return me(i,n,{amp:8,base:i.data.slice()}),e.putImageData(i,0,0),e.strokeStyle="rgba(60,60,56,0.5)",e.strokeRect(0,0,128,128),e.strokeRect(64,64,64,64),bo(e,40+n()*40,30+n()*30,26,"#5c5a3e",.22,4),bo(e,90,90,18,"#666448",.16,3),ee(t)}function r1(n){let t=te(128,128),e=t.getContext("2d"),i=e.createImageData(128,128);return Hs(i,n,16,4,[92,92,94]),e.putImageData(i,0,0),ge(e,128,128,"#2f3236",30,n),_l(e,128,128,n,10,"rgba(25,25,28,0.6)"),ee(t)}function o1(n){let t=te(128,128),e=t.getContext("2d"),i=e.createImageData(128,128);Hs(i,n,10,4,[74,78,82]),e.putImageData(i,0,0),ge(e,128,128,"#7a4a26",22,n),ge(e,128,128,"#a2622e",12,n),e.strokeStyle="rgba(200,205,210,0.2)";for(let s=0;s<10;s++){e.beginPath();let r=n()*128,a=n()*128;e.moveTo(r,a),e.lineTo(r+(n()-.5)*30,a+(n()-.5)*30),e.stroke()}return ee(t)}function a1(n,t=256,e=320){let i=te(t,e),s=i.getContext("2d");s.fillStyle="#c9bd9c",s.fillRect(0,0,t,e);let r=s.getImageData(0,0,t,e);return me(r,n,{amp:9,base:r.data.slice()}),s.putImageData(r,0,0),ge(s,t,e,"#8a7c58",16,n),s.strokeStyle="rgba(90,80,55,0.4)",s.lineWidth=1,s.beginPath(),s.moveTo(0,e/2),s.lineTo(t,e/2),s.stroke(),ee(i)}function gl(n,t,e,i,s,r,a){let o=Lt(a);for(let l=0;l<r;l++){let c=t,u=i*(.7+o()*.3);for(;c<t+u;){let d=3+o()*4;n.fillRect(c,e+l*s,d,s*.62),c+=d+2}}}function l1(n){let t=te(256,320),e=t.getContext("2d");e.fillStyle="#b0a892",e.fillRect(0,0,256,320);let i=e.getImageData(0,0,256,320);return me(i,n,{amp:7,base:i.data.slice()}),e.putImageData(i,0,0),e.fillStyle="#26241e",e.fillRect(10,12,236,30),e.fillStyle="#b0a892",e.font="bold 20px serif",e.fillText("\u25EF\u25EF\u30A2\u30D1\u30FC\u30C8\u4E00\u5BB6\u5931\u8E2A",16,34),e.fillStyle="#26241e",gl(e,12,52,160,10,6,42),e.strokeStyle="#26241e",e.lineWidth=2,e.strokeRect(178,52,66,62),e.fillStyle="#6b675a",e.fillRect(182,56,58,54),e.fillStyle="#26241e",gl(e,12,128,232,10,14,99),gl(e,12,280,232,10,2,131),ge(e,256,320,"#7d7460",10,n),ee(t)}function c1(n){let t=te(256,320),e=t.getContext("2d");e.fillStyle="#bdb28f",e.fillRect(0,0,256,320);let i=e.getImageData(0,0,256,320);return me(i,n,{amp:8,base:i.data.slice()}),e.putImageData(i,0,0),e.fillStyle="#2a2620",e.font="16px serif",["\u307E\u305F\u591C\u4E2D\u306B\u7269\u97F3\u304C\u3059\u308B\u3002","3\u53F7\u5BA4\u306E\u5BB6\u65CF\u304C\u6D88\u3048\u3066\u304B\u3089\u3001","\u305A\u3063\u3068\u3060\u3002","","\u3042\u306E\u5B50\u3060\u3051\u304C\u3001\u307E\u3060","\u3053\u3053\u306B\u3044\u308B\u6C17\u304C\u3059\u308B\u3002","","\u7384\u95A2\u306E\u30C9\u30A2\u306F\u3001\u3082\u3046","\u958B\u304B\u306A\u3044\u3002"].forEach((r,a)=>{r&&e.fillText(r,24,46+a*30)}),ge(e,256,320,"#8a7c58",12,n),ee(t)}function h1(n){let t=te(256,320),e=t.getContext("2d");e.fillStyle="#c4b896",e.fillRect(0,0,256,320);let i=e.getImageData(0,0,256,320);me(i,n,{amp:8,base:i.data.slice()}),e.putImageData(i,0,0),e.lineWidth=4;let s=(r,a,o,l)=>{e.strokeStyle=l,e.beginPath(),e.arc(r,a-o,12,0,7),e.stroke(),e.beginPath(),e.moveTo(r,a-o+12),e.lineTo(r,a),e.stroke(),e.beginPath(),e.moveTo(r,a-o+20),e.lineTo(r-16,a-o+36),e.stroke(),e.beginPath(),e.moveTo(r,a-o+20),e.lineTo(r+16,a-o+36),e.stroke(),e.beginPath(),e.moveTo(r,a-4),e.lineTo(r-12,a+22),e.stroke(),e.beginPath(),e.moveTo(r,a-4),e.lineTo(r+12,a+22),e.stroke()};s(50,120,66,"#3a3f8a"),s(96,132,56,"#8a3a3a"),s(140,124,62,"#3a7a4a"),s(186,132,40,"#8a6a3a"),e.strokeStyle="#141210",e.lineWidth=8,e.beginPath(),e.moveTo(214,30),e.lineTo(214,60),e.stroke(),e.beginPath(),e.moveTo(214,34),e.lineTo(204,58),e.stroke(),e.beginPath(),e.moveTo(214,34),e.lineTo(226,60),e.stroke(),e.beginPath(),e.moveTo(214,60),e.lineTo(214,132),e.stroke(),e.beginPath(),e.moveTo(214,132),e.lineTo(200,158),e.stroke(),e.beginPath(),e.moveTo(214,132),e.lineTo(228,158),e.stroke(),e.strokeStyle="rgba(160,20,20,0.8)",e.lineWidth=5;for(let r=0;r<14;r++)e.beginPath(),e.moveTo(n()*256,160+n()*100),e.lineTo(n()*256,160+n()*100),e.stroke();return e.fillStyle="#2a2620",e.font="15px serif",e.fillText("\u304A\u304B\u3042\u3055\u3093 \u3069\u3053\uFF1F",18,236),e.fillText("\u305B\u306E\u305F\u304B\u3044 \u304F\u308D\u3044\u3072\u3068\u304C",18,262),e.fillText("\u3088\u308B\u306B\u306A\u308B\u3068 \u307F\u3066\u308B",18,288),ge(e,256,320,"#8a7c58",8,n),ee(t)}function u1(n,t=256,e=256){let i=te(t,e),s=i.getContext("2d");s.clearRect(0,0,t,e);let r=(o,l,c)=>{s.fillStyle="#5c0e0c";for(let u=0;u<5;u++){let d=n()*Math.PI*2,h=n()*c*.7;s.beginPath(),s.ellipse(o+Math.cos(d)*h,l+Math.sin(d)*h,c*(.3+n()*.5),c*(.2+n()*.4),n()*3,0,7),s.fill()}s.beginPath(),s.ellipse(o,l,c,c*.7,n(),0,7),s.fill(),s.fillStyle="#4a0b09";for(let u=0;u<3;u++){let d=o+(n()-.5)*c*1.4;s.fillRect(d,l+c*.5,3,14+n()*30)}};for(let o=0;o<9;o++)r(n()*t,n()*e,8+n()*22);let a=ee(i);return a.colorSpace=ke,a}function d1(n){let t=te(128,128),e=t.getContext("2d");e.clearRect(0,0,128,128),e.fillStyle="#4a0b09",e.beginPath(),e.ellipse(56,78,22,30,.25,0,7),e.fill();let i=[[30,40],[46,30],[62,26],[76,32],[88,46]];for(let[a,o]of i)e.beginPath(),e.ellipse(a,o,6.5,15,a<60?-.35:.3,0,7),e.fill();let s=e.getImageData(0,0,128,128);for(let a=0;a<2600;a++){let o=n()*128|0,l=n()*128|0;s.data[(l*128+o)*4+3]>0&&(s.data[(l*128+o)*4]+=12)}e.putImageData(s,0,0);let r=ee(t);return r.colorSpace=ke,r}function f1(n){let t=te(128,160),e=t.getContext("2d");e.fillStyle="#8f8f8a",e.fillRect(0,0,128,160);let i=e.getImageData(0,0,128,160);me(i,n,{amp:10,base:i.data.slice()}),e.putImageData(i,0,0);for(let s of[34,64,94])e.fillStyle="rgba(52,50,44,0.55)",e.beginPath(),e.ellipse(s,84,11,15,0,0,7),e.fill(),e.beginPath(),e.ellipse(s,118,14,20,0,0,7),e.fill();e.fillStyle="rgba(30,28,24,0.5)";for(let s of[34,64,94])e.fillRect(s-7,78,14,8);return e.fillStyle="#c9bd9c",e.beginPath(),e.moveTo(128,0),e.lineTo(112,0),e.lineTo(128,18),e.fill(),e.strokeStyle="rgba(40,36,30,0.6)",e.strokeRect(2,2,124,156),ee(t)}function p1(n){let t=te(64,64),e=t.getContext("2d");e.fillStyle="#d8d2c4",e.fillRect(0,0,64,64);let i=e.getImageData(0,0,64,64);return me(i,n,{amp:8,base:i.data.slice()}),e.putImageData(i,0,0),e.fillStyle="#151210",e.fillRect(16,24,8,8),e.fillRect(42,24,10,10),e.fillStyle="#5c0e0c",e.fillRect(41,22,13,3),e.strokeStyle="#3a1a16",e.lineWidth=2,e.beginPath(),e.moveTo(24,48),e.quadraticCurveTo(32,52,40,48),e.stroke(),e.strokeStyle="rgba(40,36,30,0.65)",e.beginPath(),e.moveTo(0,40),e.lineTo(14,34),e.lineTo(26,38),e.lineTo(30,26),e.stroke(),ee(t)}function m1(){let n=te(64,48),t=n.getContext("2d"),e=t.createImageData(64,48);for(let s=0;s<e.data.length;s+=4){let r=Math.random()*255|0;e.data[s]=r,e.data[s+1]=r,e.data[s+2]=r,e.data[s+3]=255}let i=Math.random()*48|0;for(let s=0;s<64;s++){let r=(i*64+s)*4;e.data[r]=220,e.data[r+1]=220,e.data[r+2]=220}return t.putImageData(e,0,0),Qg(n)}function g1(n){let t=te(128,256),e=t.getContext("2d");e.fillStyle="#04070d",e.fillRect(0,0,128,256);let i=e.getImageData(0,0,128,256);return me(i,n,{amp:5,base:i.data.slice()}),e.putImageData(i,0,0),e.fillStyle="rgba(190,205,215,0.85)",e.beginPath(),e.arc(38,52,16,0,7),e.fill(),e.fillStyle="rgba(4,7,13,0.55)",e.beginPath(),e.arc(44,48,13,0,7),e.fill(),e.fillStyle="#0a0c10",e.fillRect(0,0,6,256),e.fillRect(122,0,6,256),e.fillRect(0,0,128,6),e.fillRect(0,250,128,6),e.fillRect(0,60,128,5),e.fillRect(0,128,128,5),e.fillRect(0,196,128,5),ee(t)}function x1(n){let t=te(128,256),e=t.getContext("2d");e.clearRect(0,0,128,256);for(let i=0;i<28;i++){let s=n()*128,r=n()*256,a=24+n()*64,o=.45+n()*.2;e.strokeStyle=`rgba(210,225,235,${.05+n()*.1})`,e.lineWidth=.5+n()*.7,e.beginPath(),e.moveTo(s,r),e.lineTo(s+a*o,r+a),e.stroke(),e.strokeStyle=`rgba(12,20,30,${.03+n()*.07})`,e.lineWidth=.4+n()*.5,e.beginPath(),e.moveTo(s+1.2,r),e.lineTo(s+1.2+a*o,r+a),e.stroke()}return ee(t,!1)}function _1(n){let t=te(128,256),e=t.getContext("2d");e.fillStyle="#b7ae8f",e.fillRect(0,0,128,256);let i=e.getImageData(0,0,128,256);return me(i,n,{amp:8,base:i.data.slice()}),e.putImageData(i,0,0),e.strokeStyle="#4a4230",e.lineWidth=4,e.strokeRect(3,3,122,250),e.lineWidth=2,e.strokeRect(12,12,104,112),e.strokeRect(12,132,104,112),e.fillStyle="rgba(40,36,26,0.6)",e.beginPath(),e.ellipse(34,240,18,12,.4,0,7),e.fill(),ge(e,128,256,"#7d745c",12,n),ee(t)}function y1(){let n=te(128,64),t=n.getContext("2d");t.fillStyle="#0a2a10",t.fillRect(0,0,128,64),t.fillStyle="#49d46a",t.font='bold 40px "Hiragino Kaku Gothic ProN", sans-serif',t.fillText("\u975E\u5E38\u53E3",14,46);let e=t.getImageData(0,0,128,64);return me(e,Lt(7),{amp:8,base:e.data.slice()}),t.putImageData(e,0,0),ee(n)}function v1(n){let t=te(256,128),e=t.getContext("2d"),i=e.createImageData(256,128);return Hs(i,n,12,4,[128,124,112]),e.putImageData(i,0,0),ge(e,256,128,"#4a4436",20,n),e.fillStyle="#8a1410",e.font="bold 30px serif",e.save(),e.translate(18,70),e.rotate(-.03),e.fillText("\u3053\u306E\u5ECA\u4E0B\u306F\u3001\u3069\u3053\u307E\u3067",0,0),e.restore(),e.save(),e.translate(40,106),e.rotate(.02),e.fillText("\u7D9A\u304F\u306E\u304B",0,0),e.restore(),ee(t)}function b1(n){let t=te(128,128),e=t.getContext("2d");e.fillStyle="#6e3a30",e.fillRect(0,0,128,128);let i=e.getImageData(0,0,128,128);me(i,n,{amp:12,base:i.data.slice()}),e.putImageData(i,0,0),e.fillStyle="#8a4a3a";for(let s=0;s<128;s+=32){let r=s/32%2?32:0;for(let a=-32+r;a<128;a+=64)e.fillRect(a,s,62,30)}e.strokeStyle="rgba(40,20,16,0.7)";for(let s=0;s<128;s+=32)e.fillRect(0,s,128,2);for(let s=0;s<128;s+=32){let r=s/32%2?32:0;for(let a=r;a<128;a+=64)e.fillRect(a,s,2,32)}return ge(e,128,128,"#2a1410",18,n),ee(t)}function M1(){let n=te(64,160),t=n.getContext("2d");t.fillStyle="#ddd6be",t.fillRect(0,0,64,160);let e=t.getImageData(0,0,64,160);return me(e,Lt(11),{amp:8,base:e.data.slice()}),t.putImageData(e,0,0),t.fillStyle="#9a1420",t.fillRect(26,20,12,120),t.strokeStyle="rgba(120,90,60,0.5)",t.strokeRect(1,1,62,158),ee(n)}function E1(n){let t=te(128,128),e=t.getContext("2d");e.fillStyle="#5a6270",e.fillRect(0,0,128,128);let i=e.getImageData(0,0,128,128);me(i,n,{amp:10,base:i.data.slice()}),e.putImageData(i,0,0),e.strokeStyle="rgba(30,34,44,0.7)";for(let s=0;s<=4;s++)e.fillRect(s*32-1,0,2,128),e.fillRect(0,s*32-1,128,2);e.fillStyle="rgba(180,190,205,0.15)";for(let s=0;s<4;s++)for(let r=0;r<4;r++)(r+s)%2&&e.fillRect(r*32+3,s*32+3,26,26);return ee(t)}function Jh(n){let t=te(64,64),e=t.getContext("2d"),i=e.createImageData(64,64);return Hs(i,n,10,4,[168,162,150]),e.putImageData(i,0,0),ge(e,64,64,"#6b5a4a",14,n),ge(e,64,64,"#8f9a92",8,n),ee(t)}function w1(n){let t=te(128,128),e=t.getContext("2d");return e.drawImage(Jh(n).image,0,0,128,128),e.fillStyle="#0c0a08",e.beginPath(),e.ellipse(40,52,13,17,.08,0,7),e.fill(),e.beginPath(),e.ellipse(88,52,13,17,-.08,0,7),e.fill(),e.fillStyle="rgba(210,205,190,0.5)",e.beginPath(),e.ellipse(42,47,3,4,0,0,7),e.fill(),e.beginPath(),e.ellipse(86,47,3,4,0,0,7),e.fill(),e.fillStyle="#120b08",e.beginPath(),e.ellipse(64,96,9,20,0,0,7),e.fill(),e.strokeStyle="rgba(60,30,24,0.8)",e.lineWidth=2,e.beginPath(),e.moveTo(52,108),e.lineTo(76,108),e.stroke(),ge(e,128,128,"#2c2018",10,n),ee(t)}function S1(n){let t=te(128,128),e=t.getContext("2d");e.fillStyle="#5a2620",e.fillRect(0,0,128,128);let i=e.getImageData(0,0,128,128);me(i,n,{amp:10,base:i.data.slice()}),e.putImageData(i,0,0),e.strokeStyle="#2a140e",e.lineWidth=6,e.strokeRect(6,6,116,116),e.strokeStyle="rgba(190,150,110,0.3)",e.lineWidth=2,e.strokeRect(12,12,104,104),e.strokeStyle="rgba(40,20,16,0.5)",e.lineWidth=2;for(let s=24;s<108;s+=21)for(let r=24;r<108;r+=21)e.beginPath(),e.moveTo(r,s-6),e.lineTo(r+6,s),e.lineTo(r,s+6),e.lineTo(r-6,s),e.closePath(),e.stroke();return ge(e,128,128,"#1c0e0a",16,n),ee(t)}function T1(n){let t=te(128,128),e=t.getContext("2d");e.fillStyle="#14100e",e.fillRect(0,0,128,128);let i=e.getImageData(0,0,128,128);me(i,n,{amp:8,base:i.data.slice()}),e.putImageData(i,0,0);for(let s=0;s<36;s++){let r=n()*128,a=n()*128,o=2+n()*4.5,l=n()*Math.PI;e.fillStyle="rgba(198,193,178,0.45)",e.beginPath(),e.ellipse(r,a,o*1.35,o,l,0,7),e.fill(),e.fillStyle="rgba(6,6,6,0.9)",e.beginPath(),e.ellipse(r,a,o*.55,o*.5,l,0,7),e.fill(),n()<.3&&(e.fillStyle="rgba(90,12,10,0.5)",e.fillRect(r-1,a+o,2,6+n()*12))}return ge(e,128,128,"#000000",6,n),ee(t)}function Zh(n=!1){let t=te(128,128),e=t.getContext("2d"),i=Lt(21);e.fillStyle="#e8e2d0",e.beginPath(),e.arc(64,64,60,0,7),e.fill();let s=e.getImageData(0,0,128,128);me(s,i,{amp:8,base:s.data.slice()}),e.putImageData(s,0,0),e.strokeStyle="#2a2620",e.lineWidth=3,e.beginPath(),e.arc(64,64,58,0,7),e.stroke();for(let o=0;o<12;o++){let l=o/12*Math.PI*2;e.lineWidth=o%3?2:4,e.beginPath(),e.moveTo(64+Math.sin(l)*48,64-Math.cos(l)*48),e.lineTo(64+Math.sin(l)*54,64-Math.cos(l)*54),e.stroke()}let r=(2+17/60)/12*Math.PI*2+(n?-.55:0),a=17/60*Math.PI*2+(n?-1.9:0);return e.lineWidth=5,e.beginPath(),e.moveTo(64,64),e.lineTo(64+Math.sin(r)*28,64-Math.cos(r)*28),e.stroke(),e.lineWidth=3,e.beginPath(),e.moveTo(64,64),e.lineTo(64+Math.sin(a)*44,64-Math.cos(a)*44),e.stroke(),e.strokeStyle="rgba(40,36,30,0.7)",e.lineWidth=2,e.beginPath(),e.moveTo(20,90),e.lineTo(42,78),e.lineTo(58,86),e.stroke(),ee(t)}function A1(n){let t=te(128,256),e=t.getContext("2d");e.fillStyle="#c9bd9c",e.fillRect(0,0,128,256);let i=e.getImageData(0,0,128,256);me(i,n,{amp:8,base:i.data.slice()}),e.putImageData(i,0,0),e.fillStyle="#3a2a1c",e.fillRect(0,0,128,10),e.fillRect(0,246,128,10),e.fillStyle="#1a1814";for(let s=0;s<2;s++){let r=34+s*36;e.font="bold 30px serif",e.fillText("\u25EF",r,62),e.font="26px serif",e.fillText("\u25EF",r,98),e.fillText("\u25EF",r,132),e.fillText("\u25EF",r,166),e.fillText("\u25EF",r,200)}return e.fillStyle="#a01420",e.fillRect(92,204,24,24),ge(e,128,256,"#8a7c58",10,n),ee(t)}function R1(){let n=te(128,256),t=n.getContext("2d");return t.clearRect(0,0,128,256),t.fillStyle="rgba(10,10,12,0.92)",t.beginPath(),t.ellipse(64,56,16,21,0,0,7),t.fill(),t.beginPath(),t.moveTo(40,80),t.quadraticCurveTo(64,70,88,80),t.lineTo(84,238),t.lineTo(44,238),t.closePath(),t.fill(),t.fillRect(24,94,14,122),t.fillRect(90,94,14,122),ee(n,!1)}function C1(n){let t=te(128,96),e=t.getContext("2d");e.clearRect(0,0,128,96),e.fillStyle="rgba(178,176,166,0.85)",e.beginPath(),e.ellipse(64,50,30,38,0,0,7),e.fill(),e.fillStyle="rgba(8,8,8,0.95)",e.beginPath(),e.ellipse(50,42,8,10,0,0,7),e.fill(),e.beginPath(),e.ellipse(78,42,8,10,0,0,7),e.fill(),e.beginPath(),e.ellipse(64,74,7,12,0,0,7),e.fill();let i=e.getImageData(0,0,128,96);for(let s=0;s<3e3;s++){let r=n()*128|0,o=((n()*96|0)*128+r)*4;i.data[o+3]>0&&(i.data[o]=i.data[o]<128?240:60)}return e.putImageData(i,0,0),ee(t,!1)}function P1(n){let t=te(128,256),e=t.getContext("2d");e.fillStyle="#1c2429",e.fillRect(0,0,128,256);let i=e.getImageData(0,0,128,256);me(i,n,{amp:7,base:i.data.slice()}),e.putImageData(i,0,0),e.strokeStyle="rgba(90,100,105,0.22)";for(let s=0;s<14;s++){e.beginPath();let r=n()*128;e.moveTo(r,0),e.lineTo(r+(n()-.5)*30,256),e.stroke()}return e.save(),e.translate(64,120),e.rotate(.06),e.fillStyle="rgba(8,10,12,0.82)",e.beginPath(),e.ellipse(0,32,20,48,0,0,7),e.fill(),e.beginPath(),e.ellipse(-2,-34,15,19,.08,0,7),e.fill(),e.fillRect(-36,-16,11,58),e.fillRect(25,-16,11,58),e.fillStyle="rgba(168,172,168,0.5)",e.beginPath(),e.ellipse(-4,-38,8,10,.08,0,7),e.fill(),e.fillStyle="rgba(200,45,52,0.75)",e.beginPath(),e.ellipse(-7,-39,2.2,1.6,0,0,7),e.fill(),e.beginPath(),e.ellipse(0,-40,2.2,1.6,0,0,7),e.fill(),e.restore(),e.strokeStyle="rgba(220,228,232,0.5)",e.beginPath(),e.moveTo(20,20),e.lineTo(48,90),e.lineTo(44,120),e.lineTo(70,190),e.stroke(),ge(e,128,256,"#0a0e10",12,n),ee(t)}function L1(n){let t=te(128,128),e=t.getContext("2d");e.fillStyle="#767b74",e.fillRect(0,0,128,128);for(let s=0;s<4;s++)for(let r=0;r<4;r++){let a=114+(n()-.5)*22|0;e.fillStyle=`rgb(${a},${a+3},${a-2})`,e.fillRect(r*32+2,s*32+2,28,28);for(let o=0;o<4;o++)e.fillStyle=`rgba(40,44,40,${.04+o*.045})`,e.fillRect(r*32+2,s*32+2+o*7,28,7);e.fillStyle="rgba(255,255,255,0.035)",e.fillRect(r*32+2,s*32+2,28,4),n()<.12&&(e.fillStyle="rgba(52,50,44,0.8)",e.fillRect(r*32+2,s*32+2,28,28),e.strokeStyle="rgba(20,18,14,0.5)",e.beginPath(),e.moveTo(r*32+6,s*32+8),e.lineTo(r*32+22,s*32+24),e.stroke())}ge(e,128,128,"#3d443c",22,n),ge(e,128,128,"#2c3a30",8,n);let i=e.getImageData(0,0,128,128);return me(i,n,{amp:6,base:i.data.slice()}),e.putImageData(i,0,0),ee(t)}function I1(n){let t=te(256,128),e=t.getContext("2d");e.fillStyle="#4a4e52",e.fillRect(0,0,256,128);let i=e.getImageData(0,0,256,128);me(i,n,{amp:8,base:i.data.slice()}),e.putImageData(i,0,0);for(let s=0;s<2;s++)for(let r=0;r<4;r++){let a=10+r*62,o=8+s*60;e.fillStyle="#6a7076",e.fillRect(a,o,54,48),e.strokeStyle="rgba(20,22,24,0.8)",e.lineWidth=2,e.strokeRect(a,o,54,48);for(let l=0;l<4;l++)bo(e,a+n()*54,o+n()*48,3+n()*5,"#7a4a26",.25,2);e.fillStyle="#c9bd9c",e.fillRect(a+6,o+26,40,12),e.fillStyle="rgba(40,36,30,0.85)",s===0&&r===2?(e.filter="blur(2px)",e.fillRect(a+9,o+29,34,6),e.filter="none"):e.fillRect(a+9,o+29,34,6),e.fillStyle="#1e2022",e.font="bold 11px sans-serif",e.fillText(String(s*4+r+1),a+44,o+14),e.fillStyle="#141618",e.beginPath(),e.arc(a+27,o+42,2.5,0,7),e.fill()}return ee(t)}function D1(n){let t=te(64,256),e=t.getContext("2d");e.clearRect(0,0,64,256),e.fillStyle="rgba(214,206,186,0.9)",e.fillRect(6,0,52,256);let i=e.getImageData(0,0,64,256);me(i,n,{amp:7,base:i.data.slice()}),e.putImageData(i,0,0),e.fillStyle="rgba(40,36,30,0.75)",e.font="9px serif";for(let s=16;s<248;s+=20)e.fillRect(20,s,24,1),e.fillText(String(210-(s-16)/20*10),7,s+3);return e.fillStyle="rgba(140,20,16,0.8)",e.font="10px serif",e.fillText("\u30D2\u30ED",44,92),e.fillRect(26,84,18,1),e.fillText("\u30CA\u30AA",44,120),e.fillRect(26,112,18,1),e.fillStyle="rgba(60,20,16,0.9)",e.fillText("\u30DF\u30C4\u30B3",38,200),e.fillRect(26,192,18,1),e.fillStyle="rgba(90,12,10,0.7)",e.fillRect(26,188,18,3),ee(t,!1)}function Kh(){let n={};return n.plaster=t1(Lt(101)),n.wallpaper=e1(Lt(102)),n.woodDoor=i1(Lt(103)),n.woodFloor=xl(Lt(104),128,128,[84,64,44],!0),n.woodWall=xl(Lt(105),128,128,[74,56,38],!0),n.tatami=n1(Lt(106)),n.ceiling=s1(Lt(107)),n.concrete=r1(Lt(108)),n.rust=o1(Lt(109)),n.paper=a1(Lt(110)),n.news=l1(Lt(111)),n.journal=c1(Lt(112)),n.drawing=h1(Lt(113)),n.blood=u1(Lt(114)),n.handprint=d1(Lt(115)),n.photo=f1(Lt(116)),n.dollFace=p1(Lt(117)),n.tvStatic=m1(),n.windowMoon=g1(Lt(118)),n.fusuma=_1(Lt(119)),n.exitSign=y1(),n.graffiti=v1(Lt(120)),n.brick=b1(Lt(121)),n.ofuda=M1(),n.quilt=E1(Lt(122)),n.skin=Jh(Lt(123)),n.face=w1(Lt(124)),n.rug=S1(Lt(125)),n.eyesWall=T1(Lt(126)),n.clock=Zh(),n.scroll=A1(Lt(127)),n.silhouette=R1(),n.tvFace=C1(Lt(128)),n.mirror=P1(Lt(129)),n.growth=D1(Lt(130)),n.tile=L1(Lt(131)),n.mailbox=I1(Lt(132)),n.rainStreaks=x1(Lt(133)),n.clockBack=Zh(!0),n}function $h(n){let t=n.image.getContext("2d"),e=t.createImageData(64,48);for(let s=0;s<e.data.length;s+=4){let r=Math.random()*255|0;e.data[s]=r,e.data[s+1]=r,e.data[s+2]=r,e.data[s+3]=255}let i=Math.random()*48|0;for(let s=0;s<64;s++){let r=(i*64+s)*4;e.data[r]=235,e.data[r+1]=235,e.data[r+2]=235}t.putImageData(e,0,0),n.needsUpdate=!0}function di(n,t,e,i){let s=Math.cos(n.rotation),r=Math.sin(n.rotation);return new I(n.x+s*t+r*e,i,n.z-r*t+s*e)}function U1(n,t=0,e=1){let i=n.base+t*n.rise,s=(n.width+n.gap)/2,r=[di(n,0,-1.25,i),di(n,-s,-.5,i)];for(let a=0;a<n.steps;a++)r.push(di(n,-s,(a+.5)*n.going,i+(a+1)*n.riser));for(let a of[-s,0,s])r.push(di(n,a,n.run+n.landingDepth/2,i+n.rise/2));for(let a=0;a<n.steps;a++)r.push(di(n,s,n.run-(a+.5)*n.going,i+n.rise/2+(a+1)*n.riser));return r.push(di(n,s,-.5,i+n.rise),di(n,0,-1.25,i+n.rise)),e>0?r:r.reverse()}function jh(n,t,e){let i=Math.sign(e.y-t.y);if(Math.abs(e.y-t.y)<.15)return null;let s=n.filter(d=>t.y>=d.base-.2&&t.y<=d.base+d.storeys*d.rise+.2&&(i>0?t.y<d.base+d.storeys*d.rise-.15:t.y>d.base+.15));s.sort((d,h)=>d.entry.distanceToSquared(t)-h.entry.distanceToSquared(t));let r=s[0];if(!r)return null;let a=Math.max(r.base,Math.min(r.base+r.storeys*r.rise,e.y)),o=r.path,l=0,c=1/0;for(let d=0;d<o.length-1;d++){let h=o[d],f=o[d+1],g=f.x-h.x,_=f.z-h.z,p=(f.y-h.y)*4,m=g*g+_*_+p*p;if(m<1e-8)continue;let y=Math.max(0,Math.min(1,((t.x-h.x)*g+(t.z-h.z)*_+(t.y-h.y)*4*p)/m)),x=(t.x-h.x-y*g)**2+(t.z-h.z-y*_)**2+((t.y-h.y)*4-y*p)**2;(x<c-1e-7||Math.abs(x-c)<1e-7&&i>0)&&(c=x,l=d)}let u=o[i>0?l+1:l];return Math.abs(t.y-a)<.1?null:u}function yl(n,t={}){var y;let e={x:0,z:64.2,base:0,rise:2.8,storeys:2,steps:8,width:1.65,gap:.35,going:.3,landingDepth:1.65,frontDepth:2.5,rotation:0,...t};e.run=e.steps*e.going,e.riser=e.rise/(e.steps*2);let i=e.width*2+e.gap+.3,s=(e.width+e.gap)/2;e.entry=di(e,0,-1.25,e.base),e.path=Array.from({length:e.storeys},(x,v)=>U1(e,v)).flat(),n.stairs.push(e);let r=new Ot;r.name="switchback-stair",r.position.set(e.x,0,e.z),r.rotation.y=e.rotation,r.userData.stair=e,n.scene.add(r);let a=((y=n.detailMaterials)==null?void 0:y.concrete)||n.materials.concrete,o=new Ie({color:5662043,roughness:.74,metalness:.18}),l=new Ie({color:3156516,roughness:.5,metalness:.12}),c=new Ie({color:9271120,roughness:.66,metalness:.45}),u=(x,v,S,M,b)=>{let U=new K(x,v);return U.position.set(S,M,b),r.add(U),U},d=(x,v,S,M,b,U,E)=>{let T=di(e,x,v,S),C=Math.abs(Math.sin(e.rotation))>.5,F=(C?b:M)/2,et=(C?M:b)/2,D={x0:T.x-F,x1:T.x+F,z0:T.z-et,z1:T.z+et,y0:S,y1:S+U,stairPart:E,walkable:["tread","floor-landing","half-landing"].includes(E)};return n.colliders.push(D),D},h=(x,v,S,M)=>{let b=u(new jt(i,.2,S),a,0,v-.1,x);b.userData.collider=d(0,x,v-.2,i,S,.2,M)},f=(x,v,S,M=o)=>{let b=v.clone().sub(x),U=u(new St(S,S,b.length(),12),M,0,0,0);return U.position.copy(x.clone().add(v).multiplyScalar(.5)),U.quaternion.setFromUnitVectors(new I(0,1,0),b.normalize()),U},g=(x,v,S)=>{u(new jt(.12,.018,.12),o,x,S+.009,v);for(let M of[-.037,.037])for(let b of[-.037,.037])u(new St(.009,.009,.012,6),c,x+M,S+.022,v+b)},_=(x,v,S,M,b,U=null)=>{for(let T of[.52,1.02])f(new I(x,M+T,v),new I(x,b+T,S),T>.8?.032:.014,T>.8?l:o);let E=Math.ceil((S-v)/.32);for(let T=0;T<=E;T++){let C=T/E,F=v+(S-v)*C,et=M+(b-M)*C,D=U?U(F):et;f(new I(x,D+.025,F),new I(x,et+1.01,F),.013),(T%3===0||T===E)&&g(x,F,D)}d(x,(v+S)/2,Math.min(M,b),.085,S-v,Math.abs(b-M)+1.08,"guard")},p=(x,v)=>{f(new I(-i/2,v+1.02,x),new I(i/2,v+1.02,x),.032,l),f(new I(-i/2,v+.52,x),new I(i/2,v+.52,x),.014);for(let S=-i/2;S<=i/2+.01;S+=.3)f(new I(S,v+.02,x),new I(S,v+1.02,x),.013),g(S,x,v);d(0,x,v,i,.085,1.08,"guard")};for(let x of[-.22,e.run+e.landingDepth-.16]){let v=x<0?e.storeys*e.rise:(e.storeys-.5)*e.rise;for(let M of[-i/2,i/2]){let b=u(new jt(.22,v,.28),a,M,e.base+v/2,x);b.userData.collider=d(M,x,e.base,.22,.28,v,"column")}let S=x<0?e.storeys:e.storeys-1;for(let M=0;M<=S;M++){let b=x<0?e.base+M*e.rise:e.base+(M+.5)*e.rise;u(new jt(i+.22,.35,.28),a,0,b-.175,x)}}let m=(x,v,S)=>{let M=new _n;M.moveTo(0,-.22),M.lineTo(0,e.riser);for(let U=0;U<e.steps;U++)M.lineTo((U+1)*e.going,(U+1)*e.riser),U<e.steps-1&&M.lineTo((U+1)*e.going,(U+2)*e.riser);M.lineTo(e.run,e.rise/2-.22),M.lineTo(0,-.22);let b=new is(M,{depth:e.width,bevelEnabled:!1,steps:1});b.rotateY(S>0?-Math.PI/2:Math.PI/2),u(b,a,x+S*e.width/2,v,S>0?0:e.run);for(let U=0;U<e.steps;U++){let E=S>0?(U+.5)*e.going:e.run-(U+.5)*e.going,T=v+(U+1)*e.riser;d(x,E,T-.24,e.width,e.going+.008,.24,"tread");let C=E-S*(e.going/2-.027);u(new jt(e.width-.06,.008,.043),c,x,T+.004,C);for(let et of[-.011,0,.011])u(new jt(e.width-.09,.0015,.003),l,x,T+.009,C+et);let F=di(e,x,E,T);n.monsterNodes.push({...F})}for(let U of[-1,1]){let E=x+U*(e.width/2-.075),T=S>0?v+e.riser:v+e.rise/2,C=S>0?v+e.rise/2:v+e.riser;_(E,.05,e.run-.05,T,C,F=>{let et=S>0?F:e.run-F,D=Math.min(e.steps-1,Math.floor(et/e.going));return v+(D+1)*e.riser})}};for(let x=0;x<=e.storeys;x++){let v=e.base+x*e.rise;if(h(-e.frontDepth/2,v,e.frontDepth,"floor-landing"),x>0){let S=x===e.storeys&&e.roofOpenDepth?-(e.frontDepth-e.roofOpenDepth):-e.frontDepth;for(let M of[-i/2,i/2])_(M,S,-.03,v,v)}n.monsterNodes.push({...di(e,0,-1.25,v)})}for(let x=0;x<e.storeys;x++){let v=e.base+x*e.rise;m(-s,v,1),m(s,v+e.rise/2,-1);let S=v+e.rise/2;h(e.run+e.landingDepth/2,S,e.landingDepth,"half-landing"),p(e.run+e.landingDepth-.04,S);for(let M of[-i/2,i/2])_(M,e.run,e.run+e.landingDepth-.04,S,S);for(let M of[-s,0,s])n.monsterNodes.push({...di(e,M,e.run+e.landingDepth/2,S)})}return e}var Qh=[{name:"\u96E8\u591C\u6742\u8D27\u5E97",floor:0,bounds:[-24,-37,-10,-17]},{name:"\u8857\u533A\u536B\u751F\u7AD9",floor:0,bounds:[10,-37,24,-17]},{name:"\u793E\u533A\u96E8\u68DA\u8FDE\u5ECA",floor:0,bounds:[-24,-45,24,-37]},{name:"\u56DE\u58F0\u793E\u533A\u4E2D\u5EAD",floor:0,bounds:[-24,-45,24,-9]}];function tu(n,t){let{box:e,mesh:i,cylinder:s,sign:r,lamp:a,desk:o,chair:l,shelf:c,closet:u,recordDocument:d}=t,h=n.materials,f=n.detailMaterials,g=n.campaign,_=nt({color:5397850,roughness:.87}),p=nt({color:3561038,roughness:.72,metalness:.15}),m=nt({color:11971985,roughness:.81}),y=nt({color:8876866,roughness:.83}),x=nt({color:1453104,roughness:.22,metalness:.32});n.floor(0,-27,48,36,0,_,[16,12]),n.wallZ(-9,-24,-.8,0,3.2,h.concrete),n.wallZ(-9,.8,24,0,3.2,h.concrete),n.wallZ(-45,-24,24,0,3.2,h.concrete),n.wallX(-24,-45,-9,0,3.2,h.concrete),n.wallX(24,-45,-9,0,3.2,h.concrete),e(0,-8.96,3.2,48,.22,8.4,h.concrete,!0);for(let S of[3.2,6,8.8,11.5])e(0,-9.14,S,48,.5,.13,_);for(let S of[-21,-15,-9,-3,3,9,15,21])for(let M of[4.5,7.3,10.1]){e(S,-9.105,M-.62,1.75,.035,1.4,x);for(let b of[-.9,0,.9])e(S+b,-9.16,M-.65,.05,.06,1.48,f.iron);for(let b of[-.65,.78])e(S,-9.16,M+b,1.85,.09,.05,f.iron);e(S,-9.24,M-.69,2,.34,.09,_)}n.room(-24,-10,-37,-17,{h:3,w:!1,wallMat:h.plaster,floorMat:h.tile,gaps:{e:[[-22,-20],[-34,-32]],n:[[-19,-17]]}}),n.room(10,24,-37,-17,{h:3,e:!1,wallMat:h.plaster,floorMat:h.tile,gaps:{w:[[-22,-20],[-34,-32]],n:[[17,19]]}}),n.ceil(0,-41,48,8,3.2,h.concrete);for(let S of[-9,0,9])for(let M of[-38,-44])e(S,M,0,.22,.22,3.2,p,!0),e(S,M,.02,.42,.42,.1,_,!0);for(let S of[-38,-44])e(0,S,3.04,48,.26,.16,p);for(let[S,M,b,U]of[[-10,-22,"z","\u6742\u8D27\u5E97\u524D\u95E8"],[-10,-34,"z","\u6742\u8D27\u5E97\u4FA7\u95E8"],[10,-22,"z","\u536B\u751F\u7AD9\u524D\u95E8"],[10,-34,"z","\u536B\u751F\u7AD9\u4FA7\u95E8"],[-19,-37,"x","\u6742\u8D27\u5E97\u540E\u95E8"],[17,-37,"x","\u536B\u751F\u7AD9\u540E\u95E8"]])n.makeDoor({x:S,z:M,along:b,width:2,dir:1,label:U,mat:p});r(-9.87,-26,2.05,"\u96E8\u591C\u6742\u8D27",["\u9762\u5305 / \u7535\u8BDD / \u5931\u7269\u62DB\u9886"],"e",2,!0),r(9.87,-26,2.05,"\u793E\u533A\u536B\u751F\u7AD9",["\u591C\u95F4\u6025\u6551\u8054\u7EDC\u5904"],"w",2,!0),r(0,-44.87,1.8,"\u56DE\u58F0\u793E\u533A",["\u516C\u5BD3 \u2191  \u536B\u751F\u7AD9 \u2192","\u2190 \u6742\u8D27\u5E97  /  \u96E8\u68DA\u901A\u9053"],"n",2.8,!0),r(-4,-9.13,1.9,"\u56DE\u58F0\u516C\u5BD3",["\u5907\u7528\u7535\u6E90\u6062\u590D\u540E\u53EF\u901A\u884C"],"s",1.8,!0),e(0,-44.82,0,3,.12,2.65,p,!0);for(let S of[-1.4,1.4])e(S,-44.66,.1,.12,.22,2.7,f.iron,!0);r(0,-44.68,1.6,"\u9053\u8DEF\u6C89\u964D",["\u901A\u5F80\u5929\u4E95\u7684\u6551\u63F4\u7EBF\u4ECD\u53EF\u4F7F\u7528"],"n",1.7),e(0,-28,0,5.6,7,.43,_,!0),e(0,-28,.43,5.1,6.5,.08,h.darkWood),e(0,-28,.51,1.4,.45,1.9,_,!0),r(0,-27.76,1.6,"\u8FC1\u5C45\u7EAA\u5FF5",["\u5171\u5341\u4E8C\u6237 / \u56DB\u5341\u4E00\u4EBA","\u6700\u540E\u4E00\u884C\u88AB\u53CD\u590D\u64E6\u8FC7"],"n",1.2);for(let S of[-2,2])for(let M of[-30,-26]){s(S,.82,M,.045,1.05,f.wood);for(let b of[-.45,.45]){let U=s(S+b*.3,1.2,M,.021,.65,f.wood);U.rotation.z=b}}for(let S of[-8,8])for(let M=-42;M<-10;M+=4){e(S,M,.004,.45,1.5,.012,f.iron);for(let b=0;b<7;b++)e(S,M-.6+b*.2,.017,.34,.045,.004,h.black)}for(let S of[-6,6])for(let M of[-15,-36])a(S,M,2.85,13741171,2.4,!1,{pole:0}),e(S-.48,M,0,.28,.28,.08,_,!0);o(-18,-21,0,4),d(25,-18,-21,.803,"\u672A\u53D6\u8D70\u7684\u9762\u5305\u8BA2\u5355"),c(-22.7,-26,0,1.65),c(-22.7,-31,0,1.65);for(let S of[-25,-29,-33]){e(-15,S,.75,2,.75,.075,f.wood,!0);for(let M of[-15.8,-14.2])e(M,S,0,.07,.65,.75,f.wood);for(let M=0;M<4;M++){let b=s(-15.65+M*.42,.94,S,.13,.29,M%2?m:y);s(b.position.x,1.09,S,.133,.02,f.iron)}}u(-22.8,-35.7,0),a(-18,-27,2.78,12755308,2.5),n._battery(-18,-20.8,.86),e(-12,-18.1,.9,1.3,.55,.065,f.wood,!0),e(-12,-18.1,.97,.36,.26,.12,p),s(-12,1.12,-18.08,.036,.4,h.black,"x");for(let S of[-12.16,-11.84])s(S,1.09,-18.08,.065,.09,h.black);for(let S=0;S<3;S++)for(let M=0;M<3;M++)e(-12.07+M*.07,-18.18+S*.05,1.091,.043,.032,.01,m);d(26,-12.45,-18.1,.971,"\u516C\u7528\u7535\u8BDD\u901A\u8BDD\u5E95\u5355");for(let S of[-12.5,-11.5])e(S,-18.1,0,.055,.4,.9,f.wood);o(18,-20,0,3.5),l(18,-21.3,0),d(27,18,-20,.803,"\u6551\u63F4\u63A5\u7EBF\u8BB0\u5F55"),r(18,-17.13,1.8,"\u8BF7\u5148\u547C\u53EB",["\u6551\u63F4\u9891\u9053 14.07","\u56DE\u5E94\u4EE5\u524D\uFF0C\u8BF7\u4E0D\u8981\u6302\u65AD"],"s",1.6);for(let S of[-27,-32]){e(19,S,.62,3,1.1,.13,f.iron,!0),e(19,S,.75,2.9,1,.15,m,!0),e(20,S,.9,.7,.92,.12,h.wallpaper);for(let M of[17.7,20.3])for(let b of[-.4,.4])s(M,.32,S+b,.035,.64,f.iron);for(let M of[17.55,20.45])e(M,S,.68,.055,1.05,.55,f.iron)}e(15,-29,0,.12,5,1.85,p,!0),e(15,-29,1.85,.18,5.2,.08,f.iron),u(22.9,-35.7,0),c(22.8,-24,0,1.3),a(18,-26,2.78,9550256,2.5),g.communityBeacon=a(0,-39,2.85,7576496,0,!1,{pole:0}),g.communityBeacon.base=3;let v=i(new ie(1.4,.7),new Be({color:2634543}),0,1.7,-39);e(0,-39.04,.02,1.5,.12,2,p,!0),g.communityPlaque=v;for(let[S,M]of[[0,-12],[-6,-20],[-6,-34],[0,-41],[6,-34],[6,-20],[-18,-22],[-18,-34],[18,-22],[18,-34]])n.monsterNodes.push({x:S,y:0,z:M})}var bl=[{name:"\u897F\u7FFC\u5C01\u95ED\u8D70\u5ECA",floor:1,bounds:[-30,54,-1,58]},{name:"\u7EA2\u706F\u6697\u623F",floor:1,bounds:[-30,40,-21,54]},{name:"204 \u6444\u5F71\u5E08\u65E7\u5C45",floor:1,bounds:[-21,40,-10,54]},{name:"\u4F4F\u6237\u7EAA\u5FF5\u5BA4",floor:1,bounds:[-30,28,-10,40]}],vl=new Map;function Gs(n=0){if(vl.has(n))return vl.get(n);let t=document.createElement("canvas");t.width=512,t.height=384;let e=t.getContext("2d"),i=Lt(714+n);e.fillStyle="#c9bea7",e.fillRect(0,0,512,384),e.save(),e.beginPath(),e.rect(22,22,468,300),e.clip(),e.fillStyle="#595953",e.fillRect(22,22,468,300),e.fillStyle="#7d7c6c",e.fillRect(22,185,468,137);for(let o=0;o<6;o++){e.fillStyle=o%2?"#676a62":"#878477",e.fillRect(30+o*82,60+o*9,65,160),e.fillStyle="#343e3c";for(let l=0;l<3;l++)e.fillRect(40+o*82,78+o*9+l*35,20,20)}e.strokeStyle="#b6b2a0",e.lineWidth=2,e.beginPath(),e.moveTo(32,100),e.lineTo(475,130),e.stroke();for(let o=0;o<3;o++)e.fillStyle="#c4beab",e.fillRect(50+o*54,108,42,68);let s=[[230,161,75],[291,158,80],[352,205,43],[397,224,31]];for(let[o,l,c]of s)e.fillStyle="#beb7a3",e.beginPath(),e.ellipse(o,l,c*.16,c*.22,0,0,7),e.fill(),e.fillStyle="#2e3431",e.beginPath(),e.ellipse(o,l-c*.1,c*.17,c*.14,-.08,Math.PI,7),e.fill(),e.fillStyle=n===1?"#6d6960":"#414943",e.beginPath(),e.moveTo(o-c*.23,l+c*.24),e.lineTo(o+c*.2,l+c*.24),e.lineTo(o+c*.29,l+c),e.lineTo(o-c*.3,l+c),e.closePath(),e.fill(),e.strokeStyle="#343b37",e.lineWidth=c*.12,e.beginPath(),e.moveTo(o-c*.12,l+c),e.lineTo(o-c*.14,l+c*1.55),e.moveTo(o+c*.12,l+c),e.lineTo(o+c*.16,l+c*1.55),e.stroke();if(e.strokeStyle="#aca28e",e.lineWidth=6,e.beginPath(),e.moveTo(364,234),e.lineTo(389,239),e.stroke(),n===0){e.strokeStyle="#343b37",e.lineWidth=8,e.beginPath(),e.moveTo(216,185),e.lineTo(189,152),e.stroke(),e.fillStyle="#82755b",e.fillRect(273,210,39,23),e.strokeStyle="#b6a384",e.lineWidth=2;for(let o=0;o<5;o++)e.beginPath(),e.moveTo(276+o*8,210),e.lineTo(276+o*8,233),e.stroke()}let r=e.getImageData(22,22,468,300);for(let o=0;o<r.data.length;o+=4){let l=(i()-.5)*23;for(let c=0;c<3;c++)r.data[o+c]+=l}e.putImageData(r,22,22),e.strokeStyle="#d9d1b05a",e.lineWidth=1;for(let o=0;o<10;o++){let l=25+i()*460;e.beginPath(),e.moveTo(l,23),e.lineTo(l+4,320),e.stroke()}e.restore(),e.fillStyle="#534d41",e.font='18px "Songti SC", serif',e.fillText(n===0?"\u4E09\u53F7\u5BA4 \xB7 \u4E03\u6708\u5341\u4E09\u65E5 / \u4E00\u4E2A\u4E5F\u4E0D\u80FD\u5C11":"\u56DE\u58F0\u516C\u5BD3 \xB7 \u6700\u540E\u4E00\u4E2A\u590F\u5929",30,355);let a=new hi(t);return a.colorSpace=pe,a.minFilter=_i,a.anisotropy=8,vl.set(n,a),a}function eu(n,t){let{box:e,mesh:i,cylinder:s,sign:r,lamp:a,desk:o,chair:l,shelf:c,closet:u,recordDocument:d,pickup:h}=t,f=n.materials,g=n.detailMaterials,_=n.campaign,p=2.8,m=5.2,y=nt({color:6892322,roughness:.7}),x=nt({color:1448987,roughness:.7,metalness:.25}),v=nt({color:9606539,roughness:.34,metalness:.75}),S=nt({map:Gs(),roughness:.68}),M=nt({map:Gs(1),roughness:.8});n.room(-30,-1,54,58,{y:p,h:2.4,e:!1,floorMat:f.tile,wallMat:f.plaster,gaps:{n:[[-26.5,-25],[-16.5,-15]]}}),n.room(-30,-21,40,54,{y:p,h:2.4,s:!1,floorMat:f.tile,wallMat:f.concrete}),n.room(-21,-10,40,54,{y:p,h:2.4,s:!1,w:!1,floorMat:f.woodFloor,gaps:{n:[[-16.5,-15]]}}),n.room(-30,-10,28,40,{y:p,h:2.4,s:!1,floorMat:f.woodFloor,wallMat:f.plaster}),_.doors.west=n.makeDoor({x:-1,z:55,y:p,width:1.6,dir:-1,offset:.11,label:"\u897F\u7FFC\u5C01\u95ED\u95E8",mat:g.paint,locked:!0,lockedMsg:"\u94A5\u5319\u85CF\u5728\u513F\u7AE5\u623F\u516B\u97F3\u76D2\u7684\u5939\u5C42\u91CC\u3002"}),n.makeDoor({x:-26.5,z:54,y:p,along:"x",width:1.5,dir:1,label:"\u7EA2\u706F\u6697\u623F",mat:g.paint}),n.makeDoor({x:-16.5,z:54,y:p,along:"x",width:1.5,dir:1,label:"204 \u6444\u5F71\u5E08\u65E7\u5C45"}),n.makeDoor({x:-16.5,z:40,y:p,along:"x",width:1.5,dir:1,label:"\u4F4F\u6237\u7EAA\u5FF5\u5BA4"}),r(-.87,54.4,4.45,"\u897F\u7FFC",["204 / \u6697\u623F"],"e",.55,!0),r(-25.75,54.13,4.4,"\u6697\u623F",["\u7D05\u71C8 / DARKROOM"],"n",.7,!0),r(-15.75,54.13,4.4,"204",[],"n",.48,!0),r(-15.75,40.13,4.4,"\u4F4F\u6237\u7EAA\u5FF5\u5BA4",[],"n",1.1,!0);for(let tt of[-4.5,-12,-21,-28])a(tt,56,5.03,11056032,2.6,!0);for(let tt of[54.13,57.87])n._baseboardX(tt,-29.8,-1.2,p,tt<55?[[-26.5,-25],[-16.5,-15]]:[]);n._baseboard(-29.87,54,58,p);for(let tt=0;tt<5;tt++){let B=-7-tt*4.5;n.decalWall(B,57.87,4.3,1,.75,Gs(tt%2),"s"),e(B,57.9,3.9,1.1,.045,.045,f.darkWood)}r(-29.86,56,4.25,"1998",["\u6CA1\u6709\u4EBA\u642C\u8D70","\u53EA\u662F\u505C\u6B62\u56DE\u5BB6"],"e",1.4),o(-13.7,43.1,p,2.8),l(-13.7,44.3,p);let b=e(-13.9,43.1,3.6,.4,.25,.23,x);s(-13.9,3.73,43.29,.092,.22,v,"z"),s(-13.9,3.73,43.415,.072,.03,g.darkGlass,"z"),e(-13.78,43.07,3.84,.07,.06,.04,v),e(-14.02,43.06,3.83,.14,.09,.09,x);let U=i(new ti(.26,.011,6,24,Math.PI),g.rubber,-13.9,3.6,43.1);U.rotation.x=Math.PI/2,n.regInteractable(b,"\u67E5\u770B\u6444\u5F71\u5E08\u7684\u76F8\u673A",2.5,()=>{var tt,B;return(B=(tt=n.handlers).onDocument)==null?void 0:B.call(tt,16)}),d(16,-12.8,43.1,3.601,"204 \u6444\u5F71\u5E08\u7684\u65E5\u8BB0");let E=new Ot;E.position.set(-14.5,3.65,43.1);let T=new K(new St(.06,.06,.13,20),x);E.add(T);let C=new K(new St(.061,.061,.067,20),g.enamel);E.add(C);let F=new K(new ie(.08,.26),nt({color:6508080,side:ae}));F.rotation.x=-Math.PI/2,F.position.set(.04,-.02,.12),E.add(F),n.scene.add(E),h("film",E,"\u53D6\u8D70\u4E03\u6708\u5341\u4E09\u65E5\u7684\u5E95\u7247"),c(-19.8,43,p,1.6),u(-19.4,52.8,p),e(-19,48.5,p,1.8,2.8,.25,f.darkWood,!0),e(-19,48.5,3.05,1.7,2.7,.16,f.quilt),e(-19,47.6,3.21,1,.5,.11,f.pale),n._window(-10.14,48,4.22,"w",{w:1.8,h:1.2}),a(-15.5,47.2,5.03,12888441,2.5,!0);for(let tt=0;tt<4;tt++)n.decalWall(-20.86,45+tt*1.6,4.15,.75,.55,Gs(tt%2),"e");o(-25.4,42.4,p,6.3);let et=[];for(let tt=0;tt<4;tt++){let B=-27.7+tt*1.5,ot=e(B,42.4,3.61,1.12,.68,.035,g.enamel);for(let mt of[-.56,.56])e(B+mt,42.4,3.61,.035,.71,.11,g.enamel);for(let mt of[-.34,.34])e(B,42.4+mt,3.61,1.15,.035,.11,g.enamel);let ft=i(new ie(1.04,.61),nt({color:tt===3?4282457:5327925,roughness:.25,metalness:.15}),B,3.659,42.4);ft.rotation.x=-Math.PI/2,r(B,40.13,4.35,["\u663E\u5F71","\u5B9A\u5F71","\u505C\u663E","\u6C34\u6D17"][tt],[],"n",.7,!0),n.regInteractable(ot,"\u51B2\u6D17\u5168\u5BB6\u798F\u5E95\u7247",2.7,()=>{var mt,vt;return(vt=(mt=n.handlers).onPuzzle)==null?void 0:vt.call(mt,"develop")}),et.push(ft)}_.photo=i(new ie(.32,.24),S,-23.2,3.67,42.4),_.photo.rotation.x=-Math.PI/2,_.photo.visible=!1,n.regInteractable(_.photo,"\u67E5\u770B\u6D17\u51FA\u7684\u5168\u5BB6\u798F",2.6,()=>{var tt,B;return(B=(tt=n.handlers).onDocument)==null?void 0:B.call(tt,14)}),o(-28.5,48.5,p,1.6),e(-28.5,48.5,3.61,.72,.6,.08,x),s(-28.5,4.12,48.7,.035,1.05,v),e(-28.5,48.48,4.48,.43,.44,.21,x),s(-28.5,4.43,48.48,.09,.15,v),d(13,-28.1,48.5,3.604,"\u6697\u623F\u51B2\u6D17\u89C4\u7A0B"),c(-22,51,p,1.2);for(let tt=0;tt<8;tt++){s(-29+tt*.85,4.68,40.9,.011,.2,v);let B=i(new ie(.5,.36),M,-29+tt*.85,4.42,40.9);_.dynamics.push({mesh:B,kind:"print",phase:tt}),n.props.campaignDynamic.attach(B)}s(-25.8,4.79,40.9,.012,6.6,v,"x"),a(-25.7,45.8,5.03,12993580,3.7,!0),a(-28.8,51.6,5.03,11355698,1.8,!0),r(-29.86,46,4.26,"\u6697\u623F",["\u53EA\u5F00\u7EA2\u706F","\u7167\u7247\u4F1A\u66FF\u4F60\u8BB0\u5F97"],"e",1.4,!0);for(let tt=0;tt<6;tt++){let B=-28+tt*3;e(B,28.15,3.79,1.38,.05,1.05,f.darkWood),n.decalWall(B,28.19,4.32,1.22,.91,Gs(tt%2),"n")}for(let tt of[-26,-22,-18,-14])l(tt,35.3,p);o(-21,31.1,p,4),d(15,-21.9,31.1,3.604,"\u6700\u540E\u4E00\u518C\u4F4F\u6237\u540D\u7C3F"),d(17,-19.6,31.1,3.604,"\u9632\u6C34\u888B\u91CC\u7684\u6536\u636E");let D=new Ot;D.position.set(-20.6,3.79,31.1);let O=new K(new St(.08,.085,.32,20),nt({color:6313530,roughness:.4}));D.add(O);let Y=new K(new St(.052,.052,.055,16),x);Y.position.y=.182,D.add(Y);let rt=new K(new jt(.14,.18,.143),g.enamel);D.add(rt),n.scene.add(D),h("developer",D,"\u53D6\u8D70\u5BC6\u5C01\u7684\u663E\u5F71\u6DB2"),r(-20,28.14,4.7,"\u4E00\u4E2A\u4E5F\u4E0D\u80FD\u5C11",["\u4E09\u53F7\u5BA4 / \u6700\u540E\u4E00\u4E2A\u590F\u5929"],"n",3.2),n._window(-29.86,33.5,4.22,"e",{w:2.5,h:1.2}),a(-25,33,5.03,13020551,3.2),a(-15,33,5.03,13020551,3),n._battery(-28.2,38,2.85);for(let tt of bl.slice(1)){let[B,ot,ft,mt]=tt.bounds;n._baseboard(B+.13,ot+.1,mt-.1,p),n._baseboard(ft-.13,ot+.1,mt-.1,p),n._baseboardX(ot+.13,B+.1,ft-.1,p,tt.name.includes("204")?[[-16.5,-15]]:[]),mt===54&&n._baseboardX(mt-.13,B+.1,ft-.1,p,[tt.name.includes("\u6697\u623F")?[-26.5,-25]:[-16.5,-15]])}for(let[tt,B]of[[-29.84,47],[-20.86,50],[-29.84,36]])n.decalWall(tt,B,3.4,.9,1.1,n.tex.rust,"e");for(let tt of[46.6,49.4]){let B=new ie(1.15,1.7,18,8),ot=B.attributes.position;for(let mt=0;mt<ot.count;mt++)ot.setZ(mt,Math.sin(ot.getX(mt)*36)*.045);B.computeVertexNormals();let ft=i(B,nt({color:6646096,roughness:1,side:ae}),-10.35,4.15,tt);ft.rotation.y=-Math.PI/2,s(-10.37,5.02,tt,.018,1.3,v,"z")}let it=document.createElement("canvas");it.width=it.height=128;let Z=it.getContext("2d"),st=Z.createRadialGradient(64,64,5,64,64,64);st.addColorStop(0,"rgba(0,0,0,.52)"),st.addColorStop(1,"rgba(0,0,0,0)"),Z.fillStyle=st,Z.fillRect(0,0,128,128);let ht=new Be({map:new hi(it),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1});for(let[tt,B,ot,ft]of[[-13.7,43.1,3.2,1.2],[-19,48.5,2.1,3.1],[-25.4,42.4,6.7,1.2],[-28.5,48.5,2,1.3],[-21,31.1,4.4,1.3],...[-26,-22,-18,-14].map(mt=>[mt,35.3,.8,.9])]){let mt=i(new ie(ot,ft),ht,tt,2.807,B);mt.rotation.x=-Math.PI/2}for(let[tt,B]of[[-3,56],[-10,56],[-18,56],[-26,56],[-25,50],[-25,45],[-16,49],[-16,43],[-16,37],[-22,35],[-27,35]])n.monsterNodes.push({x:tt,y:p,z:B});_.trays=et,_.westBuilt=!0}var Ml=[{name:"\u5730\u4E0B\u65E7\u533A\u8FDE\u5ECA",floor:-1,bounds:[12,29,44,33]},{name:"\u65E7\u533A\u68C0\u4FEE\u8D70\u5ECA",floor:-1,bounds:[22,33,26,67]},{name:"\u5730\u4E0B\u503C\u73ED\u7AD9",floor:-1,bounds:[12,33,22,45]},{name:"\u5907\u7528\u53D1\u7535\u673A\u623F",floor:-1,bounds:[26,33,44,47]},{name:"\u642C\u8FC1\u6863\u6848\u5E93",floor:-1,bounds:[12,45,22,59]},{name:"\u65E7\u84C4\u6C34\u6C60",floor:-1,bounds:[26,47,44,67]},{name:"\u5E94\u6025\u7535\u53F0\u5BA4",floor:-1,bounds:[12,59,22,67]}];function iu(n,t){let{box:e,mesh:i,cylinder:s,sign:r,lamp:a,desk:o,chair:l,shelf:c,closet:u,recordDocument:d,pickup:h}=t,f=n.materials,g=n.detailMaterials,_=n.campaign,p=-2.8,m=nt({color:4020811,roughness:.75,metalness:.25}),y=nt({color:10660250,roughness:.68,metalness:.15}),x=nt({color:9846316,roughness:.62,metalness:.25}),v=g.brass;n.room(12,44,29,33,{y:p,h:2.65,wallMat:f.concrete,floorMat:f.concrete,gaps:{n:[[15.8,17.4]],s:[[16,17.6],[23.2,24.8],[34,35.6]]}}),n.room(22,26,33,67,{y:p,h:2.65,n:!1,w:!1,e:!1,wallMat:f.concrete,floorMat:f.tile}),n.room(12,22,33,45,{y:p,h:2.65,n:!1,wallMat:f.plaster,floorMat:f.tile,gaps:{e:[[38,39.6]],s:[[16,17.6]]}}),n.room(12,22,45,59,{y:p,h:2.65,n:!1,wallMat:f.plaster,floorMat:f.concrete,gaps:{e:[[52,53.6]],s:[[16,17.6]]}}),n.room(12,22,59,67,{y:p,h:2.65,n:!1,wallMat:f.plaster,floorMat:f.tile,gaps:{e:[[63,64.6]]}}),n.room(26,44,33,47,{y:p,h:2.65,n:!1,wallMat:f.concrete,floorMat:f.concrete,gaps:{w:[[40,41.6]],s:[[34,35.6]]}}),n.room(26,44,47,67,{y:p,h:2.65,n:!1,wallMat:f.concrete,floorMat:f.concrete,gaps:{w:[[56,57.6]]}}),_.doors.annex=n.makeDoor({x:15.8,z:29,along:"x",y:p,width:1.6,dir:1,label:"\u5730\u4E0B\u65E7\u533A\u9632\u706B\u95E8",mat:m,locked:!0,lockedMsg:"\u65E7\u533A\u88AB\u5C01\u95ED\u4E86\u3002\u6444\u5F71\u5E08\u5C06\u94A5\u5319\u85CF\u5728\u5168\u5BB6\u798F\u80CC\u540E\u7684\u76F8\u7EB8\u5939\u5C42\u91CC\u3002"});for(let[C,F,et,D]of[[16,33,"\u5730\u4E0B\u503C\u73ED\u7AD9","x"],[16,45,"\u642C\u8FC1\u6863\u6848\u5E93","x"],[16,59,"\u5E94\u6025\u7535\u53F0\u5BA4","x"],[34,33,"\u5907\u7528\u53D1\u7535\u673A\u623F","x"],[34,47,"\u65E7\u84C4\u6C34\u6C60","x"]])n.makeDoor({x:C,z:F,along:D,y:p,width:1.6,dir:1,label:et,mat:m});r(16.6,28.87,-1.1,"\u65E7\u533A\u5C01\u95ED",["\u503C\u73ED\u7AD9 / \u53D1\u7535\u673A / \u6863\u6848\u5E93","\u76F8\u7EB8\u5939\u5C42\u5185\u7559\u6709\u94A5\u5319"],"s",1.35,!0),r(24,33.12,-1.25,"\u68C0\u4FEE\u8D70\u5ECA",["\u5DE6\u4FA7\uFF1A\u6863\u6848 / \u7535\u53F0","\u53F3\u4FA7\uFF1A\u53D1\u7535 / \u84C4\u6C34\u6C60"],"n",1.35,!0);for(let[C,F,et]of[[16.8,33.13,"\u503C\u73ED\u7AD9"],[34.8,33.13,"\u53D1\u7535\u673A\u623F"],[16.8,45.13,"\u642C\u8FC1\u6863\u6848"],[16.8,59.13,"\u5E94\u6025\u7535\u53F0"],[34.8,47.13,"\u84C4\u6C34\u6C60"]])r(C,F,-1.2,et,[],"n",1,!0);for(let[C,F]of[[16,31],[25,31],[34,31],[41,31],[24,38],[24,48],[24,59],[24,65]])a(C,F,-.32,10466980,2.8,!0),e(C,F,p+.01,.7,.05,.01,y);for(let C of[22.3,25.7]){s(C,-.47,50,.065,32,f.rust,"z");for(let F of[35,43,51,59,65])e(C,F,-.72,.11,.07,.35,g.paint),s(C,-.47,F,.08,.08,g.paint,"z")}for(let[C,F]of[[37,"01 \u503C\u73ED"],[48,"02 \u6863\u6848"],[60,"03 \u547C\u53EB"]])r(25.87,C,-1.25,F,["\u539F\u8DEF\u8FD4\u56DE\u914D\u7535\u95F4"],"w",1.15,!0);for(let C of Ml){let[F,et,D,O]=C.bounds;for(let Y of[F+.13,D-.13])for(let rt of[et+.7,O-.7])e(Y,rt,p,.025,.8,.7,m)}o(14.5,35.2,p,2.9),l(14.5,36.5,p),d(18,14.1,35.2,p+.803,"\u6700\u540E\u4E00\u6B21\u4EA4\u73ED\u65E5\u5FD7"),d(24,15,35.2,p+.803,"\u6CF5\u623F\u95E8\u9501\u5DE5\u5355"),e(14.4,35.15,p+.8,.38,.25,.13,f.black),s(14.25,p+.985,35.15,.055,.08,g.paint),r(12.13,39,-1,"\u4EA4\u73ED\u724C",["\u767D\u73ED\uFF1A\u672A\u7B7E\u5B57","\u591C\u73ED\uFF1A02:17"],"e",1.4);for(let C=0;C<5;C++)e(12.2,42.2-C*.3,p+1.45,.04,.22,.26,f.darkWood),s(12.25,p+1.55,42.2-C*.3,.035,.015,v,"x");e(18.8,43,p+.42,3,.65,.1,f.darkWood,!0),e(18.8,43.34,p+.5,3,.05,.55,m);for(let C of[17.5,20.1])e(C,43,p,.065,.6,.43,g.paint);u(13.1,43,p),a(17,39,-.35,12887931,3.1,!0),n._battery(20.5,34.8,p+.07),e(38,40,p,5.5,2.5,.3,g.paint,!0),e(37.5,40,p+.3,3.6,1.75,1.3,m,!0),s(40,p+.98,40,.65,1.8,y,"x");for(let C of[39.25,40.5])s(C,p+.98,40,.67,.075,g.paint,"x");for(let C=0;C<12;C++)e(35.65,39.22+C*.13,p+.46,.035,.055,1.02,f.darkMetal);for(let C of[36.3,38.7])for(let F of[39.2,40.8])e(C,F,p+.12,.35,.35,.32,f.black);s(37.6,-.63,40,.09,1.2,f.rust,"x"),s(37,-1.04,40,.09,.82,f.rust),e(41.9,40,p,.7,2.5,1.6,m,!0);let S=e(30.1,34.1,p,2.1,.42,1.8,g.paint,!0);for(let C of[29.5,30.1,30.7]){let F=s(C,p+1.4,34.34,.12,.04,y,"z");s(C,p+1.4,34.37,.09,.025,g.darkGlass,"z"),e(C,34.4,p+1.37,.012,.02,.085,x)}n.regInteractable(S,"\u542F\u52A8\u5907\u7528\u67F4\u6CB9\u673A",2.7,()=>{var C,F;return(F=(C=n.handlers).onPuzzle)==null?void 0:F.call(C,"generator")}),d(19,29,35.7,p+.8,"\u5907\u7528\u67F4\u6CB9\u673A\u542F\u52A8\u89C4\u7A0B"),o(29.6,35.7,p,1.8);for(let[C,F]of[[28,43.5],[30,43.5],[32,43.5]]){s(C,p+.65,F,.43,1.3,x),n.colliders.push(Ye(C,p+.65,F,.86,1.3,.86));for(let et of[p+.2,p+1.1])s(C,et,F,.45,.05,g.paint)}r(43.87,39,-1.2,"\u5907\u7528\u8F93\u51FA",["\u5148\u9884\u70ED\uFF0C\u518D\u4F9B\u6CB9","\u6700\u540E\u63A5\u901A\u8F93\u51FA"],"w",1.5,!0),a(33,39,-.35,11451820,3.4,!0),a(41,43,-.35,12952691,3,!0),a(37.5,40,-.35,11976094,3.6,!0),_.generatorLamp=a(30.1,34.5,-1.2,7581045,.65,!1),_.generatorRotor=s(40.95,p+.98,40,.38,.08,g.paint,"x"),n.props.campaignDynamic.add(_.generatorRotor);for(let C of[13.4,17.3,20.5])for(let F of[47.3,55.6])c(C,F,p,1.65);o(14.5,52,p,2),l(14.5,53.2,p),d(20,14.1,52,p+.803,"\u6CA1\u6709\u7ED3\u6E05\u7684\u642C\u8FC1\u603B\u8D26"),e(20.3,51,p,1,.75,.8,m,!0),e(20.3,51.3,p+.8,1.02,.045,.55,m);let M=new Ot,b=i(new St(.065,.065,.28,12),y,0,0,0,M);b.rotation.z=Math.PI/2;for(let C of[-.13,.13]){let F=i(new St(.07,.07,.05,12),v,C,0,0,M);F.rotation.z=Math.PI/2}M.position.set(20.3,p+.87,51),n.scene.add(M),h("relayFuse",M,"\u53D6\u8D70\u65E7\u533A\u8F93\u51FA\u7194\u65AD\u5668"),r(20.3,51.46,-1.4,"\u7EF4\u4FEE\u5907\u4EF6",["\u67F4\u6CB9\u673A\u8F93\u51FA\u7194\u65AD\u5668"],"n",.8,!0),a(16.5,50,-.35,11777691,3.1,!0),a(17.5,57,-.35,9153689,2.5,!0),e(37.2,58,p,10.4,11,.28,g.paint,!0);let U=i(new ie(9.4,10),nt({color:2309430,roughness:.3,metalness:.2}),37.2,p+.3,58);U.rotation.x=-Math.PI/2;for(let C of[31.95,42.45]){n.colliders.push(Ye(C,p+.84,58,.08,1.12,11));for(let F of[.52,1.08])e(C,58,p+.28+F,.065,11,.045,y);for(let F=52.5;F<=63.5;F+=.5)s(C,p+.84,F,.027,1.12,y)}for(let C of[52.45,63.55]){n.colliders.push(Ye(37.2,p+.84,C,10.6,1.12,.08));for(let F of[.52,1.08])e(37.2,C,p+.28+F,10.6,.065,.045,y);for(let F=32;F<=42.5;F+=.5)s(F,p+.84,C,.027,1.12,y)}s(42.8,-.55,58,.12,15,f.rust,"z");for(let C of[49.5,64.5])s(42.8,-1.45,C,.12,1.8,f.rust);let E=r(26.13,61,-1.2,"\u82CD\u592A \xB7 \u4E03\u5C81",["\u5899\u4E0A\u7684\u523B\u7EBF\u505C\u5728\u8FD9\u91CC"],"e",1.7);n.regInteractable(E,"\u8BFB\u84C4\u6C34\u6C60\u5899\u4E0A\u7684\u523B\u5B57",2.7,()=>{var C,F;return(F=(C=n.handlers).onDocument)==null?void 0:F.call(C,22)});for(let C=0;C<9;C++)e(26.16,60.8,p+.35+C*.08,.015,.35,.012,y);a(29,51,-.35,8566176,3,!0),a(29,63,-.35,11834736,3.2,!0),a(40,65,-.35,8566176,2.8,!0),a(37.2,58,-.35,10402725,3.6,!0),u(27.2,49,p),n._battery(28.5,64.8,p+.07),o(15.3,65.4,p,3.1),l(15.3,64.2,p);let T=e(15.3,65.4,p+.8,1.3,.65,.62,m,!0);e(15.3,65.05,p+.95,.9,.035,.23,g.darkGlass);for(let C of[14.83,15.78])s(C,p+1,65,.08,.075,g.paint,"z");for(let C=0;C<7;C++)e(15.65,65.015,p+1.16+C*.025,.25,.012,.008,y);s(14.9,p+1.75,65.5,.012,.75,g.paint),s(15.82,p+1.44,65.3,.026,.11,v),n.regInteractable(T,"\u8C03\u8C10\u5E94\u6025\u65E0\u7EBF\u7535",2.7,()=>{var C,F;return(F=(C=n.handlers).onPuzzle)==null?void 0:F.call(C,"radio")}),d(21,16.4,65.4,p+.803,"\u5E94\u6025\u547C\u53EB\u9891\u9053\u8868"),r(12.13,62,-1.1,"\u4E0D\u8981\u7ED3\u675F\u901A\u8BDD",["14.07 MHz / \u56DB\u4F4D\u8C03\u8C10\u7801","\u628A\u540D\u5B57\u8BF4\u51FA\u6765"],"e",1.35,!0),a(16,62,-.35,12955525,3,!0),_.radioLamp=a(15.3,65,-1.5,8109974,.55,!1);for(let[C,F]of[[16.6,30.5],[23.8,31],[24,38],[24,48],[24,58],[24,65],[18,38],[18,52],[18,62],[29,40],[34.8,45],[34.8,49],[29,57],[29,64],[40,49],[40,65]])n.monsterNodes.push({x:C,y:p,z:F})}var El=[...Qh,...Ml,...bl,{name:"\u5165\u53E3\u5927\u5385",floor:0,bounds:[-5,-9,5,-2]},{name:"\u7384\u5173",floor:0,bounds:[-1.7,-2,1.7,1.8]},{name:"\u4E00\u697C\u8D70\u5ECA",floor:0,bounds:[-1.9,1.8,1.9,61.7]},{name:"\u4E1C\u7FFC\u8D70\u5ECA",floor:0,bounds:[1.9,42,31,46]},{name:"\u516C\u5171\u6D17\u8863\u623F",floor:0,bounds:[7,32,17.5,42]},{name:"104 \u7A7A\u5C4B",floor:0,bounds:[7,46,18.5,56]},{name:"\u7BA1\u7406\u5458\u7EF4\u4FEE\u5BA4",floor:0,bounds:[19,32,31,42]},{name:"\u53A8\u623F",floor:0,bounds:[-8.4,0,-1.7,7.5]},{name:"\u5BA2\u5385",floor:0,bounds:[-8.4,7.5,-1.7,15.5]},{name:"\u5BDD\u5BA4",floor:0,bounds:[-13.8,7.5,-8.4,15.5]},{name:"\u6D74\u5BA4",floor:0,bounds:[-17.6,14.8,-13.8,21]},{name:"\u4F5B\u95F4",floor:0,bounds:[1.7,0,8.4,8.5]},{name:"\u513F\u7AE5\u623F",floor:0,bounds:[1.7,8.5,8.4,15.5]},{name:"\u7EF4\u4FEE\u697C\u68AF\u95F4",floor:0,bounds:[1.7,16,11.8,25]},{name:"\u7EF4\u4FEE\u697C\u68AF\u95F4",floor:-1,bounds:[1.7,16,11.8,25]},...[0,1,2].map(n=>({name:"\u6298\u8FD4\u697C\u68AF\u95F4",floor:n,bounds:[-5,61.7,5,72.8]})),{name:"\u5C4B\u9876\u667E\u6652\u573A",floor:2,bounds:[-8,61.7,8,83]},{name:"\u4E8C\u697C\u8D70\u5ECA",floor:1,bounds:[-1,0,1,61.7]},{name:"201 \u7BA1\u7406\u5BA4",floor:1,bounds:[-8.4,16,-1,27]},{name:"202 \u7559\u5B88\u4F4F\u6237",floor:1,bounds:[1,40,10,54]},{name:"203 \u653E\u6620\u5BA4",floor:1,bounds:[-10,36,-1,48]},{name:"\u9732\u5929\u5929\u4E95",floor:1,bounds:[1,28.5,10.5,33]},{name:"\u5730\u4E0B\u914D\u7535\u95F4",floor:-1,bounds:[11.8,14,20,29]},{name:"\u5730\u4E0B\u6392\u6C34\u95F4",floor:-1,bounds:[20,14,24,29]}];function hs(n){var e,i;let t=n.y<-.8?-1:n.y>4.8?2:n.y>2?1:0;return(i=(e=El.find(s=>s.floor===t&&n.x>=s.bounds[0]&&n.x<=s.bounds[2]&&n.z>=s.bounds[1]&&n.z<=s.bounds[3]))==null?void 0:e.name)!=null?i:t===-1?"\u5730\u4E0B\u7EF4\u4FEE\u697C\u68AF":"\u697C\u68AF\u95F4"}function nu(n){let t=n.materials,e=Qi(n);for(let[L,z,R]of[["concrete",e.concrete,.018],["plaster",e.plaster,.012],["wallpaper",e.plaster,.006],["woodWall",e.wood,.009],["woodDoor",e.wood,.008],["woodFloor",e.wood,.009]])t[L].bumpMap=z.bumpMap,t[L].roughnessMap=z.roughnessMap,t[L].bumpScale=R;let i=n.scene,s=Lt(14071998),r={collide:!1,cast:!1,geo:{ao:"none",jitter:0,bevel:!0}},a=nt({color:6450537,roughness:.88,metalness:.08}),o=nt({color:9597771,roughness:.68,metalness:.12}),l=nt({color:8666417,roughness:.9,metalness:.06}),c=nt({color:3493466,roughness:.92}),u=nt({map:n.tex.journal,color:14076335,roughness:1});n.campaign={doors:{},pickups:{},valves:[],lamps:[],dynamics:[]};let d=n.campaign;n.props.campaignDynamic=new Ot,i.add(n.props.campaignDynamic);let h=(L,z,R,H,k,q,G,gt=!1)=>n.box(L,z,R,H,k,q,G===t.darkWood?e.wood:G,gt?{geo:{bevel:!0}}:r),f=(L,z,R,H,k,q=i)=>{let G=new K(L,z);return G.position.set(R,H,k),q.add(G),G},g=(L,z,R,H,k,q,G="y")=>{let gt=f(new St(H,H,k,10),q,L,z,R);return G==="x"&&(gt.rotation.z=Math.PI/2),G==="z"&&(gt.rotation.x=Math.PI/2),gt},_=(L,z=[],R=!1)=>{let H=document.createElement("canvas");H.width=512,H.height=320;let k=H.getContext("2d");k.fillStyle=R?"#25342f":"#c4b99e",k.fillRect(0,0,512,320);for(let G=0;G<400;G++)k.fillStyle="rgba(30,26,18,"+s()*.07+")",k.fillRect(s()*512,s()*320,s()*25+1,1);k.strokeStyle=R?"#829083":"#6e6556",k.lineWidth=3,k.strokeRect(14,14,484,292),k.fillStyle=R?"#d7d9c5":"#302c26",k.textAlign="center",k.font='bold 38px "Songti SC", serif',k.fillText(L,256,z.length?82:175),k.font='25px "Songti SC", serif',z.forEach((G,gt)=>k.fillText(G,256,145+gt*44));let q=new hi(H);return q.colorSpace=pe,q.minFilter=_i,q},p=(L,z,R,H,k,q,G=.72,gt=!1)=>n.decalWall(L,z,R,G,G*.625,_(H,k,gt),q),m=(L,z,R,H,k)=>{let q=f(new ie(.28,.36),u,z,H,R);return q.rotation.x=-Math.PI/2,q.rotation.z=-.13,q.material=nt({map:n.tex.journal,color:14799537,roughness:1,side:ae,emissive:5917482,emissiveIntensity:.14}),n.regInteractable(q,k,2.6,()=>{var G,gt;return(gt=(G=n.handlers).onDocument)==null?void 0:gt.call(G,L)}),n.notePickups.push({mesh:q,id:L}),q},y=(L,z,R)=>{let H=n.regInteractable(z,R,2.4,()=>{var k,q;return(q=(k=n.handlers).onItem)==null?void 0:q.call(k,L,z,H)});d.pickups[L]={mesh:z,interactable:H}},x=(L,z,R,H=9876136,k=2,q=!1,G=null)=>{var W;let gt=new Fe(H,k,8,1.8);gt.position.set(L,R-.08,z),i.add(gt);let bt=Xh(n,L,R,z,q?2698537:H);if(G!=null&&G.wall)G.wall==="east"||G.wall==="west"?(bt.group.rotation.z=G.wall==="east"?-Math.PI/2:Math.PI/2,gt.position.set(L+(G.wall==="east"?-.08:.08),R,z)):(bt.group.rotation.x=G.wall==="south"?Math.PI/2:-Math.PI/2,gt.position.set(L,R,z+(G.wall==="south"?-.08:.08)));else if((G==null?void 0:G.pole)!==void 0){let ct=R+.12,lt=G.pole;g(L-.48,(lt+ct)/2,z,.033,ct-lt,a),g(L-.24,ct,z,.024,.48,a,"x"),g(L,R+.075,z,.019,.09,a),h(L-.48,z,lt,.16,.16,.035,a)}else{let ct=n.ceilings.filter(at=>L>=at.x0&&L<=at.x1&&z>=at.z0&&z<=at.z1&&at.y>=R-.1&&at.y-R<.8).sort((at,Ct)=>at.y-Ct.y)[0],lt=(W=G==null?void 0:G.ceiling)!=null?W:ct==null?void 0:ct.y;if(lt>R+.035)for(let at of[-.25,.25])g(L+at,(lt+R+.035)/2,z,.014,lt-R-.035,a)}let A=bt.diffuser,w={light:gt,base:k,powered:q,bulb:A};return d.lamps.push(w),q&&(gt.intensity=0),w},v=(L,z,R,H=1.8)=>{h(L,z,R+.73,H,.8,.06,t.darkWood,!0);for(let k of[-H/2+.09,H/2-.09])for(let q of[-.3,.3])h(L+k,z+q,R,.06,.06,.73,t.darkWood);h(L+H/2-.28,z,R,.38,.7,.68,t.darkWood,!0);for(let k=0;k<3;k++){let q=L+H/2-.28,G=R+.07+k*.2;h(q,z-.361,G,.34,.025,.176,t.darkWood),g(q,G+.1,z-.406,.012,.18,o,"x");for(let gt of[-.065,.065])g(q+gt,G+.1,z-.384,.011,.045,o,"z")}},S=(L,z,R,H=t.darkWood)=>{h(L,z,R+.4,.47,.46,.07,H);for(let k of[-.21,.21])h(L+k,z+.2,R+.44,.048,.045,.49,H);for(let k of[.57,.72,.87])h(L,z+.2,R+k,.4,.045,.055,H);for(let k of[-.19,.19])for(let q of[-.18,.18])h(L+k,z+q,R,.035,.035,.42,H)},M=(L,z,R,H=1.5)=>{for(let k of[-H/2,H/2])h(L+k,z,R,.055,.4,1.85,a);for(let k=0;k<5;k++)if(h(L,z,R+.08+k*.41,H,.4,.045,a),k<4)for(let q=0;q<4;q++)h(L-H*.35+q*H*.23,z,R+.125+k*.41,.22,.3,.27,q%2?c:u)},b=(L,z,R)=>{let H=Yh(n,L,z,R);n.regInteractable(H,"\u8EB2\u8FDB\u8863\u67DC",2.3,()=>{var k,q;return(q=(k=n.handlers).onHide)==null?void 0:q.call(k,H)})},U=(L,z,R,H,k,q,G)=>{n._baseboard(L+.115,R,H,k,q===L?[G]:[]),n._baseboard(z-.115,R,H,k,q===z?[G]:[]),n._baseboardX(R+.115,L,z,k),n._baseboardX(H-.115,L,z,k);for(let gt of[L+.15,z-.15])h(gt,(R+H)/2,k+2.27,.055,H-R,.07,t.darkWood)};n.room(-5,5,-9,-2,{h:2.7,s:!1,wallMat:t.concrete,floorMat:t.tile,gaps:{n:[[-.8,.8]]}}),n.wallZ(-2,-5,-1.7,0,2.7,t.concrete),n.wallZ(-2,1.7,5,0,2.7,t.concrete),d.doors.community=n.makeDoor({x:-.8,z:-9,along:"x",width:1.6,dir:1,mat:a,label:"\u516C\u5BD3\u5916\u95E8",locked:!0,lockedMsg:"\u793E\u533A\u95E8\u7981\u5931\u53BB\u4F9B\u7535\u3002\u5148\u6062\u590D\u5730\u4E0B\u5907\u7528\u7535\u6E90\u3002"}),v(-3.55,-6.55,0,2),S(-3.5,-5.45,0),m("invitation",-3.5,-6.55,.803,"\u4E00\u5C01\u6CA1\u6709\u7F72\u540D\u7684\u4FE1");for(let L=0;L<3;L++)for(let z=0;z<4;z++)h(-3.85+z*.55,-8.86,.95+L*.39,.49,.14,.34,a),h(-3.85+z*.55,-8.77,1.08+L*.39,.24,.012,.025,t.black);p(-3.25,-8.73,2.36,"\u56DE\u58F0\u516C\u5BD3",["\u591C\u9593\u53D7\u4ED8 / MAIL"],"n",1.65,!0),p(4.86,-5.2,1.5,"\u62C6\u9664\u544A\u793A",["\u4E03\u6708\u5341\u56DB\u65E5\u6E05\u573A","\u591C\u95F4\u51FA\u53E3\uFF1A\u4E8C\u697C\u5929\u4E95"],"w",1.8),h(3.2,-7.6,.38,2.7,.55,.09,t.darkWood,!0),h(3.2,-7.88,.49,2.7,.05,.7,t.darkWood);for(let L of[2.05,4.35])h(L,-7.6,0,.055,.45,.4,a);h(0,-8.1,.012,2.1,.75,.025,t.rug),p(.95,-2.12,1.65,"\u4F4F\u6237\u533A",["\u53A8\u623F / \u4E09\u53F7\u5BA4","\u697C\u68AF\u95F4\u5728\u8D70\u5ECA\u5C3D\u5934"],"s",.9,!0),x(0,-5.5,2.5,12688497,3),x(-3.4,-6.5,2.4,10337198,1.4),n._window(4.86,-7.3,1.5,"w",{w:1.5,h:1.4}),n.floor(0,67.25,10,11.1,0,t.concrete),n.wallX(-5,61.7,72.8,0,5.6,t.concrete),n.wallX(5,61.7,72.8,0,5.6,t.concrete),n.wallZ(72.8,-5,5,0,5.6,t.concrete);for(let L of[0,2.8])n.wallZ(61.7,-5,5,L,2.8,t.concrete,[[-1.7,1.7]]);yl(n,{roofOpenDepth:1.5}),ml(n,{x0:-5,x1:5,z0:61.7,z1:72.8,base:0,height:5.6,gapX:[-1.7,1.7]});for(let[L,z]of[0,2.8,5.6].entries()){if(p(1.8,61.84,z+1.65,["1F","2F","\u5C4B\u9876 R"][L],["\u4F4F\u6237\u533A / \u4F4F\u6237\u533A / \u667E\u6652\u573A".split(" / ")[L],"\u6CBF\u6276\u624B\u53EF\u539F\u8DEF\u8FD4\u56DE"],"n",1.1,!0),L<2)x(0,63.05,z+2.565,12625275,3.8,!1,{ceiling:z+2.6});else{for(let R of[-.4,.4])h(1.8+R,61.79,z,.045,.045,1.85,a);h(1.8,61.81,z+1.65-.344,1.1,.035,.688,a)}L<2&&n._window(-4.86,69.4,z+1.55,"e",{w:1.75,h:1.65}),n.monsterNodes.push({x:0,y:z,z:62.4})}x(0,67.5,3.965,10007210,2.8,!1,{ceiling:4}),x(4.865,67.4,5.05,10007210,3.6,!1,{wall:"east"}),n.floor(-6,67.25,4,11.1,5.6,t.concrete),n.floor(6,67.25,4,11.1,5.6,t.concrete),n.floor(0,62.95,8,2.5,5.6,t.concrete),n.floor(0,77.9,16,10.2,5.6,t.concrete),n.wallX(-8,61.7,83,5.6,1.12,t.concrete),n.wallX(8,61.7,83,5.6,1.12,t.concrete),n.wallZ(83,-8,8,5.6,1.12,t.concrete),n.wallZ(61.7,-8,8,5.6,1.12,t.concrete);for(let L of[-4.08,4.08]){h(L,67.75,5.6,.065,9.9,1.04,a,!0);for(let z=63.1;z<73;z+=.7)g(L,6.12,z,.025,1.04,a)}h(0,72.73,5.6,8.2,.07,1.04,a,!0);for(let L of[-2.95,2.95]){h(L,64.18,5.6,2.1,.07,1.12,a,!0);for(let z of[-.85,-.42,0,.42,.85])g(L+z,6.16,64.18,.022,1.12,a)}for(let L of[-3.05,3.05])for(let z of[75,81])g(L,6.8,z,.045,2.4,a);for(let L of[-3.05,3.05])g(L,7.98,78,.038,6,a,"z");for(let L=0;L<5;L++){let z=h(-2.4+L*1.15,78.5,6.35,.75,.035,1.55,L%2?t.quilt:t.pale);z.rotation.y=L*.2-.4}let E=h(.4,81.55,5.99,2.2,.52,.07,t.darkWood,!0);for(let L of[-.5,1.3])h(L,81.55,5.6,.05,.45,.4,a);m(10,.4,81.55,6.08,"\u6BCD\u4EB2\u7559\u4E0B\u7684\u4FBF\u6761"),x(-5.4,74.2,7.25,8563125,2.3,!1,{pole:5.6}),x(5.4,81,7.3,9680573,2.3,!1,{pole:5.6}),n._battery(5.8,75.5,5.65);for(let[L,z,R,H]of[[-18,78,12,18],[20,84,13,23],[0,102,22,15]]){h(L,z,-4,R,9,H,t.concrete);for(let k=0;k<5;k++)for(let q=0;q<4;q++)h(L-R/2+1.5+q*(R-3)/3,z-4.55,.5+k*2.5,1,.04,1.5,Se({color:s()<.15?9403733:1517352}))}n.room(1.9,31,42,46,{w:!1,wallMat:t.plaster,floorMat:t.tile,gaps:{n:[[9,10.5],[23,24.5]],s:[[10,11.5]]}}),n.room(7,17.5,32,42,{s:!1,wallMat:t.concrete,floorMat:t.tile}),n.room(19,31,32,42,{s:!1,wallMat:t.concrete,floorMat:t.concrete}),n.room(7,18.5,46,56,{n:!1,wallMat:t.wallpaper,floorMat:t.woodFloor}),n.makeDoor({x:9,z:42,along:"x",width:1.5,dir:1,label:"\u516C\u5171\u6D17\u8863\u623F"}),d.doors.workshop=n.makeDoor({x:23,z:42,along:"x",width:1.5,dir:1,label:"\u7BA1\u7406\u5458\u7EF4\u4FEE\u5BA4",mat:a,locked:!0,lockedMsg:"\u7EF4\u4FEE\u5BA4\u78C1\u9501\u6CA1\u6709\u7535\u3002\u5148\u63A5\u901A\u5730\u4E0B\u5907\u7528\u7535\u6E90\u3002"}),n.makeDoor({x:10,z:46,along:"x",width:1.5,dir:-1,label:"104 \u7A7A\u5C4B"}),p(1.77,42.2,1.7,"\u4E1C\u7FFC",["\u6D17\u8863\u623F / 104","\u7BA1\u7406\u5458\u7EF4\u4FEE\u5BA4"],"w",.75,!0),p(9.75,42.13,1.6,"\u6D17\u8863\u623F",[],"n",.65,!0),p(23.75,42.13,1.6,"\u7EF4\u4FEE\u5BA4",[],"n",.65,!0),p(10.75,45.87,1.6,"104",[],"s",.46,!0);for(let L of[5.5,13,21,28])x(L,44,2.5,9942951,2.6,L>12);for(let L of[8.4,10.3,12.2,14.1]){h(L,33.1,0,1.05,.8,1.15,e.enamel,!0),h(L,33.1,1.15,1.08,.84,.035,e.enamel),h(L,33.515,.91,.93,.03,.17,e.paint),f(new ti(.319,.024,12,32),e.iron,L,.58,33.61),f(new ti(.283,.026,10,32),e.rubber,L,.58,33.595),g(L,.58,33.53,.24,.12,e.iron,"z"),f(new ti(.205,.011,8,28),e.iron,L,.58,33.594);let z=new Zr(new Bi(.008,6),e.rubber,24);for(let H=0;H<24;H++){let k=H/12*Math.PI*2,q=H<12?.17:.215;z.setMatrixAt(H,new ce().makeTranslation(L+Math.cos(k)*q,.58+Math.sin(k)*q,33.596))}i.add(z);let R=e.darkGlass.clone();R.transparent=!0,R.opacity=.4,R.depthWrite=!1,f(new Bi(.253,32),R,L,.58,33.615),h(L-.3,33.59,.49,.08,.05,.18,e.iron),h(L+.3,33.63,.48,.045,.05,.2,e.enamel);for(let H of[-.31,.2])g(L+H,1,33.556,.037,.04,e.rubber,"z"),h(L+H,33.58,1,.006,.005,.026,e.enamel);for(let H=0;H<3;H++)h(L-.08+H*.09,33.55,.96,.055,.016,.024,e.iron);h(L,33.55,.18,.9,.012,.018,e.iron);for(let H of[-.38,.38])g(L+H,.055,33.2,.045,.11,e.rubber);g(L,1.28,32.55,.038,.35,t.rust,"z")}M(15.8,40.8,0,1.5),h(9.8,39.6,.38,2.6,.75,.08,t.darkWood,!0);for(let L of[8.7,10.9])h(L,39.6,0,.06,.65,.38,a);for(let L=0;L<4;L++)h(9.1+L*.43,39.6,.46+L*.01,.35,.5,.035,t.quilt);x(12,36.7,2.5,9680561,3.1,!0),n._window(17.36,36.5,1.45,"w",{w:1.6,h:1.3}),m(11,10.1,39.6,.66,"\u6D17\u8863\u623F\u7684\u7559\u8A00"),v(25.4,33.8,0,3.4),h(25.4,32.14,1.18,4.7,.035,1.1,t.darkWood);for(let L=0;L<7;L++){let z=g(23.5+L*.59,1.65,32.23,.021,.45,a);z.rotation.z=L*.09-.2,h(23.5+L*.59,32.23,1.88,.14,.035,.055,o)}M(30.15,36.8,0,1.25),M(29,40.8,0,2.1),b(20.25,40.8,0),h(20.5,34,0,1.1,1.25,1.4,a,!0),g(20.5,1.47,34,.32,.13,o),m(9,26.2,33.8,.803,"\u672A\u5B8C\u6210\u7684\u7EF4\u4FEE\u5DE5\u5355");let T=new Ot;T.position.set(24.2,.9,33.8);let C=new K(new ti(.25,.035,8,18),l);C.rotation.x=-Math.PI/2,T.add(C);for(let L of[0,Math.PI/2]){let z=new K(new jt(.48,.036,.036),l);z.rotation.y=L,T.add(z)}i.add(T),y("valveHandle",T,"\u53D6\u8D70\u6392\u6C34\u9600\u624B\u8F6E"),x(25.4,35.6,2.5,12623979,3,!0),n._battery(27.8,38.2,.05),h(15.8,52.2,0,1.85,2.7,.3,t.darkWood,!0),h(15.8,52.2,.3,1.7,2.5,.13,t.quilt),v(9,54.7,0,1.65),S(9,53.7,0),h(9.2,54.7,.81,.32,.23,.07,t.black),m(12,8.5,54.7,.803,"104 \u4F4F\u6237\u65E5\u8BB0"),b(17.2,47.2,0),h(12.3,50.3,.015,3,3.7,.018,t.rug),x(12,50,2.5,12689013,2.8,!0),n._window(18.36,50.5,1.45,"w",{w:1.8,h:1.35}),n._battery(8.7,48.4,.05);for(let[L,z]of[[5,44],[12,44],[21,44],[28.5,44],[11,36.5],[24,37],[12,49]])n.monsterNodes.push({x:L,y:0,z});n.wallX(1.7,16,25,-2.8,2.8,t.concrete),n.wallZ(16,1.7,11.8,-2.8,5.5,t.concrete),n.wallZ(25,1.7,11.8,-2.8,5.5,t.concrete),n.ceil(6.75,20.5,10.1,9,2.7,t.concrete),n.floor(6.75,20.5,10.1,9,-2.8,t.concrete),yl(n,{x:4.6,z:20.5,base:-2.8,storeys:1,frontDepth:2.9,rotation:Math.PI/2}),ml(n,{x0:1.7,x1:11.8,z0:16,z1:25,base:-2.8,height:5.5,leftDoor:{y:0,gap:[19.8,21.2]}}),d.doors.service=n.makeDoor({x:1.7,z:19.8,width:1.4,dir:1,offset:-.11,mat:a,label:"\u5730\u4E0B\u7EF4\u4FEE\u95E8",locked:!0,lockedMsg:"\u7EF4\u4FEE\u95E8\u9501\u7740\u3002\u5927\u5385\u503C\u73ED\u53F0\u4E0A\u6709\u4E00\u5C01\u4FE1\u3002"}),p(1.58,19.35,1.62,"\u5730\u4E0B\u7EF4\u4FEE",["\u914D\u7535 / \u6392\u6C34","\u975E\u4F4F\u6237\u8BF7\u52FF\u8FDB\u5165"],"w",.6,!0),x(3.6,20.5,2.45,13081192,1.6),x(7.8,24.865,-.4,10269602,2.8,!1,{wall:"south"}),p(3.9,16.13,1.4,"B1",["\u6CBF\u697C\u68AF\u4E0B\u697C","\u539F\u8DEF\u53EF\u8FD4\u56DE\u4E00\u697C"],"n",.95,!0),n.room(11.8,24,14,29,{y:-2.8,h:2.8,wallMat:t.concrete,floorMat:t.concrete,gaps:{w:[[19.4,21.6]],s:[[15.8,17.4]]}}),n.floor(11.6,20.5,.5,3,-2.8,t.concrete),n.wallX(20,14,29,-2.8,2.8,t.concrete,[[21,22.5]]),d.doors.pump=n.makeDoor({x:20,z:21,width:1.5,y:-2.8,mat:a,dir:1,label:"\u6392\u6C34\u95F4\u94C1\u95E8",locked:!0,lockedMsg:"\u94C1\u95E8\u4E0A\u7F20\u7740\u9508\u94FE\u3002\u5148\u542C\u5B8C\u90A3\u76D8\u5F55\u97F3\u3002"}),p(19.88,20.5,-1.2,"\u6392\u6C34\u95F4",["\u95E8\u5185\u7981\u6B62\u901A\u884C"],"w",.56,!0);for(let L of[13.5,16.5,19]){g(L,-.34,21.5,.07,14.4,t.rust,"z");for(let z of[15.5,20,26.5])g(L,-.33,z,.09,.06,a,"z")}M(14.8,27.7,-2.8,2.3),h(18.3,27.9,-2.8,1.3,.85,.9,a,!0),g(18.3,-1.66,27.9,.34,.6,t.rust),b(12.75,27.8,-2.8);let F=h(17.1,14.36,-2.35,2.05,.35,1.5,a,!0);h(17.1,14.57,-2.25,1.9,.045,1.28,t.darkMetal);let et=["\u8D70\u5ECA","\u4F4F\u6237","\u6392\u6C34"];for(let L=0;L<3;L++)h(16.45+L*.65,14.63,-1.72,.3,.08,.16,o),p(16.45+L*.65,14.64,-1.35,et[L],[],"n",.4,!0);n.regInteractable(F,"\u66F4\u6362\u7194\u65AD\u5668 / \u5408\u4E0A\u5907\u7528\u7535\u6E90",2.5,()=>{var L,z;return(z=(L=n.handlers).onPuzzle)==null?void 0:z.call(L,"power")}),p(15.1,14.13,-1.33,"\u68C0\u4FEE\u5361",["\u5148\u6392\u6C34 \xB7 \u540E\u8D70\u5ECA","\u6700\u540E\u4F4F\u6237\u7535\u6E90"],"n",1);let D=p(14,14.13,-1.35,"\u505C\u7535\u68C0\u4FEE",["\u5408\u95F8\u524D\u66F4\u6362\u7194\u65AD\u5668"],"n",.65);n.regInteractable(D,"\u9605\u8BFB\u65AD\u7535\u68C0\u4FEE\u5361",2.5,()=>{var L,z;return(z=(L=n.handlers).onDocument)==null?void 0:z.call(L,4)});for(let[L,z]of[[13.3,17],[18,23.5],[22,18],[22,26]]){x(L,z,-.3,9155749,2.8,!0);let R=f(new Bi(.7+s(),18),nt({color:1911848,transparent:!0,opacity:.48,roughness:.26}),L+.5,-2.775,z+1);R.rotation.x=-Math.PI/2}x(13,20.5,-.3,11691078,1.25);let O=g(22.6,-1.7,16.3,.7,2.05,a);i.add(O),n.colliders.push(Ye(22.6,-1.7,16.3,1.4,2.05,1.4));for(let L of[-2.55,-.85])g(22.6,L,16.3,.73,.07,t.rust);for(let L of[21.1,22.15,23.2]){g(L,-1.25,28.2,.075,2.4,t.rust);let z=new Ot;z.position.set(L,-1.48,28),n.props.campaignDynamic.add(z),f(new ti(.22,.028,8,14),l,0,0,0,z);let R=g(L,-1.48,28,.04,.12,o,"z");for(let H of[0,Math.PI/2]){let k=f(new jt(.43,.028,.028),l,0,0,0,z);k.rotation.z=H}d.valves.push(z),n.regInteractable(R,"\u6392\u6C34\u9600\u7EC4",2.6,()=>{var H,k;return(k=(H=n.handlers).onPuzzle)==null?void 0:k.call(H,"valves")})}p(22.2,28.86,-.9,"\u6C34\u95F8\u64CD\u4F5C",["\u6CC4\u538B / \u56DE\u6C34 / \u6392\u6C34"],"s",1.75,!0),h(22.3,23.8,-2.8,2.1,1.7,.1,t.darkMetal);for(let L=0;L<12;L++)h(21.3+L*.18,23.8,-2.67,.025,1.7,.035,a);n._battery(13.8,24.5,-2.75);let Y=(L,z,R,H,k,q)=>{n.room(L,z,R,H,{y:2.8,h:2.4,wallMat:t.wallpaper,floorMat:t.woodFloor,[q]:!1}),U(L,z,R,H,2.8,q==="w"?L:z,k)};Y(-8.4,-1,16,27,[20,21.4],"e"),Y(1,10,40,54,[46,47.4],"w"),Y(-10,-1,36,48,[40,41.4],"e"),d.doors.office=n.makeDoor({x:-1,z:20,y:2.8,width:1.4,dir:-1,offset:.11,label:"201 \u7BA1\u7406\u5BA4",locked:!0,lockedMsg:"\u78C1\u9501\u6CA1\u6709\u7535\u3002\u9700\u8981\u6062\u590D\u5730\u4E0B\u5907\u7528\u7535\u6E90\u3002"}),d.doors.resident=n.makeDoor({x:1,z:46,y:2.8,width:1.4,dir:1,offset:-.11,label:"202 \u7559\u5B88\u4F4F\u6237",locked:!0,lockedMsg:"\u78C1\u9501\u6CA1\u6709\u7535\u3002\u9700\u8981\u6062\u590D\u5730\u4E0B\u5907\u7528\u7535\u6E90\u3002"}),d.doors.archive=n.makeDoor({x:-1,z:40,y:2.8,width:1.4,dir:-1,offset:.11,label:"203 \u653E\u6620\u5BA4",locked:!0,lockedMsg:"\u94A5\u5319\u4FDD\u5B58\u5728 201 \u7BA1\u7406\u5BA4\u7684\u6863\u6848\u67DC\u91CC\u3002"});for(let[L,z,R,H]of[[-.87,19.5,"201","e"],[.87,45.5,"202","w"],[-.87,39.5,"203","e"]])p(L,z,4.4,R,[],H,.46,!0);v(-5.8,18.5,2.8,2.6),S(-5.8,19.6,2.8),h(-6.5,18.5,3.59,.52,.38,.11,t.darkMetal);for(let L=0;L<3;L++)for(let z=0;z<8;z++)h(-6.72+z*.062,18.43+L*.08,3.7,.038,.04,.025,a);g(-6.5,3.83,18.68,.055,.5,t.black,"x"),m(8,-5.15,18.5,3.598,"\u4E8C\u697C\u4F4F\u6237\u7684\u76EE\u51FB\u8BB0\u5F55");let rt=h(-7.65,23.7,2.8,1.1,.75,1.4,a,!0);h(-7.65,23.3,2.92,.94,.045,1.16,t.darkMetal);for(let L=0;L<4;L++)for(let z=0;z<3;z++)h(-7.73+z*.08,23.26,3.5+L*.08,.048,.028,.048,o);n.regInteractable(rt,"\u6863\u6848\u67DC\u5BC6\u7801\u9501",2.6,()=>{var L,z;return(z=(L=n.handlers).onPuzzle)==null?void 0:z.call(L,"cabinet")});let it=f(new Bi(.3,24),nt({map:n.tex.clock,roughness:.8}),-3.6,4.42,16.13);f(new ti(.31,.023,8,24),a,-3.6,4.42,16.12),M(-4.2,26.4,2.8,2.5),b(-2.5,25.9,2.8),p(-8.26,20.3,4.2,"\u62C6\u9664\u901A\u77E5",["\u6240\u6709\u5931\u7269\u8BF7\u5728","\u4E03\u6708\u5341\u56DB\u65E5\u524D\u8BA4\u9886"],"e",1.4),x(-5.2,21,5.02,13086597,2.8,!0),x(-3,25,5.02,9614245,2,!0),n._window(-8.26,24.5,4.3,"e",{w:1.4,h:1.2}),n._battery(-4,20,2.85),h(7.7,43,2.8,2,3.1,.28,t.darkWood,!0),h(7.7,43,3.08,1.9,3,.18,t.quilt),h(7.7,41.95,3.26,1.2,.5,.11,t.pale),h(7.7,44,3.27,1.9,1,.07,c),v(4.1,51.8,2.8,2),S(4.1,50.6,2.8);let Z=new Ot,st=new K(new jt(.28,.05,.18),a);Z.add(st);for(let L of[-.068,.068]){let z=new K(new St(.038,.038,.012,12),t.black);z.position.set(L,.032,0),Z.add(z)}Z.position.set(4.1,3.64,51.8),i.add(Z),y("tape",Z,"\u4E03\u6708\u5341\u56DB\u65E5\u7684\u5F55\u97F3\u5E26"),b(8.4,52.9,2.8);for(let L=0;L<5;L++)h(2.2+L*.65,42,2.8,.48,.4,.36,u),h(2.2+L*.65,42,3.16,.5,.43,.025,t.darkWood);n._window(9.86,48.2,4.3,"w",{w:1.7,h:1.1}),x(5.2,47.5,5.02,10139323,2.5,!0),n._battery(6.5,50.2,2.85),v(-6.5,43.8,2.8,2);let ht=h(-6.5,43.8,3.59,.68,.42,.15,a);for(let L of[-.15,.15])g(-6.5+L,3.76,43.8,.11,.025,t.black);for(let L=0;L<4;L++)h(-6.73+L*.13,43.56,3.62,.075,.04,.025,o);n.regInteractable(ht,"\u64AD\u653E\u4E03\u6708\u5341\u56DB\u65E5\u7684\u5F55\u97F3\u5E26",2.8,()=>{var L,z;return(z=(L=n.handlers).onPuzzle)==null?void 0:z.call(L,"tape")}),m(6,-7.15,43.75,3.599,"\u672A\u5BC4\u51FA\u7684\u8BA4\u9886\u4E66"),M(-8.8,47.3,2.8,1.7);let tt=p(-9.86,40.1,4.15,"\u4E09\u53F7\u5BA4",["7\u670814\u65E5","\u82CD\u592A / \u4E03\u5C81"],"e",3.4);d.screen=tt;let B=h(-3.4,40.1,3.5,.5,.7,.35,a);g(-3.8,3.66,40.1,.105,.26,t.black,"x");for(let L of[39.8,40.5]){let z=f(new ti(.21,.025,8,16),a,-3.4,4.06,L);z.rotation.y=Math.PI/2}n.regInteractable(B,"\u68C0\u67E5\u505C\u6B62\u7684\u653E\u6620\u673A",2.4,()=>{var L,z;return(z=(L=n.handlers).onDocument)==null?void 0:z.call(L,6)});for(let L of[-4.6,-6.2])for(let z of[37.4,38.9])S(L,z,2.8,c);x(-6,41,5.02,11839366,1.9,!0),x(-8,45.5,5.02,7706512,1.7,!0),n.floor(5.75,30.75,9.5,4.5,2.8,t.concrete);for(let L of[28.5,33])h(5.8,L,2.8,9.5,.14,.9,t.concrete,!0),g(5.8,3.84,L,.045,9.6,a,"x");h(10.5,30.75,2.8,.14,4.5,.9,t.concrete,!0),g(10.5,3.85,30.75,.045,4.5,a,"z");for(let L of[3,5.5,8,10.5])for(let z of[28.5,33])g(L,3.37,z,.024,1.1,a);p(9.8,32.86,3.6,"\u907F\u96E3\u7D4C\u8DEF",["\u51FA\u53E3 \u2192"],"s",.7,!0);for(let[L,z,R,H]of[[28,40,8,14],[25,57,12,17],[37,25,10,20]]){h(L,z,-5,R,10,H,t.concrete);for(let k=0;k<5;k++)for(let q=0;q<4;q++)s()<.28||h(L-R/2+1+q*(R-2)/3,z-5.04,-2+k*2.5,.8,.035,1.1,Se({color:s()<.15?8483150:1384482}))}let ot=new we,ft=new Float32Array(1080);for(let L=0;L<180;L++){let z=L>=90,R=z?-8+s()*16:1.4+s()*11,H=(z?6:3)+s()*9,k=(z?62:27)+s()*(z?22:8);ft.set([R,H,k,R-.035,H-.35,k],L*6)}ot.setAttribute("position",new Ce(ft,3));let mt=new Jr(ot,new Ps({color:10204862,transparent:!0,opacity:.22}));n.props.campaignDynamic.add(mt),d.rain=mt,h(-3.2,1.4,0,1.2,.7,.73,t.darkWood,!0);let vt=new Ot,Ut=new K(new St(.034,.034,.21,10),t.pale);Ut.rotation.z=Math.PI/2,vt.add(Ut);for(let L of[-.1,.1]){let z=new K(new St(.036,.036,.035,10),o);z.rotation.z=Math.PI/2,z.position.x=L,vt.add(z)}vt.position.set(-3.2,.78,1.4),i.add(vt),y("fuse",vt,"\u5907\u7528\u7194\u65AD\u5668"),p(-3.2,.13,1.35,"\u5907\u7528\u5DE5\u5177",["\u7194\u65AD\u5668 / \u914D\u7535\u95F4"],"n",.75);let Ft=h(6.75,11.4,.48,.5,.38,.25,t.darkWood);h(6.75,11.4,.73,.52,.4,.035,o);for(let L=0;L<4;L++)h(6.6+L*.1,11.34,.77,.045,.15,.025,o);n.regInteractable(Ft,"\u4FEE\u590D\u516B\u97F3\u76D2",2.7,()=>{var L,z;return(z=(L=n.handlers).onPuzzle)==null?void 0:z.call(L,"music")}),b(3,14.7,0),d.musicBox=Ft,eu(n,{box:h,mesh:f,cylinder:g,sign:p,lamp:x,desk:v,chair:S,shelf:M,closet:b,recordDocument:m,pickup:y}),tu(n,{box:h,mesh:f,cylinder:g,sign:p,lamp:x,desk:v,chair:S,shelf:M,closet:b,recordDocument:m,pickup:y}),iu(n,{box:h,mesh:f,cylinder:g,sign:p,lamp:x,desk:v,chair:S,shelf:M,closet:b,recordDocument:m,pickup:y});for(let[L,z,R,H]of[[-1.58,17,1.2,"e"],[1.58,26.2,1.25,"w"],[-8.25,17.5,4,"e"],[11.93,16.7,-1.4,"e"]])n.decalWall(L,z,R,1.1,1.8,n.tex.rust,H);p(-1.58,15.7,1.7,"\u5929\u4E95\u51FA\u53E3",["\u7531\u697C\u68AF\u524D\u5F80\u4E8C\u697C","\u505C\u7535\u65F6\u7981\u6B62\u901A\u884C"],"e",.8,!0),p(.86,29.5,4.5,"\u5929\u4E95",[],"w",.43,!0),n.exitDoor.label="\u5929\u4E95\u9632\u706B\u95E8",n.exitDoor.slab.userData.interactable.label="\u5929\u4E95\u9632\u706B\u95E8",n.exitDoor.lockedMsg="\u95E8\u88AB\u6C34\u538B\u5B89\u5168\u9501\u5C01\u4F4F\u4E86\u3002\u5148\u89E3\u9664\u5730\u4E0B\u6C34\u95F8\u3002";for(let[L,z,R]of[[13.3,20.5,-2.8],[17.5,18,-2.8],[18,24.5,-2.8],[21.7,21.8,-2.8],[22.3,26,-2.8],[-3,21.5,2.8],[-5.5,23,2.8],[3,47,2.8],[5,49.5,2.8],[-3,42,2.8],[-7,45.7,2.8]])n.monsterNodes.push({x:L,y:R,z})}function wl(n,t){let e=n.campaign;n.props.clock&&(n.props.clock.mysterySolved=!!t.flags.cabinet),e.valves[2].visible=!!t.flags.released,e.doors.community.locked=!t.flags.power,e.communityBeacon.light.intensity=t.flags.relay?e.communityBeacon.base:0,e.communityBeacon.bulb.material.color.setHex(t.flags.relay?10472612:2634543),e.communityPlaque.material.color.setHex(t.flags.relay?5601118:2634543),e.doors.service.locked=!t.flags.invitation,e.doors.office.locked=!t.flags.power,e.doors.resident.locked=!t.flags.power,e.doors.archive.locked=!t.flags.cabinet,e.doors.pump.locked=!t.flags.memory,e.doors.workshop.locked=!t.flags.power,e.doors.west.locked=!t.flags.memory,e.doors.annex.locked=!t.flags.photo;for(let[i,s]of[[e.generatorLamp,t.flags.generator],[e.radioLamp,t.flags.relay]])i.light.intensity=s?i.base:0,i.bulb.material.color.setHex(s?10997406:2438698);e.photo.visible=!!t.flags.photo,n.exitDoor.locked=!t.flags.released;for(let[i,s]of Object.entries(e.pickups)){let r=t.items.has(i)||i==="fuse"&&t.flags.power||i==="relayFuse"&&t.flags.generator||i==="valveHandle"&&t.flags.released||["film","developer"].includes(i)&&t.flags.photo;s.mesh.visible=!r,s.interactable.disabled=r}for(let i of e.lamps)i.powered&&(i.light.intensity=t.flags.power?i.base:0,i.bulb.material.color.setHex(t.flags.power?12371891:2698537))}var tn=.2,Te=2.7,su=2.05,z1=1.16,Mo=class{constructor(t,e={}){this.scene=t,this.handlers=e,this.tex=Kh(),this.rng=Lt(20260814),this.stairs=[],this.colliders=[],this.doors=[],this.interactables=[],this.triggers=[],this.fluorescents=[],this.candles=[],this.tvLight=null,this.windowLights=[],this.ceilings=[],this.notePickups=[],this.props={},this.monsterNodes=[],this.ghostSpawns=[],this.ofudas=[],this.playerStart=new I(0,0,-6.4),this.materials=this._makeMaterials(),this._build(),this._buildDoors(),this._buildProps(),this._buildDecals(),this._buildLights(),nu(this),this._buildNodes(),this._initPerf()}_initPerf(){this._cullable=[];let t=new Set;for(let e of this.fluorescents)(e.mode==="dead"||e.base===0)&&t.add(e.light);this.scene.traverse(e=>{if(e.isPointLight){if(t.has(e)){e.visible=!1;return}this._cullable.push(e)}}),this.lightBudget=Math.min(14,this._cullable.length),this._budgetT=-1,this._viewDir=new I(0,0,1),this._lastCam={x:this.playerStart.x,y:this.playerStart.y,z:this.playerStart.z},this._freezeStaticMatrices(),this._applyLightBudget(this._lastCam.x,this._lastCam.y,this._lastCam.z)}_freezeStaticMatrices(){var s,r;let t=new Set,e=a=>{a&&a.traverse(o=>t.add(o))};for(let a of this.doors)e(a.pivot);let i=this.props;e((s=i.cabinet)==null?void 0:s.pivot),e((r=i.doll)==null?void 0:r.mesh),e(i.mobile),e(i.furin),e(i.campaignDynamic);for(let a of i.ropes||[])t.add(a);for(let a of this.ofudas)t.add(a);for(let a of i.batteries||[])t.add(a.halo);this.scene.traverse(a=>{t.has(a)||a.isLight||a.isCamera||(a.matrixAutoUpdate=!1,a.updateMatrix())})}registerLight(t){!t||!t.isPointLight||this._cullable.includes(t)||(this._cullable.push(t),t.visible=!1,this._applyLightBudgetNow())}unregisterLight(t){let e=this._cullable.indexOf(t);e>=0&&this._cullable.splice(e,1),t.visible=!1,this._applyLightBudgetNow()}_applyLightBudgetNow(){let t=this._lastCam;this._applyLightBudget(t.x,t.y,t.z)}_applyLightBudget(t,e,i){this._lastCam.x=t,this._lastCam.y=e,this._lastCam.z=i;let s=this.lightBudget,r=this._cullable,a=r.length;if(a<=s){for(let d=0;d<a;d++)r[d].visible=!0;return}let o=this._viewDir.x,l=this._viewDir.z,c=Math.hypot(o,l)||1,u=this._scored||(this._scored=new Array(a));for(let d=0;d<a;d++){let h=r[d],f=h.position.x-t,g=h.position.y-e,_=h.position.z-i,p=f*f+_*_+g*g*.6,m=Math.sqrt(f*f+_*_)||1,y=(f*o+_*l)/(m*c);y>.3?p*=.4:y<-.4&&p>49&&(p*=3),h.intensity<=.001&&(p+=1e7),h.visible&&(p*=.75),u[d]?(u[d].l=h,u[d].s=p):u[d]={l:h,s:p}}u.length=a,u.sort((d,h)=>d.s-h.s);for(let d=0;d<s;d++)u[d].l.visible=!0;for(let d=s;d<a;d++)u[d].l.visible=!1}_makeMaterials(){let t=this.tex;return{plaster:nt({map:t.plaster,vertexColors:!0}),wallpaper:nt({map:t.wallpaper,vertexColors:!0}),woodWall:nt({map:t.woodWall,vertexColors:!0}),woodDoor:nt({map:t.woodDoor,roughness:.8}),woodFloor:nt({map:t.woodFloor,vertexColors:!0,roughness:.72,metalness:.04}),tatami:nt({map:t.tatami,vertexColors:!0,roughness:.85}),ceiling:nt({map:t.ceiling,vertexColors:!0,roughness:1}),concrete:nt({map:t.concrete,vertexColors:!0}),rust:nt({map:t.rust,roughness:.68,metalness:.12}),fusuma:nt({map:t.fusuma,roughness:.9}),quilt:nt({map:t.quilt,roughness:.95}),brick:nt({map:t.brick,vertexColors:!0}),darkMetal:nt({color:1382428,roughness:.45,metalness:.3}),black:nt({color:724240,roughness:.9}),pale:nt({color:14077888,roughness:.85}),darkWood:nt({color:3811868,roughness:.75}),waterDark:nt({color:858644,roughness:.15,metalness:.25}),moonWin:Se({map:t.windowMoon}),tvScreen:Se({map:t.tvStatic}),exitSign:Se({map:t.exitSign}),ofuda:nt({map:t.ofuda,side:ae}),photo:nt({map:t.photo,roughness:.85}),porcelain:nt({color:12896448,roughness:.45}),clothRed:nt({color:7219746,roughness:.95}),whiteMetal:nt({color:10133668,roughness:.68,metalness:.08}),tile:nt({map:t.tile,vertexColors:!0,roughness:.72}),mailbox:nt({map:t.mailbox,roughness:.6,metalness:.3})}}box(t,e,i,s,r,a,o,l={}){var d,h,f;let c=(d=l.geo)!=null&&d.bevel?ji(s,a,r):Re(s,a,r,l.geo||{}),u=new K(c,l.material||o);if(u.position.set(t,i+a/2,e),u.castShadow=(h=l.cast)!=null?h:!0,u.receiveShadow=(f=l.receive)!=null?f:!0,this.scene.add(u),l.collide!==!1){let g=Ye(t,i+a/2,e,s,a,r);this.colliders.push(g),u.userData.collider=g}return u}wallX(t,e,i,s,r,a,o=[],l={}){var d,h;let c=[],u=e;for(let[f,g]of[...o].sort((_,p)=>_[0]-p[0]))f>u&&c.push([u,f]),u=Math.max(u,g);u<i&&c.push([u,i]);for(let[f,g]of c){let _=g-f;this.box(t,(f+g)/2,s,tn,_,r,a,{geo:{uv:[_/2.6,r/2.6],ao:"wall",aoStrength:(d=l.ao)!=null?d:.85,jitter:.012},collide:(h=l.collide)!=null?h:!0})}}wallZ(t,e,i,s,r,a,o=[],l={}){var d,h;let c=[],u=e;for(let[f,g]of[...o].sort((_,p)=>_[0]-p[0]))f>u&&c.push([u,f]),u=Math.max(u,g);u<i&&c.push([u,i]);for(let[f,g]of c){let _=g-f;this.box((f+g)/2,t,s,_,tn,r,a,{geo:{uv:[_/2.6,r/2.6],ao:"wall",aoStrength:(d=l.ao)!=null?d:.85,jitter:.012},collide:(h=l.collide)!=null?h:!0})}}floor(t,e,i,s,r,a,o){let l=this.box(t,e,r-.12,i,s,.12,a,{geo:{uv:o||[i/3,s/3],ao:"floor",aoStrength:.9}});return l.userData.collider.walkable=!0,l}ceil(t,e,i,s,r,a){let o=this.box(t,e,r,i,s,.12,a,{geo:{uv:[i/3,s/3],ao:"ceil",aoStrength:.95},cast:!1,collide:!0});return this.ceilings.push({x0:t-i/2,x1:t+i/2,z0:e-s/2,z1:e+s/2,y:r}),o}room(t,e,i,s,r={}){var u,d,h,f,g,_;let a=this.materials,o=(u=r.h)!=null?u:Te,l=(d=r.y)!=null?d:0;this.floor((t+e)/2,(i+s)/2,e-t+.2,s-i+.2,l,r.floorMat||a.woodFloor,r.floorUV),this.ceil((t+e)/2,(i+s)/2,e-t+.2,s-i+.2,l+o,r.ceilMat||a.ceiling);let c=r.wallMat||a.plaster;r.walls!==!1&&(r.n!==!1&&this.wallZ(i,t,e,l,o,c,((h=r.gaps)==null?void 0:h.n)||[],{ao:r.ao}),r.s!==!1&&this.wallZ(s,t,e,l,o,c,((f=r.gaps)==null?void 0:f.s)||[],{ao:r.ao}),r.w!==!1&&this.wallX(t,i,s,l,o,c,((g=r.gaps)==null?void 0:g.w)||[],{ao:r.ao}),r.e!==!1&&this.wallX(e,i,s,l,o,c,((_=r.gaps)==null?void 0:_.e)||[],{ao:r.ao}))}decalFloor(t,e,i,s,r,a=0,o=.012,l=!0){let c=new ie(i,s);c.rotateX(-Math.PI/2);let u=l?nt({map:r,transparent:!0,depthWrite:!1,roughness:.92}):Se({map:r,transparent:!0,depthWrite:!1});u.polygonOffset=!0,u.polygonOffsetFactor=-3,u.polygonOffsetUnits=-3;let d=new K(c,u);return d.position.set(t,o,e),d.rotation.y=a,d.renderOrder=2,d.receiveShadow=!1,this.scene.add(d),d}decalWall(t,e,i,s,r,a,o,l=0,c=!0){let u=new ie(s,r),d=c?nt({map:a,transparent:!0,depthWrite:!1,roughness:.92}):Se({map:a,transparent:!0,depthWrite:!1});d.polygonOffset=!0,d.polygonOffsetFactor=-3,d.polygonOffsetUnits=-3;let h=new K(u,d),f=.015;return o==="n"&&h.position.set(t,i,e-f),o==="s"&&(h.position.set(t,i,e+f),h.rotation.y=Math.PI),o==="e"&&(h.position.set(t+f,i,e),h.rotation.y=Math.PI/2),o==="w"&&(h.position.set(t-f,i,e),h.rotation.y=-Math.PI/2),l&&h.rotateY(l),h.renderOrder=2,h.receiveShadow=!1,this.scene.add(h),h}_build(){let t=this.materials;this.wallX(-1.7,0,8,0,Te,t.plaster,[[3.2,4.4]]),this.wallX(-1.7,8,20,0,Te,t.plaster,[[10,11.2]]),this.wallX(-1.85,20,24,0,Te,t.plaster,[]),this.wallX(-1.7,24,32,0,Te,t.plaster,[]),this.wallX(-1.9,32,58,0,Te,t.plaster,[[48.6,49.8]]),this.wallX(1.7,0,32,0,Te,t.plaster,[[3,4.2],[10,11.2],[19.8,21.2]]),this.wallX(1.9,32,58,0,Te,t.plaster,[[43,45]]),this.wallZ(20,-1.85,-1.7,0,Te,t.plaster),this.wallZ(24,-1.85,-1.7,0,Te,t.plaster),this.wallZ(32,-1.9,-1.7,0,Te,t.plaster),this.wallZ(32,1.7,1.9,0,Te,t.plaster),this.wallZ(58,-1.9,-1.7,0,Te,t.plaster),this.wallZ(58,1.7,1.9,0,Te,t.plaster),this.wallX(-1.7,58,61.7,0,Te,t.plaster),this.wallX(1.7,58,61.7,0,Te,t.plaster),this.floor(0,-1,3.4,2,0,t.concrete),this.floor(0,12,3.6,24,0,t.woodFloor),this.floor(0,28,3.4,8,0,t.woodFloor),this.floor(0,45,3.8,26,0,t.woodFloor),this.floor(0,59.85,3.4,3.7,0,t.concrete),this.ceil(0,12,3.6,24,2.7,t.ceiling),this.ceil(0,28,3.4,8,2.7,t.ceiling),this.ceil(0,45,3.8,26,2.7,t.ceiling),this.ceil(0,59.85,3.4,3.7,2.7,t.ceiling);let e=2.8,i=2.4;this.floor(0,30.85,2,61.7,e,t.woodFloor),this.ceil(0,31,2,62,e+i,t.ceiling),this.wallX(-1,0,61.7,e,i,t.plaster,[[20,21.4],[40,41.4],[55,56.6]]),this.wallX(1,0,61.7,e,i,t.plaster,[[30,31.2],[46,47.4]]),this.wallZ(0,-1,1,e,i,t.plaster),this.wallX(-1.7,-2,0,0,Te,t.concrete),this.wallX(1.7,-2,0,0,Te,t.concrete),this.ceil(0,-1,3.4,2,2.7,t.ceiling),this.wallZ(-2,-1.7,1.7,0,Te,t.plaster,[[-.58,.58]]),this.box(-.95,-1.5,0,.3,.7,1,t.darkWood,{geo:{ao:"wall"}}),this.room(-8.4,-1.3,0,7.5,{n:!0,w:!0,s:!0,e:!1,wallMat:t.wallpaper}),this.room(-8.4,-1.3,7.5,15.5,{n:!0,w:!0,s:!0,e:!1,wallMat:t.wallpaper,gaps:{w:[[12.2,13.4]]}}),this.room(-13.8,-8.4,7.5,15.5,{n:!0,w:!0,s:!0,e:!1,wallMat:t.plaster,gaps:{w:[[13.8,14.8]]}}),this.room(-16.4,-14.6,13.8,14.8,{n:!0,w:!0,s:!1,e:!1,wallMat:t.concrete,h:2.2}),this.room(-17.6,-13.8,14.8,21,{n:!1,w:!0,s:!0,e:!1,wallMat:t.concrete,floorMat:t.tile,floorUV:[5,8]}),this.wallX(-13.8,15.5,21,0,Te,t.concrete,[]),this.wallZ(14.8,-17.6,-13.8,0,Te,t.concrete,[[-16.3,-15]]),this.room(1.3,8.4,0,8.5,{n:!0,w:!1,s:!0,e:!0,floorMat:t.tatami,floorUV:[9.5,4.7],wallMat:t.woodWall}),this.room(1.3,8.4,8.5,15.5,{n:!0,w:!1,s:!0,e:!0,wallMat:t.wallpaper}),this._buildTrim(),this._buildDetailProps()}_buildDetailProps(){let t=this.materials,e=this.tex,i=this.rng,s=(u,d,h,f)=>{let g=d-u;this.box((u+d)/2,h+(f==="s"?.008:-.008),0,g,.016,1.3,t.tile,{geo:{uv:[g/.6,1.3/.6],ao:"wall"},collide:!1,cast:!1})},r=(u,d,h,f)=>{let g=d-u;this.box(h+(f==="e"?.008:-.008),(u+d)/2,0,.016,g,1.3,t.tile,{geo:{uv:[g/.6,1.3/.6],ao:"wall"},collide:!1,cast:!1})};r(14.92,20.88,-17.5,"w"),s(-17.48,-13.92,20.9,"s"),r(15.6,20.88,-13.9,"e"),s(-17.48,-16.32,14.9,"n"),s(-14.98,-13.92,14.9,"n");let a=new K(new St(.012,.012,1.5,6),t.darkMetal);a.rotation.z=Math.PI/2,a.position.set(-15.8,1.95,19.9),this.scene.add(a),this.box(.92,-1.892,1.15,1.04,.018,.52,t.mailbox,{geo:{uv:[1,1],ao:"wall"},collide:!1,cast:!1});let o=new K(new St(.11,.09,.5,8,1,!0),nt({color:4865846,roughness:.9,side:ae}));o.position.set(-.98,.25,-.45),this.scene.add(o);for(let[u,d,h]of[[-1.02,-.48,.16],[-.95,-.42,-.12]]){let f=new K(new St(.022,.012,.86,6),nt({color:2894896,roughness:.7}));f.position.set(u,.44,d),f.rotation.z=h,this.scene.add(f)}this.colliders.push(Ye(-.98,.25,-.45,.24,.5,.24));for(let u=0;u<3;u++){let d=-5.55+u*.78;this.box(d,12,.42,.72,.62,.1,nt({color:4538163,roughness:.95}),{geo:{ao:"none",jitter:.008},collide:!1,cast:!1}),this.box(d,12.42,.52,.7,.15,.4,nt({color:4209199,roughness:.95}),{geo:{ao:"none",jitter:.008},collide:!1,cast:!1})}let l=this.box(-5,11.98,.52,.7,.6,.05,t.quilt,{geo:{ao:"none",jitter:.02,uv:[1.5,1]},collide:!1,cast:!1});l.rotation.z=.08,l.rotation.x=.05,this.box(-9.9,12.55,.24,.34,.24,.07,t.pale,{geo:{ao:"none"},collide:!1,cast:!1});let c=this.box(-10.55,12.3,.24,.5,1,.07,t.quilt,{geo:{ao:"none",jitter:.015,uv:[1,2]},collide:!1,cast:!1});c.rotation.y=.04,this.box(-6.2,7.392,.98,3.4,.016,.6,t.tile,{geo:{uv:[3.4/.6,1],ao:"wall"},collide:!1,cast:!1}),this.box(-3.4,7.392,.98,.95,.016,.6,t.tile,{geo:{uv:[1.6,1],ao:"wall"},collide:!1,cast:!1});for(let[u,d]of[[-6.9,6.6],[-6.55,6.62]]){let h=new K(new St(.004,.004,.14,4),t.darkMetal);h.position.set(u,1.65,d),this.scene.add(h);let f=new K(new St(.11,.11,.035,10,1,!0),nt({color:3816770,roughness:.55,metalness:.2,side:ae}));f.position.set(u,1.56,d),this.scene.add(f)}this.box(3.1,12.8,0,.55,.55,.04,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1});for(let[u,d]of[[2.87,12.57],[3.33,12.57],[2.87,13.03],[3.33,13.03]])this.box(u,d,0,.04,.04,.3,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1});this.box(3.1,13.35,0,.3,.3,.04,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(3.1,13.35,.04,.04,.04,.26,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(3.1,13.48,.04,.3,.03,.3,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1});for(let u=0;u<3;u++){let d=new K(new St(.006,.006,.08,5),nt({color:[12595248,3170496,3186752][u],roughness:.8}));d.rotation.z=Math.PI/2,d.rotation.y=i()*3,d.position.set(2.95+u*.12,.045,12.7+i()*.2),this.scene.add(d)}}_baseboard(t,e,i,s,r=[]){let a=e;for(let[o,l]of[...r].sort((c,u)=>c[0]-u[0]))o>a&&this._baseSegZ(t,a,Math.min(o,i),s),a=Math.max(a,l);a<i&&this._baseSegZ(t,a,i,s)}_baseSegZ(t,e,i,s){let r=this.materials,a=8;for(let o=e;o<i;o+=a){let l=Math.min(a,i-o);this.box(t,o+l/2,s,.03,l,.14,r.darkWood,{geo:{ao:"wall",uv:[l/2,.2]},collide:!1,cast:!1})}}_baseboardX(t,e,i,s,r=[]){let a=e;for(let[o,l]of[...r].sort((c,u)=>c[0]-u[0]))o>a&&this._baseSegX(t,a,Math.min(o,i),s),a=Math.max(a,l);a<i&&this._baseSegX(t,a,i,s)}_baseSegX(t,e,i,s){let r=this.materials,a=8;for(let o=e;o<i;o+=a){let l=Math.min(a,i-o);this.box(o+l/2,t,s,l,.03,.14,r.darkWood,{geo:{ao:"wall",uv:[l/2,.2]},collide:!1,cast:!1})}}_wainscot(t,e,i,s=.15,r=.85){let a=this.materials,o=8;for(let l=e;l<i;l+=o){let c=Math.min(o,i-l);this.box(t,l+c/2,s,.025,c,r,a.woodWall,{geo:{ao:"wall",uv:[c/2,r/2]},collide:!1,cast:!1})}}_pipe(t,e,i,s){let r=this.materials,a=i-e,o=new St(.035,.035,a,6);o.rotateX(Math.PI/2);let l=new K(o,r.rust);l.position.set(t,s,(e+i)/2),l.castShadow=!0,this.scene.add(l);for(let c=e+1.5;c<i-1;c+=3)this.box(t-.02,c,s,.04,.04,.05,r.darkMetal,{geo:{ao:"none"},collide:!1,cast:!1});return l}_radiator(t,e){let i=this.materials,s=Math.sign(t),r=t-s*.125;this.box(r,e,.15,.08,1.5,.55,i.rust,{geo:{ao:"wall",uv:[1.8,.8]}});let a=nt({color:4869974,roughness:.6,metalness:.22});for(let d=0;d<7;d++)this.box(r-s*.075,e-.63+d*.21,.22,.065,.07,.46,a,{geo:{ao:"none"},collide:!1,cast:!1});this.box(r,e,.72,.08,1.4,.03,i.darkMetal,{geo:{ao:"none"},collide:!1,cast:!1});for(let d of[e-.6,e+.6])this.box(r,d,.035,.1,.09,.09,i.rust,{geo:{ao:"none"},collide:!1,cast:!1});let o=new K(new St(.028,.028,(s>0,.16),6),nt({color:5917250,roughness:.75,metalness:.25}));o.rotation.z=Math.PI/2,o.position.set(r+s*.11,.68,e),this.scene.add(o);let l=new K(new St(.042,.042,.03,6),i.darkMetal);l.rotation.z=Math.PI/2,l.position.set(r+s*.05,.68,e),this.scene.add(l);let c=new K(new St(.03,.03,.05,6),nt({color:8006180,roughness:.5,metalness:.2}));c.rotation.z=Math.PI/2,c.position.set(r-s*.06,.34,e-.62),this.scene.add(c);let u=new Ot;for(let d of[0,Math.PI/2]){let h=new K(Re(.008,.075,.02),nt({color:9056296,roughness:.55}));h.rotation.x=d,u.add(h)}u.position.set(r-s*.1,.34,e-.62),this.scene.add(u)}_buildTrim(){let t=this.materials;this._baseboard(-1.585,0,3.2,0),this._baseboard(-1.585,4.4,10,0),this._baseboard(-1.585,11.2,20,0),this._baseboard(-1.735,20,24,0),this._baseboard(-1.585,24,32,.16),this._baseboard(-1.775,32,48.6,0),this._baseboard(-1.775,49.8,58,0),this._baseboard(1.585,0,3,0),this._baseboard(1.585,4.2,10,0),this._baseboard(1.585,11.2,24,0,[[19.8,21.2]]),this._baseboard(1.585,24,32,0),this._baseboard(1.775,32,38,0),this._baseboard(1.775,38,46,0,[[43,45]]),this._baseboard(1.775,46,54,0),this._baseboard(1.775,54,58,0),this._wainscot(-1.775,32,48.6),this._wainscot(-1.775,49.8,58),this._wainscot(1.775,32,43),this._wainscot(1.775,45,58);for(let e of[-1.775,1.775])this.box(e,45,2.48,.03,26,.05,t.darkWood,{geo:{ao:"wall",uv:[26/2,.1]},collide:!1,cast:!1});this._baseboard(-8.285,0,7.5,0),this._baseboardX(.115,-8.4,-1.3,0),this._baseboardX(7.385,-8.4,-1.3,0),this._baseboard(-8.285,7.5,15.5,0,[[12.2,13.4]]),this._baseboardX(7.615,-8.4,-1.3,0),this._baseboard(-13.685,7.5,15.5,0,[[13.8,14.8]]),this._baseboardX(7.615,-13.8,-8.4,0),this._baseboardX(15.385,-13.8,-8.4,0),this._baseboard(-8.515,7.5,15.5,0),this._baseboardX(.115,1.3,8.4,0),this._baseboardX(8.385,1.3,8.4,0),this._baseboard(8.285,0,8.5,0),this._baseboardX(8.615,1.3,8.4,0),this._baseboard(8.285,8.5,15.5,0),this._baseboard(-.885,1.6,63.2,2.8,[[20,21.4],[40,41.4],[55,56.6]]),this._baseboard(.885,1.6,30,2.8),this._baseboard(.885,31.2,63.2,2.8,[[46,47.4]]);for(let e of[5.65,10.05,14.6,19.2,23.8,28.4,33,37.6,42.2,46.8,51.4])this.box(0,e,2.56,e>=33?3.8:3.4,.16,.14,t.darkWood,{geo:{ao:"ceil",uv:[3,.2]},collide:!1,cast:!1});for(let e of[5.6,11.6,17.6,23.6,35.6,41.6,47.6,53.6,59.6])this.box(0,e,2.8+2.26,2,.16,.14,t.darkWood,{geo:{ao:"ceil",uv:[2.5,.2]},collide:!1,cast:!1});this._pipe(-1.65,2,32,2.42),this._pipe(-1.85,32,55,2.42),this._pipe(-.87,2,55,2.8+2.12),this.decalFloor(-1.65,33,.5,.5,this.tex.blood,.3),this.box(-1.5,33.6,0,.26,.26,.2,t.darkMetal,{geo:{ao:"none"},collide:!1,cast:!1}),this._radiator(1.7,16.8),this._radiator(-1.9,40.8)}_doorFrame(t,e,i,s,r=0){let a=this.materials,o=su;i==="z"?(this.box(t,e,r,tn+.06,.07,o,a.darkWood,{geo:{ao:"wall"}}),this.box(t,e+s,r,tn+.06,.07,o,a.darkWood,{geo:{ao:"wall"}}),this.box(t,e+s/2,r+o,tn+.06,s,.12,a.darkWood,{geo:{ao:"wall"}})):(this.box(t,e,r,.07,tn+.06,o,a.darkWood,{geo:{ao:"wall"}}),this.box(t+s,e,r,.07,tn+.06,o,a.darkWood,{geo:{ao:"wall"}}),this.box(t+s/2,e,r+o,s,tn+.06,.12,a.darkWood,{geo:{ao:"wall"}}))}makeDoor(t){let e=this.materials,{x:i,z:s,along:r="z",width:a=z1,height:o=su,dir:l=1,label:c="\u95E8",locked:u=!1,lockedMsg:d="\u9501\u7740\u2026\u2026",mat:h=e.woodDoor,type:f="swing",slideOffset:g=1.15,onOpen:_=null,openAngle:p=1.72,offset:m=0,y=0}=t;this._doorFrame(i,s,r,a,y);let x=new Ot,v=r==="z"?i+m:i,S=r==="z"?s:s+m;x.position.set(v,y,S);let M=ji(a,o,.06);r==="z"&&M.rotateY(Math.PI/2),M.computeBoundingBox();let b=new K(M,h===e.woodDoor?Qi(this).wood:h);b.castShadow=!0,b.receiveShadow=!0,r==="z"?b.position.set(0,o/2,a/2):b.position.set(a/2,o/2,0),x.add(b),this.scene.add(x);let U=new K(new He(.035,16,10),nt({color:9075258,roughness:.55,metalness:.3}));r==="z"?U.position.set(-.06,o*.54,a/2-.09):U.position.set(a/2-.09,o*.54,-.06),b.add(U),qh(this,b,a,o,r);let E={pivot:x,slab:b,knob:U,along:r,type:f,width:a,height:o,dir:l,angle:0,target:0,open:!1,locked:u,lockedMsg:d,onOpen:_,openAngle:p,slideOffset:g,slidePos:0,slideTarget:0,collider:r==="z"?Ye(v,y+o/2,s+a/2,.12,o,a):Ye(i+a/2,y+o/2,S,a,o,.12),label:c,enabled:!0,hinge:new I(v,y,S),localBounds:M.boundingBox.clone(),worldBounds:M.boundingBox.clone(),collisionAngle:null};this.doors.push(E);let T={mesh:b,label:c,dist:2.6,action:()=>this.toggleDoor(E),door:E};return b.userData.interactable=T,this.interactables.push(T),E}toggleDoor(t){var e,i,s,r;if(t.locked){(i=(e=this.handlers).onLocked)==null||i.call(e,t);return}t.open=!t.open,t.target=t.open?1:0,t.type==="slide"&&(t.slideTarget=t.open?-t.slideOffset:0),(r=(s=this.handlers).onDoorToggle)==null||r.call(s,t,t.open),t.open&&t.onOpen&&t.onOpen(t)}forceOpen(t){t.locked||t.open||(t.open=!0,t.target=1,t.type==="slide"&&(t.slideTarget=-t.slideOffset),t.onOpen&&t.onOpen(t))}regInteractable(t,e,i,s){let r={mesh:t,label:e,dist:i,action:s};return t.userData.interactable=r,this.interactables.push(r),r}updateDoors(t,e=null){var i,s,r,a;for(let o of this.doors)if(o.type==="swing"){let l=o.angle;if(o.angle=Qt(o.angle+(o.target*o.openAngle-o.angle)*Math.min(1,t*3.2),0,o.openAngle),Math.abs(o.angle-o.target*o.openAngle)<1e-5&&(o.angle=o.target*o.openAngle),o.pivot.rotation.y=o.angle*o.dir,o.collisionAngle!==o.angle){o.slab.updateWorldMatrix(!0,!1);let c=o.worldBounds.copy(o.localBounds).applyMatrix4(o.slab.matrixWorld);e&&c.min.x<e.x+.3&&c.max.x>e.x-.3&&c.min.z<e.z+.3&&c.max.z>e.z-.3&&c.max.y>e.y+.35&&c.min.y<e.y+1.67?(o.angle=l,o.pivot.rotation.y=l*o.dir,o.open||(o.open=!0,o.target=1),o.obstructed||(s=(i=this.handlers).onDoorBlocked)==null||s.call(i,o),o.obstructed=!0,o.slab.updateWorldMatrix(!0,!1),c.copy(o.localBounds).applyMatrix4(o.slab.matrixWorld)):o.obstructed=!1,o.collider={x0:c.min.x,y0:c.min.y,z0:c.min.z,x1:c.max.x,y1:c.max.y,z1:c.max.z},o.collisionAngle=o.angle}}else{let l=o.slidePos;o.slidePos+=(o.slideTarget-o.slidePos)*Math.min(1,t*3);let c=o.width/2;o.along==="z"?o.slab.position.z=c+o.slidePos:o.slab.position.x=c+o.slidePos;{o.collider=o.along==="z"?Ye(o.hinge.x,o.hinge.y+o.height/2,o.hinge.z+c+o.slidePos,.12,o.height,o.width):Ye(o.hinge.x+c+o.slidePos,o.hinge.y+o.height/2,o.hinge.z,o.width,o.height,.12);let u=o.collider;e&&u.x0<e.x+.3&&u.x1>e.x-.3&&u.z0<e.z+.3&&u.z1>e.z-.3&&u.y1>e.y+.35&&u.y0<e.y+1.67?(o.slidePos=l,o.open||(o.open=!0,o.target=1,o.slideTarget=-o.slideOffset),o.obstructed||(a=(r=this.handlers).onDoorBlocked)==null||a.call(r,o),o.obstructed=!0,o.along==="z"?o.slab.position.z=c+l:o.slab.position.x=c+l,o.collider=o.along==="z"?Ye(o.hinge.x,o.hinge.y+o.height/2,o.hinge.z+c+l,.12,o.height,o.width):Ye(o.hinge.x+c+l,o.hinge.y+o.height/2,o.hinge.z,o.width,o.height,.12)):o.obstructed=!1}}}_buildDoors(){let t=this.materials;this.makeDoor({x:-1.7,z:3.2,dir:-1,offset:.11,label:"\u53A8\u623F\u7684\u95E8"}),this.makeDoor({x:-1.7,z:10,dir:-1,offset:.11,label:"\u5BA2\u5385\u7684\u95E8"}),this.makeDoor({x:-8.4,z:12.2,width:1.14,height:2,type:"slide",mat:t.fusuma,label:"\u7EB8\u62C9\u95E8",slideOffset:1.15,offset:.12}),this.makeDoor({x:1.7,z:3,dir:1,offset:-.11,label:"\u4F5B\u95F4\u7684\u95E8"}),this.makeDoor({x:1.7,z:10,dir:1,offset:-.11,label:"\u513F\u7AE5\u623F\u7684\u95E8"}),this.makeDoor({x:-1.9,z:48.6,dir:-1,offset:.11,label:"\u6CA1\u6709\u7528\u8FC7\u7684\u95E8",onOpen:()=>{var e,i;return(i=(e=this.handlers).onDeadDoor)==null?void 0:i.call(e)}}),this.box(-2.25,48.6,0,.2,1.4,2.7,t.brick,{geo:{ao:"wall"}}),this.makeDoor({x:-.58,z:-2,along:"x",width:1.16,dir:1,offset:.11,label:"\u7384\u5173\u7684\u95E8",locked:!1}),this.exitDoor=this.makeDoor({x:1,z:30,dir:1,offset:-.11,y:2.8,label:"\u901A\u5F80\u5916\u754C\u7684\u95E8",locked:!0,lockedMsg:"\u597D\u50CF\u8FD8\u7F3A\u4E86\u4EC0\u4E48\u2026\u2026",onOpen:()=>{var e,i;return(i=(e=this.handlers).onExitOpen)==null?void 0:i.call(e)}}),this.box(1.5,30.6,2.8,1.3,1.5,.15,t.concrete,{geo:{ao:"floor"}}),this.makeDoor({x:-13.8,z:13.8,width:.9,height:2,dir:1,offset:.11,label:"\u58C1\u6A71"}),this.box(-14.6,13.86,0,.12,.1,2.1,t.darkWood,{geo:{ao:"wall"}}),this.box(-14.25,13.86,0,.7,.06,2.1,t.darkWood,{geo:{ao:"wall"}}),this.box(-14.25,14.3,2.1,.7,1,.1,t.darkWood,{geo:{ao:"wall"}}),this.box(-13.85,14.3,2.1,.2,1,.6,t.darkWood,{geo:{ao:"wall"}}),this.floor(-14.25,14.25,.7,.9,0,t.woodFloor)}_buildProps(){let t=this.materials,e=this.tex,i=this.rng,s=2.8;this.box(-6.2,7.25,0,3.4,.62,.92,t.darkWood,{geo:{ao:"wall",uv:[4,1]}}),this.box(-6.2,7.25,.92,3.5,.7,.06,nt({color:6514271,roughness:.78,metalness:.12}),{geo:{ao:"none"}}),this.box(-6.6,7.25,1.6,2.4,.62,.62,t.darkWood,{geo:{ao:"wall"}});let r=new Ot;r.position.set(-7.75,1.6,6.93);let a=new K(Re(1.05,.54,.04,{uv:[1,1]}),t.darkWood);a.position.set(.525,.27,0),r.add(a),this.scene.add(r),this.props.cabinet={pivot:r,angle:0,openedOnce:!1},this.box(-7.7,2.85,0,.85,.85,1.75,t.rust,{geo:{ao:"wall"}}),this.box(-7.7,3.29,.875,.8,.06,1.75,t.darkMetal,{geo:{ao:"none"},collide:!1}),this.box(-5.3,4.6,0,1.4,.8,.06,t.darkWood,{geo:{ao:"none",uv:[2,1]}});for(let[V,j]of[[-5.85,4.6],[-4.75,4.6],[-5.3,4.05],[-5.3,5.15]])this.box(V,j,.06,.08,.08,.72,t.darkWood,{geo:{ao:"none"}});this.box(-5.3,3.55,0,.55,.55,.46,t.darkWood,{geo:{ao:"wall"}}),this.box(-5.3,3.32,.46,.55,.07,.55,t.darkWood,{geo:{ao:"none"}}),this.box(-5.3,5.65,0,.55,.55,.46,t.darkWood,{geo:{ao:"wall"}}),this.box(-5.3,5.88,.46,.55,.07,.55,t.darkWood,{geo:{ao:"none"}}),this.box(-5.5,7,.98,.26,.26,.22,t.darkMetal,{geo:{ao:"none"}}),this.box(-5.8,7.2,.95,.45,.26,.05,t.darkMetal,{geo:{ao:"none"},collide:!1}),this.box(-5.8,7.2,.99,.6,.4,.015,t.darkMetal,{geo:{ao:"none"},collide:!1});let o=new K(new St(.022,.022,.3,6),t.darkMetal);o.position.set(-5.72,1.14,7.31);let l=new K(new St(.018,.018,.34,6),t.darkMetal);l.rotation.x=Math.PI/2,l.position.set(-5.72,1.26,7.21),this.scene.add(o,l),this.box(-3.4,7.25,0,.95,.62,.92,t.whiteMetal,{geo:{ao:"wall"}});for(let[V,j]of[[-3.55,7.05],[-3.25,7.05],[-3.55,7.29],[-3.25,7.29]]){let At=new K(new St(.07,.07,.02,8),t.darkMetal);At.position.set(V,.93,j),this.scene.add(At)}this.box(-3.4,7.25,1.72,1,.42,.28,t.darkMetal,{geo:{ao:"wall"},collide:!1}),this.box(-3.4,7.25,2,.24,.24,.4,t.rust,{geo:{ao:"none"},collide:!1}),this.box(-6.7,6.6,1.72,1.7,.28,.04,t.darkWood,{geo:{ao:"none"},collide:!1});let c=[4876880,6965808,4868704,6318666];for(let V=0;V<4;V++){let j=new K(new St(.035,.03,.12,6),nt({color:c[V],roughness:.3,metalness:.2}));j.position.set(-7.25+V*.32,1.8,6.6),this.scene.add(j)}let u=this.box(-8.22,3.2,1.45,.16,.1,.24,nt({color:4016706,roughness:.6}),{geo:{ao:"none"},collide:!1});this.props.phone=u,this.regInteractable(u,"\u7535\u8BDD",2,()=>{var V,j;return(j=(V=this.handlers).onPhone)==null?void 0:j.call(V)}),this.decalFloor(-2.6,5.6,.42,.56,e.news,i()*3),this.decalFloor(-6.4,1.6,.42,.56,e.news,.7);let d=nt({color:13223092,roughness:.55});for(let[V,j,At]of[[-5.9,7.16,.09],[-5.7,7.26,.11],[-5.86,7.3,.08]]){let re=new K(new St(At,At*.72,.055,8),d);re.position.set(V,.99,j),this.scene.add(re)}let h=new K(Re(.012,.012,.24),nt({color:10124111,roughness:.85}));h.position.set(-5.78,1.005,7.2),h.rotation.y=.5,this.scene.add(h);let f=new K(new St(.11,.1,.13,10),t.darkMetal);f.position.set(-3.55,1.005,7.05),this.scene.add(f);let g=new K(new St(.14,.15,.17,10),t.whiteMetal);g.position.set(-6.95,1.065,7.15),this.scene.add(g);let _=new K(new St(.145,.145,.02,10),t.darkMetal);_.position.set(-6.95,1.16,7.15),this.scene.add(_);let p=new K(new St(.028,.032,.15,6),nt({color:3023128,roughness:.4}));p.position.set(-5.15,1.055,7.15),this.scene.add(p),this.box(-6.5,15.15,0,1.1,.45,.45,t.darkWood,{geo:{ao:"wall"}});let m=this.box(-6.5,15.25,.45,1,.45,.72,t.darkMetal,{geo:{ao:"none"}}),y=new K(new ie(.86,.6),t.tvScreen);y.position.set(-6.5,1.05,15.02),y.rotation.y=Math.PI,this.scene.add(y),this.props.tv={body:m,screen:y,on:!1,timer:0},this.regInteractable(m,"\u7535\u89C6",2.4,()=>{var V,j;return(j=(V=this.handlers).onTV)==null?void 0:j.call(V)}),this.box(-4.8,12,0,2.4,.75,.42,nt({color:4867128,roughness:.95}),{geo:{ao:"wall"}}),this.box(-4.8,12.62,.42,2.4,.24,.5,nt({color:3946542,roughness:.95}),{geo:{ao:"none"}}),this.box(-5.95,12.2,0,.16,.6,.55,t.darkWood,{geo:{ao:"none"}}),this.box(-3.65,12.2,0,.16,.6,.55,t.darkWood,{geo:{ao:"none"}}),this.box(-4.9,14,0,1.1,.6,.06,t.darkWood,{geo:{ao:"none"}}),this.box(-4.9,14,.06,.1,.1,.32,t.darkWood,{geo:{ao:"none"}}),this.tvLight=new Fe(9418444,0,7,1.8),this.tvLight.position.set(-6.5,1.4,14.2),this.scene.add(this.tvLight);for(let V of[-.25,.25]){let j=new K(new St(.008,.008,.5,4),t.darkMetal);j.position.set(-6.5+V,1.38,15.25),j.rotation.z=V>0?-.5:.5,j.rotation.x=.35,this.scene.add(j)}let x=new K(new ie(.86,.6),Se({map:e.tvFace,transparent:!0}));x.position.set(-6.5,1.05,14.99),x.rotation.y=Math.PI,x.visible=!1,this.scene.add(x),this.props.tvFace=x,this.box(-8.15,10.3,0,.3,2.2,1.9,t.darkWood,{geo:{ao:"wall"}}),this.box(-8.15,10.3,.65,.32,2.05,.05,t.darkWood,{geo:{ao:"none"},collide:!1}),this.box(-8.15,10.3,1.25,.32,2.05,.05,t.darkWood,{geo:{ao:"none"},collide:!1});let v=[6959136,2117738,3824176,6969888,4862032,5263440,7356448,2767434];for(let V of[.7,1.3])for(let j=0;j<8;j++){let At=.045+i()*.05;this.box(-7.98,9.42+j*.25,V,.05,At,.2+i()*.13,nt({color:v[(j*3+(V>1?1:0))%8],roughness:.9}),{geo:{ao:"none"},collide:!1,cast:!1})}for(let V=0;V<3;V++){let j=this.box(-8.03,9.8+V*.3,1.93,.24,.05,.035,nt({color:v[V+2],roughness:.9}),{geo:{ao:"none"},collide:!1,cast:!1});j.rotation.z=.2+i()*.4}this.decalFloor(-5.2,11.8,2.6,3.2,e.rug,.05),this.box(-3.1,13.9,0,.26,.26,.04,t.darkMetal,{geo:{ao:"none"},collide:!1});let S=new K(new St(.02,.02,1.5,6),t.darkMetal);S.position.set(-3.1,.77,13.9);let M=nt({color:9071168,roughness:.9,side:ae}),b=nt({color:13215850,emissive:16756838,emissiveIntensity:.55,roughness:.9,side:ae}),U=new K(new xn(.16,.3,10,1,!0),M);U.position.set(-3.1,1.66,13.9),this.scene.add(S,U);let E=new Fe(16756838,0,6,1.9);E.position.set(-3.1,1.6,13.9),this.scene.add(E),this.props.lamp={light:E,on:!1,shade:U,shadeOff:M,shadeOn:b},this.regInteractable(S,"\u843D\u5730\u706F",2,()=>{var V,j;return(j=(V=this.handlers).onLamp)==null?void 0:j.call(V)});for(let[V,j]of[[-6.4,7.615],[-3.4,7.615]])this.decalWall(V,j,1.55,.34,.42,e.photo,"s"),this.box(V-.185,j+.015,1.55,.03,.02,.5,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(V+.185,j+.015,1.55,.03,.02,.5,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(V,j+.015,1.335,.34,.02,.03,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(V,j+.015,1.765,.34,.02,.03,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1});let T=this.decalWall(-4.9,7.63,1.55,.34,.42,e.photo,"s");T.rotation.z=Math.PI,this.box(-4.9-.185,7.645,1.55,.03,.02,.5,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(-4.9+.185,7.645,1.55,.03,.02,.5,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(-4.9,7.645,1.335,.34,.02,.03,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(-4.9,7.645,1.765,.34,.02,.03,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(-7.7,14.6,0,.32,.22,.14,t.darkWood,{geo:{ao:"wall"}});let C=new K(new St(.006,.006,.4,4),t.darkMetal);C.position.set(-7.7,.34,14.6),this.scene.add(C);let F=this.decalWall(-8.28,14,1,.55,.75,e.silhouette,"e",0,!1);F.visible=!1,this.props.silhouette=F,this.box(-10.7,12.3,0,1.8,1.15,.24,t.quilt,{geo:{ao:"wall",uv:[2,2]}}),this.box(-9.9,12.3,.24,.4,.3,.08,t.pale,{geo:{ao:"none"}}),this.box(-9.15,9.55,0,.5,.45,.55,t.darkWood,{geo:{ao:"wall"}});let et=new K(new ie(.2,.26),nt({map:e.journal,side:ae,roughness:.92,emissive:16777215,emissiveIntensity:.4}));et.position.set(-9.15,.56,9.55),et.rotation.x=-Math.PI/2,this.scene.add(et);let D=new Fe(16756832,.4,2.5,2);D.position.set(-9.15,.7,9.55),this.scene.add(D),this.notePickups.push({mesh:et,id:1}),this.regInteractable(et,"\u65E7\u624B\u8BB0",3.5,()=>{var V,j;return(j=(V=this.handlers).onNote)==null?void 0:j.call(V,1)}),this.box(-11.6,9.3,0,.5,.9,.72,t.darkWood,{geo:{ao:"wall"}}),this.box(-11.6,9.3,.72,.54,.94,.04,t.darkWood,{geo:{ao:"none"}}),this.box(-11.6,9.95,0,.3,.3,.42,t.darkWood,{geo:{ao:"none"}});let O=new K(new ie(.6,1.3),Se({map:e.mirror}));O.position.set(-13.695,1.5,9.5),O.rotation.y=Math.PI/2,this.scene.add(O),this.regInteractable(O,"\u955C\u5B50",2,()=>{var V,j;return(j=(V=this.handlers).onMirror)==null?void 0:j.call(V)});let Y=new K(new St(.015,.015,.75,5),t.darkMetal);Y.rotation.z=Math.PI/2,Y.position.set(-14.2,1.85,14.3),this.scene.add(Y);let rt=[5917290,4872794,6965834];for(let V=0;V<3;V++)this.box(-14.53,14.05+V*.24,1.32,.05,.42,.95,nt({color:rt[V],roughness:.95}),{geo:{ao:"none"},collide:!1,cast:!0});this.decalWall(-11.2,7.615,1.48,.36,1.1,e.scroll,"n"),this.box(-11.2,7.635,2,.44,.045,.032,t.darkWood,{geo:{ao:"none"},collide:!1}),this.box(-11.2,7.635,.9,.44,.045,.032,t.darkWood,{geo:{ao:"none"},collide:!1});let it=nt({color:8219218,roughness:.92});this.box(-13.2,8.1,0,.52,.44,.36,it,{geo:{ao:"wall"}});let Z=this.box(-13.12,8.16,.36,.42,.36,.3,it,{geo:{ao:"none"}});Z.rotation.y=.16,this.box(-12.5,11.4,0,.5,.5,.09,nt({color:5913146,roughness:.95}),{geo:{ao:"none"}}),this.box(-15.8,20.25,0,1.4,.55,.6,t.rust,{geo:{ao:"wall"}}),this.box(-15.8,20.25,.3,1.25,.4,.02,t.waterDark,{geo:{ao:"none"}}),this.box(-15.8,19.86,0,1.5,.08,.62,t.darkMetal,{geo:{ao:"none"}}),this.box(-16.7,15.25,1.45,.06,.6,.55,t.darkMetal,{geo:{ao:"none"}}),this.box(-16.9,17.2,1.9,.14,.14,.1,t.darkMetal,{geo:{ao:"none"}});let st=new K(new St(.02,.02,.35,6),t.darkMetal);st.position.set(-15.6,.8,20.25);let ht=new K(new St(.016,.016,.22,6),t.darkMetal);ht.rotation.x=Math.PI/2,ht.position.set(-15.6,.97,20.05),this.scene.add(st,ht),this.box(-14.55,16.85,0,.4,.55,.42,t.whiteMetal,{geo:{ao:"wall"}}),this.box(-14.55,16.4,0,.4,.48,.4,t.whiteMetal,{geo:{ao:"wall"}}),this.box(-14.55,16.4,.4,.42,.5,.04,t.whiteMetal,{geo:{ao:"none"}}),this.box(-16.55,15.35,0,.55,.5,.8,t.whiteMetal,{geo:{ao:"wall"}}),this.box(-16.55,15.35,.8,.6,.55,.05,t.whiteMetal,{geo:{ao:"none"}}),this.box(-13.93,15.5,1.5,.12,.5,.7,t.whiteMetal,{geo:{ao:"wall"}});let tt=new Ot;tt.position.set(-13.95,1.55,15.35);let B=new K(Re(.06,.6,.5),t.whiteMetal);B.position.set(0,0,.25),tt.add(B),tt.rotation.y=-.55,this.scene.add(tt);let ot=this.box(-14.5,20.3,0,.62,.62,.92,t.whiteMetal,{geo:{ao:"wall"}});this.props.washer=ot,this.regInteractable(ot,"\u6D17\u8863\u673A",2.2,()=>{var V,j;return(j=(V=this.handlers).onWasher)==null?void 0:j.call(V)});let ft=new K(new St(.24,.24,.03,10),nt({color:10133668,roughness:.6,metalness:.15}));ft.position.set(-14.5,.935,20.3),ft.rotation.x=.06,this.scene.add(ft),this.box(-14.5,20.52,.92,.56,.1,.1,t.darkMetal,{geo:{ao:"none"},collide:!1});let mt=new K(new St(.17,.14,.36,8),nt({color:9082016,roughness:.85}));mt.position.set(-14.75,.18,19.5),this.scene.add(mt);let vt=new K(new He(.14,7,5),nt({color:5921382,roughness:.95}));vt.position.set(-14.75,.37,19.5),vt.scale.y=.5,this.scene.add(vt),this.box(7.55,4.8,0,.85,.75,.5,t.darkWood,{geo:{ao:"wall"}}),this.box(7.55,4.8,.5,.8,.7,.85,t.darkWood,{geo:{ao:"wall"}}),this.box(7.55,4.8,1.35,.84,.74,.1,t.darkWood,{geo:{ao:"none"}});let Ut=new K(new ie(.2,.26),t.photo);Ut.position.set(7.145,1.05,4.8),Ut.rotation.y=-Math.PI/2,this.scene.add(Ut);let Ft=this._candle(7.15,4.8,1.59);this._candle(7.95,4.8,1.59),this.box(7.55,4.8,1.46,.09,.09,.1,nt({color:9075258,roughness:.45,metalness:.3}),{geo:{ao:"none"},collide:!1}),this.regInteractable(Ft,"\u6447\u54CD\u94C3\u94DB",2.2,()=>{var V,j;return(j=(V=this.handlers).onBell)==null?void 0:j.call(V)});let L=new K(new ie(.24,.3),nt({map:e.news,side:ae,roughness:.92,emissive:16777215,emissiveIntensity:.4}));L.position.set(7.55,1.47,5.1),L.rotation.x=-Math.PI/2+.2,this.scene.add(L);let z=new Fe(16756832,.4,2.5,2);z.position.set(7.55,1.6,5.1),this.scene.add(z),this.notePickups.push({mesh:L,id:2}),this.regInteractable(L,"\u62A5\u7EB8\u6587\u7AE0",3.5,()=>{var V,j;return(j=(V=this.handlers).onNote)==null?void 0:j.call(V,2)});for(let V of[3.4,4.1,4.8])this._ofuda(2.3,V,2.55);for(let[V,j]of[[5.9,4.2],[5.9,5.4]])this.box(V,j,0,.55,.55,.09,t.clothRed,{geo:{ao:"wall"}});for(let[V,j]of[[7.3,4.6],[7.55,4.55],[7.8,4.65]]){let At=new K(new St(.045,.03,.05,6),nt({color:3813432,roughness:.5,metalness:.2}));At.position.set(V,1.475,j),this.scene.add(At)}this.decalWall(8.285,4.8,1.55,.38,1.15,e.scroll,"w"),this.box(5.2,15,0,1.9,.8,.32,t.quilt,{geo:{ao:"wall",uv:[2,1]}}),this.box(4.35,15,.32,.3,.25,.08,t.pale,{geo:{ao:"none"}}),this.box(2,15,0,.8,.5,.45,t.darkWood,{geo:{ao:"wall"}});let R=[11546672,3172528,4235336,13676592];for(let V=0;V<6;V++){let j=.1+i()*.08;this.box(1.7+i()*3.5,9.2+i()*2.5,j/2,j,j,j,nt({color:R[V%4],roughness:.8}),{geo:{ao:"none"},collide:!1})}let H=this._doll(7.9,9.9);this.props.doll=H,this.regInteractable(H.mesh,"\u4EBA\u5076",1.8,()=>{var V,j;return(j=(V=this.handlers).onDoll)==null?void 0:j.call(V)}),this.box(7.75,9.1,0,1.1,.5,.72,t.darkWood,{geo:{ao:"wall"}});let k=new K(new ie(.24,.3),nt({map:e.drawing,side:ae,roughness:.92,emissive:16777215,emissiveIntensity:.4}));k.position.set(7.75,.73,9.1),k.rotation.x=-Math.PI/2,this.scene.add(k);let q=new Fe(16756832,.4,2.5,2);q.position.set(7.75,.85,9.1),this.scene.add(q),this.notePickups.push({mesh:k,id:3}),this.regInteractable(k,"\u5B69\u5B50\u7684\u753B",3.5,()=>{var V,j;return(j=(V=this.handlers).onNote)==null?void 0:j.call(V,3)}),this.decalWall(8.285,12.2,1.4,.4,.5,e.drawing,"w",.05),this.box(7.95,14.4,0,.65,1.1,2.05,t.darkWood,{geo:{ao:"wall"}}),this.box(7.95,13.82,0,.62,.06,2.05,t.darkWood,{geo:{ao:"none"},collide:!1}),this.box(4.4,9.1,0,1.1,.65,.9,t.darkWood,{geo:{ao:"wall"}}),this.box(4.4,9.1,.28,1.02,.57,.08,t.quilt,{geo:{ao:"none"}});for(let[V,j]of[[3.88,8.8],[4.92,8.8],[3.88,9.4],[4.92,9.4]]){let At=new K(new St(.02,.02,.9,5),t.darkWood);At.position.set(V,.45,j),this.scene.add(At)}this.box(4.4,9.1,.82,1.14,.06,.04,t.darkWood,{geo:{ao:"none"},collide:!1}),this.box(4.4,9.1,.82,.06,.69,.04,t.darkWood,{geo:{ao:"none"},collide:!1});let G=new Ot,gt=new K(new St(.006,.006,.5,4),t.darkMetal);gt.rotation.z=Math.PI/2;let bt=gt.clone();bt.rotation.z=-Math.PI/2,G.add(gt,bt);let A=Se({color:15262936,side:ae});for(let V=0;V<5;V++){let j=new K(new xn(.03,.07,4),A);j.position.set(dt(-.2,.2),-.22-dt(0,.1),dt(-.2,.2)),j.rotation.z=Math.PI,G.add(j)}G.position.set(4.4,1.95,9.1),this.scene.add(G),this.props.mobile=G;let w=new Ot;w.position.set(2.3,2.5,13);let W=new K(new St(.004,.004,.42,4),t.darkMetal);W.position.y=-.21,w.add(W);let ct=nt({color:12109004,roughness:.25,metalness:.2}),lt=new K(new St(.05,.032,.055,8),ct);lt.position.y=-.45,w.add(lt);let at=new K(new St(.005,.005,.1,4),t.darkMetal);at.position.y=-.53,w.add(at);let Ct=new K(new He(.012,5,4),t.darkMetal);Ct.position.y=-.59,w.add(Ct);let Mt=nt({color:14209212,roughness:.9,side:ae});for(let V=0;V<3;V++){let j=V/3*Math.PI*2+.5,At=new K(Re(.028,.16,.004),Mt);At.position.set(Math.cos(j)*.035,-.66,Math.sin(j)*.035),At.rotation.y=-j,w.add(At)}this.scene.add(w),this.props.furin=w;let Tt=new Ot,Dt=nt({color:8018490,roughness:.95}),Ht=new K(Re(.22,.3,.18),Dt);Ht.position.y=.18;let ut=new K(Re(.16,.16,.16),Dt);ut.position.y=.4,Tt.add(Ht,ut);for(let V of[-.14,.14]){let j=new K(Re(.08,.16,.08),Dt);j.position.set(V,.24,0),Tt.add(j)}for(let V of[-.07,.07]){let j=new K(Re(.1,.1,.12),Dt);j.position.set(V,.05,.03),Tt.add(j)}let ne=nt({color:1315344});for(let V of[-.05,.05]){let j=new K(new He(.012,4,3),ne);j.position.set(V,.43,.075),Tt.add(j)}Tt.position.set(2.1,0,12.6),Tt.rotation.y=.4,this.scene.add(Tt),this.decalWall(8.285,9.4,.75,.16,1.55,e.growth,"w"),this.dollSpots=[{x:7.9,z:9.9,ry:Math.PI},{x:2,z:15,ry:0},{x:5,z:11.2,ry:Math.PI/2},{x:.45,z:11.4,ry:-Math.PI/2},{x:7,z:13.8,ry:Math.PI}],this.decalFloor(-.5,6.2,.42,.56,e.news,.4),this.decalFloor(.6,19.2,.42,.56,e.news,1.2),this.decalFloor(-.4,33.2,.42,.56,e.news,2),this.decalFloor(.3,47.2,.42,.56,e.news,.8);let Yt=this.box(-1.2,17.2,0,.45,.45,.5,t.darkWood,{geo:{ao:"none"}});Yt.rotation.z=Math.PI/2,Yt.position.y=.24;let Nt=new Ot,zt=new St(.32,.32,.05,7),Pt=nt({color:1711134,roughness:.65,metalness:.25});for(let V of[-.45,.45]){let j=new K(zt,Pt);j.rotation.x=Math.PI/2,j.position.set(V,.32,0),Nt.add(j)}let Gt=new K(new jt(1,.07,.07),nt({color:6958116,roughness:.55,metalness:.15}));Gt.position.set(0,.62,0),Nt.add(Gt);let se=new K(new jt(.35,.06,.06),nt({color:5593696,roughness:.5,metalness:.3}));se.position.set(.55,.85,0),Nt.add(se),Nt.position.set(-1.3,0,21.5),Nt.rotation.y=.2,Nt.rotation.z=.06,this.scene.add(Nt),this.colliders.push(Ye(-1.3,.5,21.5,1.3,1,.5)),this.props.bike=Nt,this.decalWall(-1.585,30,1.4,1.3,.65,e.graffiti,"e"),this._ofuda(1.55,3.6,2.5);let de=new K(new jt(.55,.28,.06),t.exitSign);de.position.set(0,2.42,57.4),this.scene.add(de);let Vt=new K(new St(.15,.15,.03,12),nt({map:e.clock,roughness:.6}));Vt.position.set(1.575,1.7,26.5),Vt.rotation.z=Math.PI/2,this.scene.add(Vt);let xt=this.decalWall(1.585,25.4,1.58,.3,.38,e.photo,"w");xt.rotation.z=-.09,this.props.clock={mesh:Vt,state:"normal",timer:dt(30,70)},this._window(-.9,20,3.55,"e"),this.decalFloor(0,30.6,.8,1.2,e.blood,.4,.012),this.decalWall(1.575,29.4,3.2,.3,.6,e.handprint,"w",.2),this.decalWall(1.575,31.5,3.4,.4,.5,e.blood,"w",.1);let N=new Fe(4169818,.9,4,1.9);N.position.set(.6,3.3,30.6),this.scene.add(N),this.props.ropes=[];let Et=this.decalWall(-1.765,49.2,1.05,1.1,2,e.eyesWall,"e",0,!1);Et.visible=!1,this.props.eyesWall=Et,this.decalWall(1.615,28,.75,.32,1.6,e.blood,"w",.12);for(let[V,j,At]of[[-1.5,43.2,.3],[1.6,41.7,-.4],[-1.5,44,.7]]){let re=this.box(V,j,0,.55,.5,.5,nt({color:7232056,roughness:.9}),{geo:{ao:"wall"}});re.rotation.y=At}this.box(.35,38.6,.02,.8,.55,.03,t.ceiling,{geo:{ao:"none"},collide:!1}),this.box(-.4,38.9,.02,.25,.18,.03,t.ceiling,{geo:{ao:"none"},collide:!1}),this.box(.75,38.35,.015,.15,.2,.025,t.ceiling,{geo:{ao:"none"},collide:!1}),this._window(-8.3,2.6,1,"e"),this._window(-8.3,14,1,"e",{dark:!0}),this._window(-13.7,10.75,1,"e"),this.decalFloor(-13.4,15,.9,1.1,e.blood,.1),this._battery(.62,-.15),this._battery(-5.05,13.05),this._battery(-.55,33.6)}_battery(t,e,i=.042){var d;let s=new Ot,r=new K(new St(.032,.032,.11,8),nt({color:7624250,roughness:.55,metalness:.35}));r.rotation.z=Math.PI/2,s.add(r);let a=new K(new St(.033,.033,.028,8),Se({color:14208942}));a.rotation.z=Math.PI/2,a.position.x=.03,s.add(a);let o=new K(new St(.014,.014,.012,8),nt({color:11119012,roughness:.4,metalness:.5}));o.rotation.z=Math.PI/2,o.position.x=.058,s.add(o);let l=new Fe(6332671,.7,3.5,2);l.position.set(0,.05,0),s.add(l);let c=new K(new ti(.12,.012,6,16),Se({color:6332671,transparent:!0,opacity:.8}));c.rotation.x=Math.PI/2,c.position.y=.01,s.add(c),s.position.set(t,i,e),s.rotation.y=dt(0,Math.PI*2),this.scene.add(s);let u=this.regInteractable(s,"\u624B\u7535\u7535\u6C60",3.5,()=>{var h,f;return(f=(h=this.handlers).onBattery)==null?void 0:f.call(h,s)});((d=this.props).batteries||(d.batteries=[])).push({mesh:s,interactable:u,glow:l,halo:c,phase:dt(0,6.28)})}_candle(t,e,i){this.box(t,e,i-.14,.05,.05,.14,nt({color:13617328,roughness:.9}),{geo:{ao:"none"},collide:!1});let s=new K(new He(.022,5,4),Se({color:16760928}));s.position.set(t,i+.02,e),this.scene.add(s);let r=new Fe(16747066,1.8,4,1.9);return r.position.set(t,i+.06,e),this.scene.add(r),this.candles.push({light:r,base:1.8,phase:dt(0,6.28)}),s}_ofuda(t,e,i){let s=new K(new St(.003,.003,.24,4),nt({color:2762788,roughness:.9}));s.position.set(t,i,e);let r=new K(new ie(.09,.24),this.materials.ofuda);return r.position.set(t,i-.24,e),this.scene.add(s),this.scene.add(r),this.ofudas.push(r),r}_window(t,e,i,s,r={}){var p,m;let a=this.materials,o=!!r.dark,l=(p=r.w)!=null?p:.8,c=(m=r.h)!=null?m:.8,u=o?nt({color:461326,roughness:.35,metalness:.1}):a.moonWin,d=new K(new ie(l,c),u),h=s==="e"?.02:s==="w"?-.02:0,f=s==="n"?-.02:s==="s"?.02:0;if(d.position.set(t+h,i,e+f),s==="e"?d.rotation.y=Math.PI/2:s==="w"?d.rotation.y=-Math.PI/2:s==="s"&&(d.rotation.y=Math.PI),this.scene.add(d),!o){let y=Se({map:this.tex.rainStreaks,transparent:!0,opacity:.55,depthWrite:!1,side:ae}),x=new K(new ie(l,c),y),v=s==="e"?.005:s==="w"?-.005:0,S=s==="n"?-.005:s==="s"?.005:0;x.position.set(d.position.x+v,d.position.y,d.position.z+S),x.rotation.copy(d.rotation),x.renderOrder=3,this.scene.add(x)}let g=nt({color:790034,roughness:.65,metalness:.25}),_=nt({color:3024416,roughness:.85});if(o&&(s==="e"||s==="w")){let y=t+(s==="e"?.025:-.025),x=nt({color:3752779,roughness:.4});this.box(y,e-.1,i+.08,.02,.62,.018,x,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(y,e+.14,i-.06,.02,.5,.014,x,{geo:{ao:"none"},collide:!1,cast:!1})}if(!o){let y=new Fe(6982836,.8,7,1.9);y.position.set(t+(s==="e"?.6:s==="w"?-.6:0),i,e+(s==="n"?.6:s==="s"?-.6:0)),this.scene.add(y),this.windowLights.push(y)}if(s==="e"||s==="w"){let y=t+(s==="e"?.03:-.03);this.box(y,e,i+c/2-.03,.05,l+.14,.05,_,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(y,e,i-c/2+.03,.05,l+.14,.05,_,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(y,e-l/2-.02,i,.05,.05,c-.01,_,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(y,e+l/2+.02,i,.05,.05,c-.01,_,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(y,e,i,.04,.05,c-.01,_,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(y,e,i-c*.23,.05,l-.01,.04,_,{geo:{ao:"none"},collide:!1,cast:!1});for(let x of[-l*.325,0,l*.325]){let v=new K(new jt(.02,c-.05,.02),g);v.position.set(t+(s==="e"?.045:-.045),i,e+x),this.scene.add(v)}this.box(t+(s==="e"?.05:-.05),e,i-.41,.1,.86,.04,a.darkWood,{geo:{ao:"none"},collide:!1,cast:!1})}else{let y=e+(s==="n"?-.03:.03);this.box(t,y-.37,i,.94,.05,.05,_,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(t,y+.37,i,.94,.05,.05,_,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(t-.42,y,i,.05,.05,c-.01,_,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(t+.42,y,i,.05,.05,c-.01,_,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(t,y,i,.79,.04,.05,_,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(t,y,i-c*.23,.79,.05,.04,_,{geo:{ao:"none"},collide:!1,cast:!1});for(let x of[-l*.325,0,l*.325]){let v=new K(new jt(.02,c-.05,.02),g);v.position.set(t+x+(s==="n"?.015:-.015),i,e+(s==="n"?-.045:.045)),this.scene.add(v)}this.box(t+(s==="n"?.045:-.045),e+(s==="n"?.03:-.03),i-.41,.86,.1,.04,a.darkWood,{geo:{ao:"none"},collide:!1,cast:!1})}return d}_doll(t,e){let i=new Ot,s=nt({color:14209732,roughness:.85}),r=new K(Re(.14,.24,.1,{jitter:.004}),s);r.position.y=.12,i.add(r);let a=new K(Re(.13,.13,.12,{jitter:.01}),s);a.position.y=.32,i.add(a);let o=new K(new ie(.1,.1),Se({map:this.tex.dollFace}));o.position.set(0,0,.062),a.add(o);let l=new K(Re(.18,.12,.14,{jitter:.004}),nt({color:8002074,roughness:.9}));l.position.y=.06,i.add(l);let c=new K(Re(.14,.07,.13,{jitter:.008}),nt({color:1840144,roughness:.95}));c.position.y=.4,i.add(c);let u=(f,g,_,p,m,y)=>{let x=new K(Re(f,g,_,{jitter:.004}),s);return x.position.set(p,m,y),i.add(x),x},d=u(.05,.2,.05,-.1,.2,0),h=u(.05,.2,.05,.1,.2,0);return u(.06,.14,.07,-.05,.07,.04),u(.06,.14,.07,.05,.07,.04),i.position.set(t,0,e),i.rotation.y=Math.PI,this.scene.add(i),{mesh:i,head:a,armL:d,armR:h,turned:!1}}_buildDecals(){let t=this.tex,e=this.rng;for(let i=11.6;i<26;i+=.9){let s=.3+e()*.5;this.decalFloor(.55+e()*.5,i+e()*.4,s,s*(.5+e()),t.blood,e()*3)}this.decalWall(1.615,10.5,1.25,.22,.22,t.handprint,"w",.4),this.decalWall(1.615,10.9,.95,.22,.22,t.handprint,"w",-.3),this.decalWall(-13.93,17.6,1.2,.6,.5,t.blood,"e",.1),this.decalWall(-13.93,19.4,.7,.3,.3,t.handprint,"e",.6),this.decalWall(-8.515,13.6,1.1,.5,.4,t.blood,"e",.2),this.decalFloor(.9,30.6,.5,.7,t.blood,.6,.012),this.decalWall(-1.585,24.4,.5,.3,.25,t.blood,"e",.1)}_buildLights(){let t=this.materials,e=Se({color:13226710});this.tubeMat=e,this.tubeOffMat=Se({color:1974564});let i=(f,g,_,p,m,y,x=9,v=1.06)=>{let S=new Fe(m,p,x,1.8);S.position.set(f,_-.05,g),this.scene.add(S);let M=new K(new jt(.24,.09,v+.09),nt({color:3948614,roughness:.6,metalness:.25}));M.position.set(f,_+.06,g),M.castShadow=!1,this.scene.add(M);let b=nt({color:2895668,roughness:.6,metalness:.2});for(let E of[-v/2-.035,v/2+.035]){let T=new K(new jt(.26,.11,.06),b);T.position.set(f,_+.06,g+E),this.scene.add(T)}let U=new K(new St(.028,.028,v,6),e);return U.rotation.x=Math.PI/2,U.position.set(f,_+.005,g),this.scene.add(U),this.fluorescents.push({light:S,base:p,mode:y,phase:dt(0,6.28),seed:Math.random()*1e9|0,rng:Lt(Math.random()*1e9|0),x:f,z:g,y:_,tube:U,flickState:1,flickT:dt(0,2),userOff:!1}),S},s=10470616,r=11061440;[-.5,3.5,7.8,12.3,16.9,21.5,26.1,30.7,35.3,39.9,44.5,49.1,53.7,56.9].forEach((f,g)=>{let _=g===4||g===9?"bad":g===12?"dead":g%5===2?"flicker":"steady";i(0,f,2.56,2.4,r,_)}),i(0,-1.4,2.56,2.6,s,"flicker"),i(-4.8,3.8,2.56,3,s,"steady"),i(-4.8,12,2.56,3,r,"flicker"),i(-11,12,2.56,2.6,r,"bad"),i(-15.7,18,2.56,2.5,r,"flicker"),i(-15.5,14.3,2.06,0,s,"dead",6,.7),i(4.8,4.5,2.56,2.4,16756838,"flicker"),i(4.8,12.5,2.56,2.6,r,"bad");let o=new Fe(9050640,1.2,4,1.9);o.position.set(-14.55,2.3,16.7),this.scene.add(o),this.box(-13.94,16.7,2.05,.08,.3,.5,t.rust,{geo:{ao:"wall"},collide:!1,cast:!1}),this.fluorescents.push({light:o,base:1.2,mode:"bad",phase:dt(0,6.28),seed:Math.random()*1e9|0,rng:Lt(Math.random()*1e9|0),x:-14.55,z:16.7,y:2.3,tube:null,flickState:1,flickT:0,userOff:!1}),[2.5,8.5,14.5,20.5,26.5,32.5,38.5,44.5,50.5,56.5,61.5].forEach((f,g)=>{i(0,f,5.06,2.4,r,g%3===0?"bad":"flicker",8)});let c=nt({color:9406070,roughness:.92}),u=nt({color:6972245,roughness:.85}),d=(f,g)=>this.fluorescents.find(_=>Math.abs(_.x-f)<.01&&Math.abs(_.z-g)<.01);this.props.switches=[];let h=[[-1.585,4.55,-4.8,3.8],[-1.585,11.35,-4.8,12],[1.585,4.3,4.8,4.5],[-1.775,49.95,0,49.1]];for(let[f,g,_,p]of h){let m=this.box(f,g,1.18,.02,.1,.14,c,{geo:{ao:"wall"},collide:!1,cast:!1}),y=new K(new jt(.016,.028,.045),u);y.position.set(f+(f>0?.017:-.017),1.26,g),this.scene.add(y);let x={plate:m,nub:y,fluor:d(_,p),on:!0,baseY:1.26};this.props.switches.push(x),this.regInteractable(m,"\u7535\u706F\u5F00\u5173",2,()=>{var v,S;return(S=(v=this.handlers).onSwitch)==null?void 0:S.call(v,x)})}}_buildNodes(){let t=[-1,3,7,11,15,19,23,27,31,35,39,43,47,51,55,57.5];for(let s of t)this.monsterNodes.push({x:0,z:s,y:0});let e=[4,12,20,28,36,44,52,62.5];for(let s of e)this.monsterNodes.push({x:0,z:s,y:2.8});this.monsterNodes.push({x:.75,z:60.5,y:2.8});for(let[s,r]of[[-4.8,4.5],[-2.8,13.8],[-11,12.5],[-15.5,17.5],[4.8,4.5],[4.8,12]])this.monsterNodes.push({x:s,z:r,y:0});this.ghostSpawns=[{x:-2.6,z:3.8,ry:0},{x:-2.6,z:10.6,ry:0},{x:2.6,z:10.6,ry:Math.PI},{x:2.6,z:3.6,ry:Math.PI},{x:-1.9,z:49.2,ry:0},{x:0,z:20,ry:Math.PI/2},{x:0,z:40,ry:Math.PI/2},{x:0,z:30,ry:0,y:2.8}];let i=(s,r,a,o,l,c=-10,u=10)=>{this.triggers.push({aabb:{x0:s,y0:c,z0:r,x1:a,y1:u,z1:o},id:l,fired:!1})};i(-8.4,0,-1.3,7.5,"kitchen",-.3,2),i(-8.4,7.5,-1.3,15.5,"living",-.3,2),i(-13.8,7.5,-8.4,15.5,"bedroom",-.3,2),i(-17.6,14.8,-13.8,21,"bathroom",-.3,2),i(-16.4,13.8,-14.6,14.8,"passage",-.3,2),i(1.3,0,8.4,8.5,"altar",-.3,2),i(1.3,8.5,8.4,15.5,"child",-.3,2),i(-2,10,2,58,"upper",2.3,8),i(-1.7,24,1.7,30,"corridorMid",0,2.2),i(-1.7,57.5,1.7,61,"stairsEast",0,2.2),this.exitBounds={x0:2.4,x1:10.3,z0:28.7,z1:32.8,y0:2.4,y1:4}}checkTriggers(t){var s,r,a,o;for(let l of this.triggers){if(l.fired)continue;let c=l.aabb;t.x>=c.x0&&t.x<=c.x1&&t.y>=c.y0&&t.y<=c.y1&&t.z>=c.z0&&t.z<=c.z1&&(l.fired=!0,(r=(s=this.handlers)[`zone_${l.id}`])==null||r.call(s,l))}let e=this.exitBounds,i=t.x>=e.x0&&t.x<=e.x1&&t.z>=e.z0&&t.z<=e.z1&&t.y>=e.y0&&t.y<=e.y1;i||(this.exitVisit=!1),this.exitDoor.open&&i&&!this.exitVisit&&(this.exitVisit=!0,(o=(a=this.handlers).zone_exitVoid)==null||o.call(a))}humLevel(t){let e=0;for(let i of this.fluorescents){if(i.light.intensity<=.05)continue;let s=Math.hypot(i.x-t.x,i.z-t.z);s<10&&(e=Math.max(e,(1-s/10)*Qt(i.light.intensity/i.base,0,1)))}return e}update(t,e,i=null,s=null,r=!1){var l,c,u,d;this.updateDoors(t,i),this._budgetT-=t,this._budgetT<0&&i&&(this._budgetT=.12,s&&this._viewDir.copy(s),this._applyLightBudget(i.x,i.y,i.z));let a=this.props.doll;if(a&&i){let h=i.x-a.mesh.position.x,f=i.z-a.mesh.position.z;if(h*h+f*f<36){let g=Math.atan2(h,f)-a.mesh.rotation.y;g=Math.atan2(Math.sin(g),Math.cos(g));let _=Qt(g,-1.15,1.15);a.head.rotation.y+=(_-a.head.rotation.y)*Math.min(1,t*.55)}}for(let h of this.candles){let f=.75+.25*Math.sin(e*9+h.phase)*Math.sin(e*13.7+h.phase*2);h.light.intensity=h.base*Qt(f+dt(-.08,.08),.3,1.2)}for(let h of this.props.batteries||[]){let f=.5+.5*Math.sin(e*3+h.phase);h.glow.intensity=.3+.7*f,h.halo.scale.setScalar(.85+.3*f),h.halo.material.opacity=.4+.6*f}for(let h=0;h<this.ofudas.length;h++)this.ofudas[h].rotation.z=Math.sin(e*.8+h*1.7)*.09;for(let h=0;h<(((l=this.props.ropes)==null?void 0:l.length)||0);h++)this.props.ropes[h].rotation.z=Math.sin(e*.7+h*1.9)*.05,this.props.ropes[h].rotation.x=Math.cos(e*.55+h)*.03;this.props.mobile&&(this.props.mobile.rotation.y=e*.5);let o=this.props.clock;if(o&&i){o.timer-=t;let h=i.x-o.mesh.position.x,f=i.z-o.mesh.position.z,g=h*h+f*f<25;o.state==="normal"&&o.mysterySolved&&g&&o.timer<=0&&Math.random()<.01?(o.state="back",o.timer=dt(2.5,5),o.mesh.material.map=this.tex.clockBack):o.state==="back"&&o.timer<=0&&(o.state="normal",o.timer=dt(50,110),o.mesh.material.map=this.tex.clock)}if(this.props.furin){let h=this.props.furin;h.rotation.z=Math.sin(e*1.7)*.05+Math.sin(e*4.3+1.2)*.03,h.rotation.x=Math.cos(e*1.3+.6)*.04+Math.sin(e*3.7)*.02}i&&(this.dripT=((c=this.dripT)!=null?c:0)-t,this.dripT<=0&&(this.dripT=dt(2.2,4.5),Math.hypot(i.x- -1.05,i.z-33)<7&&((d=(u=this.handlers).onDrip)==null||d.call(u))));for(let h of this.fluorescents){let f=1;if(h.kill||h.userOff)f=0;else if(r&&h.mode!=="dead")f=h.mode==="bad"?.55:1;else if(h.mode==="steady")f=1;else if(h.mode==="flicker"){if(h.flickT-=t,h.flickT<=0){let g=h.rng();h.flickState===1?g<.08?(h.flickState=g<.03?.05:.3,h.flickT=.04+h.rng()*.14):(h.flickState=1,h.flickT=.5+h.rng()*3.2):(h.flickState=1,h.flickT=.05+h.rng()*.3)}f=h.flickState}else h.mode==="bad"?f=Math.sin(e*31+h.phase)>.3?.5+h.rng()*.4:.04:h.mode==="dead"&&(f=0);h.boost>0&&(h.boost-=t,f*=1.8),h.light.intensity=h.base*f,h.tube&&(h.tube.material=f>.25?this.tubeMat:this.tubeOffMat)}}};function en(n,t,e,i=[],s=null){let r=new I().subVectors(t,n),a=r.length();if(a<.001)return!1;let o=new gn(n,r.divideScalar(a)),l=new I,c=new ri,u=d=>!d||d===s?!1:(c.min.set(d.x0,d.y0,d.z0),c.max.set(d.x1,d.y1,d.z1),o.intersectBox(c,l)!==null&&l.distanceTo(n)<a-.065);return e.some(u)||i.some(d=>u(d.collider))}var N1=13616820,Eo=class{constructor(t,e){this.scene=t,this.tex=e,this.state="dormant",this.speed=0,this.pos=new I,this.group=new Ot,this.visible=!0,this._build(),this.scene.add(this.group),this.group.visible=!1,this.stareTimer=0,this.litTimer=0,this.teleportTimer=dt(1.5,2.5),this.stepTimer=0,this.stuckTime=0,this.lastPos=new I,this.walkPhase=0,this.twitchTimer=dt(.3,1),this.headRot=new I,this.headTarget=new I,this.char=Bs(0,0,0,.28,1.9),this.attackTimer=0,this.tempLife=null}_build(){let t=this.tex,e=nt({map:t.skin,roughness:.95,color:N1}),i=nt({color:920586,roughness:.95}),s=(y,x,v,S=0,M=0,b=0)=>{let U=new K(y,x);return U.position.set(S,M,b),U.castShadow=!0,U.receiveShadow=!0,v.add(U),U};this.legL=new Ot,this.legR=new Ot,this.legL.position.set(-.14,.95,0),this.legR.position.set(.14,.95,0),this.group.add(this.legL,this.legR);for(let y of[this.legL,this.legR])s(new St(.065,.042,.91,18),e,y,0,-.45,0),s(new He(.068,16,10),e,y,0,-.49,.01),s(new jt(.105,.055,.23),i,y,0,-.92,.06);let r=new He(.17,20,12);r.scale(1,.65,.65),s(r,e,this.group,0,.96,0),this.torso=new Ot,this.torso.position.set(0,1.4,0),this.group.add(this.torso);let a=new St(.22,.16,.85,24,8);a.scale(1,1,.65);let o=a.attributes.position;for(let y=0;y<o.count;y++){let x=o.getY(y);if(x>.15){let v=1-(x-.15)/.75*.22;o.setX(y,o.getX(y)*v),o.setZ(y,o.getZ(y)*v)}}a.computeVertexNormals(),s(a,e,this.torso);let l=new K(new ie(.3,.24),Se({map:t.blood,transparent:!0,depthWrite:!1}));l.position.set(0,.12,.135),l.renderOrder=2,this.torso.add(l),this.headG=new Ot,this.headG.position.set(0,2,.02),this.group.add(this.headG),s(new St(.047,.068,.34,16),e,this.headG,0,-.12,0);let c=new He(.19,28,20);c.scale(.86,1.2,.82);let u=s(c,e,this.headG,0,.18,.01);u.name="monsterHead";let d=new ie(.26,.34,12,14),h=d.attributes.position;for(let y=0;y<h.count;y++){let x=h.getX(y)/.13,v=h.getY(y)/.17;h.setZ(y,-.035*(x*x+v*v))}d.computeVertexNormals();let f=new K(d,nt({map:t.face,roughness:1}));f.position.set(0,.18,.152),this.headG.add(f),this.jaw=new Ot,this.jaw.position.set(0,.08,.02),this.headG.add(this.jaw);let g=new He(.1,20,12);g.scale(1,.5,1),s(g,e,this.jaw,0,-.04,.02);let _=nt({color:1705221,emissive:9049104,emissiveIntensity:0});this.eyeL=new K(new jt(.045,.05,.02),_),this.eyeR=this.eyeL.clone(),this.eyeL.position.set(-.07,.2,.156),this.eyeR.position.set(.07,.2,.156),this.headG.add(this.eyeL,this.eyeR),this.eyeMat=_;for(let y=0;y<14;y++){let x=y/14*Math.PI*2,v=Math.cos(x)*.12,S=Math.sin(x)*.11,M=new Ds([new I(v*.5,.4,S*.5),new I(v,.32,S),new I(v*1.2,.14,S*1.3),new I(v*1.1,-.13-y%3*.04,S*1.4)]);s(new so(M,8,.012+y%3*.002,5,!1),i,this.headG)}this.armL=new Ot,this.armR=new Ot,this.armL.position.set(-.26,1.94,0),this.armR.position.set(.26,1.94,0),this.group.add(this.armL,this.armR);for(let[y,x]of[[this.armL,1.22],[this.armR,1.34]])s(new St(.057,.044,x*.46,18),e,y,0,-x*.23,.02),s(new He(.061,16,10),e,y,0,-x*.46,.02),s(new St(.044,.031,x*.54,18),e,y,0,-x*.73,.02);let p=new He(.075,16,12);p.scale(.8,1.3,.65),s(p,e,this.armL,0,-1.28,0),s(p,e,this.armR,0,-1.4,0);for(let y of[this.armL,this.armR])for(let x=0;x<4;x++){let v=s(Re(.014,.12,.014,{jitter:.004}),e,y,-.045+x*.03,-1.52,0);v.rotation.x=.3+x%2*.18}this.armL.rotation.x=-.18,this.armR.rotation.x=-.24;for(let y=0;y<4;y++){let x=s(Re(.1,.07,.05,{jitter:.012}),e,this.torso,0,.1+y*.19,-.14);x.rotation.x=.35}this.cloth=[];let m=nt({color:1578e3,roughness:.95,side:ae});for(let y=0;y<5;y++){let x=s(Re(.08+dt(0,.06),.4+dt(0,.3),.02,{jitter:.02}),m,this.torso,dt(-.2,.2),-.3+dt(0,.2),.02);x.rotation.x=dt(-.25,.25),this.cloth.push(x)}this.group.scale.setScalar(1)}spawn(t,e="stalk"){this.pos.copy(t),this.group.position.copy(t),this.group.visible=!0,this.visible=!0,this.state=e,this.stareTimer=0,this.litTimer=0,this.stuckTime=0,this.attackTimer=0,this.tempLife=null,this.lastPos.copy(t),this._syncChar()}despawn(){this.state="dormant",this.group.visible=!1}_syncChar(){let t=this.char;t.x0=this.pos.x-.28,t.x1=this.pos.x+.28,t.z0=this.pos.z-.28,t.z1=this.pos.z+.28,t.y0=this.pos.y,t.y1=this.pos.y+1.9}update(t,e){var p,m,y,x;if(this.state==="dormant"||this.state==="gone")return;if(this.tempLife!==null&&(this.tempLife-=t,this.tempLife<=0)){this.tempLife=null,this.despawn();return}let i=e.player,s=i.x-this.pos.x,r=i.z-this.pos.z,a=Math.hypot(s,r),o=new I(s,0,r).normalize(),c=Math.abs(i.y-this.pos.y)<1&&!en(this.pos.clone().add(new I(0,1.4,0)),i.clone().add(new I(0,1.3,0)),e.colliders,e.doors),u=c&&o.dot(e.lookDir)<-.55,d=this.state==="chase"?2:.7;this.walkPhase+=t*d*6.5*(this.state==="attack"?0:1);let h=this.state==="attack"?0:this.state==="chase"?.62:.3;this.legL.rotation.x=Math.sin(this.walkPhase)*h,this.legR.rotation.x=-Math.sin(this.walkPhase)*h,this.armL.rotation.x=-.18+Math.sin(this.walkPhase+Math.PI)*h*.7,this.armR.rotation.x=-.24+Math.sin(this.walkPhase)*h*.7,this.torso.rotation.z=Math.sin(this.walkPhase)*.045,this.torso.rotation.x=-.16+Math.abs(Math.sin(this.walkPhase))*.05,this.group.position.y=this.pos.y+Math.abs(Math.sin(this.walkPhase))*.03,this.twitchTimer-=t,this.twitchTimer<=0&&(this.twitchTimer=dt(.35,1.1),this.headTarget.set(dt(-.15,.25),dt(-.5,.5),dt(-.3,.3)),u&&a<20&&this.headTarget.set(-.05,0,.06));let f=Math.min(1,t*6);this.headRot.x=ei(this.headRot.x,this.headTarget.x,f),this.headRot.y=ei(this.headRot.y,this.headTarget.y,f),this.headRot.z=ei(this.headRot.z,this.headTarget.z,f),this.headG.rotation.set(this.headRot.x,this.headRot.y,this.headRot.z);let g=this.state==="chase"?.3+Math.sin(this.walkPhase*2.1)*.08:this.state==="attack"?.55:0;this.jaw.rotation.x=ei(this.jaw.rotation.x,g,Math.min(1,t*8));let _=this.state==="chase"||this.state==="attack";this.eyeMat.emissiveIntensity=ei(this.eyeMat.emissiveIntensity,_?.75+.45*Math.sin(this.walkPhase*9):0,Math.min(1,t*6));for(let v=0;v<this.cloth.length;v++)this.cloth[v].rotation.z=Math.sin(this.walkPhase*2.3+v*1.4)*.12;if(e.flashHit&&a<22&&!e.reduceEffects?this.visible=Math.sin(e.time*88+this.walkPhase)>-.15:this.visible=!0,this.group.visible=this.visible&&this.state!=="gone",this.tempLife!==null){this.lastPos.copy(this.pos);return}this.state==="stalk"&&(e.flashHit&&a<22?(this.litTimer+=t,this.litTimer>.9&&this._enterChase(e)):this.litTimer=Math.max(0,this.litTimer-t*2),u&&a<15&&!e.flashHit?(this.stareTimer+=t,this.stareTimer>1.15&&this._enterChase(e)):this.stareTimer=Math.max(0,this.stareTimer-t),!u&&a>9&&a<40&&(this.teleportTimer-=t,this.teleportTimer<=0&&(this.teleportTimer=dt(1.6,3.2),this._teleportNear(e,7.5,10),e.audio.whisper(0,1.2))),a>13&&!u?this._moveToward(e,t,.9):a>26&&this._moveToward(e,t,1.5)),this.state==="chase"&&(this._moveToward(e,t,3.3),this.stepTimer-=t,this.stepTimer<=0&&(this.stepTimer=.5,e.audio.thud()),a<1.3&&c&&e.time>0&&(this.state="attack",this.attackTimer=.42,this._teleportTowardPlayer(e,.55),e.audio.sting(),(m=(p=e.game)==null?void 0:p.onMonsterAttack)==null||m.call(p)),a>30&&(this._teleportNear(e,18,24),this.state="stalk",this.litTimer=0)),this.state==="attack"&&(this.armL.rotation.x=ei(this.armL.rotation.x,-2.6,t*9),this.armR.rotation.x=ei(this.armR.rotation.x,-2.7,t*9),this.headG.rotation.set(-.12,this.headRot.y,0),this.attackTimer-=t,this.attackTimer<=0&&(this.state="gone",this.group.visible=!1,(x=(y=e.game)==null?void 0:y.onMonsterAttackEnd)==null||x.call(y))),this.lastPos.copy(this.pos)}_enterChase(t){var e,i;this.state==="stalk"&&(this.state="chase",this.stepTimer=0,t.audio.moan(0),t.audio.duck(),(i=(e=t.game)==null?void 0:e.onChaseStart)==null||i.call(e))}_moveToward(t,e,i){var f,g;let s=t.player,r=s.x,a=s.z,o=jh(t.stairs||[],this.pos,s);o&&(r=o.x,a=o.z);let l=r-this.pos.x,c=a-this.pos.z,u=Math.max(1e-4,Math.hypot(l,c)),d=Math.min(u,i*e);if(this._syncChar(),yo(this.char,l/u*d,-.12,c/u*d,t.colliders,.4,{bodyHeight:1}),this.pos.x=(this.char.x0+this.char.x1)/2,this.pos.z=(this.char.z0+this.char.z1)/2,this.pos.y=this.char.y0,this.group.position.x=this.pos.x,this.group.position.z=this.pos.z,this.group.position.y=this.pos.y+Math.abs(Math.sin(this.walkPhase))*.03,d>1e-4){let p=Math.atan2(l,c)-this.group.rotation.y;p=Math.atan2(Math.sin(p),Math.cos(p)),this.group.rotation.y+=p*Math.min(1,e*5)}let h=Math.hypot(this.pos.x-this.lastPos.x,this.pos.z-this.lastPos.z);if(this.state==="chase"&&h<.008){if(this.stuckTime+=e,this.stuckTime>.9){let _=!1;for(let p of t.doors)if(!p.locked&&!p.open){let m=p.hinge;if(Math.hypot(m.x-this.pos.x,m.z-this.pos.z)<1.4){(g=(f=t.game)==null?void 0:f.level)==null||g.forceOpen(p),t.audio.doorOpen(),_=!0;break}}this.stuckTime>2.2?(this._teleportNear(t,5,9),this.stuckTime=0):_&&(this.stuckTime=0)}}else this.stuckTime=0}_teleportNear(t,e,i){let s=t.nodes,r=null,a=1/0;for(let o of s){if(Math.abs(o.y-t.player.y)>.5)continue;let l=Math.hypot(o.x-t.player.x,o.z-t.player.z);if(l<e||l>i||this._hitWall(o.x,o.y,o.z,t.colliders))continue;let c=Math.abs(l-(e+i)/2);c<a&&(a=c,r=o)}r&&(this.pos.set(r.x,r.y,r.z),this.group.position.set(r.x,r.y,r.z),this._syncChar())}_teleportTowardPlayer(t,e){let i=t.player.x-this.pos.x,s=t.player.z-this.pos.z,r=Math.max(.001,Math.hypot(i,s)),a=i/r,o=s/r;for(let l of[e,.8,1.1,1.5]){let c=t.player.x-a*l,u=t.player.z-o*l;if(!this._hitWall(c,t.player.y,u,t.colliders)){this.pos.x=c,this.pos.z=u,this.pos.y=t.player.y,this.group.position.copy(this.pos),this._syncChar();return}}}_hitWall(t,e,i,s){for(let a of s)if(a.x0<t+.28&&a.x1>t-.28&&a.z0<i+.28&&a.z1>i-.28&&a.y1>e+.1&&a.y0<e+1.9)return!0;return!1}},wo=class{constructor(t){this.scene=t,this.group=new Ot,this.group.visible=!1,this.opacity=0,this.mats=[],this._build(),this.scene.add(this.group),this.life=0,this.bob=dt(0,6)}_build(){let t=new Be({color:14541800,transparent:!0,opacity:.45,depthWrite:!1});this.mats.push(t);let e=new Be({color:658448}),i=(o,l,c,u,d,h)=>{let f=new K(new jt(o,l,c),t);return f.position.set(u,d,h),this.group.add(f),f};i(.3,.7,.18,0,1.05,0),i(.28,.3,.26,0,1.5,0),this.ghostArmL=i(.14,.68,.14,-.42,1,0),this.ghostArmR=i(.14,.68,.14,.42,1,0),i(.13,.68,.13,-.09,.34,0),i(.13,.68,.13,.09,.34,0);let s=new K(new jt(.5,.9,.34),t);s.position.set(0,.5,0),this.group.add(s);let r=new K(new jt(.05,.06,.02),e);r.position.set(-.06,1.52,.135);let a=r.clone();a.position.x=.06,this.group.add(r,a);for(let o=0;o<4;o++){let l=new K(new jt(.06,.4+dt(0,.2),.03),e);l.position.set(dt(-.12,.12),1.62,dt(-.08,.02)),this.group.add(l)}}appearAt(t,e,i,s){this.group.position.set(t,e,i),this.group.rotation.y=s,this.group.visible=!0,this.life=1.9,this.opacity=0,this.group.scale.setScalar(.96)}hide(){this.group.visible=!1,this.life=0}update(t,e){if(!this.group.visible)return;this.bob+=t,this.group.position.y+=Math.sin(this.bob*1.6)*.002,this.ghostArmL.rotation.z=-.18+Math.sin(this.bob*.7)*.05,this.ghostArmR.rotation.z=.18+Math.cos(this.bob*.8)*.05,Math.random()<.05&&(this.opacity*=.55);let s=Math.atan2(e.x-this.group.position.x,e.z-this.group.position.z)-this.group.rotation.y;s=Math.atan2(Math.sin(s),Math.cos(s)),this.group.rotation.y+=s*Math.min(1,t*.8),this.life-=t;let r=this.life>.55?.42:0;this.opacity=ei(this.opacity,r,t*6);for(let a of this.mats)a.opacity=this.opacity;this.life<=0&&this.hide()}};var Xs="echo_apartment_campaign_v2",wn={invitation:{title:"\u4E00\u5C01\u6CA1\u6709\u7F72\u540D\u7684\u4FE1",location:"\u5927\u5385 \xB7 \u503C\u73ED\u53F0",item:"\u5931\u7269\u62DB\u9886\u51FD",cn:`\u81F4\u4E03\u6708\u5341\u56DB\u65E5\u79BB\u5F00\u7684\u4F4F\u6237\uFF1A

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

\u4E0D\u662F\u6CA1\u6709\u4EBA\u542C\u5230\u3002\u4ED6\u5DF2\u7ECF\u8D70\u5230\u8FD9\u91CC\uFF0C\u8BD5\u7740\u627E\u8FC7\u522B\u4EBA\u3002
\u536B\u751F\u7AD9\u7684\u63A5\u7EBF\u8BB0\u5F55\u5E94\u5F53\u8FD8\u5728\u3002`},27:{title:"\u6551\u63F4\u63A5\u7EBF\u8BB0\u5F55",location:"\u793E\u533A \xB7 \u8857\u533A\u536B\u751F\u7AD9",item:"\u793E\u533A\u8BB0\u5F55 03",cn:`02:25\uFF0C\u51C6\u5907\u6D3E\u4EBA\u524D\u5F80\u56DE\u58F0\u516C\u5BD3\u3002
02:28\uFF0C\u7BA1\u7406\u5904\u56DE\u7535\uFF1A\u8BEF\u62A5\uFF0C\u5DF2\u786E\u8BA4\u697C\u5185\u65E0\u4EBA\u88AB\u56F0\u3002
02:31\uFF0C\u53D6\u6D88\u51FA\u8F66\u3002

\u503C\u73ED\u62A4\u58EB\u5728\u4E0B\u9762\u8865\u4E86\u4E00\u53E5\uFF1A\u6211\u6CA1\u6709\u542C\u89C1\u5B69\u5B50\u4EB2\u53E3\u8BF4\u5B89\u5168\u3002

\u6551\u63F4\u53F0\u8981\u6C42\u91CD\u65B0\u547C\u53EB\u65F6\u540C\u65F6\u62A5\u51FA\u5730\u70B9\u548C\u59D3\u540D\u3002\u9891\u9053 14.07\uFF0C\u9762\u677F\u8F93\u5165 1407\u3002\u63A5\u901A\u524D\u4E0D\u8981\u677E\u5F00\u901A\u8BDD\u952E\u3002

\u8FD9\u4E00\u6B21\uFF0C\u628A\u4F60\u77E5\u9053\u7684\u8BF4\u5B8C\u3002`}},us=[{title:"\u6765\u4FE1",subtitle:"\u6709\u4E9B\u5931\u7269\uFF0C\u4E00\u76F4\u5728\u7B49\u4F60\u3002"},{title:"\u505C\u7535\u7684\u90A3\u4E00\u591C",subtitle:"\u8FD9\u680B\u697C\u8BB0\u5F97\u4F60\u9057\u5FD8\u7684\u4E8B\u60C5\u3002"},{title:"\u6CA1\u6709\u7ED3\u675F\u7684\u6349\u8FF7\u85CF",subtitle:"\u6B4C\u505C\u4E4B\u540E\uFF0C\u8C01\u4E5F\u6CA1\u6709\u6765\u3002"},{title:"\u7167\u7247\u91CC\u5C11\u4E86\u4E00\u4E2A\u4EBA",subtitle:"\u88AB\u62B9\u53BB\u7684\u540D\u5B57\uFF0C\u8FD8\u7559\u5728\u5E95\u7247\u4E0A\u3002"},{title:"\u4E95\u4E0B\u7684\u6765\u7535",subtitle:"\u90A3\u4E00\u591C\u6CA1\u6709\u53D1\u51FA\u7684\u6C42\u6551\uFF0C\u7EC8\u4E8E\u6709\u4EBA\u56DE\u7B54\u3002"},{title:"\u628A\u540D\u5B57\u5E26\u51FA\u53BB",subtitle:"\u8FD9\u4E00\u6B21\uFF0C\u522B\u518D\u72EC\u81EA\u79BB\u5F00\u3002"}],k1=["invitation","power","cabinet","tapePlayed","memory","photo","generator","relay","released","ended"],ru=["serviceKey","fuse","archiveKey","tape","valveHandle","exitKey","westKey","film","developer","annexKey","relayFuse"],F1=Object.keys(wn),Vs=(n,t)=>Array.isArray(n)&&n.length===t.length&&n.every((e,i)=>e===t[i]),Ws=class{constructor(t=null){this.flags={},this.items=new Set,this.documents=new Set,this.checkpoint={x:0,y:0,z:-6.4},this.elapsed=0,this.events=new Set,t&&this.restore(t)}get chapter(){return this.flags.relay?5:this.flags.photo?4:this.flags.memory?3:this.flags.cabinet?2:this.flags.power?1:0}get objective(){return this.flags.invitation?!this.items.has("fuse")&&!this.flags.power?"\u5230\u4E00\u697C\u53A8\u623F\u5BFB\u627E\u5907\u7528\u7194\u65AD\u5668":this.flags.power?!this.flags.cabinet&&!this.documents.has("2")?"\u8C03\u67E5\u4E00\u697C\u4F5B\u95F4\u7684\u65E7\u62A5\u7EB8\uFF0C\u5BFB\u627E\u6863\u6848\u67DC\u5BC6\u7801":this.flags.cabinet?this.items.has("tape")?this.flags.tapePlayed?!this.flags.memory&&!this.documents.has("3")?"\u5BFB\u627E\u4E00\u697C\u513F\u7AE5\u623F\u7684\u753B\uFF0C\u8FA8\u8BA4\u516B\u97F3\u76D2\u65CB\u5F8B":this.flags.memory?!this.flags.photo&&!this.items.has("film")?"\u7528\u516B\u97F3\u76D2\u91CC\u7684\u94A5\u5319\u6253\u5F00\u4E8C\u697C\u897F\u7FFC\uFF0C\u5230 204 \u5BFB\u627E\u5E95\u7247":!this.flags.photo&&!this.items.has("developer")?"\u5728\u897F\u7FFC\u4F4F\u6237\u7EAA\u5FF5\u5BA4\u53D6\u56DE\u663E\u5F71\u6DB2":this.flags.photo?!this.flags.generator&&!this.items.has("relayFuse")?"\u7528\u76F8\u7EB8\u5939\u5C42\u7684\u94A5\u5319\u8FDB\u5165\u5730\u4E0B\u65E7\u533A\uFF0C\u5728\u642C\u8FC1\u6863\u6848\u5E93\u627E\u8F93\u51FA\u7194\u65AD\u5668":this.flags.generator?!this.flags.relay&&!this.documents.has("27")?"\u4ECE\u5927\u5385\u5916\u95E8\u8FDB\u5165\u793E\u533A\uFF0C\u5230\u536B\u751F\u7AD9\u67E5\u660E\u6551\u63F4\u4E3A\u4F55\u53D6\u6D88":this.flags.relay?!this.flags.released&&!this.items.has("valveHandle")?"\u5230\u4E00\u697C\u4E1C\u7FFC\u7EF4\u4FEE\u5BA4\u53D6\u56DE\u6392\u6C34\u9600\u624B\u8F6E":this.flags.released?"\u5E26\u7740\u82CD\u592A\u7684\u540D\u5B57\uFF0C\u524D\u5F80\u4E8C\u697C\u5929\u4E95\u9632\u706B\u95E8":"\u8FD4\u56DE\u5730\u4E0B\u6392\u6C34\u95F4\uFF0C\u88C5\u56DE\u624B\u8F6E\u5E76\u8F6C\u5F00\u4E09\u53EA\u9600\u95E8":"\u5E26\u7740\u536B\u751F\u7AD9\u7684\u8BB0\u5F55\u56DE\u5730\u4E0B\u7535\u53F0\uFF0C\u91CD\u65B0\u53D1\u51FA\u6551\u63F4\u547C\u53EB":"\u5230\u5730\u4E0B\u65E7\u533A\u53D1\u7535\u673A\u623F\uFF0C\u6062\u590D\u7535\u53F0\u5907\u7528\u8F93\u51FA":"\u5230\u4E8C\u697C\u897F\u7FFC\u6697\u623F\uFF0C\u6D17\u51FA\u4E09\u53F7\u5BA4\u7684\u5168\u5BB6\u798F":"\u56DE\u5230\u4E00\u697C\u513F\u7AE5\u623F\uFF0C\u8BA9\u516B\u97F3\u76D2\u518D\u6B21\u54CD\u8D77":"\u8FDB\u5165\u4E8C\u697C 203 \u653E\u6620\u5BA4\uFF0C\u64AD\u653E\u5F55\u97F3\u5E26":"\u5728\u4E8C\u697C 202 \u53F7\u5BA4\u53D6\u56DE\u5F55\u97F3\u5E26":"\u4E0A\u4E8C\u697C\uFF0C\u5728 201 \u7BA1\u7406\u5BA4\u6253\u5F00\u6863\u6848\u67DC":"\u4ECE\u8D70\u5ECA\u7EF4\u4FEE\u95E8\u4E0B\u697C\uFF0C\u6062\u590D\u5730\u4E0B\u5907\u7528\u7535\u6E90":"\u8C03\u67E5\u5165\u53E3\u5927\u5385\u503C\u73ED\u53F0\u4E0A\u6CA1\u6709\u7F72\u540D\u7684\u4FE1"}get hint(){return this.flags.invitation?this.flags.power?this.flags.cabinet?this.flags.tapePlayed?this.flags.memory?this.flags.photo?this.flags.generator?!this.flags.relay&&!this.documents.has("27")?"\u6062\u590D\u4F9B\u7535\u540E\uFF0C\u5927\u5385\u5916\u95E8\u53EF\u4EE5\u6253\u5F00\u3002\u7A7F\u8FC7\u4E2D\u5EAD\uFF0C\u53F3\u4FA7\u536B\u751F\u7AD9\u524D\u53F0\u4FDD\u5B58\u7740\u6551\u63F4\u63A5\u7EBF\u8BB0\u5F55\u3002":this.flags.relay?!this.flags.released&&!this.items.has("valveHandle")?"\u4E1C\u7FFC\u5165\u53E3\u5728\u4E00\u697C\u957F\u8D70\u5ECA\u53F3\u4FA7\u3002\u624B\u8F6E\u7559\u5728\u7BA1\u7406\u5458\u7EF4\u4FEE\u5BA4\u7684\u5DE5\u5177\u53F0\u4E0A\u3002":this.flags.released?"\u9632\u706B\u95E8\u5728\u4E8C\u697C\u8D70\u5ECA\u4E2D\u6BB5\u3002\u4FDD\u6301\u7535\u91CF\uFF1B\u8863\u67DC\u53EF\u4EE5\u8EB2\u85CF\uFF0C\u4F46\u522B\u5728\u5B83\u773C\u524D\u8EB2\u8FDB\u53BB\u3002":"\u5E26\u624B\u8F6E\u5230\u5730\u4E0B\u6392\u6C34\u95F4\u3002\u5F55\u97F3\u8BB0\u5F55\u7740\u64CD\u4F5C\u6B21\u5E8F\uFF1A\u6CC4\u538B\u3001\u6392\u6C34\u3001\u56DE\u6C34\u3002":"\u7535\u53F0\u5728\u65E7\u533A\u5C3D\u5934\u3002\u9891\u9053\u8868\u6807\u660E 14.07 MHz\uFF0C\u53BB\u6389\u5C0F\u6570\u70B9\uFF0C\u8F93\u5165 1407\u3002":"\u65E7\u533A\u5165\u53E3\u5728\u5730\u4E0B\u914D\u7535\u95F4\u6700\u91CC\u9762\u3002\u8F93\u51FA\u7194\u65AD\u5668\u5728\u6863\u6848\u5E93\u7EFF\u8272\u7EF4\u4FEE\u76D2\uFF0C\u67F4\u6CB9\u673A\u6309\u9884\u70ED\u3001\u4F9B\u6CB9\u3001\u8F93\u51FA\u542F\u52A8\u3002":"\u897F\u7FFC\u5165\u53E3\u5728\u4E8C\u697C\u9760\u8FD1\u697C\u68AF\u95F4\u7684\u5DE6\u4FA7\u3002204 \u684C\u4E0A\u6709\u5E95\u7247\uFF0C\u5317\u9762\u7684\u7EAA\u5FF5\u5BA4\u6709\u663E\u5F71\u6DB2\u3002\u6697\u623F\u7EA2\u706F\u65C1\u8BB0\u5F55\u7740\u51B2\u6D17\u987A\u5E8F\u3002":"\u753B\u4E0A\u6807\u51FA\u4E86\u7B2C 3\u3001\u7B2C 1\u3001\u7B2C 4 \u6839\u7EBF\u3002\u6309\u8FD9\u4E2A\u987A\u5E8F\u5F39\u594F\u56DB\u4E2A\u97F3\u3002":"202 \u5728\u4E8C\u697C\u8D70\u5ECA\u53F3\u4FA7\uFF0C203 \u5728\u5DE6\u4FA7\u3002\u9700\u8981\u6863\u6848\u67DC\u91CC\u7684\u94A5\u5319\u3002":"\u4F5B\u95F4\u526A\u62A5\u63D0\u793A\u7528\u505C\u7535\u65F6\u523B\u4F5C\u4E3A\u5BC6\u7801\uFF1B\u5899\u4E0A\u7684\u949F\u505C\u5728 02:17\u3002":this.items.has("fuse")?"\u7EF4\u4FEE\u95E8\u5728\u4E00\u697C\u957F\u8D70\u5ECA\u53F3\u4FA7\u3002\u914D\u7535\u7BB1\u65C1\u7684\u68C0\u4FEE\u5361\u8BB0\u5F55\u7740\u5408\u95F8\u987A\u5E8F\u3002":"\u53A8\u623F\u5728\u7384\u5173\u5DE6\u4FA7\u7B2C\u4E00\u6247\u95E8\u540E\u3002\u7194\u65AD\u5668\u653E\u5728\u9760\u5899\u7684\u5DE5\u5177\u76D2\u91CC\u3002":"\u5165\u53E3\u5927\u5385\u5DE6\u4FA7\u503C\u73ED\u53F0\u4E0A\u7684\u4FE1\u53EF\u4EE5\u8C03\u67E5\u3002\u6309 E\uFF0C\u6216\u70B9\u51FB\u53F3\u4FA7\u8C03\u67E5\u6309\u94AE\u3002"}collectDocument(t){let e=String(t);return!wn[e]||this.documents.has(e)?!1:(this.documents.add(e),e==="invitation"&&(this.flags.invitation=!0,this.items.add("serviceKey")),!0)}collectItem(t){return!ru.includes(t)||this.items.has(t)||["westKey","film","developer"].includes(t)&&!this.flags.memory||(t==="film"||t==="developer")&&this.flags.photo||["annexKey","relayFuse"].includes(t)&&!this.flags.photo||t==="relayFuse"&&this.flags.generator?!1:(this.items.add(t),!0)}perform(t,e){let i=s=>({ok:!1,message:s});if(t==="power"){if(this.flags.power)return i("\u5907\u7528\u7535\u6E90\u5DF2\u7ECF\u63A5\u901A\u3002");if(!this.flags.invitation||!this.items.has("fuse"))return i("\u7194\u65AD\u5668\u70E7\u65AD\u4E86\u3002\u53A8\u623F\u5E94\u8BE5\u6709\u5907\u7528\u4EF6\u3002");if(!Vs(e,[2,0,1]))return i("\u4FDD\u62A4\u5F00\u5173\u8DF3\u95F8\u4E86\u3002\u5148\u542F\u52A8\u6392\u6C34\uFF0C\u518D\u542F\u52A8\u8D70\u5ECA\u4E0E\u4F4F\u6237\u7535\u6E90\u3002");this.flags.power=!0,this.items.delete("fuse"),this.checkpoint={x:13.2,y:-2.8,z:20.5}}else if(t==="cabinet"){if(!this.flags.power)return i("\u7535\u5B50\u9501\u6CA1\u6709\u7535\u3002\u5148\u6062\u590D\u5730\u4E0B\u7535\u6E90\u3002");if(this.flags.cabinet)return i("\u6863\u6848\u67DC\u5DF2\u7ECF\u6253\u5F00\u3002");if(String(e)!=="0217")return i("\u5BC6\u7801\u4E0D\u5BF9\u3002\u526A\u62A5\u4E0A\u8BF4\uFF0C\u662F\u505C\u7535\u7684\u65F6\u523B\u3002");this.flags.cabinet=!0,this.items.add("archiveKey"),this.checkpoint={x:-2.8,y:2.8,z:21.2}}else if(t==="tape"){if(!this.items.has("archiveKey"))return i("\u9700\u8981\u7BA1\u7406\u5BA4\u6863\u6848\u67DC\u91CC\u7684\u94A5\u5319\u3002");if(!this.items.has("tape"))return i("\u6CA1\u6709\u5F55\u97F3\u5E26\u3002202 \u53F7\u5BA4\u91CC\u8FD8\u7559\u7740\u4E00\u76D8\u3002");if(this.flags.tapePlayed)return i("\u90A3\u4E00\u591C\u7684\u5F55\u97F3\u5DF2\u7ECF\u6536\u8FDB\u8C03\u67E5\u624B\u518C\u3002");this.flags.tapePlayed=!0,this.collectDocument(5)}else if(t==="music"){if(!this.flags.tapePlayed)return i("\u53D1\u6761\u5361\u4F4F\u4E86\u3002\u5148\u627E\u5230\u5E76\u64AD\u653E\u4E8C\u697C\u7684\u5F55\u97F3\u5E26\u3002");if(this.flags.memory)return i("\u516B\u97F3\u76D2\u7684\u5939\u5C42\u5DF2\u7ECF\u6253\u5F00\u3002");if(!Vs(e,[3,1,4]))return i("\u65CB\u5F8B\u4E0D\u5BF9\u3002\u5B69\u5B50\u7684\u753B\u91CC\u7559\u4E0B\u4E86\u4E09\u4E2A\u97F3\u7B26\u3002");this.flags.memory=!0,this.items.add("westKey"),this.collectDocument(7),this.checkpoint={x:2.8,y:0,z:10.7}}else if(t==="develop"){if(!this.flags.memory)return i("\u8FD8\u6CA1\u6709\u627E\u5230\u897F\u7FFC\u7684\u94A5\u5319\u3002\u5148\u8BA9\u516B\u97F3\u76D2\u54CD\u8D77\u6765\u3002");if(this.flags.photo)return i("\u5168\u5BB6\u798F\u5DF2\u7ECF\u6D17\u51FA\u6765\u4E86\u3002");if(!this.items.has("film"))return i("\u9700\u8981 204 \u6444\u5F71\u5E08\u65E7\u5C45\u91CC\u7684\u90A3\u5377\u5E95\u7247\u3002");if(!this.items.has("developer"))return i("\u663E\u5F71\u6DB2\u7528\u5B8C\u4E86\u3002\u5317\u9762\u7684\u4F4F\u6237\u7EAA\u5FF5\u5BA4\u91CC\u6709\u4E00\u74F6\u3002");if(!Vs(e,[0,2,1,3]))return i("\u7EB8\u4E0A\u7684\u5F71\u50CF\u6563\u5F00\u4E86\u3002\u5148\u663E\u5F71\uFF0C\u518D\u505C\u663E\u3001\u5B9A\u5F71\uFF0C\u6700\u540E\u6C34\u6D17\u3002");this.flags.photo=!0,this.items.add("annexKey"),this.items.delete("film"),this.items.delete("developer"),this.collectDocument(14),this.checkpoint={x:-25,y:2.8,z:50.5}}else if(t==="generator"){if(!this.flags.photo)return i("\u5730\u4E0B\u65E7\u533A\u4ECD\u7136\u9501\u7740\u3002\u5148\u6D17\u51FA\u5168\u5BB6\u798F\u3002");if(this.flags.generator)return i("\u5907\u7528\u67F4\u6CB9\u673A\u5DF2\u7ECF\u542F\u52A8\u3002");if(!this.items.has("relayFuse"))return i("\u8F93\u51FA\u7194\u65AD\u5668\u7F3A\u5931\u3002\u65E7\u533A\u6863\u6848\u5E93\u7684\u7EFF\u8272\u7EF4\u4FEE\u76D2\u91CC\u6709\u5907\u4EF6\u3002");if(!Vs(e,[1,0,2]))return i("\u67F4\u6CB9\u673A\u6CA1\u6709\u8D77\u52A8\u3002\u5148\u9884\u70ED\uFF0C\u518D\u4F9B\u6CB9\uFF0C\u6700\u540E\u63A5\u901A\u8F93\u51FA\u3002");this.flags.generator=!0,this.items.delete("relayFuse"),this.checkpoint={x:31,y:-2.8,z:40}}else if(t==="radio"){if(!this.flags.generator)return i("\u7535\u53F0\u6CA1\u6709\u7535\u3002\u5148\u6062\u590D\u65E7\u533A\u67F4\u6CB9\u673A\u8F93\u51FA\u3002");if(this.flags.relay)return i("\u6551\u63F4\u9891\u9053\u5DF2\u7ECF\u63A5\u901A\u3002\u8F6C\u5199\u6536\u5728\u8C03\u67E5\u624B\u518C\u4E2D\u3002");if(!this.documents.has("27"))return i("\u547C\u53EB\u7F3A\u5C11\u4E8B\u6545\u6838\u5B9E\u8BB0\u5F55\u3002\u5148\u5230\u5927\u5385\u5916\u7684\u793E\u533A\u536B\u751F\u7AD9\uFF0C\u67E5\u660E\u90A3\u4E00\u591C\u4E3A\u4F55\u53D6\u6D88\u6551\u63F4\u3002");if(String(e)!=="1407")return i("\u53EA\u6709\u6742\u97F3\u3002\u9891\u9053\u8868\u6807\u660E\u4E86\u56DB\u4F4D\u8C03\u8C10\u7801\u3002");this.flags.relay=!0,this.collectDocument(23),this.checkpoint={x:18,y:-2.8,z:62.5}}else if(t==="valves"){if(!this.flags.memory)return i("\u6C34\u95F8\u5C01\u6B7B\u4E86\u3002\u4F3C\u4E4E\u5728\u7B49\u5F85\u6709\u4EBA\u8BB0\u8D77\u4EC0\u4E48\u3002");if(!this.flags.photo)return i("\u94C1\u94FE\u4ECD\u7136\u7EF7\u7D27\u3002\u5148\u5728\u897F\u7FFC\u6697\u623F\u627E\u56DE\u7167\u7247\u91CC\u7684\u540D\u5B57\u3002");if(!this.flags.relay)return i("\u8FDC\u7AEF\u7EE7\u7535\u5668\u6CA1\u6709\u63A5\u901A\u3002\u5148\u5230\u5730\u4E0B\u65E7\u533A\u542F\u52A8\u67F4\u6CB9\u673A\uFF0C\u5E76\u901A\u8FC7\u7535\u53F0\u53D1\u51FA\u6C42\u6551\u3002");if(this.flags.released)return i("\u6392\u6C34\u5DF2\u7ECF\u5B8C\u6210\u3002\u5929\u4E95\u7684\u9632\u706B\u95E8\u53EF\u4EE5\u6253\u5F00\u4E86\u3002");if(!this.items.has("valveHandle"))return i("\u7B2C\u4E09\u53EA\u9600\u95E8\u6CA1\u6709\u624B\u8F6E\u3002\u4E00\u697C\u4E1C\u7FFC\u7EF4\u4FEE\u5BA4\u7684\u5DE5\u5177\u53F0\u4E0A\u5E94\u8BE5\u8FD8\u7559\u7740\u5B83\u3002");if(!Vs(e,[0,2,1]))return i("\u6C34\u538B\u6CA1\u6709\u4E0B\u964D\u3002\u5F55\u97F3\u91CC\u7684\u6B21\u5E8F\u662F\u6CC4\u538B\u3001\u6392\u6C34\u3001\u56DE\u6C34\u3002");this.flags.released=!0,this.items.delete("valveHandle"),this.items.add("exitKey"),this.checkpoint={x:13.2,y:-2.8,z:20.5}}else if(t==="ending"){if(!this.flags.released)return i("\u5730\u4E0B\u7684\u95E8\u8FD8\u6CA1\u6709\u677E\u5F00\u3002");if(!["remember","leave"].includes(e))return i("\u4F60\u8FD8\u6CA1\u6709\u4F5C\u51FA\u9009\u62E9\u3002");if(e==="remember"&&!this.documents.has("6"))return i("\u4F60\u8FD8\u4E0D\u77E5\u9053\u5B8C\u6574\u7684\u771F\u76F8\u3002203 \u53F7\u5BA4\u91CC\u6709\u4E00\u5C01\u8BA4\u9886\u4E66\u3002");this.flags.ended=!0,this.ending=e}else return i("\u65E0\u6CD5\u64CD\u4F5C\u3002");return{ok:!0,chapter:this.chapter,action:t}}snapshot(){var t;return{version:2,flags:{...this.flags},items:[...this.items],documents:[...this.documents],checkpoint:{...this.checkpoint},elapsed:Math.max(0,this.elapsed),ending:(t=this.ending)!=null?t:null,revision:5,events:[...this.events]}}restore(t){var i,s,r,a;if(!t||t.version!==2||!Array.isArray(t.items)||!Array.isArray(t.documents))return;for(let o of k1)((i=t.flags)==null?void 0:i[o])===!0&&(this.flags[o]=!0);if(this.items=new Set(t.items.filter(o=>ru.includes(o))),this.documents=new Set(t.documents.map(String).filter(o=>F1.includes(o))),this.documents.has("invitation")?this.flags.invitation=!0:this.flags={},!this.flags.power)for(let o of["cabinet","tapePlayed","memory","photo","released","ended"])delete this.flags[o];if(!this.flags.cabinet)for(let o of["tapePlayed","memory","photo","released","ended"])delete this.flags[o];if(!this.flags.tapePlayed)for(let o of["memory","photo","released","ended"])delete this.flags[o];if(!this.flags.memory)for(let o of["photo","released","ended"])delete this.flags[o];if(this.flags.memory&&this.flags.released&&((s=t.revision)!=null?s:2)<3&&(this.flags.photo=!0,this.documents.add("14")),!this.flags.photo||!this.documents.has("14"))for(let o of["photo","generator","relay","released","ended"])delete this.flags[o];if(this.flags.photo&&this.flags.released&&((r=t.revision)!=null?r:2)<4&&(this.flags.generator=!0,this.flags.relay=!0,this.documents.add("23")),(!this.flags.generator||!this.flags.relay||!this.documents.has("23"))&&((!this.flags.generator||!this.documents.has("23"))&&delete this.flags.relay,delete this.flags.released,delete this.flags.ended),this.flags.photo?this.items.add("annexKey"):(this.items.delete("annexKey"),this.items.delete("relayFuse")),this.flags.generator&&this.items.delete("relayFuse"),this.flags.memory)this.items.add("westKey");else for(let o of["westKey","film","developer"])this.items.delete(o);this.flags.photo&&(this.items.delete("film"),this.items.delete("developer")),((a=t.revision)!=null?a:2)<5&&this.flags.generator&&this.documents.add("27"),this.events=new Set(Array.isArray(t.events)?t.events.filter(o=>typeof o=="string"&&o.length<48).slice(0,32):[]),this.flags.invitation||this.items.delete("serviceKey"),this.flags.cabinet||this.items.delete("archiveKey"),this.flags.released||this.items.delete("exitKey"),this.flags.invitation&&this.items.add("serviceKey"),this.flags.cabinet&&this.items.add("archiveKey"),this.flags.released&&this.items.add("exitKey"),this.flags.tapePlayed&&this.items.add("tape"),Number.isFinite(t.elapsed)&&(this.elapsed=Math.max(0,t.elapsed));let e=t.checkpoint;e&&[e.x,e.y,e.z].every(Number.isFinite)&&e.x>=-30&&e.x<=44&&e.z>=-45&&e.z<=83&&[-2.8,0,2.8,5.6].includes(e.y)&&(this.checkpoint={...e}),["remember","leave"].includes(t.ending)&&this.flags.ended&&(this.ending=t.ending)}},ou={serviceKey:"\u5730\u4E0B\u7EF4\u4FEE\u95F4\u94A5\u5319",fuse:"\u5907\u7528\u7194\u65AD\u5668",valveHandle:"\u6392\u6C34\u9600\u624B\u8F6E",archiveKey:"203 \u653E\u6620\u5BA4\u94A5\u5319",tape:"\u4E03\u6708\u5341\u56DB\u65E5\u7684\u5F55\u97F3\u5E26",exitKey:"\u9632\u706B\u95E8\u94A5\u5319",westKey:"\u4E8C\u697C\u897F\u7FFC\u94A5\u5319",film:"\u672A\u51B2\u6D17\u7684\u5168\u5BB6\u798F\u5E95\u7247",developer:"\u5BC6\u5C01\u7684\u663E\u5F71\u6DB2",annexKey:"\u5730\u4E0B\u65E7\u533A\u94A5\u5319",relayFuse:"\u65E7\u533A\u8F93\u51FA\u7194\u65AD\u5668"},au={remember:{title:"\u5929\u4EAE\u4E4B\u524D",label:"\u7ED3\u5C40 \xB7 \u5F52\u6765",text:`\u4F60\u7B2C\u4E00\u6B21\u6E05\u695A\u5730\u53EB\u51FA\u4E86\u4ED6\u7684\u540D\u5B57\u3002
\u300C\u82CD\u592A\uFF0C\u6211\u4EEC\u56DE\u5BB6\u3002\u300D

\u8D70\u5ECA\u91CC\u7684\u811A\u6B65\u505C\u4E86\u3002
\u90A3\u53EA\u51B0\u51B7\u7684\u5C0F\u624B\uFF0C\u7EC8\u4E8E\u63E1\u4F4F\u4E86\u4F60\u7684\u624B\u3002

\u697C\u5916\u4ECD\u7136\u4E0B\u7740\u96E8\u3002
\u53EF\u4F60\u8BB0\u5F97\uFF0C\u5929\u4EAE\u7684\u65B9\u5411\u3002`},leave:{title:"\u53C8\u4E00\u5C01\u6765\u4FE1",label:"\u7ED3\u5C40 \xB7 \u9057\u5FD8",text:`\u4F60\u63A8\u5F00\u4E86\u95E8\uFF0C\u6CA1\u6709\u518D\u56DE\u5934\u3002

\u4E09\u4E2A\u6708\u540E\uFF0C\u4E00\u5C01\u6CA1\u6709\u7F72\u540D\u7684\u4FE1\u88AB\u585E\u8FDB\u4F60\u5BB6\u7684\u4FE1\u7BB1\u3002

\u300C\u60A8\u9057\u843D\u7684\u4E1C\u897F\u4ECD\u5728\u4E09\u53F7\u5BA4\u3002\u300D

\u4FE1\u5C01\u91CC\uFF0C\u662F\u4E00\u679A\u8FD8\u5728\u7F13\u6162\u8F6C\u52A8\u7684\u516B\u97F3\u76D2\u53D1\u6761\u3002
\u4ECE\u95E8\u5916\u4F20\u6765\u4E09\u4E2A\u97F3\u7B26\u3002`}};var pt=n=>document.getElementById(n),So={generator:{title:"\u5730\u4E0B\u65E7\u533A\u5907\u7528\u8F93\u51FA",description:"\u88C5\u56DE\u8F93\u51FA\u7194\u65AD\u5668\uFF0C\u6309\u673A\u623F\u89C4\u7A0B\u542F\u52A8\u67F4\u6CB9\u673A\u3002",labels:["\u4F9B\u6CB9","\u9884\u70ED","\u63A5\u901A\u8F93\u51FA"],values:[0,1,2],hint:"\u53D1\u7535\u673A\u623F\u7684\u89C4\u7A0B\uFF1A\u9884\u70ED \u2192 \u4F9B\u6CB9 \u2192 \u63A5\u901A\u8F93\u51FA\u3002\u7194\u65AD\u5668\u5728\u642C\u8FC1\u6863\u6848\u5E93\u7684\u7EFF\u8272\u7EF4\u4FEE\u76D2\u3002",complete:"\u67F4\u6CB9\u673A\u8D77\u52A8\u4E86\u3002\u65E7\u533A\u5C3D\u5934\u7684\u7535\u53F0\u7EC8\u4E8E\u901A\u7535\u3002"},radio:{title:"\u6CA1\u6709\u56DE\u5E94\u7684\u9891\u9053",description:"\u56DB\u4F4D\u8C03\u8C10\u7801\u3002\u9891\u9053\u8868\u7559\u5728\u7535\u53F0\u65C1\u8FB9\u3002",hint:"14.07 MHz\uFF0C\u53BB\u6389\u5C0F\u6570\u70B9\uFF0C\u8F93\u5165 1407\u3002\u9700\u8981\u5148\u542F\u52A8\u5907\u7528\u67F4\u6CB9\u673A\u3002",complete:"\u300C\u8BF7\u62A5\u5730\u70B9\u4E0E\u59D3\u540D\u3002\u300D\u8FD9\u4E00\u6B21\uFF0C\u4F60\u6CA1\u6709\u7ED3\u675F\u547C\u53EB\u3002"},develop:{title:"\u88AB\u62B9\u53BB\u7684\u5168\u5BB6\u798F",description:"\u8BA9\u5E95\u7247\u7ECF\u8FC7\u56DB\u53EA\u836F\u6DB2\u6258\u76D8\u3002\u684C\u4E0A\u7684\u89C4\u7A0B\u8BB0\u5F55\u7740\u51B2\u6D17\u6B21\u5E8F\u3002",labels:["\u663E\u5F71","\u5B9A\u5F71","\u505C\u663E","\u6C34\u6D17"],values:[0,1,2,3],length:4,hint:"\u6697\u623F\u89C4\u7A0B\uFF1A\u663E\u5F71 \u2192 \u505C\u663E \u2192 \u5B9A\u5F71 \u2192 \u6C34\u6D17\u3002\u5E95\u7247\u5728 204\uFF0C\u663E\u5F71\u6DB2\u5728\u4F4F\u6237\u7EAA\u5FF5\u5BA4\u3002",complete:"\u5F71\u50CF\u6D6E\u4E86\u51FA\u6765\u3002\u4F60\u7275\u7740\u4ED6\u7684\u624B\u3002\u7167\u7247\u4E0A\u4ECE\u6765\u90FD\u4E0D\u662F\u4E00\u4E2A\u5B69\u5B50\u3002"},power:{title:"\u5907\u7528\u7535\u6E90",description:"\u88C5\u5165\u7194\u65AD\u5668\uFF0C\u518D\u6309\u68C0\u4FEE\u5361\u7684\u6B21\u5E8F\u5408\u95F8\u3002",labels:["\u8D70\u5ECA\u7167\u660E","\u4F4F\u6237\u7535\u6E90","\u6392\u6C34\u6CF5"],values:[0,1,2],hint:"\u9762\u677F\u5DE6\u8D77\uFF1A\u8D70\u5ECA\u3001\u4F4F\u6237\u3001\u6392\u6C34\u3002\u542F\u52A8\u6B21\u5E8F\uFF1A\u6392\u6C34 \u2192 \u8D70\u5ECA \u2192 \u4F4F\u6237\u3002",complete:"\u5907\u7528\u7535\u6E90\u542F\u52A8\u3002\u4E8C\u697C\u7684\u78C1\u9501\u677E\u5F00\u4E86\u3002"},cabinet:{title:"\u6863\u6848\u67DC",description:"\u56DB\u4F4D\u6570\u7684\u5BC6\u7801\u3002\u9501\u9762\u4E0A\u6709\u4E00\u5904\u5C1A\u672A\u5E72\u900F\u7684\u6C34\u75D5\u3002",hint:"\u4E00\u697C\u4F5B\u95F4\u7684\u526A\u62A5\u8BF4\uFF0C\u5BC6\u7801\u662F\u505C\u7535\u65F6\u523B\u300202:17\uFF0C\u8F93\u5165 0217\u3002",complete:"\u6863\u6848\u67DC\u6253\u5F00\u4E86\u3002\u91CC\u9762\u653E\u7740 203 \u653E\u6620\u5BA4\u7684\u94A5\u5319\u3002"},music:{title:"\u6CA1\u5531\u5B8C\u7684\u6B4C",description:"\u56DB\u679A\u97F3\u7247\u3002\u8BA9\u82CD\u592A\u719F\u6089\u7684\u4E09\u4E2A\u97F3\u7B26\u518D\u6B21\u54CD\u8D77\u3002",labels:["\u2160","\u2161","\u2162","\u2163"],values:[1,2,3,4],hint:"\u513F\u7AE5\u623F\u7684\u753B\u6807\u51FA\u4E86\u4E09\u6839\u7EBF\uFF1A3 \u2192 1 \u2192 4\u3002",complete:"\u516B\u97F3\u76D2\u54CD\u4E86\u3002\u5939\u5C42\u91CC\u85CF\u7740\u4E00\u5F20\u5199\u7ED9\u54E5\u54E5\u7684\u7EB8\u6761\u3002"},valves:{title:"\u6C34\u95F8",description:"\u987A\u5E8F\u9519\u8BEF\u4F1A\u8BA9\u6C34\u538B\u91CD\u65B0\u5347\u9AD8\u3002\u542C\u4ECE\u5F55\u97F3\u91CC\u7684\u58F0\u97F3\u3002",labels:["\u6CC4\u538B","\u56DE\u6C34","\u6392\u6C34"],values:[0,1,2],hint:"\u5F55\u97F3\u91CC\u8BF4\uFF1A\u5148\u6CC4\u538B\uFF0C\u518D\u6392\u6C34\uFF0C\u6700\u540E\u56DE\u6C34\u3002",complete:"\u4E95\u5E95\u7684\u95E8\u5F00\u4E86\u3002\u80CC\u540E\u4F20\u6765\u4E86\u4E0D\u5C5E\u4E8E\u4F60\u7684\u811A\u6B65\u58F0\u3002"}},To=class{constructor(t){var e,i;this.game=t,this.sequence=[],this.mapFloor=0,this.mapZoom=1,this.saved=null;try{let s=JSON.parse(localStorage.getItem(Xs)||"null");(s==null?void 0:s.version)===2&&((e=s.flags)!=null&&e.invitation)&&!((i=s.flags)!=null&&i.ended)&&(this.saved=s)}catch(s){}pt("continue-game").classList.toggle("hidden",!this.saved),pt("continue-game").addEventListener("click",()=>t._start(!0)),pt("start-game").addEventListener("click",()=>t._start(!1)),pt("settings-title").addEventListener("click",()=>this.openSettings()),pt("resume-game").addEventListener("click",()=>this.closeSettings()),pt("checkpoint-retry").addEventListener("click",()=>{t._wakeAtCheckpoint(),this.closeSettings()}),pt("journal-button").addEventListener("click",()=>this.openJournal()),pt("journal-close").addEventListener("click",()=>this.close()),pt("puzzle-close").addEventListener("click",()=>this.close()),pt("puzzle-submit").addEventListener("click",()=>this.submitPuzzle()),pt("puzzle-reset").addEventListener("click",()=>{this.sequence=[],pt("puzzle-code").value="",this.renderSequence()}),pt("recording-skip").addEventListener("click",()=>this.finishRecording()),pt("puzzle-code").addEventListener("keydown",s=>{if(s.stopPropagation(),s.code==="Escape"){s.preventDefault(),this.close();return}s.code==="Enter"&&this.submitPuzzle()}),pt("puzzle-hint").addEventListener("click",()=>{pt("puzzle-status").textContent=So[this.puzzle].hint}),pt("journal-hint").addEventListener("click",()=>{pt("journal-guidance").textContent=t.campaign.hint,pt("journal-guidance").classList.toggle("hidden")}),document.querySelectorAll("[data-journal-tab]").forEach(s=>{s.addEventListener("click",()=>this.showJournalTab(s.dataset.journalTab))}),document.querySelectorAll("[data-map-floor]").forEach(s=>{s.addEventListener("click",()=>{this.mapFloor=Number(s.dataset.mapFloor),this.drawMap()})});for(let[s,r]of[["map-zoom-in",.25],["map-zoom-out",-.25]])pt(s).addEventListener("click",()=>{this.mapZoom=Math.max(1,Math.min(2.5,this.mapZoom+r)),this.applyMapZoom()});pt("map-zoom-reset").addEventListener("click",()=>{this.mapZoom=1,this.applyMapZoom()}),pt("ending-remember").addEventListener("click",()=>t._ending("remember")),pt("ending-leave").addEventListener("click",()=>t._ending("leave")),this.bindSettings()}bindSettings(){let t={};try{t=JSON.parse(localStorage.getItem("echo_settings_v2")||"{}")||{}}catch(i){}this.settings={volume:Number.isFinite(t.volume)?Math.max(0,Math.min(100,t.volume)):70,brightness:Number.isFinite(t.brightness)?Math.max(70,Math.min(150,t.brightness)):100,reduced:t.reduced===!0};let e=()=>{this.game.audio.setVolume(this.settings.volume/100),this.game.grade.uniforms.uExposure.value=1.38*this.settings.brightness/100,this.game.reduceEffects=this.settings.reduced,document.body.classList.toggle("reduced-effects",this.settings.reduced);try{localStorage.setItem("echo_settings_v2",JSON.stringify(this.settings))}catch(i){}};for(let i of["volume","brightness"]){let s=pt("setting-"+i);s.value=this.settings[i],pt("value-"+i).textContent=this.settings[i]+"%",s.addEventListener("input",()=>{this.settings[i]=Number(s.value),pt("value-"+i).textContent=s.value+"%",e()})}pt("setting-reduced").checked=this.settings.reduced,pt("setting-reduced").addEventListener("change",i=>{this.settings.reduced=i.target.checked,e()}),e()}openSettings(){pt("pause").classList.remove("hidden"),pt("pause-heading").textContent=this.game.state==="title"?"\u4F53\u9A8C\u8BBE\u7F6E":"\u6682\u505C",pt("resume-game").textContent=this.game.state==="title"?"\u8FD4\u56DE":"\u7EE7\u7EED\u63A2\u7D22",pt("checkpoint-retry").classList.toggle("hidden",this.game.state==="title"),this.game.audio.setPaused(!0),this.game.keys={},this.game.controls.isLocked&&(this.game._skipUnlockPause=!0,this.game.controls.unlock())}closeSettings(){pt("pause").classList.add("hidden"),this.game.state==="playing"&&this.game._tryLock(),this.game.audio.setPaused(!1)}open(t){return this.game.state!=="playing"||this.game.noteOpen?!1:(this.game.noteOpen=!0,this.panel=t,this.game.keys={},this.game.audio.setPaused(!0),this.game._touchUI&&this.game._touchUI.classList.add("hidden"),this.game.controls.isLocked&&(this.game._skipUnlockPause=!0,this.game.controls.unlock()),pt(t).classList.remove("hidden"),!0)}close(){var t;this.panel&&(pt(this.panel).classList.add("hidden"),this.panel=null,this.recording=null,(t=document.activeElement)==null||t.blur(),this.game.noteOpen=!1,this.game.audio.setPaused(!1),this.game._touchUI&&this.game._touchUI.classList.remove("hidden"),this.game.state==="playing"&&this.game._tryLock())}openJournal(t="evidence"){if(this.panel==="journal"){this.close();return}if(!this.open("journal"))return;let e=this.game.campaign;pt("journal-chapter").textContent=us[e.chapter].title,pt("journal-objective").textContent=e.objective;let i=pt("journal-progress");i.replaceChildren(),us.forEach((o,l)=>{let c=document.createElement("li");c.textContent=String(l+1).padStart(2,"0")+" \xB7 "+o.title,c.className=l<e.chapter?"complete":l===e.chapter?"current":"",i.appendChild(c)}),pt("journal-guidance").classList.add("hidden");let s=pt("inventory-list");s.replaceChildren();for(let o of e.items){let l=document.createElement("span");l.textContent=ou[o],s.appendChild(l)}e.items.size||(s.textContent="\u8FD8\u6CA1\u6709\u627E\u5230\u968F\u8EAB\u7269\u54C1\u3002");let r=pt("evidence-list");r.replaceChildren();for(let o of e.documents){let l=wn[o],c=document.createElement("button");c.className="evidence-entry";let u=document.createElement("strong");u.textContent=l.title;let d=document.createElement("span");d.textContent=l.location,c.append(u,d),c.addEventListener("click",()=>this.renderDocument(o)),r.appendChild(c)}e.documents.size||(r.textContent="\u8C03\u67E5\u7EB8\u5F20\u3001\u62A5\u7EB8\u4E0E\u5F55\u97F3\uFF0C\u4F1A\u5C06\u8BB0\u5F55\u4FDD\u5B58\u5728\u8FD9\u91CC\u3002");let a=[...e.documents].at(-1);a?this.renderDocument(a):(pt("evidence-title").textContent="\u8FD8\u6CA1\u6709\u8BB0\u5F55",pt("evidence-content").textContent="\u4ECE\u5927\u5385\u503C\u73ED\u53F0\u4E0A\u7684\u90A3\u5C01\u4FE1\u5F00\u59CB\u3002"),this.mapFloor=this.game.playerPos.y<-.8?-1:this.game.playerPos.y>4.8?2:this.game.playerPos.y>2?1:0,this.showJournalTab(t),pt("journal-close").focus()}renderDocument(t){let e=wn[t];pt("evidence-title").textContent=e.title,pt("evidence-location").textContent=e.location,pt("evidence-content").textContent=e.cn,this.renderPhoto("evidence-photo",t),document.querySelectorAll(".evidence-entry").forEach(i=>{var s;return i.classList.toggle("selected",((s=i.querySelector("strong"))==null?void 0:s.textContent)===e.title)})}renderPhoto(t,e){let i=pt(t),s=String(e)==="14";if(i.classList.toggle("hidden",!s),s){let r=this.game.level.campaign.photo.material.map.image;i.width=r.width,i.height=r.height,i.getContext("2d").drawImage(r,0,0)}}showJournalTab(t){pt("journal").dataset.tab=t,pt("journal-evidence").classList.toggle("hidden",t!=="evidence"),pt("journal-map").classList.toggle("hidden",t!=="map"),document.querySelectorAll("[data-journal-tab]").forEach(e=>e.classList.toggle("selected",e.dataset.journalTab===t)),t==="map"&&this.drawMap()}drawMap(){let t=pt("map-canvas"),e=t.getContext("2d"),i=t.width,s=t.height;e.clearRect(0,0,i,s);let r=this.mapFloor,a=El.filter(p=>p.floor===r),o=Math.min(...a.map(p=>p.bounds[0]))-2,l=Math.max(...a.map(p=>p.bounds[2]))+2,c=Math.min(...a.map(p=>p.bounds[1]))-3,u=Math.max(...a.map(p=>p.bounds[3]))+3,d=Math.min((i-80)/(u-c),(s-80)/(l-o)),h=p=>i/2+(p-(u+c)/2)*d,f=p=>s/2+(p-(l+o)/2)*d;e.lineWidth=1.5,e.textAlign="center",e.textBaseline="middle";for(let p of a){let[m,y,x,v]=p.bounds;e.fillStyle="rgba(129,153,138,.08)",e.strokeStyle="#81938a",e.fillRect(h(y),f(m),(v-y)*d,(x-m)*d),e.strokeRect(h(y),f(m),(v-y)*d,(x-m)*d),e.fillStyle="#ced4c7";let S=(v-y)*d,M=(x-m)*d;e.save(),e.translate(h((y+v)/2),f((m+x)/2));let b=S<60&&M>S*2;b&&e.rotate(-Math.PI/2);let U=(b?M:S)-12,E=Math.min(16,Math.max(10,(b?S:M)*.65));e.font=E+'px "Songti SC", serif';let T=[p.name];if(e.measureText(p.name).width>U&&M>40&&!b){let C=p.name.replace("\u6444\u5F71\u5E08\u65E7\u5C45",`\u6444\u5F71\u5E08
\u65E7\u5C45`).replace("204 ",`204
`).split(`
`);T=C.length>1?C:[p.name.slice(0,4),p.name.slice(4)]}for(;E>9&&T.some(C=>e.measureText(C).width>U);)E--,e.font=E+'px "Songti SC", serif';T.forEach((C,F)=>e.fillText(C,0,(F-(T.length-1)/2)*(E+5))),e.restore()}let g=this.game.playerPos;(g.y<-.8?-1:g.y>4.8?2:g.y>2?1:0)===r&&(e.fillStyle="#ca8b63",e.beginPath(),e.arc(h(g.z),f(g.x),6,0,Math.PI*2),e.fill(),e.strokeStyle="#ca8b63",e.beginPath(),e.moveTo(h(g.z),f(g.x)),e.lineTo(h(g.z)-Math.cos(this.game.camera.rotation.y)*18,f(g.x)-Math.sin(this.game.camera.rotation.y)*18),e.stroke()),pt("map-caption").textContent="\u4F4F\u6237\u65E7\u5E73\u9762\u56FE \xB7 \u6A59\u8272\u6807\u8BB0\u662F\u4F60\u7684\u4F4D\u7F6E \xB7 \u4E3B\u697C\u68AF\u8FDE\u63A5\u4E00\u697C\u3001\u4E8C\u697C\u548C\u5C4B\u9876\uFF1B\u7EF4\u4FEE\u697C\u68AF\u901A\u5F80\u5730\u4E0B",document.querySelectorAll("[data-map-floor]").forEach(p=>p.classList.toggle("selected",Number(p.dataset.mapFloor)===r)),this.applyMapZoom()}applyMapZoom(){pt("map-canvas").style.width=this.mapZoom*100+"%",pt("map-zoom-reset").textContent=Math.round(this.mapZoom*100)+"%",pt("map-zoom-out").disabled=this.mapZoom===1,pt("map-zoom-in").disabled=this.mapZoom===2.5}openPuzzle(t){var o;if(t==="tape"){if(this.game.campaign.flags.tapePlayed){this.game._readNote(5);return}let l=this.game.campaign.perform("tape");if(!l.ok){this.game._sub(l.message);return}this.game._campaignAdvanced("tape"),this.openRecording();return}let e={power:"power",cabinet:"cabinet",music:"memory",valves:"released",develop:"photo"};if(this.game.campaign.flags[e[t]]){this.game._sub("\u8FD9\u91CC\u5DF2\u7ECF\u8C03\u67E5\u8FC7\u4E86\u3002\u8BB0\u5F55\u4FDD\u5B58\u5728\u8C03\u67E5\u624B\u518C\u91CC\u3002");return}if(!this.open("puzzle"))return;this.puzzle=t,this.sequence=[];let i=So[t];pt("puzzle-title").textContent=i.title,pt("puzzle-description").textContent=i.description,pt("puzzle-status").textContent="",pt("puzzle-code").value="";let s=["cabinet","radio"].includes(t);pt("puzzle-code").classList.toggle("hidden",!s),pt("puzzle-keypad").classList.toggle("hidden",!s),pt("puzzle-sequence").classList.toggle("hidden",s);let r=pt("puzzle-controls");r.replaceChildren(),(o=i.labels)==null||o.forEach((l,c)=>{let u=document.createElement("button");u.className="puzzle-control",u.textContent=l,u.addEventListener("click",()=>{this.sequence.length>=(i.length||3)&&(this.sequence=[]),this.sequence.push(i.values[c]),t==="music"?this.game.audio.puzzleTone(i.values[c]):this.game.audio.switchClick(),this.renderSequence()}),r.appendChild(u)});let a=pt("puzzle-keypad");a.replaceChildren(),["1","2","3","4","5","6","7","8","9","\u6E05\u9664","0","\u9000\u683C"].forEach(l=>{let c=document.createElement("button");c.textContent=l,c.addEventListener("click",()=>{let u=pt("puzzle-code");l==="\u6E05\u9664"?u.value="":l==="\u9000\u683C"?u.value=u.value.slice(0,-1):u.value.length<4&&(u.value+=l)}),a.appendChild(c)}),this.renderSequence(),s?pt("puzzle-code").focus():pt("puzzle-close").focus()}openRecording(){this.open("recording")&&(this.game.audio.setPaused(!1),this.recording={elapsed:0,beat:0,duration:32},pt("recording-line").textContent="\uFF3B\u78C1\u5E26\u5F00\u59CB\u8F6C\u52A8\u3002\u96E8\u58F0\u3002\uFF3D",pt("recording-time").textContent="00:00 / 00:32",pt("recording-progress").style.width="0%",pt("recording-skip").focus())}update(t){var s,r;let e=this.recording;if(this.panel!=="recording"||!e||!pt("pause").classList.contains("hidden"))return;e.elapsed+=t;let i=[[2,"\u300C\u54E5\u54E5\uFF0C\u4F60\u4F1A\u6765\u63A5\u6211\u5417\uFF1F\u300D","whisper"],[6,"\u300C\u6B4C\u54CD\u4E86\u5C31\u51FA\u6765\uFF0C\u522B\u8BA9\u5988\u5988\u53D1\u73B0\u3002\u300D","musicBox"],[10,"\uFF3B\u5F00\u95E8\u58F0\u3002\u7535\u6D41\u4E2D\u65AD\u3002\uFF3D","doorClose"],[13,"\u300C\u54E5\u54E5\uFF1F\u6211\u770B\u4E0D\u89C1\u4E86\u3002\u300D","cry"],[18,"\uFF3B\u6C89\u9ED8\u3002\u968F\u540E\uFF0C\u4E00\u4E2A\u6210\u5E74\u7537\u4EBA\u7684\u58F0\u97F3\u3002\uFF3D","breath"],[22,"\u300C\u5148\u6CC4\u538B\uFF0C\u518D\u6392\u6C34\uFF0C\u6700\u540E\u56DE\u6C34\u3002\u300D","hammer"],[26,"\u300C\u522B\u518D\u628A\u90A3\u6247\u95E8\u5C01\u8D77\u6765\u4E86\u3002\u300D","whisper"],[29,"\uFF3B\u6700\u540E\u4F20\u6765\u4E09\u679A\u516B\u97F3\u76D2\u7684\u97F3\u7B26\u3002\uFF3D","musicBox"]];for(;e.beat<i.length&&e.elapsed>=i[e.beat][0];){let[,a,o]=i[e.beat++];pt("recording-line").textContent=a,(r=(s=this.game.audio)[o])==null||r.call(s)}pt("recording-time").textContent="00:"+String(Math.min(32,Math.floor(e.elapsed))).padStart(2,"0")+" / 00:32",pt("recording-progress").style.width=Math.min(100,e.elapsed/e.duration*100)+"%",e.elapsed>=e.duration&&this.finishRecording()}finishRecording(){this.panel==="recording"&&(this.close(),this.game._readNote(5))}renderSequence(){let t=So[this.puzzle];pt("puzzle-sequence").textContent=this.sequence.length?this.sequence.map(e=>t.labels[t.values.indexOf(e)]).join(" \u2192 "):"\u7B49\u5F85\u64CD\u4F5C"}submitPuzzle(){let t=this.puzzle,e=["cabinet","radio"].includes(t)?pt("puzzle-code").value.trim():this.sequence,i=this.game.campaign.perform(t,e);if(!i.ok){pt("puzzle-status").textContent=i.message,this.sequence=[],this.renderSequence(),this.game.audio.switchClick();return}this.close(),this.game._campaignAdvanced(t),this.game._sub(So[t].complete,"",5),t==="music"&&this.game._readNote(7),t==="develop"&&this.game._readNote(14),t==="radio"&&this.game._readNote(23)}chooseEnding(){if(this.panel||this.game.state!=="playing"||!this.open("ending-choice"))return;let t=this.game.campaign.documents.has("6");pt("ending-remember").disabled=!t,pt("ending-choice-hint").textContent=t?"\u4F60\u7EC8\u4E8E\u8BB0\u5F97\u81EA\u5DF1\u7684\u5F1F\u5F1F\u3002\u95E8\u5916\u7684\u5929\u8FD8\u6CA1\u6709\u4EAE\u3002":"\u4F60\u8FD8\u4E0D\u77E5\u9053\u5B8C\u6574\u7684\u771F\u76F8\u3002203 \u653E\u6620\u5BA4\u91CC\u6709\u4E00\u5C01\u672A\u5BC4\u51FA\u7684\u8BA4\u9886\u4E66\u3002",pt("ending-return").onclick=()=>this.close(),pt("ending-return").focus()}};var Ao=class{constructor(t){this.game=t,this.acousticTimer=0,this.areaTime=0,this.lastArea="",this.cooldown=0,this.look=new I,this.source=new I}once(t,e){let i=this.game.campaign;i.events.has(t)||(i.events.add(t),e(),this.game._refreshCampaign(),this.cooldown=10)}update(t){let e=this.game,i=e.playerPos,s=hs(i);if(this.cooldown=Math.max(0,this.cooldown-t),s!==this.lastArea&&(this.lastArea=s,this.areaTime=0),this.areaTime+=t,this.acousticTimer-=t,this.acousticTimer<=0){this.acousticTimer=.12,e.camera.getWorldDirection(this.look);for(let r of e.audio.environment||[])r.campaignFlag&&(r.enabled=!!e.campaign.flags[r.campaignFlag]);e.audio.updateEnvironment(e.camera.position,this.look,r=>{let a=e.level.colliders.filter(o=>!(r.x>=o.x0&&r.x<=o.x1&&r.y>=o.y0&&r.y<=o.y1&&r.z>=o.z0&&r.z<=o.z1));return en(e.camera.position,this.source.set(r.x,r.y,r.z),a,e.level.doors)})}for(let r of e.level.campaign.dynamics)r.kind==="print"&&(r.mesh.rotation.y=Math.sin(e.campaign.elapsed*.7+r.phase)*.035);e.campaign.flags.generator&&e.level.campaign.generatorRotor&&(e.level.campaign.generatorRotor.rotation.x+=t*5),!(this.areaTime<1.2||this.cooldown>0||e.monster.state==="chase")&&(s==="\u56DE\u58F0\u793E\u533A\u4E2D\u5EAD"&&e.campaign.flags.relay?this.once("community-return",()=>{e.audio.duck(),e._sub("\u96E8\u68DA\u4E0B\u7684\u6551\u63F4\u706F\u4EAE\u4E86\u3002\u8FDF\u5230\u7684\u56DE\u5E94\u5DF2\u7ECF\u4F20\u8FDB\u5730\u4E0B\u3002\u8FD8\u6709\u4E00\u4E2A\u4EBA\uFF0C\u5728\u7B49\u4F60\u5F00\u95E8\u3002","",6),e._setFear(.3)}):s==="\u56DE\u58F0\u793E\u533A\u4E2D\u5EAD"?this.once("community-arrival",()=>{e.audio.knock(3),e._sub("\u516C\u5BD3\u5916\u4E5F\u662F\u540C\u4E00\u573A\u96E8\u3002\u6742\u8D27\u5E97\u7684\u706F\u8FD8\u4EAE\u7740\uFF0C\u536B\u751F\u7AD9\u5374\u6CA1\u6709\u51FA\u8F66\u3002","",5)}):s==="\u96E8\u591C\u6742\u8D27\u5E97"?this.once("shop-arrival",()=>{e.audio.switchClick(),e._sub("\u67DC\u53F0\u4E0A\u7559\u7740\u56DB\u4EFD\u8BA2\u5355\u3002\u7535\u8BDD\u7684\u542C\u7B52\uFF0C\u6CA1\u6709\u653E\u597D\u3002","",4)}):s==="\u8857\u533A\u536B\u751F\u7AD9"?this.once("clinic-arrival",()=>{e.audio.breath(-.5,2),e._sub("\u4E24\u5F20\u7A7A\u5E8A\u3002\u63A5\u7EBF\u5458\u66FE\u7ECF\u5199\u4E0B\u4E86\u4ED6\u7684\u58F0\u97F3\u3002","",4)}):s==="\u5730\u4E0B\u65E7\u533A\u8FDE\u5ECA"?this.once("annex-arrival",()=>{e.audio.hammer(.5),e._sub("\u53E6\u4E00\u4FA7\u7684\u95E8\u4E0D\u662F\u51FA\u53E3\u3002\u8FD9\u91CC\u85CF\u7740\u90A3\u4E00\u591C\u6CA1\u6709\u53D1\u51FA\u7684\u6C42\u6551\u3002","",5),e._setFear(.45)}):s==="\u5730\u4E0B\u503C\u73ED\u7AD9"?this.once("watch-arrival",()=>{e.audio.knock(3),e._sub("\u4EA4\u73ED\u65E5\u5FD7\u6700\u540E\u4E00\u680F\uFF0C\u5199\u7740\u300C\u7BA1\u9053\u6C34\u9524\u300D\u3002","",4)}):s==="\u65E7\u84C4\u6C34\u6C60"?this.once("cistern-arrival",()=>{e.audio.duck(),e.audio.lullaby(),e._sub("\u6BCF\u4E00\u9053\u523B\u7EBF\uFF0C\u90FD\u662F\u4ED6\u7B49\u4F60\u6765\u627E\u7684\u4E00\u8F6E\u6570\u6570\u3002","",5),e.ghost.appearAt(29,-2.8,61,Math.PI/2),e._setFear(.5)}):s==="\u5E94\u6025\u7535\u53F0\u5BA4"&&!e.campaign.flags.relay?this.once("radio-arrival",()=>{e.audio.buzz(),e._sub("\u7535\u53F0\u65C1\u7684\u7EB8\u6761\u5199\u7740\uFF1A\u4E0D\u8981\u56E0\u4E3A\u6CA1\u6709\u56DE\u5E94\uFF0C\u5C31\u7ED3\u675F\u547C\u53EB\u3002","",5)}):s==="\u897F\u7FFC\u5C01\u95ED\u8D70\u5ECA"&&e.campaign.flags.memory?this.once("west-arrival",()=>{e.audio.cameraShutter(-.5),e._sub("\u8FD9\u6761\u8D70\u5ECA\u2026\u2026\u539F\u6765\u4E00\u76F4\u5728\u8FD9\u91CC\u3002\u7EA2\u706F\u8FD8\u4EAE\u7740\u3002","",5),e._setFear(Math.max(.4,e.fear)),e.storyEvents.push({delay:6,action:()=>{e.audio.knock(3),e._sub("\u6709\u4EBA\u5728\u6697\u623F\u91CC\uFF0C\u7B49\u7167\u7247\u5E72\u900F\u3002","",4)}})}):s==="\u7EA2\u706F\u6697\u623F"&&!e.campaign.flags.photo?this.once("darkroom-arrival",()=>{e.audio.breath(.75,3),e._sub("\u7A7A\u6C14\u91CC\u6709\u836F\u6C34\u7684\u5473\u9053\u3002\u56DB\u53EA\u6258\u76D8\uFF0C\u6700\u540E\u4E00\u53EA\u76DB\u7740\u6E05\u6C34\u3002","",5),e.storyEvents.push({delay:7,action:()=>{hs(e.playerPos)==="\u7EA2\u706F\u6697\u623F"&&(e.audio.cameraShutter(.7),e._sub("\u8EAB\u540E\u54CD\u4E86\u4E00\u58F0\u5FEB\u95E8\u3002\u8FD9\u91CC\u6CA1\u6709\u7B2C\u4E8C\u53F0\u76F8\u673A\u3002","",4),e._setFear(Math.max(.55,e.fear)))}})}):s==="\u4F4F\u6237\u7EAA\u5FF5\u5BA4"?this.once("memorial-arrival",()=>{e.audio.duck(),e._setFear(.2),e._sub("\u56DB\u628A\u6905\u5B50\u3002\u56DB\u4E2A\u4EBA\u3002\u4E3A\u4EC0\u4E48\u540D\u7C3F\u91CC\u53EA\u5269\u4E0B\u4E09\u884C\uFF1F","",5)}):s==="\u5C4B\u9876\u667E\u6652\u573A"&&e.campaign.flags.photo?this.once("roof-recalled",()=>{e.audio.lullaby(),e._sub("\u5C31\u662F\u8FD9\u91CC\u3002\u6BCD\u4EB2\u6536\u7740\u5E8A\u5355\uFF0C\u5F1F\u5F1F\u7275\u7740\u4F60\u7684\u624B\u3002","",5),e._setFear(.12)}):s==="\u5730\u4E0B\u914D\u7535\u95F4"&&e.campaign.flags.photo&&!e.campaign.flags.released&&this.once("basement-return",()=>{e.audio.knock(3),e._sub("\u300C\u54E5\u54E5\uFF0C\u8FD9\u4E00\u6B21\uFF0C\u771F\u7684\u628A\u95E8\u6253\u5F00\u3002\u300D","",5),e._setFear(.6)}))}};var Ro=class{constructor(){this.safe=null,this.airTime=0}reset(t){this.safe={x:t.x,y:t.y,z:t.z},this.airTime=0}update(t,e,i,s){let r={x:(t.x0+t.x1)/2,y:t.y0,z:(t.z0+t.z1)/2};if(![r.x,r.y,r.z].every(Number.isFinite))return this.safe;let a=e&&i.some(l=>r.x>=l.x0&&r.x<=l.x1&&r.z>=l.z0&&r.z<=l.z1&&Math.abs(l.y1-r.y)<.04),o=i.some(l=>l.x0<t.x1&&l.x1>t.x0&&l.z0<t.z1&&l.z1>t.z0&&l.y1>r.y+.35&&l.y0<t.y1-.08);return a&&!o?(this.safe=r,this.airTime=0):this.airTime+=s,this.safe&&(r.y<-6||this.airTime>.8&&r.y<this.safe.y-1.4)?(this.airTime=0,{...this.safe}):null}};var Sn=1280,qs=720,ds=1.55,Ys=1.75,Ti=.3,wt=n=>document.getElementById(n),O1=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,B1=`
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
`;function lu(n,t){return typeof window.__forcedLandscape=="function"&&window.__forcedLandscape()?[t,-n]:[n,t]}var Sl=class{constructor(){this.audio=new vo,this.state="title",this.notes=new Set,this.campaign=new Ws,this.storyEvents=[],this.hiding=!1,this.spareBatteries=0,this.saveNotice=0,this.fear=0,this.time=0,this.scareCount=0,this.startTime=0,this.noteOpen=!1,this.blackout=!1,this.battery=100,this.batteryHudT=0,this._flashMul=1,this.finale=!1,this.phoneRinging=!1,this.phoneArmed=!1,this.phoneTimer=null,this.eventTimer=dt(20,30),this.keys={},this.bobPhase=0,this.lastBobSin=0,this.bob=0,this.eyeY=0,this.vy=0,this.grounded=!0,this.flashOn=!0,this.shake=0,this.scaredTimer=0,this.fadeLevel=0,this.subtitleTimer=null,this.introStep=0,this.monster=null,this.ghost=null,this.initOK=!1;try{this._initRenderer(),this._initScene(),this._initPost(),this._initLevel(),this._initEntities(),this._initPlayer(),this._initDust(),this._initEvents(),this._initTouch(),this.investigation=new To(this),this.atmosphere=new Ao(this),this.initOK=!0}catch(t){console.error(t),wt("error").classList.remove("hidden"),wt("title").classList.add("hidden");return}this.nopost=new URLSearchParams(location.search).has("nopost"),this._loop=this._loop.bind(this),requestAnimationFrame(this._loop)}_initRenderer(){this.canvas=wt("game"),this.renderer=new Cs({canvas:this.canvas,antialias:!0,powerPreference:"high-performance"}),this.renderer.setSize(Sn,qs,!1),this.renderer.setPixelRatio(1),this.renderer.shadowMap.enabled=!1,this.renderer.toneMapping=rl,this.renderer.toneMappingExposure=1.38,this.scene=new qr,this.scene.background=new qt(263690),this.scene.fog=new Xr(659985,.043),this.camera=new Oe(75,Sn/qs,.05,250),this.camera.rotation.order="YXZ",this.scene.add(this.camera),pl(Sn,qs),window.addEventListener("resize",()=>this._fitCanvas()),this._fitCanvas(),this.resScale=1,this.resCooldown=0,this.fpsAcc=0,this.fpsN=0}_applyResolution(){let t=Math.round((this.renderW||Sn)*this.resScale),e=Math.round((this.renderH||qs)*this.resScale);this.renderer.setSize(t,e,!1),this.composer&&this.composer.setSize(t,e),pl(t,e)}_autoResolution(t){if(this.fpsAcc+=t,this.fpsN++,this.resCooldown>0){this.resCooldown-=t;return}if(this.fpsAcc<2||this.fpsN<60)return;let e=this.fpsN/this.fpsAcc;this.fpsAcc=0,this.fpsN=0;let i=[1,.8,.7,.6],s=i.indexOf(this.resScale);s<0&&(s=0),e<38&&s<i.length-1?(this.resScale=i[s+1],this.resCooldown=10,this._applyResolution()):e>57&&s>0&&(this.resScale=i[s-1],this.resCooldown=10,this._applyResolution())}_fitCanvas(){let t=typeof window.__forcedLandscape=="function"&&window.__forcedLandscape(),e=t?window.innerHeight:window.innerWidth,i=t?window.innerWidth:window.innerHeight;this.canvas.style.width=e+"px",this.canvas.style.height=i+"px",this.camera.aspect=e/i,this.camera.updateProjectionMatrix(),this.renderW=Sn,this.renderH=Math.round(Sn*i/e),this.renderer.setSize(this.renderW*(this.resScale||1),this.renderH*(this.resScale||1),!1),this.composer&&this._applyResolution()}_initScene(){this.hemi=new ro(2766916,657157,1.26),this.hemiBase=1.26,this.scene.add(this.hemi);let t=new ao(7508899,.24);t.position.set(-14,30,70),this.scene.add(t),this.skyMaterial=new $e({side:qe,depthWrite:!1,uniforms:{uTime:{value:0}},vertexShader:`varying vec3 vSky; void main() {
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
        }`});let e=new K(new He(150,24,16),this.skyMaterial);e.position.set(0,0,44),this.scene.add(e),this.lightning={next:dt(25,60),t:0,dur:0,dist:.5}}_initPost(){this.composer=new xo(this.renderer),this.composer.setSize(this.renderW,this.renderH),this.composer.setPixelRatio(1),this.composer.addPass(new _o(this.scene,this.camera)),this.grade=new cs({uniforms:{tDiffuse:{value:null},uTime:{value:0},uFear:{value:0},uDistort:{value:0},uGlow:{value:.35},uExposure:{value:this.renderer.toneMappingExposure}},vertexShader:O1,fragmentShader:B1}),this.composer.addPass(this.grade)}_initLevel(){this.level=new Mo(this.scene,{onLocked:t=>{this._sub(t.lockedMsg,""),this.audio.woodenCreak()},onDoorToggle:(t,e)=>{e?this.audio.doorOpen():this.audio.doorClose()},onDoorBlocked:()=>this._sub("\u95E8\u6247\u88AB\u6321\u4F4F\u4E86\u3002\u9000\u5F00\u4E00\u70B9\uFF0C\u8BA9\u5B83\u8F6C\u8FC7\u53BB\u3002","",2.5),onDeadDoor:()=>{this._sub("\u8FD9\u91CC\u2026\u2026\u662F\u5899\uFF1F","\u3053\u3053\u306F\u2026\u58C1\uFF1F"),this.audio.woodenCreak(),this.level.props.eyesWall.visible=!0,this._setFear(this.fear+.15)},onExitOpen:()=>{this._sub("\u591C\u98CE\u6D8C\u4E86\u8FDB\u6765\u3002","\u5916\u306E\u7A7A\u6C17\u304C\u3001\u6D41\u308C\u8FBC\u3080\u3002")},onNote:t=>this._readNote(t),onDocument:t=>this._readNote(t),onPuzzle:t=>this.investigation.openPuzzle(t),onHide:t=>this._toggleHide(t),onItem:(t,e,i)=>{if(this.campaign.collectItem(t)){e.visible=!1,i.disabled=!0,this.audio.paperRustle(),this._refreshCampaign();let s={fuse:"\u627E\u5230\u5907\u7528\u7194\u65AD\u5668\u3002\u7EF4\u4FEE\u95E8\u5728\u8D70\u5ECA\u53F3\u4FA7\u3002",tape:"\u4E03\u6708\u5341\u56DB\u65E5\u7684\u5F55\u97F3\u5E26\u3002\u53BB 203 \u653E\u6620\u5BA4\u542C\u542C\u3002",valveHandle:"\u53D6\u56DE\u6392\u6C34\u9600\u624B\u8F6E\u3002\u53EF\u4EE5\u56DE\u5730\u4E0B\u88C5\u56DE\u5B83\u4E86\u3002"};this._sub(s[t]||"\u7269\u54C1\u5DF2\u653E\u5165\u968F\u8EAB\u7269\u54C1\u680F\u3002","",4)}},onPhone:()=>this._answerPhone(),onTV:()=>this._toggleTV(),onBell:()=>this._ringBell(),onDoll:()=>this._lookDoll(),onBattery:t=>this._pickupBattery(t),onLamp:()=>this._toggleLamp(),onMirror:()=>this._mirrorScare(),onSwitch:t=>this._toggleSwitch(t),onDrip:()=>this.audio.drip(),onWasher:()=>{this.audio.washer(-.6),this.shake=Math.max(this.shake,.1),this._sub("\u6D17\u8863\u673A\u52A8\u4E86\u534A\u5708\uFF0C\u53C8\u505C\u4E86\u3002","\u6D17\u6FEF\u6A5F\u304C\u534A\u5468\u56DE\u3063\u3066\u3001\u6B62\u307E\u3063\u305F\u3002",3),this._setFear(this.fear+.05)},zone_kitchen:()=>this._zoneKitchen(),zone_living:()=>this._zoneLiving(),zone_bedroom:()=>this._zoneBedroom(),zone_bathroom:()=>this._zoneBathroom(),zone_passage:()=>this._zonePassage(),zone_altar:()=>this._zoneAltar(),zone_child:()=>this._zoneChild(),zone_upper:()=>this._zoneUpper(),zone_corridorMid:()=>this._zoneCorridorMid(),zone_stairsEast:()=>this._zoneStairs(),zone_exitVoid:()=>this._zoneExitVoid()}),this.colliders=this.level.colliders,this._losBoxes=this.level.colliders.map(t=>new ri(new I(t.x0,t.y0,t.z0),new I(t.x1,t.y1,t.z1)))}_initEntities(){this.monster=new Eo(this.scene,this.level.tex),this.ghost=new wo(this.scene)}_initPlayer(){this.controls=new po(this.camera,document.body),document.removeEventListener("pointerlockerror",this.controls._onPointerlockError);let t=.014;try{let l=parseFloat(localStorage.getItem("echo_sens"));l>0&&(t=l)}catch(l){}this.sens=Qt(t,.004,.04),this.controls.pointerSpeed=this.sens/.002,this.controls.addEventListener("lock",()=>this._onLock()),this.controls.addEventListener("unlock",()=>this._onUnlock()),this.playerPos=new I().copy(this.level.playerStart),this.char=Bs(this.playerPos.x,this.playerPos.y,this.playerPos.z,Ti,Ys),this.traversal=new Ro,this.flash=new oo(13623551,8,22,.4,.85,1.5),this.flash.position.set(.1,ds-.06,this.playerPos.z),this.flash.castShadow=!1,this.flash.shadow.mapSize.set(512,512),this.flash.shadow.bias=4e-4,this.flash.shadow.normalBias=.02,this.flash.shadow.camera.near=.1,this.flash.shadow.camera.far=30,this.flashTarget=new Ee,this.flashTarget.position.set(0,0,-12),this.scene.add(this.flashTarget),this.flash.target=this.flashTarget,this.scene.add(this.flash),this._tmpDir=new I;let e=new xn(.6,6.5,18,1,!0);e.translate(0,3.25,0),e.rotateX(Math.PI/2),this.coneMat=new $e({transparent:!0,depthWrite:!1,blending:As,side:ae,uniforms:{uTime:{value:0},uFade:{value:1},uOpacity:{value:.05}},vertexShader:`
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
      `}),this.cone=new K(e,this.coneMat),this.cone.position.set(.04,-.09,.01),this.camera.add(this.cone);let i=new Ot,s=new K(new St(.035,.03,.24,12),new Ie({color:2568234,roughness:.7}));s.rotation.x=Math.PI/2,i.add(s);let r=new K(new St(.058,.038,.085,12),new Ie({color:7042151,roughness:.65,metalness:.12}));r.rotation.x=Math.PI/2,r.position.z=-.15,i.add(r);let a=new K(new Bi(.046,12),new Be({color:9017735}));a.position.z=-.195,a.rotation.y=Math.PI,i.add(a);let o=new K(new jt(.015,.012,.035),new Ie({color:9673609,roughness:.9}));o.position.set(0,.036,-.02),i.add(o),i.position.set(.31,-.27,-.48),i.rotation.x=-.15,this.camera.add(i),this.torchModel=i,window.addEventListener("keydown",l=>{this.keys[l.code]=!0,this._onKey(l)}),window.addEventListener("keyup",l=>{this.keys[l.code]=!1}),this.dragging=!1,this._dragX=0,this._dragY=0,this.canvas.addEventListener("mousedown",l=>{document.pointerLockElement||this.state!=="playing"||this.noteOpen||this.controls.pointerSpeed!==0&&(this.dragging=!0,this._dragX=l.clientX,this._dragY=l.clientY)}),window.addEventListener("mousemove",l=>{if(!this.dragging||document.pointerLockElement)return;if(this.state!=="playing"||this.noteOpen){this.dragging=!1;return}if(this.controls.pointerSpeed===0)return;let c=l.clientX-this._dragX,u=l.clientY-this._dragY;this._dragX=l.clientX,this._dragY=l.clientY;let d=this.sens,h=this.camera.rotation;h.order="YXZ",h.y-=c*d,h.x=Qt(h.x-u*d,-1.52,1.52),h.z=0}),window.addEventListener("mouseup",()=>{this.dragging=!1}),document.addEventListener("pointerlockerror",()=>this._lockHint()),this.camera.position.set(this.playerPos.x,ds,this.playerPos.z),this.camera.rotation.set(0,Math.PI,0),this.canvas.addEventListener("click",()=>{(this.state==="playing"||this.state==="scared")&&!this.noteOpen&&!document.pointerLockElement&&this._tryLock()}),wt("end-again").addEventListener("click",()=>location.reload()),wt("note").addEventListener("click",l=>{(l.target===wt("note")||l.target===wt("note-close"))&&this._closeNote()})}_initDust(){let e=new we,i=new Float32Array(320*3);this.dustPos=i;for(let r=0;r<320;r++)i[r*3]=dt(-11,11),i[r*3+1]=dt(0,4),i[r*3+2]=dt(-11,11);e.setAttribute("position",new Ce(i,3));let s=new Ls({color:10336460,size:.02,sizeAttenuation:!0,transparent:!0,opacity:.18,depthWrite:!1,blending:As});this.dust=new Kr(e,s),this.scene.add(this.dust)}_initEvents(){let t=wt("scare-canvas");t.width=Sn,t.height=qs;let e=t.getContext("2d");e.fillStyle="#000",e.fillRect(0,0,t.width,t.height);let i=s=>Math.random()*s;e.fillStyle="#b8b2a4",e.beginPath(),e.ellipse(320,190,150+i(20),200+i(30),.06,0,7),e.fill(),e.fillStyle="#8f897c",e.beginPath(),e.ellipse(320,330,110,70,.1,0,7),e.fill(),e.fillStyle="#000",e.beginPath(),e.ellipse(250,140,38,52,.15,0,7),e.fill(),e.beginPath(),e.ellipse(390,140,38,52,-.15,0,7),e.fill(),e.fillStyle="#3a3a38",e.beginPath(),e.arc(258,150,7,0,7),e.fill(),e.beginPath(),e.arc(382,150,7,0,7),e.fill(),e.fillStyle="#000",e.beginPath(),e.ellipse(320,300,55,85,0,0,7),e.fill(),e.fillStyle="#2c1210",e.beginPath(),e.ellipse(320,270,40,30,0,0,7),e.fill(),e.strokeStyle="rgba(60,50,40,0.5)";for(let s=0;s<26;s++)e.beginPath(),e.moveTo(200+i(240),40+i(80)),e.lineTo(200+i(240),240+i(120)),e.stroke();e.strokeStyle="rgba(110,10,8,0.8)",e.lineWidth=6;for(let s of[250,390])e.beginPath(),e.moveTo(s,190),e.lineTo(s-20,260),e.stroke()}_initTouch(){let t=new URLSearchParams(location.search).has("touch");if(this.touchMode=t||"ontouchstart"in window||(navigator.maxTouchPoints|0)>0||window.matchMedia&&matchMedia("(pointer: coarse)").matches,!this.touchMode)return;document.body.classList.add("touch"),this.touchMove={x:0,y:0},this.touchRun=!1,this._joyId=null,this._lookId=null,this._lookLX=0,this._lookLY=0;let e=document.getElementById("touch-help");e&&(e.style.display="inline");let i=wt("touch-ui"),s=wt("joy-knob"),r=wt("joy-zone"),a=wt("btn-interact"),o=42,l=()=>{let p=r.getBoundingClientRect();return{x:p.left+p.width/2,y:p.top+p.height/2}},c=p=>{let m=l(),y=p.clientX-m.x,x=p.clientY-m.y;[y,x]=lu(y,x);let v=Math.hypot(y,x);v>o&&(y*=o/v,x*=o/v),this.touchMove.x=y/o,this.touchMove.y=x/o,s.style.transform=`translate(${y}px, ${x}px)`},u=()=>{this._joyId=null,this.touchMove.x=0,this.touchMove.y=0,s.style.transform="translate(0px, 0px)"};r.addEventListener("touchstart",p=>{if(p.preventDefault(),this._joyId!==null)return;let m=p.changedTouches[0];this._joyId=m.identifier,c(m)},{passive:!1}),r.addEventListener("touchmove",p=>{p.preventDefault();for(let m of p.changedTouches)m.identifier===this._joyId&&c(m)},{passive:!1});for(let p of["touchend","touchcancel"])r.addEventListener(p,m=>{for(let y of m.changedTouches)y.identifier===this._joyId&&u()},{passive:!1});let d=()=>this.state==="playing"&&!this.noteOpen&&wt("pause").classList.contains("hidden");this.canvas.addEventListener("touchstart",p=>{if(this._lookId!==null)return;let m=p.changedTouches[0];this._lookId=m.identifier,this._lookLX=m.clientX,this._lookLY=m.clientY},{passive:!0}),this.canvas.addEventListener("touchmove",p=>{if(d()){for(let m of p.changedTouches){if(m.identifier!==this._lookId)continue;let y=m.clientX-this._lookLX,x=m.clientY-this._lookLY;this._lookLX=m.clientX,this._lookLY=m.clientY;let[v,S]=lu(y,x),M=this.camera.rotation;M.order="YXZ",M.y-=v*this.sens*.85,M.x=Qt(M.x-S*this.sens*.85,-1.52,1.52),M.z=0}p.preventDefault()}},{passive:!1});for(let p of["touchend","touchcancel"])this.canvas.addEventListener(p,m=>{for(let y of m.changedTouches)y.identifier===this._lookId&&(this._lookId=null)},{passive:!1});let h=(p,m)=>{p.addEventListener("touchend",y=>{y.preventDefault(),m()},{passive:!1}),p.addEventListener("touchstart",y=>y.preventDefault(),{passive:!1})};h(a,()=>{if(this.noteOpen){this._closeNote();return}this.state==="playing"&&this._interact()}),h(wt("btn-flash"),()=>{this.state==="playing"&&this._toggleFlash()});let f=wt("btn-run");f.addEventListener("touchstart",p=>{p.preventDefault(),this.touchRun=!0,f.classList.add("on")},{passive:!1});for(let p of["touchend","touchcancel"])f.addEventListener(p,m=>{m.preventDefault(),this.touchRun=!1,f.classList.remove("on")},{passive:!1});h(wt("btn-pause"),()=>{this.state==="playing"&&!this.noteOpen&&this.investigation.openSettings()});let g=wt("rotate-hint"),_=()=>g.classList.toggle("hidden",window.innerWidth>=window.innerHeight||window.__forcedLandscape&&window.__forcedLandscape());_(),window.addEventListener("resize",_),wt("btn-flash").classList.toggle("on",this.flashOn),this._touchUI=i}_sub(t,e="",i=3.4){let s=wt("subtitle");s.querySelector(".cn").textContent=t,s.querySelector(".ja").textContent="",s.classList.add("on"),clearTimeout(this.subtitleTimer),this.subtitleTimer=setTimeout(()=>s.classList.remove("on"),i*1e3)}_setObjective(t){wt("objective").innerHTML=`<div>${t}</div>`}_prompt(t){t?(wt("prompt-text").textContent=t,wt("prompt").classList.remove("hidden")):wt("prompt").classList.add("hidden")}_setFear(t){this.fear=Qt(t,0,1),this.audio.setFear(this.fear),wt("vignette").classList.toggle("fear",this.fear>.55)}_flashRed(){let t=wt("flash");t.style.opacity="1",setTimeout(()=>{t.style.opacity="0"},90)}_start(t=!1){this.state!=="title"||!this.initOK||(this.campaign=new Ws(t?this.investigation.saved:null),this.notes=new Set(this.campaign.documents),wl(this.level,this.campaign),this.audio.ensure(),this.audio.setPaused(!1),this.state="playing",this.startTime=performance.now(),wt("title").classList.add("hidden"),wt("hud").classList.remove("hidden"),this._touchUI&&this._touchUI.classList.remove("hidden"),this._wakeAtCheckpoint(),this._tryLock(),this._refreshCampaign(!1),this._showChapter(),t?this._sub("\u96E8\u8FD8\u5728\u4E0B\u3002\u4F60\u8BB0\u5F97\u81EA\u5DF1\u662F\u6765\u505A\u4EC0\u4E48\u7684\u3002","",4):(this._sub("\u62C6\u9664\u524D\u4E00\u591C\u3002\u90A3\u5C01\u4FE1\u628A\u4F60\u5E26\u56DE\u4E86\u8FD9\u91CC\u3002","",4.5),this.storyEvents.push({delay:5,action:()=>this._sub("\u5148\u770B\u770B\u5927\u5385\u5DE6\u4FA7\u503C\u73ED\u53F0\u4E0A\u7684\u4FE1\u3002\u6309 E \u8C03\u67E5\u3002","",5)})),this.campaign.flags.released&&(this.finale=!0,this.storyEvents.push({delay:6,action:()=>this._spawnHunt()})))}_refreshCampaign(t=!0){if(wl(this.level,this.campaign),this._setObjective(this.campaign.objective),wt("chapter-label").textContent=us[this.campaign.chapter].title,wt("evidence-count").textContent=this.campaign.documents.size+" \u4EFD\u8BB0\u5F55",t&&!this.campaign.flags.ended)try{localStorage.setItem(Xs,JSON.stringify(this.campaign.snapshot())),wt("save-status").textContent="\u8C03\u67E5\u8FDB\u5EA6\u5DF2\u4FDD\u5B58",this.saveNotice=3}catch(e){wt("save-status").textContent="\u6D4F\u89C8\u5668\u65E0\u6CD5\u4FDD\u5B58\u8FDB\u5EA6",this.saveNotice=5}}_showChapter(){let t=us[this.campaign.chapter];wt("chapter-title").textContent=t.title,wt("chapter-subtitle").textContent=t.subtitle,wt("chapter-card").classList.remove("hidden"),this.chapterTimer=4}_campaignAdvanced(t){this._refreshCampaign(),["power","cabinet","music","develop","radio"].includes(t)&&this._showChapter(),t==="power"?(this.battery=Math.max(this.battery,80),this.audio.buzz(),this.shake=.12,this.storyEvents.push({delay:4,action:()=>{this.audio.knock(3),this._sub("\u697C\u4E0A\u7684\u78C1\u9501\u677E\u5F00\u4E86\u3002\u63A5\u7740\uFF0C\u662F\u4E09\u4E0B\u6572\u95E8\u58F0\u3002","",4)}})):t==="tape"?(this.audio.whisper(-.6,2.5),this.audio.musicBox(),this._setFear(.5)):t==="music"?(this.audio.lullaby(),this._setFear(.6),this.storyEvents.push({delay:2,action:()=>{this.ghost.appearAt(3.2,0,10.8,Math.PI),this._sub("\u300C\u4F60\u7EC8\u4E8E\u8BB0\u8D77\u6765\u4E86\u3002\u300D","",4)}})):t==="develop"?(this.audio.cameraShutter(),this.audio.lullaby(),this._setFear(.25),this.storyEvents.push({delay:4,action:()=>{this._sub("\u300C\u82CD\u592A\u3002\u300D\u4F60\u5FF5\u51FA\u7167\u7247\u80CC\u9762\u7684\u540D\u5B57\u3002\u5730\u4E0B\u7684\u94C1\u94FE\u677E\u4E86\u3002","",5),this.audio.hammer(-.3)}})):t==="generator"?(this.audio.buzz(),this.audio.hammer(.4),this.shake=.07,this.battery=Math.max(60,this.battery)):t==="radio"?(this.audio.switchClick(),this.audio.whisper(-.2,2),this._setFear(.15),this.storyEvents.push({delay:4,action:()=>{this.audio.knock(3),this._sub("\u8FDC\u5904\u7684\u7EE7\u7535\u5668\u5438\u5408\u4E86\u3002\u56DE\u5230\u539F\u6CF5\u623F\uFF0C\u8FD9\u6B21\u628A\u95E8\u6253\u5F00\u3002","",5)}})):t==="valves"&&this._startFinale()}_wakeAtCheckpoint(t=this.campaign.checkpoint){this.playerPos.set(t.x,t.y,t.z),this.char=Bs(t.x,t.y,t.z,Ti,Ys),this.camera.position.set(t.x,t.y+ds,t.z),this.camera.rotation.set(0,Math.PI,0),this.eyeY=t.y,this.vy=0,this.grounded=!0,this.traversal.reset(t),this.hiding=!1,this.hideTimer=0,wt("hide-state").classList.add("hidden"),this.monster.despawn(),this.ghost.hide(),this.audio.heartbeat(!1),this._hbOn=!1,this.battery=Math.max(45,this.battery),this.flashOn=!0,this._setFear(.15),this.shake=0,this.storyEvents=this.storyEvents.filter(e=>!e.hunt),this.finale&&this.storyEvents.push({delay:7,hunt:!0,action:()=>this._spawnHunt()})}_spawnHunt(){if(this.state!=="playing")return;let e=this.level.monsterNodes.filter(i=>Math.abs(i.y-this.playerPos.y)<.5&&Math.hypot(i.x-this.playerPos.x,i.z-this.playerPos.z)>8&&Math.hypot(i.x-this.playerPos.x,i.z-this.playerPos.z)<20).at(-1);e&&(this.monster.spawn(new I(e.x,e.y,e.z),"chase"),this.onChaseStart())}_toggleHide(t){if(this.hiding){this.hiding=!1,this.flashOn=this.battery>0,wt("hide-state").classList.add("hidden"),this._sub("\u4F60\u63A8\u5F00\u8863\u67DC\u7684\u95E8\u3002","",2);return}let e=this.monster.pos.distanceTo(this.playerPos);if(["chase","stalk"].includes(this.monster.state)&&e<5&&!en(this.camera.position,this.monster.pos.clone().add(new I(0,1.3,0)),this.level.colliders,this.level.doors)){this._sub("\u5B83\u770B\u89C1\u4E86\u4F60\u3002\u5148\u5173\u4E0A\u95E8\uFF0C\u6216\u8005\u62C9\u5F00\u8DDD\u79BB\u3002","",3);return}this.hiding=!0,this.hideTimer=0,this.hideMesh=t,this.flashOn=!1,this.keys={},this.audio.doorClose(),wt("hide-state").classList.remove("hidden"),this._sub("\u5C4F\u4F4F\u547C\u5438\u3002\u6309 E \u79BB\u5F00\u8863\u67DC\u3002","",4)}setSensitivity(t){this.sens=Qt(t,.004,.04);try{localStorage.setItem("echo_sens",String(this.sens))}catch(e){}this.controls.pointerSpeed!==0&&(this.controls.pointerSpeed=this.sens/.002)}_tryLock(){var t,e;if(this.state!=="ending"&&!this.noteOpen){if(this.touchMode){wt("pause").classList.add("hidden");return}try{let i=(e=(t=document.body).requestPointerLock)==null?void 0:e.call(t);i&&typeof i.catch=="function"&&i.catch(()=>this._lockHint())}catch(i){this._lockHint()}}}_lockHint(){this.lockHintShown||this.state!=="playing"||(this.lockHintShown=!0,this._sub("\u82E5\u89C6\u89D2\u65E0\u6CD5\u8F6C\u52A8\uFF1A\u6309\u4F4F\u5E76\u62D6\u52A8\u9F20\u6807\u6216\u89E6\u63A7\u677F\u3002","\u8996\u70B9\u304C\u52D5\u304B\u306A\u3044\u5834\u5408\uFF1A\u30DE\u30A6\u30B9\u304B\u30C8\u30E9\u30C3\u30AF\u30D1\u30C3\u30C9\u3092\u30C9\u30E9\u30C3\u30B0\u3002",5.5))}_onLock(){if(this.noteOpen||!wt("pause").classList.contains("hidden")){this._skipUnlockPause=!0,this.controls.unlock();return}this.state==="playing"&&(wt("pause").classList.add("hidden"),this.audio.setPaused(!1))}_onUnlock(){var t;if(this._skipUnlockPause){this._skipUnlockPause=!1;return}this.controls.isLocked&&this.state==="playing"&&!this.noteOpen&&((t=this.investigation)==null||t.openSettings())}_onKey(t){var e;if(!t.repeat){if(t.code==="Escape"){if(this.noteOpen){this._closeNote();return}if(this.state!=="playing")return;wt("pause").classList.contains("hidden")?this.investigation.openSettings():this.investigation.closeSettings();return}if(!(["INPUT","TEXTAREA"].includes((e=document.activeElement)==null?void 0:e.tagName)&&document.activeElement.getClientRects().length)&&!(t.code==="Tab"&&this.noteOpen)){if((t.code==="KeyJ"||t.code==="Tab"||t.code==="KeyM")&&this.state==="playing"){t.preventDefault(),this.investigation.panel?this.investigation.close():!this.noteOpen&&wt("pause").classList.contains("hidden")&&this.investigation.openJournal(t.code==="KeyM"?"map":"evidence");return}if(t.code==="KeyE"){if(this.noteOpen){this._closeNote();return}if(this.state!=="playing"||!wt("pause").classList.contains("hidden"))return;if(this.hiding){this._toggleHide();return}this._interact()}t.code==="KeyF"&&this.state==="playing"&&!this.noteOpen&&!this.hiding&&this._toggleFlash(),t.code==="KeyR"&&this.state==="playing"&&!this.noteOpen&&this._wakeAtCheckpoint()}}}_interact(){let t=this._raycastTarget();if(!t)return;let e=t.object.userData.interactable;e&&e.action&&e.action()}_raycastTarget(){var s,r;this._pickDir=this._pickDir||new I,this.camera.getWorldDirection(this._pickDir);let t=this.camera.position,e=null,i=1/0;for(let a of this.level.interactables){if(a.disabled)continue;let o=a.mesh;if(!o.visible)continue;let l=o.getWorldPosition(this._tmpV||(this._tmpV=new I)),c=l.x-t.x,u=l.y-t.y,d=l.z-t.z,h=Math.sqrt(c*c+u*u+d*d);if(h>a.dist||h<.001)continue;let f=(c*this._pickDir.x+u*this._pickDir.y+d*this._pickDir.z)/h;if(f<Math.cos(Math.PI/6)||en(t,l,this.level.colliders,this.level.doors,(r=(s=a.door)==null?void 0:s.collider)!=null?r:o.userData.collider))continue;let g=Math.acos(Qt(f,-1,1))*4+h*.4;g<i&&(i=g,e=a)}return e?{object:e.mesh,interactable:e}:null}_readNote(t){if(this.noteOpen||this.state!=="playing")return;let e=wn[String(t)];e&&(this.noteOpen=!0,this.keys={},this.audio.paperRustle(),wt("note-item").textContent=e.item,wt("note-title").textContent=e.title,wt("note-cn").textContent=e.cn,wt("note-ja").textContent=e.location,this.investigation.renderPhoto("note-photo",t),wt("note").classList.remove("hidden"),this._touchUI&&this._touchUI.classList.add("hidden"),this.controls.isLocked&&(this._skipUnlockPause=!0,this.controls.unlock()),this.campaign.collectDocument(t)&&(this.notes.add(String(t)),this._refreshCampaign()),this.audio.setPaused(!0),wt("note-close").focus())}_closeNote(){var t,e;if((t=this.investigation)!=null&&t.panel){this.investigation.close();return}this.noteOpen&&(this.noteOpen=!1,(e=document.activeElement)==null||e.blur(),wt("note").classList.add("hidden"),this.audio.setPaused(!1),this._touchUI&&this._touchUI.classList.remove("hidden"),this.state==="playing"&&this._tryLock())}_toggleTV(){let t=this.level.props.tv;t.on=!t.on,this.audio.setTV(t.on),t.on?this._sub("\u96EA\u82B1\u566A\u70B9\u2026\u2026","\u7802\u5D50\u2026\u3002",2):(this._sub("\u5B89\u9759\u4E0B\u6765\u4E86\u3002","\u9759\u304B\u306B\u306A\u3063\u305F\u3002",2),t.timer=dt(4,9))}_answerPhone(){this.phoneRinging?(this.phoneRinging=!1,this.audio.phoneStop(),this.audio.whisper(.2,2.2),this._sub("\u2026\u2026\u5988\u5988\uFF1F","\u2026\u2026\u304A\u304B\u3042\u3055\u3093\uFF1F",3.2),this._setFear(this.fear+.12)):(this.audio._noise({dur:.4,type:"highpass",freq:1200,gain:.05}),this._sub("\u561F\u2014\u2014\u561F\u2014\u2014\u3002","\u30C4\u30FC\u2026\u30C4\u30FC\u2026\u3002",2.4))}_ringBell(){var t;if(this.audio.bell(),this._sub("\u94C3\u58F0\u5728\u9ED1\u6697\u4E2D\u56DE\u8361\u3002","\u9234\u306E\u97F3\u304C\u3001\u95C7\u306B\u97FF\u3044\u305F\u3002",2.8),Mn(.6)&&this.monster.state==="dormant"){let e=this.level.ghostSpawns.find(i=>Math.hypot(i.x-this.playerPos.x,i.z-this.playerPos.z)>3);e&&(this.ghost.appearAt(e.x,(t=e.y)!=null?t:0,e.z,e.ry),this.audio.moan(0))}}_lookDoll(){let t=this.level.props.doll;if(t.turned)this._sub("\u2026\u2026\u5B83\u5728\u770B\u3002","\u2026\u2026\u898B\u3066\u3044\u308B\u3002",2.2);else{t.turned=!0;let e=Math.atan2(this.playerPos.x-t.mesh.position.x,this.playerPos.z-t.mesh.position.z);t.targetYaw=e,this.audio.whisper(.3,1.4),this._sub("\u4EBA\u5076\u6B63\u770B\u7740\u4F60\u3002","\u4EBA\u5F62\u304C\u3001\u3053\u3061\u3089\u3092\u898B\u3066\u3044\u308B\u3002",2.8),this._setFear(this.fear+.1)}}_toggleLamp(){let t=this.level.props.lamp;t.on=!t.on,t.light.intensity=t.on?1.8:0,t.shade&&(t.shade.material=t.on?t.shadeOn:t.shadeOff),this.audio.switchClick(),this._sub(t.on?"\u706F\u4EAE\u4E86\u3002":"\u706F\u706D\u4E86\u3002",t.on?"\u706F\u304C\u3064\u3044\u305F\u3002":"\u706F\u304C\u6D88\u3048\u305F\u3002",1.8)}_toggleSwitch(t){t&&(t.on=!t.on,t.fluor&&(t.fluor.userOff=!t.on),t.nub&&(t.nub.position.y=t.baseY+(t.on?.018:-.018)),this.audio.switchClick(),this._sub(t.on?"\u706F\u4EAE\u4E86\u3002":"\u706F\u706D\u4E86\u3002",t.on?"\u706F\u304C\u3064\u3044\u305F\u3002":"\u706F\u304C\u6D88\u3048\u305F\u3002",1.6),!t.on&&Mn(.22)&&setTimeout(()=>{this.state==="playing"&&(t.on=!0,t.fluor&&(t.fluor.userOff=!1),t.nub&&(t.nub.position.y=t.baseY+.018),this.audio.buzz(),this._sub("\u2026\u2026\u706F\uFF0C\u81EA\u5DF1\u4EAE\u4E86\u3002","\u2026\u2026\u96FB\u6C17\u304C\u3001\u3072\u3068\u308A\u3067\u306B\u70B9\u3044\u305F\u3002",3),this._setFear(this.fear+.1))},dt(2e3,4500)))}_mirrorScare(){if(this.ghost.group.visible)return;let t=new I;this.camera.getWorldDirection(t),t.y=0,t.normalize();let e=1.7,i=this.playerPos.x-t.x*e,s=this.playerPos.z-t.z*e;for(let a=0;a<6&&this._spotBlocked(i,s,this.playerPos.y);a++)e+=.3,i=this.playerPos.x-t.x*e,s=this.playerPos.z-t.z*e;let r=Math.atan2(this.playerPos.x-i,this.playerPos.z-s);this.ghost.appearAt(i,this.playerPos.y,s,r),this.ghost.life=1.4,this.audio.whisper(-.2,1.6),this.audio.sting(),this._sub("\u955C\u5B50\u91CC\u2026\u2026\u7AD9\u7740\u4EBA\u3002","",3.2),window.__meta&&!this.touchMode&&window.__meta.flashFace(this),this._setFear(this.fear+.18),this.shake=Math.max(this.shake,.4)}_spotBlocked(t,e,i){let s=this._dynColliders();for(let r of s)if(r.x0<t+.35&&r.x1>t-.35&&r.z0<e+.35&&r.z1>e-.35&&r.y1>i+.15&&r.y0<i+1.7)return!0;return!1}_zoneKitchen(){this.audio.clatter(),this.audio.doorOpen();let t=this.level.props.cabinet;t.openedOnce||(t.openedOnce=!0,this._sub("\u6A71\u67DC\u81EA\u5DF1\u6253\u5F00\u4E86\u3002","\u6238\u68DA\u304C\u3001\u3072\u3068\u308A\u3067\u306B\u958B\u3044\u305F\u3002",3.2),this._setFear(this.fear+.08),this.phoneArmed=!0,this.phoneTimer=setTimeout(()=>this._phoneRings(),dt(25,45)*1e3))}_phoneRings(){this.state!=="playing"||this.phoneRinging||(this.phoneRinging=!0,this.audio.phoneRing(),this._sub("\u7535\u8BDD\u5728\u54CD\u3002","\u96FB\u8A71\u304C\u3001\u9CF4\u3063\u3066\u3044\u308B\u3002",3),setTimeout(()=>{this.phoneRinging=!1},9500))}_zoneLiving(){let t=this.level.props.tv;t.on||(t.on=!0,this.audio.setTV(!0),this._sub("\u7535\u89C6\u81EA\u5DF1\u5F00\u4E86\u3002","\u30C6\u30EC\u30D3\u304C\u3001\u3064\u3044\u305F\u3002",3))}_zoneBedroom(){this.audio.whisper(-.3,2),this._sub("\u2026\u2026\u6709\u4EBA\u66FE\u7761\u5728\u8FD9\u91CC\u3002","\u2026\u2026\u3053\u3053\u3067\u3001\u5BDD\u3066\u3044\u305F\u3002",3.2)}_zoneBathroom(){this.audio.whisper(.4,2.2),this.audio.doorSlam(),this._sub("\u2026\u2026\u6211\u60F3\u56DE\u5BB6\u3002","\u2026\u2026\u304B\u3048\u308A\u305F\u3044\u3002",3.2),this._setFear(this.fear+.12)}_zonePassage(){this.audio.woodenCreak(),this._sub("\u58C1\u6A71\u6DF1\u5904\u6709\u4E00\u6761\u8DEF\u2026\u2026","\u62BC\u5165\u308C\u306E\u5965\u306B\u3001\u9053\u304C\u3042\u308B\u2026\u3002",3.4)}_zoneAltar(){this.audio.bell(),this._sub("\u4E3A\u67D0\u4EBA\u8BBE\u7684\u4F5B\u9F9B\u3002","\u8AB0\u304B\u306E\u305F\u3081\u306E\u3001\u4ECF\u58C7\u3002",3)}_zoneChild(){let t=this.level.props.doll;if(!t.turned){t.turned=!0;let e=Math.atan2(this.playerPos.x-t.mesh.position.x,this.playerPos.z-t.mesh.position.z);t.targetYaw=e}this.childLullaby||(this.childLullaby=!0,this.audio.lullaby()),this.audio.whisper(-.5,1.6),this._sub("\u8FD9\u4E2A\u623F\u95F4\uFF0C\u5F88\u51B7\u3002","\u3053\u306E\u90E8\u5C4B\u306F\u3001\u5BD2\u3044\u3002",3),this._setFear(this.fear+.1)}_zoneUpper(){this.audio.moan(0),this._sub("\u697C\u4E0A\uFF0C\u662F\u540C\u4E00\u6761\u8D70\u5ECA\u3002","\u4E0A\u306E\u968E\u306F\u3001\u540C\u3058\u5ECA\u4E0B\u3060\u3063\u305F\u3002",4),this.upperFlicker=3.5}_zoneStairs(){this.audio.woodenCreak()}_zoneExitVoid(){this.campaign.flags.released&&this.state==="playing"&&!this.noteOpen&&this.investigation.chooseEnding()}_zoneCorridorMid(){if(this.finale)return;this._sub("\u2026\u2026\u706F\uFF0C\u4E00\u76CF\u76CF\u7184\u706D\u3002","",4);let t=this.level.fluorescents.filter(i=>i.z>20&&i.z<58&&i.light.position.y<3);t.sort((i,s)=>s.z-i.z),t.forEach((i,s)=>{setTimeout(()=>{i.kill=!0},300+s*180)});let e=300+t.length*180+300;setTimeout(()=>this.audio.duck(),Math.max(600,e-500)),setTimeout(()=>{this.audio.sting();let i=t.find(s=>Math.abs(s.z-53.7)<.2);if(i&&(i.kill=!1,i.boost=2.8),this.monster.state==="dormant"){this.monster.spawn(new I(0,0,42),"stalk"),this.monster.tempLife=3.6,this.monster.group.rotation.y=Math.PI;let s=new Fe(13623530,3.4,16,1.6);s.position.set(0,2.5,45),this.scene.add(s),this.level.registerLight(s),setTimeout(()=>{s.removeFromParent(),this.level.unregisterLight(s)},3700),setTimeout(()=>{this.finale||this.audio.thud()},3300)}this._sub("\u8D70\u5ECA\u5C3D\u5934\u2026\u2026\u7AD9\u7740\u4EC0\u4E48\u3002","",3.4),this._setFear(.55)},e)}_toggleFlash(){if(this.flashOn)this.flashOn=!1;else if(this.battery<=0)if(this.spareBatteries>0)this.spareBatteries--,this.battery=55,this.flashOn=!0;else{this._sub("\u624B\u7535\u7B52\u6CA1\u7535\u4E86\u3002\u5BFB\u627E\u7535\u6C60\uFF0C\u6216\u8FD4\u56DE\u7AE0\u8282\u8282\u70B9\u3002","",2.6);return}else this.flashOn=!0;let t=wt("btn-flash");t&&t.classList.toggle("on",this.flashOn)}_updateBattery(t){var e,i;if(this.flashOn){let s=this.finale?.3:.12;if(this.battery=Math.max(0,this.battery-s*t),this.battery<=0){this.flashOn=!1;let r=wt("btn-flash");r&&r.classList.remove("on"),this._sub("\u624B\u7535\u7B52\u5F7B\u5E95\u6CA1\u7535\u4E86\u3002","",3.2),this._setFear(Math.min(1,this.fear+.12))}}if(this.flashOn&&this.battery<25&&!this.reduceEffects?this._flashMul=Math.random()<.05?dt(.12,.5):((e=this._flashMul)!=null?e:1)+(1-((i=this._flashMul)!=null?i:1))*Math.min(1,t*9):this._flashMul=1,this.batteryHudT-=t,this.batteryHudT<=0){this.batteryHudT=.2;let s=wt("battery");s&&(s.classList.toggle("low",this.battery<25),wt("battery-fill").style.width=this.battery+"%")}}_pickupBattery(t){let e=this.battery;e>=80?this.spareBatteries++:this.battery=Math.min(100,this.battery+55),t.removeFromParent();let i=this.level.interactables;for(let s=i.length-1;s>=0;s--)if(i[s].mesh===t){i.splice(s,1);break}this.audio.switchClick(),this._sub(e>=100?"\u6536\u597D\u4E00\u8282\u5907\u7528\u7535\u6C60\u3002\u7535\u91CF\u7528\u5B8C\u65F6\u6309 F \u66F4\u6362\u3002":"\u6362\u4E0A\u7535\u6C60\uFF0C\u5149\u7A33\u4E86\u4E0B\u6765\u3002","",2.4)}_startFinale(){this.finale||(this.finale=!0,this.audio.duck(),this.audio.sting(),this.lightsOutTimer=3,this._setFear(.8),this._refreshCampaign(),this.storyEvents.push({delay:2,hunt:!0,action:()=>this._spawnHunt()}))}_ending(t){if(this.state==="ending")return;let e=this.campaign.perform("ending",t);if(!e.ok){this._sub(e.message);return}this.investigation.close(),this.state="ending",this.monster.despawn(),this.ghost.hide(),this.controls.unlock(),this._touchUI&&this._touchUI.classList.add("hidden"),wt("pause").classList.add("hidden"),wt("hud").classList.add("hidden"),this.audio.setPaused(!1),this.audio.setFear(0),this.audio.heartbeat(!1),this.audio.ending();let i=au[t],s=Math.round(this.campaign.elapsed),r=String(Math.floor(s/60)).padStart(2,"0"),a=String(s%60).padStart(2,"0");wt("end-title").textContent=i.title,wt("end-label").textContent=i.label,wt("end-text").textContent=i.text,wt("end-stats").textContent="\u7528\u65F6 "+r+":"+a+" / \u8BB0\u5F55 "+this.campaign.documents.size+" / \u9192\u6765 "+this.scareCount+" \u6B21";try{localStorage.setItem(Xs,JSON.stringify(this.campaign.snapshot()))}catch(o){}wt("fade").style.opacity="1",setTimeout(()=>{wt("end").classList.remove("hidden"),wt("fade").style.opacity="0"},900)}onMonsterAttack(){this.state==="playing"&&(this.state="scared",this.scaredTimer=1.35,this.scareCount++,this.shake=1,this._flashRed(),wt("scare").style.opacity=this.reduceEffects?"0":"1",this.audio.scareBurst(),this.audio.heartbeat(!1),this._setFear(1),wt("vignette").classList.add("fear"),this.controls.pointerSpeed=0)}onMonsterAttackEnd(){this.state==="scared"&&(wt("scare").style.opacity="0",wt("fade").classList.remove("white"),wt("fade").style.opacity="1",setTimeout(()=>{this._wakeAtCheckpoint(),this.controls.pointerSpeed=this.sens/.002,wt("fade").style.opacity="0",wt("vignette").classList.remove("fear"),this.state="playing",this._sub("\u4F60\u5728\u6700\u540E\u4E00\u6B21\u8BB0\u8D77\u771F\u76F8\u7684\u5730\u65B9\u9192\u6765\u3002\u8C03\u67E5\u8FDB\u5EA6\u4FDD\u7559\u3002","",4),this._tryLock()},700))}onChaseStart(){this._setFear(.8),this._sub("\u5FEB\u8DD1\uFF01","\u9003\u3052\u308D\uFF01",2.2),this._hbOn=!0,this.audio.heartbeat(!0,1)}_randomEvent(){var r,a;if(this.state!=="playing"||this.monster.state==="chase"||this.monster.state==="attack")return;let t=Math.random(),e=this.playerPos,i=Math.hypot(e.x,e.z+1.35)>6,s=e.y<1;if(t<.12){this.audio.whisper(dt(-.8,.8),dt(1.4,2.4));{let[o,l]=En([["\u2026\u2026\u8FC7\u6765","\u2026\u2026\u3053\u3063\u3061"],["\u2026\u2026\u627E\u5230\u4F60\u4E86","\u2026\u2026\u898B\u3064\u3051\u305F"],["\u2026\u2026\u5728\u54EA\u513F","\u2026\u2026\u3069\u3053"],["\u2026\u2026\u4F4F\u624B","\u2026\u2026\u3084\u3081\u3066"]]);this._sub(o,l,2.6)}}else if(t<.2){let o=this.level.ghostSpawns.filter(l=>{let c=Math.hypot(l.x-e.x,l.z-e.z);return c>4.5&&c<17});if(o.length){let l=En(o);this.ghost.appearAt(l.x,(r=l.y)!=null?r:0,l.z,l.ry),this.audio.moan(dt(-.4,.4)),this._setFear(this.fear+.1)}}else if(t<.28){let o=this.level.doors.filter(l=>!l.locked&&l.type==="swing"&&l.label!=="\u58C1\u6A71"&&Math.hypot(l.hinge.x-e.x,l.hinge.z-e.z)>3);if(o.length){let l=En(o);l.open?(l.open=!1,l.target=0,this.audio.doorSlam()):this.audio.knock(1)}else this.audio.doorSlam()}else if(t<.32){let o=this.level.doors.filter(l=>!l.locked&&l.type==="swing"&&l.label!=="\u58C1\u6A71"&&Math.hypot(l.hinge.x-e.x,l.hinge.z-e.z)>4);if(o.length){let l=En(o);l.open||(l.open=!0,l.target=1,this.audio.doorOpen(),this._sub("\u95E8\u2026\u2026\u81EA\u5DF1\u5F00\u4E86\u3002","\u6249\u304C\u2026\u4E00\u4EBA\u3067\u958B\u3044\u305F\u3002",3),this._setFear(this.fear+.05))}else this.audio.woodenCreak()}else if(t<.36)this.audio.duck(),this.lightsOutTimer=2.6;else if(t<.44)s?(this.audio.ceilingSteps(),this._sub("\u697C\u4E0A\u2026\u2026\u6709\u811A\u6B65\u58F0\u3002","\u4E0A\u306E\u968E\u3067\u2026\u8DB3\u97F3\u304C\u3002",3)):(this.audio.knock(2),this._sub("\u5899\u58C1\u7684\u53E6\u4E00\u4FA7\uFF0C\u6709\u4EBA\u5728\u6572\u3002","\u58C1\u306E\u5411\u3053\u3046\u3067\u3001\u8AB0\u304B\u304C\u53E9\u3044\u3066\u3044\u308B\u3002",3));else if(t<.52)this.audio.knock(3),this._sub("\u6709\u4EBA\u5728\u6572\u95E8\u2026\u2026","\u30C9\u30A2\u3092\u3001\u53E9\u304F\u97F3\u304C\u2026",3);else if(t<.58&&i)this.audio.runStep(),setTimeout(()=>this.audio.runStep(),260),setTimeout(()=>this.audio.runStep(),520),this._sub("\u8EAB\u540E\u2026\u2026\uFF1F","\u5F8C\u308D\u306B\u2026\uFF1F",2.4);else if(t<.66)this.audio.cry(dt(-.6,.6)),this._sub("\u2026\u2026\u6709\u5B69\u5B50\u5728\u54ED\u3002","\u2026\u2026\u5B50\u4F9B\u306E\u6CE3\u304D\u58F0\u304C\u3002",3);else if(t<.69)this.audio.childGiggle(dt(-.6,.6)),this._setFear(this.fear+.05);else if(t<.75)this.audio.breath(dt(-.6,.6),dt(2.4,3.6));else if(t<.81){let o=this.level.props.tv;o.on||(o.on=!0,this.audio.setTV(!0))}else if(t<.84)this.audio.radio(),this._sub("\u6536\u97F3\u673A\u2026\u2026\u81EA\u5DF1\u54CD\u4E86\u3002","\u30E9\u30B8\u30AA\u304C\u3001\u52DD\u624B\u306B\u9CF4\u3063\u305F\u3002",3);else if(t<.9&&this.phoneArmed&&!this.phoneRinging)this._phoneRings();else if(t<.96&&this.campaign.flags.power&&this.monster.state==="dormant"&&!this.finale)this.monster.spawn(new I(0,0,55.5),"stalk"),this.monster.tempLife=3,this.audio.moan(0),this._setFear(this.fear+.15);else{let o=Math.random();if(o<.18)this.audio.siren(dt(-.5,.5)),this._sub("\u96E8\u58F0\u6DF1\u5904\uFF0C\u6709\u8B66\u7B1B\u5728\u54CD\u3002","\u96E8\u97F3\u306E\u5965\u3067\u3001\u30B5\u30A4\u30EC\u30F3\u304C\u9CF4\u3063\u3066\u3044\u308B\u3002",3.4);else if(o<.38)this.audio.hammer(dt(-.5,.5)),this._sub("\u5899\u91CC\u7684\u6C34\u7BA1\uFF0C\u549A\u3001\u549A\u5730\u54CD\u3002","\u58C1\u306E\u914D\u7BA1\u304C\u3001\u30C9\u30F3\u3001\u30C9\u30F3\u3068\u9CF4\u308B\u3002",3);else if(o<.52&&e.x<-13.8&&e.z>14.8)this.audio.washer(-.6),this.shake=Math.max(this.shake,.12),this._sub("\u6D17\u8863\u673A\u2026\u2026\u81EA\u5DF1\u5728\u8F6C\u3002","\u6D17\u6FEF\u6A5F\u304C\u2026\u52DD\u624B\u306B\u56DE\u3063\u3066\u3044\u308B\u3002",3.4),this._setFear(this.fear+.06);else{if(this.audio.woodenCreak(),Mn(.5)){let l=En(this.level.ghostSpawns);Math.hypot(l.x-e.x,l.z-e.z)>4.5&&this.ghost.appearAt(l.x,(a=l.y)!=null?a:0,l.z,l.ry)}Mn(.4)&&this.audio.scrape()}}if(Mn(.18)){let o=this.level.props.silhouette;o.visible=!0,this.audio.moan(0),setTimeout(()=>{o.visible=!1},2600)}}_loop(){var c,u,d;if(requestAnimationFrame(this._loop),!this.initOK)return;let t=performance.now(),e=Math.min(.05,this.lastT?(t-this.lastT)/1e3:.016);this.lastT=t,this.time+=e,this.investigation.update(e);let i=this.state==="playing"&&!this.noteOpen&&wt("pause").classList.contains("hidden");if(i){this.campaign.elapsed+=e;for(let f of this.storyEvents)f.delay-=e;let h=this.storyEvents.filter(f=>f.delay<=0);this.storyEvents=this.storyEvents.filter(f=>f.delay>0);for(let f of h)f.action();this.chapterTimer>0&&(this.chapterTimer-=e)<=0&&wt("chapter-card").classList.add("hidden"),this.saveNotice>0&&(this.saveNotice-=e)<=0&&(wt("save-status").textContent=""),wt("location-label").textContent=hs(this.playerPos)}if(this.state==="title"&&(this.camera.position.set(-22,2.8+ds,37.8),this.camera.rotation.set(-.025,.26+Math.sin(this.time*.055)*.055,0)),this.touchMode&&this._autoResolution(e),i||this.state==="scared"){let h=this.state==="scared";!h&&!this.hiding&&this._updatePlayer(e),this._updateInteractPrompt(),h||(this.atmosphere.update(e),this._updateDirector(e),this._updateBattery(e))}if(this.skyMaterial.uniforms.uTime.value=this.time,this.level.update(e,this.time,this.camera.position,this.camera.getWorldDirection(this._viewDir||(this._viewDir=new I)),this.reduceEffects),this.level.campaign.rain){let h=this.level.campaign.rain.geometry.attributes.position.array;for(let f=0;f<h.length;f+=6)h[f+1]-=e*5,h[f+4]-=e*5,h[f+1]<(f>=540?5.9:2.9)&&(h[f+1]+=9,h[f+4]+=9);this.level.campaign.rain.geometry.attributes.position.needsUpdate=!0}let s=this.level.props.tv;if(s.screen.visible=s.on,s.on?($h(this.level.tex.tvStatic),this.level.tvLight.intensity=1.4+Math.sin(this.time*23)*.5+dt(-.2,.2),this.tvFaceTimer=((c=this.tvFaceTimer)!=null?c:dt(30,50))-e,this.tvFaceTimer<=0&&(this.tvFaceTimer=dt(35,60),this.level.props.tvFace.visible=!0,this.audio._noise({dur:.5,type:"bandpass",freq:2200,q:6,gain:.06}),Math.hypot(this.playerPos.x- -6.5,this.playerPos.z-15.25)<9&&(this._sub("\u7535\u89C6\u91CC\u2026\u2026\u6709\u4E00\u5F20\u8138\u3002","\u30C6\u30EC\u30D3\u306E\u4E2D\u306B\u2026\u9854\u304C\u3002",2.6),this._setFear(this.fear+.08)),setTimeout(()=>{this.level.props.tvFace.visible=!1},750))):(this.level.tvLight.intensity=0,s.timer>0&&this.state==="playing"&&(s.timer-=e,s.timer<=0&&(s.on=!0,this.audio.setTV(!0),this.audio._noise({dur:.4,type:"bandpass",freq:1200,q:2,gain:.07}),this._sub("\u7535\u89C6\u53C8\u81EA\u5DF1\u5F00\u4E86\u3002","\u30C6\u30EC\u30D3\u304C\u3001\u307E\u305F\u52DD\u624B\u306B\u70B9\u3044\u305F\u3002",3)))),this.blackout)for(let h of this.level.fluorescents)h.kill=!0;else if(this.lightsOutTimer>0){this.lightsOutTimer-=e;for(let h of this.level.fluorescents)h.kill=!0;if(this.lightsOutTimer<=0)for(let h of this.level.fluorescents)h.kill=!1}if(this.upperFlicker>0){this.upperFlicker-=e;for(let h of this.level.fluorescents)if(h.z>2&&h.z<62&&h.light.position.y>4){let f=Math.sin(this.time*50)>0;h.light.intensity=f?h.base:.05,h.tube&&(h.tube.material=f?this.level.tubeMat:this.level.tubeOffMat)}}let r=this.level.props.cabinet;r.openedOnce&&(r.angle=ei(r.angle,1.35,e*2.2),r.pivot.rotation.y=r.angle);let a=this.level.props.doll;if(a.turned&&a.targetYaw!==void 0){let h=a.targetYaw-a.mesh.rotation.y;if(h=Math.atan2(Math.sin(h),Math.cos(h)),a.mesh.rotation.y+=h*Math.min(1,e*1.1),this.dollTimer=((u=this.dollTimer)!=null?u:dt(14,22))-e,this.dollTimer<=0){this.dollTimer=dt(16,26);let f=this.level.dollSpots||[],g=a.mesh.position,_=f.filter(p=>Math.hypot(p.x-this.playerPos.x,p.z-this.playerPos.z)>4&&(Math.abs(p.x-g.x)>.5||Math.abs(p.z-g.z)>.5));if(_.length){let p=g.x-this.playerPos.x,m=g.z-this.playerPos.z,y=Math.hypot(p,m)||1,x=new I;if(this.camera.getWorldDirection(x),x.x*(p/y)+x.z*(m/y)<.5){let v=En(_);a.mesh.position.set(v.x,0,v.z),a.mesh.rotation.y=v.ry,a.targetYaw=v.ry,this.audio.musicBox(),Math.hypot(v.x-this.playerPos.x,v.z-this.playerPos.z)<8&&this._sub("\u4EBA\u5076\u2026\u2026\u4E0D\u5728\u539F\u6765\u7684\u4F4D\u7F6E\u4E86\u3002","\u4EBA\u5F62\u304C\u2026\u5143\u306E\u5834\u6240\u306B\u3044\u306A\u3044\u3002",3)}}}}if((i||this.state==="scared")&&this._updateMonster(e),i&&this.ghost.update(e,this.playerPos),i&&(this._setFear(Math.max(.12,this.fear-e*.02)),this.monster.state==="chase"&&this._setFear(Math.min(1,this.fear+e*.12)),this.monster.state==="stalk")){let h=Math.hypot(this.monster.pos.x-this.playerPos.x,this.monster.pos.z-this.playerPos.z);h<14&&this._setFear(Math.min(.8,this.fear+e*(.1*(1-h/14))))}this.shake>0&&(this.shake=Math.max(0,this.shake-e*1.6),this.camera.position.x+=dt(-.03,.03)*this.shake,this.camera.position.y+=dt(-.02,.02)*this.shake);let o=75+this.fear*7+(this.state==="scared"?10:0);Math.abs(this.camera.fov-o)>.1&&(this.camera.fov=ei(this.camera.fov,o,e*4),this.camera.updateProjectionMatrix()),this.grade.uniforms.uTime.value=this.time,this.grade.uniforms.uFear.value=this.reduceEffects?0:this.fear,this.grade.uniforms.uDistort.value=this.reduceEffects?0:this.state==="scared"?Math.min(1,this.scaredTimer):this.shake,this.coneMat.uniforms.uTime.value=this.time,this.torchModel.visible=this.state==="playing"&&!this.hiding,this._updateDust(e),this.audio.setHum(this.level.humLevel(this.camera.position)),i&&this.audio.updateMusic(e,this.fear,this.monster.state==="chase"||this.monster.state==="attack"),this.audio.setWind(Qt(.3+(this.playerPos.y>2.5?.2:0)+(this.playerPos.z<2.2||this.playerPos.z>56?.3:0),0,1)),this.audio.setRain(Qt(.3+(this.playerPos.y>2.5?.25:0)+(this.playerPos.z<2.2||this.playerPos.z>56?.35:0),0,1));let l=this.level.props.furin;l&&this.state==="playing"&&(Math.hypot(this.camera.position.x-l.position.x,this.camera.position.z-l.position.z)<7?(this.furinT=((d=this.furinT)!=null?d:dt(4,9))-e,this.furinT<=0&&(this.furinT=dt(6,16),this.audio.chime(Qt((l.position.x-this.camera.position.x)/7,-1,1)))):this.furinT=dt(3,8)),this._updateLightning(e),this.nopost?this.renderer.render(this.scene,this.camera):this.composer.render(),this._plc=(this._plc||0)+1,this.posLog&&this._plc%30===0&&(document.title=`POS:z=${this.playerPos.z.toFixed(1)},y=${this.playerPos.y.toFixed(2)} flash=${this.flash.intensity.toFixed(1)}`)}_updatePlayer(t){var v,S;let e=this.keys,i=0,s=0,r;if(this.touchMode){i=this.touchMove.x,s=-this.touchMove.y,r=this.touchRun;let M=Math.hypot(i,s);M>1&&(i/=M,s/=M)}else{(e.KeyW||e.ArrowUp)&&(s+=1),(e.KeyS||e.ArrowDown)&&(s-=1),(e.KeyA||e.ArrowLeft)&&(i-=1),(e.KeyD||e.ArrowRight)&&(i+=1),r=e.ShiftLeft||e.ShiftRight;let M=Math.hypot(i,s)||1;i/=M,s/=M}let a=r?3.9:2.7;if(this.tpZ!==void 0){if(!this._tpDone){this._tpDone=!0;let M=(v=this.tpX)!=null?v:0,b=-10,U=1/0,E=this.level.colliders;for(let C of E)C.x0<M+.3&&C.x1>M-.3&&C.z0<this.tpZ+.3&&C.z1>this.tpZ-.3&&C.y1<6&&C.y1>b&&(b=C.y1);b<-5&&(b=0);for(let C of E)C.x0<M+.3&&C.x1>M-.3&&C.z0<this.tpZ+.3&&C.z1>this.tpZ-.3&&C.y0>b+1.5&&C.y0<U&&(U=C.y0);let T;this.tpY!==void 0?T=this.tpY:T=Math.min(b+.45,U===1/0?b+2.2:U-Ys-.05),this.playerPos.set(M,T,this.tpZ),this.char.x0=M-Ti,this.char.x1=M+Ti,this.char.z0=this.tpZ-Ti,this.char.z1=this.tpZ+Ti,this.char.y0=T,this.char.y1=T+Ys,this.eyeY=T,this.vy=0,this.camera.position.set(M,T+ds,this.tpZ)}i=0,s=0,this.tpYaw!==void 0?this.camera.rotation.y=this.tpYaw*Math.PI/180:this.camera.rotation.y=this.tpFace==="s"?Math.PI+1.57:Math.PI-1.57,this.camera.rotation.x=0}let o=this.camera.rotation.y,l=Math.sin(o),c=Math.cos(o),u=(-l*s+c*i)*a*t,d=(-c*s-l*i)*a*t;this.char.x0=this.playerPos.x-Ti,this.char.x1=this.playerPos.x+Ti,this.char.z0=this.playerPos.z-Ti,this.char.z1=this.playerPos.z+Ti,this.char.y0=this.playerPos.y,this.char.y1=this.playerPos.y+Ys;let h=this.playerPos.x,f=this.playerPos.z,g=this._dynColliders();this.vy-=22*t;let _=yo(this.char,u,this.vy*t,d,g,.35);this.grounded=_.grounded,_.grounded&&(this.vy=0),this.playerPos.x=(this.char.x0+this.char.x1)/2,this.playerPos.z=(this.char.z0+this.char.z1)/2,this.playerPos.y=this.char.y0;let p=this.traversal.update(this.char,this.grounded,g,t);if(p){this._wakeAtCheckpoint(p),this._sub("\u811A\u4E0B\u7684\u5730\u9762\u5931\u53BB\u652F\u6491\u3002\u4F60\u9000\u56DE\u4E86\u521A\u624D\u7AD9\u7A33\u7684\u4F4D\u7F6E\u3002","",3);return}let m=Math.hypot(this.playerPos.x-h,this.playerPos.z-f)/t;if(this.grounded&&m>.4){this.bobPhase+=m/2.7*t*8.5;let M=Math.sin(this.bobPhase);if(this.lastBobSin>0&&M<=0){let b=this._floorSurface();r?this.audio.runStep(b):this.audio.footstep(b)}this.lastBobSin=M,this.bob=Math.abs(M)*.03*Math.min(1,m/2.7)}else this.bob=ei(this.bob||0,0,t*8),this.lastBobSin=0;this.eyeY=ei(this.eyeY||0,this.playerPos.y,Math.min(1,t*16)),this.camera.position.set(this.playerPos.x,this.eyeY+ds+this.bob,this.playerPos.z),this.camera.rotation.z=Math.sin(this.time*.4)*.0016+this.fear*Math.sin(this.time*1.7)*.005+(r?.012*Math.sin(this.bobPhase):0),this.camera.rotation.order="YXZ",this.camera.getWorldDirection(this._tmpDir),this.flashTarget.position.copy(this.camera.position).addScaledVector(this._tmpDir,12),this._tmpDir2=this._tmpDir2||new I,this.camera.getWorldDirection(this._tmpDir2),this.flash.position.copy(this.camera.position).addScaledVector(this._tmpDir2,.12),this.flash.position.y-=.06;let y=0;if(this.flashOn){let M=this.camera.position,b=2.2;for(let C of this.colliders){if(C.y1<M.y-.8||C.y0>M.y+.8)continue;let F=Qt(M.x,C.x0,C.x1),et=Qt(M.z,C.z0,C.z1),D=Qt(M.y,C.y0,C.y1),O=Math.hypot(M.x-F,M.y-D,M.z-et);O<b&&(b=O)}y=6.5*Qt((b-.3)/1.4,.15,1)*((S=this._flashMul)!=null?S:1);let E=this.monster.state==="stalk"||this.monster.state==="chase",T=Math.hypot(this.monster.pos.x-this.playerPos.x,this.monster.pos.z-this.playerPos.z);E&&T<5&&!this.reduceEffects&&(y=y*(.55+.45*Math.sin(this.time*41+T*9)))}this.flash.intensity=y,this.coneMat.uniforms.uFade.value=this.flashOn?1:0;let x=this._trigV||(this._trigV=new I);x.set(this.playerPos.x,this.playerPos.y+.2,this.playerPos.z),this.level.checkTriggers(x)}_dynColliders(){let t=this._dynArr||(this._dynArr=[]);t.length=0;let e=this.level.colliders;for(let s=0;s<e.length;s++)t.push(e[s]);let i=this.level.doors;for(let s=0;s<i.length;s++)i[s].collider&&t.push(i[s].collider);return t}_floorSurface(){let t=this.playerPos;if(t.y<-.8||t.y>4.8||t.z>61.6)return"concrete";if(t.y>2&&t.x<-1){let e=hs(t);return["\u897F\u7FFC\u5C01\u95ED\u8D70\u5ECA","\u7EA2\u706F\u6697\u623F"].includes(e)?"concrete":"wood"}return t.y<1.5&&t.x>7&&t.z>=32&&t.z<46?"concrete":t.y<1.5&&t.x>1.3&&t.x<8.4&&t.z>0&&t.z<8.5?"tatami":t.z<0||t.z>57.5&&t.y<2.7||t.y<1.5&&t.x<-13.8&&t.z>13.8?"concrete":"wood"}_updateInteractPrompt(){if(this.noteOpen||this.hiding){this._prompt(null);return}let t=this._raycastTarget();this._prompt(t?t.interactable.label:null),this.touchMode&&wt("btn-interact").classList.toggle("avail",!!t)}_updateDirector(t){this.eventTimer-=t,this.eventTimer<=0&&(this.eventTimer=dt(21,42),this._randomEvent())}_updateMonster(t){if(this.hiding){this.hideTimer+=t,this.hideTimer>5&&(this.monster.despawn(),this._hbOn&&(this._hbOn=!1,this.audio.heartbeat(!1)));return}let e=this.playerPos,i=this._mDir||(this._mDir=new I);this.camera.getWorldDirection(i),i.y=0,i.normalize();let s=this._mTo||(this._mTo=new I);s.set(this.monster.pos.x-e.x,0,this.monster.pos.z-e.z);let r=s.length(),a=this.flashOn&&r>.01&&r<22&&Math.abs(this.monster.pos.y-e.y)<1&&i.dot(s.normalize())>.94&&!en(this.camera.position,this.monster.pos.clone().add(new I(0,1.2,0)),this.level.colliders,this.level.doors),o=this._mPl||(this._mPl=new I);o.set(e.x,e.y,e.z),this.monster.update(t,{player:o,lookDir:i,flashHit:a,time:this.time,colliders:this._dynColliders(),stairs:this.level.stairs,reduceEffects:this.reduceEffects,doors:this.level.doors,nodes:this.level.monsterNodes,audio:this.audio,game:this}),this._hbOn&&this.monster.state!=="chase"&&(this._hbOn=!1,this.audio.heartbeat(!1))}_updateLightning(t){if(this.reduceEffects)return;let e=this.lightning,i=this.level.materials.moonWin;if(e.t>0){e.t-=t,Math.random()<.35&&(this.shake=Math.max(this.shake,.08));let s=1-e.t/e.dur,a=(s<.15||s>.45&&s<.55?1:.25)*(.5+Math.random()*.5);this.hemi.intensity=this.hemiBase+a*1.7;for(let o of this.level.windowLights)o.intensity=.8+a*5;if(i.color.setScalar(1+a*1.5),e.t<=0){this.hemi.intensity=this.hemiBase;for(let o of this.level.windowLights)o.intensity=.8;i.color.setScalar(1)}return}e.next-=t,e.next<=0&&(e.next=dt(45,100),e.dur=dt(.45,.9),e.t=e.dur,e.dist=dt(.3,.95),setTimeout(()=>{(this.state==="playing"||this.state==="scared")&&(this.audio.thunder(e.dist),Mn(.35)&&this._sub("\u6253\u96F7\u4E86\u3002","\u96F7\u304C\u3001\u9CF4\u3063\u305F\u3002",2.2))},400+e.dist*3e3))}_updateDust(t){let e=this.dustPos,i=this.camera.position.x,s=this.camera.position.z,r=this.camera.position.y;for(let a=0;a<e.length;a+=3){e[a+1]+=t*dt(.02,.07),e[a+1]>4&&(e[a+1]=0),e[a]+=Math.sin(this.time*.6+a)*t*.08,e[a+2]+=Math.cos(this.time*.5+a)*t*.08,e[a]-i>11?e[a]=i-11:e[a]-i<-11&&(e[a]=i+11),e[a+2]-s>11?e[a+2]=s-11:e[a+2]-s<-11&&(e[a+2]=s+11);let o=e[a]-i,l=e[a+2]-s,c=e[a+1]-r;o*o+c*c+l*l<1.69&&(e[a]=i+dt(-11,11),e[a+1]=dt(.2,3.8),e[a+2]=s+dt(-11,11))}this.dust.geometry.attributes.position.needsUpdate=!0,this.dust.position.set(i,0,s)}};wt("error-retry").addEventListener("click",()=>location.reload());try{window.__game=new Sl,new URLSearchParams(location.search).has("autostart")&&setTimeout(()=>window.__game._start(),400),new URLSearchParams(location.search).has("pos")&&(window.__game.posLog=!0);let n=new URLSearchParams(location.search);n.has("tp")&&(window.__game.tpZ=parseFloat(n.get("tp"))||0,window.__game.tpFace=n.get("face")==="s"?"s":"n"),n.has("tpx")&&(window.__game.tpX=parseFloat(n.get("tpx"))||0),n.has("tpy")&&(window.__game.tpY=parseFloat(n.get("tpy"))),n.has("yaw")&&(window.__game.tpYaw=parseFloat(n.get("yaw"))),n.has("noflash")&&(window.__game.flashOn=!1)}catch(n){console.error(n)}})();
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
