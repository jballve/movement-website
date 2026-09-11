'use client'

import { useCallback, type CSSProperties, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type RevealProps = {
  as?: 'div' | 'section' | 'li' | 'p' | 'span' | 'figure' | 'header'
  children: ReactNode
  className?: string
  /** Delay in milliseconds, used to stagger siblings. */
  delay?: number
  id?: string
}

/**
 * Fades and lifts content into view once. Content is rendered fully visible
 * in the initial HTML; the `.js` class on <html> (set before paint) opts into
 * the transition, and `prefers-reduced-motion` disables it entirely.
 */
export default function Reveal({ as = 'div', children, className, delay = 0, id }: RevealProps) {
  // Callback ref: observe on mount, disconnect on unmount (React 19 ref cleanup).
  const observe = useCallback((el: HTMLElement | null) => {
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            io.disconnect()
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const style: CSSProperties | undefined = delay ? { transitionDelay: `${delay}ms` } : undefined
  const Tag = as as 'div'

  return (
    <Tag ref={observe} id={id} className={cn('reveal', className)} style={style}>
      {children}
    </Tag>
  )
}
