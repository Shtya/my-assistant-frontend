'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function Input2({ autoFocus = false , label, value, onEnter, onChange, type = 'text', placeholder = '', className = '' }) {
    const inputRef = useRef(null);

    useEffect(() => {
        if (autoFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [autoFocus]);

    const handleKeyDown = e => {
        if (e.key === 'Enter' && typeof onEnter === 'function') {
            onEnter();
        }
    };

    return (
        <div className='w-full space-y-1'>
            {label && <label className='block text-sm font-medium text-gray-700 mb-1'>{label}</label>}
            <input ref={inputRef} onKeyDown={handleKeyDown} type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={`w-full px-4 py-2 border border-border !bg-transparent  rounded-[5px] focus:outline-none focus:ring-2 focus:ring-primary/50 transition text-sm ${className}`} />
        </div>
    );
}
