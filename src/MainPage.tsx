import {useState} from "react";
import s from "@/App.module.css";
import {TasksList} from "@/features/tasks/ui/TasksList/TasksList.tsx";
import {TaskDetail} from "@/features/tasks/ui/TaskDetail/TaskDetail.tsx";
import type {SchemaGlobalTaskListItemJsonApiData} from "@/shared/api/schema";

export const MainPage = () => {

  const [selectedTask, setSelectedTask] = useState<SchemaGlobalTaskListItemJsonApiData | null>(null);

  // const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectTaskClick = (task: SchemaGlobalTaskListItemJsonApiData | null) => {
    setSelectedTask(task)

    // setIsModalOpen(true);
  }


  const handleResetTaskClick = () => {
    setSelectedTask(null);
  }

  // const handleCloseModal = () => {
  //   // setIsModalOpen(false);
  //   setSelectedTask(null);
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

        <TasksList selectedTaskId={selectedTask?.id} onTaskSelect={handleSelectTaskClick}/>
        <TaskDetail selectedTaskId={selectedTask?.id} boardId={selectedTask?.attributes.boardId}/>

        {/*Модалка*/}
        {/*{isModalOpen && (*/}
        {/*  <div className={s.backdropStyle}>*/}
        {/*    <div className={s.modalStyle}>*/}
        {/*      <button className={s.closeBtnStyle} onClick={handleCloseModal}>*/}
        {/*        ✖*/}
        {/*      </button>*/}
        {/*      <TaskDetail selectedTaskId={selectedTask?.id} boardId={selectedTask?.attributes.boardId} />*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>
      <button onClick={handleResetTaskClick}>Reset</button>
    </div>
  );
};