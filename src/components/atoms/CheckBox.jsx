'use client';

import React, { useRef, useEffect } from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CheckBox({ sound = true, colorUncheckd = 'text-gray-300', checked, onToggle, size = 25, className = '', color = 'text-primary', label, passProps }) {
    const checkSoundRef = useRef(null);
    const uncheckSoundRef = useRef(null);

    // Create sound elements on mount
    useEffect(() => {
        checkSoundRef.current = new Audio('/sounds/check.wav');
        uncheckSoundRef.current = new Audio('/sounds/check.wav');
    }, []);

    const handleToggle = () => {
        if (!sound) return;

        // Play appropriate sound
        if (checked) {
            uncheckSoundRef.current?.play().catch(() => {});
        } else {
            checkSoundRef.current?.play().catch(() => {});
        }
    };
    return (
        <button
            onClick={e => {
                onToggle(e);
                handleToggle();
            }}
            className={`flex items-center gap-2 text-gray-500 focus:outline-none ${className}`}
            {...passProps}>
            <AnimatePresence mode='wait'>
                {checked ? (
                    <motion.div
                        key='checked'
                        initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 0.5, opacity: 0, rotate: 20 }}
                        transition={{ duration: 0.2 }}
                        whileTap={{
                            rotate: [0, -10, 10, -5, 5, 0], // shake animation
                            transition: { duration: 0.4 },
                        }}>
                        <CheckCircle className={color} width={size} height={size} />
                    </motion.div>
                ) : (
                    <motion.div key='unchecked' initial={{ scale: 0.5, opacity: 0, rotate: 20 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} exit={{ scale: 0.5, opacity: 0, rotate: -20 }} transition={{ duration: 0.2 }}>
                        <Circle className={colorUncheckd} width={size} height={size} />
                    </motion.div>
                )}
            </AnimatePresence>

            {label && <span className='text-sm text-gray-700 select-none'>{label}</span>}
        </button>
    );
}
