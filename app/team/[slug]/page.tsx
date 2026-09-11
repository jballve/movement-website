import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import BioSections from '@/components/ui/BioSections'
import ButtonLink from '@/components/ui/ButtonLink'
import { getTeamMember, team } from '@/data/content'
import { siteUrl } from '@/lib/site'

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return team.map((member) => ({ slug: member.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const member = getTeamMember(slug)
  if (!member) return {}
  return {
    title: `${member.name}, ${member.title}`,
    description: member.summary,
    alternates: { canonical: `/team/${member.slug}` },
    openGraph: {
      type: 'profile',
      title: `${member.name}, ${member.title} | Movement`,
      description: member.summary,
      url: `/team/${member.slug}`,
      images: [{ url: member.image, alt: member.name }],
    },
  }
}

export default async function TeamMemberPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const member = getTeamMember(slug)
  if (!member) notFound()

  const others = team.filter((m) => m.slug !== member.slug)
  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: member.name,
    jobTitle: member.title,
    description: member.summary,
    image: `${siteUrl}${member.image}`,
    url: `${siteUrl}/team/${member.slug}`,
    worksFor: { '@type': 'Organization', name: 'Movement', url: siteUrl },
    ...(member.linkedin ? { sameAs: [member.linkedin] } : {}),
  }

  return (
    <article className="pt-header">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <div className="container-x pb-section-y pt-10 lg:pt-16">
        <Link
          href="/#team"
          className="group/btn inline-flex items-center gap-2 text-[0.8125rem] font-medium text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft aria-hidden className="h-4 w-4 transition-transform duration-250 group-hover/btn:-translate-x-0.5" strokeWidth={1.75} />
          Team
        </Link>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="portrait is-color relative aspect-portrait overflow-hidden bg-surface-2 lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
              <Image
                src={member.image}
                alt={member.name}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-[50%_20%]"
              />
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <p className="eyebrow">{member.title}</p>
            <h1 className="mt-4 text-h2 font-normal text-ink">{member.name}</h1>
            <p className="mt-6 max-w-prose text-lead text-ink-muted">{member.summary}</p>
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-6 inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink"
              >
                LinkedIn
                <ArrowUpRight aria-hidden className="h-3.5 w-3.5" strokeWidth={1.75} />
              </a>
            )}

            <BioSections sections={member.bio} className="mt-14 border-t border-line pt-10" />

            <div className="mt-16 border-t border-line pt-10">
              <p className="eyebrow">Also on the team</p>
              <ul className="mt-5 divide-y divide-line">
                {others.map((other) => (
                  <li key={other.slug}>
                    <Link
                      href={`/team/${other.slug}`}
                      className="group flex items-baseline justify-between gap-6 py-3 text-ink"
                    >
                      <span className="link-draw font-medium">{other.name}</span>
                      <span className="eyebrow">{other.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-16">
              <ButtonLink href="/#contact">Discuss a situation</ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
