/** Import independent human/vision verdicts; never generates or repairs scores. */
import fs from 'node:fs';import crypto from 'node:crypto';
for(const file of process.argv.slice(2)){
 const packet=JSON.parse(fs.readFileSync(file,'utf8'));
 if(!packet.reviewer||!packet.reviewed_at)throw Error('Reviewer/date missing: '+file);
 for(const result of packet.routes||[]){
  if(result.status!=='Fidelity-reviewed')continue;
  const bpPath=`art-direction/pages/${result.route}/blueprint.json`,bp=JSON.parse(fs.readFileSync(bpPath,'utf8'));
  for(const section of bp.sections){const review=result.sections.find((s:any)=>s.id===section.id);if(!review)throw Error(`Missing section ${result.route}/${section.id}`);
   for(const width of[1440,1024,390]){const v=review.reviews.find((r:any)=>Number(r.viewport)===width);if(!v||Object.keys(v.scores||{}).length!==10||Object.values(v.scores).some((n:any)=>typeof n!=='number'||n<4||n>5))throw Error(`Not passed ${result.route}/${section.id}/${width}`);if(!v.comparison||!fs.existsSync(v.comparison))throw Error('Missing comparison '+v?.comparison)}
  }
  const files=[`src/pages/${result.route}.html`,`src/pages/${result.route}.css`,`src/motion/scenes/${result.route}.ts`];
  const hashes=Object.fromEntries(files.map(p=>[p,crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex')]));
  const record={...result,reviewer:packet.reviewer,reviewed_at:packet.reviewed_at,scope:packet.review_stage||'Independent three-width section review',source_review:file,prior_review:`art-direction/qa/round-1/fidelity/${result.route}.json`,source_hashes:hashes,accepted:false,limits:packet.limits||packet.limitations||[],issues:[]};
  fs.writeFileSync(`art-direction/qa/fidelity/${result.route}.json`,JSON.stringify(record,null,2));
  for(const s of bp.sections){s.status={...s.status,fidelity_reviewed:true,accepted:false};s.reviewer_findings={record:`art-direction/qa/fidelity/${result.route}.json`,reviewed_at:packet.reviewed_at};}
  bp.implementation_status='Fidelity-reviewed; owner acceptance not inferred';fs.writeFileSync(bpPath,JSON.stringify(bp,null,2));console.log('IMPORTED independent pass',result.route);
 }
}
