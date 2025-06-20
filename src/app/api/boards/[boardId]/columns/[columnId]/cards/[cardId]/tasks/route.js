import dbConnect from '@/lib/mongodb';
import BoardModel from '@/entities/Column';

export async function POST(req, context) {
    const {boardId , columnId , cardId} = await context.params

  await dbConnect();
  const { title } = await req.json();
  const board = await BoardModel.findById(boardId);
  const card = board.columns.id(columnId).cards.id(cardId);
  const newOrder = card.tasks.length;

  card.tasks.push({ title , order:newOrder });
  await board.save();
  return Response.json(board);
}