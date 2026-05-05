import baseAxios from '@/api/config/baseAxios'
import { ITimeType } from '@/interfaces/timeType'
import { useQuery } from '@tanstack/react-query'
export default function useQ_TimeType_Get({ queryKey, params = "" }: { queryKey?: string, params?: string } = {}) {
    const query = useQuery<ITimeType>({
        queryKey: [queryKey || "useQ_TimeType_Get"],
        queryFn: async () => {
            const res = await baseAxios.get("TimeType/get" + params)
            return res.data.data
        }
    })
    return query
}

