
// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import clsx from 'clsx';
// import { Plus, Focus, Edit, Trash, ChevronLeft, ChevronRight } from 'lucide-react';
// import CheckToggle from '@/components/atoms/CheckBox';
// import Button from '@/components/atoms/Button';
// import Dialog from '@/components/molecules/Dialog';
// import { motion, AnimatePresence } from 'framer-motion';
// import SelectDefault from '@/components/atoms/SelectDefault';
// import Input2 from '@/components/atoms/Input2';
// import StyledDateInput from '@/components/atoms/StyledDateInput';
// import SelectTime from '@/components/atoms/SelectTime';
// import toast from 'react-hot-toast';
// import { Notification } from '@/config/Notification';
// import { days, dayNames, statusIcons, statusBg, statusColorUncheckd } from '@/helper/fakeData';
// import TimetableSkeleton from '@/components/skeleton/TimeTableSkeleton';
// import Header from './Header';

// const TimetableGrid = ({ routines, setRoutines, isLoading }) => {
//     const doneSound = useRef(null);
//     const undoSound = useRef(null);
//     const alertSound = useRef(null);
//     const [isDeleting, setIsDeleting] = useState(null);

//     useEffect(() => {
//         doneSound.current = new Audio('/sounds/check.wav');
//         undoSound.current = new Audio('/sounds/check.wav');
//         alertSound.current = new Audio('/sounds/religion/alert8.mp3');
//     }, []);

//     const [gridContent, setGridContent] = useState([]);
//     const [now, setNow] = useState(Date.now());
//     const [focusDate, setFocusDate] = useState(new Date());
//     const [showCreateDialog, setShowCreateDialog] = useState(false);
//     const [newRoutine, setNewRoutine] = useState({
//         title: '',
//         baseTime: '',
//         status: 'pending',
//         repeat: {
//             type: 'interval',
//             interval: 1,
//             daysOfWeek: [],
//             times: ['08:00'],
//             repeatWithinDay: {
//                 enabled: false,
//                 intervalHours: 2,
//                 endTime: '20:00',
//             },
//         },
//     });

//     // Calendar view state
//     const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
//     const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
//     const [showCalendar, setShowCalendar] = useState(false);

//     // Generate days for calendar
//     const getDaysInMonth = (year, month) => {
//         return new Date(year, month + 1, 0).getDate();
//     };

//     const generateCalendarDays = (year, month) => {
//         const daysInMonth = getDaysInMonth(year, month);
//         const firstDay = new Date(year, month, 1).getDay();
//         const days = [];

//         // Add empty slots for days before the first day of month
//         for (let i = 0; i < firstDay; i++) {
//             days.push(null);
//         }

//         // Add days of month
//         for (let i = 1; i <= daysInMonth; i++) {
//             days.push(new Date(year, month, i));
//         }

//         return days;
//     };

//     const calendarDays = generateCalendarDays(currentYear, currentMonth);

//     const handlePrevMonth = () => {
//         if (currentMonth === 0) {
//             setCurrentMonth(11);
//             setCurrentYear(currentYear - 1);
//         } else {
//             setCurrentMonth(currentMonth - 1);
//         }
//     };

//     const handleNextMonth = () => {
//         if (currentMonth === 11) {
//             setCurrentMonth(0);
//             setCurrentYear(currentYear + 1);
//         } else {
//             setCurrentMonth(currentMonth + 1);
//         }
//     };

//     const handleDateSelect = date => {
//         if (date) {
//             setFocusDate(date);
//             setShowCalendar(false);
//         }
//     };

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setNow(Date.now());
//         }, 1000);
//         return () => clearInterval(interval);
//     }, []);

//     const checkIfNow = isoString => {
//         const nowDate = new Date(now);
//         const targetDate = new Date(isoString);
//         const isSameDay = nowDate.getFullYear() === targetDate.getFullYear() && nowDate.getMonth() === targetDate.getMonth() && nowDate.getDate() === targetDate.getDate();

//         const diff = now - targetDate.getTime();
//         return isSameDay && diff >= 0 && diff <= 120000;
//     };

//     const handleMissed = id => {
//         setRoutines(prev => prev.map(r => (r.id === id ? { ...r, status: 'missed' } : r)));
//     };

