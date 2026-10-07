// Observed Lou timed first-entry clarity, adapted to a continuous semantic quote.
// Body copy is never split into word wrappers; urgent request actions remain still.
const quote=document.querySelector('.care-quote');
if(quote&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(es=>{if(!es.some(e=>e.isIntersecting))return;observer.disconnect();if(document.body.classList.contains('motion-reduced'))return;quote.animate([{opacity:.7},{opacity:1}],{duration:1400,easing:'cubic-bezier(.2,.7,.2,1)'});},{threshold:.15});observer.observe(quote)}
