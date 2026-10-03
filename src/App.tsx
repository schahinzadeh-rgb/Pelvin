import { useCallback, useEffect, useState, type FormEvent } from 'react'
import {
  ArrowRight, CheckCircle2, ChevronDown, Eye, LockKeyhole,
  RefreshCw, ShieldCheck, Sparkles, Users, Mail, Send, X,
} from 'lucide-react'
import { NavBar } from './components/NavBar'
import { BrandMark } from './components/Brand'
import { SchematicGrid } from './components/SchematicGrid'
import { BUSINESS_EMAIL, CONTACT_EMAIL, FOUNDER_EMAIL } from './contact'

const features = [
  { title: 'Onboarding', copy: 'Employee data, equipment, access, approvals and tasks in one traceable workflow.', icon: Users },
  { title: 'Role changes', copy: 'Review existing permissions and devices, then retain, adjust or remove them deliberately.', icon: RefreshCw },
  { title: 'Offboarding', copy: 'Return access, licenses and hardware in a controlled process with clear ownership.', icon: ShieldCheck },
]

const faqs = [
  ['What is Pelvin?', 'Pelvin is a B2B software product in development that brings employee lifecycle IT processes into one shared workspace.'],
  ['Which processes does Pelvin cover?', 'The product focuses on onboarding, role changes and offboarding — including tasks, approvals, hardware, applications and ownership.'],
  ['What is the current product status?', 'Pelvin is currently in product development. In personal conversations, we present the concept, explain the current stage and gather professional feedback.'],
  ['Which integrations are planned?', 'Microsoft Entra ID, Microsoft 365 and Intune are part of the planned integration strategy. The technical implementation will be evaluated step by step as the product develops.'],
  ['Who is Pelvin for?', 'Pelvin is designed for growing companies and teams across HR, IT support, hardware logistics, application ownership and IT operations.'],
]

function SectionMarker({ number, name }: { number: string; name: string }) {
  return <><span className="edge-label edge-label-left">SEC {number}</span><span className="edge-label edge-label-right">{name}</span></>
}

function Hero() {
  return <section className="hero" id="top"><div className="hero-glow" aria-hidden="true" /><div className="hero-content"><span className="outline-badge"><Sparkles size={13} /> WORKFORCE IT OPERATIONS</span><h1>Every employee IT process. One place.</h1><p>Pelvin connects HR, managers and IT in one clear workflow — from a person’s first day to controlled offboarding.</p><div className="hero-actions" id="demo"><a className="hero-primary" href="#/produktgespraech">Request a product conversation <ArrowRight size={17} /></a><a href="#product">Explore the product</a></div><div className="demo-disclaimer"><i /> B2B SOFTWARE IN DEVELOPMENT · PERSONAL CONVERSATION</div></div><div className="scroll-cue"><span /> EXPLORE THE PRODUCT</div></section>
}

function ProductOverview() {
  return <section className="section-frame at-cost" id="product"><SectionMarker number="0.1" name="LIFECYCLE" /><div className="section-heading align-left"><span className="orange-tag">EMPLOYEE LIFECYCLE</span><h2>Every transition.<br />One clear process.</h2><p>Pelvin reveals what is complete, what is missing, who owns the next step and where a process is blocked — giving HR and IT one shared view.</p><a href="#/produktgespraech">Request a product walkthrough <ArrowRight size={16} /></a></div><div className="feature-strip">{features.map((feature, index) => { const Icon = feature.icon; return <article key={feature.title}><i className="feature-junction feature-junction-tl" /><i className="feature-junction feature-junction-bl" />{index === features.length - 1 && <><i className="feature-junction feature-junction-tr" /><i className="feature-junction feature-junction-br" /></>}<Icon size={22} strokeWidth={1.6} /><h3>{feature.title}</h3><p>{feature.copy}</p></article> })}</div></section>
}

function HiringIntelligenceTeaser() {
  return <section className="section-frame hiring-teaser" id="hiring-intelligence"><div><span className="orange-tag">HIRING INTELLIGENCE · PRODUCT STUDY</span><h2>See how companies are hiring.</h2><p>Explore Austrian job-market activity, company profiles and hiring signals in one focused product study.</p></div><a href="/werbung-jobs/">View the job market demo <ArrowRight size={16} /></a></section>
}