//     const handleSnooze = (id, mins) => {
//         setTimeout(() => {
//             alertSound.current.play();
//             toast.info(`Reminder for ${routines.find(r => r.id === id)?.title}`);
//         }, mins * 60 * 1000);
//         setRoutines(prev => prev.map(r => (r.id === id ? { ...r, status: 'snooze' } : r)));
//     };

//     const handleDone = id => {
//         doneSound.current.play();
//         setRoutines(prev => prev.map(r => (r.id === id ? { ...r, status: 'completed' } : r)));
//     };

//     const handlePending = id => {
//         undoSound.current.play();
//         setRoutines(prev => prev.map(r => (r.id === id ? { ...r, status: 'pending' } : r)));
//     };

//     const confirmDelete = id => {
//         setIsDeleting(id);
//     };

//     const handleDelete = () => {
//         setRoutines(prev => prev.filter(r => r.id !== isDeleting));
//         setIsDeleting(null);
//         Notification('Routine deleted successfully', 'success');
//     };

//     const handleEdit = id => {
//         const routineToEdit = routines.find(r => r.id === id);
//         setNewRoutine({
//             ...routineToEdit,
//             baseTime: routineToEdit.timeStart,
//             timeStart: routineToEdit.timeStart.split('T')[0] + 'T' + routineToEdit.timeStart.split('T')[1].substring(0, 5),
//         });
//         setShowCreateDialog(true);
//     };

//     const displayTime = isoString => {
//         const date = new Date(isoString);
//         const hours = date.getHours().toString().padStart(2, '0');
//         const minutes = date.getMinutes().toString().padStart(2, '0');
//         return `${hours}:${minutes}`;
//     };

//     const generateTimeSlots = (startTime, intervalHours, endTime) => {
//         const slots = [];
//         const today = new Date().toISOString().split('T')[0];
//         let current = new Date(`${today}T${startTime}`);
//         const end = new Date(`${today}T${endTime}`);

//         while (current <= end) {
//             const hours = current.getHours().toString().padStart(2, '0');
//             const minutes = current.getMinutes().toString().padStart(2, '0');
//             slots.push(`${hours}:${minutes}`);
//             current = new Date(current.getTime() + intervalHours * 60 * 60 * 1000);
//         }

//         return slots;
//     };

//     const handleCreateRoutine = () => {
//         if (!newRoutine.title.trim()) {
//             Notification('Routine deleted successfully', 'error');
//             return;
//         }

//         const newId = Math.max(...routines.map(r => r.id), 0) + 1;
//         const baseDate = new Date(newRoutine.baseTime || new Date());

//         const { type, interval, daysOfWeek, times, repeatWithinDay } = newRoutine.repeat;

//         const dailyTimeSlots = repeatWithinDay.enabled ? generateTimeSlots(times[0], repeatWithinDay.intervalHours, repeatWithinDay.endTime) : times;

//         const newRoutines = [];
//         const daysToGenerate = 30;

//         for (let dayOffset = 0; dayOffset < daysToGenerate; dayOffset++) {
//             const currentDate = new Date(baseDate);
//             currentDate.setDate(currentDate.getDate() + dayOffset);

//             let shouldInclude = false;

//             if (type === 'interval') {
//                 shouldInclude = dayOffset % interval === 0;
//             } else if (type === 'weekly') {
//                 const dayOfWeek = (currentDate.getDay() + 1) % 7;
//                 shouldInclude = daysOfWeek.includes(dayOfWeek);
//             } else if (type === 'monthly') {
//                 shouldInclude = currentDate.getDate() === baseDate.getDate();
//             }

//             if (shouldInclude) {
//                 dailyTimeSlots.forEach((time, i) => {
//                     const [hours, minutes] = time.split(':');
//                     const timeStart = new Date(currentDate);
//                     timeStart.setHours(parseInt(hours));
//                     timeStart.setMinutes(parseInt(minutes));

//                     newRoutines.push({
//                         id: newId + dayOffset * 100 + i,
//                         title: newRoutine.title,
//                         timeStart: timeStart.toISOString(),
//                         status: newRoutine.status,
//                         repeat: { ...newRoutine.repeat },
//                     });
//                 });
//             }
//         }

//         setRoutines(prev => [...prev, ...newRoutines]);
//         setShowCreateDialog(false);
//         Notification('Routine created successfully', 'success');
//         resetNewRoutine();
//     };

