import { useValues } from '@/context/Context';
import { EyeClosedIcon, EyeIcon, FilterIcon, Search, Settings, Settings2, SettingsIcon, Sparkles } from 'lucide-react';
import React from 'react';
import Button from '../atoms/Button';
import { motion, AnimatePresence } from 'framer-motion';
import Select from '../atoms/Select';

export default function Header() {
    const { filteredCards, currentBoard, boardLists, boardLabels, boardCustomFields, userBoards, dragItem, dragOverItem, activeCard, setActiveCard, activeModal, setActiveModal, notifications, setNotifications, searchQuery, setSearchQuery, currentBoardId, setCurrentBoardId, showBoardSelector, setShowBoardSelector, inviteEmail, setInviteEmail, focusMode, setFocusMode, focusedUserId, setFocusedUserId, filter, setFilter, users, setUsers, currentUser, setCurrentUser, boards, setBoards, boardMembers, setBoardMembers, lists, setLists, cards, setCards, cardMembers, setCardMembers, labels, setLabels, cardLabels, setCardLabels, attachments, setAttachments, comments, setComments, checklists, setChecklists, checklistItems, setChecklistItems, activities, setActivities, notificationsData, setNotificationsData, aiQuery, setAiQuery, aiResponse, setAiResponse, isAiProcessing, setIsAiProcessing, riskItems, setRiskItems, predictions, setPredictions, automationRules, setAutomationRules, cardTemplates, setCardTemplates, customFieldDefinitions, setCustomFieldDefinitions, collapsed, setCollapsed } = useValues();

    const usersOptions = users.map(user => ({
        label: user.name,
        key: user.id,
    }));

    const selectedUser = usersOptions.find(option => option.key === focusedUserId) || null;

    return (
        <div className=' relative z-[10] !flex mt-4  !flex-row !items-center !justify-between !p-4 card  w-full text-text-base '>
            <div className='flex items-center space-x-2'>
                <div className='relative   '>
                    <button className='flex items-center' onClick={() => setActiveModal('board-selector')}>
                        <h1 className='text-base w-[150px] truncate font-medium'>{currentBoard?.title || 'Select Board'}</h1>
                        <svg className='h-4 w-4 ml-1 text-text-base' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                        </svg>
                    </button>
                </div>
                {currentBoard && <span className={`px-2 h-5 rtl:!ml-[40px] ltr:!mr-[40px] text-[10px]  capitalize flex items-center justify-center rounded ${currentBoard.visibility === 'public' ? 'bg-primary/90 text-white' : currentBoard.visibility === 'team' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{currentBoard.visibility}</span>}

                {/* Focus Mode */}
                <div className='flex items-center space-x-2'>
                    <AnimatePresence>
                        {focusMode && (
                            <motion.div key='animated-select' initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                                <Select options={usersOptions} value={selectedUser} onChange={val => setFocusedUserId(val?.key || null)} />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <Button title='Focus on your cards' color='white' Icon={focusMode ? <EyeClosedIcon className='h-4 w-4 text-red-500' /> : <EyeIcon className='h-4 w-4 text-blue-500 group-hover:text-green-500	' />} onClick={() => setFocusMode(!focusMode)} />
                </div>

                <Button title='Filters the cards' color='white' Icon={<FilterIcon className='h-4 w-4  	text-gray-500 group-hover:text-blue-500	' />} onClick={() => setActiveModal('filters')} />
                <Button title='Ai assistant' color='white' cn='' Icon={<Sparkles className='text-purple-500  h-4 w-4  ' />} onClick={() => setActiveModal('ai-assistant')} />
            </div>

            <div className='flex items-center justify-end space-x-2 flex-1  '>
                <div className='relative flex items-center gap-2 px-2 h-10 py-2 border rounded-lg w-fit  '>
                    <Search size={16} className="text-gray-500" />
                    <input type='text' placeholder='Search cards...' className=' outline-none flex-1 w-[150px] focus:!w-[200px] duration-500 ' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                </div>

                <Button color='white' Icon={<SettingsIcon className=' text-primary w-4 h-4' />} onClick={() => setActiveModal('board-settings')} />

                <div className='relative'>
                    <button className='p-2  rounded-md duration-300 hover:bg-gray-100 relative' onClick={() => setActiveModal(activeModal === 'notifications' ? null : 'notifications')}>
                        <svg className='h-6 w-6 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' />
                        </svg>
                        {notificationsData.filter(n => !n.read && n.user_id === currentUser.id).length > 0 && <span className='absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500'></span>}
                    </button>
                </div>

                <div className='flex  gap-2 items-center w-[150px] '>
                    <img src={currentUser.avatar} alt={currentUser.name} className='h-8 w-8 rounded-full' />
                    <span className='w-full text-nowrap '>{currentUser.name}</span>
                </div>
            </div>
        </div>
    );
}
