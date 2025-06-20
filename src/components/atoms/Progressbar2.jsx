'use client';

import React from 'react';

export default function ProgressSummary({
  completed = 0,
  total = 0,
  label = 'Tasks Completed',
  selectedDate = null,
  percentage = 0,
  progressColor = 'from-green-400 to-green-600',
}) {
  return (
    <div className="w-full space-y-2">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs gradient text-white px-2 py-0.5 rounded-full font-medium bg-gradient-to-r from-primary to-secondary">
            {completed}/{total}
          </span>
          <span className="text-sm text-text-muted">{label}</span>
        </div>
        {selectedDate && (
          <span className="text-sm text-text-soft">
            {selectedDate.format('ddd, D MMM YYYY')}
          </span>
        )}
      </div>

      <div className="w-full flex items-center gap-3">
        <div className="relative w-full h-6 bg-background-muted rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-t shadow-inner transition-all duration-500 ${progressColor}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-base font-medium text-text-base">{percentage}%</span>
      </div>
    </div>
  );
}
