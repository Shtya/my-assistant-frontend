// app/api/problems/route.js
import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Problem from '@/entities/Problem'

export async function GET(request) {
  await connectDB()
  
  // Get categories if requested
  const { searchParams } = new URL(request.url)
  const categoriesOnly = searchParams.get('categoriesOnly')
  
  if (categoriesOnly) {
    const categories = await Problem.distinct('category')
    return NextResponse.json(categories)
  }

  const problems = await Problem.find().sort({ createdAt: -1 })
  return NextResponse.json(problems)
}

export async function POST(request) {
  await connectDB()
  try {
    const body = await request.json()
    
    if (Array.isArray(body)) {
      const inserted = await Problem.insertMany(body)
      return NextResponse.json(inserted)
    }
    
    // Single Problem creation
    const newProblem = new Problem(body)
    await newProblem.save()
    return NextResponse.json(newProblem)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

export async function PUT(request) {
  await connectDB()
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const body = await request.json()
    
    const updatedProblem = await Problem.findByIdAndUpdate(
      id, 
      body, 
      { new: true, runValidators: true }
    )
    
    if (!updatedProblem) {
      return NextResponse.json({ error: 'Problem not found' }, { status: 404 })
    }
    
    return NextResponse.json(updatedProblem)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

export async function DELETE(request) {
  await connectDB()
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    const deletedProblem = await Problem.findByIdAndDelete(id)
    
    if (!deletedProblem) {
      return NextResponse.json({ error: 'Problem not found' }, { status: 404 })
    }
    
    return NextResponse.json({ message: 'Problem deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

export async function PATCH(request) {
  await connectDB()
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const body = await request.json()
    
    const updatedProblem = await Problem.findByIdAndUpdate(
      id, 
      { isRead: body.isRead }, 
      { new: true }
    )
    
    if (!updatedProblem) {
      return NextResponse.json({ error: 'Problem not found' }, { status: 404 })
    }
    
    return NextResponse.json(updatedProblem)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}