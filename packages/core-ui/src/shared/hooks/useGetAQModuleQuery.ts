import axiosInstance from '@aq-fe/core-ui/shared/configs/axiosInstance'
import { AQModule } from '@aq-fe/core-ui/shared/interfaces/AQModule'
import { useQuery } from '@tanstack/react-query'

export function useGetAQModuleQuery() {
    const query = useQuery<AQModule>({
        queryKey: ["/AQ/GetAQModule"],
        queryFn: async () => {
            const res = await axiosInstance.get("/AQ/GetAQModule")
            return res.data.data
        },
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: false
    })
    return query
}
