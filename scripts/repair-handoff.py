"""Report measured repair state without assigning review scores or waiving gates."""
import json, pathlib, datetime, collections
root=pathlib.Path(__file__).resolve().parents[1]
def read(p): return json.loads((root/p).read_text())
def write(p,v): (root/p).write_text(json.dumps(v,indent=2)+'\n')
now=datetime.datetime.now(datetime.timezone.utc).isoformat()
ledger=read('art-direction/content-ledger.json')
rows=[]
for r in ledger['routes']:
 route=r['route']; f=read(f'art-direction/qa/fidelity/{route}.json')
 rows.append(dict(route=route,status=f['status'],viewports={str(v):f['status'] for v in (1440,1024,390)},evidence=f'art-direction/qa/fidelity/{route}.json',owner_feedback=f.get('owner_feedback'),accepted=False))
write('art-direction/qa/route-status.json',{'created':now,'scope':'Independent section rubric only; raw structural and global anti-sameness gates remain separate.','routes':rows})
counts=collections.Counter(r['status'] for r in rows)
gates=read('art-direction/qa/gates.json'); failures=[x for x in gates['results'] if x['status']!='Pass']
struct=read('art-direction/qa/structural-results.json'); sc=collections.Counter('pass' if c['pass'] is True else 'fail' if c['pass'] is False else 'missing' for c in struct['checks'])
notes='''## Repairs actually made

- Rebuilt the blocked routes around explicit source sections: image-first programme artwork, pastoral portrait hierarchy, bounded editorial passages, intact app imagery, native event agenda and actual media categories.
- Membership now has a genuine reversible photograph/chapter sequence on desktop, tablet and tall phones, with normal-flow short-screen and reduced-motion alternatives.
- Corrected source misreadings: Lou’s reading field is centered; Slab’s hero image and metadata are separate DOM regions; screenshot frame numbers do not identify equivalent mobile landmarks.
- Fixed Beliefs heading contrast and Membership phone captions using continuous feathered image grading, without rectangular text panels. Final independently measured minima: Beliefs 5.71:1 across three widths; Membership caption minimum 10.25:1 on phone.
- Corrected five tablet H1 sizes against actual source measurements. Preserved original company information, authentic artwork, legitimate provider actions and all required content IDs.
- Added truthful Hold/static motion checks and review import validation. A changing class name or a hidden element is not evidence of animation.

'''
limits='''## Verification limits and release boundary

The independent section rubric and the exact global contract are different checks. **All repaired route section rubrics may pass while G6 still fails.** No scores were invented and no source boxes were changed to force a match.

Two global checks still fail: universal two-axis heading uniqueness, and strict measured structural parity. The independent whole-site review also identifies repeated opening silhouettes (notably New/Kids and Men/Leadership). These findings are retained in the [global diagnosis](art-direction/qa/round-3/global-gate-diagnosis.md). Static-heading requirements conflict with universal pairwise differentiation; inventing arbitrary animations would violate the same contract. Content expansion explains some aspect deviations but does not automatically waive the 15% threshold.

The protected homepage baseline contains a pinned photograph and staged HTML, not an active MP4. Its approved mechanics were preserved; movie playback is not claimed. Tests use browser emulation and WebKit, not physical phones. No payment or form was submitted, and third-party playback was not exhaustively validated. Exact Framer editor values remain estimates where inaccessible. No route is Accepted.

'''
md=f'''# KLCC repair report

Updated {now}.

**Independent section review: {counts.get('Fidelity-reviewed',0)}/30 routes Fidelity-reviewed; {counts.get('Blocked',0)} route records Blocked.** The original 23 blocked route records were repaired and independently re-reviewed. **Production release remains blocked by global G6 checks.** This is progress with evidence, not full-contract completion or owner acceptance.

[Local website](http://127.0.0.1:4201/) · [Visual review packet](review/index.html) · [Draft PR](https://github.com/VastlyResilient/klcc-redesign/pull/1) · [Remaining gates](BLOCKED.md)

'''+notes+f'''## Evidence

- Three-width independent reviews: [ministry](art-direction/qa/round-2/ministry-review.json), [practical](art-direction/qa/round-2/practical-review.json), [editorial](art-direction/qa/round-2/editorial-review.json), [Mission correction](art-direction/qa/round-2/mission-review.json).
- [Fidelity records](art-direction/qa/fidelity/), [capture index](art-direction/qa/EVIDENCE-INDEX.md), [reference map and blueprints](art-direction/pages/), [motion checks](art-direction/qa/motion-results.json).
- [433 required content checks](art-direction/qa/dom-ledger-results.json), [link audit](art-direction/qa/link-audit.json), [resilience/NoJS/WebKit](art-direction/qa/resilience.json), [GitHub subpath/404 checks](art-direction/qa/subpath-404.json).
- [Gates](art-direction/qa/gates.json): {len(gates['results'])-len(failures)} passing; {len(failures)} failing. Raw structural results: {dict(sc)}. Counts are assertions, not distinct defects.
- [Skill protection](art-direction/protected-skills-end.json), [unapplied proposals](pending-proposals.md), [decisions](decisions.json).

'''+limits+'## Route status\n\n| Route | Independent section status | Evidence |\n|---|---|---|\n'+''.join(f"| {r['route']} | {r['status']} | [record]({r['evidence']}) |\n" for r in rows)
(root/'COMPLETION.md').write_text(md)
blocked='# Remaining release gates\n\nIndividual section-review repairs do not erase sitewide failures. Production is not updated.\n\n'+''.join(f"- **{x['gate']}: {x['name']} — {x['status']}.** See `art-direction/qa/gates.json`.\n" for x in failures)+f'\nStructural assertion totals: {dict(sc)}. Some are duplicated measurements or missing exact source landmarks; others are real geometry deviations.\n\n'+'''Read [the independent diagnosis](art-direction/qa/round-3/global-gate-diagnosis.md) for exact examples and the repair order. Correct source segmentation first; then actual proportions and repeated composition. Preserve essential content, static urgent controls and the protected homepage. Do not rename motion axes, fabricate source mechanisms, or claim the numerical contract is met because a visual rubric scored 4.

All original 23 route-level repair loops have now received independent section judgments. Fresh global anti-sameness review still fails; the draft remains a review build. No owner approval is being requested or inferred.
'''
(root/'BLOCKED.md').write_text(blocked)
(root/'RELEASE.md').write_text('''# Release disposition

Production has not been changed. The repair is on `codex/klcc-v22-gated-rebuild`, with [draft PR1](https://github.com/VastlyResilient/klcc-redesign/pull/1).

'''+f"{counts.get('Fidelity-reviewed',0)}/30 routes pass the independent section rubric. Global G6 remains failed; this is not a complete release certificate.\n\n"+'''Local preview: http://127.0.0.1:4201/ and http://127.0.0.1:4201/review/.

The branch contains source, generated pages, compact portable review assets, ledgers, decisions and repair reports. Raw recordings/full screenshots remain in the local evidence tree; a clean clone needs those captures regenerated. Skills remain read-only; lessons are pending proposals. No paid generation.
''')
old=read('art-direction/qa/gate-artifacts.json');old['created']=now;old['status']='Release Blocked; section-review repair complete'
for g in old['gates']:
 if g['gate']=='G5':g['status']='Authored and section-reviewed';g['limits']='All 30 route section records Fidelity-reviewed; raw global gates separate.'
 if g['gate']=='G6':g['status']='Blocked';g['limits']='Independent section reviews passed; raw structural parity and global uniqueness still fail.'
 if g['gate']=='G8':g['status']='Artifacts written; release blocked';g['limits']='No Accepted status; exact unresolved gates retained.'
