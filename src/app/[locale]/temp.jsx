'use client';
import React, { useState, useEffect } from 'react';
import { Pause, Play, RotateCcw, SkipForward, Settings } from 'lucide-react';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { Howl } from 'howler';

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

function Button({ Icon, label, onClick, color = 'primary', cn = '', fullWidth = false, loading = false }) {
  const colors = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    white: 'bg-white text-gray-800 hover:bg-gray-100',
    red: 'bg-red-500 text-white hover:bg-red-600',
    green: 'bg-green-500 text-white hover:bg-green-600',
  };

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-300 ${colors[color]} ${fullWidth ? 'w-full' : ''} ${cn}`}
    >
      {loading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
      ) : (
        <>
          {Icon && <span>{Icon}</span>}
          {label && <span>{label}</span>}
        </>
      )}
    </button>
  );
}

function Input({ label, type = 'text', value, onChange, unit, min, max }) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative rounded-md shadow-sm">
        <input
          type={type}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          min={min}
          max={max}
          className="block w-full rounded-md border-gray-300 pl-3 pr-12 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
        {unit && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-gray-500 sm:text-sm">{unit}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function Select({ label, options, value, onChange }) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        value={value.key}
        onChange={e => {
          const selected = options.find(opt => opt.key === e.target.value);
          onChange(selected);
        }}
        className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
      >
        {options.map(option => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function Switch({ checked, onCheckedChange }) {
  return (
    <button
      type="button"
      className={`${checked ? 'bg-blue-500' : 'bg-gray-200'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      onClick={() => onCheckedChange(!checked)}
    >
      <span
        className={`${checked ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
      />
    </button>
  );
}

function Label({ children, className = '' }) {
  return <span className={`text-sm font-medium text-gray-700 ${className}`}>{children}</span>;
}

function Slider({ value, onValueChange, max, step }) {
  return (
    <div className="w-full">
      <input
        type="range"
        min="0"
        max={max}
        step={step}
        value={value}
        onChange={e => onValueChange([Number(e.target.value)])}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}

function Dialog({ title, open, onClose, children, actions }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        </div>
        <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>
        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
                <div className="mt-4">{children}</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
            {actions}
          </div>
        </div>
      </div>
    </div>
  );
}

function DateSelector({ selectedDate, onChange }) {
  const goToPreviousDay = () => {
    onChange(selectedDate.subtract(1, 'day'));
  };

  const goToNextDay = () => {
    onChange(selectedDate.add(1, 'day'));
  };

  const isToday = selectedDate.isSame(dayjs(), 'day');

  return (
    <div className="flex items-center justify-between w-full">
      <button onClick={goToPreviousDay} className="p-2 rounded-md hover:bg-gray-100">
        &larr;
      </button>
      <input
        type="date"
        value={selectedDate.format('YYYY-MM-DD')}
        onChange={e => onChange(dayjs(e.target.value))}
        className="text-center bg-transparent border-none outline-none"
      />
      <button
        onClick={goToNextDay}
        className="p-2 rounded-md hover:bg-gray-100"
        disabled={isToday}
      >
        &rarr;
      </button>
    </div>
  );
}

function ProgressSummary({ completed, total, percentage, progressColor, label }) {
  const progressWidth = `${Math.min(100, percentage)}%`;

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-500">{completed}/{total}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full bg-gradient-to-r ${progressColor}`}
          style={{ width: progressWidth }}
        ></div>
      </div>
    </div>
  );
}

