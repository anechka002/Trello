import type {
  SchemaGlobalTaskListItemJsonApiData
} from "@/shared/api/schema";

type Props = {
  task: SchemaGlobalTaskListItemJsonApiData;
  isSelected: boolean;
  onSelect: (task: SchemaGlobalTaskListItemJsonApiData) => void;
}

export const TaskItem = ({task, isSelected, onSelect}: Props) => {

  const color = isSelected ? '#7863fd' : 'white';

  return (
    <li
      key={task.id}
      style={{color: color}}
    >
      <h3
        onClick={() => {
          onSelect(task);
        }}
      >
        {task.attributes.title}
      </h3>
    </li>
  );
};