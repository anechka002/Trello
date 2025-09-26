import s from '../../../App.module.css'
import {TasksList} from "@/features/tasks/ui/TasksList/TasksList.tsx";

export const Main = () => {
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
      <TasksList/>
    </div>
  );
};