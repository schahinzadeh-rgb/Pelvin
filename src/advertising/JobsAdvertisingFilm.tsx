import { useEffect } from 'react'
import {
  ArrowRight, Bell, BrainCircuit, Building2, Check, CircleDot,
  FileArchive, MapPin, Radar, Search, Sparkles, TrendingUp,
} from 'lucide-react'
import { BrandMark } from '../components/Brand'
import { NavBar } from '../components/NavBar'
import { StoryVisualFrame } from './StoryVisualFrame'
import './advertising.css'
import './jobsAdvertising.css'

const chapters = [
  {
    number: '01',
    eyebrow: 'MARKET PULSE',
    title: 'See where hiring activity is moving.',
    copy: 'A focused market view brings current job activity, locations and changes into one place instead of isolated searches.',
    visual: 'market',
  },
  {
    number: '02',
    eyebrow: 'COMPANY INTELLIGENCE',
    title: 'Follow the companies that matter.',
    copy: 'Company profiles combine current openings with a concise activity history, making hiring direction easier to understand.',
    visual: 'company',
  },
  {
    number: '03',
    eyebrow: 'HIRING SIGNALS',
    title: 'Turn public activity into clearer signals.',
    copy: 'Pelvin groups repeat postings, role patterns and changes into explainable indicators — always marked as estimates, not facts.',
    visual: 'signals',
  },
  {
    number: '04',
    eyebrow: 'HISTORICAL CONTEXT',
    title: 'Compare the market beyond today.',
    copy: 'Archived roles and advertised salary ranges add context for research, benchmarking and future alerts.',
    visual: 'archive',
  },
] as const

function PremiumBar({ label }: { label: string }) {
  return <header className="premium-ui-bar"><div><BrandMark /><span>HIRING INTELLIGENCE</span></div><small><i /> {label}</small></header>
}

function MarketVisual() {
  return <div className="premium-market-ui premium-panel">
    <PremiumBar label="AUSTRIA · CONCEPT DATA" />
    <div className="market-ui-head"><div><span>AUSTRIAN JOB MARKET</span><h3>Market pulse</h3></div><div className="market-ui-search"><Search size={13} /> IT infrastructure</div></div>
    <div className="market-ui-body"><div className="market-ui-map"><span>VIENNA<i /></span><span>LINZ<i /></span><span>GRAZ<i /></span><span>SALZBURG<i /></span><div className="map-orbit orbit-a" /><div className="map-orbit orbit-b" /></div><div className="market-ui-stats"><article><span>ACTIVE ROLES</span><strong>48,219</strong><small><TrendingUp size={11} /> +8.4% this month</small></article><article><span>COMPANIES</span><strong>2,130</strong><small>Across Austria</small></article><article><span>NEW THIS WEEK</span><strong>1,284</strong><small>Recently detected</small></article></div></div>
  </div>
}

function CompanyVisual() {
  const activity = [['NOW', 'Security Analyst', 'New opening detected'], ['2D', 'Network Engineer', 'Role published'], ['5D', 'IT Support Engineer', 'Posting archived']]
  return <div className="premium-company-ui premium-panel">
    <PremiumBar label="COMPANY PROFILE" />
    <div className="company-ui-top"><div className="company-ui-mark">N</div><div><span>TRACKED COMPANY</span><h3>NTS</h3><p><MapPin size={11} /> Austria · multiple locations</p></div><button type="button"><Bell size={13} /> Monitoring</button></div>
    <div className="company-ui-metrics"><span><strong>24</strong> locations</span><span><strong>18</strong> active roles</span><span><strong>+38%</strong> activity</span></div>
    <div className="company-ui-activity"><div className="activity-chart"><span>90D ACTIVITY</span><svg viewBox="0 0 320 82" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="activity-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ff6b2c" stopOpacity=".3"/><stop offset="1" stopColor="#ff6b2c" stopOpacity="0"/></linearGradient></defs><path d="M0 66C30 68 35 46 62 52s35 17 58 5 35-38 61-29 37 28 61 13 35-28 78-18V82H0Z" fill="url(#activity-fill)"/><path d="M0 66C30 68 35 46 62 52s35 17 58 5 35-38 61-29 37 28 61 13 35-28 78-18" fill="none" stroke="#ff6b2c" strokeWidth="2"/></svg></div><div className="activity-feed">{activity.map(([time,title,note]) => <article key={title}><i /><div><strong>{title}</strong><small>{note}</small></div><time>{time}</time></article>)}</div></div>
  </div>
}

