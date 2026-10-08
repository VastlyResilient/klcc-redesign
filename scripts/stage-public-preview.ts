/** Package the complete site for a separate public review path; never overwrite production root. */
import fs from 'node:fs/promises';import path from 'node:path';import {execFileSync} from 'node:child_process';
const out=process.argv[2];if(!out||!path.isAbsolute(out))throw Error('Pass an absolute output directory');
const ledger=JSON.parse(await fs.readFile('art-direction/content-ledger.json','utf8'));
const roots=['index.html','404.html','app.js','styles.css','experience.css','nojs.css','inner-pages.css','inner-pages.js'];
const assets=execFileSync('git',['ls-files','-z','assets'],{encoding:'utf8'}).split('\0').filter(Boolean);
const routes=ledger.routes.filter((r:any)=>r.route!=='home').map((r:any)=>`${r.route}/index.html`);
for(const file of [...roots,...assets,...routes]){let bytes=await fs.readFile(file);if(file.endsWith('.html')){let s=bytes.toString().replaceAll('https://vastlyresilient.github.io/klcc-redesign/','https://vastlyresilient.github.io/klcc-redesign/preview/').replace('base href="/klcc-redesign/"','base href="/klcc-redesign/preview/"');s=s.replace('<head>','<head><meta name="robots" content="noindex, nofollow">');bytes=Buffer.from(s)}const dest=path.join(out,file);await fs.mkdir(path.dirname(dest),{recursive:true});await fs.writeFile(dest,bytes)}
await fs.writeFile(path.join(out,'preview-build.json'),JSON.stringify({created:new Date().toISOString(),source_commit:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),route_count:ledger.routes.length,scope:'Complete public review build. Separate from production root. Exact source-parity and whole-site gate status remain in the review branch.',home_media:'Protected pinned photographic introduction; no active MP4 claimed.'},null,2));
console.log({out,routes:routes.length+1,assets:assets.length});
