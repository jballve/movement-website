import type { ReactNode } from 'react'
import { legal } from '@/data/content'

function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(`${iso}T00:00:00Z`)
  )
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-line pt-8">
      <h2 className="text-h3 font-medium text-ink">{title}</h2>
      <div className="mt-4 space-y-4 text-[0.9375rem] leading-relaxed text-ink-muted md:text-base [&_a]:link-underline [&_a]:text-ink [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  )
}

export default function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="pt-header">
      <div className="container-x pb-section-y pt-10 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p className="eyebrow">Legal</p>
            <h1 className="mt-5 text-h2 font-normal text-ink">{title}</h1>
            <p className="mt-6 text-[0.875rem] text-ink-muted">
              Last updated <time dateTime={legal.lastUpdated}>{formatDate(legal.lastUpdated)}</time>
            </p>
          </div>
          <div className="space-y-10 lg:col-span-7 lg:col-start-6">{children}</div>
        </div>
      </div>
    </article>
  )
}
