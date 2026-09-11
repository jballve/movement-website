import type { Metadata, Viewport } from 'next'
import { Cormorant, Jost, Work_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SkipLink from '@/components/layout/SkipLink'
import { offices, siteConfig } from '@/data/content'
import { contactEmail, linkedInUrl, siteUrl } from '@/lib/site'
import './globals.css'

const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jost',
  display: 'swap',
})

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-work-sans',
  display: 'swap',
})

const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Movement | Investing Through Time',
    template: '%s | Movement',
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    title: 'Movement | Investing Through Time',
    description: siteConfig.shortDescription,
    url: '/',
    locale: 'en_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Movement | Investing Through Time',
    description: siteConfig.shortDescription,
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#f4f1ec',
  width: 'device-width',
  initialScale: 1,
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteUrl,
  logo: `${siteUrl}/assets/brand/mark-dark.png`,
  description: siteConfig.description,
  email: contactEmail,
  sameAs: [linkedInUrl],
  location: offices.map((office) => ({
    '@type': 'Place',
    name: `${siteConfig.name} ${office.city}`,
    address: { '@type': 'PostalAddress', addressLocality: office.city },
  })),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jost.variable} ${workSans.variable} ${cormorant.variable}`}>
      <body>
        {/* Opt into scroll-reveal transitions only when JavaScript runs; content is visible without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <SkipLink />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
