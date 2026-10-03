import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import {
  BriefcaseBusiness, CalendarDays, Check, ChevronRight,
  Circle, FileCheck2, FolderSync, MapPin,
  ShieldCheck, Sparkles, Users,
} from 'lucide-react'
import { BrandMark } from '../components/Brand'
import { NavBar } from '../components/NavBar'
import { TargetCursor } from './TargetCursor'
import './advertising.css'

const FILM_DURATION = 37

const scenes = [
  { id: 'intro', from: 0, to: 3 },
  { id: 'connect', from: 3, to: 8 },
  { id: 'microsoft', from: 8, to: 13 },
  { id: 'employee', from: 13, to: 21 },
  { id: 'department', from: 21, to: 25 },
  { id: 'documents', from: 25, to: 29 },
  { id: 'ready', from: 29, to: 33 },
  { id: 'complete', from: 33, to: 37 },
] as const

type SceneId = (typeof scenes)[number]['id']

const portrait = {
  sarah: '/assets/werbung/sarah-miller.jpg',
  daniel: '/assets/werbung/daniel-weber.jpg',
  anna: '/assets/werbung/team-anna.jpg',
  leon: '/assets/werbung/team-leon.jpg',
  maya: '/assets/werbung/team-maya.jpg',
}

function MicrosoftSymbol({ className = '' }: { className?: string }) {
  return <img className={`film-ms-symbol ${className}`} src="/assets/werbung/microsoft-symbol.svg" alt="Microsoft" />
}

function Avatar({ src, label, className = '' }: { src: string; label: string; className?: string }) {
  return <img className={`film-avatar ${className}`} src={src} alt={label} />
}

function FilmChrome({ label }: { label: string }) {
  return <div className="film-chrome"><BrandMark /><div className="film-chrome-status"><i /> PRODUCT PREVIEW · SIMULATED</div><span>{label}</span></div>
}

function IntroScene() {
  return <motion.section className="film-scene scene-intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .7 }}>
    <motion.div initial={{ scale: .92, opacity: 0, filter: 'blur(12px)' }} animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 1.2, ease: [.22, 1, .36, 1] }}><BrandMark /></motion.div>
    <motion.p initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .65, duration: .8 }}>One onboarding. Everything connected.</motion.p>
    <motion.i initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.1, duration: .9, ease: 'easeOut' }} />
  </motion.section>
}

function ConnectScene() {
  const sceneRef = useRef<HTMLElement>(null)
  const connectButtonRef = useRef<HTMLButtonElement>(null)
  return <motion.section ref={sceneRef} className="film-scene scene-connect" initial={{ opacity: 0, scale: 1.025 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .985 }} transition={{ duration: .65 }}>
    <FilmChrome label="SETUP · 01" />
    <div className="film-ambient-grid" />
    <motion.div className="tenant-card" initial={{ y: 44, opacity: 0, rotateX: 7 }} animate={{ y: 0, opacity: 1, rotateX: 0 }} transition={{ duration: .85, ease: [.22, 1, .36, 1] }}>
      <div className="tenant-copy"><span className="film-eyebrow"><Sparkles size={11} /> WORKSPACE CONNECTION</span><h2>Connect your<br />Microsoft tenant</h2><p>Bring people, groups and company context into one secure workspace.</p><button ref={connectButtonRef} type="button"><MicrosoftSymbol /> Connect Microsoft <ChevronRight size={15} /></button></div>
      <div className="tenant-visual"><div className="tenant-halo halo-one" /><div className="tenant-halo halo-two" /><div className="ms-orb"><MicrosoftSymbol /></div><div className="tenant-mini-card mini-people"><Users size={15} /><strong>People</strong><span>Directory</span></div><div className="tenant-mini-card mini-security"><ShieldCheck size={15} /><strong>Identity</strong><span>Protected</span></div></div>
    </motion.div>
    <TargetCursor containerRef={sceneRef} targetRef={connectButtonRef} start={[87,77]} settleDelay={.9} duration={2.4} className="film-cursor" />
  </motion.section>
}

