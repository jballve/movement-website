import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors from Movement Brand Manual
        'mvmt': {
          'dark': '#232120',      // Dark Grey - Primary dark
          'brown': '#5f504d',     // Cool Brown - Secondary
          'beige': '#e6dcd1',     // Beige - Accent/backgrounds
          'light': '#eceae6',     // Warm Light Grey - Background
        },
        // Semantic Colors
        'background': 'var(--background)',
        'background-elevated': 'var(--background-elevated)',
        'foreground': 'var(--foreground)',
        'foreground-muted': 'var(--foreground-muted)',
        'accent': 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'muted': 'var(--muted)',
        'border': 'var(--border)',
        'border-subtle': 'var(--border-subtle)',
      },
      boxShadow: {
        'theme-sm': 'var(--shadow-sm)',
        'theme-md': 'var(--shadow-md)',
        'theme-lg': 'var(--shadow-lg)',
      },
      fontFamily: {
        'heading': ['var(--font-jost)', 'sans-serif'],
        'body': ['var(--font-work-sans)', 'sans-serif'],
        'accent': ['var(--font-cormorant)', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      letterSpacing: {
        'widest': '0.2em',
      },
    },
  },
  plugins: [],
}

export default config
