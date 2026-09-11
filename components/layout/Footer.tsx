import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import { footer, navigation, offices, siteConfig } from '@/data/content'
import { contactEmail, linkedInUrl } from '@/lib/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-mvmt-dark text-mvmt-light">
      <div className="container-x pb-10 pt-20 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link href="/" aria-label="Movement — home" className="inline-block">
              <Logo variant="stacked" tone="light" className="w-40" />
            </Link>
            <p className="mt-8 max-w-xs text-[0.9375rem] leading-relaxed text-mvmt-beige/80">{footer.description}</p>
          </div>

          <div className="grid gap-12 sm:grid-cols-3 lg:col-span-8 lg:col-start-5">
            {offices.map((office) => (
              <div key={office.id}>
                <p className="text-eyebrow uppercase text-mvmt-beige/60">{office.city}</p>
                <p className="mt-4 text-[0.9375rem] text-mvmt-light">{office.role}</p>
                <a
                  href={`mailto:${office.email}`}
                  className="link-underline mt-2 inline-block text-[0.9375rem] text-mvmt-beige/80 hover:text-mvmt-light"
                >
                  {office.email}
                </a>
              </div>
            ))}

            <div>
              <p className="text-eyebrow uppercase text-mvmt-beige/60">Connect</p>
              <ul className="mt-4 space-y-2 text-[0.9375rem]">
                <li>
                  <a href={`mailto:${contactEmail}`} className="link-underline text-mvmt-beige/80 hover:text-mvmt-light">
                    {contactEmail}
                  </a>
                </li>
                <li>
                  <a
                    href={linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-mvmt-beige/80 hover:text-mvmt-light"
                  >
                    LinkedIn
                  </a>
                </li>
              </ul>
              <nav aria-label="Footer" className="mt-8">
                <ul className="space-y-2 text-[0.9375rem]">
                  {navigation.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="link-underline text-mvmt-beige/80 hover:text-mvmt-light">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-mvmt-brown/40 pt-8">
          <p className="max-w-3xl text-[0.8125rem] leading-relaxed text-mvmt-beige/60">{footer.disclaimer}</p>
          <div className="mt-8 flex flex-col gap-4 text-[0.8125rem] text-mvmt-beige/60 md:flex-row md:items-center md:justify-between">
            <p>
              © {year} {siteConfig.name}. All rights reserved.
            </p>
            <ul className="flex gap-6">
              {footer.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="link-underline hover:text-mvmt-light">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
