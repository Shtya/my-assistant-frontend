'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Select({ label, options, value, cnSelect, onChange, placeholder = 'Select an option', defaultValue = null, className = '', dirOpen = 'down' }) {
    const [open, setOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(value || defaultValue || null);

    useEffect(() => {
        if (value) {
            setInternalValue(value);
        }
    }, [value]);

    // Initialize with defaultValue if no controlled value is given
    useEffect(() => {
        if (!value && defaultValue) {
            setInternalValue(defaultValue);
            if (onChange) onChange(defaultValue);
        }
    }, [defaultValue]);

    const handleSelect = option => {
        if (!value) setInternalValue(option);
        onChange?.(option);
        setOpen(false);
    };

    return (
        <div className={`relative z-[1000] w-full space-y-1 ${className}`}>
            {label && <label className='text-sm font-medium text-text-base'>{label}</label>}

            <button onClick={() => setOpen(prev => !prev)} className={`${cnSelect} w-full border border-border/80 shadow-inner rounded-md px-2 h-8 flex items-center justify-between gap-2 bg-background-soft hover:bg-background-subtle duration-300 transition `}>
                <span className='text-text-base truncate'>{internalValue?.label || placeholder}</span>
                <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            <div className={`absolute ${dirOpen === 'top' ? 'bottom-full !mb-[-25px]' : ''} left-0 w-full mt-1 rounded bg-white border border-border shadow-lg z-10 transition-all duration-200 ease-in-out origin-top ${open ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
                {options.map(option => (
                    <button key={option.key} onClick={() => handleSelect(option)} className={`w-full text-left px-2 text-xs  py-2 text-text-base hover:bg-background-muted transition ${internalValue?.key === option.key ? 'bg-background-muted font-semibold' : ''}`}>
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
