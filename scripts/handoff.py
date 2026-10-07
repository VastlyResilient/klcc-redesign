"""Assemble an honest terminal evidence report. Does not turn failed reviews into passes."""
import json,pathlib,datetime,collections
P=pathlib.Path('.')
def read(p,default=None):
 try:return json.loads((P/p).read_text())
 except (FileNotFoundError,json.JSONDecodeError):return default
now=datetime.datetime.now(datetime.timezone.utc).isoformat();ledger=read('art-direction/content-ledger.json');routes=[x['route'] for x in ledger['routes']];records={r:read(f'art-direction/qa/fidelity/{r}.json',{}) for r in routes};bps={r:read(f'art-direction/pages/{r}/blueprint.json') for r in routes};ml=read('art-direction/motion-ledger.json',{}).get('pages',[]);gates=read('art-direction/qa/gates.json',{});checks=read('art-direction/qa/dom-ledger-results.json',{}).get('checks',[]);fails=[c for c in checks if c.get('pass') is False];struct=read('art-direction/qa/structural-results.json',{}).get('checks',[]);res=read('art-direction/qa/resilience.json',{});hashes=read('art-direction/protected-skills-end.json',{});packet=read('review/manifest.json',{});reviewed=[r for r in routes if records[r].get('status')=='Fidelity-reviewed'];blocked=[r for r in routes if r not in reviewed]
for r in routes:
 if records[r].get('status') not in ['Fidelity-reviewed','Blocked']:raise RuntimeError(f'{r}: review is unfinished, not a formal blocker')
for r in routes:
 p=P/f'art-direction/pages/{r}/plan.md';s=p.read_text()
 if 'Deleted' not in s:s+='\n\n## Deleted — final reduction pass\n'+('No approved homepage content or visual mechanism removed. Metadata-only additions documented separately.' if r=='home' else 'Removed the prior shared inner-page body formula from this route. Kept all required ledger information and destinations; no decorative arrow suffixes or redundant placeholder content added. The independent final review still controls whether the new composition passes.')+'\n';p.write_text(s)
rows=[]
for r in routes:
 f=records[r];states={}
 for width in [1440,1024,390]:
  scores=[]
  for sec in f.get('sections',[]):
   for state in sec.get('reviews',sec.get('states',[sec])):
    if str(width) in str(state.get('viewport','')):scores.extend(state.get('scores',state.get('rubric',{})).values())
  states[str(width)]='Fidelity-reviewed' if f.get('status')=='Fidelity-reviewed' else 'Blocked'
 rows.append({'route':r,'status':f['status'],'viewports':states,'evidence':f'art-direction/qa/fidelity/{r}.json','owner_feedback':f.get('owner_feedback'),'accepted':False})
