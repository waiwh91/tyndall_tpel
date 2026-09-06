import {notFound} from 'next/navigation';
import {LocalizedPage} from '@/components/localized-page';
import {languages,routes,translate,pageTitle} from '@/lib/site-renderer.mjs';
type Props={params:Promise<{lang:string;slug?:string[]}>};
export function generateStaticParams(){return languages.filter(([lang])=>lang!=='en').flatMap(([lang])=>routes.map(page=>({lang,slug:page?page.split('/'):[]})));}
export async function generateMetadata({params}:Props){const {lang,slug=[]}=await params;const page=slug.join('/');return {title:`${pageTitle(page,lang)} — ${translate('Tyndall Power Electronics Research Team',lang)}`};}
export default async function Page({params}:Props){const {lang,slug=[]}=await params;if(!languages.some(([code])=>code===lang&&code!=='en')||!routes.includes(slug.join('/')))notFound();return <LocalizedPage page={slug.join('/')} lang={lang}/>;}
