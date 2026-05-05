import { COESubject } from '@/interfaces/shared-interfaces/COESubject'
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

const ENDPOINT = "/COECLO/GetSource"
export default function useQ_COECLO_GetSource({
    options,
    params = ""
}: {
    options?: Partial<UseQueryOptions<COESubject[], Error>>,
    params?: string
} = {}) {
    const query = useQuery<COESubject[]>({
        queryKey: [ENDPOINT + params],
        queryFn: async () => {
            const res = await baseAxios.get(ENDPOINT + params)
            return res.data.data
        },
        ...options
    })
    return query
}

