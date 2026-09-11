import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import { sectors, strategies } from '@/data/content'

export default function StrategiesSection() {
  return (
    <section id="what-we-do" aria-labelledby="strategies-heading" className="section">
      <div className="container-x">
        <SectionHeading
          id="strategies-heading"
          eyebrow={strategies.eyebrow}
          title={strategies.headline}
          lead={strategies.lead}
        />

        <ol className="rule-strong mt-14 lg:mt-20">
          {strategies.items.map((item, index) => (
            <Reveal
              key={item.title}
              as="li"
              delay={index * 50}
              className="group grid gap-4 border-b border-line py-8 md:grid-cols-12 md:gap-8 lg:py-10"
            >
              <span className="font-accent text-[1.5rem] leading-none text-accent transition-colors duration-250 group-hover:text-ink md:col-span-1 md:pt-1">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="md:col-span-4">
                <h3 className="text-h3 font-medium text-ink">
                  <span className="link-draw">{item.title}</span>
                </h3>
                <p className="eyebrow mt-3">{item.subtitle}</p>
              </div>
              <p className="text-ink-muted md:col-span-6 md:col-start-7">{item.description}</p>
            </Reveal>
          ))}
        </ol>

        <div className="mt-16 grid gap-6 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-3">
            <h3 className="eyebrow">{sectors.eyebrow}</h3>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-9">
            <ul className="flex flex-wrap items-baseline gap-y-2 font-heading text-[1.125rem] leading-snug text-ink-muted md:text-[1.25rem]">
              {sectors.items.map((sector, index) => (
                <li key={sector} className="flex items-baseline">
                  {sector}
                  {index < sectors.items.length - 1 && (
                    <span aria-hidden className="mx-3 text-accent">
                      ·
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
