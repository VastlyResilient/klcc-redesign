/** Reproducible original-preserving WebP derivatives. No crop, scene edit, or upscale.
 * node scripts/assets.ts [--all-manifest] [assets/source.jpg ...]
 * Default: actual images referenced in authored source + approved existing home.
 * --all-manifest also converts required prior material, useful before routes are authored.
 */
import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import sharp from 'sharp';
const root=path.resolve(import.meta.dirname,'..');const ad=path.join(root,'art-direction');
const walk=(p:string):string[]=>fs.existsSync(p)?fs.readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(p,e.name)):[path.join(p,e.name)]):[];
const manifestPath=path.join(ad,'assets/asset-manifest.json');const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));const args=process.argv.slice(2);const all=args.includes('--all-manifest');
const sourceFiles=[...walk(path.join(root,'src')).filter(f=>/\.(html|css|ts|js)$/.test(f)),path.join(root,'index.html')].filter(fs.existsSync);const source=sourceFiles.map(f=>fs.readFileSync(f,'utf8')).join('\n');
const requested=new Set(args.filter(x=>!x.startsWith('--')).map(x=>path.normalize(x)));const originals=new Set<string>();
for(const a of manifest.assets){const variants=a.variants||[];const original=[a.path,...variants].find((p:string)=>/\.(jpg|jpeg|png)$/i.test(p));if(!original)continue;const basename=path.basename(a.path);if(all||source.includes(a.path)||source.includes(basename)||requested.has(original)||requested.has(a.path))originals.add(original)}
for(const m of source.matchAll(/(?:\.\.\/|\.\/)?(assets\/[a-zA-Z0-9_./-]+\.(?:jpg|jpeg|png))/g))originals.add(m[1]);for(const r of requested)if(/\.(jpg|jpeg|png)$/i.test(r))originals.add(r);
const converted:any[]=[];const failed:any[]=[];
for(const rel of originals){
 try{const abs=path.resolve(root,rel);if(!abs.startsWith(path.join(root,'assets')+path.sep))throw Error('only local assets sources allowed');const originalHash=crypto.createHash('sha256').update(fs.readFileSync(abs)).digest('hex');const meta=await sharp(abs).metadata();if(!meta.width||!meta.height)throw Error('image has no dimensions');
 const stem=rel.replace(/\.[^.]+$/,'');const max=Math.min(meta.width,1920);const widths=[...new Set([640,960,1440,max].filter(w=>w<=max))].sort((a,b)=>a-b);const outputs:any[]=[];
 for(const width of widths){const target=width===max?stem+'.webp':stem+`-${width}.webp`;await sharp(abs).rotate().resize({width,withoutEnlargement:true,fit:'inside'}).webp({quality:90,effort:5}).toFile(path.join(root,target));const outmeta=await sharp(path.join(root,target)).metadata();outputs.push({path:target,width:outmeta.width,height:outmeta.height,bytes:fs.statSync(path.join(root,target)).size})}
 if(originalHash!==crypto.createHash('sha256').update(fs.readFileSync(abs)).digest('hex'))throw Error('original source changed');
 for(const a of manifest.assets){if(a.path===rel||(a.variants||[]).includes(rel)){a.variants=[...new Set([...(a.variants||[]),rel,...outputs.map(x=>x.path)])];a.derivative_details=outputs;a.original_sha256=originalHash;a.original_dimensions=[meta.width,meta.height];a.processing='WebP encoding and proportional downsize only; original bytes preserved, no crop, no upscale';}}
 converted.push({source:rel,original:[meta.width,meta.height],original_sha256:originalHash,variants:outputs});
 }catch(e){failed.push({source:rel,error:String(e)})}
}
for(const p of [manifestPath,path.join(root,'assets/asset-manifest.json')])fs.writeFileSync(p,JSON.stringify(manifest,null,2));fs.mkdirSync(path.join(ad,'qa'),{recursive:true});fs.writeFileSync(path.join(ad,'qa/assets.json'),JSON.stringify({at:new Date().toISOString(),scope:all?'manifest required and optional':'actual authored sources plus approved home',converted,failed},null,2));console.log(JSON.stringify({converted:converted.length,failed}));if(failed.length)process.exitCode=1;
