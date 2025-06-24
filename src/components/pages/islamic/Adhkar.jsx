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
            <div className={`bg-white  rounded-lg shadow p-6 ${fullScreenMode ? 'fixed inset-0 z-50 overflow-y-auto' : 'relative'}`}>
                {/* Full screen toggle button */}
                <button onClick={toggleFullScreen} className={`absolute top-4 left-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10 ${fullScreenMode ? 'text-primary' : 'text-gray-600'}`} aria-label={fullScreenMode ? 'Minimize' : 'Expand'}>
                    {fullScreenMode ? <Minimize size={20} /> : <Expand size={20} />}
                </button>

                <h1 className='text-center mb-3 text-2xl font-semibold text-primary'>{getCategoryName(activeCategory)}</h1>

                <div className='flex flex-wrap gap-2 mb-6 justify-center'>
                    {bar.map(category => (
                        <button key={category} onClick={() => setActiveCategory(category)} className={`px-4 py-2 rounded-full transition-all shadow-inner ${activeCategory === category ? 'bg-primary text-white' : 'bg-gray-200 hover:bg-gray-300'}`}>
                            {getCategoryName(category)}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode='wait'>
                    <motion.div key={activeCategory} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className={`space-y-6 ${fullScreenMode ? 'max-w-4xl mx-auto' : ''}`}>
                        <div className={`${fullScreenMode ? 'max-h-[calc(100vh-200px)] overflow-y-auto pr-2' : ''}`}>
                            {filteredAdhkar.map((item, index) => (
                                <div key={item.dhikr + index} className='group relative overflow-hidden bg-background-soft border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5'>
                                    {/* Accent Bar */}
                                    <div className='absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary via-secondery to-success'></div>

                                    {/* Content */}
                                    <div className='flex flex-col gap-4'>
                                        <p className='text-center text-lg font-medium text-gray-800 leading-relaxed tracking-wide'>{item.dhikr}</p>

                                        {item.benefits && (
                                            <div onClick={() => toggleExpanded(index)} className={`mx-auto relative bg-yellow-100 hover:bg-yellow-200 px-4 py-2 text-sm text-yellow-800 rounded-md cursor-pointer transition-all duration-300 max-w-full ${expandedItems[index] ? '' : 'truncate line-clamp-1'}`}>
                                                {item.benefits}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </>
    );
}
