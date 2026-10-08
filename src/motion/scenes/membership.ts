import {scrollDetail} from '../scroll-detail.js';
import {createTransport} from '../transport.js';

// Brightedge's Approach section keeps the visual at the reading position while
// the steps move in normal document flow. Progress is tied to position, not a
// one-shot observer, so it pauses and reverses with the visitor's scroll.
const section=document.querySelector<HTMLElement>('.member-journey');
if(section){
 const steps=[...section.querySelectorAll<HTMLElement>('.member-steps article')];
 const stage=[...section.querySelectorAll<HTMLElement>('.member-visual-stack img')];
 const rail=section.querySelector<HTMLElement>('.member-steps');
 const captions=['Life at Kingdom Life','Kingdom Life leadership','The Kingdom Life worship team','Kingdom Life community food outreach'];
 const caption=section.querySelector<HTMLElement>('.member-visual-caption');
 const reduce=()=>matchMedia('(prefers-reduced-motion: reduce)').matches||document.body.classList.contains('motion-reduced');
 const clamp=(v:number)=>Math.max(0,Math.min(1,v));
 const render=()=>{
  if(!steps.length||!rail)return;
  const pivot=innerHeight*(innerWidth<=900?.72:.5);
  const centres=steps.map(step=>{const r=step.getBoundingClientRect();return r.top+r.height*.5});
  const active=Math.max(0,centres.findLastIndex(v=>v<=pivot));
  const start=centres[0],end=centres[centres.length-1];
  const progress=reduce()?1:clamp((pivot-start)/(end-start||1));
  rail.style.setProperty('--journey-progress',String(progress));
  steps.forEach((step,i)=>{
   step.classList.toggle('is-current',i===active);
   const r=step.getBoundingClientRect();
   const p=reduce()?1:clamp((innerHeight*.9-r.top)/(innerHeight*.42));
   step.style.setProperty('--step-progress',String(p));
  });
  stage.forEach((img,i)=>img.classList.toggle('is-current',i===active));
  if(caption)caption.textContent=captions[active];
  section.dataset.chapter=String(active+1);
 };
 const clean=createTransport(render);
 addEventListener('klcc-motion-change',render);
 addEventListener('pageswap',()=>{clean();removeEventListener('klcc-motion-change',render)},{once:true});
 render();
}

scrollDetail({id:'membership-gathering-continuation',selector:'.member-intro>.opening-documentary',kind:'image',distance:36,start:.94,end:.32,stagger:.065});
