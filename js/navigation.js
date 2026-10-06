// Bounded same-floor navigation. Plans only to the supplied remembered target;
// it never reads live player state. Stair routing remains in stairs.js.
const CELL=.45, RADIUS=.29;
const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
export function navigationSegmentHits(a,b,box) {
  let lo=0,hi=1;
  for(const axis of ['x','z']) {
    const d=b[axis]-a[axis],min=box[axis+'0']-RADIUS,max=box[axis+'1']+RADIUS;
    if(Math.abs(d)<1e-9){if(a[axis]<=min||a[axis]>=max)return false;continue;}
    let u=(min-a[axis])/d,v=(max-a[axis])/d;if(u>v)[u,v]=[v,u];
    lo=Math.max(lo,u);hi=Math.min(hi,v);if(lo>=hi)return false;
  }
  return hi>0&&lo<1;
}
function navigationWorld(y,colliders,doors,bounds) {
  const passableDoors=new Set(doors.filter(d=>!d.locked&&!d.open).map(d=>d.collider));
  const all=[...new Set([...colliders,...doors.map(d=>d.collider).filter(Boolean)])].filter(c=>
    c.x1>=bounds.x0&&c.x0<=bounds.x1&&c.z1>=bounds.z0&&c.z0<=bounds.z1);
  const blockers=all.filter(c=>!passableDoors.has(c)&&c.y1>y+.1&&c.y0<y+.92);
  const floors=all.filter(c=>c.y1>=y-.4&&c.y1<=y+.05);
  const supported=p=>floors.some(c=>p.x>=c.x0&&p.x<=c.x1&&p.z>=c.z0&&p.z<=c.z1);
  const free=p=>supported(p)&&!blockers.some(c=>p.x>c.x0-RADIUS&&p.x<c.x1+RADIUS&&p.z>c.z0-RADIUS&&p.z<c.z1+RADIUS);
  const clear=(a,b)=>{
    if(blockers.some(c=>navigationSegmentHits(a,b,c)))return false;
    const steps=Math.max(1,Math.ceil(distance(a,b)/.2));
    for(let i=0;i<=steps;i++)if(!supported({x:a.x+(b.x-a.x)*i/steps,z:a.z+(b.z-a.z)*i/steps}))return false;
    return true;
  };
  return{free,clear,supported};
}
class Heap {
  constructor(){this.items=[];}
  push(n){const a=this.items;a.push(n);let i=a.length-1;while(i){const p=(i-1)>>1;if(a[p].f<=n.f)break;a[i]=a[p];i=p;}a[i]=n;}
  pop(){const a=this.items,first=a[0],last=a.pop();if(a.length){let i=0;while(i*2+1<a.length){let c=i*2+1;if(c+1<a.length&&a[c+1].f<a[c].f)c++;if(a[c].f>=last.f)break;a[i]=a[c];i=c;}a[i]=last;}return first;}
  get length(){return this.items.length;}
}

