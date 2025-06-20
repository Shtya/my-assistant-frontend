import Card from './Card';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../utils/dragAndDrop';

export default function List({ 
  list, 
  cards, 
  onCardClick, 
  onCreateCard,
  onCardMove 
}) {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item) => onCardMove(item.id, list.id),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div 
      ref={drop}
      className={`flex-1 bg-gray-100 rounded-lg p-3 min-w-[280px] ${
        isOver ? 'bg-gray-200' : ''
      }`}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-medium">{list.title}</h3>
        <span className="text-sm text-gray-500">{cards.length}</span>
      </div>
      
      <div className="space-y-3">
        {cards.map(card => (
          <Card 
            key={card.id} 
            card={card} 
            onClick={() => onCardClick(card)}
          />
        ))}
      </div>
      
      <button 
        className="w-full mt-3 p-2 text-gray-500 hover:bg-gray-200 rounded-lg text-left flex items-center"
        onClick={() => {
          const title = prompt("Enter card title");
          if (title) onCreateCard(list.id, title);
        }}
      >
        <PlusIcon />
        Add a card
      </button>
    </div>
  );
}