// CountdownTimer.jsx
'use client';

import React from 'react';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';

export default function CountdownTimer({ to, label }) {
    if (!to) return null;

    return (
        <div className=' mt-14 ' dir='ltr'>
            <div className='mb-0 text-center text-lg font-bold text-secondary '>الصلاة القادمة: {label}</div>

            <div className='relative h-[100px] flex-col flex items-center justify-center overflow-hidden  max-w-[380px]  w-full mx-auto  px-4 pt-6'>
                <FlipClockCountdown
                    to={to}
                    labelStyle={{
                        display: 'none',
                    }}
                    digitBlockStyle={{
                        backgroundColor: '#000',
                        color: '#fff',
                        border: '1px solid #fff',
                    }}
                    digitWrapperStyle={{
                        backgroundColor: '#000',
                    }}
                    className='tick flex justify-center text-[28px]'
                />
            </div>
            <div className=' flex justify-center  text-sm font-bold text-black'>
                <span className='mx-[40px] '>ساعات</span>
                <span className='mx-[40px] '>دقائق</span>
                <span className='mx-[40px] '>ثواني</span>
            </div>
        </div>
    );
}
