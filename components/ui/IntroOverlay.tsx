'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Logo from '@/components/ui/Logo'

export default function IntroOverlay() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Only show on home page
    if (pathname !== '/') {
      setIsVisible(false)
      return
    }

    // Lock body scroll prevents user from scrolling during intro
    document.body.style.overflow = 'hidden'

    // Duration calculation:
    // 0.0s - 1.0s: Fade in & settle
    // 1.0s - 2.0s: Hold
    // 2.0s - 2.8s: Zoom out / "Open up"
    const totalDuration = 2800

    const timer = setTimeout(() => {
      setIsVisible(false)
      document.body.style.overflow = 'unset'
    }, totalDuration)

    return () => {
      document.body.style.overflow = 'unset'
      clearTimeout(timer)
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="intro-overlay"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} // Custom easing for smooth exit
        >
          <motion.div
            className="relative w-40 h-40 md:w-64 md:h-64 text-foreground flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              scale: [0.9, 1, 1, 15] 
            }}
            transition={{
              duration: 2.5,
              times: [0, 0.3, 0.7, 1],
              ease: "easeInOut"
            }}
          >
            <Logo variant="mark" className="w-full h-full" />
            
            {/* Optional text that fades out before the zoom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, times: [0, 0.5, 1], delay: 0.2 }}
              className="absolute -bottom-16 w-full text-center"
            >
              <span className="font-heading text-xl tracking-[0.3em] uppercase">Movement</span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
