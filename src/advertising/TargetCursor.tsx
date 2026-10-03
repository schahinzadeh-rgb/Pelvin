import { motion } from 'framer-motion'
import { useLayoutEffect, useState, type RefObject } from 'react'

type Point = { startX: number; startY: number; targetX: number; targetY: number }

type TargetCursorProps = {
  containerRef: RefObject<HTMLElement | null>
  targetRef: RefObject<HTMLElement | null>
  start: [number, number]
  delay?: number
  duration?: number
  settleDelay?: number
  className: string
  pulse?: boolean
}

export function TargetCursor({ containerRef, targetRef, start, delay = 0, duration = 2.4, settleDelay = 0, className, pulse = true }: TargetCursorProps) {
  const [point, setPoint] = useState<Point | null>(null)

  useLayoutEffect(() => {
    const measure = () => {
      const container = containerRef.current
      const target = targetRef.current
      if (!container || !target) return
      const containerRect = container.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()
      setPoint({
        startX: containerRect.width * start[0] / 100,
        startY: containerRect.height * start[1] / 100,
        targetX: targetRect.left - containerRect.left + targetRect.width / 2,
        targetY: targetRect.top - containerRect.top + targetRect.height / 2,
      })
    }

    const timer = window.setTimeout(measure, settleDelay * 1000)
    window.addEventListener('resize', measure)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('resize', measure)
    }
  }, [containerRef, settleDelay, start[0], start[1], targetRef])

  if (!point) return null
  const midX = point.startX + (point.targetX - point.startX) * .58
  const midY = point.startY + (point.targetY - point.startY) * .42

  return <>
    <motion.div
      className={className}
      style={{ left: 0, top: 0 }}
      initial={{ x: point.startX, y: point.startY, opacity: 0 }}
      animate={{
        x: [point.startX, point.startX, midX, point.targetX - 2],
        y: [point.startY, point.startY, midY, point.targetY - 2],
        opacity: [0, 1, 1, 1],
        scale: [1, 1, .8, 1],
      }}
      transition={{ duration, delay, times: [0, .18, .84, 1], ease: [.22, 1, .36, 1] }}
    ><svg viewBox="0 0 24 28" aria-hidden="true"><path d="M2 1.8v20.4l5.1-4.7 3.9 8.2 3.6-1.8-3.8-7.8h7.2L2 1.8Z" /></svg></motion.div>
    {pulse && <motion.span
      className="target-cursor-pulse"
      style={{ left: point.targetX, top: point.targetY, x: '-50%', y: '-50%' }}
      initial={{ opacity: 0, scale: .2 }}
      animate={{ opacity: [0, .72, 0], scale: [.2, 1.65, 2.25] }}
      transition={{ delay: delay + duration * .84, duration: .62, ease: 'easeOut' }}
    />}
  </>
}
