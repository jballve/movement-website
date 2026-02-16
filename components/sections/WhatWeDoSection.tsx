'use client'

import { motion } from 'framer-motion'
import { Building2, Banknote, Layers, Settings, Scissors } from 'lucide-react'
import { whatWeDo } from '@/data/content'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  Banknote,
  Layers,
  Settings,
  Scissors,
}

export default function WhatWeDoSection() {
  return (
    <section id="what-we-do" className="section-padding bg-muted relative overflow-hidden">
      {/* Subtle accent gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50" />

      <div className="container-custom">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeInUp}
            className="font-accent text-lg md:text-xl italic text-accent font-medium mb-4"
          >
            {whatWeDo.accent}
          </motion.p>

          <motion.h2
            variants={fadeInUp}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight mb-6 text-foreground"
          >
            {whatWeDo.headline}
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="font-body text-base md:text-lg text-foreground-muted max-w-2xl mx-auto"
          >
            {whatWeDo.description}
          </motion.p>
        </motion.div>

        {/* Investment Pillars - Calibration Grid Layout */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-20"
        >
          {/* First row: 3 items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {whatWeDo.pillars.slice(0, 3).map((pillar, index) => {
              const Icon = iconMap[pillar.icon]
              const isLenderSolutions = index === 2
              return (
                <motion.div
                  key={pillar.title}
                  variants={staggerItem}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="group relative h-full"
                >
                  <div className={`card-sharp lume-glow p-6 md:p-8 border-l-4 h-full min-h-[280px] flex flex-col ${
                    isLenderSolutions ? 'border-l-accent bg-accent/5' : 'border-l-accent'
                  }`}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0">
                        <span className="font-accent italic text-5xl md:text-6xl font-medium text-accent/25 group-hover:text-accent/50 transition-colors duration-500 leading-none">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <div className="ml-auto opacity-20 group-hover:opacity-50 transition-opacity duration-500">
                        {Icon && <Icon className="w-10 h-10 text-accent" />}
                      </div>
                    </div>

                    <div className="flex-1">
                      <p className="font-body text-[10px] font-semibold tracking-[0.25em] uppercase text-accent mb-2">
                        {pillar.subtitle}
                      </p>

                      <h3 className="font-heading text-lg md:text-xl font-medium tracking-wide mb-3 text-foreground group-hover:text-accent transition-colors duration-300">
                        {pillar.title}
                      </h3>

                      <p className="font-body text-foreground-muted leading-relaxed text-sm">
                        {pillar.description}
                      </p>

                      {isLenderSolutions && (
                        <div className="mt-4 pt-4 border-t border-accent/20">
                          <span className="font-body text-[10px] tracking-[0.2em] uppercase text-accent/80">
                            Execution Certainty • Risk Mitigation
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Second row: 2 items centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {whatWeDo.pillars.slice(3, 5).map((pillar, idx) => {
              const index = idx + 3
              const Icon = iconMap[pillar.icon]
              return (
                <motion.div
                  key={pillar.title}
                  variants={staggerItem}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="group relative h-full"
                >
                  <div className="card-sharp lume-glow p-6 md:p-8 border-l-4 h-full min-h-[280px] flex flex-col border-l-accent">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0">
                        <span className="font-accent italic text-5xl md:text-6xl font-medium text-accent/25 group-hover:text-accent/50 transition-colors duration-500 leading-none">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <div className="ml-auto opacity-20 group-hover:opacity-50 transition-opacity duration-500">
                        {Icon && <Icon className="w-10 h-10 text-accent" />}
                      </div>
                    </div>

                    <div className="flex-1">
                      <p className="font-body text-[10px] font-semibold tracking-[0.25em] uppercase text-accent mb-2">
                        {pillar.subtitle}
                      </p>

                      <h3 className="font-heading text-lg md:text-xl font-medium tracking-wide mb-3 text-foreground group-hover:text-accent transition-colors duration-300">
                        {pillar.title}
                      </h3>

                      <p className="font-body text-foreground-muted leading-relaxed text-sm">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
