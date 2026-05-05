import { COECLO } from '@/interfaces/shared-interfaces/COECLO'
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { useQuery } from '@tanstack/react-query'

export default function useQ_COECLO_GetAll() {
    const query = useQuery<COECLO[]>({
        queryKey: ["useQ_COECLO_GetAll"],
        queryFn: async () => {
            const res = await baseAxios.get("/COECLO/getAll")
            return res.data.data
        },
    })
    return query
}
