import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { DeleteColumn, EditColumn } from './ActionColumns';
import { Grip, Trash2 } from 'lucide-react';
import { AddCard, DeleteCard, EditCard } from './ActionCard';

function reorderList(list) {
    return list.map((item, index) => ({ ...item, order: index }));
}

export default function BoardView({ columns, setColumns, selectedBoardId }) {
    const handleDragEnd = async result => {
        const { source, destination, type } = result;
        if (!destination) return;

        if (type === 'COLUMN') {
            if (source.index === destination.index) return;

            const reordered = Array.from(columns);
            const [removed] = reordered.splice(source.index, 1);
            reordered.splice(destination.index, 0, removed);

            const updated = reorderList(reordered);
            setColumns(updated);

            await fetch(`/api/boards/${selectedBoardId}/reorder-columns`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updated.map(col => ({ columnId: col._id, order: col.order }))),
            });
        } else if (type === 'CARD') {
            if (source.droppableId === destination.droppableId && source.index === destination.index) return;

            const updatedColumns = [...columns];
            const sourceColIndex = updatedColumns.findIndex(col => col._id === source.droppableId);
            const destColIndex = updatedColumns.findIndex(col => col._id === destination.droppableId);

            const sourceCol = { ...updatedColumns[sourceColIndex] };
            const destCol = { ...updatedColumns[destColIndex] };

            const [movedCard] = sourceCol.cards.splice(source.index, 1);
            destCol.cards.splice(destination.index, 0, movedCard);

            sourceCol.cards = reorderList(sourceCol.cards);
            destCol.cards = reorderList(destCol.cards);

            updatedColumns[sourceColIndex] = sourceCol;
            updatedColumns[destColIndex] = destCol;

            setColumns(updatedColumns);

            await fetch(`/api/boards/${selectedBoardId}/reorder-cards`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sourceColumnId: sourceCol._id,
                    destColumnId: destCol._id,
                    cards: {
                        [sourceCol._id]: sourceCol.cards.map((c, i) => ({ cardId: c._id, order: i })),
                        [destCol._id]: destCol.cards.map((c, i) => ({ cardId: c._id, order: i })),
                    },
                }),
            });
        }
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId='columns' direction='horizontal' type='COLUMN'>
                {provided => (
                    <div className='flex gap-4' ref={provided.innerRef} {...provided.droppableProps}>
                        {columns
                            .sort((a, b) => a.order - b.order)
                            .map((column, index) => (
                                <Draggable draggableId={column._id} index={index} key={column._id}>
                                    {provided => (
                                        <div ref={provided.innerRef} {...provided.draggableProps} className=' card !w-[320px]  duration-500 transition-colors h-fit text-text-base rounded-lg !p-3' id={`card-${column._id}`}>
                                            <div className='  flex justify-between items-center mb-2 w-full'>
                                                <span
                                                    {...provided.dragHandleProps}
                                                    className=' mt-1 cursor-move text-xl mr-[5px] text-gray-400'
                                                    title='Drag to reorder'
                                                    onMouseEnter={() => {
                                                        const card = document.getElementById(`card-${column._id}`);
                                                        if (card) card.classList.add('bg-black/20');
                                                    }}
                                                    onMouseLeave={() => {
                                                        const card = document.getElementById(`card-${column._id}`);
                                                        if (card) card.classList.remove('bg-black/20');
                                                    }}>
                                                    {' '}
                                                    <Grip size={14} />{' '}
                                                </span>
                                                <EditColumn title={column.title} id={column._id} selectedBoardId={selectedBoardId} setColumns={setColumns} />
                                                <DeleteColumn id={column._id} selectedBoardId={selectedBoardId} setColumns={setColumns} />
                                            </div>

                                            <Droppable droppableId={column._id} type='CARD'>
                                                {provided => (
                                                    <div className="w-full" ref={provided.innerRef} {...provided.droppableProps}>
                                                        {column.cards
                                                            .sort((a, b) => a.order - b.order)
                                                            .map((card, idx) => (
                                                                <Draggable draggableId={card._id} index={idx} key={card._id}>
                                                                    {provided => (
                                                                        <div id={`task-${card._id}`} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className=' w-full duration-500 transition-colors bg-bg-1-hover rounded px-3 py-2 text-sm mb-2'>
                                                                            <div className='flex justify-between items-center'>
                                                                                <span
                                                                                    className=' mt-1 cursor-move text-xl mr-[5px] text-gray-400'
                                                                                    title='Drag to reorder'
                                                                                    onMouseEnter={() => {
                                                                                        const task = document.getElementById(`task-${card._id}`);
                                                                                        if (task) task.classList.add('bg-black/20');
                                                                                    }}
                                                                                    onMouseLeave={() => {
                                                                                        const task = document.getElementById(`task-${card._id}`);
                                                                                        if (task) task.classList.remove('bg-black/20');
                                                                                    }}>
                                                                                    {' '}
                                                                                    <Grip size={14} />{' '}
                                                                                </span>
                                                                                <EditCard column={column} card={card} setColumns={setColumns} selectedBoardId={selectedBoardId} />
                                                                                <DeleteCard column={column} card={card} setColumns={setColumns} selectedBoardId={selectedBoardId} />
                                                                            </div>

                                                                            <div className='space-y-1 mt-1'>
                                                                                {card.tasks
                                                                                    .sort((a, b) => a.order - b.order)
                                                                                    .map(task => (
                                                                                        <div key={task._id} className='flex justify-between items-center text-xs bg-gray-600 px-2 py-1 rounded'>
                                                                                            <label className='flex items-center gap-1'>
                                                                                                {/* <input type='checkbox' checked={task.isChecked} onChange={() => toggleTask(column._id, card._id, task)} /> */}
                                                                                                <span className={task.isChecked ? 'line-through' : ''}>{task.title}</span>
                                                                                            </label>
                                                                                            <Trash2 size={12} className='cursor-pointer text-red-400' />
                                                                                        </div>
                                                                                    ))}
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </Draggable>
                                                            ))}
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Droppable>

                                            <AddCard columnId={column._id} selectedBoardId={selectedBoardId} setColumns={setColumns} cn='mt-2 text-white text-sm font-medium px-2 py-1 hover:bg-bg-1-hover rounded cursor-pointer' />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}
