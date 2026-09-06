import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {languages,routes,pageUrl,translate} from '../lib/site-renderer.mjs';
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
   for(const name of ['youssef-kandeel','yijie-qian','chenyang-zhang','raul-henares-vargas'])assert(html.includes(`/people/${name}.png`));
   assert(html.includes(translate('Research Engineer',lang)));
   assert(html.indexOf('<h2>'+translate('Professor Cian Ó Mathúna',lang))>html.indexOf('<h2>'+translate('Team members',lang)));
 }
}
console.log('Verified all 28 pages: language, direction, same-page language switches, internal links, portraits and roles.');
