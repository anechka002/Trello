import type {TaskDetailResponse} from "@/types/types.ts";
import {useEffect, useRef, useState} from "react";
import {tasksApi} from "@/features/tasks/api/api.ts";
import s from '../../../../App.module.css'
import { formatDate } from "@/common/utils/formatDate";

type Props = {
  selectedTaskId: string | null;
  boardId: string | null;
}

export const TaskDetail = ({selectedTaskId, boardId}: Props) => {
  const [selectedTask, setSelectedTask] = useState<TaskDetailResponse | null>(null);
  const [detailsQueryStatus, setDetailsQueryStatus] = useState<'loading' | 'success' | 'error' | 'idle'>('idle');
  const abortControllerRef = useRef<null | AbortController>(null)

  useEffect(() => {
    setDetailsQueryStatus('loading')

    if(!selectedTaskId || !boardId) {
      setSelectedTask(null)
      setDetailsQueryStatus('idle')
      return
    }

    // Отменяем предыдущий запрос
    abortControllerRef.current?.abort()
    // Создаём новый AbortController для нового запроса
    const abortController = new AbortController()
    abortControllerRef.current = abortController

    tasksApi.getTaskDetails(selectedTaskId, boardId, abortController.signal)
      .then((data) => {
        // console.log('Task detail response', data);
        setSelectedTask(data);
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
      {detailsQueryStatus === 'success' && selectedTask && (
        <div>
          <h2>{selectedTask.data.attributes.title}</h2>
          <div>Priority: {selectedTask.data.attributes.priority}</div>
          <div>Status: {selectedTask.data.attributes.status}</div>
          <div>
            Description:{' '}
            {selectedTask.data.attributes.description
              ? JSON.stringify(selectedTask.data.attributes.description)
              : 'Нет описания'}
          </div>
          <div>
            Date: {formatDate(selectedTask.data.attributes.addedAt)}
          </div>
        </div>
      )}
    </div>
  );
};