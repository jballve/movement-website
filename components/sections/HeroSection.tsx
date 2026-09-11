import ButtonLink from '@/components/ui/ButtonLink'
import Enter from '@/components/ui/Enter'
import { Dial } from '@/components/ui/LocalTime'
import HeroMedia from '@/components/sections/HeroMedia'
import { hero, offices } from '@/data/content'

export default function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className="pt-header">
      <div className="container-x">
        <div className="grid gap-12 pb-14 pt-10 md:pt-16 lg:grid-cols-12 lg:gap-16 lg:pb-20 lg:pt-24">
          <div className="flex flex-col justify-center lg:col-span-7">
            <Enter>
              <p className="eyebrow">{hero.eyebrow}</p>
            </Enter>
            <Enter delay={80}>
              <h1 id="hero-heading" className="mt-6 max-w-[14ch] text-display font-normal text-ink">
                {hero.headline}{' '}
                <em className="font-accent text-[1.08em] font-medium italic">{hero.headlineEmphasis}</em>
              </h1>
            </Enter>
            <Enter delay={160}>
              <p className="mt-8 max-w-prose text-lead text-ink-muted">{hero.lead}</p>
            </Enter>
            <Enter delay={240}>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <ButtonLink href={hero.primaryCta.href}>{hero.primaryCta.label}</ButtonLink>
                <ButtonLink href={hero.secondaryCta.href} variant="text">
                  {hero.secondaryCta.label}
                </ButtonLink>
              </div>
            </Enter>
          </div>

          <Enter delay={200} className="lg:col-span-5">
            <HeroMedia />
          </Enter>
        </div>

        <Enter delay={320}>
          <div className="rule-strong flex flex-col gap-8 py-7 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-x-12 gap-y-6">
              {offices.map((office) => (
                <Dial key={office.id} city={office.city} timeZone={office.timeZone} />
              ))}
            </div>
            <p className="eyebrow md:text-right">{hero.backingNote}</p>
          </div>
        </Enter>
      </div>
    </section>
  )
}
