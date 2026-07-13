import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        noir: {
          DEFAULT: '#080808',
          muted: '#111111',
          soft: '#1b1b1f'
        },
        neon: {
          red: '#ff2f55',
          green: '#39ff14',
          white: '#f2f2f2'
        }
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-sans)']
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,47,85,0.3), 0 0 30px rgba(255,47,85,0.2)'
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        'pulse-soft': 'pulse-soft 2.5s ease-in-out infinite'
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'pulse-soft': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 47, 85, 0.25)' },
          '50%': { boxShadow: '0 0 0 12px rgba(255, 47, 85, 0)' }
        }
      }
    }
  },
  plugins: []
}

export default config;
