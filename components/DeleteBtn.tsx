'use client'

import { TrashIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import React from 'react';

type DeleteBtnProps = {
  id: string;
};

export default function DeleteBtn({ id }: DeleteBtnProps) {
  const router = useRouter();

    const handleTrashTodo = async () => {
    const confirmed = confirm('Are you sure?');

    if (confirmed) {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        router.refresh();
      }
    }
  };
  return (
    <button onClick={handleTrashTodo}>
      <TrashIcon className="cursor-pointer h-6 w-6 text-red-500" />
    </button>
  );
}
