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

(()=>{var lu=0,Pl=1,cu=2;var ph=1,hu=2,Di=3,ki=0,Xe=1,oe=2;var Mi=0,Yn=1,As=2,Ll=3,Il=4,uu=5,ln=100,du=101,fu=102,Dl=103,Ul=104,pu=200,mu=201,gu=202,_u=203,ma=204,ga=205,xu=206,yu=207,vu=208,bu=209,Mu=210,Eu=211,wu=212,Su=213,Tu=214,Au=0,Ru=1,Cu=2,Sr=3,Pu=4,Lu=5,Iu=6,Du=7,mh=0,Uu=1,Nu=2,Ji=0,ku=1,zu=2,Fu=3,sl=4,Ou=5,Bu=6;var gh=300,Kn=301,$n=302,_a=303,xa=304,lo=306,Ei=1e3,pi=1001,ya=1002,ke=1003,Nl=1004;var Io=1005;var je=1006,Hu=1007;var gi=1008;var Ki=1009,Gu=1010,Vu=1011,rl=1012,_h=1013,Yi=1014,Zi=1015,fn=1016,xh=1017,yh=1018,hn=1020,Wu=1021,mi=1023,Xu=1024,qu=1025,un=1026,jn=1027,Yu=1028,vh=1029,Zu=1030,bh=1031,Mh=1033,Do=33776,Uo=33777,No=33778,ko=33779,kl=35840,zl=35841,Fl=35842,Ol=35843,Eh=36196,Bl=37492,Hl=37496,Gl=37808,Vl=37809,Wl=37810,Xl=37811,ql=37812,Yl=37813,Zl=37814,Jl=37815,Kl=37816,$l=37817,jl=37818,Ql=37819,tc=37820,ec=37821,zo=36492,ic=36494,nc=36495,Ju=36283,sc=36284,rc=36285,oc=36286;var Tr=2300,Ar=2301,Fo=2302,ac=2400,lc=2401,cc=2402;var wh=3e3,dn=3001,Ku=3200,$u=3201,Sh=0,ju=1,ze="",pe="srgb",zi="srgb-linear",ol="display-p3",co="display-p3-linear",Rr="linear",fe="srgb",Cr="rec709",Pr="p3";var Tn=7680;var hc=519,Qu=512,td=513,ed=514,Th=515,id=516,nd=517,sd=518,rd=519,uc=35044;var dc="300 es",va=1035,Ni=2e3,Lr=2001,wi=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let i=this._listeners[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Ge=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var Oo=Math.PI/180,Ir=180/Math.PI;function rs(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ge[n&255]+Ge[n>>8&255]+Ge[n>>16&255]+Ge[n>>24&255]+"-"+Ge[t&255]+Ge[t>>8&255]+"-"+Ge[t>>16&15|64]+Ge[t>>24&255]+"-"+Ge[e&63|128]+Ge[e>>8&255]+"-"+Ge[e>>16&255]+Ge[e>>24&255]+Ge[i&255]+Ge[i>>8&255]+Ge[i>>16&255]+Ge[i>>24&255]).toLowerCase()}function We(n,t,e){return Math.max(t,Math.min(e,n))}function od(n,t){return(n%t+t)%t}function Bo(n,t,e){return(1-e)*n+e*t}function fc(n){return(n&n-1)===0&&n!==0}function ba(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function ps(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function $e(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var xt=class n{constructor(t=0,e=0){n.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(We(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},$t=class n{constructor(t,e,i,s,r,o,a,l,c){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c)}set(t,e,i,s,r,o,a,l,c){let u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],d=i[7],h=i[2],f=i[5],g=i[8],x=s[0],p=s[3],m=s[6],y=s[1],_=s[4],v=s[7],S=s[2],b=s[5],R=s[8];return r[0]=o*x+a*y+l*S,r[3]=o*p+a*_+l*b,r[6]=o*m+a*v+l*R,r[1]=c*x+u*y+d*S,r[4]=c*p+u*_+d*b,r[7]=c*m+u*v+d*R,r[2]=h*x+f*y+g*S,r[5]=h*p+f*_+g*b,r[8]=h*m+f*v+g*R,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-i*r*u+i*a*l+s*r*c-s*o*l}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],d=u*o-a*c,h=a*l-u*r,f=c*r-o*l,g=e*d+i*h+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return t[0]=d*x,t[1]=(s*c-u*i)*x,t[2]=(a*i-s*o)*x,t[3]=h*x,t[4]=(u*e-s*l)*x,t[5]=(s*r-a*e)*x,t[6]=f*x,t[7]=(i*l-c*e)*x,t[8]=(o*e-i*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Ho.makeScale(t,e)),this}rotate(t){return this.premultiply(Ho.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ho.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Ho=new $t;function Ah(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Dr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function ad(){let n=Dr("canvas");return n.style.display="block",n}var pc={};function Ms(n){n in pc||(pc[n]=!0,console.warn(n))}var mc=new $t().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),gc=new $t().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Js={[zi]:{transfer:Rr,primaries:Cr,toReference:n=>n,fromReference:n=>n},[pe]:{transfer:fe,primaries:Cr,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[co]:{transfer:Rr,primaries:Pr,toReference:n=>n.applyMatrix3(gc),fromReference:n=>n.applyMatrix3(mc)},[ol]:{transfer:fe,primaries:Pr,toReference:n=>n.convertSRGBToLinear().applyMatrix3(gc),fromReference:n=>n.applyMatrix3(mc).convertLinearToSRGB()}},ld=new Set([zi,co]),le={enabled:!0,_workingColorSpace:zi,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!ld.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,t,e){if(this.enabled===!1||t===e||!t||!e)return n;let i=Js[t].toReference,s=Js[e].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,t){return this.convert(n,this._workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this._workingColorSpace)},getPrimaries:function(n){return Js[n].primaries},getTransfer:function(n){return n===ze?Rr:Js[n].transfer}};function Zn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Go(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var An,Ur=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement=="undefined")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{An===void 0&&(An=Dr("canvas")),An.width=t.width,An.height=t.height;let i=An.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=An}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement!="undefined"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&t instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&t instanceof ImageBitmap){let e=Dr("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Zn(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Zn(e[i]/255)*255):e[i]=Zn(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},cd=0,Nr=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:cd++}),this.uuid=rs(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Vo(s[o].image)):r.push(Vo(s[o]))}else r=Vo(s);i.url=r}return e||(t.images[this.uuid]=i),i}};function Vo(n){return typeof HTMLImageElement!="undefined"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&n instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&n instanceof ImageBitmap?Ur.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var hd=0,ai=class n extends wi{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=pi,s=pi,r=je,o=gi,a=mi,l=Ki,c=n.DEFAULT_ANISOTROPY,u=ze){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:hd++}),this.uuid=rs(),this.name="",this.source=new Nr(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new xt(0,0),this.repeat=new xt(1,1),this.center=new xt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $t,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(Ms("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===dn?pe:ze),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==gh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ei:t.x=t.x-Math.floor(t.x);break;case pi:t.x=t.x<0?0:1;break;case ya:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ei:t.y=t.y-Math.floor(t.y);break;case pi:t.y=t.y<0?0:1;break;case ya:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Ms("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===pe?dn:wh}set encoding(t){Ms("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===dn?pe:ze}};ai.DEFAULT_IMAGE=null;ai.DEFAULT_MAPPING=gh;ai.DEFAULT_ANISOTROPY=1;var xe=class n{constructor(t=0,e=0,i=0,s=1){n.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,l=t.elements,c=l[0],u=l[4],d=l[8],h=l[1],f=l[5],g=l[9],x=l[2],p=l[6],m=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-x)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+x)<.1&&Math.abs(g+p)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let _=(c+1)/2,v=(f+1)/2,S=(m+1)/2,b=(u+h)/4,R=(d+x)/4,U=(g+p)/4;return _>v&&_>S?_<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(_),s=b/i,r=R/i):v>S?v<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),i=b/s,r=U/s):S<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(S),i=R/r,s=U/r),this.set(i,s,r,e),this}let y=Math.sqrt((p-g)*(p-g)+(d-x)*(d-x)+(h-u)*(h-u));return Math.abs(y)<.001&&(y=1),this.x=(p-g)/y,this.y=(d-x)/y,this.z=(h-u)/y,this.w=Math.acos((c+f+m-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Ma=class extends wi{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new xe(0,0,t,e),this.scissorTest=!1,this.viewport=new xe(0,0,t,e);let s={width:t,height:e,depth:1};i.encoding!==void 0&&(Ms("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===dn?pe:ze),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:je,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new ai(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(t,e,i=1){(this.width!==t||this.height!==e||this.depth!==i)&&(this.width=t,this.height=e,this.depth=i,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new Nr(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},_i=class extends Ma{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},kr=class extends ai{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=ke,this.minFilter=ke,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ea=class extends ai{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=ke,this.minFilter=ke,this.wrapR=pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var $i=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let l=i[s+0],c=i[s+1],u=i[s+2],d=i[s+3],h=r[o+0],f=r[o+1],g=r[o+2],x=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=d;return}if(a===1){t[e+0]=h,t[e+1]=f,t[e+2]=g,t[e+3]=x;return}if(d!==x||l!==h||c!==f||u!==g){let p=1-a,m=l*h+c*f+u*g+d*x,y=m>=0?1:-1,_=1-m*m;if(_>Number.EPSILON){let S=Math.sqrt(_),b=Math.atan2(S,m*y);p=Math.sin(p*b)/S,a=Math.sin(a*b)/S}let v=a*y;if(l=l*p+h*v,c=c*p+f*v,u=u*p+g*v,d=d*p+x*v,p===1-a){let S=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=S,c*=S,u*=S,d*=S}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=d}static multiplyQuaternionsFlat(t,e,i,s,r,o){let a=i[s],l=i[s+1],c=i[s+2],u=i[s+3],d=r[o],h=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+u*d+l*f-c*h,t[e+1]=l*g+u*h+c*d-a*f,t[e+2]=c*g+u*f+a*h-l*d,t[e+3]=u*g-a*d-l*h-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(s/2),d=a(r/2),h=l(i/2),f=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=h*u*d+c*f*g,this._y=c*f*d-h*u*g,this._z=c*u*g+h*f*d,this._w=c*u*d-h*f*g;break;case"YXZ":this._x=h*u*d+c*f*g,this._y=c*f*d-h*u*g,this._z=c*u*g-h*f*d,this._w=c*u*d+h*f*g;break;case"ZXY":this._x=h*u*d-c*f*g,this._y=c*f*d+h*u*g,this._z=c*u*g+h*f*d,this._w=c*u*d-h*f*g;break;case"ZYX":this._x=h*u*d-c*f*g,this._y=c*f*d+h*u*g,this._z=c*u*g-h*f*d,this._w=c*u*d+h*f*g;break;case"YZX":this._x=h*u*d+c*f*g,this._y=c*f*d+h*u*g,this._z=c*u*g-h*f*d,this._w=c*u*d-h*f*g;break;case"XZY":this._x=h*u*d-c*f*g,this._y=c*f*d-h*u*g,this._z=c*u*g+h*f*d,this._w=c*u*d+h*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],d=e[10],h=i+a+d;if(h>0){let f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(o-s)*f}else if(i>a&&i>d){let f=2*Math.sqrt(1+i-a-d);this._w=(u-l)/f,this._x=.25*f,this._y=(s+o)/f,this._z=(r+c)/f}else if(a>d){let f=2*Math.sqrt(1+a-i-d);this._w=(r-c)/f,this._x=(s+o)/f,this._y=.25*f,this._z=(l+u)/f}else{let f=2*Math.sqrt(1+d-i-a);this._w=(o-s)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(We(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-i*c,this._z=r*u+o*c+i*l-s*a,this._w=o*u-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let i=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-e;return this._w=f*o+e*this._w,this._x=f*i+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-e)*u)/c,h=Math.sin(e*u)/c;return this._w=o*d+this._w*h,this._x=i*d+this._x*h,this._y=s*d+this._y*h,this._z=r*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=Math.random(),e=Math.sqrt(1-t),i=Math.sqrt(t),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(e*Math.cos(s),i*Math.sin(r),i*Math.cos(r),e*Math.sin(s))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},L=class n{constructor(t=0,e=0,i=0){n.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(_c.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(_c.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*i),u=2*(a*e-r*s),d=2*(r*i-o*e);return this.x=e+l*c+o*d-a*u,this.y=i+l*u+a*c-r*d,this.z=s+l*d+r*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Wo.copy(this).projectOnVector(t),this.sub(Wo)}reflect(t){return this.sub(Wo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(We(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,i=Math.sqrt(1-t**2);return this.x=i*Math.cos(e),this.y=i*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Wo=new L,_c=new $i,si=class{constructor(t=new L(1/0,1/0,1/0),e=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(ui.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(ui.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=ui.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,ui):ui.fromBufferAttribute(r,o),ui.applyMatrix4(t.matrixWorld),this.expandByPoint(ui);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ks.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ks.copy(i.boundingBox)),Ks.applyMatrix4(t.matrixWorld),this.union(Ks)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,ui),ui.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ms),$s.subVectors(this.max,ms),Rn.subVectors(t.a,ms),Cn.subVectors(t.b,ms),Pn.subVectors(t.c,ms),Gi.subVectors(Cn,Rn),Vi.subVectors(Pn,Cn),nn.subVectors(Rn,Pn);let e=[0,-Gi.z,Gi.y,0,-Vi.z,Vi.y,0,-nn.z,nn.y,Gi.z,0,-Gi.x,Vi.z,0,-Vi.x,nn.z,0,-nn.x,-Gi.y,Gi.x,0,-Vi.y,Vi.x,0,-nn.y,nn.x,0];return!Xo(e,Rn,Cn,Pn,$s)||(e=[1,0,0,0,1,0,0,0,1],!Xo(e,Rn,Cn,Pn,$s))?!1:(js.crossVectors(Gi,Vi),e=[js.x,js.y,js.z],Xo(e,Rn,Cn,Pn,$s))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ui).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ui).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ri[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ri[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ri[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ri[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ri[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ri[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ri[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ri[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ri),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Ri=[new L,new L,new L,new L,new L,new L,new L,new L],ui=new L,Ks=new si,Rn=new L,Cn=new L,Pn=new L,Gi=new L,Vi=new L,nn=new L,ms=new L,$s=new L,js=new L,sn=new L;function Xo(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){sn.fromArray(n,r);let a=s.x*Math.abs(sn.x)+s.y*Math.abs(sn.y)+s.z*Math.abs(sn.z),l=t.dot(sn),c=e.dot(sn),u=i.dot(sn);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}var ud=new si,gs=new L,qo=new L,Fi=class{constructor(t=new L,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):ud.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;gs.subVectors(t,this.center);let e=gs.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(gs,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(qo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(gs.copy(t.center).add(qo)),this.expandByPoint(gs.copy(t.center).sub(qo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Ci=new L,Yo=new L,Qs=new L,Wi=new L,Zo=new L,tr=new L,Jo=new L,pn=class{constructor(t=new L,e=new L(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ci)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Ci.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ci.copy(this.origin).addScaledVector(this.direction,e),Ci.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Yo.copy(t).add(e).multiplyScalar(.5),Qs.copy(e).sub(t).normalize(),Wi.copy(this.origin).sub(Yo);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Qs),a=Wi.dot(this.direction),l=-Wi.dot(Qs),c=Wi.lengthSq(),u=Math.abs(1-o*o),d,h,f,g;if(u>0)if(d=o*l-a,h=o*a-l,g=r*u,d>=0)if(h>=-g)if(h<=g){let x=1/u;d*=x,h*=x,f=d*(d+o*h+2*a)+h*(o*d+h+2*l)+c}else h=r,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;else h=-r,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;else h<=-g?(d=Math.max(0,-(-o*r+a)),h=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+h*(h+2*l)+c):h<=g?(d=0,h=Math.min(Math.max(-r,-l),r),f=h*(h+2*l)+c):(d=Math.max(0,-(o*r+a)),h=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+h*(h+2*l)+c);else h=o>0?-r:r,d=Math.max(0,-(o*h+a)),f=-d*d+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Yo).addScaledVector(Qs,h),f}intersectSphere(t,e){Ci.subVectors(t.center,this.origin);let i=Ci.dot(this.direction),s=Ci.dot(Ci)-i*i,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,l,c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(i=(t.min.x-h.x)*c,s=(t.max.x-h.x)*c):(i=(t.max.x-h.x)*c,s=(t.min.x-h.x)*c),u>=0?(r=(t.min.y-h.y)*u,o=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,o=(t.min.y-h.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(t.min.z-h.z)*d,l=(t.max.z-h.z)*d):(a=(t.max.z-h.z)*d,l=(t.min.z-h.z)*d),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Ci)!==null}intersectTriangle(t,e,i,s,r){Zo.subVectors(e,t),tr.subVectors(i,t),Jo.crossVectors(Zo,tr);let o=this.direction.dot(Jo),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Wi.subVectors(this.origin,t);let l=a*this.direction.dot(tr.crossVectors(Wi,tr));if(l<0)return null;let c=a*this.direction.dot(Zo.cross(Wi));if(c<0||l+c>o)return null;let u=-a*Wi.dot(Jo);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ce=class n{constructor(t,e,i,s,r,o,a,l,c,u,d,h,f,g,x,p){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c,u,d,h,f,g,x,p)}set(t,e,i,s,r,o,a,l,c,u,d,h,f,g,x,p){let m=this.elements;return m[0]=t,m[4]=e,m[8]=i,m[12]=s,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=u,m[10]=d,m[14]=h,m[3]=f,m[7]=g,m[11]=x,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,i=t.elements,s=1/Ln.setFromMatrixColumn(t,0).length(),r=1/Ln.setFromMatrixColumn(t,1).length(),o=1/Ln.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let h=o*u,f=o*d,g=a*u,x=a*d;e[0]=l*u,e[4]=-l*d,e[8]=c,e[1]=f+g*c,e[5]=h-x*c,e[9]=-a*l,e[2]=x-h*c,e[6]=g+f*c,e[10]=o*l}else if(t.order==="YXZ"){let h=l*u,f=l*d,g=c*u,x=c*d;e[0]=h+x*a,e[4]=g*a-f,e[8]=o*c,e[1]=o*d,e[5]=o*u,e[9]=-a,e[2]=f*a-g,e[6]=x+h*a,e[10]=o*l}else if(t.order==="ZXY"){let h=l*u,f=l*d,g=c*u,x=c*d;e[0]=h-x*a,e[4]=-o*d,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*u,e[9]=x-h*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){let h=o*u,f=o*d,g=a*u,x=a*d;e[0]=l*u,e[4]=g*c-f,e[8]=h*c+x,e[1]=l*d,e[5]=x*c+h,e[9]=f*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){let h=o*l,f=o*c,g=a*l,x=a*c;e[0]=l*u,e[4]=x-h*d,e[8]=g*d+f,e[1]=d,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=f*d+g,e[10]=h-x*d}else if(t.order==="XZY"){let h=o*l,f=o*c,g=a*l,x=a*c;e[0]=l*u,e[4]=-d,e[8]=c*u,e[1]=h*d+x,e[5]=o*u,e[9]=f*d-g,e[2]=g*d-f,e[6]=a*u,e[10]=x*d+h}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(dd,t,fd)}lookAt(t,e,i){let s=this.elements;return ii.subVectors(t,e),ii.lengthSq()===0&&(ii.z=1),ii.normalize(),Xi.crossVectors(i,ii),Xi.lengthSq()===0&&(Math.abs(i.z)===1?ii.x+=1e-4:ii.z+=1e-4,ii.normalize(),Xi.crossVectors(i,ii)),Xi.normalize(),er.crossVectors(ii,Xi),s[0]=Xi.x,s[4]=er.x,s[8]=ii.x,s[1]=Xi.y,s[5]=er.y,s[9]=ii.y,s[2]=Xi.z,s[6]=er.z,s[10]=ii.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],d=i[5],h=i[9],f=i[13],g=i[2],x=i[6],p=i[10],m=i[14],y=i[3],_=i[7],v=i[11],S=i[15],b=s[0],R=s[4],U=s[8],M=s[12],E=s[1],z=s[5],Y=s[9],it=s[13],I=s[2],V=s[6],q=s[10],nt=s[14],Q=s[3],Z=s[7],ct=s[11],ht=s[15];return r[0]=o*b+a*E+l*I+c*Q,r[4]=o*R+a*z+l*V+c*Z,r[8]=o*U+a*Y+l*q+c*ct,r[12]=o*M+a*it+l*nt+c*ht,r[1]=u*b+d*E+h*I+f*Q,r[5]=u*R+d*z+h*V+f*Z,r[9]=u*U+d*Y+h*q+f*ct,r[13]=u*M+d*it+h*nt+f*ht,r[2]=g*b+x*E+p*I+m*Q,r[6]=g*R+x*z+p*V+m*Z,r[10]=g*U+x*Y+p*q+m*ct,r[14]=g*M+x*it+p*nt+m*ht,r[3]=y*b+_*E+v*I+S*Q,r[7]=y*R+_*z+v*V+S*Z,r[11]=y*U+_*Y+v*q+S*ct,r[15]=y*M+_*it+v*nt+S*ht,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],d=t[6],h=t[10],f=t[14],g=t[3],x=t[7],p=t[11],m=t[15];return g*(+r*l*d-s*c*d-r*a*h+i*c*h+s*a*f-i*l*f)+x*(+e*l*f-e*c*h+r*o*h-s*o*f+s*c*u-r*l*u)+p*(+e*c*d-e*a*f-r*o*d+i*o*f+r*a*u-i*c*u)+m*(-s*a*u-e*l*d+e*a*h+s*o*d-i*o*h+i*l*u)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],d=t[9],h=t[10],f=t[11],g=t[12],x=t[13],p=t[14],m=t[15],y=d*p*c-x*h*c+x*l*f-a*p*f-d*l*m+a*h*m,_=g*h*c-u*p*c-g*l*f+o*p*f+u*l*m-o*h*m,v=u*x*c-g*d*c+g*a*f-o*x*f-u*a*m+o*d*m,S=g*d*l-u*x*l-g*a*h+o*x*h+u*a*p-o*d*p,b=e*y+i*_+s*v+r*S;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let R=1/b;return t[0]=y*R,t[1]=(x*h*r-d*p*r-x*s*f+i*p*f+d*s*m-i*h*m)*R,t[2]=(a*p*r-x*l*r+x*s*c-i*p*c-a*s*m+i*l*m)*R,t[3]=(d*l*r-a*h*r-d*s*c+i*h*c+a*s*f-i*l*f)*R,t[4]=_*R,t[5]=(u*p*r-g*h*r+g*s*f-e*p*f-u*s*m+e*h*m)*R,t[6]=(g*l*r-o*p*r-g*s*c+e*p*c+o*s*m-e*l*m)*R,t[7]=(o*h*r-u*l*r+u*s*c-e*h*c-o*s*f+e*l*f)*R,t[8]=v*R,t[9]=(g*d*r-u*x*r-g*i*f+e*x*f+u*i*m-e*d*m)*R,t[10]=(o*x*r-g*a*r+g*i*c-e*x*c-o*i*m+e*a*m)*R,t[11]=(u*a*r-o*d*r-u*i*c+e*d*c+o*i*f-e*a*f)*R,t[12]=S*R,t[13]=(u*x*s-g*d*s+g*i*h-e*x*h-u*i*p+e*d*p)*R,t[14]=(g*a*s-o*x*s-g*i*l+e*x*l+o*i*p-e*a*p)*R,t[15]=(o*d*s-u*a*s+u*i*l-e*d*l-o*i*h+e*a*h)*R,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,l=t.z,c=r*o,u=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+i,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,u=o+o,d=a+a,h=r*c,f=r*u,g=r*d,x=o*u,p=o*d,m=a*d,y=l*c,_=l*u,v=l*d,S=i.x,b=i.y,R=i.z;return s[0]=(1-(x+m))*S,s[1]=(f+v)*S,s[2]=(g-_)*S,s[3]=0,s[4]=(f-v)*b,s[5]=(1-(h+m))*b,s[6]=(p+y)*b,s[7]=0,s[8]=(g+_)*R,s[9]=(p-y)*R,s[10]=(1-(h+x))*R,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements,r=Ln.set(s[0],s[1],s[2]).length(),o=Ln.set(s[4],s[5],s[6]).length(),a=Ln.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],di.copy(this);let c=1/r,u=1/o,d=1/a;return di.elements[0]*=c,di.elements[1]*=c,di.elements[2]*=c,di.elements[4]*=u,di.elements[5]*=u,di.elements[6]*=u,di.elements[8]*=d,di.elements[9]*=d,di.elements[10]*=d,e.setFromRotationMatrix(di),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=Ni){let l=this.elements,c=2*r/(e-t),u=2*r/(i-s),d=(e+t)/(e-t),h=(i+s)/(i-s),f,g;if(a===Ni)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Lr)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=Ni){let l=this.elements,c=1/(e-t),u=1/(i-s),d=1/(o-r),h=(e+t)*c,f=(i+s)*u,g,x;if(a===Ni)g=(o+r)*d,x=-2*d;else if(a===Lr)g=r*d,x=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=x,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}},Ln=new L,di=new ce,dd=new L(0,0,0),fd=new L(1,1,1),Xi=new L,er=new L,ii=new L,xc=new ce,yc=new $i,Qn=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],d=s[2],h=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(We(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-We(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(We(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-We(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(We(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-We(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return xc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(xc,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return yc.setFromEuler(this),this.setFromQuaternion(yc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Qn.DEFAULT_ORDER="XYZ";var zr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},pd=0,vc=new L,In=new $i,Pi=new ce,ir=new L,_s=new L,md=new L,gd=new $i,bc=new L(1,0,0),Mc=new L(0,1,0),Ec=new L(0,0,1),_d={type:"added"},xd={type:"removed"},Ee=class n extends wi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:pd++}),this.uuid=rs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new L,e=new Qn,i=new $i,s=new L(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ce},normalMatrix:{value:new $t}}),this.matrix=new ce,this.matrixWorld=new ce,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new zr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return In.setFromAxisAngle(t,e),this.quaternion.multiply(In),this}rotateOnWorldAxis(t,e){return In.setFromAxisAngle(t,e),this.quaternion.premultiply(In),this}rotateX(t){return this.rotateOnAxis(bc,t)}rotateY(t){return this.rotateOnAxis(Mc,t)}rotateZ(t){return this.rotateOnAxis(Ec,t)}translateOnAxis(t,e){return vc.copy(t).applyQuaternion(this.quaternion),this.position.add(vc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(bc,t)}translateY(t){return this.translateOnAxis(Mc,t)}translateZ(t){return this.translateOnAxis(Ec,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Pi.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?ir.copy(t):ir.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),_s.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Pi.lookAt(_s,ir,this.up):Pi.lookAt(ir,_s,this.up),this.quaternion.setFromRotationMatrix(Pi),s&&(Pi.extractRotation(s.matrixWorld),In.setFromRotationMatrix(Pi),this.quaternion.premultiply(In.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(_d)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(xd)),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Pi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Pi.multiply(t.parent.matrixWorld)),t.applyMatrix4(Pi),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_s,t,md),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_s,gd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++){let r=e[i];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){let i=this.parent;if(t===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++){let a=s[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let d=l[c];r(t.shapes,d)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){let a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),d=o(t.shapes),h=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){let l=[];for(let c in a){let u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}};Ee.DEFAULT_UP=new L(0,1,0);Ee.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ee.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var fi=new L,Li=new L,Ko=new L,Ii=new L,Dn=new L,Un=new L,wc=new L,$o=new L,jo=new L,Qo=new L,nr=!1,Vn=class n{constructor(t=new L,e=new L,i=new L){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),fi.subVectors(t,e),s.cross(fi);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){fi.subVectors(s,e),Li.subVectors(i,e),Ko.subVectors(t,e);let o=fi.dot(fi),a=fi.dot(Li),l=fi.dot(Ko),c=Li.dot(Li),u=Li.dot(Ko),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;let h=1/d,f=(c*l-a*u)*h,g=(o*u-a*l)*h;return r.set(1-f-g,g,f)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Ii)===null?!1:Ii.x>=0&&Ii.y>=0&&Ii.x+Ii.y<=1}static getUV(t,e,i,s,r,o,a,l){return nr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),nr=!0),this.getInterpolation(t,e,i,s,r,o,a,l)}static getInterpolation(t,e,i,s,r,o,a,l){return this.getBarycoord(t,e,i,s,Ii)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Ii.x),l.addScaledVector(o,Ii.y),l.addScaledVector(a,Ii.z),l)}static isFrontFacing(t,e,i,s){return fi.subVectors(i,e),Li.subVectors(t,e),fi.cross(Li).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return fi.subVectors(this.c,this.b),Li.subVectors(this.a,this.b),fi.cross(Li).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,i,s,r){return nr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),nr=!0),n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,o,a;Dn.subVectors(s,i),Un.subVectors(r,i),$o.subVectors(t,i);let l=Dn.dot($o),c=Un.dot($o);if(l<=0&&c<=0)return e.copy(i);jo.subVectors(t,s);let u=Dn.dot(jo),d=Un.dot(jo);if(u>=0&&d<=u)return e.copy(s);let h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(i).addScaledVector(Dn,o);Qo.subVectors(t,r);let f=Dn.dot(Qo),g=Un.dot(Qo);if(g>=0&&f<=g)return e.copy(r);let x=f*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(i).addScaledVector(Un,a);let p=u*g-f*d;if(p<=0&&d-u>=0&&f-g>=0)return wc.subVectors(r,s),a=(d-u)/(d-u+(f-g)),e.copy(s).addScaledVector(wc,a);let m=1/(p+x+h);return o=x*m,a=h*m,e.copy(i).addScaledVector(Dn,o).addScaledVector(Un,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Rh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},qi={h:0,s:0,l:0},sr={h:0,s:0,l:0};function ta(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var qt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=pe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,le.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=le.workingColorSpace){return this.r=t,this.g=e,this.b=i,le.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=le.workingColorSpace){if(t=od(t,1),e=We(e,0,1),i=We(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=ta(o,r,t+1/3),this.g=ta(o,r,t),this.b=ta(o,r,t-1/3)}return le.toWorkingColorSpace(this,s),this}setStyle(t,e=pe){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=pe){let i=Rh[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Zn(t.r),this.g=Zn(t.g),this.b=Zn(t.b),this}copyLinearToSRGB(t){return this.r=Go(t.r),this.g=Go(t.g),this.b=Go(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=pe){return le.fromWorkingColorSpace(Ve.copy(this),t),Math.round(We(Ve.r*255,0,255))*65536+Math.round(We(Ve.g*255,0,255))*256+Math.round(We(Ve.b*255,0,255))}getHexString(t=pe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=le.workingColorSpace){le.fromWorkingColorSpace(Ve.copy(this),e);let i=Ve.r,s=Ve.g,r=Ve.b,o=Math.max(i,s,r),a=Math.min(i,s,r),l,c,u=(a+o)/2;if(a===o)l=0,c=0;else{let d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case i:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-i)/d+2;break;case r:l=(i-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=le.workingColorSpace){return le.fromWorkingColorSpace(Ve.copy(this),e),t.r=Ve.r,t.g=Ve.g,t.b=Ve.b,t}getStyle(t=pe){le.fromWorkingColorSpace(Ve.copy(this),t);let e=Ve.r,i=Ve.g,s=Ve.b;return t!==pe?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(qi),this.setHSL(qi.h+t,qi.s+e,qi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(qi),t.getHSL(sr);let i=Bo(qi.h,sr.h,e),s=Bo(qi.s,sr.s,e),r=Bo(qi.l,sr.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Ve=new qt;qt.NAMES=Rh;var yd=0,Oi=class extends wi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:yd++}),this.uuid=rs(),this.name="",this.type="Material",this.blending=Yn,this.side=ki,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ma,this.blendDst=ga,this.blendEquation=ln,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qt(0,0,0),this.blendAlpha=0,this.depthFunc=Sr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=hc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Tn,this.stencilZFail=Tn,this.stencilZPass=Tn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Yn&&(i.blending=this.blending),this.side!==ki&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ma&&(i.blendSrc=this.blendSrc),this.blendDst!==ga&&(i.blendDst=this.blendDst),this.blendEquation!==ln&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Sr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==hc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Tn&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Tn&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Tn&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let o=[];for(let a in r){let l=r[a];delete l.metadata,o.push(l)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},Je=class extends Oi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=mh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Ae=new L,rr=new xt,Ce=class{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=uc,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Zi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)rr.fromBufferAttribute(this,e),rr.applyMatrix3(t),this.setXY(e,rr.x,rr.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ae.fromBufferAttribute(this,e),Ae.applyMatrix3(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ae.fromBufferAttribute(this,e),Ae.applyMatrix4(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ae.fromBufferAttribute(this,e),Ae.applyNormalMatrix(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ae.fromBufferAttribute(this,e),Ae.transformDirection(t),this.setXYZ(e,Ae.x,Ae.y,Ae.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=ps(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=$e(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ps(e,this.array)),e}setX(t,e){return this.normalized&&(e=$e(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ps(e,this.array)),e}setY(t,e){return this.normalized&&(e=$e(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ps(e,this.array)),e}setZ(t,e){return this.normalized&&(e=$e(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ps(e,this.array)),e}setW(t,e){return this.normalized&&(e=$e(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=$e(e,this.array),i=$e(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=$e(e,this.array),i=$e(i,this.array),s=$e(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=$e(e,this.array),i=$e(i,this.array),s=$e(s,this.array),r=$e(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==uc&&(t.usage=this.usage),t}};var Fr=class extends Ce{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var Or=class extends Ce{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var re=class extends Ce{constructor(t,e,i){super(new Float32Array(t),e,i)}};var vd=0,oi=new ce,ea=new Ee,Nn=new L,ni=new si,xs=new si,Ne=new L,we=class n extends wi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:vd++}),this.uuid=rs(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ah(t)?Or:Fr)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new $t().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return oi.makeRotationFromQuaternion(t),this.applyMatrix4(oi),this}rotateX(t){return oi.makeRotationX(t),this.applyMatrix4(oi),this}rotateY(t){return oi.makeRotationY(t),this.applyMatrix4(oi),this}rotateZ(t){return oi.makeRotationZ(t),this.applyMatrix4(oi),this}translate(t,e,i){return oi.makeTranslation(t,e,i),this.applyMatrix4(oi),this}scale(t,e,i){return oi.makeScale(t,e,i),this.applyMatrix4(oi),this}lookAt(t){return ea.lookAt(t),ea.updateMatrix(),this.applyMatrix4(ea.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Nn).negate(),this.translate(Nn.x,Nn.y,Nn.z),this}setFromPoints(t){let e=[];for(let i=0,s=t.length;i<s;i++){let r=t[i];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new re(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new si);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];ni.setFromBufferAttribute(r),this.morphTargetsRelative?(Ne.addVectors(this.boundingBox.min,ni.min),this.boundingBox.expandByPoint(Ne),Ne.addVectors(this.boundingBox.max,ni.max),this.boundingBox.expandByPoint(Ne)):(this.boundingBox.expandByPoint(ni.min),this.boundingBox.expandByPoint(ni.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new L,1/0);return}if(t){let i=this.boundingSphere.center;if(ni.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];xs.setFromBufferAttribute(a),this.morphTargetsRelative?(Ne.addVectors(ni.min,xs.min),ni.expandByPoint(Ne),Ne.addVectors(ni.max,xs.max),ni.expandByPoint(Ne)):(ni.expandByPoint(xs.min),ni.expandByPoint(xs.max))}ni.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Ne.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Ne));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Ne.fromBufferAttribute(a,c),l&&(Nn.fromBufferAttribute(t,c),Ne.add(Nn)),s=Math.max(s,i.distanceToSquared(Ne))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.array,s=e.position.array,r=e.normal.array,o=e.uv.array,a=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ce(new Float32Array(4*a),4));let l=this.getAttribute("tangent").array,c=[],u=[];for(let E=0;E<a;E++)c[E]=new L,u[E]=new L;let d=new L,h=new L,f=new L,g=new xt,x=new xt,p=new xt,m=new L,y=new L;function _(E,z,Y){d.fromArray(s,E*3),h.fromArray(s,z*3),f.fromArray(s,Y*3),g.fromArray(o,E*2),x.fromArray(o,z*2),p.fromArray(o,Y*2),h.sub(d),f.sub(d),x.sub(g),p.sub(g);let it=1/(x.x*p.y-p.x*x.y);isFinite(it)&&(m.copy(h).multiplyScalar(p.y).addScaledVector(f,-x.y).multiplyScalar(it),y.copy(f).multiplyScalar(x.x).addScaledVector(h,-p.x).multiplyScalar(it),c[E].add(m),c[z].add(m),c[Y].add(m),u[E].add(y),u[z].add(y),u[Y].add(y))}let v=this.groups;v.length===0&&(v=[{start:0,count:i.length}]);for(let E=0,z=v.length;E<z;++E){let Y=v[E],it=Y.start,I=Y.count;for(let V=it,q=it+I;V<q;V+=3)_(i[V+0],i[V+1],i[V+2])}let S=new L,b=new L,R=new L,U=new L;function M(E){R.fromArray(r,E*3),U.copy(R);let z=c[E];S.copy(z),S.sub(R.multiplyScalar(R.dot(z))).normalize(),b.crossVectors(U,z);let it=b.dot(u[E])<0?-1:1;l[E*4]=S.x,l[E*4+1]=S.y,l[E*4+2]=S.z,l[E*4+3]=it}for(let E=0,z=v.length;E<z;++E){let Y=v[E],it=Y.start,I=Y.count;for(let V=it,q=it+I;V<q;V+=3)M(i[V+0]),M(i[V+1]),M(i[V+2])}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ce(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let h=0,f=i.count;h<f;h++)i.setXYZ(h,0,0,0);let s=new L,r=new L,o=new L,a=new L,l=new L,c=new L,u=new L,d=new L;if(t)for(let h=0,f=t.count;h<f;h+=3){let g=t.getX(h+0),x=t.getX(h+1),p=t.getX(h+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),o.fromBufferAttribute(e,p),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,p),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let h=0,f=e.count;h<f;h+=3)s.fromBufferAttribute(e,h+0),r.fromBufferAttribute(e,h+1),o.fromBufferAttribute(e,h+2),u.subVectors(o,r),d.subVectors(s,r),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ne.fromBufferAttribute(t,e),Ne.normalize(),t.setXYZ(e,Ne.x,Ne.y,Ne.z)}toNonIndexed(){function t(a,l){let c=a.array,u=a.itemSize,d=a.normalized,h=new c.constructor(l.length*u),f=0,g=0;for(let x=0,p=l.length;x<p;x++){a.isInterleavedBufferAttribute?f=l[x]*a.data.stride+a.offset:f=l[x]*u;for(let m=0;m<u;m++)h[g++]=c[f++]}return new Ce(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let a in s){let l=s[a],c=t(l,i);e.setAttribute(a,c)}let r=this.morphAttributes;for(let a in r){let l=[],c=r[a];for(let u=0,d=c.length;u<d;u++){let h=c[u],f=t(h,i);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){let f=c[d];u.push(f.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone(e));let s=t.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(e))}let r=t.morphAttributes;for(let c in r){let u=[],d=r[c];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let c=0,u=o.length;c<u;c++){let d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Sc=new ce,rn=new pn,or=new Fi,Tc=new L,kn=new L,zn=new L,Fn=new L,ia=new L,ar=new L,lr=new xt,cr=new xt,hr=new xt,Ac=new L,Rc=new L,Cc=new L,ur=new L,dr=new L,$=class extends Ee{constructor(t=new we,e=new Je){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){ar.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=a[l],d=r[l];u!==0&&(ia.fromBufferAttribute(d,t),o?ar.addScaledVector(ia,u):ar.addScaledVector(ia.sub(e),u))}e.add(ar)}return e}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),or.copy(i.boundingSphere),or.applyMatrix4(r),rn.copy(t.ray).recast(t.near),!(or.containsPoint(rn.origin)===!1&&(rn.intersectSphere(or,Tc)===null||rn.origin.distanceToSquared(Tc)>(t.far-t.near)**2))&&(Sc.copy(r).invert(),rn.copy(t.ray).applyMatrix4(Sc),!(i.boundingBox!==null&&rn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,rn)))}_computeIntersections(t,e,i){let s,r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=h.length;g<x;g++){let p=h[g],m=o[p.materialIndex],y=Math.max(p.start,f.start),_=Math.min(a.count,Math.min(p.start+p.count,f.start+f.count));for(let v=y,S=_;v<S;v+=3){let b=a.getX(v),R=a.getX(v+1),U=a.getX(v+2);s=fr(this,m,t,i,c,u,d,b,R,U),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let p=g,m=x;p<m;p+=3){let y=a.getX(p),_=a.getX(p+1),v=a.getX(p+2);s=fr(this,o,t,i,c,u,d,y,_,v),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=h.length;g<x;g++){let p=h[g],m=o[p.materialIndex],y=Math.max(p.start,f.start),_=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let v=y,S=_;v<S;v+=3){let b=v,R=v+1,U=v+2;s=fr(this,m,t,i,c,u,d,b,R,U),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let g=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let p=g,m=x;p<m;p+=3){let y=p,_=p+1,v=p+2;s=fr(this,o,t,i,c,u,d,y,_,v),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}};function bd(n,t,e,i,s,r,o,a){let l;if(t.side===Xe?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,t.side===ki,a),l===null)return null;dr.copy(a),dr.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(dr);return c<e.near||c>e.far?null:{distance:c,point:dr.clone(),object:n}}function fr(n,t,e,i,s,r,o,a,l,c){n.getVertexPosition(a,kn),n.getVertexPosition(l,zn),n.getVertexPosition(c,Fn);let u=bd(n,t,e,i,kn,zn,Fn,ur);if(u){s&&(lr.fromBufferAttribute(s,a),cr.fromBufferAttribute(s,l),hr.fromBufferAttribute(s,c),u.uv=Vn.getInterpolation(ur,kn,zn,Fn,lr,cr,hr,new xt)),r&&(lr.fromBufferAttribute(r,a),cr.fromBufferAttribute(r,l),hr.fromBufferAttribute(r,c),u.uv1=Vn.getInterpolation(ur,kn,zn,Fn,lr,cr,hr,new xt),u.uv2=u.uv1),o&&(Ac.fromBufferAttribute(o,a),Rc.fromBufferAttribute(o,l),Cc.fromBufferAttribute(o,c),u.normal=Vn.getInterpolation(ur,kn,zn,Fn,Ac,Rc,Cc,new L),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new L,materialIndex:0};Vn.getNormal(kn,zn,Fn,d.normal),u.face=d}return u}var jt=class n extends we{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let l=[],c=[],u=[],d=[],h=0,f=0;g("z","y","x",-1,-1,i,e,t,o,r,0),g("z","y","x",1,-1,i,e,-t,o,r,1),g("x","z","y",1,1,t,i,e,s,o,2),g("x","z","y",1,-1,t,i,-e,s,o,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new re(c,3)),this.setAttribute("normal",new re(u,3)),this.setAttribute("uv",new re(d,2));function g(x,p,m,y,_,v,S,b,R,U,M){let E=v/R,z=S/U,Y=v/2,it=S/2,I=b/2,V=R+1,q=U+1,nt=0,Q=0,Z=new L;for(let ct=0;ct<q;ct++){let ht=ct*z-it;for(let et=0;et<V;et++){let F=et*E-Y;Z[x]=F*y,Z[p]=ht*_,Z[m]=I,c.push(Z.x,Z.y,Z.z),Z[x]=0,Z[p]=0,Z[m]=b>0?1:-1,u.push(Z.x,Z.y,Z.z),d.push(et/R),d.push(1-ct/U),nt+=1}}for(let ct=0;ct<U;ct++)for(let ht=0;ht<R;ht++){let et=h+ht+V*ct,F=h+ht+V*(ct+1),st=h+(ht+1)+V*(ct+1),ft=h+(ht+1)+V*ct;l.push(et,F,ft),l.push(F,st,ft),Q+=6}a.addGroup(f,Q,M),f+=Q,h+=nt}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function ts(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function Ze(n){let t={};for(let e=0;e<n.length;e++){let i=ts(n[e]);for(let s in i)t[s]=i[s]}return t}function Md(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Ch(n){return n.getRenderTarget()===null?n.outputColorSpace:le.workingColorSpace}var al={clone:ts,merge:Ze},Ed=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,wd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ke=class extends Oi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ed,this.fragmentShader=wd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ts(t.uniforms),this.uniformsGroups=Md(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}},Br=class extends Ee{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ce,this.projectionMatrix=new ce,this.projectionMatrixInverse=new ce,this.coordinateSystem=Ni}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Oe=class extends Br{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Ir*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Oo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ir*2*Math.atan(Math.tan(Oo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Oo*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},On=-90,Bn=1,wa=class extends Ee{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Oe(On,Bn,t,e);s.layers=this.layers,this.add(s);let r=new Oe(On,Bn,t,e);r.layers=this.layers,this.add(r);let o=new Oe(On,Bn,t,e);o.layers=this.layers,this.add(o);let a=new Oe(On,Bn,t,e);a.layers=this.layers,this.add(a);let l=new Oe(On,Bn,t,e);l.layers=this.layers,this.add(l);let c=new Oe(On,Bn,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,l]=e;for(let c of e)this.remove(c);if(t===Ni)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Lr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,l,c,u]=this.children,d=t.getRenderTarget(),h=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,s),t.render(e,u),t.setRenderTarget(d,h,f),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},Hr=class extends ai{constructor(t,e,i,s,r,o,a,l,c,u){t=t!==void 0?t:[],e=e!==void 0?e:Kn,super(t,e,i,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Sa=class extends _i{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];e.encoding!==void 0&&(Ms("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===dn?pe:ze),this.texture=new Hr(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:je}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new jt(5,5,5),r=new Ke({name:"CubemapFromEquirect",uniforms:ts(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Xe,blending:Mi});r.uniforms.tEquirect.value=e;let o=new $(s,r),a=e.minFilter;return e.minFilter===gi&&(e.minFilter=je),new wa(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,s){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}},na=new L,Sd=new L,Td=new $t,Ui=class{constructor(t=new L(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=na.subVectors(i,e).cross(Sd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let i=t.delta(na),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||Td.getNormalMatrix(t),s=this.coplanarPoint(na).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},on=new Fi,pr=new L,Rs=class{constructor(t=new Ui,e=new Ui,i=new Ui,s=new Ui,r=new Ui,o=new Ui){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=Ni){let i=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],l=s[3],c=s[4],u=s[5],d=s[6],h=s[7],f=s[8],g=s[9],x=s[10],p=s[11],m=s[12],y=s[13],_=s[14],v=s[15];if(i[0].setComponents(l-r,h-c,p-f,v-m).normalize(),i[1].setComponents(l+r,h+c,p+f,v+m).normalize(),i[2].setComponents(l+o,h+u,p+g,v+y).normalize(),i[3].setComponents(l-o,h-u,p-g,v-y).normalize(),i[4].setComponents(l-a,h-d,p-x,v-_).normalize(),e===Ni)i[5].setComponents(l+a,h+d,p+x,v+_).normalize();else if(e===Lr)i[5].setComponents(a,d,x,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),on.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),on.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(on)}intersectsSprite(t){return on.center.set(0,0,0),on.radius=.7071067811865476,on.applyMatrix4(t.matrixWorld),this.intersectsSphere(on)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if(pr.x=s.normal.x>0?t.max.x:t.min.x,pr.y=s.normal.y>0?t.max.y:t.min.y,pr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(pr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function Ph(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function Ad(n,t){let e=t.isWebGL2,i=new WeakMap;function s(c,u){let d=c.array,h=c.usage,f=d.byteLength,g=n.createBuffer();n.bindBuffer(u,g),n.bufferData(u,d,h),c.onUploadCallback();let x;if(d instanceof Float32Array)x=n.FLOAT;else if(d instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(e)x=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else x=n.UNSIGNED_SHORT;else if(d instanceof Int16Array)x=n.SHORT;else if(d instanceof Uint32Array)x=n.UNSIGNED_INT;else if(d instanceof Int32Array)x=n.INT;else if(d instanceof Int8Array)x=n.BYTE;else if(d instanceof Uint8Array)x=n.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)x=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:x,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version,size:f}}function r(c,u,d){let h=u.array,f=u._updateRange,g=u.updateRanges;if(n.bindBuffer(d,c),f.count===-1&&g.length===0&&n.bufferSubData(d,0,h),g.length!==0){for(let x=0,p=g.length;x<p;x++){let m=g[x];e?n.bufferSubData(d,m.start*h.BYTES_PER_ELEMENT,h,m.start,m.count):n.bufferSubData(d,m.start*h.BYTES_PER_ELEMENT,h.subarray(m.start,m.start+m.count))}u.clearUpdateRanges()}f.count!==-1&&(e?n.bufferSubData(d,f.offset*h.BYTES_PER_ELEMENT,h,f.offset,f.count):n.bufferSubData(d,f.offset*h.BYTES_PER_ELEMENT,h.subarray(f.offset,f.offset+f.count)),f.count=-1),u.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),i.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);let u=i.get(c);u&&(n.deleteBuffer(u.buffer),i.delete(c))}function l(c,u){if(c.isGLBufferAttribute){let h=i.get(c);(!h||h.version<c.version)&&i.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);let d=i.get(c);if(d===void 0)i.set(c,s(c,u));else if(d.version<c.version){if(d.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(d.buffer,c,u),d.version=c.version}}return{get:o,remove:a,update:l}}var ae=class n extends we{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(i),l=Math.floor(s),c=a+1,u=l+1,d=t/a,h=e/l,f=[],g=[],x=[],p=[];for(let m=0;m<u;m++){let y=m*h-o;for(let _=0;_<c;_++){let v=_*d-r;g.push(v,-y,0),x.push(0,0,1),p.push(_/a),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let y=0;y<a;y++){let _=y+c*m,v=y+c*(m+1),S=y+1+c*(m+1),b=y+1+c*m;f.push(_,v,b),f.push(v,S,b)}this.setIndex(f),this.setAttribute("position",new re(g,3)),this.setAttribute("normal",new re(x,3)),this.setAttribute("uv",new re(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}},Rd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Cd=`#ifdef USE_ALPHAHASH
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
#endif`,Pd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ld=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Id=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Dd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ud=`#ifdef USE_AOMAP
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
#endif`,Nd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,kd=`#ifdef USE_BATCHING
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
#endif`,zd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Fd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Od=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Bd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Hd=`#ifdef USE_IRIDESCENCE
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
#endif`,Gd=`#ifdef USE_BUMPMAP
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
#endif`,Vd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Wd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Xd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,qd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Yd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Zd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Jd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Kd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,$d=`#define PI 3.141592653589793
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
} // validated`,jd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Qd=`vec3 transformedNormal = objectNormal;
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
#endif`,tf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ef=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,nf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,sf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,rf="gl_FragColor = linearToOutputTexel( gl_FragColor );",of=`
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
}`,af=`#ifdef USE_ENVMAP
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
#endif`,lf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,cf=`#ifdef USE_ENVMAP
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
#endif`,hf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,uf=`#ifdef USE_ENVMAP
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
#endif`,df=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ff=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,pf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,mf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gf=`#ifdef USE_GRADIENTMAP
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
}`,_f=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,xf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,yf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,vf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,bf=`uniform bool receiveShadow;
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
#endif`,Mf=`#ifdef USE_ENVMAP
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
#endif`,Ef=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,wf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Sf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Tf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Af=`PhysicalMaterial material;
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
#endif`,Rf=`struct PhysicalMaterial {
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
}`,Cf=`
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
#endif`,Pf=`#if defined( RE_IndirectDiffuse )
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
#endif`,Lf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,If=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Df=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Uf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Nf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,kf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,zf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ff=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Of=`#if defined( USE_POINTS_UV )
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
#endif`,Bf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Hf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Gf=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Vf=`#ifdef USE_MORPHNORMALS
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
#endif`,Wf=`#ifdef USE_MORPHTARGETS
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
#endif`,Xf=`#ifdef USE_MORPHTARGETS
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
#endif`,qf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Yf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Zf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Jf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Kf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,$f=`#ifdef USE_NORMALMAP
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
#endif`,jf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Qf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,tp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ep=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ip=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,np=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,sp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,rp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,op=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ap=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,lp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,cp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,hp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,up=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,dp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,fp=`float getShadowMask() {
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
}`,pp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,mp=`#ifdef USE_SKINNING
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
#endif`,gp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,_p=`#ifdef USE_SKINNING
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
#endif`,xp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,yp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,vp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,bp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Mp=`#ifdef USE_TRANSMISSION
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
#endif`,Ep=`#ifdef USE_TRANSMISSION
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
#endif`,wp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Sp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Tp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ap=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Rp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Cp=`uniform sampler2D t2D;
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
}`,Pp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Lp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Ip=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Dp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Up=`#include <common>
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
}`,Np=`#if DEPTH_PACKING == 3200
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
}`,kp=`#define DISTANCE
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
}`,zp=`#define DISTANCE
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
}`,Fp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Op=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bp=`uniform float scale;
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
}`,Hp=`uniform vec3 diffuse;
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
}`,Gp=`#include <common>
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
}`,Vp=`uniform vec3 diffuse;
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
}`,Wp=`#define LAMBERT
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
}`,Xp=`#define LAMBERT
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
}`,qp=`#define MATCAP
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
}`,Yp=`#define MATCAP
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
}`,Zp=`#define NORMAL
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
}`,Jp=`#define NORMAL
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
}`,Kp=`#define PHONG
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
}`,$p=`#define PHONG
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
}`,jp=`#define STANDARD
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
}`,Qp=`#define STANDARD
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
}`,t0=`#define TOON
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
}`,e0=`#define TOON
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
}`,i0=`uniform float size;
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
}`,n0=`uniform vec3 diffuse;
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
}`,s0=`#include <common>
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
}`,r0=`uniform vec3 color;
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
}`,o0=`uniform float rotation;
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
}`,a0=`uniform vec3 diffuse;
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
}`,Zt={alphahash_fragment:Rd,alphahash_pars_fragment:Cd,alphamap_fragment:Pd,alphamap_pars_fragment:Ld,alphatest_fragment:Id,alphatest_pars_fragment:Dd,aomap_fragment:Ud,aomap_pars_fragment:Nd,batching_pars_vertex:kd,batching_vertex:zd,begin_vertex:Fd,beginnormal_vertex:Od,bsdfs:Bd,iridescence_fragment:Hd,bumpmap_pars_fragment:Gd,clipping_planes_fragment:Vd,clipping_planes_pars_fragment:Wd,clipping_planes_pars_vertex:Xd,clipping_planes_vertex:qd,color_fragment:Yd,color_pars_fragment:Zd,color_pars_vertex:Jd,color_vertex:Kd,common:$d,cube_uv_reflection_fragment:jd,defaultnormal_vertex:Qd,displacementmap_pars_vertex:tf,displacementmap_vertex:ef,emissivemap_fragment:nf,emissivemap_pars_fragment:sf,colorspace_fragment:rf,colorspace_pars_fragment:of,envmap_fragment:af,envmap_common_pars_fragment:lf,envmap_pars_fragment:cf,envmap_pars_vertex:hf,envmap_physical_pars_fragment:Mf,envmap_vertex:uf,fog_vertex:df,fog_pars_vertex:ff,fog_fragment:pf,fog_pars_fragment:mf,gradientmap_pars_fragment:gf,lightmap_fragment:_f,lightmap_pars_fragment:xf,lights_lambert_fragment:yf,lights_lambert_pars_fragment:vf,lights_pars_begin:bf,lights_toon_fragment:Ef,lights_toon_pars_fragment:wf,lights_phong_fragment:Sf,lights_phong_pars_fragment:Tf,lights_physical_fragment:Af,lights_physical_pars_fragment:Rf,lights_fragment_begin:Cf,lights_fragment_maps:Pf,lights_fragment_end:Lf,logdepthbuf_fragment:If,logdepthbuf_pars_fragment:Df,logdepthbuf_pars_vertex:Uf,logdepthbuf_vertex:Nf,map_fragment:kf,map_pars_fragment:zf,map_particle_fragment:Ff,map_particle_pars_fragment:Of,metalnessmap_fragment:Bf,metalnessmap_pars_fragment:Hf,morphcolor_vertex:Gf,morphnormal_vertex:Vf,morphtarget_pars_vertex:Wf,morphtarget_vertex:Xf,normal_fragment_begin:qf,normal_fragment_maps:Yf,normal_pars_fragment:Zf,normal_pars_vertex:Jf,normal_vertex:Kf,normalmap_pars_fragment:$f,clearcoat_normal_fragment_begin:jf,clearcoat_normal_fragment_maps:Qf,clearcoat_pars_fragment:tp,iridescence_pars_fragment:ep,opaque_fragment:ip,packing:np,premultiplied_alpha_fragment:sp,project_vertex:rp,dithering_fragment:op,dithering_pars_fragment:ap,roughnessmap_fragment:lp,roughnessmap_pars_fragment:cp,shadowmap_pars_fragment:hp,shadowmap_pars_vertex:up,shadowmap_vertex:dp,shadowmask_pars_fragment:fp,skinbase_vertex:pp,skinning_pars_vertex:mp,skinning_vertex:gp,skinnormal_vertex:_p,specularmap_fragment:xp,specularmap_pars_fragment:yp,tonemapping_fragment:vp,tonemapping_pars_fragment:bp,transmission_fragment:Mp,transmission_pars_fragment:Ep,uv_pars_fragment:wp,uv_pars_vertex:Sp,uv_vertex:Tp,worldpos_vertex:Ap,background_vert:Rp,background_frag:Cp,backgroundCube_vert:Pp,backgroundCube_frag:Lp,cube_vert:Ip,cube_frag:Dp,depth_vert:Up,depth_frag:Np,distanceRGBA_vert:kp,distanceRGBA_frag:zp,equirect_vert:Fp,equirect_frag:Op,linedashed_vert:Bp,linedashed_frag:Hp,meshbasic_vert:Gp,meshbasic_frag:Vp,meshlambert_vert:Wp,meshlambert_frag:Xp,meshmatcap_vert:qp,meshmatcap_frag:Yp,meshnormal_vert:Zp,meshnormal_frag:Jp,meshphong_vert:Kp,meshphong_frag:$p,meshphysical_vert:jp,meshphysical_frag:Qp,meshtoon_vert:t0,meshtoon_frag:e0,points_vert:i0,points_frag:n0,shadow_vert:s0,shadow_frag:r0,sprite_vert:o0,sprite_frag:a0},yt={common:{diffuse:{value:new qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $t}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $t},normalScale:{value:new xt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0},uvTransform:{value:new $t}},sprite:{diffuse:{value:new qt(16777215)},opacity:{value:1},center:{value:new xt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}}},bi={basic:{uniforms:Ze([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.fog]),vertexShader:Zt.meshbasic_vert,fragmentShader:Zt.meshbasic_frag},lambert:{uniforms:Ze([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new qt(0)}}]),vertexShader:Zt.meshlambert_vert,fragmentShader:Zt.meshlambert_frag},phong:{uniforms:Ze([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new qt(0)},specular:{value:new qt(1118481)},shininess:{value:30}}]),vertexShader:Zt.meshphong_vert,fragmentShader:Zt.meshphong_frag},standard:{uniforms:Ze([yt.common,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.roughnessmap,yt.metalnessmap,yt.fog,yt.lights,{emissive:{value:new qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag},toon:{uniforms:Ze([yt.common,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.gradientmap,yt.fog,yt.lights,{emissive:{value:new qt(0)}}]),vertexShader:Zt.meshtoon_vert,fragmentShader:Zt.meshtoon_frag},matcap:{uniforms:Ze([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,{matcap:{value:null}}]),vertexShader:Zt.meshmatcap_vert,fragmentShader:Zt.meshmatcap_frag},points:{uniforms:Ze([yt.points,yt.fog]),vertexShader:Zt.points_vert,fragmentShader:Zt.points_frag},dashed:{uniforms:Ze([yt.common,yt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Zt.linedashed_vert,fragmentShader:Zt.linedashed_frag},depth:{uniforms:Ze([yt.common,yt.displacementmap]),vertexShader:Zt.depth_vert,fragmentShader:Zt.depth_frag},normal:{uniforms:Ze([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,{opacity:{value:1}}]),vertexShader:Zt.meshnormal_vert,fragmentShader:Zt.meshnormal_frag},sprite:{uniforms:Ze([yt.sprite,yt.fog]),vertexShader:Zt.sprite_vert,fragmentShader:Zt.sprite_frag},background:{uniforms:{uvTransform:{value:new $t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Zt.background_vert,fragmentShader:Zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Zt.backgroundCube_vert,fragmentShader:Zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Zt.cube_vert,fragmentShader:Zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Zt.equirect_vert,fragmentShader:Zt.equirect_frag},distanceRGBA:{uniforms:Ze([yt.common,yt.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Zt.distanceRGBA_vert,fragmentShader:Zt.distanceRGBA_frag},shadow:{uniforms:Ze([yt.lights,yt.fog,{color:{value:new qt(0)},opacity:{value:1}}]),vertexShader:Zt.shadow_vert,fragmentShader:Zt.shadow_frag}};bi.physical={uniforms:Ze([bi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $t},clearcoatNormalScale:{value:new xt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $t},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $t},sheen:{value:0},sheenColor:{value:new qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $t},transmissionSamplerSize:{value:new xt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $t},attenuationDistance:{value:0},attenuationColor:{value:new qt(0)},specularColor:{value:new qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $t},anisotropyVector:{value:new xt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $t}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag};var mr={r:0,b:0,g:0};function l0(n,t,e,i,s,r,o){let a=new qt(0),l=r===!0?0:1,c,u,d=null,h=0,f=null;function g(p,m){let y=!1,_=m.isScene===!0?m.background:null;_&&_.isTexture&&(_=(m.backgroundBlurriness>0?e:t).get(_)),_===null?x(a,l):_&&_.isColor&&(x(_,1),y=!0);let v=n.xr.getEnvironmentBlendMode();v==="additive"?i.buffers.color.setClear(0,0,0,1,o):v==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||y)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),_&&(_.isCubeTexture||_.mapping===lo)?(u===void 0&&(u=new $(new jt(1,1,1),new Ke({name:"BackgroundCubeMaterial",uniforms:ts(bi.backgroundCube.uniforms),vertexShader:bi.backgroundCube.vertexShader,fragmentShader:bi.backgroundCube.fragmentShader,side:Xe,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(S,b,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),u.material.uniforms.envMap.value=_,u.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,u.material.toneMapped=le.getTransfer(_.colorSpace)!==fe,(d!==_||h!==_.version||f!==n.toneMapping)&&(u.material.needsUpdate=!0,d=_,h=_.version,f=n.toneMapping),u.layers.enableAll(),p.unshift(u,u.geometry,u.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new $(new ae(2,2),new Ke({name:"BackgroundMaterial",uniforms:ts(bi.background.uniforms),vertexShader:bi.background.vertexShader,fragmentShader:bi.background.fragmentShader,side:ki,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,c.material.toneMapped=le.getTransfer(_.colorSpace)!==fe,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(d!==_||h!==_.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,d=_,h=_.version,f=n.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function x(p,m){p.getRGB(mr,Ch(n)),i.buffers.color.setClear(mr.r,mr.g,mr.b,m,o)}return{getClearColor:function(){return a},setClearColor:function(p,m=1){a.set(p),l=m,x(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,x(a,l)},render:g}}function c0(n,t,e,i){let s=n.getParameter(n.MAX_VERTEX_ATTRIBS),r=i.isWebGL2?null:t.get("OES_vertex_array_object"),o=i.isWebGL2||r!==null,a={},l=p(null),c=l,u=!1;function d(I,V,q,nt,Q){let Z=!1;if(o){let ct=x(nt,q,V);c!==ct&&(c=ct,f(c.object)),Z=m(I,nt,q,Q),Z&&y(I,nt,q,Q)}else{let ct=V.wireframe===!0;(c.geometry!==nt.id||c.program!==q.id||c.wireframe!==ct)&&(c.geometry=nt.id,c.program=q.id,c.wireframe=ct,Z=!0)}Q!==null&&e.update(Q,n.ELEMENT_ARRAY_BUFFER),(Z||u)&&(u=!1,U(I,V,q,nt),Q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(Q).buffer))}function h(){return i.isWebGL2?n.createVertexArray():r.createVertexArrayOES()}function f(I){return i.isWebGL2?n.bindVertexArray(I):r.bindVertexArrayOES(I)}function g(I){return i.isWebGL2?n.deleteVertexArray(I):r.deleteVertexArrayOES(I)}function x(I,V,q){let nt=q.wireframe===!0,Q=a[I.id];Q===void 0&&(Q={},a[I.id]=Q);let Z=Q[V.id];Z===void 0&&(Z={},Q[V.id]=Z);let ct=Z[nt];return ct===void 0&&(ct=p(h()),Z[nt]=ct),ct}function p(I){let V=[],q=[],nt=[];for(let Q=0;Q<s;Q++)V[Q]=0,q[Q]=0,nt[Q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:q,attributeDivisors:nt,object:I,attributes:{},index:null}}function m(I,V,q,nt){let Q=c.attributes,Z=V.attributes,ct=0,ht=q.getAttributes();for(let et in ht)if(ht[et].location>=0){let st=Q[et],ft=Z[et];if(ft===void 0&&(et==="instanceMatrix"&&I.instanceMatrix&&(ft=I.instanceMatrix),et==="instanceColor"&&I.instanceColor&&(ft=I.instanceColor)),st===void 0||st.attribute!==ft||ft&&st.data!==ft.data)return!0;ct++}return c.attributesNum!==ct||c.index!==nt}function y(I,V,q,nt){let Q={},Z=V.attributes,ct=0,ht=q.getAttributes();for(let et in ht)if(ht[et].location>=0){let st=Z[et];st===void 0&&(et==="instanceMatrix"&&I.instanceMatrix&&(st=I.instanceMatrix),et==="instanceColor"&&I.instanceColor&&(st=I.instanceColor));let ft={};ft.attribute=st,st&&st.data&&(ft.data=st.data),Q[et]=ft,ct++}c.attributes=Q,c.attributesNum=ct,c.index=nt}function _(){let I=c.newAttributes;for(let V=0,q=I.length;V<q;V++)I[V]=0}function v(I){S(I,0)}function S(I,V){let q=c.newAttributes,nt=c.enabledAttributes,Q=c.attributeDivisors;q[I]=1,nt[I]===0&&(n.enableVertexAttribArray(I),nt[I]=1),Q[I]!==V&&((i.isWebGL2?n:t.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](I,V),Q[I]=V)}function b(){let I=c.newAttributes,V=c.enabledAttributes;for(let q=0,nt=V.length;q<nt;q++)V[q]!==I[q]&&(n.disableVertexAttribArray(q),V[q]=0)}function R(I,V,q,nt,Q,Z,ct){ct===!0?n.vertexAttribIPointer(I,V,q,Q,Z):n.vertexAttribPointer(I,V,q,nt,Q,Z)}function U(I,V,q,nt){if(i.isWebGL2===!1&&(I.isInstancedMesh||nt.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;_();let Q=nt.attributes,Z=q.getAttributes(),ct=V.defaultAttributeValues;for(let ht in Z){let et=Z[ht];if(et.location>=0){let F=Q[ht];if(F===void 0&&(ht==="instanceMatrix"&&I.instanceMatrix&&(F=I.instanceMatrix),ht==="instanceColor"&&I.instanceColor&&(F=I.instanceColor)),F!==void 0){let st=F.normalized,ft=F.itemSize,mt=e.get(F);if(mt===void 0)continue;let vt=mt.buffer,Ut=mt.type,Ft=mt.bytesPerElement,P=i.isWebGL2===!0&&(Ut===n.INT||Ut===n.UNSIGNED_INT||F.gpuType===_h);if(F.isInterleavedBufferAttribute){let D=F.data,T=D.stride,O=F.offset;if(D.isInstancedInterleavedBuffer){for(let N=0;N<et.locationSize;N++)S(et.location+N,D.meshPerAttribute);I.isInstancedMesh!==!0&&nt._maxInstanceCount===void 0&&(nt._maxInstanceCount=D.meshPerAttribute*D.count)}else for(let N=0;N<et.locationSize;N++)v(et.location+N);n.bindBuffer(n.ARRAY_BUFFER,vt);for(let N=0;N<et.locationSize;N++)R(et.location+N,ft/et.locationSize,Ut,st,T*Ft,(O+ft/et.locationSize*N)*Ft,P)}else{if(F.isInstancedBufferAttribute){for(let D=0;D<et.locationSize;D++)S(et.location+D,F.meshPerAttribute);I.isInstancedMesh!==!0&&nt._maxInstanceCount===void 0&&(nt._maxInstanceCount=F.meshPerAttribute*F.count)}else for(let D=0;D<et.locationSize;D++)v(et.location+D);n.bindBuffer(n.ARRAY_BUFFER,vt);for(let D=0;D<et.locationSize;D++)R(et.location+D,ft/et.locationSize,Ut,st,ft*Ft,ft/et.locationSize*D*Ft,P)}}else if(ct!==void 0){let st=ct[ht];if(st!==void 0)switch(st.length){case 2:n.vertexAttrib2fv(et.location,st);break;case 3:n.vertexAttrib3fv(et.location,st);break;case 4:n.vertexAttrib4fv(et.location,st);break;default:n.vertexAttrib1fv(et.location,st)}}}}b()}function M(){Y();for(let I in a){let V=a[I];for(let q in V){let nt=V[q];for(let Q in nt)g(nt[Q].object),delete nt[Q];delete V[q]}delete a[I]}}function E(I){if(a[I.id]===void 0)return;let V=a[I.id];for(let q in V){let nt=V[q];for(let Q in nt)g(nt[Q].object),delete nt[Q];delete V[q]}delete a[I.id]}function z(I){for(let V in a){let q=a[V];if(q[I.id]===void 0)continue;let nt=q[I.id];for(let Q in nt)g(nt[Q].object),delete nt[Q];delete q[I.id]}}function Y(){it(),u=!0,c!==l&&(c=l,f(c.object))}function it(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:Y,resetDefaultState:it,dispose:M,releaseStatesOfGeometry:E,releaseStatesOfProgram:z,initAttributes:_,enableAttribute:v,disableUnusedAttributes:b}}function h0(n,t,e,i){let s=i.isWebGL2,r;function o(u){r=u}function a(u,d){n.drawArrays(r,u,d),e.update(d,r,1)}function l(u,d,h){if(h===0)return;let f,g;if(s)f=n,g="drawArraysInstanced";else if(f=t.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](r,u,d,h),e.update(d,r,h)}function c(u,d,h){if(h===0)return;let f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<h;g++)this.render(u[g],d[g]);else{f.multiDrawArraysWEBGL(r,u,0,d,0,h);let g=0;for(let x=0;x<h;x++)g+=d[x];e.update(g,r,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function u0(n,t,e){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let R=t.get("EXT_texture_filter_anisotropic");i=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let o=typeof WebGL2RenderingContext!="undefined"&&n.constructor.name==="WebGL2RenderingContext",a=e.precision!==void 0?e.precision:"highp",l=r(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);let c=o||t.has("WEBGL_draw_buffers"),u=e.logarithmicDepthBuffer===!0,d=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),h=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=n.getParameter(n.MAX_TEXTURE_SIZE),g=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),x=n.getParameter(n.MAX_VERTEX_ATTRIBS),p=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),m=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),_=h>0,v=o||t.has("OES_texture_float"),S=_&&v,b=o?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:u,maxTextures:d,maxVertexTextures:h,maxTextureSize:f,maxCubemapSize:g,maxAttributes:x,maxVertexUniforms:p,maxVaryings:m,maxFragmentUniforms:y,vertexTextures:_,floatFragmentTextures:v,floatVertexTextures:S,maxSamples:b}}function d0(n){let t=this,e=null,i=0,s=!1,r=!1,o=new Ui,a=new $t,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let f=d.length!==0||h||i!==0||s;return s=h,i=d.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){e=u(d,h,0)},this.setState=function(d,h,f){let g=d.clippingPlanes,x=d.clipIntersection,p=d.clipShadows,m=n.get(d);if(!s||g===null||g.length===0||r&&!p)r?u(null):c();else{let y=r?0:i,_=y*4,v=m.clippingState||null;l.value=v,v=u(g,h,_,f);for(let S=0;S!==_;++S)v[S]=e[S];m.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(d,h,f,g){let x=d!==null?d.length:0,p=null;if(x!==0){if(p=l.value,g!==!0||p===null){let m=f+x*4,y=h.matrixWorldInverse;a.getNormalMatrix(y),(p===null||p.length<m)&&(p=new Float32Array(m));for(let _=0,v=f;_!==x;++_,v+=4)o.copy(d[_]).applyMatrix4(y,a),o.normal.toArray(p,v),p[v+3]=o.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,p}}function f0(n){let t=new WeakMap;function e(o,a){return a===_a?o.mapping=Kn:a===xa&&(o.mapping=$n),o}function i(o){if(o&&o.isTexture){let a=o.mapping;if(a===_a||a===xa)if(t.has(o)){let l=t.get(o).texture;return e(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new Sa(l.height/2);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}var es=class extends Br{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,o=i+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Wn=4,Pc=[.125,.215,.35,.446,.526,.582],cn=20,sa=new es,Lc=new qt,ra=null,oa=0,aa=0,an=(1+Math.sqrt(5))/2,Hn=1/an,Ic=[new L(1,1,1),new L(-1,1,1),new L(1,1,-1),new L(-1,1,-1),new L(0,an,Hn),new L(0,an,-Hn),new L(Hn,0,an),new L(-Hn,0,an),new L(an,Hn,0),new L(-an,Hn,0)],Gr=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){ra=this._renderer.getRenderTarget(),oa=this._renderer.getActiveCubeFace(),aa=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Nc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Uc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ra,oa,aa),t.scissorTest=!1,gr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Kn||t.mapping===$n?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ra=this._renderer.getRenderTarget(),oa=this._renderer.getActiveCubeFace(),aa=this._renderer.getActiveMipmapLevel();let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:je,minFilter:je,generateMipmaps:!1,type:fn,format:mi,colorSpace:zi,depthBuffer:!1},s=Dc(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Dc(t,e,i);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=p0(r)),this._blurMaterial=m0(r,t,e)}return s}_compileMaterial(t){let e=new $(this._lodPlanes[0],t);this._renderer.compile(e,sa)}_sceneToCubeUV(t,e,i,s){let a=new Oe(90,1,e,i),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,h=u.toneMapping;u.getClearColor(Lc),u.toneMapping=Ji,u.autoClear=!1;let f=new Je({name:"PMREM.Background",side:Xe,depthWrite:!1,depthTest:!1}),g=new $(new jt,f),x=!1,p=t.background;p?p.isColor&&(f.color.copy(p),t.background=null,x=!0):(f.color.copy(Lc),x=!0);for(let m=0;m<6;m++){let y=m%3;y===0?(a.up.set(0,l[m],0),a.lookAt(c[m],0,0)):y===1?(a.up.set(0,0,l[m]),a.lookAt(0,c[m],0)):(a.up.set(0,l[m],0),a.lookAt(0,0,c[m]));let _=this._cubeSize;gr(s,y*_,m>2?_:0,_,_),u.setRenderTarget(s),x&&u.render(g,a),u.render(t,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=h,u.autoClear=d,t.background=p}_textureToCubeUV(t,e){let i=this._renderer,s=t.mapping===Kn||t.mapping===$n;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Nc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Uc());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new $(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let l=this._cubeSize;gr(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,sa)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){let r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Ic[(s-1)%Ic.length];this._blur(t,s-1,s,r,o)}e.autoClear=i}_blur(t,e,i,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,d=new $(this._lodPlanes[s],c),h=c.uniforms,f=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*cn-1),x=r/g,p=isFinite(r)?1+Math.floor(u*x):cn;p>cn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${cn}`);let m=[],y=0;for(let R=0;R<cn;++R){let U=R/x,M=Math.exp(-U*U/2);m.push(M),R===0?y+=M:R<p&&(y+=2*M)}for(let R=0;R<m.length;R++)m[R]=m[R]/y;h.envMap.value=t.texture,h.samples.value=p,h.weights.value=m,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);let{_lodMax:_}=this;h.dTheta.value=g,h.mipInt.value=_-i;let v=this._sizeLods[s],S=3*v*(s>_-Wn?s-_+Wn:0),b=4*(this._cubeSize-v);gr(e,S,b,3*v,2*v),l.setRenderTarget(e),l.render(d,sa)}};function p0(n){let t=[],e=[],i=[],s=n,r=n-Wn+1+Pc.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let l=1/a;o>n-Wn?l=Pc[o-n+Wn-1]:o===0&&(l=0),i.push(l);let c=1/(a-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],f=6,g=6,x=3,p=2,m=1,y=new Float32Array(x*g*f),_=new Float32Array(p*g*f),v=new Float32Array(m*g*f);for(let b=0;b<f;b++){let R=b%3*2/3-1,U=b>2?0:-1,M=[R,U,0,R+2/3,U,0,R+2/3,U+1,0,R,U,0,R+2/3,U+1,0,R,U+1,0];y.set(M,x*g*b),_.set(h,p*g*b);let E=[b,b,b,b,b,b];v.set(E,m*g*b)}let S=new we;S.setAttribute("position",new Ce(y,x)),S.setAttribute("uv",new Ce(_,p)),S.setAttribute("faceIndex",new Ce(v,m)),t.push(S),s>Wn&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Dc(n,t,e){let i=new _i(n,t,e);return i.texture.mapping=lo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function gr(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function m0(n,t,e){let i=new Float32Array(cn),s=new L(0,1,0);return new Ke({name:"SphericalGaussianBlur",defines:{n:cn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ll(),fragmentShader:`

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
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function Uc(){return new Ke({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ll(),fragmentShader:`

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
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function Nc(){return new Ke({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ll(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function ll(){return`

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
	`}function g0(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){let l=a.mapping,c=l===_a||l===xa,u=l===Kn||l===$n;if(c||u)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let d=t.get(a);return e===null&&(e=new Gr(n)),d=c?e.fromEquirectangular(a,d):e.fromCubemap(a,d),t.set(a,d),d.texture}else{if(t.has(a))return t.get(a).texture;{let d=a.image;if(c&&d&&d.height>0||u&&d&&s(d)){e===null&&(e=new Gr(n));let h=c?e.fromEquirectangular(a):e.fromCubemap(a);return t.set(a,h),a.addEventListener("dispose",r),h.texture}else return null}}}return a}function s(a){let l=0,c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){let l=a.target;l.removeEventListener("dispose",r);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function _0(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(i){i.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(i){let s=e(i);return s===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function x0(n,t,e,i){let s={},r=new WeakMap;function o(d){let h=d.target;h.index!==null&&t.remove(h.index);for(let g in h.attributes)t.remove(h.attributes[g]);for(let g in h.morphAttributes){let x=h.morphAttributes[g];for(let p=0,m=x.length;p<m;p++)t.remove(x[p])}h.removeEventListener("dispose",o),delete s[h.id];let f=r.get(h);f&&(t.remove(f),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,e.memory.geometries--}function a(d,h){return s[h.id]===!0||(h.addEventListener("dispose",o),s[h.id]=!0,e.memory.geometries++),h}function l(d){let h=d.attributes;for(let g in h)t.update(h[g],n.ARRAY_BUFFER);let f=d.morphAttributes;for(let g in f){let x=f[g];for(let p=0,m=x.length;p<m;p++)t.update(x[p],n.ARRAY_BUFFER)}}function c(d){let h=[],f=d.index,g=d.attributes.position,x=0;if(f!==null){let y=f.array;x=f.version;for(let _=0,v=y.length;_<v;_+=3){let S=y[_+0],b=y[_+1],R=y[_+2];h.push(S,b,b,R,R,S)}}else if(g!==void 0){let y=g.array;x=g.version;for(let _=0,v=y.length/3-1;_<v;_+=3){let S=_+0,b=_+1,R=_+2;h.push(S,b,b,R,R,S)}}else return;let p=new(Ah(h)?Or:Fr)(h,1);p.version=x;let m=r.get(d);m&&t.remove(m),r.set(d,p)}function u(d){let h=r.get(d);if(h){let f=d.index;f!==null&&h.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function y0(n,t,e,i){let s=i.isWebGL2,r;function o(f){r=f}let a,l;function c(f){a=f.type,l=f.bytesPerElement}function u(f,g){n.drawElements(r,g,a,f*l),e.update(g,r,1)}function d(f,g,x){if(x===0)return;let p,m;if(s)p=n,m="drawElementsInstanced";else if(p=t.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[m](r,g,a,f*l,x),e.update(g,r,x)}function h(f,g,x){if(x===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<x;m++)this.render(f[m]/l,g[m]);else{p.multiDrawElementsWEBGL(r,g,0,a,f,0,x);let m=0;for(let y=0;y<x;y++)m+=g[y];e.update(m,r,1)}}this.setMode=o,this.setIndex=c,this.render=u,this.renderInstances=d,this.renderMultiDraw=h}function v0(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function b0(n,t){return n[0]-t[0]}function M0(n,t){return Math.abs(t[1])-Math.abs(n[1])}function E0(n,t,e){let i={},s=new Float32Array(8),r=new WeakMap,o=new xe,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,u,d){let h=c.morphTargetInfluences;if(t.isWebGL2===!0){let f=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,g=f!==void 0?f.length:0,x=r.get(u);if(x===void 0||x.count!==g){let I=function(){Y.dispose(),r.delete(u),u.removeEventListener("dispose",I)};x!==void 0&&x.texture.dispose();let y=u.morphAttributes.position!==void 0,_=u.morphAttributes.normal!==void 0,v=u.morphAttributes.color!==void 0,S=u.morphAttributes.position||[],b=u.morphAttributes.normal||[],R=u.morphAttributes.color||[],U=0;y===!0&&(U=1),_===!0&&(U=2),v===!0&&(U=3);let M=u.attributes.position.count*U,E=1;M>t.maxTextureSize&&(E=Math.ceil(M/t.maxTextureSize),M=t.maxTextureSize);let z=new Float32Array(M*E*4*g),Y=new kr(z,M,E,g);Y.type=Zi,Y.needsUpdate=!0;let it=U*4;for(let V=0;V<g;V++){let q=S[V],nt=b[V],Q=R[V],Z=M*E*4*V;for(let ct=0;ct<q.count;ct++){let ht=ct*it;y===!0&&(o.fromBufferAttribute(q,ct),z[Z+ht+0]=o.x,z[Z+ht+1]=o.y,z[Z+ht+2]=o.z,z[Z+ht+3]=0),_===!0&&(o.fromBufferAttribute(nt,ct),z[Z+ht+4]=o.x,z[Z+ht+5]=o.y,z[Z+ht+6]=o.z,z[Z+ht+7]=0),v===!0&&(o.fromBufferAttribute(Q,ct),z[Z+ht+8]=o.x,z[Z+ht+9]=o.y,z[Z+ht+10]=o.z,z[Z+ht+11]=Q.itemSize===4?o.w:1)}}x={count:g,texture:Y,size:new xt(M,E)},r.set(u,x),u.addEventListener("dispose",I)}let p=0;for(let y=0;y<h.length;y++)p+=h[y];let m=u.morphTargetsRelative?1:1-p;d.getUniforms().setValue(n,"morphTargetBaseInfluence",m),d.getUniforms().setValue(n,"morphTargetInfluences",h),d.getUniforms().setValue(n,"morphTargetsTexture",x.texture,e),d.getUniforms().setValue(n,"morphTargetsTextureSize",x.size)}else{let f=h===void 0?0:h.length,g=i[u.id];if(g===void 0||g.length!==f){g=[];for(let _=0;_<f;_++)g[_]=[_,0];i[u.id]=g}for(let _=0;_<f;_++){let v=g[_];v[0]=_,v[1]=h[_]}g.sort(M0);for(let _=0;_<8;_++)_<f&&g[_][1]?(a[_][0]=g[_][0],a[_][1]=g[_][1]):(a[_][0]=Number.MAX_SAFE_INTEGER,a[_][1]=0);a.sort(b0);let x=u.morphAttributes.position,p=u.morphAttributes.normal,m=0;for(let _=0;_<8;_++){let v=a[_],S=v[0],b=v[1];S!==Number.MAX_SAFE_INTEGER&&b?(x&&u.getAttribute("morphTarget"+_)!==x[S]&&u.setAttribute("morphTarget"+_,x[S]),p&&u.getAttribute("morphNormal"+_)!==p[S]&&u.setAttribute("morphNormal"+_,p[S]),s[_]=b,m+=b):(x&&u.hasAttribute("morphTarget"+_)===!0&&u.deleteAttribute("morphTarget"+_),p&&u.hasAttribute("morphNormal"+_)===!0&&u.deleteAttribute("morphNormal"+_),s[_]=0)}let y=u.morphTargetsRelative?1:1-m;d.getUniforms().setValue(n,"morphTargetBaseInfluence",y),d.getUniforms().setValue(n,"morphTargetInfluences",s)}}return{update:l}}function w0(n,t,e,i){let s=new WeakMap;function r(l){let c=i.render.frame,u=l.geometry,d=t.get(l,u);if(s.get(d)!==c&&(t.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return d}function o(){s=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}var Vr=class extends ai{constructor(t,e,i,s,r,o,a,l,c,u){if(u=u!==void 0?u:un,u!==un&&u!==jn)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&u===un&&(i=Yi),i===void 0&&u===jn&&(i=hn),super(null,s,r,o,a,l,u,i,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:ke,this.minFilter=l!==void 0?l:ke,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},Lh=new ai,Ih=new Vr(1,1);Ih.compareFunction=Th;var Dh=new kr,Uh=new Ea,Nh=new Hr,kc=[],zc=[],Fc=new Float32Array(16),Oc=new Float32Array(9),Bc=new Float32Array(4);function os(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=kc[s];if(r===void 0&&(r=new Float32Array(s),kc[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Pe(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Le(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function ho(n,t){let e=zc[t];e===void 0&&(e=new Int32Array(t),zc[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function S0(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function T0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;n.uniform2fv(this.addr,t),Le(e,t)}}function A0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Pe(e,t))return;n.uniform3fv(this.addr,t),Le(e,t)}}function R0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;n.uniform4fv(this.addr,t),Le(e,t)}}function C0(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Pe(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Le(e,t)}else{if(Pe(e,i))return;Bc.set(i),n.uniformMatrix2fv(this.addr,!1,Bc),Le(e,i)}}function P0(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Pe(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Le(e,t)}else{if(Pe(e,i))return;Oc.set(i),n.uniformMatrix3fv(this.addr,!1,Oc),Le(e,i)}}function L0(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Pe(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Le(e,t)}else{if(Pe(e,i))return;Fc.set(i),n.uniformMatrix4fv(this.addr,!1,Fc),Le(e,i)}}function I0(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function D0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;n.uniform2iv(this.addr,t),Le(e,t)}}function U0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Pe(e,t))return;n.uniform3iv(this.addr,t),Le(e,t)}}function N0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;n.uniform4iv(this.addr,t),Le(e,t)}}function k0(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function z0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;n.uniform2uiv(this.addr,t),Le(e,t)}}function F0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Pe(e,t))return;n.uniform3uiv(this.addr,t),Le(e,t)}}function O0(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;n.uniform4uiv(this.addr,t),Le(e,t)}}function B0(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r=this.type===n.SAMPLER_2D_SHADOW?Ih:Lh;e.setTexture2D(t||r,s)}function H0(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Uh,s)}function G0(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Nh,s)}function V0(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Dh,s)}function W0(n){switch(n){case 5126:return S0;case 35664:return T0;case 35665:return A0;case 35666:return R0;case 35674:return C0;case 35675:return P0;case 35676:return L0;case 5124:case 35670:return I0;case 35667:case 35671:return D0;case 35668:case 35672:return U0;case 35669:case 35673:return N0;case 5125:return k0;case 36294:return z0;case 36295:return F0;case 36296:return O0;case 35678:case 36198:case 36298:case 36306:case 35682:return B0;case 35679:case 36299:case 36307:return H0;case 35680:case 36300:case 36308:case 36293:return G0;case 36289:case 36303:case 36311:case 36292:return V0}}function X0(n,t){n.uniform1fv(this.addr,t)}function q0(n,t){let e=os(t,this.size,2);n.uniform2fv(this.addr,e)}function Y0(n,t){let e=os(t,this.size,3);n.uniform3fv(this.addr,e)}function Z0(n,t){let e=os(t,this.size,4);n.uniform4fv(this.addr,e)}function J0(n,t){let e=os(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function K0(n,t){let e=os(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function $0(n,t){let e=os(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function j0(n,t){n.uniform1iv(this.addr,t)}function Q0(n,t){n.uniform2iv(this.addr,t)}function tm(n,t){n.uniform3iv(this.addr,t)}function em(n,t){n.uniform4iv(this.addr,t)}function im(n,t){n.uniform1uiv(this.addr,t)}function nm(n,t){n.uniform2uiv(this.addr,t)}function sm(n,t){n.uniform3uiv(this.addr,t)}function rm(n,t){n.uniform4uiv(this.addr,t)}function om(n,t,e){let i=this.cache,s=t.length,r=ho(e,s);Pe(i,r)||(n.uniform1iv(this.addr,r),Le(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Lh,r[o])}function am(n,t,e){let i=this.cache,s=t.length,r=ho(e,s);Pe(i,r)||(n.uniform1iv(this.addr,r),Le(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Uh,r[o])}function lm(n,t,e){let i=this.cache,s=t.length,r=ho(e,s);Pe(i,r)||(n.uniform1iv(this.addr,r),Le(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Nh,r[o])}function cm(n,t,e){let i=this.cache,s=t.length,r=ho(e,s);Pe(i,r)||(n.uniform1iv(this.addr,r),Le(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Dh,r[o])}function hm(n){switch(n){case 5126:return X0;case 35664:return q0;case 35665:return Y0;case 35666:return Z0;case 35674:return J0;case 35675:return K0;case 35676:return $0;case 5124:case 35670:return j0;case 35667:case 35671:return Q0;case 35668:case 35672:return tm;case 35669:case 35673:return em;case 5125:return im;case 36294:return nm;case 36295:return sm;case 36296:return rm;case 35678:case 36198:case 36298:case 36306:case 35682:return om;case 35679:case 36299:case 36307:return am;case 35680:case 36300:case 36308:case 36293:return lm;case 36289:case 36303:case 36311:case 36292:return cm}}var Ta=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=W0(e.type)}},Aa=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=hm(e.type)}},Ra=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],i)}}},la=/(\w+)(\])?(\[|\.)?/g;function Hc(n,t){n.seq.push(t),n.map[t.id]=t}function um(n,t,e){let i=n.name,s=i.length;for(la.lastIndex=0;;){let r=la.exec(i),o=la.lastIndex,a=r[1],l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Hc(e,c===void 0?new Ta(a,n,t):new Aa(a,n,t));break}else{let d=e.map[a];d===void 0&&(d=new Ra(a),Hc(e,d)),e=d}}}var Jn=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);um(r,o,this)}}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&i.push(o)}return i}};function Gc(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var dm=37297,fm=0;function pm(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}function mm(n){let t=le.getPrimaries(le.workingColorSpace),e=le.getPrimaries(n),i;switch(t===e?i="":t===Pr&&e===Cr?i="LinearDisplayP3ToLinearSRGB":t===Cr&&e===Pr&&(i="LinearSRGBToLinearDisplayP3"),n){case zi:case co:return[i,"LinearTransferOETF"];case pe:case ol:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function Vc(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+pm(n.getShaderSource(t),o)}else return s}function gm(n,t){let e=mm(t);return`vec4 ${n}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function _m(n,t){let e;switch(t){case ku:e="Linear";break;case zu:e="Reinhard";break;case Fu:e="OptimizedCineon";break;case sl:e="ACESFilmic";break;case Bu:e="AgX";break;case Ou:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function xm(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Xn).join(`
`)}function ym(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Xn).join(`
`)}function vm(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function bm(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),o=r.name,a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function Xn(n){return n!==""}function Wc(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Xc(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Mm=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ca(n){return n.replace(Mm,wm)}var Em=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function wm(n,t){let e=Zt[t];if(e===void 0){let i=Em.get(t);if(i!==void 0)e=Zt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Ca(e)}var Sm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function qc(n){return n.replace(Sm,Tm)}function Tm(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Yc(n){let t="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Am(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===ph?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===hu?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Di&&(t="SHADOWMAP_TYPE_VSM"),t}function Rm(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Kn:case $n:t="ENVMAP_TYPE_CUBE";break;case lo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Cm(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case $n:t="ENVMAP_MODE_REFRACTION";break}return t}function Pm(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case mh:t="ENVMAP_BLENDING_MULTIPLY";break;case Uu:t="ENVMAP_BLENDING_MIX";break;case Nu:t="ENVMAP_BLENDING_ADD";break}return t}function Lm(n){let t=n.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function Im(n,t,e,i){let s=n.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,l=Am(e),c=Rm(e),u=Cm(e),d=Pm(e),h=Lm(e),f=e.isWebGL2?"":xm(e),g=ym(e),x=vm(r),p=s.createProgram(),m,y,_=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(Xn).join(`
`),m.length>0&&(m+=`
`),y=[f,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x].filter(Xn).join(`
`),y.length>0&&(y+=`
`)):(m=[Yc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Xn).join(`
`),y=[f,Yc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,x,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ji?"#define TONE_MAPPING":"",e.toneMapping!==Ji?Zt.tonemapping_pars_fragment:"",e.toneMapping!==Ji?_m("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Zt.colorspace_pars_fragment,gm("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Xn).join(`
`)),o=Ca(o),o=Wc(o,e),o=Xc(o,e),a=Ca(a),a=Wc(a,e),a=Xc(a,e),o=qc(o),a=qc(a),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,y=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===dc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===dc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);let v=_+m+o,S=_+y+a,b=Gc(s,s.VERTEX_SHADER,v),R=Gc(s,s.FRAGMENT_SHADER,S);s.attachShader(p,b),s.attachShader(p,R),e.index0AttributeName!==void 0?s.bindAttribLocation(p,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function U(Y){if(n.debug.checkShaderErrors){let it=s.getProgramInfoLog(p).trim(),I=s.getShaderInfoLog(b).trim(),V=s.getShaderInfoLog(R).trim(),q=!0,nt=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(q=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,p,b,R);else{let Q=Vc(s,b,"vertex"),Z=Vc(s,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Program Info Log: `+it+`
`+Q+`
`+Z)}else it!==""?console.warn("THREE.WebGLProgram: Program Info Log:",it):(I===""||V==="")&&(nt=!1);nt&&(Y.diagnostics={runnable:q,programLog:it,vertexShader:{log:I,prefix:m},fragmentShader:{log:V,prefix:y}})}s.deleteShader(b),s.deleteShader(R),M=new Jn(s,p),E=bm(s,p)}let M;this.getUniforms=function(){return M===void 0&&U(this),M};let E;this.getAttributes=function(){return E===void 0&&U(this),E};let z=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return z===!1&&(z=s.getProgramParameter(p,dm)),z},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=fm++,this.cacheKey=t,this.usedTimes=1,this.program=p,this.vertexShader=b,this.fragmentShader=R,this}var Dm=0,Pa=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new La(t),e.set(t,i)),i}},La=class{constructor(t){this.id=Dm++,this.code=t,this.usedTimes=0}};function Um(n,t,e,i,s,r,o){let a=new zr,l=new Pa,c=[],u=s.isWebGL2,d=s.logarithmicDepthBuffer,h=s.vertexTextures,f=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(M){return M===0?"uv":`uv${M}`}function p(M,E,z,Y,it){let I=Y.fog,V=it.geometry,q=M.isMeshStandardMaterial?Y.environment:null,nt=(M.isMeshStandardMaterial?e:t).get(M.envMap||q),Q=nt&&nt.mapping===lo?nt.image.height:null,Z=g[M.type];M.precision!==null&&(f=s.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));let ct=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,ht=ct!==void 0?ct.length:0,et=0;V.morphAttributes.position!==void 0&&(et=1),V.morphAttributes.normal!==void 0&&(et=2),V.morphAttributes.color!==void 0&&(et=3);let F,st,ft,mt;if(Z){let qe=bi[Z];F=qe.vertexShader,st=qe.fragmentShader}else F=M.vertexShader,st=M.fragmentShader,l.update(M),ft=l.getVertexShaderID(M),mt=l.getFragmentShaderID(M);let vt=n.getRenderTarget(),Ut=it.isInstancedMesh===!0,Ft=it.isBatchedMesh===!0,P=!!M.map,D=!!M.matcap,T=!!nt,O=!!M.aoMap,N=!!M.lightMap,X=!!M.bumpMap,B=!!M.normalMap,gt=!!M.displacementMap,bt=!!M.emissiveMap,A=!!M.metalnessMap,w=!!M.roughnessMap,G=M.anisotropy>0,lt=M.clearcoat>0,at=M.iridescence>0,rt=M.sheen>0,Ct=M.transmission>0,Mt=G&&!!M.anisotropyMap,St=lt&&!!M.clearcoatMap,Dt=lt&&!!M.clearcoatNormalMap,Bt=lt&&!!M.clearcoatRoughnessMap,ut=at&&!!M.iridescenceMap,ie=at&&!!M.iridescenceThicknessMap,Yt=rt&&!!M.sheenColorMap,kt=rt&&!!M.sheenRoughnessMap,Nt=!!M.specularMap,Pt=!!M.specularColorMap,Ht=!!M.specularIntensityMap,ne=Ct&&!!M.transmissionMap,de=Ct&&!!M.thicknessMap,Gt=!!M.gradientMap,_t=!!M.alphaMap,k=M.alphaTest>0,Et=!!M.alphaHash,H=!!M.extensions,j=!!V.attributes.uv1,At=!!V.attributes.uv2,se=!!V.attributes.uv3,he=Ji;return M.toneMapped&&(vt===null||vt.isXRRenderTarget===!0)&&(he=n.toneMapping),{isWebGL2:u,shaderID:Z,shaderType:M.type,shaderName:M.name,vertexShader:F,fragmentShader:st,defines:M.defines,customVertexShaderID:ft,customFragmentShaderID:mt,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:Ft,instancing:Ut,instancingColor:Ut&&it.instanceColor!==null,supportsVertexTextures:h,outputColorSpace:vt===null?n.outputColorSpace:vt.isXRRenderTarget===!0?vt.texture.colorSpace:zi,map:P,matcap:D,envMap:T,envMapMode:T&&nt.mapping,envMapCubeUVHeight:Q,aoMap:O,lightMap:N,bumpMap:X,normalMap:B,displacementMap:h&&gt,emissiveMap:bt,normalMapObjectSpace:B&&M.normalMapType===ju,normalMapTangentSpace:B&&M.normalMapType===Sh,metalnessMap:A,roughnessMap:w,anisotropy:G,anisotropyMap:Mt,clearcoat:lt,clearcoatMap:St,clearcoatNormalMap:Dt,clearcoatRoughnessMap:Bt,iridescence:at,iridescenceMap:ut,iridescenceThicknessMap:ie,sheen:rt,sheenColorMap:Yt,sheenRoughnessMap:kt,specularMap:Nt,specularColorMap:Pt,specularIntensityMap:Ht,transmission:Ct,transmissionMap:ne,thicknessMap:de,gradientMap:Gt,opaque:M.transparent===!1&&M.blending===Yn,alphaMap:_t,alphaTest:k,alphaHash:Et,combine:M.combine,mapUv:P&&x(M.map.channel),aoMapUv:O&&x(M.aoMap.channel),lightMapUv:N&&x(M.lightMap.channel),bumpMapUv:X&&x(M.bumpMap.channel),normalMapUv:B&&x(M.normalMap.channel),displacementMapUv:gt&&x(M.displacementMap.channel),emissiveMapUv:bt&&x(M.emissiveMap.channel),metalnessMapUv:A&&x(M.metalnessMap.channel),roughnessMapUv:w&&x(M.roughnessMap.channel),anisotropyMapUv:Mt&&x(M.anisotropyMap.channel),clearcoatMapUv:St&&x(M.clearcoatMap.channel),clearcoatNormalMapUv:Dt&&x(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Bt&&x(M.clearcoatRoughnessMap.channel),iridescenceMapUv:ut&&x(M.iridescenceMap.channel),iridescenceThicknessMapUv:ie&&x(M.iridescenceThicknessMap.channel),sheenColorMapUv:Yt&&x(M.sheenColorMap.channel),sheenRoughnessMapUv:kt&&x(M.sheenRoughnessMap.channel),specularMapUv:Nt&&x(M.specularMap.channel),specularColorMapUv:Pt&&x(M.specularColorMap.channel),specularIntensityMapUv:Ht&&x(M.specularIntensityMap.channel),transmissionMapUv:ne&&x(M.transmissionMap.channel),thicknessMapUv:de&&x(M.thicknessMap.channel),alphaMapUv:_t&&x(M.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(B||G),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,vertexUv1s:j,vertexUv2s:At,vertexUv3s:se,pointsUvs:it.isPoints===!0&&!!V.attributes.uv&&(P||_t),fog:!!I,useFog:M.fog===!0,fogExp2:I&&I.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:it.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:ht,morphTextureStride:et,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:n.shadowMap.enabled&&z.length>0,shadowMapType:n.shadowMap.type,toneMapping:he,useLegacyLights:n._useLegacyLights,decodeVideoTexture:P&&M.map.isVideoTexture===!0&&le.getTransfer(M.map.colorSpace)===fe,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===oe,flipSided:M.side===Xe,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:H&&M.extensions.derivatives===!0,extensionFragDepth:H&&M.extensions.fragDepth===!0,extensionDrawBuffers:H&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:H&&M.extensions.shaderTextureLOD===!0,extensionClipCullDistance:H&&M.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:u||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function m(M){let E=[];if(M.shaderID?E.push(M.shaderID):(E.push(M.customVertexShaderID),E.push(M.customFragmentShaderID)),M.defines!==void 0)for(let z in M.defines)E.push(z),E.push(M.defines[z]);return M.isRawShaderMaterial===!1&&(y(E,M),_(E,M),E.push(n.outputColorSpace)),E.push(M.customProgramCacheKey),E.join()}function y(M,E){M.push(E.precision),M.push(E.outputColorSpace),M.push(E.envMapMode),M.push(E.envMapCubeUVHeight),M.push(E.mapUv),M.push(E.alphaMapUv),M.push(E.lightMapUv),M.push(E.aoMapUv),M.push(E.bumpMapUv),M.push(E.normalMapUv),M.push(E.displacementMapUv),M.push(E.emissiveMapUv),M.push(E.metalnessMapUv),M.push(E.roughnessMapUv),M.push(E.anisotropyMapUv),M.push(E.clearcoatMapUv),M.push(E.clearcoatNormalMapUv),M.push(E.clearcoatRoughnessMapUv),M.push(E.iridescenceMapUv),M.push(E.iridescenceThicknessMapUv),M.push(E.sheenColorMapUv),M.push(E.sheenRoughnessMapUv),M.push(E.specularMapUv),M.push(E.specularColorMapUv),M.push(E.specularIntensityMapUv),M.push(E.transmissionMapUv),M.push(E.thicknessMapUv),M.push(E.combine),M.push(E.fogExp2),M.push(E.sizeAttenuation),M.push(E.morphTargetsCount),M.push(E.morphAttributeCount),M.push(E.numDirLights),M.push(E.numPointLights),M.push(E.numSpotLights),M.push(E.numSpotLightMaps),M.push(E.numHemiLights),M.push(E.numRectAreaLights),M.push(E.numDirLightShadows),M.push(E.numPointLightShadows),M.push(E.numSpotLightShadows),M.push(E.numSpotLightShadowsWithMaps),M.push(E.numLightProbes),M.push(E.shadowMapType),M.push(E.toneMapping),M.push(E.numClippingPlanes),M.push(E.numClipIntersection),M.push(E.depthPacking)}function _(M,E){a.disableAll(),E.isWebGL2&&a.enable(0),E.supportsVertexTextures&&a.enable(1),E.instancing&&a.enable(2),E.instancingColor&&a.enable(3),E.matcap&&a.enable(4),E.envMap&&a.enable(5),E.normalMapObjectSpace&&a.enable(6),E.normalMapTangentSpace&&a.enable(7),E.clearcoat&&a.enable(8),E.iridescence&&a.enable(9),E.alphaTest&&a.enable(10),E.vertexColors&&a.enable(11),E.vertexAlphas&&a.enable(12),E.vertexUv1s&&a.enable(13),E.vertexUv2s&&a.enable(14),E.vertexUv3s&&a.enable(15),E.vertexTangents&&a.enable(16),E.anisotropy&&a.enable(17),E.alphaHash&&a.enable(18),E.batching&&a.enable(19),M.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.skinning&&a.enable(4),E.morphTargets&&a.enable(5),E.morphNormals&&a.enable(6),E.morphColors&&a.enable(7),E.premultipliedAlpha&&a.enable(8),E.shadowMapEnabled&&a.enable(9),E.useLegacyLights&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),M.push(a.mask)}function v(M){let E=g[M.type],z;if(E){let Y=bi[E];z=al.clone(Y.uniforms)}else z=M.uniforms;return z}function S(M,E){let z;for(let Y=0,it=c.length;Y<it;Y++){let I=c[Y];if(I.cacheKey===E){z=I,++z.usedTimes;break}}return z===void 0&&(z=new Im(n,E,M,r),c.push(z)),z}function b(M){if(--M.usedTimes===0){let E=c.indexOf(M);c[E]=c[c.length-1],c.pop(),M.destroy()}}function R(M){l.remove(M)}function U(){l.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:v,acquireProgram:S,releaseProgram:b,releaseShaderCache:R,programs:c,dispose:U}}function Nm(){let n=new WeakMap;function t(r){let o=n.get(r);return o===void 0&&(o={},n.set(r,o)),o}function e(r){n.delete(r)}function i(r,o,a){n.get(r)[o]=a}function s(){n=new WeakMap}return{get:t,remove:e,update:i,dispose:s}}function km(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Zc(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Jc(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(d,h,f,g,x,p){let m=n[t];return m===void 0?(m={id:d.id,object:d,geometry:h,material:f,groupOrder:g,renderOrder:d.renderOrder,z:x,group:p},n[t]=m):(m.id=d.id,m.object=d,m.geometry=h,m.material=f,m.groupOrder=g,m.renderOrder=d.renderOrder,m.z=x,m.group=p),t++,m}function a(d,h,f,g,x,p){let m=o(d,h,f,g,x,p);f.transmission>0?i.push(m):f.transparent===!0?s.push(m):e.push(m)}function l(d,h,f,g,x,p){let m=o(d,h,f,g,x,p);f.transmission>0?i.unshift(m):f.transparent===!0?s.unshift(m):e.unshift(m)}function c(d,h){e.length>1&&e.sort(d||km),i.length>1&&i.sort(h||Zc),s.length>1&&s.sort(h||Zc)}function u(){for(let d=t,h=n.length;d<h;d++){let f=n[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:u,sort:c}}function zm(){let n=new WeakMap;function t(i,s){let r=n.get(i),o;return r===void 0?(o=new Jc,n.set(i,[o])):s>=r.length?(o=new Jc,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function Fm(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new L,color:new qt};break;case"SpotLight":e={position:new L,direction:new L,color:new qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new L,color:new qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new L,skyColor:new qt,groundColor:new qt};break;case"RectAreaLight":e={color:new qt,position:new L,halfWidth:new L,halfHeight:new L};break}return n[t.id]=e,e}}}function Om(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var Bm=0;function Hm(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function Gm(n,t){let e=new Fm,i=Om(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)s.probe.push(new L);let r=new L,o=new ce,a=new ce;function l(u,d){let h=0,f=0,g=0;for(let Y=0;Y<9;Y++)s.probe[Y].set(0,0,0);let x=0,p=0,m=0,y=0,_=0,v=0,S=0,b=0,R=0,U=0,M=0;u.sort(Hm);let E=d===!0?Math.PI:1;for(let Y=0,it=u.length;Y<it;Y++){let I=u[Y],V=I.color,q=I.intensity,nt=I.distance,Q=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=V.r*q*E,f+=V.g*q*E,g+=V.b*q*E;else if(I.isLightProbe){for(let Z=0;Z<9;Z++)s.probe[Z].addScaledVector(I.sh.coefficients[Z],q);M++}else if(I.isDirectionalLight){let Z=e.get(I);if(Z.color.copy(I.color).multiplyScalar(I.intensity*E),I.castShadow){let ct=I.shadow,ht=i.get(I);ht.shadowBias=ct.bias,ht.shadowNormalBias=ct.normalBias,ht.shadowRadius=ct.radius,ht.shadowMapSize=ct.mapSize,s.directionalShadow[x]=ht,s.directionalShadowMap[x]=Q,s.directionalShadowMatrix[x]=I.shadow.matrix,v++}s.directional[x]=Z,x++}else if(I.isSpotLight){let Z=e.get(I);Z.position.setFromMatrixPosition(I.matrixWorld),Z.color.copy(V).multiplyScalar(q*E),Z.distance=nt,Z.coneCos=Math.cos(I.angle),Z.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),Z.decay=I.decay,s.spot[m]=Z;let ct=I.shadow;if(I.map&&(s.spotLightMap[R]=I.map,R++,ct.updateMatrices(I),I.castShadow&&U++),s.spotLightMatrix[m]=ct.matrix,I.castShadow){let ht=i.get(I);ht.shadowBias=ct.bias,ht.shadowNormalBias=ct.normalBias,ht.shadowRadius=ct.radius,ht.shadowMapSize=ct.mapSize,s.spotShadow[m]=ht,s.spotShadowMap[m]=Q,b++}m++}else if(I.isRectAreaLight){let Z=e.get(I);Z.color.copy(V).multiplyScalar(q),Z.halfWidth.set(I.width*.5,0,0),Z.halfHeight.set(0,I.height*.5,0),s.rectArea[y]=Z,y++}else if(I.isPointLight){let Z=e.get(I);if(Z.color.copy(I.color).multiplyScalar(I.intensity*E),Z.distance=I.distance,Z.decay=I.decay,I.castShadow){let ct=I.shadow,ht=i.get(I);ht.shadowBias=ct.bias,ht.shadowNormalBias=ct.normalBias,ht.shadowRadius=ct.radius,ht.shadowMapSize=ct.mapSize,ht.shadowCameraNear=ct.camera.near,ht.shadowCameraFar=ct.camera.far,s.pointShadow[p]=ht,s.pointShadowMap[p]=Q,s.pointShadowMatrix[p]=I.shadow.matrix,S++}s.point[p]=Z,p++}else if(I.isHemisphereLight){let Z=e.get(I);Z.skyColor.copy(I.color).multiplyScalar(q*E),Z.groundColor.copy(I.groundColor).multiplyScalar(q*E),s.hemi[_]=Z,_++}}y>0&&(t.isWebGL2?n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=yt.LTC_FLOAT_1,s.rectAreaLTC2=yt.LTC_FLOAT_2):(s.rectAreaLTC1=yt.LTC_HALF_1,s.rectAreaLTC2=yt.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=yt.LTC_FLOAT_1,s.rectAreaLTC2=yt.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=yt.LTC_HALF_1,s.rectAreaLTC2=yt.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=h,s.ambient[1]=f,s.ambient[2]=g;let z=s.hash;(z.directionalLength!==x||z.pointLength!==p||z.spotLength!==m||z.rectAreaLength!==y||z.hemiLength!==_||z.numDirectionalShadows!==v||z.numPointShadows!==S||z.numSpotShadows!==b||z.numSpotMaps!==R||z.numLightProbes!==M)&&(s.directional.length=x,s.spot.length=m,s.rectArea.length=y,s.point.length=p,s.hemi.length=_,s.directionalShadow.length=v,s.directionalShadowMap.length=v,s.pointShadow.length=S,s.pointShadowMap.length=S,s.spotShadow.length=b,s.spotShadowMap.length=b,s.directionalShadowMatrix.length=v,s.pointShadowMatrix.length=S,s.spotLightMatrix.length=b+R-U,s.spotLightMap.length=R,s.numSpotLightShadowsWithMaps=U,s.numLightProbes=M,z.directionalLength=x,z.pointLength=p,z.spotLength=m,z.rectAreaLength=y,z.hemiLength=_,z.numDirectionalShadows=v,z.numPointShadows=S,z.numSpotShadows=b,z.numSpotMaps=R,z.numLightProbes=M,s.version=Bm++)}function c(u,d){let h=0,f=0,g=0,x=0,p=0,m=d.matrixWorldInverse;for(let y=0,_=u.length;y<_;y++){let v=u[y];if(v.isDirectionalLight){let S=s.directional[h];S.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),h++}else if(v.isSpotLight){let S=s.spot[g];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(m),g++}else if(v.isRectAreaLight){let S=s.rectArea[x];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(m),a.identity(),o.copy(v.matrixWorld),o.premultiply(m),a.extractRotation(o),S.halfWidth.set(v.width*.5,0,0),S.halfHeight.set(0,v.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),x++}else if(v.isPointLight){let S=s.point[f];S.position.setFromMatrixPosition(v.matrixWorld),S.position.applyMatrix4(m),f++}else if(v.isHemisphereLight){let S=s.hemi[p];S.direction.setFromMatrixPosition(v.matrixWorld),S.direction.transformDirection(m),p++}}}return{setup:l,setupView:c,state:s}}function Kc(n,t){let e=new Gm(n,t),i=[],s=[];function r(){i.length=0,s.length=0}function o(d){i.push(d)}function a(d){s.push(d)}function l(d){e.setup(i,d)}function c(d){e.setupView(i,d)}return{init:r,state:{lightsArray:i,shadowsArray:s,lights:e},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function Vm(n,t){let e=new WeakMap;function i(r,o=0){let a=e.get(r),l;return a===void 0?(l=new Kc(n,t),e.set(r,[l])):o>=a.length?(l=new Kc(n,t),a.push(l)):l=a[o],l}function s(){e=new WeakMap}return{get:i,dispose:s}}var Ia=class extends Oi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ku,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Da=class extends Oi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},Wm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Xm=`uniform sampler2D shadow_pass;
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
}`;function qm(n,t,e){let i=new Rs,s=new xt,r=new xt,o=new xe,a=new Ia({depthPacking:$u}),l=new Da,c={},u=e.maxTextureSize,d={[ki]:Xe,[Xe]:ki,[oe]:oe},h=new Ke({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new xt},radius:{value:4}},vertexShader:Wm,fragmentShader:Xm}),f=h.clone();f.defines.HORIZONTAL_PASS=1;let g=new we;g.setAttribute("position",new Ce(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new $(g,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ph;let m=this.type;this.render=function(b,R,U){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||b.length===0)return;let M=n.getRenderTarget(),E=n.getActiveCubeFace(),z=n.getActiveMipmapLevel(),Y=n.state;Y.setBlending(Mi),Y.buffers.color.setClear(1,1,1,1),Y.buffers.depth.setTest(!0),Y.setScissorTest(!1);let it=m!==Di&&this.type===Di,I=m===Di&&this.type!==Di;for(let V=0,q=b.length;V<q;V++){let nt=b[V],Q=nt.shadow;if(Q===void 0){console.warn("THREE.WebGLShadowMap:",nt,"has no shadow.");continue}if(Q.autoUpdate===!1&&Q.needsUpdate===!1)continue;s.copy(Q.mapSize);let Z=Q.getFrameExtents();if(s.multiply(Z),r.copy(Q.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/Z.x),s.x=r.x*Z.x,Q.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/Z.y),s.y=r.y*Z.y,Q.mapSize.y=r.y)),Q.map===null||it===!0||I===!0){let ht=this.type!==Di?{minFilter:ke,magFilter:ke}:{};Q.map!==null&&Q.map.dispose(),Q.map=new _i(s.x,s.y,ht),Q.map.texture.name=nt.name+".shadowMap",Q.camera.updateProjectionMatrix()}n.setRenderTarget(Q.map),n.clear();let ct=Q.getViewportCount();for(let ht=0;ht<ct;ht++){let et=Q.getViewport(ht);o.set(r.x*et.x,r.y*et.y,r.x*et.z,r.y*et.w),Y.viewport(o),Q.updateMatrices(nt,ht),i=Q.getFrustum(),v(R,U,Q.camera,nt,this.type)}Q.isPointLightShadow!==!0&&this.type===Di&&y(Q,U),Q.needsUpdate=!1}m=this.type,p.needsUpdate=!1,n.setRenderTarget(M,E,z)};function y(b,R){let U=t.update(x);h.defines.VSM_SAMPLES!==b.blurSamples&&(h.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new _i(s.x,s.y)),h.uniforms.shadow_pass.value=b.map.texture,h.uniforms.resolution.value=b.mapSize,h.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(R,null,U,h,x,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(R,null,U,f,x,null)}function _(b,R,U,M){let E=null,z=U.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(z!==void 0)E=z;else if(E=U.isPointLight===!0?l:a,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){let Y=E.uuid,it=R.uuid,I=c[Y];I===void 0&&(I={},c[Y]=I);let V=I[it];V===void 0&&(V=E.clone(),I[it]=V,R.addEventListener("dispose",S)),E=V}if(E.visible=R.visible,E.wireframe=R.wireframe,M===Di?E.side=R.shadowSide!==null?R.shadowSide:R.side:E.side=R.shadowSide!==null?R.shadowSide:d[R.side],E.alphaMap=R.alphaMap,E.alphaTest=R.alphaTest,E.map=R.map,E.clipShadows=R.clipShadows,E.clippingPlanes=R.clippingPlanes,E.clipIntersection=R.clipIntersection,E.displacementMap=R.displacementMap,E.displacementScale=R.displacementScale,E.displacementBias=R.displacementBias,E.wireframeLinewidth=R.wireframeLinewidth,E.linewidth=R.linewidth,U.isPointLight===!0&&E.isMeshDistanceMaterial===!0){let Y=n.properties.get(E);Y.light=U}return E}function v(b,R,U,M,E){if(b.visible===!1)return;if(b.layers.test(R.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&E===Di)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,b.matrixWorld);let it=t.update(b),I=b.material;if(Array.isArray(I)){let V=it.groups;for(let q=0,nt=V.length;q<nt;q++){let Q=V[q],Z=I[Q.materialIndex];if(Z&&Z.visible){let ct=_(b,Z,M,E);b.onBeforeShadow(n,b,R,U,it,ct,Q),n.renderBufferDirect(U,null,it,ct,b,Q),b.onAfterShadow(n,b,R,U,it,ct,Q)}}}else if(I.visible){let V=_(b,I,M,E);b.onBeforeShadow(n,b,R,U,it,V,null),n.renderBufferDirect(U,null,it,V,b,null),b.onAfterShadow(n,b,R,U,it,V,null)}}let Y=b.children;for(let it=0,I=Y.length;it<I;it++)v(Y[it],R,U,M,E)}function S(b){b.target.removeEventListener("dispose",S);for(let U in c){let M=c[U],E=b.target.uuid;E in M&&(M[E].dispose(),delete M[E])}}}function Ym(n,t,e){let i=e.isWebGL2;function s(){let k=!1,Et=new xe,H=null,j=new xe(0,0,0,0);return{setMask:function(At){H!==At&&!k&&(n.colorMask(At,At,At,At),H=At)},setLocked:function(At){k=At},setClear:function(At,se,he,De,qe){qe===!0&&(At*=De,se*=De,he*=De),Et.set(At,se,he,De),j.equals(Et)===!1&&(n.clearColor(At,se,he,De),j.copy(Et))},reset:function(){k=!1,H=null,j.set(-1,0,0,0)}}}function r(){let k=!1,Et=null,H=null,j=null;return{setTest:function(At){At?Ft(n.DEPTH_TEST):P(n.DEPTH_TEST)},setMask:function(At){Et!==At&&!k&&(n.depthMask(At),Et=At)},setFunc:function(At){if(H!==At){switch(At){case Au:n.depthFunc(n.NEVER);break;case Ru:n.depthFunc(n.ALWAYS);break;case Cu:n.depthFunc(n.LESS);break;case Sr:n.depthFunc(n.LEQUAL);break;case Pu:n.depthFunc(n.EQUAL);break;case Lu:n.depthFunc(n.GEQUAL);break;case Iu:n.depthFunc(n.GREATER);break;case Du:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}H=At}},setLocked:function(At){k=At},setClear:function(At){j!==At&&(n.clearDepth(At),j=At)},reset:function(){k=!1,Et=null,H=null,j=null}}}function o(){let k=!1,Et=null,H=null,j=null,At=null,se=null,he=null,De=null,qe=null;return{setTest:function(ue){k||(ue?Ft(n.STENCIL_TEST):P(n.STENCIL_TEST))},setMask:function(ue){Et!==ue&&!k&&(n.stencilMask(ue),Et=ue)},setFunc:function(ue,Ye,vi){(H!==ue||j!==Ye||At!==vi)&&(n.stencilFunc(ue,Ye,vi),H=ue,j=Ye,At=vi)},setOp:function(ue,Ye,vi){(se!==ue||he!==Ye||De!==vi)&&(n.stencilOp(ue,Ye,vi),se=ue,he=Ye,De=vi)},setLocked:function(ue){k=ue},setClear:function(ue){qe!==ue&&(n.clearStencil(ue),qe=ue)},reset:function(){k=!1,Et=null,H=null,j=null,At=null,se=null,he=null,De=null,qe=null}}}let a=new s,l=new r,c=new o,u=new WeakMap,d=new WeakMap,h={},f={},g=new WeakMap,x=[],p=null,m=!1,y=null,_=null,v=null,S=null,b=null,R=null,U=null,M=new qt(0,0,0),E=0,z=!1,Y=null,it=null,I=null,V=null,q=null,nt=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Q=!1,Z=0,ct=n.getParameter(n.VERSION);ct.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(ct)[1]),Q=Z>=1):ct.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(ct)[1]),Q=Z>=2);let ht=null,et={},F=n.getParameter(n.SCISSOR_BOX),st=n.getParameter(n.VIEWPORT),ft=new xe().fromArray(F),mt=new xe().fromArray(st);function vt(k,Et,H,j){let At=new Uint8Array(4),se=n.createTexture();n.bindTexture(k,se),n.texParameteri(k,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(k,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let he=0;he<H;he++)i&&(k===n.TEXTURE_3D||k===n.TEXTURE_2D_ARRAY)?n.texImage3D(Et,0,n.RGBA,1,1,j,0,n.RGBA,n.UNSIGNED_BYTE,At):n.texImage2D(Et+he,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,At);return se}let Ut={};Ut[n.TEXTURE_2D]=vt(n.TEXTURE_2D,n.TEXTURE_2D,1),Ut[n.TEXTURE_CUBE_MAP]=vt(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(Ut[n.TEXTURE_2D_ARRAY]=vt(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Ut[n.TEXTURE_3D]=vt(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Ft(n.DEPTH_TEST),l.setFunc(Sr),bt(!1),A(Pl),Ft(n.CULL_FACE),B(Mi);function Ft(k){h[k]!==!0&&(n.enable(k),h[k]=!0)}function P(k){h[k]!==!1&&(n.disable(k),h[k]=!1)}function D(k,Et){return f[k]!==Et?(n.bindFramebuffer(k,Et),f[k]=Et,i&&(k===n.DRAW_FRAMEBUFFER&&(f[n.FRAMEBUFFER]=Et),k===n.FRAMEBUFFER&&(f[n.DRAW_FRAMEBUFFER]=Et)),!0):!1}function T(k,Et){let H=x,j=!1;if(k)if(H=g.get(Et),H===void 0&&(H=[],g.set(Et,H)),k.isWebGLMultipleRenderTargets){let At=k.texture;if(H.length!==At.length||H[0]!==n.COLOR_ATTACHMENT0){for(let se=0,he=At.length;se<he;se++)H[se]=n.COLOR_ATTACHMENT0+se;H.length=At.length,j=!0}}else H[0]!==n.COLOR_ATTACHMENT0&&(H[0]=n.COLOR_ATTACHMENT0,j=!0);else H[0]!==n.BACK&&(H[0]=n.BACK,j=!0);j&&(e.isWebGL2?n.drawBuffers(H):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(H))}function O(k){return p!==k?(n.useProgram(k),p=k,!0):!1}let N={[ln]:n.FUNC_ADD,[du]:n.FUNC_SUBTRACT,[fu]:n.FUNC_REVERSE_SUBTRACT};if(i)N[Dl]=n.MIN,N[Ul]=n.MAX;else{let k=t.get("EXT_blend_minmax");k!==null&&(N[Dl]=k.MIN_EXT,N[Ul]=k.MAX_EXT)}let X={[pu]:n.ZERO,[mu]:n.ONE,[gu]:n.SRC_COLOR,[ma]:n.SRC_ALPHA,[Mu]:n.SRC_ALPHA_SATURATE,[vu]:n.DST_COLOR,[xu]:n.DST_ALPHA,[_u]:n.ONE_MINUS_SRC_COLOR,[ga]:n.ONE_MINUS_SRC_ALPHA,[bu]:n.ONE_MINUS_DST_COLOR,[yu]:n.ONE_MINUS_DST_ALPHA,[Eu]:n.CONSTANT_COLOR,[wu]:n.ONE_MINUS_CONSTANT_COLOR,[Su]:n.CONSTANT_ALPHA,[Tu]:n.ONE_MINUS_CONSTANT_ALPHA};function B(k,Et,H,j,At,se,he,De,qe,ue){if(k===Mi){m===!0&&(P(n.BLEND),m=!1);return}if(m===!1&&(Ft(n.BLEND),m=!0),k!==uu){if(k!==y||ue!==z){if((_!==ln||b!==ln)&&(n.blendEquation(n.FUNC_ADD),_=ln,b=ln),ue)switch(k){case Yn:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case As:n.blendFunc(n.ONE,n.ONE);break;case Ll:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Il:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case Yn:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case As:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Ll:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Il:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}v=null,S=null,R=null,U=null,M.set(0,0,0),E=0,y=k,z=ue}return}At=At||Et,se=se||H,he=he||j,(Et!==_||At!==b)&&(n.blendEquationSeparate(N[Et],N[At]),_=Et,b=At),(H!==v||j!==S||se!==R||he!==U)&&(n.blendFuncSeparate(X[H],X[j],X[se],X[he]),v=H,S=j,R=se,U=he),(De.equals(M)===!1||qe!==E)&&(n.blendColor(De.r,De.g,De.b,qe),M.copy(De),E=qe),y=k,z=!1}function gt(k,Et){k.side===oe?P(n.CULL_FACE):Ft(n.CULL_FACE);let H=k.side===Xe;Et&&(H=!H),bt(H),k.blending===Yn&&k.transparent===!1?B(Mi):B(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),l.setFunc(k.depthFunc),l.setTest(k.depthTest),l.setMask(k.depthWrite),a.setMask(k.colorWrite);let j=k.stencilWrite;c.setTest(j),j&&(c.setMask(k.stencilWriteMask),c.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),c.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),G(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?Ft(n.SAMPLE_ALPHA_TO_COVERAGE):P(n.SAMPLE_ALPHA_TO_COVERAGE)}function bt(k){Y!==k&&(k?n.frontFace(n.CW):n.frontFace(n.CCW),Y=k)}function A(k){k!==lu?(Ft(n.CULL_FACE),k!==it&&(k===Pl?n.cullFace(n.BACK):k===cu?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):P(n.CULL_FACE),it=k}function w(k){k!==I&&(Q&&n.lineWidth(k),I=k)}function G(k,Et,H){k?(Ft(n.POLYGON_OFFSET_FILL),(V!==Et||q!==H)&&(n.polygonOffset(Et,H),V=Et,q=H)):P(n.POLYGON_OFFSET_FILL)}function lt(k){k?Ft(n.SCISSOR_TEST):P(n.SCISSOR_TEST)}function at(k){k===void 0&&(k=n.TEXTURE0+nt-1),ht!==k&&(n.activeTexture(k),ht=k)}function rt(k,Et,H){H===void 0&&(ht===null?H=n.TEXTURE0+nt-1:H=ht);let j=et[H];j===void 0&&(j={type:void 0,texture:void 0},et[H]=j),(j.type!==k||j.texture!==Et)&&(ht!==H&&(n.activeTexture(H),ht=H),n.bindTexture(k,Et||Ut[k]),j.type=k,j.texture=Et)}function Ct(){let k=et[ht];k!==void 0&&k.type!==void 0&&(n.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function Mt(){try{n.compressedTexImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function St(){try{n.compressedTexImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Dt(){try{n.texSubImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Bt(){try{n.texSubImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ut(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ie(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Yt(){try{n.texStorage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function kt(){try{n.texStorage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Nt(){try{n.texImage2D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Pt(){try{n.texImage3D.apply(n,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ht(k){ft.equals(k)===!1&&(n.scissor(k.x,k.y,k.z,k.w),ft.copy(k))}function ne(k){mt.equals(k)===!1&&(n.viewport(k.x,k.y,k.z,k.w),mt.copy(k))}function de(k,Et){let H=d.get(Et);H===void 0&&(H=new WeakMap,d.set(Et,H));let j=H.get(k);j===void 0&&(j=n.getUniformBlockIndex(Et,k.name),H.set(k,j))}function Gt(k,Et){let j=d.get(Et).get(k);u.get(Et)!==j&&(n.uniformBlockBinding(Et,j,k.__bindingPointIndex),u.set(Et,j))}function _t(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},ht=null,et={},f={},g=new WeakMap,x=[],p=null,m=!1,y=null,_=null,v=null,S=null,b=null,R=null,U=null,M=new qt(0,0,0),E=0,z=!1,Y=null,it=null,I=null,V=null,q=null,ft.set(0,0,n.canvas.width,n.canvas.height),mt.set(0,0,n.canvas.width,n.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:Ft,disable:P,bindFramebuffer:D,drawBuffers:T,useProgram:O,setBlending:B,setMaterial:gt,setFlipSided:bt,setCullFace:A,setLineWidth:w,setPolygonOffset:G,setScissorTest:lt,activeTexture:at,bindTexture:rt,unbindTexture:Ct,compressedTexImage2D:Mt,compressedTexImage3D:St,texImage2D:Nt,texImage3D:Pt,updateUBOMapping:de,uniformBlockBinding:Gt,texStorage2D:Yt,texStorage3D:kt,texSubImage2D:Dt,texSubImage3D:Bt,compressedTexSubImage2D:ut,compressedTexSubImage3D:ie,scissor:Ht,viewport:ne,reset:_t}}function Zm(n,t,e,i,s,r,o){let a=s.isWebGL2,l=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new WeakMap,d,h=new WeakMap,f=!1;try{f=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(A){}function g(A,w){return f?new OffscreenCanvas(A,w):Dr("canvas")}function x(A,w,G,lt){let at=1;if((A.width>lt||A.height>lt)&&(at=lt/Math.max(A.width,A.height)),at<1||w===!0)if(typeof HTMLImageElement!="undefined"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&A instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&A instanceof ImageBitmap){let rt=w?ba:Math.floor,Ct=rt(at*A.width),Mt=rt(at*A.height);d===void 0&&(d=g(Ct,Mt));let St=G?g(Ct,Mt):d;return St.width=Ct,St.height=Mt,St.getContext("2d").drawImage(A,0,0,Ct,Mt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+A.width+"x"+A.height+") to ("+Ct+"x"+Mt+")."),St}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+A.width+"x"+A.height+")."),A;return A}function p(A){return fc(A.width)&&fc(A.height)}function m(A){return a?!1:A.wrapS!==pi||A.wrapT!==pi||A.minFilter!==ke&&A.minFilter!==je}function y(A,w){return A.generateMipmaps&&w&&A.minFilter!==ke&&A.minFilter!==je}function _(A){n.generateMipmap(A)}function v(A,w,G,lt,at=!1){if(a===!1)return w;if(A!==null){if(n[A]!==void 0)return n[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let rt=w;if(w===n.RED&&(G===n.FLOAT&&(rt=n.R32F),G===n.HALF_FLOAT&&(rt=n.R16F),G===n.UNSIGNED_BYTE&&(rt=n.R8)),w===n.RED_INTEGER&&(G===n.UNSIGNED_BYTE&&(rt=n.R8UI),G===n.UNSIGNED_SHORT&&(rt=n.R16UI),G===n.UNSIGNED_INT&&(rt=n.R32UI),G===n.BYTE&&(rt=n.R8I),G===n.SHORT&&(rt=n.R16I),G===n.INT&&(rt=n.R32I)),w===n.RG&&(G===n.FLOAT&&(rt=n.RG32F),G===n.HALF_FLOAT&&(rt=n.RG16F),G===n.UNSIGNED_BYTE&&(rt=n.RG8)),w===n.RGBA){let Ct=at?Rr:le.getTransfer(lt);G===n.FLOAT&&(rt=n.RGBA32F),G===n.HALF_FLOAT&&(rt=n.RGBA16F),G===n.UNSIGNED_BYTE&&(rt=Ct===fe?n.SRGB8_ALPHA8:n.RGBA8),G===n.UNSIGNED_SHORT_4_4_4_4&&(rt=n.RGBA4),G===n.UNSIGNED_SHORT_5_5_5_1&&(rt=n.RGB5_A1)}return(rt===n.R16F||rt===n.R32F||rt===n.RG16F||rt===n.RG32F||rt===n.RGBA16F||rt===n.RGBA32F)&&t.get("EXT_color_buffer_float"),rt}function S(A,w,G){return y(A,G)===!0||A.isFramebufferTexture&&A.minFilter!==ke&&A.minFilter!==je?Math.log2(Math.max(w.width,w.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?w.mipmaps.length:1}function b(A){return A===ke||A===Nl||A===Io?n.NEAREST:n.LINEAR}function R(A){let w=A.target;w.removeEventListener("dispose",R),M(w),w.isVideoTexture&&u.delete(w)}function U(A){let w=A.target;w.removeEventListener("dispose",U),z(w)}function M(A){let w=i.get(A);if(w.__webglInit===void 0)return;let G=A.source,lt=h.get(G);if(lt){let at=lt[w.__cacheKey];at.usedTimes--,at.usedTimes===0&&E(A),Object.keys(lt).length===0&&h.delete(G)}i.remove(A)}function E(A){let w=i.get(A);n.deleteTexture(w.__webglTexture);let G=A.source,lt=h.get(G);delete lt[w.__cacheKey],o.memory.textures--}function z(A){let w=A.texture,G=i.get(A),lt=i.get(w);if(lt.__webglTexture!==void 0&&(n.deleteTexture(lt.__webglTexture),o.memory.textures--),A.depthTexture&&A.depthTexture.dispose(),A.isWebGLCubeRenderTarget)for(let at=0;at<6;at++){if(Array.isArray(G.__webglFramebuffer[at]))for(let rt=0;rt<G.__webglFramebuffer[at].length;rt++)n.deleteFramebuffer(G.__webglFramebuffer[at][rt]);else n.deleteFramebuffer(G.__webglFramebuffer[at]);G.__webglDepthbuffer&&n.deleteRenderbuffer(G.__webglDepthbuffer[at])}else{if(Array.isArray(G.__webglFramebuffer))for(let at=0;at<G.__webglFramebuffer.length;at++)n.deleteFramebuffer(G.__webglFramebuffer[at]);else n.deleteFramebuffer(G.__webglFramebuffer);if(G.__webglDepthbuffer&&n.deleteRenderbuffer(G.__webglDepthbuffer),G.__webglMultisampledFramebuffer&&n.deleteFramebuffer(G.__webglMultisampledFramebuffer),G.__webglColorRenderbuffer)for(let at=0;at<G.__webglColorRenderbuffer.length;at++)G.__webglColorRenderbuffer[at]&&n.deleteRenderbuffer(G.__webglColorRenderbuffer[at]);G.__webglDepthRenderbuffer&&n.deleteRenderbuffer(G.__webglDepthRenderbuffer)}if(A.isWebGLMultipleRenderTargets)for(let at=0,rt=w.length;at<rt;at++){let Ct=i.get(w[at]);Ct.__webglTexture&&(n.deleteTexture(Ct.__webglTexture),o.memory.textures--),i.remove(w[at])}i.remove(w),i.remove(A)}let Y=0;function it(){Y=0}function I(){let A=Y;return A>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),Y+=1,A}function V(A){let w=[];return w.push(A.wrapS),w.push(A.wrapT),w.push(A.wrapR||0),w.push(A.magFilter),w.push(A.minFilter),w.push(A.anisotropy),w.push(A.internalFormat),w.push(A.format),w.push(A.type),w.push(A.generateMipmaps),w.push(A.premultiplyAlpha),w.push(A.flipY),w.push(A.unpackAlignment),w.push(A.colorSpace),w.join()}function q(A,w){let G=i.get(A);if(A.isVideoTexture&&gt(A),A.isRenderTargetTexture===!1&&A.version>0&&G.__version!==A.version){let lt=A.image;if(lt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(lt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ft(G,A,w);return}}e.bindTexture(n.TEXTURE_2D,G.__webglTexture,n.TEXTURE0+w)}function nt(A,w){let G=i.get(A);if(A.version>0&&G.__version!==A.version){ft(G,A,w);return}e.bindTexture(n.TEXTURE_2D_ARRAY,G.__webglTexture,n.TEXTURE0+w)}function Q(A,w){let G=i.get(A);if(A.version>0&&G.__version!==A.version){ft(G,A,w);return}e.bindTexture(n.TEXTURE_3D,G.__webglTexture,n.TEXTURE0+w)}function Z(A,w){let G=i.get(A);if(A.version>0&&G.__version!==A.version){mt(G,A,w);return}e.bindTexture(n.TEXTURE_CUBE_MAP,G.__webglTexture,n.TEXTURE0+w)}let ct={[Ei]:n.REPEAT,[pi]:n.CLAMP_TO_EDGE,[ya]:n.MIRRORED_REPEAT},ht={[ke]:n.NEAREST,[Nl]:n.NEAREST_MIPMAP_NEAREST,[Io]:n.NEAREST_MIPMAP_LINEAR,[je]:n.LINEAR,[Hu]:n.LINEAR_MIPMAP_NEAREST,[gi]:n.LINEAR_MIPMAP_LINEAR},et={[Qu]:n.NEVER,[rd]:n.ALWAYS,[td]:n.LESS,[Th]:n.LEQUAL,[ed]:n.EQUAL,[sd]:n.GEQUAL,[id]:n.GREATER,[nd]:n.NOTEQUAL};function F(A,w,G){if(G?(n.texParameteri(A,n.TEXTURE_WRAP_S,ct[w.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,ct[w.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,ct[w.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,ht[w.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,ht[w.minFilter])):(n.texParameteri(A,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(A,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(w.wrapS!==pi||w.wrapT!==pi)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(A,n.TEXTURE_MAG_FILTER,b(w.magFilter)),n.texParameteri(A,n.TEXTURE_MIN_FILTER,b(w.minFilter)),w.minFilter!==ke&&w.minFilter!==je&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),w.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,et[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){let lt=t.get("EXT_texture_filter_anisotropic");if(w.magFilter===ke||w.minFilter!==Io&&w.minFilter!==gi||w.type===Zi&&t.has("OES_texture_float_linear")===!1||a===!1&&w.type===fn&&t.has("OES_texture_half_float_linear")===!1)return;(w.anisotropy>1||i.get(w).__currentAnisotropy)&&(n.texParameterf(A,lt.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,s.getMaxAnisotropy())),i.get(w).__currentAnisotropy=w.anisotropy)}}function st(A,w){let G=!1;A.__webglInit===void 0&&(A.__webglInit=!0,w.addEventListener("dispose",R));let lt=w.source,at=h.get(lt);at===void 0&&(at={},h.set(lt,at));let rt=V(w);if(rt!==A.__cacheKey){at[rt]===void 0&&(at[rt]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,G=!0),at[rt].usedTimes++;let Ct=at[A.__cacheKey];Ct!==void 0&&(at[A.__cacheKey].usedTimes--,Ct.usedTimes===0&&E(w)),A.__cacheKey=rt,A.__webglTexture=at[rt].texture}return G}function ft(A,w,G){let lt=n.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(lt=n.TEXTURE_2D_ARRAY),w.isData3DTexture&&(lt=n.TEXTURE_3D);let at=st(A,w),rt=w.source;e.bindTexture(lt,A.__webglTexture,n.TEXTURE0+G);let Ct=i.get(rt);if(rt.version!==Ct.__version||at===!0){e.activeTexture(n.TEXTURE0+G);let Mt=le.getPrimaries(le.workingColorSpace),St=w.colorSpace===ze?null:le.getPrimaries(w.colorSpace),Dt=w.colorSpace===ze||Mt===St?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,w.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,w.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Dt);let Bt=m(w)&&p(w.image)===!1,ut=x(w.image,Bt,!1,s.maxTextureSize);ut=bt(w,ut);let ie=p(ut)||a,Yt=r.convert(w.format,w.colorSpace),kt=r.convert(w.type),Nt=v(w.internalFormat,Yt,kt,w.colorSpace,w.isVideoTexture);F(lt,w,ie);let Pt,Ht=w.mipmaps,ne=a&&w.isVideoTexture!==!0&&Nt!==Eh,de=Ct.__version===void 0||at===!0,Gt=S(w,ut,ie);if(w.isDepthTexture)Nt=n.DEPTH_COMPONENT,a?w.type===Zi?Nt=n.DEPTH_COMPONENT32F:w.type===Yi?Nt=n.DEPTH_COMPONENT24:w.type===hn?Nt=n.DEPTH24_STENCIL8:Nt=n.DEPTH_COMPONENT16:w.type===Zi&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),w.format===un&&Nt===n.DEPTH_COMPONENT&&w.type!==rl&&w.type!==Yi&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),w.type=Yi,kt=r.convert(w.type)),w.format===jn&&Nt===n.DEPTH_COMPONENT&&(Nt=n.DEPTH_STENCIL,w.type!==hn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),w.type=hn,kt=r.convert(w.type))),de&&(ne?e.texStorage2D(n.TEXTURE_2D,1,Nt,ut.width,ut.height):e.texImage2D(n.TEXTURE_2D,0,Nt,ut.width,ut.height,0,Yt,kt,null));else if(w.isDataTexture)if(Ht.length>0&&ie){ne&&de&&e.texStorage2D(n.TEXTURE_2D,Gt,Nt,Ht[0].width,Ht[0].height);for(let _t=0,k=Ht.length;_t<k;_t++)Pt=Ht[_t],ne?e.texSubImage2D(n.TEXTURE_2D,_t,0,0,Pt.width,Pt.height,Yt,kt,Pt.data):e.texImage2D(n.TEXTURE_2D,_t,Nt,Pt.width,Pt.height,0,Yt,kt,Pt.data);w.generateMipmaps=!1}else ne?(de&&e.texStorage2D(n.TEXTURE_2D,Gt,Nt,ut.width,ut.height),e.texSubImage2D(n.TEXTURE_2D,0,0,0,ut.width,ut.height,Yt,kt,ut.data)):e.texImage2D(n.TEXTURE_2D,0,Nt,ut.width,ut.height,0,Yt,kt,ut.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){ne&&de&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Gt,Nt,Ht[0].width,Ht[0].height,ut.depth);for(let _t=0,k=Ht.length;_t<k;_t++)Pt=Ht[_t],w.format!==mi?Yt!==null?ne?e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,_t,0,0,0,Pt.width,Pt.height,ut.depth,Yt,Pt.data,0,0):e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,_t,Nt,Pt.width,Pt.height,ut.depth,0,Pt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ne?e.texSubImage3D(n.TEXTURE_2D_ARRAY,_t,0,0,0,Pt.width,Pt.height,ut.depth,Yt,kt,Pt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,_t,Nt,Pt.width,Pt.height,ut.depth,0,Yt,kt,Pt.data)}else{ne&&de&&e.texStorage2D(n.TEXTURE_2D,Gt,Nt,Ht[0].width,Ht[0].height);for(let _t=0,k=Ht.length;_t<k;_t++)Pt=Ht[_t],w.format!==mi?Yt!==null?ne?e.compressedTexSubImage2D(n.TEXTURE_2D,_t,0,0,Pt.width,Pt.height,Yt,Pt.data):e.compressedTexImage2D(n.TEXTURE_2D,_t,Nt,Pt.width,Pt.height,0,Pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ne?e.texSubImage2D(n.TEXTURE_2D,_t,0,0,Pt.width,Pt.height,Yt,kt,Pt.data):e.texImage2D(n.TEXTURE_2D,_t,Nt,Pt.width,Pt.height,0,Yt,kt,Pt.data)}else if(w.isDataArrayTexture)ne?(de&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Gt,Nt,ut.width,ut.height,ut.depth),e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ut.width,ut.height,ut.depth,Yt,kt,ut.data)):e.texImage3D(n.TEXTURE_2D_ARRAY,0,Nt,ut.width,ut.height,ut.depth,0,Yt,kt,ut.data);else if(w.isData3DTexture)ne?(de&&e.texStorage3D(n.TEXTURE_3D,Gt,Nt,ut.width,ut.height,ut.depth),e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ut.width,ut.height,ut.depth,Yt,kt,ut.data)):e.texImage3D(n.TEXTURE_3D,0,Nt,ut.width,ut.height,ut.depth,0,Yt,kt,ut.data);else if(w.isFramebufferTexture){if(de)if(ne)e.texStorage2D(n.TEXTURE_2D,Gt,Nt,ut.width,ut.height);else{let _t=ut.width,k=ut.height;for(let Et=0;Et<Gt;Et++)e.texImage2D(n.TEXTURE_2D,Et,Nt,_t,k,0,Yt,kt,null),_t>>=1,k>>=1}}else if(Ht.length>0&&ie){ne&&de&&e.texStorage2D(n.TEXTURE_2D,Gt,Nt,Ht[0].width,Ht[0].height);for(let _t=0,k=Ht.length;_t<k;_t++)Pt=Ht[_t],ne?e.texSubImage2D(n.TEXTURE_2D,_t,0,0,Yt,kt,Pt):e.texImage2D(n.TEXTURE_2D,_t,Nt,Yt,kt,Pt);w.generateMipmaps=!1}else ne?(de&&e.texStorage2D(n.TEXTURE_2D,Gt,Nt,ut.width,ut.height),e.texSubImage2D(n.TEXTURE_2D,0,0,0,Yt,kt,ut)):e.texImage2D(n.TEXTURE_2D,0,Nt,Yt,kt,ut);y(w,ie)&&_(lt),Ct.__version=rt.version,w.onUpdate&&w.onUpdate(w)}A.__version=w.version}function mt(A,w,G){if(w.image.length!==6)return;let lt=st(A,w),at=w.source;e.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+G);let rt=i.get(at);if(at.version!==rt.__version||lt===!0){e.activeTexture(n.TEXTURE0+G);let Ct=le.getPrimaries(le.workingColorSpace),Mt=w.colorSpace===ze?null:le.getPrimaries(w.colorSpace),St=w.colorSpace===ze||Ct===Mt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,w.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,w.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,St);let Dt=w.isCompressedTexture||w.image[0].isCompressedTexture,Bt=w.image[0]&&w.image[0].isDataTexture,ut=[];for(let _t=0;_t<6;_t++)!Dt&&!Bt?ut[_t]=x(w.image[_t],!1,!0,s.maxCubemapSize):ut[_t]=Bt?w.image[_t].image:w.image[_t],ut[_t]=bt(w,ut[_t]);let ie=ut[0],Yt=p(ie)||a,kt=r.convert(w.format,w.colorSpace),Nt=r.convert(w.type),Pt=v(w.internalFormat,kt,Nt,w.colorSpace),Ht=a&&w.isVideoTexture!==!0,ne=rt.__version===void 0||lt===!0,de=S(w,ie,Yt);F(n.TEXTURE_CUBE_MAP,w,Yt);let Gt;if(Dt){Ht&&ne&&e.texStorage2D(n.TEXTURE_CUBE_MAP,de,Pt,ie.width,ie.height);for(let _t=0;_t<6;_t++){Gt=ut[_t].mipmaps;for(let k=0;k<Gt.length;k++){let Et=Gt[k];w.format!==mi?kt!==null?Ht?e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_t,k,0,0,Et.width,Et.height,kt,Et.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_t,k,Pt,Et.width,Et.height,0,Et.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ht?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_t,k,0,0,Et.width,Et.height,kt,Nt,Et.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_t,k,Pt,Et.width,Et.height,0,kt,Nt,Et.data)}}}else{Gt=w.mipmaps,Ht&&ne&&(Gt.length>0&&de++,e.texStorage2D(n.TEXTURE_CUBE_MAP,de,Pt,ut[0].width,ut[0].height));for(let _t=0;_t<6;_t++)if(Bt){Ht?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,0,0,ut[_t].width,ut[_t].height,kt,Nt,ut[_t].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,Pt,ut[_t].width,ut[_t].height,0,kt,Nt,ut[_t].data);for(let k=0;k<Gt.length;k++){let H=Gt[k].image[_t].image;Ht?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_t,k+1,0,0,H.width,H.height,kt,Nt,H.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_t,k+1,Pt,H.width,H.height,0,kt,Nt,H.data)}}else{Ht?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,0,0,kt,Nt,ut[_t]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,Pt,kt,Nt,ut[_t]);for(let k=0;k<Gt.length;k++){let Et=Gt[k];Ht?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_t,k+1,0,0,kt,Nt,Et.image[_t]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+_t,k+1,Pt,kt,Nt,Et.image[_t])}}}y(w,Yt)&&_(n.TEXTURE_CUBE_MAP),rt.__version=at.version,w.onUpdate&&w.onUpdate(w)}A.__version=w.version}function vt(A,w,G,lt,at,rt){let Ct=r.convert(G.format,G.colorSpace),Mt=r.convert(G.type),St=v(G.internalFormat,Ct,Mt,G.colorSpace);if(!i.get(w).__hasExternalTextures){let Bt=Math.max(1,w.width>>rt),ut=Math.max(1,w.height>>rt);at===n.TEXTURE_3D||at===n.TEXTURE_2D_ARRAY?e.texImage3D(at,rt,St,Bt,ut,w.depth,0,Ct,Mt,null):e.texImage2D(at,rt,St,Bt,ut,0,Ct,Mt,null)}e.bindFramebuffer(n.FRAMEBUFFER,A),B(w)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,lt,at,i.get(G).__webglTexture,0,X(w)):(at===n.TEXTURE_2D||at>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&at<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,lt,at,i.get(G).__webglTexture,rt),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Ut(A,w,G){if(n.bindRenderbuffer(n.RENDERBUFFER,A),w.depthBuffer&&!w.stencilBuffer){let lt=a===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(G||B(w)){let at=w.depthTexture;at&&at.isDepthTexture&&(at.type===Zi?lt=n.DEPTH_COMPONENT32F:at.type===Yi&&(lt=n.DEPTH_COMPONENT24));let rt=X(w);B(w)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,rt,lt,w.width,w.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,rt,lt,w.width,w.height)}else n.renderbufferStorage(n.RENDERBUFFER,lt,w.width,w.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,A)}else if(w.depthBuffer&&w.stencilBuffer){let lt=X(w);G&&B(w)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,lt,n.DEPTH24_STENCIL8,w.width,w.height):B(w)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,lt,n.DEPTH24_STENCIL8,w.width,w.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,w.width,w.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,A)}else{let lt=w.isWebGLMultipleRenderTargets===!0?w.texture:[w.texture];for(let at=0;at<lt.length;at++){let rt=lt[at],Ct=r.convert(rt.format,rt.colorSpace),Mt=r.convert(rt.type),St=v(rt.internalFormat,Ct,Mt,rt.colorSpace),Dt=X(w);G&&B(w)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Dt,St,w.width,w.height):B(w)?l.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Dt,St,w.width,w.height):n.renderbufferStorage(n.RENDERBUFFER,St,w.width,w.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ft(A,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,A),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(w.depthTexture).__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),q(w.depthTexture,0);let lt=i.get(w.depthTexture).__webglTexture,at=X(w);if(w.depthTexture.format===un)B(w)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,lt,0,at):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,lt,0);else if(w.depthTexture.format===jn)B(w)?l.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,lt,0,at):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,lt,0);else throw new Error("Unknown depthTexture format")}function P(A){let w=i.get(A),G=A.isWebGLCubeRenderTarget===!0;if(A.depthTexture&&!w.__autoAllocateDepthBuffer){if(G)throw new Error("target.depthTexture not supported in Cube render targets");Ft(w.__webglFramebuffer,A)}else if(G){w.__webglDepthbuffer=[];for(let lt=0;lt<6;lt++)e.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer[lt]),w.__webglDepthbuffer[lt]=n.createRenderbuffer(),Ut(w.__webglDepthbuffer[lt],A,!1)}else e.bindFramebuffer(n.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer=n.createRenderbuffer(),Ut(w.__webglDepthbuffer,A,!1);e.bindFramebuffer(n.FRAMEBUFFER,null)}function D(A,w,G){let lt=i.get(A);w!==void 0&&vt(lt.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),G!==void 0&&P(A)}function T(A){let w=A.texture,G=i.get(A),lt=i.get(w);A.addEventListener("dispose",U),A.isWebGLMultipleRenderTargets!==!0&&(lt.__webglTexture===void 0&&(lt.__webglTexture=n.createTexture()),lt.__version=w.version,o.memory.textures++);let at=A.isWebGLCubeRenderTarget===!0,rt=A.isWebGLMultipleRenderTargets===!0,Ct=p(A)||a;if(at){G.__webglFramebuffer=[];for(let Mt=0;Mt<6;Mt++)if(a&&w.mipmaps&&w.mipmaps.length>0){G.__webglFramebuffer[Mt]=[];for(let St=0;St<w.mipmaps.length;St++)G.__webglFramebuffer[Mt][St]=n.createFramebuffer()}else G.__webglFramebuffer[Mt]=n.createFramebuffer()}else{if(a&&w.mipmaps&&w.mipmaps.length>0){G.__webglFramebuffer=[];for(let Mt=0;Mt<w.mipmaps.length;Mt++)G.__webglFramebuffer[Mt]=n.createFramebuffer()}else G.__webglFramebuffer=n.createFramebuffer();if(rt)if(s.drawBuffers){let Mt=A.texture;for(let St=0,Dt=Mt.length;St<Dt;St++){let Bt=i.get(Mt[St]);Bt.__webglTexture===void 0&&(Bt.__webglTexture=n.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&A.samples>0&&B(A)===!1){let Mt=rt?w:[w];G.__webglMultisampledFramebuffer=n.createFramebuffer(),G.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let St=0;St<Mt.length;St++){let Dt=Mt[St];G.__webglColorRenderbuffer[St]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,G.__webglColorRenderbuffer[St]);let Bt=r.convert(Dt.format,Dt.colorSpace),ut=r.convert(Dt.type),ie=v(Dt.internalFormat,Bt,ut,Dt.colorSpace,A.isXRRenderTarget===!0),Yt=X(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,Yt,ie,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+St,n.RENDERBUFFER,G.__webglColorRenderbuffer[St])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&(G.__webglDepthRenderbuffer=n.createRenderbuffer(),Ut(G.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(at){e.bindTexture(n.TEXTURE_CUBE_MAP,lt.__webglTexture),F(n.TEXTURE_CUBE_MAP,w,Ct);for(let Mt=0;Mt<6;Mt++)if(a&&w.mipmaps&&w.mipmaps.length>0)for(let St=0;St<w.mipmaps.length;St++)vt(G.__webglFramebuffer[Mt][St],A,w,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,St);else vt(G.__webglFramebuffer[Mt],A,w,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0);y(w,Ct)&&_(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(rt){let Mt=A.texture;for(let St=0,Dt=Mt.length;St<Dt;St++){let Bt=Mt[St],ut=i.get(Bt);e.bindTexture(n.TEXTURE_2D,ut.__webglTexture),F(n.TEXTURE_2D,Bt,Ct),vt(G.__webglFramebuffer,A,Bt,n.COLOR_ATTACHMENT0+St,n.TEXTURE_2D,0),y(Bt,Ct)&&_(n.TEXTURE_2D)}e.unbindTexture()}else{let Mt=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(a?Mt=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(Mt,lt.__webglTexture),F(Mt,w,Ct),a&&w.mipmaps&&w.mipmaps.length>0)for(let St=0;St<w.mipmaps.length;St++)vt(G.__webglFramebuffer[St],A,w,n.COLOR_ATTACHMENT0,Mt,St);else vt(G.__webglFramebuffer,A,w,n.COLOR_ATTACHMENT0,Mt,0);y(w,Ct)&&_(Mt),e.unbindTexture()}A.depthBuffer&&P(A)}function O(A){let w=p(A)||a,G=A.isWebGLMultipleRenderTargets===!0?A.texture:[A.texture];for(let lt=0,at=G.length;lt<at;lt++){let rt=G[lt];if(y(rt,w)){let Ct=A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,Mt=i.get(rt).__webglTexture;e.bindTexture(Ct,Mt),_(Ct),e.unbindTexture()}}}function N(A){if(a&&A.samples>0&&B(A)===!1){let w=A.isWebGLMultipleRenderTargets?A.texture:[A.texture],G=A.width,lt=A.height,at=n.COLOR_BUFFER_BIT,rt=[],Ct=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Mt=i.get(A),St=A.isWebGLMultipleRenderTargets===!0;if(St)for(let Dt=0;Dt<w.length;Dt++)e.bindFramebuffer(n.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Dt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,Mt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Dt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Mt.__webglFramebuffer);for(let Dt=0;Dt<w.length;Dt++){rt.push(n.COLOR_ATTACHMENT0+Dt),A.depthBuffer&&rt.push(Ct);let Bt=Mt.__ignoreDepthValues!==void 0?Mt.__ignoreDepthValues:!1;if(Bt===!1&&(A.depthBuffer&&(at|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&(at|=n.STENCIL_BUFFER_BIT)),St&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Mt.__webglColorRenderbuffer[Dt]),Bt===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[Ct]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[Ct])),St){let ut=i.get(w[Dt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ut,0)}n.blitFramebuffer(0,0,G,lt,0,0,G,lt,at,n.NEAREST),c&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,rt)}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),St)for(let Dt=0;Dt<w.length;Dt++){e.bindFramebuffer(n.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Dt,n.RENDERBUFFER,Mt.__webglColorRenderbuffer[Dt]);let Bt=i.get(w[Dt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,Mt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Dt,n.TEXTURE_2D,Bt,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer)}}function X(A){return Math.min(s.maxSamples,A.samples)}function B(A){let w=i.get(A);return a&&A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function gt(A){let w=o.render.frame;u.get(A)!==w&&(u.set(A,w),A.update())}function bt(A,w){let G=A.colorSpace,lt=A.format,at=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||A.format===va||G!==zi&&G!==ze&&(le.getTransfer(G)===fe?a===!1?t.has("EXT_sRGB")===!0&&lt===mi?(A.format=va,A.minFilter=je,A.generateMipmaps=!1):w=Ur.sRGBToLinear(w):(lt!==mi||at!==Ki)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",G)),w}this.allocateTextureUnit=I,this.resetTextureUnits=it,this.setTexture2D=q,this.setTexture2DArray=nt,this.setTexture3D=Q,this.setTextureCube=Z,this.rebindTextures=D,this.setupRenderTarget=T,this.updateRenderTargetMipmap=O,this.updateMultisampleRenderTarget=N,this.setupDepthRenderbuffer=P,this.setupFrameBufferTexture=vt,this.useMultisampledRTT=B}function Jm(n,t,e){let i=e.isWebGL2;function s(r,o=ze){let a,l=le.getTransfer(o);if(r===Ki)return n.UNSIGNED_BYTE;if(r===xh)return n.UNSIGNED_SHORT_4_4_4_4;if(r===yh)return n.UNSIGNED_SHORT_5_5_5_1;if(r===Gu)return n.BYTE;if(r===Vu)return n.SHORT;if(r===rl)return n.UNSIGNED_SHORT;if(r===_h)return n.INT;if(r===Yi)return n.UNSIGNED_INT;if(r===Zi)return n.FLOAT;if(r===fn)return i?n.HALF_FLOAT:(a=t.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===Wu)return n.ALPHA;if(r===mi)return n.RGBA;if(r===Xu)return n.LUMINANCE;if(r===qu)return n.LUMINANCE_ALPHA;if(r===un)return n.DEPTH_COMPONENT;if(r===jn)return n.DEPTH_STENCIL;if(r===va)return a=t.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===Yu)return n.RED;if(r===vh)return n.RED_INTEGER;if(r===Zu)return n.RG;if(r===bh)return n.RG_INTEGER;if(r===Mh)return n.RGBA_INTEGER;if(r===Do||r===Uo||r===No||r===ko)if(l===fe)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===Do)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Uo)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===No)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===ko)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===Do)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Uo)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===No)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===ko)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===kl||r===zl||r===Fl||r===Ol)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===kl)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===zl)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Fl)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Ol)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Eh)return a=t.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Bl||r===Hl)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(r===Bl)return l===fe?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===Hl)return l===fe?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Gl||r===Vl||r===Wl||r===Xl||r===ql||r===Yl||r===Zl||r===Jl||r===Kl||r===$l||r===jl||r===Ql||r===tc||r===ec)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(r===Gl)return l===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Vl)return l===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Wl)return l===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Xl)return l===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===ql)return l===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Yl)return l===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Zl)return l===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Jl)return l===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Kl)return l===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===$l)return l===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===jl)return l===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Ql)return l===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===tc)return l===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===ec)return l===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===zo||r===ic||r===nc)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(r===zo)return l===fe?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===ic)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===nc)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Ju||r===sc||r===rc||r===oc)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(r===zo)return a.COMPRESSED_RED_RGTC1_EXT;if(r===sc)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===rc)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===oc)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===hn?i?n.UNSIGNED_INT_24_8:(a=t.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):n[r]!==void 0?n[r]:null}return{convert:s}}var Ua=class extends Oe{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},Vt=class extends Ee{constructor(){super(),this.isGroup=!0,this.type="Group"}},Km={type:"move"},Es=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Vt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Vt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Vt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(let x of t.hand.values()){let p=e.getJointPose(x,i),m=this._getHandJoint(c,x);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}let u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,g=.005;c.inputState.pinching&&h>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Km)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new Vt;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},Na=class extends wi{constructor(t,e){super();let i=this,s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,h=null,f=null,g=null,x=e.getContextAttributes(),p=null,m=null,y=[],_=[],v=new xt,S=null,b=new Oe;b.layers.enable(1),b.viewport=new xe;let R=new Oe;R.layers.enable(2),R.viewport=new xe;let U=[b,R],M=new Ua;M.layers.enable(1),M.layers.enable(2);let E=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(F){let st=y[F];return st===void 0&&(st=new Es,y[F]=st),st.getTargetRaySpace()},this.getControllerGrip=function(F){let st=y[F];return st===void 0&&(st=new Es,y[F]=st),st.getGripSpace()},this.getHand=function(F){let st=y[F];return st===void 0&&(st=new Es,y[F]=st),st.getHandSpace()};function Y(F){let st=_.indexOf(F.inputSource);if(st===-1)return;let ft=y[st];ft!==void 0&&(ft.update(F.inputSource,F.frame,c||o),ft.dispatchEvent({type:F.type,data:F.inputSource}))}function it(){s.removeEventListener("select",Y),s.removeEventListener("selectstart",Y),s.removeEventListener("selectend",Y),s.removeEventListener("squeeze",Y),s.removeEventListener("squeezestart",Y),s.removeEventListener("squeezeend",Y),s.removeEventListener("end",it),s.removeEventListener("inputsourceschange",I);for(let F=0;F<y.length;F++){let st=_[F];st!==null&&(_[F]=null,y[F].disconnect(st))}E=null,z=null,t.setRenderTarget(p),f=null,h=null,d=null,s=null,m=null,et.stop(),i.isPresenting=!1,t.setPixelRatio(S),t.setSize(v.width,v.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(F){r=F,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(F){a=F,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(F){c=F},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(F){if(s=F,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",Y),s.addEventListener("selectstart",Y),s.addEventListener("selectend",Y),s.addEventListener("squeeze",Y),s.addEventListener("squeezestart",Y),s.addEventListener("squeezeend",Y),s.addEventListener("end",it),s.addEventListener("inputsourceschange",I),x.xrCompatible!==!0&&await e.makeXRCompatible(),S=t.getPixelRatio(),t.getSize(v),s.renderState.layers===void 0||t.capabilities.isWebGL2===!1){let st={antialias:s.renderState.layers===void 0?x.antialias:!0,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,st),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),m=new _i(f.framebufferWidth,f.framebufferHeight,{format:mi,type:Ki,colorSpace:t.outputColorSpace,stencilBuffer:x.stencil})}else{let st=null,ft=null,mt=null;x.depth&&(mt=x.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,st=x.stencil?jn:un,ft=x.stencil?hn:Yi);let vt={colorFormat:e.RGBA8,depthFormat:mt,scaleFactor:r};d=new XRWebGLBinding(s,e),h=d.createProjectionLayer(vt),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),m=new _i(h.textureWidth,h.textureHeight,{format:mi,type:Ki,depthTexture:new Vr(h.textureWidth,h.textureHeight,ft,void 0,void 0,void 0,void 0,void 0,void 0,st),stencilBuffer:x.stencil,colorSpace:t.outputColorSpace,samples:x.antialias?4:0});let Ut=t.properties.get(m);Ut.__ignoreDepthValues=h.ignoreDepthValues}m.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),et.setContext(s),et.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function I(F){for(let st=0;st<F.removed.length;st++){let ft=F.removed[st],mt=_.indexOf(ft);mt>=0&&(_[mt]=null,y[mt].disconnect(ft))}for(let st=0;st<F.added.length;st++){let ft=F.added[st],mt=_.indexOf(ft);if(mt===-1){for(let Ut=0;Ut<y.length;Ut++)if(Ut>=_.length){_.push(ft),mt=Ut;break}else if(_[Ut]===null){_[Ut]=ft,mt=Ut;break}if(mt===-1)break}let vt=y[mt];vt&&vt.connect(ft)}}let V=new L,q=new L;function nt(F,st,ft){V.setFromMatrixPosition(st.matrixWorld),q.setFromMatrixPosition(ft.matrixWorld);let mt=V.distanceTo(q),vt=st.projectionMatrix.elements,Ut=ft.projectionMatrix.elements,Ft=vt[14]/(vt[10]-1),P=vt[14]/(vt[10]+1),D=(vt[9]+1)/vt[5],T=(vt[9]-1)/vt[5],O=(vt[8]-1)/vt[0],N=(Ut[8]+1)/Ut[0],X=Ft*O,B=Ft*N,gt=mt/(-O+N),bt=gt*-O;st.matrixWorld.decompose(F.position,F.quaternion,F.scale),F.translateX(bt),F.translateZ(gt),F.matrixWorld.compose(F.position,F.quaternion,F.scale),F.matrixWorldInverse.copy(F.matrixWorld).invert();let A=Ft+gt,w=P+gt,G=X-bt,lt=B+(mt-bt),at=D*P/w*A,rt=T*P/w*A;F.projectionMatrix.makePerspective(G,lt,at,rt,A,w),F.projectionMatrixInverse.copy(F.projectionMatrix).invert()}function Q(F,st){st===null?F.matrixWorld.copy(F.matrix):F.matrixWorld.multiplyMatrices(st.matrixWorld,F.matrix),F.matrixWorldInverse.copy(F.matrixWorld).invert()}this.updateCamera=function(F){if(s===null)return;M.near=R.near=b.near=F.near,M.far=R.far=b.far=F.far,(E!==M.near||z!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),E=M.near,z=M.far);let st=F.parent,ft=M.cameras;Q(M,st);for(let mt=0;mt<ft.length;mt++)Q(ft[mt],st);ft.length===2?nt(M,b,R):M.projectionMatrix.copy(b.projectionMatrix),Z(F,M,st)};function Z(F,st,ft){ft===null?F.matrix.copy(st.matrixWorld):(F.matrix.copy(ft.matrixWorld),F.matrix.invert(),F.matrix.multiply(st.matrixWorld)),F.matrix.decompose(F.position,F.quaternion,F.scale),F.updateMatrixWorld(!0),F.projectionMatrix.copy(st.projectionMatrix),F.projectionMatrixInverse.copy(st.projectionMatrixInverse),F.isPerspectiveCamera&&(F.fov=Ir*2*Math.atan(1/F.projectionMatrix.elements[5]),F.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(F){l=F,h!==null&&(h.fixedFoveation=F),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=F)};let ct=null;function ht(F,st){if(u=st.getViewerPose(c||o),g=st,u!==null){let ft=u.views;f!==null&&(t.setRenderTargetFramebuffer(m,f.framebuffer),t.setRenderTarget(m));let mt=!1;ft.length!==M.cameras.length&&(M.cameras.length=0,mt=!0);for(let vt=0;vt<ft.length;vt++){let Ut=ft[vt],Ft=null;if(f!==null)Ft=f.getViewport(Ut);else{let D=d.getViewSubImage(h,Ut);Ft=D.viewport,vt===0&&(t.setRenderTargetTextures(m,D.colorTexture,h.ignoreDepthValues?void 0:D.depthStencilTexture),t.setRenderTarget(m))}let P=U[vt];P===void 0&&(P=new Oe,P.layers.enable(vt),P.viewport=new xe,U[vt]=P),P.matrix.fromArray(Ut.transform.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale),P.projectionMatrix.fromArray(Ut.projectionMatrix),P.projectionMatrixInverse.copy(P.projectionMatrix).invert(),P.viewport.set(Ft.x,Ft.y,Ft.width,Ft.height),vt===0&&(M.matrix.copy(P.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),mt===!0&&M.cameras.push(P)}}for(let ft=0;ft<y.length;ft++){let mt=_[ft],vt=y[ft];mt!==null&&vt!==void 0&&vt.update(mt,st,c||o)}ct&&ct(F,st),st.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:st}),g=null}let et=new Ph;et.setAnimationLoop(ht),this.setAnimationLoop=function(F){ct=F},this.dispose=function(){}}};function $m(n,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function i(p,m){m.color.getRGB(p.fogColor.value,Ch(n)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,y,_,v){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(p,m):m.isMeshToonMaterial?(r(p,m),d(p,m)):m.isMeshPhongMaterial?(r(p,m),u(p,m)):m.isMeshStandardMaterial?(r(p,m),h(p,m),m.isMeshPhysicalMaterial&&f(p,m,v)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),x(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?l(p,m,y,_):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Xe&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Xe&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);let y=t.get(m).envMap;if(y&&(p.envMap.value=y,p.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap){p.lightMap.value=m.lightMap;let _=n._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=m.lightMapIntensity*_,e(m.lightMap,p.lightMapTransform)}m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,y,_){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*y,p.scale.value=_*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function u(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function d(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function h(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),t.get(m).envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,y){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Xe&&p.clearcoatNormalScale.value.negate())),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=y.texture,p.transmissionSamplerSize.value.set(y.width,y.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function x(p,m){let y=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(y.matrixWorld),p.nearDistance.value=y.shadow.camera.near,p.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function jm(n,t,e,i){let s={},r={},o=[],a=e.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(y,_){let v=_.program;i.uniformBlockBinding(y,v)}function c(y,_){let v=s[y.id];v===void 0&&(g(y),v=u(y),s[y.id]=v,y.addEventListener("dispose",p));let S=_.program;i.updateUBOMapping(y,S);let b=t.render.frame;r[y.id]!==b&&(h(y),r[y.id]=b)}function u(y){let _=d();y.__bindingPointIndex=_;let v=n.createBuffer(),S=y.__size,b=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,v),n.bufferData(n.UNIFORM_BUFFER,S,b),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,_,v),v}function d(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(y){let _=s[y.id],v=y.uniforms,S=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,_);for(let b=0,R=v.length;b<R;b++){let U=Array.isArray(v[b])?v[b]:[v[b]];for(let M=0,E=U.length;M<E;M++){let z=U[M];if(f(z,b,M,S)===!0){let Y=z.__offset,it=Array.isArray(z.value)?z.value:[z.value],I=0;for(let V=0;V<it.length;V++){let q=it[V],nt=x(q);typeof q=="number"||typeof q=="boolean"?(z.__data[0]=q,n.bufferSubData(n.UNIFORM_BUFFER,Y+I,z.__data)):q.isMatrix3?(z.__data[0]=q.elements[0],z.__data[1]=q.elements[1],z.__data[2]=q.elements[2],z.__data[3]=0,z.__data[4]=q.elements[3],z.__data[5]=q.elements[4],z.__data[6]=q.elements[5],z.__data[7]=0,z.__data[8]=q.elements[6],z.__data[9]=q.elements[7],z.__data[10]=q.elements[8],z.__data[11]=0):(q.toArray(z.__data,I),I+=nt.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,Y,z.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(y,_,v,S){let b=y.value,R=_+"_"+v;if(S[R]===void 0)return typeof b=="number"||typeof b=="boolean"?S[R]=b:S[R]=b.clone(),!0;{let U=S[R];if(typeof b=="number"||typeof b=="boolean"){if(U!==b)return S[R]=b,!0}else if(U.equals(b)===!1)return U.copy(b),!0}return!1}function g(y){let _=y.uniforms,v=0,S=16;for(let R=0,U=_.length;R<U;R++){let M=Array.isArray(_[R])?_[R]:[_[R]];for(let E=0,z=M.length;E<z;E++){let Y=M[E],it=Array.isArray(Y.value)?Y.value:[Y.value];for(let I=0,V=it.length;I<V;I++){let q=it[I],nt=x(q),Q=v%S;Q!==0&&S-Q<nt.boundary&&(v+=S-Q),Y.__data=new Float32Array(nt.storage/Float32Array.BYTES_PER_ELEMENT),Y.__offset=v,v+=nt.storage}}}let b=v%S;return b>0&&(v+=S-b),y.__size=v,y.__cache={},this}function x(y){let _={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(_.boundary=4,_.storage=4):y.isVector2?(_.boundary=8,_.storage=8):y.isVector3||y.isColor?(_.boundary=16,_.storage=12):y.isVector4?(_.boundary=16,_.storage=16):y.isMatrix3?(_.boundary=48,_.storage=48):y.isMatrix4?(_.boundary=64,_.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),_}function p(y){let _=y.target;_.removeEventListener("dispose",p);let v=o.indexOf(_.__bindingPointIndex);o.splice(v,1),n.deleteBuffer(s[_.id]),delete s[_.id],delete r[_.id]}function m(){for(let y in s)n.deleteBuffer(s[y]);o=[],s={},r={}}return{bind:l,update:c,dispose:m}}var Cs=class{constructor(t={}){let{canvas:e=ad(),context:i=null,depth:s=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1}=t;this.isWebGLRenderer=!0;let h;i!==null?h=i.getContextAttributes().alpha:h=o;let f=new Uint32Array(4),g=new Int32Array(4),x=null,p=null,m=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=pe,this._useLegacyLights=!1,this.toneMapping=Ji,this.toneMappingExposure=1;let _=this,v=!1,S=0,b=0,R=null,U=-1,M=null,E=new xe,z=new xe,Y=null,it=new qt(0),I=0,V=e.width,q=e.height,nt=1,Q=null,Z=null,ct=new xe(0,0,V,q),ht=new xe(0,0,V,q),et=!1,F=new Rs,st=!1,ft=!1,mt=null,vt=new ce,Ut=new xt,Ft=new L,P={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function D(){return R===null?nt:1}let T=i;function O(C,W){for(let K=0;K<C.length;K++){let tt=C[K],J=e.getContext(tt,W);if(J!==null)return J}return null}try{let C={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine","three.js r160"),e.addEventListener("webglcontextlost",_t,!1),e.addEventListener("webglcontextrestored",k,!1),e.addEventListener("webglcontextcreationerror",Et,!1),T===null){let W=["webgl2","webgl","experimental-webgl"];if(_.isWebGL1Renderer===!0&&W.shift(),T=O(W,C),T===null)throw O(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext!="undefined"&&T instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),T.getShaderPrecisionFormat===void 0&&(T.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let N,X,B,gt,bt,A,w,G,lt,at,rt,Ct,Mt,St,Dt,Bt,ut,ie,Yt,kt,Nt,Pt,Ht,ne;function de(){N=new _0(T),X=new u0(T,N,t),N.init(X),Pt=new Jm(T,N,X),B=new Ym(T,N,X),gt=new v0(T),bt=new Nm,A=new Zm(T,N,B,bt,X,Pt,gt),w=new f0(_),G=new g0(_),lt=new Ad(T,X),Ht=new c0(T,N,lt,X),at=new x0(T,lt,gt,Ht),rt=new w0(T,at,lt,gt),Yt=new E0(T,X,A),Bt=new d0(bt),Ct=new Um(_,w,G,N,X,Ht,Bt),Mt=new $m(_,bt),St=new zm,Dt=new Vm(N,X),ie=new l0(_,w,G,B,rt,h,l),ut=new qm(_,rt,X),ne=new jm(T,gt,X,B),kt=new h0(T,N,gt,X),Nt=new y0(T,N,gt,X),gt.programs=Ct.programs,_.capabilities=X,_.extensions=N,_.properties=bt,_.renderLists=St,_.shadowMap=ut,_.state=B,_.info=gt}de();let Gt=new Na(_,T);this.xr=Gt,this.getContext=function(){return T},this.getContextAttributes=function(){return T.getContextAttributes()},this.forceContextLoss=function(){let C=N.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){let C=N.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return nt},this.setPixelRatio=function(C){C!==void 0&&(nt=C,this.setSize(V,q,!1))},this.getSize=function(C){return C.set(V,q)},this.setSize=function(C,W,K=!0){if(Gt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=C,q=W,e.width=Math.floor(C*nt),e.height=Math.floor(W*nt),K===!0&&(e.style.width=C+"px",e.style.height=W+"px"),this.setViewport(0,0,C,W)},this.getDrawingBufferSize=function(C){return C.set(V*nt,q*nt).floor()},this.setDrawingBufferSize=function(C,W,K){V=C,q=W,nt=K,e.width=Math.floor(C*K),e.height=Math.floor(W*K),this.setViewport(0,0,C,W)},this.getCurrentViewport=function(C){return C.copy(E)},this.getViewport=function(C){return C.copy(ct)},this.setViewport=function(C,W,K,tt){C.isVector4?ct.set(C.x,C.y,C.z,C.w):ct.set(C,W,K,tt),B.viewport(E.copy(ct).multiplyScalar(nt).floor())},this.getScissor=function(C){return C.copy(ht)},this.setScissor=function(C,W,K,tt){C.isVector4?ht.set(C.x,C.y,C.z,C.w):ht.set(C,W,K,tt),B.scissor(z.copy(ht).multiplyScalar(nt).floor())},this.getScissorTest=function(){return et},this.setScissorTest=function(C){B.setScissorTest(et=C)},this.setOpaqueSort=function(C){Q=C},this.setTransparentSort=function(C){Z=C},this.getClearColor=function(C){return C.copy(ie.getClearColor())},this.setClearColor=function(){ie.setClearColor.apply(ie,arguments)},this.getClearAlpha=function(){return ie.getClearAlpha()},this.setClearAlpha=function(){ie.setClearAlpha.apply(ie,arguments)},this.clear=function(C=!0,W=!0,K=!0){let tt=0;if(C){let J=!1;if(R!==null){let Rt=R.texture.format;J=Rt===Mh||Rt===bh||Rt===vh}if(J){let Rt=R.texture.type,It=Rt===Ki||Rt===Yi||Rt===rl||Rt===hn||Rt===xh||Rt===yh,zt=ie.getClearColor(),Ot=ie.getClearAlpha(),Jt=zt.r,Wt=zt.g,Xt=zt.b;It?(f[0]=Jt,f[1]=Wt,f[2]=Xt,f[3]=Ot,T.clearBufferuiv(T.COLOR,0,f)):(g[0]=Jt,g[1]=Wt,g[2]=Xt,g[3]=Ot,T.clearBufferiv(T.COLOR,0,g))}else tt|=T.COLOR_BUFFER_BIT}W&&(tt|=T.DEPTH_BUFFER_BIT),K&&(tt|=T.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),T.clear(tt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",_t,!1),e.removeEventListener("webglcontextrestored",k,!1),e.removeEventListener("webglcontextcreationerror",Et,!1),St.dispose(),Dt.dispose(),bt.dispose(),w.dispose(),G.dispose(),rt.dispose(),Ht.dispose(),ne.dispose(),Ct.dispose(),Gt.dispose(),Gt.removeEventListener("sessionstart",qe),Gt.removeEventListener("sessionend",ue),mt&&(mt.dispose(),mt=null),Ye.stop()};function _t(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),v=!0}function k(){console.log("THREE.WebGLRenderer: Context Restored."),v=!1;let C=gt.autoReset,W=ut.enabled,K=ut.autoUpdate,tt=ut.needsUpdate,J=ut.type;de(),gt.autoReset=C,ut.enabled=W,ut.autoUpdate=K,ut.needsUpdate=tt,ut.type=J}function Et(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function H(C){let W=C.target;W.removeEventListener("dispose",H),j(W)}function j(C){At(C),bt.remove(C)}function At(C){let W=bt.get(C).programs;W!==void 0&&(W.forEach(function(K){Ct.releaseProgram(K)}),C.isShaderMaterial&&Ct.releaseShaderCache(C))}this.renderBufferDirect=function(C,W,K,tt,J,Rt){W===null&&(W=P);let It=J.isMesh&&J.matrixWorld.determinant()<0,zt=su(C,W,K,tt,J);B.setMaterial(tt,It);let Ot=K.index,Jt=1;if(tt.wireframe===!0){if(Ot=at.getWireframeAttribute(K),Ot===void 0)return;Jt=2}let Wt=K.drawRange,Xt=K.attributes.position,Me=Wt.start*Jt,ei=(Wt.start+Wt.count)*Jt;Rt!==null&&(Me=Math.max(Me,Rt.start*Jt),ei=Math.min(ei,(Rt.start+Rt.count)*Jt)),Ot!==null?(Me=Math.max(Me,0),ei=Math.min(ei,Ot.count)):Xt!=null&&(Me=Math.max(Me,0),ei=Math.min(ei,Xt.count));let Ue=ei-Me;if(Ue<0||Ue===1/0)return;Ht.setup(J,tt,zt,K,Ot);let Ai,ye=kt;if(Ot!==null&&(Ai=lt.get(Ot),ye=Nt,ye.setIndex(Ai)),J.isMesh)tt.wireframe===!0?(B.setLineWidth(tt.wireframeLinewidth*D()),ye.setMode(T.LINES)):ye.setMode(T.TRIANGLES);else if(J.isLine){let Kt=tt.linewidth;Kt===void 0&&(Kt=1),B.setLineWidth(Kt*D()),J.isLineSegments?ye.setMode(T.LINES):J.isLineLoop?ye.setMode(T.LINE_LOOP):ye.setMode(T.LINE_STRIP)}else J.isPoints?ye.setMode(T.POINTS):J.isSprite&&ye.setMode(T.TRIANGLES);if(J.isBatchedMesh)ye.renderMultiDraw(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount);else if(J.isInstancedMesh)ye.renderInstances(Me,Ue,J.count);else if(K.isInstancedBufferGeometry){let Kt=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Ro=Math.min(K.instanceCount,Kt);ye.renderInstances(Me,Ue,Ro)}else ye.render(Me,Ue)};function se(C,W,K){C.transparent===!0&&C.side===oe&&C.forceSinglePass===!1?(C.side=Xe,C.needsUpdate=!0,Zs(C,W,K),C.side=ki,C.needsUpdate=!0,Zs(C,W,K),C.side=oe):Zs(C,W,K)}this.compile=function(C,W,K=null){K===null&&(K=C),p=Dt.get(K),p.init(),y.push(p),K.traverseVisible(function(J){J.isLight&&J.layers.test(W.layers)&&(p.pushLight(J),J.castShadow&&p.pushShadow(J))}),C!==K&&C.traverseVisible(function(J){J.isLight&&J.layers.test(W.layers)&&(p.pushLight(J),J.castShadow&&p.pushShadow(J))}),p.setupLights(_._useLegacyLights);let tt=new Set;return C.traverse(function(J){let Rt=J.material;if(Rt)if(Array.isArray(Rt))for(let It=0;It<Rt.length;It++){let zt=Rt[It];se(zt,K,J),tt.add(zt)}else se(Rt,K,J),tt.add(Rt)}),y.pop(),p=null,tt},this.compileAsync=function(C,W,K=null){let tt=this.compile(C,W,K);return new Promise(J=>{function Rt(){if(tt.forEach(function(It){bt.get(It).currentProgram.isReady()&&tt.delete(It)}),tt.size===0){J(C);return}setTimeout(Rt,10)}N.get("KHR_parallel_shader_compile")!==null?Rt():setTimeout(Rt,10)})};let he=null;function De(C){he&&he(C)}function qe(){Ye.stop()}function ue(){Ye.start()}let Ye=new Ph;Ye.setAnimationLoop(De),typeof self!="undefined"&&Ye.setContext(self),this.setAnimationLoop=function(C){he=C,Gt.setAnimationLoop(C),C===null?Ye.stop():Ye.start()},Gt.addEventListener("sessionstart",qe),Gt.addEventListener("sessionend",ue),this.render=function(C,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(v===!0)return;C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),Gt.enabled===!0&&Gt.isPresenting===!0&&(Gt.cameraAutoUpdate===!0&&Gt.updateCamera(W),W=Gt.getCamera()),C.isScene===!0&&C.onBeforeRender(_,C,W,R),p=Dt.get(C,y.length),p.init(),y.push(p),vt.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),F.setFromProjectionMatrix(vt),ft=this.localClippingEnabled,st=Bt.init(this.clippingPlanes,ft),x=St.get(C,m.length),x.init(),m.push(x),vi(C,W,0,_.sortObjects),x.finish(),_.sortObjects===!0&&x.sort(Q,Z),this.info.render.frame++,st===!0&&Bt.beginShadows();let K=p.state.shadowsArray;if(ut.render(K,C,W),st===!0&&Bt.endShadows(),this.info.autoReset===!0&&this.info.reset(),ie.render(x,C),p.setupLights(_._useLegacyLights),W.isArrayCamera){let tt=W.cameras;for(let J=0,Rt=tt.length;J<Rt;J++){let It=tt[J];wl(x,C,It,It.viewport)}}else wl(x,C,W);R!==null&&(A.updateMultisampleRenderTarget(R),A.updateRenderTargetMipmap(R)),C.isScene===!0&&C.onAfterRender(_,C,W),Ht.resetDefaultState(),U=-1,M=null,y.pop(),y.length>0?p=y[y.length-1]:p=null,m.pop(),m.length>0?x=m[m.length-1]:x=null};function vi(C,W,K,tt){if(C.visible===!1)return;if(C.layers.test(W.layers)){if(C.isGroup)K=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(W);else if(C.isLight)p.pushLight(C),C.castShadow&&p.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||F.intersectsSprite(C)){tt&&Ft.setFromMatrixPosition(C.matrixWorld).applyMatrix4(vt);let It=rt.update(C),zt=C.material;zt.visible&&x.push(C,It,zt,K,Ft.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||F.intersectsObject(C))){let It=rt.update(C),zt=C.material;if(tt&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Ft.copy(C.boundingSphere.center)):(It.boundingSphere===null&&It.computeBoundingSphere(),Ft.copy(It.boundingSphere.center)),Ft.applyMatrix4(C.matrixWorld).applyMatrix4(vt)),Array.isArray(zt)){let Ot=It.groups;for(let Jt=0,Wt=Ot.length;Jt<Wt;Jt++){let Xt=Ot[Jt],Me=zt[Xt.materialIndex];Me&&Me.visible&&x.push(C,It,Me,K,Ft.z,Xt)}}else zt.visible&&x.push(C,It,zt,K,Ft.z,null)}}let Rt=C.children;for(let It=0,zt=Rt.length;It<zt;It++)vi(Rt[It],W,K,tt)}function wl(C,W,K,tt){let J=C.opaque,Rt=C.transmissive,It=C.transparent;p.setupLightsView(K),st===!0&&Bt.setGlobalState(_.clippingPlanes,K),Rt.length>0&&nu(J,Rt,W,K),tt&&B.viewport(E.copy(tt)),J.length>0&&Ys(J,W,K),Rt.length>0&&Ys(Rt,W,K),It.length>0&&Ys(It,W,K),B.buffers.depth.setTest(!0),B.buffers.depth.setMask(!0),B.buffers.color.setMask(!0),B.setPolygonOffset(!1)}function nu(C,W,K,tt){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;let Rt=X.isWebGL2;mt===null&&(mt=new _i(1,1,{generateMipmaps:!0,type:N.has("EXT_color_buffer_half_float")?fn:Ki,minFilter:gi,samples:Rt?4:0})),_.getDrawingBufferSize(Ut),Rt?mt.setSize(Ut.x,Ut.y):mt.setSize(ba(Ut.x),ba(Ut.y));let It=_.getRenderTarget();_.setRenderTarget(mt),_.getClearColor(it),I=_.getClearAlpha(),I<1&&_.setClearColor(16777215,.5),_.clear();let zt=_.toneMapping;_.toneMapping=Ji,Ys(C,K,tt),A.updateMultisampleRenderTarget(mt),A.updateRenderTargetMipmap(mt);let Ot=!1;for(let Jt=0,Wt=W.length;Jt<Wt;Jt++){let Xt=W[Jt],Me=Xt.object,ei=Xt.geometry,Ue=Xt.material,Ai=Xt.group;if(Ue.side===oe&&Me.layers.test(tt.layers)){let ye=Ue.side;Ue.side=Xe,Ue.needsUpdate=!0,Sl(Me,K,tt,ei,Ue,Ai),Ue.side=ye,Ue.needsUpdate=!0,Ot=!0}}Ot===!0&&(A.updateMultisampleRenderTarget(mt),A.updateRenderTargetMipmap(mt)),_.setRenderTarget(It),_.setClearColor(it,I),_.toneMapping=zt}function Ys(C,W,K){let tt=W.isScene===!0?W.overrideMaterial:null;for(let J=0,Rt=C.length;J<Rt;J++){let It=C[J],zt=It.object,Ot=It.geometry,Jt=tt===null?It.material:tt,Wt=It.group;zt.layers.test(K.layers)&&Sl(zt,W,K,Ot,Jt,Wt)}}function Sl(C,W,K,tt,J,Rt){C.onBeforeRender(_,W,K,tt,J,Rt),C.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),J.onBeforeRender(_,W,K,tt,C,Rt),J.transparent===!0&&J.side===oe&&J.forceSinglePass===!1?(J.side=Xe,J.needsUpdate=!0,_.renderBufferDirect(K,W,tt,J,C,Rt),J.side=ki,J.needsUpdate=!0,_.renderBufferDirect(K,W,tt,J,C,Rt),J.side=oe):_.renderBufferDirect(K,W,tt,J,C,Rt),C.onAfterRender(_,W,K,tt,J,Rt)}function Zs(C,W,K){W.isScene!==!0&&(W=P);let tt=bt.get(C),J=p.state.lights,Rt=p.state.shadowsArray,It=J.state.version,zt=Ct.getParameters(C,J.state,Rt,W,K),Ot=Ct.getProgramCacheKey(zt),Jt=tt.programs;tt.environment=C.isMeshStandardMaterial?W.environment:null,tt.fog=W.fog,tt.envMap=(C.isMeshStandardMaterial?G:w).get(C.envMap||tt.environment),Jt===void 0&&(C.addEventListener("dispose",H),Jt=new Map,tt.programs=Jt);let Wt=Jt.get(Ot);if(Wt!==void 0){if(tt.currentProgram===Wt&&tt.lightsStateVersion===It)return Al(C,zt),Wt}else zt.uniforms=Ct.getUniforms(C),C.onBuild(K,zt,_),C.onBeforeCompile(zt,_),Wt=Ct.acquireProgram(zt,Ot),Jt.set(Ot,Wt),tt.uniforms=zt.uniforms;let Xt=tt.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Xt.clippingPlanes=Bt.uniform),Al(C,zt),tt.needsLights=ou(C),tt.lightsStateVersion=It,tt.needsLights&&(Xt.ambientLightColor.value=J.state.ambient,Xt.lightProbe.value=J.state.probe,Xt.directionalLights.value=J.state.directional,Xt.directionalLightShadows.value=J.state.directionalShadow,Xt.spotLights.value=J.state.spot,Xt.spotLightShadows.value=J.state.spotShadow,Xt.rectAreaLights.value=J.state.rectArea,Xt.ltc_1.value=J.state.rectAreaLTC1,Xt.ltc_2.value=J.state.rectAreaLTC2,Xt.pointLights.value=J.state.point,Xt.pointLightShadows.value=J.state.pointShadow,Xt.hemisphereLights.value=J.state.hemi,Xt.directionalShadowMap.value=J.state.directionalShadowMap,Xt.directionalShadowMatrix.value=J.state.directionalShadowMatrix,Xt.spotShadowMap.value=J.state.spotShadowMap,Xt.spotLightMatrix.value=J.state.spotLightMatrix,Xt.spotLightMap.value=J.state.spotLightMap,Xt.pointShadowMap.value=J.state.pointShadowMap,Xt.pointShadowMatrix.value=J.state.pointShadowMatrix),tt.currentProgram=Wt,tt.uniformsList=null,Wt}function Tl(C){if(C.uniformsList===null){let W=C.currentProgram.getUniforms();C.uniformsList=Jn.seqWithValue(W.seq,C.uniforms)}return C.uniformsList}function Al(C,W){let K=bt.get(C);K.outputColorSpace=W.outputColorSpace,K.batching=W.batching,K.instancing=W.instancing,K.instancingColor=W.instancingColor,K.skinning=W.skinning,K.morphTargets=W.morphTargets,K.morphNormals=W.morphNormals,K.morphColors=W.morphColors,K.morphTargetsCount=W.morphTargetsCount,K.numClippingPlanes=W.numClippingPlanes,K.numIntersection=W.numClipIntersection,K.vertexAlphas=W.vertexAlphas,K.vertexTangents=W.vertexTangents,K.toneMapping=W.toneMapping}function su(C,W,K,tt,J){W.isScene!==!0&&(W=P),A.resetTextureUnits();let Rt=W.fog,It=tt.isMeshStandardMaterial?W.environment:null,zt=R===null?_.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:zi,Ot=(tt.isMeshStandardMaterial?G:w).get(tt.envMap||It),Jt=tt.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,Wt=!!K.attributes.tangent&&(!!tt.normalMap||tt.anisotropy>0),Xt=!!K.morphAttributes.position,Me=!!K.morphAttributes.normal,ei=!!K.morphAttributes.color,Ue=Ji;tt.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(Ue=_.toneMapping);let Ai=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,ye=Ai!==void 0?Ai.length:0,Kt=bt.get(tt),Ro=p.state.lights;if(st===!0&&(ft===!0||C!==M)){let ri=C===M&&tt.id===U;Bt.setState(tt,C,ri)}let be=!1;tt.version===Kt.__version?(Kt.needsLights&&Kt.lightsStateVersion!==Ro.state.version||Kt.outputColorSpace!==zt||J.isBatchedMesh&&Kt.batching===!1||!J.isBatchedMesh&&Kt.batching===!0||J.isInstancedMesh&&Kt.instancing===!1||!J.isInstancedMesh&&Kt.instancing===!0||J.isSkinnedMesh&&Kt.skinning===!1||!J.isSkinnedMesh&&Kt.skinning===!0||J.isInstancedMesh&&Kt.instancingColor===!0&&J.instanceColor===null||J.isInstancedMesh&&Kt.instancingColor===!1&&J.instanceColor!==null||Kt.envMap!==Ot||tt.fog===!0&&Kt.fog!==Rt||Kt.numClippingPlanes!==void 0&&(Kt.numClippingPlanes!==Bt.numPlanes||Kt.numIntersection!==Bt.numIntersection)||Kt.vertexAlphas!==Jt||Kt.vertexTangents!==Wt||Kt.morphTargets!==Xt||Kt.morphNormals!==Me||Kt.morphColors!==ei||Kt.toneMapping!==Ue||X.isWebGL2===!0&&Kt.morphTargetsCount!==ye)&&(be=!0):(be=!0,Kt.__version=tt.version);let tn=Kt.currentProgram;be===!0&&(tn=Zs(tt,W,J));let Rl=!1,fs=!1,Co=!1,He=tn.getUniforms(),en=Kt.uniforms;if(B.useProgram(tn.program)&&(Rl=!0,fs=!0,Co=!0),tt.id!==U&&(U=tt.id,fs=!0),Rl||M!==C){He.setValue(T,"projectionMatrix",C.projectionMatrix),He.setValue(T,"viewMatrix",C.matrixWorldInverse);let ri=He.map.cameraPosition;ri!==void 0&&ri.setValue(T,Ft.setFromMatrixPosition(C.matrixWorld)),X.logarithmicDepthBuffer&&He.setValue(T,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(tt.isMeshPhongMaterial||tt.isMeshToonMaterial||tt.isMeshLambertMaterial||tt.isMeshBasicMaterial||tt.isMeshStandardMaterial||tt.isShaderMaterial)&&He.setValue(T,"isOrthographic",C.isOrthographicCamera===!0),M!==C&&(M=C,fs=!0,Co=!0)}if(J.isSkinnedMesh){He.setOptional(T,J,"bindMatrix"),He.setOptional(T,J,"bindMatrixInverse");let ri=J.skeleton;ri&&(X.floatVertexTextures?(ri.boneTexture===null&&ri.computeBoneTexture(),He.setValue(T,"boneTexture",ri.boneTexture,A)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}J.isBatchedMesh&&(He.setOptional(T,J,"batchingTexture"),He.setValue(T,"batchingTexture",J._matricesTexture,A));let Po=K.morphAttributes;if((Po.position!==void 0||Po.normal!==void 0||Po.color!==void 0&&X.isWebGL2===!0)&&Yt.update(J,K,tn),(fs||Kt.receiveShadow!==J.receiveShadow)&&(Kt.receiveShadow=J.receiveShadow,He.setValue(T,"receiveShadow",J.receiveShadow)),tt.isMeshGouraudMaterial&&tt.envMap!==null&&(en.envMap.value=Ot,en.flipEnvMap.value=Ot.isCubeTexture&&Ot.isRenderTargetTexture===!1?-1:1),fs&&(He.setValue(T,"toneMappingExposure",_.toneMappingExposure),Kt.needsLights&&ru(en,Co),Rt&&tt.fog===!0&&Mt.refreshFogUniforms(en,Rt),Mt.refreshMaterialUniforms(en,tt,nt,q,mt),Jn.upload(T,Tl(Kt),en,A)),tt.isShaderMaterial&&tt.uniformsNeedUpdate===!0&&(Jn.upload(T,Tl(Kt),en,A),tt.uniformsNeedUpdate=!1),tt.isSpriteMaterial&&He.setValue(T,"center",J.center),He.setValue(T,"modelViewMatrix",J.modelViewMatrix),He.setValue(T,"normalMatrix",J.normalMatrix),He.setValue(T,"modelMatrix",J.matrixWorld),tt.isShaderMaterial||tt.isRawShaderMaterial){let ri=tt.uniformsGroups;for(let Lo=0,au=ri.length;Lo<au;Lo++)if(X.isWebGL2){let Cl=ri[Lo];ne.update(Cl,tn),ne.bind(Cl,tn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return tn}function ru(C,W){C.ambientLightColor.needsUpdate=W,C.lightProbe.needsUpdate=W,C.directionalLights.needsUpdate=W,C.directionalLightShadows.needsUpdate=W,C.pointLights.needsUpdate=W,C.pointLightShadows.needsUpdate=W,C.spotLights.needsUpdate=W,C.spotLightShadows.needsUpdate=W,C.rectAreaLights.needsUpdate=W,C.hemisphereLights.needsUpdate=W}function ou(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return S},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(C,W,K){bt.get(C.texture).__webglTexture=W,bt.get(C.depthTexture).__webglTexture=K;let tt=bt.get(C);tt.__hasExternalTextures=!0,tt.__hasExternalTextures&&(tt.__autoAllocateDepthBuffer=K===void 0,tt.__autoAllocateDepthBuffer||N.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),tt.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(C,W){let K=bt.get(C);K.__webglFramebuffer=W,K.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(C,W=0,K=0){R=C,S=W,b=K;let tt=!0,J=null,Rt=!1,It=!1;if(C){let Ot=bt.get(C);Ot.__useDefaultFramebuffer!==void 0?(B.bindFramebuffer(T.FRAMEBUFFER,null),tt=!1):Ot.__webglFramebuffer===void 0?A.setupRenderTarget(C):Ot.__hasExternalTextures&&A.rebindTextures(C,bt.get(C.texture).__webglTexture,bt.get(C.depthTexture).__webglTexture);let Jt=C.texture;(Jt.isData3DTexture||Jt.isDataArrayTexture||Jt.isCompressedArrayTexture)&&(It=!0);let Wt=bt.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Wt[W])?J=Wt[W][K]:J=Wt[W],Rt=!0):X.isWebGL2&&C.samples>0&&A.useMultisampledRTT(C)===!1?J=bt.get(C).__webglMultisampledFramebuffer:Array.isArray(Wt)?J=Wt[K]:J=Wt,E.copy(C.viewport),z.copy(C.scissor),Y=C.scissorTest}else E.copy(ct).multiplyScalar(nt).floor(),z.copy(ht).multiplyScalar(nt).floor(),Y=et;if(B.bindFramebuffer(T.FRAMEBUFFER,J)&&X.drawBuffers&&tt&&B.drawBuffers(C,J),B.viewport(E),B.scissor(z),B.setScissorTest(Y),Rt){let Ot=bt.get(C.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_CUBE_MAP_POSITIVE_X+W,Ot.__webglTexture,K)}else if(It){let Ot=bt.get(C.texture),Jt=W||0;T.framebufferTextureLayer(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,Ot.__webglTexture,K||0,Jt)}U=-1},this.readRenderTargetPixels=function(C,W,K,tt,J,Rt,It){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let zt=bt.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&It!==void 0&&(zt=zt[It]),zt){B.bindFramebuffer(T.FRAMEBUFFER,zt);try{let Ot=C.texture,Jt=Ot.format,Wt=Ot.type;if(Jt!==mi&&Pt.convert(Jt)!==T.getParameter(T.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let Xt=Wt===fn&&(N.has("EXT_color_buffer_half_float")||X.isWebGL2&&N.has("EXT_color_buffer_float"));if(Wt!==Ki&&Pt.convert(Wt)!==T.getParameter(T.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Wt===Zi&&(X.isWebGL2||N.has("OES_texture_float")||N.has("WEBGL_color_buffer_float")))&&!Xt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=C.width-tt&&K>=0&&K<=C.height-J&&T.readPixels(W,K,tt,J,Pt.convert(Jt),Pt.convert(Wt),Rt)}finally{let Ot=R!==null?bt.get(R).__webglFramebuffer:null;B.bindFramebuffer(T.FRAMEBUFFER,Ot)}}},this.copyFramebufferToTexture=function(C,W,K=0){let tt=Math.pow(2,-K),J=Math.floor(W.image.width*tt),Rt=Math.floor(W.image.height*tt);A.setTexture2D(W,0),T.copyTexSubImage2D(T.TEXTURE_2D,K,0,0,C.x,C.y,J,Rt),B.unbindTexture()},this.copyTextureToTexture=function(C,W,K,tt=0){let J=W.image.width,Rt=W.image.height,It=Pt.convert(K.format),zt=Pt.convert(K.type);A.setTexture2D(K,0),T.pixelStorei(T.UNPACK_FLIP_Y_WEBGL,K.flipY),T.pixelStorei(T.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),T.pixelStorei(T.UNPACK_ALIGNMENT,K.unpackAlignment),W.isDataTexture?T.texSubImage2D(T.TEXTURE_2D,tt,C.x,C.y,J,Rt,It,zt,W.image.data):W.isCompressedTexture?T.compressedTexSubImage2D(T.TEXTURE_2D,tt,C.x,C.y,W.mipmaps[0].width,W.mipmaps[0].height,It,W.mipmaps[0].data):T.texSubImage2D(T.TEXTURE_2D,tt,C.x,C.y,It,zt,W.image),tt===0&&K.generateMipmaps&&T.generateMipmap(T.TEXTURE_2D),B.unbindTexture()},this.copyTextureToTexture3D=function(C,W,K,tt,J=0){if(_.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let Rt=C.max.x-C.min.x+1,It=C.max.y-C.min.y+1,zt=C.max.z-C.min.z+1,Ot=Pt.convert(tt.format),Jt=Pt.convert(tt.type),Wt;if(tt.isData3DTexture)A.setTexture3D(tt,0),Wt=T.TEXTURE_3D;else if(tt.isDataArrayTexture||tt.isCompressedArrayTexture)A.setTexture2DArray(tt,0),Wt=T.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}T.pixelStorei(T.UNPACK_FLIP_Y_WEBGL,tt.flipY),T.pixelStorei(T.UNPACK_PREMULTIPLY_ALPHA_WEBGL,tt.premultiplyAlpha),T.pixelStorei(T.UNPACK_ALIGNMENT,tt.unpackAlignment);let Xt=T.getParameter(T.UNPACK_ROW_LENGTH),Me=T.getParameter(T.UNPACK_IMAGE_HEIGHT),ei=T.getParameter(T.UNPACK_SKIP_PIXELS),Ue=T.getParameter(T.UNPACK_SKIP_ROWS),Ai=T.getParameter(T.UNPACK_SKIP_IMAGES),ye=K.isCompressedTexture?K.mipmaps[J]:K.image;T.pixelStorei(T.UNPACK_ROW_LENGTH,ye.width),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,ye.height),T.pixelStorei(T.UNPACK_SKIP_PIXELS,C.min.x),T.pixelStorei(T.UNPACK_SKIP_ROWS,C.min.y),T.pixelStorei(T.UNPACK_SKIP_IMAGES,C.min.z),K.isDataTexture||K.isData3DTexture?T.texSubImage3D(Wt,J,W.x,W.y,W.z,Rt,It,zt,Ot,Jt,ye.data):K.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),T.compressedTexSubImage3D(Wt,J,W.x,W.y,W.z,Rt,It,zt,Ot,ye.data)):T.texSubImage3D(Wt,J,W.x,W.y,W.z,Rt,It,zt,Ot,Jt,ye),T.pixelStorei(T.UNPACK_ROW_LENGTH,Xt),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,Me),T.pixelStorei(T.UNPACK_SKIP_PIXELS,ei),T.pixelStorei(T.UNPACK_SKIP_ROWS,Ue),T.pixelStorei(T.UNPACK_SKIP_IMAGES,Ai),J===0&&tt.generateMipmaps&&T.generateMipmap(Wt),B.unbindTexture()},this.initTexture=function(C){C.isCubeTexture?A.setTextureCube(C,0):C.isData3DTexture?A.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?A.setTexture2DArray(C,0):A.setTexture2D(C,0),B.unbindTexture()},this.resetState=function(){S=0,b=0,R=null,B.reset(),Ht.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ni}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=t===ol?"display-p3":"srgb",e.unpackColorSpace=le.workingColorSpace===co?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===pe?dn:wh}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===dn?pe:zi}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}},ka=class extends Cs{};ka.prototype.isWebGL1Renderer=!0;var Wr=class n{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new qt(t),this.density=e}clone(){return new n(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}};var Xr=class extends Ee{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}};var qr=class extends Ce{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Gn=new ce,$c=new ce,_r=[],jc=new si,Qm=new ce,ys=new $,vs=new Fi,Yr=class extends ${constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new qr(new Float32Array(i*16),16),this.instanceColor=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,Qm)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new si),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Gn),jc.copy(t.boundingBox).applyMatrix4(Gn),this.boundingBox.union(jc)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Fi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Gn),vs.copy(t.boundingSphere).applyMatrix4(Gn),this.boundingSphere.union(vs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}raycast(t,e){let i=this.matrixWorld,s=this.count;if(ys.geometry=this.geometry,ys.material=this.material,ys.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),vs.copy(this.boundingSphere),vs.applyMatrix4(i),t.ray.intersectsSphere(vs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Gn),$c.multiplyMatrices(i,Gn),ys.matrixWorld=$c,ys.raycast(t,_r);for(let o=0,a=_r.length;o<a;o++){let l=_r[o];l.instanceId=r,l.object=this,e.push(l)}_r.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new qr(new Float32Array(this.instanceMatrix.count*3),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}};var Ps=class extends Oi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new qt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Qc=new L,th=new L,eh=new ce,ca=new pn,xr=new Fi,za=class extends Ee{constructor(t=new we,e=new Ps){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)Qc.fromBufferAttribute(e,s-1),th.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Qc.distanceTo(th);t.setAttribute("lineDistance",new re(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),xr.copy(i.boundingSphere),xr.applyMatrix4(s),xr.radius+=r,t.ray.intersectsSphere(xr)===!1)return;eh.copy(s).invert(),ca.copy(t.ray).applyMatrix4(eh);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new L,u=new L,d=new L,h=new L,f=this.isLineSegments?2:1,g=i.index,p=i.attributes.position;if(g!==null){let m=Math.max(0,o.start),y=Math.min(g.count,o.start+o.count);for(let _=m,v=y-1;_<v;_+=f){let S=g.getX(_),b=g.getX(_+1);if(c.fromBufferAttribute(p,S),u.fromBufferAttribute(p,b),ca.distanceSqToSegment(c,u,h,d)>l)continue;h.applyMatrix4(this.matrixWorld);let U=t.ray.origin.distanceTo(h);U<t.near||U>t.far||e.push({distance:U,point:d.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}else{let m=Math.max(0,o.start),y=Math.min(p.count,o.start+o.count);for(let _=m,v=y-1;_<v;_+=f){if(c.fromBufferAttribute(p,_),u.fromBufferAttribute(p,_+1),ca.distanceSqToSegment(c,u,h,d)>l)continue;h.applyMatrix4(this.matrixWorld);let b=t.ray.origin.distanceTo(h);b<t.near||b>t.far||e.push({distance:b,point:d.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}},ih=new L,nh=new L,Zr=class extends za{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)ih.fromBufferAttribute(e,s),nh.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+ih.distanceTo(nh);t.setAttribute("lineDistance",new re(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Ls=class extends Oi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new qt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},sh=new ce,Fa=new pn,yr=new Fi,vr=new L,Jr=class extends Ee{constructor(t=new we,e=new Ls){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),yr.copy(i.boundingSphere),yr.applyMatrix4(s),yr.radius+=r,t.ray.intersectsSphere(yr)===!1)return;sh.copy(s).invert(),Fa.copy(t.ray).applyMatrix4(sh);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,d=i.attributes.position;if(c!==null){let h=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=h,x=f;g<x;g++){let p=c.getX(g);vr.fromBufferAttribute(d,p),rh(vr,p,l,s,t,e,this)}}else{let h=Math.max(0,o.start),f=Math.min(d.count,o.start+o.count);for(let g=h,x=f;g<x;g++)vr.fromBufferAttribute(d,g),rh(vr,g,l,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};function rh(n,t,e,i,s,r,o){let a=Fa.distanceSqToPoint(n);if(a<e){let l=new L;Fa.closestPointToPoint(n,l),l.applyMatrix4(i);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,object:o})}}var li=class extends ai{constructor(t,e,i,s,r,o,a,l,c){super(t,e,i,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},ci=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],i,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let i=this.getLengths(),s=0,r=i.length,o;e?o=e:o=t*i[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=i[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===o)return s/(r-1);let u=i[s],h=i[s+1]-u,f=(o-u)/h;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new xt:new L);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){let i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){let i=new L,s=[],r=[],o=[],a=new L,l=new ce;for(let f=0;f<=t;f++){let g=f/t;s[f]=this.getTangentAt(g,new L)}r[0]=new L,o[0]=new L;let c=Number.MAX_VALUE,u=Math.abs(s[0].x),d=Math.abs(s[0].y),h=Math.abs(s[0].z);u<=c&&(c=u,i.set(1,0,0)),d<=c&&(c=d,i.set(0,1,0)),h<=c&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(s[f-1],s[f]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(We(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(We(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],f*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Is=class extends ci{constructor(t=0,e=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e){let i=e||new xt,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),h=l-this.aX,f=c-this.aY;l=h*u-f*d+this.aX,c=h*d+f*u+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Oa=class extends Is{constructor(t,e,i,s,r,o){super(t,e,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function cl(){let n=0,t=0,e=0,i=0;function s(r,o,a,l){n=r,t=a,e=-3*r+3*o-2*a-l,i=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,u,d){let h=(o-r)/c-(a-r)/(c+u)+(a-o)/u,f=(a-o)/u-(l-o)/(u+d)+(l-a)/d;h*=u,f*=u,s(o,a,h,f)},calc:function(r){let o=r*r,a=o*r;return n+t*r+e*o+i*a}}}var br=new L,ha=new cl,ua=new cl,da=new cl,Ds=class extends ci{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new L){let i=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,u;this.closed||a>0?c=s[(a-1)%r]:(br.subVectors(s[0],s[1]).add(s[0]),c=br);let d=s[a%r],h=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(br.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=br),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(d),f),x=Math.pow(d.distanceToSquared(h),f),p=Math.pow(h.distanceToSquared(u),f);x<1e-4&&(x=1),g<1e-4&&(g=x),p<1e-4&&(p=x),ha.initNonuniformCatmullRom(c.x,d.x,h.x,u.x,g,x,p),ua.initNonuniformCatmullRom(c.y,d.y,h.y,u.y,g,x,p),da.initNonuniformCatmullRom(c.z,d.z,h.z,u.z,g,x,p)}else this.curveType==="catmullrom"&&(ha.initCatmullRom(c.x,d.x,h.x,u.x,this.tension),ua.initCatmullRom(c.y,d.y,h.y,u.y,this.tension),da.initCatmullRom(c.z,d.z,h.z,u.z,this.tension));return i.set(ha.calc(l),ua.calc(l),da.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new L().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function oh(n,t,e,i,s){let r=(i-t)*.5,o=(s-e)*.5,a=n*n,l=n*a;return(2*e-2*i+r+o)*l+(-3*e+3*i-2*r-o)*a+r*n+e}function tg(n,t){let e=1-n;return e*e*t}function eg(n,t){return 2*(1-n)*n*t}function ig(n,t){return n*n*t}function ws(n,t,e,i){return tg(n,t)+eg(n,e)+ig(n,i)}function ng(n,t){let e=1-n;return e*e*e*t}function sg(n,t){let e=1-n;return 3*e*e*n*t}function rg(n,t){return 3*(1-n)*n*n*t}function og(n,t){return n*n*n*t}function Ss(n,t,e,i,s){return ng(n,t)+sg(n,e)+rg(n,i)+og(n,s)}var Kr=class extends ci{constructor(t=new xt,e=new xt,i=new xt,s=new xt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new xt){let i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(Ss(t,s.x,r.x,o.x,a.x),Ss(t,s.y,r.y,o.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ba=class extends ci{constructor(t=new L,e=new L,i=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new L){let i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(Ss(t,s.x,r.x,o.x,a.x),Ss(t,s.y,r.y,o.y,a.y),Ss(t,s.z,r.z,o.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},$r=class extends ci{constructor(t=new xt,e=new xt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new xt){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new xt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ha=class extends ci{constructor(t=new L,e=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new L){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new L){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},jr=class extends ci{constructor(t=new xt,e=new xt,i=new xt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new xt){let i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(ws(t,s.x,r.x,o.x),ws(t,s.y,r.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Qr=class extends ci{constructor(t=new L,e=new L,i=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new L){let i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(ws(t,s.x,r.x,o.x),ws(t,s.y,r.y,o.y),ws(t,s.z,r.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},to=class extends ci{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new xt){let i=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],u=s[o>s.length-2?s.length-1:o+1],d=s[o>s.length-3?s.length-1:o+2];return i.set(oh(a,l.x,c.x,u.x,d.x),oh(a,l.y,c.y,u.y,d.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new xt().fromArray(s))}return this}},eo=Object.freeze({__proto__:null,ArcCurve:Oa,CatmullRomCurve3:Ds,CubicBezierCurve:Kr,CubicBezierCurve3:Ba,EllipseCurve:Is,LineCurve:$r,LineCurve3:Ha,QuadraticBezierCurve:jr,QuadraticBezierCurve3:Qr,SplineCurve:to}),Ga=class extends ci{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new eo[i](e,t))}return this}getPoint(t,e){let i=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=i){let o=s[r]-i,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],i;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){let u=l[c];i&&i.equals(u)||(e.push(u),i=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let s=t.curves[e];this.curves.push(new eo[s.type]().fromJSON(s))}return this}},io=class extends Ga{constructor(t){super(),this.type="Path",this.currentPoint=new xt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let i=new $r(this.currentPoint.clone(),new xt(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){let r=new jr(this.currentPoint.clone(),new xt(t,e),new xt(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,o){let a=new Kr(this.currentPoint.clone(),new xt(t,e),new xt(i,s),new xt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),i=new to(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,i,s,r,o),this}absarc(t,e,i,s,r,o){return this.absellipse(t,e,i,i,s,r,o),this}ellipse(t,e,i,s,r,o,a,l){let c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+c,e+u,i,s,r,o,a,l),this}absellipse(t,e,i,s,r,o,a,l){let c=new Is(t,e,i,s,r,o,a,l);if(this.curves.length>0){let d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);let u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}};var Bi=class n extends we{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);let r=[],o=[],a=[],l=[],c=new L,u=new xt;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,h=3;d<=e;d++,h+=3){let f=i+d/e*s;c.x=t*Math.cos(f),c.y=t*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[h]/t+1)/2,u.y=(o[h+1]/t+1)/2,l.push(u.x,u.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new re(o,3)),this.setAttribute("normal",new re(a,3)),this.setAttribute("uv",new re(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Tt=class n extends we{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let u=[],d=[],h=[],f=[],g=0,x=[],p=i/2,m=0;y(),o===!1&&(t>0&&_(!0),e>0&&_(!1)),this.setIndex(u),this.setAttribute("position",new re(d,3)),this.setAttribute("normal",new re(h,3)),this.setAttribute("uv",new re(f,2));function y(){let v=new L,S=new L,b=0,R=(e-t)/i;for(let U=0;U<=r;U++){let M=[],E=U/r,z=E*(e-t)+t;for(let Y=0;Y<=s;Y++){let it=Y/s,I=it*l+a,V=Math.sin(I),q=Math.cos(I);S.x=z*V,S.y=-E*i+p,S.z=z*q,d.push(S.x,S.y,S.z),v.set(V,R,q).normalize(),h.push(v.x,v.y,v.z),f.push(it,1-E),M.push(g++)}x.push(M)}for(let U=0;U<s;U++)for(let M=0;M<r;M++){let E=x[M][U],z=x[M+1][U],Y=x[M+1][U+1],it=x[M][U+1];u.push(E,z,it),u.push(z,Y,it),b+=6}c.addGroup(m,b,0),m+=b}function _(v){let S=g,b=new xt,R=new L,U=0,M=v===!0?t:e,E=v===!0?1:-1;for(let Y=1;Y<=s;Y++)d.push(0,p*E,0),h.push(0,E,0),f.push(.5,.5),g++;let z=g;for(let Y=0;Y<=s;Y++){let I=Y/s*l+a,V=Math.cos(I),q=Math.sin(I);R.x=M*q,R.y=p*E,R.z=M*V,d.push(R.x,R.y,R.z),h.push(0,E,0),b.x=V*.5+.5,b.y=q*.5*E+.5,f.push(b.x,b.y),g++}for(let Y=0;Y<s;Y++){let it=S+Y,I=z+Y;v===!0?u.push(I,I+1,it):u.push(I+1,I,it),U+=3}c.addGroup(m,U,v===!0?1:2),m+=U}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},mn=class n extends Tt{constructor(t=1,e=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new n(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var gn=class extends io{constructor(t){super(t),this.uuid=rs(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let s=t.holes[e];this.holes.push(new io().fromJSON(s))}return this}},ag={triangulate:function(n,t,e=2){let i=t&&t.length,s=i?t[0]*e:n.length,r=kh(n,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,l,c,u,d,h,f;if(i&&(r=dg(n,t,r,e)),n.length>80*e){a=c=n[0],l=u=n[1];for(let g=e;g<s;g+=e)d=n[g],h=n[g+1],d<a&&(a=d),h<l&&(l=h),d>c&&(c=d),h>u&&(u=h);f=Math.max(c-a,u-l),f=f!==0?32767/f:0}return Us(r,o,e,a,l,f,0),o}};function kh(n,t,e,i,s){let r,o;if(s===Eg(n,t,e,i)>0)for(r=t;r<e;r+=i)o=ah(r,n[r],n[r+1],o);else for(r=e-i;r>=t;r-=i)o=ah(r,n[r],n[r+1],o);return o&&uo(o,o.next)&&(ks(o),o=o.next),o}function _n(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(uo(e,e.next)||ve(e.prev,e,e.next)===0)){if(ks(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function Us(n,t,e,i,s,r,o){if(!n)return;!o&&r&&_g(n,i,s,r);let a=n,l,c;for(;n.prev!==n.next;){if(l=n.prev,c=n.next,r?cg(n,i,s,r):lg(n)){t.push(l.i/e|0),t.push(n.i/e|0),t.push(c.i/e|0),ks(n),n=c.next,a=c.next;continue}if(n=c,n===a){o?o===1?(n=hg(_n(n),t,e),Us(n,t,e,i,s,r,2)):o===2&&ug(n,t,e,i,s,r):Us(_n(n),t,e,i,s,r,1);break}}}function lg(n){let t=n.prev,e=n,i=n.next;if(ve(t,e,i)>=0)return!1;let s=t.x,r=e.x,o=i.x,a=t.y,l=e.y,c=i.y,u=s<r?s<o?s:o:r<o?r:o,d=a<l?a<c?a:c:l<c?l:c,h=s>r?s>o?s:o:r>o?r:o,f=a>l?a>c?a:c:l>c?l:c,g=i.next;for(;g!==t;){if(g.x>=u&&g.x<=h&&g.y>=d&&g.y<=f&&qn(s,a,r,l,o,c,g.x,g.y)&&ve(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function cg(n,t,e,i){let s=n.prev,r=n,o=n.next;if(ve(s,r,o)>=0)return!1;let a=s.x,l=r.x,c=o.x,u=s.y,d=r.y,h=o.y,f=a<l?a<c?a:c:l<c?l:c,g=u<d?u<h?u:h:d<h?d:h,x=a>l?a>c?a:c:l>c?l:c,p=u>d?u>h?u:h:d>h?d:h,m=Va(f,g,t,e,i),y=Va(x,p,t,e,i),_=n.prevZ,v=n.nextZ;for(;_&&_.z>=m&&v&&v.z<=y;){if(_.x>=f&&_.x<=x&&_.y>=g&&_.y<=p&&_!==s&&_!==o&&qn(a,u,l,d,c,h,_.x,_.y)&&ve(_.prev,_,_.next)>=0||(_=_.prevZ,v.x>=f&&v.x<=x&&v.y>=g&&v.y<=p&&v!==s&&v!==o&&qn(a,u,l,d,c,h,v.x,v.y)&&ve(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;_&&_.z>=m;){if(_.x>=f&&_.x<=x&&_.y>=g&&_.y<=p&&_!==s&&_!==o&&qn(a,u,l,d,c,h,_.x,_.y)&&ve(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;v&&v.z<=y;){if(v.x>=f&&v.x<=x&&v.y>=g&&v.y<=p&&v!==s&&v!==o&&qn(a,u,l,d,c,h,v.x,v.y)&&ve(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function hg(n,t,e){let i=n;do{let s=i.prev,r=i.next.next;!uo(s,r)&&zh(s,i,i.next,r)&&Ns(s,r)&&Ns(r,s)&&(t.push(s.i/e|0),t.push(i.i/e|0),t.push(r.i/e|0),ks(i),ks(i.next),i=n=r),i=i.next}while(i!==n);return _n(i)}function ug(n,t,e,i,s,r){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&vg(o,a)){let l=Fh(o,a);o=_n(o,o.next),l=_n(l,l.next),Us(o,t,e,i,s,r,0),Us(l,t,e,i,s,r,0);return}a=a.next}o=o.next}while(o!==n)}function dg(n,t,e,i){let s=[],r,o,a,l,c;for(r=0,o=t.length;r<o;r++)a=t[r]*i,l=r<o-1?t[r+1]*i:n.length,c=kh(n,a,l,i,!1),c===c.next&&(c.steiner=!0),s.push(yg(c));for(s.sort(fg),r=0;r<s.length;r++)e=pg(s[r],e);return e}function fg(n,t){return n.x-t.x}function pg(n,t){let e=mg(n,t);if(!e)return t;let i=Fh(e,n);return _n(i,i.next),_n(e,e.next)}function mg(n,t){let e=t,i=-1/0,s,r=n.x,o=n.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){let h=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(h<=r&&h>i&&(i=h,s=e.x<e.next.x?e:e.next,h===r))return s}e=e.next}while(e!==t);if(!s)return null;let a=s,l=s.x,c=s.y,u=1/0,d;e=s;do r>=e.x&&e.x>=l&&r!==e.x&&qn(o<c?r:i,o,l,c,o<c?i:r,o,e.x,e.y)&&(d=Math.abs(o-e.y)/(r-e.x),Ns(e,n)&&(d<u||d===u&&(e.x>s.x||e.x===s.x&&gg(s,e)))&&(s=e,u=d)),e=e.next;while(e!==a);return s}function gg(n,t){return ve(n.prev,n,t.prev)<0&&ve(t.next,n,n.next)<0}function _g(n,t,e,i){let s=n;do s.z===0&&(s.z=Va(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,xg(s)}function xg(n){let t,e,i,s,r,o,a,l,c=1;do{for(e=n,n=null,r=null,o=0;e;){for(o++,i=e,a=0,t=0;t<c&&(a++,i=i.nextZ,!!i);t++);for(l=c;a>0||l>0&&i;)a!==0&&(l===0||!i||e.z<=i.z)?(s=e,e=e.nextZ,a--):(s=i,i=i.nextZ,l--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;e=i}r.nextZ=null,c*=2}while(o>1);return n}function Va(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function yg(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function qn(n,t,e,i,s,r,o,a){return(s-o)*(t-a)>=(n-o)*(r-a)&&(n-o)*(i-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(i-a)}function vg(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!bg(n,t)&&(Ns(n,t)&&Ns(t,n)&&Mg(n,t)&&(ve(n.prev,n,t.prev)||ve(n,t.prev,t))||uo(n,t)&&ve(n.prev,n,n.next)>0&&ve(t.prev,t,t.next)>0)}function ve(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function uo(n,t){return n.x===t.x&&n.y===t.y}function zh(n,t,e,i){let s=Er(ve(n,t,e)),r=Er(ve(n,t,i)),o=Er(ve(e,i,n)),a=Er(ve(e,i,t));return!!(s!==r&&o!==a||s===0&&Mr(n,e,t)||r===0&&Mr(n,i,t)||o===0&&Mr(e,n,i)||a===0&&Mr(e,t,i))}function Mr(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function Er(n){return n>0?1:n<0?-1:0}function bg(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&zh(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function Ns(n,t){return ve(n.prev,n,n.next)<0?ve(n,t,n.next)>=0&&ve(n,n.prev,t)>=0:ve(n,t,n.prev)<0||ve(n,n.next,t)<0}function Mg(n,t){let e=n,i=!1,s=(n.x+t.x)/2,r=(n.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function Fh(n,t){let e=new Wa(n.i,n.x,n.y),i=new Wa(t.i,t.x,t.y),s=n.next,r=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function ah(n,t,e,i){let s=new Wa(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function ks(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Wa(n,t,e){this.i=n,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Eg(n,t,e,i){let s=0;for(let r=t,o=e-i;r<e;r+=i)s+=(n[o]-n[r])*(n[r+1]+n[o+1]),o=r;return s}var Ts=class n{static area(t){let e=t.length,i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return n.area(t)<0}static triangulateShape(t,e){let i=[],s=[],r=[];lh(t),ch(i,t);let o=t.length;e.forEach(lh);for(let l=0;l<e.length;l++)s.push(o),o+=e[l].length,ch(i,e[l]);let a=ag.triangulate(i,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}};function lh(n){let t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function ch(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}var is=class n extends we{constructor(t=new gn([new xt(.5,.5),new xt(-.5,.5),new xt(-.5,-.5),new xt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let i=this,s=[],r=[];for(let a=0,l=t.length;a<l;a++){let c=t[a];o(c)}this.setAttribute("position",new re(s,3)),this.setAttribute("uv",new re(r,2)),this.computeVertexNormals();function o(a){let l=[],c=e.curveSegments!==void 0?e.curveSegments:12,u=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1,h=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:f-.1,x=e.bevelOffset!==void 0?e.bevelOffset:0,p=e.bevelSegments!==void 0?e.bevelSegments:3,m=e.extrudePath,y=e.UVGenerator!==void 0?e.UVGenerator:wg,_,v=!1,S,b,R,U;m&&(_=m.getSpacedPoints(u),v=!0,h=!1,S=m.computeFrenetFrames(u,!1),b=new L,R=new L,U=new L),h||(p=0,f=0,g=0,x=0);let M=a.extractPoints(c),E=M.shape,z=M.holes;if(!Ts.isClockWise(E)){E=E.reverse();for(let T=0,O=z.length;T<O;T++){let N=z[T];Ts.isClockWise(N)&&(z[T]=N.reverse())}}let it=Ts.triangulateShape(E,z),I=E;for(let T=0,O=z.length;T<O;T++){let N=z[T];E=E.concat(N)}function V(T,O,N){return O||console.error("THREE.ExtrudeGeometry: vec does not exist"),T.clone().addScaledVector(O,N)}let q=E.length,nt=it.length;function Q(T,O,N){let X,B,gt,bt=T.x-O.x,A=T.y-O.y,w=N.x-T.x,G=N.y-T.y,lt=bt*bt+A*A,at=bt*G-A*w;if(Math.abs(at)>Number.EPSILON){let rt=Math.sqrt(lt),Ct=Math.sqrt(w*w+G*G),Mt=O.x-A/rt,St=O.y+bt/rt,Dt=N.x-G/Ct,Bt=N.y+w/Ct,ut=((Dt-Mt)*G-(Bt-St)*w)/(bt*G-A*w);X=Mt+bt*ut-T.x,B=St+A*ut-T.y;let ie=X*X+B*B;if(ie<=2)return new xt(X,B);gt=Math.sqrt(ie/2)}else{let rt=!1;bt>Number.EPSILON?w>Number.EPSILON&&(rt=!0):bt<-Number.EPSILON?w<-Number.EPSILON&&(rt=!0):Math.sign(A)===Math.sign(G)&&(rt=!0),rt?(X=-A,B=bt,gt=Math.sqrt(lt)):(X=bt,B=A,gt=Math.sqrt(lt/2))}return new xt(X/gt,B/gt)}let Z=[];for(let T=0,O=I.length,N=O-1,X=T+1;T<O;T++,N++,X++)N===O&&(N=0),X===O&&(X=0),Z[T]=Q(I[T],I[N],I[X]);let ct=[],ht,et=Z.concat();for(let T=0,O=z.length;T<O;T++){let N=z[T];ht=[];for(let X=0,B=N.length,gt=B-1,bt=X+1;X<B;X++,gt++,bt++)gt===B&&(gt=0),bt===B&&(bt=0),ht[X]=Q(N[X],N[gt],N[bt]);ct.push(ht),et=et.concat(ht)}for(let T=0;T<p;T++){let O=T/p,N=f*Math.cos(O*Math.PI/2),X=g*Math.sin(O*Math.PI/2)+x;for(let B=0,gt=I.length;B<gt;B++){let bt=V(I[B],Z[B],X);vt(bt.x,bt.y,-N)}for(let B=0,gt=z.length;B<gt;B++){let bt=z[B];ht=ct[B];for(let A=0,w=bt.length;A<w;A++){let G=V(bt[A],ht[A],X);vt(G.x,G.y,-N)}}}let F=g+x;for(let T=0;T<q;T++){let O=h?V(E[T],et[T],F):E[T];v?(R.copy(S.normals[0]).multiplyScalar(O.x),b.copy(S.binormals[0]).multiplyScalar(O.y),U.copy(_[0]).add(R).add(b),vt(U.x,U.y,U.z)):vt(O.x,O.y,0)}for(let T=1;T<=u;T++)for(let O=0;O<q;O++){let N=h?V(E[O],et[O],F):E[O];v?(R.copy(S.normals[T]).multiplyScalar(N.x),b.copy(S.binormals[T]).multiplyScalar(N.y),U.copy(_[T]).add(R).add(b),vt(U.x,U.y,U.z)):vt(N.x,N.y,d/u*T)}for(let T=p-1;T>=0;T--){let O=T/p,N=f*Math.cos(O*Math.PI/2),X=g*Math.sin(O*Math.PI/2)+x;for(let B=0,gt=I.length;B<gt;B++){let bt=V(I[B],Z[B],X);vt(bt.x,bt.y,d+N)}for(let B=0,gt=z.length;B<gt;B++){let bt=z[B];ht=ct[B];for(let A=0,w=bt.length;A<w;A++){let G=V(bt[A],ht[A],X);v?vt(G.x,G.y+_[u-1].y,_[u-1].x+N):vt(G.x,G.y,d+N)}}}st(),ft();function st(){let T=s.length/3;if(h){let O=0,N=q*O;for(let X=0;X<nt;X++){let B=it[X];Ut(B[2]+N,B[1]+N,B[0]+N)}O=u+p*2,N=q*O;for(let X=0;X<nt;X++){let B=it[X];Ut(B[0]+N,B[1]+N,B[2]+N)}}else{for(let O=0;O<nt;O++){let N=it[O];Ut(N[2],N[1],N[0])}for(let O=0;O<nt;O++){let N=it[O];Ut(N[0]+q*u,N[1]+q*u,N[2]+q*u)}}i.addGroup(T,s.length/3-T,0)}function ft(){let T=s.length/3,O=0;mt(I,O),O+=I.length;for(let N=0,X=z.length;N<X;N++){let B=z[N];mt(B,O),O+=B.length}i.addGroup(T,s.length/3-T,1)}function mt(T,O){let N=T.length;for(;--N>=0;){let X=N,B=N-1;B<0&&(B=T.length-1);for(let gt=0,bt=u+p*2;gt<bt;gt++){let A=q*gt,w=q*(gt+1),G=O+X+A,lt=O+B+A,at=O+B+w,rt=O+X+w;Ft(G,lt,at,rt)}}}function vt(T,O,N){l.push(T),l.push(O),l.push(N)}function Ut(T,O,N){P(T),P(O),P(N);let X=s.length/3,B=y.generateTopUV(i,s,X-3,X-2,X-1);D(B[0]),D(B[1]),D(B[2])}function Ft(T,O,N,X){P(T),P(O),P(X),P(O),P(N),P(X);let B=s.length/3,gt=y.generateSideWallUV(i,s,B-6,B-3,B-2,B-1);D(gt[0]),D(gt[1]),D(gt[3]),D(gt[1]),D(gt[2]),D(gt[3])}function P(T){s.push(l[T*3+0]),s.push(l[T*3+1]),s.push(l[T*3+2])}function D(T){r.push(T.x),r.push(T.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,i=this.parameters.options;return Sg(e,i,t)}static fromJSON(t,e){let i=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];i.push(a)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new eo[s.type]().fromJSON(s)),new n(i,t.options)}},wg={generateTopUV:function(n,t,e,i,s){let r=t[e*3],o=t[e*3+1],a=t[i*3],l=t[i*3+1],c=t[s*3],u=t[s*3+1];return[new xt(r,o),new xt(a,l),new xt(c,u)]},generateSideWallUV:function(n,t,e,i,s,r){let o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[i*3],u=t[i*3+1],d=t[i*3+2],h=t[s*3],f=t[s*3+1],g=t[s*3+2],x=t[r*3],p=t[r*3+1],m=t[r*3+2];return Math.abs(a-u)<Math.abs(o-c)?[new xt(o,1-l),new xt(c,1-d),new xt(h,1-g),new xt(x,1-m)]:[new xt(a,1-l),new xt(u,1-d),new xt(f,1-g),new xt(p,1-m)]}};function Sg(n,t,e){if(e.shapes=[],Array.isArray(n))for(let i=0,s=n.length;i<s;i++){let r=n[i];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var Be=class n extends we{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let l=Math.min(o+a,Math.PI),c=0,u=[],d=new L,h=new L,f=[],g=[],x=[],p=[];for(let m=0;m<=i;m++){let y=[],_=m/i,v=0;m===0&&o===0?v=.5/e:m===i&&l===Math.PI&&(v=-.5/e);for(let S=0;S<=e;S++){let b=S/e;d.x=-t*Math.cos(s+b*r)*Math.sin(o+_*a),d.y=t*Math.cos(o+_*a),d.z=t*Math.sin(s+b*r)*Math.sin(o+_*a),g.push(d.x,d.y,d.z),h.copy(d).normalize(),x.push(h.x,h.y,h.z),p.push(b+v,1-_),y.push(c++)}u.push(y)}for(let m=0;m<i;m++)for(let y=0;y<e;y++){let _=u[m][y+1],v=u[m][y],S=u[m+1][y],b=u[m+1][y+1];(m!==0||o>0)&&f.push(_,v,b),(m!==i-1||l<Math.PI)&&f.push(v,S,b)}this.setIndex(f),this.setAttribute("position",new re(g,3)),this.setAttribute("normal",new re(x,3)),this.setAttribute("uv",new re(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Qe=class n extends we{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);let o=[],a=[],l=[],c=[],u=new L,d=new L,h=new L;for(let f=0;f<=i;f++)for(let g=0;g<=s;g++){let x=g/s*r,p=f/i*Math.PI*2;d.x=(t+e*Math.cos(p))*Math.cos(x),d.y=(t+e*Math.cos(p))*Math.sin(x),d.z=e*Math.sin(p),a.push(d.x,d.y,d.z),u.x=t*Math.cos(x),u.y=t*Math.sin(x),h.subVectors(d,u).normalize(),l.push(h.x,h.y,h.z),c.push(g/s),c.push(f/i)}for(let f=1;f<=i;f++)for(let g=1;g<=s;g++){let x=(s+1)*f+g-1,p=(s+1)*(f-1)+g-1,m=(s+1)*(f-1)+g,y=(s+1)*f+g;o.push(x,p,y),o.push(p,m,y)}this.setIndex(o),this.setAttribute("position",new re(a,3)),this.setAttribute("normal",new re(l,3)),this.setAttribute("uv",new re(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var no=class n extends we{constructor(t=new Qr(new L(-1,-1,0),new L(-1,1,0),new L(1,1,0)),e=64,i=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:i,radialSegments:s,closed:r};let o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new L,l=new L,c=new xt,u=new L,d=[],h=[],f=[],g=[];x(),this.setIndex(g),this.setAttribute("position",new re(d,3)),this.setAttribute("normal",new re(h,3)),this.setAttribute("uv",new re(f,2));function x(){for(let _=0;_<e;_++)p(_);p(r===!1?e:0),y(),m()}function p(_){u=t.getPointAt(_/e,u);let v=o.normals[_],S=o.binormals[_];for(let b=0;b<=s;b++){let R=b/s*Math.PI*2,U=Math.sin(R),M=-Math.cos(R);l.x=M*v.x+U*S.x,l.y=M*v.y+U*S.y,l.z=M*v.z+U*S.z,l.normalize(),h.push(l.x,l.y,l.z),a.x=u.x+i*l.x,a.y=u.y+i*l.y,a.z=u.z+i*l.z,d.push(a.x,a.y,a.z)}}function m(){for(let _=1;_<=e;_++)for(let v=1;v<=s;v++){let S=(s+1)*(_-1)+(v-1),b=(s+1)*_+(v-1),R=(s+1)*_+v,U=(s+1)*(_-1)+v;g.push(S,b,U),g.push(b,R,U)}}function y(){for(let _=0;_<=e;_++)for(let v=0;v<=s;v++)c.x=_/e,c.y=v/s,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new n(new eo[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};var Ie=class extends Oi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new qt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Sh,this.normalScale=new xt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function wr(n,t,e){return!n||!e&&n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function Tg(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}var ns=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];i:{t:{let o;e:{n:if(!(t<s)){for(let a=i+2;;){if(s===void 0){if(t<r)break n;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=s,s=e[++i],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(i=2,r=a);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=e[--i-1],t>=r)break t}o=i,i=0;break e}break i}for(;i<o;){let a=i+o>>>1;t<e[a]?o=a:i=a+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=i[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Xa=class extends ns{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ac,endingEnd:ac}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],l=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case lc:r=t,a=2*e-i;break;case cc:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case lc:o=t,l=2*i-e;break;case cc:o=1,l=i+s[1]-s[0];break;default:o=t-1,l=e}let c=(i-e)*.5,u=this.valueSize;this._weightPrev=c/(e-a),this._weightNext=c/(l-i),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,f=this._weightNext,g=(i-e)/(s-e),x=g*g,p=x*g,m=-h*p+2*h*x-h*g,y=(1+h)*p+(-1.5-2*h)*x+(-.5+h)*g+1,_=(-1-f)*p+(1.5+f)*x+.5*g,v=f*p-f*x;for(let S=0;S!==a;++S)r[S]=m*o[u+S]+y*o[c+S]+_*o[l+S]+v*o[d+S];return r}},qa=class extends ns{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=t*a,c=l-a,u=(i-e)/(s-e),d=1-u;for(let h=0;h!==a;++h)r[h]=o[c+h]*d+o[l+h]*u;return r}},Ya=class extends ns{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},xi=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=wr(e,this.TimeBufferType),this.values=wr(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:wr(t.times,Array),values:wr(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new Ya(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new qa(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Xa(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Tr:e=this.InterpolantFactoryMethodDiscrete;break;case Ar:e=this.InterpolantFactoryMethodLinear;break;case Fo:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Tr;case this.InterpolantFactoryMethodLinear:return Ar;case this.InterpolantFactoryMethodSmooth:return Fo}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t}return this}trim(t,e){let i=this.times,s=i.length,r=0,o=s-1;for(;r!==s&&i[r]<t;)++r;for(;o!==-1&&i[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let l=i[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),t=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),t=!1;break}o=l}if(s!==void 0&&Tg(s))for(let a=0,l=s.length;a!==l;++a){let c=s[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Fo,r=t.length-1,o=1;for(let a=1;a<r;++a){let l=!1,c=t[a],u=t[a+1];if(c!==u&&(a!==1||c!==t[0]))if(s)l=!0;else{let d=a*i,h=d-i,f=d+i;for(let g=0;g!==i;++g){let x=e[d+g];if(x!==e[h+g]||x!==e[f+g]){l=!0;break}}}if(l){if(a!==o){t[o]=t[a];let d=a*i,h=o*i;for(let f=0;f!==i;++f)e[h+f]=e[d+f]}++o}}if(r>0){t[o]=t[r];for(let a=r*i,l=o*i,c=0;c!==i;++c)e[l+c]=e[a+c];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};xi.prototype.TimeBufferType=Float32Array;xi.prototype.ValueBufferType=Float32Array;xi.prototype.DefaultInterpolation=Ar;var xn=class extends xi{};xn.prototype.ValueTypeName="bool";xn.prototype.ValueBufferType=Array;xn.prototype.DefaultInterpolation=Tr;xn.prototype.InterpolantFactoryMethodLinear=void 0;xn.prototype.InterpolantFactoryMethodSmooth=void 0;var Za=class extends xi{};Za.prototype.ValueTypeName="color";var Ja=class extends xi{};Ja.prototype.ValueTypeName="number";var Ka=class extends ns{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(i-e)/(s-e),c=t*a;for(let u=c+a;c!==u;c+=4)$i.slerpFlat(r,0,o,c-a,o,c,l);return r}},zs=class extends xi{InterpolantFactoryMethodLinear(t){return new Ka(this.times,this.values,this.getValueSize(),t)}};zs.prototype.ValueTypeName="quaternion";zs.prototype.DefaultInterpolation=Ar;zs.prototype.InterpolantFactoryMethodSmooth=void 0;var yn=class extends xi{};yn.prototype.ValueTypeName="string";yn.prototype.ValueBufferType=Array;yn.prototype.DefaultInterpolation=Tr;yn.prototype.InterpolantFactoryMethodLinear=void 0;yn.prototype.InterpolantFactoryMethodSmooth=void 0;var $a=class extends xi{};$a.prototype.ValueTypeName="vector";var ja=class{constructor(t,e,i){let s=this,r=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this.itemStart=function(u){a++,r===!1&&s.onStart!==void 0&&s.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,s.onProgress!==void 0&&s.onProgress(u,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){let d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=c.length;d<h;d+=2){let f=c[d],g=c[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return g}return null}}},Ag=new ja,Qa=class{constructor(t){this.manager=t!==void 0?t:Ag,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};Qa.DEFAULT_MATERIAL_NAME="__DEFAULT";var ss=class extends Ee{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new qt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}},so=class extends ss{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ee.DEFAULT_UP),this.updateMatrix(),this.groundColor=new qt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},fa=new ce,hh=new L,uh=new L,Fs=class{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new xt(512,512),this.map=null,this.mapPass=null,this.matrix=new ce,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Rs,this._frameExtents=new xt(1,1),this._viewportCount=1,this._viewports=[new xe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,i=this.matrix;hh.setFromMatrixPosition(t.matrixWorld),e.position.copy(hh),uh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(uh),e.updateMatrixWorld(),fa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(fa),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(fa)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}},tl=class extends Fs{constructor(){super(new Oe(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(t){let e=this.camera,i=Ir*2*t.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=t.distance||e.far;(i!==e.fov||s!==e.aspect||r!==e.far)&&(e.fov=i,e.aspect=s,e.far=r,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}},ro=class extends ss{constructor(t,e,i=0,s=Math.PI/3,r=0,o=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Ee.DEFAULT_UP),this.updateMatrix(),this.target=new Ee,this.distance=i,this.angle=s,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new tl}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}},dh=new ce,bs=new L,pa=new L,el=class extends Fs{constructor(){super(new Oe(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new xt(4,2),this._viewportCount=6,this._viewports=[new xe(2,1,1,1),new xe(0,1,1,1),new xe(3,1,1,1),new xe(1,1,1,1),new xe(3,0,1,1),new xe(1,0,1,1)],this._cubeDirections=[new L(1,0,0),new L(-1,0,0),new L(0,0,1),new L(0,0,-1),new L(0,1,0),new L(0,-1,0)],this._cubeUps=[new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,1,0),new L(0,0,1),new L(0,0,-1)]}updateMatrices(t,e=0){let i=this.camera,s=this.matrix,r=t.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),bs.setFromMatrixPosition(t.matrixWorld),i.position.copy(bs),pa.copy(i.position),pa.add(this._cubeDirections[e]),i.up.copy(this._cubeUps[e]),i.lookAt(pa),i.updateMatrixWorld(),s.makeTranslation(-bs.x,-bs.y,-bs.z),dh.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(dh)}},Fe=class extends ss{constructor(t,e,i=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new el}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},il=class extends Fs{constructor(){super(new es(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},oo=class extends ss{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ee.DEFAULT_UP),this.updateMatrix(),this.target=new Ee,this.shadow=new il}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var ao=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=fh(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=fh();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};function fh(){return(typeof performance=="undefined"?Date:performance).now()}var hl="\\[\\]\\.:\\/",Rg=new RegExp("["+hl+"]","g"),ul="[^"+hl+"]",Cg="[^"+hl.replace("\\.","")+"]",Pg=/((?:WC+[\/:])*)/.source.replace("WC",ul),Lg=/(WCOD+)?/.source.replace("WCOD",Cg),Ig=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ul),Dg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ul),Ug=new RegExp("^"+Pg+Lg+Ig+Dg+"$"),Ng=["material","materials","bones","map"],nl=class{constructor(t,e,i){let s=i||_e.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},_e=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Rg,"")}static parseTrackName(t){let e=Ug.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);Ng.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let l=i(a.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===c){c=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let o=t[s];if(o===void 0){let c=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};_e.Composite=nl;_e.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};_e.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};_e.prototype.GetterByBindingType=[_e.prototype._getValue_direct,_e.prototype._getValue_array,_e.prototype._getValue_arrayElement,_e.prototype._getValue_toArray];_e.prototype.SetterByBindingTypeAndVersioning=[[_e.prototype._setValue_direct,_e.prototype._setValue_direct_setNeedsUpdate,_e.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[_e.prototype._setValue_array,_e.prototype._setValue_array_setNeedsUpdate,_e.prototype._setValue_array_setMatrixWorldNeedsUpdate],[_e.prototype._setValue_arrayElement,_e.prototype._setValue_arrayElement_setNeedsUpdate,_e.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[_e.prototype._setValue_fromArray,_e.prototype._setValue_fromArray_setNeedsUpdate,_e.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var U1=new Float32Array(1);typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"160"}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="160");var as=new Qn(0,0,0,"YXZ"),ls=new L,kg={type:"change"},zg={type:"lock"},Fg={type:"unlock"},Oh=Math.PI/2,fo=class extends wi{constructor(t,e){super(),this.camera=t,this.domElement=e,this.isLocked=!1,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.pointerSpeed=1,this._onMouseMove=Og.bind(this),this._onPointerlockChange=Bg.bind(this),this._onPointerlockError=Hg.bind(this),this.connect()}connect(){this.domElement.ownerDocument.addEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.addEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.addEventListener("pointerlockerror",this._onPointerlockError)}disconnect(){this.domElement.ownerDocument.removeEventListener("mousemove",this._onMouseMove),this.domElement.ownerDocument.removeEventListener("pointerlockchange",this._onPointerlockChange),this.domElement.ownerDocument.removeEventListener("pointerlockerror",this._onPointerlockError)}dispose(){this.disconnect()}getObject(){return this.camera}getDirection(t){return t.set(0,0,-1).applyQuaternion(this.camera.quaternion)}moveForward(t){let e=this.camera;ls.setFromMatrixColumn(e.matrix,0),ls.crossVectors(e.up,ls),e.position.addScaledVector(ls,t)}moveRight(t){let e=this.camera;ls.setFromMatrixColumn(e.matrix,0),e.position.addScaledVector(ls,t)}lock(){this.domElement.requestPointerLock()}unlock(){this.domElement.ownerDocument.exitPointerLock()}};function Og(n){if(this.isLocked===!1)return;let t=n.movementX||n.mozMovementX||n.webkitMovementX||0,e=n.movementY||n.mozMovementY||n.webkitMovementY||0,i=this.camera;as.setFromQuaternion(i.quaternion),as.y-=t*.002*this.pointerSpeed,as.x-=e*.002*this.pointerSpeed,as.x=Math.max(Oh-this.maxPolarAngle,Math.min(Oh-this.minPolarAngle,as.x)),i.quaternion.setFromEuler(as),this.dispatchEvent(kg)}function Bg(){this.domElement.ownerDocument.pointerLockElement===this.domElement?(this.dispatchEvent(zg),this.isLocked=!0):(this.dispatchEvent(Fg),this.isLocked=!1)}function Hg(){console.error("THREE.PointerLockControls: Unable to use Pointer Lock API")}var Bh={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};var Hi=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}},Gg=new es(-1,1,1,-1,0,1),dl=class extends we{constructor(){super(),this.setAttribute("position",new re([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new re([0,2,0,0,2,0],2))}},Vg=new dl,po=class{constructor(t){this._mesh=new $(Vg,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Gg)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}};var cs=class extends Hi{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof Ke?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=al.clone(t.uniforms),this.material=new Ke({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new po(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}};var Os=class extends Hi{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){let s=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),r.buffers.stencil.setFunc(s.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(s.EQUAL,1,4294967295),r.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),r.buffers.stencil.setLocked(!0)}},mo=class extends Hi{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}};var go=class{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){let i=t.getSize(new xt);this._width=i.width,this._height=i.height,e=new _i(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:fn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new cs(Bh),this.copyPass.material.blending=Mi,this.clock=new ao}swapBuffers(){let t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){let e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());let e=this.renderer.getRenderTarget(),i=!1;for(let s=0,r=this.passes.length;s<r;s++){let o=this.passes[s];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),o.needsSwap){if(i){let a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Os!==void 0&&(o instanceof Os?i=!0:o instanceof mo&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){let e=this.renderer.getSize(new xt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;let i=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(i,s),this.renderTarget2.setSize(i,s);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(i,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}};var _o=class extends Hi{constructor(t,e,i=null,s=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=s,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new qt}render(t,e,i){let s=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor)),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=s}};function Lt(n){let t=n>>>0;return function(){t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}var dt=(n=1,t)=>t===void 0?Math.random()*n:n+Math.random()*(t-n),vn=n=>Math.random()<n,bn=n=>n[Math.random()*n.length|0],Qt=(n,t,e)=>Math.max(t,Math.min(e,n)),ti=(n,t,e)=>n+(t-n)*e;function Si(n,t,e,i,s,r){let o=i/2,a=s/2,l=r/2;return{x0:n-o,y0:t-a,z0:e-l,x1:n+o,y1:t+a,z1:e+l}}function Bs(n,t,e,i,s){return{x0:n-i,y0:t,z0:e-i,x1:n+i,y1:t+s,z1:e+i}}function xo(n,t,e,i,s,r=.35,o={}){var S;let a=n.y0,l=n.x1-n.x0,c=n.z1-n.z0,u=a+((S=o.bodyHeight)!=null?S:n.y1-n.y0),d=!1,h=n.x0,f=n.x1,g=n.z0,x=n.z1,p=b=>b.x0<n.x1&&b.x1>n.x0&&b.z0<n.z1&&b.z1>n.z0&&b.y1>a+r&&b.y0<u-.08,m=[];for(let b of s)b.x0<n.x1&&b.x1>n.x0&&b.z0<n.z1&&b.z1>n.z0&&b.y1>a+r&&b.y0<u-.08&&m.push(b);if(t!==0){h=n.x0,f=n.x1,n.x0+=t,n.x1+=t;for(let b of s)p(b)&&(t>0&&f<=b.x0+.001?(n.x1=b.x0-.001,n.x0=n.x1-l,d=!0):t<0&&h>=b.x1-.001&&(n.x0=b.x1+.001,n.x1=n.x0+l,d=!0))}if(i!==0){g=n.z0,x=n.z1,n.z0+=i,n.z1+=i;for(let b of s)p(b)&&(i>0&&x<=b.z0+.001?(n.z1=b.z0-.001,n.z0=n.z1-c,d=!0):i<0&&g>=b.z1-.001&&(n.z0=b.z1+.001,n.z1=n.z0+c,d=!0))}for(let b of m){if(!p(b))continue;let R=b.x1-b.x0,U=b.z1-b.z0,M=Math.min(n.x1,b.x1)-Math.max(n.x0,b.x0),E=Math.min(n.z1,b.z1)-Math.max(n.z0,b.z0);if(M>.001&&R<l){let z=n.x1-b.x0,Y=b.x1-n.x0,it={x0:b.x0-.001-l,x1:b.x0-.001,y0:n.y0,y1:n.y1,z0:n.z0,z1:n.z1},I={x0:b.x1+.001,x1:b.x1+.001+l,y0:n.y0,y1:n.y1,z0:n.z0,z1:n.z1},V=Q=>{for(let Z of s)if(Z!==b&&Z.x0<Q.x1&&Z.x1>Q.x0&&Z.z0<Q.z1&&Z.z1>Q.z0&&Z.y1>Q.y0+r&&Z.y0<Q.y0+(Q.y1-Q.y0)-.08)return!0;return!1},q=V(it),nt=V(I);q&&!nt?(n.x0=I.x0,n.x1=I.x1):nt&&!q||z<=Y?(n.x0=it.x0,n.x1=it.x1):(n.x0=I.x0,n.x1=I.x1),d=!0;break}else if(E>.001&&U<c){let z=n.z1-b.z0,Y=b.z1-n.z0,it={x0:n.x0,x1:n.x1,y0:n.y0,y1:n.y1,z0:b.z0-.001-c,z1:b.z0-.001},I={x0:n.x0,x1:n.x1,y0:n.y0,y1:n.y1,z0:b.z1+.001,z1:b.z1+.001+c},V=Q=>{for(let Z of s)if(Z!==b&&Z.x0<Q.x1&&Z.x1>Q.x0&&Z.z0<Q.z1&&Z.z1>Q.z0&&Z.y1>Q.y0+r&&Z.y0<Q.y0+(Q.y1-Q.y0)-.08)return!0;return!1},q=V(it),nt=V(I);q&&!nt?(n.z0=I.z0,n.z1=I.z1):nt&&!q||z<=Y?(n.z0=it.z0,n.z1=it.z1):(n.z0=I.z0,n.z1=I.z1),d=!0;break}}let y=b=>b.x0<n.x1&&b.x1>n.x0&&b.z0<n.z1&&b.z1>n.z0,_=b=>i>0&&x<=b.z0+.001&&n.z1>b.z0||i<0&&g>=b.z1-.001&&n.z0<b.z1||t>0&&f<=b.x0+.001&&n.x1>b.x0||t<0&&h>=b.x1-.001&&n.x0<b.x1;if(e<0){let b=a+e,R=-1/0;for(let E of s)_(E)&&y(E)&&E.y1<=a+r+.001&&E.y1>a+.1&&E.y1>R&&(R=E.y1);if(R>-1e9)return n.y1+=R-a,n.y0=R,{grounded:!0,blocked:!0};let U=b-.001,M=-1/0;for(let E of s)y(E)&&E.y1<=a+.101&&E.y1>=U&&E.y1>M&&(M=E.y1);return M>-1e9?(n.y1+=M-a,n.y0=M,{grounded:!0,blocked:!0}):(n.y0+=e,n.y1+=e,{grounded:!1,blocked:!1})}n.y0+=e,n.y1+=e;let v=-1/0;for(let b of s)y(b)&&b.y1<=a+.101&&b.y1>v&&(v=b.y1);return{grounded:a<=v+.001,blocked:!1}}var Hh={value:new xt(640,360)};function fl(n,t){Hh.value.set(n,t)}var Wg=typeof window!="undefined"&&typeof location!="undefined"&&new URLSearchParams(location.search).has("nosnap");function Gh(n){!n||n.__ps1||Wg||(n.__ps1=!0,n.onBeforeCompile=t=>{t.uniforms.uSnapRes=Hh,t.vertexShader=t.vertexShader.replace("#include <common>",`#include <common>
uniform vec2 uSnapRes;`).replace("#include <project_vertex>",`#include <project_vertex>
gl_Position.xy = floor(gl_Position.xy * uSnapRes + 0.5) / uSnapRes;`)})}function Re(n,t,e,i={}){var d;let s=new jt(n,t,e),r=s.attributes.position,o=s.attributes.uv,a=i.uv||[1,1],l=!Array.isArray(a)||a.length===2&&typeof a[0]=="string",c=l?[1,1]:a;for(let h=0;h<6;h++){let f=["px","nx","py","ny","pz","nz"][h],g=l&&a[f]||c;for(let x=0;x<4;x++){let p=h*4+x;o.setXY(p,o.getX(p)*g[0],o.getY(p)*g[1])}}let u=i.jitter||0;if(u>0)for(let h=0;h<r.count;h++)r.setXYZ(h,r.getX(h)+dt(-u,u),r.getY(h)+dt(-u,u),r.getZ(h)+dt(-u,u));if(i.ao&&i.ao!=="none"){let h=new Float32Array(r.count*3),f=(d=i.aoStrength)!=null?d:.85,g=n/2,x=t/2,p=e/2;for(let m=0;m<r.count;m++){let y=r.getX(m),_=r.getY(m),v=r.getZ(m),S=1;if(i.ao==="wall"){let U=Qt((_+x)/t,0,1),M=(1-Qt(Math.abs(y)/g,0,1))*.5+(1-Qt(Math.abs(v)/p,0,1))*.5,E=Math.abs(U-.5)*2;S=Qt(.7+.3*Math.pow(Qt(1-E,0,1),1.3),0,1)*Qt(.45+.55*M,0,1)}else if(i.ao==="floor"||i.ao==="ceil"){let U=1-Qt(Math.abs(y)/g,0,1),M=1-Qt(Math.abs(v)/p,0,1),E=Qt(Math.min(U,M),0,1);S=Qt(.5+.5*Math.pow(E,1.6),0,1)}let b=1-dt(0,.1),R=S*b*f;Number.isFinite(R)||(R=f),h[m*3]=R,h[m*3+1]=R,h[m*3+2]=R}s.setAttribute("color",new Ce(h,3))}return s.computeVertexNormals(),s}function ot(n={}){var e,i,s,r,o,a;let t=new Ie({color:(e=n.color)!=null?e:16777215,roughness:(i=n.roughness)!=null?i:.9,metalness:(s=n.metalness)!=null?s:0,flatShading:(r=n.flat)!=null?r:!1});return n.map&&(t.map=n.map),n.vertexColors&&(t.vertexColors=!0),n.emissive!==void 0&&(t.emissive.set(n.emissive),t.emissiveIntensity=(o=n.emissiveIntensity)!=null?o:1),n.transparent&&(t.transparent=!0,t.opacity=(a=n.opacity)!=null?a:1),n.depthWrite===!1&&(t.depthWrite=!1),n.side&&(t.side=n.side),n.ps1!==!1&&Gh(t),t}function Se(n={}){var e,i,s;let t=new Je({color:(e=n.color)!=null?e:16777215,map:(i=n.map)!=null?i:null,transparent:!!n.transparent,opacity:(s=n.opacity)!=null?s:1});return n.vertexColors&&(t.vertexColors=!0),n.depthWrite===!1&&(t.depthWrite=!1),n.side&&(t.side=n.side),n.ps1!==!1&&Gh(t),t}var yo=class{constructor(){this.ctx=null,this.master=null,this.ambientGain=null,this.humGain=null,this.tvGain=null,this.windGain=null,this.fear=0,this._noiseBuf=null,this._hbTimer=null,this._phoneTimer=null,this.enabled=!0,this.volume=.7,this.paused=!1,this.droneOscs=[],this.musNext=3,this.chasePulse=0,this.chaseBar=0,this.chaseOn=!1}ensure(){var e,i;if(this.ctx){(i=(e=this.ctx).resume)==null||i.call(e);return}try{let s=window.AudioContext||window.webkitAudioContext;this.ctx=new s}catch(s){this.enabled=!1;return}this.master=this.ctx.createGain(),this.master.gain.value=this.volume;let t=this.ctx.createDynamicsCompressor();t.threshold.value=-18,t.ratio.value=8,this.master.connect(t),t.connect(this.ctx.destination),this._noiseBuf=this._makeNoise(2),this._buildReverb(),this._buildAmbient(),this._buildEnvironment()}_buildEnvironment(){this.environment=[];let t=[{x:18.3,y:-1.6,z:27.9,frequency:72,gain:.06,range:12,type:"sine"},{x:22.6,y:-1,z:16.3,frequency:145,gain:.035,range:8,type:"triangle"},{x:-25.4,y:3.7,z:42.4,frequency:760,gain:.018,range:6,type:"noise"},{x:0,y:7,z:78,frequency:280,gain:.04,range:17,type:"noise"}],e=this.ctx;for(let i of t){let s=i.type==="noise"?e.createBufferSource():e.createOscillator();i.type==="noise"?(s.buffer=this._noiseBuf,s.loop=!0):(s.type=i.type,s.frequency.value=i.frequency);let r=e.createBiquadFilter();r.type="lowpass",r.frequency.value=i.frequency;let o=e.createGain();o.gain.value=0;let a=e.createPanner();a.panningModel="HRTF",a.distanceModel="inverse",a.refDistance=1.7,a.maxDistance=i.range,a.rolloffFactor=1.4,a.setPosition(i.x,i.y,i.z),s.connect(r),r.connect(o),o.connect(a),this._out(a,.2),s.start(),this.environment.push({...i,source:s,filter:r,volume:o})}}updateEnvironment(t,e,i){if(!this.ctx||!this.environment)return;let s=this.ctx,r=s.listener,o=s.currentTime;if(r.positionX)for(let[a,l]of[["positionX",t.x],["positionY",t.y],["positionZ",t.z],["forwardX",e.x],["forwardY",e.y],["forwardZ",e.z],["upX",0],["upY",1],["upZ",0]])r[a].setTargetAtTime(l,o,.04);else r.setPosition(t.x,t.y,t.z),r.setOrientation(e.x,e.y,e.z,0,1,0);for(let a of this.environment){let l=Math.hypot(t.x-a.x,t.y-a.y,t.z-a.z),c=l<a.range&&i(a);a.volume.gain.setTargetAtTime(l<a.range?a.gain*(c?.12:1):0,o,.25),a.filter.frequency.setTargetAtTime(a.frequency*(c?.5:1),o,.25)}this.revGain&&this.revGain.gain.setTargetAtTime(t.y<-.8?.68:t.y>4.8?.18:.42,o,.6)}cameraShutter(t=0){this._noise({dur:.035,type:"highpass",freq:1400,gain:.11,pan:t}),this._noise({dur:.08,type:"bandpass",freq:440,gain:.09,pan:t,delay:.05}),this._osc({f0:180,f1:55,dur:.12,gain:.07,attack:.002,pan:t,delay:.04})}_makeNoise(t){let e=t*this.ctx.sampleRate|0,i=this.ctx.createBuffer(1,e,this.ctx.sampleRate),s=i.getChannelData(0);for(let r=0;r<e;r++)s[r]=Math.random()*2-1;return i}_buildReverb(){let t=this.ctx,e=1.9,i=e*t.sampleRate|0,s=t.createBuffer(2,i,t.sampleRate);for(let r=0;r<2;r++){let o=s.getChannelData(r),a=0;for(let l=0;l<i;l++){let c=l/i,u=Math.pow(1-c,2.4),d=(Math.random()*2-1)*u;a=a*.72+d*.28,o[l]=a*(l<200?l/200:1)}}this.rev=t.createConvolver(),this.rev.buffer=s,this.revGain=t.createGain(),this.revGain.gain.value=.5,this.rev.connect(this.revGain),this.revGain.connect(this.master)}_out(t,e=.35){if(t.connect(this.master),this.rev){let i=this.ctx.createGain();i.gain.value=e,t.connect(i),i.connect(this.rev)}}_buildAmbient(){let t=this.ctx,e=t.createGain();e.gain.value=.05;let i=t.createBiquadFilter();i.type="lowpass",i.frequency.value=130,e.connect(i),i.connect(this.master),this.ambientGain=e;for(let S of[41.2,41.7,82.4]){let b=t.createOscillator();b.type="sine",b.frequency.value=S;let R=t.createGain();R.gain.value=S>60?.35:1,b.connect(R),R.connect(e),b.start(),this.droneOscs.push(b)}let s=t.createBufferSource();s.buffer=this._noiseBuf,s.loop=!0;let r=t.createBiquadFilter();r.type="lowpass",r.frequency.value=420;let o=t.createGain();o.gain.value=.012,s.connect(r),r.connect(o),o.connect(this.master),s.start();let a=t.createOscillator();a.type="square",a.frequency.value=120;let l=t.createBiquadFilter();l.type="bandpass",l.frequency.value=120,l.Q.value=12;let c=t.createGain();c.gain.value=0,a.connect(l),l.connect(c),c.connect(this.master),a.start(),this.humGain=c;let u=t.createBufferSource();u.buffer=this._noiseBuf,u.loop=!0;let d=t.createBiquadFilter();d.type="highpass",d.frequency.value=900;let h=t.createGain();h.gain.value=0,u.connect(d),d.connect(h),h.connect(this.master),u.start(),this.tvGain=h;let f=t.createBufferSource();f.buffer=this._noiseBuf,f.loop=!0,f.playbackRate.value=.5;let g=t.createBiquadFilter();g.type="lowpass",g.frequency.value=240,g.Q.value=.7;let x=t.createGain();x.gain.value=0,f.connect(g),g.connect(x),x.connect(this.master),f.start(),this.windGain=x;let p=t.createOscillator();p.frequency.value=.13;let m=t.createGain();m.gain.value=90,p.connect(m),m.connect(g.frequency),p.start();let y=t.createBufferSource();y.buffer=this._noiseBuf,y.loop=!0,y.playbackRate.value=.35;let _=t.createBiquadFilter();_.type="bandpass",_.frequency.value=720,_.Q.value=.55;let v=t.createGain();if(v.gain.value=.006,y.connect(_),_.connect(v),v.connect(this.master),this.rev){let S=t.createGain();S.gain.value=.25,v.connect(S),S.connect(this.rev)}y.start(),this.rainGain=v}setWind(t){this.windGain&&this.windGain.gain.setTargetAtTime(Qt(t,0,1)*.05,this.ctx.currentTime,.6)}setRain(t){this.rainGain&&this.rainGain.gain.setTargetAtTime(Qt(t,0,1)*.02,this.ctx.currentTime,.8)}setFear(t){this.ctx&&(this.fear=Qt(t,0,1),this.ambientGain&&this.ambientGain.gain.setTargetAtTime(.05+this.fear*.055,this.ctx.currentTime,.4))}setHum(t){this.humGain&&this.humGain.gain.setTargetAtTime(Qt(t,0,1)*.022,this.ctx.currentTime,.25)}setTV(t){this.tvGain&&this.tvGain.gain.setTargetAtTime(t?.05:0,this.ctx.currentTime,.15)}_env(t,e,i,s){let o=this.ctx.createGain();return o.gain.setValueAtTime(1e-4,s),o.gain.linearRampToValueAtTime(t,s+e),o.gain.exponentialRampToValueAtTime(1e-4,s+e+i),o}_pan(t){if(!this.ctx)return null;let e=this.ctx.createStereoPanner?this.ctx.createStereoPanner():null;return e&&(e.pan.value=Qt(t,-1,1)),e}_noise({dur:t=.1,type:e="bandpass",freq:i=400,freqEnd:s=null,q:r=2,gain:o=.1,attack:a=.005,pan:l=0,delay:c=0,hp:u=0}){if(!this.ctx)return;let d=this.ctx,h=d.currentTime+c,f=d.createBufferSource();f.buffer=this._noiseBuf,f.loop=!0,f.playbackRate.value=.8+Math.random()*.4;let g=d.createBiquadFilter();g.type=e,g.frequency.setValueAtTime(i,h),s!==null&&g.frequency.exponentialRampToValueAtTime(Math.max(30,s),h+t),g.Q.value=r;let x=g;if(u>0){let y=d.createBiquadFilter();y.type="highpass",y.frequency.value=u,g.connect(y),x=y}let p=this._env(o,a,t,h);x.connect(p);let m=this._pan(l);m?(p.connect(m),this._out(m,.3)):this._out(p,.3),f.connect(g),f.start(h),f.stop(h+t+a+.05)}_osc({type:t="sine",f0:e=440,f1:i=null,dur:s=.5,gain:r=.1,attack:o=.01,pan:a=0,delay:l=0,curve:c=[],wet:u=.35}){if(!this.ctx)return;let d=this.ctx,h=d.currentTime+l,f=d.createOscillator();f.type=t,f.frequency.setValueAtTime(e,h),i!==null&&f.frequency.exponentialRampToValueAtTime(Math.max(20,i),h+s);for(let[p,m]of c)f.frequency.setValueAtTime(m,h+p);let g=this._env(r,o,s,h);f.connect(g);let x=this._pan(a);x?(g.connect(x),this._out(x,u)):this._out(g,u),f.start(h),f.stop(h+s+o+.05)}footstep(t="wood"){t===!0&&(t="tatami"),t===!1&&(t="wood"),t==="tatami"?(this._noise({dur:.08,type:"lowpass",freq:300,gain:.06,attack:.004}),this._noise({dur:.05,type:"bandpass",freq:130,q:1.2,gain:.035,attack:.003})):t==="concrete"?(this._noise({dur:.07,type:"bandpass",freq:430,q:1.8,gain:.09,attack:.002,hp:120}),this._noise({dur:.04,type:"highpass",freq:1600,gain:.012,attack:.001})):(this._noise({dur:.09,type:"bandpass",freq:190,q:1.4,gain:.085,attack:.003,hp:60}),this._noise({dur:.04,type:"bandpass",freq:800,q:2,gain:.014,attack:.001}),Math.random()<.12&&this.woodenCreak())}runStep(t="wood"){let e=t==="concrete"?320:t==="tatami"?130:dt(220,300);this._noise({dur:.08,type:t==="tatami"?"lowpass":"bandpass",freq:e,q:1.5,gain:.11,attack:.003})}doorOpen(){let t=Lt(Math.random()*1e9|0);this._osc({type:"sawtooth",f0:70,f1:150,dur:.8,gain:.05,attack:.1,curve:[[.1,92],[.3,78],[.5,118],[.7,84]]}),this._noise({dur:.7,type:"bandpass",freq:300,freqEnd:900,q:6,gain:.03,attack:.06})}doorClose(){this._osc({type:"sawtooth",f0:140,f1:62,dur:.35,gain:.05,attack:.02}),this._noise({dur:.12,type:"lowpass",freq:800,gain:.1,attack:.002})}doorSlam(){this._noise({dur:.4,type:"lowpass",freq:500,gain:.5,attack:.002}),this._osc({type:"sine",f0:70,f1:38,dur:.5,gain:.28,attack:.002})}woodenCreak(){this._osc({type:"sawtooth",f0:dt(90,130),f1:dt(50,80),dur:1.4,gain:.03,attack:.4,curve:[[.3,110],[.7,92],[1.1,64]]})}sting(){if(!this.ctx)return;let t=[110,116.5,220,233,466];for(let e of t)this._osc({type:"sawtooth",f0:e*.97,f1:e*.94,dur:1.5,gain:.055,attack:.008});this._noise({dur:.7,type:"lowpass",freq:1600,gain:.22,attack:.004}),this._osc({type:"sine",f0:880,f1:60,dur:1.2,gain:.05,attack:.004})}scareBurst(){this._noise({dur:.9,type:"bandpass",freq:3e3,q:.6,gain:.5,attack:.002}),this._osc({type:"square",f0:180,f1:40,dur:.9,gain:.16,attack:.002})}whisper(t=0,e=1.8){if(!this.ctx)return;let i=5,s=dt(900,1500);for(let r=0;r<i;r++)this._noise({dur:e/i+.05,type:"bandpass",freq:s+Math.sin(r*1.7)*500+dt(-200,200),q:9,gain:.05+Math.random()*.03,attack:.06,pan:t,delay:r*e/i});this._noise({dur:e,type:"bandpass",freq:500,q:1,gain:.02,attack:.3,pan:t})}moan(t=0){let e=Lt(Math.random()*1e9|0),i=[];for(let s=0;s<=2.2;s+=.2)i.push([s,150-s*30+Math.sin(s*6)*18]);this._osc({type:"sine",f0:160,f1:80,dur:2.2,gain:.055,attack:.5,pan:t,curve:i}),this._noise({dur:2.2,type:"bandpass",freq:700,q:4,gain:.015,attack:.4,pan:t})}bell(){this._osc({type:"sine",f0:1568,f1:1500,dur:1.1,gain:.06,attack:.004}),this._osc({type:"sine",f0:2093,f1:1980,dur:.7,gain:.03,attack:.004})}phoneRing(){if(!this.ctx||this._phoneTimer)return;let t=()=>{this._osc({type:"square",f0:25,dur:.9,gain:.05,attack:.01}),this._osc({type:"square",f0:20,dur:.9,gain:.03,attack:.01})};t();let e=1;this._phoneTimer=setInterval(()=>{t(),++e>=4&&(clearInterval(this._phoneTimer),this._phoneTimer=null)},1900)}phoneStop(){this._phoneTimer&&(clearInterval(this._phoneTimer),this._phoneTimer=null)}heartbeat(t,e=1){if(!this.ctx)return;if(!t){this._hbTimer&&(clearInterval(this._hbTimer),this._hbTimer=null);return}if(this._hbTimer)return;let i=r=>{this._osc({type:"sine",f0:58,f1:40,dur:.14,gain:.5*r,attack:.006})},s=()=>{i(e),setTimeout(()=>i(e*.7),180)};s(),this._hbTimer=setInterval(s,850)}thud(){this._osc({type:"sine",f0:48,f1:30,dur:.25,gain:.4,attack:.004}),this._noise({dur:.12,type:"lowpass",freq:300,gain:.12,attack:.002})}clatter(){for(let t=0;t<4;t++)this._noise({dur:.06,type:"bandpass",freq:dt(900,2400),q:3,gain:.05,attack:.001,delay:t*.09})}paperRustle(){this._noise({dur:.5,type:"bandpass",freq:2200,q:1.5,gain:.06,attack:.03})}ending(){[220,261.6,329.6,220].forEach((e,i)=>{this._osc({type:"sine",f0:e,dur:5,gain:.04,attack:1.4,delay:i*.9}),this._osc({type:"triangle",f0:e*2.01,dur:5,gain:.012,attack:1.4,delay:i*.9})})}cry(t=0){let e=Lt(Math.random()*1e9|0),i=[];for(let s=0;s<=2.4;s+=.2)i.push([s,520+Math.sin(s*5.2)*60+e()*30]);this._osc({type:"sine",f0:540,f1:480,dur:2.4,gain:.035,attack:.35,pan:t,curve:i}),this._noise({dur:2.4,type:"bandpass",freq:900,q:5,gain:.012,attack:.3,pan:t})}childGiggle(t=0){let e=Lt(Math.random()*1e9|0),i=[];for(let s=0;s<=1.1;s+=.1)i.push([s,720+Math.sin(s*9)*90+e()*45]);this._osc({type:"sine",f0:720,f1:780,dur:1.1,gain:.028,attack:.02,pan:t,curve:i}),this._osc({type:"sine",f0:1440,f1:1520,dur:.7,gain:.008,attack:.02,pan:t}),this._noise({dur:.8,type:"bandpass",freq:2400,q:6,gain:.006,attack:.05,pan:t})}breath(t=0,e=3.2){if(!this.ctx)return;let i=2;for(let s=0;s<i;s++)this._noise({dur:e/i,type:"bandpass",freq:300,freqEnd:420,q:2,gain:.07,attack:e/i*.5,pan:t,delay:s*(e/i)})}knock(t=3){for(let e=0;e<t;e++)this._osc({type:"sine",f0:90,f1:50,dur:.18,gain:.22,attack:.002,delay:e*.34,pan:dt(-.4,.4)}),this._noise({dur:.06,type:"lowpass",freq:400,gain:.1,attack:.001,delay:e*.34,pan:dt(-.4,.4)})}ceilingSteps(){for(let t=0;t<5;t++)this._osc({type:"sine",f0:60,f1:38,dur:.16,gain:.12,attack:.004,delay:t*.42,pan:dt(-.6,.6)})}drip(){this._osc({type:"sine",f0:1400,f1:420,dur:.12,gain:.05,attack:.002}),this._noise({dur:.04,type:"bandpass",freq:2200,q:4,gain:.03,attack:.001,delay:.08})}musicBox(){[659.25,587.33,493.88,587.33,659.25,587.33,493.88,440].forEach((e,i)=>{this._osc({type:"sine",f0:e,dur:1.2,gain:.038,attack:.004,delay:i*.42}),this._osc({type:"sine",f0:e*2.003,dur:1.2,gain:.008,attack:.004,delay:i*.42})})}radio(){if(!this.ctx)return;this._noise({dur:.5,type:"bandpass",freq:400,freqEnd:1200,q:8,gain:.08,attack:.02}),this._noise({dur:2.2,type:"bandpass",freq:700,q:3,gain:.04,attack:.1,delay:.5,pan:dt(-.5,.5)});let t=Lt(Math.random()*1e9|0);for(let e=0;e<6;e++)this._noise({dur:.16,type:"bandpass",freq:300+t()*600,q:10,gain:.05,attack:.02,delay:.7+e*.22,pan:dt(-.4,.4)});this._noise({dur:.3,type:"bandpass",freq:2e3,freqEnd:500,q:5,gain:.05,attack:.01,delay:2.4})}scrape(){this._noise({dur:1.1,type:"bandpass",freq:1300,q:8,gain:.045,attack:.08,hp:300}),this._osc({type:"sawtooth",f0:420,f1:380,dur:1.1,gain:.02,attack:.08})}siren(t=0){if(this.ctx)for(let e=0;e<2;e++)this._osc({type:"sine",f0:660+e*4,f1:875+e*4,dur:3,gain:.011,attack:1.4,pan:t,wet:.6}),this._osc({type:"sine",f0:875+e*4,f1:660+e*4,dur:3,gain:.011,attack:1.4,pan:t,wet:.6,delay:3.1})}hammer(t=0){if(this.ctx)for(let e=0;e<3;e++)this._osc({type:"triangle",f0:132-e*14,f1:58,dur:.09,gain:.085,attack:.003,pan:t,delay:e*.19}),this._noise({dur:.05,type:"bandpass",freq:2300,q:3,gain:.018,attack:.002,pan:t,delay:e*.19})}washer(t=0){if(this.ctx){this._osc({type:"sawtooth",f0:52,f1:58,dur:5.5,gain:.026,attack:1.2,pan:t,wet:.5}),this._noise({dur:5.5,type:"bandpass",freq:320,q:2,gain:.018,attack:1.2,pan:t,wet:.5});for(let e=0;e<9;e++)this._osc({type:"sine",f0:46,dur:.07,gain:.05,attack:.004,pan:t,delay:1.4+e*.42})}}chime(t=0){if(!this.ctx)return;let e=[1975,2349,2637,3136],i=Lt(Math.random()*1e9|0),s=0,r=3+(i()*3|0);for(let o=0;o<r;o++){let a=e[i()*e.length|0];this._osc({type:"sine",f0:a,dur:1.5,gain:.028,attack:.004,pan:t,delay:s,wet:.5}),this._osc({type:"sine",f0:a*2.76,dur:.8,gain:.006,attack:.004,pan:t,delay:s,wet:.5}),s+=.18+i()*.85}}duck(){this.master&&(this.master.gain.setTargetAtTime(this.volume*.18,this.ctx.currentTime,.02),setTimeout(()=>this.setVolume(this.volume),350))}setVolume(t){this.volume=Qt(t,0,1),this.master&&this.master.gain.setTargetAtTime(this.paused?this.volume*.12:this.volume,this.ctx.currentTime,.05)}setPaused(t){this.paused=t,this.setVolume(this.volume)}puzzleTone(t){this._osc({type:"sine",f0:[0,261.63,329.63,392,523.25][t],dur:.9,gain:.1,attack:.005,wet:.45})}switchClick(){this._noise({dur:.03,type:"bandpass",freq:2400,q:3,gain:.07,attack:.001}),this._osc({type:"square",f0:240,f1:140,dur:.05,gain:.04,attack:.001})}buzz(){this._osc({type:"sawtooth",f0:118,f1:124,dur:.5,gain:.035,attack:.02,wet:.2}),this._osc({type:"sawtooth",f0:236,f1:248,dur:.5,gain:.012,attack:.02,wet:.2})}thunder(t=.5){let e=Qt(t,0,1),i=.1+e*.4,s=.5-e*.32;this._noise({dur:.5+e*1.6,type:"lowpass",freq:420-e*250,gain:s*.7,attack:.02+e*.25,delay:i,wet:.6}),this._noise({dur:.25,type:"lowpass",freq:900,gain:s*.5,attack:.004,delay:i+.05+e*.2,wet:.6}),this._osc({type:"sine",f0:54,f1:30,dur:1.6+e,gain:s*.5,attack:.05,delay:i,wet:.5})}updateMusic(t,e,i){if(this.ctx){if(i&&!this.chaseOn&&(this.chaseOn=!0,this.chasePulse=0,this.chaseBar=0),!i&&this.chaseOn&&(this.chaseOn=!1),this.musNext-=t,this.musNext<=0){this.musNext=dt(9,16)-e*6;let s=110,r=[1,6/5,4/3,3/2,8/5],o=s*r[Math.random()*r.length|0]*(Math.random()<.4?2:1);this._osc({type:"sine",f0:o,dur:dt(4,7),gain:.028+e*.02,attack:1.6,wet:.85}),this._osc({type:"sine",f0:o*2.002,dur:dt(4,7),gain:.008+e*.006,attack:2.2,wet:.85}),e>.45&&Math.random()<.5&&this._osc({type:"sine",f0:o*16/15,dur:dt(3,5),gain:.014,attack:2.4,wet:.9}),e>.7&&Math.random()<.35&&this._osc({type:"sawtooth",f0:o/2,dur:3,gain:.008,attack:1.2,wet:.9})}if(this.chaseOn&&(this.chasePulse-=t,this.chasePulse<=0&&(this.chasePulse=.21,this._osc({type:"square",f0:this.chaseBar%2?58:55,dur:.1,gain:.05,attack:.002,wet:.15})),this.chaseBar-=t,this.chaseBar<=0)){this.chaseBar=1.68;for(let s of[220,233.1,311.1])this._osc({type:"sawtooth",f0:s*.985,f1:s*.94,dur:1.4,gain:.016,attack:.03,wet:.7})}}}lullaby(){let t=[659.25,587.33,493.88,587.33,659.25,493.88,440,0,493.88,587.33,659.25,587.33,493.88,440],e=0;for(let i of t)i>0&&(this._osc({type:"sine",f0:i,dur:1.4,gain:.026,attack:.008,delay:e,wet:.8}),this._osc({type:"sine",f0:i*2.003,dur:1.4,gain:.006,attack:.008,delay:e,wet:.8})),e+=.56}};function Mn(n,t,e){let i=Math.min(.018,n/7,t/7,e/7),s=new gn;s.moveTo(-n/2+i,-e/2+i),s.lineTo(n/2-i,-e/2+i),s.lineTo(n/2-i,e/2-i),s.lineTo(-n/2+i,e/2-i),s.closePath();let r=new is(s,{depth:t-2*i,bevelEnabled:!0,bevelSize:i,bevelThickness:i,bevelSegments:2,curveSegments:1,steps:1});return r.rotateX(-Math.PI/2),r.translate(0,i-t/2,0),r}function Xg(n,t,e=!1){let i=Lt(t),s=256,r=Array.from({length:3},()=>{let a=document.createElement("canvas");return a.width=a.height=s,a}),o=r.map(a=>a.getContext("2d").createImageData(s,s));for(let a=0;a<s;a++)for(let l=0;l<s;l++){let c=(a*s+l)*4,u=(i()-.5)*18,d=e?Math.sin(l*.24+Math.sin(a*.024)*1.7)*8+Math.sin(l*.73)*2:0,h=i()<.015?-26:0;for(let f=0;f<3;f++)o[0].data[c+f]=n[f]+u+d+h,o[1].data[c+f]=128+u*2+d*1.5+h*2,o[2].data[c+f]=218+u;for(let f of o)f.data[c+3]=255}return r.map((a,l)=>{a.getContext("2d").putImageData(o[l],0,0);let c=new li(a);return c.wrapS=c.wrapT=Ei,c.colorSpace=l===0?pe:ze,c.anisotropy=8,c})}function En(n){if(n.detailMaterials)return n.detailMaterials;let t=(e,i,s,r)=>{let[o,a,l]=Xg(e,i,s);return new Ie({map:o,bumpMap:a,roughnessMap:l,bumpScale:r,roughness:.96})};return n.detailMaterials={wood:t([100,76,51],771,!0,.012),concrete:t([133,132,119],772,!1,.018),paint:t([85,105,93],773,!1,.006),plaster:t([174,166,143],774,!1,.012),iron:new Ie({color:5793633,roughness:.63,metalness:.38}),brass:new Ie({color:9599563,roughness:.53,metalness:.52}),rubber:new Ie({color:2435881,roughness:.68}),enamel:new Ie({color:11976372,roughness:.52,metalness:.08}),darkGlass:new Ie({color:2241326,roughness:.17,metalness:.24})},n.detailMaterials}function Vh(n,t,e,i,s,r=n.scene){let o=En(n),a=new Vt;a.position.set(t,e,i),r.add(a);let l=(d,h,f,g,x,p,m)=>{let y=new $(Mn(d,h,f),g);return y.position.set(x,p,m),a.add(y),y};l(.75,.07,.25,o.iron,0,0,0);let c=new Je({color:s}),u=l(.57,.045,.19,c,0,-.06,0);for(let d=0;d<15;d++)l(.008,.008,.18,o.enamel,-.27+d*.038,-.087,0);for(let d of[-1,1]){l(.065,.1,.27,o.enamel,d*.335,-.025,0);for(let h of[-.085,.085]){let f=new $(new Tt(.01,.01,.007,8),o.brass);f.position.set(d*.335,-.079,h),a.add(f)}}return{group:a,diffuser:u}}function pl(n,{x0:t,x1:e,z0:i,z1:s,base:r,height:o,gapX:a=null,leftDoor:l=null}){let c=En(n),u={collide:!1,cast:!1,geo:{jitter:0,ao:"none"}};for(let h=0;h<o/2.8;h++){let f=r+h*2.8;for(let p of[t+.12,e-.12]){let m=l&&p<t+.2&&Math.abs(f-l.y)<.01?[[i,l.gap[0]],[l.gap[1],s]]:[[i,s]];for(let[y,_]of m)n.box(p,(y+_)/2,f,.025,_-y,1.15,c.paint,u),n.box(p,(y+_)/2,f+1.15,.036,_-y,.035,c.iron,u),n.box(p,(y+_)/2,f,.04,_-y,.14,c.rubber,u)}n.box((t+e)/2,s-.12,f,e-t,.025,1.15,c.paint,u),n.box((t+e)/2,s-.12,f,e-t,.04,.14,c.rubber,u);let g=a?[[t,a[0]],[a[1],e]]:[[t,e]];for(let[p,m]of g)m>p&&n.box((p+m)/2,i+.12,f,m-p,.025,1.15,c.paint,u);let x=new $(new Tt(.019,.019,2.5,10),c.iron);x.position.set(e-.16,f+1.4,s-.4),n.scene.add(x);for(let p of[.35,1.15,2.25])n.box(e-.15,s-.4,f+p,.035,.1,.04,c.brass,u);n.box(e-.17,s-1.1,f+1.2,.12,.38,.46,c.iron,u),n.box(e-.24,s-1.1,f+1.24,.018,.32,.38,c.paint,u)}let d=Lt(817);for(let h=0;h<34;h++){let f=r+.18+d()*(o-.4),g=i+.7+d()*(s-i-1.4),x=.04+d()*.22,p=.1+d()*.48;if(l&&g>l.gap[0]-.2&&g<l.gap[1]+.2&&f>l.y-.5&&f<l.y+2.2)continue;let m=h%3?c.plaster:c.rubber;n.box(t+.137,g,f,.006,x,p,m,u)}}function Wh(n,t,e,i,s){let r=En(n),o=new Vt;s==="z"&&(o.rotation.y=-Math.PI/2),t.add(o);let a=(l,c,u,d,h)=>{let f=new $(l,c);return f.position.set(u,d,h),o.add(f),f};for(let l of[-1,1]){for(let u of[-i*.23,i*.16]){let d=e*.7,h=i*.32;for(let f of[-d/2,d/2])a(Mn(.018,h,.012),r.wood,f,u,l*.036);for(let f of[u-h/2,u+h/2])a(Mn(d,.018,.012),r.wood,0,f,l*.036)}a(Mn(.085,.17,.014),r.brass,e/2-.09,i*.04,l*.04);let c=a(new Tt(.012,.012,.13,12),r.brass,e/2-.145,i*.04,l*.075);c.rotation.z=Math.PI/2}for(let l of[-i*.34,0,i*.34])a(new Tt(.014,.014,.12,12),r.iron,-e/2+.016,l,0)}function te(n,t){let e=document.createElement("canvas");return e.width=n,e.height=t,e}function me(n,t,{r:e=255,g:i=255,b:s=255,amp:r=18,scale:o=1,base:a=null}){let l=n.data,c=n.width,u=n.height;for(let d=0;d<u;d++)for(let h=0;h<c;h++){let f=(d*c+h)*4,g=(t()-.5)*2*r*o,x=a?a[f]:0,p=a?x:e;l[f]=Math.max(0,Math.min(255,p+g)),l[f+1]=Math.max(0,Math.min(255,(a?a[f+1]:i)+g)),l[f+2]=Math.max(0,Math.min(255,(a?a[f+2]:s)+g)),l[f+3]=255}return n}function Hs(n,t,e,i=4,s=[120,118,110]){let r=n.data,o=n.width,a=n.height,l=[];for(let c=0;c<i;c++){let u=2<<c,d=2<<c,h=new Float32Array(u*d);for(let f=0;f<h.length;f++)h[f]=t();l.push({g:h,gw:u,gh:d})}for(let c=0;c<a;c++)for(let u=0;u<o;u++){let d=0,h=0;for(let g=0;g<i;g++){let{g:x,gw:p,gh:m}=l[g],y=u/o*p,_=c/a*m,v=Math.floor(y)%p,S=Math.floor(_)%m,b=(v+1)%p,R=(S+1)%m,U=y-Math.floor(y),M=_-Math.floor(_),E=U*U*(3-2*U),z=M*M*(3-2*M),Y=x[S*p+v]*(1-E)*(1-z)+x[S*p+b]*E*(1-z)+x[R*p+v]*(1-E)*z+x[R*p+b]*E*z;d+=Y/(g+1),h+=1/(g+1)}d/=h;let f=(c*o+u)*4;r[f]=s[0]+(d-.5)*2*e,r[f+1]=s[1]+(d-.5)*2*e,r[f+2]=s[2]+(d-.5)*2*e,r[f+3]=255}}function vo(n,t,e,i,s,r=.14,o=2){n.save(),n.globalAlpha=r,n.fillStyle=s;for(let a=o;a>=0;a--)n.beginPath(),n.ellipse(t+(Math.random()-.5)*i*.7,e+(Math.random()-.5)*i*.7,i*(a+.6)/o*.55,i*(a+.6)/o*.4,Math.random()*3,0,Math.PI*2),n.fill();n.restore()}function ge(n,t,e,i,s,r){for(let o=0;o<s;o++)vo(n,r()*t,r()*e,4+r()*16,i,.05+r()*.12,3)}function _l(n,t,e,i,s=7,r="rgba(20,18,14,0.5)"){n.strokeStyle=r,n.lineWidth=1;for(let o=0;o<s;o++){let a=i()*t,l=i()*e;n.beginPath(),n.moveTo(a,l);let c=3+(i()*5|0);for(let u=0;u<c;u++)a+=(i()-.5)*26,l+=(i()-.5)*26,n.lineTo(a,l);n.stroke()}}function ee(n,t=!0){let e=new li(n);return e.magFilter=je,e.minFilter=gi,e.generateMipmaps=!0,e.anisotropy=16,e.colorSpace=pe,t&&(e.wrapS=Ei,e.wrapT=Ei),e}function qg(n,t=!1){let e=new li(n);return e.magFilter=ke,e.minFilter=ke,e.generateMipmaps=!1,e.colorSpace=ze,t&&(e.wrapS=Ei,e.wrapT=Ei),e}function Yg(n){let t=te(128,128),e=t.getContext("2d"),i=e.createImageData(128,128);Hs(i,n,14,4,[150,147,136]),e.putImageData(i,0,0),ge(e,128,128,"#3a3f33",26,n),ge(e,128,128,"#6f735a",14,n);for(let s=0;s<8;s++){let r=n()*128,o=n()*128,a=6+n()*14;e.fillStyle="rgba(70,74,62,0.35)",e.beginPath(),e.ellipse(r,o,a,a*.7,n(),0,7),e.fill(),e.strokeStyle="rgba(220,215,195,0.25)",e.lineWidth=1.5,e.beginPath(),e.ellipse(r,o,a,a*.7,n(),0,7),e.stroke()}return _l(e,128,128,n,6),ee(t)}function Zg(n){let t=te(256,512),e=t.getContext("2d");e.fillStyle="#6f6a5e",e.fillRect(0,0,256,512);for(let o=0;o<256;o+=32)e.fillStyle=o/32%2?"#6c675c":"#716c61",e.fillRect(o,0,32,512),e.fillStyle="rgba(52,56,46,0.18)",e.fillRect(o+15,0,3,512);let i=e.getImageData(0,0,256,512);me(i,n,{amp:8,base:i.data.slice()}),e.putImageData(i,0,0),ge(e,256,512,"#3d4234",60,n);let s=80+n()*240;e.fillStyle="#5f5c52",e.fillRect(0,s,256,36+n()*60);let r=e.getImageData(0,s,256,80);return me(r,n,{amp:12,base:r.data.slice()}),e.putImageData(r,0,s),e.fillStyle="rgba(40,36,30,0.45)",e.fillRect(0,s-3,256,3),e.fillRect(0,s+78,256,3),_l(e,256,512,n,6),ee(t)}function gl(n,t=128,e=128,i=[86,66,46],s=!1){let r=te(t,e),o=r.getContext("2d");o.fillStyle=`rgb(${i[0]},${i[1]},${i[2]})`,o.fillRect(0,0,t,e);let a=4;for(let c=0;c<a;c++)o.fillStyle=`rgba(${i[0]-14},${i[1]-12},${i[2]-10},0.55)`,s?o.fillRect(0,e/a*c,t,1):o.fillRect(t/a*c,0,1,e),o.fillStyle="rgba(255,235,200,0.04)",s?o.fillRect(0,e/a*c+1,t,1):o.fillRect(t/a*c+1,0,1,e);let l=o.getImageData(0,0,t,e);me(l,n,{amp:10,base:l.data.slice()}),o.putImageData(l,0,0),o.strokeStyle="rgba(50,36,22,0.25)";for(let c=0;c<26;c++){if(o.beginPath(),s){let u=n()*e;o.moveTo(0,u),o.bezierCurveTo(t*.3,u+(n()-.5)*6,t*.7,u+(n()-.5)*6,t,u)}else{let u=n()*t;o.moveTo(u,0),o.bezierCurveTo(u+(n()-.5)*6,e*.3,u+(n()-.5)*6,e*.7,u,e)}o.stroke()}return ge(o,t,e,"#2c2118",14,n),ee(r)}function Jg(n){let t=te(128,256),e=t.getContext("2d");e.drawImage(gl(n,128,256,[92,70,48],!0).image,0,0),e.strokeStyle="rgba(30,22,14,0.6)",e.lineWidth=3;for(let[i,s]of[[18,92],[146,92]])e.strokeRect(14,i,100,s),e.strokeStyle="rgba(255,240,210,0.08)",e.strokeRect(16,i+2,96,s-4),e.strokeStyle="rgba(30,22,14,0.6)";return e.fillStyle="#8a7a3a",e.beginPath(),e.arc(104,150,5,0,7),e.fill(),e.fillStyle="rgba(0,0,0,0.35)",e.beginPath(),e.arc(104,152,3,0,7),e.fill(),ge(e,128,256,"#241a10",12,n),ee(t)}function Kg(n){let t=te(128,128),e=t.getContext("2d");e.fillStyle="#a3a05a",e.fillRect(0,0,128,128);let i=e.getImageData(0,0,128,128);me(i,n,{amp:12,base:i.data.slice()}),e.putImageData(i,0,0),e.strokeStyle="rgba(96,94,48,0.35)",e.lineWidth=1;for(let s=0;s<128;s+=6)e.beginPath(),e.moveTo(0,s),e.lineTo(128,s),e.stroke();return e.strokeStyle="rgba(60,58,30,0.5)",e.lineWidth=1.5,e.strokeRect(1,1,126,126),ge(e,128,128,"#4a4a2c",10,n),ee(t)}function $g(n){let t=te(128,128),e=t.getContext("2d");e.fillStyle="#9a9a92",e.fillRect(0,0,128,128);let i=e.getImageData(0,0,128,128);return me(i,n,{amp:8,base:i.data.slice()}),e.putImageData(i,0,0),e.strokeStyle="rgba(60,60,56,0.5)",e.strokeRect(0,0,128,128),e.strokeRect(64,64,64,64),vo(e,40+n()*40,30+n()*30,26,"#5c5a3e",.22,4),vo(e,90,90,18,"#666448",.16,3),ee(t)}function jg(n){let t=te(128,128),e=t.getContext("2d"),i=e.createImageData(128,128);return Hs(i,n,16,4,[92,92,94]),e.putImageData(i,0,0),ge(e,128,128,"#2f3236",30,n),_l(e,128,128,n,10,"rgba(25,25,28,0.6)"),ee(t)}function Qg(n){let t=te(128,128),e=t.getContext("2d"),i=e.createImageData(128,128);Hs(i,n,10,4,[74,78,82]),e.putImageData(i,0,0),ge(e,128,128,"#7a4a26",22,n),ge(e,128,128,"#a2622e",12,n),e.strokeStyle="rgba(200,205,210,0.2)";for(let s=0;s<10;s++){e.beginPath();let r=n()*128,o=n()*128;e.moveTo(r,o),e.lineTo(r+(n()-.5)*30,o+(n()-.5)*30),e.stroke()}return ee(t)}function t1(n,t=256,e=320){let i=te(t,e),s=i.getContext("2d");s.fillStyle="#c9bd9c",s.fillRect(0,0,t,e);let r=s.getImageData(0,0,t,e);return me(r,n,{amp:9,base:r.data.slice()}),s.putImageData(r,0,0),ge(s,t,e,"#8a7c58",16,n),s.strokeStyle="rgba(90,80,55,0.4)",s.lineWidth=1,s.beginPath(),s.moveTo(0,e/2),s.lineTo(t,e/2),s.stroke(),ee(i)}function ml(n,t,e,i,s,r,o){let a=Lt(o);for(let l=0;l<r;l++){let c=t,u=i*(.7+a()*.3);for(;c<t+u;){let d=3+a()*4;n.fillRect(c,e+l*s,d,s*.62),c+=d+2}}}function e1(n){let t=te(256,320),e=t.getContext("2d");e.fillStyle="#b0a892",e.fillRect(0,0,256,320);let i=e.getImageData(0,0,256,320);return me(i,n,{amp:7,base:i.data.slice()}),e.putImageData(i,0,0),e.fillStyle="#26241e",e.fillRect(10,12,236,30),e.fillStyle="#b0a892",e.font="bold 20px serif",e.fillText("\u25EF\u25EF\u30A2\u30D1\u30FC\u30C8\u4E00\u5BB6\u5931\u8E2A",16,34),e.fillStyle="#26241e",ml(e,12,52,160,10,6,42),e.strokeStyle="#26241e",e.lineWidth=2,e.strokeRect(178,52,66,62),e.fillStyle="#6b675a",e.fillRect(182,56,58,54),e.fillStyle="#26241e",ml(e,12,128,232,10,14,99),ml(e,12,280,232,10,2,131),ge(e,256,320,"#7d7460",10,n),ee(t)}function i1(n){let t=te(256,320),e=t.getContext("2d");e.fillStyle="#bdb28f",e.fillRect(0,0,256,320);let i=e.getImageData(0,0,256,320);return me(i,n,{amp:8,base:i.data.slice()}),e.putImageData(i,0,0),e.fillStyle="#2a2620",e.font="16px serif",["\u307E\u305F\u591C\u4E2D\u306B\u7269\u97F3\u304C\u3059\u308B\u3002","3\u53F7\u5BA4\u306E\u5BB6\u65CF\u304C\u6D88\u3048\u3066\u304B\u3089\u3001","\u305A\u3063\u3068\u3060\u3002","","\u3042\u306E\u5B50\u3060\u3051\u304C\u3001\u307E\u3060","\u3053\u3053\u306B\u3044\u308B\u6C17\u304C\u3059\u308B\u3002","","\u7384\u95A2\u306E\u30C9\u30A2\u306F\u3001\u3082\u3046","\u958B\u304B\u306A\u3044\u3002"].forEach((r,o)=>{r&&e.fillText(r,24,46+o*30)}),ge(e,256,320,"#8a7c58",12,n),ee(t)}function n1(n){let t=te(256,320),e=t.getContext("2d");e.fillStyle="#c4b896",e.fillRect(0,0,256,320);let i=e.getImageData(0,0,256,320);me(i,n,{amp:8,base:i.data.slice()}),e.putImageData(i,0,0),e.lineWidth=4;let s=(r,o,a,l)=>{e.strokeStyle=l,e.beginPath(),e.arc(r,o-a,12,0,7),e.stroke(),e.beginPath(),e.moveTo(r,o-a+12),e.lineTo(r,o),e.stroke(),e.beginPath(),e.moveTo(r,o-a+20),e.lineTo(r-16,o-a+36),e.stroke(),e.beginPath(),e.moveTo(r,o-a+20),e.lineTo(r+16,o-a+36),e.stroke(),e.beginPath(),e.moveTo(r,o-4),e.lineTo(r-12,o+22),e.stroke(),e.beginPath(),e.moveTo(r,o-4),e.lineTo(r+12,o+22),e.stroke()};s(50,120,66,"#3a3f8a"),s(96,132,56,"#8a3a3a"),s(140,124,62,"#3a7a4a"),s(186,132,40,"#8a6a3a"),e.strokeStyle="#141210",e.lineWidth=8,e.beginPath(),e.moveTo(214,30),e.lineTo(214,60),e.stroke(),e.beginPath(),e.moveTo(214,34),e.lineTo(204,58),e.stroke(),e.beginPath(),e.moveTo(214,34),e.lineTo(226,60),e.stroke(),e.beginPath(),e.moveTo(214,60),e.lineTo(214,132),e.stroke(),e.beginPath(),e.moveTo(214,132),e.lineTo(200,158),e.stroke(),e.beginPath(),e.moveTo(214,132),e.lineTo(228,158),e.stroke(),e.strokeStyle="rgba(160,20,20,0.8)",e.lineWidth=5;for(let r=0;r<14;r++)e.beginPath(),e.moveTo(n()*256,160+n()*100),e.lineTo(n()*256,160+n()*100),e.stroke();return e.fillStyle="#2a2620",e.font="15px serif",e.fillText("\u304A\u304B\u3042\u3055\u3093 \u3069\u3053\uFF1F",18,236),e.fillText("\u305B\u306E\u305F\u304B\u3044 \u304F\u308D\u3044\u3072\u3068\u304C",18,262),e.fillText("\u3088\u308B\u306B\u306A\u308B\u3068 \u307F\u3066\u308B",18,288),ge(e,256,320,"#8a7c58",8,n),ee(t)}function s1(n,t=256,e=256){let i=te(t,e),s=i.getContext("2d");s.clearRect(0,0,t,e);let r=(a,l,c)=>{s.fillStyle="#5c0e0c";for(let u=0;u<5;u++){let d=n()*Math.PI*2,h=n()*c*.7;s.beginPath(),s.ellipse(a+Math.cos(d)*h,l+Math.sin(d)*h,c*(.3+n()*.5),c*(.2+n()*.4),n()*3,0,7),s.fill()}s.beginPath(),s.ellipse(a,l,c,c*.7,n(),0,7),s.fill(),s.fillStyle="#4a0b09";for(let u=0;u<3;u++){let d=a+(n()-.5)*c*1.4;s.fillRect(d,l+c*.5,3,14+n()*30)}};for(let a=0;a<9;a++)r(n()*t,n()*e,8+n()*22);let o=ee(i);return o.colorSpace=ze,o}function r1(n){let t=te(128,128),e=t.getContext("2d");e.clearRect(0,0,128,128),e.fillStyle="#4a0b09",e.beginPath(),e.ellipse(56,78,22,30,.25,0,7),e.fill();let i=[[30,40],[46,30],[62,26],[76,32],[88,46]];for(let[o,a]of i)e.beginPath(),e.ellipse(o,a,6.5,15,o<60?-.35:.3,0,7),e.fill();let s=e.getImageData(0,0,128,128);for(let o=0;o<2600;o++){let a=n()*128|0,l=n()*128|0;s.data[(l*128+a)*4+3]>0&&(s.data[(l*128+a)*4]+=12)}e.putImageData(s,0,0);let r=ee(t);return r.colorSpace=ze,r}function o1(n){let t=te(128,160),e=t.getContext("2d");e.fillStyle="#8f8f8a",e.fillRect(0,0,128,160);let i=e.getImageData(0,0,128,160);me(i,n,{amp:10,base:i.data.slice()}),e.putImageData(i,0,0);for(let s of[34,64,94])e.fillStyle="rgba(52,50,44,0.55)",e.beginPath(),e.ellipse(s,84,11,15,0,0,7),e.fill(),e.beginPath(),e.ellipse(s,118,14,20,0,0,7),e.fill();e.fillStyle="rgba(30,28,24,0.5)";for(let s of[34,64,94])e.fillRect(s-7,78,14,8);return e.fillStyle="#c9bd9c",e.beginPath(),e.moveTo(128,0),e.lineTo(112,0),e.lineTo(128,18),e.fill(),e.strokeStyle="rgba(40,36,30,0.6)",e.strokeRect(2,2,124,156),ee(t)}function a1(n){let t=te(64,64),e=t.getContext("2d");e.fillStyle="#d8d2c4",e.fillRect(0,0,64,64);let i=e.getImageData(0,0,64,64);return me(i,n,{amp:8,base:i.data.slice()}),e.putImageData(i,0,0),e.fillStyle="#151210",e.fillRect(16,24,8,8),e.fillRect(42,24,10,10),e.fillStyle="#5c0e0c",e.fillRect(41,22,13,3),e.strokeStyle="#3a1a16",e.lineWidth=2,e.beginPath(),e.moveTo(24,48),e.quadraticCurveTo(32,52,40,48),e.stroke(),e.strokeStyle="rgba(40,36,30,0.65)",e.beginPath(),e.moveTo(0,40),e.lineTo(14,34),e.lineTo(26,38),e.lineTo(30,26),e.stroke(),ee(t)}function l1(){let n=te(64,48),t=n.getContext("2d"),e=t.createImageData(64,48);for(let s=0;s<e.data.length;s+=4){let r=Math.random()*255|0;e.data[s]=r,e.data[s+1]=r,e.data[s+2]=r,e.data[s+3]=255}let i=Math.random()*48|0;for(let s=0;s<64;s++){let r=(i*64+s)*4;e.data[r]=220,e.data[r+1]=220,e.data[r+2]=220}return t.putImageData(e,0,0),qg(n)}function c1(n){let t=te(128,256),e=t.getContext("2d");e.fillStyle="#04070d",e.fillRect(0,0,128,256);let i=e.getImageData(0,0,128,256);return me(i,n,{amp:5,base:i.data.slice()}),e.putImageData(i,0,0),e.fillStyle="rgba(190,205,215,0.85)",e.beginPath(),e.arc(38,52,16,0,7),e.fill(),e.fillStyle="rgba(4,7,13,0.55)",e.beginPath(),e.arc(44,48,13,0,7),e.fill(),e.fillStyle="#0a0c10",e.fillRect(0,0,6,256),e.fillRect(122,0,6,256),e.fillRect(0,0,128,6),e.fillRect(0,250,128,6),e.fillRect(0,60,128,5),e.fillRect(0,128,128,5),e.fillRect(0,196,128,5),ee(t)}function h1(n){let t=te(128,256),e=t.getContext("2d");e.clearRect(0,0,128,256);for(let i=0;i<28;i++){let s=n()*128,r=n()*256,o=24+n()*64,a=.45+n()*.2;e.strokeStyle=`rgba(210,225,235,${.05+n()*.1})`,e.lineWidth=.5+n()*.7,e.beginPath(),e.moveTo(s,r),e.lineTo(s+o*a,r+o),e.stroke(),e.strokeStyle=`rgba(12,20,30,${.03+n()*.07})`,e.lineWidth=.4+n()*.5,e.beginPath(),e.moveTo(s+1.2,r),e.lineTo(s+1.2+o*a,r+o),e.stroke()}return ee(t,!1)}function u1(n){let t=te(128,256),e=t.getContext("2d");e.fillStyle="#b7ae8f",e.fillRect(0,0,128,256);let i=e.getImageData(0,0,128,256);return me(i,n,{amp:8,base:i.data.slice()}),e.putImageData(i,0,0),e.strokeStyle="#4a4230",e.lineWidth=4,e.strokeRect(3,3,122,250),e.lineWidth=2,e.strokeRect(12,12,104,112),e.strokeRect(12,132,104,112),e.fillStyle="rgba(40,36,26,0.6)",e.beginPath(),e.ellipse(34,240,18,12,.4,0,7),e.fill(),ge(e,128,256,"#7d745c",12,n),ee(t)}function d1(){let n=te(128,64),t=n.getContext("2d");t.fillStyle="#0a2a10",t.fillRect(0,0,128,64),t.fillStyle="#49d46a",t.font='bold 40px "Hiragino Kaku Gothic ProN", sans-serif',t.fillText("\u975E\u5E38\u53E3",14,46);let e=t.getImageData(0,0,128,64);return me(e,Lt(7),{amp:8,base:e.data.slice()}),t.putImageData(e,0,0),ee(n)}function f1(n){let t=te(256,128),e=t.getContext("2d"),i=e.createImageData(256,128);return Hs(i,n,12,4,[128,124,112]),e.putImageData(i,0,0),ge(e,256,128,"#4a4436",20,n),e.fillStyle="#8a1410",e.font="bold 30px serif",e.save(),e.translate(18,70),e.rotate(-.03),e.fillText("\u3053\u306E\u5ECA\u4E0B\u306F\u3001\u3069\u3053\u307E\u3067",0,0),e.restore(),e.save(),e.translate(40,106),e.rotate(.02),e.fillText("\u7D9A\u304F\u306E\u304B",0,0),e.restore(),ee(t)}function p1(n){let t=te(128,128),e=t.getContext("2d");e.fillStyle="#6e3a30",e.fillRect(0,0,128,128);let i=e.getImageData(0,0,128,128);me(i,n,{amp:12,base:i.data.slice()}),e.putImageData(i,0,0),e.fillStyle="#8a4a3a";for(let s=0;s<128;s+=32){let r=s/32%2?32:0;for(let o=-32+r;o<128;o+=64)e.fillRect(o,s,62,30)}e.strokeStyle="rgba(40,20,16,0.7)";for(let s=0;s<128;s+=32)e.fillRect(0,s,128,2);for(let s=0;s<128;s+=32){let r=s/32%2?32:0;for(let o=r;o<128;o+=64)e.fillRect(o,s,2,32)}return ge(e,128,128,"#2a1410",18,n),ee(t)}function m1(){let n=te(64,160),t=n.getContext("2d");t.fillStyle="#ddd6be",t.fillRect(0,0,64,160);let e=t.getImageData(0,0,64,160);return me(e,Lt(11),{amp:8,base:e.data.slice()}),t.putImageData(e,0,0),t.fillStyle="#9a1420",t.fillRect(26,20,12,120),t.strokeStyle="rgba(120,90,60,0.5)",t.strokeRect(1,1,62,158),ee(n)}function g1(n){let t=te(128,128),e=t.getContext("2d");e.fillStyle="#5a6270",e.fillRect(0,0,128,128);let i=e.getImageData(0,0,128,128);me(i,n,{amp:10,base:i.data.slice()}),e.putImageData(i,0,0),e.strokeStyle="rgba(30,34,44,0.7)";for(let s=0;s<=4;s++)e.fillRect(s*32-1,0,2,128),e.fillRect(0,s*32-1,128,2);e.fillStyle="rgba(180,190,205,0.15)";for(let s=0;s<4;s++)for(let r=0;r<4;r++)(r+s)%2&&e.fillRect(r*32+3,s*32+3,26,26);return ee(t)}function qh(n){let t=te(64,64),e=t.getContext("2d"),i=e.createImageData(64,64);return Hs(i,n,10,4,[168,162,150]),e.putImageData(i,0,0),ge(e,64,64,"#6b5a4a",14,n),ge(e,64,64,"#8f9a92",8,n),ee(t)}function _1(n){let t=te(128,128),e=t.getContext("2d");return e.drawImage(qh(n).image,0,0,128,128),e.fillStyle="#0c0a08",e.beginPath(),e.ellipse(40,52,13,17,.08,0,7),e.fill(),e.beginPath(),e.ellipse(88,52,13,17,-.08,0,7),e.fill(),e.fillStyle="rgba(210,205,190,0.5)",e.beginPath(),e.ellipse(42,47,3,4,0,0,7),e.fill(),e.beginPath(),e.ellipse(86,47,3,4,0,0,7),e.fill(),e.fillStyle="#120b08",e.beginPath(),e.ellipse(64,96,9,20,0,0,7),e.fill(),e.strokeStyle="rgba(60,30,24,0.8)",e.lineWidth=2,e.beginPath(),e.moveTo(52,108),e.lineTo(76,108),e.stroke(),ge(e,128,128,"#2c2018",10,n),ee(t)}function x1(n){let t=te(128,128),e=t.getContext("2d");e.fillStyle="#5a2620",e.fillRect(0,0,128,128);let i=e.getImageData(0,0,128,128);me(i,n,{amp:10,base:i.data.slice()}),e.putImageData(i,0,0),e.strokeStyle="#2a140e",e.lineWidth=6,e.strokeRect(6,6,116,116),e.strokeStyle="rgba(190,150,110,0.3)",e.lineWidth=2,e.strokeRect(12,12,104,104),e.strokeStyle="rgba(40,20,16,0.5)",e.lineWidth=2;for(let s=24;s<108;s+=21)for(let r=24;r<108;r+=21)e.beginPath(),e.moveTo(r,s-6),e.lineTo(r+6,s),e.lineTo(r,s+6),e.lineTo(r-6,s),e.closePath(),e.stroke();return ge(e,128,128,"#1c0e0a",16,n),ee(t)}function y1(n){let t=te(128,128),e=t.getContext("2d");e.fillStyle="#14100e",e.fillRect(0,0,128,128);let i=e.getImageData(0,0,128,128);me(i,n,{amp:8,base:i.data.slice()}),e.putImageData(i,0,0);for(let s=0;s<36;s++){let r=n()*128,o=n()*128,a=2+n()*4.5,l=n()*Math.PI;e.fillStyle="rgba(198,193,178,0.45)",e.beginPath(),e.ellipse(r,o,a*1.35,a,l,0,7),e.fill(),e.fillStyle="rgba(6,6,6,0.9)",e.beginPath(),e.ellipse(r,o,a*.55,a*.5,l,0,7),e.fill(),n()<.3&&(e.fillStyle="rgba(90,12,10,0.5)",e.fillRect(r-1,o+a,2,6+n()*12))}return ge(e,128,128,"#000000",6,n),ee(t)}function Xh(n=!1){let t=te(128,128),e=t.getContext("2d"),i=Lt(21);e.fillStyle="#e8e2d0",e.beginPath(),e.arc(64,64,60,0,7),e.fill();let s=e.getImageData(0,0,128,128);me(s,i,{amp:8,base:s.data.slice()}),e.putImageData(s,0,0),e.strokeStyle="#2a2620",e.lineWidth=3,e.beginPath(),e.arc(64,64,58,0,7),e.stroke();for(let a=0;a<12;a++){let l=a/12*Math.PI*2;e.lineWidth=a%3?2:4,e.beginPath(),e.moveTo(64+Math.sin(l)*48,64-Math.cos(l)*48),e.lineTo(64+Math.sin(l)*54,64-Math.cos(l)*54),e.stroke()}let r=(2+17/60)/12*Math.PI*2+(n?-.55:0),o=17/60*Math.PI*2+(n?-1.9:0);return e.lineWidth=5,e.beginPath(),e.moveTo(64,64),e.lineTo(64+Math.sin(r)*28,64-Math.cos(r)*28),e.stroke(),e.lineWidth=3,e.beginPath(),e.moveTo(64,64),e.lineTo(64+Math.sin(o)*44,64-Math.cos(o)*44),e.stroke(),e.strokeStyle="rgba(40,36,30,0.7)",e.lineWidth=2,e.beginPath(),e.moveTo(20,90),e.lineTo(42,78),e.lineTo(58,86),e.stroke(),ee(t)}function v1(n){let t=te(128,256),e=t.getContext("2d");e.fillStyle="#c9bd9c",e.fillRect(0,0,128,256);let i=e.getImageData(0,0,128,256);me(i,n,{amp:8,base:i.data.slice()}),e.putImageData(i,0,0),e.fillStyle="#3a2a1c",e.fillRect(0,0,128,10),e.fillRect(0,246,128,10),e.fillStyle="#1a1814";for(let s=0;s<2;s++){let r=34+s*36;e.font="bold 30px serif",e.fillText("\u25EF",r,62),e.font="26px serif",e.fillText("\u25EF",r,98),e.fillText("\u25EF",r,132),e.fillText("\u25EF",r,166),e.fillText("\u25EF",r,200)}return e.fillStyle="#a01420",e.fillRect(92,204,24,24),ge(e,128,256,"#8a7c58",10,n),ee(t)}function b1(){let n=te(128,256),t=n.getContext("2d");return t.clearRect(0,0,128,256),t.fillStyle="rgba(10,10,12,0.92)",t.beginPath(),t.ellipse(64,56,16,21,0,0,7),t.fill(),t.beginPath(),t.moveTo(40,80),t.quadraticCurveTo(64,70,88,80),t.lineTo(84,238),t.lineTo(44,238),t.closePath(),t.fill(),t.fillRect(24,94,14,122),t.fillRect(90,94,14,122),ee(n,!1)}function M1(n){let t=te(128,96),e=t.getContext("2d");e.clearRect(0,0,128,96),e.fillStyle="rgba(178,176,166,0.85)",e.beginPath(),e.ellipse(64,50,30,38,0,0,7),e.fill(),e.fillStyle="rgba(8,8,8,0.95)",e.beginPath(),e.ellipse(50,42,8,10,0,0,7),e.fill(),e.beginPath(),e.ellipse(78,42,8,10,0,0,7),e.fill(),e.beginPath(),e.ellipse(64,74,7,12,0,0,7),e.fill();let i=e.getImageData(0,0,128,96);for(let s=0;s<3e3;s++){let r=n()*128|0,a=((n()*96|0)*128+r)*4;i.data[a+3]>0&&(i.data[a]=i.data[a]<128?240:60)}return e.putImageData(i,0,0),ee(t,!1)}function E1(n){let t=te(128,256),e=t.getContext("2d");e.fillStyle="#1c2429",e.fillRect(0,0,128,256);let i=e.getImageData(0,0,128,256);me(i,n,{amp:7,base:i.data.slice()}),e.putImageData(i,0,0),e.strokeStyle="rgba(90,100,105,0.22)";for(let s=0;s<14;s++){e.beginPath();let r=n()*128;e.moveTo(r,0),e.lineTo(r+(n()-.5)*30,256),e.stroke()}return e.save(),e.translate(64,120),e.rotate(.06),e.fillStyle="rgba(8,10,12,0.82)",e.beginPath(),e.ellipse(0,32,20,48,0,0,7),e.fill(),e.beginPath(),e.ellipse(-2,-34,15,19,.08,0,7),e.fill(),e.fillRect(-36,-16,11,58),e.fillRect(25,-16,11,58),e.fillStyle="rgba(168,172,168,0.5)",e.beginPath(),e.ellipse(-4,-38,8,10,.08,0,7),e.fill(),e.fillStyle="rgba(200,45,52,0.75)",e.beginPath(),e.ellipse(-7,-39,2.2,1.6,0,0,7),e.fill(),e.beginPath(),e.ellipse(0,-40,2.2,1.6,0,0,7),e.fill(),e.restore(),e.strokeStyle="rgba(220,228,232,0.5)",e.beginPath(),e.moveTo(20,20),e.lineTo(48,90),e.lineTo(44,120),e.lineTo(70,190),e.stroke(),ge(e,128,256,"#0a0e10",12,n),ee(t)}function w1(n){let t=te(128,128),e=t.getContext("2d");e.fillStyle="#767b74",e.fillRect(0,0,128,128);for(let s=0;s<4;s++)for(let r=0;r<4;r++){let o=114+(n()-.5)*22|0;e.fillStyle=`rgb(${o},${o+3},${o-2})`,e.fillRect(r*32+2,s*32+2,28,28);for(let a=0;a<4;a++)e.fillStyle=`rgba(40,44,40,${.04+a*.045})`,e.fillRect(r*32+2,s*32+2+a*7,28,7);e.fillStyle="rgba(255,255,255,0.035)",e.fillRect(r*32+2,s*32+2,28,4),n()<.12&&(e.fillStyle="rgba(52,50,44,0.8)",e.fillRect(r*32+2,s*32+2,28,28),e.strokeStyle="rgba(20,18,14,0.5)",e.beginPath(),e.moveTo(r*32+6,s*32+8),e.lineTo(r*32+22,s*32+24),e.stroke())}ge(e,128,128,"#3d443c",22,n),ge(e,128,128,"#2c3a30",8,n);let i=e.getImageData(0,0,128,128);return me(i,n,{amp:6,base:i.data.slice()}),e.putImageData(i,0,0),ee(t)}function S1(n){let t=te(256,128),e=t.getContext("2d");e.fillStyle="#4a4e52",e.fillRect(0,0,256,128);let i=e.getImageData(0,0,256,128);me(i,n,{amp:8,base:i.data.slice()}),e.putImageData(i,0,0);for(let s=0;s<2;s++)for(let r=0;r<4;r++){let o=10+r*62,a=8+s*60;e.fillStyle="#6a7076",e.fillRect(o,a,54,48),e.strokeStyle="rgba(20,22,24,0.8)",e.lineWidth=2,e.strokeRect(o,a,54,48);for(let l=0;l<4;l++)vo(e,o+n()*54,a+n()*48,3+n()*5,"#7a4a26",.25,2);e.fillStyle="#c9bd9c",e.fillRect(o+6,a+26,40,12),e.fillStyle="rgba(40,36,30,0.85)",s===0&&r===2?(e.filter="blur(2px)",e.fillRect(o+9,a+29,34,6),e.filter="none"):e.fillRect(o+9,a+29,34,6),e.fillStyle="#1e2022",e.font="bold 11px sans-serif",e.fillText(String(s*4+r+1),o+44,a+14),e.fillStyle="#141618",e.beginPath(),e.arc(o+27,a+42,2.5,0,7),e.fill()}return ee(t)}function T1(n){let t=te(64,256),e=t.getContext("2d");e.clearRect(0,0,64,256),e.fillStyle="rgba(214,206,186,0.9)",e.fillRect(6,0,52,256);let i=e.getImageData(0,0,64,256);me(i,n,{amp:7,base:i.data.slice()}),e.putImageData(i,0,0),e.fillStyle="rgba(40,36,30,0.75)",e.font="9px serif";for(let s=16;s<248;s+=20)e.fillRect(20,s,24,1),e.fillText(String(210-(s-16)/20*10),7,s+3);return e.fillStyle="rgba(140,20,16,0.8)",e.font="10px serif",e.fillText("\u30D2\u30ED",44,92),e.fillRect(26,84,18,1),e.fillText("\u30CA\u30AA",44,120),e.fillRect(26,112,18,1),e.fillStyle="rgba(60,20,16,0.9)",e.fillText("\u30DF\u30C4\u30B3",38,200),e.fillRect(26,192,18,1),e.fillStyle="rgba(90,12,10,0.7)",e.fillRect(26,188,18,3),ee(t,!1)}function Yh(){let n={};return n.plaster=Yg(Lt(101)),n.wallpaper=Zg(Lt(102)),n.woodDoor=Jg(Lt(103)),n.woodFloor=gl(Lt(104),128,128,[84,64,44],!0),n.woodWall=gl(Lt(105),128,128,[74,56,38],!0),n.tatami=Kg(Lt(106)),n.ceiling=$g(Lt(107)),n.concrete=jg(Lt(108)),n.rust=Qg(Lt(109)),n.paper=t1(Lt(110)),n.news=e1(Lt(111)),n.journal=i1(Lt(112)),n.drawing=n1(Lt(113)),n.blood=s1(Lt(114)),n.handprint=r1(Lt(115)),n.photo=o1(Lt(116)),n.dollFace=a1(Lt(117)),n.tvStatic=l1(),n.windowMoon=c1(Lt(118)),n.fusuma=u1(Lt(119)),n.exitSign=d1(),n.graffiti=f1(Lt(120)),n.brick=p1(Lt(121)),n.ofuda=m1(),n.quilt=g1(Lt(122)),n.skin=qh(Lt(123)),n.face=_1(Lt(124)),n.rug=x1(Lt(125)),n.eyesWall=y1(Lt(126)),n.clock=Xh(),n.scroll=v1(Lt(127)),n.silhouette=b1(),n.tvFace=M1(Lt(128)),n.mirror=E1(Lt(129)),n.growth=T1(Lt(130)),n.tile=w1(Lt(131)),n.mailbox=S1(Lt(132)),n.rainStreaks=h1(Lt(133)),n.clockBack=Xh(!0),n}function Zh(n){let t=n.image.getContext("2d"),e=t.createImageData(64,48);for(let s=0;s<e.data.length;s+=4){let r=Math.random()*255|0;e.data[s]=r,e.data[s+1]=r,e.data[s+2]=r,e.data[s+3]=255}let i=Math.random()*48|0;for(let s=0;s<64;s++){let r=(i*64+s)*4;e.data[r]=235,e.data[r+1]=235,e.data[r+2]=235}t.putImageData(e,0,0),n.needsUpdate=!0}function hi(n,t,e,i){let s=Math.cos(n.rotation),r=Math.sin(n.rotation);return new L(n.x+s*t+r*e,i,n.z-r*t+s*e)}function A1(n,t=0,e=1){let i=n.base+t*n.rise,s=(n.width+n.gap)/2,r=[hi(n,0,-1.25,i),hi(n,-s,-.5,i)];for(let o=0;o<n.steps;o++)r.push(hi(n,-s,(o+.5)*n.going,i+(o+1)*n.riser));for(let o of[-s,0,s])r.push(hi(n,o,n.run+n.landingDepth/2,i+n.rise/2));for(let o=0;o<n.steps;o++)r.push(hi(n,s,n.run-(o+.5)*n.going,i+n.rise/2+(o+1)*n.riser));return r.push(hi(n,s,-.5,i+n.rise),hi(n,0,-1.25,i+n.rise)),e>0?r:r.reverse()}function Jh(n,t,e){let i=Math.sign(e.y-t.y);if(Math.abs(e.y-t.y)<.15)return null;let s=n.filter(d=>t.y>=d.base-.2&&t.y<=d.base+d.storeys*d.rise+.2&&(i>0?t.y<d.base+d.storeys*d.rise-.15:t.y>d.base+.15));s.sort((d,h)=>d.entry.distanceToSquared(t)-h.entry.distanceToSquared(t));let r=s[0];if(!r)return null;let o=Math.max(r.base,Math.min(r.base+r.storeys*r.rise,e.y)),a=r.path,l=0,c=1/0;for(let d=0;d<a.length-1;d++){let h=a[d],f=a[d+1],g=f.x-h.x,x=f.z-h.z,p=(f.y-h.y)*4,m=g*g+x*x+p*p;if(m<1e-8)continue;let y=Math.max(0,Math.min(1,((t.x-h.x)*g+(t.z-h.z)*x+(t.y-h.y)*4*p)/m)),_=(t.x-h.x-y*g)**2+(t.z-h.z-y*x)**2+((t.y-h.y)*4-y*p)**2;(_<c-1e-7||Math.abs(_-c)<1e-7&&i>0)&&(c=_,l=d)}let u=a[i>0?l+1:l];return Math.abs(t.y-o)<.1?null:u}function xl(n,t={}){var y;let e={x:0,z:64.2,base:0,rise:2.8,storeys:2,steps:8,width:1.65,gap:.35,going:.3,landingDepth:1.65,frontDepth:2.5,rotation:0,...t};e.run=e.steps*e.going,e.riser=e.rise/(e.steps*2);let i=e.width*2+e.gap+.3,s=(e.width+e.gap)/2;e.entry=hi(e,0,-1.25,e.base),e.path=Array.from({length:e.storeys},(_,v)=>A1(e,v)).flat(),n.stairs.push(e);let r=new Vt;r.name="switchback-stair",r.position.set(e.x,0,e.z),r.rotation.y=e.rotation,r.userData.stair=e,n.scene.add(r);let o=((y=n.detailMaterials)==null?void 0:y.concrete)||n.materials.concrete,a=new Ie({color:5662043,roughness:.74,metalness:.18}),l=new Ie({color:3156516,roughness:.5,metalness:.12}),c=new Ie({color:9271120,roughness:.66,metalness:.45}),u=(_,v,S,b,R)=>{let U=new $(_,v);return U.position.set(S,b,R),r.add(U),U},d=(_,v,S,b,R,U,M)=>{let E=hi(e,_,v,S),z=Math.abs(Math.sin(e.rotation))>.5,Y=(z?R:b)/2,it=(z?b:R)/2,I={x0:E.x-Y,x1:E.x+Y,z0:E.z-it,z1:E.z+it,y0:S,y1:S+U,stairPart:M};return n.colliders.push(I),I},h=(_,v,S,b)=>{let R=u(new jt(i,.2,S),o,0,v-.1,_);R.userData.collider=d(0,_,v-.2,i,S,.2,b)},f=(_,v,S,b=a)=>{let R=v.clone().sub(_),U=u(new Tt(S,S,R.length(),12),b,0,0,0);return U.position.copy(_.clone().add(v).multiplyScalar(.5)),U.quaternion.setFromUnitVectors(new L(0,1,0),R.normalize()),U},g=(_,v,S)=>{u(new jt(.12,.018,.12),a,_,S+.009,v);for(let b of[-.037,.037])for(let R of[-.037,.037])u(new Tt(.009,.009,.012,6),c,_+b,S+.022,v+R)},x=(_,v,S,b,R,U=null)=>{for(let E of[.52,1.02])f(new L(_,b+E,v),new L(_,R+E,S),E>.8?.032:.014,E>.8?l:a);let M=Math.ceil((S-v)/.32);for(let E=0;E<=M;E++){let z=E/M,Y=v+(S-v)*z,it=b+(R-b)*z,I=U?U(Y):it;f(new L(_,I+.025,Y),new L(_,it+1.01,Y),.013),(E%3===0||E===M)&&g(_,Y,I)}d(_,(v+S)/2,Math.min(b,R),.085,S-v,Math.abs(R-b)+1.08,"guard")},p=(_,v)=>{f(new L(-i/2,v+1.02,_),new L(i/2,v+1.02,_),.032,l),f(new L(-i/2,v+.52,_),new L(i/2,v+.52,_),.014);for(let S=-i/2;S<=i/2+.01;S+=.3)f(new L(S,v+.02,_),new L(S,v+1.02,_),.013),g(S,_,v);d(0,_,v,i,.085,1.08,"guard")};for(let _ of[-.22,e.run+e.landingDepth-.16]){let v=_<0?e.storeys*e.rise:(e.storeys-.5)*e.rise;for(let b of[-i/2,i/2]){let R=u(new jt(.22,v,.28),o,b,e.base+v/2,_);R.userData.collider=d(b,_,e.base,.22,.28,v,"column")}let S=_<0?e.storeys:e.storeys-1;for(let b=0;b<=S;b++){let R=_<0?e.base+b*e.rise:e.base+(b+.5)*e.rise;u(new jt(i+.22,.35,.28),o,0,R-.175,_)}}let m=(_,v,S)=>{let b=new gn;b.moveTo(0,-.22),b.lineTo(0,e.riser);for(let U=0;U<e.steps;U++)b.lineTo((U+1)*e.going,(U+1)*e.riser),U<e.steps-1&&b.lineTo((U+1)*e.going,(U+2)*e.riser);b.lineTo(e.run,e.rise/2-.22),b.lineTo(0,-.22);let R=new is(b,{depth:e.width,bevelEnabled:!1,steps:1});R.rotateY(S>0?-Math.PI/2:Math.PI/2),u(R,o,_+S*e.width/2,v,S>0?0:e.run);for(let U=0;U<e.steps;U++){let M=S>0?(U+.5)*e.going:e.run-(U+.5)*e.going,E=v+(U+1)*e.riser;d(_,M,E-.24,e.width,e.going+.008,.24,"tread");let z=M-S*(e.going/2-.027);u(new jt(e.width-.06,.008,.043),c,_,E+.004,z);for(let it of[-.011,0,.011])u(new jt(e.width-.09,.0015,.003),l,_,E+.009,z+it);let Y=hi(e,_,M,E);n.monsterNodes.push({...Y})}for(let U of[-1,1]){let M=_+U*(e.width/2-.075),E=S>0?v+e.riser:v+e.rise/2,z=S>0?v+e.rise/2:v+e.riser;x(M,.05,e.run-.05,E,z,Y=>{let it=S>0?Y:e.run-Y,I=Math.min(e.steps-1,Math.floor(it/e.going));return v+(I+1)*e.riser})}};for(let _=0;_<=e.storeys;_++){let v=e.base+_*e.rise;if(h(-e.frontDepth/2,v,e.frontDepth,"floor-landing"),_>0){let S=_===e.storeys&&e.roofOpenDepth?-(e.frontDepth-e.roofOpenDepth):-e.frontDepth;for(let b of[-i/2,i/2])x(b,S,-.03,v,v)}n.monsterNodes.push({...hi(e,0,-1.25,v)})}for(let _=0;_<e.storeys;_++){let v=e.base+_*e.rise;m(-s,v,1),m(s,v+e.rise/2,-1);let S=v+e.rise/2;h(e.run+e.landingDepth/2,S,e.landingDepth,"half-landing"),p(e.run+e.landingDepth-.04,S);for(let b of[-i/2,i/2])x(b,e.run,e.run+e.landingDepth-.04,S,S);for(let b of[-s,0,s])n.monsterNodes.push({...hi(e,b,e.run+e.landingDepth/2,S)})}return e}var vl=[{name:"\u897F\u7FFC\u5C01\u95ED\u8D70\u5ECA",floor:1,bounds:[-30,54,-1,58]},{name:"\u7EA2\u706F\u6697\u623F",floor:1,bounds:[-30,40,-21,54]},{name:"204 \u6444\u5F71\u5E08\u65E7\u5C45",floor:1,bounds:[-21,40,-10,54]},{name:"\u4F4F\u6237\u7EAA\u5FF5\u5BA4",floor:1,bounds:[-30,28,-10,40]}],yl=new Map;function Gs(n=0){if(yl.has(n))return yl.get(n);let t=document.createElement("canvas");t.width=512,t.height=384;let e=t.getContext("2d"),i=Lt(714+n);e.fillStyle="#c9bea7",e.fillRect(0,0,512,384),e.save(),e.beginPath(),e.rect(22,22,468,300),e.clip(),e.fillStyle="#595953",e.fillRect(22,22,468,300),e.fillStyle="#7d7c6c",e.fillRect(22,185,468,137);for(let a=0;a<6;a++){e.fillStyle=a%2?"#676a62":"#878477",e.fillRect(30+a*82,60+a*9,65,160),e.fillStyle="#343e3c";for(let l=0;l<3;l++)e.fillRect(40+a*82,78+a*9+l*35,20,20)}e.strokeStyle="#b6b2a0",e.lineWidth=2,e.beginPath(),e.moveTo(32,100),e.lineTo(475,130),e.stroke();for(let a=0;a<3;a++)e.fillStyle="#c4beab",e.fillRect(50+a*54,108,42,68);let s=[[230,161,75],[291,158,80],[352,205,43],[397,224,31]];for(let[a,l,c]of s)e.fillStyle="#beb7a3",e.beginPath(),e.ellipse(a,l,c*.16,c*.22,0,0,7),e.fill(),e.fillStyle="#2e3431",e.beginPath(),e.ellipse(a,l-c*.1,c*.17,c*.14,-.08,Math.PI,7),e.fill(),e.fillStyle=n===1?"#6d6960":"#414943",e.beginPath(),e.moveTo(a-c*.23,l+c*.24),e.lineTo(a+c*.2,l+c*.24),e.lineTo(a+c*.29,l+c),e.lineTo(a-c*.3,l+c),e.closePath(),e.fill(),e.strokeStyle="#343b37",e.lineWidth=c*.12,e.beginPath(),e.moveTo(a-c*.12,l+c),e.lineTo(a-c*.14,l+c*1.55),e.moveTo(a+c*.12,l+c),e.lineTo(a+c*.16,l+c*1.55),e.stroke();if(e.strokeStyle="#aca28e",e.lineWidth=6,e.beginPath(),e.moveTo(364,234),e.lineTo(389,239),e.stroke(),n===0){e.strokeStyle="#343b37",e.lineWidth=8,e.beginPath(),e.moveTo(216,185),e.lineTo(189,152),e.stroke(),e.fillStyle="#82755b",e.fillRect(273,210,39,23),e.strokeStyle="#b6a384",e.lineWidth=2;for(let a=0;a<5;a++)e.beginPath(),e.moveTo(276+a*8,210),e.lineTo(276+a*8,233),e.stroke()}let r=e.getImageData(22,22,468,300);for(let a=0;a<r.data.length;a+=4){let l=(i()-.5)*23;for(let c=0;c<3;c++)r.data[a+c]+=l}e.putImageData(r,22,22),e.strokeStyle="#d9d1b05a",e.lineWidth=1;for(let a=0;a<10;a++){let l=25+i()*460;e.beginPath(),e.moveTo(l,23),e.lineTo(l+4,320),e.stroke()}e.restore(),e.fillStyle="#534d41",e.font='18px "Songti SC", serif',e.fillText(n===0?"\u4E09\u53F7\u5BA4 \xB7 \u4E03\u6708\u5341\u4E09\u65E5 / \u4E00\u4E2A\u4E5F\u4E0D\u80FD\u5C11":"\u56DE\u58F0\u516C\u5BD3 \xB7 \u6700\u540E\u4E00\u4E2A\u590F\u5929",30,355);let o=new li(t);return o.colorSpace=pe,o.minFilter=gi,o.anisotropy=8,yl.set(n,o),o}function Kh(n,t){let{box:e,mesh:i,cylinder:s,sign:r,lamp:o,desk:a,chair:l,shelf:c,closet:u,recordDocument:d,pickup:h}=t,f=n.materials,g=n.detailMaterials,x=n.campaign,p=2.8,m=5.2,y=ot({color:6892322,roughness:.7}),_=ot({color:1448987,roughness:.7,metalness:.25}),v=ot({color:9606539,roughness:.34,metalness:.75}),S=ot({map:Gs(),roughness:.68}),b=ot({map:Gs(1),roughness:.8});n.room(-30,-1,54,58,{y:p,h:2.4,e:!1,floorMat:f.tile,wallMat:f.plaster,gaps:{n:[[-26.5,-25],[-16.5,-15]]}}),n.room(-30,-21,40,54,{y:p,h:2.4,s:!1,floorMat:f.tile,wallMat:f.concrete}),n.room(-21,-10,40,54,{y:p,h:2.4,s:!1,w:!1,floorMat:f.woodFloor,gaps:{n:[[-16.5,-15]]}}),n.room(-30,-10,28,40,{y:p,h:2.4,s:!1,floorMat:f.woodFloor,wallMat:f.plaster}),x.doors.west=n.makeDoor({x:-1,z:55,y:p,width:1.6,dir:-1,offset:.11,label:"\u897F\u7FFC\u5C01\u95ED\u95E8",mat:g.paint,locked:!0,lockedMsg:"\u94A5\u5319\u85CF\u5728\u513F\u7AE5\u623F\u516B\u97F3\u76D2\u7684\u5939\u5C42\u91CC\u3002"}),n.makeDoor({x:-26.5,z:54,y:p,along:"x",width:1.5,dir:1,label:"\u7EA2\u706F\u6697\u623F",mat:g.paint}),n.makeDoor({x:-16.5,z:54,y:p,along:"x",width:1.5,dir:1,label:"204 \u6444\u5F71\u5E08\u65E7\u5C45"}),n.makeDoor({x:-16.5,z:40,y:p,along:"x",width:1.5,dir:1,label:"\u4F4F\u6237\u7EAA\u5FF5\u5BA4"}),r(-.87,54.4,4.45,"\u897F\u7FFC",["204 / \u6697\u623F"],"e",.55,!0),r(-25.75,54.13,4.4,"\u6697\u623F",["\u7D05\u71C8 / DARKROOM"],"n",.7,!0),r(-15.75,54.13,4.4,"204",[],"n",.48,!0),r(-15.75,40.13,4.4,"\u4F4F\u6237\u7EAA\u5FF5\u5BA4",[],"n",1.1,!0);for(let et of[-4.5,-12,-21,-28])o(et,56,5.03,11056032,2.6,!0);for(let et of[54.13,57.87])n._baseboardX(et,-29.8,-1.2,p,et<55?[[-26.5,-25],[-16.5,-15]]:[]);n._baseboard(-29.87,54,58,p);for(let et=0;et<5;et++){let F=-7-et*4.5;n.decalWall(F,57.87,4.3,1,.75,Gs(et%2),"s"),e(F,57.9,3.9,1.1,.045,.045,f.darkWood)}r(-29.86,56,4.25,"1998",["\u6CA1\u6709\u4EBA\u642C\u8D70","\u53EA\u662F\u505C\u6B62\u56DE\u5BB6"],"e",1.4),a(-13.7,43.1,p,2.8),l(-13.7,44.3,p);let R=e(-13.9,43.1,3.6,.4,.25,.23,_);s(-13.9,3.73,43.29,.092,.22,v,"z"),s(-13.9,3.73,43.415,.072,.03,g.darkGlass,"z"),e(-13.78,43.07,3.84,.07,.06,.04,v),e(-14.02,43.06,3.83,.14,.09,.09,_);let U=i(new Qe(.26,.011,6,24,Math.PI),g.rubber,-13.9,3.6,43.1);U.rotation.x=Math.PI/2,n.regInteractable(R,"\u67E5\u770B\u6444\u5F71\u5E08\u7684\u76F8\u673A",2.5,()=>{var et,F;return(F=(et=n.handlers).onDocument)==null?void 0:F.call(et,16)}),d(16,-12.8,43.1,3.601,"204 \u6444\u5F71\u5E08\u7684\u65E5\u8BB0");let M=new Vt;M.position.set(-14.5,3.65,43.1);let E=new $(new Tt(.06,.06,.13,20),_);M.add(E);let z=new $(new Tt(.061,.061,.067,20),g.enamel);M.add(z);let Y=new $(new ae(.08,.26),ot({color:6508080,side:oe}));Y.rotation.x=-Math.PI/2,Y.position.set(.04,-.02,.12),M.add(Y),n.scene.add(M),h("film",M,"\u53D6\u8D70\u4E03\u6708\u5341\u4E09\u65E5\u7684\u5E95\u7247"),c(-19.8,43,p,1.6),u(-19.4,52.8,p),e(-19,48.5,p,1.8,2.8,.25,f.darkWood,!0),e(-19,48.5,3.05,1.7,2.7,.16,f.quilt),e(-19,47.6,3.21,1,.5,.11,f.pale),n._window(-10.14,48,4.22,"w",{w:1.8,h:1.2}),o(-15.5,47.2,5.03,12888441,2.5,!0);for(let et=0;et<4;et++)n.decalWall(-20.86,45+et*1.6,4.15,.75,.55,Gs(et%2),"e");a(-25.4,42.4,p,6.3);let it=[];for(let et=0;et<4;et++){let F=-27.7+et*1.5,st=e(F,42.4,3.61,1.12,.68,.035,g.enamel);for(let mt of[-.56,.56])e(F+mt,42.4,3.61,.035,.71,.11,g.enamel);for(let mt of[-.34,.34])e(F,42.4+mt,3.61,1.15,.035,.11,g.enamel);let ft=i(new ae(1.04,.61),ot({color:et===3?4282457:5327925,roughness:.25,metalness:.15}),F,3.659,42.4);ft.rotation.x=-Math.PI/2,r(F,40.13,4.35,["\u663E\u5F71","\u5B9A\u5F71","\u505C\u663E","\u6C34\u6D17"][et],[],"n",.7,!0),n.regInteractable(st,"\u51B2\u6D17\u5168\u5BB6\u798F\u5E95\u7247",2.7,()=>{var mt,vt;return(vt=(mt=n.handlers).onPuzzle)==null?void 0:vt.call(mt,"develop")}),it.push(ft)}x.photo=i(new ae(.32,.24),S,-23.2,3.67,42.4),x.photo.rotation.x=-Math.PI/2,x.photo.visible=!1,n.regInteractable(x.photo,"\u67E5\u770B\u6D17\u51FA\u7684\u5168\u5BB6\u798F",2.6,()=>{var et,F;return(F=(et=n.handlers).onDocument)==null?void 0:F.call(et,14)}),a(-28.5,48.5,p,1.6),e(-28.5,48.5,3.61,.72,.6,.08,_),s(-28.5,4.12,48.7,.035,1.05,v),e(-28.5,48.48,4.48,.43,.44,.21,_),s(-28.5,4.43,48.48,.09,.15,v),d(13,-28.1,48.5,3.604,"\u6697\u623F\u51B2\u6D17\u89C4\u7A0B"),c(-22,51,p,1.2);for(let et=0;et<8;et++){s(-29+et*.85,4.68,40.9,.011,.2,v);let F=i(new ae(.5,.36),b,-29+et*.85,4.42,40.9);x.dynamics.push({mesh:F,kind:"print",phase:et}),n.props.campaignDynamic.attach(F)}s(-25.8,4.79,40.9,.012,6.6,v,"x"),o(-25.7,45.8,5.03,12993580,3.7,!0),o(-28.8,51.6,5.03,11355698,1.8,!0),r(-29.86,46,4.26,"\u6697\u623F",["\u53EA\u5F00\u7EA2\u706F","\u7167\u7247\u4F1A\u66FF\u4F60\u8BB0\u5F97"],"e",1.4,!0);for(let et=0;et<6;et++){let F=-28+et*3;e(F,28.15,3.79,1.38,.05,1.05,f.darkWood),n.decalWall(F,28.19,4.32,1.22,.91,Gs(et%2),"n")}for(let et of[-26,-22,-18,-14])l(et,35.3,p);a(-21,31.1,p,4),d(15,-21.9,31.1,3.604,"\u6700\u540E\u4E00\u518C\u4F4F\u6237\u540D\u7C3F"),d(17,-19.6,31.1,3.604,"\u9632\u6C34\u888B\u91CC\u7684\u6536\u636E");let I=new Vt;I.position.set(-20.6,3.79,31.1);let V=new $(new Tt(.08,.085,.32,20),ot({color:6313530,roughness:.4}));I.add(V);let q=new $(new Tt(.052,.052,.055,16),_);q.position.y=.182,I.add(q);let nt=new $(new jt(.14,.18,.143),g.enamel);I.add(nt),n.scene.add(I),h("developer",I,"\u53D6\u8D70\u5BC6\u5C01\u7684\u663E\u5F71\u6DB2"),r(-20,28.14,4.7,"\u4E00\u4E2A\u4E5F\u4E0D\u80FD\u5C11",["\u4E09\u53F7\u5BA4 / \u6700\u540E\u4E00\u4E2A\u590F\u5929"],"n",3.2),n._window(-29.86,33.5,4.22,"e",{w:2.5,h:1.2}),o(-25,33,5.03,13020551,3.2),o(-15,33,5.03,13020551,3),n._battery(-28.2,38,2.85);for(let et of vl.slice(1)){let[F,st,ft,mt]=et.bounds;n._baseboard(F+.13,st+.1,mt-.1,p),n._baseboard(ft-.13,st+.1,mt-.1,p),n._baseboardX(st+.13,F+.1,ft-.1,p,et.name.includes("204")?[[-16.5,-15]]:[]),mt===54&&n._baseboardX(mt-.13,F+.1,ft-.1,p,[et.name.includes("\u6697\u623F")?[-26.5,-25]:[-16.5,-15]])}for(let[et,F]of[[-29.84,47],[-20.86,50],[-29.84,36]])n.decalWall(et,F,3.4,.9,1.1,n.tex.rust,"e");for(let et of[46.6,49.4]){let F=new ae(1.15,1.7,18,8),st=F.attributes.position;for(let mt=0;mt<st.count;mt++)st.setZ(mt,Math.sin(st.getX(mt)*36)*.045);F.computeVertexNormals();let ft=i(F,ot({color:6646096,roughness:1,side:oe}),-10.35,4.15,et);ft.rotation.y=-Math.PI/2,s(-10.37,5.02,et,.018,1.3,v,"z")}let Q=document.createElement("canvas");Q.width=Q.height=128;let Z=Q.getContext("2d"),ct=Z.createRadialGradient(64,64,5,64,64,64);ct.addColorStop(0,"rgba(0,0,0,.52)"),ct.addColorStop(1,"rgba(0,0,0,0)"),Z.fillStyle=ct,Z.fillRect(0,0,128,128);let ht=new Je({map:new li(Q),transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1});for(let[et,F,st,ft]of[[-13.7,43.1,3.2,1.2],[-19,48.5,2.1,3.1],[-25.4,42.4,6.7,1.2],[-28.5,48.5,2,1.3],[-21,31.1,4.4,1.3],...[-26,-22,-18,-14].map(mt=>[mt,35.3,.8,.9])]){let mt=i(new ae(st,ft),ht,et,2.807,F);mt.rotation.x=-Math.PI/2}for(let[et,F]of[[-3,56],[-10,56],[-18,56],[-26,56],[-25,50],[-25,45],[-16,49],[-16,43],[-16,37],[-22,35],[-27,35]])n.monsterNodes.push({x:et,y:p,z:F});x.trays=it,x.westBuilt=!0}var bl=[...vl,{name:"\u5165\u53E3\u5927\u5385",floor:0,bounds:[-5,-9,5,-2]},{name:"\u7384\u5173",floor:0,bounds:[-1.7,-2,1.7,1.8]},{name:"\u4E00\u697C\u8D70\u5ECA",floor:0,bounds:[-1.9,1.8,1.9,61.7]},{name:"\u4E1C\u7FFC\u8D70\u5ECA",floor:0,bounds:[1.9,42,31,46]},{name:"\u516C\u5171\u6D17\u8863\u623F",floor:0,bounds:[7,32,17.5,42]},{name:"104 \u7A7A\u5C4B",floor:0,bounds:[7,46,18.5,56]},{name:"\u7BA1\u7406\u5458\u7EF4\u4FEE\u5BA4",floor:0,bounds:[19,32,31,42]},{name:"\u53A8\u623F",floor:0,bounds:[-8.4,0,-1.7,7.5]},{name:"\u5BA2\u5385",floor:0,bounds:[-8.4,7.5,-1.7,15.5]},{name:"\u5BDD\u5BA4",floor:0,bounds:[-13.8,7.5,-8.4,15.5]},{name:"\u6D74\u5BA4",floor:0,bounds:[-17.6,14.8,-13.8,21]},{name:"\u4F5B\u95F4",floor:0,bounds:[1.7,0,8.4,8.5]},{name:"\u513F\u7AE5\u623F",floor:0,bounds:[1.7,8.5,8.4,15.5]},{name:"\u7EF4\u4FEE\u697C\u68AF\u95F4",floor:0,bounds:[1.7,16,11.8,25]},{name:"\u7EF4\u4FEE\u697C\u68AF\u95F4",floor:-1,bounds:[1.7,16,11.8,25]},...[0,1,2].map(n=>({name:"\u6298\u8FD4\u697C\u68AF\u95F4",floor:n,bounds:[-5,61.7,5,72.8]})),{name:"\u5C4B\u9876\u667E\u6652\u573A",floor:2,bounds:[-8,61.7,8,83]},{name:"\u4E8C\u697C\u8D70\u5ECA",floor:1,bounds:[-1,0,1,61.7]},{name:"201 \u7BA1\u7406\u5BA4",floor:1,bounds:[-8.4,16,-1,27]},{name:"202 \u7559\u5B88\u4F4F\u6237",floor:1,bounds:[1,40,10,54]},{name:"203 \u653E\u6620\u5BA4",floor:1,bounds:[-10,36,-1,48]},{name:"\u9732\u5929\u5929\u4E95",floor:1,bounds:[1,28.5,10.5,33]},{name:"\u5730\u4E0B\u914D\u7535\u95F4",floor:-1,bounds:[11.8,14,20,29]},{name:"\u5730\u4E0B\u6392\u6C34\u95F4",floor:-1,bounds:[20,14,24,29]}];function hs(n){var e,i;let t=n.y<-.8?-1:n.y>4.8?2:n.y>2?1:0;return(i=(e=bl.find(s=>s.floor===t&&n.x>=s.bounds[0]&&n.x<=s.bounds[2]&&n.z>=s.bounds[1]&&n.z<=s.bounds[3]))==null?void 0:e.name)!=null?i:t===-1?"\u5730\u4E0B\u7EF4\u4FEE\u697C\u68AF":"\u697C\u68AF\u95F4"}function $h(n){let t=n.materials,e=En(n);for(let[P,D,T]of[["concrete",e.concrete,.018],["plaster",e.plaster,.012],["wallpaper",e.plaster,.006],["woodWall",e.wood,.009],["woodDoor",e.wood,.008],["woodFloor",e.wood,.009]])t[P].bumpMap=D.bumpMap,t[P].roughnessMap=D.roughnessMap,t[P].bumpScale=T;let i=n.scene,s=Lt(14071998),r={collide:!1,cast:!1,geo:{ao:"none",jitter:0,bevel:!0}},o=ot({color:6450537,roughness:.88,metalness:.08}),a=ot({color:9597771,roughness:.68,metalness:.12}),l=ot({color:8666417,roughness:.9,metalness:.06}),c=ot({color:3493466,roughness:.92}),u=ot({map:n.tex.journal,color:14076335,roughness:1});n.campaign={doors:{},pickups:{},valves:[],lamps:[],dynamics:[]};let d=n.campaign;n.props.campaignDynamic=new Vt,i.add(n.props.campaignDynamic);let h=(P,D,T,O,N,X,B,gt=!1)=>n.box(P,D,T,O,N,X,B===t.darkWood?e.wood:B,gt?{geo:{bevel:!0}}:r),f=(P,D,T,O,N,X=i)=>{let B=new $(P,D);return B.position.set(T,O,N),X.add(B),B},g=(P,D,T,O,N,X,B="y")=>{let gt=f(new Tt(O,O,N,10),X,P,D,T);return B==="x"&&(gt.rotation.z=Math.PI/2),B==="z"&&(gt.rotation.x=Math.PI/2),gt},x=(P,D=[],T=!1)=>{let O=document.createElement("canvas");O.width=512,O.height=320;let N=O.getContext("2d");N.fillStyle=T?"#25342f":"#c4b99e",N.fillRect(0,0,512,320);for(let B=0;B<400;B++)N.fillStyle="rgba(30,26,18,"+s()*.07+")",N.fillRect(s()*512,s()*320,s()*25+1,1);N.strokeStyle=T?"#829083":"#6e6556",N.lineWidth=3,N.strokeRect(14,14,484,292),N.fillStyle=T?"#d7d9c5":"#302c26",N.textAlign="center",N.font='bold 38px "Songti SC", serif',N.fillText(P,256,D.length?82:175),N.font='25px "Songti SC", serif',D.forEach((B,gt)=>N.fillText(B,256,145+gt*44));let X=new li(O);return X.colorSpace=pe,X.minFilter=gi,X},p=(P,D,T,O,N,X,B=.72,gt=!1)=>n.decalWall(P,D,T,B,B*.625,x(O,N,gt),X),m=(P,D,T,O,N)=>{let X=f(new ae(.28,.36),u,D,O,T);return X.rotation.x=-Math.PI/2,X.rotation.z=-.13,X.material=ot({map:n.tex.journal,color:14799537,roughness:1,side:oe,emissive:5917482,emissiveIntensity:.14}),n.regInteractable(X,N,2.6,()=>{var B,gt;return(gt=(B=n.handlers).onDocument)==null?void 0:gt.call(B,P)}),n.notePickups.push({mesh:X,id:P}),X},y=(P,D,T)=>{let O=n.regInteractable(D,T,2.4,()=>{var N,X;return(X=(N=n.handlers).onItem)==null?void 0:X.call(N,P,D,O)});d.pickups[P]={mesh:D,interactable:O}},_=(P,D,T,O=9876136,N=2,X=!1,B=null)=>{var G;let gt=new Fe(O,N,8,1.8);gt.position.set(P,T-.08,D),i.add(gt);let bt=Vh(n,P,T,D,X?2698537:O);if(B!=null&&B.wall)B.wall==="east"||B.wall==="west"?(bt.group.rotation.z=B.wall==="east"?-Math.PI/2:Math.PI/2,gt.position.set(P+(B.wall==="east"?-.08:.08),T,D)):(bt.group.rotation.x=B.wall==="south"?Math.PI/2:-Math.PI/2,gt.position.set(P,T,D+(B.wall==="south"?-.08:.08)));else if((B==null?void 0:B.pole)!==void 0){let lt=T+.12,at=B.pole;g(P-.48,(at+lt)/2,D,.033,lt-at,o),g(P-.24,lt,D,.024,.48,o,"x"),g(P,T+.075,D,.019,.09,o),h(P-.48,D,at,.16,.16,.035,o)}else{let lt=n.ceilings.filter(rt=>P>=rt.x0&&P<=rt.x1&&D>=rt.z0&&D<=rt.z1&&rt.y>=T-.1&&rt.y-T<.8).sort((rt,Ct)=>rt.y-Ct.y)[0],at=(G=B==null?void 0:B.ceiling)!=null?G:lt==null?void 0:lt.y;if(at>T+.035)for(let rt of[-.25,.25])g(P+rt,(at+T+.035)/2,D,.014,at-T-.035,o)}let A=bt.diffuser,w={light:gt,base:N,powered:X,bulb:A};return d.lamps.push(w),X&&(gt.intensity=0),w},v=(P,D,T,O=1.8)=>{h(P,D,T+.73,O,.8,.06,t.darkWood,!0);for(let N of[-O/2+.09,O/2-.09])for(let X of[-.3,.3])h(P+N,D+X,T,.06,.06,.73,t.darkWood);h(P+O/2-.28,D,T,.38,.7,.68,t.darkWood,!0);for(let N=0;N<3;N++){let X=P+O/2-.28,B=T+.07+N*.2;h(X,D-.361,B,.34,.025,.176,t.darkWood),g(X,B+.1,D-.406,.012,.18,a,"x");for(let gt of[-.065,.065])g(X+gt,B+.1,D-.384,.011,.045,a,"z")}},S=(P,D,T,O=t.darkWood)=>{h(P,D,T+.4,.47,.46,.07,O);for(let N of[-.21,.21])h(P+N,D+.2,T+.44,.048,.045,.49,O);for(let N of[.57,.72,.87])h(P,D+.2,T+N,.4,.045,.055,O);for(let N of[-.19,.19])for(let X of[-.18,.18])h(P+N,D+X,T,.035,.035,.42,O)},b=(P,D,T,O=1.5)=>{for(let N of[-O/2,O/2])h(P+N,D,T,.055,.4,1.85,o);for(let N=0;N<5;N++)if(h(P,D,T+.08+N*.41,O,.4,.045,o),N<4)for(let X=0;X<4;X++)h(P-O*.35+X*O*.23,D,T+.125+N*.41,.22,.3,.27,X%2?c:u)},R=(P,D,T)=>{let O=h(P,D,T,1.25,.62,2.05,t.darkWood,!0);h(P,D-.32,T+.03,1.15,.035,1.96,o),h(P,D-.35,T+.08,.018,.02,1.86,t.black);for(let N of[-.08,.08])g(P+N,T+1.06,D-.38,.016,.14,a);n.regInteractable(O,"\u8EB2\u8FDB\u8863\u67DC",2.3,()=>{var N,X;return(X=(N=n.handlers).onHide)==null?void 0:X.call(N,O)})},U=(P,D,T,O,N,X,B)=>{n._baseboard(P+.115,T,O,N,X===P?[B]:[]),n._baseboard(D-.115,T,O,N,X===D?[B]:[]),n._baseboardX(T+.115,P,D,N),n._baseboardX(O-.115,P,D,N);for(let gt of[P+.15,D-.15])h(gt,(T+O)/2,N+2.27,.055,O-T,.07,t.darkWood)};n.room(-5,5,-9,-2,{h:2.7,s:!1,wallMat:t.concrete,floorMat:t.tile,gaps:{n:[[-.8,.8]]}}),n.wallZ(-2,-5,-1.7,0,2.7,t.concrete),n.wallZ(-2,1.7,5,0,2.7,t.concrete),n.makeDoor({x:-.8,z:-9,along:"x",width:1.6,dir:1,mat:o,label:"\u516C\u5BD3\u5916\u95E8",locked:!0,lockedMsg:"\u5916\u95E8\u7684\u9501\u820C\u5DF2\u7ECF\u9508\u6B7B\u3002\u62C6\u9664\u901A\u77E5\u8BF4\uFF0C\u591C\u95F4\u53EA\u80FD\u8D70\u4E8C\u697C\u5929\u4E95\u51FA\u53E3\u3002"}),v(-3.55,-6.55,0,2),S(-3.5,-5.45,0),m("invitation",-3.5,-6.55,.803,"\u4E00\u5C01\u6CA1\u6709\u7F72\u540D\u7684\u4FE1");for(let P=0;P<3;P++)for(let D=0;D<4;D++)h(-3.85+D*.55,-8.86,.95+P*.39,.49,.14,.34,o),h(-3.85+D*.55,-8.77,1.08+P*.39,.24,.012,.025,t.black);p(-3.25,-8.73,2.36,"\u56DE\u58F0\u516C\u5BD3",["\u591C\u9593\u53D7\u4ED8 / MAIL"],"n",1.65,!0),p(4.86,-5.2,1.5,"\u62C6\u9664\u544A\u793A",["\u4E03\u6708\u5341\u56DB\u65E5\u6E05\u573A","\u591C\u95F4\u51FA\u53E3\uFF1A\u4E8C\u697C\u5929\u4E95"],"w",1.8),h(3.2,-7.6,.38,2.7,.55,.09,t.darkWood,!0),h(3.2,-7.88,.49,2.7,.05,.7,t.darkWood);for(let P of[2.05,4.35])h(P,-7.6,0,.055,.45,.4,o);h(0,-8.1,.012,2.1,.75,.025,t.rug),p(.95,-2.12,1.65,"\u4F4F\u6237\u533A",["\u53A8\u623F / \u4E09\u53F7\u5BA4","\u697C\u68AF\u95F4\u5728\u8D70\u5ECA\u5C3D\u5934"],"s",.9,!0),_(0,-5.5,2.5,12688497,3),_(-3.4,-6.5,2.4,10337198,1.4),n._window(4.86,-7.3,1.5,"w",{w:1.5,h:1.4}),n.floor(0,67.25,10,11.1,0,t.concrete),n.wallX(-5,61.7,72.8,0,5.6,t.concrete),n.wallX(5,61.7,72.8,0,5.6,t.concrete),n.wallZ(72.8,-5,5,0,5.6,t.concrete);for(let P of[0,2.8])n.wallZ(61.7,-5,5,P,2.8,t.concrete,[[-1.7,1.7]]);xl(n,{roofOpenDepth:1.5}),pl(n,{x0:-5,x1:5,z0:61.7,z1:72.8,base:0,height:5.6,gapX:[-1.7,1.7]});for(let[P,D]of[0,2.8,5.6].entries()){if(p(1.8,61.84,D+1.65,["1F","2F","\u5C4B\u9876 R"][P],["\u4F4F\u6237\u533A / \u4F4F\u6237\u533A / \u667E\u6652\u573A".split(" / ")[P],"\u6CBF\u6276\u624B\u53EF\u539F\u8DEF\u8FD4\u56DE"],"n",1.1,!0),P<2)_(0,63.05,D+2.565,12625275,3.8,!1,{ceiling:D+2.6});else{for(let T of[-.4,.4])h(1.8+T,61.79,D,.045,.045,1.85,o);h(1.8,61.81,D+1.65-.344,1.1,.035,.688,o)}P<2&&n._window(-4.86,69.4,D+1.55,"e",{w:1.75,h:1.65}),n.monsterNodes.push({x:0,y:D,z:62.4})}_(0,67.5,3.965,10007210,2.8,!1,{ceiling:4}),_(4.865,67.4,5.05,10007210,3.6,!1,{wall:"east"}),n.floor(-6,67.25,4,11.1,5.6,t.concrete),n.floor(6,67.25,4,11.1,5.6,t.concrete),n.floor(0,62.45,8,1.5,5.6,t.concrete),n.floor(0,77.9,16,10.2,5.6,t.concrete),n.wallX(-8,61.7,83,5.6,1.12,t.concrete),n.wallX(8,61.7,83,5.6,1.12,t.concrete),n.wallZ(83,-8,8,5.6,1.12,t.concrete),n.wallZ(61.7,-8,8,5.6,1.12,t.concrete);for(let P of[-4.08,4.08]){h(P,67.75,5.6,.065,9.9,1.04,o,!0);for(let D=63.1;D<73;D+=.7)g(P,6.12,D,.025,1.04,o)}h(0,72.73,5.6,8.2,.07,1.04,o,!0);for(let P of[-3.05,3.05])for(let D of[75,81])g(P,6.8,D,.045,2.4,o);for(let P of[-3.05,3.05])g(P,7.98,78,.038,6,o,"z");for(let P=0;P<5;P++){let D=h(-2.4+P*1.15,78.5,6.35,.75,.035,1.55,P%2?t.quilt:t.pale);D.rotation.y=P*.2-.4}let M=h(.4,81.55,5.99,2.2,.52,.07,t.darkWood,!0);for(let P of[-.5,1.3])h(P,81.55,5.6,.05,.45,.4,o);m(10,.4,81.55,6.08,"\u6BCD\u4EB2\u7559\u4E0B\u7684\u4FBF\u6761"),_(-5.4,74.2,7.25,8563125,2.3,!1,{pole:5.6}),_(5.4,81,7.3,9680573,2.3,!1,{pole:5.6}),n._battery(5.8,75.5,5.65);for(let[P,D,T,O]of[[-18,78,12,18],[20,84,13,23],[0,102,22,15]]){h(P,D,-4,T,9,O,t.concrete);for(let N=0;N<5;N++)for(let X=0;X<4;X++)h(P-T/2+1.5+X*(T-3)/3,D-4.55,.5+N*2.5,1,.04,1.5,Se({color:s()<.15?9403733:1517352}))}n.room(1.9,31,42,46,{w:!1,wallMat:t.plaster,floorMat:t.tile,gaps:{n:[[9,10.5],[23,24.5]],s:[[10,11.5]]}}),n.room(7,17.5,32,42,{s:!1,wallMat:t.concrete,floorMat:t.tile}),n.room(19,31,32,42,{s:!1,wallMat:t.concrete,floorMat:t.concrete}),n.room(7,18.5,46,56,{n:!1,wallMat:t.wallpaper,floorMat:t.woodFloor}),n.makeDoor({x:9,z:42,along:"x",width:1.5,dir:1,label:"\u516C\u5171\u6D17\u8863\u623F"}),d.doors.workshop=n.makeDoor({x:23,z:42,along:"x",width:1.5,dir:1,label:"\u7BA1\u7406\u5458\u7EF4\u4FEE\u5BA4",mat:o,locked:!0,lockedMsg:"\u7EF4\u4FEE\u5BA4\u78C1\u9501\u6CA1\u6709\u7535\u3002\u5148\u63A5\u901A\u5730\u4E0B\u5907\u7528\u7535\u6E90\u3002"}),n.makeDoor({x:10,z:46,along:"x",width:1.5,dir:-1,label:"104 \u7A7A\u5C4B"}),p(1.77,42.2,1.7,"\u4E1C\u7FFC",["\u6D17\u8863\u623F / 104","\u7BA1\u7406\u5458\u7EF4\u4FEE\u5BA4"],"w",.75,!0),p(9.75,42.13,1.6,"\u6D17\u8863\u623F",[],"n",.65,!0),p(23.75,42.13,1.6,"\u7EF4\u4FEE\u5BA4",[],"n",.65,!0),p(10.75,45.87,1.6,"104",[],"s",.46,!0);for(let P of[5.5,13,21,28])_(P,44,2.5,9942951,2.6,P>12);for(let P of[8.4,10.3,12.2,14.1]){h(P,33.1,0,1.05,.8,1.15,e.enamel,!0),h(P,33.1,1.15,1.08,.84,.035,e.enamel),h(P,33.515,.91,.93,.03,.17,e.paint),f(new Qe(.319,.024,12,32),e.iron,P,.58,33.61),f(new Qe(.283,.026,10,32),e.rubber,P,.58,33.595),g(P,.58,33.53,.24,.12,e.iron,"z"),f(new Qe(.205,.011,8,28),e.iron,P,.58,33.594);let D=new Yr(new Bi(.008,6),e.rubber,24);for(let O=0;O<24;O++){let N=O/12*Math.PI*2,X=O<12?.17:.215;D.setMatrixAt(O,new ce().makeTranslation(P+Math.cos(N)*X,.58+Math.sin(N)*X,33.596))}i.add(D);let T=e.darkGlass.clone();T.transparent=!0,T.opacity=.4,T.depthWrite=!1,f(new Bi(.253,32),T,P,.58,33.615),h(P-.3,33.59,.49,.08,.05,.18,e.iron),h(P+.3,33.63,.48,.045,.05,.2,e.enamel);for(let O of[-.31,.2])g(P+O,1,33.556,.037,.04,e.rubber,"z"),h(P+O,33.58,1,.006,.005,.026,e.enamel);for(let O=0;O<3;O++)h(P-.08+O*.09,33.55,.96,.055,.016,.024,e.iron);h(P,33.55,.18,.9,.012,.018,e.iron);for(let O of[-.38,.38])g(P+O,.055,33.2,.045,.11,e.rubber);g(P,1.28,32.55,.038,.35,t.rust,"z")}b(15.8,40.8,0,1.5),h(9.8,39.6,.38,2.6,.75,.08,t.darkWood,!0);for(let P of[8.7,10.9])h(P,39.6,0,.06,.65,.38,o);for(let P=0;P<4;P++)h(9.1+P*.43,39.6,.46+P*.01,.35,.5,.035,t.quilt);_(12,36.7,2.5,9680561,3.1,!0),n._window(17.36,36.5,1.45,"w",{w:1.6,h:1.3}),m(11,10.1,39.6,.66,"\u6D17\u8863\u623F\u7684\u7559\u8A00"),v(25.4,33.8,0,3.4),h(25.4,32.14,1.18,4.7,.035,1.1,t.darkWood);for(let P=0;P<7;P++){let D=g(23.5+P*.59,1.65,32.23,.021,.45,o);D.rotation.z=P*.09-.2,h(23.5+P*.59,32.23,1.88,.14,.035,.055,a)}b(30.15,36.8,0,1.25),b(29,40.8,0,2.1),R(20.25,40.8,0),h(20.5,34,0,1.1,1.25,1.4,o,!0),g(20.5,1.47,34,.32,.13,a),m(9,26.2,33.8,.803,"\u672A\u5B8C\u6210\u7684\u7EF4\u4FEE\u5DE5\u5355");let E=new Vt;E.position.set(24.2,.9,33.8);let z=new $(new Qe(.25,.035,8,18),l);z.rotation.x=-Math.PI/2,E.add(z);for(let P of[0,Math.PI/2]){let D=new $(new jt(.48,.036,.036),l);D.rotation.y=P,E.add(D)}i.add(E),y("valveHandle",E,"\u53D6\u8D70\u6392\u6C34\u9600\u624B\u8F6E"),_(25.4,35.6,2.5,12623979,3,!0),n._battery(27.8,38.2,.05),h(15.8,52.2,0,1.85,2.7,.3,t.darkWood,!0),h(15.8,52.2,.3,1.7,2.5,.13,t.quilt),v(9,54.7,0,1.65),S(9,53.7,0),h(9.2,54.7,.81,.32,.23,.07,t.black),m(12,8.5,54.7,.803,"104 \u4F4F\u6237\u65E5\u8BB0"),R(17.2,47.2,0),h(12.3,50.3,.015,3,3.7,.018,t.rug),_(12,50,2.5,12689013,2.8,!0),n._window(18.36,50.5,1.45,"w",{w:1.8,h:1.35}),n._battery(8.7,48.4,.05);for(let[P,D]of[[5,44],[12,44],[21,44],[28.5,44],[11,36.5],[24,37],[12,49]])n.monsterNodes.push({x:P,y:0,z:D});n.wallX(1.7,16,25,-2.8,2.8,t.concrete),n.wallZ(16,1.7,11.8,-2.8,5.5,t.concrete),n.wallZ(25,1.7,11.8,-2.8,5.5,t.concrete),n.ceil(6.75,20.5,10.1,9,2.7,t.concrete),n.floor(6.75,20.5,10.1,9,-2.8,t.concrete),xl(n,{x:4.6,z:20.5,base:-2.8,storeys:1,frontDepth:2.9,rotation:Math.PI/2}),pl(n,{x0:1.7,x1:11.8,z0:16,z1:25,base:-2.8,height:5.5,leftDoor:{y:0,gap:[19.8,21.2]}}),d.doors.service=n.makeDoor({x:1.7,z:19.8,width:1.4,dir:1,offset:-.11,mat:o,label:"\u5730\u4E0B\u7EF4\u4FEE\u95E8",locked:!0,lockedMsg:"\u7EF4\u4FEE\u95E8\u9501\u7740\u3002\u5927\u5385\u503C\u73ED\u53F0\u4E0A\u6709\u4E00\u5C01\u4FE1\u3002"}),p(1.58,19.35,1.62,"\u5730\u4E0B\u7EF4\u4FEE",["\u914D\u7535 / \u6392\u6C34","\u975E\u4F4F\u6237\u8BF7\u52FF\u8FDB\u5165"],"w",.6,!0),_(3.6,20.5,2.45,13081192,1.6),_(7.8,24.865,-.4,10269602,2.8,!1,{wall:"south"}),p(3.9,16.13,1.4,"B1",["\u6CBF\u697C\u68AF\u4E0B\u697C","\u539F\u8DEF\u53EF\u8FD4\u56DE\u4E00\u697C"],"n",.95,!0),n.room(11.8,24,14,29,{y:-2.8,h:2.8,wallMat:t.concrete,floorMat:t.concrete,gaps:{w:[[19.4,21.6]]}}),n.floor(11.6,20.5,.5,3,-2.8,t.concrete),n.wallX(20,14,29,-2.8,2.8,t.concrete,[[21,22.5]]),d.doors.pump=n.makeDoor({x:20,z:21,width:1.5,y:-2.8,mat:o,dir:1,label:"\u6392\u6C34\u95F4\u94C1\u95E8",locked:!0,lockedMsg:"\u94C1\u95E8\u4E0A\u7F20\u7740\u9508\u94FE\u3002\u5148\u542C\u5B8C\u90A3\u76D8\u5F55\u97F3\u3002"}),p(19.88,20.5,-1.2,"\u6392\u6C34\u95F4",["\u95E8\u5185\u7981\u6B62\u901A\u884C"],"w",.56,!0);for(let P of[13.5,16.5,19]){g(P,-.34,21.5,.07,14.4,t.rust,"z");for(let D of[15.5,20,26.5])g(P,-.33,D,.09,.06,o,"z")}b(14.8,27.7,-2.8,2.3),h(18.3,27.9,-2.8,1.3,.85,.9,o,!0),g(18.3,-1.66,27.9,.34,.6,t.rust),R(12.75,27.8,-2.8);let Y=h(17.1,14.36,-2.35,2.05,.35,1.5,o,!0);h(17.1,14.57,-2.25,1.9,.045,1.28,t.darkMetal);let it=["\u8D70\u5ECA","\u4F4F\u6237","\u6392\u6C34"];for(let P=0;P<3;P++)h(16.45+P*.65,14.63,-1.72,.3,.08,.16,a),p(16.45+P*.65,14.64,-1.35,it[P],[],"n",.4,!0);n.regInteractable(Y,"\u66F4\u6362\u7194\u65AD\u5668 / \u5408\u4E0A\u5907\u7528\u7535\u6E90",2.5,()=>{var P,D;return(D=(P=n.handlers).onPuzzle)==null?void 0:D.call(P,"power")}),p(15.1,14.13,-1.33,"\u68C0\u4FEE\u5361",["\u5148\u6392\u6C34 \xB7 \u540E\u8D70\u5ECA","\u6700\u540E\u4F4F\u6237\u7535\u6E90"],"n",1);let I=p(14,14.13,-1.35,"\u505C\u7535\u68C0\u4FEE",["\u5408\u95F8\u524D\u66F4\u6362\u7194\u65AD\u5668"],"n",.65);n.regInteractable(I,"\u9605\u8BFB\u65AD\u7535\u68C0\u4FEE\u5361",2.5,()=>{var P,D;return(D=(P=n.handlers).onDocument)==null?void 0:D.call(P,4)});for(let[P,D]of[[13.3,17],[18,23.5],[22,18],[22,26]]){_(P,D,-.3,9155749,2.8,!0);let T=f(new Bi(.7+s(),18),ot({color:1911848,transparent:!0,opacity:.48,roughness:.26}),P+.5,-2.775,D+1);T.rotation.x=-Math.PI/2}_(13,20.5,-.3,11691078,1.25);let V=g(22.6,-1.7,16.3,.7,2.05,o);i.add(V),n.colliders.push(Si(22.6,-1.7,16.3,1.4,2.05,1.4));for(let P of[-2.55,-.85])g(22.6,P,16.3,.73,.07,t.rust);for(let P of[21.1,22.15,23.2]){g(P,-1.25,28.2,.075,2.4,t.rust);let D=new Vt;D.position.set(P,-1.48,28),n.props.campaignDynamic.add(D),f(new Qe(.22,.028,8,14),l,0,0,0,D);let T=g(P,-1.48,28,.04,.12,a,"z");for(let O of[0,Math.PI/2]){let N=f(new jt(.43,.028,.028),l,0,0,0,D);N.rotation.z=O}d.valves.push(D),n.regInteractable(T,"\u6392\u6C34\u9600\u7EC4",2.6,()=>{var O,N;return(N=(O=n.handlers).onPuzzle)==null?void 0:N.call(O,"valves")})}p(22.2,28.86,-.9,"\u6C34\u95F8\u64CD\u4F5C",["\u6CC4\u538B / \u56DE\u6C34 / \u6392\u6C34"],"s",1.75,!0),h(22.3,23.8,-2.8,2.1,1.7,.1,t.darkMetal);for(let P=0;P<12;P++)h(21.3+P*.18,23.8,-2.67,.025,1.7,.035,o);n._battery(13.8,24.5,-2.75);let q=(P,D,T,O,N,X)=>{n.room(P,D,T,O,{y:2.8,h:2.4,wallMat:t.wallpaper,floorMat:t.woodFloor,[X]:!1}),U(P,D,T,O,2.8,X==="w"?P:D,N)};q(-8.4,-1,16,27,[20,21.4],"e"),q(1,10,40,54,[46,47.4],"w"),q(-10,-1,36,48,[40,41.4],"e"),d.doors.office=n.makeDoor({x:-1,z:20,y:2.8,width:1.4,dir:-1,offset:.11,label:"201 \u7BA1\u7406\u5BA4",locked:!0,lockedMsg:"\u78C1\u9501\u6CA1\u6709\u7535\u3002\u9700\u8981\u6062\u590D\u5730\u4E0B\u5907\u7528\u7535\u6E90\u3002"}),d.doors.resident=n.makeDoor({x:1,z:46,y:2.8,width:1.4,dir:1,offset:-.11,label:"202 \u7559\u5B88\u4F4F\u6237",locked:!0,lockedMsg:"\u78C1\u9501\u6CA1\u6709\u7535\u3002\u9700\u8981\u6062\u590D\u5730\u4E0B\u5907\u7528\u7535\u6E90\u3002"}),d.doors.archive=n.makeDoor({x:-1,z:40,y:2.8,width:1.4,dir:-1,offset:.11,label:"203 \u653E\u6620\u5BA4",locked:!0,lockedMsg:"\u94A5\u5319\u4FDD\u5B58\u5728 201 \u7BA1\u7406\u5BA4\u7684\u6863\u6848\u67DC\u91CC\u3002"});for(let[P,D,T,O]of[[-.87,19.5,"201","e"],[.87,45.5,"202","w"],[-.87,39.5,"203","e"]])p(P,D,4.4,T,[],O,.46,!0);v(-5.8,18.5,2.8,2.6),S(-5.8,19.6,2.8),h(-6.5,18.5,3.59,.52,.38,.11,t.darkMetal);for(let P=0;P<3;P++)for(let D=0;D<8;D++)h(-6.72+D*.062,18.43+P*.08,3.7,.038,.04,.025,o);g(-6.5,3.83,18.68,.055,.5,t.black,"x"),m(8,-5.15,18.5,3.598,"\u4E8C\u697C\u4F4F\u6237\u7684\u76EE\u51FB\u8BB0\u5F55");let nt=h(-7.65,23.7,2.8,1.1,.75,1.4,o,!0);h(-7.65,23.3,2.92,.94,.045,1.16,t.darkMetal);for(let P=0;P<4;P++)for(let D=0;D<3;D++)h(-7.73+D*.08,23.26,3.5+P*.08,.048,.028,.048,a);n.regInteractable(nt,"\u6863\u6848\u67DC\u5BC6\u7801\u9501",2.6,()=>{var P,D;return(D=(P=n.handlers).onPuzzle)==null?void 0:D.call(P,"cabinet")});let Q=f(new Bi(.3,24),ot({map:n.tex.clock,roughness:.8}),-3.6,4.42,16.13);f(new Qe(.31,.023,8,24),o,-3.6,4.42,16.12),b(-4.2,26.4,2.8,2.5),R(-2.5,25.9,2.8),p(-8.26,20.3,4.2,"\u62C6\u9664\u901A\u77E5",["\u6240\u6709\u5931\u7269\u8BF7\u5728","\u4E03\u6708\u5341\u56DB\u65E5\u524D\u8BA4\u9886"],"e",1.4),_(-5.2,21,5.02,13086597,2.8,!0),_(-3,25,5.02,9614245,2,!0),n._window(-8.26,24.5,4.3,"e",{w:1.4,h:1.2}),n._battery(-4,20,2.85),h(7.7,43,2.8,2,3.1,.28,t.darkWood,!0),h(7.7,43,3.08,1.9,3,.18,t.quilt),h(7.7,41.95,3.26,1.2,.5,.11,t.pale),h(7.7,44,3.27,1.9,1,.07,c),v(4.1,51.8,2.8,2),S(4.1,50.6,2.8);let Z=new Vt,ct=new $(new jt(.28,.05,.18),o);Z.add(ct);for(let P of[-.068,.068]){let D=new $(new Tt(.038,.038,.012,12),t.black);D.position.set(P,.032,0),Z.add(D)}Z.position.set(4.1,3.64,51.8),i.add(Z),y("tape",Z,"\u4E03\u6708\u5341\u56DB\u65E5\u7684\u5F55\u97F3\u5E26"),R(8.4,52.9,2.8);for(let P=0;P<5;P++)h(2.2+P*.65,42,2.8,.48,.4,.36,u),h(2.2+P*.65,42,3.16,.5,.43,.025,t.darkWood);n._window(9.86,48.2,4.3,"w",{w:1.7,h:1.1}),_(5.2,47.5,5.02,10139323,2.5,!0),n._battery(6.5,50.2,2.85),v(-6.5,43.8,2.8,2);let ht=h(-6.5,43.8,3.59,.68,.42,.15,o);for(let P of[-.15,.15])g(-6.5+P,3.76,43.8,.11,.025,t.black);for(let P=0;P<4;P++)h(-6.73+P*.13,43.56,3.62,.075,.04,.025,a);n.regInteractable(ht,"\u64AD\u653E\u4E03\u6708\u5341\u56DB\u65E5\u7684\u5F55\u97F3\u5E26",2.8,()=>{var P,D;return(D=(P=n.handlers).onPuzzle)==null?void 0:D.call(P,"tape")}),m(6,-7.15,43.75,3.599,"\u672A\u5BC4\u51FA\u7684\u8BA4\u9886\u4E66"),b(-8.8,47.3,2.8,1.7);let et=p(-9.86,40.1,4.15,"\u4E09\u53F7\u5BA4",["7\u670814\u65E5","\u82CD\u592A / \u4E03\u5C81"],"e",3.4);d.screen=et;let F=h(-3.4,40.1,3.5,.5,.7,.35,o);g(-3.8,3.66,40.1,.105,.26,t.black,"x");for(let P of[39.8,40.5]){let D=f(new Qe(.21,.025,8,16),o,-3.4,4.06,P);D.rotation.y=Math.PI/2}n.regInteractable(F,"\u68C0\u67E5\u505C\u6B62\u7684\u653E\u6620\u673A",2.4,()=>{var P,D;return(D=(P=n.handlers).onDocument)==null?void 0:D.call(P,6)});for(let P of[-4.6,-6.2])for(let D of[37.4,38.9])S(P,D,2.8,c);_(-6,41,5.02,11839366,1.9,!0),_(-8,45.5,5.02,7706512,1.7,!0),n.floor(5.75,30.75,9.5,4.5,2.8,t.concrete);for(let P of[28.5,33])h(5.8,P,2.8,9.5,.14,.9,t.concrete,!0),g(5.8,3.84,P,.045,9.6,o,"x");h(10.5,30.75,2.8,.14,4.5,.9,t.concrete,!0),g(10.5,3.85,30.75,.045,4.5,o,"z");for(let P of[3,5.5,8,10.5])for(let D of[28.5,33])g(P,3.37,D,.024,1.1,o);p(9.8,32.86,3.6,"\u907F\u96E3\u7D4C\u8DEF",["\u51FA\u53E3 \u2192"],"s",.7,!0);for(let[P,D,T,O]of[[28,40,8,14],[25,57,12,17],[37,25,10,20]]){h(P,D,-5,T,10,O,t.concrete);for(let N=0;N<5;N++)for(let X=0;X<4;X++)s()<.28||h(P-T/2+1+X*(T-2)/3,D-5.04,-2+N*2.5,.8,.035,1.1,Se({color:s()<.15?8483150:1384482}))}let st=new we,ft=new Float32Array(1080);for(let P=0;P<180;P++){let D=P>=90,T=D?-8+s()*16:1.4+s()*11,O=(D?6:3)+s()*9,N=(D?62:27)+s()*(D?22:8);ft.set([T,O,N,T-.035,O-.35,N],P*6)}st.setAttribute("position",new Ce(ft,3));let mt=new Zr(st,new Ps({color:10204862,transparent:!0,opacity:.22}));n.props.campaignDynamic.add(mt),d.rain=mt,h(-3.2,1.4,0,1.2,.7,.73,t.darkWood,!0);let vt=new Vt,Ut=new $(new Tt(.034,.034,.21,10),t.pale);Ut.rotation.z=Math.PI/2,vt.add(Ut);for(let P of[-.1,.1]){let D=new $(new Tt(.036,.036,.035,10),a);D.rotation.z=Math.PI/2,D.position.x=P,vt.add(D)}vt.position.set(-3.2,.78,1.4),i.add(vt),y("fuse",vt,"\u5907\u7528\u7194\u65AD\u5668"),p(-3.2,.13,1.35,"\u5907\u7528\u5DE5\u5177",["\u7194\u65AD\u5668 / \u914D\u7535\u95F4"],"n",.75);let Ft=h(6.75,11.4,.48,.5,.38,.25,t.darkWood);h(6.75,11.4,.73,.52,.4,.035,a);for(let P=0;P<4;P++)h(6.6+P*.1,11.34,.77,.045,.15,.025,a);n.regInteractable(Ft,"\u4FEE\u590D\u516B\u97F3\u76D2",2.7,()=>{var P,D;return(D=(P=n.handlers).onPuzzle)==null?void 0:D.call(P,"music")}),R(3,14.7,0),d.musicBox=Ft,Kh(n,{box:h,mesh:f,cylinder:g,sign:p,lamp:_,desk:v,chair:S,shelf:b,closet:R,recordDocument:m,pickup:y});for(let[P,D,T,O]of[[-1.58,17,1.2,"e"],[1.58,26.2,1.25,"w"],[-8.25,17.5,4,"e"],[11.93,16.7,-1.4,"e"]])n.decalWall(P,D,T,1.1,1.8,n.tex.rust,O);p(-1.58,15.7,1.7,"\u5929\u4E95\u51FA\u53E3",["\u7531\u697C\u68AF\u524D\u5F80\u4E8C\u697C","\u505C\u7535\u65F6\u7981\u6B62\u901A\u884C"],"e",.8,!0),p(.86,29.5,4.5,"\u5929\u4E95",[],"w",.43,!0),n.exitDoor.label="\u5929\u4E95\u9632\u706B\u95E8",n.exitDoor.slab.userData.interactable.label="\u5929\u4E95\u9632\u706B\u95E8",n.exitDoor.lockedMsg="\u95E8\u88AB\u6C34\u538B\u5B89\u5168\u9501\u5C01\u4F4F\u4E86\u3002\u5148\u89E3\u9664\u5730\u4E0B\u6C34\u95F8\u3002";for(let[P,D,T]of[[13.3,20.5,-2.8],[17.5,18,-2.8],[18,24.5,-2.8],[21.7,21.8,-2.8],[22.3,26,-2.8],[-3,21.5,2.8],[-5.5,23,2.8],[3,47,2.8],[5,49.5,2.8],[-3,42,2.8],[-7,45.7,2.8]])n.monsterNodes.push({x:P,y:T,z:D})}function Ml(n,t){let e=n.campaign;n.props.clock&&(n.props.clock.mysterySolved=!!t.flags.cabinet),e.valves[2].visible=!!t.flags.released,e.doors.service.locked=!t.flags.invitation,e.doors.office.locked=!t.flags.power,e.doors.resident.locked=!t.flags.power,e.doors.archive.locked=!t.flags.cabinet,e.doors.pump.locked=!t.flags.memory,e.doors.workshop.locked=!t.flags.power,e.doors.west.locked=!t.flags.memory,e.photo.visible=!!t.flags.photo,n.exitDoor.locked=!t.flags.released;for(let[i,s]of Object.entries(e.pickups)){let r=t.items.has(i)||i==="fuse"&&t.flags.power||i==="valveHandle"&&t.flags.released||["film","developer"].includes(i)&&t.flags.photo;s.mesh.visible=!r,s.interactable.disabled=r}for(let i of e.lamps)i.powered&&(i.light.intensity=t.flags.power?i.base:0,i.bulb.material.color.setHex(t.flags.power?12371891:2698537))}var ji=.2,Te=2.7,jh=2.05,R1=1.16,bo=class{constructor(t,e={}){this.scene=t,this.handlers=e,this.tex=Yh(),this.rng=Lt(20260814),this.stairs=[],this.colliders=[],this.doors=[],this.interactables=[],this.triggers=[],this.fluorescents=[],this.candles=[],this.tvLight=null,this.windowLights=[],this.ceilings=[],this.notePickups=[],this.props={},this.monsterNodes=[],this.ghostSpawns=[],this.ofudas=[],this.playerStart=new L(0,0,-6.4),this.materials=this._makeMaterials(),this._build(),this._buildDoors(),this._buildProps(),this._buildDecals(),this._buildLights(),$h(this),this._buildNodes(),this._initPerf()}_initPerf(){this._cullable=[];let t=new Set;for(let e of this.fluorescents)(e.mode==="dead"||e.base===0)&&t.add(e.light);this.scene.traverse(e=>{if(e.isPointLight){if(t.has(e)){e.visible=!1;return}this._cullable.push(e)}}),this.lightBudget=Math.min(14,this._cullable.length),this._budgetT=-1,this._viewDir=new L(0,0,1),this._lastCam={x:this.playerStart.x,y:this.playerStart.y,z:this.playerStart.z},this._freezeStaticMatrices(),this._applyLightBudget(this._lastCam.x,this._lastCam.y,this._lastCam.z)}_freezeStaticMatrices(){var s,r;let t=new Set,e=o=>{o&&o.traverse(a=>t.add(a))};for(let o of this.doors)e(o.pivot);let i=this.props;e((s=i.cabinet)==null?void 0:s.pivot),e((r=i.doll)==null?void 0:r.mesh),e(i.mobile),e(i.furin),e(i.campaignDynamic);for(let o of i.ropes||[])t.add(o);for(let o of this.ofudas)t.add(o);for(let o of i.batteries||[])t.add(o.halo);this.scene.traverse(o=>{t.has(o)||o.isLight||o.isCamera||(o.matrixAutoUpdate=!1,o.updateMatrix())})}registerLight(t){!t||!t.isPointLight||this._cullable.includes(t)||(this._cullable.push(t),t.visible=!1,this._applyLightBudgetNow())}unregisterLight(t){let e=this._cullable.indexOf(t);e>=0&&this._cullable.splice(e,1),t.visible=!1,this._applyLightBudgetNow()}_applyLightBudgetNow(){let t=this._lastCam;this._applyLightBudget(t.x,t.y,t.z)}_applyLightBudget(t,e,i){this._lastCam.x=t,this._lastCam.y=e,this._lastCam.z=i;let s=this.lightBudget,r=this._cullable,o=r.length;if(o<=s){for(let d=0;d<o;d++)r[d].visible=!0;return}let a=this._viewDir.x,l=this._viewDir.z,c=Math.hypot(a,l)||1,u=this._scored||(this._scored=new Array(o));for(let d=0;d<o;d++){let h=r[d],f=h.position.x-t,g=h.position.y-e,x=h.position.z-i,p=f*f+x*x+g*g*.6,m=Math.sqrt(f*f+x*x)||1,y=(f*a+x*l)/(m*c);y>.3?p*=.4:y<-.4&&p>49&&(p*=3),h.intensity<=.001&&(p+=1e7),h.visible&&(p*=.75),u[d]?(u[d].l=h,u[d].s=p):u[d]={l:h,s:p}}u.length=o,u.sort((d,h)=>d.s-h.s);for(let d=0;d<s;d++)u[d].l.visible=!0;for(let d=s;d<o;d++)u[d].l.visible=!1}_makeMaterials(){let t=this.tex;return{plaster:ot({map:t.plaster,vertexColors:!0}),wallpaper:ot({map:t.wallpaper,vertexColors:!0}),woodWall:ot({map:t.woodWall,vertexColors:!0}),woodDoor:ot({map:t.woodDoor,roughness:.8}),woodFloor:ot({map:t.woodFloor,vertexColors:!0,roughness:.72,metalness:.04}),tatami:ot({map:t.tatami,vertexColors:!0,roughness:.85}),ceiling:ot({map:t.ceiling,vertexColors:!0,roughness:1}),concrete:ot({map:t.concrete,vertexColors:!0}),rust:ot({map:t.rust,roughness:.68,metalness:.12}),fusuma:ot({map:t.fusuma,roughness:.9}),quilt:ot({map:t.quilt,roughness:.95}),brick:ot({map:t.brick,vertexColors:!0}),darkMetal:ot({color:1382428,roughness:.45,metalness:.3}),black:ot({color:724240,roughness:.9}),pale:ot({color:14077888,roughness:.85}),darkWood:ot({color:3811868,roughness:.75}),waterDark:ot({color:858644,roughness:.15,metalness:.25}),moonWin:Se({map:t.windowMoon}),tvScreen:Se({map:t.tvStatic}),exitSign:Se({map:t.exitSign}),ofuda:ot({map:t.ofuda,side:oe}),photo:ot({map:t.photo,roughness:.85}),porcelain:ot({color:12896448,roughness:.45}),clothRed:ot({color:7219746,roughness:.95}),whiteMetal:ot({color:10133668,roughness:.68,metalness:.08}),tile:ot({map:t.tile,vertexColors:!0,roughness:.72}),mailbox:ot({map:t.mailbox,roughness:.6,metalness:.3})}}box(t,e,i,s,r,o,a,l={}){var d,h,f;let c=(d=l.geo)!=null&&d.bevel?Mn(s,o,r):Re(s,o,r,l.geo||{}),u=new $(c,l.material||a);if(u.position.set(t,i+o/2,e),u.castShadow=(h=l.cast)!=null?h:!0,u.receiveShadow=(f=l.receive)!=null?f:!0,this.scene.add(u),l.collide!==!1){let g=Si(t,i+o/2,e,s,o,r);this.colliders.push(g),u.userData.collider=g}return u}wallX(t,e,i,s,r,o,a=[],l={}){var d,h;let c=[],u=e;for(let[f,g]of[...a].sort((x,p)=>x[0]-p[0]))f>u&&c.push([u,f]),u=Math.max(u,g);u<i&&c.push([u,i]);for(let[f,g]of c){let x=g-f;this.box(t,(f+g)/2,s,ji,x,r,o,{geo:{uv:[x/2.6,r/2.6],ao:"wall",aoStrength:(d=l.ao)!=null?d:.85,jitter:.012},collide:(h=l.collide)!=null?h:!0})}}wallZ(t,e,i,s,r,o,a=[],l={}){var d,h;let c=[],u=e;for(let[f,g]of[...a].sort((x,p)=>x[0]-p[0]))f>u&&c.push([u,f]),u=Math.max(u,g);u<i&&c.push([u,i]);for(let[f,g]of c){let x=g-f;this.box((f+g)/2,t,s,x,ji,r,o,{geo:{uv:[x/2.6,r/2.6],ao:"wall",aoStrength:(d=l.ao)!=null?d:.85,jitter:.012},collide:(h=l.collide)!=null?h:!0})}}floor(t,e,i,s,r,o,a){return this.box(t,e,r-.12,i,s,.12,o,{geo:{uv:a||[i/3,s/3],ao:"floor",aoStrength:.9}})}ceil(t,e,i,s,r,o){let a=this.box(t,e,r,i,s,.12,o,{geo:{uv:[i/3,s/3],ao:"ceil",aoStrength:.95},cast:!1,collide:!1});return this.ceilings.push({x0:t-i/2,x1:t+i/2,z0:e-s/2,z1:e+s/2,y:r}),a}room(t,e,i,s,r={}){var u,d,h,f,g,x;let o=this.materials,a=(u=r.h)!=null?u:Te,l=(d=r.y)!=null?d:0;this.floor((t+e)/2,(i+s)/2,e-t+.2,s-i+.2,l,r.floorMat||o.woodFloor,r.floorUV),this.ceil((t+e)/2,(i+s)/2,e-t+.2,s-i+.2,l+a,r.ceilMat||o.ceiling);let c=r.wallMat||o.plaster;r.walls!==!1&&(r.n!==!1&&this.wallZ(i,t,e,l,a,c,((h=r.gaps)==null?void 0:h.n)||[],{ao:r.ao}),r.s!==!1&&this.wallZ(s,t,e,l,a,c,((f=r.gaps)==null?void 0:f.s)||[],{ao:r.ao}),r.w!==!1&&this.wallX(t,i,s,l,a,c,((g=r.gaps)==null?void 0:g.w)||[],{ao:r.ao}),r.e!==!1&&this.wallX(e,i,s,l,a,c,((x=r.gaps)==null?void 0:x.e)||[],{ao:r.ao}))}decalFloor(t,e,i,s,r,o=0,a=.012,l=!0){let c=new ae(i,s);c.rotateX(-Math.PI/2);let u=l?ot({map:r,transparent:!0,depthWrite:!1,roughness:.92}):Se({map:r,transparent:!0,depthWrite:!1});u.polygonOffset=!0,u.polygonOffsetFactor=-3,u.polygonOffsetUnits=-3;let d=new $(c,u);return d.position.set(t,a,e),d.rotation.y=o,d.renderOrder=2,d.receiveShadow=!1,this.scene.add(d),d}decalWall(t,e,i,s,r,o,a,l=0,c=!0){let u=new ae(s,r),d=c?ot({map:o,transparent:!0,depthWrite:!1,roughness:.92}):Se({map:o,transparent:!0,depthWrite:!1});d.polygonOffset=!0,d.polygonOffsetFactor=-3,d.polygonOffsetUnits=-3;let h=new $(u,d),f=.015;return a==="n"&&h.position.set(t,i,e-f),a==="s"&&(h.position.set(t,i,e+f),h.rotation.y=Math.PI),a==="e"&&(h.position.set(t+f,i,e),h.rotation.y=Math.PI/2),a==="w"&&(h.position.set(t-f,i,e),h.rotation.y=-Math.PI/2),l&&h.rotateY(l),h.renderOrder=2,h.receiveShadow=!1,this.scene.add(h),h}_build(){let t=this.materials;this.wallX(-1.7,0,8,0,Te,t.plaster,[[3.2,4.4]]),this.wallX(-1.7,8,20,0,Te,t.plaster,[[10,11.2]]),this.wallX(-1.85,20,24,0,Te,t.plaster,[]),this.wallX(-1.7,24,32,0,Te,t.plaster,[]),this.wallX(-1.9,32,58,0,Te,t.plaster,[[48.6,49.8]]),this.wallX(1.7,0,32,0,Te,t.plaster,[[3,4.2],[10,11.2],[19.8,21.2]]),this.wallX(1.9,32,58,0,Te,t.plaster,[[43,45]]),this.wallZ(20,-1.85,-1.7,0,Te,t.plaster),this.wallZ(24,-1.85,-1.7,0,Te,t.plaster),this.wallZ(32,-1.9,-1.7,0,Te,t.plaster),this.wallZ(32,1.7,1.9,0,Te,t.plaster),this.wallZ(58,-1.9,-1.7,0,Te,t.plaster),this.wallZ(58,1.7,1.9,0,Te,t.plaster),this.wallX(-1.7,58,61.7,0,Te,t.plaster),this.wallX(1.7,58,61.7,0,Te,t.plaster),this.floor(0,-1,3.4,2,0,t.concrete),this.floor(0,12,3.6,24,0,t.woodFloor),this.floor(0,28,3.4,8,0,t.woodFloor),this.floor(0,45,3.8,26,0,t.woodFloor),this.floor(0,59.85,3.4,3.7,0,t.concrete),this.ceil(0,12,3.6,24,2.7,t.ceiling),this.ceil(0,28,3.4,8,2.7,t.ceiling),this.ceil(0,45,3.8,26,2.7,t.ceiling),this.ceil(0,59.85,3.4,3.7,2.7,t.ceiling);let e=2.8,i=2.4;this.floor(0,30.85,2,61.7,e,t.woodFloor),this.ceil(0,31,2,62,e+i,t.ceiling),this.wallX(-1,0,61.7,e,i,t.plaster,[[20,21.4],[40,41.4],[55,56.6]]),this.wallX(1,0,61.7,e,i,t.plaster,[[30,31.2],[46,47.4]]),this.wallZ(0,-1,1,e,i,t.plaster),this.wallX(-1.7,-2,0,0,Te,t.concrete),this.wallX(1.7,-2,0,0,Te,t.concrete),this.ceil(0,-1,3.4,2,2.7,t.ceiling),this.wallZ(-2,-1.7,1.7,0,Te,t.plaster,[[-.58,.58]]),this.box(-.95,-1.5,0,.3,.7,1,t.darkWood,{geo:{ao:"wall"}}),this.room(-8.4,-1.3,0,7.5,{n:!0,w:!0,s:!0,e:!1,wallMat:t.wallpaper}),this.room(-8.4,-1.3,7.5,15.5,{n:!0,w:!0,s:!1,e:!1,wallMat:t.wallpaper,gaps:{w:[[12.2,13.4]]}}),this.room(-13.8,-8.4,7.5,15.5,{n:!0,w:!0,s:!0,e:!1,wallMat:t.plaster,gaps:{w:[[13.8,14.8]]}}),this.room(-16.4,-14.6,13.8,14.8,{n:!0,w:!0,s:!1,e:!1,wallMat:t.concrete,h:2.2}),this.room(-17.6,-13.8,14.8,21,{n:!1,w:!0,s:!0,e:!1,wallMat:t.concrete,floorMat:t.tile,floorUV:[5,8]}),this.wallX(-13.8,15.5,21,0,Te,t.concrete,[]),this.wallZ(14.8,-17.6,-13.8,0,Te,t.concrete,[[-16.3,-15]]),this.room(1.3,8.4,0,8.5,{n:!0,w:!1,s:!0,e:!0,floorMat:t.tatami,floorUV:[9.5,4.7],wallMat:t.woodWall}),this.room(1.3,8.4,8.5,15.5,{n:!0,w:!1,s:!1,e:!0,wallMat:t.wallpaper}),this._buildTrim(),this._buildDetailProps()}_buildDetailProps(){let t=this.materials,e=this.tex,i=this.rng,s=(u,d,h,f)=>{let g=d-u;this.box((u+d)/2,h+(f==="s"?.008:-.008),0,g,.016,1.3,t.tile,{geo:{uv:[g/.6,1.3/.6],ao:"wall"},collide:!1,cast:!1})},r=(u,d,h,f)=>{let g=d-u;this.box(h+(f==="e"?.008:-.008),(u+d)/2,0,.016,g,1.3,t.tile,{geo:{uv:[g/.6,1.3/.6],ao:"wall"},collide:!1,cast:!1})};r(14.92,20.88,-17.5,"w"),s(-17.48,-13.92,20.9,"s"),r(15.6,20.88,-13.9,"e"),s(-17.48,-16.32,14.9,"n"),s(-14.98,-13.92,14.9,"n");let o=new $(new Tt(.012,.012,1.5,6),t.darkMetal);o.rotation.z=Math.PI/2,o.position.set(-15.8,1.95,19.9),this.scene.add(o),this.box(.92,-1.892,1.15,1.04,.018,.52,t.mailbox,{geo:{uv:[1,1],ao:"wall"},collide:!1,cast:!1});let a=new $(new Tt(.11,.09,.5,8,1,!0),ot({color:4865846,roughness:.9,side:oe}));a.position.set(-.98,.25,-.45),this.scene.add(a);for(let[u,d,h]of[[-1.02,-.48,.16],[-.95,-.42,-.12]]){let f=new $(new Tt(.022,.012,.86,6),ot({color:2894896,roughness:.7}));f.position.set(u,.44,d),f.rotation.z=h,this.scene.add(f)}this.colliders.push(Si(-.98,.25,-.45,.24,.5,.24));for(let u=0;u<3;u++){let d=-5.55+u*.78;this.box(d,12,.42,.72,.62,.1,ot({color:4538163,roughness:.95}),{geo:{ao:"none",jitter:.008},collide:!1,cast:!1}),this.box(d,12.42,.52,.7,.15,.4,ot({color:4209199,roughness:.95}),{geo:{ao:"none",jitter:.008},collide:!1,cast:!1})}let l=this.box(-5,11.98,.52,.7,.6,.05,t.quilt,{geo:{ao:"none",jitter:.02,uv:[1.5,1]},collide:!1,cast:!1});l.rotation.z=.08,l.rotation.x=.05,this.box(-9.9,12.55,.24,.34,.24,.07,t.pale,{geo:{ao:"none"},collide:!1,cast:!1});let c=this.box(-10.55,12.3,.24,.5,1,.07,t.quilt,{geo:{ao:"none",jitter:.015,uv:[1,2]},collide:!1,cast:!1});c.rotation.y=.04,this.box(-6.2,7.392,.98,3.4,.016,.6,t.tile,{geo:{uv:[3.4/.6,1],ao:"wall"},collide:!1,cast:!1}),this.box(-3.4,7.392,.98,.95,.016,.6,t.tile,{geo:{uv:[1.6,1],ao:"wall"},collide:!1,cast:!1});for(let[u,d]of[[-6.9,6.6],[-6.55,6.62]]){let h=new $(new Tt(.004,.004,.14,4),t.darkMetal);h.position.set(u,1.65,d),this.scene.add(h);let f=new $(new Tt(.11,.11,.035,10,1,!0),ot({color:3816770,roughness:.55,metalness:.2,side:oe}));f.position.set(u,1.56,d),this.scene.add(f)}this.box(3.1,12.8,0,.55,.55,.04,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1});for(let[u,d]of[[2.87,12.57],[3.33,12.57],[2.87,13.03],[3.33,13.03]])this.box(u,d,0,.04,.04,.3,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1});this.box(3.1,13.35,0,.3,.3,.04,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(3.1,13.35,.04,.04,.04,.26,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(3.1,13.48,.04,.3,.03,.3,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1});for(let u=0;u<3;u++){let d=new $(new Tt(.006,.006,.08,5),ot({color:[12595248,3170496,3186752][u],roughness:.8}));d.rotation.z=Math.PI/2,d.rotation.y=i()*3,d.position.set(2.95+u*.12,.045,12.7+i()*.2),this.scene.add(d)}}_baseboard(t,e,i,s,r=[]){let o=e;for(let[a,l]of[...r].sort((c,u)=>c[0]-u[0]))a>o&&this._baseSegZ(t,o,Math.min(a,i),s),o=Math.max(o,l);o<i&&this._baseSegZ(t,o,i,s)}_baseSegZ(t,e,i,s){let r=this.materials,o=8;for(let a=e;a<i;a+=o){let l=Math.min(o,i-a);this.box(t,a+l/2,s,.03,l,.14,r.darkWood,{geo:{ao:"wall",uv:[l/2,.2]},collide:!1,cast:!1})}}_baseboardX(t,e,i,s,r=[]){let o=e;for(let[a,l]of[...r].sort((c,u)=>c[0]-u[0]))a>o&&this._baseSegX(t,o,Math.min(a,i),s),o=Math.max(o,l);o<i&&this._baseSegX(t,o,i,s)}_baseSegX(t,e,i,s){let r=this.materials,o=8;for(let a=e;a<i;a+=o){let l=Math.min(o,i-a);this.box(a+l/2,t,s,l,.03,.14,r.darkWood,{geo:{ao:"wall",uv:[l/2,.2]},collide:!1,cast:!1})}}_wainscot(t,e,i,s=.15,r=.85){let o=this.materials,a=8;for(let l=e;l<i;l+=a){let c=Math.min(a,i-l);this.box(t,l+c/2,s,.025,c,r,o.woodWall,{geo:{ao:"wall",uv:[c/2,r/2]},collide:!1,cast:!1})}}_pipe(t,e,i,s){let r=this.materials,o=i-e,a=new Tt(.035,.035,o,6);a.rotateX(Math.PI/2);let l=new $(a,r.rust);l.position.set(t,s,(e+i)/2),l.castShadow=!0,this.scene.add(l);for(let c=e+1.5;c<i-1;c+=3)this.box(t-.02,c,s,.04,.04,.05,r.darkMetal,{geo:{ao:"none"},collide:!1,cast:!1});return l}_radiator(t,e){let i=this.materials,s=Math.sign(t),r=t-s*.125;this.box(r,e,.15,.08,1.5,.55,i.rust,{geo:{ao:"wall",uv:[1.8,.8]}});let o=ot({color:4869974,roughness:.6,metalness:.22});for(let d=0;d<7;d++)this.box(r-s*.075,e-.63+d*.21,.22,.065,.07,.46,o,{geo:{ao:"none"},collide:!1,cast:!1});this.box(r,e,.72,.08,1.4,.03,i.darkMetal,{geo:{ao:"none"},collide:!1,cast:!1});for(let d of[e-.6,e+.6])this.box(r,d,.035,.1,.09,.09,i.rust,{geo:{ao:"none"},collide:!1,cast:!1});let a=new $(new Tt(.028,.028,(s>0,.16),6),ot({color:5917250,roughness:.75,metalness:.25}));a.rotation.z=Math.PI/2,a.position.set(r+s*.11,.68,e),this.scene.add(a);let l=new $(new Tt(.042,.042,.03,6),i.darkMetal);l.rotation.z=Math.PI/2,l.position.set(r+s*.05,.68,e),this.scene.add(l);let c=new $(new Tt(.03,.03,.05,6),ot({color:8006180,roughness:.5,metalness:.2}));c.rotation.z=Math.PI/2,c.position.set(r-s*.06,.34,e-.62),this.scene.add(c);let u=new Vt;for(let d of[0,Math.PI/2]){let h=new $(Re(.008,.075,.02),ot({color:9056296,roughness:.55}));h.rotation.x=d,u.add(h)}u.position.set(r-s*.1,.34,e-.62),this.scene.add(u)}_buildTrim(){let t=this.materials;this._baseboard(-1.585,0,3.2,0),this._baseboard(-1.585,4.4,10,0),this._baseboard(-1.585,11.2,20,0),this._baseboard(-1.735,20,24,0),this._baseboard(-1.585,24,32,.16),this._baseboard(-1.775,32,48.6,0),this._baseboard(-1.775,49.8,58,0),this._baseboard(1.585,0,3,0),this._baseboard(1.585,4.2,10,0),this._baseboard(1.585,11.2,24,0,[[19.8,21.2]]),this._baseboard(1.585,24,32,0),this._baseboard(1.775,32,38,0),this._baseboard(1.775,38,46,0,[[43,45]]),this._baseboard(1.775,46,54,0),this._baseboard(1.775,54,58,0),this._wainscot(-1.775,32,48.6),this._wainscot(-1.775,49.8,58),this._wainscot(1.775,32,43),this._wainscot(1.775,45,58);for(let e of[-1.775,1.775])this.box(e,45,2.48,.03,26,.05,t.darkWood,{geo:{ao:"wall",uv:[26/2,.1]},collide:!1,cast:!1});this._baseboard(-8.285,0,7.5,0),this._baseboardX(.115,-8.4,-1.3,0),this._baseboardX(7.385,-8.4,-1.3,0),this._baseboard(-8.285,7.5,15.5,0,[[12.2,13.4]]),this._baseboardX(7.615,-8.4,-1.3,0),this._baseboard(-13.685,7.5,15.5,0,[[13.8,14.8]]),this._baseboardX(7.615,-13.8,-8.4,0),this._baseboardX(15.385,-13.8,-8.4,0),this._baseboard(-8.515,7.5,15.5,0),this._baseboardX(.115,1.3,8.4,0),this._baseboardX(8.385,1.3,8.4,0),this._baseboard(8.285,0,8.5,0),this._baseboardX(8.615,1.3,8.4,0),this._baseboard(8.285,8.5,15.5,0),this._baseboard(-.885,1.6,63.2,2.8,[[20,21.4],[40,41.4],[55,56.6]]),this._baseboard(.885,1.6,30,2.8),this._baseboard(.885,31.2,63.2,2.8,[[46,47.4]]);for(let e of[5.65,10.05,14.6,19.2,23.8,28.4,33,37.6,42.2,46.8,51.4])this.box(0,e,2.56,e>=33?3.8:3.4,.16,.14,t.darkWood,{geo:{ao:"ceil",uv:[3,.2]},collide:!1,cast:!1});for(let e of[5.6,11.6,17.6,23.6,35.6,41.6,47.6,53.6,59.6])this.box(0,e,2.8+2.26,2,.16,.14,t.darkWood,{geo:{ao:"ceil",uv:[2.5,.2]},collide:!1,cast:!1});this._pipe(-1.65,2,32,2.42),this._pipe(-1.85,32,55,2.42),this._pipe(-.87,2,55,2.8+2.12),this.decalFloor(-1.65,33,.5,.5,this.tex.blood,.3),this.box(-1.5,33.6,0,.26,.26,.2,t.darkMetal,{geo:{ao:"none"},collide:!1,cast:!1}),this._radiator(1.7,16.8),this._radiator(-1.9,40.8)}_doorFrame(t,e,i,s,r=0){let o=this.materials,a=jh;i==="z"?(this.box(t,e,r,ji+.06,.07,a,o.darkWood,{geo:{ao:"wall"}}),this.box(t,e+s,r,ji+.06,.07,a,o.darkWood,{geo:{ao:"wall"}}),this.box(t,e+s/2,r+a,ji+.06,s,.12,o.darkWood,{geo:{ao:"wall"}})):(this.box(t,e,r,.07,ji+.06,a,o.darkWood,{geo:{ao:"wall"}}),this.box(t+s,e,r,.07,ji+.06,a,o.darkWood,{geo:{ao:"wall"}}),this.box(t+s/2,e,r+a,s,ji+.06,.12,o.darkWood,{geo:{ao:"wall"}}))}makeDoor(t){let e=this.materials,{x:i,z:s,along:r="z",width:o=R1,height:a=jh,dir:l=1,label:c="\u95E8",locked:u=!1,lockedMsg:d="\u9501\u7740\u2026\u2026",mat:h=e.woodDoor,type:f="swing",slideOffset:g=1.15,onOpen:x=null,openAngle:p=1.72,offset:m=0,y=0}=t;this._doorFrame(i,s,r,o,y);let _=new Vt,v=r==="z"?i+m:i,S=r==="z"?s:s+m;_.position.set(v,y,S);let b=Mn(o,a,.06);r==="z"&&b.rotateY(Math.PI/2);let R=new $(b,h===e.woodDoor?En(this).wood:h);R.castShadow=!0,R.receiveShadow=!0,r==="z"?R.position.set(0,a/2,o/2):R.position.set(o/2,a/2,0),_.add(R),this.scene.add(_);let U=new $(new Be(.035,16,10),ot({color:9075258,roughness:.55,metalness:.3}));r==="z"?U.position.set(-.06,a*.54,o/2-.09):U.position.set(o/2-.09,a*.54,-.06),R.add(U),Wh(this,R,o,a,r);let M={pivot:_,slab:R,knob:U,along:r,type:f,width:o,height:a,dir:l,angle:0,target:0,open:!1,locked:u,lockedMsg:d,onOpen:x,openAngle:p,slideOffset:g,slidePos:0,slideTarget:0,collider:r==="z"?Si(v,y+a/2,s+o/2,.12,a,o):Si(i+o/2,y+a/2,S,o,a,.12),label:c,enabled:!0,hinge:new L(v,y,S)};this.doors.push(M);let E={mesh:R,label:c,dist:2.6,action:()=>this.toggleDoor(M),door:M};return R.userData.interactable=E,this.interactables.push(E),M}toggleDoor(t){var e,i,s,r;if(t.locked){(i=(e=this.handlers).onLocked)==null||i.call(e,t);return}t.open=!t.open,t.target=t.open?1:0,t.type==="slide"&&(t.slideTarget=t.open?-t.slideOffset:0),(r=(s=this.handlers).onDoorToggle)==null||r.call(s,t,t.open),t.open&&t.onOpen&&t.onOpen(t)}forceOpen(t){t.locked||t.open||(t.open=!0,t.target=1,t.type==="slide"&&(t.slideTarget=-t.slideOffset),t.onOpen&&t.onOpen(t))}regInteractable(t,e,i,s){let r={mesh:t,label:e,dist:i,action:s};return t.userData.interactable=r,this.interactables.push(r),r}updateDoors(t){for(let e of this.doors)if(e.type==="swing")if(e.angle=Qt(e.angle+(e.target*e.openAngle-e.angle)*Math.min(1,t*3.2),0,e.openAngle),e.pivot.rotation.y=e.angle*e.dir,e.angle<1.05){e.slab.updateWorldMatrix(!0,!0),e.slab.geometry.computeBoundingBox();let i=e.slab.geometry.boundingBox.clone().applyMatrix4(e.slab.matrixWorld);e.collider={x0:i.min.x,y0:i.min.y,z0:i.min.z,x1:i.max.x,y1:i.max.y,z1:i.max.z}}else e.collider=null;else{e.slidePos+=(e.slideTarget-e.slidePos)*Math.min(1,t*3);let i=e.width/2;e.along==="z"?e.slab.position.z=i+e.slidePos:e.slab.position.x=i+e.slidePos,e.slidePos>-.7?e.collider=e.along==="z"?Si(e.hinge.x,e.hinge.y+e.height/2,e.hinge.z+i+e.slidePos,.12,e.height,e.width):Si(e.hinge.x+i+e.slidePos,e.hinge.y+e.height/2,e.hinge.z,e.width,e.height,.12):e.collider=null}}_buildDoors(){let t=this.materials;this.makeDoor({x:-1.7,z:3.2,dir:-1,offset:.11,label:"\u53A8\u623F\u7684\u95E8"}),this.makeDoor({x:-1.7,z:10,dir:-1,offset:.11,label:"\u5BA2\u5385\u7684\u95E8"}),this.makeDoor({x:-8.4,z:12.2,width:1.14,height:2,type:"slide",mat:t.fusuma,label:"\u7EB8\u62C9\u95E8",slideOffset:1.15,offset:.12}),this.makeDoor({x:1.7,z:3,dir:1,offset:-.11,label:"\u4F5B\u95F4\u7684\u95E8"}),this.makeDoor({x:1.7,z:10,dir:1,offset:-.11,label:"\u513F\u7AE5\u623F\u7684\u95E8"}),this.makeDoor({x:-1.9,z:48.6,dir:-1,offset:.11,label:"\u6CA1\u6709\u7528\u8FC7\u7684\u95E8",onOpen:()=>{var e,i;return(i=(e=this.handlers).onDeadDoor)==null?void 0:i.call(e)}}),this.box(-2.25,48.6,0,.2,1.4,2.7,t.brick,{geo:{ao:"wall"}}),this.makeDoor({x:-.58,z:-2,along:"x",width:1.16,dir:1,offset:.11,label:"\u7384\u5173\u7684\u95E8",locked:!1}),this.exitDoor=this.makeDoor({x:1,z:30,dir:1,offset:-.11,y:2.8,label:"\u901A\u5F80\u5916\u754C\u7684\u95E8",locked:!0,lockedMsg:"\u597D\u50CF\u8FD8\u7F3A\u4E86\u4EC0\u4E48\u2026\u2026",onOpen:()=>{var e,i;return(i=(e=this.handlers).onExitOpen)==null?void 0:i.call(e)}}),this.box(1.5,30.6,2.8,1.3,1.5,.15,t.concrete,{geo:{ao:"floor"}}),this.makeDoor({x:-13.8,z:13.8,width:.9,height:2,dir:1,offset:.11,label:"\u58C1\u6A71"}),this.box(-14.6,13.86,0,.12,.1,2.1,t.darkWood,{geo:{ao:"wall"}}),this.box(-14.25,13.86,0,.7,.06,2.1,t.darkWood,{geo:{ao:"wall"}}),this.box(-14.25,14.3,2.1,.7,1,.1,t.darkWood,{geo:{ao:"wall"}}),this.box(-13.85,14.3,2.1,.2,1,.6,t.darkWood,{geo:{ao:"wall"}}),this.floor(-14.25,14.25,.7,.9,0,t.woodFloor)}_buildProps(){let t=this.materials,e=this.tex,i=this.rng,s=2.8;this.box(-6.2,7.25,0,3.4,.62,.92,t.darkWood,{geo:{ao:"wall",uv:[4,1]}}),this.box(-6.2,7.25,.92,3.5,.7,.06,ot({color:6514271,roughness:.78,metalness:.12}),{geo:{ao:"none"}}),this.box(-6.6,7.25,1.6,2.4,.62,.62,t.darkWood,{geo:{ao:"wall"}});let r=new Vt;r.position.set(-7.75,1.6,6.93);let o=new $(Re(1.05,.54,.04,{uv:[1,1]}),t.darkWood);o.position.set(.525,.27,0),r.add(o),this.scene.add(r),this.props.cabinet={pivot:r,angle:0,openedOnce:!1},this.box(-7.7,2.85,0,.85,.85,1.75,t.rust,{geo:{ao:"wall"}}),this.box(-7.7,3.29,.875,.8,.06,1.75,t.darkMetal,{geo:{ao:"none"},collide:!1}),this.box(-5.3,4.6,0,1.4,.8,.06,t.darkWood,{geo:{ao:"none",uv:[2,1]}});for(let[H,j]of[[-5.85,4.6],[-4.75,4.6],[-5.3,4.05],[-5.3,5.15]])this.box(H,j,.06,.08,.08,.72,t.darkWood,{geo:{ao:"none"}});this.box(-5.3,3.55,0,.55,.55,.46,t.darkWood,{geo:{ao:"wall"}}),this.box(-5.3,3.32,.46,.55,.07,.55,t.darkWood,{geo:{ao:"none"}}),this.box(-5.3,5.65,0,.55,.55,.46,t.darkWood,{geo:{ao:"wall"}}),this.box(-5.3,5.88,.46,.55,.07,.55,t.darkWood,{geo:{ao:"none"}}),this.box(-5.5,7,.98,.26,.26,.22,t.darkMetal,{geo:{ao:"none"}}),this.box(-5.8,7.2,.95,.45,.26,.05,t.darkMetal,{geo:{ao:"none"},collide:!1}),this.box(-5.8,7.2,.99,.6,.4,.015,t.darkMetal,{geo:{ao:"none"},collide:!1});let a=new $(new Tt(.022,.022,.3,6),t.darkMetal);a.position.set(-5.72,1.14,7.31);let l=new $(new Tt(.018,.018,.34,6),t.darkMetal);l.rotation.x=Math.PI/2,l.position.set(-5.72,1.26,7.21),this.scene.add(a,l),this.box(-3.4,7.25,0,.95,.62,.92,t.whiteMetal,{geo:{ao:"wall"}});for(let[H,j]of[[-3.55,7.05],[-3.25,7.05],[-3.55,7.29],[-3.25,7.29]]){let At=new $(new Tt(.07,.07,.02,8),t.darkMetal);At.position.set(H,.93,j),this.scene.add(At)}this.box(-3.4,7.25,1.72,1,.42,.28,t.darkMetal,{geo:{ao:"wall"},collide:!1}),this.box(-3.4,7.25,2,.24,.24,.4,t.rust,{geo:{ao:"none"},collide:!1}),this.box(-6.7,6.6,1.72,1.7,.28,.04,t.darkWood,{geo:{ao:"none"},collide:!1});let c=[4876880,6965808,4868704,6318666];for(let H=0;H<4;H++){let j=new $(new Tt(.035,.03,.12,6),ot({color:c[H],roughness:.3,metalness:.2}));j.position.set(-7.25+H*.32,1.8,6.6),this.scene.add(j)}let u=this.box(-8.22,3.2,1.45,.16,.1,.24,ot({color:4016706,roughness:.6}),{geo:{ao:"none"},collide:!1});this.props.phone=u,this.regInteractable(u,"\u7535\u8BDD",2,()=>{var H,j;return(j=(H=this.handlers).onPhone)==null?void 0:j.call(H)}),this.decalFloor(-2.6,5.6,.42,.56,e.news,i()*3),this.decalFloor(-6.4,1.6,.42,.56,e.news,.7);let d=ot({color:13223092,roughness:.55});for(let[H,j,At]of[[-5.9,7.16,.09],[-5.7,7.26,.11],[-5.86,7.3,.08]]){let se=new $(new Tt(At,At*.72,.055,8),d);se.position.set(H,.99,j),this.scene.add(se)}let h=new $(Re(.012,.012,.24),ot({color:10124111,roughness:.85}));h.position.set(-5.78,1.005,7.2),h.rotation.y=.5,this.scene.add(h);let f=new $(new Tt(.11,.1,.13,10),t.darkMetal);f.position.set(-3.55,1.005,7.05),this.scene.add(f);let g=new $(new Tt(.14,.15,.17,10),t.whiteMetal);g.position.set(-6.95,1.065,7.15),this.scene.add(g);let x=new $(new Tt(.145,.145,.02,10),t.darkMetal);x.position.set(-6.95,1.16,7.15),this.scene.add(x);let p=new $(new Tt(.028,.032,.15,6),ot({color:3023128,roughness:.4}));p.position.set(-5.15,1.055,7.15),this.scene.add(p),this.box(-6.5,15.15,0,1.1,.45,.45,t.darkWood,{geo:{ao:"wall"}});let m=this.box(-6.5,15.25,.45,1,.45,.72,t.darkMetal,{geo:{ao:"none"}}),y=new $(new ae(.86,.6),t.tvScreen);y.position.set(-6.5,1.05,15.02),y.rotation.y=Math.PI,this.scene.add(y),this.props.tv={body:m,screen:y,on:!1,timer:0},this.regInteractable(m,"\u7535\u89C6",2.4,()=>{var H,j;return(j=(H=this.handlers).onTV)==null?void 0:j.call(H)}),this.box(-4.8,12,0,2.4,.75,.42,ot({color:4867128,roughness:.95}),{geo:{ao:"wall"}}),this.box(-4.8,12.62,.42,2.4,.24,.5,ot({color:3946542,roughness:.95}),{geo:{ao:"none"}}),this.box(-5.95,12.2,0,.16,.6,.55,t.darkWood,{geo:{ao:"none"}}),this.box(-3.65,12.2,0,.16,.6,.55,t.darkWood,{geo:{ao:"none"}}),this.box(-4.9,14,0,1.1,.6,.06,t.darkWood,{geo:{ao:"none"}}),this.box(-4.9,14,.06,.1,.1,.32,t.darkWood,{geo:{ao:"none"}}),this.tvLight=new Fe(9418444,0,7,1.8),this.tvLight.position.set(-6.5,1.4,14.2),this.scene.add(this.tvLight);for(let H of[-.25,.25]){let j=new $(new Tt(.008,.008,.5,4),t.darkMetal);j.position.set(-6.5+H,1.38,15.25),j.rotation.z=H>0?-.5:.5,j.rotation.x=.35,this.scene.add(j)}let _=new $(new ae(.86,.6),Se({map:e.tvFace,transparent:!0}));_.position.set(-6.5,1.05,14.99),_.rotation.y=Math.PI,_.visible=!1,this.scene.add(_),this.props.tvFace=_,this.box(-8.15,10.3,0,.3,2.2,1.9,t.darkWood,{geo:{ao:"wall"}}),this.box(-8.15,10.3,.65,.32,2.05,.05,t.darkWood,{geo:{ao:"none"},collide:!1}),this.box(-8.15,10.3,1.25,.32,2.05,.05,t.darkWood,{geo:{ao:"none"},collide:!1});let v=[6959136,2117738,3824176,6969888,4862032,5263440,7356448,2767434];for(let H of[.7,1.3])for(let j=0;j<8;j++){let At=.045+i()*.05;this.box(-7.98,9.42+j*.25,H,.05,At,.2+i()*.13,ot({color:v[(j*3+(H>1?1:0))%8],roughness:.9}),{geo:{ao:"none"},collide:!1,cast:!1})}for(let H=0;H<3;H++){let j=this.box(-8.03,9.8+H*.3,1.93,.24,.05,.035,ot({color:v[H+2],roughness:.9}),{geo:{ao:"none"},collide:!1,cast:!1});j.rotation.z=.2+i()*.4}this.decalFloor(-5.2,11.8,2.6,3.2,e.rug,.05),this.box(-3.1,13.9,0,.26,.26,.04,t.darkMetal,{geo:{ao:"none"},collide:!1});let S=new $(new Tt(.02,.02,1.5,6),t.darkMetal);S.position.set(-3.1,.77,13.9);let b=ot({color:9071168,roughness:.9,side:oe}),R=ot({color:13215850,emissive:16756838,emissiveIntensity:.55,roughness:.9,side:oe}),U=new $(new mn(.16,.3,10,1,!0),b);U.position.set(-3.1,1.66,13.9),this.scene.add(S,U);let M=new Fe(16756838,0,6,1.9);M.position.set(-3.1,1.6,13.9),this.scene.add(M),this.props.lamp={light:M,on:!1,shade:U,shadeOff:b,shadeOn:R},this.regInteractable(S,"\u843D\u5730\u706F",2,()=>{var H,j;return(j=(H=this.handlers).onLamp)==null?void 0:j.call(H)});for(let[H,j]of[[-6.4,7.615],[-3.4,7.615]])this.decalWall(H,j,1.55,.34,.42,e.photo,"s"),this.box(H-.185,j+.015,1.55,.03,.02,.5,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(H+.185,j+.015,1.55,.03,.02,.5,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(H,j+.015,1.335,.34,.02,.03,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(H,j+.015,1.765,.34,.02,.03,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1});let E=this.decalWall(-4.9,7.63,1.55,.34,.42,e.photo,"s");E.rotation.z=Math.PI,this.box(-4.9-.185,7.645,1.55,.03,.02,.5,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(-4.9+.185,7.645,1.55,.03,.02,.5,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(-4.9,7.645,1.335,.34,.02,.03,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(-4.9,7.645,1.765,.34,.02,.03,t.darkWood,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(-7.7,14.6,0,.32,.22,.14,t.darkWood,{geo:{ao:"wall"}});let z=new $(new Tt(.006,.006,.4,4),t.darkMetal);z.position.set(-7.7,.34,14.6),this.scene.add(z);let Y=this.decalWall(-8.28,14,1,.55,.75,e.silhouette,"e",0,!1);Y.visible=!1,this.props.silhouette=Y,this.box(-10.7,12.3,0,1.8,1.15,.24,t.quilt,{geo:{ao:"wall",uv:[2,2]}}),this.box(-9.9,12.3,.24,.4,.3,.08,t.pale,{geo:{ao:"none"}}),this.box(-9.15,9.55,0,.5,.45,.55,t.darkWood,{geo:{ao:"wall"}});let it=new $(new ae(.2,.26),ot({map:e.journal,side:oe,roughness:.92,emissive:16777215,emissiveIntensity:.4}));it.position.set(-9.15,.56,9.55),it.rotation.x=-Math.PI/2,this.scene.add(it);let I=new Fe(16756832,.4,2.5,2);I.position.set(-9.15,.7,9.55),this.scene.add(I),this.notePickups.push({mesh:it,id:1}),this.regInteractable(it,"\u65E7\u624B\u8BB0",3.5,()=>{var H,j;return(j=(H=this.handlers).onNote)==null?void 0:j.call(H,1)}),this.box(-11.6,9.3,0,.5,.9,.72,t.darkWood,{geo:{ao:"wall"}}),this.box(-11.6,9.3,.72,.54,.94,.04,t.darkWood,{geo:{ao:"none"}}),this.box(-11.6,9.95,0,.3,.3,.42,t.darkWood,{geo:{ao:"none"}});let V=new $(new ae(.6,1.3),Se({map:e.mirror}));V.position.set(-13.695,1.5,9.5),V.rotation.y=Math.PI/2,this.scene.add(V),this.regInteractable(V,"\u955C\u5B50",2,()=>{var H,j;return(j=(H=this.handlers).onMirror)==null?void 0:j.call(H)});let q=new $(new Tt(.015,.015,.75,5),t.darkMetal);q.rotation.z=Math.PI/2,q.position.set(-14.2,1.85,14.3),this.scene.add(q);let nt=[5917290,4872794,6965834];for(let H=0;H<3;H++)this.box(-14.53,14.05+H*.24,1.32,.05,.42,.95,ot({color:nt[H],roughness:.95}),{geo:{ao:"none"},collide:!1,cast:!0});this.decalWall(-11.2,7.615,1.48,.36,1.1,e.scroll,"n"),this.box(-11.2,7.635,2,.44,.045,.032,t.darkWood,{geo:{ao:"none"},collide:!1}),this.box(-11.2,7.635,.9,.44,.045,.032,t.darkWood,{geo:{ao:"none"},collide:!1});let Q=ot({color:8219218,roughness:.92});this.box(-13.2,8.1,0,.52,.44,.36,Q,{geo:{ao:"wall"}});let Z=this.box(-13.12,8.16,.36,.42,.36,.3,Q,{geo:{ao:"none"}});Z.rotation.y=.16,this.box(-12.5,11.4,0,.5,.5,.09,ot({color:5913146,roughness:.95}),{geo:{ao:"none"}}),this.box(-15.8,20.25,0,1.4,.55,.6,t.rust,{geo:{ao:"wall"}}),this.box(-15.8,20.25,.3,1.25,.4,.02,t.waterDark,{geo:{ao:"none"}}),this.box(-15.8,19.86,0,1.5,.08,.62,t.darkMetal,{geo:{ao:"none"}}),this.box(-16.7,15.25,1.45,.06,.6,.55,t.darkMetal,{geo:{ao:"none"}}),this.box(-16.9,17.2,1.9,.14,.14,.1,t.darkMetal,{geo:{ao:"none"}});let ct=new $(new Tt(.02,.02,.35,6),t.darkMetal);ct.position.set(-15.6,.8,20.25);let ht=new $(new Tt(.016,.016,.22,6),t.darkMetal);ht.rotation.x=Math.PI/2,ht.position.set(-15.6,.97,20.05),this.scene.add(ct,ht),this.box(-14.55,16.85,0,.4,.55,.42,t.whiteMetal,{geo:{ao:"wall"}}),this.box(-14.55,16.4,0,.4,.48,.4,t.whiteMetal,{geo:{ao:"wall"}}),this.box(-14.55,16.4,.4,.42,.5,.04,t.whiteMetal,{geo:{ao:"none"}}),this.box(-16.55,15.35,0,.55,.5,.8,t.whiteMetal,{geo:{ao:"wall"}}),this.box(-16.55,15.35,.8,.6,.55,.05,t.whiteMetal,{geo:{ao:"none"}}),this.box(-13.93,15.5,1.5,.12,.5,.7,t.whiteMetal,{geo:{ao:"wall"}});let et=new Vt;et.position.set(-13.95,1.55,15.35);let F=new $(Re(.06,.6,.5),t.whiteMetal);F.position.set(0,0,.25),et.add(F),et.rotation.y=-.55,this.scene.add(et);let st=this.box(-14.5,20.3,0,.62,.62,.92,t.whiteMetal,{geo:{ao:"wall"}});this.props.washer=st,this.regInteractable(st,"\u6D17\u8863\u673A",2.2,()=>{var H,j;return(j=(H=this.handlers).onWasher)==null?void 0:j.call(H)});let ft=new $(new Tt(.24,.24,.03,10),ot({color:10133668,roughness:.6,metalness:.15}));ft.position.set(-14.5,.935,20.3),ft.rotation.x=.06,this.scene.add(ft),this.box(-14.5,20.52,.92,.56,.1,.1,t.darkMetal,{geo:{ao:"none"},collide:!1});let mt=new $(new Tt(.17,.14,.36,8),ot({color:9082016,roughness:.85}));mt.position.set(-14.75,.18,19.5),this.scene.add(mt);let vt=new $(new Be(.14,7,5),ot({color:5921382,roughness:.95}));vt.position.set(-14.75,.37,19.5),vt.scale.y=.5,this.scene.add(vt),this.box(7.55,4.8,0,.85,.75,.5,t.darkWood,{geo:{ao:"wall"}}),this.box(7.55,4.8,.5,.8,.7,.85,t.darkWood,{geo:{ao:"wall"}}),this.box(7.55,4.8,1.35,.84,.74,.1,t.darkWood,{geo:{ao:"none"}});let Ut=new $(new ae(.2,.26),t.photo);Ut.position.set(7.145,1.05,4.8),Ut.rotation.y=-Math.PI/2,this.scene.add(Ut);let Ft=this._candle(7.15,4.8,1.59);this._candle(7.95,4.8,1.59),this.box(7.55,4.8,1.46,.09,.09,.1,ot({color:9075258,roughness:.45,metalness:.3}),{geo:{ao:"none"},collide:!1}),this.regInteractable(Ft,"\u6447\u54CD\u94C3\u94DB",2.2,()=>{var H,j;return(j=(H=this.handlers).onBell)==null?void 0:j.call(H)});let P=new $(new ae(.24,.3),ot({map:e.news,side:oe,roughness:.92,emissive:16777215,emissiveIntensity:.4}));P.position.set(7.55,1.47,5.1),P.rotation.x=-Math.PI/2+.2,this.scene.add(P);let D=new Fe(16756832,.4,2.5,2);D.position.set(7.55,1.6,5.1),this.scene.add(D),this.notePickups.push({mesh:P,id:2}),this.regInteractable(P,"\u62A5\u7EB8\u6587\u7AE0",3.5,()=>{var H,j;return(j=(H=this.handlers).onNote)==null?void 0:j.call(H,2)});for(let H of[3.4,4.1,4.8])this._ofuda(2.3,H,2.55);for(let[H,j]of[[5.9,4.2],[5.9,5.4]])this.box(H,j,0,.55,.55,.09,t.clothRed,{geo:{ao:"wall"}});for(let[H,j]of[[7.3,4.6],[7.55,4.55],[7.8,4.65]]){let At=new $(new Tt(.045,.03,.05,6),ot({color:3813432,roughness:.5,metalness:.2}));At.position.set(H,1.475,j),this.scene.add(At)}this.decalWall(8.285,4.8,1.55,.38,1.15,e.scroll,"w"),this.box(5.2,15,0,1.9,.8,.32,t.quilt,{geo:{ao:"wall",uv:[2,1]}}),this.box(4.35,15,.32,.3,.25,.08,t.pale,{geo:{ao:"none"}}),this.box(2,15,0,.8,.5,.45,t.darkWood,{geo:{ao:"wall"}});let T=[11546672,3172528,4235336,13676592];for(let H=0;H<6;H++){let j=.1+i()*.08;this.box(1.7+i()*3.5,9.2+i()*2.5,j/2,j,j,j,ot({color:T[H%4],roughness:.8}),{geo:{ao:"none"},collide:!1})}let O=this._doll(7.9,9.9);this.props.doll=O,this.regInteractable(O.mesh,"\u4EBA\u5076",1.8,()=>{var H,j;return(j=(H=this.handlers).onDoll)==null?void 0:j.call(H)}),this.box(7.75,9.1,0,1.1,.5,.72,t.darkWood,{geo:{ao:"wall"}});let N=new $(new ae(.24,.3),ot({map:e.drawing,side:oe,roughness:.92,emissive:16777215,emissiveIntensity:.4}));N.position.set(7.75,.73,9.1),N.rotation.x=-Math.PI/2,this.scene.add(N);let X=new Fe(16756832,.4,2.5,2);X.position.set(7.75,.85,9.1),this.scene.add(X),this.notePickups.push({mesh:N,id:3}),this.regInteractable(N,"\u5B69\u5B50\u7684\u753B",3.5,()=>{var H,j;return(j=(H=this.handlers).onNote)==null?void 0:j.call(H,3)}),this.decalWall(8.285,12.2,1.4,.4,.5,e.drawing,"w",.05),this.box(7.95,14.4,0,.65,1.1,2.05,t.darkWood,{geo:{ao:"wall"}}),this.box(7.95,13.82,0,.62,.06,2.05,t.darkWood,{geo:{ao:"none"},collide:!1}),this.box(4.4,9.1,0,1.1,.65,.9,t.darkWood,{geo:{ao:"wall"}}),this.box(4.4,9.1,.28,1.02,.57,.08,t.quilt,{geo:{ao:"none"}});for(let[H,j]of[[3.88,8.8],[4.92,8.8],[3.88,9.4],[4.92,9.4]]){let At=new $(new Tt(.02,.02,.9,5),t.darkWood);At.position.set(H,.45,j),this.scene.add(At)}this.box(4.4,9.1,.82,1.14,.06,.04,t.darkWood,{geo:{ao:"none"},collide:!1}),this.box(4.4,9.1,.82,.06,.69,.04,t.darkWood,{geo:{ao:"none"},collide:!1});let B=new Vt,gt=new $(new Tt(.006,.006,.5,4),t.darkMetal);gt.rotation.z=Math.PI/2;let bt=gt.clone();bt.rotation.z=-Math.PI/2,B.add(gt,bt);let A=Se({color:15262936,side:oe});for(let H=0;H<5;H++){let j=new $(new mn(.03,.07,4),A);j.position.set(dt(-.2,.2),-.22-dt(0,.1),dt(-.2,.2)),j.rotation.z=Math.PI,B.add(j)}B.position.set(4.4,1.95,9.1),this.scene.add(B),this.props.mobile=B;let w=new Vt;w.position.set(2.3,2.5,13);let G=new $(new Tt(.004,.004,.42,4),t.darkMetal);G.position.y=-.21,w.add(G);let lt=ot({color:12109004,roughness:.25,metalness:.2}),at=new $(new Tt(.05,.032,.055,8),lt);at.position.y=-.45,w.add(at);let rt=new $(new Tt(.005,.005,.1,4),t.darkMetal);rt.position.y=-.53,w.add(rt);let Ct=new $(new Be(.012,5,4),t.darkMetal);Ct.position.y=-.59,w.add(Ct);let Mt=ot({color:14209212,roughness:.9,side:oe});for(let H=0;H<3;H++){let j=H/3*Math.PI*2+.5,At=new $(Re(.028,.16,.004),Mt);At.position.set(Math.cos(j)*.035,-.66,Math.sin(j)*.035),At.rotation.y=-j,w.add(At)}this.scene.add(w),this.props.furin=w;let St=new Vt,Dt=ot({color:8018490,roughness:.95}),Bt=new $(Re(.22,.3,.18),Dt);Bt.position.y=.18;let ut=new $(Re(.16,.16,.16),Dt);ut.position.y=.4,St.add(Bt,ut);for(let H of[-.14,.14]){let j=new $(Re(.08,.16,.08),Dt);j.position.set(H,.24,0),St.add(j)}for(let H of[-.07,.07]){let j=new $(Re(.1,.1,.12),Dt);j.position.set(H,.05,.03),St.add(j)}let ie=ot({color:1315344});for(let H of[-.05,.05]){let j=new $(new Be(.012,4,3),ie);j.position.set(H,.43,.075),St.add(j)}St.position.set(2.1,0,12.6),St.rotation.y=.4,this.scene.add(St),this.decalWall(8.285,9.4,.75,.16,1.55,e.growth,"w"),this.dollSpots=[{x:7.9,z:9.9,ry:Math.PI},{x:2,z:15,ry:0},{x:5,z:11.2,ry:Math.PI/2},{x:.45,z:11.4,ry:-Math.PI/2},{x:7,z:13.8,ry:Math.PI}],this.decalFloor(-.5,6.2,.42,.56,e.news,.4),this.decalFloor(.6,19.2,.42,.56,e.news,1.2),this.decalFloor(-.4,33.2,.42,.56,e.news,2),this.decalFloor(.3,47.2,.42,.56,e.news,.8);let Yt=this.box(-1.2,17.2,0,.45,.45,.5,t.darkWood,{geo:{ao:"none"}});Yt.rotation.z=Math.PI/2,Yt.position.y=.24;let kt=new Vt,Nt=new Tt(.32,.32,.05,7),Pt=ot({color:1711134,roughness:.65,metalness:.25});for(let H of[-.45,.45]){let j=new $(Nt,Pt);j.rotation.x=Math.PI/2,j.position.set(H,.32,0),kt.add(j)}let Ht=new $(new jt(1,.07,.07),ot({color:6958116,roughness:.55,metalness:.15}));Ht.position.set(0,.62,0),kt.add(Ht);let ne=new $(new jt(.35,.06,.06),ot({color:5593696,roughness:.5,metalness:.3}));ne.position.set(.55,.85,0),kt.add(ne),kt.position.set(-1.3,0,21.5),kt.rotation.y=.2,kt.rotation.z=.06,this.scene.add(kt),this.colliders.push(Si(-1.3,.5,21.5,1.3,1,.5)),this.props.bike=kt,this.decalWall(-1.585,30,1.4,1.3,.65,e.graffiti,"e"),this._ofuda(1.55,3.6,2.5);let de=new $(new jt(.55,.28,.06),t.exitSign);de.position.set(0,2.42,57.4),this.scene.add(de);let Gt=new $(new Tt(.15,.15,.03,12),ot({map:e.clock,roughness:.6}));Gt.position.set(1.575,1.7,26.5),Gt.rotation.z=Math.PI/2,this.scene.add(Gt);let _t=this.decalWall(1.585,25.4,1.58,.3,.38,e.photo,"w");_t.rotation.z=-.09,this.props.clock={mesh:Gt,state:"normal",timer:dt(30,70)},this._window(-.9,20,3.55,"e"),this.decalFloor(0,30.6,.8,1.2,e.blood,.4,.012),this.decalWall(1.575,29.4,3.2,.3,.6,e.handprint,"w",.2),this.decalWall(1.575,31.5,3.4,.4,.5,e.blood,"w",.1);let k=new Fe(4169818,.9,4,1.9);k.position.set(.6,3.3,30.6),this.scene.add(k),this.props.ropes=[];let Et=this.decalWall(-1.765,49.2,1.05,1.1,2,e.eyesWall,"e",0,!1);Et.visible=!1,this.props.eyesWall=Et,this.decalWall(1.615,28,.75,.32,1.6,e.blood,"w",.12);for(let[H,j,At]of[[-1.5,43.2,.3],[1.6,41.7,-.4],[-1.5,44,.7]]){let se=this.box(H,j,0,.55,.5,.5,ot({color:7232056,roughness:.9}),{geo:{ao:"wall"}});se.rotation.y=At}this.box(.35,38.6,.02,.8,.55,.03,t.ceiling,{geo:{ao:"none"},collide:!1}),this.box(-.4,38.9,.02,.25,.18,.03,t.ceiling,{geo:{ao:"none"},collide:!1}),this.box(.75,38.35,.015,.15,.2,.025,t.ceiling,{geo:{ao:"none"},collide:!1}),this._window(-8.3,2.6,1,"e"),this._window(-8.3,14,1,"e",{dark:!0}),this._window(-13.7,10.75,1,"e"),this.decalFloor(-13.4,15,.9,1.1,e.blood,.1),this._battery(.62,-.15),this._battery(-5.05,13.05),this._battery(-.55,33.6)}_battery(t,e,i=.042){var d;let s=new Vt,r=new $(new Tt(.032,.032,.11,8),ot({color:7624250,roughness:.55,metalness:.35}));r.rotation.z=Math.PI/2,s.add(r);let o=new $(new Tt(.033,.033,.028,8),Se({color:14208942}));o.rotation.z=Math.PI/2,o.position.x=.03,s.add(o);let a=new $(new Tt(.014,.014,.012,8),ot({color:11119012,roughness:.4,metalness:.5}));a.rotation.z=Math.PI/2,a.position.x=.058,s.add(a);let l=new Fe(6332671,.7,3.5,2);l.position.set(0,.05,0),s.add(l);let c=new $(new Qe(.12,.012,6,16),Se({color:6332671,transparent:!0,opacity:.8}));c.rotation.x=Math.PI/2,c.position.y=.01,s.add(c),s.position.set(t,i,e),s.rotation.y=dt(0,Math.PI*2),this.scene.add(s);let u=this.regInteractable(s,"\u624B\u7535\u7535\u6C60",3.5,()=>{var h,f;return(f=(h=this.handlers).onBattery)==null?void 0:f.call(h,s)});((d=this.props).batteries||(d.batteries=[])).push({mesh:s,interactable:u,glow:l,halo:c,phase:dt(0,6.28)})}_candle(t,e,i){this.box(t,e,i-.14,.05,.05,.14,ot({color:13617328,roughness:.9}),{geo:{ao:"none"},collide:!1});let s=new $(new Be(.022,5,4),Se({color:16760928}));s.position.set(t,i+.02,e),this.scene.add(s);let r=new Fe(16747066,1.8,4,1.9);return r.position.set(t,i+.06,e),this.scene.add(r),this.candles.push({light:r,base:1.8,phase:dt(0,6.28)}),s}_ofuda(t,e,i){let s=new $(new Tt(.003,.003,.24,4),ot({color:2762788,roughness:.9}));s.position.set(t,i,e);let r=new $(new ae(.09,.24),this.materials.ofuda);return r.position.set(t,i-.24,e),this.scene.add(s),this.scene.add(r),this.ofudas.push(r),r}_window(t,e,i,s,r={}){var p,m;let o=this.materials,a=!!r.dark,l=(p=r.w)!=null?p:.8,c=(m=r.h)!=null?m:.8,u=a?ot({color:461326,roughness:.35,metalness:.1}):o.moonWin,d=new $(new ae(l,c),u),h=s==="e"?.02:s==="w"?-.02:0,f=s==="n"?-.02:s==="s"?.02:0;if(d.position.set(t+h,i,e+f),s==="e"?d.rotation.y=Math.PI/2:s==="w"?d.rotation.y=-Math.PI/2:s==="s"&&(d.rotation.y=Math.PI),this.scene.add(d),!a){let y=Se({map:this.tex.rainStreaks,transparent:!0,opacity:.55,depthWrite:!1,side:oe}),_=new $(new ae(l,c),y),v=s==="e"?.005:s==="w"?-.005:0,S=s==="n"?-.005:s==="s"?.005:0;_.position.set(d.position.x+v,d.position.y,d.position.z+S),_.rotation.copy(d.rotation),_.renderOrder=3,this.scene.add(_)}let g=ot({color:790034,roughness:.65,metalness:.25}),x=ot({color:3024416,roughness:.85});if(a&&(s==="e"||s==="w")){let y=t+(s==="e"?.025:-.025),_=ot({color:3752779,roughness:.4});this.box(y,e-.1,i+.08,.02,.62,.018,_,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(y,e+.14,i-.06,.02,.5,.014,_,{geo:{ao:"none"},collide:!1,cast:!1})}if(!a){let y=new Fe(6982836,.8,7,1.9);y.position.set(t+(s==="e"?.6:s==="w"?-.6:0),i,e+(s==="n"?.6:s==="s"?-.6:0)),this.scene.add(y),this.windowLights.push(y)}if(s==="e"||s==="w"){let y=t+(s==="e"?.03:-.03);this.box(y,e,i+c/2-.03,.05,l+.14,.05,x,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(y,e,i-c/2+.03,.05,l+.14,.05,x,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(y,e-l/2-.02,i,.05,.05,c-.01,x,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(y,e+l/2+.02,i,.05,.05,c-.01,x,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(y,e,i,.04,.05,c-.01,x,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(y,e,i-c*.23,.05,l-.01,.04,x,{geo:{ao:"none"},collide:!1,cast:!1});for(let _ of[-l*.325,0,l*.325]){let v=new $(new jt(.02,c-.05,.02),g);v.position.set(t+(s==="e"?.045:-.045),i,e+_),this.scene.add(v)}this.box(t+(s==="e"?.05:-.05),e,i-.41,.1,.86,.04,o.darkWood,{geo:{ao:"none"},collide:!1,cast:!1})}else{let y=e+(s==="n"?-.03:.03);this.box(t,y-.37,i,.94,.05,.05,x,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(t,y+.37,i,.94,.05,.05,x,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(t-.42,y,i,.05,.05,c-.01,x,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(t+.42,y,i,.05,.05,c-.01,x,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(t,y,i,.79,.04,.05,x,{geo:{ao:"none"},collide:!1,cast:!1}),this.box(t,y,i-c*.23,.79,.05,.04,x,{geo:{ao:"none"},collide:!1,cast:!1});for(let _ of[-l*.325,0,l*.325]){let v=new $(new jt(.02,c-.05,.02),g);v.position.set(t+_+(s==="n"?.015:-.015),i,e+(s==="n"?-.045:.045)),this.scene.add(v)}this.box(t+(s==="n"?.045:-.045),e+(s==="n"?.03:-.03),i-.41,.86,.1,.04,o.darkWood,{geo:{ao:"none"},collide:!1,cast:!1})}return d}_doll(t,e){let i=new Vt,s=ot({color:14209732,roughness:.85}),r=new $(Re(.14,.24,.1,{jitter:.004}),s);r.position.y=.12,i.add(r);let o=new $(Re(.13,.13,.12,{jitter:.01}),s);o.position.y=.32,i.add(o);let a=new $(new ae(.1,.1),Se({map:this.tex.dollFace}));a.position.set(0,0,.062),o.add(a);let l=new $(Re(.18,.12,.14,{jitter:.004}),ot({color:8002074,roughness:.9}));l.position.y=.06,i.add(l);let c=new $(Re(.14,.07,.13,{jitter:.008}),ot({color:1840144,roughness:.95}));c.position.y=.4,i.add(c);let u=(f,g,x,p,m,y)=>{let _=new $(Re(f,g,x,{jitter:.004}),s);return _.position.set(p,m,y),i.add(_),_},d=u(.05,.2,.05,-.1,.2,0),h=u(.05,.2,.05,.1,.2,0);return u(.06,.14,.07,-.05,.07,.04),u(.06,.14,.07,.05,.07,.04),i.position.set(t,0,e),i.rotation.y=Math.PI,this.scene.add(i),{mesh:i,head:o,armL:d,armR:h,turned:!1}}_buildDecals(){let t=this.tex,e=this.rng;for(let i=11.6;i<26;i+=.9){let s=.3+e()*.5;this.decalFloor(.55+e()*.5,i+e()*.4,s,s*(.5+e()),t.blood,e()*3)}this.decalWall(1.615,10.5,1.25,.22,.22,t.handprint,"w",.4),this.decalWall(1.615,10.9,.95,.22,.22,t.handprint,"w",-.3),this.decalWall(-13.93,17.6,1.2,.6,.5,t.blood,"e",.1),this.decalWall(-13.93,19.4,.7,.3,.3,t.handprint,"e",.6),this.decalWall(-8.515,13.6,1.1,.5,.4,t.blood,"e",.2),this.decalFloor(.9,30.6,.5,.7,t.blood,.6,.012),this.decalWall(-1.585,24.4,.5,.3,.25,t.blood,"e",.1)}_buildLights(){let t=this.materials,e=Se({color:13226710});this.tubeMat=e,this.tubeOffMat=Se({color:1974564});let i=(f,g,x,p,m,y,_=9,v=1.06)=>{let S=new Fe(m,p,_,1.8);S.position.set(f,x-.05,g),this.scene.add(S);let b=new $(new jt(.24,.09,v+.09),ot({color:3948614,roughness:.6,metalness:.25}));b.position.set(f,x+.06,g),b.castShadow=!1,this.scene.add(b);let R=ot({color:2895668,roughness:.6,metalness:.2});for(let M of[-v/2-.035,v/2+.035]){let E=new $(new jt(.26,.11,.06),R);E.position.set(f,x+.06,g+M),this.scene.add(E)}let U=new $(new Tt(.028,.028,v,6),e);return U.rotation.x=Math.PI/2,U.position.set(f,x+.005,g),this.scene.add(U),this.fluorescents.push({light:S,base:p,mode:y,phase:dt(0,6.28),seed:Math.random()*1e9|0,rng:Lt(Math.random()*1e9|0),x:f,z:g,y:x,tube:U,flickState:1,flickT:dt(0,2),userOff:!1}),S},s=10470616,r=11061440;[-.5,3.5,7.8,12.3,16.9,21.5,26.1,30.7,35.3,39.9,44.5,49.1,53.7,56.9].forEach((f,g)=>{let x=g===4||g===9?"bad":g===12?"dead":g%5===2?"flicker":"steady";i(0,f,2.56,2.4,r,x)}),i(0,-1.4,2.56,2.6,s,"flicker"),i(-4.8,3.8,2.56,3,s,"steady"),i(-4.8,12,2.56,3,r,"flicker"),i(-11,12,2.56,2.6,r,"bad"),i(-15.7,18,2.56,2.5,r,"flicker"),i(-15.5,14.3,2.06,0,s,"dead",6,.7),i(4.8,4.5,2.56,2.4,16756838,"flicker"),i(4.8,12.5,2.56,2.6,r,"bad");let a=new Fe(9050640,1.2,4,1.9);a.position.set(-14.55,2.3,16.7),this.scene.add(a),this.box(-13.94,16.7,2.05,.08,.3,.5,t.rust,{geo:{ao:"wall"},collide:!1,cast:!1}),this.fluorescents.push({light:a,base:1.2,mode:"bad",phase:dt(0,6.28),seed:Math.random()*1e9|0,rng:Lt(Math.random()*1e9|0),x:-14.55,z:16.7,y:2.3,tube:null,flickState:1,flickT:0,userOff:!1}),[2.5,8.5,14.5,20.5,26.5,32.5,38.5,44.5,50.5,56.5,61.5].forEach((f,g)=>{i(0,f,5.06,2.4,r,g%3===0?"bad":"flicker",8)});let c=ot({color:9406070,roughness:.92}),u=ot({color:6972245,roughness:.85}),d=(f,g)=>this.fluorescents.find(x=>Math.abs(x.x-f)<.01&&Math.abs(x.z-g)<.01);this.props.switches=[];let h=[[-1.585,4.55,-4.8,3.8],[-1.585,11.35,-4.8,12],[1.585,4.3,4.8,4.5],[-1.775,49.95,0,49.1]];for(let[f,g,x,p]of h){let m=this.box(f,g,1.18,.02,.1,.14,c,{geo:{ao:"wall"},collide:!1,cast:!1}),y=new $(new jt(.016,.028,.045),u);y.position.set(f+(f>0?.017:-.017),1.26,g),this.scene.add(y);let _={plate:m,nub:y,fluor:d(x,p),on:!0,baseY:1.26};this.props.switches.push(_),this.regInteractable(m,"\u7535\u706F\u5F00\u5173",2,()=>{var v,S;return(S=(v=this.handlers).onSwitch)==null?void 0:S.call(v,_)})}}_buildNodes(){let t=[-1,3,7,11,15,19,23,27,31,35,39,43,47,51,55,57.5];for(let s of t)this.monsterNodes.push({x:0,z:s,y:0});let e=[4,12,20,28,36,44,52,62.5];for(let s of e)this.monsterNodes.push({x:0,z:s,y:2.8});this.monsterNodes.push({x:.75,z:60.5,y:2.8});for(let[s,r]of[[-4.8,4.5],[-2.8,13.8],[-11,12.5],[-15.5,17.5],[4.8,4.5],[4.8,12]])this.monsterNodes.push({x:s,z:r,y:0});this.ghostSpawns=[{x:-2.6,z:3.8,ry:0},{x:-2.6,z:10.6,ry:0},{x:2.6,z:10.6,ry:Math.PI},{x:2.6,z:3.6,ry:Math.PI},{x:-1.9,z:49.2,ry:0},{x:0,z:20,ry:Math.PI/2},{x:0,z:40,ry:Math.PI/2},{x:0,z:30,ry:0,y:2.8}];let i=(s,r,o,a,l,c=-10,u=10)=>{this.triggers.push({aabb:{x0:s,y0:c,z0:r,x1:o,y1:u,z1:a},id:l,fired:!1})};i(-8.4,0,-1.3,7.5,"kitchen",-.3,2),i(-8.4,7.5,-1.3,15.5,"living",-.3,2),i(-13.8,7.5,-8.4,15.5,"bedroom",-.3,2),i(-17.6,14.8,-13.8,21,"bathroom",-.3,2),i(-16.4,13.8,-14.6,14.8,"passage",-.3,2),i(1.3,0,8.4,8.5,"altar",-.3,2),i(1.3,8.5,8.4,15.5,"child",-.3,2),i(-2,10,2,58,"upper",2.3,8),i(-1.7,24,1.7,30,"corridorMid",0,2.2),i(-1.7,57.5,1.7,61,"stairsEast",0,2.2),this.exitBounds={x0:2.4,x1:10.3,z0:28.7,z1:32.8,y0:2.4,y1:4}}checkTriggers(t){var s,r,o,a;for(let l of this.triggers){if(l.fired)continue;let c=l.aabb;t.x>=c.x0&&t.x<=c.x1&&t.y>=c.y0&&t.y<=c.y1&&t.z>=c.z0&&t.z<=c.z1&&(l.fired=!0,(r=(s=this.handlers)[`zone_${l.id}`])==null||r.call(s,l))}let e=this.exitBounds,i=t.x>=e.x0&&t.x<=e.x1&&t.z>=e.z0&&t.z<=e.z1&&t.y>=e.y0&&t.y<=e.y1;i||(this.exitVisit=!1),this.exitDoor.open&&i&&!this.exitVisit&&(this.exitVisit=!0,(a=(o=this.handlers).zone_exitVoid)==null||a.call(o))}humLevel(t){let e=0;for(let i of this.fluorescents){if(i.light.intensity<=.05)continue;let s=Math.hypot(i.x-t.x,i.z-t.z);s<10&&(e=Math.max(e,(1-s/10)*Qt(i.light.intensity/i.base,0,1)))}return e}update(t,e,i=null,s=null,r=!1){var l,c,u,d;this.updateDoors(t),this._budgetT-=t,this._budgetT<0&&i&&(this._budgetT=.12,s&&this._viewDir.copy(s),this._applyLightBudget(i.x,i.y,i.z));let o=this.props.doll;if(o&&i){let h=i.x-o.mesh.position.x,f=i.z-o.mesh.position.z;if(h*h+f*f<36){let g=Math.atan2(h,f)-o.mesh.rotation.y;g=Math.atan2(Math.sin(g),Math.cos(g));let x=Qt(g,-1.15,1.15);o.head.rotation.y+=(x-o.head.rotation.y)*Math.min(1,t*.55)}}for(let h of this.candles){let f=.75+.25*Math.sin(e*9+h.phase)*Math.sin(e*13.7+h.phase*2);h.light.intensity=h.base*Qt(f+dt(-.08,.08),.3,1.2)}for(let h of this.props.batteries||[]){let f=.5+.5*Math.sin(e*3+h.phase);h.glow.intensity=.3+.7*f,h.halo.scale.setScalar(.85+.3*f),h.halo.material.opacity=.4+.6*f}for(let h=0;h<this.ofudas.length;h++)this.ofudas[h].rotation.z=Math.sin(e*.8+h*1.7)*.09;for(let h=0;h<(((l=this.props.ropes)==null?void 0:l.length)||0);h++)this.props.ropes[h].rotation.z=Math.sin(e*.7+h*1.9)*.05,this.props.ropes[h].rotation.x=Math.cos(e*.55+h)*.03;this.props.mobile&&(this.props.mobile.rotation.y=e*.5);let a=this.props.clock;if(a&&i){a.timer-=t;let h=i.x-a.mesh.position.x,f=i.z-a.mesh.position.z,g=h*h+f*f<25;a.state==="normal"&&a.mysterySolved&&g&&a.timer<=0&&Math.random()<.01?(a.state="back",a.timer=dt(2.5,5),a.mesh.material.map=this.tex.clockBack):a.state==="back"&&a.timer<=0&&(a.state="normal",a.timer=dt(50,110),a.mesh.material.map=this.tex.clock)}if(this.props.furin){let h=this.props.furin;h.rotation.z=Math.sin(e*1.7)*.05+Math.sin(e*4.3+1.2)*.03,h.rotation.x=Math.cos(e*1.3+.6)*.04+Math.sin(e*3.7)*.02}i&&(this.dripT=((c=this.dripT)!=null?c:0)-t,this.dripT<=0&&(this.dripT=dt(2.2,4.5),Math.hypot(i.x- -1.05,i.z-33)<7&&((d=(u=this.handlers).onDrip)==null||d.call(u))));for(let h of this.fluorescents){let f=1;if(h.kill||h.userOff)f=0;else if(r&&h.mode!=="dead")f=h.mode==="bad"?.55:1;else if(h.mode==="steady")f=1;else if(h.mode==="flicker"){if(h.flickT-=t,h.flickT<=0){let g=h.rng();h.flickState===1?g<.08?(h.flickState=g<.03?.05:.3,h.flickT=.04+h.rng()*.14):(h.flickState=1,h.flickT=.5+h.rng()*3.2):(h.flickState=1,h.flickT=.05+h.rng()*.3)}f=h.flickState}else h.mode==="bad"?f=Math.sin(e*31+h.phase)>.3?.5+h.rng()*.4:.04:h.mode==="dead"&&(f=0);h.boost>0&&(h.boost-=t,f*=1.8),h.light.intensity=h.base*f,h.tube&&(h.tube.material=f>.25?this.tubeMat:this.tubeOffMat)}}};function Qi(n,t,e,i=[],s=null){let r=new L().subVectors(t,n),o=r.length();if(o<.001)return!1;let a=new pn(n,r.divideScalar(o)),l=new L,c=new si,u=d=>!d||d===s?!1:(c.min.set(d.x0,d.y0,d.z0),c.max.set(d.x1,d.y1,d.z1),a.intersectBox(c,l)!==null&&l.distanceTo(n)<o-.065);return e.some(u)||i.some(d=>u(d.collider))}var C1=13616820,Mo=class{constructor(t,e){this.scene=t,this.tex=e,this.state="dormant",this.speed=0,this.pos=new L,this.group=new Vt,this.visible=!0,this._build(),this.scene.add(this.group),this.group.visible=!1,this.stareTimer=0,this.litTimer=0,this.teleportTimer=dt(1.5,2.5),this.stepTimer=0,this.stuckTime=0,this.lastPos=new L,this.walkPhase=0,this.twitchTimer=dt(.3,1),this.headRot=new L,this.headTarget=new L,this.char=Bs(0,0,0,.28,1.9),this.attackTimer=0,this.tempLife=null}_build(){let t=this.tex,e=ot({map:t.skin,roughness:.95,color:C1}),i=ot({color:920586,roughness:.95}),s=(y,_,v,S=0,b=0,R=0)=>{let U=new $(y,_);return U.position.set(S,b,R),U.castShadow=!0,U.receiveShadow=!0,v.add(U),U};this.legL=new Vt,this.legR=new Vt,this.legL.position.set(-.14,.95,0),this.legR.position.set(.14,.95,0),this.group.add(this.legL,this.legR);for(let y of[this.legL,this.legR])s(new Tt(.065,.042,.91,18),e,y,0,-.45,0),s(new Be(.068,16,10),e,y,0,-.49,.01),s(new jt(.105,.055,.23),i,y,0,-.92,.06);let r=new Be(.17,20,12);r.scale(1,.65,.65),s(r,e,this.group,0,.96,0),this.torso=new Vt,this.torso.position.set(0,1.4,0),this.group.add(this.torso);let o=new Tt(.22,.16,.85,24,8);o.scale(1,1,.65);let a=o.attributes.position;for(let y=0;y<a.count;y++){let _=a.getY(y);if(_>.15){let v=1-(_-.15)/.75*.22;a.setX(y,a.getX(y)*v),a.setZ(y,a.getZ(y)*v)}}o.computeVertexNormals(),s(o,e,this.torso);let l=new $(new ae(.3,.24),Se({map:t.blood,transparent:!0,depthWrite:!1}));l.position.set(0,.12,.135),l.renderOrder=2,this.torso.add(l),this.headG=new Vt,this.headG.position.set(0,2,.02),this.group.add(this.headG),s(new Tt(.047,.068,.34,16),e,this.headG,0,-.12,0);let c=new Be(.19,28,20);c.scale(.86,1.2,.82);let u=s(c,e,this.headG,0,.18,.01);u.name="monsterHead";let d=new ae(.26,.34,12,14),h=d.attributes.position;for(let y=0;y<h.count;y++){let _=h.getX(y)/.13,v=h.getY(y)/.17;h.setZ(y,-.035*(_*_+v*v))}d.computeVertexNormals();let f=new $(d,ot({map:t.face,roughness:1}));f.position.set(0,.18,.152),this.headG.add(f),this.jaw=new Vt,this.jaw.position.set(0,.08,.02),this.headG.add(this.jaw);let g=new Be(.1,20,12);g.scale(1,.5,1),s(g,e,this.jaw,0,-.04,.02);let x=ot({color:1705221,emissive:9049104,emissiveIntensity:0});this.eyeL=new $(new jt(.045,.05,.02),x),this.eyeR=this.eyeL.clone(),this.eyeL.position.set(-.07,.2,.156),this.eyeR.position.set(.07,.2,.156),this.headG.add(this.eyeL,this.eyeR),this.eyeMat=x;for(let y=0;y<14;y++){let _=y/14*Math.PI*2,v=Math.cos(_)*.12,S=Math.sin(_)*.11,b=new Ds([new L(v*.5,.4,S*.5),new L(v,.32,S),new L(v*1.2,.14,S*1.3),new L(v*1.1,-.13-y%3*.04,S*1.4)]);s(new no(b,8,.012+y%3*.002,5,!1),i,this.headG)}this.armL=new Vt,this.armR=new Vt,this.armL.position.set(-.26,1.94,0),this.armR.position.set(.26,1.94,0),this.group.add(this.armL,this.armR);for(let[y,_]of[[this.armL,1.22],[this.armR,1.34]])s(new Tt(.057,.044,_*.46,18),e,y,0,-_*.23,.02),s(new Be(.061,16,10),e,y,0,-_*.46,.02),s(new Tt(.044,.031,_*.54,18),e,y,0,-_*.73,.02);let p=new Be(.075,16,12);p.scale(.8,1.3,.65),s(p,e,this.armL,0,-1.28,0),s(p,e,this.armR,0,-1.4,0);for(let y of[this.armL,this.armR])for(let _=0;_<4;_++){let v=s(Re(.014,.12,.014,{jitter:.004}),e,y,-.045+_*.03,-1.52,0);v.rotation.x=.3+_%2*.18}this.armL.rotation.x=-.18,this.armR.rotation.x=-.24;for(let y=0;y<4;y++){let _=s(Re(.1,.07,.05,{jitter:.012}),e,this.torso,0,.1+y*.19,-.14);_.rotation.x=.35}this.cloth=[];let m=ot({color:1578e3,roughness:.95,side:oe});for(let y=0;y<5;y++){let _=s(Re(.08+dt(0,.06),.4+dt(0,.3),.02,{jitter:.02}),m,this.torso,dt(-.2,.2),-.3+dt(0,.2),.02);_.rotation.x=dt(-.25,.25),this.cloth.push(_)}this.group.scale.setScalar(1)}spawn(t,e="stalk"){this.pos.copy(t),this.group.position.copy(t),this.group.visible=!0,this.visible=!0,this.state=e,this.stareTimer=0,this.litTimer=0,this.stuckTime=0,this.attackTimer=0,this.tempLife=null,this.lastPos.copy(t),this._syncChar()}despawn(){this.state="dormant",this.group.visible=!1}_syncChar(){let t=this.char;t.x0=this.pos.x-.28,t.x1=this.pos.x+.28,t.z0=this.pos.z-.28,t.z1=this.pos.z+.28,t.y0=this.pos.y,t.y1=this.pos.y+1.9}update(t,e){var p,m,y,_;if(this.state==="dormant"||this.state==="gone")return;if(this.tempLife!==null&&(this.tempLife-=t,this.tempLife<=0)){this.tempLife=null,this.despawn();return}let i=e.player,s=i.x-this.pos.x,r=i.z-this.pos.z,o=Math.hypot(s,r),a=new L(s,0,r).normalize(),c=Math.abs(i.y-this.pos.y)<1&&!Qi(this.pos.clone().add(new L(0,1.4,0)),i.clone().add(new L(0,1.3,0)),e.colliders,e.doors),u=c&&a.dot(e.lookDir)<-.55,d=this.state==="chase"?2:.7;this.walkPhase+=t*d*6.5*(this.state==="attack"?0:1);let h=this.state==="attack"?0:this.state==="chase"?.62:.3;this.legL.rotation.x=Math.sin(this.walkPhase)*h,this.legR.rotation.x=-Math.sin(this.walkPhase)*h,this.armL.rotation.x=-.18+Math.sin(this.walkPhase+Math.PI)*h*.7,this.armR.rotation.x=-.24+Math.sin(this.walkPhase)*h*.7,this.torso.rotation.z=Math.sin(this.walkPhase)*.045,this.torso.rotation.x=-.16+Math.abs(Math.sin(this.walkPhase))*.05,this.group.position.y=this.pos.y+Math.abs(Math.sin(this.walkPhase))*.03,this.twitchTimer-=t,this.twitchTimer<=0&&(this.twitchTimer=dt(.35,1.1),this.headTarget.set(dt(-.15,.25),dt(-.5,.5),dt(-.3,.3)),u&&o<20&&this.headTarget.set(-.05,0,.06));let f=Math.min(1,t*6);this.headRot.x=ti(this.headRot.x,this.headTarget.x,f),this.headRot.y=ti(this.headRot.y,this.headTarget.y,f),this.headRot.z=ti(this.headRot.z,this.headTarget.z,f),this.headG.rotation.set(this.headRot.x,this.headRot.y,this.headRot.z);let g=this.state==="chase"?.3+Math.sin(this.walkPhase*2.1)*.08:this.state==="attack"?.55:0;this.jaw.rotation.x=ti(this.jaw.rotation.x,g,Math.min(1,t*8));let x=this.state==="chase"||this.state==="attack";this.eyeMat.emissiveIntensity=ti(this.eyeMat.emissiveIntensity,x?.75+.45*Math.sin(this.walkPhase*9):0,Math.min(1,t*6));for(let v=0;v<this.cloth.length;v++)this.cloth[v].rotation.z=Math.sin(this.walkPhase*2.3+v*1.4)*.12;if(e.flashHit&&o<22&&!e.reduceEffects?this.visible=Math.sin(e.time*88+this.walkPhase)>-.15:this.visible=!0,this.group.visible=this.visible&&this.state!=="gone",this.tempLife!==null){this.lastPos.copy(this.pos);return}this.state==="stalk"&&(e.flashHit&&o<22?(this.litTimer+=t,this.litTimer>.9&&this._enterChase(e)):this.litTimer=Math.max(0,this.litTimer-t*2),u&&o<15&&!e.flashHit?(this.stareTimer+=t,this.stareTimer>1.15&&this._enterChase(e)):this.stareTimer=Math.max(0,this.stareTimer-t),!u&&o>9&&o<40&&(this.teleportTimer-=t,this.teleportTimer<=0&&(this.teleportTimer=dt(1.6,3.2),this._teleportNear(e,7.5,10),e.audio.whisper(0,1.2))),o>13&&!u?this._moveToward(e,t,.9):o>26&&this._moveToward(e,t,1.5)),this.state==="chase"&&(this._moveToward(e,t,3.3),this.stepTimer-=t,this.stepTimer<=0&&(this.stepTimer=.5,e.audio.thud()),o<1.3&&c&&e.time>0&&(this.state="attack",this.attackTimer=.42,this._teleportTowardPlayer(e,.55),e.audio.sting(),(m=(p=e.game)==null?void 0:p.onMonsterAttack)==null||m.call(p)),o>30&&(this._teleportNear(e,18,24),this.state="stalk",this.litTimer=0)),this.state==="attack"&&(this.armL.rotation.x=ti(this.armL.rotation.x,-2.6,t*9),this.armR.rotation.x=ti(this.armR.rotation.x,-2.7,t*9),this.headG.rotation.set(-.12,this.headRot.y,0),this.attackTimer-=t,this.attackTimer<=0&&(this.state="gone",this.group.visible=!1,(_=(y=e.game)==null?void 0:y.onMonsterAttackEnd)==null||_.call(y))),this.lastPos.copy(this.pos)}_enterChase(t){var e,i;this.state==="stalk"&&(this.state="chase",this.stepTimer=0,t.audio.moan(0),t.audio.duck(),(i=(e=t.game)==null?void 0:e.onChaseStart)==null||i.call(e))}_moveToward(t,e,i){var f,g;let s=t.player,r=s.x,o=s.z,a=Jh(t.stairs||[],this.pos,s);a&&(r=a.x,o=a.z);let l=r-this.pos.x,c=o-this.pos.z,u=Math.max(1e-4,Math.hypot(l,c)),d=Math.min(u,i*e);if(this._syncChar(),xo(this.char,l/u*d,-.12,c/u*d,t.colliders,.4,{bodyHeight:1}),this.pos.x=(this.char.x0+this.char.x1)/2,this.pos.z=(this.char.z0+this.char.z1)/2,this.pos.y=this.char.y0,this.group.position.x=this.pos.x,this.group.position.z=this.pos.z,this.group.position.y=this.pos.y+Math.abs(Math.sin(this.walkPhase))*.03,d>1e-4){let p=Math.atan2(l,c)-this.group.rotation.y;p=Math.atan2(Math.sin(p),Math.cos(p)),this.group.rotation.y+=p*Math.min(1,e*5)}let h=Math.hypot(this.pos.x-this.lastPos.x,this.pos.z-this.lastPos.z);if(this.state==="chase"&&h<.008){if(this.stuckTime+=e,this.stuckTime>.9){let x=!1;for(let p of t.doors)if(!p.locked&&!p.open){let m=p.hinge;if(Math.hypot(m.x-this.pos.x,m.z-this.pos.z)<1.4){(g=(f=t.game)==null?void 0:f.level)==null||g.forceOpen(p),t.audio.doorOpen(),x=!0;break}}this.stuckTime>2.2?(this._teleportNear(t,5,9),this.stuckTime=0):x&&(this.stuckTime=0)}}else this.stuckTime=0}_teleportNear(t,e,i){let s=t.nodes,r=null,o=1/0;for(let a of s){if(Math.abs(a.y-t.player.y)>.5)continue;let l=Math.hypot(a.x-t.player.x,a.z-t.player.z);if(l<e||l>i||this._hitWall(a.x,a.y,a.z,t.colliders))continue;let c=Math.abs(l-(e+i)/2);c<o&&(o=c,r=a)}r&&(this.pos.set(r.x,r.y,r.z),this.group.position.set(r.x,r.y,r.z),this._syncChar())}_teleportTowardPlayer(t,e){let i=t.player.x-this.pos.x,s=t.player.z-this.pos.z,r=Math.max(.001,Math.hypot(i,s)),o=i/r,a=s/r;for(let l of[e,.8,1.1,1.5]){let c=t.player.x-o*l,u=t.player.z-a*l;if(!this._hitWall(c,t.player.y,u,t.colliders)){this.pos.x=c,this.pos.z=u,this.pos.y=t.player.y,this.group.position.copy(this.pos),this._syncChar();return}}}_hitWall(t,e,i,s){for(let o of s)if(o.x0<t+.28&&o.x1>t-.28&&o.z0<i+.28&&o.z1>i-.28&&o.y1>e+.1&&o.y0<e+1.9)return!0;return!1}},Eo=class{constructor(t){this.scene=t,this.group=new Vt,this.group.visible=!1,this.opacity=0,this.mats=[],this._build(),this.scene.add(this.group),this.life=0,this.bob=dt(0,6)}_build(){let t=new Je({color:14541800,transparent:!0,opacity:.45,depthWrite:!1});this.mats.push(t);let e=new Je({color:658448}),i=(a,l,c,u,d,h)=>{let f=new $(new jt(a,l,c),t);return f.position.set(u,d,h),this.group.add(f),f};i(.3,.7,.18,0,1.05,0),i(.28,.3,.26,0,1.5,0),this.ghostArmL=i(.14,.68,.14,-.42,1,0),this.ghostArmR=i(.14,.68,.14,.42,1,0),i(.13,.68,.13,-.09,.34,0),i(.13,.68,.13,.09,.34,0);let s=new $(new jt(.5,.9,.34),t);s.position.set(0,.5,0),this.group.add(s);let r=new $(new jt(.05,.06,.02),e);r.position.set(-.06,1.52,.135);let o=r.clone();o.position.x=.06,this.group.add(r,o);for(let a=0;a<4;a++){let l=new $(new jt(.06,.4+dt(0,.2),.03),e);l.position.set(dt(-.12,.12),1.62,dt(-.08,.02)),this.group.add(l)}}appearAt(t,e,i,s){this.group.position.set(t,e,i),this.group.rotation.y=s,this.group.visible=!0,this.life=1.9,this.opacity=0,this.group.scale.setScalar(.96)}hide(){this.group.visible=!1,this.life=0}update(t,e){if(!this.group.visible)return;this.bob+=t,this.group.position.y+=Math.sin(this.bob*1.6)*.002,this.ghostArmL.rotation.z=-.18+Math.sin(this.bob*.7)*.05,this.ghostArmR.rotation.z=.18+Math.cos(this.bob*.8)*.05,Math.random()<.05&&(this.opacity*=.55);let s=Math.atan2(e.x-this.group.position.x,e.z-this.group.position.z)-this.group.rotation.y;s=Math.atan2(Math.sin(s),Math.cos(s)),this.group.rotation.y+=s*Math.min(1,t*.8),this.life-=t;let r=this.life>.55?.42:0;this.opacity=ti(this.opacity,r,t*6);for(let o of this.mats)o.opacity=this.opacity;this.life<=0&&this.hide()}};var Ws="echo_apartment_campaign_v2",wn={invitation:{title:"\u4E00\u5C01\u6CA1\u6709\u7F72\u540D\u7684\u4FE1",location:"\u5927\u5385 \xB7 \u503C\u73ED\u53F0",item:"\u5931\u7269\u62DB\u9886\u51FD",cn:`\u81F4\u4E03\u6708\u5341\u56DB\u65E5\u79BB\u5F00\u7684\u4F4F\u6237\uFF1A

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

\u6211\u7FFB\u8FC7\u7167\u7247\uFF0C\u7B2C\u4E00\u6B21\u6CA1\u6709\u907F\u5F00\u90A3\u4E2A\u540D\u5B57\u3002
\u5730\u4E0B\u4F20\u6765\u94C1\u94FE\u677E\u52A8\u7684\u58F0\u97F3\u3002`},15:{title:"\u6700\u540E\u4E00\u518C\u4F4F\u6237\u540D\u7C3F",location:"\u4E8C\u697C\u897F\u7FFC \xB7 \u4F4F\u6237\u7EAA\u5FF5\u5BA4",item:"\u4F4F\u6237\u540D\u7C3F",cn:`\u6E05\u573A\u524D\u7684\u6700\u540E\u6838\u5BF9

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

\uFF3B\u9632\u6C34\u888B\u4E0A\u7684\u6807\u7B7E\u5199\u7740\uFF1A\u4E0D\u8981\u628A\u8BC1\u636E\u4E5F\u5E26\u8FDB\u6C34\u91CC\u3002\uFF3D`}},us=[{title:"\u6765\u4FE1",subtitle:"\u6709\u4E9B\u5931\u7269\uFF0C\u4E00\u76F4\u5728\u7B49\u4F60\u3002"},{title:"\u505C\u7535\u7684\u90A3\u4E00\u591C",subtitle:"\u8FD9\u680B\u697C\u8BB0\u5F97\u4F60\u9057\u5FD8\u7684\u4E8B\u60C5\u3002"},{title:"\u6CA1\u6709\u7ED3\u675F\u7684\u6349\u8FF7\u85CF",subtitle:"\u6B4C\u505C\u4E4B\u540E\uFF0C\u8C01\u4E5F\u6CA1\u6709\u6765\u3002"},{title:"\u7167\u7247\u91CC\u5C11\u4E86\u4E00\u4E2A\u4EBA",subtitle:"\u88AB\u62B9\u53BB\u7684\u540D\u5B57\uFF0C\u8FD8\u7559\u5728\u5E95\u7247\u4E0A\u3002"},{title:"\u628A\u540D\u5B57\u5E26\u51FA\u53BB",subtitle:"\u8FD9\u4E00\u6B21\uFF0C\u522B\u518D\u72EC\u81EA\u79BB\u5F00\u3002"}],P1=["invitation","power","cabinet","tapePlayed","memory","photo","released","ended"],Qh=["serviceKey","fuse","archiveKey","tape","valveHandle","exitKey","westKey","film","developer"],L1=Object.keys(wn),wo=(n,t)=>Array.isArray(n)&&n.length===t.length&&n.every((e,i)=>e===t[i]),Vs=class{constructor(t=null){this.flags={},this.items=new Set,this.documents=new Set,this.checkpoint={x:0,y:0,z:-6.4},this.elapsed=0,this.events=new Set,t&&this.restore(t)}get chapter(){return this.flags.photo?4:this.flags.memory?3:this.flags.cabinet?2:this.flags.power?1:0}get objective(){return this.flags.invitation?!this.items.has("fuse")&&!this.flags.power?"\u5230\u4E00\u697C\u53A8\u623F\u5BFB\u627E\u5907\u7528\u7194\u65AD\u5668":this.flags.power?!this.flags.cabinet&&!this.documents.has("2")?"\u8C03\u67E5\u4E00\u697C\u4F5B\u95F4\u7684\u65E7\u62A5\u7EB8\uFF0C\u5BFB\u627E\u6863\u6848\u67DC\u5BC6\u7801":this.flags.cabinet?this.items.has("tape")?this.flags.tapePlayed?!this.flags.memory&&!this.documents.has("3")?"\u5BFB\u627E\u4E00\u697C\u513F\u7AE5\u623F\u7684\u753B\uFF0C\u8FA8\u8BA4\u516B\u97F3\u76D2\u65CB\u5F8B":this.flags.memory?!this.flags.photo&&!this.items.has("film")?"\u7528\u516B\u97F3\u76D2\u91CC\u7684\u94A5\u5319\u6253\u5F00\u4E8C\u697C\u897F\u7FFC\uFF0C\u5230 204 \u5BFB\u627E\u5E95\u7247":!this.flags.photo&&!this.items.has("developer")?"\u5728\u897F\u7FFC\u4F4F\u6237\u7EAA\u5FF5\u5BA4\u53D6\u56DE\u663E\u5F71\u6DB2":this.flags.photo?!this.flags.released&&!this.items.has("valveHandle")?"\u5230\u4E00\u697C\u4E1C\u7FFC\u7EF4\u4FEE\u5BA4\u53D6\u56DE\u6392\u6C34\u9600\u624B\u8F6E":this.flags.released?"\u5E26\u7740\u82CD\u592A\u7684\u540D\u5B57\uFF0C\u524D\u5F80\u4E8C\u697C\u5929\u4E95\u9632\u706B\u95E8":"\u8FD4\u56DE\u5730\u4E0B\u6392\u6C34\u95F4\uFF0C\u88C5\u56DE\u624B\u8F6E\u5E76\u8F6C\u5F00\u4E09\u53EA\u9600\u95E8":"\u5230\u4E8C\u697C\u897F\u7FFC\u6697\u623F\uFF0C\u6D17\u51FA\u4E09\u53F7\u5BA4\u7684\u5168\u5BB6\u798F":"\u56DE\u5230\u4E00\u697C\u513F\u7AE5\u623F\uFF0C\u8BA9\u516B\u97F3\u76D2\u518D\u6B21\u54CD\u8D77":"\u8FDB\u5165\u4E8C\u697C 203 \u653E\u6620\u5BA4\uFF0C\u64AD\u653E\u5F55\u97F3\u5E26":"\u5728\u4E8C\u697C 202 \u53F7\u5BA4\u53D6\u56DE\u5F55\u97F3\u5E26":"\u4E0A\u4E8C\u697C\uFF0C\u5728 201 \u7BA1\u7406\u5BA4\u6253\u5F00\u6863\u6848\u67DC":"\u4ECE\u8D70\u5ECA\u7EF4\u4FEE\u95E8\u4E0B\u697C\uFF0C\u6062\u590D\u5730\u4E0B\u5907\u7528\u7535\u6E90":"\u8C03\u67E5\u5165\u53E3\u5927\u5385\u503C\u73ED\u53F0\u4E0A\u6CA1\u6709\u7F72\u540D\u7684\u4FE1"}get hint(){return this.flags.invitation?this.flags.power?this.flags.cabinet?this.flags.tapePlayed?this.flags.memory?this.flags.photo?!this.flags.released&&!this.items.has("valveHandle")?"\u4E1C\u7FFC\u5165\u53E3\u5728\u4E00\u697C\u957F\u8D70\u5ECA\u53F3\u4FA7\u3002\u624B\u8F6E\u7559\u5728\u7BA1\u7406\u5458\u7EF4\u4FEE\u5BA4\u7684\u5DE5\u5177\u53F0\u4E0A\u3002":this.flags.released?"\u9632\u706B\u95E8\u5728\u4E8C\u697C\u8D70\u5ECA\u4E2D\u6BB5\u3002\u4FDD\u6301\u7535\u91CF\uFF1B\u8863\u67DC\u53EF\u4EE5\u8EB2\u85CF\uFF0C\u4F46\u522B\u5728\u5B83\u773C\u524D\u8EB2\u8FDB\u53BB\u3002":"\u5E26\u624B\u8F6E\u5230\u5730\u4E0B\u6392\u6C34\u95F4\u3002\u5F55\u97F3\u8BB0\u5F55\u7740\u64CD\u4F5C\u6B21\u5E8F\uFF1A\u6CC4\u538B\u3001\u6392\u6C34\u3001\u56DE\u6C34\u3002":"\u897F\u7FFC\u5165\u53E3\u5728\u4E8C\u697C\u9760\u8FD1\u697C\u68AF\u95F4\u7684\u5DE6\u4FA7\u3002204 \u684C\u4E0A\u6709\u5E95\u7247\uFF0C\u5317\u9762\u7684\u7EAA\u5FF5\u5BA4\u6709\u663E\u5F71\u6DB2\u3002\u6697\u623F\u7EA2\u706F\u65C1\u8BB0\u5F55\u7740\u51B2\u6D17\u987A\u5E8F\u3002":"\u753B\u4E0A\u6807\u51FA\u4E86\u7B2C 3\u3001\u7B2C 1\u3001\u7B2C 4 \u6839\u7EBF\u3002\u6309\u8FD9\u4E2A\u987A\u5E8F\u5F39\u594F\u56DB\u4E2A\u97F3\u3002":"202 \u5728\u4E8C\u697C\u8D70\u5ECA\u53F3\u4FA7\uFF0C203 \u5728\u5DE6\u4FA7\u3002\u9700\u8981\u6863\u6848\u67DC\u91CC\u7684\u94A5\u5319\u3002":"\u4F5B\u95F4\u526A\u62A5\u63D0\u793A\u7528\u505C\u7535\u65F6\u523B\u4F5C\u4E3A\u5BC6\u7801\uFF1B\u5899\u4E0A\u7684\u949F\u505C\u5728 02:17\u3002":this.items.has("fuse")?"\u7EF4\u4FEE\u95E8\u5728\u4E00\u697C\u957F\u8D70\u5ECA\u53F3\u4FA7\u3002\u914D\u7535\u7BB1\u65C1\u7684\u68C0\u4FEE\u5361\u8BB0\u5F55\u7740\u5408\u95F8\u987A\u5E8F\u3002":"\u53A8\u623F\u5728\u7384\u5173\u5DE6\u4FA7\u7B2C\u4E00\u6247\u95E8\u540E\u3002\u7194\u65AD\u5668\u653E\u5728\u9760\u5899\u7684\u5DE5\u5177\u76D2\u91CC\u3002":"\u5165\u53E3\u5927\u5385\u5DE6\u4FA7\u503C\u73ED\u53F0\u4E0A\u7684\u4FE1\u53EF\u4EE5\u8C03\u67E5\u3002\u6309 E\uFF0C\u6216\u70B9\u51FB\u53F3\u4FA7\u8C03\u67E5\u6309\u94AE\u3002"}collectDocument(t){let e=String(t);return!wn[e]||this.documents.has(e)?!1:(this.documents.add(e),e==="invitation"&&(this.flags.invitation=!0,this.items.add("serviceKey")),!0)}collectItem(t){return!Qh.includes(t)||this.items.has(t)||["westKey","film","developer"].includes(t)&&!this.flags.memory||(t==="film"||t==="developer")&&this.flags.photo?!1:(this.items.add(t),!0)}perform(t,e){let i=s=>({ok:!1,message:s});if(t==="power"){if(this.flags.power)return i("\u5907\u7528\u7535\u6E90\u5DF2\u7ECF\u63A5\u901A\u3002");if(!this.flags.invitation||!this.items.has("fuse"))return i("\u7194\u65AD\u5668\u70E7\u65AD\u4E86\u3002\u53A8\u623F\u5E94\u8BE5\u6709\u5907\u7528\u4EF6\u3002");if(!wo(e,[2,0,1]))return i("\u4FDD\u62A4\u5F00\u5173\u8DF3\u95F8\u4E86\u3002\u5148\u542F\u52A8\u6392\u6C34\uFF0C\u518D\u542F\u52A8\u8D70\u5ECA\u4E0E\u4F4F\u6237\u7535\u6E90\u3002");this.flags.power=!0,this.items.delete("fuse"),this.checkpoint={x:13.2,y:-2.8,z:20.5}}else if(t==="cabinet"){if(!this.flags.power)return i("\u7535\u5B50\u9501\u6CA1\u6709\u7535\u3002\u5148\u6062\u590D\u5730\u4E0B\u7535\u6E90\u3002");if(this.flags.cabinet)return i("\u6863\u6848\u67DC\u5DF2\u7ECF\u6253\u5F00\u3002");if(String(e)!=="0217")return i("\u5BC6\u7801\u4E0D\u5BF9\u3002\u526A\u62A5\u4E0A\u8BF4\uFF0C\u662F\u505C\u7535\u7684\u65F6\u523B\u3002");this.flags.cabinet=!0,this.items.add("archiveKey"),this.checkpoint={x:-2.8,y:2.8,z:21.2}}else if(t==="tape"){if(!this.items.has("archiveKey"))return i("\u9700\u8981\u7BA1\u7406\u5BA4\u6863\u6848\u67DC\u91CC\u7684\u94A5\u5319\u3002");if(!this.items.has("tape"))return i("\u6CA1\u6709\u5F55\u97F3\u5E26\u3002202 \u53F7\u5BA4\u91CC\u8FD8\u7559\u7740\u4E00\u76D8\u3002");if(this.flags.tapePlayed)return i("\u90A3\u4E00\u591C\u7684\u5F55\u97F3\u5DF2\u7ECF\u6536\u8FDB\u8C03\u67E5\u624B\u518C\u3002");this.flags.tapePlayed=!0,this.collectDocument(5)}else if(t==="music"){if(!this.flags.tapePlayed)return i("\u53D1\u6761\u5361\u4F4F\u4E86\u3002\u5148\u627E\u5230\u5E76\u64AD\u653E\u4E8C\u697C\u7684\u5F55\u97F3\u5E26\u3002");if(this.flags.memory)return i("\u516B\u97F3\u76D2\u7684\u5939\u5C42\u5DF2\u7ECF\u6253\u5F00\u3002");if(!wo(e,[3,1,4]))return i("\u65CB\u5F8B\u4E0D\u5BF9\u3002\u5B69\u5B50\u7684\u753B\u91CC\u7559\u4E0B\u4E86\u4E09\u4E2A\u97F3\u7B26\u3002");this.flags.memory=!0,this.items.add("westKey"),this.collectDocument(7),this.checkpoint={x:2.8,y:0,z:10.7}}else if(t==="develop"){if(!this.flags.memory)return i("\u8FD8\u6CA1\u6709\u627E\u5230\u897F\u7FFC\u7684\u94A5\u5319\u3002\u5148\u8BA9\u516B\u97F3\u76D2\u54CD\u8D77\u6765\u3002");if(this.flags.photo)return i("\u5168\u5BB6\u798F\u5DF2\u7ECF\u6D17\u51FA\u6765\u4E86\u3002");if(!this.items.has("film"))return i("\u9700\u8981 204 \u6444\u5F71\u5E08\u65E7\u5C45\u91CC\u7684\u90A3\u5377\u5E95\u7247\u3002");if(!this.items.has("developer"))return i("\u663E\u5F71\u6DB2\u7528\u5B8C\u4E86\u3002\u5317\u9762\u7684\u4F4F\u6237\u7EAA\u5FF5\u5BA4\u91CC\u6709\u4E00\u74F6\u3002");if(!wo(e,[0,2,1,3]))return i("\u7EB8\u4E0A\u7684\u5F71\u50CF\u6563\u5F00\u4E86\u3002\u5148\u663E\u5F71\uFF0C\u518D\u505C\u663E\u3001\u5B9A\u5F71\uFF0C\u6700\u540E\u6C34\u6D17\u3002");this.flags.photo=!0,this.items.delete("film"),this.items.delete("developer"),this.collectDocument(14),this.checkpoint={x:-25,y:2.8,z:50.5}}else if(t==="valves"){if(!this.flags.memory)return i("\u6C34\u95F8\u5C01\u6B7B\u4E86\u3002\u4F3C\u4E4E\u5728\u7B49\u5F85\u6709\u4EBA\u8BB0\u8D77\u4EC0\u4E48\u3002");if(!this.flags.photo)return i("\u94C1\u94FE\u4ECD\u7136\u7EF7\u7D27\u3002\u5148\u5728\u897F\u7FFC\u6697\u623F\u627E\u56DE\u7167\u7247\u91CC\u7684\u540D\u5B57\u3002");if(this.flags.released)return i("\u6392\u6C34\u5DF2\u7ECF\u5B8C\u6210\u3002\u5929\u4E95\u7684\u9632\u706B\u95E8\u53EF\u4EE5\u6253\u5F00\u4E86\u3002");if(!this.items.has("valveHandle"))return i("\u7B2C\u4E09\u53EA\u9600\u95E8\u6CA1\u6709\u624B\u8F6E\u3002\u4E00\u697C\u4E1C\u7FFC\u7EF4\u4FEE\u5BA4\u7684\u5DE5\u5177\u53F0\u4E0A\u5E94\u8BE5\u8FD8\u7559\u7740\u5B83\u3002");if(!wo(e,[0,2,1]))return i("\u6C34\u538B\u6CA1\u6709\u4E0B\u964D\u3002\u5F55\u97F3\u91CC\u7684\u6B21\u5E8F\u662F\u6CC4\u538B\u3001\u6392\u6C34\u3001\u56DE\u6C34\u3002");this.flags.released=!0,this.items.delete("valveHandle"),this.items.add("exitKey"),this.checkpoint={x:13.2,y:-2.8,z:20.5}}else if(t==="ending"){if(!this.flags.released)return i("\u5730\u4E0B\u7684\u95E8\u8FD8\u6CA1\u6709\u677E\u5F00\u3002");if(!["remember","leave"].includes(e))return i("\u4F60\u8FD8\u6CA1\u6709\u4F5C\u51FA\u9009\u62E9\u3002");if(e==="remember"&&!this.documents.has("6"))return i("\u4F60\u8FD8\u4E0D\u77E5\u9053\u5B8C\u6574\u7684\u771F\u76F8\u3002203 \u53F7\u5BA4\u91CC\u6709\u4E00\u5C01\u8BA4\u9886\u4E66\u3002");this.flags.ended=!0,this.ending=e}else return i("\u65E0\u6CD5\u64CD\u4F5C\u3002");return{ok:!0,chapter:this.chapter,action:t}}snapshot(){var t;return{version:2,flags:{...this.flags},items:[...this.items],documents:[...this.documents],checkpoint:{...this.checkpoint},elapsed:Math.max(0,this.elapsed),ending:(t=this.ending)!=null?t:null,revision:3,events:[...this.events]}}restore(t){var i;if(!t||t.version!==2||!Array.isArray(t.items)||!Array.isArray(t.documents))return;for(let s of P1)((i=t.flags)==null?void 0:i[s])===!0&&(this.flags[s]=!0);if(this.items=new Set(t.items.filter(s=>Qh.includes(s))),this.documents=new Set(t.documents.map(String).filter(s=>L1.includes(s))),this.documents.has("invitation")?this.flags.invitation=!0:this.flags={},!this.flags.power)for(let s of["cabinet","tapePlayed","memory","photo","released","ended"])delete this.flags[s];if(!this.flags.cabinet)for(let s of["tapePlayed","memory","photo","released","ended"])delete this.flags[s];if(!this.flags.tapePlayed)for(let s of["memory","photo","released","ended"])delete this.flags[s];if(!this.flags.memory)for(let s of["photo","released","ended"])delete this.flags[s];if(this.flags.memory&&this.flags.released&&t.revision!==3&&(this.flags.photo=!0,this.documents.add("14")),(!this.flags.photo||!this.documents.has("14"))&&(delete this.flags.photo,delete this.flags.released,delete this.flags.ended),this.flags.memory)this.items.add("westKey");else for(let s of["westKey","film","developer"])this.items.delete(s);this.flags.photo&&(this.items.delete("film"),this.items.delete("developer")),this.events=new Set(Array.isArray(t.events)?t.events.filter(s=>typeof s=="string"&&s.length<48).slice(0,32):[]),this.flags.invitation||this.items.delete("serviceKey"),this.flags.cabinet||this.items.delete("archiveKey"),this.flags.released||this.items.delete("exitKey"),this.flags.invitation&&this.items.add("serviceKey"),this.flags.cabinet&&this.items.add("archiveKey"),this.flags.released&&this.items.add("exitKey"),this.flags.tapePlayed&&this.items.add("tape"),Number.isFinite(t.elapsed)&&(this.elapsed=Math.max(0,t.elapsed));let e=t.checkpoint;e&&[e.x,e.y,e.z].every(Number.isFinite)&&e.x>=-30&&e.x<=31&&e.z>=-9&&e.z<=83&&[-2.8,0,2.8,5.6].includes(e.y)&&(this.checkpoint={...e}),["remember","leave"].includes(t.ending)&&this.flags.ended&&(this.ending=t.ending)}},tu={serviceKey:"\u5730\u4E0B\u7EF4\u4FEE\u95F4\u94A5\u5319",fuse:"\u5907\u7528\u7194\u65AD\u5668",valveHandle:"\u6392\u6C34\u9600\u624B\u8F6E",archiveKey:"203 \u653E\u6620\u5BA4\u94A5\u5319",tape:"\u4E03\u6708\u5341\u56DB\u65E5\u7684\u5F55\u97F3\u5E26",exitKey:"\u9632\u706B\u95E8\u94A5\u5319",westKey:"\u4E8C\u697C\u897F\u7FFC\u94A5\u5319",film:"\u672A\u51B2\u6D17\u7684\u5168\u5BB6\u798F\u5E95\u7247",developer:"\u5BC6\u5C01\u7684\u663E\u5F71\u6DB2"},eu={remember:{title:"\u5929\u4EAE\u4E4B\u524D",label:"\u7ED3\u5C40 \xB7 \u5F52\u6765",text:`\u4F60\u7B2C\u4E00\u6B21\u6E05\u695A\u5730\u53EB\u51FA\u4E86\u4ED6\u7684\u540D\u5B57\u3002
\u300C\u82CD\u592A\uFF0C\u6211\u4EEC\u56DE\u5BB6\u3002\u300D

\u8D70\u5ECA\u91CC\u7684\u811A\u6B65\u505C\u4E86\u3002
\u90A3\u53EA\u51B0\u51B7\u7684\u5C0F\u624B\uFF0C\u7EC8\u4E8E\u63E1\u4F4F\u4E86\u4F60\u7684\u624B\u3002

\u697C\u5916\u4ECD\u7136\u4E0B\u7740\u96E8\u3002
\u53EF\u4F60\u8BB0\u5F97\uFF0C\u5929\u4EAE\u7684\u65B9\u5411\u3002`},leave:{title:"\u53C8\u4E00\u5C01\u6765\u4FE1",label:"\u7ED3\u5C40 \xB7 \u9057\u5FD8",text:`\u4F60\u63A8\u5F00\u4E86\u95E8\uFF0C\u6CA1\u6709\u518D\u56DE\u5934\u3002

\u4E09\u4E2A\u6708\u540E\uFF0C\u4E00\u5C01\u6CA1\u6709\u7F72\u540D\u7684\u4FE1\u88AB\u585E\u8FDB\u4F60\u5BB6\u7684\u4FE1\u7BB1\u3002

\u300C\u60A8\u9057\u843D\u7684\u4E1C\u897F\u4ECD\u5728\u4E09\u53F7\u5BA4\u3002\u300D

\u4FE1\u5C01\u91CC\uFF0C\u662F\u4E00\u679A\u8FD8\u5728\u7F13\u6162\u8F6C\u52A8\u7684\u516B\u97F3\u76D2\u53D1\u6761\u3002
\u4ECE\u95E8\u5916\u4F20\u6765\u4E09\u4E2A\u97F3\u7B26\u3002`}};var pt=n=>document.getElementById(n),So={develop:{title:"\u88AB\u62B9\u53BB\u7684\u5168\u5BB6\u798F",description:"\u8BA9\u5E95\u7247\u7ECF\u8FC7\u56DB\u53EA\u836F\u6DB2\u6258\u76D8\u3002\u684C\u4E0A\u7684\u89C4\u7A0B\u8BB0\u5F55\u7740\u51B2\u6D17\u6B21\u5E8F\u3002",labels:["\u663E\u5F71","\u5B9A\u5F71","\u505C\u663E","\u6C34\u6D17"],values:[0,1,2,3],length:4,hint:"\u6697\u623F\u89C4\u7A0B\uFF1A\u663E\u5F71 \u2192 \u505C\u663E \u2192 \u5B9A\u5F71 \u2192 \u6C34\u6D17\u3002\u5E95\u7247\u5728 204\uFF0C\u663E\u5F71\u6DB2\u5728\u4F4F\u6237\u7EAA\u5FF5\u5BA4\u3002",complete:"\u5F71\u50CF\u6D6E\u4E86\u51FA\u6765\u3002\u4F60\u7275\u7740\u4ED6\u7684\u624B\u3002\u7167\u7247\u4E0A\u4ECE\u6765\u90FD\u4E0D\u662F\u4E00\u4E2A\u5B69\u5B50\u3002"},power:{title:"\u5907\u7528\u7535\u6E90",description:"\u88C5\u5165\u7194\u65AD\u5668\uFF0C\u518D\u6309\u68C0\u4FEE\u5361\u7684\u6B21\u5E8F\u5408\u95F8\u3002",labels:["\u8D70\u5ECA\u7167\u660E","\u4F4F\u6237\u7535\u6E90","\u6392\u6C34\u6CF5"],values:[0,1,2],hint:"\u9762\u677F\u5DE6\u8D77\uFF1A\u8D70\u5ECA\u3001\u4F4F\u6237\u3001\u6392\u6C34\u3002\u542F\u52A8\u6B21\u5E8F\uFF1A\u6392\u6C34 \u2192 \u8D70\u5ECA \u2192 \u4F4F\u6237\u3002",complete:"\u5907\u7528\u7535\u6E90\u542F\u52A8\u3002\u4E8C\u697C\u7684\u78C1\u9501\u677E\u5F00\u4E86\u3002"},cabinet:{title:"\u6863\u6848\u67DC",description:"\u56DB\u4F4D\u6570\u7684\u5BC6\u7801\u3002\u9501\u9762\u4E0A\u6709\u4E00\u5904\u5C1A\u672A\u5E72\u900F\u7684\u6C34\u75D5\u3002",hint:"\u4E00\u697C\u4F5B\u95F4\u7684\u526A\u62A5\u8BF4\uFF0C\u5BC6\u7801\u662F\u505C\u7535\u65F6\u523B\u300202:17\uFF0C\u8F93\u5165 0217\u3002",complete:"\u6863\u6848\u67DC\u6253\u5F00\u4E86\u3002\u91CC\u9762\u653E\u7740 203 \u653E\u6620\u5BA4\u7684\u94A5\u5319\u3002"},music:{title:"\u6CA1\u5531\u5B8C\u7684\u6B4C",description:"\u56DB\u679A\u97F3\u7247\u3002\u8BA9\u82CD\u592A\u719F\u6089\u7684\u4E09\u4E2A\u97F3\u7B26\u518D\u6B21\u54CD\u8D77\u3002",labels:["\u2160","\u2161","\u2162","\u2163"],values:[1,2,3,4],hint:"\u513F\u7AE5\u623F\u7684\u753B\u6807\u51FA\u4E86\u4E09\u6839\u7EBF\uFF1A3 \u2192 1 \u2192 4\u3002",complete:"\u516B\u97F3\u76D2\u54CD\u4E86\u3002\u5939\u5C42\u91CC\u85CF\u7740\u4E00\u5F20\u5199\u7ED9\u54E5\u54E5\u7684\u7EB8\u6761\u3002"},valves:{title:"\u6C34\u95F8",description:"\u987A\u5E8F\u9519\u8BEF\u4F1A\u8BA9\u6C34\u538B\u91CD\u65B0\u5347\u9AD8\u3002\u542C\u4ECE\u5F55\u97F3\u91CC\u7684\u58F0\u97F3\u3002",labels:["\u6CC4\u538B","\u56DE\u6C34","\u6392\u6C34"],values:[0,1,2],hint:"\u5F55\u97F3\u91CC\u8BF4\uFF1A\u5148\u6CC4\u538B\uFF0C\u518D\u6392\u6C34\uFF0C\u6700\u540E\u56DE\u6C34\u3002",complete:"\u4E95\u5E95\u7684\u95E8\u5F00\u4E86\u3002\u80CC\u540E\u4F20\u6765\u4E86\u4E0D\u5C5E\u4E8E\u4F60\u7684\u811A\u6B65\u58F0\u3002"}},To=class{constructor(t){var e,i;this.game=t,this.sequence=[],this.mapFloor=0,this.mapZoom=1,this.saved=null;try{let s=JSON.parse(localStorage.getItem(Ws)||"null");(s==null?void 0:s.version)===2&&((e=s.flags)!=null&&e.invitation)&&!((i=s.flags)!=null&&i.ended)&&(this.saved=s)}catch(s){}pt("continue-game").classList.toggle("hidden",!this.saved),pt("continue-game").addEventListener("click",()=>t._start(!0)),pt("start-game").addEventListener("click",()=>t._start(!1)),pt("settings-title").addEventListener("click",()=>this.openSettings()),pt("resume-game").addEventListener("click",()=>this.closeSettings()),pt("checkpoint-retry").addEventListener("click",()=>{t._wakeAtCheckpoint(),this.closeSettings()}),pt("journal-button").addEventListener("click",()=>this.openJournal()),pt("journal-close").addEventListener("click",()=>this.close()),pt("puzzle-close").addEventListener("click",()=>this.close()),pt("puzzle-submit").addEventListener("click",()=>this.submitPuzzle()),pt("puzzle-reset").addEventListener("click",()=>{this.sequence=[],pt("puzzle-code").value="",this.renderSequence()}),pt("recording-skip").addEventListener("click",()=>this.finishRecording()),pt("puzzle-code").addEventListener("keydown",s=>{if(s.stopPropagation(),s.code==="Escape"){s.preventDefault(),this.close();return}s.code==="Enter"&&this.submitPuzzle()}),pt("puzzle-hint").addEventListener("click",()=>{pt("puzzle-status").textContent=So[this.puzzle].hint}),pt("journal-hint").addEventListener("click",()=>{pt("journal-guidance").textContent=t.campaign.hint,pt("journal-guidance").classList.toggle("hidden")}),document.querySelectorAll("[data-journal-tab]").forEach(s=>{s.addEventListener("click",()=>this.showJournalTab(s.dataset.journalTab))}),document.querySelectorAll("[data-map-floor]").forEach(s=>{s.addEventListener("click",()=>{this.mapFloor=Number(s.dataset.mapFloor),this.drawMap()})});for(let[s,r]of[["map-zoom-in",.25],["map-zoom-out",-.25]])pt(s).addEventListener("click",()=>{this.mapZoom=Math.max(1,Math.min(2.5,this.mapZoom+r)),this.applyMapZoom()});pt("map-zoom-reset").addEventListener("click",()=>{this.mapZoom=1,this.applyMapZoom()}),pt("ending-remember").addEventListener("click",()=>t._ending("remember")),pt("ending-leave").addEventListener("click",()=>t._ending("leave")),this.bindSettings()}bindSettings(){let t={};try{t=JSON.parse(localStorage.getItem("echo_settings_v2")||"{}")||{}}catch(i){}this.settings={volume:Number.isFinite(t.volume)?Math.max(0,Math.min(100,t.volume)):70,brightness:Number.isFinite(t.brightness)?Math.max(70,Math.min(150,t.brightness)):100,reduced:t.reduced===!0};let e=()=>{this.game.audio.setVolume(this.settings.volume/100),this.game.grade.uniforms.uExposure.value=1.38*this.settings.brightness/100,this.game.reduceEffects=this.settings.reduced,document.body.classList.toggle("reduced-effects",this.settings.reduced);try{localStorage.setItem("echo_settings_v2",JSON.stringify(this.settings))}catch(i){}};for(let i of["volume","brightness"]){let s=pt("setting-"+i);s.value=this.settings[i],pt("value-"+i).textContent=this.settings[i]+"%",s.addEventListener("input",()=>{this.settings[i]=Number(s.value),pt("value-"+i).textContent=s.value+"%",e()})}pt("setting-reduced").checked=this.settings.reduced,pt("setting-reduced").addEventListener("change",i=>{this.settings.reduced=i.target.checked,e()}),e()}openSettings(){pt("pause").classList.remove("hidden"),pt("pause-heading").textContent=this.game.state==="title"?"\u4F53\u9A8C\u8BBE\u7F6E":"\u6682\u505C",pt("resume-game").textContent=this.game.state==="title"?"\u8FD4\u56DE":"\u7EE7\u7EED\u63A2\u7D22",pt("checkpoint-retry").classList.toggle("hidden",this.game.state==="title"),this.game.audio.setPaused(!0),this.game.keys={},this.game.controls.isLocked&&(this.game._skipUnlockPause=!0,this.game.controls.unlock())}closeSettings(){pt("pause").classList.add("hidden"),this.game.state==="playing"&&this.game._tryLock(),this.game.audio.setPaused(!1)}open(t){return this.game.state!=="playing"||this.game.noteOpen?!1:(this.game.noteOpen=!0,this.panel=t,this.game.keys={},this.game.audio.setPaused(!0),this.game._touchUI&&this.game._touchUI.classList.add("hidden"),this.game.controls.isLocked&&(this.game._skipUnlockPause=!0,this.game.controls.unlock()),pt(t).classList.remove("hidden"),!0)}close(){var t;this.panel&&(pt(this.panel).classList.add("hidden"),this.panel=null,this.recording=null,(t=document.activeElement)==null||t.blur(),this.game.noteOpen=!1,this.game.audio.setPaused(!1),this.game._touchUI&&this.game._touchUI.classList.remove("hidden"),this.game.state==="playing"&&this.game._tryLock())}openJournal(t="evidence"){if(this.panel==="journal"){this.close();return}if(!this.open("journal"))return;let e=this.game.campaign;pt("journal-chapter").textContent=us[e.chapter].title,pt("journal-objective").textContent=e.objective;let i=pt("journal-progress");i.replaceChildren(),us.forEach((a,l)=>{let c=document.createElement("li");c.textContent=String(l+1).padStart(2,"0")+" \xB7 "+a.title,c.className=l<e.chapter?"complete":l===e.chapter?"current":"",i.appendChild(c)}),pt("journal-guidance").classList.add("hidden");let s=pt("inventory-list");s.replaceChildren();for(let a of e.items){let l=document.createElement("span");l.textContent=tu[a],s.appendChild(l)}e.items.size||(s.textContent="\u8FD8\u6CA1\u6709\u627E\u5230\u968F\u8EAB\u7269\u54C1\u3002");let r=pt("evidence-list");r.replaceChildren();for(let a of e.documents){let l=wn[a],c=document.createElement("button");c.className="evidence-entry";let u=document.createElement("strong");u.textContent=l.title;let d=document.createElement("span");d.textContent=l.location,c.append(u,d),c.addEventListener("click",()=>this.renderDocument(a)),r.appendChild(c)}e.documents.size||(r.textContent="\u8C03\u67E5\u7EB8\u5F20\u3001\u62A5\u7EB8\u4E0E\u5F55\u97F3\uFF0C\u4F1A\u5C06\u8BB0\u5F55\u4FDD\u5B58\u5728\u8FD9\u91CC\u3002");let o=[...e.documents].at(-1);o?this.renderDocument(o):(pt("evidence-title").textContent="\u8FD8\u6CA1\u6709\u8BB0\u5F55",pt("evidence-content").textContent="\u4ECE\u5927\u5385\u503C\u73ED\u53F0\u4E0A\u7684\u90A3\u5C01\u4FE1\u5F00\u59CB\u3002"),this.mapFloor=this.game.playerPos.y<-.8?-1:this.game.playerPos.y>4.8?2:this.game.playerPos.y>2?1:0,this.showJournalTab(t),pt("journal-close").focus()}renderDocument(t){let e=wn[t];pt("evidence-title").textContent=e.title,pt("evidence-location").textContent=e.location,pt("evidence-content").textContent=e.cn,this.renderPhoto("evidence-photo",t),document.querySelectorAll(".evidence-entry").forEach(i=>{var s;return i.classList.toggle("selected",((s=i.querySelector("strong"))==null?void 0:s.textContent)===e.title)})}renderPhoto(t,e){let i=pt(t),s=String(e)==="14";if(i.classList.toggle("hidden",!s),s){let r=this.game.level.campaign.photo.material.map.image;i.width=r.width,i.height=r.height,i.getContext("2d").drawImage(r,0,0)}}showJournalTab(t){pt("journal").dataset.tab=t,pt("journal-evidence").classList.toggle("hidden",t!=="evidence"),pt("journal-map").classList.toggle("hidden",t!=="map"),document.querySelectorAll("[data-journal-tab]").forEach(e=>e.classList.toggle("selected",e.dataset.journalTab===t)),t==="map"&&this.drawMap()}drawMap(){let t=pt("map-canvas"),e=t.getContext("2d"),i=t.width,s=t.height;e.clearRect(0,0,i,s);let r=this.mapFloor,o=bl.filter(p=>p.floor===r),a=Math.min(...o.map(p=>p.bounds[0]))-2,l=Math.max(...o.map(p=>p.bounds[2]))+2,c=Math.min(...o.map(p=>p.bounds[1]))-3,u=Math.max(...o.map(p=>p.bounds[3]))+3,d=Math.min((i-80)/(u-c),(s-80)/(l-a)),h=p=>i/2+(p-(u+c)/2)*d,f=p=>s/2+(p-(l+a)/2)*d;e.lineWidth=1.5,e.textAlign="center",e.textBaseline="middle";for(let p of o){let[m,y,_,v]=p.bounds;e.fillStyle="rgba(129,153,138,.08)",e.strokeStyle="#81938a",e.fillRect(h(y),f(m),(v-y)*d,(_-m)*d),e.strokeRect(h(y),f(m),(v-y)*d,(_-m)*d),e.fillStyle="#ced4c7";let S=(v-y)*d,b=(_-m)*d;e.save(),e.translate(h((y+v)/2),f((m+_)/2));let R=S<60&&b>S*2;R&&e.rotate(-Math.PI/2);let U=(R?b:S)-12,M=Math.min(16,Math.max(10,(R?S:b)*.65));e.font=M+'px "Songti SC", serif';let E=[p.name];if(e.measureText(p.name).width>U&&b>40&&!R){let z=p.name.replace("\u6444\u5F71\u5E08\u65E7\u5C45",`\u6444\u5F71\u5E08
\u65E7\u5C45`).replace("204 ",`204
`).split(`
`);E=z.length>1?z:[p.name.slice(0,4),p.name.slice(4)]}for(;M>9&&E.some(z=>e.measureText(z).width>U);)M--,e.font=M+'px "Songti SC", serif';E.forEach((z,Y)=>e.fillText(z,0,(Y-(E.length-1)/2)*(M+5))),e.restore()}let g=this.game.playerPos;(g.y<-.8?-1:g.y>4.8?2:g.y>2?1:0)===r&&(e.fillStyle="#ca8b63",e.beginPath(),e.arc(h(g.z),f(g.x),6,0,Math.PI*2),e.fill(),e.strokeStyle="#ca8b63",e.beginPath(),e.moveTo(h(g.z),f(g.x)),e.lineTo(h(g.z)-Math.cos(this.game.camera.rotation.y)*18,f(g.x)-Math.sin(this.game.camera.rotation.y)*18),e.stroke()),pt("map-caption").textContent="\u4F4F\u6237\u65E7\u5E73\u9762\u56FE \xB7 \u6A59\u8272\u6807\u8BB0\u662F\u4F60\u7684\u4F4D\u7F6E \xB7 \u4E3B\u697C\u68AF\u8FDE\u63A5\u4E00\u697C\u3001\u4E8C\u697C\u548C\u5C4B\u9876\uFF1B\u7EF4\u4FEE\u697C\u68AF\u901A\u5F80\u5730\u4E0B",document.querySelectorAll("[data-map-floor]").forEach(p=>p.classList.toggle("selected",Number(p.dataset.mapFloor)===r)),this.applyMapZoom()}applyMapZoom(){pt("map-canvas").style.width=this.mapZoom*100+"%",pt("map-zoom-reset").textContent=Math.round(this.mapZoom*100)+"%",pt("map-zoom-out").disabled=this.mapZoom===1,pt("map-zoom-in").disabled=this.mapZoom===2.5}openPuzzle(t){var o;if(t==="tape"){if(this.game.campaign.flags.tapePlayed){this.game._readNote(5);return}let a=this.game.campaign.perform("tape");if(!a.ok){this.game._sub(a.message);return}this.game._campaignAdvanced("tape"),this.openRecording();return}let e={power:"power",cabinet:"cabinet",music:"memory",valves:"released",develop:"photo"};if(this.game.campaign.flags[e[t]]){this.game._sub("\u8FD9\u91CC\u5DF2\u7ECF\u8C03\u67E5\u8FC7\u4E86\u3002\u8BB0\u5F55\u4FDD\u5B58\u5728\u8C03\u67E5\u624B\u518C\u91CC\u3002");return}if(!this.open("puzzle"))return;this.puzzle=t,this.sequence=[];let i=So[t];pt("puzzle-title").textContent=i.title,pt("puzzle-description").textContent=i.description,pt("puzzle-status").textContent="",pt("puzzle-code").value="",pt("puzzle-code").classList.toggle("hidden",t!=="cabinet"),pt("puzzle-keypad").classList.toggle("hidden",t!=="cabinet"),pt("puzzle-sequence").classList.toggle("hidden",t==="cabinet");let s=pt("puzzle-controls");s.replaceChildren(),(o=i.labels)==null||o.forEach((a,l)=>{let c=document.createElement("button");c.className="puzzle-control",c.textContent=a,c.addEventListener("click",()=>{this.sequence.length>=(i.length||3)&&(this.sequence=[]),this.sequence.push(i.values[l]),t==="music"?this.game.audio.puzzleTone(i.values[l]):this.game.audio.switchClick(),this.renderSequence()}),s.appendChild(c)});let r=pt("puzzle-keypad");r.replaceChildren(),["1","2","3","4","5","6","7","8","9","\u6E05\u9664","0","\u9000\u683C"].forEach(a=>{let l=document.createElement("button");l.textContent=a,l.addEventListener("click",()=>{let c=pt("puzzle-code");a==="\u6E05\u9664"?c.value="":a==="\u9000\u683C"?c.value=c.value.slice(0,-1):c.value.length<4&&(c.value+=a)}),r.appendChild(l)}),this.renderSequence(),t==="cabinet"?pt("puzzle-code").focus():pt("puzzle-close").focus()}openRecording(){this.open("recording")&&(this.game.audio.setPaused(!1),this.recording={elapsed:0,beat:0,duration:32},pt("recording-line").textContent="\uFF3B\u78C1\u5E26\u5F00\u59CB\u8F6C\u52A8\u3002\u96E8\u58F0\u3002\uFF3D",pt("recording-time").textContent="00:00 / 00:32",pt("recording-progress").style.width="0%",pt("recording-skip").focus())}update(t){var s,r;let e=this.recording;if(this.panel!=="recording"||!e||!pt("pause").classList.contains("hidden"))return;e.elapsed+=t;let i=[[2,"\u300C\u54E5\u54E5\uFF0C\u4F60\u4F1A\u6765\u63A5\u6211\u5417\uFF1F\u300D","whisper"],[6,"\u300C\u6B4C\u54CD\u4E86\u5C31\u51FA\u6765\uFF0C\u522B\u8BA9\u5988\u5988\u53D1\u73B0\u3002\u300D","musicBox"],[10,"\uFF3B\u5F00\u95E8\u58F0\u3002\u7535\u6D41\u4E2D\u65AD\u3002\uFF3D","doorClose"],[13,"\u300C\u54E5\u54E5\uFF1F\u6211\u770B\u4E0D\u89C1\u4E86\u3002\u300D","cry"],[18,"\uFF3B\u6C89\u9ED8\u3002\u968F\u540E\uFF0C\u4E00\u4E2A\u6210\u5E74\u7537\u4EBA\u7684\u58F0\u97F3\u3002\uFF3D","breath"],[22,"\u300C\u5148\u6CC4\u538B\uFF0C\u518D\u6392\u6C34\uFF0C\u6700\u540E\u56DE\u6C34\u3002\u300D","hammer"],[26,"\u300C\u522B\u518D\u628A\u90A3\u6247\u95E8\u5C01\u8D77\u6765\u4E86\u3002\u300D","whisper"],[29,"\uFF3B\u6700\u540E\u4F20\u6765\u4E09\u679A\u516B\u97F3\u76D2\u7684\u97F3\u7B26\u3002\uFF3D","musicBox"]];for(;e.beat<i.length&&e.elapsed>=i[e.beat][0];){let[,o,a]=i[e.beat++];pt("recording-line").textContent=o,(r=(s=this.game.audio)[a])==null||r.call(s)}pt("recording-time").textContent="00:"+String(Math.min(32,Math.floor(e.elapsed))).padStart(2,"0")+" / 00:32",pt("recording-progress").style.width=Math.min(100,e.elapsed/e.duration*100)+"%",e.elapsed>=e.duration&&this.finishRecording()}finishRecording(){this.panel==="recording"&&(this.close(),this.game._readNote(5))}renderSequence(){let t=So[this.puzzle];pt("puzzle-sequence").textContent=this.sequence.length?this.sequence.map(e=>t.labels[t.values.indexOf(e)]).join(" \u2192 "):"\u7B49\u5F85\u64CD\u4F5C"}submitPuzzle(){let t=this.puzzle,e=t==="cabinet"?pt("puzzle-code").value.trim():this.sequence,i=this.game.campaign.perform(t,e);if(!i.ok){pt("puzzle-status").textContent=i.message,this.sequence=[],this.renderSequence(),this.game.audio.switchClick();return}this.close(),this.game._campaignAdvanced(t),this.game._sub(So[t].complete,"",5),t==="music"&&this.game._readNote(7),t==="develop"&&this.game._readNote(14)}chooseEnding(){if(this.panel||this.game.state!=="playing"||!this.open("ending-choice"))return;let t=this.game.campaign.documents.has("6");pt("ending-remember").disabled=!t,pt("ending-choice-hint").textContent=t?"\u4F60\u7EC8\u4E8E\u8BB0\u5F97\u81EA\u5DF1\u7684\u5F1F\u5F1F\u3002\u95E8\u5916\u7684\u5929\u8FD8\u6CA1\u6709\u4EAE\u3002":"\u4F60\u8FD8\u4E0D\u77E5\u9053\u5B8C\u6574\u7684\u771F\u76F8\u3002203 \u653E\u6620\u5BA4\u91CC\u6709\u4E00\u5C01\u672A\u5BC4\u51FA\u7684\u8BA4\u9886\u4E66\u3002",pt("ending-return").onclick=()=>this.close(),pt("ending-return").focus()}};var Ao=class{constructor(t){this.game=t,this.acousticTimer=0,this.areaTime=0,this.lastArea="",this.cooldown=0,this.look=new L,this.source=new L}once(t,e){let i=this.game.campaign;i.events.has(t)||(i.events.add(t),e(),this.game._refreshCampaign(),this.cooldown=10)}update(t){let e=this.game,i=e.playerPos,s=hs(i);this.cooldown=Math.max(0,this.cooldown-t),s!==this.lastArea&&(this.lastArea=s,this.areaTime=0),this.areaTime+=t,this.acousticTimer-=t,this.acousticTimer<=0&&(this.acousticTimer=.12,e.camera.getWorldDirection(this.look),e.audio.updateEnvironment(e.camera.position,this.look,r=>{let o=e.level.colliders.filter(a=>!(r.x>=a.x0&&r.x<=a.x1&&r.y>=a.y0&&r.y<=a.y1&&r.z>=a.z0&&r.z<=a.z1));return Qi(e.camera.position,this.source.set(r.x,r.y,r.z),o,e.level.doors)}));for(let r of e.level.campaign.dynamics)r.kind==="print"&&(r.mesh.rotation.y=Math.sin(e.campaign.elapsed*.7+r.phase)*.035);this.areaTime<1.2||this.cooldown>0||e.monster.state==="chase"||(s==="\u897F\u7FFC\u5C01\u95ED\u8D70\u5ECA"&&e.campaign.flags.memory?this.once("west-arrival",()=>{e.audio.cameraShutter(-.5),e._sub("\u8FD9\u6761\u8D70\u5ECA\u2026\u2026\u539F\u6765\u4E00\u76F4\u5728\u8FD9\u91CC\u3002\u7EA2\u706F\u8FD8\u4EAE\u7740\u3002","",5),e._setFear(Math.max(.4,e.fear)),e.storyEvents.push({delay:6,action:()=>{e.audio.knock(3),e._sub("\u6709\u4EBA\u5728\u6697\u623F\u91CC\uFF0C\u7B49\u7167\u7247\u5E72\u900F\u3002","",4)}})}):s==="\u7EA2\u706F\u6697\u623F"&&!e.campaign.flags.photo?this.once("darkroom-arrival",()=>{e.audio.breath(.75,3),e._sub("\u7A7A\u6C14\u91CC\u6709\u836F\u6C34\u7684\u5473\u9053\u3002\u56DB\u53EA\u6258\u76D8\uFF0C\u6700\u540E\u4E00\u53EA\u76DB\u7740\u6E05\u6C34\u3002","",5),e.storyEvents.push({delay:7,action:()=>{hs(e.playerPos)==="\u7EA2\u706F\u6697\u623F"&&(e.audio.cameraShutter(.7),e._sub("\u8EAB\u540E\u54CD\u4E86\u4E00\u58F0\u5FEB\u95E8\u3002\u8FD9\u91CC\u6CA1\u6709\u7B2C\u4E8C\u53F0\u76F8\u673A\u3002","",4),e._setFear(Math.max(.55,e.fear)))}})}):s==="\u4F4F\u6237\u7EAA\u5FF5\u5BA4"?this.once("memorial-arrival",()=>{e.audio.duck(),e._setFear(.2),e._sub("\u56DB\u628A\u6905\u5B50\u3002\u56DB\u4E2A\u4EBA\u3002\u4E3A\u4EC0\u4E48\u540D\u7C3F\u91CC\u53EA\u5269\u4E0B\u4E09\u884C\uFF1F","",5)}):s==="\u5C4B\u9876\u667E\u6652\u573A"&&e.campaign.flags.photo?this.once("roof-recalled",()=>{e.audio.lullaby(),e._sub("\u5C31\u662F\u8FD9\u91CC\u3002\u6BCD\u4EB2\u6536\u7740\u5E8A\u5355\uFF0C\u5F1F\u5F1F\u7275\u7740\u4F60\u7684\u624B\u3002","",5),e._setFear(.12)}):s==="\u5730\u4E0B\u914D\u7535\u95F4"&&e.campaign.flags.photo&&!e.campaign.flags.released&&this.once("basement-return",()=>{e.audio.knock(3),e._sub("\u300C\u54E5\u54E5\uFF0C\u8FD9\u4E00\u6B21\uFF0C\u771F\u7684\u628A\u95E8\u6253\u5F00\u3002\u300D","",5),e._setFear(.6)}))}};var Sn=1280,Xs=720,ds=1.55,qs=1.75,Ti=.3,wt=n=>document.getElementById(n),I1=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,D1=`
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
`;function iu(n,t){return typeof window.__forcedLandscape=="function"&&window.__forcedLandscape()?[t,-n]:[n,t]}var El=class{constructor(){this.audio=new yo,this.state="title",this.notes=new Set,this.campaign=new Vs,this.storyEvents=[],this.hiding=!1,this.spareBatteries=0,this.saveNotice=0,this.fear=0,this.time=0,this.scareCount=0,this.startTime=0,this.noteOpen=!1,this.blackout=!1,this.battery=100,this.batteryHudT=0,this._flashMul=1,this.finale=!1,this.phoneRinging=!1,this.phoneArmed=!1,this.phoneTimer=null,this.eventTimer=dt(20,30),this.keys={},this.bobPhase=0,this.lastBobSin=0,this.bob=0,this.eyeY=0,this.vy=0,this.grounded=!0,this.flashOn=!0,this.shake=0,this.scaredTimer=0,this.fadeLevel=0,this.subtitleTimer=null,this.introStep=0,this.monster=null,this.ghost=null,this.initOK=!1;try{this._initRenderer(),this._initScene(),this._initPost(),this._initLevel(),this._initEntities(),this._initPlayer(),this._initDust(),this._initEvents(),this._initTouch(),this.investigation=new To(this),this.atmosphere=new Ao(this),this.initOK=!0}catch(t){console.error(t),wt("error").classList.remove("hidden"),wt("title").classList.add("hidden");return}this.nopost=new URLSearchParams(location.search).has("nopost"),this._loop=this._loop.bind(this),requestAnimationFrame(this._loop)}_initRenderer(){this.canvas=wt("game"),this.renderer=new Cs({canvas:this.canvas,antialias:!0,powerPreference:"high-performance"}),this.renderer.setSize(Sn,Xs,!1),this.renderer.setPixelRatio(1),this.renderer.shadowMap.enabled=!1,this.renderer.toneMapping=sl,this.renderer.toneMappingExposure=1.38,this.scene=new Xr,this.scene.background=new qt(263690),this.scene.fog=new Wr(659985,.043),this.camera=new Oe(75,Sn/Xs,.05,250),this.camera.rotation.order="YXZ",this.scene.add(this.camera),fl(Sn,Xs),window.addEventListener("resize",()=>this._fitCanvas()),this._fitCanvas(),this.resScale=1,this.resCooldown=0,this.fpsAcc=0,this.fpsN=0}_applyResolution(){let t=Math.round((this.renderW||Sn)*this.resScale),e=Math.round((this.renderH||Xs)*this.resScale);this.renderer.setSize(t,e,!1),this.composer&&this.composer.setSize(t,e),fl(t,e)}_autoResolution(t){if(this.fpsAcc+=t,this.fpsN++,this.resCooldown>0){this.resCooldown-=t;return}if(this.fpsAcc<2||this.fpsN<60)return;let e=this.fpsN/this.fpsAcc;this.fpsAcc=0,this.fpsN=0;let i=[1,.8,.7,.6],s=i.indexOf(this.resScale);s<0&&(s=0),e<38&&s<i.length-1?(this.resScale=i[s+1],this.resCooldown=10,this._applyResolution()):e>57&&s>0&&(this.resScale=i[s-1],this.resCooldown=10,this._applyResolution())}_fitCanvas(){let t=typeof window.__forcedLandscape=="function"&&window.__forcedLandscape(),e=t?window.innerHeight:window.innerWidth,i=t?window.innerWidth:window.innerHeight;this.canvas.style.width=e+"px",this.canvas.style.height=i+"px",this.camera.aspect=e/i,this.camera.updateProjectionMatrix(),this.renderW=Sn,this.renderH=Math.round(Sn*i/e),this.renderer.setSize(this.renderW*(this.resScale||1),this.renderH*(this.resScale||1),!1),this.composer&&this._applyResolution()}_initScene(){this.hemi=new so(2766916,657157,1.26),this.hemiBase=1.26,this.scene.add(this.hemi);let t=new oo(7508899,.24);t.position.set(-14,30,70),this.scene.add(t),this.skyMaterial=new Ke({side:Xe,depthWrite:!1,uniforms:{uTime:{value:0}},vertexShader:`varying vec3 vSky; void main() {
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
        }`});let e=new $(new Be(150,24,16),this.skyMaterial);e.position.set(0,0,44),this.scene.add(e),this.lightning={next:dt(25,60),t:0,dur:0,dist:.5}}_initPost(){this.composer=new go(this.renderer),this.composer.setSize(this.renderW,this.renderH),this.composer.setPixelRatio(1),this.composer.addPass(new _o(this.scene,this.camera)),this.grade=new cs({uniforms:{tDiffuse:{value:null},uTime:{value:0},uFear:{value:0},uDistort:{value:0},uGlow:{value:.35},uExposure:{value:this.renderer.toneMappingExposure}},vertexShader:I1,fragmentShader:D1}),this.composer.addPass(this.grade)}_initLevel(){this.level=new bo(this.scene,{onLocked:t=>{this._sub(t.lockedMsg,""),this.audio.woodenCreak()},onDoorToggle:(t,e)=>{e?this.audio.doorOpen():this.audio.doorClose()},onDeadDoor:()=>{this._sub("\u8FD9\u91CC\u2026\u2026\u662F\u5899\uFF1F","\u3053\u3053\u306F\u2026\u58C1\uFF1F"),this.audio.woodenCreak(),this.level.props.eyesWall.visible=!0,this._setFear(this.fear+.15)},onExitOpen:()=>{this._sub("\u591C\u98CE\u6D8C\u4E86\u8FDB\u6765\u3002","\u5916\u306E\u7A7A\u6C17\u304C\u3001\u6D41\u308C\u8FBC\u3080\u3002")},onNote:t=>this._readNote(t),onDocument:t=>this._readNote(t),onPuzzle:t=>this.investigation.openPuzzle(t),onHide:t=>this._toggleHide(t),onItem:(t,e,i)=>{if(this.campaign.collectItem(t)){e.visible=!1,i.disabled=!0,this.audio.paperRustle(),this._refreshCampaign();let s={fuse:"\u627E\u5230\u5907\u7528\u7194\u65AD\u5668\u3002\u7EF4\u4FEE\u95E8\u5728\u8D70\u5ECA\u53F3\u4FA7\u3002",tape:"\u4E03\u6708\u5341\u56DB\u65E5\u7684\u5F55\u97F3\u5E26\u3002\u53BB 203 \u653E\u6620\u5BA4\u542C\u542C\u3002",valveHandle:"\u53D6\u56DE\u6392\u6C34\u9600\u624B\u8F6E\u3002\u53EF\u4EE5\u56DE\u5730\u4E0B\u88C5\u56DE\u5B83\u4E86\u3002"};this._sub(s[t]||"\u7269\u54C1\u5DF2\u653E\u5165\u968F\u8EAB\u7269\u54C1\u680F\u3002","",4)}},onPhone:()=>this._answerPhone(),onTV:()=>this._toggleTV(),onBell:()=>this._ringBell(),onDoll:()=>this._lookDoll(),onBattery:t=>this._pickupBattery(t),onLamp:()=>this._toggleLamp(),onMirror:()=>this._mirrorScare(),onSwitch:t=>this._toggleSwitch(t),onDrip:()=>this.audio.drip(),onWasher:()=>{this.audio.washer(-.6),this.shake=Math.max(this.shake,.1),this._sub("\u6D17\u8863\u673A\u52A8\u4E86\u534A\u5708\uFF0C\u53C8\u505C\u4E86\u3002","\u6D17\u6FEF\u6A5F\u304C\u534A\u5468\u56DE\u3063\u3066\u3001\u6B62\u307E\u3063\u305F\u3002",3),this._setFear(this.fear+.05)},zone_kitchen:()=>this._zoneKitchen(),zone_living:()=>this._zoneLiving(),zone_bedroom:()=>this._zoneBedroom(),zone_bathroom:()=>this._zoneBathroom(),zone_passage:()=>this._zonePassage(),zone_altar:()=>this._zoneAltar(),zone_child:()=>this._zoneChild(),zone_upper:()=>this._zoneUpper(),zone_corridorMid:()=>this._zoneCorridorMid(),zone_stairsEast:()=>this._zoneStairs(),zone_exitVoid:()=>this._zoneExitVoid()}),this.colliders=this.level.colliders,this._losBoxes=this.level.colliders.map(t=>new si(new L(t.x0,t.y0,t.z0),new L(t.x1,t.y1,t.z1)))}_initEntities(){this.monster=new Mo(this.scene,this.level.tex),this.ghost=new Eo(this.scene)}_initPlayer(){this.controls=new fo(this.camera,document.body),document.removeEventListener("pointerlockerror",this.controls._onPointerlockError);let t=.014;try{let l=parseFloat(localStorage.getItem("echo_sens"));l>0&&(t=l)}catch(l){}this.sens=Qt(t,.004,.04),this.controls.pointerSpeed=this.sens/.002,this.controls.addEventListener("lock",()=>this._onLock()),this.controls.addEventListener("unlock",()=>this._onUnlock()),this.playerPos=new L().copy(this.level.playerStart),this.char=Bs(this.playerPos.x,this.playerPos.y,this.playerPos.z,Ti,qs),this.flash=new ro(13623551,8,22,.4,.85,1.5),this.flash.position.set(.1,ds-.06,this.playerPos.z),this.flash.castShadow=!1,this.flash.shadow.mapSize.set(512,512),this.flash.shadow.bias=4e-4,this.flash.shadow.normalBias=.02,this.flash.shadow.camera.near=.1,this.flash.shadow.camera.far=30,this.flashTarget=new Ee,this.flashTarget.position.set(0,0,-12),this.scene.add(this.flashTarget),this.flash.target=this.flashTarget,this.scene.add(this.flash),this._tmpDir=new L;let e=new mn(.6,6.5,18,1,!0);e.translate(0,3.25,0),e.rotateX(Math.PI/2),this.coneMat=new Ke({transparent:!0,depthWrite:!1,blending:As,side:oe,uniforms:{uTime:{value:0},uFade:{value:1},uOpacity:{value:.05}},vertexShader:`
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
      `}),this.cone=new $(e,this.coneMat),this.cone.position.set(.04,-.09,.01),this.camera.add(this.cone);let i=new Vt,s=new $(new Tt(.035,.03,.24,12),new Ie({color:2568234,roughness:.7}));s.rotation.x=Math.PI/2,i.add(s);let r=new $(new Tt(.058,.038,.085,12),new Ie({color:7042151,roughness:.65,metalness:.12}));r.rotation.x=Math.PI/2,r.position.z=-.15,i.add(r);let o=new $(new Bi(.046,12),new Je({color:9017735}));o.position.z=-.195,o.rotation.y=Math.PI,i.add(o);let a=new $(new jt(.015,.012,.035),new Ie({color:9673609,roughness:.9}));a.position.set(0,.036,-.02),i.add(a),i.position.set(.31,-.27,-.48),i.rotation.x=-.15,this.camera.add(i),this.torchModel=i,window.addEventListener("keydown",l=>{this.keys[l.code]=!0,this._onKey(l)}),window.addEventListener("keyup",l=>{this.keys[l.code]=!1}),this.dragging=!1,this._dragX=0,this._dragY=0,this.canvas.addEventListener("mousedown",l=>{document.pointerLockElement||this.state!=="playing"||this.noteOpen||this.controls.pointerSpeed!==0&&(this.dragging=!0,this._dragX=l.clientX,this._dragY=l.clientY)}),window.addEventListener("mousemove",l=>{if(!this.dragging||document.pointerLockElement)return;if(this.state!=="playing"||this.noteOpen){this.dragging=!1;return}if(this.controls.pointerSpeed===0)return;let c=l.clientX-this._dragX,u=l.clientY-this._dragY;this._dragX=l.clientX,this._dragY=l.clientY;let d=this.sens,h=this.camera.rotation;h.order="YXZ",h.y-=c*d,h.x=Qt(h.x-u*d,-1.52,1.52),h.z=0}),window.addEventListener("mouseup",()=>{this.dragging=!1}),document.addEventListener("pointerlockerror",()=>this._lockHint()),this.camera.position.set(this.playerPos.x,ds,this.playerPos.z),this.camera.rotation.set(0,Math.PI,0),this.canvas.addEventListener("click",()=>{(this.state==="playing"||this.state==="scared")&&!this.noteOpen&&!document.pointerLockElement&&this._tryLock()}),wt("end-again").addEventListener("click",()=>location.reload()),wt("note").addEventListener("click",l=>{(l.target===wt("note")||l.target===wt("note-close"))&&this._closeNote()})}_initDust(){let e=new we,i=new Float32Array(320*3);this.dustPos=i;for(let r=0;r<320;r++)i[r*3]=dt(-11,11),i[r*3+1]=dt(0,4),i[r*3+2]=dt(-11,11);e.setAttribute("position",new Ce(i,3));let s=new Ls({color:10336460,size:.02,sizeAttenuation:!0,transparent:!0,opacity:.18,depthWrite:!1,blending:As});this.dust=new Jr(e,s),this.scene.add(this.dust)}_initEvents(){let t=wt("scare-canvas");t.width=Sn,t.height=Xs;let e=t.getContext("2d");e.fillStyle="#000",e.fillRect(0,0,t.width,t.height);let i=s=>Math.random()*s;e.fillStyle="#b8b2a4",e.beginPath(),e.ellipse(320,190,150+i(20),200+i(30),.06,0,7),e.fill(),e.fillStyle="#8f897c",e.beginPath(),e.ellipse(320,330,110,70,.1,0,7),e.fill(),e.fillStyle="#000",e.beginPath(),e.ellipse(250,140,38,52,.15,0,7),e.fill(),e.beginPath(),e.ellipse(390,140,38,52,-.15,0,7),e.fill(),e.fillStyle="#3a3a38",e.beginPath(),e.arc(258,150,7,0,7),e.fill(),e.beginPath(),e.arc(382,150,7,0,7),e.fill(),e.fillStyle="#000",e.beginPath(),e.ellipse(320,300,55,85,0,0,7),e.fill(),e.fillStyle="#2c1210",e.beginPath(),e.ellipse(320,270,40,30,0,0,7),e.fill(),e.strokeStyle="rgba(60,50,40,0.5)";for(let s=0;s<26;s++)e.beginPath(),e.moveTo(200+i(240),40+i(80)),e.lineTo(200+i(240),240+i(120)),e.stroke();e.strokeStyle="rgba(110,10,8,0.8)",e.lineWidth=6;for(let s of[250,390])e.beginPath(),e.moveTo(s,190),e.lineTo(s-20,260),e.stroke()}_initTouch(){let t=new URLSearchParams(location.search).has("touch");if(this.touchMode=t||"ontouchstart"in window||(navigator.maxTouchPoints|0)>0||window.matchMedia&&matchMedia("(pointer: coarse)").matches,!this.touchMode)return;document.body.classList.add("touch"),this.touchMove={x:0,y:0},this.touchRun=!1,this._joyId=null,this._lookId=null,this._lookLX=0,this._lookLY=0;let e=document.getElementById("touch-help");e&&(e.style.display="inline");let i=wt("touch-ui"),s=wt("joy-knob"),r=wt("joy-zone"),o=wt("btn-interact"),a=42,l=()=>{let p=r.getBoundingClientRect();return{x:p.left+p.width/2,y:p.top+p.height/2}},c=p=>{let m=l(),y=p.clientX-m.x,_=p.clientY-m.y;[y,_]=iu(y,_);let v=Math.hypot(y,_);v>a&&(y*=a/v,_*=a/v),this.touchMove.x=y/a,this.touchMove.y=_/a,s.style.transform=`translate(${y}px, ${_}px)`},u=()=>{this._joyId=null,this.touchMove.x=0,this.touchMove.y=0,s.style.transform="translate(0px, 0px)"};r.addEventListener("touchstart",p=>{if(p.preventDefault(),this._joyId!==null)return;let m=p.changedTouches[0];this._joyId=m.identifier,c(m)},{passive:!1}),r.addEventListener("touchmove",p=>{p.preventDefault();for(let m of p.changedTouches)m.identifier===this._joyId&&c(m)},{passive:!1});for(let p of["touchend","touchcancel"])r.addEventListener(p,m=>{for(let y of m.changedTouches)y.identifier===this._joyId&&u()},{passive:!1});let d=()=>this.state==="playing"&&!this.noteOpen&&wt("pause").classList.contains("hidden");this.canvas.addEventListener("touchstart",p=>{if(this._lookId!==null)return;let m=p.changedTouches[0];this._lookId=m.identifier,this._lookLX=m.clientX,this._lookLY=m.clientY},{passive:!0}),this.canvas.addEventListener("touchmove",p=>{if(d()){for(let m of p.changedTouches){if(m.identifier!==this._lookId)continue;let y=m.clientX-this._lookLX,_=m.clientY-this._lookLY;this._lookLX=m.clientX,this._lookLY=m.clientY;let[v,S]=iu(y,_),b=this.camera.rotation;b.order="YXZ",b.y-=v*this.sens*.85,b.x=Qt(b.x-S*this.sens*.85,-1.52,1.52),b.z=0}p.preventDefault()}},{passive:!1});for(let p of["touchend","touchcancel"])this.canvas.addEventListener(p,m=>{for(let y of m.changedTouches)y.identifier===this._lookId&&(this._lookId=null)},{passive:!1});let h=(p,m)=>{p.addEventListener("touchend",y=>{y.preventDefault(),m()},{passive:!1}),p.addEventListener("touchstart",y=>y.preventDefault(),{passive:!1})};h(o,()=>{if(this.noteOpen){this._closeNote();return}this.state==="playing"&&this._interact()}),h(wt("btn-flash"),()=>{this.state==="playing"&&this._toggleFlash()});let f=wt("btn-run");f.addEventListener("touchstart",p=>{p.preventDefault(),this.touchRun=!0,f.classList.add("on")},{passive:!1});for(let p of["touchend","touchcancel"])f.addEventListener(p,m=>{m.preventDefault(),this.touchRun=!1,f.classList.remove("on")},{passive:!1});h(wt("btn-pause"),()=>{this.state==="playing"&&!this.noteOpen&&this.investigation.openSettings()});let g=wt("rotate-hint"),x=()=>g.classList.toggle("hidden",window.innerWidth>=window.innerHeight||window.__forcedLandscape&&window.__forcedLandscape());x(),window.addEventListener("resize",x),wt("btn-flash").classList.toggle("on",this.flashOn),this._touchUI=i}_sub(t,e="",i=3.4){let s=wt("subtitle");s.querySelector(".cn").textContent=t,s.querySelector(".ja").textContent="",s.classList.add("on"),clearTimeout(this.subtitleTimer),this.subtitleTimer=setTimeout(()=>s.classList.remove("on"),i*1e3)}_setObjective(t){wt("objective").innerHTML=`<div>${t}</div>`}_prompt(t){t?(wt("prompt-text").textContent=t,wt("prompt").classList.remove("hidden")):wt("prompt").classList.add("hidden")}_setFear(t){this.fear=Qt(t,0,1),this.audio.setFear(this.fear),wt("vignette").classList.toggle("fear",this.fear>.55)}_flashRed(){let t=wt("flash");t.style.opacity="1",setTimeout(()=>{t.style.opacity="0"},90)}_start(t=!1){this.state!=="title"||!this.initOK||(this.campaign=new Vs(t?this.investigation.saved:null),this.notes=new Set(this.campaign.documents),Ml(this.level,this.campaign),this.audio.ensure(),this.audio.setPaused(!1),this.state="playing",this.startTime=performance.now(),wt("title").classList.add("hidden"),wt("hud").classList.remove("hidden"),this._touchUI&&this._touchUI.classList.remove("hidden"),this._wakeAtCheckpoint(),this._tryLock(),this._refreshCampaign(!1),this._showChapter(),t?this._sub("\u96E8\u8FD8\u5728\u4E0B\u3002\u4F60\u8BB0\u5F97\u81EA\u5DF1\u662F\u6765\u505A\u4EC0\u4E48\u7684\u3002","",4):(this._sub("\u62C6\u9664\u524D\u4E00\u591C\u3002\u90A3\u5C01\u4FE1\u628A\u4F60\u5E26\u56DE\u4E86\u8FD9\u91CC\u3002","",4.5),this.storyEvents.push({delay:5,action:()=>this._sub("\u5148\u770B\u770B\u5927\u5385\u5DE6\u4FA7\u503C\u73ED\u53F0\u4E0A\u7684\u4FE1\u3002\u6309 E \u8C03\u67E5\u3002","",5)})),this.campaign.flags.released&&(this.finale=!0,this.storyEvents.push({delay:6,action:()=>this._spawnHunt()})))}_refreshCampaign(t=!0){if(Ml(this.level,this.campaign),this._setObjective(this.campaign.objective),wt("chapter-label").textContent=us[this.campaign.chapter].title,wt("evidence-count").textContent=this.campaign.documents.size+" \u4EFD\u8BB0\u5F55",t&&!this.campaign.flags.ended)try{localStorage.setItem(Ws,JSON.stringify(this.campaign.snapshot())),wt("save-status").textContent="\u8C03\u67E5\u8FDB\u5EA6\u5DF2\u4FDD\u5B58",this.saveNotice=3}catch(e){wt("save-status").textContent="\u6D4F\u89C8\u5668\u65E0\u6CD5\u4FDD\u5B58\u8FDB\u5EA6",this.saveNotice=5}}_showChapter(){let t=us[this.campaign.chapter];wt("chapter-title").textContent=t.title,wt("chapter-subtitle").textContent=t.subtitle,wt("chapter-card").classList.remove("hidden"),this.chapterTimer=4}_campaignAdvanced(t){this._refreshCampaign(),["power","cabinet","music","develop"].includes(t)&&this._showChapter(),t==="power"?(this.battery=Math.max(this.battery,80),this.audio.buzz(),this.shake=.12,this.storyEvents.push({delay:4,action:()=>{this.audio.knock(3),this._sub("\u697C\u4E0A\u7684\u78C1\u9501\u677E\u5F00\u4E86\u3002\u63A5\u7740\uFF0C\u662F\u4E09\u4E0B\u6572\u95E8\u58F0\u3002","",4)}})):t==="tape"?(this.audio.whisper(-.6,2.5),this.audio.musicBox(),this._setFear(.5)):t==="music"?(this.audio.lullaby(),this._setFear(.6),this.storyEvents.push({delay:2,action:()=>{this.ghost.appearAt(3.2,0,10.8,Math.PI),this._sub("\u300C\u4F60\u7EC8\u4E8E\u8BB0\u8D77\u6765\u4E86\u3002\u300D","",4)}})):t==="develop"?(this.audio.cameraShutter(),this.audio.lullaby(),this._setFear(.25),this.storyEvents.push({delay:4,action:()=>{this._sub("\u300C\u82CD\u592A\u3002\u300D\u4F60\u5FF5\u51FA\u7167\u7247\u80CC\u9762\u7684\u540D\u5B57\u3002\u5730\u4E0B\u7684\u94C1\u94FE\u677E\u4E86\u3002","",5),this.audio.hammer(-.3)}})):t==="valves"&&this._startFinale()}_wakeAtCheckpoint(){let t=this.campaign.checkpoint;this.playerPos.set(t.x,t.y,t.z),this.char=Bs(t.x,t.y,t.z,Ti,qs),this.camera.position.set(t.x,t.y+ds,t.z),this.camera.rotation.set(0,Math.PI,0),this.eyeY=t.y,this.vy=0,this.grounded=!0,this.hiding=!1,this.hideTimer=0,wt("hide-state").classList.add("hidden"),this.monster.despawn(),this.ghost.hide(),this.audio.heartbeat(!1),this._hbOn=!1,this.battery=Math.max(45,this.battery),this.flashOn=!0,this._setFear(.15),this.shake=0,this.storyEvents=this.storyEvents.filter(e=>!e.hunt),this.finale&&this.storyEvents.push({delay:7,hunt:!0,action:()=>this._spawnHunt()})}_spawnHunt(){if(this.state!=="playing")return;let e=this.level.monsterNodes.filter(i=>Math.abs(i.y-this.playerPos.y)<.5&&Math.hypot(i.x-this.playerPos.x,i.z-this.playerPos.z)>8&&Math.hypot(i.x-this.playerPos.x,i.z-this.playerPos.z)<20).at(-1);e&&(this.monster.spawn(new L(e.x,e.y,e.z),"chase"),this.onChaseStart())}_toggleHide(t){if(this.hiding){this.hiding=!1,this.flashOn=this.battery>0,wt("hide-state").classList.add("hidden"),this._sub("\u4F60\u63A8\u5F00\u8863\u67DC\u7684\u95E8\u3002","",2);return}let e=this.monster.pos.distanceTo(this.playerPos);if(["chase","stalk"].includes(this.monster.state)&&e<5&&!Qi(this.camera.position,this.monster.pos.clone().add(new L(0,1.3,0)),this.level.colliders,this.level.doors)){this._sub("\u5B83\u770B\u89C1\u4E86\u4F60\u3002\u5148\u5173\u4E0A\u95E8\uFF0C\u6216\u8005\u62C9\u5F00\u8DDD\u79BB\u3002","",3);return}this.hiding=!0,this.hideTimer=0,this.hideMesh=t,this.flashOn=!1,this.keys={},this.audio.doorClose(),wt("hide-state").classList.remove("hidden"),this._sub("\u5C4F\u4F4F\u547C\u5438\u3002\u6309 E \u79BB\u5F00\u8863\u67DC\u3002","",4)}setSensitivity(t){this.sens=Qt(t,.004,.04);try{localStorage.setItem("echo_sens",String(this.sens))}catch(e){}this.controls.pointerSpeed!==0&&(this.controls.pointerSpeed=this.sens/.002)}_tryLock(){var t,e;if(this.state!=="ending"&&!this.noteOpen){if(this.touchMode){wt("pause").classList.add("hidden");return}try{let i=(e=(t=document.body).requestPointerLock)==null?void 0:e.call(t);i&&typeof i.catch=="function"&&i.catch(()=>this._lockHint())}catch(i){this._lockHint()}}}_lockHint(){this.lockHintShown||this.state!=="playing"||(this.lockHintShown=!0,this._sub("\u82E5\u89C6\u89D2\u65E0\u6CD5\u8F6C\u52A8\uFF1A\u6309\u4F4F\u5E76\u62D6\u52A8\u9F20\u6807\u6216\u89E6\u63A7\u677F\u3002","\u8996\u70B9\u304C\u52D5\u304B\u306A\u3044\u5834\u5408\uFF1A\u30DE\u30A6\u30B9\u304B\u30C8\u30E9\u30C3\u30AF\u30D1\u30C3\u30C9\u3092\u30C9\u30E9\u30C3\u30B0\u3002",5.5))}_onLock(){if(this.noteOpen||!wt("pause").classList.contains("hidden")){this._skipUnlockPause=!0,this.controls.unlock();return}this.state==="playing"&&(wt("pause").classList.add("hidden"),this.audio.setPaused(!1))}_onUnlock(){var t;if(this._skipUnlockPause){this._skipUnlockPause=!1;return}this.controls.isLocked&&this.state==="playing"&&!this.noteOpen&&((t=this.investigation)==null||t.openSettings())}_onKey(t){var e;if(!t.repeat){if(t.code==="Escape"){if(this.noteOpen){this._closeNote();return}if(this.state!=="playing")return;wt("pause").classList.contains("hidden")?this.investigation.openSettings():this.investigation.closeSettings();return}if(!(["INPUT","TEXTAREA"].includes((e=document.activeElement)==null?void 0:e.tagName)&&document.activeElement.getClientRects().length)&&!(t.code==="Tab"&&this.noteOpen)){if((t.code==="KeyJ"||t.code==="Tab"||t.code==="KeyM")&&this.state==="playing"){t.preventDefault(),this.investigation.panel?this.investigation.close():!this.noteOpen&&wt("pause").classList.contains("hidden")&&this.investigation.openJournal(t.code==="KeyM"?"map":"evidence");return}if(t.code==="KeyE"){if(this.noteOpen){this._closeNote();return}if(this.state!=="playing"||!wt("pause").classList.contains("hidden"))return;if(this.hiding){this._toggleHide();return}this._interact()}t.code==="KeyF"&&this.state==="playing"&&!this.noteOpen&&!this.hiding&&this._toggleFlash(),t.code==="KeyR"&&this.state==="playing"&&!this.noteOpen&&this._wakeAtCheckpoint()}}}_interact(){let t=this._raycastTarget();if(!t)return;let e=t.object.userData.interactable;e&&e.action&&e.action()}_raycastTarget(){var s,r;this._pickDir=this._pickDir||new L,this.camera.getWorldDirection(this._pickDir);let t=this.camera.position,e=null,i=1/0;for(let o of this.level.interactables){if(o.disabled)continue;let a=o.mesh;if(!a.visible)continue;let l=a.getWorldPosition(this._tmpV||(this._tmpV=new L)),c=l.x-t.x,u=l.y-t.y,d=l.z-t.z,h=Math.sqrt(c*c+u*u+d*d);if(h>o.dist||h<.001)continue;let f=(c*this._pickDir.x+u*this._pickDir.y+d*this._pickDir.z)/h;if(f<Math.cos(Math.PI/6)||Qi(t,l,this.level.colliders,this.level.doors,(r=(s=o.door)==null?void 0:s.collider)!=null?r:a.userData.collider))continue;let g=Math.acos(Qt(f,-1,1))*4+h*.4;g<i&&(i=g,e=o)}return e?{object:e.mesh,interactable:e}:null}_readNote(t){if(this.noteOpen||this.state!=="playing")return;let e=wn[String(t)];e&&(this.noteOpen=!0,this.keys={},this.audio.paperRustle(),wt("note-item").textContent=e.item,wt("note-title").textContent=e.title,wt("note-cn").textContent=e.cn,wt("note-ja").textContent=e.location,this.investigation.renderPhoto("note-photo",t),wt("note").classList.remove("hidden"),this._touchUI&&this._touchUI.classList.add("hidden"),this.controls.isLocked&&(this._skipUnlockPause=!0,this.controls.unlock()),this.campaign.collectDocument(t)&&(this.notes.add(String(t)),this._refreshCampaign()),this.audio.setPaused(!0),wt("note-close").focus())}_closeNote(){var t,e;if((t=this.investigation)!=null&&t.panel){this.investigation.close();return}this.noteOpen&&(this.noteOpen=!1,(e=document.activeElement)==null||e.blur(),wt("note").classList.add("hidden"),this.audio.setPaused(!1),this._touchUI&&this._touchUI.classList.remove("hidden"),this.state==="playing"&&this._tryLock())}_toggleTV(){let t=this.level.props.tv;t.on=!t.on,this.audio.setTV(t.on),t.on?this._sub("\u96EA\u82B1\u566A\u70B9\u2026\u2026","\u7802\u5D50\u2026\u3002",2):(this._sub("\u5B89\u9759\u4E0B\u6765\u4E86\u3002","\u9759\u304B\u306B\u306A\u3063\u305F\u3002",2),t.timer=dt(4,9))}_answerPhone(){this.phoneRinging?(this.phoneRinging=!1,this.audio.phoneStop(),this.audio.whisper(.2,2.2),this._sub("\u2026\u2026\u5988\u5988\uFF1F","\u2026\u2026\u304A\u304B\u3042\u3055\u3093\uFF1F",3.2),this._setFear(this.fear+.12)):(this.audio._noise({dur:.4,type:"highpass",freq:1200,gain:.05}),this._sub("\u561F\u2014\u2014\u561F\u2014\u2014\u3002","\u30C4\u30FC\u2026\u30C4\u30FC\u2026\u3002",2.4))}_ringBell(){var t;if(this.audio.bell(),this._sub("\u94C3\u58F0\u5728\u9ED1\u6697\u4E2D\u56DE\u8361\u3002","\u9234\u306E\u97F3\u304C\u3001\u95C7\u306B\u97FF\u3044\u305F\u3002",2.8),vn(.6)&&this.monster.state==="dormant"){let e=this.level.ghostSpawns.find(i=>Math.hypot(i.x-this.playerPos.x,i.z-this.playerPos.z)>3);e&&(this.ghost.appearAt(e.x,(t=e.y)!=null?t:0,e.z,e.ry),this.audio.moan(0))}}_lookDoll(){let t=this.level.props.doll;if(t.turned)this._sub("\u2026\u2026\u5B83\u5728\u770B\u3002","\u2026\u2026\u898B\u3066\u3044\u308B\u3002",2.2);else{t.turned=!0;let e=Math.atan2(this.playerPos.x-t.mesh.position.x,this.playerPos.z-t.mesh.position.z);t.targetYaw=e,this.audio.whisper(.3,1.4),this._sub("\u4EBA\u5076\u6B63\u770B\u7740\u4F60\u3002","\u4EBA\u5F62\u304C\u3001\u3053\u3061\u3089\u3092\u898B\u3066\u3044\u308B\u3002",2.8),this._setFear(this.fear+.1)}}_toggleLamp(){let t=this.level.props.lamp;t.on=!t.on,t.light.intensity=t.on?1.8:0,t.shade&&(t.shade.material=t.on?t.shadeOn:t.shadeOff),this.audio.switchClick(),this._sub(t.on?"\u706F\u4EAE\u4E86\u3002":"\u706F\u706D\u4E86\u3002",t.on?"\u706F\u304C\u3064\u3044\u305F\u3002":"\u706F\u304C\u6D88\u3048\u305F\u3002",1.8)}_toggleSwitch(t){t&&(t.on=!t.on,t.fluor&&(t.fluor.userOff=!t.on),t.nub&&(t.nub.position.y=t.baseY+(t.on?.018:-.018)),this.audio.switchClick(),this._sub(t.on?"\u706F\u4EAE\u4E86\u3002":"\u706F\u706D\u4E86\u3002",t.on?"\u706F\u304C\u3064\u3044\u305F\u3002":"\u706F\u304C\u6D88\u3048\u305F\u3002",1.6),!t.on&&vn(.22)&&setTimeout(()=>{this.state==="playing"&&(t.on=!0,t.fluor&&(t.fluor.userOff=!1),t.nub&&(t.nub.position.y=t.baseY+.018),this.audio.buzz(),this._sub("\u2026\u2026\u706F\uFF0C\u81EA\u5DF1\u4EAE\u4E86\u3002","\u2026\u2026\u96FB\u6C17\u304C\u3001\u3072\u3068\u308A\u3067\u306B\u70B9\u3044\u305F\u3002",3),this._setFear(this.fear+.1))},dt(2e3,4500)))}_mirrorScare(){if(this.ghost.group.visible)return;let t=new L;this.camera.getWorldDirection(t),t.y=0,t.normalize();let e=1.7,i=this.playerPos.x-t.x*e,s=this.playerPos.z-t.z*e;for(let o=0;o<6&&this._spotBlocked(i,s,this.playerPos.y);o++)e+=.3,i=this.playerPos.x-t.x*e,s=this.playerPos.z-t.z*e;let r=Math.atan2(this.playerPos.x-i,this.playerPos.z-s);this.ghost.appearAt(i,this.playerPos.y,s,r),this.ghost.life=1.4,this.audio.whisper(-.2,1.6),this.audio.sting(),this._sub("\u955C\u5B50\u91CC\u2026\u2026\u7AD9\u7740\u4EBA\u3002","",3.2),window.__meta&&!this.touchMode&&window.__meta.flashFace(this),this._setFear(this.fear+.18),this.shake=Math.max(this.shake,.4)}_spotBlocked(t,e,i){let s=this._dynColliders();for(let r of s)if(r.x0<t+.35&&r.x1>t-.35&&r.z0<e+.35&&r.z1>e-.35&&r.y1>i+.15&&r.y0<i+1.7)return!0;return!1}_zoneKitchen(){this.audio.clatter(),this.audio.doorOpen();let t=this.level.props.cabinet;t.openedOnce||(t.openedOnce=!0,this._sub("\u6A71\u67DC\u81EA\u5DF1\u6253\u5F00\u4E86\u3002","\u6238\u68DA\u304C\u3001\u3072\u3068\u308A\u3067\u306B\u958B\u3044\u305F\u3002",3.2),this._setFear(this.fear+.08),this.phoneArmed=!0,this.phoneTimer=setTimeout(()=>this._phoneRings(),dt(25,45)*1e3))}_phoneRings(){this.state!=="playing"||this.phoneRinging||(this.phoneRinging=!0,this.audio.phoneRing(),this._sub("\u7535\u8BDD\u5728\u54CD\u3002","\u96FB\u8A71\u304C\u3001\u9CF4\u3063\u3066\u3044\u308B\u3002",3),setTimeout(()=>{this.phoneRinging=!1},9500))}_zoneLiving(){let t=this.level.props.tv;t.on||(t.on=!0,this.audio.setTV(!0),this._sub("\u7535\u89C6\u81EA\u5DF1\u5F00\u4E86\u3002","\u30C6\u30EC\u30D3\u304C\u3001\u3064\u3044\u305F\u3002",3))}_zoneBedroom(){this.audio.whisper(-.3,2),this._sub("\u2026\u2026\u6709\u4EBA\u66FE\u7761\u5728\u8FD9\u91CC\u3002","\u2026\u2026\u3053\u3053\u3067\u3001\u5BDD\u3066\u3044\u305F\u3002",3.2)}_zoneBathroom(){this.audio.whisper(.4,2.2),this.audio.doorSlam(),this._sub("\u2026\u2026\u6211\u60F3\u56DE\u5BB6\u3002","\u2026\u2026\u304B\u3048\u308A\u305F\u3044\u3002",3.2),this._setFear(this.fear+.12)}_zonePassage(){this.audio.woodenCreak(),this._sub("\u58C1\u6A71\u6DF1\u5904\u6709\u4E00\u6761\u8DEF\u2026\u2026","\u62BC\u5165\u308C\u306E\u5965\u306B\u3001\u9053\u304C\u3042\u308B\u2026\u3002",3.4)}_zoneAltar(){this.audio.bell(),this._sub("\u4E3A\u67D0\u4EBA\u8BBE\u7684\u4F5B\u9F9B\u3002","\u8AB0\u304B\u306E\u305F\u3081\u306E\u3001\u4ECF\u58C7\u3002",3)}_zoneChild(){let t=this.level.props.doll;if(!t.turned){t.turned=!0;let e=Math.atan2(this.playerPos.x-t.mesh.position.x,this.playerPos.z-t.mesh.position.z);t.targetYaw=e}this.childLullaby||(this.childLullaby=!0,this.audio.lullaby()),this.audio.whisper(-.5,1.6),this._sub("\u8FD9\u4E2A\u623F\u95F4\uFF0C\u5F88\u51B7\u3002","\u3053\u306E\u90E8\u5C4B\u306F\u3001\u5BD2\u3044\u3002",3),this._setFear(this.fear+.1)}_zoneUpper(){this.audio.moan(0),this._sub("\u697C\u4E0A\uFF0C\u662F\u540C\u4E00\u6761\u8D70\u5ECA\u3002","\u4E0A\u306E\u968E\u306F\u3001\u540C\u3058\u5ECA\u4E0B\u3060\u3063\u305F\u3002",4),this.upperFlicker=3.5}_zoneStairs(){this.audio.woodenCreak()}_zoneExitVoid(){this.campaign.flags.released&&this.state==="playing"&&!this.noteOpen&&this.investigation.chooseEnding()}_zoneCorridorMid(){if(this.finale)return;this._sub("\u2026\u2026\u706F\uFF0C\u4E00\u76CF\u76CF\u7184\u706D\u3002","",4);let t=this.level.fluorescents.filter(i=>i.z>20&&i.z<58&&i.light.position.y<3);t.sort((i,s)=>s.z-i.z),t.forEach((i,s)=>{setTimeout(()=>{i.kill=!0},300+s*180)});let e=300+t.length*180+300;setTimeout(()=>this.audio.duck(),Math.max(600,e-500)),setTimeout(()=>{this.audio.sting();let i=t.find(s=>Math.abs(s.z-53.7)<.2);if(i&&(i.kill=!1,i.boost=2.8),this.monster.state==="dormant"){this.monster.spawn(new L(0,0,42),"stalk"),this.monster.tempLife=3.6,this.monster.group.rotation.y=Math.PI;let s=new Fe(13623530,3.4,16,1.6);s.position.set(0,2.5,45),this.scene.add(s),this.level.registerLight(s),setTimeout(()=>{s.removeFromParent(),this.level.unregisterLight(s)},3700),setTimeout(()=>{this.finale||this.audio.thud()},3300)}this._sub("\u8D70\u5ECA\u5C3D\u5934\u2026\u2026\u7AD9\u7740\u4EC0\u4E48\u3002","",3.4),this._setFear(.55)},e)}_toggleFlash(){if(this.flashOn)this.flashOn=!1;else if(this.battery<=0)if(this.spareBatteries>0)this.spareBatteries--,this.battery=55,this.flashOn=!0;else{this._sub("\u624B\u7535\u7B52\u6CA1\u7535\u4E86\u3002\u5BFB\u627E\u7535\u6C60\uFF0C\u6216\u8FD4\u56DE\u7AE0\u8282\u8282\u70B9\u3002","",2.6);return}else this.flashOn=!0;let t=wt("btn-flash");t&&t.classList.toggle("on",this.flashOn)}_updateBattery(t){var e,i;if(this.flashOn){let s=this.finale?.3:.12;if(this.battery=Math.max(0,this.battery-s*t),this.battery<=0){this.flashOn=!1;let r=wt("btn-flash");r&&r.classList.remove("on"),this._sub("\u624B\u7535\u7B52\u5F7B\u5E95\u6CA1\u7535\u4E86\u3002","",3.2),this._setFear(Math.min(1,this.fear+.12))}}if(this.flashOn&&this.battery<25&&!this.reduceEffects?this._flashMul=Math.random()<.05?dt(.12,.5):((e=this._flashMul)!=null?e:1)+(1-((i=this._flashMul)!=null?i:1))*Math.min(1,t*9):this._flashMul=1,this.batteryHudT-=t,this.batteryHudT<=0){this.batteryHudT=.2;let s=wt("battery");s&&(s.classList.toggle("low",this.battery<25),wt("battery-fill").style.width=this.battery+"%")}}_pickupBattery(t){let e=this.battery;e>=80?this.spareBatteries++:this.battery=Math.min(100,this.battery+55),t.removeFromParent();let i=this.level.interactables;for(let s=i.length-1;s>=0;s--)if(i[s].mesh===t){i.splice(s,1);break}this.audio.switchClick(),this._sub(e>=100?"\u6536\u597D\u4E00\u8282\u5907\u7528\u7535\u6C60\u3002\u7535\u91CF\u7528\u5B8C\u65F6\u6309 F \u66F4\u6362\u3002":"\u6362\u4E0A\u7535\u6C60\uFF0C\u5149\u7A33\u4E86\u4E0B\u6765\u3002","",2.4)}_startFinale(){this.finale||(this.finale=!0,this.audio.duck(),this.audio.sting(),this.lightsOutTimer=3,this._setFear(.8),this._refreshCampaign(),this.storyEvents.push({delay:2,hunt:!0,action:()=>this._spawnHunt()}))}_ending(t){if(this.state==="ending")return;let e=this.campaign.perform("ending",t);if(!e.ok){this._sub(e.message);return}this.investigation.close(),this.state="ending",this.monster.despawn(),this.ghost.hide(),this.controls.unlock(),this._touchUI&&this._touchUI.classList.add("hidden"),wt("pause").classList.add("hidden"),wt("hud").classList.add("hidden"),this.audio.setPaused(!1),this.audio.setFear(0),this.audio.heartbeat(!1),this.audio.ending();let i=eu[t],s=Math.round(this.campaign.elapsed),r=String(Math.floor(s/60)).padStart(2,"0"),o=String(s%60).padStart(2,"0");wt("end-title").textContent=i.title,wt("end-label").textContent=i.label,wt("end-text").textContent=i.text,wt("end-stats").textContent="\u7528\u65F6 "+r+":"+o+" / \u8BB0\u5F55 "+this.campaign.documents.size+" / \u9192\u6765 "+this.scareCount+" \u6B21";try{localStorage.setItem(Ws,JSON.stringify(this.campaign.snapshot()))}catch(a){}wt("fade").style.opacity="1",setTimeout(()=>{wt("end").classList.remove("hidden"),wt("fade").style.opacity="0"},900)}onMonsterAttack(){this.state==="playing"&&(this.state="scared",this.scaredTimer=1.35,this.scareCount++,this.shake=1,this._flashRed(),wt("scare").style.opacity=this.reduceEffects?"0":"1",this.audio.scareBurst(),this.audio.heartbeat(!1),this._setFear(1),wt("vignette").classList.add("fear"),this.controls.pointerSpeed=0)}onMonsterAttackEnd(){this.state==="scared"&&(wt("scare").style.opacity="0",wt("fade").classList.remove("white"),wt("fade").style.opacity="1",setTimeout(()=>{this._wakeAtCheckpoint(),this.controls.pointerSpeed=this.sens/.002,wt("fade").style.opacity="0",wt("vignette").classList.remove("fear"),this.state="playing",this._sub("\u4F60\u5728\u6700\u540E\u4E00\u6B21\u8BB0\u8D77\u771F\u76F8\u7684\u5730\u65B9\u9192\u6765\u3002\u8C03\u67E5\u8FDB\u5EA6\u4FDD\u7559\u3002","",4),this._tryLock()},700))}onChaseStart(){this._setFear(.8),this._sub("\u5FEB\u8DD1\uFF01","\u9003\u3052\u308D\uFF01",2.2),this._hbOn=!0,this.audio.heartbeat(!0,1)}_randomEvent(){var r,o;if(this.state!=="playing"||this.monster.state==="chase"||this.monster.state==="attack")return;let t=Math.random(),e=this.playerPos,i=Math.hypot(e.x,e.z+1.35)>6,s=e.y<1;if(t<.12){this.audio.whisper(dt(-.8,.8),dt(1.4,2.4));{let[a,l]=bn([["\u2026\u2026\u8FC7\u6765","\u2026\u2026\u3053\u3063\u3061"],["\u2026\u2026\u627E\u5230\u4F60\u4E86","\u2026\u2026\u898B\u3064\u3051\u305F"],["\u2026\u2026\u5728\u54EA\u513F","\u2026\u2026\u3069\u3053"],["\u2026\u2026\u4F4F\u624B","\u2026\u2026\u3084\u3081\u3066"]]);this._sub(a,l,2.6)}}else if(t<.2){let a=this.level.ghostSpawns.filter(l=>{let c=Math.hypot(l.x-e.x,l.z-e.z);return c>4.5&&c<17});if(a.length){let l=bn(a);this.ghost.appearAt(l.x,(r=l.y)!=null?r:0,l.z,l.ry),this.audio.moan(dt(-.4,.4)),this._setFear(this.fear+.1)}}else if(t<.28){let a=this.level.doors.filter(l=>!l.locked&&l.type==="swing"&&l.label!=="\u58C1\u6A71"&&Math.hypot(l.hinge.x-e.x,l.hinge.z-e.z)>3);if(a.length){let l=bn(a);l.open?(l.open=!1,l.target=0,this.audio.doorSlam()):this.audio.knock(1)}else this.audio.doorSlam()}else if(t<.32){let a=this.level.doors.filter(l=>!l.locked&&l.type==="swing"&&l.label!=="\u58C1\u6A71"&&Math.hypot(l.hinge.x-e.x,l.hinge.z-e.z)>4);if(a.length){let l=bn(a);l.open||(l.open=!0,l.target=1,this.audio.doorOpen(),this._sub("\u95E8\u2026\u2026\u81EA\u5DF1\u5F00\u4E86\u3002","\u6249\u304C\u2026\u4E00\u4EBA\u3067\u958B\u3044\u305F\u3002",3),this._setFear(this.fear+.05))}else this.audio.woodenCreak()}else if(t<.36)this.audio.duck(),this.lightsOutTimer=2.6;else if(t<.44)s?(this.audio.ceilingSteps(),this._sub("\u697C\u4E0A\u2026\u2026\u6709\u811A\u6B65\u58F0\u3002","\u4E0A\u306E\u968E\u3067\u2026\u8DB3\u97F3\u304C\u3002",3)):(this.audio.knock(2),this._sub("\u5899\u58C1\u7684\u53E6\u4E00\u4FA7\uFF0C\u6709\u4EBA\u5728\u6572\u3002","\u58C1\u306E\u5411\u3053\u3046\u3067\u3001\u8AB0\u304B\u304C\u53E9\u3044\u3066\u3044\u308B\u3002",3));else if(t<.52)this.audio.knock(3),this._sub("\u6709\u4EBA\u5728\u6572\u95E8\u2026\u2026","\u30C9\u30A2\u3092\u3001\u53E9\u304F\u97F3\u304C\u2026",3);else if(t<.58&&i)this.audio.runStep(),setTimeout(()=>this.audio.runStep(),260),setTimeout(()=>this.audio.runStep(),520),this._sub("\u8EAB\u540E\u2026\u2026\uFF1F","\u5F8C\u308D\u306B\u2026\uFF1F",2.4);else if(t<.66)this.audio.cry(dt(-.6,.6)),this._sub("\u2026\u2026\u6709\u5B69\u5B50\u5728\u54ED\u3002","\u2026\u2026\u5B50\u4F9B\u306E\u6CE3\u304D\u58F0\u304C\u3002",3);else if(t<.69)this.audio.childGiggle(dt(-.6,.6)),this._setFear(this.fear+.05);else if(t<.75)this.audio.breath(dt(-.6,.6),dt(2.4,3.6));else if(t<.81){let a=this.level.props.tv;a.on||(a.on=!0,this.audio.setTV(!0))}else if(t<.84)this.audio.radio(),this._sub("\u6536\u97F3\u673A\u2026\u2026\u81EA\u5DF1\u54CD\u4E86\u3002","\u30E9\u30B8\u30AA\u304C\u3001\u52DD\u624B\u306B\u9CF4\u3063\u305F\u3002",3);else if(t<.9&&this.phoneArmed&&!this.phoneRinging)this._phoneRings();else if(t<.96&&this.campaign.flags.power&&this.monster.state==="dormant"&&!this.finale)this.monster.spawn(new L(0,0,55.5),"stalk"),this.monster.tempLife=3,this.audio.moan(0),this._setFear(this.fear+.15);else{let a=Math.random();if(a<.18)this.audio.siren(dt(-.5,.5)),this._sub("\u96E8\u58F0\u6DF1\u5904\uFF0C\u6709\u8B66\u7B1B\u5728\u54CD\u3002","\u96E8\u97F3\u306E\u5965\u3067\u3001\u30B5\u30A4\u30EC\u30F3\u304C\u9CF4\u3063\u3066\u3044\u308B\u3002",3.4);else if(a<.38)this.audio.hammer(dt(-.5,.5)),this._sub("\u5899\u91CC\u7684\u6C34\u7BA1\uFF0C\u549A\u3001\u549A\u5730\u54CD\u3002","\u58C1\u306E\u914D\u7BA1\u304C\u3001\u30C9\u30F3\u3001\u30C9\u30F3\u3068\u9CF4\u308B\u3002",3);else if(a<.52&&e.x<-13.8&&e.z>14.8)this.audio.washer(-.6),this.shake=Math.max(this.shake,.12),this._sub("\u6D17\u8863\u673A\u2026\u2026\u81EA\u5DF1\u5728\u8F6C\u3002","\u6D17\u6FEF\u6A5F\u304C\u2026\u52DD\u624B\u306B\u56DE\u3063\u3066\u3044\u308B\u3002",3.4),this._setFear(this.fear+.06);else{if(this.audio.woodenCreak(),vn(.5)){let l=bn(this.level.ghostSpawns);Math.hypot(l.x-e.x,l.z-e.z)>4.5&&this.ghost.appearAt(l.x,(o=l.y)!=null?o:0,l.z,l.ry)}vn(.4)&&this.audio.scrape()}}if(vn(.18)){let a=this.level.props.silhouette;a.visible=!0,this.audio.moan(0),setTimeout(()=>{a.visible=!1},2600)}}_loop(){var c,u,d;if(requestAnimationFrame(this._loop),!this.initOK)return;let t=performance.now(),e=Math.min(.05,this.lastT?(t-this.lastT)/1e3:.016);this.lastT=t,this.time+=e,this.investigation.update(e);let i=this.state==="playing"&&!this.noteOpen&&wt("pause").classList.contains("hidden");if(i){this.campaign.elapsed+=e;for(let f of this.storyEvents)f.delay-=e;let h=this.storyEvents.filter(f=>f.delay<=0);this.storyEvents=this.storyEvents.filter(f=>f.delay>0);for(let f of h)f.action();this.chapterTimer>0&&(this.chapterTimer-=e)<=0&&wt("chapter-card").classList.add("hidden"),this.saveNotice>0&&(this.saveNotice-=e)<=0&&(wt("save-status").textContent=""),wt("location-label").textContent=hs(this.playerPos)}if(this.state==="title"&&(this.camera.position.set(-22,2.8+ds,37.8),this.camera.rotation.set(-.025,.26+Math.sin(this.time*.055)*.055,0)),this.touchMode&&this._autoResolution(e),i||this.state==="scared"){let h=this.state==="scared";!h&&!this.hiding&&this._updatePlayer(e),this._updateInteractPrompt(),h||(this.atmosphere.update(e),this._updateDirector(e),this._updateBattery(e))}if(this.skyMaterial.uniforms.uTime.value=this.time,this.level.update(e,this.time,this.camera.position,this.camera.getWorldDirection(this._viewDir||(this._viewDir=new L)),this.reduceEffects),this.level.campaign.rain){let h=this.level.campaign.rain.geometry.attributes.position.array;for(let f=0;f<h.length;f+=6)h[f+1]-=e*5,h[f+4]-=e*5,h[f+1]<(f>=540?5.9:2.9)&&(h[f+1]+=9,h[f+4]+=9);this.level.campaign.rain.geometry.attributes.position.needsUpdate=!0}let s=this.level.props.tv;if(s.screen.visible=s.on,s.on?(Zh(this.level.tex.tvStatic),this.level.tvLight.intensity=1.4+Math.sin(this.time*23)*.5+dt(-.2,.2),this.tvFaceTimer=((c=this.tvFaceTimer)!=null?c:dt(30,50))-e,this.tvFaceTimer<=0&&(this.tvFaceTimer=dt(35,60),this.level.props.tvFace.visible=!0,this.audio._noise({dur:.5,type:"bandpass",freq:2200,q:6,gain:.06}),Math.hypot(this.playerPos.x- -6.5,this.playerPos.z-15.25)<9&&(this._sub("\u7535\u89C6\u91CC\u2026\u2026\u6709\u4E00\u5F20\u8138\u3002","\u30C6\u30EC\u30D3\u306E\u4E2D\u306B\u2026\u9854\u304C\u3002",2.6),this._setFear(this.fear+.08)),setTimeout(()=>{this.level.props.tvFace.visible=!1},750))):(this.level.tvLight.intensity=0,s.timer>0&&this.state==="playing"&&(s.timer-=e,s.timer<=0&&(s.on=!0,this.audio.setTV(!0),this.audio._noise({dur:.4,type:"bandpass",freq:1200,q:2,gain:.07}),this._sub("\u7535\u89C6\u53C8\u81EA\u5DF1\u5F00\u4E86\u3002","\u30C6\u30EC\u30D3\u304C\u3001\u307E\u305F\u52DD\u624B\u306B\u70B9\u3044\u305F\u3002",3)))),this.blackout)for(let h of this.level.fluorescents)h.kill=!0;else if(this.lightsOutTimer>0){this.lightsOutTimer-=e;for(let h of this.level.fluorescents)h.kill=!0;if(this.lightsOutTimer<=0)for(let h of this.level.fluorescents)h.kill=!1}if(this.upperFlicker>0){this.upperFlicker-=e;for(let h of this.level.fluorescents)if(h.z>2&&h.z<62&&h.light.position.y>4){let f=Math.sin(this.time*50)>0;h.light.intensity=f?h.base:.05,h.tube&&(h.tube.material=f?this.level.tubeMat:this.level.tubeOffMat)}}let r=this.level.props.cabinet;r.openedOnce&&(r.angle=ti(r.angle,1.35,e*2.2),r.pivot.rotation.y=r.angle);let o=this.level.props.doll;if(o.turned&&o.targetYaw!==void 0){let h=o.targetYaw-o.mesh.rotation.y;if(h=Math.atan2(Math.sin(h),Math.cos(h)),o.mesh.rotation.y+=h*Math.min(1,e*1.1),this.dollTimer=((u=this.dollTimer)!=null?u:dt(14,22))-e,this.dollTimer<=0){this.dollTimer=dt(16,26);let f=this.level.dollSpots||[],g=o.mesh.position,x=f.filter(p=>Math.hypot(p.x-this.playerPos.x,p.z-this.playerPos.z)>4&&(Math.abs(p.x-g.x)>.5||Math.abs(p.z-g.z)>.5));if(x.length){let p=g.x-this.playerPos.x,m=g.z-this.playerPos.z,y=Math.hypot(p,m)||1,_=new L;if(this.camera.getWorldDirection(_),_.x*(p/y)+_.z*(m/y)<.5){let v=bn(x);o.mesh.position.set(v.x,0,v.z),o.mesh.rotation.y=v.ry,o.targetYaw=v.ry,this.audio.musicBox(),Math.hypot(v.x-this.playerPos.x,v.z-this.playerPos.z)<8&&this._sub("\u4EBA\u5076\u2026\u2026\u4E0D\u5728\u539F\u6765\u7684\u4F4D\u7F6E\u4E86\u3002","\u4EBA\u5F62\u304C\u2026\u5143\u306E\u5834\u6240\u306B\u3044\u306A\u3044\u3002",3)}}}}if((i||this.state==="scared")&&this._updateMonster(e),i&&this.ghost.update(e,this.playerPos),i&&(this._setFear(Math.max(.12,this.fear-e*.02)),this.monster.state==="chase"&&this._setFear(Math.min(1,this.fear+e*.12)),this.monster.state==="stalk")){let h=Math.hypot(this.monster.pos.x-this.playerPos.x,this.monster.pos.z-this.playerPos.z);h<14&&this._setFear(Math.min(.8,this.fear+e*(.1*(1-h/14))))}this.shake>0&&(this.shake=Math.max(0,this.shake-e*1.6),this.camera.position.x+=dt(-.03,.03)*this.shake,this.camera.position.y+=dt(-.02,.02)*this.shake);let a=75+this.fear*7+(this.state==="scared"?10:0);Math.abs(this.camera.fov-a)>.1&&(this.camera.fov=ti(this.camera.fov,a,e*4),this.camera.updateProjectionMatrix()),this.grade.uniforms.uTime.value=this.time,this.grade.uniforms.uFear.value=this.reduceEffects?0:this.fear,this.grade.uniforms.uDistort.value=this.reduceEffects?0:this.state==="scared"?Math.min(1,this.scaredTimer):this.shake,this.coneMat.uniforms.uTime.value=this.time,this.torchModel.visible=this.state==="playing"&&!this.hiding,this._updateDust(e),this.audio.setHum(this.level.humLevel(this.camera.position)),i&&this.audio.updateMusic(e,this.fear,this.monster.state==="chase"||this.monster.state==="attack"),this.audio.setWind(Qt(.3+(this.playerPos.y>2.5?.2:0)+(this.playerPos.z<2.2||this.playerPos.z>56?.3:0),0,1)),this.audio.setRain(Qt(.3+(this.playerPos.y>2.5?.25:0)+(this.playerPos.z<2.2||this.playerPos.z>56?.35:0),0,1));let l=this.level.props.furin;l&&this.state==="playing"&&(Math.hypot(this.camera.position.x-l.position.x,this.camera.position.z-l.position.z)<7?(this.furinT=((d=this.furinT)!=null?d:dt(4,9))-e,this.furinT<=0&&(this.furinT=dt(6,16),this.audio.chime(Qt((l.position.x-this.camera.position.x)/7,-1,1)))):this.furinT=dt(3,8)),this._updateLightning(e),this.nopost?this.renderer.render(this.scene,this.camera):this.composer.render(),this._plc=(this._plc||0)+1,this.posLog&&this._plc%30===0&&(document.title=`POS:z=${this.playerPos.z.toFixed(1)},y=${this.playerPos.y.toFixed(2)} flash=${this.flash.intensity.toFixed(1)}`)}_updatePlayer(t){var _,v;let e=this.keys,i=0,s=0,r;if(this.touchMode){i=this.touchMove.x,s=-this.touchMove.y,r=this.touchRun;let S=Math.hypot(i,s);S>1&&(i/=S,s/=S)}else{(e.KeyW||e.ArrowUp)&&(s+=1),(e.KeyS||e.ArrowDown)&&(s-=1),(e.KeyA||e.ArrowLeft)&&(i-=1),(e.KeyD||e.ArrowRight)&&(i+=1),r=e.ShiftLeft||e.ShiftRight;let S=Math.hypot(i,s)||1;i/=S,s/=S}let o=r?3.9:2.7;if(this.tpZ!==void 0){if(!this._tpDone){this._tpDone=!0;let S=(_=this.tpX)!=null?_:0,b=-10,R=1/0,U=this.level.colliders;for(let E of U)E.x0<S+.3&&E.x1>S-.3&&E.z0<this.tpZ+.3&&E.z1>this.tpZ-.3&&E.y1<6&&E.y1>b&&(b=E.y1);b<-5&&(b=0);for(let E of U)E.x0<S+.3&&E.x1>S-.3&&E.z0<this.tpZ+.3&&E.z1>this.tpZ-.3&&E.y0>b+1.5&&E.y0<R&&(R=E.y0);let M;this.tpY!==void 0?M=this.tpY:M=Math.min(b+.45,R===1/0?b+2.2:R-qs-.05),this.playerPos.set(S,M,this.tpZ),this.char.x0=S-Ti,this.char.x1=S+Ti,this.char.z0=this.tpZ-Ti,this.char.z1=this.tpZ+Ti,this.char.y0=M,this.char.y1=M+qs,this.eyeY=M,this.vy=0,this.camera.position.set(S,M+ds,this.tpZ)}i=0,s=0,this.tpYaw!==void 0?this.camera.rotation.y=this.tpYaw*Math.PI/180:this.camera.rotation.y=this.tpFace==="s"?Math.PI+1.57:Math.PI-1.57,this.camera.rotation.x=0}let a=this.camera.rotation.y,l=Math.sin(a),c=Math.cos(a),u=(-l*s+c*i)*o*t,d=(-c*s-l*i)*o*t;this.char.x0=this.playerPos.x-Ti,this.char.x1=this.playerPos.x+Ti,this.char.z0=this.playerPos.z-Ti,this.char.z1=this.playerPos.z+Ti,this.char.y0=this.playerPos.y,this.char.y1=this.playerPos.y+qs;let h=this.playerPos.x,f=this.playerPos.z,g=this._dynColliders();this.vy-=22*t;let x=xo(this.char,u,this.vy*t,d,g,.35);this.grounded=x.grounded,x.grounded&&(this.vy=0),this.playerPos.x=(this.char.x0+this.char.x1)/2,this.playerPos.z=(this.char.z0+this.char.z1)/2,this.playerPos.y=this.char.y0;let p=Math.hypot(this.playerPos.x-h,this.playerPos.z-f)/t;if(this.grounded&&p>.4){this.bobPhase+=p/2.7*t*8.5;let S=Math.sin(this.bobPhase);if(this.lastBobSin>0&&S<=0){let b=this._floorSurface();r?this.audio.runStep(b):this.audio.footstep(b)}this.lastBobSin=S,this.bob=Math.abs(S)*.03*Math.min(1,p/2.7)}else this.bob=ti(this.bob||0,0,t*8),this.lastBobSin=0;this.eyeY=ti(this.eyeY||0,this.playerPos.y,Math.min(1,t*16)),this.camera.position.set(this.playerPos.x,this.eyeY+ds+this.bob,this.playerPos.z),this.camera.rotation.z=Math.sin(this.time*.4)*.0016+this.fear*Math.sin(this.time*1.7)*.005+(r?.012*Math.sin(this.bobPhase):0),this.camera.rotation.order="YXZ",this.camera.getWorldDirection(this._tmpDir),this.flashTarget.position.copy(this.camera.position).addScaledVector(this._tmpDir,12),this._tmpDir2=this._tmpDir2||new L,this.camera.getWorldDirection(this._tmpDir2),this.flash.position.copy(this.camera.position).addScaledVector(this._tmpDir2,.12),this.flash.position.y-=.06;let m=0;if(this.flashOn){let S=this.camera.position,b=2.2;for(let E of this.colliders){if(E.y1<S.y-.8||E.y0>S.y+.8)continue;let z=Qt(S.x,E.x0,E.x1),Y=Qt(S.z,E.z0,E.z1),it=Qt(S.y,E.y0,E.y1),I=Math.hypot(S.x-z,S.y-it,S.z-Y);I<b&&(b=I)}m=6.5*Qt((b-.3)/1.4,.15,1)*((v=this._flashMul)!=null?v:1);let U=this.monster.state==="stalk"||this.monster.state==="chase",M=Math.hypot(this.monster.pos.x-this.playerPos.x,this.monster.pos.z-this.playerPos.z);U&&M<5&&!this.reduceEffects&&(m=m*(.55+.45*Math.sin(this.time*41+M*9)))}this.flash.intensity=m,this.coneMat.uniforms.uFade.value=this.flashOn?1:0;let y=this._trigV||(this._trigV=new L);y.set(this.playerPos.x,this.playerPos.y+.2,this.playerPos.z),this.level.checkTriggers(y)}_dynColliders(){let t=this._dynArr||(this._dynArr=[]);t.length=0;let e=this.level.colliders;for(let s=0;s<e.length;s++)t.push(e[s]);let i=this.level.doors;for(let s=0;s<i.length;s++)i[s].collider&&t.push(i[s].collider);return t}_floorSurface(){let t=this.playerPos;if(t.y<-.8||t.y>4.8||t.z>61.6)return"concrete";if(t.y>2&&t.x<-1){let e=hs(t);return["\u897F\u7FFC\u5C01\u95ED\u8D70\u5ECA","\u7EA2\u706F\u6697\u623F"].includes(e)?"concrete":"wood"}return t.y<1.5&&t.x>7&&t.z>=32&&t.z<46?"concrete":t.y<1.5&&t.x>1.3&&t.x<8.4&&t.z>0&&t.z<8.5?"tatami":t.z<0||t.z>57.5&&t.y<2.7||t.y<1.5&&t.x<-13.8&&t.z>13.8?"concrete":"wood"}_updateInteractPrompt(){if(this.noteOpen||this.hiding){this._prompt(null);return}let t=this._raycastTarget();this._prompt(t?t.interactable.label:null),this.touchMode&&wt("btn-interact").classList.toggle("avail",!!t)}_updateDirector(t){this.eventTimer-=t,this.eventTimer<=0&&(this.eventTimer=dt(21,42),this._randomEvent())}_updateMonster(t){if(this.hiding){this.hideTimer+=t,this.hideTimer>5&&(this.monster.despawn(),this._hbOn&&(this._hbOn=!1,this.audio.heartbeat(!1)));return}let e=this.playerPos,i=this._mDir||(this._mDir=new L);this.camera.getWorldDirection(i),i.y=0,i.normalize();let s=this._mTo||(this._mTo=new L);s.set(this.monster.pos.x-e.x,0,this.monster.pos.z-e.z);let r=s.length(),o=this.flashOn&&r>.01&&r<22&&Math.abs(this.monster.pos.y-e.y)<1&&i.dot(s.normalize())>.94&&!Qi(this.camera.position,this.monster.pos.clone().add(new L(0,1.2,0)),this.level.colliders,this.level.doors),a=this._mPl||(this._mPl=new L);a.set(e.x,e.y,e.z),this.monster.update(t,{player:a,lookDir:i,flashHit:o,time:this.time,colliders:this._dynColliders(),stairs:this.level.stairs,reduceEffects:this.reduceEffects,doors:this.level.doors,nodes:this.level.monsterNodes,audio:this.audio,game:this}),this._hbOn&&this.monster.state!=="chase"&&(this._hbOn=!1,this.audio.heartbeat(!1))}_updateLightning(t){if(this.reduceEffects)return;let e=this.lightning,i=this.level.materials.moonWin;if(e.t>0){e.t-=t,Math.random()<.35&&(this.shake=Math.max(this.shake,.08));let s=1-e.t/e.dur,o=(s<.15||s>.45&&s<.55?1:.25)*(.5+Math.random()*.5);this.hemi.intensity=this.hemiBase+o*1.7;for(let a of this.level.windowLights)a.intensity=.8+o*5;if(i.color.setScalar(1+o*1.5),e.t<=0){this.hemi.intensity=this.hemiBase;for(let a of this.level.windowLights)a.intensity=.8;i.color.setScalar(1)}return}e.next-=t,e.next<=0&&(e.next=dt(45,100),e.dur=dt(.45,.9),e.t=e.dur,e.dist=dt(.3,.95),setTimeout(()=>{(this.state==="playing"||this.state==="scared")&&(this.audio.thunder(e.dist),vn(.35)&&this._sub("\u6253\u96F7\u4E86\u3002","\u96F7\u304C\u3001\u9CF4\u3063\u305F\u3002",2.2))},400+e.dist*3e3))}_updateDust(t){let e=this.dustPos,i=this.camera.position.x,s=this.camera.position.z,r=this.camera.position.y;for(let o=0;o<e.length;o+=3){e[o+1]+=t*dt(.02,.07),e[o+1]>4&&(e[o+1]=0),e[o]+=Math.sin(this.time*.6+o)*t*.08,e[o+2]+=Math.cos(this.time*.5+o)*t*.08,e[o]-i>11?e[o]=i-11:e[o]-i<-11&&(e[o]=i+11),e[o+2]-s>11?e[o+2]=s-11:e[o+2]-s<-11&&(e[o+2]=s+11);let a=e[o]-i,l=e[o+2]-s,c=e[o+1]-r;a*a+c*c+l*l<1.69&&(e[o]=i+dt(-11,11),e[o+1]=dt(.2,3.8),e[o+2]=s+dt(-11,11))}this.dust.geometry.attributes.position.needsUpdate=!0,this.dust.position.set(i,0,s)}};wt("error-retry").addEventListener("click",()=>location.reload());try{window.__game=new El,new URLSearchParams(location.search).has("autostart")&&setTimeout(()=>window.__game._start(),400),new URLSearchParams(location.search).has("pos")&&(window.__game.posLog=!0);let n=new URLSearchParams(location.search);n.has("tp")&&(window.__game.tpZ=parseFloat(n.get("tp"))||0,window.__game.tpFace=n.get("face")==="s"?"s":"n"),n.has("tpx")&&(window.__game.tpX=parseFloat(n.get("tpx"))||0),n.has("tpy")&&(window.__game.tpY=parseFloat(n.get("tpy"))),n.has("yaw")&&(window.__game.tpYaw=parseFloat(n.get("yaw"))),n.has("noflash")&&(window.__game.flashOn=!1)}catch(n){console.error(n)}})();
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
