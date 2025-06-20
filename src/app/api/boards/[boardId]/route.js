import dbConnect from '@/lib/mongodb';
import BoardModel from '@/entities/Column';

export async function GET(_, context) {
  await dbConnect();
  const {boardId} = await context.params
  const board = await BoardModel.findById(boardId);
  return Response.json(board);
}


export async function DELETE(_, context) {
  const { boardId } = await context.params;

  await dbConnect();

  const board = await BoardModel.findById(boardId);
  if (!board) {
    return new Response('Board not found', { status: 404 });
  }

  await board.deleteOne();

  return Response.json({ message: 'Board deleted successfully' });
}