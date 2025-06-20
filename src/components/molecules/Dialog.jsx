'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export default function Dialog({ open, width, height, onClose, title, children }) {
    const [show, setShow] = useState(open);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        const body = document.body;
        const main = document.querySelector('.body');

        if (open) {
            setShow(true);
            body.style.overflow = 'hidden';
            main?.classList.add('modal-active');
        } else {
            const timeout = setTimeout(() => setShow(false), 300);
            body.style.overflow = '';
            return () => clearTimeout(timeout);
        }

        return () => {
            body.style.overflow = '';
            main?.classList.remove('modal-active');
        };
    }, [open]);

    useEffect(() => {
        const handleEsc = e => {
            if (e.key === 'Escape') onClose?.();
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!mounted || !show) return null;

    const modalContent = (
        <div className={`sticky top-0 h-screen inset-0 z-50 flex items-center justify-center`}>
            <div className={`absolute inset-0 bg-black/60 backdrop-blur-[8px] transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
            <div
                className={` z-10 duration-500 ease-in-out rounded-lg shadow-lg p-6 w-full  bg-background-subtle text-text-base dark:bg-bg-1 dark:text-text-white scale-0  overflow-auto ${open ? '!scale-100' : ''} `}
                style={{ maxWidth: width || '600px', maxHeight: height || '690px' }}
                onClick={e => e.stopPropagation()}>
                <div className='flex items-center justify-between w-full mb-4'>
                    <h4 className='truncate w-full' title={title}>
                        {title}
                    </h4>
                    <X className='cursor-pointer text-error hover:rotate-90 hover:scale-110 duration-300' onClick={onClose} />
                </div>
                {children}
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
