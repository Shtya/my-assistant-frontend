'use client';
import { Loader2 } from 'lucide-react';

export default function Button({ label, onClick, color = 'primary', Icon, cn = '', loading = false }) {
    const colorVariants = {
        primary: 'btn-blue gradient',
        white: 'btn-white bg-gradient-to-t from-gray-50 to-gray-100',
        black: 'btn-black',
        red: 'btn-red bg-gradient-to-t from-error to-red-400',
        secondary: 'bg-secondary hover:bg-secondary-hover text-white',
        success: 'bg-success hover:bg-green-600 text-white',
        error: 'bg-error hover:bg-red-700 text-white',
        neutral: 'bg-neutral-light hover:bg-neutral-medium text-text-base',
    };

    const baseColor = colorVariants[color] || colorVariants['primary'];

    return (
        <button
            onClick={onClick}
            disabled={loading}
            className={` !rounded-md !h-[38px] !px-[15px] !gap-1 ${baseColor} ${loading ? 'opacity-70 cursor-not-allowed' : ''} ${cn} `}>
            {loading ? <Loader2 size={20} className='animate-spin' /> : Icon}
            {label}
        </button>
    );
}
