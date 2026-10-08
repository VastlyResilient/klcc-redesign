# Brightedge live and editor motion study — 2026-10-08

Source: https://brightedge.framer.website/ and its Framer template editor copy. This is a behavior study, not permission to reuse Brightedge's brand, imagery, copy, or source as a distributable template. The raw route/viewport captures, forward and reverse samples, and screenshots are in this directory. `route-census.json` lists the 14 URLs actually reached. `summary.json` reports 42 successful desktop/tablet/phone captures. The script is `scripts/brightedge-reference.mjs`.

## Observation method and precision

For every reachable route, the published site was opened at 1440×900, 834×1112, and 390×844. Each was scrolled in measured increments to the bottom and sampled in reverse, with screenshots at major landmarks. DOM section positions, element rectangles, computed opacity/transform/position/transitions, active Web Animations, and a limited set of hover/focus states were saved. The initial broad hover sweep hit hidden Framer clones on most pages, so its timeout entries are **not** evidence that the live interaction fails. A separate targeted probe on the visible homepage project card measured its hover response. Focus states and individual interactions across all 14 routes are not exhaustively proven by those broad samples.

The editor copy exposes the actual layer tree, responsive breakpoints, some dimensions and component bindings. It does not expose every per-layer transition value from the published preview, and many Framer effects are nested in components. Anything below called “measured” is a published-browser observation. Anything called “editor” was visible in the remix UI. KLCC timing and distances are authored adaptations, not claims of exact Framer settings.

## Routes and composition families

| Routes observed | Visual/motion role | KLCC decision |
|---|---|---|
| Home `/` | Hero, service index, project showcases, sticky Approach process, team, pricing, testimonial movement, FAQ, article links | Reconstruct the Approach behavior for Membership; adapt the restrained project response for message artwork. |
| About `/about` | Long narrative with chronological vertical rail and paired imagery | Our Story already has a separate approved paired-chapter film; retain it. |
| Services `/services` | Tall service chapters, separated illustration and reading fields, short content transitions | Use ordered text-entry logic for Alpha and Life Groups. |
| Pricing `/pricing` | Clear stable plan comparison and toggle, imagery gives way to factual table | Keep practical KLCC dates/forms stable; only stage adjacent explanatory items. |
| Projects `/projects` and four project details | Large image-led projects with a very small hover contraction; details maintain a stable reading axis | Give Previous Messages a quiet sequential archive entrance and matched hover/focus response. |
| Blogs `/blogs` and three article details | Stable article cards and legible long-form reading, with limited decorative motion | Do not animate KLCC's essential reading text continuously. |
| Contact `/contact` | Dark practical form zone with stable controls | Do not transfer decorative motion onto KLCC forms or contact actions. |

## Specific measured and editor-verified behavior

- **Approach progression:** On desktop, the left heading and photograph remain around 181 px and 326 px from the viewport top during the middle of the process while the section and right-side steps continue moving. They release before the section leaves. At 390 px, both move with the page; the phone does not inherit the desktop pin. This was checked at nine scroll positions in each of two viewports and compared with the saved forward/reverse captures.
- **Editor settings for that process:** Framer exposes primary Desktop 1200, Tablet 1199–810, and Phone 809–0 breakpoints. In the Home page layer tree, Approach Section contains a two-column Container. `Approach Wrap / Left` is Sticky, Top **150**, maximum width **50% relative**. `Approach Wrap / Right` is Relative, maximum width **50% relative**. Five `Approach Step Card` component instances live in the right column. The first visible instance uses Desktop variant, Fill width, Fit height **275** in the 1200-px editor view, and binds both `Scroll Section` and `Line Scroll Section` to `timeline-1`. Inside that component, `Timeline / Down` is a 2-px Grey 200 line at opacity **0.3**; `Timeline / Up` is a 2-px Orange line at opacity **1**. Other component-instance bindings and detailed interpolation curves have not all been individually opened, so they are not asserted as exact.
- **Project hover:** The first visible project link at 1440 px measured 1168×720 before hover and approximately 1163×717 after 400 ms. The response is a slight visual contraction. No strong color or opacity change was measured on the link itself. The KLCC adaptation uses similarly restrained media response, with equivalent keyboard focus styling.
- **Browser animation samples:** The home page exposed a 700 ms animation with cubic-bezier(0.12, 0.23, 0.5, 1), plus slow linear moving lists (approximately 47.8, 48.3, and 63.4 seconds). These are observed animation instances, not a global setting for all section reveals. KLCC does not adopt the long decorative marquees because they do not clarify church content.
- **Entrances and exits:** The Approach section's left unit approaches naturally, sticks during step progression, then releases. Right-side content stays in document flow; the rail progress is tied to scroll position. KLCC Membership implements continuous scroll progress and reverse behavior. Other KLCC section sequences use position-driven opacity/translation with no hidden default content; they pause with scrolling and reverse when scrolling upward.
- **Interaction and mobile:** Brightedge changes from a wide fixed side rail and two-column process at desktop to a single-flow process on phone. The published site also uses restrained project hovers. KLCC keeps its previously approved persistent header/menu interaction and applies the observed responsive *principle*: no tall pinned process on phone; smaller motion distances, normal flow, visible links, and focus treatment.

## KLCC implementation map

| KLCC page | Brightedge move, adapted to church content | Verification |
|---|---|---|
| Membership | Sticky authentic congregation visual beside four real membership themes, continuous progress line and chapter handoff; normal stacked mobile flow | `klcc-qa/results.json`, desktop/phone midpoint captures |
| Life Groups | Ordered directory entry, responsive reading rhythm and current-row rule | KLCC desktop/tablet/phone scroll-and-reverse samples |
| Alpha | Separate question, conversation, meeting-time entries; stable meeting details and video links | Same three-viewport samples |
| Believe | Offset entries for the three next-step choices, keeping cards and actions in place | Same three-viewport samples |
| Baptism | Date pair enters in order; event actions remain stable | Same three-viewport samples |
| App | App-use links arrive one by one in a bounded, reversible sequence | Same three-viewport samples |
| Previous Messages | Three real archive artworks enter in order; image hover/focus stays restrained | Same three-viewport samples |

The implementation deliberately does not copy the template's orange palette, agency photos, marketing language, social strip, or repeated case-study composition. It also does not assert an exact Framer-editor clone of all 14 routes: the editor-exposed values above are exact, and all other KLCC motion parameters are documented reconstructions.

## Independent visual review and repair

A separate reviewer examined all seven affected KLCC routes at desktop, tablet, and phone sizes. It found two cross-component defects: the persistent header's white text lost contrast above light sections, and App's tablet sequence created 2 px of sideways overflow. The header now reads the actual surface under it and transitions to dark text/logo with a pale translucent glass treatment over light sections; it retains white-on-navy over dark content. Horizontal arrivals now move inward from the left. Rechecks show App at 834 px has `scrollWidth === innerWidth === 834`, and the Alpha footer capture shows readable dark navigation above the pale section. No other route/viewport errors or overflow were reported; focus treatment on Previous Messages was visible.