function CircularTimer({ isRunning, timer, timerValue, onClick, editingTime, tempTime, onTimeChange, onTimeBlur, onKeyDown }) {
  const progress = (timerValue * 60 - timer) / (timerValue * 60);
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  const angle = progress * 360;
  const dotX = 50 + RADIUS * Math.cos((angle - -2) * (Math.PI / 180));
  const dotY = 50 + RADIUS * Math.sin((angle - -2) * (Math.PI / 180));

  const minutes = String(Math.floor(timer / 60)).padStart(2, '0');
  const seconds = String(timer % 60).padStart(2, '0');

  return (
    <div className="relative w-64 h-64 mx-auto">
      <svg className="absolute top-0 left-0 w-full h-full duration-500 transform -rotate-90" viewBox="0 0 100 100">
        <circle className="stroke-gray-200" cx="50" cy="50" r={RADIUS} strokeWidth={STROKE} fill="none" />
        <circle className="stroke-blue-500" cx="50" cy="50" r={RADIUS} strokeWidth={STROKE} fill="none" strokeDasharray={CIRCUMFERENCE} strokeDashoffset={dashOffset} strokeLinecap="round" />
        {progress > 0.00001 && <circle className="fill-blue-500" cx={dotX} cy={dotY} r="3.5" stroke="#eee" strokeWidth="1" />}
      </svg>

      <div className="absolute text-gray-800 inset-0 flex items-center justify-center text-5xl font-bold">
        {editingTime ? (
          <input
            type="text"
            value={tempTime}
            onChange={onTimeChange}
            onBlur={onTimeBlur}
            onKeyDown={onKeyDown}
            autoFocus
            className="w-32 bg-transparent border-none text-center outline-none"
            pattern="[0-9]{1,2}:[0-9]{2}"
            placeholder="MM:SS"
          />
        ) : (
          <div
            onClick={onClick}
            className={`cursor-pointer ${!isRunning ? 'hover:text-blue-500' : ''}`}
          >
            {minutes}:{seconds}
          </div>
        )}
      </div>
    </div>
  );
}

