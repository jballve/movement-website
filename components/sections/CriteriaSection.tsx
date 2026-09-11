import Reveal from '@/components/ui/Reveal'
import { criteria } from '@/data/content'

export default function CriteriaSection() {
  return (
    <section id="criteria" aria-labelledby="criteria-heading" className="container-x pb-section-y pt-10 lg:pt-14">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-3">
          <h2 id="criteria-heading" className="eyebrow">
            {criteria.eyebrow}
          </h2>
          <p className="mt-3 text-[0.9375rem] text-ink-muted">{criteria.note}</p>
        </Reveal>

        <dl className="grid grid-cols-2 gap-x-8 gap-y-10 lg:col-span-9 lg:grid-cols-5 lg:gap-x-10">
          {criteria.items.map((item, index) => (
            <Reveal key={item.label} delay={index * 60} className="border-t border-line pt-4">
              <dt className="eyebrow">{item.label}</dt>
              <dd className="mt-3 font-heading text-[1.25rem] leading-snug tracking-[-0.01em] text-ink md:text-[1.375rem]">
                {item.value}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