function MicrosoftScene({ localTime }: { localTime: number }) {
  const connected = localTime > 3.15
  return <motion.section className="film-scene scene-microsoft" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .55 }}>
    <FilmChrome label="MICROSOFT · CONNECTION" />
    <div className="microsoft-stage">
      <div className="connection-map" aria-hidden="true"><span className="connection-line line-one" /><span className="connection-line line-two" /><motion.div className="connection-packet" animate={{ offsetDistance: ['0%', '100%'] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }} /></div>
      <motion.div className="brand-node pelvin-node" initial={{ x: -26, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: .15 }}><BrandMark /><small>Workspace</small></motion.div>
      <motion.div className="brand-node entra-node" initial={{ scale: .8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: .45 }}><div className="entra-glyph"><span /><span /></div><strong>Microsoft Entra ID</strong><small>Identity directory</small></motion.div>
      <motion.div className="brand-node microsoft-node" initial={{ x: 26, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: .75 }}><MicrosoftSymbol /><strong>Microsoft 365</strong><small>Work or school account</small></motion.div>
      <AnimatePresence mode="wait">
        {!connected ? <motion.div key="connecting" className="connection-status" initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -12, opacity: 0 }}><span className="status-spinner" /><div><strong>Connecting to Microsoft Entra ID</strong><small>Reading organization context securely</small></div></motion.div>
          : <motion.div key="connected" className="connection-status status-success" initial={{ scale: .92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}><span><Check size={16} /></span><div><strong>Microsoft tenant connected</strong><small>Users, groups and company profile are ready</small></div><div className="recognized-people"><Avatar src={portrait.anna} label="Team member" /><Avatar src={portrait.leon} label="Team member" /><Avatar src={portrait.maya} label="Team member" /><b>+48</b></div></motion.div>}
      </AnimatePresence>
    </div>
  </motion.section>
}

const employeeFields = [
  ['First name', 'Sarah'], ['Last name', 'Miller'], ['Department', 'Marketing'],
  ['Position', 'Marketing Manager'], ['Start date', 'November 2, 2026'], ['Location', 'Vienna'],
]

function EmployeeScene() {
  const sceneRef = useRef<HTMLElement>(null)
  const managerRef = useRef<HTMLDivElement>(null)
  return <motion.section ref={sceneRef} className="film-scene scene-employee" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <FilmChrome label="NEW EMPLOYEE · 02" />
    <div className="employee-layout">
      <motion.aside className="employee-profile" initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: .75, ease: [.22, 1, .36, 1] }}><div className="portrait-wrap"><Avatar src={portrait.sarah} label="Sarah Miller" /></div><span>NEW EMPLOYEE</span><h2>Sarah Miller</h2><p>Marketing Manager</p><div className="profile-ready"><i /> Profile in progress</div></motion.aside>
      <div className="employee-form"><div className="form-heading"><div><span>EMPLOYEE DETAILS</span><h3>Prepare the essentials</h3></div><small>STEP 1 OF 3</small></div><div className="field-grid">{employeeFields.map(([label, value], index) => <motion.label key={label} initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .55 + index * .42, duration: .5 }}><span>{label}</span><div>{index === 4 && <CalendarDays size={13} />}{index === 5 && <MapPin size={13} />}<motion.b initial={{ width: 0 }} animate={{ width: 'auto' }} transition={{ delay: .8 + index * .42, duration: .55 }}>{value}</motion.b>{label === 'Department' && <ChevronRight size={13} />}</div></motion.label>)}</div><motion.div className="manager-field" initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 3.3 }}><span>Manager</span><div ref={managerRef}><Avatar src={portrait.daniel} label="Daniel Weber" /><b>Daniel Weber</b><small>Head of Growth</small><Check size={13} /></div></motion.div></div>
    </div>
    <TargetCursor containerRef={sceneRef} targetRef={managerRef} start={[82,80]} settleDelay={3.45} duration={1.8} className="film-cursor" pulse={false} />
  </motion.section>
}

