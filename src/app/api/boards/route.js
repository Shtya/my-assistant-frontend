import dbConnect from '@/lib/mongodb';
import BoardModel from '@/entities/Column';

export async function GET() {
  await dbConnect();
  const boards = await BoardModel.find();
  return Response.json(boards);
}

export async function POST(req) {
  await dbConnect();
  const { title } = await req.json();
  const board = await BoardModel.create({ title, columns: [] });
  return Response.json(board);
}