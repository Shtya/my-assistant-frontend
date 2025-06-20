'use client';

import { useState } from 'react';
import { CheckCircle, Circle, Pencil, Trash, Plus, Check } from 'lucide-react';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import { EditTask } from './ActionTasks';

let taskId = 9; // simple ID incrementer

export default function TaskList() {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Meditation', pomos: '1', completed: true, subtasks: [{title :"one task" , id : 1} , {title : "two task" , id : 2}] },
        { id: 2, title: 'Read an article on Design Trends', pomos: '1', completed: true, subtasks: [] },
        { id: 3, title: 'Practice Motion Design (After Effects)', pomos: '1/2', completed: false, subtasks: [] },
    ]);

    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [showInput, setShowInput] = useState(false);

    const toggleTask = id => {
        setTasks(prev => prev.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
    };

    const addTask = () => {
        if (!newTaskTitle.trim()) return;
        setTasks(prev => [...prev, { id: taskId++, title: newTaskTitle, pomos: '0', completed: false, subtasks: [] }]);
        setNewTaskTitle('');
        setShowInput(false);
    };

    const deleteTask = id => {
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    const addSubtask = (parentId, subTitle) => {
        if (!subTitle.trim()) return;
        setTasks(prev =>
            prev.map(task =>
                task.id === parentId
                    ? {
                          ...task,
                          subtasks: [...task.subtasks, { id: Date.now(), title: subTitle, completed: false }],
                      }
                    : task,
            ),
        );
    };

    const toggleSubtask = (parentId, subId) => {
        setTasks(prev =>
            prev.map(task =>
                task.id === parentId
                    ? {
                          ...task,
                          subtasks: task.subtasks.map(sub => (sub.id === subId ? { ...sub, completed: !sub.completed } : sub)),
                      }
                    : task,
            ),
        );
    };

    return (
        <div className='card'>
            <div className='title-card '>
                Task List ({tasks.length} Task{tasks.length > 1 ? 's' : ''}){' '}
            </div>

            {tasks.map(task => (
                <div key={task.id} className={`w-full mb-3 p-3 rounded-md transition group ${task.completed ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                    <div className='flex justify-between items-start'>
                        <div onClick={() => toggleTask(task.id)} className='flex gap-3 cursor-pointer'>
                            {task.completed ? <CheckCircle className='w-5 h-5 text-blue-500 mt-1' /> : <Circle className='w-5 h-5 text-gray-300 mt-1' />}
                            <div className='flex flex-col items-start '>
                                <h3 className={`text-base font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>{task.title}</h3>
                            </div>
                        </div>
                        <div className='flex gap-2  transition'>
                            <EditTask setTasks={setTasks} task={task} />
                            <Trash onClick={() => deleteTask(task.id)} className='w-4 h-4 text-red-400 cursor-pointer' />
                        </div>
                    </div>

                    {/* Subtasks */}
                    {task.subtasks.length > 0 && (
                        <ul className='ml-7 mt-2 space-y-1'>
                            {task.subtasks.map(sub => (
                                <li key={sub.id} onClick={() => toggleSubtask(task.id, sub.id)} className={`flex items-center gap-2 text-sm cursor-pointer ${sub.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                                    {sub.completed ? <CheckCircle className='w-4 h-4 text-blue-400' /> : <Circle className='w-4 h-4 text-gray-300' />}
                                    {sub.title}
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* Add subtask */}
                    <SubtaskInput onAdd={title => addSubtask(task.id, title)} />
                </div>
            ))}

            {/* Add New Task Input */}
            {showInput ? (
                <div className='mt-3 flex gap-2 items-center'>
                    <input value={newTaskTitle} onChange={e => setNewTaskTitle(e.target.value)} onKeyDown={e => e.key === 'Enter' && addTask()} placeholder='New task...' className='flex-1 border rounded px-3 py-1 text-sm focus:outline-none' autoFocus />
                    <button onClick={addTask} className='text-blue-500 hover:underline text-sm'>
                        Add
                    </button>
                </div>
            ) : (
                <button onClick={() => setShowInput(true)} className='w-full flex items-center gap-1 text-sm text-blue-500 hover:underline mt-2'>
                    <Plus className='w-4 h-4' />
                    Add task
                </button>
            )}
        </div>
    );
}

function SubtaskInput({ onAdd }) {
    const [showSubInput, setShowSubInput] = useState(false);
    const [subTitle, setSubTitle] = useState('');

    const handleAdd = () => {
        if (subTitle.trim()) {
            onAdd(subTitle);
            setSubTitle('');
            setShowSubInput(false);
        }
    };

    return (
        <div className='mt-2 ml-7'>
            {showSubInput ? (
                <div className='flex gap-2 items-center'>
                    <Input cn=' text-sm w-full flex-1' value={subTitle} onChange={setSubTitle} onEnter={handleAdd} placeholder='New bullet...' autoFocus />
                    <Button cn=' flex-2 !w-[38px] !px-[5px] !h-[38px] ' Icon={<Check size={20} className='w-fit' />} onClick={handleAdd} />
                </div>
            ) : (
                <button onClick={() => setShowSubInput(true)} className='text-xs text-left w-full  text-gray-500 hover:underline'>
                    + Add bullet
                </button>
            )}
        </div>
    );
}
