import baseAxios from '@/api/config/baseAxios'
import { ICourseSection } from '@/interfaces/courseSection'
import { useQuery } from '@tanstack/react-query'

export default function useQ_CourseSection_GetAll({ params = "" }: { params?: string }) {
    const query = useQuery<ICourseSection[]>({
        queryKey: ["/CourseSection/GetAll" + params],
        queryFn: async () => {
            const res = await baseAxios.get("/CourseSection/GetAll" + params)
            return res.data.data
        }
    })
    return query
}
