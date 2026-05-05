import { COEUnit } from '@/interfaces/shared-interfaces/COEUnit'
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { useQuery, UseQueryOptions } from '@tanstack/react-query'

const ENDPOINT = "/Department/getAll"
export default function useQ_COEUnit_GetAll({
    options
}: {
    options?: Partial<UseQueryOptions<COEUnit[], Error>>
} = {}) {
    const query = useQuery<COEUnit[]>({
        queryKey: [ENDPOINT],
        queryFn: async () => {
            const res = await baseAxios.get(ENDPOINT)
            return res.data.data
        },
        ...options
    })
    return query
}
