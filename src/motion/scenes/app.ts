export {};

// Owner-requested inner-page scroll responses; essential controls remain still.
import {scrollDetail} from "../scroll-detail.js";
scrollDetail({"id": "app-artwork", "selector": ".app-opening figure", "kind": "image", "distance": 40, "start": 0.8, "end": 0.15});
scrollDetail({"id": "app-capabilities", "selector": ".app-use-links a span, .app-use-links a p", "kind": "rise", "distance": 22, "stagger": 0.035});
