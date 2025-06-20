import dbConnect from '@/lib/mongodb';
import BoardModel from '@/entities/Column';

export async function PUT(req, { params }) {
  await dbConnect();
  const { isChecked } = await req.json();
  const board = await BoardModel.findById(params.boardId);
  const task = board.columns.id(params.columnId).cards.id(params.cardId).tasks.id(params.taskId);
  task.isChecked = isChecked;
  await board.save();
  return Response.json(board);
}

export async function DELETE(_, { params }) {
  await dbConnect();
  const board = await BoardModel.findById(params.boardId);
  const card = board.columns.id(params.columnId).cards.id(params.cardId);
  card.tasks.id(params.taskId).remove();
  await board.save();
  return Response.json(board);
}