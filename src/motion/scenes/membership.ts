import {registerScene} from '../lifecycle.js';
const section=document.querySelector<HTMLElement>('.member-journey')!;
const chapters=[...section.querySelectorAll<HTMLElement>('article')];
const media=matchMedia('(min-height: 680px)');const reduced=matchMedia('(prefers-reduced-motion: reduce)');
function configure(){const active=media.matches&&!reduced.matches&&!document.body.classList.contains('motion-reduced');section.classList.toggle('exchange-ready',active);if(!active)chapters.forEach(c=>c.classList.remove('is-current'))}
configure();media.addEventListener('change',configure);reduced.addEventListener('change',configure);new MutationObserver(configure).observe(document.body,{attributes:true,attributeFilter:['class']});
registerScene('membership-paired-exchange',section,p=>{if(!section.classList.contains('exchange-ready'))return;const n=Math.min(3,Math.floor(p*4));chapters.forEach((c,i)=>c.classList.toggle('is-current',i===n));section.dataset.chapter=String(n+1)},.105,1);
