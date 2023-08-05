import connectMongoDB from '@/lib/mongodb';
import Todo from '@/models/todo';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    await connectMongoDB();

    const todo = await Todo.findById(id);

    if (!todo)
      return NextResponse.json(
        { message: 'Todo with this id not found!' },
        { status: 404 }
      );

    return NextResponse.json(todo, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const { newTitle: title, newTodo: todo } = await request.json();

    await connectMongoDB();

    const todoExists = await Todo.findById(id);

    if (!todoExists)
      return NextResponse.json(
        { message: 'Todo with this id not found!' },
        { status: 404 }
      );

    await Todo.findByIdAndUpdate(id, { title, todo });

    return NextResponse.json({ message: 'Todo updated' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    await connectMongoDB();

    const todo = await Todo.findById(id);

    if (!todo)
      return NextResponse.json(
        { message: 'Todo with this id not found!' },
        { status: 404 }
      );

    await Todo.findByIdAndDelete(id);

    return NextResponse.json(
      { message: 'Todo has been deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error', error },
      { status: 500 }
    );
  }
}
