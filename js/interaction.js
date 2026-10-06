import * as THREE from '../vendor/three.module.js';

// 射线必须指向具体物件。Ray.intersectBox 返回 Vector3，不能当作距离比较。
export function interactionBlocked(origin, target, colliders, doors = [], ignore = null) {
  const delta = new THREE.Vector3().subVectors(target, origin);
  const distance = delta.length();
  if (distance < 0.001) return false;
  const ray = new THREE.Ray(origin, delta.divideScalar(distance));
  const point = new THREE.Vector3();
  const box = new THREE.Box3();
  const blockedBy = (collider) => {
    if (!collider || collider === ignore) return false;
    box.min.set(collider.x0, collider.y0, collider.z0);
    box.max.set(collider.x1, collider.y1, collider.z1);
    return ray.intersectBox(box, point) !== null &&
      point.distanceTo(origin) < distance - 0.065;
  };
  return colliders.some(blockedBy) || doors.some((door) => blockedBy(door.collider));
}

// Group origins often sit on the floor; aim at an authored handle instead of
// requiring players to stare down at the base of a tall interactable.
export function interactionWorldPosition(mesh, target = new THREE.Vector3()) {
  const anchor=mesh.userData.interactionPoint;
  if(anchor) return mesh.localToWorld(target.set(anchor.x,anchor.y,anchor.z));
  return mesh.getWorldPosition(target);
}
