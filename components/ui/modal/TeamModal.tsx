'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Linkedin, Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Logo from '@/components/ui/Logo'

interface TeamModalProps {
  member: {
    name: string
    title: string
    bio: string
    image: string
    linkedin?: string
  } | null
  isOpen: boolean
  onClose: () => void
}

export default function TeamModal({ member, isOpen, onClose }: TeamModalProps) {
  const [imageLoading, setImageLoading] = useState(true)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setImageLoading(true) // Reset loading state on open
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, member])

  return (
    <AnimatePresence>
      {isOpen && member && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-background border border-accent/20 shadow-2xl overflow-hidden flex flex-col md:flex-row h-[85vh] md:h-[600px] rounded-lg md:rounded-none"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-30 p-2 text-white/80 hover:text-white md:text-foreground/50 md:hover:text-accent transition-colors bg-black/20 backdrop-blur-md md:bg-transparent rounded-full"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image Container */}
            <div className="absolute inset-0 md:relative md:w-5/12 md:inset-auto h-full bg-muted flex items-center justify-center z-0">
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted z-10">
                  <Loader2 className="w-8 h-8 animate-spin text-accent/50" />
                </div>
              )}
              <Image
                src={member.image}
                alt={member.name}
                fill
                className={`object-cover object-top transition-opacity duration-500 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                sizes="(max-width: 768px) 100vw, 400px"
                priority
                onLoad={() => setImageLoading(false)}
              />
              {/* Mobile Dimming Overlay + Gradient */}
              <div className="absolute inset-0 bg-black/20 md:hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent md:hidden" />
            </div>

            {/* Content Side */}
            <div className="relative z-10 w-full md:w-7/12 h-full overflow-y-auto custom-scrollbar md:bg-background">
              <div className="p-6 pt-[40vh] md:p-12 md:pt-12 text-white md:text-foreground drop-shadow-md md:drop-shadow-none">
                <div className="mb-6 md:mb-8">
                  <h3 className="font-heading text-3xl md:text-4xl tracking-[0.1em] uppercase mb-2 text-white md:text-foreground drop-shadow-lg md:drop-shadow-none">
                    {member.name}
                  </h3>
                  <p className="font-body text-xs tracking-[0.2em] uppercase text-accent font-semibold">
                    {member.title}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="w-12 h-px bg-accent/50" />
                  <div className="space-y-6">
                    {member.bio.split('\n\n').map((section, idx) => {
                      const lines = section.split('\n')
                      const header = lines[0]
                      const contentLines = lines.slice(1)
                      
                      const isList = contentLines.some(line => line.trim().startsWith('-'))

                      return (
                        <div key={idx}>
                          {header && (
                            <h4 className="font-heading text-xs md:text-sm uppercase tracking-[0.2em] text-accent/90 md:text-accent mb-3 font-semibold">
                              {header.replace(':', '')}
                            </h4>
                          )}
                          
                          {isList ? (
                            <ul className="space-y-2">
                              {contentLines.map((line, i) => {
                                const cleanLine = line.replace(/^- /, '').trim()
                                if (!cleanLine) return null
                                return (
                                  <li key={i} className="flex items-start gap-3 group">
                                    <span className="mt-2.5 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                                    <span className="font-body text-sm md:text-base text-white/90 md:text-foreground leading-relaxed">
                                      {cleanLine}
                                    </span>
                                  </li>
                                )
                              })}
                            </ul>
                          ) : (
                            <p className="font-body text-sm md:text-base text-white/90 md:text-foreground leading-relaxed">
                              {contentLines.join(' ')}
                            </p>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10 md:border-border flex items-center justify-between">
                  {/* LinkedIn Link */}
                  <a 
                    href={member.linkedin || "#"} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/70 md:text-foreground/60 hover:text-accent transition-colors group"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span className="font-body text-xs tracking-wider uppercase group-hover:underline">LinkedIn Profile</span>
                  </a>
                  
                  {/* Movement Monogram (Small) */}
                  <div className="opacity-40 md:opacity-20 w-8 h-8 invert md:invert-0">
                     <Logo variant="mark" color="auto" className="w-full h-full" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
