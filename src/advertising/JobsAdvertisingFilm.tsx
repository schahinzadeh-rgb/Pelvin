import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Bell, Bookmark, BrainCircuit, Building2, Check, ChevronRight,
  CircleDot, Eye, FileArchive, MapPin, Radar,
  Search, Sparkles, TrendingUp,
} from 'lucide-react'
import { BrandMark } from '../components/Brand'
import { NavBar } from '../components/NavBar'
import { TargetCursor } from './TargetCursor'
import './advertising.css'
import './jobsAdvertising.css'

const DURATION = 38

const timeline = [
  { id: 'market', from: 0, to: 4 },
  { id: 'search', from: 4, to: 9 },
  { id: 'tracking', from: 9, to: 14 },
  { id: 'signals', from: 14, to: 20 },
  { id: 'archive', from: 20, to: 26 },
  { id: 'salary', from: 26, to: 31 },
  { id: 'alert', from: 31, to: 34 },
  { id: 'final', from: 34, to: 38 },
] as const

type JobSceneId = (typeof timeline)[number]['id']

const jobs = [
  { title: 'Network Engineer', company: 'NTS', location: 'Vienna', salary: '€52,000 – €68,000', mark: 'N', color: '#f05b42', tags: ['Network', 'Hybrid'] },
  { title: 'SOC Analyst', company: 'A1', location: 'Linz', salary: '€48,000 – €62,000', mark: 'A1', color: '#ef2b45', tags: ['Security', 'Full-time'] },
  { title: 'Cloud Engineer', company: 'Dynatrace', location: 'Vienna / Hybrid', salary: '€58,000 – €72,000', mark: 'D', color: '#5d54e8', tags: ['Cloud', 'Azure'] },
  { title: 'System Administrator', company: 'Frequentis', location: 'Salzburg', salary: '€46,000 – €58,000', mark: 'F', color: '#2e799d', tags: ['Systems', 'On-site'] },
]

function ProductWordmark() {
  return <div className="jobs-wordmark"><BrandMark /><span>HIRING INTELLIGENCE</span></div>
}

function JobsChrome({ label }: { label: string }) {
  return <div className="jobs-chrome"><ProductWordmark /><div><i /> AUSTRIA · ILLUSTRATIVE DATA</div><span>{label}</span></div>
}

function CountUp({ value }: { value: number }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    const start = performance.now()
    let frame = 0
    const update = (now: number) => {
      const progress = Math.min((now - start) / 1600, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setDisplay(Math.floor(value * eased))
      if (progress < 1) frame = requestAnimationFrame(update)
    }
    frame = requestAnimationFrame(update)
    return () => cancelAnimationFrame(frame)
  }, [value])
  return <>{new Intl.NumberFormat('en-US').format(display)}</>
}

function MarketScene() {
  const stats = [
    [48219, 'Active Jobs', 'Live index'], [2130, 'Companies Tracked', 'Austria'],
    [1284, 'New This Week', 'Detected'], [6940, 'Archived Jobs', 'Searchable'],
  ] as const
  return <motion.section className="jobs-scene jobs-market" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <JobsChrome label="MARKET PULSE · 01" />
    <div className="market-map" aria-hidden="true"><span>VIENNA</span><span>LINZ</span><span>GRAZ</span><span>SALZBURG</span><i /><i /><i /><i /></div>
    <motion.div className="market-title" initial={{ y: 22, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .7 }}><span><Radar size={13} /> AUSTRIAN JOB MARKET</span><h2>See the market<br />as it moves.</h2></motion.div>
    <div className="market-stats">{stats.map(([value,label,note],index) => <motion.article key={label} initial={{ y: 35, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .45 + index * .18, duration: .7, ease: [.22,1,.36,1] }}><small>{note}</small><strong><CountUp value={value} /></strong><span>{label}</span><i /></motion.article>)}</div>
  </motion.section>
}

