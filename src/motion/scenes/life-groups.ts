import {scrollDetail} from '../scroll-detail.js';
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches||document.body.classList.contains('motion-reduced');
const active=new Set<Animation>();
// Once-entered opacity .65 to 1, 1100ms ease-out; threshold .15. Native flow; no pin, chapter exchange, or reversible filter.
const entry0=new IntersectionObserver(es=>{for(const e of es){if(!e.isIntersecting)continue;entry0.unobserve(e.target);if(reduced())continue;const a=e.target.animate([{opacity:.65},{opacity:1}],{duration:1100,easing:'ease-out'});active.add(a);a.finished.then(()=>active.delete(a),()=>active.delete(a))}},{threshold:.15});document.querySelectorAll('#groups-directory article p').forEach(e=>entry0.observe(e));
// Once-entered opacity .65 to 1, 1100ms ease-out; threshold .15. Native flow; no pin, chapter exchange, or reversible filter.
const entry1=new IntersectionObserver(es=>{for(const e of es){if(!e.isIntersecting)continue;if((e.target as HTMLElement).dataset.scrollDetail){entry1.unobserve(e.target);continue;}entry1.unobserve(e.target);if(reduced())continue;const a=e.target.animate([{opacity:.65},{opacity:1}],{duration:1100,easing:'ease-out'});active.add(a);a.finished.then(()=>active.delete(a),()=>active.delete(a))}},{threshold:.15});document.querySelectorAll('#groups-photo figure').forEach(e=>entry1.observe(e));
addEventListener('klcc-motion-change',()=>{if(reduced()){active.forEach(a=>a.cancel());document.querySelectorAll<HTMLElement>('main [style*=filter]').forEach(e=>e.style.filter='none')}});

// Native-scroll detail: Slab continuation adapted to this page’s semantic reading/media roles.
// Reverse follows position; these distances/thresholds are authored estimates, not Framer editor settings.
scrollDetail({"id": "groups-community-continuation", "selector": "#groups-photo figure", "kind": "image", "distance": 44, "start": 0.94, "end": 0.32, "stagger": 0.065});
// The seven genuine group types become a scroll-following index. Its active
// rule and type emphasis reverse naturally; mobile keeps the full list open.
const groupRows=[...document.querySelectorAll<HTMLElement>('#groups-directory .group-rows article')];
let queued=false;
const updateGroups=()=>{
 queued=false;
 if(!groupRows.length)return;
 const mark=innerHeight*.46;
 let current=0,smallest=Infinity;
 groupRows.forEach((row,i)=>{const b=row.getBoundingClientRect();const distance=Math.abs((b.top+b.bottom)/2-mark);if(distance<smallest){smallest=distance;current=i}});
 groupRows.forEach((row,i)=>row.classList.toggle('is-current',i===current));
};
const requestGroups=()=>{if(!queued){queued=true;requestAnimationFrame(updateGroups)}};
addEventListener('scroll',requestGroups,{passive:true});addEventListener('resize',requestGroups);requestGroups();
