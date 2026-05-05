import baseAxios from '@/api/config/baseAxios'
import { useQuery } from '@tanstack/react-query'

interface I {
    id?: number,
    code?: string,
    name?: string
}
export default function useH_i47273jqpi_GetAllRoom() {
    const query = useQuery<I[]>({
        queryKey: ["useH_i47273jqpi_GetAllRoom"],
        queryFn: async () => {
            const res = await baseAxios.get("address/getAll")
            return res.data.data
        }
    })
    return query
}
