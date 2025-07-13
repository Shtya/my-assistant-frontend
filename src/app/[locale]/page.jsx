'use client';

import { Reorder } from 'framer-motion';
import { Eye,  Sparkles, SparklesIcon, FilterIcon, SettingsIcon, Search, X, LayoutTemplate, Loader2, EyeClosed } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Select from '@/components/atoms/Select';
import { api } from '@/helper/api';
import { Auth } from '@/hooks/Auth';
import BoardSelectorDialog from '@/components/pages/kanban/BoardSelectorDialog';
import CreateBoardDialog from '@/components/pages/kanban/CreateBoardDialog';
import Modal2 from '@/components/molecules/Modal2';
import Button from '@/components/atoms/Button';

   
// Main KanbanBoard Component with API integration
export default function KanbanBoard() {
  const [activeCard, setActiveCard] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentBoardId, setCurrentBoardId] = useState(null);
  const [currentBoardData, setCurrentBoardData] = useState(null);
  const [showBoardSelector, setShowBoardSelector] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [focusMode, setFocusMode] = useState(false);
  const [focusedUserId, setFocusedUserId] = useState(null);
  const [filter, setFilter] = useState({ members: [], labels: [], types: [], statuses: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for all data
  const [currentUser, setCurrentUser] = useState(null);
  const [boards, setBoards] = useState([]);
  const [boardMembers, setBoardMembers] = useState([]);
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);
  const [cardMembers, setCardMembers] = useState([]);
  const [labels, setLabels] = useState([]);
  const [cardLabels, setCardLabels] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [comments, setComments] = useState([]);
  const [checklists, setChecklists] = useState([]);
  const [checklistItems, setChecklistItems] = useState([]);
  const [activities, setActivities] = useState([]);
  const [notificationsData, setNotificationsData] = useState([]);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [riskItems, setRiskItems] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [automationRules, setAutomationRules] = useState([]);
  const [cardTemplates, setCardTemplates] = useState([]);
  const [customFieldDefinitions, setCustomFieldDefinitions] = useState([]);

  // Refs for drag and drop
  const dragItem = useRef();
  const dragOverItem = useRef();

  // Helper functions
  const getUserById = id => boardMembers.find(member => member.user.id === id)?.user || null;
  const getCardMembers = cardId => {
    return cardMembers.filter(cm => cm.cardId === cardId).map(cm => getUserById(cm.userId));
  };
  const getCardLabels = cardId => {
    const labelIds = cardLabels.filter(cl => cl.cardId === cardId).map(cl => cl.labelId);
    return labels.filter(label => labelIds.includes(label.id));
  };
  const getCardAttachments = cardId => attachments.filter(att => att.cardId === cardId);
  const getCardComments = cardId => comments.filter(comment => comment.cardId === cardId);
  const getCardChecklists = cardId => checklists.filter(checklist => checklist.cardId === cardId);
  const getChecklistItems = checklistId => checklistItems.filter(item => item.checklistId === checklistId);
  const getCardActivities = cardId => activities.filter(activity => activity.cardId === cardId);
  const getBoardMembers = boardId => boardMembers.filter(bm => bm.boardId === boardId);

  const { user, loading } = Auth();

  const fetchUser = async () => {
    setCurrentUser(user);
  };

  const fetchBoards = async () => {
    try {
      setIsLoading(true);


      const boardsResponse = await api.get('/boards');
      setBoards(boardsResponse.data);

      if (boardsResponse.data.length > 0) {
        setCurrentBoardId(boardsResponse.data[0].id);
        await fetchBoardData(boardsResponse.data[0].id);
      }

      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

const fetchBoardData = async boardId => {
  try {
    setIsLoading(true);
    const board = await api.get(`/boards/${boardId}`);

    // Set data from the board response directly
    setBoardMembers(board.data?.members);
    setLists(board.data?.lists);

    // Combine all cards from all lists
    const allCards = [];
    board.data?.lists?.forEach(list => {
      if (list.cards) {
        allCards.push(...list.cards);
      }
    });
    setCards(allCards);

     setLabels(board.data?.labels);

    setIsLoading(false);
  } catch (err) {
    setError(err.message);
    setIsLoading(false);
  }
};

  const fetchCardDetails = async cardId => {
    try {
      // Fetch card members
      const membersResponse = await api.get(`/cards/${cardId}/members`);
      setCardMembers(membersResponse.data);

      // Fetch card labels
      const labelsResponse = await api.get(`/cards/${cardId}/labels`);
      setCardLabels(labelsResponse.data);

      // Fetch comments
      const commentsResponse = await api.get(`/comments/card/${cardId}`);
      setComments(commentsResponse.data);

      // Fetch checklists
      const checklistsResponse = await api.get(`/checklists/card/${cardId}`);
      setChecklists(checklistsResponse.data);

      // Fetch checklist items
      const allItems = [];
      for (const checklist of checklistsResponse.data) {
        const itemsResponse = await api.get(`/checklists/${checklist.id}/items`);
        allItems.push(...itemsResponse.data);
      }
      setChecklistItems(allItems);

      // Fetch activities
      const activitiesResponse = await api.get(`/activities/card/${cardId}`);
      setActivities(activitiesResponse.data);
    } catch (err) {
      console.error('Error fetching card details:', err);
    }
  };

  // Initialize data
  useEffect(() => {
    fetchBoards();
    fetchUser();
  }, []);

  // Fetch board data when board changes
  useEffect(() => {
    if (currentBoardId) {
      fetchBoardData(currentBoardId);
    }
  }, [currentBoardId]);

  // Fetch card details when card modal opens
  useEffect(() => {
    if (activeModal === 'card-details' && activeCard) {
      fetchCardDetails(activeCard.id);
    }
  }, [activeModal, activeCard]);

  // Filtered data based on search and filters
  const filteredCards = cards.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(searchQuery.toLowerCase()) || card.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMembers = filter.members.length === 0 || cardMembers.some(cm => cm.cardId === card.id && filter.members.includes(cm.userId));
    const matchesLabels = filter.labels.length === 0 || cardLabels.some(cl => cl.cardId === card.id && filter.labels.includes(cl.labelId));
    const matchesTypes = filter.types.length === 0 || filter.types.includes(card.issueType);
    const matchesStatuses = filter.statuses.length === 0 || filter.statuses.includes(card.status);

    if (focusMode && focusedUserId) {
      const isAssignedToUser = cardMembers.some(cm => cm.cardId === card.id && cm.userId === focusedUserId);
      return isAssignedToUser;
    }

    return matchesSearch && matchesMembers && matchesLabels && matchesTypes && matchesStatuses;
  });

  // Board data for the current view
  const currentBoard = boards.find(b => b.id === currentBoardId);
  const boardLists = lists?.sort((a, b) => a.position - b.position);
  const boardLabels = labels
  const boardCustomFields = customFieldDefinitions.filter(field => field.boardId === currentBoardId);

  // Get boards accessible to current user
  const userBoards = boards;
  // .filter(board => board.visibility === 'public' || board.createdBy.id === currentUser?.id || boardMembers.some(bm => bm.boardId === board.id && bm.userId === currentUser?.id)).sort((a, b) => a.title.localeCompare(b.title));

  // Modal handlers
  const closeModal = () => {
    setActiveCard(null);
    setActiveModal(null);
  };

  const openCardModal = async card => {
    setActiveCard(card);
    setActiveModal('card-details');
  };

 
  //! Board operations
  const [loadingCreateBoard , setLoadingCreateBoard] = useState(false)
  const createBoard = async (title, visibility , invitations) => {
     
    setLoadingCreateBoard(true)
    try {
      const response = await api.post('/boards', { title, visibility , invitations });
      setBoards([...boards, response.data]);
      setCurrentBoardId(response.data.id);
      closeModal();
      return response.data;
    } catch (err) {
      console.error('Error creating board:', err);
    }
    finally{
      setLoadingCreateBoard(false)
    }
  };

  const updateBoard = async (boardId, updates) => {
    try {
      const response = await api.put(`/boards/${boardId}`, updates);
      setBoards(boards.map(b => (b.id === boardId ? response.data : b)));
      return response.data;
    } catch (err) {
      console.error('Error updating board:', err);
      alert('Failed to update board');
    }
  };

  const deleteBoard = async boardId => {
    try {
      await api.delete(`/boards/${boardId}`);
      const newBoards = boards.filter(b => b.id !== boardId);
      setBoards(newBoards);
      setCurrentBoardId(newBoards[0]?.id || null);
      closeModal();
    } catch (err) {
      console.error('Error deleting board:', err);
      alert('Failed to delete board');
    }
  };

  const inviteToBoard = async (boardId, email, role = 'member') => {
    try {
      const response = await api.post(`/boards/invitations`, {
        boardId,
        email,
        role,
      });
      // Update board members or invitations list
      // This depends on your API response structure
      closeModal();
      return response.data;
    } catch (err) {
      console.error('Error inviting to board:', err);
      alert('Failed to send invitation');
    }
  };

  // List operations
  const createList = async (boardId, title) => {
    try {
      const response = await api.post('/lists', { boardId, title });
      setLists([...lists, response.data]);
      return response.data;
    } catch (err) {
      console.error('Error creating list:', err);
      alert('Failed to create list');
    }
  };

  const updateList = async (listId, updates) => {
    try {
      const response = await api.put(`/lists/${listId}`, updates);
      setLists(lists.map(l => (l.id === listId ? response.data : l)));
      return response.data;
    } catch (err) {
      console.error('Error updating list:', err);
      alert('Failed to update list');
    }
  };

  const moveList = async (listId, position) => {
    try {
      const response = await api.put(`/lists/${listId}/move`, { position });
      setLists(lists.map(l => (l.id === listId ? response.data : l)));
      return response.data;
    } catch (err) {
      console.error('Error moving list:', err);
      alert('Failed to move list');
    }
  };

  const deleteList = async listId => {
    try {
      await api.delete(`/lists/${listId}`);
      setLists(lists.filter(l => l.id !== listId));
      // Also delete cards in this list
      setCards(cards.filter(c => c.listId !== listId));
    } catch (err) {
      console.error('Error deleting list:', err);
      alert('Failed to delete list');
    }
  };

  // Card operations
  const createCard = async (listId, title, description = '', issueType = 'task') => {
    try {
      const response = await api.post('/cards', { listId, title, description, issueType });
      setCards([...cards, response.data]);
      return response.data;
    } catch (err) {
      console.error('Error creating card:', err);
      alert('Failed to create card');
    }
  };

  const updateCard = async (cardId, updates) => {
    try {
      const response = await api.put(`/cards/${cardId}`, updates);
      setCards(cards.map(c => (c.id === cardId ? response.data : c)));
      return response.data;
    } catch (err) {
      console.error('Error updating card:', err);
      alert('Failed to update card');
    }
  };

  const moveCard = async (cardId, listId, position) => {
    try {
      const response = await api.put(`/cards/${cardId}/move`, { listId, position });
      setCards(cards.map(c => (c.id === cardId ? response.data : c)));
      return response.data;
    } catch (err) {
      console.error('Error moving card:', err);
      alert('Failed to move card');
    }
  };

  const deleteCard = async cardId => {
    try {
      await api.delete(`/cards/${cardId}`);
      setCards(cards.filter(c => c.id !== cardId));
      closeModal();
    } catch (err) {
      console.error('Error deleting card:', err);
      alert('Failed to delete card');
    }
  };

  // Member operations
  const addCardMember = async (cardId, userId) => {
    try {
      const response = await api.post(`/cards/${cardId}/members`, { userId });
      setCardMembers([...cardMembers, response.data]);
      return response.data;
    } catch (err) {
      console.error('Error adding card member:', err);
      alert('Failed to add member to card');
    }
  };

  const removeCardMember = async (cardId, userId) => {
    try {
      await api.delete(`/cards/${cardId}/members/${userId}`);
      setCardMembers(cardMembers.filter(cm => !(cm.cardId === cardId && cm.userId === userId)));
    } catch (err) {
      console.error('Error removing card member:', err);
      alert('Failed to remove member from card');
    }
  };

  const updateBoardMemberRole = async (boardId, userId, role) => {
    try {
      const response = await api.put(`/boards/${boardId}/members/${userId}`, { role });
      setBoardMembers(boardMembers.map(bm => (bm.boardId === boardId && bm.userId === userId ? response.data : bm)));
      return response.data;
    } catch (err) {
      console.error('Error updating member role:', err);
      alert('Failed to update member role');
    }
  };

  const removeBoardMember = async (boardId, userId) => {
    try {
      await api.delete(`/boards/${boardId}/members/${userId}`);
      setBoardMembers(boardMembers.filter(bm => !(bm.boardId === boardId && bm.userId === userId)));
    } catch (err) {
      console.error('Error removing board member:', err);
      alert('Failed to remove member from board');
    }
  };

  // Label operations
  const createLabel = async (boardId, title, color) => {
    try {
      const response = await api.post('/labels', { boardId, title, color });
      setLabels([...labels, response.data]);
      return response.data;
    } catch (err) {
      console.error('Error creating label:', err);
      alert('Failed to create label');
    }
  };

  const updateLabel = async (labelId, updates) => {
    try {
      const response = await api.put(`/labels/${labelId}`, updates);
      setLabels(labels.map(l => (l.id === labelId ? response.data : l)));
      return response.data;
    } catch (err) {
      console.error('Error updating label:', err);
      alert('Failed to update label');
    }
  };

  const addLabelToCard = async (cardId, labelId) => {
    try {
      const response = await api.post('/labels/add-to-card', { cardId, labelId });
      setCardLabels([...cardLabels, response.data]);
      return response.data;
    } catch (err) {
      console.error('Error adding label to card:', err);
      alert('Failed to add label to card');
    }
  };

  const removeLabelFromCard = async (cardId, labelId) => {
    try {
      await api.delete(`/labels/remove-from-card/${cardId}/${labelId}`);
      setCardLabels(cardLabels.filter(cl => !(cl.cardId === cardId && cl.labelId === labelId)));
    } catch (err) {
      console.error('Error removing label from card:', err);
      alert('Failed to remove label from card');
    }
  };

  const deleteLabel = async labelId => {
    try {
      await api.delete(`/labels/${labelId}`);
      setLabels(labels.filter(l => l.id !== labelId));
      setCardLabels(cardLabels.filter(cl => cl.labelId !== labelId));
    } catch (err) {
      console.error('Error deleting label:', err);
      alert('Failed to delete label');
    }
  };

  // Comment operations
  const addComment = async (cardId, text) => {
    try {
      const response = await api.post('/comments', { cardId, text });
      setComments([...comments, response.data]);
      return response.data;
    } catch (err) {
      console.error('Error adding comment:', err);
      alert('Failed to add comment');
    }
  };

  const updateComment = async (commentId, text) => {
    try {
      const response = await api.put(`/comments/${commentId}`, { text });
      setComments(comments.map(c => (c.id === commentId ? response.data : c)));
      return response.data;
    } catch (err) {
      console.error('Error updating comment:', err);
      alert('Failed to update comment');
    }
  };

  const deleteComment = async commentId => {
    try {
      await api.delete(`/comments/${commentId}`);
      setComments(comments.filter(c => c.id !== commentId));
    } catch (err) {
      console.error('Error deleting comment:', err);
      alert('Failed to delete comment');
    }
  };

  // Checklist operations
  const createChecklist = async (cardId, title) => {
    try {
      const response = await api.post('/checklists', { cardId, title });
      setChecklists([...checklists, response.data]);
      return response.data;
    } catch (err) {
      console.error('Error creating checklist:', err);
      alert('Failed to create checklist');
    }
  };

  const updateChecklist = async (checklistId, updates) => {
    try {
      const response = await api.put(`/checklists/${checklistId}`, updates);
      setChecklists(checklists.map(c => (c.id === checklistId ? response.data : c)));
      return response.data;
    } catch (err) {
      console.error('Error updating checklist:', err);
      alert('Failed to update checklist');
    }
  };

  const addChecklistItem = async (checklistId, content) => {
    try {
      const response = await api.post(`/checklists/${checklistId}/items`, { content });
      setChecklistItems([...checklistItems, response.data]);
      return response.data;
    } catch (err) {
      console.error('Error adding checklist item:', err);
      alert('Failed to add checklist item');
    }
  };

  const updateChecklistItem = async (itemId, updates) => {
    try {
      const response = await api.put(`/checklists/items/${itemId}`, updates);
      setChecklistItems(checklistItems.map(i => (i.id === itemId ? response.data : i)));
      return response.data;
    } catch (err) {
      console.error('Error updating checklist item:', err);
      alert('Failed to update checklist item');
    }
  };

  const deleteChecklistItem = async itemId => {
    try {
      await api.delete(`/checklists/items/${itemId}`);
      setChecklistItems(checklistItems.filter(i => i.id !== itemId));
    } catch (err) {
      console.error('Error deleting checklist item:', err);
      alert('Failed to delete checklist item');
    }
  };

  const deleteChecklist = async checklistId => {
    try {
      await api.delete(`/checklists/${checklistId}`);
      setChecklists(checklists.filter(c => c.id !== checklistId));
      setChecklistItems(checklistItems.filter(i => i.checklistId !== checklistId));
    } catch (err) {
      console.error('Error deleting checklist:', err);
      alert('Failed to delete checklist');
    }
  };

  // Activity operations
  const createActivity = async (cardId, type, message) => {
    try {
      const response = await api.post('/activities', { cardId, type, message });
      setActivities([...activities, response.data]);
      return response.data;
    } catch (err) {
      console.error('Error creating activity:', err);
    }
  };

  const deleteActivity = async activityId => {
    try {
      await api.delete(`/activities/${activityId}`);
      setActivities(activities.filter(a => a.id !== activityId));
    } catch (err) {
      console.error('Error deleting activity:', err);
    }
  };

  // Custom Field operations
  const createCustomFieldDefinition = async (boardId, name, type, options = []) => {
    try {
      const response = await api.post('/custom-fields/definitions', { boardId, name, type, options });
      setCustomFieldDefinitions([...customFieldDefinitions, response.data]);
      return response.data;
    } catch (err) {
      console.error('Error creating custom field definition:', err);
      alert('Failed to create custom field');
    }
  };

  const updateCustomFieldDefinition = async (definitionId, updates) => {
    try {
      const response = await api.put(`/custom-fields/definitions/${definitionId}`, updates);
      setCustomFieldDefinitions(customFieldDefinitions.map(d => (d.id === definitionId ? response.data : d)));
      return response.data;
    } catch (err) {
      console.error('Error updating custom field definition:', err);
      alert('Failed to update custom field');
    }
  };

  const createCustomFieldValue = async (cardId, definitionId, value) => {
    try {
      const response = await api.post('/custom-fields/fields', { cardId, definitionId, value });
      // Update the card's custom fields
      setCards(cards.map(c => (c.id === cardId ? { ...c, customFields: [...(c.customFields || []), response.data] } : c)));
      return response.data;
    } catch (err) {
      console.error('Error creating custom field value:', err);
      alert('Failed to set custom field value');
    }
  };

  const updateCustomFieldValue = async (fieldId, value) => {
    try {
      const response = await api.put(`/custom-fields/fields/${fieldId}`, { value });
      // Update the card's custom fields
      setCards(cards.map(c => (c.customFields?.some(f => f.id === fieldId) ? { ...c, customFields: c.customFields.map(f => (f.id === fieldId ? response.data : f)) } : c)));
      return response.data;
    } catch (err) {
      console.error('Error updating custom field value:', err);
      alert('Failed to update custom field value');
    }
  };

  const deleteCustomFieldDefinition = async definitionId => {
    try {
      await api.delete(`/custom-fields/definitions/${definitionId}`);
      setCustomFieldDefinitions(customFieldDefinitions.filter(d => d.id !== definitionId));
    } catch (err) {
      console.error('Error deleting custom field definition:', err);
      alert('Failed to delete custom field');
    }
  };

  const deleteCustomFieldValue = async fieldId => {
    try {
      await api.delete(`/custom-fields/fields/${fieldId}`);
      // Update the card's custom fields
      setCards(cards.map(c => (c.customFields?.some(f => f.id === fieldId) ? { ...c, customFields: c.customFields.filter(f => f.id !== fieldId) } : c)));
    } catch (err) {
      console.error('Error deleting custom field value:', err);
      alert('Failed to delete custom field value');
    }
  };

  // Notification operations
  const markNotificationAsRead = async notificationId => {
    try {
      await api.put(`/notifications/${notificationId}/read`);
      setNotificationsData(notificationsData.map(n => (n.id === notificationId ? { ...n, read: true } : n)));
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  // Drag and drop functions
  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const drop = async (e, targetListId) => {
    const sourceIndex = dragItem.current;
    const targetIndex = dragOverItem.current;

    if (sourceIndex !== undefined && targetIndex !== undefined) {
      const cardId = filteredCards[sourceIndex].id;

      try {
        await moveCard(cardId, targetListId, targetIndex + 1);

        // Log activity
        const fromList = lists.find(l => l.id === cards.find(c => c.id === cardId)?.listId);
        const toList = targetListId;
        await createActivity(cardId, 'move', `moved this card from ${lists.find(l => l.id === fromList)?.title || 'unknown'} to ${lists.find(l => l.id === toList)?.title || 'unknown'}`);
      } catch (err) {
        console.error('Error moving card:', err);
      }
    }

    dragItem.current = null;
    dragOverItem.current = null;
  };

  // AI Assistant
  const handleAiQuery = () => {
    setIsAiProcessing(true);
    setTimeout(() => {
      let response = '';
      const query = aiQuery.toLowerCase();

      if (query.includes('risk') || query.includes('problem')) {
        response = `Found ${riskItems.length} potential risks:\n` + riskItems.map(r => `- ${r.title} (${r.riskType}, ${r.severity})`).join('\n');
      } else if (query.includes('predict') || query.includes('delay')) {
        const delayed = predictions.filter(p => p.prediction !== 'On Track').length;
        response =
          `Found ${delayed} delayed tasks out of ${predictions.length}:\n` +
          predictions
            .filter(p => p.prediction !== 'On Track')
            .map(p => `- ${p.title} (${p.prediction}, ${p.confidence} confidence)`)
            .join('\n');
      } else if (query.includes('time') || query.includes('hours')) {
        const totalEstimated = cards.reduce((sum, c) => sum + (c.estimateTime || 0), 0);
        const totalSpent = cards.reduce((sum, c) => sum + (c.timeSpent || 0), 0);
        response = `Time report:\nEstimated: ${totalEstimated}h\nSpent: ${totalSpent}h\nCompletion: ${Math.round((totalSpent / totalEstimated) * 100)}%`;
      } else if (query.includes('board') || query.includes('show me')) {
        response = `You have ${boards.length} boards:\n` + boards.map(b => `- ${b.title} (${b.visibility})`).join('\n');
      } else {
        response = 'I can help you with:\n- Risks in your project\n- Time tracking\n- Board information\n- Task predictions\n\nTry asking about any of these topics!';
      }

      setAiResponse(response);
      setIsAiProcessing(false);
    }, 1000);
  };

  // Risk analysis
  const analyzeRisks = () => {
    const risks = cards
      .filter(card => {
        // Cards approaching due date
        if (card.dueDate && new Date(card.dueDate) < new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) && card.status !== 'done') {
          return true;
        }

        // Cards with high time spent vs estimated
        if (card.estimateTime > 0 && card.timeSpent / card.estimateTime > 1.5) {
          return true;
        }

        // Cards blocked for too long
        if (card.status === 'blocked') {
          return true;
        }

        return false;
      })
      .map(card => ({
        cardId: card.id,
        title: card.title,
        riskType: card.dueDate && new Date(card.dueDate) < new Date() ? 'Overdue' : card.status === 'blocked' ? 'Blocked' : card.timeSpent / card.estimateTime > 1.5 ? 'Time Overrun' : 'Due Soon',
        severity: card.dueDate && new Date(card.dueDate) < new Date() ? 'High' : 'Medium',
      }));

    setRiskItems(risks);
  };

  // Predictions
  const generatePredictions = () => {
    const now = new Date();
    const predictions = cards
      .filter(card => card.status !== 'done' && card.dueDate)
      .map(card => {
        const dueDate = new Date(card.dueDate);
        const daysRemaining = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));
        const progress = card.estimateTime > 0 ? card.timeSpent / card.estimateTime : 0;

        let prediction = 'On Track';
        if (daysRemaining < 0) {
          prediction = 'Late';
        } else if (daysRemaining < 3 && progress < 0.8) {
          prediction = 'At Risk';
        } else if (progress < 0.5 && daysRemaining < card.estimateTime - card.timeSpent) {
          prediction = 'Likely Delayed';
        }

        return {
          cardId: card.id,
          title: card.title,
          prediction,
          confidence: progress > 0.8 ? 'High' : progress > 0.5 ? 'Medium' : 'Low',
        };
      });

    setPredictions(predictions);
  };

  // Filter handling
  const handleCheckbox = (field, value) => {
    const current = filter[field];
    setFilter({
      ...filter,
      [field]: current.includes(value) ? current.filter(v => v !== value) : [...current, value],
    });
  };

  // Set initial board on component mount
  useEffect(() => {
    if (boards.length > 0 && !currentBoardId) {
      setCurrentBoardId(boards[0].id);
    }

    // Analyze risks when cards load
    analyzeRisks();

    // Generate predictions
    generatePredictions();
  }, [boards, cards]);

  if (isLoading && !currentBoardId) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <Loader2 className='animate-spin h-12 w-12 text-blue-500 mx-auto mb-4' />
          <p>Loading your boards...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold mb-4 text-red-500'>Error</h1>
          <p className='mb-4'>{error}</p>
          <button className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600' onClick={fetchBoards}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!currentBoardId) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold mb-4'>No Boards Available</h1>
          <button className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600' onClick={() => setActiveModal('create-board')}>
            Create Your First Board
          </button>
        </div>
      </div>
    );
  }

  const usersOptions = boardMembers.map(member => ({
    label: member.user?.fullName,
    key: member.user?.id,
  }));

  const selectedUser = usersOptions.find(option => option.key === focusedUserId) || null;
  const issueTypes = ['task', 'bug', 'story', 'epic'];
  const statusTypes = ['open', 'in-progress', 'done', 'blocked'];
  const suggestions = ['Show me potential risks in my project', 'Give me a time tracking report', 'What tasks are likely to be delayed?', 'List all my boards'];

  
  return (
    <div className='min-h-screen rtl:mr-[10px] ltr:ml-[10px] w-[calc(100%-10px)] relative'>
      {/* Header */}
      <div className='relative z-[10] !flex mt-4 !flex-row !items-center !justify-between !p-4 card w-full text-text-base'>
        <div className='flex items-center space-x-2'>
          <div className='relative'>
            <button className='flex items-center' onClick={() => setActiveModal('board-selector')}>
              <h1 className='text-base w-[150px] truncate font-medium'>{currentBoard?.title || 'Select Board'}</h1>
              <svg className='h-4 w-4 ml-1 text-text-base' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
              </svg>
            </button>
          </div>
          {currentBoard && <span className={`px-2 h-5 rtl:!ml-[40px] ltr:!mr-[40px] text-[10px] capitalize flex items-center justify-center rounded ${currentBoard.visibility === 'public' ? 'bg-primary/90 text-white' : currentBoard.visibility === 'team' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{currentBoard.visibility}</span>}

          {/* Focus Mode */}
          <div className='flex items-center space-x-2'>
            {focusMode && (
              <div className='animate-fade-in'>
                <Select options={usersOptions} value={selectedUser} onChange={val => setFocusedUserId(val?.key || null)} />
              </div>
            )}
            <Button  title='Focus on your cards' color='white' Icon={focusMode ? <EyeClosed className='h-4 w-4 text-red-500' /> : <Eye className='h-4 w-4 text-blue-500' />} onClick={() => setFocusMode(!focusMode)} />
          </div>

          <Button title='Filters the cards' color='white' Icon={<FilterIcon className='h-4 w-4 text-gray-500 group-hover:text-blue-500' />} onClick={() => setActiveModal('filters')} />
          <Button title='AI assistant' color='white' cn='' Icon={<Sparkles className='text-purple-500 h-4 w-4' />} onClick={() => setActiveModal('ai-assistant')} />
        </div>

        <div className='flex items-center justify-end space-x-2 flex-1'>
          <div className='relative flex items-center gap-2 px-2 h-10 py-2 border rounded-lg w-fit'>
            <Search size={16} className='text-gray-500' />
            <input type='text' placeholder='Search cards...' className='outline-none flex-1 w-[150px] focus:!w-[200px] duration-500' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>

          <Button color='white' Icon={<SettingsIcon className='text-primary w-4 h-4' />} onClick={() => setActiveModal('board-settings')} />

          <div className='relative'>
            <button className='p-2 rounded-md duration-300 hover:bg-gray-100 relative' onClick={() => setActiveModal(activeModal === 'notifications' ? null : 'notifications')}>
              <svg className='h-6 w-6 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' />
              </svg>
              {notificationsData.filter(n => !n.read && n.userId === currentUser?.id).length > 0 && <span className='absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500'></span>}
            </button>
          </div>

          {currentUser && (
            <div className='flex gap-2 items-center w-[150px]'>
              <img src={currentUser.avatar} alt={currentUser.fullName} className='h-8 w-8 rounded-full' />
              <span className='w-full text-nowrap'>{currentUser.fullName}</span>
            </div>
          )}
        </div>
      </div>

      {/* Board Content */}
      <div className='py-4 rtl:pl-[10px] ltr:pr-[10px] overflow-x-auto'>
        <div className='overflow-x-auto min-h-[calc(100vh-110px)]'>
          {isLoading ? (
            <div className='flex items-center justify-center h-64'>
              <Loader2 className='animate-spin h-12 w-12 text-blue-500' />
            </div>
          ) : (
            <Reorder.Group  axis='x'  values={boardLists}  
            onReorder={newOrder => {
                const updatedLists = newOrder.map((list, index) => ({ ...list, position: index + 1 }));
                setLists(updatedLists);
                  updatedLists.forEach((list, index) => {
                  moveList(list.id, index + 1);
                });
              }}
              className='flex space-x-4'>
              {boardLists.map(list => {

                return (
                  <Reorder.Item key={list.id} value={list} whileDrag={{ scale: 1.03, boxShadow: '0px 10px 15px rgba(0,0,0,0.1)', zIndex: 10, }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                    <div key={list.id} className='flex-1 card !p-3 min-w-[280px]' onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); const cardId = e.dataTransfer.getData('cardId'); if (cardId) { const card = cards.find(c => c.id === cardId); if (card && card.listId !== list.id) { moveCard(card.id, list.id, listCards.length + 1); } } }}>
                      <div className='flex w-full justify-between items-center mb-3'>
                        <h3 className='font-medium text-text-base'>{list.title}</h3>
                        <span className='inline-flex items-center justify-center w-5 h-5 text-[10px] font-medium rounded-full bg-blue-100 text-blue-700'>{list.cards.length}</span>
                      </div>

                      <div className='space-y-3 w-full'>
                        {list.cards.map((card, index) => (
                          <div
                            key={card.id}
                            className={`border border-border/50 bg-background-subtle duration-300 shadow-inner rounded-lg p-3 hover:bg-background-muted hover:scale-[1.01] cursor-pointer ${focusMode ? 'border-1 bg-primary/10 !border-primary/40' : ''}`}
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

                            <h4 className='font-medium text-gray-900 text-left text-sm'>{card.title}</h4>

                            <div className='flex items-center justify-between mt-3'>
                              <div className='flex items-center space-x-2'>
                                {card.dueDate && (
                                  <div className={`text-[10px] flex items-center justify-center ${new Date(card.dueDate) < new Date() && card.status !== 'done' ? 'text-red-500' : 'text-gray-500'}`}>
                                    <svg className='h-3 w-3 mb-[2px] rtl:ml-1 ltr:mr-1' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                                    </svg>
                                    {new Date(card.dueDate).toLocaleDateString()}
                                  </div>
                                )}

                                {card.issueType && (
                                  <span
                                    className={`inline-block text-[10px] font-medium px-2 py-[2px] rounded-md capitalize shadow-inner ${
                                      {
                                        task: 'bg-blue-100 text-blue-800',
                                        bug: 'bg-red-100 text-red-800',
                                        story: 'bg-green-100 text-green-800',
                                        epic: 'bg-purple-100 text-purple-800',
                                      }[card.issueType]
                                    }`}>
                                    {card.issueType}
                                  </span>
                                )}
                              </div>

                              <div className='flex items-center'>
                                {getCardMembers(card.id).length > 0 && (
                                  <div className='flex -space-x-1'>
                                    {getCardMembers(card.id)
                                      .slice(0, 3)
                                      .map(member => (
                                        <img key={member.id} src={member.avatar} alt={member.fullName} className='h-5 w-5 rounded-full border-[1.5px] border-white' />
                                      ))}
                                    {getCardMembers(card.id).length > 3 && <span className='h-5 w-5 rounded-full bg-primary border-2 border-white text-[10px] text-white flex items-center justify-center'>+{getCardMembers(card.id).length - 3}</span>}
                                  </div>
                                )}
                              </div>
                            </div>

                            {(card.timeSpent > 0 || card.estimateTime > 0) && (
                              <div className='mt-2 space-y-1'>
                                {/* Progress Bar */}
                                <div className='h-[5px] w-full bg-neutral-200 rounded-full overflow-hidden shadow-sm'>
                                  <div
                                    className={`h-full rounded-full transition-all duration-300 ease-in-out ${card.timeSpent / card.estimateTime > 1 ? 'bg-red-500' : 'bg-blue-500'}`}
                                    style={{
                                      width: `${card.estimateTime > 0 ? Math.min(100, (card.timeSpent / card.estimateTime) * 100) : 0}%`,
                                    }}></div>
                                </div>

                                {/* Time Info */}
                                <div className='flex justify-between text-[8px] text-gray-600 font-medium'>
                                  <span>{card.timeSpent}h logged</span>
                                  <span>{card.estimateTime}h estimated</span>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className='mt-4 flex items-center gap-2 w-full'>
                        {/* Add Card Button */}
                        <Button
                          onClick={async () => {
                            const title = prompt('Enter card title');
                            if (title) {
                              await createCard(list.id, title);
                            }
                          }}
                          label='Add a card'
                          cn='!bg-transparent w-full flex items-center text-sm justify-start text-left'
                          Icon={<img src='/add-icon.png' className='w-5 h-5 mt-[2px]' />}
                          color='neutral'
                        />

                         
                      </div>
                    </div>
                  </Reorder.Item>
                );
              })}

              <button
                className='flex gap-2 !flex-row !items-center !justify-center !bg-neutral-100 text-text-base hover:!bg-neutral-200 card rounded-md !p-3 !min-w-[280px] opacity-60 hover:opacity-100 duration-300 !px-4 h-fit'
                onClick={async () => {
                  const title = prompt('Enter list title');
                  if (title) {
                    await createList(currentBoardId, title);
                  }
                }}>
                <img src='/add-icon.png' className='w-5 h-5 mt-[2px]' />
                Add another list
              </button>
            </Reorder.Group>
          )}
        </div>
      </div>

      {/* Mobile board selector */}
      {showBoardSelector && (
        <div className='md:hidden fixed inset-0 bg-black bg-opacity-50 z-40'>
          <div className='bg-white h-full w-3/4 p-4 overflow-y-auto'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-bold'>Your Boards</h2>
              <button onClick={() => setShowBoardSelector(false)} className='text-gray-500 hover:text-gray-700'>
                <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            </div>

            <div className='space-y-2 mb-4'>
              {userBoards.map(board => (
                <div
                  key={board.id}
                  className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${currentBoardId === board.id ? 'bg-blue-50 border-blue-200' : ''}`}
                  onClick={() => {
                    setCurrentBoardId(board.id);
                    setShowBoardSelector(false);
                  }}>
                  <div className='flex justify-between items-center'>
                    <h3 className='font-medium'>{board.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded ${board.visibility === 'public' ? 'bg-blue-100 text-blue-800' : board.visibility === 'team' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{board.visibility}</span>
                  </div>
                  <p className='text-sm text-gray-500 mt-1'>
                    {board?.members?.length} members • {board?.lists?.length} lists
                  </p>
                </div>
              ))}
            </div>

            <button
              className='w-full mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
              onClick={() => {
                setShowBoardSelector(false);
                setActiveModal('create-board');
              }}>
              Create New Board
            </button>
          </div>
        </div>
      )}

      {/* Modals */}

      {/* Create Board Modal */}
      <CreateBoardDialog loadingCreateBoard={loadingCreateBoard} open={activeModal === 'create-board'} onClose={() => setActiveModal(null)} createBoard={createBoard} />

      {/* Board Selector Modal */}
      <BoardSelectorDialog userBoards={userBoards} currentBoardId={currentBoardId} setCurrentBoardId={setCurrentBoardId} activeModal={activeModal} setActiveModal={setActiveModal} onCreateBoardClick={() => setActiveModal('create-board')} />

      {/* Notifications Modal */}
      <Modal2 title={<h2 className='text-xl font-bold'>Notifications</h2>} height='230px' width={'400px'} open={activeModal === 'notifications'} onClose={() => setActiveModal(null)} cn='bg-white'>
        {notificationsData
          .filter(n => n.userId === currentUser?.id)
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          .map(notification => (
            <div
              key={notification.id}
              className={`p-3 border-b cursor-pointer hover:bg-blue-100 duration-300 ${!notification.read ? 'bg-blue-50' : ''}`}
              onClick={async () => {
                await markNotificationAsRead(notification.id);
                if (notification.cardId) {
                  const card = cards.find(c => c.id === notification.cardId);
                  if (card) {
                    setActiveCard(card);
                    setActiveModal('card-details');
                  }
                }
              }}>
              <div className='flex justify-between'>
                <p className={!notification.read ? 'font-medium' : ''}>{notification.message}</p>
                {!notification.read && <span className='h-2 w-2 rounded-full bg-blue-500'></span>}
              </div>
              <p className='text-xs text-gray-500 mt-1'>{new Date(notification.timestamp).toLocaleString()}</p>
            </div>
          ))}

        {notificationsData.filter(n => n.userId === currentUser?.id).length === 0 && <p className='text-gray-500 text-center py-4'>No notifications</p>}
      </Modal2>

      {/* Board Settings Modal */}
      <Modal2 title={<h2 className='text-xl font-bold'>Board Settings</h2>} height='70%' width={'400px'} open={activeModal === 'board-settings'} onClose={() => setActiveModal(null)} cn='bg-white'>
        <div className='space-y-6'>
          {/* Board Title */}
          <div>
            <h3 className='font-medium mb-2'>Board Title</h3>
            <input
              type='text'
              value={currentBoard?.title || ''}
              onChange={e => {
                setBoards(boards.map(b => (b.id === currentBoardId ? { ...b, title: e.target.value } : b)));
              }}
              onBlur={async () => {
                await updateBoard(currentBoardId, { title: currentBoard.title });
              }}
              className='w-full p-2 border rounded-lg'
            />
          </div>

          {/* Visibility */}
          <div>
            <h3 className='font-medium mb-2'>Visibility</h3>
            {['public', 'team', 'private'].map(type => (
              <label key={type} className='flex items-center space-x-2 mb-2'>
                <input
                  type='radio'
                  name='board-visibility'
                  value={type}
                  checked={currentBoard?.visibility === type}
                  onChange={async () => {
                    await updateBoard(currentBoardId, { visibility: type });
                  }}
                />
                <div>
                  <span className='font-medium capitalize'>{type}</span>
                  <p className='text-xs text-gray-500'>{type === 'public' ? 'Anyone can see this board' : type === 'team' ? 'Only team members can see this board' : 'Only you can see this board'}</p>
                </div>
              </label>
            ))}
          </div>

          {/* Members */}
          <div>
            <h3 className='font-medium mb-2'>Members</h3>
            <div className='space-y-2 mb-3'>
              {getBoardMembers(currentBoardId).map(member => (
                <div key={member.user.id} className='flex items-center justify-between p-2 bg-gray-50 rounded-lg'>
                  <div className='flex items-center'>
                    <img src={member.user.avatar} alt={member.user.fullName} className='h-8 w-8 rounded-full mr-2' />
                    <div>
                      <p className='font-medium'>{member.user.fullName}</p>
                      <p className='text-xs text-gray-500'>{member.role}</p>
                    </div>
                  </div>
                  {member.role !== 'admin' && (
                    <button
                      className='text-red-500 hover:text-red-700'
                      onClick={async () => {
                        if (confirm(`Remove ${member.user.fullName} from board?`)) {
                          await removeBoardMember(currentBoardId, member.user.id);
                        }
                      }}>
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className='flex'>
              <input type='email' placeholder='Invite by email' value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} className='flex-1 p-2 border rounded-l-lg' />
              <button
                className='px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600'
                onClick={async () => {
                  await inviteToBoard(currentBoardId, inviteEmail);
                  setInviteEmail('');
                }}>
                Invite
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div>
            <h3 className='font-medium mb-2'>Danger Zone</h3>
            <div className='p-3 border border-red-200 bg-red-50 rounded-lg'>
              <h4 className='font-medium text-red-800 mb-1'>Delete Board</h4>
              <p className='text-sm text-red-600 mb-2'>This will permanently delete the board and all its data</p>
              <button
                className='px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600'
                onClick={async () => {
                  if (confirm('Are you sure you want to delete this board?')) {
                    await deleteBoard(currentBoardId);
                  }
                }}>
                Delete Board
              </button>
            </div>
          </div>
        </div>
      </Modal2>

      {/* AI Assistant Modal */}
      <Modal2
        title={
          <h2 className='text-2xl font-bold flex items-center gap-2'>
            <SparklesIcon className='text-blue-500' size={20} />
            AI Assistant
          </h2>
        }
        height='70%'
        width={'400px'}
        open={activeModal === 'ai-assistant'}
        onClose={() => setActiveModal(null)}
        cn='bg-white'>
        <div className='bg-white w-full flex flex-col space-y-4'>
          {/* Help Box */}
          <div className='bg-blue-50 p-4 rounded-lg text-sm text-gray-700'>
            <p className='mb-2 font-semibold'>How can I help you?</p>
            <ul className='list-disc list-inside space-y-1'>
              <li>Identify risks in your project</li>
              <li>Predict task delays</li>
              <li>Provide time tracking reports</li>
              <li>Give overview of your boards</li>
            </ul>
            <p className='mt-3 text-xs italic text-gray-600'>Try asking: "What tasks are at risk?"</p>
          </div>

          {/* Suggestions */}
          <div className='flex flex-wrap gap-2 text-xs'>
            {suggestions.map((s, i) => (
              <button key={i} className='bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full border text-gray-700 transition' onClick={() => setAiQuery(s)}>
                {s}
              </button>
            ))}
          </div>

          {/* AI Response */}
          {aiResponse && <div className='bg-gray-50 p-4 rounded-lg whitespace-pre-wrap text-sm text-gray-800 border border-gray-200'>{aiResponse}</div>}

          {/* Input */}
          <div className='flex'>
            <input type='text' placeholder='Ask me anything about your tasks...' value={aiQuery} onChange={e => setAiQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && !isAiProcessing && handleAiQuery()} className='flex-1 px-3 py-2 border border-gray-300 rounded-l-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500' disabled={isAiProcessing} />
            <button onClick={handleAiQuery} disabled={isAiProcessing || !aiQuery} className={`px-4 py-2 rounded-r-lg text-sm font-medium transition ${isAiProcessing || !aiQuery ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
              {isAiProcessing ? <Loader2 className='animate-spin h-4 w-4' /> : 'Ask'}
            </button>
          </div>
        </div>
      </Modal2>

      {/* Filters Modal */}
      <Modal2 title={<h2 className='text-2xl font-bold flex items-center gap-2'>Filter Tasks</h2>} height='70%' width={'400px'} open={activeModal === 'filters'} onClose={() => setActiveModal(null)} cn='bg-white'>
        <div className='w-full'>
          <div className='space-y-6 max-h-[70vh] overflow-y-auto pr-2'>
            {/* Members */}
            <div>
              <h3 className='text-gray-700 font-medium mb-1'>Members</h3>
              <div className='space-y-2'>
                {boardMembers.map(member => (
                  <label key={member.user?.id} className='flex items-center gap-2'>
                    <input type='checkbox' checked={filter.members.includes(member.user?.id)} onChange={() => handleCheckbox('members', member.user?.id)} className='accent-blue-500' />
                    <div className='flex items-center gap-2'>
                      <img src={member.user?.avatar} alt={member.user?.fullName} className='h-6 w-6 rounded-full' />
                      <span className='text-sm'>{member.user?.fullName}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Labels */}
            <div>
              <h3 className='text-gray-700 font-medium mb-1'>Labels</h3>
              <div className='flex flex-wrap gap-2'>
                {boardLabels.map(label => (
                  <button key={label.id} onClick={() => handleCheckbox('labels', label.id)} className={`text-xs font-medium px-3 py-1 rounded-md transition ring-offset-2 focus:outline-none ${filter.labels.includes(label.id) ? 'ring-2 ring-blue-400' : 'hover:opacity-90'}`} style={{ backgroundColor: label.color }}>
                    {label.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Issue Types */}
            <div>
              <h3 className='text-gray-700 font-medium mb-1'>Issue Types</h3>
              <div className='flex flex-wrap gap-2'>
                {issueTypes.map(type => (
                  <button key={type} onClick={() => handleCheckbox('types', type)} className={`px-3 py-1 text-sm rounded-lg shadow-inner transition ${filter.types.includes(type) ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <h3 className='text-gray-700 font-medium mb-1'>Status</h3>
              <div className='flex flex-wrap gap-2'>
                {statusTypes.map(status => (
                  <button key={status} onClick={() => handleCheckbox('statuses', status)} className={`px-3 py-1 text-sm rounded-lg shadow-inner transition ${filter.statuses.includes(status) ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}>
                    {status
                      .split('-')
                      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className='mt-6 -mb-2 flex justify-end gap-3'>
            <button
              onClick={() =>
                setFilter({
                  members: [],
                  labels: [],
                  types: [],
                  statuses: [],
                })
              }
              className='px-4 py-2 text-sm rounded bg-gray-100 text-gray-700 hover:bg-gray-200'>
              Clear All
            </button>
            <button onClick={closeModal} className='px-4 py-2 text-sm rounded bg-blue-500 text-white hover:bg-blue-600'>
              Apply Filters
            </button>
          </div>
        </div>
      </Modal2>

      {/* Card Details Modal */}
      <Modal2 height='90%' width={'80%'} open={activeModal === 'card-details'} onClose={() => setActiveModal(null)} cn='bg-white'>
        {activeCard && (
          <div>
            <div className='flex justify-between items-start mb-6 border-b pb-4'>
              <div className='space-y-1'>
                <h2 className='text-2xl font-semibold text-gray-900 dark:text-white'>{activeCard.title}</h2>
                <p className='text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1'>
                  In list
                  <span className='ml-1 inline-block rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-0.5 text-xs font-semibold'>{lists.find(l => l.id === activeCard.listId)?.title || 'Unknown'}</span>
                </p>
              </div>
            </div>

            <div className='flex flex-col md:flex-row gap-6'>
              <div className='flex-1'>
                {/* Description */}
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
                        onClick={async () => {
                          const newDesc = prompt('Enter description', activeCard.description || '');
                          if (newDesc !== null) {
                            await updateCard(activeCard.id, { description: newDesc });
                          }
                        }}>
                        Add a more detailed description...
                      </button>
                    )}
                  </div>
                </div>

                {/* Custom Fields */}
                {activeCard.customFields?.length > 0 && (
                  <div className='mb-6'>
                    <h3 className='font-medium mb-2 flex items-center'>
                      <svg className='h-5 w-5 mr-1 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' />
                      </svg>
                      Custom Fields
                    </h3>
                    <div className='bg-gray-50 p-3 rounded grid grid-cols-1 md:grid-cols-2 gap-4'>
                      {activeCard.customFields.map(field => (
                        <div key={field.id} className='space-y-1'>
                          <label className='text-sm font-medium text-gray-700'>{field.name}</label>
                          {field.type === 'select' ? (
                            <select
                              value={field.value}
                              onChange={async e => {
                                await updateCustomFieldValue(field.id, e.target.value);
                              }}
                              className='w-full p-2 border rounded'>
                              {customFieldDefinitions
                                .find(f => f.name === field.name)
                                ?.options?.map(option => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                            </select>
                          ) : field.type === 'textarea' ? (
                            <textarea
                              value={field.value}
                              onChange={async e => {
                                await updateCustomFieldValue(field.id, e.target.value);
                              }}
                              className='w-full p-2 border rounded'
                              rows={3}
                            />
                          ) : (
                            <input
                              type={field.type === 'number' ? 'number' : 'text'}
                              value={field.value}
                              onChange={async e => {
                                await updateCustomFieldValue(field.id, e.target.value);
                              }}
                              className='w-full p-2 border rounded'
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Checklists */}
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
                      onClick={async () => {
                        const title = prompt('Enter checklist title');
                        if (title) {
                          await createChecklist(activeCard.id, title);
                        }
                      }}>
                      Add Checklist
                    </button>
                  </div>

                  {getCardChecklists(activeCard.id).map(checklist => {
                    const items = getChecklistItems(checklist.id);
                    const completedCount = items.filter(item => item.isDone).length;
                    const totalCount = items.length;

                    return (
                      <div key={checklist.id} className='bg-gray-50 p-3 rounded mb-3'>
                        <div className='flex justify-between items-center mb-2'>
                          <h4 className='font-medium'>{checklist.title}</h4>
                          <button
                            className='text-sm text-red-500 hover:text-red-700'
                            onClick={async () => {
                              if (confirm('Delete this checklist?')) {
                                await deleteChecklist(checklist.id);
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
                              <input
                                type='checkbox'
                                checked={item.isDone}
                                onChange={async () => {
                                  await updateChecklistItem(item.id, { isDone: !item.isDone });
                                }}
                                className='mr-2'
                              />
                              <span className={item.isDone ? 'line-through text-gray-500' : ''}>{item.content}</span>
                            </div>
                          ))}
                        </div>

                        <button
                          className='mt-2 text-sm text-blue-500 hover:text-blue-700'
                          onClick={async () => {
                            const content = prompt('Add checklist item');
                            if (content) {
                              await addChecklistItem(checklist.id, content);
                            }
                          }}>
                          Add item
                        </button>
                      </div>
                    );
                  })}

                  {getCardChecklists(activeCard.id).length === 0 && <p className='text-gray-500 text-sm'>No checklists yet</p>}
                </div>

                {/* Comments */}
                <div className='mb-6'>
                  <div className='flex justify-between items-center mb-2'>
                    <h3 className='font-medium flex items-center'>
                      <svg className='h-5 w-5 mr-1 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2h-3l-4 4z' />
                      </svg>
                      Comments
                    </h3>
                  </div>

                  <div className='space-y-4'>
                    <div className='flex'>
                      <img src={currentUser?.avatar} alt={currentUser?.fullName} className='h-10 w-10 rounded-full mr-3' />
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
                          onKeyDown={async e => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              if (e.target.value.trim()) {
                                await addComment(activeCard.id, e.target.value);
                                e.target.value = '';
                              }
                            }
                          }}></textarea>
                        <div className='mt-2 flex justify-end'>
                          <button
                            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
                            onClick={async e => {
                              const text = e.target.previousElementSibling.value;
                              if (text.trim()) {
                                await addComment(activeCard.id, text);
                                e.target.previousElementSibling.value = '';
                              }
                            }}>
                            Comment
                          </button>
                        </div>
                      </div>
                    </div>

                    {getCardComments(activeCard.id).map(comment => (
                      <div key={comment.id} className='flex'>
                        <img src={getUserById(comment.userId)?.avatar} alt={getUserById(comment.userId)?.fullName} className='h-10 w-10 rounded-full mr-3' />
                        <div className='flex-1'>
                          <div className='bg-gray-50 p-3 rounded-lg'>
                            <div className='flex justify-between'>
                              <p className='font-medium'>{getUserById(comment.userId)?.fullName}</p>
                              <p className='text-xs text-gray-500'>{new Date(comment.timestamp || new Date().toISOString()).toLocaleString()}</p>
                            </div>
                            <p className='mt-1'>{comment.text}</p>
                            {comment.userId === currentUser?.id && (
                              <div className='mt-2 flex justify-end space-x-2'>
                                <button
                                  className='text-xs text-blue-500 hover:text-blue-700'
                                  onClick={async () => {
                                    const newText = prompt('Edit comment', comment.text);
                                    if (newText !== null) {
                                      await updateComment(comment.id, newText);
                                    }
                                  }}>
                                  Edit
                                </button>
                                <button
                                  className='text-xs text-red-500 hover:text-red-700'
                                  onClick={async () => {
                                    if (confirm('Delete this comment?')) {
                                      await deleteComment(comment.id);
                                    }
                                  }}>
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}

                    {getCardComments(activeCard.id).length === 0 && <p className='text-gray-500 text-sm text-center py-4'>No comments yet</p>}
                  </div>
                </div>

                {/* Activity */}
                <div>
                  <h3 className='font-medium mb-2 flex items-center'>
                    <svg className='h-5 w-5 mr-1 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                    Activity
                  </h3>

                  <div className='space-y-3'>
                    {getCardActivities(activeCard.id)
                      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                      .map(activity => (
                        <div key={activity.id} className='flex'>
                          <img src={getUserById(activity.userId)?.avatar} alt={getUserById(activity.userId)?.fullName} className='h-8 w-8 rounded-full mr-3' />
                          <div className='flex-1'>
                            <p className='text-sm'>
                              <span className='font-medium'>{getUserById(activity.userId)?.fullName}</span> {activity.message}
                            </p>
                            <p className='text-xs text-gray-500 mt-1'>{new Date(activity.timestamp).toLocaleString()}</p>
                          </div>
                        </div>
                      ))}

                    {getCardActivities(activeCard.id).length === 0 && <p className='text-gray-500 text-sm text-center py-4'>No activity yet</p>}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className='w-64 space-y-6'>
                {/* Add to card */}
                <div>
                  <h3 className='font-medium mb-2'>Add to card</h3>
                  <div className='space-y-2'>
                    <button
                      className='flex items-center w-full p-2 text-left bg-gray-100 hover:bg-gray-200 rounded'
                      onClick={async () => {
                        const userId = prompt('Enter user ID to add as member');
                        if (userId) {
                          await addCardMember(activeCard.id, userId);
                        }
                      }}>
                      <svg className='h-5 w-5 mr-2 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' />
                      </svg>
                      Members
                    </button>

                    <button
                      className='flex items-center w-full p-2 text-left bg-gray-100 hover:bg-gray-200 rounded'
                      onClick={async () => {
                        const labelId = prompt('Enter label ID to add to card');
                        if (labelId) {
                          await addLabelToCard(activeCard.id, labelId);
                        }
                      }}>
                      <svg className='h-5 w-5 mr-2 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' />
                      </svg>
                      Labels
                    </button>

                    <button
                      className='flex items-center w-full p-2 text-left bg-gray-100 hover:bg-gray-200 rounded'
                      onClick={async () => {
                        const hours = prompt('Enter hours spent');
                        if (hours) {
                          await updateCard(activeCard.id, {
                            timeSpent: activeCard.timeSpent + parseInt(hours),
                            timeRemaining: Math.max(0, activeCard.timeRemaining - parseInt(hours)),
                          });
                        }
                      }}>
                      <svg className='h-5 w-5 mr-2 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                      </svg>
                      Time Tracking
                    </button>

                    <button
                      className='flex items-center w-full p-2 text-left bg-gray-100 hover:bg-gray-200 rounded'
                      onClick={async () => {
                        const file = prompt('Enter file URL');
                        const filename = prompt('Enter filename');
                        if (file && filename) {
                          // This would need an API endpoint for attachments
                          alert('Attachment functionality would be implemented here');
                        }
                      }}>
                      <svg className='h-5 w-5 mr-2 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13' />
                      </svg>
                      Attachments
                    </button>

                    <button
                      className='flex items-center w-full p-2 text-left bg-gray-100 hover:bg-gray-200 rounded'
                      onClick={async () => {
                        const templateId = prompt('Enter template ID to apply');
                        if (templateId) {
                          const template = cardTemplates.find(t => t.id === parseInt(templateId));
                          if (template) {
                            await updateCard(activeCard.id, {
                              description: template.description || activeCard.description,
                              customFields: [
                                ...(activeCard.customFields || []),
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

                {/* Actions */}
                <div>
                  <h3 className='font-medium mb-2'>Actions</h3>
                  <div className='space-y-2'>
                    <button
                      className='flex items-center w-full p-2 text-left bg-gray-100 hover:bg-gray-200 rounded'
                      onClick={async () => {
                        const newTitle = prompt('Edit card title', activeCard.title);
                        if (newTitle !== null) {
                          await updateCard(activeCard.id, { title: newTitle });
                        }
                      }}>
                      <svg className='h-5 w-5 mr-2 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' />
                      </svg>
                      Edit
                    </button>

                    <button
                      className='flex items-center w-full p-2 text-left bg-gray-100 hover:bg-gray-200 rounded'
                      onClick={async () => {
                        const newDueDate = prompt('Set due date (YYYY-MM-DD)', activeCard.dueDate || '');
                        if (newDueDate !== null) {
                          await updateCard(activeCard.id, { dueDate: newDueDate });
                        }
                      }}>
                      <svg className='h-5 w-5 mr-2 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                      </svg>
                      Due Date
                    </button>

                    <button
                      className='flex items-center w-full p-2 text-left bg-gray-100 hover:bg-gray-200 rounded'
                      onClick={async () => {
                        const newListId = prompt('Move to list ID', activeCard.listId);
                        if (newListId) {
                          await moveCard(activeCard.id, newListId, 1); // Position will be adjusted by the backend
                        }
                      }}>
                      <svg className='h-5 w-5 mr-2 text-gray-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' />
                      </svg>
                      Move
                    </button>

                    <button
                      className='flex items-center w-full p-2 text-left bg-gray-100 hover:bg-gray-200 rounded'
                      onClick={async () => {
                        if (confirm('Move this card to archive?')) {
                          await deleteCard(activeCard.id);
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

                {/* Members */}
                <div>
                  <h3 className='font-medium mb-2'>Members</h3>
                  <div className='space-y-2'>
                    {getCardMembers(activeCard.id).length > 0 ? (
                      getCardMembers(activeCard.id).map(member => (
                        <div key={member.id} className='flex items-center'>
                          <img src={member.avatar} alt={member.fullName} className='h-8 w-8 rounded-full mr-2' />
                          <span>{member.fullName}</span>
                          <button
                            className='ml-auto text-red-500 hover:text-red-700'
                            onClick={async () => {
                              await removeCardMember(activeCard.id, member.id);
                            }}>
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

                {/* Labels */}
                <div>
                  <h3 className='font-medium mb-2'>Labels</h3>
                  <div className='flex flex-wrap gap-2'>
                    {getCardLabels(activeCard.id).length > 0 ? (
                      getCardLabels(activeCard.id).map(label => (
                        <div key={label.id} className='px-2 py-1 text-xs rounded-full flex items-center' style={{ backgroundColor: label.color }}>
                          {label.title}
                          <button
                            className='ml-1 text-white hover:text-gray-200'
                            onClick={async () => {
                              await removeLabelFromCard(activeCard.id, label.id);
                            }}>
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

                {/* Attachments */}
                <div>
                  <h3 className='font-medium mb-2'>Attachments</h3>
                  <div className='space-y-2'>
                    {getCardAttachments(activeCard.id).length > 0 ? (
                      getCardAttachments(activeCard.id).map(attachment => (
                        <div key={attachment.id} className='flex items-center'>
                          <a href={attachment.url} target='_blank' rel='noopener noreferrer' className='text-blue-500 hover:underline truncate'>
                            {attachment.filename}
                          </a>
                          <button
                            className='ml-auto text-red-500 hover:text-red-700'
                            onClick={() => {
                              // This would need an API endpoint for deleting attachments
                              alert('Attachment deletion would be implemented here');
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

                {/* Time Tracking */}
                <div>
                  <h3 className='font-medium mb-2'>Time Tracking</h3>
                  <div className='space-y-2'>
                    <div>
                      <p className='text-sm'>Estimated: {activeCard.estimateTime || 0}h</p>
                      <p className='text-sm'>Spent: {activeCard.timeSpent || 0}h</p>
                      <p className='text-sm'>Remaining: {activeCard.timeRemaining || 0}h</p>
                    </div>
                    <div className='h-2 bg-gray-200 rounded-full overflow-hidden'>
                      <div
                        className='h-full bg-green-500'
                        style={{
                          width: `${activeCard.estimateTime > 0 ? Math.min(100, (activeCard.timeSpent / activeCard.estimateTime) * 100) : 0}%`,
                        }}></div>
                    </div>
                  </div>
                </div>

                {/* Automation */}
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
        )}
      </Modal2>
    </div>
  );
}
