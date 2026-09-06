import {Shell,PageTitle} from '@/components/site-shell';
import news from '@/lib/news.json';

export const metadata = {title: 'News — Tyndall Power Electronics Research Team'};

export default function News(){return <Shell><div className="content"><PageTitle title="News" lead="Team activities and research updates."/><div className="news-list">{news.map(item=><article key={item.title}><p className="meta">{item.date}</p><h2>{item.title}</h2><p>{item.body}</p><a href={item.source}>{'sourceLabel' in item ? item.sourceLabel : 'Read on LinkedIn'}</a></article>)}</div></div></Shell>}
