import {test} from 'node:test';
import assert from 'node:assert/strict';
import {ResolutionGovernor} from './js/performance.js';
const run=(g,fps,seconds)=>{const changes=[];for(let i=0;i<fps*seconds;i++){const s=g.sample(1/fps);if(s!==null)changes.push(s);}return changes;};
test('slow devices step down once per cooldown, without simulation-time bias',()=>{
 const g=new ResolutionGovernor();assert.deepEqual(run(g,10,3),[.8]);
 assert.deepEqual(run(g,10,8),[]);assert.deepEqual(run(g,10,4),[.7]);
 run(g,10,30);assert.equal(g.scale,.6);
});
test('a sustained fast device recovers quality gradually',()=>{
 const g=new ResolutionGovernor();run(g,20,40);assert.equal(g.scale,.6);
 const changes=run(g,60,50);assert.deepEqual(changes,[.7,.8,1]);
});
test('background pauses and invalid times do not change quality',()=>{
 const g=new ResolutionGovernor();for(const t of [10,1000,NaN,Infinity,-1,0])assert.equal(g.sample(t),null);
 assert.equal(g.scale,1);assert.deepEqual(run(g,48,12),[]);
});
