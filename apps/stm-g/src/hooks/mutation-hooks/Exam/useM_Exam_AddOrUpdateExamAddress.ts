import baseAxios from '@/api/config/baseAxios'
import { useMutation } from '@tanstack/react-query'
import { IBaseEntity } from 'aq-fe-framework/interfaces'

export interface IExam_AddOrUpdateExamAddress extends IBaseEntity {
    examId?: number,
    addressId?: string,
    address?: null
}

export default function useM_Exam_AddOrUpdateExamAddress() {
    const mutation = useMutation({
        mutationFn: async (body: IExam_AddOrUpdateExamAddress[]) => {
            const res = await baseAxios.post("/Exam/AddOrUpdateExamAddress", body)
            return res
        }
    })
    return mutation
}
