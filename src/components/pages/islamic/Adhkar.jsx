'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import adhkarData from '@/data/adhkar.json';
import { Expand, Minimize } from 'lucide-react';

export default function Adhkar() {
    const [activeCategory, setActiveCategory] = useState('morning');
    const [expandedItems, setExpandedItems] = useState({});
    const [counters, setCounters] = useState({});
    const [fullScreenMode, setFullScreenMode] = useState(false);

    useEffect(() => {
        const initialCounters = {};
        adhkarData.adhkar.forEach(item => {
            initialCounters[item.dhikr] = 0;
        });
        setCounters(initialCounters);
    }, []);

    const toggleExpanded = index => {
        setExpandedItems(prev => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const toggleFullScreen = () => {
        setFullScreenMode(!fullScreenMode);
    };

    const filteredAdhkar = adhkarData.adhkar.filter(item => item.category.includes(activeCategory));

    const getCategoryName = category => {
        const names = {
            morning: 'أذكار الصباح',
            evening: 'أذكار المساء',
            sleep: 'أذكار النوم',
            prayer: 'أذكار الصلاة',
        };
        return names[category] || category;
    };

    const bar = ['morning', 'evening', 'sleep', 'prayer'];

    return (
        <>
            <div className={`bg-white  rounded-lg shadow max-md:!px-2 p-6 ${fullScreenMode ? 'fixed inset-0 z-50 overflow-y-auto' : 'relative'}`}>
                {/* Full screen toggle button */}
                <button onClick={toggleFullScreen} className={`absolute top-2 left-2  md:top-4 md:left-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10 ${fullScreenMode ? 'text-primary' : 'text-gray-600'}`} aria-label={fullScreenMode ? 'Minimize' : 'Expand'}>
                    {fullScreenMode ? <Minimize size={20}  className="max-md:!w-4 " /> : <Expand size={20} className="max-md:!w-4 "  />}
                </button>

                <h1 className='text-center mb-3 text-xl md:text-2xl font-semibold text-primary'>{getCategoryName(activeCategory)}</h1>

                <div className='flex flex-wrap gap-2 mb-6 justify-center'>
                    {bar.map(category => (
                        <button key={category.id} onClick={() => setActiveCategory(category)} className={`px-2 md:px-4 border border-border/70 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 whitespace-nowrap ${activeCategory === category ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-md' : 'bg-white/70 text-gray-600 hover:bg-gray-100 shadow-sm'}`}>
                            <span className='flex items-center gap-1.5'>{getCategoryName(category)}</span>
                        </button>
                    ))}
                </div>

                <AnimatePresence mode='wait'>
                    <motion.div key={activeCategory} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className={`space-y-6 ${fullScreenMode ? 'max-w-4xl mx-auto' : ''}`}>
                        <div className='space-y-5'>
                            {filteredAdhkar.map((item, index) => (
                                <motion.div key={item.dhikr + index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className='group relative'>
                                    {/* 3D Container */}
                                    <div className={` -mx-4 relative rounded-xl max-md:p-2 p-5 transition-all duration-300 bg-white/80 border border-gray-100 shadow-[5px_5px_10px_rgba(184,185,190,0.2),-5px_-5px_10px_rgba(255,255,255,0.8)] hover:shadow-[7px_7px_15px_rgba(184,185,190,0.3),-7px_-7px_15px_rgba(255,255,255,0.9)] active:shadow-[inset_3px_3px_5px_rgba(184,185,190,0.2),inset_-3px_-3px_5px_rgba(255,255,255,0.8)] `}>
                                        {/* 3D Accent Bar */}
                                        <div className={` max-md:hidden absolute top-0 left-0 h-full max-md:w-1 w-1.5 rounded-l-lg bg-gradient-to-b from-primary to-secondary shadow-[2px_0_3px_rgba(0,0,0,0.1)] `}></div>

                                        {/* Content */}
                                        <div className='flex flex-col gap-4 max-md:pl-1 pl-4'>
                                            {/* Arabic Text */}
                                            <p className={` text-center text-xl max-md:text-base font-medium text-gray-800  leading-relaxed tracking-wide arabic-text transition-all duration-300 `}>{item.dhikr}</p>

                                            {/* Benefits Box */}
                                            {item.benefits && (
                                                <motion.div onClick={() => toggleExpanded(index)} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className={` mx-auto w-full px-4 py-3 rounded-lg cursor-pointer  transition-all duration-300 text-sm bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 shadow-[3px_3px_6px_rgba(210,180,140,0.2),-3px_-3px_6px_rgba(255,255,255,0.8)] hover:shadow-[4px_4px_8px_rgba(210,180,140,0.3),-4px_-4px_8px_rgba(255,255,255,0.9)] ${expandedItems[index] ? '' : 'truncate line-clamp-1'} `}>
                                                    <div className='flex items-center justify-start gap-2 text-yellow-800'>
                                                        <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
                                                        </svg>
                                                        <span>{item.benefits}</span>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </div>

                                        {/* 3D Bottom Highlight */}
                                        <div className={` absolute bottom-0 left-0 w-full h-1 rounded-b-xl bg-gradient-to-r from-transparent via-white to-transparent opacity-70 `}></div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </>
    );
}
