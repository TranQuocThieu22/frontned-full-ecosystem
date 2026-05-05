import { COESubjectAssessment } from '@/interfaces/shared-interfaces/COESubjectAssessment'
import baseAxios from "@aq-fe/core-ui/shared/configs/axiosInstance"
import { useQuery } from '@tanstack/react-query'

export default function useQ_COESubjectAssessment_GetAll() {
    const query = useQuery<COESubjectAssessment[]>({
        queryKey: ["useQ_COESubjectAssessment_GetAll"],
        queryFn: async () => {
            const res = await baseAxios.get("/COESubjectAssessment/getAll")
            return res.data.data
        },
        // enabled:enabled
    })
    return query
}
