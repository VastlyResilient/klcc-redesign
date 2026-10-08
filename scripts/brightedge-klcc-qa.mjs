import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const root=path.resolve('art-direction/references/brightedge-deep-2026-10-08/klcc-qa');
await fs.mkdir(root,{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const routes={
 membership:{root:'.member-journey',item:'.member-steps article'},
 alpha:{root:'.alpha-brief-copy',item:'.alpha-brief-copy article'},
 believe:{root:'.believe-step-pair',item:'.believe-step-pair article'},
 baptism:{root:'.baptism-dates',item:'.baptism-dates article'},
 'life-groups':{root:'.group-rows',item:'.group-rows article'},
 app:{root:'.app-use-links',item:'.app-use-links a'},
 'previous-messages':{root:'.archive-field',item:'.archive-message'},
};
const sizes={desktop:[1440,900],tablet:[834,1112],phone:[390,844]};
const results=[];
for(const [slug,selectors] of Object.entries(routes))for(const [size,[width,height]] of Object.entries(sizes)){
 const page=await browser.newPage({viewport:{width,height},reducedMotion:'no-preference'});
 const errors=[];page.on('pageerror',error=>errors.push(String(error)));
 await page.goto(`http://127.0.0.1:4201/${slug}/`,{waitUntil:'domcontentloaded'});
 await page.addStyleTag({content:'html,body{scroll-behavior:auto!important}'});
 await page.evaluate(()=>document.fonts.ready);
 const rootLoc=page.locator(selectors.root);
 if(!await rootLoc.count()){results.push({slug,size,error:'missing sequence root'});await page.close();continue}
 const at=async(fraction)=>{
  await page.evaluate(([sel,f])=>{const el=document.querySelector(sel);window.scrollTo({top:el.getBoundingClientRect().top+scrollY+el.getBoundingClientRect().height*f-innerHeight*.4,behavior:'instant'})},[selectors.root,fraction]);
  await page.waitForTimeout(120);
  return await page.evaluate(([root,item])=>{const r=document.querySelector(root),nodes=[...document.querySelectorAll(item)];return{scroll:scrollY,chapter:r?.dataset.chapter,progress:r?.style.getPropertyValue('--sequence-progress')||r?.querySelector('.member-steps')?.style.getPropertyValue('--journey-progress'),items:nodes.map(i=>{const s=getComputedStyle(i);return{opacity:s.opacity,translate:s.translate}}),overflow:document.documentElement.scrollWidth>innerWidth+2}},[selectors.root,selectors.item]);
 };
 const opening=await at(.05),middle=await at(.52);
 if(size==='desktop'||size==='phone')await page.screenshot({path:path.join(root,`${slug}-${size}-middle.png`)});
 const ending=await at(.95),reverse=await at(.05);
 results.push({slug,size,opening,middle,ending,reverse,errors});
 await page.close();
}
await browser.close();
await fs.writeFile(path.join(root,'results.json'),JSON.stringify({capturedAt:new Date().toISOString(),results},null,2));
console.log(JSON.stringify({cases:results.length,errors:results.filter(r=>r.error||r.errors?.length),horizontalOverflow:results.filter(r=>[r.opening,r.middle,r.ending,r.reverse].some(v=>v?.overflow)).map(r=>`${r.slug}:${r.size}`)},null,2));
