import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {chromium}=require('playwright');
const sharp=require('sharp');
const routes=['404','alpha','app','baptism','beliefs','believe','calendar','courses','easter','give','kids','leadership','legal','life-groups','membership','men','mission','new','our-story','pastoral-care','prayer','previous-messages','serve','subsplash-media','watch-live','weather-procedures','women','young-adults','youth'];
const base=process.argv[2]||'http://127.0.0.1:4201/';
const out='art-direction/qa/text-choreography';await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const results=[];
for(const [name,width,height]of[['desktop',1440,900],['tablet',768,1024],['phone',390,844]]){
 const page=await browser.newPage({viewport:{width,height}});
 for(const route of routes){
  const errors=[];const onError=error=>errors.push(String(error));page.on('pageerror',onError);
  await page.goto(new URL(route+'/',base).href,{waitUntil:'load'});
  await page.evaluate(async()=>{await document.fonts.ready;document.documentElement.style.scrollBehavior='auto'});
  const state=await page.evaluate(()=>({
   count:document.querySelectorAll('[data-text-choreography]').length,
   ids:[...(window.__klccScenes?.keys()||[])].filter(id=>id.startsWith('text-')),
   width:document.documentElement.scrollWidth,
   viewport:innerWidth,
   maxScroll:document.documentElement.scrollHeight-innerHeight
  }));
  let motion=null;
  const eligible=await page.evaluate(()=>[...(window.__klccScenes?.entries()||[])].filter(([id])=>id.startsWith('text-')).map(([id,scene])=>({id,...scene.bounds()})).find(item=>item.start>20&&item.end-item.start>80));
  if(eligible){
   const target=eligible.id;
   const read=async top=>{
    await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),top);
    await page.waitForTimeout(70);
    return page.evaluate(id=>{
     const number=Number(id.split('-').at(-1));const node=document.querySelectorAll('[data-text-choreography]')[number];
     return {scrollY,opacity:Number(getComputedStyle(node.querySelector('.klcc-text-word')).opacity),top:node.getBoundingClientRect().top};
    },target);
   };
   const before=await read(eligible.start-15);
   const after=await read(eligible.end+15);
   const reverse=await read(eligible.start-15);
   motion={target,before,after,reverse};
   if(['kids','mission','calendar','pastoral-care'].includes(route)){
    await read((eligible.start+eligible.end)/2);
    await page.screenshot({path:path.join(out,`${route}-${name}-middle.png`)});
    await read(eligible.end+15);
    await page.screenshot({path:path.join(out,`${route}-${name}-settled.png`)});
   }
  }
  const scene=eligible||await page.evaluate(()=>[...(window.__klccScenes?.entries()||[])].filter(([id])=>id.startsWith('text-')).map(([,value])=>value.bounds())[0]);
  if(scene){await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),Math.max(0,(scene.start+scene.end)/2));await page.waitForTimeout(70)}
  await page.screenshot({path:path.join(out,`${route}-${name}-review.jpg`),type:'jpeg',quality:72});
  results.push({route,viewport:name,...state,motion,errors});page.off('pageerror',onError);
 }
 await page.close();
}
for(const route of ['kids','calendar','pastoral-care']){
 const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await page.goto(new URL(route+'/',base).href,{waitUntil:'load'});
 const state=await page.evaluate(()=>{const node=document.querySelector('.klcc-text-word');return{route:document.body.dataset.route,opacity:node?Number(getComputedStyle(node).opacity):null,transform:node?getComputedStyle(node).transform:null}});
 results.push({route,viewport:'reduced-phone',...state});await page.close();
}
await browser.close();
for(const [name,cellWidth,cellHeight,columns]of[['desktop',360,225,4],['tablet',256,341,5],['phone',195,422,6]]){
 const rows=Math.ceil(routes.length/columns),composite=[];
 for(const [index,route]of routes.entries()){
  const image=await sharp(path.join(out,`${route}-${name}-review.jpg`)).resize(cellWidth,cellHeight,{fit:'cover',position:'top'}).jpeg({quality:78}).toBuffer();
  const label=Buffer.from(`<svg width="${cellWidth}" height="28"><rect width="100%" height="100%" fill="#11263d"/><text x="10" y="19" fill="white" font-family="Arial" font-size="14">${route}</text></svg>`);
  const x=(index%columns)*cellWidth,y=Math.floor(index/columns)*(cellHeight+28);
  composite.push({input:image,left:x,top:y+28},{input:label,left:x,top:y});
 }
 await sharp({create:{width:columns*cellWidth,height:rows*(cellHeight+28),channels:3,background:'#11263d'}}).composite(composite).jpeg({quality:83}).toFile(path.join(out,`${name}-contact-sheet.jpg`));
}
const failures=results.filter(row=>row.errors?.length||row.count===0||row.width>row.viewport+2||row.motion&&(row.motion.after.opacity<.97||row.motion.reverse.opacity>=row.motion.after.opacity));
await fs.writeFile(path.join(out,'results.json'),JSON.stringify({created:new Date().toISOString(),base,results,failures},null,2));
console.log(JSON.stringify({routes:routes.length,viewports:3,motionSamples:results.filter(x=>x.motion).length,failures:failures.map(x=>({route:x.route,viewport:x.viewport,count:x.count,errors:x.errors,motion:x.motion}))},null,2));
if(failures.length)process.exitCode=1;
