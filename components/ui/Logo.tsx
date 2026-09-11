import Image from 'next/image'
import { cn } from '@/lib/utils'

type LogoProps = {
  /** lockup = mark + wordmark (header); mark = monogram only; stacked = mark + wordmark + tagline */
  variant?: 'lockup' | 'mark' | 'stacked'
  /** dark = dark artwork for light surfaces (default); light = light artwork for the charcoal footer and similar. */
  tone?: 'dark' | 'light'
  className?: string
  priority?: boolean
}

const art = {
  mark: { dark: '/assets/brand/mark-dark.png', light: '/assets/brand/mark-light.png', w: 213, h: 213 },
  wordmark: { dark: '/assets/brand/wordmark-dark.png', light: '/assets/brand/wordmark-light.png', w: 554, h: 66 },
  stacked: {
    dark: '/assets/brand/lockup-stacked-dark.png',
    light: '/assets/brand/lockup-stacked-light.png',
    w: 558,
    h: 403,
  },
}

export default function Logo({ variant = 'lockup', tone = 'dark', className, priority }: LogoProps) {
  if (variant === 'mark') {
    return (
      <span className={cn('inline-block', className)}>
        <Image src={art.mark[tone]} alt="Movement" width={art.mark.w} height={art.mark.h} className="h-full w-auto" priority={priority} sizes="64px" />
      </span>
    )
  }

  if (variant === 'stacked') {
    return (
      <span className={cn('inline-block', className)}>
        <Image
          src={art.stacked[tone]}
          alt="Movement — Investing Through Time"
          width={art.stacked.w}
          height={art.stacked.h}
          className="h-auto w-full"
          priority={priority}
          sizes="240px"
        />
      </span>
    )
  }

  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <Image src={art.mark[tone]} alt="" width={art.mark.w} height={art.mark.h} className="h-[2.125rem] w-auto" priority={priority} sizes="34px" />
      <Image
        src={art.wordmark[tone]}
        alt="Movement"
        width={art.wordmark.w}
        height={art.wordmark.h}
        className="h-[0.8125rem] w-auto"
        priority={priority}
        sizes="110px"
      />
    </span>
  )
}
