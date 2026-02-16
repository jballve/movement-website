import type { Metadata } from 'next'
import { Jost, Work_Sans, Cormorant } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MovementMechanism from '@/components/ui/MovementMechanism'
import IntroOverlay from '@/components/ui/IntroOverlay'
import './globals.css'

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
})

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  display: 'swap',
})

const cormorant = Cormorant({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Movement | Investing Through Time',
  description: 'Movement is a global special situations investment firm with strategic hubs in Toronto and Singapore, partnering with exceptional companies to unlock enduring value across North America and Asia Pacific.',
  keywords: 'special situations, private equity, investment, Global, North America, Asia Pacific, Toronto, Singapore, turnaround, restructuring, growth capital',
  icons: {
    icon: '/assets/logos/Movement_Mark_Black.png',
    apple: '/assets/logos/Movement_Mark_Black.png',
  },
  openGraph: {
    title: 'Movement | Investing Through Time',
    description: 'A global special situations investment firm bridging North America and Asia Pacific.',
    type: 'website',
    locale: 'en_CA',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jost.variable} ${workSans.variable} ${cormorant.variable}`}
    >
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {/* Intro Animation Overlay */}
          <IntroOverlay />

          {/* Complex Watch Movement Animation */}
          <MovementMechanism />

          {/* Film Grain Noise Overlay */}
          <div className="noise-overlay" aria-hidden="true" />

          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
