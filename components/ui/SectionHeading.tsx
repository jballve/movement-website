import { cn } from '@/lib/utils'
import Reveal from '@/components/ui/Reveal'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  lead?: string
  id?: string
  className?: string
}

/** Eyebrow + headline on the left, optional lead aligned to the baseline on the right. */
export default function SectionHeading({ eyebrow, title, lead, id, className }: SectionHeadingProps) {
  return (
    <div className={cn('grid gap-6 lg:grid-cols-12 lg:gap-16', className)}>
      <Reveal className="lg:col-span-6">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={id} className="mt-5 text-h2 font-normal text-ink">
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={100} className="lg:col-span-5 lg:col-start-8 lg:self-end">
          <p className="text-lead text-ink-muted">{lead}</p>
        </Reveal>
      )}
    </div>
  )
}
