/** Bounded, reversible text motion for the authored inner routes.
 * Reference notes: art-direction/references/text-motion-map.md.
 * The source templates establish the motion families; these scroll ranges and
 * distances are KLCC adaptations, not claimed Framer editor settings.
 */
import {createTransport} from './transport.js';

type Mode='words'|'emphasis'|'quiet'|'index';
type Moment={section:string;mode:Mode;target?:string;track?:'section'};
const plans:Record<string,Moment[]>={
 '404':[{section:'missing-route',target:'h2',mode:'quiet'}],
 alpha:[{section:'alpha-conversation',mode:'words'},{section:'alpha-films',mode:'quiet'}],
 app:[{section:'app-use',target:'.eyebrow',mode:'index'}],
 baptism:[{section:'baptism-dates',mode:'index'},{section:'baptism-preparation',mode:'words'}],
 beliefs:[{section:'beliefs-statement',mode:'emphasis'}],
 believe:[{section:'believe-steps',mode:'words'},{section:'believe-scripture',mode:'emphasis'}],
 calendar:[{section:'calendar-agenda',mode:'index'},{section:'calendar-paths',mode:'quiet'}],
 courses:[{section:'courses-fall',mode:'words'},{section:'courses-seasons',mode:'index'},{section:'courses-marriage',mode:'quiet'}],
 easter:[{section:'expect',mode:'words'},{section:'easter-connect',mode:'quiet'}],
 give:[{section:'give-methods',mode:'index'},{section:'give-generosity',mode:'quiet'},{section:'give-reading',mode:'emphasis'}],
 kids:[{section:'kids-team',mode:'words'}],
 leadership:[{section:'founding-leaders',mode:'quiet'},{section:'pastoral-team',mode:'words'}],
 legal:[{section:'legal-services',mode:'quiet'}],
 'life-groups':[{section:'groups-introduction',mode:'words'},{section:'groups-directory',mode:'index'}],
 membership:[{section:'membership-journey',mode:'words',track:'section'}],
 men:[{section:'men-study',mode:'quiet'},{section:'men-calendar',mode:'index'}],
 mission:[{section:'mission-reading',mode:'emphasis'}],
 new:[{section:'visit-plan',mode:'words'},{section:'visit-next',mode:'index'},{section:'visit-care',mode:'quiet'}],
 'our-story':[{section:'story-chapters',mode:'words'},{section:'story-founders',mode:'quiet'}],
 'pastoral-care':[{section:'care-request',target:'.care-expectation > p:last-child',mode:'quiet'},{section:'care-request',target:'.care-quote',mode:'emphasis'}],
 prayer:[{section:'gather',mode:'quiet'},{section:'scripture',mode:'emphasis'}],
 'previous-messages':[{section:'archive-selection',mode:'quiet'},{section:'archive-library',mode:'index'}],
 serve:[{section:'serve-purpose',mode:'emphasis'}],
 'subsplash-media':[{section:'message-player',mode:'words'},{section:'message-categories',mode:'index'}],
 'watch-live':[{section:'live-player',mode:'quiet'},{section:'watch-live-section-2',mode:'words'}],
 'weather-procedures':[{section:'weather-channels',mode:'index'},{section:'weather-volunteer',mode:'quiet'}],
 women:[{section:'women-purpose',mode:'emphasis'}],
 'young-adults':[{section:'ya-events',mode:'words'}],
 youth:[{section:'age-paths',mode:'index'},{section:'elevate-connect',mode:'words'}]
};

const clamp=(n:number)=>Math.max(0,Math.min(1,n));
const ease=(n:number)=>n*n*(3-2*n);
const route=document.body.dataset.route||'';
const plan=plans[route]||[];
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
type Unit={anchor:HTMLElement;track:HTMLElement;mode:Mode;words:HTMLElement[];copy:HTMLElement|null;label:HTMLElement|null;id:string};
const units:Unit[]=[];
const registry=(window as any).__klccScenes??=new Map();

