import React from 'react';

const AnimatedRadio = ({
  label = '',
  name,
  options = [],
  value,
  onChange,
  className = '',
}) => {
  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}

      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-start gap-3 cursor-pointer group"
          >
            <div className="relative">
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
                className="sr-only "
              />
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition 
                  ${value === option.value ? 'border-primary-dark' : 'border-gray-400 dark:border-gray-600'}`}
              >
                {value === option.value && (
                  <div className="w-2.5 h-2.5 bg-primary-dark rounded-full" />
                )}
              </div>
            </div>
            <div className="text-sm">
              <div className="font-medium">{option.label}</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {option.desc}
              </p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default AnimatedRadio;
