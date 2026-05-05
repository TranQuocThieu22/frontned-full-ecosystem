import baseAxios from "@/api/config/baseAxios"
import { useQuery, UseQueryOptions } from "@tanstack/react-query"

interface I {
    id?: number,
    name?: string,
    startDate?: string,
    endDate?: string,
    addressName?: string,
    addressCapacity?: number,
    lecturerName?: string[]
    subjectName?: string,
}
interface IBody {
    PageSize?: number
    PageNumber?: number
    lecturerId?: number
    courseSectionId?: number
    addressId?: number
    startDate?: string
    endDate?: string
}
export default function useQ_CourseSection_GetSchedule({ body, options }: { body: IBody, options?: Partial<UseQueryOptions<I[], Error>> }) {
    const query = useQuery<I[]>({
        queryKey: ["F_i47273jqpi_ViewSchedule", body],
        queryFn: async () => {
            const res = await baseAxios.post("/CourseSection/GetSchedule", body)
            return res.data.data
        },
        ...options
    })
    return query
}
