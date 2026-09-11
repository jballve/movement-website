'use client'

import { useCallback, useEffect, useRef, useState, type MouseEvent, type SyntheticEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, X } from 'lucide-react'
import BioSections from '@/components/ui/BioSections'
import type { TeamMember } from '@/data/content'
import { cn } from '@/lib/utils'

type TeamDialogProps = {
  member: TeamMember | null
  onClose: () => void
}

/**
 * Native <dialog> profile quick-view. The platform provides the focus trap,
 * top layer, Escape handling and focus restoration; we add the exit
 * transition, backdrop click and scroll locking.
 */
export default function TeamDialog({ member, onClose }: TeamDialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (member && !dialog.open) {
      setClosing(false)
      dialog.showModal()
      const root = document.documentElement
      const previous = root.style.overflow
      root.style.overflow = 'hidden'
      return () => {
        root.style.overflow = previous
      }
    }
  }, [member])

  const requestClose = useCallback(() => {
    const dialog = ref.current
    if (!dialog || !dialog.open || closing) return
    const instant = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (instant) {
      dialog.close()
      return
    }
    setClosing(true)
    window.setTimeout(() => dialog.close(), 230)
  }, [closing])

  const handleCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault()
    requestClose()
  }

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === ref.current) requestClose()
  }

  const handleClosed = () => {
    setClosing(false)
    onClose()
  }

  return (
    <dialog
      ref={ref}
      className={cn('sheet', closing && 'is-closing')}
      onCancel={handleCancel}
      onClose={handleClosed}
      onClick={handleBackdropClick}
      aria-labelledby="team-dialog-title"
    >
      {member && (
        <div className="relative flex h-full flex-col overflow-y-auto md:grid md:grid-cols-12 md:overflow-hidden">
          <button
            type="button"
            onClick={requestClose}
            aria-label="Close profile"
            className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center bg-paper/85 text-ink backdrop-blur-sm transition-colors duration-250 hover:bg-paper"
          >
            <X aria-hidden className="h-5 w-5" strokeWidth={1.5} />
          </button>

          <div className="portrait is-color relative aspect-portrait shrink-0 bg-surface-2 md:col-span-5 md:aspect-auto md:h-full">
            <Image
              src={member.image}
              alt={member.name}
              fill
              sizes="(min-width: 768px) 27rem, 100vw"
              className="object-cover object-[50%_20%]"
            />
          </div>

          <div className="md:col-span-7 md:h-full md:overflow-y-auto">
            <div className="px-6 py-10 md:px-12 md:py-14">
              <p className="eyebrow">{member.title}</p>
              <h2 id="team-dialog-title" className="mt-3 text-h2 font-normal text-ink">
                {member.name}
              </h2>
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline mt-5 inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink"
                >
                  LinkedIn
                  <ArrowUpRight aria-hidden className="h-3.5 w-3.5" strokeWidth={1.75} />
                </a>
              )}

              <BioSections sections={member.bio} className="mt-10" />

              <div className="mt-12 border-t border-line pt-6">
                <Link
                  href={`/team/${member.slug}`}
                  className="group/btn link-draw inline-flex items-center gap-2 text-sm font-medium text-ink"
                >
                  Open full profile
                  <ArrowRight
                    aria-hidden
                    className="h-4 w-4 transition-transform duration-250 group-hover/btn:translate-x-0.5"
                    strokeWidth={1.75}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </dialog>
  )
}
