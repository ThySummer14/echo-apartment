// Rendering quality uses real wall time; simulation clamps must not make a
// slow device appear faster. Background-tab gaps are not rendering samples.
export class ResolutionGovernor {
  constructor() { this.scale=1;this.cooldown=0;this.elapsed=0;this.frames=0; }
  sample(seconds) {
    if(!Number.isFinite(seconds)||seconds<=0||seconds>.5){this.elapsed=0;this.frames=0;return null;}
    if(this.cooldown>0){this.cooldown=Math.max(0,this.cooldown-seconds);return null;}
    this.elapsed+=seconds;this.frames++;
    if(this.elapsed<2||this.frames<8)return null;
    const fps=this.frames/this.elapsed;
    this.elapsed=0;this.frames=0;
    const steps=[1,.8,.7,.6],i=steps.indexOf(this.scale);
    const next=fps<38?Math.min(3,i+1):fps>57?Math.max(0,i-1):i;
    if(next===i)return null;
    this.scale=steps[next];this.cooldown=10;return this.scale;
  }
}
