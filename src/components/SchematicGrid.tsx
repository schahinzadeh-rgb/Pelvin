import { BadgeCheck, KeyRound, Laptop, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Card = {
  title: string
  copy: string
  icon: LucideIcon
  type: 'search' | 'govern' | 'build' | 'protect'
}

const cards: Card[] = [
  {
    title: 'HR and managers',
    copy: 'Capture employee data, confirm requirements and keep dates and open decisions in view.',
    icon: Users,
    type: 'search',
  },
  {
    title: 'Approvals with context',
    copy: 'Decide on hardware, software and privileged access with rationale, cost and clear ownership.',
    icon: BadgeCheck,
    type: 'govern',
  },
  {
    title: 'Coordinated hardware',
    copy: 'Reserve, prepare and assign devices, then return them through a traceable offboarding process.',
    icon: Laptop,
    type: 'build',
  },
  {
    title: 'Access prepared',
    copy: 'Bundle applications, groups, licenses and roles into traceable requirements with clear ownership.',
    icon: KeyRound,
    type: 'protect',
  },
]

function MiniServer({ x, y, kind = 'db' }: { x: number; y: number; kind?: 'db' | 'bot' }) {
  return (
    <g className="mini-server" transform={`translate(${x} ${y})`}>
      <rect x="-23" y="-22" width="46" height="44" rx="7" fill="#191817" stroke="#3f3f3f" strokeDasharray="4 4" />
      <rect x="-5" y="-5" width="10" height="10" rx="1" fill="#191817" stroke="#6d6d6d" />
      {kind === 'db' ? (
        <g stroke="#6d6d6d" fill="none" strokeWidth="2"><ellipse cx="0" cy="-4" rx="7" ry="3" /><path d="M-7-4v8c0 1.7 3.1 3 7 3s7-1.3 7-3v-8M-7 0c0 1.7 3.1 3 7 3s7-1.3 7-3" /></g>
      ) : (
        <g stroke="#6d6d6d" fill="none" strokeWidth="2"><rect x="-7" y="-6" width="14" height="12" rx="3" /><path d="M0-10v4M-3 0h.1M3 0h.1" /></g>
      )}
    </g>
  )
}

function Diagram({ type, Icon }: { type: Card['type']; Icon: LucideIcon }) {
  if (type === 'build') {
    return (
      <div className="diagram browser-diagram">
        <svg viewBox="0 0 500 250" preserveAspectRatio="none" aria-hidden="true">
          <path className="flow-line" d="M0 38h54v168H0M500 54h-36v138h36" fill="none" stroke="#3f3f3f" strokeDasharray="5 6" />
          <rect x="78" y="28" width="344" height="174" rx="9" fill="none" stroke="#505050" />
          <path d="M78 61h344" stroke="#505050" />
          <circle cx="94" cy="45" r="4" fill="#6d6d6d" /><circle cx="108" cy="45" r="4" fill="#6d6d6d" /><circle cx="122" cy="45" r="4" fill="#6d6d6d" />
          <path className="flow-line accent-flow" d="M250 101v32" stroke="#ffd604" strokeDasharray="4 5" />
        </svg>
        <span className="node-icon compact"><Icon size={28} fill="currentColor" /></span>
      </div>
    )
  }

  return (
    <div className={`diagram ${type}-diagram`}>
      <svg viewBox="0 0 500 250" preserveAspectRatio="none" aria-hidden="true">
        {type === 'search' && (
          <>
            <path className="flow-line accent-flow" d="M250 0v82M250 168v82M0 125h192M308 125h192" stroke="#b79600" strokeDasharray="6 6" />
            <path className="flow-line" d="M70 0v78M70 172v78M430 0v78M430 172v78" stroke="#3f3f3f" strokeDasharray="6 6" />
            <MiniServer x={70} y={125} /><MiniServer x={430} y={125} />
            <MiniServer x={250} y={18} kind="bot" /><MiniServer x={250} y={232} kind="bot" />
          </>
        )}
        {type === 'govern' && (
          <>
            <path className="flow-line accent-flow" d="M0 125h41M87 125h106M307 125h106M459 125h41M250 0v82M250 168v14M250 226v24" stroke="#b79600" strokeDasharray="7 5" />
            <path className="flow-line" d="M64 147v35M64 226v24M436 147v35M436 226v24" stroke="#3f3f3f" strokeDasharray="7 5" />
            <MiniServer x={64} y={125} kind="bot" /><MiniServer x={436} y={125} kind="bot" />
            <MiniServer x={64} y={204} /><MiniServer x={250} y={204} kind="bot" /><MiniServer x={436} y={204} />
          </>
        )}
        {type === 'protect' && (
          <>
            <path className="flow-line accent-flow" d="M0 48h90c0 47 26 76 101 76M0 202h90c0-47 26-76 101-76M309 125h78" fill="none" stroke="#c9a900" strokeDasharray="8 5" />
            <rect x="386" y="57" width="100" height="136" rx="9" fill="none" stroke="#505050" />
            <path d="M386 84h100M404 106h63v52h-63zM404 170h63M404 181h63" fill="none" stroke="#505050" />
            <circle cx="401" cy="70" r="3" fill="#5d5d5d" /><circle cx="412" cy="70" r="3" fill="#5d5d5d" />
          </>
        )}
      </svg>
      <span className="node-icon"><Icon size={31} fill={type === 'govern' || type === 'protect' ? 'currentColor' : 'none'} /></span>
      <i className="port port-left" /><i className="port port-right" /><i className="port port-bottom" />
    </div>
  )
}

export function SchematicGrid() {
  return (
    <section className="schematic-section section-frame" id="collaboration">
      <div className="edge-label edge-label-left">SEC 0.3</div>
      <div className="edge-label edge-label-right">COLLABORATION</div>
      <div className="schematic-intro">
        <span className="section-kicker">COLLABORATION</span>
        <h2>One process.<br />Clear ownership.</h2>
        <p>HR, managers, IT, hardware logistics and application owners work in the same context.</p>
      </div>
      <div className="schematic-cards">
        {cards.map((card, index) => (
          <article className="schematic-card" key={card.title}>
            <Diagram type={card.type} Icon={card.icon} />
            <div className="schematic-copy">
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
            </div>
            <i className="junction junction-tl" />
            {(index === 1 || index === 3) && <i className="junction junction-tr" />}
            {index > 1 && <i className="junction junction-bl" />}
          </article>
        ))}
      </div>
    </section>
  )
}
