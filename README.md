# Kingdom Life Christian Church — redesign preview

A company-specific, cinematic redesign for KLCC. The home intro has a scroll-controlled still fallback with staged live HTML typography; an approved film can be added to `assets/hero-film.mp4` and enabled through `body[data-film="ready"]` after visual QA. All 28 source pages have local routes and prerendered HTML. Live service, message library, calendar, and giving retain their necessary third-party provider integrations.

## Build and verification

- `python3 scripts/build_routes.py && node scripts/prerender.mjs && python3 scripts/version_styles.py` regenerates the static routes and fingerprints the stylesheet URL on every page. Rerun `version_styles.py` after a CSS-only edit before publishing so an existing browser does not keep the previous visual treatment.
- `node scripts/qa.mjs` verifies direct routes, responsive scroll states, menu interactions, and selected inner pages. Requires Playwright and Chrome.
- Source-page text inventory: `content.json`. Styling and interactions: `styles.css`, `app.js`.

Images are from the official KLCC site. The generated film, if used, is illustrative and is not documentary footage of a KLCC service.
