import { Class } from '@/interfaces/shared-interfaces/Class';
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

const ENDPOINT = "/Class/FindByClassIds"
export default function useQ_Class_FindByClassIds({
  params = "",
  options
}: {
  params?: string,
  options?: Partial<UseQueryOptions<Class[], Error>>
} = {}) {
  const query = useQuery<Class[]>({
    queryKey: [ENDPOINT + params],
    queryFn: async () => {
      const response = await baseAxios.get(ENDPOINT + params);
      return response.data.data || [];
    },
    ...options
  });
  return query
}
