import type { BioSection } from '@/data/content'
import { cn } from '@/lib/utils'

export default function BioSections({ sections, className }: { sections: BioSection[]; className?: string }) {
  return (
    <div className={cn('space-y-9', className)}>
      {sections.map((section) => (
        <section key={section.heading}>
          <h3 className="eyebrow">{section.heading}</h3>
          <ul className="mt-4 space-y-3">
            {section.items.map((item) => (
              <li key={item} className="text-[0.9375rem] leading-relaxed text-ink-muted md:text-base">
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
