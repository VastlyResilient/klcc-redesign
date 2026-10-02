import { chromium } from 'playwright';
import fs from 'node:fs';

const base = process.env.KLCC_BASE || 'http://127.0.0.1:4197/';
const data = JSON.parse(fs.readFileSync(new URL('../content.json', import.meta.url)));
const browser = await chromium.launch({ headless: true, executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const errors = [];
function assert(ok, message) { if (!ok) errors.push(message); }

for (const route of Object.keys(data.pages)) {
  const url = new URL(route === '/' ? '' : route.slice(1) + '/', base).href;
  const response = await fetch(url);
  assert(response.ok, `${route}: direct page returned ${response.status}`);
}

for (const viewport of [{width:1440,height:900},{width:390,height:844},{width:768,height:1024}]) {
  const page = await browser.newPage({viewport});
  await page.goto(base);
  await page.locator('.site-header').waitFor();
  assert(await page.locator('.brand img').isVisible(), `home ${viewport.width}: logo missing`);
  assert(await page.locator('.menu-button').isVisible(), `home ${viewport.width}: menu missing`);
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2), `home ${viewport.width}: horizontal overflow`);
  const opening = await page.locator('.film-copy h1 span').first().evaluate(el => +getComputedStyle(el).opacity);
  assert(opening < .1, `home ${viewport.width}: film copy revealed before scroll`);
  await page.evaluate(() => scrollTo(0, document.querySelector('.film-travel').offsetHeight * .65));
  await page.waitForTimeout(300);
  const middle = await page.locator('.film-copy h1 span').first().evaluate(el => +getComputedStyle(el).opacity);
  assert(middle > .9, `home ${viewport.width}: early film copy did not reveal`);
  await page.evaluate(() => scrollTo(0, document.querySelector('.film-travel').offsetHeight - innerHeight));
  await page.waitForTimeout(300);
  const final = await page.locator('.film-rail a').last().evaluate(el => +getComputedStyle(el).opacity);
  assert(final > .9, `home ${viewport.width}: final rail CTA did not reveal`);
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(300);
  const reverse = await page.locator('.film-copy h1 span').first().evaluate(el => +getComputedStyle(el).opacity);
  assert(reverse < .1, `home ${viewport.width}: reverse reveal did not reset`);
  await page.locator('.menu-button').click();
  await page.waitForTimeout(350);
  assert(await page.locator('.menu-panel').getAttribute('aria-hidden') === 'false', `home ${viewport.width}: menu did not open`);
  assert(await page.locator('.menu-group a').first().isVisible(), `home ${viewport.width}: menu link invisible`);
  await page.keyboard.press('Escape');
  assert(await page.locator('.menu-panel').getAttribute('aria-hidden') === 'true', `home ${viewport.width}: menu did not close`);
  await page.close();
}

for (const route of ['/new','/mission','/courses','/kids','/calendar','/give','/watch-live']) {
  const page = await browser.newPage({viewport:{width:390,height:844}});
  await page.goto(new URL(route.slice(1)+'/',base).href);
  await page.locator('.detail-hero h1').waitFor();
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2), `${route}: horizontal overflow`);
  const bad = await page.locator('a[href]').evaluateAll(links => links.filter(a => /^https?:\/\/(www\.)?klcc\.us\b/i.test(a.href)).map(a => a.href));
  assert(bad.length === 0, `${route}: original-site links ${bad.join(', ')}`);
  if (['/calendar','/give','/watch-live'].includes(route)) assert(await page.locator('.media-panel iframe').count() === 1, `${route}: integration missing`);
  await page.close();
}

await browser.close();
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`PASS: ${Object.keys(data.pages).length} direct routes; desktop, tablet and mobile home states; seven deep-page checks`);
