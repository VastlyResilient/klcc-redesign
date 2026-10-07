import {scrollDetail} from '../scroll-detail.js';
// Slab Hydra next-project frames014–016: artwork moves up with native scroll.
// KLCC uses a bounded 160px continuation, explicit signup, no automatic navigation.
const stage=document.querySelector<HTMLElement>('.kids-next-art');
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches||document.body.classList.contains('motion-reduced')||innerWidth<=700;
let queued=false;
const update=()=>{queued=false;if(!stage)return;const y=reduced()?0:Math.max(0,Math.min(160,(stage.getBoundingClientRect().top-innerHeight*.2)*.28));stage.style.setProperty('--art-entry',`${y}px`)};
const schedule=()=>{if(!queued){queued=true;requestAnimationFrame(update)}};
addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);addEventListener('klcc-motion-change',schedule);matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',schedule);update();
// Inspector bounds are the exact native-scroll interval used above:
// y=160 at artTop-.2vh-160/.28 and y=0 at artTop-.2vh.
const scenes=(window as any).__klccScenes??=((new Map()));
const sceneId='kids-volunteer-art-continuation';
const bounds=()=>{const end=(stage?.getBoundingClientRect().top??0)+scrollY-innerHeight*.2;return{start:end-160/.28,end}};
const syncInspector=()=>{if(stage&&!reduced())scenes.set(sceneId,{bounds});else scenes.delete(sceneId)};
addEventListener('resize',syncInspector);addEventListener('klcc-motion-change',syncInspector);matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',syncInspector);syncInspector();
addEventListener('pageswap',()=>{scenes.delete(sceneId);removeEventListener('scroll',schedule);removeEventListener('resize',schedule);removeEventListener('resize',syncInspector);removeEventListener('klcc-motion-change',schedule);removeEventListener('klcc-motion-change',syncInspector)},{once:true});

// Native-scroll detail: Slab continuation adapted to this page’s semantic reading/media roles.
// Reverse follows position; these distances/thresholds are authored estimates, not Framer editor settings.
scrollDetail({"id": "kids-campus-arrival", "selector": ".orientation-photo", "kind": "image", "distance": 28, "start": 0.94, "end": 0.32, "stagger": 0.065});
scrollDetail({"id": "kids-volunteer-reading", "selector": ".kids-team-reading>div>p", "kind": "rise", "distance": 24, "start": 0.94, "end": 0.32, "stagger": 0.065});