function SearchScene() {
  const sceneRef = useRef<HTMLElement>(null)
  const firstJobRef = useRef<HTMLElement>(null)
  return <motion.section ref={sceneRef} className="jobs-scene jobs-search" initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .99 }}>
    <JobsChrome label="JOB DISCOVERY · 02" />
    <div className="search-stage"><motion.div className="search-bar" initial={{ y: -22, opacity: 0 }} animate={{ y: 0, opacity: 1 }}><Search size={15} /><strong>IT infrastructure</strong><span><MapPin size={13} /> Austria</span><button type="button">Search</button></motion.div><div className="search-meta"><span>1,842 roles found</span><span>Updated minutes ago</span></div><div className="job-card-list">{jobs.map((job,index) => <motion.article ref={index === 0 ? firstJobRef : undefined} className={index === 0 ? 'is-focused' : ''} key={job.title} initial={{ x: 44, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: .45 + index * .24, duration: .65 }}><div className="company-mark" style={{ '--mark': job.color } as React.CSSProperties}>{job.mark}</div><div><small>{job.company}</small><h3>{job.title}</h3><p><MapPin size={11} /> {job.location}</p><div>{job.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div><strong>{job.salary}</strong><Bookmark size={15} /></motion.article>)}</div></div>
    <div className="search-spotlight" /><TargetCursor containerRef={sceneRef} targetRef={firstJobRef} start={[88,79]} settleDelay={1.15} duration={2.3} className="jobs-cursor" />
  </motion.section>
}

function TrackingScene({ localTime }: { localTime: number }) {
  const enabled = localTime > 2.15
  const sceneRef = useRef<HTMLElement>(null)
  const trackButtonRef = useRef<HTMLButtonElement>(null)
  return <motion.section ref={sceneRef} className="jobs-scene jobs-tracking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <JobsChrome label="COMPANY MONITORING · 03" />
    <motion.div className="company-profile" initial={{ x: -55, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: .75 }}><div className="company-logo-large">NTS</div><span>COMPANY PROFILE</span><h2>NTS</h2><p><MapPin size={12} /> Austria · Multiple locations</p><div className="company-facts"><span><strong>24</strong> locations</span><span><strong>IT</strong> services</span><span><strong>Live</strong> monitoring</span></div><button ref={trackButtonRef} className={enabled ? 'is-enabled' : ''} type="button">{enabled ? <><Check size={15} /> Company monitoring enabled</> : <><Eye size={15} /> Track company</>}</button></motion.div>
    <div className="activity-panel"><div className="activity-summary"><motion.span initial={{ y: 18,opacity:0 }} animate={{ y:0,opacity:1 }} transition={{delay:.4}}><strong>3</strong> new openings</motion.span><motion.span initial={{ y:18,opacity:0 }} animate={{ y:0,opacity:1 }} transition={{delay:.6}}><strong>2</strong> postings closed</motion.span><motion.span initial={{ y:18,opacity:0 }} animate={{ y:0,opacity:1 }} transition={{delay:.8}}><strong>1</strong> role re-posted</motion.span></div><div className="activity-timeline"><motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:1.1}}><i className="green" /><span><strong>Security Analyst</strong><small>New opening detected</small></span><time>NOW</time></motion.div><motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:1.4}}><i /><span><strong>Network Engineer</strong><small>Posted 2 days ago</small></span><time>2D</time></motion.div><motion.div initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} transition={{delay:1.7}}><i className="muted" /><span><strong>IT Support Engineer</strong><small>Posting closed</small></span><time>5D</time></motion.div></div></div>
    {!enabled && <TargetCursor containerRef={sceneRef} targetRef={trackButtonRef} start={[80,82]} settleDelay={.8} duration={1.25} className="jobs-cursor" />}
  </motion.section>
}

