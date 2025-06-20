'use client';
import { useState, useEffect } from 'react';
import { fetchPrayerTimes, calculateTimeRemaining } from '@/helper/prayerUtils';
import cities from '@/data/cities.json';
import { Sun, Moon, Clock, Sunrise, Sunset, CircleDot } from 'lucide-react'; // استخدم أيقونات مشابهة من مكتبة Lucide
import CountdownTimer from '@/components/atoms/CountdownTimer';
import MotivationalPhrases from './Animation';

export default function PrayerTimes({ muteBeforePrayer , showDhikrNotification, prayerTimes, nextPrayer , setTimeRemaining }) {




    const format12Hour = time24 => {
        if (!time24) return '';
        const [hourStr, minuteStr] = time24.split(':');
        let hour = parseInt(hourStr);
        const minute = minuteStr.padStart(2, '0');

        const ampm = hour >= 12 ? 'مساء' : 'صباحا';
        hour = hour % 12 || 12; // تحويل 0 إلى 12

        return `${hour}:${minute} ${ampm}`;
    };

    const updateCountdown = prayerTime => {
        const now = new Date();
        let diff = prayerTime - now;

        if (diff < 0) diff += 86400000;

        const { hours, minutes, seconds } = calculateTimeRemaining(diff);
        setTimeRemaining(`${hours} ساعة ${minutes} دقيقة ${seconds} ثانية`);

        const muteTime = new Date(prayerTime.getTime() - muteBeforePrayer * 60000);
        if (now >= muteTime && now < prayerTime) {
            showDhikrNotification({
                arabic: 'حان وقت الاستعداد للصلاة',
                translation: `إلى صلاة ${nextPrayer.name}`,
                benefits: 'الاستعداد للصلاة من علامات تقوى القلب',
            });
        }
    };

    useEffect(() => {
        if (!nextPrayer) return;

        const timer = setInterval(() => {
            updateCountdown(nextPrayer.time);
        }, 1000);

        return () => clearInterval(timer);
    }, [nextPrayer]);

    const prayerIcons = {
        Fajr: <Sunrise className='w-6 h-6 ' />,
        Dhuhr: <Sun className='w-6 h-6 ' />,
        Asr: <Clock className='w-6 h-6 ' />,
        Maghrib: <Sunset className='w-6 h-6 ' />,
        Isha: <Moon className='w-6 h-6 ' />,
    };
    const prayerIconsColors = {
        Fajr: 'text-sky-500',
        Dhuhr: 'text-yellow-500',
        Asr: 'text-orange-500',
        Maghrib: 'text-pink-500',
        Isha: 'text-indigo-500',
    };

    const prayerLabels = {
        Fajr: 'الفجر',
        Dhuhr: 'الظهر',
        Asr: 'العصر',
        Maghrib: 'المغرب',
        Isha: 'العشاء',
    };

    return (
        <>
            <MotivationalPhrases>
                <div className="card mb-4 text-center space-y-2" >
                    <h2 className='text-xl font-semibold text-primary leading-relaxed'>﴿إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ﴾</h2>
                    <p className='text-md text-gray-700 font-medium italic'>قال النبي ﷺ: "أول ما يُحاسب عليه العبد يوم القيامة الصلاة، فإن صلحت، فقد أفلح وأنجح، وإن فسدت، فقد خاب وخسر."</p>
                    <p className='text-lg font-bold text-primary/90'>الصلاة ليست عبئًا نؤديه، بل روحًا نرتقي بها.. هي لحظة صدقٍ مع الله، نستعيد فيها نقاء القلب وصفاء الروح.</p>
                </div>
            </MotivationalPhrases>
            <div className='card !shadow-inner '>
                <h2 className='text-2xl font-bold mb-4  text-secondary text-center'>أوقات الصلاة</h2>

                {prayerTimes ? (
                    <>
                        <div className=' w-full max-w-[800px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4'>
                            {['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'].map(name => (
                                <div key={name} className={`  flex flex-col items-center justify-center p-4 rounded-xl shadow-inner border-border/60 border transition-all ${nextPrayer?.name === name ? 'bg-primary border-2 border-primary text-white  ' : 'bg-gray-50'}`}>
                                    <span className={` ${nextPrayer?.name == name ? 'text-white' : prayerIconsColors[name]} `}> {prayerIcons[name]} </span>
                                    <h3 className='font-semibold mt-2 '>{prayerLabels[name]}</h3>
                                    <p className='text-lg font-bold opacity-80'>{format12Hour(prayerTimes[name])}</p>
                                </div>
                            ))}
                        </div>

                        {nextPrayer && (
                            <CountdownTimer
                                to={nextPrayer?.time?.getTime?.()} // Ensure it's a timestamp in ms
                                label={prayerLabels[nextPrayer.name]}
                            />
                        )}
                    </>
                ) : (
                    <p className='text-center text-gray-500'>جاري تحميل أوقات الصلاة...</p>
                )}
            </div>
        </>
    );
}
