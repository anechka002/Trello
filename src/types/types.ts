export type TaskAttributes = {
  title: string;
  boardId: string;
  status: number;
  priority: number;
  addedAt: string;
  attachmentsCount: number;
};

export type Task = {
  id: string;
  type: string;
  attributes: TaskAttributes;
};

type Meta = {
  page: number;
  pageSize: number;
  totalCount: number;
  pagesCount: number;
};

export type ApiResponse = {
  data: Task[];
  meta: Meta;
};