import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const code=`// Development only: loaded by localhost query, never included in published bundles.
window.__motionInspector={
 async ready(){await document.fonts.ready;await Promise.all([...document.images].filter(i=>i.complete||i.getBoundingClientRect().top<innerHeight).map(i=>Promise.race([i.decode().catch(()=>{}),new Promise(r=>setTimeout(r,2500))])));await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));},
 async seekScene(id,p){const s=window.__klccScenes?.get(id);if(!s)throw Error('Unknown scene '+id);const b=s.bounds();scrollTo({top:b.start+(b.end-b.start)*Math.max(0,Math.min(1,p)),behavior:'instant'});await new Promise(r=>setTimeout(r,180));},
 freeze(){window.__klccFrozen=true;},
 getSceneState(id){const s=window.__klccScenes?.get(id);if(!s)throw Error('Unknown scene '+id);const b=s.bounds();const p=Math.max(0,Math.min(1,(scrollY-b.start)/(b.end-b.start||1)));return {progress:p,scrollStart:b.start,scrollEnd:b.end,active:scrollY>=b.start&&scrollY<=b.end};}
};`;
fs.mkdirSync(path.join(root,'.dev'),{recursive:true});fs.writeFileSync(path.join(root,'.dev/inspector.js'),code);console.log('Development inspector created');
