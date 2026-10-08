export {};

// Owner-requested inner-page scroll responses; essential controls remain still.
import {scrollDetail} from "../scroll-detail.js";
scrollDetail({"id": "care-picture", "selector": ".care-heading figure img", "kind": "focus", "trigger": ".care-expectation", "start": 0.86, "end": 0.4});
scrollDetail({"id": "care-expectation", "selector": ".care-expectation > p:last-child", "kind": "rise", "distance": 28, "start": 0.88, "end": 0.3});
scrollDetail({"id": "care-comfort", "selector": ".care-quote", "kind": "rise", "distance": 36, "start": 0.94, "end": 0.24});
