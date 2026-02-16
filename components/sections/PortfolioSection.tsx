'use client'

import { motion } from 'framer-motion'
import { Building } from 'lucide-react'
import { portfolio, portfolioSection } from '@/data/content'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="section-padding bg-mvmt-beige/20 relative overflow-hidden">
      {/* Decorative diagonal accent */}
      <div className="absolute -top-20 -right-20 w-60 h-60 border border-accent/10 rotate-45 hidden lg:block" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 border border-accent/10 rotate-45 hidden lg:block" />

      <div className="container-custom relative">
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
            className="font-accent text-lg md:text-xl italic text-accent mb-4"
          >
            {portfolioSection.accent}
          </motion.p>

          <motion.h2
            variants={fadeInUp}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6"
          >
            {portfolioSection.headline}
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="font-body text-base md:text-lg text-foreground/70 max-w-2xl mx-auto"
          >
            {portfolioSection.description}
          </motion.p>
        </motion.div>

        {/* Portfolio Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {portfolio.map((company, index) => (
            <motion.div
              key={company.id}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="group h-full"
            >
              <div className="relative card-sharp lume-glow overflow-hidden bg-background h-full flex flex-col">
                {/* Logo Area with gradient */}
                <div className="aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-muted/30 to-accent/5 p-8 border-b border-border relative flex-shrink-0">
                  {/* Large background number */}
                  <span className="absolute top-2 right-3 font-heading text-5xl font-light text-accent/10 group-hover:text-accent/20 transition-colors duration-500">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <Building className="w-14 h-14 text-accent/30 group-hover:text-accent/50 transition-colors duration-500" />
                </div>

                {/* Info with accent border */}
                <div className="p-6 border-l-2 border-l-transparent group-hover:border-l-accent transition-colors duration-300 flex-1">
                  <p className="font-body text-[10px] tracking-[0.25em] uppercase text-accent mb-2">
                    {company.sector}
                  </p>
                  <h3 className="font-heading text-base tracking-[0.08em] uppercase mb-2 group-hover:text-accent transition-colors duration-300">
                    {company.name}
                  </h3>
                  <p className="font-body text-sm text-foreground/60">
                    {company.description}
                  </p>
                </div>

                {/* Hover Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
