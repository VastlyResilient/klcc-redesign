export {};

// Owner-requested inner-page scroll responses; essential controls remain still.
import {scrollDetail} from "../scroll-detail.js";
import {brightedgeSequence} from '../brightedge-sequence.js';
brightedgeSequence({id:'message-archive',root:'.archive-field',items:'.archive-message',axis:'depth',distance:26,interval:.16});
scrollDetail({"id": "archive-library", "selector": ".archive-library h2", "kind": "rise", "distance": 30});
