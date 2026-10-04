import { useEffect } from 'react'
import {
  ArrowRight, CalendarDays, CheckCircle2, ClipboardCheck, KeyRound,
  Laptop, PackageCheck, ShieldCheck, Sparkles, UserRound, Users,
} from 'lucide-react'
import { NavBar } from '../components/NavBar'
import { StoryVisualFrame } from './StoryVisualFrame'
import { MarketDashboardFrame } from './MarketDashboard'
import './advertising.css'
import './jobsAdvertising.css'

const stages = [
  {
    number: '01',
    eyebrow: 'CAPTURE THE REQUEST',
    title: 'Start with one complete employee profile.',
    copy: 'HR records the new hire, role and start date. The manager adds workplace requirements before separate messages and spreadsheets appear.',
    visual: 'profile',
  },
  {
    number: '02',
    eyebrow: 'COORDINATE THE WORK',
    title: 'Turn requirements into owned tasks.',
    copy: 'Hardware, applications, access and approvals move to the right teams with clear owners, dates and a shared status.',
    visual: 'tasks',
  },
  {
    number: '03',
    eyebrow: 'CONFIRM READINESS',
    title: 'See what is ready before day one.',
    copy: 'Open decisions and blockers remain visible. The onboarding is ready only when the required work has been confirmed.',
    visual: 'ready',
  },
] as const

function ProfileVisual() {
  const requirements = [['Laptop', 'MacBook Pro 14″'], ['Applications', 'Microsoft 365 · Figma'], ['Access profile', 'Marketing standard']]
  return <StoryVisualFrame><MarketDashboardFrame mode="onboarding" active="Employee" eyebrow="NEW EMPLOYEE" title="Employee profile" subtitle="Core details and workplace requirements">
    <div className="onboarding-dashboard-content">
      <div className="onboarding-kpis"><article><span>START DATE</span><strong>02 Nov 2026</strong><small><CalendarDays size={13} /> Confirmed</small></article><article><span>LOCATION</span><strong>Vienna</strong><small>Austria office</small></article><article><span>DEPARTMENT</span><strong>Marketing</strong><small>Growth team</small></article><article><span>MANAGER</span><strong>Daniel Weber</strong><small>Request owner</small></article></div>
      <div className="onboarding-profile-grid">
        <section className="onboarding-panel employee-card"><header><span>EMPLOYEE</span><b>Profile complete</b></header><div className="employee-summary"><div><UserRound size={26} /></div><span><strong>Sarah Miller</strong><small>Marketing Manager</small><em>Vienna · Employee ID PLV-2048</em></span></div><footer><CheckCircle2 size={14} /> Core information confirmed</footer></section>
        <section className="onboarding-panel requirements-card"><header><span>WORKPLACE REQUIREMENTS</span><b>3 defined</b></header><div>{requirements.map(([label,value]) => <article key={label}><i><CheckCircle2 size={14} /></i><span><small>{label}</small><strong>{value}</strong></span></article>)}</div></section>
      </div>
    </div>
  </MarketDashboardFrame></StoryVisualFrame>
}

function TasksVisual() {
  const columns = [
    { title: 'TO DO', count: 2, tasks: [['Approve applications', 'Daniel Weber', 'Today'], ['Assign security group', 'IT Operations', '28 Oct']] },
    { title: 'IN PROGRESS', count: 2, tasks: [['Prepare laptop', 'Hardware Logistics', '30 Oct'], ['Create Microsoft 365 account', 'IT Operations', '30 Oct']] },
    { title: 'DONE', count: 2, tasks: [['Confirm employee details', 'HR', 'Completed'], ['Select workplace package', 'Daniel Weber', 'Completed']] },
  ]
  return <StoryVisualFrame tone="violet"><MarketDashboardFrame mode="onboarding" active="Tasks" eyebrow="ONBOARDING WORKFLOW" title="Task coordination" subtitle="Owners, due dates and current progress">
    <div className="onboarding-dashboard-content"><div className="workflow-progress"><span><strong>Sarah Miller</strong><small>6 of 9 required steps coordinated</small></span><div><i style={{ width: '67%' }} /><b>67%</b></div></div><div className="onboarding-kanban">{columns.map(column => <section key={column.title}><header><span>{column.title}</span><b>{column.count}</b></header>{column.tasks.map(([task,owner,date]) => <article key={task}><i>{column.title === 'DONE' ? <CheckCircle2 size={15} /> : column.title === 'IN PROGRESS' ? <Laptop size={15} /> : <ClipboardCheck size={15} />}</i><strong>{task}</strong><small>{owner}</small><time>{date}</time></article>)}</section>)}</div></div>
  </MarketDashboardFrame></StoryVisualFrame>
}

