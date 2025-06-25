// components/PomodoroApp.js
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Pause, Play, RotateCcw, SkipForward, Settings } from 'lucide-react';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { Howl } from 'howler';
import { Switch } from '@/components/atoms/Switch';
import { Label } from '@/components/atoms/Label';
import { Slider } from '@/components/atoms/Slider';
import Button from '@/components/atoms/Button';
import Dialog from '@/components/molecules/Dialog';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import ProgressSummary from '@/components/atoms/Progressbar2';
import DateSelector from '@/components/atoms/DateSelector';

const RADIUS = 45;
const STROKE = 5;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const DEFAULT_TIMER_TYPES = {
    pomodoro: { label: 'Pomodoro', minutes: 25 },
    short: { label: 'Short Break', minutes: 5 },
    long: { label: 'Long Break', minutes: 15 },
};

const LOCAL_STORAGE_KEY = 'pomodoro_timer_data';
const TIMER_SETTINGS_KEY = 'pomodoro_timer_settings';
const STATS_KEY = 'pomodoro_stats';
const IDLE_NOTIFICATION_INTERVAL = 5 * 60 * 1000;

const soundOptions = [
    { key: '/sounds/religion/alert7.mp3', label: 'Chime' },
    { key: '/sounds/religion/alert1.mp3', label: 'Bell' },
    { key: '/sounds/religion/alert4.mp3', label: 'Soft Ping' },
    { key: '/sounds/religion/alert6.mp3', label: 'Digital Ding' },
];

