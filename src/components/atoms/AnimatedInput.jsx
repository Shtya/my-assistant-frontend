import { motion } from 'framer-motion';
import { InputHTMLAttributes } from 'react';

export default function AnimatedInput({ label, value, onChange, placeholder, ...props }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className='w-full'>
      <label className='block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1'>{label}</label>
      <input {...props} type='text' placeholder={placeholder} value={value} onChange={onChange} className='w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all' />
    </motion.div>
  );
}
