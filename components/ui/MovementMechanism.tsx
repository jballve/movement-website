'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

// Helper to generate involute gear path
function createGearPath(teeth: number, radius: number, holeRadius: number) {
  const rootRadius = radius * 0.85
  const outsideRadius = radius * 1.15
  let path = ''

  for (let i = 0; i < teeth; i++) {
    const angle = (Math.PI * 2 * i) / teeth
    const nextAngle = (Math.PI * 2 * (i + 1)) / teeth
    const halfAngle = angle + (nextAngle - angle) / 2
    
    // Involute-like tooth profile points
    // 1. Root start
    const x1 = Math.cos(angle) * rootRadius
    const y1 = Math.sin(angle) * rootRadius
    
    // 2. Pitch point start (base of tooth curve)
    const x2 = Math.cos(angle + 0.02) * radius
    const y2 = Math.sin(angle + 0.02) * radius
    
    // 3. Tip start
    const x3 = Math.cos(angle + 0.05) * outsideRadius
    const y3 = Math.sin(angle + 0.05) * outsideRadius
    
    // 4. Tip end
    const x4 = Math.cos(halfAngle - 0.05) * outsideRadius
    const y4 = Math.sin(halfAngle - 0.05) * outsideRadius

    // 5. Pitch point end
    const x5 = Math.cos(halfAngle - 0.02) * radius
    const y5 = Math.sin(halfAngle - 0.02) * radius
    
    // 6. Root end
    const x6 = Math.cos(halfAngle) * rootRadius
    const y6 = Math.sin(halfAngle) * rootRadius

    if (i === 0) {
      path += `M ${x1} ${y1}`
    }
    
    // Draw the tooth
    path += ` L ${x2} ${y2} L ${x3} ${y3} A ${outsideRadius} ${outsideRadius} 0 0 1 ${x4} ${y4} L ${x5} ${y5} L ${x6} ${y6}`
    
    // Draw the gap
    const gapX = Math.cos(nextAngle) * rootRadius
    const gapY = Math.sin(nextAngle) * rootRadius
    path += ` A ${rootRadius} ${rootRadius} 0 0 1 ${gapX} ${gapY}`
  }
  
  path += ' Z'
  
  // Add center hole (counter-clockwise to create hole)
  path += ` M ${holeRadius} 0 A ${holeRadius} ${holeRadius} 0 1 0 -${holeRadius} 0 A ${holeRadius} ${holeRadius} 0 1 0 ${holeRadius} 0 Z`

  return path
}

export default function MovementMechanism() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
      <div className="absolute right-[-5%] top-[5%] w-[1000px] h-[1000px] xl:w-[1200px] xl:h-[1200px] opacity-[0.2] text-[#E5E7EB]">
        <svg viewBox="0 0 1000 1000" className="w-full h-full">
          <defs>
            {/* Soft fade gradient for edges */}
            <radialGradient id="fadeGradient" cx="50%" cy="50%" r="50%">
               <stop offset="70%" stopColor="#E5E7EB" stopOpacity="1" />
               <stop offset="100%" stopColor="#E5E7EB" stopOpacity="0" />
            </radialGradient>
            
            {/* Metallic Depth Shadow */}
            <filter id="gearShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.3"/>
            </filter>
          </defs>

          {/* Masking group for edge fading */}
          <g stroke="url(#fadeGradient)" fill="none">
            
            {/* --- GEAR 1: GREAT WHEEL (Driver) --- */}
            {/* Position: Top Right (Main visual anchor) */}
            <motion.g 
              style={{ x: 700, y: 300 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              <g filter="url(#gearShadow)">
                {/* Main Gear Body */}
                <path 
                  d={createGearPath(60, 180, 160)} 
                  fill="#E5E7EB" 
                  fillOpacity="0.05"
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                />
                
                {/* 5-Spoke Design */}
                <circle cx="0" cy="0" r="160" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                {Array.from({ length: 5 }).map((_, i) => (
                   <rect 
                     key={i} 
                     x="-10" y="-160" width="20" height="160" 
                     fill="none" 
                     stroke="currentColor" 
                     strokeWidth="1.5"
                     transform={`rotate(${i * 72})`} 
                   />
                ))}
                
                {/* Pivot & Jewel */}
                <circle cx="0" cy="0" r="15" fill="#E5E7EB" stroke="none" />
                <circle cx="0" cy="0" r="5" fill="#9CA3AF" stroke="none" />
              </g>
            </motion.g>

            {/* --- GEAR 2: CENTER WHEEL (Driven Pinion) --- */}
            {/* Position: Meshed with Gear 1 */}
            {/* Distance = R1(180) + R2(60) = 240px */}
            {/* Position: 700 - 240 = 460 x (Horizontal mesh for simplicity) */}
            <motion.g 
              style={{ x: 460, y: 300 }}
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <g filter="url(#gearShadow)">
                 {/* 20 Teeth (Ratio 3:1) */}
                 <path 
                   d={createGearPath(20, 60, 40)} 
                   fill="#E5E7EB" 
                   fillOpacity="0.05"
                   stroke="currentColor" 
                   strokeWidth="1.5" 
                 />
                 
                 {/* 4-Spoke Design */}
                 {Array.from({ length: 4 }).map((_, i) => (
                    <line key={i} x1="0" y1="0" x2="0" y2="-40" stroke="currentColor" strokeWidth="1.5" transform={`rotate(${i * 90})`} />
                 ))}
                 
                 {/* Pivot */}
                 <circle cx="0" cy="0" r="8" fill="#E5E7EB" stroke="none" />
                 <circle cx="0" cy="0" r="3" fill="#9CA3AF" stroke="none" />
              </g>
            </motion.g>

            {/* --- BALANCE WHEEL --- */}
            {/* Position: Bottom, Independent oscillation */}
            <motion.g 
              style={{ x: 300, y: 600 }}
              animate={{ rotate: [45, -45, 45] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <g filter="url(#gearShadow)">
                 {/* Rim with Screws */}
                 <circle cx="0" cy="0" r="120" stroke="currentColor" strokeWidth="2" />
                 
                 {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                    <circle key={i} cx="0" cy="-110" r="3" fill="currentColor" transform={`rotate(${deg})`} />
                 ))}

                 {/* Crossbar */}
                 <rect x="-110" y="-5" width="220" height="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                 
                 {/* Hairspring */}
                 <path 
                   d="M0 0 m 0 0 a 5 5 0 1 1 0 10 a 10 10 0 1 1 0 -20 a 15 15 0 1 1 0 30 a 20 20 0 1 1 0 -40 a 25 25 0 1 1 0 50 a 30 30 0 1 1 0 -60"
                   fill="none" 
                   stroke="currentColor" 
                   strokeWidth="1" 
                   opacity="0.8"
                 />
                 
                 {/* Shock Spring Jewel */}
                 <circle cx="0" cy="0" r="12" fill="#E5E7EB" />
                 <circle cx="0" cy="0" r="6" fill="#EF4444" opacity="0.6" /> {/* Ruby hint */}
              </g>
            </motion.g>

            {/* Connecting Bridge (Abstract Lines) */}
            <path d="M700 300 L460 300" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" opacity="0.3" />
            <path d="M460 300 L300 600" stroke="currentColor" strokeWidth="0.5" strokeDasharray="5 5" opacity="0.3" />
            
          </g>
        </svg>
      </div>
    </div>
  )
}
