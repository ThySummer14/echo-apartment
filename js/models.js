import * as THREE from '../vendor/three.module.js';
import { mulberry32 } from './util.js';

// 分件家具使用微倒角，建筑接合面保持平直。实体碰撞仍采用外轮廓。
export function beveledBoxGeometry(w,h,d) {
  const b=Math.min(.018,w/7,h/7,d/7);
  const shape=new THREE.Shape();
  shape.moveTo(-w/2+b,-d/2+b);shape.lineTo(w/2-b,-d/2+b);
  shape.lineTo(w/2-b,d/2-b);shape.lineTo(-w/2+b,d/2-b);shape.closePath();
  const geometry=new THREE.ExtrudeGeometry(shape,{depth:h-2*b,bevelEnabled:true,
    bevelSize:b,bevelThickness:b,bevelSegments:2,curveSegments:1,steps:1});
  geometry.rotateX(-Math.PI/2);geometry.translate(0,b-h/2,0);
  return geometry;
}

function surfaceMaps(rgb,seed,wood=false) {
  const rng=mulberry32(seed),size=256;
  const canvases=Array.from({length:3},()=>{const c=document.createElement('canvas');c.width=c.height=size;return c;});
  const images=canvases.map(c=>c.getContext('2d').createImageData(size,size));
  for(let y=0;y<size;y++)for(let x=0;x<size;x++) {
    const i=(y*size+x)*4,grain=(rng()-.5)*18;
    const wave=wood?Math.sin(x*.24+Math.sin(y*.024)*1.7)*8+Math.sin(x*.73)*2:0;
    const pore=rng()<.015?-26:0;
    for(let channel=0;channel<3;channel++) {
      images[0].data[i+channel]=rgb[channel]+grain+wave+pore;
      images[1].data[i+channel]=128+grain*2+wave*1.5+pore*2;
      images[2].data[i+channel]=218+grain;
    }
    for(const img of images)img.data[i+3]=255;
  }
  return canvases.map((c,index)=>{
    c.getContext('2d').putImageData(images[index],0,0);
    const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;
    t.colorSpace=index===0?THREE.SRGBColorSpace:THREE.NoColorSpace;t.anisotropy=8;return t;
  });
}

export function detailMaterials(level) {
  if(level.detailMaterials)return level.detailMaterials;
  const textured=(rgb,seed,wood,bumpScale)=>{
    const [map,bumpMap,roughnessMap]=surfaceMaps(rgb,seed,wood);
    return new THREE.MeshStandardMaterial({map,bumpMap,roughnessMap,bumpScale,roughness:.96});
  };
  level.detailMaterials={
    wood:textured([100,76,51],771,true,.012),concrete:textured([133,132,119],772,false,.018),
    paint:textured([85,105,93],773,false,.006),plaster:textured([174,166,143],774,false,.012),
    iron:new THREE.MeshStandardMaterial({color:0x586761,roughness:.63,metalness:.38}),
    brass:new THREE.MeshStandardMaterial({color:0x927a4b,roughness:.53,metalness:.52}),
    rubber:new THREE.MeshStandardMaterial({color:0x252b29,roughness:.68}),
    enamel:new THREE.MeshStandardMaterial({color:0xb6beb4,roughness:.52,metalness:.08}),
    darkGlass:new THREE.MeshStandardMaterial({color:0x22332e,roughness:.17,metalness:.24})
  };return level.detailMaterials;
}

export function fixtureDetails(level,x,y,z,colour,parent=level.scene) {
  const M=detailMaterials(level),group=new THREE.Group();group.position.set(x,y,z);parent.add(group);
  const box=(w,h,d,mat,px,py,pz)=>{const m=new THREE.Mesh(beveledBoxGeometry(w,h,d),mat);m.position.set(px,py,pz);group.add(m);return m;};
  box(.75,.07,.25,M.iron,0,0,0);
  const glow=new THREE.MeshBasicMaterial({color:colour});
  const diffuser=box(.57,.045,.19,glow,0,-.06,0);
  for(let i=0;i<15;i++)box(.008,.008,.18,M.enamel,-.27+i*.038,-.087,0);
  for(const side of [-1,1]) {
    box(.065,.10,.27,M.enamel,side*.335,-.025,0);
    for(const dz of [-.085,.085]) {
      const screw=new THREE.Mesh(new THREE.CylinderGeometry(.01,.01,.007,8),M.brass);
      screw.position.set(side*.335,-.079,dz);group.add(screw);
    }
  }
  return {group,diffuser};
}

