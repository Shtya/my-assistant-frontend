/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],

    prefix: '',
    theme: {
        extend: {
            colors: {
                'text-black': '#9b9b9b',
                'text-white': '#d4d4d4',
                primary: {
                    DEFAULT: '#2563EB', // blue-600
                    light: '#3b82f6', // blue-500
                    dark: '#1d4ed8', // blue-700
                    hover: '#1e40af', // blue-800
                },
                secondary: {
                    DEFAULT: '#166534', // deep green
                    light: '#22c55e', // green-500 (lighter accent)
                    dark: '#14532d', // green-900 (darker base)
                    hover: '#15803d', // green-700 (hover state)
                },
                background: {
                    DEFAULT: '#ffffff', // main white background
                    soft: '#f9fafb', // very light gray, section bg
                    subtle: '#f3f4f6', // input bg / lighter containers
                    muted: '#e5e7eb', // border-light or card background
                },
                text: {
                    base: '#111827', // almost-black for main text
                    muted: '#6b7280', // gray-500
                    soft: '#9ca3af', // gray-400
                    inverse: '#ffffff',
                },
                border: {
                    DEFAULT: '#d1d5db', // gray-300
                    hover: '#9ca3af', // gray-400
                    focus: '#2563eb', // blue-600
                },
                success: {
                    DEFAULT: '#22c55e', // green-500
                    bg: '#ecfdf5', // light green bg
                    text: '#065f46',
                },
                error: {
                    DEFAULT: '#ef4444', // red-500
                    bg: '#fef2f2',
                    text: '#991b1b',
                },
                warning: {
                    DEFAULT: '#facc15', // yellow-400
                    bg: '#fefce8',
                    text: '#92400e',
                },
                neutral: {
                    light: '#f3f4f6', // gray-100
                    medium: '#d1d5db', // gray-300
                    dark: '#4b5563', // gray-700
                },
            },
            animation: {
                'pulse-smooth': 'pulseSmooth 2s ease-in-out infinite',
            },
            keyframes: {
                pulseSmooth: {
                    '0%, 100%': { opacity: '0.4' },
                    '50%': { opacity: '1' },
                },
            },
        },
        container: {
            center: true,
            padding: '2rem',

            screens: {
                '2xl': '1400px',
            },
            extend: {
                colors: {
                    primary: '#1E328B',
                },
            },
        },
    },

    mode: 'jit',
};
