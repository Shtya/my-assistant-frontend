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

                d: {
                    primary: {
                        DEFAULT: '#3b82f6', // lighter blue
                        light: '#60a5fa', // blue-400
                        dark: '#2563eb', // blue-600
                        hover: '#1d4ed8', // blue-700
                    },

                    secondary: {
                        DEFAULT: '#22c55e', // green-500
                        light: '#4ade80', // green-400
                        dark: '#15803d', // green-700
                        hover: '#166534', // green-800
                    },

                    background: {
                        DEFAULT: '#0f172a', // slate-900
                        soft: '#1e293b', // slate-800
                        subtle: '#334155', // slate-700
                        muted: '#475569', // slate-600
                    },

                    text: {
                        base: '#e2e8f0', // slate-200
                        muted: '#94a3b8', // slate-400
                        soft: '#64748b', // slate-500
                        inverse: '#0f172a',
                    },

                    border: {
                        DEFAULT: '#475569', // slate-600
                        hover: '#64748b', // slate-500
                        focus: '#3b82f6', // blue-500
                    },

                    success: {
                        DEFAULT: '#22c55e', // same
                        bg: '#052e16', // dark green bg
                        text: '#bbf7d0', // green-200
                    },

                    error: {
                        DEFAULT: '#ef4444', // same
                        bg: '#450a0a', // dark red bg
                        text: '#fecaca', // red-200
                    },

                    warning: {
                        DEFAULT: '#facc15', // same
                        bg: '#78350f', // amber-800
                        text: '#fef08a', // yellow-200
                    },

                    neutral: {
                        light: '#1e293b', // slate-800
                        medium: '#334155', // slate-700
                        dark: '#475569', // slate-600
                    },
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
