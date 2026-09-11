import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import ContactForm from '@/components/ui/ContactForm'
import { LocalTimeText } from '@/components/ui/LocalTime'
import { contact, offices } from '@/data/content'

export default function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="section border-t border-line">
      <div className="container-x">
        <SectionHeading id="contact-heading" eyebrow={contact.eyebrow} title={contact.headline} lead={contact.lead} />

        <div className="mt-16 grid gap-16 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-16 lg:col-span-5">
            <Reveal>
              <h3 className="eyebrow">{contact.officesEyebrow}</h3>
              <ul className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
                {offices.map((office) => (
                  <li key={office.id} className="border-t border-line pt-5">
                    <p className="font-heading text-[1.25rem] text-ink">{office.city}</p>
                    <p className="mt-1 text-[0.9375rem] text-ink-muted">{office.role}</p>
                    <a href={`mailto:${office.email}`} className="link-underline mt-3 inline-block text-[0.9375rem] text-ink">
                      {office.email}
                    </a>
                    <p className="mt-2 text-[0.8125rem] text-ink-muted">
                      <LocalTimeText timeZone={office.timeZone} />
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={100}>
              <h3 className="eyebrow">{contact.processEyebrow}</h3>
              <ol className="mt-6">
                {contact.process.map((step, index) => (
                  <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-4 border-t border-line py-5">
                    <span className="font-accent text-[1.375rem] leading-none text-accent">{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <p className="font-medium text-ink">{step.title}</p>
                      <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-muted">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <Reveal delay={150} className="lg:col-span-6 lg:col-start-7">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
