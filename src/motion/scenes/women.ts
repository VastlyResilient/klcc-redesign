const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches||document.body.classList.contains('motion-reduced');
const active=new Set<Animation>();
addEventListener('klcc-motion-change',()=>{if(reduced()){active.forEach(a=>a.cancel());document.querySelectorAll<HTMLElement>('main [style*=filter]').forEach(e=>e.style.filter='none')}});