function ReadyVisual() {
  const rows = [['Equipment', 'MacBook Pro 14″', 'Ready'], ['Account', 'Microsoft 365', 'Ready'], ['Access', 'Marketing standard', 'Ready'], ['Approval', 'Figma license', 'Open']]
  return <StoryVisualFrame tone="green"><MarketDashboardFrame mode="onboarding" active="Readiness" eyebrow="DAY-ONE READINESS" title="Readiness overview" subtitle="Completion, approvals and remaining blockers">
    <div className="onboarding-dashboard-content"><div className="readiness-kpis"><article><span>READINESS</span><strong>89%</strong><small>8 of 9 steps complete</small></article><article><span>START DATE</span><strong>02 Nov</strong><small>5 days remaining</small></article><article className="has-blocker"><span>OPEN BLOCKERS</span><strong>1</strong><small>Manager approval</small></article></div><section className="onboarding-panel readiness-table"><header><div><ShieldCheck size={17} /><span><strong>Day-one checklist</strong><small>Required setup for Sarah Miller</small></span></div><b>Updated now</b></header><div>{rows.map(([category,item,status]) => <article key={category}><i>{category === 'Equipment' ? <Laptop size={15} /> : category === 'Access' ? <KeyRound size={15} /> : <ClipboardCheck size={15} />}</i><span><small>{category}</small><strong>{item}</strong></span><b className={status === 'Open' ? 'is-open' : ''}>{status === 'Ready' && <CheckCircle2 size={13} />}{status}</b></article>)}</div></section></div>
  </MarketDashboardFrame></StoryVisualFrame>
}

function StoryVisual({ type }: { type: typeof stages[number]['visual'] }) {
  if (type === 'profile') return <ProfileVisual />
  if (type === 'tasks') return <TasksVisual />
  return <ReadyVisual />
}

export function AdvertisingFilm() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Pelvin — Employee onboarding workflow'
    return () => { document.title = previousTitle }
  }, [])

  return <main className="advertising-page onboarding-story-page">
    <NavBar />
    <section className="onboarding-story-hero">
      <span><Sparkles size={12} /> ONBOARDING WORKFLOW · PRODUCT CONCEPT</span>
      <h1>From confirmed hire<br />to ready for day one.</h1>
      <p>A concise view of how Pelvin is designed to connect HR, managers and IT in one traceable onboarding process.</p>
      <a href="#story"><span>Explore the workflow</span><ArrowRight size={15} /></a>
    </section>

    <section className="onboarding-story" id="story" aria-label="Pelvin onboarding workflow">
      <div className="story-spine" aria-hidden="true" />
      {stages.map((stage, index) => <article className={`story-stage ${index % 2 ? 'is-reversed' : ''}`} key={stage.number}>
        <div className="story-copy"><span>{stage.eyebrow}</span><h2>{stage.title}</h2><p>{stage.copy}</p></div>
        <figure><StoryVisual type={stage.visual} /></figure>
      </article>)}
    </section>

    <section className="onboarding-story-result">
      <div><PackageCheck size={24} /><span>THE RESULT</span><h2>One process.<br />No hidden handoffs.</h2><p>Every required step, owner and open decision stays in one shared operational view.</p></div>
      <a href="/#/produktgespraech">Discuss the product concept <ArrowRight size={16} /></a>
    </section>
  </main>
}
