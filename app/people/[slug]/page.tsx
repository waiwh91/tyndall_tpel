import {notFound} from 'next/navigation';
import {LocalizedPage} from '@/components/localized-page';
import {teamMembers} from '@/lib/team-members.mjs';
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return teamMembers.map(({slug})=>({slug}));}
export async function generateMetadata({params}:Props){const {slug}=await params;const member=teamMembers.find(m=>m.slug===slug);return {title:member ? member.name+' — Integrated Power Electronics Systems Research Team' : 'People'};}
export default async function Page({params}:Props){const {slug}=await params;if(!teamMembers.some(m=>m.slug===slug))notFound();return <LocalizedPage page={'people/'+slug}/>;}
