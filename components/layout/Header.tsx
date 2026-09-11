'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import ButtonLink from '@/components/ui/ButtonLink'
import { navigation, offices } from '@/data/content'
import { contactEmail } from '@/lib/site'
import { cn } from '@/lib/utils'

/** How long to keep the header visible after a navigation click triggers a smooth scroll. */
const NAV_SCROLL_GRACE_MS = 1500

const stagger = (index: number) => ({ '--i': index }) as CSSProperties

export default function Header() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const lastY = useRef(0)
  const keepVisibleUntil = useRef(0)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const pathname = usePathname()

  // Hide on scroll down, reveal on scroll up. Navigation clicks keep it visible while the page scrolls.
  useEffect(() => {
    let frame = 0
    lastY.current = window.scrollY
    keepVisibleUntil.current = Date.now() + NAV_SCROLL_GRACE_MS
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const y = window.scrollY
        const delta = y - lastY.current
        setScrolled(y > 8)
        if (y < 120 || Date.now() < keepVisibleUntil.current) setHidden(false)
        else if (delta > 6) setHidden(true)
        else if (delta < -6) setHidden(false)
        lastY.current = y
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  // Close the menu when the route changes (state adjusted during render, no effect needed).
  const [lastPath, setLastPath] = useState(pathname)
  if (pathname !== lastPath) {
    setLastPath(pathname)
    setOpen(false)
  }

  // Menu: lock scroll, close on Escape, manage focus.
  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const previousOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const menuButton = menuButtonRef.current
    const focusTimer = window.setTimeout(() => firstLinkRef.current?.focus(), 80)
    return () => {
      root.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKey)
      window.clearTimeout(focusTimer)
      menuButton?.focus()
    }
  }, [open])

  const onNavigate = () => {
    keepVisibleUntil.current = Date.now() + NAV_SCROLL_GRACE_MS
    setOpen(false)
  }

  return (
    <>
      {/* The header hides with a transform; the menu panel is a sibling so its fixed position is relative to the viewport. */}
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-transform duration-400 ease-out',
          hidden && !open && '-translate-y-full'
        )}
      >
        <div
          className={cn(
            'h-header border-b bg-paper/90 backdrop-blur-md transition-colors duration-400 supports-[backdrop-filter]:bg-paper/85',
            scrolled || open ? 'border-line' : 'border-transparent'
          )}
        >
          <div className="container-x flex h-full items-center justify-between gap-6">
            <Link href="/" aria-label="Movement — home" className="flex items-center py-2" onClick={onNavigate}>
              <Logo variant="lockup" priority />
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className="link-draw text-[0.8125rem] font-medium tracking-[0.04em] text-ink-muted transition-colors duration-250 hover:text-ink"
                >
                  {item.name}
                </Link>
              ))}
              <span onClick={onNavigate} className="ml-2 inline-flex">
                <ButtonLink href="/#contact" size="sm">
                  Discuss a situation
                </ButtonLink>
              </span>
            </nav>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-ink lg:hidden"
            >
              {open ? <X aria-hidden className="h-5 w-5" strokeWidth={1.5} /> : <Menu aria-hidden className="h-5 w-5" strokeWidth={1.5} />}
              <span className="visually-hidden">{open ? 'Close menu' : 'Open menu'}</span>
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" className="menu-panel lg:hidden" data-open={open ? '' : undefined} inert={!open}>
        <nav aria-label="Mobile" className="container-x flex min-h-full flex-col justify-between py-10">
          <ul className="space-y-2">
            {navigation.map((item, index) => (
              <li key={item.href} className="menu-item border-b border-line" style={stagger(index)}>
                <Link
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  onClick={onNavigate}
                  className="flex items-baseline justify-between py-5 font-heading text-3xl text-ink"
                >
                  {item.name}
                  <span className="font-accent text-lg text-accent">0{index + 1}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="menu-item mt-12 space-y-8" style={stagger(navigation.length)}>
            <span onClick={onNavigate} className="block">
              <ButtonLink href="/#contact" className="w-full justify-between sm:w-auto">
                Discuss a situation
              </ButtonLink>
            </span>
            <div className="grid gap-6 text-sm sm:grid-cols-2">
              {offices.map((office) => (
                <div key={office.id}>
                  <p className="eyebrow">{office.city}</p>
                  <a href={`mailto:${office.email}`} className="link-underline mt-2 inline-block text-ink-muted">
                    {office.email}
                  </a>
                </div>
              ))}
              <div>
                <p className="eyebrow">General</p>
                <a href={`mailto:${contactEmail}`} className="link-underline mt-2 inline-block text-ink-muted">
                  {contactEmail}
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
