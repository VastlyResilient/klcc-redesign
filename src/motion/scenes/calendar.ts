// Native readable agenda; provider remains the source of live changes.
const now=Date.now();
for(const row of document.querySelectorAll<HTMLElement>('[data-event-end]')){if(Date.parse(row.dataset.eventEnd!)<now){row.hidden=true;}}
export {};

// Owner-requested inner-page scroll responses; essential controls remain still.
import {scrollDetail} from "../scroll-detail.js";
scrollDetail({"id": "calendar-context", "selector": ".calendar-context", "kind": "rise", "distance": 22});
scrollDetail({"id": "calendar-reading", "selector": ".calendar-event-column > .calendar-events > li > details > p", "kind": "rise", "distance": 14, "stagger": 0});
