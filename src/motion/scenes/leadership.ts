import {scrollDetail} from '../scroll-detail.js';
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches||document.body.classList.contains('motion-reduced');
const active=new Set<Animation>();
// Once-entered opacity .65 to 1, 1100ms ease-out; threshold .15. Native flow; no pin, chapter exchange, or reversible filter.
const entry0=new IntersectionObserver(es=>{for(const e of es){if(!e.isIntersecting)continue;entry0.unobserve(e.target);if(reduced())continue;const a=e.target.animate([{opacity:.65},{opacity:1}],{duration:1100,easing:'ease-out'});active.add(a);a.finished.then(()=>active.delete(a),()=>active.delete(a))}},{threshold:.15});document.querySelectorAll('#pastoral-team article img').forEach(e=>entry0.observe(e));
addEventListener('klcc-motion-change',()=>{if(reduced()){active.forEach(a=>a.cancel());document.querySelectorAll<HTMLElement>('main [style*=filter]').forEach(e=>e.style.filter='none')}});

// Native-scroll detail: Slab continuation adapted to this page’s semantic reading/media roles.
// Reverse follows position; these distances/thresholds are authored estimates, not Framer editor settings.
scrollDetail({"id": "leaders-founders-continuation", "selector": ".founders-portraits figure", "kind": "image", "distance": 36, "start": 0.94, "end": 0.32, "stagger": 0.065});
scrollDetail({"id": "leaders-directory-portraits", "selector": ".pastor-directory article figure", "kind": "image", "distance": 24, "start": 0.94, "end": 0.32, "stagger": 0.065});
