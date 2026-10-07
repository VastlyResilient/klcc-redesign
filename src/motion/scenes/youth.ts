import {registerScene} from '../lifecycle.js';
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches||document.body.classList.contains('motion-reduced');
const active=new Set<Animation>();
// Grade ranges and weekly schedule hold. Worship photo arrives independently before age-path descriptions; later quotation receives reversible clarity.
const entry0=new IntersectionObserver(es=>{for(const e of es){if(!e.isIntersecting)continue;entry0.unobserve(e.target);if(reduced())continue;const a=e.target.animate([{opacity:.65},{opacity:1}],{duration:1100,easing:'ease-out'});active.add(a);a.finished.then(()=>active.delete(a),()=>active.delete(a))}},{threshold:.15});document.querySelectorAll('#elevate-service figure').forEach(e=>entry0.observe(e));
// Grade ranges and weekly schedule hold. Worship photo arrives independently before age-path descriptions; later quotation receives reversible clarity.
const entry1=new IntersectionObserver(es=>{for(const e of es){if(!e.isIntersecting)continue;entry1.unobserve(e.target);if(reduced())continue;const a=e.target.animate([{opacity:.65},{opacity:1}],{duration:1100,easing:'ease-out'});active.add(a);a.finished.then(()=>active.delete(a),()=>active.delete(a))}},{threshold:.15});document.querySelectorAll('#age-paths article p').forEach(e=>entry1.observe(e));
const heading=document.querySelector<HTMLElement>('#youth-scripture h2');if(heading)registerScene('youth-reversible-statement',heading,p=>{heading.style.filter=reduced()?'none':`blur(${Math.max(0,1-p*2.4)*2}px)`},1,.55);
addEventListener('klcc-motion-change',()=>{if(reduced()){active.forEach(a=>a.cancel());document.querySelectorAll<HTMLElement>('main [style*=filter]').forEach(e=>e.style.filter='none')}});