write('art-direction/qa/gate-artifacts.json',old)
(root/'art-direction/qa/self-review.md').write_text('# Self-review after repair loops\n\n'+''.join(f"- **{g['gate']}: {g['status']}.** {g.get('limits','')} Evidence: {', '.join(g.get('artifacts',[]))}\n" for g in old['gates'])+'\nFresh per-section review is not a global anti-sameness pass. See round-3/global-gate-diagnosis.md.\n')
packets=['ministry-review','practical-review','editorial-review','mission-review']
write('art-direction/qa/fresh-review.json',{'created':now,'scope':'Repair-loop independent section review, with separate failed global audit','counts':dict(counts),'accepted':False,'packets':[f'art-direction/qa/round-2/{x}.json' for x in packets],'global_diagnosis':'art-direction/qa/round-3/global-gate-diagnosis.md','global_gate_status':'Blocked'})
(root/'art-direction/qa/fresh-review.md').write_text('# Fresh independent repair review\n\n'+f"{counts.get('Fidelity-reviewed',0)}/30 route section rubrics pass at 1440, 1024, and 390 widths. Original23 blocked records have completed author–independent-review–repair loops. Initial failed packets are preserved.\n\n"+'\n'.join(f'- [{x}](round-2/{x}.json)' for x in packets)+'\n\n[Independent global diagnosis](round-3/global-gate-diagnosis.md) still fails full-site geometry/anti-sameness. This report does not waive it.\n')
print(dict(counts),dict(sc),len(failures),'release failures')
