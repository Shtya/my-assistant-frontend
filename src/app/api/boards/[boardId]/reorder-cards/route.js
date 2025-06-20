import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Board from '@/entities/Column';

export async function PATCH(req, context) {
    const { boardId } = await context.params;
    const { sourceColumnId, destColumnId, cards } = await req.json();

    if (!cards || typeof cards !== 'object') {
        return NextResponse.json({ message: 'Invalid cards structure' }, { status: 400 });
    }

    try {
        await dbConnect();

        const board = await Board.findById(boardId);
        if (!board) {
            return NextResponse.json({ message: 'Board not found' }, { status: 404 });
        }

        const updateColumnCards = (columnId, cardList) => {
            const column = board.columns.id(columnId);
            if (column) {
                column.cards.forEach(card => {
                    const match = cardList.find(c => c.cardId === card._id.toString());
                    if (match) card.order = match.order;
                });
            }
        };

        if (cards[sourceColumnId]) updateColumnCards(sourceColumnId, cards[sourceColumnId]);
        if (sourceColumnId !== destColumnId && cards[destColumnId]) {
            updateColumnCards(destColumnId, cards[destColumnId]);
        }

        await board.save();
        return NextResponse.json({ message: 'Cards reordered' });
    } catch (error) {
        console.error('Error in reorder-cards:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
