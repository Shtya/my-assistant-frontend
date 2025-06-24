import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

const TabSlider = ({ tabs, activeTab, setActiveTab, width = '800px' }) => {
    const swiperRef = useRef(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const updateNavigation = swiper => {
        setIsBeginning(swiper.isBeginning);
        setIsEnd(swiper.isEnd);
    };

    const handleTabClick = (tabId, e) => {
        if (isDragging) {
            e.preventDefault();
            return;
        }
        setActiveTab(tabId);
    };

    return (
        <div className='p-2 mb-6 rounded-lg bg-gray-100/50 relative mx-auto !px-6 backdrop-blur-sm' style={{ maxWidth: width, width: '100%' }}>
            <Swiper
                ref={swiperRef}
                modules={[Navigation, FreeMode, Mousewheel]}
                spaceBetween={12}
                slidesPerView={'auto'}
                freeMode={{
                    enabled: true,
                    momentumRatio: 0.5,
                    momentumBounceRatio: 0.5,
                }}
                mousewheel={{
                    forceToAxis: true,
                    sensitivity: 0.5,
                }}
                onSlideChange={updateNavigation}
                onInit={updateNavigation}
                onSliderMove={() => setIsDragging(true)}
                onSliderMoveEnd={() => setIsDragging(false)}
                className='!overflow-hidden !px-2 !py-1'
                breakpoints={{
                    640: {
                        slidesPerGroup: 2,
                    },
                    1024: {
                        slidesPerGroup: 3,
                    },
                }}>
                {tabs.map(tab => (
                    <SwiperSlide key={tab.id} className='!w-auto !mx-1  '>
                        <button onClick={e => handleTabClick(tab.id, e)} className={` border border-border/50 relative whitespace-nowrap px-5 py-2.5 rounded-xl font-medium transition-all duration-200 ${activeTab === tab.id ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md' : 'text-gray-600 hover:bg-white/80 hover:text-gray-900 shadow-sm bg-white/50 backdrop-blur-sm'} ${isDragging ? 'cursor-grabbing' : 'cursor-pointer'} `}>
                            <span className='capitalize text-sm tracking-wide'>
                                {tab?.icon} {tab.name}{' '}
                            </span>
                            {activeTab === tab.id && <span className='absolute bottom-1 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-white/80 rounded-full'></span>}
                        </button>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Navigation Buttons */}
            <button disabled={isBeginning} onClick={() => swiperRef.current?.swiper.slidePrev()} className={` absolute -left-1 top-1/2 -translate-y-1/2 z-10 h-[45px] w-[30px] flex items-center justify-center  rounded-lg shadow-xl border transition-all ${isBeginning ? 'bg-gray-100/70 border-gray-200 cursor-not-allowed opacity-70' : 'bg-white hover:bg-gray-50 border-gray-200/80 hover:border-gray-300 cursor-pointer shadow-2xl hover:shadow-lg'} `} aria-label='Previous tabs'>
                <svg xmlns='http://www.w3.org/2000/svg' className={`h-5 w-5 transition-colors ${isBeginning ? 'text-gray-400' : 'text-gray-600 hover:text-gray-800'}`} fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
                </svg>
            </button>

            <button disabled={isEnd} onClick={() => swiperRef.current?.swiper.slideNext()} className={` absolute -right-1 top-1/2 -translate-y-1/2 z-10 h-[45px] w-[30px] flex items-center justify-center  rounded-lg border transition-all ${isEnd ? 'bg-gray-100/70 border-gray-200 cursor-not-allowed opacity-70 shadow-sm' : 'bg-white hover:bg-gray-50 border-gray-200/80 hover:border-gray-300 cursor-pointer shadow-2xl hover:shadow-lg'} `} aria-label='Next tabs'>
                <svg xmlns='http://www.w3.org/2000/svg' className={`h-5 w-5 transition-colors ${isEnd ? 'text-gray-400' : 'text-gray-600 hover:text-gray-800'}`} fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                </svg>
            </button>
        </div>
    );
};

export default TabSlider;
