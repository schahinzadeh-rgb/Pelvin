import type { ReactNode } from 'react'

export function StoryVisualFrame({ children, tone = 'orange' }: { children: ReactNode; tone?: 'orange' | 'violet' | 'green' }) {
  return <div className={`story-visual-frame tone-${tone}`}>
    <div className="halftone-wave halftone-wave-one" aria-hidden="true" />
    <div className="halftone-wave halftone-wave-two" aria-hidden="true" />
    <div className="halftone-wave halftone-wave-three" aria-hidden="true" />
    {children}
  </div>
}
