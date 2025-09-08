import type {TaskDetailResponse} from "@/types/types.ts";
import {useEffect, useRef, useState} from "react";
import {tasksApi} from "@/features/tasks/api/api.ts";
import s from '../../../../App.module.css'
import { formatDate } from "@/common/utils/formatDate";

type Props = {
  boardId: string | null | undefined;
  selectedTaskId: string | null | undefined;
}

export const TaskDetail = ({selectedTaskId, boardId}: Props) => {
  const [fullTask, setFullTask] = useState<TaskDetailResponse | null>(null);
  const [detailsQueryStatus, setDetailsQueryStatus] = useState<'loading' | 'success' | 'error' | 'idle'>('idle');
  const abortControllerRef = useRef<null | AbortController>(null)

  useEffect(() => {
    setDetailsQueryStatus('loading')

    if(!selectedTaskId || !boardId) {
      setFullTask(null)
      setDetailsQueryStatus('idle')
      return
    }

    setDetailsQueryStatus('loading')

    // Отменяем предыдущий запрос
    abortControllerRef.current?.abort()
    // Создаём новый AbortController для нового запроса
    const abortController = new AbortController()
    abortControllerRef.current = abortController

    tasksApi.getTaskDetails(selectedTaskId, boardId, abortController.signal)
      .then((data) => {
        // console.log('Task detail response', data);
        setFullTask(data);
        setDetailsQueryStatus('success')
      })
      .catch((error) => {
        console.error('Error fetching task details:', error);
        setDetailsQueryStatus('error')
      });

  }, [selectedTaskId, boardId])

  return (
    <div>
      <h3 className={s.title}>Detail</h3>

      {detailsQueryStatus === 'idle' && <p>No tasks</p>}
      {detailsQueryStatus === 'loading' && <p>Loading...</p>}
      {detailsQueryStatus === 'error' && <p>Error loading task details</p>}

      {fullTask && (
        <div>
          <h2>{fullTask.data.attributes.title}</h2>
          <div>Priority: {fullTask.data.attributes.priority}</div>
          <div>Status: {fullTask.data.attributes.status}</div>
          <div>
            Description:{' '}
            {fullTask.data.attributes.description
              ? JSON.stringify(fullTask.data.attributes.description)
              : 'Нет описания'}
          </div>
          <div>Date: {formatDate(fullTask.data.attributes.addedAt)}</div>
        </div>
      )}
    </div>
  );
};