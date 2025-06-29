import { writeFile, readFile } from 'fs/promises';
import path from 'path';

export async function POST(req) {
  try {
    const data = await req.json();
    const filePath = path.join(process.cwd(), 'data', 'programming-question.json');

    // Read existing data
    let existingData = [];
    try {
      const fileData = await readFile(filePath, 'utf-8');
      existingData = JSON.parse(fileData);
    } catch (error) {
      console.log('Creating new data file');
    }

    // Handle different operations
    if (data.action === 'add') {
      const newQuestion = {
        ...data.question,
        isChecked: false
      };
      existingData.push(newQuestion);
    } else if (data.action === 'edit') {
      const index = existingData.findIndex(q => q.id === data.question.id);
      if (index !== -1) {
        existingData[index] = {
          ...data.question,
          isChecked: data.question.isChecked !== undefined ? data.question.isChecked : existingData[index].isChecked
        };
      } else {
        return new Response(JSON.stringify({ message: 'Question not found' }), {
          status: 404,
        });
      }
    } else if (data.action === 'delete') {
      existingData = existingData.filter(q => q.id !== data.id);
    } else if (data.action === 'toggleCheck') {
      const index = existingData.findIndex(q => q.id === data.id);
      if (index !== -1) {
        existingData[index].isChecked = !existingData[index].isChecked;
      } else {
        return new Response(JSON.stringify({ message: 'Question not found' }), {
          status: 404,
        });
      }
    } else {
      // Default action (replace all data)
      existingData = data;
    }

    // Save updated data
    await writeFile(filePath, JSON.stringify(existingData, null, 2), 'utf-8');

    return new Response(JSON.stringify({ message: 'Operation completed successfully' }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Failed to complete operation' }), {
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'data', 'programming-question.json');
    const fileData = await readFile(filePath, 'utf-8');
    const data = JSON.parse(fileData);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Failed to load data' }), {
      status: 500,
    });
  }
}