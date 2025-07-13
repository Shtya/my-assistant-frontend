import { FiX } from "react-icons/fi";

// Modal component
export default function Modal ({ title, children, onClose, show }) {
  if (!show) return null;

  return (
    <div className='fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center p-4 z-50'>
      <div  className='bg-gradient-to-br bg-[#f9fafb] shadow-2xl rounded-2xl max-w-lg overflow-auto scrollbar-custom max-h-[calc(100%-60px)] w-full border border-gray-200 relative'>
        <div className='p-6  '>
          <div className='flex justify-between items-start'>
            <h3 className='text-2xl font-semibold text-gray-800'>{title}</h3>
            <button onClick={onClose} className='text-gray-400 hover:text-red-500 transition-colors duration-200' aria-label='Close modal'>
              <FiX className='h-6 w-6 cursor-pointer' />
            </button>
          </div>
          <div className='mt-4 text-gray-700'>{children}</div>
        </div>
      </div>
    </div>
  );
};
