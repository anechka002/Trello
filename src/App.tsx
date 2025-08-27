import { useEffect, useRef, useState } from 'react';
import './App.css';
import type { TasksResponse, Task, TaskDetailResponse } from './types/types';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [listQueryStatus, setListQueryStatus] = useState<'loading' | 'success' | 'error' | 'idle'>('idle');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const [selectedTask, setSelectedTask] = useState<TaskDetailResponse | null>(null);
  const [detailsQueryStatus, setDetailsQueryStatus] = useState<'loading' | 'success' | 'error' | 'idle'>('idle');

  const abortControllerRef = useRef<null | AbortController>(null)

  useEffect(() => {
    setListQueryStatus('loading');
    fetch('https://trelly.it-incubator.app/api/1.0/boards/tasks', {
      headers: {
        'API-KEY': 'e89a9a5a-8ec8-4868-866c-0e822747b9ad',
      },
    })
      .then((res) => res.json() as Promise<TasksResponse>)
      .then((data) => {
        // console.log(data)
        setTasks(data.data);
        setListQueryStatus('success');
      });
  }, []);

  const FormatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSelectTaskClick = (taskId: string, boardId: string) => {
    setSelectedTaskId((prev) => (prev === taskId ? null : taskId));
    setDetailsQueryStatus('loading')

    // Отменяем предыдущий запрос
    abortControllerRef.current?.abort()
    // Создаём новый AbortController для нового запроса
    abortControllerRef.current = new AbortController()


    fetch(
      `https://trelly.it-incubator.app/api/1.0/boards/${boardId}/tasks/${taskId}`,
      {
        signal: abortControllerRef.current.signal,
        headers: {
          'API-KEY': 'e89a9a5a-8ec8-4868-866c-0e822747b9ad',
        },
      }
    )
      .then((res) => res.json() as Promise<TaskDetailResponse>)
      .then((data) => {
        // console.log('Task detail response', data);
        setSelectedTask(data);
        setDetailsQueryStatus('success')
      })
      .catch((error) => {
        console.error('Error fetching task details:', error);
        setDetailsQueryStatus('error')
      });
  };

  return (
    <div style={{}}>
      <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
        <input
          placeholder="Введите задачу..."
          style={{
            flex: 1,
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: '6px',
            fontSize: '14px',
            outline: 'none',
            transition: 'border-color 0.3s',
          }}
        />
        <button
          style={{
            backgroundColor: '#aba0f7',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 14px',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'background-color 0.3s, transform 0.2s',
          }}
        >
          +
        </button>
      </div>
      <div
        style={{
          backgroundColor: '#aba0f7',
          padding: '10px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'space-around'
        }}
      >
        <div>
          <h3>Tasks</h3>
          {listQueryStatus === 'loading' && <p>Loading...</p>}
          <ul>
            {tasks.map((task) => {
              const color = task.id === selectedTaskId ? '#7863fd' : 'white';
              return (
                <li key={task.id} style={{ color: color }}>
                  <h3
                    onClick={() => {
                      handleSelectTaskClick(task.id, task.attributes.boardId);
                    }}
                  >
                    {task.attributes.title}
                  </h3>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h3>Detail</h3>
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
                Date: {FormatDate(selectedTask.data.attributes.addedAt)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
