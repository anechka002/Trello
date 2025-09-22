import {tasksApi} from "@/features/tasks/api/api.ts";
import s from '../../../../App.module.css'
import { formatDate } from "@/common/utils/formatDate";
import {keepPreviousData, useQuery} from "@tanstack/react-query";

type Props = {
  boardId: string | null | undefined;
  selectedTaskId: string | null | undefined;
}

export const TaskDetail = ({selectedTaskId, boardId}: Props) => {

  const {data: task, isPending, isError, isFetching} = useQuery({
    queryKey: ['task', selectedTaskId, boardId], // обязательно включаем ID
    queryFn: ({signal}) => {
      return tasksApi.getTaskDetails(selectedTaskId!, boardId!, signal)
    },
    enabled: Boolean(selectedTaskId), // запрос только если есть трек
    placeholderData: keepPreviousData, // временно показывай и сохраняй предыдущие данные
  });

  if(!selectedTaskId) return <p>No tasks</p>

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