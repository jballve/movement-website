'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import Reveal from '@/components/ui/Reveal'
import SectionHeading from '@/components/ui/SectionHeading'
import TeamDialog from '@/components/ui/TeamDialog'
import { team, teamSection, type TeamMember } from '@/data/content'
import { contactEmail } from '@/lib/site'

function TeamCard({ member, onOpen }: { member: TeamMember; onOpen: (member: TeamMember) => void }) {
  return (
    <article className="group">
      <button
        type="button"
        onClick={() => onOpen(member)}
        aria-haspopup="dialog"
        className="portrait block w-full text-left focus-visible:outline-offset-4"
      >
        <div className="relative aspect-portrait overflow-hidden bg-surface-2">
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
            className="object-cover object-[50%_20%]"
          />
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-[1.125rem] font-medium leading-snug text-ink">{member.name}</h3>
            <p className="eyebrow mt-2">{member.title}</p>
          </div>
          <span className="eyebrow mt-1 inline-flex shrink-0 items-center gap-1 text-ink/50 transition-colors duration-250 group-hover:text-ink">
            Profile
            <ArrowUpRight aria-hidden className="h-3.5 w-3.5" strokeWidth={1.75} />
          </span>
        </div>
      </button>
    </article>
  )
}

export default function TeamSection() {
  const [selected, setSelected] = useState<TeamMember | null>(null)

  return (
    <section id="team" aria-labelledby="team-heading" className="section bg-surface">
      <div className="container-x">
        <SectionHeading id="team-heading" eyebrow={teamSection.eyebrow} title={teamSection.headline} lead={teamSection.lead} />

        <ul className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-x-10">
          {team.map((member, index) => (
            <Reveal key={member.slug} as="li" delay={(index % 3) * 80}>
              <TeamCard member={member} onOpen={setSelected} />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-20 grid gap-4 border-t border-line pt-8 lg:grid-cols-12 lg:gap-16">
          <p className="eyebrow lg:col-span-3">{teamSection.careersEyebrow}</p>
          <p className="max-w-prose text-[0.9375rem] leading-relaxed text-ink-muted lg:col-span-9">
            {teamSection.careersText}{' '}
            <a href={`mailto:${contactEmail}`} className="link-underline text-ink">
              {contactEmail}
            </a>
            .
          </p>
        </Reveal>
      </div>

      <TeamDialog member={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