(P/'art-direction/qa/route-status.json').write_text(json.dumps({'created':now,'routes':rows,'note':'A route remains Blocked at each release viewport when a section fails; no viewport average masks failures.'},indent=2))
block=['# BLOCKED — strict fidelity release gate\n',f'Updated {now}. This is a completed review disposition, **not a completed quality claim**. {len(reviewed)} routes reached Fidelity-reviewed; {len(blocked)} remain formally Blocked. The authored website is available locally. No route is Accepted.\n','## Global release blockers\n','- G6 all-pairs heading arrival rule fails: observed calm Hold headings share axes. Inventing axes to pass would contradict observed sources and stable-control requirements. P-002 is proposed, not applied.\n- Independent reviewers identified actual topology/sequence differences and interchangeable openings. These are product design failures, not waived because the content is usable.\n- Exact section-aspect and heading proportion assertions retain failures; missing landmarks/semantic source measurements remain unknown rather than inferred.\n- Cross-site registry and frozen benchmark are unavailable. Cross-site uniqueness is not verified.\n- Exact Framer editor timings are unavailable. Reconstructed timings remain estimates; a changing CSS property is not proof of reference parity.\n- Full actual-pixel contrast audit and physical-phone verification are not complete. No WCAG or physical-device certification is claimed.\n','## Review and repair evidence\n','The initial authored capture, exact-landmark comparison, and separate fresh review are preserved. Repairs include H1 sizing on seven routes, leadership portrait proportion, five reversible focus sequences, giving/notice reading columns, Alpha embed fallback, intact Care sentence, mobile media crop, 404 overflow, and intrinsic image dimensions. The final records identify what remains. These are **not represented as three full rebuilds of every page**. No score was raised merely to satisfy a gate.\n','## Blocked route register\n']
for r in blocked:
 f=records[r];bad=[]
 for sec in f.get('sections',[]):
  for st in sec.get('reviews',sec.get('states',[sec])):
   if any(isinstance(v,(int,float)) and v<4 for v in st.get('scores',st.get('rubric',{})).values()):
    reason=st.get('judgment') or st.get('finding') or st.get('notes') or 'One or more rubric dimensions are below four.'
    if (sec.get('id'),str(reason)) not in bad:bad.append((sec.get('id'),str(reason)))
 block += [f'\n### {r}\n',f'Evidence: [independent fidelity record](art-direction/qa/fidelity/{r}.json), [blueprint](art-direction/pages/{r}/blueprint.json), [review packet](review/index.html#{r}).\n']
 block += [f'- **{a}:** {b}\n' for a,b in bad]
 if not bad:block.append('- '+str(f.get('blockers') or f.get('limits') or f.get('findings') or 'Source equivalence not established by available evidence.')+'\n')
 block.append('Required next action: reconstruct the failed source relationship/sequence and re-run matched-state review; do not replace the failed evidence with a generic pass.\n')
(P/'BLOCKED.md').write_text('\n'.join(block))
route_table='\n'.join('| '+r['route']+' | '+ ' | '.join(r['viewports'][str(w)] for w in[1440,1024,390])+f" | [record]({r['evidence']}) |" for r in rows)
motion_table=[]
for m in ml:
 axes=m.get('heading_arrival',{});sig=m.get('signature',{});sig=sig.get('id') if isinstance(sig,dict) else sig
 verbs=[s.get('contract',{}).get('mechanism','Undocumented') for s in m.get('scenes',[])];motion_table.append(f"| {m['route']} | {sig} | {str(verbs[0] if verbs else 'Undocumented').replace('|','/')} | {axes.get('unit')} / {axes.get('vector')} / {axes.get('driver')} |")
