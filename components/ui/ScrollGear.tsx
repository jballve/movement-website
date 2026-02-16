'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

export default function ScrollGear() {
  const { scrollYProgress } = useScroll()

  // Subtle rotation - just 180 degrees over entire scroll
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180])

  return (
    <motion.div
      className="fixed right-[-8vw] top-[20vh] w-[28vw] h-[28vw] max-w-[350px] max-h-[350px] pointer-events-none z-0 opacity-[0.04] dark:opacity-[0.03]"
    >
      <motion.svg
        viewBox="0 0 200 200"
        className="w-full h-full text-accent"
        style={{ rotate }}
      >
        {/* Simplified Patek-style movement - elegant, not busy */}

        {/* Main wheel */}
        <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="0.5" fill="none" />

        {/* Hour markers */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180
          const x1 = 100 + 85 * Math.cos(angle)
          const y1 = 100 + 85 * Math.sin(angle)
          const x2 = 100 + 95 * Math.cos(angle)
          const y2 = 100 + 95 * Math.sin(angle)
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth={i % 3 === 0 ? 1.5 : 0.5}
            />
          )
        })}

        {/* Inner ring */}
        <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.5" fill="none" />

        {/* Elegant spokes - Geneva stripes style */}
        {Array.from({ length: 5 }).map((_, i) => {
          const angle = ((i * 72 - 90) * Math.PI) / 180
          const x1 = 100 + 20 * Math.cos(angle)
          const y1 = 100 + 20 * Math.sin(angle)
          const x2 = 100 + 58 * Math.cos(angle)
          const y2 = 100 + 58 * Math.sin(angle)
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="0.5"
            />
          )
        })}

        {/* Center arbor */}
        <circle cx="100" cy="100" r="20" stroke="currentColor" strokeWidth="0.5" fill="none" />
        <circle cx="100" cy="100" r="4" fill="currentColor" />
      </motion.svg>
    </motion.div>
  )
}
