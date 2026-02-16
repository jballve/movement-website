'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Linkedin, ArrowRight, Mail } from 'lucide-react'
import { team, teamSection, careersCard } from '@/data/content'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'
import TeamModal from '@/components/ui/modal/TeamModal'

export default function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<typeof team[0] | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleCareerClick = () => {
    const subject = encodeURIComponent('Career Opportunity at Movement')
    const body = encodeURIComponent(`Dear Movement Team,

I am writing to express my interest in joining Movement.

Please find attached:
• CV/Resume
• Cover Letter
• Location Preference: [Please specify: Toronto / Singapore / Other]
• Position of Interest: [Please specify]

I look forward to hearing from you.

Best regards,
[Your Name]`)

    window.location.href = `mailto:${careersCard.email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="team" className="section-padding bg-background relative">
      <TeamModal
        member={selectedMember}
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
      />

      {/* Decorative accent strips */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

      <div className="container-custom">
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
            {teamSection.accent}
          </motion.p>

          <motion.h2
            variants={fadeInUp}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight mb-6 text-foreground"
          >
            {teamSection.headline}
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="font-body text-base md:text-lg text-foreground-muted max-w-2xl mx-auto"
          >
            {teamSection.description}
          </motion.p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {team.map((member) => (
            <motion.div
              key={member.id}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="group cursor-pointer h-full"
              onClick={() => setSelectedMember(member)}
            >
              <div className="relative overflow-hidden card-sharp lume-glow h-full flex flex-col">
                {/* Photo */}
                <motion.div
                  className="aspect-[3/4] relative overflow-hidden bg-muted flex-shrink-0"
                  initial={{ filter: 'grayscale(100%)' }}
                  whileInView={isMobile ? { filter: 'grayscale(0%)' } : {}}
                  whileHover={!isMobile ? { filter: 'grayscale(0%)' } : {}}
                  viewport={{ margin: "-20%" }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />

                  {/* Uniform Light Gray Tint (Standardizes B&W tone) */}
                  <div className="absolute inset-0 bg-[#d4d4d8] mix-blend-color z-10 transition-opacity duration-500 group-hover:opacity-0 pointer-events-none" />

                  {/* Color Reveal Overlay (Optional hint) */}
                  <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500 z-20" />
                </motion.div>

                {/* Info panel */}
                <div className="p-6 border-t-2 border-t-accent/50 group-hover:border-t-accent transition-colors duration-300 bg-background-elevated flex-grow flex flex-col justify-center">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-heading text-lg font-medium tracking-[0.1em] uppercase mb-1 text-foreground group-hover:text-accent transition-colors duration-300">
                        {member.name}
                      </h3>
                      <p className="font-body text-xs font-medium tracking-[0.15em] uppercase text-accent">
                        {member.title}
                      </p>
                    </div>
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-shrink-0 p-2 text-foreground-muted hover:text-accent transition-colors duration-300"
                        aria-label={`${member.name} LinkedIn profile`}
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Join Our Team CTA Card */}
          <motion.div
            variants={staggerItem}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="group cursor-pointer h-full"
            onClick={handleCareerClick}
          >
            <div className="relative overflow-hidden card-sharp lume-glow h-full flex flex-col bg-accent/5 hover:bg-accent/10 transition-colors duration-300">
              {/* Icon Area */}
              <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-accent/20 to-accent/5 flex-shrink-0 flex items-center justify-center">
                <Mail className="w-20 h-20 text-accent/40 group-hover:text-accent/60 transition-colors duration-300" />
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500" />
              </div>

              {/* Info panel */}
              <div className="p-6 border-t-2 border-t-accent/50 group-hover:border-t-accent transition-colors duration-300 bg-background-elevated flex-grow flex flex-col justify-center">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-heading text-lg font-medium tracking-[0.1em] uppercase mb-2 text-foreground group-hover:text-accent transition-colors duration-300">
                      {careersCard.headline}
                    </h3>
                    <p className="font-body text-sm text-foreground-muted mb-4 leading-relaxed">
                      {careersCard.description}
                    </p>
                    <div className="flex items-center gap-2 text-accent text-sm font-medium tracking-wider uppercase">
                      <span>Apply Now</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
