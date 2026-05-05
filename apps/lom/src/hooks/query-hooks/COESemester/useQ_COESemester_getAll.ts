import { COESemester } from '@/interfaces/shared-interfaces/COESemester'
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { useQuery } from '@tanstack/react-query'

export default function useQ_COESemester_getAll(enabled: boolean) {
    const query = useQuery<COESemester[]>({
        queryKey: ["useQ_COESemester_getAll"],
        queryFn: async () => {
            const res = await baseAxios.get("/COESemester/getAll?cols=COESchoolYear")
            return res.data.data
        },
        enabled: enabled
    })
    return query
}
