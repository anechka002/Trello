import { useState} from 'react';
import './App.css'
import s from './App.module.css';
import {TasksList} from "@/features/tasks/ui/TasksList/TasksList.tsx";
import {TaskDetail} from "@/features/tasks/ui/TaskDetail/TaskDetail.tsx";

function App() {

  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [boardId, setBoardId] = useState<string | null>(null);

  // const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectTaskClick = (taskId: string, boardId: string) => {
    setSelectedTaskId((prev) => (prev === taskId ? null : taskId));
    setBoardId((prev) => (prev === boardId ? null : taskId));
    // setIsModalOpen(true);
  }

  const handleResetTaskClick = () => {
    setSelectedTaskId(null);
    setBoardId(null)
  }

  // const handleCloseModal = () => {
  //   setIsModalOpen(false);
  //   setSelectedTaskId(null);
  // };


  return (
    <div>
      <h3>Tasks</h3>
      <div className={s.blockInput}>
        <input
          placeholder="Введите задачу..."
          className={s.input}
        />
        <button className={s.button}>+</button>
      </div>

      <div className={s.container}>

        <TasksList selectedTaskId={selectedTaskId} handleSelectTaskClick={handleSelectTaskClick}/>
        <TaskDetail selectedTaskId={selectedTaskId} boardId={boardId}/>

        {/* Модалка */}
        {/*{isModalOpen && (*/}
        {/*  <div className={s.backdropStyle}>*/}
        {/*    <div className={s.modalStyle}>*/}
        {/*      <button className={s.closeBtnStyle} onClick={handleCloseModal}>*/}
        {/*        ✖*/}
        {/*      </button>*/}
        {/*      <TaskDetail selectedTaskId={selectedTaskId} boardId={boardId} />*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>
      <button onClick={handleResetTaskClick}>Reset</button>
    </div>
  );
}

export default App;
