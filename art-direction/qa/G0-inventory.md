# G0 — protection and inventory

Captured October 7, 2026. All 28 original page URLs returned HTTP 200. Raw original HTML and extracted links/images/iframes are saved under `art-direction/source/`.

The ledger covers 30 routes (28 existing + site-information/legal + 404), 395 required source/content/media items, and two superseded historical message fields. It retains each original copy block, action and integration. Fresh image-only homepage links exposed four Brushfire actions that the old text-only collector omitted; these are now explicit requirements. No anonymous image action was assigned an invented label.

Protection baseline is in `art-direction/protected-skills.json`. This task did not modify any skill file. End-of-run hash verification belongs to G8.

One source-content correction: `/subsplash-media` original Most Recent now says **Obedience — Oct 4, 2026 · Pastor Sandy Vargas**. `content.json` has that verified current item. The previous Sep27 entry survives as nonrequired historical audit data. No other source copy changed.

G0 inventory assertions pass. This does not mean content has been preserved in the rebuilt UI yet: the later blueprint and rendered content diff is mandatory.

## Asset extension and pipeline update

Source audit added 11 optional authentic images (seven named leadership portraits and four real message artworks) plus eight optional message-copy/action records. These are provenance-preserving enrichment, not invented replacements. `art-direction/assets/source-audit.md` links the source and visual checks. The required existing-content count stays unchanged.

`scripts/assets.ts` produced 41 sets of WebP derivatives with no failed conversions. Sources remain byte-identical. Derivatives preserve aspect ratio, never upscale, retain original artwork lettering, and cap the largest derivative at the source width or 1920px. `art-direction/qa/assets.json` records dimensions, byte sizes and original SHA-256 hashes. This encoding check does not substitute for rendered image-crop QA.

The G4 script now blocks an unverified rollout. `build.ts` records actual build timestamps and refuses nonpilot routes until Our Story and Mission both have evidence-backed Fidelity-reviewed records. Missing records are reported Blocked; no placeholder acceptance was created.
