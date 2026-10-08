import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root=path.resolve(import.meta.dirname,'..');
const out=path.join(root,'art-direction');fs.mkdirSync(out,{recursive:true});
const roots=['/Users/bobby/.codex/skills','/Users/bobby/.codex/plugins/cache','/Users/bobby/Documents/New project'];
const files=new Map<string,string>(); const visited=new Set<string>();
function walk(p:string,protectedTree=false){
 let real:string;try{real=fs.realpathSync(p)}catch{return};if(visited.has(real))return;visited.add(real);
 const st=fs.statSync(real);const inside=protectedTree||path.basename(p)==='skills';
 if(st.isDirectory()){if(['node_modules','.git','.next','.venv','dist','build'].includes(path.basename(p))&&!inside)return;for(const e of fs.readdirSync(p))walk(path.join(p,e),inside)}
 else if(inside&&st.isFile())files.set(real,crypto.createHash('sha256').update(fs.readFileSync(real)).digest('hex'));
}
roots.forEach(p=>walk(p));const snapshot={createdAt:new Date().toISOString(),roots,files:[...files].sort().map(([path,sha256])=>({path,sha256}))};
const baseline=path.join(out,'protected-skills.json');
if(process.argv.includes('--check')){const before=JSON.parse(fs.readFileSync(baseline,'utf8'));const b=new Map(before.files.map((x:any)=>[x.path,x.sha256]));const changed=[...files].filter(([p,h])=>b.get(p)!==h).map(([p])=>p);const missing=before.files.filter((x:any)=>!files.has(x.path)).map((x:any)=>x.path);const result={checkedAt:new Date().toISOString(),count:files.size,changed,missing,pass:!changed.length&&!missing.length};fs.writeFileSync(path.join(out,'protected-skills-end.json'),JSON.stringify(result,null,2));console.log(result);if(!result.pass)process.exitCode=1}
else{if(fs.existsSync(baseline))throw Error('Baseline exists; refusing overwrite');fs.writeFileSync(baseline,JSON.stringify(snapshot,null,2));console.log(`Protected ${files.size} files`)}
