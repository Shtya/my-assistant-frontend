import { useState } from 'react';
import BoardHeader from '../components/kanban/BoardHeader';
import List from '@/components/kanban/List';
import CardDetails from '@/components/kanban/CardModal/CardDetails';
import FiltersModal from '@/components/kanban/Modals/FiltersModal';
import NotificationsModal from '@/components/kanban/Modals/NotificationsModal';
import AutomationRules from '@/components/kanban/AutomationRules';
import CodeReview from '@/components/kanban/CodeReview';
import { useBoardData } from '@/hooks/useBoardData';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';

export default function KanbanBoard() {
  const {
    currentBoardId,
    currentUser,
    boardTitle,
    lists,
    cards,
    filteredCards,
    users,
    labels,
    notifications,
    searchQuery,
    filter,
    activeCard,
    activeModal,
    setSearchQuery,
    setFilter,
    setActiveCard,
    setActiveModal,
    getCardMembers,
    getCardLabels,
    getCardComments,
    getCardChecklists,
    getChecklistItems,
    getCardActivities,
    getCardAttachments,
    createCard,
    updateCard,
    deleteCard,
    addComment,
    addChecklist,
    toggleChecklistItem,
    toggleCardLabel,
    toggleCardMember,
    markNotificationAsRead,
    logTime
  } = useBoardData();

  const { handleCardMove } = useDragAndDrop({ cards, updateCard });

  return (
    <div className="min-h-screen bg-gray-50">
      <BoardHeader
        boardTitle={boardTitle}
        currentUser={currentUser}
        unreadNotifications={notifications.filter(n => !n.read).length}
        onSearch={setSearchQuery}
        onFilterClick={() => setActiveModal('filters')}
        onNotificationsClick={() => setActiveModal('notifications')}
      />
      
      <div className="p-4 overflow-x-auto">
        <div className="flex space-x-4">
          {lists
            .filter(list => list.board_id === currentBoardId)
            .sort((a, b) => a.position - b.position)
            .map(list => (
              <List
                key={list.id}
                list={list}
                cards={filteredCards.filter(card => card.list_id === list.id)}
                onCardClick={setActiveCard}
                onCreateCard={(listId, title) => {
                  createCard(listId, title);
                }}
                onCardMove={handleCardMove}
              />
            ))}
          
          <button 
            className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg p-3 min-w-[280px] h-fit"
            onClick={() => {
              const title = prompt("Enter list title");
              if (title) {
                const newList = {
                  id: Math.max(...lists.map(l => l.id), 0) + 1,
                  title,
                  board_id: currentBoardId,
                  position: lists.filter(l => l.board_id === currentBoardId).length + 1
                };
                // In a real app, you would call an API to create the list
                setLists([...lists, newList]);
              }
            }}
          >
            <PlusIcon />
            Add another list
          </button>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <AutomationRules 
            boardId={currentBoardId}
            onCreateRule={(rule) => {
              // In a real app, save to backend
              console.log("New automation rule:", rule);
              alert(`Rule created: When ${rule.trigger}, if ${rule.condition}, then ${rule.action}`);
            }}
          />
          
          {activeCard && (
            <CodeReview 
              cardId={activeCard.id}
              repoUrl={activeCard.repoUrl || null}
            />
          )}
        </div>
      </div>
      
      {/* Modals */}
      {activeModal === 'filters' && (
        <FiltersModal
          users={users}
          labels={labels.filter(l => l.board_id === currentBoardId)}
          filter={filter}
          onFilterChange={setFilter}
          onClose={() => setActiveModal(null)}
        />
      )}
      
      {activeModal === 'notifications' && (
        <NotificationsModal
          notifications={notifications}
          currentUserId={currentUser.id}
          onMarkAsRead={markNotificationAsRead}
          onOpenCard={(cardId) => {
            const card = cards.find(c => c.id === cardId);
            if (card) {
              setActiveCard(card);
              setActiveModal('card-details');
            }
          }}
          onClose={() => setActiveModal(null)}
        />
      )}
      
      {activeModal === 'card-details' && activeCard && (
        <CardDetails
          card={activeCard}
          boardData={{
            users,
            labels: labels.filter(l => l.board_id === currentBoardId),
            lists
          }}
          currentUser={currentUser}
          onClose={() => setActiveModal(null)}
          onUpdate={updateCard}
          onAddComment={addComment}
          onAddChecklist={addChecklist}
          onToggleChecklistItem={toggleChecklistItem}
          onAddAttachment={(cardId, file) => {
            // In a real app, upload file and get URL
            const newAttachment = {
              id: Math.max(...attachments.map(a => a.id), 0) + 1,
              url: file.url,
              filename: file.name,
              card_id: cardId
            };
            setAttachments([...attachments, newAttachment]);
          }}
          onDeleteAttachment={(id) => {
            setAttachments(attachments.filter(a => a.id !== id));
          }}
          onLogTime={logTime}
          onAddMember={(cardId, userId) => toggleCardMember(cardId, userId)}
          onRemoveMember={(cardId, userId) => toggleCardMember(cardId, userId)}
          onAddLabel={(cardId, labelId) => toggleCardLabel(cardId, labelId)}
          onRemoveLabel={(cardId, labelId) => toggleCardLabel(cardId, labelId)}
        />
      )}
    </div>
  );
}

function PlusIcon() {
  return (
    <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  );
}