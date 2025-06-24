'use client';
import { createContext, useEffect, useContext, useState, useRef } from 'react';
const GlobalContext = createContext();

// Provider Component
export const GlobalProvider = ({ children }) => {
    const [collapsed, setCollapsed] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreen = () => {
            setIsMobile(window.innerWidth < 700);
        };

        checkScreen();
        window.addEventListener('resize', checkScreen);
        return () => window.removeEventListener('resize', checkScreen);
    }, []);

    const [activeCard, setActiveCard] = useState(null);
    const [activeModal, setActiveModal] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentBoardId, setCurrentBoardId] = useState(null); // Track current board
    const [showBoardSelector, setShowBoardSelector] = useState(false); // For mobile view
    const [inviteEmail, setInviteEmail] = useState(''); // For inviting users
    const [focusMode, setFocusMode] = useState(false);
    const [focusedUserId, setFocusedUserId] = useState(null);
    const [filter, setFilter] = useState({ members: [], labels: [], types: [], statuses: [] });

    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', avatar: '/test-images/1.jpg' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: '/test-images/2.jpg' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', avatar: '/test-images/3.jpg' },
    ]);
    const [currentUser, setCurrentUser] = useState(users[0]);

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
            custom_fields: [
                { id: 1, name: 'Priority', type: 'select', value: 'High' },
                { id: 2, name: 'Client', type: 'text', value: 'Acme Corp' },
            ],
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
            custom_fields: [
                { id: 1, name: 'Priority', type: 'select', value: 'Critical' },
                { id: 2, name: 'Client', type: 'text', value: 'Beta LLC' },
            ],
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
            custom_fields: [
                { id: 1, name: 'Priority', type: 'select', value: 'Medium' },
                { id: 2, name: 'Client', type: 'text', value: 'Acme Corp' },
            ],
        },
        {
            id: 4,
            title: 'API Documentation',
            description: 'Document all API endpoints',
            list_id: 4,
            due_date: '2023-07-10',
            position: 1,
            issue_type: 'task',
            status: 'open',
            estimate_time: 6,
            time_spent: 0,
            time_remaining: 6,
            custom_fields: [
                { id: 1, name: 'Priority', type: 'select', value: 'Low' },
                { id: 2, name: 'Client', type: 'text', value: 'Gamma Inc' },
            ],
        },
    ]);

    const [cardMembers, setCardMembers] = useState([
        { card_id: 1, user_id: 1 },
        { card_id: 1, user_id: 2 },
        { card_id: 2, user_id: 1 },
        { card_id: 3, user_id: 3 },
    ]);

    const [labels, setLabels] = useState([
        { id: 1, title: 'Frontend', color: 'yellow', board_id: 1 },
        { id: 2, title: 'Backend', color: 'green', board_id: 1 },
        { id: 3, title: 'Bug', color: 'red', board_id: 1 },
        { id: 4, title: 'Feature', color: 'purple', board_id: 1 },
        { id: 5, title: 'Documentation', color: 'orange', board_id: 2 },
    ]);

    const [cardLabels, setCardLabels] = useState([
        { card_id: 1, label_id: 2 },
        { card_id: 2, label_id: 3 },
        { card_id: 3, label_id: 1 },
        { card_id: 4, label_id: 5 },
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

    // AI Assistant State
    const [aiQuery, setAiQuery] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [isAiProcessing, setIsAiProcessing] = useState(false);
    const [riskItems, setRiskItems] = useState([]);
    const [predictions, setPredictions] = useState([]);

    // Automation Rules
    const [automationRules, setAutomationRules] = useState([
        {
            id: 1,
            name: 'When card moves to Done, log remaining time',
            trigger: { type: 'status_change', to: 'done' },
            actions: [{ type: 'log_time', value: 'remaining' }],
            enabled: true,
        },
        {
            id: 2,
            name: 'Notify team when due date approaches',
            trigger: { type: 'due_date', days_before: 1 },
            actions: [{ type: 'notify', target: 'members', message: 'Card is due soon' }],
            enabled: true,
        },
    ]);

    // Card Templates
    const [cardTemplates, setCardTemplates] = useState([
        {
            id: 1,
            name: 'Bug Report',
            description: 'Standard template for tracking bugs',
            fields: [
                { name: 'Steps to Reproduce', type: 'textarea', required: true },
                { name: 'Expected Behavior', type: 'textarea', required: true },
                { name: 'Actual Behavior', type: 'textarea', required: true },
                { name: 'Severity', type: 'select', options: ['Critical', 'High', 'Medium', 'Low'], required: true },
            ],
        },
        {
            id: 2,
            name: 'Feature Request',
            description: 'Template for new feature requests',
            fields: [
                { name: 'Business Value', type: 'textarea', required: true },
                { name: 'Acceptance Criteria', type: 'textarea', required: true },
                { name: 'Priority', type: 'select', options: ['P0', 'P1', 'P2', 'P3'], required: true },
            ],
        },
    ]);

    // Custom Fields
    const [customFieldDefinitions, setCustomFieldDefinitions] = useState([
        { id: 1, name: 'Priority', type: 'select', options: ['Critical', 'High', 'Medium', 'Low'], board_id: 1 },
        { id: 2, name: 'Client', type: 'text', board_id: 1 },
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

        if (focusMode && focusedUserId) {
            const isAssignedToUser = cardMembers.some(cm => cm.card_id === card.id && cm.user_id === Number(focusedUserId));
            return isAssignedToUser;
        }

        // ✅ إذا لم يكن focusMode مفعّل، نُطبق كل الفلاتر الأخرى
        return matchesSearch && matchesMembers && matchesLabels && matchesTypes && matchesStatuses;
    });

    // Board data for the current view
    const currentBoard = boards.find(b => b.id === currentBoardId);
    const boardLists = lists.filter(list => list.board_id === currentBoardId).sort((a, b) => a.position - b.position);
    const boardLabels = labels.filter(label => label.board_id === currentBoardId);
    const boardCustomFields = customFieldDefinitions.filter(field => field.board_id === currentBoardId);

    // Get boards accessible to current user
    const userBoards = boards.filter(board => board.visibility === 'public' || board.created_by === currentUser.id || boardMembers.some(bm => bm.board_id === board.id && bm.user_id === currentUser.id)).sort((a, b) => a.title.localeCompare(b.title));

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
    const getBoardMembers = boardId => {
        const memberIds = boardMembers.filter(bm => bm.board_id === boardId).map(bm => bm.user_id);
        return users.filter(user => memberIds.includes(user.id));
    };

    const closeModal = () => {
        setActiveCard(null);
        setActiveModal(null);
    };

    const checkAutomationRules = (cardId, changeType, changeData) => {
        const card = cards.find(c => c.id === cardId);
        if (!card) return;

        automationRules
            .filter(rule => rule.enabled)
            .forEach(rule => {
                // Check if trigger matches
                let triggerMatches = false;

                if (rule.trigger.type === 'status_change' && changeType === 'status') {
                    triggerMatches = card.status === rule.trigger.to;
                } else if (rule.trigger.type === 'move' && changeType === 'move') {
                    triggerMatches = changeData.to === rule.trigger.to_list;
                } else if (rule.trigger.type === 'due_date' && card.due_date) {
                    const daysUntilDue = Math.ceil((new Date(card.due_date) - new Date()) / (1000 * 60 * 60 * 24));
                    triggerMatches = daysUntilDue <= rule.trigger.days_before;
                }

                if (triggerMatches) {
                    // Execute actions
                    rule.actions.forEach(action => {
                        if (action.type === 'log_time' && action.value === 'remaining') {
                            logTime(cardId, card.time_remaining);
                        } else if (action.type === 'notify') {
                            const targets = [];
                            if (action.target === 'members') {
                                targets.push(...getCardMembers(cardId).map(m => m.id));
                            }
                            if (action.target === 'board') {
                                targets.push(...getBoardMembers(card.list_id).map(m => m.id));
                            }

                            targets.forEach(userId => {
                                const newNotification = {
                                    id: Math.max(...notificationsData.map(n => n.id), 0) + 1,
                                    user_id: userId,
                                    card_id: cardId,
                                    message: action.message || 'Automated notification',
                                    read: false,
                                    timestamp: new Date().toISOString(),
                                };
                                setNotificationsData([...notificationsData, newNotification]);
                            });
                        }
                    });
                }
            });
    };

    const updateCard = updatedCard => {
        setCards(cards.map(card => (card.id === updatedCard.id ? updatedCard : card)));

        // Log activity if title changed
        const oldCard = cards.find(c => c.id === updatedCard.id);
        if (oldCard && oldCard.title !== updatedCard.title) {
            const newActivity = {
                id: Math.max(...activities.map(a => a.id), 0) + 1,
                card_id: updatedCard.id,
                user_id: currentUser.id,
                type: 'update',
                message: `renamed card from "${oldCard.title}" to "${updatedCard.title}"`,
                timestamp: new Date().toISOString(),
            };
            setActivities([...activities, newActivity]);
        }

        // Check automation rules for status changes
        if (oldCard && oldCard.status !== updatedCard.status) {
            checkAutomationRules(updatedCard.id, 'status', { from: oldCard.status, to: updatedCard.status });
        }
    };

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
        }
    };

    return <GlobalContext.Provider value={{ isMobile, setIsMobile ,logTime, checkAutomationRules, updateCard, closeModal, getUserById, getCardMembers, getCardLabels, getCardAttachments, getCardComments, getCardChecklists, getChecklistItems, getCardActivities, getBoardMembers, filteredCards, currentBoard, boardLists, boardLabels, boardCustomFields, userBoards, dragItem, dragOverItem, activeCard, setActiveCard, activeModal, setActiveModal, notifications, setNotifications, searchQuery, setSearchQuery, currentBoardId, setCurrentBoardId, showBoardSelector, setShowBoardSelector, inviteEmail, setInviteEmail, focusMode, setFocusMode, focusedUserId, setFocusedUserId, filter, setFilter, users, setUsers, currentUser, setCurrentUser, boards, setBoards, boardMembers, setBoardMembers, lists, setLists, cards, setCards, cardMembers, setCardMembers, labels, setLabels, cardLabels, setCardLabels, attachments, setAttachments, comments, setComments, checklists, setChecklists, checklistItems, setChecklistItems, activities, setActivities, notificationsData, setNotificationsData, aiQuery, setAiQuery, aiResponse, setAiResponse, isAiProcessing, setIsAiProcessing, riskItems, setRiskItems, predictions, setPredictions, automationRules, setAutomationRules, cardTemplates, setCardTemplates, customFieldDefinitions, setCustomFieldDefinitions, collapsed, setCollapsed }}>{children}</GlobalContext.Provider>;
};

export const useValues = () => {
    return useContext(GlobalContext);
};
