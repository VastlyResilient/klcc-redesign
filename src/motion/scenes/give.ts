export {};

// Owner-requested inner-page scroll responses; essential controls remain still.
import {scrollDetail} from "../scroll-detail.js";
scrollDetail({"id": "give-community", "selector": ".give-generosity img", "kind": "image", "distance": 48});
scrollDetail({"id": "give-scripture", "selector": ".giving-reading-column > p", "kind": "rise", "distance": 24, "stagger": 0.05});
