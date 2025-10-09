import {TaskItem} from "@/features/tasks/ui/TaskItem/TaskItem.tsx";
import s from "@/App.module.css";
import {useTasksQuery} from "@/features/tasks/model/useTasksQuery.ts";
import {type ChangeEvent, useState} from "react";
import {Pagination} from "@/common/components/pagination/Pagination.tsx";

export const TasksList = () => {

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { data: tasks, isPending, isError, isFetching} = useTasksQuery(pageNumber, pageSize);

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Can't load tasks</span>
  }

  const handlePageSelect = (pageNumber: number) => {
    setPageNumber(pageNumber);
  }

  const handlePageSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPageSize(+e.currentTarget.value);
    setPageNumber(1)
  }

  // true → контент устарел, идёт обновление (например, пользователь переключил страницу)
  const isPageContentUnactual = isFetching && !isPending

  return (
    <div>
      <select value={pageSize} onChange={handlePageSizeChange}>
        <option value={2}>2 items</option>
        <option value={5}>5 items</option>
        <option value={10}>10 items</option>
      </select>
      <Pagination
        pagesCount={tasks.meta.pagesCount}
        page={tasks.meta.page}
        onPageSelect={handlePageSelect}
      />
      <ul style={{opacity: isPageContentUnactual ? '0.4' : '1'}}>
        <h3 className={s.title}>List</h3>
        {tasks.data.map((task) => {
          return (
            <TaskItem key={task.id} task={task} />
          );
        })}
      </ul>
    </div>
  );
};
