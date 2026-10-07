// Native readable agenda; provider remains the source of live changes.
const now=Date.now();
for(const row of document.querySelectorAll<HTMLElement>('[data-event-end]')){if(Date.parse(row.dataset.eventEnd!)<now){row.hidden=true;}}
export {};
