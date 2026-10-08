import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const base = 'https://brightedge.framer.website';
const out = path.resolve('art-direction/references/brightedge-deep-2026-10-08');
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const sizes = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 834, height: 1112 },
  phone: { width: 390, height: 844 },
};

async function settle(page) {
  await page.evaluate(async () => { await document.fonts.ready; });
  await page.waitForTimeout(900);
}

async function measure(page) {
  return await page.evaluate(() => {
    const interesting = 'header, nav, main, section, article, h1, h2, h3, a, button, img, form, [role="button"]';
    const all = [...document.querySelectorAll(interesting)];
    const vh = innerHeight;
    const visible = all.filter((el) => {
      const r = el.getBoundingClientRect();
      return r.bottom > -vh * .3 && r.top < vh * 1.3 && r.width > 0 && r.height > 0;
    }).slice(0, 80);
    const nodes = visible.map((el) => {
      const r = el.getBoundingClientRect();
      const s = getComputedStyle(el);
      return {
        tag: el.tagName.toLowerCase(),
        text: (el.innerText || el.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim().slice(0, 100),
        href: el.getAttribute('href'),
        rect: [r.x, r.y, r.width, r.height].map(v => +v.toFixed(2)),
        opacity: s.opacity,
        transform: s.transform,
        filter: s.filter,
        clipPath: s.clipPath,
        position: s.position,
        overflow: s.overflow,
        transition: [s.transitionProperty, s.transitionDuration, s.transitionTimingFunction, s.transitionDelay],
        animation: [s.animationName, s.animationDuration, s.animationTimingFunction, s.animationDelay],
      };
    });
    const animations = document.getAnimations({ subtree: true }).slice(0, 25).map((a) => {
      const target = a.effect?.target;
      return {
        target: target instanceof Element ? `${target.tagName.toLowerCase()}${target.id ? '#' + target.id : ''}` : null,
        playState: a.playState,
        currentTime: a.currentTime,
        timing: a.effect?.getTiming(),
        keyframes: a.effect?.getKeyframes?.().slice(0, 8),
      };
    });
    return { y: scrollY, h: document.documentElement.scrollHeight, vh, nodes, animations };
  });
}

async function runRoute(route, label, viewport) {
  const dir = path.join(out, new URL(route).pathname.replace(/^\/+|\/+$/g, '') || 'home', label);
  const saved = path.join(dir, 'capture.json');
  try {
    const prior = JSON.parse(await fs.readFile(saved, 'utf8'));
    if (prior.status === 200 && prior.frames?.length) return { route, label, status: 200, frames: prior.frames.length, reused: true };
  } catch {}
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion: 'no-preference' });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(String(e)));
  const response = await page.goto(route, { waitUntil: 'domcontentloaded', timeout: 45000 }).catch(e => ({ error: String(e) }));
  if (!response || response.error) { await context.close(); return { route, label, error: response?.error || 'no response' }; }
  await settle(page);
  await fs.mkdir(dir, { recursive: true });
  const first = await page.evaluate(() => ({
    title: document.title,
    headings: [...document.querySelectorAll('h1,h2,h3')].map(e => ({ tag: e.tagName, text: e.textContent.replace(/\s+/g, ' ').trim().slice(0, 130) })),
    links: [...document.querySelectorAll('a[href]')].map(e => ({ text: e.innerText.replace(/\s+/g, ' ').trim().slice(0, 60), href: e.href })).filter(x => x.href.startsWith(location.origin)),
    sections: [...document.querySelectorAll('main section, main article')].map(e => ({ tag: e.tagName, id: e.id, text: e.innerText.replace(/\s+/g, ' ').trim().slice(0, 120), y: Math.round(e.getBoundingClientRect().top + scrollY), height: Math.round(e.getBoundingClientRect().height) })),
  }));
  const fullHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const maxY = Math.max(0, fullHeight - viewport.height);
  const steps = Math.min(12, Math.max(6, Math.ceil(maxY / (viewport.height * 1.2))));
  const frames = [];
  for (let i = 0; i <= steps; i++) {
    const y = Math.round(maxY * i / steps);
    await page.evaluate(v => scrollTo(0, v), y);
    await page.waitForTimeout(80);
    const frame = await measure(page);
    frames.push(frame);
    if ([0, Math.round(steps * .25), Math.round(steps * .5), Math.round(steps * .75), steps].includes(i)) {
      await page.screenshot({ path: path.join(dir, `scroll-${String(i).padStart(2, '0')}.png`) });
    }
  }
  const reverse = [];
  for (let i = steps - 1; i >= 0; i -= Math.max(1, Math.round(steps / 8))) {
    await page.evaluate(v => scrollTo(0, v), Math.round(maxY * i / steps));
    await page.waitForTimeout(180);
    reverse.push(await measure(page));
  }
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(250);
  const interaction = [];
  const candidates = page.locator('header a:visible, nav a:visible, main a:visible, main button:visible, [role="button"]:visible');
  const n = Math.min(await candidates.count(), 4);
  for (let i = 0; i < n; i++) {
    const el = candidates.nth(i);
    try {
      const text = ((await el.innerText()) || (await el.getAttribute('aria-label')) || '').replace(/\s+/g, ' ').trim().slice(0, 80);
      if (!(await el.isVisible())) continue;
      await el.scrollIntoViewIfNeeded();
      const before = await el.evaluate(e => { const s = getComputedStyle(e); return { color: s.color, background: s.backgroundColor, transform: s.transform, opacity: s.opacity, transition: s.transition, border: s.borderColor }; });
      await el.hover({ timeout: 1200 });
      await page.waitForTimeout(120);
      const hover = await el.evaluate(e => { const s = getComputedStyle(e); return { color: s.color, background: s.backgroundColor, transform: s.transform, opacity: s.opacity, transition: s.transition, border: s.borderColor }; });
      await el.focus();
      const focus = await el.evaluate(e => { const s = getComputedStyle(e); return { color: s.color, background: s.backgroundColor, transform: s.transform, opacity: s.opacity, outline: s.outline }; });
      interaction.push({ text, before, hover, focus });
    } catch (e) { interaction.push({ index: i, error: String(e) }); }
  }
  await fs.writeFile(path.join(dir, 'capture.json'), JSON.stringify({ route, label, viewport, status: response.status(), first, frames, reverse, interaction, errors }, null, 2));
  await context.close();
  return { route, label, status: response.status(), sections: first.sections.length, headings: first.headings.length, links: first.links.length, frames: frames.length, height: fullHeight, errors };
}

