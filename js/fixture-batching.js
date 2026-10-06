import * as THREE from '../vendor/three.module.js';

// Only the newly created, opaque hardware of one fixture is eligible. The
// separately referenced diffuser remains an ordinary mutable scene object.
function mergeGeometry(meshes) {
  const names=Object.keys(meshes[0].geometry.attributes).sort();
  if(meshes.some(m=>m.geometry.isInstancedBufferGeometry||Object.keys(m.geometry.morphAttributes).length||m.geometry.drawRange.start!==0||m.geometry.drawRange.count!==Infinity||Object.keys(m.geometry.attributes).sort().join()!==names.join()))return null;
  for(const name of names){const a=meshes[0].geometry.attributes[name];if(a.isInterleavedBufferAttribute||meshes.some(m=>{const b=m.geometry.attributes[name];return b.isInterleavedBufferAttribute||b.itemSize!==a.itemSize||b.normalized!==a.normalized||b.array.constructor!==a.array.constructor;}))return null;}
  const geometries=meshes.map(m=>{m.updateMatrix();return m.geometry.clone().applyMatrix4(m.matrix);});
  const result=new THREE.BufferGeometry();let count=0;for(const g of geometries)count+=g.attributes.position.count;
  for(const name of names){const a=geometries[0].attributes[name],array=new a.array.constructor(count*a.itemSize);let offset=0;for(const g of geometries){array.set(g.attributes[name].array,offset);offset+=g.attributes[name].array.length;}result.setAttribute(name,new THREE.BufferAttribute(array,a.itemSize,a.normalized));}
  const indices=[];let offset=0;
  for(const g of geometries){if(g.index)for(const i of g.index.array)indices.push(i+offset);else for(let i=0;i<g.attributes.position.count;i++)indices.push(i+offset);offset+=g.attributes.position.count;g.dispose();}
  result.setIndex(indices);result.computeBoundingBox();result.computeBoundingSphere();return result;
}
export function batchFixtureHardware(group,diffuser,enabled=true) {
  const before=group.children.filter(o=>o.isMesh).length;
  if(enabled){
    const materials=new Map();
    for(const mesh of group.children){
      if(!mesh.isMesh||mesh===diffuser||Array.isArray(mesh.material)||mesh.material.transparent||mesh.material.opacity!==1||mesh.material.alphaTest>0||!mesh.material.depthWrite||!mesh.visible||mesh.userData.interactable||mesh.customDepthMaterial||mesh.customDistanceMaterial||mesh.onBeforeRender!==THREE.Object3D.prototype.onBeforeRender||mesh.onAfterRender!==THREE.Object3D.prototype.onAfterRender)continue;
      let groups=materials.get(mesh.material);if(!groups){groups=new Map();materials.set(mesh.material,groups);}
      const key=[mesh.castShadow,mesh.receiveShadow,mesh.renderOrder,mesh.layers.mask,mesh.frustumCulled].join('/');
      if(!groups.has(key))groups.set(key,[]);groups.get(key).push(mesh);
    }
    for(const [material,groups]of materials)for(const meshes of groups.values()){
      if(meshes.length<2)continue;const geometry=mergeGeometry(meshes);if(!geometry)continue;
      const first=meshes[0],batch=new THREE.Mesh(geometry,material);batch.name='fixture-static-hardware';
      batch.castShadow=first.castShadow;batch.receiveShadow=first.receiveShadow;batch.renderOrder=first.renderOrder;batch.layers.mask=first.layers.mask;batch.frustumCulled=first.frustumCulled;
      group.add(batch);for(const mesh of meshes){group.remove(mesh);mesh.geometry.dispose();}
    }
  }
  const stats={enabled,before,after:group.children.filter(o=>o.isMesh).length};group.userData.fixtureBatching=stats;return stats;
}
