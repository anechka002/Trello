// Базовый тип задачи (общие поля для списка и деталки)
export type TaskBaseAttributes = {
  title: string;
  boardId: string;
  status: number;
  priority: number;
  addedAt: string;
};

// Задача в списке (упрощённый вариант)
export type Task = {
  id: string;
  type: 'tasks';
  attributes: TaskBaseAttributes & {
    attachmentsCount: number;
  };
};

// Расширенная задача (детальная версия)
export type TaskDetail = {
  id: string;
  type: 'tasks';
  attributes: TaskBaseAttributes & {
    id: string;
    description: Record<string, unknown>;
    boardTitle: string;
    order: number;
    startDate: Record<string, unknown>;
    deadline: Record<string, unknown>;
    updatedAt: string;
    attachments: string[];
  };
};

// Ответ API для списка задач
export type TasksResponse = {
  data: Task[];
  meta: {
    page: number;
    pageSize: number;
    totalCount: number;
    pagesCount: number;
  };
};

// Ответ API для конкретной задачи
export type TaskDetailResponse = {
  data: TaskDetail;
};
