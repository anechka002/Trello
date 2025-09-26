import type {
  SchemaGlobalTaskListItemJsonApiData
} from "@/shared/api/schema";
import {NavLink} from "react-router";

type Props = {
  task: SchemaGlobalTaskListItemJsonApiData;
}

export const TaskItem = ({task}: Props) => {

  return (
    <li key={task.id}>
      <h3><NavLink to={`/tasks/${task.id}`}>{task.attributes.title}</NavLink></h3>
    </li>
  );
};