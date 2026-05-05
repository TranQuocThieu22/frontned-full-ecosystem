import { COECG } from '@/interfaces/shared-interfaces/COECG'
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

const ENDPOINT = "/COECG/GetSource"
export default function useQ_COECG_GetSource({
    options,
    params = ""
}: {
    options?: Partial<UseQueryOptions<COECG[], Error>>,
    params?: string
} = {}) {
    const query = useQuery<COECG[]>({
        queryKey: [ENDPOINT + params],
        queryFn: async () => {
            const res = await baseAxios.get(ENDPOINT + params)
            return res.data.data
        },
        ...options
    })
    return query

}
