import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb'; // adjust path as needed
import Board from '@/entities/Column'; // adjust model path

export async function PATCH(req, context) {
    // 👇 await FIRST, then read properties
    const { boardId } = await context.params;

    const updatedOrders = await req.json(); 

    if (!Array.isArray(updatedOrders)) {
        return NextResponse.json({ message: 'Invalid format' }, { status: 400 });
    }

    try {
        await dbConnect();

        const board = await Board.findById(boardId);
        if (!board) {
            return NextResponse.json({ message: 'Board not found' }, { status: 404 });
        }

        updatedOrders.forEach(({ columnId, order }) => {
            const column = board.columns.id(columnId);
            if (column) {
                column.order = order;
            }
        });

        await board.save();

        return NextResponse.json({ message: 'Columns reordered', columns: board.columns });
    } catch (error) {
        console.error('Error in reorder-columns:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
