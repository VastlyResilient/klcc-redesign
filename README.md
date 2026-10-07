# KLCC v2.2 — gated rebuild (review branch)

**Production release is blocked by reference-fidelity checks.** Start with [COMPLETION.md](COMPLETION.md), [BLOCKED.md](BLOCKED.md), and the [visual review packet](review/index.html). Do not interpret authored routes or passing functional checks as accepted design.

The current build has30 routes: the protected homepage,27 inner pages, legal and404. Explicit page compositions live in `src/pages/`; route motion lives in `src/motion/scenes/`. The selected reference world is Royal with Lou and Slab donors. No paid generation and no skill writes occurred.

## Run this version

Use Node22.13+ and Python3. Install exact development dependencies with `npm ci`, then run `npm run preview` and open `http://127.0.0.1:4201/review/` or the site root. `npm run build` regenerates authored routes only after the historical pilot gate verifies. `npm run qa:gates` intentionally returns nonzero while strict failures remain.

Browser scripts use the installed macOS Google Chrome. Capture defaults and viewport protocol are documented in `art-direction/qa/CAPTURE-WORKFLOW.md`. Raw multi-gigabyte captures remain in the local evidence tree; the portable packet contains selected compressed boards and30 recordings. Re-capture references for a new environment; do not treat absent raw files in a clean clone as a pass.

**Do not run the legacy Python/prerender commands below against this version:** they belong to earlier generated body layouts and can overwrite the explicit v2.2 pages. Historical notes are retained for provenance only.

---

## Prior version history (superseded implementation instructions)

# Kingdom Life Christian Church — redesign preview

A full-site KLCC redesign with 28 directly loadable, prerendered routes. The approved opening uses scroll-controlled authentic worship photography and staged live HTML lettering. Later chapters add reversible image framing, subtle depth and individually emphasized mission statements. There is no generated video installed in this build. An approved clip can be installed at `assets/hero-film.mp4` and enabled through `body[data-film="ready"]` after its separate quality gate.

The full-journey composition draws on the studied Framer preview library: Kora's editorial ministry passages, Nord A's image/story rhythm, Tabfolio's indexed reading, Coorda's clear pathways, and Pactum/Soren's people-first treatment. Existing MotionSites and X-informed opening and icon decisions are preserved. Company photographs, graphic artwork and meaningful source text come from KLCC; third-party template imagery and fonts are not redistributed.

## Build and verification

1. `python3 scripts/build_routes.py` builds 27 inner route shells.
2. `node scripts/prerender.mjs` renders all 28 pages, using the local preview at `http://127.0.0.1:4197/` by default.
3. `python3 scripts/version_styles.py` fingerprints both stylesheets and the interaction script on every route. Run after any CSS or JS edit before publication.
4. `node scripts/qa.mjs` checks the approved opening states and preserved program CTAs.
5. `node scripts/experience-qa.mjs` checks every route at desktop/tablet/phone widths, complete inner-page prose, local actions, menus, biography disclosures, image motion and no-JS reading/navigation. Set `KLCC_BASE` for a deployed build.

Styling: `styles.css` (approved intro and legacy layout foundation), `experience.css` (full-journey composition and responsive contracts). Interactions: `app.js`. Source inventory: `content.json`. Original Young Adults artwork is downloaded at its 1920 × 1080 resolution. Live service, message library, calendar, giving and registration retain their real external provider integrations and direct fallback actions. Tests do not submit forms or verify payment processing.

The working research, route map, screenshots and independent visual review are outside this public repository in the local `site-engine/research/klcc-framer-rebuild-2026-10-02/` evidence package. Phone-width browser checks do not constitute physical-device testing.

## Inner-page motion release — October 3, 2026

All inner destinations now use content-aware motion: bounded individual reading units, progressive Scripture emphasis, stable desktop orientation with natural phone flow, authentic photo depth, accurate schedule/age compositions, and purposeful closing actions. The approved homepage is preserved. All original substantive paragraphs remain available; extraction errors and duplicated navigation prose are cleaned rather than copied into reading text.

Reference and independent review evidence: `../research/klcc-motion-sequences-2026-10-03/`. Run `node scripts/inner-motion-qa.mjs` alongside both existing QA scripts; it verifies every inner route's forward/reverse progress and readable end state. Regenerate with `scripts/prerender.mjs` and fingerprint with `scripts/version_styles.py` after changes. No new animation library or paid film generation is required for this release.
