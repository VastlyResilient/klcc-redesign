# Slab archive — verified public preview

Observed URL: https://slabtemplate.framer.website/archive
Capture: common scripts/capture.ts, deep mode, 1440×900, 1024×768, 390×844, initial wait 1800ms, 12-second recording. See manifest.json. No editor settings were accessible.

## Composition and sequence
The desktop and tablet archive has three tightly spaced masonry columns on an almost-black surface. Phone has two columns. Artwork and embedded media retain varied intrinsic ratios. Tiny navigation stays at the top; a compact Archive heading follows a generous quiet upper margin. Tiles have no decorative card containers, visible captions, or description boxes. Footer follows the actual end of the image field. Density selector controls are visible, but their click behavior has not been verified.

Initial: grid visible after the opening preloader settles. Trigger: native scrolling. Movement: the document grid moves with normal scrolling; measured changes primarily concern the fixed navigation. Pauses/end: grid remains visible and usable at every pause and at its bottom. Reverse: returning to the opening restores the same grid position; embedded media show different time-based frames. No evidence supports attributing those embedded animations to scroll scrubbing.

Several artwork tiles contain autonomous looping media. Their content changes while layout remains stationary. This is not evidence of an outer tile entry transform. Desktop navigation hover has a measured two-span vertical roll: the first span moves from 0 to −12px and the duplicate from 12px to 0. Exact easing/duration remains unknown. Mobile footer hover changes text color in emulation; real touch does not require hover.

## Landmark and evidence
Framer exposes no semantic section nodes to the capture decomposition here. Use the explicit archive-grid landmark with state opening-settled, not a fabricated section ID. Visually inspected opening-settled, midpoint, footer at all three widths; desktop hover-0 and reverse-opening were also inspected. All three capture error arrays are empty. manifest.json contains states, hover measurements, motion deltas, videos, and real links.

## KLCC use and limits
Use artwork-led browsing, intact cover proportions, restrained gutters, and stable actions for Previous Messages. KLCC has only three additional source covers plus factual titles, speakers and dates. Its current two-column desktop / one-column phone field and captions differ from the source three-column / two-column uncaptioned masonry. Record that topology difference; do not claim exact reconstruction. Existing KLCC timed image entry is an estimated donor adaptation, not a directly observed archive scroll sequence. Essential metadata must remain visible.
