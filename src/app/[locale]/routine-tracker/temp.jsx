'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Button from '@/components/atoms/Button';
import CheckToggle from '@/components/atoms/CheckBox';
import Input2 from '@/components/atoms/Input2';
import SelectDefault from '@/components/atoms/SelectDefault';
import SelectTime from '@/components/atoms/SelectTime';
import StyledDateInput from '@/components/atoms/StyledDateInput';
import Dialog from '@/components/molecules/Dialog';
import TimetableSkeleton from '@/components/skeleton/TimeTableSkeleton';
import { Notification } from '@/config/Notification';
import { dayNames, days, statusBg, statusColorUncheckd, statusIcons } from '@/helper/fakeData';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Edit, Focus, Trash, Sun, Moon, BarChart2, X } from 'lucide-react';
import { cn } from '@/helper/cn';

export const routinesData = [
  {
    id: 13,
    title: 'Check Sugar Level',
    timeStart: '2025-06-29T16:28:00',
    status: 'pending',
    repeat: {
      type: 'interval',
      interval: 1,
      times: ['17:45'],
      repeatWithinDay: {
        enabled: true,
        intervalHours: 4,
        endTime: '23:00',
      },
    },
  },
  {
    id: 1,
    title: 'Morning Medication',
    timeStart: '2025-06-19T11:00:00',
    status: 'pending',
    repeat: {
      type: 'interval',
      interval: 1,
      times: ['08:00'],
      repeatWithinDay: {
        enabled: true,
        intervalHours: 4,
        endTime: '20:00',
      },
    },
  },
];

