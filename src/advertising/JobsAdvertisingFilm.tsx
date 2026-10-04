import { useEffect } from 'react'
import { ArrowRight, Radar, Sparkles } from 'lucide-react'
import { BrandMark } from '../components/Brand'
import { NavBar } from '../components/NavBar'
import './advertising.css'

const chapters = [
  {
    eyebrow: 'JOB MARKET',
    title: 'See where hiring demand is concentrated.',
    copy: 'A regional map combines live job volumes for Germany and Austria with weekly growth, top regions, hiring trends and the skills appearing most often in current postings.',
    image: '/assets/product-ui/job-market.png',
    alt: 'Pelvin job market dashboard with Germany and Austria map, regional job volumes and skill demand',
  },
  {
    eyebrow: 'COMPANY RESEARCH',
    title: 'Move from the market into company detail.',
    copy: 'Searchable company profiles bring open roles, hiring status, growth signals, locations and recent activity together, so a market change can be reviewed in company context.',
    image: '/assets/product-ui/companies.png',
    alt: 'Pelvin companies screen with tracked companies and a detailed Siemens company profile',
  },
  {
    eyebrow: 'MARKET ANALYTICS',
    title: 'Compare trends instead of isolated numbers.',
    copy: 'Analytics connects total postings, active hiring companies, new roles, category demand and market growth across Germany and Austria in one consistent research view.',
    image: '/assets/product-ui/analytics.png',
    alt: 'Pelvin analytics dashboard with job-market growth, categories and company performance',
  },
  {
    eyebrow: 'ACTIONABLE ALERTS',
    title: 'Review important changes with their context.',
    copy: 'Hiring spikes, removed roles, company growth and other tracked changes appear in a focused alert feed with priority, supporting metrics and the relevant job postings.',
    image: '/assets/product-ui/alerts.png',
    alt: 'Pelvin alerts screen showing hiring activity changes and detailed supporting information',
  },
] as const

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
      <span><Sparkles size={12} /> GERMANY + AUSTRIA · PRODUCT INTERFACE</span>
      <h1>Understand how hiring<br />activity is changing.</h1>
      <p>Explore current job activity, company profiles, market analytics and prioritized alerts in one focused research workspace.</p>
      <a href="#market-story">Explore the interface <ArrowRight size={15} /></a>
    </section>

    <section className="market-story product-screenshot-story" id="market-story" aria-label="Pelvin Hiring Intelligence interface">
      {chapters.map((chapter) => <article className="market-chapter" key={chapter.eyebrow}>
        <div className="market-chapter-copy"><span>{chapter.eyebrow}</span><h2>{chapter.title}</h2><p>{chapter.copy}</p></div>
        <figure className="product-shot"><img src={chapter.image} alt={chapter.alt} loading="lazy" /></figure>
      </article>)}
    </section>

    <section className="market-story-result"><div><Radar size={25} /><span>ONE RESEARCH WORKSPACE</span><h2>Market activity.<br />Company context.</h2><p>Pelvin connects regional demand, company-level changes, analytics and alerts in one clear interface.</p></div><a href="/#/produktgespraech">Discuss the product <ArrowRight size={16} /></a></section>
  </main>
}
