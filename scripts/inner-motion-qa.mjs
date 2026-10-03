import{chromium}from'playwright';import fs from'node:fs';
const base=process.env.KLCC_BASE||'http://127.0.0.1:4197/';
console.log('Starting motion browser');const b=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});const results=[],errors=[];console.log('Browser ready');
for(const width of[1440,390]){const p=await b.newPage({viewport:{width,height:844}});
 for(const route of Object.keys(JSON.parse(fs.readFileSync(new URL('../content.json',import.meta.url))).pages).filter(r=>r!=='/')){
 await p.goto(new URL(route.slice(1)+'/',base).href,{waitUntil:'domcontentloaded'});await p.locator('.has-chapter-motion').waitFor();
 await p.evaluate(()=>document.fonts.ready);
 const states=await p.evaluate(async()=>{const el=document.querySelector('[data-stop]')||document.querySelector('[data-motion-sequence]');scrollTo({top:el.getBoundingClientRect().top+scrollY-innerHeight*.3,behavior:'instant'});await new Promise(r=>setTimeout(r,650));const key=el.hasAttribute('data-stop')?'--stop-progress':'--chapter-arrival';const y=el.getBoundingClientRect().top+scrollY;const values=[];for(const offset of[innerHeight*.82,innerHeight*.3,innerHeight*.82]){scrollTo({top:Math.max(0,y-offset),behavior:'instant'});await new Promise(r=>setTimeout(r,600));values.push(+getComputedStyle(el).getPropertyValue(key));}return {key,values}});
 if(!(states.values[1]>states.values[0]&&Math.abs(states.values[2]-states.values[0])<.03))errors.push(`${route} ${width}: forward/reverse ${JSON.stringify(states)}`);
 const end=await p.evaluate(async()=>{scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'});await new Promise(r=>setTimeout(r,700));return{closing:+getComputedStyle(document.querySelector('[data-closing-motion]')).getPropertyValue('--closing-progress'),hidden:[...document.querySelectorAll('[data-reveal]')].filter(e=>e.getBoundingClientRect().top<0&&getComputedStyle(e).opacity==='0').length}});
 if(end.closing<.99||end.hidden)errors.push(`${route} ${width}: stranded content ${JSON.stringify(end)}`);
 results.push({route,width,...states,...end});console.log('Checked',route,width);
 }await p.close();}
const p=await b.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});await p.goto(new URL('youth/',base).href,{waitUntil:'domcontentloaded'});const reduced=await p.locator('[data-stop]').first().evaluate(el=>getComputedStyle(el).getPropertyValue('--stop-progress'));if(+reduced!==1)errors.push('Reduced motion did not resolve stops');console.log('All motion assertions complete; closing browser');await Promise.race([b.close(),new Promise(r=>setTimeout(r,5000))]);
if(process.env.KLCC_MOTION_REPORT)fs.writeFileSync(process.env.KLCC_MOTION_REPORT,JSON.stringify({base,results,errors},null,2));
if(errors.length){console.error(errors.join('\n'));process.exit(1)}console.log('PASS: 27 inner routes × desktop/phone, advancing and reversing section motion, no stranded content, reduced motion.');process.exit(0);
