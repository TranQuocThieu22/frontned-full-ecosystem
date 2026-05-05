import baseAxios from '@/api/config/baseAxios'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { IBaseEntity } from 'aq-fe-framework/interfaces'

interface I extends IBaseEntity {
    note?: string,
    isCheck?: boolean
}

export default function useM_Exam_ExamRegistrationCheck({ options }: { options?: UseMutationOptions<any, Error, I[], unknown> } = {}) {
    const mutation = useMutation({
        mutationFn: async (body: I[]) => {
            const res = await baseAxios.post("/Exam/ExamRegistrationCheck", body)
            return res
        },
        ...options
    })
    return mutation
}
