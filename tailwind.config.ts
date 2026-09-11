import type { Config } from 'tailwindcss'

/**
 * Semantic colour tokens are stored as RGB channel triplets in CSS variables
 * (see app/globals.css) so Tailwind's opacity modifiers work: `bg-ink/10`,
 * `border-line/60`, `text-accent/80` all generate real CSS.
 */
const token = (name: string) => `rgb(var(${name}) / <alpha-value>)`

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: token('--c-paper'),
        surface: token('--c-surface'),
        'surface-2': token('--c-surface-2'),
        ink: token('--c-ink'),
        'ink-muted': token('--c-ink-muted'),
        accent: token('--c-accent'),
        line: token('--c-line'),
        'line-subtle': token('--c-line-subtle'),
        // Fixed brand values from the Movement brand manual
        mvmt: {
          dark: '#232120',
          brown: '#5f504d',
          beige: '#e6dcd1',
          light: '#eceae6',
        },
      },
      fontFamily: {
        heading: ['var(--font-jost)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['var(--font-work-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        accent: ['var(--font-cormorant)', 'Georgia', 'Times New Roman', 'serif'],
      },
      fontSize: {
        eyebrow: ['0.6875rem', { lineHeight: '1.2', letterSpacing: '0.18em', fontWeight: '500' }],
        display: ['clamp(2.5rem, 1.5rem + 4.2vw, 4.75rem)', { lineHeight: '1.04', letterSpacing: '-0.025em' }],
        h2: ['clamp(1.875rem, 1.3rem + 2.2vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        h3: ['1.375rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        lead: ['clamp(1.0625rem, 1rem + 0.35vw, 1.25rem)', { lineHeight: '1.6' }],
        body: ['1.0625rem', { lineHeight: '1.65' }],
        statement: ['clamp(1.75rem, 1.2rem + 2.4vw, 3.25rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      maxWidth: {
        content: '80rem',
        prose: '42rem',
      },
      spacing: {
        header: 'var(--header-h)',
        'section-y': 'var(--section-y)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      },
      transitionDuration: {
        '250': '250ms',
        '400': '400ms',
        '600': '600ms',
      },
      aspectRatio: {
        portrait: '4 / 5',
      },
    },
  },
  plugins: [],
}

export default config
