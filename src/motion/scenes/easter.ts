export {};

// Owner-requested inner-page scroll responses; essential controls remain still.
import {scrollDetail} from "../scroll-detail.js";
scrollDetail({"id": "easter-artwork", "selector": ".easter-opening > img, .easter-opening > figure", "kind": "image", "distance": 40});
scrollDetail({"id": "easter-answers", "selector": ".easter-answers > h3, .easter-answers > p", "kind": "rise", "distance": 22, "stagger": 0.02});