export default function PomodoroApp() {
  // State management
  const [state, setState] = useState(() => {
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
  });

  const [settings, setSettings] = useState(() => {
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
  });

  const [soundPlayer, setSoundPlayer] = useState(null);
  const [globalNotification, setGlobalNotification] = useState(null);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [stats, setStats] = useState({});
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [tempSettings, setTempSettings] = useState(settings);
  const [editingTime, setEditingTime] = useState(false);
  const [tempTime, setTempTime] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

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
          { duration: 5000, icon: '🧠' },
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
      duration: Infinity,
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
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
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
    <div className='gap-[20px] mt-[30px] flex flex-col items-center justify-start min-h-screen text-black p-4'>
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
      <div className='w-full text-center mt-12 mb-12'>
        <h1 className='text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent'>FocusFlow Pomodoro</h1>
        <p className='mt-3 text-lg bg-gradient-to-r from-black to-gray-500 bg-clip-text text-transparent'>Maximize your productivity with science-backed focus sessions</p>
      </div>

      {/* Main Content */}
      <div className='grid grid-cols-1 lg:grid-cols-[450px,1fr] w-full items-start justify-start gap-[20px]'>
        {/* Stats Card */}
        <div className='bg-white rounded-lg shadow-md p-6 space-y-5 w-full'>
          <h2 className='text-xl font-bold text-gray-800 mb-12'>📊 Focus Summary</h2>
          <DateSelector selectedDate={selectedDate} onChange={setSelectedDate} />
          <div className='flex flex-col mt-14 mb-4 items-center gap-4'>
            <h2 className='text-lg text-gray-600'>{selectedDate.format('ddd, D MMM YYYY')}</h2>
          </div>
          <div className='flex flex-col w-full mb-10 gap-8'>
            <ProgressSummary completed={focusMinutes} total={120} percentage={focusPercentage} progressColor='from-blue-400 to-blue-600' label={`⏱ Focus Time (${focusMinutes} min)`} />
            <ProgressSummary completed={pomodoros} total={8} percentage={pomodoroPercentage} progressColor='from-orange-400 to-orange-600' label={`🍅 Pomodoros (${pomodoros})`} />
          </div>
        </div>

        {/* Timer Card */}
        <div className={`bg-white rounded-lg shadow-md p-6 ${isFullscreen ? 'fixed inset-0 z-50 flex flex-col items-center justify-center' : ''}`}>
          <h2 className='text-xl font-bold text-gray-800 flex items-center justify-between'>
            Pomodoro Timer
            <button onClick={toggleFullscreen} className='cursor-pointer hover:scale-90 duration-300'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </button>
          </h2>

          <div className='bg-gray-100 p-2 rounded-md flex justify-center gap-2 -mt-3 mb-6'>
            {Object.entries(state.timerTypes).map(([key, value]) => (
              <button
                key={key}
                onClick={() => changeTimerType(key)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium hover:bg-gradient-to-t hover:from-blue-500 hover:to-blue-400 hover:text-white duration-300 ${state.timerType === key ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}
              >
                {value.label}
              </button>
            ))}
          </div>

          <CircularTimer
            isRunning={state.isRunning}
            timer={state.timer}
            timerValue={state.timerValue}
            onClick={handleTimeClick}
            editingTime={editingTime}
            tempTime={tempTime}
            onTimeChange={handleTimeChange}
            onTimeBlur={handleTimeBlur}
            onKeyDown={handleKeyDown}
          />

          <div className='mt-6 flex items-center justify-center gap-3'>
            <Button Icon={<RotateCcw size={20} className={'scale-y-[-1]'} />} onClick={resetTimer} color='white' />
            <Button Icon={state.isRunning ? <Pause size={16} /> : <Play size={16} />} label={state.isRunning ? 'Pause' : 'Play'} cn='!px-[20px] !gap-[5px]' onClick={() => (state.isRunning ? pauseTimer() : startTimer())} />
            {state.timerType !== 'pomodoro' && <Button Icon={<SkipForward size={20} className={'scale-y-[-1]'} />} onClick={handleSkip} color='red' cn='!px-[20px] !gap-[5px]' label={'Skip Break'} />}
            <Button Icon={<Settings size={20} />} color='white' onClick={openSettings} />
          </div>
        </div>
      </div>

      {/* Settings Dialog */}
      <Dialog
        title='Settings'
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        actions={
          <>
            <Button label='Cancel' color='white' onClick={() => setSettingsOpen(false)} />
            <Button label='Save' onClick={saveSettings} />
          </>
        }>
        <div className='space-y-6 text-sm text-gray-800 p-2 sm:p-4'>
          <div>
            <h3 className='font-semibold text-blue-500 mb-6'>⏱ Timer Settings</h3>
            <div className='grid grid-cols-2 gap-4'>
              <Input
                label='Pomodoro'
                type='number'
                value={tempSettings.timerTypes?.pomodoro?.minutes || 25}
                onChange={val =>
                  handleSettingChange({
                    timerTypes: {
                      ...tempSettings.timerTypes,
                      pomodoro: {
                        ...tempSettings.timerTypes?.pomodoro,
                        minutes: val,
                        label: 'Pomodoro',
                      },
                    },
                  })
                }
                unit='min'
                min={0}
                max={90}
              />
              <Input
                label='Short Break'
                type='number'
                value={tempSettings.timerTypes?.short?.minutes || 5}
                onChange={val =>
                  handleSettingChange({
                    timerTypes: {
                      ...tempSettings.timerTypes,
                      short: {
                        ...tempSettings.timerTypes?.short,
                        minutes: val,
                        label: 'Short Break',
                      },
                    },
                  })
                }
                unit='min'
                min={0}
                max={30}
              />
              <Input
                label='Long Break'
                type='number'
                value={tempSettings.timerTypes?.long?.minutes || 15}
                onChange={val =>
                  handleSettingChange({
                    timerTypes: {
                      ...tempSettings.timerTypes,
                      long: {
                        ...tempSettings.timerTypes?.long,
                        minutes: val,
                        label: 'Long Break',
                      },
                    },
                  })
                }
                unit='min'
                min={5}
                max={60}
              />
              <Input
                label='Idle Reminder'
                type='number'
                value={tempSettings.idleReminderInterval ? tempSettings.idleReminderInterval / (60 * 1000) : 5}
                onChange={val =>
                  handleSettingChange({
                    idleReminderInterval: val * 60 * 1000,
                  })
                }
                unit='min'
                min={0}
                max={30}
              />
            </div>
          </div>

          <div>
            <h3 className='font-semibold text-blue-500 mb-2'>🔊 Sound & Notifications</h3>
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
            <h3 className='font-semibold text-blue-500 mb-2'>⚡ Auto Start</h3>
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
            <h3 className='font-semibold text-blue-500 mb-2'>🕰 Idle Reminders</h3>
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