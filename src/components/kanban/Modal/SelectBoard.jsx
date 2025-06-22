import { useValues } from '@/context/Context';
import React from 'react';

export default function SelectBoard() {

		const { checkAutomationRules , updateCard , closeModal , filteredCards , currentBoard , boardLists , boardLabels , boardCustomFields , userBoards , dragItem, dragOverItem, activeCard, setActiveCard, activeModal, setActiveModal, notifications, setNotifications, searchQuery, setSearchQuery, currentBoardId, setCurrentBoardId, showBoardSelector, setShowBoardSelector, inviteEmail, setInviteEmail, focusMode, setFocusMode, focusedUserId, setFocusedUserId, filter, setFilter, users, setUsers, currentUser, setCurrentUser, boards, setBoards, boardMembers, setBoardMembers, lists, setLists, cards, setCards, cardMembers, setCardMembers, labels, setLabels, cardLabels, setCardLabels, attachments, setAttachments, comments, setComments, checklists, setChecklists, checklistItems, setChecklistItems, activities, setActivities, notificationsData, setNotificationsData, aiQuery, setAiQuery, aiResponse, setAiResponse, isAiProcessing, setIsAiProcessing, riskItems, setRiskItems, predictions, setPredictions, automationRules, setAutomationRules, cardTemplates, setCardTemplates, customFieldDefinitions, setCustomFieldDefinitions, collapsed, setCollapsed , getUserById , getCardMembers , getCardLabels , getCardAttachments , getCardComments , getCardChecklists , getChecklistItems , getCardActivities , getBoardMembers  } = useValues();
    return (
            <div className=''>


                <div className='space-y-2 mb-4'>
                    {userBoards.map(board => (
                        <div
                            key={board.id}
                            className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${currentBoardId === board.id ? 'bg-blue-50 border-blue-200' : ''}`}
                            onClick={() => {
                                setCurrentBoardId(board.id);
                                closeModal();
                            }}>
                            <div className='flex justify-between items-center'>
                                <h3 className='font-medium'>{board.title}</h3>
                                <span className={`text-xs px-2 py-1 rounded ${board.visibility === 'public' ? 'bg-blue-100 text-blue-800' : board.visibility === 'team' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{board.visibility}</span>
                            </div>
                            <p className='text-sm text-gray-500 mt-1'>
                                {getBoardMembers(board.id).length} members • {lists.filter(l => l.board_id === board.id).length} lists
                            </p>
                        </div>
                    ))}
                </div>

                <button className='w-full mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600' onClick={() => setActiveModal('create-board')}>
                    Create New Board
                </button>
            </div>
    );
}
