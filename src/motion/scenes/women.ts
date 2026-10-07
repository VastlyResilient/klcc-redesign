// Slab media entry and Lou's held-position first-entry clarity. Authored timings, not source-editor claims.
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches||document.body.classList.contains('motion-reduced');
const active=new Set<Animation>();
const stop=()=>{if(reduced()){active.forEach(a=>a.cancel());active.clear()}};
addEventListener('klcc-motion-change',stop);matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',stop);
if(!reduced()){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){if(!reduced()){const animation=entry.target.animate([{opacity:.8},{opacity:1}],{duration:entry.target.matches('figure')?1100:1500,easing:'cubic-bezier(.2,.65,.3,1)'});active.add(animation);animation.finished.finally(()=>active.delete(animation)).catch(()=>{})}observer.unobserve(entry.target)}}),{threshold:.18});
 document.querySelectorAll('.women-together figure,.women-purpose-copy p').forEach(el=>observer.observe(el));
}
