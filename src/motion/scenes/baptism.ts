// Observed first-entry clarity, reconstructed timing. Essential copy stays readable.
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
if(!reduced.matches&&!document.body.classList.contains('motion-reduced')){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){if(!reduced.matches&&!document.body.classList.contains('motion-reduced'))entry.target.animate([{opacity:.8},{opacity:1}],{duration:900,easing:'cubic-bezier(.2,.65,.3,1)'});observer.unobserve(entry.target)}}),{threshold:.15});
 document.querySelectorAll('.baptism-opening>figure').forEach(el=>observer.observe(el));
}
