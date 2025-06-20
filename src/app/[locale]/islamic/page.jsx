/* 


	- hndle the time to show the reminder 
	- تحفيزي  tab
	- tab for وناسه
	- my wrigin on the papper 

*/

'use client';
import { useState, useEffect } from 'react';
import Head from 'next/head';

import PrayerTimes from '@/components/pages/islamic/PrayerTimes';
import Adhkar from '@/components/pages/islamic/Adhkar';
// import Tasbeeh from '@/components/pages/islamic/Tasbeeh';
import Motivation from '@/components/pages/islamic/Motivation';
import ReminderManager from '@/components/pages/islamic/ReminderManager';
import Notification from '@/components/pages/islamic/Notification';
import FaithEssentials from '@/components/pages/islamic/FaithEssentials';
import Animation from '@/components/pages/islamic/Animation';
import MuslimOrganizer from '@/components/pages/islamic/MuslimOrganizer';
import PropheticSunnahs from '@/components/pages/islamic/PropheticSunnahs';
import IslamicCorrections from '@/components/pages/islamic/IslamicCorrections';
import { fetchPrayerTimes } from '@/helper/prayerUtils';

export default function IslamicCompanion() {
    const [activeTab, setActiveTab] = useState('prayer');
    const [showNotification, setShowNotification] = useState(false);
    const [notificationContent, setNotificationContent] = useState('');

    const [location, setLocation] = useState(null);
    const [cityName, setCityName] = useState('');
	const [prayerTimes, setPrayerTimes] = useState(null);
    const [nextPrayer, setNextPrayer] = useState(null);
	const [muteBeforePrayer, setMuteBeforePrayer] = useState(10);
    const [timeRemaining, setTimeRemaining] = useState('');

    // Get location with city name
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async position => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ lat: latitude, lng: longitude });

                    try {
                        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                        const data = await response.json();
                        if (data?.address?.city || data?.address?.town || data?.address?.village) {
                            setCityName(data.address.city || data.address.town || data.address.village);
                        }
                    } catch (error) {
                        console.error('Error fetching location name:', error);
                    }
                },
                error => {
                    console.error('Error getting location:', error);
                    setLocation({ lat: 21.3891, lng: 39.8579 }); // Default to Makkah
                },
            );
        } else {
            setLocation({ lat: 21.3891, lng: 39.8579 }); // Default to Makkah
        }
    };

    useEffect(() => {
        getLocation();
    }, []);

    useEffect(() => {
        if (location) {
            const fetchData = async () => {
                const times = await fetchPrayerTimes(location.lat, location.lng);
                setPrayerTimes(times);
                setNextPrayer(null); // Reset first
                calculateNextPrayer(times);
            };
            fetchData();
        }
    }, [location]);

    const calculateNextPrayer = times => {
        const now = new Date();
        const prayerNames = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

        const prayers = prayerNames.map(name => {
            const [hours, minutes] = times[name].split(':').map(Number);
            const prayerTime = new Date();
            prayerTime.setHours(hours, minutes, 0, 0);
            return { name, time: prayerTime };
        });

        const next = prayers.find(p => p.time > now) || prayers[0];
        setNextPrayer(next);
        updateCountdown(next.time);
    };

    const tabs = [
        { id: 'prayer', name: 'أوقات الصلاة' },
        { id: 'adhkar', name: 'الأذكار' },
        { id: 'faith-essentials', name: 'زاد المسلم' },
        { id: 'organizer', name: 'منظم المسلم' },
        { id: 'prophetic-sunnahs', name: 'سنن النبي ﷺ' },
        { id: 'islamic-corrections', name: 'تصحيحات شرعية' },
        { id: 'reminders', name: 'التنبيهات' },
    ];

    const showDhikrNotification = dhikr => {
        setNotificationContent({
            title: 'حان وقت الذكر',
            message: dhikr.arabic,
            translation: dhikr.translation,
            reference: dhikr.benefits,
        });
        setShowNotification(true);
    };


	console.log(prayerTimes)

    return (
        <div dir='rtl' className=' cairo min-h-screen   text-text-base'>
            {/* <Head>
        <title>رفيق المسلم</title>
        <meta name="description" content="رفيقك اليومي في الطاعة" />
      </Head> */}

            <div className='container mx-auto px-4  py-8'>
                <div className='text-center mb-8 mt-[20px]'>
                    <h1 className='text-3xl font-bold mb-2 text-green-800'>رفيقك اليومي في الطاعة</h1>
                </div>

                <div className='flex overflow-x-auto flex-wrap justify-center w-fit mx-auto border border-border/60  mb-6 bg-white  rounded-full p-2 shadow-inner'>
                    {tabs.map((tab, index) => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`relative whitespace-nowrap px-5 py-2 mx-1 rounded-full font-semibold transition-all duration-300  ${activeTab == tab.id ? 'bg-primary text-white shadow-sm' : 'text-gray-800  hover:bg-background-muted hover:shadow-inner '}`}>
                            <span className='capitalize'>{tab.name}</span>
                        </button>
                    ))}
                </div>

                <Animation>
                    {activeTab === 'prayer' && <PrayerTimes muteBeforePrayer={muteBeforePrayer}  showDhikrNotification={showDhikrNotification} prayerTimes={prayerTimes} nextPrayer ={nextPrayer } setTimeRemaining={setTimeRemaining} />}
                    {activeTab === 'adhkar' && <Adhkar showDhikrNotification={showDhikrNotification} />}
                    {activeTab === 'faith-essentials' && <FaithEssentials />}
                    {activeTab === 'motivation' && <Motivation />}
                    {activeTab === 'organizer' && <MuslimOrganizer />}
                    {activeTab === 'prophetic-sunnahs' && <PropheticSunnahs />}
                    {activeTab === 'islamic-corrections' && <IslamicCorrections />}

                    {activeTab === 'reminders' && <ReminderManager prayerTimes={prayerTimes} />}
                </Animation>

                {showNotification && <Notification content={notificationContent} onClose={() => setShowNotification(false)} />}
            </div>
        </div>
    );
}
