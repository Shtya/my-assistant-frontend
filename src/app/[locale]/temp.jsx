'use client';
import { useRouter } from '@/i18n/navigation';
import { useState, useEffect, useRef } from 'react';

export default function KanbanBoard() {
    const router = useRouter();
    const [activeCard, setActiveCard] = useState(null);
    const [activeModal, setActiveModal] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState({
        members: [],
        labels: [],
        types: [],
        statuses: [],
    });

    // Sample data - replace with real data from your backend
    const [currentUser, setCurrentUser] = useState({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        avatar: '/test-images/1.jpg',
    });

    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', avatar: '/test-images/1.jpg' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: '/test-images/2.jpg' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', avatar: '/test-images/3.jpg' },
    ]);

    const [boards, setBoards] = useState([
        { id: 1, title: 'Product Roadmap', visibility: 'public', created_by: 1 },
        { id: 2, title: 'Development', visibility: 'team', created_by: 1 },
        { id: 3, title: 'Marketing', visibility: 'private', created_by: 2 },
    ]);

    const [boardMembers, setBoardMembers] = useState([
        { board_id: 1, user_id: 1, role: 'admin' },
        { board_id: 1, user_id: 2, role: 'member' },
        { board_id: 2, user_id: 1, role: 'admin' },
        { board_id: 3, user_id: 2, role: 'admin' },
    ]);

    const [lists, setLists] = useState([
        { id: 1, title: 'To Do', board_id: 1, position: 1 },
        { id: 2, title: 'In Progress', board_id: 1, position: 2 },
        { id: 3, title: 'Done', board_id: 1, position: 3 },
        { id: 4, title: 'Backlog', board_id: 2, position: 1 },
        { id: 5, title: 'Sprint', board_id: 2, position: 2 },
    ]);

    const [cards, setCards] = useState([
        {
            id: 1,
            title: 'Implement authentication',
            description: 'Set up JWT authentication for the API',
            list_id: 1,
            due_date: '2023-06-30',
            position: 1,
            issue_type: 'task',
            status: 'open',
            estimate_time: 8,
            time_spent: 2,
            time_remaining: 6,
        },
        {
            id: 2,
            title: 'Fix login bug',
            description: 'Users cannot login on mobile devices',
            list_id: 2,
            due_date: '2023-06-25',
            position: 1,
            issue_type: 'bug',
            status: 'in-progress',
            estimate_time: 4,
            time_spent: 3,
            time_remaining: 1,
        },
        {
            id: 3,
            title: 'Design dashboard UI',
            description: 'Create mockups for the admin dashboard',
            list_id: 3,
            due_date: '2023-06-20',
            position: 1,
            issue_type: 'story',
            status: 'done',
            estimate_time: 12,
            time_spent: 10,
            time_remaining: 0,
        },
    ]);

    const [cardMembers, setCardMembers] = useState([
        { card_id: 1, user_id: 1 },
        { card_id: 1, user_id: 2 },
        { card_id: 2, user_id: 1 },
        { card_id: 3, user_id: 3 },
    ]);

    const [labels, setLabels] = useState([
        { id: 1, title: 'Frontend', color: 'blue', board_id: 1 },
        { id: 2, title: 'Backend', color: 'green', board_id: 1 },
        { id: 3, title: 'Bug', color: 'red', board_id: 1 },
        { id: 4, title: 'Feature', color: 'purple', board_id: 1 },
    ]);

    const [cardLabels, setCardLabels] = useState([
        { card_id: 1, label_id: 2 },
        { card_id: 2, label_id: 3 },
        { card_id: 3, label_id: 1 },
    ]);

    const [attachments, setAttachments] = useState([
        { id: 1, url: '/attachments/1.pdf', filename: 'spec.pdf', card_id: 1 },
        { id: 2, url: '/attachments/2.png', filename: 'design.png', card_id: 3 },
    ]);

    const [comments, setComments] = useState([
        { id: 1, text: 'Please review the API spec first', card_id: 1, user_id: 2 },
        { id: 2, text: 'Working on this now', card_id: 1, user_id: 1 },
        { id: 3, text: 'Looks good!', card_id: 3, user_id: 2 },
    ]);

    const [checklists, setChecklists] = useState([
        { id: 1, title: 'Authentication Steps', card_id: 1 },
        { id: 2, title: 'UI Requirements', card_id: 3 },
    ]);

    const [checklistItems, setChecklistItems] = useState([
        { id: 1, content: 'Set up JWT', is_done: true, checklist_id: 1 },
        { id: 2, content: 'Create login endpoint', is_done: false, checklist_id: 1 },
        { id: 3, content: 'Design login form', is_done: true, checklist_id: 2 },
        { id: 4, content: 'Create dashboard layout', is_done: true, checklist_id: 2 },
    ]);

    const [activities, setActivities] = useState([
        { id: 1, card_id: 1, user_id: 1, type: 'create', message: 'created this card', timestamp: '2023-06-10T10:00:00Z' },
        { id: 2, card_id: 1, user_id: 2, type: 'comment', message: 'commented on this card', timestamp: '2023-06-10T11:30:00Z' },
        { id: 3, card_id: 2, user_id: 1, type: 'move', message: 'moved this card to In Progress', timestamp: '2023-06-11T09:15:00Z' },
    ]);

    const [notificationsData, setNotificationsData] = useState([
        { id: 1, user_id: 1, card_id: 1, message: 'You were mentioned in a comment', read: false, timestamp: '2023-06-10T11:30:00Z' },
        { id: 2, user_id: 1, card_id: 2, message: 'Your card is due soon', read: false, timestamp: '2023-06-11T09:15:00Z' },
    ]);

    // Refs for drag and drop
    const dragItem = useRef();
    const dragOverItem = useRef();

    // Filtered data based on search and filters
    const filteredCards = cards.filter(card => {
        const matchesSearch = card.title.toLowerCase().includes(searchQuery.toLowerCase()) || card.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesMembers = filter.members.length === 0 || cardMembers.some(cm => cm.card_id === card.id && filter.members.includes(cm.user_id));

        const matchesLabels = filter.labels.length === 0 || cardLabels.some(cl => cl.card_id === card.id && filter.labels.includes(cl.label_id));

        const matchesTypes = filter.types.length === 0 || filter.types.includes(card.issue_type);
        const matchesStatuses = filter.statuses.length === 0 || filter.statuses.includes(card.status);

        return matchesSearch && matchesMembers && matchesLabels && matchesTypes && matchesStatuses;
    });

    // Board data for the current view
    const currentBoardId = 1; // In a real app, this would come from the router
    const boardLists = lists.filter(list => list.board_id === currentBoardId).sort((a, b) => a.position - b.position);
    const boardLabels = labels.filter(label => label.board_id === currentBoardId);

    // Helper functions
    const getUserById = id => users.find(user => user.id === id);
    const getCardMembers = cardId => {
        const memberIds = cardMembers.filter(cm => cm.card_id === cardId).map(cm => cm.user_id);
        return users.filter(user => memberIds.includes(user.id));
    };
    const getCardLabels = cardId => {
        const labelIds = cardLabels.filter(cl => cl.card_id === cardId).map(cl => cl.label_id);
        return labels.filter(label => labelIds.includes(label.id));
    };
    const getCardAttachments = cardId => attachments.filter(att => att.card_id === cardId);
    const getCardComments = cardId => comments.filter(comment => comment.card_id === cardId);
    const getCardChecklists = cardId => checklists.filter(checklist => checklist.card_id === cardId);
    const getChecklistItems = checklistId => checklistItems.filter(item => item.checklist_id === checklistId);
    const getCardActivities = cardId => activities.filter(activity => activity.card_id === cardId);

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

                // In a real app, you would call an API to update the card position
                // updateCardPosition(cardId, targetListId, targetIndex + 1)
            }
        }

        dragItem.current = null;
        dragOverItem.current = null;
    };

    // Card CRUD operations
    const createCard = (listId, title) => {
        const newCard = {
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
        };

        setCards([...cards, newCard]);

        // Log activity
        const newActivity = {
            id: Math.max(...activities.map(a => a.id), 0) + 1,
            card_id: newCard.id,
            user_id: currentUser.id,
            type: 'create',
            message: 'created this card',
            timestamp: new Date().toISOString(),
        };

        setActivities([...activities, newActivity]);

        // In a real app, you would call an API to create the card
        // createCardAPI(newCard).then(response => {...})
    };

    const updateCard = updatedCard => {
        setCards(cards.map(card => (card.id === updatedCard.id ? updatedCard : card)));

        // In a real app, you would call an API to update the card
        // updateCardAPI(updatedCard).then(response => {...})
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

        // In a real app, you would call an API to delete the card
        // deleteCardAPI(cardId).then(response => {...})
    };

    // Comment operations
    const addComment = (cardId, text) => {
        const newComment = {
            id: Math.max(...comments.map(c => c.id), 0) + 1,
            text,
            card_id: cardId,
            user_id: currentUser.id,
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

        // In a real app, you would call an API to add the comment
        // addCommentAPI(newComment).then(response => {...})
    };

    // Checklist operations
    const addChecklist = (cardId, title) => {
        const newChecklist = {
            id: Math.max(...checklists.map(c => c.id), 0) + 1,
            title,
            card_id: cardId,
        };

        setChecklists([...checklists, newChecklist]);

        // In a real app, you would call an API to add the checklist
        // addChecklistAPI(newChecklist).then(response => {...})
    };

    const toggleChecklistItem = itemId => {
        setChecklistItems(checklistItems.map(item => (item.id === itemId ? { ...item, is_done: !item.is_done } : item)));

        // In a real app, you would call an API to update the checklist item
        // updateChecklistItemAPI(itemId, { is_done: !item.is_done }).then(response => {...})
    };

    // Label operations
    const toggleCardLabel = (cardId, labelId) => {
        const existing = cardLabels.find(cl => cl.card_id === cardId && cl.label_id === labelId);

        if (existing) {
            setCardLabels(cardLabels.filter(cl => !(cl.card_id === cardId && cl.label_id === labelId)));
        } else {
            setCardLabels([...cardLabels, { card_id: cardId, label_id: labelId }]);
        }

        // In a real app, you would call an API to update the card labels
        // updateCardLabelsAPI(cardId, labelId, !existing).then(response => {...})
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
            message: existing ? `removed ${getUserById(userId).name} from this card` : `added ${getUserById(userId).name} to this card`,
            timestamp: new Date().toISOString(),
        };

        setActivities([...activities, newActivity]);

        // In a real app, you would call an API to update the card members
        // updateCardMembersAPI(cardId, userId, !existing).then(response => {...})
    };

    // Notification operations
    const markNotificationAsRead = notificationId => {
        setNotificationsData(notificationsData.map(notification => (notification.id === notificationId ? { ...notification, read: true } : notification)));

        // In a real app, you would call an API to update the notification
        // updateNotificationAPI(notificationId, { read: true }).then(response => {...})
    };

    // Time tracking operations
    const logTime = (cardId, timeSpent) => {
        const card = cards.find(c => c.id === cardId);
        if (card) {
            const updatedCard = {
                ...card,
                time_spent: card.time_spent + timeSpent,
                time_remaining: Math.max(0, card.time_remaining - timeSpent),
            };

            setCards(cards.map(c => (c.id === cardId ? updatedCard : c)));

            // Log activity
            const newActivity = {
                id: Math.max(...activities.map(a => a.id), 0) + 1,
                card_id: cardId,
                user_id: currentUser.id,
                type: 'time',
                message: `logged ${timeSpent}h on this card`,
                timestamp: new Date().toISOString(),
            };

            setActivities([...activities, newActivity]);

            // In a real app, you would call an API to update the time tracking
            // logTimeAPI(cardId, timeSpent).then(response => {...})
        }
    };

    // Modal handlers
    const openCardModal = card => {
        setActiveCard(card);
        setActiveModal('card-details');
    };

    const closeModal = () => {
        setActiveCard(null);
        setActiveModal(null);
    };

    // Render functions for different parts of the UI
    const renderBoardHeader = () => (
        <div className='flex items-center justify-between p-4 bg-white border-b'>
            <div className='flex items-center'>
                <h1 className='text-2xl font-bold'>Product Roadmap</h1>
                <span className='ml-2 px-2 py-1 text-xs bg-gray-100 rounded'>Team</span>
            </div>

            <div className='flex items-center space-x-4'>
                <div className='relative'>
                    <input type='text' placeholder='Search cards...' className='pl-8 pr-4 py-2 border rounded-lg w-64' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                    <svg className='absolute left-3 top-2.5 h-4 w-4 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                    </svg>
                </div>

                <button className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600' onClick={() => setActiveModal('filters')}>
                    Filters
                </button>

                <div className='relative'>
                    <button className='p-2 rounded-full hover:bg-gray-100 relative' onClick={() => setActiveModal(activeModal === 'notifications' ? null : 'notifications')}>
                        <svg className='h-6 w-6 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' />
                        </svg>
                        {notificationsData.filter(n => !n.read && n.user_id === currentUser.id).length > 0 && <span className='absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500'></span>}
                    </button>
                </div>

                <div className='flex items-center'>
                    <img src={currentUser.avatar} alt={currentUser.name} className='h-8 w-8 rounded-full' />
                    <span className='ml-2'>{currentUser.name}</span>
                </div>
            </div>
        </div>
    );

    const renderFiltersModal = () => (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white rounded-lg p-6 w-96'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-xl font-bold'>Filters</h2>
                    <button onClick={closeModal} className='text-gray-500 hover:text-gray-700'>
                        <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                        </svg>
                    </button>
                </div>

                <div className='space-y-4'>
                    <div>
                        <h3 className='font-medium mb-2'>Members</h3>
                        <div className='space-y-2'>
                            {users.map(user => (
                                <label key={user.id} className='flex items-center'>
                                    <input
                                        type='checkbox'
                                        checked={filter.members.includes(user.id)}
                                        onChange={() => {
                                            if (filter.members.includes(user.id)) {
                                                setFilter({
                                                    ...filter,
                                                    members: filter.members.filter(id => id !== user.id),
                                                });
                                            } else {
                                                setFilter({
                                                    ...filter,
                                                    members: [...filter.members, user.id],
                                                });
                                            }
                                        }}
                                        className='mr-2'
                                    />
                                    <div className='flex items-center'>
                                        <img src={user.avatar} alt={user.name} className='h-6 w-6 rounded-full mr-2' />
                                        <span>{user.name}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className='font-medium mb-2'>Labels</h3>
                        <div className='flex flex-wrap gap-2'>
                            {boardLabels.map(label => (
                                <button
                                    key={label.id}
                                    onClick={() => {
                                        if (filter.labels.includes(label.id)) {
                                            setFilter({
                                                ...filter,
                                                labels: filter.labels.filter(id => id !== label.id),
                                            });
                                        } else {
                                            setFilter({
                                                ...filter,
                                                labels: [...filter.labels, label.id],
                                            });
                                        }
                                    }}
                                    className={`px-2 py-1 text-xs rounded-full ${filter.labels.includes(label.id) ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                                    style={{ backgroundColor: label.color }}>
                                    {label.title}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className='font-medium mb-2'>Issue Types</h3>
                        <div className='flex flex-wrap gap-2'>
                            {['task', 'bug', 'story', 'epic'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => {
                                        if (filter.types.includes(type)) {
                                            setFilter({
                                                ...filter,
                                                types: filter.types.filter(t => t !== type),
                                            });
                                        } else {
                                            setFilter({
                                                ...filter,
                                                types: [...filter.types, type],
                                            });
                                        }
                                    }}
                                    className={`px-3 py-1 text-sm rounded ${filter.types.includes(type) ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className='font-medium mb-2'>Status</h3>
                        <div className='flex flex-wrap gap-2'>
                            {['open', 'in-progress', 'done', 'blocked'].map(status => (
                                <button
                                    key={status}
                                    onClick={() => {
                                        if (filter.statuses.includes(status)) {
                                            setFilter({
                                                ...filter,
                                                statuses: filter.statuses.filter(s => s !== status),
                                            });
                                        } else {
                                            setFilter({
                                                ...filter,
                                                statuses: [...filter.statuses, status],
                                            });
                                        }
                                    }}
                                    className={`px-3 py-1 text-sm rounded ${filter.statuses.includes(status) ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800'}`}>
                                    {status
                                        .split('-')
                                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                        .join(' ')}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='mt-6 flex justify-end'>
                    <button
                        onClick={() =>
                            setFilter({
                                members: [],
                                labels: [],
                                types: [],
                                statuses: [],
                            })
                        }
                        className='px-4 py-2 text-gray-700 mr-2'>
                        Clear All
                    </button>
                    <button onClick={closeModal} className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
                        Apply Filters
                    </button>
                </div>
            </div>
        </div>
    );

    const renderNotificationsModal = () => (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <div className='bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-xl font-bold'>Notifications</h2>
                    <button onClick={closeModal} className='text-gray-500 hover:text-gray-700'>
                        <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                        </svg>
                    </button>
                </div>

                {notificationsData
                    .filter(n => n.user_id === currentUser.id)
                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                    .map(notification => (
                        <div
                            key={notification.id}
                            className={`p-3 border-b ${!notification.read ? 'bg-blue-50' : ''}`}
                            onClick={() => {
                                markNotificationAsRead(notification.id);
                                const card = cards.find(c => c.id === notification.card_id);
                                if (card) {
                                    setActiveCard(card);
                                    setActiveModal('card-details');
                                }
                            }}>
                            <div className='flex justify-between'>
                                <p className={!notification.read ? 'font-medium' : ''}>{notification.message}</p>
                                {!notification.read && <span className='h-2 w-2 rounded-full bg-blue-500'></span>}
                            </div>
                            <p className='text-xs text-gray-500 mt-1'>{new Date(notification.timestamp).toLocaleString()}</p>
                        </div>
                    ))}

                {notificationsData.filter(n => n.user_id === currentUser.id).length === 0 && <p className='text-gray-500 text-center py-4'>No notifications</p>}
            </div>
        </div>
    );

    const renderCardDetailsModal = () => {
        if (!activeCard) return null;

        const cardMembers = getCardMembers(activeCard.id);
        const cardLabels = getCardLabels(activeCard.id);
        const cardAttachments = getCardAttachments(activeCard.id);
        const cardComments = getCardComments(activeCard.id);
        const cardChecklists = getCardChecklists(activeCard.id);
        const cardActivities = getCardActivities(activeCard.id);

        return (
            <div className='fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 pt-10 pb-10 overflow-y-auto'>
                <div className='bg-white rounded-lg p-6 w-11/12 max-w-4xl'>
                    <div className='flex justify-between items-start mb-4'>
                        <div>
                            <h2 className='text-xl font-bold'>{activeCard.title}</h2>
                            <p className='text-sm text-gray-500'>
                                In list <span className='font-medium'>{lists.find(l => l.id === activeCard.list_id)?.title}</span>
                            </p>
                        </div>
                        <button onClick={closeModal} className='text-gray-500 hover:text-gray-700'>
                            <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                            </svg>
                        </button>
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
                                                        <input type='checkbox' checked={item.is_done} onChange={() => toggleChecklistItem(item.id)} className='mr-2' />
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
                                        <div className='h-full bg-green-500' style={{ width: `${(activeCard.time_spent / activeCard.estimate_time) * 100}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderList = list => {
        const listCards = filteredCards.filter(card => card.list_id === list.id).sort((a, b) => a.position - b.position);

        return (
            <div
                key={list.id}
                className='flex-1 bg-gray-100 rounded-lg p-3 min-w-[280px]'
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
                <div className='flex justify-between items-center mb-3'>
                    <h3 className='font-medium'>{list.title}</h3>
                    <span className='text-sm text-gray-500'>{listCards.length}</span>
                </div>

                <div className='space-y-3'>
                    {listCards.map((card, index) => (
                        <div
                            key={card.id}
                            className='bg-white rounded-lg p-3 shadow hover:shadow-md cursor-pointer'
                            draggable
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

                            <h4 className='font-medium'>{card.title}</h4>

                            <div className='flex items-center justify-between mt-3'>
                                <div className='flex items-center space-x-2'>
                                    {card.due_date && (
                                        <div className={`flex items-center text-xs ${new Date(card.due_date) < new Date() && card.status !== 'done' ? 'text-red-500' : 'text-gray-500'}`}>
                                            <svg className='h-3 w-3 mr-1' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                                            </svg>
                                            {new Date(card.due_date).toLocaleDateString()}
                                        </div>
                                    )}

                                    {card.issue_type && (
                                        <span
                                            className={`text-xs px-1 rounded ${
                                                {
                                                    task: 'bg-blue-100 text-blue-800',
                                                    bug: 'bg-red-100 text-red-800',
                                                    story: 'bg-green-100 text-green-800',
                                                    epic: 'bg-purple-100 text-purple-800',
                                                }[card.issue_type]
                                            }`}>
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
                                                    <img key={member.id} src={member.avatar} alt={member.name} className='h-6 w-6 rounded-full border-2 border-white' />
                                                ))}
                                            {getCardMembers(card.id).length > 3 && <span className='h-6 w-6 rounded-full bg-gray-200 border-2 border-white text-xs flex items-center justify-center'>+{getCardMembers(card.id).length - 3}</span>}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {(card.time_spent > 0 || card.estimate_time > 0) && (
                                <div className='mt-2'>
                                    <div className='h-1 bg-gray-200 rounded-full overflow-hidden'>
                                        <div className='h-full bg-blue-500' style={{ width: `${(card.time_spent / card.estimate_time) * 100}%` }}></div>
                                    </div>
                                    <div className='flex justify-between text-xs text-gray-500 mt-1'>
                                        <span>{card.time_spent}h logged</span>
                                        <span>{card.estimate_time}h estimated</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <button
                    className='w-full mt-3 p-2 text-gray-500 hover:bg-gray-200 rounded-lg text-left flex items-center'
                    onClick={() => {
                        const title = prompt('Enter card title');
                        if (title) {
                            createCard(list.id, title);
                        }
                    }}>
                    <svg className='h-5 w-5 mr-1' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                    </svg>
                    Add a card
                </button>
            </div>
        );
    };

    return (
        <div className='min-h-screen bg-gray-50'>
            {renderBoardHeader()}

            <div className='p-4 overflow-x-auto'>
                <div className='flex space-x-4'>
                    {boardLists.map(list => renderList(list))}

                    <button
                        className='flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg p-3 min-w-[280px] h-fit'
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
                        <svg className='h-5 w-5 mr-1' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6v6m0 0v6m0-6h6m-6 0H6' />
                        </svg>
                        Add another list
                    </button>
                </div>
            </div>

            {/* Modals */}
            {activeModal === 'filters' && renderFiltersModal()}
            {activeModal === 'notifications' && renderNotificationsModal()}
            {activeModal === 'card-details' && renderCardDetailsModal()}
        </div>
    );
}

