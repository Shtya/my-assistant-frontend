import { useValues } from '@/context/Context';
import React from 'react';

export default function NotificationsModal() {
    const { checkAutomationRules, updateCard, closeModal, filteredCards, currentBoard, boardLists, boardLabels, boardCustomFields, userBoards, dragItem, dragOverItem, activeCard, setActiveCard, activeModal, setActiveModal, notifications, setNotifications, searchQuery, setSearchQuery, currentBoardId, setCurrentBoardId, showBoardSelector, setShowBoardSelector, inviteEmail, setInviteEmail, focusMode, setFocusMode, focusedUserId, setFocusedUserId, filter, setFilter, users, setUsers, currentUser, setCurrentUser, boards, setBoards, boardMembers, setBoardMembers, lists, setLists, cards, setCards, cardMembers, setCardMembers, labels, setLabels, cardLabels, setCardLabels, attachments, setAttachments, comments, setComments, checklists, setChecklists, checklistItems, setChecklistItems, activities, setActivities, notificationsData, setNotificationsData, aiQuery, setAiQuery, aiResponse, setAiResponse, isAiProcessing, setIsAiProcessing, riskItems, setRiskItems, predictions, setPredictions, automationRules, setAutomationRules, cardTemplates, setCardTemplates, customFieldDefinitions, setCustomFieldDefinitions, collapsed, setCollapsed, getUserById, getCardMembers, getCardLabels, getCardAttachments, getCardComments, getCardChecklists, getChecklistItems, getCardActivities, getBoardMembers } = useValues();

    // Notification operations
    const markNotificationAsRead = notificationId => {
        setNotificationsData(notificationsData.map(notification => (notification.id === notificationId ? { ...notification, read: true } : notification)));
    };
    return (
        <div className=''>
            {notificationsData
                .filter(n => n.user_id === currentUser.id)
                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                .map(notification => (
                    <div
                        key={notification.id}
                        className={`p-3 border-b cursor-pointer hover:bg-blue-100 duration-300 ${!notification.read ? 'bg-blue-50' : ''}`}
                        onClick={() => {
                            markNotificationAsRead(notification.id);
                            if (notification.card_id) {
                                const card = cards.find(c => c.id === notification.card_id);
                                if (card) {
                                    setActiveCard(card);
                                    setActiveModal('card-details');
                                }
                            }
                        }}>
                        <div className='flex justify-between  '>
                            <p className={!notification.read ? 'font-medium' : ''}>{notification.message}</p>
                            {!notification.read && <span className='h-2 w-2 rounded-full bg-blue-500'></span>}
                        </div>
                        <p className='text-xs text-gray-500 mt-1'>{new Date(notification.timestamp).toLocaleString()}</p>
                    </div>
                ))}

            {notificationsData.filter(n => n.user_id === currentUser.id).length === 0 && <p className='text-gray-500 text-center py-4'>No notifications</p>}
        </div>
    );
}
