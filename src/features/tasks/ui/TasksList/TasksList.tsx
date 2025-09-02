import {TaskItem} from "@/features/tasks/ui/TaskItem/TaskItem.tsx";
import type {Task} from "@/types/types.ts";
import {useEffect, useState} from "react";
import {tasksApi} from "@/features/tasks/api/api.ts";
import s from "@/App.module.css";

type Props = {
  selectedTaskId: string | null;
  handleSelectTaskClick:(taskId: string, boardId: string) => void
}

export const TasksList = ({ selectedTaskId, handleSelectTaskClick}: Props) => {
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

  return (
    <div>
      <ul>
        <h3 className={s.title}>List</h3>
        {listQueryStatus === 'loading' && <p>Loading...</p>}
        {listQueryStatus === 'success' && tasks.map((task) => {
          return (
            <TaskItem key={task.id} task={task} selectedTaskId={selectedTaskId} handleSelectTaskClick={handleSelectTaskClick}/>
          );
        })}
      </ul>
    </div>
  );
};