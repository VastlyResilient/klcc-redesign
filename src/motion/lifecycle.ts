import {createTransport} from './transport.js';
export const clamp=(v:number)=>Math.max(0,Math.min(1,v));
export function registerScene(id:string,element:HTMLElement,render:(p:number)=>void,start=.8,end=.2){
 const bounds=()=>({start:element.getBoundingClientRect().top+scrollY-innerHeight*start,end:element.getBoundingClientRect().bottom+scrollY-innerHeight*end});
 const w=window as any;w.__klccScenes??=new Map();w.__klccScenes.set(id,{bounds});const mq=matchMedia('(prefers-reduced-motion: reduce)');
 const update=()=>{const b=bounds();render(mq.matches?1:clamp((scrollY-b.start)/(b.end-b.start||1)))};
 const clean=createTransport(update);mq.addEventListener('change',update);addEventListener('pageswap',clean,{once:true});return()=>{clean();mq.removeEventListener('change',update);w.__klccScenes.delete(id)};
}
