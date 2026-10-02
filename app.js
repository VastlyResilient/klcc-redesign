const root = document.body.dataset.depth === '1' ? '../' : './';
const pageKey = document.body.dataset.page || '/';
const path = (slug = '') => root + (slug ? slug.replace(/^\//, '') + '/' : '');
const asset = (name) => root + 'assets/' + name;
const esc = (s = '') => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const groups = [
  {title:'Start here', links:[['Plan a visit','new'],['Our story','our-story'],['Leadership','leadership'],['Mission & vision','mission'],['What we believe','beliefs'],['Pastoral care','pastoral-care']]},
  {title:'Find community', links:[['Life Groups','life-groups'],['Membership','membership'],['Prayer','prayer'],['Serve','serve'],['Baptism','baptism'],['Alpha','alpha'],['Courses','courses']]},
  {title:'Every generation', links:[['Kingdom Kids','kids'],['Youth','youth'],['Young adults','young-adults'],['Women','women'],['Men','men']]},
  {title:'Stay connected', links:[['Watch live','watch-live'],['Previous messages','previous-messages'],['Calendar','calendar'],['Give','give'],['KLCC app','app'],['Weather procedures','weather-procedures']]}
];
const allRoutes = new Set(groups.flatMap(g=>g.links.map(x=>'/'+x[1])).concat(['/','/believe','/easter','/subsplash-media']));

function header(){
  return `<header class="site-header" id="siteHeader"><a class="brand" href="${path()}" aria-label="Kingdom Life Christian Church home"><img src="${asset('logo.png')}" alt="Kingdom Life Christian Church"></a><div class="header-phrase">WORSHIP <span>/</span> COMMUNITY <span>/</span> PURPOSE</div><nav class="header-nav" aria-label="Main navigation"><a href="${path('new')}" class="${pageKey==='/new'?'current':''}">Visit</a><a href="${path('life-groups')}">Explore</a><a href="${path('watch-live')}">Watch</a></nav><button class="menu-button" id="menuButton" aria-label="Open menu" aria-expanded="false" aria-controls="menuPanel"><span class="menu-word">MENU</span><span class="menu-glyph" aria-hidden="true"><i></i><i></i></span></button></header>`;
}
function menu(){
  return `<div class="menu-panel" id="menuPanel" aria-hidden="true"><div class="menu-inner"><p class="menu-kicker">KINGDOM LIFE / EXPLORE</p><div class="menu-grid">${groups.map((g,i)=>`<div class="menu-group"><div class="menu-group-title"><span>0${i+1}</span><h2>${g.title}</h2></div>${g.links.map(([label,slug])=>`<a href="${path(slug)}" class="${pageKey==='/'+slug?'current':''}">${label}<span aria-hidden="true">↗</span></a>`).join('')}</div>`).join('')}</div><div class="menu-bottom"><span>YOUR CHURCH FOR LIFE</span><span>Milford, Connecticut · Sundays at 10 AM</span></div></div></div>`;
}
function footer(){
  return `<footer class="site-footer"><div class="footer-top"><img src="${asset('logo.png')}" alt="Kingdom Life Christian Church"><p>A place to seek. A people to belong.</p></div><div class="footer-columns"><div><small>GATHER</small><strong>Sundays · 10:00 AM</strong><span>The Cathedral<br>1455 Naugatuck Avenue<br>Milford, CT 06461</span><a href="${path('new')}">Plan a visit ↗</a></div><div><small>GROW</small><a href="${path('life-groups')}">Life Groups</a><a href="${path('alpha')}">Alpha</a><a href="${path('courses')}">Wednesday courses</a><a href="${path('membership')}">Membership</a><a href="${path('kids')}">Kingdom Kids</a><a href="${path('youth')}">Youth</a></div><div><small>CONNECT</small><a href="${path('prayer')}">Prayer</a><a href="${path('serve')}">Serve</a><a href="${path('watch-live')}">Watch live</a><a href="${path('calendar')}">Calendar</a></div><div><small>REACH US</small><a href="mailto:info@klcc.us">info@klcc.us</a><a href="tel:+12038775464">(203) 877-5464</a><span>Headquarters<br>597 Naugatuck Avenue<br>Milford, CT 06461</span></div></div><div class="footer-base"><span>© ${new Date().getFullYear()} Kingdom Life Christian Church</span><a href="${path('weather-procedures')}">Weather procedures</a></div></footer>`;
}
function marqueeLetters(word, start, spacing=.013){
  return `<span class="marquee-word">${[...word].map((letter,i)=>`<span class="film-letter" data-enter="${(start+i*spacing).toFixed(3)}" data-full="${(start+i*spacing+.048).toFixed(3)}">${esc(letter)}</span>`).join('')}</span>`;
}
function home(){
  return `${header()}${menu()}<main>
  <section class="film-travel" id="top"><div class="film-stage" id="filmStage"><div class="film-marquee"><div class="marquee-title" aria-label="Seek first. Live fully."><span class="marquee-line" aria-hidden="true">${marqueeLetters('SEEK',.045)} ${marqueeLetters('FIRST.',.12)}</span><span class="marquee-line" aria-hidden="true">${marqueeLetters('LIVE',.25)} ${marqueeLetters('FULLY.',.34)}</span></div><p class="film-reveal" data-enter="0.42" data-full="0.49">“Seek first the Kingdom of God.”<br><b>MATTHEW 6:33</b></p></div><div class="film-scene"><img class="film-poster" src="${asset('worship.jpg')}" alt="Kingdom Life congregation worshipping together"><video id="filmVideo" class="film-video" muted playsinline preload="auto" aria-hidden="true"></video><div class="film-shade"></div><div class="film-copy"><p class="film-kicker film-reveal" data-enter="0.48" data-full="0.55">KINGDOM LIFE CHRISTIAN CHURCH · MILFORD</p><h1><span class="film-reveal" data-enter="0.54" data-full="0.62">A FAITH</span><span class="film-reveal" data-enter="0.63" data-full="0.71">WE LIVE</span><span class="film-reveal peach" data-enter="0.72" data-full="0.80">TOGETHER.</span></h1><p class="film-deck film-reveal" data-enter="0.80" data-full="0.87">Gather in worship. Grow in community. Carry hope into the world.</p></div><div class="film-portrait film-reveal" data-enter="0.86" data-full="0.92"><img src="${asset('leadership.jpg')}" alt="KLCC leaders together on stage"><span>ONE CHURCH. MANY STORIES.</span></div></div><div class="film-rail"><div><small class="film-reveal" data-enter="0.82" data-full="0.88">JOIN US THIS SUNDAY</small><strong class="film-reveal" data-enter="0.87" data-full="0.93">10 AM · THE CATHEDRAL</strong></div><a class="film-reveal" data-enter="0.90" data-full="0.97" href="${path('new')}">PLAN A VISIT <span>↗</span></a><a class="film-reveal" data-enter="0.93" data-full="0.99" href="${path('watch-live')}">WATCH ONLINE <span>↗</span></a></div><a class="film-skip" href="#welcome">Skip introduction</a></div></section>
  <section class="welcome-chapter" id="welcome"><div class="welcome-bg"></div><div class="wide-wrap welcome-content"><p class="eyebrow light" data-reveal>01 / WELCOME TO KINGDOM LIFE</p><div class="welcome-feature"><h2 class="display-outline" data-reveal>Church is more<br>than a place.<br><em>It’s a family.</em></h2><figure class="welcome-worship" data-reveal><img src="${asset('worship.jpg')}" alt="KLCC congregation worshipping together"><figcaption>WORSHIP AT KINGDOM LIFE</figcaption></figure></div><div class="welcome-grid"><p data-reveal>Whether this is your first time in church or your first time in a while, there is room to find connection, encouragement, and a next step in faith.</p><div class="welcome-arrival" data-reveal><img src="${asset('story.jpg')}" alt="Aerial view of Kingdom Life Christian Cathedral and parking"><div class="welcome-service"><small>YOUR FIRST SUNDAY</small><strong>10:00 AM</strong><span>1455 Naugatuck Avenue · Milford, CT</span><a class="text-link light-link" href="${path('new')}">What to expect <span>↗</span></a></div></div></div></div></section>
  <section class="chapter paths-chapter" id="next-steps"><div class="wide-wrap"><div class="chapter-heading"><p class="eyebrow" data-reveal>02 / FIND YOUR PLACE</p><h2 data-reveal>Life together,<br><span>in every season.</span></h2><p data-reveal>Start with a Sunday. Find the next step that fits the questions, people, and purpose on your heart.</p></div><div class="journey-grid" aria-label="Ways to connect at Kingdom Life"><a class="journey-card journey-groups" href="${path('life-groups')}" data-reveal><span class="journey-index">01 / COMMUNITY</span><strong>Life Groups</strong><p>Find people who celebrate, support, and encourage you as you follow Jesus.</p><span class="journey-action">EXPLORE LIFE GROUPS <span aria-hidden="true">↗</span></span></a><a class="journey-card journey-alpha" href="${path('alpha')}" data-reveal><span class="journey-index">02 / QUESTIONS</span><strong>Alpha</strong><p>Explore life, faith, and meaning through honest conversation.</p><span class="journey-action">EXPLORE ALPHA <span aria-hidden="true">↗</span></span></a><a class="journey-card journey-wednesday" href="${path('courses')}" data-reveal><span class="journey-index">03 / LEARNING</span><strong>Wednesday Night</strong><p>Bible-centered courses to learn, connect, and grow in faith.</p><span class="journey-action">SEE DISCIPLESHIP COURSES <span aria-hidden="true">↗</span></span></a><a class="journey-card journey-membership" href="${path('membership')}" data-reveal><span class="journey-index">04 / BELONGING</span><strong>Membership</strong><p>Learn KLCC’s culture, discover your purpose, and become part of its story.</p><span class="journey-action">EXPLORE MEMBERSHIP <span aria-hidden="true">↗</span></span></a></div><div class="journey-more" data-reveal><span>READY TO PUT YOUR GIFTS TO WORK?</span><a href="${path('serve')}">Explore serving <span aria-hidden="true">↗</span></a></div></div></section>
  <section class="chapter generations-chapter"><div class="wide-wrap"><div class="generation-image" data-reveal><img src="${asset('leadership.jpg')}" alt="KLCC leaders on stage"><span>THE PEOPLE BEHIND THE PURPOSE</span></div><div class="generation-copy"><p class="eyebrow" data-reveal>03 / EVERY GENERATION</p><h2 data-reveal>There’s a<br>place for <i>you.</i></h2><p data-reveal>From Kingdom Kids to youth, young adults, women’s and men’s ministries, find people to walk alongside you.</p><div class="generation-links" data-reveal><a href="${path('kids')}">Kingdom Kids <span>↗</span></a><a href="${path('youth')}">Youth <span>↗</span></a><a href="${path('young-adults')}">Young adults <span>↗</span></a><a href="${path('women')}">Women <span>↗</span></a><a href="${path('men')}">Men <span>↗</span></a></div></div></div></section>
  <section class="chapter mission-chapter"><div class="wide-wrap"><p class="eyebrow light" data-reveal>04 / OUR PURPOSE</p><h2 data-reveal>REACH PEOPLE.<br><span>BREAK DOWN WALLS.</span><br>SERVE WITH LOVE.</h2><div class="mission-tail"><p data-reveal>KLCC’s mission is to proclaim and demonstrate the gospel of the Kingdom. Its vision includes restoration, preparing the next generation, and serving the community with humility and compassion.</p><a class="outline-action" href="${path('mission')}" data-reveal>OUR MISSION & VISION <span>↗</span></a></div></div></section>
  <section class="chapter watch-chapter"><div class="wide-wrap"><div><p class="eyebrow" data-reveal>05 / JOIN FROM ANYWHERE</p><h2 data-reveal>Be here.<br>Or tune in.</h2><p data-reveal>Worship with us on Sunday at the Cathedral or watch the service online. Previous messages are here when you need them.</p><div class="watch-actions" data-reveal><a class="dark-action" href="${path('watch-live')}">WATCH LIVE <span>↗</span></a><a class="text-link" href="${path('previous-messages')}">PREVIOUS MESSAGES ↗</a></div></div><div class="watch-photo" data-reveal><img src="${asset('worship.jpg')}" alt="KLCC worship service"></div></div></section>
  <section class="visit-band"><div class="wide-wrap"><p class="eyebrow light" data-reveal>YOUR NEXT STEP</p><h2 data-reveal>COME AS YOU ARE.<br><span>WE’LL SEE YOU SUNDAY.</span></h2><div><span>SUNDAY WORSHIP · 10:00 AM · 1455 NAUGATUCK AVENUE</span><a href="${path('new')}">PLAN YOUR VISIT ↗</a></div></div></section>
  </main>${footer()}`;
}

function safeHref(href){
  if (!href) return '';
  try {
    const u = new URL(href, 'https://klcc.us');
    if (u.hostname === 'klcc.us' || u.hostname === 'www.klcc.us') {
      const route = u.pathname.replace(/\/$/,'') || '/';
      return allRoutes.has(route) ? path(route === '/' ? '' : route) + (u.hash||'') : '';
    }
    if (['https:','http:','mailto:','tel:'].includes(u.protocol)) return href;
  } catch {}
  return '';
}

function sectionView(section,index){
  const blocks = section.blocks || [];
  const heading = blocks.find(b=>/^h[1-4]$/.test(b.type));
  const rest = blocks.filter(b=>b!==heading);
  const title = heading?.text || (index===0?'Explore':'More to know');
  const body = rest.map(b=> b.type==='li' ? `<p class="detail-list-item">${esc(b.text)}</p>` : /^h[1-4]$/.test(b.type) ? `<h3>${esc(b.text)}</h3>` : `<p>${esc(b.text)}</p>`).join('');
  const links=(section.actions||[]).map(a=>{if(/^(on break|coming soon)$/i.test(a.label))return '';const dest=safeHref(a.href);if(!dest)return '';const external=!dest.startsWith(root);return `<a href="${esc(dest)}" ${external?'target="_blank" rel="noopener noreferrer"':''}>${esc(a.label)} <span aria-hidden="true">↗</span></a>`}).filter(Boolean).slice(0,6).join('');
  if (!body && !links && index===0) return '';
  return `<section class="detail-section ${index%2?'detail-alt':''}" id="section-${index}"><div class="wide-wrap detail-layout"><div class="detail-heading" data-reveal><span class="detail-number">${String(index+1).padStart(2,'0')}</span><h2>${esc(title)}</h2></div><div class="detail-body" data-reveal>${body}${links?`<div class="detail-actions">${links}</div>`:''}</div></div></section>`;
}

function detail(page){
  const title=({'/new':'Plan your visit','/subsplash-media':'Media library','/watch-live':'Watch live'})[pageKey] || page.title || pageKey.replace('/','').replaceAll('-',' ');
  const cleaned=(page.sections||[]).filter(s=>(s.blocks||[]).some(b=>b.text));
  const route=pageKey.slice(1);
  const tailored={
    'new':'Your first Sunday should feel like coming home. Find the time, place, and people who will welcome you.',
    'courses':'A midweek space for questions, Scripture, and practical growth in faith.',
    'watch-live':'Join the Sunday service from wherever you are, or catch a message when you have a moment.',
    'previous-messages':'Return to a message that moved you, or discover a new one for today.',
    'kids':'A place for little ones to discover faith, friendship, and joy at their own pace.',
    'youth':'Young people have room to belong, ask questions, and grow together.',
    'life-groups':'Faith has a way of growing when we make room for one another.'
  };
  const intro=tailored[route] || cleaned.flatMap(s=>s.blocks||[]).find(b=>b.type==='p'&&b.text.length>55)?.text || `Discover ${title.toLowerCase()} at Kingdom Life Christian Church.`;
  const image=({'new':'story.jpg','our-story':'story.jpg','mission':'story.jpg','leadership':'leadership.jpg','kids':'worship.jpg','youth':'worship.jpg','life-groups':'leadership.jpg','serve':'worship.jpg','courses':'leadership.jpg','prayer':'worship.jpg'})[route]||'worship.jpg';
  const index=groups.findIndex(g=>g.links.some(l=>l[1]===route));
  const category=index>=0?groups[index].title:'Kingdom Life';
  const special=route==='watch-live'?`<div class="media-panel" id="live-service"><h2>Watch the service</h2><p>Sunday worship begins at 10:00 AM Eastern. The live stream is provided through KLCC’s existing media platform.</p><iframe title="KLCC live service" src="https://subsplash.com/u/-TPGJTK/media/embed/d/*next-live" loading="lazy" allowfullscreen></iframe><a href="https://online.brushfire.com/klcc/" target="_blank" rel="noopener noreferrer">OPEN LIVE SERVICE ↗</a></div>`:route==='calendar'?`<div class="media-panel"><h2>Events & gatherings</h2><p>See the latest events from KLCC’s existing calendar platform.</p><iframe title="KLCC events calendar" src="https://subsplash.com/+7664/lb/ca/+h3pghwr?embed&branding" loading="lazy"></iframe><a href="https://subsplash.com/+7664/lb/ca/+h3pghwr?embed&branding" target="_blank" rel="noopener noreferrer">OPEN EVENTS CALENDAR ↗</a></div>`:route==='previous-messages'||route==='subsplash-media'?`<div class="media-panel"><h2>Messages on demand</h2><p>Watch recent teaching through KLCC’s media library.</p><iframe title="KLCC message library" src="https://subsplash.com/+7664/lb/li/+vb859jk?embed&branding" loading="lazy" allowfullscreen></iframe><a href="https://www.youtube.com/user/KLCCMilford/videos" target="_blank" rel="noopener noreferrer">WATCH ON YOUTUBE ↗</a></div>`:route==='give'?`<div class="media-panel"><h2>Give online</h2><p>Secure giving is handled by KLCC’s existing giving provider.</p><iframe title="KLCC online giving" src="https://subsplash.com/u/-TPGJTK/give?embed=true" loading="lazy"></iframe><a href="https://subsplash.com/u/-TPGJTK/give" target="_blank" rel="noopener noreferrer">OPEN SECURE GIVING ↗</a></div>`:route==='easter'?`<div class="media-panel"><h2>Past event</h2><p>This page records the Easter Sunday service of April 5, 2026. For an upcoming Sunday, see the current visit information.</p><a href="${path('new')}">PLAN A CURRENT VISIT ↗</a></div>`:'';
  const related=({'new':[['I believe','believe'],['Baptism','baptism'],['Kingdom Kids','kids']], 'calendar':[['Easter 2026 archive','easter'],['Courses','courses'],['Life Groups','life-groups']], 'previous-messages':[['Media library','subsplash-media'],['Watch live','watch-live'],['KLCC app','app']]}[route]||[['Plan a visit','new'],['Find a Life Group','life-groups'],['Prayer & care','prayer']]);
  const heroActions=route==='new'?[['WHAT TO EXPECT','#section-0'],['KINGDOM KIDS',path('kids')]]:route==='watch-live'?[['GO TO LIVE SERVICE','#live-service'],['PAST MESSAGES',path('previous-messages')]]:route==='courses'?[['EXPLORE COURSES','#section-0'],['LIFE GROUPS',path('life-groups')]]:route==='previous-messages'?[['BROWSE MESSAGES','#section-0'],['JOIN US SUNDAY',path('new')]]:[['PLAN A VISIT',path('new')],['WATCH ONLINE',path('watch-live')]];
  const heroLinks=heroActions.map(([label,url])=>`<a href="${url}">${label} ↗</a>`).join('');
  return `${header()}${menu()}<main><section class="detail-hero"><div class="detail-hero-photo"><img src="${asset(image)}" alt="${esc(title)} at Kingdom Life Christian Church"></div><div class="wide-wrap detail-hero-content"><p class="eyebrow light">${esc(category.toUpperCase())} / KINGDOM LIFE</p><h1>${esc(title)}</h1><p>${esc(intro)}</p><div class="detail-hero-links">${heroLinks}</div></div></section>${special}<div class="detail-content">${cleaned.map(sectionView).join('')}</div><section class="detail-closer"><div class="wide-wrap"><small>KEEP EXPLORING</small><h2>There is more<br>to life together.</h2><div>${related.map(([label,slug])=>`<a href="${path(slug)}">${label} ↗</a>`).join('')}</div></div></section></main>${footer()}`;
}

function activate(){
  const menuButton=document.getElementById('menuButton');
  const panel=document.getElementById('menuPanel');
  function toggle(open){menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close menu':'Open menu');panel.setAttribute('aria-hidden',String(!open));document.body.classList.toggle('menu-open',open);if(open)panel.querySelector('a')?.focus();else menuButton.focus()}
  menuButton.addEventListener('click',()=>toggle(menuButton.getAttribute('aria-expanded')!=='true'));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('menu-open'))toggle(false)});
  panel.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{document.body.classList.remove('menu-open');panel.setAttribute('aria-hidden','true')}));
  const revealObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('seen');revealObserver.unobserve(e.target)}})},{threshold:.14,rootMargin:'0px 0px -4% 0px'});
  document.querySelectorAll('[data-reveal]').forEach((el,i)=>{el.style.setProperty('--stagger',(i%3)*90+'ms');revealObserver.observe(el)});
  const stage=document.getElementById('filmStage');
  const travel=document.querySelector('.film-travel');
  if(!stage||!travel){document.documentElement.style.setProperty('--header-progress','1');return}
  const video=document.getElementById('filmVideo');
  let duration=0,raf=0,pending=0;
  // A produced clip is installed at this exact path after its quality gate.
  if(document.body.dataset.film==='ready'){
    video.src=asset('hero-film.mp4');
    video.addEventListener('loadedmetadata',()=>{duration=video.duration;video.classList.add('ready');schedule()});
  }
  function ease(v){return v*v*(3-2*v)}
  function schedule(){if(!raf)raf=requestAnimationFrame(update)}
  function update(){
    raf=0;
    const h=Math.max(1,travel.offsetHeight-innerHeight);
    const raw=Math.max(0,Math.min(1,-travel.getBoundingClientRect().top/h));
    const p=matchMedia('(prefers-reduced-motion: reduce)').matches?1:raw;
    const between=(a,b)=>ease(Math.max(0,Math.min(1,(p-a)/(b-a))));
    stage.style.setProperty('--film-progress',p.toFixed(4));
    stage.style.setProperty('--marquee-open',between(.012,.14).toFixed(4));
    stage.style.setProperty('--rail-open',between(.76,.88).toFixed(4));
    document.documentElement.style.setProperty('--header-progress',Math.min(1,p*1.8).toFixed(4));
    document.getElementById('siteHeader').style.setProperty('--header-words',between(.84,.95).toFixed(4));
    document.body.classList.toggle('hero-nav-ready',p>.94);
    document.querySelectorAll('.header-nav a').forEach(a=>a.tabIndex=p>.94?0:-1);
    document.querySelectorAll('.film-letter').forEach(el=>{
      const v=between(+el.dataset.enter,+el.dataset.full);
      el.style.opacity=v.toFixed(3);
      el.style.transform=`translateY(${((1-v)*110).toFixed(1)}%)`;
    });
    document.querySelectorAll('.film-reveal').forEach(el=>{
      const v=between(+el.dataset.enter,+el.dataset.full);
      el.style.opacity=v.toFixed(3);
      el.style.transform=`translateY(${((1-v)*32).toFixed(1)}px)`;
      el.style.pointerEvents=v>.92?'auto':'none';
      if(el.tagName==='A')el.tabIndex=v>.92?0:-1;
    });
    if(duration&&video.readyState>=2){const target=Math.min(duration-.03,p*duration);if(Math.abs(video.currentTime-target)>.04)video.currentTime=target}
    pending=p;
  }
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);schedule();
}

if(document.getElementById('app').children.length&&!new URLSearchParams(location.search).has('prerender')){
  activate();
}else{
  fetch(root+'content.json').then(r=>r.json()).then(data=>{
    const page=data.pages[pageKey];
    document.getElementById('app').innerHTML=pageKey==='/'?home():detail(page||{title:'Explore Kingdom Life',sections:[]});
    activate();
  }).catch(()=>{document.getElementById('app').textContent='The page could not load. Please refresh or email info@klcc.us.'});
}
