export {};

// Owner-requested inner-page scroll responses; essential controls remain still.
import {scrollDetail} from "../scroll-detail.js";
scrollDetail({"id": "live-context", "selector": ".live-player-metadata .live-screen p", "kind": "rise", "distance": 24});
scrollDetail({"id": "live-invitation", "selector": ".live-visit > p", "kind": "rise", "distance": 38, "start": 0.96, "end": 0.25});
