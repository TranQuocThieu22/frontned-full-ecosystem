import baseAxios from '@/api/config/baseAxios'
import { ICourseSection } from '@/interfaces/courseSection'
import { useQuery } from '@tanstack/react-query'
import { IBaseEntity } from 'aq-fe-framework/interfaces'

export interface IBody extends IBaseEntity {
    type?: number,
    pageNumber?: number,
    pageSize?: number
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
