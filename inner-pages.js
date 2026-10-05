/* Company-content compositions; reference provenance lives in blueprints.json. */
let innerBlueprints={};
function innerFigure(name,alt,caption='',poster=false){
 return `<figure class="folio-figure ${poster?'folio-figure--art':''}" data-folio-media><img src="${asset(name)}" alt="${esc(alt)}" loading="lazy" decoding="async">${caption?`<figcaption>${esc(caption)}</figcaption>`:''}</figure>`;
}
function innerActions(actions=[]){if(actions.some(a=>/(?:klcc\.us)?\/media(?:\/|$)/.test(a.href))){return '<p class="folio-library-context">Browse series, topics, speakers, Scripture, and Kids Online in the message library above.</p><a class="folio-action" href="#media-library">Browse the message library</a>';}return actions.map(a=>{const url=pageKey==='/easter'&&/#expect/.test(a.href)?'#section-2':pageKey==='/easter'&&/#klcc-app/.test(a.href)?path('app'):safeHref(a.href);if(!url||/^(coming soon|on break)$/i.test(a.label))return '';return `<a class="folio-action" href="${esc(url)}" ${/^https?:/.test(url)?'target="_blank" rel="noopener noreferrer"':''}>${esc(sourceText(a.label))}</a>`}).join('')}
function innerPassages(section,route,index){
 const blocks=(section.blocks||[]).filter(b=>!/page under construction/i.test(b.text)&&!(b.type==='p'&&/^Read more about our Leadership$/i.test(b.text.trim())));
 const first=blocks.find(b=>/^h[1-4]$/.test(b.type));
 const title=sectionTitle(first,index,route);
 const rest=blocks.filter(b=>b!==first);
 let units=[],pre=[];
 for(const b of rest){if(/^h[1-4]$/.test(b.type))units.push({title:sourceText(b.text),blocks:[]});else if(units.length)units.at(-1).blocks.push(b);else pre.push(b)}
 const render=b=>{if(route==='mission'&&index===1&&b.type==='p'&&b.text.startsWith('Reach People'))return '<div class="folio-vision">'+sourceText(b.text).split(/(?=Reach People|Teach & Train|Break Down Walls|Be a Place|Prepare the Next|Serve the Community|Connect with Churches)/).filter(t=>t.trim()).map(t=>`<p data-folio-unit>${esc(t.trim())}</p>`).join('')+'</div>';return b.type==='li'?`<p class="folio-list-item">${esc(sourceText(b.text))}</p>`:((route==='new'&&index===5)?`<p>${esc(sourceText(b.text))}</p>`:readableParagraph(b.text)).replace(/<span aria-hidden="true">↘<\/span>/g,'')};
 const lead=pre.map(b=>{if(route==='beliefs'&&index===1&&b.type==='p')return '<div class="folio-belief-list">'+b.text.split(/\.{3,}/).filter(t=>t.trim()).map((t,i)=>`<article class="folio-passage" data-folio-unit><span class="folio-unit-number">${String(i+1).padStart(2,'0')}</span><p>${esc(sourceText(t.trim()))}</p></article>`).join('')+'</div>';return render(b)}).join('');
 const body=units.map((u,i)=>`<article class="folio-passage" data-folio-unit><span class="folio-unit-number">${String(i+1).padStart(2,'0')}</span><div><h3>${esc(u.title)}</h3>${u.blocks.map(render).join('')}</div></article>`).join('');
 return {title,body:lead+body,hasContent:!!(lead+body)||!!section.actions?.length};
}
function blueprintDetail({route,page,title,intro,category,heroLinks,facts,special}){
 const b=innerBlueprints[route];if(!b)throw new Error('Missing page composition: '+route);
 const original=page.sections||[];
 const figure=b.image?innerFigure(b.image,b.alt||title,b.caption||'',b.opening==='poster'||b.image.startsWith('page/')):'';
 const headline=b.headline||title;
 const titleHTML=route==='women'?`Faith grows <span class="folio-inline-photo"><img src="${asset('worship.jpg')}" alt="The Kingdom Life congregation"></span> in friendship.`:esc(headline).replaceAll('\n','<br>');
 let opening=`<section class="folio-opening folio-opening--${b.opening}" data-reference="${esc(b.reference)}"><div class="folio-opening-visual">${figure}</div><div class="wide-wrap folio-opening-copy"><p class="eyebrow" data-folio-unit>${esc(category)} / KINGDOM LIFE</p><h1 data-folio-title>${titleHTML}</h1><div class="folio-opening-meta"><p>${esc(b.intro||intro)}</p><div class="folio-opening-actions">${route==='app'?innerActions(page.sections?.[0]?.actions||[]):heroLinks}</div></div>${facts?`<p class="folio-fact"><strong>${esc(facts[0])}</strong><span>${esc(facts[1])}</span></p>`:''}</div></section>`;
 const rendered=b.sections.map((spec,n)=>{
  if(route==='young-adults'&&spec.index===3)return '';
  if(route==='young-adults'&&spec.index===2){return `<section class="folio-events folio-tone--paper" data-folio-section><div class="wide-wrap"><div class="folio-events-heading"><p class="eyebrow">RED / RISE / KINGDOM LIFE</p><h2 data-folio-title>Two nights. Your people.</h2></div><div class="folio-event-grid">${[2,3].map((i,j)=>{const cfg=b.sections.find(z=>z.index===i);const event=innerPassages(original[i],route,i);return `<article id="section-${i}" class="folio-event">${innerFigure(cfg.image,cfg.alt,cfg.caption,true)}<div class="folio-event-copy"><h3 data-folio-title>${esc(event.title)}</h3>${event.body}<div class="folio-actions">${innerActions(original[i].actions)}</div></div></article>`}).join('')}</div></div></section>`;}
  const source=original[spec.index];if(!source)return '';
  const p=innerPassages(source,route,spec.index);
  if(spec.images?.length>1){let count=0;p.body=p.body.replace(/<\/p>/g,match=>++count===1?match+`<div class="folio-mobile-image">${innerFigure(spec.images[1],spec.imageAlts?.[1]||'Kingdom Life', 'WORSHIP AT KINGDOM LIFE')}</div>`:match);}if(!p.hasContent)return '';
  let image=spec.image?innerFigure(spec.image,spec.alt||p.title,spec.caption||'',spec.layout==='poster'||spec.image.startsWith('page/')||spec.image.includes('original')||spec.image.includes('night')):'';
  if(spec.images){image=`<figure class="folio-figure folio-image-stack" data-folio-stack>${spec.images.map((name,i)=>`<img src="${asset(name)}" alt="${esc(spec.imageAlts?.[i]||spec.alt||p.title)}" loading="lazy" data-stack-image="${i}">`).join('')}<figcaption>${esc(spec.caption||'FROM KINGDOM LIFE')}</figcaption></figure>`;}
  const verse=/\/\/\s*(?:[1-3]\s)?(?:Psalm|Proverbs|Matthew|Timothy|Corinthians|Jeremiah|Ephesians|Luke|John)/i.test(source.blocks.map(x=>x.text).join(' '));
  const layout=verse?'statement':spec.layout;
  return `<section id="section-${spec.index}" class="folio-section folio-section--${layout} folio-tone--${spec.tone||'paper'} ${image?'folio-with-image':''}" data-folio-section data-reference="${esc(b.reference)}"><div class="wide-wrap folio-section-grid"><div class="folio-heading"><p class="eyebrow" data-folio-unit>${String(n+1).padStart(2,'0')} / ${esc(title)}</p><h2 data-folio-title>${esc(p.title)}</h2></div>${image}<div class="folio-copy" data-folio-reading>${p.body}<div class="folio-actions" data-folio-unit>${innerActions(source.actions)}</div></div></div></section>`;
 }).join('');
 const close=b.close;
 const closing=close?`<section class="folio-ending"><div class="wide-wrap"><p class="eyebrow">${esc(close.label)}</p><a href="${path(close.route)}" data-folio-title>${esc(close.title)}</a></div></section>`:'';
 return `${header()}${menu()}<main class="folio-page folio-page--${route}" data-route="${route}" data-reference="${esc(b.reference)}">${opening}${special?`<div class="folio-integration">${special}</div>`:''}${rendered}${closing}</main>${footer()}`;
}
function folioMotion(){
 const host=document.querySelector('.folio-page');if(!host||new URLSearchParams(location.search).has('prerender'))return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const titles=[...host.querySelectorAll('[data-folio-title]')];
 for(const el of titles){const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let node,list=[];while(node=walker.nextNode())list.push(node);for(const text of list){const frag=document.createDocumentFragment();text.textContent.split(/(\s+)/).forEach(word=>{if(!word.trim())frag.append(word);else{const span=document.createElement('span');span.className='folio-word';span.textContent=word;frag.append(span)}});text.replaceWith(frag)}}
 const units=[...host.querySelectorAll('[data-folio-unit]')];const media=[...host.querySelectorAll('[data-folio-media]')];const sections=[...host.querySelectorAll('[data-folio-section]')];
 const clamp=v=>Math.min(1,Math.max(0,v));const ease=v=>v*v*(3-2*v);let frame=0;
 function update(){frame=0;const h=innerHeight;
 for(const el of titles){const r=el.getBoundingClientRect();const words=[...el.querySelectorAll('.folio-word')];const p=reduced.matches?1:clamp((h*.94-r.top)/(h*.42));words.forEach((w,i)=>w.style.setProperty('--word-arrive',ease(clamp((p-i/(words.length+1)*.3)/.7))))}
 for(const el of units){const r=el.getBoundingClientRect();if(r.bottom< -100||r.top>h+100)continue;el.style.setProperty('--unit-arrive',reduced.matches?1:ease(clamp((h*.96-r.top)/(h*.23))))}
 for(const el of media){const r=el.getBoundingClientRect();if(r.bottom< -100||r.top>h+100)continue;el.style.setProperty('--image-arrive',reduced.matches?1:ease(clamp((h-r.top)/(h*.6))));el.style.setProperty('--image-drift',reduced.matches?0:clamp((h-r.top)/(h+r.height)))}
 for(const stack of host.querySelectorAll('[data-folio-stack]')){const section=stack.closest('[data-folio-section]');const paras=[...section.querySelectorAll('.folio-copy>p')];const imgs=[...stack.querySelectorAll('[data-stack-image]')];let active=0;paras.forEach((p,i)=>{if(p.getBoundingClientRect().top<h*.55)active=Math.min(i,imgs.length-1)});imgs.forEach((img,i)=>img.style.opacity=i===active?'1':'0')}
 for(const el of sections){const r=el.getBoundingClientRect();if(r.bottom<0||r.top>h)continue;el.style.setProperty('--chapter-progress',reduced.matches?1:clamp((h*.7-r.top)/Math.max(1,r.height*.8)))}
 }
 host.classList.add('folio-motion');addEventListener('scroll',()=>{if(!frame)frame=requestAnimationFrame(update)},{passive:true});addEventListener('resize',update);reduced.addEventListener('change',update);update();
}
