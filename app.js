document.body.classList.add('experience-rebuild');
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
  return `<header class="site-header" id="siteHeader"><a class="brand" href="${path()}" aria-label="Kingdom Life Christian Church home"><img src="${asset('logo.png')}" alt="Kingdom Life Christian Church"></a><div class="header-phrase">WORSHIP <span>/</span> COMMUNITY <span>/</span> PURPOSE</div><nav class="header-nav" aria-label="Main navigation"><a href="${path('new')}" class="${pageKey==='/new'?'current':''}" ${pageKey==='/new'?'aria-current="page"':''}>Visit</a><a href="${path('life-groups')}" class="${['/life-groups','/kids','/youth','/young-adults','/women','/men','/alpha','/membership','/courses'].includes(pageKey)?'current':''}">Explore</a><a href="${path('watch-live')}" class="${['/watch-live','/previous-messages','/subsplash-media'].includes(pageKey)?'current':''}">Watch</a></nav><button class="menu-button" id="menuButton" aria-label="Open menu" aria-expanded="false" aria-controls="menuPanel"><span class="menu-word">MENU</span><span class="menu-glyph" aria-hidden="true"><i></i><i></i></span></button></header>`;
}
function menu(){
  return `<div class="menu-panel" id="menuPanel" aria-hidden="true"><div class="menu-inner"><p class="menu-kicker">KINGDOM LIFE / EXPLORE</p><div class="menu-grid">${groups.map((g,i)=>`<div class="menu-group"><div class="menu-group-title"><span>0${i+1}</span><h2>${g.title}</h2></div>${g.links.map(([label,slug])=>`<a href="${path(slug)}" class="${pageKey==='/'+slug?'current':''}">${label}<span aria-hidden="true">↗</span></a>`).join('')}</div>`).join('')}</div><div class="menu-bottom"><span>YOUR CHURCH FOR LIFE</span><span>Milford, Connecticut · Sundays at 10 AM</span></div></div></div>`;
}
function footer(){
  return `<footer class="site-footer"><div class="footer-top"><img src="${asset('logo.png')}" alt="Kingdom Life Christian Church"><p>Your church<br>for life.</p></div><div class="footer-columns"><div><small>GATHER</small><strong>Sundays · 10:00 AM</strong><span>The Cathedral<br>1455 Naugatuck Avenue<br>Milford, CT 06461</span><a href="${path('new')}">Plan a visit ↗</a></div><div><small>GROW</small><a href="${path('life-groups')}">Life Groups</a><a href="${path('alpha')}">Alpha</a><a href="${path('courses')}">Wednesday courses</a><a href="${path('membership')}">Membership</a><a href="${path('kids')}">Kingdom Kids</a><a href="${path('youth')}">Youth</a></div><div><small>CONNECT</small><a href="${path('prayer')}">Prayer</a><a href="${path('serve')}">Serve</a><a href="${path('watch-live')}">Watch live</a><a href="${path('calendar')}">Calendar</a></div><div><small>REACH US</small><a href="mailto:info@klcc.us">info@klcc.us</a><a href="tel:+12038775464">(203) 877-5464</a><span>Headquarters<br>597 Naugatuck Avenue<br>Milford, CT 06461</span></div></div><div class="footer-base"><span>© ${new Date().getFullYear()} Kingdom Life Christian Church</span><a href="${path('weather-procedures')}">Weather procedures</a></div></footer>`;
}
function marqueeLetters(word, start, spacing=.013){
  return `<span class="marquee-word">${[...word].map((letter,i)=>`<span class="film-letter" data-enter="${(start+i*spacing).toFixed(3)}" data-full="${(start+i*spacing+.048).toFixed(3)}">${esc(letter)}</span>`).join('')}</span>`;
}
function journeyIcon(name){
  return `<span class="journey-icon" aria-hidden="true"><img src="${asset(`icons/${name}.svg`)}" alt=""></span>`;
}
function home(){
  return `${header()}${menu()}<main>
  <section class="film-travel" id="top"><div class="film-stage" id="filmStage"><div class="film-marquee"><div class="marquee-title" aria-label="Seek first. Live fully."><span class="marquee-line" aria-hidden="true">${marqueeLetters('SEEK',.045)} ${marqueeLetters('FIRST.',.12)}</span><span class="marquee-line" aria-hidden="true">${marqueeLetters('LIVE',.25)} ${marqueeLetters('FULLY.',.34)}</span></div><p class="film-reveal" data-enter="0.42" data-full="0.49">“Seek first the Kingdom of God.”<br><b>MATTHEW 6:33</b></p></div><div class="film-scene"><img class="film-poster" src="${asset('worship.jpg')}" alt="Kingdom Life congregation worshipping together"><video id="filmVideo" class="film-video" muted playsinline preload="auto" aria-hidden="true"></video><div class="film-shade"></div><div class="film-copy"><p class="film-kicker film-reveal" data-enter="0.48" data-full="0.55">KINGDOM LIFE CHRISTIAN CHURCH · MILFORD</p><h1><span class="film-reveal" data-enter="0.54" data-full="0.62">A FAITH</span><span class="film-reveal" data-enter="0.63" data-full="0.71">WE LIVE</span><span class="film-reveal peach" data-enter="0.72" data-full="0.80">TOGETHER.</span></h1><p class="film-deck film-reveal" data-enter="0.80" data-full="0.87">Gather in worship. Grow in community. Carry hope into the world.</p></div><div class="film-portrait film-reveal" data-enter="0.86" data-full="0.92"><img src="${asset('leadership.jpg')}" alt="KLCC leaders together on stage"><span>ONE CHURCH. MANY STORIES.</span></div></div><div class="film-rail"><div><small class="film-reveal" data-enter="0.82" data-full="0.88">JOIN US THIS SUNDAY</small><strong class="film-reveal" data-enter="0.87" data-full="0.93">10 AM · THE CATHEDRAL</strong></div><a class="film-reveal" data-enter="0.90" data-full="0.97" href="${path('new')}">PLAN A VISIT <span>↗</span></a><a class="film-reveal" data-enter="0.93" data-full="0.99" href="${path('watch-live')}">WATCH ONLINE <span>↗</span></a></div><a class="film-skip" href="#welcome">Skip introduction</a></div></section>
  <section class="welcome-chapter" id="welcome"><div class="welcome-bg"></div><div class="wide-wrap welcome-content"><p class="eyebrow light" data-reveal>01 / WELCOME TO KINGDOM LIFE</p><div class="welcome-feature"><h2 class="display-outline" data-reveal>Church is more<br>than a place.<br><em>It’s a family.</em></h2><figure class="welcome-worship" data-reveal data-depth><img src="${asset('worship.jpg')}" alt="KLCC congregation worshipping together"><figcaption>WORSHIP AT KINGDOM LIFE</figcaption></figure></div><div class="welcome-grid"><p data-reveal>Whether this is your first time in church or your first time in a while, there is room to find connection, encouragement, and a next step in faith.</p><div class="welcome-arrival" data-reveal><img src="${asset('story.jpg')}" alt="Aerial view of Kingdom Life Christian Cathedral and parking"><div class="welcome-service"><small>YOUR FIRST SUNDAY</small><strong>10:00 AM</strong><span>1455 Naugatuck Avenue · Milford, CT</span><a class="text-link light-link" href="${path('new')}">What to expect <span>↗</span></a></div></div></div></div></section>
  <section class="chapter paths-chapter" id="next-steps"><div class="wide-wrap"><div class="chapter-heading"><p class="eyebrow" data-reveal>02 / FIND YOUR PLACE</p><h2 data-reveal>Life together,<br><span>in every season.</span></h2><p data-reveal>Start with a Sunday. Find the next step that fits the questions, people, and purpose on your heart.</p></div><div class="journey-grid" aria-label="Ways to connect at Kingdom Life"><a class="journey-card journey-groups" href="${path('life-groups')}" data-reveal><span class="journey-index">01 / COMMUNITY</span>${journeyIcon('users-three')}<strong>Life Groups</strong><p>Find people who celebrate, support, and encourage you as you follow Jesus.</p><span class="journey-action">EXPLORE LIFE GROUPS <span aria-hidden="true">↗</span></span></a><a class="journey-card journey-alpha" href="${path('alpha')}" data-reveal><span class="journey-index">02 / QUESTIONS</span>${journeyIcon('chat-circle-dots')}<strong>Alpha</strong><p>Explore life, faith, and meaning through honest conversation.</p><span class="journey-action">EXPLORE ALPHA <span aria-hidden="true">↗</span></span></a><a class="journey-card journey-wednesday" href="${path('courses')}" data-reveal><span class="journey-index">03 / LEARNING</span>${journeyIcon('book-open-text')}<strong>Wednesday Night</strong><p>Bible-centered courses to learn, connect, and grow in faith.</p><span class="journey-action">SEE DISCIPLESHIP COURSES <span aria-hidden="true">↗</span></span></a><a class="journey-card journey-membership" href="${path('membership')}" data-reveal><span class="journey-index">04 / BELONGING</span>${journeyIcon('handshake')}<strong>Membership</strong><p>Learn KLCC’s culture, discover your purpose, and become part of its story.</p><span class="journey-action">EXPLORE MEMBERSHIP <span aria-hidden="true">↗</span></span></a></div><div class="journey-more" data-reveal><span>READY TO PUT YOUR GIFTS TO WORK?</span><a href="${path('serve')}">Explore serving <span aria-hidden="true">↗</span></a></div></div></section>
  <section class="chapter generations-chapter"><div class="wide-wrap"><figure class="generation-image" data-reveal data-depth><img src="${asset('leadership.jpg')}" alt="KLCC leaders on stage"><figcaption>LEADERSHIP / ROOM FOR EVERY GENERATION</figcaption></figure><div class="generation-copy"><p class="eyebrow light" data-reveal>03 / EVERY GENERATION</p><h2 data-reveal>There’s a<br>place for <i>you.</i></h2><p data-reveal>KLCC’s vision is intergenerational. Its leaders and ministries make room to grow in faith, from Kingdom Kids through adult community.</p><nav class="generation-links" aria-label="Ministries for every generation"><a href="${path('kids')}" data-reveal>Kingdom Kids <span>↗</span></a><a href="${path('youth')}" data-reveal>Youth <span>↗</span></a><a href="${path('young-adults')}" data-reveal>Young adults <span>↗</span></a><a href="${path('women')}" data-reveal>Women <span>↗</span></a><a href="${path('men')}" data-reveal>Men <span>↗</span></a></nav></div></div></section>
  <section class="outreach-story" data-chapter><div class="wide-wrap outreach-layout"><figure data-depth><img src="${asset('community-pantry.jpg')}" alt="Kingdom Life volunteers sharing fresh produce at community outreach" loading="lazy"><figcaption>COMMUNITY OUTREACH / KINGDOM LIFE</figcaption></figure><div><p class="eyebrow" data-reveal>FAITH BEYOND SUNDAY</p><h2 data-reveal>Love becomes<br>something<br><em>you do.</em></h2><p data-reveal>Serve the church. Care for the community. Discover where your gifts can make a difference.</p><a class="text-link" href="${path('serve')}" data-reveal>Find a place to serve <span aria-hidden="true">↗</span></a></div></div></section>
  <section class="chapter mission-chapter"><div class="wide-wrap"><p class="eyebrow" data-reveal>04 / OUR PURPOSE</p><h2><span class="mission-line" data-reveal>REACH PEOPLE.</span><span class="mission-line" data-reveal>BREAK DOWN WALLS.</span><span class="mission-line" data-reveal>SERVE WITH LOVE.</span></h2><div class="mission-tail"><figure class="mission-archive" data-reveal><img src="${asset('founding-1991.jpg')}" alt="Archival photograph of an early Kingdom Life church gathering"><figcaption>FROM THE KINGDOM LIFE STORY ARCHIVE</figcaption></figure><div class="mission-story"><p class="mission-origin" data-reveal>BEGUN IN 1991 WITH ABOUT 40 PEOPLE.</p><p data-reveal>KLCC’s mission is to proclaim and demonstrate the gospel of the Kingdom. Its vision includes restoration, preparing the next generation, and serving the community with humility and compassion.</p><a class="outline-action" href="${path('mission')}" data-reveal>OUR MISSION & VISION <span>↗</span></a></div></div></div></section>
  <section class="chapter watch-chapter"><div class="wide-wrap"><div class="watch-copy"><p class="eyebrow light" data-reveal>05 / JOIN FROM ANYWHERE</p><h2 data-reveal>Be here.<br>Or tune in.</h2><p data-reveal>Worship with us on Sunday at the Cathedral or watch the service online. Previous messages are here when you need them.</p><div class="watch-actions" data-reveal><a class="dark-action" href="${path('watch-live')}">WATCH LIVE <span>↗</span></a><a class="text-link" href="${path('previous-messages')}">PREVIOUS MESSAGES ↗</a></div></div><figure class="watch-photo" data-reveal data-depth><img src="${asset('worship-stage.jpg')}" alt="KLCC worship team leading a service on stage"><figcaption>WORSHIP AT KINGDOM LIFE / MILFORD</figcaption></figure></div></section>
  <section class="visit-band"><div class="wide-wrap visit-layout"><div class="visit-copy"><p class="eyebrow" data-reveal>06 / YOUR FIRST SUNDAY</p><h2 data-reveal>COME AS YOU ARE.<br><span>WE’LL SEE YOU SUNDAY.</span></h2><p class="visit-note" data-reveal>Worship begins at 10:00 AM at the Cathedral in Milford. Find the details before you arrive.</p><div class="visit-details" data-reveal><span>10:00 AM<br><small>SUNDAY WORSHIP</small></span><span>1455 NAUGATUCK AVENUE<br><small>MILFORD, CONNECTICUT</small></span></div><a class="visit-action" href="${path('new')}" data-reveal>PLAN YOUR VISIT <span aria-hidden="true">↗</span></a></div><figure class="visit-place" data-reveal data-depth><img src="${asset('story.jpg')}" alt="Aerial photograph of Kingdom Life Christian Cathedral and its parking area"><figcaption>THE CATHEDRAL / MILFORD</figcaption></figure></div></section>
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

const pageFamilies = {
  story:new Set(['our-story','leadership','mission']),
  generations:new Set(['kids','youth','young-adults','women','men']),
  invitation:new Set(['new','life-groups','membership','alpha','courses','serve','baptism','believe']),
  reflection:new Set(['beliefs','prayer','pastoral-care']),
  practical:new Set(['weather-procedures','easter','watch-live','previous-messages','calendar','give','app','subsplash-media'])
};
const pageFacts = {
  'new':['SUNDAYS · 10:00 AM','THE CATHEDRAL · MILFORD'],
  'our-story':['BEGUN IN 1991','ABOUT 40 PEOPLE AT THE START'],
  'kids':['6 WEEKS–GRADE 6','KINGDOM KIDS'],
  'youth':['GRADES 7–12','WEDNESDAYS · 7:30 PM · YOUTH CENTER'],
  'young-adults':['THIRD SATURDAY · 7 PM','YOUTH CENTER'],
  'life-groups':['12-WEEK TRIMESTERS','FIND A GROUP THAT FITS YOUR LIFE'],
  'alpha':['FALL 2026 · SEP 23–DEC 9','WEDNESDAYS · THE CATHEDRAL'],
  'membership':['NEXT CLASS · OCT 24, 2026','9 AM–3 PM · THE CATHEDRAL'],
  'courses':['WEDNESDAY NIGHTS','DISCIPLESHIP AT KINGDOM LIFE'],
  'men':['SUNDAYS · 7 AM','CATHEDRAL LOBBY PRAYER'],
  'baptism':['THE NEXT STEP','AFTER YOUR DECISION TO FOLLOW JESUS'],
  'watch-live':['SUNDAYS · 10:00 AM','WORSHIP FROM WHEREVER YOU ARE']
};
const pageMarks = {
  'youth':'ELEVATE', 'kids':'KINGDOM KIDS', 'young-adults':'RED / RISE',
  'life-groups':'LIFE TOGETHER', 'our-story':'SINCE 1991', 'new':'YOUR FIRST SUNDAY',
  'courses':'MIDWEEK / KLCC', 'watch-live':'LIVE / KLCC', 'previous-messages':'THE ARCHIVE'
};
function familyFor(route){return Object.entries(pageFamilies).find(([,routes])=>routes.has(route))?.[0]||'reflection'}
function imageFor(route){
  if(route==='watch-live')return 'worship-stage.jpg';
  if(route==='subsplash-media')return 'worship-stage.jpg';
  if(route==='mission'||route==='our-story')return 'founding-1991.jpg';
  if(route==='new')return 'story.jpg';
  if(route==='believe')return 'worship.jpg';
  if(route==='life-groups')return 'worship.jpg';
  if(route==='alpha')return 'klcc-alpha-original.jpg';
  if(route==='membership')return 'klcc-membership-original.jpg';
  return `page/${route}.jpg`;
}
function heroImageAlt(route,title){
  return ({'new':'Aerial view of Kingdom Life Christian Cathedral','our-story':'Archival photograph of an early Kingdom Life gathering','mission':'Archival photograph of an early Kingdom Life gathering','life-groups':'Kingdom Life congregation gathered for worship','believe':'Kingdom Life congregation gathered for worship','leadership':'KLCC leaders together on stage','watch-live':'KLCC worship team leading a service','subsplash-media':'KLCC worship team leading a service'})[route]||`Artwork featured on KLCC’s original ${title} page`;
}
function sourceText(value){return String(value||'').replace(/programing designed for specifically for/g,'programming designed specifically for').replace(/first time visit/g,'first visit').replace(/Let us Know/g,'Let us know').replace(/in awhile/g,'in a while').replace(/(\d+)-(\d+)\s+th\b/gi,'$1th–$2th').replace(/(\d)\s+th\b/gi,'$1th').replace(/\s+([.,!?])/g,'$1')}
function readableParagraph(value){
  const text=sourceText(value);
  if(text.length<650)return `<p>${esc(text)}</p>`;
  const boundaries=[...text.matchAll(/[.!?](?=\s|$)/g)].map(match=>match.index+1);
  const cut=boundaries.find(position=>position>=260&&position<=560);
  if(!cut)return `<p>${esc(text)}</p>`;
  return `<p>${esc(text.slice(0,cut))}</p><details class="detail-more"><summary>Continue reading <span aria-hidden="true">↘</span></summary><p>${esc(text.slice(cut).trim())}</p></details>`;
}
const unheadedTitles={
 'leadership':{1:'Leading with care.'},'kids':{1:'A place to grow.'},
 'young-adults':{1:'Community for your chapter.'},
 'women':{1:'Grow in faith. Together.',2:'Your year at a glance.'},
 'men':{1:'Leading. Serving. Growing.',2:'Gatherings for your calendar.',3:'Begin the week in prayer.'},
 'easter':{0:'Easter 2026 / The archive'}
};
function sectionTitle(heading,index,route){return sourceText(heading?.text||unheadedTitles[route]?.[index]||(index===0?'Explore':'More to know'))}
function sectionView(section,index,context){
  const blocks = (section.blocks || []).filter(b=>!/\bpage under construction\b/i.test(b.text||''));
  const heading = blocks.find(b=>/^h[1-4]$/.test(b.type));
  const rest = blocks.filter(b=>b!==heading);
  const title = sectionTitle(heading,index,context.route);
  const body = rest.map(b=> b.type==='li' ? `<p class="detail-list-item">${esc(sourceText(b.text))}</p>` : /^h[1-4]$/.test(b.type) ? `<h3>${esc(sourceText(b.text))}</h3>` : `<p>${esc(sourceText(b.text))}</p>`).join('');
  const links=(section.actions||[]).map(a=>{if(/^(on break|coming soon)$/i.test(a.label))return '';const dest=safeHref(a.href);if(!dest)return '';const external=!dest.startsWith(root);return `<a href="${esc(dest)}" ${external?'target="_blank" rel="noopener noreferrer"':''}>${esc(a.label)} <span aria-hidden="true">↗</span></a>`}).filter(Boolean).join('');
  if (!body && !links && index===0) return '';
  if(context.route==='our-story'&&index===1){
    const original=rest.find(b=>b.type==='p')?.text||'';
    return `<section class="detail-section founder-feature" id="section-1"><div class="wide-wrap founder-layout"><figure data-reveal><img src="${asset('founders-portrait.jpg')}" alt="Kingdom Life founding pastors Bishop Jay and Jeannine Ramirez"><figcaption>THE FOUNDING PASTORS / KINGDOM LIFE</figcaption></figure><div data-reveal><span class="detail-number">02 / OUR STORY</span><h2>Bishop Jay &amp;<br>Jeannine Ramirez</h2><p>Bishop Jay and Jeannine Ramirez founded and shaped Kingdom Life. Their leadership is woven into its mission, community, and vision for future generations.</p><details><summary>Read their story <span aria-hidden="true">↘</span></summary><p>${esc(sourceText(original))}</p></details></div></div></section>`;
  }
  if(context.route==='beliefs'&&index===1){
    const statements=(rest.find(b=>b.type==='p')?.text||'').split(/\.{3,}/).map(x=>x.trim()).filter(Boolean);
    return `<section class="detail-section belief-chapter" id="section-1"><div class="wide-wrap"><span class="detail-number" data-reveal>02 / WHAT WE BELIEVE</span><h2 data-reveal>These beliefs<br>shape our life.</h2><div class="belief-list">${statements.map((statement,i)=>`<div data-reveal><span>${String(i+1).padStart(2,'0')}</span><p>${esc(sourceText(statement))}</p></div>`).join('')}</div></div></section>`;
  }
  if(context.route==='life-groups'&&index===3){
    const items=[];
    for(let i=0;i<blocks.length;i++)if(blocks[i].type==='h3'&&blocks[i+1]?.type==='p')items.push([sourceText(blocks[i].text),sourceText(blocks[i+1].text)]);
    const registration=safeHref(context.page.sections?.[2]?.actions?.[0]?.href||'');
    return `<section class="detail-section groups-directory" id="section-3"><div class="wide-wrap"><div class="groups-head" data-reveal><span class="detail-number">04 / LIFE GROUPS</span><h2>Find your people.</h2><p>Choose the kind of conversation and community that fits your life.</p></div><div class="groups-list">${items.map(([name,description],i)=>`<div class="group-row" data-reveal><span>${String(i+1).padStart(2,'0')}</span><h3>${esc(name)}</h3><p>${esc(description)}</p></div>`).join('')}</div>${registration?`<a class="groups-register" href="${esc(registration)}" target="_blank" rel="noopener noreferrer">REGISTER FOR LIFE GROUPS <span aria-hidden="true">↗</span></a>`:''}</div></section>`;
  }
  if(context.route==='membership'&&index===2){
    const items=[];
    for(let i=0;i<blocks.length;i++)if(blocks[i].type==='h3'){
      const detail=[];for(let j=i+1;j<blocks.length&&blocks[j].type!=='h3';j++)if(blocks[j].type==='p')detail.push(blocks[j].text);
      items.push([sourceText(blocks[i].text),detail.map(sourceText)]);
    }
    return `<section class="detail-section membership-steps" id="section-2"><div class="wide-wrap"><span class="detail-number" data-reveal>03 / MEMBERSHIP AT KINGDOM LIFE</span><h2 data-reveal>Belong. Discover.<br>Put purpose to work.</h2><div class="membership-step-grid">${items.map(([name,paragraphs],i)=>`<div data-reveal><span>${String(i+1).padStart(2,'0')}</span><h3>${esc(name)}</h3>${paragraphs.map(p=>`<p>${esc(p)}</p>`).join('')}</div>`).join('')}</div></div></section>`;
  }
  if(context.route==='leadership'&&index>=4){
    const people=[];for(const b of blocks){if(b.type==='h3')people.push({name:b.text,body:[]});else if(people.length)people.at(-1).body.push(b.text)}
    return `<section class="detail-section leadership-directory" id="section-${index}"><div class="wide-wrap"><p class="eyebrow">${index===4?'MEET OUR TEAM':'OUR PASTORAL TEAM'}</p><div class="people-list">${people.map((person,i)=>`<details data-reveal><summary><span>${String(i+1+(index===5?3:0)).padStart(2,'0')}</span><h2>${esc(person.name)}</h2><span class="person-role">${esc(person.body[0])}</span><span class="disclosure-word">Read bio</span></summary><div>${person.body.slice(1).map(t=>readableParagraph(t)).join('')}</div></details>`).join('')}</div></div></section>`;
  }
  if(context.route==='membership'&&index===1){
    const revised=rest.map(b=>b.type==='h3'?{...b,text:'Next class · October 24, 2026'}:b);
    const revisedSection={...section,blocks:[heading,...revised]};
    return standardSection(revisedSection,index,context);
  }
  if(context.route==='alpha'&&index===1){
    const revised=rest.map(b=>b.type==='h3'?{...b,text:'Fall 2026 session · September 23–December 9'}:b);
    const revisedSection={...section,blocks:[heading,...revised]};
    return standardSection(revisedSection,index,context);
  }
  if(context.route==='youth'&&index===3){
    const descriptions=rest.filter(b=>b.type==='p');
    const contacts=(section.actions||[]).map(a=>safeHref(a.href));
    return `<section class="detail-section detail-section--age-paths" id="section-3"><div class="wide-wrap"><span class="detail-number" data-reveal>04 / ELEVATE YOUTH</span><h2 data-reveal>Two age groups.<br>One place to grow.</h2><div class="age-paths"><div data-reveal><span>01 / MIDDLE SCHOOL</span><h3>7th–9th grades</h3><p>${esc(sourceText(descriptions[0]?.text||''))}</p>${contacts[0]?`<a href="${esc(contacts[0])}">CONTACT ABOUT GRADES 7–9 <span aria-hidden="true">↗</span></a>`:''}</div><div data-reveal><span>02 / HIGH SCHOOL</span><h3>10th–12th grades</h3><p>${esc(sourceText(descriptions[1]?.text||''))}</p>${contacts[1]?`<a href="${esc(contacts[1])}">CONTACT ABOUT GRADES 10–12 <span aria-hidden="true">↗</span></a>`:''}</div></div></div></section>`;
  }
  return standardSection(section,index,context);
}
function standardSection(section,index,context){
  const blocks=(section.blocks||[]).filter(b=>!/\bpage under construction\b/i.test(b.text||''));
  const heading=blocks.find(b=>/^h[1-4]$/.test(b.type));
  const rest=blocks.filter(b=>b!==heading);
  const title=sectionTitle(heading,index,context.route);
  const body=rest.map(b=> b.type==='li' ? `<p class="detail-list-item">${esc(sourceText(b.text))}</p>` : /^h[1-4]$/.test(b.type) ? `<h3>${esc(sourceText(b.text))}</h3>` : readableParagraph(b.text)).join('');
  const links=(section.actions||[]).map(a=>{if(/^(on break|coming soon)$/i.test(a.label))return '';const dest=safeHref(a.href);if(!dest)return '';const external=!dest.startsWith(root);return `<a href="${esc(dest)}" ${external?'target="_blank" rel="noopener noreferrer"':''}>${esc(a.label)} <span aria-hidden="true">↗</span></a>`}).filter(Boolean).join('');
  const fullText=blocks.map(b=>b.text).join(' ');
  const isVerse=/\/\/\s*(?:[1-3]\s)?(?:Psalm|Proverbs|Matthew|Timothy|Corinthians|Jeremiah|Ephesians|Luke|John)/i.test(fullText);
  const mediaMap={
   'our-story':{2:['founding-1991.jpg','AN EARLY KINGDOM LIFE GATHERING'],3:['story.jpg','THE CATHEDRAL / MILFORD']},
   'leadership':{2:['founders-portrait.jpg','BISHOP JAY & JEANNINE RAMIREZ']},
   'mission':{2:['community-pantry.jpg','COMMUNITY OUTREACH / KINGDOM LIFE']},
   'serve':{1:['community-pantry.jpg','COMMUNITY OUTREACH / KINGDOM LIFE']},
   'life-groups':{1:['worship.jpg','GATHERED AS ONE / KINGDOM LIFE']},
   'new':{5:['story.jpg','YOUR SUNDAY DESTINATION / THE CATHEDRAL']},
   'courses':{2:['page/courses.jpg','WEDNESDAY COURSES / ORIGINAL KLCC IMAGE']},
   'baptism':{1:['page/baptism.jpg','BAPTISM / ORIGINAL KLCC IMAGE']},
   'young-adults':{2:['young-adults-red-night.jpg','RED NIGHT / ORIGINAL KLCC ARTWORK'],3:['young-adults-rise-night.jpg','RISE NIGHT / ORIGINAL KLCC ARTWORK']}
  };
  const media=mediaMap[context.route]?.[index];
  const kind=isVerse?'verse':media?'visual':index===1?'lead':rest.filter(b=>/^h[1-4]$/.test(b.type)).length>1?'directory':'reading';
  const chapter=`<div class="detail-heading" data-reveal><span class="detail-number">${String(index+1).padStart(2,'0')} / ${esc(context.category.toUpperCase())}</span><h2>${esc(title)}</h2></div>`;
  return `<section class="detail-section narrative-section narrative-section--${kind}" id="section-${index}" data-chapter><div class="wide-wrap detail-layout">${chapter}<div class="detail-body" data-reveal>${body}${links?`<div class="detail-actions">${links}</div>`:''}</div>${media?`<figure class="chapter-media" data-depth><img src="${asset(media[0])}" alt="${esc(media[1])}" loading="lazy"><figcaption>${esc(media[1])}</figcaption></figure>`:''}</div></section>`;

}

const routeDirections = {
  'youth':{type:'signal',word:'Elevate.',cue:'FAITH / FRIENDSHIP / YOUR NEXT CHAPTER',reference:'Kora + Spector'},
  'kids':{type:'signal',word:'Small steps.\nGrowing faith.',cue:'KINGDOM KIDS / EVERY STAGE',reference:'Atlas Studio + Quadro'},
  'young-adults':{type:'signal',word:'Life. Faith.\nTogether.',cue:'YOUNG ADULTS / KINGDOM LIFE',reference:'Kora + Coorda'},
  'women':{type:'editorial',word:'Faith grows\nin friendship.',reference:'Kora'},
  'men':{type:'editorial',word:'Brotherhood.\nWith purpose.',reference:'Kora'},
  'our-story':{type:'place',word:'A story still\nunfolding.',reference:'Nord A + Reelio'},
  'leadership':{type:'portrait',word:'People who\nserve people.',reference:'Pactum + Soren'},
  'new':{type:'place',word:'Your Sunday\nstarts here.',reference:'Asterre + Coorda'},
  'life-groups':{type:'editorial',word:'Make room\nfor one another.',reference:'Kora + Atlas Studio'},
  'alpha':{type:'editorial',word:'Bring your\nbig questions.',reference:'Kora + Tabfolio'},
  'membership':{type:'portrait',word:'A place to\nput down roots.',reference:'Pactum + Coorda'},
  'courses':{type:'editorial',word:'Keep growing.\nKeep asking.',reference:'Tabfolio + Kora'},
  'mission':{type:'statement',word:'Faith in action.',reference:'Spector + Nord A'},
  'beliefs':{type:'reading',word:'What shapes\nour life.',reference:'Tabfolio'},
  'prayer':{type:'reading',word:'Make room\nfor prayer.',reference:'Clearpath + Tabfolio'},
  'pastoral-care':{type:'reading',word:'You don’t have to\nwalk alone.',reference:'Clearpath'},
  'serve':{type:'place',word:'Love becomes\naction.',reference:'Reelio'},
  'baptism':{type:'editorial',word:'A new beginning.',reference:'Asterre'},
  'believe':{type:'reading',word:'Your next step\nin faith.',reference:'Coorda'},
  'watch-live':{type:'broadcast',word:'One church.\nWherever you are.',reference:'Reelio'},
  'previous-messages':{type:'reading',word:'A message for\nyour week.',reference:'Notes Journal'},
  'subsplash-media':{type:'reading',word:'Keep listening.\nKeep learning.',reference:'Notes Journal'},
  'calendar':{type:'reading',word:'Life at\nKingdom Life.',reference:'Tabfolio'},
  'give':{type:'editorial',word:'Generosity\nwith purpose.',reference:'Kora'},
  'app':{type:'editorial',word:'Kingdom Life.\nWith you.',reference:'Tabfolio'},
  'weather-procedures':{type:'reading',word:'Stay informed.\nTravel safely.',reference:'Tabfolio'},
  'easter':{type:'editorial',word:'The invitation\ncontinues.',reference:'Asterre'}
};
function newHero(route,title,intro,category,heroLinks,facts){
 const d=routeDirections[route]||{type:'reading',word:title};
 const image=({'new':'story.jpg','our-story':'founding-1991.jpg','leadership':'founders-portrait.jpg','serve':'community-pantry.jpg','membership':'worship.jpg','life-groups':'worship.jpg','watch-live':'worship-stage.jpg'})[route]||imageFor(route);
 const alt=({'new':'The Cathedral and parking in Milford','our-story':'Archival Kingdom Life gathering','leadership':'Founding pastors Bishop Jay and Jeannine Ramirez','serve':'Kingdom Life community food outreach','membership':'The Kingdom Life congregation','life-groups':'The Kingdom Life congregation','watch-live':'Kingdom Life worship team'})[route]||heroImageAlt(route,title);
 return `<section class="detail-hero route-opening route-opening--${d.type}"><div class="wide-wrap opening-grid"><div class="opening-copy"><p class="eyebrow">${esc(category)} / KINGDOM LIFE</p><h1>${esc(d.word).replaceAll('\n','<br>')}</h1><p class="opening-title">${esc(title)}</p><p class="opening-deck">${esc(intro)}</p><div class="detail-hero-links">${heroLinks}</div>${facts?`<div class="detail-hero-fact"><strong>${esc(facts[0])}</strong><span>${esc(facts[1])}</span></div>`:''}</div>${!['reading','statement'].includes(d.type)?`<figure class="opening-media" data-depth><img src="${asset(image)}" alt="${esc(alt)}"><figcaption>${['signal','editorial'].includes(d.type)?esc(title.toUpperCase())+' / ORIGINAL KLCC MATERIAL':'FROM KINGDOM LIFE'}</figcaption></figure>`:''}</div></section>`;
}
function pageContents(sections){
 const entries=sections.map((section,index)=>({index,title:sourceText((section.blocks||[]).find(b=>/^h[1-4]$/.test(b.type)&&!/page under construction/i.test(b.text||''))?.text||'')})).filter(x=>x.index>0&&x.title&&x.title.length<65);
 return entries.length>2?`<nav class="page-contents" aria-label="On this page"><span>ON THIS PAGE</span>${entries.map(x=>`<a href="#section-${x.index}">${esc(x.title)}</a>`).join('')}</nav>`:'';
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
    'life-groups':'Faith has a way of growing when we make room for one another.',
    'our-story':'Meet the story, people, and purpose behind Kingdom Life.',
    'beliefs':'Explore the beliefs that shape how we worship, grow, and serve.',
    'pastoral-care':'Find pastoral guidance, prayer, and care through difficult seasons.',
    'membership':'Learn KLCC’s culture, discover your gifts, and take a next step into community.',
    'serve':'Put your gifts to work in the church and the community.',
    'alpha':'A welcoming space to ask big questions about life and faith together.',
    'young-adults':'Build genuine community and grow in faith during college and early career.',
    'leadership':'Meet the pastors and leaders who care for, guide, and serve the Kingdom Life community.',
    'mission':'KLCC proclaims and demonstrates the gospel of the Kingdom through worship, restoration, and service.',
    'women':'Grow in faith, friendship, and purpose with women at Kingdom Life.',
    'men':'Build brotherhood, lead your family, and grow in faith with other men.',
    'prayer':'Pray with the church, and let the church know how it can pray with you.',
    'give':'Explore the ways to give and the purpose behind generosity at KLCC.',
    'app':'Find KLCC’s live messages, worship, events, and church updates in one place.',
    'baptism':'If you have decided to follow Jesus, explore baptism as your next step.',
    'calendar':'Find gatherings and events through KLCC’s current church calendar.',
    'weather-procedures':'Check KLCC’s service-change channels before you travel in severe weather.',
    'believe':'If you have chosen to follow Jesus, find the people and next steps to support you.',
    'easter':'An archive of KLCC’s April 5, 2026 Easter gathering, with a route to current Sunday plans.',
    'subsplash-media':'Watch recent teaching and explore the KLCC message library.'
  };
  const intro=tailored[route] || cleaned.flatMap(s=>s.blocks||[]).find(b=>b.type==='p'&&b.text.length>55)?.text || `Discover ${title.toLowerCase()} at Kingdom Life Christian Church.`;
  const image=imageFor(route);
  const family=familyFor(route);
  const index=groups.findIndex(g=>g.links.some(l=>l[1]===route));
  const category=index>=0?groups[index].title:'Kingdom Life';
  const special=route==='watch-live'?`<div class="media-panel" id="live-service"><h2>Watch the service</h2><p>Sunday worship begins at 10:00 AM Eastern. Join the next service here.</p><div class="embed-shell"><p class="embed-loading" role="status">Loading…<br><small>You can also use the direct link below.</small></p><iframe title="KLCC live service" src="https://subsplash.com/u/-TPGJTK/media/embed/d/*next-live" loading="lazy" allowfullscreen></iframe></div><a href="https://online.brushfire.com/klcc/" target="_blank" rel="noopener noreferrer">OPEN LIVE SERVICE ↗</a></div>`:route==='calendar'?`<div class="media-panel" id="events-calendar"><h2>Events & gatherings</h2><p>Find upcoming services, classes, and community gatherings.</p><div class="embed-shell"><p class="embed-loading" role="status">Loading…<br><small>You can also use the direct link below.</small></p><iframe title="KLCC events calendar" src="https://subsplash.com/+7664/lb/ca/+h3pghwr?embed&branding" loading="lazy"></iframe></div><a href="https://subsplash.com/+7664/lb/ca/+h3pghwr?embed&branding" target="_blank" rel="noopener noreferrer">OPEN EVENTS CALENDAR ↗</a></div>`:route==='previous-messages'||route==='subsplash-media'?`<div class="media-panel" id="media-library"><h2>Messages on demand</h2><p>Return to recent teaching and find a message for your week.</p><div class="embed-shell"><p class="embed-loading" role="status">Loading…<br><small>You can also use the direct link below.</small></p><iframe title="KLCC message library" src="https://subsplash.com/+7664/lb/li/+vb859jk?embed&branding" loading="lazy" allowfullscreen></iframe></div><a href="https://www.youtube.com/user/KLCCMilford/videos" target="_blank" rel="noopener noreferrer">WATCH ON YOUTUBE ↗</a></div>`:route==='give'?`<div class="media-panel" id="secure-giving"><h2>Give online</h2><p>Give securely online, or explore other ways to support Kingdom Life below.</p><div class="embed-shell"><p class="embed-loading" role="status">Loading…<br><small>You can also use the direct link below.</small></p><iframe title="KLCC online giving" src="https://subsplash.com/u/-TPGJTK/give?embed=true" loading="lazy"></iframe></div><a href="https://subsplash.com/u/-TPGJTK/give" target="_blank" rel="noopener noreferrer">OPEN SECURE GIVING ↗</a></div>`:route==='easter'?`<div class="media-panel"><h2>Past event</h2><p>This page records the Easter Sunday service of April 5, 2026. For an upcoming Sunday, see the current visit information.</p><a href="${path('new')}">PLAN A CURRENT VISIT ↗</a></div>`:'';
  const related=({'new':[['I believe','believe'],['Baptism','baptism'],['Kingdom Kids','kids']], 'calendar':[['Easter 2026 archive','easter'],['Courses','courses'],['Life Groups','life-groups']], 'previous-messages':[['Media library','subsplash-media'],['Watch live','watch-live'],['KLCC app','app']], 'watch-live':[['Previous messages','previous-messages'],['Plan a visit','new'],['Get the app','app']], 'give':[['Our mission','mission'],['Serve','serve'],['Plan a visit','new']], 'app':[['Watch live','watch-live'],['Events calendar','calendar'],['Previous messages','previous-messages']], 'weather-procedures':[['Plan a visit','new'],['Events calendar','calendar'],['Get the app','app']], 'easter':[['Plan a current visit','new'],['Watch live','watch-live'],['Kingdom Kids','kids']], 'subsplash-media':[['Watch live','watch-live'],['Previous messages','previous-messages'],['Get the app','app']]}[route]||[['Plan a visit','new'],['Find a Life Group','life-groups'],['Prayer & care','prayer']]);
  const heroActionMap={
    'new':[['WHAT TO EXPECT','#section-5'],['KINGDOM KIDS',path('kids')]],
    'youth':[['YOUTH SERVICE','#section-1'],['AGE GROUPS','#section-3']],
    'kids':[['AGES & CLASSES','#section-1'],['SERVE WITH KIDS','#section-2']],
    'young-adults':[['RED NIGHT','#section-2'],['RISE NIGHT','#section-3']],
    'our-story':[['HOW IT STARTED','#section-2'],['OUR MISSION',path('mission')]],
    'leadership':[['MEET OUR TEAM','#section-4'],['OUR STORY',path('our-story')]],
    'mission':[['READ OUR MISSION','#section-1'],['OUR STORY',path('our-story')]],
    'life-groups':[['FIND A GROUP','#section-3'],['EXPLORE ALPHA',path('alpha')]],
    'alpha':[['ABOUT ALPHA','#section-1'],['LIFE GROUPS',path('life-groups')]],
    'courses':[['EXPLORE COURSES','#section-2'],['LIFE GROUPS',path('life-groups')]],
    'watch-live':[['GO TO LIVE SERVICE','#live-service'],['PAST MESSAGES',path('previous-messages')]],
    'previous-messages':[['BROWSE MESSAGES','#media-library'],['JOIN US SUNDAY',path('new')]],
    'membership':[['MEMBERSHIP CLASS','#section-1'],['OUR STORY',path('our-story')]],
    'prayer':[['PRAYER TIMES','#section-1'],['REQUEST PRAYER','#section-3']],
    'pastoral-care':[['REQUEST CARE','#section-1'],['PRAYER',path('prayer')]],
    'serve':[['WAYS TO SERVE','#section-1'],['LIFE GROUPS',path('life-groups')]],
    'weather-procedures':[['STAY INFORMED','#section-1'],['GET THE APP',path('app')]],
    'calendar':[['VIEW EVENTS','#events-calendar'],['WEDNESDAY COURSES',path('courses')]],
    'subsplash-media':[['EXPLORE MEDIA LIBRARY','#media-library'],['WATCH LIVE',path('watch-live')]],
    'give':[['WAYS TO GIVE','#section-1'],['SECURE GIVING','#secure-giving']],
    'app':[['WHAT THE APP OFFERS','#section-0'],['WATCH LIVE',path('watch-live')]],
    'easter':[['EVENT ARCHIVE','#section-1'],['PLAN A CURRENT VISIT',path('new')]]
  };

  const heroActions=heroActionMap[route]||[['EXPLORE '+title.toUpperCase(),'#section-1'],['PLAN A VISIT',path('new')]];
  const heroLinks=heroActions.map(([label,url])=>`<a href="${url}">${label} <span aria-hidden="true">↗</span></a>`).join('');
  const facts=pageFacts[route];
  const marker=pageMarks[route]||category.toUpperCase();
  const context={family,route,category,page};
  const closerLine=({'watch-live':'Come together again next Sunday.','previous-messages':'Carry the message into your week.','calendar':'Make room for what comes next.','give':'Generosity is part of our story.','app':'Take Kingdom Life with you.','weather-procedures':'Stay informed. Travel safely.','easter':'The invitation continues every Sunday.','subsplash-media':'There is more to discover.'})[route]||({story:'The story continues with you.',generations:'There is room for you here.',invitation:'Find your next step.',reflection:'Keep the conversation going.',practical:'Stay connected to KLCC.'})[family];
  return `${header()}${menu()}<main class="detail-page detail-page--${family}" data-route="${esc(route)}">${newHero(route,title,intro,category,heroLinks,facts)}${pageContents(cleaned)}${special}<div class="detail-content">${cleaned.map((section,index)=>sectionView(section,index,context)).join('')}</div><section class="detail-closer"><div class="wide-wrap"><small>KEEP EXPLORING / KINGDOM LIFE</small><h2>${esc(closerLine)}</h2><div>${related.map(([label,slug])=>`<a href="${path(slug)}">${label} ↗</a>`).join('')}</div></div></section></main>${footer()}`;
}

function activate(){
  const menuButton=document.getElementById('menuButton');
  const panel=document.getElementById('menuPanel');
  function toggle(open){menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close menu':'Open menu');panel.setAttribute('aria-hidden',String(!open));panel.inert=!open;document.body.classList.toggle('menu-open',open);if(open)panel.querySelector('a')?.focus();else menuButton.focus()}
  panel.inert=true;panel.setAttribute('aria-hidden','true');
  document.addEventListener('keydown',e=>{if(e.key==='Tab'&&document.body.classList.contains('menu-open')){const items=[menuButton,...panel.querySelectorAll('a[href]')];const first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
  menuButton.addEventListener('click',()=>toggle(menuButton.getAttribute('aria-expanded')!=='true'));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('menu-open'))toggle(false)});
  panel.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{document.body.classList.remove('menu-open');panel.setAttribute('aria-hidden','true')}));
  document.querySelectorAll('.embed-shell iframe').forEach(frame=>{const shell=frame.parentElement;frame.addEventListener('load',()=>{shell.classList.add('embed-loaded')});});
  const revealObserver=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('seen');revealObserver.unobserve(e.target)}})},{threshold:.14,rootMargin:'0px 0px -4% 0px'});
  const revealItems=[...document.querySelectorAll('[data-reveal]')];
  revealItems.forEach((el,i)=>{el.style.setProperty('--stagger',(i%3)*90+'ms');revealObserver.observe(el)});
  // A fast swipe can pass a chapter between observer frames. Passed content must not stay blank.
  let revealFrame=0;
  function revealPassed(){revealFrame=0;for(const el of revealItems){if(!el.classList.contains('seen')&&el.getBoundingClientRect().top<innerHeight*.9){el.classList.add('seen');revealObserver.unobserve(el)}}}
  addEventListener('scroll',()=>{if(!revealFrame)revealFrame=requestAnimationFrame(revealPassed)},{passive:true});
  addEventListener('resize',revealPassed);
  revealPassed();
  const depthItems=[...document.querySelectorAll('[data-depth]')];
  const emphasis=[...document.querySelectorAll('.mission-line')];
  const contents=[...document.querySelectorAll('.page-contents a')];
  let motionFrame=0;
  function chapterMotion(){
    motionFrame=0;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    for(const el of depthItems){const r=el.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)continue;const v=Math.max(-1,Math.min(1,(innerHeight/2-(r.top+r.height/2))/innerHeight));el.style.setProperty('--depth-y',reduced?'0px':`${(v*18).toFixed(2)}px`);el.style.setProperty('--depth-in',reduced?'1':Math.max(0,Math.min(1,(innerHeight-r.top)/(innerHeight*.8))).toFixed(3));}
    for(const el of emphasis){const r=el.getBoundingClientRect();el.classList.toggle('is-emphasized',reduced||r.top<innerHeight*.72)}
    let active=null;for(const a of contents){const el=document.querySelector(a.getAttribute('href'));if(el&&el.getBoundingClientRect().top<innerHeight*.4)active=a;}for(const a of contents){a.classList.toggle('active',a===active);if(a===active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')}
  }
  const requestChapterMotion=()=>{if(!motionFrame)motionFrame=requestAnimationFrame(chapterMotion)};
  addEventListener('scroll',requestChapterMotion,{passive:true});addEventListener('resize',requestChapterMotion);chapterMotion();
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
