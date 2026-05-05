import baseAxios from '@/api/config/baseAxios'
import { useQuery } from '@tanstack/react-query'

interface I {
    id?: number,
    name?: string
}

export default function useH3_2GetCertificate() {
    const query = useQuery<I[]>({
        queryKey: ["useH3_2GetCertificate"],
        queryFn: async () => {
            const result = await baseAxios.get("/certificate/getall")
            return result.data.data
        }
    })
    return query
}