function SignalsVisual() {
  const signals = [['Infrastructure hiring accelerating', 'HIGH', '+38%'], ['Security roles repeatedly opened', 'MEDIUM', '3×'], ['Possible team expansion', 'MEDIUM', '+2 roles']]
  return <div className="premium-signals-ui premium-panel">
    <PremiumBar label="EXPLAINABLE SIGNALS" />
    <div className="signals-ui-head"><div><BrainCircuit size={20} /><span>HIRING SIGNALS</span><h3>Activity interpreted<br />with context.</h3></div><div className="signal-score"><span>ACTIVITY SCORE</span><strong>82</strong><small>Elevated</small></div></div>
    <div className="signals-ui-list">{signals.map(([title,confidence,value], index) => <article key={title}><span className={`signal-rank rank-${index + 1}`}>{String(index + 1).padStart(2,'0')}</span><div><strong>{title}</strong><small><CircleDot size={9} /> Based on public job activity</small></div><b>{value}</b><em>{confidence}</em></article>)}</div>
    <footer>Estimates for research · not confirmed personnel events</footer>
  </div>
}

function ArchiveVisual() {
  const bars = [32,44,53,67,82,70,55,42,35]
  return <div className="premium-archive-ui premium-panel">
    <PremiumBar label="LIVE + ARCHIVE" />
    <div className="archive-ui-grid"><div className="archive-role"><span><FileArchive size={13} /> ARCHIVED ROLE</span><h3>Network Operations Engineer</h3><p>NTS · Vienna, Austria</p><div><span>POSTED<small>12 Aug</small></span><i /><span>ARCHIVED<small>28 Sep</small></span><strong>47 days online</strong></div></div><div className="salary-insight"><span>MEDIAN ADVERTISED SALARY</span><strong>€58,400</strong><small>Observed range €49k – €71k</small><div>{bars.map((height,index) => <i style={{height:`${height}%`}} key={index} />)}</div></div></div>
    <div className="archive-alert"><span><Bell size={13} /><i /></span><div><strong>New comparable role detected</strong><small>Network Engineering · Vienna · moments ago</small></div><button type="button">View insight <ArrowRight size={12} /></button></div>
  </div>
}

function ChapterVisual({ type }: { type: typeof chapters[number]['visual'] }) {
  const panel = type === 'market' ? <MarketVisual /> : type === 'company' ? <CompanyVisual /> : type === 'signals' ? <SignalsVisual /> : <ArchiveVisual />
  const tone = type === 'signals' ? 'green' : type === 'company' ? 'violet' : 'orange'
  return <StoryVisualFrame tone={tone}>{panel}</StoryVisualFrame>
}

export function JobsAdvertisingFilm() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Pelvin — Hiring Intelligence workflow'
    return () => { document.title = previousTitle }
  }, [])

  return <main className="advertising-page market-story-page">
    <NavBar />
    <section className="market-story-hero">
      <div className="market-story-wordmark"><BrandMark /><span>HIRING INTELLIGENCE</span></div>
      <span><Sparkles size={12} /> AUSTRIAN JOB MARKET · PRODUCT CONCEPT</span>
      <h1>Understand hiring<br />before the market does.</h1>
      <p>Current roles, company activity, explainable signals and historical context — organized into one focused research workflow.</p>
      <a href="#market-story">Explore market intelligence <ArrowRight size={15} /></a>
      <div className="market-hero-orbit" aria-hidden="true"><i /><i /><i /><Radar size={34} /></div>
    </section>

    <section className="market-story" id="market-story" aria-label="Pelvin Hiring Intelligence workflow">
      <div className="market-story-spine" aria-hidden="true" />
      {chapters.map((chapter, index) => <article className={`market-chapter ${index % 2 ? 'is-reversed' : ''}`} key={chapter.number}>
        <div className="market-chapter-copy"><span>{chapter.eyebrow}</span><h2>{chapter.title}</h2><p>{chapter.copy}</p></div>
        <figure><ChapterVisual type={chapter.visual} /></figure>
      </article>)}
    </section>

    <section className="market-story-result"><div><Radar size={25} /><span>THE RESEARCH LAYER</span><h2>Live market.<br />Historical context.</h2><p>A clearer way to explore how roles, companies and advertised salaries change over time.</p></div><a href="/#/produktgespraech">Discuss the product concept <ArrowRight size={16} /></a></section>
  </main>
}
