import CardActions from './CardActions';
import CardComments from './CardComments';
import CardChecklists from './CardChecklists';
import CardActivity from './CardActivity';

export default function CardDetails({ 
  card, 
  boardData,
  currentUser,
  onClose,
  onUpdate,
  onAddComment,
  onAddChecklist,
  onToggleChecklistItem,
  onAddAttachment,
  onDeleteAttachment,
  onLogTime,
  onAddMember,
  onRemoveMember,
  onAddLabel,
  onRemoveLabel
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 pt-10 pb-10 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-4xl">
        <ModalHeader 
          card={card} 
          boardData={boardData}
          onClose={onClose}
        />
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <DescriptionSection 
              card={card}
              onUpdate={onUpdate}
            />
            
            <CardChecklists
              card={card}
              onAddChecklist={onAddChecklist}
              onToggleChecklistItem={onToggleChecklistItem}
            />
            
            <CardComments
              card={card}
              currentUser={currentUser}
              onAddComment={onAddComment}
            />
            
            <CardActivity
              card={card}
              boardData={boardData}
            />
          </div>
          
          <CardActions
            card={card}
            boardData={boardData}
            currentUser={currentUser}
            onUpdate={onUpdate}
            onAddMember={onAddMember}
            onRemoveMember={onRemoveMember}
            onAddLabel={onAddLabel}
            onRemoveLabel={onRemoveLabel}
            onAddAttachment={onAddAttachment}
            onDeleteAttachment={onDeleteAttachment}
            onLogTime={onLogTime}
          />
        </div>
      </div>
    </div>
  );
}