const censusContext = await browser.newContext({ viewport: sizes.desktop });
const censusPage = await censusContext.newPage();
await censusPage.goto(base, { waitUntil: 'domcontentloaded', timeout: 45000 });
await settle(censusPage);
const links = await censusPage.evaluate(() => [...new Set([...document.querySelectorAll('a[href]')].map(e => e.href).filter(h => h.startsWith(location.origin) && !h.includes('#')))]);
await censusContext.close();
const paths = [...new Set([base + '/', ...links])].filter(u => !/\.(?:jpg|png|webp|svg|pdf)(?:\?|$)/i.test(u));
await fs.writeFile(path.join(out, 'route-census.json'), JSON.stringify({ base, paths }, null, 2));
const requested = process.argv.slice(2);
const routes = requested.length ? paths.filter(u => requested.some(q => u.includes(q))) : paths;
const results = [];
for (const route of routes) {
  for (const [label, viewport] of Object.entries(sizes)) {
    try { results.push(await runRoute(route, label, viewport)); }
    catch (e) { results.push({ route, label, error: String(e) }); }
  }
  console.log(`Captured ${route}`);
}
await fs.writeFile(path.join(out, 'summary.json'), JSON.stringify({ capturedAt: new Date().toISOString(), results }, null, 2));
await browser.close();
