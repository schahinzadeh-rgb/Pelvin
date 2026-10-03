import { useEffect } from 'react'
import {
  ArrowRight, CalendarDays, Check, CheckCircle2, ClipboardCheck,
  Laptop, LockKeyhole, PackageCheck, ShieldCheck, Sparkles, Users,
} from 'lucide-react'
import { NavBar } from '../components/NavBar'
import { StoryVisualFrame } from './StoryVisualFrame'
import './advertising.css'

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

function StoryBar({ label }: { label: string }) {
  return <div className="story-ui-bar"><span><i /><i /><i /></span><small>{label}</small></div>
}

function ProfileVisual() {
  return <StoryVisualFrame><div className="story-ui profile-ui">
    <StoryBar label="NEW EMPLOYEE · DRAFT" />
    <div className="profile-ui-body">
      <aside><div className="profile-avatar"><Users size={24} /></div><span>NEW HIRE</span><strong>Sarah Miller</strong><small>Marketing Manager</small></aside>
      <div className="profile-fields">
        <div><span>Start date</span><strong><CalendarDays size={14} /> 02 Nov 2026</strong></div>
        <div><span>Location</span><strong>Vienna</strong></div>
        <div><span>Manager</span><strong>Daniel Weber</strong></div>
        <div><span>Department</span><strong>Marketing</strong></div>
      </div>
    </div>
    <div className="story-ui-note"><CheckCircle2 size={14} /> Core information captured</div>
  </div></StoryVisualFrame>
}

function TasksVisual() {
  const tasks = [
    { icon: Laptop, label: 'Prepare laptop', owner: 'Hardware logistics', state: 'IN PROGRESS' },
    { icon: LockKeyhole, label: 'Create access package', owner: 'IT operations', state: 'OPEN' },
    { icon: ClipboardCheck, label: 'Approve applications', owner: 'Manager', state: 'APPROVED' },
  ]
  return <StoryVisualFrame tone="violet"><div className="story-ui tasks-ui">
    <StoryBar label="ONBOARDING · TASKS" />
    <div className="tasks-summary"><div><span>Sarah Miller</span><strong>6 of 9 steps coordinated</strong></div><b>67%</b></div>
    <div className="task-rows">{tasks.map(({ icon: Icon, label, owner, state }) => <article key={label}><span><Icon size={16} /></span><div><strong>{label}</strong><small>{owner}</small></div><b className={state === 'APPROVED' ? 'is-done' : ''}>{state}</b></article>)}</div>
  </div></StoryVisualFrame>
}

function ReadyVisual() {
  return <StoryVisualFrame tone="green"><div className="story-ui ready-ui">
    <StoryBar label="READINESS · OVERVIEW" />
    <div className="readiness-ring"><div><strong>8/9</strong><span>steps ready</span></div></div>
    <div className="ready-checks"><span><Check size={13} /> Employee profile</span><span><Check size={13} /> Equipment assigned</span><span><Check size={13} /> Standard access</span><span className="is-open">1 manager approval open</span></div>
    <div className="ready-footer"><ShieldCheck size={15} /> Status visible before the start date</div>
  </div></StoryVisualFrame>
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
