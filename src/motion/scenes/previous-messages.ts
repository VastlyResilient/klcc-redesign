import {scrollDetail} from '../scroll-detail.js';
import {brightedgeSequence} from '../brightedge-sequence.js';

const choices=[...document.querySelectorAll<HTMLButtonElement>('.archive-choice')];
const image=document.querySelector<HTMLImageElement>('#archive-stage-image');
const artLink=document.querySelector<HTMLAnchorElement>('.archive-art-link');
const watchLink=document.querySelector<HTMLAnchorElement>('#archive-stage-watch');
const title=document.querySelector<HTMLElement>('#archive-stage-title');
const details=document.querySelector<HTMLElement>('#archive-stage-details');
const number=document.querySelector<HTMLElement>('#archive-stage-number');
let selection=0;

function selectMessage(choice:HTMLButtonElement){
 if(!image||!artLink||!watchLink||!title||!details||!number)return;
 if(choice.classList.contains('is-selected'))return;
 const token=++selection;
 const source=choice.dataset.image||'';
 const preview=new Image();
 preview.onload=()=>{
  if(token!==selection)return;
  choices.forEach(button=>{const active=button===choice;button.classList.toggle('is-selected',active);button.setAttribute('aria-pressed',String(active))});
  image.removeAttribute('srcset');
  image.src=source;image.alt=choice.dataset.alt||'';
  title.textContent=choice.dataset.title||'';
  details.textContent=choice.dataset.details||'';
  number.textContent=choice.dataset.number||'';
  artLink.href=watchLink.href=choice.dataset.url||'#';
  artLink.setAttribute('aria-label',`Watch ${choice.dataset.title||'this message'} on Subsplash`);
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&!document.body.classList.contains('motion-reduced')){
   image.animate([{opacity:.55,transform:'scale(.992)'},{opacity:1,transform:'scale(1)'}],{duration:420,easing:'cubic-bezier(.2,.7,.2,1)'});
   title.animate([{opacity:.6,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:360,easing:'cubic-bezier(.2,.7,.2,1)'});
  }
 };
 preview.onerror=()=>{if(token===selection)choice.focus()};
 preview.src=source;
}

choices.forEach(choice=>choice.addEventListener('click',()=>selectMessage(choice)));
brightedgeSequence({id:'message-index',root:'.archive-choices',items:'.archive-choice',axis:'vertical',distance:18,interval:.045});
scrollDetail({id:'archive-library',selector:'.archive-library h2',kind:'rise',distance:30});
