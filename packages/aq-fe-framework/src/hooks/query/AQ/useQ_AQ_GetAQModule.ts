import { IAQModule } from '@/interfaces/IAQModule'
import baseAxios from '@/shared/config/baseAxios'
import { useQuery } from '@tanstack/react-query'

export function useQ_AQ_GetAQModule() {
    const query = useQuery<IAQModule>({
        queryKey: ["/AQ/GetAQModule"],
        queryFn: async () => {
            const res = await baseAxios.get("/AQ/GetAQModule")
            return res.data.data
        },
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: false
    })
    return query
}
