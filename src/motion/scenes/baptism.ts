import {scrollDetail} from '../scroll-detail.js';
import {brightedgeSequence} from '../brightedge-sequence.js';
// Observed first-entry clarity, reconstructed timing. Essential copy stays readable.
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
if(!reduced.matches&&!document.body.classList.contains('motion-reduced')){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){if(!reduced.matches&&!document.body.classList.contains('motion-reduced'))entry.target.animate([{opacity:.8},{opacity:1}],{duration:900,easing:'cubic-bezier(.2,.65,.3,1)'});observer.unobserve(entry.target)}}),{threshold:.15});
 document.querySelectorAll('.baptism-opening>figure').forEach(el=>observer.observe(el));
}

// Native-scroll detail: Slab continuation adapted to this page’s semantic reading/media roles.
// Reverse follows position; these distances/thresholds are authored estimates, not Framer editor settings.
scrollDetail({"id": "baptism-preparation-reading", "selector": ".baptism-preparation>p:not(.eyebrow)", "kind": "rise", "distance": 30, "start": 0.94, "end": 0.32, "stagger": 0.065});
brightedgeSequence({id:'baptism-dates',root:'.baptism-dates',items:'article',axis:'vertical',distance:24,interval:.14});
