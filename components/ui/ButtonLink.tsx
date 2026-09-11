import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ButtonLinkProps = {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'text'
  size?: 'md' | 'sm'
  className?: string
  external?: boolean
  /** Hide the trailing arrow. */
  plain?: boolean
}

const base =
  'group/btn inline-flex items-center gap-3 font-body font-medium tracking-[0.02em] transition-colors duration-250 ease-out focus-visible:outline-offset-4'

const variants = {
  primary: 'border border-ink bg-ink text-paper hover:bg-transparent hover:text-ink',
  secondary: 'border border-line text-ink hover:border-ink',
  text: 'text-ink link-draw',
}

const sizes = {
  md: 'px-6 py-3.5 text-[0.875rem]',
  sm: 'px-4 py-2.5 text-[0.8125rem]',
}

export default function ButtonLink({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className,
  external,
  plain,
}: ButtonLinkProps) {
  const Icon = external ? ArrowUpRight : ArrowRight
  const classes = cn(base, variants[variant], variant !== 'text' && sizes[size], variant === 'text' && 'text-[0.875rem]', className)
  const icon = !plain && (
    <Icon
      aria-hidden
      className="h-4 w-4 shrink-0 transition-transform duration-250 ease-out group-hover/btn:translate-x-0.5"
      strokeWidth={1.75}
    />
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        {icon}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {children}
      {icon}
    </Link>
  )
}
