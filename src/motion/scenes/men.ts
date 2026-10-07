import {registerScene} from '../lifecycle.js';
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches||document.body.classList.contains('motion-reduced');
const active=new Set<Animation>();
// Routine and date rows never move. Longer study explanation and later leadership photograph receive distinct first-entry opacity. Scripture remains still, avoiding a repeated focus ending.
const entry0=new IntersectionObserver(es=>{for(const e of es){if(!e.isIntersecting)continue;entry0.unobserve(e.target);if(reduced())continue;const a=e.target.animate([{opacity:.65},{opacity:1}],{duration:1100,easing:'ease-out'});active.add(a);a.finished.then(()=>active.delete(a),()=>active.delete(a))}},{threshold:.15});document.querySelectorAll('#men-study p:not(.eyebrow)').forEach(e=>entry0.observe(e));
// Routine and date rows never move. Longer study explanation and later leadership photograph receive distinct first-entry opacity. Scripture remains still, avoiding a repeated focus ending.
const entry1=new IntersectionObserver(es=>{for(const e of es){if(!e.isIntersecting)continue;entry1.unobserve(e.target);if(reduced())continue;const a=e.target.animate([{opacity:.65},{opacity:1}],{duration:1100,easing:'ease-out'});active.add(a);a.finished.then(()=>active.delete(a),()=>active.delete(a))}},{threshold:.15});document.querySelectorAll('#men-photo figure').forEach(e=>entry1.observe(e));
addEventListener('klcc-motion-change',()=>{if(reduced()){active.forEach(a=>a.cancel());document.querySelectorAll<HTMLElement>('main [style*=filter]').forEach(e=>e.style.filter='none')}});