function DepartmentScene() {
  return <motion.section className="film-scene scene-department" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <FilmChrome label="ORGANIZATION CONTEXT" />
    <motion.div className="department-card" initial={{ scale: .92, y: 25, opacity: 0, filter: 'blur(8px)' }} animate={{ scale: 1, y: 0, opacity: 1, filter: 'blur(0px)' }} transition={{ duration: .8, ease: [.22, 1, .36, 1] }}><div className="detected-icon"><FolderSync size={21} /></div><span className="detected-label"><i /> DEPARTMENT DETECTED</span><h2>Marketing</h2><p>Matched with your connected Microsoft environment.</p><div className="context-chips"><span>Marketing</span><span><MicrosoftSymbol /> Microsoft 365</span><span><ShieldCheck size={13} /> Entra ID</span></div><div className="team-match"><div><Avatar src={portrait.anna} label="Anna from Marketing" /><Avatar src={portrait.leon} label="Leon from Marketing" /><Avatar src={portrait.maya} label="Maya from Marketing" /></div><p><strong>12 people</strong><br />in this department</p></div></motion.div>
    <div className="department-glow" />
  </motion.section>
}

const documents = [
  ['Employment contract', true], ['Personal information', true], ['NDA', false], ['Tax form', false],
]

function DocumentsScene() {
  return <motion.section className="film-scene scene-documents" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <FilmChrome label="DOCUMENT CHECK" />
    <motion.div className="documents-card" initial={{ rotateY: -7, x: 40, opacity: 0 }} animate={{ rotateY: 0, x: 0, opacity: 1 }} transition={{ duration: .8, ease: [.22, 1, .36, 1] }}><div className="documents-head"><div><span>REQUIRED DOCUMENTS</span><h2>Everything in one place</h2></div><div className="document-count">2<span>pending</span></div></div><div className="documents-list">{documents.map(([name, done], index) => <motion.div key={String(name)} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: .45 + index * .28 }} className={done ? 'is-done' : ''}><span>{done ? <Check size={14} /> : <Circle size={12} />}</span><strong>{name}</strong><small>{done ? 'Available' : 'Required'}</small></motion.div>)}</div><div className="documents-meter"><i /><span>2 of 4 documents ready</span></div></motion.div>
  </motion.section>
}

function ReadyScene() {
  const sceneRef = useRef<HTMLElement>(null)
  const startButtonRef = useRef<HTMLButtonElement>(null)
  return <motion.section ref={sceneRef} className="film-scene scene-ready" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <FilmChrome label="REVIEW · 03" />
    <div className="assembly-stage"><motion.div className="assembly-card assembly-person" initial={{ x: -150, y: -42, opacity: 0 }} animate={{ x: 0, y: 0, opacity: 1 }} transition={{ duration: .8 }}><Avatar src={portrait.sarah} label="Sarah Miller" /><span><strong>Sarah Miller</strong><small>Marketing Manager</small></span></motion.div><motion.div className="assembly-card assembly-dept" initial={{ x: 120, y: -60, opacity: 0 }} animate={{ x: 0, y: 0, opacity: 1 }} transition={{ delay: .15, duration: .8 }}><BriefcaseBusiness size={17} /><span><strong>Marketing</strong><small>Vienna</small></span></motion.div><motion.div className="assembly-card assembly-entra" initial={{ x: -120, y: 70, opacity: 0 }} animate={{ x: 0, y: 0, opacity: 1 }} transition={{ delay: .3, duration: .8 }}><MicrosoftSymbol /><span><strong>Microsoft Entra ID</strong><small>Connected</small></span></motion.div><motion.div className="assembly-card assembly-docs" initial={{ x: 140, y: 70, opacity: 0 }} animate={{ x: 0, y: 0, opacity: 1 }} transition={{ delay: .45, duration: .8 }}><FileCheck2 size={17} /><span><strong>2 documents</strong><small>pending</small></span></motion.div></div>
    <motion.div className="ready-panel" initial={{ scale: .9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.15, duration: .7, ease: [.22, 1, .36, 1] }}><span>REVIEW COMPLETE</span><h2>Ready to onboard</h2><button ref={startButtonRef} type="button">Start onboarding <ChevronRight size={16} /></button></motion.div>
    <TargetCursor containerRef={sceneRef} targetRef={startButtonRef} start={[86,80]} settleDelay={1.85} duration={1.05} className="film-cursor" />
  </motion.section>
}

