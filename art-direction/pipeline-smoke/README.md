# Capture / comparison smoke validation

Scripts are shared by reference and build capture. They do not assign a fidelity score.

## API

```js
import {captureSite} from '../../scripts/capture.ts';
const manifest = await captureSite({
  url: 'https://royaltemplate.framer.website/about',
  outDir: 'art-direction/references/royal/about',
  mode: 'deep', // screen captures checkpoints; deep records each half-viewport and interactions
  viewports: ['desktop', 'tablet', 'phone'],
  settleMs: 2600,
  videoSeconds: 15,
  sceneStates: [{id:'story',testStates:[0,.25,.5,.75,1]}],
});
```

An optional Playwright browser can be injected as `browser`; caller then owns browser lifetime. Without it capture creates/closes its own Chrome. `CHROME_PATH` overrides the installed Chrome path. `maxSteps` defaults500; if reached record.truncated is true. Load/screenshot errors remain in viewport.error and status becomes Captured-with-errors.

Each viewport writes `capture.json`, viewport PNGs, `layout-full.png`, optional video. Root `manifest.json` contains all viewport records. Snapshot fields include actual scrollY, DOM section bounding boxes, merged overlapping groups, backgrounds, typography, source links, computed motion states, and text/logo rectangles. Deep mode records actual changed properties; it does not infer easing from a screenshot. Section `landmark`s let reference/build comparisons align explicitly.

Settle means exact equality of two consecutive viewport PNG buffers at180ms intervals, bounded by settleMs. Continuous video/animation may legitimately remain unsettled; those frames are marked false. Layout screenshot disables finite CSS animations only, not JS/video. Required important JS scene states should use the development Motion Inspector with sceneStates.

```js
import {compareCaptures, contactSheet} from '../../scripts/compare.ts';
await compareCaptures({
  reference:'art-direction/references/royal/about/manifest.json',
  build:'art-direction/qa/our-story/manifest.json',
  outDir:'art-direction/qa/side-by-side/our-story',
  pairs:[{reference:'section-about-story',build:'section-history'}],
});
await contactSheet({images:[{file:'capture.png',label:'Our story',textBoxes:[],logoBoxes:[]}],out:'sheet.png',columns:3,grayscale:true,blurCopy:true,removeLogos:true});
```

Default comparison matches landmark+scene progress; explicit pairs adapt differing semantic names. Opening/midpoint/footer default pairs are overview checkpoints and not proof that underlying section topology matches. Unmatched states remain listed; no nearest scroll-percentage substitution. Generated comparisons carry Unreviewed status. Three explicit reference manifests may be passed as `topExamples` for four-column opening boards; use contactSheet with selected state files for other page-type/section boards.

Smoke: a real Royal About phone route was captured, with actual rendered opening manually inspected. A local fixture exercised sticky geometry, section landmarks, reverse, hover, keyboard, and comparison generation. Neither smoke evidence nor fixture comparison constitutes KLCC fidelity approval.
