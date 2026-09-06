import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {languages,routes,pageUrl,translate} from '../lib/site-renderer.mjs';
import {teamMembers} from '../lib/team-members.mjs';
const base='/tyndall_tpel';
for(const [lang] of languages)for(const page of routes){
 const path=pageUrl(page,lang,base).slice(base.length);
 const html=readFileSync(`gh-pages-output${path}index.html`,'utf8');
 assert(html.includes(`<html lang="${lang}" dir="${lang==='ar'?'rtl':'ltr'}">`));
 for(const [target] of languages)assert(html.includes(`href="${pageUrl(page,target,base)}" lang="${target}"`),`${lang}/${page}: language link`);
 for(const match of html.matchAll(/(?:href|src)="(\/tyndall_tpel\/[^"]*)"/g)){
   const local=match[1].slice(base.length).split('#')[0];
   assert(existsSync(`gh-pages-output${local}${local.endsWith('/')?'index.html':''}`),`Broken link: ${match[1]}`);
 }
 if(page==='people'){
   const directory=html.split('<div class="member-list">')[1].split('<h2>'+translate('Advisor',lang))[0];
   assert(!directory.includes('<img'), 'Directory must not contain portraits');
   assert(!directory.includes('member-grid'));
   for(const m of teamMembers){assert(directory.includes(pageUrl('people/'+m.slug,lang,base)));assert(directory.includes(m.linkedin));}
   assert(!directory.includes(translate('Guitarist, singer-songwriter and producer.',lang)));
   assert(html.indexOf('<h2>'+translate('Professor Cian Ó Mathúna',lang))>html.indexOf('<h2>'+translate('Team members',lang)));
 }
 if(page.startsWith('people/')){const m=teamMembers.find(m=>'people/'+m.slug===page);assert(html.includes('/people/'+m.slug+'.png'));assert(html.includes(pageUrl('people',lang,base)));assert(html.includes(m.linkedin));assert(!html.includes('To be added'));}
}
console.log('Verified all 44 pages: language, direction, links, portrait-free directory and individual profiles.');
