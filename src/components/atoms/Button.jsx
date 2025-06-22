'use client';
import { Loader2 } from 'lucide-react';

export default function Button({ title="" , infoTooltip , label, onClick, color = 'primary', Icon, cn = '', loading = false }) {
    const colorVariants = {
        primary: 'btn-blue gradient',
        white: ' !bg-transparent btn-white ',
        black: 'btn-black',
        red: 'btn-red bg-gradient-to-t from-error to-red-400',
        secondary: 'bg-secondary hover:bg-secondary-hover text-white',
        success: 'bg-success hover:bg-green-600 text-white',
        error: 'bg-error hover:bg-red-700 text-white',
        neutral: 'bg-neutral-100 hover:!bg-neutral-200  text-text-base',
    };

    const baseColor = colorVariants[color] || colorVariants['primary'];

    return (
        <button
            title={title}
            onClick={onClick}
            disabled={loading}
            style={{transition : ".3s" }}
            className={`relative group shadow-inner !rounded-md min-w-11 !h-[35px] !px-[10px] !gap-1   ${baseColor} ${loading ? 'opacity-70 cursor-not-allowed' : ''} ${cn} `}>
            {loading ? <Loader2 size={20} className='animate-spin' /> : Icon}
            {label}
            {infoTooltip && <span className="absolute top-[1px] right-[1px] " > {infoTooltip} </span> }
        </button>
    );
}
