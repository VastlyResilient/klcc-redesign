import {scrollDetail} from '../scroll-detail.js';
import {createTransport} from '../transport.js';
// Native-scroll detail: Slab continuation adapted to this page’s semantic reading/media roles.
// Reverse follows position; these distances/thresholds are authored estimates, not Framer editor settings.
scrollDetail({"id": "beliefs-reading-sequence", "selector": ".beliefs-paragraph", "kind": "rise", "distance": 24, "start": 0.94, "end": 0.32, "stagger": 0.065});
scrollDetail({"id": "beliefs-editorial-focus", "selector": ".beliefs-reflection figure img", "kind": "focus", "distance": 0, "start": 0.94, "end": 0.32, "stagger": 0.065});

// The chapter index follows the section currently being read in both directions.
// It never hides or replaces the doctrine text; direct anchors work without JS.
const chapters=[...document.querySelectorAll<HTMLElement>('.beliefs-chapter')];
const links=[...document.querySelectorAll<HTMLAnchorElement>('.beliefs-index-link')];
const updateIndex=()=>{
 let current=0;
 const line=innerHeight*.43;
 chapters.forEach((chapter,index)=>{if(chapter.getBoundingClientRect().top<=line)current=index});
 links.forEach((link,index)=>{
  const active=index===current;
  link.classList.toggle('is-active',active);
  if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');
 });
};
const stop=createTransport(updateIndex);
addEventListener('pageswap',stop,{once:true});
