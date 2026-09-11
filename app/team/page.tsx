import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { team, teamSection } from '@/data/content'

export const metadata: Metadata = {
  title: 'Team',
  description: teamSection.lead,
  alternates: { canonical: '/team' },
}

export default function TeamIndexPage() {
  return (
    <section className="pt-header">
      <div className="container-x pb-section-y pt-10 lg:pt-16">
        <p className="eyebrow">{teamSection.eyebrow}</p>
        <h1 className="mt-5 max-w-3xl text-h2 font-normal text-ink">{teamSection.headline}</h1>
        <p className="mt-6 max-w-prose text-lead text-ink-muted">{teamSection.lead}</p>

        <ul className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
          {team.map((member) => (
            <li key={member.slug}>
              <Link href={`/team/${member.slug}`} className="portrait group block">
                <div className="relative aspect-portrait overflow-hidden bg-surface-2">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="object-cover object-[50%_20%]"
                  />
                </div>
                <h2 className="mt-5 text-[1.125rem] font-medium text-ink">
                  <span className="link-draw">{member.name}</span>
                </h2>
                <p className="eyebrow mt-2">{member.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
