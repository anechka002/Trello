import {TaskItem} from "@/features/tasks/ui/TaskItem/TaskItem.tsx";
import type {Task} from "@/types/types.ts";
import {useEffect, useState} from "react";
import {tasksApi} from "@/features/tasks/api/api.ts";
import s from "@/App.module.css";

type Props = {
  selectedTaskId: string | null | undefined;
  onTaskSelect:(task: Task | null) => void
}

export const TasksList = ({ selectedTaskId, onTaskSelect}: Props) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [listQueryStatus, setListQueryStatus] = useState<'loading' | 'success' | 'error' | 'idle'>('idle');

  useEffect(() => {
    setListQueryStatus('loading');
    tasksApi.getTasks()
      .then((data) => {
        // console.log(data)
        setTasks(data.data);
        setListQueryStatus('success');
      });
  }, []);

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
        {listQueryStatus === 'loading' && <p>Loading...</p>}
        {listQueryStatus === 'success' && tasks.map((task) => {
          return (
            <TaskItem key={task.id} task={task} onSelect={handleSelectTaskClick} isSelected={selectedTaskId === task.id} />
          );
        })}
      </ul>
    </div>
  );
};