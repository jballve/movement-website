'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { contactSection } from '@/data/content'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'
import WorldMap from '@/components/ui/WorldMap'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    inquiryType: 'general',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Direct client-side submission to Web3Forms to avoid server-side blocking
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'bde5cb53-0516-44b4-abac-f71150176793',
          subject: `[Movement] New Inquiry: ${formData.inquiryType}`,
          from_name: 'Movement Website',
          ...formData
        }),
      })

      const data = await response.json()

      if (data.success) {
        setIsSubmitted(true)
        // Reset after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({
            name: '',
            company: '',
            email: '',
            inquiryType: 'general',
            message: '',
          })
        }, 3000)
      } else {
        console.error('Submission failed', data)
        alert(`Failed to send message: ${data.message || 'Please try again later.'}`)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="section-padding bg-muted relative">
      {/* Decorative accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="container-custom">
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
            {contactSection.accent}
          </motion.p>

          <motion.h2
            variants={fadeInUp}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-6 text-foreground"
          >
            {contactSection.headline}
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="font-body text-base md:text-lg text-foreground-muted max-w-2xl mx-auto"
          >
            {contactSection.description}
          </motion.p>
        </motion.div>

        {/* Contact Form - Centered */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mx-auto mb-24"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block font-body text-sm tracking-wide mb-2 text-foreground-muted"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-sm font-body text-sm text-foreground focus:border-accent focus:outline-none transition-colors placeholder:text-foreground-muted/50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="block font-body text-sm tracking-wide mb-2 text-foreground-muted"
                >
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-sm font-body text-sm text-foreground focus:border-accent focus:outline-none transition-colors placeholder:text-foreground-muted/50"
                  placeholder="Your company"
                />
              </div>
            </motion.div>

            <motion.div variants={staggerItem} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="email"
                  className="block font-body text-sm tracking-wide mb-2 text-foreground-muted"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-background border border-border rounded-sm font-body text-sm text-foreground focus:border-accent focus:outline-none transition-colors placeholder:text-foreground-muted/50"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label
                  htmlFor="inquiryType"
                  className="block font-body text-sm tracking-wide mb-2 text-foreground-muted"
                >
                  Inquiry Type
                </label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-background border border-border rounded-sm font-body text-sm text-foreground focus:border-accent focus:outline-none transition-colors appearance-none cursor-pointer"
                >
                  <option value="general">General Inquiry</option>
                  <option value="rollup">Industrial Rollup / Consolidation</option>
                  <option value="lender">Lender Portfolio Solution</option>
                  <option value="recapitalization">Strategic Recapitalization</option>
                  <option value="turnaround">Turnaround & Special Situations</option>
                  <option value="careers">Careers</option>
                </select>
              </div>
            </motion.div>

            <motion.div variants={staggerItem}>
              <label
                htmlFor="message"
                className="block font-body text-sm tracking-wide mb-2 text-foreground-muted"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-background border border-border rounded-sm font-body text-sm text-foreground focus:border-accent focus:outline-none transition-colors resize-none placeholder:text-foreground-muted/50"
                placeholder="Tell us about your inquiry..."
              />
            </motion.div>

            <motion.div variants={staggerItem}>
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="btn-industrial group flex items-center gap-3 w-full sm:w-auto justify-center"
              >
                {isSubmitted ? (
                  'Transmission Complete'
                ) : isSubmitting ? (
                  'Transmitting...'
                ) : (
                  <>
                    Initiate Contact
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </motion.div>
          </form>
        </motion.div>

        {/* Global Presence Section - New Layout */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="border-t border-border/40 pt-16 lg:pt-24"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Side: Title & Info */}
            <div className="lg:col-span-4 space-y-8">
              <motion.div variants={fadeInUp}>
                <span className="font-body text-[10px] tracking-[0.3em] uppercase text-accent mb-3 block">
                  Global Reach
                </span>
                <h3 className="font-heading text-3xl lg:text-4xl tracking-tight text-foreground mb-4">
                  Global Presence
                </h3>
                <p className="font-body text-base text-foreground-muted leading-relaxed">
                  Strategically located offices connecting North America and Asia. We operate across time zones to deliver seamless execution for our partners.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="space-y-6">
                <div>
                  <h4 className="font-heading text-sm tracking-[0.15em] uppercase text-foreground mb-2">Toronto</h4>
                  <p className="font-body text-sm text-foreground-muted mb-1">North American Headquarters</p>
                  <a href="mailto:toronto@invest-movement.com" className="font-body text-sm text-accent hover:text-foreground transition-colors duration-300 inline-block border-b border-accent/30 hover:border-accent">
                    toronto@invest-movement.com
                  </a>
                </div>
                <div>
                  <h4 className="font-heading text-sm tracking-[0.15em] uppercase text-foreground mb-2">Singapore</h4>
                  <p className="font-body text-sm text-foreground-muted mb-1">Asia-Pacific Hub</p>
                  <a href="mailto:singapore@invest-movement.com" className="font-body text-sm text-accent hover:text-foreground transition-colors duration-300 inline-block border-b border-accent/30 hover:border-accent">
                    singapore@invest-movement.com
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Right Side: World Map */}
            <motion.div variants={fadeInUp} className="lg:col-span-8 w-full">
              <WorldMap />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
