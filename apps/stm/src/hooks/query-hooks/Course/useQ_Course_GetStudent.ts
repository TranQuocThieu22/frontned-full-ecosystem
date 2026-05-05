import baseAxios from '@/api/config/baseAxios'
import { ICourseSection } from '@/interfaces/courseSection'
import { ICourseTimeClusters } from '@/interfaces/courseTimeClusters'
import { useQuery } from '@tanstack/react-query'
import { IBaseEntity, IUser } from 'aq-fe-framework/interfaces'

export interface ICourse_GetStudent extends IBaseEntity {
    user: IUser
    courseSection?: ICourseSection
    courseTimeCluster?: ICourseTimeClusters
    receiptType?: number
    receiptCode?: string
    receiptPrice?: string
    receiptLink?: string
    isCheck?: boolean
    note?: string
}
interface IBody extends IBaseEntity {
    courseSectionId?: number
    courseTimeCluster?: ICourseTimeClusters,
    pageNumber?: number,
    pageSize?: number
}

export default function useQ_Course_GetStudent({ body }: { body: IBody }) {
    const query = useQuery<ICourse_GetStudent[]>({
        queryKey: ["useQ_Course_GetStudent"],
        queryFn: async () => {
            const res = await baseAxios.post("/Course/GetStudent", body)
            if (res.data.isSuccess == false) throw Error("Đã có lỗi xảy ra!")
            return res.data.data
        }
    })
    return query
}
