# Incremental visual evidence workflow

`node --experimental-strip-types scripts/capture-queue.ts --base http://127.0.0.1:4201 --watch true --minutes 180 --workers 2`

The queue reads the content ledger, authored `src/pages/<route>.html`, and current `build-events.jsonl`. Existing legacy routes without authored source plus a build event are not treated as rebuilt. It uses at most two capture workers. The protected homepage is captured from its actual existing route. Already captured pilots may be reused; route/source/shell fingerprints detect subsequent changes. Any mutation during a capture marks that result stale and schedules a fresh run.

Every completed route receives three viewport records, half-viewport slow scrolling, fast and reverse states, hover/focus evidence, header and menu states, section decomposition, and a12second desktop recording. Viewports are1440×900,1024×768,390×844. CSS-pixel PNGs remain local. Bounded settle failure is explicit; it is not silently treated as a stationary state. Default browser closure is bounded after all evidence is saved.

Route-owned scene IDs can additionally be sought through the Motion Inspector by supplying `sceneStates` directly to `captureSite`. Arbitrary claims of exact scene progress are not inferred from a generic page percentage. Blueprint reference landmarks map sections into side-by-side files; missing source landmarks remain unmatched.

## Review loop

1. Read blueprint visitor task and actual content.
2. Inspect section boards with no more than24 frames per board; open full-size frames where needed for typography/placement.
3. Inspect matched reference/build frames and real motion deltas. Neither a code attribute nor an animation's existence is proof of fidelity.
4. Record each visible failure and send the builder its exact route,viewport,state,and repair target.
5. Rebuild, recapture affected states and interactions, then review again.
6. Only the independent visual reviewer may assign Fidelity-reviewed after every section passes; queue statuses never do. Accepted remains owner-only.

## Comparison utilities

`node --experimental-strip-types scripts/top-examples.ts --selection selection.json --out art-direction/qa/top-examples/selected`

Selection JSON has `boards:[{route,viewport,section,build:{manifest,state,label},examples:[{manifest,state,label},...three]}]`. The generated order is example1 | build | example2 | example3. Missing states produce Missing-evidence, not a substitute guessed from scroll percentage.

`--from-queue art-direction/qa/capture-queue.json` prepares observed candidate selections by visitor purpose. These are explicitly candidate comparisons, not automated assertions that they are the three best examples or that the build passes.

`node --experimental-strip-types scripts/capture-queue.ts --sheets true`

This produces all-route grayscale opening/midpoint boards with actual DOM text regions blurred and logo regions masked. Boards remain Unreviewed until inspected; palette similarity cannot substitute for composition review.

## Evidence limits

No physical phones are tested by this pipeline. Screenshot checks do not certify WCAG contrast, keyboard correctness, functional provider journeys, exact editor easing, or visual excellence. Functional verification and actual vision review are separate. Forms and payment actions are never submitted during capture. Source automatic navigation is recorded and stops that route's capture to avoid attributing another page to the requested source.
