import { useEffect, useState } from 'react';
import './App.css';
import type { ApiResponse, Task } from './types/types';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch('https://trelly.it-incubator.app/api/1.0/boards/tasks', {
      headers: {
        'API-KEY': 'e89a9a5a-8ec8-4868-866c-0e822747b9ad',
      },
    })
      .then((res) => res.json()as Promise<ApiResponse>)
      .then((data) => {
        // console.log(data.data);
        setTasks(data.data);
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

  return (
    <>
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
        >+</button>
      </div>
      <div 
        style={{ 
          backgroundColor: '#aba0f7', 
          padding: '10px', 
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',  
          borderRadius: '8px',
        }}>
        <h4>Tasks</h4>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div>{task.attributes.title}</div>
              {/* <div>Status: {task.attributes.status}</div>
              <div>Priority: {task.attributes.priority}</div>
              <div>Attachments: {task.attributes.attachmentsCount}</div>
              <div>Date: {FormatDate(task.attributes.addedAt)}</div> */}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
