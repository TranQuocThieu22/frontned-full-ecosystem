import baseAxios from '@/api/config/baseAxios'
import { ICourseSection } from '@/interfaces/courseSection'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { IBaseEntity } from 'aq-fe-framework/interfaces'

interface IBody extends IBaseEntity {
    courseSectionId?: number
    programId?: number,
    status?: number,
    examIds?: number[],
    pageNumber?: number,
    pageSize?: number
}

export default function useQ_Exam_GetStudent({
    body,
    options,
}: {
    body: IBody,
    options?: Partial<UseQueryOptions<ICourseSection[], Error>>,
}) {
    const query = useQuery<ICourseSection[]>({
        queryKey: ["useQ_Exam_GetStudent", body],
        queryFn: async () => {
            const res = await baseAxios.post("/Exam/GetStudent", body)
            if (res.data.isSuccess == false) throw Error("Đã có lỗi xảy ra!")
            return res.data.data
        },
        ...options
    })
    return query
}
