'use client';
import { useState, useEffect, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { motion, AnimatePresence } from 'framer-motion';
import Input2 from '@/components/atoms/Input2';
import Button from '@/components/atoms/Button';
import CheckBox from '@/components/atoms/CheckBox';
import { Edit, Edit2, Plus, Save, Trash, Trash2, X } from 'lucide-react';

export default function TodoApp() {
    const [darkMode, setDarkMode] = useState(false);
    const [activeList, setActiveList] = useState('my-day');
    const [lists, setLists] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        title: '',
        listId: 'my-day',
        steps: [],
    });
    const [newListName, setNewListName] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [newStep, setNewStep] = useState('');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    // Load data from localStorage on initial render
    useEffect(() => {
        const savedDarkMode = localStorage.getItem('darkMode') === 'true';
        const savedLists = JSON.parse(localStorage.getItem('todoLists')) || [
            { id: 'my-day', name: 'My Day', icon: 'sun' },
            { id: 'important', name: 'Important', icon: 'star' },
            { id: 'planned', name: 'Planned', icon: 'calendar' },
            { id: 'tasks', name: 'Tasks', icon: 'home' },
            { id: 'completed', name: 'Completed', icon: 'check' },
        ];
        const savedTasks = JSON.parse(localStorage.getItem('todoTasks')) || [];
        const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';

        setDarkMode(savedDarkMode);
        setLists(savedLists);
        setTasks(savedTasks);
        setSidebarCollapsed(sidebarCollapsed);
    }, []);

    // Save data to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
        localStorage.setItem('todoLists', JSON.stringify(lists));
        localStorage.setItem('todoTasks', JSON.stringify(tasks));
        localStorage.setItem('sidebarCollapsed', sidebarCollapsed);
    }, [darkMode, lists, tasks, sidebarCollapsed]);

    // Filter and sort tasks - completed tasks go to bottom
    const filteredTasks = useCallback(() => {
        const activeTasks = tasks.filter(task => {
            if (activeList === 'my-day') return true;
            if (activeList === 'important') return task.priority === 'high';
            if (activeList === 'completed') return task.completed;
            return task.listId === activeList;
        });

        // Only sort completed tasks to bottom if not in "completed" view
        if (activeList !== 'completed') {
            return [...activeTasks].sort((a, b) => {
                if (a.completed && !b.completed) return 1;
                if (!a.completed && b.completed) return -1;
                return 0;
            });
        }

        return activeTasks;
    }, [tasks, activeList]);

    const handleAddTask = () => {
        if (!newTask.title.trim()) return;

        const task = {
            id: Date.now().toString(),
            title: newTask.title,
            listId: activeList,
            completed: false,
            createdAt: new Date().toISOString(),
            steps: [],
        };

        setTasks([...tasks, task]);
        setNewTask({
            title: '',
            listId: activeList,
            steps: [],
        });
    };

    const handleAddList = () => {
        if (!newListName.trim()) return;

        const list = {
            id: Date.now().toString(),
            name: newListName,
            icon: 'list',
        };

        setLists([...lists, list]);
        setNewListName('');
        setActiveList(list.id);
    };

    const handleDeleteList = listId => {
        if (['my-day', 'important', 'planned', 'tasks', 'completed'].includes(listId)) {
            alert('Cannot delete default lists');
            return;
        }

        setLists(lists.filter(list => list.id !== listId));
        setTasks(tasks.filter(task => task.listId !== listId));
        if (activeList === listId) setActiveList('my-day');
    };

    const toggleTaskCompletion = taskId => {
        setTasks(
            tasks.map(task => {
                if (task.id === taskId) {
                    return { ...task, completed: !task.completed };
                }
                return task;
            }),
        );
    };

    const handleDeleteTask = taskId => {
        setTasks(tasks.filter(task => task.id !== taskId));
        if (editingTaskId === taskId) setEditingTaskId(null);
    };

    const toggleEditTask = taskId => {
        setEditingTaskId(editingTaskId === taskId ? null : taskId);
    };

    const updateTaskTitle = (taskId, newTitle) => {
        setTasks(tasks.map(task => (task.id === taskId ? { ...task, title: newTitle } : task)));
    };

    const addStepToTask = (taskId, stepText) => {
        if (!stepText.trim()) return;

        const newStepItem = {
            id: Date.now().toString(),
            text: stepText,
            completed: false,
        };

        setTasks(tasks.map(task => (task.id === taskId ? { ...task, steps: [...(task.steps || []), newStepItem] } : task)));
        setNewStep('');
    };

    const toggleStepCompletion = (taskId, stepId) => {
        setTasks(
            tasks.map(task =>
                task.id === taskId
                    ? {
                          ...task,
                          steps: task.steps?.map(step => (step.id === stepId ? { ...step, completed: !step.completed } : step)),
                      }
                    : task,
            ),
        );
    };

    const updateStepText = (taskId, stepId, newText) => {
        setTasks(
            tasks.map(task =>
                task.id === taskId
                    ? {
                          ...task,
                          steps: task.steps?.map(step => (step.id === stepId ? { ...step, text: newText } : step)),
                      }
                    : task,
            ),
        );
    };

    const deleteStep = (taskId, stepId) => {
        setTasks(
            tasks.map(task =>
                task.id === taskId
                    ? {
                          ...task,
                          steps: task.steps?.filter(step => step.id !== stepId),
                      }
                    : task,
            ),
        );
    };

    const handleDragEnd = result => {
        if (!result.destination) return;

        const { source, destination } = result;
        
        // Don't do anything if the item is dropped in the same place
        if (source.index === destination.index && source.droppableId === destination.droppableId) {
            return;
        }

        // Get the current filtered tasks to find the correct task
        const currentFiltered = filteredTasks();
        const movedTask = currentFiltered[source.index];
        
        // Create a new array from the full tasks list
        const newTasks = [...tasks];
        
        // Find the index of the moved task in the full array
        const sourceIndex = newTasks.findIndex(t => t.id === movedTask.id);
        
        // Remove it from its current position
        const [removed] = newTasks.splice(sourceIndex, 1);
        
        // Find the new position in the full array
        let destinationIndex;
        
        if (destination.index === 0) {
            // If moving to the first position
            destinationIndex = 0;
        } else {
            // Find the task that's now before our moved task in the filtered view
            const taskBefore = currentFiltered[destination.index - 1];
            const indexBefore = newTasks.findIndex(t => t.id === taskBefore.id);
            destinationIndex = indexBefore + 1;
        }
        
        // Insert at the new position
        newTasks.splice(destinationIndex, 0, removed);
        
        // Update state
        setTasks(newTasks);
    };

    const reorderSteps = (taskId, startIndex, endIndex) => {
        setTasks(
            tasks.map(task => {
                if (task.id === taskId) {
                    const newSteps = Array.from(task.steps);
                    const [removed] = newSteps.splice(startIndex, 1);
                    newSteps.splice(endIndex, 0, removved);
                    return { ...task, steps: newSteps };
                }
                return task;
            }),
        );
    };

    return (
        <div className={` relative top-[16px] min-h-[calc(100vh-32px)] flex flex-col text-text-base`}>
            <div className='flex flex-1 gap-2 overflow-hidden'>
                <Sidebar 
                    setSidebarCollapsed={setSidebarCollapsed} 
                    lists={lists} 
                    activeList={activeList} 
                    setActiveList={setActiveList} 
                    newListName={newListName} 
                    setNewListName={setNewListName} 
                    handleAddList={handleAddList} 
                    handleDeleteList={handleDeleteList} 
                    collapsed={sidebarCollapsed} 
                />

                <section className=' card2 !p-6 text-gray-900  flex-1 overflow-auto'>
                    <TaskListTitle lists={lists} activeList={activeList} taskCount={filteredTasks().length} />
                    <div className='max-w-[600px] mx-auto w-full  '>
                        <AddTaskForm newTask={newTask} setNewTask={setNewTask} handleAddTask={handleAddTask} />

                        <DragDropContext onDragEnd={handleDragEnd}>
                            <TaskList 
                                tasks={filteredTasks()} 
                                toggleTaskCompletion={toggleTaskCompletion} 
                                handleDeleteTask={handleDeleteTask} 
                                toggleEditTask={toggleEditTask} 
                                activeList={activeList} 
                                editingTaskId={editingTaskId} 
                                updateTaskTitle={updateTaskTitle} 
                                newStep={newStep} 
                                setNewStep={setNewStep} 
                                addStepToTask={addStepToTask} 
                                toggleStepCompletion={toggleStepCompletion} 
                                updateStepText={updateStepText} 
                                deleteStep={deleteStep} 
                                reorderSteps={reorderSteps} 
                            />
                        </DragDropContext>
                    </div>
                </section>
            </div>
        </div>
    );
}

