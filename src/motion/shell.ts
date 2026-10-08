import './text-choreography.js';
const header=document.querySelector('.site-header')!,menu=document.querySelector<HTMLDialogElement>('#site-menu')!,toggle=document.querySelector<HTMLButtonElement>('.menu-toggle')!;
const underlayIsLight=()=>{
 const y=Math.max(1,Math.min(innerHeight-1,header.getBoundingClientRect().height*.5));
 const samples=[innerWidth*.2,innerWidth*.5,innerWidth*.8];
 let light=0;
 for(const x of samples){
  const surface=document.elementsFromPoint(x,y).find(el=>{
   if(el===header||header.contains(el))return false;
   const c=getComputedStyle(el).backgroundColor.match(/rgba?\(([^)]+)\)/);
   return Boolean(c&&Number(c[1].split(',')[3]??1)>.15);
  });
  if(!surface)continue;
  const c=getComputedStyle(surface).backgroundColor.match(/rgba?\(([^)]+)\)/);
  if(!c)continue;
  const [r,g,b]=c[1].split(',').map(Number);
  const luminance=(.2126*r+.7152*g+.0722*b)/255;
  if(luminance>.67)light++;
 }
 return light>=2;
};
const settle=()=>{const strength=Math.max(0,Math.min(1,scrollY/220));header.style.setProperty('--glass-strength',strength.toFixed(3));header.classList.toggle('is-glass',strength>.85);header.classList.toggle('on-light',underlayIsLight())};addEventListener('scroll',settle,{passive:true});addEventListener('resize',settle);settle();
const close=()=>{menu.close();toggle.setAttribute('aria-expanded','false');document.documentElement.classList.remove('no-scroll');toggle.focus()};toggle.addEventListener('click',()=>{menu.showModal();toggle.setAttribute('aria-expanded','true');document.documentElement.classList.add('no-scroll')});menu.querySelector('.menu-close')?.addEventListener('click',close);menu.addEventListener('cancel',e=>{e.preventDefault();close()});
for(const a of document.querySelectorAll<HTMLAnchorElement>('nav a,#site-menu a'))if(new URL(a.href).pathname===location.pathname)a.setAttribute('aria-current','page');
const motion=document.querySelector<HTMLButtonElement>('.motion-choice')!;const apply=()=>{const on=localStorage.getItem('klcc-motion')==='reduced';document.body.classList.toggle('motion-reduced',on);motion.setAttribute('aria-pressed',String(on));dispatchEvent(new Event('klcc-motion-change'))};motion.addEventListener('click',()=>{localStorage.setItem('klcc-motion',localStorage.getItem('klcc-motion')==='reduced'?'full':'reduced');apply()});apply();
if(['localhost','127.0.0.1'].includes(location.hostname)&&new URLSearchParams(location.search).has('motion-inspect')){const inspectorUrl=new URL('../.dev/inspector.js',location.href).href;import(inspectorUrl)};
