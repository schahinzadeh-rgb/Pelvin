import type { ReactNode } from 'react'

export function StoryVisualFrame({ children, tone = 'orange' }: { children: ReactNode; tone?: 'orange' | 'violet' | 'green' }) {
  return <div className={`story-visual-frame tone-${tone}`}>
    {children}
  </div>
}
