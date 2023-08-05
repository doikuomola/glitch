'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

type EditTodoFormProps = {
  id: string;
  title: string;
  todo: string;
};

export default function EditTodoForm({ id, title, todo }: EditTodoFormProps) {
  const [newTitle, setNewTitle] = useState(title);
  const [newTodo, setNewTodo] = useState(todo);
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleTextAreaEdit = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (!newTitle || !newTodo) {
        alert('Title and todo are required!');
        return;
      }

      const res = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          newTitle,
          newTodo,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to update todo!');
      }

      router.refresh();
      router.push('/');
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto py-10 flex flex-col gap-3"
    >
      <h2 className="">Update Todo</h2>
      <input
        type="text"
        placeholder="Title"
        value={newTitle}
        onChange={handleChange}
        className="w-full rounded-lg focus:border border-teal-600 outline-none p-2 font-bold text-black"
      />
      <textarea
        value={newTodo}
        onChange={handleTextAreaEdit}
        placeholder="Enter your todo here..."
        className="w-full resize-none h-40 rounded-lg focus:border border-teal-600 text-black outline-none p-2"
      />

      <button className="btn w-max">Update Todo</button>
    </form>
  );
}
