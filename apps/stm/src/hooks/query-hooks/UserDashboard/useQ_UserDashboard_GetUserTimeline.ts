import baseAxios from '@/api/config/baseAxios'
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

interface I {
    eventDate?: Date,
    eventType?: number,
    eventDescription?: string
}

export default function useQ_UserDashboard_GetUserTimeline({
    params = "",
    options
}: {
    params?: string,
    options?: Partial<UseQueryOptions<I[], Error>>
}) {
    const query = useQuery<I[]>({
        queryKey: ["/UserDashboard/GetUserTimeline" + params],
        queryFn: async () => {
            const res = await baseAxios.get("/UserDashboard/GetUserTimeline" + params)
            return res.data.data
        },
        ...options
    })
    return query
}
