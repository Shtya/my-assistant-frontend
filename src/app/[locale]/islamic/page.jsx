/* 


	- hndle the time to show the reminder 
	- تحفيزي  tab
	- tab for وناسه
	- my wrigin on the papper 

*/

'use client';
import { useState, useEffect } from 'react';

import PrayerTimes from '@/components/pages/islamic/PrayerTimes';
import Adhkar from '@/components/pages/islamic/Adhkar';
// import Tasbeeh from '@/components/pages/islamic/Tasbeeh';
import Motivation from '@/components/pages/islamic/Motivation';
import ReminderManager from '@/components/pages/islamic/ReminderManager';
import Notification from '@/components/pages/islamic/Notification';
import FaithEssentials from '@/components/pages/islamic/FaithEssentials';
import MuslimOrganizer from '@/components/pages/islamic/MuslimOrganizer';
import PropheticSunnahs from '@/components/pages/islamic/PropheticSunnahs';
import IslamicCorrections from '@/components/pages/islamic/IslamicCorrections';
import { fetchPrayerTimes } from '@/helper/prayerUtils';
import MistakeTracker from '@/components/pages/islamic/MistakeTracker';
import TabSlider from '@/components/atoms/TabSlider';

export default function IslamicCompanion() {
    const [activeTab, setActiveTab] = useState('prayer');
    const [showNotification, setShowNotification] = useState(false);
    const [notificationContent, setNotificationContent] = useState('');

    useEffect(() => {
        const savedTab = localStorage.getItem('activeTab');
        if (savedTab) {
            setActiveTab(savedTab);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('activeTab', activeTab);
    }, [activeTab]);

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
        { id: 'prayer', name: 'أوقات الصلاة', title: '' },
        { id: 'adhkar', name: 'الأذكار', title: '﴿وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ﴾' },
        { id: 'mistake-tracker', name: 'مساعد الحفظ', title: 'رفيق حفظ القرآن المتقدم' },
        { id: 'faith-essentials', name: 'زاد المسلم', title: '' },
        { id: 'organizer', name: 'منظم المسلم', title: '' },
        { id: 'prophetic-sunnahs', name: 'سنن النبي ﷺ', title: '' },
        { id: 'islamic-corrections', name: 'تصحيحات شرعية', title: '' },
        { id: 'reminders', name: 'التنبيهات', title: '' },
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
    

    return (
        <div dir='rtl' className=' cairo min-h-screen   text-text-base'>
            <div className='  py-4 max-[700px]:ml-2  ml-4 '>
                <div className='text-center mb-4 mt-8'>
                    <h1 className='text-3xl max-md:text-xl font-bold mb-2 text-green-800'> {tabs.find(e => e.id == activeTab)?.title} </h1>
                </div>

                <TabSlider tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
                {/* <Animation> */}
                {activeTab === 'prayer' && <PrayerTimes muteBeforePrayer={muteBeforePrayer} showDhikrNotification={showDhikrNotification} prayerTimes={prayerTimes} nextPrayer={nextPrayer} setTimeRemaining={setTimeRemaining} />}
                {activeTab === 'adhkar' && <Adhkar showDhikrNotification={showDhikrNotification} />}
                {activeTab === 'mistake-tracker' && <MistakeTracker />}
                {activeTab === 'faith-essentials' && <FaithEssentials />}
                {activeTab === 'motivation' && <Motivation />}
                {activeTab === 'organizer' && <MuslimOrganizer />}
                {activeTab === 'prophetic-sunnahs' && <PropheticSunnahs />}
                {activeTab === 'islamic-corrections' && <IslamicCorrections />}

                {activeTab === 'reminders' && <ReminderManager prayerTimes={prayerTimes} />}
                {/* </Animation> */}

                {showNotification && <Notification content={notificationContent} onClose={() => setShowNotification(false)} />}
            </div>
        </div>
    );
}
