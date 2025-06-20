import { useRef } from 'react';
import { CalendarDays } from 'lucide-react';

export default function StyledDateInput({ label, value, onChange, className = '' }) {
    const inputRef = useRef();

    const formattedValue = value?.split('T')[0] || new Date().toISOString().split('T')[0];

    const openCalendar = () => {
        if (inputRef.current) {
            inputRef.current.showPicker?.(); // supported browsers
            inputRef.current.focus();
        }
    };

    return (
        <div className={`w-full ${className}`}>
            {label && <label className='block text-sm font-medium text-gray-700 mb-1'>{label}</label>}

            <div
                className='relative'
                onClick={openCalendar} // ✅ make whole wrapper clickable
            >
                <input
                    ref={inputRef}
                    type='date'
                    value={formattedValue}
                    onChange={e => {
                        const datePart = e.target.value;
                        const timePart = value?.split('T')[1] || '00:00:00';
                        onChange(`${datePart}T${timePart}`);
                    }}
                    className='w-full pl-3 pr-3 py-2 border h-[38px] border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer'
                />
                {/* <CalendarDays className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none' size={18} /> */}
            </div>
        </div>
    );
}
