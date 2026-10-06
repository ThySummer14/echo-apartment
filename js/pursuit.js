// The hunter remembers evidence, not the player's hidden live coordinates.
// Noise is derived from game movement; this never reads a microphone.
export class PursuitMemory {
  constructor() { this.reset(); }
  reset(point=null) { this.target=point?{x:point.x,y:point.y,z:point.z}:null;this.age=0; }
  update(dt,{player,visible,audible}) {
    if(visible||audible||!this.target) { this.target={x:player.x,y:player.y,z:player.z};this.age=0; }
    else this.age+=Math.max(0,dt);
    return this.target;
  }
  get expired(){return this.age>=10;}
}

export function movementAudible(listener,player,radius,blocked) {
  if(!Number.isFinite(radius)||radius<=0||Math.abs(listener.y-player.y)>=1)return false;
  const range=blocked?radius*.35:radius;
  return Math.hypot(listener.x-player.x,listener.z-player.z)<range;
}

// Spawn/relocation points must have a supporting surface and a clear body.
// A pre-authored marker alone is not enough after furniture/layout changes.
export function isSafeSpawn(point,colliders) {
  if(![point.x,point.y,point.z].every(Number.isFinite))return false;
  const supported=colliders.some(c=>point.x>=c.x0&&point.x<=c.x1&&point.z>=c.z0&&point.z<=c.z1&&Math.abs(c.y1-point.y)<.04);
  if(!supported)return false;
  return !colliders.some(c=>c.x0<point.x+.28&&c.x1>point.x-.28&&c.z0<point.z+.28&&c.z1>point.z-.28&&
    c.y1>point.y+.1&&c.y0<point.y+1.9);
}
