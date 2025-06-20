import dbConnect from '@/lib/mongodb';
import BoardModel from '@/entities/Column';

export async function POST(req, context) {

  const { boardId } = await context.params;


  await dbConnect();
  const { title } = await req.json();
  const board = await BoardModel.findById(boardId);
  const newOrder = board.columns.length;

  board.columns.push({ title, cards: [] , order: newOrder });
  await board.save();
  return Response.json(board);
}