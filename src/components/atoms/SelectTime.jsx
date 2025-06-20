// RepeatTimeInput.tsx
import React from 'react';

export default function SelectTime({label , index, value, onChange, className = '' }) {
  return (
    <div className={`w-full ${className}`}>
      {label && <label className='block text-sm font-medium text-gray-700 mb-2'>
        {label}
      </label>}
      <input
        type='time'
        value={value}
        onChange={(e) => onChange(index, e.target.value)}
        className='w-full px-3 py-2 border border-border h-[40px] rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50'
      />
    </div>
  );
}
