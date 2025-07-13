import React from 'react';
import { X } from 'lucide-react'; // أيقونة الإغلاق (يمكنك إزالتها إن أردت)

const Modal2 = ({ open, onClose, title, children, width = '500px', cn = '' }) => {
  if (!open) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm'>
      <div className={`relative w-full max-w-[95vw] rounded-xl transition-all shadow-xl bg-white dark:bg-gray-900 ${cn}`} style={{ width }}>
        {/* زر الإغلاق */}
        <button onClick={onClose} className='absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white'>
          <X className='w-5 h-5' />
        </button>

        {/* العنوان */}
        {title && <div className='mb-4 border-b border-gray-200 dark:border-gray-700 pb-2'>{title}</div>}

        {/* المحتوى */}
        <div className='overflow-y-auto max-h-[80vh]'>{children}</div>
      </div>
    </div>
  );
};

export default Modal2;
