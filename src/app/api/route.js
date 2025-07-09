import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connect() {
  await client.connect();
  return client.db('knowledgebase');
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const category = searchParams.get('category');
    
    const db = await connect();
    let query = {};
    
    if (category && category !== 'All') {
      query = { category };
    }

    const collection = type === 'problems' ? 'problems' : 'questions';
    const items = await db.collection(collection).find(query).toArray();
    
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}

export async function POST(request) {
  try {
    const db = await connect();
    const data = await request.json();
    const { action, type, id, ...rest } = data;

    if (action === 'add') {
      const collection = type === 'problems' ? 'problems' : 'questions';
      const newItem = {
        ...rest,
        dateAdded: new Date()
      };
      
      const result = await db.collection(collection).insertOne(newItem);
      return NextResponse.json({ ...newItem, _id: result.insertedId });
    }

    if (action === 'delete') {
      const collection = type === 'problems' ? 'problems' : 'questions';
      await db.collection(collection).deleteOne({ _id: new ObjectId(id) });
      return NextResponse.json({ success: true });
    }

    if (action === 'edit') {
      const collection = type === 'problems' ? 'problems' : 'questions';
      await db.collection(collection).updateOne(
        { _id: new ObjectId(id) },
        { $set: rest }
      );
      const updated = await db.collection(collection).findOne({ _id: new ObjectId(id) });
      return NextResponse.json(updated);
    }

    if (action === 'toggleCheck') {
      const collection = type === 'problems' ? 'problems' : 'questions';
      const item = await db.collection(collection).findOne({ _id: new ObjectId(id) });
      await db.collection(collection).updateOne(
        { _id: new ObjectId(id) },
        { $set: { isChecked: !item.isChecked } }
      );
      return NextResponse.json({ success: true, isChecked: !item.isChecked });
    }

    if (action === 'import') {
      const collection = type === 'problems' ? 'problems' : 'questions';
      await db.collection(collection).deleteMany({});
      
      const items = rest.data.map(item => ({
        ...item,
        dateAdded: item.dateAdded ? new Date(item.dateAdded) : new Date(),
        _id: new ObjectId(item._id || undefined)
      }));
      
      const result = await db.collection(collection).insertMany(items);
      return NextResponse.json(items);
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}