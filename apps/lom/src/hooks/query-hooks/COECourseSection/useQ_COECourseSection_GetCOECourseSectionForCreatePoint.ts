import { COECourseSection } from '@/interfaces/shared-interfaces/COECourseSection';
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_COECourseSection_GetCOECourseSectionForCreatePoint({
  params = "",
  options
}: {
  params?: string,
  options?: Partial<UseQueryOptions<COECourseSection[], Error>>
} = {}) {
  const ENDPOINT = "/COECourseSection/GetCOECourseSectionForCreatePoint"

  const query = useQuery<COECourseSection[]>({
    queryKey: [ENDPOINT + params],
    queryFn: async () => {
      const response = await baseAxios.get(ENDPOINT + params);
      return response.data.data || [];
    },
    ...options
  })
  return query;
}
