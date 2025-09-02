import type {Task} from "@/types/types.ts";

type Props = {
  task: Task;
  selectedTaskId: string | null;
  handleSelectTaskClick: (taskId: string, boardId: string) => void;
}

export const TaskItem = ({task, selectedTaskId, handleSelectTaskClick}: Props) => {

  const color = task.id === selectedTaskId ? '#7863fd' : 'white';

  return (
    <li
      key={task.id}
      style={{color: color}}
    >
      <h3
        onClick={() => {
          handleSelectTaskClick(task.id, task.attributes.boardId);
        }}
      >
        {task.attributes.title}
      </h3>
    </li>
  );
};