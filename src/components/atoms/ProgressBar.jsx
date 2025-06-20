import React from 'react';

export default function ProgressBar({ value = 0, max = 100 }) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
      <div
        className="h-full bg-orange-500 transition-all duration-300"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
