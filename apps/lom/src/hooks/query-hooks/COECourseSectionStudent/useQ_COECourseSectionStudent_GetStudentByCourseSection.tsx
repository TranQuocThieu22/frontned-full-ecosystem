import { COECourseSectionStudent } from "@/interfaces/shared-interfaces/COECourseSectionStudent";
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

const ENDPOINT = "/COECourseSectionStudent/GetStudentByCourseSection"
export default function useQ_COECourseSectionStudent_GetStudentByCourseSection({
    params = "",
    options
}: {
    params?: string,
    options?: Partial<UseQueryOptions<COECourseSectionStudent[], Error>>
} = {}) {
    const query = useQuery({
        queryKey: [ENDPOINT + params],
        queryFn: async () => {
            const res = await baseAxios.get(ENDPOINT + params)
            return res.data.data
        },
        ...options
    })
    return query
}
