'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus, Sun, Moon, BarChart2, Check, Clock, Bell, Trash2, Edit2, X, Calendar as CalendarIcon } from 'lucide-react';

export default function CalendarApp() {
  // State for calendar data and UI
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');
  const [events, setEvents] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showReminder, setShowReminder] = useState(null);
  const [snoozeTime, setSnoozeTime] = useState(5); // in minutes
  const [userInteracted, setUserInteracted] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showDayEvents, setShowDayEvents] = useState(false);
  const [dayEvents, setDayEvents] = useState([]);

  // Audio refs
  const audioRefs = {
    done: useRef(null),
    alert: useRef(null),
  };

  // Categories and colors
  const categories = [
    { id: 'meeting', name: 'Meeting', color: 'bg-blue-500' },
    { id: 'deadline', name: 'Deadline', color: 'bg-red-500' },
    { id: 'personal', name: 'Personal', color: 'bg-green-500' },
    { id: 'medication', name: 'Medication', color: 'bg-purple-500' },
    { id: 'water', name: 'Drink Water', color: 'bg-cyan-500' },
    { id: 'exercise', name: 'Exercise', color: 'bg-orange-500' },
  ];

  // Priority options
  const priorities = [
    { id: 'low', name: 'Low', color: 'bg-green-500' },
    { id: 'medium', name: 'Medium', color: 'bg-yellow-500' },
    { id: 'high', name: 'High', color: 'bg-red-500' },
  ];

  // Status options
  const statusOptions = [
    { id: 'pending', name: 'Pending', color: 'bg-yellow-500', icon: <Clock size={16} /> },
    { id: 'completed', name: 'Completed', color: 'bg-green-500', icon: <Check size={16} /> },
    { id: 'missed', name: 'Missed', color: 'bg-red-500', icon: <X size={16} /> },
  ];

  // Initialize with data and theme
  useEffect(() => {
    // Load events from localStorage
    const storedEvents = localStorage.getItem('calendarEvents');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    } else {
      // Generate fake data if no data exists
      const fakeEvents = generateFakeData();
      setEvents(fakeEvents);
      localStorage.setItem('calendarEvents', JSON.stringify(fakeEvents));
    }

    // Initialize audio
    audioRefs.done.current = new Audio('/sounds/check.wav');
    audioRefs.alert.current = new Audio('/sounds/alert.mp3');

    checkReminders();

    // Track user interaction for audio
    const handleInteraction = () => setUserInteracted(true);
    window.addEventListener('click', handleInteraction);
    return () => window.removeEventListener('click', handleInteraction);
  }, []);

  // Check for reminders periodically
  useEffect(() => {
    const interval = setInterval(() => {
      checkReminders();
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [events]);

  // Generate fake data for testing
  const generateFakeData = () => {
    const fakeEvents = [];
    const today = new Date();

    // Add some events for today
    fakeEvents.push({
      id: '1',
      title: 'Team Standup',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0).toISOString(),
      category: 'meeting',
      priority: 'medium',
      status: 'pending',
      assignedTo: 'John',
      color: 'blue',
      reminder: true,
      repeat: { type: 'none', interval: 1, days: [] },
    });

    fakeEvents.push({
      id: '2',
      title: 'Project Deadline',
      start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 17, 0).toISOString(),
      category: 'deadline',
      priority: 'high',
      status: 'pending',
      assignedTo: 'Sarah',
      color: 'red',
      reminder: true,
      repeat: { type: 'none', interval: 1, days: [] },
    });

    return fakeEvents;
  };

  // Check for events that need reminders
  const checkReminders = () => {
    const now = new Date();
    const upcomingEvents = events.filter(event => {
      const eventStart = new Date(event.start);
      const reminderTime = new Date(eventStart.getTime() - 15 * 60000); // 15 minutes before
      return event.reminder && now >= reminderTime && now <= eventStart && !event.reminderShown && event.status === 'pending';
    });

    if (upcomingEvents.length > 0 && userInteracted) {
      setShowReminder(upcomingEvents[0]);
      playNotificationSound();
      showNotification(upcomingEvents[0]);

      // Update event to mark reminder as shown
      const updatedEvents = events.map(event => {
        if (event.id === upcomingEvents[0].id) {
          return { ...event, reminderShown: true };
        }
        return event;
      });

      setEvents(updatedEvents);
      localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
    }

    // Check for missed events
    const missedEvents = events.filter(event => {
      return event.status === 'pending' && new Date(event.start) < now;
    });

    if (missedEvents.length > 0) {
      const updatedEvents = events.map(event => {
        if (missedEvents.some(e => e.id === event.id)) {
          return { ...event, status: 'missed' };
        }
        return event;
      });
      setEvents(updatedEvents);
      localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
    }
  };

  // Show desktop notification
  const showNotification = event => {
    if (Notification.permission === 'granted') {
      new Notification('Event Reminder', {
        body: `${event.title}\n${formatTime(new Date(event.start))}`,
        icon: '/favicon.ico',
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('Event Reminder', {
            body: `${event.title}\n${formatTime(new Date(event.start))}`,
            icon: '/favicon.ico',
          });
        }
      });
    }
  };

  // Play notification sound
  const playNotificationSound = () => {
    if (userInteracted) {
      audioRefs.alert.current.play().catch(e => console.log('Audio play failed:', e));
    }
  };

  // Format time for display
  const formatTime = date => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Format date for display
  const formatDate = date => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  // Navigate to previous period
  const navigatePrevious = () => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };

  // Navigate to next period
  const navigateNext = () => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  // Go to today
  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  // Handle day click
  const handleDayClick = day => {
    setSelectedDate(day);
    setCurrentEvent({
      id: '',
      title: '',
      start: new Date(day.setHours(10, 0, 0, 0)).toISOString(),
      category: '',
      priority: 'medium',
      status: 'pending',
      assignedTo: '',
      color: 'blue',
      reminder: true,
      repeat: { type: 'none', interval: 1, days: [] },
    });
    setShowEventModal(true);
  };

  // Handle event click
  const handleEventClick = (event, e) => {
    e.stopPropagation();
    setCurrentEvent(event);
    setShowEventModal(true);
  };

  // Show events for a specific day
  const showEventsForDay = day => {
    const eventsForDay = getEventsForDay(day);
    setDayEvents(eventsForDay);
    setShowDayEvents(true);
    setSelectedDate(day);
  };

  // Save event
  const saveEvent = () => {
    if (!currentEvent.title.trim()) {
      alert('Please enter a title for the event');
      return;
    }

    let updatedEvents;
    if (currentEvent.id) {
      // Update existing event
      updatedEvents = events.map(e => (e.id === currentEvent.id ? currentEvent : e));
    } else {
      // Add new event
      const newEvent = {
        ...currentEvent,
        id: Date.now().toString(),
      };

      // Handle recurring events
      if (currentEvent.repeat.type !== 'none') {
        const recurringEvents = createRecurringEvents(newEvent);
        updatedEvents = [...events, ...recurringEvents];
      } else {
        updatedEvents = [...events, newEvent];
      }
    }

    setEvents(updatedEvents);
    localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
    setShowEventModal(false);
  };

  // Create recurring events
  const createRecurringEvents = event => {
    const events = [];
    const startDate = new Date(event.start);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate()); // 1 month ahead

    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      if (event.repeat.type === 'daily' && (currentDate.getDay() - startDate.getDay()) % event.repeat.interval === 0) {
        events.push(createEventInstance(event, currentDate));
      } else if (event.repeat.type === 'weekly' && event.repeat.days.includes(currentDate.getDay())) {
        events.push(createEventInstance(event, currentDate));
      }

      currentDate = new Date(currentDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return events;
  };

  const createEventInstance = (template, date) => {
    const start = new Date(date);
    start.setHours(new Date(template.start).getHours());
    start.setMinutes(new Date(template.start).getMinutes());

    return {
      ...template,
      id: `${template.id}-${date.getTime()}`,
      start: start.toISOString(),
      isRecurring: true,
      originalEventId: template.id,
    };
  };

  // Delete event
  const deleteEvent = () => {
    // If it's a recurring event, delete all instances
    if (currentEvent.isRecurring) {
      const updatedEvents = events.filter(e => e.originalEventId !== currentEvent.originalEventId && e.id !== currentEvent.originalEventId);
      setEvents(updatedEvents);
      localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
    } else {
      const updatedEvents = events.filter(e => e.id !== currentEvent.id);
      setEvents(updatedEvents);
      localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
    }
    setShowEventModal(false);
  };

  // Snooze event
  const snoozeEvent = () => {
    const updatedEvent = {
      ...currentEvent,
      start: new Date(new Date(currentEvent.start).getTime() + snoozeTime * 60000).toISOString(),
      status: 'pending',
      reminderShown: false,
    };

    const updatedEvents = events.map(e => (e.id === currentEvent.id ? updatedEvent : e));
    setEvents(updatedEvents);
    localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
    setShowEventModal(false);
    setShowReminder(null);
  };

  // Toggle event status
  const toggleEventStatus = (eventId, status) => {
    const updatedEvents = events.map(event => {
      if (event.id !== eventId) return event;
      return { ...event, status };
    });

    setEvents(updatedEvents);
    localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));

    if (status === 'completed' && userInteracted) {
      audioRefs.done.current.play().catch(e => console.log(e));
    }
  };

  // Filter events by category
  const filteredEvents = events.filter(event => {
    if (activeFilter === 'all') return true;
    return event.category === activeFilter;
  });

  // Get events for a specific day
  const getEventsForDay = day => {
    return filteredEvents.filter(event => {
      const eventStart = new Date(event.start);
      return eventStart.toDateString() === day.toDateString();
    });
  };

  // Calculate statistics
  const calculateStatistics = () => {
    const now = new Date();
    const stats = {
      completed: 0,
      pending: 0,
      missed: 0,
      byCategory: {},
      byPriority: {
        high: 0,
        medium: 0,
        low: 0,
      },
    };

    events.forEach(event => {
      // Count by status
      stats[event.status]++;

      // Count by category
      if (event.category) {
        stats.byCategory[event.category] = (stats.byCategory[event.category] || 0) + 1;
      }

      // Count by priority
      if (event.priority) {
        stats.byPriority[event.priority]++;
      }

      // Check for missed events
      if (event.status === 'pending' && new Date(event.start) < now) {
        stats.missed++;
      }
    });

    return stats;
  };

  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Generate calendar days for month view
  const generateCalendarDays = (year, month) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay();

    const days = [];

    // Add days from previous month
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = 0; i < startingDayOfWeek; i++) {
      const day = new Date(year, month - 1, prevMonthLastDay - startingDayOfWeek + i + 1);
      days.push(day);
    }

    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(year, month, i);
      days.push(day);
    }

    // Add days from next month
    const remainingDays = 42 - days.length; // 6 weeks
    for (let i = 1; i <= remainingDays; i++) {
      const day = new Date(year, month + 1, i);
      days.push(day);
    }

    return days;
  };

  // Generate days for week view
  const generateWeekDays = date => {
    const days = [];
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }

    return days;
  };

  // Render month view
  const renderMonthView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const days = generateCalendarDays(year, month);

    // Split into weeks
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return (
      <div className='flex-1 overflow-auto'>
        <div className='grid grid-cols-7 gap-[1px] '>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className=' card2 !p-1 text-center font-medium'>
              {day}
            </div>
          ))}

          {weeks.map((week, weekIndex) => (
            <React.Fragment key={weekIndex}>
              {week.map((day, dayIndex) => {
                const isCurrentMonth = day.getMonth() === month;
                const isToday = day.toDateString() === new Date().toDateString();
                const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();
                const dayEvents = getEventsForDay(day);

                return (
                  <div
                    key={dayIndex}
                    className={`min-h-24 card2 !py-0 !px-2  transition-colors
                      ${isCurrentMonth ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}
                      ${isToday ? ' border-2 border-blue-500 dark:border-blue-400' : ''}
                      ${isSelected ? 'bg-blue-50 dark:bg-blue-900' : ''}
                      hover:bg-gray-50 dark:hover:bg-gray-800`}>
                    <div className='flex justify-between items-start'>
                      <div className='text-right p-1 cursor-pointer flex-1' onClick={() => handleDayClick(day)}>
                        {day.getDate()}
                      </div>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          showEventsForDay(day);
                        }}
                        className='p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'>
                        <CalendarIcon size={16} />
                      </button>
                    </div>
                    <div className='space-y-1'>
                      <AnimatePresence>
                        {dayEvents.slice(0, 3).map(event => (
                          <motion.div key={event.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.2 }} onClick={e => handleEventClick(event, e)} className={`text-xs p-1 rounded truncate ${event.color ? `bg-${event.color}-100 dark:bg-${event.color}-900 text-${event.color}-800 dark:text-${event.color}-200` : 'bg-gray-100 dark:bg-gray-800'}`}>
                            <div className='flex items-center gap-1'>
                              {statusOptions.find(s => s.id === event.status)?.icon}
                              {event.title}
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      {dayEvents.length > 3 && <div className='text-xs text-gray-500 dark:text-gray-400'>+{dayEvents.length - 3} more</div>}
                    </div>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  // Render week view
  const renderWeekView = () => {
    const days = generateWeekDays(currentDate);

    return (
      <div className='flex-1 overflow-auto'>
        <div className='grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-700'>
          {days.map(day => {
            const isToday = day.toDateString() === new Date().toDateString();
            const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();
            const dayEvents = getEventsForDay(day);

            return (
              <div
                key={day.toISOString()}
                className={`min-h-32 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700
                  ${isToday ? 'border-2 border-blue-500 dark:border-blue-400' : ''}
                  ${isSelected ? 'bg-blue-50 dark:bg-blue-900' : ''}`}>
                <div className='p-2 border-b border-gray-200 dark:border-gray-700'>
                  <div className='flex justify-between items-center'>
                    <div className='font-medium'>{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                    <div className='flex items-center gap-2'>
                      <div className={`rounded-full w-6 h-6 flex items-center justify-center ${isToday ? 'bg-blue-500 text-white' : ''}`}>{day.getDate()}</div>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          showEventsForDay(day);
                        }}
                        className='p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200'>
                        <CalendarIcon size={16} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className='p-2 space-y-1'>
                  <AnimatePresence>
                    {dayEvents.map(event => (
                      <motion.div key={event.id} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: 0.2 }} onClick={e => handleEventClick(event, e)} className={`text-xs p-1 rounded truncate ${event.color ? `bg-${event.color}-100 dark:bg-${event.color}-900 text-${event.color}-800 dark:text-${event.color}-200` : 'bg-gray-100 dark:bg-gray-800'}`}>
                        <div className='flex items-center gap-1'>
                          {statusOptions.find(s => s.id === event.status)?.icon}
                          {formatTime(new Date(event.start))} - {event.title}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {dayEvents.length === 0 && <div className='text-xs text-gray-400 dark:text-gray-500 text-center py-2'>No events</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render day view
  const renderDayView = () => {
    const day = currentDate;
    const dayEvents = getEventsForDay(day);

    return (
      <div className='flex-1 overflow-auto'>
        <div className='bg-white dark:bg-gray-900 rounded-lg shadow'>
          <div className='p-4 border-b border-gray-200 dark:border-gray-700'>
            <div className='flex justify-between items-center'>
              <h2 className='text-xl font-bold'>{day.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</h2>
              <button onClick={() => handleDayClick(day)} className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700'>
                <Plus size={20} />
              </button>
            </div>
          </div>
          <div className='p-4 space-y-2'>
            {dayEvents.length > 0 ? (
              dayEvents.map(event => (
                <div key={event.id} onClick={e => handleEventClick(event, e)} className={`p-3 rounded-lg cursor-pointer ${event.color ? `bg-${event.color}-100 dark:bg-${event.color}-900 text-${event.color}-800 dark:text-${event.color}-200` : 'bg-gray-100 dark:bg-gray-800'}`}>
                  <div className='flex justify-between items-start'>
                    <div>
                      <div className='font-medium'>{event.title}</div>
                      <div className='text-sm'>
                        {formatTime(new Date(event.start))} - {event.category}
                      </div>
                    </div>
                    <div className='flex items-center gap-2'>
                      {statusOptions.find(s => s.id === event.status)?.icon}
                      {priorities.find(p => p.id === event.priority) && <span className={`w-3 h-3 rounded-full ${priorities.find(p => p.id === event.priority).color}`}></span>}
                    </div>
                  </div>
                  {event.assignedTo && <div className='mt-2 text-xs'>Assigned to: {event.assignedTo}</div>}
                </div>
              ))
            ) : (
              <div className='text-center py-8 text-gray-500 dark:text-gray-400'>No events scheduled for today</div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render mini calendar for month selection
  const renderMiniCalendar = () => {
    const days = generateCalendarDays(currentYear, currentMonth);

    return (
      <div className='absolute right-0 top-[120%] w-[300px] z-50 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700'>
        <div className='flex justify-between items-center mb-2'>
          <button
            onClick={() => {
              if (currentMonth === 0) {
                setCurrentMonth(11);
                setCurrentYear(currentYear - 1);
              } else {
                setCurrentMonth(currentMonth - 1);
              }
            }}
            className='p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700'>
            <ChevronLeft size={20} className='text-gray-600 dark:text-white' />
          </button>
          <h3 className='font-semibold dark:text-white'>{new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h3>
          <button
            onClick={() => {
              if (currentMonth === 11) {
                setCurrentMonth(0);
                setCurrentYear(currentYear + 1);
              } else {
                setCurrentMonth(currentMonth + 1);
              }
            }}
            className='p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700'>
            <ChevronRight size={20} className='text-gray-600 dark:text-white' />
          </button>
        </div>
        <div className='grid grid-cols-7 gap-1'>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
            <div key={day} className='text-xs font-medium text-center py-1 dark:text-white'>
              {day}
            </div>
          ))}
          {days.map((day, index) => (
            <button
              key={index}
              onClick={() => {
                if (day) {
                  setCurrentDate(day);
                  setSelectedDate(day);
                  setShowCalendar(false);
                }
              }}
              className={cn('p-2 rounded-full text-sm', !day ? 'invisible' : day.getDate() === currentDate.getDate() && day.getMonth() === currentDate.getMonth() ? 'bg-blue-500 text-white' : day.getDate() === new Date().getDate() && day.getMonth() === new Date().getMonth() ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200' : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white')}
              disabled={!day}>
              {day?.getDate()}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Render day events sidebar
  const renderDayEventsSidebar = () => {
    if (!showDayEvents || !selectedDate) return null;

    return (
      <div className='fixed inset-0 z-40 overflow-y-auto'>
        <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <div className='fixed inset-0 transition-opacity' aria-hidden='true' onClick={() => setShowDayEvents(false)}>
            <div className='absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75'></div>
          </div>

          <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
            &#8203;
          </span>

          <div className='inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
            <div className='px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='text-lg leading-6 font-medium text-gray-900 dark:text-white'>Events for {formatDate(selectedDate)}</h3>
                <button onClick={() => setShowDayEvents(false)} className='p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700'>
                  <X size={20} />
                </button>
              </div>

              <div className='space-y-2'>
                {dayEvents.length > 0 ? (
                  dayEvents.map(event => (
                    <div
                      key={event.id}
                      onClick={e => {
                        setCurrentEvent(event);
                        setShowEventModal(true);
                        setShowDayEvents(false);
                      }}
                      className={`p-3 rounded-lg cursor-pointer ${event.color ? `bg-${event.color}-100 dark:bg-${event.color}-900 text-${event.color}-800 dark:text-${event.color}-200` : 'bg-gray-100 dark:bg-gray-800'}`}>
                      <div className='flex justify-between items-start'>
                        <div>
                          <div className='font-medium'>{event.title}</div>
                          <div className='text-sm'>
                            {formatTime(new Date(event.start))} - {event.category}
                          </div>
                        </div>
                        <div className='flex items-center gap-2'>
                          {statusOptions.find(s => s.id === event.status)?.icon}
                          {priorities.find(p => p.id === event.priority) && <span className={`w-3 h-3 rounded-full ${priorities.find(p => p.id === event.priority).color}`}></span>}
                        </div>
                      </div>
                      {event.assignedTo && <div className='mt-2 text-xs'>Assigned to: {event.assignedTo}</div>}
                    </div>
                  ))
                ) : (
                  <div className='text-center py-4 text-gray-500 dark:text-gray-400'>No events for this day</div>
                )}
              </div>
            </div>

            <div className='px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
              <button
                type='button'
                onClick={() => {
                  handleDayClick(selectedDate);
                  setShowDayEvents(false);
                }}
                className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'>
                <Plus className='h-5 w-5 mr-1' /> Add Event
              </button>

              <button type='button' onClick={() => setShowDayEvents(false)} className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen text-text-base `}>
      <div className=' px-2 '>
        {/* Navbar */}
        <div className='card2 !px-4 !py-0 mt-4  '>
            <div className='flex justify-between h-16'>
              <div className='flex items-center'>
                <h1 className='text-xl font-bold text-gray-900 dark:text-white'>Productivity Calendar</h1>
              </div>

              <div className='flex items-center space-x-4'>
                <div className='flex items-center space-x-2'>
                  <button onClick={() => setShowStats(!showStats)} className='p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300'>
                    <BarChart2 className='h-6 w-6' />
                  </button>

                  <div className="flex items-center justify-center gap-1 " >
                    <button onClick={navigatePrevious} className='p-1 rounded-md h-[38px] text-gray-400 border border-border w-[25px]  rounded-[8px] shadow-sm hover:shadow-md transition duration-200 border border-gray-200 dark:border-gray-600'> <ChevronLeft className='h-full w-full scale-[1.5] ' /> </button>
                    
                    <div className='relative'>
                      <button onClick={() => setShowCalendar(!showCalendar)} className='flex items-center gap-3 px-1 py-1 bg-white dark:bg-gray-700 rounded-[8px] shadow-sm hover:shadow-md transition duration-200 border border-gray-200 dark:border-gray-600'>
                        <div className='w-[35px] h-[25px] relative overflow-hidden bg-white dark:bg-gray-600 shadow-md rounded-[5px] cursor-pointer'>
                          <span className='bg-[#f5746f] w-full block absolute top-0 h-[7px]'></span>
                          <span className='w-full text-sm flex absolute bottom-0 h-full pt-[6px] left-0 items-center justify-center font-medium dark:text-white'>{currentDate.getDate()}</span>
                        </div>
                        <div className='flex flex-col'>
                          <span className='text-xs text-gray-500 dark:text-gray-300 leading-none'>{currentDate.toLocaleDateString('en-US', { month: 'short' })}</span>
                          <span className='text-sm font-medium text-gray-900 dark:text-white leading-tight'>{currentDate.getFullYear()}</span>
                        </div>
                      </button>
                      {showCalendar && renderMiniCalendar()}
                    </div>

                    <button onClick={navigateNext} className='p-1 rounded-md h-[38px] text-gray-400 border border-border w-[25px]  rounded-[8px] shadow-sm hover:shadow-md transition duration-200 border border-gray-200 dark:border-gray-600'> <ChevronRight className='h-full w-full scale-[1.5]' /> </button>
                  </div>
                </div>
              </div>
            </div>
        </div>

        {/* Main content */}
        <div className=' py-4'>
          <div className='flex flex-col md:flex-row'>
            {/* Sidebar */}
            <div className='w-full  md:w-48 flex-shrink-0 mb-4 md:mb-0 md:mr-4'>
              <div className='card2 !py-2 !px-2 '>
                <div className='space-y-1'>
                  <button onClick={() => setView('day')} className={`w-full text-left px-3 py-2 rounded-md ${view === 'day' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                    Day
                  </button>
                  <button onClick={() => setView('week')} className={`w-full text-left px-3 py-2 rounded-md ${view === 'week' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                    Week
                  </button>
                  <button onClick={() => setView('month')} className={`w-full text-left px-3 py-2 rounded-md ${view === 'month' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                    Month
                  </button>
                </div>

                <div className='mt-6'>
                  <h3 className='text-sm font-medium text-gray-500 dark:text-gray-400 mb-2'>Categories</h3>
                  <div className='space-y-1'>
                    <button onClick={() => setActiveFilter('all')} className={`w-full text-left px-3 py-1 text-sm rounded-md ${activeFilter === 'all' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                      All Events
                    </button>
                    {categories.map(category => (
                      <button key={category.id} onClick={() => setActiveFilter(category.id)} className={`w-full text-left px-3 py-1 text-sm rounded-md flex items-center ${activeFilter === category.id ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                        <span className={`w-3 h-3 rounded-full ${category.color} mr-2`}></span>
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className='mt-6'>
                  <button
                    onClick={() => {
                      setSelectedDate(new Date());
                      setCurrentEvent({
                        id: '',
                        title: '',
                        start: new Date().toISOString(),
                        category: '',
                        priority: 'medium',
                        status: 'pending',
                        assignedTo: '',
                        color: 'blue',
                        reminder: true,
                        repeat: { type: 'none', interval: 1, days: [] },
                      });
                      setShowEventModal(true);
                    }}
                    className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md flex items-center justify-center'>
                    <Plus className='h-5 w-5 mr-1' />
                    New Event
                  </button>
                </div>
              </div>
            </div>

            {/* Calendar content */}
            <div className='flex-1  overflow-hidden'>
              {view === 'month' && renderMonthView()}
              {view === 'week' && renderWeekView()}
              {view === 'day' && renderDayView()}
            </div>
          </div>
        </div>
      </div>

      {/* Event modal */}
      {showEventModal && currentEvent && (
        <div className='fixed inset-0 z-50 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
              <div className='absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75' onClick={() => setShowEventModal(false)}></div>
            </div>

            <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
              &#8203;
            </span>

            <div className='inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
              <div className='px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                <h3 className='text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4'>{currentEvent.id ? 'Edit Event' : 'Create Event'}</h3>

                <div className='space-y-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Title*</label>
                    <input type='text' value={currentEvent.title} onChange={e => setCurrentEvent({ ...currentEvent, title: e.target.value })} className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white' placeholder='Event title' />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Time*</label>
                    <input type='datetime-local' value={new Date(currentEvent.start).toISOString().slice(0, 16)} onChange={e => setCurrentEvent({ ...currentEvent, start: e.target.value })} className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white' />
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Category</label>
                      <select value={currentEvent.category} onChange={e => setCurrentEvent({ ...currentEvent, category: e.target.value })} className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white'>
                        <option value=''>Select category</option>
                        {categories.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Priority</label>
                      <select value={currentEvent.priority} onChange={e => setCurrentEvent({ ...currentEvent, priority: e.target.value })} className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white'>
                        {priorities.map(priority => (
                          <option key={priority.id} value={priority.id}>
                            {priority.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Color</label>
                    <div className='flex space-x-2'>
                      {['blue', 'red', 'green', 'purple', 'yellow'].map(color => (
                        <button key={color} onClick={() => setCurrentEvent({ ...currentEvent, color })} className={`w-8 h-8 rounded-full bg-${color}-500 ${currentEvent.color === color ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-600' : ''}`}></button>
                      ))}
                    </div>
                  </div>

                  <div className='flex items-center'>
                    <input type='checkbox' id='reminder' checked={currentEvent.reminder} onChange={e => setCurrentEvent({ ...currentEvent, reminder: e.target.checked })} className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded' />
                    <label htmlFor='reminder' className='ml-2 block text-sm text-gray-700 dark:text-gray-300'>
                      Set reminder (15 minutes before)
                    </label>
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Repeat</label>
                    <select
                      value={currentEvent.repeat.type}
                      onChange={e =>
                        setCurrentEvent({
                          ...currentEvent,
                          repeat: {
                            ...currentEvent.repeat,
                            type: e.target.value,
                            days: e.target.value === 'weekly' ? [new Date(currentEvent.start).getDay()] : [],
                          },
                        })
                      }
                      className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white'>
                      <option value='none'>Does not repeat</option>
                      <option value='daily'>Daily</option>
                      <option value='weekly'>Weekly</option>
                    </select>

                    {currentEvent.repeat.type !== 'none' && (
                      <div className='mt-2'>
                        {currentEvent.repeat.type === 'daily' && (
                          <div>
                            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Repeat every</label>
                            <div className='flex items-center'>
                              <input
                                type='number'
                                min='1'
                                value={currentEvent.repeat.interval}
                                onChange={e =>
                                  setCurrentEvent({
                                    ...currentEvent,
                                    repeat: {
                                      ...currentEvent.repeat,
                                      interval: parseInt(e.target.value) || 1,
                                    },
                                  })
                                }
                                className='w-16 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white'
                              />
                              <span className='ml-2 text-sm text-gray-700 dark:text-gray-300'>days</span>
                            </div>
                          </div>
                        )}

                        {currentEvent.repeat.type === 'weekly' && (
                          <div>
                            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1'>Repeat on</label>
                            <div className='flex flex-wrap gap-2'>
                              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                                <button
                                  key={day}
                                  onClick={() => {
                                    const newDays = [...currentEvent.repeat.days];
                                    if (newDays.includes(index)) {
                                      newDays.splice(newDays.indexOf(index), 1);
                                    } else {
                                      newDays.push(index);
                                    }
                                    setCurrentEvent({
                                      ...currentEvent,
                                      repeat: {
                                        ...currentEvent.repeat,
                                        days: newDays,
                                      },
                                    });
                                  }}
                                  className={`px-3 py-1 text-sm rounded-full ${currentEvent.repeat.days.includes(index) ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'}`}>
                                  {day}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className='px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                <button type='button' onClick={saveEvent} className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'>
                  Save
                </button>

                {currentEvent.id && (
                  <button type='button' onClick={deleteEvent} className='mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'>
                    Delete
                  </button>
                )}

                <button type='button' onClick={() => setShowEventModal(false)} className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reminder modal */}
      {showReminder && (
        <div className='fixed inset-0 z-50 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
              <div className='absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75'></div>
            </div>

            <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
              &#8203;
            </span>

            <div className='inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
              <div className='px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                <div className='sm:flex sm:items-start'>
                  <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-${showReminder.color}-100 dark:bg-${showReminder.color}-900 sm:mx-0 sm:h-10 sm:w-10`}>
                    <Bell className={`h-6 w-6 text-${showReminder.color}-600 dark:text-${showReminder.color}-300`} />
                  </div>
                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                    <h3 className='text-lg leading-6 font-medium text-gray-900 dark:text-white'>Reminder: {showReminder.title}</h3>
                    <div className='mt-2'>
                      <p className='text-sm text-gray-500 dark:text-gray-400'>
                        {formatDate(new Date(showReminder.start))} • {formatTime(new Date(showReminder.start))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                <button
                  type='button'
                  onClick={() => {
                    toggleEventStatus(showReminder.id, 'completed');
                    setShowReminder(null);
                  }}
                  className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm'>
                  <Check className='h-5 w-5 mr-1' /> Mark as Done
                </button>

                <div className='flex items-center mr-3'>
                  <select value={snoozeTime} onChange={e => setSnoozeTime(parseInt(e.target.value))} className='text-xs bg-gray-100 dark:bg-gray-700 dark:text-white border rounded px-2 py-1'>
                    <option value='5'>5 minutes</option>
                    <option value='10'>10 minutes</option>
                    <option value='15'>15 minutes</option>
                    <option value='30'>30 minutes</option>
                    <option value='60'>1 hour</option>
                  </select>
                </div>

                <button
                  type='button'
                  onClick={() => {
                    setCurrentEvent(showReminder);
                    setShowReminder(null);
                    setShowEventModal(true);
                  }}
                  className='mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-500 text-base font-medium text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'>
                  <Edit2 className='h-5 w-5 mr-1' /> Edit
                </button>

                <button
                  type='button'
                  onClick={() => {
                    toggleEventStatus(showReminder.id, 'missed');
                    setShowReminder(null);
                  }}
                  className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'>
                  <X className='h-5 w-5 mr-1' /> Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats modal */}
      {showStats && (
        <div className='fixed inset-0 z-50 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
              <div className='absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75' onClick={() => setShowStats(false)}></div>
            </div>

            <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>
              &#8203;
            </span>

            <div className='inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
              <div className='px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                <h3 className='text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4'>Productivity Statistics</h3>

                <div className='grid grid-cols-3 gap-4 mb-4'>
                  <div className='bg-green-100 dark:bg-green-900/30 p-4 rounded-lg text-center'>
                    <h3 className='font-bold text-green-800 dark:text-green-200'>Completed</h3>
                    <p className='text-2xl font-bold text-green-600 dark:text-green-300'>{calculateStatistics().completed}</p>
                  </div>
                  <div className='bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg text-center'>
                    <h3 className='font-bold text-blue-800 dark:text-blue-200'>Pending</h3>
                    <p className='text-2xl font-bold text-blue-600 dark:text-blue-300'>{calculateStatistics().pending}</p>
                  </div>
                  <div className='bg-red-100 dark:bg-red-900/30 p-4 rounded-lg text-center'>
                    <h3 className='font-bold text-red-800 dark:text-red-200'>Missed</h3>
                    <p className='text-2xl font-bold text-red-600 dark:text-red-300'>{calculateStatistics().missed}</p>
                  </div>
                </div>

                <div className='mb-4'>
                  <h4 className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>By Category</h4>
                  <div className='space-y-2'>
                    {categories.map(category => {
                      const count = calculateStatistics().byCategory[category.id] || 0;
                      const percentage = events.length > 0 ? Math.round((count / events.length) * 100) : 0;

                      return (
                        <div key={category.id}>
                          <div className='flex justify-between mb-1'>
                            <span className='text-sm flex items-center gap-2'>
                              <span className={`w-3 h-3 rounded-full ${category.color}`}></span>
                              {category.name}
                            </span>
                            <span className='text-sm'>
                              {count} ({percentage}%)
                            </span>
                          </div>
                          <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2'>
                            <div className={`${category.color} h-2 rounded-full`} style={{ width: `${percentage}%` }}></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className='px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                <button type='button' onClick={() => setShowStats(false)} className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm'>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Day events sidebar */}
      {renderDayEventsSidebar()}
    </div>
  );
}

// Helper function for class names
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
