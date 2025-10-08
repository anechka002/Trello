import {useQuery} from "@tanstack/react-query";
import {client} from "@/shared/api/client.ts";

export const useTasksQuery = () => {
  const queryResult = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const clientData = await client.GET('/boards/tasks')
      return clientData.data!
    }
  });
  return queryResult;
}