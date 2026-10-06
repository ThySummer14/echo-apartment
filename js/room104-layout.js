// Bounded greybox: metres, existing east-wing entrance retained.
export const ROOM104 = Object.freeze({
  bounds: [7, 46, 14, 52],
  legacyBounds: [7, 46, 18.5, 56],
  safeEntry: {x:10.75,y:0,z:47.15},
  bedroom: [10.1,48.8,14,52],
});

// Saves store chapter checkpoints, not a live free-roaming position. Still
// accept legacy/custom checkpoints inside the old unit without losing progress.
export function safeRoom104Checkpoint(point, colliders) {
  if(point.y!==0||point.x<6.7||point.x>18.8||point.z<45.7||point.z>56.3)return point;
  const blocked=p=>colliders.some(c=>c.y1>p.y+.05&&c.y0<p.y+1.75&&
    c.x0<p.x+.3&&c.x1>p.x-.3&&c.z0<p.z+.3&&c.z1>p.z-.3);
  // Use the actual floor, including the shared doorway/threshold. A smaller
  // room rectangle incorrectly rejected valid points on the retained entrance.
  const supported=p=>colliders.some(c=>c.walkable&&Math.abs(c.y1-p.y)<.04&&
    p.x>=c.x0&&p.x<=c.x1&&p.z>=c.z0&&p.z<=c.z1);
  if(supported(point)&&!blocked(point))return point;
  const fallback={...ROOM104.safeEntry};
  if(!supported(fallback)||blocked(fallback))throw new Error('104 checkpoint fallback unsupported or obstructed');
  return fallback;
}
