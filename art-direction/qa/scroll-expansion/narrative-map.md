# KLCC narrative scroll-detail expansion

Preserves current page composition, typography, content, homepage, and existing Our Story/Membership chapter exchanges. All additions are native-scroll linked rather than autoplay-only arrivals. The shared helper halves distances on phone and makes reduced-motion content static. Essential contact, schedule, registration and player controls remain outside moving nodes.

## Evidence and adaptation limits

- Slab Hydra: https://slabtemplate.framer.website/projects/hydra — native-scroll next-project artwork continuation and varied image/reading intervals; `art-direction/references/deep/slab/hydra-scoped/dossier.md`. KLCC uses bounded element travel and explicit links, no automatic navigation.
- Royal About: https://royaltemplate.framer.website/about — documentary image/identity relationship and synchronized chapter exchange; `art-direction/references/deep/royal/about/dossier.md`. Existing chapter exchanges remain intact; additional images maintain their captions and subject.
- Lou About: https://louperez.framer.website/about — verified reversible focus at footer boundary, contrasted with once-triggered timed paragraph clarity; `art-direction/references/deep/lou-pilot/about/dossier.md`. Only the Beliefs non-lettered conceptual image uses the focus adaptation; body text is never blurred or split.
- These additions are adaptations of observed mechanisms, not claims of source-exact editor values. Royal transform/opacity entrance patterns provide the rise adaptation; Slab provides image continuation. Rise distances, 94%→32% viewport interval and 6.5% sequential offset are authored settings to compare in browser QA.

| Route | Scene | Target | Adaptation |
|---|---|---|---|
| new | new-worship-continuation | `#visit-together figure` | Whole imagery continuation, 40px → 0; original crop/lettering retained |
| new | new-welcome-reading | `.visit-welcome>div` | Intact semantic passage progression, 24px → 0; remains readable |
| our-story | story-founders-arrival | `.founders-identity img` | Whole imagery continuation, 36px → 0; original crop/lettering retained |
| mission | mission-commitments-sequence | `.mission-commitments li` | Intact semantic passage progression, 26px → 0; remains readable |
| leadership | leaders-founders-continuation | `.founders-portraits figure` | Whole imagery continuation, 36px → 0; original crop/lettering retained |
| leadership | leaders-directory-portraits | `.pastor-directory article figure` | Whole imagery continuation, 24px → 0; original crop/lettering retained |
| life-groups | groups-community-continuation | `#groups-photo figure` | Whole imagery continuation, 44px → 0; original crop/lettering retained |
| life-groups | groups-reading-rows | `.group-rows article` | Intact semantic passage progression, 24px → 0; remains readable |
| membership | membership-gathering-continuation | `.member-intro>.opening-documentary` | Whole imagery continuation, 36px → 0; original crop/lettering retained |
| alpha | alpha-questions-arrival | `.alpha-brief-copy article:nth-child(-n+2)` | Intact semantic passage progression, 28px → 0; remains readable |
| alpha | alpha-film-imagery | `.alpha-film-link img` | Whole imagery continuation, 20px → 0; original crop/lettering retained |
| courses | courses-reading-continuation | `.courses-reading figure` | Whole imagery continuation, 40px → 0; original crop/lettering retained |
| courses | courses-subject-passages | `.courses-fall article>p` | Intact semantic passage progression, 22px → 0; remains readable |
| kids | kids-campus-arrival | `.orientation-photo` | Whole imagery continuation, 28px → 0; original crop/lettering retained |
| kids | kids-volunteer-reading | `.kids-team-reading>div>p` | Intact semantic passage progression, 24px → 0; remains readable |
| youth | youth-gathering-arrival | `.elevate-opening figure` | Whole imagery continuation, 40px → 0; original crop/lettering retained |
| youth | youth-connection-passage | `.elevate-connect>p` | Intact semantic passage progression, 22px → 0; remains readable |
| young-adults | ya-rise-artwork | `.ya-edition figure` | Whole imagery continuation, 32px → 0; original crop/lettering retained |
| young-adults | ya-congregation-continuation | `#ya-community figure` | Whole imagery continuation, 46px → 0; original crop/lettering retained |
| women | women-community-continuation | `.women-together figure` | Whole imagery continuation, 44px → 0; original crop/lettering retained |
| women | women-encouragement-arrival | `.women-encouragement` | Intact semantic passage progression, 26px → 0; remains readable |
| men | men-study-continuation | `.men-study-image` | Whole imagery continuation, 36px → 0; original crop/lettering retained |
| men | men-study-passage | `.men-study>div:last-child>p` | Intact semantic passage progression, 24px → 0; remains readable |
| serve | serve-purpose-reading | `.serve-purpose>p:not(.eyebrow)` | Intact semantic passage progression, 30px → 0; remains readable |
| serve | serve-scripture-arrival | `.serve-scripture` | Intact semantic passage progression, 24px → 0; remains readable |
| believe | believe-material-continuation | `.believe-materials figure` | Whole imagery continuation, 38px → 0; original crop/lettering retained |
| believe | believe-next-step-passage | `.believe-step-pair>article>p` | Intact semantic passage progression, 24px → 0; remains readable |
| baptism | baptism-preparation-reading | `.baptism-preparation>p:not(.eyebrow)` | Intact semantic passage progression, 30px → 0; remains readable |
| beliefs | beliefs-reading-sequence | `.beliefs-paragraph` | Intact semantic passage progression, 24px → 0; remains readable |
| beliefs | beliefs-editorial-focus | `.beliefs-reflection figure img` | Lou focus-boundary adaptation on conceptual image only, 2px → 0 |

## Required independent review

Check source selectors match visible nodes, top/mid/end and reverse states, no text/control overlap, readable initial state, desktop/tablet/phone, reduced-motion and no-JS. A registered scene or a transform delta alone is not visual approval.
