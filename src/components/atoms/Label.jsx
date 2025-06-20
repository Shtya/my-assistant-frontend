import React from 'react';

export function Label({ children, className = '' }) {
  return (
    <label className={`text-text-base font-medium ${className}`}>
      {children}
    </label>
  );
}