//     const resetNewRoutine = () => {
//         setNewRoutine({
//             title: '',
//             baseTime: '',
//             status: 'pending',
//             repeat: {
//                 type: 'interval',
//                 interval: 1,
//                 daysOfWeek: [],
//                 times: ['08:00'],
//                 repeatWithinDay: {
//                     enabled: false,
//                     intervalHours: 2,
//                     endTime: '20:00',
//                 },
//             },
//         });
//     };

//     const getVisibleDays = () => {
//         const visibleDays = [];
//         const focusDay = new Date(focusDate);

//         for (let i = -3; i <= 3; i++) {
//             const date = new Date(focusDay);
//             date.setDate(date.getDate() + i);
//             visibleDays.push({
//                 date,
//                 dayIndex: (date.getDay() + 1) % 7,
//                 dayName: days[(date.getDay() + 1) % 7],
//                 isToday: i === 0 && date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear(),
//                 isSelected: i === 0,
//             });
//         }

//         return visibleDays;
//     };

//     useEffect(() => {
//         if (isLoading) return;

//         const visibleDays = getVisibleDays();
//         const focusDay = new Date(focusDate);

//         const filteredRoutines = routines.filter(r => {
//             const date = new Date(r.timeStart);
//             return visibleDays.some(day => date.getDate() === day.date.getDate() && date.getMonth() === day.date.getMonth() && date.getFullYear() === day.date.getFullYear());
//         });

//         const timeSlots =
//             filteredRoutines.length > 0
//                 ? Array.from(new Set(filteredRoutines.map(r => displayTime(r.timeStart)))).sort((a, b) => {
//                       const [aHours, aMins] = a.split(':').map(Number);
//                       const [bHours, bMins] = b.split(':').map(Number);
//                       return aHours - bHours || aMins - bMins;
//                   })
//                 : [];

//         const grouped = {};
//         filteredRoutines.forEach(routine => {
//             const date = new Date(routine.timeStart);
//             const time = displayTime(routine.timeStart);
//             const dayIndex = (date.getDay() + 1) % 7;
//             const visibleDay = visibleDays.find(d => d.dayIndex === dayIndex);
//             const col = visibleDays.findIndex(d => d.dayIndex === dayIndex) + 2;

//             if (col > 1) {
//                 const key = `${time}-${col}`;
//                 if (!grouped[key]) grouped[key] = [];
//                 grouped[key].push(routine);
//             }
//         });

//         const items = [];
//         items.push(<div key='head-time' className='text-sm p-1'></div>);

//         visibleDays.forEach((day, i) => {
//             items.push(
//                 <div
//                     key={`head-${day.dayName}`}
//                     className={clsx('border hover:bg-primary hover:text-white    hover:scale-[1.02] border-border text-sm !px-[50px] p-1 text-center font-semibold relative transition-all duration-300 cursor-pointer', day.isToday ? 'bg-primary text-white ring-2 ring-primary' : day.isSelected ? 'bg-primary text-white ring-2 ring-primary' : 'bg-background-subtle')}
//                     style={{
//                         gridArea: `1 / ${i + 2} / 2 / ${i + 3}`,
//                     }}
//                     onClick={() => setFocusDate(day.date)}>
//                     {day.dayName}
//                     <div className='text-xs font-normal'>
//                         {day.date.getDate()}/{day.date.getMonth() + 1}
//                     </div>
//                     {day.isToday && (
//                         <button
//                             onClick={e => {
//                                 e.stopPropagation();
//                                 setFocusDate(new Date());
//                             }}
//                             className='absolute top-1/2 -translate-y-1/2 right-2 bg-white text-primary border rounded-full p-1 shadow hover:scale-110 duration-500'
//                             title='Go to today'>
//                             <Focus size={14} />
//                         </button>
//                     )}
//                 </div>,
//             );
//         });

//         timeSlots.forEach((time, rowIdx) => {
//             const cellVariants = {
//                 initial: { opacity: 0, scale: 0.85, y: 20 },
//                 animate: {
//                     opacity: 1,
//                     scale: 1,
//                     y: 0,
//                     transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
//                 },
//                 exit: {
//                     opacity: 0,
//                     scale: 0.85,
//                     y: 20,
//                     transition: { duration: 0.4, ease: 'easeInOut' },
//                 },
//             };