export function findGroundRoute(start,goal,colliders,doors=[],options={}) {
  const stats=options.stats;if(stats)Object.assign(stats,{expanded:0,cells:0});
  if(Math.abs(start.y-goal.y)>.4)return null;
  const margin=options.margin??8,budget=Math.max(0,Math.min(6000,options.budget??2000));
  const bounds={x0:Math.min(start.x,goal.x)-margin-1.5,x1:Math.max(start.x,goal.x)+margin+1.5,z0:Math.min(start.z,goal.z)-margin-1.5,z1:Math.max(start.z,goal.z)+margin+1.5};
  const world=navigationWorld(start.y,colliders,doors,bounds);
  if(!world.free(start))return null;
  if(!world.free(goal)&&goal.y>start.y+.1&&goal.y<=start.y+.4&&colliders.some(c=>
    goal.x>=c.x0&&goal.x<=c.x1&&goal.z>=c.z0&&goal.z<=c.z1&&Math.abs(c.y1-goal.y)<.04)) {
    // A visible player on a low bed can be approached from adjacent floor;
    // don't pretend the furniture surface is part of the ground grid.
    let best=null,score=Infinity;
    for(const radius of [.9,1.2])for(let i=0;i<16;i++) {
      const p={x:goal.x+Math.cos(i*Math.PI/8)*radius,z:goal.z+Math.sin(i*Math.PI/8)*radius,y:start.y};
      if(world.free(p)&&distance(start,p)<score){best=p;score=distance(start,p);}
    }
    if(best)goal=best;
  }
  if(!world.free(goal))return null;
  if(world.clear(start,goal))return[{...goal}];
  const minX=Math.floor((Math.min(start.x,goal.x)-margin)/CELL),maxX=Math.ceil((Math.max(start.x,goal.x)+margin)/CELL);
  const minZ=Math.floor((Math.min(start.z,goal.z)-margin)/CELL),maxZ=Math.ceil((Math.max(start.z,goal.z)+margin)/CELL);
  const cells=new Map();
  const cell=(x,z)=>{
    const key=x+','+z;if(cells.has(key))return cells.get(key);
    const n={x:x*CELL,z:z*CELL,y:start.y,ix:x,iz:z,key,g:Infinity,parent:null,closed:false};
    n.free=x>=minX&&x<=maxX&&z>=minZ&&z<=maxZ&&world.free(n);cells.set(key,n);return n;
  };
  const nearest=p=>{
    let best=null,score=Infinity;const ix=Math.round(p.x/CELL),iz=Math.round(p.z/CELL);
    for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++){
      const n=cell(ix+dx,iz+dz),d=distance(p,n);
      if(n.free&&d<score&&world.clear(p,n)){best=n;score=d;}
    }return best;
  };
  const first=nearest(start),last=nearest(goal);if(!first||!last)return null;
  const heap=new Heap();first.g=0;heap.push({node:first,f:distance(first,last),g:0});
  let expanded=0;
  while(heap.length&&expanded<budget){
    const entry=heap.pop(),n=entry.node;if(n.closed||entry.g!==n.g)continue;
    n.closed=true;expanded++;if(stats){stats.expanded=expanded;stats.cells=cells.size;}
    if(n===last){
      const raw=[];for(let at=n;at;at=at.parent)raw.push({x:at.x,y:at.y,z:at.z});raw.reverse();raw.push({...goal});
      // Only collapse collinear runs; every retained segment was collision tested.
      const route=[];
      for(let i=0;i<raw.length;i++){
        const a=route.at(-1),b=raw[i],c=raw[i+1];
        if(a&&c&&Math.abs((b.x-a.x)*(c.z-b.z)-(b.z-a.z)*(c.x-b.x))<1e-7&&world.clear(a,c))continue;
        route.push(b);
      }
      return route;
    }
    for(let dx=-1;dx<=1;dx++)for(let dz=-1;dz<=1;dz++){
      if(!dx&&!dz)continue;const next=cell(n.ix+dx,n.iz+dz);
      if(!next.free||next.closed)continue;
      // Inflated obstacles are wider than a cell. Reject diagonal corner cuts
      // through cached orthogonal cells rather than ray-testing every edge.
      if(dx&&dz&&(!cell(n.ix+dx,n.iz).free||!cell(n.ix,n.iz+dz).free))continue;
      if(!world.supported({x:(n.x+next.x)/2,z:(n.z+next.z)/2}))continue;
      const g=n.g+Math.hypot(dx,dz)*CELL;
      if(g<next.g){next.g=g;next.parent=n;heap.push({node:next,g,f:g+distance(next,last)});}
    }
  }
  return null;
}

export class GroundNavigator {
  constructor(){this.reset();}
  reset(){this.path=null;this.goal=null;this.cooldown=0;this.signature='';this.plans=0;this.dirty=true;}
  invalidate(){this.path=null;this.cooldown=0;this.dirty=true;}
  target(position,goal,colliders,doors,dt){
    this.cooldown=Math.max(0,this.cooldown-dt);
    const signature=doors.map(d=>(d.locked?'L':'')+(d.open?'O':'C')).join(',');
    const moved=!this.goal||distance(goal,this.goal)>.8||Math.abs(goal.y-this.goal.y)>.15;
    if(this.cooldown===0&&(this.dirty||moved||signature!==this.signature)){
      this.lastStats={};this.path=findGroundRoute(position,goal,colliders,doors,{stats:this.lastStats});
      this.goal={x:goal.x,y:goal.y,z:goal.z};this.signature=signature;this.cooldown=.75;this.plans++;this.dirty=false;
    }
    while(this.path?.length>1&&distance(position,this.path[0])<.18)this.path.shift();
    return this.path?.[0]??null;
  }
}
