import {TaskItem} from "@/features/tasks/ui/TaskItem/TaskItem.tsx";
import type {Task} from "@/types/types.ts";
import {tasksApi} from "@/features/tasks/api/api.ts";
import s from "@/App.module.css";
import {useQuery} from "@/hooks/useQuery.ts";

type Props = {
  selectedTaskId: string | null | undefined;
  onTaskSelect:(task: Task | null) => void
}

export const TasksList = ({ selectedTaskId, onTaskSelect}: Props) => {

  const {
    status,
    data: tasks,
  } = useQuery({
    queryKeys: ['tasks'],
    queryFn: () => tasksApi.getTasks()
  });

  const handleSelectTaskClick = (task: Task) => {
    if(selectedTaskId === task.id) {
      onTaskSelect(null)
    } else {
      onTaskSelect(task)
    }
  }

  return (
    <div>
      <ul>
        <h3 className={s.title}>List</h3>
        {status === 'loading' && <p>Loading...</p>}
        {status === 'success' && tasks?.data.map((task) => {
          return (
            <TaskItem key={task.id} task={task} onSelect={handleSelectTaskClick} isSelected={selectedTaskId === task.id} />
          );
        })}
      </ul>
    </div>
  );
};