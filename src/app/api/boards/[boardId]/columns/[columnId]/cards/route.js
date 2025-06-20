import dbConnect from '@/lib/mongodb';
import BoardModel from '@/entities/Column';

export async function POST(req, context) {
    const {boardId , columnId} = await context.params

  await dbConnect();
  const { title } = await req.json();
  const board = await BoardModel.findById(boardId);
  const column = board.columns.id(columnId);

  const newOrder = column.cards.length;


  column.cards.push({ title, tasks: [] , order : newOrder });
  await board.save();
  return Response.json(board);
}