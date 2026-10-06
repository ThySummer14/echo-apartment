import * as THREE from '../vendor/three.module.js';
import {beveledBoxGeometry,detailMaterials} from './models.js';
import {boxAABB} from './util.js';

// A continuous ceramic/enameled shell, not a solid primitive with a dark decal.
// Profiles run up the outside, across the rim, down the inside to an open drain.
export function vesselGeometry(profile,segments=64) {
  const positions=[],uv=[],indices=[];
  for(let ring=0;ring<profile.length;ring++){
    const p=profile[ring],power=2/(p.exponent??2);
    for(let i=0;i<=segments;i++){
      const a=i/segments*Math.PI*2,c=Math.cos(a),s=Math.sin(a);
      positions.push((p.x??0)+Math.sign(c)*Math.abs(c)**power*p.w/2,p.y,
        (p.z??0)+Math.sign(s)*Math.abs(s)**power*p.d/2);
      uv.push(i/segments,ring/(profile.length-1));
    }
  }
  for(let r=0;r<profile.length-1;r++)for(let i=0;i<segments;i++){
    const a=r*(segments+1)+i,b=a+segments+1;indices.push(a,b,a+1,a+1,b,b+1);
  }
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
  g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(indices);g.computeVertexNormals();
  const normals=g.attributes.normal;
  for(let r=0;r<profile.length;r++){
    const a=r*(segments+1),b=a+segments;
    const n=new THREE.Vector3().fromBufferAttribute(normals,a).add(new THREE.Vector3().fromBufferAttribute(normals,b)).normalize();
    normals.setXYZ(a,n.x,n.y,n.z);normals.setXYZ(b,n.x,n.y,n.z);
  }
  g.computeBoundingBox();g.computeBoundingSphere();return g;
}

