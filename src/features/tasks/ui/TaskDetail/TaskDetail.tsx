import s from '../../../../App.module.css'
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router";
import {taskDetailOptions} from "@/features/tasks/model/taskDetailOptions.ts";

export const TaskDetail = () => {

  const {boardId} = useParams()
  const {taskId} = useParams()
  // console.log('boardId ', boardId)
  // console.log('taskId ', taskId)

  const {data: task, isPending, isError, isFetching} = useQuery(taskDetailOptions(taskId, boardId));

  if(!taskId) return <p>No tasks</p>

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error loading task details</span>
  }

  return (
    <div>
      <h3 className={s.title}>Detail {isFetching && '⏳'}</h3>

      {task && (
        <div>
          <h2>{task.data.attributes.title}</h2>
          <div>Priority: {task.data.attributes.priority}</div>
          <div>Status: {task.data.attributes.status}</div>
          <div>
            Description:{' '}
            {task.data.attributes.description
              ? JSON.stringify(task.data.attributes.description)
              : 'Нет описания'}
          </div>
          <div>Date: {new Date(task.data.attributes.addedAt).toLocaleDateString()}</div>
        </div>
      )}
    </div>
  );
};