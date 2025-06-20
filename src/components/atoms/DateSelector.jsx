'use client';
import { Calendar } from 'lucide-react';
import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';

const getSurroundingDays = () => {
    const today = dayjs();
    const start = today.subtract(10, 'day');
    return Array.from({ length: 21 }, (_, i) => start.add(i, 'day'));
};

export default function DateSelector({ selectedDate, onChange }) {
    const days = getSurroundingDays();
    const containerRef = useRef(null);
    const todayIndex = 10;

    useEffect(() => {
        if (containerRef.current) {
            const container = containerRef.current;
            const activeItem = container.children[todayIndex];
            if (activeItem) {
                const containerWidth = container.clientWidth;
                const itemWidth = activeItem.clientWidth;
                const scrollPosition = activeItem.offsetLeft - containerWidth / 2 + itemWidth / 2;
                container.scrollTo({ left: scrollPosition, behavior: 'auto' });
            }
        }
    }, []);

    const scrollToDate = index => {
        if (containerRef.current) {
            const container = containerRef.current;
            const item = container.children[index];
            if (item) {
                const containerWidth = container.clientWidth;
                const itemWidth = item.clientWidth;
                const scrollPosition = item.offsetLeft - containerWidth / 2 + itemWidth / 2;
                container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
            }
        }
    };

    const handleDateClick = (day, index) => {
        onChange(day);
        scrollToDate(index);
    };

    return (
        <div className='flex items-center gap-3  !-mt-4  w-full relative'>
            <img src='/calendar.png' className='w-10' />

            <div className='relative w-full max-w-[calc(100%-30px)] '>
                <div className='absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none' />
                <div ref={containerRef} className='inline-flex gap-2 overflow-x-auto  py-2 scrollbar-hide max-w-full'>
                    {days.map((day, index) => (
                        <div key={day.format('YYYY-MM-DD')} className='flex-shrink-0'>
                            <button
                                onClick={() => handleDateClick(day, index)}
                                className={`w-[80px] px-4 flex flex-col items-center justify-center rounded-xl py-2 font-medium transition-all duration-200 
                  ${selectedDate.isSame(day, 'date') ? 'bg-primary text-white scale-105 shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                                <span className='text-xs'>{day.format('ddd')}</span>
                                <span className='text-lg font-medium'>{day.format('D')}</span>
                            </button>
                        </div>
                    ))}
                </div>
                <div className='absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none' />
            </div>
        </div>
    );
}
