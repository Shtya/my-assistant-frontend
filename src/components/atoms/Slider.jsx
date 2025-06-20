// 'use client';

// import React from 'react';

// export function Slider({
//   value,
//   onValueChange,
//   min = 0,
//   max = 100,
//   step = 1,
// }) {
//   return (
//     <input
//       type="range"
//       className="w-full h-6 bg-border rounded-full appearance-none cursor-pointer accent-primary"
//       value={value[0]}
//       onChange={(e) => onValueChange([Number(e.target.value)])}
//       min={min}
//       max={max}
//       step={step}
//     />
//   );
// }

'use client';

import React from 'react';

export function Slider({ value, onValueChange, min = 0, max = 100, step = 1 }) {
    const percentage = ((value[0] - min) / (max - min)) * 100;

    return (
        <div className='w-full max-w-[200px] h-6 relative  '>
            {/* Track background */}
            <div className='absolute top-1/2 left-0 w-full h-4 rounded-full bg-border transform -translate-y-1/2' />

            {/* Filled track before thumb */}
            <div className='absolute top-1/2 left-0 h-4 rounded-full bg-primary transform -translate-y-1/2' style={{ width: `${percentage}%` }} />

            {/* Native slider input */}
            <input type='range' value={value[0]} onChange={e => onValueChange([Number(e.target.value)])} min={min} max={max} step={step} className='relative w-full h-8 appearance-none bg-transparent z-10 cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:appearance-none' />

            {/* Custom thumb style */}
            <style jsx>{`
                input[type='range']::-webkit-slider-thumb {
                    height: 16px;
                    width: 16px;
                    background-color: #fff; /* Green from tailwind success */
                    border: 2px solid #2563eb;
                    border-radius: 9999px;
                    box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
                    margin-top: -7px;
                }

                input[type='range']::-moz-range-thumb {
                    height: 16px;
                    width: 16px;
                    background-color: #fff;
                    border: 2px solid #2563eb;
                    border-radius: 9999px;
                    box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);
                }
            `}</style>
        </div>
    );
}
