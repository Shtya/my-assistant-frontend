// InfoTooltip.jsx or .tsx
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

const InfoTooltip = ({ msg, cn = '' }) => {
    const iconRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });

    useEffect(() => {
        if (visible && iconRef.current) {
            const rect = iconRef.current.getBoundingClientRect();
            setCoords({
                top: rect.bottom + window.scrollY + 6,
                left: rect.left + rect.width / 2 + window.scrollX,
            });
        }
    }, [visible]);

    return (
        <>
            <div ref={iconRef} className={`relative inline-block ${cn}`} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
                <svg className='h-4 w-4 text-gray-400 hover:text-blue-500 transition' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M12 18.5a6.5 6.5 0 100-13 6.5 6.5 0 000 13z' />
                </svg>
            </div>

            {visible &&
                ReactDOM.createPortal(
                    <div
                        className='fixed max-w-[200px] text-pretty w-full z-[9999] bg-black text-white text-xs rounded px-2 py-1 shadow-lg pointer-events-none text-center '
                        style={{
                            top: coords.top,
                            left: coords.left,
                            transform: 'translateX(-50%)',
                        }}>
                        {msg}
                        
                    </div>,
                    document.body,
                )}
        </>
    );
};

export default InfoTooltip;
