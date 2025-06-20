// /api/boards/[boardId]/columns/[columnId]/route.js
import dbConnect from '@/lib/mongodb';
import BoardModel from '@/entities/Column';

export async function PUT(req, context) {
  await dbConnect();
  const { boardId, columnId } = await context.params;
  const { title } = await req.json();

  const board = await BoardModel.findById(boardId);
  const column = board.columns.id(columnId);
  if (!column) return new Response('Column not found', { status: 404 });

  column.title = title;
  await board.save();

  return Response.json({ message: 'Column updated', columns: board.columns });
}


export async function DELETE(req, context) {
  await dbConnect();
  const { boardId, columnId } = await context.params;

  const board = await BoardModel.findById(boardId);
  board.columns = board.columns.filter(col => col._id.toString() !== columnId);
  await board.save();

  return Response.json({ message: 'Column deleted', columns: board.columns });
}