function HowItWorks() {
  const steps = [['01', 'Capture the person and event', 'HR starts an onboarding, role change or offboarding with the relevant employee data.'], ['02', 'Coordinate requirements', 'Managers, IT, hardware logistics and application owners receive clear tasks and approvals.'], ['03', 'Control progress', 'Blockers, overdue steps, open decisions and the overall status remain visible at all times.']]
  return <section className="section-frame how-section" id="functions"><SectionMarker number="0.2" name="WORKFLOW" /><div className="section-heading centered"><span className="orange-tag">HOW PELVIN WORKS</span><h2>From request to<br />controlled completion</h2><p>One shared workspace instead of scattered spreadsheets, messages and unclear ownership.</p></div><div className="step-track"><div className="step-line"><i /><i /><i /></div>{steps.map(([number, title, copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p><a href="#/produktgespraech">Discuss the workflow <ArrowRight size={15} /></a></article>)}</div></section>
}

function SecurityBand() {
  return <section className="security-band" id="security"><div className="security-copy"><span className="orange-tag">PLANNED INTEGRATIONS</span><h2>Designed for secure<br />connections from day one</h2><p>Microsoft Entra ID, Microsoft 365 and Intune are part of the product roadmap. Permission models, auditability and controlled changes are already considered in the concept; no production connections are currently active.</p><a href="#/produktgespraech">Request a technical conversation <ArrowRight size={16} /></a></div><div className="security-orbit" aria-hidden="true"><LockKeyhole size={112} strokeWidth={1.25} /><span className="orbit-note note-one"><CheckCircle2 size={12} /> TRACEABLE PROCESSES</span><span className="orbit-note note-two"><ShieldCheck size={12} /> SECURITY BY DESIGN</span><span className="orbit-note note-three"><Eye size={12} /> STATUS ALWAYS VISIBLE</span></div></section>
}

function FAQ() {
  const [open, setOpen] = useState(0)
  return <section className="section-frame faq-section" id="faq"><SectionMarker number="0.4" name="FAQ" /><div className="faq-heading"><span className="orange-tag">FAQ</span><h2>Common questions<br />about the current stage</h2></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${open === index ? 'open' : ''}`} key={question}><button onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}><span>{String(index + 1).padStart(2, '0')}</span><strong>{question}</strong><ChevronDown size={21} /></button><div className="faq-answer"><p>{answer}</p></div></div>)}</div></section>
}

function CTA() {
  return <section className="cta" id="contact"><div className="cta-content"><span className="outline-badge dark-badge">PERSONAL PRODUCT CONVERSATION</span><h2>Meet<br />Pelvin.</h2><p>Get a transparent view of the product idea and development stage, and discuss which workflows matter most to your team.</p><div className="cta-actions"><a href="#/produktgespraech">Request a conversation <ArrowRight size={17} /></a><a href={`mailto:${BUSINESS_EMAIL}`}>Business inquiry</a></div></div></section>
}

function Footer() {
  return <footer id="about"><div className="footer-top"><div className="footer-brand"><BrandMark /><p>Pelvin is a B2B software initiative for clear employee lifecycle IT operations.</p></div><div className="footer-group footer-email-group"><h3>Email</h3><a className="footer-primary-email" href={`mailto:${FOUNDER_EMAIL}`}>{FOUNDER_EMAIL}</a><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a><a href={`mailto:${BUSINESS_EMAIL}`}>{BUSINESS_EMAIL}</a></div><div className="footer-group"><h3>Legal</h3><a href="#/impressum">Legal notice</a><a href="#/datenschutz">Privacy</a></div></div><div className="footer-bottom"><span>© 2026 Pelvin</span></div></footer>
}

function PublicSite() { return <><NavBar /><main><Hero /><div className="industrial-shell"><ProductOverview /><HiringIntelligenceTeaser /><HowItWorks /><SchematicGrid /><SecurityBand /><FAQ /></div><CTA /></main><Footer /></> }

function LegalPage({ type }: { type: 'impressum' | 'datenschutz' | 'kontakt' }) {
  const content = type === 'impressum' ? { title: 'Legal notice', intro: 'Responsible information for this website and Pelvin’s current project status.', blocks: [['Provider', 'Pelvin\nDigital product initiative by Schahin Samadzadeh'], ['Responsible contact', `Schahin Samadzadeh\nEmail: ${FOUNDER_EMAIL}\nWeb: https://pelvin.net`], ['Project status', 'Pelvin is currently in product development. No existing customers, production integrations or live usage figures are represented. Business details will be updated once the company formation is complete.']] }
    : type === 'datenschutz' ? { title: 'Privacy', intro: 'Information about which data may be processed when you visit this website or contact us.', blocks: [['Website hosting', 'This website is hosted through GitHub Pages. Technically necessary connection data such as IP address, access time and requested resource may be processed when the site is accessed.'], ['Cookies and tracking', 'Pelvin currently uses no first-party analytics, marketing or tracking cookies on this website.'], ['Contact inquiries', 'The inquiry form opens your local email client. Information is only transferred to Pelvin when you send the email and is used exclusively to respond to your request.'], ['Privacy contact', `Questions about privacy: ${CONTACT_EMAIL}`]] }
      : { title: 'Contact', intro: 'The right contact for product questions, business conversations or a direct exchange with the founder.', blocks: [['General inquiries', `${CONTACT_EMAIL}\nFor general questions about the website and Pelvin.`], ['Business & partnerships', `${BUSINESS_EMAIL}\nFor product conversations, potential collaboration and business topics.`], ['Founder contact', `${FOUNDER_EMAIL}\nDirect contact with Schahin Samadzadeh.`], ['Current stage', 'Pelvin is currently in product development. Conversations are intended for professional exchange and a transparent presentation of the current concept.']] }
  return <div className="legal-page"><NavBar /><main><span className="orange-tag">PELVIN</span><h1>{content.title}</h1><p className="legal-intro">{content.intro}</p><div>{content.blocks.map(([heading, copy]) => <section key={heading}><h2>{heading}</h2><p>{copy}</p></section>)}</div>{type === 'kontakt' && <a className="legal-cta" href="#/produktgespraech">Request a product conversation <ArrowRight size={16} /></a>}</main></div>
}

function DemoRequestModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [onClose])

  function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const body = [
      'Hello Schahin,', '', 'I am interested in a Pelvin product conversation.', '',
      `Name: ${data.get('name')}`, `Company: ${data.get('company')}`,
      `Business email: ${data.get('email')}`, `Role: ${data.get('role')}`,
      '', `Message: ${data.get('message') || 'No additional message.'}`,
    ].join('\n')
    window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent('Pelvin product conversation')}&body=${encodeURIComponent(body)}`
  }

  return <div className="demo-modal-backdrop" onMouseDown={(event) => { if (event.currentTarget === event.target) onClose() }}>
    <section className="demo-modal" role="dialog" aria-modal="true" aria-labelledby="demo-modal-title">
      <header className="demo-modal-header"><BrandMark /><button className="demo-modal-close" type="button" onClick={onClose} aria-label="Close product conversation"><X size={18} /></button></header>
      <div className="demo-modal-body">
        <div className="demo-request-copy"><span className="orange-tag">PERSONAL PRODUCT CONVERSATION</span><h1 id="demo-modal-title">Meet Pelvin.</h1><p>We offer a transparent look at the product idea and development stage, then discuss which workflows are most relevant to your team.</p><div className="request-benefits"><span><CheckCircle2 size={16} /> Explore the product concept</span><span><CheckCircle2 size={16} /> Discuss your current processes</span><span><CheckCircle2 size={16} /> Get an honest view of the current stage</span></div><a href={`mailto:${BUSINESS_EMAIL}`}><Mail size={16} /> {BUSINESS_EMAIL}</a></div>
        <form onSubmit={submitRequest}><label>Name<input name="name" autoComplete="name" required /></label><label>Company<input name="company" autoComplete="organization" required /></label><label>Business email<input name="email" type="email" autoComplete="email" required /></label><label>Role<input name="role" placeholder="e.g. IT Operations Lead" required /></label><label className="full-field">What would you like to discuss?<textarea name="message" rows={5} placeholder="Optional: team size, current process or desired integrations" /></label><button type="submit">Prepare inquiry <Send size={16} /></button><small>Submitting opens your email client. No form data is stored on this website.</small></form>
      </div>
    </section>
  </div>
}

function NotFound() { return <div className="not-found"><NavBar /><span>404</span><h1>This page is not available yet.</h1><p>The link does not lead to a published Pelvin page.</p><a href="#top">Back to homepage <ArrowRight size={16} /></a></div> }

export default function App() {
  const [hash, setHash] = useState(window.location.hash)
  useEffect(() => { const update = () => setHash(window.location.hash); window.addEventListener('hashchange', update); return () => window.removeEventListener('hashchange', update) }, [])
  const closeDemo = useCallback(() => {
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
    setHash('')
  }, [])
  const demoOpen = hash === '#/produktgespraech' || hash === '#/demo-anfragen' || hash.startsWith('#/app') || hash === '#/login'
  if (hash === '#/impressum') return <LegalPage type="impressum" />
  if (hash === '#/datenschutz') return <LegalPage type="datenschutz" />
  if (hash === '#/kontakt') return <LegalPage type="kontakt" />
  if (hash.startsWith('#/') && !demoOpen) return <NotFound />
  return <><PublicSite />{demoOpen && <DemoRequestModal onClose={closeDemo} />}</>
}
