import { EditTodoForm } from '@/components';
import { TodoResult } from '@/typings';

type EditTodoProps = {
  params: { id: string };
};

const getTopicById = async (id: string) => {
  try {
    const res = await fetch(`${process.env.API_URI}/api/todos/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch todo');
    }

    return res.json();
  } catch (error) {
    console.error(error);
  }
};

export default async function EditTodo({ params: { id } }: EditTodoProps) {
  const todo = (await getTopicById(id)) as TodoResult;

  return <EditTodoForm id={id} title={todo.title} todo={todo.todo} />;
}
