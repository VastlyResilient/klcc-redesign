// Hold: safety information and service-change channels must not wait for animation.
export {};

// Owner-requested inner-page scroll responses; essential controls remain still.
import {scrollDetail} from "../scroll-detail.js";
scrollDetail({"id": "weather-picture", "selector": ".weather-notice figure", "kind": "image", "distance": 24});
scrollDetail({"id": "weather-volunteer", "selector": ".weather-volunteer h2, .weather-volunteer > div > p", "kind": "rise", "distance": 22, "stagger": 0.12});
