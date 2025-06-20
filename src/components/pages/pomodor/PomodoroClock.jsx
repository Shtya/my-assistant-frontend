
/* 
    whend show the popup of hndleCompolete add button also for stop now 
    i need to add on this logic and also the setting tab is saved on the localeStorage the all data and i can edit on it and send again on locale storage 


    - when any pomodoro or short-break or long break finish sned ths sections to api 
     create it in nextjs app/api/...route.js with monogodb create schema for that because
     i will use this data to mak statisitc for every day i finish how times or focus time and pomodor rounter count and mke more things also for tab of foucs summary 
     
     - and also tab to add tasks and is checked or no nd this have a bullets in every task and is check or now and i can delte theme or update them  and add tasks
     - make it powerfull pomodor and i will provide you with the all data 



     - show reminder if the pomodoro doen'st work for 15 min
    - handle the soundes that choose 
    - show the sound for 30s only 

*/


'use client';

import Button from '@/components/atoms/Button';
import { Pause, Play, RotateCcw, SkipForward } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Setting from './Settings';
import CircularTimer from './CircularTimer';
import { Howl } from 'howler';
import { Notification } from '@/config/Notification';
import toast from 'react-hot-toast';

const TIMER_TYPES = {
    pomodoro: { label: 'Pomodoro', minutes: 0.1 },
    short: { label: 'Short Break', minutes: 1 },
    long: { label: 'Long Break', minutes: 15 },
};

const LOCAL_STORAGE_KEY = 'pomodoro_timer_data';
const IDLE_NOTIFICATION_INTERVAL = 5 * 60 * 1000; // 5 minutes in ms

