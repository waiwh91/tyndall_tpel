import {notFound} from 'next/navigation';
import {LocalizedPage} from '@/components/localized-page';
import {languages,routes,translate} from '@/lib/site-renderer.mjs';
type Props={params:Promise<{lang:string;slug?:string[]}>};
export function generateStaticParams(){return languages.filter(([lang])=>lang!=='en').flatMap(([lang])=>routes.map(page=>({lang,slug:page?[page]:[]})));}
export async function generateMetadata({params}:Props){const {lang,slug=[]}=await params;const page=slug[0]||'';return {title:`${translate(page? page[0].toUpperCase()+page.slice(1):'Home',lang)} — ${translate('Tyndall Power Electronics Research Team',lang)}`};}
export default async function Page({params}:Props){const {lang,slug=[]}=await params;if(!languages.some(([code])=>code===lang&&code!=='en')||slug.length>1||!routes.includes(slug[0]||''))notFound();return <LocalizedPage page={slug[0]||''} lang={lang}/>;}
