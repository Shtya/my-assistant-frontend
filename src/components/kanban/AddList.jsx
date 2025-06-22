import { useValues } from '@/context/Context';
import { PlusIcon } from 'lucide-react';
import React from 'react';

export default function AddList() {
    const { checkAutomationRules, updateCard, closeModal, filteredCards, currentBoard, boardLists, boardLabels, boardCustomFields, userBoards, dragItem, dragOverItem, activeCard, setActiveCard, activeModal, setActiveModal, notifications, setNotifications, searchQuery, setSearchQuery, currentBoardId, setCurrentBoardId, showBoardSelector, setShowBoardSelector, inviteEmail, setInviteEmail, focusMode, setFocusMode, focusedUserId, setFocusedUserId, filter, setFilter, users, setUsers, currentUser, setCurrentUser, boards, setBoards, boardMembers, setBoardMembers, lists, setLists, cards, setCards, cardMembers, setCardMembers, labels, setLabels, cardLabels, setCardLabels, attachments, setAttachments, comments, setComments, checklists, setChecklists, checklistItems, setChecklistItems, activities, setActivities, notificationsData, setNotificationsData, aiQuery, setAiQuery, aiResponse, setAiResponse, isAiProcessing, setIsAiProcessing, riskItems, setRiskItems, predictions, setPredictions, automationRules, setAutomationRules, cardTemplates, setCardTemplates, customFieldDefinitions, setCustomFieldDefinitions, collapsed, setCollapsed, getUserById, getCardMembers, getCardLabels, getCardAttachments, getCardComments, getCardChecklists, getChecklistItems, getCardActivities, getBoardMembers } = useValues();
    return (
        <button
            className='flex gap-2 !flex-row !items-center !justify-center !bg-neutral-100 text-text-base hover:!bg-neutral-200 card rounded-md !p-3 !min-w-[280px] opacity-60 hover:opacity-100 duration-300 !px-4 h-fit '
            onClick={() => {
                const title = prompt('Enter list title');
                if (title) {
                    const newList = {
                        id: Math.max(...lists.map(l => l.id), 0) + 1,
                        title,
                        board_id: currentBoardId,
                        position: lists.filter(l => l.board_id === currentBoardId).length + 1,
                    };
                    setLists([...lists, newList]);
                }
            }}>
            <img src='/add-icon.png' className='w-5 h-5 mt-[2px] ' />
            Add another list
        </button>
    );
}
