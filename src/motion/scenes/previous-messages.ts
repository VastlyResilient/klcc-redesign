export {};

// Owner-requested inner-page scroll responses; essential controls remain still.
import {scrollDetail} from "../scroll-detail.js";
scrollDetail({"id": "archive-artwork", "selector": ".archive-message img", "kind": "image", "distance": 48, "stagger": 0.06});
scrollDetail({"id": "archive-library", "selector": ".archive-library h2", "kind": "rise", "distance": 30});
