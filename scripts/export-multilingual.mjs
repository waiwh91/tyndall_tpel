import {mkdirSync,writeFileSync,readFileSync,rmSync,cpSync,readdirSync} from 'node:fs';
import {resolve} from 'node:path';
import {renderSite,languages,routes,pageUrl,translate,pageTitle} from '../lib/site-renderer.mjs';
const out=resolve('gh-pages-output'),base='/tyndall_tpel',stylesheet='site-v22.css';
if(out!==resolve(process.cwd(),'gh-pages-output'))throw new Error('Unexpected export directory');
rmSync(out,{recursive:true,force:true});mkdirSync(out,{recursive:true});
for(const folder of ['brands','people']){mkdirSync(`${out}/${folder}`,{recursive:true});for(const file of readdirSync(`public/${folder}`)){if(!file.includes('-TNI-'))cpSync(`public/${folder}/${file}`,`${out}/${folder}/${file}`);}}
writeFileSync(`${out}/${stylesheet}`,readFileSync('app/globals.css','utf8').replace("@import 'tailwindcss';",''));writeFileSync(`${out}/.nojekyll`,'');
for(const [lang] of languages)for(const page of routes){
 const dir=`${out}/${lang==='en'?'':lang+'/'}${page}`;mkdirSync(dir,{recursive:true});
 const title=pageTitle(page,lang)+' — '+translate('Integrated Power Electronics Team',lang);
 const alternates=languages.map(([code])=>`<link rel="alternate" hreflang="${code}" href="https://waiwh91.github.io${pageUrl(page,code,base)}">`).join('');
 writeFileSync(`${dir}/index.html`,`<!doctype html><html lang="${lang}" dir="${lang==='ar'?'rtl':'ltr'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title>${alternates}<link rel="stylesheet" href="${base}/${stylesheet}"></head><body>${renderSite(page,lang,base)}</body></html>`);
}
console.log(`Exported ${routes.length * languages.length} pages in four languages.`);



