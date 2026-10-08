import {scrollDetail} from '../scroll-detail.js';
import {registerScene} from '../lifecycle.js';
const section=document.querySelector<HTMLElement>('.member-journey')!;
const chapters=[...section.querySelectorAll<HTMLElement>('article')];
const media=matchMedia('(min-height: 680px)');const reduced=matchMedia('(prefers-reduced-motion: reduce)');
function configure(){const active=media.matches&&!reduced.matches&&!document.body.classList.contains('motion-reduced');section.classList.toggle('exchange-ready',active);if(!active)chapters.forEach(c=>c.classList.remove('is-current'))}
configure();media.addEventListener('change',configure);reduced.addEventListener('change',configure);new MutationObserver(configure).observe(document.body,{attributes:true,attributeFilter:['class']});
registerScene('membership-paired-exchange',section,p=>{if(!section.classList.contains('exchange-ready'))return;const n=Math.min(3,Math.floor(p*4));chapters.forEach((c,i)=>c.classList.toggle('is-current',i===n));section.dataset.chapter=String(n+1)},.105,1);

// Native-scroll detail: Slab continuation adapted to this page’s semantic reading/media roles.
// Reverse follows position; these distances/thresholds are authored estimates, not Framer editor settings.
scrollDetail({"id": "membership-gathering-continuation", "selector": ".member-intro>.opening-documentary", "kind": "image", "distance": 36, "start": 0.94, "end": 0.32, "stagger": 0.065});
