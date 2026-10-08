export {};

// Owner-requested inner-page scroll responses; essential controls remain still.
import {scrollDetail} from "../scroll-detail.js";
import {brightedgeSequence} from '../brightedge-sequence.js';
scrollDetail({"id": "app-artwork", "selector": ".app-opening figure", "kind": "image", "distance": 40, "start": 0.8, "end": 0.15});
brightedgeSequence({id:'app-capabilities',root:'.app-use-links',items:'a',axis:'horizontal',distance:27,interval:.06});
