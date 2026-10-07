var t=Date.now();for(let e of document.querySelectorAll("[data-event-end]"))Date.parse(e.dataset.eventEnd)<t&&(e.hidden=!0);
