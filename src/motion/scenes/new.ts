import {scrollDetail} from '../scroll-detail.js';
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches||document.body.classList.contains('motion-reduced');
const active=new Set<Animation>();
// Once-entered opacity .65 to 1, 1100ms ease-out; threshold .15. Native flow; no pin, chapter exchange, or reversible filter.
const entry0=new IntersectionObserver(es=>{for(const e of es){if(!e.isIntersecting)continue;if((e.target as HTMLElement).dataset.scrollDetail){entry0.unobserve(e.target);continue;}entry0.unobserve(e.target);if(reduced())continue;const a=e.target.animate([{opacity:.65},{opacity:1}],{duration:1100,easing:'ease-out'});active.add(a);a.finished.then(()=>active.delete(a),()=>active.delete(a))}},{threshold:.15});document.querySelectorAll('#visit-together figure').forEach(e=>entry0.observe(e));
// Once-entered opacity .65 to 1, 1100ms ease-out; threshold .15. Native flow; no pin, chapter exchange, or reversible filter.
const entry1=new IntersectionObserver(es=>{for(const e of es){if(!e.isIntersecting)continue;entry1.unobserve(e.target);if(reduced())continue;const a=e.target.animate([{opacity:.65},{opacity:1}],{duration:1100,easing:'ease-out'});active.add(a);a.finished.then(()=>active.delete(a),()=>active.delete(a))}},{threshold:.15});document.querySelectorAll('#visit-next article p').forEach(e=>entry1.observe(e));
addEventListener('klcc-motion-change',()=>{if(reduced()){active.forEach(a=>a.cancel());document.querySelectorAll<HTMLElement>('main [style*=filter]').forEach(e=>e.style.filter='none')}});

// Native-scroll detail: Slab continuation adapted to this page’s semantic reading/media roles.
// Reverse follows position; these distances/thresholds are authored estimates, not Framer editor settings.
scrollDetail({"id": "new-worship-continuation", "selector": "#visit-together figure", "kind": "image", "distance": 40, "start": 0.94, "end": 0.32, "stagger": 0.065});
scrollDetail({"id": "new-welcome-reading", "selector": ".visit-welcome>div", "kind": "rise", "distance": 24, "start": 0.94, "end": 0.32, "stagger": 0.065});
// A reversible reading cursor through the real first-visit questions. It
// changes emphasis only; every instruction and action stays in the document.
const arrival=[...document.querySelectorAll<HTMLElement>('#visit-plan .arrival-steps article')];
let pending=false;
const updateArrival=()=>{
 pending=false;
 if(!arrival.length)return;
 const mark=innerHeight*.43;
 let current=0,closest=Infinity;
 arrival.forEach((step,i)=>{const b=step.getBoundingClientRect();const distance=Math.abs((b.top+b.bottom)/2-mark);if(distance<closest){closest=distance;current=i}});
 arrival.forEach((step,i)=>step.classList.toggle('is-current',i===current));
};
const requestArrival=()=>{if(!pending){pending=true;requestAnimationFrame(updateArrival)}};
addEventListener('scroll',requestArrival,{passive:true});addEventListener('resize',requestArrival);requestArrival();
