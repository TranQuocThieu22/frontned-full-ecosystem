import baseAxios from '@/api/config/baseAxios'
import { useQuery } from '@tanstack/react-query'

interface I {
    id?: number,
    code?: string,
    fullName?: string
}
export default function useH_i47273jqpi_GetAllLecturer() {
    const query = useQuery<I[]>({
        queryKey: ["useH_i47273jqpi_GetAllLecturer"],
        queryFn: async () => {
            const res = await baseAxios.get("/Account/GetAllLecturer")
            return res.data.data
        }
    })
    return query
}
