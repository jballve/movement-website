'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

interface LogoProps {
  variant?: 'full' | 'mark' | 'text'
  className?: string
  color?: 'dark' | 'light' | 'brown' | 'auto'
}

export default function Logo({ variant = 'full', className, color = 'auto' }: LogoProps) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Asset paths
  const assets = {
    mark: {
      light: '/assets/logos/Movement_Mark_White.png',
      dark: '/assets/logos/Movement_Mark_Black.png', 
    },
    full: {
      light: '/assets/logos/Movement_Logo_Tagline_White.png',
      dark: '/assets/logos/Movement_Logo_Tagline_Black.png',
    }
  }

  if (!mounted) {
    // Return a stable placeholder or null during server-side rendering/hydration
    // Using a simple div with aspect ratio to prevent layout shift
    return <div className={cn('relative aspect-[3/1]', className)} />
  }

  // Determine which logo to show
  // If color is 'auto', we decide based on the current theme
  // 'light' theme needs 'dark' logo (black text on white bg)
  // 'dark' theme needs 'light' logo (white text on dark bg)
  
  let useLightLogo = false // Default to dark logo (for light backgrounds)

  if (color === 'light') {
    useLightLogo = true
  } else if (color === 'dark') {
    useLightLogo = false
  } else if (color === 'auto') {
    // In auto mode, we invert: Dark Mode = Light Logo, Light Mode = Dark Logo
    useLightLogo = resolvedTheme === 'dark'
  }

  // Mark Only (Monogram)
  if (variant === 'mark') {
    return (
      <div className={cn('relative aspect-square', className)} style={{ filter: 'none', boxShadow: 'none' }}>
        <Image
          src={useLightLogo ? assets.mark.light : assets.mark.dark}
          alt="Movement Monogram"
          fill
          className="object-contain"
          priority
          style={{ filter: 'none', boxShadow: 'none' }}
        />
      </div>
    )
  }

  // Full Logo (Wordmark + Tagline)
  if (variant === 'full') {
    return (
      <div className={cn('relative aspect-[3/1]', className)}>
        <Image
          src={useLightLogo ? assets.full.light : assets.full.dark}
          alt="Movement Logo"
          fill
          className="object-contain object-left"
          priority
        />
      </div>
    )
  }

  return null
}
