// Hydrate each static route with its finished HTML so search and no-JS clients see content.
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const base = process.env.KLCC_BASE || 'http://127.0.0.1:4197/';
const content = JSON.parse(fs.readFileSync(path.join(root,'content.json')));
const browser = await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
for(const route of Object.keys(content.pages)){
  const url=new URL((route==='/'?'':route.slice(1)+'/')+'?prerender=1',base).href;
  const page=await browser.newPage();
  await page.goto(url,{waitUntil:'domcontentloaded'});
  await page.locator('#app .site-header').waitFor();
  const rendered=(await page.locator('#app').innerHTML()).replace(/ inert=""/g,'').replace('id="menuPanel" aria-hidden="true"','id="menuPanel"').replace(/ tabindex="-1"/g,'');
  const file=path.join(root,route==='/'?'index.html':path.join(route.slice(1),'index.html'));
  let shell=fs.readFileSync(file,'utf8');
  shell=shell.replace(/<div id="app">[\s\S]*?<\/div>(?=\s*<script defer)/,`<div id="app">${rendered}</div>`);
  fs.writeFileSync(file,shell);
  await page.close();
}
await browser.close();
console.log(`Prerendered ${Object.keys(content.pages).length} pages`);