export default function PomodoroApp() {
    // State management
    const [state, setState] = useState(() => loadInitialState());
    const [settings, setSettings] = useState(() => loadInitialSettings());
    const [soundPlayer, setSoundPlayer] = useState(null);
    const [globalNotification, setGlobalNotification] = useState(null);
    const [isPageVisible, setIsPageVisible] = useState(true);
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [stats, setStats] = useState({});
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [tempSettings, setTempSettings] = useState(settings);

    // Load initial state
    function loadInitialState() {
        try {
            const savedSettings = JSON.parse(localStorage.getItem(TIMER_SETTINGS_KEY) || {});
            const timerTypes = savedSettings.timerTypes || DEFAULT_TIMER_TYPES;

            const savedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || {});
            if (!savedData.timerType) {
                return {
                    timerType: 'pomodoro',
                    timerValue: timerTypes.pomodoro.minutes,
                    timer: timerTypes.pomodoro.minutes * 60,
                    isRunning: false,
                    endTime: null,
                    timerTypes,
                };
            }

            if (savedData.isRunning && savedData.endTime) {
                const now = Date.now();
                const remainingSeconds = Math.max(0, Math.floor((savedData.endTime - now) / 1000));
                if (remainingSeconds > 0) {
                    return {
                        ...savedData,
                        timer: remainingSeconds,
                        timerTypes,
                    };
                }
            }

            return {
                ...savedData,
                timer: timerTypes[savedData.timerType].minutes * 60,
                isRunning: false,
                endTime: null,
                timerTypes,
            };
        } catch (error) {
            console.error('Error loading initial state:', error);
            return {
                timerType: 'pomodoro',
                timerValue: DEFAULT_TIMER_TYPES.pomodoro.minutes,
                timer: DEFAULT_TIMER_TYPES.pomodoro.minutes * 60,
                isRunning: false,
                endTime: null,
                timerTypes: DEFAULT_TIMER_TYPES,
            };
        }
    }

    // Load initial settings
    function loadInitialSettings() {
        try {
            const defaultSettings = {
                soundEnabled: true,
                notificationEnabled: true,
                idleReminderEnabled: true,
                idleReminderInterval: IDLE_NOTIFICATION_INTERVAL,
                autoStartBreaks: true,
                autoStartPomodoros: false,
                volume: 60,
                sound: '/sounds/religion/alert7.mp3',
                timerTypes: DEFAULT_TIMER_TYPES,
            };

            const savedSettings = JSON.parse(localStorage.getItem(TIMER_SETTINGS_KEY) || {});
            return {
                ...defaultSettings,
                ...savedSettings,
                timerTypes: savedSettings.timerTypes || DEFAULT_TIMER_TYPES,
            };
        } catch (error) {
            console.error('Error loading settings:', error);
            return {
                soundEnabled: true,
                notificationEnabled: true,
                idleReminderEnabled: true,
                idleReminderInterval: IDLE_NOTIFICATION_INTERVAL,
                autoStartBreaks: true,
                autoStartPomodoros: false,
                volume: 60,
                sound: '/sounds/religion/alert7.mp3',
                timerTypes: DEFAULT_TIMER_TYPES,
            };
        }
    }

    // Initialize sound player
    useEffect(() => {
        if (soundPlayer) {
            soundPlayer.unload();
        }

        const player = new Howl({
            src: [settings.sound],
            volume: settings.volume / 100,
            preload: true,
        });

        setSoundPlayer(player);

        return () => {
            player.unload();
        };
    }, [settings.sound, settings.volume]);

    // Save state to localStorage
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

    // Save settings to localStorage
    useEffect(() => {
        localStorage.setItem(TIMER_SETTINGS_KEY, JSON.stringify(settings));
    }, [settings]);

    // Load stats
    useEffect(() => {
        const allStats = JSON.parse(localStorage.getItem(STATS_KEY)) || {};
        const dateKey = selectedDate.format('YYYY-MM-DD');
        setStats(allStats[dateKey] || { pomodoros: 0, focusTime: 0, breaks: 0, breakTime: 0 });
    }, [selectedDate]);

    // Timer logic
    useEffect(() => {
        let interval;

        const tick = () => {
            setState(prev => {
                const now = Date.now();
                const remainingSeconds = Math.max(0, Math.floor((prev.endTime - now) / 1000));

                if (remainingSeconds <= 0) {
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
        };

        if (state.isRunning) {
            interval = setInterval(tick, 1000);
            tick(); // Immediate tick
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [state.isRunning, state.endTime]);

    // Page visibility
    useEffect(() => {
        const handleVisibilityChange = () => {
            setIsPageVisible(!document.hidden);
            if (document.hidden && state.isRunning) {
                toast(
                    <div className='text-center'>
                        <p className='font-bold mb-2'>Stay focused! ✨</p>
                        <p>Your timer is still running in the background.</p>
                    </div>,
                    { duration: 3000, icon: '🧠' },
                );
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, [state.isRunning]);

    // Timer completion handler
    const handleTimerCompletion = () => {
        updateStats(state.timerType, state.timerValue * 60);

        if (soundPlayer && settings.soundEnabled) {
            soundPlayer.stop();
            soundPlayer.loop(true);
            soundPlayer.play();
        }

        setGlobalNotification({
            type: state.timerType,
            message: state.timerType === 'pomodoro' ? 'Your work session is complete! Time for a break.' : 'Your break is over! Time to get back to work.',
        });

        showTimerNotification();
    };

    // Clear notification
    const clearGlobalNotification = () => {
        setGlobalNotification(null);
        if (soundPlayer) soundPlayer.stop();
    };

    // Show timer notification
    const showTimerNotification = () => {
        if (!settings.notificationEnabled) return;

        const title = `${state.timerTypes[state.timerType].label} Complete`;
        const message = state.timerType === 'pomodoro' ? 'Time for a break!' : 'Time to get back to work!';

        if (Notification.permission === 'granted') {
            try {
                const notification = new Notification(title, {
                    body: message,
                    icon: '/favicon.ico',
                    requireInteraction: true,
                });

                notification.onclick = () => {
                    forceFocus();
                    notification.close();
                };
            } catch (e) {
                console.error('Notification error:', e);
            }
        }

        toast.success(`${state.timerTypes[state.timerType].label} session completed!`, {
            duration: 3000,
            action: {
                label: 'Focus Now',
                onClick: forceFocus,
            },
        });
    };

    // Force focus
    const forceFocus = () => {
        clearGlobalNotification();
        try {
            window.focus();
            window.location.hash = 'pomodoro-completed';
            window.location.hash = '';
        } catch (e) {
            console.error('Focus error:', e);
        }
    };

    // Update stats
    const updateStats = (type, duration) => {
        try {
            const today = dayjs().format('YYYY-MM-DD');
            const allStats = JSON.parse(localStorage.getItem(STATS_KEY)) || {};
            const dayStats = allStats[today] || { pomodoros: 0, focusTime: 0, breaks: 0, breakTime: 0 };

            if (type === 'pomodoro') {
                dayStats.pomodoros = (dayStats.pomodoros || 0) + 1;
                dayStats.focusTime = (dayStats.focusTime || 0) + duration;
            } else {
                dayStats.breaks = (dayStats.breaks || 0) + 1;
                dayStats.breakTime = (dayStats.breakTime || 0) + duration;
            }

            allStats[today] = dayStats;
            localStorage.setItem(STATS_KEY, JSON.stringify(allStats));
            setStats(dayStats);
        } catch (error) {
            console.error('Error updating stats:', error);
        }
    };

    // Timer controls
    const startTimer = (type = state.timerType) => {
        const minutes = state.timerTypes[type].minutes;
        const endTime = Date.now() + minutes * 60 * 1000;

        setState(prev => ({
            ...prev,
            timerType: type,
            timerValue: minutes,
            timer: minutes * 60,
            isRunning: true,
            endTime,
        }));
    };

    const pauseTimer = () => {
        setState(prev => ({
            ...prev,
            isRunning: false,
            endTime: null,
        }));
    };

    const resetTimer = () => {
        if (soundPlayer && settings.soundEnabled) soundPlayer.stop();
        setState(prev => ({
            ...prev,
            timer: prev.timerTypes[prev.timerType].minutes * 60,
            isRunning: false,
            endTime: null,
        }));
        clearGlobalNotification();
    };

    const changeTimerType = type => {
        setState(prev => {
            if (prev.isRunning) {
                return {
                    ...prev,
                    timerType: type,
                    timerValue: prev.timerTypes[type].minutes,
                    timer: prev.timerTypes[type].minutes * 60,
                    isRunning: false,
                    endTime: null,
                };
            }
            return {
                ...prev,
                timerType: type,
                timerValue: prev.timerTypes[type].minutes,
                timer: prev.timerTypes[type].minutes * 60,
            };
        });
    };

    // Settings management
    const openSettings = () => {
        setTempSettings(settings);
        setSettingsOpen(true);
    };

    const saveSettings = () => {
        setSettings(tempSettings);
        setSettingsOpen(false);
    };

    const handleSettingChange = newSettings => {
        setTempSettings(prev => ({
            ...prev,
            ...newSettings,
        }));
    };

    // Time editing
    const [editingTime, setEditingTime] = useState(false);
    const [tempTime, setTempTime] = useState('');

    const handleTimeClick = () => {
        if (!state.isRunning) {
            setEditingTime(true);
            const minutes = Math.floor(state.timer / 60);
            const seconds = state.timer % 60;
            setTempTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
        }
    };

    const handleTimeChange = e => setTempTime(e.target.value);

    const handleTimeBlur = () => {
        const [minutesStr, secondsStr] = tempTime.split(':');
        let minutes = parseInt(minutesStr) || 0;
        let seconds = parseInt(secondsStr) || 0;

        minutes = Math.min(99, Math.max(0, minutes));
        seconds = Math.min(59, Math.max(0, seconds));

        const totalSeconds = minutes * 60 + seconds;

        handleSettingChange({
            timerTypes: {
                ...tempSettings.timerTypes,
                [state.timerType]: {
                    ...tempSettings.timerTypes[state.timerType],
                    minutes: totalSeconds / 60,
                },
            },
        });

        setEditingTime(false);
    };

    const handleKeyDown = e => {
        if (e.key === 'Enter') handleTimeBlur();
        else if (e.key === 'Escape') setEditingTime(false);
    };

    // Skip break
    const handleSkip = () => {
        if (state.timerType !== 'pomodoro') startTimer('pomodoro');
    };

    // Fullscreen
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = () => {
        const clockElement = document.getElementById('clock-pomodoro');

        if (!clockElement) return;

        if (!isFullscreen) {
            clockElement
                .requestFullscreen()
                .then(() => {
                    setIsFullscreen(true);
                    clockElement.classList.add('fullscreen-active');
                })
                .catch(err => {
                    console.error('Error entering fullscreen:', err);
                });
        } else {
            document
                .exitFullscreen()
                .then(() => {
                    setIsFullscreen(false);
                    // Remove fullscreen-specific styles if needed
                    clockElement.classList.remove('fullscreen-active');
                })
                .catch(err => {
                    console.error('Error exiting fullscreen:', err);
                });
        }
    };

    // Stats calculations
    const { pomodoros = 0, focusTime = 0, breaks = 0, breakTime = 0 } = stats;
    const focusMinutes = Math.floor(focusTime / 60);
    const breakMinutes = Math.floor(breakTime / 60);
    const pomodoroPercentage = Math.min(100, Math.round((pomodoros / 8) * 100));
    const focusPercentage = Math.min(100, Math.round((focusMinutes / 120) * 100));

    // Timer display
    const minutes = String(Math.floor(state.timer / 60)).padStart(2, '0');
    const seconds = String(state.timer % 60).padStart(2, '0');

    return (
        <div className='pomodoro-container gap-[20px] mt-[30px] max-lg:mt-0 flex flex-col items-center justify-start min-h-screen text-black p-4'>
            {/* Global Notification */}
            {globalNotification && (
                <div className='fixed inset-0 bg-black bg-opacity-90 z-[9999] flex items-center justify-center p-4'>
                    <div className='bg-white rounded-lg p-6 max-w-md text-center'>
                        <h2 className='text-2xl font-bold mb-4'>⏰ Time's Up!</h2>
                        <p className='mb-4'>{globalNotification.message}</p>
                        <div className='flex flex-col gap-3'>
                            <Button onClick={forceFocus} label='Focus Now' fullWidth />
                            {globalNotification.type === 'pomodoro' && (
                                <Button
                                    onClick={() => {
                                        forceFocus();
                                        startTimer('short');
                                    }}
                                    label='Start Break'
                                    color='green'
                                    fullWidth
                                />
                            )}
                            <Button
                                onClick={() => {
                                    if (soundPlayer) soundPlayer.stop();
                                    clearGlobalNotification();
                                }}
                                label='Dismiss'
                                color='white'
                                fullWidth
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Header */}
            <div className='w-full text-center lg:mt-12 lg:mb-12'>
                <h1 className='text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary-light to-primary bg-clip-text text-transparent'>FocusFlow Pomodoro</h1>
                <p className='max-lg:hidden mt-3 text-lg bg-gradient-to-r from-black to-gray-500 bg-clip-text text-transparent'>Maximize your productivity with science-backed focus sessions</p>
            </div>

            {/* Main Content */}
            <div className='grid grid-cols-[450px,1fr] max-lg:grid-cols-1  w-full items-start justify-start gap-[20px]'>
                {/* Stats Card */}
                <div className='card space-y-5 w-full max-lg:order-[3] '>
                    <h2 className='title-card lg:!mb-12  '>📊 Focus Summary</h2>
                    <DateSelector selectedDate={selectedDate} onChange={setSelectedDate} />
                    <div className='flex flex-col lg:!mt-14 lg:!mb-4 items-center gap-4'>
                        <h2 className='text-lg text-gray-600'>{selectedDate.format('ddd, D MMM YYYY')}</h2>
                    </div>
                    <div className='flex flex-col w-full lg:!mb-10 gap-8'>
                        <ProgressSummary completed={focusMinutes} total={120} percentage={focusPercentage} progressColor='from-blue-400 to-blue-600' label={`⏱ Focus Time (${focusMinutes} min)`} />
                        <ProgressSummary completed={pomodoros} total={8} percentage={pomodoroPercentage} progressColor='from-orange-400 to-orange-600' label={`🍅 Pomodoros (${pomodoros})`} />
                    </div>
                </div>

                {/* Timer Card */}
                <div id='clock-pomodoro' className={isFullscreen ? "card" : ""} >
                    <div className={`  ${isFullscreen ? ' h-full max-w-3xl w-full mx-auto  fixed inset-0 z-50 bg-transparent flex flex-col items-center justify-center' : 'card'}`}>
                        <h2 className=' max-lg:hidden title-card flex items-center justify-between'>
                            Pomodoro Timer
                            <img src='/fullscreen.png' className='cursor-pointer hover:scale-90 duration-300 w-5 h-5' onClick={toggleFullscreen} alt='Toggle fullscreen' />
                        </h2>

                        <div className='bg-background-subtle p-2 rounded-md flex justify-center gap-2 -mt-3 mb-6'>
                            {Object.entries(state.timerTypes).map(([key, value]) => (
                                <button key={key} onClick={() => changeTimerType(key)} className={`px-4 py-1.5 rounded-md text-sm font-medium hover:bg-gradient-to-t hover:from-primary hover:to-blue-400 hover:text-white duration-300 ${state.timerType === key ? 'bg-primary text-white gradient' : 'bg-background-muted text-[#262626]'}`}>
                                    {value.label}
                                </button>
                            ))}
                        </div>

                        {/* Circular Timer */}
                        <div className='relative w-52 h-52 lg:w-64 lg:h-64 mx-auto'>
                            <svg className='absolute top-0 left-0 w-full h-full duration-500 transform -rotate-90' viewBox='0 0 100 100'>
                                <circle className='stroke-background-muted' cx='50' cy='50' r={RADIUS} stroke='#e5e7eb' strokeWidth={STROKE} fill='none' />
                                <circle className='stroke-primary' cx='50' cy='50' r={RADIUS} stroke='#3b82f6' strokeWidth={STROKE} fill='none' strokeDasharray={CIRCUMFERENCE} strokeDashoffset={CIRCUMFERENCE * (1 - (state.timerValue * 60 - state.timer) / (state.timerValue * 60))} strokeLinecap='round' />
                            </svg>

                            <div className='absolute text-text-base text-shadow inset-0 flex items-center justify-center text-4xl lg:text-5xl font-bold'>
                                {editingTime ? (
                                    <input type='text' value={tempTime} onChange={handleTimeChange} onBlur={handleTimeBlur} onKeyDown={handleKeyDown} autoFocus className='w-32 bg-transparent border-none text-center outline-none' pattern='[0-9]{1,2}:[0-9]{2}' placeholder='MM:SS' />
                                ) : (
                                    <div onClick={handleTimeClick} className={`cursor-pointer ${!state.isRunning ? 'hover:text-primary' : ''}`}>
                                        {minutes}:{seconds}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='mt-6 flex items-center justify-center gap-3'>
                            <Button Icon={<RotateCcw size={20} className={'scale-y-[-1]'} />} onClick={resetTimer} color='white' />
                            <Button Icon={state.isRunning ? <Pause size={16} /> : <Play size={16} />} label={state.isRunning ? 'Pause' : 'Play'} cn='!px-[20px] !gap-[5px]' onClick={() => (state.isRunning ? pauseTimer() : startTimer())} />
                            {state.timerType !== 'pomodoro' && <Button Icon={<SkipForward size={20} className={'scale-y-[-1]'} />} onClick={handleSkip} color='red' cn='!px-[20px] !gap-[5px]' label={'Skip Break'} />}
                            <Button Icon={<Settings size={20} />} color='white' onClick={openSettings} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Settings Dialog */}
            <Dialog
                title='Settings'
                open={settingsOpen}
                onClose={() => {
                    // Save automatically when closing
                    setSettings(tempSettings);
                    setSettingsOpen(false);
                }}
                actions={
                    <>
                        <Button
                            label='Cancel'
                            color='white'
                            onClick={() => {
                                // Revert changes when canceling
                                setTempSettings(settings);
                                setSettingsOpen(false);
                            }}
                        />
                        <Button
                            label='Save'
                            onClick={() => {
                                setSettings(tempSettings);
                                setSettingsOpen(false);
                                toast.success('Settings saved successfully!');
                            }}
                            disabled={JSON.stringify(tempSettings) === JSON.stringify(settings)}
                        />
                    </>
                }>
                <div className='space-y-6 text-sm text-text-base p-2 sm:p-4'>
                    <div>
                        <h3 className='font-semibold text-primary mb-6'>⏱ Timer Settings</h3>
                        <div className='grid grid-cols-2 gap-4'>
                            <Input
                                label='Pomodoro'
                                type='number'
                                value={tempSettings.timerTypes?.pomodoro?.minutes || 25}
                                onChange={val => {
                                    handleSettingChange({
                                        timerTypes: {
                                            ...tempSettings.timerTypes,
                                            pomodoro: {
                                                ...tempSettings.timerTypes?.pomodoro,
                                                minutes: val,
                                                label: 'Pomodoro',
                                            },
                                        },
                                    });
                                }}
                                unit='min'
                                min={1}
                                max={90}
                            />
                            <Input
                                label='Short Break'
                                type='number'
                                value={tempSettings.timerTypes?.short?.minutes || 5}
                                onChange={val => {
                                    handleSettingChange({
                                        timerTypes: {
                                            ...tempSettings.timerTypes,
                                            short: {
                                                ...tempSettings.timerTypes?.short,
                                                minutes: val,
                                                label: 'Short Break',
                                            },
                                        },
                                    });
                                }}
                                unit='min'
                                min={1}
                                max={30}
                            />
                            <Input
                                label='Long Break'
                                type='number'
                                value={tempSettings.timerTypes?.long?.minutes || 15}
                                onChange={val => {
                                    handleSettingChange({
                                        timerTypes: {
                                            ...tempSettings.timerTypes,
                                            long: {
                                                ...tempSettings.timerTypes?.long,
                                                minutes: val,
                                                label: 'Long Break',
                                            },
                                        },
                                    });
                                }}
                                unit='min'
                                min={5}
                                max={60}
                            />
                            <Input
                                label='Idle Reminder'
                                type='number'
                                value={tempSettings.idleReminderInterval ? tempSettings.idleReminderInterval / (60 * 1000) : 5}
                                onChange={val => {
                                    handleSettingChange({
                                        idleReminderInterval: val * 60 * 1000,
                                    });
                                }}
                                unit='min'
                                min={1}
                                max={30}
                            />
                        </div>
                    </div>

                    <div>
                        <h3 className='font-semibold text-primary mb-2'>🔊 Sound & Notifications</h3>
                        <div className='space-y-3'>
                            <div className='flex items-center justify-between'>
                                <Label>Enable Sound Alerts</Label>
                                <Switch checked={tempSettings.soundEnabled} onCheckedChange={val => handleSettingChange({ soundEnabled: val })} />
                            </div>

                            <Select label='Default Sound' options={soundOptions} value={soundOptions.find(s => s.key === tempSettings.sound) || soundOptions[0]} onChange={val => handleSettingChange({ sound: val.key })} />

                            <div className='flex items-center justify-between'>
                                <Label>Desktop Notifications</Label>
                                <Switch checked={tempSettings.notificationEnabled} onCheckedChange={val => handleSettingChange({ notificationEnabled: val })} />
                            </div>

                            <div className='flex items-center justify-between gap-[40px]'>
                                <Label className='mb-1 block'>Volume</Label>
                                <Slider value={[tempSettings.volume || 60]} onValueChange={([val]) => handleSettingChange({ volume: val })} max={100} step={5} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className='font-semibold text-primary mb-2'>⚡ Auto Start</h3>
                        <div className='space-y-3'>
                            <div className='flex items-center justify-between'>
                                <Label>Auto-start breaks</Label>
                                <Switch checked={tempSettings.autoStartBreaks} onCheckedChange={val => handleSettingChange({ autoStartBreaks: val })} />
                            </div>

                            <div className='flex items-center justify-between'>
                                <Label>Auto-start pomodoros</Label>
                                <Switch checked={tempSettings.autoStartPomodoros} onCheckedChange={val => handleSettingChange({ autoStartPomodoros: val })} />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className='font-semibold text-primary mb-2'>🕰 Idle Reminders</h3>
                        <div className='space-y-3'>
                            <div className='flex items-center justify-between'>
                                <Label>Enable idle reminders</Label>
                                <Switch checked={tempSettings.idleReminderEnabled} onCheckedChange={val => handleSettingChange({ idleReminderEnabled: val })} />
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
