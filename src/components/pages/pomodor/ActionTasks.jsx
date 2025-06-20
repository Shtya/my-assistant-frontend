'use client';
import React, { useState , useEffect } from 'react';
import { Pencil, CheckCircle, Circle, Plus } from 'lucide-react';
import Dialog from '@/components/molecules/Dialog';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import CheckBox from '@/components/atoms/CheckBox';

export function EditTask({ task, setTasks }) {

	const [open, setOpen] = useState(false);
    const [editedTask, setEditedTask] = useState(task);

	useEffect(() => {
		if (open) {
			setEditedTask(task);
		}
	}, [open, task]); 

    const handleChange = (key, value) => {
        setEditedTask(prev => ({ ...prev, [key]: value }));
    };

    const handleSubtaskChange = (index, key, value) => {
        const updated = [...editedTask.subtasks];
        updated[index][key] = value;
        setEditedTask(prev => ({ ...prev, subtasks: updated }));
    };

    const addSubtask = () => {
        setEditedTask(prev => ({
            ...prev,
            subtasks: [...prev.subtasks, { id: Date.now(), title: '', completed: false }],
        }));
    };

    const handleSave = () => {
        setTasks(prev => prev.map(t => (t.id === editedTask.id ? editedTask : t)));
        setOpen(false);
    };


    return (
        <div>
            <Pencil className='w-4 h-4 text-gray-500 cursor-pointer' onClick={() => setOpen(true)} />

            <Dialog title='Edit Task' open={open} onClose={() => setOpen(false)}>
                <div className='space-y-4'>
                    <Input label='Title' value={editedTask.title} onChange={e => handleChange('title', e)} />
					<CheckBox checked={editedTask.completed} onToggle={e => handleChange('completed', !editedTask.completed)} label="Accept Terms" />

                    {/* Subtasks */}
                    <div>
                        <div className='flex justify-between items-center mb-2'>
                            <label className='block text-sm font-medium text-gray-700'>Subtasks</label>
                            <button onClick={addSubtask} className='text-blue-500 hover:underline text-xs flex items-center gap-1'>
                                <Plus className='w-3 h-3' />
                                Add bullet
                            </button>
                        </div>

                        {editedTask.subtasks.map((sub, index) => (
                            <div key={sub.id} className='flex items-center gap-2 mb-2'>
								<Input onEnter={()=> handleSubtaskChange(index ,'completed', !sub.completed)} value={sub.title} onChange={e => handleSubtaskChange(index, 'title', e)} />
								<CheckBox checked={sub.completed} onToggle={e => handleSubtaskChange(index ,'completed', !sub.completed)}  />
                            </div>
                        ))}
                    </div>

                    <div className='flex justify-end gap-2 pt-4'>
                        <Button onClick={() => setOpen(false)} label='Cancel' color='gray' />
                        <Button onClick={handleSave} label='Save' />
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
