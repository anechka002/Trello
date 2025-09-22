import {TaskItem} from "@/features/tasks/ui/TaskItem/TaskItem.tsx";
import s from "@/App.module.css";
import {useQuery} from "@tanstack/react-query";
import {client} from "@/shared/api/client.ts";
import type {SchemaGlobalTaskListItemJsonApiData} from "@/shared/api/schema";

type Props = {
  selectedTaskId: string | null | undefined;
  onTaskSelect:(task: SchemaGlobalTaskListItemJsonApiData | null) => void
}

export const TasksList = ({ selectedTaskId, onTaskSelect}: Props) => {

  const { data: tasks, isPending, isError} = useQuery({
    queryKey: ['tasks'],
    queryFn: async() => {
      const clientData = await client.GET('/boards/tasks') //tasksApi.getTasks()
      return clientData.data!
    }
  });

  const handleSelectTaskClick = (task: SchemaGlobalTaskListItemJsonApiData) => {
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