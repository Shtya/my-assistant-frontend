import { useState, useEffect, useRef } from 'react';

export default function ReminderManager({ prayerTimes }) {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState({
    text: '',
    time: '',
    type: 'adhkar', // Default to adhkar reminder
    adhkarType: 'remembrance',
    frequency: 'daily',
    repeatInterval: 5,
    repeatUnit: 'minutes',
    audio: 'default',
    preAlarm: 15,
    taskToRemember: '',
    prayerTime: '',
    customMessage: ''
  });

  // Refs for audio and timers
  const audioRef = useRef(null);
  const repeatTimerRef = useRef(null);

  // Arabic options
  const reminderTypes = [
    { value: 'adhkar', label: 'تذكير بالأذكار' },
    { value: 'prayer', label: 'تذكير بموعد الصلاة' },
    { value: 'custom', label: 'تذكير مخصص' }
  ];

  const adhkarTypes = [
    { value: 'remembrance', label: 'أذكار متنوعة' },
    { value: 'prophet_prayer', label: 'الصلاة على النبي' },
    { value: 'morning', label: 'أذكار الصباح' },
    { value: 'evening', label: 'أذكار المساء' }
  ];

  const frequencies = [
    { value: 'once', label: 'مرة واحدة' },
    { value: 'daily', label: 'يومي' },
    { value: 'weekly', label: 'أسبوعي' }
  ];

  const repeatIntervals = [1, 5, 10, 15, 30, 60];
  const repeatUnits = [
    { value: 'minutes', label: 'دقائق' },
    { value: 'hours', label: 'ساعات' }
  ];

  const audioOptions = [
    { value: "/sounds/adhan/1.mp3", label: 'نغمة افتراضية' },
    { value: "/sounds/adhan/2.mp3", label: 'أذان بصوت الشيخ ناصر القطامي' },
    { value: "/sounds/adhan/3.mp3", label: 'الأذان بصوت القارئ اسلام صبحي' },
    { value: "/sounds/adhan/4.mp3", label: 'الآذان بصوت الشيخ محمد رفعت' }
  ];

  const preAlarmOptions = [
    { value: 0, label: 'بدون تنبيه مسبق' },
    { value: 5, label: '5 دقائق قبل' },
    { value: 10, label: '10 دقائق قبل' },
    { value: 15, label: '15 دقيقة قبل' },
    { value: 30, label: '30 دقيقة قبل' }
  ];

  const prayerTimeOptions = [
    { value: 'Fajr', label: 'الفجر' },
    { value: 'Dhuhr', label: 'الظهر' },
    { value: 'Asr', label: 'العصر' },
    { value: 'Maghrib', label: 'المغرب' },
    { value: 'Isha', label: 'العشاء' }
  ];

  // Add new reminder
  const addReminder = () => {
    const reminder = {
      ...newReminder,
      id: Date.now(),
      active: false,
      completed: false,
      forgottenItems: []
    };

    // Set time for prayer reminders
    if (reminder.type === 'prayer' && reminder.prayerTime) {
      reminder.time = prayerTimes[reminder.prayerTime];
      reminder.text = `تذكير بموعد صلاة ${prayerTimeOptions.find(p => p.value === reminder.prayerTime)?.label}`;
    }

    setReminders([...reminders, reminder]);
    setNewReminder({
      ...newReminder,
      text: '',
      time: '',
      customMessage: ''
    });
  };

  // Toggle reminder activation
  const toggleReminder = (id) => {
    setReminders(reminders.map(reminder => {
      if (reminder.id === id) {
        const updated = { ...reminder, active: !reminder.active };
        if (updated.active) {
          startReminder(updated);
        } else {
          stopReminder(updated);
        }
        return updated;
      }
      return reminder;
    }));
  };

  // Start reminder with repetition
  const startReminder = (reminder) => {
    console.log(`Starting reminder: ${reminder.text}`);
    playAudio(reminder.audio);
    
    if (reminder.repeatInterval > 0) {
      const intervalMs = reminder.repeatUnit === 'minutes' 
        ? reminder.repeatInterval * 60 * 1000 
        : reminder.repeatInterval * 60 * 60 * 1000;
      
      repeatTimerRef.current = setInterval(() => {
        console.log(`Repeating reminder: ${reminder.text}`);
        playAudio(reminder.audio);
      }, intervalMs);
    }
  };

  // Stop reminder
  const stopReminder = (reminder) => {
    console.log(`Stopping reminder: ${reminder.text}`);
    if (repeatTimerRef.current) {
      clearInterval(repeatTimerRef.current);
    }
    stopAudio();
  };

  // Play audio
  const playAudio = (audioType) => {
    console.log(`Playing audio: ${audioType}`);
    // In a real app, this would play the actual audio file
    // audioRef.current.src = getAudioPath(audioType);
    // audioRef.current.play();
  };

  // Stop audio
  const stopAudio = () => {
    // if (audioRef.current) {
    //   audioRef.current.pause();
    //   audioRef.current.currentTime = 0;
    // }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (repeatTimerRef.current) {
        clearInterval(repeatTimerRef.current);
      }
      stopAudio();
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto" dir="rtl">
      <h2 className="text-2xl font-bold mb-6 text-green-800 text-center">منظم التذكيرات الإسلامية</h2>
      
      {/* Add New Reminder Section */}
      <div className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="font-bold mb-4 text-lg text-center">إنشاء تذكير جديد</h3>
        
        {/* Reminder Type Selection */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">نوع التذكير</label>
          <select
            value={newReminder.type}
            onChange={(e) => setNewReminder({...newReminder, type: e.target.value})}
            className="w-full p-2 border rounded"
          >
            {reminderTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>

        {/* Adhkar Type Selection */}
        {newReminder.type === 'adhkar' && (
          <div className="mb-4">
            <label className="block mb-2 font-medium">نوع الذكر</label>
            <select
              value={newReminder.adhkarType}
              onChange={(e) => setNewReminder({...newReminder, adhkarType: e.target.value})}
              className="w-full p-2 border rounded"
            >
              {adhkarTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
        )}

        {/* Prayer Time Selection */}
        {newReminder.type === 'prayer' && (
          <div className="mb-4">
            <label className="block mb-2 font-medium">وقت الصلاة</label>
            <select
              value={newReminder.prayerTime}
              onChange={(e) => setNewReminder({...newReminder, prayerTime: e.target.value})}
              className="w-full p-2 border rounded"
            >
              <option value="">اختر وقت الصلاة</option>
              {prayerTimeOptions.map(time => (
                <option key={time.value} value={time.value}>{time.label}</option>
              ))}
            </select>
          </div>
        )}

        {/* Custom Message */}
        {newReminder.type === 'custom' && (
          <div className="mb-4">
            <label className="block mb-2 font-medium">نص التذكير</label>
            <input
              type="text"
              value={newReminder.customMessage}
              onChange={(e) => setNewReminder({...newReminder, customMessage: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="أدخل نص التذكير المخصص"
            />
          </div>
        )}

        {/* Time Selection */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">الوقت</label>
          <input
            type="time"
            value={newReminder.time}
            onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Frequency and Repetition */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 font-medium">التكرار</label>
            <select
              value={newReminder.frequency}
              onChange={(e) => setNewReminder({...newReminder, frequency: e.target.value})}
              className="w-full p-2 border rounded"
            >
              {frequencies.map(freq => (
                <option key={freq.value} value={freq.value}>{freq.label}</option>
              ))}
            </select>
          </div>
          
          {newReminder.frequency !== 'once' && (
            <div>
              <label className="block mb-2 font-medium">تكرار التنبيه</label>
              <div className="flex gap-2">
                <select
                  value={newReminder.repeatInterval}
                  onChange={(e) => setNewReminder({...newReminder, repeatInterval: parseInt(e.target.value)})}
                  className="flex-1 p-2 border rounded"
                >
                  {repeatIntervals.map(interval => (
                    <option key={interval} value={interval}>كل {interval}</option>
                  ))}
                </select>
                <select
                  value={newReminder.repeatUnit}
                  onChange={(e) => setNewReminder({...newReminder, repeatUnit: e.target.value})}
                  className="flex-1 p-2 border rounded"
                >
                  {repeatUnits.map(unit => (
                    <option key={unit.value} value={unit.value}>{unit.label}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Audio Selection */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">صوت التنبيه</label>
          <select
            value={newReminder.audio}
            onChange={(e) => setNewReminder({...newReminder, audio: e.target.value})}
            className="w-full p-2 border rounded"
          >
            {audioOptions.map(audio => (
              <option key={audio.value} value={audio.value}>{audio.label}</option>
            ))}
          </select>
        </div>

        {/* Pre-Alarm Selection */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">تنبيه مسبق</label>
          <select
            value={newReminder.preAlarm}
            onChange={(e) => setNewReminder({...newReminder, preAlarm: parseInt(e.target.value)})}
            className="w-full p-2 border rounded"
          >
            {preAlarmOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Additional Notes */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">ملاحظات إضافية</label>
          <input
            type="text"
            value={newReminder.taskToRemember}
            onChange={(e) => setNewReminder({...newReminder, taskToRemember: e.target.value})}
            className="w-full p-2 border rounded"
            placeholder="أدخل ملاحظات إضافية"
          />
        </div>

        <button 
          onClick={addReminder}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
        >
          إضافة تذكير
        </button>
      </div>

      {/* Current Reminders List */}
      <div>
        <h3 className="font-bold mb-4 text-lg text-center">التذكيرات الحالية</h3>
        
        {reminders.length > 0 ? (
          <div className="space-y-4">
            {reminders.map(reminder => (
              <div key={reminder.id} className={`p-4 rounded-lg border ${reminder.active ? 'border-green-400 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-gray-800">
                      {reminder.type === 'prayer' 
                        ? `تذكير بموعد صلاة ${prayerTimeOptions.find(p => p.value === reminder.prayerTime)?.label}`
                        : reminder.type === 'adhkar'
                          ? `تذكير ب${adhkarTypes.find(a => a.value === reminder.adhkarType)?.label}`
                          : reminder.customMessage}
                    </h4>
                    <div className="text-sm text-gray-600 mt-1">
                      <span>الوقت: {reminder.time}</span>
                      {reminder.preAlarm > 0 && <span> • تنبيه مسبق: {preAlarmOptions.find(p => p.value === reminder.preAlarm)?.label}</span>}
                      {reminder.frequency !== 'once' && (
                        <span> • التكرار: كل {reminder.repeatInterval} {reminder.repeatUnit === 'minutes' ? 'دقائق' : 'ساعات'}</span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => toggleReminder(reminder.id)}
                    className={`px-3 py-1 rounded ${reminder.active ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}
                  >
                    {reminder.active ? 'إيقاف' : 'تشغيل'}
                  </button>
                </div>

                {reminder.taskToRemember && (
                  <div className="mt-2 text-sm bg-yellow-50 p-2 rounded">
                    <span className="font-medium">ملاحظة:</span> {reminder.taskToRemember}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            لا توجد تذكيرات حتى الآن. أضف تذكيرك الأول بالأعلى.
          </div>
        )}
      </div>

      {/* Hidden audio element */}
      <audio ref={audioRef} />
    </div>
  );
}