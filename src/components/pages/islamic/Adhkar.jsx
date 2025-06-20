/*

  كل ي ف بابا الدعاء

*/

'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import adhkarData from '@/data/adhkar.json';
import MotivationalPhrases from './Animation';

export default function Adhkar() {
    const [activeCategory, setActiveCategory] = useState('morning');
    const [counters, setCounters] = useState({});

    useEffect(() => {
        const initialCounters = {};
        adhkarData.adhkar.forEach(item => {
            initialCounters[item.dhikr] = 0;
        });
        setCounters(initialCounters);
    }, []);

    const incrementCounter = dhikr => {
        setCounters(prev => ({
            ...prev,
            [dhikr]: (prev[dhikr] || 0) + 1,
        }));
    };

    const filteredAdhkar = adhkarData.adhkar.filter(item => item.category.includes(activeCategory));

    const getCategoryName = category => {
        const names = {
            morning: 'أذكار الصباح',
            evening: 'أذكار المساء',
            sleep: 'أذكار النوم',
            general: 'أذكار متنوعة',
            prayer: 'أذكار الصلاة',
            eating: 'أدعية الطعام',
            travel: 'أدعية السفر',
            distress: 'أدعية الكرب',
            home: 'أدعية المنزل',
            rain: 'أدعية المطر',
            sickness: 'أدعية المرض',
        };
        return names[category] || category;
    };

    return (
        <>
            <MotivationalPhrases>
                <div className="card mb-4 text-center space-y-2" >
                    <h2 className='text-xl font-semibold text-primary leading-relaxed'>﴿وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ﴾</h2>
                    <p className='text-md text-gray-700 font-medium italic'>قال النبي ﷺ: "الدعاء هو العبادة"، وليس شيء أكرم على الله من الدعاء.</p>
                    <p className='text-lg font-bold text-primary/90'>ما خاب من دعا، وما ضاع من رجى الله.</p>
                </div>
            </MotivationalPhrases>

            <div className='bg-white rounded-lg shadow p-6'>
                <h1 className='text-2xl font-bold text-center mb-6 text-green-800'>الأذكار</h1>

                <div className='flex flex-wrap gap-2 mb-6 justify-center'>
                    {['morning', 'evening', 'sleep', 'general', 'prayer', 'eating', 'travel', 'distress', 'home', 'rain', 'sickness'].map(category => (
                        <button key={category} onClick={() => setActiveCategory(category)} className={`px-4 py-2 rounded-lg transition-all ${activeCategory === category ? 'bg-green-600 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}>
                            {getCategoryName(category)}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode='wait'>
                    <motion.div key={activeCategory} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className='space-y-4'>
                        {filteredAdhkar.map((item, index) => (
                            <motion.div key={item.dhikr} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} className='p-4 rounded-lg border border-gray-200 bg-gray-50 shadow-sm'>
                                <div className='flex flex-col'>
                                    <p className='text-2xl text-right font-arabic mb-4 leading-loose'>{item.dhikr}</p>

                                    <div className='flex justify-between items-center'>
                                        <div className='bg-yellow-50 px-3 py-1 rounded-full text-sm text-yellow-800'>{item.benefits}</div>

                                        <div className='flex items-center'>
                                            <span className='mx-2 font-medium'>
                                                {counters[item.dhikr] || 0}/{item.repeats}
                                            </span>
                                            <button onClick={() => incrementCounter(item.dhikr)} disabled={counters[item.dhikr] >= item.repeats} className={`px-3 py-1 rounded-full transition ${counters[item.dhikr] >= item.repeats ? 'bg-green-100 text-green-800' : 'bg-green-500 text-white hover:bg-green-600'}`}>
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </>
    );
}
