import { Class } from '@/interfaces/shared-interfaces/Class';
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

const ENDPOINT = "/Class/getall"
export default function useQ_Class_GetAll({
  options,
  params
}: {
  options?: Partial<UseQueryOptions<Class[], Error>>,
  params?: string
} = {}) {
  const query = useQuery<Class[]>({
    queryKey: [ENDPOINT + params],
    queryFn: async () => {
      const response = await baseAxios.get(ENDPOINT + params);
      return response.data.data || [];
    },
    ...options
  })
  return query;
}
