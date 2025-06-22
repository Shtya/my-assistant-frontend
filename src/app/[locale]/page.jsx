'use client';
import AddList from '@/components/kanban/AddList';
import Header from '@/components/kanban/Header';
import List from '@/components/kanban/List';
import AIAssistantModal from '@/components/kanban/Modal/AIAssistantModal';
import BoardSettingsModal from '@/components/kanban/Modal/BoardSettingsModal';
import CardDetailsModal from '@/components/kanban/Modal/CardDetailsModal';
import CreateBoard from '@/components/kanban/Modal/CreateBoard';
import FiltersModal from '@/components/kanban/Modal/FiltersModal';
import NotificationsModal from '@/components/kanban/Modal/NotificationsModal';
import SelectBoard from '@/components/kanban/Modal/SelectBoard';
import Dialog from '@/components/molecules/Dialog';
import Animation from '@/components/pages/islamic/Animation';
import { useValues } from '@/context/Context';
import { useRouter } from '@/i18n/navigation';
import { Reorder } from 'framer-motion';
import { Eye, EyeClosedIcon, EyeIcon, PlusIcon, Sparkles, SparklesIcon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function KanbanBoard() {
    const router = useRouter();
    const { checkAutomationRules, updateCard, closeModal, filteredCards, currentBoard, boardLists, boardLabels, boardCustomFields, userBoards, dragItem, dragOverItem, activeCard, setActiveCard, activeModal, setActiveModal, notifications, setNotifications, searchQuery, setSearchQuery, currentBoardId, setCurrentBoardId, showBoardSelector, setShowBoardSelector, inviteEmail, setInviteEmail, focusMode, setFocusMode, focusedUserId, setFocusedUserId, filter, setFilter, users, setUsers, currentUser, setCurrentUser, boards, setBoards, boardMembers, setBoardMembers, lists, setLists, cards, setCards, cardMembers, setCardMembers, labels, setLabels, cardLabels, setCardLabels, attachments, setAttachments, comments, setComments, checklists, setChecklists, checklistItems, setChecklistItems, activities, setActivities, notificationsData, setNotificationsData, aiQuery, setAiQuery, aiResponse, setAiResponse, isAiProcessing, setIsAiProcessing, riskItems, setRiskItems, predictions, setPredictions, automationRules, setAutomationRules, cardTemplates, setCardTemplates, customFieldDefinitions, setCustomFieldDefinitions, collapsed, setCollapsed, getUserById, getCardMembers, getCardLabels, getCardAttachments, getCardComments, getCardChecklists, getChecklistItems, getCardActivities, getBoardMembers } = useValues();

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

    // Analyze cards for potential risks
    const analyzeRisks = () => {
        // In a real app, this would use more sophisticated analysis
        const risks = cards
            .filter(card => {
                // Cards approaching due date
                if (card.due_date && new Date(card.due_date) < new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) && card.status !== 'done') {
                    return true;
                }

                // Cards with high time spent vs estimated
                if (card.estimate_time > 0 && card.time_spent / card.estimate_time > 1.5) {
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
                riskType: card.due_date && new Date(card.due_date) < new Date() ? 'Overdue' : card.status === 'blocked' ? 'Blocked' : card.time_spent / card.estimate_time > 1.5 ? 'Time Overrun' : 'Due Soon',
                severity: card.due_date && new Date(card.due_date) < new Date() ? 'High' : 'Medium',
            }));

        setRiskItems(risks);
    };

    const generatePredictions = () => {
        const now = new Date();
        const predictions = cards
            .filter(card => card.status !== 'done' && card.due_date)
            .map(card => {
                const dueDate = new Date(card.due_date);
                const daysRemaining = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));
                const progress = card.estimate_time > 0 ? card.time_spent / card.estimate_time : 0;

                let prediction = 'On Track';
                if (daysRemaining < 0) {
                    prediction = 'Late';
                } else if (daysRemaining < 3 && progress < 0.8) {
                    prediction = 'At Risk';
                } else if (progress < 0.5 && daysRemaining < card.estimate_time - card.time_spent) {
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

    return (
        <div className='min-h-screen rtl:mr-[10px] ltr:ml-[10px] w-[calc(100%-10px)] relative'>
            <Header />

            <div className='py-4 rtl:pl-[10px] ltr:pr-[10px] overflow-x-auto  '>
                <div className='overflow-x-auto min-h-[calc(100vh-110px)]'>
                    <Reorder.Group
                        axis='x'
                        values={boardLists}
                        onReorder={newOrder => {
                            const updatedLists = newOrder.map((list, index) => ({ ...list, position: index + 1 }));
                            setLists(updatedLists);
                        }}
                        className='flex space-x-4'>
                        {boardLists.map(list => (
                            <Reorder.Item
                                key={list.id}
                                value={list}
                                whileDrag={{
                                    scale: 1.03,
                                    boxShadow: '0px 10px 15px rgba(0,0,0,0.1)',
                                    zIndex: 10,
                                }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                                <List list={list} />
                            </Reorder.Item>
                        ))}

                        <AddList />
                    </Reorder.Group>
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
                                        {getBoardMembers(board.id).length} members • {lists.filter(l => l.board_id === board.id).length} lists
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

            <Dialog title={<h2 className='text-xl font-bold'>Create New Board</h2>} width={"400px"} open={activeModal === 'create-board'}  onClose={() => setActiveModal(null)} cn='bg-white'>
                <CreateBoard />
            </Dialog>


            <Dialog title={<h2 className='text-xl font-bold'>Your Boards</h2>} width={"400px"} open={activeModal === 'board-selector'}  onClose={() => setActiveModal(null)} cn='bg-white'>
                <SelectBoard />
            </Dialog>


            <Dialog title={<h2 className='text-xl font-bold'>Notifications</h2>} height='230px' width={"400px"} open={activeModal === 'notifications'}  onClose={() => setActiveModal(null)} cn='bg-white'>
                <NotificationsModal />
            </Dialog>


            {/* use t here */}
            <Dialog title={<h2 className='text-xl font-bold'>Board Settings</h2>} height='70%' width={"400px"} open={activeModal === 'board-settings'}  onClose={() => setActiveModal(null)} cn='bg-white'>
                <BoardSettingsModal />
            </Dialog>


            {/* use t here */}
            <Dialog title={<h2 className='text-2xl font-bold flex items-center gap-2'><SparklesIcon className='text-blue-500' size={20} />AI Assistant</h2>} height='70%' width={"400px"} open={activeModal === 'ai-assistant'}  onClose={() => setActiveModal(null)} cn='bg-white'>
                <AIAssistantModal />
            </Dialog>

            <Dialog title={<h2 className='text-2xl font-bold flex items-center gap-2'> Filter Tasks </h2>} height='70%' width={"400px"} open={activeModal === 'filters'}  onClose={() => setActiveModal(null)} cn='bg-white'>
                <FiltersModal />
            </Dialog>
            <Dialog height='90%' width={"80%"} open={activeModal === 'card-details'}  onClose={() => setActiveModal(null)} cn='bg-white'>
                <CardDetailsModal />
            </Dialog>
        </div>
    );
}