// Sidebar Component
const Sidebar = ({ setSidebarCollapsed, lists, activeList, setActiveList, newListName, setNewListName, handleAddList, handleDeleteList, collapsed }) => {
    const defaultLists = [
        { id: 'my-day', name: 'My Day', icon: 'sun' },
        { id: 'important', name: 'Important', icon: 'star' },
        { id: 'planned', name: 'Planned', icon: 'calendar' },
        { id: 'tasks', name: 'Tasks', icon: 'home' },
    ];

    const customLists = lists.filter(list => !['my-day', 'important', 'planned', 'tasks'].includes(list.id));

    const getIcon = iconName => {
        switch (iconName) {
            case 'sun':
                return (
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                        <path fillRule='evenodd' d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z' clipRule='evenodd' />
                    </svg>
                );
            case 'star':
                return (
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                    </svg>
                );
            case 'calendar':
                return (
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                        <path fillRule='evenodd' d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z' clipRule='evenodd' />
                    </svg>
                );
            case 'home':
                return (
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                        <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
                    </svg>
                );
            case 'check':
                return (
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                        <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                    </svg>
                );
            case 'list':
                return (
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                        <path fillRule='evenodd' d='M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z' clipRule='evenodd' />
                    </svg>
                );
            default:
                return (
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
                        <path fillRule='evenodd' d='M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z' clipRule='evenodd' />
                    </svg>
                );
        }
    };

    return (
        <aside className={`${collapsed ? '!w-14' : '!w-52'}  rtl:mr-[10px] ltr:ml-[10px] card2 !p-1 flex-shrink-0 flex flex-col border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 transition-all duration-200 overflow-hidden`}>
            <div className='flex-1 overflow-y-auto'>
                <div className='flex items-center gap-1 mt-1  px-1'>
                    <button onClick={() => setSidebarCollapsed(!collapsed)} className={`${collapsed ? ' mx-auto ' : ''} w-10 h-9 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-700`}>
                        <img src='/minimize.png' className='h-5 w-5 object-contain ' />
                    </button>

                    {!collapsed && (
                        <div className=''>
                            <Input2 type='text' onEnter={handleAddList} value={newListName} onChange={e => setNewListName(e)} placeholder='New list name' />
                        </div>
                    )}
                </div>

                <hr className='my-2 border-border-muted' />

                <div className='space-y-1 mb-6 px-1'>
                    {defaultLists.map(list => (
                        <button key={list.id} onClick={() => setActiveList(list.id)} className={` ${collapsed ? 'justify-center !w-10 mx-auto ' : ''} w-full text-left p-2 rounded-md flex items-center gap-3 ${activeList === list.id ? 'bg-blue-100 text-blue-700 dark:bg-gray-700 dark:text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                            <span className={activeList === list.id ? 'text-blue-400' : 'text-gray-400'}>{getIcon(list.icon)}</span>
                            {!collapsed && <span>{list.name}</span>}
                        </button>
                    ))}
                </div>

                {!collapsed && customLists.length > 0 && (
                    <div className='mb-6 px-2'>
                        <h3 className='font-medium px-2 py-2 text-gray-500 dark:text-gray-400'>My Lists</h3>
                        <div className={`space-y-1 `}>
                            {customLists.map(list => (
                                <div key={list.id} className={`space-y-1 ${activeList === list.id ? ' rounded-md bg-blue-100 text-primary  dark:bg-gray-700 dark:text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                                    <div className='group flex items-center'>
                                        <button onClick={() => setActiveList(list.id)} className={`flex-1 text-left p-2 rounded-md flex items-center gap-3 `}>
                                            <span className={`text-gray-400 ${activeList === list.id ? 'text-primary' : ''}`}>{getIcon(list.icon)}</span>
                                            <span className='truncate'>{list.name}</span>
                                        </button>
                                        {!collapsed && (
                                            <button onClick={() => handleDeleteList(list.id)} className='opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 dark:hover:text-red-400'>
                                                <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </aside>
    );
};

// TaskListTitle Component
const TaskListTitle = ({ lists, activeList, taskCount }) => {
    const getListName = () => {
        if (activeList === 'my-day') return 'My Day';
        if (activeList === 'important') return 'Important';
        if (activeList === 'planned') return 'Planned';
        const list = lists.find(l => l.id === activeList);
        return list ? list.name : 'Tasks';
    };

    const getIcon = () => {
        switch (activeList) {
            case 'my-day':
                return (
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-8 w-8 text-blue-500' viewBox='0 0 20 20' fill='currentColor'>
                        <path fillRule='evenodd' d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z' clipRule='evenodd' />
                    </svg>
                );
            case 'important':
                return (
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-8 w-8 text-red-500' viewBox='0 0 20 20' fill='currentColor'>
                        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                    </svg>
                );
            case 'planned':
                return (
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-8 w-8 text-green-500' viewBox='0 0 20 20' fill='currentColor'>
                        <path fillRule='evenodd' d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z' clipRule='evenodd' />
                    </svg>
                );
            case 'completed':
                return (
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-8 w-8 text-purple-500' viewBox='0 0 20 20' fill='currentColor'>
                        <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                    </svg>
                );
            default:
                return (
                    <svg xmlns='http://www.w3.org/2000/svg' className='h-8 w-8 text-blue-400' viewBox='0 0 20 20' fill='currentColor'>
                        <path fillRule='evenodd' d='M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z' clipRule='evenodd' />
                    </svg>
                );
        }
    };

    return (
        <div className='flex justify-between items-center mb-6'>
            <h2 className='text-2xl font-bold flex items-center gap-3 text-gray-800 dark:text-white'>
                {getIcon()}
                {getListName()}
            </h2>
            <span className='text-sm text-gray-500 dark:text-gray-400'>
                {taskCount} {taskCount === 1 ? 'task' : 'tasks'}
            </span>
        </div>
    );
};

// AddTaskForm Component
const AddTaskForm = ({ newTask, setNewTask, handleAddTask }) => {
    return (
        <div className='mb-6 rounded-lg bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
            <Input2 type='text' value={newTask.title} onEnter={handleAddTask} onChange={e => setNewTask({ ...newTask, title: e })} placeholder='Add a task' className='flex-1 !bg-white' />
        </div>
    );
};

const TaskList = ({ tasks, toggleTaskCompletion, handleDeleteTask, toggleEditTask, editingTaskId, updateTaskTitle, newStep, setNewStep, addStepToTask, toggleStepCompletion, deleteStep, updateStepText, reorderSteps }) => {
    const [localNewStep, setLocalNewStep] = useState('');
    const [filter, setFilter] = useState('all'); // 'all', 'completed', 'active'
    const [idAddStep, setIdAddStep] = useState(null);

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'active') return !task.completed;
        return true;
    });

    if (tasks.length === 0) {
        return (
            <div className='text-center py-12 rounded-lg bg-white shadow dark:bg-gray-800 text-gray-500 dark:text-gray-400'>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-12 w-12 mx-auto mb-4 opacity-50' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
                </svg>
                <p>No tasks found</p>
            </div>
        );
    }

    const handleAddStep = taskId => {
        if (localNewStep.trim()) {
            addStepToTask(taskId, localNewStep);
            setLocalNewStep('');
        }
    };

    return (
        <div className='space-y-4'>
            {/* Filter Controls */}
            <div className='flex gap-2 mb-4'>
                <Button onClick={() => setFilter('all')} label='All' color={filter === 'all' ? 'primary' : 'gray'} cn='!h-[30px] !px-[10px]' />
                <Button onClick={() => setFilter('active')} label='Active' color={filter === 'active' ? 'primary' : 'gray'} cn='!h-[30px] !px-[10px]' />
                <Button onClick={() => setFilter('completed')} label='Completed' color={filter === 'completed' ? 'primary' : 'gray'} cn='!h-[30px] !px-[10px]' />
            </div>

            <Droppable droppableId='tasks' type='TASK'>
                {provided => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className='rounded-lg space-y-2 overflow-hidden'>
                        <AnimatePresence>
                            {filteredTasks.map((task, index) => (
                                <motion.div key={task.id} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}>
                                    <Draggable key={task.id} draggableId={task.id} index={index}>
                                        {(provided, snapshot) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} className={`${snapshot.isDragging ? '!left-[30px] bg-gray-100 dark:bg-gray-700 shadow-lg' : ''} card2 !p-2 relative border-b border-gray-200 dark:border-gray-700 ${task.completed ? 'bg-gray-100 bg-opacity-50 dark:bg-gray-700 dark:bg-opacity-30' : ''}`}>
                                                <div className='flex flex-col gap-3'>
                                                    {/* Task Header */}
                                                    <div className='flex items-start gap-2 mt-1'>
                                                        {/* Drag Handle */}
                                                        <div {...provided.dragHandleProps} className='p-1 mt-[2px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-grab'>
                                                            <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 8h16M4 16h16' />
                                                            </svg>
                                                        </div>

                                                        {/* Completion Checkbox */}
                                                        <CheckBox className='mt-[3px]' size={20} checked={task.completed} onToggle={() => toggleTaskCompletion(task.id)} />

                                                        {/* Task Content */}
                                                        <div className='flex-1 flex flex-col min-w-0'>
                                                            {editingTaskId === task.id ? (
                                                                <div className='flex items-center gap-2'>
                                                                    <Input2 type='text' value={task.title} onChange={e => updateTaskTitle(task.id, e)} onEnter={() => toggleEditTask(task.id)} autoFocus className='flex-1 !h-[30px] -mt-1' />
                                                                </div>
                                                            ) : (
                                                                <p className={`text-sm ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-white'}`}>{task.title}</p>
                                                            )}
                                                        </div>

                                                        {/* Action Buttons */}
                                                        {!editingTaskId && (
                                                            <div className='flex items-center gap-1'>
                                                                <Edit onClick={() => toggleEditTask(task.id)} className='cursor-pointer text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400' size={16} />
                                                                <Trash2 onClick={() => handleDeleteTask(task.id)} className='cursor-pointer text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400' size={16} />
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Steps List */}
                                                    <div className='ltr:ml-[40px] rtl:mr-[40px] -mt-2 mb-3 space-y-1'>
                                                        {task.steps?.map((step, index) => (
                                                            <div key={index} className={`flex items-center gap-2 p-1 rounded `}>
                                                                <CheckBox size={20} checked={step.completed} onToggle={() => toggleStepCompletion(task.id, step.id)} />
                                                                {editingTaskId === task.id ? <Input2 type='text' value={step.text} onChange={e => updateStepText(task.id, step.id, e)} className='flex-1 h-[30px] text-sm' /> : <span className={`text-sm flex-1 ${step.completed ? 'line-through opacity-70' : ''}`}>{step.text}</span>}
                                                                <Trash2 size={16} onClick={() => deleteStep(task.id, step.id)} className='cursor-pointer text-gray-500 hover:text-red-500' />
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Add Step Section - Specific to each task */}
                                                    <div className='ltr:ml-[50px] rtl:mr-[50px] justify-between -mt-4 flex gap-2 items-center'>
                                                        <div className='flex items-center gap-1'>
                                                            <Plus size={18} className='text-gray-400' />
                                                            <input
                                                                className='text-gray-400 text-sm outline-none'
                                                                type='text'
                                                                placeholder='Add a step'
                                                                value={idAddStep == task.id ? localNewStep : ''}
                                                                onFocus={() => setIdAddStep(task.id)}
                                                                onBlur={() => idAddStep == task.id && setLocalNewStep('')}
                                                                onChange={e => {
                                                                    setLocalNewStep(e.target.value);
                                                                }}
                                                                onKeyDown={e => {
                                                                    if (e.key === 'Enter') {
                                                                        handleAddStep(task.id);
                                                                    }
                                                                }}
                                                            />
                                                        </div>
                                                        {editingTaskId === task.id && (
                                                            <>
                                                                <Button
                                                                    onClick={() => {
                                                                        toggleEditTask(task.id);
                                                                        setLocalNewStep('');
                                                                    }}
                                                                    label={'Cancel'}
                                                                    color='red'
                                                                    cn='!h-[30px] !px-[10px]'
                                                                />
                                                                <Button
                                                                    onClick={() => {
                                                                        toggleEditTask(task.id);
                                                                        setLocalNewStep('');
                                                                    }}
                                                                    label={'Save'}
                                                                    color='primary'
                                                                    cn='!h-[30px] !px-[10px]'
                                                                />
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};