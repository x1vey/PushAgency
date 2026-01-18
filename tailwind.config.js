/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern SaaS color palette - premium deep blues with teal accents
        primary: {
          DEFAULT: '#F97316', // Warm Coral - primary CTAs
          dark: '#EA580C',
          light: '#FB923C',
        },
        accent: {
          DEFAULT: '#0EA5E9', // Vibrant Teal
          dark: '#0284C7',
          light: '#38BDF8',
          bright: '#22D3EE', // Cyan Glow
        },
        ocean: {
          deep: '#0A0F1C', // Deep Space Blue
          midnight: '#111827', // Midnight Blue
          slate: '#1E293B', // Slate Blue
          steel: '#334155', // Steel Blue
          mist: '#475569', // Blue Mist
        },
        dark: {
          DEFAULT: '#0A0F1C', // Deep Space Blue
          blue: '#0F172A', // Dark navy tint
          light: '#111827', // Midnight Blue
          lighter: '#1E293B', // Slate Blue
          border: '#334155', // Steel Blue border
        },
        surface: {
          DEFAULT: '#111827', // Card Surface - Midnight Blue
          light: '#1E293B', // Elevated Surface - Slate Blue
          glass: 'rgba(14, 165, 233, 0.08)', // Glass surface with teal tint
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
        'reveal': 'reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(14, 165, 233, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(14, 165, 233, 0.5)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'bounce-soft': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}
