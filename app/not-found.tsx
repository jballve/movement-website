import type { Metadata } from 'next'
import ButtonLink from '@/components/ui/ButtonLink'

export const metadata: Metadata = { title: 'Page not found', robots: { index: false } }

export default function NotFound() {
  return (
    <section className="pt-header">
      <div className="container-x flex min-h-[60vh] flex-col justify-center py-section-y">
        <p className="eyebrow">404</p>
        <h1 className="mt-5 max-w-2xl text-h2 font-normal text-ink">This page could not be found.</h1>
        <p className="mt-6 max-w-prose text-lead text-ink-muted">
          The address may have changed, or the page may no longer exist.
        </p>
        <div className="mt-10">
          <ButtonLink href="/">Return home</ButtonLink>
        </div>
      </div>
    </section>
  )
}
