import type {TaskDetailResponse} from "@/types/types.ts";
import {useEffect, useRef, useState} from "react";
import {tasksApi} from "@/features/tasks/api/api.ts";
import s from '../../../../App.module.css'
import { formatDate } from "@/common/utils/formatDate";

type Props = {
  boardId: string | null | undefined;
  selectedTaskId: string | null | undefined;
}

type CachedItem<T> = {
  value: T;              // сами данные
  expirationDate: number // timestamp, когда данные устареют
}

export const TaskDetail = ({selectedTaskId, boardId}: Props) => {
  const [fullTask, setFullTask] = useState<TaskDetailResponse | null>(null);
  const [detailsQueryStatus, setDetailsQueryStatus] = useState<'loading' | 'success' | 'error' | 'idle'>('idle');
  const abortControllerRef = useRef<null | AbortController>(null)

  const cacheData = useRef<Record<string, CachedItem<TaskDetailResponse>>>({})

  useEffect(() => {

    // Отменяем предыдущий запрос
    abortControllerRef.current?.abort()

    if(!selectedTaskId || !boardId) {
      setFullTask(null)
      setDetailsQueryStatus('idle')
      return
    }

    const cachedItem = cacheData.current[`cached-${selectedTaskId}`]
    // Если в кэше есть свежие данные
    if(cachedItem && cachedItem.expirationDate > Date.now()) {
      // Данные свежие — можно использовать
      setFullTask(cachedItem.value)
      return
    }

    // Если данные устарели — удаляем их
    if(cachedItem) {
      // Данные протухли — удаляем их из кэша
      delete cacheData.current[`cached-${selectedTaskId}`]
    }

    // Создаём новый AbortController для нового запроса
    const abortController = new AbortController()
    abortControllerRef.current = abortController

    setDetailsQueryStatus('loading')

    tasksApi.getTaskDetails(selectedTaskId, boardId, abortController.signal)
      .then((data) => {
        // console.log('Task detail response', data);
        setFullTask(data);
        setDetailsQueryStatus('success')
        cacheData.current[`cached-${selectedTaskId}`] = {
          value: data,
          expirationDate: Date.now() + 60 * 1000,
        }
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