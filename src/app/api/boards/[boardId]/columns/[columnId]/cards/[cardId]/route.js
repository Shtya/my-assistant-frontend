import dbConnect from '@/lib/mongodb';
import BoardModel from '@/entities/Column';

export async function PUT(req, context) {
  const {boardId , cardId , columnId} = await context.params
  await dbConnect();
  const { title } = await req.json();
  const board = await BoardModel.findById(boardId);
  const card = board.columns.id(columnId).cards.id(cardId);
  card.title = title;
  await board.save();
  return Response.json(board);
}


export async function DELETE(req, context) {
    const {boardId , cardId , columnId} = await context.params

  await dbConnect();
  const board = await BoardModel.findById(boardId);
  const column = board.columns.id(columnId);

  if (!column) {
    return new Response('Column not found', { status: 404 });
  }

  const card = column.cards.id(cardId);

  if (!card) {
    return new Response('Card not found', { status: 404 });
  }

  card.deleteOne(); // or column.cards.pull(card._id);
  await board.save();

  return Response.json(board);
}