export default function RoutineTracker({ isLoading }) {
  const t = useTranslations('RoutineTracker');
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [routines, setRoutines] = useState(routinesData);
  const [isDeleting, setIsDeleting] = useState(null);
  const [deleteMode, setDeleteMode] = useState('single'); // 'single' or 'all'
  const [alertingRoutine, setAlertingRoutine] = useState(null);
  const [gridContent, setGridContent] = useState([]);
  const [now, setNow] = useState(Date.now());
  const [focusDate, setFocusDate] = useState(new Date());
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isFocusedView, setIsFocusedView] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [stats, setStats] = useState({ completed: 0, pending: 0, missed: 0 });
  const [userInteracted, setUserInteracted] = useState(false);

  const [newRoutine, setNewRoutine] = useState({
    title: '',
    baseTime: '',
    status: 'pending',
    repeat: {
      type: 'interval',
      interval: 1,
      daysOfWeek: [],
      times: ['08:00'],
      repeatWithinDay: {
        enabled: false,
        intervalHours: 2,
        endTime: '20:00',
      },
    },
  });

  const audioRefs = {
    done: useRef(null),
    undo: useRef(null),
    alert: useRef(null),
  };

  // Initialize audio and dark mode
  useEffect(() => {
    audioRefs.done.current = new Audio('/sounds/check.wav');
    audioRefs.undo.current = new Audio('/sounds/check.wav');
    audioRefs.alert.current = new Audio('/sounds/religion/alert8.mp3');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
    }
  }, []);

  // Apply dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Calculate statistics
  useEffect(() => {
    const completed = routines.filter(r => r.status === 'completed').length;
    const pending = routines.filter(r => r.status === 'pending').length;
    const missed = routines.filter(r => r.status === 'missed').length;
    setStats({ completed, pending, missed });
  }, [routines]);

  // Check for due routines
  useEffect(() => {
    const dueRoutines = routines.filter(routine => routine.status === 'pending' && checkIfNow(routine.timeStart) && (!alertingRoutine || alertingRoutine.id !== routine.id));

    if (dueRoutines.length > 0 && !alertingRoutine && userInteracted) {
      try {
        audioRefs.alert.current.play();
      } catch (e) {
        console.log("Audio play failed - user hasn't interacted yet");
      }
      setAlertingRoutine(dueRoutines[0]);
      showDesktopNotification(dueRoutines[0]);
    }
  }, [now, routines, alertingRoutine, userInteracted]);

  // Track user interaction for audio
  useEffect(() => {
    const handleInteraction = () => setUserInteracted(true);
    window.addEventListener('click', handleInteraction);
    return () => window.removeEventListener('click', handleInteraction);
  }, []);

  // Show desktop notification
  const showDesktopNotification = routine => {
    if (Notification.permission === 'granted') {
      new Notification(t('notificationTitle'), {
        body: t('notificationBody', { title: routine.title }),
        icon: '/favicon.ico',
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(t('notificationTitle'), {
            body: t('notificationBody', { title: routine.title }),
            icon: '/favicon.ico',
          });
        }
      });
    }
  };

  // Time and date helpers
  const formatTime12Hour = timeString => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const displayTime = isoString => {
    const date = new Date(isoString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return formatTime12Hour(`${hours}:${minutes}`);
  };

  const checkIfNow = isoString => {
    const now = new Date();
    const target = new Date(isoString);
    const isSameDay = now.getFullYear() === target.getFullYear() && now.getMonth() === target.getMonth() && now.getDate() === target.getDate();
    const diff = Math.abs(now.getTime() - target.getTime());
    return isSameDay && diff <= 2 * 60 * 1000;
  };

  // Routine actions
  const handleMissed = id => {
    setRoutines(prev => prev.map(r => (r.id === id ? { ...r, status: 'missed' } : r)));
  };

  const handleSnooze = (id, mins) => {
    const now = new Date();
    setRoutines(prev =>
      prev.map(r => {
        if (r.id !== id) return r;
        const newTime = new Date(now.getTime() + mins * 60 * 1000).toISOString();
        return {
          ...r,
          status: 'pending',
          timeStart: newTime,
        };
      }),
    );

    setTimeout(() => {
      if (userInteracted) {
        audioRefs.alert.current?.play();
      }
      const routine = routines.find(r => r.id === id);
      Notification('success', t('snoozeNotification', { title: routine?.title }));
    }, mins * 60 * 1000);
  };

  const handleDone = id => {
    if (userInteracted) {
      audioRefs.done.current.play();
    }
    setRoutines(prev => prev.map(r => (r.id === id ? { ...r, status: 'completed' } : r)));
  };

  const handlePending = id => {
    if (userInteracted) {
      audioRefs.undo.current.play();
    }
    setRoutines(prev => prev.map(r => (r.id === id ? { ...r, status: 'pending' } : r)));
  };

  const confirmDelete = (id, mode = 'single') => {
    setIsDeleting(id);
    setDeleteMode(mode);
  };

  const handleDelete = () => {
    if (deleteMode === 'all') {
      // Delete all instances of this routine (same title and repeat pattern)
      const routineToDelete = routines.find(r => r.id === isDeleting);
      setRoutines(prev => prev.filter(r => !(r.title === routineToDelete.title && JSON.stringify(r.repeat) === JSON.stringify(routineToDelete.repeat))));
    } else {
      // Delete single instance
      setRoutines(prev => prev.filter(r => r.id !== isDeleting));
    }
    setIsDeleting(null);
    Notification(t('deleteSuccess'), 'success');
  };

  const handleEdit = id => {
    const routineToEdit = routines.find(r => r.id === id);
    setNewRoutine({
      ...routineToEdit,
      baseTime: routineToEdit.timeStart,
      timeStart: routineToEdit.timeStart.split('T')[0] + 'T' + routineToEdit.timeStart.split('T')[1].substring(0, 5),
    });
    setShowCreateDialog(true);
  };

  // Calendar helpers
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendarDays = (year, month) => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = new Date(year, month, 1).getDay();
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDateSelect = date => {
    if (date) {
      setFocusDate(date);
      setShowCalendar(false);
    }
  };

  // Generate time slots for repeating routines
  const generateTimeSlots = (startTime, intervalHours, endTime) => {
    const slots = [];
    const today = new Date().toISOString().split('T')[0];
    let current = new Date(`${today}T${startTime}`);
    const end = new Date(`${today}T${endTime}`);

    while (current <= end) {
      const hours = current.getHours().toString().padStart(2, '0');
      const minutes = current.getMinutes().toString().padStart(2, '0');
      slots.push(`${hours}:${minutes}`);
      current = new Date(current.getTime() + intervalHours * 60 * 60 * 1000);
    }

    return slots;
  };

  // Create new routine
  const handleCreateRoutine = () => {
    if (!newRoutine.title.trim()) {
      Notification(t('titleRequired'), 'error');
      return;
    }

    const newId = Math.max(...routines.map(r => r.id), 0) + 1;
    const baseDate = new Date(newRoutine.baseTime || new Date());
    const { type, interval, daysOfWeek, times, repeatWithinDay } = newRoutine.repeat;

    const dailyTimeSlots = repeatWithinDay.enabled ? generateTimeSlots(times[0], repeatWithinDay.intervalHours, repeatWithinDay.endTime) : times;

    const newRoutines = [];
    const daysToGenerate = 30;

    for (let dayOffset = 0; dayOffset < daysToGenerate; dayOffset++) {
      const currentDate = new Date(baseDate);
      currentDate.setDate(currentDate.getDate() + dayOffset);

      let shouldInclude = false;

      if (type === 'interval') {
        shouldInclude = dayOffset % interval === 0;
      } else if (type === 'weekly') {
        const dayOfWeek = (currentDate.getDay() + 1) % 7;
        shouldInclude = daysOfWeek.includes(dayOfWeek);
      } else if (type === 'monthly') {
        shouldInclude = currentDate.getDate() === baseDate.getDate();
      }

      if (shouldInclude) {
        dailyTimeSlots.forEach((time, i) => {
          const [hours, minutes] = time.split(':');
          const timeStart = new Date(currentDate);
          timeStart.setHours(parseInt(hours));
          timeStart.setMinutes(parseInt(minutes));

          newRoutines.push({
            id: newId + dayOffset * 100 + i,
            title: newRoutine.title,
            timeStart: timeStart.toISOString(),
            status: newRoutine.status,
            repeat: { ...newRoutine.repeat },
          });
        });
      }
    }

    setRoutines(prev => [...prev, ...newRoutines]);
    setShowCreateDialog(false);
    Notification(t('createSuccess'), 'success');
    resetNewRoutine();
  };

  const resetNewRoutine = () => {
    setNewRoutine({
      title: '',
      baseTime: '',
      status: 'pending',
      repeat: {
        type: 'interval',
        interval: 1,
        daysOfWeek: [],
        times: ['08:00'],
        repeatWithinDay: {
          enabled: false,
          intervalHours: 2,
          endTime: '20:00',
        },
      },
    });
  };

  // Get visible days (2 before, current, 2 after)
  const getVisibleDays = () => {
    const visibleDays = [];
    const focusDay = new Date(focusDate);

    for (let i = -2; i <= 2; i++) {
      const date = new Date(focusDay);
      date.setDate(date.getDate() + i);
      visibleDays.push({
        date,
        dayIndex: (date.getDay() + 1) % 7,
        dayName: days[(date.getDay() + 1) % 7],
        isToday: date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear(),
      });
    }

    return visibleDays;
  };

  // Generate grid content
  useEffect(() => {
    if (isLoading) return;

    const visibleDays = isFocusedView
      ? [
          {
            date: focusDate,
            dayIndex: (focusDate.getDay() + 1) % 7,
            dayName: days[(focusDate.getDay() + 1) % 7],
            isToday: focusDate.getDate() === new Date().getDate() && focusDate.getMonth() === new Date().getMonth() && focusDate.getFullYear() === new Date().getFullYear(),
          },
        ]
      : getVisibleDays();

    const filteredRoutines = routines.filter(r => {
      const date = new Date(r.timeStart);
      return visibleDays.some(day => date.getDate() === day.date.getDate() && date.getMonth() === day.date.getMonth() && date.getFullYear() === day.date.getFullYear());
    });

    const timeSlots =
      filteredRoutines.length > 0
        ? Array.from(new Set(filteredRoutines.map(r => displayTime(r.timeStart)))).sort((a, b) => {
            const [aTime, aAmPm] = a.split(' ');
            const [bTime, bAmPm] = b.split(' ');
            const [aHours, aMins] = aTime.split(':').map(Number);
            const [bHours, bMins] = bTime.split(':').map(Number);

            // Convert to 24-hour format for proper comparison
            const a24Hour = aAmPm === 'PM' ? (aHours === 12 ? 12 : aHours + 12) : aHours === 12 ? 0 : aHours;

            const b24Hour = bAmPm === 'PM' ? (bHours === 12 ? 12 : bHours + 12) : bHours === 12 ? 0 : bHours;

            // Compare hours first
            if (a24Hour !== b24Hour) return a24Hour - b24Hour;
            // Then compare minutes
            return aMins - bMins;
          })
        : [];

    const grouped = {};
    filteredRoutines.forEach(routine => {
      const date = new Date(routine.timeStart);
      const time = displayTime(routine.timeStart);
      const dayIndex = (date.getDay() + 1) % 7;
      const visibleDay = visibleDays.find(d => d.dayIndex === dayIndex);
      const col = visibleDays.findIndex(d => d.dayIndex === dayIndex) + 2;

      if (col > 1) {
        const key = `${time}-${col}`;
        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(routine);
      }
    });

    const items = [];
    items.push(<div key='head-time' className='w-[full] h-[45px] block bg-background-subtle dark:bg-gray-800 border border-border dark:border-gray-700'></div>);

    visibleDays.forEach((day, i) => {
      const isFocusedDay = day.date.getDate() === focusDate.getDate() && day.date.getMonth() === focusDate.getMonth() && day.date.getFullYear() === focusDate.getFullYear();

      items.push(
        <div key={`head-${day.dayName}`} className={cn('border hover:bg-primary hover:text-white hover:scale-[1.02] border-border dark:border-gray-700 text-sm !px-[50px] p-1 text-center font-semibold relative transition-all duration-300 cursor-pointer', day.isToday ? 'bg-primary text-white ring-2 ring-primary' : isFocusedDay ? 'bg-primary text-white ring-2 ring-primary' : 'bg-background-subtle dark:bg-gray-800 dark:text-white')} style={{ gridArea: `1 / ${i + 2} / 2 / ${i + 3}` }} onClick={() => setFocusDate(day.date)}>
          {day.dayName}
          <div className='text-xs font-normal'>
            {day.date.getDate()}/{day.date.getMonth() + 1}
          </div>
          {day.isToday && (
            <button
              onClick={e => {
                e.stopPropagation();
                setIsFocusedView(!isFocusedView);
              }}
              className='absolute top-1/2 -translate-y-1/2 right-2 bg-white dark:bg-gray-700 text-primary dark:text-white border dark:border-gray-600 rounded-full p-1 shadow hover:scale-110 duration-500'
              title={isFocusedView ? t('showAllDays') : t('focusToday')}>
              <Focus size={14} />
            </button>
          )}
        </div>,
      );
    });

    // Show empty state if no routines for visible days
    if (timeSlots.length === 0) {
      items.push(
        <div key='empty-state' className='col-span-full flex flex-col items-center justify-center py-10 px-4 text-center' style={{ gridArea: `2 / 1 / 3 / ${visibleDays.length + 2}` }}>
          <div className='bg-gray-100 dark:bg-gray-800 p-6 rounded-lg max-w-md w-full'>
            <h3 className='text-lg font-medium text-gray-900 dark:text-white mb-2'>{t('noTasksTitle')}</h3>
            <p className='text-gray-600 dark:text-gray-300 mb-4'>{t('noTasksDescription')}</p>
            <Button onClick={() => setShowCreateDialog(true)} label={t('addFirstTask')} color='primary' icon={<Plus size={16} />} />
          </div>
        </div>,
      );
    } else {
      timeSlots.forEach((time, rowIdx) => {
        const cellVariants = {
          initial: { opacity: 0, scale: 0.85, y: 20 },
          animate: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          },
          exit: {
            opacity: 0,
            scale: 0.85,
            y: 20,
            transition: { duration: 0.4, ease: 'easeInOut' },
          },
        };

        items.push(
          <div key={`time-${time}`} className='flex items-center justify-center border border-border dark:border-gray-700 text-sm p-1 font-semibold bg-background-subtle dark:bg-gray-800 dark:text-white' style={{ gridArea: `${rowIdx + 2} / 1 / ${rowIdx + 3} / 2` }}>
            {time}
          </div>,
        );

        visibleDays.forEach((day, colIdx) => {
          const col = colIdx + 2;
          const key = `${time}-${col}`;
          const routinesInCell = grouped[key] || [];
          const isFocusedDay = day.date.getDate() === focusDate.getDate() && day.date.getMonth() === focusDate.getMonth() && day.date.getFullYear() === focusDate.getFullYear();

          items.push(
            <motion.div
              key={`cell-${time}-${col}`}
              variants={cellVariants}
              initial='initial'
              animate='animate'
              exit='exit'
              className={cn('flex flex-col gap-2 p-2 transition-all outline-3 outline-border/5 outline', isFocusedDay ? 'bg-blue-50 dark:bg-blue-900/30' : 'dark:bg-gray-800/50')}
              style={{
                gridArea: `${rowIdx + 2} / ${col} / ${rowIdx + 3} / ${col + 1}`,
              }}>
              {routinesInCell.map(routine => (
                <RoutineCard key={routine.id} routine={routine} onEdit={handleEdit} onDelete={confirmDelete} onToggleStatus={() => (routine.status === 'completed' ? handlePending(routine.id) : handleDone(routine.id))} t={t} />
              ))}
            </motion.div>,
          );
        });
      });
    }

    setGridContent(items);
  }, [routines, focusDate, now, isLoading, isFocusedView, t]);

  // Update current time every second for precise alerts
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <TimetableSkeleton />;
  }

  return (
    <div className='dark:bg-gray-900 min-h-screen'>
      <Header setShowCalendar={setShowCalendar} showCalendar={showCalendar} focusDate={focusDate} setShowCreateDialog={setShowCreateDialog} handlePrevMonth={handlePrevMonth} currentYear={currentYear} currentMonth={currentMonth} handleNextMonth={handleNextMonth} dayNames={dayNames} calendarDays={generateCalendarDays(currentYear, currentMonth)} handleDateSelect={handleDateSelect} darkMode={darkMode} setDarkMode={setDarkMode} showStats={showStats} setShowStats={setShowStats} t={t} />

      <div className='border border-border/70 dark:border-gray-700 shadow-sm relative rounded-2xl text-center w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-[2px] p-0 min-h-[50vh] mx-auto max-w-7xl'>
        <audio id='alert' controls ref={audioRefs.alert} className='hidden' src='/sounds/religion/alert8.mp3' preload='auto' />
        <div className='w-full max-w-full p-8 mx-auto overflow-auto'>
          <div
            className='grid gap-[3px] transition-all duration-300'
            style={{
              gridTemplateColumns: '80px repeat(5, max-content)',
              gridAutoRows: 'auto',
            }}>
            <AnimatePresence>{gridContent}</AnimatePresence>
          </div>
        </div>
      </div>

      <CreateRoutineDialog open={showCreateDialog} onClose={() => setShowCreateDialog(false)} newRoutine={newRoutine} setNewRoutine={setNewRoutine} onCreate={handleCreateRoutine} t={t} />

      <DeleteConfirmationDialog open={isDeleting !== null} onClose={() => setIsDeleting(null)} onDelete={handleDelete} deleteMode={deleteMode} setDeleteMode={setDeleteMode} t={t} />

      <StatsDialog open={showStats} onClose={() => setShowStats(false)} stats={stats} t={t} />

      <ReminderDialog
        routine={alertingRoutine}
        onClose={() => {
          handleMissed(alertingRoutine?.id);
          setAlertingRoutine(null);
        }}
        onDone={() => {
          handleDone(alertingRoutine?.id);
          setAlertingRoutine(null);
        }}
        onSnooze={mins => {
          handleSnooze(alertingRoutine?.id, mins);
          setAlertingRoutine(null);
        }}
        displayTime={displayTime}
        t={t}
      />
    </div>
  );
}

