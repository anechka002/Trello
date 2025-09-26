import s from '../../../../App.module.css'
import { formatDate } from "@/common/utils/formatDate";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {client} from "@/shared/api/client.ts";
import {useParams} from "react-router";

export const TaskDetail = () => {

  const {boardId} = useParams()
  const {taskId} = useParams()
  // console.log('boardId ', boardId)
  // console.log('taskId ', taskId)

  const {data: task, isPending, isError, isFetching} = useQuery({
    queryKey: ['task', taskId, boardId], // обязательно включаем ID
    queryFn: async ({signal}) => {
      const response = await client.GET('/boards/{boardId}/tasks/{taskId}', {
        params: {
          path: {
            boardId: boardId!,
            taskId: taskId!
          }
        },
        signal: signal
      })
      return response.data
    },
    enabled: Boolean(taskId), // запрос только если есть трек
    placeholderData: keepPreviousData, // временно показывай и сохраняй предыдущие данные
  });

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
          <div>Date: {formatDate(task.data.attributes.addedAt)}</div>
        </div>
      )}
    </div>
  );
};