//             items.push(
//                 <div key={`time-${time}`} className='flex items-center justify-center border border-border text-sm p-1 font-semibold bg-background-subtle' style={{ gridArea: `${rowIdx + 2} / 1 / ${rowIdx + 3} / 2` }}>
//                     <span className='rotate-[45deg] block'>{time}</span>
//                 </div>,
//             );

//             visibleDays.forEach((day, colIdx) => {
//                 const col = colIdx + 2;
//                 const key = `${time}-${col}`;
//                 const routinesInCell = grouped[key] || [];

//                 items.push(
//                     <motion.div
//                         key={`cell-${time}-${col}`}
//                         variants={cellVariants}
//                         initial='initial'
//                         animate='animate'
//                         exit='exit'
//                         className={clsx('flex flex-col gap-2 p-2 transition-all outline-3 outline-border/5 outline', day.isSelected ? 'bg-blue-50' : '')}
//                         style={{
//                             gridArea: `${rowIdx + 2} / ${col} / ${rowIdx + 3} / ${col + 1}`,
//                         }}>
//                         {routinesInCell.map(routine => (
//                             <div key={routine.id} id={`routine-${routine.id}`} className={`${statusBg[routine.status]} text-xs px-2 py-2 rounded-md font-normal shadow transition-all duration-200 bg-white border border-border text-gray-800`}>
//                                 <div className='flex justify-between items-center gap-[5px] mb-[1px]'>
//                                     <div className='font-semibold text-sm flex items-center gap-1'>
//                                         {statusIcons[routine.status]} {routine.title}
//                                         {routine.repeat.interval > 1 && (
//                                             <span className='text-xs ml-1'>
//                                                 (every {routine.repeat.interval} {routine.repeat.type === 'interval' ? 'days' : routine.repeat.type === 'weekly' ? 'weeks' : 'months'})
//                                             </span>
//                                         )}
//                                     </div>
//                                     <div className='flex items-center gap-1'>
//                                         <button
//                                             onClick={e => {
//                                                 e.stopPropagation();
//                                                 handleEdit(routine.id);
//                                             }}
//                                             className='text-gray-500 hover:text-primary'>
//                                             <Edit size={14} />
//                                         </button>
//                                         <button
//                                             onClick={e => {
//                                                 e.stopPropagation();
//                                                 confirmDelete(routine.id);
//                                             }}
//                                             className='text-gray-500 hover:text-error'>
//                                             <Trash size={14} />
//                                         </button>
//                                         <CheckToggle className='scale-[.8]' colorUncheckd={statusColorUncheckd[routine.status]} color={routine.status === 'completed' && '!text-white'} checked={routine.status === 'completed'} onToggle={() => (routine.status === 'completed' ? handlePending(routine.id) : handleDone(routine.id))} />
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </motion.div>,
//                 );
//             });
//         });

//         setGridContent(items);
//     }, [routines, focusDate, now, isLoading]);

//     // Check for reminders
//     useEffect(() => {
//         routines.forEach(routine => {
//             if ((routine.status === 'pending' || routine.status === 'snooze') && checkIfNow(routine.timeStart)) {
//                 alertSound.current.play();
//                 toast.info(`Reminder: ${routine.title} is due now!`);
//             }
//         });
//     }, [now, routines]);

//     if (false) {
//         return <TimetableSkeleton />;
//     }

//     return (
//         <div className=''>
//             <Header setShowCalendar={setShowCalendar} showCalendar={showCalendar} focusDate={focusDate} setShowCreateDialog={setShowCreateDialog} handlePrevMonth={handlePrevMonth} currentYear={currentYear} currentMonth={currentMonth} handleNextMonth={handleNextMonth} dayNames={dayNames} calendarDays={calendarDays} handleDateSelect={handleDateSelect} />
            
//             <div className='border border-border/70 shadow-sm relative rounded-2xl text-center w-full bg-white/80 backdrop-blur-[2px] p-0 min-h-[50vh]' >
//                 <div className='w-full max-w-full p-8 mx-auto overflow-auto'>
//                     <div
//                         className='grid gap-[3px] transition-all duration-300'
//                         style={{
//                             gridTemplateColumns: '60px repeat(7, max-content)',
//                             gridAutoRows: 'auto',
//                         }}>
//                         <span className='w-[full] h-[45px] block bg-background-subtle border border-border '></span>
//                         <AnimatePresence>{gridContent}</AnimatePresence>
//                     </div>
//                 </div>

