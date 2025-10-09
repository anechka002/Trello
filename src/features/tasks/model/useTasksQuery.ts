import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {client} from "@/shared/api/client.ts";

export const useTasksQuery = (pageNumber: number, pageSize: number) => {
  const queryResult = useQuery({
    queryKey: ['tasks', 'list', pageNumber, pageSize],
    queryFn: async () => {
      const clientData = await client.GET('/boards/tasks', {
        params: {
          query: {
            pageNumber: pageNumber,
            pageSize: pageSize
          }
        }
      })
      return clientData.data!
    },
    placeholderData: keepPreviousData
  });
  return queryResult;
}