export default function PomodoroClock() {
    const loadInitialState = () => {
        // Check if we're running in the browser (where localStorage is available)
        if (typeof window !== 'undefined') {
            const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (savedData) {
                const { timerType, timerValue, endTime, isRunning } = JSON.parse(savedData);

                // Calculate remaining time if timer was running
                if (isRunning && endTime) {
                    const now = new Date().getTime();
                    const remainingSeconds = Math.max(0, Math.floor((endTime - now) / 1000));

                    if (remainingSeconds > 0) {
                        return {
                            timerType,
                            timerValue,
                            timer: remainingSeconds,
                            isRunning: true,
                            endTime,
                        };
                    }
                }
            }
        }

        // Default to pomodoro timer
        return {
            timerType: 'pomodoro',
            timerValue: TIMER_TYPES.pomodoro.minutes,
            timer: TIMER_TYPES.pomodoro.minutes * 60,
            isRunning: false,
            endTime: null,
        };
    };
    const [state, setState] = useState(loadInitialState());
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showForceFocus, setShowForceFocus] = useState(false);

    const [settings, setSettings] = useState({
        soundEnabled: true,
        notificationEnabled: true,
        idleReminderEnabled: true,
        idleReminderInterval: IDLE_NOTIFICATION_INTERVAL,
        autoStartBreaks: true,
        autoStartPomodoros: false,
        volume: 60,
        sound: '/sounds/alert/1.wav',
    });

    // Sound player
    const [soundPlayer, setSoundPlayer] = useState(null);
    const [idleNotificationTimer, setIdleNotificationTimer] = useState(null);

    // Load settings from localStorage
    useEffect(() => {
        const savedSettings = localStorage.getItem('pomodoro_settings');
        if (savedSettings) {
            setSettings(JSON.parse(savedSettings));
        }
    }, []);

    // Initialize sound player
    useEffect(() => {
        const player = new Howl({
            src: [settings.sound],
            volume: settings.volume / 100,
            preload: true,
        });
        setSoundPlayer(player);

        return () => {
            if (player) player.unload();
        };
    }, [settings.sound, settings.volume]);

    // Save state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify({
                timerType: state.timerType,
                timerValue: state.timerValue,
                timer: state.timer,
                isRunning: state.isRunning,
                endTime: state.endTime,
            }),
        );
    }, [state]);

    // Timer logic
    useEffect(() => {
        let interval;

        if (state.isRunning) {
            // Clear any idle notifications when timer is running
            if (idleNotificationTimer) {
                clearInterval(idleNotificationTimer);
                setIdleNotificationTimer(null);
            }

            interval = setInterval(() => {
                setState(prev => {
                    const now = new Date().getTime();
                    const remainingSeconds = Math.max(0, Math.floor((prev.endTime - now) / 1000));

                    if (remainingSeconds <= 0) {
                        // Timer completed
                        clearInterval(interval);
                        handleTimerCompletion();
                        return {
                            ...prev,
                            timer: 0,
                            isRunning: false,
                            endTime: null,
                        };
                    }

                    return {
                        ...prev,
                        timer: remainingSeconds,
                    };
                });
            }, 1000);
        } else if (settings.idleReminderEnabled && !state.isRunning && !idleNotificationTimer) {
            // Set up idle notifications when timer is not running
            const interval = setInterval(() => {
                if (Notification.permission === 'granted') {
                    new Notification('Pomodoro Timer Idle', {
                        body: 'Your Pomodoro timer is not running. Start a session to stay productive!',
                    });
                }

                if (soundPlayer && settings.soundEnabled) {
                    soundPlayer.play();
                }

                toast.info('Pomodoro timer is idle. Start a session to stay productive!');
            }, settings.idleReminderInterval);

            setIdleNotificationTimer(interval);
        }

        return () => {
            if (interval) clearInterval(interval);
            if (idleNotificationTimer) clearInterval(idleNotificationTimer);
        };
    }, [state.isRunning, settings.idleReminderEnabled, settings.idleReminderInterval]);

    const handleTimerCompletion = () => {
        // Play sound if enabled (loop until stopped)
        if (soundPlayer && settings.soundEnabled) {
            soundPlayer.loop(true);
            soundPlayer.play();
        }

        // Show notification if enabled
        if (settings.notificationEnabled) {
            if (Notification.permission === 'granted') {
                try {
                    const notification = new Notification(
                        `Pomodoro Timer - ${TIMER_TYPES[state.timerType].label} Complete`, 
                        {
                            body: state.timerType === 'pomodoro' 
                                ? 'Time for a break!' 
                                : 'Time to get back to work!',
                            icon: '/favicon.ico',
                            requireInteraction: true // Keeps notification visible
                        }
                    );

                    notification.onclick = () => {
                        forceFocusTab();
                        notification.close();
                    };
                } catch (e) {
                    console.log("Couldn't show notification:", e);
                }
            }
        }

        // Show persistent toast
        const toastId = toast.success(`${TIMER_TYPES[state.timerType].label} session completed!`, {
            duration: Infinity, // Won't auto-close
            action: {
                label: 'Focus Now',
                onClick: () => {
                    forceFocusTab();
                    toast.dismiss(toastId);
                }
            }
        });

        // More aggressive tab focusing
        const forceFocusTab = () => {
            // Stop the sound if user interacts
            if (soundPlayer) soundPlayer.stop();

            try {
                // Method 1: Standard focus
                window.focus();

                // Method 2: For Chrome - change URL hash to force attention
                window.location.hash = 'pomodoro-completed';
                window.location.hash = '';

                // Method 3: Open and close a popup (may be blocked)
                const popup = window.open('', '_blank');
                if (popup) {
                    popup.close();
                    window.focus();
                }

                // Method 4: Blur then focus
                window.blur();
                window.focus();

                // Method 5: If still not focused after 1sec, show alert
                setTimeout(() => {
                    if (!document.hasFocus()) {
                        alert(`${TIMER_TYPES[state.timerType].label} session completed!\n\nPlease return to your Pomodoro tab.`);
                    }
                }, 1000);

            } catch (e) {
                console.log("Focus error:", e);
            }
        };

        // Show fullscreen overlay if not focused within 2 seconds
        const overlayTimer = setTimeout(() => {
            if (!document.hasFocus()) {
                setShowForceFocus(true);
            }
        }, 2000);

        // Cleanup function
        return () => {
            clearTimeout(overlayTimer);
            if (soundPlayer) soundPlayer.stop();
        };
    };


    const startTimer = (type = state.timerType) => {
        const minutes = TIMER_TYPES[type].minutes;
        const now = new Date().getTime();
        const endTime = now + minutes * 60 * 1000;

        setState({
            timerType: type,
            timerValue: minutes,
            timer: minutes * 60,
            isRunning: true,
            endTime,
        });
    };

    const pauseTimer = () => {
        setState(prev => ({
            ...prev,
            isRunning: false,
            endTime: null,
        }));
    };

    const handleTimerTypeChange = type => {
        if (state.isRunning) {
            pauseTimer();
        }
        setState({
            timerType: type,
            timerValue: TIMER_TYPES[type].minutes,
            timer: TIMER_TYPES[type].minutes * 60,
            isRunning: false,
            endTime: null,
        });
    };

    const resetTimer = () => {
        if (soundPlayer && settings.soundEnabled) {
            soundPlayer.play();
        }

        setState({
            timerType: state.timerType,
            timerValue: TIMER_TYPES[state.timerType].minutes,
            timer: TIMER_TYPES[state.timerType].minutes * 60,
            isRunning: false,
            endTime: null,
        });
    };

    const handleSkip = () => {
        if (state.timerType !== 'pomodoro') {
            startTimer('pomodoro');
        }
    };

    const toggleFullscreen = () => {
        if (!isFullscreen) {
            const elem = document.documentElement;
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            setIsFullscreen(false);
        }
    };

    const handleSettingsChange = newSettings => {
        setSettings(newSettings);
        localStorage.setItem('pomodoro_settings', JSON.stringify(newSettings));
    };

    const minutes = String(Math.floor(state.timer / 60)).padStart(2, '0');
    const seconds = String(state.timer % 60).padStart(2, '0');

    return (
        <div className={`card ${isFullscreen ? 'fixed inset-0 z-50 bg-white flex flex-col items-center justify-center' : ''}`}>
            <h2 className='title-card flex items-center justify-between'>
                Pomodoro Timer
                <button onClick={handleTimerCompletion}>click done</button>
                <img src='/fullscreen.png' className='cursor-pointer hover:scale-90 duration-300 w-5 h-5' onClick={toggleFullscreen} alt='Toggle fullscreen' />
            </h2>

            {showForceFocus && (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-md text-center">
            <h2 className="text-2xl font-bold mb-4">⏰ Time's Up!</h2>
            <p className="mb-4">
                {state.timerType === 'pomodoro' 
                    ? 'Your work session is complete! Time for a break.'
                    : 'Your break is over! Time to get back to work.'}
            </p>
            <div className="flex justify-center gap-4">
                <button
                    onClick={() => {
                        setShowForceFocus(false);
                        if (soundPlayer) soundPlayer.stop();
                        forceFocusTab();
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Focus Now
                </button>
                {state.timerType === 'pomodoro' && (
                    <button
                        onClick={() => {
                            setShowForceFocus(false);
                            if (soundPlayer) soundPlayer.stop();
                            startTimer('short');
                        }}
                        className="px-4 py-2 bg-green-500 text-white rounded"
                    >
                        Start Break
                    </button>
                )}
            </div>
        </div>
    </div>
)}

            {/* Tabs */}
            <div className='bg-background-subtle p-2 rounded-md flex justify-center gap-2 -mt-3 mb-6'>
                {Object.entries(TIMER_TYPES).map(([key, value]) => (
                    <button key={key} onClick={() => handleTimerTypeChange(key)} className={`px-4 py-1.5 rounded-md text-sm font-medium hover:bg-gradient-to-t hover:from-primary hover:to-blue-400 hover:text-white duration-300 ${state.timerType === key ? 'bg-primary text-white gradient' : 'bg-background-muted text-[#262626]'}`}>
                        {value.label}
                    </button>
                ))}
            </div>

            <CircularTimer isRunning={state.isRunning} timer={state.timer} timerValue={state.timerValue} />

            <div className='mt-6 flex items-center justify-center gap-3'>
                <Button Icon={<RotateCcw size={20} className={'scale-y-[-1]'} />} onClick={resetTimer} color='white' />
                <Button Icon={state.isRunning ? <Pause size={16} /> : <Play size={16} />} label={state.isRunning ? 'Pause' : 'Play'} cn='!px-[20px] !gap-[5px]' onClick={() => (state.isRunning ? pauseTimer() : startTimer())} />
                {state.timerType !== 'pomodoro' && <Button Icon={<SkipForward size={20} className={'scale-y-[-1]'} />} onClick={handleSkip} color='red' cn='!px-[20px] !gap-[5px]' label={'Skip Break'} />}
                <Setting onSettingsChange={handleSettingsChange} initialSettings={settings} />
            </div>
        </div>
    );
}
