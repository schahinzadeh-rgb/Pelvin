import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight, ChevronsUpDown, ClipboardCheck, Laptop, LockKeyhole,
  Menu, Radar, RefreshCw, ShieldCheck, Users, Workflow, X,
} from 'lucide-react'
import { BrandMark } from './Brand'

const menus = [
  {
    key: 'product',
    label: 'Product',
    columns: [
      [
        { label: 'Onboarding', copy: 'Prepare new employees for productive work through one structured process.', href: '#/onboarding', icon: Users },
        { label: 'Role changes', copy: 'Adjust access, devices and responsibilities with intent.', href: '#/role-changes', icon: RefreshCw },
        { label: 'Offboarding', copy: 'Return permissions and hardware in a controlled workflow.', href: '#/offboarding', icon: ShieldCheck },
      ],
      [
        { label: 'Tasks & approvals', copy: 'Clear steps, owners and decisions in one workflow.', href: '#functions', icon: ClipboardCheck },
        { label: 'Hardware & access', copy: 'Plan equipment, applications and licenses together.', href: '#collaboration', icon: Laptop },
        { label: 'Hiring intelligence', copy: 'Explore Austrian job-market activity and company hiring signals.', href: '#hiring-intelligence', icon: Radar },
      ],
      [
        { label: 'Integrations', copy: 'Prepared for Microsoft Entra ID, 365 and Intune.', href: '#security', icon: Workflow },
        { label: 'Security by Design', copy: 'Traceable processes and controlled changes.', href: '#security', icon: LockKeyhole },
      ],
    ],
  },
  {
    key: 'demo',
    label: 'Demo',
    columns: [
      [
        { label: 'HR Onboarding Demo', copy: 'Connect Microsoft Entra and prepare a new employee for onboarding.', href: '/werbung/', icon: Users },
      ],
      [
        { label: 'Job Market Intelligence', copy: 'Explore jobs, companies, archives, AI signals and salary data.', href: '/werbung-jobs/', icon: Radar },
      ],
    ],
  },
] as const

type MenuKey = typeof menus[number]['key']

export function NavBar() {
  const isHomepage = window.location.pathname === '/' || window.location.pathname === '/index.html'
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null)
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false })
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }
  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => {
      setActiveMenu(null)
      setIndicator(value => ({ ...value, visible: false }))
    }, 130)
  }
  const closeAll = () => {
    setActiveMenu(null)
    setIndicator(value => ({ ...value, visible: false }))
    setMobileOpen(false)
  }
  const moveIndicator = (target: HTMLElement) => {
    cancelClose()
    setIndicator({ left: target.offsetLeft, width: target.offsetWidth, visible: true })
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && closeAll()
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      cancelClose()
    }
  }, [])

  const resolveHref = (href: string) => !isHomepage && href.startsWith('#') ? `/${href}` : href
  const mobileLinks = [['Product', '#product'], ['Solutions', '#collaboration'], ['Contact', '#/kontakt'], ['HR Onboarding Demo', '/werbung/'], ['Job Market Intelligence', '/werbung-jobs/']]

  return <header className="site-header" onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
    <div className="nav-shell">
      <a href={isHomepage ? '#top' : '/'} className="logo-link" aria-label="Pelvin homepage" onClick={closeAll}><BrandMark /></a>
      <nav className="desktop-nav" aria-label="Main navigation">
        <span
          className={`nav-hover-shape ${indicator.visible ? 'is-visible' : ''}`}
          style={{ width: indicator.width, transform: `translateX(${indicator.left}px)` }}
          aria-hidden="true"
        />
        {menus.map(menu => <button
          type="button"
          className={`nav-trigger ${activeMenu === menu.key ? 'is-active' : ''}`}
          aria-expanded={activeMenu === menu.key}
          aria-controls="pelvin-mega-menu"
          onMouseEnter={event => { moveIndicator(event.currentTarget); setActiveMenu(menu.key) }}
          onFocus={event => { moveIndicator(event.currentTarget); setActiveMenu(menu.key) }}
          onClick={() => setActiveMenu(activeMenu === menu.key ? null : menu.key)}
          key={menu.key}
        >{menu.label}<ChevronsUpDown size={11} strokeWidth={1.7} /></button>)}
        <a href={resolveHref('#collaboration')} className="nav-trigger nav-link" onMouseEnter={event => { moveIndicator(event.currentTarget); setActiveMenu(null) }} onFocus={event => moveIndicator(event.currentTarget)}>Solutions</a>
        <a href={resolveHref('#/kontakt')} className="nav-trigger nav-link" onMouseEnter={event => { moveIndicator(event.currentTarget); setActiveMenu(null) }} onFocus={event => moveIndicator(event.currentTarget)}>Contact</a>
      </nav>
      <div className="nav-actions">
        <a href={resolveHref('#/produktgespraech')} className="nav-pill contact-action" onClick={closeAll}>Product conversation <ArrowRight size={14} /></a>
      </div>
      <button className="mobile-menu-button" onClick={() => setMobileOpen(value => !value)} aria-label="Toggle menu">{mobileOpen ? <X /> : <Menu />}</button>
    </div>

    <div id="pelvin-mega-menu" className={`mega-menu ${activeMenu ? 'is-open' : ''}`} aria-hidden={!activeMenu}>
      <div className={`mega-inner ${activeMenu ? `menu-${activeMenu}` : ''}`}>
        {menus.map(menu => <section className={`mega-panel ${activeMenu === menu.key ? 'is-current' : ''}`} key={menu.key}>
          <div className={`mega-catalog ${menu.key === 'demo' ? 'demo-catalog' : ''}`}>
            {menu.columns.map((column, columnIndex) => <div className="mega-column" key={columnIndex}>
              {column.map(item => {
                const Icon = item.icon
                return <a className="mega-catalog-item" href={resolveHref(item.href)} onClick={closeAll} key={item.label}>
                  <Icon size={15} strokeWidth={1.7} />
                  <span><strong>{item.label}</strong><small>{item.copy}</small></span>
                </a>
              })}
            </div>)}
          </div>
          <footer className="mega-footer">
            <a className="mega-footer-primary" href={menu.key === 'demo' ? '/werbung/' : resolveHref('#/produktgespraech')} onClick={closeAll}>{menu.key === 'demo' ? 'Watch HR demo' : 'Product conversation'} <ArrowRight size={13} /></a>
            <div><a href={resolveHref('#product')} onClick={closeAll}>Product</a><a href={resolveHref('#security')} onClick={closeAll}>Security</a><a href={resolveHref('#/kontakt')} onClick={closeAll}>Contact</a></div>
          </footer>
        </section>)}
      </div>
    </div>

    <nav className={`mobile-drawer ${mobileOpen ? 'is-open' : ''}`}>
      {mobileLinks.map(([label, href]) => <a href={resolveHref(href)} key={label} onClick={closeAll}>{label}</a>)}
      <a className="mobile-primary" href={resolveHref('#/produktgespraech')} onClick={closeAll}>Product conversation <ArrowRight size={18} /></a>
    </nav>
  </header>
}
