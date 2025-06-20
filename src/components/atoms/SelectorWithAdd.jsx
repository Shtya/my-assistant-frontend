'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import Input2 from './Input2';

export default function SelectorWithAdd({ cn , categories, selected, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [newCategory, setNewCategory] = useState('');
    const [localCategories, setLocalCategories] = useState(categories.filter(c => c !== 'All'));
    const containerRef = useRef(null);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = e => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const handleSelect = cat => {
        onChange(cat);
        setIsOpen(false);
    };

    const handleAddCategory = () => {
        const trimmed = newCategory.trim();
        if (trimmed && !localCategories.includes(trimmed)) {
            const updated = [...localCategories, trimmed];
            setLocalCategories(updated);
            onChange(trimmed);
            setNewCategory('');
            setIsOpen(false);
        }
    };

    return (
        <div className={`relative w-full ${cn}`} ref={containerRef}>
          <div className=" w-full flex items-center gap-[10px]" >
            <label className='font-semibold block mb-1'>Category:</label>
            <div className=' w-full border rounded px-3 py-2 cursor-pointer bg-white shadow-sm text-gray-700' onClick={() => setIsOpen(prev => !prev)}>
                {selected || <span className='text-gray-400'>Select category</span>}
            </div>
          </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className='absolute z-10 mt-1 w-full bg-white border rounded shadow-lg p-2 space-y-1'>
                        {localCategories.map(cat => (
                            <div key={cat} onClick={() => handleSelect(cat)} className='px-2 py-1 hover:bg-gray-100 rounded cursor-pointer'>
                                {cat}
                            </div>
                        ))}

                        <div className='pt-2 flex flex-col  gap-[10px]  border-t mt-2'>
                          <Input2 type='text' placeholder='Add new category' value={newCategory} onChange={e => setNewCategory(e)} onEnter={handleAddCategory} />
                          <Button label="Add Category"  onClick={handleAddCategory} color='primary' />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
