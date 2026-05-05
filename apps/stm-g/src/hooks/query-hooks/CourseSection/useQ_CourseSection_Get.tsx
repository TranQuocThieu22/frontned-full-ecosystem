import baseAxios from '@/api/config/baseAxios'
import { IBaseBody } from '@/interfaces/base'
import { ICourseSection } from '@/interfaces/courseSection'
import { useQuery } from '@tanstack/react-query'

interface IBody extends IBaseBody {
    type?: number
}

export default function useQ_CourseSection_Get({ body }: { body?: IBody }) {
    const query = useQuery<ICourseSection[]>({
        queryKey: ["/CourseSection/Get" + body],
        queryFn: async () => {
            const res = await baseAxios.post("/CourseSection/Get", body)
            return res.data.data
        }
    })
    return query
}
