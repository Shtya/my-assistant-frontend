import React, { useState, useEffect } from 'react';

export default function Prayer({ placeName, location, prayerTimes, nextPrayer }) {
    const [remainingTime, setRemainingTime] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());

    // Update clock + remaining every second
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setCurrentTime(now);

            if (nextPrayer?.time) {
                const target = new Date(nextPrayer.time);

                if (!isNaN(target.getTime())) {
                    const diffMs = target.getTime() - now.getTime();

                    if (diffMs > 0) {
                        const hours = Math.floor(diffMs / (1000 * 60 * 60));
                        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                        const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

                        setRemainingTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
                    } else {
                        setRemainingTime('00:00:00');
                    }
                } else {
                    console.warn('Invalid nextPrayer.time:', nextPrayer.time);
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [nextPrayer]);

    // Convert ISO time to 12h format
    const format12HourFromISO = iso => {
        const date = new Date(iso);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    };

    console.log(remainingTime);

    return (
        <div className='relative bg-cover bg-center rounded-xl overflow-hidden shadow-md mb-6'>
            <div className='card'>
                <div className='text-center mb-8'>
                    <h2 className='text-lg font-medium'>{placeName || 'Loading location...'}</h2>

                    {/* Current Time + Countdown */}
                    <div className='text-5xl font-bold'>
                        {currentTime.toLocaleTimeString('en-US', {
                            hour: 'numeric',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: true,
                        })}
                    </div>

                    {/* Difference */}
                    {nextPrayer && (
                        <div className='text-sm mt-1 text-yellow-300'>
                            Time until <strong>{nextPrayer.name}</strong>: <strong>{remainingTime}</strong>
                        </div>
                    )}

                    {/* Date */}
                    <div className='text-sm mt-2'>
                        {currentTime.toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        })}
                    </div>
                </div>

                {location && prayerTimes ? (
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 text-sm'>
                        {['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map(name => (
                            <div key={name} className={`rounded-lg p-4 flex flex-col items-center justify-center text-center ${nextPrayer?.name === name ? 'bg-primary text-white gradient font-bold' : 'bg-background-muted shadow-inner border border-border/50 '}`}>
                                <h3 className='text-base'>{name}</h3>
                                <p className='mt-1 text-lg font-semibold'>{format12HourFromISO(prayerTimes?.[name] || '17:00')}</p>
                                {/* Optional Azan time below */}
                                {/* <p className='text-xs text-gray-300 mt-1'>Azan: {format12Hour(azanTimes?.[name])}</p> */}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='text-center mt-4'>Loading prayer times...</div>
                )}
            </div>
        </div>
    );
}
