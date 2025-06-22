import { useValues } from '@/context/Context';
import React from 'react';
import InfoTooltip from '../atoms/InfoTooltip';
import Button from '../atoms/Button';
import { LayoutTemplate, Plus } from 'lucide-react';

export default function List({ list }) {
    const { checkAutomationRules, updateCard, closeModal, getUserById, getCardMembers, getCardLabels, getCardAttachments, getCardComments, getCardChecklists, getChecklistItems, getCardActivities, getBoardMembers, filteredCards, currentBoard, boardLists, boardLabels, boardCustomFields, userBoards, dragItem, dragOverItem, activeCard, setActiveCard, activeModal, setActiveModal, notifications, setNotifications, searchQuery, setSearchQuery, currentBoardId, setCurrentBoardId, showBoardSelector, setShowBoardSelector, inviteEmail, setInviteEmail, focusMode, setFocusMode, focusedUserId, setFocusedUserId, filter, setFilter, users, setUsers, currentUser, setCurrentUser, boards, setBoards, boardMembers, setBoardMembers, lists, setLists, cards, setCards, cardMembers, setCardMembers, labels, setLabels, cardLabels, setCardLabels, attachments, setAttachments, comments, setComments, checklists, setChecklists, checklistItems, setChecklistItems, activities, setActivities, notificationsData, setNotificationsData, aiQuery, setAiQuery, aiResponse, setAiResponse, isAiProcessing, setIsAiProcessing, riskItems, setRiskItems, predictions, setPredictions, automationRules, setAutomationRules, cardTemplates, setCardTemplates, customFieldDefinitions, setCustomFieldDefinitions, collapsed, setCollapsed } = useValues();
    const listCards = filteredCards.filter(card => card.list_id === list.id).sort((a, b) => a.position - b.position);

    // Modal handlers
    const openCardModal = card => {
        setActiveCard(card);
        setActiveModal('card-details');
    };

    // Drag and drop functions
    const dragStart = (e, position) => {
        dragItem.current = position;
    };

    const dragEnter = (e, position) => {
        dragOverItem.current = position;
    };

    const drop = (e, targetListId) => {
        const sourceIndex = dragItem.current;
        const targetIndex = dragOverItem.current;

        if (sourceIndex !== undefined && targetIndex !== undefined) {
            const cardId = filteredCards[sourceIndex].id;
            const updatedCards = [...cards];
            const cardIndex = updatedCards.findIndex(c => c.id === cardId);

            if (cardIndex !== -1) {
                updatedCards[cardIndex] = {
                    ...updatedCards[cardIndex],
                    list_id: targetListId,
                    position: targetIndex + 1,
                };

                // Reorder other cards in the target list
                updatedCards
                    .filter(c => c.list_id === targetListId && c.id !== cardId)
                    .forEach((c, idx) => {
                        if (idx >= targetIndex) {
                            c.position = idx + 2;
                        } else {
                            c.position = idx + 1;
                        }
                    });

                setCards(updatedCards);

                // Log activity
                const fromList = lists.find(l => l.id === cards[cardIndex].list_id);
                const toList = lists.find(l => l.id === targetListId);
                const newActivity = {
                    id: Math.max(...activities.map(a => a.id), 0) + 1,
                    card_id: cardId,
                    user_id: currentUser.id,
                    type: 'move',
                    message: `moved this card from ${fromList?.title || 'unknown'} to ${toList?.title || 'unknown'}`,
                    timestamp: new Date().toISOString(),
                };
                setActivities([...activities, newActivity]);

                // Check automation rules
                checkAutomationRules(cardId, 'move', { from: cards[cardIndex].list_id, to: targetListId });
            }
        }

        dragItem.current = null;
        dragOverItem.current = null;
    };

    // Card CRUD operations
    const createCard = (listId, title, templateId = null) => {
        let newCard = {
            id: Math.max(...cards.map(c => c.id), 0) + 1,
            title,
            description: '',
            list_id: listId,
            due_date: null,
            position: cards.filter(c => c.list_id === listId).length + 1,
            issue_type: 'task',
            status: 'open',
            estimate_time: 0,
            time_spent: 0,
            time_remaining: 0,
            custom_fields: [],
        };

        // Apply template if specified
        if (templateId) {
            const template = cardTemplates.find(t => t.id === templateId);
            if (template) {
                newCard = {
                    ...newCard,
                    description: template.description || '',
                    custom_fields: template.fields.map(field => ({
                        id: Math.random().toString(36).substr(2, 9),
                        name: field.name,
                        type: field.type,
                        value: field.type === 'select' ? field.options?.[0] || '' : '',
                    })),
                };
            }
        }

        setCards([...cards, newCard]);

        // Log activity
        const newActivity = {
            id: Math.max(...activities.map(a => a.id), 0) + 1,
            card_id: newCard.id,
            user_id: currentUser.id,
            type: 'create',
            message: 'created this card' + (templateId ? ' from template' : ''),
            timestamp: new Date().toISOString(),
        };

        setActivities([...activities, newActivity]);

        return newCard;
    };

    return (
        <div
            key={list.id}
            className='flex-1  card  !p-3 min-w-[280px]'
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
                e.preventDefault();
                const cardId = e.dataTransfer.getData('cardId');
                if (cardId) {
                    const card = cards.find(c => c.id === parseInt(cardId));
                    if (card && card.list_id !== list.id) {
                        updateCard({ ...card, list_id: list.id });
                    }
                }
            }}>
            <div className='flex w-full justify-between items-center mb-3'>
                <h3 className='font-medium text-text-base'>{list.title}</h3>
                <span className='inline-flex items-center justify-center  w-5 h-5 text-[10px] font-medium rounded-full bg-blue-100 text-blue-700'> {listCards.length} </span>
            </div>

            <div className='space-y-3 w-full '>
                {listCards.map((card, index) => (
                    <div
                        key={card.id}
                        className={`border border-border/50 bg-background-subtle duration-300 shadow-inner rounded-lg p-3 hover:bg-background-muted hover:scale-[1.01] cursor-pointer   ${focusMode ? 'border-1 bg-primary/10 !border-primary/40 ' : ''}`}
                        draggable
                        style={{ transition: '.5s' }}
                        onDragStart={e => {
                            e.dataTransfer.setData('cardId', card.id);
                            dragStart(e, index);
                        }}
                        onDragEnter={e => dragEnter(e, index)}
                        onDragOver={e => e.preventDefault()}
                        onDrop={e => drop(e, list.id)}
                        onClick={() => openCardModal(card)}>
                        {getCardLabels(card.id).length > 0 && (
                            <div className='flex flex-wrap gap-1 mb-2'>
                                {getCardLabels(card.id).map(label => (
                                    <span key={label.id} className='h-2 w-8 rounded-full' style={{ backgroundColor: label.color }}></span>
                                ))}
                            </div>
                        )}

                        <h4 className='font-medium text-gray-900 text-left text-sm '>{card.title} </h4>

                        <div className='flex items-center justify-between mt-3'>
                            <div className='flex items-center space-x-2'>
                                {card.due_date && (
                                    <div className={` text-[10px] flex items-center justify-center  ${new Date(card.due_date) < new Date() && card.status !== 'done' ? 'text-red-500' : 'text-gray-500'}`}>
                                        <svg className='h-3 w-3  mb-[2px] rtl:ml-1 ltr:mr-1' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                                        </svg>
                                        {new Date(card.due_date).toLocaleDateString()}
                                    </div>
                                )}

                                {card.issue_type && (
                                    <span
                                        className={`inline-block text-[10px] font-medium px-2 py-[2px] rounded-md  capitalize shadow-inner
                                            ${
                                                {
                                                    task: 'bg-blue-100 text-blue-800',
                                                    bug: 'bg-red-100 text-red-800',
                                                    story: 'bg-green-100 text-green-800',
                                                    epic: 'bg-purple-100 text-purple-800',
                                                }[card.issue_type]
                                            }
                                            `}>
                                        {card.issue_type}
                                    </span>
                                )}
                            </div>

                            <div className='flex items-center'>
                                {getCardMembers(card.id).length > 0 && (
                                    <div className='flex -space-x-1'>
                                        {getCardMembers(card.id)
                                            .slice(0, 3)
                                            .map(member => (
                                                <img key={member.id} src={member.avatar} alt={member.name} className='h-5 w-5 rounded-full border-[1.5px] border-white' />
                                            ))}
                                        {getCardMembers(card.id).length > 3 && <span className='h-5 w-5 rounded-full bg-primary border-2 border-white text-[10px] text-white flex items-center justify-center'>+{getCardMembers(card.id).length - 3}</span>}
                                    </div>
                                )}
                            </div>
                        </div>

                        {(card.time_spent > 0 || card.estimate_time > 0) && (
                            <div className='mt-2 space-y-1 '>
                                {/* Progress Bar */}
                                <div className='h-[5px] w-full bg-neutral-200 rounded-full overflow-hidden shadow-sm'>
                                    <div
                                        className={`h-full rounded-full transition-all duration-300 ease-in-out ${card.time_spent / card.estimate_time > 1 ? 'bg-red-500' : 'bg-blue-500'}`}
                                        style={{
                                            width: `${card.estimate_time > 0 ? Math.min(100, (card.time_spent / card.estimate_time) * 100) : 0}%`,
                                        }}></div>
                                </div>

                                {/* Time Info */}
                                <div className='flex justify-between text-[8px] text-gray-600 font-medium'>
                                    <span>{card.time_spent}h logged</span>
                                    <span>{card.estimate_time}h estimated</span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className='mt-4 flex items-center gap-2  w-full'>
                {/* Add Card Button */}
                <Button
                    onClick={() => {
                        const title = prompt('Enter card title');
                        if (title) {
                            createCard(list.id, title);
                        }
                    }}
                    label='Add a card'
                    cn=' !bg-transparent w-full flex items-center text-sm  justify-start text-left  '
                    Icon={<img src='/add-icon.png' className='w-5 h-5 mt-[2px] ' />}
                    color='neutral'
                />

                {/* Add from Template Button */}
                <Button
                    onClick={() => {
                        const templateId = prompt('Enter template ID');
                        if (templateId) {
                            const title = prompt('Enter card title');
                            if (title) {
                                createCard(list.id, title, parseInt(templateId));
                            }
                        }
                    }}
                    cn='!bg-transparent  w-fit flex items-center text-sm  justify-start text-left '
                    Icon={<LayoutTemplate size={18} />}
                    color='neutral'
                    infoTooltip={<InfoTooltip msg={'This creates a new card from a saved template.'} />}
                />
            </div>
        </div>
    );
}
