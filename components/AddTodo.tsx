'use client';

import Link from 'next/link';

export default function AddTodo() {
  return (
    <Link href="/addTodo">
      <button className="btn self-end w-max ">Add Todo</button>
    </Link>
  );
}