function SignalsScene() {
  const signals = [
    ['Infrastructure team expanding', 'High confidence', 'high'],
    ['Likely 2 new hires started', 'Medium confidence', 'medium'],
    ['Possible role vacancy detected', 'Medium confidence', 'medium'],
  ]
  const sources = ['New job postings','Archived roles','Re-posted positions','Historical hiring patterns','Public workforce signals']
  return <motion.section className="jobs-scene jobs-signals" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <JobsChrome label="AI SIGNALS · 04" />
    <div className="signal-backdrop" />
    <motion.div className="ai-signal-card" initial={{ scale: .92,y:30,opacity:0,filter:'blur(9px)' }} animate={{scale:1,y:0,opacity:1,filter:'blur(0px)'}} transition={{duration:.8,ease:[.22,1,.36,1]}}><header><span><BrainCircuit size={17} /> AI HIRING SIGNALS</span><div><TrendingUp size={14} /><strong>+38%</strong><small>hiring activity</small></div></header><div className="signal-list">{signals.map(([title,confidence,level],index) => <motion.article key={title} initial={{x:25,opacity:0}} animate={{x:0,opacity:1}} transition={{delay:.55+index*.35}}><span className={level}><i /></span><div><strong>{title}</strong><small>Based on available market signals</small></div><b className={level}>{confidence}</b></motion.article>)}</div><footer><CircleDot size={11} /> Estimates, not confirmed personnel events</footer></motion.div>
    <motion.aside className="signal-sources" initial={{x:45,opacity:0}} animate={{x:0,opacity:1}} transition={{delay:.9,duration:.75}}><span>SIGNALS ANALYSED</span>{sources.map((source,index)=><motion.div key={source} initial={{opacity:0,x:12}} animate={{opacity:1,x:0}} transition={{delay:1.2+index*.18}}><Check size={11}/>{source}</motion.div>)}</motion.aside>
  </motion.section>
}

function ArchiveScene() {
  return <motion.section className="jobs-scene jobs-archive" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
    <JobsChrome label="HISTORICAL INTELLIGENCE · 05" />
    <motion.div className="archive-card" initial={{rotateX:6,y:35,opacity:0}} animate={{rotateX:0,y:0,opacity:1}} transition={{duration:.8,ease:[.22,1,.36,1]}}><div className="archive-top"><div className="company-mark nts-mark">N</div><div><span>NTS · VIENNA, AUSTRIA</span><h2>Network Operations Engineer</h2><p>€52,000 – €64,000</p></div><span className="archive-badge"><FileArchive size={12}/> No longer publicly available</span></div><div className="archive-dates"><span><small>POSTED</small>Aug 12</span><i/><span><small>ARCHIVED</small>Sep 28</span><b>47 days online</b></div><div className="archive-sections">{['Responsibilities','Requirements','Salary','Tech Stack','Benefits'].map((name,index)=><motion.div key={name} initial={{y:14,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:.55+index*.16}}><span>{String(index+1).padStart(2,'0')}</span><strong>{name}</strong><ChevronRight size={13}/></motion.div>)}</div><button type="button">View archived posting <ChevronRight size={14}/></button></motion.div>
    <div className="archive-caption"><FileArchive size={17}/><span><strong>Public posting preserved</strong><small>Research the original role after it leaves the source.</small></span></div>
  </motion.section>
}

function SalaryScene() {
  const ticks = [49,52,55,58.4,61,65,68,71]
  return <motion.section className="jobs-scene jobs-salary" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
    <JobsChrome label="SALARY INTELLIGENCE · 06" />
    <motion.div className="salary-card" initial={{scale:.9,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:.8,ease:[.22,1,.36,1]}}><header><div><span>NETWORK ENGINEER · AUSTRIA</span><h2>Salary insight</h2></div><span><i/> LIVE + ARCHIVE</span></header><div className="salary-main"><div><span>MEDIAN ADVERTISED SALARY</span><motion.strong initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:.45}}>€58,400</motion.strong><small>gross annual salary</small></div><div><span>OBSERVED RANGE</span><strong>€49k – €71k</strong><small>Based on advertised values</small></div></div><div className="salary-chart"><div className="salary-bars">{ticks.map((tick,index)=><motion.i key={tick} initial={{height:0}} animate={{height:`${28+Math.sin((index/7)*Math.PI)*62}%`}} transition={{delay:.55+index*.09,duration:.65}} />)}</div><div className="salary-range"><span>€49k</span><b><i/></b><span>€71k</span></div></div><footer>Based on <strong>286</strong> current + archived postings</footer></motion.div>
  </motion.section>
}

