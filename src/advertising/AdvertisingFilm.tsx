import { useEffect } from 'react'
import { ArrowRight, PackageCheck, Sparkles } from 'lucide-react'
import { NavBar } from '../components/NavBar'
import './advertising.css'

const stages = [
  {
    eyebrow: 'ONBOARDING CONTROL',
    title: 'Track every onboarding in one view.',
    copy: 'New hires, current progress, completed steps and upcoming sessions are visible together. The checklist shows which actions are already complete and where work is still open.',
    image: '/assets/product-ui/onboarding.png',
    alt: 'Pelvin onboarding dashboard with progress, checklist, recent new hires and upcoming sessions',
  },
  {
    eyebrow: 'SHARED OVERVIEW',
    title: 'Keep the wider workforce context visible.',
    copy: 'The overview brings job-market activity, tracked companies, alerts and recent updates into the same workspace instead of separating operational work from market context.',
    image: '/assets/product-ui/overview.png',
    alt: 'Pelvin overview dashboard with market metrics, trends, activity and hiring companies',
  },
  {
    eyebrow: 'DOCUMENT WORKSPACE',
    title: 'Keep process material organized.',
    copy: 'Onboarding guides, market reports, company snapshots, job lists and analyst notes live in one searchable document area with clear categories, owners and status.',
    image: '/assets/product-ui/documents.png',
    alt: 'Pelvin documents workspace with categorized files and a document preview',
  },
  {
    eyebrow: 'WORKSPACE SETUP',
    title: 'Configure the workspace around the team.',
    copy: 'Profile, workspace, notification and integration settings provide one place to manage the account, organization defaults and how the team receives updates.',
    image: '/assets/product-ui/settings.png',
    alt: 'Pelvin settings screen with profile and workspace preferences',
  },
] as const

export function AdvertisingFilm() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Pelvin — Employee onboarding workflow'
    return () => { document.title = previousTitle }
  }, [])

  return <main className="advertising-page onboarding-story-page">
    <NavBar />
    <section className="onboarding-story-hero">
      <span><Sparkles size={12} /> EMPLOYEE OPERATIONS · PRODUCT INTERFACE</span>
      <h1>Onboarding inside one<br />operational workspace.</h1>
      <p>Pelvin brings onboarding progress, tasks, sessions, documents and workspace settings into one consistent interface for HR and the teams involved.</p>
      <a href="#story"><span>Explore the interface</span><ArrowRight size={15} /></a>
    </section>

    <section className="onboarding-story product-screenshot-story" id="story" aria-label="Pelvin employee operations interface">
      {stages.map((stage) => <article className="story-stage" key={stage.eyebrow}>
        <div className="story-copy"><span>{stage.eyebrow}</span><h2>{stage.title}</h2><p>{stage.copy}</p></div>
        <figure className="product-shot"><img src={stage.image} alt={stage.alt} loading="lazy" /></figure>
      </article>)}
    </section>

    <section className="onboarding-story-result">
      <div><PackageCheck size={24} /><span>ONE SHARED WORKSPACE</span><h2>Clear progress.<br />Less fragmented work.</h2><p>The interface keeps onboarding status, supporting material and the wider workforce context accessible in one product.</p></div>
      <a href="/#/produktgespraech">Discuss the product <ArrowRight size={16} /></a>
    </section>
  </main>
}