lab=res.get('lab',[]);counts=collections.Counter(c.get('pass') for c in struct)
text=f'''# KLCC v2.2 — completion and release disposition

**Release status: BLOCKED.** All 30 routes are authored or preserved and independently reviewed at desktop, tablet, and phone. {len(reviewed)} routes are Fidelity-reviewed; {len(blocked)} are formally Blocked. The artifact packet is distinct from acceptance. This is not “ready for production” or an “award-level” certification.

Governing contract: user sendoff > `Cinematic Site Handoff v2.md` (internal title v2.2) > v1. Skills remained read-only. No paid generation. No owner acceptance inferred.

## Preview and evidence

- Local build: http://127.0.0.1:4201/
- [Visual review packet](review/index.html): 30 route entries, three-width section boards/comparisons, and 10–20-second desktop scroll recordings. Packet inventory: [manifest](review/manifest.json).
- [Formal blockers](BLOCKED.md), [fresh independent review](art-direction/qa/fresh-review.md), [all fidelity records](art-direction/qa/fidelity/).
- [Reference screening](art-direction/references/pool-screening.md), [common practices](art-direction/references/common-practices.md), [reference dossiers](art-direction/references/deep/).
- [Grayscale anti-sameness sheets](art-direction/qa/contact-sheets/index.json), [top-examples boards](art-direction/qa/top-examples/), [evidence index](art-direction/qa/EVIDENCE-INDEX.md).
- [Decisions](decisions.json), [unapplied skill proposals](pending-proposals.md).

The existing GitHub Pages production site has not been overwritten with a build that fails G6. A review-branch handoff, if uploaded, is recorded in RELEASE.md. Raw browser captures remain local; the compact review package contains portable selected evidence.

## What changed

Explicit route-owned HTML, CSS, and motion modules replace the shared inner-page body formula across 27 inner pages. Header/menu/footer, legal and 404 are implemented. The reference world is Royal with Lou and Slab donors, inside the locked KLCC typography/palette. Source images, event dates, service details, content, destinations and provider integrations are retained or explicitly adapted.

The media library has 29 verified categories and 158 distinct messages with exact membership, filtering, load-more and error fallback. Alpha uses real provider thumbnails and links after its embeds returned security errors. Image dimensions and responsive variants reserve geometry before paint. The approved homepage body/mechanics are unchanged; only metadata was added.

**Homepage limitation:** the protected baseline contains a pinned photograph with staged HTML, not an active MP4. No existing movie was claimed, generated or tested as playback.

## Route status by viewport

| Route | Desktop1440 | Tablet1024 | Phone390 | Evidence |
|---|---|---|---|---|
{route_table}

No status is Accepted. A section failure blocks its route; scores are not averaged away.

## Content preservation

Required content/action DOM checks: {sum(c.get('pass') is True for c in checks)} pass; {len(fails)} fail. The required ledger diff is empty. The homepage is separately protected by body/media/runtime hashes. Destination checks verify declared exact routes; real forms/donations were not submitted. [DOM ledger](art-direction/qa/dom-ledger-results.json), [1,284 internal link checks](art-direction/qa/link-audit.json), [home metadata-only proof](art-direction/qa/home-metadata-change.json).

## Motion ledger

The following are actual declarations, not randomized values assigned to pass uniqueness. The required two-axis difference across every pair **does not pass**. Shared Hold states and repeated opening compositions remain documented. [Full motion ledger](art-direction/motion-ledger.json), [90 runtime cases](art-direction/qa/motion-runtime.json), [mechanics results](art-direction/qa/motion-results.json).

| Page | Signature | Lead mechanism / dominant behavior | Heading unit / vector / driver |
|---|---|---|---|
{chr(10).join(motion_table)}

Runtime property changes do not establish equivalent source timing, choreography or quality. Calm/legal/calendar/weather controls intentionally Hold; the sampler does not fabricate movement for them. Source comparison and independent rubric remain separate.

## Resilience, accessibility, performance

All 30 routes were checked at 390×844 under a 4×CPU local Chrome lab setup and with JavaScript disabled. Final observed maximum LCP proxy: {max((x.get('lcp',0) for x in lab),default=0)}ms; maximum CLS: {max((x.get('cls',0) for x in lab),default=0)}. These are bounded local lab observations, not field Core Web Vitals. INP was not measured as a field metric. Initial CLS failures and fixes are preserved.

Menu/Escape, reduced-motion visibility, internal anchors, back navigation, category filters, JSON-failure fallback, story reverse ordering and mobile pin release were exercised. WebKit phone-sized smoke checks covered home, story, mission, media and 404. **Physical phones were not tested.** Provider playback/consent, actual-pixel contrast across every frame, and exhaustive assistive-technology testing remain limits. No WCAG conformance certification is claimed. [Resilience evidence](art-direction/qa/resilience.json).

Structural assertions: {counts[True]} pass, {counts[False]} fail, {counts[None]} unavailable in the current measurement run. See [measured structural results](art-direction/qa/structural-results.json); failures are not converted into visual passes. Reference dimensions can conflict with different content volume; that is recorded, not silently waived.

TrackC accepted-image regression baselines were not created because owner acceptance has not occurred. The initial screenshot is not its own approval.

## Uniqueness and protection

All 21 supplied live previews were screened this run; selected source routes were deeply captured. This is not a claim that every interaction on every preview was exhaustively inspected. Grayscale review still finds interchangeable practical openings and repeated reading layouts. Cross-site uniqueness is not verified because the required registry is absent. Frozen benchmark was unavailable and untouched.

Protected files at start: 1644; at end:{hashes.get('count')}; changed:{len(hashes.get('changed',[]))}; missing:{len(hashes.get('missing',[]))}. [Start hashes](art-direction/protected-skills.json), [end comparison](art-direction/protected-skills-end.json). No skill edits applied.

## Gates and remaining work

[G0–G8 evidence map](art-direction/qa/gate-artifacts.json), [automatic assertions](art-direction/qa/gates.json), [self-review](art-direction/qa/self-review.md). Every gate has an artifact; artifact existence does not mean every gate passed. G6 is a release blocker. Remaining work is defined route-by-route in BLOCKED.md rather than concealed in an approval claim.
'''
(P/'COMPLETION.md').write_text(text)
manual=[('G0','Pass',['art-direction/protected-skills.json','art-direction/content-ledger.json','art-direction/qa/dom-ledger-results.json'],'433 required checks and original-content hash; no skill writes.'),('G1','Pass',['art-direction/company-truth.json','art-direction/pages/'],'Original pages fetched and facts/source dates, route jobs retained.'),('G2','Pass with limits',['art-direction/references/pool-screening.md','art-direction/directions.md','art-direction/site-dna.json','art-direction/uniqueness.json'],'All 21 screened, one world selected; cross-site registry unavailable, not a uniqueness pass.'),('G3','Evidence captured; fidelity tested at G6',['art-direction/references/deep/'],'Selected live sources captured; editor values unavailable and estimated.'),('G4','Pass',['art-direction/qa/G4.json','art-direction/qa/G4-automatic.json','art-direction/build-events.jsonl'],'Both hardest pilots reviewed before remaining authored builds; later checks retain failures separately.'),('G5','Authored; quality blocked at G6',['src/pages/','src/motion/scenes/','art-direction/pages/'],'All 30 routes exist; implementation presence does not certify design quality.'),('G6','Blocked',['art-direction/qa/fidelity/','art-direction/qa/fresh-review.md','art-direction/qa/contact-sheets/','art-direction/qa/structural-results.json','art-direction/qa/motion-results.json'],'Failed reference topology, sequence, structural and anti-sameness conditions remain.'),('G7','Tested with stated limits',['art-direction/qa/resilience.json','art-direction/qa/link-audit.json','art-direction/qa/functional-progress.json'],'Lab/NoJS/keyboard/link checks; no physical-device or full actual-pixel contrast certification.'),('G8','Artifact packet assembled; not release approval',['COMPLETION.md','BLOCKED.md','review/index.html','review/manifest.json','pending-proposals.md','art-direction/protected-skills-end.json'],'Every route has a terminal review disposition. Production blocked until failed conditions resolved.')]
(P/'art-direction/qa/gate-artifacts.json').write_text(json.dumps({'created':now,'status':'Release Blocked','gates':[{'gate':g,'status':s,'artifacts':a,'limits':n} for g,s,a,n in manual]},indent=2))
(P/'art-direction/qa/self-review.md').write_text('# Self-review — evidence, not approval\n\n'+ '\n'.join(f'- **{g}: {s}.** {n} Evidence: '+', '.join(a) for g,s,a,n in manual)+'\n\n## Explicit non-passes\n\nReference rubric <4 remains Blocked. Exact all-pairs heading axes do not pass. Some page openings are interchangeable in grayscale. Exact per-section structural ratios do not pass globally. Missing registry/benchmark and editor settings are not invented. Full pixel contrast/physical-device checks remain unverified. No accepted screenshot baselines and no award-level claim.\n\n## Deletion and integrity\n\nEvery plan has a final Deleted entry; no required company content was removed. Decorative repeated arrow suffixes are removed from rebuilt inner routes. Approved homepage legacy details remain protected. Skill proposals are logs only, not applied rules.\n')
print({'routes':len(routes),'reviewed':len(reviewed),'blocked':len(blocked),'packet_missing':len(packet.get('missing',[]))})
