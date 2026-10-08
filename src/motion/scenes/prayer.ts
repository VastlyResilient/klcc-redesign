// Royal Contact Hold: request actions and schedules remain stationary.
// The later documentary image receives a bounded Royal-style enter arrival only.
const photo=document.querySelector('.prayer-scripture img');if(photo&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const o=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){o.disconnect();if(!document.body.classList.contains('motion-reduced'))photo.animate([{transform:'scale(1.015)'},{transform:'scale(1)'}],{duration:900,easing:'cubic-bezier(.2,.7,.2,1)'})}},{threshold:.2});o.observe(photo)}

// Owner-requested inner-page scroll responses; essential controls remain still.
import {scrollDetail} from "../scroll-detail.js";
scrollDetail({"id": "prayer-belief", "selector": ".prayer-belief p", "kind": "rise", "distance": 28});
scrollDetail({"id": "prayer-gathering", "selector": ".prayer-scripture > img", "kind": "image", "distance": 32});
