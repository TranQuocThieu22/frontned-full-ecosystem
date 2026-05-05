import baseAxios from '@/api/config/baseAxios'
import { IDayOffRequest } from '@/interfaces/DayOffRequest'
import { useQuery } from '@tanstack/react-query'


export default function useQ_DayOfRequest_GetAll({ params = "" }: { params?: string }) {
    const query = useQuery<IDayOffRequest[]>({
        queryKey: ["/DayOffRequest/GetAll" + params],
        queryFn: async () => {
            const res = await baseAxios.get("/DayOffRequest/GetAll" + params)
            return res.data.data
        }
    })
    return query
}
