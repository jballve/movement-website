'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { siteConfig } from '@/data/content'
import { heroTextReveal, lineReveal } from '@/lib/animations'
import Starfield from '@/components/ui/Starfield'
import Logo from '@/components/ui/Logo'

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const handleScrollDown = () => {
    const nextSection = document.querySelector('#who-we-are')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Simple gradient background - lowest layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background" />
      </div>

      {/* Background Video - above gradient */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <video
          key="hero-video"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale-[60%] sepia-[15%] dark:opacity-40"
          preload="auto"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Theme-aware overlay - lighter for light mode, darker for dark mode */}
        <div className="absolute inset-0 bg-background/70 dark:bg-background/50" />
        {/* Radial vignette - theme aware */}
        <div className="absolute inset-0 hero-vignette" />
        {/* Top and bottom edge gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background/90 dark:from-background/60 dark:via-transparent dark:to-background/80" />
      </div>

      {/* Starfield Animation - above video */}
      <Starfield />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 container-custom text-center"
      >
        <div>
            {/* Logo Mark - Large */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="mb-8 mt-4 flex justify-center"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 hero-logo-clean">
                <Logo variant="mark" color="auto" className="w-full h-full" />
              </div>
            </motion.div>

            {/* Main Title */}
            <div className="overflow-hidden">
              <motion.h1
                variants={heroTextReveal}
                initial="hidden"
                animate="visible"
                className="font-heading text-5xl md:text-7xl lg:text-8xl font-medium tracking-[0.15em] mb-4 text-foreground hero-text-shadow"
              >
                {siteConfig.name.toUpperCase()}
              </motion.h1>
            </div>

            {/* Animated Line */}
            <motion.div
              variants={lineReveal}
              initial="hidden"
              animate="visible"
              className="h-[2px] w-48 md:w-64 mx-auto bg-accent mb-4 shadow-lg"
            />

            {/* Tagline */}
            <div className="overflow-hidden">
              <motion.p
                variants={heroTextReveal}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
                className="font-body text-sm md:text-base font-bold tracking-[0.2em] uppercase text-accent mb-10 hero-text-shadow-sm"
              >
                {siteConfig.tagline}
              </motion.p>
            </div>

            {/* Description */}
            <motion.p
              variants={heroTextReveal}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
              className="font-accent text-lg md:text-xl lg:text-2xl italic max-w-3xl mx-auto text-foreground hero-text-shadow-sm"
            >
              {siteConfig.description}
            </motion.p>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-foreground/70 hover:text-accent transition-colors duration-300"
        aria-label="Scroll down"
      >
        <span className="font-body text-xs font-medium tracking-widest uppercase hero-text-shadow-sm">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.button>
    </section>
  )
}