// Component for Routine Card
function RoutineCard({ routine, onEdit, onDelete, onToggleStatus, t }) {
  return (
    <div id={`routine-${routine.id}`} className={`${statusBg[routine.status]} text-xs px-2 py-2 rounded-md font-normal shadow transition-all duration-200 bg-white dark:bg-gray-700 border border-border dark:border-gray-600 text-gray-800 dark:text-white`}>
      <div className='flex justify-between items-center gap-[5px] mb-[1px]'>
        <div className='font-semibold text-sm flex items-center gap-1'>
          {statusIcons[routine.status]} {routine.title}
          {routine.repeat.interval > 1 && (
            <span className='text-xs ml-1'>
              ({t('every')} {routine.repeat.interval} {routine.repeat.type === 'interval' ? t('days') : routine.repeat.type === 'weekly' ? t('weeks') : t('months')})
            </span>
          )}
        </div>
        <div className='flex items-center gap-1'>
          <button
            onClick={e => {
              e.stopPropagation();
              onEdit(routine.id);
            }}
            className='text-gray-500 hover:text-primary dark:hover:text-blue-400'>
            <Edit size={14} />
          </button>
          <button
            onClick={e => {
              e.stopPropagation();
              onDelete(routine.id);
            }}
            className='text-gray-500 hover:text-error dark:hover:text-red-400'>
            <Trash size={14} />
          </button>
          <CheckToggle className='scale-[.8]' colorUncheckd={statusColorUncheckd[routine.status]} color={routine.status === 'completed' && '!text-white'} checked={routine.status === 'completed'} onToggle={onToggleStatus} />
        </div>
      </div>
      <div className='text-xs text-gray-600 dark:text-gray-300 mt-1'>
        <p>
          {t('time')}: {new Date(routine.timeStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
        {routine.repeat.repeatWithinDay?.enabled && (
          <p>
            {t('repeatsEvery')} {routine.repeat.repeatWithinDay.intervalHours} {t('hoursUntil')} {routine.repeat.repeatWithinDay.endTime}
          </p>
        )}
      </div>
    </div>
  );
}

// Component for Header
function Header({ setShowCalendar, showCalendar, focusDate, setShowCreateDialog, handlePrevMonth, currentYear, currentMonth, handleNextMonth, dayNames, calendarDays, handleDateSelect, darkMode, setDarkMode, showStats, setShowStats, t }) {
  return (
    <div className='card flex relative z-[10] mt-[-5px] !p-[20px] !flex-row !justify-between w-full items-center mb-6 dark:bg-gray-800'>
      <h2 className='text-xl font-semibold dark:text-white'>🗓️ {t('title')}</h2>
      <div className='relative flex items-center gap-2'>
        <button onClick={() => setDarkMode(!darkMode)} className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700' title={darkMode ? t('switchToLight') : t('switchToDark')}>
          {darkMode ? <Sun size={20} className='text-yellow-300' /> : <Moon size={20} />}
        </button>

        <button onClick={() => setShowStats(!showStats)} className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700' title={t('viewStatistics')}>
          <BarChart2 size={20} className='text-gray-600 dark:text-white' />
        </button>

        <button onClick={() => setShowCalendar(!showCalendar)} className='flex items-center gap-3 px-1 py-1 bg-white dark:bg-gray-700 rounded-[8px] shadow-sm hover:shadow-md transition duration-200 border border-gray-200 dark:border-gray-600'>
          <div className='w-[35px] h-[25px] relative overflow-hidden bg-white dark:bg-gray-600 shadow-md rounded-[5px] cursor-pointer'>
            <span className='bg-[#f5746f] w-full block absolute top-0 h-[7px]'></span>
            <span className='w-full text-sm flex absolute bottom-0 h-full pt-[6px] left-0 items-center justify-center font-medium dark:text-white'>{focusDate.toLocaleDateString('en-US', { day: 'numeric' })}</span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xs text-gray-500 dark:text-gray-300 leading-none'>{focusDate.toLocaleDateString('en-US', { month: 'short' })}</span>
            <span className='text-sm font-medium text-gray-900 dark:text-white leading-tight'>{focusDate.toLocaleDateString('en-US', { year: 'numeric' })}</span>
          </div>
        </button>

        <Button onClick={() => setShowCreateDialog(true)} label={t('addRoutine')} icon={<Plus size={16} />} color='primary' />

        {showCalendar && (
          <div className='absolute right-0 top-[120%] !w-[300px] z-[1000] mb-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700'>
            <div className='flex justify-between items-center mb-2'>
              <button onClick={handlePrevMonth} className='p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700'>
                <ChevronLeft size={20} className='text-gray-600 dark:text-white' />
              </button>
              <h3 className='font-semibold dark:text-white'>{new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
              <button onClick={handleNextMonth} className='p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700'>
                <ChevronRight size={20} className='text-gray-600 dark:text-white' />
              </button>
            </div>
            <div className='grid grid-cols-7 gap-1'>
              {dayNames.map(day => (
                <div key={day} className='text-xs font-medium text-center py-1 dark:text-white'>
                  {day.substring(0, 3)}
                </div>
              ))}
              {calendarDays.map((day, index) => (
                <button key={index} onClick={() => handleDateSelect(day)} className={cn('p-2 rounded-full text-sm', !day ? 'invisible' : day.getDate() === focusDate.getDate() && day.getMonth() === focusDate.getMonth() ? 'bg-blue-500 text-white' : day.getDate() === new Date().getDate() && day.getMonth() === new Date().getMonth() ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200' : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white')} disabled={!day}>
                  {day?.getDate()}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Component for Create Routine Dialog
function CreateRoutineDialog({ open, onClose, newRoutine, setNewRoutine, onCreate, t }) {
  return (
    <Dialog title={t('createRoutine')} open={open} onClose={onClose}>
      <div className='py-6 px-2 space-y-5'>
        <div className='space-y-4'>
          <Input2 className='!bg-white dark:!bg-gray-700 dark:text-white' label={t('title')} type='text' value={newRoutine.title} placeholder={t('titlePlaceholder')} onChange={e => setNewRoutine({ ...newRoutine, title: e })} required />

          <StyledDateInput label={t('startDate')} value={newRoutine.baseTime} onChange={newVal => setNewRoutine({ ...newRoutine, baseTime: newVal })} />

          <SelectDefault
            label={t('scheduleType')}
            value={newRoutine.repeat.type}
            onChange={val =>
              setNewRoutine({
                ...newRoutine,
                repeat: {
                  ...newRoutine.repeat,
                  type: val,
                  daysOfWeek: val === 'weekly' ? [0] : [],
                },
              })
            }
            options={[
              { value: 'interval', label: t('everyXDays') },
              { value: 'weekly', label: t('weekly') },
              { value: 'monthly', label: t('monthly') },
            ]}
          />

          {newRoutine.repeat.type === 'interval' && (
            <Input2
              className='!bg-white dark:!bg-gray-700 dark:text-white'
              label={t('daysInterval')}
              type='number'
              min='1'
              value={newRoutine.repeat.interval}
              onChange={e =>
                setNewRoutine({
                  ...newRoutine,
                  repeat: {
                    ...newRoutine.repeat,
                    interval: parseInt(e) || 1,
                  },
                })
              }
            />
          )}

          {newRoutine.repeat.type === 'weekly' && (
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700 dark:text-white'>{t('daysOfWeek')}</label>
              <div className='flex flex-wrap gap-2'>
                {days.map((day, index) => (
                  <button
                    key={day}
                    onClick={() => {
                      const newDays = [...newRoutine.repeat.daysOfWeek];
                      const dayIndex = index;

                      if (newDays.includes(dayIndex)) {
                        newDays.splice(newDays.indexOf(dayIndex), 1);
                      } else {
                        newDays.push(dayIndex);
                      }

                      setNewRoutine({
                        ...newRoutine,
                        repeat: {
                          ...newRoutine.repeat,
                          daysOfWeek: newDays,
                        },
                      });
                    }}
                    className={`px-3 py-1 text-sm rounded-full ${newRoutine.repeat.daysOfWeek.includes(index) ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'}`}>
                    {day}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700 dark:text-white'>{t('timeSettings')}</label>

            <div className='flex items-center gap-2'>
              <CheckToggle
                checked={newRoutine.repeat.repeatWithinDay.enabled}
                onToggle={() =>
                  setNewRoutine({
                    ...newRoutine,
                    repeat: {
                      ...newRoutine.repeat,
                      repeatWithinDay: {
                        ...newRoutine.repeat.repeatWithinDay,
                        enabled: !newRoutine.repeat.repeatWithinDay.enabled,
                      },
                    },
                  })
                }
              />
              <span className='dark:text-white'>{t('repeatThroughoutDay')}</span>
            </div>

            {newRoutine.repeat.repeatWithinDay.enabled ? (
              <div className='grid grid-cols-2 gap-4'>
                <Input2
                  className='!bg-white dark:!bg-gray-700 dark:text-white'
                  label={t('startTime')}
                  type='time'
                  value={newRoutine.repeat.times[0]}
                  onChange={e =>
                    setNewRoutine({
                      ...newRoutine,
                      repeat: {
                        ...newRoutine.repeat,
                        times: [e],
                      },
                    })
                  }
                />

                <Input2
                  className='!bg-white dark:!bg-gray-700 dark:text-white'
                  label={t('repeatEvery')}
                  type='number'
                  min='1'
                  max='12'
                  value={newRoutine.repeat.repeatWithinDay.intervalHours}
                  onChange={e =>
                    setNewRoutine({
                      ...newRoutine,
                      repeat: {
                        ...newRoutine.repeat,
                        repeatWithinDay: {
                          ...newRoutine.repeat.repeatWithinDay,
                          intervalHours: parseInt(e) || 2,
                        },
                      },
                    })
                  }
                />

                <Input2
                  className='!bg-white dark:!bg-gray-700 dark:text-white'
                  label={t('endTime')}
                  type='time'
                  value={newRoutine.repeat.repeatWithinDay.endTime}
                  onChange={e =>
                    setNewRoutine({
                      ...newRoutine,
                      repeat: {
                        ...newRoutine.repeat,
                        repeatWithinDay: {
                          ...newRoutine.repeat.repeatWithinDay,
                          endTime: e,
                        },
                      },
                    })
                  }
                />
              </div>
            ) : (
              <SelectTime
                value={newRoutine.repeat.times[0]}
                label={t('time')}
                onChange={(i, val) => {
                  const newTimes = [...newRoutine.repeat.times];
                  newTimes[0] = val;
                  setNewRoutine({
                    ...newRoutine,
                    repeat: {
                      ...newRoutine.repeat,
                      times: newTimes,
                    },
                  });
                }}
              />
            )}
          </div>
        </div>

        <div className='flex justify-end gap-2 pt-4'>
          <Button onClick={onClose} label={t('cancel')} color='secondary' />
          <Button onClick={onCreate} label={t('saveRoutine')} color='primary' />
        </div>
      </div>
    </Dialog>
  );
}

// Component for Delete Confirmation Dialog
function DeleteConfirmationDialog({ open, onClose, onDelete, deleteMode, setDeleteMode, t }) {
  return (
    <Dialog title={t('confirmDelete')} open={open} onClose={onClose}>
      <div className='p-6 space-y-5'>
        <p className='dark:text-white'>{t('deleteConfirmation')}</p>

        <div className='flex flex-col gap-2'>
          <label className='flex items-center gap-2 dark:text-white'>
            <input type='radio' checked={deleteMode === 'single'} onChange={() => setDeleteMode('single')} className='text-primary focus:ring-primary' />
            {t('deleteSingle')}
          </label>
          <label className='flex items-center gap-2 dark:text-white'>
            <input type='radio' checked={deleteMode === 'all'} onChange={() => setDeleteMode('all')} className='text-primary focus:ring-primary' />
            {t('deleteAllRepeats')}
          </label>
        </div>

        <div className='flex justify-end gap-2 pt-4'>
          <Button onClick={onClose} label={t('cancel')} color='primary' />
          <Button onClick={onDelete} label={t('delete')} color='red' />
        </div>
      </div>
    </Dialog>
  );
}

// Component for Stats Dialog
function StatsDialog({ open, onClose, stats, t }) {
  return (
    <Dialog title={t('statistics')} open={open} onClose={onClose}>
      <div className='p-6 space-y-5'>
        <div className='grid grid-cols-3 gap-4'>
          <div className='bg-green-100 dark:bg-green-900/30 p-4 rounded-lg text-center'>
            <h3 className='font-bold text-green-800 dark:text-green-200'>{t('completed')}</h3>
            <p className='text-2xl font-bold text-green-600 dark:text-green-300'>{stats.completed}</p>
          </div>
          <div className='bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg text-center'>
            <h3 className='font-bold text-blue-800 dark:text-blue-200'>{t('pending')}</h3>
            <p className='text-2xl font-bold text-blue-600 dark:text-blue-300'>{stats.pending}</p>
          </div>
          <div className='bg-red-100 dark:bg-red-900/30 p-4 rounded-lg text-center'>
            <h3 className='font-bold text-red-800 dark:text-red-200'>{t('missed')}</h3>
            <p className='text-2xl font-bold text-red-600 dark:text-red-300'>{stats.missed}</p>
          </div>
        </div>

        <div className='pt-4'>
          <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden'>
            <div
              className='h-full bg-gradient-to-r from-green-500 via-blue-500 to-red-500'
              style={{
                width: `${(stats.completed / (stats.completed + stats.pending + stats.missed)) * 100}%`,
              }}></div>
          </div>
          <div className='flex justify-between text-xs text-gray-600 dark:text-gray-300 mt-1'>
            <span>
              {Math.round((stats.completed / (stats.completed + stats.pending + stats.missed)) * 100)}% {t('completed')}
            </span>
            <span>
              {Math.round((stats.pending / (stats.completed + stats.pending + stats.missed)) * 100)}% {t('pending')}
            </span>
            <span>
              {Math.round((stats.missed / (stats.completed + stats.pending + stats.missed)) * 100)}% {t('missed')}
            </span>
          </div>
        </div>

        <div className='flex justify-end pt-4'>
          <Button onClick={onClose} label={t('close')} color='primary' />
        </div>
      </div>
    </Dialog>
  );
}

// Component for Reminder Dialog
function ReminderDialog({ routine, onClose, onDone, onSnooze, displayTime, t }) {
  if (!routine) return null;

  return (
    <Dialog key={routine.id} title='⏰ Reminder! What do you want to do?' open={true} onClose={onClose}>
      <div className='p-6 space-y-5'>
        <div className='text-sm text-gray-600 dark:text-gray-300'>
          <p>
            <strong>{t('routine')}:</strong> {routine.title}
          </p>
          <p>
            <strong>{t('scheduledTime')}:</strong> {displayTime(routine.timeStart)}
          </p>
        </div>

        <div className='flex justify-end gap-2 pt-4'>
          <Button onClick={onClose} label={t('missed')} color='secondary' />
          <Button onClick={onDone} label={t('doNow')} color='primary' />
          <select
            defaultValue=''
            onChange={e => {
              const value = parseInt(e.target.value);
              if (!isNaN(value)) {
                onSnooze(value);
              }
            }}
            className='text-xs bg-gray-100 dark:bg-gray-700 dark:text-white border rounded px-2 py-1'>
            <option disabled value=''>
              {t('snooze')}...
            </option>
            {[5, 10, 15].map(min => (
              <option key={min} value={min}>
                {min} {t('min')}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Dialog>
  );
}
