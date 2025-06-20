'use client';

import { useState, useEffect } from 'react';
import { CalendarDays } from 'lucide-react';

export default function DatePicker({ value, onChange, label = 'Select Date' }) {
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    if (value) {
      setSelectedDate(value);
    }
  }, [value]);

  const handleChange = (e) => {
    setSelectedDate(e.target.value);
    if (onChange) onChange(e.target.value);
  };

  return (
    <div className="space-y-1 w-full">
      <label className="text-sm text-gray-700 font-medium">{label}</label>
      <div className="relative w-full">
        <input
          type="date"
          value={selectedDate}
          onChange={handleChange}
          className="w-full h-10 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <CalendarDays
          size={18}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
      </div>
    </div>
  );
}
