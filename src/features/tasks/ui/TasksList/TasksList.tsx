import {TaskItem} from "@/features/tasks/ui/TaskItem/TaskItem.tsx";
import type {Task} from "@/types/types.ts";
import {tasksApi} from "@/features/tasks/api/api.ts";
import s from "@/App.module.css";
import {useQuery} from "@tanstack/react-query";

type Props = {
  selectedTaskId: string | null | undefined;
  onTaskSelect:(task: Task | null) => void
}

export const TasksList = ({ selectedTaskId, onTaskSelect}: Props) => {

  const { data: tasks, isPending, isError} = useQuery({
    queryKey: ['tasks'],
    queryFn: () => tasksApi.getTasks()

  });

  const handleSelectTaskClick = (task: Task) => {
    if(selectedTaskId === task.id) {
      onTaskSelect(null)
    } else {
      onTaskSelect(task)
    }
  }

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
            <TaskItem key={task.id} task={task} onSelect={handleSelectTaskClick} isSelected={selectedTaskId === task.id} />
          );
        })}
      </ul>
    </div>
  );
};