import {renderSite} from '@/lib/site-renderer.mjs';
import {DocumentLanguage} from './document-language';
export function LocalizedPage({page='',lang='en'}:{page?:string;lang?:string}){
 return <><DocumentLanguage lang={lang}/><div lang={lang} dir={lang==='ar'?'rtl':'ltr'} dangerouslySetInnerHTML={{__html:renderSite(page,lang)}}/></>;
}
