import { useValues } from '@/context/Context';
import React from 'react'

export default function CreateBoard() {
	const { checkAutomationRules , updateCard , closeModal , filteredCards , currentBoard , boardLists , boardLabels , boardCustomFields , userBoards , dragItem, dragOverItem, activeCard, setActiveCard, activeModal, setActiveModal, notifications, setNotifications, searchQuery, setSearchQuery, currentBoardId, setCurrentBoardId, showBoardSelector, setShowBoardSelector, inviteEmail, setInviteEmail, focusMode, setFocusMode, focusedUserId, setFocusedUserId, filter, setFilter, users, setUsers, currentUser, setCurrentUser, boards, setBoards, boardMembers, setBoardMembers, lists, setLists, cards, setCards, cardMembers, setCardMembers, labels, setLabels, cardLabels, setCardLabels, attachments, setAttachments, comments, setComments, checklists, setChecklists, checklistItems, setChecklistItems, activities, setActivities, notificationsData, setNotificationsData, aiQuery, setAiQuery, aiResponse, setAiResponse, isAiProcessing, setIsAiProcessing, riskItems, setRiskItems, predictions, setPredictions, automationRules, setAutomationRules, cardTemplates, setCardTemplates, customFieldDefinitions, setCustomFieldDefinitions, collapsed, setCollapsed , getUserById , getCardMembers , getCardLabels , getCardAttachments , getCardComments , getCardChecklists , getChecklistItems , getCardActivities , getBoardMembers  } = useValues();
    
        // Board operations
        const createBoard = (title, visibility) => {
            const newBoard = {
                id: Math.max(...boards.map(b => b.id), 0) + 1,
                title,
                visibility,
                created_by: currentUser.id,
            };
    
            setBoards([...boards, newBoard]);
            setBoardMembers([...boardMembers, { board_id: newBoard.id, user_id: currentUser.id, role: 'admin' }]);
            setCurrentBoardId(newBoard.id);
    
            // Add default lists
            const defaultLists = [
                { id: Math.max(...lists.map(l => l.id), 0) + 1, title: 'To Do', board_id: newBoard.id, position: 1 },
                { id: Math.max(...lists.map(l => l.id), 0) + 2, title: 'In Progress', board_id: newBoard.id, position: 2 },
                { id: Math.max(...lists.map(l => l.id), 0) + 3, title: 'Done', board_id: newBoard.id, position: 3 },
            ];
            setLists([...lists, ...defaultLists]);
    
            return newBoard;
        };
  return (
            <div className=''>

                <div className='space-y-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Board Title</label>
                        <input type='text' className='w-full p-2 border rounded-lg' placeholder='e.g. Project Roadmap' id='board-title' />
                    </div>

                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-1'>Visibility</label>
                        <div className='space-y-2'>
                            <label className='flex items-center'>
                                <input type='radio' name='visibility' value='public' className='mr-2' defaultChecked />
                                <div>
                                    <span className='font-medium'>Public</span>
                                    <p className='text-xs text-gray-500'>Anyone can see this board</p>
                                </div>
                            </label>
                            <label className='flex items-center'>
                                <input type='radio' name='visibility' value='team' className='mr-2' />
                                <div>
                                    <span className='font-medium'>Team</span>
                                    <p className='text-xs text-gray-500'>Only team members can see this board</p>
                                </div>
                            </label>
                            <label className='flex items-center'>
                                <input type='radio' name='visibility' value='private' className='mr-2' />
                                <div>
                                    <span className='font-medium'>Private</span>
                                    <p className='text-xs text-gray-500'>Only you can see this board</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div className='mt-6 flex justify-end space-x-2'>
                        <button onClick={closeModal} className='px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg'>
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                const title = document.getElementById('board-title').value;
                                const visibility = document.querySelector('input[name="visibility"]:checked').value;
                                if (title) {
                                    createBoard(title, visibility);
                                    closeModal();
                                }
                            }}
                            className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'>
                            Create Board
                        </button>
                    </div>
                </div>
            </div>
  )
}
