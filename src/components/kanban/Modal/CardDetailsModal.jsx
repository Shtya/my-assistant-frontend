import { useValues } from '@/context/Context';

export default function CardDetailsModal() {
    const { logTime, checkAutomationRules, updateCard, closeModal, filteredCards, currentBoard, boardLists, boardLabels, boardCustomFields, userBoards, dragItem, dragOverItem, activeCard, setActiveCard, activeModal, setActiveModal, notifications, setNotifications, searchQuery, setSearchQuery, currentBoardId, setCurrentBoardId, showBoardSelector, setShowBoardSelector, inviteEmail, setInviteEmail, focusMode, setFocusMode, focusedUserId, setFocusedUserId, filter, setFilter, users, setUsers, currentUser, setCurrentUser, boards, setBoards, boardMembers, setBoardMembers, lists, setLists, cards, setCards, setCardMembers, labels, setLabels, setCardLabels, attachments, setAttachments, comments, setComments, checklists, setChecklists, checklistItems, setChecklistItems, activities, setActivities, notificationsData, setNotificationsData, aiQuery, setAiQuery, aiResponse, setAiResponse, isAiProcessing, setIsAiProcessing, riskItems, setRiskItems, predictions, setPredictions, automationRules, setAutomationRules, cardTemplates, setCardTemplates, customFieldDefinitions, setCustomFieldDefinitions, collapsed, setCollapsed, getUserById, getCardMembers, getCardLabels, getCardAttachments, getCardComments, getCardChecklists, getChecklistItems, getCardActivities, getBoardMembers } = useValues();

    if (!activeCard) return null;

    const cardMembers = getCardMembers(activeCard.id);
    const cardLabels = getCardLabels(activeCard.id);
    const cardAttachments = getCardAttachments(activeCard.id);
    const cardComments = getCardComments(activeCard.id);
    const cardChecklists = getCardChecklists(activeCard.id);
    const cardActivities = getCardActivities(activeCard.id);
    const currentList = lists.find(l => l.id === activeCard.list_id);

    // Custom field operations
    const updateCustomField = (cardId, fieldId, value) => {
        setCards(
            cards.map(card => {
                if (card.id !== cardId) return card;

                const updatedFields = card.custom_fields?.map(field => (field.id === fieldId ? { ...field, value } : field)) || [];

                return { ...card, custom_fields: updatedFields };
            }),
        );

        // Log activity
        const field = customFieldDefinitions.find(f => f.id === fieldId);
        if (field) {
            const newActivity = {
                id: Math.max(...activities.map(a => a.id), 0) + 1,
                card_id: cardId,
                user_id: currentUser.id,
                type: 'field',
                message: `updated ${field.name} to "${value}"`,
                timestamp: new Date().toISOString(),
            };
            setActivities([...activities, newActivity]);
        }
    };

    // Member operations
    const toggleCardMember = (cardId, userId) => {
        const existing = cardMembers.find(cm => cm.card_id === cardId && cm.user_id === userId);

        if (existing) {
            setCardMembers(cardMembers.filter(cm => !(cm.card_id === cardId && cm.user_id === userId)));
        } else {
            setCardMembers([...cardMembers, { card_id: cardId, user_id: userId }]);
        }

        // Log activity
        const newActivity = {
            id: Math.max(...activities.map(a => a.id), 0) + 1,
            card_id: cardId,
            user_id: currentUser.id,
            type: 'member',
            message: existing ? `removed ${getUserById(userId)?.name} from this card` : `added ${getUserById(userId)?.name} to this card`,
            timestamp: new Date().toISOString(),
        };
        setActivities([...activities, newActivity]);
    };

    // Label operations
    const toggleCardLabel = (cardId, labelId) => {
        const existing = cardLabels.find(cl => cl.card_id === cardId && cl.label_id === labelId);
        const label = labels.find(l => l.id === labelId);

        if (existing) {
            setCardLabels(cardLabels.filter(cl => !(cl.card_id === cardId && cl.label_id === labelId)));
        } else {
            setCardLabels([...cardLabels, { card_id: cardId, label_id: labelId }]);
        }

        // Log activity
        const newActivity = {
            id: Math.max(...activities.map(a => a.id), 0) + 1,
            card_id: cardId,
            user_id: currentUser.id,
            type: 'label',
            message: existing ? `removed label "${label?.title}"` : `added label "${label?.title}"`,
            timestamp: new Date().toISOString(),
        };
        setActivities([...activities, newActivity]);
    };

    const toggleChecklistItem = (itemId, checklistId) => {
        const updatedItems = checklistItems.map(item => (item.id === itemId ? { ...item, is_done: !item.is_done } : item));
        setChecklistItems(updatedItems);

        // Log activity if item was completed
        const item = checklistItems.find(i => i.id === itemId);
        if (!item.is_done) {
            const checklist = checklists.find(c => c.id === checklistId);
            const newActivity = {
                id: Math.max(...activities.map(a => a.id), 0) + 1,
                card_id: checklist.card_id,
                user_id: currentUser.id,
                type: 'checklist',
                message: `completed checklist item "${item.content}"`,
                timestamp: new Date().toISOString(),
            };
            setActivities([...activities, newActivity]);

            // Check if all items are done
            const allItems = updatedItems.filter(i => i.checklist_id === checklistId);
            if (allItems.every(i => i.is_done)) {
                const completeActivity = {
                    id: Math.max(...activities.map(a => a.id), 0) + 1,
                    card_id: checklist.card_id,
                    user_id: currentUser.id,
                    type: 'checklist',
                    message: `completed all items in checklist "${checklist.title}"`,
                    timestamp: new Date().toISOString(),
                };
                setActivities([...activities, completeActivity]);
            }
        }
    };

    // Checklist operations
    const addChecklist = (cardId, title) => {
        const newChecklist = {
            id: Math.max(...checklists.map(c => c.id), 0) + 1,
            title,
            card_id: cardId,
        };

        setChecklists([...checklists, newChecklist]);

        // Log activity
        const newActivity = {
            id: Math.max(...activities.map(a => a.id), 0) + 1,
            card_id: cardId,
            user_id: currentUser.id,
            type: 'checklist',
            message: `added checklist "${title}"`,
            timestamp: new Date().toISOString(),
        };
        setActivities([...activities, newActivity]);
    };

    const deleteCard = cardId => {
        setCards(cards.filter(card => card.id !== cardId));

        // Also clean up related data
        setCardMembers(cardMembers.filter(cm => cm.card_id !== cardId));
        setCardLabels(cardLabels.filter(cl => cl.card_id !== cardId));
        setComments(comments.filter(comment => comment.card_id !== cardId));
        setChecklists(checklists.filter(checklist => checklist.card_id !== cardId));
        setAttachments(attachments.filter(att => att.card_id !== cardId));
        setActivities(activities.filter(activity => activity.card_id !== cardId));

        // Log activity
        const newActivity = {
            id: Math.max(...activities.map(a => a.id), 0) + 1,
            card_id: cardId,
            user_id: currentUser.id,
            type: 'delete',
            message: 'archived this card',
            timestamp: new Date().toISOString(),
        };
        setActivities([...activities, newActivity]);
    };

    // Comment operations
    const addComment = (cardId, text) => {
        const newComment = {
            id: Math.max(...comments.map(c => c.id), 0) + 1,
            text,
            card_id: cardId,
            user_id: currentUser.id,
            timestamp: new Date().toISOString(),
        };

        setComments([...comments, newComment]);

        // Log activity
        const newActivity = {
            id: Math.max(...activities.map(a => a.id), 0) + 1,
            card_id: cardId,
            user_id: currentUser.id,
            type: 'comment',
            message: 'commented on this card',
            timestamp: new Date().toISOString(),
        };

        setActivities([...activities, newActivity]);

        // Check for mentions
        const mentionedUsers = text.match(/@\w+/g) || [];
        if (mentionedUsers.length > 0) {
            mentionedUsers.forEach(username => {
                const user = users.find(u => u.name.toLowerCase().includes(username.substring(1).toLowerCase()));
                if (user) {
                    const newNotification = {
                        id: Math.max(...notificationsData.map(n => n.id), 0) + 1,
                        user_id: user.id,
                        card_id: cardId,
                        message: `You were mentioned in a comment by ${currentUser.name}`,
                        read: false,
                        timestamp: new Date().toISOString(),
                    };
                    setNotificationsData([...notificationsData, newNotification]);
                }
            });
        }
    };

    return (
        <div className=' '>
            <div className='flex justify-between items-start mb-6 border-b pb-4'>
                <div className='space-y-1'>
                    <h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>{activeCard.title}</h2>
                    <p className='text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1'>
                        In list
                        <span className='ml-1 inline-block rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-0.5 text-xs font-semibold'>{currentList?.title || 'Unknown'}</span>
                    </p>
                </div>
            </div>

            <div className='flex flex-col md:flex-row gap-6'>
                <div className='flex-1'>
                    <div className='mb-6'>
                        <h3 className='font-medium mb-2 flex items-center'>
                            <svg className='h-5 w-5 mr-1 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                            </svg>
                            Description
                        </h3>
                        <div className='bg-gray-50 p-3 rounded'>
                            {activeCard.description ? (
                                <p>{activeCard.description}</p>
                            ) : (
                                <button
                                    className='text-gray-500 hover:text-gray-700'
                                    onClick={() => {
                                        const newDesc = prompt('Enter description', activeCard.description || '');
                                        if (newDesc !== null) {
                                            updateCard({ ...activeCard, description: newDesc });
                                        }
                                    }}>
                                    Add a more detailed description...
                                </button>
                            )}
                        </div>
                    </div>

                    {activeCard.custom_fields?.length > 0 && (
                        <div className='mb-6'>
                            <h3 className='font-medium mb-2 flex items-center'>
                                <svg className='h-5 w-5 mr-1 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' />
                                </svg>
                                Custom Fields
                            </h3>
                            <div className='bg-gray-50 p-3 rounded grid grid-cols-1 md:grid-cols-2 gap-4'>
                                {activeCard.custom_fields.map(field => (
                                    <div key={field.id} className='space-y-1'>
                                        <label className='text-sm font-medium text-gray-700'>{field.name}</label>
                                        {field.type === 'select' ? (
                                            <select value={field.value} onChange={e => updateCustomField(activeCard.id, field.id, e.target.value)} className='w-full p-2 border rounded'>
                                                {customFieldDefinitions
                                                    .find(f => f.name === field.name)
                                                    ?.options?.map(option => (
                                                        <option key={option} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                            </select>
                                        ) : field.type === 'textarea' ? (
                                            <textarea value={field.value} onChange={e => updateCustomField(activeCard.id, field.id, e.target.value)} className='w-full p-2 border rounded' rows={3} />
                                        ) : (
                                            <input type={field.type === 'number' ? 'number' : 'text'} value={field.value} onChange={e => updateCustomField(activeCard.id, field.id, e.target.value)} className='w-full p-2 border rounded' />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className='mb-6'>
                        <div className='flex justify-between items-center mb-2'>
                            <h3 className='font-medium flex items-center'>
                                <svg className='h-5 w-5 mr-1 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
                                </svg>
                                Checklists
                            </h3>
                            <button
                                className='text-sm text-blue-500 hover:text-blue-700'
                                onClick={() => {
                                    const title = prompt('Enter checklist title');
                                    if (title) {
                                        addChecklist(activeCard.id, title);
                                    }
                                }}>
                                Add Checklist
                            </button>
                        </div>

                        {cardChecklists.map(checklist => {
                            const items = getChecklistItems(checklist.id);
                            const completedCount = items.filter(item => item.is_done).length;
                            const totalCount = items.length;

                            return (
                                <div key={checklist.id} className='bg-gray-50 p-3 rounded mb-3'>
                                    <div className='flex justify-between items-center mb-2'>
                                        <h4 className='font-medium'>{checklist.title}</h4>
                                        <button
                                            className='text-sm text-red-500 hover:text-red-700'
                                            onClick={() => {
                                                if (confirm('Delete this checklist?')) {
                                                    setChecklists(checklists.filter(c => c.id !== checklist.id));
                                                    setChecklistItems(checklistItems.filter(i => i.checklist_id !== checklist.id));
                                                }
                                            }}>
                                            Delete
                                        </button>
                                    </div>

                                    {totalCount > 0 && (
                                        <div className='mb-3'>
                                            <div className='h-2 bg-gray-200 rounded-full overflow-hidden'>
                                                <div className='h-full bg-green-500' style={{ width: `${(completedCount / totalCount) * 100}%` }}></div>
                                            </div>
                                            <p className='text-xs text-gray-500 mt-1'>
                                                {completedCount} of {totalCount} completed
                                            </p>
                                        </div>
                                    )}

                                    <div className='space-y-2'>
                                        {items.map(item => (
                                            <div key={item.id} className='flex items-center'>
                                                <input type='checkbox' checked={item.is_done} onChange={() => toggleChecklistItem(item.id, checklist.id)} className='mr-2' />
                                                <span className={item.is_done ? 'line-through text-gray-500' : ''}>{item.content}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        className='mt-2 text-sm text-blue-500 hover:text-blue-700'
                                        onClick={() => {
                                            const content = prompt('Add checklist item');
                                            if (content) {
                                                setChecklistItems([
                                                    ...checklistItems,
                                                    {
                                                        id: Math.max(...checklistItems.map(i => i.id), 0) + 1,
                                                        content,
                                                        is_done: false,
                                                        checklist_id: checklist.id,
                                                    },
                                                ]);
                                            }
                                        }}>
                                        Add item
                                    </button>
                                </div>
                            );
                        })}

                        {cardChecklists.length === 0 && <p className='text-gray-500 text-sm'>No checklists yet</p>}
                    </div>

                    <div className='mb-6'>
                        <div className='flex justify-between items-center mb-2'>
                            <h3 className='font-medium flex items-center'>
                                <svg className='h-5 w-5 mr-1 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z' />
                                </svg>
                                Comments
                            </h3>
                        </div>

                        <div className='space-y-4'>
                            <div className='flex'>
                                <img src={currentUser.avatar} alt={currentUser.name} className='h-10 w-10 rounded-full mr-3' />
                                <div className='flex-1'>
                                    <textarea
                                        placeholder='Write a comment...'
                                        className='w-full p-3 border rounded-lg'
                                        rows='3'
                                        ref={el => {
                                            if (el && activeModal === 'card-details') {
                                                el.focus();
                                            }
                                        }}
                                        onKeyDown={e => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                if (e.target.value.trim()) {
                                                    addComment(activeCard.id, e.target.value);
                                                    e.target.value = '';
                                                }
                                            }
                                        }}></textarea>
                                    <div className='mt-2 flex justify-end'>
                                        <button
                                            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                                            onClick={e => {
                                                const text = e.target.previousElementSibling.value;
                                                if (text.trim()) {
                                                    addComment(activeCard.id, text);
                                                    e.target.previousElementSibling.value = '';
                                                }
                                            }}>
                                            Comment
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {cardComments.map(comment => (
                                <div key={comment.id} className='flex'>
                                    <img src={getUserById(comment.user_id)?.avatar} alt={getUserById(comment.user_id)?.name} className='h-10 w-10 rounded-full mr-3' />
                                    <div className='flex-1'>
                                        <div className='bg-gray-50 p-3 rounded-lg'>
                                            <div className='flex justify-between'>
                                                <p className='font-medium'>{getUserById(comment.user_id)?.name}</p>
                                                <p className='text-xs text-gray-500'>{new Date(comment.timestamp || new Date().toISOString()).toLocaleString()}</p>
                                            </div>
                                            <p className='mt-1'>{comment.text}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {cardComments.length === 0 && <p className='text-gray-500 text-sm text-center py-4'>No comments yet</p>}
                        </div>
                    </div>

                    <div>
                        <h3 className='font-medium mb-2 flex items-center'>
                            <svg className='h-5 w-5 mr-1 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                            </svg>
                            Activity
                        </h3>

                        <div className='space-y-3'>
                            {cardActivities
                                .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                                .map(activity => (
                                    <div key={activity.id} className='flex'>
                                        <img src={getUserById(activity.user_id)?.avatar} alt={getUserById(activity.user_id)?.name} className='h-8 w-8 rounded-full mr-3' />
                                        <div className='flex-1'>
                                            <p className='text-sm'>
                                                <span className='font-medium'>{getUserById(activity.user_id)?.name}</span> {activity.message}
                                            </p>
                                            <p className='text-xs text-gray-500 mt-1'>{new Date(activity.timestamp).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}

                            {cardActivities.length === 0 && <p className='text-gray-500 text-sm text-center py-4'>No activity yet</p>}
                        </div>
                    </div>
                </div>

                <div className='w-64 space-y-6'>
                    <div>
                        <h3 className='font-medium mb-2'>Add to card</h3>
                        <div className='space-y-2'>
                            <button
                                className='flex items-center w-full p-2 text-left bg-gray-100 hover:bg-gray-200 rounded'
                                onClick={() => {
                                    const userId = prompt('Enter user ID to add as member');
                                    if (userId) {
                                        toggleCardMember(activeCard.id, parseInt(userId));
                                    }
                                }}>
                                <svg className='h-5 w-5 mr-2 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' />
                                </svg>
                                Members
                            </button>

                            <button
                                className='flex items-center w-full p-2 text-left bg-gray-100 hover:bg-gray-200 rounded'
                                onClick={() => {
                                    const labelId = prompt('Enter label ID to add to card');
                                    if (labelId) {
                                        toggleCardLabel(activeCard.id, parseInt(labelId));
                                    }
                                }}>
                                <svg className='h-5 w-5 mr-2 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' />
                                </svg>
                                Labels
                            </button>

                            <button
                                className='flex items-center w-full p-2 text-left bg-gray-100 hover:bg-gray-200 rounded'
                                onClick={() => {
                                    const hours = prompt('Enter hours spent');
                                    if (hours) {
                                        logTime(activeCard.id, parseInt(hours));
                                    }
                                }}>
                                <svg className='h-5 w-5 mr-2 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                                </svg>
                                Time Tracking
                            </button>

                            <button
                                className='flex items-center w-full p-2 text-left bg-gray-100 hover:bg-gray-200 rounded'
                                onClick={() => {
                                    const file = prompt('Enter file URL');
                                    const filename = prompt('Enter filename');
                                    if (file && filename) {
                                        setAttachments([
                                            ...attachments,
                                            {
                                                id: Math.max(...attachments.map(a => a.id), 0) + 1,
                                                url: file,
                                                filename,
                                                card_id: activeCard.id,
                                            },
                                        ]);
                                    }
                                }}>
                                <svg className='h-5 w-5 mr-2 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13' />
                                </svg>
                                Attachments
                            </button>

                            <button
                                className='flex items-center w-full p-2 text-left bg-gray-100 hover:bg-gray-200 rounded'
                                onClick={() => {
                                    const templateId = prompt('Enter template ID to apply');
                                    if (templateId) {
                                        const template = cardTemplates.find(t => t.id === parseInt(templateId));
                                        if (template) {
                                            updateCard({
                                                ...activeCard,
                                                description: template.description || activeCard.description,
                                                custom_fields: [
                                                    ...(activeCard.custom_fields || []),
                                                    ...template.fields.map(field => ({
                                                        id: Math.random().toString(36).substr(2, 9),
                                                        name: field.name,
                                                        type: field.type,
                                                        value: field.type === 'select' ? field.options?.[0] || '' : '',
                                                    })),
                                                ],
                                            });
                                        }
                                    }
                                }}>
                                <svg className='h-5 w-5 mr-2 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' />
                                </svg>
                                Apply Template
                            </button>
                        </div>
                    </div>

                    <div>
                        <h3 className='font-medium mb-2'>Actions</h3>
                        <div className='space-y-2'>
                            <button
                                className='flex items-center w-full p-2 text-left bg-gray-100 hover:bg-gray-200 rounded'
                                onClick={() => {
                                    const newTitle = prompt('Edit card title', activeCard.title);
                                    if (newTitle !== null) {
                                        updateCard({ ...activeCard, title: newTitle });
                                    }
                                }}>
                                <svg className='h-5 w-5 mr-2 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
                                </svg>
                                Edit
                            </button>

                            <button
                                className='flex items-center w-full p-2 text-left bg-gray-100 hover:bg-gray-200 rounded'
                                onClick={() => {
                                    const newDueDate = prompt('Set due date (YYYY-MM-DD)', activeCard.due_date || '');
                                    if (newDueDate !== null) {
                                        updateCard({ ...activeCard, due_date: newDueDate });
                                    }
                                }}>
                                <svg className='h-5 w-5 mr-2 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                                </svg>
                                Due Date
                            </button>

                            <button
                                className='flex items-center w-full p-2 text-left bg-gray-100 hover:bg-gray-200 rounded'
                                onClick={() => {
                                    const newListId = prompt('Move to list ID', activeCard.list_id);
                                    if (newListId) {
                                        updateCard({ ...activeCard, list_id: parseInt(newListId) });
                                    }
                                }}>
                                <svg className='h-5 w-5 mr-2 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' />
                                </svg>
                                Move
                            </button>

                            <button
                                className='flex items-center w-full p-2 text-left bg-gray-100 hover:bg-gray-200 rounded'
                                onClick={() => {
                                    if (confirm('Move this card to archive?')) {
                                        deleteCard(activeCard.id);
                                        closeModal();
                                    }
                                }}>
                                <svg className='h-5 w-5 mr-2 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                                </svg>
                                Archive
                            </button>
                        </div>
                    </div>

                    <div>
                        <h3 className='font-medium mb-2'>Members</h3>
                        <div className='space-y-2'>
                            {cardMembers.length > 0 ? (
                                cardMembers.map(member => (
                                    <div key={member.user_id} className='flex items-center'>
                                        <img src={getUserById(member.user_id)?.avatar} alt={getUserById(member.user_id)?.name} className='h-8 w-8 rounded-full mr-2' />
                                        <span>{getUserById(member.user_id)?.name}</span>
                                        <button className='ml-auto text-red-500 hover:text-red-700' onClick={() => toggleCardMember(activeCard.id, member.user_id)}>
                                            <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                                            </svg>
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className='text-gray-500 text-sm'>No members yet</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <h3 className='font-medium mb-2'>Labels</h3>
                        <div className='flex flex-wrap gap-2'>
                            {cardLabels.length > 0 ? (
                                cardLabels.map(label => (
                                    <div key={label.id} className='px-2 py-1 text-xs rounded-full flex items-center' style={{ backgroundColor: label.color }}>
                                        {label.title}
                                        <button className='ml-1 text-white hover:text-gray-200' onClick={() => toggleCardLabel(activeCard.id, label.id)}>
                                            <svg className='h-3 w-3' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                                            </svg>
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className='text-gray-500 text-sm'>No labels yet</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <h3 className='font-medium mb-2'>Attachments</h3>
                        <div className='space-y-2'>
                            {cardAttachments.length > 0 ? (
                                cardAttachments.map(attachment => (
                                    <div key={attachment.id} className='flex items-center'>
                                        <a href={attachment.url} target='_blank' rel='noopener noreferrer' className='text-blue-500 hover:underline truncate'>
                                            {attachment.filename}
                                        </a>
                                        <button
                                            className='ml-auto text-red-500 hover:text-red-700'
                                            onClick={() => {
                                                setAttachments(attachments.filter(a => a.id !== attachment.id));
                                            }}>
                                            <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                                            </svg>
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className='text-gray-500 text-sm'>No attachments yet</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <h3 className='font-medium mb-2'>Time Tracking</h3>
                        <div className='space-y-2'>
                            <div>
                                <p className='text-sm'>Estimated: {activeCard.estimate_time}h</p>
                                <p className='text-sm'>Spent: {activeCard.time_spent}h</p>
                                <p className='text-sm'>Remaining: {activeCard.time_remaining}h</p>
                            </div>
                            <div className='h-2 bg-gray-200 rounded-full overflow-hidden'>
                                <div
                                    className='h-full bg-green-500'
                                    style={{
                                        width: `${activeCard.estimate_time > 0 ? Math.min(100, (activeCard.time_spent / activeCard.estimate_time) * 100) : 0}%`,
                                    }}></div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className='font-medium mb-2'>Automation</h3>
                        <div className='space-y-2'>
                            {automationRules.map(rule => (
                                <div key={rule.id} className='p-2 bg-gray-50 rounded'>
                                    <div className='flex items-center justify-between'>
                                        <span className='text-sm font-medium'>{rule.name}</span>
                                        <label className='relative inline-flex items-center cursor-pointer'>
                                            <input
                                                type='checkbox'
                                                checked={rule.enabled}
                                                onChange={() => {
                                                    setAutomationRules(automationRules.map(r => (r.id === rule.id ? { ...r, enabled: !r.enabled } : r)));
                                                }}
                                                className='sr-only peer'
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                                        </label>
                                    </div>
                                    <p className='text-xs text-gray-500 mt-1'>When: {rule.trigger.type === 'status_change' ? `status changes to ${rule.trigger.to}` : rule.trigger.type === 'move' ? `moved to list ${rule.trigger.to_list}` : rule.trigger.type === 'due_date' ? `${rule.trigger.days_before} days before due date` : ''}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
