'use client';

import { useEffect, useRef, useState } from 'react';

export default function Input({ unite = '', label, type = 'text', value, onChange, onEnter, placeholder = '', cn = '', autoFocus = false, min, max }) {
    const inputRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (autoFocus && inputRef.current) {
            inputRef.current.focus();
            setIsFocused(true);
        }
    }, [autoFocus]);

    const handleKeyDown = e => {
        if (e.key === 'Enter' && typeof onEnter === 'function') {
            onEnter();
        }
    };

    const handleChange = e => {
        let val = e.target.value;

        if (type === 'number') {
            const num = Number(val);
            if (min !== undefined && num < min) return;
            if (max !== undefined && num > max) return;
        }

        onChange(val);
    };

    const shouldFloat = isFocused || value;

    return (
        <div className={`relative group h-[40px] w-full ${cn}`}>
            {label && (
                <label
                    className={`rounded-full z-[2] absolute left-3 pointer-events-none transition-all duration-300 ease-in-out px-1 bg-background-subtle
            ${shouldFloat ? 'top-[-10px] left-[5px] !bg-transparent text-primary text-sm' : 'top-1/2 -translate-y-1/2 text-base text-text-soft'}
          `}>
                    {label}
                </label>
            )}

            {unite && <span className='absolute right-3 top-1/2 -translate-y-1/2 text-primary-light  text-sm pointer-events-none'>{unite}</span>}
            {label && <span className={` absolute top-0 mt-[-.2px]  bg-white h-[2px] overflow-hidden left-[5px] px-[2px] z-[1] duration-500 ${shouldFloat ? " " : "w-0 !px-0 " }`} > {label} </span>}
            
            <input
                ref={inputRef}
                type={type}
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={!label ? placeholder : ''}
                min={type === 'number' ? min : undefined}
                max={type === 'number' ? max : undefined}
                className={`w-full pr-10 p-2 h-full rounded border outline-none duration-300 text-text-base placeholder:text-text-soft
          ${shouldFloat ? 'border-primary !bg-white ' : 'bg-background-subtle border-border hover:border-border-hover'}
        `}
            />
        </div>
    );
}
