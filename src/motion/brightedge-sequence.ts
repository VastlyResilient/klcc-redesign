import {createTransport} from './transport.js';

type Sequence={id:string;root:string;items:string;axis?:'vertical'|'horizontal'|'depth';distance?:number;interval?:number};
const clamp=(n:number)=>Math.max(0,Math.min(1,n));

/** A KLCC reconstruction of Brightedge's ordered section pacing. Elements keep
 * their semantic position and readable base state. The motion is a reversible
 * function of scroll position; keyboard focus and reduced motion restore them.
 * Its values are measured adaptations, not Framer editor values. */
export function brightedgeSequence(config:Sequence){
 const root=document.querySelector<HTMLElement>(config.root);
 if(!root)return;
 const items=[...root.querySelectorAll<HTMLElement>(config.items)];
 if(!items.length)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const originals=items.map(item=>({translate:item.style.translate,scale:item.style.scale,opacity:item.style.opacity}));
 const registry=(window as any).__klccScenes??=new Map();
 const start=()=>root.getBoundingClientRect().top+scrollY-innerHeight*.88;
 const end=()=>root.getBoundingClientRect().bottom+scrollY-innerHeight*.35;
 registry.set(`brightedge-${config.id}`,{bounds:()=>({start:start(),end:end()})});
 const reset=()=>items.forEach((item,index)=>{item.style.translate=originals[index].translate;item.style.scale=originals[index].scale;item.style.opacity=originals[index].opacity});
 const render=()=>{
  if(reduced.matches||document.body.classList.contains('motion-reduced')){reset();root.style.removeProperty('--sequence-progress');return}
  root.style.setProperty('--sequence-progress',String(clamp((scrollY-start())/(end()-start()||1))));
  items.forEach((item,index)=>{
   if(item.contains(document.activeElement)){item.style.translate=originals[index].translate;item.style.scale=originals[index].scale;item.style.opacity=originals[index].opacity;return}
   const top=item.getBoundingClientRect().top+scrollY;
   const shift=(config.interval??.055)*Math.min(index,5)*innerHeight;
   const begin=top-innerHeight*.91+shift;
   const finish=top-innerHeight*.48+shift;
   const raw=clamp((scrollY-begin)/(finish-begin||1));
   const p=raw*raw*(3-2*raw);
   const distance=(config.distance??28)*(innerWidth<=700?.55:1)*(1-p);
   item.style.translate=config.axis==='horizontal'?`-${distance}px 0`:`0 ${distance}px`;
   if(config.axis==='depth')item.style.scale=String(.975+p*.025);
   item.style.opacity=String(.7+p*.3);
  });
 };
 const clean=createTransport(render);
 reduced.addEventListener('change',render);
 addEventListener('klcc-motion-change',render);
 document.addEventListener('focusin',render);
 addEventListener('pageswap',()=>{clean();reduced.removeEventListener('change',render);removeEventListener('klcc-motion-change',render);document.removeEventListener('focusin',render);reset();registry.delete(`brightedge-${config.id}`)},{once:true});
 render();
}
