import { useMemo, useState, type CSSProperties, type ReactNode } from 'react'
import { Bar } from '@visx/shape'
import { scaleBand, scaleLinear } from '@visx/scale'
import { geoMercator, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import type { FeatureCollection, Geometry } from 'geojson'
import type { GeometryCollection, Topology } from 'topojson-specification'
import world from 'world-atlas/countries-110m.json'
import {
  Archive, BarChart3, Bell, Bot, BriefcaseBusiness, Building2, CalendarDays,
  ChevronDown, CircleHelp, Globe2, LayoutDashboard, Search, Settings2,
  Sparkles, TrendingUp,
} from 'lucide-react'
import { BrandMark } from '../components/Brand'

const hiringData = [
  { month: 'Jan', it: 420, hr: 260 },
  { month: 'Feb', it: 500, hr: 305 },
  { month: 'Mar', it: 575, hr: 330 },
  { month: 'Apr', it: 640, hr: 385 },
  { month: 'May', it: 715, hr: 420 },
  { month: 'Jun', it: 782, hr: 468 },
]

const europeanCountries = new Set([
  'Austria', 'Belgium', 'Croatia', 'Czechia', 'Denmark', 'France', 'Germany',
  'Hungary', 'Ireland', 'Italy', 'Luxembourg', 'Netherlands', 'Poland',
  'Portugal', 'Slovakia', 'Slovenia', 'Spain', 'Switzerland', 'United Kingdom',
])

const supportedCountries = new Set(['Austria', 'Germany'])

type CountryProperties = { name?: string }

function HiringBarChart() {
  const [active, setActive] = useState<{ month: string; label: string; value: number } | null>(null)
  const width = 520
  const height = 238
  const chartTop = 18
  const chartBottom = 32
  const x = scaleBand<string>({ domain: hiringData.map(item => item.month), range: [0, width], padding: .28 })
  const inner = scaleBand<string>({ domain: ['it', 'hr'], range: [0, x.bandwidth()], padding: .12 })
  const y = scaleLinear<number>({ domain: [0, 900], range: [height - chartBottom, chartTop] })

  return <section className="market-data-card hiring-chart-card">
    <header><div><span>HIRING ACTIVITY</span><h4>New roles detected</h4></div><div className="chart-legend"><span><i className="is-it" />IT</span><span><i className="is-hr" />HR</span></div></header>
    <div className="chart-tooltip" aria-live="polite">{active ? <><strong>{active.value}</strong><span>{active.label} roles · {active.month}</span></> : <><strong>+31%</strong><span>combined activity · 6 months</span></>}</div>
    <svg className="hiring-bar-chart" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Demo hiring activity by month for IT and HR roles">
      {[0, 300, 600, 900].map(value => <g key={value}><line x1="0" x2={width} y1={y(value)} y2={y(value)} /><text x="0" y={y(value) - 6}>{value}</text></g>)}
      {hiringData.map((datum, index) => <g key={datum.month}>
        {(['it', 'hr'] as const).map(series => {
          const value = datum[series]
          const barHeight = height - chartBottom - y(value)
          const barX = (x(datum.month) ?? 0) + (inner(series) ?? 0)
          return <Bar
            className={`market-bar is-${series}`}
            x={barX}
            y={y(value)}
            width={inner.bandwidth()}
            height={barHeight}
            rx={6}
            style={{ '--bar-delay': `${index * 55 + (series === 'hr' ? 30 : 0)}ms` } as CSSProperties}
            onMouseEnter={() => setActive({ month: datum.month, label: series === 'it' ? 'IT' : 'HR', value })}
            onMouseLeave={() => setActive(null)}
            key={series}
          />
        })}
        <text className="market-axis-label" x={(x(datum.month) ?? 0) + x.bandwidth() / 2} y={height - 8} textAnchor="middle">{datum.month}</text>
      </g>)}
    </svg>
  </section>
}

function EuropeSupportMap() {
  const [hovered, setHovered] = useState('Germany')
  const countries = useMemo(() => {
    const atlas = world as unknown as Topology<{ countries: GeometryCollection<CountryProperties> }>
    const collection = feature(atlas, atlas.objects.countries) as FeatureCollection<Geometry, CountryProperties>
    return collection.features.filter(country => europeanCountries.has(country.properties?.name ?? ''))
  }, [])
  const path = useMemo(() => {
    const projection = geoMercator().center([9, 50]).scale(580).translate([255, 178])
    return geoPath(projection)
  }, [])
  const supported = supportedCountries.has(hovered)

  return <section className="market-data-card support-map-card">
    <header><div><span>REGION COVERAGE</span><h4>Europe rollout</h4></div><Globe2 size={18} /></header>
    <div className="map-status"><i className={supported ? 'is-supported' : ''} /><div><strong>{hovered}</strong><span>{supported ? 'Supported · demo coverage' : 'Coming soon'}</span></div></div>
    <svg className="support-map" viewBox="0 0 510 350" role="img" aria-label="Europe map showing Germany and Austria as supported demo markets">
      <defs><linearGradient id="supported-country" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ff7a35"/><stop offset="1" stopColor="#ffb07a"/></linearGradient></defs>
      {countries.map((country, index) => {
        const name = country.properties?.name ?? `Country ${index + 1}`
        const isSupported = supportedCountries.has(name)
        return <path
          className={`country-shape ${isSupported ? 'is-supported' : ''} ${hovered === name ? 'is-hovered' : ''}`}
          d={path(country) ?? undefined}
          tabIndex={0}
          aria-label={`${name}: ${isSupported ? 'supported' : 'coming soon'}`}
          onMouseEnter={() => setHovered(name)}
          onFocus={() => setHovered(name)}
          key={name}
        />
      })}
    </svg>
    <footer><span><i className="supported-dot" />Supported</span><span><i />Coming soon</span></footer>
  </section>
}

function AiMarketInsight() {
  return <aside className="market-data-card ai-market-card">
    <header><div><span><Sparkles size={13} /> AI DEMO ANALYSIS</span><h4>What changed?</h4></div><span className="confidence-pill">82% signal</span></header>
    <div className="ai-company-row"><div className="google-mark">G</div><div><strong>Google</strong><span>Germany · Austria</span></div><b><TrendingUp size={13} /> +34%</b></div>
    <p>Demo data indicates renewed hiring activity across IT infrastructure and HR roles.</p>
    <div className="ai-reasons"><span>Possible context</span><ul><li>Cloud and security roles reopened</li><li>Recruiting positions appeared after a quiet period</li><li>Activity is consistent across two supported markets</li></ul></div>
    <footer><Bot size={14} /><span>Illustrative signal based on sample postings — not a confirmed company event.</span></footer>
  </aside>
}

const navItems = [
  { icon: LayoutDashboard, label: 'Overview' },
  { icon: BarChart3, label: 'Market pulse' },
  { icon: Building2, label: 'Companies' },
  { icon: BriefcaseBusiness, label: 'Roles' },
  { icon: Sparkles, label: 'AI signals' },
  { icon: Archive, label: 'Archive' },
]

function DashboardSidebar({ active }: { active: string }) {
  return <>
    <aside className="market-dashboard-sidebar">
      <div className="dashboard-brand"><BrandMark /><button type="button" aria-label="Switch workspace"><ChevronDown size={14} /></button></div>
      <label className="dashboard-search"><Search size={15} /><span>Search market</span><kbd>/</kbd></label>
      <small>WORKSPACE</small>
      <nav>{navItems.map(({ icon: Icon, label }) => <button className={active === label ? 'is-active' : ''} type="button" key={label}><Icon size={16} /><span>{label}</span>{active === label && <i />}</button>)}</nav>
      <small>MARKETS</small>
      <div className="market-switcher"><Globe2 size={16} /><div><strong>DACH</strong><span>Germany + Austria</span></div><ChevronDown size={13} /></div>
      <div className="sidebar-support"><CircleHelp size={15} /><div><strong>Need context?</strong><span>View methodology</span></div></div>
      <button className="sidebar-settings" type="button"><Settings2 size={16} /> Settings</button>
    </aside>
  </>
}

type MarketDashboardFrameProps = {
  active: string
  eyebrow: string
  title: string
  subtitle: string
  children: ReactNode
}

export function MarketDashboardFrame({ active, eyebrow, title, subtitle, children }: MarketDashboardFrameProps) {
  return <div className={`market-dashboard-shell ${active === 'Market pulse' ? '' : 'is-workspace-view'}`}>
    <DashboardSidebar active={active} />
    <div className="market-dashboard-main">
      <header className="market-dashboard-topbar"><div><span>{eyebrow}</span><h3>{title}</h3><p>{subtitle}</p></div><div className="dashboard-actions"><button type="button"><CalendarDays size={14} /> Jan–Jun 2026</button><button type="button" aria-label="Notifications"><Bell size={15} /></button><div className="dashboard-avatar">PS</div></div></header>
      {children}
    </div>
  </div>
}

export function MarketDashboard() {
  return <MarketDashboardFrame active="Market pulse" eyebrow="JOB MARKET INTELLIGENCE" title="Market pulse" subtitle="Hiring activity across supported regions">
      <div className="dashboard-kpis">
        <article className="is-primary"><span>Tracked roles</span><strong>48,219</strong><small><TrendingUp size={12} /> 8.4% this month</small></article>
        <article><span>Companies</span><strong>2,130</strong><small>Across 2 markets</small></article>
        <article><span>New this week</span><strong>1,284</strong><small>Recently detected</small></article>
        <article><span>AI signals</span><strong>146</strong><small>31 high confidence</small></article>
      </div>
      <div className="market-dashboard-grid"><HiringBarChart /><EuropeSupportMap /><AiMarketInsight /></div>
  </MarketDashboardFrame>
}
