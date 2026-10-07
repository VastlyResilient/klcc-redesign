import {registerScene} from '../lifecycle.js';
const footer=document.querySelector<HTMLElement>('.site-footer')!;
registerScene('mission-footer-focus',footer,p=>{footer.style.setProperty('--mission-footer-blur',`${Math.max(0,1-p*3)*6}px`)},1,.5);


const statement=document.querySelector<HTMLElement>('.mission-statement')!;const readable=statement.textContent!;const mq=matchMedia('(prefers-reduced-motion: reduce)');if(!mq.matches&&!document.body.classList.contains('motion-reduced')){const observer=new IntersectionObserver(entries=>{if(!entries.some(e=>e.isIntersecting))return;observer.disconnect();statement.animate([{opacity:.62,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{duration:1400,easing:'cubic-bezier(.2,.7,.2,1)'});},{threshold:.1});observer.observe(statement)}
