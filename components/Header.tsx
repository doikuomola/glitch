import Link from 'next/link';
import { AddTodo } from '.';

export default function Header() {
  return (
    <header className="max-w-4xl mx-auto mt-8 bg-neutral-500 py-4 px-2">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <Link href="/">
            <h1 className="text-teal-400">Glitch</h1>
          </Link>
          <h2 className="py-2">Create todos, edit and delete</h2>
        </div>
        <AddTodo />
      </div>
    </header>
  );
}
