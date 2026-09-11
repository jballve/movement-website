'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { hero } from '@/data/content'
import { useMediaQuery, useSaveData } from '@/lib/hooks'

const POSTER = '/images/hero/movement-poster.jpg'
const VIDEO = '/videos/movement-720.mp4'

/**
 * Poster-first hero image. The looping video is only attached on wide screens
 * when the visitor has not asked for reduced motion or reduced data, and it is
 * paused whenever it leaves the viewport or the tab is hidden.
 */
export default function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wide = useMediaQuery('(min-width: 1024px)')
  const motionOk = useMediaQuery('(prefers-reduced-motion: no-preference)')
  const saveData = useSaveData()
  const withVideo = wide && motionOk && !saveData

  useEffect(() => {
    const video = videoRef.current
    if (!video || !withVideo) return

    const play = () => video.play().catch(() => undefined)
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting && !document.hidden ? play() : video.pause()),
      { threshold: 0.15 }
    )
    io.observe(video)
    const onVisibility = () => (document.hidden ? video.pause() : play())
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [withVideo])

  return (
    <figure>
      <div className="relative aspect-[4/3] overflow-hidden bg-surface lg:aspect-portrait">
        <Image
          src={POSTER}
          alt={hero.mediaAlt}
          fill
          priority
          fetchPriority="high"
          sizes="(min-width: 1024px) 38vw, 100vw"
          className="media-warm object-cover object-[55%_50%]"
        />
        {withVideo && (
          <video
            ref={videoRef}
            className="media-warm absolute inset-0 h-full w-full object-cover object-[55%_50%]"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster={POSTER}
            aria-hidden
            tabIndex={-1}
          >
            <source src={VIDEO} type="video/mp4" />
          </video>
        )}
      </div>
      <figcaption className="mt-4 flex items-baseline justify-between gap-6 text-[0.8125rem] leading-relaxed text-ink-muted">
        <span>{hero.mediaCaption}</span>
        <span className="eyebrow shrink-0">Fig. 01</span>
      </figcaption>
    </figure>
  )
}
