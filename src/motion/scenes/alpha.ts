import {scrollDetail} from '../scroll-detail.js';
// Observed first-entry clarity, reconstructed timing. Essential copy stays readable.
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
if(!reduced.matches&&!document.body.classList.contains('motion-reduced')){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){if(!reduced.matches&&!document.body.classList.contains('motion-reduced'))entry.target.animate([{opacity:.8},{opacity:1}],{duration:1100,easing:'cubic-bezier(.2,.65,.3,1)'});observer.unobserve(entry.target)}}),{threshold:.15});
 document.querySelectorAll('.alpha-films figure').forEach(el=>observer.observe(el));
}

// Native-scroll detail: Slab continuation adapted to this page’s semantic reading/media roles.
// Reverse follows position; these distances/thresholds are authored estimates, not Framer editor settings.
scrollDetail({"id": "alpha-questions-arrival", "selector": ".alpha-brief-copy article:nth-child(-n+2)", "kind": "rise", "distance": 28, "start": 0.94, "end": 0.32, "stagger": 0.065});
scrollDetail({"id": "alpha-film-imagery", "selector": ".alpha-film-link img", "kind": "image", "distance": 20, "start": 0.94, "end": 0.32, "stagger": 0.065});
