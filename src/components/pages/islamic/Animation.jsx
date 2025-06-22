'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Animation({ children }) {
    return (
        <div className='relative overflow-hidden min-h-[80px]'>
            <AnimatePresence mode='wait'>
                <motion.div key={children} initial={{ opacity: 0, rotateX: 90 }} animate={{ opacity: 1, rotateX: 0 }} exit={{ opacity: 0, rotateX: -90 }} transition={{ duration: 0.5 }} className=''>
                    {children}
                </motion.div>

                {/* <motion.div
                    key={children}
                    initial={{ opacity: 0, y: -100, scale: 0.3, rotate: -20 }}
                    animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, y: 100, scale: 0.3, rotate: 20 }}
                    transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                        duration: 0.6,
                    }}
                    className='card mb-4 text-center space-y-2 origin-center shadow-xl '>
                    {children}
                </motion.div> */}
            </AnimatePresence>
        </div>
    );
}