function CompleteScene({ localTime }: { localTime: number }) {
  const completed = localTime > 1.1
  const timeline = ['Identity', 'Microsoft 365', 'Hardware', 'Access', 'Documents']
  return <motion.section className="film-scene scene-complete" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <div className="future-timeline">{timeline.map((item, index) => <motion.div key={item} initial={{ opacity: 0, y: 15 }} animate={{ opacity: .22, y: 0 }} transition={{ delay: .2 + index * .12 }}><span>{String(index + 1).padStart(2, '0')}</span><i /><b>{item}</b></motion.div>)}</div>
    <AnimatePresence mode="wait">{!completed ? <motion.div key="processing" className="processing-state" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ scale: .85, opacity: 0 }}><span className="processing-ring"><i /></span><p>Preparing onboarding</p></motion.div> : <motion.div key="success" className="final-state" initial={{ scale: .88, opacity: 0, filter: 'blur(10px)' }} animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }} transition={{ duration: .7, ease: [.22, 1, .36, 1] }}><span className="success-mark"><Check size={26} /></span><h2>Onboarding started</h2><p>Sarah’s next steps are ready.</p><i /><BrandMark /><small>From new hire to ready to work.</small></motion.div>}</AnimatePresence>
  </motion.section>
}

function Scene({ id, localTime }: { id: SceneId; localTime: number }) {
  if (id === 'intro') return <IntroScene />
  if (id === 'connect') return <ConnectScene />
  if (id === 'microsoft') return <MicrosoftScene localTime={localTime} />
  if (id === 'employee') return <EmployeeScene />
  if (id === 'department') return <DepartmentScene />
  if (id === 'documents') return <DocumentsScene />
  if (id === 'ready') return <ReadyScene />
  return <CompleteScene localTime={localTime} />
}

function ProductFilm() {
  const [time, setTime] = useState(0)
  const [playing, setPlaying] = useState(true)
  const raf = useRef<number | null>(null)

  useEffect(() => {
    if (!playing) return
    let previous = performance.now()
    const tick = (now: number) => {
      const delta = Math.min((now - previous) / 1000, .15)
      previous = now
      setTime(current => {
        const next = Math.min(current + delta, FILM_DURATION)
        if (next >= FILM_DURATION) queueMicrotask(() => setPlaying(false))
        return next
      })
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => { if (raf.current !== null) cancelAnimationFrame(raf.current) }
  }, [playing])

  const scene = useMemo(() => scenes.find(item => time >= item.from && time < item.to) ?? scenes[scenes.length - 1], [time])
  const localTime = time - scene.from

  return <div className="product-film-shell">
    <div className="product-film" aria-label="Pelvin product film" aria-live="polite">
      <div className="film-noise" aria-hidden="true" />
      <AnimatePresence mode="wait"><Scene key={scene.id} id={scene.id} localTime={localTime} /></AnimatePresence>
    </div>
  </div>
}

export function AdvertisingFilm() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Pelvin Product Film — Onboarding connected'
    return () => { document.title = previousTitle }
  }, [])

  return <main className="advertising-page">
    <NavBar />
    <section className="advertising-intro"><span><Sparkles size={12} /> PRODUCT FILM · CONCEPT 01</span><h1>A new hire.<br />Everything connected.</h1><p>A focused product film about preparing a structured employee onboarding with Pelvin and Microsoft.</p></section>
    <ProductFilm />
  </main>
}
