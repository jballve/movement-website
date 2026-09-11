'use client'

import { useMediaQuery, useNowSeconds } from '@/lib/hooks'
import { cn } from '@/lib/utils'

type Parts = { h: number; m: number; s: number; label: string }

function readClock(timeZone: string, seconds: number): Parts {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(new Date(seconds * 1000))
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0)
  const h = get('hour') % 24
  const m = get('minute')
  const s = get('second')
  return { h, m, s, label: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}` }
}

/**
 * A hairline analog dial with the live local time for one time zone.
 * Renders a neutral placeholder on the server, then ticks on the client.
 * Under reduced motion the second hand is hidden and the clock updates each minute.
 */
export function Dial({
  timeZone,
  city,
  className,
  size = 'md',
}: {
  timeZone: string
  city: string
  className?: string
  size?: 'md' | 'sm'
}) {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  const seconds = useNowSeconds(reduced)
  const now = seconds === null ? null : readClock(timeZone, seconds)

  const hourDeg = now ? (now.h % 12) * 30 + now.m * 0.5 : 0
  const minuteDeg = now ? now.m * 6 + now.s * 0.1 : 0
  const secondDeg = now ? now.s * 6 : 0
  const px = size === 'sm' ? 32 : 44

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <svg
        width={px}
        height={px}
        viewBox="0 0 44 44"
        aria-hidden
        className={cn('shrink-0 text-ink transition-opacity duration-600', now ? 'opacity-100' : 'opacity-0')}
      >
        <circle cx="22" cy="22" r="21" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
        {[0, 90, 180, 270].map((deg) => (
          <line
            key={deg}
            x1="22"
            y1="2.5"
            x2="22"
            y2="5"
            stroke="currentColor"
            strokeWidth="0.75"
            opacity="0.6"
            transform={`rotate(${deg} 22 22)`}
          />
        ))}
        <line
          x1="22"
          y1="22"
          x2="22"
          y2="12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          transform={`rotate(${hourDeg} 22 22)`}
        />
        <line
          x1="22"
          y1="22"
          x2="22"
          y2="7"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          transform={`rotate(${minuteDeg} 22 22)`}
        />
        {!reduced && (
          <line
            x1="22"
            y1="24"
            x2="22"
            y2="6"
            stroke="rgb(var(--c-accent))"
            strokeWidth="0.75"
            strokeLinecap="round"
            transform={`rotate(${secondDeg} 22 22)`}
          />
        )}
        <circle cx="22" cy="22" r="1.25" fill="currentColor" />
      </svg>
      <div className="leading-tight">
        <p className="eyebrow">{city}</p>
        <p className={cn('mt-1 font-heading tabular-nums text-ink', size === 'sm' ? 'text-base' : 'text-lg')}>
          <time dateTime={now ? `${String(now.h).padStart(2, '0')}:${String(now.m).padStart(2, '0')}` : undefined}>
            {now ? now.label : '—:—'}
          </time>
        </p>
      </div>
    </div>
  )
}

/** Inline text-only local time, e.g. "16:41 local time". */
export function LocalTimeText({ timeZone, className }: { timeZone: string; className?: string }) {
  const seconds = useNowSeconds(true)
  const label = seconds === null ? null : readClock(timeZone, seconds).label
  return <span className={cn('tabular-nums', className)}>{label ? `${label} local time` : ''}</span>
}
