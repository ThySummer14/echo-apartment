import {test} from 'node:test';
import assert from 'node:assert/strict';
import {PursuitMemory,movementAudible,isSafeSpawn} from './js/pursuit.js';
test('occluded quiet player does not update the last known position',()=>{
 const m=new PursuitMemory(),p={x:2,y:0,z:3};
 m.update(.1,{player:p,visible:true,audible:false});p.x=18;
 for(let i=0;i<101;i++)m.update(.1,{player:p,visible:false,audible:false});
 assert.deepEqual(m.target,{x:2,y:0,z:3});assert.equal(m.expired,true);
});
test('audible movement reacquires a position without sharing an object reference',()=>{
 const m=new PursuitMemory(),p={x:2,y:0,z:3};m.reset(p);
 m.update(11,{player:p,visible:false,audible:false});assert.equal(m.expired,true);
 p.z=8;m.update(.1,{player:p,visible:false,audible:true});p.z=99;
 assert.equal(m.target.z,8);assert.equal(m.expired,false);
});
test('sprinting carries further, walls attenuate, and floors block hearing',()=>{
 const a={x:0,y:0,z:0},p={x:8,y:0,z:0};
 assert.equal(movementAudible(a,p,4,false),false);
 assert.equal(movementAudible(a,p,12,false),true);
 assert.equal(movementAudible(a,p,12,true),false);
 assert.equal(movementAudible(a,{...p,y:2.8},12,false),false);
 assert.equal(movementAudible(a,p,0,false),false);
});


test('spawn safety rejects embedded furniture, unsupported space and corrupt points',()=>{
 const floor={x0:-5,x1:5,z0:-5,z1:5,y0:-.1,y1:0};
 const table={x0:-1,x1:1,z0:-1,z1:1,y0:.32,y1:.38};
 assert.equal(isSafeSpawn({x:2,y:0,z:2},[floor,table]),true);
 assert.equal(isSafeSpawn({x:0,y:0,z:0},[floor,table]),false);
 assert.equal(isSafeSpawn({x:8,y:0,z:0},[floor]),false);
 assert.equal(isSafeSpawn({x:NaN,y:0,z:0},[floor]),false);
});