function AlertScene() {
  return <motion.section className="jobs-scene jobs-alert" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
    <JobsChrome label="REAL-TIME ALERTS · 07" />
    <div className="alert-rings" aria-hidden="true"><i/><i/><i/></div>
    <motion.div className="alert-card" initial={{y:50,scale:.9,opacity:0}} animate={{y:0,scale:1,opacity:1}} transition={{duration:.75,ease:[.16,1,.3,1]}}><div className="alert-icon"><Bell size={20}/><i/></div><div><span>NEW HIRING ACTIVITY DETECTED</span><h2>NTS added 2 Network Engineering roles in Vienna</h2><p>Tracked company activity increased · detected moments ago</p><button type="button">View insight <ChevronRight size={13}/></button></div><time>NOW</time></motion.div>
  </motion.section>
}

function FinalScene() {
  const cards = [['Live Jobs',Search],['Company Tracking',Building2],['Archived Jobs',FileArchive],['AI Hiring Signals',BrainCircuit],['Salary Insights',TrendingUp]] as const
  return <motion.section className="jobs-scene jobs-final" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
    <div className="final-feature-orbit">{cards.map(([label,Icon],index)=><motion.div key={label} initial={{opacity:0,scale:.7,x:(index-2)*75,y:index%2?55:-45}} animate={{opacity:.34,scale:1,x:0,y:0}} transition={{delay:index*.13,duration:.8}} className={`final-feature feature-${index}`}><Icon size={15}/>{label}</motion.div>)}</div>
    <motion.div className="jobs-final-copy" initial={{scale:.9,opacity:0,filter:'blur(10px)'}} animate={{scale:1,opacity:1,filter:'blur(0px)'}} transition={{delay:.7,duration:.85,ease:[.22,1,.36,1]}}><ProductWordmark/><i/><h2>Understand hiring<br/>before the market does.</h2><p>Live jobs. Historical context. Clearer signals.</p></motion.div>
  </motion.section>
}

function Scene({id,localTime}:{id:JobSceneId;localTime:number}) {
  if(id==='market') return <MarketScene/>
  if(id==='search') return <SearchScene/>
  if(id==='tracking') return <TrackingScene localTime={localTime}/>
  if(id==='signals') return <SignalsScene/>
  if(id==='archive') return <ArchiveScene/>
  if(id==='salary') return <SalaryScene/>
  if(id==='alert') return <AlertScene/>
  return <FinalScene/>
}

function JobsFilm() {
  const [time,setTime]=useState(0)
  const [playing,setPlaying]=useState(true)
  const frame=useRef<number|null>(null)
  useEffect(()=>{
    if(!playing) return
    let previous=performance.now()
    const tick=(now:number)=>{const delta=Math.min((now-previous)/1000,.15);previous=now;setTime(current=>{const next=Math.min(current+delta,DURATION);if(next>=DURATION)queueMicrotask(()=>setPlaying(false));return next});frame.current=requestAnimationFrame(tick)}
    frame.current=requestAnimationFrame(tick)
    return()=>{if(frame.current!==null)cancelAnimationFrame(frame.current)}
  },[playing])
  const scene=useMemo(()=>timeline.find(item=>time>=item.from&&time<item.to)??timeline[timeline.length-1],[time])
  return <div className="product-film-shell jobs-film-shell"><div className="product-film jobs-film" aria-label="Pelvin Hiring Intelligence Product Film"><div className="film-noise"/><AnimatePresence mode="wait"><Scene key={scene.id} id={scene.id} localTime={time-scene.from}/></AnimatePresence></div></div>
}

export function JobsAdvertisingFilm() {
  useEffect(()=>{const old=document.title;document.title='Pelvin Hiring Intelligence — Product Film';return()=>{document.title=old}},[])
  return <main className="advertising-page jobs-advertising-page"><NavBar/><section className="advertising-intro jobs-advertising-intro"><span><Sparkles size={12}/> PRODUCT FILM · MARKET INTELLIGENCE</span><h1>See how companies<br/>are hiring.</h1><p>A focused product study for Austrian job market, company and hiring intelligence.</p></section><JobsFilm/></main>
}
