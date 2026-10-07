const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches||document.body.classList.contains('motion-reduced');
const active=new Set<Animation>();
// Once-entered opacity .65 to 1, 1100ms ease-out; threshold .15. Native flow; no pin, chapter exchange, or reversible filter.
const entry0=new IntersectionObserver(es=>{for(const e of es){if(!e.isIntersecting)continue;entry0.unobserve(e.target);if(reduced())continue;const a=e.target.animate([{opacity:.65},{opacity:1}],{duration:1100,easing:'ease-out'});active.add(a);a.finished.then(()=>active.delete(a),()=>active.delete(a))}},{threshold:.15});document.querySelectorAll('#pastoral-team article img').forEach(e=>entry0.observe(e));
addEventListener('klcc-motion-change',()=>{if(reduced()){active.forEach(a=>a.cancel());document.querySelectorAll<HTMLElement>('main [style*=filter]').forEach(e=>e.style.filter='none')}});
