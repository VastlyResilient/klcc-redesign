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
  const initialWords = await page.evaluate(() => ({
    letters:[...document.querySelectorAll('.film-letter')].map(el => +getComputedStyle(el).opacity),
    service:+getComputedStyle(document.querySelector('.film-rail strong')).opacity,
    header:+getComputedStyle(document.querySelector('.header-nav')).opacity,
    marqueeHeight:document.querySelector('.film-marquee').getBoundingClientRect().height,
    railHeight:document.querySelector('.film-rail').getBoundingClientRect().height,
  }));
  assert(initialWords.letters.every(x=>x<.1) && initialWords.service<.1 && initialWords.header<.1 && initialWords.marqueeHeight<2 && initialWords.railHeight<2, `home ${viewport.width}: opening is not text-free`);
  await page.evaluate(() => scrollTo(0, (document.querySelector('.film-travel').offsetHeight-innerHeight)*.2));
  await page.waitForTimeout(200);
  const stagger = await page.evaluate(() => ({first:+getComputedStyle(document.querySelector('.film-letter')).opacity,last:+getComputedStyle([...document.querySelectorAll('.film-letter')].at(-1)).opacity}));
  assert(stagger.first>.9 && stagger.last<.1, `home ${viewport.width}: lettering did not arrive individually`);
  await page.evaluate(() => scrollTo(0, document.querySelector('.film-travel').offsetHeight * .65));
  await page.waitForTimeout(300);
  const middle = await page.locator('.film-copy h1 span').first().evaluate(el => +getComputedStyle(el).opacity);
  assert(middle > .9, `home ${viewport.width}: early film copy did not reveal`);
  await page.evaluate(() => scrollTo(0, document.querySelector('.film-travel').offsetHeight - innerHeight));
  await page.waitForTimeout(300);
  const final = await page.locator('.film-rail a').last().evaluate(el => +getComputedStyle(el).opacity);
  assert(final > .9, `home ${viewport.width}: final rail CTA did not reveal`);
  const finalWords = await page.evaluate(() => ({last:+getComputedStyle([...document.querySelectorAll('.film-letter')].at(-1)).opacity,service:+getComputedStyle(document.querySelector('.film-rail strong')).opacity}));
  assert(finalWords.last>.9 && finalWords.service>.9, `home ${viewport.width}: final words missing`);
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
  await page.goto(new URL('#welcome',base).href);
  await page.locator('.welcome-worship img').waitFor();
  assert(await page.locator('.welcome-worship img').isVisible(), `home ${viewport.width}: worship image missing from welcome`);
  assert(await page.locator('.welcome-arrival img').isVisible(), `home ${viewport.width}: arrival image missing from welcome`);
  const actionRoutes = ['life-groups','alpha','courses','membership'];
  assert(await page.locator('.journey-card').count() === actionRoutes.length, `home ${viewport.width}: four original action paths are not present`);
  const cardArt = await page.locator('.journey-card').evaluateAll(cards => cards.map(card => getComputedStyle(card, '::before').backgroundImage));
  assert(cardArt.every((value, index) => value.includes(`klcc-${['life-groups','alpha','wednesday','membership'][index]}-original.jpg`)), `home ${viewport.width}: original program artwork is missing`);
  const iconAssets = await page.locator('.journey-icon img').evaluateAll(images => images.map(img => img.complete && img.naturalWidth > 0));
  assert(iconAssets.length === 4 && iconAssets.every(Boolean), `home ${viewport.width}: a program icon failed to load`);
  for (let i = 0; i < actionRoutes.length; i++) {
    const card = page.locator('.journey-card').nth(i);
    await card.scrollIntoViewIfNeeded();
    assert(await card.isVisible(), `home ${viewport.width}: ${actionRoutes[i]} card is not visible`);
    const href = await card.getAttribute('href');
    assert(new URL(href,base).pathname.endsWith(`/${actionRoutes[i]}/`), `home ${viewport.width}: ${actionRoutes[i]} destination changed`);
  }
  assert((await page.locator('.journey-more a').getAttribute('href')).endsWith('/serve/'), `home ${viewport.width}: serving path was lost`);
  await page.close();
}

for (const [index,route] of ['life-groups','alpha','courses','membership'].entries()) {
  const page = await browser.newPage({viewport:{width:index%2?390:1440,height:900}});
  await page.goto(base);
  await page.locator('.journey-card').nth(index).click();
  assert(new URL(page.url()).pathname.endsWith(`/${route}/`), `${route}: homepage action did not navigate to redesigned page`);
  assert(await page.locator('.detail-hero h1').isVisible(), `${route}: destination page is not visible`);
  await page.close();
}

const reducedPage = await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
await reducedPage.goto(new URL('#next-steps',base).href);
const reducedIcons = await reducedPage.locator('.journey-icon').evaluateAll(icons => icons.map(icon => ({opacity:+getComputedStyle(icon).opacity,animation:getComputedStyle(icon).animationName})));
assert(reducedIcons.every(icon => icon.opacity === 1 && icon.animation === 'none'), 'reduced motion: program icons are hidden or animated');
await reducedPage.close();

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
console.log(`PASS: ${Object.keys(data.pages).length} direct routes; desktop, tablet and mobile home states; four direct homepage program actions; seven deep-page checks`);
