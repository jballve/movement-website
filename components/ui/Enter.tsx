import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type EnterProps = {
  as?: 'div' | 'p' | 'figure' | 'header'
  children: ReactNode
  className?: string
  /** Delay in milliseconds for staggering. */
  delay?: number
}

/**
 * Above-the-fold entrance: a CSS keyframe fade and lift that starts on first
 * paint with no JavaScript dependency (so LCP is not delayed by hydration).
 * Without JavaScript or under reduced motion the content is simply visible.
 */
export default function Enter({ as: Tag = 'div', children, className, delay = 0 }: EnterProps) {
  const style: CSSProperties | undefined = delay ? { animationDelay: `${delay}ms` } : undefined
  return (
    <Tag className={cn('enter', className)} style={style}>
      {children}
    </Tag>
  )
}
