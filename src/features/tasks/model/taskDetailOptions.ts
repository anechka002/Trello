import {keepPreviousData, queryOptions} from "@tanstack/react-query";
import {client} from "@/shared/api/client.ts";

export function taskDetailOptions(taskId: string | undefined, boardId: string | undefined) {
  return queryOptions({
    queryKey: ['task', taskId, boardId], // обязательно включаем ID
    queryFn: async ({signal}) => {
      const response = await client.GET('/boards/{boardId}/tasks/{taskId}', {
        params: {
          path: {
            boardId: boardId!,
            taskId: taskId!
          }
        },
        signal: signal
      })
      return response.data
    },
    enabled: Boolean(taskId), // запрос только если есть трек
    placeholderData: keepPreviousData, // временно показывай и сохраняй предыдущие данные
  })
}