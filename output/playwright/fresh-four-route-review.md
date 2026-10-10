# Fresh four-route visual QA — 10 October 2026

Local preview: `http://127.0.0.1:4201/`. Reviewed `/kids/`, `/life-groups/`, `/new/`, and `/youth/` at 1440 × 900 desktop and 390 × 844 phone, opening through footer. Phone menu, Kids → First Sunday check-in anchor, and scroll-triggered late imagery were exercised. At 390 px, all four routes have `scrollWidth === innerWidth`; no horizontal overflow was found.

| Route | Desktop capture | Phone capture | Additional state |
| --- | --- | --- | --- |
| Kids | `review-kids-desktop-opening.png`, `review-kids-desktop.png` | `review-kids-phone-opening.png`, `review-kids-phone.png` | `review-kids-checkin-anchor-desktop.png` |
| Life Groups | `review-life-groups-desktop.png` | `review-life-groups-phone.png` | `review-life-groups-phone-ending-scrolled.png`, `review-life-groups-phone-cta-scrolled.png` |
| Your First Sunday | `review-new-desktop.png` | `review-new-phone.png` | `review-new-phone-content-scrolled.png`, `review-new-phone-middle-scrolled.png` |
| Youth | `review-youth-desktop.png` | `review-youth-phone.png` | `review-youth-menu-phone.png` |

## Findings

- **Youth, all viewports — minor functional mismatch:** “Contact the youth team” opens `mailto:bmcdowell@klcc.us?subject=Elevate%207-9th%20Grades`, the same subject as the 7th–9th grade card. The general closing CTA should identify a general youth inquiry.
- **No persistent visual failure found** in opening, middle, footer, or menu states at the reviewed widths. The light Kids header is dark and readable after normal load/reload on both desktop and phone.
- **Capture caveat:** full-page screenshots were taken before every scroll reveal entered the viewport, so Life Groups and Your First Sunday show dark empty bands in those composite files. Normal scrolling displayed the congregation imagery in both places; the scrolled screenshots above show the rendered state. A full-page capture also briefly showed an incorrect light header on Kids; fresh opening viewport captures show the settled readable header.
