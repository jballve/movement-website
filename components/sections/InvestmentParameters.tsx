'use client'

import { useRef, useEffect } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { whatWeDo } from '@/data/content'

const CounterItem = ({ 
  label, 
  prefix = '', 
  suffix = '', 
  min, 
  max, 
  delay = 0 
}: { 
  label: string
  prefix?: string
  suffix?: string
  min: number
  max: number
  delay?: number
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  
  const minVal = useMotionValue(0)
  const maxVal = useMotionValue(0)
  
  const minDisplay = useTransform(minVal, (current) => Math.floor(current))
  const maxDisplay = useTransform(maxVal, (current) => Math.floor(current))

  useEffect(() => {
    if (isInView) {
      // Linear animation for constant speed
      const controlsMin = animate(minVal, min, { 
        duration: 1.5, 
        ease: "linear", 
        delay: delay 
      })
      const controlsMax = animate(maxVal, max, { 
        duration: 1.5, 
        ease: "linear", 
        delay: delay 
      })
      
      return () => {
        controlsMin.stop()
        controlsMax.stop()
      }
    }
  }, [isInView, min, max, minVal, maxVal, delay])

  return (
    <div ref={ref} className="flex flex-col h-full text-center md:text-left">
      <div className="w-full h-px bg-[#C5A059] mb-4" />
      <h3 className="text-[#C5A059] font-sans text-xs uppercase tracking-[0.2em] mb-4">
        {label}
      </h3>
      <div className="flex-grow flex items-center justify-center md:justify-start">
        <span className="font-accent italic text-white font-medium text-4xl lg:text-5xl tracking-tight">
          {prefix}
          <motion.span>{minDisplay}</motion.span>
          {suffix} – {prefix}
          <motion.span>{maxDisplay}</motion.span>
          {suffix}
        </span>
      </div>
    </div>
  )
}

const TextItem = ({ 
  label, 
  value, 
  delay = 0 
}: { 
  label: string
  value: string
  delay?: number 
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <div ref={ref} className="flex flex-col h-full text-center md:text-left">
      <div className="w-full h-px bg-[#C5A059] mb-4" />
      <h3 className="text-[#C5A059] font-sans text-xs uppercase tracking-[0.2em] mb-4">
        {label}
      </h3>
      <div className="flex-grow flex items-center justify-center md:justify-start">
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: delay, ease: "easeOut" }}
          className="text-white font-bold text-2xl lg:text-3xl tracking-tight leading-tight"
        >
          {value}
        </motion.p>
      </div>
    </div>
  )
}

export default function InvestmentParameters() {
  return (
    <section className="bg-[#111111] py-20 lg:py-24 w-full">
      <div className="container-custom">
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20 text-center md:text-left"
        >
          <h2 className="font-heading text-3xl md:text-4xl tracking-[0.1em] uppercase text-white">
            Investment Parameters
          </h2>
          <div className="w-24 h-1 bg-[#C5A059] mt-6 mx-auto md:mx-0" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* Column 1: Equity Check */}
          <CounterItem 
            label="Equity Check"
            prefix="$"
            suffix="M"
            min={5}
            max={50}
            delay={0}
          />

          {/* Column 2: Enterprise Value */}
          <CounterItem 
            label="Enterprise Value"
            prefix="$"
            suffix="M"
            min={20}
            max={150}
            delay={0.1}
          />

          {/* Column 3: Focus */}
          <TextItem 
            label="Focus"
            value="Special Situations"
            delay={0.2}
          />

          {/* Column 4: Geography */}
          <TextItem 
            label="Geography"
            value="North America & APAC"
            delay={0.3}
          />

          {/* Column 5: Position */}
          <TextItem 
            label="Position"
            value="Control or Significant Minority"
            delay={0.4}
          />

        </div>

        {/* Sectors - Active Portfolio Grid (Tombstone Style) */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-24 border-t border-white/10 pt-16"
        >
          <div className="text-center mb-10">
            <p className="text-[#C5A059] font-sans text-xs uppercase tracking-[0.25em] mb-3">
              Capital Deployed
            </p>
            <h3 className="text-white font-heading text-xl md:text-2xl tracking-[0.1em] uppercase">
              Active Investments & Sector Exposure
            </h3>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-6xl mx-auto">
             {whatWeDo.criteria.sectors.map((sector, i) => (
               <motion.div 
                 key={sector}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.1 + (i * 0.05) }}
                 className="px-6 py-4 border border-white/10 hover:border-[#C5A059]/50 bg-white/5 hover:bg-white/10 transition-all duration-500 cursor-default group"
               >
                 <span className="text-white/70 group-hover:text-white font-body text-xs md:text-sm tracking-[0.15em] uppercase transition-colors duration-300">
                   {sector}
                 </span>
               </motion.div>
             ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
