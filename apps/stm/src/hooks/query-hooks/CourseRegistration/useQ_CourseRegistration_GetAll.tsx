import baseAxios from '@/api/config/baseAxios'
import { useQuery } from '@tanstack/react-query'

export default function useQ_CourseRegistration_GetAll() {
    const query = useQuery({
        queryKey: ["useQ_CourseRegistration_GetAll"],
        queryFn: async () => {
            const res = await baseAxios.get("/CourseRegistration/getAll")
            return res.data.data
        }
    })
    return query
}
