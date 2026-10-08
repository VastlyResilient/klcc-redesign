import {spawnSync} from 'node:child_process';import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import {build} from 'esbuild';import sharp from 'sharp';
const root=path.resolve(import.meta.dirname,'..');process.chdir(root);
const ledger=JSON.parse(fs.readFileSync('art-direction/content-ledger.json','utf8'));
const tokens=new Map(ledger.items.map((x:any)=>[x.id,x]));
const escape=(s:string)=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
const digest=(s:string)=>crypto.createHash('sha256').update(s).digest('hex').slice(0,10);
const selected=process.argv.slice(2);
const authored=fs.readdirSync('src/pages').filter(x=>x.endsWith('.html')).map(x=>x.replace('.html',''));
const targets=authored.filter(x=>!selected.length||selected.includes(x));
if(targets.some(x=>!['our-story','mission','home'].includes(x))){
 const gate=spawnSync(process.execPath,['scripts/gates.ts','--gate','G4','--out','art-direction/qa/G4-automatic.json'],{cwd:root,stdio:'inherit'});
 if(gate.status!==0)throw Error('G4 blocked: both pilots need evidence-backed Fidelity-reviewed records before remaining pages are built.');
}

fs.mkdirSync('assets/motion',{recursive:true});
if(fs.existsSync('src/motion/shell.ts'))await build({entryPoints:['src/motion/shell.ts'],outfile:'assets/motion/shell.js',bundle:true,format:'esm',target:'es2022',minify:true});
for(const filename of fs.readdirSync('src/pages').filter(x=>x.endsWith('.html'))){
 const slug=filename.replace('.html','');if(selected.length&&!selected.includes(slug))continue;
 const plan=JSON.parse(fs.readFileSync(`art-direction/pages/${slug}/blueprint.json`,'utf8'));
 let html=fs.readFileSync(`src/pages/${filename}`,'utf8');
 html=html.replace(/\{\{(href|src):((?:ci|cta|img):[^}]+)\}\}/g,(_,field,id)=>{const item=tokens.get(id) as any;if(!item)throw Error('Unknown content '+id);let url=field==='href'?(item.approved_destination||item.original_destination):(item.provider_url||item.path);if(!url)throw Error('Missing URL '+id);if(field==='src'&&item.type==='image'){const candidate=url.replace(/\.[^.]+$/,'.webp');if(fs.existsSync(candidate))url=candidate;url='../'+url;}if(url.startsWith('/')&&!url.startsWith('//'))url='../'+url.slice(1);if(/^https?:\/\/(www\.)?klcc\.us\/?$/.test(url))url='../';return escape(url)});
 html=html.replace(/\{\{((?:ci|cta|img):[^}]+)\}\}/g,(_,id)=>{const item=tokens.get(id) as any;if(!item)throw Error('Unknown content '+id);return escape(item.text??item.label??item.alt??'')});
 // Preserve intrinsic geometry before load; responsive variants never change crop/content.
 const imageTags=[...html.matchAll(/<img\b[^>]*>/g)];
 for(const match of imageTags){const tag=match[0],source=tag.match(/\bsrc="([^"]+)"/)?.[1];if(!source?.startsWith('../assets/'))continue;const local=source.slice(3);if(!fs.existsSync(local))continue;const meta=await sharp(local).metadata();if(!meta.width||!meta.height)continue;let next=tag.replace(/\s(?:width|height)="[^"]*"/g,'');next=next.replace('<img',`<img width="${meta.width}" height="${meta.height}"`);const variants=[640,960,1440].map(w=>({w,file:local.replace(/\.[^.]+$/,`-${w}.webp`)})).filter(x=>fs.existsSync(x.file));if(variants.length&&!/srcset=/.test(next)){const set=variants.map(x=>`../${x.file} ${x.w}w`);if(!variants.some(x=>x.w>=meta.width))set.push(`../${local} ${meta.width}w`);next=next.replace('<img',`<img srcset="${set.join(', ')}" sizes="100vw"`)}if(match.index!<html.indexOf('</section>')){next=next.replace(/\sloading="lazy"/,'');if(!next.includes('fetchpriority='))next=next.replace('<img','<img fetchpriority="high"')}html=html.replace(tag,next);}
 if(!html.includes('<main'))throw Error('Authored main missing: '+slug);
 const head=fs.readFileSync('src/layouts/head.html','utf8'),header=fs.readFileSync('src/layouts/header.html','utf8'),footer=fs.readFileSync('src/layouts/footer.html','utf8');
 let title=plan.title||slug.replaceAll('-',' '),description=plan.description||plan.visitor_job;
 const css=fs.readFileSync('src/layouts/site.css','utf8')+(fs.existsSync(`src/pages/${slug}.css`)?fs.readFileSync(`src/pages/${slug}.css`,'utf8'):'');
 fs.writeFileSync(`assets/motion/${slug}.css`,css);
 if(fs.existsSync(`src/motion/scenes/${slug}.ts`))await build({entryPoints:[`src/motion/scenes/${slug}.ts`],outfile:`assets/motion/${slug}.js`,bundle:true,format:'esm',target:'es2022',minify:true});
 const script=fs.existsSync(`assets/motion/${slug}.js`)?`<script type="module" src="../assets/motion/${slug}.js?v=${digest(fs.readFileSync(`assets/motion/${slug}.js`,'utf8'))}"></script>`:'';
 let doc=`<!doctype html><html lang="en"><head>${head}</head><body data-route="${slug}">${header}${html}${footer}<script type="module" src="../assets/motion/shell.js?v=${digest(fs.readFileSync('assets/motion/shell.js','utf8'))}"></script>${script}</body></html>`;
 doc=doc.replaceAll('{{title}}',escape(title)).replaceAll('{{description}}',escape(description)).replaceAll('{{slug}}',slug).replaceAll('{{cssversion}}',digest(css));
 fs.mkdirSync(slug,{recursive:true});fs.writeFileSync(`${slug}/index.html`,doc);if(slug==='404')fs.writeFileSync('404.html',doc.replaceAll('../','./').replace('<head>','<head><base href="/klcc-redesign/">'));
 fs.appendFileSync('art-direction/build-events.jsonl',JSON.stringify({event:'build',route:slug,at:new Date().toISOString(),source:`src/pages/${filename}`,output:`${slug}/index.html`,output_sha256:crypto.createHash('sha256').update(doc).digest('hex')})+'\n');
 console.log('Built authored route '+slug);
}
