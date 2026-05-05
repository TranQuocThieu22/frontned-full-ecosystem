import { COESubjectGroup } from '@/interfaces/shared-interfaces/COESubjectGroup'
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { useQuery } from '@tanstack/react-query'

export default function useQ_COESubjectGroup_getAll(enabled: boolean) {
    const query = useQuery<COESubjectGroup[]>({
        queryKey: ["useQ_COESubjectGroup_getAll"],
        queryFn: async () => {
            const res = await baseAxios.get("/COESubjectGroup/getAll")
            return res.data.data
        },
        enabled: enabled
    })
    return query
}
