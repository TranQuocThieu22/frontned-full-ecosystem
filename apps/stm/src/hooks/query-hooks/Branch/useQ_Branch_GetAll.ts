import baseAxios from '@/api/config/baseAxios'
import { useQuery } from '@tanstack/react-query'

interface I {
    id?: number,
    code?: string,
    name?: string
}
export default function useQ_Branch_GetAll() {
    const query = useQuery<I[]>({
        queryKey: ["useQ_Branch_GetAll"],
        queryFn: async () => {
            const res = await baseAxios.get("/branch/getall")
            return res.data.data
        }
    })
    return query
}
