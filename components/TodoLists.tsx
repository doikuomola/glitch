import { TodoResult } from '@/typings';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import moment from 'moment';
import Link from 'next/link';
import { DeleteBtn } from '.';

const getTodos = async () => {
  try {
    const res = await fetch(`${process.env.API_URI}/api/todos`, {
      cache: 'no-cache',
    });

    if (!res.ok) throw new Error('Failed to fetch todos!');

    return res.json();
  } catch (error) {
    console.log('Error loading topics: ', error);
  }
};

export default async function TodoLists() {
  const todos = (await getTodos()) as TodoResult[];

  return (
    <>
      {todos.map((todo, i) => (
        <section key={todo._id} className="max-w-4xl mx-auto mb-4">
          <div className="bg-neutral-500/50 p-3 rounded-lg flex justify-between hover:bg-neutral-500/20 transition duration-200 ease-out">
            <div className="flex flex-col">
              <h2 className="font-bold capitalize text-teal-500">
                {todo.title}
              </h2>
              <p className="">{todo.todo}</p>
            </div>
            <div className="">
              <div className="flex gap-3 items-center justify-end">
                <Link href={`/editTodo/${todo._id}`}>
                  <PencilSquareIcon className="cursor-pointer h-6 w-6 text-teal-500" />
                </Link>
                <DeleteBtn id={todo._id} />
              </div>
              <span className="self-end text-xs italic text-teal-400">
                {moment(todo.updatedAt).fromNow()}
              </span>
              {/* {openModalEdit ? (
              <Modal setOpenModal={setOpenModalEdit}>
                <form
                  onSubmit={handleSubmitEditTodo}
                  className="w-full flex flex-col gap-3"
                >
                  <h2 className="text-black">Add Todo</h2>
                  <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={todoToEdit.title || ''}
                    onChange={handleChangeEdit}
                    className="w-full rounded-lg focus:border border-teal-600 outline-none p-2 font-bold text-black"
                  />
                  <textarea
                    name="todo"
                    value={todoToEdit.todo || ''}
                    onChange={handleTextAreaEdit}
                    placeholder="Enter your todo here..."
                    id="todo"
                    className="w-full resize-none h-40 rounded-lg focus:border border-teal-600 text-black outline-none p-2"
                  />

                  <button className="btn w-max">Submit</button>
                </form>
              </Modal>
            ) : null} */}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
