import baseAxios from '@/api/config/baseAxios'
import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { IBaseEntity } from 'aq-fe-framework/interfaces'

interface I extends IBaseEntity {
    note?: string,
    isCheck?: boolean
}

export default function useM_Course_CourseRegistration_UpdateCheck({ options }: { options?: UseMutationOptions<any, Error, I[], unknown> } = {}) {
    const mutation = useMutation({
        mutationFn: async (body: I[]) => {
            const res = await baseAxios.post("/Course/CourseRegistrationCheck", body)
            return res
        },
        ...options
    })
    return mutation
}
