import Reveal from '@/components/ui/Reveal'
import { backing } from '@/data/content'

/** The single dark editorial band on the page. */
export default function BackingSection() {
  return (
    <section aria-labelledby="backing-heading" className="bg-mvmt-dark text-mvmt-light">
      <div className="container-x section grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-3">
          <p className="text-eyebrow uppercase text-mvmt-beige/60">{backing.eyebrow}</p>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-9">
          <h2 id="backing-heading" className="font-accent text-statement font-medium text-mvmt-light">
            {backing.statement}
          </h2>
          <p className="mt-10 border-t border-mvmt-brown/50 pt-6 text-[0.9375rem] text-mvmt-beige/70">
            {backing.supporting}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
