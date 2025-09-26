import {TaskItem} from "@/features/tasks/ui/TaskItem/TaskItem.tsx";
import s from "@/App.module.css";
import {useQuery} from "@tanstack/react-query";
import {client} from "@/shared/api/client.ts";

export const TasksList = () => {

  const { data: tasks, isPending, isError} = useQuery({
    queryKey: ['tasks'],
    queryFn: async() => {
      const clientData = await client.GET('/boards/tasks')
      return clientData.data!
    }
  });

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Can't load tasks</span>
  }

  return (
    <div>
      <ul>
        <h3 className={s.title}>List</h3>
        {tasks.data.map((task) => {
          return (
            <TaskItem key={task.id} task={task} />
          );
        })}
      </ul>
    </div>
  );
};