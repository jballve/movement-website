'use client'

import { motion } from 'framer-motion'
import { Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import { offices, footer, siteConfig } from '@/data/content'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'

export default function Footer() {
  return (
    <footer className="bg-mvmt-dark text-mvmt-light border-t border-mvmt-brown/30">
      <div className="container-custom section-padding">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
        >
          {/* Logo & Tagline */}
          <motion.div variants={staggerItem} className="lg:col-span-1">
            <div className="mb-6">
              <Logo variant="full" color="light" />
            </div>
            <p className="font-body text-sm text-mvmt-beige max-w-xs mb-4">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-2">
              <motion.div
                className="w-1.5 h-1.5 bg-accent"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="system-text text-mvmt-beige font-medium">System Online</span>
            </div>
          </motion.div>

          {/* Office Locations */}
          {offices.map((office, index) => (
            <motion.div key={office.city} variants={staggerItem}>
              <div className="flex items-center gap-2 mb-4">
                <h4 className="font-heading text-sm tracking-[0.2em] uppercase text-mvmt-light font-semibold">
                  {office.city}
                </h4>
                <span className="font-accent italic text-lg text-mvmt-light/80">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <p className="system-text text-mvmt-beige mb-3 font-medium">{office.label}</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="font-body text-sm text-mvmt-light">Active</span>
              </div>
            </motion.div>
          ))}

          {/* Contact & Social */}
          <motion.div variants={staggerItem}>
            <h4 className="font-heading text-sm tracking-[0.2em] uppercase mb-4 text-mvmt-light">
              Connect
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:contact@invest-movement.com"
                className="flex items-center gap-3 text-sm text-mvmt-beige hover:text-accent transition-colors duration-500 group"
              >
                <div className="w-8 h-8 border border-mvmt-brown flex items-center justify-center group-hover:border-accent transition-colors duration-500">
                  <Mail className="h-4 w-4" />
                </div>
                contact@invest-movement.com
              </a>
              <a
                href="https://www.linkedin.com/company/movement-investment-firm/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-mvmt-beige hover:text-accent transition-colors duration-500 group"
              >
                <div className="w-8 h-8 border border-mvmt-brown flex items-center justify-center group-hover:border-accent transition-colors duration-500">
                  <Linkedin className="h-4 w-4" />
                </div>
                LinkedIn
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar - System Status Style */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-mvmt-brown/50"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <p className="system-text text-mvmt-beige/70">
                {footer.copyright}
              </p>
              <span className="system-text text-mvmt-beige/50 hidden md:inline">|</span>
              <span className="system-text text-mvmt-beige/70 hidden md:inline">Crafted with Precision</span>
            </div>
            <div className="flex gap-6">
              {footer.links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="system-text text-mvmt-beige/70 hover:text-accent transition-colors duration-500 premium-underline"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