//             </div>

//             <Dialog title='Create New Routine' open={showCreateDialog} onClose={() => setShowCreateDialog(false)}>
//                 <div className='py-6 px-2 space-y-5'>
//                     <div className='space-y-4'>
//                         <Input2 className='!bg-white' label={'Title'} type='text' value={newRoutine.title} placeholder='Enter routine title' onChange={e => setNewRoutine({ ...newRoutine, title: e })} required />

//                         <StyledDateInput label='Start Date' value={newRoutine.baseTime} onChange={newVal => setNewRoutine({ ...newRoutine, baseTime: newVal })} />

//                         <SelectDefault
//                             label='Schedule Type'
//                             value={newRoutine.repeat.type}
//                             onChange={val =>
//                                 setNewRoutine({
//                                     ...newRoutine,
//                                     repeat: {
//                                         ...newRoutine.repeat,
//                                         type: val,
//                                         daysOfWeek: val === 'weekly' ? [0] : [],
//                                     },
//                                 })
//                             }
//                             options={[
//                                 { value: 'interval', label: 'Every X Days' },
//                                 { value: 'weekly', label: 'Weekly' },
//                                 { value: 'monthly', label: 'Monthly' },
//                             ]}
//                         />

//                         {newRoutine.repeat.type === 'interval' && (
//                             <Input2
//                                 className='!bg-white'
//                                 label={'Days Interval'}
//                                 type='number'
//                                 min='1'
//                                 value={newRoutine.repeat.interval}
//                                 onChange={e =>
//                                     setNewRoutine({
//                                         ...newRoutine,
//                                         repeat: {
//                                             ...newRoutine.repeat,
//                                             interval: parseInt(e) || 1,
//                                         },
//                                     })
//                                 }
//                             />
//                         )}

//                         {newRoutine.repeat.type === 'weekly' && (
//                             <div className='space-y-2'>
//                                 <label className='block text-sm font-medium text-gray-700'>Days of Week</label>
//                                 <div className='flex flex-wrap gap-2'>
//                                     {days.map((day, index) => (
//                                         <button
//                                             key={day}
//                                             onClick={() => {
//                                                 const newDays = [...newRoutine.repeat.daysOfWeek];
//                                                 const dayIndex = index;

//                                                 if (newDays.includes(dayIndex)) {
//                                                     newDays.splice(newDays.indexOf(dayIndex), 1);
//                                                 } else {
//                                                     newDays.push(dayIndex);
//                                                 }

//                                                 setNewRoutine({
//                                                     ...newRoutine,
//                                                     repeat: {
//                                                         ...newRoutine.repeat,
//                                                         daysOfWeek: newDays,
//                                                     },
//                                                 });
//                                             }}
//                                             className={`px-3 py-1 text-sm rounded-full ${newRoutine.repeat.daysOfWeek.includes(index) ? 'bg-primary text-white' : 'bg-gray-100 text-gray-800'}`}>
//                                             {day}
//                                         </button>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}

//                         <div className='space-y-2'>
//                             <label className='block text-sm font-medium text-gray-700'>Time Settings</label>

//                             <div className='flex items-center gap-2'>
//                                 <CheckToggle
//                                     checked={newRoutine.repeat.repeatWithinDay.enabled}
//                                     onToggle={() =>
//                                         setNewRoutine({
//                                             ...newRoutine,
//                                             repeat: {
//                                                 ...newRoutine.repeat,
//                                                 repeatWithinDay: {
//                                                     ...newRoutine.repeat.repeatWithinDay,
//                                                     enabled: !newRoutine.repeat.repeatWithinDay.enabled,
//                                                 },
//                                             },
//                                         })
//                                     }
//                                 />
//                                 <span>Repeat throughout the day</span>
//                             </div>

//                             {newRoutine.repeat.repeatWithinDay.enabled && (
//                                 <div className='grid grid-cols-2 gap-4'>
//                                     <Input2
//                                         className='!bg-white'
//                                         label='Start Time'
//                                         type='time'
//                                         value={newRoutine.repeat.times[0]}
//                                         onChange={e =>
//                                             setNewRoutine({
//                                                 ...newRoutine,
//                                                 repeat: {
//                                                     ...newRoutine.repeat,
//                                                     times: [e],
//                                                 },
//                                             })
//                                         }
//                                     />