function splitWords(target:HTMLElement){
 const walker=document.createTreeWalker(target,NodeFilter.SHOW_TEXT);
 const nodes:Text[]=[];while(walker.nextNode())nodes.push(walker.currentNode as Text);
 const words:HTMLElement[]=[];
 for(const node of nodes){
  if(!node.textContent?.trim())continue;
  const fragment=document.createDocumentFragment();
  for(const part of node.textContent.split(/(\s+)/)){
   if(!part)continue;
   if(/^\s+$/.test(part)){fragment.append(document.createTextNode(part));continue}
   const span=document.createElement('span');span.className='klcc-text-word';span.textContent=part;
   fragment.append(span);words.push(span);
  }
  node.replaceWith(fragment);
 }
 return words;
}

for(const [index,moment] of plan.entries()){
 const section=document.getElementById(moment.section);
 if(!section)continue;
 const anchor=moment.target?section.querySelector<HTMLElement>(moment.target):section.querySelector<HTMLElement>('h2,h3');
 if(!anchor||anchor.closest('summary,button,a'))continue;
 const track=moment.track==='section'?section:anchor;
 const words=splitWords(anchor);
 if(!words.length)continue;
 anchor.dataset.textChoreography=moment.mode;
 const copy=!moment.target?[...section.querySelectorAll<HTMLElement>('p')].find(p=>
  !p.classList.contains('eyebrow')&&!p.classList.contains('event-label')&&
  !p.closest('figure,figcaption,summary,details,form')&&p.textContent!.trim().length>=48&&
  p.textContent!.trim().length<=360&&!p.dataset.scrollDetail&&
  p.childElementCount===0
 )||null:null;
 let copyInner:HTMLElement|null=null;
 if(copy){copyInner=document.createElement('span');copyInner.className='klcc-text-copy';copyInner.textContent=copy.textContent;copy.replaceChildren(copyInner)}
 const label=moment.mode==='index'?section.querySelector<HTMLElement>('.eyebrow'):null;
 const id=`text-${route}-${index}`;
 const bounds=()=>{
  const top=track.getBoundingClientRect().top+scrollY;
  const maxScroll=Math.max(0,document.documentElement.scrollHeight-innerHeight);
  const end=Math.min(top-innerHeight*.37,maxScroll);
  return {start:Math.min(top-innerHeight*.91,end-innerHeight*.2),end};
 };
 registry.set(id,{bounds});
 units.push({anchor,track,mode:moment.mode,words,copy:copyInner,label,id});
}

function render(){
 const still=reduced.matches||document.body.classList.contains('motion-reduced');
 for(const unit of units){
  const top=unit.track.getBoundingClientRect().top+scrollY;
  const maxScroll=Math.max(0,document.documentElement.scrollHeight-innerHeight);
  const end=Math.min(top-innerHeight*.37,maxScroll);
  const start=Math.min(top-innerHeight*.91,end-innerHeight*.2);
  const progress=still?1:ease(clamp((scrollY-start)/Math.max(1,end-start)));
  const count=unit.words.length;
  for(const [i,word] of unit.words.entries()){
   const phase=count<2?0:i/count*(unit.mode==='words'?.36:unit.mode==='emphasis'?.42:.18);
   const local=still?1:ease(clamp((progress-phase)/(1-phase)));
   const distance=unit.mode==='words'?14:unit.mode==='quiet'?7:unit.mode==='index'?5:0;
   word.style.opacity=String((unit.mode==='emphasis'?.66:.73)+local*(unit.mode==='emphasis'?.34:.27));
   word.style.transform=`translate3d(0,${((1-local)*distance*(innerWidth<=700?.65:1)).toFixed(2)}px,0)`;
  }
  if(unit.copy){
   const delayed=still?1:ease(clamp((progress-.18)/.82));
   unit.copy.style.opacity=String(.82+delayed*.18);
   unit.copy.style.transform=`translate3d(0,${((1-delayed)*(unit.mode==='quiet'?6:10)*(innerWidth<=700?.65:1)).toFixed(2)}px,0)`;
  }
  if(unit.label&&unit.mode==='index')unit.label.style.setProperty('--text-index-progress',String(progress));
 }
}
if(units.length){
 const cleanup=createTransport(render);
 reduced.addEventListener('change',render);
 addEventListener('klcc-motion-change',render);
 addEventListener('pageswap',()=>{cleanup();reduced.removeEventListener('change',render);removeEventListener('klcc-motion-change',render);for(const unit of units)registry.delete(unit.id)},{once:true});
 render();
}
