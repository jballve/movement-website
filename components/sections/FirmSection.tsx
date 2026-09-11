import Reveal from '@/components/ui/Reveal'
import { firm } from '@/data/content'

export default function FirmSection() {
  return (
    <section id="who-we-are" aria-labelledby="firm-heading" className="section border-t border-line">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">{firm.eyebrow}</p>
            <h2 id="firm-heading" className="mt-5 text-h2 font-normal text-ink">
              {firm.headline}
            </h2>
          </Reveal>
          <div className="space-y-6 lg:col-span-6 lg:col-start-7">
            {firm.paragraphs.map((paragraph, index) => (
              <Reveal key={index} as="p" delay={100 + index * 80} className="text-body text-ink-muted">
                {paragraph}
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-20 lg:mt-28">
          <Reveal>
            <p className="eyebrow">{firm.howWeWorkEyebrow}</p>
          </Reveal>
          <ul className="mt-8 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
            {firm.differentiators.map((item, index) => (
              <Reveal key={item.title} as="li" delay={index * 70} className="border-t border-line pb-6 pt-6">
                <span className="font-accent text-[1.5rem] leading-none text-accent">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-5 text-[1.125rem] font-medium leading-snug text-ink">{item.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">{item.description}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
