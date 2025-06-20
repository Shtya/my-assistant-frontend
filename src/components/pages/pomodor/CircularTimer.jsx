'use client';

import React from 'react';

const RADIUS = 45;
const STROKE = 5;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function CircularTimer({ isRunning , timer, timerValue }) {
    const progress = (timerValue * 60 - timer) / (timerValue * 60);
    const dashOffset = CIRCUMFERENCE * (1 - progress);

    const angle = progress * 360;
    const dotX = 50 + RADIUS * Math.cos((angle - -2) * (Math.PI / 180));
    const dotY = 50 + RADIUS * Math.sin((angle - -2) * (Math.PI / 180));

    const minutes = String(Math.floor(timer / 60)).padStart(2, '0');
    const seconds = String(timer % 60).padStart(2, '0');

    return (
        <div className='relative w-64 h-64 mx-auto'>
            <svg className='  absolute top-0 left-0 w-full h-full duration-500 transform -rotate-90' viewBox='0 0 100 100'>
                {/* Background Circle */}
                <circle className='  stroke-background-muted  ' cx='50' cy='50' r={RADIUS} stroke='#e5e7eb' strokeWidth={STROKE} fill='none' />
                {/* Progress Circle */}
                <circle className='  stroke-primary ' cx='50' cy='50' r={RADIUS} stroke='#3b82f6' strokeWidth={STROKE} fill='none' strokeDasharray={CIRCUMFERENCE} strokeDashoffset={dashOffset} strokeLinecap='round' />
                {/* Moving Dot */}
                {progress > 0.00001 && <circle className='  fill-primary ' cx={dotX} cy={dotY} r='3.5' fill='' stroke='#eee' strokeWidth='1' />}
            </svg>

            {/* Center Time Text */}
            <div className='absolute text-text-base text-shadow inset-0 flex items-center justify-center text-5xl font-bold'>
                {minutes}:{seconds} 
            </div>
        </div>
    );
}
