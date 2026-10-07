import {registerScene} from '../lifecycle.js';
document.querySelectorAll<HTMLElement>('.member-steps article').forEach((el,i)=>registerScene('membership-step-'+i,el,p=>el.style.setProperty('--step-alpha',String(.55+.45*Math.min(1,p*3))),1,.4));

if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&!document.body.classList.contains('motion-reduced')){const media=document.querySelector('.member-journey figure')!;const observer=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){media.animate([{opacity:.65},{opacity:1}],{duration:1200,easing:'ease-out'});observer.disconnect()}},{threshold:.15});observer.observe(media)}