export function finishStairwell(level,{x0,x1,z0,z1,base,height,gapX=null,leftDoor=null}) {
  const M=detailMaterials(level),decor={collide:false,cast:false,geo:{jitter:0,ao:'none'}};
  for(let floor=0;floor<height/2.8;floor++) {
    const y=base+floor*2.8;
    // 旧墙裙、分色收口与瓷砖踢脚线具有实际厚度。
    for(const x of [x0+.12,x1-.12]) {
      const intervals=leftDoor&&x<x0+.2&&Math.abs(y-leftDoor.y)<.01?
        [[z0,leftDoor.gap[0]],[leftDoor.gap[1],z1]]:[[z0,z1]];
      for(const [a,b] of intervals) {
        level.box(x,(a+b)/2,y,.025,b-a,1.15,M.paint,decor);
        level.box(x,(a+b)/2,y+1.15,.036,b-a,.035,M.iron,decor);
        level.box(x,(a+b)/2,y,.04,b-a,.14,M.rubber,decor);
      }
    }
    level.box((x0+x1)/2,z1-.12,y,x1-x0,.025,1.15,M.paint,decor);
    level.box((x0+x1)/2,z1-.12,y,x1-x0,.04,.14,M.rubber,decor);
    const ranges=gapX?[[x0,gapX[0]],[gapX[1],x1]]:[[x0,x1]];
    for(const [a,b] of ranges)if(b>a)level.box((a+b)/2,z0+.12,y,b-a,.025,1.15,M.paint,decor);
    // 接线管、电箱底板和紧固箍；位置离开楼梯与门洞。
    const pipe=new THREE.Mesh(new THREE.CylinderGeometry(.019,.019,2.5,10),M.iron);
    pipe.position.set(x1-.16,y+1.4,z1-.4);level.scene.add(pipe);
    for(const yy of [.35,1.15,2.25])level.box(x1-.15,z1-.4,y+yy,.035,.10,.04,M.brass,decor);
    level.box(x1-.17,z1-1.1,y+1.2,.12,.38,.46,M.iron,decor);
    level.box(x1-.24,z1-1.1,y+1.24,.018,.32,.38,M.paint,decor);
  }
  // 从粗贴图补到独立剥落斑和下渗水痕，保持可控数量。
  const rng=mulberry32(817);
  for(let i=0;i<34;i++) {
    const y=base+.18+rng()*(height-.4),z=z0+.7+rng()*(z1-z0-1.4),w=.04+rng()*.22,h=.1+rng()*.48;
    if(leftDoor&&z>leftDoor.gap[0]-.2&&z<leftDoor.gap[1]+.2&&y>leftDoor.y-.5&&y<leftDoor.y+2.2)continue;
    const mat=i%3?M.plaster:M.rubber;
    level.box(x0+.137,z,y,.006,w,h,mat,decor);
  }
}

export function doorDetails(level,slab,width,height,along) {
  const M=detailMaterials(level),group=new THREE.Group();if(along==='z')group.rotation.y=-Math.PI/2;slab.add(group);
  const add=(geo,mat,x,y,z)=>{const mesh=new THREE.Mesh(geo,mat);mesh.position.set(x,y,z);group.add(mesh);return mesh;};
  for(const side of [-1,1]) {
    // 门板嵌线、锁座、杠杆把手与三枚铰链都跟随门扇。
    for(const yy of [-height*.23,height*.16]) {
      const pw=width*.70,ph=height*.32;
      for(const xx of [-pw/2,pw/2])add(beveledBoxGeometry(.018,ph,.012),M.wood,xx,yy,side*.036);
      for(const y of [yy-ph/2,yy+ph/2])add(beveledBoxGeometry(pw,.018,.012),M.wood,0,y,side*.036);
    }
    add(beveledBoxGeometry(.085,.17,.014),M.brass,width/2-.09,height*.04,side*.04);
    const lever=add(new THREE.CylinderGeometry(.012,.012,.13,12),M.brass,width/2-.145,height*.04,side*.075);
    lever.rotation.z=Math.PI/2;
  }
  for(const yy of [-height*.34,0,height*.34])add(new THREE.CylinderGeometry(.014,.014,.12,12),M.iron,-width/2+.016,yy,0);
}
