import { COECourseSection } from '@/interfaces/shared-interfaces/COECourseSection';
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useQuery } from '@tanstack/react-query';

export default function useQ_COECourseSection_GetAll() {
  const ENDPOINT = "/COECourseSection/getall"

  const query = useQuery<COECourseSection[]>({
    queryKey: ["useQ_COECourseSection_GetAll"],
    queryFn: async () => {
      const response = await baseAxios.get(ENDPOINT);
      return response.data.data || [];
    },
  })
  return query;
}
