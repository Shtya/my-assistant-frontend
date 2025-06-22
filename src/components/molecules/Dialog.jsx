'use client';

import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export default function Dialog({ cn, open, width, height, onClose, title, children }) {
    const [show, setShow] = useState(open);
    const [mounted, setMounted] = useState(false);
    const modalRef = useRef(null);
    const [isChange, setIsChange] = useState(1);

    // Mount control
    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Show/hide control + body scroll
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

    // ESC close
    useEffect(() => {
        const handleEsc = e => {
            if (e.key === 'Escape') onClose?.();
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Scroll to top when opening modal
    useEffect(() => {
        if (open) {
            const scrollTimeout = setTimeout(() => {
                if (modalRef.current) {
                    modalRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }, 10); // small delay to allow rendering + animation

            return () => clearTimeout(scrollTimeout);
        }
    }, [open]);

    if (!mounted || !show) return null;

    const modalContent = (
        <div className='sticky top-0 h-screen inset-0 z-50 flex items-center justify-center'>
            <div className={`absolute inset-0 bg-black/60 backdrop-blur-[8px] transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
            <div
                ref={modalRef}
                className={` ${cn} z-10 duration-500 ease-in-out rounded-lg shadow-lg p-6 w-full bg-background-subtle text-text-base dark:bg-bg-1 dark:text-text-white scale-0 overflow-auto ${open ? '!scale-100' : ''}`}
                style={{
                    maxWidth: width || '600px',
                    height: height,
                    maxHeight: height || '690px',
                }}
                onClick={e => e.stopPropagation()}>
                {title ? (
                    <div className='flex items-center justify-between w-full mb-4'>
                        <h4 className='truncate w-full text-lg font-[600] ' title={title}>
                            {title}
                        </h4>
                        <X className='cursor-pointer text-error hover:rotate-90 hover:scale-110 duration-300' onClick={onClose} />
                    </div>
                ) : (
                    <X className='absolute top-[15px] right-[15px] cursor-pointer text-error hover:rotate-90 hover:scale-110 duration-300' onClick={onClose} />
                )}
                {children}
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
