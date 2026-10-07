// Lou About held-scroll probe: reading brightens once with elapsed time after entry.
// Body copy remains one semantic paragraph under the no-BodySplitText contract.
// Essential meeting facts and every action remain static; reverse never dims text.
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches||document.body.classList.contains('motion-reduced');
const passage=document.querySelector<HTMLElement>('[data-clarity]');
let active:Animation|undefined;
if(passage){const observer=new IntersectionObserver(entries=>{if(!entries.some(e=>e.isIntersecting))return;observer.disconnect();if(reduced())return;active=passage.animate([{opacity:.55},{opacity:1}],{duration:1700,easing:'ease-out'});active.finished.then(()=>{active=undefined},()=>{active=undefined})},{threshold:.25});observer.observe(passage)}
const finish=()=>{if(reduced())active?.cancel()};addEventListener('klcc-motion-change',finish);matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',finish);
