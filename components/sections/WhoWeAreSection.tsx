'use client'

import { motion } from 'framer-motion'
import { whoWeAre } from '@/data/content'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'

export default function WhoWeAreSection() {
  return (
    <section id="who-we-are" className="section-padding bg-muted relative">
      {/* Decorative vertical accent bar */}
      <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-gradient-to-b from-transparent via-accent/50 to-transparent hidden lg:block" />

      <div className="container-custom">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        >
          {/* Left Column - Text Content */}
          <div>
            <motion.p
              variants={fadeInUp}
              className="font-accent text-lg md:text-xl italic text-accent font-medium mb-4"
            >
              {whoWeAre.accent}
            </motion.p>

            <motion.h2
              variants={fadeInUp}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight mb-8 text-foreground"
            >
              {whoWeAre.headline}
            </motion.h2>

            <div className="space-y-6">
              {whoWeAre.paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  variants={fadeInUp}
                  className="font-body text-base md:text-lg text-foreground-muted leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Accent line after paragraphs */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 w-24 h-px bg-accent"
            />
          </div>

            {/* Right Column - Differentiators with accent backgrounds */}
            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {whoWeAre.differentiators.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={staggerItem}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="group relative h-full"
                >
                  {/* Card with subtle top accent border */}
                  <div className="card-sharp lume-glow p-6 border-t-2 border-t-accent/60 group-hover:border-t-accent transition-colors duration-300 h-full flex flex-col justify-between">
                    <div>
                      {/* Number - Breguet Style */}
                      <span className="font-accent italic text-4xl font-medium text-accent/40 group-hover:text-accent/70 transition-colors duration-500 block mb-3">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <h3 className="font-heading text-base font-medium tracking-[0.12em] uppercase mb-2 text-foreground group-hover:text-accent transition-colors duration-300">
                        {item.title}
                      </h3>
                    </div>
                    <p className="font-body text-sm text-foreground-muted leading-relaxed mt-2">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
