import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Design system - sunny greenland garden vibes
        'garden': {
          'cream': '#fef9f3',
          'gold': '#f4d35e',
          'beige': '#e8dcc8',
          'sage': '#a8c184',
          'mint': '#d4e8d4',
          'mint-light': '#e8f5e9',
          'olive': '#6b8e23',
          'forest': '#3d5a3d',
          'green-bright': '#7cb342',
          'text': '#2d3633',
          'text-muted': '#5a6b63',
        }
      },
      fontFamily: {
        'serif': ['Georgia', 'ui-serif', 'serif'],
        'sans': ['system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'display': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'heading': ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'subheading': ['1.125rem', { lineHeight: '1.3' }],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
        '3xl': '48px',
      },
      borderRadius: {
        'card': '16px',
        'button': '8px',
      },
      boxShadow: {
        'subtle': '0 4px 12px rgba(45, 54, 51, 0.08)',
        'card': '0 2px 8px rgba(45, 54, 51, 0.06)',
      },
      transitionDuration: {
        'micro': '80ms',
        'quick': '150ms',
        'smooth': '200ms',
      },
      keyframes: {
        'fade-rise': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float-glow': {
          '0%, 100%': { transform: 'translateY(0px)', opacity: '0.8' },
          '50%': { transform: 'translateY(-4px)', opacity: '1' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        'fade-rise': 'fade-rise 0.8s ease-out forwards',
        'fade-rise-delay': 'fade-rise 0.8s ease-out forwards 0.2s',
        'fade-rise-delay-2': 'fade-rise 0.8s ease-out forwards 0.4s',
        'float-glow': 'float-glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
}
export default config
