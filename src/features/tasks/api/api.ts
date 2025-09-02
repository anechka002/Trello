import type {TaskDetailResponse, TasksResponse} from "@/types/types.ts";

export const tasksApi = {
  async getTasks(): Promise<TasksResponse> {
    const response = await fetch('https://trelly.it-incubator.app/api/1.0/boards/tasks', {
      headers: {
        'API-KEY': 'e89a9a5a-8ec8-4868-866c-0e822747b9ad',
      },
    })
    return response.json();
  },
  async getTaskDetails(taskId: string, boardId: string, signal?: AbortSignal): Promise<TaskDetailResponse> {
    const response = await fetch(
      `https://trelly.it-incubator.app/api/1.0/boards/${boardId}/tasks/${taskId}`,
      {
        signal: signal,
        headers: {
          'API-KEY': 'e89a9a5a-8ec8-4868-866c-0e822747b9ad',
        },
      }
    )
    return response.json();
  }
}