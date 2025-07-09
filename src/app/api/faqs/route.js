// app/api/faqs/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import FAQ from '@/entities/FAQ';

export async function GET(request) {
  await connectDB();

  // Get categories if requested
  const { searchParams } = new URL(request.url);
  const categoriesOnly = searchParams.get('categoriesOnly');

  if (categoriesOnly) {
    const categories = await FAQ.distinct('category');
    return NextResponse.json(categories);
  }

  const faqs = await FAQ.find().sort({ createdAt: -1 });
  return NextResponse.json(faqs);
}

export async function POST(request) {
  await connectDB();
  try {
    const body = await request.json();

    // Handle bulk import
    if (Array.isArray(body)) {
      const inserted = await FAQ.insertMany(body);
      return NextResponse.json(inserted);
    }

    // Single FAQ creation
    const newFAQ = new FAQ(body);
    await newFAQ.save();
    return NextResponse.json(newFAQ);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PUT(request) {
  await connectDB();
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();

    const updatedFAQ = await FAQ.findByIdAndUpdate(id, body, { new: true, runValidators: true });

    if (!updatedFAQ) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
    }

    return NextResponse.json(updatedFAQ);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request) {
  await connectDB();
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const deletedFAQ = await FAQ.findByIdAndDelete(id);

    if (!deletedFAQ) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'FAQ deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PATCH(request) {
  await connectDB();

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const body = await request.json();

    const updatedFAQ = await FAQ.findByIdAndUpdate(id, { isRead: body.isRead }, { new: true });

    if (!updatedFAQ) {
      return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
    }

    return NextResponse.json(updatedFAQ);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}