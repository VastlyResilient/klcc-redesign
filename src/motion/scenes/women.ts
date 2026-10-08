import {scrollDetail} from '../scroll-detail.js';
// Slab media entry and Lou's held-position first-entry clarity. Authored timings, not source-editor claims.
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches||document.body.classList.contains('motion-reduced');
const active=new Set<Animation>();
const stop=()=>{if(reduced()){active.forEach(a=>a.cancel());active.clear()}};
addEventListener('klcc-motion-change',stop);matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',stop);
if(!reduced()){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){if(!reduced()){const animation=entry.target.animate([{opacity:.8},{opacity:1}],{duration:entry.target.matches('figure')?1100:1500,easing:'cubic-bezier(.2,.65,.3,1)'});active.add(animation);animation.finished.finally(()=>active.delete(animation)).catch(()=>{})}observer.unobserve(entry.target)}}),{threshold:.18});
 document.querySelectorAll('.women-purpose-copy p').forEach(el=>observer.observe(el));
}

// Native-scroll detail: Slab continuation adapted to this page’s semantic reading/media roles.
// Reverse follows position; these distances/thresholds are authored estimates, not Framer editor settings.
scrollDetail({"id": "women-community-continuation", "selector": ".women-together figure", "kind": "image", "distance": 44, "start": 0.94, "end": 0.32, "stagger": 0.065});
scrollDetail({"id": "women-encouragement-arrival", "selector": ".women-encouragement", "kind": "rise", "distance": 26, "start": 0.94, "end": 0.32, "stagger": 0.065});
