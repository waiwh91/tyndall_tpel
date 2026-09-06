import {siteContent} from './site-content.mjs';
import {translations} from './translations.mjs';
export const languages=[['en','English'],['es','Español'],['zh-CN','简体中文'],['ar','العربية']];
export const routes=['','research','people','news','publications','opportunities','contact'];
const columns={es:1,'zh-CN':2,ar:3};
const escape=text=>text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export function translate(text,lang){if(text.startsWith('© 2026 '))return '© 2026 '+translate(text.slice(7),lang);const row=translations.find(row=>row[0]===text);return row && columns[lang] ? row[columns[lang]] : text;}
export function pageUrl(page,lang,base=''){return `${base}/${lang==='en'?'':lang+'/'}${page? page+'/':''}`;}
export function renderSite(page='',lang='en',base=''){
 if(!routes.includes(page)||!languages.some(([code])=>code===lang)) throw new Error('Unknown page or language');
 const {header,footer,pages}=siteContent(base);
 let markup=header+'<main>'+pages[page]+'</main>'+footer;
 markup=markup.replace(/>([^<>]+)</g,(_,text)=>'>'+escape(translate(text,lang))+'<');
 markup=markup.replace(/(aria-label|alt)="([^"]*)"/g,(_,attr,text)=>`${attr}="${escape(translate(text,lang))}"`);
 for(const route of routes) markup=markup.replaceAll(`href="${base}/${route?route+'/':''}"`,`href="${pageUrl(route,lang,base)}"`);
 const languageLabel=({en:'Language',es:'Idioma','zh-CN':'语言',ar:'اللغة'})[lang];
 const currentLanguage=languages.find(([code])=>code===lang)[1];
 const selector=`<details class="language-dropdown" dir="ltr"><summary aria-label="${languageLabel}: ${currentLanguage}">${currentLanguage}<span aria-hidden="true">⌄</span></summary><nav class="language-options" aria-label="${languageLabel}">${languages.map(([code,label])=>`<a href="${pageUrl(page,code,base)}" lang="${code}" hreflang="${code}"${code===lang?' aria-current="true"':''}>${label}</a>`).join('')}</nav></details>`;
 return markup.replace('</a></div><header>','</a>'+selector+'</div><header>');
}
