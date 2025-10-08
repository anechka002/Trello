import {TaskItem} from "@/features/tasks/ui/TaskItem/TaskItem.tsx";
import s from "@/App.module.css";
import {useTasksQuery} from "@/features/tasks/model/useTasksQuery.ts";

export const TasksList = () => {

  const { data: tasks, isPending, isError} = useTasksQuery()

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