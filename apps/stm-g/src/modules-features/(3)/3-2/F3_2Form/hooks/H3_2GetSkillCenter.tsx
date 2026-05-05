import baseAxios from '@/api/config/baseAxios'
import { useQuery } from '@tanstack/react-query'

interface I {
    id?: number,
    code?: string,
    name?: string
}
export default function useH3_2GetSkillCenter() {
    const query = useQuery<I[]>({
        queryKey: ['useH3_2GetSkillCenter'],
        queryFn: async () => {
            const result = await baseAxios.get("/skillcenter/getall")
            return result.data.data
        }
    })
    return query
}
