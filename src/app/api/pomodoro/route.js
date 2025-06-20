// app/api/pomodoro/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb'; // your db connection file
import Pomodoro from '@/entities/Pomodor';

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 });

  let doc = await Pomodoro.findOne({ userId });
  if (!doc) {
    doc = await Pomodoro.create({ userId }); // initialize with defaults
  }

  return NextResponse.json(doc);
}

export async function PUT(req) {
  await connectDB();
  const body = await req.json();
  const { userId, settings } = body;

  if (!userId) return NextResponse.json({ error: 'Missing userId' }, { status: 400 });

  const updated = await Pomodoro.findOneAndUpdate(
    { userId },
    { $set: { settings, updatedAt: new Date() } },
    { new: true, upsert: true }
  );

  return NextResponse.json(updated);
}
