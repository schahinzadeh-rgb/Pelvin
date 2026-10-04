import { useEffect, useMemo, useState } from 'react'

type NotchGaugeProps = {
  value: number
  label: string
  displayValue: string
  totalNotches?: number
  size?: number
  accent?: string
}

export function NotchGauge({ value, label, displayValue, totalNotches = 44, size = 250, accent = '#ffd604' }: NotchGaugeProps) {
  const [animatedValue, setAnimatedValue] = useState(0)
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setAnimatedValue(value))
    return () => window.cancelAnimationFrame(frame)
  }, [value])

  const notches = useMemo(() => Array.from({ length: totalNotches }), [totalNotches])
  const active = Math.round((animatedValue / 100) * totalNotches)
  const center = size / 2
  const radius = size * .39

  return <div className="notch-gauge" style={{ width: size, height: size }} role="img" aria-label={`${label}: ${displayValue}`}>
    <svg viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <defs>
        <linearGradient id="gauge-accent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffec72" />
          <stop offset=".65" stopColor={accent} />
          <stop offset="1" stopColor="#a88900" />
        </linearGradient>
      </defs>
      {notches.map((_, index) => {
        const angle = 135 + (270 / (totalNotches - 1)) * index
        const rad = angle * Math.PI / 180
        const inner = radius - 13
        const outer = radius + 1
        return <line
          key={index}
          x1={center + Math.cos(rad) * inner}
          y1={center + Math.sin(rad) * inner}
          x2={center + Math.cos(rad) * outer}
          y2={center + Math.sin(rad) * outer}
          stroke={index < active ? 'url(#gauge-accent)' : '#282828'}
          strokeWidth="5"
          strokeLinecap="round"
          className="gauge-notch"
          style={{ transitionDelay: `${index * 9}ms` }}
        />
      })}
    </svg>
    <div className="gauge-center"><span>{label}</span><strong>{displayValue}</strong><small>{value}% automatisiert</small></div>
  </div>
}

export function LinearNotches({ value, total = 36 }: { value: number; total?: number }) {
  const active = Math.round((value / 100) * total)
  return <div className="linear-notches" aria-label={`${value} Prozent`}>
    {Array.from({ length: total }, (_, index) => <i key={index} className={index < active ? 'active' : ''} style={{ transitionDelay: `${index * 12}ms` }} />)}
  </div>
}
