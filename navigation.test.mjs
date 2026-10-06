import {test} from 'node:test';
import assert from 'node:assert/strict';
import {findGroundRoute,GroundNavigator} from './js/navigation.js';
import {aabbFromSphere,moveWithCollisions} from './js/util.js';
const floor={x0:-20,x1:20,z0:-20,z1:20,y0:-.1,y1:0};
const p=(x,z)=>({x,y:0,z});
function walk(start,route,colliders){
 const body=aabbFromSphere(start.x,0,start.z,.28,1.9);
 for(const goal of route){let arrived=false;for(let i=0;i<1000;i++){
  const x=(body.x0+body.x1)/2,z=(body.z0+body.z1)/2,d=Math.hypot(goal.x-x,goal.z-z);
  if(d<.06){arrived=true;break;}const step=Math.min(d,.055);
  moveWithCollisions(body,(goal.x-x)/d*step,-.12,(goal.z-z)/d*step,colliders,.4,{bodyHeight:1});
  assert.ok(Math.abs(body.y0)<.01,'unsupported route');
 }assert.ok(arrived,'route blocked at '+JSON.stringify(goal));}
 return body;
}
test('hunter routes around a solid memorial using real collision movement',()=>{
 const monument={x0:-2.8,x1:2.8,z0:-3.5,z1:3.5,y0:0,y1:.43};
 const cs=[floor,monument],route=findGroundRoute(p(0,-7),p(0,7),cs);
 const direct=aabbFromSphere(0,0,-7,.28,1.9);
 for(let i=0;i<400;i++)moveWithCollisions(direct,0,-.12,.055,cs,.4,{bodyHeight:1});
 assert.ok((direct.z0+direct.z1)/2< -3.7,'the old straight-line approach should reproduce the stall');
 assert.ok(route?.some(n=>Math.abs(n.x)>3));walk(p(0,-7),route,cs);
});
test('closed locked door blocks a route, unlocked door is a planned opening',()=>{
 const wallA={x0:-20,x1:-1,z0:-.1,z1:.1,y0:0,y1:3},wallB={...wallA,x0:1,x1:20};
 const door={locked:true,open:false,collider:{x0:-1,x1:1,z0:-.1,z1:.1,y0:0,y1:2}};
 assert.equal(findGroundRoute(p(0,-3),p(0,3),[floor,wallA,wallB],[door]),null);
 door.locked=false;assert.ok(findGroundRoute(p(0,-3),p(0,3),[floor,wallA,wallB],[door]));
});
test('route never invents floor across an unsupported gap',()=>{
 const a={...floor,z1:-1},b={...floor,z0:1};
 assert.equal(findGroundRoute(p(0,-3),p(0,3),[a,b]),null);
});
test('navigator caches stable paths and replans on a changed door',()=>{
 const nav=new GroundNavigator(),door={locked:false,open:true,collider:null};
 for(let i=0;i<300;i++)nav.target(p(0,0),p(3,0),[floor],[door],.016);
 assert.equal(nav.plans,1);door.open=false;nav.target(p(0,0),p(3,0),[floor],[door],1);assert.equal(nav.plans,2);
});

test('unreachable target is cached instead of running a search every frame',()=>{
 const wall={x0:-20,x1:20,z0:-.1,z1:.1,y0:0,y1:3},nav=new GroundNavigator();
 for(let i=0;i<600;i++)assert.equal(nav.target(p(0,-3),p(0,3),[floor,wall],[],.016),null);
 assert.equal(nav.plans,1);
});
test('planner enforces its expansion budget and can retry with a larger allowance',()=>{
 const wall={x0:-2,x1:2,z0:-.1,z1:.1,y0:0,y1:3},stats={};
 assert.equal(findGroundRoute(p(0,-3),p(0,3),[floor,wall],[],{budget:1,stats}),null);
 assert.equal(stats.expanded,1);
 assert.ok(findGroundRoute(p(0,-3),p(0,3),[floor,wall]));
});
test('target switching rooms invalidates the route without retaining its mutable coordinates',()=>{
 const nav=new GroundNavigator(),goal=p(3,0);nav.target(p(0,0),goal,[floor],[],.016);
 goal.x=-3;nav.target(p(0,0),goal,[floor],[],1);
 assert.equal(nav.plans,2);assert.equal(nav.goal.x,-3);goal.x=8;assert.equal(nav.goal.x,-3);
});
test('thin staggered obstacles never produce an unwalkable returned route',()=>{
 let seed=771;const rng=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 let found=0;
 for(let sample=0;sample<20;sample++){
  const cs=[floor];for(let i=0;i<7;i++){
   const x=-5+rng()*10,z=-5+rng()*10;
   cs.push({x0:x,x1:x+.06+rng()*.7,z0:z,z1:z+.1+rng()*3,y0:0,y1:2});
  }
  const route=findGroundRoute(p(-8,-8),p(8,8),cs,[],{budget:2500});
  if(route){walk(p(-8,-8),route,cs);found++;}
 }
 assert.ok(found>=15,'reasonable open scenes should have a route');
});
