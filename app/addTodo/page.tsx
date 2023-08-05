'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function AddTodo() {
  const [title, setTitle] = useState<string>('');
  const [todo, setTodo] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTextAreaEdit = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTodo(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (!title || !todo) {
        alert('Title and todo are required!');
        return;
      }

      const res = await fetch(`/api/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          todo,
        }),
      });

      if (res.ok) {
        router.push('/');
        router.refresh();
      } else {
        throw new Error('Failed to create a todo');
      }
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
      <h2 className="">Add Todo</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleChange}
        className="w-full rounded-lg focus:border border-teal-600 outline-none p-2 font-bold text-black"
      />
      <textarea
        value={todo}
        onChange={handleTextAreaEdit}
        placeholder="Enter your todo here..."
        className="w-full resize-none h-40 rounded-lg focus:border border-teal-600 text-black outline-none p-2"
      />

      <button className="btn w-max" disabled={submitting}>
        {submitting ? 'Submitting' : 'Submit'}
      </button>
    </form>
  );
}
