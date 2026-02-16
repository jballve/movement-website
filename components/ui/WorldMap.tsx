'use client'

import { useState, useEffect } from 'react'
import { ComposableMap, Geographies, Geography, Marker, useMapContext } from 'react-simple-maps'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Clock } from 'lucide-react'

// Map Data URL (CDN for reliability)
const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const offices = [
  {
    id: 'toronto',
    name: 'Toronto',
    label: 'North America',
    description: 'North American Headquarters',
    coordinates: [-79.3832, 43.6532] as [number, number], // Longitude, Latitude
    timeZone: 'America/Toronto'
  },
  {
    id: 'singapore',
    name: 'Singapore',
    label: 'Asia Pacific',
    description: 'Asia-Pacific Hub',
    coordinates: [103.8198, 1.3521] as [number, number],
    timeZone: 'Asia/Singapore'
  }
]

// Custom Line Component using Map Context for perfect Bezier control
const ConnectionLine = () => {
  const { projection } = useMapContext()
  
  if (!projection) return null

  const from = offices[0].coordinates
  const to = offices[1].coordinates
  
  // Project coordinates to SVG pixels
  const start = projection(from)
  const end = projection(to)

  if (!start || !end) return null

  const [x1, y1] = start
  const [x2, y2] = end

  // Calculate Control Point for a smooth overarching curve
  // We want it to arch "up" (North) relative to the map
  // Midpoint X
  const cx = (x1 + x2) / 2
  // Control Y: significantly higher than both points to create the arch
  // Since Singapore is far East and Toronto West, the midpoint is over Europe/Atlantic
  const cy = Math.min(y1, y2) - 100 

  return (
    <path
      d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`}
      fill="none"
      stroke="var(--map-primary)"
      strokeWidth={2}
      strokeLinecap="round"
      strokeDasharray="4 6"
      className="opacity-60 animate-dash-flow"
    />
  )
}

export default function WorldMap() {
  const [hoveredOffice, setHoveredOffice] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const getLocalTime = (tz: string) => {
    if (!mounted) return '--:--'
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: tz
    }).format(currentTime)
  }

  return (
    <div className="w-full h-full relative group bg-[var(--map-ocean)] border border-[var(--border)] overflow-hidden">
      
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 140,
          center: [20, 10] // Adjust center to show all continents nicely
        }}
        className="w-full h-full"
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="var(--map-land)"
                stroke="var(--background)"
                strokeWidth={0.5}
                style={{
                  default: { outline: 'none' },
                  hover: { fill: 'var(--border)', outline: 'none', transition: 'all 250ms' },
                  pressed: { outline: 'none' }
                }}
              />
            ))
          }
        </Geographies>

        {/* Custom Connection Line */}
        <ConnectionLine />

        {/* Markers with "Alive" Pulse */}
        {offices.map((office) => (
          <Marker 
            key={office.id} 
            coordinates={office.coordinates}
            onMouseEnter={() => setHoveredOffice(office.id)}
            onMouseLeave={() => setHoveredOffice(null)}
            className="cursor-pointer"
          >
            {/* Ripple Effect (Framer Motion) */}
            <motion.circle
              r={4}
              fill="transparent"
              stroke="var(--map-primary)"
              strokeWidth={1}
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            {/* Second Ripple for density */}
            <motion.circle
              r={4}
              fill="transparent"
              stroke="var(--map-primary)"
              strokeWidth={1}
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
                delay: 1, // Offset
              }}
            />
            
            {/* Core Pin */}
            <circle r={4} fill="var(--map-primary)" stroke="var(--background)" strokeWidth={1.5} />
            
            {/* Label */}
            <text
              textAnchor="middle"
              y={-12}
              className="font-sans text-[10px] font-bold tracking-[0.1em] uppercase fill-[var(--foreground)] opacity-70 pointer-events-none"
            >
              {office.name}
            </text>
          </Marker>
        ))}
      </ComposableMap>

      {/* Floating Tooltips (Overlay) */}
      <AnimatePresence>
        {offices.map((office) => (
          hoveredOffice === office.id && (
            <motion.div
              key={office.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute z-20 pointer-events-none"
              // Use a fixed position relative to the container based on approx Mercator or simply center it for now? 
              // React-simple-maps doesn't easily export pixel coords to parent div.
              // Strategy: Use a 'fixed' tooltip top/right or position strictly near the marker if possible.
              // Since we can't easily get pixel coords from RSM without using useZoomPanContext or similar,
              // we will position the tooltip nicely in the corner or use a simpler trick:
              // For now, let's put it at the bottom left/right of the map container, or top-right corner card.
              style={{
                top: 20,
                right: 20
              }}
            >
              <div className="bg-[var(--background-elevated)] border border-[var(--border)] shadow-[var(--shadow-lg)] p-4 min-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={12} className="text-[var(--map-primary)]" />
                  <span className="font-heading text-xs tracking-[0.15em] uppercase text-[var(--foreground)] font-bold">
                    {office.name}
                  </span>
                </div>
                <div className="h-px w-full bg-[var(--border)] mb-2" />
                <p className="font-body text-[11px] text-[var(--foreground-muted)] mb-2">
                  {office.description}
                </p>
                <div className="flex items-center justify-between text-[10px] text-[var(--foreground-muted)] uppercase tracking-wider">
                  <span>{office.label}</span>
                  <span className="flex items-center gap-1">
                    <Clock size={10} />
                    {getLocalTime(office.timeZone)}
                  </span>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>
    </div>
  )
}
