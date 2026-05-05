import baseAxios from '@/api/config/baseAxios'
import { ITimeType } from '@/interfaces/timeType'
import { useMutation } from '@tanstack/react-query'

export default function useM_TimeType_Update() {
    const mutation = useMutation({
        mutationFn: async (body: ITimeType) => {
            const res = await baseAxios.post("/timeType/update", body)
            return res
        }
    })
    return mutation
}
