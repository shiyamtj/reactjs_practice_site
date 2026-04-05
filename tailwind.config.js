/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        // Brand Colors
        'brand-primary': '#667eea',
        'brand-primary-dark': '#5a67d8',
        'brand-primary-light': '#7c8ff9',
        'brand-secondary': '#764ba2',
        'brand-secondary-dark': '#6b4299',
        'brand-secondary-light': '#8e5cad',
        
        // Text Colors
        'text-primary': '#2c3e50',
        'text-secondary': '#5a6c7d',
        'text-muted': '#6b7280',
        'text-light': '#9ca3af',
        'text-white': '#ffffff',
        
        // Background Colors
        'bg-primary': '#ffffff',
        'bg-secondary': '#f8fafc',
        'bg-tertiary': '#f1f5f9',
        'bg-quaternary': '#f3f4f6',
        'bg-dark': '#2c3e50',
        'bg-darker': '#1a252f',
        
        // Surface Colors
        'surface-elevated': '#ffffff',
        'surface-hover': '#f9fafb',
        'surface-active': '#f1f5f9',
        'surface-selected': '#ede9fe',
        'surface-border': '#e5e7eb',
        'surface-border-light': '#f3f4f6',
        'surface-border-dark': '#d1d5db',
        
        // Accent Colors
        'accent-primary': '#667eea',
        'accent-primary-hover': '#5a67d8',
        'accent-secondary': '#3498db',
        'accent-secondary-hover': '#2980b9',
        'accent-success': '#10b981',
        'accent-success-hover': '#059669',
        'accent-warning': '#f59e0b',
        'accent-warning-hover': '#d97706',
        'accent-error': '#ef4444',
        'accent-error-hover': '#dc2626',
        
        // State Colors
        'state-focus': '#3b82f6',
        'state-disabled': '#9ca3af',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'brand-gradient-hover': 'linear-gradient(135deg, #5a67d8 0%, #6b4299 100%)',
        'brand-gradient-light': 'linear-gradient(135deg, #7c8ff9 0%, #8e5cad 100%)',
        'hero-gradient': 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      },
      boxShadow: {
        'custom-sm': 'rgba(0, 0, 0, 0.05) 0 1px 2px 0',
        'custom-md': 'rgba(0, 0, 0, 0.1) 0 4px 6px -1px, rgba(0, 0, 0, 0.06) 0 2px 4px -1px',
        'custom-lg': 'rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px',
        'custom-xl': 'rgba(0, 0, 0, 0.15) 0 20px 25px -5px, rgba(0, 0, 0, 0.1) 0 10px 10px -5px',
        'brand': 'rgba(102, 126, 234, 0.3) 0 10px 20px',
        'brand-hover': 'rgba(102, 126, 234, 0.4) 0 15px 25px',
      },
      fontFamily: {
        'sans': ['system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
        'mono': ['ui-monospace', 'Consolas', 'monospace'],
      },
      maxWidth: {
        'container': '1126px',
        'header': '1400px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      backdropBlur: {
        'custom': '10px',
      },
    },
  },
  plugins: [],
}
