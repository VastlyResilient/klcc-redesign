import {chromium} from 'playwright';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const base=process.env.KLCC_BASE||'http://127.0.0.1:4198/';
const corpus=JSON.parse(fs.readFileSync(new URL('../content.json',import.meta.url)));
const registry=JSON.parse(fs.readFileSync(new URL('../blueprints.json',import.meta.url)));
assert.equal(Object.keys(registry).length,27);
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const results=[];
for(const viewport of [{width:1440,height:900},{width:768,height:1024},{width:390,height:844}]){
 const p=await browser.newPage({viewport});
 for(const route of Object.keys(corpus.pages)){
  await p.goto(new URL(route==='/'?'':route.slice(1)+'/',base).href);await p.waitForTimeout(150);
  assert.equal(await p.locator('.site-header').count(),1,route+' header');
  assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),route+' overflow');
  if(route!=='/'){
   assert.equal(await p.locator('.folio-page').count(),1,route+' explicitcomposition');
   assert.equal(await p.locator('.detail-closer').count(),0,route+' genericcloser');
   assert(!await p.locator('main').innerText().then(s=>s.includes('↗')),route+' repeatedarrow');
   const links=await p.locator('a[href]').evaluateAll(els=>els.map(e=>e.getAttribute('href')));
   assert(!links.some(l=>/^https?:\/\/(?:www\.)?klcc\.us(?:\/|$)/.test(l)),route+' olddomain');
   for(const href of links.filter(l=>l.startsWith('#')&&l.length>1))assert(await p.locator('[id="'+href.slice(1)+'"]').count(),route+' missinganchor '+href);
  }
  results.push({route,width:viewport.width,pass:true});
 }
 await p.goto(new URL('youth/',base).href);await p.waitForTimeout(200);const title=p.locator('#section-1 h2 .folio-word').first();await p.evaluate(()=>scrollTo(0,0));const initial=await title.evaluate(e=>+getComputedStyle(e).opacity);await p.locator('#section-1').scrollIntoViewIfNeeded();await p.waitForTimeout(150);const forward=await title.evaluate(e=>+getComputedStyle(e).opacity);await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(150);const reverse=await title.evaluate(e=>+getComputedStyle(e).opacity);assert(forward>initial+.2&&Math.abs(reverse-initial)<.1,'youth actual forwardreverse '+viewport.width);
 await p.goto(base);await p.waitForTimeout(300);const initialProgress=await p.locator('#filmStage').evaluate(el=>+getComputedStyle(el).getPropertyValue('--film-progress'));await p.evaluate(()=>scrollTo(0,(document.querySelector('.film-travel').offsetHeight-innerHeight)*.65));await p.waitForTimeout(200);const finalProgress=await p.locator('#filmStage').evaluate(el=>+getComputedStyle(el).getPropertyValue('--film-progress'));assert(finalProgress>initialProgress+.5,'home scroll intro does not advance '+viewport.width);await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(250);assert(await p.locator('.film-letter').first().evaluate(el=>+getComputedStyle(el).opacity)<.1,'home textreset');
 await p.close();
}
const nojs=await browser.newPage({javaScriptEnabled:false});await nojs.goto(new URL('beliefs/',base).href);assert.equal(await nojs.locator('.folio-belief-list article').count(),9,'static creed');assert(await nojs.locator('.folio-page h1').isVisible(),'nojsheading');await nojs.close();
const reduced=await browser.newPage({reducedMotion:'reduce'});await reduced.goto(new URL('new/',base).href);assert(await reduced.locator('.folio-word').first().evaluate(e=>+getComputedStyle(e).opacity)>.9,'reducedmotionreadable');await reduced.close();await browser.close();
fs.writeFileSync('/tmp/klcc-folio-qa.json',JSON.stringify({results,scenarios:['home-scroll-intro-advancement','forward-reverse','nojs-creed','reduced-motion','anchors','local-routing']},null,2));console.log('PASS: 84 route/viewport combinations, scroll-intro and accessibility regressions');
