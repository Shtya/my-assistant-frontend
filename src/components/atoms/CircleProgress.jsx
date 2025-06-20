'use client';

import React, { useEffect, useState } from 'react';

export default function CircleProgress({ size = 160, strokeWidth = 18, targetPercentage = 100, primaryColor = '#aff199', bgColor = '#eee', textColor = '#333', label = '', valueLabel = '', loop = false }) {
    const [percentage, setPercentage] = useState(0);

    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - percentage / 100);

    useEffect(() => {
        let interval;
        let timeout;

        const animate = () => {
            let current = 0;
            interval = setInterval(() => {
                current += 1;
                setPercentage(current);
                if (current >= targetPercentage) {
                    clearInterval(interval);
                }
            }, 10);
        };

        animate();

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, [targetPercentage, loop]);

    return (
        <div className='flex flex-col items-center relative'>
            <svg width={size} height={size} className='transform -rotate-90'>
                <circle cx={size / 2} cy={size / 2} r={radius} stroke={bgColor} strokeWidth={strokeWidth} fill='none' />
                <circle cx={size / 2} cy={size / 2} r={radius} stroke={primaryColor} strokeWidth={strokeWidth} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap='round' fill='none' style={{ transition: 'stroke-dashoffset 0.05s linear' }} />
            </svg>

            <div className='absolute flex flex-col items-center justify-center text-center' style={{ width: `${size}px`, height: `${size}px`, color: textColor }}>
                <span className='text-lg font-bold'>{valueLabel || `${percentage}%`}</span>
                <span className='text-sm mt-1'>{label}</span>
            </div>
        </div>
    );
}