export function buildBathroomFixtures(level) {
  const D=detailMaterials(level),ceramic=new THREE.MeshStandardMaterial({color:0xbfc4b8,roughness:.48}),
    enamel=new THREE.MeshStandardMaterial({color:0xaab5aa,roughness:.54}),
    rubber=new THREE.MeshStandardMaterial({color:0x29362f,roughness:.86}),
    water=new THREE.MeshStandardMaterial({color:0x172d28,roughness:.28,metalness:.08});
  const fixtures={};level.props.bathroomFixtures=fixtures;
  const fixture=(name,x,z,bounds)=>{
    const group=new THREE.Group();group.name='bathroom-'+name;group.position.set(x,0,z);level.scene.add(group);
    const collider=boxAABB(x,bounds.h/2,z,bounds.w,bounds.h,bounds.d);collider.fixture=name;
    level.colliders.push(collider);
    const rec={group,collider,parts:{},bounds};fixtures[name]=rec;return rec;
  };
  const mesh=(rec,name,geometry,material,x=0,y=0,z=0)=>{
    const m=new THREE.Mesh(geometry,material);m.position.set(x,y,z);m.name=name;rec.group.add(m);rec.parts[name]=m;return m;
  };
  const box=(r,n,w,h,d,mat,x,y,z)=>mesh(r,n,beveledBoxGeometry(w,h,d),mat,x,y,z);
  const pipe=(r,n,a,b,radius=.014)=>{
    const from=new THREE.Vector3(...a),to=new THREE.Vector3(...b),delta=to.clone().sub(from);
    const m=mesh(r,n,new THREE.CylinderGeometry(radius,radius,delta.length(),12),D.iron);
    m.position.copy(from.add(to).multiplyScalar(.5));m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());return m;
  };
  const drain=(r,x,y,z,radius)=>{
    const m=mesh(r,'drain-flange',new THREE.TorusGeometry(radius,.004,8,32),D.iron,x,y,z);m.rotation.x=-Math.PI/2;
    const dark=mesh(r,'drain-throat',new THREE.CircleGeometry(radius-.004,32),rubber,x,y-.006,z);dark.rotation.x=-Math.PI/2;
  };

  // 1400 × 700 × 400 mm tub body on an authored 150 mm support plinth.
  const tub=fixture('tub',-15.8,20.35,{w:1.4,d:.7,h:.55});
  box(tub,'plinth',1.30,.15,.60,D.concrete,0,.075,0);
  const tp=[
    {w:1.22,d:.53,y:.15,exponent:5},{w:1.34,d:.65,y:.48,exponent:5},
    {w:1.4,d:.7,y:.55,exponent:5},{w:1.275,d:.575,y:.55,exponent:4},
    {w:1.22,d:.53,y:.49,exponent:4},{w:1.02,d:.38,y:.25,exponent:4},
    {w:.055,d:.055,y:.247,x:.44,exponent:2},
  ];
  mesh(tub,'hollow-shell',vesselGeometry(tp),enamel);tub.profile=tp;
  drain(tub,.44,.249,0,.0275);
  // Water occupies the cavity, safely below the rim and above the real bottom.
  const surface=mesh(tub,'water',new THREE.CircleGeometry(1,64),water,0,.31,0);
  surface.rotation.x=-Math.PI/2;surface.scale.set(.515,.19,1);
  // Supported mixer and shower riser: all connections are visibly continuous.
  pipe(tub,'mixer-stem',[.40,.55,.255],[.40,.74,.255],.02);
  pipe(tub,'mixer-spout',[.40,.74,.255],[.40,.74,.05],.016);
  box(tub,'mixer-base',.085,.018,.075,D.iron,.40,.559,.255);
  for(const x of [.34,.46])box(tub,'tap-'+x,.045,.035,.045,D.brass,x,.70,.255);
  // Wall-mounted shower assembly is separate from the tub's collision envelope.
  const shower=new THREE.Group();shower.position.set(-15.8,0,20.82);level.scene.add(shower);
  const sr={group:shower,parts:{}};fixtures.shower=sr;
  pipe(sr,'riser',[0,.55,0],[0,1.95,0],.015);
  pipe(sr,'mixer-feed',[.40,.64,-.215],[.40,.64,0],.014);
  pipe(sr,'riser-feed',[.40,.64,0],[0,.64,0],.014);
  pipe(sr,'head-arm',[0,1.95,0],[0,1.95,-.16],.015);
  const head=mesh(sr,'shower-head',new THREE.CylinderGeometry(.055,.045,.035,24),D.iron,0,1.93,-.16);
  const face=mesh(sr,'perforated-face',new THREE.CylinderGeometry(.049,.049,.004,24),rubber,0,1.91,-.16);
  for(const y of [.68,1.35,1.85])pipe(sr,'wall-bracket-'+y,[0,y,0],[0,y,.065],.021);

  // 710 × 380 × 718 mm reference envelope, with a genuine pan opening.
  const toilet=fixture('toilet',-14.55,16.455,{w:.38,d:.71,h:.718});
  const panZ=-.08;
  const pp=[{w:.23,d:.38,y:0,z:panZ},{w:.29,d:.43,y:.20,z:panZ},
    {w:.38,d:.55,y:.38,z:panZ},{w:.27,d:.365,y:.38,z:panZ},
    {w:.18,d:.25,y:.255,z:panZ},{w:.07,d:.09,y:.175,z:panZ}];
  mesh(toilet,'open-pan',vesselGeometry(pp),ceramic);toilet.profile=pp;
  const seat=[{w:.38,d:.54,y:.386,z:panZ},{w:.38,d:.54,y:.41,z:panZ},
    {w:.255,d:.35,y:.41,z:panZ},{w:.255,d:.35,y:.386,z:panZ},{w:.38,d:.54,y:.386,z:panZ}];
  mesh(toilet,'seat-ring',vesselGeometry(seat),enamel);
  box(toilet,'rear-support',.25,.38,.19,ceramic,0,.19,.25);
  box(toilet,'cistern-gasket',.30,.012,.18,rubber,0,.386,.25);
  box(toilet,'cistern',.36,.302,.16,ceramic,0,.541,.275);
  box(toilet,'cistern-lid',.38,.026,.16,enamel,0,.705,.275);
  const button=mesh(toilet,'flush-button',new THREE.CylinderGeometry(.023,.023,.007,24),D.brass,0,.721,.275);
  const pool=mesh(toilet,'water',new THREE.CircleGeometry(1,32),water,0,.183,panZ);
  pool.rotation.x=-Math.PI/2;pool.scale.set(.034,.044,1);
  for(const x of [-.09,.09])box(toilet,'seat-hinge-'+x,.035,.028,.042,D.iron,x,.399,.15);
  for(const x of [-.10,.10])mesh(toilet,'floor-fixing-'+x,new THREE.SphereGeometry(.018,12,8),ceramic,x,.022,.035);

  // 550 × 460 mm basin, 46 mm open drain, with a floor-supported pedestal.
  const basin=fixture('basin',-16.55,15.18,{w:.55,d:.46,h:.82});
  box(basin,'pedestal-foot',.22,.07,.21,ceramic,0,.035,0);
  const pedestal=mesh(basin,'pedestal',new THREE.CylinderGeometry(.09,.105,.57,24),ceramic,0,.355,0);
  pedestal.scale.z=.85;
  const bp=[{w:.22,d:.18,y:.64,exponent:3},{w:.50,d:.41,y:.765,exponent:4},
    {w:.55,d:.46,y:.82,exponent:4},{w:.44,d:.32,y:.82,z:.035,exponent:3},
    {w:.18,d:.13,y:.67,z:.035,exponent:2},{w:.046,d:.046,y:.653,z:.035,exponent:2}];
  mesh(basin,'hollow-bowl',vesselGeometry(bp),ceramic);basin.profile=bp;drain(basin,0,.655,.035,.023);
  box(basin,'tap-escutcheon',.07,.018,.07,D.iron,0,.829,-.18);
  pipe(basin,'tap-stem',[0,.838,-.18],[0,.94,-.18],.018);
  pipe(basin,'tap-spout',[0,.94,-.18],[0,.94,-.02],.014);
  box(basin,'tap-lever',.085,.016,.025,D.brass,.025,.959,-.18);
  for(const x of [-.18,.18])pipe(basin,'wall-fixing-'+x,[x,.75,-.20],[x,.75,-.255],.015);

  // Bathroom mirror is anchored to the north wall above the basin, facing in.
  const mirror=new THREE.Group();mirror.position.set(-16.55,1.5,14.925);level.scene.add(mirror);
  const mr={group:mirror,parts:{}};fixtures.mirror=mr;
  for(const x of [-.24,.24])for(const y of [-.28,.28])pipe(mr,'wall-standoff-'+x+'-'+y,[x,y,-.032],[x,y,0],.011);
  box(mr,'backing',.59,.69,.025,D.paint,0,0,0);
  box(mr,'glass',.53,.63,.006,D.darkGlass,0,0,.018);
  for(const x of [-.285,.285])box(mr,'frame-side-'+x,.025,.69,.035,D.iron,x,0,.015);
  for(const y of [-.332,.332])box(mr,'frame-rail-'+y,.59,.025,.035,D.iron,0,y,.015);
  return fixtures;
}
