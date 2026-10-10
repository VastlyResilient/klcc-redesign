import {scrollDetail} from '../scroll-detail.js';
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches||document.body.classList.contains('motion-reduced');
const active=new Set<Animation>();
// Once-entered opacity .65 to 1, 1100ms ease-out; threshold .15. Native flow; no pin, chapter exchange, or reversible filter.
const entry1=new IntersectionObserver(es=>{for(const e of es){if(!e.isIntersecting)continue;entry1.unobserve(e.target);if(reduced())continue;const a=e.target.animate([{opacity:.65},{opacity:1}],{duration:1100,easing:'ease-out'});active.add(a);a.finished.then(()=>active.delete(a),()=>active.delete(a))}},{threshold:.15});document.querySelectorAll('#age-paths article p').forEach(e=>entry1.observe(e));
addEventListener('klcc-motion-change',()=>{if(reduced()){active.forEach(a=>a.cancel());document.querySelectorAll<HTMLElement>('main [style*=filter]').forEach(e=>e.style.filter='none')}});

// Native-scroll detail: Slab continuation adapted to this page’s semantic reading/media roles.
// Reverse follows position; these distances/thresholds are authored estimates, not Framer editor settings.
scrollDetail({"id": "youth-gathering-arrival", "selector": ".elevate-opening figure", "kind": "image", "distance": 40, "start": 0.94, "end": 0.32, "stagger": 0.065});
scrollDetail({"id": "youth-connection-passage", "selector": ".elevate-connect>p", "kind": "rise", "distance": 22, "start": 0.94, "end": 0.32, "stagger": 0.065});
// Each actual age band receives its own reversible reading line rather than
// an all-at-once card reveal. All copy and contact actions remain visible.
const ageBands=[...document.querySelectorAll<HTMLElement>('#age-paths article')];
let ageQueued=false;
const updateBands=()=>{
 ageQueued=false;
 const off=reduced();
 ageBands.forEach(band=>{
  const top=band.getBoundingClientRect().top;
  const progress=off?1:Math.max(0,Math.min(1,(innerHeight*.92-top)/(innerHeight*.45)));
  band.style.setProperty('--age-line',`${progress*100}%`);
 });
};
const queueBands=()=>{if(!ageQueued){ageQueued=true;requestAnimationFrame(updateBands)}};
addEventListener('scroll',queueBands,{passive:true});addEventListener('resize',queueBands);addEventListener('klcc-motion-change',queueBands);queueBands();