//                                     <Input2
//                                         className='!bg-white'
//                                         label='Repeat Every (hours)'
//                                         type='number'
//                                         min='1'
//                                         max='12'
//                                         value={newRoutine.repeat.repeatWithinDay.intervalHours}
//                                         onChange={e =>
//                                             setNewRoutine({
//                                                 ...newRoutine,
//                                                 repeat: {
//                                                     ...newRoutine.repeat,
//                                                     repeatWithinDay: {
//                                                         ...newRoutine.repeat.repeatWithinDay,
//                                                         intervalHours: parseInt(e) || 2,
//                                                     },
//                                                 },
//                                             })
//                                         }
//                                     />

//                                     <Input2
//                                         className='!bg-white'
//                                         label='End Time'
//                                         type='time'
//                                         value={newRoutine.repeat.repeatWithinDay.endTime}
//                                         onChange={e =>
//                                             setNewRoutine({
//                                                 ...newRoutine,
//                                                 repeat: {
//                                                     ...newRoutine.repeat,
//                                                     repeatWithinDay: {
//                                                         ...newRoutine.repeat.repeatWithinDay,
//                                                         endTime: e,
//                                                     },
//                                                 },
//                                             })
//                                         }
//                                     />
//                                 </div>
//                             )}

//                             {!newRoutine.repeat.repeatWithinDay.enabled && (
//                                 <SelectTime
//                                     value={newRoutine.repeat.times[0]}
//                                     label='Time'
//                                     onChange={(i, val) => {
//                                         const newTimes = [...newRoutine.repeat.times];
//                                         newTimes[0] = val;
//                                         setNewRoutine({
//                                             ...newRoutine,
//                                             repeat: {
//                                                 ...newRoutine.repeat,
//                                                 times: newTimes,
//                                             },
//                                         });
//                                     }}
//                                 />
//                             )}
//                         </div>
//                     </div>

//                     <div className='flex justify-end gap-2 pt-4'>
//                         <Button onClick={() => setShowCreateDialog(false)} label='Cancel' color='secondary' />
//                         <Button onClick={handleCreateRoutine} label='Save Routine' color='primary' />
//                     </div>
//                 </div>
//             </Dialog>

//             <Dialog title='Confirm Delete' open={isDeleting !== null} onClose={() => setIsDeleting(null)}>
//                 <div className='p-6 space-y-5'>
//                     <p>Are you sure you want to delete this routine?</p>
//                     <div className='flex justify-end gap-2 pt-4'>
//                         <Button onClick={() => setIsDeleting(null)} label='Cancel' color='secondary' />
//                         <Button onClick={handleDelete} label='Delete' color='error' />
//                     </div>
//                 </div>
//             </Dialog>

//             {routines.map(routine => {
//                 const shouldShowDialog = (routine.status === 'pending' || routine.status === 'snooze') && checkIfNow(routine.timeStart);

//                 if (!shouldShowDialog) return null;

//                 return (
//                     <Dialog key={routine.id} title='⏰ Reminder! What do you want to do?' open={shouldShowDialog} onClose={() => handleMissed(routine.id)}>
//                         <div className='p-6 space-y-5'>
//                             <div className='text-sm text-gray-600'>
//                                 <p>
//                                     <strong>Routine:</strong> {routine.title}
//                                 </p>
//                                 <p>
//                                     <strong>Scheduled Time:</strong> {displayTime(routine.timeStart)}
//                                 </p>
//                                 <p>
//                                     <strong>Status:</strong> {routine.status}
//                                 </p>
//                             </div>

//                             <div className='flex justify-end gap-2 pt-4'>
//                                 <Button onClick={() => handleMissed(routine.id)} label='Missed' color='secondary' />
//                                 <Button onClick={() => handleDone(routine.id)} label='Do Now' color='primary' />
//                                 <select onChange={e => handleSnooze(routine.id, parseInt(e.target.value))} className='text-xs bg-gray-100 border rounded px-2 py-1'>
//                                     <option>Snooze...</option>
//                                     {[5, 10, 15].map(min => (
//                                         <option key={min} value={min}>
//                                             {min} min
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                         </div>
//                     </Dialog>
//                 );
//             })}
//         </div>
//     );
// };

// export default TimetableGrid;
