/** Route-selected scroll responses. Native scroll, readable defaults, exact inspector bounds.
 * Adaptations of Royal's transform/opacity entrances, Slab's bounded image continuation,
 * and Lou's reversible image-focus boundary. Distances are KLCC estimates, not editor values.
 */
import {createTransport} from './transport.js';
type Detail={id:string;selector:string;trigger?:string;kind:'rise'|'focus'|'image';distance?:number;start?:number;end?:number;stagger?:number};
export function scrollDetail(o:Detail){
 const nodes=[...document.querySelectorAll<HTMLElement>(o.selector)];if(!nodes.length)return;
 const mq=matchMedia('(prefers-reduced-motion: reduce)');const registry=(window as any).__klccScenes??=new Map();
 const items=nodes.map((node,index)=>{const anchor=o.trigger?document.querySelector<HTMLElement>(o.trigger):node;const id=`detail-${o.id}-${index}`;
  const bounds=()=>{const translated=parseFloat(node.style.translate.split(' ')[1]||'0')||0;const top=(anchor?.getBoundingClientRect().top??0)+scrollY-(anchor===node?translated:0);const offset=(o.stagger??.09)*Math.min(index,4)*innerHeight;return{start:top-innerHeight*(o.start??.94)+offset,end:top-innerHeight*(o.end??.38)+offset}};
  registry.set(id,{bounds});node.dataset.scrollDetail=id;return{node,id,bounds,original:{translate:node.style.translate,opacity:node.style.opacity,filter:node.style.filter}}});
 const restore=(item:typeof items[number])=>{for(const k of ['translate','opacity','filter']as const)item.node.style[k]=item.original[k]};
 const render=()=>{const reduced=mq.matches||document.body.classList.contains('motion-reduced');for(const item of items){const {node,bounds}=item;if(reduced||node.contains(document.activeElement)){restore(item);continue}const b=bounds();const raw=Math.max(0,Math.min(1,(scrollY-b.start)/(b.end-b.start||1)));const p=raw*raw*(3-2*raw);const distance=(o.distance??(o.kind==='image'?44:24))*(innerWidth<=700?.5:1);if(o.kind==='focus'){node.style.filter=`blur(${(1-p)*(innerWidth<=700?1:2)}px)`}else{node.style.translate=`0 ${(1-p)*distance}px`;node.style.opacity=String((o.kind==='image'?.9:.85)+p*(o.kind==='image'?.1:.15));}}};
 const cleanup=createTransport(render);mq.addEventListener('change',render);addEventListener('klcc-motion-change',render);document.addEventListener('focusin',render);render();
 addEventListener('pageswap',()=>{cleanup();mq.removeEventListener('change',render);removeEventListener('klcc-motion-change',render);document.removeEventListener('focusin',render);for(const item of items){restore(item);registry.delete(item.id)}},{once:true});
}
