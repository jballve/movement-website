'use client'

import { useId, useState, type FormEvent } from 'react'
import { ArrowRight } from 'lucide-react'
import { contact } from '@/data/content'
import { contactEmail, web3formsAccessKey } from '@/lib/site'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const TIMEOUT_MS = 15_000

export default function ContactForm() {
  const id = useId()
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    // Honeypot: real visitors never see or tick this field.
    if (data.get('botcheck')) return

    setStatus('submitting')
    const controller = new AbortController()
    const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS)

    const inquiry = String(data.get('inquiry') ?? '')
    const inquiryLabel = contact.form.inquiryTypes.find((t) => t.value === inquiry)?.label ?? inquiry

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          access_key: web3formsAccessKey,
          subject: `[Movement] Website inquiry — ${inquiryLabel}`,
          from_name: 'Movement website',
          name: data.get('name'),
          email: data.get('email'),
          replyto: data.get('email'),
          company: data.get('company') || '—',
          inquiry: inquiryLabel,
          message: data.get('message'),
        }),
      })
      const result = (await response.json()) as { success?: boolean }
      if (response.ok && result.success) {
        setStatus('success')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      window.clearTimeout(timer)
    }
  }

  if (status === 'success') {
    return (
      <div role="status" aria-live="polite" className="border-t border-ink pt-8">
        <p className="eyebrow">{contact.form.eyebrow}</p>
        <h3 className="mt-5 text-h3 font-medium text-ink">{contact.form.successTitle}</h3>
        <p className="mt-3 max-w-prose text-ink-muted">{contact.form.successBody}</p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="link-draw mt-8 text-sm font-medium text-ink"
        >
          Send another message
        </button>
      </div>
    )
  }

  const labelClass = 'eyebrow block'
  const groupClass = 'block'

  return (
    <form onSubmit={handleSubmit} noValidate={false} className="border-t border-ink pt-8">
      <p className="eyebrow">{contact.form.eyebrow}</p>

      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        <label htmlFor={`${id}-name`} className={groupClass}>
          <span className={labelClass}>
            Name <span aria-hidden className="text-accent">*</span>
          </span>
          <input id={`${id}-name`} name="name" type="text" required autoComplete="name" className="field mt-2" />
        </label>

        <label htmlFor={`${id}-company`} className={groupClass}>
          <span className={labelClass}>Company</span>
          <input id={`${id}-company`} name="company" type="text" autoComplete="organization" className="field mt-2" />
        </label>

        <label htmlFor={`${id}-email`} className={groupClass}>
          <span className={labelClass}>
            Email <span aria-hidden className="text-accent">*</span>
          </span>
          <input id={`${id}-email`} name="email" type="email" required autoComplete="email" inputMode="email" className="field mt-2" />
        </label>

        <label htmlFor={`${id}-inquiry`} className={groupClass}>
          <span className={labelClass}>I am</span>
          <select id={`${id}-inquiry`} name="inquiry" defaultValue="owner" className="field mt-2">
            {contact.form.inquiryTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor={`${id}-message`} className={cn(groupClass, 'sm:col-span-2')}>
          <span className={labelClass}>
            Message <span aria-hidden className="text-accent">*</span>
          </span>
          <textarea
            id={`${id}-message`}
            name="message"
            required
            rows={5}
            maxLength={4000}
            className="field mt-2 resize-y"
            placeholder="Tell us briefly about the business and the situation."
          />
        </label>
      </div>

      {/* Honeypot for automated submissions */}
      <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="group/btn inline-flex shrink-0 items-center justify-center gap-3 whitespace-nowrap border border-ink bg-ink px-6 py-3.5 text-[0.875rem] font-medium tracking-[0.02em] text-paper transition-colors duration-250 hover:bg-transparent hover:text-ink disabled:cursor-wait disabled:opacity-60 disabled:hover:bg-ink disabled:hover:text-paper"
        >
          {status === 'submitting' ? 'Sending…' : contact.form.submitLabel}
          <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-250 group-hover/btn:translate-x-0.5" strokeWidth={1.75} />
        </button>
        <p className="text-[0.8125rem] text-ink-muted">
          <span aria-hidden className="text-accent">*</span> Required. Your details are used only to respond to your enquiry.
        </p>
      </div>

      <div role="alert" aria-live="assertive" className={cn('mt-6 text-[0.9375rem] text-ink', status !== 'error' && 'hidden')}>
        {status === 'error' && (
          <p className="border-l-2 border-accent pl-4">
            {contact.form.errorBody}{' '}
            <a href={`mailto:${contactEmail}`} className="link-underline">
              {contactEmail}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  )
}
