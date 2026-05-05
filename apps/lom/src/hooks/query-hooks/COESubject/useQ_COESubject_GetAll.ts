import { COESubject } from '@/interfaces/shared-interfaces/COESubject'
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { useQuery } from '@tanstack/react-query'

export default function useQ_COESubject_GetAll(enabled: boolean) {
    const query = useQuery<COESubject[]>({
        queryKey: ["useQ_COESubject_GetAll"],
        queryFn: async () => {
            const res = await baseAxios.get("/COESubject/getAll?cols=COEUnit")
            return res.data.data
        },
        enabled: enabled
    })
    return query
}
