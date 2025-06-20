import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react'; // optional: install `lucide-react` or use any SVG

export default function SelectDefault({ label = '', options = [], value, onChange, className = '' }) {
    const [open, setOpen] = useState(false);
    const selectRef = useRef();

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = e => {
            if (selectRef.current && !selectRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(o => o.value === value);

    return (
        <div className={`relative w-full space-y-1 ${className}`} ref={selectRef}>
            {label && <label className='block text-sm font-medium text-gray-700 mb-2'>{label}</label>}

            <button onClick={() => setOpen(prev => !prev)} className='w-full px-4 py-2 border bg-white border-border   rounded-[5px]  flex justify-between items-center h-[38px] text-left'>
                <span>{selectedOption?.label || 'Select an option'}</span>
                <ChevronUp size={18} className={` ${open ? '' : 'rotate-[180deg]'} duration-300 `} />
            </button>

            <ul className={` ${open ? ' max-h-[120px]  shadow-md border border-gray-200' : ' max-h-0 '} transition-all duration-300 absolute z-10 mt-1 w-full bg-white  rounded-md overflow-auto`}>
                {options.map(option => (
                    <li
                        key={option.value}
                        onClick={() => {
                            onChange(option.value);
                            setOpen(false);
                        }}
                        className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${value === option.value ? 'bg-gray-100 font-medium' : ''}`}>
                        {option.label}
                    </li>
                ))}
            </ul>
        </div>
    );
}
