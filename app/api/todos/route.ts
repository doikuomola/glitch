import connectMongoDB from '@/lib/mongodb';
import Todo from '@/models/todo';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { title, todo } = await request.json();

    await connectMongoDB();

    await Todo.create({ title, todo });

    return NextResponse.json({ message: 'Todo created' }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error: ', error },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    await connectMongoDB();
    const todos = await Todo.find().sort([['createdAt', -1]]);
    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error: ', error },
      { status: 500 }
    );
  }
}
